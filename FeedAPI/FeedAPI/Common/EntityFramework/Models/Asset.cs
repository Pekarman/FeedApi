using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityFramework.Models
{
    [Table("assets")]
    public class Asset
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("dealId")]
        public int DealId { get; set; }

        [Column("imageSrc")]
        public string ImageSrc { get; set; }

        public Asset() { }

        public Asset(int id, int dealId, string imageSrc)
        {
            Id = id;
            DealId = dealId;
            ImageSrc = imageSrc;
        }
    }
}
