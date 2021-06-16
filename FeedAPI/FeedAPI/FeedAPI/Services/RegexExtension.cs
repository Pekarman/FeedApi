﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FeedAPI.Services
{
    public static class RegexExtension
    {
        public static string GetRegexValue(this string source, string pattern)
        {
            Match m = Regex.Match(source, pattern);

            if (m.Success)
            {
                return m.Groups[1].Value.Trim('"');
            }

            return string.Empty;
        }
    }
}
