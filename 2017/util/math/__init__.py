from dataclasses import dataclass


@dataclass
class Vec3:
    x: int
    y: int
    z: int

    def __add__(self, v):
        return Vec3(self.x + v.x, self.y + v.y, self.z + v.z)

    def __mul__(self, m):
        return Vec3(self.x * m, self.y * m, self.z * m)

    def __hash__(self):
        return (self.x, self.y, self.z).__hash__()

    def manhattan_distance(self, other: "Vec3") -> int:
        return abs(self.x - other.x) + abs(self.y - other.y) + abs(self.z - other.z)
