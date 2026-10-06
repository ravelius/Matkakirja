#!/usr/bin/env node
/*
 * Omistajan kuuntelukooste (Päätoimittaja 7.10.2026): kaupungeittain yksi mp3 kierrosjärjestyksessä (pysähdys +
 * kierrosversio), sitten muut kohteet; 1,5 s tauot; sisällysluettelo aikoineen (.txt). Tehdään tasoitetuista PCM-
 * mastereista (tee-esittelyaanet.mjs: <tyo>/master/<sha>-t.wav) ja pakataan mp3:ksi kerran.
 * Käyttö: node tools/opas/koosta-kuuntelu.mjs --tyo <aanet-kansio> --pohjat <kansio> <esittely.json> [...]
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { vuosiluvutSanoiksi } from '../pollo/puhesanat.js';
import { aaniTunniste } from './tee-esittelyaanet.mjs';

const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : null; };
const tiedostot = process.argv.slice(2).filter((x, i, a) => !x.startsWith('--') && !a[i - 1]?.startsWith('--'));
const tyo = arg('tyo'), SR = 44100;
const pcm = (wav) => execFileSync('ffmpeg', ['-v', 'error', '-i', wav, '-f', 's16le', '-ac', '1', '-ar', String(SR), '-'], { maxBuffer: 1 << 30 });
const tauko = Buffer.alloc(Math.round(1.5 * SR) * 2);
const aika = (s) => `${Math.floor(s / 60)}.${String(Math.floor(s % 60)).padStart(2, '0')}`;
for (const f of tiedostot) {
  const e = JSON.parse(readFileSync(f, 'utf8'));
  const pohja = JSON.parse(readFileSync(join(arg('pohjat'), `${e.id}.json`), 'utf8'));
  const jarjestys = [...pohja.kierros, ...e.kohteet.map((k) => k.id).filter((q) => !pohja.kierros.includes(q))];
  const palat = [], rivit = [`${e.kaupunki} — kuuntelukooste (kierros reittijärjestyksessä, sitten muut kohteet)`, ''];
  let t = 0;
  jarjestys.forEach((q, i) => {
    const k = e.kohteet.find((x) => x.id === q);
    if (!k) return;
    const lajit = [['pysähdys', k.puhe_teksti || k.teksti], ...(pohja.kierros.includes(q) && k.lyhyt ? [['kierrosversio', k.puhe_lyhyt || k.lyhyt]] : [])];
    for (const [laji, teksti] of lajit) {
      const data = pcm(join(tyo, 'master', `${aaniTunniste(vuosiluvutSanoiksi(teksti))}-t.wav`));
      rivit.push(`${aika(t).padStart(5)}  ${i < pohja.kierros.length ? `${i + 1}.` : '  -'} ${k.nimi} (${laji})`);
      palat.push(data, tauko); t += data.length / 2 / SR + 1.5;
    }
  });
  mkdirSync(join(tyo, 'kuuntelu'), { recursive: true });
  const ulos = join(tyo, 'kuuntelu', `${e.id}-kooste`);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 's16le', '-ar', String(SR), '-ac', '1', '-i', '-', '-c:a', 'libmp3lame', '-b:a', '192k', `${ulos}.mp3`],
    { input: Buffer.concat(palat), maxBuffer: 1 << 30 });
  writeFileSync(`${ulos}.txt`, rivit.join('\n') + `\n\nKesto ${aika(t)}\n`);
  console.log(`${ulos}.mp3 (${aika(t)})`);
}
