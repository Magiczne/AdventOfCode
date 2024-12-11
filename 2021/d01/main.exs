Code.require_file("2021/framework/framework.exs")

defmodule Aoc.Day01 do
  def reader(filePath) do
    File.stream!(filePath)
    |> Stream.map(&String.trim/1)
    |> Stream.map(&String.to_integer/1)
    |> Enum.to_list()
  end

  def part1(lines) do
    lines
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.count(fn [a, b] -> a < b end)
  end

  def part2(lines) do
    lines
    |> Enum.chunk_every(3, 1, :discard)
    |> Enum.map(&Enum.sum/1)
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.count(fn [a, b] -> a < b end)
  end
end

Aoc.Core.run_examples("01", &Aoc.Day01.reader/1, &Aoc.Day01.part1/1, &Aoc.Day01.part2/1)
Aoc.Core.run_solution("01", &Aoc.Day01.reader/1, &Aoc.Day01.part1/1, &Aoc.Day01.part2/1)
