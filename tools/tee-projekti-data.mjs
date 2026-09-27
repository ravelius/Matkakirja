#!/usr/bin/env node
/*
 * Projektisivun (projekti.html) koneluettava data: projekti-data.js.
 *
 * Omistajan tilaus 27.9.2026: yksi julkinen projektisivusto apurahan
 * arvioijille ja yhteistyökumppaneille — Tilanne, Linssit, Pelit, Kartta
 * ja maailma, Sisältö ja oppiminen, Natiivi iOS. Tämä työkalu kokoaa
 * Tilanne-välilehden tekstit ja luvut:
 *
 *   TEKSTIT  docs/tilannekatsaus.md (osiot "## Osa-alue", rivi "Tila: …",
 *            kappaleet ja "Seuraavaksi:"-lista) — päätoimittajan teksti.
 *   LUVUT    lasketaan pelin omasta datasta samoilla funktioilla kuin
 *            pelin kehittäjätilastot, joten luku ei voi erota pelistä:
 *              kaupungit, kaupunkilehdet, nähtävyysjutut, maalehdet
 *                → js/tyohuone-tilastot.js laskeTilastot() (kaupungit
 *                  yksilöityinä, koska sama kaupunki voi olla kahdella
 *                  laudalla)
 *              maat ja kartan kohteet
 *                → tools/laske-karttanostot.mjs kattavuus() (maailman-
 *                  kartan maat; kohteet = merkkeja() eli pääkartan ja
 *                  kohdekarttojen napautettavat merkit)
 *              kartan syvin taso → js/laattapyramidi.js PELIN_SYVIN_TASO
 *              webin versio → js/muutokset.js MUUTOKSET[0].v (sama luku
 *                kuin sw.js:n CACHE-nimen loppu)
 *   KÄSIVAKIOT  alla KASIVAKIOT: tiedot, joille repossa ei ole koneluettavaa
 *            lähdettä (laattaluettelo asuu ämpärissä, TestFlight-versio
 *            App Store Connectissa). Päivitä käsin, kun ne muuttuvat.
 *
 * Linssien ja pelien tilaluvut lasketaan selaimessa suoraan
 * linssikatalogi-data.js:stä ja pelikatalogi-data.js:stä (sivu lataa ne
 * joka tapauksessa), joten niitä ei kopioida tänne.
 *
 *   node tools/tee-projekti-data.mjs             kirjoittaa projekti-data.js
 *   node tools/tee-projekti-data.mjs --tarkista  vain vertaa (poistuu 1, jos eroaa)
 *
 * Pages-julkaisu (.github/workflows/pages.yml) ajaa työkalun ennen
 * kopiointia, joten julkaistut luvut ovat aina tuoreita, vaikka
 * repossa oleva kopio jäisi sisältömuutosten jälkeen jälkeen.
 * tests/projekti.test.mjs vahtii md-osuuden tarkasti ja luvut
 * järkevyysrajoin (tarkka lukuvertailu kaataisi testin jokaisesta
 * sisältömuutoksesta).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const MD_POLKU = fileURLToPath(new URL('../docs/tilannekatsaus.md', import.meta.url));
export const DATA_POLKU = fileURLToPath(new URL('../projekti-data.js', import.meta.url));

/*
 * KÄSIVAKIOT — ei koneluettavaa lähdettä repossa. Päivitä käsin.
 *   kartta.z10  Z10-tason poltto (tuotannossa 27.9.2026): kaksi
 *               laattaerää, 298 335 + 78 211 laattaa.
 *   natiivi     viimeisin sisäiseen testaukseen (TestFlight) viety versio.
 */
export const KASIVAKIOT = {
  kartta: {
    z10Tuotannossa: '2026-09-27',
    z10Laatat: [298335, 78211],
  },
  natiivi: {
    testflight: '1.0.28',
    paivitetty: '2026-09-27',
  },
};

// Osa-alueen otsikko → avain (sama kuin projekti.html:n välilehden hash).
export const OSIOT = {
  Yleiskuva: 'yleiskuva',
  'Kartta ja maailma': 'kartta',
  'Sisältö ja oppiminen': 'sisalto',
  Linssit: 'linssit',
  Pelit: 'pelit',
  'Natiivi iOS': 'natiivi',
};

function isoPaiva(teksti) {
  const m = String(teksti || '').match(/(\d{1,2})\.(\d{1,2})\.(20\d\d)/);
  return m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : null;
}

// Kappaleet: tyhjän rivin erottamat rivijoukot yhdeksi riviksi.
function kappaleiksi(rivit) {
  const ulos = [];
  let nyt = [];
  for (const r of rivit) {
    if (!r.trim()) { if (nyt.length) ulos.push(nyt.join(' ')); nyt = []; continue; }
    nyt.push(r.trim());
  }
  if (nyt.length) ulos.push(nyt.join(' '));
  return ulos;
}

export function jasennaTilannekatsaus(md) {
  const rivit = md.split('\n');
  const otsikko = (rivit.find((r) => r.startsWith('# ')) || '').replace(/^# /, '').trim();
  const paivitetty = isoPaiva(rivit.find((r) => /^Päivitetty:/.test(r)));
  const osiot = [];
  let osio = null;
  let tila = 'johdanto'; // 'johdanto' | 'teksti' | 'seuraavaksi'
  for (const rivi of rivit) {
    if (rivi.startsWith('# ') || /^Päivitetty:/.test(rivi)) continue;
    const h = rivi.match(/^## (.+)$/);
    if (h) {
      const nimi = h[1].trim();
      if (!OSIOT[nimi]) throw new Error(`docs/tilannekatsaus.md: tuntematon osio "${nimi}" — lisää se OSIOT-listaan`);
      osio = { avain: OSIOT[nimi], otsikko: nimi, tila: null, rivit: [], seuraavaksi: [] };
      osiot.push(osio);
      tila = 'teksti';
      continue;
    }
    if (!osio) continue;
    const t = rivi.match(/^Tila:\s*(.+)$/);
    if (t && !osio.tila) { osio.tila = t[1].trim(); continue; }
    if (/^Seuraavaksi:\s*$/.test(rivi)) { tila = 'seuraavaksi'; continue; }
    const kohta = rivi.match(/^\s*[-*]\s+(.+)$/);
    if (tila === 'seuraavaksi' && kohta) { osio.seuraavaksi.push(kohta[1].trim()); continue; }
    if (tila === 'seuraavaksi' && rivi.trim() && !kohta) tila = 'teksti';
    if (tila === 'teksti') osio.rivit.push(rivi);
  }
  // Johdanto (md:n ensimmäinen kappale) on ohje tekstin ylläpitäjille, ei
  // sivun sisältöä — se jätetään pois julkisesta datasta.
  return {
    otsikko,
    paivitetty,
    osiot: osiot.map(({ rivit: r, ...o }) => ({ ...o, kappaleet: kappaleiksi(r) })),
  };
}

// Pelidatan luvut. Tuonnit dynaamisina, jotta md-jäsennin (testit) ei
// lataa koko pelin pakkeja.
export async function laskeLuvut() {
  const { laskeTilastot } = await import('../js/tyohuone-tilastot.js');
  const { kattavuus, merkkeja } = await import('./laske-karttanostot.mjs');
  const { PELIN_SYVIN_TASO } = await import('../js/laattapyramidi.js');
  const { MUUTOKSET } = await import('../js/muutokset.js');

  const rivit = kattavuus();
  const pelinMaat = new Set(rivit.map((r) => r.iso));
  const kaupungit = new Map();
  const maat = new Map();
  for (const manner of laskeTilastot()) {
    for (const maa of manner.maat) {
      if (maa.iso && pelinMaat.has(maa.iso)) maat.set(maa.iso, maa);
      for (const k of maa.kaupungit) if (!kaupungit.has(k.id)) kaupungit.set(k.id, k);
    }
  }
  const tehty = (solu) => (solu?.pari ? solu.pari[0] : 0);
  const summa = (lista, avain) => lista.reduce((s, x) => s + tehty(x.solut[avain]), 0);
  const kaupunkiLista = [...kaupungit.values()];
  const kohteet = rivit.reduce((s, r) => s + merkkeja(r), 0);
  const laji = (avain) => rivit.reduce((s, r) => s + r[avain], 0);

  return {
    kaupunkeja: kaupunkiLista.length,
    kaupunkilehtia: summa(kaupunkiLista, 'lehti'),
    juttuja: summa(kaupunkiLista, 'jutut'),
    maita: rivit.length,
    maalehtia: summa([...maat.values()], 'maalehti'),
    kohteita: kohteet,
    kohdeLajit: {
      nahtavyydet: laji('kohteet'),
      maasto: laji('maastokohteet'),
      elaimet: laji('elaintaky'),
      skandaalit: laji('skandaalit'),
      hetket: laji('hetket'),
      kulttuuri: laji('kulttuurinostot'),
    },
    kartta: {
      syvinTaso: PELIN_SYVIN_TASO,
      tasoja: PELIN_SYVIN_TASO + 1,
      z10Laatat: KASIVAKIOT.kartta.z10Laatat,
      z10Yhteensa: KASIVAKIOT.kartta.z10Laatat.reduce((a, b) => a + b, 0),
      z10Tuotannossa: KASIVAKIOT.kartta.z10Tuotannossa,
    },
    versiot: {
      web: MUUTOKSET[0].v,
      natiivi: KASIVAKIOT.natiivi.testflight,
      natiiviPaivitetty: KASIVAKIOT.natiivi.paivitetty,
    },
  };
}

export function muotoileData(data) {
  return '// Tuotettu: node tools/tee-projekti-data.mjs (lähteet: docs/tilannekatsaus.md,\n'
    + '// pelin paketit ja työkalun KASIVAKIOT). Älä muokkaa käsin.\n'
    + `window.PROJEKTIDATA = ${JSON.stringify(data, null, 1)};\n`;
}

export async function kokoaData() {
  const tilanne = jasennaTilannekatsaus(readFileSync(MD_POLKU, 'utf8'));
  return { tilanne, luvut: await laskeLuvut() };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const teksti = muotoileData(await kokoaData());
  if (process.argv.includes('--tarkista')) {
    let nyt = '';
    try { nyt = readFileSync(DATA_POLKU, 'utf8'); } catch { /* puuttuu */ }
    if (nyt !== teksti) {
      console.error('projekti-data.js on vanhentunut — aja: node tools/tee-projekti-data.mjs');
      process.exit(1);
    }
    console.log('projekti-data.js ajan tasalla');
  } else {
    writeFileSync(DATA_POLKU, teksti);
    console.log(`kirjoitettu ${DATA_POLKU}`);
  }
}
