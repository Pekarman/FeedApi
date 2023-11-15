using Common.EntityFramework.Models;
using Common.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IBetService
    {
        public Task<Bet> AddBetAsync(Bet bet);

        public  Task<Bet> ChangeBetAsync(Bet betChanges);
    }
}
