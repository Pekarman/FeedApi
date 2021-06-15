using System.Collections.Generic;
using System.ServiceModel.Syndication;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using FeedAPI.Models;

namespace FeedAPI.Services
{
    public class OnlinerRSS : IOnlinerRss
    {
        private const string PeopleSource = "https://people.onliner.by/feed";
        private const string MoneySource = "https://money.onliner.by/feed";
        private const string AutoSource = "https://auto.onliner.by/feed";
        private const string TechSource = "https://tech.onliner.by/feed";
        private const string RealtSource = "https://realt.onliner.by/feed";

        private const string LinkPattern = @"<p><a href=\s*(.+?)\s*>";
        private const string ImageLinkPattern = @"<img src=\s*(.+?.jpeg)";
        private const string DescPattern = @"</a></p><p>(.+?)</p><p><";

        private List<Item> articles;

        /// <inheritdoc/>
        public async Task<IEnumerable<Item>> GetArticlesAsync()
        {
            List<string> sources = new List<string>
            {
                PeopleSource,
                MoneySource,
                AutoSource,
                TechSource,
                RealtSource,
            };

            this.articles = new List<Item>();

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

                string link = string.Empty;
                string imageLink = string.Empty;
                string desc = string.Empty;
                Match m;

                foreach (var item in items)
                {
                    m = Regex.Match(item.Summary.Text, LinkPattern);

                    if (m.Success)
                    {
                        link = m.Groups[1].Value.Trim('"');
                    }

                    m = Regex.Match(item.Summary.Text, ImageLinkPattern);

                    if (m.Success)
                    {
                        imageLink = m.Groups[1].Value.Trim('"');
                    }

                    m = Regex.Match(item.Summary.Text, DescPattern);

                    if (m.Success)
                    {
                        desc = m.Groups[1].Value;
                    }

                    this.articles.Add(new Item
                    {
                        Title = item.Title.Text,
                        Author = "Default Onliner Author", // Add authors
                        Source = feed.Description.Text,
                        Link = link,
                        ImageLink = imageLink,
                        Content = desc,
                        PublishDate = item.PublishDate.DateTime,
                    });
                }
            }

            return this.articles;
        }
    }
}
