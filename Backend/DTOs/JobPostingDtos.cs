using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;
public class CreateJobRequest
{
    public string JobTitle { get; set; } = default!;
    public string JobType { get; set; } = default!;
    public string? Location { get; set; }
    public string? Department { get; set; }
    public decimal? MinSalary { get; set; }
    public decimal? MaxSalary { get; set; }
    public bool HideSalary { get; set; }
    public string Description { get; set; } = default!;
    public string CompanyName { get; set; } = default!;
    public string? CompanyWebsite { get; set; }

    // ⬇️ NEW
    public string? CompanyLogoUrl { get; set; }

    public string? CompanyDescription { get; set; }
}

public class UpdateJobRequest
{
    public string JobTitle { get; set; } = default!;
    public string JobType { get; set; } = default!;
    public string? Location { get; set; }
    public string? Department { get; set; }
    public decimal? MinSalary { get; set; }
    public decimal? MaxSalary { get; set; }
    public bool HideSalary { get; set; }
    public string Description { get; set; } = default!;
    public string CompanyName { get; set; } = default!;
    public string? CompanyWebsite { get; set; }

    // ⬇️ NEW
    public string? CompanyLogoUrl { get; set; }

    public string? CompanyDescription { get; set; }
}

public class JobResponse   // if you use a response DTO
{
    public int Id { get; set; }
    public string JobTitle { get; set; } = default!;
    public string JobType { get; set; } = default!;
    public string? Location { get; set; }
    public string? Department { get; set; }
    public decimal? MinSalary { get; set; }
    public decimal? MaxSalary { get; set; }
    public bool HideSalary { get; set; }
    public string Description { get; set; } = default!;
    public string CompanyName { get; set; } = default!;
    public string? CompanyWebsite { get; set; }

    // ⬇️ NEW
    public string? CompanyLogoUrl { get; set; }

    public string? CompanyDescription { get; set; }
    public DateTime CreatedUtc { get; set; }
    public DateTime? UpdatedUtc { get; set; }
}
