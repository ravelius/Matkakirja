#!/usr/bin/env node
/*
 * ALUENIMET NATIIVILLE (Karttaseppä 24.9.2026, Fablen päätös löydökseen 38:
 * vaihtoehto b). Webin poltetun nimiötason nimet (maakunnat, nykyalueet,
 * meret) ja pohjan valtamerten nimet vektoreina, jotta natiivi piirtää ne
 * elävinä pinnalle painettuina — samat paikat, koot, kapiteelit, harvennus
 * ja värit kuin webin laatoissa.
 *
 *   node tools/vie-aluenimet.mjs [--pyramidi <pyramidi.json|URL>]
 *        [--nimisto <nimiot-poltto-N.json>] [--versio 2026-09-24a] --ulos aluenimet.json
 *
 * LÄHTEET
 * - Paikat: ämpärin pyramidi.json `nimiotaso.nimiot[id].laatikot[z]` —
 *   generaattorin törmäyksenväistön JÄLKEINEN nimen laatikko tasoittain
 *   (lon/lat). Laatikon keskipiste Millerin y:n mukaan on nimen ankkuri
 *   (maailmapiirto.js nimionAsettelu: textBaseline middle, keskitetty).
 * - Nykyalueen muste (ruoste / ruoste-vahva / sepia): poltossa käytetty
 *   nimistö-JSON (`--nimisto`), koska pyramidi.json ei kanna sitä.
 * - Tyylit: tools/fokuskartta/maailmapiirto.js (NIMION_KOOT, NIMION_VARIT,
 *   NIMION_HARVENNUS_EM, NIMION_PIENKAPITEELI) ja valtameret
 *   tools/generoi-laattapyramidi.mjs MERET (kopio alla, pidettävä samana).
 *
 * TASOT. Pyramidin taso z vastaa pallon Mercator-tasoa Z = z + 1
 * (tools/tee-pallolaatat.mjs lahdetaso). Nimiötaso z4–z8 = pallon Z5–Z9,
 * valtameret z0–z3 = pallon Z1–Z4 (maailmapiirto.js KALUSTEIDEN_YLARAJA 0,5).
 *
 * KOKO METREINÄ. Web piirtää nimen Millerin arkille pikseleinä; pallolla
 * se venyy arkin mukana. Korkeus metreinä leveysasteella φ:
 *   korkeus_m = px · R · (2π / L_z) · cos(0,8 φ)   (Millerin pystymittakaava)
 * ja nimen leveys metreinä on laatikon pituusasteväli · R · cos φ.
 * R = 6 371 008,8 m, L_z = pyramidi.json tasot[z].leveys.
 *
 * Koristeet (kuva: kompassi, laiva) ja aluerajat (raja) eivät ole nimiä
 * eivätkä kuulu tähän vientiin.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import {
  NIMION_KOOT, NIMION_VARIT, NIMION_HARVENNUS_EM, NIMION_PIENKAPITEELI, NIMION_FONTTI, nimionMuste,
} from './fokuskartta/maailmapiirto.js';

export const R = 6371008.8;
const RAD = Math.PI / 180;
export const PYRAMIDI_URL = 'https://media.matkakirja.app/julisteet/pyramidi/pyramidi.json';

/** Valtamerten nimet: kopio tools/generoi-laattapyramidi.mjs MERET (koko arkin yksiköissä, arkki 12 000 = 360°). */
export const VALTAMERET = [
  { nimi: 'TYYNIMERI', lon: -142, lat: 4, koko: 49 },
  { nimi: 'TYYNIMERI', lon: 163, lat: 18, koko: 49 },
  { nimi: 'ATLANTIN VALTAMERI', lon: -38, lat: 26, koko: 42 },
  { nimi: 'ETELÄINEN ATLANTTI', lon: -18, lat: -30, koko: 36 },
  { nimi: 'INTIAN VALTAMERI', lon: 78, lat: -28, koko: 42 },
  { nimi: 'JÄÄMERI', lon: 110, lat: 80.5, koko: 38 },
  { nimi: 'ETELÄINEN JÄÄMERI', lon: 60, lat: -61.5, koko: 34 },
];
export const VALTAMEREN_TYYLI = {
  kursiivi: true, versaali: true, harvennus_em: 0.34, vari: 'rgba(112, 99, 76, 0.62)',
  tasot: [0, 1, 2, 3], halo: false,
};
const ARKIN_LEVEYS = 12000;

/** Millerin y (radiaaneina, pohjoinen ylös) ja käänteinen. */
export const millerY = (lat) => 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
export const millerLat = (y) => (2.5 * Math.atan(Math.exp(y / 1.25)) - 0.625 * Math.PI) / RAD;

/** Laatikon ankkuri: pituusasteen keskikohta ja Millerin y:n keskikohta. */
export function laatikonKeskipiste({ lon0, lat0, lon1, lat1 }) {
  return { lon: (lon0 + lon1) / 2, lat: millerLat((millerY(lat0) + millerY(lat1)) / 2) };
}

/** Kirjainkorkeus metreinä: px tasolla, jonka arkin leveys on L px. */
export const korkeusMetreina = (px, L, lat) => px * R * ((2 * Math.PI) / L) * Math.cos(0.8 * lat * RAD);

/** Nimen tyyliavain kuten maailmapiirto.js nimionAsettelu. */
export function tyyliavain(n) {
  if (n.luokka === 'meri') return 'meri';
  if (n.luokka === 'nykyalue') return n.koko === 'pieni' ? 'nykyalue-pieni' : 'nykyalue';
  return n.koko === 'pieni' ? 'maakunta-pieni' : 'maakunta';
}

/** Tyylitaulukko natiiville (webin laatan asu). */
export function tyylit() {
  const pohja = { versaali: true, harvennus_em: NIMION_HARVENNUS_EM, halo: false };
  const t = {};
  for (const avain of Object.keys(NIMION_KOOT)) {
    const nyky = avain.startsWith('nykyalue');
    t[avain] = {
      ...pohja,
      koot_px: NIMION_KOOT[avain],
      ...(nyky
        ? { pienkapiteeli: NIMION_PIENKAPITEELI, varit: { ruoste: NIMION_VARIT['nykyalue-ruoste'], 'ruoste-vahva': NIMION_VARIT['nykyalue-ruoste-vahva'], sepia: NIMION_VARIT['nykyalue-sepia'] } }
        : { vari: NIMION_VARIT[avain.startsWith('meri') ? 'meri' : 'maakunta'] }),
      ...(avain === 'meri' ? { aaltomerkki: { alla_em: 0.95, leveys_osuus: 0.5, kaaria: 3 } } : {}),
    };
  }
  return t;
}

export function aluenimet(pyramidi, { muste = new Map(), versio } = {}) {
  const L = Object.fromEntries(pyramidi.tasot.map((t) => [t.z, t.leveys]));
  const taso = pyramidi.nimiotaso;
  const nimet = [];
  const ohitetut = { kuva: 0, raja: 0, eiLaatikkoa: 0 };
  for (const [id, n] of Object.entries(taso.nimiot)) {
    if (n.luokka === 'kuva' || n.luokka === 'raja') { ohitetut[n.luokka] += 1; continue; } // eslint-disable-line no-continue
    const avain = tyyliavain(n);
    const paikat = {};
    for (const [z, l] of Object.entries(n.laatikot ?? {})) {
      const px = NIMION_KOOT[avain]?.[z];
      if (!px || !L[z]) continue; // eslint-disable-line no-continue
      const k = laatikonKeskipiste(l);
      paikat[z] = {
        lon: +k.lon.toFixed(5), lat: +k.lat.toFixed(5),
        korkeus_px: px,
        korkeus_m: Math.round(korkeusMetreina(px, L[z], k.lat)),
        leveys_m: Math.round((l.lon1 - l.lon0) * RAD * R * Math.cos(k.lat * RAD)),
      };
    }
    if (!Object.keys(paikat).length) { ohitetut.eiLaatikkoa += 1; continue; } // eslint-disable-line no-continue
    const rivi = {
      id, teksti: String(n.teksti), luokka: n.luokka, tyyli: avain, iso: n.iso ?? null,
      kulma: Number(n.kulma) || 0,
      tasot: Object.keys(paikat).map(Number), pallotasot: Object.keys(paikat).map((z) => Number(z) + 1),
      paikat,
    };
    if (n.luokka === 'nykyalue') rivi.muste = nimionMuste({ muste: muste.get(`${n.iso}|${n.teksti}`) });
    nimet.push(rivi);
  }
  const valtameret = VALTAMERET.map((m, i) => ({
    id: `valtameri-${i + 1}`, teksti: m.nimi, lon: m.lon, lat: m.lat, kulma: 0,
    tasot: VALTAMEREN_TYYLI.tasot, pallotasot: VALTAMEREN_TYYLI.tasot.map((z) => z + 1),
    koko_arkki: m.koko,
    korkeus_m: Math.round(korkeusMetreina(m.koko, ARKIN_LEVEYS, m.lat)),
  }));
  return {
    kuvaus: 'Aluenimet natiiville elävinä, pinnalle painettuina (Fable 24.9.2026, löydös 38 b). '
      + 'Paikat ovat webin nimiötason törmäyksenväistön jälkeiset ankkurit tasoittain; tasot = pyramidin z, pallotasot = Mercator Z = z + 1. '
      + 'korkeus_m = kirjainkorkeus metreinä (Millerin pystymittakaava), leveys_m = koko nimen leveys harvennuksineen. '
      + 'Teksti versaalein; nykyalueilla sanan ensimmäinen kirjain täysikokoinen, muut pienkapiteeli-kertoimella. Ei haloa.',
    versio,
    lahde: { pyramidi: pyramidi.versio, nimiotaso: taso.versio, tyylit: 'tools/fokuskartta/maailmapiirto.js' },
    fontti: {
      pyydetty: NIMION_FONTTI,
      huom: 'Nimiötaso 2026-09-22g poltettiin Macilla, jolla Liberation Serif puuttuu: laatoissa näkyy macOS:n Times (tarkistettu 24.9.2026). Fontin valinta: Fable.',
    },
    tyylit: { ...tyylit(), valtameri: VALTAMEREN_TYYLI },
    lukumaarat: {
      nimet: nimet.length,
      luokittain: nimet.reduce((a, n) => ({ ...a, [n.luokka]: (a[n.luokka] ?? 0) + 1 }), {}),
      valtameret: valtameret.length,
      ohitetut,
    },
    nimet,
    valtameret,
  };
}

async function lueJson(lahde) {
  if (/^https?:/.test(lahde)) return (await fetch(lahde)).json();
  return JSON.parse(readFileSync(lahde, 'utf8'));
}

async function paa() {
  const argv = process.argv.slice(2);
  const lippu = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
  const ulos = lippu('--ulos');
  if (!ulos) throw new Error('käyttö: --ulos aluenimet.json [--pyramidi] [--nimisto] [--versio]');
  const pyramidi = await lueJson(lippu('--pyramidi') ?? PYRAMIDI_URL);
  const muste = new Map();
  if (lippu('--nimisto')) {
    for (const r of await lueJson(lippu('--nimisto'))) if (r.muste && r.teksti) muste.set(`${r.iso}|${r.teksti}`, r.muste);
  }
  const tulos = aluenimet(pyramidi, { muste, versio: lippu('--versio') ?? new Date().toISOString().slice(0, 10) });
  const puuttuu = tulos.nimet.filter((n) => n.luokka === 'nykyalue' && !muste.has(`${n.iso}|${n.teksti}`));
  if (lippu('--nimisto') && puuttuu.length) console.warn(`varoitus: ${puuttuu.length} nykyalueelta puuttuu muste nimistöstä (oletus sepia)`);
  writeFileSync(ulos, `${JSON.stringify(tulos, null, 1)}\n`);
  console.log(`${ulos}: ${JSON.stringify(tulos.lukumaarat)}`);
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  paa().catch((e) => { console.error(e.message ?? e); process.exit(1); });
}
