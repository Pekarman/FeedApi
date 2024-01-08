using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityFramework.Models
{
    public class DealFilter
    {
        public int userId { get; set; }

        public int categoryId { get; set; }

        public int watchUserId { get; set; }

        public int boughtUserId { get; set; }

        public int sellUserId { get; set; }
    }
}
