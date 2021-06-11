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

namespace FeedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IOnlinerRss _onlinerRSS;

        public ArticleController(IOnlinerRss onlinerRSS)
        {
            _onlinerRSS = onlinerRSS;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var articles = _onlinerRSS.GetItems();

            string json = JsonConvert.SerializeObject(articles, Formatting.Indented);

            return new JsonResult(json);
        }
    }
}
