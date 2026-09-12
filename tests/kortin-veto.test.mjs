/*
 * VETO EI OLE NAPAUTUS — kortti sulkeutuu vain napautuksesta.
 *
 * Omistajan vikailmoitus 12.9.2026, sanatarkasti: *"Nosto häviää
 * näkyvistä jos yrittää scrollata. Ilmeisesti peli tulkitsee että
 * pelaaja painaa kuvan ulkopuolelta ja sulkee ikkunan vaikka nosto on
 * jo rakentunut kuvan ympärille."*
 *
 * Juurisyy oli mitattu: kaikki kolme korttia (kartan kohdekortti
 * js/fokuskohteet.js, täkynosto js/fokusnosto.js, eläintäky
 * js/elaintaky.js) sulkeutuivat PELKÄSTÄ pointerdownista, kun sormi
 * osui kortin ulkopuolelle. Kuva edellä -kortti täyttää puhelimessa
 * lähes koko ruudun, joten pystyveto alkaa usein juuri sieltä — ja
 * kortti katosi jo ennen kuin sormi oli liikkunut pikseliäkään.
 *
 * Tämä testi vartioi sitä sääntöä, joka ei vaadi selainta:
 * ui-apurit kuunteleSulkevaNapautus sulkee vasta pointerupissa,
 * vetokynnyksen ja napautusajan sisällä — ja kynnys on SAMA luku kuin
 * kartan omassa raahausvahdissa (js/kartta.js). Koko ketju ruudulla on
 * savukkeessa tools/savukkeet/savuke-kortin-veto.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  NAPAUTUKSEN_KESTO_MS,
  RAAHAUKSEN_KYNNYS,
  kuunteleSulkevaNapautus,
} from '../js/ui-apurit.js';
import { RAAHAUKSEN_KYNNYS_PX } from '../js/saapumisasento.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli: vain kuuntelijat ja tapahtumat                    */
/* ---------------------------------------------------------------- */

function valeKohde() {
  const kuulijat = [];
  return {
    kuulijat,
    addEventListener(laji, kuulija, kaappaus) { kuulijat.push({ laji, kuulija, kaappaus }); },
    removeEventListener(laji, kuulija) {
      const i = kuulijat.findIndex((k) => k.laji === laji && k.kuulija === kuulija);
      if (i >= 0) kuulijat.splice(i, 1);
    },
    laheta(laji, tapahtuma) {
      for (const k of [...kuulijat]) if (k.laji === laji) k.kuulija(tapahtuma);
    },
  };
}

const tapahtuma = (x, y, t, { id = 1, kohde = null } = {}) => ({
  pointerId: id, clientX: x, clientY: y, timeStamp: t, target: kohde,
});

/** Kuuntelija asennettuna: valmis ele-koe. */
function pysty({ kelpaa = () => true } = {}) {
  const kohde = valeKohde();
  const doc = valeKohde();
  const suljetut = [];
  const purku = kuunteleSulkevaNapautus(
    kohde, { kelpaa, napautus: (t) => suljetut.push(t) }, { doc },
  );
  return { kohde, doc, suljetut, purku };
}

test('lyhyt napautus paikallaan sulkee kortin — ja vasta sormen noustessa', () => {
  const { kohde, doc, suljetut } = pysty();
  const alas = tapahtuma(100, 400, 1000);
  kohde.laheta('pointerdown', alas);
  assert.equal(suljetut.length, 0, 'pointerdown ei saa yksin sulkea');
  doc.laheta('pointerup', tapahtuma(101, 402, 1120));
  assert.equal(suljetut.length, 1);
  assert.equal(suljetut[0], alas, 'sulkijalle annetaan alkuperäinen pointerdown');
});

test('pystyveto kynnyksen yli EI sulje korttia', () => {
  const { kohde, doc, suljetut } = pysty();
  kohde.laheta('pointerdown', tapahtuma(100, 400, 1000));
  doc.laheta('pointermove', tapahtuma(100, 400 - RAAHAUKSEN_KYNNYS, 1050));
  doc.laheta('pointermove', tapahtuma(100, 240, 1100));
  doc.laheta('pointerup', tapahtuma(100, 240, 1150));
  assert.equal(suljetut.length, 0);
});

test('veto ei palaa napautukseksi, vaikka sormi palaisi lähtöpisteeseen', () => {
  const { kohde, doc, suljetut } = pysty();
  kohde.laheta('pointerdown', tapahtuma(100, 400, 1000));
  doc.laheta('pointermove', tapahtuma(100, 300, 1050));
  doc.laheta('pointerup', tapahtuma(100, 400, 1100));
  assert.equal(suljetut.length, 0);
});

test('kynnyksen alle jäävä tärinä on yhä napautus', () => {
  const { kohde, doc, suljetut } = pysty();
  kohde.laheta('pointerdown', tapahtuma(100, 400, 1000));
  doc.laheta('pointermove', tapahtuma(100 + RAAHAUKSEN_KYNNYS - 1, 400, 1040));
  doc.laheta('pointerup', tapahtuma(100 + RAAHAUKSEN_KYNNYS - 1, 400, 1080));
  assert.equal(suljetut.length, 1);
});

test('selaimen ottama ele (pointercancel) ei sulje', () => {
  const { kohde, doc, suljetut } = pysty();
  kohde.laheta('pointerdown', tapahtuma(100, 400, 1000));
  doc.laheta('pointercancel', tapahtuma(100, 400, 1020));
  doc.laheta('pointerup', tapahtuma(100, 400, 1040));
  assert.equal(suljetut.length, 0);
});

test('pitkä painallus ei ole napautus', () => {
  const { kohde, doc, suljetut } = pysty();
  kohde.laheta('pointerdown', tapahtuma(100, 400, 1000));
  doc.laheta('pointerup', tapahtuma(100, 400, 1000 + NAPAUTUKSEN_KESTO_MS + 1));
  assert.equal(suljetut.length, 0);
});

test('toisen sormen irrotus ei sulje korttia', () => {
  const { kohde, doc, suljetut } = pysty();
  kohde.laheta('pointerdown', tapahtuma(100, 400, 1000, { id: 3 }));
  doc.laheta('pointerup', tapahtuma(100, 400, 1040, { id: 4 }));
  assert.equal(suljetut.length, 0);
  doc.laheta('pointerup', tapahtuma(100, 400, 1060, { id: 3 }));
  assert.equal(suljetut.length, 1);
});

test('kelpaa-rajaus torjuu eleen jo pointerdownissa (kortti, pöllö, suurennos)', () => {
  const { kohde, doc, suljetut } = pysty({ kelpaa: () => false });
  kohde.laheta('pointerdown', tapahtuma(100, 400, 1000));
  doc.laheta('pointerup', tapahtuma(100, 400, 1040));
  assert.equal(suljetut.length, 0);
  assert.equal(doc.kuulijat.length, 0, 'torjuttu ele ei saa jättää kuuntelijoita');
});

test('purku vie kaikki kuuntelijat', () => {
  const { kohde, doc, purku } = pysty();
  kohde.laheta('pointerdown', tapahtuma(100, 400, 1000));
  assert.ok(doc.kuulijat.length > 0);
  purku();
  assert.equal(kohde.kuulijat.length, 0);
  assert.equal(doc.kuulijat.length, 0);
});

/* ---------------------------------------------------------------- */
/* Vartiot lähdekoodissa: paluuta pelkkään pointerdowniin ei sallita  */
/* ---------------------------------------------------------------- */

test('vetokynnys on sama luku kuin kartan raahausvahdissa', () => {
  const kartta = lue('../js/kartta.js');
  assert.match(
    kartta,
    /Math\.hypot\(dx, dy\) < RAAHAUKSEN_KYNNYS/,
    'js/kartta.js raahausvahdin on käytettävä jaettua kynnystä',
  );
  assert.equal(typeof RAAHAUKSEN_KYNNYS, 'number');
  assert.ok(RAAHAUKSEN_KYNNYS > 0, 'kynnys ei saa kadota');
  // Talon toinen raahauskynnys (js/saapumisasento.js, fokusvirran veto)
  // on sama luku: napautuksen ja vedon raja ei saa riippua siitä, mikä
  // pinta eleen näkee.
  assert.equal(RAAHAUKSEN_KYNNYS, RAAHAUKSEN_KYNNYS_PX);
});

test('kaikki kolme korttia sulkeutuvat napautusvahdin kautta', () => {
  for (const polku of ['../js/fokuskohteet.js', '../js/fokusnosto.js', '../js/elaintaky.js']) {
    const lahde = lue(polku);
    assert.match(lahde, /kuunteleSulkevaNapautus\(/, `${polku} ei käytä napautusvahtia`);
  }
});

test('kortin oma ele lukee matkan IRROTUKSESTA, ei pelkästä raahaa-lipusta', () => {
  /*
   * Mitattu 12.9.2026 (iPad 834 x 1194): veto kortin OTSIKOSTA ylöspäin
   * sulki kortin, koska kosketuseleestä ei tullut yhtään pointermovea
   * eikä `raahaa` noussut. Sääntö on siksi irrotuksessa.
   */
  const lahde = lue('../js/fokuskohteet.js');
  assert.match(lahde, /matka >= RAAHAUKSEN_KYNNYS \|\| kesto > NAPAUTUKSEN_KESTO_MS/,
    'js/fokuskohteet.js raahausTaiSulku ei mittaa elettä irrotuksesta');
});

test('kuva edellä -kortti ei sulje omasta pointerdownistaan (vaihe 2)', () => {
  /*
   * OMISTAJAN TOINEN VIKAILMOITUS 12.9.2026, sanatarkasti: *"Nosto
   * häviää edelleen näkyvistä, jos vieritän mistään muualta kohdasta
   * kuin kuvaa painamalla. Eli ongelma on siinä, että peli ei tajua,
   * että pelaaja on painanut lisää nappia ja näkyviin on tullut koko
   * artikkeli, vaan peli luulee, että edelleen, jos pelaaja klikkaa
   * mistä tahansa muualta kuin kuvan päältä, niin artikkeli pitää
   * sulkea."*
   *
   * MITATTU JUURISYY (Chromium, CDP-kosketus, iPad 834 x 1194,
   * Parnassós-kortti vaiheessa 2): kortin OMA pointerdown-käsittelijä
   * (js/fokuskohteet.js avaaFokuskohde) sulki kuva edellä -kortin
   * suoraan, ilman mitään ele-ehtoa. Kuvan päältä alkava veto meni
   * läpi vain siksi, että kuva on `button` ja käsittelijä palaa
   * painikkeiden kohdalla ennen sulkua — kaikki muu (ylärivi, otsikko,
   * leipäteksti, lähderivi, pöllökysymykset) sulki kortin. v1806:n
   * napautusvahti korjasi vain kortin ULKOPUOLISEN eleen.
   *
   * Vartio lukee juuri sen haaran: `nostokuvaKortissa(popup)` saa
   * palata, mutta ei sulkea.
   */
  const lahde = lue('../js/fokuskohteet.js');
  const i = lahde.indexOf('if (nostokuvaKortissa(popup))');
  assert.ok(i > 0, 'kuva edellä -kortin haaraa ei löytynyt');
  const haara = lahde.slice(i, i + 200);
  assert.doesNotMatch(haara, /suljeFokuskohde/,
    'kuva edellä -kortti sulkeutuu taas suoraan pointerdownista');
  assert.match(haara, /if \(nostokuvaKortissa\(popup\)\) return;/,
    'haaran on palattava ilman sulkua');
  // Sulku on siirretty napautusvahtiin, joka odottaa sormen nousua.
  assert.match(lahde, /const kuvanNapautus = kuunteleSulkevaNapautus\(popup, \{/,
    'kuva edellä -kortilta puuttuu oma napautusvahti');
  assert.match(lahde, /kuvanNapautus\(\);/, 'napautusvahtia ei pureta kortin mukana');
});

test('kuva edellä -kortin ylätekstit ovat vierityspintaa, eivät raahauskahvaa', () => {
  /*
   * Kortin ylärivi ja otsikko ovat tavallisessa tietoruudussa
   * raahauskahva (`touch-action: none`). Kuva edellä -korttia ei
   * raahata lainkaan, joten `none` jätti otsikon päältä alkavan
   * pystyvedon tyhjän päälle: selain ei vierittänyt eikä lähettänyt
   * pointercancelia. Nyt ele kuuluu kortin omalle vieritykselle.
   */
  const css = lue('../css/nostokuva.css');
  const alku = css.indexOf('.nostokuva-kortti .fokuskohde-ylarivi');
  assert.ok(alku > 0, 'ylätekstien sääntöä ei löytynyt');
  const lohko = css.slice(alku, css.indexOf('}', alku));
  assert.ok(lohko.includes('.nostokuva-kortti .fokuskohde-otsikko'),
    'sääntö ei kata otsikkoa');
  assert.ok(lohko.includes('touch-action: pan-y'),
    'otsikon päältä alkava veto ei mene kortin vieritykselle');
});

test('yksikään kortti ei sulje suoraan pointerdownista', () => {
  const parit = [
    ['../js/fokuskohteet.js', /addEventListener\('pointerdown'[^)]*ulos/],
    ['../js/fokusnosto.js', /kerros\.addEventListener\('pointerdown'/],
    ['../js/elaintaky.js', /kerros\.addEventListener\('pointerdown'/],
  ];
  for (const [polku, kielletty] of parit) {
    assert.doesNotMatch(lue(polku), kielletty,
      `${polku}: sulkeminen palasi pelkkään pointerdowniin`);
  }
});
