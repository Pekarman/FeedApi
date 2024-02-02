using Common.EntityFramework;
using Common.EntityFramework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ITaskService
    {
        public void UpdateTasks();

        public Task CheckAuctionsForStart();

        public Task CheckAuctionsForFinish();

        public Task<bool> AuctionStarted(int dealId);

        public Task<bool> AuctionFinished(int dealId);

        public Task ChangeAuctionEndTime(Auction auction);
    }
}
