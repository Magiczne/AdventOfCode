import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

import re
from util.aoc import run_examples, run_solution  # NOQA


def part1(data: str) -> int:
    data = re.sub("(?:<>|<.*?[^!]>)", "", data)

    score = 0
    depth = 0

    for c in data:
        if c == "{":
            depth += 1
            score += depth
        elif c == "}":
            depth -= 1

    return score


def part2(data: str) -> int:
    removed = re.findall("(?:<>|<.*?[^!]>)", data)

    garbage = 0
    for i in removed:
        cancelled = "".join(re.findall("!.", i))
        cnt = len(i) - len(cancelled) - 2
        garbage += cnt

    return garbage


def reader(file: str) -> str:
    return open(file).read().replace("!!", "")


if __name__ == "__main__":
    run_examples(2017, "09", reader, part1, part2)
    run_solution(2017, "09", reader, part1, part2)
