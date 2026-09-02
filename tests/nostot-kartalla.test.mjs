/*
 * JOKAINEN KARTTANOSTO ON JOLLAIN KARTALLA.
 *
 * Omistajan sääntö 2.9.2026 (sanatarkasti): *"lisää kaikki historian
 * hetket ja muut karttanostot myös joko pääkarttanäkymään tai sitten
 * kaupunkilehden kaupunkikartalle, ellei näin ole jo tehty."* Lehtisivu
 * ei siis koskaan ole noston ainoa paikka.
 *
 * Sääntö on helppo rikkoa vahingossa, koska kolme erillistä
 * mekanismia siirtää nostoja lehteen ja jokainen niistä on oikeassa
 * omalla perusteellaan: kaupunkinostojen katto (v1419), lehtisiirrot
 * (v1421, v1427, v1451) ja Historian hetkien sijoitussääntö (v1453).
 * Yhdessä ne veivät 65 nostoa ja 8 hetkeä pelkkään lehteen. Tämä testi
 * laskee saman asian pelin OMALLA koodilla joka ajolla
 * (tools/tarkista-nostopaikat.mjs) eikä anna tilanteen palata.
 *
 * Testi ei arvostele sisältöä eikä sommittelua. Se kysyy neljä asiaa:
 *
 *   1. onko jokaisella nostolla karttapaikka,
 *   2. onko kohdekartan piste, joka noston kantaa, oikeasti
 *      napautettava ja osuuko se kartan rajaukseen,
 *   3. onko kaupunkikatosta vapautettu nosto (kattoVapaa) oikeasti
 *      kaupungin kohdekartan ulkopuolella — lippu ei saa levitä
 *      kaupungin sisälle, koska silloin katto lakkaisi toimimasta,
 *   4. onko kohdekartan juttu yhä sanatarkasti sama teksti kuin
 *      noston omassa pakissa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  kohdekarttojenNostot, kohdekartallaSisalla, nostojenKarttapaikat,
} from '../tools/tarkista-nostopaikat.mjs';
import { KAUPUNKIKARTAT } from '../js/packs/maakartat.js';
import { NAHTAVYYSJUTUT } from '../js/packs/nahtavyysjutut.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { SKANDAALIT } from '../js/packs/skandaalit.js';
import { HISTORIAN_HETKET } from '../js/packs/historian-hetket.js';

const { rivit, puuttuvat } = nostojenKarttapaikat();

test('jokainen karttanosto on pääkartalla tai kohdekartalla', () => {
  const nimet = puuttuvat.map((r) => `${r.kaupunki ?? r.iso}/${r.id} (${r.nimi})`);
  assert.deepEqual(nimet, [],
    `${nimet.length} nostoa on vain lehdessä — omistajan sääntö 2.9.2026 vaatii `
    + 'jokaiselle paikan pääkartalta tai kaupunkilehden kohdekartalta');
});

test('nostoja on odotettu määrä eikä yksikään kadonnut', () => {
  // Kolme lukua, jotka muuttuvat vain sisältöä lisättäessä. Jos jokin
  // niistä laskee, jotain on pudonnut kartalta hiljaa.
  assert.ok(rivit.length >= 694, `nostoja on ${rivit.length}, odotettiin vähintään 694`);
  const kohdekartalla = rivit.filter((r) => r.kohdekartalla).length;
  assert.ok(kohdekartalla >= 45,
    `kohdekartoilla on ${kohdekartalla} nostoa, odotettiin vähintään 45`);
});

test('kohdekartan nostopiste on napautettava ja rajauksen sisällä', () => {
  const linkit = kohdekarttojenNostot();
  for (const [tunnus, { kaupunki, piste, avattava }] of linkit) {
    const kartta = KAUPUNKIKARTAT[kaupunki];
    const kohde = kartta.kohteet.find((k) => k.nimi === piste);
    assert.ok(kohde, `${kaupunki}: pistettä "${piste}" ei ole`);
    assert.ok(avattava,
      `${kaupunki}/${piste} kantaa nostoa ${tunnus}, mutta pisteellä ei ole `
      + 'juttua eikä wiki-artikkelia — merkki, jolle ei tapahdu mitään');
    assert.ok(kohdekartallaSisalla(kartta, kohde.lat, kohde.lon),
      `${kaupunki}/${piste} on kartan rajauksen ulkopuolella`);
  }
});

test('kaupunkikatosta vapautettu nosto on kohdekartan ulkopuolella', () => {
  /*
   * `kattoVapaa` on tarkoitettu VAIN nostoille, jotka eivät ole
   * kohdekaupungissa vaan sen lähialueella (Vitoša, Wieliczka,
   * Richmond Park). Jos lippu leviäisi kaupungin sisälle, omistajan
   * kolmen noston katto (1.9.2026) lakkaisi vähitellen toimimasta.
   * Ehto: kaupungilla ei ole kohdekarttaa TAI piste on sen rajauksen
   * ulkopuolella.
   *
   * HISTORIAN HETKET EIVÄT KUULU TÄHÄN. Hetki ei ole nähtävyys vaan oma
   * lajinsa: sen kortti on havainnekuvineen, tiimalasimerkkeineen ja
   * minivisoineen sellainen, jota kohdekartan nähtävyysikkuna ei osaa
   * näyttää (js/historian-hetket.js). Siksi hetki kuuluu pääkartalle
   * silloinkin, kun sen piste sattuu osumaan kohdekartan rajaukseen
   * (Kristiania on Oslon kartalla, Restelo ei ole Lissabonin).
   */
  const vapautetut = rivit.filter((r) => r.kattoVapaa && r.kaupunki && r.tyyppi !== 'hetki');
  assert.ok(vapautetut.length >= 16,
    `kattoVapaa-lippuja löytyi ${vapautetut.length}, odotettiin vähintään 16`);
  for (const r of vapautetut) {
    const kartta = KAUPUNKIKARTAT[r.kaupunki];
    if (!kartta) continue;
    /*
     * Nosto, jonka ankkuri on kaupungin laatta itse (`nosto-dracula`),
     * ei ole "kaupungin sisällä" vaan koko kaupungin nosto: sillä ei
     * ole omaa osoitetta, jonka kohdekartalle voisi merkitä. Sellaisen
     * tunnistaa siitä, että etäisyys laattaan on nolla.
     */
    if (r.etaisyys < 0.05) continue;
    assert.ok(!kohdekartallaSisalla(kartta, r.lat, r.lon),
      `${r.id} on ${r.kaupunki}n kohdekartan rajauksen sisällä — sen paikka on `
      + 'kohdekartalla eikä kaupunkikaton ohituksessa (kattoVapaa)');
  }
});

test('kohdekartan nostojuttu on sanatarkasti noston oma teksti', () => {
  /*
   * Sama vaatimus kuin Historian hetkillä (tests/historian-hetket.test.mjs):
   * kun sama teksti asuu kahdessa tiedostossa, se eriytyy hiljaa.
   * Vertailu tehdään vain niille jutuille, joiden lähde on koneellisesti
   * löydettävissä tunnuksesta — syvennystarinat, skandaalit ja
   * täkynostot. Kartan omista kohteista (fokuskohteet-*.js) juttua ei
   * kopioitu, joten niitä ei ole tässä.
   */
  const cc = MAAILMANKARTTA.map?.cityCountry ?? {};
  let verrattu = 0;
  for (const [kaupunki, jutut] of Object.entries(NAHTAVYYSJUTUT)) {
    for (const [nimi, juttu] of Object.entries(jutut)) {
      if (!juttu.nosto) continue;
      const lahde = nostonLahdeteksti(juttu.nosto, kaupunki, cc);
      if (lahde === null) continue;
      assert.equal(juttu.teksti, lahde,
        `${kaupunki}/${nimi}: juttu eriytyi noston ${juttu.nosto} omasta tekstistä`);
      verrattu += 1;
    }
  }
  assert.ok(verrattu >= 37, `vertailtavia juttuja oli ${verrattu}, odotettiin vähintään 37`);
});

/** Noston oma teksti tunnuksesta, tai null jos lähde ei ole taulukoitu. */
function nostonLahdeteksti(tunnus, kaupunki, cc) {
  if (tunnus.startsWith('syvennys-')) {
    const loppu = tunnus.slice('syvennys-'.length);
    for (const [cityId, virta] of Object.entries(FOKUSVIRRAT)) {
      if (!loppu.startsWith(`${cityId}-`)) continue;
      const takyId = loppu.slice(cityId.length + 1);
      const taky = (virta.takyt ?? []).find((t) => t.id === takyId);
      if (taky) return taky.teksti;
    }
    return null;
  }
  if (tunnus.startsWith('skandaali-')) {
    const id = tunnus.slice('skandaali-'.length);
    for (const lista of Object.values(SKANDAALIT)) {
      const s = lista.find((x) => x.id === id);
      if (s) return s.kortti;
    }
    return null;
  }
  if (tunnus.startsWith('nosto-')) {
    const id = tunnus.slice('nosto-'.length);
    const virta = FOKUSVIRRAT[kaupunki];
    const nosto = (virta?.takynostot ?? []).find((n) => n.id === id);
    if (!nosto) return null;
    if (nosto.teksti) return nosto.teksti;
    return Array.isArray(nosto.lunastus) ? nosto.lunastus.join('\n\n') : (nosto.lunastus ?? null);
  }
  return null;
}

test('lehteen jätetyllä hetkellä on kirjattu syy', () => {
  for (const hetki of HISTORIAN_HETKET) {
    if (hetki.kartalla || !hetki.kartanUlkopuolella) continue;
    assert.ok(typeof hetki.kartanUlkopuolellaSyy === 'string'
      && hetki.kartanUlkopuolellaSyy.trim().length > 20,
    `${hetki.id}: poikkeukselle ei ole kirjattu syytä (kartanUlkopuolellaSyy)`);
  }
  const poikkeukset = HISTORIAN_HETKET.filter((h) => h.kartanUlkopuolella).map((h) => h.id);
  assert.deepEqual(poikkeukset.sort(),
    ['amundsen-etelanapa-1911', 'darwin-galapagos-1835'],
    'poikkeuslista muuttui — uusi lehteen jäävä hetki vaatii omistajan päätöksen');
});
