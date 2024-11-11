using System;
using System.IO;
using System.Linq;

namespace Day_8
{
    internal partial class Solution
    {
        private const int ScreenWidth = 50;
        private const int ScreenHeight = 6;

        private static bool[][] _screen;

        public Solution()
        {
            _screen = new bool[ScreenHeight][];

            for (var i = 0; i < _screen.Length; i++)
            {
                _screen[i] = new bool[ScreenWidth];
            }
        }

        public void Solve()
        {
            foreach (var line in File.ReadAllLines("../../input.txt"))
            {
                (new Command(line)).Execute();
            }

            var litPixels = _screen.Sum(a => a.Count(b => b));

            Console.WriteLine("Answers: ");
            Console.WriteLine("*: " + litPixels);
            Print();
        }

        private static void Print()
        {
            foreach (var list in _screen)
            {
                foreach (var elem in list)
                {
                    Console.Write(elem ? "#" : " ");
                }
                Console.WriteLine();
            }
        }
    }
}
