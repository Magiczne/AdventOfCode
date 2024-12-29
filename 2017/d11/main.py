import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from util.aoc import run_examples, run_solution  # NOQA


def main():
    data = [d for d in open("input.txt").read().strip().split(",")]

    x = 0
    y = 0
    current_max = 0

    for d in data:
        if d == "n":
            y += 1
        elif d == "nw":
            x -= 1
            y += 1
        elif d == "ne":
            x += 1
        elif d == "s":
            y -= 1
        elif d == "sw":
            x -= 1
        elif d == "se":
            x += 1
            y -= 1

        if x + y > current_max:
            current_max = x + y

    print("Part 1: ", x + y)
    print("Part 2: ", current_max)


def part1(data: list[str]) -> int:
    x = 0
    y = 0

    for d in data:
        if d == "n":
            y += 1
        elif d == "nw":
            x -= 1
            y += 1
        elif d == "ne":
            x += 1
        elif d == "s":
            y -= 1
        elif d == "sw":
            x -= 1
        elif d == "se":
            x += 1
            y -= 1

    return x + y


def part2(data: list[str]) -> int:
    x = 0
    y = 0
    current_max = 0

    for d in data:
        if d == "n":
            y += 1
        elif d == "nw":
            x -= 1
            y += 1
        elif d == "ne":
            x += 1
        elif d == "s":
            y -= 1
        elif d == "sw":
            x -= 1
        elif d == "se":
            x += 1
            y -= 1

        if x + y > current_max:
            current_max = x + y

    return current_max


def reader(file: str) -> list[str]:
    return [d for d in open(file).read().strip().split(",")]


if __name__ == "__main__":
    run_examples(2017, "11", reader, part1, part2)
    run_solution(2017, "11", reader, part1, part2)
