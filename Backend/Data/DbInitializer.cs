using Backend.Models;
using BCrypt.Net;

namespace Backend.Data;

public static class DbInitializer
{
    public static async Task Initialize(AppDbContext context)
    {
        // Ensure database is created
        await context.Database.EnsureCreatedAsync();

        // Check if users already exist
        if (context.Users.Any())
        {
            return; // Database already seeded
        }

        // Create test users
        var users = new List<User>
        {
            new User
            {
                FullName = "John Doe",
                Email = "john@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                Role = "jobseeker"
            },
            new User
            {
                FullName = "Jane Smith",
                Email = "jane@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                Role = "employer"
            },
            new User
            {
                FullName = "Admin User",
                Email = "admin@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                Role = "admin"
            }
        };

        context.Users.AddRange(users);
        await context.SaveChangesAsync();
    }
}
