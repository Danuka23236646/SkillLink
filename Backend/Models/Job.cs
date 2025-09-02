// Models/Job.cs
using System.ComponentModel.DataAnnotations;

public class Job
{
    public int Id { get; set; }
    public int? EmployerUserId { get; set; }
    



    [Required, MaxLength(200)]
    public string JobTitle { get; set; } = string.Empty;

    [MaxLength(60)]
    public string JobType { get; set; } = string.Empty;

    [MaxLength(160)]
    public string? Location { get; set; }
    [MaxLength(120)]
    public string? Department { get; set; }

    public decimal? MinSalary { get; set; }
    public decimal? MaxSalary { get; set; }
    public bool HideSalary { get; set; }

    [Required, MaxLength(8000)]
    public string Description { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public string CompanyName { get; set; } = string.Empty;

    [MaxLength(300)]
    public string? CompanyWebsite { get; set; }
    [MaxLength(500)]
    public string? CompanyLogoUrl { get; set; }
    [MaxLength(2000)]
    public string? CompanyDescription { get; set; }

    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedUtc { get; set; } = DateTime.UtcNow;
}
