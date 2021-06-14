using FeedAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text.RegularExpressions;

namespace FeedAPI.Services
{
    public class NewsApi : INewsApi
    {
        private string keyWord = "Apple";
        private string from = "2021-06-11";
        private string sortBy = "popularity";
        private string apiKey = "d11afab6486343cfa40068ffd60f9e68";

        private List<Article> articles;

        public IEnumerable<Article> GetArticles()
        {
            articles = new List<Article>();

            var url = "https://newsapi.org/v2/everything?" +
                      $"q={keyWord}&" +
                      $"from={from}&" +
                      $"sortBy={sortBy}&" +
                      $"apiKey={apiKey}";

            var response = new WebClient().DownloadString(url);

            return articles;
        }

        private void Parse(string response)
        {
            Regex regex = new("");
        }
    }
}
