using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityFramework.Models
{
    [Table("passdata")]
    public class PassData
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("userid")]
        public int UserId { get; set; }

        [Column("passhash")]
        public string PassHash { get; set; }

        [Column("secretphrasehash")]
        public string SecretPhraseHash { get; set; }

        public PassData(int id, string passHash, string secretPhraseHash)
        {
            Id = id;
            UserId = id;
            PassHash = passHash;
            SecretPhraseHash = secretPhraseHash;
        }
    }
}
