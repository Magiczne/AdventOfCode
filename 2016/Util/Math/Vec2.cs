namespace Util.Math;

public class Vec2(int x, int y) : IEquatable<Vec2>
{
  public int X { get; private set; } = x;
  public int Y { get; private set; } = y;

  public bool Equals(Vec2? other)
  {
    return other != null && X == other.X && Y == other.Y;
  }
}