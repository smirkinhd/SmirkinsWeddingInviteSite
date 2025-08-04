using Microsoft.EntityFrameworkCore;
using WeddingSmirkinsSite.Models; 

namespace WeddingSmirkinsSite.DataBase;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Registration> Registrations => Set<Registration>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Registration>()
            .HasIndex(r => r.PhoneNumber)
            .IsUnique();
    }
}
