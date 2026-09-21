/*
 * KELLOT — ENSIMMÄINEN LEIKKILINSSI (omistaja 21.9.2026 linssisarja;
 * Fablen hyväksymä suunnitelma 21.9.2026, Pelikoodari).
 *
 * MITÄ PELAAJA NÄKEE. Pallon kaupunkien viereen nousee pieni
 * taskukello, joka näyttää sen kaupungin kellonajan JUURI NYT
 * (vyöhykeaika, kesäaika mukana), ja pallon pinnalla ovat aikavyöhykkeet
 * 24 kaistana pituusasteista. Vipu "1873" vie isoisän aikaan: kaistat
 * katoavat ja jokainen kello näyttää paikallisen aurinkoajan —
 * pituusaste × 4 minuuttia Greenwichistä. Ennen vuoden 1884
 * meridiaanikonferenssia jokaisella kaupungilla oli oma aikansa;
 * rautatiet pakottivat yhtenäisen ajan (Britannia 1847, Ruotsi 1879,
 * Saksa 1893). Horatio mittasi Pariisin ja Marseillen eron
 * tornikellosta: kaksitoista minuuttia (kortin teksti, Fable).
 *
 * LEIKKI. Livia (pulu — kaanon 21.9.: pelin äänet ovat isoisä ja Livia,
 * pöllö vain nostoissa) kysyy: kun kaupungissa A on tasan 12, mitä
 * kello on kaupungissa B — 1873 tai tänään. Pelaaja kirjoittaa ajan
 * (12.12), ja ±5 minuutin osuma tuo tietäjäpisteitä (js/game.js
 * vastaaKellokysymykseen). Oikea vastaus näytetään kellojen viisareilla:
 * parin kellot korostuvat ja B:n kello kääntyy vastaukseen.
 *
 * MITEN SE ON RAKENNETTU. Linssi on oma näkymä pallolla (Raamattu MUUT
 * LINSSIT): pelin lappuset pois portilla `aikajana-paalla`, oma kelluva
 * ✕ ja alapalkki (sama malli kuin Astronautin kameralla,
 * js/linssit/satelliitti.js rakennaLinssikehys). Kaistat ovat
 * linssimoottorin polygoneja, kellot sen merkkejä (CSS2D,
 * js/pallolauta/linssit.js). Laskenta on puhtaasti
 * js/linssit/kellot-aika.js:ssä. Kellot päivittyvät puolen minuutin
 * välein (viisarit liikkuvat vain, kun minuutti vaihtuu).
 *
 * KELLOJA EI OLE JOKA KAUPUNGILLA. 264 CSS2D-kelloa olisi liikaa
 * kehykselle (HTML_MERKKIEN_KATTO); mukana ovat Euroopan kaupungit ja
 * yksi–kaksi kaupunkia jokaiselta muulta vyöhykkeeltä (KELLOKAUPUNGIT),
 * jotta 24 vyöhykettä näkyvät kierrettäessä. Pelaajan oma kaupunki on
 * aina mukana.
 */

import { pallonKaupungit } from '../pallo.js';
import { ilmoitaLivianKasvopuhe } from '../livia-puhetila.js';
import {
  ARVAUKSEN_TP, LIVIAN_KYSYMYKSET, arvausOsuu, aurinkoaika, jasennaKellonaika, kellonaikaTeksti,
  kysymyksenTeksti, oikeaVastaus, siirtymaTeksti, valitseKysymyspari, vyohykeaika, vyohykekaistat,
} from './kellot-aika.js';

/** Osien nimet linssimoottorissa. */
const KAISTAT_OSA = 'kellot-kaistat';
const KELLOT_OSA = 'kellot';
/** Kellojen päivitysväli (ms): viisarit liikkuvat minuutin vaihtuessa. */
export const KELLOJEN_TAHTI_MS = 30000;
/** Linssien yhteinen portti (js/ui.js linssikarttaEstaa) ja palkin piilotus. */
const LINSSIPORTTI = 'aikajana-paalla';
const PALKKI_PIILOON = 'aikajana-palkki-auki';
const TYYLIN_TUNNUS = 'kellot-tyyli';

/**
 * Maailman kellokaupungit Euroopan lisäksi: vähintään yksi joka
 * vyöhykkeeltä, jotta kierrettäessä kello löytyy. Euroopan kaupungit
 * (lon −25…45, lat > 34) tulevat kaikki.
 */
export const KELLOKAUPUNGIT = new Set([
  'islanti', 'nuuk', 'stjohns', 'halifax', 'newyork', 'montreal', 'chicago', 'houston', 'denver',
  'losangeles', 'sanfrancisco', 'vancouver', 'anchorage', 'nome', 'hawaii', 'mexico', 'havanna',
  'bogota', 'lima', 'caracas', 'manaus', 'rio', 'buenosaires', 'santiago', 'puntaarenas',
  'dakar', 'lagos', 'kairo', 'nairobi', 'kapkaupunki', 'addisabeba', 'madagaskar',
  'teheran', 'dubai', 'karachi', 'delhi', 'kolkata', 'kathmandu', 'yangon', 'bangkok', 'jakarta',
  'singapore', 'hongkong', 'peking', 'shanghai', 'tokio', 'soul', 'manila', 'vladivostok',
  'irkutsk', 'novosibirsk', 'jekaterinburg', 'astana', 'perth', 'darwin', 'adelaide', 'sydney',
  'auckland', 'suva', 'honiara', 'kamtsatka', 'magadan', 'jakutsk',
]);

/** Kaupungit, joille kello piirretään. */
export function kellokaupungit(pack, oma = null) {
  const cityCountry = pack?.map?.cityCountry ?? {};
  return pallonKaupungit(pack)
    .filter((k) => k.id === oma || KELLOKAUPUNGIT.has(k.id)
      || (k.lon >= -25 && k.lon <= 45 && k.lat > 34))
    .map((k) => ({ id: k.id, n: k.n, lat: k.lat, lon: k.lon, maa: cityCountry[k.id] ?? null }));
}

/* ------------------------------------------------------------ tyyli --- */

const TYYLI = `
.kellot-kello { pointer-events: none; transform: translate(-50%, -50%); }
.kellot-kello svg { display: block; overflow: visible; }
.kellot-kello .kellot-taulu { fill: #f5ecd6; stroke: #7a5b2e; stroke-width: 1.4; }
.kellot-kello .kellot-kehys { fill: none; stroke: #b08d4a; stroke-width: 1.2; }
.kellot-kello .kellot-viisari { stroke: #2f2415; stroke-linecap: round; }
.kellot-kello .kellot-tunti { stroke-width: 2.2; }
.kellot-kello .kellot-minuutti { stroke-width: 1.4; }
.kellot-kello .kellot-piirto { stroke: #5a4526; stroke-linecap: round; }
.kellot-kello .kellot-keski { fill: #2f2415; }
.kellot-kello .kellot-nimi {
  font: 600 10px/1 "Special Elite", "Courier New", monospace; fill: #3a2a16; text-anchor: middle;
  paint-order: stroke; stroke: rgba(245, 236, 214, 0.85); stroke-width: 3px;
}
.kellot-kello .kellot-aika { font: 700 11px/1 "Courier New", monospace; fill: #2f2415; text-anchor: middle;
  paint-order: stroke; stroke: rgba(245, 236, 214, 0.9); stroke-width: 3px; }
.kellot-kello .kellot-siirtyma { font: 500 8px/1 "Courier New", monospace; fill: #6b5330; text-anchor: middle; }
.kellot-kello.kellot-arvio .kellot-taulu { fill: #e9dfc8; stroke-dasharray: 2 1.5; }
.kellot-kello.kellot-pari .kellot-taulu { fill: #ffe9a8; stroke: #c9a227; stroke-width: 2.2; }
.kellot-kello.kellot-pari .kellot-kehys { stroke: #c9a227; }
.kellot-kello.kellot-pari-b .kellot-taulu { fill: #fff3c4; }
body.kellot-1873 .kellot-kello .kellot-taulu { fill: #efe2c3; }
.kellot-kehikko {
  position: fixed; left: 0; right: 0; bottom: max(0.6rem, env(safe-area-inset-bottom)); z-index: 41;
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem; pointer-events: none;
  padding: 0 0.75rem;
}
.kellot-kehikko > * { pointer-events: auto; }
.kellot-vivut {
  display: flex; gap: 0.35rem; align-items: center; padding: 0.3rem;
  background: rgba(38, 28, 16, 0.86); border: 1px solid rgba(201, 162, 39, 0.55); border-radius: 999px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
}
.kellot-vivut button {
  font: 600 0.92rem/1 "Special Elite", "Courier New", monospace; color: #f0e2c2; background: transparent;
  border: 1px solid transparent; border-radius: 999px; padding: 0.5rem 0.9rem; cursor: pointer; min-height: 2.4rem;
}
.kellot-vivut button[aria-pressed="true"] { background: #c9a227; color: #2f2415; border-color: #e6c765; }
.kellot-vivut button.kellot-kysy { border-color: rgba(240, 226, 194, 0.5); }
.kellot-kortti {
  width: min(34rem, 100%); background: #f5ecd6; color: #2f2415; border: 1px solid #b08d4a; border-radius: 0.8rem;
  padding: 0.7rem 0.85rem; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  font: 400 0.95rem/1.35 "Special Elite", "Courier New", monospace;
}
.kellot-kortti[hidden] { display: none; }
.kellot-kortti .kellot-puhuja { font-weight: 700; color: #7a5b2e; margin-bottom: 0.2rem; }
.kellot-kortti .kellot-kysymys { margin: 0 0 0.55rem; }
.kellot-kortti form { display: flex; gap: 0.45rem; align-items: center; flex-wrap: wrap; }
.kellot-kortti input {
  font: inherit; font-size: 1.15rem; width: 6.2rem; padding: 0.35rem 0.5rem; border: 1px solid #7a5b2e;
  border-radius: 0.4rem; background: #fffaf0; color: #2f2415; text-align: center;
}
.kellot-kortti button {
  font: 600 0.92rem/1 "Special Elite", "Courier New", monospace; padding: 0.5rem 0.9rem; border-radius: 999px;
  border: 1px solid #7a5b2e; background: #c9a227; color: #2f2415; cursor: pointer; min-height: 2.4rem;
}
.kellot-kortti button.kellot-sulje-kortti { background: transparent; }
.kellot-kortti .kellot-palaute { margin: 0.5rem 0 0; font-weight: 700; }
.kellot-kortti .kellot-palaute.oikein { color: #2e6b2e; }
.kellot-kortti .kellot-palaute.vaarin { color: #8a2f1c; }
.kellot-kortti .kellot-selite { margin: 0.35rem 0 0; font-size: 0.85rem; color: #5a4526; }
.kellot-linssisulku {
  position: fixed; top: max(0.6rem, env(safe-area-inset-top)); right: 0.75rem; z-index: 42;
  width: 2.3rem; height: 2.3rem; border-radius: 999px; border: 1px solid rgb(170, 170, 170);
  background: rgba(60, 50, 35, 0.6); color: #f0e2c2; font: 1.3rem/1 sans-serif; cursor: pointer;
  display: flex; align-items: center; justify-content: center; padding: 0;
}
.kellot-tila-nimi {
  position: fixed; top: max(0.75rem, env(safe-area-inset-top)); left: 0.85rem; z-index: 42;
  font: 700 0.95rem/1 "Special Elite", "Courier New", monospace; color: #f0e2c2;
  background: rgba(38, 28, 16, 0.78); padding: 0.45rem 0.7rem; border-radius: 999px;
  border: 1px solid rgba(201, 162, 39, 0.55);
}
@media (max-width: 480px) { .kellot-kortti { font-size: 0.88rem; } }
`;

function lataaTyyli(doc) {
  if (!doc?.head || doc.getElementById(TYYLIN_TUNNUS)) return;
  const tyyli = doc.createElement('style');
  tyyli.id = TYYLIN_TUNNUS;
  tyyli.textContent = TYYLI;
  doc.head.appendChild(tyyli);
}

/* ------------------------------------------------------------ kello --- */

const SVG = 'http://www.w3.org/2000/svg';
/** Kellotaulun säde (px) ja koko merkin leveys. */
const KELLON_SADE = 13;

const svgEl = (nimi, maareet, isa) => {
  const s = document.createElementNS(SVG, nimi);
  for (const [k, v] of Object.entries(maareet)) s.setAttribute(k, String(v));
  isa?.appendChild(s);
  return s;
};

/** Kellon elementti: taulu, viisarit, nimi ja digitaalinen aika. */
export function kelloElementti(d) {
  const el = document.createElement('div');
  el.className = 'kellot-kello';
  el.dataset.kaupunki = d.id;
  const svg = svgEl('svg', { width: 1, height: 1, 'aria-hidden': 'true' });
  const r = KELLON_SADE;
  svgEl('circle', { class: 'kellot-taulu', cx: 0, cy: 0, r }, svg);
  svgEl('circle', { class: 'kellot-kehys', cx: 0, cy: 0, r: r + 2.2 }, svg);
  for (let i = 0; i < 12; i += 1) {
    const a = (i / 12) * Math.PI * 2;
    const pitka = i % 3 === 0;
    svgEl('line', {
      class: 'kellot-piirto',
      x1: (Math.sin(a) * (r - (pitka ? 3.2 : 1.8))).toFixed(2), y1: (-Math.cos(a) * (r - (pitka ? 3.2 : 1.8))).toFixed(2),
      x2: (Math.sin(a) * (r - 0.6)).toFixed(2), y2: (-Math.cos(a) * (r - 0.6)).toFixed(2),
      'stroke-width': pitka ? 1.3 : 0.8,
    }, svg);
  }
  svgEl('line', { class: 'kellot-viisari kellot-tunti', x1: 0, y1: 0, x2: 0, y2: -(r * 0.55) }, svg);
  svgEl('line', { class: 'kellot-viisari kellot-minuutti', x1: 0, y1: 0, x2: 0, y2: -(r * 0.82) }, svg);
  svgEl('circle', { class: 'kellot-keski', cx: 0, cy: 0, r: 1.6 }, svg);
  const nimi = svgEl('text', { class: 'kellot-nimi', x: 0, y: -(r + 8) }, svg);
  nimi.textContent = d.n;
  svgEl('text', { class: 'kellot-aika', x: 0, y: r + 14 }, svg);
  svgEl('text', { class: 'kellot-siirtyma', x: 0, y: r + 24 }, svg);
  el.appendChild(svg);
  el.setAttribute('role', 'img');
  asetteleKello(el, d);
  return el;
}

/** Viisarit ja tekstit datumin ajasta ({ minuutit, siirtyma, arvio }). */
export function asetteleKello(el, d) {
  const aika = d.aika;
  if (!aika) return;
  const min = aika.minuutit;
  const tunti = el.querySelector('.kellot-tunti');
  const minuutti = el.querySelector('.kellot-minuutti');
  const kulmaT = ((min % 720) / 720) * 360;
  const kulmaM = ((min % 60) / 60) * 360;
  if (tunti) tunti.setAttribute('transform', `rotate(${kulmaT.toFixed(1)})`);
  if (minuutti) minuutti.setAttribute('transform', `rotate(${kulmaM.toFixed(1)})`);
  const teksti = el.querySelector('.kellot-aika');
  if (teksti) teksti.textContent = kellonaikaTeksti(min);
  const siirtyma = el.querySelector('.kellot-siirtyma');
  if (siirtyma) siirtyma.textContent = aika.selite ?? '';
  el.classList.toggle('kellot-arvio', Boolean(aika.arvio));
  el.classList.toggle('kellot-pari', Boolean(d.pari));
  el.classList.toggle('kellot-pari-b', d.pari === 'b');
  el.setAttribute('aria-label', `${d.n}: ${kellonaikaTeksti(min)}${aika.selite ? ` (${aika.selite})` : ''}`);
}

/** Kaupungin aika valitussa tilassa. */
export function kaupunginAika(k, tila, hetkiMs) {
  if (tila === '1873') {
    const min = aurinkoaika(hetkiMs, k.lon);
    const ero = Math.round(k.lon * 4);
    return { minuutit: min, siirtyma: ero, arvio: false, selite: `aurinko ${ero >= 0 ? '+' : '−'}${Math.abs(ero)} min` };
  }
  const v = vyohykeaika(hetkiMs, k);
  return { minuutit: v.minuutit, siirtyma: v.siirtyma, arvio: v.arvio, selite: siirtymaTeksti(v.siirtyma) };
}

/* ------------------------------------------------------------ linssi --- */

/**
 * Linssi pallolle. `ui` tulee kolmantena js/ui.js:n sytytaLinssistä.
 */
function avaa(lauta, tila, ui) {
  const doc = document;
  lataaTyyli(doc);
  if (!lauta?.linssit) return { pura() {} };
  const game = ui?.game ?? null;
  const oma = game?.cityOf?.()?.id ?? null;
  const kaupungit = kellokaupungit(game?.pack ?? null, oma);
  let aikatila = 'nyt';
  let kysymys = null; // { kysymys, a, b, oikea }
  let ajastin = 0;
  let suljettu = false;
  const hetki = () => Date.now();

  doc.body.classList.add(PALKKI_PIILOON, LINSSIPORTTI);

  // Datumit pysyvät samoina olioina, jotta merkkikerros ei luo elementtejä uudestaan.
  const datumit = kaupungit.map((k) => ({
    avain: `kello:${k.id}`, id: k.id, n: k.n, lat: k.lat, lng: k.lon, lon: k.lon, maa: k.maa,
    aika: null, pari: null, elementti: kelloElementti, asettele: asetteleKello,
  }));
  const paivitaAjat = () => {
    const nyt = hetki();
    for (const d of datumit) {
      d.aika = kaupunginAika(d, aikatila, nyt);
      if (d.el) asetteleKello(d.el, d);
    }
  };
  paivitaAjat();
  lauta.linssit.merkit(KELLOT_OSA, datumit);
  let kaistat = lauta.linssit.polygonit(KAISTAT_OSA, vyohykekaistat());

  const asetaTila = (uusi) => {
    if (uusi === aikatila) return;
    aikatila = uusi;
    doc.body.classList.toggle('kellot-1873', uusi === '1873');
    if (uusi === '1873') { kaistat?.pura?.(); kaistat = null; } else if (!kaistat) kaistat = lauta.linssit.polygonit(KAISTAT_OSA, vyohykekaistat());
    paivitaAjat();
    for (const nappi of vivut.querySelectorAll('[data-tila]')) nappi.setAttribute('aria-pressed', String(nappi.dataset.tila === uusi));
    tilaNimi.textContent = uusi === '1873' ? 'Kellot · 1873, jokaisella torilla oma aika' : 'Kellot · aikavyöhykkeet tänään';
  };

  /* ── kehys: ✕, tilan nimi, vivut, Livian kortti ─────────────────── */
  const sulku = doc.createElement('button');
  sulku.type = 'button';
  sulku.className = 'kellot-linssisulku';
  sulku.textContent = '×';
  sulku.title = 'Poistu linssistä';
  sulku.setAttribute('aria-label', 'Poistu linssistä');
  sulku.addEventListener('click', (e) => { e.stopPropagation?.(); ui?.valitseLinssi?.(null); });
  const tilaNimi = doc.createElement('div');
  tilaNimi.className = 'kellot-tila-nimi';
  tilaNimi.textContent = 'Kellot · aikavyöhykkeet tänään';

  const kehikko = doc.createElement('div');
  kehikko.className = 'kellot-kehikko';
  const kortti = doc.createElement('section');
  kortti.className = 'kellot-kortti';
  kortti.hidden = true;
  kortti.setAttribute('aria-live', 'polite');
  const vivut = doc.createElement('nav');
  vivut.className = 'kellot-vivut';
  vivut.setAttribute('aria-label', 'Kellot');
  const vipu = (teksti, tilaArvo) => {
    const b = doc.createElement('button');
    b.type = 'button';
    b.textContent = teksti;
    b.dataset.tila = tilaArvo;
    b.setAttribute('aria-pressed', String(tilaArvo === aikatila));
    b.addEventListener('click', () => asetaTila(tilaArvo));
    vivut.appendChild(b);
    return b;
  };
  vipu('Nyt', 'nyt');
  vipu('1873', '1873');
  const kysy = doc.createElement('button');
  kysy.type = 'button';
  kysy.className = 'kellot-kysy';
  kysy.textContent = 'Livia kysyy';
  vivut.appendChild(kysy);
  kehikko.append(kortti, vivut);
  doc.body.append(sulku, tilaNimi, kehikko);

  /* ── Livian kysymys ─────────────────────────────────────────────── */
  const merkitsePari = (a, b) => {
    for (const d of datumit) {
      d.pari = d.id === a?.id ? 'a' : (d.id === b?.id ? 'b' : null);
      if (d.el) asetteleKello(d.el, d);
    }
  };
  const suljeKortti = () => {
    kortti.hidden = true;
    kortti.replaceChildren();
    ilmoitaLivianKasvopuhe('kellot', false);
    kysymys = null;
    merkitsePari(null, null);
  };
  const naytaKortti = (puhuja, teksti, lisa = null) => {
    kortti.replaceChildren();
    const p = doc.createElement('div');
    p.className = 'kellot-puhuja';
    p.textContent = puhuja;
    const q = doc.createElement('p');
    q.className = 'kellot-kysymys';
    q.textContent = teksti;
    kortti.append(p, q);
    if (lisa) kortti.appendChild(lisa);
    kortti.hidden = false;
  };
  const kysyLivia = () => {
    const nyt = hetki();
    // Kysymys vuorotellen; pari arvotaan näkyvistä kellokaupungeista.
    const jarjestys = LIVIAN_KYSYMYKSET.filter((k) => k.tila === aikatila);
    const q = jarjestys[Math.floor(Math.random() * jarjestys.length)] ?? LIVIAN_KYSYMYKSET[0];
    const pari = valitseKysymyspari(kaupungit, q, nyt);
    if (!pari) return;
    const [a, b] = pari;
    const oikea = oikeaVastaus(q, a, b, nyt);
    kysymys = { kysymys: q, a, b, oikea };
    merkitsePari(a, b);
    const teksti = kysymyksenTeksti(q, a.n, b.n);
    ilmoitaLivianKasvopuhe('kellot', true, teksti);
    const lomake = doc.createElement('form');
    const syote = doc.createElement('input');
    syote.type = 'text';
    syote.inputMode = 'numeric';
    syote.placeholder = '12.00';
    syote.autocomplete = 'off';
    syote.setAttribute('aria-label', `Kellonaika kaupungissa ${b.n}`);
    const vastaa = doc.createElement('button');
    vastaa.type = 'submit';
    vastaa.textContent = 'Vastaa';
    const peru = doc.createElement('button');
    peru.type = 'button';
    peru.className = 'kellot-sulje-kortti';
    peru.textContent = 'Ei nyt';
    peru.addEventListener('click', suljeKortti);
    lomake.append(syote, vastaa, peru);
    lomake.addEventListener('submit', (e) => {
      e.preventDefault();
      vastaaKysymykseen(jasennaKellonaika(syote.value));
    });
    naytaKortti('Livia', teksti, lomake);
    syote.focus?.({ preventScroll: true });
  };
  const vastaaKysymykseen = (arvausMin) => {
    if (!kysymys) return;
    const { a, b, oikea, kysymys: q } = kysymys;
    if (arvausMin === null) {
      const p = kortti.querySelector('.kellot-palaute') ?? doc.createElement('p');
      p.className = 'kellot-palaute vaarin';
      p.textContent = 'Kirjoita aika muodossa 12.12.';
      kortti.appendChild(p);
      return;
    }
    const osui = arvausOsuu(arvausMin, oikea.minuutit);
    const tp = game?.vastaaKellokysymykseen?.(game.player, osui, { kaupungit: `${a.n} → ${b.n}` }) ?? 0;
    if (osui) ui?.onChange?.(game);
    ilmoitaLivianKasvopuhe('kellot', false);
    const palaute = doc.createElement('p');
    palaute.className = `kellot-palaute ${osui ? 'oikein' : 'vaarin'}`;
    palaute.textContent = osui
      ? `Oikein! Kaupungissa ${b.n} kello on ${kellonaikaTeksti(oikea.minuutit)}${tp ? ` — +${tp} tp` : ''}.`
      : `Ei ihan. Kaupungissa ${b.n} kello on ${kellonaikaTeksti(oikea.minuutit)} (arvasit ${kellonaikaTeksti(arvausMin)}).`;
    const selite = doc.createElement('p');
    selite.className = 'kellot-selite';
    selite.textContent = q.tila === '1873'
      ? `Pituusaste-ero ${Math.abs(b.lon - a.lon).toFixed(1)}° × 4 min = ${Math.abs(oikea.ero)} min ${oikea.ero >= 0 ? 'edellä' : 'jäljessä'} — vuonna 1873 jokainen kaupunki eli oman aurinkonsa mukaan.`
      : `Vyöhykkeiden ero ${siirtymaTeksti(oikea.ero)} — nykyään kellot seuraavat vyöhykettä, eivät aurinkoa.`;
    const lomake = kortti.querySelector('form');
    lomake?.remove();
    const sulje = doc.createElement('button');
    sulje.type = 'button';
    sulje.className = 'kellot-sulje-kortti';
    sulje.textContent = 'Selvä';
    sulje.addEventListener('click', suljeKortti);
    kortti.append(palaute, selite, sulje);
    // Vastaus näytetään B:n viisareilla: kello kääntyy oikeaan aikaan.
    const bd = datumit.find((d) => d.id === b.id);
    if (bd?.el) asetteleKello(bd.el, { ...bd, aika: { ...bd.aika, minuutit: oikea.minuutit } });
    kysymys = { ...kysymys, vastattu: true };
  };
  kysy.addEventListener('click', kysyLivia);

  ajastin = globalThis.setInterval(paivitaAjat, KELLOJEN_TAHTI_MS);

  return {
    /** Savukkeet ja vartijat: tila, kaupungit, kysymys, vastaus. */
    tila: () => aikatila,
    asetaTila,
    kaupungit: () => kaupungit,
    kysy: kysyLivia,
    kysymys: () => kysymys,
    vastaa: (teksti) => vastaaKysymykseen(jasennaKellonaika(teksti)),
    paivita: paivitaAjat,
    pura() {
      if (suljettu) return;
      suljettu = true;
      globalThis.clearInterval(ajastin);
      ilmoitaLivianKasvopuhe('kellot', false);
      lauta.linssit.pura?.(KELLOT_OSA);
      lauta.linssit.pura?.(KAISTAT_OSA);
      sulku.remove();
      tilaNimi.remove();
      kehikko.remove();
      doc.body.classList.remove(PALKKI_PIILOON, LINSSIPORTTI, 'kellot-1873');
    },
  };
}

export const LINSSI = {
  tunnus: 'kellot',
  jarjestys: 60,
  kerros: false,
  nimi: 'Kellot',
  lyhyt: 'Kaupunkien kellot nyt ja vuonna 1873, jolloin jokaisella torilla oli oma aikansa. Livia kysyy, osaatko laskea eron.',
  // Taskukello: kehä ja viisarit.
  ikoni: '<circle cx="12" cy="13" r="8"/><path d="M12 8.5V13l3 2"/><path d="M10 3.5h4M12 3.5V5"/>',
  valokuva: false,
  laudat: ['*'],
  /** Kortin teksti (Horatio 1873, Fable 21.9.2026). */
  kortti: 'Kaupungin kello ja rautatien kello eivät ole samaa mieltä, eikä kumpikaan taskukelloni kanssa. '
    + 'Asemamies selitti kärsivällisesti: juna kulkee Pariisin ajassa, kaupunki auringon, ja matkustaja saa valita, '
    + 'kumpaa uskoo. Mittasin eron tornikellosta: kaksitoista minuuttia. Greenwichissä puhutaan maailman yhteisestä '
    + 'ajasta; täällä jokaisella torilla on omansa, ja se tuntuu minusta rehelliseltä.',
  lahde: {
    aineisto: 'Aikavyöhykkeet: IANA tz -tietokanta selaimen Intl-rajapinnan kautta; aurinkoaika laskettu pituusasteesta (4 min/aste).',
    lisenssi: 'Pelin oma laskenta; IANA tz public domain',
    osoite: 'https://www.iana.org/time-zones',
    haettu: '2026-09-21',
  },
  pallolle(lauta, tila, ui) {
    return avaa(lauta, tila, ui);
  },
};

export { ARVAUKSEN_TP };
