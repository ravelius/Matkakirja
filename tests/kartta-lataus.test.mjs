/*
 * TASOKARTAN LAISKOITUS (erä 5b; omistaja 5.9.2026 ilta: *"laita
 * laiskoitus työn alle"*; docs/moduulit/karttapallo.md luvut 3, 5b ja
 * 10.3).
 *
 * Vaiheessa 1 tasokartta pantiin lepotilaan: pallolaudalla se ei piirrä
 * mitään. Lataus jäi silti maksettavaksi, koska js/ui.js toi
 * js/kartta.js:n ja sen omat aineistopakat STAATTISESTI — 0,89 Mt
 * lähdekoodia joka käynnistyksessä. Nyt ne tulevat yhdestä portista
 * (js/kartta-lataus.js), ja ui.kartta on siihen asti nukkuva sijaisolio.
 *
 * Nämä vartiot pitävät laiskoituksen paikallaan:
 *   1. js/ui.js ei tuo laiskoitettuja moduuleja staattisesti, eikä
 *      kukaan muukaan js/-moduuli — yksi staattinen tuonti palauttaisi
 *      koko kuorman takaisin käynnistykseen hiljaa.
 *   2. Sijaisen rajapinta KATTAA sen, mitä js/ui.js kartalta kutsuu:
 *      jokainen `this.kartta.X` on joko NukkuvaKartan jäsen tai
 *      valinnaisella kutsulla (`?.`) suojattu. Ilman tätä uusi
 *      kutsupaikka kaatuisi pallolaudalla TypeErroriin.
 *   3. Nukkuvat tyngät ovat oikeasti tynkiä: jokaisen on löydyttävä myös
 *      js/kartta.js:stä, tai tynkä jäisi ainoaksi toteutukseksi ja
 *      söisi kutsun hereillä olevalta kartalta.
 *   4. Portti muistaa lupauksen, tuntee yhden tiedoston version ja
 *      moduulit pysyvät SHELLissä (offline) ja nipussa (dist).
 *
 * Selaimen puoli — ettei moduulia oikeasti haeta ennen herätystä ja että
 * herätys piirtää laudan — on tools/savukkeet/savuke-kartan-laiskoitus.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const JUURI = new URL('..', import.meta.url).pathname;
const lue = (p) => readFileSync(join(JUURI, p), 'utf8');

const UI = lue('js/ui.js');
const LATAUS = lue('js/kartta-lataus.js');
const KARTTA = lue('js/kartta.js');

/* Moduulit, joiden lataus siirtyi portin taakse. */
const LAISKAT = [
  'js/kartta.js',
  'js/packs/maasto-tekstit.js',
  'js/packs/maasto-tekstit-malli.js',
  'js/packs/maailmankartta-varjostus.js',
];

test('js/ui.js ei tuo laiskoitettuja karttamoduuleja staattisesti', () => {
  for (const polku of LAISKAT) {
    const tiedosto = polku.replace(/^js\//, './');
    assert.ok(!new RegExp(`from '${tiedosto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`).test(UI),
      `js/ui.js tuo yhä ${polku} staattisesti — laiskoitus purkautuu`);
  }
  // Portti tuodaan staattisesti: se on muutama kilotavu eikä tuo karttaa.
  assert.match(UI, /import \{ NukkuvaKartta, lataaTasokartta, tasokartanOsat \} from '\.\/kartta-lataus\.js';/);
  // Merisyvyyspakan tuonti poistui kokonaan (MERISYVYYS on pois käytöstä).
  assert.ok(!UI.includes("from './packs/maailmankartta-syvyys.js'"),
    'js/ui.js tuo yhä käyttämättömän merisyvyyspakan');
  assert.ok(!/\bMERISYVYYS\b/.test(UI.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '')),
    'MERISYVYYS-viittaus jäi koodiin');
});

test('yksikään js/-moduuli ei tuo laiskoitettuja moduuleja staattisesti', () => {
  const kansiot = ['js', 'js/packs', 'js/linssit', 'js/pallolauta'];
  const tuojat = [];
  for (const kansio of kansiot) {
    const polku = join(JUURI, kansio);
    if (!existsSync(polku)) continue;
    for (const nimi of readdirSync(polku).filter((f) => f.endsWith('.js'))) {
      const tiedosto = `${kansio}/${nimi}`;
      if (LAISKAT.includes(tiedosto)) continue;
      const lahde = lue(tiedosto);
      for (const laiska of LAISKAT) {
        const perus = laiska.split('/').pop();
        // Staattinen tuonti: "from './x.js'" tai "from '../packs/x.js'".
        const re = new RegExp(`from '\\.{1,2}/(?:packs/)?${perus.replace('.', '\\.')}'`);
        if (re.test(lahde)) tuojat.push(`${tiedosto} → ${laiska}`);
      }
    }
  }
  assert.deepEqual(tuojat, [],
    'staattinen tuonti palauttaisi laiskoitetun moduulin käynnistykseen');
});

test('sijaisen rajapinta kattaa kaiken, mitä js/ui.js kartalta kutsuu', async () => {
  const { NukkuvaKartta } = await import('../js/kartta-lataus.js');
  const jasenet = new Set(Object.getOwnPropertyNames(NukkuvaKartta.prototype));
  // Rakentimen kentät (this.X = …) ovat myös sijaisen rajapintaa.
  for (const m of LATAUS.matchAll(/\bthis\.([A-Za-z_$][\w$]*)\s*=(?!=)/g)) jasenet.add(m[1]);

  const puuttuvat = new Set();
  for (const m of UI.matchAll(/this\.kartta\??\.([A-Za-z_$][\w$]*)(\??)/g)) {
    const [, jasen, valinnainenKutsu] = m;
    /*
     * `this.kartta.x?.()` on jo suojattu: puuttuva jäsen ei kaada
     * mitään. Niitä on tarkoituksella — esim. hylkaaNipistys on kenttä,
     * jonka vasta asennaPanorointi asettaa hereillä olevalle kartalle.
     */
    if (valinnainenKutsu) continue;
    if (!jasenet.has(jasen)) puuttuvat.add(jasen);
  }
  assert.deepEqual([...puuttuvat], [],
    'js/ui.js kutsuu kartalta jäsentä, jota nukkuvalla sijaisella ei ole — '
    + 'pallolaudalla se kaatuisi TypeErroriin. Lisää metodi (tai nukkuva tynkä) '
    + 'js/kartta-lataus.js:n NukkuvaKartta-luokkaan.');
});

test('nukkuvat tyngät ovat tynkiä: jokainen on myös js/kartta.js:ssä', () => {
  const tynkaosa = LATAUS.slice(LATAUS.indexOf('NUKKUVAT TYNGÄT'));
  assert.ok(tynkaosa.length > 200, 'tynkälohkoa ei löytynyt js/kartta-lataus.js:stä');
  const tyngat = [...tynkaosa.matchAll(/^ {2}([A-Za-z_$][\w$]*)\(/gm)].map((m) => m[1]);
  assert.ok(tyngat.length >= 10, `tynkiä löytyi vain ${tyngat.length} — tarkista lukutapa`);
  for (const nimi of tyngat) {
    assert.match(KARTTA, new RegExp(`^ {2}(?:async )?${nimi}\\(`, 'm'),
      `${nimi} on tynkänä js/kartta-lataus.js:ssä mutta puuttuu js/kartta.js:stä — `
      + 'tynkä jäisi ainoaksi toteutukseksi');
  }
});

test('Kartta perii sijaisen ja sijainen tunnistaa itsensä', () => {
  assert.match(KARTTA, /^export class Kartta extends NukkuvaKartta \{/m);
  assert.match(KARTTA, /import \{ NukkuvaKartta \} from '\.\/kartta-lataus\.js';/);
  assert.match(LATAUS, /get sijainen\(\) \{\n\s*return true;/);
  assert.match(KARTTA, /get sijainen\(\) \{\n\s*return false;/);
  // Sijainen syntyy nukkuvana; herätys kulkee js/ui.js:n portin kautta.
  assert.match(LATAUS, /this\.lepotila = true;/);
  assert.match(LATAUS, /heraa\(\) \{\n\s*void this\.ui\.heraaTasokartta\?\.\(\);\n\s*return false;/);
  // Portti ei tuo karttaa staattisesti (muuten laiskoitus olisi näennäistä).
  assert.ok(!LATAUS.includes("from './kartta.js'"),
    'js/kartta-lataus.js tuo kartan staattisesti — kehä ja koko kuorma takaisin');
});

test('portti muistaa lupauksen ja tuntee yhden tiedoston version', () => {
  assert.match(LATAUS, /lupaus \?\?= tuoOsat\(\)/, 'portti ei muista lupausta');
  assert.match(LATAUS, /if \(osat\) return Promise\.resolve\(osat\);/);
  for (const polku of LAISKAT) {
    const suhteellinen = polku.replace(/^js\//, './');
    assert.ok(LATAUS.includes(`import('${suhteellinen}')`),
      `${polku} puuttuu portin dynaamisista tuonneista`);
  }
  // Nipussa moduulit ovat samassa näkyvyysalueessa: dynaaminen tuonti
  // kaatuisi, joten portti lukee ne suoraan (ks. tools/build-standalone.mjs).
  assert.match(LATAUS, /function niputettu\(\) \{[\s\S]*?try \{[\s\S]*?Kartta,/);
});

test('js/ui.js vaihtaa sijaisen oikeaan karttaan yhdestä paikasta', () => {
  assert.match(UI, /this\.kartta = new NukkuvaKartta\(this\);/);
  assert.match(UI, /async varmistaKartta\(\) \{[\s\S]*?await lataaTasokartta\(\)/);
  assert.match(UI, /this\.kartta = new osat\.Kartta\(this\);/);
  // Eleet asennetaan vaihdon yhteydessä (mount ehti kutsua tynkää).
  const vaihto = UI.match(/ {2}async varmistaKartta\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(vaihto, /this\.kartta\.asennaPanorointi\(\);/);
  assert.equal((UI.match(/new osat\.Kartta\(this\)/g) ?? []).length, 1,
    'kartta rakennetaan useammasta paikasta — vaihto on yksi portti');
  // Herätys kulkee portin läpi eikä sijaisen ohi.
  assert.match(UI, /async heraaTasokartta\(\) \{\n\s*await this\.varmistaKartta\(\);/);
  const herata = UI.match(/ {2}async heraaTasokartta\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(herata, /if \(this\.dead \|\| this\.kartta\.sijainen\) return false;/,
    'epäonnistunut lataus jäisi ikuiseen kierteeseen (sijaisen heraa → heraaTasokartta)');
});

test('aineistopakat luetaan portista, ei moduulin näkyvyysalueesta', () => {
  assert.match(UI, /const kartanOsat = tasokartanOsat\(\);/);
  assert.match(UI, /kartanOsat\?\.MAASTO_TEKSTIT\?\./);
  assert.match(UI, /tasokartanOsat\(\)\?\.MAASTON_VARJOSTUS \?\? null/);
});

test('laiskoitetut moduulit pysyvät SHELLissä ja nipussa', () => {
  const sw = lue('sw.js');
  for (const polku of [...LAISKAT, 'js/kartta-lataus.js']) {
    assert.ok(sw.includes(`'./${polku}'`), `${polku} puuttuu sw.js:n SHELListä — offline hajoaa`);
  }
  const kokooja = lue('tools/build-standalone.mjs');
  const lista = kokooja.match(/const MODULES = \[([\s\S]*?)\n\];/)[1];
  const sija = (p) => lista.indexOf(`'${p}'`);
  for (const polku of [...LAISKAT, 'js/kartta-lataus.js', 'js/siirtokoreografia.js']) {
    assert.ok(sija(polku) > 0, `${polku} puuttuu niputuksesta — yhden tiedoston versio jäisi ilman lautaa`);
  }
  // Kantaluokka ja koreografia ennen karttaa: nipussa on yksi näkyvyysalue.
  assert.ok(sija('js/kartta-lataus.js') < sija('js/kartta.js'));
  assert.ok(sija('js/siirtokoreografia.js') < sija('js/kartta.js'));
  // Poikkeus on kirjattu vartijaan, joka muuten kaataisi tuojattoman listauksen.
  const vartija = lue('tools/tarkista-niputus.mjs');
  for (const polku of LAISKAT) {
    assert.ok(vartija.includes(`'${polku}'`),
      `${polku} puuttuu tools/tarkista-niputus.mjs:n DYNAAMISESTI_TUODUT-listalta`);
  }
});
