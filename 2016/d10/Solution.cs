using System.Diagnostics;
using System.Text.RegularExpressions;

namespace Aoc.Day10;

partial class Solution(List<string> data)
{
  private static readonly List<Bot> Bots = [];
  private static readonly Dictionary<int, int> Outputs = [];
  private readonly List<string> _data = data;

  public string OneStar()
  {
    var regex =
      new Regex(
        @"value (?<val>\d+) goes to bot (?<bot>\d+)|bot (?<s_bot>\d+) gives low to (?<low_to>bot|output) (?<low_value>\d+) and high to (?<high_to>bot|output) (?<high_value>\d+)");

    foreach (var line in _data)
    {
      var match = regex.Match(line);

      //bot x gives low to ...
      if (match.Groups["s_bot"].Success)
      {
        var id = int.Parse(match.Groups["s_bot"].ToString());
        var high = int.Parse(match.Groups["high_value"].ToString());
        var low = int.Parse(match.Groups["low_value"].ToString());
        var highOutput = match.Groups["high_to"].ToString() == "output";
        var lowOutput = match.Groups["low_to"].ToString() == "output";

        var bot = new Bot(id, high, low, highOutput, lowOutput);
        Bots.Add(bot);
      }
      //value x goes to bot y
      else
      {
        var val = int.Parse(match.Groups["val"].ToString());
        var id = int.Parse(match.Groups["bot"].ToString());

        var bot = Bots.Find(b => b.Id == id);
        Debug.Assert(bot != null);

        bot.GiveChip(val);

        try
        {
          bot.Process(true);
        }
        catch (UnauthorizedAccessException e)
        {
          return e.Message;
        }
      }
    }

    return "oops";
  }

  public int TwoStars()
  {
    var regex =
      new Regex(
        @"value (?<val>\d+) goes to bot (?<bot>\d+)|bot (?<s_bot>\d+) gives low to (?<low_to>bot|output) (?<low_value>\d+) and high to (?<high_to>bot|output) (?<high_value>\d+)");

    foreach (var line in _data)
    {
      var match = regex.Match(line);

      //bot x gives low to ...
      if (match.Groups["s_bot"].Success)
      {
        var id = int.Parse(match.Groups["s_bot"].ToString());
        var high = int.Parse(match.Groups["high_value"].ToString());
        var low = int.Parse(match.Groups["low_value"].ToString());
        var highOutput = match.Groups["high_to"].ToString() == "output";
        var lowOutput = match.Groups["low_to"].ToString() == "output";

        var bot = new Bot(id, high, low, highOutput, lowOutput);
        Bots.Add(bot);
      }
      //value x goes to bot y
      else
      {
        var val = int.Parse(match.Groups["val"].ToString());
        var id = int.Parse(match.Groups["bot"].ToString());

        var bot = Bots.Find(b => b.Id == id);
        Debug.Assert(bot != null);

        bot.GiveChip(val);
        bot.Process(false);
      }
    }

    return Outputs[0] * Outputs[1] * Outputs[2];
  }
}