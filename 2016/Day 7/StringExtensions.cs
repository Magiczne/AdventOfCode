using System.Collections.Generic;

namespace Day_7
{
    internal static class StringExtensions
    {
        public static bool HasAbba(this string s)
        {
            if (s.Length < 4) return false;

            for (var i = 0; i < s.Length - 3; i++)
            {
                if (s[i] == s[i + 3])
                {
                    if (s[i + 1] == s[i + 2] && s[i] != s[i + 1])
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        public static IEnumerable<string> GetAbaList(this string s)
        {
            var ret = new List<string>();

            if (s.Length < 3) return ret;

            for (var i = 0; i < s.Length - 2; i++)
            {
                if (s[i] == s[i + 2] && s[i + 1] != s[i])
                {
                    ret.Add(s.Substring(i, 3));
                }
            }

            return ret;
        }

        public static bool HasBab(this string s, string aba)
        {
            var bab = aba[1].ToString() + aba[0] + aba[1];

            return s.Contains(bab);
        }
    }
}
