#!/usr/bin/env bash
# Avvia in locale il NovaOS Theme Studio (editor visuale), la galleria launcher
# e la shell reale di NovaOS sotto /shell/ (per l'anteprima interattiva).
# Zero dipendenze: usa server.py (http.server di Python 3).
#
# Uso:   ./run-studio.sh [porta]      (porta predefinita: 8099)
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${1:-8099}"
STUDIO="http://localhost:${PORT}/studio/"
GALLERY="http://localhost:${PORT}/gallery/launcher-lab.html"
SHELL_PREVIEW="http://localhost:${PORT}/shell/index.html?preview=1"

echo "NovaOS Theme Studio"
echo "  Editor          → ${STUDIO}"
echo "  Galleria        → ${GALLERY}"
echo "  Shell reale     → ${SHELL_PREVIEW}"
echo "  (Ctrl+C per fermare il server)"

# prova ad aprire il browser (senza bloccare se non disponibile)
( sleep 1; (command -v xdg-open >/dev/null && xdg-open "${STUDIO}" \
    || command -v open >/dev/null && open "${STUDIO}") >/dev/null 2>&1 ) &

cd "${DIR}"
exec python3 server.py "${PORT}"
