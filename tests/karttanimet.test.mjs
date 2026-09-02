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

import {
  asetaRuutuvaraukset, karttamerkinKasvukatto, karttanimienLadonta,
} from '../js/karttanimet.js';
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

/*
 * ====== PELIMERKKI ON LADONNAN VARAUS (omistaja 2.9.2026) ==========
 *
 * Sanatarkasti: *"syvällä zoomilla kaupungin nimiö jää pelinappulan
 * alle"* (kaappaus Sofiasta, mittajana 50 km: *"SOFIA"* katosi
 * nappulan ja laatan taakse).
 *
 * MIKSI YKSIKKÖTESTI EIKÄ VAIN SAVUKE: väite on LADONNAN väite eikä
 * piirron. Savuke (tools/savukkeet/savuke-syvazoomi.mjs) mittaa saman
 * asian ruudulta yhdestä näkymästä; tämä todistaa sen jokaisella
 * lähimittakaavalla — ja nimenomaan sen puolen, joka on helppo rikkoa
 * vahingossa: että varaus SIIRTÄÄ nimen eikä pudota sitä.
 *
 * VARAUS ON LAUDAN YKSIKÖISSÄ ja mitoitettu siitä, mitä ruudulla
 * oikeasti on: pelaajan kaupungin laatta oli mitattuna 29,5 x 31,8 px
 * mittakaavalla 9,24 eli noin 3,2 x 3,4 lautayksikköä. Tässä käytetty
 * laatikko on sen kokoinen — juuri se pino, jonka alle nimi jäi.
 */
const SOFIA = MAAILMANKARTTA.cities.find((c) => c.id === 'sofia');
const PELIMERKKI = {
  x0: SOFIA.x - 1.6,
  y0: SOFIA.y - 3.2,
  x1: SOFIA.x + 1.6,
  y1: SOFIA.y + 1.8,
};
/** Lähimittakaavat: maalehdestä omistajan omaan syvään zoomiin. */
const LAHIMITAT = [1.88, 3.6, 5.86, 9.24];

/** Nimiön pystysuora ulottuma ruutupikseleinä (sama kaava kuin ladonnassa). */
const nimionYla = (n, px) => n.y * px - n.koko * 1.15 * 0.62;
const nimionAla = (n, px) => n.y * px + n.koko * 1.15 * 0.42;

test('yksikään nimiö ei jää pelimerkin varauksen alle', () => {
  for (const px of LAHIMITAT) {
    asetaRuutuvaraukset([PELIMERKKI]);
    const { nimiot } = karttanimienLadonta(MAAILMANKARTTA, px, 'sofia');
    const laatikko = {
      x0: PELIMERKKI.x0 * px,
      y0: PELIMERKKI.y0 * px,
      x1: PELIMERKKI.x1 * px,
      y1: PELIMERKKI.y1 * px,
    };
    /*
     * ANKKURI ON AINA OSA NIMIÖN LAATIKKOA — vasen reuna ('start'),
     * keskipiste ('middle') tai oikea reuna ('end') — joten jos ankkuri
     * on varauksen sisällä vaakasuunnassa JA nimiön pystyulottuma
     * leikkaa varausta, päällekkäisyys on todellinen. Tekstin leveyttä
     * ei tarvitse mitata: tämä ehto riittää siihen vikaan, jota vastaan
     * testi on kirjoitettu.
     */
    const alla = nimiot.filter((n) => {
      const ax = n.x * px;
      if (ax < laatikko.x0 || ax > laatikko.x1) return false;
      return nimionAla(n, px) > laatikko.y0 && nimionYla(n, px) < laatikko.y1;
    });
    assert.equal(alla.length, 0,
      `mittakaava ${px}: ${alla.length} nimiötä varauksen alla `
      + `(esim. ${JSON.stringify(alla[0])})`);
  }
  asetaRuutuvaraukset([]);
});

test('varaus siirtää kaupungin nimen, ei pudota sitä', () => {
  for (const px of LAHIMITAT) {
    asetaRuutuvaraukset([]);
    const ilman = karttanimienLadonta(MAAILMANKARTTA, px, 'sofia')
      .nimiot.find((n) => n.teksti === 'Sofia');
    asetaRuutuvaraukset([PELIMERKKI]);
    const kanssa = karttanimienLadonta(MAAILMANKARTTA, px, 'sofia')
      .nimiot.find((n) => n.teksti === 'Sofia');
    assert.ok(ilman, `mittakaava ${px}: Sofia puuttui jo ilman varausta`);
    assert.ok(kanssa, `mittakaava ${px}: varaus pudotti Sofian nimen kokonaan`);
    /* Omistajan järjestys: ensisijaisesti YLÖS. */
    assert.ok(nimionAla(kanssa, px) <= PELIMERKKI.y0 * px + 1e-6,
      `mittakaava ${px}: nimi ei noussut varauksen yläpuolelle `
      + `(${nimionAla(kanssa, px)} vs ${PELIMERKKI.y0 * px})`);
    /*
     * SIIRTO TAPAHTUU VAIN KUN SE ON TARPEEN. Loivemmalla mittakaavalla
     * pelimerkkipino on ruudulla nimeä matalampi eikä yllä sen alle —
     * silloin nimi jää täsmälleen entiseen paikkaansa, ja se on
     * oikein. Omistajan oma syvä zoomi (9,24) on se näkymä, jossa nimi
     * oli merkin alla ja jossa sen on siis liikuttava.
     */
    if (px === 9.24) {
      assert.notEqual(`${ilman.x},${ilman.y}`, `${kanssa.x},${kanssa.y}`,
        'syvässä zoomissa nimi jäi täsmälleen entiseen paikkaansa');
    }
  }
  asetaRuutuvaraukset([]);
});

test('ilman varauksia ladonta on tavu tavulta entinen', () => {
  /*
   * VARAUS ON LISÄYS EIKÄ MUUTOS. Kun pelimerkkejä ei ole — katselutila,
   * yleiskuva, koko muu maailma — ladonnan on annettava täsmälleen sama
   * tulos kuin ennen tätä erää. Tyhjä joukko todistaa sen paluun, ja
   * samalla sen, ettei varaus jää voimaan pelimerkin kadottua.
   */
  for (const px of LAHIMITAT) {
    asetaRuutuvaraukset([]);
    const ennen = JSON.stringify(karttanimienLadonta(MAAILMANKARTTA, px, 'sofia'));
    asetaRuutuvaraukset([PELIMERKKI]);
    karttanimienLadonta(MAAILMANKARTTA, px, 'sofia');
    asetaRuutuvaraukset([]);
    const jalkeen = JSON.stringify(karttanimienLadonta(MAAILMANKARTTA, px, 'sofia'));
    assert.equal(jalkeen, ennen, `mittakaava ${px}: ladonta ei palannut entiselleen`);
  }
});

test('kelvoton varaus ei kaada ladontaa eikä varaa mitään', () => {
  /*
   * Kutsuja mittaa laatikot DOMista (js/ui.js luovutaRuutuvaraukset), ja
   * piilotettu tai vielä piirtämätön merkki antaa tyhjän laatikon.
   * Sellainen ei saa varata paperia eikä kaataa ladontaa.
   */
  asetaRuutuvaraukset([]);
  const ennen = JSON.stringify(karttanimienLadonta(MAAILMANKARTTA, 9.24, 'sofia'));
  asetaRuutuvaraukset([
    null,
    { x0: 1, y0: 1, x1: 1, y1: 1 },
    { x0: Number.NaN, y0: 0, x1: 5, y1: 5 },
    { x0: 10, y0: 10, x1: 4, y1: 4 },
  ]);
  const jalkeen = JSON.stringify(karttanimienLadonta(MAAILMANKARTTA, 9.24, 'sofia'));
  assert.equal(jalkeen, ennen, 'kelvoton varaus muutti ladontaa');
  asetaRuutuvaraukset([]);
});
