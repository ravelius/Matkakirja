/*
 * KARTTAPALLOLINSSI — matkalaukun varuste, joka avaa maailmanpallon.
 *
 * OMISTAJAN TILAUS 4.9.2026 ilta (sanatarkasti): *"Lisää pallo yhdeksi
 * linssiksi matkalaukkuun ja ota pois kehittäjä valikosta."* Pilotissa
 * (v1536) pallo aukesi hampurilaisvalikon napista; Raamatun sääntö
 * "LINSSIT KYTKETÄÄN VAIN MATKALAUKUSTA" (18.8.2026) sanoo, että
 * valikko on pelin ympäryksiä eikä pelisisältöä — pallo on
 * pelisisältöä, joten se kuuluu laukkuun.
 *
 * Linssi EI piirrä karttakerrosta (kerros: false, kuten radio ja
 * vertailu) eikä ole kartan tila: se on TOIMINTO. Valinta laukussa
 * sulkee laukun ja avaa pallon (js/ui.js valitseLinssi → avaaPallo),
 * eikä valinta jää päälle — pallon sulkeminen palauttaa kartan
 * sellaisenaan, ja edellinen linssi (esim. radio) jatkaa keskeytymättä.
 *
 * PERUSVARUSTE: pallo on omistettu heti (js/linssit/omistus.js
 * PERUSLINSSIT), ei tietäjäpistekynnyksen takana. Karttapallo on
 * navigointiväline, jota ilman uusi pelaaja ei näe, missä päin
 * maailmaa lauta on. Rekisterissä manner: null pysyy, mutta
 * tarkistaKynnys ohittaa jo omistetun linssin.
 *
 * Pallo itse: js/pallo.js (Globe.gl ämpäristä, pinnoite z4, ei mitään
 * pinnoitteen päällä; napautus sukeltaa laudalle).
 */

export const LINSSI = {
  tunnus: 'pallo',
  jarjestys: 5,
  kerros: false,

  nimi: 'Karttapallo',
  lyhyt: 'Isoisän juliste pallona: pyöritä maailmaa ja napauta kohtaa, johon haluat sukeltaa.',
  // Pallo pystyakselilla ja päiväntasaajan ellipsi.
  ikoni: '<circle cx="12" cy="12" r="8"/>'
    + '<path d="M4.4 12h15.2"/>'
    + '<path d="M12 4c-3 2.2-3 13.8 0 16M12 4c3 2.2 3 13.8 0 16"/>'
    + '<path d="M12 20v2"/>',
  valokuva: false,

  // Pallo on maailmankartan valikko: muilla laudoilla ei ole
  // maantieteellistä projektiota, josta sukellus laskettaisiin.
  laudat: ['maailmankartta'],

  lahde: {
    aineisto: 'Matkakirjan oma juliste (laattapyramidi 2026-09-03a) käännettynä tasaväliseksi pinnoitteeksi; Globe.gl 2.46.2 (three.js)',
    lisenssi: 'Peli oma aineisto; Globe.gl MIT',
    osoite: 'https://github.com/vasturiano/globe.gl',
    haettu: '2026-09-04',
  },
};
