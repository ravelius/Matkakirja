#!/usr/bin/env node
/*
 * FOKUSLEHTEEN POLTETUT KAUPUNGINNIMET → js/packs/fokus-grc.js
 * FOKUS_LISANIMET.
 *
 * === MIKSI TÄMÄ TYÖKALU ON OLEMASSA ===
 *
 * Fokuslehti on esirenderöity kuva, ja sen kaupunginnimet ovat siinä
 * PIKSELEINÄ: peli ei voi lukea niitä kuvasta. Silti pelin on tiedettävä
 * ne kahteen asiaan (js/fokuskohteet.js):
 *
 *   1. NIMIÖN VAIENNUS. Kaupunkikohteen oma nimiö jää pois, jos lehti on
 *      jo polttanut saman nimen samaan pisteeseen — muuten nimi lukee
 *      kartalla kahdesti päällekkäin (omistajan havainto Bulgarian
 *      lehdeltä: "Plovdiv näkyy kahteen kertaan").
 *   2. NAPAUTETTAVA NIMI. Kartalla iso kohde on kaupungin NIMI eikä
 *      pikkuruinen merkki, joten pelin on laskettava nimen laatikko ja
 *      pantava siihen näkymätön osuma-alue.
 *
 * FOKUS_LISANIMET on siis LEHDEN PEILIKUVA laudan koordinaateissa, ja
 * peilin on synnyttävä koneellisesti — käsin kirjoitettuna se ajautuisi
 * kuvasta erilleen heti ensimmäisellä uudelleenrenderöinnillä.
 *
 * === MISTÄ TIEDOT TULEVAT ===
 *
 * Kuratoidulla lehdellä (Kreikka) nimet ovat tools/fokuskartta/maat.mjs
 * `kaupungit`-listassa. YLEISELLÄ REITILLÄ niitä ei ole missään
 * repossa: tee-fokuskartta.mjs poimii ne Natural Earthistä ajon aikana
 * (tools/fokuskartta/aineisto.mjs `paikat`) ja kirjaa VALITUT NIMET
 * kuvan viereen `<ISO>.json`-tiedostoon kentäksi `paikat`. Se tiedosto
 * on ämpärissä kansiossa julisteet/fokus/, ja se on ainoa jälki siitä,
 * mitä kuvaan oikeasti poltettiin.
 *
 * Tämä työkalu yhdistää kaksi lähdettä:
 *
 *   ämpärin <ISO>.json   MITKÄ nimet lehteen poltettiin (ja missä
 *                        laatikossa kuva on laudalla)
 *   Natural Earth 10m    MISSÄ ne ovat asteina (populated_places)
 *
 * ja latoo niistä FOKUS_LISANIMET-rivit laudan koordinaateissa.
 *
 * === SIIRTO JA ANKKURI EIVÄT OLE ARVAUKSIA ===
 *
 * Luvut ovat suoraan tools/fokuskartta/piirto.js:n kohdasta 8g, joka
 * latoo yleisen reitin kaupunkien nimet: nimi menee pisteen oikealle
 * puolelle yhdeksän prototyyppipikselin päähän ja yhden pikselin
 * ylemmäs, paitsi kuvan oikeassa laidassa (x >= 82 % kuvan leveydestä),
 * missä se kääntyy vasemmalle. Kirjasimen koko on 14, jos Natural
 * Earthin SCALERANK on enintään 4, muuten 12,5.
 *
 * KUVAN LEVEYS luetaan js/packs/fokus-grc.js FOKUS_POHJAT -taulusta
 * (`bbox`), joka on sama laatikko, johon peli asettaa kuvan. Sitä ei
 * siis tarvitse laskea uudelleen eikä ämpäristä hakea.
 *
 * === KÄYTTÖ ===
 *
 *   NODE_USE_ENV_PROXY=1 node tools/tee-fokus-lisanimet.mjs \
 *       --ne <kansio jossa ne_10m_populated_places.geojson> [ISO ...]
 *
 * Ilman ISO-listaa työkalu käy läpi kaikki maat, joilla on
 * kohdepaketti (js/packs/fokuskohteet-*.js) — vain niillä on kartalla
 * merkkejä, joiden nimiö voi mennä päällekkäin poltetun kanssa.
 *
 *   --pohjat <kansio>   lue <ISO>.json paikallisesta kansiosta sen
 *                       sijaan että ne haettaisiin ämpäristä
 *   --json              tulosta koneluettavana JSONina
 *
 * Tuloste on valmis JS-lohko, joka liitetään js/packs/fokus-grc.js:n
 * FOKUS_LISANIMET-tauluun. TYÖKALU EI KIRJOITA REPOON: rivien seassa
 * on ihmisen kirjoittamia kommentteja, ja niiden yli ei ajeta.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync } from 'node:fs';

import { FOKUS_POHJAT, FOKUS_LAUTAPROJEKTIOT } from '../js/packs/fokus-grc.js';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/* Ämpärin juuri — sama osoite kuin js/media.js:ssä. */
const R2 = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/julisteet/fokus/';

/* ---------------------------------------------------------- argumentit */

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus = null) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const lippu = (nimi) => argv.includes(`--${nimi}`);
const isotArgumentista = argv.filter((a) => /^[A-Z]{3}$/.test(a));

const neKansio = resolve(valitsin('ne', process.env.FOKUSKARTTA_DATA
  ?? join(JUURI, 'tools', 'ne-aineisto')));
const pohjaKansio = valitsin('pohjat');

/* Maat, joilla on kohdepaketti. */
function kohdemaat() {
  return readdirSync(join(JUURI, 'js', 'packs'))
    .filter((f) => /^fokuskohteet-[a-z]{3}\.js$/.test(f))
    .map((f) => f.slice(13, 16).toUpperCase())
    .sort();
}

const isot = isotArgumentista.length ? isotArgumentista : kohdemaat();

/* ---------------------------------------------------------- projektio */

const RAD = Math.PI / 180;

/**
 * Laudan oma kaava asteista lautayksiköihin.
 *
 * SAMA KAAVA KUIN KUVASSA (tools/fokuskartta/piirto.js laudanProjektio)
 * — eri toisinto olisi juuri se virhe, jonka takia nimen laatikko
 * osuisi väärään kohtaan. Vain eteenpäin menevä suunta tarvitaan.
 */
function laudanKaava(p) {
  if (p.tyyppi === 'miller') {
    const skaala = p.leveys / (2 * Math.PI);
    const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
    const yPohjoinen = millerY(p.pohjoinen);
    const kierros = 2 * Math.PI;
    return {
      lautaX: (lon) => ((((lon - p.lon0) * RAD % kierros) + kierros) % kierros) * skaala,
      lautaY: (lat) => (millerY(lat) - yPohjoinen) * skaala,
    };
  }
  return {
    lautaX: (lon) => p.lonA * lon + p.lonB,
    lautaY: (lat) => p.latA * lat + p.latB,
  };
}

/* ------------------------------------------------------------ aineisto */

const NE_TIEDOSTO = 'ne_10m_populated_places.geojson';
const NE_PAIKKATUNNUS = { SDS: 'SSD' };

if (!existsSync(join(neKansio, NE_TIEDOSTO))) {
  console.error(`Natural Earthin ${NE_TIEDOSTO} puuttuu kansiosta ${neKansio}.`);
  console.error('Anna kansio valitsimella --ne tai muuttujalla FOKUSKARTTA_DATA.');
  process.exit(1);
}
const NE = JSON.parse(readFileSync(join(neKansio, NE_TIEDOSTO), 'utf8'));

/** Ämpärin <ISO>.json — verkosta tai paikallisesta kansiosta. */
async function lehdenJson(iso) {
  if (pohjaKansio) {
    return JSON.parse(readFileSync(join(resolve(pohjaKansio), `${iso}.json`), 'utf8'));
  }
  const vastaus = await fetch(`${R2}${iso}.json`);
  if (!vastaus.ok) throw new Error(`${iso}.json: HTTP ${vastaus.status}`);
  return vastaus.json();
}

/* ------------------------------------------------------------- poiminta */

/*
 * PIIRTO.JS KOHTA 8g LUKUINA. Nämä neljä lukua ovat koko asettelu:
 * nimi pisteen oikealle puolelle, ellei se ole kuvan oikeassa laidassa.
 */
const SIIRTO_X = 9;
const SIIRTO_Y = -1;
const OIKEAN_LAIDAN_RAJA = 0.82;
const KOKO_ISO = 14;
const KOKO_PIENI = 12.5;
/** SCALERANK, jota pienempi tai yhtä suuri saa ison kirjasimen. */
const ISON_LUOKKA = 4;

async function maanRivit(iso) {
  const pohja = FOKUS_POHJAT[iso];
  if (!pohja) throw new Error(`${iso}: ei riviä FOKUS_POHJAT-taulussa.`);
  const kaava = laudanKaava(FOKUS_LAUTAPROJEKTIOT[pohja.lauta]);
  const json = await lehdenJson(iso);
  const neIso = NE_PAIKKATUNNUS[iso] ?? iso;
  const piirteet = NE.features.filter(
    (f) => (f.properties.ADM0_A3 ?? f.properties.SOV_A3) === neIso,
  );
  const rivit = [];
  const puuttuvat = [];
  for (const nimi of json.paikat ?? []) {
    const f = piirteet.find(
      (g) => (g.properties.NAME ?? g.properties.NAMEASCII) === nimi,
    );
    if (!f) { puuttuvat.push(nimi); continue; }
    const [lon, lat] = f.geometry.coordinates;
    const x = kaava.lautaX(lon);
    const y = kaava.lautaY(lat);
    const oikealle = (x - pohja.bbox.x) < pohja.bbox.w * OIKEAN_LAIDAN_RAJA;
    const luokka = f.properties.SCALERANK ?? 99;
    rivit.push({
      nimi,
      lon: Math.round(lon * 1e4) / 1e4,
      lat: Math.round(lat * 1e4) / 1e4,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      dx: oikealle ? SIIRTO_X : -SIIRTO_X,
      dy: SIIRTO_Y,
      ...(oikealle ? {} : { ank: 'end' }),
      koko: luokka <= ISON_LUOKKA ? KOKO_ISO : KOKO_PIENI,
    });
  }
  return {
    iso,
    lauta: pohja.lauta,
    rivit,
    puuttuvat,
    tehty: json.tehty,
    /*
     * KURATOITU LEHTI EI KULJE TÄTÄ TIETÄ. Kreikan nimet ovat käsin
     * aseteltuja (tools/fokuskartta/maat.mjs GRC.kaupungit), eikä
     * `paikat` ole silloin tyhjä siksi, ettei lehdessä olisi nimiä,
     * vaan siksi ettei niitä poimittu aineistosta. Sen maan rivit
     * kirjoitetaan maat.mjs:n peilikuvana eikä täältä.
     */
    kuratoitu: json.yleinen === false,
  };
}

/* -------------------------------------------------------------- tuloste */

function jsRivi(r) {
  const osat = [`nimi: '${r.nimi.replace(/'/g, "\\'")}'`, `x: ${r.x}`, `y: ${r.y}`,
    `dx: ${r.dx}`, `dy: ${r.dy}`];
  if (r.ank) osat.push(`ank: '${r.ank}'`);
  osat.push(`koko: ${r.koko}`);
  return `      // ${r.lon} E / ${r.lat} N\n      { ${osat.join(', ')} },`;
}

const kaikki = [];
for (const iso of isot) kaikki.push(await maanRivit(iso));

if (lippu('json')) {
  const ulos = Object.fromEntries(kaikki.map((m) => [m.iso, m.rivit]));
  const polku = valitsin('ulos');
  if (polku) writeFileSync(polku, `${JSON.stringify(ulos, null, 2)}\n`);
  else console.log(JSON.stringify(ulos, null, 2));
} else {
  for (const m of kaikki) {
    if (m.kuratoitu) {
      console.log(`  /* ${m.iso}: kuratoitu lehti — rivit tulevat `
        + 'tools/fokuskartta/maat.mjs:stä, ei tästä työkalusta. */');
      continue;
    }
    if (!m.rivit.length) {
      console.log(`  /* ${m.iso}: lehteen ei ole poltettu yhtään kaupunginnimeä. */`);
      continue;
    }
    console.log(`  ${m.iso}: {`);
    console.log(`    lauta: '${m.lauta}',`);
    console.log('    kaupungit: [');
    for (const r of m.rivit) console.log(jsRivi(r));
    console.log('    ],');
    console.log('  },');
  }
}

for (const m of kaikki) {
  if (m.puuttuvat.length) {
    console.error(`VAROITUS ${m.iso}: Natural Earthistä ei löytynyt nimiä `
      + `${m.puuttuvat.join(', ')} — rivi jäi pois.`);
  }
}
