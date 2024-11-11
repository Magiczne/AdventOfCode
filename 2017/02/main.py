import itertools


def main():
    data = [[int(item) for item in line.strip('\n').split('\t')] for line in open('input.txt').readlines()]

    print(part1(data))
    print(part2(data))


def part1(data):
    return sum([max(line) - min(line) for line in data])


def part2(data):
    s = 0

    for line in data:
        for comb in itertools.combinations(line, 2):
            tmp = sorted(comb)

            if tmp[1] % tmp[0] == 0:
                s += tmp[1] / tmp[0]
                continue

    return s


if __name__ == '__main__':
    main()
