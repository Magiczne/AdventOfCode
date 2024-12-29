from copy import copy


def main():
    data = [int(line.strip('\n')) for line in open('input.txt').readlines()]

    print(part1(copy(data)))
    print(part2(copy(data)))


def part1(data):
    steps = 0
    idx = 0

    while idx < len(data):
        data[idx] += 1
        idx += data[idx] - 1
        steps += 1

    return steps


def part2(data):
    steps = 0
    idx = 0

    while idx < len(data):
        jump = -1 if data[idx] >= 3 else 1
        data[idx] += jump
        idx += data[idx] - jump
        steps += 1

    return steps


if __name__ == '__main__':
    main()
