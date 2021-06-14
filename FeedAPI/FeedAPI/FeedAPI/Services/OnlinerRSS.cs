using FeedAPI.Models;
using System.Collections.Generic;
using System.ServiceModel.Syndication;
using System.Text.RegularExpressions;
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

                string linkPattern = @"<p><a href=\s*(.+?)\s*>";
                string imageLinkPattern = @"<img src=\s*(.+?.jpeg)";
                string descPattern = @"</a></p><p>(.+?)</p><p><";
                string link = string.Empty;
                string imageLink = string.Empty;
                string desc = string.Empty;
                Match m;

                foreach (var item in items)
                {
                    m = Regex.Match(item.Summary.Text, linkPattern);

                    if (m.Success)
                    {
                        link = m.Groups[1].Value.Trim('"');
                    }

                    m = Regex.Match(item.Summary.Text, imageLinkPattern);

                    if (m.Success)
                    {
                        imageLink = m.Groups[1].Value.Trim('"');
                    }

                    m = Regex.Match(item.Summary.Text, descPattern);

                    if (m.Success)
                    {
                        desc = m.Groups[1].Value;
                    }

                    articles.Add(new Article
                    {
                        Title = item.Title.Text,
                        Source = feed.Description.Text,
                        Link = link,
                        ImageLink = imageLink,
                        Content = desc,
                        PublishDate = item.PublishDate.DateTime
                    });
                }
            }
        }
    }
}
