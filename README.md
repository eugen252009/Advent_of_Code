# Advent of Code

Mein Archiv für [Advent of Code](https://adventofcode.com/) und mein Go-Tool zum Herunterladen von Aufgaben und persönlichen Eingaben.

## Branches statt gemischter Jahre

`main` enthält die Dokumentation und den Downloader in `fetchPuzzles/`. Aufgaben und Lösungen gehören in den Branch des jeweiligen Jahres:

| Branch | Inhalt |
| --- | --- |
| `2015` | Aufgaben für Tag 01–25, vorhandene JavaScript- und Python-Lösungen |
| `2022` | Vorhandene Lösungen für Tag 01–05 in mehreren Sprachen |
| `2023` | Aufgaben für Tag 01–25 und vorhandene Lösungen |
| `2024` | Vorhandene Aufgaben und JS-Lösungen sowie die Rust-Lösung aus dem bisherigen Jahres-Branch |
| `2026` | Lokaler Download-Entwurf; kein abgeschlossener AoC-Jahrgang |

Alle Tage bedeutet nicht, dass alle Rätsel gelöst sind: Manche Dateien sind nur Aufgabenbeschreibungen oder Lösungsvorlagen. Fehlende Aufgaben werden nicht künstlich als gelöst angelegt.

## Jahres-Workflow mit make

Zusätzlich zu Go werden Python ab 3.9 und GNU Make benötigt.

```sh
make next_year            # höchster vorhandener Jahres-Branch + 1
make next_year YEAR=2027  # Jahr explizit wählen
```

Das erstellt einen lokalen Branch vom bisherigen `main` und einen separaten Worktree unter `../Advent_of_Code-years/<Jahr>/`. Dort werden das aktuelle Tooling, eine Jahres-README, `utils/` und 25 Tagesordner vorbereitet. Alte Jahresinhalte werden nicht übernommen. Existierende Branches oder Verzeichnisse werden nicht überschrieben. Keine Commits, kein Staging, kein Push; der aktuelle Worktree bleibt ausgecheckt.

Im neuen Jahres-Worktree:

```sh
make fetch 03             # Jahr aus dem Branch-Namen
make fetch all            # alle Tage eines abgeschlossenen Jahres
# alternativ auf main: make fetch all YEAR=2024
```

Mit `YEAR=2027` funktioniert der Download auch außerhalb eines Jahres-Branches. Ein abweichendes Jahr im Jahres-Branch wird abgelehnt. `cookie` muss im jeweiligen Worktree liegen und wird nicht aus anderen Worktrees kopiert.

```text
days/day-03/
├── README.md       # heruntergeladene Aufgabe
├── input           # gemeinsamer persönlicher Input, gitignored
├── example.txt     # optionaler Beispielinput
├── js/             # bei Bedarf selbst anlegen
├── python/
└── rust/
```

Sprachordner und Lösungen werden nicht künstlich erzeugt. `make fetch` überschreibt Aufgabe und Input; bei HTTP-Fehlern oder fehlender Aufgabenbeschreibung wird nichts geschrieben. Die historischen Lösungspfade bereits vorhandener Jahre bleiben unverändert: deren Programme müssen für neue Downloads gegebenenfalls auf `days/day-XX/input` angepasst werden.

## Downloader bauen

Voraussetzungen: Go ab 1.26, `make` (optional), Internetzugang und eine gültige Advent-of-Code-Session.

```sh
make build
# alternativ:
(cd fetchPuzzles && go build -o ../getPuzzle .)
```

Der Build erzeugt `getPuzzle` im Repository-Hauptverzeichnis. Die Binärdatei wird nicht versioniert.

## Session einrichten

Nach der Anmeldung auf adventofcode.com den Wert des Cookies `session` aus dem Browser in einer lokalen Datei `cookie` hinterlegen:

```text
session=DEIN_SESSION_WERT
```

Die Datei liegt im **aktuellen Arbeitsverzeichnis**, aus dem der Downloader gestartet wird. Cookie niemals committen oder teilen. Persönliche Eingaben (`input`, `input.txt`) sind ebenfalls ignoriert.

## Aufgaben herunterladen

```sh
./getPuzzle -h                     # Hilfe und alle Optionen
./getPuzzle 03                     # Jahr aus dem aktuellen Jahres-Branch
./getPuzzle -year 2015 -day 1      # Jahr explizit angeben
./getPuzzle -year 2015 -all        # alle Tage eines abgeschlossenen Jahres
./getPuzzle 1 2015                 # alter Aufruf bleibt unterstützt
```

Das Tool lädt den persönlichen Input und wandelt die Aufgaben-Webseite mit `html-to-markdown` um:

```text
days/
└── day-01/
    ├── README.md
    └── input
```

Alle Pfade sind relativ zum aktuellen Arbeitsverzeichnis. Standardziel ist immer `days/`, auch beim alten Positionsaufruf. Mit `-output inputs/2015` kann explizit das historische Layout gewählt werden. `-cookie /pfad/zur/datei` wählt eine andere Cookie-Datei; auch ein reiner Session-Wert ohne `session=` ist erlaubt.

Es werden nur die eigentlichen Aufgabenartikel konvertiert, einschließlich Teil 2, sofern für die Session freigeschaltet. Links werden absolut aufgelöst. Jahresabrufe warten zwischen Tagen zwei Sekunden und stoppen beim ersten Fehler. Weiterleitungen, leere/HTML-Eingaben und übergroße Antworten werden abgelehnt; bei Download- oder Parserfehlern bleiben vorhandene Dateien erhalten. Dateien werden zunächst temporär geschrieben und einzeln atomar ersetzt (kein atomarer Austausch des Dateipaars). Inputs erhalten Dateirechte `0600`.

Tests ohne echte AoC-Anfragen: `make -C fetchPuzzles test`.

Achtung: Vorhandene `input`- und `README.md`-Dateien werden überschrieben. Nur bereits freigeschaltete Tage abrufen. Das Tool prüft HTTP-Status und Aufgabenbeschreibung und bricht bei Fehlern ab. Es löst keine Rätsel und reicht keine Antworten ein.

## Aufbau der Jahres-Branches

Historische Pfade bleiben erhalten, damit relative Imports und Dateizugriffe nicht durch diese Aufräumaktion verändert werden:

```text
inputs/<Jahr>/day-XX/   # Aufgaben, lokale Eingaben, oft Lösungen je Sprache
inputs/2022/XX/        # älteres Layout mit numerischen Tagesordnern
solutions/python/     # historischer Ordnername für die JS-/Python-Lösungen von 2015
solutions/js/         # JS-Lösungen von 2024
2024/XX/              # weitere Lösungen von 2024
utils/                # gemeinsam verwendete JS-Helfer in Jahres-Branches
fetchPuzzles/         # Downloader-Quellcode
```

Die jeweilige Jahres-README beschreibt die vorhandenen Dateien. Laufzeiten und Werkzeuge richten sich nach der Lösung (z. B. Bun/Node.js, Python, Cargo oder ein C-Compiler). Es gibt keinen universellen Test- oder Lösungsbefehl für alle Jahre.

## Lokale Vorbereitung ohne Commits

Die Jahres-Branches sind derzeit in separaten Worktrees unter `../Advent_of_Code-years/<Jahr>/` ausgecheckt. Ihre bereinigten Dateistände und dieser `main` sind **noch nicht committet**. Die Branch-Referenzen zeigen bis dahin weiterhin auf ihre bisherigen Ausgangs-Commits; Links auf GitHub zeigen die neue Aufteilung erst nach späteren Commits und einem Push.

```sh
git worktree list
git -C ../Advent_of_Code-years/2015 status --short
git -C ../Advent_of_Code-years/2015 diff
```

Nicht per `git switch 2015` wechseln, solange der Branch im Worktree geöffnet ist; stattdessen im entsprechenden Verzeichnis arbeiten. Vor dem späteren Commit auch neue Dateien prüfen (`git diff` allein zeigt unversionierte Dateien nicht).

Eine lokale Sicherung des ursprünglichen Arbeitsverzeichnisses einschließlich der vorher geänderten Binärdatei und des unversionierten Downloads liegt unter `.git/cleanup-backup/`. Sie wird nicht gepusht und ist kein Ersatz für ein externes Backup.
