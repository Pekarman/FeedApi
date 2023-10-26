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
        public async Task<IActionResult> AddUserAsync(string username, string password, string secretPhrase)
        {
            try
            {
                User user = await this.userService.AddUserAsync(username, password, secretPhrase);
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

        // Change user password or secret phrase
        [HttpPatch]
        public async Task<IActionResult> ChangePasswordAsync(string username, string oldPassword, string newPassword, bool isPassword)
        {
            try
            {
                bool result = isPassword
                    ? await this.userService.ChangePasswordAsync(username, oldPassword, newPassword)
                    : await this.userService.ChangeSecretPhraseAsync(username, oldPassword, newPassword);

                if (result)
                {
                    return this.Ok("Password was changed.");
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
    }
}
