/*
 * OSUUKO LAUDAN KAUPUNKI OIKEAAN PAIKKAAN PALLOLLA?
 *
 * Pallolauta (js/pallolauta/lauta.js) piirtää laudan kaupungit pallolle
 * kääntämällä laudan (x, y) asteiksi laudan omalla projektiolla
 * (js/fokusmitat.js laudaltaAsteiksi). Pallon PINTA sen sijaan on
 * oikeaa maantiedettä: Web Mercator -laatat ja Natural Earthin
 * rantaviiva. Jos laudan koordinaatti on käsin sommiteltu, kaupunki
 * osuu pallolla väärään paikkaan — omistajan vikailmoitus 7.9.2026:
 * *"Helsinki näyttää, että se on aivan liian kaukana rannikosta."*
 *
 * Tämä työkalu mittaa eron: jokaiselle kaupungille lasketaan laudan
 * muunnoksella pallosijainti ja verrataan sitä Wikidatan
 * koordinaattiin (kaupungin oma `wiki`-kenttä → fi-Wikipedian artikkeli
 * → wdt:P625). Vastaus on kilometrejä isoympyrää pitkin.
 *
 * KAUPUNGILLA VOI OLLA OMA PALLOPISTE (`pallo`-kenttä, taulu
 * js/packs/maailmankartta-pallopisteet.js). Silloin mittaus lukee sitä,
 * koska pallokin lukee sitä — kentän saanut kaupunki osuu siis nollaan.
 * Yli rajan jäävät ovat sen jälkeen ALUEITA (Borneo, Kamtšatka,
 * Ahaggar, järvet, aavikot…), joiden Wikidata-koordinaatti on alueen
 * keskipiste eikä se kohta, jota lauta tarkoittaa: työkalu on LIPPU
 * IHMISELLE, ei tuomio.
 *
 * Käyttö:
 *   NODE_USE_ENV_PROXY=1 node tools/tarkista-laudan-pisteet.mjs
 *   NODE_USE_ENV_PROXY=1 node tools/tarkista-laudan-pisteet.mjs --raja 25
 *   node tools/tarkista-laudan-pisteet.mjs --json      (koneelle)
 *   node tools/tarkista-laudan-pisteet.mjs --lauta maailmankartta
 *
 * Välimuisti on pakollinen: Wikidataa ei kysytä kahdesti samasta
 * nimestä. Hakemisto tulee ympäristömuuttujasta LAUDAN_PISTEET_VALIMUISTI
 * tai on oletuksena tools/.valimuisti/laudan-pisteet/. Kun välimuisti on
 * täysi, työkalu toimii ilman verkkoa (portit ja CI).
 *
 * User-Agent on "Matkakirja-tarkistus/1.0" — EI sähköpostiosoitetta
 * (CLAUDE.md: mitään henkilötietoa ei viedä ulkopuoliselle palvelulle).
 *
 * Paluuarvo: 0 kun yksikään kaupunki ei ylitä rajaa, 1 kun ylittää.
 * Puuttuva koordinaatti (ei wiki-sivua, ei koordinaattia sivulla) ei
 * kaada ajoa — se raportoidaan omana listanaan.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PACKS } from '../js/pack.js';
import { laudaltaAsteiksi } from '../js/fokusmitat.js';
import { FOKUS_LAUTAPROJEKTIOT } from '../js/packs/fokus-grc.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const VALIMUISTI = process.env.LAUDAN_PISTEET_VALIMUISTI
  ?? join(JUURI, 'tools', '.valimuisti', 'laudan-pisteet');
const KAYTTAJA = 'Matkakirja-tarkistus/1.0';
/*
 * LÄHDE ON WIKIDATA, EI WIKIPEDIAN API. Kaupungin `wiki` on
 * fi-Wikipedian sivunimi, ja Wikidatan kyselypalvelu kääntää sen
 * suoraan koordinaatiksi (schema:name @fi → wdt:P625). Yksi kysely
 * kattaa kymmeniä kaupunkeja, kun Wikipedian action-API kuristaa
 * (429) jaetusta osoitteesta tulevan sarjan heti ensimmäisellä
 * pyynnöllä.
 */
const WIKIDATA = 'https://query.wikidata.org/sparql';
/** Maapallon säde kilometreinä (isoympyrä). */
const SADE_KM = 6371.0088;

const argv = process.argv.slice(2);
const arvo = (lippu, oletus) => {
  const i = argv.indexOf(lippu);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const RAJA_KM = Number(arvo('--raja', '15'));
const JSONA = argv.includes('--json');
const VAIN_LAUTA = arvo('--lauta', null);
const VERKOTON = argv.includes('--offline');

/** Isoympyräetäisyys kilometreinä (haversine). */
export function etaisyysKm(a, b) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2
    + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * SADE_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

/* --------------------------------------------------------- välimuisti */

function valimuistinPolku(nimi) {
  const turva = nimi.replace(/[^\p{L}\p{N}]+/gu, '_').slice(0, 120);
  return join(VALIMUISTI, `${turva}.json`);
}

function lueValimuistista(nimi) {
  const p = valimuistinPolku(nimi);
  if (!existsSync(p)) return null;
  try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; }
}

function kirjoitaValimuistiin(nimi, tieto) {
  mkdirSync(VALIMUISTI, { recursive: true });
  writeFileSync(valimuistinPolku(nimi), `${JSON.stringify(tieto, null, 2)}\n`);
}

/* ------------------------------------------------------------- haku */

/**
 * Wikidatan koordinaatit yhdelle erälle fi-Wikipedian sivunimiä.
 * Palauttaa Mapin nimi → { lat, lon } | null.
 *
 * Uudelleenohjaukset: `schema:name` on ARTIKKELIN nimi, joten ohjaus
 * ei löydy — sellainen nimi jää ilman koordinaattia ja raportoidaan
 * omana listanaan (korjaus on kirjoittaa pakkaan artikkelin oikea nimi).
 */
async function haeKoordinaatit(nimet) {
  const arvot = nimet.map((n) => `${JSON.stringify(n)}@fi`).join(' ');
  const kysely = `SELECT ?title ?coord WHERE {
  VALUES ?title { ${arvot} }
  ?artikkeli schema:about ?kohde ;
    schema:isPartOf <https://fi.wikipedia.org/> ;
    schema:name ?title .
  ?kohde wdt:P625 ?coord .
}`;
  /*
   * Kyselypalvelu kuristaa nopeat sarjat (429). Yritetään uudestaan
   * kasvavalla odotuksella; neljäs epäonnistuminen keskeyttää ajon,
   * jolloin välimuistiin jää jo haettu osa eikä työ mene hukkaan.
   */
  let data = null;
  for (let yritys = 0; yritys < 4; yritys += 1) {
    const vastaus = await fetch(WIKIDATA, {
      method: 'POST',
      headers: {
        'User-Agent': KAYTTAJA,
        Accept: 'application/sparql-results+json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ query: kysely }),
    });
    if (vastaus.ok) { data = await vastaus.json(); break; }
    if (vastaus.status !== 429 || yritys === 3) throw new Error(`Wikidata ${vastaus.status}`);
    await new Promise((v) => { setTimeout(v, 3000 * (yritys + 1)); });
  }
  const ulos = new Map(nimet.map((n) => [n, null]));
  for (const rivi of data?.results?.bindings ?? []) {
    const nimi = rivi?.title?.value;
    const piste = /Point\(\s*(-?[\d.]+)\s+(-?[\d.]+)\s*\)/.exec(rivi?.coord?.value ?? '');
    if (!nimi || !piste || !ulos.has(nimi)) continue;
    // Wikidatan piste on Point(lon lat).
    ulos.set(nimi, { lat: Number(piste[2]), lon: Number(piste[1]) });
  }
  return ulos;
}

/** Koordinaatit kaikille nimille: välimuisti ensin, puuttuvat verkosta. */
async function koordinaatit(nimet) {
  const ulos = new Map();
  const puuttuvat = [];
  for (const nimi of nimet) {
    const muistissa = lueValimuistista(nimi);
    if (muistissa) ulos.set(nimi, muistissa.paikka ?? null);
    else puuttuvat.push(nimi);
  }
  if (!puuttuvat.length) return ulos;
  if (VERKOTON) {
    for (const nimi of puuttuvat) ulos.set(nimi, null);
    return ulos;
  }
  for (let i = 0; i < puuttuvat.length; i += 60) {
    const era = puuttuvat.slice(i, i + 60);
    if (i) await new Promise((v) => { setTimeout(v, 1200); });
    const haettu = await haeKoordinaatit(era);
    for (const nimi of era) {
      const paikka = haettu.get(nimi) ?? null;
      kirjoitaValimuistiin(nimi, { nimi, paikka, haettu: new Date().toISOString() });
      ulos.set(nimi, paikka);
    }
  }
  return ulos;
}

/* ------------------------------------------------------------- ajo */

/** Laudat, joilla on maantieteellinen projektio ja kaupunkeja. */
function laudat() {
  return PACKS.filter((p) => FOKUS_LAUTAPROJEKTIOT[p.id] && (p.cities ?? []).length)
    .filter((p) => !VAIN_LAUTA || p.id === VAIN_LAUTA);
}

async function main() {
  const kaikki = laudat();
  if (!kaikki.length) {
    console.error(VAIN_LAUTA ? `Tuntematon lauta: ${VAIN_LAUTA}` : 'Ei projektiollisia lautoja.');
    process.exit(2);
  }
  const nimet = new Set();
  for (const pack of kaikki) for (const c of pack.cities) if (c.wiki) nimet.add(c.wiki);
  const paikat = await koordinaatit([...nimet]);

  const raportti = [];
  for (const pack of kaikki) {
    for (const c of pack.cities) {
      /*
       * KAUPUNGIN OMA PALLOPISTE VOITTAA (js/packs/
       * maailmankartta-pallopisteet.js): pallo lukee `pallo`-kenttää
       * eikä laudan x/y:tä, joten mittauskin lukee sitä. Ilman kenttää
       * kaupunki mitataan laudan omasta pisteestä kuten ennen.
       */
      const laudalla = c.pallo && Number.isFinite(c.pallo.lat) && Number.isFinite(c.pallo.lon)
        ? { lat: c.pallo.lat, lon: c.pallo.lon }
        : laudaltaAsteiksi(pack.id, c.x, c.y);
      const oikea = c.wiki ? paikat.get(c.wiki) : null;
      raportti.push({
        lauta: pack.id,
        id: c.id,
        nimi: c.name,
        wiki: c.wiki ?? null,
        x: c.x,
        y: c.y,
        oma: c.pallo ? { lat: c.pallo.lat, lon: c.pallo.lon } : null,
        laudalla,
        oikea,
        km: laudalla && oikea ? etaisyysKm(laudalla, oikea) : null,
      });
    }
  }
  const mitatut = raportti.filter((r) => r.km !== null).sort((a, b) => b.km - a.km);
  const ilman = raportti.filter((r) => r.km === null);
  const yli = mitatut.filter((r) => r.km > RAJA_KM);

  if (JSONA) {
    console.log(JSON.stringify({ raja: RAJA_KM, mitatut, ilman }, null, 2));
  } else {
    const mediaani = mitatut.length
      ? mitatut[Math.floor(mitatut.length / 2)].km : 0;
    console.log(`Laudan pisteet vs. Wikidata — raja ${RAJA_KM} km`);
    console.log(`  mitattu ${mitatut.length}, ilman koordinaattia ${ilman.length}`);
    console.log(`  mediaani ${mediaani.toFixed(1)} km, suurin ${(mitatut[0]?.km ?? 0).toFixed(1)} km`);
    console.log(`  yli rajan: ${yli.length}`);
    for (const r of yli) {
      console.log(`  ${r.km.toFixed(1).padStart(7)} km  ${r.lauta}/${r.id.padEnd(18)}`
        + ` lauta ${r.laudalla.lat.toFixed(3)},${r.laudalla.lon.toFixed(3)}`
        + `  oikea ${r.oikea.lat.toFixed(3)},${r.oikea.lon.toFixed(3)}`);
    }
    for (const r of ilman) console.log(`  (ei koordinaattia) ${r.lauta}/${r.id} — wiki ${r.wiki}`);
  }
  process.exit(yli.length ? 1 : 0);
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => { console.error(e.message); process.exit(2); });
}
