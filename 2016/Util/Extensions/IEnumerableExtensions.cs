namespace Util.Extensions;

public static class IEnumerableExtensions
{
  public static IEnumerable<T> RotateLeft<T>(this IEnumerable<T> enumerable, int offset)
  {
    var list = enumerable as T[] ?? [.. enumerable];

    return [.. list.Skip(offset), .. list.Take(offset)];
  }
}