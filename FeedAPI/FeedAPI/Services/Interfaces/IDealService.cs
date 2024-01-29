using Common.EntityFramework.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IDealService
    {
        public Task<List<Deal>> GetAllDeals();

        public Task<Deal> GetDealAsync(int id);

        public Task<Deal> AddDealAsync(Deal deal);

        public Task<Deal> ChangeDealAsync(Deal dealChanges);

        public Task<bool> DeleteDealAsync(Deal deal);

        public Task<List<Deal>> GetOwnerDealsAsync(DealFilter userId);

        public Task<Auction> GetAuctionAsync(int id);

        public Task<Auction> SetAutoBetAsync(AutoBet auto);

        public Task<Auction> CancelAutoBetAsync(AutoBet autobet);

        public Task<Auction> MakeBetAsync(Bet bet);

        public Task<WatchDeal> AddWatchDealAsync(WatchDeal watchDeal);

        public Task<Sell> BuyNowAsync(Sell sell);

        public Task<bool> DeleteWatchDealAsync(int id);

        public Task<Deal> MoveToActiveStatusAsync(int dealId);
    }
}
