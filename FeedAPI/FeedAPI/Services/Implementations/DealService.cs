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
    public class DealService : IDealService
    {
        public async Task<List<Deal>> GetAllDeals()
        {
            List<Deal> deals = new List<Deal>();

            using (ApplicationContext db = new ApplicationContext())
            {
                await Task.Run(() => {
                    deals = db.Deals.ToList();
                    return deals;
                });
            }
            return deals;
        }

        public async Task<Deal> GetDealAsync(int id)
        {
            Deal deal = new Deal();

            using (ApplicationContext db = new ApplicationContext())
            {
                await Task.Run(() => {
                    deal = db.Deals.Where(u => u.Id == id).FirstOrDefault();

                    return deal;
                });
            }

            return deal;
        }

        public async Task<Deal> AddDealAsync(Deal deal)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                int id;
                if (db.Deals.Count() == 0) id = 1; else id = db.Deals.Max(item => item.Id + 1);

                deal.Id = id;
                await db.Deals.AddAsync(deal);
                await db.SaveChangesAsync();

                var result = await db.Deals.FindAsync(id);
                return result;
            }
        }

    }
}
