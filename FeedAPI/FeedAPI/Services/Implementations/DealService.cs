using Common.EntityFramework;
using Common.EntityFramework.Models;
using Common.Extensions;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
                    deals.ForEach(deal =>
                    {
                        deal.Assets = db.Assets.Where(i => i.DealId == deal.Id).ToList();
                    });

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
                    deal.Assets = db.Assets.Where(i => i.DealId == id).ToList();
                    deal.Bets = db.Bets.Where(b => b.DealId == deal.Id).ToList();

                    return deal;
                });
            }

            return deal;
        }

        public async Task<List<Deal>> GetOwnerDealsAsync(int userId)
        {
            List<Deal> deals = new List<Deal>();

            using (ApplicationContext db = new ApplicationContext())
            {
                await Task.Run(() => {
                    deals = db.Deals.Where(u => u.UserId == userId).ToList();

                    deals.ForEach(deal => deal.Assets = db.Assets.Where(i => i.DealId == deal.Id).ToList());

                    return deals;
                });
            }

            return deals;
        }

        public async Task<Deal> AddDealAsync(Deal deal)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                int id;
                if (db.Deals.Count() == 0) id = 1; else id = db.Deals.Max(item => (int)item.Id + 1);

                deal.Id = id;
                await db.Deals.AddAsync(deal);
                await db.SaveChangesAsync();

                var result = await db.Deals.FindAsync(id);
                return result;
            }
        }

        public async Task<Deal> ChangeDealAsync(Deal dealChanges)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                PropertyInfo[] ChangesProps = dealChanges.GetType().GetProperties();

                var id = (int)ChangesProps.Where(p => p.Name == "Id")?.FirstOrDefault()?.GetValue(dealChanges);
                
                Deal deal = db.Deals.Where(d => d.Id == id).FirstOrDefault();

                TypeExtension.CompareAndChangeType(dealChanges, deal);

                await db.SaveChangesAsync();

                var result = await db.Deals.FindAsync(deal.Id);
                return result;
            }
        }
    }
}
