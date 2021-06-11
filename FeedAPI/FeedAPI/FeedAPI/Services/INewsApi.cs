using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedAPI.Services
{
    public interface INewsApi
    {
        string Test();
    }

    public class NewsApi : INewsApi
    {
        public string Test()
        {
            return new string("NewsApi Test");
        }
    }
}
