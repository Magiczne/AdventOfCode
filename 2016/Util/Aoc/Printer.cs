namespace Util.Aoc;

internal class Printer
{
  private static string BuildString<TResult>(
    string type,
    string label,
    string part,
    TResult result,
    double durationInMs
  )
  {
    return $"{type} {label,-10} {part} {result,-45} {durationInMs:F4}ms";
  }

  public static void ExamplePart1<TResult>(TResult result, string testFileName, double durationInMs)
  {
    Console.ForegroundColor = ConsoleColor.Yellow;
    Console.WriteLine(BuildString("[EXM]", $"({testFileName})", "Part 1:", result, durationInMs));
    Console.ResetColor();
  }

  public static void ExamplePart2<TResult>(TResult result, string testFileName, double durationInMs)
  {
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine(BuildString("[EXM]", $"({testFileName})", "Part 2:", result, durationInMs));
    Console.ResetColor();
  }

  public static void SolutionPart1<TResult>(TResult result, double durationInMs)
  {
    Console.ForegroundColor = ConsoleColor.Green;
    Console.WriteLine(BuildString("[SLN]", string.Empty, "Part 1:", result, durationInMs));
    Console.ResetColor();
  }

  public static void SolutionPart2<TResult>(TResult result, double durationInMs)
  {
    Console.ForegroundColor = ConsoleColor.Blue;
    Console.WriteLine(BuildString("[SLN]", string.Empty, "Part 2:", result, durationInMs));
    Console.ResetColor();
  }
}