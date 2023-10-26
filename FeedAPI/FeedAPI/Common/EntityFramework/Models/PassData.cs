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

        [Column("userId")]
        public int UserId { get; set; }

        [Column("passHash")]
        public string PassHash { get; set; }

        [Column("secretPhraseHash")]
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
