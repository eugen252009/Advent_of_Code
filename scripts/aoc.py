#!/usr/bin/env python3
"""Local AoC workflows. Never commits, stages, resets or pushes."""
import argparse
from datetime import date
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]


def git(*args):
    return subprocess.check_output(['git', '-C', str(ROOT), *args], text=True).strip()


def year_value(value):
    if not re.fullmatch(r'20\d{2}', value) or int(value) < 2015:
        raise argparse.ArgumentTypeError('Jahr muss zwischen 2015 und 2099 liegen')
    return int(value)


def next_year(year):
    branches = git('for-each-ref', '--format=%(refname:short)', 'refs/heads', 'refs/remotes/origin').splitlines()
    years = [int(b.removeprefix('origin/')) for b in branches
             if re.fullmatch(r'(origin/)?20\d{2}', b)]
    year = year or max(years, default=date.today().year - 1) + 1
    year_value(str(year))
    if str(year) in branches or f'origin/{year}' in branches:
        raise ValueError(f'Branch {year} existiert bereits; nichts geändert')
    primary = Path(git('rev-parse', '--path-format=absolute', '--git-common-dir')).parent
    destination = primary.parent / f'{primary.name}-years' / str(year)
    if destination.exists():
        raise ValueError(f'{destination} existiert bereits; nichts geändert')
    # The source may be dirty (initial cleanup). Copy only the current tooling;
    # never accidentally carry old yearly solutions from the base commit forward.
    files = ['Makefile', '.gitignore', 'scripts/aoc.py', 'fetchPuzzles/main.go',
             'fetchPuzzles/go.mod', 'fetchPuzzles/go.sum', 'fetchPuzzles/Makefile']
    files += [str(p.relative_to(ROOT)) for p in (ROOT / 'fetchPuzzles').glob('*_test.go')]
    snapshots = {name: (ROOT / name).read_bytes() for name in files}
    base = 'main' if 'main' in branches else 'HEAD'
    subprocess.run(['git', '-C', str(ROOT), 'worktree', 'add', '-b', str(year), str(destination), base], check=True)
    tracked = subprocess.check_output(['git', '-C', str(destination), 'ls-files', '-z']).decode().split('\0')
    for name in filter(None, tracked):
        path = destination / name
        if path.is_file() or path.is_symlink():
            path.unlink()
    for name, content in snapshots.items():
        path = destination / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(content)
    for day in range(1, 26):
        folder = destination / 'days' / f'day-{day:02}'
        folder.mkdir(parents=True, exist_ok=True)
        (folder / '.gitkeep').touch()
    (destination / 'utils').mkdir(exist_ok=True)
    (destination / 'utils' / '.gitkeep').touch()
    (destination / 'README.md').write_text(
        f'# Advent of Code {year}\n\n'
        '## Aufgaben herunterladen\n\n'
        'Go ab 1.26, Python ab 3.9 und make benötigt. Im Branch-Hauptverzeichnis eine lokale '
        '`cookie`-Datei mit `session=DEIN_WERT` anlegen, dann:\n\n'
        '```sh\nmake fetch 03\nmake fetch all  # nur abgeschlossene Jahre\n```\n\n'
        'Aufgabe: `days/day-03/README.md`, persönlicher Input: `days/day-03/input` '
        '(gitignored). Beispielinputs als `example.txt` versionieren. '
        'Lösungen je Sprache unter `days/day-03/js/`, `python/`, `rust/` usw. ablegen; '
        'alle Sprachen verwenden denselben Tagesinput. Gemeinsame Helfer liegen unter '
        '`utils/<sprache>/`. Sprachordner werden erst bei Bedarf angelegt.\n\n'
        'Downloads überschreiben bestehende Aufgaben und Inputs. Nur freigeschaltete Tage abrufen.\n\n'
        '`make next_year` bereitet den nächsten Jahres-Branch in einem separaten Worktree vor. '
        'Diese Vorbereitung enthält keine Commits; auch die leeren Tagesordner sind nur Vorlagen, keine Lösungen.\n',
        encoding='utf-8')
    print(f'Branch {year} vorbereitet: {destination}\ncd {destination}\nKeine Commits erstellt; Änderungen vor einem späteren Commit prüfen.')


def fetch(day, year):
    if day != 'all' and (not day or not re.fullmatch(r'\d{1,2}', day) or not 1 <= int(day) <= 25):
        raise ValueError('Usage: make fetch DAY|all [YEAR=YYYY]; DAY muss zwischen 1 und 25 liegen')
    branch = git('branch', '--show-current')
    if re.fullmatch(r'20\d{2}', branch):
        if year and year != int(branch):
            raise ValueError('YEAR passt nicht zum aktuellen Jahres-Branch')
        year = int(branch)
    if not year:
        raise ValueError('Kein Jahres-Branch: YEAR=YYYY angeben oder im Jahres-Worktree ausführen')
    if day == 'all' and year >= date.today().year:
        raise ValueError('fetch all nur für abgeschlossene Jahre verwenden')
    if not (ROOT / 'cookie').is_file():
        raise ValueError(f'Cookie fehlt: {ROOT / "cookie"} (Inhalt: session=DEIN_WERT)')
    selection = ['-all'] if day == 'all' else ['-day', str(int(day))]
    subprocess.run(['go', 'run', '.', '-year', str(year), *selection,
                    '-output', str(ROOT / 'days'), '-cookie', str(ROOT / 'cookie')],
                   cwd=ROOT / 'fetchPuzzles', check=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    new = sub.add_parser('next_year')
    new.add_argument('--year', type=year_value)
    download = sub.add_parser('fetch')
    download.add_argument('day', nargs='?')
    download.add_argument('--year', type=year_value)
    args = parser.parse_args()
    try:
        if args.command == 'next_year':
            next_year(args.year)
        else:
            fetch(args.day, args.year)
    except (ValueError, OSError, subprocess.CalledProcessError) as exc:
        print(f'Fehler: {exc}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
