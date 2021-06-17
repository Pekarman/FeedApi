using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedAPI.Models
{
    public interface IArticleAdapter
    {
        public Item GetArticle();
    }
}
