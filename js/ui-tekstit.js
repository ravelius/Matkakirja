// Käyttöliittymän kiinteät tekstit, jotka myös natiivi lukee sisältöpaketista
// (tools/vienti/lahteet.mjs). js/ui.js tuo nämä; teksti muutetaan vain täällä.

import { MAAILMA } from './packs/maailma.js';

/*
 * Omistajan päättämä avausteksti. ÄLÄ muokkaa ilman omistajan lupaa
 * (docs/tyolista-opukselle.md, paketti 3). Lyhennetty omistajan
 * pyynnöstä 4.8.2026; draamaviilaus omistajan hyväksynnällä
 * 10.8.2026. Teksti ja luenta (intro-puhe.mp3) pidetään samana —
 * muutos vain tools/generoi-avaus.mjs:n kautta, jonka INTRO_RUUTU
 * on tämän vakion ainoa lähde (sanasta sanaan).
 *
 * V3/V4 25.8.2026 (omistajan etusivu-uudistus): kirjan nimi pois —
 * se luetaan nyt kansikuvan selästä (assets/etusivu/kansikuva.png) —
 * ja ohjerivi "Valitse kohde kartalta" pois, koska ohjeen tilalle
 * tuli klikattava viimeinen lause (INTRO_VALINTA). Teksti päättyy
 * siis täsmälleen siihen, mihin nauhoitettu luentakin.
 */
/*
 * V5 25.8.2026 (omistajan uusi alkuteksti, sanasta sanaan): terminaali
 * ja revitty sivu yhdessä kappaleessa; paikkarivi naputetaan ensin
 * kirjoituskoneella ja luenta alkaa vasta tästä kappaleesta.
 */
export const INTRO_TEXT = 'Vintiltä löytyi isoisän matkalaukku ja kulunut '
  + 'matkakirja. Juokset sisälle terminaaliin ja olet varma, että ukko '
  + 'oli löytänyt jotain. Mutta kuka on repinyt kirjasta viimeisen '
  + 'sivun?';
/*
 * KYSYMYS ON NAPPI (omistajan tilaus 26.8.2026, ilta): "Mistä
 * aloitan?" on samalla se kehystetty 1873-nappi, joka vie kartan
 * lähikuvaan Lontoon kohdalle. Välivaihe, jossa kysymys oli pelkkää
 * tekstiä ja sen alla erillinen ALOITA MATKA -nappi, purettiin — kaksi
 * peräkkäistä kehotusta oli yksi liikaa.
 *
 * Nappi EI OLE KERRONTAA eikä siksi kuulu INTRO_TEXTiin: nauhoitettu
 * luenta päättyy revittyyn sivuun.
 *
 * TEKSTI ON NYT KEHOTUS EIKÄ KYSYMYS (omistajan pelitestipalaute
 * v1119): *"Mistä aloitan?" → "Valitse aloituskaupunki"*. Nappi vie
 * kartan lähikuvaan, jossa valinta oikeasti tehdään, ja kysymys jätti
 * epäselväksi mitä napista tapahtuu.
 */
export const INTRO_VALINTA = 'Valitse aloituskaupunki';
/*
 * ETUSIVUN PAIKKARIVI (omistajan tilaus 25.8.2026): kohtausmerkintä
 * avaustekstin ensimmäisenä rivinä, kuukausi ja vuosi laitteen
 * kellosta. Kertoja EI lue tätä (nauhoitettu luenta alkaa vasta
 * varsinaisesta tekstistä), joten rivi elää oman elementtinsä
 * varassa eikä ole osa INTRO_TEXTiä.
 */
export const INTRO_PAIKKA = 'Heathrow, Lontoo';

/*
 * AVAUSLENNON RUUTUTEKSTI (natiivi: sisältöpaketin ui-tekstit, Natiivi-UI
 * 24.9.2026). Lähde on laudan texts.flightFirst (js/packs/maailma.js), jonka
 * tools/generoi-avaus.mjs LENTO_RUUTU pitää samana kuin luenta
 * puhe-lento-alku.mp3. Tässä vain uudelleenvienti, ei omaa tekstiä.
 */
export const FLIGHT_FIRST = MAAILMA.texts.flightFirst;

/*
 * PERIAATTEET-LAPPU ("Oppiminen on hauskaa", js/ui.js naytaPeriaatteet).
 * osat: väliotsikko (valinnainen) ja kappale; karki = ingressi.
 * lippurivi jatkuu pelissä lisenssin vaatimilla lipputekijöillä.
 */
export const PERIAATTEET = {
  otsikko: 'Oppiminen on hauskaa',
  osat: [
    { karki: true, teksti: 'Matkakirja ja unohdettu aarre on seikkailupeli, jonka sivutuotteena '
      + 'opitaan — ei oppikirja, johon on liimattu noppa. Pelin pitää olla '
      + 'koukuttava ensin; tieto tarttuu matkassa.' },
    { otsikko: 'Mitä pelissä opitaan', teksti: 'Maiden arkea ja kulttuuria, maantiedettä ja historiaa, '
      + 'geopolitiikkaa ja poliittista tilannetta — ja ennen kaikkea sitä, '
      + 'että maailma on suurempi kuin oma ympäristö. Jokaisella '
      + 'pysähdyksellä on jotain katsottavaa: valokuva silloin ja nyt, maan '
      + 'tunnusluvut, kaupungin musiikkia ja ruokaa.' },
    { otsikko: 'Kaksi ääntä', teksti: 'Isoisän päiväkirja vuodelta 1873 ja nuoren Foggin havainto tänään. '
      + 'Vanha ääni loistaa siinä, mikä ei ole muuttunut, ja on toivottoman '
      + 'vanhentunut nimissä ja rajoissa.' },
    { otsikko: 'Totuus ja lähteet', teksti: 'Jokainen väittämä on tarkistettavissa. Epävarmaa ei väitetä eikä '
      + 'kiistanalaista esitetä varmana. Politiikka ja historia kuvataan, ei '
      + 'tuomita: kerrotaan mitä on ja miksi.' },
    { otsikko: 'Tekoäly apuna, ihminen päättää', teksti: 'Tekoäly auttaa sisällön kokoamisessa: havainnekuvat luodaan '
      + 'avoimesti lisensoiduista aineistoista ja merkitään havainnekuviksi, '
      + 'ja tekstit kirjoitetaan lähteistä uudelleen yhtenäiseen asuun. '
      + 'Jokaisen sisällön tarkistaa ja hyväksyy ihminen.' },
    { otsikko: 'Kunnioitus', teksti: 'Jokainen maa kuvataan asukkaidensa silmin — ei stereotypioita, ei '
      + 'pilkkaa eikä säälittelyä, ei pelkkiä turistikliseitä. Vaikeita '
      + 'aiheita ei kaunistella eikä kauhistella.' },
    { otsikko: 'Avointa ja ilmaista', teksti: 'Peli on toistaiseksi ilmainen, ja sen lähdekoodi on kaikkien '
      + 'luettavissa. Peliä tekee tamperelainen Visuaaliviestinnän '
      + 'Instituutti (VVI). Kuvat, äänet ja tiedot tulevat avoimista '
      + 'lähteistä, ja jokaisen kohdalla lukee mistä se on ja kuka sen on '
      + 'tehnyt. Peli itse on tekijänsä omaisuutta: sitä saa pelata ja '
      + 'lähdekoodia lukea vapaasti, mutta julkaisuun tai omaan tuotteeseen '
      + 'tarvitaan lupa.' },
  ],
  lippurivi: 'Lippukuvat ovat Wikimedia Commonsista. Näiden tekijät lisenssi käskee nimetä: ',
  linkki: { teksti: 'Pelin GitHub-sivu', url: 'https://github.com/ravelius/Matkakirja' },
  oikeudet: '© Visuaaliviestinnän Instituutti Tampere Oy',
};
