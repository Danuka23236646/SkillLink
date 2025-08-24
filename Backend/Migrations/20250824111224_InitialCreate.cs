using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "job_seeker_profiles",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    full_name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    job_title = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    email = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    phone = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    location = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    about = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: false),
                    is_public = table.Column<bool>(type: "boolean", nullable: false),
                    skills_csv = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    created_utc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_utc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_job_seeker_profiles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "educations",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    profile_id = table.Column<int>(type: "integer", nullable: false),
                    institution = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    degree = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    duration_label = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    start_date = table.Column<DateOnly>(type: "date", nullable: true),
                    end_date = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_educations", x => x.id);
                    table.ForeignKey(
                        name: "fk_educations_job_seeker_profiles_profile_id",
                        column: x => x.profile_id,
                        principalTable: "job_seeker_profiles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "uploaded_files",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    profile_id = table.Column<int>(type: "integer", nullable: false),
                    file_name = table.Column<string>(type: "character varying(260)", maxLength: 260, nullable: false),
                    content_type = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    size_bytes = table.Column<long>(type: "bigint", nullable: false),
                    url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_uploaded_files", x => x.id);
                    table.ForeignKey(
                        name: "fk_uploaded_files_job_seeker_profiles_profile_id",
                        column: x => x.profile_id,
                        principalTable: "job_seeker_profiles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "work_experiences",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    profile_id = table.Column<int>(type: "integer", nullable: false),
                    company = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    position = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    duration_label = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    start_date = table.Column<DateOnly>(type: "date", nullable: true),
                    end_date = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_work_experiences", x => x.id);
                    table.ForeignKey(
                        name: "fk_work_experiences_job_seeker_profiles_profile_id",
                        column: x => x.profile_id,
                        principalTable: "job_seeker_profiles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_educations_profile_id",
                table: "educations",
                column: "profile_id");

            migrationBuilder.CreateIndex(
                name: "ix_uploaded_files_profile_id",
                table: "uploaded_files",
                column: "profile_id");

            migrationBuilder.CreateIndex(
                name: "ix_work_experiences_profile_id",
                table: "work_experiences",
                column: "profile_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "educations");

            migrationBuilder.DropTable(
                name: "uploaded_files");

            migrationBuilder.DropTable(
                name: "work_experiences");

            migrationBuilder.DropTable(
                name: "job_seeker_profiles");
        }
    }
}
