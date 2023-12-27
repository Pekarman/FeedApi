using Common.EntityFramework.Models;
using FeedAPI.SignalR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DealController : ControllerBase
    {
        private readonly IHubContext<BroadcastHub, IHubClient> hubContext;
        private readonly IDealService dealService;

        public DealController(
            IDealService dealService,
            IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            this.dealService = dealService;
            this.hubContext = hubContext;
        }

        /// <summary>
        /// Get all deals.
        /// </summary>
        /// <returns>All deals.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllDealsAsync()
        {
            try
            {
                List<Deal> deals = await this.dealService.GetAllDeals();
                if (deals.Count > 0)
                {
                    return this.Ok(deals);
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult("Deals not found.");
        }

        /// <summary>
        /// Get specific deal.
        /// </summary>
        /// <param name="id">Requested deal id.</param>
        /// <returns>Requested deal.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDealAsync(int id)
        {
            try
            {
                Deal deal = await this.dealService.GetDealAsync(id);
                if (deal != null)
                {
                    return this.Ok(deal);
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult($"Deal with id={id} not found.");
        }

        /// <summary>
        /// Get specific deal owned by user.
        /// </summary>
        /// <param name="userId">Requested deal id.</param>
        /// <returns>Requested deal.</returns>
        [HttpPost("getDealByFilter")]
        public async Task<IActionResult> GetDealsByFilterAsync(DealFilter filter)
        {
            try
            {
                List<Deal> deals = await this.dealService.GetOwnerDealsAsync(filter);
                if (deals != null)
                {
                    return this.Ok(deals);
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult($"Deal with filter {filter} not found.");
        }

        /// <summary>
        /// Add new deal.
        /// </summary>
        /// <param name="deal">Deal to create.</param>
        /// <returns>Created deal.</returns>
        [HttpPut]
        public async Task<IActionResult> AddDealAsync(Deal deal)
        {
            try
            {
                Deal result = await this.dealService.AddDealAsync(deal);
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

            return new JsonResult($"Deal cannot be added.");
        }

        /// <summary>
        /// Changes the deal.
        /// </summary>
        /// <param name="changeDeal">Deal to change.</param>
        /// <returns>Changed deal.</returns>
        [HttpPost("changeDeal")]
        public async Task<IActionResult> ChangeDealAsync(Deal changeDeal)
        {
            try
            {
                Deal result = await this.dealService.ChangeDealAsync(changeDeal);
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

            return new JsonResult($"Deal cannot be changed.");
        }

        /// <summary>
        /// Makes bet.
        /// </summary>
        /// <param name="bet">Bet to make.</param>
        /// <returns>Made bet.</returns>
        [HttpPost("makeBet")]
        public async Task<IActionResult> MakeBetAsync(Bet bet)
        {
            try
            {
                Bet result = await this.dealService.MakeBetAsync(bet);
                if (result != null)
                {
                    await this.hubContext.Clients.All.BetMade(result);
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
        /// Changes the deal.
        /// </summary>
        /// <param name="watchDeal">WatchDeal to change.</param>
        /// <returns>Changed deal.</returns>
        [HttpPost("addWatchDeal")]
        public async Task<IActionResult> AddWatchDealAsync(WatchDeal watchDeal)
        {
            try
            {
                WatchDeal result = await this.dealService.AddWatchDealAsync(watchDeal);
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

            return new JsonResult($"WatchDeal cannot be added.");
        }

        /// <summary>
        /// Deletes WatchDeal.
        /// </summary>
        /// <param name="watchDeal">WatchDeal to delete.</param>
        /// <returns>true if success</returns>
        [HttpPost("deleteWatchDeal")]
        public async Task<IActionResult> DeleteWatchDealAsync(WatchDeal watchDeal)
        {
            try
            {
                bool result = await this.dealService.DeleteWatchDealAsync((int)watchDeal.Id);
                if (result)
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

            return new JsonResult($"WatchDeal cannot be deleted.");
        }

        /// <summary>
        /// Changes the deal status to active.
        /// </summary>
        /// <param name="dealId">Deal Id to change.</param>
        /// <returns>Changed deal.</returns>
        [HttpGet("moveToActiveStatus/{dealId}")]
        public async Task<IActionResult> MoveToActiveStatusAsync(int dealId)
        {
            try
            {
                Deal result = await this.dealService.MoveToActiveStatusAsync(dealId);
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

            return new JsonResult($"Deal cannot be moved to Active status.");
        }

    }
}
