/*
 * Ajattelijat-linssin ääniraita kahtena raitana (Päätoimittaja 2.10.2026: intron musiikki vaihdettavissa ilman uutta
 * ajoitusta; Strauss on suojattu Espanjassa 2029 loppuun, Sisältökirjuri 7.6). Resepti: Linnanrakentajan
 * tools/linssit/blender/sokrates_aani.sh (v7), jaettuna:
 *   <ulos>/kierros1-paa.mp3    Satie + luennat a (20,0 s) ja b (32,0 s), 48,333 s — kierroksen KELLO (js/linssit/ajattelija.js)
 *   <ulos>/kierros1-intro.mp3  intron musiikki 0–21 s (leikkaukset osuvat iskuihin: --intro-osat alku:loppu,alku:loppu)
 *
 *   node tools/ajattelija-aaniraita.mjs --lahteet /Users/Shared/Claude/proto-3d/_lahteet/sokrates --ulos <kansio>
 *     [--intro musiikki/zarathustra-sascha-ende.mp3] [--intro-osat 13.0:22.517,60.50:82.0]
 * Ääni ei kuulu repoon; Julkaisija vie tiedostot ämpäriin (ajattelijat/sokrates/v1/).
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const A = process.argv.slice(2);
const arvo = (lippu, oletus) => (A.includes(lippu) ? A[A.indexOf(lippu) + 1] : oletus);
const LAHTEET = resolve(arvo('--lahteet', '/Users/Shared/Claude/proto-3d/_lahteet/sokrates'));
const ULOS = resolve(arvo('--ulos', '.'));
const INTRO = join(LAHTEET, arvo('--intro', 'musiikki/zarathustra-sascha-ende.mp3'));
const OSAT = arvo('--intro-osat', '13.0:22.517,60.50:82.0').split(',').map((o) => o.split(':').map(Number));
mkdirSync(ULOS, { recursive: true });
const ff = (...args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });

// Pääraita: Satie nousee 18 s alkaen 3 s:ssa, luennat a 20 s ja b 32 s; loppuhäivytys 46,3 s.
ff('-i', join(LAHTEET, 'musiikki/gymnopedie1-alciatore.ogg'), '-i', join(LAHTEET, 'luennat/a-otto1.mp3'),
  '-i', join(LAHTEET, 'luennat/b-otto1.mp3'), '-filter_complex',
  '[0]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:31,asetpts=PTS-STARTPTS,afade=t=in:d=3,adelay=18000|18000,volume=0.85[s];'
  + '[1]aformat=sample_rates=48000:channel_layouts=stereo,adelay=20000|20000[va];'
  + '[2]aformat=sample_rates=48000:channel_layouts=stereo,adelay=32000|32000[vb];'
  + 'anullsrc=r=48000:cl=stereo,atrim=0:48.333[hiljaa];'
  + '[hiljaa][s][va][vb]amix=inputs=4:normalize=0:duration=longest,atrim=0:48.333,afade=t=out:st=46.3:d=2,alimiter=limit=0.95[out]',
  '-map', '[out]', '-c:a', 'libmp3lame', '-b:a', '160k', join(ULOS, 'kierros1-paa.mp3'));

// Intro: osat ristihäivytettyinä (0,15 s), häivytys 18–21 s, voimakkuus 0,75.
const osat = OSAT.map(([a, l], i) => `[0]aformat=sample_rates=48000:channel_layouts=stereo,atrim=${a}:${l},asetpts=PTS-STARTPTS[o${i}];`).join('');
let ketju = '[o0]';
for (let i = 1; i < OSAT.length; i += 1) ketju = `${ketju}[o${i}]acrossfade=d=0.15:c1=tri:c2=tri[x${i}];[x${i}]`;
ff('-i', INTRO, '-filter_complex',
  `${osat}${ketju}atrim=0:21,afade=t=out:st=18.0:d=3.0,volume=0.75[out]`,
  '-map', '[out]', '-c:a', 'libmp3lame', '-b:a', '160k', join(ULOS, 'kierros1-intro.mp3'));
console.log('valmis:', ULOS);
