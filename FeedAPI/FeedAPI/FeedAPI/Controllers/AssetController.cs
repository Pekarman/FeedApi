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
    public class AssetController : ControllerBase
    {
        private readonly IAssetService assetService;

        public AssetController(
            IAssetService assetService)
        {
            this.assetService = assetService;
        }

        [HttpGet("migrateAssets")]
        public async Task<IActionResult> MigrateAssetsAsync()
        {
            try
            {
                using (ApplicationContext db = new ApplicationContext())
                {
                    using (ApplicationContext dbDev = new ApplicationContextDev())
                    {
                        var assets = dbDev.Assets;
                        await db.Assets.AddRangeAsync(assets);

                        await db.SaveChangesAsync();

                        return this.Ok(assets);
                    }
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }
        }

        /// <summary>
        /// Get all assets.
        /// </summary>
        /// <returns>All assets.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllAssetsAsync()
        {
            try
            {
                List<Asset> assets = await this.assetService.GetAllAssets();
                if (assets.Count > 0)
                {
                    return this.Ok(assets);
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult("Assets not found.");
        }


        /// <summary>
        /// Get specific asset.
        /// </summary>
        /// <param name="id">Requested asset id.</param>
        /// <returns>Requested Asset.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAssetAsync(int id)
        {
            try
            {
                Asset asset = await this.assetService.GetAssetAsync(id);
                if (asset != null)
                {
                    return this.Ok(asset);
                }
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult($"Asset with id={id} not found.");
        }

        /// <summary>
        /// Add new asset.
        /// </summary>
        /// <param name="asset">Asset to create.</param>
        /// <returns>Created asset.</returns>
        [HttpPut]
        public async Task<IActionResult> AddAssetAsync(Asset asset)
        {
            try
            {
                Asset result = await this.assetService.AddAssetAsync(asset);
                if (result != null)
                {
                    return this.Ok(asset);
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

            return new JsonResult($"Asset cannot be added.");
        }
    }
}
