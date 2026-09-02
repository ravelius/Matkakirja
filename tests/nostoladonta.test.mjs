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

import {
  NOSTOLADONTA_MERKKISUHDE, NOSTOLADONTA_NIMIO_KATTO, NOSTOLADONTA_NIMIO_KOKO,
  NOSTOLADONTA_POLTON_TIHEYS, NOSTOLADONTA_S, NOSTOLADONTA_SAANTO,
  NOSTOLADONTA_SYMBOLI_R, nostoladontaKattoPorras, nostoladontaKattoSuhde,
  nostoladontaTiiviste,
} from '../js/nostoladonta.js';
import { NOSTOSYM_MINI_R, NOSTOSYM_NIMIO_KOKO } from '../js/fokusnosto-symbolit.js';
import { KARTTANIMI_KOOT, maastokolmionKasvukatto } from '../js/karttanimet.js';
import { KOHDE_SYMBOLI_SKAALA } from '../js/fokuskohteet.js';

test('nimiön kirjasinkoko on sama luku kuin symbolikirjastossa', () => {
  assert.equal(NOSTOLADONTA_NIMIO_KOKO, NOSTOSYM_NIMIO_KOKO);
});

test('merkin säde on sama luku kuin symbolikirjastossa', () => {
  assert.equal(NOSTOLADONTA_SYMBOLI_R, NOSTOSYM_MINI_R);
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
    assert.ok(Math.abs(px - NOSTOLADONTA_NIMIO_KATTO) < 1e-9,
      `mittakaava ${skaala}: nimiö ${px} px`);
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
 * PIIRROKSEN RUUTUKOKO EI RIIPU ZOOMISTA katon purressa. Tämä on se
 * väite, joka olisi kaatunut ennen korjausta: siirtoviivan leveys ja
 * sarakkeen siirtymä olivat `luku x NOSTOLADONTA_S x mittakaava` eli
 * suoraan verrannollisia zoomiin (mitattu Sofiassa 8,87 px kun tilattu
 * on 1,6).
 */
test('katetun piirroksen ruutumitta on vakio syvillä zoomeilla', () => {
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  const ruudulla = (luku, skaala) => luku * NOSTOLADONTA_S
    * nostoladontaKattoSuhde(porras, skaala) * skaala;
  const VIIVAN_LEVEYS = 1.6;
  const perus = ruudulla(VIIVAN_LEVEYS, 5.86);
  for (const skaala of [5.86, 9.24, 20, 100]) {
    assert.ok(Math.abs(ruudulla(VIIVAN_LEVEYS, skaala) - perus) < 1e-9,
      `mittakaava ${skaala}: ${ruudulla(VIIVAN_LEVEYS, skaala)} px vs ${perus} px`);
  }
});
