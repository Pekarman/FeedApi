using Common.EntityFramework.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using Services.Interfaces;

namespace FeedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BetController : ControllerBase
    {
        private readonly IBetService betService;

        public BetController(
            IBetService betService)
        {
            this.betService = betService;
        }

        /// <summary>
        /// Add new bet.
        /// </summary>
        /// <param name="bet">Bet to create.</param>
        /// <returns>Created bet.</returns>
        [HttpPut]
        public async Task<IActionResult> AddBetAsync(Bet bet)
        {
            try
            {
                Bet result = await this.betService.AddBetAsync(bet);
                if (result != null)
                {
                    return this.Ok(result);
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

            return new JsonResult($"Bet cannot be added.");
        }

        /// <summary>
        /// Changes the bet.
        /// </summary>
        /// <param name="changeBet">Bet to change.</param>
        /// <returns>Changed bet.</returns>
        [HttpPost("changeBet")]
        public async Task<IActionResult> ChangeDealAsync(Bet changeBet)
        {
            try
            {
                Bet result = await this.betService.ChangeBetAsync(changeBet);
                if (result != null)
                {
                    return this.Ok(result);
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

            return new JsonResult($"Bet cannot be changed.");
        }
    }
}
