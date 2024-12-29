def main():
    data = [d for d in open('input.txt').read().strip().split(',')]

    x = 0
    y = 0
    current_max = 0

    for d in data:
        if d == 'n':
            y += 1
        elif d == 'nw':
            x -= 1
            y += 1
        elif d == 'ne':
            x += 1
        elif d == 's':
            y -= 1
        elif d == 'sw':
            x -= 1
        elif d == 'se':
            x += 1
            y -= 1

        if x + y > current_max:
            current_max = x + y

    print("Part 1: ", x + y)
    print("Part 2: ", current_max)


if __name__ == '__main__':
    main()
