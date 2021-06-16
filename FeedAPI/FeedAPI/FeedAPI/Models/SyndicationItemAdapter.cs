using System;
using System.ServiceModel.Syndication;
using FeedAPI.Models;

namespace FeedAPI.Services
{
    public class SyndicationItemAdapter : Item
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

        public new string Title => this.item.Title.Text;

        public new string Author => "Default Onliner Author";

        public new string Source => this.feed.Description.Text;

        public new string Link => this.item.Summary.Text.GetRegexValue(LinkPattern);

        public new string ImageLink => this.item.Summary.Text.GetRegexValue(ImageLinkPattern);

        public new string Content => this.item.Summary.Text.GetRegexValue(DescPattern);

        public new DateTime PublishDate => this.item.PublishDate.DateTime;
    }
}
