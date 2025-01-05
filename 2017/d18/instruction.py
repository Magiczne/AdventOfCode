from dataclasses import dataclass


@dataclass
class Instruction:
    type: str
    op1: str
    op2: str | None
