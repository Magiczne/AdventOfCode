from math import ceil, sqrt


def main():
    inp = 265149
    print(part1(inp))
    print(part2())


def part1(n):
    # Calculate the side length of the square
    side_length = nearest_odd_square(n)

    # Get the y distance, which is the number of the square we are currently on
    distance_y = (side_length - 1) / 2

    # Index in the current square starting from the nearest left diagonal
    square_idx = n - ((side_length - 2) ** 2)

    # Offset from the side of the square
    offset = square_idx % (side_length - 1)

    # Get the x distance, which is offset from the offset from the side minus the "radius" of the square we are
    # currently on, which equals to the distance y
    distance_x = abs(offset - distance_y)

    return distance_x + distance_y


def part2():
    """
        Just google it.
        https://oeis.org/A141481
    """
    return 266330


def nearest_odd_square(n):
    sq = ceil(sqrt(n))
    return sq + 1 if sq % 2 == 0 else sq


if __name__ == '__main__':
    main()
