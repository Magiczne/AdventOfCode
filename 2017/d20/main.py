import inspect
import os
import sys

current_directory = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

import math
import re
from collections import defaultdict
from d20.particle import Particle
from util.aoc import run_examples, run_solution
from util.math import Vec3


def reader(file: str) -> list[Particle]:
    regex = r"<([\d-]+),([\d-]+),([\d-]+)>"
    particles: list[Particle] = []

    with open(file) as f:
        lines = f.readlines()

    for line in lines:
        matches = list(re.finditer(regex, line))

        particles.append(
            Particle(
                position=Vec3(x=int(matches[0].group(1)), y=int(matches[0].group(2)), z=int(matches[0].group(3))),
                velocity=Vec3(x=int(matches[1].group(1)), y=int(matches[1].group(2)), z=int(matches[1].group(3))),
                acceleration=Vec3(x=int(matches[2].group(1)), y=int(matches[2].group(2)), z=int(matches[2].group(3))),
            )
        )

    return particles


def part1(particles: list[Particle]) -> int:
    last_result = math.inf
    last_result_count = 0

    while True:
        min_distance = math.inf
        idx = math.inf

        for index, particle in enumerate(particles):
            particle.move()
            distance = particle.distance()
            if distance < min_distance:
                idx = index
                min_distance = distance

        # If it is not changed 1000 times it probably won't change
        if last_result_count >= 1000:
            return idx

        if idx == last_result:
            last_result_count += 1
        else:
            last_result_count = 0

        last_result = idx


def part2(particles: list[Particle]) -> int:
    # Convert to dict, so we have constant indexes
    particles = {index: value for index, value in enumerate(particles)}
    last_result = math.inf
    last_result_count = 0

    while True:
        for index, particle in particles.items():
            particle.move()

        positions = defaultdict(list)
        for index, particle in particles.items():
            positions[particle.position].append(index)

        for _, indexes in positions.items():
            if len(indexes) > 1:
                for index in indexes:
                    del particles[index]

        # If it is not changed 50 times it probably won't change
        if last_result_count >= 50:
            return len(particles)

        if len(particles) == last_result:
            last_result_count += 1
        else:
            last_result_count = 0

        last_result = len(particles)


if __name__ == "__main__":
    run_examples(2017, "20", reader, part1, part2)
    run_solution(2017, "20", reader, part1, part2)
