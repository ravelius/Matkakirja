/*
 * Herokuvien työlista: HELSINGIN KESKUSTAKIRJASTO OODI, viitekuvilla.
 *
 * Omistajan tilaus 23.8.2026 Tampereen erän hyväksymisen jälkeen:
 * "Tee Helsingin oodi kirjasto apukuvilla uusiksi." Nykyinen
 * hero7-oodi.png on generoitu ilman viitteitä.
 *
 * VIITEKUVAT: kohteen oma Commons-kategoria on
 * Category:Helsinki Central Library Oodi — 60 tiedostoa, kaikki
 * mitatut kelvollisia (>=1000 px, PD/CC0/CC BY/CC BY-SA).
 *
 * HUOM KATEGORIAN NIMI. Arvattava "Category:Oodi" on TYHJÄ, ja
 * "Category:Oodi Helsinki Central Library" ei ole olemassa. Juuri
 * tästä syystä putki hakee kategorian en-Wikipedian otsikosta
 * Wikidatan kautta eikä arvaa sitä nimestä; tässä listassa oikea
 * kategoria on annettu suoraan, jotta yksi rajapintakutsu jää pois.
 *
 * TIEDOSTONIMI ON SIDOTTU JULKAISTUUN KUVATEKSTIIN. hero7-oodi.png
 * kantaa Helsingin lehdessä selitteen keskustakirjastosta, joten
 * korvaava kuva on Oodi eikä mikään muu — kohteen ja tiedostonimen
 * pari pidetään samana. Ajuri ohittaa valmiit tiedostot, joten
 * korvaava ajo tehdään tyhjään kansioon.
 *
 * FAKTAT tarkistettu en-Wikipediasta (Oodi, Helsinki Central Library
 * Oodi) 24.8.2026: avattu 5.12.2018 itsenäisyyden satavuotisjuhlan
 * lahjaksi kansalle, arkkitehdit ALA Architects, julkisivu
 * suomalaista kuusta, kolmas kerros lasiseinäinen kirjataivas
 * aaltoilevine kattoineen, rakennus seisoo Kansalaistorin laidalla
 * eduskuntataloa vastapäätä.
 */

// Reseptin muuttumaton loppuosa — sama kuin hero-tyolista-3..20:ssa.
const KUVAKULMA =
  " Shot from a LOW ELEVATED viewpoint at rooftop height, roughly level"
  + " with the landmark's midpoint, camera tilted only gently downward"
  + ' (about 15 degrees): the landmark towers large and dominant in the'
  + ' foreground, its facade fully visible, while streets with people'
  + ' directly below and the city behind stretch into the distance.'
  + ' Professional full-frame drone photograph, natural colours, crisp'
  + ' detail, realistic atmosphere, no stylization. Absolutely no text,'
  + ' no watermark, no borders.';

const p = (kohde, kuvaus, ymparisto) =>
  `A photorealistic wide photograph of ${kohde} dominating the`
  + ` foreground: ${kuvaus}. Behind and below it, smaller:`
  + ` ${ymparisto}.${KUVAKULMA}`;

export const TYOLISTA = [
  /* ---- OODI — Kansalaistori, päivä. Korvaa viitteettömän kuvan. */
  {
    id: 'helsinki-oodi',
    tiedosto: 'hero7-oodi.png',
    kaupunki: 'Helsinki',
    tarkkaKohde: true,
    wiki: 'Helsinki Central Library Oodi',
    kategoria: 'Category:Helsinki Central Library Oodi',
    viitehaku: 'Oodi library Helsinki',
    /*
     * Suositaan ulkokuvia: kohde tunnetaan aaltoilevasta puuvaipastaan
     * ja ulokkeestaan, ja kategoriassa on paljon sisäkuvia kirjaston
     * saleista. Sisäkuva viitteenä vetäisi generoinnin sisätilaan.
     */
    viitesuosi: ['oodi', 'exterior', 'facade', 'kansalaistori', 'ulko'],
    prompti: p(
      'the Oodi central library on Kansalaistori square in Helsinki on a'
      + ' bright day',
      'a long low building whose curving facade is clad entirely in'
      + ' narrow strips of warm honey-coloured Finnish spruce, the timber'
      + ' skin twisting in a smooth wave along the whole length; the'
      + ' upper floor bulges outward and cantilevers far over the square'
      + ' below like the bow of a ship, its underside also timber; the'
      + ' top floor is a continuous band of glass under a gently'
      + ' undulating white roof, and the glazed ground floor is set back'
      + ' in shadow beneath the overhang',
      'the open paved expanse of Kansalaistori with people crossing it as'
      + ' small distant figures, the columned front of the Parliament'
      + ' House on its granite steps across the street, the glass and'
      + ' steel of the Musiikkitalo and the Sanomatalo nearby, and the'
      + ' rooftops of central Helsinki stretching away under a clear'
      + ' northern sky',
    ),
    selite: 'Keskustakirjasto Oodi (2018) valittiin pian valmistumisensa '
      + 'jälkeen maailman parhaaksi uudeksi yleiseksi kirjastoksi.',
  },
];
