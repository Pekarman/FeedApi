using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityFramework.Models
{

    [Table("deals")]
    public class Deal
    {
        [Column("id")]
        public int? Id { get; set; }

        [Column("productname")]
        public string? ProductName { get; set; }

        [Column("shortdesc")]
        public string? ShortDesc { get; set; }

        [Column("longdesc")]
        public string? LongDesc { get; set; }

        [Column("statusid")]
        public int? StatusId { get; set; }

        [Column("categoryid")]
        public int? CategoryId { get; set; }

        [Column("uom")]
        public string? UoM { get; set; }

        [Column("quantity")]
        public double? Quantity { get; set; }

        [Column("partnumber")]
        public string? PartNumber { get; set; }

        [Column("ischecked")]
        public bool? IsChecked { get; set; }

        [Column("canbuynow")]
        public bool? CanBuyNow { get; set; }

        [Column("pricebuynow")]
        public double? PriceBuyNow { get; set; }

        [Column("userid")]
        public int? UserId { get; set; }

        [NotMapped]
        public string? UserFullName { get; set; }

        [Column("startbet")]
        public double? StartBet { get; set; }

        [Column("starttime")]
        public DateTime? StartTime { get; set; }

        [Column("endtime")]
        public DateTime? EndTime { get; set; }

        public List<Bet> Bets { get; set; }

        public List<Asset> Assets { get; set; }

        public List<WatchDeal> WatchDeals { get; set; }
    }
}
