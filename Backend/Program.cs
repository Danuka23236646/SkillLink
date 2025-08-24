using Backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using EFCore.NamingConventions;

var builder = WebApplication.CreateBuilder(args);

// --- Services ---
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers(); // use Controllers (ProfilesController)

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy => policy
        .WithOrigins("http://localhost:5173", "http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

builder.Services.ConfigureHttpJsonOptions(opts =>
{
    opts.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    opts.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

// EF Core + Neon (Postgres)
builder.Services.AddDbContext<AppDbContext>(opts =>
    opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
        .UseSnakeCaseNamingConvention());

var app = builder.Build();

// --- Middleware ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("frontend");
app.MapControllers();

// quick health
app.MapGet("/healthz", () => Results.Ok(new { status = "ok" }));

app.Run();
