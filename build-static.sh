#!/usr/bin/env bash
# Genera dist/ : la build statica distribuita dello Studio.
# Pubblica studio/ e gallery/ fianco a fianco con una copia della shell reale
# (../os/shell), così l'anteprima «Reale» funziona anche su un hosting
# statico, senza il server.py. Rigenera sempre: cancella dist/ e ricopia.
set -euo pipefail
cd "$(dirname "$0")"

OUT=dist
SHELL_SRC="../os/shell"

rm -rf "$OUT"
mkdir -p "$OUT"

cp -r studio "$OUT/studio"
cp -r gallery "$OUT/gallery"

if [ -d "$SHELL_SRC" ]; then
  mkdir -p "$OUT/shell"
  cp -r "$SHELL_SRC"/. "$OUT/shell/"
else
  echo "AVVISO: $SHELL_SRC non trovata → l'anteprima «Reale» non funzionerà nella dist."
fi

# README di distribuzione + .nojekyll (GitHub Pages non ignora file con _)
[ -f README-STATIC.md ] && cp README-STATIC.md "$OUT/README.md"
touch "$OUT/.nojekyll"

echo "✔ Build statica pronta in $OUT/"
echo "  Test locale:  python3 -m http.server 8123 --directory $OUT"
echo "  Poi apri http://localhost:8123/studio/"
