import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

import re
from tqdm import tqdm
from typing import Any, Generator
from util.aoc import run_examples, run_solution

FACTOR_A = 16807
FACTOR_B = 48271


def reader(file: str) -> str:
    match = re.findall(r"\d+", open(file).read())

    return {"a": int(match[0]), "b": int(match[1])}


def create_generator(previous: int, factor: int, divisor: int) -> Generator[int, Any, Any]:
    while True:
        previous = (previous * factor) % 2147483647

        if previous % divisor == 0:
            yield previous


def bit_match(a: int, b: int) -> bool:
    return a & 0xFFFF == b & 0xFFFF


def part1(data: list[int]) -> int:
    pairs = 0
    a = create_generator(data["a"], FACTOR_A, 1)
    b = create_generator(data["b"], FACTOR_B, 1)

    for _ in tqdm(range(40000000)):
        if bit_match(next(a), next(b)):
            pairs += 1

    return pairs


def part2(data: list[int]) -> int:
    pairs = 0
    a = create_generator(data["a"], FACTOR_A, 4)
    b = create_generator(data["b"], FACTOR_B, 8)

    for _ in tqdm(range(5000000)):
        if bit_match(next(a), next(b)):
            pairs += 1

    return pairs


if __name__ == "__main__":
    run_examples(2017, "15", reader, part1, part2)
    run_solution(2017, "15", reader, part1, part2)
