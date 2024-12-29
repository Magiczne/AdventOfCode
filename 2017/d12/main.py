import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

from util.aoc import run_examples, run_solution  # NOQA


def get_nodes_containing(data, index):
    to_check = set(data[index])
    connected = {index}

    while len(to_check) > 0:
        el = list(to_check)[0]
        to_check.update(data[el])
        connected.add(el)
        to_check.difference_update(connected)

    return connected


def count_groups(data):
    nodes = set(list(data.keys()))
    grp_count = 0

    while len(nodes) > 0:
        group = get_nodes_containing(data, list(nodes)[0])
        nodes.difference_update(group)
        grp_count += 1

    return grp_count


def part1(data) -> int:
    return len(get_nodes_containing(data, 0))


def part2(data) -> int:
    return count_groups(data)


def reader(file: str):
    with open(file) as f:
        lines = [line.strip().split(" <-> ") for line in f.readlines()]
        data = {int(l[0]): list(map(int, l[1].split(", "))) for l in lines}

    return data


if __name__ == "__main__":
    run_examples(2017, "12", reader, part1, part2)
    run_solution(2017, "12", reader, part1, part2)
