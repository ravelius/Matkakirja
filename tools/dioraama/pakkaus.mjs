// Häviötön siirtopakkaus dioraamapaketeille (Linnanrakentaja 5.10.2026). PÄÄTÖS (Päätoimittaja 02.0x): Brotli q11 / lgwin 24,
// koska iOS:n Compression-kehys purkaa sen ilman ulkoista kirjastoa (Natiiviseppä tekee purun). Pakkaus Noden zlibillä
// (viitekirjasto, ei ulkoista komentoa). .astcm-, .glb- ja .json-tiedostojen viereen <polku>.br; alkuperäiset jäävät
// (vanhat TF-versiot toimivat). Merkintä { polku, sha256, tavuja, br: { sha256, tavuja } }: ylätason sha256 ja tavuja =
// PURETTU (välimuistin tarkistus, puskurin koko), br.sha256 ja br.tavuja = ladattava pakattu. br-kenttä vain, jos pakattu on
// vähintään 5 % pienempi. Vaihtoehto PAKKAUS=zst (zstd -19, ikkuna wlog=23) mittauksia varten, kenttä "zst".
//   node tools/dioraama/pakkaus.mjs paketti <dist/dioraama/<rakennus>> [<blender.json>]
//     → pakatut tiedostot paketin omille tiedostoille ja kentät manifest.json:iin; blender/-merkinnöille kentät kopioidaan
//       blender.json:sta (vie-blender.sh tekee niiden pakatut tiedostot).
//   node tools/dioraama/pakkaus.mjs tiedosto <lähde> <ulos>  → tulostaa "sha256 tavuja" tai "ohita" (alle 5 % hyötyä)
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, statSync, existsSync, rmSync } from 'node:fs';
import { brotliCompressSync, constants as Z } from 'node:zlib';
import { join } from 'node:path';

export const PAKATTAVAT = /\.(astcm|glb|json)$/;
export const MUOTO = process.env.PAKKAUS === 'zst' ? 'zst' : 'br';
export const ZSTD_ARGS = ['-19', '--zstd=wlog=23', '-q', '-f'];
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

/** Pakkaa lähteen; palauttaa { sha256, tavuja } tai null (hyöty alle 5 %, pakattu poistetaan). */
export function pakkaa(lahde, ulos) {
  if (MUOTO === 'br') {
    writeFileSync(ulos, brotliCompressSync(readFileSync(lahde), { params: { [Z.BROTLI_PARAM_QUALITY]: 11, [Z.BROTLI_PARAM_LGWIN]: 24,
      [Z.BROTLI_PARAM_SIZE_HINT]: statSync(lahde).size } }));
  } else execFileSync('zstd', [...ZSTD_ARGS, lahde, '-o', ulos]);
  const a = statSync(lahde).size, z = statSync(ulos).size;
  if (z > a * 0.95) { rmSync(ulos); return null; }
  return { sha256: sha(ulos), tavuja: z };
}

function paketti(kansio, blenderJson) {
  const mp = join(kansio, 'manifest.json'); const m = JSON.parse(readFileSync(mp, 'utf8'));
  const bl = blenderJson && existsSync(blenderJson)
    ? Object.fromEntries(JSON.parse(readFileSync(blenderJson, 'utf8')).tiedostot.map((t) => [`blender/${t.polku}`, t[MUOTO]])) : {};
  let n = 0, ennen = 0, jalkeen = 0;
  for (const t of m.tiedostot) {
    if (!PAKATTAVAT.test(t.polku) || t.polku === 'manifest.json') continue;
    let z = null;
    if (t.polku.startsWith('blender/')) z = bl[t.polku] || null;
    else if (existsSync(join(kansio, t.polku))) z = pakkaa(join(kansio, t.polku), join(kansio, t.polku) + '.' + MUOTO);
    if (z) { t[MUOTO] = z; n++; ennen += t.tavuja || 0; jalkeen += z.tavuja; } else delete t[MUOTO];
  }
  writeFileSync(mp, JSON.stringify(m, null, 2) + '\n');
  console.log(`${MUOTO}: ${n} tiedostoa, ${(ennen / 1048576).toFixed(1)} → ${(jalkeen / 1048576).toFixed(1)} Mt`);
}

const [tila, a, b] = process.argv.slice(2);
if (tila === 'paketti') paketti(a, b);
else if (tila === 'tiedosto') { const z = pakkaa(a, b); console.log(z ? `${z.sha256} ${z.tavuja}` : 'ohita'); }
