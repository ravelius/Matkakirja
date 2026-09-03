/*
 * KEKSINTÖLINSSIN PAIKKAMERKKI, ÄÄNIMAAILMA JA KOHAHDUS.
 *
 * Omistajan tilaus 3.9.2026: *"Keksinnön paikka ei näy oikein
 * kartalla. Saisi olla ensin todella selkeä vilkkuva pallo ja sitten
 * kun siirrytään seuraavaan vuoteen, niin pallo voisi hieman himmentyä
 * ja lopettaa vilkkumisen, mutta silti hehkua kartalla. Kun linssitila
 * menee päälle, niin kaikki muut äänet saisi vaieta taustalta …"*
 *
 * Kolme asiaa, jotka rikkoutuvat HILJAA — mikään niistä ei kaada
 * mitään eikä näy lokissa, vaan vasta omistajan silmässä ja korvassa:
 *
 *   1. MERKKI. Ryhmästä puuttuu ympyrä tai luokka jää vaihtumatta,
 *      jolloin nykyinen keksintö ei sytytä sykettä tai edellinen ei
 *      himmene jäljeksi.
 *   2. HILJENNYS. Linssi unohtaa hiljentää taustan tai — pahempaa —
 *      unohtaa palauttaa sen, jolloin kaupunkiäänet jäävät puoleen
 *      tasoon lopuksi ikää.
 *   3. KOHAHDUS. Sama variantti toistuu peräkkäin, tai puuttuva
 *      tiedosto jää täysin hiljaiseksi eikä pudota naksahdukseen.
 *
 * Moottori ajetaan tynkäselaimessa (sama tapa kuin
 * tests/linssimusiikki.test.mjs): oikea koodi, tyngät ympärillä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

/* ── tynkäselain ──────────────────────────────────────────────────── */

/** Kehysjono testin käsissä: rekursiivinen liuku ei saa jäädä pyörimään. */
let rafJono = [];
let rafKello = 0;
globalThis.requestAnimationFrame = (fn) => { rafJono.push(fn); return rafJono.length; };
globalThis.cancelAnimationFrame = () => {};

function ajaKehykset(kierroksia = 3) {
  for (let i = 0; i < kierroksia; i += 1) {
    rafKello += 20;
    for (const fn of rafJono.splice(0, rafJono.length)) fn(rafKello);
  }
}

class TynkaTyyli {
  setProperty(nimi, arvo) { this[nimi] = arvo; }
}

/** classList luetaan ja kirjoitetaan `class`-määreeseen — myös SVG:llä. */
class TynkaLuokat {
  constructor(solmu) { this.solmu = solmu; }

  get lista() { return (this.solmu.getAttribute('class') ?? '').split(/\s+/).filter(Boolean); }

  aseta(lista) { this.solmu.setAttribute('class', lista.join(' ')); }

  add(...nimet) {
    const l = this.lista;
    for (const n of nimet) if (!l.includes(n)) l.push(n);
    this.aseta(l);
  }

  remove(...nimet) { this.aseta(this.lista.filter((n) => !nimet.includes(n))); }

  contains(nimi) { return this.lista.includes(nimi); }

  toggle(nimi, pakko) {
    const paalle = pakko ?? !this.contains(nimi);
    if (paalle) this.add(nimi); else this.remove(nimi);
    return paalle;
  }
}

class TynkaSolmu {
  constructor(tag) {
    this.tagName = tag;
    this.lapset = [];
    this.parent = null;
    this.maareet = new Map();
    this.kuuntelijat = new Map();
    this.style = new TynkaTyyli();
    this.dataset = {};
    this.classList = new TynkaLuokat(this);
    this.textContent = '';
    this.hidden = false;
    this.juuri = false;
  }

  get className() { return this.getAttribute('class') ?? ''; }

  set className(arvo) { this.setAttribute('class', arvo); }

  get isConnected() {
    let n = this;
    while (n.parent) n = n.parent;
    return n.juuri === true;
  }

  appendChild(lapsi) {
    lapsi.parent?.poista(lapsi);
    lapsi.parent = this;
    this.lapset.push(lapsi);
    return lapsi;
  }

  append(...lapset) { for (const l of lapset) this.appendChild(l); }

  get children() { return this.lapset; }

  poista(lapsi) {
    this.lapset = this.lapset.filter((l) => l !== lapsi);
    if (lapsi.parent === this) lapsi.parent = null;
  }

  remove() { this.parent?.poista(this); }

  replaceChildren(...lapset) {
    for (const l of [...this.lapset]) this.poista(l);
    for (const l of lapset) this.appendChild(l);
  }

  setAttribute(nimi, arvo) { this.maareet.set(nimi, String(arvo)); }

  getAttribute(nimi) { return this.maareet.has(nimi) ? this.maareet.get(nimi) : null; }

  removeAttribute(nimi) { this.maareet.delete(nimi); }

  addEventListener(laji, fn) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, new Set());
    this.kuuntelijat.get(laji).add(fn);
  }

  removeEventListener() {}

  click() { for (const fn of [...(this.kuuntelijat.get('click') ?? [])]) fn({}); }

  querySelector() { return null; }

  querySelectorAll() { return []; }
}

const luo = (tag) => new TynkaSolmu(tag);
const body = luo('body');
body.juuri = true;

globalThis.document = {
  body,
  head: luo('head'),
  createElement: luo,
  createElementNS: (_ns, tag) => luo(tag),
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() {},
};
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
globalThis.fetch = () => Promise.reject(new Error('ei verkkoa testissä'));
globalThis.window = { AudioContext: function Ctx() { return {}; } };

/*
 * ESILATAUSTYNKÄ. Linssi pyytää koko kaaren muotokuvat ja ilmiökuvat
 * PIENINÄ taustalle heti avautuessaan (js/aikajana.js esilataaPienet →
 * js/ui-apurit.js esilataaKuvat), joten ilman selaimen Image-luokkaa
 * käynnistys kaatuisi. Osoitteet talteen, jotta esilataus on myös
 * mitattavissa eikä vain vaiettu pois.
 */
const esiladatut = [];
globalThis.Image = class TynkaKuva {
  constructor() { this.decoding = ''; }

  addEventListener() {}

  set src(osoite) { this.osoite = osoite; esiladatut.push(osoite); }

  get src() { return this.osoite; }
};

/** Kaikki soittimet, jotka moduulit ovat luoneet — kohahdus mukaan luettuna. */
let soittimet = [];

/** Soitin tynkänä: vain se, mitä peli oikeasti käyttää. */
class TynkaAudio {
  constructor(src) {
    this.src = src;
    this.volume = 0;
    this.loop = false;
    this.preload = '';
    this.paused = true;
    this.ended = false;
    this.currentTime = 0;
    // 1 = HAVE_METADATA. Testi laskee tämän nollaan silloin, kun
    // tiedostoa ei ole ladattu.
    this.readyState = 1;
    this.kuuntelijat = new Map();
    soittimet.push(this);
  }

  // `ended` nollautuu soitettaessa kuten oikeassa mediaelementissä:
  // ilman sitä kerran loppuun soinut variantti näyttäisi ikuisesti
  // loppuneelta eikä päällekkäisyysvahti purisi.
  play() { this.paused = false; this.ended = false; return Promise.resolve(); }

  pause() { this.paused = true; }

  load() {}

  addEventListener(laji, fn) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, new Set());
    this.kuuntelijat.get(laji).add(fn);
  }

  removeAttribute(nimi) { if (nimi === 'src') this.src = null; }

  /** Verkko petti: sama tapahtuma kuin selaimen 404. */
  laukaiseVirhe() {
    this.readyState = 0;
    for (const fn of [...(this.kuuntelijat.get('error') ?? [])]) fn({ type: 'error' });
  }
}
globalThis.Audio = TynkaAudio;

/* ── moduulit tyngän jälkeen ─────────────────────────────────────── */

const { kaynnistaAikajana, pysaytaAikajana, MERKIN_SADE, pieniOsoite } = await import('../js/aikajana.js');
const { LINSSI } = await import('../js/linssit/keksinnot.js');
const { lisaaVaistaja, nollaaHiljennykset } = await import('../js/ambience-stream.js');
const { LINSSIN_HILJENNYS } = await import('../js/siirtymamusiikki.js');
const tehosteet = await import('../js/tehosteet.js');
const { sfx } = await import('../js/sound.js');

/*
 * Tehosteet kiinni oletuksena: syntetisoidut äänet tarvitsisivat
 * kokonaisen Web Audio -tyngän (tests/sound.test.mjs), eikä tämä testi
 * mittaa niitä. Kohahdusosio kytkee äänet päälle itse — se ei kulje
 * Web Audion kautta lainkaan.
 */
sfx.enabled = false;

/** Puu läpi: kaikki solmut, joilla on annettu luokka. */
function etsi(solmu, luokka) {
  const osumat = [];
  const kay = (n) => {
    if (n.classList?.contains?.(luokka)) osumat.push(n);
    for (const l of n.lapset ?? []) kay(l);
  };
  kay(solmu);
  return osumat;
}

/** Tynkä-UI: vain ne kentät, joita moottori koskee. */
function tynkaUi() {
  const svg = luo('svg');
  const pane = luo('div');
  body.appendChild(svg);
  body.appendChild(pane);
  const ui = {
    svg,
    mapPane: pane,
    // Kartan mittakaava ruutuun: merkki mitoitetaan tästä (merkkiSkaala).
    nakyvaAlue: () => ({ skaala: 0.5 }),
    // Lehden oma vakio on varareitti; se on tarkoituksella ERI luku,
    // jotta testi näkee kummasta mitta tuli.
    fokusMerkkiSkaalaKartalle: () => 0.4,
    paivitaMaailmanRajaus() {},
    pysaytaAikajana: () => pysaytaAikajana(ui),
  };
  return ui;
}

/* ══════════════════════════════════════════════════════════════════
 * 1. PAIKKAMERKKI
 * ══════════════════════════════════════════════════════════════════ */

test('jokainen keksintö saa kolmiosaisen merkin kartan omaan kerrokseen', () => {
  const ui = tynkaUi();
  assert.equal(kaynnistaAikajana(ui, LINSSI), true);
  ajaKehykset();

  const kerros = etsi(ui.svg, 'aikajana-valot');
  assert.equal(kerros.length, 1, 'linssillä on tasan yksi merkkikerros');
  const merkit = etsi(ui.svg, 'aikajana-valo');
  // 26 tapahtumaa, joista yksi on merkkipaalu (1873) ilman merkkiä.
  assert.equal(merkit.length, 25);

  for (const osa of ['aikajana-valo-syke', 'aikajana-valo-hehku', 'aikajana-valo-pallo']) {
    assert.equal(etsi(ui.svg, osa).length, 25, `${osa} puuttuu merkeistä`);
  }
  // Pallo ja syke ovat samankokoisia (syke laajenee CSS:llä pallon
  // reunasta); hehku on niitä isompi. Kaikki keskipisteessä (0,0),
  // jotta skaalaus ei siirrä merkkiä (js/aikajana.js MERKIN_SADE).
  const pallo = etsi(ui.svg, 'aikajana-valo-pallo')[0];
  const hehku = etsi(ui.svg, 'aikajana-valo-hehku')[0];
  assert.equal(Number(pallo.getAttribute('r')), MERKIN_SADE);
  assert.ok(Number(hehku.getAttribute('r')) > MERKIN_SADE, 'hehku ei ole palloa isompi');
  for (const ympyra of [pallo, hehku, etsi(ui.svg, 'aikajana-valo-syke')[0]]) {
    assert.equal(ympyra.getAttribute('cx'), null, 'ympyrä ei ole keskipisteessä');
    assert.equal(ympyra.getAttribute('cy'), null, 'ympyrä ei ole keskipisteessä');
  }

  /*
   * Paikka tulee ryhmän omasta muunnoksesta, ei ympyröiden — ja MITTA
   * ruudusta eikä lehden vakiosta. Näkyvän alueen mittakaava on tyngässä
   * 0,5, joten kerroin on 2: merkki on ruudun pikseleitä myös silloin,
   * kun edellisen maan lehti on yhä muistissa (juuri se teki merkistä
   * 1,5-pikselisen omistajan raportissa, ks. js/aikajana.js merkkiSkaala).
   */
  assert.equal(merkit[0].getAttribute('transform'), 'translate(5691.6 1125.5) scale(2.0000)');
  pysaytaAikajana(ui);
});

test('nykyinen keksintö sykkii ja edellinen jää himmeäksi jäljeksi', () => {
  const ui = tynkaUi();
  kaynnistaAikajana(ui, LINSSI);
  ajaKehykset();
  const merkit = etsi(ui.svg, 'aikajana-valo');
  assert.ok(!merkit[0].classList.contains('palaa'), 'merkki palaa ennen syttymistään');

  ui.aikajana.sytyta(0);
  ajaKehykset();
  assert.ok(merkit[0].classList.contains('palaa') && merkit[0].classList.contains('nykyinen'),
    'ensimmäinen keksintö ei ole nykyinen');

  ui.aikajana.sytyta(1);
  ajaKehykset();
  assert.ok(merkit[0].classList.contains('palaa'), 'edellinen merkki sammui kokonaan');
  assert.ok(!merkit[0].classList.contains('nykyinen'),
    'edellinen merkki jäi sykkimään — vain yksi saa vilkkua kerrallaan');
  assert.ok(merkit[1].classList.contains('nykyinen'), 'uusi merkki ei sykki');
  assert.equal(etsi(ui.svg, 'nykyinen').length, 1, 'nykyisiä merkkejä on useampi');

  // Alusta tyhjentää jäljen; Sulje poistaa koko kerroksen.
  ui.aikajana.alusta();
  ajaKehykset();
  assert.equal(etsi(ui.svg, 'palaa').length, 0, 'Alusta jätti merkit palamaan');
  pysaytaAikajana(ui);
  assert.equal(etsi(ui.svg, 'aikajana-valo').length, 0, 'Sulje jätti merkkikerroksen kartalle');
});

/* ══════════════════════════════════════════════════════════════════
 * 2. ÄÄNIMAAILMA
 * ══════════════════════════════════════════════════════════════════ */

test('linssi hiljentää taustan omalla syyllään ja palauttaa sen sulkiessa', () => {
  const havainnot = [];
  lisaaVaistaja((kerroin, _kesto, tiedot) => {
    havainnot.push({ kerroin, syyt: tiedot?.syyt ?? [] });
  });
  // Puhdas pöytä: edellinen testi on voinut jättää syyn voimaan.
  nollaaHiljennykset();
  const ui = tynkaUi();
  havainnot.length = 0;

  kaynnistaAikajana(ui, LINSSI);
  ajaKehykset();
  const auki = havainnot.at(-1);
  assert.ok(auki, 'linssin avaus ei kertonut väistäjille mitään');
  assert.ok(auki.syyt.includes(LINSSIN_HILJENNYS),
    `hiljennyksen syyn pitäisi olla '${LINSSIN_HILJENNYS}' — oli ${JSON.stringify(auki.syyt)}`);
  assert.ok(auki.kerroin < 1, 'tausta ei hiljentynyt lainkaan');

  pysaytaAikajana(ui);
  ajaKehykset();
  const kiinni = havainnot.at(-1);
  assert.ok(!kiinni.syyt.includes(LINSSIN_HILJENNYS), 'hiljennys jäi voimaan sulkemisen jälkeen');
  assert.equal(kiinni.kerroin, 1, 'tausta ei palannut täyteen tasoon');
});

/* ══════════════════════════════════════════════════════════════════
 * 3. KOHAHDUS
 * ══════════════════════════════════════════════════════════════════ */

test('variantteja on neljä ämpärin tehostekansiosta, metadata esiladattuna', () => {
  tehosteet.nollaaTehosteet();
  soittimet = [];
  const rivit = tehosteet.esilataaKohahdukset();
  assert.equal(rivit.length, tehosteet.KOHAHDUS_VARIANTTEJA);
  assert.equal(rivit.length, 4);
  for (let i = 0; i < 4; i += 1) {
    assert.ok(rivit[i].audio.src.endsWith(`aanet/tehosteet/kohahdus-${i + 1}.mp3`),
      `variantti ${i + 1}: ${rivit[i].audio.src}`);
    assert.ok(rivit[i].audio.src.startsWith('https://'), 'ämpärin polku puuttuu');
    assert.equal(rivit[i].audio.preload, 'metadata', 'koko äänitettä ei saa esiladata');
  }
});

test('sama variantti ei toistu peräkkäin', () => {
  // Puhdas sääntö ilman soitinta: arpa 0 osuisi aina ensimmäiseen,
  // mutta edellinen suljetaan pois.
  assert.equal(tehosteet.valitseKohahdus([0, 1, 2, 3], -1, 0), 0);
  assert.equal(tehosteet.valitseKohahdus([0, 1, 2, 3], 0, 0), 1);
  assert.equal(tehosteet.valitseKohahdus([0, 1, 2, 3], 1, 0), 0);
  assert.equal(tehosteet.valitseKohahdus([0, 1, 2, 3], 3, 0.999), 2);
  // Yksi ainoa kelvollinen variantti saa toistua: hiljaisuus olisi pahempi.
  assert.equal(tehosteet.valitseKohahdus([2], 2, 0), 2);
  assert.equal(tehosteet.valitseKohahdus([], -1, 0), -1);
});

test('soitto kiertää variantteja eikä aloita uutta edellisen päälle', () => {
  tehosteet.nollaaTehosteet();
  soittimet = [];
  sfx.enabled = true;
  sfx.taustaTauko = false;

  const soitetut = [];
  for (let i = 0; i < 4; i += 1) {
    assert.equal(tehosteet.soitaKohahdus({ arpa: 0 }), true, `kierros ${i}: ei soinut`);
    const nyt = soittimet.find((a) => !a.paused);
    soitetut.push(soittimet.indexOf(nyt));
    // Edellinen soi vielä: uusi ei saa alkaa.
    assert.equal(tehosteet.soitaKohahdus({ arpa: 0 }), false,
      'kaksi kohahdusta yhtä aikaa — yleisö kohahtaa kerran, ei kuorossa');
    nyt.ended = true;
    nyt.paused = true;
  }
  for (let i = 1; i < soitetut.length; i += 1) {
    assert.notEqual(soitetut[i], soitetut[i - 1], `variantti toistui: ${soitetut.join(',')}`);
  }
});

test('puuttuva tai lataamaton tiedosto jättää soittamatta — kutsuja soittaa varansa', () => {
  tehosteet.nollaaTehosteet();
  soittimet = [];
  sfx.enabled = true;
  const rivit = tehosteet.esilataaKohahdukset();
  for (const rivi of rivit) rivi.audio.laukaiseVirhe();
  assert.equal(tehosteet.soitaKohahdus({ arpa: 0 }), false,
    '404 kaikissa varianteissa: mitään ei saa soittaa');

  // Ei vielä ladattu (readyState 0) on sama tilanne kuin puuttuva.
  tehosteet.nollaaTehosteet();
  soittimet = [];
  for (const rivi of tehosteet.esilataaKohahdukset()) rivi.audio.readyState = 0;
  assert.equal(tehosteet.soitaKohahdus({ arpa: 0 }), false, 'lataamatonta ei saa soittaa');

  // Mykistys voittaa kaiken.
  tehosteet.nollaaTehosteet();
  soittimet = [];
  tehosteet.esilataaKohahdukset();
  sfx.enabled = false;
  assert.equal(tehosteet.soitaKohahdus({ arpa: 0 }), false, 'mykistettynä ei saa soida mitään');
  sfx.enabled = true;
});

test('moottori soittaa kohahduksen elävästä vaihdoksesta ja naksahtaa varana', async () => {
  const MOOTTORI = (await import('node:fs')).readFileSync(
    new URL('../js/aikajana.js', import.meta.url), 'utf8',
  );
  // Ääni tulee vain elävästä vaihdoksesta: `heti` on rakentaminen ja Alusta.
  assert.match(MOOTTORI, /const elava = !heti && this\.kelloTeksti !== undefined;/);
  assert.match(MOOTTORI, /if \(elava && this\.kaynnissa\) this\.vuosiAani\(\);/);
  // Kohahdus ensin, naksahdus vain jos se ei soinut — ei kahta päällekkäin.
  assert.match(MOOTTORI, /vuosiAani\(\) \{\n\s*if \(soitaKohahdus\(\)\) return;\n\s*this\.naksahda\(\);/);
  // Naksahdus on harvennettu (AIKAJANA_NAKSU_VALI_MS) ja soittaa 'vuosi'.
  assert.match(MOOTTORI, /naksahda\(\) \{[\s\S]{0,300}AIKAJANA_NAKSU_VALI_MS[\s\S]{0,200}sfx\.play\('vuosi'\);/);
});

/* ══════════════════════════════════════════════════════════════════
 * 5. KUVIEN ESILATAUS
 * ══════════════════════════════════════════════════════════════════ */

/*
 * Omistajan havainto 3.9.2026: kuvat pitää olla ladattuina ennen kuin
 * paneeli vaihtuu — *"ainakin tuossa pienemmässä koossa"*. Raamatun
 * kohta 4 (KEKSIJAT LINSSIN ALARIVILLA) tarkentaa: KOKO kaari
 * esiladataan PIENINÄ heti linssin avautuessa, isoja ei lainkaan.
 * Tässä mitataan se, mitä moottori oikeasti pyytää.
 */
test('linssin avaus esilataa koko kaaren kuvat pieninä, ei ainuttakaan isoa', () => {
  const ui = tynkaUi();
  kaynnistaAikajana(ui, LINSSI);
  for (const t of LINSSI.aikajana.tapahtumat) {
    for (const kuva of [t.kuva, t.kuvaToinen, t.ilmio, t.ilmioLisa]) {
      if (!kuva?.osoite) continue;
      assert.ok(esiladatut.includes(pieniOsoite(kuva.osoite)),
        `esilataamatta: ${pieniOsoite(kuva.osoite)}`);
      assert.ok(!esiladatut.includes(kuva.osoite), `iso esiladattiin: ${kuva.osoite}`);
    }
  }
  // Montgolfier on kaksoispysäkki: molemmat kasvot pyydetään.
  assert.ok(esiladatut.filter((o) => o.includes('/muotokuva/pieni/1783-')).length === 2,
    'kaksoispysäkiltä esiladattiin vain toinen keksijä');
  // Myös kaaren viimeinen pysäkki on mukana — ei enää kolmen ikkunaa.
  assert.ok(esiladatut.some((o) => o.includes('1928-alexander-fleming')),
    'kaaren loppupää jäi esilataamatta');
  pysaytaAikajana(ui);
});
