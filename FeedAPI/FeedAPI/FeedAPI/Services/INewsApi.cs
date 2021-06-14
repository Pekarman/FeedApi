using FeedAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedAPI.Services
{
    public interface INewsApi
    {
        public IEnumerable<Article> GetArticles();
    }
}
