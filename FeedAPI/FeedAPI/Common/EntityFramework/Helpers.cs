using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityFramework
{
    public class Helpers
    {
        public static string GetRDSConnectionString()
        {
            string dbname = "ebdb";
            string hostname = "feeddb-dev.cjehbnpyfkwm.us-east-1.rds.amazonaws.com";
            string port = "5432";
            string username = "postgres";
            string password = "postgres";

            return "Host=" + hostname + ";Port=" + port + ";Database=" + dbname + ";Username=" + username + ";Password=" + password + ";";
        }
    }
}