#!/usr/bin/env node
/**
 * tools/viimeistele-musiikki.mjs — Lyria-raaka → pelin musiikkitiedosto
 * (musiikki- ja äänisuunnitelma 26.9.2026, vaihe 1 ja siitä eteenpäin).
 *
 * Lyria palauttaa raidan aina pidempänä kuin pyydettiin (saapumistunnus
 * 10 s → 100 s) ja noin −10 LUFS:n tasolla. Suunnitelman päätös on, että
 * musiikkitiedostot ovat −33 LUFS:ssä, ja kestot ovat suunnitelman
 * raitalistan mukaiset. Tämä työkalu tekee molemmat samalla kertaa:
 *
 *   1. leikkaa raakaversiosta (musa-<nimi>-lyria.mp3) kohdan alku–loppu,
 *   2. häivyttää alun (lyhyt, vain naksahduksen esto) ja lopun
 *      (fraasin pehmeä loppu),
 *   3. mittaa leikatun integroidun äänekkyyden (EBU R128) ja säätää sen
 *      lineaarisella vahvistuksella −33 LUFS:iin. Ei loudnorm-kompressiota:
 *      raidan oma dynamiikka säilyy.
 *   4. tarkistaa tuloksen (±0,5 LU) ja kirjoittaa musa-<nimi>.mp3.
 *
 * LEIKKAUSKOHDAT valittiin RMS-kuopista (0,25 s ikkunat): leikkaus osuu
 * fraasin taukoon, ei kesken sävelen. Raaka jää ämpäriin ennalleen, joten
 * uusi leikkaus on yhden rivin muutos tässä taulussa.
 *
 * Käyttö:
 *   node tools/viimeistele-musiikki.mjs [nimi ...] [--vie]
 *     --vie  lähettää valmiit ämpäriin (aws s3 cp; AMPARI ja PAATE sekä
 *            AWS-avaimet Macin ympäristöstä, arvoja ei tulosteta).
 * Raaka haetaan osoitteesta https://media.matkakirja.app/audio/, ellei
 * sitä ole jo kansiossa assets/audio/ (ei repossa, .gitignore).
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const TAVOITE_LUFS = -33;
const SIETO_LU = 0.5;
const MEDIA = 'https://media.matkakirja.app/audio/';
const KANSIO = 'assets/audio';

// Sekunteina raakaversion aikajanalla.
const RAIDAT = {
  // Etusivu, täysi johtoaihe (suunnitelma 1.1). Raaka 63,4 s, alussa 1,07 s
  // ja lopussa 2,7 s hiljaisuutta.
  johtoaihe: { alku: 0.95, loppu: 61.4, sisaan: 0.05, ulos: 1.2 },
  // Lontoosta kohteeseen, one-shot ~25 s, päättyy laskuun. Kuoppa 23,25 s,
  // hiljenevä jakso 25,5–27,5 s.
  aloituslento: { alku: 0, loppu: 26.0, sisaan: 0.05, ulos: 3.0 },
  // Saapumistunnus 8–10 s: johtoaiheen kysymys (1,0–5,25 s, tauko 5,25 s)
  // ja vastaus, loppu kuoppaan 10,25 s.
  'saapuminen-valimeri': { alku: 0.9, loppu: 10.3, sisaan: 0.05, ulos: 1.8 },
  // Matkan loppu 60–90 s: raaka kelpaa sellaisenaan, vain hiljaisuudet pois.
  loppu: { alku: 1.1, loppu: 70.2, sisaan: 0.05, ulos: 1.5 },
};

function ffmpeg(argit) {
  return execFileSync('ffmpeg', ['-hide_banner', '-nostats', ...argit], {
    encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 << 20,
  });
}

// ebur128 kirjoittaa yhteenvedon stderriin.
function mittaa(tiedosto, suodin = '') {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', tiedosto,
    '-af', `${suodin}${suodin ? ',' : ''}ebur128=peak=true`, '-f', 'null', '-'],
  { encoding: 'utf8', maxBuffer: 64 << 20 });
  if (r.status !== 0) throw new Error(`ffmpeg-mittaus ${tiedosto}: ${r.stderr.slice(-400)}`);
  return r.stderr;
}

function lueLufs(teksti) {
  const i = [...teksti.matchAll(/^\s+I:\s+(-?[\d.]+) LUFS/gm)].pop();
  const p = [...teksti.matchAll(/^\s+Peak:\s+(-?[\d.]+|-inf) dBFS/gm)].pop();
  return { lufs: Number(i?.[1]), huippu: Number(p?.[1]) };
}

function kesto(tiedosto) {
  return Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries',
    'format=duration', '-of', 'csv=p=0', tiedosto], { encoding: 'utf8' }));
}

async function raaka(nimi) {
  const polku = join(KANSIO, `musa-${nimi}-lyria.mp3`);
  if (existsSync(polku)) return polku;
  mkdirSync(KANSIO, { recursive: true });
  const vastaus = await fetch(MEDIA + `musa-${nimi}-lyria.mp3`);
  if (!vastaus.ok) throw new Error(`${nimi}: raaka HTTP ${vastaus.status}`);
  writeFileSync(polku, Buffer.from(await vastaus.arrayBuffer()));
  return polku;
}

async function viimeistele(nimi) {
  const r = RAIDAT[nimi];
  if (!r) throw new Error(`tuntematon raita ${nimi} (${Object.keys(RAIDAT).join(', ')})`);
  const lahde = await raaka(nimi);
  const pituus = r.loppu - r.alku;
  const leikkaus = `atrim=${r.alku}:${r.loppu},asetpts=PTS-STARTPTS,`
    + `afade=t=in:d=${r.sisaan},afade=t=out:st=${(pituus - r.ulos).toFixed(3)}:d=${r.ulos}`;
  const ennen = lueLufs(mittaa(lahde, leikkaus));
  const vahvistus = TAVOITE_LUFS - ennen.lufs;
  const kohde = join(KANSIO, `musa-${nimi}.mp3`);
  ffmpeg(['-y', '-i', lahde, '-af', `${leikkaus},volume=${vahvistus.toFixed(2)}dB`,
    '-c:a', 'libmp3lame', '-b:a', '192k', '-ar', '44100', kohde]);
  const jalkeen = lueLufs(mittaa(kohde));
  if (Math.abs(jalkeen.lufs - TAVOITE_LUFS) > SIETO_LU) {
    throw new Error(`${nimi}: ${jalkeen.lufs} LUFS, tavoite ${TAVOITE_LUFS}`);
  }
  console.log(`${kohde}  ${kesto(kohde).toFixed(1)} s  ${jalkeen.lufs} LUFS  huippu ${jalkeen.huippu} dBFS  (raaka ${ennen.lufs} LUFS, ${vahvistus.toFixed(1)} dB)`);
  return kohde;
}

function vie(tiedosto) {
  const { AMPARI, PAATE } = process.env;
  if (!AMPARI || !PAATE) throw new Error('AMPARI/PAATE puuttuu ympäristöstä (source ~/.zshrc)');
  execFileSync('aws', ['s3', 'cp', tiedosto, `s3://${AMPARI}/audio/`, '--endpoint-url', PAATE,
    '--content-type', 'audio/mpeg', '--cache-control', 'public, max-age=2592000'],
  { stdio: ['ignore', 'ignore', 'inherit'] });
  console.log(`  → ${MEDIA}${tiedosto.split('/').pop()}`);
}

const argit = process.argv.slice(2);
const viedaan = argit.includes('--vie');
const nimet = argit.filter((a) => !a.startsWith('--'));
for (const nimi of nimet.length ? nimet : Object.keys(RAIDAT)) {
  const valmis = await viimeistele(nimi);
  if (viedaan) vie(valmis);
}
