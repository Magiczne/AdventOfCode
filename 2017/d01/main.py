import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from util.aoc import run_examples, run_solution  # NOQA


def calc(data: list[str], distance: int) -> int:
    data_sum = 0

    for i in range(len(data)):
        if data[i] == data[(i + distance) % len(data)]:
            data_sum += int(data[i])

    return data_sum


def reader(file: str) -> list[str]:
    return list(open(file).read())


def part1(data: list[str]) -> int:
    return calc(data, 1)


def part2(data: list[str]) -> int:
    return calc(data, len(data) // 2)


if __name__ == "__main__":
    run_examples(2017, "01", reader, part1, part2)
    run_solution(2017, "01", reader, part1, part2)
