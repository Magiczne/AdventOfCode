def main():
    data = [line.strip('\n').split(' ') for line in open('input.txt').readlines()]

    print(part1(data))
    print(part2(data))


def part1(data):
    return sum(len(set(line)) == len(line) for line in data)


def part2(data):
    return sum(len(set(line)) == len(line) for line in [["".join(sorted(item)) for item in line] for line in data])


if __name__ == '__main__':
    main()
