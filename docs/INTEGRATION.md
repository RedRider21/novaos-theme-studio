# Integrazione lato NovaOS (motore temi)

Questo documento descrive cosa aggiungere **dentro NovaOS** (`web-phone-os/shell/`) per
consumare un pacchetto `.novatheme`. Lo Studio (questo repo) produce il pacchetto; il
motore qui descritto lo applica. Tenere i due lati allineati al `format: "novatheme/1"`.

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
  // sfondo
  if (t.wallpaper) applyWallpaper(t.wallpaper);      // gradient|image|solid su #home
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
  (`raw.githubusercontent.com/dPlusOS21/NovaOS/main/shell/themes/...`).

## 5. Validazione

Riusare `schema/theme.schema.json`. In assenza di un validatore JSON-Schema completo lato
shell, fare almeno controlli minimi: `format === "novatheme/1"`, `meta.id`, colori come
esadecimali, tipi degli enum. Rifiutare con messaggio chiaro invece di applicare a metà.

## 6. Compatibilità ROM

Nella ROM definitiva la shell risiederà in una directory di sistema scrivibile (stesso
modello dell'OTA-shell già implementato: `MainActivity.resolveShellUrl()` +
`shellWrite/shellCommit`). I temi seguono lo stesso canale: file sotto `shell/themes/`,
importabili/scaricabili senza reinstallare nulla.
