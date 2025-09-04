using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class JobPosting
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string JobTitle { get; set; } = "";

    [Required, MaxLength(40)]
    public string JobType { get; set; } = ""; // full-time | part-time | contract | internship | temporary

    [MaxLength(120)]
    public string? Location { get; set; }

    [MaxLength(120)]
    public string? Department { get; set; }

    [Range(0, double.MaxValue)]
    public decimal? MinSalary { get; set; }

    [Range(0, double.MaxValue)]
    public decimal? MaxSalary { get; set; }

    public bool HideSalary { get; set; }

    [Required]
    public string Description { get; set; } = "";

    [Required, MaxLength(160)]
    public string CompanyName { get; set; } = "";

    [MaxLength(200)]
    public string? CompanyWebsite { get; set; }

    public string? CompanyLogoUrl { get; set; }

    [MaxLength(1500)]
    public string? CompanyDescription { get; set; }

    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedUtc { get; set; }




    // NEW → who owns this job
    public int EmployerUserId { get; set; }
    public User? EmployerUser { get; set; }
}
