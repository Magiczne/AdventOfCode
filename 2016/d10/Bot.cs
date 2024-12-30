using System.Diagnostics;

namespace Aoc.Day10;

partial class Solution
{
  class Bot
  {
    private readonly int?[] _chips = [null, null];

    public Bot(int id, int high, int low, bool highOutput, bool lowOutput)
    {
      Id = id;
      High = high;
      Low = low;
      HighOutput = highOutput;
      LowOutput = lowOutput;
    }

    public int Id { get; }

    private int High { get; }
    private int Low { get; }

    private bool HighOutput { get; }
    private bool LowOutput { get; }

    public void GiveChip(int chip)
    {
      if (!_chips[0].HasValue) _chips[0] = chip;
      else if (!_chips[1].HasValue) _chips[1] = chip;
    }

    public void Process(bool throwIfSolutionFound)
    {
      if (!_chips[0].HasValue || !_chips[1].HasValue)
      {
        return;
      }

      //One Star
      if (throwIfSolutionFound && _chips.Contains(61) && _chips.Contains(17))
      {
        throw new UnauthorizedAccessException(Id.ToString());
      }

      int high;
      int low;

      if (_chips[0] > _chips[1])
      {
        high = _chips[0]!.Value;
        low = _chips[1]!.Value;
      }
      else
      {
        high = _chips[1]!.Value;
        low = _chips[0]!.Value;
      }

      _chips[0] = null;
      _chips[1] = null;

      if (HighOutput)
      {
        Outputs[High] = high;
      }
      else
      {
        var highBot = Bots.Find(b => b.Id == High);

        Debug.Assert(highBot != null);

        highBot.GiveChip(high);
        highBot.Process(throwIfSolutionFound);
      }

      if (LowOutput)
      {
        Outputs[Low] = low;
      }
      else
      {
        var lowBot = Bots.Find(b => b.Id == Low);
        Debug.Assert(lowBot != null);

        lowBot.GiveChip(low);
        lowBot.Process(throwIfSolutionFound);
      }
    }
  }
}