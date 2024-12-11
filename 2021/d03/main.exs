Code.require_file("2021/framework/framework.exs")

defmodule Aoc.Day03.Utils do
  def more_frequent(frequencies) do
    cond do
      frequencies[0] == nil ->
        "1"

      frequencies[1] == nil ->
        "0"

      frequencies[0] > frequencies[1] ->
        "0"

      true ->
        "1"
    end
  end

  def less_frequent(frequencies) do
    cond do
      frequencies[0] == nil ->
        "1"

      frequencies[1] == nil ->
        "0"

      frequencies[0] > frequencies[1] ->
        "1"

      true ->
        "0"
    end
  end

  def most_frequent_at(data, position) do
    data
    |> Enum.map(fn line -> String.at(line, position) end)
    |> Enum.map(fn char -> String.to_integer(char) end)
    |> Enum.frequencies()
    |> Aoc.Day03.Utils.more_frequent()
  end

  def least_frequent_at(data, position) do
    data
    |> Enum.map(fn line -> String.at(line, position) end)
    |> Enum.map(fn char -> String.to_integer(char) end)
    |> Enum.frequencies()
    |> Aoc.Day03.Utils.less_frequent()
  end

  def filter_by_char(data, char, position) do
    data
    |> Enum.filter(fn line -> String.at(line, position) == char end)
  end

  def filter_by_freq(data, position, line_length, comparison_fn) do
    if position > line_length do
      data
    else
      char = comparison_fn.(data, position)

      data
      |> Aoc.Day03.Utils.filter_by_char(char, position)
      |> Aoc.Day03.Utils.filter_by_freq(position + 1, line_length, comparison_fn)
    end
  end
end

defmodule Aoc.Day03 do
  def reader(filePath) do
    File.stream!(filePath)
    |> Stream.map(&String.trim/1)
    |> Enum.to_list()
  end

  def part1(lines) do
    line_length =
      List.first(lines)
      |> String.length()

    binary_frequencies =
      for i <- 0..(line_length - 1) do
        lines
        |> Enum.map(fn line -> String.at(line, i) end)
        |> Enum.map(fn char -> String.to_integer(char) end)
        |> Enum.frequencies()
      end

    gamma_rate =
      binary_frequencies
      |> Enum.map(fn tuple -> Aoc.Day03.Utils.more_frequent(tuple) end)
      |> Enum.join()
      |> String.to_integer(2)

    epsilon =
      binary_frequencies
      |> Enum.map(fn tuple -> Aoc.Day03.Utils.less_frequent(tuple) end)
      |> Enum.join()
      |> String.to_integer(2)

    gamma_rate * epsilon
  end

  def part2(lines) do
    line_length =
      List.first(lines)
      |> String.length()

    oxygen_rating =
      Aoc.Day03.Utils.filter_by_freq(
        lines,
        0,
        line_length - 1,
        &Aoc.Day03.Utils.most_frequent_at/2
      )
      |> List.first()
      |> String.to_integer(2)

    co2_subscriber_rating =
      Aoc.Day03.Utils.filter_by_freq(
        lines,
        0,
        line_length - 1,
        &Aoc.Day03.Utils.least_frequent_at/2
      )
      |> List.first()
      |> String.to_integer(2)

    oxygen_rating * co2_subscriber_rating
  end
end

Aoc.Core.run_solution("03", &Aoc.Day03.reader/1, &Aoc.Day03.part1/1, &Aoc.Day03.part2/1)
