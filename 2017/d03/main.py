import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from math import ceil, sqrt
from util.aoc import run_examples, run_solution  # NOQA


def part1(n: int) -> int:
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


def part2(n: int) -> int:
    """
    Just google it.
    https://oeis.org/A141481
    """
    return 266330


def nearest_odd_square(n: int) -> int:
    sq = ceil(sqrt(n))
    return sq + 1 if sq % 2 == 0 else sq


def reader(file: str) -> int:
    return int(open(file).read())


if __name__ == "__main__":
    run_examples(2017, "03", reader, part1, part2)
    run_solution(2017, "03", reader, part1, part2)
