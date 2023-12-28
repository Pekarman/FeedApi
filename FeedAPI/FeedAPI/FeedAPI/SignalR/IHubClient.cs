using Common.EntityFramework.Models;
using System.Threading.Tasks;

namespace FeedAPI.SignalR
{
    public interface IHubClient
    {
        Task BroadcastMessage();

        Task BroadcastMessage(string message);

        Task BetMade(Bet bet);
    }
}
