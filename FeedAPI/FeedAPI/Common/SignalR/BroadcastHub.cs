using Microsoft.AspNetCore.SignalR;

namespace Common.SignalR
{
    public class BroadcastHub : Hub<IHubClient>
    {
        public string GetConnectionId() => Context.ConnectionId;
    }
}
