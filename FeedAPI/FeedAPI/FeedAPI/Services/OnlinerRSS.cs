using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Threading.Tasks;
using System.Xml;
using FeedAPI.Models;

namespace FeedAPI.Services
{
    /// <summary>
    /// Service for getting onliner feed.
    /// </summary>
    public class OnlinerRSS : IOnlinerRss
    {
        private const string PeopleSource = "https://people.onliner.by/feed";
        private const string MoneySource = "https://money.onliner.by/feed";
        private const string AutoSource = "https://auto.onliner.by/feed";
        private const string TechSource = "https://tech.onliner.by/feed";
        private const string RealtSource = "https://realt.onliner.by/feed";

        /// <inheritdoc/>
        public async Task<IEnumerable<Item>> GetArticlesAsync()
        {
            List<string> sources = new ()
            {
                PeopleSource,
                MoneySource,
                AutoSource,
                TechSource,
                RealtSource,
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

                articles.AddRange(items.Select<SyndicationItem, Item>(x => new SyndicationItemAdapter(feed, x).GetArticle()));
            }

            return articles;
        }
    }
}
