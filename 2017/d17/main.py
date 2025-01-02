import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from collections import deque

from tqdm import tqdm
from util.aoc import run_examples, run_solution


def reader(file: str) -> int:
    with open(file) as f:
        return int(f.read().strip())


def part1(steps: int) -> int:
    buffer = deque([0])

    for i in range(1, 2018):
        buffer.rotate(steps * -1)
        buffer.append(i)

    return buffer[0]


def part2_brute_force(steps: int) -> int:
    """About 30s of running time"""
    buffer = deque([0])

    for i in tqdm(range(1, 50_000_000 + 1)):
        buffer.rotate(steps * -1)
        buffer.append(i)

    return buffer[1]


def part2_smart(steps: int) -> int:
    """About 3s of running time"""
    position = 0
    value_after_zero = -1

    # 0 is always at position 0, so we only need to check changes in position 1
    for t in tqdm(range(1, 50_000_000 + 1)):
        position = (position + steps) % t + 1
        if position == 1:
            value_after_zero = t

    return value_after_zero


if __name__ == "__main__":
    run_examples(2017, "17", reader, part1, part2_brute_force)
    run_solution(2017, "17", reader, part1, part2_brute_force)
