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

/*
 * LAHIKUVAKULMA (omistajan linjaus 24.8.2026 Oodin ensimmaisen ajon
 * jalkeen: "Oodi sijoittuu kaupunkiin vaarin. Turvallisempi tehda
 * enemman lahikuva ja vahan matalammalta").
 *
 * Vakioresepti kuvaa kohteen kattojen korkeudelta ja levittaa taakse
 * laajan kaupunkinakyman. Se on hyva tunnetuille maamerkeille, mutta
 * jokainen naytetty kortteli on mahdollisuus sijoittaa rakennus
 * vaaraan ymparistoon — ja juuri niin kavi Oodille. Mita vahemman
 * kaupunkia nakyy, sita vahemman siina voi mennä pieleen.
 *
 * Tama kulma on siksi matalampi ja lahempi: kohde tayttaa kuvan,
 * ymparistoa nakyy vain sen verran etta paikka tunnistuu. Kayta tata
 * aina kun kohteen ymparisto on vaikea tai vahan kuvattu.
 */
const KUVAKULMA =
  ' Shot from street level or only slightly above, from close range, the'
  + ' camera looking almost horizontally at the building and tilted up'
  + ' very slightly. The building FILLS the frame and is cropped by the'
  + ' edges: its facade and materials are the subject, seen close enough'
  + ' that the surface texture reads clearly. Only a narrow strip of the'
  + ' surroundings is visible at the edges and behind — just enough to'
  + ' place it, never a wide city panorama. Professional full-frame'
  + ' photograph, natural colours, crisp detail, realistic atmosphere,'
  + ' no stylization. Absolutely no text, no watermark, no borders.';

const p = (kohde, kuvaus, ymparisto) =>
  `A photorealistic close photograph of ${kohde} filling the frame:`
  + ` ${kuvaus}. At the edges only: ${ymparisto}.${KUVAKULMA}`;

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
      'only a strip of the paved Kansalaistori square in front with a few'
      + ' people walking past at human scale, and a narrow glimpse of the'
      + ' granite steps and columns of the Parliament House at the very'
      + ' edge of the frame, under a clear northern sky',
    ),
    selite: 'Keskustakirjasto Oodi (2018) valittiin pian valmistumisensa '
      + 'jälkeen maailman parhaaksi uudeksi yleiseksi kirjastoksi.',
  },
];
