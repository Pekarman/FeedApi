using Common.EntityFramework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IAssetService
    {
        public Task<List<Asset>> GetAllAssets();

        public Task<Asset> GetAssetAsync(int id);

        public Task<Asset> AddAssetAsync(Asset asset);
    }
}
