#!/usr/bin/env node
/*
 * SISÄLTÖPAKETTI 2.0 (suunnitelman vaihe 4,
 * docs/raportit/sisaltopaketti-2-0-suunnitelma-20260923.md).
 *
 * 2.0 johdetaan 1.x-viennistä muistissa, joten molemmat majorit tulevat
 * samasta commitista ja samasta koodista:
 *  - alkioilta pois `data` (natiivi lukee päätason kenttiä, Pelikoodarin
 *    pakettivartija vihreä raakakiellolla),
 *  - `moduulit/` vain natiivin lukemat (NATIIVIN_MODUULIT, manifestissa
 *    `natiivi: true`),
 *  - laattatyypeistä englanninkieliset avaimet pois (1.30:n lupaus),
 *  - media.json ilman esiintymat-listoja (ne osoittavat webin raakamoduuleihin;
 *    natiivi lukee viitteistä arvo → url),
 *  - $skeema- ja $id-tunnisteet /1/ → /2/, skeemaversio "2.0".
 *
 *   node tools/vienti/major2.mjs [--vienti dist/vienti] [--ulos dist/vienti2]
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const SKEEMAVERSIO_2 = '2.0';

/*
 * Moduulit, joita natiivi lukee (grep "moduulit/" natiivin masterista
 * c2b3521, 24.9.2026: Sisalto.HaePaketista, LinssiSisalto.Hae,
 * NostoSisalto.Moduuli, WikiIkkuna). Säännöllinen lauseke moduulin
 * polulle (js/…​.js). Uusi natiivin moduuliluku = uusi rivi tänne.
 */
export const NATIIVIN_MODUULIT = [
  /^js\/(aani-ehdokkaat|fokusnosto-symbolit|fokustehtavat|karttatyokalu-maakunnat|lahteet|ui-tekstit)\.js$/,
  /^js\/tyohuone-(musiikki|pelit|raamattu|tilanne)\.js$/,
  /^js\/linssit\/(astronaut-kysymykset|ihmisen-matka|ihmisen-matka-data|ihmisen-matka-kertomus|ihmisen-matka-kysymykset|keksinnot|maatiedot|radio|satelliitti-data|vertailu|vesistot)\.js$/,
  /^js\/packs\/(maailmankartta|maailmankartta-maasto|maailmankartta-nimet|maakunnat-luonnehdinnat|maakunnat-pulu|nimisto-1873|pollo-poiminnat|radiot|saatiedot|syvennyspaikat|uutislahteet|vanhat-aanet|viritysaanet)\.js$/,
  // NostoSisalto: <tiedosto>-<iso>.js maittain.
  /^js\/packs\/(fokuskohteet|maastokohteet|hahmotelma|nakyvat-kaupungit)-[a-z]{3}\.js$/,
  // WikiIkkuna: <manner>-artikkelit.js.
  /^js\/packs\/(africa|europe|asia|northamerica|southamerica|oceania)-artikkelit\.js$/,
];

export const onNatiivinModuuli = (polku) => NATIIVIN_MODUULIT.some((r) => r.test(polku));

const sha = (s) => createHash('sha256').update(s).digest('hex');
const vaihdaMajor = (teksti) => teksti
  .replaceAll('matkakirja-vienti/1/', 'matkakirja-vienti/2/')
  .replaceAll('https://matkakirja.app/vienti/1/', 'https://matkakirja.app/vienti/2/');
const ENGLANTI = ['name', 'symbol', 'value', 'color'];

function ilmanEnglantia(tyypit) {
  if (!tyypit || typeof tyypit !== 'object') return tyypit;
  return Object.fromEntries(Object.entries(tyypit).map(([k, t]) => [k,
    t && typeof t === 'object' ? Object.fromEntries(Object.entries(t).filter(([a]) => !ENGLANTI.includes(a))) : t]));
}

/** 1.x-tiedostot (Map polku → teksti) → 2.0-tiedostot. */
export function johdaMajor2(tiedostot) {
  const ulos = new Map();
  const manifest = JSON.parse(tiedostot.get('manifest.json'));
  const pois = new Set(manifest.moduulit.filter((m) => !onNatiivinModuuli(m.moduuli)).map((m) => m.tiedosto));
  for (const [polku, teksti] of tiedostot) {
    if (polku === 'manifest.json' || pois.has(polku)) continue;
    let uusi = teksti;
    if (polku.startsWith('kokoelmat/')) {
      const k = JSON.parse(teksti);
      k.alkiot = k.alkiot.map(({ data, ...a }) => a);
      if (k.nimi === 'laatat') {
        for (const a of k.alkiot) {
          a.tyypit = ilmanEnglantia(a.tyypit);
          if (a.mannerTyypit) a.mannerTyypit = Object.fromEntries(Object.entries(a.mannerTyypit).map(([m, t]) => [m, ilmanEnglantia(t)]));
        }
      }
      uusi = `${JSON.stringify(k)}\n`;
    } else if (polku === manifest.media?.tiedosto) {
      const m = JSON.parse(teksti);
      m.viitteet = m.viitteet.map(({ esiintymat, ...v }) => v);
      uusi = `${JSON.stringify(m)}\n`;
    }
    ulos.set(polku, vaihdaMajor(uusi));
  }
  const paivita = (e) => (e && typeof e === 'object' && ulos.has(e.tiedosto)
    ? { ...e, sha256: sha(ulos.get(e.tiedosto)), tavuja: Buffer.byteLength(ulos.get(e.tiedosto)) } : e);
  const uusiManifest = {};
  for (const [avain, arvo] of Object.entries(manifest)) {
    if (avain === 'moduulit') {
      uusiManifest.moduulit = arvo.filter((m) => !pois.has(m.tiedosto)).map((m) => ({ ...paivita(m), natiivi: true }));
    } else if (avain === 'webNakymat') {
      continue; // WKWebView-kuori ei kuulu natiiviin (Raamattu: ei web-kuorta).
    } else if (Array.isArray(arvo)) {
      uusiManifest[avain] = arvo.map(paivita);
    } else {
      uusiManifest[avain] = paivita(arvo);
    }
  }
  uusiManifest.skeemaversio = SKEEMAVERSIO_2;
  for (const w of manifest.webNakymat ?? []) ulos.delete(w.tiedosto);
  ulos.set('manifest.json', `${vaihdaMajor(JSON.stringify(uusiManifest))}\n`);
  return ulos;
}

function lueKansio(kansio) {
  const t = new Map();
  const kay = (d) => {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) kay(p);
      else t.set(relative(kansio, p).split('\\').join('/'), readFileSync(p, 'utf8'));
    }
  };
  kay(kansio);
  return t;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { JUURI, kirjoita } = await import('./vie-sisalto.mjs');
  const arg = (n, o) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : o; };
  const sisaan = lueKansio(resolve(arg('--vienti', join(JUURI, 'dist/vienti'))));
  const ulos = johdaMajor2(sisaan);
  kirjoita(ulos, resolve(arg('--ulos', join(JUURI, 'dist/vienti2'))));
  const koko = (m) => [...m.values()].reduce((s, t) => s + Buffer.byteLength(t), 0) / 1e6;
  console.log(`2.0: ${ulos.size} tiedostoa, ${koko(ulos).toFixed(1)} Mt (1.x: ${sisaan.size} tiedostoa, ${koko(sisaan).toFixed(1)} Mt)`);
}
