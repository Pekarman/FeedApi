using System;
using System.ServiceModel.Syndication;
using FeedAPI.Models;

namespace FeedAPI.Services
{
    public class SyndicationItemAdapter : Item, IArticleAdapter
    {
        private const string LinkPattern = @"<p><a href=\s*(.+?)\s*>";
        private const string ImageLinkPattern = @"<img src=\s*(.+?.jpeg)";
        private const string DescPattern = @"</a></p><p>(.+?)</p><p><";

        private readonly SyndicationFeed feed;
        private readonly SyndicationItem item;

        public SyndicationItemAdapter(SyndicationFeed feed, SyndicationItem item)
        {
            this.feed = feed;
            this.item = item;
        }

        public Item GetArticle()
        {
            return new Item()
            {
                Title = this.item.Title.Text,
                Author = "Default Onliner Author",
                Source = this.feed.Description.Text,
                Link = this.item.Summary.Text.GetRegexValue(LinkPattern),
                ImageLink = this.item.Summary.Text.GetRegexValue(ImageLinkPattern),
                Content = this.item.Summary.Text.GetRegexValue(DescPattern),
                PublishDate = this.item.PublishDate.DateTime,
            };
        }
    }
}
