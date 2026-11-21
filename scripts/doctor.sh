#!/bin/sh
# Run from the repository root via make doctor.
status=0

check_version() {
    label=$1 command=$2 minimum=$3
    shift 3
    if ! command -v "$command" >/dev/null 2>&1; then
        printf '[FEHLT] %s: %s installieren (ab %s)\n' "$label" "$command" "$minimum"
        status=1
        return
    fi
    version=$("$command" "$@" 2>/dev/null |
        awk 'match($0, /[0-9]+\.[0-9]+(\.[0-9]+)?/) { print substr($0, RSTART, RLENGTH); exit }')
    if [ -n "$version" ] && awk -v have="$version" -v need="$minimum" 'BEGIN {
        split(have, h, "."); split(need, n, ".");
        for (i = 1; i <= 3; i++) {
            if (h[i] + 0 > n[i] + 0) exit 0;
            if (h[i] + 0 < n[i] + 0) exit 1;
        }
        exit 0;
    }'; then
        printf '[OK] %s %s (ab %s)\n' "$label" "$version" "$minimum"
    else
        printf '[FEHLER] %s: %s gefunden, ab %s erforderlich\n' "$label" "${version:-Version unbekannt}" "$minimum"
        status=1
    fi
}

check_version Python python3 3.9 --version
check_version Node.js node 22.0 --version
go_min=$(awk '$1 == "go" { print $2; exit }' fetchPuzzles/go.mod)
if [ -n "$go_min" ]; then
    check_version Go go "$go_min" version
else
    printf '[FEHLER] Go-Mindestversion in fetchPuzzles/go.mod nicht gefunden\n'
    status=1
fi

if [ -f cookie ] && [ -r cookie ] && awk 'NF { found = 1 } END { exit !found }' cookie; then
    printf '[OK] cookie vorhanden (Session nicht online geprüft)\n'
else
    printf '[FEHLT] Lesbare, nicht leere Datei cookie mit dem AoC-Session-Wert anlegen (session= ist optional)\n'
    status=1
fi

exit "$status"
