using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Common.EntityFramework.Models;
using FeedAPI.SignalR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Services.Interfaces;

namespace FeedAPI.Controllers
{
    /// <summary>
    /// Deal controller.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class DealController : ControllerBase
    {
        private readonly IHubContext<BroadcastHub, IHubClient> hubContext;
        private readonly IDealService dealService;

        /// <summary>
        /// Initializes a new instance of the <see cref="DealController"/> class.
        /// </summary>
        /// <param name="dealService">Deal service.</param>
        /// <param name="hubContext">SignalR context.</param>
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
        /// Gets auction by deal id.
        /// </summary>
        /// <param name="dealId">Deal Id.</param>
        /// <returns>Founded auction.</returns>
        [HttpGet("GetAuctionByDealId/{dealId}")]
        public async Task<IActionResult> GetAuctionAsync(int dealId)
        {
            try
            {
                Auction auction = await this.dealService.GetAuctionAsync(dealId);

                if (auction != null)
                {
                    return this.Ok(auction);
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult($"Auction with dealId={dealId} not found.");
        }

        /// <summary>
        /// Get specific deal by filter.
        /// </summary>
        /// <param name="filter">Requested deal filter.</param>
        /// <returns>Requested deals.</returns>
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
        /// Deletes the deal.
        /// </summary>
        /// <param name="deal">Deal to delete.</param>
        /// <returns>True if success.</returns>
        [HttpPost("deleteDeal")]
        public async Task<IActionResult> DeleteDealAsync(Deal deal)
        {
            try
            {
                bool result = await this.dealService.DeleteDealAsync(deal);
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

            return new JsonResult($"Deal cannot be deleted.");
        }

        /// <summary>
        /// Sets autobet.
        /// </summary>
        /// <param name="autoBet">Autobet to set.</param>
        /// <returns>Updated auction.</returns>
        [HttpPost("setAutoBet")]
        public async Task<IActionResult> SetAutoBetAsync(AutoBet autoBet)
        {
            try
            {
                Auction result = await this.dealService.SetAutoBetAsync(autoBet);
                if (result != null)
                {
                    await this.hubContext.Clients.All.UpdateAuction(result);
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

            return new JsonResult($"Autobet cannot be set.");
        }

        /// <summary>
        /// Cancels autobet.
        /// </summary>
        /// <param name="autoBet">Autobet to cancel.</param>
        /// <returns>Updated auction.</returns>
        [HttpPost("cancelAutoBet")]
        public async Task<IActionResult> CancelAutoBetAsync(AutoBet autoBet)
        {
            try
            {
                Auction result = await this.dealService.CancelAutoBetAsync(autoBet);
                if (result != null)
                {
                    await this.hubContext.Clients.All.UpdateAuction(result);
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

            return new JsonResult($"Autobet cannot be canceled.");
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
                Auction result = await this.dealService.MakeBetAsync(bet);
                if (result != null)
                {
                    await this.hubContext.Clients.All.UpdateAuction(result);
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
        /// Buys the deal.
        /// </summary>
        /// <param name="sell">Sell info.</param>
        /// <returns>Created deal sell.</returns>
        [HttpPost("buyNow")]
        public async Task<IActionResult> BuyNowAsync(Sell sell)
        {
            try
            {
                Sell result = await this.dealService.BuyNowAsync(sell);
                if (result != null)
                {
                    // await this.hubContext.Clients.All.BetMade(result);
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
        /// <returns>True if success.</returns>
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
