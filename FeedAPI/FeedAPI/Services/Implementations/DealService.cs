using Common.EntityFramework;
using Common.EntityFramework.Models;
using Common.Extensions;
using Services.Interfaces;
using System;
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
                        var user = db.Users.Where(u => u.Id == deal.UserId).FirstOrDefault();
                        deal.UserFullName = user.FirstName + " " + user.LastName;
                        deal.Assets = db.Assets.Where(i => i.DealId == deal.Id).ToList();
                        deal.Bets = db.Bets.Where(b => b.DealId == deal.Id).ToList();
                        deal.WatchDeals = db.WatchDeals.Where(w => w.DealId == deal.Id).ToList();
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

                    var user = db.Users.Where(u => u.Id == deal.UserId).FirstOrDefault();
                    deal.UserFullName = user.FirstName + " " + user.LastName;
                    deal.Assets = db.Assets.Where(i => i.DealId == deal.Id).ToList();
                    deal.Bets = db.Bets.Where(b => b.DealId == deal.Id).ToList();
                    deal.WatchDeals = db.WatchDeals.Where(w => w.DealId == deal.Id).ToList();

                    return deal;
                });
            }

            return deal;
        }

        public async Task<List<Deal>> GetOwnerDealsAsync(DealFilter filter)
        {
            List<Deal> deals = new List<Deal>();

            using (ApplicationContext db = new ApplicationContext())
            {
                await Task.Run(() => {
                    if (filter.userId != -1) deals.AddRange(db.Deals.Where(u => u.UserId == filter.userId).ToList());
                    if (filter.categoryId != -1) deals.AddRange(db.Deals.Where(u => u.CategoryId == filter.categoryId).ToList());

                    if (filter.watchUserId != -1)
                    {
                        var watchDeals = db.WatchDeals.Where(w => w.UserId == filter.watchUserId).ToList();
                        foreach (var watchDeal in watchDeals)
                        {
                            deals.Add(db.Deals.Where(d => d.Id == watchDeal.DealId).FirstOrDefault());
                        }
                    }

                    if (filter.boughtUserId != -1)
                    {
                        var sells = db.Sells.Where(s => s.UserId == filter.boughtUserId).ToList();
                        foreach (var sell in sells)
                        {
                            deals.Add(db.Deals.Where(d => d.Id == sell.DealId).FirstOrDefault());
                        }
                    }

                    if (filter.sellUserId != -1)
                    {
                        var sells = db.Sells.Where(s => s.OwnerId == filter.sellUserId).ToList();
                        foreach (var sell in sells)
                        {
                            deals.Add(db.Deals.Where(d => d.Id == sell.DealId).FirstOrDefault());
                        }
                    }

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

        public async Task<Bet> MakeBetAsync(Bet bet)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                int id;
                if (db.Bets.Count() == 0) id = 1; else id = db.Bets.Max(item => (int)item.Id + 1);
                bet.Id = id;

                var sameBets = db.Bets.Where(b => b.UserId == bet.UserId && b.DealId == bet.DealId);
                db.Bets.RemoveRange(sameBets);

                await db.Bets.AddAsync(bet);
                await db.SaveChangesAsync();

                var result = await db.Bets.FindAsync(id);
                return result;
            }
        }

        public async Task<Sell> BuyNowAsync(Sell sell)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                int id;
                if (db.Sells.Count() == 0) id = 1; else id = db.Sells.Max(item => (int)item.Id + 1);
                sell.Id = id;

                Deal deal = db.Deals.Where(d => d.Id == sell.DealId).FirstOrDefault();
                User owner = db.Users.Where(d => d.Id == deal.UserId).FirstOrDefault(); 

                User user = db.Users.Where(u => u.Id == sell.UserId).FirstOrDefault();

                if (!user.Balance.HasValue || user.Balance < deal.PriceBuyNow)
                {
                    throw new ArgumentException("Low balance");
                }

                if (deal.StatusId != 1) throw new ArgumentException("Deal status is not active");
                    
                user.Balance -= deal.PriceBuyNow;
                owner.Balance += deal.PriceBuyNow;
                deal.StatusId = 3;

                await db.Sells.AddAsync(sell);
                await db.SaveChangesAsync();

                var result = await db.Sells.FindAsync(id);
                return result;
            }
        }

        public async Task<WatchDeal> AddWatchDealAsync(WatchDeal watchDeal)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                int id;
                if (db.WatchDeals.Count() == 0) id = 1; else id = db.WatchDeals.Max(item => (int)item.Id + 1);

                watchDeal.Id = id;
                await db.WatchDeals.AddAsync(watchDeal);
                await db.SaveChangesAsync();

                var result = await db.WatchDeals.FindAsync(id);
                return result;
            }
        }

        public async Task<bool> DeleteWatchDealAsync(int id)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                var watchDeal = db.WatchDeals.Where(w =>  w.Id == id).FirstOrDefault();

                if (watchDeal == null) return false;

                db.WatchDeals.Remove(watchDeal);
                await db.SaveChangesAsync();

                return true;
            }
        }

        public async Task<Deal> MoveToActiveStatusAsync(int dealId)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                Deal deal = db.Deals.Where(w => w.Id == dealId).FirstOrDefault();

                if (deal == null) throw new ArgumentNullException($"Deal with dealId={dealId} is not exists");

                deal.StatusId = 1;

                await db.SaveChangesAsync();

                return deal;
            }
        }
    }
}
