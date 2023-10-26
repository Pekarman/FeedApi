using Common.EntityFramework.Models;
using Microsoft.AspNetCore.Http;
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
    public class UserSessionController : ControllerBase
    {
        private readonly IUserSessionService userSessionService;

        public UserSessionController(IUserSessionService userSessionService)
        {
            this.userSessionService = userSessionService;
        }

        // Get all user sessions
        [HttpGet]
        public async Task<IActionResult> GetAllUserSessionsAsync()
        {
            try
            {
                List<UserSession> sessions = await this.userSessionService.GetAllUserSessionsAsync();
                if (sessions.Count > 0)
                {
                    return this.Ok(sessions);
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult("User sessions not found.");
        }

        // Get specific user session
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserSessionAsync(int id)
        {
            try
            {
                UserSession session = await this.userSessionService.GetUserSessionAsync(id);
                if (session != null)
                {
                    return this.Ok(session);
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult($"User session with id={id} not found.");
        }

        // Add new user session
        [HttpPut]
        public async Task<IActionResult> AddUserSessionAsync(int userId, string locale)
        {
            try
            {
                UserSession session = await this.userSessionService.AddUserSessionAsync(userId, locale);
                if (session != null)
                {
                    return this.Ok(session);
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

            return new JsonResult($"User session cannot be added.");
        }

        // Delete user session
        [HttpDelete]
        public async Task<IActionResult> DeleteUserSessionAsync(int userId)
        {
            try
            {
                bool result = await this.userSessionService.DeleteUserSessionAsync(userId);
                if (result)
                {
                    return this.Ok($"User with userId {userId} was deleted.");
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

            return new JsonResult($"User session cannot be deleted.");
        }
    }
}
