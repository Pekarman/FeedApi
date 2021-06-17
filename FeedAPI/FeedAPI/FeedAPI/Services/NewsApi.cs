using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeedAPI.Models;
using NewsAPI;
using NewsAPI.Constants;
using NewsAPI.Models;

namespace FeedAPI.Services
{
    /// <summary>
    /// Service for getting NewsApi feed.
    /// </summary>
    public class NewsApi : INewsApiClient
    {
        private const string ApiKey = "d11afab6486343cfa40068ffd60f9e68";
        private readonly string keyWord = "Apple";
        private readonly DateTime from = DateTime.Today;

        /// <inheritdoc/>
        public async Task<IEnumerable<Item>> GetArticlesAsync()
        {
            var articles = new List<Item>();

            var newsApiClient = new NewsApiClient(ApiKey);
            var articlesResponse = await newsApiClient.GetEverythingAsync(new EverythingRequest
            {
                Q = this.keyWord,
                SortBy = SortBys.Popularity,
                Language = Languages.RU,
                From = this.from,
            });

            if (articlesResponse.Status == Statuses.Ok)
            {
                return articlesResponse.Articles.Select<Article, Item>(x => new ArticleAdapter(x).GetArticle());
            }

            return articles;
        }
    }
}
