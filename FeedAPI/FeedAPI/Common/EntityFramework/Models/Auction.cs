using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.EntityFramework.Models
{
    [Table("auctions")]
    public class Auction
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }

        [Column("dealid")]
        public int DealId { get; set; }

        [Column("userid")]
        public int UserId { get; set; }

        [Column("auctionstart")]
        public DateTime? AuctionStart { get; set; }

        [Column("auctionlength")]
        public int? AuctionLength { get; set; }

        [Column("auctionend")]
        public DateTime? AuctionEnd { get; set; }

        [NotMapped]
        public List<Bet> Bets { get; set; }

        [NotMapped]
        public List<AutoBet> AutoBets { get; set; }
    }
}
