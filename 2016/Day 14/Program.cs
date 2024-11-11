using System;
using System.Collections.Generic;
using System.Linq;

namespace Day_14
{
    internal static class Program
    {
        private static void Main()
        {
            Console.WriteLine("Answers: ");
            var solution = new Solution();
            solution.Solve();
            solution.TwoStars();

            Console.Read();
        }
    }

    internal class Solution
    {
        private const string Input = "cuanljph";
        
        private readonly Dictionary<int, string> _checksumCache = new Dictionary<int, string>();
        private readonly Dictionary<int, string> _strechedCache = new Dictionary<int, string>();
        private readonly List<string> _foundKeys = new List<string>();

        public void Solve()
        {
            for (var i = 0; _foundKeys.Count < 64; i++)
            {
                var md5 = HashOrCache(i);

                char tripleMaker;

                if (md5.HasTriple(out tripleMaker))
                {
                    for (var j = i + 1; j < i + 1000; j++)
                    {
                        var hash = HashOrCache(j);

                        if (hash.HasQuintuple(tripleMaker))
                        {
                            _foundKeys.Add(md5);
                            break;
                        }
                    }
                }
            }

            var p = _checksumCache.First(pair => pair.Value == _foundKeys.Last());
            Console.WriteLine("*: " + p.Key);
        }

        public void TwoStars()
        {
            _foundKeys.Clear();

            for (var i = 0; _foundKeys.Count < 64; i++)
            {
                var md5 = StrechedHash(i);

                char tripleMaker;

                if (md5.HasTriple(out tripleMaker))
                {
                    for (var j = i + 1; j < i + 1000; j++)
                    {
                        var hash = StrechedHash(j);

                        if (hash.HasQuintuple(tripleMaker))
                        {
                            _foundKeys.Add(md5);
                            break;
                        }
                    }
                }
            }

            var p = _strechedCache.First(pair => pair.Value == _foundKeys.Last());
            Console.WriteLine("**: " + p.Key);
        }

        private string HashOrCache(int index)
        {
            if (_checksumCache.ContainsKey(index))
            {
                return _checksumCache[index];
            }

            _checksumCache[index] = Util.HashMd5(Input + index).ToLower();
            return _checksumCache[index];
        }

        private string StrechedHash(int index)
        {
            if (_strechedCache.ContainsKey(index))
            {
                return _strechedCache[index];
            }

            var hash = HashOrCache(index);

            for (var i = 0; i < 2016; i++)
            {
                hash = Util.HashMd5(hash).ToLower();
            }

            _strechedCache[index] = hash.ToLower();

            return _strechedCache[index];
        }
    }
}
