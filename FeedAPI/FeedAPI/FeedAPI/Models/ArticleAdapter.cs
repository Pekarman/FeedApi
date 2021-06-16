using System;
using FeedAPI.Models;
using NewsAPI.Models;

namespace FeedAPI.Services
{
    public class ArticleAdapter : Item
    {
        private readonly Article article;

        public ArticleAdapter(Article article)
        {
            this.article = article;
        }

        public new string Title => this.article.Title;

        public new string Author => this.article.Author;

        public new string Source => this.article.Source.Name;

        public new string Link => this.article.Url;

        public new string ImageLink => this.article.UrlToImage;

        public new string Content => this.article.Content;

        public new DateTime PublishDate => (DateTime)this.article.PublishedAt;
    }
}
