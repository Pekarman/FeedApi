using Common.EntityFramework;
using Common.EntityFramework.Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementations
{
    public class AuthService : IAuthService
    {
        public class LoginData
        {
            public string Email { get; set; }

            public string Password { get; set; }

            public string Phrase { get; set; }
        }


        public async Task<int> LoginAsync(LoginData loginData)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                User user = db.Users.Where(u => u.Username == loginData.Email).FirstOrDefault();
                if (user == null) throw new ArgumentException($"User with name {loginData.Email} is not exists.");

                PassData passData = db.PassData.Where(p => p.UserId == user.Id).FirstOrDefault();
                bool isPasswordMatch = BCrypt.Net.BCrypt.EnhancedVerify(loginData.Password, passData.PassHash);
                bool isPhraseMatch = BCrypt.Net.BCrypt.EnhancedVerify(loginData.Phrase, passData.SecretPhraseHash);

                if (!isPasswordMatch || !isPhraseMatch) throw new ArgumentException("Password or secret phrase is incorrect.");

                var id = db.UserSessions.Max(item => item.Id + 1);
                var time = DateTime.UtcNow;
                UserSession session = new UserSession(id, user.Id, user.Locale, time, time);

                db.UserSessions.Add(session);

                await db.SaveChangesAsync();

                return id;
            }
        }

        public async Task<bool> LogoutAsync(int sessionId)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                UserSession session = db.UserSessions.Where(u => u.Id == sessionId).FirstOrDefault();
                if (session == null) throw new ArgumentException($"UserSession with Id = {sessionId} is not exist.");

                db.UserSessions.Remove(session);

                await db.SaveChangesAsync();

                return true;
            }
        }
    }
}
