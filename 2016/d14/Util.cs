using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace Day_14
{
    internal static class Util
    {
        public static bool HasTriple(this string s, out char c)
        {
            var regex = new Regex(@"(?<char>.)\1\1");

            var match = regex.Match(s);

            c = match.Success ? match.Groups["char"].Value[0] : ' ';

            return match.Success;
        }

        public static bool HasQuintuple(this string s, char c)
        {
            var match = new string(c, 5);

            return s.Contains(match);
        }

        public static string HashMd5(string input)
        {
            using (var md5 = MD5.Create())
            {
                var inputBytes = Encoding.ASCII.GetBytes(input);
                var hashBytes = md5.ComputeHash(inputBytes);

                var sb = new StringBuilder();

                foreach (var b in hashBytes)
                {
                    sb.Append(b.ToString("X2"));
                }

                return sb.ToString();
            }
        }
    }
}