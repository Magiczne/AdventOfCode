using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AdventOfCode
{
    internal static class Program
    {
        private static string _input;

        private static Direction _currentDirection = Direction.North;

        private static int _distanceVertical;
        private static int _distanceHorizontal;

        private static bool _crossingFound;
        private static Point _firstCrossed;
        private static readonly List<Point> Visited = new List<Point>();

        private static void Main()
        {
            _input = File.ReadAllText("../../input.txt");

            var instructions = _input.Split(new[] {", "}, StringSplitOptions.None);

            foreach (var i in instructions)
            {
                if (i[0] == 'R') _currentDirection++;
                else _currentDirection--;

                if (_currentDirection > (Direction) 4) _currentDirection = Direction.North;
                if (_currentDirection < (Direction) 1) _currentDirection = Direction.West;

                var steps = int.Parse(i.Substring(1));

                for (var j = 1; j <= steps; j++)
                {
                    switch (_currentDirection)
                    {
                        case Direction.North:
                            _distanceVertical++;
                            break;
                        case Direction.West:
                            _distanceHorizontal--;
                            break;
                        case Direction.South:
                            _distanceVertical--;
                            break;
                        case Direction.East:
                            _distanceHorizontal++;
                            break;
                        default:
                            throw new ArgumentOutOfRangeException();
                    }

                    var point = new Point(_distanceHorizontal, _distanceVertical);

                    if (!_crossingFound)
                    {
                        if (Visited.Contains(point))
                        {
                            _firstCrossed = point;
                            _crossingFound = true;
                        }
                    }

                    Visited.Add(point);
                }
            }

            Console.WriteLine("Answers: ");
            Console.WriteLine("*: " + Visited.Last().Distance);
            Console.Write("**: " + _firstCrossed.Distance);

            Console.Read();
        }
    }
}