/* NovaOS Theme Studio — logica editor + anteprima dal vivo. Zero dipendenze. */
"use strict";

const APPS = [
  {id:"phone",    name:"Telefono",     icon:"📞", color:"#35c759", cat:"Comunicazione", dock:true},
  {id:"messages", name:"Messaggi",     icon:"💬", color:"#34c759", cat:"Comunicazione", dock:true},
  {id:"contacts", name:"Rubrica",      icon:"👤", color:"#5e5ce6", cat:"Comunicazione"},
  {id:"mail",     name:"Mail",         icon:"✉️", color:"#e0245e", cat:"Comunicazione"},
  {id:"camera",   name:"Fotocamera",   icon:"📷", color:"#1c1c1e", cat:"Multimedia", dock:true},
  {id:"gallery",  name:"Galleria",     icon:"🖼️", color:"#af52de", cat:"Multimedia"},
  {id:"recorder", name:"Registratore", icon:"🎙️", color:"#ff375f", cat:"Multimedia"},
  {id:"notes",    name:"Note",         icon:"📝", color:"#ffcc00", cat:"Produttività"},
  {id:"calendar", name:"Calendario",   icon:"📅", color:"#ea4335", cat:"Produttività"},
  {id:"calc",     name:"Calcolatrice", icon:"🧮", color:"#ff9500", cat:"Produttività"},
  {id:"files",    name:"File",         icon:"📁", color:"#f4b400", cat:"Produttività"},
  {id:"browser",  name:"Browser",      icon:"🌐", color:"#0a84ff", cat:"Sistema", dock:true},
  {id:"weather",  name:"Meteo",        icon:"⛅", color:"#4a90d9", cat:"Sistema"},
  {id:"clock",    name:"Orologio",     icon:"⏰", color:"#1c1c2e", cat:"Sistema"},
  {id:"store",    name:"Store",        icon:"🧩", color:"#0a84ff", cat:"Sistema"},
  {id:"settings", name:"Impostazioni", icon:"⚙️", color:"#5a6473", cat:"Sistema"},
];
const CATS = ["Comunicazione","Multimedia","Produttività","Sistema"];
const DOCK = APPS.filter(a=>a.dock);

const LG = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/>',
  list:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
  drawer:'<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="9" y1="4" x2="9" y2="20"/><line x1="5" y1="8" x2="7" y2="8"/><line x1="5" y1="11" x2="7" y2="11"/>',
  tiles:'<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/>',
  dash:'<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="12" width="10" height="9" rx="2"/><rect x="15" y="12" width="6" height="9" rx="2"/>',
  radial:'<circle cx="12" cy="12" r="3"/><circle cx="12" cy="4" r="1.6"/><circle cx="12" cy="20" r="1.6"/><circle cx="4" cy="12" r="1.6"/><circle cx="20" cy="12" r="1.6"/><circle cx="6" cy="6" r="1.6"/><circle cx="18" cy="18" r="1.6"/>',
  cover:'<rect x="8" y="5" width="8" height="14" rx="1.6"/><rect x="2.5" y="8" width="4" height="8" rx="1.2" opacity=".6"/><rect x="17.5" y="8" width="4" height="8" rx="1.2" opacity=".6"/>',
  index:'<line x1="4" y1="6" x2="15" y2="6"/><line x1="4" y1="12" x2="15" y2="12"/><line x1="4" y1="18" x2="15" y2="18"/><circle cx="20" cy="5" r="1"/><circle cx="20" cy="9" r="1"/><circle cx="20" cy="13" r="1"/><circle cx="20" cy="17" r="1"/><circle cx="20" cy="21" r="1"/>',
  custom:'<rect x="3" y="3" width="18" height="5" rx="1.5"/><rect x="3" y="10" width="18" height="4" rx="1.5" opacity=".7"/><rect x="3" y="16" width="11" height="5" rx="1.5" opacity=".7"/>',
  clock:'<circle cx="12" cy="12" r="9"/><line x1="12" y1="12" x2="12" y2="8"/><line x1="12" y1="12" x2="15" y2="13"/>',
  search:'<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/>',
  dock:'<rect x="3" y="15" width="18" height="6" rx="3"/><circle cx="7" cy="18" r="1.2"/><circle cx="12" cy="18" r="1.2"/><circle cx="17" cy="18" r="1.2"/>',
  weather:'<circle cx="8" cy="10" r="3.5"/><path d="M11 16h6a3 3 0 0 0 0-6 4.5 4.5 0 0 0-8.7-1"/>',
  bubbles:'<circle cx="8" cy="8" r="4"/><circle cx="17" cy="9" r="3"/><circle cx="10" cy="17" r="3.2"/>',
  arc:'<circle cx="19" cy="19" r="2.5"/><path d="M19 19 A12 12 0 0 0 7 7"/><circle cx="7" cy="7" r="1.5"/><circle cx="12" cy="8.7" r="1.5"/><circle cx="16" cy="12" r="1.5"/>',
  deck:'<rect x="6" y="3" width="12" height="7" rx="1.6"/><rect x="6" y="13" width="12" height="7" rx="1.6" opacity=".6"/>',
};
const LAUNCHERS = [
  {id:"springboard", name:"Griglia",    desc:"Icone a pagine + dock", ic:LG.grid,   cap:"Il classico springboard: griglia di icone + dock."},
  {id:"list",        name:"Lista",      desc:"Elenco con ricerca",    ic:LG.list,   cap:"Elenco verticale con ricerca e categorie."},
  {id:"drawer",      name:"Drawer",     desc:"Menu a scomparsa",      ic:LG.drawer, cap:"Home a orologio + menu laterale a scomparsa."},
  {id:"tiles",       name:"Tiles",      desc:"Riquadri colorati",     ic:LG.tiles,  cap:"Tiles Metro di misure diverse."},
  {id:"dash",        name:"Dashboard",  desc:"Widget + recenti",      ic:LG.dash,   cap:"Widget: orologio, meteo, recenti, preferite."},
  {id:"radial",      name:"Radiale",    desc:"App in orbita",         ic:LG.radial, cap:"App in orbita attorno a un hub centrale."},
  {id:"cover",       name:"Cover flow", desc:"Carosello di schede",   ic:LG.cover,  cap:"Grandi schede che scorrono con snap."},
  {id:"index",       name:"Indice A-Z", desc:"Elenco alfabetico",     ic:LG.index,  cap:"Elenco alfabetico con scorrimento rapido A-Z."},
];

// Blocchi disponibili nel compositore (allineati al motore di NovaOS: BLOCKS in os.js).
// params: descrittori dei controlli mostrati nel compositore.
const BLOCK_DEFS = [
  { type:"clock",    name:"Orologio", ic:LG.clock,  params:[{ key:"size", label:"Dimensione", type:"seg", opts:[["large","Grande"],["small","Piccolo"]], def:"large" }] },
  { type:"search",   name:"Ricerca",  ic:LG.search, params:[] },
  { type:"appindex", name:"Indice A-Z", ic:LG.index, params:[] },
  { type:"appgrid",  name:"Griglia app", ic:LG.grid, params:[{ key:"cols", label:"Colonne", type:"seg", opts:[["3","3"],["4","4"],["5","5"]], def:4 }] },
  { type:"bubbles",  name:"Bolle categorie", ic:LG.bubbles, params:[] },
  { type:"arc",      name:"Arco / ventaglio", ic:LG.arc, params:[] },
  { type:"deck",     name:"Deck di carte", ic:LG.deck, params:[] },
  { type:"weather",  name:"Widget meteo", ic:LG.weather, params:[] },
  { type:"dock",     name:"Dock preferite", ic:LG.dock, params:[] },
];
const BLOCK_BY = Object.fromEntries(BLOCK_DEFS.map(b=>[b.type,b]));
// blocchi del launcher predefinito "Indice A-Z" (identici a INDEX_TEMPLATE di os.js)
const INDEX_BLOCKS = [ {type:"clock",params:{size:"small"}}, {type:"search",params:{}}, {type:"appindex",params:{}}, {type:"dock",params:{}} ];
// blocchi iniziali quando si passa al layout "Personalizzato"
const DEFAULT_BLOCKS = () => JSON.parse(JSON.stringify(INDEX_BLOCKS));

const BASE = {
  dark:  { bg:"#0b0f17","surface":"#1a2130","surface-2":"#232c3d", text:"#e8ecf4","text-dim":"#9aa4b8", accent:"#6d8bff","accent-2":"#a663ff" },
  light: { bg:"#eef1f7","surface":"#ffffff","surface-2":"#f0f3fa", text:"#141a24","text-dim":"#5c6678", accent:"#3f63ff","accent-2":"#8b3fff" },
};
const COLOR_KEYS = [
  ["accent","Accento"],["accent-2","Accento 2"],["bg","Sfondo base"],
  ["surface","Superficie"],["surface-2","Superficie 2"],["text","Testo"],["text-dim","Testo tenue"],
];
const WALLS = [
  { name:"Auto",   css:"" },
  { name:"Nova",   css:"radial-gradient(130% 80% at 50% 0%, rgba(60,95,165,.55) 0%, transparent 58%)" },
  { name:"Verde",  css:"radial-gradient(120% 80% at 50% 0%, rgba(53,199,89,.30) 0%, transparent 60%)" },
  { name:"Viola",  css:"radial-gradient(120% 80% at 50% 0%, rgba(166,99,255,.35) 0%, transparent 60%)" },
  { name:"Ambra",  css:"radial-gradient(120% 80% at 50% 0%, rgba(255,159,10,.32) 0%, transparent 60%)" },
  { name:"Notte",  css:"linear-gradient(180deg, rgba(20,30,55,.7), transparent 60%)" },
];
const SHAPE_RADIUS = { circle:"50%", squircle:"15px", square:"7px" };

const $ = s => document.querySelector(s);
const esc = s => String(s==null?"":s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

// icon-pack: rimappano l'icona di alcune app (l'app resta la stessa). Il valore
// può essere un'emoji (stringa) oppure {type:"emoji"|"image", value} — le icone
// immagine (data URL PNG o https) sono supportate dallo Studio e dalla shell.
let PACKS = {
  default: { name:"Predefinito", map:{} },
  tondo:   { name:"Tondo", map:{ phone:"☎️", messages:"🗨️", contacts:"🧑", mail:"📧", camera:"📸", gallery:"🌄", browser:"🧭", weather:"🌤️", clock:"🕰️", settings:"🛠️", files:"🗂️", notes:"🗒️" } },
  minimal: { name:"Minimal", map:{ phone:"📱", messages:"✉", contacts:"◍", mail:"✎", camera:"◉", gallery:"❖", browser:"◐", weather:"☀", clock:"◷", settings:"⚙", files:"▤", notes:"▦", calc:"﹢", calendar:"▦", store:"◆", recorder:"◉" } },
  // «Aura»: icone VERE immagini (PNG data URL) generate al volo da canvas — mostra
  // che un icon-pack con immagini funziona nello Studio e in NovaOS.
  aura: { name:"Aura", map:{ /* generato lazy da auraMap() */ } },
  // «NovaOS»: icone VETTORIALI disegnate ad hoc, riconoscibili come la suite Google
  // (badge con gradiente per-app + simbolo bianco; la Galleria ha la girandola).
  nova: { name:"NovaOS", map:{ /* generato lazy da novaMap() */ } },
};
let customPackSeq = 0;   // counter per i pack importati (custom-1, custom-2…)
let auraCache = null;
function auraMap(){
  if (auraCache) return auraCache;
  const c = document.createElement("canvas"); c.width = c.height = 128;
  const g = c.getContext("2d"); const map = {};
  APPS.forEach(a => {
    g.clearRect(0, 0, 128, 128);
    const grd = g.createLinearGradient(0, 0, 128, 128);
    grd.addColorStop(0, a.color); grd.addColorStop(1, "#101018");
    g.fillStyle = grd; g.beginPath(); g.arc(64, 64, 58, 0, Math.PI * 2); g.fill();
    g.font = "60px sans-serif"; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillStyle = "rgba(255,255,255,.96)"; g.fillText(a.icon, 64, 66);
    map[a.id] = { type: "image", value: c.toDataURL("image/png") };
  });
  auraCache = map; return map;
}
// ---------- icon-pack «NovaOS»: icone vettoriali stile suite Google ----------
// Ogni app ha un simbolo bianco riconoscibile (badge gradiente per-app) — come
// Google per Gmail/Foto/Maps. I simboli sono path MIT (Feather/Lucide) e forme
// disegnate ad hoc (la Galleria ha la girandola, il Meteo sole+nube, …).
function shade(hex, amt){   // amt>0 schiarisce verso bianco, amt<0 scurisce verso nero
  const n = parseInt(hex.slice(1), 16); if (isNaN(n)) return hex;
  const t = amt < 0 ? 0 : 255, p = Math.abs(amt);
  const r = Math.round((t - ((n>>16)&255)) * p + ((n>>16)&255));
  const g = Math.round((t - ((n>>8)&255))  * p + ((n>>8)&255));
  const b = Math.round((t - (n&255))       * p + (n&255));
  return "#" + ((1<<24) + (r<<16) + (g<<8) + b).toString(16).slice(1);
}
const NOVA_PATH = {
  phone:    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
  messages: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="9" cy="10.5" r=".8" fill="#fff"/><circle cx="12" cy="10.5" r=".8" fill="#fff"/><circle cx="15" cy="10.5" r=".8" fill="#fff"/>',
  contacts: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  mail:     '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  camera:   '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  gallery:  '<g fill="#fff"><ellipse cx="12" cy="6.4" rx="3.3" ry="5.2" transform="rotate(0 12 12)"/><ellipse cx="12" cy="6.4" rx="3.3" ry="5.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="6.4" rx="3.3" ry="5.2" transform="rotate(120 12 12)"/><ellipse cx="12" cy="6.4" rx="3.3" ry="5.2" transform="rotate(180 12 12)"/><ellipse cx="12" cy="6.4" rx="3.3" ry="5.2" transform="rotate(240 12 12)"/><ellipse cx="12" cy="6.4" rx="3.3" ry="5.2" transform="rotate(300 12 12)"/></g>',
  recorder: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
  notes:    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="7.5" y1="15" x2="16.5" y2="15"/><line x1="7.5" y1="18.5" x2="13" y2="18.5"/>',
  calc:     '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><circle cx="8" cy="15" r="1.1" fill="#fff"/><circle cx="12" cy="15" r="1.1" fill="#fff"/><circle cx="16" cy="15" r="1.1" fill="#fff"/><circle cx="8" cy="19" r="1.1" fill="#fff"/><circle cx="12" cy="19" r="1.1" fill="#fff"/><circle cx="16" cy="19" r="1.1" fill="#fff"/>',
  files:    '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  browser:  '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  weather:  '<circle cx="8.5" cy="7.5" r="2.8"/><path d="M8.5 2.6v1.5M8.5 12.4v1.5M3.2 7.5h1.5M13.8 7.5h1.5M4.7 3.7l1.1 1.1M11.2 10.2l1.1 1.1M11.2 3.7l-1.1 1.1M4.7 10.2l1.1-1.1"/><path d="M9.5 19.5h7a3.2 3.2 0 0 0 0-6.4 4.6 4.6 0 0 0-8.9-1.3 3.2 3.2 0 0 0 1.9 5.8h.3"/>',
  clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
  store:    '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
};
function novaSvg(a){
  const g = NOVA_PATH[a.id]; if (!g) return "";
  const id = "ng-" + a.id;
  const c1 = shade(a.color, .18), c2 = shade(a.color, -.32);
  return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="24" height="24" rx="7" fill="url(#${id})"/><g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${g}</g></svg>`;
}
function novaMap(){
  const map = {};
  APPS.forEach(a => { map[a.id] = { type: "svg", value: novaSvg(a) }; });
  return map;
}
// suoni builtin: identici a quelli di NovaOS (os.js), per categoria. [freqHz, durataSec]
const RING = {
  "Nova":     [[660,.18],[880,.18],[990,.22],[0,.18]],
  "Classica": [[784,.2],[659,.2],[784,.2],[988,.3],[0,.22]],
  "Digitale": [[1000,.1],[0,.06],[1000,.1],[0,.06],[1300,.16],[0,.28]],
  "Marimba":  [[523,.16],[659,.16],[784,.16],[1047,.22],[0,.22]],
  "Arpeggio": [[440,.13],[554,.13],[659,.13],[880,.13],[659,.13],[554,.13],[0,.22]],
};
const NOTIF = {
  "Goccia":    [[880,.12],[1245,.14]],
  "Pop":       [[520,.07],[780,.12]],
  "Bip":       [[1000,.09],[0,.05],[1000,.09]],
  "Cristallo": [[1320,.1],[1760,.1],[2217,.16]],
  "Legno":     [[440,.08],[330,.14]],
};
const ALARM = {
  "Radar":   [[740,.24],[0,.1],[740,.24],[0,.14]],
  "Sirena":  [[600,.3],[900,.3]],
  "Mattino": [[880,.15],[1108,.15],[1319,.2],[0,.22]],
};
const SND = { ringtone:RING, notif:NOTIF, alarm:ALARM };

// ---------- mini-sequencer suoni ----------
// Scala di 8 note (freq Hz) usata dalle righe della griglia. La sequenza composta
// viene salvata nel tema nel formato nativo di NovaOS: [[freqHz,durSec],...] (freq 0 = pausa).
const SEQ_SCALES = [
  { name:"Pentatonica", notes:[262,294,330,392,440,523,587,659] },   // Do Re Mi Sol La Do Re Mi
  { name:"Blues",       notes:[262,311,330,349,392,466,523,587] },   // Do Mib Fa Fa# Sol Sib Do Re
];
let SQS = { steps:8, dur:0.15, scale:0, cells:[] };        // cells[passo][nota] = booleano
let customSeq = {};                                        // sequenze personalizzate per categoria
const seqNoteName = f => { const n={262:"Do",294:"Re",311:"Mib",330:"Mi",349:"Fa",392:"Sol",440:"La",466:"Sib",523:"Do",587:"Re",659:"Mi"}; return n[f]||f; };
function seqCells(){ return SQS.cells.map(row => (row||[]).map(Boolean)); }
// griglia (celle booleane) -> sequenza [[freq,dur],...]: per ogni passo le note
// attive suonano in sequenza (arpeggio); un passo vuoto diventa una pausa [0,dur].
function seqToArr(){
  const out=[], n=SQS.cells.length?SQS.cells[0].length:0, freqs=SEQ_SCALES[SQS.scale].notes;
  for(let s=0;s<SQS.steps;s++){
    let any=false;
    for(let i=0;i<n;i++) if(SQS.cells[s]&&SQS.cells[s][i]){ out.push([freqs[i],SQS.dur]); any=true; }
    if(!any) out.push([0,SQS.dur]);
  }
  return out;
}
// sequenza [[freq,dur]] -> griglia: ogni voce è un passo; la nota più vicina della
// scala corrente viene posizionata lì (per editare un suono già salvato nel tema).
function seqFromArr(arr){
  const freqs=SEQ_SCALES[SQS.scale].notes;
  const steps=Math.min(16,Math.max(8,arr.length||8));
  const cells=Array.from({length:steps},()=>Array(freqs.length).fill(false));
  (arr||[]).slice(0,steps).forEach(([f],s)=>{
    if(f>0){ let bi=0,bd=1e9; freqs.forEach((nf,i)=>{ const dd=Math.abs(nf-f); if(dd<bd){bd=dd;bi=i;} }); cells[s][bi]=true; }
  });
  SQS.steps=steps; SQS.cells=cells;
  return cells;
}
function buildSeq(){
  const grid=$("#f-seq-grid"); if(!grid) return;
  const freqs=SEQ_SCALES[SQS.scale].notes;
  SQS.cells=seqCells();                                   // normalizza dimensioni
  while(SQS.cells.length<SQS.steps) SQS.cells.push(Array(freqs.length).fill(false));
  SQS.cells.forEach(r=>{ while(r.length<freqs.length) r.push(false); });
  grid.innerHTML = SQS.cells.map((row,s)=>{               // colonne = passi, righe = note
    return `<div class="sq-row">${freqs.map((f,i)=>`<button class="sq-cell ${row[i]?"on":""}" data-s="${s}" data-n="${i}" title="${seqNoteName(f)}"></button>`).join("")}</div>`;
  }).join("");
  const rows=grid.querySelectorAll(".sq-row");
  rows.forEach((r,s)=>{ r.insertAdjacentHTML("beforeend",`<span class="sq-note">${seqNoteName(freqs[s])}</span>`); });
  grid.querySelectorAll(".sq-cell").forEach(c=>c.onclick=()=>{
    const s=+c.dataset.s, n=+c.dataset.n;
    SQS.cells[s][n]=!SQS.cells[s][n];
    c.classList.toggle("on",SQS.cells[s][n]);
  });
  $("#f-seq-steps").querySelectorAll("[data-steps]").forEach(b=>b.onclick=()=>{ SQS.steps=+b.dataset.steps; syncSeqSegs(); buildSeq(); });
  $("#f-seq-scale").querySelectorAll("[data-scale]").forEach(b=>b.onclick=()=>{ SQS.scale=+b.dataset.scale; buildSeq(); });
  const clr=$("#f-seq-clear"); if(clr) clr.onclick=()=>{ SQS.cells=SQS.cells.map(r=>r.map(()=>false)); buildSeq(); };
  const play=$("#f-seq-play"); if(play) play.onclick=()=>playSeq(seqToArr());
  const save=$("#f-seq-save"); if(save) save.onclick=()=>{ const t=$("#f-seq-target").value; customSeq[t]=seqToArr(); theme.sounds[t]={type:"sequence",value:customSeq[t]}; buildSounds(); };
  syncSeqSegs();
}
function syncSeqSegs(){
  $("#f-seq-steps").querySelectorAll("[data-steps]").forEach(b=>b.classList.toggle("on",+b.dataset.steps===SQS.steps));
  $("#f-seq-scale").querySelectorAll("[data-scale]").forEach(b=>b.classList.toggle("on",+b.dataset.scale===SQS.scale));
}

function freshTheme(base){
  return {
    format:"novatheme/2",
    meta:{ id:"nuovo-tema", name:"Nuovo tema", author:"", version:"1.0.0", base:base||"dark" },
    layout:{ id:"springboard", params:{}, order:[] },
    colors: Object.assign({}, BASE[base||"dark"]),
    shape:{ radius:22, radiusSm:14, iconStyle:"filled", iconShape:"squircle" },
    icons:{ pack:"default", shape:"squircle", map:{} },
    wallpaper:{ type:"gradient", value:WALLS[1].css },
    sounds:{ ringtone:{type:"builtin",value:"Nova"}, notif:{type:"builtin",value:"Goccia"}, alarm:{type:"builtin",value:"Radar"} },
    typography:{ textScale:100, font:"system", weight:"normal" },
  };
}
// modelli pronti: prototipi completi da cui partire per creare un nuovo tema.
// make() restituisce un tema novatheme/2 completo, poi liberamente modificabile.
const PRESETS = [
  { id:"nova",      name:"Nova",        desc:"Griglia, indaco scuro", ic:LG.grid,
    make(){ const t=freshTheme("dark"); t.meta.name="Nova"; t.layout={id:"springboard",params:{},order:[]}; t.wallpaper={type:"gradient",value:WALLS[1].css}; return t; } },
  { id:"chiaro",    name:"Chiaro",      desc:"Griglia su fondo chiaro", ic:LG.grid,
    make(){ const t=freshTheme("light"); t.meta.name="Chiaro"; t.layout={id:"springboard",params:{},order:[]}; t.wallpaper={type:"gradient",value:WALLS[1].css}; return t; } },
  { id:"indice",    name:"Indice A-Z",  desc:"Elenco alfabetico", ic:LG.index,
    make(){ const t=freshTheme("dark"); t.meta.name="Indice A-Z"; t.layout={id:"index",params:{},order:[]}; t.colors.accent="#34c759"; t.colors["accent-2"]="#30d158"; t.wallpaper={type:"gradient",value:WALLS[2].css}; return t; } },
  { id:"dashboard", name:"Dashboard",   desc:"Widget meteo + recenti", ic:LG.dash,
    make(){ const t=freshTheme("dark"); t.meta.name="Dashboard"; t.layout={id:"dash",params:{},order:[]}; t.colors.accent="#ff9f0a"; t.colors["accent-2"]="#ff375f"; t.wallpaper={type:"gradient",value:WALLS[4].css}; return t; } },
  { id:"radiale",   name:"Radiale",     desc:"App in orbita, viola", ic:LG.radial,
    make(){ const t=freshTheme("dark"); t.meta.name="Radiale"; t.layout={id:"radial",params:{},order:[]}; t.colors.accent="#a663ff"; t.colors["accent-2"]="#d17bff"; t.wallpaper={type:"gradient",value:WALLS[3].css}; t.shape.iconShape="circle"; return t; } },
  { id:"tiles",     name:"Tiles",       desc:"Riquadri Metro colorati", ic:LG.tiles,
    make(){ const t=freshTheme("dark"); t.meta.name="Tiles"; t.layout={id:"tiles",params:{},order:[]}; t.colors.accent="#0a84ff"; t.shape.iconShape="square"; return t; } },
  { id:"cover",     name:"Cover flow",  desc:"Carosello di schede", ic:LG.cover,
    make(){ const t=freshTheme("dark"); t.meta.name="Cover flow"; t.layout={id:"cover",params:{},order:[]}; t.colors.accent="#64d2ff"; t.wallpaper={type:"gradient",value:WALLS[5].css}; return t; } },
  { id:"bolle",     name:"Bolle",       desc:"A blocchi: bolle + meteo", ic:LG.bubbles,
    make(){ const t=freshTheme("dark"); t.meta.name="Bolle"; t.layout={engine:"blocks",name:"Bolle",blocks:[{type:"clock",params:{size:"large"}},{type:"weather",params:{}},{type:"bubbles",params:{}},{type:"dock",params:{}}]}; t.colors.accent="#3aa0ff"; return t; } },
];

// icona effettiva di un'app: override per-app > icon-pack > icona di default.
// iconValue() = valore puro (emoji o data URL); iconOf() = HTML da inserire
// (un'icona immagine diventa <img>, così i pack con immagini funzionano ovunque).
function normIcon(o){ if (!o) return ""; return (typeof o === "object") ? o.value : o; }
function isImgVal(v){ return /^data:image\//i.test(v) || /^https:\/\//i.test(v); }
function isSvgVal(v){ return typeof v === "string" && /^\s*<svg[\s>]/i.test(v) && /<\/svg>\s*$/i.test(v) && !/<script/i.test(v); }
function iconValue(a){
  const o = normIcon(theme.icons && theme.icons.map && theme.icons.map[a.id]);
  if (o) return o;
  const pk = (PACKS[theme.icons && theme.icons.pack] || PACKS.default).map;
  return normIcon(pk[a.id]) || a.icon;
}
function iconOf(a){
  const v = iconValue(a);
  if (isSvgVal(v)) return v;   // SVG inline (badge + simbolo) come HTML
  if (isImgVal(v)) return `<img class="iimg" src="${esc(v)}" alt="">`;
  return v;
}
// ordine della griglia (springboard): ordine salvato nel tema, poi le rimanenti
function gridApps(){
  const grid = APPS.filter(a=>!a.dock);
  const ord = (theme.layout && theme.layout.order) || [];
  if (!ord.length) return grid;
  const byId = Object.fromEntries(grid.map(a=>[a.id,a]));
  const head = ord.map(id=>byId[id]).filter(Boolean);
  const seen = new Set(head.map(a=>a.id));
  return head.concat(grid.filter(a=>!seen.has(a.id)));
}
/* ---------------- cronologia (annulla/rifai) + autosalvataggio + miniatura ---------------- */
// Il tema è un Proxy profondo: OGNI modifica (anche annidata) registra uno snapshot
// (debounced) → storico annulla/rifai + salvataggio automatico nel browser.
const HIST = { stack: [], idx: -1, limit: 60 };
const AUTOSAVE_KEY = "novaStudio.theme";
const _wrapped = new WeakMap();
let _snapT = 0;
function _mk(o){
  if (o && typeof o === "object") {
    if (_wrapped.has(o)) return _wrapped.get(o);
    const p = new Proxy(o, {
      get(t,k,r){ const v=Reflect.get(t,k,r); return (v && typeof v==="object") ? _mk(v) : v; },
      set(t,k,v){ Reflect.set(t,k,(v && typeof v==="object") ? _mk(v) : v); scheduleSnapshot(); return true; },
      deleteProperty(t,k){ Reflect.deleteProperty(t,k); scheduleSnapshot(); return true; }
    });
    _wrapped.set(o,p); return p;
  }
  return o;
}
function autosave(){
  try { localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(theme)); } catch (_) {}
  const n = document.getElementById("asave-note");
  if (n) n.textContent = "Autosalvato · " + new Date().toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"});
}
function snapshotNow(){
  HIST.stack.splice(HIST.idx + 1);
  HIST.stack.push(JSON.parse(JSON.stringify(theme)));
  if (HIST.stack.length > HIST.limit) HIST.stack.shift();
  HIST.idx = HIST.stack.length - 1;
  syncHistBtns();
  autosave();
}
function scheduleSnapshot(){ clearTimeout(_snapT); _snapT = setTimeout(snapshotNow, 250); }
function resetHistory(){ HIST.stack = [JSON.parse(JSON.stringify(theme))]; HIST.idx = 0; syncHistBtns(); autosave(); }
function syncHistBtns(){ const u=document.getElementById("undo"), r=document.getElementById("redo"); if (u) u.disabled = HIST.idx <= 0; if (r) r.disabled = HIST.idx >= HIST.stack.length - 1; }
function undo(){ if (HIST.idx <= 0) return; HIST.idx--; theme = _mk(JSON.parse(JSON.stringify(HIST.stack[HIST.idx]))); syncHistBtns(); buildAll(); }
function redo(){ if (HIST.idx >= HIST.stack.length - 1) return; HIST.idx++; theme = _mk(JSON.parse(JSON.stringify(HIST.stack[HIST.idx]))); syncHistBtns(); buildAll(); }
function loadTheme(t){ theme=_mk(t); resetHistory(); }   // nuovo tema/base/preset/import: azzera lo storico

// miniatura del tema: disegna su canvas sfondo + orologio + icone (aggiornata in applyPreview)
function _thumbRect(ctx,x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
function drawThumb(){
  const cv=document.getElementById("theme-thumb"); if (!cv) return;
  const ctx=cv.getContext("2d"), W=cv.width, H=cv.height, c=theme.colors||{};
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle=c.bg||"#0b0f17"; ctx.fillRect(0,0,W,H);
  const wp=theme.wallpaper||{};
  if (wp.type==="solid" && wp.value) { ctx.fillStyle=wp.value; ctx.fillRect(0,0,W,H); }
  else if (wp.type==="gradient" && wp.value) {
    const g=ctx.createRadialGradient(W/2,-24,0,W/2,-24,W*0.95);
    g.addColorStop(0,c.accent||"#3f63ff"); g.addColorStop(1,"rgba(0,0,0,0)");
    ctx.globalAlpha=0.62; ctx.fillStyle=g; ctx.fillRect(0,0,W,H); ctx.globalAlpha=1;
  }
  ctx.fillStyle=c["text-dim"]||"#9aa4b8"; _thumbRect(ctx,8,10,26,4,2); ctx.fill();
  ctx.fillStyle=c.text||"#fff"; ctx.font="700 17px system-ui, sans-serif"; ctx.textAlign="center";
  ctx.fillText("9:41", W/2, 42);
  const apps=APPS.filter(a=>!a.dock).slice(0,6);
  const iw=(W-16)/2, ih=26, y0=56;
  apps.forEach((a,i)=>{
    const col=i%2, row=(i/2)|0;
    const x=8+col*iw, y=y0+row*(ih+9);
    ctx.fillStyle=c.surface||"#1a2130"; _thumbRect(ctx,x+4,y+3,iw-8,ih-6,7); ctx.fill();
    const ic=iconValue(a)||a.icon;
    if (typeof ic==="string" && (/^data:image\//i.test(ic) || isSvgVal(ic))) {
      const img=new Image();
      const src = /^data:image\//i.test(ic) ? ic : "data:image/svg+xml;charset=utf-8," + encodeURIComponent(ic);
      img.onload=()=>{ ctx.drawImage(img,x+6,y+5,iw-12,ih-10); }; img.src=src;
    } else { ctx.font="11px system-ui, sans-serif"; ctx.fillStyle=c.text||"#fff"; ctx.fillText(String(ic==null?"":ic).slice(0,1), x+iw/2, y+ih/2+1); }
  });
  const dock=APPS.filter(a=>a.dock).slice(0,4), dy=H-32, dw=(W-16)/dock.length;
  dock.forEach((a,i)=>{ const x=8+i*dw; ctx.fillStyle=c.surface||"#1a2130"; _thumbRect(ctx,x+3,dy+2,22,20,6); ctx.fill(); });
}

let theme;
try { const s=localStorage.getItem(AUTOSAVE_KEY); if (s) { theme=_mk(JSON.parse(s)); resetHistory(); } else { theme=_mk(freshTheme("dark")); resetHistory(); } }
catch (_) { theme=_mk(freshTheme("dark")); resetHistory(); }

/* ---------------- anteprima REALE (shell embeddata) ---------------- */
// «Reale» carica la shell vera di NovaOS in un iframe e le spinge il tema
// corrente via postMessage: ogni interazione funziona davvero (il menu del
// Drawer si apre con l'icona ☰, le app si avviano, i launcher cambiano).
let previewMode = "real";
try { const m = localStorage.getItem("novaStudio.previewMode"); if (m === "mock" || m === "real") previewMode = m; } catch (_) {}

const pvFrame = () => document.getElementById("pv-frame");
// Versione "cucinata" del tema per l'anteprima reale (iframe e feed): le icone
// effettive (pack + override) vengono portate nella map, così la shell applica
// immagini e personalizzazioni anche per i pack interni dello Studio (es. aura).
function cookedTheme(){
  const c = JSON.parse(JSON.stringify(theme));
  c.icons.shape = c.shape.iconShape;
  const map = {};
  APPS.forEach(a => { const v = iconValue(a); if (v !== a.icon) map[a.id] = isImgVal(v) ? { type:"image", value:v } : isSvgVal(v) ? { type:"svg", value:v } : { type:"emoji", value:v }; });
  c.icons.map = map;
  return c;
}
function pushTheme(){
  const fr = pvFrame();
  if (previewMode !== "real" || !fr || !fr.contentWindow) return;
  try { fr.contentWindow.postMessage({ source:"nova-studio", type:"theme", theme: cookedTheme() }, "*"); } catch (_) {}
  publishFeed();
}
function setPreviewMode(m){
  previewMode = m;
  document.body.classList.toggle("pv-mock", m === "mock");
  document.body.classList.toggle("pv-real", m === "real");
  document.querySelectorAll("#pv-mode [data-mode]").forEach(b => b.classList.toggle("on", b.dataset.mode === m));
  try { localStorage.setItem("novaStudio.previewMode", m); } catch (_) {}
  if (m === "real") pushTheme();   // la shell riparte con il tema attuale
}
function bindPreviewMode(){
  const seg = document.getElementById("pv-mode"); if (!seg) return;
  seg.querySelectorAll("[data-mode]").forEach(b => b.onclick = () => setPreviewMode(b.dataset.mode));
  const fr = pvFrame();
  if (fr) fr.addEventListener("load", () => {
    // verifica che sia davvero la shell NovaOS (stesso origin → DOM leggibile).
    // Se l'iframe non carica (es. Studio aperto senza il server che serve /shell/)
    // ripiega sul modello e avvisa.
    let ok = false;
    try { ok = !!(fr.contentDocument && fr.contentDocument.getElementById && fr.contentDocument.getElementById("device")); } catch (_) { ok = false; }
    if (!ok && previewMode === "real") {
      setPreviewMode("mock");
      const cap = document.getElementById("caption");
      if (cap) cap.textContent = "Anteprima «Reale» non disponibile: avvia ./run-studio.sh (il server serve /shell/).";
    } else pushTheme();   // pronto → tema subito
  });
}

/* ---------------- feed tema: anteprima sul dispositivo ---------------- */
// Oltre all'iframe, lo Studio pubblica il tema corrente su /theme/current
// (endpoint in server.py, debounced). Aprendo sul telefono/APK/emulatore
// l'URL dell'anteprima con themeFeed=/theme/current, la shell polla l'endpoint
// e applica il tema dal vivo — niente postMessage tra origini diverse.
let feedTimer = 0;
let feedOK = true;   // il server (endpoint /theme/current) è raggiungibile?
function publishFeed(){
  if (!feedOK) return;   // hosting statico: niente server, niente feed
  try { clearTimeout(feedTimer); } catch (_) {}
  feedTimer = setTimeout(() => {
    try {
      fetch("/theme/current", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rev: Date.now(), theme: cookedTheme() })
      }).catch(() => {});
    } catch (_) {}
  }, 150);
}
// Rileva all'avvio se l'endpoint del feed esiste (server.py). In un hosting
// statico (GitHub Pages, Netlify, Altervista) non c'è: il pannello «Sul
// dispositivo» mostra una nota e le publish diventano no-op.
function detectFeed(){
  fetch("/theme/current", { cache: "no-store" })
    .then(r => setFeedOK(r.ok))
    .catch(() => setFeedOK(false));
}
function setFeedOK(ok){
  if (feedOK === ok) return;
  feedOK = ok;
  const note = document.getElementById("pv-dev-feed-note");
  if (note) note.style.display = ok ? "none" : "";
  // senza server il feed non può funzionare: nascondi URL/copia/emulatore
  ["pv-dev-url","pv-dev-copy","pv-dev-emu","pv-dev-hint"].forEach(id => {
    const el = document.getElementById(id); if (el) el.style.display = ok ? "" : "none";
  });
}
// Percorso della shell per l'iframe «Reale»: in sviluppo è servita dal server.py
// come /shell/ (root); in un hosting statico la si pubblica fianco a fianco con
// lo Studio (dist/studio/ + dist/shell/), quindi è "sorella" (../shell/). Si
// prova prima quella "sorella", poi quella in root.
function resolveShell(){
  const fr = pvFrame(); if (!fr) return;
  const cands = ["../shell/index.html?preview=1", "/shell/index.html?preview=1"];
  (async () => {
    for (const c of cands) {
      try {
        const r = await fetch(c.split("?")[0], { cache: "no-store" });
        if (r.ok) { if (fr.getAttribute("src") !== c) fr.setAttribute("src", c); return; }
      } catch (_) {}
    }
    // nessuna shell raggiungibile: resta l'URL attuale, il load handler
    // ripiegherà sulla modalità Modello con la relativa nota.
  })();
}

// IP LAN del computer (trucco WebRTC): serve all'URL da aprire sul telefono.
// In assenza (file://, browser che blocca le candidate) si usa l'hostname della pagina.
function lanIP(){
  return new Promise(res => {
    let done = false;
    const finish = ip => { if (!done) { done = true; res(ip); } };
    try {
      const R = window.RTCPeerConnection || window.webkitRTCPeerConnection;
      if (!R) return finish(null);
      const pc = new R({ iceServers: [] });
      pc.createDataChannel("");
      pc.onicecandidate = e => {
        const m = e && e.candidate && /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(e.candidate.candidate || "");
        if (m && m[1] !== "127.0.0.1") { finish(m[1]); try { pc.close(); } catch (_) {} }
      };
      setTimeout(() => finish(null), 1200);
      pc.createOffer().then(o => pc.setLocalDescription(o)).catch(() => finish(null));
    } catch (_) { finish(null); }
  });
}
function deviceUrl(ip){
  const port = location.port ? ":" + location.port : "";
  const host = ip || location.hostname || "localhost";
  return "http://" + host + port + "/shell/index.html?preview=1&themeFeed=/theme/current";
}
function refreshDeviceUrl(ip){
  const el = document.getElementById("pv-dev-url");
  if (!el) return;
  const u = deviceUrl(ip);
  el.textContent = u; el.dataset.url = u;
  const emu = document.getElementById("pv-dev-emu");
  if (emu) emu.textContent = "http://10.0.2.2" + (location.port ? ":" + location.port : "") + "/shell/index.html?preview=1&themeFeed=/theme/current";
}
function bindDevicePanel(){
  const copy = document.getElementById("pv-dev-copy");
  if (copy) copy.onclick = () => {
    const u = (document.getElementById("pv-dev-url") || {}).dataset.url || "";
    const done = () => { copy.textContent = "Copiato ✓"; setTimeout(() => { copy.textContent = "Copia"; }, 1400); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(done, done);
    else {
      const ta = document.createElement("textarea"); ta.value = u; document.body.appendChild(ta);
      ta.select(); try { document.execCommand("copy"); } catch (_) {} ta.remove(); done();
    }
  };
  refreshDeviceUrl();
  lanIP().then(ip => { if (ip) refreshDeviceUrl(ip); });
}

/* ---------------- anteprima launcher ---------------- */
const tile = a => `<div class="p-ic" style="background:${a.color}">${iconOf(a)}</div>`;
function rSpringboard(){
  const grid = gridApps().map(a=>`<div class="p-app" data-app="${a.id}" data-drag="1">${tile(a)}<span>${a.name}</span></div>`).join("");
  const dock = DOCK.map(a=>`<div class="p-app" data-app="${a.id}">${tile(a)}</div>`).join("");
  return `<div class="p-scroll" style="height:100%;display:flex;flex-direction:column;overflow:hidden"><div class="p-grid" id="p-grid">${grid}</div><div class="p-dock">${dock}</div></div>`;
}
function rList(){
  let body="";
  CATS.forEach(c=>{ body+=`<div class="p-cat">${c}</div>`+APPS.filter(a=>a.cat===c).map(a=>`<div class="p-row" data-app="${a.id}">${tile(a)}<b>${a.name}</b></div>`).join(""); });
  return `<div style="height:100%;display:flex;flex-direction:column"><div class="p-search">🔍 Cerca app</div><div class="p-list p-scroll">${body}</div></div>`;
}
function rDrawer(){
  const quick = DOCK.slice(0,4).map(a=>`<div class="p-qc" data-app="${a.id}">${iconOf(a)}<small>${a.name}</small></div>`).join("");
  return `<div class="p-dr"><button class="p-burger"><span></span><span></span><span></span></button>
    <div class="p-clock" id="pd-clock">9:41</div><div class="p-date" id="pd-date"></div><div class="p-quick">${quick}</div></div>`;
}
function rTiles(){
  const S={phone:"w2",camera:"h2",browser:"w2"};
  const t=APPS.map(a=>{const big=a.id==="clock"?`<div style="font-size:26px;font-weight:200;margin-top:auto" id="pt-clock">9:41</div>`:(a.id==="weather"?`<div style="font-size:26px;font-weight:200;margin-top:auto">22°</div>`:"");
    return `<div class="p-tile ${S[a.id]||""}" data-app="${a.id}" style="background:linear-gradient(150deg,${a.color},color-mix(in srgb,${a.color} 60%,#000))"><div class="ti">${iconOf(a)}</div>${big}<b>${a.name}</b></div>`;}).join("");
  return `<div class="p-tiles p-scroll">${t}</div>`;
}
function rDash(){
  const rec=["messages","browser","gallery","notes"].map(id=>{const a=APPS.find(x=>x.id===id);return `<div data-app="${a.id}"><div class="wic" style="background:${a.color}">${iconOf(a)}</div></div>`}).join("");
  const fav=DOCK.concat([APPS.find(a=>a.id==="settings")]).map(a=>`<div data-app="${a.id}"><div class="wic" style="background:${a.color}">${iconOf(a)}</div></div>`).join("");
  return `<div class="p-dash p-scroll">
    <div class="p-w"><div class="bigc" id="pw-clock">9:41</div><div style="color:var(--sdim);font-size:11px;text-transform:capitalize" id="pw-date"></div></div>
    <div class="p-w" style="display:flex;align-items:center;justify-content:space-between"><div style="display:flex;gap:10px;align-items:center;color:var(--stext)"><div style="font-size:30px">⛅</div><div><div style="font-size:12px">Meteo</div><div style="color:var(--sdim);font-size:10px">Nubi sparse</div></div></div><div style="font-size:24px;font-weight:300;color:var(--stext)">22°</div></div>
    <div class="p-w"><div class="wt">Recenti</div><div class="row">${rec}</div></div>
    <div class="p-w"><div class="wt">Preferite</div><div class="row" style="justify-content:space-around">${fav}</div></div></div>`;
}
function rRadial(){
  const ring=(arr,R)=>arr.map((a,i)=>{const ang=(i/arr.length)*Math.PI*2-Math.PI/2,x=Math.round(Math.cos(ang)*R),y=Math.round(Math.sin(ang)*R);
    return `<div class="p-ra" data-app="${a.id}" style="transform:translate(${x}px,${y}px);background:${a.color}">${iconOf(a)}</div>`;}).join("");
  return `<div class="p-radial"><div class="p-hub"><div class="t" id="pr-clock">9:41</div><small style="font-size:8px;opacity:.8">NOVA</small></div>${ring(APPS.slice(0,6),62)}${ring(APPS.slice(6,16),108)}</div>`;
}
function rCover(){
  const cv=APPS.map(a=>`<div class="p-cv" data-app="${a.id}" style="background:linear-gradient(160deg,${a.color},color-mix(in srgb,${a.color} 45%,#000))"><div class="cvi">${iconOf(a)}</div><b>${a.name}</b><small>${a.cat}</small></div>`).join("");
  return `<div class="p-cover p-scroll">${cv}</div>`;
}
// trascinamento icone nella griglia springboard (anteprima) → salva l'ordine nel tema
function enableGridDrag(){
  const grid = document.getElementById("p-grid"); if (!grid) return;
  grid.querySelectorAll('[data-drag]').forEach(el=>{
    el.addEventListener("pointerdown", e=>{
      if (e.button && e.button!==0) return;
      const sx=e.clientX, sy=e.clientY; let started=false;
      const hold=setTimeout(()=>{ started=true; el.classList.add("dragging"); try{el.setPointerCapture(e.pointerId);}catch(_){} }, 160);
      const move=ev=>{
        if(!started){ if(Math.hypot(ev.clientX-sx,ev.clientY-sy)>7){ clearTimeout(hold); cleanup(); } return; }
        const t=document.elementFromPoint(ev.clientX,ev.clientY);
        const over=t&&t.closest&&t.closest('[data-drag]');
        if(over&&over!==el){ const r=over.getBoundingClientRect();
          const before = ev.clientY < r.top + r.height/2 || (Math.abs(ev.clientY-(r.top+r.height/2))<r.height/2 && ev.clientX < r.left + r.width/2);
          grid.insertBefore(el, before?over:over.nextSibling);
        }
      };
      const up=()=>{ clearTimeout(hold); if(started){ el.classList.remove("dragging");
        theme.layout.order = [...grid.querySelectorAll('[data-drag]')].map(x=>x.dataset.app);
      } cleanup(); };
      function cleanup(){ el.removeEventListener("pointermove",move); el.removeEventListener("pointerup",up); el.removeEventListener("pointercancel",up); }
      el.addEventListener("pointermove",move); el.addEventListener("pointerup",up); el.addEventListener("pointercancel",up);
    });
  });
}
// ---- anteprima motore a blocchi (stesse classi di NovaOS) ----
function pAppIndex(){
  const apps = APPS.slice().sort((a,b)=>a.name.localeCompare(b.name,"it"));
  const groups={}; apps.forEach(a=>{ const L=(a.name[0]||"#").toUpperCase(); (groups[L]=groups[L]||[]).push(a); });
  const letters=Object.keys(groups).sort((a,b)=>a.localeCompare(b,"it"));
  return `<div class="ai-scroll">${letters.map(L=>
      `<div class="ai-hdr" data-letter="${L}">${L}</div>`+
      groups[L].map(a=>`<div class="ai-row"><div class="ai-ic" style="background:${a.color}">${iconOf(a)}</div><span>${esc(a.name)}</span></div>`).join("")
    ).join("")}</div>
    <div class="ai-rail">${letters.map(L=>`<span data-jump="${L}">${L}</span>`).join("")}</div>
    <div class="ai-bubble"></div>`;
}
const PBLK = {
  clock:   p => `<div class="blk-clock ${p&&p.size==="small"?"blk-clock-sm":""}" id="pb-clock">9:41</div><div class="blk-cdate" id="pb-date"></div>`,
  search:  p => `<div class="blk-search"><span>🔍</span><input type="search" placeholder="Cerca app" disabled></div>`,
  appindex:p => pAppIndex(),
  appgrid: p => { const cols=Math.min(5,Math.max(3,+(p&&p.cols)||4)); return `<div class="blk-grid" style="--blk-cols:${cols}">`+APPS.map(a=>`<div class="blk-gapp"><div class="blk-gic" style="background:${a.color}">${iconOf(a)}</div><span>${esc(a.name)}</span></div>`).join("")+`</div>`; },
  dock:    p => `<div class="blk-dock">`+DOCK.map(a=>`<div><div class="blk-dic" style="background:${a.color}">${iconOf(a)}</div></div>`).join("")+`</div>`,
  weather: p => `<div class="blk-wcard"><div class="lft"><div class="em">⛅</div><div><div class="t">Meteo</div><div class="s">Nubi sparse</div></div></div><div class="tp">22°</div></div>`,
  bubbles: p => { let h=""; CATS.forEach(c=>{ const apps=APPS.filter(a=>a.cat===c); if(!apps.length) return;
      h+=`<div class="bb-cat"><div class="bb-head"><div class="bb-bubble"><div class="bb-rep" style="background:${apps[0].color}">${iconOf(apps[0])}</div><span class="bb-count">${apps.length}</span></div><div class="bb-name">${esc(c)}</div></div><div class="bb-apps">`
        +apps.map(a=>`<div class="bb-app"><div class="bb-ic" style="background:${a.color}">${iconOf(a)}</div><small>${esc(a.name)}</small></div>`).join("")+`</div></div>`; });
      return `<div class="bb-wrap">${h}</div>`; },
  arc:     p => { const apps=APPS.slice(0,9), R=110, n=apps.length;
      return `<div class="arc-wrap">`+apps.map((a,i)=>{ const ang=(n<=1?0:(i/(n-1))*90)*Math.PI/180; const x=-Math.round(Math.sin(ang)*R), y=-Math.round(Math.cos(ang)*R);
        return `<div class="arc-app" style="--x:${x}px;--y:${y}px"><div class="arc-ic" style="background:${a.color}">${iconOf(a)}</div></div>`; }).join("")
        +`<button class="arc-fab"><span></span><span></span></button></div>`; },
  deck:    p => `<div class="deck-wrap">`+APPS.map(a=>`<div class="deck-card" style="background:linear-gradient(160deg,${a.color},color-mix(in srgb,${a.color} 42%,#000))"><div class="deck-ic">${iconOf(a)}</div><b>${esc(a.name)}</b><small>${esc(a.cat)}</small></div>`).join("")+`</div>`,
};
function rBlocksFrom(blocks){
  return `<div class="lc-blocks">${(blocks||[]).map(b=>{ const fn=PBLK[b.type]; if(!fn) return ""; return `<div class="blk blk-${b.type}">${fn(b.params||{})}</div>`; }).join("")}</div>`;
}
function rBlocks(){ return rBlocksFrom(theme.layout.blocks); }
// scrubber A-Z interattivo anche nell'anteprima
function enableIndexScrub(){
  const rail=$("#phome .ai-rail"), scroll=$("#phome .ai-scroll"), bubble=$("#phome .ai-bubble"), home=$("#phome .blk-appindex");
  if(!rail||!scroll||!home) return;
  const letters=[...rail.querySelectorAll("span")].map(s=>s.dataset.jump);
  const jump=L=>{ const h=home.querySelector(`.ai-hdr[data-letter="${L}"]`); if(h) scroll.scrollTop=h.offsetTop-4; };
  let bt=null; const bub=L=>{ bubble.textContent=L; bubble.classList.add("on"); clearTimeout(bt); bt=setTimeout(()=>bubble.classList.remove("on"),480); };
  const at=y=>{ const r=rail.getBoundingClientRect(); const i=Math.min(letters.length-1,Math.max(0,Math.floor((y-r.top)/(r.height/letters.length)))); const L=letters[i]; if(L){jump(L);bub(L);} };
  let active=false;
  rail.addEventListener("pointerdown",e=>{active=true;at(e.clientY);try{rail.setPointerCapture(e.pointerId);}catch(_){}});
  rail.addEventListener("pointermove",e=>{if(active)at(e.clientY);});
  const off=()=>active=false; rail.addEventListener("pointerup",off); rail.addEventListener("pointercancel",off);
}
const RENDER = {springboard:rSpringboard,list:rList,drawer:rDrawer,tiles:rTiles,dash:rDash,radial:rRadial,cover:rCover, index:()=>rBlocksFrom(INDEX_BLOCKS)};

/* ---------------- applica tema + anteprima ---------------- */
function applyPreview(){
  const c = theme.colors, s = $("#screen").style;
  s.setProperty("--sacc", c.accent);
  s.setProperty("--sbg", c.bg);
  s.setProperty("--ssurf", c.surface);
  s.setProperty("--ssurf2", c["surface-2"]);
  s.setProperty("--stext", c.text);
  s.setProperty("--sdim", c["text-dim"]);
  s.setProperty("--sradius", SHAPE_RADIUS[theme.shape.iconShape]||"15px");
  // sfondo: gradiente sopra bg, oppure tinta unita
  const wp = theme.wallpaper||{};
  if (wp.type==="solid") $("#screen").style.background = wp.value;
  else if (wp.type==="gradient" && wp.value) $("#screen").style.background = `${wp.value}, var(--sbg)`;
  else $("#screen").style.background = "";  // usa il default CSS (glow accento)
  // scala testo
  $("#phome").style.setProperty("--fscale", theme.typography.textScale/100);
  $("#phome").style.fontSize = (12.5*theme.typography.textScale/100)+"px";
  // tipografia: famiglia font e spessore testi (stesse classi della shell reale)
  const tf = theme.typography || {};
  $("#phome").classList.toggle("tf-serif", tf.font==="serif");
  $("#phome").classList.toggle("tf-mono",  tf.font==="mono");
  $("#phome").classList.toggle("tf-medium", tf.weight==="medium");
  $("#phome").classList.toggle("tf-bold",  tf.weight==="bold");
  // launcher / layout a blocchi
  const isCustom = theme.layout.engine==="blocks";
  $("#phome").innerHTML = isCustom ? rBlocks() : (RENDER[theme.layout.id]||rSpringboard)();
  $("#phome").querySelectorAll("[data-app]").forEach(el=>el.onclick=()=>{ el.animate?el.animate([{opacity:.4},{opacity:1}],{duration:220}):0; });
  if (!isCustom && theme.layout.id==="springboard") enableGridDrag();
  enableIndexScrub();   // attiva lo scrubber A-Z se presente (index o custom)
  // interattività dei nuovi blocchi in anteprima
  $("#phome").querySelectorAll(".bb-head").forEach(h=>h.onclick=()=>h.parentElement.classList.toggle("open"));
  const fab=$("#phome .arc-fab"); if(fab) fab.onclick=()=>fab.closest(".arc-wrap").classList.toggle("open");
  if (isCustom) $("#caption").textContent = `Layout personalizzato · ${(theme.layout.blocks||[]).length} blocchi`;
  else { const L = LAUNCHERS.find(l=>l.id===theme.layout.id); $("#caption").textContent = L?L.cap:""; }
  tickClock();
  buildVerify();   // aggiorna la verifica/QA e il badge di stato dal vivo
  drawThumb();     // miniatura del tema, aggiornata dal vivo
  pushTheme();     // anteprima reale: applica il tema alla shell embeddata
}

/* ---------------- controlli ---------------- */
// cambia launcher: id predefinito oppure "__custom__" (layout a blocchi componibile)
function setLauncher(id){
  if (id==="__custom__"){
    if (theme.layout.engine!=="blocks") theme.layout = { engine:"blocks", name: theme.meta.name||"Personalizzato", blocks: DEFAULT_BLOCKS() };
  } else {
    theme.layout = { id, params:{}, order: (theme.layout.engine==="blocks" ? [] : (theme.layout.order||[])) };
  }
  buildLaunchers(); applyPreview();
}
function buildLaunchers(){
  const isCustom = theme.layout.engine==="blocks";
  const cards = LAUNCHERS.map(l=>`<div class="lcard ${(!isCustom&&theme.layout.id===l.id)?'on':''}" data-lch="${l.id}"><div class="g"><svg viewBox="0 0 24 24">${l.ic}</svg></div><div style="min-width:0"><b>${l.name}</b><small>${l.desc}</small></div></div>`).join("")
    + `<div class="lcard ${isCustom?'on':''}" data-lch="__custom__"><div class="g"><svg viewBox="0 0 24 24">${LG.custom}</svg></div><div style="min-width:0"><b>Personalizzato</b><small>Componi a blocchi</small></div></div>`;
  $("#f-launcher").innerHTML = cards;
  $("#f-launcher").querySelectorAll("[data-lch]").forEach(el=>el.onclick=()=>setLauncher(el.dataset.lch));
  const L = isCustom ? null : LAUNCHERS.find(x=>x.id===theme.layout.id);
  $("#lch-hint").textContent = isCustom ? "Componi la home trascinando/aggiungendo blocchi qui sotto. Si importa in NovaOS come launcher «Personalizzato»." : (L?L.cap:"");
  buildComposer();
}
// compositore: elenco blocchi (riordino ↑↓, rimozione, parametri) + aggiunta blocchi
function buildComposer(){
  const box = $("#composer");
  if (theme.layout.engine!=="blocks"){ box.style.display="none"; box.innerHTML=""; return; }
  box.style.display="";
  const blocks = theme.layout.blocks || (theme.layout.blocks=[]);
  const list = blocks.length ? `<div class="comp-blocks">${blocks.map((b,i)=>{
    const def = BLOCK_BY[b.type] || {name:b.type, ic:"", params:[]};
    const params = def.params.map(p=>{
      const cur = (b.params&&b.params[p.key]!=null) ? b.params[p.key] : p.def;
      if (p.type==="seg") return `<div class="field"><label>${p.label}</label><div class="seg" data-bp="${i}:${p.key}">${p.opts.map(([v,lab])=>`<button data-v="${v}" class="${String(cur)===String(v)?'on':''}">${lab}</button>`).join("")}</div></div>`;
      return "";
    }).join("");
    return `<div class="comp-item">
      <div class="comp-head"><span class="ci"><svg viewBox="0 0 24 24">${def.ic}</svg></span><b>${def.name}</b>
        <button data-up="${i}" ${i===0?"disabled":""} title="Su">↑</button>
        <button data-down="${i}" ${i===blocks.length-1?"disabled":""} title="Giù">↓</button>
        <button data-del="${i}" title="Rimuovi" style="color:var(--accent-2)">✕</button></div>
      ${params?`<div class="comp-params">${params}</div>`:""}
    </div>`;
  }).join("")}</div>` : `<div class="comp-empty">Nessun blocco: aggiungine uno qui sotto.</div>`;
  const add = `<div class="comp-add">${BLOCK_DEFS.map(d=>`<button data-add="${d.type}"><svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.7">${d.ic}</svg>${d.name}</button>`).join("")}</div>`;
  box.innerHTML = list + add;
  box.querySelectorAll("[data-add]").forEach(el=>el.onclick=()=>{ const d=BLOCK_BY[el.dataset.add]; const params={}; d.params.forEach(p=>params[p.key]=p.def); blocks.push({type:d.type,params}); buildComposer(); applyPreview(); });
  box.querySelectorAll("[data-del]").forEach(el=>el.onclick=()=>{ blocks.splice(+el.dataset.del,1); buildComposer(); applyPreview(); });
  box.querySelectorAll("[data-up]").forEach(el=>el.onclick=()=>{ const i=+el.dataset.up; if(i>0){ [blocks[i-1],blocks[i]]=[blocks[i],blocks[i-1]]; buildComposer(); applyPreview(); } });
  box.querySelectorAll("[data-down]").forEach(el=>el.onclick=()=>{ const i=+el.dataset.down; if(i<blocks.length-1){ [blocks[i+1],blocks[i]]=[blocks[i],blocks[i+1]]; buildComposer(); applyPreview(); } });
  box.querySelectorAll("[data-bp]").forEach(seg=>{ const [i,key]=seg.dataset.bp.split(":"); seg.querySelectorAll("[data-v]").forEach(btn=>btn.onclick=()=>{ blocks[+i].params=blocks[+i].params||{}; blocks[+i].params[key]= (key==="cols") ? +btn.dataset.v : btn.dataset.v; buildComposer(); applyPreview(); }); });
}
function buildColors(){
  $("#f-colors").innerHTML = COLOR_KEYS.map(([k,label])=>`<div class="field"><label>${label}</label><input type="color" data-col="${k}" value="${theme.colors[k]||'#000000'}"></div>`).join("");
  $("#f-colors").querySelectorAll("[data-col]").forEach(inp=>inp.oninput=()=>{ theme.colors[inp.dataset.col]=inp.value; applyPreview(); });
}
function buildWalls(){
  $("#f-walls").innerHTML = WALLS.map((w,i)=>{
    const on = (theme.wallpaper.type!=="solid") && ((w.css===""&&(!theme.wallpaper.value))||(theme.wallpaper.value===w.css));
    const bg = w.css ? `${w.css}, ${theme.colors.bg}` : theme.colors.bg;
    return `<div class="wsw ${on?'on':''}" data-wall="${i}" title="${w.name}" style="background:${bg}"></div>`;
  }).join("");
  $("#f-walls").querySelectorAll("[data-wall]").forEach(el=>el.onclick=()=>{ const w=WALLS[+el.dataset.wall]; theme.wallpaper={type:"gradient",value:w.css}; buildWalls(); applyPreview(); });
}
function syncSegs(){
  $("#f-base").querySelectorAll("[data-base]").forEach(b=>b.classList.toggle("on", b.dataset.base===theme.meta.base));
  $("#f-shape").querySelectorAll("[data-shape]").forEach(b=>b.classList.toggle("on", b.dataset.shape===theme.shape.iconShape));
  $("#f-istyle").querySelectorAll("[data-istyle]").forEach(b=>b.classList.toggle("on", b.dataset.istyle===theme.shape.iconStyle));
  $("#f-font").querySelectorAll("[data-font]").forEach(b=>b.classList.toggle("on", b.dataset.font===theme.typography.font));
  $("#f-weight").querySelectorAll("[data-weight]").forEach(b=>b.classList.toggle("on", b.dataset.weight===theme.typography.weight));
}
// icon-pack + override per-app. Ogni icona si personalizza (emoji o immagine)
// toccandola; l'icon-pack corrente si importa/esporta come file JSON (così i pack
// con immagini si distribuiscono e si condividono come un singolo file).
function buildIcons(){
  if (!PACKS.aura.map.phone) PACKS.aura.map = auraMap();   // genera le icone immagine al primo uso
  if (!PACKS.nova.map.phone) PACKS.nova.map = novaMap();   // icone SVG NovaOS al primo uso
  $("#f-pack").innerHTML = Object.entries(PACKS).map(([k,p])=>`<button data-pack="${k}" class="${theme.icons.pack===k?'on':''}">${esc(p.name)}</button>`).join("");
  $("#f-pack").querySelectorAll("[data-pack]").forEach(b=>b.onclick=()=>{ theme.icons.pack=b.dataset.pack; buildIcons(); applyPreview(); });
  const imp = document.querySelector("#f-pack-actions [data-pk-import]"); if (imp) imp.onclick = importPack;
  const exp = document.querySelector("#f-pack-actions [data-pk-export]"); if (exp) exp.onclick = exportPack;
  $("#f-iconmap").innerHTML = APPS.map(a=>`<div class="ichip ${theme.icons.map[a.id]?'ov':''}" data-ic="${a.id}" title="${esc(a.name)}">${iconOf(a)}</div>`).join("");
  $("#f-iconmap").querySelectorAll("[data-ic]").forEach(el=>el.onclick=()=>editIcon(el));
}
function editIcon(el){
  const id = el.dataset.ic, a = APPS.find(x => x.id === id);
  const box = document.getElementById("f-iconedit"); if (!box) return;
  box.innerHTML = `<div class="ic-edit">
    <div class="ic-edit-ic">${iconOf(a)}</div>
    <div class="ic-edit-info"><b>${esc(a.name)}</b><small>${theme.icons.map[id] ? "personalizzata" : "dal pack / default"}</small></div>
    <div class="ic-edit-actions">
      <button class="btn" data-ic-emoji>Emoji</button>
      <button class="btn" data-ic-img>Immagine…</button>
      <button class="btn" data-ic-svg>SVG…</button>
      ${theme.icons.map[id] ? `<button class="btn danger" data-ic-reset>Rimuovi</button>` : ""}
      <button class="btn" data-ic-close>Chiudi</button>
    </div>
  </div>`;
  const close = () => { box.innerHTML = ""; };
  box.querySelector("[data-ic-close]").onclick = close;
  const reset = box.querySelector("[data-ic-reset]");
  if (reset) reset.onclick = () => { delete theme.icons.map[id]; buildIcons(); applyPreview(); close(); };
  box.querySelector("[data-ic-emoji]").onclick = () => {
    const cur = normIcon(theme.icons.map[id]);
    const v = prompt("Emoji per " + a.name + ":", (cur && !isImgVal(cur) && !isSvgVal(cur)) ? cur : "");
    if (v == null) return; const t = v.trim();
    if (t) { if (t !== a.icon) theme.icons.map[id] = { type:"emoji", value:t }; }
    else delete theme.icons.map[id];
    buildIcons(); applyPreview(); close();
  };
  box.querySelector("[data-ic-svg]").onclick = () => {
    const cur = normIcon(theme.icons.map[id]);
    const v = prompt("Codice SVG per " + a.name + " (viewBox 0 0 24 24):", (cur && isSvgVal(cur)) ? cur : "");
    if (v == null) return; const t = v.trim();
    if (t && isSvgVal(t)) { theme.icons.map[id] = { type:"svg", value:t }; }
    else if (t) alert("Codice SVG non valido: serve un elemento <svg>…</svg> completo, senza script.");
    else delete theme.icons.map[id];
    buildIcons(); applyPreview(); close();
  };
  box.querySelector("[data-ic-img]").onclick = () => {
    const fi = document.createElement("input"); fi.type = "file"; fi.accept = "image/*";
    fi.onchange = () => { const f = fi.files && fi.files[0]; if (!f) return;
      resizeImage(f, 128).then(dataUrl => {
        theme.icons.map[id] = { type:"image", value:dataUrl };
        buildIcons(); applyPreview(); close();
      }).catch(err => alert("Immagine non valida: " + err.message));
    };
    fi.click();
  };
}
// ridimensiona un'immagine a lato max 128px e la restituisce come PNG data URL
// (le icone della home sono ~56px: 128px basta per i display retina).
function resizeImage(file, max){
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { try {
        const s = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * s)), h = Math.max(1, Math.round(img.height * s));
        const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
        cv.getContext("2d").drawImage(img, 0, 0, w, h);
        res(cv.toDataURL("image/png"));
      } catch (e) { rej(e); } finally { URL.revokeObjectURL(url); } };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("il file non è un'immagine")); };
    img.src = url;
  });
}
// importa un icon-pack JSON: { name, map: { id: emoji | {type,value} } }.
// Le immagini sono data URL/URL https; emoji brevi senza caratteri HTML pericolosi.
function importPack(){
  const fi = document.createElement("input"); fi.type = "file"; fi.accept = ".json,application/json";
  fi.onchange = () => { const f = fi.files && fi.files[0]; if (!f) return;
    const rd = new FileReader();
    rd.onload = () => { try {
        const t = JSON.parse(rd.result);
        if (!t || typeof t !== "object" || !t.name || !t.map || typeof t.map !== "object") throw new Error("atteso { name, map }");
        const key = "custom-" + (++customPackSeq);
        const pack = { name: String(t.name).trim() || "Pack importato", map: {} };
        Object.entries(t.map).forEach(([id, v]) => {
          if (!APPS.some(a => a.id === id)) return;                       // ignora app sconosciute
          const obj = (v && typeof v === "object");
          const val = obj ? v.value : v;
          if (typeof val !== "string" || !val) return;
          if (isSvgVal(val)) { pack.map[id] = { type:"svg", value:val }; return; }   // icone vettoriali
          if (/[<>"'`]/.test(val)) return;
          if (isImgVal(val) || (val.length <= 8 && !/^data:|^https?:|^javascript:/i.test(val))) pack.map[id] = obj ? v : { type:"emoji", value:val };
        });
        if (!Object.keys(pack.map).length) throw new Error("nessuna icona valida");
        PACKS[key] = pack; theme.icons.pack = key;
        buildIcons(); applyPreview();
        alert("Icon-pack «" + pack.name + "» importato (" + Object.keys(pack.map).length + " icone).");
      } catch (e) { alert("Import non riuscito: " + e.message); } };
    rd.readAsText(f);
  };
  fi.click();
}
// esporta l'icon-pack corrente: cuoce per ogni app l'icona effettiva (pack + override)
// come { type, value }, pronta da ridistribuire o importare in un altro Studio/NovaOS.
function exportPack(){
  const p = PACKS[theme.icons.pack] || PACKS.default;
  const map = {};
  APPS.forEach(a => { const v = iconValue(a); const base = a.icon;
    if (v && v !== base) map[a.id] = isImgVal(v) ? { type:"image", value:v } : isSvgVal(v) ? { type:"svg", value:v } : { type:"emoji", value:v }; });
  const blob = new Blob([JSON.stringify({ name:p.name, map }, null, 2)], { type:"application/json" });
  const u = URL.createObjectURL(blob), a2 = document.createElement("a");
  a2.href = u; a2.download = "iconpack-" + theme.icons.pack + ".json"; a2.click();
  setTimeout(() => URL.revokeObjectURL(u), 4000);
}
// suoni: selezione builtin + anteprima WebAudio
let AC=null;
function playSeq(seq){
  if(!seq||!seq.length) return;
  try{ AC = AC || new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ return; }
  if(AC.state==="suspended") AC.resume();
  let t=AC.currentTime+0.02;
  seq.forEach(([f,d])=>{ if(f>0){ const o=AC.createOscillator(),g=AC.createGain();
    o.type="sine"; o.frequency.value=f;
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.28,t+0.012); g.gain.exponentialRampToValueAtTime(0.0001,t+d);
    o.connect(g).connect(AC.destination); o.start(t); o.stop(t+d+0.03); } t+=d; });
}
function buildSounds(){
  const rows=[["ringtone","Suoneria"],["notif","Notifica"],["alarm","Sveglia"]];
  $("#f-sounds").innerHTML = rows.map(([k,label])=>{
    const names=Object.keys(SND[k]);
    const cur=theme.sounds[k]||{};
    const isSeq=cur.type==="sequence";
    if (isSeq && !customSeq[k]) customSeq[k]=cur.value;   // sequenza arrivata da un tema importato
    const opts=names.map(n=>`<option value="${n}" ${(!isSeq&&cur.value===n)?"selected":""}>${n}</option>`).join("")
      + `<option value="__seq" ${isSeq?"selected":""} ${(isSeq||customSeq[k])?"":"disabled"}>◈ Sequenza personalizzata</option>`;
    return `<div class="field"><label>${label}</label>
      <select data-snd="${k}">${opts}</select>
      ${isSeq?`<button class="btn" data-edit="${k}" style="padding:7px 10px" title="Modifica la sequenza nel mini-sequencer">✎</button>`:""}
      <button class="btn" data-play="${k}" style="padding:7px 12px" title="Ascolta">▶</button></div>`;
  }).join("");
  $("#f-sounds").querySelectorAll("[data-snd]").forEach(sel=>sel.onchange=()=>{
    const k=sel.dataset.snd;
    if(sel.value==="__seq") theme.sounds[k]={type:"sequence", value:customSeq[k]||[]};
    else theme.sounds[k]={type:"builtin", value:sel.value};
    buildSounds();
  });
  $("#f-sounds").querySelectorAll("[data-play]").forEach(b=>b.onclick=()=>{
    const k=b.dataset.play, cur=theme.sounds[k]||{};
    playSeq(cur.type==="sequence" ? cur.value : (SND[k][cur.value]||[]));
  });
  $("#f-sounds").querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>{
    const k=b.dataset.edit, cur=theme.sounds[k];
    if(cur && cur.type==="sequence"){
      seqFromArr(cur.value);
      $("#f-seq-target").value=k;
      buildSeq(); applyPreview();
      $("#f-seq-card").scrollIntoView({behavior:"smooth", block:"nearest"});
    }
  });
  buildSeq();
}
// modelli pronti: griglia di card; al clic carica il modello come nuovo tema.
function buildPresets(){
  const box = $("#f-presets"); if (!box) return;
  box.innerHTML = PRESETS.map(p=>`<div class="lcard" data-preset="${p.id}"><div class="g"><svg viewBox="0 0 24 24">${p.ic}</svg></div><div style="min-width:0"><b>${p.name}</b><small>${p.desc}</small></div></div>`).join("");
  box.querySelectorAll("[data-preset]").forEach(el=>el.onclick=()=>{
    const p = PRESETS.find(x=>x.id===el.dataset.preset); if (!p) return;
    if (!confirm(`Partire dal modello «${p.name}»? Le modifiche non esportate del tema attuale andranno perse.`)) return;
    const t = p.make(); t.meta.author = "";   // nuovo tema dell'utente
    loadTheme(t);
    buildAll();
  });
}
function buildAll(){
  $("#f-name").value = theme.meta.name||"";
  $("#f-author").value = theme.meta.author||"";
  $("#f-ts").value = theme.typography.textScale; $("#ts-v").textContent = theme.typography.textScale+"%";
  const tf = theme.typography || {};
  if (!theme.typography.font) theme.typography.font = "system";
  if (!theme.typography.weight) theme.typography.weight = "normal";
  $("#f-solid").value = theme.colors.bg;
  buildPresets(); buildLaunchers(); buildColors(); buildWalls(); buildIcons(); buildSounds(); syncSegs(); applyPreview();
}

/* ---------------- verifica / QA del tema ---------------- */
// contrasto WCAG tra due colori esadecimali
function hexRgb(h){ h=String(h||"").trim().replace(/^#/,""); if(h.length===3) h=h.split("").map(c=>c+c).join(""); if(!/^[0-9a-f]{6}$/i.test(h)) return null; const n=parseInt(h,16); return [(n>>16)&255,(n>>8)&255,n&255]; }
function luminance(rgb){ const a=rgb.map(v=>{ v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); }); return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2]; }
function contrast(h1,h2){ const a=hexRgb(h1), b=hexRgb(h2); if(!a||!b) return null; const l1=luminance(a), l2=luminance(b); const hi=Math.max(l1,l2), lo=Math.min(l1,l2); return (hi+0.05)/(lo+0.05); }
const r2 = x => Math.round(x*10)/10;

// requisiti di versione NovaOS per funzione usata (build → etichetta versione)
const VER_LABEL = { 32:"0.1.31", 35:"0.1.34", 40:"0.1.39" };

function validateTheme(){
  const out = [];
  const c = theme.colors || {};
  // --- contrasto (leggibilità) ---
  const cText = contrast(c.text, c.bg);
  if (cText!=null){
    if (cText < 3)      out.push({level:"error", msg:`Testo poco leggibile sullo sfondo`, sub:`Contrasto ${r2(cText)}:1 (minimo consigliato 4.5:1)`});
    else if (cText < 4.5) out.push({level:"warn", msg:`Contrasto testo/sfondo basso`, sub:`${r2(cText)}:1 — sotto AA (4.5:1)`});
    else out.push({level:"ok", msg:`Testo leggibile sullo sfondo`, sub:`Contrasto ${r2(cText)}:1`});
  }
  const cRow = contrast(c.text, c.surface);
  if (cRow!=null && cRow < 4.5) out.push({level:"warn", msg:`Testo sulle superfici (righe/schede) poco contrastato`, sub:`${r2(cRow)}:1 su «surface»`});
  const cDim = contrast(c["text-dim"], c.bg);
  if (cDim!=null && cDim < 3) out.push({level:"warn", msg:`Testo secondario (tenue) poco leggibile`, sub:`${r2(cDim)}:1 (minimo 3:1)`});
  const cAcc = contrast(c.accent, "#ffffff");
  if (cAcc!=null && cAcc < 3) out.push({level:"warn", msg:`Accento troppo chiaro per il testo bianco dei pulsanti`, sub:`${r2(cAcc)}:1 con #fff (minimo 3:1)`});
  // --- validità campi ---
  if (!(theme.meta && (theme.meta.name||"").trim())) out.push({level:"warn", msg:`Nome del tema mancante`, sub:`Verrà usato un nome generico`});
  const badCol = COLOR_KEYS.filter(([k])=>!hexRgb(c[k])).map(([,l])=>l);
  if (badCol.length) out.push({level:"error", msg:`Colori non validi: ${badCol.join(", ")}`});
  // --- override icone (stessa regola di sicurezza di NovaOS) ---
  let badIcons = 0;
  Object.values(theme.icons&&theme.icons.map||{}).forEach(o=>{ const v=(o&&typeof o==="object")?o.value:o; const s=String(v==null?"":v);
    const okImg=/^data:image\//i.test(s)||/^https:\/\//i.test(s); const okText=!/^data:|^https?:|^javascript:/i.test(s)&&s.length<=8 && !/[<>"'`]/.test(s);
    if (s && !okImg && !okText) badIcons++; });
  if (badIcons) out.push({level:"error", msg:`${badIcons} icona/e personalizzata/e non valida/e`, sub:`NovaOS le scarterà (solo emoji brevi o URL data:image//https)`});
  // --- suoni ---
  const sndBad=[];
  [["ringtone","Suoneria",RING],["notif","Notifica",NOTIF],["alarm","Sveglia",ALARM]].forEach(([k,lab,set])=>{
    const s=theme.sounds&&theme.sounds[k]; if(!s) return;
    if(s.type==="sequence"){ if(!Array.isArray(s.value)||!s.value.length) sndBad.push(lab+" (sequenza vuota)"); return; }
    const v=s.value; if(v && !(v in set)) sndBad.push(lab);
  });
  if (sndBad.length) out.push({level:"warn", msg:`Suoni non riconosciuti: ${sndBad.join(", ")}`, sub:`NovaOS userà quelli predefiniti`});
  // --- layout / raggiungibilità app ---
  let minBuild = 32;
  if (theme.layout.engine==="blocks"){
    minBuild = Math.max(minBuild, 40);
    const types = (theme.layout.blocks||[]).map(b=>b.type);
    if (!types.length) out.push({level:"error", msg:`Layout personalizzato vuoto`, sub:`Aggiungi almeno un blocco`});
    else if (!types.includes("appindex") && !types.includes("appgrid"))
      out.push({level:"warn", msg:`Le app non sono tutte raggiungibili`, sub:`Aggiungi un blocco «Indice A-Z» o «Griglia app»`});
    else out.push({level:"ok", msg:`Layout personalizzato valido`, sub:`${types.length} blocchi`});
  }
  if (Object.keys(theme.icons&&theme.icons.map||{}).length) minBuild = Math.max(minBuild, 35);
  out.push({level:"info", msg:`Compatibile con NovaOS build ≥ ${minBuild}`, sub:`versione ${VER_LABEL[minBuild]||"—"} o successiva`});
  return out;
}
function buildVerify(){
  const issues = validateTheme();
  const errs = issues.filter(i=>i.level==="error").length;
  const warns = issues.filter(i=>i.level==="warn").length;
  const ICON = {error:"✕", warn:"!", ok:"✓", info:"i"};
  const box = $("#f-verify");
  if (box) box.innerHTML = `<div class="vlist">${issues.map(i=>`<div class="vrow ${i.level}"><span class="vi">${ICON[i.level]}</span><span class="vm">${esc(i.msg)}${i.sub?`<small>${esc(i.sub)}</small>`:""}</span></div>`).join("")}</div>`;
  const badge = $("#verify-badge");
  if (badge){
    if (errs){ badge.className="vbadge err"; badge.textContent=`✕ ${errs} da correggere`; }
    else if (warns){ badge.className="vbadge warn"; badge.textContent=`! ${warns} avvis${warns>1?"i":"o"}`; }
    else { badge.className="vbadge ok"; badge.textContent="✓ Tema valido"; }
  }
  return { errs, warns };
}

/* ---------------- clock ---------------- */
function tickClock(){
  const d=new Date(), t=d.getHours()+":"+String(d.getMinutes()).padStart(2,"0");
  const date=d.toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long"});
  $("#p-clock").textContent=t;
  ["#pd-clock","#pt-clock","#pw-clock","#pr-clock","#pb-clock"].forEach(s=>{const e=$(s); if(e)e.textContent=t;});
  ["#pd-date","#pw-date","#pb-date"].forEach(s=>{const e=$(s); if(e)e.textContent=date;});
}

/* ---------------- eventi ---------------- */
$("#f-name").oninput = e => theme.meta.name = e.target.value;
$("#f-author").oninput = e => theme.meta.author = e.target.value;
$("#f-base").querySelectorAll("[data-base]").forEach(b=>b.onclick=()=>{
  const keep = { name:theme.meta.name, author:theme.meta.author, layout:theme.layout, shape:theme.shape, typography:theme.typography };
  const t = freshTheme(b.dataset.base);
  t.meta.name=keep.name; t.meta.author=keep.author; t.layout=keep.layout; t.shape=keep.shape; t.typography=keep.typography;
  loadTheme(t);
  buildAll();
});
$("#f-shape").querySelectorAll("[data-shape]").forEach(b=>b.onclick=()=>{ theme.shape.iconShape=b.dataset.shape; syncSegs(); applyPreview(); });
$("#f-istyle").querySelectorAll("[data-istyle]").forEach(b=>b.onclick=()=>{ theme.shape.iconStyle=b.dataset.istyle; syncSegs(); });
$("#f-ts").oninput = e => { theme.typography.textScale=+e.target.value; $("#ts-v").textContent=e.target.value+"%"; applyPreview(); };
$("#f-font").querySelectorAll("[data-font]").forEach(b=>b.onclick=()=>{ theme.typography.font=b.dataset.font; syncSegs(); applyPreview(); });
$("#f-weight").querySelectorAll("[data-weight]").forEach(b=>b.onclick=()=>{ theme.typography.weight=b.dataset.weight; syncSegs(); applyPreview(); });
$("#f-solid-use").onclick = () => { theme.wallpaper={type:"solid",value:$("#f-solid").value}; buildWalls(); applyPreview(); };

$("#new").onclick = () => { loadTheme(freshTheme(theme.meta.base)); buildAll(); };
// Costruisce il JSON .novatheme/2 "pulito": valida, allinea la forma icone e "cuoce"
// nella map l'icona effettiva (pack + override) di ogni app diversa dal default.
// Usato sia dall'export (download) sia dalla condivisione.
function buildExport() {
  const v = buildVerify();
  if (v.errs && !confirm(`Il tema ha ${v.errs} problema/i da correggere (vedi «Verifica tema»). Esportare comunque?`)) return null;
  const clean = JSON.parse(JSON.stringify(theme));
  clean.icons.shape = clean.shape.iconShape;
  clean.icons.map = {};
  APPS.forEach(a => { const v = iconValue(a); if (v !== a.icon) clean.icons.map[a.id] = isImgVal(v) ? { type:"image", value:v } : isSvgVal(v) ? { type:"svg", value:v } : { type:"emoji", value:v }; });
  if (clean.layout && clean.layout.engine==="blocks") {
    clean.layout.name = theme.meta.name || "Personalizzato";
    clean.layout.blocks = (clean.layout.blocks||[]).filter(b=>b&&BLOCK_BY[b.type]).map(b=>({ type:b.type, params:b.params||{} }));
  }
  if (clean.layout.order && !clean.layout.order.length) delete clean.layout.order;
  return clean;
}
const themeFileName = () => ((theme.meta.id||"tema").replace(/[^a-z0-9-]/gi,"-").toLowerCase());
const downloadThemeJson = (json, name) => {
  const blob = new Blob([json],{type:"application/json"});
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
  a.download = name; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),2000);
};
$("#export").onclick = () => {
  const clean = buildExport(); if (!clean) return;
  downloadThemeJson(JSON.stringify(clean,null,2), themeFileName() + ".novatheme.json");
};
$("#share").onclick = async () => {
  const clean = buildExport(); if (!clean) return;
  const json = JSON.stringify(clean,null,2);
  const name = themeFileName() + ".novatheme.json";
  // Web Share API con file: apre il pannello di condivisione di sistema (Android/iOS).
  const file = new File([json], name, { type:"application/json" });
  if (navigator.share && navigator.canShare && navigator.canShare({ files:[file] })) {
    try {
      await navigator.share({ files:[file], title:"Tema NovaOS", text:"Tema «"+(clean.meta.name||"")+"» da installare in NovaOS (Impostazioni → Personalizzazione → Importa tema)." });
      return;
    } catch (e) { if (e && e.name === "AbortError") return; }   // condivisione annullata
  }
  downloadThemeJson(json, name);   // fallback: browser senza Web Share file
};
$("#import").onchange = ev => {
  const f = ev.target.files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = () => { try {
    const t = JSON.parse(r.result);
    if (t.format!=="novatheme/1" && t.format!=="novatheme/2") return alert("Formato non riconosciuto (atteso novatheme/1 o /2).");
    const base = (t.meta&&t.meta.base)||"dark";
    const merged = freshTheme(base);
    if (t.meta) merged.meta = Object.assign(merged.meta, t.meta);
    if (t.layout && t.layout.engine==="blocks" && Array.isArray(t.layout.blocks))
      merged.layout = { engine:"blocks", name:t.layout.name||(t.meta&&t.meta.name)||"Personalizzato", blocks: t.layout.blocks.filter(b=>b&&BLOCK_BY[b.type]).map(b=>({type:b.type,params:b.params||{}})) };
    else if (t.layout && t.layout.id) merged.layout = { id:t.layout.id, params:t.layout.params||{}, order:t.layout.order||[] };
    if (t.colors) merged.colors = Object.assign(merged.colors, t.colors);
    if (t.shape) merged.shape = Object.assign(merged.shape, t.shape);
    if (t.icons) merged.icons = { pack:t.icons.pack||"default", shape:t.icons.shape||merged.shape.iconShape, map:t.icons.map||{} };
    if (t.wallpaper) merged.wallpaper = t.wallpaper;
    if (t.sounds) merged.sounds = Object.assign(merged.sounds, t.sounds);
    if (t.typography) merged.typography = Object.assign(merged.typography, t.typography);
    loadTheme(merged); buildAll();
  } catch(e){ alert("JSON non valido: "+e.message); } };
  r.readAsText(f); ev.target.value="";
};

buildAll();
// annulla/rifai: bottoni + scorciatoie (non dentro campi di testo)
const _undoBtn=document.getElementById("undo"), _redoBtn=document.getElementById("redo");
if (_undoBtn) _undoBtn.onclick=undo; if (_redoBtn) _redoBtn.onclick=redo;
syncHistBtns();
document.addEventListener("keydown", e => {
  const t=e.target;
  if (t && (t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT")) return;
  if ((e.ctrlKey||e.metaKey) && !e.shiftKey && /^[zZ]$/.test(e.key)) { e.preventDefault(); undo(); }
  else if ((e.ctrlKey||e.metaKey) && e.shiftKey && /^[zZ]$/.test(e.key)) { e.preventDefault(); redo(); }
  else if ((e.ctrlKey||e.metaKey) && /^[yY]$/.test(e.key)) { e.preventDefault(); redo(); }
});
setPreviewMode(previewMode);   // applica la modalità salvata (o "reale" di default)
bindPreviewMode();
bindDevicePanel();             // URL per l'anteprima sul telefono/emulatore
detectFeed();                  // server raggiungibile? (feed tema attivo/solo locale)
resolveShell();                // shell «Reale»: ../shell/ (statics) o /shell/ (server)
setInterval(tickClock, 15000);
