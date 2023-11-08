using Common.EntityFramework;
using Common.EntityFramework.Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
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
    }
}
