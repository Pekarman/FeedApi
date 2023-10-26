using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityFramework.Models
{
    [Table("usertype")]
    public class UserType
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("typename")]
        public string? TypeName { get; set; }

        public UserType() { }

        public UserType(int id, string typename)
        {
            Id = id;
            TypeName = typename;
        }
    }
}
