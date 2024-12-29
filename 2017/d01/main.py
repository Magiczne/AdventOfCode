def main():
    data = list(open('input.txt').read())

    print(calc(data, 1))
    print(calc(data, len(data) // 2))


def calc(data, distance):
    data_sum = 0

    for i in range(len(data)):
        if data[i] == data[(i + distance) % len(data)]:
            data_sum += int(data[i])

    return data_sum


if __name__ == '__main__':
    main()
