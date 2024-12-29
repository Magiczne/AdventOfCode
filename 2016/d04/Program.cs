using Aoc.Day04;
using Util.Aoc;

int Part1(IEnumerable<Room> rooms)
{
  return rooms.Where(room => room.IsValid).Sum(room => room.SectorId);
}

int Part2(IEnumerable<Room> rooms)
{
  var ret = string.Empty;

  foreach (var room in rooms)
  {
    if (room.DecryptedName.Contains("north"))
    {
      return room.SectorId;
    }
  }

  return -1;
}

IEnumerable<Room> Reader(string file)
{
  return File.ReadAllLines(file).Select(line => { return new Room(line); });
}

Solver.RunExamples(2016, "04", Reader, Part1, Part2);
Solver.RunSolution(2016, "04", Reader, Part1, Part2);