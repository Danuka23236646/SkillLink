using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization; // 👈 added

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest req)
    {
        req.Email = req.Email.Trim().ToLower();

        if (string.IsNullOrWhiteSpace(req.Password) || req.Password.Length < 8)
            return BadRequest("Password must be at least 8 characters.");

        var exists = await _db.Users.AnyAsync(u => u.Email == req.Email);
        if (exists) return Conflict("Email already in use.");

        var user = new User
        {
            FullName = req.FullName.Trim(),
            Email = req.Email,
            Role = string.IsNullOrWhiteSpace(req.Role) ? "jobseeker" : req.Role.Trim().ToLower(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password)
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return Ok(new AuthResponse
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role,
            Token = GenerateJwt(user)
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest req)
    {
        var email = req.Email.Trim().ToLower();
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user is null) return Unauthorized("Invalid credentials");

        var ok = BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash);
        if (!ok) return Unauthorized("Invalid credentials");

        return Ok(new AuthResponse
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role,
            Token = GenerateJwt(user)
        });
    }

    // ---------- NEW: Change password ----------
    public record ChangePasswordRequest(string CurrentPassword, string NewPassword);

    [Authorize]
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.CurrentPassword) || string.IsNullOrWhiteSpace(req.NewPassword))
            return BadRequest("Passwords are required.");

        // Strength check: 8+ chars, uppercase, digit, special
        if (!IsStrong(req.NewPassword))
            return BadRequest("Password must be at least 8 characters and include an uppercase letter, a number, and a special character.");

        var userId = GetUserIdFromClaims();
        if (userId is null) return Unauthorized();

        var user = await _db.Users.FindAsync(userId.Value);
        if (user is null) return Unauthorized();

        // Verify current password with BCrypt
        var ok = BCrypt.Net.BCrypt.Verify(req.CurrentPassword, user.PasswordHash);
        if (!ok) return BadRequest("Current password is incorrect.");

        // Set new hash
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.NewPassword);
        await _db.SaveChangesAsync();

        return NoContent();
    }
    // -----------------------------------------

    private string GenerateJwt(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Name, user.FullName),
            new Claim(ClaimTypes.Role, user.Role),
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(int.Parse(_config["Jwt:ExpiresMinutes"] ?? "60")),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    // Helpers (keep private to this controller)
    private int? GetUserIdFromClaims()
    {
        // Prefer "sub"; fall back to NameIdentifier if your JWT mapping adds it
        var idStr = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                  ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

        return int.TryParse(idStr, out var id) ? id : null;
    }

    private static bool IsStrong(string pwd)
    {
        if (string.IsNullOrEmpty(pwd) || pwd.Length < 8) return false;
        bool upper = false, digit = false, special = false;
        foreach (var c in pwd)
        {
            if (char.IsUpper(c)) upper = true;
            else if (char.IsDigit(c)) digit = true;
            else if (!char.IsLetterOrDigit(c)) special = true;
        }
        return upper && digit && special;
    }
}
