using System;
using System.Collections.Generic;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using FeedAPI.Models;
using Microsoft.AspNetCore.Mvc;
using NewsAPI;
using NewsAPI.Constants;
using NewsAPI.Models;
using Newtonsoft.Json;

namespace FeedAPI.Services
{
    /// <summary>
    /// Service to inject.
    /// </summary>
    public class NewsApi : INewsApiClient
    {
        private const string ApiKey = "d11afab6486343cfa40068ffd60f9e68";
        private string keyWord = "Apple";
        private DateTime from = DateTime.Today;

        private List<Item> articles;

        /// <inheritdoc/>
        public async Task<IEnumerable<Item>> GetArticlesAsync()
        {
            this.articles = new List<Item>();

            var newsApiClient = new NewsApiClient(ApiKey);
            var articlesResponse = await newsApiClient.GetEverythingAsync(new EverythingRequest
            {
                Q = this.keyWord,
                SortBy = SortBys.Popularity,
                Language = Languages.RU,
                From = this.from,
            });

            if (articlesResponse.Status == Statuses.Ok)
            {
                foreach (var article in articlesResponse.Articles)
                {
                    this.articles.Add(new Item
                    {
                        Title = article.Title,
                        Author = article.Author,
                        Source = article.Source.Name,
                        Link = article.Url,
                        ImageLink = article.UrlToImage,
                        Content = article.Content,
                        PublishDate = (DateTime)article.PublishedAt,
                    });
                }
            }

            return this.articles;
        }
    }
}
