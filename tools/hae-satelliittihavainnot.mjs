/*
 * SATELLIITTILINSSIN AINEISTON HAKU — ICEYE Open Data (STAC) →
 * js/linssit/satelliitti-data.js.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/hae-satelliittihavainnot.mjs
 *
 * Työkalu on AJETTAVA ERIKSEEN eikä osa pelin latausta: linssi lukee
 * valmiin aineistotiedoston, jotta peli ei tee 500 verkkopyyntöä
 * aukaistessaan linssin eikä ole kiinni siitä, vastaako S3 juuri nyt.
 * Kuvia EI tuoda repoon — aineistoon tallentuu vain osoite.
 *
 * ── MIKSI RYHMITTELY ON FOOTPRINTISTÄ EIKÄ NIMESTÄ ────────────────
 *
 * Sama kohde kuvataan monta kertaa, ja katalogissa on kolme asiaa,
 * jotka menevät helposti sekaisin:
 *
 *   (A) SAMA KOHDE ERI KUVAUSAIKOINA. Kaksi eri STAC-tietuetta, joiden
 *       jalanjäljet ovat käytännössä päällekkäin. Nämä kuuluvat YHTEEN
 *       pisteeseen ja ovat sen havaintogalleria.
 *   (B) SAMAN HAVAINNON ERI TUOTTEET (SLC, GRD, QLK, CSI, VID). Nämä
 *       ovat YHDEN STAC-tietueen assetteja, eivät neljä havaintoa.
 *       Luettelo kulkee mukana kenttänä `tuotteet`.
 *   (C) VIEREKKÄISET ERI KUVAUSALUEET. Esimerkiksi Panaman kanavan
 *       yhdeksän spotlight-ruutua samalta ylilennolta kuuden sekunnin
 *       välein: ne ovat eri alueita, eivät saman alueen toistoja, ja
 *       niistä tulee ERI pisteitä.
 *
 * Sääntö on siksi geometrinen eikä nimellinen: kaksi tietuetta ovat
 * samaa kohdetta, kun niiden jalanjälkien leikkaus kattaa vähintään
 * PEITTO_RAJA pienemmän jalanjäljen pinta-alasta JA jalanjäljet ovat
 * kokoluokaltaan vertailukelpoiset (KOKO_SUHDE). Kokoehto estää
 * ketjuuntumisen: yksi 300 km:n scan-kuva liimaisi muuten kymmenen
 * erillistä 6 km:n spotlight-kohdetta yhdeksi.
 *
 * Kaupungin nimeä tai keskipisteiden läheisyyttä EI käytetä, eikä
 * luokittelua rakenneta tiedostonimeen (osa osoitteista sattuu
 * sisältämään paikannimen; sitä ei lueta).
 *
 * ── OLETUSKUVAN VALINTA ───────────────────────────────────────────
 *
 * Oletus ei ole "uusin" vaan paras yleiskuva, ja sääntö on
 * kirjoitettu auki js/linssit/satelliitti.js:n funktioon
 * `parasHavainto` — täällä se vain tallennetaan kenttään `oletus`,
 * jotta aineisto on luettavissa ilman peliä. Sama järjestys
 * molemmissa; tests/satelliitti.test.mjs vartioi.
 *
 * ── KOHTEIDEN VALINTA ─────────────────────────────────────────────
 *
 * ANKKURIT alla on käsin valittu, tarkistettu luettelo: yksi rivi per
 * piste, ankkurina kohteen likimääräinen sijainti. Työkalu etsii sitä
 * lähimpänä olevan footprint-ryhmän ja ottaa sen KOKONAAN. Näin
 * kohteen lisääminen on yhden rivin muutos eikä uusi aineistotiedosto.
 */

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Kokoelman osoite (ICEYE Open Data, STAC 1.0). */
export const KOKOELMA = 'https://iceye-open-data-catalog.s3.amazonaws.com/collections/iceye-sar.json';

/**
 * Kokoelmassa on 500 varsinaista kuvausta ja yksi kooste
 * (`000-iceye-sar-collection-footprints`), joka ei ole havainto vaan
 * kaikkien jalanjälkien yhdiste. Rajaus on tunnuksen etuliite.
 */
export const TIETUEEN_ETULIITE = 'ICEYE_';

/** Jalanjälkien päällekkäisyys pienemmästä pinta-alasta (ks. yllä). */
export const PEITTO_RAJA = 0.5;
/** Suurin sallittu kokosuhde saman kohteen jalanjälkien välillä. */
export const KOKO_SUHDE = 4;

/**
 * Kohteet: tunnus, näytettävä nimi, seutu, ankkuri (lat, lon) ja
 * yhden virkkeen selite. Ankkuri on vain hakuavain — pisteen lopullinen
 * paikka lasketaan ryhmän jalanjäljistä.
 */
export const ANKKURIT = [
  {
    tunnus: 'venetsia', nimi: 'Venetsia', seutu: 'Italia', lat: 45.437, lon: 12.329,
    selite: 'Laguunikaupunki tutkan silmin: kanavat ovat mustia, kivitalot valkoisia.',
  },
  {
    tunnus: 'krakova', nimi: 'Krakova', seutu: 'Puola', lat: 50.048, lon: 19.932,
    selite: 'Veikselin mutka ja vanhankaupungin rengaspuisto erottuvat yhtenä silmukkana.',
  },
  {
    tunnus: 'loch-etive', nimi: 'Loch Etiven kapeikko', seutu: 'Skotlanti', lat: 56.456, lon: -5.389,
    selite: 'Vuoroveden kapeikko, jota on kuvattu päivä toisensa jälkeen: virta piirtyy veteen.',
  },
  {
    tunnus: 'kastrup', nimi: 'Kastrup', seutu: 'Kööpenhamina, Tanska', lat: 55.587, lon: 12.784,
    selite: 'Lentoaseman kiitoradat ja Juutinrauman ranta saman ruudun sisällä.',
  },
  {
    tunnus: 'hoek-van-holland', nimi: 'Hoek van Holland', seutu: 'Alankomaat', lat: 51.950, lon: 4.145,
    selite: 'Rotterdamin sataman suuaukko, jossa aallonmurtajat työntyvät mereen.',
  },
  {
    tunnus: 'faro', nimi: 'Faro', seutu: 'Portugali', lat: 37.004, lon: -7.916,
    selite: 'Ria Formosan laguuni ja sen hiekkasärkät Algarven rannikolla.',
  },
  {
    tunnus: 'teneriffa', nimi: 'Teneriffa', seutu: 'Kanariansaaret', lat: 28.241, lon: -16.673,
    selite: 'Sama saari kuvattuna joka yö kolmen viikon ajan — tutkan aikasarja.',
  },
  {
    tunnus: 'napolinlahti', nimi: 'Napolinlahti', seutu: 'Italia', lat: 40.649, lon: 14.492,
    selite: 'Vesuviuksen rinteet ja Sorrenton niemi yhtenä kaistana.',
  },
  {
    tunnus: 'panama', nimi: 'Panaman kanavan suu', seutu: 'Panama', lat: 8.898, lon: -79.526,
    selite: 'Laivat odottavat vuoroaan kanavalle: jokainen valkoinen täplä on alus.',
  },
  {
    tunnus: 'niagara', nimi: 'Niagaran putoukset', seutu: 'Kanada ja Yhdysvallat', lat: 43.081, lon: -79.071,
    selite: 'Putousten kaari ja kaksi kaupunkia joen molemmin puolin.',
  },
  {
    tunnus: 'losangeles', nimi: 'Los Angelesin satama', seutu: 'Yhdysvallat', lat: 33.752, lon: -118.230,
    selite: 'Konttiterminaalit ja nosturirivit, joiden metalli loistaa tutkassa.',
  },
  {
    tunnus: 'fort-mcmurray', nimi: 'Fort McMurray', seutu: 'Alberta, Kanada', lat: 56.683, lon: -111.286,
    selite: 'Kaksi viikkoa peräkkäisiä kuvauksia kevättulvan aikaan.',
  },
  {
    tunnus: 'fort-simpson', nimi: 'Fort Simpson', seutu: 'Luoteisterritoriot, Kanada', lat: 61.878, lon: -121.369,
    selite: 'Kylä saarella Mackenzie- ja Liard-jokien yhtymäkohdassa, kuvattuna jäidenlähdön aikaan.',
  },
  {
    tunnus: 'juneau', nimi: 'Juneau', seutu: 'Alaska, Yhdysvallat', lat: 58.295, lon: -134.424,
    selite: 'Vuonon pohjukan kaupunki jäätiköiden ja jyrkkien rinteiden välissä.',
  },
  {
    tunnus: 'ucayali', nimi: 'Ucayali', seutu: 'Peru', lat: -8.393, lon: -74.519,
    selite: 'Amazonin latvajoen mutkat sademetsässä, jossa pilvet eivät haittaa tutkaa.',
  },
  {
    tunnus: 'victorian-putoukset', nimi: 'Victorian putoukset', seutu: 'Sambia ja Zimbabwe', lat: -17.936, lon: 25.856,
    selite: 'Sambesin kuilu ja putousten reuna; alapuolella siksakkaava rotko.',
  },
  {
    tunnus: 'kaohsiung', nimi: 'Kaohsiung', seutu: 'Taiwan', lat: 22.594, lon: 120.994,
    selite: 'Yksi maailman vilkkaimmista konttisatamista kahtena eri vuonna.',
  },
  {
    tunnus: 'zhengzhou', nimi: 'Zhengzhou', seutu: 'Kiina', lat: 34.748, lon: 113.782,
    selite: 'Suurkaupungin ruutukaava, jonka korttelit erottuvat teräväreunaisina.',
  },
  {
    tunnus: 'port-klang', nimi: 'Port Klang', seutu: 'Malesia', lat: 2.688, lon: 101.289,
    selite: 'Malakan salmen satama ja sen mutaiset rannikkovedet.',
  },
  {
    tunnus: 'adelaide-river', nimi: 'Adelaide Riverin seutu', seutu: 'Pohjoisterritorio, Australia', lat: -13.784, lon: 130.713,
    selite: 'Trooppinen tulvatasanko sadekauden lopulla, vesi mustana pensaikon seassa.',
  },
  {
    tunnus: 'thwaites', nimi: 'Thwaitesin jäätikkö', seutu: 'Antarktis', lat: -75.483, lon: -106.825,
    selite: 'Jäätikön railokenttä ja kelluvan kielen reuna, kaksi vuotta peräkkäin.',
  },
];

/** Jalanjäljen likimääräinen pinta-ala neliökilometreinä (bbox). */
export function alaKm2(bbox) {
  const keskilat = (bbox[1] + bbox[3]) / 2;
  const leveys = (bbox[2] - bbox[0]) * 111.32 * Math.cos((keskilat * Math.PI) / 180);
  const korkeus = (bbox[3] - bbox[1]) * 110.57;
  return Math.max(0, leveys) * Math.max(0, korkeus);
}

/** Kahden bboxin leikkauksen pinta-ala neliökilometreinä. */
export function leikkausKm2(a, b) {
  const x0 = Math.max(a[0], b[0]);
  const x1 = Math.min(a[2], b[2]);
  const y0 = Math.max(a[1], b[1]);
  const y1 = Math.min(a[3], b[3]);
  if (x1 <= x0 || y1 <= y0) return 0;
  return alaKm2([x0, y0, x1, y1]);
}

/** Ovatko kaksi jalanjälkeä samaa kohdetta? (ks. sääntö yllä) */
export function samaKohde(a, b) {
  const aa = alaKm2(a);
  const ab = alaKm2(b);
  if (!(aa > 0) || !(ab > 0)) return false;
  if (Math.max(aa, ab) / Math.min(aa, ab) > KOKO_SUHDE) return false;
  return leikkausKm2(a, b) / Math.min(aa, ab) >= PEITTO_RAJA;
}

/** Yhdisteet: lista bboxeja → lista indeksijoukkoja. */
export function ryhmita(bboxit) {
  const isa = bboxit.map((_, i) => i);
  const etsi = (a) => {
    let x = a;
    while (isa[x] !== x) { isa[x] = isa[isa[x]]; x = isa[x]; }
    return x;
  };
  for (let i = 0; i < bboxit.length; i++) {
    for (let j = i + 1; j < bboxit.length; j++) {
      if (!samaKohde(bboxit[i], bboxit[j])) continue;
      const ra = etsi(i);
      const rb = etsi(j);
      if (ra !== rb) isa[ra] = rb;
    }
  }
  const ryhmat = new Map();
  for (let i = 0; i < bboxit.length; i++) {
    const juuri = etsi(i);
    if (!ryhmat.has(juuri)) ryhmat.set(juuri, []);
    ryhmat.get(juuri).push(i);
  }
  return [...ryhmat.values()];
}

/** Tietueen keskipiste: projektion keskiö tai bboxin keskikohta. */
export function keskipiste(tietue) {
  const c = tietue.properties?.['proj:centroid'];
  if (c && Number.isFinite(c.lat) && Number.isFinite(c.lon)) return { lat: c.lat, lon: c.lon };
  const b = tietue.bbox;
  return { lat: (b[1] + b[3]) / 2, lon: (b[0] + b[2]) / 2 };
}

/** Pikkukuvan (THM) osoite tietueen linkeistä, tai null. */
export function pikkukuva(tietue) {
  for (const l of tietue.links ?? []) {
    if (l.rel === 'thumbnail' && l.title === 'Thumbnail' && typeof l.href === 'string') return l.href;
  }
  return null;
}

/** Itselinkki (STAC-tietue) — lähdelinkki pelaajalle. */
export function itselinkki(tietue) {
  return (tietue.links ?? []).find((l) => l.rel === 'self')?.href ?? null;
}

/**
 * Saman havainnon tuotteet: asset-avaimista `slc-cog` → SLC.
 * Tämä on kohta (B): ne EIVÄT ole eri havaintoja.
 */
export function tuotteet(tietue) {
  const ulos = [];
  for (const avain of Object.keys(tietue.assets ?? {})) {
    const osa = avain.split('-')[0].toUpperCase();
    if (osa && osa !== 'GRAPHIC' && !ulos.includes(osa)) ulos.push(osa);
  }
  return ulos.sort();
}

async function haeJson(osoite) {
  const vastaus = await fetch(osoite);
  if (!vastaus.ok) throw new Error(`${vastaus.status} ${osoite}`);
  return vastaus.json();
}

/** Vastaako osoite 200:lla? Kuvaa ei ladata, vain otsikot. */
async function kuvaVastaa(osoite) {
  try {
    const vastaus = await fetch(osoite, { method: 'HEAD' });
    return vastaus.ok;
  } catch {
    return false;
  }
}

/** Rinnakkaishaku pienissä erissä, jotta S3 ei tukkeudu. */
async function erissa(lista, tyo, koko = 16) {
  const ulos = [];
  for (let i = 0; i < lista.length; i += koko) {
    // eslint-disable-next-line no-await-in-loop
    ulos.push(...await Promise.all(lista.slice(i, i + koko).map(tyo)));
  }
  return ulos;
}

/** Havainnon järjestysavain — sama sääntö kuin pelissä (parasHavainto). */
function laatuavain(h) {
  const tilat = { spotlight: 3, dwell: 3, stripmap: 2, scan: 1 };
  return [tilat[h.tila] ?? 0, -(h.katselukulma ?? 90), h.aika];
}

function parempi(a, b) {
  const x = laatuavain(a);
  const y = laatuavain(b);
  for (let i = 0; i < x.length; i++) {
    if (x[i] > y[i]) return true;
    if (x[i] < y[i]) return false;
  }
  return false;
}

async function main() {
  process.stdout.write(`Haetaan kokoelma: ${KOKOELMA}\n`);
  const kokoelma = await haeJson(KOKOELMA);
  const osoitteet = (kokoelma.links ?? []).filter((l) => l.rel === 'item').map((l) => l.href);
  process.stdout.write(`  ${osoitteet.length} tietuelinkkiä\n`);

  const kaikki = (await erissa(osoitteet, async (u) => {
    try { return await haeJson(u); } catch { return null; }
  })).filter((d) => d && typeof d.id === 'string' && d.id.startsWith(TIETUEEN_ETULIITE));
  process.stdout.write(`  ${kaikki.length} varsinaista kuvausta (kooste rajattu pois)\n`);

  const ryhmat = ryhmita(kaikki.map((d) => d.bbox));
  process.stdout.write(`  ${ryhmat.length} footprint-ryhmää\n`);

  const kohteet = [];
  for (const ankkuri of ANKKURIT) {
    let paras = null;
    let parasEtaisyys = Infinity;
    for (const ryhma of ryhmat) {
      for (const i of ryhma) {
        const k = keskipiste(kaikki[i]);
        const d = Math.hypot(k.lat - ankkuri.lat, k.lon - ankkuri.lon);
        if (d < parasEtaisyys) { parasEtaisyys = d; paras = ryhma; }
      }
    }
    if (!paras) continue;
    const havainnot = [];
    for (const i of paras) {
      const t = kaikki[i];
      const kuva = pikkukuva(t);
      if (!kuva) continue;
      const p = t.properties ?? {};
      havainnot.push({
        id: t.id,
        aika: p.datetime,
        tila: p['sar:instrument_mode'] ?? null,
        satelliitti: p.platform ?? null,
        katselukulma: Number.isFinite(p['view:incidence_angle'])
          ? Math.round(p['view:incidence_angle'] * 10) / 10 : null,
        rata: p['sat:orbit_state'] ?? null,
        katse: p['sar:observation_direction'] ?? null,
        polarisaatio: (p['sar:polarizations'] ?? []).join('+') || null,
        kaista: p['sar:frequency_band'] ?? null,
        kasittely: p['processing:software']?.processor ?? null,
        alue: t.bbox.map((x) => Math.round(x * 10000) / 10000),
        tuotteet: tuotteet(t),
        kuva,
        stac: itselinkki(t),
      });
    }
    havainnot.sort((a, b) => (a.aika < b.aika ? -1 : 1));
    if (!havainnot.length) continue;

    // Kuvaosoitteet tarkistetaan oikeasti: rikkinäinen rivi jää pois.
    const kunnossa = await erissa(havainnot, async (h) => (await kuvaVastaa(h.kuva) ? h : null));
    const kelpaavat = kunnossa.filter(Boolean);
    if (!kelpaavat.length) {
      process.stdout.write(`  !! ${ankkuri.tunnus}: yksikään kuva ei vastannut\n`);
      continue;
    }
    const lat = kelpaavat.reduce((s, h) => s + (h.alue[1] + h.alue[3]) / 2, 0) / kelpaavat.length;
    const lon = kelpaavat.reduce((s, h) => s + (h.alue[0] + h.alue[2]) / 2, 0) / kelpaavat.length;
    let oletus = kelpaavat[0];
    for (const h of kelpaavat) if (parempi(h, oletus)) oletus = h;
    kohteet.push({
      tunnus: ankkuri.tunnus,
      nimi: ankkuri.nimi,
      seutu: ankkuri.seutu,
      selite: ankkuri.selite,
      lat: Math.round(lat * 10000) / 10000,
      lon: Math.round(lon * 10000) / 10000,
      oletus: oletus.id,
      havainnot: kelpaavat,
    });
    process.stdout.write(`  ${ankkuri.tunnus}: ${kelpaavat.length} havaintoa, oletus ${oletus.id}\n`);
  }

  const paiva = new Date().toISOString().slice(0, 10);
  const sisalto = `/*\n`
    + ` * SATELLIITTILINSSIN HAVAINNOT — KONEELLISESTI TUOTETTU TIEDOSTO.\n`
    + ` *\n`
    + ` * Älä muokkaa käsin: aja tools/hae-satelliittihavainnot.mjs, joka\n`
    + ` * lukee ICEYE Open Data -kokoelman STAC-katalogin, ryhmittelee\n`
    + ` * kuvaukset jalanjäljen mukaan kohteiksi ja tarkistaa jokaisen\n`
    + ` * kuvaosoitteen. Aineisto on CC BY 4.0, tekijä ICEYE; kuvat EIVÄT\n`
    + ` * ole repossa vaan ladataan lähteen omasta ämpäristä.\n`
    + ` *\n`
    + ` * Haettu: ${paiva}. Kohteita ${kohteet.length}, havaintoja `
    + `${kohteet.reduce((s, k) => s + k.havainnot.length, 0)}.\n`
    + ` */\n\n`
    + `export const SATELLIITTI_LAHDE = ${JSON.stringify({
      aineisto: 'ICEYE Open Data (SAR)',
      tekija: 'ICEYE',
      lisenssi: 'CC BY 4.0',
      osoite: 'https://sar.iceye.com/6.0.6/opendata/opendata/',
      katalogi: KOKOELMA,
      haettu: paiva,
    }, null, 2)};\n\n`
    + `export const SATELLIITTI_KOHTEET = ${JSON.stringify(kohteet, null, 2)};\n`;
  const polku = join(JUURI, 'js/linssit/satelliitti-data.js');
  writeFileSync(polku, sisalto);
  process.stdout.write(`Kirjoitettu ${polku}\n`);
}

if (process.argv[1] && process.argv[1].endsWith('hae-satelliittihavainnot.mjs')) {
  await main();
}
