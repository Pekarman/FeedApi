using Common.EntityFramework.Models;
using System.Threading.Tasks;

namespace Common.SignalR
{
    public interface IHubClient
    {
        Task BroadcastMessage();

        Task BroadcastMessage(string message);

        Task BetMade(Bet bet);

        Task UpdateAuction(Auction auction);

        Task AuctionEnded(Auction auction);
    }
}
