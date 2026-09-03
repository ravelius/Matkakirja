/*
 * NIMIÖLIMITYKSEN PORTTI — poltettavat nimiöt eivät mene toistensa
 * päälle, eivät maan rajan yli eivätkä eläintäyn kanssa.
 *
 * OMISTAJAN HAVAINTO 3.9.2026 (Bulgaria, 100 km:n näkymä): Kırkpınar-
 * nosto limittyy toisen nimen kanssa. Mitattuna samasta näkymästä
 * (tools/tarkista-karttamerkit.mjs --kuvat) kolme paria oli
 * päällekkäin: Kırkpınar (TUR) + Évros (GRC), Pelastuskarhu
 * (BGR-eläintäky) + Veda Slovena (BGR-skandaali) ja Moldoveanu (ROU)
 * + Karhusanktuaari (ROU-eläintäky). Karttamerkkien portti ei nähnyt
 * yhtäkään: se vartioi nimeä ja napautusta, ei limitystä.
 *
 * ── MIKSI NODE RIITTÄÄ ─────────────────────────────────────────────
 *
 * Poltettu ladonta on laudan dataa (js/nostoladonta.js): merkin paikka,
 * kylki ja nimiön mitta tulevat samasta laskennasta, jolla
 * laattageneraattori polttaa (tools/fokuskartta/nostot.mjs keraaNostot).
 * Laatikot ovat siis laskettavissa ilman selainta, ja limitys on
 * laatikoiden leikkaus laudan yksiköissä — sama ehto kuin väistön
 * omassa laskennassa (js/fokuskohteet.js kohdeLimittyy).
 *
 * ── AJO ────────────────────────────────────────────────────────────
 *
 *   node tools/tarkista-nimiolimitys.mjs           koko maailma
 *   node tools/tarkista-nimiolimitys.mjs BGR       vain parit, joissa BGR
 *
 * Poistumiskoodi 0 = ei nimiö–nimiö-limityksiä. Nimiö naapurin
 * SYMBOLIN päällä on sallittu vain väistön oma "SYMBOLI EI JÄÄ ILMAN
 * NIMEÄ" -tinkiminen (js/fokuskohteet.js), ja se luetellaan erikseen
 * tiedoksi.
 */
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { keraaNostot } from './fokuskartta/nostot.mjs';
import {
  NOSTOSYM_MINI_RUUTU, nostosymNimioLaatikko,
} from '../js/fokusnosto-symbolit.js';

export { keraaNostot };

/** Merkin symbolin ja nimiön laatikot laudan yksiköissä {x1,y1,x2,y2}. */
export function merkinLaatikot(m) {
  const k = m.porras;
  const symboli = {
    x1: m.x - NOSTOSYM_MINI_RUUTU * k, x2: m.x + NOSTOSYM_MINI_RUUTU * k,
    y1: m.y - NOSTOSYM_MINI_RUUTU * k, y2: m.y + NOSTOSYM_MINI_RUUTU * k,
  };
  let nimio = null;
  if (m.nimioNakyy && m.nimio) {
    const l = nostosymNimioLaatikko(
      m.nimio, null, m.laji, m.nimioPuoli, m.nimioRajaton ? Infinity : undefined,
    );
    if (l) {
      nimio = {
        x1: m.x + l.x1 * k, x2: m.x + l.x2 * k, y1: m.y + l.y1 * k, y2: m.y + l.y2 * k,
      };
    }
  }
  return { symboli, nimio };
}

const limittyy = (a, b) => a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;

export const limityksenLuokka = (a, b) => {
  if (a.perhe === 'elaintaky' || b.perhe === 'elaintaky') return 'eläintäky';
  return a.iso === b.iso ? 'sama maa' : 'naapurimaat';
};

/**
 * POLTETTAVIEN MERKKIEN LIMITYKSET laudan datasta.
 *
 * @param {Array} merkit  keraaNostot(pack).merkit
 * @param {?string} vain  maatunnus: vain parit, joissa maa on mukana
 * @returns {{ rivit: Array, nimioNimio: Array, nimioSymboli: Array }}
 *   parit [a, b] merkkitietueina; nimioSymboli-parissa a:n nimiö on
 *   b:n symbolin päällä
 */
export function laskeNimiolimitykset(merkit, vain = null) {
  const rivit = merkit
    .filter((m) => m.poltettava !== false)
    .map((m) => ({ m, ...merkinLaatikot(m) }));
  const nimioNimio = [];
  const nimioSymboli = [];
  for (let i = 0; i < rivit.length; i += 1) {
    for (let j = i + 1; j < rivit.length; j += 1) {
      const a = rivit[i];
      const b = rivit[j];
      if (vain && a.m.iso !== vain && b.m.iso !== vain) continue;
      if (a.nimio && b.nimio && limittyy(a.nimio, b.nimio)) nimioNimio.push([a.m, b.m]);
      else if (a.nimio && limittyy(a.nimio, b.symboli)) nimioSymboli.push([a.m, b.m]);
      else if (b.nimio && limittyy(b.nimio, a.symboli)) nimioSymboli.push([b.m, a.m]);
    }
  }
  return { rivit, nimioNimio, nimioSymboli };
}

const nimi = (m) => `${m.iso}/${m.tunnus}${m.perhe === 'elaintaky' ? ' (eläintäky)' : ''} "${m.nimio}"`;

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) {
  const VAIN = (process.argv[2] ?? '').toUpperCase() || null;
  const { merkit } = keraaNostot(MAAILMANKARTTA);
  const { rivit, nimioNimio, nimioSymboli } = laskeNimiolimitykset(merkit, VAIN);
  console.log(`poltettavia merkkejä ${rivit.length}, nimiöllisiä ${rivit.filter((r) => r.nimio).length}`);
  console.log(`\nNIMIÖ NIMIÖN PÄÄLLÄ: ${nimioNimio.length}`);
  const luokat = {};
  for (const [a, b] of nimioNimio) {
    const l = limityksenLuokka(a, b);
    luokat[l] = (luokat[l] ?? 0) + 1;
    console.log(`  [${l}] ${nimi(a)} + ${nimi(b)}`);
  }
  if (nimioNimio.length) console.log(`  luokittain: ${Object.entries(luokat).map(([k, v]) => `${k} ${v}`).join(', ')}`);
  console.log(`\nNIMIÖ SYMBOLIN PÄÄLLÄ (tiedoksi): ${nimioSymboli.length}`);
  const sl = {};
  for (const [a, b] of nimioSymboli) {
    const l = limityksenLuokka(a, b);
    sl[l] = (sl[l] ?? 0) + 1;
    if (VAIN || l !== 'sama maa') console.log(`  [${l}] ${nimi(a)} nimiö -> ${nimi(b)} symboli`);
  }
  console.log(`  luokittain: ${Object.entries(sl).map(([k, v]) => `${k} ${v}`).join(', ') || '-'}`);
  process.exit(nimioNimio.length ? 1 : 0);
}
