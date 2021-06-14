using FeedAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsAPIController : ControllerBase
    {
        private readonly INewsApi newsApi;

        public NewsAPIController(INewsApi _newsApi)
        {
            newsApi = _newsApi;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var result = newsApi.GetArticles();

            return new JsonResult(result);
        }
    }
}
