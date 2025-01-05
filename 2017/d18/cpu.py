from collections import defaultdict, deque

from d16.main import Instruction


class CPU:
    def __init__(self, instructions: list[Instruction]):
        self.instructions = instructions
        self.program_counter = 0
        self.received: deque[int] = deque()
        self.receiver = None
        self.registers = defaultdict(int)
        self.sent: list[int] = []

    def process(self):
        instruction = self.instructions[self.program_counter]

        if instruction.type == "set":
            self.registers[instruction.op1] = self.get_operand_value(instruction.op2)
            self.program_counter += 1
        elif instruction.type == "add":
            self.registers[instruction.op1] += self.get_operand_value(instruction.op2)
            self.program_counter += 1
        elif instruction.type == "mul":
            self.registers[instruction.op1] *= self.get_operand_value(instruction.op2)
            self.program_counter += 1
        elif instruction.type == "mod":
            self.registers[instruction.op1] %= self.get_operand_value(instruction.op2)
            self.program_counter += 1
        elif instruction.type == "jgz":
            if self.get_operand_value(instruction.op1) > 0:
                self.program_counter += self.get_operand_value(instruction.op2)
            else:
                self.program_counter += 1
        elif instruction.type == "snd":
            value = self.get_operand_value(instruction.op1)

            self.sent.append(value)
            self.receiver.received.append(value)
            self.program_counter += 1
        elif instruction.type == "rcv":
            if len(self.received) > 0:
                self.registers[instruction.op1] = self.received.popleft()
                self.program_counter += 1
        else:
            raise Exception(f"WTF {instruction}")

    def get_operand_value(self, operand: str) -> int:
        if operand.lstrip("-").isnumeric():
            return int(operand)

        return self.registers[operand]

    def set_register(self, register: str, value: int) -> None:
        self.registers[register] = value

    def is_stuck(self):
        if self.program_counter < 0:
            return True

        if self.program_counter > len(self.instructions):
            return True

        if self.instructions[self.program_counter].type == "rcv" and len(self.received) == 0:
            return True

        return False
