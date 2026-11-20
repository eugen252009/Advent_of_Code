# Advent of Code 2026

Tag 21 enthält lediglich den bisherigen Download-Entwurf, keine bestätigte Aufgabe oder Lösung. Die übrigen Ordner sind Vorlagen.

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

Die Programme dieses Branches werden einzeln gestartet; der JS-Sammelrunner ist für Module mit exportierten Lösungsfunktionen gedacht.

Eigenständige Programme (insbesondere 2022/2023) aus dem jeweiligen Sprachordner starten. Sie lesen den gemeinsamen Tagesinput als `../input`. Rust-`include_str!` ist relativ zur Quelldatei; Inputs müssen vor dem Kompilieren vorhanden sein. Abhängigkeiten und Build-Befehle stehen in der jeweiligen `package.json`, `Cargo.toml` oder `Makefile`. Vorhandene Beispielinputs liegen auf Tagesebene; manche Lösungsversuche verwenden weiterhin bewusst Beispiele.

Die Aufräumaktion ändert keine Lösungsalgorithmen: Unfertige Programme, Vorlagen und bekannte Lösungsfehler werden dadurch nicht automatisch funktionsfähig. Leere Tagesordner sind kein gelöstes Rätsel.

Downloader-Tests ohne echte AoC-Anfragen: `make -C fetchPuzzles test`.
