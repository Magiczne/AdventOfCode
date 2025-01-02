import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from dataclasses import dataclass
from util.aoc import run_examples, run_solution


@dataclass
class Instruction:
    type: str
    op1: int | str
    op2: int | str | None = None

    def process(self, programs: str) -> str:
        if self.type == "s":
            return programs[-self.op1 :] + programs[: -self.op1]

        if self.type == "x":
            copy = list(programs)
            copy[self.op1], copy[self.op2] = copy[self.op2], copy[self.op1]

            return "".join(copy)

        if self.type == "p":
            copy = list(programs)
            op1_index = programs.index(self.op1)
            op2_index = programs.index(self.op2)
            copy[op1_index], copy[op2_index] = copy[op2_index], copy[op1_index]

            return "".join(copy)

        raise Exception(f"WTF: {self.type}")


def reader(file: str) -> list[Instruction]:
    raw_instructions = open(file).read().strip().split(",")
    instructions = []

    for raw_instruction in raw_instructions:
        if raw_instruction[0] == "s":
            instructions.append(Instruction(type="s", op1=int(raw_instruction[1:])))
        elif raw_instruction[0] == "x":
            op1, op2 = raw_instruction[1:].split("/")
            instructions.append(Instruction(type="x", op1=int(op1), op2=int(op2)))
        elif raw_instruction[0] == "p":
            op1, op2 = raw_instruction[1:].split("/")
            instructions.append(Instruction(type="p", op1=op1, op2=op2))
        else:
            raise Exception(f"WTF: {raw_instruction}")

    return instructions


def part1(instructions: list[Instruction]) -> int:
    programs = "abcdefghijklmnop"

    for instruction in instructions:
        programs = instruction.process(programs)

    return "".join(programs)


def part2(instructions: list[Instruction]) -> int:
    programs = "abcdefghijklmnop"
    cycle = [programs]

    # It has to be cyclic...
    for i in range(1, 1_000_000_000):
        for instruction in instructions:
            programs = instruction.process(programs)

        if programs == "abcdefghijklmnop":
            return "".join(cycle[1_000_000_000 % i])

        cycle.append(programs)

    return "".join(programs)


if __name__ == "__main__":
    run_examples(2017, "16", reader, part1, part2)
    run_solution(2017, "16", reader, part1, part2)
