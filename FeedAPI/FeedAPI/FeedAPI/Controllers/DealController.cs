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
    public class DealController : ControllerBase
    {
        private readonly IDealService dealService;

        public DealController(
            IDealService dealService)
        {
            this.dealService = dealService;
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
        [HttpPost]
        public async Task<IActionResult> GetOwnerDealsAsync(int userId)
        {
            try
            {
                List<Deal> deals = await this.dealService.GetOwnerDealsAsync(userId);
                if (deals != null)
                {
                    return this.Ok(deals);
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult($"Deal with owner id={userId} not found.");
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
    }
}
