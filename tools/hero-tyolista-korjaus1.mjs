/*
 * Herokuvien KORJAUSERÄ 1: silmätarkistuksen VÄÄRÄ-tuomion saaneet.
 *
 * Lähde: docs/mantereet-tyoaineisto/herokuvien-silmatarkistus-1.md.
 * Erässä katsottiin 33 kuvaa 11 kaupungista oikeita Commons-valokuvia
 * vasten: 26 OK, 5 EPÄILYTTÄVÄÄ, 2 VÄÄRÄÄ. Vain nämä kaksi tehdään
 * uusiksi — omistajan kustannuskuri 24.8.2026: "generointi on kallista
 * joten ei generoida uusiksi kuin pahimmat".
 *
 * Molemmat ovat samaa lajia kuin alkuperäinen Kašgar-havainto: malli
 * ei tunne kohdetta ja täyttää aukon alueen arkkityypillä. Kummastakin
 * kohteesta oli Commonsissa aitoja valokuvia — putki ei vain
 * tunnistanut kohdetta ilman käsin annettua kategoriaa, joten
 * kategoria annetaan tässä suoraan.
 *
 * KUVAKULMAT KOHTEEN MUKAAN (tools/hero-kuvakulmat.mjs):
 *  - Kašgar saa VAKION, koska mausoleumi on ulkoa kuvattava rakennus
 *    ja omistajan linjaus on, että vakiokorkeus on visuaalisesti paras.
 *  - Damaskos saa TIUKAN, ja se on pakko: kuvateksti lupaa HOLVIN ALLA
 *    KULKEVAN KADUN valopisteineen. Vakiokulma kuvaa kattojen
 *    korkeudelta, eikä se voi kuvata katettua basaarikäytävää
 *    lainkaan — juuri siksi ensimmäinen yritys keksi ulkojulkisivun,
 *    jota kohteella ei ole. Tämä ei siis ole makuasia vaan
 *    kuvattavan kohteen sanelema.
 */
import { VAKIO, TIUKKA, prompti } from './hero-kuvakulmat.mjs';

export const TYOLISTA = [
  /* ---- KAŠGAR: Yusuf Balasagunin mausoleumi. Alkuperäinen havainto. */
  {
    id: 'kashgar-keskipaiva',
    tiedosto: 'hero-kashgar-keskipaiva.png',
    kaupunki: 'Kašgar',
    tarkkaKohde: true,
    kategoria: 'Category:Mausoleum of Yusuf Khass Hajib',
    viitehaku: 'Yusuf Khass Hajib mausoleum',
    /*
     * Kategoriassa on vain kaksi kelvollista ulkokuvaa (kolmas on
     * opastekyltti). Portti vaatii vähintään kaksi, joten tämä menee
     * läpi niukasti. Jos lataus epäonnistuu yhdellä, portti sulkeutuu
     * — se on oikea lopputulos eikä vika.
     */
    viitesuosi: ['mausoleum', 'yusuf', 'hajib', 'exterior'],
    prompti: prompti(
      'the mausoleum of the poet Yusuf Khass Hajib in Kashgar, Xinjiang,'
      + ' at midday',
      'a LOW, WIDE and FLAT building, emphatically NOT a tall domed'
      + ' Timurid monument: a broad rectangular front faced entirely in'
      + ' turquoise, cobalt and white glazed tilework in dense geometric'
      + ' and floral patterns, with a tall recessed pointed-arch portal'
      + ' at its centre and SIX slender tiled minaret-like turrets rising'
      + ' along the facade, each capped with a small pointed finial; the'
      + ' roofline stays low and horizontal with no large central dome'
      + ' above it',
      'a walled forecourt of pale paving with low clipped hedges, a few'
      + ' visitors as small figures near the portal, and the low'
      + ' flat-roofed brick and plaster houses of Kashgar beyond the'
      + ' wall under a bright dry sky',
      VAKIO,
    ),
    selite: null, // säilyy ennallaan js/packs/kulttuuri-kategoriat.js:ssä
  },

  /* ---- DAMASKOS: Suq al-Hamidiyya, katettu basaarikatu. */
  {
    id: 'damaskos-keskipaiva',
    tiedosto: 'hero-damaskos-keskipaiva.png',
    kaupunki: 'Damaskos',
    tarkkaKohde: true,
    kategoria: 'Category:Al-Hamidiyah Souq',
    viitehaku: 'Al-Hamidiyah Souq Damascus',
    /*
     * Suositaan nimenomaan sisänäkymiä holvin alta: kohteen tunnistaa
     * juuri katosta eikä julkisivusta, ja ulkokuva veisi generoinnin
     * takaisin siihen keksittyyn julkisivuun.
     */
    viitesuosi: ['interior', 'souq', 'hamidiyah', 'inside', 'roof'],
    prompti: prompti(
      'the interior of the covered Al-Hamidiyah Souq in the old city of'
      + ' Damascus',
      'a long straight market street running away from the camera'
      + ' beneath a high arched roof of corrugated iron, the metal'
      + ' pierced by hundreds of small bullet holes through which'
      + ' needle-thin shafts of daylight fall into the dim air below'
      + ' like points of light; shopfronts line both sides under the'
      + ' vault, their awnings and hanging goods catching the light,'
      + ' and the paving underfoot is worn smooth and dark',
      'at the far end of the street a bright opening where the souq'
      + ' meets daylight, and the shadowy crowd of shoppers moving'
      + ' between the stalls',
      TIUKKA,
    ),
    selite: null, // säilyy ennallaan
  },
];
