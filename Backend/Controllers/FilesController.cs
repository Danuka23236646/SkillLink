using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/files")]
    public class FilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private static readonly string[] AllowedExts = new[] { ".png", ".jpg", ".jpeg", ".webp" };
        private const long MaxBytes = 5_000_000; // 5 MB

        public FilesController(IWebHostEnvironment env) => _env = env;

        // POST /api/files/logo  -> saves to /wwwroot/uploads
        [HttpPost("logo")]
        [RequestSizeLimit(MaxBytes)]
        public async Task<IActionResult> UploadLogo([FromForm] IFormFile? file)
        {
            return await SaveFileAsync(file, "uploads");
        }

        // POST /api/files/avatar -> saves to /wwwroot/uploads/avatars
        [HttpPost("avatar")]
        [RequestSizeLimit(MaxBytes)]
        public async Task<IActionResult> UploadAvatar([FromForm] IFormFile? file)
        {
            return await SaveFileAsync(file, Path.Combine("uploads", "avatars"));
        }

        // Shared save logic
        private async Task<IActionResult> SaveFileAsync(IFormFile? file, string relativeFolder)
        {
            if (file is null || file.Length == 0)
                return BadRequest(new { error = "No file uploaded." });

            if (file.Length > MaxBytes)
                return BadRequest(new { error = $"File too large. Max {MaxBytes / (1024 * 1024)} MB." });

            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!AllowedExts.Contains(ext))
                return BadRequest(new { error = "Only .png, .jpg, .jpeg, .webp allowed." });

            var webRoot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            var folder = Path.Combine(webRoot, relativeFolder);
            Directory.CreateDirectory(folder);

            var fileName = $"{Guid.NewGuid():N}{ext}";
            var filePath = Path.Combine(folder, fileName);

            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var urlPath = "/" + relativeFolder.Replace("\\", "/").Trim('/') + "/" + fileName;
            var url = $"{baseUrl}{urlPath}";

            return Ok(new { url, fileName, size = file.Length });
        }
    }
}
