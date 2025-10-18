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
            Console.WriteLine($"[DEBUG] Creating application for jobId={dto.JobId}, email={dto.Email}");
            var job = await _db.JobPostings.FindAsync(dto.JobId);
            if (job is null) {
                Console.WriteLine($"[DEBUG] Job not found for jobId={dto.JobId}");
                return NotFound(new { message = "Job not found" });
            }
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
            Console.WriteLine($"[DEBUG] Application created with id={app.Id} for jobId={app.JobId}");
            return CreatedAtAction(nameof(GetById), new { id = app.Id }, new { id = app.Id });
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<JobApplication>> GetById(int id)
        {
            var a = await _db.JobApplications
                             .Include(x => x.Job)
                             .FirstOrDefaultAsync(x => x.Id == id);
            if (a is null) return NotFound();

            // Try to find a matching JobSeekerProfile by email so frontend can link to the profile page
            var profile = await _db.JobSeekerProfiles.FirstOrDefaultAsync(p => p.Email.ToLower() == a.Email.ToLower());
            var result = new
            {
                id = a.Id,
                jobId = a.JobId,
                job = a.Job,
                fullName = a.FullName,
                email = a.Email,
                phone = a.Phone,
                address = a.Address,
                coverLetter = a.CoverLetter,
                appliedDateUtc = a.AppliedDateUtc,
                status = a.Status,
                applicantProfileId = profile?.Id
            };
            return Ok(result);
        }

        // Generic list with optional filters (email, companyName, jobId, employerUserId)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> List(
            [FromQuery] string? email = null,
            [FromQuery] string? companyName = null,
            [FromQuery] int? jobId = null,
            [FromQuery] int? employerUserId = null)
        {
            // Only return applications for the currently authenticated user
            var userEmail = User.FindFirstValue("email") ?? User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrWhiteSpace(userEmail))
            {
                // DEV fallback: allow ?userEmail= or X-Debug-Email header
                userEmail = HttpContext.Request.Query["userEmail"].FirstOrDefault();
                if (string.IsNullOrWhiteSpace(userEmail))
                {
                    userEmail = HttpContext.Request.Headers["X-Debug-Email"].FirstOrDefault();
                }
            }
            if (string.IsNullOrWhiteSpace(userEmail))
                return Unauthorized(new { message = "User email not found in claims, query, or header." });

            var q = _db.JobApplications.Include(a => a.Job)
                .Where(a => a.Email.ToLower() == userEmail.ToLower());
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
            Console.WriteLine($"[DEBUG] Fetched {items.Count} applications for userEmail={userEmail}");
            foreach (var i in items) Console.WriteLine($"[DEBUG] Application: id={i.id}, jobId={i.jobId}, jobTitle={i.jobTitle}, company={i.company}");
            return Ok(items);
        }

        // Employer-scoped list that uses the helper. Frontend can just call GET /api/applications/mine
        [HttpGet("mine")]
        public async Task<ActionResult<IEnumerable<object>>> ListForEmployer()
        {
            var employerUserId = GetEmployerUserIdOrFallback();
            Console.WriteLine($"[DEBUG] Fetching employer applications for employerUserId={employerUserId}");
            // Get job IDs posted by this employer
            var jobIds = await _db.JobPostings
                .Where(j => j.EmployerUserId == employerUserId)
                .Select(j => j.Id)
                .ToListAsync();
            Console.WriteLine($"[DEBUG] Employer owns {jobIds.Count} jobs: {string.Join(",", jobIds)}");
            if (jobIds.Count == 0)
            {
                Console.WriteLine("[DEBUG] No jobs posted by this employer.");
                return Ok(new List<object>()); // No jobs posted, no applications
            }
            var items = await _db.JobApplications
                .Include(a => a.Job)
                .Where(a => jobIds.Contains(a.JobId))
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
            Console.WriteLine($"[DEBUG] Fetched {items.Count} applications for employerUserId={employerUserId}");
            foreach (var i in items) Console.WriteLine($"[DEBUG] Application: id={i.id}, jobId={i.jobId}, jobTitle={i.jobTitle}, company={i.company}");
            return Ok(items);
        }
    }
}
