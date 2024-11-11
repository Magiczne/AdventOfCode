def main():
    banks = [int(i) for i in open('input.txt').read().strip().split('\t')]

    print(solve(banks))


def solve(banks):
    history = []

    while True:
        if tuple(banks) in history:
            return {
                'Part 1': len(history),
                'Part 2': len(history) - history.index(tuple(banks))
            }

        history.append(tuple(banks))

        redistribution = max(banks)
        r_idx = banks.index(redistribution)

        banks[r_idx] = 0

        while redistribution > 0:
            r_idx += 1
            banks[r_idx % len(banks)] += 1
            redistribution -= 1


if __name__ == '__main__':
    main()
