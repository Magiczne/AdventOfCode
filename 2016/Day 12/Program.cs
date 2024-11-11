using System;
using System.Collections.Generic;
using System.IO;

namespace Day_12
{
    internal static class Program
    {
        private static void Main()
        {
            Console.WriteLine("Answers: ");

            var solution = new Solution();
            solution.Solve(new Dictionary<string, int>
            {
                {"a", 0},
                {"b", 0},
                {"c", 0},
                {"d", 0}
            });
            solution.Solve(new Dictionary<string, int>
            {
                {"a", 0},
                {"b", 0},
                {"c", 1},
                {"d", 0}
            });

            Console.Read();
        }
    }

    internal partial class Solution
    {
        private static Dictionary<string, int> _registers;

        private readonly List<Command> _commands = new List<Command>();

        public Solution()
        {
            var lines = File.ReadAllLines("../../input.txt");
            foreach (var t in lines)
            {
                _commands.Add(new Command(t.Trim()));
            }
        }

        public void Solve(Dictionary<string, int> registers)
        {
            _registers = registers;

            for (var i = 0; i < _commands.Count;)
            {
                var tmp = i + _commands[i].Exec();

                if (tmp < 0) tmp = i;
                if (tmp >= _commands.Count) break;

                i = tmp;
            }

            Console.WriteLine("a: " + _registers["a"]);
        }
    }
}