#!/usr/bin/env node
/*
 * Olavinlinnan äänimaisema CC0/PD-lähteistä (Linnanrakentaja 30.9.2026, Päätoimittajan erä; suunnitelma ja lähteet:
 * docs/raportit/linna-aanet-suunnitelma-20260930.md). Kytkentä peliin vasta omistajan OK:n jälkeen.
 *
 * Lähteet (ladattu, EI repoon): /Users/Shared/Claude/proto-3d/_lahteet/aanet-linna/{freesound,commons}/.
 * Ulos: <ulos>/dioraama/olavinlinna/aanet/<id>.mp3 + aanet.json (sama muoto kuin keittiön toimitus) + kestot.json.
 * mp3:t EIVÄT tule repoon (VARTIO): Julkaisija vie ämpäriin dioraama/olavinlinna/aanet/v<versio>/.
 *
 * Tasoitus kuten keittiön toimituksessa 29.9.: silmukat −23 LUFS (yksi lineaarinen vahvistus mittauksesta + limitteri),
 * kerta-äänet huippu −6 dBFS mitattuna valmiista mp3:sta, laulu −23 LUFS. Silmukan sauma: loppu ristihäivytetään alkuun
 * (equal-power, SAUMA s). Koodaus mono mp3 64 kbit/s (laulu stereo 96 kbit/s).
 *
 * Ajo: node tools/dioraama/linna-aanet.mjs [ulos] [--vain id,id]
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const L = '/Users/Shared/Claude/proto-3d/_lahteet/aanet-linna';
const FS = (id) => join(L, 'freesound', `${id}.mp3`);
const CM = (n) => join(L, 'commons', n);
const ULOS = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2]
  : '/Users/Shared/Claude/proto-3d/_valmiit/linna-aanet/v1';
const VAIN = process.argv.includes('--vain') ? process.argv[process.argv.indexOf('--vain') + 1].split(',') : null;
const SAUMA = 1.5;

// Kaiku ja etäisyys (ffmpeg-suotimet). KIVI = pitkä kivitilan kaiku, ETAALLA = alipäästö + kaiku.
const KIVI = 'aecho=0.8:0.6:47|89|137|211|293:0.42|0.33|0.26|0.2|0.14';
const HOLVI = 'aecho=0.8:0.7:61|113|181|263|347|449:0.45|0.38|0.31|0.25|0.2|0.15';
const SUMEA = 'lowpass=f=900,highpass=f=100';   // puhe sorinaksi: alle 1 kHz vain vokaalien sointi, konsonantit (ja sanat) katoavat

// id: laji, lähteet [{ tiedosto, alku, gain (dB), suodin }], kesto, jälkisuodin. alku 'auto' = voimakkain ikkuna.
export const AANET = {
  // --- silmukat ---
  'keskushalli-ambienssi': { laji: 'silmukka', kesto: 26, lahteet: [
    { t: FS(451600), alku: 60, suodin: `${SUMEA},${HOLVI}` }] },   // 393689 pois: tekijän mukaan puhe osin erottuvaa
  // 766540 pois 30.9.: koostettu kahdesta muusta näytteestä, joiden lisenssejä ei tarkistettu
  'takka-ratina': { laji: 'silmukka', kesto: 21, lahteet: [{ t: FS(414298), alku: 25 }] },
  'soihtu-ratina': { laji: 'silmukka', kesto: 22, lahteet: [{ t: FS(414298), alku: 8,
    suodin: 'highpass=f=250,acompressor=threshold=-32dB:ratio=6:attack=1:release=60,acompressor=threshold=-24dB:ratio=8:attack=0.5:release=40' }] },
  'kynttila-ratina': { laji: 'silmukka', kesto: 24, lahteet: [{ t: FS(813328), alku: 4, suodin: 'highpass=f=400' }] },
  'kappeli-ambienssi': { laji: 'silmukka', kesto: 28, lahteet: [{ t: FS(157375), alku: 30, suodin: 'highpass=f=60' }] },
  'vartiotupa-ambienssi': { laji: 'silmukka', kesto: 26, lahteet: [
    { t: FS(770108), alku: 2, suodin: KIVI }] },   // 675177 pois: puhetta ja digitoitu elokuva-arkisto
  'fatabuuri-ambienssi': { laji: 'silmukka', kesto: 28, lahteet: [
    { t: FS(427862), alku: 20, suodin: 'highpass=f=60' },
    { t: FS(628404), alku: 30, gain: -10, suodin: HOLVI }] },
  'porras-kaiku': { laji: 'silmukka', kesto: 26, lahteet: [{ t: FS(557380), alku: 15, suodin: 'lowpass=f=3500' }] },
  'muuri-tuuli': { laji: 'silmukka', kesto: 28, lahteet: [{ t: FS(708747), alku: 40 }] },
  'laituri-laineet': { laji: 'silmukka', kesto: 26, lahteet: [
    { t: FS(573171), alku: 30 },
    { t: FS(145721), alku: 10, gain: -12 }] },
  // --- laulu (PD, Membeth, Commons): kolme kerrosta hienoisesti eri tahdissa ja vireessä → pieni schola, kaukaa ---
  'laulu-kaukaa': { laji: 'laulu', kesto: 40, lahteet: [
    { t: CM('Ecce.lignum.Crucis.ogg'), alku: 0, suodin: `lowpass=f=2600,${HOLVI}` },
    { t: CM('Ecce.lignum.Crucis.ogg'), alku: 0, gain: -4, suodin: `asetrate=44298,aresample=44100,adelay=38|38,lowpass=f=2400,${HOLVI}` },
    { t: CM('Ecce.lignum.Crucis.ogg'), alku: 0, gain: -5, suodin: `asetrate=43924,aresample=44100,adelay=71|71,lowpass=f=2200,${HOLVI}` }],
  jalki: 'afade=t=in:d=2,afade=t=out:st=36:d=4' },
  // --- kerta-äänet ---
  'kello-kappeli': { laji: 'kerta', kesto: 9, lahteet: [{ t: FS(144496), alku: 0, suodin: KIVI }], jalki: 'afade=t=out:st=7:d=2' },
  'askel-porras-1': { laji: 'kerta', kesto: 3, lahteet: [{ t: FS(616615), alku: 'auto' }] },
  'askel-porras-2': { laji: 'kerta', kesto: 3, lahteet: [{ t: FS(811375), alku: 'auto' }] },
  'tippa': { laji: 'kerta', kesto: 2.5, lahteet: [{ t: FS(478547), alku: 'auto' }] },
  'noppa-1': { laji: 'kerta', kesto: 2.2, lahteet: [{ t: FS(235489), alku: 'auto' }] },
  'noppa-2': { laji: 'kerta', kesto: 2.2, lahteet: [{ t: FS(764367), alku: 'auto' }] },
  'airot': { laji: 'kerta', kesto: 5, lahteet: [{ t: FS(525030), alku: 'auto' }] },   // 438846 pois: digitoitu elokuva-arkisto
  'koysi-narina': { laji: 'kerta', kesto: 3.5, lahteet: [{ t: FS(145721), alku: 'auto' }] },
  'pikari-1': { laji: 'kerta', kesto: 1.6, lahteet: [{ t: FS(528898), alku: 'auto', suodin: KIVI }] },
  'pikari-2': { laji: 'kerta', kesto: 1.6, lahteet: [{ t: FS(528898), alku: 'auto1', suodin: KIVI }] },
  'penkki': { laji: 'kerta', kesto: 2.2, lahteet: [{ t: FS(637357), alku: 'auto', suodin: KIVI }] },
  'sivu-kaanto': { laji: 'kerta', kesto: 1.2, lahteet: [{ t: FS(119127), alku: 0 }] },
  'keihas-kolahdus': { laji: 'kerta', kesto: 1.8, lahteet: [{ t: FS(774269), alku: 0, suodin: KIVI }] },
  'arkku-kansi': { laji: 'kerta', kesto: 2.0, lahteet: [{ t: FS(573653), alku: 0, suodin: 'lowpass=f=5000' }] },
  'soihtu-syttyy': { laji: 'kerta', kesto: 3.0, lahteet: [{ t: FS(479338), alku: 0 }], jalki: 'afade=t=out:st=2:d=1' },
};

const aja = (args) => execFileSync('ffmpeg', ['-hide_banner', '-nostats', '-y', ...args], { stdio: ['ignore', 'pipe', 'pipe'] });
const kesto = (f) => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString());

function voimakkain(tiedosto, pituus, nro = 0) {
  // Mono 8 kHz float → liukuva RMS; nro:s voimakkain ikkuna, joka ei mene päällekkäin aiempien kanssa
  // (0,3 s esivara, ettei transientti leikkaudu). 'auto' = nro 0, 'auto1' = toiseksi voimakkain jne.
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', tiedosto, '-ac', '1', '-ar', '8000', '-f', 'f32le', '-'],
    { maxBuffer: 1 << 30 });
  const x = new Float32Array(raw.buffer, raw.byteOffset, raw.length / 4);
  const n = Math.round(pituus * 8000);
  const e = [];
  let s = 0;
  for (let i = 0; i < x.length; i++) {
    s += x[i] * x[i];
    if (i >= n) s -= x[i - n] * x[i - n];
    if (i >= n - 1 && (i - n + 1) % 400 === 0) e.push([s, i - n + 1]);
  }
  e.sort((a, b) => b[0] - a[0]);
  const valitut = [];
  for (const [, k] of e) {
    if (valitut.every((v) => Math.abs(v - k) >= n)) valitut.push(k);
    if (valitut.length > nro) break;
  }
  return Math.max(0, (valitut[nro] ?? valitut[0]) / 8000 - 0.3);
}

function mittaus(f) {
  const r = execFileSync('bash', ['-c', `ffmpeg -hide_banner -nostats -i "${f}" -af loudnorm=print_format=json -f null - 2>&1 | sed -n '/{/,/}/p'`]).toString();
  const j = JSON.parse(r);
  const p = execFileSync('bash', ['-c', `ffmpeg -hide_banner -nostats -i "${f}" -af astats=measure_overall=Peak_level:measure_perchannel=none -f null - 2>&1 | grep -m1 "Peak level dB" | awk '{print $NF}'`]).toString();
  return { lufs: Number(j.input_i), huippu: Number(p) };
}

mkdirSync(join(ULOS, 'dioraama/olavinlinna/aanet'), { recursive: true });
// --vain päivittää vain valitut: aiemmat rivit säilyvät aanet.json:ssa.
const aiempi = join(ULOS, 'aanet.json');
const tulos = VAIN && existsSync(aiempi) ? JSON.parse(readFileSync(aiempi, 'utf8')).aanet : {};
for (const [id, a] of Object.entries(AANET)) {
  if (VAIN && !VAIN.includes(id)) continue;
  const silmukka = a.laji === 'silmukka';
  const pituus = a.kesto + (silmukka ? SAUMA : 0);
  const args = [];
  const osat = [];
  a.lahteet.forEach((l, i) => {
    const alku = String(l.alku).startsWith('auto') ? voimakkain(l.t, a.kesto, Number(String(l.alku).slice(4) || 0)) : l.alku;
    if (l.silmukoi) args.push('-stream_loop', '-1');
    args.push('-ss', String(alku), '-i', l.t);
    osat.push(`[${i}:a]aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo,atrim=0:${pituus},asetpts=PTS-STARTPTS`
      + `${l.suodin ? ',' + l.suodin : ''},atrim=0:${pituus},volume=${l.gain ?? 0}dB[s${i}]`);
  });
  const n = a.lahteet.length;
  let fc = osat.join(';') + ';' + a.lahteet.map((_, i) => `[s${i}]`).join('')
    + (n > 1 ? `amix=inputs=${n}:normalize=0:duration=longest` : 'anull') + '[m]';
  if (silmukka) {
    fc += `;[m]asplit=3[a][b][c];[a]atrim=0:${SAUMA},asetpts=PTS-STARTPTS,afade=t=in:d=${SAUMA}:curve=qsin[h];`
      + `[b]atrim=${a.kesto}:${pituus},asetpts=PTS-STARTPTS,afade=t=out:d=${SAUMA}:curve=qsin[t];`
      + `[h][t]amix=inputs=2:normalize=0[hx];[c]atrim=${SAUMA}:${a.kesto},asetpts=PTS-STARTPTS[r];[hx][r]concat=n=2:v=0:a=1[o]`;
  } else {
    fc += `;[m]afade=t=in:d=0.01,afade=t=out:st=${a.kesto - 0.12}:d=0.12${a.jalki ? ',' + a.jalki : ''}[o]`;
  }
  const kanavat = a.laji === 'laulu' ? 2 : 1;
  const raaka = join(ULOS, `_${id}.wav`);
  aja([...args, '-filter_complex', fc, '-map', '[o]', '-ac', String(kanavat), '-ar', '44100', raaka]);
  const m = mittaus(raaka);
  const ulos = join(ULOS, 'dioraama/olavinlinna/aanet', `${id}.mp3`);
  const koodaa = (g) => aja(['-i', raaka, '-af', `volume=${g.toFixed(2)}dB,alimiter=limit=0.89:level=false`, '-ac', String(kanavat),
    '-c:a', 'libmp3lame', '-b:a', kanavat === 2 ? '96k' : '64k', ulos]);
  let g = a.laji === 'kerta' ? -6 - m.huippu : -23 - m.lufs;
  koodaa(g);
  let v = mittaus(ulos);
  // Huippuraja valmiista mp3:sta (koodaus voi nostaa transientteja): kerta −6 dBFS, silmukat ja laulu −1 dBFS.
  const raja = a.laji === 'kerta' ? -6 : -1;
  for (let k = 0; k < 3 && v.huippu > raja; k++) { g -= v.huippu - raja + 0.15; koodaa(g); v = mittaus(ulos); }
  execFileSync('rm', ['-f', raaka]);
  tulos[id] = { laji: a.laji, kesto_s: Number(kesto(ulos).toFixed(2)), LUFS_lopullinen: Number(v.lufs.toFixed(2)),
    peak_dBFS: Number(v.huippu.toFixed(2)), vahvistus_dB: Number(g.toFixed(2)) };
  console.log(id.padEnd(22), tulos[id].kesto_s, 's', tulos[id].LUFS_lopullinen, 'LUFS', tulos[id].peak_dBFS, 'dBFS');
}
writeFileSync(join(ULOS, 'aanet.json'), JSON.stringify({
  kuvaus: 'Olavinlinnan äänimaisema CC0/PD-lähteistä (Linnanrakentaja 30.9.2026). Lähteet ja lisenssit: docs/raportit/linna-aanet-suunnitelma-20260930.md.',
  aanet: tulos }, null, 2) + '\n');
writeFileSync(join(ULOS, 'kestot.json'), JSON.stringify(Object.fromEntries(Object.entries(tulos).map(([k, v]) => [k, v.kesto_s])), null, 2) + '\n');

// --- Keittiön 29.9. toimitus (31 kpl, mp3 192 kbit/s) → mono 64 kbit/s samaan kansioon (pankissa versio 2). ---
const KEITTIO = '/Users/Shared/Claude/proto-3d/lokit/linna-keittio-aanet/dioraama/olavinlinna/aanet';
if (process.argv.includes('--keittio')) {
  for (const f of execFileSync('ls', [KEITTIO]).toString().trim().split('\n')) {
    aja(['-i', join(KEITTIO, f), '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '64k', join(ULOS, 'dioraama/olavinlinna/aanet', f)]);
  }
  console.log('keittiö uudelleenkoodattu');
}

// --- Kuuntelukoosteet omistajalle: 30 s per tila suunnitelman kohdan 2 kertoimilla (silmukat + kerta-äänet). ---
const KOOSTEET = {
  saapuminen: [[['jarvi-laineet', 0.7], ['linna-tuuli', 0.5]], [['lokit', 4], ['soihtu-syttyy', 6], ['kellot-kaukaa', 9], ['lokit', 11], ['soihtu-syttyy', 13]]],
  yleisnakyma: [[['linna-tuuli', 0.45], ['jarvi-laineet', 0.35], ['soihtu-ratina', 0.15], ['keskushalli-ambienssi', 0.08]], [['lokit', 6], ['laulu-kaukaa', 12]]],
  kappeli: [[['kappeli-ambienssi', 0.6], ['kynttila-ratina', 0.3]], [['laulu-kaukaa', 3], ['askel-kivi', 20], ['kello-kappeli', 24]]],
  keskushalli: [[['keskushalli-ambienssi', 0.7], ['takka-ratina', 0.6]], [['pikari-1', 3], ['noppa-1', 8], ['penkki', 13], ['pikari-2', 18], ['ovi-puu', 23], ['noppa-2', 26]]],
  vartiotupa: [[['vartiotupa-ambienssi', 0.7]], [['noppa-1', 4], ['keihas-kolahdus', 12], ['noppa-2', 19]]],
  fatabuuri: [[['fatabuuri-ambienssi', 0.6]], [['tippa', 3], ['sivu-kaanto', 8], ['tippa', 13], ['arkku-kansi', 18], ['askel-kivi', 24], ['tippa', 27]]],
  kierreportaat: [[['porras-kaiku', 0.6], ['linna-tuuli', 0.3], ['soihtu-ratina', 0.3]], [['askel-porras-1', 2], ['askel-porras-2', 9], ['askel-porras-1', 16], ['askel-porras-2', 23]]],
  muurinharja: [[['muuri-tuuli', 0.8], ['soihtu-ratina', 0.45], ['jarvi-laineet', 0.25]], [['askel-kivi', 5], ['lokit', 12], ['askel-kivi', 20]]],
  laituri: [[['laituri-laineet', 0.8], ['linna-tuuli', 0.4]], [['koysi-narina', 4], ['airot', 10], ['lokit', 17], ['koysi-narina', 24]]],
};
const KERTA_K = 0.5;
if (process.argv.includes('--koosteet')) {
  const A = join(ULOS, 'dioraama/olavinlinna/aanet');
  mkdirSync(join(ULOS, 'kuuntelu'), { recursive: true });
  for (const [tila, [silmukat, kerrat]] of Object.entries(KOOSTEET)) {
    const args = [];
    const f = [];
    silmukat.forEach(([id, k], i) => { args.push('-stream_loop', '-1', '-i', join(A, `${id}.mp3`)); f.push(`[${i}:a]atrim=0:30,volume=${k}[s${i}]`); });
    kerrat.forEach(([id, t], j) => {
      const i = silmukat.length + j;
      args.push('-i', join(A, `${id}.mp3`));
      f.push(`[${i}:a]adelay=${t * 1000}|${t * 1000},volume=${KERTA_K}[s${i}]`);
    });
    const n = silmukat.length + kerrat.length;
    const fc = `${f.join(';')};${[...Array(n).keys()].map((i) => `[s${i}]`).join('')}amix=inputs=${n}:normalize=0:duration=first,`
      + 'afade=t=in:d=1.5,afade=t=out:st=27.5:d=2.5[o]';
    aja([...args, '-filter_complex', fc, '-map', '[o]', '-t', '30', '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '96k',
      join(ULOS, 'kuuntelu', `${tila}.mp3`)]);
  }
  console.log('koosteet:', Object.keys(KOOSTEET).join(', '));
}
