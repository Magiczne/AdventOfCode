int Part1(string[] instructions)
{
    var currentDirection = Direction.North;
    var distanceVertical = 0;
    var distanceHorizontal = 0;
    List<Point> visited = [];

    foreach (var i in instructions)
    {
        if (i[0] == 'R') currentDirection++;
        else currentDirection--;

        if (currentDirection > (Direction) 4) currentDirection = Direction.North;
        if (currentDirection < (Direction) 1) currentDirection = Direction.West;

        var steps = int.Parse(i.Substring(1));

        for (var j = 1; j <= steps; j++)
        {
            switch (currentDirection)
            {
                case Direction.North:
                    distanceVertical++;
                    break;
                case Direction.West:
                    distanceHorizontal--;
                    break;
                case Direction.South:
                    distanceVertical--;
                    break;
                case Direction.East:
                    distanceHorizontal++;
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            visited.Add(new Point(distanceHorizontal, distanceVertical));
        }
    }

    return visited.Last().Distance;
}

int Part2(string[] instructions)
{
    var currentDirection = Direction.North;
    var distanceVertical = 0;
    var distanceHorizontal = 0;
    bool crossingFound = false;
    Point? firstCrossed = null;
    List<Point> visited = [];

    foreach (var i in instructions)
    {
        if (i[0] == 'R') currentDirection++;
        else currentDirection--;

        if (currentDirection > (Direction) 4) currentDirection = Direction.North;
        if (currentDirection < (Direction) 1) currentDirection = Direction.West;

        var steps = int.Parse(i.Substring(1));

        for (var j = 1; j <= steps; j++)
        {
            switch (currentDirection)
            {
                case Direction.North:
                    distanceVertical++;
                    break;
                case Direction.West:
                    distanceHorizontal--;
                    break;
                case Direction.South:
                    distanceVertical--;
                    break;
                case Direction.East:
                    distanceHorizontal++;
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            var point = new Point(distanceHorizontal, distanceVertical);

            if (!crossingFound)
            {
                if (visited.Contains(point))
                {
                    firstCrossed = point;
                    crossingFound = true;
                }
            }

            visited.Add(point);
        }
    }

    return firstCrossed!.Distance;
}

string[] Reader(string file)
{
    return File.ReadAllText(file).Split([", "], StringSplitOptions.None);
}

Util.Aoc.Solver.RunExamples(2016, "01", Reader, Part1, Part2);
Util.Aoc.Solver.RunSolution(2016, "01", Reader, Part1, Part2);

enum Direction
{
    North = 1,
    East = 2,
    South = 3,
    West = 4,
}

class Point(int x, int y) : IEquatable<Point>
{
    private int X { get; } = x;
    private int Y { get; } = y;

    public int Distance => Math.Abs(X) + Math.Abs(Y);

    public bool Equals(Point? other)
    {
        return other != null && X == other.X && Y == other.Y;
    }
}
