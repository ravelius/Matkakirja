/*
 * Ajattelijat-linssin ääniraita kahtena raitana (js/linssit/ajattelija.js): puheraita on kierroksen KELLO, musiikki
 * soi sen rinnalla samasta nollakohdasta. Resepti: Linnanrakentajan tools/linssit/blender/sokrates_aani.sh (v7),
 * päivitettynä omistajan v9-palautteella (2.10.2026 klo 10.3x, Päätoimittajan kautta):
 *   - intron Zarathustra jatkuu koko kohtauksen ajan (Satie pois); levytyksen loputtua loppusoinnun urkupohja
 *     jatkuu silmukkana (alipäästetty silmukka loppusoinnun tasaisesta kohdasta)
 *   - musiikki vaimenee (ducking) projisoitujen tekstien ja luentojen ajaksi
 * Omistaja valitsi 2.10.2026 "Zarathustra kaikille" (Sascha Ende, CC BY 4.0; ei maarajausta).
 *
 *   <ulos>/kierros1-puhe.mp3      luennat a (20,0 s) ja b (32,0 s), 48,333 s — kello
 *   <ulos>/kierros1-musiikki.mp3  Zarathustra 0–48,333 s (leikkaukset iskuihin, silmukka, ducking)
 *
 *   node tools/ajattelija-aaniraita.mjs [--lahteet /Users/Shared/Claude/proto-3d/_lahteet/sokrates] --ulos <kansio>
 * Ääni ei kuulu repoon; Julkaisija vie tiedostot ämpäriin (ajattelijat/sokrates/v1/).
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const A = process.argv.slice(2);
const arvo = (lippu, oletus) => (A.includes(lippu) ? A[A.indexOf(lippu) + 1] : oletus);
const LAHTEET = resolve(arvo('--lahteet', '/Users/Shared/Claude/proto-3d/_lahteet/sokrates'));
const ULOS = resolve(arvo('--ulos', '.'));
const KESTO = 48.333;
// Leikkaukset (s, levytyksessä): trumpetit 13,0–22,517 → loppusointu 60,5–80,0 (levytys hiljenee 80 s:n jälkeen).
const OSAT = [[13.0, 22.517], [60.5, 80.0]];
const SILMUKKA = [72.0, 78.0];      // loppusoinnun tasainen kohta (RMS −12…−13 dB), urkupohja alipäästettynä
const URKU_HZ = 220;
// Vaimennus (s, kierroksen ajassa): 38a ja lähderivi 17,5–31,7 sekä luennat a 20–23,6 ja b 32–47,5 → yhtenäinen
// ikkuna 17,5 s → loppu; nimi ja kysymys (9,4–15,4 s) saavat loppusoinnun täytenä. Taso −12 dB, ramppi 1,2 s.
const VAIMENNUS = { alku: 17.5, taso: 0.25, ramppi: 1.2 };
mkdirSync(ULOS, { recursive: true });
const ff = (...args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });

// Puheraita: luennat a 20 s ja b 32 s hiljaisen pohjan päällä.
ff('-i', join(LAHTEET, 'luennat/a-otto1.mp3'), '-i', join(LAHTEET, 'luennat/b-otto1.mp3'), '-filter_complex',
  `anullsrc=r=48000:cl=stereo,atrim=0:${KESTO}[hiljaa];`
  + '[0]aformat=sample_rates=48000:channel_layouts=stereo,adelay=20000|20000[va];'
  + '[1]aformat=sample_rates=48000:channel_layouts=stereo,adelay=32000|32000[vb];'
  + `[hiljaa][va][vb]amix=inputs=3:normalize=0:duration=first,atrim=0:${KESTO},alimiter=limit=0.95[out]`,
  '-map', '[out]', '-c:a', 'libmp3lame', '-b:a', '160k', join(ULOS, 'kierros1-puhe.mp3'));

// Musiikki: osat ristihäivytettyinä, sitten urkupohjan silmukka (6 kopiota ristihäivytettyinä) loppuun asti.
const [s0, s1] = SILMUKKA;
const { alku: va, taso, ramppi } = VAIMENNUS;
const vaimennus = `volume='if(lt(t,${va}),1,max(${taso},1-(1-${taso})*(t-${va})/${ramppi}))':eval=frame`;
ff('-i', join(LAHTEET, 'musiikki/zarathustra-sascha-ende.mp3'), '-filter_complex',
  '[0]aformat=sample_rates=48000:channel_layouts=stereo,asplit=8[a][b][u1][u2][u3][u4][u5][u6];'
  + `[a]atrim=${OSAT[0][0]}:${OSAT[0][1]},asetpts=PTS-STARTPTS[o0];`
  + `[b]atrim=${OSAT[1][0]}:${OSAT[1][1]},asetpts=PTS-STARTPTS[o1];`
  + [1, 2, 3, 4, 5, 6].map((i) => `[u${i}]atrim=${s0}:${s1},asetpts=PTS-STARTPTS,lowpass=f=${URKU_HZ},lowpass=f=${URKU_HZ}[s${i}];`).join('')
  + '[o0][o1]acrossfade=d=0.15:c1=tri:c2=tri[x1];'
  + '[x1][s1]acrossfade=d=2.5:c1=tri:c2=tri[x2];[x2][s2]acrossfade=d=2:c1=qsin:c2=qsin[x3];'
  + '[x3][s3]acrossfade=d=2:c1=qsin:c2=qsin[x4];[x4][s4]acrossfade=d=2:c1=qsin:c2=qsin[x5];'
  + '[x5][s5]acrossfade=d=2:c1=qsin:c2=qsin[x6];[x6][s6]acrossfade=d=2:c1=qsin:c2=qsin[x7];'
  + `[x7]atrim=0:${KESTO},${vaimennus},volume=0.75,afade=t=out:st=${KESTO - 2.5}:d=2.5,alimiter=limit=0.95[out]`,
  '-map', '[out]', '-c:a', 'libmp3lame', '-b:a', '160k', join(ULOS, 'kierros1-musiikki.mp3'));
console.log('valmis:', ULOS);
