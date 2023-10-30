using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityFramework.Models
{
    [Table("users")]
    public class User
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("firstName")]
        public string? FirstName { get; set; }

        [Column("lastName")]
        public string? LastName { get; set; }

        [Column("username")]
        public string? Username { get; set; }

        [Column("usertypeid")]
        public int UserTypeId { get; set; }

        public UserType UserType { get; set; }

        [Column("email")]
        public string? Email { get; set; }

        [Column("phone")]
        public string? Phone { get; set; }

        [Column("passportNumber")]
        public string? PassportNumber { get; set; }

        #region Fields only for organizations
        [Column("payerRegNumber")]
        public string? PayerRegNumber { get; set; }

        [Column("bankAccount")]
        public string? BankAccount { get; set; }

        [Column("bankCode")]
        public string? BankCode { get; set; }

        [Column("companyName")]
        public string? CompanyName { get; set; }
        #endregion

        [Column("balance")]
        public double? Balance { get; set; }

        [Column("isActive")]
        public bool IsActive { get; set; }

        [Column("locale")]
        public string? Locale { get; set; }

        public User() { }

        public User(int id, string username, int usertypeid)
        {
            Id = id;
            Username = username;
            UserTypeId = usertypeid;
        }

        public User(int id, string username, int usertypeid, string usertypename)
        {
            Id = id;
            Username = username;
            UserTypeId = usertypeid;
            UserType = new UserType(usertypeid, usertypename);
        }

        public User(
            int id,
            string firstName,
            string lastName,
            string username,
            int usertypeid,
            string usertypename,
            string email,
            string phone,
            string passportNumber,
            string bankAccount,
            string bankCode,
            string companyName,
            double? balance,
            string locale,
            bool isActive = false
            )
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Username = username;
            UserTypeId = usertypeid;
            UserType = new UserType(usertypeid, usertypename);
            Email = email;
            Phone = phone;
            PassportNumber = passportNumber;
            BankCode = bankCode;
            BankAccount = bankAccount;
            CompanyName = companyName;
            Balance = balance;
            Locale = locale;
            IsActive = isActive;
        }

        public enum UserTypes
        {
            SuperAdmin = 0,
            Admin,
            User,
            Organization
        }
    }
}
