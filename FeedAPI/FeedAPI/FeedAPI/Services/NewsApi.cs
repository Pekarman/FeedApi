using FeedAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net;

namespace FeedAPI.Services
{
    public class NewsApi : INewsApi
    {
        private List<Article> articles;

        public IEnumerable<Article> GetArticles()
        {
            articles = new List<Article>();

            var url = "https://newsapi.org/v2/everything?" +
                      "q=Apple&" +
                      "from=2021-06-11&" +
                      "sortBy=popularity&" +
                      "apiKey=d11afab6486343cfa40068ffd60f9e68";

            var json = new WebClient().DownloadString(url);

            Console.WriteLine(json);

            return articles;
        }
    }
}
