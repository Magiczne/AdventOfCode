using System.Collections.Generic;
using System.Linq;

namespace Day_8
{
    internal static class Extensions
    {
        public static T[] RotateLeft<T>(this IEnumerable<T> list, int offset)
        {
            var enumerable = list as T[] ?? list.ToArray();
            return enumerable.Skip(offset).Concat(enumerable.Take(offset)).ToArray();
        }
    }
}
