lines = File.stream!("input.txt")
  |> Stream.map(&String.trim/1)
  |> Stream.map(&String.to_integer/1)
  |> Enum.to_list

# Part 1
count = lines
  |> Enum.chunk_every(2, 1, :discard)
  |> Enum.count(fn [a, b] -> a < b end)

IO.puts("Part 1: #{count}")

# Part 2
count = lines
  |> Enum.chunk_every(3, 1, :discard)
  |> Enum.map(&Enum.sum/1)
  |> Enum.chunk_every(2, 1, :discard)
  |> Enum.count(fn [a, b] -> a < b end)

IO.puts("Part 2: #{count}")
