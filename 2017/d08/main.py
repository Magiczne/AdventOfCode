import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

import operator
from collections import Counter
from typing import NamedTuple
from util.aoc import run_examples, run_solution  # NOQA

Solution = NamedTuple("Solution", [("part1", int), ("part2", int)])


def solve(data: list[str]) -> Solution:
    registers = Counter()
    highest_value = 0

    op_map = {
        "inc": operator.add,
        "dec": operator.sub,
        "==": operator.eq,
        "!=": operator.ne,
        ">": operator.gt,
        ">=": operator.ge,
        "<": operator.lt,
        "<=": operator.le,
    }

    for line in data:
        data, cond = line.split(" if ")
        data_reg, data_op, data_val = data.split()
        cond_reg_name, cond_op, cond_val = cond.split()

        if op_map[cond_op](registers[cond_reg_name], int(cond_val)):
            registers[data_reg] = op_map[data_op](registers[data_reg], int(data_val))

        if registers[data_reg] > highest_value:
            highest_value = registers[data_reg]

    return Solution(part1=max(registers.values()), part2=highest_value)


def part1(data: list[str]) -> int:
    return solve(data).part1


def part2(data: list[str]) -> int:
    return solve(data).part2


def reader(file: str) -> list[str]:
    return open(file).read().splitlines()


if __name__ == "__main__":
    run_examples(2017, "08", reader, part1, part2)
    run_solution(2017, "08", reader, part1, part2)
