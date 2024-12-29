using Aoc.Day01;
using Util.Aoc;
using Util.Math;

int Distance(Vec2 point)
{
  return Math.Abs(point.X) + Math.Abs(point.Y);
}

int Part1(string[] instructions)
{
  var currentDirection = Direction.North;
  var distanceVertical = 0;
  var distanceHorizontal = 0;
  List<Vec2> visited = [];

  foreach (var i in instructions)
  {
    if (i[0] == 'R')
    {
      currentDirection++;
    }
    else
    {
      currentDirection--;
    }

    if (currentDirection > (Direction)4)
    {
      currentDirection = Direction.North;
    }

    if (currentDirection < (Direction)1)
    {
      currentDirection = Direction.West;
    }

    var steps = int.Parse(i[1..]);

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

      visited.Add(new Vec2(distanceHorizontal, distanceVertical));
    }
  }

  return Distance(visited.Last());
}

int Part2(string[] instructions)
{
  var currentDirection = Direction.North;
  var distanceVertical = 0;
  var distanceHorizontal = 0;
  bool crossingFound = false;
  Vec2? firstCrossed = null;
  List<Vec2> visited = [];

  foreach (var i in instructions)
  {
    if (i[0] == 'R')
    {
      currentDirection++;
    }
    else
    {
      currentDirection--;
    }

    if (currentDirection > (Direction)4)
    {
      currentDirection = Direction.North;
    }

    if (currentDirection < (Direction)1)
    {
      currentDirection = Direction.West;
    }

    var steps = int.Parse(i[1..]);

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

      var point = new Vec2(distanceHorizontal, distanceVertical);

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

  return Distance(firstCrossed!);
}

string[] Reader(string file)
{
  return File.ReadAllText(file).Split([", "], StringSplitOptions.None);
}

Solver.RunExamples(2016, "01", Reader, Part1, Part2);
Solver.RunSolution(2016, "01", Reader, Part1, Part2);