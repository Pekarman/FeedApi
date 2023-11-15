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
    public class UserSessionService : IUserSessionService
    {
        public async Task<List<UserSession>> GetAllUserSessionsAsync()
        {
            List<UserSession> sessions = new List<UserSession>();

            using (ApplicationContext db = new ApplicationContext())
            {
                await Task.Run(() => {
                    sessions = db.UserSessions.ToList();
                    return sessions;
                });
            }
            return sessions;
        }

        public async Task<UserSession> GetUserSessionAsync(int id)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                UserSession session = await db.UserSessions.FindAsync(id);
                return session;
            }
        }

        public async Task<UserSession> AddUserSessionAsync(int userId, string locale)
        {
            UserSession session;

            using (ApplicationContext db = new ApplicationContext())
            {
                int id;
                if (db.UserSessions.Count() == 0) id = 1; else id = db.UserSessions.Max(b => b.Id + 1);
                DateTime time = DateTime.Now;
                session = new UserSession(id, userId, locale, time, time);

                await db.UserSessions.AddAsync(session);
                await db.SaveChangesAsync();

                var result = await db.UserSessions.FindAsync(id);
                return result;
            }
        }

        public async Task<bool> DeleteUserSessionAsync(int userId)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                UserSession session = db.UserSessions.Where(u => u.UserId == userId).FirstOrDefault();
                if (session == null) throw new ArgumentException($"User session with userId {userId} does not exists.");

                db.UserSessions.Remove(session);
                await db.SaveChangesAsync();

                return true;
            }
        }
    }
}