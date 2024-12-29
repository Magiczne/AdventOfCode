using System.Security.Cryptography;
using System.Text;

namespace Util.Extensions;

public static class StringExtensions
{
  public static string CaesarCode(this string str, int cipherLength)
  {
    var shift = cipherLength % 26;
    var buffer = str.ToCharArray();

    for (var i = 0; i < buffer.Length; i++)
    {
      var letter = buffer[i];
      letter = (char)(letter + shift);

      if (letter > 'z')
      {
        letter = (char)(letter - 26);
      }
      else if (letter < 'a')
      {
        letter = (char)(letter + 26);
      }

      buffer[i] = letter;
    }

    return new string(buffer);
  }

  public static string GetMD5(this string str)
  {
    var inputBytes = Encoding.ASCII.GetBytes(str);
    var hashBytes = MD5.HashData(inputBytes);

    var sb = new StringBuilder();

    foreach (var b in hashBytes)
    {
      sb.Append(b.ToString("X2"));
    }

    return sb.ToString();
  }
}