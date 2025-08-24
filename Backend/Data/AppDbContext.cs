using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<JobSeekerProfile> JobSeekerProfiles => Set<JobSeekerProfile>();
    public DbSet<WorkExperience>   WorkExperiences   => Set<WorkExperience>();
    public DbSet<Education>        Educations        => Set<Education>();
    public DbSet<UploadedFile>     UploadedFiles     => Set<UploadedFile>();

    // ✅ Add Users
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        base.OnModelCreating(b);

        // --- JobSeekerProfile ---
        b.Entity<JobSeekerProfile>(e =>
        {
            e.Property(p => p.FullName).HasMaxLength(120);
            e.Property(p => p.JobTitle).HasMaxLength(120);
            e.Property(p => p.Email).HasMaxLength(160);
            e.Property(p => p.Phone).HasMaxLength(40);
            e.Property(p => p.Location).HasMaxLength(120);
            e.Property(p => p.About).HasMaxLength(4000);
            e.Property(p => p.SkillsCsv).HasMaxLength(1000);

            e.HasMany(p => p.Experience)
             .WithOne(x => x.Profile)
             .HasForeignKey(x => x.ProfileId)
             .OnDelete(DeleteBehavior.Cascade);

            e.HasMany(p => p.Education)
             .WithOne(x => x.Profile)
             .HasForeignKey(x => x.ProfileId)
             .OnDelete(DeleteBehavior.Cascade);

            e.HasMany(p => p.Files)
             .WithOne(x => x.Profile)
             .HasForeignKey(x => x.ProfileId)
             .OnDelete(DeleteBehavior.Cascade);

            e.Property(p => p.CreatedUtc).HasDefaultValueSql("CURRENT_TIMESTAMP");
            e.Property(p => p.UpdatedUtc).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        // --- WorkExperience ---
        b.Entity<WorkExperience>(e =>
        {
            e.Property(p => p.Company).HasMaxLength(160);
            e.Property(p => p.Position).HasMaxLength(160);
            e.Property(p => p.DurationLabel).HasMaxLength(60);
            e.Property(p => p.Description).HasMaxLength(2000);

            e.Property(p => p.StartDate).HasColumnType("date");
            e.Property(p => p.EndDate).HasColumnType("date");
        });

        // --- Education ---
        b.Entity<Education>(e =>
        {
            e.Property(p => p.Institution).HasMaxLength(200);
            e.Property(p => p.Degree).HasMaxLength(160);
            e.Property(p => p.DurationLabel).HasMaxLength(60);

            e.Property(p => p.StartDate).HasColumnType("date");
            e.Property(p => p.EndDate).HasColumnType("date");
        });

        // --- UploadedFile ---
        b.Entity<UploadedFile>(e =>
        {
            e.Property(p => p.FileName).HasMaxLength(260);
            e.Property(p => p.ContentType).HasMaxLength(120);
            e.Property(p => p.Url).HasMaxLength(500);
        });

        // --- User ---
        b.Entity<User>(e =>
        {
            e.Property(u => u.FullName).HasMaxLength(120);
            e.Property(u => u.Email).HasMaxLength(160);
            e.Property(u => u.Role).HasMaxLength(40);
            e.HasIndex(u => u.Email).IsUnique(); // ✅ enforce unique email
        });
    }

    // Auto-manage UpdatedUtc/CreatedUtc on profile changes
    public override int SaveChanges()
    {
        TouchProfileTimestamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        TouchProfileTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void TouchProfileTimestamps()
    {
        var now = DateTime.UtcNow;
        foreach (var entry in ChangeTracker.Entries<JobSeekerProfile>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedUtc = now;
                entry.Entity.UpdatedUtc = now;
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedUtc = now;
            }
        }
    }
}
