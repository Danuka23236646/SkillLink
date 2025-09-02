using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddJobs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "jobs",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    employer_user_id = table.Column<int>(type: "integer", nullable: true),
                    job_title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    job_type = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    location = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: true),
                    department = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    min_salary = table.Column<decimal>(type: "numeric", nullable: true),
                    max_salary = table.Column<decimal>(type: "numeric", nullable: true),
                    hide_salary = table.Column<bool>(type: "boolean", nullable: false),
                    description = table.Column<string>(type: "character varying(8000)", maxLength: 8000, nullable: false),
                    company_name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    company_website = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    company_logo_url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    company_description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    created_utc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_utc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_jobs", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "jobs");
        }
    }
}
