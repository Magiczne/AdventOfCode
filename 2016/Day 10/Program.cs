using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Day_10
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

    internal partial class Solution
    {
        private static readonly List<Bot> Bots = new List<Bot>();
        private static readonly Dictionary<int, int> Outputs = new Dictionary<int, int>();
        private readonly List<string> _data;

        public Solution()
        {
            _data = File.ReadAllLines("../../input.txt").ToList();
            _data.Sort();
        }

        public void Solve()
        {
            var regex =
                new Regex(
                    @"value (?<val>\d+) goes to bot (?<bot>\d+)|bot (?<s_bot>\d+) gives low to (?<low_to>bot|output) (?<low_value>\d+) and high to (?<high_to>bot|output) (?<high_value>\d+)");

            foreach (var line in _data)
            {
                var match = regex.Match(line);

                //bot x gives low to ...
                if (match.Groups["s_bot"].Success)
                {
                    var id = int.Parse(match.Groups["s_bot"].ToString());
                    var high = int.Parse(match.Groups["high_value"].ToString());
                    var low = int.Parse(match.Groups["low_value"].ToString());
                    var highOutput = match.Groups["high_to"].ToString() == "output";
                    var lowOutput = match.Groups["low_to"].ToString() == "output";

                    var bot = new Bot(id, high, low, highOutput, lowOutput);
                    Bots.Add(bot);
                }
                //value x goest to bot y
                else
                {
                    var val = int.Parse(match.Groups["val"].ToString());
                    var id = int.Parse(match.Groups["bot"].ToString());

                    var bot = Bots.Find(b => b.Id == id);
                    bot.GiveChip(val);
                    bot.Process();
                }
            }

            var twoStars = Outputs[0]*Outputs[1]*Outputs[2];

            Console.WriteLine("**: " + twoStars);
        }
    }
}