// backend/Models/JobApplication.cs
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class JobApplication
    {
        public int Id { get; set; }

        [Required] public int JobId { get; set; }
        public JobPosting? Job { get; set; }

        [Required, MaxLength(120)]
        public string FullName { get; set; } = default!;

        [Required, MaxLength(200)]
        public string Address  { get; set; } = default!;

        [Required, MaxLength(40)]
        public string Phone    { get; set; } = default!;

        [Required, EmailAddress, MaxLength(160)]
        public string Email    { get; set; } = default!;

        [MaxLength(4000)]
        public string? CoverLetter { get; set; }

        public DateTime AppliedDateUtc { get; set; } = DateTime.UtcNow;

        [Required, MaxLength(40)]
        public string Status { get; set; } = "submitted";
    }
}
