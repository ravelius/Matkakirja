import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * SATELLIITTILINSSI (omistajan tilaus 12.9.2026): hohtavat vihreät
 * havaintopisteet pallolla, koko yläpalkki linssin omaksi, pisteen
 * napautuksesta lähes koko ruudun havaintokuva ja sen sisällä
 * havaintogalleria.
 *
 * Tämä tiedosto vartioi vaatimukset yksi kerrallaan:
 *   1. pallo säilyy (linssi ei piirrä kerrosta eikä avaa linssikarttaa),
 *   2. hohtavat vihreät pisteet ilman jatkuvaa pulssia,
 *   3. koko yläpalkki vaihtuu ja palautuu,
 *   4. napautus avaa kuvan ensin, "Lisää" avaa koko havainnon,
 *   5. yksi piste per kohde + galleria (A/B/C-erottelu),
 *   6. ei live-väitettä; lisenssi, aika, alue ja lähde kulkevat mukana,
 *   7. linssin merkit eivät kuluta pelivuoroa.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

const {
  LINSSI, SATELLIITTI_OSA, TILAN_TARKKUUS, aikateksti, alueteksti, kuvatiedot,
  oletusIndeksi, paivateksti, parasHavainto, rakennaPalkki,
} = await import('../js/linssit/satelliitti.js');
const { SATELLIITTI_KOHTEET, SATELLIITTI_LAHDE } = await import('../js/linssit/satelliitti-data.js');
const tyokalu = await import('../tools/hae-satelliittihavainnot.mjs');

const lahde = lue('../js/linssit/satelliitti.js');
const tyyli = lue('../css/satelliitti.css');

/* ══════════════════════════ 1. pallo säilyy ══════════════════════ */

test('linssi on kerrokseton ja asuu pallolla — tasokarttaa ei avata', () => {
  assert.equal(LINSSI.kerros, false);
  assert.equal(typeof LINSSI.pallolle, 'function');
  // js/ui.js valitseLinssi avaa linssikartan vain linsseille, joilla EI
  // ole pallolle-funktiota (pallolinssiKelpaa) — tämä siis pysyy pallolla.
  assert.ok(!('piirra' in LINSSI), 'kerrokseton linssi ei piirrä tasokartalle');
});

test('linssi on rekisterissä ja sw.js:n SHELLissä', () => {
  const rekisteri = lue('../js/linssit/rekisteri.js');
  assert.match(rekisteri, /tunnus: 'satelliitti'/);
  const sw = lue('../sw.js');
  for (const polku of [
    './js/linssit/satelliitti.js', './js/linssit/satelliitti-data.js', './css/satelliitti.css',
  ]) {
    assert.ok(sw.includes(`'${polku}'`), `${polku} puuttuu sw.js:n SHELListä`);
  }
});

test('linssisopimuksen pakolliset kentät ovat paikallaan', () => {
  for (const kentta of ['tunnus', 'nimi', 'lyhyt', 'ikoni']) {
    assert.equal(typeof LINSSI[kentta], 'string');
    assert.ok(LINSSI[kentta].length > 0, `${kentta} on tyhjä`);
  }
  assert.ok(Array.isArray(LINSSI.laudat) && LINSSI.laudat.length);
  assert.equal(typeof LINSSI.lahde, 'object');
  assert.match(LINSSI.lahde.lisenssi, /CC BY 4\.0/);
});

/* ═══════════════════ 2. hohtavat vihreät pisteet ════════════════ */

test('piste on vihreä hehku, rengas ja ydin — eikä jatkuvaa pulssia', () => {
  for (const luokka of ['satelliitti-hehku', 'satelliitti-rengas', 'satelliitti-ydin', 'satelliitti-nimi']) {
    assert.ok(tyyli.includes(`.${luokka}`), `${luokka} puuttuu tyylistä`);
  }
  // Vihreä sävy on sama kaikissa kolmessa kerroksessa.
  assert.match(tyyli, /--satelliitti-vihrea:\s*#5dffa8/);
  // Jatkuva pulssi kieltää pallolta 60 fps:n (js/linssit/kerros.js haivyta):
  // yksikään animaatio ei saa toistua loputtomiin.
  assert.ok(!/animation:[^;]*infinite/.test(tyyli), 'hehku ei saa sykkiä jatkuvasti');
  // Liikkeenvähennys: vakaa hehku ilman ilmestymisanimaatiotakin.
  assert.match(tyyli, /prefers-reduced-motion[\s\S]*satelliitti-piste \{ animation: none/);
});

test('merkki ei ota napautuksia elementtinä — osuma tulee pallon pinnasta', () => {
  assert.match(tyyli, /\.satelliitti-piste \{[\s\S]*pointer-events: none/);
  // Datumissa on napautus(d), jonka js/pallolauta/lauta.js lahinLinssimerkki
  // lukee — ja se hyväksyy vain kameran puolella olevat merkit.
  assert.match(lahde, /napautus: \(\) => avaaKohde\(kohde\)/);
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /merkit\.napautettavat\(\)\.filter\(\(d\) => edessa\(d\.lat, d\.lng\)\)/);
});

/* ════════════════ 3. koko yläpalkki vaihtuu ja palautuu ═════════ */

function teeDoc() {
  const teeSolmu = (tag) => {
    const luokat = new Set();
    const el = {
      tag,
      lapset: [],
      kuuntelijat: {},
      attribuutit: {},
      textContent: '',
      type: '',
      value: '',
      title: '',
      style: { arvot: {}, setProperty(k, v) { this.arvot[k] = v; }, removeProperty(k) { delete this.arvot[k]; } },
      get className() { return [...luokat].join(' '); },
      set className(v) { luokat.clear(); for (const l of String(v).split(/\s+/)) if (l) luokat.add(l); },
      classList: {
        add: (...l) => l.forEach((x) => luokat.add(x)),
        remove: (...l) => l.forEach((x) => luokat.delete(x)),
        contains: (x) => luokat.has(x),
      },
      setAttribute(k, v) { el.attribuutit[k] = String(v); },
      addEventListener(t, f) { (el.kuuntelijat[t] ??= []).push(f); },
      laukaise(t) { for (const f of el.kuuntelijat[t] ?? []) f({}); },
      append(...l) { for (const x of l) el.appendChild(x); },
      appendChild(x) { el.lapset.push(x); x.vanhempi = el; return x; },
      remove() { const i = el.vanhempi?.lapset.indexOf(el) ?? -1; if (i >= 0) el.vanhempi.lapset.splice(i, 1); },
      getBoundingClientRect: () => ({ height: 54 }),
    };
    return el;
  };
  const body = teeSolmu('body');
  const topbar = teeSolmu('div');
  return {
    body,
    topbar,
    createElement: (tag) => teeSolmu(tag),
    querySelector: (v) => (v === '.topbar' ? topbar : null),
  };
}

test('yläpalkki vaihtuu kokonaan ja palautuu täsmälleen', () => {
  const doc = teeDoc();
  const mapPane = doc.createElement('div');
  let suljettu = 0;
  const palkki = rakennaPalkki({
    ui: { mapPane, valitseLinssi: () => { suljettu += 1; } },
    kohteet: SATELLIITTI_KOHTEET,
    onSulje: () => { suljettu += 1; },
    doc,
  });
  // Matkakirjan oma palkki piiloon samalla luokalla kuin aikajanalinsseillä.
  assert.ok(doc.body.classList.contains('aikajana-palkki-auki'));
  assert.ok(doc.body.classList.contains('aikajana-paalla'));
  // Palkki saa mitatun korkeuden, jottei kartta hyppää.
  assert.equal(doc.body.style.arvot['--aikajana-palkki-korkeus'], '54px');
  // EI lisäpalkkia tavallisen päälle: karttaruudussa on täsmälleen yksi.
  assert.equal(mapPane.lapset.length, 1);
  assert.equal(mapPane.lapset[0].className, 'satelliittipalkki');

  // Sisältö: nimi, kohteen valinta, ohje ja Sulje linssi.
  const osat = palkki.el.lapset.map((x) => x.className);
  assert.deepEqual(osat, [
    'satelliittipalkki-nimi', 'satelliittipalkki-valinta',
    'satelliittipalkki-ohje', 'satelliittipalkki-sulje',
  ]);
  assert.equal(palkki.el.lapset[3].textContent, 'Sulje linssi');
  palkki.el.lapset[3].laukaise('click');
  assert.equal(suljettu, 1, 'Sulje linssi kutsuu sulkemista');

  palkki.pura();
  assert.ok(!doc.body.classList.contains('aikajana-palkki-auki'));
  assert.ok(!doc.body.classList.contains('aikajana-paalla'));
  assert.equal(doc.body.style.arvot['--aikajana-palkki-korkeus'], undefined);
  assert.equal(mapPane.lapset.length, 0, 'palkki poistuu karttaruudusta');
});

test('palkin kohdevalinta tarjoaa kaikki kohteet havaintomäärineen', () => {
  const doc = teeDoc();
  let lennetty = null;
  const palkki = rakennaPalkki({
    ui: { mapPane: doc.createElement('div') },
    kohteet: SATELLIITTI_KOHTEET,
    onValinta: (k) => { lennetty = k; },
    doc,
  });
  const valinta = palkki.valinta;
  assert.equal(valinta.lapset.length, SATELLIITTI_KOHTEET.length + 1, 'tyhjä rivi + kaikki kohteet');
  assert.match(valinta.lapset[1].textContent, /\(\d+\)$/, 'havaintomäärä näkyy');
  valinta.value = 'venetsia';
  valinta.laukaise('change');
  assert.equal(lennetty?.tunnus, 'venetsia');
  palkki.pura();
});

test('mobiilissa palkki pysyy yhtenä tiiviinä rivinä', () => {
  assert.match(tyyli, /@media \(max-width: 620px\)[\s\S]*satelliittipalkki-ohje \{ display: none; \}/);
});

/* ═════════ 4. kuva ensin, sitten koko havainto (v1783–v1785) ════ */

test('kortti käyttää jaettua nostokuva-apuria eikä omaa avausta', () => {
  assert.match(lahde, /import \{ nostokuvaAloita \} from '\.\.\/nostokuva\.js'/);
  assert.match(lahde, /nostokuvaAloita\(\{/);
  // Kuva ei liiku havaintoa vaihdettaessa: vain src ja tekstit vaihtuvat.
  assert.match(lahde, /kuvaElementti\.src = h\.kuva/);
  // Kuvateksti seuraa kuvaa — väärä päiväys oikean kuvan alla olisi
  // pahin mahdollinen virhe tässä linssissä.
  assert.match(lahde, /kortti\.querySelector\('\.nostokuva-teksti'\)[\s\S]{0,120}teksti\.textContent = tiedot\.lyhyt/);
  assert.ok(!/sisus\.replaceChildren\(\)\s*;\s*kuvaElementti = null/.test(lahde));
  // Lukittu laatikko ei saa vääristää eri muotoisia havaintoja.
  assert.match(tyyli, /\.satelliitti-kortti \.nostokuva-img \{ object-fit: contain/);
});

/* ═══════════ 5. yksi piste per kohde, galleria sisällä ══════════ */

test('aineistossa on vähintään kymmenen kohdetta, Venetsia ja Krakova mukana', () => {
  assert.ok(SATELLIITTI_KOHTEET.length >= 10, `kohteita vain ${SATELLIITTI_KOHTEET.length}`);
  const tunnukset = SATELLIITTI_KOHTEET.map((k) => k.tunnus);
  assert.ok(tunnukset.includes('venetsia'));
  assert.ok(tunnukset.includes('krakova'));
  assert.equal(new Set(tunnukset).size, tunnukset.length, 'tunnukset ovat uniikkeja');
});

test('todennetut galleriaesimerkit: Venetsia 2, Krakova 5 havaintoa', () => {
  const venetsia = SATELLIITTI_KOHTEET.find((k) => k.tunnus === 'venetsia');
  assert.equal(venetsia.havainnot.length, 2);
  assert.deepEqual(venetsia.havainnot.map((h) => h.aika.slice(0, 10)), ['2025-11-04', '2026-04-29']);

  const krakova = SATELLIITTI_KOHTEET.find((k) => k.tunnus === 'krakova');
  assert.equal(krakova.havainnot.length, 5);
  assert.deepEqual(krakova.havainnot.map((h) => h.aika.slice(0, 10)),
    ['2025-09-14', '2025-09-17', '2025-10-04', '2025-10-04', '2025-10-04']);
});

test('(B) saman kuvauksen SLC/GRD/QLK/CSI eivät ole neljä havaintoa', () => {
  const venetsia = SATELLIITTI_KOHTEET.find((k) => k.tunnus === 'venetsia');
  const uusin = venetsia.havainnot.at(-1);
  // Yksi havainto kantaa monta tuotetta — ne eivät ole erillisiä rivejä.
  assert.ok(uusin.tuotteet.length >= 4, 'tuotteet puuttuvat');
  for (const t of ['SLC', 'GRD', 'QLK', 'CSI']) assert.ok(uusin.tuotteet.includes(t), `${t} puuttuu`);
  const idt = venetsia.havainnot.map((h) => h.id);
  assert.equal(new Set(idt).size, idt.length, 'jokainen havainto on oma STAC-tietueensa');
});

test('(A) sama kohde eri aikoina yhdistyy, (C) vierekkäinen alue ei', () => {
  const { samaKohde, ryhmita } = tyokalu;
  // (A) Venetsian kaksi jalanjälkeä ovat päällekkäin → sama kohde.
  const a1 = [12.2846, 45.4102, 12.3641, 45.4662];
  const a2 = [12.29, 45.4067, 12.3752, 45.4654];
  assert.equal(samaKohde(a1, a2), true);
  // (C) Sama kokoluokka mutta viereinen ruutu → eri kohde.
  const c = [12.40, 45.4067, 12.4852, 45.4654];
  assert.equal(samaKohde(a1, c), false);
  // Kokoehto estää ketjuuntumisen: yksi laaja kuva ei liimaa erillisiä
  // pikkukohteita yhdeksi.
  const laaja = [11.5, 44.8, 13.5, 46.2];
  assert.equal(samaKohde(a1, laaja), false);
  assert.equal(ryhmita([a1, a2, c, laaja]).length, 3);
});

test('kohteiden pisteet eivät osu päällekkäin pallolla', () => {
  for (let i = 0; i < SATELLIITTI_KOHTEET.length; i++) {
    for (let j = i + 1; j < SATELLIITTI_KOHTEET.length; j++) {
      const a = SATELLIITTI_KOHTEET[i];
      const b = SATELLIITTI_KOHTEET[j];
      const ero = Math.hypot(a.lat - b.lat, a.lon - b.lon);
      assert.ok(ero > 0.2, `${a.tunnus} ja ${b.tunnus} ovat samassa pisteessä`);
    }
  }
});

test('oletuskuva on paras yleiskuva, ei automaattisesti uusin', () => {
  // Sääntö: tarkin kuvaustila → pienin katselukulma → uusin.
  const uusinMuttaKarkea = { id: 'u', tila: 'scan', katselukulma: 20, aika: '2026-09-01T00:00:00Z' };
  const vanhaTarkka = { id: 'v', tila: 'spotlight', katselukulma: 30, aika: '2024-01-01T00:00:00Z' };
  assert.equal(parasHavainto([uusinMuttaKarkea, vanhaTarkka]).id, 'v');
  // Sama tila → pienempi katselukulma voittaa, vaikka olisi vanhempi.
  const vino = { id: 'a', tila: 'spotlight', katselukulma: 39, aika: '2026-05-05T00:00:00Z' };
  const suora = { id: 'b', tila: 'spotlight', katselukulma: 22, aika: '2025-05-05T00:00:00Z' };
  assert.equal(parasHavainto([vino, suora]).id, 'b');
  // Tasatilanteessa uusin.
  const vanha = { id: 'c', tila: 'spotlight', katselukulma: 25, aika: '2025-01-01T00:00:00Z' };
  const uusi = { id: 'd', tila: 'spotlight', katselukulma: 25, aika: '2026-01-01T00:00:00Z' };
  assert.equal(parasHavainto([vanha, uusi]).id, 'd');
  assert.ok(TILAN_TARKKUUS.spotlight > TILAN_TARKKUUS.stripmap);
  assert.ok(TILAN_TARKKUUS.stripmap > TILAN_TARKKUUS.scan);
});

test('aineiston oletus ja pelin laatusääntö ovat samat kaikilla kohteilla', () => {
  for (const kohde of SATELLIITTI_KOHTEET) {
    assert.equal(parasHavainto(kohde.havainnot).id, kohde.oletus, kohde.tunnus);
    assert.equal(kohde.havainnot[oletusIndeksi(kohde)].id, kohde.oletus, kohde.tunnus);
  }
});

test('Krakovan kolme saman päivän havaintoa erottuvat kellonajasta', () => {
  const krakova = SATELLIITTI_KOHTEET.find((k) => k.tunnus === 'krakova');
  const sama = krakova.havainnot.filter((h) => h.aika.startsWith('2025-10-04'));
  assert.equal(sama.length, 3);
  const tekstit = sama.map((h) => aikateksti(h.aika));
  assert.equal(new Set(tekstit).size, 3, 'kellonaika erottaa saman päivän havainnot');
  for (const t of tekstit) assert.match(t, /UTC$/, 'aikavyöhyke on näkyvissä');
  // Myös pikkukuvan lyhyt päiväys kantaa kellonajan.
  assert.equal(new Set(sama.map((h) => paivateksti(h.aika))).size, 3);
});

test('aikatekstit ja aluetekstit ovat suomalaisessa muodossa', () => {
  assert.equal(aikateksti('2026-04-29T20:56:13.691Z'), '29.4.2026 klo 20.56 UTC');
  assert.equal(paivateksti('2026-04-29T20:56:13.691Z'), '29.4.26 20.56');
  assert.equal(alueteksti([12.29, 45.4067, 12.3752, 45.4654]), '45,41–45,47° N · 12,29–12,38° E');
  assert.equal(alueteksti([-79.1, -8.5, -79.0, -8.4]), '8,50–8,40° S · 79,10–79,00° W');
});

test('galleriassa on laskuri, nuolet, pikkukuvat ja vertailu', () => {
  assert.match(lahde, /Havainto \$\{indeksi \+ 1\} \/ \$\{havainnot\.length\}/);
  assert.match(lahde, /'‹ Edellinen'/);
  assert.match(lahde, /'Seuraava ›'/);
  assert.match(lahde, /satelliitti-nauha/);
  assert.match(lahde, /satelliitti-vertaa/);
  // Rinnakkain, EI päällekkäistä pyyhkäisyliukuria (väärä muutoksen vaikutelma).
  assert.match(lahde, /kaksi havaintoa rinnakkain/);
  // Vertailu on kaksi erillistä kuvaa vierekkäin; päällekkäistä
  // pyyhkäisyliukuria ei rakenneta (ei clip-path-puolikasta eikä
  // syötettä, joka siirtäisi toisen kuvan rajaa toisen päällä).
  assert.ok(!/clip-path/i.test(tyyli), 'päällekkäistä rajausta ei saa olla');
  assert.ok(!/type="range"|type = 'range'/.test(lahde), 'pyyhkäisyliukuria ei saa olla');
  assert.match(tyyli, /\.satelliitti-vertailu-parit \{[\s\S]*display: flex/);
});

/* ═════════════ 6. ei live-väitettä, lähteet mukana ══════════════ */

test('kortissa lukee arkistohavainto — mitään live-kuvausta ei luvata', () => {
  assert.match(lahde, /'Arkistohavainto · ICEYE · tutkakuva'/);
  // Leima on KUVAN päällä (nostokuvan koristele), jotta se näkyy
  // molemmissa vaiheissa eikä vieri pois pitkässä kortissa.
  assert.match(lahde, /koristele: \(nappi\) => \{[\s\S]{0,200}'satelliitti-leima'/);
  assert.match(tyyli, /\.satelliitti-leima \{[\s\S]*position: absolute/);
  // Kuvaustilausta ei ole: linssi ei pyydä satelliitilta mitään eikä
  // tee yhtään verkkokutsua — kuvat ovat valmiita arkisto-osoitteita.
  assert.ok(!/\bfetch\(|XMLHttpRequest/.test(lahde), 'linssi ei saa pyytää uutta kuvausta');
  // Jokainen näytettävä kuva on aineiston arkistotietueesta.
  assert.match(lahde, /img\.src = aloitus\.kuva/);
});

test('lisenssi ja attribuutio ovat CC BY 4.0 / ICEYE ja kulkevat kuvan mukana', () => {
  assert.equal(SATELLIITTI_LAHDE.lisenssi, 'CC BY 4.0');
  assert.equal(SATELLIITTI_LAHDE.tekija, 'ICEYE');
  assert.match(SATELLIITTI_LAHDE.osoite, /^https:\/\/sar\.iceye\.com\//);
  const kohde = SATELLIITTI_KOHTEET[0];
  const tiedot = kuvatiedot(kohde, kohde.havainnot[0]);
  assert.match(tiedot.lahde, /ICEYE, CC BY 4\.0/);
  assert.match(tiedot.selite, /ICEYE Open Data/);
  assert.match(tiedot.lyhyt, /UTC$/);
});

test('jokaisella havainnolla on aika, alue, kuva ja lähdetietue', () => {
  for (const kohde of SATELLIITTI_KOHTEET) {
    assert.ok(kohde.havainnot.length >= 1, kohde.tunnus);
    for (const h of kohde.havainnot) {
      assert.match(h.id, /^ICEYE_/, 'kooste ei ole havainto');
      assert.match(h.aika, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/);
      assert.equal(h.alue.length, 4);
      assert.match(h.kuva, /^https:\/\/iceye-open-data-catalog\.s3\.amazonaws\.com\/.*\.png$/);
      assert.match(h.stac, /^https:\/\/iceye-open-data-catalog\.s3\.amazonaws\.com\/.*\.json$/);
      assert.ok(h.tila && h.satelliitti, `${h.id}: kuvaustapa puuttuu`);
    }
  }
});

test('luokittelu ei nojaa tiedostonimeen', () => {
  const tyokalunLahde = lue('../tools/hae-satelliittihavainnot.mjs');
  // Ryhmittely lukee bboxeja; nimenpaloja ei poimita osoitteesta.
  assert.match(tyokalunLahde, /export function samaKohde\(a, b\)/);
  assert.ok(!/href\.(includes|match|split)\(/.test(tyokalunLahde),
    'osoitteesta ei saa lukea paikannimeä');
  // Kohteiden nimet tulevat käsin tarkistetusta ANKKURIT-luettelosta.
  assert.ok(tyokalu.ANKKURIT.length >= 10);
  for (const a of tyokalu.ANKKURIT) {
    assert.ok(a.tunnus && a.nimi && a.seutu && a.selite);
    assert.ok(Number.isFinite(a.lat) && Number.isFinite(a.lon));
  }
});

test('kuvat eivät tule repoon — vain osoitteet', () => {
  const data = lue('../js/linssit/satelliitti-data.js');
  assert.ok(!/data:image\//.test(data), 'kuvadataa ei upoteta aineistoon');
  assert.ok(!/assets\//.test(data), 'kuvia ei viedä repon assets-kansioon');
});

/* ═══════ 7. linssin merkit eivät kuluta pelivuoroa ══════════════ */

test('linssin ajan matkustus ja lehdet ovat kiinni samasta portista', () => {
  const ui = lue('../js/ui.js');
  assert.match(ui, /linssikarttaEstaa\(\) \{\s*\n\s*return Boolean\(this\.linssikartta\) \|\| linssiEstaa\(\);/);
  // doMove (nopanheiton kohteen napautus pallolla) kysyy saman portin.
  assert.match(ui, /doMove\(key\) \{[\s\S]{0,400}if \(this\.linssikarttaEstaa\(\)\) return;/);
  // avaaTutkinta (kaupunkilehti) kysyi jo ennestään.
  assert.match(ui, /avaaTutkinta\(city[\s\S]{0,300}if \(this\.linssikarttaEstaa\(\)\) return;/);
});

test('linssi ei koske pelitilaan eikä tallennukseen', () => {
  for (const kielletty of [
    'doMove', 'doRoll', 'doPickStart', 'avaaTutkinta', 'saveGame', 'tallennaPeli', 'game.',
  ]) {
    assert.ok(!lahde.includes(kielletty), `linssi kutsuu pelitoimintoa: ${kielletty}`);
  }
  // Ainoa kutsu pelin suuntaan on linssin sulkeminen.
  assert.match(lahde, /ui\?\.valitseLinssi\?\.\(null\)/);
});

test('purku ottaa pois merkit, palkin ja kortin', () => {
  assert.equal(SATELLIITTI_OSA, 'satelliitti');
  assert.match(lahde, /lauta\?\.linssit\?\.merkit\?\.\(SATELLIITTI_OSA, merkit\)/);
  assert.match(lahde, /lauta\?\.linssit\?\.pura\?\.\(SATELLIITTI_OSA\)/);
  assert.match(lahde, /palkki\.pura\(\)/);
  assert.match(lahde, /suljeKortti\(\)/);
});

test('pelin omat nimikyltit piilotetaan linssin omassa tyylitiedostossa', () => {
  /*
   * Omistaja 12.9.2026: "Poista satelliitti linssin näkymästä pelin
   * omien kohdekaupunkien nimikyltit."
   *
   * Sääntö ON css/aikajana.css:ssä, mutta se ladataan vasta
   * aikajanalinssin mukana — sama ansa, johon yläpalkki jo kerran
   * kompastui. Jaettu body-luokka ei siis yksin riitä, ja siksi
   * sääntö on kopioitava linssin omaan tyylitiedostoon.
   */
  const css = lue('../css/satelliitti.css');
  for (const luokka of [
    'pallolauta-nimi', 'pallolauta-nosto', 'pallolauta-piste',
    'pallolauta-kohde', 'pallolauta-vesinimi', 'pallolauta-nappula',
  ]) {
    assert.ok(
      css.includes(`body.aikajana-paalla .${luokka}`),
      `css/satelliitti.css ei piilota luokkaa ${luokka} — se jää näkyviin linssiin`,
    );
  }
});

