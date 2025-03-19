from dataclasses import dataclass
from util.math import Vec3


@dataclass
class Particle:
    position: Vec3
    velocity: Vec3
    acceleration: Vec3

    def move(self) -> None:
        self.velocity += self.acceleration
        self.position += self.velocity

    def distance(self) -> int:
        return self.position.manhattan_distance(Vec3(0, 0, 0))
