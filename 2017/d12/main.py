def main():
    with open('input.txt') as f:
        lines = [line.strip().split(' <-> ') for line in f.readlines()]
        data = {int(l[0]): list(map(int, l[1].split(', '))) for l in lines}

    print("Part 1: ", len(get_nodes_containing(data, 0)))
    print("Part 2: ", count_groups(data))


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


if __name__ == '__main__':
    main()
