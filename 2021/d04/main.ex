Code.require_file("2021/framework/framework.ex")

defmodule Aoc.Day04 do
  def reader(filePath) do
    parts =
      File.read!(filePath)
      |> String.trim()
      |> String.split("\n\n")

    [rawNumbers | rawBoards] = parts

    numbers =
      rawNumbers
      |> String.split(",")
      |> Enum.map(&String.trim/1)
      |> Enum.map(&String.to_integer/1)

    boards =
      rawBoards
      |> Enum.map(&String.trim/1)
      |> Enum.map(&String.split(&1, "\n"))
      |> Enum.map(fn board ->
        board
        |> Enum.map(&String.trim/1)
        |> Enum.map(fn line ->
          String.split(line, ~r/\s+/)
          |> Enum.map(&String.to_integer/1)
        end)
      end)

    {numbers, boards}
  end

  def part1(data) do
    IO.inspect(data)
    0
  end

  def part2(_data) do
    0
  end
end

Aoc.Core.run_examples("04", &Aoc.Day04.reader/1, &Aoc.Day04.part1/1, &Aoc.Day04.part2/1)
# Aoc.Core.run_solution("04", &Aoc.Day04.reader/1, &Aoc.Day04.part1/1, &Aoc.Day04.part2/1)
