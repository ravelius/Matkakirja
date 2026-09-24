#!/usr/bin/env node
/*
 * ÄMPÄRITARKISTUS (Fable 24.9.2026): ennen osoittimen vaihtoa jokainen
 * paketin tiedosto on luettavissa julkisesta osoitteesta. Tausta:
 * Natiivi-UI sai ämpärin v11:stä 404:iä. Syy ei ollut osittainen lataus
 * (v11:n manifestin 491 tiedostoa vastasivat 200), vaan natiivi pyysi
 * tiedostoja, jotka tulivat vasta uudemmissa skeemoissa (ui-tekstit 1.12,
 * fokustehtavat 1.17). Tarkistus pitää silti huolen, ettei osoitin koskaan
 * osoita vajaaseen pakettiin.
 *
 *   node tools/vienti/amparitarkistus.mjs --url <julkinen>/sisalto/1/v<N>/ [--kansio dist/sisalto/v<N>]
 *
 * --kansio: jokainen paikallinen tiedosto (HEAD, koko sama kuin paikallisesti)
 * ja jokainen manifestin polku on kansiossa. Ilman --kansiota: manifest.json
 * haetaan osoitteesta ja sen polut tarkistetaan (olemassa olevan paketin tarkistus).
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Manifestin kaikki tiedostopolut (kokoelmat, moduulit, lisätiedostot, skeemat, web, media, offline, lisenssit). */
export function manifestinPolut(manifest) {
  const polut = new Set(['manifest.json']);
  const lisaa = (x) => { if (x && typeof x === 'object' && typeof x.tiedosto === 'string') polut.add(x.tiedosto); };
  for (const arvo of Object.values(manifest)) {
    if (Array.isArray(arvo)) arvo.forEach(lisaa);
    else lisaa(arvo);
  }
  return [...polut].sort();
}

async function head(url, yrityksia = 3) {
  for (let i = 0; ; i += 1) {
    try {
      const v = await fetch(url, { method: 'HEAD', headers: { 'accept-encoding': 'identity' } }); // pakkaamaton koko
      if (v.ok || i + 1 >= yrityksia || v.status < 500) return { tila: v.status, koko: Number(v.headers.get('content-length') ?? NaN) };
    } catch (e) {
      if (i + 1 >= yrityksia) return { tila: `verkko: ${e.cause?.code ?? e.message}`, koko: NaN };
    }
    await new Promise((r) => { setTimeout(r, 1000 * (i + 1)); });
  }
}

/** [{ polku, koko? }] → virhelista. */
export async function tarkistaAmpari(juuri, tiedostot, { rinnakkain = 16, hae = head } = {}) {
  const virheet = [];
  const jono = [...tiedostot];
  const tyolainen = async () => {
    for (let t = jono.shift(); t; t = jono.shift()) {
      const { tila, koko } = await hae(juuri + t.polku.split('/').map(encodeURIComponent).join('/'));
      if (tila !== 200) virheet.push(`${t.polku}: ${tila}`);
      else if (t.koko !== undefined && Number.isFinite(koko) && koko !== t.koko) virheet.push(`${t.polku}: koko ${koko} ≠ ${t.koko}`);
    }
  };
  await Promise.all(Array.from({ length: rinnakkain }, tyolainen));
  return virheet.sort();
}

function paikalliset(kansio) {
  const ulos = [];
  const kay = (d) => {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) kay(p);
      else ulos.push({ polku: relative(kansio, p).split('\\').join('/'), koko: statSync(p).size });
    }
  };
  kay(kansio);
  return ulos;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : undefined; };
  const url = arg('--url');
  if (!url) { console.error('käyttö: node tools/vienti/amparitarkistus.mjs --url <…/sisalto/1/vN/> [--kansio dist/sisalto/vN]'); process.exit(2); }
  const juuri = url.endsWith('/') ? url : `${url}/`;
  const kansio = arg('--kansio');
  let tiedostot; const virheet = [];
  if (kansio) {
    tiedostot = paikalliset(resolve(kansio));
    const loytyy = new Set(tiedostot.map((t) => t.polku));
    const manifest = JSON.parse(readFileSync(join(kansio, 'manifest.json'), 'utf8'));
    for (const p of manifestinPolut(manifest)) if (!loytyy.has(p) || !existsSync(join(kansio, p))) virheet.push(`${p}: manifestissa, ei paketissa`);
  } else {
    const manifest = await (await fetch(`${juuri}manifest.json`)).json();
    tiedostot = manifestinPolut(manifest).map((polku) => ({ polku }));
  }
  virheet.push(...await tarkistaAmpari(juuri, tiedostot));
  if (virheet.length) {
    console.error(`Ämpäritarkistus: ${virheet.length} virhettä (${tiedostot.length} tiedostoa):`);
    for (const v of virheet.slice(0, 50)) console.error(`  ${v}`);
    process.exit(1);
  }
  console.log(`Ämpäritarkistus: ${tiedostot.length}/${tiedostot.length} tiedostoa luettavissa (${juuri})`);
}
