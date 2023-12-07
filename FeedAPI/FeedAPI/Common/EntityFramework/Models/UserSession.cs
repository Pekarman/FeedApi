using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityFramework.Models
{
    [Table("usersession")]
    public class UserSession
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("userid")]
        public int UserId { get; set; }

        [Column("locale")]
        public string Locale { get; set; }

        [Column("logintimestamp")]
        public DateTime LoginTimeStamp { get; set; }

        [Column("lastchangetimestamp")]
        public DateTime LastChangeTimeStamp { get; set; }

        public User user { get; set; }

        public UserSession(int id, int userId, string locale, DateTime loginTimeStamp, DateTime lastChangeTimeStamp)
        {
            Id = id;
            UserId = userId;
            Locale = locale;
            LoginTimeStamp = loginTimeStamp;
            LastChangeTimeStamp = lastChangeTimeStamp;
        }

        public UserSession() { }
    }
}
