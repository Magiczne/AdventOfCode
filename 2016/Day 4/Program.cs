using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Day_4
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
        private readonly List<Room> _rooms = new List<Room>();

        public void Solve()
        {
            GetInput();

            var sectorSum = _rooms.Where(room => room.IsValid).Sum(room => room.SectorId);

            Console.WriteLine("Answers: ");
            Console.WriteLine("*: " + sectorSum);
            Console.Write("**: ");

            foreach (var r in _rooms)
            {
                if (r.DecryptedName.Contains("north"))
                {
                    Console.WriteLine(r.DecryptedName + "\t -> " + r.SectorId);
                    break;
                }
            }
        }

        private void GetInput()
        {
            var data = File.ReadAllLines("../../input.txt");

            foreach (var line in data)
            {
                _rooms.Add(new Room(line));
            }
        }
    }
}
