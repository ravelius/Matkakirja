/*
 * Herokuvien KORJAUSERÄ 3: Damaskoksen keskipäivä, KOHDE VAIHDETAAN.
 *
 * Miksi kohde vaihtuu. Kuvatekstin lupaama Suq al-Hamidiyya on
 * KATETTU basaarikatu: sen tunnistaa holvin luotireikien läpi
 * putoavista valonsäteistä, ja se on väistämättä sisänäkymä.
 * Omistajan linjaus 24.8.2026: "pitää olla dronemainen kuva koska
 * pitää näkyä muutakin kaupunkia jotta hahmottaa paremmin
 * kokonaisuutta. Vaihda vain kohdetta jos muuten ei onnistu."
 * Suqia ei voi kuvata ilmasta, joten tämä on juuri se tapaus.
 *
 * Uusi kohde on Damaskoksen linnoitus. Se valittiin kolmesta syystä:
 * se on ilmasta kuvattava, se on vanhankaupungin laidalla eikä siis
 * toista aamukuvan Umaijadimoskeijaa, ja se seisoo täsmälleen suqin
 * länsipäässä — katettu basaarikatu johtaa linnoitukselta moskeijalle,
 * joten kuvassa näkyy myös se katto, jonka alla vanha kuvateksti
 * kulki. Kaupungin tarina ei siis katkea, vain kuvakulma muuttuu.
 *
 * KUVATEKSTI VAIHDETAAN VASTAAVASTI js/packs/kulttuuri-kategoriat.js:ssä
 * (avain damaskos). Kuva ja teksti pysyvät parina — se on koko
 * viitekuvaputken tarkoitus.
 *
 * VIITEKATEGORIA: Category:Damascus Citadel, 46 kelvollista kuvaa.
 * HUOM: arvattava Category:Citadel of Damascus on TYHJÄ. Tämä on jo
 * kolmas kerta (Oodi, Petran kuningashaudat, tämä), kun luontevin
 * kategorianimi ei ole se oikea — siksi kategoria annetaan käsin.
 *
 * FAKTAT en-Wikipediasta (Citadel of Damascus) 24.8.2026: paikka
 * linnoitettiin ensi kerran 1076, nykyinen linna on ayyubidien ajalta,
 * ja se kuuluu vuonna 1979 maailmanperintöluetteloon otettuun
 * Damaskoksen vanhaankaupunkiin.
 */
import { VAKIO, prompti } from './hero-kuvakulmat.mjs';

export const TYOLISTA = [
  {
    id: 'damaskos-keskipaiva',
    tiedosto: 'hero-damaskos-keskipaiva.png',
    kaupunki: 'Damaskos',
    tarkkaKohde: true,
    kategoria: 'Category:Damascus Citadel',
    viitehaku: 'Damascus Citadel',
    viitesuosi: ['citadel', 'qalaat', 'wall', 'tower', 'aerial'],
    prompti: prompti(
      'the medieval Citadel of Damascus at the western edge of the old'
      + ' city at midday',
      'a large rectangular stone fortress of pale honey-coloured'
      + ' limestone standing directly on level ground rather than on a'
      + ' hill, its long curtain walls broken by massive square'
      + ' projecting towers with machicolations along their tops, the'
      + ' masonry weathered and patched from many centuries of'
      + ' rebuilding, a deep dry ditch running along the foot of the'
      + ' wall and a fortified gate flanked by two towers on the'
      + ' nearest side',
      'the dense low rooftops of the walled old city pressing right up'
      + ' against the fortress, among them the long arched metal roof of'
      + ' the covered Hamidiyah souq running away eastward toward the'
      + ' distant minarets and great courtyard of the Umayyad Mosque,'
      + ' with the bare slopes of Mount Qasioun rising behind the city'
      + ' in the haze',
      VAKIO,
    ),
    selite: null, // uusi kuvateksti kirjoitetaan kulttuuri-kategoriat.js:ään
  },
];
