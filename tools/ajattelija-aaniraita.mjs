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
 * KIERROKSET 2–3 (--kierrokset; Blender v9/v10, sokrates_aani.sh --v9): luennat c 51,667 s, d 62,667 s, e 80,0 s ja
 * f 88,833 s lisätään, kesto 111,0 s (3330 ruutua). Tiedostot kierrokset-puhe.mp3 ja kierrokset-musiikki.mp3, jotta
 * kierroksen 1 v1-tiedostot jäävät ämpäriin ennalleen.
 *
 * V12 (--v12, vain Sokrates; omistaja 3.10.2026 klo 04.5x): musiikki alkaa levytyksen alusta 0,0 s heti prologin jälkeen ja
 * soi leikkaamattomana loppuun (levytys hiljenee ~84–86 s); ei otteita, hyppyjä eikä urkusilmukkaa, ja raita jatkuu
 * hiljaisuutena kohtauksen loppuun. Vaimennus säilyy. Ajat tulevat Linnanrakentajan Blender v12 -luvuista:
 *   --kesto <s> --luennat a:<s>,b:<s>,c:<s>,… [--vaimennus <alku s>]  → v12-puhe.mp3, v12-musiikki.mp3
 * YHTENÄINEN KERTOMUS (Päätoimittaja 3.10.2026: elämä ja lainaukset vuorottelevat ilman taukoja): luentojen a–f sijaan
 *   --puhe <tiedosto> --puhe-alku <s>  (puhe yhtenä raitana; musiikki vaimennettuna puheen koko keston, ramppi 2 s)
 * OMA MUSIIKKI (Linssiseppä säveltää rinnalle toisen version samalla ajoituksella):
 *   --musiikki <tiedosto>  (polku tai lähdekansion suhteen; v12:ssa soi alusta loppuun, pituus luetaan tiedostosta)
 *   --vaimennus-db <dB>    vaimennuksen taso (oletus −13 dB)
 * Ilman --kestoa kesto = puheen loppu + 3 s.
 * ÄÄNIEFEKTIT (omistaja 3.10.2026 klo 05.3x: diaprojektorin naksahdus kaiun syttyessä, hallin ovi, savimalja, kytkin pois):
 *   --efektit <json>  [[tiedosto, aika s, taso dB], …]; miksataan PUHERAITAAN (kohtauksen kello), joten ne ovat samassa
 *   tahdissa ilman erillisiä Audio-olioita, eivät vaimene puheen alla eivätkä muutu, kun musiikki vaihdetaan.
 *
 *   node tools/ajattelija-aaniraita.mjs --ajattelija sokrates|marcus --ulos <kansio> [--lahteet <kansio>] [--kierrokset]
 * Ääni ei kuulu repoon; Julkaisija vie tiedostot ämpäriin (ajattelijat/sokrates/v1/).
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const A = process.argv.slice(2);
const arvo = (lippu, oletus) => (A.includes(lippu) ? A[A.indexOf(lippu) + 1] : oletus);
const AJATTELIJA = arvo('--ajattelija', 'sokrates');
/*
 * AJATTELIJAKOHTAISET RESEPTIT (Linnanrakentajan mallit): osat (s levytyksessä, ristihäivytys 0,15 s), valinnainen
 * urkupohjan silmukka, luennat (s kierroksen ajassa). Vaimennus ja loppu ovat yhteiset (v10).
 */
const RESEPTIT = {
  sokrates: {
    lahteet: '/Users/Shared/Claude/proto-3d/_lahteet/sokrates',
    musiikki: 'musiikki/zarathustra-sascha-ende.mp3',   // Sascha Ende, CC BY 4.0
    v12: { osat: 'koko' },                              // koko levytys alusta loppuun (Zarathustra 91,27 s), ei silmukkaa
    osat: [[13.0, 22.517], [60.5, 80.0]],               // trumpetit → loppusointu (levytys hiljenee 80 s:n jälkeen)
    silmukka: [66.0, 80.0],                             // urkupohja (sokrates_aani_v10.py)
    luennat: [['luennat/a-otto1.mp3', 20.0], ['luennat/b-otto1.mp3', 32.0]],
    kierrokset: {
      kesto: 111.0,
      luennat: [['luennat/c-otto1.mp3', 51.667], ['luennat/d-otto1.mp3', 62.667], ['luennat/e-otto1.mp3', 80.0],
        ['luennat/f-otto1.mp3', 88.833]],
    },
  },
  marcus: {
    lahteet: '/Users/Shared/Claude/proto-3d/_lahteet/marcus-aurelius',
    musiikki: 'musiikki/eroica-marcia-funebre-musopen.ogg',   // Beethoven, Eroica II, Czech National SO / Musopen, CC0
    osat: [[75.48, 75.48 + 48.333]],                    // yhtenäinen; forte 84,88 s osuu ruutuun 282 (9,4 s)
    silmukka: null,
    luennat: [['luennat/a-otto1.mp3', 20.0], ['luennat/b-otto1.mp3', 32.0]],
    // Kierrokset 2–3 (marcus-tekstit.json kierrokset_2_3, luennat_s_kohtauksessa): sama levytys jatkuu yhtenäisenä 111 s.
    kierrokset: {
      kesto: 111.0,
      osat: [[75.48, 75.48 + 111.0]],
      luennat: [['luennat/c-otto1.mp3', 51.667], ['luennat/d-otto1.mp3', 62.667], ['luennat/e-otto1.mp3', 80.0],
        ['luennat/f-otto1.mp3', 88.833]],
    },
  },
};
const R = RESEPTIT[AJATTELIJA];
if (!R) throw new Error(`tuntematon ajattelija ${AJATTELIJA}`);
const LAHTEET = resolve(arvo('--lahteet', R.lahteet));
const ULOS = resolve(arvo('--ulos', '.'));
const V12 = A.includes('--v12');
if (V12 && !R.v12) throw new Error(`${AJATTELIJA}: ei v12-reseptiä`);
const kestoS = (f) => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString());
const MUSIIKKI = A.includes('--musiikki') ? resolve(LAHTEET, arvo('--musiikki')) : join(LAHTEET, R.musiikki);
const PUHE = A.includes('--puhe') ? resolve(arvo('--puhe')) : null;
const PUHE_ALKU = Number(arvo('--puhe-alku', 0));
const PUHE_LOPPU = PUHE ? PUHE_ALKU + kestoS(PUHE) : null;
if (V12 && !PUHE && !(A.includes('--kesto') && A.includes('--luennat'))) {
  throw new Error('--v12 vaatii --puhe ja --puhe-alku tai --kesto ja --luennat (Blender v12 -luvut)');
}
const KIERROKSET = A.includes('--kierrokset');
if (KIERROKSET && !R.kierrokset) throw new Error(`${AJATTELIJA}: ei kierrosten 2–3 reseptiä`);
const KESTO = A.includes('--kesto') ? Number(arvo('--kesto'))
  : PUHE ? Math.ceil((PUHE_LOPPU + 3) * 30) / 30 : KIERROKSET ? R.kierrokset.kesto : 48.333;
const LUENNAT = PUHE ? [[PUHE, PUHE_ALKU]] : V12
  ? arvo('--luennat').split(',').map((pari) => { const [k, t] = pari.split(':'); return [`luennat/${k}-otto1.mp3`, Number(t)]; })
  : KIERROKSET ? [...R.luennat, ...R.kierrokset.luennat] : R.luennat;
const EFEKTIT = A.includes('--efektit')
  ? JSON.parse(readFileSync(resolve(arvo('--efektit')), 'utf8')).map(([f, t, db]) => [resolve(LAHTEET, f), Number(t), Number(db ?? 0)])
  : [];
const ETULIITE = V12 ? 'v12' : KIERROKSET ? 'kierrokset' : 'kierros1';
const OSAT = (V12 && [[0, kestoS(MUSIIKKI)]]) || (KIERROKSET && R.kierrokset.osat) || R.osat;
const SILMUKKA = V12 ? null : R.silmukka;
const SILMUKAN_HAIVYTYS = 3;
// Vaimennus (s, kierroksen ajassa): päälause ja lähderivi 17,5–31,7 sekä luennat → yhtenäinen ikkuna 17,5 s → loppu;
// nimi ja kysymys (9,4–15,4 s) saavat musiikin täytenä. v10: ×0,22 (−13 dB), ramppi 2 s, viimeiset 2,7 s ×0,7.
// --vaimennus-db (esim. −8, Päätoimittaja 3.10.2026 omalle musiikille); oletus ×0,22 ≈ −13 dB kuten v10.
const VAIMENNUS = {
  alku: Number(arvo('--vaimennus', 17.5)),
  taso: A.includes('--vaimennus-db') ? Number((10 ** (Number(arvo('--vaimennus-db')) / 20)).toFixed(4)) : 0.22,
  ramppi: 2,
};
const LOPPU = { kesto: 2.7, taso: 0.7 };
// Yhtenäinen puhe: vaimennus puheen ajaksi (täysi taso puheen alkaessa, palautus puheen loputtua).
mkdirSync(ULOS, { recursive: true });
const ff = (...args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });

// Puheraita: luennat (ja efektit omilla tasoillaan) hiljaisen pohjan päällä.
const PUHEOSAT = [...LUENNAT.map(([f, t]) => [resolve(LAHTEET, f), t, 0]), ...EFEKTIT];
ff(...PUHEOSAT.flatMap(([f]) => ['-i', f]), '-filter_complex',
  `anullsrc=r=48000:cl=stereo,atrim=0:${KESTO}[hiljaa];`
  + PUHEOSAT.map(([, s, db], i) => `[${i}]aformat=sample_rates=48000:channel_layouts=stereo,`
    + `${db ? `volume=${db}dB,` : ''}adelay=${Math.round(s * 1000)}|${Math.round(s * 1000)}[v${i}];`).join('')
  + `[hiljaa]${PUHEOSAT.map((_, i) => `[v${i}]`).join('')}amix=inputs=${PUHEOSAT.length + 1}:normalize=0:duration=first,atrim=0:${KESTO},alimiter=limit=0.95[out]`,
  '-map', '[out]', '-c:a', 'libmp3lame', '-b:a', '160k', join(ULOS, `${ETULIITE}-puhe.mp3`));

// Musiikki: osat ristihäivytettyinä, sitten (valinnainen) urkupohjan silmukka ristihäivytettyinä, kunnes kesto täyttyy.
const pituus = OSAT.reduce((s, [a, l]) => s + l - a, 0) - 0.15 * (OSAT.length - 1);
const kopioita = SILMUKKA && pituus < KESTO
  ? Math.ceil((KESTO - pituus + SILMUKAN_HAIVYTYS) / (SILMUKKA[1] - SILMUKKA[0] - SILMUKAN_HAIVYTYS)) + 1 : 0;
const { alku: va, taso, ramppi } = VAIMENNUS;
const vaimennus = PUHE
  ? `'max(${taso},1-(1-${taso})*min(1,max(0,min((t-${(PUHE_ALKU - ramppi).toFixed(3)})/${ramppi},(${(PUHE_LOPPU + ramppi).toFixed(3)}-t)/${ramppi}))))`
    + `*if(gt(t,${(KESTO - LOPPU.kesto).toFixed(3)}),${LOPPU.taso},1)':eval=frame`
  : `'if(lt(t,${va}),1,max(${taso},1-(1-${taso})*(t-${va})/${ramppi}))`
    + `*if(gt(t,${(KESTO - LOPPU.kesto).toFixed(3)}),${LOPPU.taso},1)':eval=frame`;
const kopiot = Array.from({ length: kopioita }, (_, i) => i + 1);
const osaNimet = OSAT.map((_, i) => `o${i}`);
let ketju = osaNimet.length > 1 ? `[o0][o1]acrossfade=d=0.15:c1=tri:c2=tri[y1];` : '[o0]anull[y1];';
for (let i = 2; i < osaNimet.length; i += 1) ketju += `[y${i - 1}][o${i}]acrossfade=d=0.15:c1=tri:c2=tri[y${i}];`;
let viimeinen = `y${Math.max(1, osaNimet.length - 1)}`;
for (const i of kopiot) { ketju += `[${viimeinen}][s${i}]acrossfade=d=${SILMUKAN_HAIVYTYS}:c1=qsin:c2=qsin[x${i}];`; viimeinen = `x${i}`; }
ff('-i', MUSIIKKI, '-filter_complex',
  `[0]aformat=sample_rates=48000:channel_layouts=stereo,asplit=${OSAT.length + kopioita}${osaNimet.map((n) => `[r${n}]`).join('')}${kopiot.map((i) => `[u${i}]`).join('')};`
  + OSAT.map(([a, l], i) => `[ro${i}]atrim=${a}:${l},asetpts=PTS-STARTPTS[o${i}];`).join('')
  + kopiot.map((i) => `[u${i}]atrim=${SILMUKKA[0]}:${SILMUKKA[1]},asetpts=PTS-STARTPTS[s${i}];`).join('')
  + ketju
  // v12: levytys loppuu ennen kohtausta → hiljaisuutta loppuun asti (muuten raita jäisi lyhyeksi).
  + `[${viimeinen}]${V12 ? `apad=whole_dur=${KESTO},` : ''}atrim=0:${KESTO},volume=${vaimennus},volume=0.75,alimiter=limit=0.95[out]`,
  '-map', '[out]', '-c:a', 'libmp3lame', '-b:a', '160k', join(ULOS, `${ETULIITE}-musiikki.mp3`));
console.log('valmis:', ULOS);
