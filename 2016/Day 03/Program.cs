using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Day_3
{
    internal static class Program
    {
        private static void Main()
        {
            var solution = new Solution();
            solution.Solve();

            Console.Read();
        }
    }

    internal class Solution
    {
        private readonly List<List<int>> _data = new List<List<int>>();

        public void Solve()
        {
            GetInput();

            var possible = _data.Count(IsValidTriangle);
            var possible2 = 0;

            //Part 2
            for (var i = 0; i < _data.Count; i += 3)
            {
                for (var j = 0; j < 3; j++)
                {
                    var list = new List<int>()
                    {
                        _data[i][j],
                        _data[i + 1][j],
                        _data[i + 2][j]
                    };

                    if (IsValidTriangle(list)) possible2++;
                }
            }

            Console.WriteLine("Answers: ");
            Console.WriteLine("*: " + possible);
            Console.WriteLine("**: " + possible2);
        }

        private void GetInput()
        {
            using (var stream = File.OpenRead("../../input.txt"))
            {
                using (var streamReader = new StreamReader(stream, Encoding.UTF8))
                {
                    string line;

                    while ((line = streamReader.ReadLine()) != null)
                    {
                        var clean = line.Trim();
                        clean = Regex.Replace(clean, @"\s+", " ");

                        var sides = clean.Split(new[] {" "}, StringSplitOptions.None);

                        var list = new List<int>()
                        {
                            int.Parse(sides[0]),
                            int.Parse(sides[1]),
                            int.Parse(sides[2])
                        };

                        _data.Add(list);
                    }
                }
            }
        }

        private static bool IsValidTriangle(IEnumerable<int> sides)
        {
            var tmp = new List<int>(sides);
            tmp.Sort();
            return tmp[0] + tmp[1] > tmp[2];
        }
    }
}
