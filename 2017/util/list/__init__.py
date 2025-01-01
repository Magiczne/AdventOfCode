from typing_extensions import TypeVar

TItem = TypeVar("TItem")


def flatten(target: list[list[TItem]]) -> list[TItem]:
    return [item for nested_list in target for item in nested_list]
