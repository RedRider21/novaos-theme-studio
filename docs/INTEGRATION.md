# Integrazione lato NovaOS (motore temi)

Questo documento descrive cosa aggiungere **dentro NovaOS** (`os/shell/`) per
consumare un pacchetto `.novatheme`. Lo Studio (questo repo) produce il pacchetto; il
motore qui descritto lo applica. Tenere i due lati allineati al `format: "novatheme/2"`
(il motore accetta ancora `novatheme/1` per compatibilità).

## 1. `applyTheme(theme)` in `os.js`

Una funzione che, dato l'oggetto tema validato, imposta variabili CSS e stato:

```js
function applyTheme(t) {
  const rs = document.documentElement.style;
  // base chiaro/scuro
  if (t.meta?.base) set("theme", t.meta.base);
  // colori -> variabili CSS (le stesse di style.css)
  Object.entries(t.colors || {}).forEach(([k, v]) => rs.setProperty("--" + k, v));
  // forma
  if (t.shape?.radius   != null) rs.setProperty("--radius", t.shape.radius + "px");
  if (t.shape?.radiusSm != null) rs.setProperty("--radius-sm", t.shape.radiusSm + "px");
  if (t.shape?.iconStyle) set("iconStyle", t.shape.iconStyle);
  if (t.shape?.iconShape) set("iconShape", t.shape.iconShape);  // circle|squircle|square
  // launcher (novatheme/2): id predefinito oppure layout a blocchi
  if (t.layout?.engine === "blocks") applyThemeLayout(t.layout);
  else if (t.layout?.id) set("launcher", t.layout.id);
  // sfondo: gradient | solid | image (+ fit/zoom/posX/posY)
  if (t.wallpaper) applyWallpaper(t.wallpaper);      // su #home
  // tipografia
  if (t.typography?.textScale) set("textScale", t.typography.textScale);
  // icone per app -> override (vedi os.updateApp / mappa runtime)
  if (t.icons?.map) applyIconOverrides(t.icons.map);
  // suoni custom -> estendono le mappe del modulo Sounds
  if (t.sounds) applySounds(t.sounds);
  store.set("theme:active", t);                      // persistente
  applyDisplay();
}
```

Nota: le variabili colore vanno impostate su `documentElement` (inline) così vincono su
`:root`/`body[data-theme]`. Per il **ripristino** basta rimuovere gli override e ricaricare
lo stato dai default (`resetTheme()` che cancella `theme:active` e le proprietà inline).

## 2. Icone per app

Oggi ogni app ha `icon` (emoji o data/URL) in `NovaApps` / `userApps`. L'override tema
mappa `id -> icona`. Opzioni:
- semplice: chiamare `os.updateApp(id, {icon})` per le web app; per le app di sistema
  tenere una **mappa runtime** `iconOverrides` consultata da `homeIcon()`/`iconEl()`.
- l'icona può essere `emoji`, `svg` (markup inline, tinto con `currentColor`) o `image`
  (data URI). Per lo `svg` usare un wrapper che applica il colore app.

## 3. Suoni

Il modulo `Sounds` in `os.js` ha mappe `RING/NOTIF/ALARM` di sequenze `[freqHz,durSec]`.
Un suono `sequence` del tema aggiunge/registra una voce in quelle mappe e imposta
`ringtone/notifSound/alarmSound` sul nome del tema. Un suono `builtin` imposta solo il nome.

## 4. Impostazioni → Personalizzazione (UI)

Aggiungere una sezione con:
- **Importa tema**: `<input type="file">` → legge il JSON, valida contro lo schema, `applyTheme`.
- **Esporta tema corrente**: serializza lo stato tema in `.novatheme.json` (come fa già
  "Backup dati").
- **Applica / Ripristina**: applica un tema salvato o torna al tema di fabbrica.
- Eventuale **galleria temi** scaricabili dal repo via lo stesso canale OTA
  (`raw.githubusercontent.com/RedRider21/NovaOS/main/themes/<nome>.novatheme.json`;
  la shell legge già il catalogo da `.../main/themes/catalog.json`).

## 5. Validazione

Riusare `schema/theme.schema.json`. In assenza di un validatore JSON-Schema completo lato
shell, fare almeno controlli minimi: `format` uguale a `"novatheme/1"` o `"novatheme/2"`,
`meta.id`, colori come esadecimali, tipi degli enum. Rifiutare con messaggio chiaro invece
di applicare a metà.

Per un launcher a blocchi (`layout.engine === "blocks"`) verificare che `blocks` sia un
array non vuoto e che ogni blocco abbia un `type` noto; per uno predefinito verificare che
`layout.id` sia tra i 6 storici (`springboard`, `list`, `drawer`, `tiles`, `dash`,
`radial`) più `cover`, `index` e il motore `blocks` (launcher «Personalizzato»).

## 6. Compatibilità ROM

Nella ROM definitiva la shell risiederà in una directory di sistema scrivibile (stesso
modello dell'OTA-shell già implementato: `MainActivity.resolveShellUrl()` +
`shellWrite/shellCommit`). I temi seguono lo stesso canale: file sotto `shell/themes/`
(nel repo `themes/` accanto a `shell/`), importabili/scaricabili senza reinstallare nulla.
Nel pacchetto `.novatheme/2` l'unica parte che non cambia mai è l'insieme delle app: il
tema può solo scegliere come disporle (`layout`) e come vestirle (colori, icone, suoni).
