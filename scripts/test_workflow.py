"""Offline regression tests for the Make/Go bridge and the JS runner."""
from datetime import date
import importlib.util
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('aoc', ROOT / 'scripts/aoc.py')
aoc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(aoc)


class WorkflowTests(unittest.TestCase):
    def test_first_year_in_main_only_clone(self):
        with tempfile.TemporaryDirectory() as tmp:
            clone = Path(tmp) / 'my AoC fork'
            subprocess.run(['git', 'clone', '--quiet', '--single-branch', '--branch', 'main', str(ROOT), str(clone)], check=True)
            shutil.copy2(ROOT / 'scripts/aoc.py', clone / 'scripts/aoc.py')
            (clone / 'cookie').write_text('session=test')
            head = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=clone)
            result = subprocess.run(['make', 'next_year'], cwd=clone, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            year = str(date.today().year)
            worktree = clone.with_name(clone.name + '-years') / year
            self.assertIn(f"cd '{worktree}'", result.stdout)
            self.assertTrue((worktree / 'days/day-01/.gitkeep').is_file())
            self.assertTrue((worktree / 'fetchPuzzles/main.go').is_file())
            self.assertFalse((worktree / 'cookie').exists())
            self.assertEqual(subprocess.check_output(['git', 'rev-parse', year], cwd=clone), head)
            self.assertEqual(subprocess.check_output(['git', 'branch', '--show-current'], cwd=clone).strip(), b'main')

    def test_fetch_selection(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / 'cookie').write_text('session=test')
            with patch.object(aoc, 'ROOT', root), patch.object(aoc, 'git', return_value='2015'), patch.object(aoc.subprocess, 'run') as run:
                aoc.fetch('03', None)
                self.assertIn('-day', run.call_args.args[0])
                self.assertIn('3', run.call_args.args[0])
                self.assertIn(str(root / 'days'), run.call_args.args[0])
                aoc.fetch('all', None)
                self.assertIn('-all', run.call_args.args[0])
                self.assertNotIn('-day', run.call_args.args[0])
                with self.assertRaises(ValueError):
                    aoc.fetch('03', 2024)
                with self.assertRaises(ValueError):
                    aoc.fetch('26', None)

    @unittest.skipUnless(shutil.which('node'), 'Node.js required')
    def test_runner_uses_shared_input_independent_of_cwd(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / 'scripts').mkdir()
            shutil.copy2(ROOT / 'scripts/run-js.mjs', root / 'scripts/run-js.mjs')
            day = root / 'days/day-03'
            (day / 'js').mkdir(parents=True)
            (day / 'input').write_text('abc\n')
            (day / 'js/package.json').write_text('{"type":"module"}')
            (day / 'js/solution.js').write_text('export default {part1: input => input.length, part2: input => input.toUpperCase()};')
            result = subprocess.run(['node', str(root / 'scripts/run-js.mjs'), '03'], cwd=root / 'scripts', capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn('part1: 3', result.stdout)
            self.assertIn('part2: ABC', result.stdout)
            missing = subprocess.run(['node', str(root / 'scripts/run-js.mjs'), '04'], capture_output=True)
            self.assertNotEqual(missing.returncode, 0)


if __name__ == '__main__':
    unittest.main()
