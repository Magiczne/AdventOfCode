using System;
using System.Text.RegularExpressions;

namespace Day_12
{
    internal partial class Solution
    {
        private class Command
        {
            private readonly string _type;
            private readonly string[] _params = new string[2];

            public Command(string line)
            {
                var data = line.Split(' ');

                _type = data[0];
                _params[0] = data[1];
                if (_type == "cpy" || _type == "jnz")
                {
                    _params[1] = data[2];
                }
            }

            public int Exec()
            {
                switch (_type)
                {
                    case "cpy":
                    {
                        var value = Regex.IsMatch(_params[0], @"^-?\d+$")
                            ? int.Parse(_params[0])
                            : _registers[_params[0]];

                        _registers[_params[1]] = value;
                        break;
                    }

                    case "inc":
                        _registers[_params[0]]++;
                        break;

                    case "dec":
                        _registers[_params[0]]--;
                        break;

                    case "jnz":
                    {
                        var value = Regex.IsMatch(_params[0], @"^-?\d+$")
                            ? int.Parse(_params[0])
                            : _registers[_params[0]];

                        if (value != 0)
                        {
                            return int.Parse(_params[1]);
                        }

                        break;
                    }

                    default:
                        throw new ArgumentOutOfRangeException();
                }

                return 1;
            }
        }
    }
}
//