﻿using System.Linq;
using System.Threading.Tasks;
using FeedAPI.Models;
using FeedAPI.Services;
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
        public async Task<IActionResult> GetFeedAsync()
        {
            try
            {
                var articlesOnliner = await this.onlinerRSS.GetArticlesAsync();
                var articlesNewsApi = await this.newsApi.GetArticlesAsync();
                var articles = articlesOnliner.Concat<Item>(articlesNewsApi);
                if (articles != null)
                {
                    //var json = JsonConvert.SerializeObject(articles, Formatting.Indented);

                    return this.Ok(articles);

                    //return new JsonResult(JsonConvert.SerializeObject(articles, Formatting.Indented));
                }
            }
            catch (System.Exception e)
            {
                return new JsonResult(e.Message);
            }

            return new JsonResult("Articles not found.");
        }
    }
}
