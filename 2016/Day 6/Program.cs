using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Day_6
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
        private readonly List<string> _data;
            
        public Solution()
        {
            _data = File.ReadAllLines("../../input.txt").ToList();
        }

        public void Solve()
        {
            var length = _data[0].Length;

            var vertical = new StringBuilder[length];

            for(var i = 0; i < length; i++)
            {
                vertical[i] = new StringBuilder();
            }

            foreach (var line in _data)
            {
                for (var i = 0; i < length; i++)
                {
                    vertical[i].Append(line[i]);
                }
            }

            Console.Write("*: ");
            foreach (var line in vertical)
            {
                Console.Write(MostCommon(line.ToString()));
            }
            Console.WriteLine();

            Console.Write("**: ");
            foreach (var line in vertical)
            {
                Console.Write(LeastCommon(line.ToString()));
            }
            Console.WriteLine();
        }

        private static char MostCommon(string line)
        {
            var lettersCount = GetLettersFrequency(line);

            return lettersCount.First(p => p.Value == lettersCount.Values.Max()).Key;
        }

        private static char LeastCommon(string line)
        {
            var lettersCount = GetLettersFrequency(line);

            return lettersCount.First(p => p.Value == lettersCount.Values.Min()).Key;
        }

        private static Dictionary<char, int> GetLettersFrequency(string line)
        {
            var lettersCount = new Dictionary<char, int>();

            foreach (var c in line)
            {
                if (lettersCount.ContainsKey(c))
                {
                    lettersCount[c]++;
                }
                else
                {
                    lettersCount[c] = 1;
                }
            }

            return lettersCount;
        }
    }
}
