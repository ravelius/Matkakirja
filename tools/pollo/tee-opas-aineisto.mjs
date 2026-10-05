#!/usr/bin/env node
/*
 * ELÄVÄN OPPAAN AINEISTO (Päätoimittaja 5.10.2026 ilta, omistajan kysymys pelin oman datan käytöstä).
 *
 * Kokoaa pelin omista, jo tarkistetuista sisältöpaketeista kaupungeittain:
 *   - isoisän päiväkirjamerkinnän (js/packs/fokusvirta-<kaupunki>.js → matkakirja.paikkarivi + teksti, kaanon),
 *   - kaupunkilehden johdannot, nostot ja kuvatekstit (js/packs/kulttuuri-kategoriat.js),
 *   - saapumispuheen iskulauseen (js/packs/saapumispuheet.js).
 * Oppaan kertoja käyttää niitä taustatietona omin sanoin (kuten Pulun valmiit vastaukset), ei lue niitä sellaisenaan.
 *
 * Tulos kirjoitetaan tiedostoon tools/pollo/opas-aineisto.js. REPOSSA ON VAIN TYHJÄ TYNKÄ: täysi aineisto (~1,5 Mt)
 * generoidaan pollo-julkaisu.yml:ssä juuri ennen deployta, jotta git-historia ei paisu ja julkaisu on aina tuore.
 * Paikallisesti: `node tools/pollo/tee-opas-aineisto.mjs` (älä committaa tulosta; palauta tynkä `--tynka`-lipulla).
 */
import { readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TAMA = dirname(fileURLToPath(import.meta.url));
const JUURI = join(TAMA, '..', '..');
const KOHDE = join(TAMA, 'opas-aineisto.js');
/** Taustatiedon katto per kaupunki (merkkiä): mahtuu kehotteeseen, ja koko workerin aineisto pysyy ~1,5 Mt:ssä. */
export const AINEISTON_KATTO = 7000;

const OTSAKE = `/*
 * GENEROITU: node tools/pollo/tee-opas-aineisto.mjs (pelin sisältöpaketeista; ks. sen kommentti).
 * Repossa tynkä; pollo-julkaisu.yml generoi täyden aineiston ennen deployta. Älä muokkaa käsin.
 */
`;

const siivoa = (t) => String(t ?? '').replace(/\s+/g, ' ').trim();

export async function kokoaAineisto(juuri = JUURI) {
  const tuo = (polku) => import(pathToFileURL(join(juuri, polku)).href);
  const { KULTTUURI_KATEGORIAT: K } = await tuo('js/packs/kulttuuri-kategoriat.js');
  const { SAAPUMISPUHEET: S } = await tuo('js/packs/saapumispuheet.js');
  const isoisat = {};
  for (const f of readdirSync(join(juuri, 'js/packs')).filter((x) => /^fokusvirta-.*\.js$/.test(x))) {
    const v = Object.values(await tuo(`js/packs/${f}`)).find((x) => x?.kaupunki && x?.matkakirja?.teksti);
    if (v) isoisat[v.kaupunki] = { paikkarivi: siivoa(v.matkakirja.paikkarivi) || null, teksti: siivoa(v.matkakirja.teksti) };
  }
  const tulos = {};
  for (const [id, kategoriat] of Object.entries(K)) {
    if (!Array.isArray(kategoriat) || !kategoriat.length) continue;
    const kaupunki = kategoriat.find((c) => c.id === 'kaupunki') ?? kategoriat[0];
    // Järjestys: kaupungin johdanto ja kuvatekstit ensin, sitten kategorioiden johdannot ja nostot.
    const kohdat = [];
    const lisaa = (otsikko, teksti) => { const t = siivoa(teksti); if (t) kohdat.push(otsikko ? `${siivoa(otsikko)}: ${t}` : t); };
    lisaa(null, kaupunki.johdanto);
    for (const kuva of [...(kaupunki.kansikuvat ?? []), ...(kaupunki.avauskuvat ?? [])]) lisaa(null, kuva.selite ?? kuva.lyhyt);
    for (const c of kategoriat) {
      if (c !== kaupunki) lisaa(c.nimi, c.johdanto);
      for (const n of c.nostot ?? []) lisaa(n.otsikko, n.teksti ?? n.selite);
    }
    const tausta = [];
    let pituus = 0;
    for (const k of kohdat) {
      if (pituus + k.length > AINEISTON_KATTO) continue;
      tausta.push(k);
      pituus += k.length;
    }
    tulos[id] = {
      nimi: siivoa(kaupunki.nimi) || id,
      ...(S[id]?.slogan ? { iskulause: siivoa(S[id].slogan) } : {}),
      ...(isoisat[id] ? { isoisa: isoisat[id] } : {}),
      tausta,
    };
  }
  return tulos;
}

export function aineistoModuuliksi(aineisto) {
  return `${OTSAKE}export const OPAS_AINEISTO = ${JSON.stringify(aineisto)};\n`;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes('--tynka')) {
    writeFileSync(KOHDE, aineistoModuuliksi({}));
    console.log('opas-aineisto: tynkä palautettu');
  } else {
    const a = await kokoaAineisto();
    const teksti = aineistoModuuliksi(a);
    writeFileSync(KOHDE, teksti);
    const isoisia = Object.values(a).filter((x) => x.isoisa).length;
    console.log(`opas-aineisto: ${Object.keys(a).length} kaupunkia, ${isoisia} isoisän merkintää, ${(teksti.length / 1e6).toFixed(2)} Mt`);
  }
}
