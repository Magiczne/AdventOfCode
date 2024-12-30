using Aoc.Day12;
using Util.Aoc;

int Part1(List<Solution.Command> commands)
{
  var solution = new Solution(commands);

  return solution.Solve(new Dictionary<string, int>
  {
    { "a", 0 },
    { "b", 0 },
    { "c", 0 },
    { "d", 0 }
  });
}

int Part2(List<Solution.Command> commands)
{
  var solution = new Solution(commands);

  return solution.Solve(new Dictionary<string, int>
  {
    { "a", 0 },
    { "b", 0 },
    { "c", 1 },
    { "d", 0 }
  });
}

List<Solution.Command> Reader(string file)
{
  return File.ReadAllLines(file).Select(line => new Solution.Command(line.Trim())).ToList();
}

Solver.RunExamples(2016, "12", Reader, Part1, Part2);
Solver.RunSolution(2016, "12", Reader, Part1, Part2);