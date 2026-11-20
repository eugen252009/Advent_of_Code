# Advent of Code 2015

JS-Lösungen und Vorlagen für alle 25 Tage. Tag 01 enthält außerdem Python. Tag 03 enthält unter `js/part1.js` und `js/run-alternative.js` einen weiteren Lösungsansatz. Die zusätzliche Aufgabenfassung bei Tag 01 bleibt unter `notes/` erhalten.

## Struktur

```text
days/day-XX/
├── README.md       # Aufgabe, falls vorhanden
├── input           # gemeinsamer persönlicher Input, gitignored
├── example.txt     # Beispielinput, falls vorhanden
└── <sprache>/      # js, ts, python, c, cpp, go, rust, bash
utils/<sprache>/    # gemeinsame Helfer
```

Es gibt nur noch dieses Tageslayout, keine separaten `inputs/`- oder `solutions/`-Ordner. Sprachordner werden nur für vorhandene Lösungen angelegt. Alternative Ansätze bleiben im Sprachordner, zusätzliche Aufgabenfassungen unter `notes/` erhalten.

## Download

Go ab 1.26, Python ab 3.9, Git und GNU Make erforderlich. Im Branch-Hauptverzeichnis eine lokale `cookie`-Datei mit `session=DEIN_WERT` anlegen:

```sh
make fetch 03
make fetch all             # nur abgeschlossene Jahre
make next_year             # neuen Jahres-Worktree vorbereiten
```

Downloads überschreiben `README.md` und `input` des jeweiligen Tages. Cookies und persönliche Inputs niemals committen.

## Lösungen ausführen

JS-Module mit exportierten `part1`/`part2`-Funktionen (2015 und 2024):

```sh
make js DAY=01             # Node.js ab 22
make js                    # Module mit vorhandenem Input ausführen
```

Für Tag 04 von 2015 zuerst die Abhängigkeiten in `days/day-04/js/` installieren. Python Tag 01: `python3 days/day-01/python/run.py`.

Eigenständige Programme (insbesondere 2022/2023) aus dem jeweiligen Sprachordner starten. Sie lesen den gemeinsamen Tagesinput als `../input`. Rust-`include_str!` ist relativ zur Quelldatei; Inputs müssen vor dem Kompilieren vorhanden sein. Abhängigkeiten und Build-Befehle stehen in der jeweiligen `package.json`, `Cargo.toml` oder `Makefile`. Vorhandene Beispielinputs liegen auf Tagesebene; manche Lösungsversuche verwenden weiterhin bewusst Beispiele.

Die Aufräumaktion ändert keine Lösungsalgorithmen: Unfertige Programme, Vorlagen und bekannte Lösungsfehler werden dadurch nicht automatisch funktionsfähig. Leere Tagesordner sind kein gelöstes Rätsel.

Downloader-Tests ohne echte AoC-Anfragen: `make -C fetchPuzzles test`.
