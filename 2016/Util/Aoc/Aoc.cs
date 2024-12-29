namespace Util.Aoc;

public class Aoc
{
    public static readonly string RootDirectory = Path.Combine(
        Path.GetDirectoryName(AppContext.BaseDirectory) ?? string.Empty,
        "../../../../../"
    );
}