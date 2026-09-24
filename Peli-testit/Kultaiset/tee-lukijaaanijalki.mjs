// KULTAINEN LUKIJAÄÄNIJÄLKI: verkkopelin Lukijaääni-dialogin (Kehittäjälehti, index.html #puhe-dialog,
// js/main.js avaaLukijaaani) ja js/puhe.js:n asetusten oletukset, rajat, säilöavaimet ja puhepyyntö
// kirjataan tiedostoon Kultaiset/lukijaaanijalki.json. C#-portti (Assets/Matkakirja/Peli/Lukijaaani.cs)
// toistaa saman testissä Testit/LukijaaaniTestit.cs ja vaatii identtisen jäljen.
//
// Käyttö: node Kultaiset/tee-lukijaaanijalki.mjs [verkkopelin js-kansio]
//   (index.html ja tools/pollo/worker.js haetaan js-kansion vierestä)
//
// Mitä jälki sisältää:
//   vakiot   dialogin persoonat (index.html #puhe-persoona), workerin tuntemat persoonat
//            (puhe.js PUHE_PERSOONAT), oletukset (puhe-oletukset.js = workerin taulu),
//            äänivaihtoehdot (main.js PUHE_AANIVAIHTOEHDOT = worker PUHE_AANET), näytteet
//            (main.js PUHE_NAYTTEET), liukujen rajat (index.html) ja puhe.js:n vakiot.
//   askeleet käsikirjoitettu sarja: raaka säilöarvo, asetaPuheenNopeus/asetaPuheenVoima, dialogin
//            tallennus (main.js tallennaPuheKentat) ja palautus (puhe-oletus), kenttien täyttö
//            (lataaPuheKentat) sekä puhepyyntö (esihaePala → fetch: runko ja kehittäjäotsake).
//            Jokaisen askeleen jälkeen kirjataan säilön lukijaääniavaimet sellaisinaan.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const tama = dirname(fileURLToPath(import.meta.url));
const JS = resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-pelikoodari/js');
const JUURI = dirname(JS);
const tuo = (nimi) => import(pathToFileURL(join(JS, nimi)).href);

// --- tynkäselain (ennen moduulien tuontia) ------------------------------------
const muisti = new Map();
globalThis.localStorage = {
  getItem: (k) => (muisti.has(k) ? muisti.get(k) : null),
  setItem: (k, v) => { muisti.set(k, String(v)); },
  removeItem: (k) => { muisti.delete(k); },
};
globalThis.window = globalThis;
globalThis.Audio = function Audio() {};
Object.defineProperty(globalThis, 'navigator', { value: { onLine: true }, configurable: true });
globalThis.document = { hidden: false, addEventListener() {}, removeEventListener() {} };
let pyynnot = [];
// Vastaus 500: haePala heittää eikä muista palaa, joten jokainen askel tekee oman pyyntönsä.
globalThis.fetch = async (url, o) => { pyynnot.push({ url, ...o }); return { ok: false, status: 500 }; };

const puhe = await tuo('puhe.js');
const { PUHE_OLETUKSET } = await tuo('puhe-oletukset.js');
const { puheVoima } = await tuo('aani-ehdokkaat.js');

// --- vakiot lähteistä -----------------------------------------------------------
const mainJs = readFileSync(join(JS, 'main.js'), 'utf8');
const puheJs = readFileSync(join(JS, 'puhe.js'), 'utf8');
const html = readFileSync(join(JUURI, 'index.html'), 'utf8');
const worker = readFileSync(join(JUURI, 'tools', 'pollo', 'worker.js'), 'utf8');

const lauseke = (lahde, nimi) => {
  const m = lahde.match(new RegExp(`const ${nimi} = ([\\s\\S]*?);\\n`));
  if (!m) throw new Error(`${nimi} puuttuu`);
  return Function(`return (${m[1]});`)();
};
const AANET = lauseke(mainJs, 'PUHE_AANIVAIHTOEHDOT');
const NAYTTEET = lauseke(mainJs, 'PUHE_NAYTTEET');
const WORKERIN_AANET = lauseke(worker, 'PUHE_AANET');
if (JSON.stringify(AANET) !== JSON.stringify(WORKERIN_AANET)) throw new Error('main.js ja worker.js: äänilistat eroavat');

const dialogi = html.slice(html.indexOf('<dialog id="puhe-dialog"'), html.indexOf('</dialog>', html.indexOf('<dialog id="puhe-dialog"')));
const valinta = dialogi.slice(dialogi.indexOf('<select id="puhe-persoona">'), dialogi.indexOf('</select>'));
const persoonat = [...valinta.matchAll(/<option value="([^"]+)">([^<]+)<\/option>/g)].map((m) => ({ persoona: m[1], nimi: m[2] }));
const liuku = (id) => {
  const m = dialogi.match(new RegExp(`<input id="${id}" type="range" min="([^"]+)" max="([^"]+)" step="([^"]+)"`));
  return { min: Number(m[1]), max: Number(m[2]), askel: Number(m[3]) };
};
const vakio = (nimi) => {
  const m = puheJs.match(new RegExp(`const ${nimi} = ([^;]+);`));
  return Function(`return (${m[1]});`)();
};

const vakiot = {
  persoonat,
  tunnetut: puhe.PUHE_PERSOONAT,
  oletukset: PUHE_OLETUKSET,
  aanet: AANET,
  naytteet: NAYTTEET,
  avaimet: {
    asetukset: puhe.PUHE_ASETUS_AVAIN,
    koodi: puhe.PUHE_KOODI_AVAIN,
    polloKoodi: 'matkakirja-pollo-kehittajakoodi',
    voima: vakio('VOIMA_AVAIN'),
    nopeus: vakio('NOPEUS_AVAIN'),
  },
  nopeus: { oletus: vakio('NOPEUS_OLETUS'), min: vakio('NOPEUS_MIN'), max: vakio('NOPEUS_MAX'), liuku: liuku('puhe-nopeus') },
  voima: { oletus: vakio('VOIMA_OLETUS'), min: vakio('VOIMA_MIN'), max: vakio('VOIMA_MAX'), liuku: liuku('puhe-voima') },
  palvelin: (await tuo('packs/pollo-asetukset.js')).POLLOPALVELIN,
};
// Säilyvät asetukset (main.js SAILYVAT_ASETUKSET): uusi peli ei pyyhi näitä.
vakiot.sailyvat = [...lauseke(mainJs, 'SAILYVAT_ASETUKSET')];

const AVAIMET = [vakiot.avaimet.asetukset, vakiot.avaimet.koodi, vakiot.avaimet.polloKoodi,
  vakiot.avaimet.voima, vakiot.avaimet.nopeus, 'matkakirja-puhevoima'];
const sailo = () => Object.fromEntries(AVAIMET.map((k) => [k, muisti.has(k) ? muisti.get(k) : null]));

// --- dialogin logiikka (js/main.js lataaPuheKentat / tallennaPuheKentat / puhe-oletus) ---
function kentat(persoona) {
  const oma = puhe.luePuheAsetukset()[persoona] ?? {};
  return {
    aani: AANET.includes(oma.aani) ? oma.aani : '',
    ohje: oma.ohje ?? '',
    nopeus: puhe.puheenNopeus(),
    voima: puhe.puheenVoima(),
  };
}
function tallenna(persoona, aani, ohje) {
  const kaikki = puhe.luePuheAsetukset();
  kaikki[persoona] = { aani: aani || null, ohje: ohje.trim() || null };
  puhe.tallennaPuheAsetukset(kaikki);
}
function palautaOletus(persoona) {
  const kaikki = puhe.luePuheAsetukset();
  delete kaikki[persoona];
  puhe.tallennaPuheAsetukset(kaikki);
}

// --- käsikirjoitus ---------------------------------------------------------------
const K = vakiot.avaimet;
const kasikirjoitus = [
  { teko: 'kentat', persoona: 'merkinnat' },
  { teko: 'pyynto', teksti: 'Saavuimme kaupunkiin.', persoona: 'merkinnat', lohko: 'merkinnat' },
  { teko: 'pyynto', teksti: 'Hyvä kysymys!', persoona: 'pollo', lohko: null },
  { teko: 'taso' },
  // nopeuden rajat ja jäsennys
  { teko: 'asetaNopeus', arvo: 1.3 },
  { teko: 'asetaNopeus', arvo: 0.65 },
  { teko: 'asetaNopeus', arvo: 0.1 },
  { teko: 'asetaNopeus', arvo: 9 },
  { teko: 'asetaNopeus', arvo: 0 },
  { teko: 'asetaNopeus', arvo: 1 },
  { teko: 'pyynto', teksti: 'Nopeus yksi.', persoona: 'kertoja', lohko: 'kertoja' },
  { teko: 'asetaNopeus', arvo: 1.2000000000000002 },
  { teko: 'raaka', avain: K.nopeus, arvo: '1.4abc' },
  { teko: 'raaka', avain: K.nopeus, arvo: '  0.75' },
  { teko: 'raaka', avain: K.nopeus, arvo: 'abc' },
  { teko: 'raaka', avain: K.nopeus, arvo: '' },
  { teko: 'raaka', avain: K.nopeus, arvo: 'Infinity' },
  { teko: 'raaka', avain: K.nopeus, arvo: '-3' },
  { teko: 'raaka', avain: K.nopeus, arvo: '1e0' },
  { teko: 'raaka', avain: K.nopeus, arvo: '.9' },
  { teko: 'raaka', avain: K.nopeus, arvo: '+1.5e-0x' },
  { teko: 'raaka', avain: K.nopeus, arvo: null },
  // voiman rajat ja taso (voima × Lukija-liuku / 0,9)
  { teko: 'asetaVoima', arvo: 1.5 },
  { teko: 'taso' },
  { teko: 'raaka', avain: 'matkakirja-puhevoima', arvo: '0.45' },
  { teko: 'taso' },
  { teko: 'raaka', avain: 'matkakirja-puhevoima', arvo: '0' },
  { teko: 'taso' },
  { teko: 'raaka', avain: 'matkakirja-puhevoima', arvo: null },
  { teko: 'asetaVoima', arvo: 0.1 },
  { teko: 'asetaVoima', arvo: 3 },
  { teko: 'asetaVoima', arvo: 0 },
  { teko: 'asetaVoima', arvo: 2.25 },
  { teko: 'raaka', avain: K.voima, arvo: '7' },
  { teko: 'raaka', avain: K.voima, arvo: 'x' },
  { teko: 'raaka', avain: K.voima, arvo: null },
  // dialogin tallennus ja palautus
  { teko: 'tallenna', persoona: 'pollo', aani: 'nova', ohje: '  Puhu hitaasti.  ' },
  { teko: 'kentat', persoona: 'pollo' },
  { teko: 'pyynto', teksti: 'Baikal on syvä.', persoona: 'pollo', lohko: null },
  { teko: 'raaka', avain: K.polloKoodi, arvo: 'KOODI-P' },
  { teko: 'pyynto', teksti: 'Baikal on syvä.', persoona: 'pollo', lohko: null },
  { teko: 'pyynto', teksti: 'Lehti.', persoona: 'kertoja', lohko: 'kertoja' },
  { teko: 'raaka', avain: K.koodi, arvo: 'KOODI-T' },
  { teko: 'pyynto', teksti: 'Baikal on syvä.', persoona: 'pollo', lohko: 'pollo' },
  { teko: 'raaka', avain: K.koodi, arvo: '' },
  { teko: 'pyynto', teksti: 'Tyhjä oma koodi.', persoona: 'pollo', lohko: null },
  { teko: 'tallenna', persoona: 'merkinnat', aani: '', ohje: 'Lue lämpimästi.' },
  { teko: 'tallenna', persoona: 'kertoja', aani: 'ash', ohje: '' },
  { teko: 'pyynto', teksti: 'Merkintä.', persoona: 'merkinnat', lohko: 'merkinnat' },
  { teko: 'pyynto', teksti: 'Sivu.', persoona: 'kertoja', lohko: 'kertoja' },
  { teko: 'tallenna', persoona: 'pollo', aani: 'sage', ohje: 'Rivi "lainaus"\nja \\ kenoviiva\t<ä>' },
  { teko: 'kentat', persoona: 'pollo' },
  { teko: 'pyynto', teksti: 'Lainaus "tässä".', persoona: 'pollo', lohko: null },
  { teko: 'tallenna', persoona: 'merkinnat', aani: '', ohje: '   ' },
  { teko: 'kentat', persoona: 'merkinnat' },
  { teko: 'palauta', persoona: 'kertoja' },
  { teko: 'palauta', persoona: 'pollo' },
  { teko: 'palauta', persoona: 'pollo' },
  { teko: 'tallenna', persoona: 'kertoja', aani: 'verse', ohje: '' },
  { teko: 'tallenna', persoona: 'merkinnat', aani: 'fable', ohje: 'Toinen.' },
  { teko: 'palauta', persoona: 'kertoja' },
  { teko: 'palauta', persoona: 'merkinnat' },
  // käsin kirjoitettu tai vanhempi säilö: jäsennys ja siivous
  { teko: 'raaka', avain: K.asetukset, arvo: 'ei json' },
  { teko: 'kentat', persoona: 'kertoja' },
  { teko: 'tallenna', persoona: 'kertoja', aani: '', ohje: '' },
  { teko: 'raaka', avain: K.asetukset, arvo: '{"kertoja":{"aani":"foo","ohje":"  x  "},"muu":{"aani":"alloy","lisa":[1,2.5,true,null,{"a":"\\u00e4"}]},"tyhja":{"aani":null,"ohje":null},"2":{"aani":"echo"},"luku":5}' },
  { teko: 'kentat', persoona: 'kertoja' },
  { teko: 'pyynto', teksti: 'Vanha säilö.', persoona: 'kertoja', lohko: 'kertoja' },
  { teko: 'tallenna', persoona: 'pollo', aani: 'coral', ohje: '' },
  { teko: 'raaka', avain: K.asetukset, arvo: '{"merkinnat":{"aani":"","ohje":"   "},"kertoja":{"aani":7}}' },
  { teko: 'kentat', persoona: 'merkinnat' },
  { teko: 'pyynto', teksti: 'Tyhjät säädöt.', persoona: 'merkinnat', lohko: 'merkinnat' },
  { teko: 'pyynto', teksti: 'Numeroääni.', persoona: 'kertoja', lohko: 'kertoja' },
  { teko: 'palauta', persoona: 'pollo' },
  { teko: 'raaka', avain: K.asetukset, arvo: 'null' },
  { teko: 'kentat', persoona: 'pollo' },
  { teko: 'raaka', avain: K.asetukset, arvo: '"merkkijono"' },
  { teko: 'kentat', persoona: 'pollo' },
  { teko: 'tallenna', persoona: 'pollo', aani: 'onyx', ohje: 'Viimeinen.' },
  { teko: 'raaka', avain: K.nopeus, arvo: '1.6' },
  { teko: 'pyynto', teksti: 'Tuntematon persoona.', persoona: 'vieras', lohko: 'vieras' },
  { teko: 'pyynto', teksti: 'Pöllö nopeasti.', persoona: 'pollo', lohko: null },
];

const askeleet = [];
for (const a of kasikirjoitus) {
  const rivi = { ...a };
  switch (a.teko) {
    case 'raaka':
      if (a.arvo === null) muisti.delete(a.avain); else muisti.set(a.avain, a.arvo);
      rivi.nopeus = puhe.puheenNopeus();
      rivi.voima = puhe.puheenVoima();
      break;
    case 'asetaNopeus': rivi.tulos = puhe.asetaPuheenNopeus(a.arvo); break;
    case 'asetaVoima': rivi.tulos = puhe.asetaPuheenVoima(a.arvo); break;
    case 'taso': rivi.liuku = puheVoima(); rivi.voima = puhe.puheenVoima(); rivi.tulos = puhe.lukijanTaso(); break;
    case 'kentat': rivi.tulos = kentat(a.persoona); break;
    case 'tallenna': tallenna(a.persoona, a.aani, a.ohje); break;
    case 'palauta': palautaOletus(a.persoona); break;
    case 'pyynto': {
      pyynnot = [];
      await puhe.esihaePala(a.teksti, a.persoona, a.lohko);
      if (pyynnot.length !== 1) throw new Error('odotettiin yksi pyyntö: ' + JSON.stringify(a));
      const p = pyynnot[0];
      rivi.tulos = { osoite: p.url, runko: p.body, koodi: p.headers['x-pollo-kehittaja'] ?? null };
      break;
    }
    default: throw new Error('tuntematon teko ' + a.teko);
  }
  rivi.sailo = sailo();
  askeleet.push(rivi);
}

const jalki = { lahde: 'verkkopeli js/puhe.js, js/puhe-oletukset.js, js/main.js, index.html, tools/pollo/worker.js', vakiot, askeleet };
const ulos = join(tama, 'lukijaaanijalki.json');
writeFileSync(ulos, JSON.stringify(jalki, null, 1) + '\n');
console.log(`${ulos}: ${askeleet.length} askelta`);
