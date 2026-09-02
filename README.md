# NovaOS Theme Studio — build statica (dist/)

Questa cartella è la **build statica** dello Studio: `studio/`, `gallery/` e una copia
della **shell reale** di NovaOS (`shell/`) pubblicate fianco a fianco. Si pubblica su
**qualsiasi hosting statico** (GitHub Pages, Netlify, Vercel, Altervista, un server
web qualunque): **niente Python, niente server, zero build** — solo file da servire.

Generata con `./build-static.sh` dalla radice di `novaos-theme-studio/`.

## Pubblicare

Basta servire questa cartella come root del sito. Due modi comuni:

- **GitHub Pages** (o un'altra pagina di progetto): metti `dist/` nel ramo `gh-pages`
  (o nella cartella di pubblicazione di Pages) e il sito è online.
  Il file `.nojekyll` evita che Pages ignori file/percorsi che iniziano con `_`.
- **Netlify Drop**: trascina la cartella `dist/` su <https://app.netlify.com/drop>.
- **Altervista**: carica il contenuto di `dist/` nella `htdocs` del sito.

### Test locale prima di pubblicare

```bash
python3 -m http.server 8123 --directory dist
# apri http://localhost:8123/studio/
```

> Da `file://` l'anteprima «Reale» può non funzionare (accesso all'iframe limitato):
> usare sempre http/https, anche solo in locale.

## Cosa funziona e cosa no

| Funzione | Hosting statico | Server (`./run-studio.sh`) |
|----------|-----------------|---------------------------|
| Editor completo + esporta/importa `.novatheme/2` | ✅ | ✅ |
| Anteprima **Modello** | ✅ | ✅ |
| Anteprima **Reale** (shell in iframe, postMessage) | ✅ (serve `shell/` accanto) | ✅ |
| Pannello **Sul dispositivo** (feed `/theme/current`) | ❌ — mostrata una nota | ✅ |

Senza il server non c'è l'endpoint `/theme/current`, quindi il feed **live sul
dispositivo** non è disponibile: lo Studio lo rileva all'avvio e mostra una nota al
posto dell'URL. Il tema si usa comunque: **Esporta** il `.novatheme` e importalo su
NovaOS (Impostazioni → Display → Importa tema), oppure condividilo come file.

## Struttura

```
dist/
├── studio/index.html     lo Studio (editor + anteprima)
├── gallery/launcher-lab.html   la galleria launcher (anteprima interattiva)
├── shell/                copia della shell reale (per l'anteprima «Reale»)
├── README.md             questo file
└── .nojekyll             (solo per GitHub Pages)
```

La shell è una **copia** di `../web-phone-os/shell` al momento della build:
se NovaOS avanza, rigenera la dist con `./build-static.sh`.
