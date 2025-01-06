import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from util.aoc import run_examples, run_solution


def reader(file: str) -> list[str]:
    with open(file) as f:
        return list(map(lambda line: line.rstrip("\n"), f.readlines()))


def part1(data: list[str]) -> str:
    def rotate(point: complex, direction: complex) -> complex:
        # Rotate right
        if get_value(point + direction * 1j) != " ":
            return direction * 1j

        return direction * -1j

    def get_value(point: complex) -> str:
        try:
            return data[int(point.imag)][int(point.real)]
        except IndexError:
            return " "

    current_position = data[0].index("|") + 0j
    current_direction = 1j
    packets: list[str] = []

    item = get_value(current_position)
    while item != " ":
        if item.isalpha():
            packets.append(item)
        elif item == "+":
            current_direction = rotate(current_position, current_direction)

        current_position += current_direction
        item = get_value(current_position)

    return "".join(packets)


def part2(data: list[str]) -> str:
    def rotate(point: complex, direction: complex) -> complex:
        # Rotate right
        if get_value(point + direction * 1j) != " ":
            return direction * 1j

        return direction * -1j

    def get_value(point: complex) -> str:
        try:
            return data[int(point.imag)][int(point.real)]
        except IndexError:
            return " "

    current_position = data[0].index("|") + 0j
    current_direction = 1j
    steps = 0

    item = get_value(current_position)
    while item != " ":
        if item == "+":
            current_direction = rotate(current_position, current_direction)

        current_position += current_direction
        steps += 1
        item = get_value(current_position)

    return steps


if __name__ == "__main__":
    run_examples(2017, "19", reader, part1, part2)
    run_solution(2017, "19", reader, part1, part2)
