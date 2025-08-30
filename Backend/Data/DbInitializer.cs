using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.Data;     // for AppDbContext
using Backend.Models;   // for User, JobPosting
using BCrypt.Net;       // for BCrypt.Net.BCrypt.HashPassword

namespace Backend
{
    public static class DbInitializer
    {
        public static async Task Initialize(AppDbContext context)
        {
            // Apply migrations (preferred over EnsureCreated)
            await context.Database.MigrateAsync();

            var changed = false;

            // ---- Seed Users (only if none) ----
            if (!await context.Users.AnyAsync())
            {
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

                await context.Users.AddRangeAsync(users);
                changed = true;
            }

            // ---- Seed a sample Job Posting (only if none) ----
            if (!await context.JobPostings.AnyAsync())
            {
                await context.JobPostings.AddAsync(new JobPosting
                {
                    JobTitle = "Senior Frontend Developer",
                    JobType = "full-time",
                    Location = "Remote",
                    Department = "Engineering",
                    MinSalary = 120000,
                    MaxSalary = 160000,
                    HideSalary = false,
                    Description = "Own our React SPA, performance, DX, and UI quality.",
                    CompanyName = "SkillLink",
                    CompanyWebsite = "https://example.com",
                    CompanyDescription = "We connect talent with real opportunities."
                });
                changed = true;
            }

            if (changed)
            {
                await context.SaveChangesAsync();
            }
        }
    }
}
