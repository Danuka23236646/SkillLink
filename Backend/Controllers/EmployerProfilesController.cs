using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployerProfilesController : ControllerBase
{
    private readonly AppDbContext _db;
    public EmployerProfilesController(AppDbContext db) => _db = db;

    // GET: api/employerprofiles
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployerProfile>>> GetAll()
    {
        var list = await _db.EmployerProfiles
            .Include(p => p.Files)
            .OrderByDescending(p => p.Id)
            .ToListAsync();

        return Ok(list);
    }

    // GET: api/employerprofiles/user/123
    [HttpGet("user/{userId:int}")]
    public async Task<ActionResult<EmployerProfile>> GetByUserId(int userId)
    {
        var profile = await _db.EmployerProfiles
            .Include(x => x.Files)
            .FirstOrDefaultAsync(x => x.UserId == userId);

        return profile is null ? NotFound() : Ok(profile);
    }

    // GET: api/employerprofiles/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<EmployerProfile>> GetOne(int id)
    {
        var p = await _db.EmployerProfiles
            .Include(x => x.Files)
            .FirstOrDefaultAsync(x => x.Id == id);

        return p is null ? NotFound() : Ok(p);
    }

    // POST: api/employerprofiles
    [HttpPost]
    public async Task<ActionResult<EmployerProfile>> Create([FromBody] EmployerProfileDto dto)
    {
        var entity = Map(dto, new EmployerProfile());
        _db.EmployerProfiles.Add(entity);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetOne), new { id = entity.Id }, entity);
    }

    // PUT: api/employerprofiles/5
    [HttpPut("{id:int}")]
    public async Task<ActionResult<EmployerProfile>> Update(int id, [FromBody] EmployerProfileDto dto)
    {
        var existing = await _db.EmployerProfiles
            .Include(x => x.Files)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (existing is null) return NotFound();

        Map(dto, existing);
        existing.UpdatedUtc = DateTime.UtcNow;

        // Replace file collection (simple and safe)
        _db.EmployerFiles.RemoveRange(existing.Files);
        existing.Files = dto.Files?.Select(MapFile).ToList() ?? new();

        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    // DELETE: api/employerprofiles/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await _db.EmployerProfiles.FindAsync(id);
        if (existing is null) return NotFound();

        _db.EmployerProfiles.Remove(existing);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // -------- mapping helpers --------

    private static EmployerProfile Map(EmployerProfileDto d, EmployerProfile e)
    {
        e.UserId       = d.UserId;
        e.CompanyName  = d.CompanyName?.Trim() ?? string.Empty;
        e.WebsiteUrl   = string.IsNullOrWhiteSpace(d.WebsiteUrl) ? null : d.WebsiteUrl.Trim();
        e.Industry     = d.Industry?.Trim();
        e.Location     = d.Location?.Trim();
        e.AboutCompany = d.AboutCompany ?? string.Empty;
        e.IsPublic     = d.IsPublic;
        e.TagsCsv = d.Tags is { Length: > 0 }
            ? string.Join(',', d.Tags.Select(t => t.Trim()).Where(t => t.Length > 0))
            : string.Empty;

        if (e.Id == 0) e.CreatedUtc = DateTime.UtcNow;
        e.UpdatedUtc = DateTime.UtcNow;

        return e;
    }

    private static EmployerFile MapFile(EmployerFileDto d) => new EmployerFile
    {
        FileName    = d.FileName?.Trim() ?? string.Empty,
        ContentType = d.ContentType?.Trim() ?? string.Empty,
        SizeBytes   = d.SizeBytes,
        Url         = d.Url
    };
}

// ---------------- DTOs ----------------

public record EmployerProfileDto(
    int? Id,
    int UserId,
    string? CompanyName,
    string? WebsiteUrl,
    string? Industry,
    string? Location,
    string? AboutCompany,
    bool IsPublic,
    string[]? Tags,
    List<EmployerFileDto>? Files
);

public record EmployerFileDto(
    string? FileName,
    string? ContentType,
    long SizeBytes,
    string? Url
);
