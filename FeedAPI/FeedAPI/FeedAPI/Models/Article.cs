using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedAPI.Models
{
    public class Article
    {        
        public string Title { get; set; }
        public string Category { get; set; }
        public string Source { get; set; }
        public string Link { get; set; }
        public string Summary { get; set; }
        public DateTime PublishDate { get; set; }
    }
}
