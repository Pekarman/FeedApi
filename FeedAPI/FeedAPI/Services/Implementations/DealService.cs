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
        ITaskService taskService;
        public DealService(ITaskService _taskService)
        {
            this.taskService = _taskService;
        }

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

        public async Task<Auction> GetAuctionAsync(int dealId)
        {
            Auction auction = null;
            using (ApplicationContext db = new ApplicationContext())
            {
                auction = db.Auctions.Where(u => u.DealId == dealId).FirstOrDefault();

                if (auction == null)
                {
                    Deal deal = db.Deals.Where(d => d.Id == dealId).FirstOrDefault();
                    auction = await this.CreateAuctionFromDeal(deal, db);
                }

                if (auction != null)
                {
                    auction.Bets = db.Bets.Where(b => b.DealId == dealId).ToList();
                    auction.AutoBets = db.AutoBets.Where(a => a.DealId == dealId).ToList();
                }

                return auction;
            }
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

                    deals.ForEach(deal => {
                        if (deal == null) return;
                        deal.Assets = db.Assets.Where(a => a.DealId == deal.Id).ToList();
                        deal.WatchDeals = db.WatchDeals.Where(w => w.DealId == deal.Id).ToList();
                    });

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

                Auction auction = db.Auctions.Where(a => a.DealId == id).FirstOrDefault();
                if (auction == null) auction = await this.CreateAuctionFromDeal(deal, db);
                else
                {
                    auction.AuctionStart = deal.StartTime;
                    auction.AuctionLength = deal.Duration;
                    auction.AuctionEnd = auction.AuctionStart.Value.AddSeconds((double)deal.Duration);
                }

                var bets = db.Bets.Where(b => b.DealId == deal.Id).ToList();
                var autobets = db.AutoBets.Where(ab => ab.DealId == deal.Id).ToList();

                db.Bets.RemoveRange(bets);
                db.AutoBets.RemoveRange(autobets);

                await db.SaveChangesAsync();

                this.taskService.UpdateTasks();

                var result = await db.Deals.FindAsync(deal.Id);
                return result;
            }
        }

        public async Task<bool> DeleteDealAsync(Deal deal)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                Deal dealToDelete = db.Deals.Where(d => d.Id == deal.Id).FirstOrDefault();
                Auction auction = db.Auctions.Where(a => a.DealId == deal.Id).FirstOrDefault();
                List<Bet> bets = db.Bets.Where(b => b.DealId == deal.Id).ToList();
                List<AutoBet> autobets = db.AutoBets.Where(a => a.DealId == deal.Id).ToList();
                List<WatchDeal> watchdeals = db.WatchDeals.Where(w => w.DealId == deal.Id).ToList();
                List<Asset> assets = db.Assets.Where(a => a.DealId == deal.Id).ToList();
                List<Sell> sells = db.Sells.Where(s => s.DealId == deal.Id).ToList();

                db.Assets.RemoveRange(assets);
                db.Sells.RemoveRange(sells);
                db.WatchDeals.RemoveRange(watchdeals);
                db.Bets.RemoveRange(bets);
                db.AutoBets.RemoveRange(autobets);
                if (auction != null) db.Auctions.Remove(auction);
                if (dealToDelete != null) db.Deals.Remove(dealToDelete);

                await db.SaveChangesAsync();
            }

            return true;
        }

        public async Task<Auction> SetAutoBetAsync(AutoBet autobet)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                var sameAutoBet = db.AutoBets.Where(b => b.UserId == autobet.UserId && b.DealId == autobet.DealId).FirstOrDefault();

                if (sameAutoBet != null)
                {
                    sameAutoBet.BetStep = autobet.BetStep;
                    sameAutoBet.MaxBet = autobet.MaxBet;
                    await db.SaveChangesAsync();
                }
                else
                {
                    await db.AutoBets.AddAsync(autobet);
                    await db.SaveChangesAsync();
                }

                Deal deal = db.Deals.Where(d => d.Id == autobet.DealId).FirstOrDefault();
                Auction auction = db.Auctions.Where(a => a.DealId == autobet.DealId).FirstOrDefault();

                if (auction == null)
                {
                    auction = await this.CreateAuctionFromDeal(deal, db);
                }

                auction.Bets = db.Bets.Where(b => b.DealId == auction.DealId).ToList();
                auction.AutoBets = db.AutoBets.Where(a => a.DealId == auction.DealId).ToList();

                return auction;
            }
        }

        public async Task<Auction> CancelAutoBetAsync(AutoBet autobet)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                var autoBets = db.AutoBets.Where(b => b.UserId == autobet.UserId && b.DealId == autobet.DealId);
                db.AutoBets.RemoveRange(autoBets);

                await db.SaveChangesAsync();

                Auction auction = db.Auctions.Where(a => a.DealId == autobet.DealId).FirstOrDefault();

                auction.Bets = db.Bets.Where(b => b.DealId == auction.DealId).ToList();
                auction.AutoBets = db.AutoBets.Where(a => a.DealId == auction.DealId).ToList();

                return auction;
            }
        }

        public async Task<Auction> MakeBetAsync(Bet bet)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                var sameBet = db.Bets.Where(b => b.UserId == bet.UserId && b.DealId == bet.DealId).FirstOrDefault();

                User user = db.Users.Where(u => u.Id == bet.UserId).FirstOrDefault();

                if (sameBet != null)
                {
                    var betsSum = db.Bets.Where(b => b.UserId == bet.UserId).ToList().Sum(b => b.CurrentBet);

                    var betDiff = bet.CurrentBet - sameBet.CurrentBet;
                    var totalBetsSum = (double)(betsSum + betDiff);

                    if (totalBetsSum > user.Balance) throw new InvalidOperationException("Low balance to bet.");

                    sameBet.CurrentBet += betDiff;
                    sameBet.TimeStamp = bet.TimeStamp;
                    await db.SaveChangesAsync();
                }
                else
                {
                    var betsSum = (double)db.Bets.Where(b => b.UserId == bet.UserId).ToList().Sum(b => b.CurrentBet);

                    if (betsSum > user.Balance) throw new InvalidOperationException("Low balance to bet.");

                    await db.Bets.AddAsync(bet);
                    await db.SaveChangesAsync();
                }

                Deal deal = db.Deals.Where(d => d.Id == bet.DealId).FirstOrDefault();
                Auction auction = db.Auctions.Where(a => a.DealId == bet.DealId).FirstOrDefault();

                if (auction == null)
                {
                    auction = await this.CreateAuctionFromDeal(deal, db);
                }

                auction.Bets = db.Bets.Where(b => b.DealId == auction.DealId).ToList();
                auction.AutoBets = db.AutoBets.Where(a => a.DealId == auction.DealId).ToList();

                DateTime now = DateTime.UtcNow;

                bool auctionInProgress = now.CompareTo(auction.AuctionEnd) < 0 && auction.AuctionStart.Value.CompareTo(now) < 0;

                if (auctionInProgress)
                {
                    auction.AuctionEnd = now.AddSeconds((double)auction.AuctionLength);
                    Task.Run(() => this.taskService.ChangeAuctionEndTime(auction));
                }

                await db.SaveChangesAsync();

                return auction;
            }
        }

        public async Task<Sell> BuyNowAsync(Sell sell)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
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

                return sell;
            }
        }

        public async Task<WatchDeal> AddWatchDealAsync(WatchDeal _watchDeal)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                WatchDeal watchDeal = new WatchDeal();
                watchDeal.UserId = _watchDeal.UserId;
                watchDeal.DealId = _watchDeal.DealId;
                await db.WatchDeals.AddAsync(watchDeal);
                await db.SaveChangesAsync();

                return watchDeal;
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

        private async Task<Auction> CreateAuctionFromDeal(Deal deal, ApplicationContext db)
        {
            Auction auction = new Auction();

            auction.UserId = (int)deal.UserId;
            auction.DealId = (int)deal.Id;
            auction.AuctionStart = deal.StartTime;
            auction.AuctionLength = deal.Duration;
            auction.AuctionEnd = auction.AuctionStart.Value.AddSeconds((double)deal.Duration);

            await db.Auctions.AddAsync(auction);
            await db.SaveChangesAsync();
            
            return auction;
        }
    }
}
