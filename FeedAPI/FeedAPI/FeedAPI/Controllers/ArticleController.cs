using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using System.Threading.Tasks;
using FeedAPI.Models;
using FeedAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FeedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IOnlinerRss onlinerRSS;
        private readonly INewsApiClient newsApi;

        public ArticleController(IOnlinerRss onlinerRSS, INewsApiClient newsApi)
        {
            this.onlinerRSS = onlinerRSS;
            this.newsApi = newsApi;
        }

        [HttpGet]
        public async Task<JsonResult> GetOnlinerNewsAsync()
        {
            var articlesOnliner = await this.onlinerRSS.GetArticlesAsync();
            var articlesNewsApi = await this.newsApi.GetArticlesAsync();

            var articles = articlesOnliner.Concat<Item>(articlesNewsApi);

            //var articles = onlinerRSS.GetArticlesAsync().Concat<Item>(newsApi.GetArticlesAsync());

            if (articles != null)
            {
                string json = JsonConvert.SerializeObject(articles, Formatting.Indented);

                return new JsonResult(json);
            }

            return new JsonResult("Articles not found.");
        }
    }
}
