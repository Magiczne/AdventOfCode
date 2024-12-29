using System.Diagnostics;

namespace Util.Aoc;

public class Solver
{
  public delegate TInput Reader<TInput>(string file);

  public delegate TResult Part1<TInput, TResult>(TInput data);

  public delegate TResult Part2<TInput, TResult>(TInput data);

  public static void RunExamples<TInput, TPart1Result, TPart2Result>(
    int year,
    string day,
    Reader<TInput> reader,
    Part1<TInput, TPart1Result> part1,
    Part2<TInput, TPart2Result> part2
  )
  {
    string dirPath = Path.Combine(Aoc.RootDirectory, $"{year}/d{day}/test-runs");

    if (Directory.Exists(dirPath))
    {
      var testFiles = Directory.GetFiles(dirPath);

      foreach (var file in testFiles)
      {
        TInput testData = reader(file);

        var stopwatch = Stopwatch.StartNew();
        TPart1Result valuePart1 = part1(testData);
        stopwatch.Stop();
        Printer.ExamplePart1(valuePart1, Path.GetFileName(file), stopwatch.Elapsed.TotalMilliseconds);

        stopwatch.Restart();
        TPart2Result valuePart2 = part2(testData);
        stopwatch.Stop();
        Printer.ExamplePart2(valuePart2, Path.GetFileName(file), stopwatch.Elapsed.TotalMilliseconds);
      }
    }
  }

  public static void RunSolution<TInput, TPart1Result, TPart2Result>(
    int year, string day, Reader<TInput> reader, Part1<TInput, TPart1Result> part1, Part2<TInput, TPart2Result> part2
  )
  {
    string filePath = Path.Combine(Aoc.RootDirectory, $"{year}/d{day}/input.txt");
    TInput data = reader(filePath);

    var stopwatch = Stopwatch.StartNew();
    TPart1Result valuePart1 = part1(data);
    stopwatch.Stop();
    Printer.SolutionPart1(valuePart1, stopwatch.Elapsed.TotalMilliseconds);

    stopwatch.Restart();
    TPart2Result valuePart2 = part2(data);
    stopwatch.Stop();
    Printer.SolutionPart2(valuePart2, stopwatch.Elapsed.TotalMilliseconds);
  }
}