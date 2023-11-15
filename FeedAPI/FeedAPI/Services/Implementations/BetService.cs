using Common.EntityFramework.Models;
using Common.EntityFramework;
using System;
using System.Linq;
using System.Threading.Tasks;
using Common.Extensions;
using System.Reflection;
using Services.Interfaces;

namespace Services.Implementations
{
    public class BetService : IBetService
    {
        public async Task<Bet> AddBetAsync(Bet bet)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                bet.TimeStamp = DateTime.UtcNow;

                int id;
                if (db.Assets.Count() == 0) id = 1; else id = db.Bets.Max(b => b.Id + 1);

                bet.Id = id;
                await db.Bets.AddAsync(bet);
                await db.SaveChangesAsync();

                var result = await db.Bets.FindAsync(id);
                return result;
            }
        }

        public async Task<Bet> ChangeBetAsync(Bet betChanges)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                PropertyInfo[] ChangesProps = betChanges.GetType().GetProperties();

                var id = (int)ChangesProps.Where(p => p.Name == "Id")?.FirstOrDefault()?.GetValue(betChanges);

                Bet bet = db.Bets.Where(d => d.Id == id).FirstOrDefault();

                TypeExtension.CompareAndChangeType(betChanges, bet);

                await db.SaveChangesAsync();

                var result = await db.Bets.FindAsync(bet.Id);
                return result;
            }
        }
    }
}
