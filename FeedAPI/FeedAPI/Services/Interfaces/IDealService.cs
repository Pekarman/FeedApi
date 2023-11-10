using Common.EntityFramework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IDealService
    {
        public Task<List<Deal>> GetAllDeals();

        public Task<Deal> GetDealAsync(int id);

        public Task<Deal> AddDealAsync(Deal deal);

        public Task<List<Deal>> GetOwnerDealsAsync(int userId);
    }
}
