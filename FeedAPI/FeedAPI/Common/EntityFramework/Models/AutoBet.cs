using System.ComponentModel.DataAnnotations.Schema;

namespace Common.EntityFramework.Models
{
    [Table("autobets")]
    public class AutoBet
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }

        [Column("dealid")]
        public int DealId { get; set; }

        [Column("userid")]
        public int UserId { get; set; }

        [Column("maxbet")]
        public double MaxBet { get; set; }

        [Column("betstep")]
        public double BetStep { get; set; }
    }
}
