using System;
using FeedAPI.Models;
using NewsAPI.Models;

namespace FeedAPI.Services
{
    public class ArticleAdapter : Item
    {
        public ArticleAdapter(Article article)
        {
            this.Title = article.Title;
            this.Author = article.Author;
            this.Source = article.Source.Name;
            this.Link = article.Url;
            this.ImageLink = article.UrlToImage;
            this.Content = article.Content;
            this.PublishDate = (DateTime)article.PublishedAt;
        }
    }
}
