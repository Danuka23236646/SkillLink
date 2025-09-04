using System.Security.Claims;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ApplicationsController(AppDbContext db) { _db = db; }

        // DEV/PROD helper:
        // 1) Tries to read employer user id from auth claims (uid or NameIdentifier)
        // 2) While you don't have auth wired, it falls back to ?employerUserId=... or X-Debug-UserId header
        private int GetEmployerUserIdOrFallback()
        {
            var v = User.FindFirstValue("uid") ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (int.TryParse(v, out var id)) return id;

            if (int.TryParse(HttpContext.Request.Query["employerUserId"], out id)) return id;

            var hdr = HttpContext.Request.Headers["X-Debug-UserId"].FirstOrDefault();
            if (int.TryParse(hdr, out id)) return id;

            throw new InvalidOperationException("Employer user id not found in claims, query string, or header.");
        }

        public record CreateDto(int JobId, string FullName, string Address, string Phone, string Email, string? CoverLetter);

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateDto dto)
        {
            var job = await _db.JobPostings.FindAsync(dto.JobId);
            if (job is null) return NotFound(new { message = "Job not found" });

            var app = new JobApplication
            {
                JobId = dto.JobId,
                FullName = dto.FullName.Trim(),
                Address = dto.Address.Trim(),
                Phone = dto.Phone.Trim(),
                Email = dto.Email.Trim().ToLowerInvariant(),
                CoverLetter = dto.CoverLetter,
                AppliedDateUtc = DateTime.UtcNow,
                Status = "submitted"
            };

            _db.JobApplications.Add(app);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = app.Id }, new { id = app.Id });
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<JobApplication>> GetById(int id)
        {
            var a = await _db.JobApplications
                             .Include(x => x.Job)
                             .FirstOrDefaultAsync(x => x.Id == id);
            return a is null ? NotFound() : Ok(a);
        }

        // Generic list with optional filters (email, companyName, jobId, employerUserId)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> List(
            [FromQuery] string? email = null,
            [FromQuery] string? companyName = null,
            [FromQuery] int? jobId = null,
            [FromQuery] int? employerUserId = null)
        {
            var q = _db.JobApplications.Include(a => a.Job).AsQueryable();

            if (!string.IsNullOrWhiteSpace(email))
                q = q.Where(a => a.Email == email);

            if (jobId is not null)
                q = q.Where(a => a.JobId == jobId.Value);

            // If you added EmployerUserId to JobPosting, this works; otherwise remove this filter or add the column + migration.
            if (employerUserId is not null)
                q = q.Where(a => a.Job!.EmployerUserId == employerUserId.Value);

            if (!string.IsNullOrWhiteSpace(companyName))
                q = q.Where(a => a.Job != null && a.Job.CompanyName.ToLower() == companyName.ToLower());

            var items = await q.OrderByDescending(a => a.AppliedDateUtc)
                .Select(a => new
                {
                    id = a.Id,
                    jobId = a.JobId,
                    jobTitle = a.Job!.JobTitle,
                    company = a.Job.CompanyName,
                    logo = a.Job.CompanyLogoUrl,
                    location = a.Job.Location,
                    status = a.Status,
                    appliedDate = a.AppliedDateUtc,
                    applicantName = a.FullName,
                    applicantEmail = a.Email,
                    applicantPhone = a.Phone
                })
                .ToListAsync();

            return Ok(items);
        }

        // Employer-scoped list that uses the helper. Frontend can just call GET /api/applications/mine
        [HttpGet("mine")]
        public async Task<ActionResult<IEnumerable<object>>> ListForEmployer()
        {
            var employerUserId = GetEmployerUserIdOrFallback();

            var items = await _db.JobApplications
                .Include(a => a.Job)
                .Where(a => a.Job!.EmployerUserId == employerUserId)  // requires EmployerUserId on JobPosting
                .OrderByDescending(a => a.AppliedDateUtc)
                .Select(a => new
                {
                    id = a.Id,
                    jobId = a.JobId,
                    jobTitle = a.Job!.JobTitle,
                    company = a.Job.CompanyName,
                    logo = a.Job.CompanyLogoUrl,
                    location = a.Job.Location,
                    status = a.Status,
                    appliedDate = a.AppliedDateUtc,
                    applicantName = a.FullName,
                    applicantEmail = a.Email,
                    applicantPhone = a.Phone
                })
                .ToListAsync();

            return Ok(items);
        }
    }
}
