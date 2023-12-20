using Common.EntityFramework.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Common.EntityFramework
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Deal> Deals { get; set; } = null!;

        public DbSet<Bet> Bets { get; set; } = null!;

        public DbSet<Asset> Assets { get; set; } = null!;

        public DbSet<User> Users { get; set; } = null!;

        public DbSet<WatchDeal> WatchDeals { get; set; } = null!;

        public DbSet<UserType> UserTypes { get; set; } = null!;

        public DbSet<PassData> PassData { get; set; } = null!;

        public DbSet<UserSession> UserSessions { get; set; } = null!;

        public ApplicationContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder();
            builder.SetBasePath(Directory.GetCurrentDirectory());
            builder.AddJsonFile("appsettings.json");
            var config = builder.Build();
            var connectionString = config.GetConnectionString("DefaultConnection");

            optionsBuilder.UseNpgsql(connectionString);
        }
    }
}
