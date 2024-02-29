using Common.EntityFramework.Models;
using Common.EntityFramework;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using Common.SignalR;
using Microsoft.AspNetCore.SignalR;

namespace Services.Implementations
{
    public class TaskService : ITaskService
    {
        private readonly IHubContext<BroadcastHub, IHubClient> hubContext;

        private List<(Auction, TimeSpan)> auctionsToStart;
        private List<(Auction, TimeSpan, CancellationTokenSource)> auctionsToFinish;

        public TaskService(IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            this.hubContext = hubContext;
            auctionsToStart = new List<(Auction, TimeSpan)>();
            auctionsToFinish = new List<(Auction, TimeSpan, CancellationTokenSource)>();
        }

        public async void UpdateTasks()
        {
            await CheckAuctionsForStart();
            await CheckAuctionsForFinish();
        }

        public async Task CheckAuctionsForStart()
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                var auctions = db.Auctions.ToList();

                auctions.ForEach(a =>
                {
                    if (!IsDateTimeAfterNow((DateTime)a.AuctionStart)) return;

                    var delay = GetDateTimeDifferenceFromNow((DateTime)a.AuctionStart);
                    if (delay < TimeSpan.Zero) delay *= -1;

                    auctionsToStart.Add((a, delay));
                });

                auctionsToStart.ForEach( async t =>
                {
                    await Task.Delay(t.Item2);
                    await this.AuctionStarted(t.Item1.DealId);
                });
            }
        }

        public async Task CheckAuctionsForFinish()
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                var auctions = db.Auctions.ToList();

                auctions.ForEach(async auction =>
                {
                    if (!IsDateTimeAfterNow((DateTime)auction.AuctionEnd)) return;

                    auction.Bets = db.Bets.Where(b => b.DealId == auction.DealId).ToList();

                    var delay = GetDateTimeDifferenceFromNow((DateTime)auction.AuctionEnd);
                    if (delay < TimeSpan.Zero) delay *= -1;

                    var tokenSource = new CancellationTokenSource();
                    CancellationToken token = tokenSource.Token;

                    var sameAuction = auctionsToFinish.Where(af => af.Item1.Id == auction.Id).FirstOrDefault();
                    if (sameAuction.Item1 != null)
                    {
                        sameAuction.Item3.Cancel();

                        auctionsToFinish.Remove(sameAuction);
                        auctionsToFinish.Add((auction, delay, tokenSource));

                        await RunAuctionToFinish((auction, delay, tokenSource));
                        return;
                    }

                    auctionsToFinish.Add((auction, delay, tokenSource));

                    await RunAuctionToFinish((auction, delay, tokenSource));
                });
            }
        }

        public async Task ChangeAuctionEndTime(Auction auction)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                if (!IsDateTimeAfterNow((DateTime)auction.AuctionEnd)) return;

                var delay = GetDateTimeDifferenceFromNow((DateTime)auction.AuctionEnd);
                if (delay < TimeSpan.Zero) delay *= -1;

                var tokenSource = new CancellationTokenSource();

                var sameAuction = auctionsToFinish.Where(af => af.Item1.Id == auction.Id).FirstOrDefault();
                if (sameAuction.Item1 != null)
                {
                    sameAuction.Item3.Cancel();

                    auctionsToFinish.Remove(sameAuction);
                    auctionsToFinish.Add((auction, delay, tokenSource));

                    await RunAuctionToFinish((auction, delay, tokenSource));
                }
            }
        }

        private async Task RunAuctionToFinish((Auction, TimeSpan, CancellationTokenSource) t)
        {
            try
            {
                await Task.Run(async () =>
                {
                    await Task.Delay(t.Item2);
                    t.Item3.Token.ThrowIfCancellationRequested();
                    await this.AuctionFinished(t.Item1.DealId);
                    await this.hubContext.Clients.All.AuctionEnded(t.Item1);
                    this.auctionsToFinish.Remove(t);
                }, t.Item3.Token);
            }
            catch (OperationCanceledException e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                t.Item3.Dispose();
            }
        }

        public async Task<bool> AuctionStarted(int dealId)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                Deal deal = db.Deals.Where(w => w.Id == dealId).FirstOrDefault();

                if (deal == null) throw new ArgumentNullException($"Deal with dealId={dealId} is not exist.");

                deal.StatusId = 2;

                await db.SaveChangesAsync();

                return true;
            }
        }

        public async Task<bool> AuctionFinished(int dealId)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                Deal deal = db.Deals.Where(w => w.Id == dealId).FirstOrDefault();

                var winnerBet = db.Bets.Where(b => b.DealId == dealId).ToList().MaxBy(b => b.CurrentBet);

                if (deal == null) throw new ArgumentNullException($"Deal with dealId={dealId} is not exists");

                Sell sell = new Sell();

                User owner = db.Users.Where(u => u.Id == deal.UserId).FirstOrDefault();
                User client = db.Users.Where(u => u.Id == winnerBet.UserId).FirstOrDefault();

                client.Balance -= deal.PriceBuyNow;
                owner.Balance += deal.PriceBuyNow;

                deal.StatusId = 3;

                sell.DealId = dealId;
                sell.OwnerId = owner.Id;
                sell.UserId = client.Id;

                await db.Sells.AddAsync(sell);
                await db.SaveChangesAsync();

                return true;
            }
        }

        private bool IsDateTimeAfterNow(DateTime dateTime)
        {
            if (GetDateTimeDifferenceFromNow(dateTime) < TimeSpan.Zero) return true;
            return false;
        }

        private TimeSpan GetDateTimeDifferenceFromNow(DateTime dateTime)
        {
            var result = DateTime.UtcNow - dateTime;
            return result;
        }
    }
}
