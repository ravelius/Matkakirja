/*
 * PULU JA KERTOJA EIVÄT PUHU PÄÄLLEKKÄIN.
 *
 * Omistajan vikailmoitus 8.9.2026 klo 12.55, sanatarkasti: *"jos
 * minulla on maailma tila päällä kehittäjänä ja menen kuuntelemaan
 * kaupunkeja joissa pululla äänet, niin pulun ja kertojan äänet menevät
 * päällekkäin ja pulu selittää ensin jotain ihan väärää juttua."*
 *
 * Juurisyy oli kaksi rinnakkaista kirjanpitoa: kertoja eli
 * `ui.diaryVoice`-kentässä, pulu `ui.liviaAani`-kentässä, eikä kumpikaan
 * tiennyt toisesta. Järjestys syntyi pelkistä ajastimista, ja kehittäjän
 * hyppy kaupungista toiseen (js/ui.js doKehittajaSiirto) ohitti ne:
 * edellisen kaupungin repliikki jäi soimaan uuden kaupungin luennan
 * alle — se on se *"ihan väärä juttu"*, koska se on toisen kaupungin
 * lause.
 *
 * Nämä testit vartioivat korjauksen kolmea osaa:
 *
 *   1. YKSI VUOROKIRJANPITO (js/luenta.js puhujaAanessa): sama taulu,
 *      johon puhujat merkitään, kertoo kuka on äänessä.
 *   2. PORTIT MOLEMPIIN SUUNTIIN: pulu ei ala kertojan päälle
 *      (js/liviapuhe.js soitaLivianAani) eikä kertoja pulun päälle
 *      (js/luenta.js playDiaryVoice). Välihuuto on tietoinen poikkeus.
 *   3. LÄHTÖ VAIENTAA EDELLISEN PAIKAN: js/fokusvirta.js
 *      vaiennaLivianKaupunkipuhe ja js/ui.js vaiennaPaikanPuhe.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/** Selaimeton <audio>: vain se, mitä puhevuoron kirjanpito lukee. */
class TynkaAudio {
  constructor(src = '') {
    this.src = src;
    this.paused = true;
    this.ended = false;
    this.currentTime = 0;
    this.volume = 1;
    this.preload = '';
    this.kuuntelijat = new Map();
  }

  addEventListener(laji, fn) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, new Set());
    this.kuuntelijat.get(laji).add(fn);
  }

  removeEventListener(laji, fn) {
    this.kuuntelijat.get(laji)?.delete(fn);
  }

  dispatchEvent(tapahtuma) {
    for (const fn of [...(this.kuuntelijat.get(tapahtuma?.type) ?? [])]) fn(tapahtuma);
    return true;
  }

  laukaise(laji) {
    this.dispatchEvent({ type: laji });
  }

  play() {
    this.paused = false;
    this.currentTime = 0.1;
    return Promise.resolve();
  }

  pause() {
    this.paused = true;
  }

  load() { /* tynkä ei lataa mitään */ }

  getAttribute() { return this.src; }

  removeAttribute() { this.src = ''; }
}

globalThis.Audio = TynkaAudio;
globalThis.Event = globalThis.Event ?? class { constructor(type) { this.type = type; } };
globalThis.performance = globalThis.performance ?? { now: () => Date.now() };
globalThis.requestAnimationFrame = globalThis.requestAnimationFrame
  ?? ((fn) => setTimeout(() => fn(Date.now()), 16));

const {
  PUHUJA_KERTOJA, PUHUJA_PULU, merkitsePuhuja, playDiaryVoice, puhujaAanessa, vapautaPuhuja,
} = await import('../js/luenta.js');
const { soitaLivianAani } = await import('../js/liviapuhe.js');
const { LIVIAN_AVAUS } = await import('../js/livia.js');

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');
const uusiUi = () => ({ dead: false });
const odota = (ms) => new Promise((ok) => { setTimeout(ok, ms); });

/* ---------- 1. yksi vuorokirjanpito ---------- */

test('puhujaAanessa kertoo roolin ja unohtaa vapautetun', () => {
  const ui = uusiUi();
  const audio = new TynkaAudio('kertoja.mp3');
  assert.equal(puhujaAanessa(), null, 'tyhjä taulu = vuoro vapaa');
  merkitsePuhuja(ui, audio, PUHUJA_KERTOJA);
  assert.equal(puhujaAanessa(), PUHUJA_KERTOJA);
  // Kysyjä ei laske itseään: pulu kysyy "onko joku MUU äänessä".
  assert.equal(puhujaAanessa(PUHUJA_KERTOJA), null);
  assert.equal(puhujaAanessa(PUHUJA_PULU), PUHUJA_KERTOJA);
  vapautaPuhuja(ui, audio);
  assert.equal(puhujaAanessa(), null);
});

test('loppuun soinut tai tauolle jäänyt ei ole enää äänessä', () => {
  const ui = uusiUi();
  // Vielä aloittamaton soitin (playDiaryVoice viive) ON vuorossa:
  // muuten pulu ehtisi väliin juuri ennen kertojan aloitusta.
  const odottava = new TynkaAudio('odottaa.mp3');
  merkitsePuhuja(ui, odottava, PUHUJA_KERTOJA);
  assert.equal(puhujaAanessa(), PUHUJA_KERTOJA);
  // Pysäytetty soitin, joka on jo ehtinyt soida: lauserajahäivytys ja
  // pehmeaLopun viimeinen hetki eivät laukaise 'ended'-tapahtumaa.
  odottava.currentTime = 4.2;
  odottava.paused = true;
  assert.equal(puhujaAanessa(), null);
  // Loppuun soinut ei myöskään ole äänessä.
  odottava.currentTime = 0;
  odottava.ended = true;
  assert.equal(puhujaAanessa(), null);
  vapautaPuhuja(ui, odottava);
});

test('häivytys luovuttaa vuoron heti eikä jää tielle', async () => {
  const { haivytaLuenta } = await import('../js/luenta.js');
  const ui = uusiUi();
  const luenta = new TynkaAudio('puhe-fokus-matkakirja-vilna.mp3');
  merkitsePuhuja(ui, luenta, PUHUJA_KERTOJA);
  luenta.play();
  ui.diaryVoice = luenta;
  assert.equal(puhujaAanessa(PUHUJA_PULU), PUHUJA_KERTOJA);
  // Lähtö kaupungista häivyttää luennan 0,7 sekunnissa. Uuden paikan
  // ensimmäinen repliikki ei saa jäädä sen tähden sanomatta.
  haivytaLuenta(ui);
  assert.equal(puhujaAanessa(PUHUJA_PULU), null, 'häipyvä luenta ei enää varaa vuoroa');
  assert.ok(soitaLivianAani(ui, 'avaus', 0, { teksti: LIVIAN_AVAUS[0] }),
    'uuden paikan repliikki soi heti');
  vapautaPuhuja(ui, luenta);
  vapautaPuhuja(ui, ui.liviaAani);
});

/* ---------- 2. portit molempiin suuntiin ---------- */

test('pulu ei ala kertojan päälle — mutta välihuuto saa', () => {
  const ui = uusiUi();
  const teksti = LIVIAN_AVAUS[0];
  // Vuoro vapaana repliikki soi.
  const vapaana = soitaLivianAani(ui, 'avaus', 0, { teksti });
  assert.ok(vapaana, 'vapaa vuoro: pulun repliikin pitää soida');
  vapautaPuhuja(ui, vapaana);

  const kertoja = new TynkaAudio('kertoja.mp3');
  merkitsePuhuja(ui, kertoja, PUHUJA_KERTOJA);
  kertoja.play();
  assert.equal(soitaLivianAani(ui, 'avaus', 0, { teksti }), null,
    'kertoja äänessä: pulun repliikki jää soimatta');
  // VÄLIHUUTO ON POIKKEUS (omistaja 7.9.2026): se soi kertojan päälle
  // hiljempaa eikä varaa vuoroa.
  const huuto = soitaLivianAani(ui, 'avaus', 0, { teksti, vaista: false, vaimennus: 0.7 });
  assert.ok(huuto, 'välihuuto soi kertojan päällä');
  assert.equal(puhujaAanessa(PUHUJA_KERTOJA), null, 'välihuuto ei varaa vuoroa');

  vapautaPuhuja(ui, kertoja);
  const jalkeen = soitaLivianAani(ui, 'avaus', 0, { teksti });
  assert.ok(jalkeen, 'kertojan vaiettua pulu saa vuoron');
  vapautaPuhuja(ui, jalkeen);
});

/*
 * VÄLIHUUTO EI KESKEYTÄ LUKIJAA (omistaja 8.9.2026, Raamattu "PULUN
 * HUUDAHDUS EI KESKEYTA LUKIJAA, JA KUPLAPINO NAKYY KAHDEKSAAN RIVIIN
 * ASTI KUNNES KARTTA LIIKKUU", sanatarkasti: *"pulun huuhdahdukset
 * luennan väliin ei tarvitse keskeyttää lukijan ääntä."*).
 *
 * Kolme ehtoa yhdessä testissä, koska ne ovat sama sopimus:
 *   (a) huudahdus soi kertojan PÄÄLLE hiljempaa (vaimennus),
 *   (b) se ei merkitse puhujaa eikä saa kertojaa odottamaan,
 *   (c) se ei vaimenna eikä pysäytä kertojan omaa ääntä.
 */
test('välihuuto soi kertojan päällä hiljempaa eikä keskeytä lukijaa', async () => {
  const ui = uusiUi();
  const teksti = LIVIAN_AVAUS[0];
  // Kertoja on äänessä ja pitää vuoroa (saapumismerkinnän luenta).
  const kertoja = new TynkaAudio('puhe-fokus-matkakirja-riika.mp3');
  merkitsePuhuja(ui, kertoja, PUHUJA_KERTOJA);
  kertoja.play();
  const kertojanVoima = kertoja.volume;

  // Vertailukohta: sama repliikki täydellä voimalla.
  const taysi = soitaLivianAani(ui, 'avaus', 0, { teksti, vaista: false });
  assert.ok(taysi, 'vertailuääni ei syntynyt');
  const taysiVoima = taysi.volume;

  // (a) HILJEMPAA: sama kerroin kuin js/fokusvirta.js
  // HUUDAHDUKSEN_VAIMENNUS antaa huudahdukselle.
  const huuto = soitaLivianAani(ui, 'avaus', 0, { teksti, vaimennus: 0.7, vaista: false });
  assert.ok(huuto, 'välihuuto ei soinut kertojan päällä');
  assert.ok(huuto.volume < taysiVoima, `välihuuto ei ole hiljaisempi: ${huuto.volume}`);
  assert.ok(Math.abs(huuto.volume - taysiVoima * 0.7) < 1e-9,
    `vaimennus ei mene läpi: ${huuto.volume} vs ${taysiVoima * 0.7}`);

  // (b) EI VUOROA: välihuutoa ei merkitä puhujaksi…
  assert.equal(puhujaAanessa(PUHUJA_KERTOJA), null, 'välihuuto varasi puhevuoron');
  // …eikä kertoja siksi jää odottamaan sitä (js/luenta.js playDiaryVoice).
  const luenta = playDiaryVoice(ui, 'assets/audio/puhe-fokus-matkakirja-riika.mp3');
  assert.ok(luenta, 'luentaa ei luotu');
  await odota(120);
  assert.equal(luenta.paused, false, 'kertoja jäi odottamaan välihuudon loppumista');

  // (c) KERTOJA JATKAA: välihuuto ei pysäytä eikä vaimenna sitä.
  assert.equal(kertoja.paused, false, 'välihuuto pysäytti kertojan');
  assert.equal(kertoja.volume, kertojanVoima, 'välihuuto vaimensi kertojaa');

  vapautaPuhuja(ui, kertoja);
  vapautaPuhuja(ui, luenta);
  vapautaPuhuja(ui, huuto);
});

test('huudahduksen kutsupaikka pysyy vaimennettuna ja väistämättömänä', () => {
  const virta = lue('../js/fokusvirta.js');
  // Kutsu: hiljempaa (vaimennus) ja ilman väistöä (vaista: false).
  assert.match(virta, /vaimennus: HUUDAHDUKSEN_VAIMENNUS,\n\s*vaista: false,/,
    'huudahdus ei enää soi kertojan päälle vaimennettuna ilman väistöä');
  const kerroin = Number(virta.match(/const HUUDAHDUKSEN_VAIMENNUS = ([\d.]+);/)?.[1]);
  assert.ok(kerroin > 0 && kerroin < 1, `vaimennus ${kerroin} — ei hiljempaa kuin kertoja`);
  /*
   * EIKÄ HUUDAHDUS KOSKE KERTOJAN ÄÄNEEN. Vartio lukee funktion rungon
   * ja vaatii, ettei siellä ole yhtään häivytystä, pysäytystä tai
   * diaryVoicen soittimeen kajoamista — vain kupla ja oma äänite.
   */
  const runko = virta.match(/function ajastaHuudahdus\(ui, city, huudahdus, merkinta\) \{[\s\S]*?\n\}/)?.[0] ?? '';
  assert.ok(runko.includes('naytaPolloKupla'), 'ajastaHuudahduksen runkoa ei löytynyt');
  assert.doesNotMatch(runko, /haivyt[aä]|pysayt[aä]|stopDiaryVoice|diaryVoice[^)]*\.pause/,
    'huudahdus vaimentaa tai pysäyttää kertojan');
});

test('kertoja odottaa pulun lauseen loppuun eikä aloita sen päälle', async () => {
  const ui = uusiUi();
  const pulu = new TynkaAudio('livia-riika-1.mp3');
  merkitsePuhuja(ui, pulu, PUHUJA_PULU);
  pulu.play();

  const luenta = playDiaryVoice(ui, 'assets/audio/puhe-fokus-matkakirja-riika.mp3');
  assert.ok(luenta, 'luenta luodaan heti — vain aloitus odottaa');
  await odota(600);
  assert.equal(luenta.paused, true, 'kertoja ei saa alkaa pulun päälle');

  // Pulun lause loppuu: kertoja aloittaa seuraavalla kyselyllä.
  pulu.ended = true;
  vapautaPuhuja(ui, pulu);
  await odota(600);
  assert.equal(luenta.paused, false, 'pulun vaiettua kertoja aloittaa');
  vapautaPuhuja(ui, luenta);
});

/* ---------- 3. lähtö vaientaa edellisen paikan ---------- */

test('kaupungista lähtö katkaisee pulun ajastimet ja repliikin', async () => {
  const { vaiennaLivianKaupunkipuhe } = await import('../js/fokusvirta.js');
  const ui = uusiUi();
  const teksti = LIVIAN_AVAUS[0];
  const repliikki = soitaLivianAani(ui, 'avaus', 0, { teksti });
  assert.ok(repliikki);
  let laukesi = false;
  ui.saapumiskuplaAjastin = setTimeout(() => { laukesi = true; }, 20);
  ui.huudahdusAjastin = setTimeout(() => { laukesi = true; }, 20);
  ui.huudahdusLykkaysAjastin = setTimeout(() => { laukesi = true; }, 20);
  ui.polloKuplasarjaAjastin = setTimeout(() => { laukesi = true; }, 20);

  vaiennaLivianKaupunkipuhe(ui);
  assert.equal(ui.liviaAani, null, 'soiva repliikki päättyy lähtöön');
  await odota(80);
  assert.equal(laukesi, false, 'edellisen kaupungin ajastimet eivät laukea perillä');
  assert.equal(ui.huudahdusAjastin, null);
});

/* ---------- kytkentä peliin (lähdetekstin vartiot) ---------- */

test('jokainen lähtö kulkee saman vaiennuksen kautta', () => {
  const ui = lue('../js/ui.js');
  assert.match(ui, /vaiennaPaikanPuhe\(\) \{\n\s*haivytaLuenta\(this\);\n\s*vaiennaLivianKaupunkipuhe\(this\);\n\s*polloKuplatPois\(\);\n\s*\}/,
    'vaiennaPaikanPuhe hoitaa äänet ja kuplat yhdessä paikassa');
  // Kaikki neljä lähtötapaa: noppa, jalan, lento ja kehittäjän hyppy.
  const kutsut = [...ui.matchAll(/this\.vaiennaPaikanPuhe\(\);/g)];
  assert.ok(kutsut.length >= 4,
    `vaiennaPaikanPuhe-kutsuja on vain ${kutsut.length} — lähtötapoja on neljä`);
  assert.doesNotMatch(ui, /\n\s*haivytaLuenta\(this\);\n\s*this\.suljeMatkavalikko/,
    'kehittäjän hyppy ei saa vaientaa pelkkää kertojaa');
});

test('kommentti odottaa myös vasta lähdössä olevaa luentaa', () => {
  const virta = lue('../js/fokusvirta.js');
  // Kirjoituskone voi ehtiä maaliin ennen kertojaa: ensisaapumisessa
  // luenta odottaa vielä tuurauspaljastuksen kuplia. Silloin diaryVoice
  // on vielä tyhjä eikä luennanLoppuun tiedä luennasta — lykkäyslippu
  // tietää.
  assert.match(virta, /if \(ui\.luennanLykkays && jaljella > 0 && !ui\.dead\) \{/);
  assert.match(virta, /const SAAPUMISKUPLAN_LUENTAKATTO_MS = 30_000;/);
});

test('pulun kaupunkisarjat vartioivat kaupunkiaan', () => {
  const virta = lue('../js/fokusvirta.js');
  // Välihuudon odotus vartioi kaupunkia: väärässä kaupungissa lauetessaan
  // se ajastaisi edellisen kaupungin välihuudon uuden luennan päälle.
  assert.match(virta,
    /const kaynnista = \(jaljella = HUUDAHDUKSEN_LYKKAYSKATTO_MS\) => \{\n\s*if \(ui\.dead \|\| ui\.game\?\.cityOf\?\.\(\)\?\.id !== city\.id\) return;/);
  assert.match(virta,
    /function soitaLivianKaupunkiSarja[\s\S]{0,400}?cityOf\?\.\(\)\?\.id !== kaupunkiId\) return;/);
  assert.match(virta, /export function vaiennaLivianKaupunkipuhe\(ui\)/);
});

test('puhevuoro on yksi kirjanpito, ei kahta', () => {
  const luenta = lue('../js/luenta.js');
  // Vuorotieto asuu samassa taulussa kuin taustan väistön kirjanpito.
  assert.match(luenta, /const soivatLuennat = new Map\(\); \/\/ audio → \{ ui, rooli \}/);
  assert.match(luenta, /export function puhujaAanessa\(paitsi = null\)/);
  const puhe = lue('../js/liviapuhe.js');
  assert.match(puhe, /if \(vaista && puhujaAanessa\(PUHUJA_PULU\)\) return null;/);
  assert.match(puhe, /if \(vaista\) merkitsePuhuja\(ui, audio, PUHUJA_PULU\);/);
});
