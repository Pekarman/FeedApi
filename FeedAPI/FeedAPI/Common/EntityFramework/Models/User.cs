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

        [Column("firstname")]
        public string FirstName { get; set; }

        [Column("lastname")]
        public string LastName { get; set; }

        [Column("username")]
        public string Username { get; set; }

        [Column("usertypeid")]
        public int UserTypeId { get; set; }

        public UserType UserType { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("phone")]
        public string Phone { get; set; }

        [Column("passportnumber")]
        public string PassportNumber { get; set; }

        #region Fields only for organizations
        [Column("payerregnumber")]
        public string PayerRegNumber { get; set; }

        [Column("bankaccount")]
        public string BankAccount { get; set; }

        [Column("bankcode")]
        public string BankCode { get; set; }

        [Column("companyname")]
        public string CompanyName { get; set; }
        #endregion

        [Column("balance")]
        public double? Balance { get; set; }

        [Column("balancebets")]
        public double? BalanceBets { get; set; }

        [Column("isactive")]
        public bool IsActive { get; set; }

        [Column("locale")]
        public string Locale { get; set; }

        public List<Deal> Deals { get; set; }

        public List<WatchDeal> WatchDeals { get; set; }

        public User() { }

        public User(int id, string username, int usertypeid)
        {
            Id = id;
            Username = username;
            UserTypeId = usertypeid;
        }

        public User(int id, string firstName, string lastName, string username, string email, int usertypeid)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Username = username;
            UserTypeId = usertypeid;
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
            List<Deal> deals,
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
            Deals = deals;
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
