using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedAPI.Models
{
    public class Article
    {
        public string Category { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public DateTime PublishDate { get; set; }
    }
}
