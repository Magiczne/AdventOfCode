import inspect
import itertools
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from util.aoc import run_examples, run_solution  # NOQA


def part1(data: list[list[int]]) -> int:
    return sum([max(line) - min(line) for line in data])


def part2(data: list[list[int]]) -> int:
    s = 0

    for line in data:
        for comb in itertools.combinations(line, 2):
            tmp = sorted(comb)

            if tmp[1] % tmp[0] == 0:
                s += tmp[1] // tmp[0]
                continue

    return s


def reader(file: str) -> list[list[int]]:
    return [[int(item) for item in line.strip("\n").split("\t")] for line in open(file).readlines()]


if __name__ == "__main__":
    run_examples(2017, "02", reader, part1, part2)
    run_solution(2017, "02", reader, part1, part2)
