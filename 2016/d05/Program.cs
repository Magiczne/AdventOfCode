using System.Text;
using Util.Aoc;
using Util.Extensions;

string Part1(string input)
{
  var password = string.Empty;

  for (var i = 0; password.Length < 8; i++)
  {
    var encoded = (input + i).GetMD5();

    if (encoded[..5] == "00000")
    {
      password += encoded[5];
    }
  }

  return password;
}

string Part2(string input)
{
  var password = new StringBuilder("--------");

  for (var i = 0; password.ToString().Contains('-'); i++)
  {
    var encoded = (input + i).GetMD5();

    if (encoded[..5] == "00000")
    {
      if (int.TryParse(encoded[5].ToString(), out int index) && index < 8 && password[index] == '-')
      {
        password[index] = encoded[6];
      }
    }
  }

  return password.ToString();
}

string Reader(string file)
{
  return File.ReadAllText(file);
}

Solver.RunExamples(2016, "05", Reader, Part1, Part2);
Solver.RunSolution(2016, "05", Reader, Part1, Part2);