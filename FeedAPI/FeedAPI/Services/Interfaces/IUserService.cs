using Common.EntityFramework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IUserService
    {
        public Task<List<User>> GetAllUsersAsync();

        public Task<User> GetUserAsync(int id);

        public Task<User> AddUserAsync(string username, string password, string secretPhrase, int usertypeid = 2);

        public Task<bool> DeleteUserAsync(string username, string password);

        public Task<User> ChangeUserAsync(User user);

        public Task<bool> ChangePasswordAsync(string username, string oldPassword, string newPassword);

        public Task<bool> ChangeSecretPhraseAsync(string username, string oldPhrase, string newPhrase);
    }
}
