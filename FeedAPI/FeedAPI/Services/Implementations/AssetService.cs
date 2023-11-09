using Common.EntityFramework;
using Common.EntityFramework.Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementations
{
    public class AssetService : IAssetService
    {
        public async Task<List<Asset>> GetAllAssets()
        {
            List<Asset> assets = new List<Asset>();

            using (ApplicationContext db = new ApplicationContext())
            {
                await Task.Run(() => {
                    assets = db.Assets.ToList();
                    return assets;
                });
            }
            return assets;
        }

        public async Task<Asset> GetAssetAsync(int id)
        {
            Asset asset = new Asset();

            using (ApplicationContext db = new ApplicationContext())
            {
                await Task.Run(() => {
                    asset = db.Assets.Where(u => u.Id == id).FirstOrDefault();

                    return asset;
                });
            }

            return asset;
        }

        public async Task<Asset> AddAssetAsync(Asset asset)
        {

            using (ApplicationContext db = new ApplicationContext())
            {
                var path = asset.ImageName;

                int id;
                if (db.Assets.Count() == 0) id = 1; else id = db.Assets.Max(item => item.Id + 1);

                asset.Id = id;
                asset.ImageData = File.ReadAllBytes(path);
                asset.ImageName = asset.ImageName.Split('/').LastOrDefault();

                await db.Assets.AddAsync(asset);
                await db.SaveChangesAsync();

                var result = await db.Assets.FindAsync(id);
                return result;
            }
        }
    }
}
