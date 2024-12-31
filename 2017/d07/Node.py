class Node:
    name = ""
    weight = 0
    children = []

    overall_weight = 0

    def __init__(self, _name: str, _weight: int, _children):
        self.name = _name
        self.weight = _weight
        self.children = _children

    def __repr__(self) -> str:
        """Debug purposes"""
        return "{} ({}, {}) -> {}".format(self.name, self.weight, self.overall_weight, self.children)
