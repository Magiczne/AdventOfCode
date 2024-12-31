import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

import re
from typing import Any, Dict
from util.aoc import run_examples, run_solution  # NOQA
from Node import Node
from Graph import Graph


def part1(graph: Graph) -> Node:
    return graph.get_root_node()


def part2(graph: Graph) -> list[int]:
    graph.calculate_weights()
    unbalanced = graph.find_unbalanced()

    weights = [graph.get_by_name(child).overall_weight for child in unbalanced.children]

    return weights


def parse_entry(entry: str) -> Dict[str, Any]:
    data = entry.split(" -> ")
    basic_info = data[0].split()
    return {
        "name": basic_info[0],
        "weight": int(re.search("([0-9]+)", basic_info[1]).group(0)),
        "children": [] if len(data) == 1 else data[1].split(", "),
    }


def reader(file: str) -> Graph:
    with open(file) as f:
        data = [parse_entry(entry) for entry in f.read().splitlines()]

    graph = Graph()

    for node in data:
        graph.append(Node(node["name"], node["weight"], node["children"]))

    return graph


if __name__ == "__main__":
    run_examples(2017, "07", reader, part1, part2)
    run_solution(2017, "07", reader, part1, part2)
