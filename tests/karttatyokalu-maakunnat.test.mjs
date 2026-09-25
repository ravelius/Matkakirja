/*
 * Karttatyökalun Maakunnat-välilehden runko (22.9.2026).
 *
 * Testit kattavat vain PUHTAAT DATA- JA APUFUNKTIOT: rakennaMaakunnat
 * itse rakentaa DOMia (document.createElement), eikä Nodessa ole
 * selainta — sama rajaus kuin muuallakin repossa (ks. esim.
 * tests/nostokuva-kortit.test.mjs:n oma pieni DOM-malli, jota tämä
 * tiedosto ei toista, koska rungossa ei vielä ole mitään mitattavaa
 * asemointia). DOM-käyttäytyminen mitataan myöhemmin savukkeella, kun
 * karttaselitteen välilehtikehys on olemassa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MAAKUNTIEN_NIMET, MAAKUNTIEN_MAAT, maakunnanNimi, maakunnanKuvat, maakuntienMaa, EI_MAAKUNTIA_TEKSTI,
} from '../js/karttatyokalu-maakunnat.js';
import { MAAKUNTIEN_LUONNEHDINNAT } from '../js/packs/maakunnat-luonnehdinnat.js';
import { MAAKUNTIEN_PULU } from '../js/packs/maakunnat-pulu.js';

test('MAAKUNTIEN_MAAT on kahdeksan maata ja täsmää MAAKUNTIEN_NIMET-tauluun', () => {
  assert.equal(MAAKUNTIEN_MAAT.length, 8);
  const isotMaista = MAAKUNTIEN_MAAT.map((m) => m.iso).sort();
  const isotNimista = Object.keys(MAAKUNTIEN_NIMET).sort();
  assert.deepEqual(isotMaista, isotNimista,
    'MAAKUNTIEN_MAAT ja MAAKUNTIEN_NIMET listaavat eri maita');
  for (const { iso, nimi } of MAAKUNTIEN_MAAT) {
    assert.ok(typeof nimi === 'string' && nimi.length > 0, `${iso}: maan nimi puuttuu`);
  }
});

/*
 * KATTAVUUS ON YKSISUUNTAINEN (tehtävänannon sana "kattaa"): jokainen
 * MAAKUNTIEN_LUONNEHDINNAT-avain löytyy MAAKUNTIEN_NIMET-taulusta, ei
 * toisin päin — Sveitsillä (CHE) on nimet mutta ei vielä luonnehdintoja,
 * ja se on tarkoituksellista (js/karttatyokalu-maakunnat.js kommentti).
 *
 * Testi RAPORTOI PUUTTUVAT avaimet virheviestissä, jotta tulevan erän
 * (Fable kirjoittaa lisää luonnehdintoja) mahdollinen kirjoitusvirhe
 * tunnuksessa näkyy heti eikä vasta kartalla.
 */
test('MAAKUNTIEN_NIMET kattaa kaikki MAAKUNTIEN_LUONNEHDINNAT-avaimet', () => {
  const puuttuvat = [];
  for (const iso of Object.keys(MAAKUNTIEN_LUONNEHDINNAT)) {
    for (const tunnus of Object.keys(MAAKUNTIEN_LUONNEHDINNAT[iso])) {
      if (MAAKUNTIEN_NIMET[iso]?.[tunnus] === undefined) puuttuvat.push(`${iso}:${tunnus}`);
    }
  }
  assert.deepEqual(puuttuvat, [],
    `MAAKUNTIEN_NIMET-taulusta puuttuu ${puuttuvat.length} luonnehdinta-avainta: ${puuttuvat.join(', ')}`);
});

test('maakunnanNimi palauttaa suomenkielisen nimen ja tuntemattomalle avaimelle tunnuksen itsensä', () => {
  assert.equal(maakunnanNimi('FRA', 'Bretagne'), 'Bretagne');
  assert.equal(maakunnanNimi('FRA', 'Normandie'), 'Normandia');
  assert.equal(maakunnanNimi('FRA', "Provence-Alpes-Côte-d'Azur"), "Provence-Alpes-Côte d'Azur");
  assert.equal(maakunnanNimi('XYZ', 'Ei-olemassa'), 'Ei-olemassa');
});

test('maakunnanKuvat normalisoi kuva-kentän aina listaksi', () => {
  assert.deepEqual(maakunnanKuvat(undefined), []);
  assert.deepEqual(maakunnanKuvat({}), []);
  assert.deepEqual(maakunnanKuvat({ kuva: null }), []);

  const yksi = { osoite: 'a.jpg', lahde: 'Commons', lisenssi: 'CC BY-SA 4.0', tekija: 'Joku' };
  assert.deepEqual(maakunnanKuvat({ kuva: yksi }), [yksi]);

  const kaksi = [yksi, { osoite: 'b.jpg' }];
  assert.deepEqual(maakunnanKuvat({ kuva: kaksi }), kaksi);

  // Listan sisällä oleva tyhjä alkio ei saa päätyä kortille asti.
  assert.deepEqual(maakunnanKuvat({ kuva: [yksi, null, undefined] }), [yksi]);
});

/*
 * PULU-DATAN MUOTO (js/packs/maakunnat-pulu.js alkukommentti): tyhjä
 * runko tässä erässä, mutta testi vahtii muotoa siltä varalta, että
 * Sisältökirjuri täyttää taulukon myöhemmin ilman että kukaan lukee
 * tätä testiä uudestaan.
 */
test('MAAKUNTIEN_PULU: muoto on ISO -> tunnus -> [{ q, a }] ja avaimet ovat kelvollisia', () => {
  assert.equal(typeof MAAKUNTIEN_PULU, 'object');
  const virheet = [];
  for (const [iso, alueet] of Object.entries(MAAKUNTIEN_PULU)) {
    if (MAAKUNTIEN_NIMET[iso] === undefined) {
      virheet.push(`${iso}: tuntematon maa (ei MAAKUNTIEN_NIMET-taulussa)`);
      continue;
    }
    for (const [tunnus, kysymykset] of Object.entries(alueet)) {
      if (MAAKUNTIEN_NIMET[iso][tunnus] === undefined) {
        virheet.push(`${iso}:${tunnus}: tuntematon alue`);
        continue;
      }
      if (!Array.isArray(kysymykset) || kysymykset.length < 2 || kysymykset.length > 3) {
        virheet.push(`${iso}:${tunnus}: kysymyksiä pitää olla 2-3, oli ${kysymykset?.length}`);
        continue;
      }
      kysymykset.forEach(({ q, a } = {}, i) => {
        if (typeof q !== 'string' || q.trim().length === 0) {
          virheet.push(`${iso}:${tunnus}[${i}]: kysymys (q) puuttuu`);
        }
        if (typeof a !== 'string' || a.trim().length === 0) {
          virheet.push(`${iso}:${tunnus}[${i}]: vastaus (a) puuttuu`);
        }
      });
    }
  }
  assert.deepEqual(virheet, [], virheet.join('\n'));
});

/*
 * LÖYDÖS 70 (Fable 25.9.2026): Kreikassa Maakunnat-välilehti näytti Ranskan.
 * Nykyinen maa avataan vain, jos sillä on maakuntia; muuten ei yhtään ryhmää
 * eikä Ranskaa varalle, ja lista kertoo sen tekstillä.
 */
test('maakuntienMaa: vain maakuntamaat, ei Ranskaa varalle', () => {
  for (const { iso } of MAAKUNTIEN_MAAT) assert.equal(maakuntienMaa(iso), iso);
  assert.equal(maakuntienMaa('GRC'), null);
  assert.equal(maakuntienMaa('BGR'), null);
  assert.equal(maakuntienMaa(undefined), null);
  assert.equal(EI_MAAKUNTIA_TEKSTI, 'Tälle maalle ei ole vielä maakuntia');
});
