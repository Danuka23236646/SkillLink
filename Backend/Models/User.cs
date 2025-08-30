using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class User
{
    public int Id { get; set; }

    [Required, MaxLength(120)]
    public string FullName { get; set; } = string.Empty;

    [Required, MaxLength(160)]
    public string Email { get; set; } = string.Empty;

    // "jobseeker" or "employer"
    [Required, MaxLength(40)]
    public string Role { get; set; } = "jobseeker";

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;

    // Navigation property to profile
    public JobSeekerProfile? Profile { get; set; }
}
