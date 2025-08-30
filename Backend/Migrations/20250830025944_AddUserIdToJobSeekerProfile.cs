using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToJobSeekerProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "user_id",
                table: "job_seeker_profiles",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_job_seeker_profiles_user_id",
                table: "job_seeker_profiles",
                column: "user_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_job_seeker_profiles_users_user_id",
                table: "job_seeker_profiles",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_job_seeker_profiles_users_user_id",
                table: "job_seeker_profiles");

            migrationBuilder.DropIndex(
                name: "ix_job_seeker_profiles_user_id",
                table: "job_seeker_profiles");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "job_seeker_profiles");
        }
    }
}
