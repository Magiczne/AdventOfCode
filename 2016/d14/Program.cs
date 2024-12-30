using System.Text.RegularExpressions;
using Util.Aoc;
using Util.Extensions;

int Part1(string data)
{
  var solution = new Solution(data);

  return solution.Solve();
}

int Part2(string data)
{
  var solution = new Solution(data);

  return solution.TwoStars();
}

string Reader(string file)
{
  return File.ReadAllText(file);
}

Solver.RunExamples(2016, "14", Reader, Part1, Part2);
Solver.RunSolution(2016, "14", Reader, Part1, Part2);


class Solution(string input)
{
  private readonly Dictionary<int, string> _checksumCache = [];
  private readonly Dictionary<int, string> _strechedCache = [];
  private readonly List<string> _foundKeys = [];

  public string Input { get; } = input;

  public int Solve()
  {
    for (var i = 0; _foundKeys.Count < 64; i++)
    {
      var md5 = HashOrCache(i);

      if (HasTriple(md5, out char tripleMaker))
      {
        for (var j = i + 1; j < i + 1000; j++)
        {
          var hash = HashOrCache(j);

          if (HasQuintuple(hash, tripleMaker))
          {
            _foundKeys.Add(md5);
            break;
          }
        }
      }
    }

    return _checksumCache.First(pair => pair.Value == _foundKeys.Last()).Key;
  }

  public int TwoStars()
  {
    _foundKeys.Clear();

    for (var i = 0; _foundKeys.Count < 64; i++)
    {
      var md5 = StrechedHash(i);

      if (HasTriple(md5, out char tripleMaker))
      {
        for (var j = i + 1; j < i + 1000; j++)
        {
          var hash = StrechedHash(j);

          if (HasQuintuple(hash, tripleMaker))
          {
            _foundKeys.Add(md5);
            break;
          }
        }
      }
    }

    return _strechedCache.First(pair => pair.Value == _foundKeys.Last()).Key;
  }

  private string HashOrCache(int index)
  {
    if (_checksumCache.ContainsKey(index))
    {
      return _checksumCache[index];
    }

    _checksumCache[index] = (Input + index).GetMD5().ToLower();
    return _checksumCache[index];
  }

  private string StrechedHash(int index)
  {
    if (_strechedCache.ContainsKey(index))
    {
      return _strechedCache[index];
    }

    var hash = HashOrCache(index);

    for (var i = 0; i < 2016; i++)
    {
      hash = hash.GetMD5().ToLower();
    }

    _strechedCache[index] = hash.ToLower();

    return _strechedCache[index];
  }

  public bool HasTriple(string s, out char c)
  {
    var regex = new Regex(@"(?<char>.)\1\1");

    var match = regex.Match(s);

    c = match.Success ? match.Groups["char"].Value[0] : ' ';

    return match.Success;
  }

  public bool HasQuintuple(string s, char c)
  {
    var match = new string(c, 5);

    return s.Contains(match);
  }
}