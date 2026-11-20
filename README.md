# Advent of Code

Downloader und persönliche Lösungen für [Advent of Code](https://adventofcode.com/).

**`main` enthält nur das Tooling und diese Anleitung. Aufgaben und Lösungen liegen in den Jahres-Branches.**

## Jahre

[2015](../../tree/2015) · [2022](../../tree/2022) · [2023](../../tree/2023) · [2024](../../tree/2024) · [2026](../../tree/2026)

Die Branches enthalten die vorhandenen Aufgaben und Lösungsversuche, nicht zwingend vollständige Lösungen. `2026` enthält bisher nur einen lokalen Download-Entwurf.

## Voraussetzungen

Go **1.26+**, Python **3.9+**, Git und GNU Make.

## Neues Jahr vorbereiten

```sh
make next_year             # höchster vorhandener Jahres-Branch + 1
make next_year YEAR=2027   # Jahr explizit wählen
```

Erstellt einen Branch und einen separaten Worktree unter `../Advent_of_Code-years/<Jahr>/` mit Tagesordnern, README und Tooling. Bestehende Branches werden nicht überschrieben. Der Befehl erstellt keine Commits und pusht nichts.

Danach im neuen Worktree arbeiten:

```sh
cd ../Advent_of_Code-years/2027
```

## Aufgaben und Inputs laden

Im Jahres-Worktree eine lokale Datei `cookie` mit dem Session-Cookie von adventofcode.com anlegen:

```text
session=DEIN_SESSION_WERT
```

```sh
make fetch 03             # Tag 03, Jahr aus dem Branch-Namen
make fetch all            # alle Tage eines abgeschlossenen Jahres
```

Außerhalb eines Jahres-Branches das Jahr angeben: `make fetch 03 YEAR=2024`.

Downloads überschreiben vorhandene Aufgaben und Inputs. Bei HTTP- oder Parserfehlern bleiben vorhandene Dateien unverändert. Jahresabrufe warten zwei Sekunden zwischen Tagen und stoppen beim ersten Fehler. **Cookies und persönliche Inputs niemals committen.**

## Aufbau eines Jahres

```text
days/
└── day-03/
    ├── README.md       # Aufgabe
    ├── input           # persönlicher Input, gitignored
    ├── example.txt     # optionaler Beispielinput
    ├── js/             # Lösungen je Sprache, bei Bedarf anlegen
    ├── python/
    └── rust/
utils/                  # gemeinsame Helfer je Sprache
```

Alle Jahres-Branches verwenden einheitlich `days/day-XX/`. Alle Sprachen teilen sich denselben Tagesinput. C++ liegt unter `cpp/`, TypeScript unter `ts/`. Alternative Ansätze bleiben erhalten; Build-Artefakte werden nicht versioniert.

JS-Module mit `part1`/`part2` lassen sich mit `make js DAY=03` starten (Node.js ab 22). Eigenständige Programme aus dem jeweiligen Sprachordner starten; Details stehen in der Jahres-README.

## Downloader direkt nutzen

```sh
make build
./getPuzzle -h
./getPuzzle 03                         # Jahr aus dem Branch
./getPuzzle -year 2015 -day 3
./getPuzzle -year 2015 -all
```

Standardziel ist `days/day-XX/`. Mit `-output` und `-cookie` lassen sich Zielverzeichnis und Cookie-Datei wählen. Pfade beziehen sich auf das aktuelle Arbeitsverzeichnis; Flags stehen vor Positionsargumenten.

Quellcode: [`fetchPuzzles/`](fetchPuzzles/). Branch- und Make-Workflow: [`scripts/aoc.py`](scripts/aoc.py).

```sh
make -C fetchPuzzles test  # lokale Tests und go vet, ohne echte AoC-Anfragen
```
