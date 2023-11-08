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
    public class AssetController : ControllerBase
    {
        private readonly IAssetService assetService;

        public AssetController(
            IAssetService assetService)
        {
            this.assetService = assetService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAssetssAsync()
        {
            try
            {
                List<Asset> deals = await this.assetService.GetAllAssets();
                if (deals.Count > 0)
                {
                    return this.Ok(deals);
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult("Assets not found.");
        }
    }
}
