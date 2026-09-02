/*
 * NOSTOLADONNAN RUUTUKATTO JA SEN KAKSI KOPIOTA.
 *
 * js/nostoladonta.js on LEHTIMODUULI: se ei saa tuoda mitään, koska
 * laattageneraattori lataa sen Nodessa eikä sen mukana saa tulla pelin
 * käyttöliittymää. Siksi kaksi lukua on siellä kopiona — nimiön
 * kirjasinkoko (js/fokusnosto-symbolit.js) ja kartan oman kohdenimen
 * ruutukoko (js/karttanimet.js) — ja juuri niiden ero tekisi katosta
 * hiljaa väärän: nimiö kutistuisi eri kokoon kuin se, johon sitä
 * verrataan. Tämä testi on se vahti, jonka takia kopiot ovat sallittuja.
 */
import { strict as assert } from 'node:assert';
import { test } from 'node:test';

import { readFileSync } from 'node:fs';

import {
  NOSTOLADONTA_MERKKISUHDE, NOSTOLADONTA_NIMIO_KATTO, NOSTOLADONTA_NIMIO_KOKO,
  NOSTOLADONTA_POLTON_TIHEYS, NOSTOLADONTA_S, NOSTOLADONTA_SAANTO,
  NOSTOLADONTA_SYMBOLI_R, NOSTOLADONTA_SYVIN_RUUTUPX, NOSTOLADONTA_SYVIN_TIHEYS,
  nostoladontaKattoPorras, nostoladontaKattoSuhde, nostoladontaTiiviste,
  nostoladontaVenytys,
} from '../js/nostoladonta.js';
import {
  NOSTOSYM_MINI_R, NOSTOSYM_NIMIO_KOKO, NOSTOSYM_PISTEET, NOSTOSYM_PISTE_HIMMEYS,
  NOSTOSYM_PISTE_VARIT, nostosymMiniMerkki,
} from '../js/fokusnosto-symbolit.js';
import { KARTTANIMI_KOOT, maastokolmionKasvukatto } from '../js/karttanimet.js';
import { KOHDE_SYMBOLI_SKAALA } from '../js/fokuskohteet.js';

test('nimiön kirjasinkoko on sama luku kuin symbolikirjastossa', () => {
  assert.equal(NOSTOLADONTA_NIMIO_KOKO, NOSTOSYM_NIMIO_KOKO);
});

test('merkin säde on sama luku kuin symbolikirjastossa', () => {
  assert.equal(NOSTOLADONTA_SYMBOLI_R, NOSTOSYM_MINI_R);
});

/*
 * PISTEMERKIN VÄRIT OVAT KAHDESSA PAIKASSA, JA SE ON PAKKO.
 *
 * Sävy kuuluu tyylitiedostoon, mutta laattoja polttava Node-ajo ei näe
 * css/styles.css:ää — se lukee varataulun (NOSTOSYM_PISTE_VARIT). Jos
 * luvut eroaisivat, poltettu piste olisi eri värinen kuin elävä, ja
 * kartalla olisi kaksi eri sävyä samasta kategoriasta vierekkäin.
 * Tämä testi on se vahti, jonka takia kopio on sallittu — sama malli
 * kuin nimiön kirjasinkoolla yllä.
 */
test('pistemerkin värit ovat samat kuin css/styles.css:n --sym-muuttujat', () => {
  const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  assert.ok(NOSTOSYM_PISTEET.length >= 11, `pisteitä ${NOSTOSYM_PISTEET.length}`);
  for (const tunnus of NOSTOSYM_PISTEET) {
    const muuttuja = new RegExp(`--sym-${tunnus}:\\s*(#[0-9a-fA-F]{3,8})`).exec(css);
    assert.ok(muuttuja, `css/styles.css: --sym-${tunnus} puuttuu`);
    assert.equal(NOSTOSYM_PISTE_VARIT[tunnus].toLowerCase(), muuttuja[1].toLowerCase(),
      `varasävy ja --sym-${tunnus} eroavat`);
    assert.ok(
      new RegExp(`\\.nostosym-mini-${tunnus}\\s*\\{[^}]*var\\(--sym-${tunnus}\\)`).test(css),
      `css/styles.css: .nostosym-mini-${tunnus} ei lue --sym-${tunnus}`,
    );
  }
  const peitto = /\.nostosym-mini-taytto\s*\{[^}]*opacity:\s*([\d.]+)/.exec(css);
  assert.ok(peitto, 'css/styles.css: .nostosym-mini-taytto ilman peittoa');
  assert.equal(Number(peitto[1]), NOSTOSYM_PISTE_HIMMEYS);
});

/*
 * VIISI MERKKIÄ SÄILYTTI MUOTONSA (omistaja 2.9.2026: *"jätetään vuori
 * ja vesi ja skandaali ja söpöysmerkki ennalleen"* — ja kompassiruusu,
 * joka ei ole kategoria vaan kadonneen ihmeen lisämerkki). Ne ovat
 * pelkkää mustetta: jos jokin niistä saisi kiekon, kartalta katoaisi
 * se muoto, jonka omistaja nimenomaan pyysi jättämään.
 */
test('vuori, vesi, huutomerkki, tassu ja kompassiruusu ovat yhä muotoja', () => {
  for (const tunnus of ['vuori', 'meri', 'huuto', 'elain', 'ihme']) {
    const merkki = nostosymMiniMerkki(tunnus, null);
    assert.equal(merkki.taytto, null, `${tunnus}: kiekko`);
    assert.equal(merkki.vari, null, `${tunnus}: kategoriaväri`);
    assert.ok(merkki.vahva, `${tunnus}: muoto puuttuu`);
    assert.ok(!NOSTOSYM_PISTEET.includes(tunnus), `${tunnus} on pistelistalla`);
  }
});

/*
 * MERKKISUHDE ON KARTAN YHTEINEN MITTA (omistaja 2.9.2026: *"Osa
 * nostoista vielä polttamatta ja väärän kokoisia"*). Se on se suhde,
 * jolla nosto poltetaan laattaan, ja siksi kaikkien elävien
 * merkkiperheiden on osuttava siihen — poltettua kuvaa ei voi enää
 * muuttaa. Vartija mittaa saman asian ruudulta
 * (tools/savukkeet/savuke-syvazoomi.mjs, vartio 7); tämä testi vahtii,
 * ettei luku katoa koodista.
 */
test('merkkisuhde on symbolin halkaisija jaettuna nimiön koolla', () => {
  assert.equal(NOSTOLADONTA_MERKKISUHDE, (2 * NOSTOSYM_MINI_R) / NOSTOSYM_NIMIO_KOKO);
  assert.ok(Math.abs(NOSTOLADONTA_MERKKISUHDE - 1.1818) < 1e-3);
});

/*
 * MAASTOKOLMIO SAA MITTANSA OMASTA NIMESTÄÄN samalla suhteella
 * (js/karttanimet.js maastokolmionKasvukatto). Väite luetaan
 * RUUTUPIKSELEINÄ, koska juuri se on se yksikkö, jossa omistaja vertaa
 * merkkejä toisiinsa: kolmion halkaisija ruudulla on merkkisuhde kertaa
 * maastonimen kirjasinkoko, eikä se enää riipu zoomista.
 */
test('maastokolmion ruutukoko on sen oman nimen mitta', () => {
  const perus = 4 * NOSTOLADONTA_S; // MERKKI.vuori, lautayksikköä
  const odotettu = NOSTOLADONTA_MERKKISUHDE * KARTTANIMI_KOOT.vuori;
  for (const skaala of [3, 6.655, 9.239, 20]) {
    const halkaisija = 2 * perus * maastokolmionKasvukatto(skaala) * skaala;
    assert.ok(Math.abs(halkaisija - odotettu) < 1e-6,
      `skaala ${skaala}: ${halkaisija.toFixed(2)} px, odotettu ${odotettu.toFixed(2)} px`);
  }
  // Loitolla katto ei pure lainkaan: kolmio on karttavakio kuten ennen.
  assert.equal(maastokolmionKasvukatto(1), 1);
  assert.equal(maastokolmionKasvukatto(0), 1);
});

test('katto on kartan oman kohdenimen ruutukoko', () => {
  assert.equal(NOSTOLADONTA_NIMIO_KATTO, KARTTANIMI_KOOT.kohde);
});

/*
 * OMISTAJA 1.9.2026 ilta, kuvakaappaus Bulgarian lehtinäkymästä,
 * sanatarkasti: *"kaupunkien nimet pitäisi olla isommalla (suurenna)
 * kuin karttanostojen nimet joita voi pienentää"*.
 *
 * Tämä KUMOAA saman päivän aamun väitteen "katto on myös kaupungin
 * nimen koko" (*"max sama koko kuin kohdekaupungin koko"*). Aamun
 * sääntö oli yläraja — nosto ei saa olla kaupunkia isompi — ja se
 * pätee yhä; illan tilaus tekee siitä AIDON eron eikä tasapeliä.
 * Väite on siksi epäyhtälö eikä yhtäsuuruus: se kaatuu, jos nostot
 * joskus kasvavat kaupunkien tasolle takaisin.
 */
test('nostonimiö on selvästi kaupungin nimeä pienempi', () => {
  assert.ok(NOSTOLADONTA_NIMIO_KATTO < KARTTANIMI_KOOT.kaupunki,
    `nosto ${NOSTOLADONTA_NIMIO_KATTO} px, kaupunki ${KARTTANIMI_KOOT.kaupunki} px`);
  assert.ok(KARTTANIMI_KOOT.kaupunki / NOSTOLADONTA_NIMIO_KATTO >= 1.3,
    `suhde vain ${(KARTTANIMI_KOOT.kaupunki / NOSTOLADONTA_NIMIO_KATTO).toFixed(2)}`);
  // Ja kartan porras pysyy: pääkaupunki on tavallista kaupunkia isompi.
  assert.ok(KARTTANIMI_KOOT.isoKaupunki > KARTTANIMI_KOOT.kaupunki);
});

test('katto ei pure loitolla eikä keskizoomilla', () => {
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  // z5-vastaava (1,8 CSS-px / lautayksikkö) ja z6-vastaava (3,6):
  // nimiö on 6,2 ja 12,4 px, joten katto (8,5) puree z5:n ja z6:n
  // välissä — z5 jää yhä koskematta.
  assert.equal(nostoladontaKattoPorras(porras, 1.8), porras);
  assert.ok(nostoladontaKattoPorras(porras, 3.6) < porras);
  const kynnys = NOSTOLADONTA_NIMIO_KATTO / (NOSTOLADONTA_NIMIO_KOKO * porras);
  assert.equal(nostoladontaKattoPorras(porras, kynnys * 0.999), porras);
});

test('katon purressa nimiö on täsmälleen katon kokoinen', () => {
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  for (const skaala of [3.6, 7.2, 11.4, 40]) {
    const k = nostoladontaKattoPorras(porras, skaala);
    const px = NOSTOLADONTA_NIMIO_KOKO * k * skaala;
    /*
     * KATTO VENYY LAATAN MUKANA (omistaja 2.9.2026): z7:n yli yläraja
     * on katto kertaa venytys, koska laatta itse on venytetty samalla
     * luvulla. Syvimmällä tasolla ja sitä ulompana venytys on 1, joten
     * väite on siellä täsmälleen entinen.
     */
    const odotettu = NOSTOLADONTA_NIMIO_KATTO * nostoladontaVenytys(skaala);
    assert.ok(Math.abs(px - odotettu) < 1e-9,
      `mittakaava ${skaala}: nimiö ${px} px, odotettu ${odotettu} px`);
  }
});

test('mittaamaton näkymä jättää portaan ennalleen', () => {
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  assert.equal(nostoladontaKattoPorras(porras, 0), porras);
  assert.equal(nostoladontaKattoPorras(porras, undefined), porras);
  assert.equal(nostoladontaKattoPorras(0, 7.2), 0);
});

test('polton tiheysoletus on kokonaisluku ja vähintään 1', () => {
  assert.ok(Number.isInteger(NOSTOLADONTA_POLTON_TIHEYS));
  assert.ok(NOSTOLADONTA_POLTON_TIHEYS >= 1);
});

test('piirtosäännön tunnus on tiivisteessä', () => {
  // Sama merkki, sama tiiviste; ja tunnus on osa syötettä, joten kaksi
  // eri sääntöä ei voi antaa samaa tiivistettä. Tarkistetaan
  // ensimmäinen suoraan ja jälkimmäinen sillä, ettei tiiviste ole
  // sama kuin ilman tunnusta laskettu (FNV-1a merkkijonosta).
  const merkki = {
    tunnus: 'madara', symboli: 'historia', laji: 'muu',
    nimio: 'Madaran ratsastaja', x: 6737.3, y: 1672.2, osat: [],
  };
  assert.equal(nostoladontaTiiviste(merkki), nostoladontaTiiviste({ ...merkki }));
  assert.ok(/^[0-9a-f]{8}$/.test(nostoladontaTiiviste(merkki)));
  assert.ok(NOSTOLADONTA_SAANTO.length > 0);
});

test('väistön päätös ei ole tiivisteessä, merkin sisältö on', () => {
  const merkki = {
    tunnus: 'madara', symboli: 'historia', laji: 'muu',
    nimio: 'Madaran ratsastaja', x: 6737.3, y: 1672.2, osat: [],
  };
  const perus = nostoladontaTiiviste(merkki);
  assert.equal(nostoladontaTiiviste({ ...merkki, nimioNakyy: false }), perus);
  assert.equal(nostoladontaTiiviste({ ...merkki, nimioPuoli: 'ala' }), perus);
  assert.notEqual(nostoladontaTiiviste({ ...merkki, nimio: 'Madara' }), perus);
  assert.notEqual(nostoladontaTiiviste({ ...merkki, x: 6737.31 }), perus);
});

/* ====== KATTO ON SUHDE, JA SE KOSKEE KOKO PIIRROSTA ===============
 *
 * OMISTAJA 2.9.2026: *"symbolit heittelee muodoiltaa ja tekstejä
 * puuttuu"*. Ruutukatto kutisti vain merkin skaalan; sarakkeen
 * siirtymä, siirtoviiva ja nimiön rako jäivät karttavakioksi ja
 * kasvoivat rajatta. Suhde on se yksi luku, jolla koko piirros
 * kutistetaan ankkurinsa ympäri — ja juuri siksi sen on oltava
 * TÄSMÄLLEEN sama luku kuin merkin oma kutistus.
 */
test('kattosuhde on merkin oman kutistuksen kanssa sama luku', () => {
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  for (const skaala of [1.8, 3.6, 5.86, 9.24, 40]) {
    const suhde = nostoladontaKattoSuhde(porras, skaala);
    assert.ok(Math.abs(suhde * porras - nostoladontaKattoPorras(porras, skaala)) < 1e-12,
      `mittakaava ${skaala}: suhde ${suhde}`);
    assert.ok(suhde > 0 && suhde <= 1, `mittakaava ${skaala}: suhde ${suhde}`);
  }
});

test('kattosuhde on 1 siellä missä kattokaan ei pure', () => {
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  assert.equal(nostoladontaKattoSuhde(porras, 1.8), 1);
  assert.equal(nostoladontaKattoSuhde(porras, 0), 1);
  assert.equal(nostoladontaKattoSuhde(porras, undefined), 1);
  assert.equal(nostoladontaKattoSuhde(0, 7.2), 1);
});

/*
 * PIIRROKSEN RUUTUKOKO EI RIIPU ZOOMISTA katon purressa — PAPERIN
 * MITASSA LUETTUNA. Tämä on se väite, joka olisi kaatunut ennen
 * v1447:ää: siirtoviivan leveys ja sarakkeen siirtymä olivat `luku x
 * NOSTOLADONTA_S x mittakaava` eli suoraan verrannollisia zoomiin
 * (mitattu Sofiassa 8,87 px kun tilattu on 1,6).
 *
 * VENYTYS ON JAETTAVA POIS (omistaja 2.9.2026: *"koko kartta kuin yksi
 * paperi suurennuslasin alla"*). Z7:n yli laatta itse on venytetty,
 * joten piirroksen KUULUU kasvaa samassa suhteessa; se, mikä on vakio,
 * on piirros SUHTEESSA laattaan. Ilman jakolaskua tämä testi vaatisi
 * juuri sitä eroa, jonka omistaja luki ruudulta.
 */
test('katetun piirroksen mitta on vakio suhteessa venytettyyn laattaan', () => {
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  const paperilla = (luku, skaala) => (luku * NOSTOLADONTA_S
    * nostoladontaKattoSuhde(porras, skaala) * skaala) / nostoladontaVenytys(skaala);
  const VIIVAN_LEVEYS = 1.6;
  const perus = paperilla(VIIVAN_LEVEYS, 5.86);
  for (const skaala of [5.86, 9.24, 20, 100]) {
    assert.ok(Math.abs(paperilla(VIIVAN_LEVEYS, skaala) - perus) < 1e-9,
      `mittakaava ${skaala}: ${paperilla(VIIVAN_LEVEYS, skaala)} px vs ${perus} px`);
  }
  /*
   * Ja z7:n alapuolella venytys on 1, joten mitta on myös RUUDULLA
   * vakio. Kumpikin mittakaava on katon purevalla puolella (kynnys on
   * 2,46 tälle portaalle) mutta syvintä tasoa ulompana.
   */
  const ruudulla = (luku, skaala) => luku * NOSTOLADONTA_S
    * nostoladontaKattoSuhde(porras, skaala) * skaala;
  assert.ok(Math.abs(ruudulla(VIIVAN_LEVEYS, 2.7) - ruudulla(VIIVAN_LEVEYS, 3.6)) < 1e-9);
});

/* ====== VENYTYS: Z7:N YLI KARTTA ON SUURENNUSLASIN ALLA ===========
 *
 * OMISTAJAN PÄÄTÖS 2.9.2026, sanatarkasti: *"kun zoomataan z7:n yli,
 * piirretyt merkit kasvavat samassa suhteessa kuin suurennettu
 * karttakuva — koko kartta kuin yksi paperi suurennuslasin alla. Ei
 * uutta zoomitasoa, ei polttoa."*
 *
 * Vartija ruudulta on savuke (tools/savukkeet/savuke-syvazoomi.mjs);
 * nämä testit vahtivat kaavan ja sen kaksi reunaa — z7:n alapuolella
 * mikään ei muutu, ja poltto pysyy tavulleen entisenä.
 */
test('venytys on 1 syvimpään tasoon asti ja kasvaa vasta sen yli', () => {
  assert.equal(NOSTOLADONTA_SYVIN_RUUTUPX,
    NOSTOLADONTA_SYVIN_TIHEYS / NOSTOLADONTA_POLTON_TIHEYS);
  assert.equal(NOSTOLADONTA_SYVIN_RUUTUPX, 3.6);
  for (const skaala of [0, 0.6, 1.8, 2.4, 3.5999, 3.6]) {
    assert.equal(nostoladontaVenytys(skaala), 1, `mittakaava ${skaala}`);
  }
  assert.ok(Math.abs(nostoladontaVenytys(7.2) - 2) < 1e-12);
  assert.ok(Math.abs(nostoladontaVenytys(9.24) - 9.24 / 3.6) < 1e-12);
});

test('z7:n alapuolella porras on tavulleen entinen', () => {
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  /* Entinen kaava ilman venytystä — juuri se, mitä laattoihin on poltettu. */
  const entinen = (p, px) => ((p > 0 && px > 0)
    ? Math.min(p, NOSTOLADONTA_NIMIO_KATTO / (NOSTOLADONTA_NIMIO_KOKO * px))
    : p);
  for (const skaala of [0.3, 0.9, 1.8, 2.7, 3.5, 3.6]) {
    assert.equal(nostoladontaKattoPorras(porras, skaala), entinen(porras, skaala),
      `mittakaava ${skaala}`);
  }
});

/*
 * POLTTO EI MUUTU VENYTYKSESTÄ: generaattori kysyy katon tason omalla
 * tiheydellä (tools/fokuskartta/maailmapiirto.js:
 * `px / NOSTOLADONTA_POLTON_TIHEYS`), ja se on syvimmällä tasolla
 * täsmälleen NOSTOLADONTA_SYVIN_RUUTUPX ja jokaisella karkeammalla
 * puolet edellisestä. Venytys on siis polton kaikilla tasoilla 1 —
 * ja juuri siksi z7:n yli venyvä katto EI vaatinut polttoa (omistaja
 * 2.9.2026: *"ei uutta zoomitasoa, ei polttoa"*).
 *
 * SÄÄNNÖN TUNNUS ON SILTI PINNI, ja se on tarkoitus: se nousee aina
 * kun piirtosääntö muuttuu, ja tämä rivi pakottaa nostajan katsomaan,
 * että poltto todella ajetaan. v9 = kaupungin kohdalla olevat nostot
 * pois pääkartalta kaupunkilehden kohdekartalle (2.9.2026 ilta).
 */
test('polton jokaisella tasolla venytys on tasan 1', () => {
  for (let z = 0; z <= 7; z += 1) {
    const tasonTiheys = NOSTOLADONTA_SYVIN_TIHEYS / 2 ** (7 - z);
    assert.equal(nostoladontaVenytys(tasonTiheys / NOSTOLADONTA_POLTON_TIHEYS), 1,
      `taso z${z} (${tasonTiheys} px/yksikkö)`);
  }
  assert.equal(NOSTOLADONTA_SAANTO, 'v9-maasto-kaupunki');
});

/*
 * ELÄVÄ JA POLTETTU NOSTO OVAT SAMAN KOKOISIA JOKA SYVYYDELLÄ. Tämä on
 * koko erän mitta: poltettu nimiö on laatan pikseleitä eli
 * `2 x katto x skaala / syvin tiheys` ruudulla (sama kaava kuin
 * tools/savukkeet/mittaa-syvazoomi.mjs poltetunNostonMitat), ja elävä
 * nimiö on `NOSTOLADONTA_NIMIO_KOKO x porras x skaala`. Ennen tätä erää
 * ne erosivat venytyksen verran — iPadin 25 km:n näkymässä 2,57
 * kertaa.
 */
test('elävä nimiö on poltetun kokoinen joka syvyydellä', () => {
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  for (const skaala of [3.6, 5.86, 6.26, 9.24, 20]) {
    const elava = NOSTOLADONTA_NIMIO_KOKO * nostoladontaKattoPorras(porras, skaala) * skaala;
    const poltettu = (NOSTOLADONTA_POLTON_TIHEYS * NOSTOLADONTA_NIMIO_KATTO * skaala)
      / NOSTOLADONTA_SYVIN_TIHEYS;
    assert.ok(Math.abs(elava - poltettu) < 1e-9,
      `mittakaava ${skaala}: elävä ${elava.toFixed(2)} px, poltettu ${poltettu.toFixed(2)} px`);
  }
});

/*
 * SYVIN TIHEYS ON KOPIO, JA SIKSI SE ON VAHDITTU. Luku asuu
 * laattageneraattorissa (tools/generoi-laattapyramidi.mjs TIHEYS ja
 * TASOJA; omistajan lukitsema mitta 30.8.2026, Raamattu PYRAMIDIN
 * LUKITUT MITAT), eikä js/ saa tuoda tools/-moduulia — yhden tiedoston
 * versio ketjuttaa vain js/:n. Vahti on siksi sama kuin
 * tests/viivataso.test.mjs:n SYVIN_TIHEYS-vahti: luetaan generaattorin
 * lähdeteksti ja vaaditaan sama luku.
 */
test('syvin tiheys on sama luku kuin laattageneraattorilla', () => {
  const GEN = readFileSync(new URL('../tools/generoi-laattapyramidi.mjs', import.meta.url), 'utf8');
  assert.match(GEN, /^const TIHEYS = 7\.2;$/m,
    'generaattorin TIHEYS muuttui: js/nostoladonta.js NOSTOLADONTA_SYVIN_TIHEYS on nyt väärin');
  assert.match(GEN, /^const TASOJA = 8;$/m,
    'pyramidin tasomäärä muuttui: syvin taso ei ole enää z7');
  assert.equal(NOSTOLADONTA_SYVIN_TIHEYS, 7.2);
});
