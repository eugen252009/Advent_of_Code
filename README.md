# Advent of Code

Downloader und persönliche Lösungen für [Advent of Code](https://adventofcode.com/).

**`main` enthält nur das Tooling und diese Anleitung. Aufgaben und Lösungen liegen in den Jahres-Branches.**

## Schnellstart: eigener AoC-Fork

Voraussetzungen: Go **1.26+**, Python **3.9+**, Git und GNU Make.

1. Auf GitHub **Fork** wählen und **Copy the `main` branch only** aktiviert lassen. Die Jahres-Branches brauchst du nicht.
2. Deinen eigenen Fork klonen (URL und Verzeichnisnamen anpassen):

   ```sh
   git clone --single-branch --branch main https://github.com/DEIN-NAME/Advent_of_Code.git
   cd Advent_of_Code
   make build
   make next_year
   ```

3. Den ausgegebenen `cd`-Befehl ausführen. Dort deinen eigenen AoC-Session-Cookie einrichten und `make fetch 01` starten, sobald Tag 01 freigeschaltet ist.

`make next_year` startet auf einem frischen Fork mit dem laufenden Jahr, sonst mindestens mit dem Jahr nach dem höchsten vorhandenen Jahres-Branch. Zum Üben mit einem früheren Jahr: `make next_year YEAR=2024`. Der Befehl legt Branch und separates Arbeitsverzeichnis unter `../<Repo-Name>-years/<Jahr>/` an, ohne etwas zu committen oder zu pushen. `main` bleibt unverändert.

Wenn du deine Lösungen veröffentlichen möchtest, prüfe `git status`, committe sie und pushe deinen Jahres-Branch mit `git push -u origin HEAD` **aus dem Jahres-Worktree**.

## Einrichtung prüfen

`make doctor` prüft Python, Node.js, die Go-Mindestversion aus `fetchPuzzles/go.mod` und die lokale Datei `cookie`. Führe den Befehl im Jahres-Worktree aus. Der Cookie-Wert wird weder ausgegeben noch online geprüft.

## Aufgaben und Inputs laden

Im Jahres-Worktree eine lokale Datei `cookie` mit dem Wert des AoC-Cookies `session` anlegen (`session=` ist optional):

```text
DEIN_SESSION_WERT
```

```sh
make fetch 01             # Tag 01, Jahr aus dem Branch-Namen
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

Für JavaScript (Node.js ab 22) ändere `DAY` in `bootstrap.js` und starte `make js`. `make js DAY=03` wählt einmalig einen anderen Tag; `make js DAY=all` startet alle JS-Module mit vorhandenem Input.

Der Einstiegspunkt ist `days/day-XX/js/dayXX.js`. Starte ihn aus dem Sprachordner mit `node dayXX.js`, oder nutze `make js DAY=XX` im Repo-Hauptverzeichnis. Der Einstiegspunkt kann `part1` und `part2` aus separaten Dateien importieren und exportieren. Der Runner übergibt den Tagesinput an die Funktionen:

In `part01.js` und `part02.js` stehen die benannten Funktions-Exports, zum Beispiel:

```js
/** @param {string} input */
export function part1(input) {
  return input.split("\n").length;
}
```

`dayXX.js` verbindet die Teile. Tests kannst du in `part01.test.js` und `part02.test.js` ablegen.

```js
import { isMain, readInput, runParts } from "../../../bootstrap.js";
import { part1 } from "./part01.js";
import { part2 } from "./part02.js";

export { part1, part2 };
export const loadInput = () => readInput(import.meta.url);

if (isMain(import.meta.url)) {
  await runParts({ part1, part2 }, loadInput);
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

## Beispiel-Jahrgänge im Originalrepo

[2015](https://github.com/eugen252009/Advent_of_Code/tree/2015) · [2022](https://github.com/eugen252009/Advent_of_Code/tree/2022) · [2023](https://github.com/eugen252009/Advent_of_Code/tree/2023) · [2024](https://github.com/eugen252009/Advent_of_Code/tree/2024)

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
