using System;

namespace FeedAPI.Models
{
    /// <summary>
    /// Article model.
    /// </summary>
    public class Item
    {
        /// <summary>
        /// Gets or sets article title.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets article author.
        /// </summary>
        public string Author { get; set; }

        /// <summary>
        /// Gets or sets article source.
        /// </summary>
        public string Source { get; set; }

        /// <summary>
        /// Gets or sets article link.
        /// </summary>
        public string Link { get; set; }

        /// <summary>
        /// Gets or sets articli image link.
        /// </summary>
        public string ImageLink { get; set; }

        /// <summary>
        /// Gets or sets article content.
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        /// Gets or sets publication date.
        /// </summary>
        public DateTime PublishDate { get; set; }
    }
}
