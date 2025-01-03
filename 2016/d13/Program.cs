﻿using Util.Aoc;

int Part1(int input)
{
  var solution = new Solution(input);

  return solution.Solve();
}

int Part2(int input)
{
  var solution = new Solution(input);

  return solution.TwoStars();
}

int Reader(string file)
{
  return int.Parse(File.ReadAllText(file));
}

Solver.RunExamples(2016, "13", Reader, Part1, Part2);
Solver.RunSolution(2016, "13", Reader, Part1, Part2);

internal class Solution
{
  private const int StartX = 1;
  private const int StartY = 1;
  private const int EndX = 31;
  private const int EndY = 39;

  private static readonly int MazeSize = Math.Max(EndX, EndY) + 10;

  private readonly char[,] _floor = new char[MazeSize, MazeSize];
  private readonly int[,] _distance = new int[MazeSize, MazeSize];

  public int Input { get; }

  public Solution(int input)
  {
    Input = input;

    for (var y = 0; y < MazeSize; y++)
    {
      for (var x = 0; x < MazeSize; x++)
      {
        var tmp = y * y + 3 * y + 2 * y * x + x + x * x;
        tmp += Input;

        if (CountBits(tmp) % 2 == 0)
        {
          _floor[y, x] = '.';
        }
        else
        {
          _floor[y, x] = '#';
        }
      }
    }
  }

  public int Solve()
  {
    int[] x = [0, 0, 1, -1];
    int[] y = [1, -1, 0, 0];

    var q = new Queue<Tuple<int, int>>();
    q.Enqueue(new Tuple<int, int>(StartX, StartY));

    for (var i = 0; i < MazeSize; i++)
    {
      for (var j = 0; j < MazeSize; j++)
      {
        _distance[i, j] = -1;
      }
    }

    _distance[StartX, StartY] = 0;

    while (q.Count > 0)
    {
      var elem = q.Dequeue();
      for (var i = 0; i < 4; i++)
      {
        var nextX = elem.Item1 + x[i];
        var nextY = elem.Item2 + y[i];

        if (nextX >= 0 && nextY >= 0 && nextX < MazeSize && nextY < MazeSize &&
            _distance[nextX, nextY] == -1 && _floor[nextX, nextY] != '#')
        {
          _distance[nextX, nextY] = _distance[elem.Item1, elem.Item2] + 1;
          q.Enqueue(new Tuple<int, int>(nextX, nextY));
        }
      }
    }

    return _distance[EndX, EndY];
  }

  public int TwoStars()
  {
    return _distance.Cast<int>().Count(item => item <= 50 && item != -1);
  }

  private static int CountBits(int value)
  {
    var count = 0;
    while (value != 0)
    {
      count++;
      value &= value - 1;
    }

    return count;
  }
}