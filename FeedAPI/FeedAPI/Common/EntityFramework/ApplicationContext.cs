using Common.EntityFramework.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityFramework
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;

        public DbSet<UserType> UserTypes { get; set; } = null!;

        public DbSet<PassData> PassData { get; set; } = null!;

        public DbSet<UserSession> UserSessions { get; set; } = null!;

        public ApplicationContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=postgres");
        }
    }
}
