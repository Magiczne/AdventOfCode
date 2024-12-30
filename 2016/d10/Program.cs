using Aoc.Day10;
using Util.Aoc;

string Part1(List<string> data)
{
  var solution = new Solution(data);

  return solution.OneStar();
}

int Part2(List<string> data)
{
  var solution = new Solution(data);

  return solution.TwoStars();
}

List<string> Reader(string file)
{
  var lines = File.ReadAllLines(file).ToList();
  lines.Sort();

  return lines;
}

Solver.RunExamples(2016, "10", Reader, Part1, Part2);
Solver.RunSolution(2016, "10", Reader, Part1, Part2);