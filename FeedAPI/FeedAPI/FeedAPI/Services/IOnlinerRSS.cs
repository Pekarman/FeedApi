using FeedAPI.Models;
using System.Collections.Generic;

namespace FeedAPI.Services
{
    public interface IOnlinerRss
    {
        public List<Item> GetArticles();
    }
}
