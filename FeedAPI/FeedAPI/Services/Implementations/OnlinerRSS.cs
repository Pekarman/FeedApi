using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Threading.Tasks;
using System.Xml;
using FeedAPI.Models;
using Services.Configs;

namespace FeedAPI.Services
{
    /// <summary>
    /// Service for getting onliner feed.
    /// </summary>
    public class OnlinerRSS : IOnlinerRss
    {
        /// <inheritdoc/>
        public async Task<IEnumerable<Item>> GetArticlesAsync()
        {
            List<string> sources = new ()
            {
                OnlinerConfig.PeopleSource,
                OnlinerConfig.MoneySource,
                OnlinerConfig.AutoSource,
                OnlinerConfig.TechSource,
                OnlinerConfig.RealtSource,
            };

            var articles = new List<Item>();

            foreach (string source in sources)
            {
                SyndicationFeed feed;
                IEnumerable<SyndicationItem> items;

                using (XmlReader reader = XmlReader.Create(source))
                {
                    var formatter = new Rss20FeedFormatter();

                    await Task.Run(() => formatter.ReadFrom(reader));

                    feed = formatter.Feed;
                    items = formatter.Feed.Items;
                }

                var result = items.Select<SyndicationItem, Item>(x => new SyndicationItemAdapter(feed, x).GetArticle());

                if (result != null)
                {
                    articles.AddRange(result);
                }
                else
                {
                    throw new Exception($"Onliner feed can not load from source: {source}");
                }
                
            }

            if (articles.Count != 0)
            {
                return articles;
            }

            throw new Exception("Onliner feed can not load.");
        }
    }
}
