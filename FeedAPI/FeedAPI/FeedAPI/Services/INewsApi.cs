using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;

namespace FeedAPI.Services
{
    public interface INewsApi
    {
        public JsonResult Get();
    }

    public class NewsApi : INewsApi
    {

        [HttpGet]
        public JsonResult Get()
        {

            var url = "https://newsapi.org/v2/everything?" +
                      "q=Apple&" +
                      "from=2021-06-11&" +
                      "sortBy=popularity&" +
                      "apiKey=d11afab6486343cfa40068ffd60f9e68";

            var json = new WebClient().DownloadString(url);

            Console.WriteLine(json);

            return new JsonResult(json);
        }
    }
}
