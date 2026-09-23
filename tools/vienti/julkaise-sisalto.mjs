#!/usr/bin/env node
/*
 * SISÄLTÖPAKETIN JULKAISU ÄMPÄRIIN — valmistelu (Siirtoseppä 23.9.2026).
 *
 *   node tools/vienti/julkaise-sisalto.mjs [--vienti dist/vienti]
 *        [--edellinen uusin.json] [--suurin <N>] [--ulos dist/sisalto] [--commit <sha>]
 *
 * Omistajan tilaus 23.9.2026 klo 10.05 (yhteinen sisältölähde, raportti
 * docs/raportit/sisallon-siirtoputki-20260923.md osa 5): jokaisesta
 * main-mergestä syntyy samasta commitista sekä web (Pages) että
 * natiivin lukema sisältöpaketti. Tämä skripti valmistelee paketin;
 * .github/workflows/vie-sisalto.yml vie sen ämpäriin.
 *
 * Mitä tapahtuu:
 *   1. Luetaan vie-sisalto.mjs:n tulos ja lasketaan koko paketin tiiviste
 *      (jokainen polku ja sen sha256).
 *   2. Jos tiiviste on sama kuin edellisen osoittimen, mitään ei viedä
 *      (muuttui=false). Pelkkä koodimuutos ei tee uutta sisältöversiota.
 *   3. Muuten versio N = suurin ämpärissä oleva versio + 1 (ensimmäinen 1).
 *      Suurin eikä osoittimen versio: palautuksen (uusin.json → v5, kun
 *      v7 on olemassa) jälkeen N = osoitin + 1 kirjoittaisi muuttumattomaksi
 *      välimuistitetun v6:n päälle. Sisältöversio
 *      on CI:n laskuri, erillään APP_VERSIONista: tekstikorjaus ei vaadi
 *      uutta sovellusversiota kummassakaan pelissä.
 *   4. Paketti tarkistetaan skeemoja vasten (validoi.mjs). Rikkinäistä
 *      pakettia ei kirjoiteta, ja ajo kaatuu.
 *   5. Kirjoitetaan <ulos>/v<N>/ (paketti + osoitin.json palautusta
 *      varten) ja <ulos>/uusin.json. Työnkulku vie osoittimen VIIMEISENÄ.
 *
 * minSovellus: pienin natiivin sisältötaso, joka osaa lukea paketin.
 * Nosta MIN_SOVELLUS.ios, kun paketti alkaa vaatia natiivilta uutta
 * koodia (esim. uusi pulmatyyppi); vanha sovellus jää silloin edelliseen
 * pakettiin. Web ei lue pakettia (Pages julkaisee packit), joten null.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SKEEMAVERSIO, SKEEMAVERSIO_TARKKA, JUURI } from './vie-sisalto.mjs';
import { tarkistaSopimus } from './skeemasopimus.mjs';
import { validoiNimella } from './validoi.mjs';

export const MIN_SOVELLUS = { ios: 1, web: null };
export const MAJOR = SKEEMAVERSIO.split('/').pop();

const sha = (s) => createHash('sha256').update(s).digest('hex');

/** Koko paketin tiiviste: polut aakkosjärjestyksessä ja niiden sisällön sha256. */
export function paketinTiiviste(tiedostot) {
  const rivit = [...tiedostot.keys()].sort().map((p) => `${p}\t${sha(tiedostot.get(p))}\n`);
  return sha(rivit.join(''));
}

/**
 * Paketin skeematarkistus. Moduulitiedostot (raakakerros) jätetään
 * tästä pois nopeuden takia: niiden häviöttömyyden valvoo
 * tests/vienti.test.mjs.
 */
export function tarkistaPaketti(tiedostot) {
  const virheet = [];
  const lue = (p) => JSON.parse(tiedostot.get(p));
  const manifest = lue('manifest.json');
  virheet.push(...validoiNimella(manifest, 'manifest.schema.json', { polku: 'manifest.json' }));
  virheet.push(...validoiNimella(lue(manifest.media.tiedosto), 'media.schema.json', { polku: manifest.media.tiedosto }));
  for (const k of manifest.kokoelmat) {
    const kokoelma = lue(k.tiedosto);
    virheet.push(...validoiNimella(kokoelma, 'kokoelma.schema.json', { polku: k.tiedosto }));
    if (k.nimi === 'kaupungit') {
      kokoelma.alkiot.forEach((a, i) => virheet.push(
        ...validoiNimella(a, 'kaupunki.schema.json', { polku: `${k.tiedosto}#${i}` }),
      ));
    }
  }
  if (manifest.offline) {
    virheet.push(...validoiNimella(lue(manifest.offline.tiedosto), 'offline.schema.json', { polku: manifest.offline.tiedosto }));
  }
  for (const w of manifest.webNakymat ?? []) {
    virheet.push(...validoiNimella(lue(w.tiedosto), 'web-nakyma.schema.json', { polku: w.tiedosto }));
  }
  // Skeemanumero vastaa kenttiä (ämpärin v11 oli "1.10" ilman 1.10:n kenttiä).
  virheet.push(...tarkistaSopimus(tiedostot, manifest.skeemaversio ?? SKEEMAVERSIO_TARKKA));
  return virheet;
}

/** Pelin APP_VERSION (tiedoksi osoittimeen, ei vaikuta sisältöversioon). */
export function lueAppVersion(juuri = JUURI) {
  const m = readFileSync(join(juuri, 'js/main.js'), 'utf8').match(/const APP_VERSION = '([^']+)'/);
  return m ? m[1] : null;
}

/**
 * Valmistelee julkaisun muistissa. Palauttaa { muuttui, versio, osoitin,
 * virheet }. Ei kirjoita mitään, jotta testi voi ajaa tämän sellaisenaan.
 */
/*
 * MUUTOSRIVI OSOITTIMEEN (Natiivi-UI:n "Mitä uutta", 23.9.2026). Osoitin
 * kantaa kokoelmien lukumäärät, ja uusi versio vertaa niitä edelliseen
 * osoittimeen. Rivi on osoittimessa eikä paketissa, koska versionumero
 * syntyy vasta paketin tiivisteestä. Käsin kirjoitetut rivit ovat
 * kokoelmassa muutosloki-natiivi.
 */
const MUUTOSNIMET = {
  kaupunkilehdet: 'kaupunkilehteä', maalehdet: 'maalehteä', nahtavyydet: 'nähtävyyttä', kysymykset: 'kysymystä',
  kohtaamiset: 'kohtaamista', julisteet: 'julistetta', radiot: 'radioasemaa', kohdekartat: 'kohdekarttaa',
  luennat: 'luentoa', elaintayt: 'eläinjuttua', kulttuurivisat: 'kulttuurivisaa', lehtitehtavat: 'lehtitehtävää',
  miniatyyrit: 'pienoismallia', paikallisaarteet: 'paikallisaarretta', historianHetket: 'historian hetkeä',
};
export function muutosRivi(edelliset, nykyiset, julkaistu) {
  const paiva = julkaistu.slice(0, 10);
  if (!edelliset) return { paiva, teksti: 'Sisältö päivittyi.' };
  const uudet = Object.entries(MUUTOSNIMET)
    .map(([nimi, sana]) => [nykyiset[nimi] - (edelliset[nimi] ?? 0), sana])
    .filter(([n]) => n > 0).sort((a, b) => b[0] - a[0]).slice(0, 3);
  return {
    paiva,
    teksti: uudet.length ? `Sisältö päivittyi: ${uudet.map(([n, sana]) => `${n} uutta ${sana}`).join(', ')}.` : 'Sisältöä päivitettiin.',
  };
}

export function kokoaJulkaisu({ tiedostot, edellinen = null, suurin = 0, commit, appVersion = null, julkaistu }) {
  const tiiviste = paketinTiiviste(tiedostot);
  if (edellinen && edellinen.sha256 === tiiviste) {
    return { muuttui: false, versio: edellinen.versio, osoitin: edellinen, virheet: [] };
  }
  const virheet = tarkistaPaketti(tiedostot);
  const versio = Math.max(suurin, edellinen?.versio ?? 0) + 1;
  const osoitin = {
    $skeema: `${SKEEMAVERSIO}/osoitin`,
    versio,
    polku: `sisalto/${MAJOR}/v${versio}/`,
    sha256: tiiviste,
    skeemaversio: SKEEMAVERSIO_TARKKA,
    minSovellus: { ...MIN_SOVELLUS },
    edellinen: edellinen?.versio ?? null,
    commit,
    appVersion,
    julkaistu,
  };
  const manifest = tiedostot.has('manifest.json') ? JSON.parse(tiedostot.get('manifest.json')) : null;
  if (manifest?.kokoelmat) {
    osoitin.kokoelmaLkm = Object.fromEntries(manifest.kokoelmat.map((k) => [k.nimi, k.lkm]));
    osoitin.muutos = muutosRivi(edellinen?.kokoelmaLkm ?? null, osoitin.kokoelmaLkm, julkaistu);
  }
  virheet.push(...validoiNimella(osoitin, 'osoitin.schema.json', { polku: 'uusin.json' }));
  return { muuttui: true, versio, osoitin, virheet };
}

function lueKansio(kansio) {
  const ulos = new Map();
  const kay = (d) => {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) kay(p);
      else ulos.set(relative(kansio, p).split('\\').join('/'), readFileSync(p, 'utf8'));
    }
  };
  kay(kansio);
  return ulos;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arg = (n, oletus) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : oletus; };
  const vienti = resolve(arg('--vienti', join(JUURI, 'dist/vienti')));
  const ulos = resolve(arg('--ulos', join(JUURI, 'dist/sisalto')));
  const edellinenPolku = arg('--edellinen', null);
  const edellinen = edellinenPolku && existsSync(edellinenPolku)
    ? JSON.parse(readFileSync(edellinenPolku, 'utf8')) : null;
  const commit = arg('--commit', process.env.GITHUB_SHA ?? '0000000');
  const tiedostot = lueKansio(vienti);
  const suurin = Number(arg('--suurin', 0)) || 0;
  const j = kokoaJulkaisu({
    tiedostot, edellinen, suurin, commit, appVersion: lueAppVersion(), julkaistu: new Date().toISOString(),
  });
  if (j.virheet.length) {
    console.error(`Paketti ei läpäise skeematarkistusta (${j.virheet.length}${j.virheet.length >= 20 ? '+' : ''}):`);
    for (const v of j.virheet) console.error(`  ${v}`);
    process.exit(1);
  }
  if (j.muuttui) {
    for (const [p, teksti] of tiedostot) {
      const kohde = join(ulos, `v${j.versio}`, p);
      mkdirSync(dirname(kohde), { recursive: true });
      writeFileSync(kohde, teksti);
    }
    const osoitinTeksti = `${JSON.stringify(j.osoitin, null, 1)}\n`;
    writeFileSync(join(ulos, `v${j.versio}`, 'osoitin.json'), osoitinTeksti);
    writeFileSync(join(ulos, 'uusin.json'), osoitinTeksti);
    console.log(`Uusi sisältöversio v${j.versio} (${tiedostot.size} tiedostoa, sha256 ${j.osoitin.sha256.slice(0, 12)}…)`);
  } else {
    console.log(`Sisältö ei muuttunut: pysytään versiossa v${j.versio}.`);
  }
  if (process.env.GITHUB_OUTPUT) {
    writeFileSync(process.env.GITHUB_OUTPUT, `muuttui=${j.muuttui}\nversio=${j.versio}\n`, { flag: 'a' });
  }
}
