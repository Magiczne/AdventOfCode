import os
import time
from typing import Callable, TypeVar, Any
from termcolor import colored

TResult = TypeVar("TResult")
TInput = TypeVar("TInput")

root_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))


def build_string(type: str, label: str, part: str, result: TResult, duration_in_ms: float) -> str:
    return f"{type} {label.ljust(10)} {part} {str(result).ljust(45)} {duration_in_ms:.4f}ms"


def example_part1(result: TResult, test_file_name: str, duration_in_ms: float) -> None:
    print(
        colored(
            build_string("[EXM]", f"({test_file_name})", "Part 1:", result, duration_in_ms),
            "yellow",
        )
    )


def example_part2(result: TResult, test_file_name: str, duration_in_ms: float) -> None:
    print(
        colored(
            build_string("[EXM]", f"({test_file_name})", "Part 2:", result, duration_in_ms),
            "red",
        )
    )


def solution_part1(result: TResult, duration_in_ms: float) -> None:
    print(colored(build_string("[SLN]", "", "Part 1:", result, duration_in_ms), "green"))


def solution_part2(result: TResult, duration_in_ms: float) -> None:
    print(colored(build_string("[SLN]", "", "Part 2:", result, duration_in_ms), "blue"))


def run_examples(
    year: int,
    day: str,
    reader: Callable[[str], TInput],
    part1: Callable[[TInput], Any],
    part2: Callable[[TInput], Any],
) -> None:
    dir_path = os.path.join(root_directory, f"{year}/d{day}/test-runs")

    if os.path.exists(dir_path):
        test_files = os.listdir(dir_path)

        for file in test_files:
            test_data_1 = reader(os.path.join(dir_path, file))
            test_data_2 = reader(os.path.join(dir_path, file))

            start1 = time.perf_counter()
            value_part1 = part1(test_data_1)
            duration1 = (time.perf_counter() - start1) * 1000
            example_part1(value_part1, file, duration1)

            start2 = time.perf_counter()
            value_part2 = part2(test_data_2)
            duration2 = (time.perf_counter() - start2) * 1000
            example_part2(value_part2, file, duration2)


def run_solution(
    year: int,
    day: str,
    reader: Callable[[str], TInput],
    part1: Callable[[TInput], Any],
    part2: Callable[[TInput], Any],
) -> None:
    file_path = os.path.join(root_directory, f"{year}/d{day}/input.txt")
    data_1 = reader(file_path)
    data_2 = reader(file_path)

    start1 = time.perf_counter()
    value_part1 = part1(data_1)
    duration1 = (time.perf_counter() - start1) * 1000
    solution_part1(value_part1, duration1)

    start2 = time.perf_counter()
    value_part2 = part2(data_2)
    duration2 = (time.perf_counter() - start2) * 1000
    solution_part2(value_part2, duration2)


__all__ = [
    "root_directory",
    "run_examples",
    "run_solution",
]
