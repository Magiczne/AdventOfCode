using System;
using System.Linq;

namespace Day_10
{
    internal partial class Solution
    {
        private class Bot
        {
            private readonly int?[] _chips = {null, null};

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

            public void Process()
            {
                if (!_chips[0].HasValue || !_chips[1].HasValue) return;

                //One Star
                if (_chips.Contains(61) && _chips.Contains(17))
                    Console.WriteLine("*: Bot " + Id);

                int high;
                int low;

                if (_chips[0] > _chips[1])
                {
                    high = _chips[0].Value;
                    low = _chips[1].Value;
                }
                else
                {
                    high = _chips[1].Value;
                    low = _chips[0].Value;
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
                    highBot.GiveChip(high);
                    highBot.Process();
                }

                if (LowOutput)
                {
                    Outputs[Low] = low;
                }
                else
                {
                    var lowBot = Bots.Find(b => b.Id == Low);
                    lowBot.GiveChip(low);
                    lowBot.Process();
                }
            }
        }
    }
}