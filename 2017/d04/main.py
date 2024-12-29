import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from util.aoc import run_examples, run_solution  # NOQA


def part1(data: list[list[str]]):
    return sum(len(set(line)) == len(line) for line in data)


def part2(data: list[list[str]]):
    return sum(len(set(line)) == len(line) for line in [["".join(sorted(item)) for item in line] for line in data])


def reader(file: str) -> list[list[str]]:
    return [line.strip("\n").split(" ") for line in open(file).readlines()]


if __name__ == "__main__":
    run_examples(2017, "04", reader, part1, part2)
    run_solution(2017, "04", reader, part1, part2)
