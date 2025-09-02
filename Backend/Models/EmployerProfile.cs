using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

public class EmployerProfile
{
    [Key]
    public int Id { get; set; }

    [ForeignKey(nameof(User))]
    public int? UserId { get; set; }
    public User? User { get; set; }

    // Company basics
    [Required, MaxLength(200)]
    public string CompanyName { get; set; } = string.Empty;

    [MaxLength(300)]
    public string? WebsiteUrl { get; set; }

    [MaxLength(200)]
    public string? Industry { get; set; }

    [MaxLength(200)]
    public string? Location { get; set; }

    [MaxLength(4000)]
    public string? AboutCompany { get; set; }

    public bool IsPublic { get; set; } = true;

    // simple list of tags (e.g., "FinTech,Remote-friendly,Startup")
    [MaxLength(1000)]
    public string TagsCsv { get; set; } = string.Empty;

    public List<EmployerFile> Files { get; set; } = new();

    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedUtc { get; set; } = DateTime.UtcNow;
}

public class EmployerFile
{
    [Key]
    public int Id { get; set; }

    [ForeignKey(nameof(Profile))]
    public int ProfileId { get; set; }
    public EmployerProfile Profile { get; set; } = default!;

    [Required, MaxLength(260)]
    public string FileName { get; set; } = string.Empty;

    [MaxLength(120)]
    public string ContentType { get; set; } = string.Empty;

    public long SizeBytes { get; set; }

    [MaxLength(500)]
    public string? Url { get; set; }
}
