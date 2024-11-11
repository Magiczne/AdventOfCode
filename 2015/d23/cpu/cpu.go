package d23

import (
	"aoc2015/util"
)

type Instruction struct {
	Name     string
	Operand1 string
	Operand2 string
}

type Processor struct {
	registers      map[string]int
	programCounter int
}

func NewProcessor() Processor {
	return Processor{
		registers: map[string]int{
			"a": 0,
			"b": 0,
		},
		programCounter: 0,
	}
}

func (processor *Processor) A() int {
	return processor.registers["a"]
}

func (processor *Processor) SetA(value int) {
	processor.registers["a"] = value
}

func (processor *Processor) B() int {
	return processor.registers["b"]
}

func (processor *Processor) Run(instructions []Instruction) {
	maxProgramCounter := len(instructions)

	for {
		if processor.programCounter >= maxProgramCounter {
			return
		}

		instruction := instructions[processor.programCounter]

		switch instruction.Name {
		case "hlf":
			processor.registers[instruction.Operand1] /= 2
			processor.programCounter++

		case "tpl":
			processor.registers[instruction.Operand1] *= 3
			processor.programCounter++

		case "inc":
			processor.registers[instruction.Operand1] += 1
			processor.programCounter++

		case "jmp":
			processor.programCounter += util.StringToInt(instruction.Operand1)

		case "jie":
			if processor.registers[instruction.Operand1]%2 == 0 {
				processor.programCounter += util.StringToInt(instruction.Operand2)
			} else {
				processor.programCounter++
			}

		case "jio":
			if processor.registers[instruction.Operand1] == 1 {
				processor.programCounter += util.StringToInt(instruction.Operand2)
			} else {
				processor.programCounter++
			}

		default:
			panic(instruction.Name)
		}
	}
}
