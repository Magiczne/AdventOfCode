from copy import copy
from itertools import zip_longest
from functools import reduce


def main():
    with open('input.txt') as f:
        data = f.read().strip()
        lengths = [int(i) for i in data.split(',')]
        ascii_lengths = [ord(i) for i in data] + [17, 31, 73, 47, 23]

    sequence = [i for i in range(0, 256)]

    print(part1(copy(sequence), lengths))
    print(part2(copy(sequence), ascii_lengths))


def part1(sequence, lengths):
    current_pos = 0
    skip_size = 0

    for i in range(len(lengths)):
        reverse_fragment(sequence, current_pos, lengths[i])

        current_pos = (current_pos + lengths[i] + skip_size) % len(sequence)
        skip_size += 1

    return sequence[0] * sequence[1]


def part2(sequence, lengths):
    actual_lengths = lengths * 64

    current_pos = 0
    skip_size = 0

    for i in range(len(actual_lengths)):
        reverse_fragment(sequence, current_pos, actual_lengths[i])

        current_pos = (current_pos + actual_lengths[i] + skip_size) % len(sequence)
        skip_size += 1

    sparse_hash = list(group_by(16, sequence))
    dense_hash = [reduce(lambda x, y: x ^ y, group, 0) for group in sparse_hash]
    dense_hash = [format(i, 'x') for i in dense_hash]

    return "".join(dense_hash)


def reverse_fragment(arr, start, length):
    tmp = arr * 2
    tmp[start:start+length] = tmp[start:start+length][::-1]

    tmp[0:start] = tmp[len(arr):start+len(arr)]
    arr[:] = tmp[0:len(arr)]


def group_by(n, iterable):
    args = [iter(iterable)] * n
    return zip_longest(*args)


if __name__ == '__main__':
    main()
