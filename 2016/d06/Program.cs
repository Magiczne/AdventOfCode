using System.Text;
using Util.Aoc;

char MostCommon(string line)
{
  var lettersCount = GetLettersFrequency(line);

  return lettersCount.First(p => p.Value == lettersCount.Values.Max()).Key;
}

char LeastCommon(string line)
{
  var lettersCount = GetLettersFrequency(line);

  return lettersCount.First(p => p.Value == lettersCount.Values.Min()).Key;
}

Dictionary<char, int> GetLettersFrequency(string line)
{
  var lettersCount = new Dictionary<char, int>();

  foreach (var c in line)
  {
    if (lettersCount.ContainsKey(c))
    {
      lettersCount[c]++;
    }
    else
    {
      lettersCount[c] = 1;
    }
  }

  return lettersCount;
}

string Part1(List<string> lines)
{
  var length = lines[0].Length;
  var vertical = new StringBuilder[length];

  for (var i = 0; i < length; i++)
  {
    vertical[i] = new StringBuilder();
  }

  foreach (var line in lines)
  {
    for (var i = 0; i < length; i++)
    {
      vertical[i].Append(line[i]);
    }
  }

  var ret = string.Empty;

  foreach (var line in vertical)
  {
    ret += MostCommon(line.ToString());
  }

  return ret;
}

string Part2(List<string> lines)
{
  var length = lines[0].Length;
  var vertical = new StringBuilder[length];

  for (var i = 0; i < length; i++)
  {
    vertical[i] = new StringBuilder();
  }

  foreach (var line in lines)
  {
    for (var i = 0; i < length; i++)
    {
      vertical[i].Append(line[i]);
    }
  }

  var ret = string.Empty;

  foreach (var line in vertical)
  {
    ret += LeastCommon(line.ToString());
  }

  return ret;
}

List<string> Reader(string file)
{
  return File.ReadAllLines(file).ToList();
}

Solver.RunExamples(2016, "06", Reader, Part1, Part2);
Solver.RunSolution(2016, "06", Reader, Part1, Part2);