// Ajattelijat-linssi: Sokrateen kierrokset 2–3 (Blender v9/v10, sokrates_bysti.py --v9 --v10; Pelikoodari 2.10.2026).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { kamerakayra, tarkistaAjattelija } from '../js/linssit/ajattelija.js';
import { SOKRATES } from '../js/linssit/ajattelija-sokrates.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const MOOTTORI = lue('../js/linssit/ajattelija.js');

test('kierrokset jatkavat kierrosta 1 Blenderin v9-ruuduin; tarkistus vaatii kokonaiset kierrokset', () => {
  const kr = SOKRATES.kierrokset;
  assert.equal(kr.loppu, 3330);   // 111,0 s × 30
  assert.deepEqual(kr.lista.map((k) => k.paalause), ['21d', '49b']);
  assert.deepEqual(kr.lista.map((k) => k.vieritys), [[1480, 1755], [2330, 2595]]);   // v10: kirjaimet saapuvat liu'un lopussa
  assert.deepEqual(kr.lista.map((k) => k.kaiku.ruudut), [[1870, 2300], [2655, 3250]]);
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
  assert.deepEqual(sokrates(3330).paikka, SOKRATES.otokset.rembrandt.paikka);   // paluu Rembrandt-otokseen
});

test('moottori: yksi kaikupaikka suunnataan kierroksittain, ääni ja syke kierrosten raidoista, lappu lopussa', () => {
  assert.match(MOOTTORI, /const aaniLahde = KR\?\.aani \?\? a\.aani;/);
  assert.match(MOOTTORI, /const sykeLahde = KR \? KR\.syke : a\.syke;/);
  assert.match(MOOTTORI, /if \(G - pr0\.loppu >= LOPPU && ruutuOhitus == null\) avaaLappu\(\);/);
  assert.match(MOOTTORI, /if \(edellinen && edellinen\.siemen !== kt\.siemen\) virta = asetaVirta\(kt\.siemen\);/);
  assert.match(MOOTTORI, /for \(const \[ka, kl\] of kaikuIkkunat\)/);
  assert.match(MOOTTORI, /kierrosKamera = kamerakayra\(\[\[T\.pito, t2b\(pito\.paikka\), t2b\(pito\.katse\), pitoMm\], \.\.\.KR\.kamera\.slice\(1\)\]\);/);
});

test('kaikukuva oikein päin: tekstuuri ilman flipY:tä, koska varjostin lukee rivit ylhäältä (1 − v) kuten atlaksen', () => {
  assert.match(MOOTTORI, /tk\.colorSpace = THREE\.NoColorSpace;\s*\/\/[^\n]*\n\s*tk\.flipY = false;/);
  assert.match(lue('../js/linssit/ajattelija-projektori.js'), /texture2D\(pKaiku, vec2\(u, 1\.0 - v\)\)/);
});
