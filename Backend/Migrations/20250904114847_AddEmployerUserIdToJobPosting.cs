using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddEmployerUserIdToJobPosting : Migration
    {
        /// <inheritdoc />
       protected override void Up(MigrationBuilder migrationBuilder)
{
    // 1) Add column as NULLABLE, NO DEFAULT
    migrationBuilder.AddColumn<int>(
        name: "employer_user_id",
        table: "job_postings",
        type: "integer",
        nullable: true); // important: start nullable

    // 2) Backfill to a real user id
    // Adjust the WHERE clause if you have a "role" column to select an employer.
    // This picks the first user in the table.
    migrationBuilder.Sql(@"
        WITH chosen AS (
          SELECT id FROM users ORDER BY id LIMIT 1
        )
        UPDATE job_postings
        SET employer_user_id = (SELECT id FROM chosen)
        WHERE employer_user_id IS NULL;
    ");

    // 3) Make NOT NULL (also drop any default if EF previously tried to set one)
    migrationBuilder.Sql(@"ALTER TABLE job_postings ALTER COLUMN employer_user_id DROP DEFAULT;");
    migrationBuilder.AlterColumn<int>(
        name: "employer_user_id",
        table: "job_postings",
        type: "integer",
        nullable: false,
        oldClrType: typeof(int),
        oldType: "integer",
        oldNullable: true);

    // 4) Index + FK
    migrationBuilder.CreateIndex(
        name: "ix_job_postings_employer_user_id",
        table: "job_postings",
        column: "employer_user_id");

    migrationBuilder.AddForeignKey(
        name: "fk_job_postings_users_employer_user_id",
        table: "job_postings",
        column: "employer_user_id",
        principalTable: "users",
        principalColumn: "id",
        onDelete: ReferentialAction.Restrict);
}

protected override void Down(MigrationBuilder migrationBuilder)
{
    migrationBuilder.DropForeignKey(
        name: "fk_job_postings_users_employer_user_id",
        table: "job_postings");

    migrationBuilder.DropIndex(
        name: "ix_job_postings_employer_user_id",
        table: "job_postings");

    migrationBuilder.DropColumn(
        name: "employer_user_id",
        table: "job_postings");
}

    }
}
