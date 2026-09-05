import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * PALLOLAUTA, VAIHE 4: LINSSIKARTTA (docs/moduulit/karttapallo.md luku 5
 * "Linssikartalle ja takaisin", luku 7 rivi 4; Raamattu KARTTAPALLO ON
 * PELILAUTA, LINSSIT VANHALLA KARTALLA ja LINSSI BLOKKAA MUUN).
 *
 * Vartioi: (1) kamera synkassa molempiin suuntiin ±5 % — pallon näkymä
 * kartalle avattaessa, kartan viimeinen näkymä pallolle suljettaessa;
 * (2) purku jättää svg#boardin tyhjäksi ja kartan lepotilaan;
 * (3) Liiku ja lehdet estetty kuoressa, sulkeminen palauttaa;
 * (4) valinta null palauttaa pallon; (5) pallon oma linssi ei ole
 * laukussa pallolaudalla eikä vaiheen 1 "Palaa pallolle" ole jäljellä.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

const {
  LINSSIKARTAN_SIIRTYMA_MS, kartanNakymaPallolle, luoLinssikartta, pallonNakymaKartalle,
} = await import('../js/pallolauta/linssikartta.js');
const { korkeusLeveydesta, leveysKorkeudesta } = await import('../js/pallolauta/kamera.js');

/* ---------- pieni DOM-jäljitelmä: luokat, lapset, attribuutit ---------- */
function solmu(tag = 'div') {
  const luokat = new Set();
  const el = {
    tag,
    lapset: [],
    vanhempi: null,
    attribuutit: {},
    kuuntelijat: {},
    textContent: '',
    hidden: false,
    style: {},
    clientWidth: 390,
    get className() { return [...luokat].join(' '); },
    set className(v) { luokat.clear(); for (const l of String(v).split(/\s+/)) if (l) luokat.add(l); },
    classList: {
      add: (...l) => l.forEach((x) => luokat.add(x)),
      remove: (...l) => l.forEach((x) => luokat.delete(x)),
      contains: (x) => luokat.has(x),
    },
    setAttribute(k, v) { el.attribuutit[k] = String(v); },
    addEventListener(t, f) { (el.kuuntelijat[t] ??= []).push(f); },
    click() { for (const f of el.kuuntelijat.click ?? []) f({}); },
    append(...lapset) { for (const l of lapset) el.appendChild(l); },
    appendChild(l) { l.vanhempi?.lapset.splice(l.vanhempi.lapset.indexOf(l), 1); l.vanhempi = el; el.lapset.push(l); return l; },
    remove() { if (el.vanhempi) { el.vanhempi.lapset.splice(el.vanhempi.lapset.indexOf(el), 1); el.vanhempi = null; } },
    getBoundingClientRect() { return { width: 390, height: 700 }; },
    querySelector(valitsin) {
      const luokka = valitsin.replace(/^\./, '');
      const etsi = (x) => {
        if (x !== el && x.classList.contains(luokka)) return x;
        for (const l of x.lapset) { const t = etsi(l); if (t) return t; }
        return null;
      };
      return etsi(el);
    },
  };
  return el;
}
const doc = { body: solmu('body'), createElement: (tag) => solmu(tag) };

/** Pelin ja lautojen jäljitelmä: kamerat kirjaavat ajonsa. */
function rakennaYmparisto({ reducedMotion = true, pallonNakyma = { x: 6200, y: 2600, leveys: 240 } } = {}) {
  const kutsut = { kartta: [], pallo: [], render: 0, suljeLiuku: 0 };
  const ui = {
    dead: false,
    reducedMotion,
    busy: false,
    movingPlayerId: null,
    linssikartta: null,
    linssiValittu: null,
    liukuAuki: false,
    game: { cityOf: () => ({ id: 'ateena' }) },
    mapPane: solmu('section'),
    svg: { textContent: '' },
    render() { kutsut.render += 1; },
    suljeLiuku() { kutsut.suljeLiuku += 1; ui.liukuAuki = false; },
    paallaOlevaLinssi: () => (ui.linssiValittu ? { nimi: 'Maiden tiedot', lyhyt: 'Napauta maata.' } : null),
    valitseLinssi(tunnus) { ui.linssiValittu = tunnus; if (!tunnus) ui.suljeLinssikartta(); },
    suljeLinssikartta: () => lauta.linssikartta.sulje(),
    puraLauta() { ui.svg.textContent = ''; },
    kartta: {
      lepotila: true,
      // Kartan kirjattu näkymä: keskipiste + skaala (px / lautayksikkö).
      tila: null,
      heraa() { if (!this.lepotila) return false; this.lepotila = false; ui.svg.textContent = '<g class="cities"/>'; return true; },
      nuku() { if (this.lepotila) return false; this.lepotila = true; ui.puraLauta(); return true; },
      ajaKamera(kohde, valinnat) {
        if (this.lepotila) return Promise.resolve(false);
        kutsut.kartta.push({ kohde, valinnat });
        this.tila = { x: kohde.x, y: kohde.y, skaala: ui.mapPane.clientWidth / kohde.leveys };
        return Promise.resolve(true);
      },
      kameranTila() { return this.tila; },
    },
  };
  const kuori = solmu('div');
  kuori.className = 'pallo-kuori pallolauta esilla';
  ui.mapPane.appendChild(kuori);
  const lauta = {
    kuori,
    kamera: {
      nakyma: { ...pallonNakyma },
      kameranTila() { return { ...this.nakyma, korkeus: korkeusLeveydesta(this.nakyma.leveys) }; },
      ajaKamera(kohde, valinnat) { kutsut.pallo.push({ kohde, valinnat }); this.nakyma = { x: kohde.x, y: kohde.y, leveys: kohde.leveys }; return Promise.resolve(true); },
      kotiin() { kutsut.pallo.push({ kotiin: true }); return Promise.resolve(true); },
    },
    nayta() { kuori.hidden = false; },
    piilota() { kuori.hidden = true; },
  };
  lauta.linssikartta = luoLinssikartta({ ui, lauta, doc });
  return { ui, lauta, kutsut };
}

const lahella = (a, b, suhde = 0.05) => Math.abs(a - b) <= Math.abs(b) * suhde;

test('kamera synkassa molempiin suuntiin ±5 %: pallo → kartta avattaessa, kartta → pallo suljettaessa', () => {
  const { ui, lauta, kutsut } = rakennaYmparisto();
  assert.equal(lauta.linssikartta.avaa({ linssi: true }), true);
  ui.linssiValittu = 'maatiedot';
  // Avaus: kartta herää ja saa pallon näkymän kestolla 0.
  assert.equal(ui.kartta.lepotila, false);
  assert.equal(kutsut.kartta.length, 1);
  const avaus = kutsut.kartta[0];
  assert.deepEqual(avaus.valinnat, { kesto: 0 });
  assert.ok(lahella(avaus.kohde.x, 6200) && lahella(avaus.kohde.y, 2600) && lahella(avaus.kohde.leveys, 240), JSON.stringify(avaus));
  assert.ok(doc.body.classList.contains('linssikartta-auki'));
  assert.ok(ui.linssikartta?.linssi === true && ui.linssikartta.lahto === 'ateena');
  // Pelaaja panoroi ja zoomaa linssikartalla: kartan näkymä muuttuu.
  void ui.kartta.ajaKamera({ x: 5100, y: 2100, leveys: 900 }, { kesto: 0 });
  const kartanTila = ui.kartta.kameranTila();
  // Sulku: pallo saa kartan viimeisen näkymän kestolla 0 ennen purkua.
  assert.equal(lauta.linssikartta.sulje(), true);
  const paluu = kutsut.pallo.at(-1);
  assert.deepEqual(paluu.valinnat, { kesto: 0 });
  const odotettu = kartanNakymaPallolle(kartanTila, ui.mapPane.clientWidth);
  assert.ok(lahella(paluu.kohde.x, 5100) && lahella(paluu.kohde.y, 2100) && lahella(paluu.kohde.leveys, 900), JSON.stringify(paluu));
  assert.ok(lahella(paluu.kohde.leveys, odotettu.leveys, 0.001));
  // Sama leveys pallon korkeutena: kaava on käänteinen ±0,1 % (kamera.js).
  assert.ok(lahella(leveysKorkeudesta(korkeusLeveydesta(paluu.kohde.leveys)), 900, 0.001));
  // Apurit: puutteellinen tila ei tuota ajoa.
  assert.equal(pallonNakymaKartalle(null), null);
  assert.equal(pallonNakymaKartalle({ x: 1, y: 2, leveys: 0 }), null);
  assert.equal(kartanNakymaPallolle({ x: 1, y: 2, skaala: 0 }, 390), null);
  assert.equal(kartanNakymaPallolle({ x: 1, y: 2, skaala: 2 }, 0), null);
  assert.deepEqual(kartanNakymaPallolle({ x: 10, y: 20, skaala: 2 }, 390), { x: 10, y: 20, leveys: 195 });
});

test('purku jättää svg#boardin tyhjäksi ja kartan lepotilaan; kehys ja body-luokka poistuvat', () => {
  const { ui, lauta } = rakennaYmparisto();
  lauta.linssikartta.avaa({ linssi: true });
  ui.linssiValittu = 'maatiedot';
  assert.notEqual(ui.svg.textContent, '', 'kartta piirtyi kuoreen');
  // Kehys karttaruudussa: otsikko, selite ja Sulje; pallo häipyi ja piiloutui (reduced motion: heti).
  const kehys = ui.mapPane.querySelector('.linssikartta-kehys');
  assert.ok(kehys && kehys.classList.contains('esilla'));
  lauta.linssikartta.paivita();
  assert.equal(kehys.querySelector('.linssikartta-nimi').textContent, 'Maiden tiedot');
  assert.equal(kehys.querySelector('.linssikartta-selite').textContent, 'Napauta maata.');
  assert.ok(kehys.querySelector('.linssikartta-sulje'));
  assert.equal(lauta.kuori.hidden, true, 'pallo piilossa kuoren aikana (render tauolle)');
  assert.ok(lauta.kuori.classList.contains('linssin-alla'));
  // Sulje-nappi = "Ei linssiä" → valitseLinssi(null) → sulje.
  kehys.querySelector('.linssikartta-sulje').click();
  assert.equal(ui.linssiValittu, null);
  assert.equal(ui.linssikartta, null);
  assert.equal(ui.kartta.lepotila, true);
  assert.equal(ui.svg.textContent, '', 'purku jättää svg#boardin tyhjäksi');
  assert.equal(ui.mapPane.querySelector('.linssikartta-kehys'), null, 'kehys poistui');
  assert.equal(doc.body.classList.contains('linssikartta-auki'), false);
  assert.equal(lauta.kuori.hidden, false);
  assert.equal(lauta.kuori.classList.contains('linssin-alla'), false, 'pallo häivytettiin takaisin');
  // Toinen sulku ei tee mitään; pura on idempotentti.
  assert.equal(lauta.linssikartta.sulje(), false);
  lauta.linssikartta.pura();
  assert.equal(ui.linssikartta, null);
});

test('häivytys animoidaan ilman reduced motionia: tila vaihtuu heti, piilotus ja purku vasta siirtymän jälkeen', async () => {
  assert.equal(LINSSIKARTAN_SIIRTYMA_MS, 250);
  const { ui, lauta } = rakennaYmparisto({ reducedMotion: false });
  lauta.linssikartta.avaa({ linssi: true });
  assert.equal(ui.kartta.lepotila, false, 'kartta herää heti');
  assert.equal(lauta.kuori.hidden, false, 'pallo vielä näkyvissä häipymässä');
  assert.ok(lauta.kuori.classList.contains('linssin-alla'));
  await new Promise((r) => setTimeout(r, LINSSIKARTAN_SIIRTYMA_MS + 40));
  assert.equal(lauta.kuori.hidden, true, 'pallo piiloon häivytyksen jälkeen');
  lauta.linssikartta.sulje();
  assert.equal(ui.linssikartta, null, 'tila vaihtuu heti');
  assert.equal(lauta.kuori.hidden, false);
  assert.equal(ui.kartta.lepotila, false, 'kartta puretaan vasta pallon peittäessä sen');
  assert.notEqual(ui.svg.textContent, '');
  await new Promise((r) => setTimeout(r, LINSSIKARTAN_SIIRTYMA_MS + 40));
  assert.equal(ui.kartta.lepotila, true);
  assert.equal(ui.svg.textContent, '');
  assert.equal(ui.mapPane.querySelector('.linssikartta-kehys'), null);
});

test('kesken siirtoanimaation kuorta ei suljeta; avaus kesken sulkua ei jätä kehystä eikä katkaise karttaa', async () => {
  const { ui, lauta } = rakennaYmparisto({ reducedMotion: false });
  lauta.linssikartta.avaa({ linssi: true });
  ui.movingPlayerId = 1;
  assert.equal(lauta.linssikartta.sulje(), false);
  ui.movingPlayerId = null;
  assert.equal(lauta.linssikartta.sulje(), true);
  // Uusi avaus ennen kuin häivytys on ohi: vanha kehys poistuu, kartta jää hereille.
  assert.equal(lauta.linssikartta.avaa({ linssi: true }), true);
  await new Promise((r) => setTimeout(r, LINSSIKARTAN_SIIRTYMA_MS + 40));
  assert.equal(ui.kartta.lepotila, false, 'peruttu purku ei aja');
  assert.equal(ui.mapPane.lapset.filter((l) => l.classList.contains('linssikartta-kehys')).length, 1);
  lauta.linssikartta.pura();
  assert.equal(ui.mapPane.querySelector('.linssikartta-kehys'), null);
});

test('Liiku ja lehdet estetty kuoressa; valinta null palauttaa pallon; pallon linssi ei ole laukussa (tekstivartijat)', () => {
  const ui = lue('../js/ui.js');
  // Yksi portti, yksi kenttä.
  assert.match(ui, /^  linssikarttaEstaa\(\) \{\n    return Boolean\(this\.linssikartta\);\n  \}/m);
  const liiku = ui.match(/ {2}vaihdaLiuku\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(liiku, /if \(this\.linssikarttaEstaa\(\)\) return;/, 'Liiku ei ole kiinni kuoressa');
  const tutkinta = ui.match(/ {2}avaaTutkinta\(city = this\.game\.cityOf\(\)\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(tutkinta, /if \(this\.linssikarttaEstaa\(\)\) return;/, 'kaupungin napautus ja Tutki eivät ole kiinni kuoressa');
  assert.match(ui, /\|\| this\.linssikarttaEstaa\(\);\n/, 'Matkusta-nappi ei harmaannu kuoressa');
  assert.match(ui, /if \(this\.linssikarttaEstaa\(\)\) stayBtn\.disabled = true;/);
  // Valinta null sulkee kuoren; linssi avaa sen; kuori delegoi moduulille.
  assert.match(ui, /if \(tunnus && this\.pallolautaPaalla\(\)\) this\.avaaLinssikartta\(\{ linssi: true \}\);/);
  assert.match(ui, /else if \(!tunnus && this\.linssikartta\?\.linssi\) this\.suljeLinssikartta\(\);/);
  assert.match(ui, /return Boolean\(this\.pallolauta\.linssikartta\?\.avaa\(tiedot\)\);/);
  assert.match(ui, /return Boolean\(this\.pallolauta\.linssikartta\?\.sulje\(\)\);/);
  // Aikajanan oma Sulje päättää linssin pallolaudalla.
  assert.match(ui, /if \(this\.linssikartta\?\.linssi && tunnus && this\.linssiValittu === tunnus\) this\.valitseLinssi\(null\);/);
  // Muistettu linssi ei jää valituksi ilman kuorta.
  assert.match(ui, /if \(haluttu && !this\.linssikartta\) \{\n\s+this\.linssiValittu = null;\n\s+tallennaLinssi\(null\);/);
  // Pallon oma linssi ei näy laukussa pallolaudalla (v1554).
  assert.match(ui, /&& !\(pallolauta && linssi\.tunnus === 'pallo'\)/);
  // Vaiheen 1 väliaikainen "Palaa pallolle" on poissa; kuori on moduulissa.
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.ok(!lauta.includes('Palaa pallolle') && !lauta.includes('linssikartta-palaa'));
  assert.match(lauta, /lauta\.linssikartta = luoLinssikartta\(\{ ui, lauta \}\);/);
  assert.match(lauta, /lauta\.linssikartta\?\.pura\(\);/);
  const css = lue('../css/styles.css');
  assert.ok(!css.includes('.linssikartta-palaa'));
  for (const luokka of ['.linssikartta-kehys', '.linssikartta-otsikko', '.linssikartta-sulje', '.pallo-kuori.pallolauta.linssin-alla']) {
    assert.ok(css.includes(luokka), `${luokka} puuttuu CSS:stä`);
  }
  assert.match(css, /\.linssikartta-kehys \{[^}]*transition: opacity 250ms ease;/);
  assert.match(css, /\.pallo-kuori\.pallolauta, \.linssikartta-kehys \{ transition: none; \}/, 'reduced motion → 0');
  assert.match(css, /body\.radio-tila \.linssikartta-kehys, body\.aikajana-paalla \.linssikartta-kehys \{ display: none; \}/);
  // SHELL ja dist: moduuli on SW:n kuoressa eikä yhden tiedoston versiossa.
  assert.match(lue('../sw.js'), /'\.\/js\/pallolauta\/linssikartta\.js'/);
  assert.ok(!lue('../tools/build-standalone.mjs').includes('js/pallolauta/'));
  // Moduuli ei tuo ui.js:ää eikä käytä suodattimia.
  const moduuli = lue('../js/pallolauta/linssikartta.js');
  assert.ok(!moduuli.includes("from '../ui.js'") && !/filter/.test(moduuli));
});
