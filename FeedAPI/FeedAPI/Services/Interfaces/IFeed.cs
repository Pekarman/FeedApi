using System.Collections.Generic;
using System.Threading.Tasks;
using FeedAPI.Models;

namespace FeedAPI.Services
{
    /// <summary>
    /// Base interface to services.
    /// </summary>
    public interface IFeed
    {
        /// <summary>
        /// Gets a collection of articles asynchronous.
        /// </summary>
        /// <returns>Collection of articles.</returns>
        public Task<IEnumerable<Item>> GetArticlesAsync();
    }
}
