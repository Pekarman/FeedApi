using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using FeedAPI.Models;
using Microsoft.AspNetCore.Mvc;
using NewsAPI;
using NewsAPI.Constants;
using NewsAPI.Models;
using Newtonsoft.Json;

namespace FeedAPI.Services
{
    /// <summary>
    /// Service for getting NewsApi feed.
    /// </summary>
    public class NewsApi : INewsApiClient
    {
        private const string ApiKey = "d11afab6486343cfa40068ffd60f9e68";
        private string keyWord = "Apple";
        private DateTime from = DateTime.Today;

        /// <inheritdoc/>
        public async Task<IEnumerable<Item>> GetArticlesAsync()
        {
            var articles = new List<Item>();

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
                var config = new MapperConfiguration(cfg => cfg.CreateMap<Article, Item>()
                                                    .ForMember("Source", opt => opt.MapFrom(c => c.Source.Name))
                                                    .ForMember("Link", opt => opt.MapFrom(c => c.Url))
                                                    .ForMember("ImageLink", opt => opt.MapFrom(c => c.UrlToImage))
                                                    .ForMember("PublishDate", opt => opt.MapFrom(c => (DateTime)c.PublishedAt)));
                var mapper = new Mapper(config);

                articles = mapper.Map<List<Article>, List<Item>>(articlesResponse.Articles);
            }

            return articles;
        }
    }
}
