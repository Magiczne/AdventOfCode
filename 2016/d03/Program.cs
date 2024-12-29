using System.Text;
using System.Text.RegularExpressions;
using Util.Aoc;

bool IsValidTriangle(IEnumerable<int> sides)
{
  var tmp = new List<int>(sides);
  tmp.Sort();

  return tmp[0] + tmp[1] > tmp[2];
}

int Part1(List<List<int>> triangles)
{
  return triangles.Count(IsValidTriangle);
}

int Part2(List<List<int>> triangles)
{
  var possibleTriangles = 0;

  for (var i = 0; i < triangles.Count; i += 3)
  {
    for (var j = 0; j < 3; j++)
    {
      var list = new List<int>()
      {
        triangles[i][j],
        triangles[i + 1][j],
        triangles[i + 2][j]
      };

      if (IsValidTriangle(list))
      {
        possibleTriangles++;
      }
    }
  }

  return possibleTriangles;
}

List<List<int>> Reader(string file)
{
  using var stream = File.OpenRead("2016/d03/input.txt");
  using var streamReader = new StreamReader(stream, Encoding.UTF8);

  List<List<int>> data = [];
  string? line = null;

  while ((line = streamReader.ReadLine()) != null)
  {
    var clean = WhitespaceRegex().Replace(line.Trim(), " ");
    var sides = clean.Split([" "], StringSplitOptions.None);

    data.Add([
      int.Parse(sides[0]),
      int.Parse(sides[1]),
      int.Parse(sides[2])
    ]);
  }

  return data;
}

Solver.RunExamples(2016, "03", Reader, Part1, Part2);
Solver.RunSolution(2016, "03", Reader, Part1, Part2);

partial class Program
{
  [GeneratedRegex(@"\s+")]
  private static partial Regex WhitespaceRegex();
}