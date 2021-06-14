using FeedAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ServiceModel.Syndication;
using System.Text.Json;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using Newtonsoft.Json;
using FeedAPI.Models;

namespace FeedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IOnlinerRss _onlinerRSS;
        private readonly INewsApiClient _newsApi;

        public ArticleController(IOnlinerRss onlinerRSS, INewsApiClient newsApi)
        {
            _onlinerRSS = onlinerRSS;
            _newsApi = newsApi;
        }

        [HttpGet]
        public JsonResult GetOnlinerNews()
        {
            var articlesOnliner = _onlinerRSS.GetArticles();
            var articlesNewsApi = _newsApi.GetArticles();

            var articles = articlesOnliner.Concat<Item>(articlesNewsApi);

            if (articles != null)
            {
                string json = JsonConvert.SerializeObject(articles, Formatting.Indented);

                return new JsonResult(json);
            }

            return new JsonResult("Articles not found.");
        }
    }
}
