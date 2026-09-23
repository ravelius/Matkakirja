#!/usr/bin/env node
/*
 * SISÄLLÖN VIENTI MOOTTORINEUTRAALIKSI JSONIKSI (Siirtoseppä 23.9.2026).
 *
 *   node tools/vienti/vie-sisalto.mjs [--ulos dist/vienti]
 *
 * Tausta: omistaja rakentaa natiivin iOS-pelin nykyisen rinnalle (loki
 * 23.9.2026 klo 09.43). Moottori on vielä valitsematta, joten sisältö
 * viedään muotoon, jonka mikä tahansa moottori osaa lukea: JSON-puita
 * ja mediaviittauksia ämpäriin (https://media.matkakirja.app/).
 *
 * Kolme kerrosta:
 *   moduulit/<polku>.json  RAAKAKERROS: jokaisen sisältömoduulin kaikki
 *                          exportit häviöttömästi (tools/vienti/
 *                          sarjallista.mjs). Totuus; muut kerrokset
 *                          johdetaan tästä.
 *   media.json             jokainen datassa mainittu kuva/ääni/URL,
 *                          missä se esiintyy ja ämpärin osoite, kun sen
 *                          voi laskea pelin omilla säännöillä.
 *   kokoelmat/*.json       KOKOELMAKERROS: tyypitetyt entiteetit (kaupungit,
 *                          reitit, maat...) id-viittauksineen — tuojan
 *                          helppo lähtöpiste (tools/vienti/kokoelmat.mjs).
 *   tiedostot/...          valmiit JSON-aineistot sellaisenaan (lahteet.mjs).
 *   web/<näkymä>.json      web-näkymän (lehti) koodi- ja tiedostoriippuvuudet
 *                          natiivin WKWebView-kuorelle (web-riippuvuudet.mjs).
 *   skeema/*.schema.json   JSON Schema (2020-12) jokaiselle tiedostolajille.
 *   manifest.json          sisällysluettelo: moduulit, exportit, lukumäärät,
 *                          tiivisteet. Tuoja tarkistaa tästä, että sai kaiken.
 *
 * Deterministinen: ei aikaleimoja, moduulit aakkosjärjestyksessä, exportit
 * moduulinimiavaruuden (aakkos)järjestyksessä, datan järjestys lähteen
 * järjestys. Sama lähde → tavulleen sama tulos (tests/vienti.test.mjs).
 *
 * Ei muuta peliä: lukee vain moduuleja. dist/ on .gitignoressa.
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { sarjallista } from './sarjallista.mjs';
import { LISAMODUULIT, LISATIEDOSTOT } from './lahteet.mjs';
import { TARKKUUS, mediaLaji, ratkaiseMedia } from './media.mjs';
import { kokoaKokoelmat } from './kokoelmat.mjs';
import { kokoaWebNakymat } from './web-riippuvuudet.mjs';

export const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const SKEEMAVERSIO = 'matkakirja-vienti/1';
/*
 * Skeeman major.minor (siirtoputkiraportin osa 5.3). Major on polussa
 * (`matkakirja-vienti/1`, ämpärissä `sisalto/1/`); minor nousee, kun
 * lisätään kenttä tai kokoelma, eikä vanha sovellus välitä siitä.
 * Poisto tai merkityksen muutos nostaa majoria ja vaihtaa osoitinpolun.
 *   1.0  ensimmäinen vienti (PR #2890)
 *   1.1  kaupungit: maa2 (ISO2), tyyppi, lentokentta, aloitus; osoitin
 *   1.2  kaupungit: tarkeys 0–3; manifest: tavuja kokoelmille, medialle
 *        ja lisätiedostoille; kaupunki.data merkitty raakaolioksi
 *   1.3  web/<näkymä>.json: web-näkymän (lehti) JS/CSS/tiedostoriippuvuudet
 *        WKWebView-kuorelle; manifest.webNakymat
 */
export const SKEEMAVERSIO_TARKKA = '1.3';

const sha = (s) => createHash('sha256').update(s).digest('hex');
const tavuja = (s) => Buffer.byteLength(s);

/**
 * Kaikki vietävät moduulit aakkosjärjestyksessä: js/packs/*.js kokonaan
 * (exportit: null = kaikki, luokka 'pack') + lahteet.mjs:n nimetyt exportit.
 */
export function vietavatModuulit(juuri = JUURI) {
  const packit = readdirSync(join(juuri, 'js/packs'))
    .filter((f) => f.endsWith('.js'))
    .map((f) => ({ moduuli: `js/packs/${f}`, exportit: null, luokka: 'pack' }));
  return [...packit, ...LISAMODUULIT].sort((a, b) => (a.moduuli < b.moduuli ? -1 : 1));
}

function laji(v) {
  if (v === null) return 'null';
  if (typeof v === 'function') return 'funktio';
  if (Array.isArray(v)) return 'taulukko';
  if (v instanceof Map) return 'map';
  if (v instanceof Set) return 'set';
  return { object: 'olio', string: 'merkkijono', number: 'luku', boolean: 'totuusarvo' }[typeof v] ?? typeof v;
}

function lukumaara(v) {
  if (Array.isArray(v)) return v.length;
  if (v instanceof Map || v instanceof Set) return v.size;
  if (v && typeof v === 'object') return Object.keys(v).length;
  return null;
}

/**
 * Kokoaa koko viennin muistiin. Palauttaa { tiedostot: Map<polku, teksti>,
 * manifest }. Kirjoittaminen levylle on erillään, jotta testi voi ajaa
 * tämän ilman sivuvaikutuksia.
 */
export async function kokoaVienti({ juuri = JUURI } = {}) {
  const tiedostot = new Map();
  const mediat = new Map(); // arvo -> { laji, esiintymat[] }
  const nimiavaruudet = new Map();
  const manifestModuulit = [];

  for (const { moduuli: polku, exportit: valitut, luokka } of vietavatModuulit(juuri)) {
    const lahde = readFileSync(join(juuri, polku), 'utf8');
    const ns = await import(pathToFileURL(join(juuri, polku)).href);
    nimiavaruudet.set(polku, ns);
    const exportit = {};
    const kuvaus = [];
    for (const nimi of valitut ?? Object.keys(ns)) {
      if (!(nimi in ns)) throw new Error(`${polku}: exporttia ${nimi} ei ole (tools/vienti/lahteet.mjs)`);
      let viitteita = 0;
      let funktioita = 0;
      const puu = sarjallista(ns[nimi], {
        kaynti(teksti, kohta) {
          const ml = mediaLaji(teksti, kohta, polku);
          if (!ml) return;
          viitteita++;
          if (!mediat.has(teksti)) mediat.set(teksti, { laji: ml, esiintymat: [] });
          else if (TARKKUUS(ml) < TARKKUUS(mediat.get(teksti).laji)) mediat.get(teksti).laji = ml;
          mediat.get(teksti).esiintymat.push({ moduuli: polku, export: nimi, polku: kohta });
        },
      });
      const teksti = JSON.stringify(puu);
      funktioita = (teksti.match(/\{"\$funktio":/g) || []).length;
      exportit[nimi] = puu;
      kuvaus.push({
        nimi,
        laji: laji(ns[nimi]),
        lkm: lukumaara(ns[nimi]),
        funktioita,
        mediaviitteita: viitteita,
      });
    }
    const tiedosto = `moduulit/${polku.replace(/\.js$/, '.json')}`;
    const sisalto = JSON.stringify({ $skeema: `${SKEEMAVERSIO}/moduuli`, moduuli: polku, exportit });
    tiedostot.set(tiedosto, sisalto + '\n');
    manifestModuulit.push({
      moduuli: polku,
      luokka,
      kaikkiExportit: valitut === null,
      tiedosto,
      lahdeSha256: sha(lahde),
      sha256: sha(sisalto + '\n'),
      tavuja: Buffer.byteLength(sisalto) + 1,
      exportit: kuvaus,
    });
  }

  const mediaLista = [...mediat.keys()].sort().map((arvo) => ({
    arvo,
    laji: mediat.get(arvo).laji,
    ...ratkaiseMedia(arvo, mediat.get(arvo).laji),
    esiintymat: mediat.get(arvo).esiintymat,
  }));
  const mediaTeksti = JSON.stringify({ $skeema: `${SKEEMAVERSIO}/media`, viitteet: mediaLista }) + '\n';
  tiedostot.set('media.json', mediaTeksti);

  const kokoelmat = kokoaKokoelmat(nimiavaruudet);
  const kokoelmaKuvaus = [];
  for (const [nimi, k] of Object.entries(kokoelmat)) {
    const teksti = JSON.stringify({ $skeema: `${SKEEMAVERSIO}/kokoelma`, nimi, ...k }) + '\n';
    const tiedosto = `kokoelmat/${nimi}.json`;
    tiedostot.set(tiedosto, teksti);
    kokoelmaKuvaus.push({ nimi, tiedosto, lahde: k.lahde, lkm: k.alkiot.length, sha256: sha(teksti), tavuja: tavuja(teksti) });
  }

  const lisatiedostot = LISATIEDOSTOT.map((polku) => {
    const teksti = readFileSync(join(juuri, polku), 'utf8');
    JSON.parse(teksti); // vain kelvollinen JSON kelpaa sellaisenaan
    tiedostot.set(`tiedostot/${polku}`, teksti);
    return { lahde: polku, tiedosto: `tiedostot/${polku}`, sha256: sha(teksti), tavuja: tavuja(teksti) };
  });

  const webNakymat = kokoaWebNakymat(juuri).map(({ nimi, tiedosto, sisalto }) => {
    const teksti = JSON.stringify(sisalto) + '\n';
    tiedostot.set(tiedosto, teksti);
    return { nimi, tiedosto, sha256: sha(teksti), tavuja: tavuja(teksti) };
  });

  const skeemat = readdirSync(join(JUURI, 'tools/vienti/skeema')).filter((f) => f.endsWith('.json')).sort();
  for (const f of skeemat) tiedostot.set(`skeema/${f}`, readFileSync(join(JUURI, 'tools/vienti/skeema', f), 'utf8'));

  const mediaLaskenta = {};
  for (const m of mediaLista) mediaLaskenta[m.laji] = (mediaLaskenta[m.laji] || 0) + 1;

  const manifest = {
    $skeema: `${SKEEMAVERSIO}/manifest`,
    skeemaversio: SKEEMAVERSIO_TARKKA,
    kuvaus: 'Matkakirjan sisältö moottorineutraalissa muodossa. Ks. docs/raportit/sisallon-siirtoputki-20260923.md.',
    mediaJuuri: 'https://media.matkakirja.app/',
    laskennat: {
      moduuleja: manifestModuulit.length,
      exportteja: manifestModuulit.reduce((a, m) => a + m.exportit.length, 0),
      funktioita: manifestModuulit.reduce((a, m) => a + m.exportit.reduce((b, e) => b + e.funktioita, 0), 0),
      mediaviitteita: mediaLista.length,
      mediaEsiintymia: mediaLista.reduce((a, m) => a + m.esiintymat.length, 0),
      mediaLajeittain: mediaLaskenta,
      kokoelmia: kokoelmaKuvaus.length,
    },
    lisatiedostot,
    skeemat: skeemat.map((f) => `skeema/${f}`),
    media: { tiedosto: 'media.json', sha256: sha(mediaTeksti), tavuja: tavuja(mediaTeksti) },
    kokoelmat: kokoelmaKuvaus,
    webNakymat,
    moduulit: manifestModuulit,
  };
  tiedostot.set('manifest.json', JSON.stringify(manifest, null, 1) + '\n');
  return { tiedostot, manifest, nimiavaruudet };
}

export function kirjoita(tiedostot, ulos) {
  rmSync(ulos, { recursive: true, force: true });
  for (const [polku, teksti] of tiedostot) {
    const kohde = join(ulos, polku);
    mkdirSync(dirname(kohde), { recursive: true });
    writeFileSync(kohde, teksti);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const i = process.argv.indexOf('--ulos');
  const ulos = resolve(i > 0 ? process.argv[i + 1] : join(JUURI, 'dist/vienti'));
  const { tiedostot, manifest } = await kokoaVienti();
  kirjoita(tiedostot, ulos);
  const l = manifest.laskennat;
  const tavut = [...tiedostot.values()].reduce((a, t) => a + Buffer.byteLength(t), 0);
  console.log(`vienti → ${relative(process.cwd(), ulos) || '.'}: ${tiedostot.size} tiedostoa, ${(tavut / 1e6).toFixed(1)} Mt`);
  console.log(`  ${l.moduuleja} moduulia, ${l.exportteja} exporttia, ${l.funktioita} funktiota (logiikkaa, ei dataa)`);
  console.log(`  ${l.mediaviitteita} mediaviitettä (${l.mediaEsiintymia} esiintymää): ${JSON.stringify(l.mediaLajeittain)}`);
  console.log(`  kokoelmat: ${manifest.kokoelmat.map((k) => `${k.nimi} ${k.lkm}`).join(', ')}`);
}
