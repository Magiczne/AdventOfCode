using System.Text.RegularExpressions;

namespace Aoc.Day07;

internal class IpAddressV7
{
  private readonly List<string> _sequences = [];
  private readonly List<string> _hypernetSequences = [];

  public bool SupportsTls
  {
    get { return !_hypernetSequences.Any(HasAbba) && _sequences.Any(HasAbba); }
  }

  public bool SupportsSsl
  {
    get
    {
      var abaList = new List<string>();

      foreach (var seq in _sequences)
      {
        abaList.AddRange(GetAbaList(seq));
      }

      return _hypernetSequences.Any(seq => abaList.Any(aba => HasBab(seq, aba)));
    }
  }

  public IpAddressV7(string line)
  {
    line = line.Trim();

    var regex = new Regex(@"([a-z]+)(?:[[]([a-z]+)[]])?");

    var matches = regex.Matches(line);

    foreach (Match match in matches)
    {
      for (var i = 1; i < match.Groups.Count; i++)
      {
        if (match.Groups[i].ToString() == string.Empty) continue;

        if (i % 2 == 1)
        {
          _sequences.Add(match.Groups[i].ToString());
        }
        else
        {
          _hypernetSequences.Add(match.Groups[i].ToString());
        }
      }
    }
  }

  public static bool HasAbba(string s)
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

  public static IEnumerable<string> GetAbaList(string s)
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

  public static bool HasBab(string s, string aba)
  {
    var bab = aba[1].ToString() + aba[0] + aba[1];

    return s.Contains(bab);
  }
}