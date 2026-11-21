# Advent of Code 2026

## Struktur

```text
days/day-XX/
├── README.md       # Aufgabe, falls vorhanden
├── input           # gemeinsamer persönlicher Input, gitignored
├── example.txt     # Beispielinput, falls vorhanden
└── <sprache>/      # js, ts, python, c, cpp, go, rust, bash
utils/<sprache>/    # gemeinsame Helfer
```

Alternative Ansätze liegen im Sprachordner, zusätzliche Aufgabenfassungen unter `notes/`.

## Einrichtung prüfen

`make doctor` prüft Python, Node.js, die Go-Mindestversion aus `fetchPuzzles/go.mod` und die lokale Datei `cookie`. Führe den Befehl im Jahres-Worktree aus. Der Cookie-Wert wird weder ausgegeben noch online geprüft.

## Download

Go ab 1.26, Python ab 3.9, Git und GNU Make erforderlich. Im Branch-Hauptverzeichnis eine lokale `cookie`-Datei mit dem Wert des AoC-Cookies `session` anlegen (`session=` ist optional):

```sh
make fetch 03
make fetch all             # nur abgeschlossene Jahre
make next_year             # neuen Jahres-Worktree vorbereiten
```

Downloads überschreiben `README.md` und `input` des jeweiligen Tages. Cookies und persönliche Inputs niemals committen.

## Lösungen ausführen

Für JavaScript (Node.js ab 22) ändere `DAY` in `bootstrap.js` und starte `make js`. `make js DAY=03` wählt einmalig einen anderen Tag; `make js DAY=all` startet alle JS-Module mit vorhandenem Input.

Der Einstiegspunkt ist `days/day-XX/js/dayXX.js`. Starte ihn aus dem Sprachordner mit `node dayXX.js`, oder nutze `make js DAY=XX` im Repo-Hauptverzeichnis. Der Einstiegspunkt kann `part1` und `part2` aus separaten Dateien importieren und exportieren. Der Runner übergibt den Tagesinput an die Funktionen:

```js
export function part1(input) {
  return input.split("\n").length;
}
```

`part2(input)` funktioniert genauso; ein Default-Export wie `export default { part1, part2 }` wird ebenfalls unterstützt. Falls du den Input direkt im Modul brauchst:

```js
import { readInput } from "../../../bootstrap.js";

const input = readInput(import.meta.url);
```

### C, Rust und Tests

| Befehl | Verhalten |
| --- | --- |
| `make js test` | Führt `*.test.js`-Dateien aus; andernfalls ruft es vorhandene `Tests()`- oder `test()`-Funktionen auf. |
| `make c` | Kompiliert `c/main.c` oder startet die separat kompilierten `c/part*.c`. |
| `make c test` | Kompiliert und startet jede eigenständige `c/test*.c` mit eigenem `main()`. |
| `make rust` | Startet das Tagesprojekt mit Cargo; bei mehreren Binaries z. B. `BIN=part1` angeben. |
| `make rust test` | Führt `cargo test` für jedes Rust-Tagesprojekt aus. |

Die Testbefehle durchsuchen alle Tage; mit `DAY=03` beschränkst du sie auf einen Tag. Normale Läufe nutzen `DAY` aus `bootstrap.js`, wenn kein Tag angegeben ist. C und Rust starten im Sprachordner und erhalten den Input-Pfad `../input` als Argument. C benötigt einen Compiler (`CC`, Standard `cc`), Rust benötigt Cargo. Ältere Rust-Projekte mit `include_str!` für den persönlichen Input benötigen ihn auch beim Kompilieren der Tests.

Eigenständige Programme aus dem jeweiligen Sprachordner starten. Abhängigkeiten und Build-Befehle stehen in der jeweiligen `package.json`, `Cargo.toml` oder `Makefile`. Tagesinputs liegen eine Ebene über dem Sprachordner. Bei Rust-Dateien mit `include_str!` muss der Input vor dem Kompilieren vorliegen.

Downloader-Tests ohne echte AoC-Anfragen: `make -C fetchPuzzles test`.
