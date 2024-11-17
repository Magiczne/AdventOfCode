using System;

namespace AdventOfCode
{
    internal class Point : IEquatable<Point>
    {
        private int X { get; }
        private int Y { get; }

        public int Distance => Math.Abs(X) + Math.Abs(Y);

        public Point(int x, int y)
        {
            X = x;
            Y = y;
        }

        public bool Equals(Point other)
        {
            return other != null && (X == other.X && Y == other.Y);
        }
    }
}
