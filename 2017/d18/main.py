import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from collections import defaultdict
from d18.cpu import CPU
from d18.instruction import Instruction
from util.aoc import run_examples, run_solution


def reader(file: str) -> list[Instruction]:
    with open(file) as f:
        instructions = []

        for line in f.readlines():
            raw_instruction = line.strip().split(" ")
            if len(raw_instruction) == 2:
                instructions.append(Instruction(raw_instruction[0], raw_instruction[1], None))
            else:
                instructions.append(Instruction(raw_instruction[0], raw_instruction[1], raw_instruction[2]))

        return instructions


def part1(instructions: list[Instruction]) -> int:
    registers = defaultdict(int)
    program_counter = 0
    last_frequency = 0

    def get_operand_value(operand: str) -> int:
        if operand.lstrip("-").isnumeric():
            return int(operand)

        return registers[operand]

    while 0 <= program_counter < len(instructions):
        instruction = instructions[program_counter]

        if instruction.type == "snd":
            last_frequency = get_operand_value(instruction.op1)
            program_counter += 1
        elif instruction.type == "set":
            registers[instruction.op1] = get_operand_value(instruction.op2)
            program_counter += 1
        elif instruction.type == "add":
            registers[instruction.op1] += get_operand_value(instruction.op2)
            program_counter += 1
        elif instruction.type == "mul":
            registers[instruction.op1] *= get_operand_value(instruction.op2)
            program_counter += 1
        elif instruction.type == "mod":
            registers[instruction.op1] %= get_operand_value(instruction.op2)
            program_counter += 1
        elif instruction.type == "rcv":
            if registers[instruction.op1] != 0:
                return last_frequency

            program_counter += 1
        elif instruction.type == "jgz":
            if registers[instruction.op1] > 0:
                program_counter += get_operand_value(instruction.op2)
            else:
                program_counter += 1
        else:
            raise Exception(f"WTF {instruction}")

    return -1


def part3(instructions: list[Instruction]) -> int:
    cpu_a = CPU(instructions=instructions)
    cpu_b = CPU(instructions=instructions)

    cpu_a.set_register("p", 0)
    cpu_a.receiver = cpu_b

    cpu_b.set_register("p", 1)
    cpu_b.receiver = cpu_a

    while True:
        cpu_a.process()
        cpu_b.process()

        if cpu_a.is_stuck() and cpu_b.is_stuck():
            break

    return len(cpu_b.sent)


if __name__ == "__main__":
    run_examples(2017, "18", reader, part1, part3)
    run_solution(2017, "18", reader, part1, part3)
