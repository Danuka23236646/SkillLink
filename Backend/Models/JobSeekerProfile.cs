using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

/// <summary>
/// Root profile entity for a job seeker (maps to UI fields in JobSeekerProfile.jsx)
/// </summary>
public class JobSeekerProfile
{
    [Key]
    public int Id { get; set; }

    // Link to User (nullable to avoid migration issues)
    [ForeignKey(nameof(User))]
    public int? UserId { get; set; }
    public User? User { get; set; }

    // Personal
    [Required, MaxLength(120)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(120)]
    public string JobTitle { get; set; } = string.Empty;

    [Required, MaxLength(160)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(40)]
    public string Phone { get; set; } = string.Empty;

    [MaxLength(120)]
    public string Location { get; set; } = string.Empty;

    // "About" textarea
    [MaxLength(4000)]
    public string About { get; set; } = string.Empty;

    // Visibility toggle
    public bool IsPublic { get; set; } = true;

    // Simple way to store skills quickly (comma‑separated)
    // Example: "React,JavaScript,TypeScript,HTML,CSS,UI/UX Design,Node.js"
    [MaxLength(1000)]
    public string SkillsCsv { get; set; } = string.Empty;

    // Portfolio / uploaded docs metadata (files should live in object storage; save only metadata/URL here)
    public List<UploadedFile> Files { get; set; } = new();

    // Experience & Education (1‑to‑many)
    public List<WorkExperience> Experience { get; set; } = new();
    public List<Education> Education { get; set; } = new();

    // Auditing
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedUtc { get; set; } = DateTime.UtcNow;
}

/// <summary>
/// Work experience entries shown under the Experience tab
/// </summary>
public class WorkExperience
{
    [Key]
    public int Id { get; set; }

    [ForeignKey(nameof(Profile))]
    public int ProfileId { get; set; }
    public JobSeekerProfile Profile { get; set; } = default!;

    [Required, MaxLength(160)]
    public string Company { get; set; } = string.Empty;

    [Required, MaxLength(160)]
    public string Position { get; set; } = string.Empty;

    // e.g. "2020 - Present"
    [MaxLength(60)]
    public string DurationLabel { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;

    // Optional normalized dates (useful for sorting/filtering)
    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
}

/// <summary>
/// Education entries shown under the Education section
/// </summary>
public class Education
{
    [Key]
    public int Id { get; set; }

    [ForeignKey(nameof(Profile))]
    public int ProfileId { get; set; }
    public JobSeekerProfile Profile { get; set; } = default!;

    [Required, MaxLength(200)]
    public string Institution { get; set; } = string.Empty;

    [Required, MaxLength(160)]
    public string Degree { get; set; } = string.Empty;

    // e.g. "2014 - 2018"
    [MaxLength(60)]
    public string DurationLabel { get; set; } = string.Empty;

    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
}

/// <summary>
/// Metadata for uploaded portfolio/documents (resume, certificates, images, etc.)
/// </summary>
public class UploadedFile
{
    [Key]
    public int Id { get; set; }

    [ForeignKey(nameof(Profile))]
    public int ProfileId { get; set; }
    public JobSeekerProfile Profile { get; set; } = default!;

    [Required, MaxLength(260)]
    public string FileName { get; set; } = string.Empty;

    // MIME type, e.g., "application/pdf"
    [MaxLength(120)]
    public string ContentType { get; set; } = string.Empty;

    // Size in bytes (your UI shows MB; convert on the client)
    public long SizeBytes { get; set; }

    // Where the file actually lives (S3/Azure Blob/etc.)
    [MaxLength(500)]
    public string? Url { get; set; }
}
