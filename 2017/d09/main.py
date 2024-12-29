from copy import copy
import re


def main():
    with open('input.txt') as f:
        data = f.read().replace("!!", "")

    print(part1(copy(data)))
    print(part2(copy(data)))


def part1(data):
    data = re.sub('(?:<>|<.*?[^!]>)', '', data)

    score = 0
    depth = 0

    for c in data:
        if c == '{':
            depth += 1
            score += depth
        elif c == '}':
            depth -= 1

    return score


def part2(data):
    removed = re.findall('(?:<>|<.*?[^!]>)', data)

    garbage = 0
    for i in removed:
        cancelled = "".join(re.findall('!.', i))
        cnt = len(i) - len(cancelled) - 2
        garbage += cnt

    return garbage


if __name__ == '__main__':
    main()
