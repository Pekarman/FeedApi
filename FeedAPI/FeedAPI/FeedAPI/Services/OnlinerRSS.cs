using System.Collections.Generic;
using System.ServiceModel.Syndication;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using FeedAPI.Models;
using AutoMapper;

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

        private const string LinkPattern = @"<p><a href=\s*(.+?)\s*>";
        private const string ImageLinkPattern = @"<img src=\s*(.+?.jpeg)";
        private const string DescPattern = @"</a></p><p>(.+?)</p><p><";

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

                var config = new MapperConfiguration(cfg => cfg.CreateMap<SyndicationItem, Item>()
                                                    .ForMember("Title", opt => opt.MapFrom(c => c.Title.Text))
                                                    .ForMember("Author", opt => opt.MapFrom(c => "Default Onliner Author")) // Add authors
                                                    .ForMember("Source", opt => opt.MapFrom(c => feed.Description.Text))
                                                    .ForMember("Link", opt => opt.MapFrom(c => this.GetRegexValue(c.Summary.Text, LinkPattern)))
                                                    .ForMember("ImageLink", opt => opt.MapFrom(c => this.GetRegexValue(c.Summary.Text, ImageLinkPattern)))
                                                    .ForMember("Content", opt => opt.MapFrom(c => this.GetRegexValue(c.Summary.Text, DescPattern)))
                                                    .ForMember("PublishDate", opt => opt.MapFrom(c => c.PublishDate.DateTime)));
                var mapper = new Mapper(config);

                return mapper.Map<IEnumerable<SyndicationItem>, IEnumerable<Item>>(items);                
            }

            return articles;
        }

        private string GetRegexValue(string source, string pattern)
        {
            Match m = Regex.Match(source, pattern);

            if (m.Success)
            {
                return m.Groups[1].Value.Trim('"');
            }

            return string.Empty;
        }
    }
}
