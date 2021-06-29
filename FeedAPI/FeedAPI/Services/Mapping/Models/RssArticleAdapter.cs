using System;
using FeedAPI.Models;
using NewsAPI.Models;

namespace FeedAPI.Services
{
    public class RssArticleAdapter : IArticleAdapter
    {
        private readonly Article article;

        public RssArticleAdapter(Article article)
        {
            this.article = article;
        }

        public Item GetArticle()
        {
            return new Item()
            {
                Title = this.article.Title,
                Author = this.article.Author,
                Source = this.article.Source.Name,
                Link = this.article.Url,
                ImageLink = this.article.UrlToImage,
                Content = this.article.Description,
                PublishDate = (DateTime)this.article.PublishedAt,
            };
        }
    }
}
