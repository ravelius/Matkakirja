/*
 * KARTTAPALLON PINNOITE — juliste Millerista tasaväliseksi.
 *
 *   node tools/tee-pallotekstuuri.mjs [--kuiva] [--taso 4] [--ulos polku.jpg]
 *
 * Pallo (js/pallo.js, Globe.gl) tarvitsee pinnoitteeksi tasavälisen
 * (equirectangular) kuvan: leveys 360°, korkeus 180°, pohjoisnapa
 * ylhäällä. Pelin juliste on Miller-projektiossa (laattapyramidi,
 * js/laattapyramidi.js), joten tämä työkalu noutaa yhden tason laatat
 * (pohja + viivataso), kokoaa ne arkiksi ja laskee jokaiselle
 * pinnoitteen pikselille vastaavan arkin pikselin. Julisteen
 * ulkopuolelle jäävät kaistat (yli 76° N, Etelämanner) täytetään
 * paperinsävyllä — pelin lauta ei ulotu sinne, eikä pallolla ole
 * siellä mitään napautettavaa.
 *
 * Versio, arkin sijainti ja tasot luetaan ämpärin luettelosta
 * (pyramidi.json), joten työkalua ei tarvitse muuttaa, kun pyramidi
 * poltetaan uudestaan: tulos viedään polkuun
 * julisteet/pallo/<pyramidin versio>/tekstuuri.jpg (workflow
 * tee-pallotekstuuri), ja js/pallo.js osoittaa versioon
 * PALLO_TEKSTUURIVERSIO.
 *
 * Kuvankäsittely on sharp-kirjastolla (webp-purku, jpeg-pakkaus);
 * workflow asentaa sen ajoon (`npm install --no-save sharp`), repossa
 * sitä ei ole.
 */

import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const TAMA = fileURLToPath(import.meta.url);
if (process.argv[1] === TAMA && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

export const JULKINEN_JUURI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/';
const LUETTELO = `${JULKINEN_JUURI}julisteet/pyramidi/pyramidi.json`;
/**
 * Pinnoitteen mitat tasosta: 2:1, leveys 2048 × 2^(z−2) — z3 = 4096,
 * z4 = 8192 (omistaja 4.9.2026: "Tee z4 ainoaksi"; 8192 × 4096 JPEG on
 * noin 3–4 Mt ja mahtuu puhelintenkin GPU-rajaan 8192 px).
 */
export const pinnoitteenMitat = (z) => ({ leveys: 2048 * 2 ** (z - 2), korkeus: 1024 * 2 ** (z - 2), laatu: 82 });
/** Oletusmitat z3:lle (vanhat kutsujat ja testi). */
export const PINNOITE = pinnoitteenMitat(3);
/** Napojen paperinsävy (pohjoinen hieman vaaleampi kuin etelä). */
const PAPERI = { pohjoinen: [210, 197, 164], etela: [205, 192, 160] };
const RAD = Math.PI / 180;

/** Millerin y asteista (sama kaava kuin js/fokusmitat.js). */
export const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));

/**
 * Pinnoitteen pikselin (lon, lat) → arkin pikseli (px, py) valitulla
 * tasolla, tai null julisteen ulkopuolella. Puhdas funktio testiä varten.
 */
export function arkinPikseli(luettelo, taso, lon, lat) {
  const p = luettelo.projektio;
  const sk = p.leveys / (2 * Math.PI);
  const yP = millerY(p.pohjoinen);
  const laudanY = (millerY(lat) - yP) * sk;
  const { rajaus, arkki } = luettelo;
  if (!(laudanY >= rajaus.y && laudanY < rajaus.y + rajaus.h)) return null;
  let d = (lon - p.lon0) * RAD;
  d = ((d % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const px = d * sk * taso.pikseliaPerYksikko;
  const py = (laudanY - arkki.y) * taso.pikseliaPerYksikko;
  if (py < 0 || py >= taso.korkeus - 1) return null;
  return { px, py };
}

/** Ämpärin avain, johon pinnoite viedään: taso on nimessä, jotta selaimen välimuisti ei sekoita tasoja. */
export const pinnoitteenAvain = (versio, z = 3) => `julisteet/pallo/${versio}/tekstuuri-z${z}.jpg`;

async function noudaJson(url) {
  const v = await fetch(url, { cache: 'no-store' });
  if (!v.ok) throw new Error(`${url}: HTTP ${v.status}`);
  return v.json();
}

async function noudaLaatta(url) {
  const v = await fetch(url);
  if (v.status === 404) return null;
  if (!v.ok) throw new Error(`${url}: HTTP ${v.status}`);
  return Buffer.from(await v.arrayBuffer());
}

async function paa() {
  const argv = process.argv.slice(2);
  const lippu = (nimi) => { const i = argv.indexOf(nimi); return i >= 0 ? argv[i + 1] : null; };
  const kuiva = argv.includes('--kuiva');
  const z = Number(lippu('--taso') ?? 3);
  const ulos = lippu('--ulos') ?? 'pallotekstuuri-ulos/tekstuuri.jpg';

  const luettelo = await noudaJson(LUETTELO);
  const taso = luettelo.tasot.find((t) => t.z === z);
  if (!taso) throw new Error(`tasoa z${z} ei ole luettelossa`);
  const viivaversio = luettelo.viivataso?.versio ?? null;
  const avain = pinnoitteenAvain(luettelo.versio, z);
  console.log(`pyramidi ${luettelo.versio}, viivat ${viivaversio ?? '-'}, taso z${z} `
    + `${taso.leveys}x${taso.korkeus} (${taso.sarakkeita}x${taso.riveja} laattaa) → ${avain}`);
  if (kuiva) { console.log('Kuiva ajo: ei nouda laattoja eikä kirjoita.'); return; }

  const sharp = (await import('sharp')).default;
  const L = luettelo.laatta ?? 512;
  const W = taso.leveys; const H = taso.korkeus;
  const arkki = Buffer.alloc(W * H * 4);
  let meri = null;
  for (let tx = 0; tx < taso.sarakkeita; tx += 1) {
    for (let ty = 0; ty < taso.riveja; ty += 1) {
      const kerrokset = [`${luettelo.versio}/z${z}/${tx}/${ty}.webp`];
      if (viivaversio) kerrokset.push(`${viivaversio}/viivat/z${z}/${tx}/${ty}.webp`);
      for (const [k, polku] of kerrokset.entries()) {
        const tavut = await noudaLaatta(`${JULKINEN_JUURI}julisteet/pyramidi/${polku}`);
        if (!tavut) continue;
        const { data, info } = await sharp(tavut).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        for (let y = 0; y < info.height; y += 1) {
          for (let x = 0; x < info.width; x += 1) {
            const X = tx * L + x; const Y = ty * L + y;
            if (X >= W || Y >= H) continue;
            const s = (y * info.width + x) * 4; const d = (Y * W + X) * 4;
            const a = data[s + 3] / 255;
            if (k === 0) {
              arkki[d] = data[s]; arkki[d + 1] = data[s + 1]; arkki[d + 2] = data[s + 2]; arkki[d + 3] = 255;
              // Merisävy talteen avomereltä (umpimeren laatat puuttuvat ämpäristä).
              if (!meri && a === 1 && tx === 0 && ty === taso.riveja - 1 && x === 8 && y === 8) meri = [data[s], data[s + 1], data[s + 2]];
            } else if (a > 0) {
              for (let c = 0; c < 3; c += 1) arkki[d + c] = Math.round(arkki[d + c] * (1 - a) + data[s + c] * a);
            }
          }
        }
      }
    }
  }
  meri ??= [237, 223, 198];
  for (let i = 0; i < W * H; i += 1) {
    if (arkki[i * 4 + 3] === 0) { arkki[i * 4] = meri[0]; arkki[i * 4 + 1] = meri[1]; arkki[i * 4 + 2] = meri[2]; arkki[i * 4 + 3] = 255; }
  }

  const { leveys: OW, korkeus: OH, laatu } = pinnoitteenMitat(z);
  const out = Buffer.alloc(OW * OH * 3);
  for (let oy = 0; oy < OH; oy += 1) {
    const lat = 90 - 180 * (oy + 0.5) / OH;
    const paperi = lat > 0 ? PAPERI.pohjoinen : PAPERI.etela;
    for (let ox = 0; ox < OW; ox += 1) {
      const lon = -180 + 360 * (ox + 0.5) / OW;
      const o = (oy * OW + ox) * 3;
      const a = arkinPikseli(luettelo, taso, lon, lat);
      if (!a) { out[o] = paperi[0]; out[o + 1] = paperi[1]; out[o + 2] = paperi[2]; continue; }
      // Bilineaarinen näyte arkista; x kiertää sauman yli.
      const x0 = Math.floor(a.px) % W; const y0 = Math.floor(a.py);
      const fx = a.px - Math.floor(a.px); const fy = a.py - y0;
      const x1 = (x0 + 1) % W; const y1 = Math.min(H - 1, y0 + 1);
      for (let c = 0; c < 3; c += 1) {
        const p00 = arkki[(y0 * W + x0) * 4 + c]; const p10 = arkki[(y0 * W + x1) * 4 + c];
        const p01 = arkki[(y1 * W + x0) * 4 + c]; const p11 = arkki[(y1 * W + x1) * 4 + c];
        out[o + c] = Math.round((p00 * (1 - fx) + p10 * fx) * (1 - fy) + (p01 * (1 - fx) + p11 * fx) * fy);
      }
    }
  }
  const jpg = await sharp(out, { raw: { width: OW, height: OH, channels: 3 } }).jpeg({ quality: laatu }).toBuffer();
  const { mkdirSync } = await import('node:fs');
  const { dirname } = await import('node:path');
  mkdirSync(dirname(ulos), { recursive: true });
  writeFileSync(ulos, jpg);
  console.log(`kirjoitettu ${ulos} (${OW}x${OH}, ${Math.round(jpg.length / 1024)} kt); ämpärin avain: ${avain}`);
  // Workflow lukee avaimen tästä tiedostosta.
  writeFileSync(`${dirname(ulos)}/avain.txt`, `${avain}\n`);
}

if (process.argv[1] === TAMA) {
  paa().catch((e) => { console.error(e.message ?? e); process.exit(1); });
}
