using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddProfileImageToJobSeekerProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_job_seeker_profiles_user_id",
                table: "job_seeker_profiles");

            migrationBuilder.AddColumn<string>(
                name: "profile_image_url",
                table: "job_seeker_profiles",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_job_seeker_profiles_user_id",
                table: "job_seeker_profiles",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_job_seeker_profiles_user_id",
                table: "job_seeker_profiles");

            migrationBuilder.DropColumn(
                name: "profile_image_url",
                table: "job_seeker_profiles");

            migrationBuilder.CreateIndex(
                name: "ix_job_seeker_profiles_user_id",
                table: "job_seeker_profiles",
                column: "user_id",
                unique: true);
        }
    }
}
