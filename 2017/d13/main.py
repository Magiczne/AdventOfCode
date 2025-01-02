import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from typing import Dict
from util.aoc import run_examples, run_solution

type Firewall = Dict[int, int]


def reader(file: str) -> Firewall:
    firewall = {}

    with open(file) as f:
        for line in f.readlines():
            depth, size = [int(item) for item in line.split(": ")]
            firewall[depth] = size

    return firewall


def part1(firewall: Firewall) -> int:
    severity = 0

    for depth, size in firewall.items():
        if depth % (2 * (size - 1)) == 0:
            severity += depth * size

    return severity


def part2(firewall: Firewall) -> int:
    delay = 0
    caught = True

    while caught:
        caught = False

        for depth, size in firewall.items():
            if (depth + delay) % (2 * size - 2) == 0:
                caught = True
                delay += 1
                break

    return delay


if __name__ == "__main__":
    run_examples(2017, "13", reader, part1, part2)
    run_solution(2017, "13", reader, part1, part2)
