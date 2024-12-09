lines = File.stream!("input.txt")
  |> Stream.map(&String.trim/1)
  |> Stream.map(&(String.split(&1, " ", trim: true)))
  |> Stream.map(fn [dir, val] -> [dir, String.to_integer(val)] end)
  |> Enum.to_list

# Part 1
result = lines
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

IO.puts(elem(result, 0) * elem(result, 1))

# Part 2
result = lines
  |> Enum.reduce(
       {0, 0, 0},
       fn line, {position, depth, aim} ->
         case line do
           ["forward", value] -> {position + value, depth + (aim * value), aim}
           ["down", value] -> {position, depth, aim + value}
           ["up", value] -> {position, depth, aim - value}
         end
       end
     )

IO.puts(elem(result, 0) * elem(result, 1))
