/*
 * AIKASELAIN — LINSSIEN YHTEINEN AIKANAUHA (js/linssit/aikaselain.js).
 *
 * Raamattu "LINSSIEN AIKASELAIN ALAREUNAAN" (omistaja 7.9.2026 klo
 * 20.55): *"täynnä pystyviivoja ja valittu aika olisi pidempi viiva …
 * nopea sormella valita aikapiste ja kelata … Korkean viivan viereiset
 * viivat voisivat olla vähän koholla … Sama elementti toimisi
 * tulevissakin linsseissä."*
 *
 * Mitä tässä vartioidaan:
 *
 *   1. ASETTELU: viivat ovat jaksojärjestyksessä tasavälein, ja laitaan
 *      jää puoli väliä (muuten laidan viivaa ei voi napauttaa).
 *   2. AALTO: valittu on korkein ja naapurit laskevat tasaisesti
 *      nollaan — ei porrasta eikä hyppyä.
 *   3. VETO: yksi kosketuspinta, joka esikatselee jatkuvasti ja valitsee
 *      vasta irrotessa; napautus valitsee suoraan.
 *   4. MODUULI EI TIEDÄ KAARESTA MITÄÄN: lähdekoodissa ei ole yhtään
 *      kertomuksen, jakson tai vanan nimeä.
 *   5. KELAUKSEN LUKEMA: nauhan osuus → vuosia sitten geometrisesti
 *      (js/linssit/ihmisen-matka-esitys.js kelauksenLukema).
 *   6. KYTKENTÄ: kertomuskaari saa nauhan, keksintölinssi ei (rajaus),
 *      ja alalaidan muut kelluvat väistävät nauhaa.
 *
 * Selaimen puoli (aito veto ruutukoordinaateilla, kellon kelaus ja
 * jakson vaihto) on savukkeissa savuke-ihmisen-esitys.mjs ja
 * savuke-ihmisen-tutkimus.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');
/** Lähdekoodi ilman kommentteja (proosa ei laukaise sanavartioita). */
const koodi = (teksti) => teksti.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');

/* ==================== selainympäristö ==================== */

/*
 * PIENI DOM ILMAN KIRJASTOA (sama kuvio kuin tests/lukijanappi.test.mjs).
 * Aikaselain käyttää vain kourallista rajapintoja, ja ne on tässä —
 * jos moduuli alkaa tarvita muuta, testi kaatuu heti eikä vasta
 * selaimessa.
 */
class Elementti {
  constructor(nimi) {
    this.nodeName = String(nimi).toUpperCase();
    this.childNodes = [];
    this.parentNode = null;
    this.attrs = {};
    this.dataset = {};
    this.textContent = '';
    this.tabIndex = -1;
    this.kuuntelijat = new Map();
    this.laatikko = { left: 0, top: 0, width: 0, height: 0 };
    this.kaapatut = [];
    const luokat = [];
    this.luokat = luokat;
    const tyylit = new Map();
    this.style = {
      setProperty: (nimi2, arvo) => tyylit.set(nimi2, String(arvo)),
      getPropertyValue: (nimi2) => tyylit.get(nimi2) ?? '',
    };
    this.classList = {
      add: (...n) => n.forEach((x) => { if (!luokat.includes(x)) luokat.push(x); }),
      remove: (...n) => n.forEach((x) => {
        const i = luokat.indexOf(x);
        if (i >= 0) luokat.splice(i, 1);
      }),
      contains: (n) => luokat.includes(n),
      toggle: (n, tila) => {
        const halutaan = tila === undefined ? !luokat.includes(n) : Boolean(tila);
        if (halutaan) this.classList.add(n);
        else this.classList.remove(n);
        return halutaan;
      },
    };
  }

  get className() { return this.luokat.join(' '); }

  set className(arvo) {
    this.luokat.length = 0;
    for (const osa of String(arvo).split(/\s+/)) if (osa) this.luokat.push(osa);
  }

  appendChild(lapsi) { lapsi.parentNode = this; this.childNodes.push(lapsi); return lapsi; }

  remove() {
    const i = this.parentNode?.childNodes.indexOf(this) ?? -1;
    if (i >= 0) this.parentNode.childNodes.splice(i, 1);
    this.parentNode = null;
  }

  setAttribute(nimi, arvo) { this.attrs[nimi] = String(arvo); }

  getAttribute(nimi) {
    return Object.prototype.hasOwnProperty.call(this.attrs, nimi) ? this.attrs[nimi] : null;
  }

  getBoundingClientRect() { return this.laatikko; }

  setPointerCapture(id) { this.kaapatut.push(id); }

  releasePointerCapture(id) {
    const i = this.kaapatut.indexOf(id);
    if (i >= 0) this.kaapatut.splice(i, 1);
  }

  addEventListener(nimi, fn) {
    if (!this.kuuntelijat.has(nimi)) this.kuuntelijat.set(nimi, []);
    this.kuuntelijat.get(nimi).push(fn);
  }

  removeEventListener(nimi, fn) {
    const lista = this.kuuntelijat.get(nimi) ?? [];
    const i = lista.indexOf(fn);
    if (i >= 0) lista.splice(i, 1);
  }

  /** Osoitintapahtuma ilman selainta: sama kulku kuin oikealla sormella. */
  laukaise(nimi, tiedot = {}) {
    const tapahtuma = {
      type: nimi,
      pointerId: 1,
      clientX: 0,
      clientY: 0,
      key: '',
      target: this,
      preventDefault() { tapahtuma.estetty = true; },
      stopPropagation() { tapahtuma.pysaytetty = true; },
      ...tiedot,
    };
    for (const fn of this.kuuntelijat.get(nimi) ?? []) fn(tapahtuma);
    return tapahtuma;
  }
}

globalThis.document = { createElement: (nimi) => new Elementti(nimi) };

const {
  luoAikaselain, aallonTaso, viivanPaikka, osuusPaikasta, lahinIndeksi, AALLON_LEVEYS,
} = await import('../js/linssit/aikaselain.js');
const { kelauksenLukema } = await import('../js/linssit/ihmisen-matka-esitys.js');
const { IHMISEN_MATKA_KERTOMUS } = await import('../js/linssit/ihmisen-matka-kertomus.js');

const MODUULI = lue('../js/linssit/aikaselain.js');
const AIKAJANA = lue('../js/aikajana.js');
const CSS = lue('../css/aikajana.css');
const TUTKIMUS_CSS = lue('../css/ihmisen-tutkimus.css');
const ESITYS = lue('../js/linssit/ihmisen-matka-esitys.js');

/** Koenauha: viisi pistettä riittää asettelun ja aallon todistamiseen. */
const PISTEET = [
  { id: 'a', otsikko: 'Alku', vuosia: 300000 },
  { id: 'b', otsikko: 'Bee', vuosia: 200000 },
  { id: 'c', otsikko: 'Cee', vuosia: 100000 },
  { id: 'd', otsikko: 'Dee', vuosia: 50000 },
  { id: 'e', otsikko: 'Eee', vuosia: 0 },
];

/** Nauha koekäyttöön: laatikko 500 px leveä, kutsut talteen. */
function koenauha(asetukset = {}) {
  const esikatselut = [];
  const valinnat = [];
  const selain = luoAikaselain({
    pisteet: PISTEET,
    nykyinen: 'a',
    onEsikatselu: (id, osuus) => esikatselut.push({ id, osuus }),
    onValinta: (id) => valinnat.push(id),
    ...asetukset,
  });
  selain.el.laatikko = {
    left: 0, top: 0, width: 500, height: 62,
  };
  return { selain, esikatselut, valinnat };
}

/* ==================== 1. asettelu ==================== */

test('viivat ovat tasavälein ja laitaan jää puoli väliä', () => {
  const maara = 5;
  const paikat = [0, 1, 2, 3, 4].map((i) => viivanPaikka(i, maara));
  assert.deepEqual(paikat, [10, 30, 50, 70, 90]);
  // Väli on tasan sama joka kohdassa (aika on epälineaarinen, nauha ei).
  const valit = paikat.slice(1).map((p, i) => Math.round((p - paikat[i]) * 1000) / 1000);
  assert.deepEqual(valit, [20, 20, 20, 20]);
  // Laidan puolikkaat välit kuuluvat laidan viivalle.
  assert.equal(viivanPaikka(0, 1), 50);
});

test('nauha rakentaa yhden viivan jokaiselle pisteelle ja vuosilaatikon', () => {
  const { selain } = koenauha();
  const rivi = selain.el.childNodes[0];
  assert.equal(rivi.className, 'aikaselain-viivat');
  assert.equal(rivi.childNodes.length, PISTEET.length);
  assert.deepEqual(rivi.childNodes.map((v) => v.dataset.id), ['a', 'b', 'c', 'd', 'e']);
  assert.deepEqual(
    rivi.childNodes.map((v) => v.style.getPropertyValue('left')),
    ['10%', '30%', '50%', '70%', '90%'],
  );
  const vuosi = selain.el.childNodes[1];
  assert.equal(vuosi.className, 'aikaselain-vuosi');
  // Oletusmuoto on tuhaterottimellinen luku; kutsuja antaa kellon muodon.
  assert.equal(vuosi.textContent, '300\u00a0000', 'tuhaterotin on katkeamaton välilyönti (talon tapa)');
  assert.equal(vuosi.style.getPropertyValue('--paikka'), '10%');
});

test('nauha kelpaa kaarelle, jolla ei ole pisteitä, palauttamalla nullin', () => {
  assert.equal(luoAikaselain({ pisteet: [] }), null);
  assert.equal(luoAikaselain({}), null);
});

/* ==================== 2. aalto ==================== */

test('aalto: valittu on korkein ja naapurit laskevat tasaisesti nollaan', () => {
  const tasot = [0, 1, 2, 3, 4].map((d) => aallonTaso(d));
  assert.equal(tasot[0], 1, 'valitun viivan taso on täysi');
  for (let i = 1; i < tasot.length; i += 1) {
    assert.ok(tasot[i] < tasot[i - 1], `taso ei laske kohdassa ${i}: ${tasot.join(', ')}`);
  }
  assert.equal(tasot[AALLON_LEVEYS + 1], 0, 'aallon ulkopuolella taso on nolla');
  // Symmetrinen: sormen kummallakin puolella sama nousu.
  assert.equal(aallonTaso(-2), aallonTaso(2));
  // Ei porrasta: viimeinen nouseva viiva on jo lähellä nollaa.
  assert.ok(tasot[AALLON_LEVEYS] < 0.2, `aallon reuna liian korkea: ${tasot[AALLON_LEVEYS]}`);
});

test('nauha piirtää aallon valitun ympärille', () => {
  const { selain } = koenauha();
  selain.aseta('c');
  const t = selain.tila();
  assert.equal(t.valittu, 'c');
  assert.equal(t.tasot[2], 1);
  assert.ok(t.tasot[1] > t.tasot[0] && t.tasot[0] > 0);
  assert.equal(t.tasot[1], t.tasot[3], 'aalto ei ole symmetrinen');
  const viivat = selain.el.childNodes[0].childNodes;
  assert.ok(viivat[2].classList.contains('valittu'));
  assert.ok(!viivat[1].classList.contains('valittu'));
  // Vuosiluku siirtyy valitun viivan päälle.
  assert.equal(selain.el.childNodes[1].style.getPropertyValue('--paikka'), '50%');
});

/* ==================== 3. veto ja napautus ==================== */

test('paikka nauhalla: sormi laidasta laitaan antaa osuuden 0…1', () => {
  // Viisi viivaa 500 px:llä: väli 100 px, ensimmäinen 50 px:ssä.
  assert.equal(osuusPaikasta(50, 500, 5), 0);
  assert.equal(osuusPaikasta(450, 500, 5), 1);
  assert.equal(Math.round(osuusPaikasta(250, 500, 5) * 1000) / 1000, 0.5);
  // Laidan yli ei mennä.
  assert.equal(osuusPaikasta(-90, 500, 5), 0);
  assert.equal(osuusPaikasta(9000, 500, 5), 1);
  // Lähin viiva pyöristyy.
  assert.equal(lahinIndeksi(0, 5), 0);
  assert.equal(lahinIndeksi(0.5, 5), 2);
  assert.equal(lahinIndeksi(1, 5), 4);
  assert.equal(lahinIndeksi(0.26, 5), 1);
});

test('veto esikatselee jatkuvasti ja valitsee vasta irrotessa', () => {
  const { selain, esikatselut, valinnat } = koenauha();
  const { el } = selain;
  el.laukaise('pointerdown', { clientX: 50 });
  assert.equal(esikatselut.length, 1, 'sormen lasku esikatselee heti');
  assert.equal(esikatselut[0].id, 'a');
  assert.equal(valinnat.length, 0, 'veto ei saa valita ennen irrotusta');
  assert.ok(el.classList.contains('vedossa'));
  assert.deepEqual(el.kaapatut, [1], 'osoitin on otettu kiinni (veto ei karkaa pallolle)');

  el.laukaise('pointermove', { clientX: 250 });
  el.laukaise('pointermove', { clientX: 260 });
  assert.equal(esikatselut.length, 3);
  assert.equal(esikatselut[1].id, 'c');
  assert.equal(selain.tila().esikatselu, 'c', 'esikatseltu viiva näkyy nauhalla');
  assert.equal(selain.tila().valittu, 'a', 'valinta ei muutu kesken vedon');
  assert.equal(valinnat.length, 0);

  el.laukaise('pointerup', { clientX: 450 });
  assert.deepEqual(valinnat, ['e'], 'irrotus lukitsee valinnan');
  assert.equal(selain.tila().vedossa, false);
  assert.equal(selain.tila().esikatselu, null);
  assert.equal(selain.tila().valittu, 'e');
  assert.deepEqual(el.kaapatut, [], 'osoitin vapautetaan irrotessa');
  assert.ok(!el.classList.contains('vedossa'));
});

test('napautus valitsee suoraan ja veto pysäyttää tapahtuman pallolta', () => {
  const { selain, valinnat } = koenauha();
  const alku = selain.el.laukaise('pointerdown', { clientX: 350 });
  const loppu = selain.el.laukaise('pointerup', { clientX: 350 });
  assert.deepEqual(valinnat, ['d']);
  assert.ok(alku.pysaytetty && alku.estetty, 'pallo ei saa vetoa nauhalta');
  assert.ok(loppu.pysaytetty);
});

test('esitys ei nykäise nauhaa kesken vedon (aseta odottaa irrotusta)', () => {
  const { selain } = koenauha();
  selain.el.laukaise('pointerdown', { clientX: 450 });
  selain.aseta('b');
  assert.equal(selain.tila().esikatselu, 'e', 'esikatselu pysyy sormen alla');
  assert.equal(selain.el.childNodes[1].style.getPropertyValue('--paikka'), '90%');
  selain.el.laukaise('pointercancel', { clientX: 450 });
});

test('nuolinäppäimet siirtävät valintaa yhden viivan', () => {
  const { selain, valinnat } = koenauha();
  selain.aseta('c');
  selain.el.laukaise('keydown', { key: 'ArrowRight' });
  assert.deepEqual(valinnat, ['d']);
  selain.el.laukaise('keydown', { key: 'ArrowLeft' });
  assert.deepEqual(valinnat, ['d', 'c']);
  // Muut näppäimet menevät ohi (Esc sulkee linssin, väli on Tauko).
  const ohi = selain.el.laukaise('keydown', { key: 'Escape' });
  assert.equal(valinnat.length, 2);
  assert.ok(!ohi.pysaytetty, 'nauha ei saa niellä muita näppäimiä');
});

test('purku irrottaa kuuntelijat ja poistaa nauhan', () => {
  const { selain, valinnat } = koenauha();
  const koti = new Elementti('div');
  koti.appendChild(selain.el);
  selain.pura();
  assert.equal(koti.childNodes.length, 0);
  selain.el.laukaise('pointerdown', { clientX: 250 });
  selain.el.laukaise('pointerup', { clientX: 250 });
  assert.deepEqual(valinnat, [], 'purettu nauha ei enää valitse mitään');
});

/* ==================== 4. moduuli ei tiedä kaaresta ==================== */

test('aikaselain ei tunne kertomusta, jaksoja eikä vanoja', () => {
  const puhdas = koodi(MODUULI);
  for (const sana of ['kertomus', 'jakso', 'vana', 'ihmisen', 'kello', 'kamera', 'pito']) {
    assert.ok(!new RegExp(sana, 'i').test(puhdas),
      `js/linssit/aikaselain.js viittaa kaareen sanalla "${sana}" — moduulin on `
      + 'kelvattava sellaisenaan tuleville linsseille (Raamattu: "Sama elementti '
      + 'toimisi tulevissakin linsseissä")');
  }
  // Ei myöskään tuonteja: pinta seisoo omillaan.
  assert.ok(!/^import\s/m.test(puhdas), 'aikaselain ei saa tuoda mitään');
});

/* ==================== 5. kelauksen lukema ==================== */

test('kelauksen lukema: nauhan päät ovat kaanonin päät', () => {
  const k = IHMISEN_MATKA_KERTOMUS;
  assert.equal(kelauksenLukema(k, 0), k[0].vuosia);
  assert.equal(kelauksenLukema(k, 1), k[k.length - 1].vuosia);
  // Jokainen viiva osuu tarkalleen jaksonsa lukemaan.
  for (let i = 0; i < k.length; i += 1) {
    const osuus = i / (k.length - 1);
    assert.ok(Math.abs(kelauksenLukema(k, osuus) - k[i].vuosia) < 1e-6,
      `viiva ${i} (${k[i].id}) antaa ${kelauksenLukema(k, osuus)} eikä ${k[i].vuosia}`);
  }
});

test('kelauksen lukema kulkee viivojen välissä geometrisesti', () => {
  const kaari = [{ vuosia: 100000 }, { vuosia: 10000 }, { vuosia: 0 }];
  // Puoliväli ensimmäisellä välillä: geometrinen keskiarvo, ei 55 000.
  assert.equal(Math.round(kelauksenLukema(kaari, 0.25)), 31623);
  // Nollapää menee suoraan (logaritmi ei kestä nollaa).
  assert.equal(kelauksenLukema(kaari, 0.75), 5000);
  // Roskaa ei päästetä läpi.
  assert.equal(kelauksenLukema([], 0.5), 0);
  assert.equal(kelauksenLukema(null, 0.5), 0);
  assert.equal(kelauksenLukema(kaari, -5), 100000);
  assert.equal(kelauksenLukema(kaari, 12), 0);
});

test('kaanonin taaksepäin kulkevat välit eivät riko kelausta', () => {
  const k = IHMISEN_MATKA_KERTOMUS;
  // Ainoa taaksepäin kulkeva väli on tarkoituksellinen aikahyppy
  // (8.9.2026: Blombosin jakso poistui, joten Etelä-Afrikassa käydään
  // kerran eikä kello käänny siellä): Chile (14 500) → aikahyppy
  // (50 000): lukema kasvaa välissä.
  const i = k.findIndex((j) => j.id === 'chile');
  assert.ok(i > 0, 'kaanonista ei löydy chile-jaksoa');
  assert.equal(k[i + 1]?.id, 'aikahyppy', 'chilen jälkeen pitää tulla aikahyppy');
  const a = kelauksenLukema(k, i / (k.length - 1));
  const puoli = kelauksenLukema(k, (i + 0.5) / (k.length - 1));
  const b = kelauksenLukema(k, (i + 1) / (k.length - 1));
  assert.equal(a, 14500);
  assert.equal(b, 50000);
  assert.ok(puoli > a && puoli < b, `välilukema ${puoli} ei ole 14 500:n ja 50 000:n välissä`);
  // Muualla kello ei kulje taaksepäin (aikahyppyä lukuun ottamatta).
  for (let j = 1; j < k.length; j += 1) {
    if (k[j].id === 'aikahyppy') continue;
    assert.ok(k[j].vuosia <= k[j - 1].vuosia, `${k[j - 1].id} → ${k[j].id} kulkee taaksepäin`);
  }
});

/* ==================== 6. kytkentä ja mitat ==================== */

test('moottori antaa nauhan kertomuskaarelle, ei keksintölinssille', () => {
  const puhdas = koodi(AIKAJANA);
  assert.match(puhdas, /rakennaAikaselain\(\)/, 'moottorista puuttuu rakennaAikaselain');
  // Nauha syntyy vain palkin (kertomuskaaren) mukana.
  const palkki = puhdas.slice(puhdas.indexOf('rakennaPalkki(ylarivi, ohjaimet)'));
  // Ikkuna levisi 8.9.2026, kun palkkiin tuli hampurilaisvalikko
  // (js/aikajana-valikko.js) rakennaPalkin ja kertomuslisien väliin.
  assert.match(palkki.slice(0, 2800), /this\.rakennaAikaselain\(\)/,
    'aikaselain ei synny rakennaPalkin mukana (kertomuskaari)');
  assert.match(puhdas, /if \(!kertomus\.length \|\| !this\.juuri\) return false;/,
    'rakennaAikaselain ei tarkista kertomusta');
  // Purku vie nauhan ja body-luokan.
  assert.match(puhdas, /this\.aikaselain\?\.pura\?\.\(\)/, 'purku ei pura nauhaa');
  assert.match(puhdas, /classList\.remove\('aikaselain-auki'\)/, 'purku jättää body-luokan');
});

test('esitys kytkeytyy nauhaan kahdella kutsulla, ei enemmällä', () => {
  const puhdas = koodi(ESITYS);
  assert.match(puhdas, /function esikatsele\(osuus\)/);
  assert.match(puhdas, /function valitse\(id\)/);
  // Veto vaientaa kertojan ja katkaisee pidon; valinta panee pidon takaisin.
  const veto = puhdas.slice(puhdas.indexOf('function esikatsele(osuus)'), puhdas.indexOf('function valitse(id)'));
  assert.match(veto, /tila\.aani\?\.pause\(\)/, 'veto ei vaienna kertojaa');
  assert.match(veto, /asetaPito\?\.\(false\)/, 'veto ei katkaise pitoa');
  assert.match(veto, /oliTauolla: !tila\.kaynnissa/, 'veto ei muista, oliko pelaaja tauolla');
  const valinta = puhdas.slice(puhdas.indexOf('function valitse(id)'));
  assert.match(valinta.slice(0, 1600), /asetaPito\?\.\(true\)/, 'valinta ei palauta pitoa');
  assert.match(valinta.slice(0, 1600), /selaus\?\.oliTauolla/,
    'valinta ei kunnioita pelaajan omaa taukoa');
});

test('nauha on ruudun alalaidassa ja muut väistävät sitä', () => {
  assert.match(CSS, /body\.aikaselain-auki \{ --aikaselain-korkeus: \d+px; \}/,
    'nauhan korkeus ei ole yhtenä lukuna body-muuttujassa');
  assert.match(CSS, /\.aikaselain \{[^}]*bottom: 0;/s, 'nauha ei ole alalaidassa');
  assert.match(CSS, /\.aikaselain \{[^}]*touch-action: none;/s,
    'nauha ei omi vetoa (selain tulkitsisi sen vieritykseksi)');
  assert.match(CSS, /\.aikajana\.esitys-pimea \.aikaselain \{[^}]*opacity: 0/s,
    'nauha näkyy pimeässä alussa');
  assert.match(CSS, /\.aikaselain-kertomusteksti|aikajana-kertomusteksti \{\s*\n\s*bottom: calc\(var\(--aikaselain-korkeus/,
    'kertojan teksti ei väistä nauhaa');
  assert.match(TUTKIMUS_CSS, /body\.aikaselain-auki \.ihmisen-vanalappu/,
    'pergamenttilappu ei väistä nauhaa');
  assert.match(TUTKIMUS_CSS, /body\.aikaselain-auki \.ihmisen-nostokortti/,
    'noston kortti ei väistä nauhaa');
  // Liike on pehmeää ja vähennetty liike katkaisee sen.
  assert.match(CSS, /\.aikaselain-viiva \{[^}]*transition: height 240ms/s);
  assert.match(CSS, /prefers-reduced-motion: reduce\) \{\s*\n\s*\.aikaselain,/);
});

test('puhelimella kaikki viivat mahtuvat nauhalle', () => {
  // 390 px:n ruutu, kaanonin 21 jaksoa: väli on noin 19 px eli sormen
  // erottama (omistajan mitta tehtävänannossa).
  const maara = IHMISEN_MATKA_KERTOMUS.length;
  const vali = 390 / maara;
  assert.ok(maara >= 20 && maara <= 30, `jaksoja ${maara} — nauhan mitat on laskettu 21:lle`);
  assert.ok(vali >= 12 && vali <= 20, `viivaväli puhelimella ${vali.toFixed(1)} px`);
  // Viivan leveys on 2–3 px, joten väliin jää tyhjää.
  assert.match(CSS, /\.aikaselain-viiva \{[^}]*width: 2px;/s);
});
