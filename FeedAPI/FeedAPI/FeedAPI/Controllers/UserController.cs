using Common.EntityFramework;
using Common.EntityFramework.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        // Get all users
        [HttpGet]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            try
            {
                List<User> users = await this.userService.GetAllUsersAsync();
                if (users.Count > 0)
                {
                    return this.Ok(users);
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult("Users not found.");
        }

        // Get specific user
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserAsync(int id)
        {
            try
            {
                User user = await this.userService.GetUserAsync(id);
                if (user != null)
                {
                    return this.Ok(user);
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult($"User with id={id} not found.");
        }

        [HttpPost]
        public async Task<IActionResult> ChangeUserAsync(User userdata)
        {
            try
            {
                User user = await this.userService.ChangeUserAsync(userdata);
                if (user != null)
                {
                    return this.Ok(user);
                }
            }
            catch (ArgumentException e)
            {
                return new JsonResult(e.Message);
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult($"User cannot be changed.");
        }

        // Add new user
        [HttpPut]
        public async Task<IActionResult> AddUserAsync(UserRegister regUser)
        {
            try
            {
                User user = await this.userService.AddUserAsync(regUser.firstName, regUser.lastName, regUser.username, regUser.email, regUser.password, regUser.phrase);
                if (user != null)
                {
                    return this.Ok(user);
                }
            }
            catch (ArgumentException e)
            {
                return new JsonResult(e.Message);
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult($"User cannot be added.");
        }

        public class ChangePassword
        {
            public string username { get; set; }

            public string oldPassword { get; set; }

            public string newPassword { get; set; }

            public bool isPassword { get; set; }

        }

        // Change user password or secret phrase
        [HttpPatch]
        public async Task<IActionResult> ChangePasswordAsync(ChangePassword changePassword)
        {
            try
            {
                bool result = changePassword.isPassword
                    ? await this.userService.ChangePasswordAsync(changePassword.username, changePassword.oldPassword, changePassword.newPassword)
                    : await this.userService.ChangeSecretPhraseAsync(changePassword.username, changePassword.oldPassword, changePassword.newPassword);

                if (result)
                {
                    return this.Ok(new JsonResult("Password was changed."));
                }
            }
            catch (ArgumentException e)
            {
                return new JsonResult(e.Message);
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult("Password cannot be changed.");
        }

        // Delete user
        [HttpDelete]
        public async Task<IActionResult> DeleteUserAsync(string username, string password)
        {
            try
            {
                bool result = await this.userService.DeleteUserAsync(username, password);
                if (result)
                {
                    return this.Ok($"User with name {username} was deleted.");
                }
            }
            catch (ArgumentException e)
            {
                return new JsonResult(e.Message);
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult($"User cannot be deleted.");
        }

        public class UserRegister
        {
            public string firstName { get; set; }

            public string lastName { get; set; }

            public string username { get; set; }

            public string email { get; set; }

            public string password { get; set; }

            public string phrase { get; set; }
        }

    }
}
