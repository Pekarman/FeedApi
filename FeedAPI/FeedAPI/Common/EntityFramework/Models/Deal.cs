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

        [Column("productname")]
        public string ProductName { get; set; }

        [Column("shortdesc")]
        public string ShortDesc { get; set; }

        [Column("longdesc")]
        public string LongDesc { get; set; }

        [Column("categoryid")]
        public int CategoryId { get; set; }

        [Column("subcategoryid")]
        public int SubcategoryId { get; set; }

        [Column("uom")]
        public string UoM { get; set; }

        [Column("partnumber")]
        public string PartNumber { get; set; }

        [Column("ischecked")]
        public bool IsChecked { get; set; }

        [Column("userid")]
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
