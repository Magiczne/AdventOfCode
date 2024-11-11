using System;

namespace Day_8
{
    internal partial class Solution
    {
        private class Command
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
                switch(_action)
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
                        _screen[_params[0]] = _screen[_params[0]].RotateLeft(ScreenWidth - _params[1]);
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
}
