using FeedAPI.Models;
using Microsoft.AspNetCore.Mvc;
using NewsAPI;
using NewsAPI.Models;
using NewsAPI.Constants;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text.RegularExpressions;

namespace FeedAPI.Services
{
    public class NewsApi : INewsApiClient
    {
        private string keyWord = "Apple";
        private DateTime from = DateTime.Today;
        private string apiKey = "d11afab6486343cfa40068ffd60f9e68";

        private List<Item> articles;

        public List<Item> GetArticles()
        {
            articles = new List<Item>();

            var newsApiClient = new NewsApiClient(apiKey);
            var articlesResponse = newsApiClient.GetEverything(new EverythingRequest
            {
                Q = keyWord,
                SortBy = SortBys.Popularity,
                Language = Languages.RU,
                From = from,
            }) ;

            if (articlesResponse.Status == Statuses.Ok)
            {
                foreach (var article in articlesResponse.Articles)
                {
                    articles.Add(new Item
                    {
                        Title = article.Title,
                        Author = article.Author,
                        Source = article.Source.Name,
                        Link = article.Url,
                        ImageLink = article.UrlToImage,
                        Content = article.Content,
                        PublishDate = (DateTime)article.PublishedAt
                    });
                }
            }

            return articles;
        }
    }
}
