using Common.EntityFramework.Models;
using Microsoft.EntityFrameworkCore;

namespace Common.EntityFramework
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Deal> Deals { get; set; } = null!;

        public DbSet<Asset> Assets { get; set; } = null!;

        public DbSet<User> Users { get; set; } = null!;

        public DbSet<UserType> UserTypes { get; set; } = null!;

        public DbSet<PassData> PassData { get; set; } = null!;

        public DbSet<UserSession> UserSessions { get; set; } = null!;

        public ApplicationContext()
        {
            //Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=postgres");
        }
    }
}
