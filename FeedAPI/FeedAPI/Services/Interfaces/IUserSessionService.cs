using Common.EntityFramework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IUserSessionService
    {
        public Task<List<UserSession>> GetAllUserSessionsAsync();

        public Task<UserSession> GetUserSessionAsync(int id);

        public Task<UserSession> AddUserSessionAsync(int userId, string locale);

        public Task<bool> DeleteUserSessionAsync(int userId);
    }
}
