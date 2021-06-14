using FeedAPI.Models;
using System.Collections.Generic;
using System.ServiceModel.Syndication;
using System.Xml;

namespace FeedAPI.Services
{
    public class OnlinerRSS : IOnlinerRss
    {
        const string peopleSource = "https://people.onliner.by/feed";
        const string moneySource = "https://money.onliner.by/feed";
        const string autoSource = "https://auto.onliner.by/feed";
        const string techSource = "https://tech.onliner.by/feed";
        const string realtSource = "https://realt.onliner.by/feed";

        private List<Article> articles;

        public IEnumerable<Article> GetArticles()
        {
            Initialize();            

            return articles;
        }

        private void Initialize()
        {
            List<string> sources = new List<string> {
                                                      peopleSource,
                                                      moneySource,
                                                      autoSource,
                                                      techSource,
                                                      realtSource
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
                        Source = feed.Generator,
                        Link = item.Id,
                        Summary = item.Summary.Text,
                        PublishDate = item.PublishDate.DateTime
                    }); ;
                }
            }
        }
    }
}
