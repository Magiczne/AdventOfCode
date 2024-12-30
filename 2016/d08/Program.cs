using Aoc.Day08;
using Util.Aoc;

int Part1(List<Solution.Command> commands)
{
  var solution = new Solution();
  solution.Process(commands);

  return solution.GetLitPixels();
}

string Part2(List<Solution.Command> commands)
{
  var solution = new Solution();
  solution.Process(commands);

  return solution.ToText();
}

List<Solution.Command> Reader(string file)
{
  return File.ReadAllLines(file).Select(line => new Solution.Command(line)).ToList();
}

Solver.RunExamples(2016, "08", Reader, Part1, Part2);
Solver.RunSolution(2016, "08", Reader, Part1, Part2);