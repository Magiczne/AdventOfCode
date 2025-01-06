with open("./2017/d19/input.txt") as f:
    instructions = f.readlines()

pos = instructions[0].find("|") + 0j
direction = 1j
letters = []
steps = 0


def get_char(pos):
    try:
        return instructions[int(pos.imag)][int(pos.real)]
    except IndexError:
        return " "


def change_direction(direction):
    candidate = direction * 1j
    return candidate if get_char(pos + candidate) != " " else direction * -1j


char = get_char(pos)
while char != " ":
    steps += 1
    if char.isalpha():
        letters.append(char)
    elif char == "+":
        direction = change_direction(direction)
    pos += direction
    char = get_char(pos)

print("".join(letters))
print(steps)
