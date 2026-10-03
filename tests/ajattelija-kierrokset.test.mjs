// Ajattelijat-linssi: Sokrateen kierrokset 2–3 (Blender v9/v10, sokrates_bysti.py --v9 --v10; Pelikoodari 2.10.2026).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { kamerakayra, tarkistaAjattelija, aikajanaKamera, aikajanaAurinko, avainArvo } from '../js/linssit/ajattelija.js';
import { SOKRATES } from '../js/linssit/ajattelija-sokrates.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const MOOTTORI = lue('../js/linssit/ajattelija.js');

test('kierrokset jatkavat kierrosta 1 Blenderin v9-ruuduin; tarkistus vaatii kokonaiset kierrokset', () => {
  const kr = SOKRATES.kierrokset;
  assert.equal(kr.loppu, 3772);   // v12: v11 + 442 (alustava, sidotaan uuteen kertojan puheeseen)
  assert.deepEqual(kr.lista.map((k) => k.paalause), ['21d', '49b']);
  assert.deepEqual(kr.lista.map((k) => k.vieritys), [[1922, 2197], [2772, 3037]]);   // v10-sääntö, v12 +442
  assert.deepEqual(kr.lista.map((k) => k.kaiku.ruudut), [[2312, 2742], [3097, 3692]]);   // sokrates-luvut-v12.json r2_kaiku, r3_kaiku
  assert.deepEqual(kr.lista.map((k) => k.siemen), [21, 49]);
  assert.equal(kr.kamera[0][0], SOKRATES.ajat.pito);
  assert.deepEqual(tarkistaAjattelija(SOKRATES), []);
  const rikki = { ...SOKRATES, kierrokset: { ...kr, lista: [{ ...kr.lista[0], paalause: 'puuttuu' }] } };
  assert.ok(tarkistaAjattelija(rikki).includes('kierrokset.lista[0].paalause'));
  // 21d poskelle edestä, 49b kasvojen sivulle säteellä sivulta (sokrates_bysti.py sivulta(-0.08, 0.375)).
  assert.deepEqual(SOKRATES.paalauseet['21d'].sade, [-0.055, 0.352]);
  assert.deepEqual(SOKRATES.paalauseet['49b'].sivulta, [-0.08, 0.375]);
});

test('kamerakäyrä kulkee avainten kautta ja pysähtyy tasaisiin avaimiin (AUTO_CLAMPED)', () => {
  const k = kamerakayra([[0, [0, 0, 0], [0, 0, 0], 35], [10, [1, 0, 0], [0, 0, 0], 18], [20, [1, 0, 0], [0, 0, 0], 18], [30, [3, 0, 0], [0, 0, 0], 50]]);
  assert.deepEqual(k(0).paikka, [0, 0, 0]);
  assert.equal(k(10).mm, 18);
  assert.equal(k(20).paikka[0], 1);
  assert.equal(k(15).paikka[0], 1);   // kaksi samaa avainta → ei ylitystä
  assert.ok(k(5).paikka[0] > 0 && k(5).paikka[0] < 1);
  assert.equal(k(40).paikka[0], 3);   // lopun jälkeen viimeinen avain
  const sokrates = kamerakayra(SOKRATES.kierrokset.kamera);
  assert.deepEqual(sokrates(SOKRATES.kierrokset.loppu).paikka, SOKRATES.otokset.rembrandt.paikka);   // paluu Rembrandt-otokseen
});

test('moottori: yksi kaikupaikka suunnataan kierroksittain, ääni ja syke kierrosten raidoista, lappu lopussa', () => {
  assert.match(MOOTTORI, /const aaniPohja = AJ\?\.aani \?\? KR\?\.aani \?\? a\.aani;/);
  assert.match(MOOTTORI, /haku\.get\('ajattelijamusiikki'\)/);
  assert.match(MOOTTORI, /const sykeLahde = AJ \? AJ\.syke : KR \? KR\.syke : a\.syke;/);
  assert.match(MOOTTORI, /if \(G - pr0\.loppu >= LOPPU && ruutuOhitus == null\) avaaLappu\(\);/);
  assert.match(MOOTTORI, /if \(edellinen && edellinen\.siemen !== kt\.siemen\) virta = asetaVirta\(kt\.siemen\);/);
  assert.match(MOOTTORI, /for \(const \[ka, kl\] of kaikuIkkunat\)/);
  assert.match(MOOTTORI, /kierrosKamera = kamerakayra\(\[\[T\.pito, t2b\(pito\.paikka\), t2b\(pito\.katse\), pitoMm\], \.\.\.KR\.kamera\.slice\(1\)\]\);/);
});

test('kaikukuva oikein päin: tekstuuri ilman flipY:tä, koska varjostin lukee rivit ylhäältä (1 − v) kuten atlaksen', () => {
  assert.match(MOOTTORI, /tk\.colorSpace = THREE\.NoColorSpace;\s*\/\/[^\n]*\n\s*tk\.flipY = false;/);
  assert.match(lue('../js/linssit/ajattelija-projektori.js'), /texture2D\(pKaiku, vec2\(u, 1\.0 - v\)\)/);
});

test('Marcuksen kierrokset 2–3 samalla rakenteella (marcus-tekstit.json kierrokset_2_3): 4.49 poskella, 2.11 sivulla', async () => {
  const { MARCUS } = await import('../js/linssit/ajattelija-marcus.js');
  const kr = MARCUS.kierrokset;
  assert.deepEqual(tarkistaAjattelija(MARCUS), []);
  assert.deepEqual(kr.lista.map((k) => k.paalause), ['itselleen-4-49', 'itselleen-2-11']);
  assert.deepEqual(MARCUS.paalauseet['itselleen-4-49'].sade, [-0.035, 0.360]);   // poskiparran yläpuolella
  assert.deepEqual(kr.lista.map((k) => k.kaiku.kuva.split('/').pop()), ['kaiku-uhri.png', 'kaiku-kuolema.png']);
  assert.equal(kr.loppu, 3330);
  assert.deepEqual(kamerakayra(kr.kamera)(3330).paikka, MARCUS.otokset.rembrandt.paikka);
});
test('taustavirran rivit kulkevat lähes samaa nopeutta pinnalla: 25 mm/s ±15 % (omistaja 3.10.2026, Blender v11)', () => {
  assert.deepEqual(SOKRATES.taustavirta.nopeus, { mms: 25, vaihtelu: 0.15 });
  assert.match(MOOTTORI, /const nopeudet = tv\.rivit\.map\(\(_, k\) => 1 - vaihtelu \+ 2 \* vaihtelu \* k \/ Math\.max\(1, tv\.rivit\.length - 1\)\);/);
  // uv/ruutu = m/s / 30 / rivin laatan leveys pinnalla (Blender v11: nop /= kork × kuvan leveys / korkeus).
  assert.match(MOOTTORI, /const riviLev = kork \* paikat\[i\]\.lev \/ paikat\[i\]\.korkeus;/);
  assert.match(MOOTTORI, /const nopeus = mms \/ 1000 \* nopeudet\[ri\] \/ RUUTUA_S \/ riviLev;/);
  assert.doesNotMatch(MOOTTORI, /0\.0007 \* 1\.18 \*\* k/);
});

test('✕ piilossa kunnes napautetaan, häipyy taas astron AUTO-ajoituksella (omistaja 3.10.2026 klo 00.1x)', async () => {
  const { AJATTELIJA_SULKU_PIILOON_MS } = await import('../js/linssit/ajattelija.js');
  assert.equal(AJATTELIJA_SULKU_PIILOON_MS, 4000);   // = satelliitti.js AUTO_HILJAA_MS
  assert.match(MOOTTORI, /pohja\.el\.classList\.add\('ajattelija-sulku-piilossa'\);/);
  assert.match(MOOTTORI, /pohja\.el\.addEventListener\('pointerdown', \(\) => \{\s*pohja\.el\.classList\.remove\('ajattelija-sulku-piilossa'\);/);
  const css = lue('../css/pohjat/pinnat/ajattelija.css');
  assert.match(css, /\.ajattelija\.ajattelija-sulku-piilossa \.tk-kuvanakyma__sulku \{\s*opacity: 0;\s*pointer-events: none;\s*transition: opacity var\(--tk-kesto-sulku\) ease-in;/);
});

test('v11 (omistaja 3.10.2026): alkukuvat varjopuolelta, kaiku 1 lähempänä ja leveämpi, kytkinääni v2', async () => {
  const { MARCUS } = await import('../js/linssit/ajattelija-marcus.js');
  const { AJATTELIJA_KYTKIN } = await import('../js/linssit/ajattelija.js');
  for (const a of [SOKRATES, MARCUS]) {
    assert.ok(a.intro.otokset.every(([, c]) => c[0] <= 0), `${a.tunnus}: introkamera ei ole valon vastapuolella`);
    assert.ok(a.intro.tayte < 1);
    assert.equal(a.kaiku.lev, 0.07);
    assert.deepEqual(a.kaiku.kamera.matka, [0.15, 0.14]);
  }
  assert.deepEqual(MARCUS.intro.valo[0][1], [1.0, -0.35, 0.45]);   // Marcus v11
  assert.deepEqual(SOKRATES.kierrokset.kamera.find(([r]) => r === 3142)[1], [0.205, -0.1767, 0.337]);   // v11:n 2700 → v12 +442
  assert.equal(AJATTELIJA_KYTKIN, 'ajattelijat/yhteiset/v2/kytkin-kaiku.mp3');
  assert.match(MOOTTORI, /maailma\.intensity = TAYTE \* hiipuu \* \(r < T\.nimi\[0\] \? \(a\.intro\.tayte \?\? 1\) : 1\);/);
});

test('auringon suunta normalisoidaan avainten välissä (valo pysyy 1,3 m:n päässä; vahingossa pois #3884:ssä)', () => {
  assert.match(MOOTTORI, /return e\.suunta\.clone\(\)\.lerp\(v\.suunta, pehmea\(valilla\(r, e\.r, v\.r\)\)\)\.normalize\(\);/);
});

test('v12 Sokrates (omistaja 3.10.2026 klo 04.5x; sokrates-luvut-v12.json a6308b998): pidempi intro, aurinko sivulta, Marcus ennallaan', async () => {
  const { MARCUS } = await import('../js/linssit/ajattelija-marcus.js');
  const o = SOKRATES.intro.otokset;
  assert.deepEqual(o.map(([r]) => r), [1, 520, 521, 627, 649, 673]);
  assert.equal(o[0][4], 'BEZIER');   // yksi hidas ajo 1 → 520
  assert.ok(o.slice(1).every((x) => x[4] === undefined));   // leikkaukset kuuluviin iskuihin
  assert.deepEqual(SOKRATES.ajat.nimi, [724, 814]);
  assert.deepEqual(SOKRATES.ajat.kysymys[0], 815);
  assert.deepEqual(SOKRATES.ajat.kaiku, [1407, 1882]);
  assert.deepEqual(SOKRATES.intro.valo.at(-1), [724, [0.95, -0.30, 0.55]]);
  assert.equal(SOKRATES.intro.tayte, 0);
  assert.deepEqual(SOKRATES.taustavirta.ajat, [904, 982, 1342, 1392]);
  // Marcus ei muutu: omat kierroksen 1 ajat ja taustavirran ajat.
  assert.deepEqual(MARCUS.ajat.nimi, [282, 372]);
  assert.deepEqual(MARCUS.taustavirta.ajat, [462, 540, 900, 950]);
  assert.match(MOOTTORI, /ajo: tapa === 'BEZIER' && seuraava \? kamerakayra\(\[\[r, c, q, mm\], seuraava\.slice\(0, 4\)\]\) : null,/);
});

test('v13 aikajana (Linnanrakentaja ffa1c9c94): Blenderin avaimet sellaisinaan, kierrokset eivät ole käytössä', () => {
  const aj = SOKRATES.aikajana;
  assert.equal(aj.versio, 'v13');
  assert.equal(aj.loppu, 3493);
  assert.equal(aj.kertoja.alku, 28);
  assert.deepEqual(aj.tykit.map((t) => t.paalause), ['38a', '21d', '30e', '49b', 'kysymys']);
  assert.equal(aj.tykit.at(-1).kiintea, true);
  assert.deepEqual(aj.kaiut.map((k) => k.kuva.split('/').pop()), ['kaiku-jumala.png', 'kaiku-sotilas.png', 'kaiku-oraakkeli.png', 'kaiku-kuolema.png']);
  assert.ok(aj.kaiut.every((k) => k.kuva.startsWith('ajattelijat/sokrates/v3/kaiut-v13c/')));
  assert.deepEqual(aj.efektit.map(([e]) => e).filter((e, i, l) => l.indexOf(e) === i),
    ['01-projektori-naksahdus', '02-hallin-ovi', '03-malja-kivelle', '04-kytkin-pois']);
  assert.ok(aj.aurinko.avaimet.every((x) => x[3]?.length === 3));   // v13b: väri jokaisessa avaimessa
  assert.ok(aj.pyyhkaisy.kohteet.length >= 4);
  assert.deepEqual(tarkistaAjattelija(SOKRATES), []);
  assert.match(MOOTTORI, /const KR = AJ \? null : \(a\.kierrokset \?\? null\);/);
  assert.match(MOOTTORI, /else \(asetaAikajana \?\? asetaRuutu\)\(Math\.min\(G - pr0\.loppu, LOPPU\)\);/);
});

test('aikajanan kamera: CONSTANT pitää (leikkaus), BEZIER ajaa seuraavaan', () => {
  const k = aikajanaKamera([
    [1, [0, 0, 0], [0, 0, 0], 50, 'BEZIER'], [11, [1, 0, 0], [0, 0, 0], 50, 'CONSTANT'],
    [21, [5, 0, 0], [0, 0, 0], 35, 'CONSTANT'], [31, [9, 0, 0], [0, 0, 0], 35, 'BEZIER'], [41, [10, 0, 0], [0, 0, 0], 18, 'BEZIER'],
  ]);
  assert.ok(k(6).paikka[0] > 0 && k(6).paikka[0] < 1);   // ajo
  assert.equal(k(15).paikka[0], 1);                         // pito
  assert.equal(k(21).paikka[0], 5);                         // leikkaus
  assert.equal(k(30).mm, 35);
  assert.ok(k(36).paikka[0] > 9 && k(36).paikka[0] < 10);
  assert.equal(k(50).paikka[0], 10);
});

test('aikajanan aurinko kiertää säteellä (ei oikaise ympyrän läpi); avainArvo lineaarinen', () => {
  const au = aikajanaAurinko({ kohde: [0, 0, 0], avaimet: [[0, [1, 0, 0], 60, [1, 1, 1]], [10, [0, 1, 0], 60, [1, 0.6, 0.3]]] });
  const keski = au(5);
  assert.ok(Math.abs(Math.hypot(...keski.paikka) - 1) < 1e-9);
  assert.deepEqual(keski.vari, [1, 0.8, 0.65]);
  assert.equal(avainArvo([[0, 0], [10, 220], [20, 220], [26, 0]], 5), 110);
  assert.equal(avainArvo([[0, 0], [10, 220]], 99), 220);
});

test('kehitysliput omistajan vertailuun: kaikujen väri (oletus väritön, ?kaikuvari=seepia)', () => {
  assert.match(MOOTTORI, /haku\.get\('kaikuvari'\) === 'seepia' \? SEEPIA : \(AJ\.kaikuVari \?\? \[1\.0, 1\.0, 1\.0\]\)/);
});

test('kehitysliput: kaikusarja (oletus A, harmaa ja seepia kuvina) ja väritön valo sarjan värikuville', () => {
  const aj = SOKRATES.aikajana;
  assert.equal(aj.kaikusarja, 'a');
  assert.equal(aj.kaikusarjat.a, undefined);   // A = aikajanan omat kuvat (v13c gobot-v13cA)
  assert.ok(aj.kaiut.every((k) => k.kuva.startsWith('ajattelijat/sokrates/v3/kaiut-v13c/')));
  assert.equal(aj.kaikusarjat.v13b.length, aj.kaiut.length);
  assert.ok(aj.kaikusarjat.sk.slice(0, 3).every((e) => e.harmaa.includes('/v3/kaiut/') && e.seepia.includes('/v3/kaiut/')));
  assert.match(MOOTTORI, /const sarjanNimi = haku\.get\('kaikusarja'\) \?\? AJ\.kaikusarja;/);
  assert.match(MOOTTORI, /u\.pKaikuVari\.value\.setRGB\(\.\.\.\(k\.varissa \? \[1, 1, 1\] : kaikuValo\)\);/);
  assert.match(lue('../js/linssit/ajattelija-projektori.js'), /return c\.rgb \/ max\(l, 1e-3\) \* smoothstep\(0\.08, 0\.9, l\) \* c\.a \* reunaK;/);
});

test('v13c: tekstivirran väistökehät kaikujen ympärillä ja savumaski lipulla (Linnanrakentaja 34b5f06a5)', () => {
  const aj = SOKRATES.aikajana;
  assert.equal(aj.vaisto.length, 4);
  assert.ok(aj.vaisto.every((v) => v.sade > 0.05 && v.sade < 0.2 && v.ruudut[1] > v.ruudut[0]));
  assert.deepEqual(aj.savu, { kuva: 'ajattelijat/sokrates/v3/savu-atlas-v4.png', ala: 0.28, kesto: 8, fps: 30, ruutuja: 240 });
  assert.match(MOOTTORI, /const savuPaalla = haku\.get\('savu'\) === '1' && AJ\.savu\?\.kuva;/);
  const pr = lue('../js/linssit/ajattelija-projektori.js');
  assert.match(pr, /if \(pD\[i\]\.w > 0\.5\) t \*= pVaistoKerroin\(vMaailma\);/);
  assert.match(pr, /if \(pSavuTila\.x > 0\.5\) t \*= pSavuNayte\(jx \* pA\[i\]\.x, jy \* pA\[i\]\.x\);/);
  assert.match(pr, /smoothstep\(0\.85 \* pVaisto\[j\]\.w, pVaisto\[j\]\.w,/);
});
