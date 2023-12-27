using Microsoft.AspNetCore.SignalR;

namespace FeedAPI.SignalR
{
    public class BroadcastHub : Hub<IHubClient>
    {
        public string GetConnectionId() => Context.ConnectionId;
    }
}
