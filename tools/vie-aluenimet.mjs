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
 *        [--maa <ne_10m_admin_0_countries.geojson>]   merinimet veden päälle (löydös 107)
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
 * se venyy arkin mukana. NIMION_KOOT on canvasin fonttikoko (ctx.font
 * `${px}px`, em), ei versaalin korkeus. Fonttikoko metreinä leveysasteella φ:
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

/** Fonttikoko (em) metreinä: px tasolla, jonka arkin leveys on L px. */
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
      + 'korkeus_px / korkeus_m = fonttikoko (em, kuten canvasin ctx.font), ei versaalin korkeus; metreinä Millerin pystymittakaavalla. leveys_m = koko nimen leveys harvennuksineen. '
      + 'Teksti versaalein; nykyalueilla sanan ensimmäinen kirjain täysikokoinen, muut pienkapiteeli-kertoimella. Ei haloa.',
    versio,
    lahde: { pyramidi: pyramidi.versio, nimiotaso: taso.versio, tyylit: 'tools/fokuskartta/maailmapiirto.js' },
    fontti: {
      pyydetty: NIMION_FONTTI,
      valittu: 'Liberation Serif 2.1.5 (OFL 1.1): pysty maakunnille, nykyalueille ja merille, kursiivi valtamerille',
      tiedostot: 'tools/fokuskartta/fontit/ (LiberationSerif-Regular.ttf, LiberationSerif-Italic.ttf, OFL.txt, LAHDE.txt)',
      huom: 'Fable 24.9.2026: sama fontti natiiviin ja webin seuraavaan polttoon (PR #3105). Nimiötaso 2026-09-22g on vielä poltettu macOS:n Timesilla; mitat tästä tiedostosta (metriikka lähes sama).',
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

/*
 * MERINIMET AINA MEREN PÄÄLLÄ (löydös 107, omistaja build 13: Välimeri ja
 * Messinansalmi piirtyivät Sisilian ja Calabrian päälle). Webin nimiötason
 * ankkuri on törmäyksenväistön tulos, joka ei katso rantaviivaa. Jokaisen
 * merinimen laatikko (teksti ja sen alla aaltomerkki) tarkistetaan
 * maapolygoneja vastaan tasoittain; jos se osuu maahan, nimi siirretään
 * lähimpään kohtaan, jossa laatikko on veden päällä (enintään 5 %
 * näytteistä maalla — pienet saaret sallitaan). Haku ulottuu enintään
 * 0,75 nimen leveyden päähän (salmilla 0,35), jotta nimi pysyy omalla
 * merellään, eikä uusi paikka saa osua saman tason muihin nimiin. Jos
 * paikkaa ei löydy, salmen nimeä pienennetään (0,8 → 0,65 → 0,5 kertaa
 * webin koko; korkeus_m ja leveys_m kertovat piirtokoon), ja jos sekään
 * ei mahdu, nimi jätetään pois siltä tasolta: maan päällä oleva merinimi
 * on virhe, puuttuva ei. Rivi säilyy, vaikka yksikään taso ei jäisi
 * (merinimet.json viittaa samoihin tunnuksiin).
 *
 * Laatikko kirjainkorkeuksina k: yläreuna +0,6 k, alareuna −1,75 k
 * (tyylit.meri.aaltomerkki.alla_em 0,95 + aallon korkeus), leveys leveys_m.
 */
const LAATIKKO_YLOS = 0.6;
const LAATIKKO_ALAS = 1.75;
const NAYTTEET = [13, 5];
const MAATA_ENINTAAN = 0.05;
const HAKU_LEVEYKSINA = 0.75;
/** Salmi tai kanaali nimeää kapean kohdan: sen nimi saa siirtyä vain vähän. */
const SALMEN_HAKU = 0.35;
const onSalmi = (n) => /salmi|kanaali|rauma|dardanellit/u.test(n.id);

/** Nimen laatikko asteina [w, s, e, n]; merinimellä aaltomerkki alla. */
function nimenLaatikko(n, p) {
  const mLon = 1 / (R * RAD * Math.cos(p.lat * RAD));
  const mLat = 1 / (R * RAD);
  const k = p.korkeus_m;
  const alas = n.luokka === 'meri' ? LAATIKKO_ALAS : LAATIKKO_YLOS;
  return [p.lon - (p.leveys_m / 2) * mLon, p.lat - alas * k * mLat, p.lon + (p.leveys_m / 2) * mLon, p.lat + LAATIKKO_YLOS * k * mLat];
}
const leikkaa = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];

/** Maapolygonit (NE admin-0 GeoJSON) nopeaan piste-maalla-testiin: [{ laatikko, renkaat }]. */
export function maaIndeksi(geojson) {
  const osat = [];
  for (const f of geojson.features) {
    const polys = f.geometry?.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry?.coordinates ?? [];
    for (const poly of polys) {
      let [w, s, e, n] = [Infinity, Infinity, -Infinity, -Infinity];
      for (const [x, y] of poly[0]) { w = Math.min(w, x); e = Math.max(e, x); s = Math.min(s, y); n = Math.max(n, y); }
      osat.push({ laatikko: [w, s, e, n], renkaat: poly });
    }
  }
  return osat;
}

function renkaassa(r, x, y) {
  let sisalla = false;
  for (let i = 0, j = r.length - 1; i < r.length; j = i, i += 1) {
    const [xi, yi] = r[i]; const [xj, yj] = r[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) sisalla = !sisalla;
  }
  return sisalla;
}

export function maalla(maa, lon, lat) {
  for (const o of maa) {
    const [w, s, e, n] = o.laatikko;
    if (lon < w || lon > e || lat < s || lat > n) continue; // eslint-disable-line no-continue
    if (renkaassa(o.renkaat[0], lon, lat) && !o.renkaat.slice(1).some((r) => renkaassa(r, lon, lat))) return true;
  }
  return false;
}

/** Osuus laatikon näytepisteistä maalla (0…1). */
export function maaOsuus(maa, { lon, lat, korkeus_m: k, leveys_m: l }) {
  const mLon = 1 / (R * RAD * Math.cos(lat * RAD));
  const mLat = 1 / (R * RAD);
  const [nx, ny] = NAYTTEET;
  let osumia = 0;
  for (let i = 0; i < nx; i += 1) {
    for (let j = 0; j < ny; j += 1) {
      const dx = (i / (nx - 1) - 0.5) * l;
      const dy = LAATIKKO_YLOS * k - (j / (ny - 1)) * (LAATIKKO_YLOS + LAATIKKO_ALAS) * k;
      if (maalla(maa, lon + dx * mLon, lat + dy * mLat)) osumia += 1;
    }
  }
  return osumia / (nx * ny);
}

/**
 * Siirtää merinimet (luokka meri) veden päälle tasoittain. Palauttaa
 * { siirretty, poistettu } ja muuttaa `nimet`-rivejä paikallaan.
 */
export function meretVedenPaalle(nimet, maa) {
  const tulos = { siirretty: [], poistettu: [] };
  const muutTasolla = (itse, z) => nimet.filter((m) => m !== itse && m.paikat[z]).map((m) => nimenLaatikko(m, m.paikat[z]));
  for (const n of nimet) {
    if (n.luokka !== 'meri') continue; // eslint-disable-line no-continue
    for (const [z, p] of Object.entries(n.paikat)) {
      if (maaOsuus(maa, p) <= MAATA_ENINTAAN) continue; // eslint-disable-line no-continue
      const muut = muutTasolla(n, z);
      const haku = (onSalmi(n) ? SALMEN_HAKU : HAKU_LEVEYKSINA) * p.leveys_m;
      const mLon = 1 / (R * RAD * Math.cos(p.lat * RAD));
      const mLat = 1 / (R * RAD);
      let paras = null;
      for (const kerroin of onSalmi(n) ? [1, 0.8, 0.65, 0.5] : [1]) {
        const koko = { ...p, korkeus_m: Math.round(p.korkeus_m * kerroin), leveys_m: Math.round(p.leveys_m * kerroin) };
        const askel = p.leveys_m / 10;
        for (let a = -8; a <= 8; a += 1) {
          for (let b = -8; b <= 8; b += 1) {
            const d = Math.hypot(a, b) * askel;
            if (d > haku || (paras && d >= paras.d)) continue; // eslint-disable-line no-continue
            const ehdokas = { ...koko, lon: p.lon + a * askel * mLon, lat: p.lat + b * askel * mLat };
            const laatikko = nimenLaatikko(n, ehdokas);
            if (muut.some((m) => leikkaa(m, laatikko))) continue; // eslint-disable-line no-continue
            if (maaOsuus(maa, ehdokas) <= MAATA_ENINTAAN) paras = { d, kerroin, ...ehdokas };
          }
        }
        if (paras) break;
      }
      if (paras) {
        tulos.siirretty.push(`${n.id} z${z} ${Math.round(paras.d / 1000)} km${paras.kerroin < 1 ? ` koko ${paras.kerroin}` : ''}`);
        p.lon = +paras.lon.toFixed(5); p.lat = +paras.lat.toFixed(5);
        if (paras.kerroin < 1) {
          p.korkeus_m = paras.korkeus_m; p.leveys_m = paras.leveys_m;
          p.korkeus_px = +(p.korkeus_px * paras.kerroin).toFixed(1);
        }
      } else {
        tulos.poistettu.push(`${n.id} z${z}`);
        delete n.paikat[z];
      }
    }
    n.tasot = Object.keys(n.paikat).map(Number);
    n.pallotasot = n.tasot.map((z) => z + 1);
  }
  return tulos;
}

async function lueJson(lahde) {
  if (/^https?:/.test(lahde)) return (await fetch(lahde)).json();
  return JSON.parse(readFileSync(lahde, 'utf8'));
}

async function paa() {
  const argv = process.argv.slice(2);
  const lippu = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
  const ulos = lippu('--ulos');
  if (lippu('--vain-meret')) {
    // Olemassa olevan aluenimet-tiedoston merinimet veden päälle ilman uutta vientiä.
    const tulos = await lueJson(lippu('--vain-meret'));
    const vesi = meretVedenPaalle(tulos.nimet, maaIndeksi(await lueJson(lippu('--maa'))));
    tulos.lukumaarat.meret_vedelle = { siirretty: vesi.siirretty, poistettu: vesi.poistettu };
    writeFileSync(ulos ?? lippu('--vain-meret'), `${JSON.stringify(tulos, null, 1)}\n`);
    console.log(`meret veden päälle: siirretty ${vesi.siirretty.length}, pois ${vesi.poistettu.join(', ') || '–'}`);
    return;
  }
  if (!ulos) throw new Error('käyttö: --ulos aluenimet.json [--pyramidi] [--nimisto] [--versio] [--maa ne_10m_admin_0_countries.geojson]');
  const pyramidi = await lueJson(lippu('--pyramidi') ?? PYRAMIDI_URL);
  const muste = new Map();
  if (lippu('--nimisto')) {
    for (const r of await lueJson(lippu('--nimisto'))) if (r.muste && r.teksti) muste.set(`${r.iso}|${r.teksti}`, r.muste);
  }
  const tulos = aluenimet(pyramidi, { muste, versio: lippu('--versio') ?? new Date().toISOString().slice(0, 10) });
  if (lippu('--maa')) {
    const vesi = meretVedenPaalle(tulos.nimet, maaIndeksi(await lueJson(lippu('--maa'))));
    tulos.lukumaarat.meret_vedelle = { siirretty: vesi.siirretty, poistettu: vesi.poistettu };
    console.log(`meret veden päälle: siirretty ${vesi.siirretty.join(', ') || '–'}; pois ${vesi.poistettu.join(', ') || '–'}`);
  }
  const puuttuu = tulos.nimet.filter((n) => n.luokka === 'nykyalue' && !muste.has(`${n.iso}|${n.teksti}`));
  if (lippu('--nimisto') && puuttuu.length) console.warn(`varoitus: ${puuttuu.length} nykyalueelta puuttuu muste nimistöstä (oletus sepia)`);
  writeFileSync(ulos, `${JSON.stringify(tulos, null, 1)}\n`);
  console.log(`${ulos}: ${JSON.stringify(tulos.lukumaarat)}`);
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  paa().catch((e) => { console.error(e.message ?? e); process.exit(1); });
}
