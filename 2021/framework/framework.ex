defmodule Aoc.Core do
  def build_string(type, label, part, result, duration) do
    "#{type} #{String.pad_trailing(label, 20, " ")} #{part} #{String.pad_trailing("#{result}", 15, " ")} #{duration}"
  end

  def example_part1(result, test_file_name, duration_in_ms) do
    IO.puts(
      IO.ANSI.yellow() <>
        build_string("[EXM]", "(#{test_file_name})", "Part 1:", result, "#{duration_in_ms}ms")
    )
  end

  def example_part2(result, test_file_name, duration_in_ms) do
    IO.puts(
      IO.ANSI.red() <>
        build_string("[EXM]", "(#{test_file_name})", "Part 1:", result, "#{duration_in_ms}ms")
    )
  end

  def solution_part1(result, duration_in_ms) do
    IO.puts(
      IO.ANSI.green() <> build_string("[SLN]", "", "Part 1:", result, "#{duration_in_ms}ms")
    )
  end

  def solution_part2(result, duration_in_ms) do
    IO.puts(IO.ANSI.blue() <> build_string("[SLN]", "", "Part 1:", result, "#{duration_in_ms}ms"))
  end

  def run_examples(day, reader, part1, part2) do
    directory = "2021/d#{day}/test-runs"

    if File.exists?(directory) do
      File.ls!(directory)
      |> Enum.each(fn file ->
        testData = reader.("#{directory}/#{file}")

        {duration1microSeconds, resultPart1} = :timer.tc(part1, [testData])
        example_part1(resultPart1, file, duration1microSeconds / 1000)

        {duration2microSeconds, resultPart2} = :timer.tc(part2, [testData])
        example_part2(resultPart2, file, duration2microSeconds / 1000)
      end)
    end
  end

  def run_solution(day, reader, part1, part2) do
    filePath = "2021/d#{day}/input.txt"
    data = reader.(filePath)

    {duration1microSeconds, resultPart1} = :timer.tc(part1, [data])
    solution_part1(resultPart1, duration1microSeconds / 1000)

    {duration2microSeconds, resultPart2} = :timer.tc(part2, [data])
    solution_part2(resultPart2, duration2microSeconds / 1000)
  end
end
