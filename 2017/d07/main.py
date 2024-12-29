import re
from Node import Node
from Graph import Graph


def main():
    with open('input.txt') as f:
        data = [parse_entry(entry) for entry in f.read().splitlines()]

    graph = Graph()

    for node in data:
        graph.append(Node(node['name'], node['weight'], node['children']))

    print(part1(graph))
    print(part2(graph))


def part1(graph):
    return graph.get_root_node()


def part2(graph):
    graph.calculate_weights()
    unbalanced = graph.find_unbalanced()

    weights = [graph.get_by_name(child).overall_weight for child in unbalanced.children]

    return weights


def parse_entry(entry):
    data = entry.split(" -> ")
    basic_info = data[0].split()
    return {
        'name':     basic_info[0],
        'weight':   int(re.search('([0-9]+)', basic_info[1]).group(0)),
        'children': [] if len(data) == 1 else data[1].split(", ")
    }


if __name__ == '__main__':
    main()
