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

        [Column("userId")]
        public int? UserId { get; set; }

        [Column("imageName")]
        public string ImageName { get; set; }

        [Column("imageData")]
        public byte[] ImageData { get; set; }

        public Asset() { }

        public Asset(int id, int dealId, int? userId, string imageName, byte[] imageData)
        {
            Id = id;
            DealId = dealId;
            UserId = userId;
            ImageName = imageName;
            ImageData = imageData;
        }
    }
}
