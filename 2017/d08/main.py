import operator
from collections import Counter


def main():
    with open('input.txt') as f:
        data = f.read().splitlines()

    registers = Counter()

    highest_value = 0

    op_map = {
        "inc": operator.add,
        "dec": operator.sub,
        "==": operator.eq,
        "!=": operator.ne,
        ">": operator.gt,
        ">=": operator.ge,
        "<": operator.lt,
        "<=": operator.le
    }

    for line in data:
        data, cond = line.split(" if ")
        data_reg, data_op, data_val = data.split()
        cond_reg_name, cond_op, cond_val = cond.split()

        if op_map[cond_op](registers[cond_reg_name], int(cond_val)):
            registers[data_reg] = op_map[data_op](registers[data_reg], int(data_val))

        if registers[data_reg] > highest_value:
            highest_value = registers[data_reg]

    # Part 1
    print("Part 1: ", max(registers.values()))

    # Part 2
    print("Part 2: ", highest_value)


if __name__ == '__main__':
    main()
