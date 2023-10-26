using FeedAPI.Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementations
{
    public class ItemsApi : IItemsApiClient
    {
        /// <inheritdoc/>
        public async Task<IEnumerable<Item>> GetItemsAsync()
        {
            var items = new List<Item>();

            //var newsApiClient = new NewsApiClient(NewsApiConfig.ApiKey);
            //var articlesResponse = await newsApiClient.GetEverythingAsync(new EverythingRequest
            //{
            //    Q = this.keyWord,
            //    SortBy = SortBys.Popularity,
            //    Language = Languages.RU,
            //    From = this.from,
            //});

            //if (articlesResponse.Status == Statuses.Ok)
            //{
            //    return articlesResponse.Articles.Select<Article, Item>(x => new RssArticleAdapter(x).GetArticle());
            //}

            return new List<Item>(items);

            //throw new Exception("NewsApi feed can not be load.");
        }
    }
}
