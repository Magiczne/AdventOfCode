using Aoc.Day07;
using Util.Aoc;

int Part1(List<IpAddressV7> ips)
{
  return ips.Count(ip => ip.SupportsTls);
}

int Part2(List<IpAddressV7> ips)
{
  return ips.Count(ip => ip.SupportsSsl);
}

List<IpAddressV7> Reader(string file)
{
  return File.ReadAllLines(file).Select(line => new IpAddressV7(line)).ToList();
}

Solver.RunExamples(2016, "07", Reader, Part1, Part2);
Solver.RunSolution(2016, "07", Reader, Part1, Part2);