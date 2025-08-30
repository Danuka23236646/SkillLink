using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfilesController : ControllerBase
{
    private readonly AppDbContext _db;
    public ProfilesController(AppDbContext db) => _db = db;

    // GET: api/profiles
    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobSeekerProfile>>> GetAll()
    {
        var list = await _db.JobSeekerProfiles
            .Include(p => p.Experience)
            .Include(p => p.Education)
            .Include(p => p.Files)
            .OrderByDescending(p => p.Id)
            .ToListAsync();

        return Ok(list);
    }



    // GET: api/profiles/user/{userId}
    [HttpGet("user/{userId:int}")]
    public async Task<ActionResult<JobSeekerProfile>> GetByUserId(int userId)
    {
        var profile = await _db.JobSeekerProfiles
            .Include(x => x.Experience)
            .Include(x => x.Education)
            .Include(x => x.Files)
            .FirstOrDefaultAsync(x => x.UserId == userId);

        return profile is null ? NotFound() : Ok(profile);
    }


    // GET: api/profiles/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<JobSeekerProfile>> GetOne(int id)
    {
        var p = await _db.JobSeekerProfiles
            .Include(x => x.Experience)
            .Include(x => x.Education)
            .Include(x => x.Files)
            .FirstOrDefaultAsync(x => x.Id == id);

        return p is null ? NotFound() : Ok(p);
    }

    // POST: api/profiles
    [HttpPost]
    public async Task<ActionResult<JobSeekerProfile>> Create([FromBody] ProfileDto dto)
    {
        var entity = MapToEntity(dto, new JobSeekerProfile());
        _db.JobSeekerProfiles.Add(entity);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetOne), new { id = entity.Id }, entity);
    }

    // PUT: api/profiles/5
    [HttpPut("{id:int}")]
    public async Task<ActionResult<JobSeekerProfile>> Update(int id, [FromBody] ProfileDto dto)
    {
        var existing = await _db.JobSeekerProfiles
            .Include(x => x.Experience)
            .Include(x => x.Education)
            .Include(x => x.Files)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (existing is null) return NotFound();

        MapToEntity(dto, existing);

        // Replace children collections (simple, safe for your assignment)
        _db.WorkExperiences.RemoveRange(existing.Experience);
        _db.Educations.RemoveRange(existing.Education);
        _db.UploadedFiles.RemoveRange(existing.Files);

        existing.Experience = dto.Experience?.Select(MapExperience).ToList() ?? new();
        existing.Education  = dto.Education?.Select(MapEducation).ToList()   ?? new();
        existing.Files      = dto.Files?.Select(MapFile).ToList()            ?? new();

        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    // DELETE: api/profiles/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await _db.JobSeekerProfiles.FindAsync(id);
        if (existing is null) return NotFound();

        _db.JobSeekerProfiles.Remove(existing);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // -------- mapping helpers --------

    private static JobSeekerProfile MapToEntity(ProfileDto dto, JobSeekerProfile e)
    {
        e.FullName  = dto.FullName?.Trim() ?? "";
        e.JobTitle  = dto.JobTitle?.Trim() ?? "";
        e.Email     = dto.Email?.Trim() ?? "";
        e.Phone     = dto.Phone?.Trim() ?? "";
        e.Location  = dto.Location?.Trim() ?? "";
        e.About     = dto.About ?? "";
        e.IsPublic  = dto.IsPublic;


        e.UserId    = dto.UserId;

        e.SkillsCsv = dto.Skills is { Length: > 0 }
            ? string.Join(',', dto.Skills.Select(s => s.Trim()).Where(s => s.Length > 0))
            : "";
        return e;
    }

    private static WorkExperience MapExperience(ExperienceDto d)
    {
        var we = new WorkExperience
        {
            Company       = d.Company?.Trim() ?? "",
            Position      = d.Position?.Trim() ?? "",
            DurationLabel = d.Duration?.Trim() ?? "",
            Description   = d.Description ?? ""
        };

        // Optional ISO-date parsing if provided (e.g., "2020-01-01")
        if (TryDateOnly(d.StartDate, out var s)) we.StartDate = s;
        if (TryDateOnly(d.EndDate, out var e)) we.EndDate = e;
        return we;
    }

    private static Education MapEducation(EducationDto d)
    {
        var ed = new Education
        {
            Institution   = d.Institution?.Trim() ?? "",
            Degree        = d.Degree?.Trim() ?? "",
            DurationLabel = d.Duration?.Trim() ?? ""
        };
        if (TryDateOnly(d.StartDate, out var s)) ed.StartDate = s;
        if (TryDateOnly(d.EndDate, out var e)) ed.EndDate = e;
        return ed;
    }

    private static UploadedFile MapFile(FileDto d) => new UploadedFile
    {
        FileName    = d.FileName?.Trim() ?? "",
        ContentType = d.ContentType?.Trim() ?? "",
        SizeBytes   = d.SizeBytes,
        Url         = d.Url
    };

    private static bool TryDateOnly(string? input, out DateOnly value)
    {
        if (!string.IsNullOrWhiteSpace(input) &&
            DateOnly.TryParse(input, CultureInfo.InvariantCulture, DateTimeStyles.None, out var v))
        {
            value = v;
            return true;
        }
        value = default;
        return false;
    }
}

// ---------------- DTOs (shape them like your React state) ----------------

public record ProfileDto(
    string? FullName,
    string? JobTitle,
    string? Email,
    string? Phone,
    string? Location,
    string? About,
    bool IsPublic,
    string[]? Skills,
    List<ExperienceDto>? Experience,
    List<EducationDto>? Education,
    List<FileDto>? Files
);

public record ExperienceDto(
    string? Company,
    string? Position,
    string? Duration,
    string? Description,
    string? StartDate, // optional ISO date "YYYY-MM-DD"
    string? EndDate    // optional ISO date "YYYY-MM-DD"
);

public record EducationDto(
    string? Institution,
    string? Degree,
    string? Duration,
    string? StartDate, // optional ISO date
    string? EndDate    // optional ISO date
);

public record FileDto(
    string? FileName,
    string? ContentType,
    long SizeBytes,
    string? Url
);
