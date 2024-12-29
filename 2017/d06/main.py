import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from util.aoc import run_examples, run_solution  # NOQA


def solve(banks: list[int]):
    history = []

    while True:
        if tuple(banks) in history:
            return {
                "Part 1": len(history),
                "Part 2": len(history) - history.index(tuple(banks)),
            }

        history.append(tuple(banks))

        redistribution = max(banks)
        r_idx = banks.index(redistribution)

        banks[r_idx] = 0

        while redistribution > 0:
            r_idx += 1
            banks[r_idx % len(banks)] += 1
            redistribution -= 1


def part1(banks: list[int]) -> int:
    return solve(banks)["Part 1"]


def part2(banks: list[int]) -> int:
    return solve(banks)["Part 2"]


def reader(file: str) -> list[int]:
    return [int(i) for i in open(file).read().strip().split("\t")]


if __name__ == "__main__":
    run_examples(2017, "06", reader, part1, part2)
    run_solution(2017, "06", reader, part1, part2)
