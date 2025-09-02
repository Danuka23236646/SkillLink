using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly AppDbContext _db;
    public JobsController(AppDbContext db) { _db = db; }

    // GET /api/jobs?search=react&page=1&pageSize=10&jobType=full-time
    [HttpGet]
    public async Task<ActionResult<object>> GetAll(
        [FromQuery] string? search,
        [FromQuery] string? jobType,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var q = _db.JobPostings.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.ToLower();
            q = q.Where(j =>
                j.JobTitle.ToLower().Contains(s) ||
                (j.Location ?? "").ToLower().Contains(s) ||
                j.CompanyName.ToLower().Contains(s) ||
                (j.Department ?? "").ToLower().Contains(s));
        }

        if (!string.IsNullOrWhiteSpace(jobType))
        {
            var t = jobType.ToLower();
            q = q.Where(j => j.JobType.ToLower() == t);
        }

        var total = await q.CountAsync();

        var items = await q
            .OrderByDescending(j => j.CreatedUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(j => new JobResponse
            {
                Id = j.Id,
                JobTitle = j.JobTitle,
                JobType = j.JobType,
                Location = j.Location,
                Department = j.Department,
                MinSalary = j.MinSalary,
                MaxSalary = j.MaxSalary,
                HideSalary = j.HideSalary,
                Description = j.Description,
                CompanyName = j.CompanyName,
                CompanyWebsite = j.CompanyWebsite,
                CompanyLogoUrl = j.CompanyLogoUrl,     // 👈 needed for logo in UI
                CompanyDescription = j.CompanyDescription,
                CreatedUtc = j.CreatedUtc,
                UpdatedUtc = j.UpdatedUtc
            })
            .ToListAsync();

        return Ok(new { total, page, pageSize, items });
    }

    // GET /api/jobs/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<JobPosting>> GetOne(int id)
    {
        var job = await _db.JobPostings.FindAsync(id);
        return job is null ? NotFound() : Ok(job);
    }

    // POST /api/jobs
    [HttpPost]
    public async Task<ActionResult<JobPosting>> Create([FromBody] CreateJobRequest dto)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        if (dto.MinSalary.HasValue && dto.MaxSalary.HasValue && dto.MinSalary > dto.MaxSalary)
        {
            ModelState.AddModelError(nameof(dto.MaxSalary), "Max salary must be >= min salary.");
            return ValidationProblem(ModelState);
        }

        var job = new JobPosting
        {
            JobTitle = dto.JobTitle.Trim(),
            JobType = dto.JobType.Trim(),
            Location = dto.Location?.Trim(),
            Department = dto.Department?.Trim(),
            MinSalary = dto.MinSalary,
            MaxSalary = dto.MaxSalary,
            HideSalary = dto.HideSalary,
            Description = dto.Description,
            CompanyName = dto.CompanyName.Trim(),
            CompanyWebsite = dto.CompanyWebsite?.Trim(),
            CompanyLogoUrl = dto.CompanyLogoUrl?.Trim(),
            CompanyDescription = dto.CompanyDescription
        };

        _db.JobPostings.Add(job);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOne), new { id = job.Id }, job);
    }

    // PUT /api/jobs/5
    [HttpPut("{id:int}")]
    public async Task<ActionResult<JobPosting>> Update(int id, [FromBody] UpdateJobRequest dto)
    {
        var job = await _db.JobPostings.FindAsync(id);
        if (job is null) return NotFound();
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        if (dto.MinSalary.HasValue && dto.MaxSalary.HasValue && dto.MinSalary > dto.MaxSalary)
        {
            ModelState.AddModelError(nameof(dto.MaxSalary), "Max salary must be >= min salary.");
            return ValidationProblem(ModelState);
        }

        job.JobTitle = dto.JobTitle.Trim();
        job.JobType = dto.JobType.Trim();
        job.Location = dto.Location?.Trim();
        job.Department = dto.Department?.Trim();
        job.MinSalary = dto.MinSalary;
        job.MaxSalary = dto.MaxSalary;
        job.HideSalary = dto.HideSalary;
        job.Description = dto.Description;
        job.CompanyName = dto.CompanyName.Trim();
        job.CompanyWebsite = dto.CompanyWebsite?.Trim();
        job.CompanyLogoUrl = dto.CompanyLogoUrl?.Trim();
        job.CompanyDescription = dto.CompanyDescription;
        job.UpdatedUtc = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return Ok(job);
    }

    // DELETE /api/jobs/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var job = await _db.JobPostings.FindAsync(id);
        if (job is null) return NotFound();

        _db.JobPostings.Remove(job);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
