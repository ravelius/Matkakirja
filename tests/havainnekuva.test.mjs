/*
 * HAVAINNEKUVAN SELITE — ettei linkki katoa mistään lähderivistä.
 *
 * Omistajan bugiraportti 2.9.2026 (iPhone, Kreikka, Olympian
 * Zeus-patsaan ihmekortti, sanatarkasti): *"Havainnekuvasta puuttuu
 * popup linkki. Tarkista kaikkialta pelistä että linkki tulee
 * näkyviin"*. Vika oli kahdessa suurennoksessa: pisteviiva oli
 * määritelty vaaleaksi vaalealle paperille (näkymätön) ja nappi peri
 * paperin `pointer-events: none` -säännön (kuollut). Kolmas löydös oli
 * eläintäyn kuvarivi, joka kertoi kuvan lähteeksi tekstin lähteen.
 *
 * MITÄ TÄMÄ TESTI VARTIOI. Kolme asiaa, jotka voi mitata ilman
 * selainta — selaimessa tapahtuvan (viiva näkyy, napautus avaa
 * popupin) vartioi tools/savukkeet/savuke-havainnekuva.mjs:
 *
 *   1. AINEISTO: jokainen "Matkakirjan havainnekuva" -maininta pakoissa
 *      asuu `lahde`-kentässä. Vain lähderivi kulkee apurin läpi; jos
 *      sama sanapari päätyisi vaikka `selite`-kenttään, se piirtyisi
 *      pelkkänä tekstinä eikä yksikään apuri näkisi sitä.
 *   2. YKSI PORTTI: `merkitseHavainnekuva` tuodaan vain
 *      js/tekijakortti.js:ään, eli selite syntyy täsmälleen yhdessä
 *      paikassa (`taytaLahderivi`) ja jokainen lähderivi saa sen samaa
 *      reittiä. Rinnakkainen kutsu olisi rinnakkainen toteutus.
 *   3. EI KÄSIN LADOTTUJA LÄHDERIVEJÄ: kolmiargumenttinen
 *      `html('p', '…lahde…', teksti)` kirjoittaa rivin apurin ohi.
 *      Sallitut poikkeukset ovat alla nimeltä ja syineen — ne eivät ole
 *      median lähderivejä vaan muuta sisältöä samalla luokalla.
 *   4. TYYLI: pisteviiva seuraa tekstin väriä (currentColor) eikä
 *      luetteloa säiliöistä, ja nappi ottaa napautukset vastaan myös
 *      siellä, missä paperi ohittaa eleet. Juuri tämän luettelon
 *      vanheneminen oli omistajan näkemä vika.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { HAVAINNEKUVA_RE, havainnekuvaLaji } from '../js/havainnekuva.js';

const JUURI = new URL('..', import.meta.url).pathname;
const lue = (polku) => readFileSync(join(JUURI, polku), 'utf8');

/** Selainmoduulit ilman työhuoneen omia tauluja (ne eivät ole peliä). */
const MODUULIT = readdirSync(join(JUURI, 'js'))
  .filter((t) => t.endsWith('.js') && !t.startsWith('tyohuone-'))
  .map((t) => `js/${t}`);
const PAKAT = readdirSync(join(JUURI, 'js/packs'))
  .filter((t) => t.endsWith('.js'))
  .map((t) => `js/packs/${t}`);

/* ------------------------------------------------------------------ *
 * 1. Aineisto: maininta asuu aina lähderivissä
 * ------------------------------------------------------------------ */

/** Kaikki merkkijonot moduulin vienneistä avainpolkuineen. */
function keraaMerkkijonot(arvo, polku, nahty, ulos) {
  if (typeof arvo === 'string') {
    if (HAVAINNEKUVA_RE.test(arvo)) ulos.push({ polku, arvo });
    return;
  }
  if (!arvo || typeof arvo !== 'object' || nahty.has(arvo)) return;
  nahty.add(arvo);
  if (Array.isArray(arvo)) {
    arvo.forEach((x, i) => keraaMerkkijonot(x, `${polku}[${i}]`, nahty, ulos));
    return;
  }
  for (const [k, v] of Object.entries(arvo)) {
    keraaMerkkijonot(v, `${polku}.${k}`, nahty, ulos);
  }
}

test('pakkojen havainnekuvamaininnat asuvat aina lahde-kentässä', async () => {
  const osumat = [];
  for (const polku of PAKAT) {
    const moduuli = await import(join(JUURI, polku));
    const nahty = new WeakSet();
    for (const [nimi, arvo] of Object.entries(moduuli)) {
      keraaMerkkijonot(arvo, `${polku}:${nimi}`, nahty, osumat);
    }
  }
  // Aineistoa on satoja rivejä; jos luku putoaa nollaan, testi on
  // lakannut mittaamasta mitään.
  assert.ok(osumat.length > 100, `osumia vain ${osumat.length}`);
  const vaarassa = osumat.filter((o) => !/\.lahde$/.test(o.polku));
  assert.deepEqual(vaarassa.map((o) => o.polku), [],
    'havainnekuvamaininta muualla kuin lahde-kentässä: se ei kulje '
    + 'taytaLahderivin kautta eikä saa selitettä');
});

/* ------------------------------------------------------------------ *
 * 2. Yksi portti
 * ------------------------------------------------------------------ */

test('merkitseHavainnekuva tuodaan vain tekijakortti.js:ään', () => {
  const tuojat = [...MODUULIT, ...PAKAT]
    .filter((polku) => /\bmerkitseHavainnekuva\b/.test(lue(polku)))
    .filter((polku) => polku !== 'js/havainnekuva.js');
  assert.deepEqual(tuojat, ['js/tekijakortti.js'],
    'selite syntyy vain taytaLahderivissä (js/tekijakortti.js) — muualta '
    + 'kutsuminen olisi rinnakkainen toteutus');
});

/* ------------------------------------------------------------------ *
 * 3. Ei käsin ladottuja lähderivejä
 * ------------------------------------------------------------------ */

/*
 * SALLITUT KÄSIN LADOTUT RIVIT. Nämä käyttävät `lahde`-luokkaa mutta
 * eivät ole MEDIAN lähderivejä: niissä ei voi koskaan lukea
 * "Matkakirjan havainnekuva", koska ne eivät kerro kuvan alkuperää.
 * Uusi rivi tälle listalle vaatii saman perustelun.
 */
const SALLITUT = new Map([
  ['js/lehti.js:kuvalahde', 'päivän sään rivi lehden mastossa, ei kuvan lähde'],
  ['js/maalehti.js:kulttuuri-lahde aani-lahde', 'äänitteen esittäjä ja levy-yhtiö'],
  ['js/maalehti.js:vinkki-lahde', 'menovinkin ulkoisen sivuston nimi'],
  ['js/nahtavyydet.js:nahtavyys-lainaus-lahde', 'sitaatin puhuja, ei kuva'],
  ['js/nahtavyydet.js:nahtavyys-lahderivi', 'jutun tekstin lähde (lahdemerkinta)'],
  ['js/skandaalit.js:fokusnosto-lahde', 'paikka · vuosi -metarivi, ei lähde lainkaan'],
]);

/**
 * Kolmiargumenttinen html-kutsu, jonka luokka puhuu lähteestä ja jonka
 * sisältö tulee muualta kuin merkkijonoliteraalista.
 */
const KASIN_LADOTTU = /\bhtml\(\s*'[a-z]+'\s*,\s*'([^']*lahde[^']*)'\s*,\s*(?!')/g;

test('lähderivit ladotaan taytaLahderivillä eikä käsin', () => {
  const rikkeet = [];
  for (const polku of MODUULIT) {
    const lahde = lue(polku);
    for (const osuma of lahde.matchAll(KASIN_LADOTTU)) {
      const avain = `${polku}:${osuma[1]}`;
      if (SALLITUT.has(avain)) continue;
      rikkeet.push(avain);
    }
  }
  assert.deepEqual(rikkeet, [],
    'lähderivi kirjoitettu apurin ohi: käytä taytaLahderivi(html(tag, luokka), '
    + 'teksti, kohde) tai perustele poikkeus SALLITUT-listalla');
});

test('sallittujen poikkeusten lista ei vanhene huomaamatta', () => {
  const kaytossa = new Set();
  for (const polku of MODUULIT) {
    for (const osuma of lue(polku).matchAll(KASIN_LADOTTU)) {
      kaytossa.add(`${polku}:${osuma[1]}`);
    }
  }
  const turhat = [...SALLITUT.keys()].filter((avain) => !kaytossa.has(avain));
  assert.deepEqual(turhat, [], 'poistunut rivi jäi poikkeuslistalle');
});

/* ------------------------------------------------------------------ *
 * 4. Tyyli: viiva seuraa tekstiä, nappi ottaa napautukset
 * ------------------------------------------------------------------ */

test('selitenapin pisteviiva seuraa tekstin väriä eikä säiliöluetteloa', () => {
  const css = lue('css/styles.css');
  const lohko = css.match(/\.havainnekuva-selite,[^{]*\{[^}]*\}/);
  assert.ok(lohko, '.havainnekuva-selite -sääntöä ei löytynyt');
  assert.match(lohko[0], /border-bottom-color:\s*color-mix\(in srgb, currentColor/,
    'viivan väri on kiinnitetty johonkin sävyyn: vaalealla paperilla '
    + 'vaalea viiva katoaa (omistajan bugi 2.9.2026)');
  assert.ok(!/\.fokuskohde-zoomlahde \.havainnekuva-selite/.test(css),
    'säiliökohtainen viivaväri palasi — juuri sen luettelon vanheneminen '
    + 'oli vika');
});

test('selite voittaa dialogien yleisen nappisäännön', () => {
  const css = lue('css/styles.css');
  assert.match(css, /\.dialog button\.havainnekuva-selite \{/,
    'ilman tätä `.dialog button` (0,1,1) voittaa luokan (0,1,0) ja selite '
    + 'piirtyy lehdessä pergamenttilaatikkona eikä pisteviivana');
});

test('selitenappi ottaa napautukset vastaan myös suurennoksen paperilla', () => {
  const lohko = lue('css/styles.css').match(/\.havainnekuva-selite,[^{]*\{[^}]*\}/)[0];
  assert.match(lohko, /pointer-events:\s*auto/,
    'suurennoksen kehys ohittaa eleet (pointer-events: none) ja sääntö '
    + 'periytyy nappiin — ilman tätä napautus sulkee kuvan eikä avaa selitettä');
});

/* ------------------------------------------------------------------ *
 * 5. Variantin valinta (data ensin, sanat varalta)
 * ------------------------------------------------------------------ */

test('ihmevariantti tulee lipusta ja varalta lähderivin sanoista', () => {
  assert.equal(havainnekuvaLaji('Matkakirjan havainnekuva', { ihmekuva: true }), 'ihme');
  assert.equal(havainnekuvaLaji(
    'Matkakirjan havainnekuva: kohde loistoaikansa asussa nykymaailmassa', {},
  ), 'ihme');
  assert.equal(havainnekuvaLaji('Matkakirjan havainnekuva', {}), 'havainnekuva');
  assert.equal(havainnekuvaLaji('', {}), 'havainnekuva');
});

/* ------------------------------------------------------------------ *
 * 6. Eläintäyn kuvarivi kertoo kuvan lähteen, ei tekstin
 * ------------------------------------------------------------------ */

test('eläintäyn kuvarivi ei käytä tekstin lähdettä kuvan lähteenä', () => {
  // Kommentit pois: sama sanamuoto elää lohkokommentissa selityksenä
  // siitä, mikä tässä oli väärin.
  const lahde = lue('js/elaintaky.js').replace(/\/\*[\s\S]*?\*\//g, '');
  assert.ok(!/taky\.lahde \?\? 'Matkakirjan havainnekuva'/.test(lahde),
    'kuvarivi lukisi taky.lahden (kortin TEKSTIN lähde, en-Wikipedia), '
    + 'jolloin pelin oma kuva näyttäisi Wikipedian kuvalta eikä selitettä '
    + 'syntyisi koskaan');
  assert.match(lahde, /taky\.kuvaLahde \?\? 'Matkakirjan havainnekuva'/);
});
