using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class AddEmployerUserIdToJobPosting_Fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1) Ensure column exists and is nullable (no default)
            // If you already added the column previously with a bad default,
            // we just drop the default and make it nullable first.
            migrationBuilder.Sql(@"
                DO $$
                BEGIN
                  IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'job_postings'
                      AND column_name = 'employer_user_id'
                  ) THEN
                    ALTER TABLE job_postings ADD COLUMN employer_user_id integer;
                  END IF;
                END $$;
            ");

            // 2) Backfill to a real employer user id.
            // Pick the first employer user (adjust the role/name check to your seed data).
            migrationBuilder.Sql(@"
                WITH chosen AS (
                  SELECT id
                  FROM users
                  WHERE role = 'employer'
                  ORDER BY id
                  LIMIT 1
                )
                UPDATE job_postings
                SET employer_user_id = (SELECT id FROM chosen)
                WHERE employer_user_id IS NULL;
            ");

            // 3) Make NOT NULL
            migrationBuilder.Sql(@"
                ALTER TABLE job_postings
                ALTER COLUMN employer_user_id SET NOT NULL;
            ");

            // 4) Index + FK
            migrationBuilder.Sql(@"
                DO $$
                BEGIN
                  IF NOT EXISTS (
                    SELECT 1 FROM pg_indexes
                    WHERE schemaname = 'public'
                      AND indexname = 'ix_job_postings_employer_user_id'
                  ) THEN
                    CREATE INDEX ix_job_postings_employer_user_id
                      ON job_postings (employer_user_id);
                  END IF;
                END $$;
            ");

            migrationBuilder.Sql(@"
                DO $$
                BEGIN
                  IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.table_constraints
                    WHERE table_name = 'job_postings'
                      AND constraint_name = 'fk_job_postings_users_employer_user_id'
                  ) THEN
                    ALTER TABLE job_postings
                    ADD CONSTRAINT fk_job_postings_users_employer_user_id
                    FOREIGN KEY (employer_user_id) REFERENCES users (id) ON DELETE RESTRICT;
                  END IF;
                END $$;
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Drop FK, index, and make column nullable again (or drop it entirely if you want).
            migrationBuilder.Sql(@"
                DO $$
                BEGIN
                  IF EXISTS (
                    SELECT 1
                    FROM information_schema.table_constraints
                    WHERE table_name = 'job_postings'
                      AND constraint_name = 'fk_job_postings_users_employer_user_id'
                  ) THEN
                    ALTER TABLE job_postings
                    DROP CONSTRAINT fk_job_postings_users_employer_user_id;
                  END IF;
                END $$;
            ");

            migrationBuilder.Sql(@"
                DO $$
                BEGIN
                  IF EXISTS (
                    SELECT 1 FROM pg_indexes
                    WHERE schemaname = 'public'
                      AND indexname = 'ix_job_postings_employer_user_id'
                  ) THEN
                    DROP INDEX ix_job_postings_employer_user_id;
                  END IF;
                END $$;
            ");

            // Make it nullable again (keep the column)
            migrationBuilder.Sql(@"
                ALTER TABLE job_postings
                ALTER COLUMN employer_user_id DROP NOT NULL;
            ");
        }
    }
}
