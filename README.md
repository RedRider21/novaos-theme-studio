# NovaOS Theme Studio

Ambiente **esterno** e autonomo per creare interfacce/temi personalizzati per
[NovaOS](https://github.com/dPlusOS21/NovaOS) — come fanno gli icon-pack e i temi dei
launcher Android, ma tutto in HTML5/JS e **senza dipendenze esterne**.

Questo repository è il **progetto companion** deciso durante lo sviluppo di NovaOS: il
*motore temi* vive dentro NovaOS, mentre qui vive lo *strumento di autoring* con cui
progettisti e terze parti costruiscono un tema, lo vedono in anteprima dal vivo e lo
esportano come pacchetto `.novatheme` che qualsiasi NovaOS può importare e applicare.

> **Stato: editor visuale completo** con anteprima **dal vivo e interattiva**. Lo Studio
> copre identità, launcher, colori, icone (icon-pack + override), sfondo, suoni, tipografia;
> valida il tema e lo esporta/importa come `.novatheme/2`. L'editor ha **annulla/rifai,
> salvataggio automatico e miniatura dal vivo**. La novità principale è
> l'**anteprima «Reale»**: carica la shell vera di NovaOS in un iframe e la pilotata via
> `postMessage`, quindi ogni interazione funziona davvero — il Drawer si apre cliccando
> l'icona ☰, i launcher si cambiano al volo, le app si avviano. In più, il pannello
> **«Sul dispositivo»** pubblica il tema su un feed che la **build installata** (APK/WebView)
> polla e applica dal vivo, senza postMessage. Lo Studio si distribuisce anche come
> **build statica** (`./build-static.sh` → `dist/`) per qualsiasi hosting (GitHub Pages,
> Netlify, Altervista), senza Python né server.

---

## Perché esiste (il problema)

NovaOS è uno smartphone-OS la cui interfaccia è una **web shell** (HTML/CSS/JS) su base
Android minimale (stile Firefox OS/KaiOS). L'obiettivo finale è una **ROM a sé stante**
con questa interfaccia come UI definitiva (non più APK/launcher).

Serve permettere a **terze parti** di personalizzare l'aspetto dei dispositivi:
colori, sfondo, forma e set di icone (es. da Bootstrap Icons / Font Awesome, scaricati e
**inclusi offline**, mai via CDN), suoni/suonerie. Poiché tutto è HTML5/JS, un tema è
essenzialmente un insieme di **variabili CSS + asset**, quindi il formato è semplice e
uno strumento visuale di creazione è realizzabile interamente lato browser.

Due lati, volutamente separati:

| Lato | Dove vive | Ruolo |
|------|-----------|-------|
| **Motore temi** | dentro NovaOS (`shell/js/os.js`) | importa/valida/applica un `.novatheme` |
| **Theme Studio** | qui (questo repo) | crea/anteprima/esporta un `.novatheme` |

Il **contratto** che li tiene insieme è il formato `.novatheme` descritto sotto: se lo
Studio produce un pacchetto valido, ogni NovaOS lo sa applicare.

---

## Il formato `.novatheme` (contratto)

Un tema è un file JSON (estensione `.novatheme.json`, o `.novatheme` in uno zip quando
include asset binari come immagini/icone). Schema completo in
[`schema/theme.schema.json`](schema/theme.schema.json); esempio in
[`examples/nova-midnight.novatheme.json`](examples/nova-midnight.novatheme.json).

```jsonc
{
  "format": "novatheme/1",
  "meta":   { "id": "nova-midnight", "name": "Nova Midnight",
              "author": "Studio", "version": "1.0.0", "base": "dark" },

  // variabili CSS del tema (mappano 1:1 le --var di NovaOS)
  "colors": {
    "bg": "#0b0f17", "bg-2": "#121826", "surface": "#1a2130", "surface-2": "#232c3d",
    "text": "#e8ecf4", "text-dim": "#9aa4b8",
    "accent": "#6d8bff", "accent-2": "#a663ff", "danger": "#ff5b6e", "ok": "#35d0a0"
  },

  "shape":  { "radius": 22, "radiusSm": 14, "iconStyle": "filled" },  // filled | outline

  "wallpaper": { "type": "gradient", "value": "radial-gradient(130% 80% at 50% 0%, #3c5fa5 0%, transparent 58%)" },
  // oppure { "type": "image", "value": "data:image/webp;base64,..." }
  // oppure { "type": "solid",  "value": "#0b0f17" }

  "icons": {
    "pack": "bootstrap",       // riferimento all'icon-pack usato (info per lo Studio)
    "shape": "circle",         // circle | squircle | square
    "map": {                    // override per singola app (id app NovaOS -> icona)
      "phone":  { "type": "svg",   "value": "<svg viewBox='0 0 16 16'>...</svg>" },
      "camera": { "type": "emoji", "value": "📷" }
    }
  },

  "sounds": {
    "ringtone": { "type": "builtin",  "value": "Nova" },   // nome di un suono integrato
    "notif":    { "type": "builtin",  "value": "Goccia" },
    "alarm":    { "type": "sequence", "value": [[740,0.24],[0,0.1],[740,0.24]] }  // [freqHz,durSec], freq 0 = pausa
  },

  "typography": {
    "textScale": 100,                   // percentuale (80–130)
    "font": "system",                   // system | serif | mono — famiglia font dell'interfaccia
    "weight": "normal"                  // normal | medium | bold — spessore testi (come "Grassetto" accessibilità)
  }
}
```

### Dove si agganciano i valori dentro NovaOS

Il motore, applicando un tema, imposta lo stato NovaOS e le variabili CSS. Riferimenti
reali nel codice attuale della shell:

- **Colori** → `document.documentElement.style.setProperty('--bg', ...)` ecc. Le variabili
  esistono già in `shell/css/style.css` (`:root` per il tema scuro, `body[data-theme="light"]`
  per il chiaro): `--bg --bg-2 --surface --surface-2 --text --text-dim --accent --accent-2
  --danger --ok --radius --radius-sm`.
- **Sfondo** → `state.wallpaper` (indice nei preset `WALLS`) o `state.deskColor`; con un tema
  si passerà a un valore libero (gradiente/immagine) applicato a `#home`.
- **Forma icone** → `state.iconStyle` (`filled`/`outline`) + classe body `icons-outline`,
  variabili `--icon-color`/`--icon-bg`.
- **Icone per app** → oggi ogni app ha `icon` (emoji o data/URL) in `NovaApps` / `userApps`;
  l'override del tema mapperà `id app -> icona` (vedi `os.updateApp`).
- **Suoni** → modulo `Sounds` in `os.js` (melodie `[freqHz,durSec]`); stato `ringtone /
  notifSound / alarmSound`. I suoni `sequence` custom vengono registrati con
  `Sounds.setCustom` e riprodotti al posto dei builtin (voce «Sequenza personalizzata»).
- **Testo** → `state.textScale` (variabile `--fscale`), `state.uiFont` (font di sistema/serif/mono
  sul `body`), `state.uiWeight` (classi `tf-medium`/`tf-bold` sul `body`, stesse dell'accessibilità).

Vedi [`docs/INTEGRATION.md`](docs/INTEGRATION.md) per il dettaglio di cosa aggiungere al
motore lato NovaOS (`applyTheme(themeObj)`, import/export in Impostazioni → Personalizzazione).

---

## Cosa c'è in questo scaffold

```
novaos-theme-studio/
├── README.md                         questo file (contesto completo, autosufficiente)
├── README-STATIC.md                  README incluso nella build statica (dist/)
├── build-static.sh                   genera dist/ per hosting statico (vedi sotto)
├── schema/theme.schema.json          JSON Schema del formato .novatheme (validazione)
├── examples/nova-midnight.novatheme.json   tema d'esempio completo
├── studio/index.html                 scheletro dello Studio (editor + anteprima + export)
├── gallery/launcher-lab.html         galleria launcher (anteprima interattiva)
└── docs/INTEGRATION.md               lato NovaOS: come il motore importa/applica un tema
```

## Stato dei punti

**Fatto**
- **Anteprima reale interattiva** — lo Studio carica la shell vera di NovaOS in un iframe
  (`../shell/index.html?preview=1`, risolto dinamicamente) e le applica il tema corrente via
  `postMessage`; ogni interazione funziona (menu Drawer, cambio launcher, apertura app).
  Toggle **Modello / Reale** in alto all'anteprima.
- **Feed tema sul dispositivo (P4.10)** — il pannello **«Sul dispositivo»** mostra l'URL da
  aprire sul telefono/emulatore (`?preview=1&themeFeed=/theme/current`): a ogni modifica il
  tema viene pubblicato su `/theme/current` (endpoint del `server.py`, con **CORS aperto**)
  e la shell polla e applica dal vivo — funziona anche dall'APK (da `file://`). Il link si
  copia con un clic e viene mostrato anche per l'emulatore (`10.0.2.2`).
- **Hosting dello Studio per terze parti (P2.5)** — `./build-static.sh` genera **`dist/`**:
  Studio + galleria + una copia della shell reale fianco a fianco, pronti per qualsiasi
  hosting statico (GitHub Pages, Netlify, Altervista…) con **zero dipendenze e zero build**
  (le istruzioni viaggiano dentro la dist come `README.md`). Sullo Studio l'anteprima
  **«Reale» continua a funzionare**; lo **feed sul dispositivo** richiede il `server.py`
  (niente endpoint su hosting statico): lo Studio lo **rileva all'avvio** e mostra una nota
  al posto dell'URL. Corretto anche un bug: la pubblicazione del feed usava un path relativo
  che puntava a `/studio/theme/current` (404) invece di `/theme/current`.
- **Icon-pack con immagini (P3.6)** — oltre alle emoji, ogni app si personalizza con
  **immagini** (file locale ridimensionato a 128px, o pack con immagini). Pack **Aura**
  (icone generate in PNG con gradiente) incluso, **import/export** dei pack come JSON
  (`.novatheme` pack), badge «personalizzata» sulle icone override. In anteprima **«Reale»**
  le immagini vengono "cucinate" nel tema inviato (`icons.map` con `data:image/…`), così la
  shell le applica davvero anche coi pack interni dello Studio.
- **Tipografia gestibile (font + spessore)** — nel pannello Tipografia: **Scala testo**,
  **Font** (Sistema/Serif/Monospace) e **Spessore** (Normale/Medio/Grassetto) per tutti i
  testi dell'interfaccia. Anche l'anteprima **«Reale»** li applica (shell: `uiFont`/`uiWeight`).
- **Mini-sequencer suoni (P3.7)** — nel pannello Suoni, una griglia 8/16 passi × 8 note
  (scale **Pentatonica**/**Blues**) per comporre una melodia e salvare la sequenza come
  **suoneria/notifica/sveglia personalizzata** (`{type:"sequence", value:[[freq,dur],…]}`).
  Anteprima **WebAudio** integrata (▶ Ascolta), griglia cliccabile, «Svuota». La shell reale
  applica le sequenze custom (`Sounds.setCustom` → voce «Sequenza personalizzata» in tema).
- **UX dell'editor (P3.8)** — **annulla/rifai** (bottoni ↶/↷ nell'header + scorciatoie
  `Ctrl+Z` / `Ctrl+Shift+Z` / `Ctrl+Y`, storico fino a 60 passi, ogni modifica registra uno
  snapshot debounced), **salvataggio automatico** nel browser (`localStorage`, ripristinato
  alla riapertura, con nota «Autosalvato · ora» nell'header) e **miniatura dal vivo** del tema
  su canvas (sfondo, orologio, app, dock) aggiornata a ogni modifica insieme all'anteprima.
- **Icon-pack NovaOS (stile suite Google)** — 16 icone **vettoriali SVG** disegnate ad hoc
  per le app di base, riconoscibili e inconfondibili come quelle di Google: badge con
  **gradiente per-app** + simbolo bianco (la Galleria ha la **girandola**, il Meteo sole+nube,
  il Telefono la cornetta, l'Orologio le lancette…). Pack **«NovaOS»** selezionabile nelle
  icone; viene esportato nel tema come `{type:"svg"}` per-app e si può anche **pasticciare un
  SVG proprio** (override «SVG…»). La shell applica gli SVG convertendoli in data-URL immagine
  (mai HTML raw → nessuna iniezione) e li mostra in home e in **tutti** i launcher.
- Editor completo (identità, launcher, colori, icone, sfondo, suoni, tipografia), drag per
  riordinare la griglia, validazione/QA, esporta/importa `.novatheme/2`.
- Lato NovaOS: palette applicata al telefono, gestione temi installati, condivisione,
  negozio temi (catalogo + download da URL). Con i launcher alternativi la shell nasconde
  la widget orologio di sistema in alto (i launcher portano il proprio) e **testi/cifre**
  hanno lo stesso **spessore** del modello (tessere/cover 700, elenco 500, categorie 400)
  — reale e modello ora coincidono anche nel grassetto.

**Prossimi**
- Galleria dei launcher (7 paradigmi) integrabile nello Studio come blocco di anteprima;
  catalogo temi/icon-pack di terze parti pubblicabile e installabile da NovaOS.

## Sviluppo

Tutto lato browser, zero build, zero dipendenze. Il server (`server.py`, stdlib) serve lo
Studio, la galleria, la shell reale di NovaOS sotto `/shell/` — necessaria per l'anteprima
«Reale» — e l'endpoint `/theme/current` del feed tema. Si avvia con `./run-studio.sh`; in
alternativa:

```bash
python3 server.py 8099
# apri http://localhost:8099/studio/
# anteprima shell diretta: http://localhost:8099/shell/index.html?preview=1
# anteprima sul telefono (stessa rete): http://<ip-lan>:8099/shell/index.html?preview=1&themeFeed=/theme/current
```

### Distribuzione per terze parti (hosting statico)

Lo Studio non ha bisogno del server per funzionare: la build statica lo pubblica su
qualsiasi hosting con **una riga**:

```bash
./build-static.sh          # genera dist/ (Studio + galleria + copia della shell reale)
python3 -m http.server 8123 --directory dist   # prova locale
# poi pubblica dist/ su GitHub Pages / Netlify / Altervista / qualsiasi hosting
```

Su hosting statico l'endpoint `/theme/current` non esiste (serve `server.py`), quindi
l'anteprima **live sul dispositivo** non è disponibile e lo Studio mostra una nota al suo
posto; l'anteprima **«Reale»** (shell in iframe) funziona perché la shell è inclusa nella
dist. Dettagli e limiti: [`README-STATIC.md`](README-STATIC.md).

## Licenza / crediti icone

Da definire alla ripresa. Bootstrap Icons: MIT. Font Awesome Free: CC-BY 4.0 (richiede
attribuzione). Includere le licenze degli asset bundlati.

---

## Aggiornamento — novatheme/2 (launcher + widget)

Il formato sale a **`novatheme/2`**: oltre a colori/forma/sfondo/icone/suoni/tipografia, un
tema può ora portare un **layout** — cioè il paradigma della home (launcher). In NovaOS la
home è un modulo intercambiabile (`renderHome(host, ctx)`): le app restano identiche, cambia
il launcher.

```json
{
  "format": "novatheme/2",
  "layout": { "id": "list", "params": { "search": true, "reorder": true } },
  "colors": { "accent": "#35c759" }
}
```

**Launcher previsti**: `springboard` (griglia + dock, default), `list` (elenco con ricerca e
riordino per trascinamento), `drawer`, `tiles`, `dash`, `radial`, `cover`. In NovaOS oggi sono
attivi `springboard` e `list` (selezionabili in Impostazioni → Display → *Home · launcher*);
gli altri sono dimostrati nella galleria e via via portati nella shell reale.

### Galleria launcher (anteprima interattiva)

`gallery/launcher-lab.html` — un telefono NovaOS con 7 launcher intercambiabili sulle stesse
app, accento commutabile, scorrimenti senza barra. Aprila direttamente nel browser oppure via
`python3 -m http.server` dalla radice del repo. È la base della futura "galleria layout" dello
Studio.

### Sfondo immagine

`wallpaper.type` può essere `gradient`, `solid` **o `image`** (data URL). NovaOS consente di
caricare un'immagine (ridimensionata a lato max 1080px, JPEG) da Impostazioni → Display → Sfondo.

## Avvio rapido dello Studio

```
./run-studio.sh          # avvia su http://localhost:8099/studio/ (apre il browser)
./run-studio.sh 9000     # porta personalizzata
```

L'editor copre: identità, **launcher** (paradigmi con anteprima dal vivo), colori,
**icone** (forma/stile, **icon-pack NovaOS/Aura/Tondo/Minimal** e override per-app:
emoji, immagine o **SVG**), sfondo (gradiente/tinta),
**suoni** (suoneria/notifica/sveglia con anteprima WebAudio), tipografia. Lavorare è sicuro:
**annulla/rifai** sempre disponibili, il tema si **autosalva** nel browser e una **miniatura**
in alto mostra il risultato dal vivo. Nella **Griglia** le icone dell'anteprima si **trascinano**
per riordinarle e l'ordine viene salvato nel tema (`layout.order`). Esporta/Importa `.novatheme/2`.

### Anteprima «Reale» (interattiva)

In alto all'anteprima c'è il toggle **Modello / Reale**. In modalità **Reale** lo Studio carica
la shell vera di NovaOS (`../shell/index.html?preview=1`, modalità anteprima della shell;
risolto dinamicamente tra la shell "sorella" — build statica — e quella di root `/shell/` del
server) e le invia il tema corrente a ogni modifica via `postMessage`: il **menu Drawer si apre
davvero** cliccando l'icona ☰, i launcher si cambiano dal vivo, le app si avviano e il tema
applicato è quello esatto che verrà esportato. La scelta della modalità viene ricordata.

Il device della shell è progettato a **390×844 CSS px** e dentro l'iframe viene **ridotto in
proporzione** (la stessa identica schermata del telefono, niente icone fuori scala né barre di
scorrimento). Se la shell non è raggiungibile (Studio aperto da `file://`, o hosting senza la
copia di `shell/`), l'anteprima reale non è disponibile e lo Studio torna automaticamente alla
modalità **Modello** con una nota esplicativa.
