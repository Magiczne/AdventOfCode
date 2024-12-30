using Util.Extensions;

namespace Aoc.Day08;

public class Solution
{
  private const int ScreenWidth = 50;
  private const int ScreenHeight = 6;

  private static bool[][] _screen = [];

  public Solution()
  {
    _screen = new bool[ScreenHeight][];

    for (var i = 0; i < _screen.Length; i++)
    {
      _screen[i] = new bool[ScreenWidth];
    }
  }

  public void Process(List<Command> commands)
  {
    commands.ForEach(command => command.Execute());
  }

  public int GetLitPixels()
  {
    return _screen.Sum(a => a.Count(b => b));
  }

  public string ToText()
  {
    var ret = "\n";

    foreach (var list in _screen)
    {
      foreach (var elem in list)
      {
        ret += elem ? "#" : " ";
      }

      ret += '\n';
    }

    return ret;
  }

  public class Command
  {
    private enum Action
    {
      Rect,
      RotateRow,
      RotateColumn
    }

    private readonly int[] _params = new int[2];
    private readonly Action _action;

    public Command(string line)
    {
      if (line.Contains("rect"))
      {
        var index = 0;
        foreach (var p in line.Split(' ')[1].Split('x'))
        {
          _params[index] = int.Parse(p);
          index++;
        }

        _action = Action.Rect;
      }
      else if (line.Contains("row"))
      {
        GetRotateParams(line);
        _action = Action.RotateRow;
      }
      else
      {
        GetRotateParams(line);
        _action = Action.RotateColumn;
      }
    }

    private void GetRotateParams(string line)
    {
      var splitted = line.Split(' ');

      _params[0] = int.Parse(splitted[2].Split('=')[1]);
      _params[1] = int.Parse(splitted[4]);
    }

    public void Execute()
    {
      switch (_action)
      {
        case Action.Rect:
          for (var i = 0; i < _params[0]; i++)
          {
            for (var j = 0; j < _params[1]; j++)
            {
              _screen[j][i] = true;
            }
          }

          break;

        case Action.RotateRow:
          _screen[_params[0]] = _screen[_params[0]].RotateLeft(ScreenWidth - _params[1]).ToArray();
          break;

        case Action.RotateColumn:
          for (var i = 0; i < _params[1]; i++)
          {
            var tmp = _screen[ScreenHeight - 1][_params[0]];
            for (var j = ScreenHeight - 1; j > 0; --j)
            {
              _screen[j][_params[0]] = _screen[j - 1][_params[0]];
            }

            _screen[0][_params[0]] = tmp;
          }

          break;

        default:
          throw new ArgumentOutOfRangeException();
      }
    }
  }
}