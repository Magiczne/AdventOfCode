using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Day_7
{
    internal class IpAddressV7
    {
        private readonly List<string> _sequences = new List<string>();
        private readonly List<string> _hypernetSequences = new List<string>();

        public bool SupportsTls
        {
            get
            {
                return !_hypernetSequences.Any(seq => seq.HasAbba()) && _sequences.Any(seq => seq.HasAbba());
            }
        }

        public bool SupportsSsl
        {
            get
            {
                var abaList = new List<string>();

                foreach (var seq in _sequences)
                {
                    abaList.AddRange(seq.GetAbaList());
                }

                return _hypernetSequences.Any(seq => abaList.Any(seq.HasBab));
            }
        }

        public IpAddressV7(string line)
        {
            line = line.Trim();

            var regex = new Regex(@"([a-z]+)(?:[[]([a-z]+)[]])?");

            var matches = regex.Matches(line);

            foreach(Match match in matches)
            {
                for(var i = 1; i < match.Groups.Count; i++)
                {
                    if (match.Groups[i].ToString() == string.Empty) continue;

                    if(i % 2 == 1)
                    {
                        _sequences.Add(match.Groups[i].ToString());
                    }
                    else
                    {
                        _hypernetSequences.Add(match.Groups[i].ToString());
                    }
                }
            }
        }
    }
}