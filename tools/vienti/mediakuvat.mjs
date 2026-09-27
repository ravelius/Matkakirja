#!/usr/bin/env node
/*
 * MEDIAKUVAT (skeema 1.52, Siirtoseppä 27.9.2026; Fablen päätös: pienennetyt, katto 100 Mt maata kohden).
 *
 *   node tools/vienti/vie-sisalto.mjs            # kirjoittaa dist/mediakuvat-ehdokkaat.json
 *   node tools/vienti/mediakuvat.mjs --paivita [--ulos dist/pienet] [--varmista] [--rinnakkain 16]
 *
 * Mittaa offline.json:n maat.*.mediaKuvat-ehdokkaat maittain järjestyksessä (tools/vienti/offline.mjs MEDIAKUVAT),
 * kunnes maan katto täyttyy: alkuperäisen koko HEAD-pyynnöllä (curl; Cloudflare torjuu Pythonin urllibin), ja kuva,
 * joka on yli kynnyksen, pienennetään Pillowilla (pitkä sivu 1280 px, JPEG 80; läpinäkyvä PNG pysyy PNG:nä) kansioon
 * <ulos>/pieni/<avain ilman päätettä>.<jpg|png>. Tulos tools/vienti/mediakuvat.json:
 *   { tiedostot: { "<ämpärin avain>": [alkuperäiset tavut (0 = puuttuu), pienen tavut | null, "png"?] } }
 * Vienti lukee vain tämän tiedoston (ei verkkoa). Valmiit rivit ohitetaan, joten ajo on turvallinen toistaa.
 *
 * --varmista (CI, .github/workflows/vie-sisalto.yml): jokainen katon sisään mahtuva pieni tarkistetaan julkisesta
 * osoitteesta, ja puuttuva tehdään <ulos>-kansioon, josta työnkulku vie sen ämpäriin (pieni/) ennen pakettia.
 * Siirtoseppä ei kirjoita ämpäriin itse.
 */
import { execFile } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { MEDIAKUVAT, ampariAvain, pieniAvain } from './offline.mjs';

const TAMA = dirname(fileURLToPath(import.meta.url));
const JUURI = resolve(TAMA, '../..');
export const TIEDOSTO = join(TAMA, 'mediakuvat.json');
const OMA = 'https://media.matkakirja.app/';
const KUVA = /\.(jpe?g|png|webp|gif)$/i;
const aja = promisify(execFile);

const PIENENNA_PY = `
import sys, json
from PIL import Image, ImageOps
pitka, laatu = int(sys.argv[1]), int(sys.argv[2])
for rivi in sys.stdin:
    lahde, kohde_ilman = rivi.rstrip('\\n').split('\\t')
    try:
        im = Image.open(lahde); im = ImageOps.exif_transpose(im)
        alfa = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
        im.thumbnail((pitka, pitka), Image.LANCZOS)
        if alfa:
            kohde = kohde_ilman + '.png'; im.save(kohde, 'PNG', optimize=True)
        else:
            kohde = kohde_ilman + '.jpg'; im.convert('RGB').save(kohde, 'JPEG', quality=laatu, optimize=True, progressive=True)
        print(json.dumps({'lahde': lahde, 'kohde': kohde}), flush=True)
    except Exception as e:
        print(json.dumps({'lahde': lahde, 'virhe': str(e)}), flush=True)
`;

export function lue(tiedosto = TIEDOSTO) {
  return existsSync(tiedosto) ? JSON.parse(readFileSync(tiedosto, 'utf8')) : { tiedostot: {} };
}

async function curl(args) {
  try { return (await aja('curl', ['-s', '--retry', '3', '--retry-delay', '2', ...args], { maxBuffer: 1 << 20 })).stdout; } catch { return ''; }
}

/** [http-koodi, content-length] HEAD-pyynnöllä. */
async function paa(url) {
  const out = await curl(['-o', '/dev/null', '-I', '-w', '%{http_code} %header{content-length}', url]);
  const [koodi, pituus] = out.trim().split(' ');
  return [Number(koodi) || 0, Number(pituus) || 0];
}

async function pool(lista, n, f) {
  const tulos = new Array(lista.length); let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, lista.length) }, async () => {
    while (i < lista.length) { const k = i++; tulos[k] = await f(lista[k], k); }
  }));
  return tulos;
}

/** Lataa ja pienentää avaimet; palauttaa avain → [pienen tavut, 'png'?] | null (ei hyötyä tai virhe). */
async function pienenna(avaimet, ulos, rinnakkain) {
  if (!avaimet.length) return new Map();
  const tmp = mkdtempSync(join(tmpdir(), 'mediakuvat-'));
  const ladatut = await pool(avaimet, rinnakkain, async (avain, k) => {
    const polku = join(tmp, `${k}${avain.match(/\.[a-z0-9]+$/i)?.[0] ?? ''}`);
    await curl(['-f', '-o', polku, OMA + encodeURI(avain)]);
    return existsSync(polku) ? polku : null;
  });
  const rivit = [];
  avaimet.forEach((avain, k) => {
    if (!ladatut[k]) return;
    const kohde = join(ulos, pieniAvain(avain).replace(/\.jpg$/, ''));
    mkdirSync(dirname(kohde), { recursive: true });
    rivit.push(`${ladatut[k]}\t${kohde}`);
  });
  const tulos = new Map();
  const { stdout } = await new Promise((ok, ei) => {
    const p = execFile('python3', ['-c', PIENENNA_PY, String(MEDIAKUVAT.pieni.pitkaSivu), String(MEDIAKUVAT.pieni.laatu)],
      { maxBuffer: 1 << 26 }, (e, stdout) => (e ? ei(e) : ok({ stdout })));
    p.stdin.end(`${rivit.join('\n')}\n`);
  });
  const lahteesta = new Map(avaimet.map((a, k) => [ladatut[k], a]));
  for (const rivi of stdout.split('\n').filter(Boolean)) {
    const r = JSON.parse(rivi);
    const avain = lahteesta.get(r.lahde);
    if (!r.kohde) { console.warn(`mediakuvat: ${avain}: ${r.virhe}`); tulos.set(avain, null); continue; }
    const alku = statSync(r.lahde).size; const pieni = statSync(r.kohde).size;
    // Pienennys kannattaa vain, jos se säästää ainakin 10 %.
    if (pieni > alku * 0.9) { rmSync(r.kohde); tulos.set(avain, null); continue; }
    tulos.set(avain, [pieni, ...(r.kohde.endsWith('.png') ? ['png'] : [])]);
  }
  rmSync(tmp, { recursive: true, force: true });
  return tulos;
}

export async function paivita({ ehdokkaat, ulos, varmista = false, rinnakkain = 16, tiedosto = TIEDOSTO }) {
  const data = lue(tiedosto);
  const t = data.tiedostot;
  const { katto, pieni: { kynnysTavut } } = MEDIAKUVAT;
  let mitattu = 0; let pienennetty = 0;
  const koko = (avain) => (t[avain][0] > 0 ? t[avain][1] ?? t[avain][0] : null);
  // 1) Mittaus järjestyksessä, kunnes maan (arvioitu) summa ylittää katon.
  for (const [iso, lista] of Object.entries(ehdokkaat).sort()) {
    let summa = 0; let i = 0;
    while (i < lista.length && summa < katto) {
      const era = [];
      while (i < lista.length && era.length < rinnakkain * 2 && summa < katto) {
        const avain = ampariAvain(lista[i++][0]);
        if (!t[avain]) era.push(avain);
        else if (koko(avain) != null && summa + koko(avain) <= katto) summa += koko(avain);
      }
      if (!era.length) continue;
      const paat = await pool(era, rinnakkain, (avain) => paa(OMA + encodeURI(avain)));
      const pienennettavat = era.filter((a, k) => paat[k][0] === 200 && KUVA.test(a) && paat[k][1] > kynnysTavut);
      const pienet = await pienenna(pienennettavat, ulos, rinnakkain);
      era.forEach((avain, k) => {
        const p = pienet.get(avain);
        t[avain] = [paat[k][0] === 200 ? paat[k][1] : 0, p ? p[0] : null, ...(p?.[1] ? [p[1]] : [])];
        mitattu++; if (p) pienennetty++;
        if (koko(avain) != null && summa + koko(avain) <= katto) summa += koko(avain);
      });
    }
    process.stdout.write(`\r${iso} ${(summa / 1e6).toFixed(1)} Mt, mitattu ${mitattu}, pienennetty ${pienennetty}   `);
  }
  process.stdout.write('\n');
  // 2) Katon sisään valitut samalla säännöllä kuin tools/vienti/offline.mjs (järjestys, yli menevä ohitetaan).
  const katonSisalla = new Set();
  for (const lista of Object.values(ehdokkaat)) {
    let summa = 0;
    for (const [url] of lista) {
      const avain = ampariAvain(url);
      if (!t[avain] || koko(avain) == null || summa + koko(avain) > katto) continue;
      summa += koko(avain); katonSisalla.add(avain);
    }
  }
  let varmistettu = 0; let tehty = 0;
  if (varmista) {
    const pienella = [...katonSisalla].filter((a) => t[a]?.[1] != null).sort();
    const paikalla = (a) => existsSync(join(ulos, pieniAvain(a).replace(/\.jpg$/, `.${t[a][2] ?? 'jpg'}`)));
    const tarkistettavat = pienella.filter((a) => !paikalla(a));
    const paat = await pool(tarkistettavat, rinnakkain * 2,
      (a) => paa(OMA + encodeURI(pieniAvain(a).replace(/\.jpg$/, `.${t[a][2] ?? 'jpg'}`))));
    const puuttuvat = tarkistettavat.filter((_, k) => paat[k][0] !== 200);
    varmistettu = tarkistettavat.length - puuttuvat.length;
    const uudet = await pienenna(puuttuvat, ulos, rinnakkain);
    for (const a of puuttuvat) {
      if (uudet.get(a)) { t[a][1] = uudet.get(a)[0]; tehty++; } else { t[a] = [t[a][0], null]; }
    }
  }
  const jarjestetty = Object.fromEntries(Object.entries(t).sort(([a], [b]) => (a < b ? -1 : 1)));
  writeFileSync(tiedosto, `${JSON.stringify({
    $kuvaus: 'mediaKuvat-koot (skeema 1.52): avain → [alkuperäinen t (0 = puuttuu), pieni t | null, "png"?]. '
      + 'node tools/vienti/mediakuvat.mjs --paivita (tools/vienti/offline.mjs MEDIAKUVAT).',
    tiedostot: jarjestetty,
  }, null, 0).replace(/\],"/g, '],\n"')}\n`);
  console.log(`mediakuvat: ${Object.keys(t).length} riviä, mitattu nyt ${mitattu}, pienennetty ${pienennetty}`
    + (varmista ? `, pienet ämpärissä ${varmistettu}, tehty vietäväksi ${tehty}` : ''));
  return { mitattu, pienennetty, tehty };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arvo = (nimi, oletus) => { const i = process.argv.indexOf(nimi); return i > 0 ? process.argv[i + 1] : oletus; };
  if (!process.argv.includes('--paivita')) {
    console.error('käyttö: node tools/vienti/mediakuvat.mjs --paivita [--ulos dist/pienet] [--varmista] [--rinnakkain 16]');
    process.exit(2);
  }
  const ehdokkaat = JSON.parse(readFileSync(resolve(arvo('--ehdokkaat', join(JUURI, 'dist/mediakuvat-ehdokkaat.json'))), 'utf8'));
  await paivita({ ehdokkaat, ulos: resolve(arvo('--ulos', join(JUURI, 'dist/pienet'))),
    varmista: process.argv.includes('--varmista'), rinnakkain: Number(arvo('--rinnakkain', 16)) });
}
