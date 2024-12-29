using System.Text.RegularExpressions;
using Util.Extensions;

namespace Aoc.Day04;

internal partial class Room
{
  private readonly List<string> _encryptedName = [];
  private string _checksum = "";

  private readonly Dictionary<char, int> _lettersFreq = [];

  public int SectorId { get; private set; }

  private string _decryptedName = string.Empty;

  public string DecryptedName
  {
    get
    {
      if (_decryptedName == string.Empty)
      {
        _decryptedName = _encryptedName.Aggregate(string.Empty, (current, n) => current + n.CaesarCode(SectorId) + " ")
          .TrimEnd();
      }

      return _decryptedName;
    }
  }

  public bool IsValid
  {
    get
    {
      var mostCommon = _lettersFreq.OrderByDescending(p => p.Value)
        .ThenBy(p => p.Key)
        .Select(p => p.Key).Take(_checksum.Length).ToArray();

      var checkSum = new string(mostCommon);

      return checkSum == _checksum;
    }
  }

  public Room(string line)
  {
    GetData(line);

    foreach (var part in _encryptedName)
    {
      foreach (var c in part)
      {
        if (_lettersFreq.ContainsKey(c))
        {
          _lettersFreq[c]++;
        }
        else
        {
          _lettersFreq[c] = 1;
        }
      }
    }
  }

  private void GetData(string line)
  {
    line = line.Trim();
    var matches = RoomRegex().Matches(line);

    for (var i = 0; i < matches.Count; i++)
    {
      if (i != matches.Count - 1)
      {
        _encryptedName.Add(matches[i].Groups[1].ToString());
      }
      else
      {
        _encryptedName.Add(matches[i].Groups[1].ToString());
        SectorId = int.Parse(matches[i].Groups[2].ToString());
        _checksum = matches[i].Groups[4].ToString();
      }
    }
  }

  [GeneratedRegex(@"([a-z]+)[-]+?(\d+)?([[]([a-z]+)[]])?")]
  private static partial Regex RoomRegex();
}