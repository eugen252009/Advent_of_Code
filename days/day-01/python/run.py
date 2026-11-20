from pathlib import Path
from solution import day1_P1, day1_P2

text = (Path(__file__).resolve().parents[1] / "input").read_text().rstrip("\n")
print(day1_P1(text))
print(day1_P2(text))
