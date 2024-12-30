namespace Aoc.Day12;

partial class Solution(List<Solution.Command> commands)
{
  private static Dictionary<string, int> _registers = [];

  private readonly List<Command> _commands = commands;

  public int Solve(Dictionary<string, int> registers)
  {
    _registers = registers;

    for (var i = 0; i < _commands.Count;)
    {
      var tmp = i + _commands[i].Exec();

      if (tmp < 0) tmp = i;
      if (tmp >= _commands.Count) break;

      i = tmp;
    }

    return _registers["a"];
  }
}