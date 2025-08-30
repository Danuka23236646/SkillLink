using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class CreateJobDto
{
    [Required, MaxLength(200)]
    public string JobTitle { get; set; } = "";

    [Required, MaxLength(40)]
    public string JobType { get; set; } = "";

    public string? Location { get; set; }
    public string? Department { get; set; }
    public decimal? MinSalary { get; set; }
    public decimal? MaxSalary { get; set; }
    public bool HideSalary { get; set; }
    [Required]
    public string Description { get; set; } = "";

    [Required, MaxLength(160)]
    public string CompanyName { get; set; } = "";
    public string? CompanyWebsite { get; set; }
    public string? CompanyLogoUrl { get; set; }
    public string? CompanyDescription { get; set; }
}

public class UpdateJobDto : CreateJobDto { }

public class JobSummaryDto
{
    public int Id { get; set; }
    public string JobTitle { get; set; } = "";
    public string JobType { get; set; } = "";
    public string? Location { get; set; }
    public string CompanyName { get; set; } = "";
    public decimal? MinSalary { get; set; }
    public decimal? MaxSalary { get; set; }
    public bool HideSalary { get; set; }
    public DateTime CreatedUtc { get; set; }
}
