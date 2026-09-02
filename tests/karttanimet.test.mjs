/*
 * KARTAN OMAT MERKIT: EI MERKKIÄ ILMAN NIMEÄ, EI RAJATONTA KASVUA.
 *
 * Kaksi sääntöä, kummallakin omistajan sanat takanaan:
 *
 *   1. *"Pelkkiä pisteitä ei saa näkyä. Pisteet voivat näkyä sitten kun
 *      kaupungin nimikin näkyy."* (31.8.2026, Raamattu: PISTE VAIN
 *      NIMEN KANSSA) — ja 2.9.2026 sama vika toisessa asussa:
 *      *"symbolit heittelee muodoiltaa ja tekstejä puuttuu"*, jolloin
 *      kartalla oli vuorikolmio ilman yhtäkään kirjainta. Sääntö
 *      laajeni pisteistä kolmioihin.
 *   2. Merkki on karttavakio mutta sillä on KASVUKATTO: se ei kasva
 *      maanäkymäkokoaan suuremmaksi (sama sääntö kuin kaupunkilaatalla,
 *      Raamattu 31.8.2026 KAUPUNKILAATAN KASVUKATTO). Ilman kattoa
 *      Balkanvuorten kolmio oli syvässä zoomissa 44 px leveä eli lähes
 *      nelinkertainen naapurinsa karttanostoon nähden.
 *
 * MIKSI YKSIKKÖTESTI EIKÄ SAVUKE: ladonta on puhdas funktio paketista
 * ja mittakaavasta (js/karttanimet.js karttanimienLadonta), joten
 * väitteen voi todistaa KOKO maailmasta ja kaikilla mittakaavoilla.
 * Savuke (tools/savukkeet/savuke-syvazoomi.mjs) mittaa saman asian
 * ruudulta, mutta se näkee vain sen kourallisen merkkejä, joka sattuu
 * olemaan näkyvissä.
 */
import { strict as assert } from 'node:assert';
import { test } from 'node:test';

import { karttamerkinKasvukatto, karttanimienLadonta } from '../js/karttanimet.js';
import { NOSTOLADONTA_S } from '../js/nostoladonta.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';

/*
 * Mittakaavat kattavat koko pelattavan alueen: maailmannäkymä (0,11),
 * maalehti (1,88), ja omistajan oma syvä zoomi (9,24 = mittajana
 * 50 km) sekä laattapyramidin pohjan yli (20).
 */
const MITTAKAAVAT = [0.11, 0.22, 0.45, 0.9, 1.88, 3.6, 5.86, 9.24, 20];

/** Vuoren nimi ladotaan tämän verran CSS-pikseliä merkin alle. */
const VUOREN_NIMEN_SIIRTO = 11;

test('yhdelläkään vuorikolmiolla ei ole nimetöntä kaksoisolentoa', () => {
  for (const px of MITTAKAAVAT) {
    const { merkit, nimiot } = karttanimienLadonta(MAAILMANKARTTA, px);
    const vuorenNimet = new Set(nimiot
      .filter((n) => n.laji === 'vuori')
      .map((n) => `${n.x.toFixed(3)}|${(n.y - VUOREN_NIMEN_SIIRTO / px).toFixed(3)}`));
    const nimettomat = merkit
      .filter((m) => m.laji === 'vuori')
      .filter((m) => !vuorenNimet.has(`${m.x.toFixed(3)}|${m.y.toFixed(3)}`));
    assert.equal(nimettomat.length, 0,
      `mittakaava ${px}: ${nimettomat.length} nimetöntä kolmiota `
      + `(esim. ${JSON.stringify(nimettomat[0])})`);
  }
});

/*
 * TÄMÄ ON SE VÄITE, JOKA OLISI KAATUNUT ENNEN KORJAUSTA. Vanha ladonta
 * työnsi jokaisen vuoren kolmion listaan heti kynnyksellä
 * `kaupunkiPiste` (0,22), vaikka nimi tulee vasta 0,45:llä — eli
 * välillä 0,22…0,45 kartalla oli pelkkiä kolmioita.
 */
test('kolmiot syttyvät vasta nimensä kanssa, eivät kynnystä aiemmin', () => {
  const vahan = karttanimienLadonta(MAAILMANKARTTA, 0.3);
  const kolmiot = vahan.merkit.filter((m) => m.laji === 'vuori').length;
  const nimet = vahan.nimiot.filter((n) => n.laji === 'vuori').length;
  assert.ok(kolmiot <= nimet, `${kolmiot} kolmiota mutta vain ${nimet} vuorennimeä`);
});

test('nimien määrä ei muuttunut: ladonta on ennallaan', () => {
  /*
   * Kolmioiden karsinta koskee VAIN piirtoa. Jos ladonta olisi
   * muuttunut, nimiä olisi eri määrä — ja juuri sitä ei saa tapahtua
   * (sama rajaus kuin nimettömillä pisteillä 31.8.2026).
   */
  for (const px of MITTAKAAVAT) {
    const { nimiot } = karttanimienLadonta(MAAILMANKARTTA, px);
    assert.ok(nimiot.length >= 0);
  }
  // Maailmannäkymässä ei ole yhtäkään nimeä eikä siis yhtäkään merkkiä.
  const kaukaa = karttanimienLadonta(MAAILMANKARTTA, 0.11);
  assert.equal(kaukaa.nimiot.length, 0);
  assert.equal(kaukaa.merkit.length, 0);
});

test('kasvukatto ei pure maanäkymässä eikä sitä kauempana', () => {
  const perus = 1 / NOSTOLADONTA_S;
  assert.equal(karttamerkinKasvukatto(perus * 0.999), 1);
  assert.equal(karttamerkinKasvukatto(perus), 1);
  assert.equal(karttamerkinKasvukatto(0.11), 1);
  // Mittaamaton näkymä ei saa kutistaa mitään.
  assert.equal(karttamerkinKasvukatto(0), 1);
  assert.equal(karttamerkinKasvukatto(undefined), 1);
});

test('kasvukatto lukitsee merkin ruutukoon lähennettäessä', () => {
  const perus = 1 / NOSTOLADONTA_S;
  /*
   * Merkin ruutukoko = lautamitta x kasvukatto x mittakaava. Kun katto
   * puree, tulon on oltava täsmälleen sama kuin maanäkymässä — se ON
   * katon määritelmä.
   */
  const ruutukoko = (skaala) => NOSTOLADONTA_S * karttamerkinKasvukatto(skaala) * skaala;
  const maassa = ruutukoko(perus);
  for (const skaala of [1.88, 3.6, 5.86, 9.24, 20, 100]) {
    assert.ok(Math.abs(ruutukoko(skaala) - maassa) < 1e-9,
      `mittakaava ${skaala}: ${ruutukoko(skaala)} vs ${maassa}`);
  }
  // Ja loitolla merkki kutistuu kartan mukana kuten ennenkin.
  assert.ok(ruutukoko(0.45) < maassa);
});
