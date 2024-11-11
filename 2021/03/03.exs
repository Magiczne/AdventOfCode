use Bitwise

lines = File.stream!("input.txt")
  |> Stream.map(&String.trim/1)
  |> Enum.to_list

# Utilities
defmodule Utils do
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
      |> Enum.frequencies
      |> Utils.more_frequent
  end

  def least_frequent_at(data, position) do
    data
    |> Enum.map(fn line -> String.at(line, position) end)
    |> Enum.map(fn char -> String.to_integer(char) end)
    |> Enum.frequencies
    |> Utils.less_frequent
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
        |> Utils.filter_by_char(char, position)
        |> Utils.filter_by_freq(position + 1, line_length, comparison_fn)
    end
  end
end

# Part 1
line_length = List.first(lines)
  |> String.length

binary_frequencies =
  for i <- 0..(line_length - 1) do
    lines
      |> Enum.map(fn line -> String.at(line, i) end)
      |> Enum.map(fn char -> String.to_integer(char) end)
      |> Enum.frequencies
  end

gamma_rate = binary_frequencies
  |> Enum.map(fn tuple -> Utils.more_frequent(tuple) end)
  |> Enum.join
  |> String.to_integer(2)

epsilon = binary_frequencies
  |> Enum.map(fn tuple -> Utils.less_frequent(tuple) end)
  |> Enum.join
  |> String.to_integer(2)

power_consumption = gamma_rate * epsilon

IO.puts("---- PART 1 ----")
IO.puts("Gamma rate: #{gamma_rate}")
IO.puts("Epsilon: #{epsilon}")
IO.puts("Power consumption: #{power_consumption}")

# Part 2
oxygen_rating = Utils.filter_by_freq(lines, 0, line_length - 1, &Utils.most_frequent_at/2)
  |> List.first
  |> String.to_integer(2)

co2_subscriber_rating = Utils.filter_by_freq(lines, 0, line_length - 1, &Utils.least_frequent_at/2)
  |> List.first
  |> String.to_integer(2)

life_support_rating = oxygen_rating * co2_subscriber_rating

IO.puts("\n---- PART 2 ----")
IO.puts("O2 rating: #{oxygen_rating}")
IO.puts("C02 rating: #{co2_subscriber_rating}")
IO.puts("Life support rating: #{life_support_rating}")


