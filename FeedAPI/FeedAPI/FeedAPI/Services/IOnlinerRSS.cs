using FeedAPI.Models;
using System.Collections.Generic;
using System.ServiceModel.Syndication;
using System.Xml;

namespace FeedAPI.Services
{
    public interface IOnlinerRss
    {
        public IEnumerable<Article> GetItems();
    }

    public class OnlinerRSS : IOnlinerRss
    {
        private List<Article> articles;

        public IEnumerable<Article> GetItems()
        {
            if (articles == null)
            {
                Initialize();
            }

            return articles;
        }

        private void Initialize()
        {
            List<string> sources = new List<string> {
                                                      "https://people.onliner.by/feed",
                                                      "https://money.onliner.by/feed",
                                                      "https://auto.onliner.by/feed",
                                                      "https://tech.onliner.by/feed",
                                                      "https://realt.onliner.by/feed"
                                                     };

            articles = new List<Article>();

            foreach (string source in sources)
            {
                IEnumerable<SyndicationItem> items;
                SyndicationFeed feed;

                using (XmlReader reader = XmlReader.Create(source))
                {
                    var formatter = new Rss20FeedFormatter();
                    formatter.ReadFrom(reader);
                    feed = formatter.Feed;
                    items = formatter.Feed.Items;
                }


                foreach (var item in items)
                {
                    articles.Add(new Article
                    {
                        Category = feed.Description.Text,
                        Title = item.Title.Text,
                        Summary = item.Summary.Text,
                        PublishDate = item.PublishDate.DateTime
                    });
                }
            }
        }
    }
}
