import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from collections import deque
from functools import reduce
from operator import xor
from util.aoc import run_examples, run_solution
from util.list import flatten


def create_sparse_hash(sizes: list[int]) -> list[int]:
    iterations = 64
    sequence = deque(range(256))
    skip_size = 0

    for _ in range(iterations):
        for group_size in sizes:
            knot = [sequence.popleft() for _ in range(group_size)]
            sequence += reversed(knot)
            sequence.rotate(-skip_size)
            skip_size += 1

    unwind = iterations * sum(sizes) + skip_size * (skip_size - 1) // 2
    sequence.rotate(unwind)

    return list(sequence)


def knot_hash(value: str) -> str:
    hash_size = 256
    block_size = 16
    ascii_sizes = [ord(c) for c in value] + [17, 31, 73, 47, 23]

    sparse_hash = create_sparse_hash(ascii_sizes)
    extract_block = lambda i: sparse_hash[i * block_size : (i + 1) * block_size]
    dense_hash = [reduce(xor, extract_block(i)) for i in range(hash_size // block_size)]

    return "".join(f"{n:02x}" for n in dense_hash)


def reader(file: str) -> list[str]:
    key = open(file).read()

    return [f"{key}-{x}" for x in range(128)]


def part1(data: list[str]) -> int:
    hex_hashes = [knot_hash(value) for value in data]
    bin_hashes = [f"{int(hex_hash, 16):0128b}" for hex_hash in hex_hashes]

    return sum([bin_hash.count("1") for bin_hash in bin_hashes])


def part2(data: list[str]) -> int:
    hex_hashes = [knot_hash(value) for value in data]
    bin_hashes = [f"{int(hex_hash, 16):0128b}" for hex_hash in hex_hashes]
    maze = [list(bin_hash) for bin_hash in bin_hashes]
    walls = flatten([[(x, y) for x, cell in enumerate(row) if cell == "1"] for y, row in enumerate(maze)])

    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    regions = 0

    while len(walls) > 0:
        queue = [walls.pop()]

        while len(queue) > 0:
            x, y = queue.pop()
            for direction in directions:
                dx, dy = direction
                point = x + dx, y + dy
                if point in walls:
                    queue.append(point)
                    walls.remove(point)

        regions += 1

    return regions


if __name__ == "__main__":
    run_examples(2017, "14", reader, part1, part2)
    run_solution(2017, "14", reader, part1, part2)
