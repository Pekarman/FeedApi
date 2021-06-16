using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Threading.Tasks;
using FeedAPI.Models;

namespace FeedAPI.Services
{
    public class SyndicationItemAdapter : Item
    {
        private const string LinkPattern = @"<p><a href=\s*(.+?)\s*>";
        private const string ImageLinkPattern = @"<img src=\s*(.+?.jpeg)";
        private const string DescPattern = @"</a></p><p>(.+?)</p><p><";

        public SyndicationItemAdapter(SyndicationItem item, SyndicationFeed feed)
        {
            this.Title = item.Title.Text;
            this.Author = "Default Onliner Author";
            this.Source = feed.Description.Text;
            this.Link = item.Summary.Text.GetRegexValue(LinkPattern);
            this.ImageLink = item.Summary.Text.GetRegexValue(ImageLinkPattern);
            this.Content = item.Summary.Text.GetRegexValue(DescPattern);
            this.PublishDate = item.PublishDate.DateTime;
        }
    }
}
