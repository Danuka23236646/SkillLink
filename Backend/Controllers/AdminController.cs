using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _db;
    public AdminController(AppDbContext db) => _db = db;

    // GET: api/admin/users
    [HttpGet("users")]
    public async Task<ActionResult<IEnumerable<object>>> GetAllUsers()
    {
        var users = await _db.Users
            .OrderBy(u => u.Id)
            .Select(u => new { u.Email, u.Role })
            .ToListAsync();
        return Ok(users);
    }

    // GET: api/admin/jobs
    [HttpGet("jobs")]
    public async Task<ActionResult<IEnumerable<object>>> GetAllJobs()
    {
        var jobs = await _db.JobPostings
            .OrderByDescending(j => j.CreatedUtc)
            .Select(j => new {
                j.Id,
                j.JobTitle,
                j.JobType,
                j.Location,
                j.Department,
                j.MinSalary,
                j.MaxSalary,
                j.HideSalary,
                j.Description,
                j.CompanyName,
                j.CompanyWebsite,
                j.CompanyLogoUrl,
                j.CompanyDescription,
                j.CreatedUtc,
                j.UpdatedUtc
            })
            .ToListAsync();
        return Ok(jobs);
    }

    // GET: api/admin/jobs/count
    [HttpGet("jobs/count")]
    public async Task<ActionResult<int>> GetActiveJobsCount()
    {
        var count = await _db.JobPostings.CountAsync();
        return Ok(count);
    }

    // GET: api/admin/users/count
    [HttpGet("users/count")]
    public async Task<ActionResult<int>> GetUsersCount()
    {
        var count = await _db.Users.CountAsync();
        return Ok(count);
    }
}
