using Util.Aoc;

char[][] keypad =
[
  ['0', '0', '1', '0', '0'],
  ['0', '2', '3', '4', '5'],
  ['5', '6', '7', '8', '9'],
  ['0', 'A', 'B', 'C', '0'],
  ['0', '0', 'D', '0', '0']
];

int lastRow = 1;
int lastColumn = 1;

int ProcessSequenceOneStar(string key)
{
  foreach (var ch in key)
  {
    switch (ch)
    {
      case 'U':
        if (lastRow > 0) lastRow--;
        break;
      case 'D':
        if (lastRow < 2) lastRow++;
        break;
      case 'L':
        if (lastColumn > 0) lastColumn--;
        break;
      case 'R':
        if (lastColumn < 2) lastColumn++;
        break;
      default:
        throw new ArgumentOutOfRangeException();
    }
  }

  return lastRow * 3 + lastColumn + 1;
}

char ProcesSequenceTwoStars(string key)
{
  foreach (var ch in key)
  {
    switch (ch)
    {
      case 'U':
        switch (lastColumn)
        {
          case 1:
          case 3:
            if (lastRow > 1) lastRow--;
            break;
          case 2:
            if (lastRow > 0) lastRow--;
            break;
        }

        break;

      case 'D':
        switch (lastColumn)
        {
          case 1:
          case 3:
            if (lastRow < 3) lastRow++;
            break;

          case 2:
            if (lastRow < 4) lastRow++;
            break;
        }

        break;

      case 'L':
        switch (lastRow)
        {
          case 1:
          case 3:
            if (lastColumn > 1) lastColumn--;
            break;

          case 2:
            if (lastColumn > 0) lastColumn--;
            break;
        }

        break;

      case 'R':
        switch (lastRow)
        {
          case 1:
          case 3:
            if (lastColumn < 3) lastColumn++;
            break;

          case 2:
            if (lastColumn < 4) lastColumn++;
            break;
        }

        break;

      default:
        throw new ArgumentOutOfRangeException();
    }
  }

  return keypad[lastRow][lastColumn];
}

string Part1(string[] keys)
{
  var ret = string.Empty;

  lastRow = 1;
  lastColumn = 1;

  foreach (var key in keys)
  {
    ret += ProcessSequenceOneStar(key);
  }

  return ret;
}

string Part2(string[] keys)
{
  var ret = string.Empty;

  lastRow = 2;
  lastColumn = 0;

  foreach (var key in keys)
  {
    ret += ProcesSequenceTwoStars(key);
  }

  return ret;
}

string[] Reader(string file)
{
  return File.ReadAllLines(file);
}

Solver.RunExamples(2016, "02", Reader, Part1, Part2);
Solver.RunSolution(2016, "02", Reader, Part1, Part2);