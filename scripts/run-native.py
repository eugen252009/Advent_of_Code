"""Run C and Rust solutions or discover their tests under days/."""
import argparse
import os
from pathlib import Path
import re
import shlex
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def run_c(folder, testing):
    if testing:
        sources = sorted(folder.glob('test*.c'))
    else:
        main = folder / 'main.c'
        sources = [main] if main.is_file() else sorted(folder.glob('part*.c'))
    if not sources:
        return None
    compiler = shlex.split(os.environ.get('CC', 'cc'))
    failed = False
    with tempfile.TemporaryDirectory(prefix='aoc-c-') as directory:
        for source in sources:
            executable = str(Path(directory) / source.stem)
            print(f'{folder.parent.name}/c/{source.name}', flush=True)
            try:
                subprocess.run([*compiler, '-std=c11', '-Wall', '-Wextra', source.name, '-o', executable], cwd=folder, check=True)
                subprocess.run([executable] if testing else [executable, '../input'], cwd=folder, check=True)
            except subprocess.CalledProcessError:
                failed = True
    return not failed


def run_rust(folder, testing):
    if not (folder / 'Cargo.toml').is_file():
        return None
    print(f'{folder.parent.name}/rust', flush=True)
    if testing:
        command = ['cargo', 'test']
    else:
        binary = os.environ.get('BIN')
        command = ['cargo', 'run', *(['--bin', binary] if binary else []), '--', '../input']
    return subprocess.run(command, cwd=folder).returncode == 0


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('language', choices=('c', 'rust'))
    parser.add_argument('day', nargs='?')
    parser.add_argument('--test', action='store_true')
    args = parser.parse_args()
    if args.day is None:
        if args.test:
            args.day = 'all'
        else:
            configured = re.search(r'^export const DAY = (\d+);', (ROOT / 'bootstrap.js').read_text(), re.MULTILINE)
            if not configured:
                parser.error('Tageszahl in bootstrap.js fehlt; alternativ DAY=03 angeben')
            args.day = configured[1]
    if args.day == 'all' and args.test:
        days = range(1, 26)
    elif re.fullmatch(r'0?[1-9]|1[0-9]|2[0-5]', args.day):
        days = [int(args.day)]
    else:
        parser.error('DAY muss zwischen 1 und 25 liegen (oder all im Testmodus)')
    found = failed = False
    for day in days:
        folder = ROOT / 'days' / f'day-{day:02}' / args.language
        try:
            result = (run_c if args.language == 'c' else run_rust)(folder, args.test)
        except OSError as error:
            print(f'{folder.parent.name}/{args.language}: {error}', file=sys.stderr)
            result = False
        if result is not None:
            found = True
            failed |= not result
    if not found:
        print(f'Keine {args.language}-{"Tests (test*.c bzw. Cargo.toml)" if args.test else "Lösung"} gefunden.')
        return int(args.day != 'all')
    return int(failed)


if __name__ == '__main__':
    sys.exit(main())
