/*
 * three.js r185 + GLTFLoader yhdeksi ES-moduuliksi R2:n vendor/-kansioon (Ajattelijat-linssi, js/linssit/ajattelija.js).
 * Ei osa pelin rakennusta: peli lataa valmiin tiedoston R2:sta vasta linssin avautuessa (ei build-vaihetta).
 *
 *   node tools/vie-three-vendor.mjs <kohdekansio>
 *     → <kohdekansio>/three-gltf-r185.min.js ja three-LICENSE.txt
 * Julkaisija vie tiedostot ämpäriin: vendor/three-gltf-r185.min.js (+ lisenssi). Lisenssi: MIT (three.js authors).
 * Tarvitsee verkon (npm pack three@0.185.0) ja npx esbuild@0.25.10.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, copyFileSync, mkdtempSync, renameSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const VERSIO = '0.185.0';
const kohde = resolve(process.argv[2] ?? '.');
mkdirSync(kohde, { recursive: true });
const tyo = mkdtempSync(join(tmpdir(), 'three-vendor-'));
execFileSync('npm', ['pack', `three@${VERSIO}`, '--silent'], { cwd: tyo, stdio: 'inherit' });
execFileSync('tar', ['xzf', `three-${VERSIO}.tgz`], { cwd: tyo });
mkdirSync(join(tyo, 'node_modules'), { recursive: true });
renameSync(join(tyo, 'package'), join(tyo, 'node_modules', 'three'));
writeFileSync(join(tyo, 'entry.js'),
  "export * from 'three';\nexport { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';\n");
execFileSync('npx', ['--yes', 'esbuild@0.25.10', 'entry.js', '--bundle', '--format=esm', '--minify',
  '--legal-comments=inline', `--outfile=${join(kohde, 'three-gltf-r185.min.js')}`], { cwd: tyo, stdio: 'inherit' });
copyFileSync(join(tyo, 'node_modules', 'three', 'LICENSE'), join(kohde, 'three-LICENSE.txt'));
console.log('valmis:', kohde);
