import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from util.aoc import run_examples, run_solution  # NOQA


def part1(data):
    steps = 0
    idx = 0

    while idx < len(data):
        data[idx] += 1
        idx += data[idx] - 1
        steps += 1

    return steps


def part2(data):
    steps = 0
    idx = 0

    while idx < len(data):
        jump = -1 if data[idx] >= 3 else 1
        data[idx] += jump
        idx += data[idx] - jump
        steps += 1

    return steps


def reader(file: str) -> list[int]:
    return [int(line.strip("\n")) for line in open(file).readlines()]


if __name__ == "__main__":
    run_examples(2017, "05", reader, part1, part2)
    run_solution(2017, "05", reader, part1, part2)
