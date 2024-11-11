using System;
using System.Collections.Generic;
using System.IO;

namespace Day_2
{
    internal static class Program
    {
        private static readonly List<string> Data = new List<string>();
        private static readonly char[][] Keypad =
        {
            new []{'0', '0', '1', '0', '0'},
            new []{'0', '2', '3', '4', '5'},
            new []{'5', '6', '7', '8', '9'},
            new []{'0', 'A', 'B', 'C', '0'},
            new []{'0', '0', 'D', '0', '0'}
        };

        private static int _lastRow = 1;
        private static int _lastColumn = 1;

        private static void Main()
        {
            Console.WriteLine("Answers: ");
            Console.Write("*: ");
            foreach (var key in File.ReadAllLines("../../input.txt"))
            {
                Data.Add(key);
                Console.Write(ProcessSequenceOneStar(key));
            }
            Console.WriteLine();

            _lastRow = 2;
            _lastColumn = 0;

            Console.Write("**: ");
            foreach (var key in Data)
            {
                Console.Write(ProcesSequenceTwoStars(key));
            }

            Console.Read();
        }

        private static int ProcessSequenceOneStar(string key)
        {
            foreach (var ch in key)
            {
                switch (ch)
                {
                    case 'U':
                        if (_lastRow > 0) _lastRow--;
                        break;
                    case 'D':
                        if (_lastRow < 2) _lastRow++;
                        break;
                    case 'L':
                        if (_lastColumn > 0) _lastColumn--;
                        break;
                    case 'R':
                        if (_lastColumn < 2) _lastColumn++;
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }

            return _lastRow * 3 + _lastColumn + 1;
        }

        private static char ProcesSequenceTwoStars(string key)
        {
            foreach (var ch in key)
            {
                switch (ch)
                {
                    case 'U':
                        switch (_lastColumn)
                        {
                            case 1:
                            case 3:
                                if (_lastRow > 1) _lastRow--;
                                break;
                            case 2:
                                if (_lastRow > 0) _lastRow--;
                                break;
                        }
                        break;

                    case 'D':
                        switch (_lastColumn)
                        {
                            case 1:
                            case 3:
                                if (_lastRow < 3) _lastRow++;
                                break;

                            case 2:
                                if (_lastRow < 4) _lastRow++;
                                break;
                        }
                        break;

                    case 'L':
                        switch (_lastRow)
                        {
                            case 1:
                            case 3:
                                if (_lastColumn > 1) _lastColumn--;
                                break;

                            case 2:
                                if (_lastColumn > 0) _lastColumn--;
                                break;
                        }
                        break;

                    case 'R':
                        switch (_lastRow)
                        {
                            case 1:
                            case 3:
                                if (_lastColumn < 3) _lastColumn++;
                                break;

                            case 2:
                                if (_lastColumn < 4) _lastColumn++;
                                break;
                        }
                        break;

                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }

            return Keypad[_lastRow][_lastColumn];
        }
    }
}