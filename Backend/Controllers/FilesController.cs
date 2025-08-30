using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/files")]
public class FilesController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    private static readonly string[] AllowedExts = new[] { ".png", ".jpg", ".jpeg", ".webp" };
    private const long MaxBytes = 5_000_000; // 5 MB

    public FilesController(IWebHostEnvironment env) => _env = env;

    [HttpPost("logo")]
    [RequestSizeLimit(MaxBytes)]
    public async Task<IActionResult> UploadLogo([FromForm] IFormFile? file)
    {
        if (file is null || file.Length == 0)
            return BadRequest(new { error = "No file uploaded." });

        if (file.Length > MaxBytes)
            return BadRequest(new { error = "File too large. Max 5 MB." });

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!AllowedExts.Contains(ext))
            return BadRequest(new { error = "Only .png, .jpg, .jpeg, .webp allowed." });

        var webRoot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        var uploadsDir = Path.Combine(webRoot, "uploads");
        Directory.CreateDirectory(uploadsDir);

        var safeName = $"{Guid.NewGuid():N}{ext}";
        var savePath = Path.Combine(uploadsDir, safeName);

        using (var stream = System.IO.File.Create(savePath))
        {
            await file.CopyToAsync(stream);
        }

        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        var url = $"{baseUrl}/uploads/{safeName}";

        return Ok(new { url, fileName = safeName, size = file.Length });
    }
}
