using Common.EntityFramework;
using Common.EntityFramework.Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementations
{
    public class UserService : IUserService
    {
        public async Task<List<User>> GetAllUsersAsync()
        {
            List<User> users = new List<User>();

            using (ApplicationContext db = new ApplicationContext())
            {
                await Task.Run(() => {
                    users = db.Users.Join(
                        db.UserTypes,
                        o => o.UserTypeId, i => i.Id,
                        (i, o) => new User(
                            i.Id,
                            i.Username,
                            i.UserTypeId,
                            o.TypeName,
                            i.Email,
                            i.Phone,
                            i.PassportNumber,
                            i.BankAccount,
                            i.BankCode,
                            i.CompanyName,
                            i.Balance,
                            i.IsActive)).ToList();

                    return users;
                });
            }

            return users;
        }

        public async Task<User> GetUserAsync(int id)
        {
            User user = new User();

            using (ApplicationContext db = new ApplicationContext())
            {
                await Task.Run(() => {
                    user = db.Users.Where(u => u.Id == id).Join(
                        db.UserTypes,
                        o => o.UserTypeId,
                        i => i.Id,
                        (i, o) => new User(
                            i.Id,
                            i.Username,
                            i.UserTypeId,
                            o.TypeName,
                            i.Email,
                            i.Phone,
                            i.PassportNumber,
                            i.BankAccount,
                            i.BankCode,
                            i.CompanyName,
                            i.Balance,
                            i.IsActive)).FirstOrDefault();

                    return user;
                });
            }

            return user;
        }

        public async Task<User> AddUserAsync(string username, string password, string secretPhrase, int usertypeid = 2)
        {
            User user;

            using (ApplicationContext db = new ApplicationContext())
            {
                bool isExistUsername = db.Users.Where(u => u.Username == username).Any();

                if (isExistUsername) throw new ArgumentException($"User with name {username} already exists.");

                int id = db.Users.Count() + 1;
                user = new User(id, username, usertypeid);

                var passHash = BCrypt.Net.BCrypt.EnhancedHashPassword(password, 11);
                var secretPhraseHash = BCrypt.Net.BCrypt.EnhancedHashPassword(secretPhrase, 11);

                await db.Users.AddAsync(user);
                await db.PassData.AddAsync(new PassData(id, passHash, secretPhraseHash));
                await db.SaveChangesAsync();

                var result = await db.Users.FindAsync(id);
                return result;
            }
        }

        public async Task<User> ChangeUserAsync(User user)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                User result = db.Users.Where(u => u.Username == user.Username).FirstOrDefault();
                if (result == null) throw new ArgumentException($"User with name {user.Username} is not exists.");


                if (result.UserTypeId != user.UserTypeId) result.UserTypeId = user.UserTypeId;
                if (result.Email != user.Email) result.Email = user.Email;
                if (result.Phone != user.Phone) result.Phone = user.Phone;
                if (result.PassportNumber != user.PassportNumber) result.PassportNumber = user.PassportNumber;
                if (result.PayerRegNumber != user.PayerRegNumber) result.PayerRegNumber = user.PayerRegNumber;
                if (result.BankAccount != user.BankAccount) result.BankAccount = user.BankAccount;
                if (result.BankCode != user.BankCode) result.BankCode = user.BankCode;
                if (result.IsActive != user.IsActive) result.IsActive = user.IsActive;

                db.Users.Update(result);
                await db.SaveChangesAsync();

                return result;
            }
        }

        public async Task<bool> ChangePasswordAsync(string username, string oldPassword, string newPassword)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                User user = db.Users.Where(u => u.Username == username).FirstOrDefault();
                if (user == null) throw new ArgumentException($"User with name {username} is not exists.");

                PassData passData = db.PassData.Where(p => p.UserId == user.Id).FirstOrDefault();
                bool isMatch = BCrypt.Net.BCrypt.EnhancedVerify(oldPassword, passData.PassHash);

                if (!isMatch) throw new ArgumentException("Old password is incorrect.");

                var newPassHash = BCrypt.Net.BCrypt.EnhancedHashPassword(newPassword, 11);
                passData.PassHash = newPassHash;

                db.PassData.Update(passData);
                await db.SaveChangesAsync();

                return true;
            }
        }

        public async Task<bool> ChangeSecretPhraseAsync(string username, string oldPhrase, string newPhrase)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                User user = db.Users.Where(u => u.Username == username).FirstOrDefault();
                if (user == null) throw new ArgumentException($"User with name {username} is not exists.");

                PassData passData = db.PassData.Where(p => p.UserId == user.Id).FirstOrDefault();
                bool isMatch = BCrypt.Net.BCrypt.EnhancedVerify(oldPhrase, passData.SecretPhraseHash);

                if (!isMatch) throw new ArgumentException("Old password is incorrect.");

                var newPassHash = BCrypt.Net.BCrypt.EnhancedHashPassword(newPhrase, 11);
                passData.SecretPhraseHash = newPassHash;

                db.PassData.Update(passData);
                await db.SaveChangesAsync();

                return true;
            }
        }

        public async Task<bool> DeleteUserAsync(string username, string password)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                User user = db.Users.Where(u => u.Username == username).FirstOrDefault();
                if (user == null) throw new ArgumentException($"User with name {username} does not exists.");

                PassData passData = db.PassData.Where(p => p.UserId == user.Id).FirstOrDefault();
                bool isMatch = BCrypt.Net.BCrypt.EnhancedVerify(password, passData.PassHash);

                if (!isMatch) throw new ArgumentException("Password is incorrect.");

                db.Users.Remove(user);
                db.PassData.Remove(passData);
                await db.SaveChangesAsync();

                return true;
            }
        }
    }
}