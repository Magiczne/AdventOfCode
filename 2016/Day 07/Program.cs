using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Day_7
{
    internal static class Program
    {
        private static void Main()
        {
            Console.WriteLine("Day 7");

            var solution = new Solution();
            solution.Solve();

            Console.Read();
        }
    }

    internal class Solution
    {
        private readonly List<IpAddressV7> _ips = new List<IpAddressV7>();

        public void Solve()
        {
            var lines = File.ReadAllLines("../../input.txt");

            foreach (var line in lines)
            {
                _ips.Add(new IpAddressV7(line));
            }

            var supportsTls = _ips.Count(ip => ip.SupportsTls);
            var supportsSsl = _ips.Count(ip => ip.SupportsSsl);

            Console.WriteLine("Answers: ");
            Console.WriteLine("*: " + supportsTls);
            Console.WriteLine("**: " + supportsSsl);
        }
    }
}