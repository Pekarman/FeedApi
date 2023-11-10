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
        public int Id { get; set; }

        [Column("ProductName")]
        public string ProductName { get; set; }

        [Column("shortDesc")]
        public string ShortDesc { get; set; }

        [Column("longDesc")]
        public string LongDesc { get; set; }

        [Column("categoryId")]
        public int CategoryId { get; set; }

        [Column("subcategoryId")]
        public int SubcategoryId { get; set; }

        [Column("uom")]
        public string UoM { get; set; }

        [Column("partNumber")]
        public string PartNumber { get; set; }

        [Column("isChecked")]
        public bool IsChecked { get; set; }

        [Column("userId")]
        public int UserId { get; set; }

        public List<Asset> Assets { get; set; }

        public Deal() { }

        public Deal(
            int id,
            string productName,
            string shortDesc,
            string longDesc,
            int categoryId,
            int subcategoryId,
            string uom,
            string partNumber,
            bool isChecked,
            int userOwnerId,
            List<Asset> assets
            )
        {
            Id = id;
            ProductName = productName;
            ShortDesc = shortDesc;
            LongDesc = longDesc;
            CategoryId = categoryId;
            SubcategoryId = subcategoryId;
            UoM = uom;
            PartNumber = partNumber;
            IsChecked = isChecked;
            UserId = userOwnerId;
            Assets = assets;
        }
    }
}
