import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { luoMerkit, luoMerkkienNakyvyysTahdistus } from '../js/pallolauta/merkit.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

function ymparisto(t, siirtyma) {
  class Luokat {
    constructor() { this.arvot = new Set(); }
    add(...xs) { xs.forEach((x) => this.arvot.add(x)); }
    remove(...xs) { xs.forEach((x) => this.arvot.delete(x)); }
    contains(x) { return this.arvot.has(x); }
    toggle(x, paalla) { if (paalla) this.add(x); else this.remove(x); }
  }
  class El {
    constructor() { this.classList = new Luokat(); this.children = []; this.dataset = {}; this.isConnected = true; }
    appendChild(el) { this.children.push(el); return el; }
    setAttribute() {}
    querySelector() { return null; }
  }
  const ennen = Object.getOwnPropertyDescriptor(globalThis, 'document');
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: { createElement: () => new El(), createElementNS: () => new El() },
  });
  t.after(() => (ennen
    ? Object.defineProperty(globalThis, 'document', ennen)
    : delete globalThis.document));

  let muunnin = null;
  let data = [];
  let kirjoituksia = 0;
  let kameraKutsuja = 0;
  let paivitysJonossa = false;
  let tweenit = [];
  const edessa = new Set(['nappula', 'kohde:uusi']);
  const pallo = {
    paused: false,
    htmlElementsData(uusi) {
      if (uusi === undefined) return data;
      data = uusi; kirjoituksia += 1;
      // Globe.gl/Kapsule 2.46.2 sulauttaa prop-päivitykset 1 ms jonoon.
      paivitysJonossa = true;
      return this;
    },
    htmlLat() { return this; }, htmlLng() { return this; }, htmlAltitude() { return this; },
    htmlElement(fn) { this.elementti = fn; return this; },
    htmlTransitionDuration() { return this; },
    htmlElementVisibilityModifier(fn) { muunnin = fn; return this; },
    pointOfView() { kameraKutsuja += 1; return {}; },
  };
  const puraPaivitysjono = () => {
    if (!paivitysJonossa) return;
    paivitysJonossa = false;
    for (const d of data) {
      if (!d.el) {
        d.el = pallo.elementti(d);
        d.__kohdeValmis = true;
        muunnin?.(d.el, edessa.has(d.avain));
      } else if (d.__kohdeValmis) {
        // Retained datum saa saman kohteen tweenin; visibilityModifier
        // ajetaan seuraavalla resumed tweenGroup.update -kierroksella.
        tweenit.push(() => muunnin?.(d.el, edessa.has(d.avain)));
      }
    }
  };
  const piirraHeraamisenFrame = () => {
    const nykyiset = tweenit; tweenit = [];
    nykyiset.forEach((fn) => fn());
  };
  const merkit = luoMerkit({
    pallo,
    ui: { game: { player: {} }, pawnShape() {} },
    siirtyma,
    asteet: ({ x, y }) => ({ lat: y, lon: x }),
  });
  return {
    pallo, merkit, data: () => data, kirjoituksia: () => kirjoituksia,
    kameraKutsuja: () => kameraKutsuja, puraPaivitysjono, piirraHeraamisenFrame,
  };
}

for (const [nimi, siirtyma] of [['tavallinen', 250], ['reduced motion', 0]]) {
  test(`lehden sulku tahdistaa HTML-merkkien näkyvyyden seuraavalla framella: ${nimi}`, (t) => {
    const e = ymparisto(t, siirtyma);
    e.merkit.paivita({ nappula: { x: 0, y: 0 } });
    e.puraPaivitysjono();
    e.pallo.paused = true;
    e.merkit.paivita({ nappula: { x: 0, y: 0 }, kohteet: [
      { key: 'uusi', x: 1, y: 1 },
      { key: 'taka', x: 2, y: 2 },
    ] });
    e.puraPaivitysjono();
    // Nukkuva renderer jätti sekä ennestään olleen nappulan että juuri
    // lisätyt kohteet vanhaan takana-tilaan.
    for (const d of e.data()) d.el.classList.add('pallolauta-takana');

    const framet = new Map(); let id = 0;
    const tahdistus = luoMerkkienNakyvyysTahdistus({
      paivita: e.merkit.tahdistaNakyvyys,
      requestFrame: (fn) => { framet.set(++id, fn); return id; },
      cancelFrame: (avain) => framet.delete(avain),
    });
    const lehti = { open: true };
    const observer = () => {
      if (!lehti.open) { e.pallo.paused = false; tahdistus.ajasta(); }
    };

    lehti.open = false;
    observer();
    assert.equal(framet.size, 1, 'sulku ajoittaa yhden näkyvyyspäivityksen');
    assert.ok(e.data().every((d) => d.el.classList.contains('pallolauta-takana')),
      'tila on vielä jäätynyt ennen seuraavaa framea');
    const ennen = e.kirjoituksia();
    [...framet.values()][0](); framet.clear();
    // Ensimmäinen resumed frame voi osua ennen Kapsulen 1 ms digestia.
    e.piirraHeraamisenFrame();
    assert.equal(e.data().find((d) => d.avain === 'kohde:uusi')
      .el.classList.contains('pallolauta-takana'), true,
    'ensimmäinen resumed frame saa vielä edeltää kirjaston digestia');
    e.puraPaivitysjono();
    e.piirraHeraamisenFrame();

    const merkit = Object.fromEntries(e.data().map((d) => [d.avain, d.el]));
    assert.equal(merkit.nappula.classList.contains('pallolauta-takana'), false);
    assert.equal(merkit['kohde:uusi'].classList.contains('pallolauta-takana'), false);
    assert.equal(merkit['kohde:taka'].classList.contains('pallolauta-takana'), true,
      'aidosti takapuolinen merkki säilyy piilossa');
    assert.equal(e.kirjoituksia(), ennen + 1, 'sama HTML-data invalidioidaan kerran');
    assert.equal(e.kameraKutsuja(), 0, 'korjaus ei lue eikä muuta kameraa');
    tahdistus.pura(); e.merkit.pura();
  });

  test(`first-load/arrival tahdistaa etu/taka-tilan vasta kamera-ajon jälkeen: ${nimi}`, async (t) => {
    const e = ymparisto(t, siirtyma);
    e.merkit.paivita({ nappula: { x: 0, y: 0 }, kohteet: [
      { key: 'uusi', x: 1, y: 1 },
      { key: 'taka', x: 2, y: 2 },
    ] });
    e.puraPaivitysjono();
    for (const d of e.data()) d.el.classList.add('pallolauta-takana');

    const framet = new Map(); let id = 0;
    const tahdistus = luoMerkkienNakyvyysTahdistus({
      paivita: e.merkit.tahdistaNakyvyys,
      requestFrame: (fn) => { framet.set(++id, fn); return id; },
      cancelFrame: (avain) => framet.delete(avain),
    });
    let kameraValmis;
    const kameraAjo = new Promise((valmis) => { kameraValmis = valmis; });
    const saapuminen = tahdistus.kameranJalkeen(kameraAjo);
    assert.equal(framet.size, 0, 'näkyvyyttä ei lasketa kesken kamera-ajon');
    kameraValmis('perillä');
    assert.equal(await saapuminen, 'perillä');
    assert.equal(framet.size, 1, 'kameran maali ajoittaa yhden invalidoinnin');

    [...framet.values()][0](); framet.clear();
    e.puraPaivitysjono();
    e.piirraHeraamisenFrame();
    const merkit = Object.fromEntries(e.data().map((d) => [d.avain, d.el]));
    assert.equal(merkit.nappula.classList.contains('pallolauta-takana'), false);
    assert.equal(merkit['kohde:uusi'].classList.contains('pallolauta-takana'), false);
    assert.equal(merkit['kohde:taka'].classList.contains('pallolauta-takana'), true,
      'aidosti takapuolinen merkki säilyy piilossa myös saapumisessa');
    assert.equal(e.kameraKutsuja(), 0, 'invalidointi ei tee fake-kameranliikettä');
    tahdistus.pura(); e.merkit.pura();
  });
}

test('purku ennen sovelluksen näkyvyysframea peruu invalidoinnin', (t) => {
  const e = ymparisto(t, 250);
  e.merkit.paivita({ nappula: { x: 0, y: 0 } });
  e.puraPaivitysjono();
  const framet = new Map(); let id = 0;
  const tahdistus = luoMerkkienNakyvyysTahdistus({
    paivita: e.merkit.tahdistaNakyvyys,
    requestFrame: (fn) => { framet.set(++id, fn); return id; },
    cancelFrame: (avain) => framet.delete(avain),
  });
  const ennen = e.kirjoituksia();
  tahdistus.ajasta();
  tahdistus.pura();
  assert.equal(framet.size, 0);
  assert.equal(e.kirjoituksia(), ennen, 'purettu lauta ei kirjoita dataa jälkikäteen');
  e.merkit.pura();
});

test('purku kesken kamera-ajon estää myöhäisen first-load-invalidoinnin', async (t) => {
  const e = ymparisto(t, 250);
  const framet = new Map(); let id = 0; let kameraValmis;
  const tahdistus = luoMerkkienNakyvyysTahdistus({
    paivita: e.merkit.tahdistaNakyvyys,
    requestFrame: (fn) => { framet.set(++id, fn); return id; },
    cancelFrame: (avain) => framet.delete(avain),
  });
  const saapuminen = tahdistus.kameranJalkeen(new Promise((valmis) => { kameraValmis = valmis; }));
  tahdistus.pura();
  kameraValmis();
  await saapuminen;
  assert.equal(framet.size, 0, 'purettu lauta ei herää myöhäisestä kameran maalista');
  e.merkit.pura();
});

test('pallolaudan herääminen käyttää näkyvyystahdistusta ja purkaa odottavan framen', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /merkkienNakyvyys\.ajasta\(\);\n\s*pallo\.resumeAnimation\?\.\(\);\n\s*tahdistaSiirtymanJalkeen\(\);/,
    'invalidointi jonotetaan ennen Globe.gl:n ensimmäistä herätysframea');
  assert.match(lauta, /const tahdistaLepo = \(\) => \{ if \(lepoTarpeen\(\)\) lepaa\(\); else heraa\(\); \};/);
  assert.match(lauta, /new MutationObserver\(tahdistaLepo\)/,
    'lehden open-attribuutin observer kulkee heräämisen kautta');
  assert.match(lauta, /luoMerkkienNakyvyysTahdistus\(\{ paivita: merkit\.tahdistaNakyvyys \}\)/);
  assert.match(lauta, /return merkkienNakyvyys\.kameranJalkeen\(kamera\.kotiin\(\{ kesto, bbox \}\)\);/,
    'first-load ja saapuminen tahdistavat merkit kamera-ajon jälkeen');
  assert.match(lauta, /maanLaatikko = bbox;\n\s*tahdistaZoomirajat\(\);\n\s*return merkkienNakyvyys\.kameranJalkeen/,
    'karttauudistuksen maan laatikko ja zoomirajat säilyvät ennen kamera-ajoa');
  assert.match(lauta, /merkkienNakyvyys\.pura\(\);\n\s*merkit\.pura\(\);/);
});
