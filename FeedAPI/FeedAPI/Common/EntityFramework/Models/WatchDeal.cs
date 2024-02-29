using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityFramework.Models
{
    [Table("watchdeal")]
    public class WatchDeal
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int? Id { get; set; }

        [Column("dealid")]
        public int? DealId { get; set; }

        [Column("userid")]
        public int? UserId { get; set; }
    }
}
