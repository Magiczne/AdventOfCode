Code.require_file("2021/framework/framework.exs")

defmodule Aoc.Day02 do
  def reader(filePath) do
    File.stream!(filePath)
    |> Stream.map(&String.trim/1)
    |> Stream.map(&String.split(&1, " ", trim: true))
    |> Stream.map(fn [dir, val] -> [dir, String.to_integer(val)] end)
    |> Enum.to_list()
  end

  def part1(lines) do
    result =
      lines
      |> Enum.reduce(
        {0, 0},
        fn line, {position, depth} ->
          case line do
            ["forward", value] -> {position + value, depth}
            ["down", value] -> {position, depth + value}
            ["up", value] -> {position, depth - value}
          end
        end
      )

    elem(result, 0) * elem(result, 1)
  end

  def part2(lines) do
    result =
      lines
      |> Enum.reduce(
        {0, 0, 0},
        fn line, {position, depth, aim} ->
          case line do
            ["forward", value] -> {position + value, depth + aim * value, aim}
            ["down", value] -> {position, depth, aim + value}
            ["up", value] -> {position, depth, aim - value}
          end
        end
      )

    elem(result, 0) * elem(result, 1)
  end
end

Aoc.Core.run_examples("02", &Aoc.Day02.reader/1, &Aoc.Day02.part1/1, &Aoc.Day02.part2/1)
Aoc.Core.run_solution("02", &Aoc.Day02.reader/1, &Aoc.Day02.part1/1, &Aoc.Day02.part2/1)
