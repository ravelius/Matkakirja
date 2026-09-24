#!/usr/bin/env node
/*
 * KUVIEN MITAT (Siirtoseppä 23.9.2026, Natiivi-UI:n toive): leveys ja
 * korkeus pikseleinä jokaiselle pelin omalle kuvaviitteelle, jotta natiivi
 * voi mitoittaa kortit ennen latausta.
 *
 *   node tools/vienti/kuvamitat.mjs --paivita [--rinnakkain 16]
 *
 * Mittaa media.json:n ensisijaisen url:n tiedoston otsakkeesta: repon
 * assets/-tiedosto luetaan levyltä, muut haetaan Range-pyynnöllä (64 kt,
 * JPEG tarvittaessa 512 kt). Ulkoiset lähde- ja viitekuvat (kuva-url) ja
 * linkit ohitetaan kuten tools/vienti/tarkista-media.mjs:ssä. Tulos
 * kuvamitat.json: { arvo: [leveys, korkeus] }; vienti lukee vain sen.
 */
import { existsSync, openSync, readSync, closeSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAMA = dirname(fileURLToPath(import.meta.url));
const JUURI = resolve(TAMA, '../..');
export const MITTATIEDOSTO = join(TAMA, 'kuvamitat.json');
const KUVA = /\.(jpe?g|png|webp|gif|svg)(\?|$)/i;
export const MITATTAVAT_LAJIT = new Set(['kuva-commons', 'lippu-commons', 'kuva-flickr', 'kohtaamiskuva', 'juliste',
  'hetkikuva', 'repo', 'ampari-avain', 'asset-aarteet', 'asset-elaimet', 'asset-ihmeet', 'asset-miniatyyrit',
  'asset-nostot']);

export function lueKuvamitat() {
  return existsSync(MITTATIEDOSTO) ? JSON.parse(readFileSync(MITTATIEDOSTO, 'utf8')).mitat ?? {} : {};
}

/** [leveys, korkeus] kuvan alusta, tai null jos muotoa ei tunnisteta / otsake jäi puskurin ulkopuolelle. */
export function kuvanMitat(b) {
  if (b.length >= 24 && b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b.length >= 10 && b.toString('latin1', 0, 3) === 'GIF') return [b.readUInt16LE(6), b.readUInt16LE(8)];
  if (b.length >= 30 && b.toString('latin1', 0, 4) === 'RIFF' && b.toString('latin1', 8, 12) === 'WEBP') {
    const laji = b.toString('latin1', 12, 16);
    if (laji === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    if (laji === 'VP8L') { const v = b.readUInt32LE(21); return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)]; }
    if (laji === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    return null;
  }
  if (b.length >= 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i += 1; continue; }
      const merkki = b[i + 1];
      if (merkki === 0xd8 || merkki === 0x01 || (merkki >= 0xd0 && merkki <= 0xd7) || merkki === 0xff) { i += merkki === 0xff ? 1 : 2; continue; }
      const pituus = b.readUInt16BE(i + 2);
      if (merkki >= 0xc0 && merkki <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(merkki)) {
        return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
      }
      i += 2 + pituus;
    }
    return null;
  }
  const alku = b.toString('utf8', 0, Math.min(b.length, 4096));
  if (/<svg[\s>]/i.test(alku)) {
    const svg = alku.match(/<svg[^>]*>/i)[0];
    const luku = (n) => { const m = svg.match(new RegExp(`\\s${n}="([\\d.]+)(px)?"`)); return m ? Math.round(Number(m[1])) : null; };
    const vb = svg.match(/viewBox="[\d.\s-]*?([\d.]+)[\s,]+([\d.]+)"/);
    const w = luku('width') ?? (vb ? Math.round(Number(vb[1])) : null);
    const h = luku('height') ?? (vb ? Math.round(Number(vb[2])) : null);
    return w && h ? [w, h] : null;
  }
  return null;
}

function lueAlku(polku, tavuja) {
  const fd = openSync(polku, 'r');
  try { const b = Buffer.alloc(tavuja); const n = readSync(fd, b, 0, tavuja, 0); return b.subarray(0, n); } finally { closeSync(fd); }
}

async function haeAlku(url, tavuja) {
  const v = await fetch(url, { headers: { range: `bytes=0-${tavuja - 1}` } });
  if (!v.ok) throw new Error(`HTTP ${v.status}`);
  return Buffer.from(await v.arrayBuffer());
}

/** Paikallinen repon tiedosto, jos url osoittaa sivuston assets/-polkuun. */
function paikallinen(viite) {
  const polku = viite.avain?.startsWith('assets/') ? viite.avain
    : viite.arvo?.startsWith('assets/') ? viite.arvo : null;
  return polku && existsSync(join(JUURI, polku)) ? join(JUURI, polku) : null;
}

export async function mittaa(viite) {
  const oma = paikallinen(viite);
  if (oma) return kuvanMitat(lueAlku(oma, 1 << 20));
  for (const url of [viite.url, ...(viite.varat ?? [])].filter(Boolean)) {
    try {
      let m = kuvanMitat(await haeAlku(url, 1 << 16));
      if (!m) m = kuvanMitat(await haeAlku(url, 1 << 19));
      if (m) return m;
    } catch { /* seuraava vara */ }
  }
  return null;
}

async function paivita(rinnakkain) {
  const { kokoaVienti } = await import('./vie-sisalto.mjs');
  const { tiedostot } = await kokoaVienti();
  const viitteet = JSON.parse(tiedostot.get('media.json')).viitteet
    .filter((v) => MITATTAVAT_LAJIT.has(v.laji) && v.url && KUVA.test(v.url));
  const mitat = {}; const puuttuu = [];
  let seuraava = 0;
  const tyontekija = async () => {
    while (seuraava < viitteet.length) {
      const v = viitteet[seuraava++];
      const m = await mittaa(v);
      if (m) mitat[v.arvo] = m; else puuttuu.push(v.arvo);
    }
  };
  await Promise.all(Array.from({ length: rinnakkain }, tyontekija));
  const jarjestetty = Object.fromEntries(Object.keys(mitat).sort().map((k) => [k, mitat[k]]));
  writeFileSync(MITTATIEDOSTO, `${JSON.stringify({
    lahde: 'media.json url (otsake), tools/vienti/kuvamitat.mjs', haettu: new Date().toISOString().slice(0, 10),
    mitattu: Object.keys(mitat).length, puuttuu: puuttuu.sort(), mitat: jarjestetty,
  }, null, 0)}\n`);
  return { mitattu: Object.keys(mitat).length, puuttuu: puuttuu.length, yht: viitteet.length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (!process.argv.includes('--paivita')) {
    console.error('käyttö: node tools/vienti/kuvamitat.mjs --paivita [--rinnakkain 16]');
    process.exit(1);
  }
  const i = process.argv.indexOf('--rinnakkain');
  paivita(i > 0 ? Number(process.argv[i + 1]) : 16).then((t) => { console.log(JSON.stringify(t)); process.exit(0); });
}
