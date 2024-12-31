import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from dataclasses import dataclass
from itertools import zip_longest
from typing import NamedTuple
from functools import reduce
from util.aoc import run_examples, run_solution  # NOQA


@dataclass
class Input:
    lengths: list[int]
    ascii_lengths: list[int]
    sequence: list[int]


def solve_part1(sequence: list[int], lengths: list[int]) -> int:
    current_pos = 0
    skip_size = 0

    for i in range(len(lengths)):
        reverse_fragment(sequence, current_pos, lengths[i])

        current_pos = (current_pos + lengths[i] + skip_size) % len(sequence)
        skip_size += 1

    return sequence[0] * sequence[1]


def solve_part2(sequence: list[int], lengths: list[int]) -> str:
    actual_lengths = lengths * 64

    current_pos = 0
    skip_size = 0

    for i in range(len(actual_lengths)):
        reverse_fragment(sequence, current_pos, actual_lengths[i])

        current_pos = (current_pos + actual_lengths[i] + skip_size) % len(sequence)
        skip_size += 1

    sparse_hash = list(group_by(16, sequence))
    dense_hash = [reduce(lambda x, y: x ^ y, group, 0) for group in sparse_hash]
    dense_hash = [format(i, "x") for i in dense_hash]

    return "".join(dense_hash)


def reverse_fragment(arr: list[int], start: int, length: int) -> None:
    tmp = arr * 2
    tmp[start : start + length] = tmp[start : start + length][::-1]

    tmp[0:start] = tmp[len(arr) : start + len(arr)]
    arr[:] = tmp[0 : len(arr)]


def group_by(n: int, iterable: list[int]):
    args = [iter(iterable)] * n
    return zip_longest(*args)


def part1(data: Input) -> int:
    return solve_part1(data.sequence, data.lengths)


def part2(data: Input) -> str:
    return solve_part2(data.sequence, data.ascii_lengths)


def reader(file: str) -> list[list[int]]:
    with open(file) as f:
        data = f.read().strip()
        lengths = [int(i) for i in data.split(",")]
        ascii_lengths = [ord(i) for i in data] + [17, 31, 73, 47, 23]

    sequence = [i for i in range(0, 256)]

    return Input(lengths=lengths, ascii_lengths=ascii_lengths, sequence=sequence)


if __name__ == "__main__":
    run_examples(2017, "10", reader, part1, part2)
    run_solution(2017, "10", reader, part1, part2)
