using FeedAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Threading.Tasks;
using System.Xml;

namespace FeedAPI.Services
{
    public interface IOnlinerRss
    {
        public IEnumerable<Article> GetItems();
    }

    public class PeopleOnlinerRSS : IOnlinerRss
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
            IEnumerable<SyndicationItem> items;

            using (XmlReader reader = XmlReader.Create("https://people.onliner.by/feed"))
            {
                var formatter = new Rss20FeedFormatter();
                formatter.ReadFrom(reader);
                SyndicationFeed feed = formatter.Feed;
                items = formatter.Feed.Items;
            }

            articles = new List<Article>();

            foreach (var item in items)
            {
                articles.Add(new Article { Title = item.Title.Text,
                                           Summary = item.Summary.Text,
                                           PublishDate = item.PublishDate.DateTime });
            }
        }
    }
}
