/*
 * VALIKON SULKU EI AVAA KOHDETTA KARTALLA.
 *
 * Omistajan iPad-havainto 7.9.2026, sanatarkasti: *"jos hampurilainen
 * tai joku muu valikko on auki ja käyttäjä klikkaa mitä tahansa kohtaa
 * kartalla, niin silloin vain se Valikko pitäisi sulkeutua, mutta mikään
 * kohde ei saisi avautua kartalla samalla klikkauksella."*
 *
 * Vartija on js/ui-apurit.js asennaValikonSulkuvartija; koko ketju
 * ruudulla on savukkeessa tools/savukkeet/savuke-valikon-sulku.mjs ja
 * perustelut docs/moduulit/karttapallo.md luvussa 12. Tämä testi pitää
 * huolen SÄÄNNÖISTÄ, jotka eivät vaadi selainta: mitä lasketaan
 * kartaksi, mikä on komento, ja milloin lippu nousee ja laskee.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  KARTAN_ALUE,
  VALIKKOKERROKSET,
  asennaValikonSulkuvartija,
  avoimetValikot,
  onkoValikkoAuki,
  suljeAvoimetValikot,
  valikkoSulkeutuiNapautuksesta,
} from '../js/ui-apurit.js';

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli: vain se, mitä vartija koskee                      */
/* ---------------------------------------------------------------- */

/** Elementti, joka osaa kertoa esivanhempansa valitsimella. */
function solmu(nimet, { hidden = false } = {}) {
  const el = {
    nimet: new Set(nimet),
    hidden,
    attrs: {},
    vanhempi: null,
    setAttribute(nimi, arvo) { el.attrs[nimi] = arvo; },
    closest(valitsin) {
      const osat = valitsin.split(',').map((o) => o.trim()).filter(Boolean);
      for (let k = el; k; k = k.vanhempi) {
        if (osat.some((o) => k.nimet.has(o))) return k;
      }
      return null;
    },
  };
  return el;
}

/** Vale-dokumentti: valikot tunnisteineen ja dokumentin kuuntelijat. */
function valeDoc() {
  const kuulijat = [];
  const solmut = new Map();
  for (const { valikko, nappi } of VALIKKOKERROKSET) {
    solmut.set(valikko, solmu([valikko], { hidden: true }));
    solmut.set(nappi, solmu([nappi]));
  }
  return {
    kuulijat,
    solmut,
    querySelector(valitsin) { return solmut.get(valitsin) ?? null; },
    addEventListener(laji, kuulija, kaappaus) { kuulijat.push({ laji, kuulija, kaappaus }); },
    removeEventListener(laji, kuulija) {
      const i = kuulijat.findIndex((k) => k.laji === laji && k.kuulija === kuulija);
      if (i >= 0) kuulijat.splice(i, 1);
    },
  };
}

/** Napautus: kohde-elementti ja ruutupiste. */
function napautus(kohde, x = 200, y = 400) {
  const jaljet = [];
  return {
    target: kohde,
    clientX: x,
    clientY: y,
    jaljet,
    stopPropagation() { jaljet.push('stop'); },
    stopImmediatePropagation() { jaljet.push('heti'); },
    preventDefault() { jaljet.push('esta'); },
  };
}

/** Vartija asennettuna: palauttaa pointerdownin syöttäjän ja purun. */
function vartija(doc) {
  const purku = asennaValikonSulkuvartija({ doc });
  const alas = doc.kuulijat.find((k) => k.laji === 'pointerdown' && k.kaappaus === true);
  assert.ok(alas, 'vartijaa ei asennettu kaappausvaiheeseen');
  // Lippu voi olla edellisestä testistä päällä: kulutetaan se pois.
  valikkoSulkeutuiNapautuksesta();
  return { paina: (tapahtuma) => alas.kuulija(tapahtuma), purku };
}

/** Kartalla oleva pinta (pallon kangas .map-panen sisällä). */
const kartanPinta = (doc) => {
  const pane = solmu([KARTAN_ALUE]);
  const kangas = solmu(['canvas']);
  kangas.vanhempi = pane;
  doc.solmut.set('.kangas', kangas);
  return kangas;
};

test('avoimetValikot ja onkoValikkoAuki lukevat hidden-tilan', () => {
  const doc = valeDoc();
  assert.equal(onkoValikkoAuki(doc), false);
  assert.deepEqual(avoimetValikot(doc), []);
  doc.querySelector('#paavalikko').hidden = false;
  assert.equal(onkoValikkoAuki(doc), true);
  assert.equal(avoimetValikot(doc).length, 1);
});

test('suljeAvoimetValikot sulkee kaikki ja nollaa aria-expandedin', () => {
  const doc = valeDoc();
  for (const { valikko } of VALIKKOKERROKSET) doc.querySelector(valikko).hidden = false;
  assert.equal(suljeAvoimetValikot(doc), true);
  for (const { valikko, nappi } of VALIKKOKERROKSET) {
    assert.equal(doc.querySelector(valikko).hidden, true, `${valikko} jäi auki`);
    assert.equal(doc.querySelector(nappi).attrs['aria-expanded'], 'false');
  }
  // Toinen kutsu ei enää löydä mitään suljettavaa.
  assert.equal(suljeAvoimetValikot(doc), false);
});

test('kartan napautus sulkee valikon ja nielaisee napautuksen', () => {
  const doc = valeDoc();
  const { paina, purku } = vartija(doc);
  doc.querySelector('#paavalikko').hidden = false;
  paina(napautus(kartanPinta(doc)));
  assert.equal(doc.querySelector('#paavalikko').hidden, true, 'valikko ei sulkeutunut');
  // Nielu asennettiin: seuraava click samasta pisteestä syödään.
  const nielu = doc.kuulijat.find((k) => k.laji === 'click' && k.kaappaus === true);
  assert.ok(nielu, 'sulkevan napautuksen nielua ei asennettu');
  // Ja laudan osumatesti saa lipun ENNEN kuin se ehtii mitata mitään.
  assert.equal(valikkoSulkeutuiNapautuksesta(), true);
  assert.equal(valikkoSulkeutuiNapautuksesta(), false, 'lippu ei kulunut lukemisesta');
  purku();
});

test('ilman avointa valikkoa napautus kulkee kartalle koskemattomana', () => {
  const doc = valeDoc();
  const { paina, purku } = vartija(doc);
  const tapahtuma = napautus(kartanPinta(doc));
  paina(tapahtuma);
  assert.deepEqual(tapahtuma.jaljet, [], 'napautusta kosketeltiin turhaan');
  assert.equal(doc.kuulijat.some((k) => k.laji === 'click'), false, 'nielu asennettiin turhaan');
  assert.equal(valikkoSulkeutuiNapautuksesta(), false);
  purku();
});

test('kartan ulkopuolinen napautus ei kuulu vartijalle', () => {
  const doc = valeDoc();
  const { paina, purku } = vartija(doc);
  doc.querySelector('#paavalikko').hidden = false;
  // Napautus valikon omassa kotelossa (topbar) — ei .map-panea.
  paina(napautus(solmu(['.valikko-kotelo'])));
  assert.equal(doc.querySelector('#paavalikko').hidden, false, 'vartija sulki valikon itsensä alta');
  assert.equal(valikkoSulkeutuiNapautuksesta(), false);
  purku();
});

test('nappi kartan päällä on komento eikä "kohta kartalla"', () => {
  const doc = valeDoc();
  const { paina, purku } = vartija(doc);
  doc.querySelector('#paavalikko').hidden = false;
  const pane = solmu([KARTAN_ALUE]);
  const nappi = solmu(['button']);
  nappi.vanhempi = pane;
  paina(napautus(nappi));
  assert.equal(doc.querySelector('#paavalikko').hidden, false, 'napin napautus nielaistiin');
  assert.equal(valikkoSulkeutuiNapautuksesta(), false);
  purku();
});

test('veto ei jätä lippua roikkumaan seuraavaan napautukseen', () => {
  const doc = valeDoc();
  const { paina, purku } = vartija(doc);
  const pinta = kartanPinta(doc);
  doc.querySelector('#kehittaja-valikko').hidden = false;
  // 1. napautus sulkee ratasvalikon (ja jää vedoksi: clickiä ei tule).
  paina(napautus(pinta));
  assert.equal(doc.querySelector('#kehittaja-valikko').hidden, true);
  // 2. napautus: valikkoa ei enää ole auki, joten lippu on nollattu ja
  //    kohde saa avautua normaalisti.
  paina(napautus(pinta));
  assert.equal(valikkoSulkeutuiNapautuksesta(), false, 'lippu jäi roikkumaan vedosta');
  purku();
});

test('purku irrottaa vartijan dokumentista', () => {
  const doc = valeDoc();
  const { purku } = vartija(doc);
  assert.equal(doc.kuulijat.filter((k) => k.laji === 'pointerdown').length, 1);
  purku();
  assert.equal(doc.kuulijat.filter((k) => k.laji === 'pointerdown').length, 0);
});
