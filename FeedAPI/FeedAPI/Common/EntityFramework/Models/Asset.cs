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

        [Column("dealid")]
        public int DealId { get; set; }

        [Column("imagename")]
        public string ImageName { get; set; }

        [Column("imagedata")]
        public byte[] ImageData { get; set; }

        public Asset() { }

        public Asset(int id, int dealId, string imageName, byte[] imageData)
        {
            Id = id;
            DealId = dealId;
            ImageName = imageName;
            ImageData = imageData;
        }
    }
}
