using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class CreateJobPosting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "job_postings",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    job_title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    job_type = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    location = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    department = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    min_salary = table.Column<decimal>(type: "numeric", nullable: true),
                    max_salary = table.Column<decimal>(type: "numeric", nullable: true),
                    hide_salary = table.Column<bool>(type: "boolean", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    company_name = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    company_website = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    company_logo_url = table.Column<string>(type: "text", nullable: true),
                    company_description = table.Column<string>(type: "character varying(1500)", maxLength: 1500, nullable: true),
                    created_utc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_utc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_job_postings", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_job_postings_created_utc",
                table: "job_postings",
                column: "created_utc");

            migrationBuilder.CreateIndex(
                name: "ix_job_postings_job_title_job_type",
                table: "job_postings",
                columns: new[] { "job_title", "job_type" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "job_postings");
        }
    }
}
