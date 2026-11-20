# Advent of Code 2026

`2026/day-21/` enthält den zuvor unversionierten lokalen Download. Dieser Branch bewahrt den Entwurf; der Inhalt ist nicht als gültige, veröffentlichte Aufgabe oder Lösung geprüft.

## Downloader

Quellcode: `fetchPuzzles/`, Go ab 1.26.

```sh
(cd fetchPuzzles && go build -o ../getPuzzle .)
./getPuzzle 1 2026
```

Im aktuellen Arbeitsverzeichnis muss eine lokale Datei `cookie` mit `session=DEIN_SESSION_WERT` liegen. Der Downloader schreibt nach `2026/day-XX/`; historische Lösungen können Inputs an anderen Pfaden erwarten. Vorhandene Downloads werden überschrieben. Persönliche Inputs und Cookies nicht committen.

Historische Lösungspfade wurden bewusst nicht umbenannt. Aufgaben, Lösungsversuche und leere Vorlagen sind keine Aussage darüber, ob ein Tag vollständig gelöst ist.

## Stand der Aufräumaktion

Dieser Worktree ist eine **uncommittete Vorbereitung** der Branch-Trennung. Erst ein späterer Commit hält die getrennten Inhalte im Branch fest. Es wurde nichts gepusht.

Die zentrale Dokumentation zum Tool und zur Jahresstruktur liegt auf `main`.

## Neuer make-Workflow

`make fetch 03` lädt Tag 03 für dieses Jahr nach `days/day-03/README.md` und `days/day-03/input`. Dafür im Worktree eine lokale `cookie`-Datei mit `session=DEIN_WERT` anlegen. Bestehende Downloads werden überschrieben. Historische Lösungspfade bleiben unverändert; Input-Zugriffe bei Bedarf auf `days/day-XX/input` anpassen.

`make next_year` erstellt den nächsten Jahres-Branch mit 25 Tagesordnern in einem separaten Worktree; `YEAR=YYYY` legt das Jahr explizit fest. Keine Commits oder Pushes. Python ab 3.9, Go ab 1.26 und GNU Make erforderlich. Lösungen liegen künftig unter `days/day-XX/<sprache>/`, mit einem gemeinsamen Input pro Tag.

Downloader aktualisiert: Go ab 1.26. Standardziel auch bei direktem Aufruf ist `days/day-XX/`. `./getPuzzle 03` erkennt das Jahr aus dem Branch; alternativ `-year JAHR -day TAG`. `-output` und `-cookie` erlauben andere Pfade. Alte Positionsaufrufe bleiben unterstützt. Nur Aufgabenartikel werden konvertiert; HTTP-/Parserfehler lassen vorhandene Dateien unverändert. Inputs werden mit 0600 gespeichert. Tests: `make -C fetchPuzzles test`.

`make fetch all` lädt alle Tage dieses Jahres (nur abgeschlossene Jahre). Bestehende Downloads werden überschrieben; zwei Sekunden Pause zwischen Tagen, Abbruch beim ersten Fehler.
