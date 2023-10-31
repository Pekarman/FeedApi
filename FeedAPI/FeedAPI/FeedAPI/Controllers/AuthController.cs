using Common.EntityFramework.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static Services.Implementations.AuthService;

namespace FeedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService userService;

        private readonly IUserSessionService userSessionService;

        private readonly IAuthService authService;

        public AuthController(IUserService userSerrvice, IUserSessionService userSessionService, IAuthService authService)
        {
            this.userService = userService;
            this.userSessionService = userSessionService;
            this.authService = authService;
        }

        // Login
        [HttpPost]
        public async Task<IActionResult> LoginAsync(LoginData data)
        {
            try
            {
                var sessionId = await this.authService.LoginAsync(data);
                var session = await this.userSessionService.GetUserSessionAsync(sessionId);
                var user = await this.userService.GetUserAsync(session.UserId);

                session.user = user;

                if (session != null)
                {
                    return this.Ok(session);
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult("User sessions not found.");
        }

        // Delete user session
        [HttpDelete]
        public async Task<IActionResult> DeleteUserSessionAsync(int sessionId)
        {
            try
            {
                bool result = await this.authService.LogoutAsync(sessionId);
                if (result)
                {
                    return this.Ok($"UserSession with sessionId {sessionId} was deleted.");
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
    }
}
