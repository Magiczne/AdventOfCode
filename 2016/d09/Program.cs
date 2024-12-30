using Util.Aoc;

long Decompress(string input, bool twoStars)
{
  long output = 0;
  var i = 0;

  while (i < input.Length)
  {
    var ch = input[i];
    i++;

    if (ch != '(')
    {
      output++;
      continue;
    }

    // First param of the marker
    var tmp = new string(input.Skip(i).TakeWhile(c => c != 'x').ToArray());
    var repetitionLength = int.Parse(tmp);
    i += tmp.Length + 1;


    // Second param of the marker
    tmp = new string(input.Skip(i).TakeWhile(c => c != ')').ToArray());
    var repetitionCount = int.Parse(tmp);
    i += tmp.Length + 1;

    if (twoStars)
    {
      var data = Decompress(input.Substring(i, repetitionLength), true);
      output += data * repetitionCount;
    }
    else
    {
      var data = input.Substring(i, repetitionLength);
      output += data.Length * repetitionCount;
    }

    i += repetitionLength;
  }

  return output;
}

long Part1(string data)
{
  return Decompress(data, false);
}

long Part2(string data)
{
  return Decompress(data, true);
}

string Reader(string file)
{
  return File.ReadAllText(file).Trim();
}

Solver.RunExamples(2016, "09", Reader, Part1, Part2);
Solver.RunSolution(2016, "09", Reader, Part1, Part2);