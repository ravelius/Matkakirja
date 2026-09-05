/*
 * IHMISEN MATKA — toinen aikajanalinssi, ja ensimmäinen koko maapallon
 * kokoinen kaari.
 *
 * OMISTAJAN PÄÄTÖS 5.9.2026: nykyihmisen leviäminen Afrikasta koko
 * maapallolle, 20 pysäkkiä 300 000 vuotta sitten → n. 1300 jaa.
 *
 * Tämä tiedosto on KAARI JA KYTKENTÄ, ei aineisto: pysäkit, tekstit,
 * lähteet ja kuvat asuvat js/linssit/ihmisen-matka-data.js:ssä (oma
 * agenttinsa kirjoittaa ne). Kello, valot, karuselli, havainnekuva,
 * avausjakso, musiikki ja Tiedeliite ovat yhteistä moottoria
 * (js/aikajana.js), joka lukee alta kentän `aikajana`. Linssi on
 * kerrokseton (kerros: false): se ei piirrä pysyvää karttakerrosta vaan
 * käynnistää ajon, kuten keksintölinssi.
 *
 * ── MITÄ MOOTTORISTA PYYDETÄÄN (ja miksi) ─────────────────────────
 *
 *   asteikko: 'vuosiaSitten'
 *              Kello ei voi juosta vuosiluvuissa: 300 000 vuotta
 *              keksintöjen tahdilla olisi 22 tuntia. Pysäkkien välit
 *              ovat kellossa yhtä pitkiä ja lukema interpoloidaan
 *              logaritmisesti, joten "300 000 v. sitten" → "3 000 v.
 *              sitten" etenee tasaisen tuntuisesti. Näytettävä teksti
 *              tulee pysäkin `ajoitus`-kentästä.
 *   reitti: true
 *              Valot eivät ole erillisiä paikkoja vaan YKSI MATKA:
 *              niiden väliin piirtyy isoympyrää seuraava reittiviiva
 *              sitä mukaa kuin valot syttyvät.
 *   lahikuva ja hyppykamera
 *              Kaksinkertainen lähikuva keksintöihin nähden (520 vs.
 *              260 lautayksikköä), koska välit ovat mannerten
 *              mittaisia; ja valtameren ylityksessä (Beringia, Sahul,
 *              Lapita, Aotearoa) kamera nousee automaattisesti niin
 *              kauas, että lähtöranta ja reittiviiva ovat yhä kuvassa.
 *              Mitta lasketaan edellisen pysäkin etäisyydestä, joten
 *              dataan ei tarvitse merkitä, mikä väli on merimatka.
 *
 * ── KUVAT: ESINE KORTTIIN, HAVAINNEKUVA PANEELIIN ─────────────────
 *
 * Keksintökaaressa kortti on KEKSIJÄN muotokuva ja paneeli ilmiökuva.
 * Tässä kaaressa ei ole henkilöitä — 300 000 vuoden takaa ei ole
 * kasvoja — joten kortin paikan saa LÖYTÖ: kallo, kivityökalu,
 * kalastuskoukku (`esine`). Havainnekuva (`kuva`) on oikean laidan
 * paneelissa kuten ennen. Moottorin kentät ovat entiset, ja muunnos on
 * tässä yhtenä puhtaana funktiona (ihmisenMatkanPysakit) — moottori ei
 * tiedä kummastakaan kaaresta mitään.
 *
 * ── AINEISTO LUETAAN NIMIAVARUUTENA ───────────────────────────────
 *
 * `import * as data` eikä nimettyinä tuonteina: aineistotiedostoa
 * kirjoitetaan rinnakkain tämän kanssa, ja puuttuva nimetty vienti
 * kaataisi koko moduulin latauksen (linkitysvirhe) — silloin peli
 * jäisi ilman linssiä eikä virhe kertoisi mistä on kyse. Nyt
 * keskeneräinen aineisto tarkoittaa vain lyhyempää kaarta.
 */

import { projisoiLaudalle } from '../fokusmitat.js';
import * as data from './ihmisen-matka-data.js';

/** Linssiosan nimi laudan linssiapurissa (sama kuin js/aikajana.js PALLON_OSA). */
const PALLON_OSA = 'aikajana';

/** Lauta, jonka koordinaatistoon pysäkit projisoidaan. */
const LAUTA = 'maailmankartta';

/**
 * Lähikuva on KAKSINKERTAINEN keksintöihin nähden (2 × 260 = 520
 * lautayksikköä, mitattuna noin 3 000 km ruudun leveydellä): siellä
 * naapuripysäkit ovat saman maanosan sisällä, tässä eri mantereilla.
 *
 * Luku on KIRJOITETTU AUKI eikä tuotu js/aikajana.js:stä: rekisteri
 * tuo jokaisen linssimoduulin heti matkalaukun luetteloa varten
 * (js/linssit/kerros.js haeKaikki), ja tuonti vetäisi koko
 * aikajanamoottorin mukanaan. Suhde vartioidaan testissä
 * (tests/ihmisen-matka.test.mjs).
 */
export const IHMISEN_MATKAN_LAHIKUVA = 520;

/** Koko maapallo laudan yksiköissä — kamera sovitetaan tähän lopussa. */
const MAAILMA = {
  x: 0, y: 0, w: 12000, h: 5399,
};

/** Aineiston pysäkit, tai tyhjä lista, jos vientiä ei vielä ole. */
const AINEISTO = data.IHMISEN_MATKA
  ?? Object.values(data).find((v) => Array.isArray(v))
  ?? [];

/**
 * Laatikoksi: avausjakson ja loppusanojen teksti kelpaa sekä oliona
 * (`{ otsikko, teksti }`) että pelkkänä merkkijonona, koska aineiston
 * kirjoittaja päättää muodon vasta työn kuluessa.
 */
function laatikoksi(arvo, otsikko) {
  if (!arvo) return null;
  if (typeof arvo === 'string') return { otsikko, teksti: arvo };
  if (typeof arvo === 'object' && arvo.teksti) return { otsikko: arvo.otsikko ?? otsikko, ...arvo };
  return null;
}

/**
 * PYSÄKIT MOOTTORIN MUOTOON. Puhdas funktio: sama kuvaus pelissä ja
 * testissä (tests/ihmisen-matka.test.mjs).
 *
 *   `kuva`  → `ilmio`  havainnekuva oikean laidan paneeliin
 *   `esine` → `kuva`   kortin kuva alarivin karusellissa
 *   `lat/lon` → `x/y`  laudan koordinaatit (pelin oma projektio;
 *                      moottorin karttahaara piirtää valot niihin)
 *
 * Alkuperäiset kentät jäävät paikoilleen, joten data on yhä luettavissa
 * sellaisenaan — muunnos vain lisää moottorin odottamat nimet.
 */
export function ihmisenMatkanPysakit(tapahtumat = AINEISTO) {
  return (tapahtumat ?? []).map((t) => {
    const kohta = projisoiLaudalle(LAUTA, t.lon, t.lat);
    return {
      ...t,
      ilmio: t.kuva ?? null,
      kuva: t.esine ?? null,
      x: kohta?.x ?? t.x,
      y: kohta?.y ?? t.y,
    };
  });
}

export const PYSAKIT = ihmisenMatkanPysakit();

export const LINSSI = {
  tunnus: 'ihmisen-matka',
  jarjestys: 26,
  kerros: false,
  nimi: 'Ihmisen matka',
  lyhyt: typeof data.IHMISEN_MATKA_ESITTELY === 'string'
    ? data.IHMISEN_MATKA_ESITTELY
    : 'Ihmisen matka Afrikasta koko maapallolle: kello juoksee vuosituhansia, valot syttyvät matkan varrelle.',
  // Jalanjälki: kantapää, päkiä ja viisi varvasta.
  ikoni: '<path d="M9.5 14.5c-1.6-1.2-2.3-3-2.3-5.2C7.2 6.3 8.9 4 11.4 4c2.3 0 3.6 1.9 3.6 4.3 0 1.7-.6 3-.6 4.3 0 1.4.9 2.2.9 3.6 0 2-1.4 3.3-3.3 3.3-1.9 0-3.2-1.1-3.2-2.7 0-1 .3-1.6.7-2.3z"/>'
    + '<circle cx="16.6" cy="6.2" r="1"/><circle cx="17.6" cy="9" r="0.9"/>',
  valokuva: false,
  // Sama polku kuin keksinnöillä: pallolauta ja vanha kartta jakavat
  // maailmankartan pakan, joten yksi tunnus riittää kummallekin.
  laudat: ['maailmankartta'],
  lahde: {
    aineisto: 'Wikipedia (englanninkieliset artikkelit); arkeologian ja genetiikan ajoitukset pysäkkikohtaisissa lähteissä',
    lisenssi: 'CC BY-SA 4.0 (tekstit)',
    osoite: 'https://en.wikipedia.org/wiki/Early_human_migrations',
    haettu: '2026-09-05',
  },
  /**
   * LINSSI PALLOLLE (docs/moduulit/karttapallo.md luku 10.1). Kaikki
   * piirto on moottorin sisällä, joten kahvan ainoa tehtävä on
   * varmistaa, että laudan osa (valot, tummennus, reittiviiva) lähtee
   * pois, kun linssi vaihtuu tai putoaa valikoimasta.
   */
  pallolle(lauta) {
    return { pura: () => lauta?.linssit?.pura(PALLON_OSA) };
  },

  aikajana: {
    otsikko: 'Ihmisen matka',
    /*
     * Kellon asteikko ja kaaren jakso: kello näyttää "300 000 v.
     * sitten" ja pysäkillä pysäkin oman ajoituksen (js/aikajana.js
     * KELLON ASTEIKKO).
     */
    asteikko: 'vuosiaSitten',
    yksikko: 'v. sitten',
    jakso: '300 000 vuotta sitten – n. 1300 jaa.',
    /*
     * Kaaren oma musiikki (js/siirtymamusiikki.js RAIDAT['ihmisen-matka']
     * → ämpärin aanet/linssi-ihmisen-matka-lyria.mp3). Raita generoidaan
     * erikseen; puuttuva tiedosto on hiljainen eikä riko ajoa.
     */
    musiikki: 'ihmisen-matka',
    /*
     * Kaaren oma luentakansio ämpärissä. Ilman tätä moottori soittaisi
     * keksintökaaren luennat (js/linssipuhe.js LINSSILUENTA_JUURI).
     */
    luentajuuri: `${data.IHMISEN_MATKA_KUVAJUURI ?? ''}/puhe`,
    esittely: laatikoksi(data.IHMISEN_MATKA_ALOITUS, 'Ihmisen matka')
      ?? laatikoksi(data.IHMISEN_MATKA_ESITTELY, 'Ihmisen matka'),
    // Kello alkaa ja päättyy asteikon mukaan; alue on koko maapallo.
    alue: MAAILMA,
    /*
     * Havainnekuvat ovat kuvaputken 1536 × 1024 -kuvia, joissa on noin
     * 20 % ympäristövaraa joka reunalla nimenomaan reunamaskia varten
     * (kuvatoimituksen näyttöohje 5.9.2026): koko kuva näkyviin, ei
     * cover-rajausta ennen maskia.
     */
    kuvasovitus: 'contain',
    lahikuva: IHMISEN_MATKAN_LAHIKUVA,
    hyppykamera: true,
    reitti: true,
    tapahtumat: PYSAKIT,
    loppusanat: laatikoksi(data.IHMISEN_MATKA_LOPPU, 'Matka päättyy'),
  },
};
