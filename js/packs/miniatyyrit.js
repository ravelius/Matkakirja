/*
 * Kohdekartan miniatyyripiirrokset (omistajan tilaus 15.8.2026:
 * "miniatyyrikuvat piirrettynä nähtävyyksistä ... Sama idea kuin
 * huvipuisto kartoissa"; "Tee piirrokset sinne [Berliiniin] ensin
 * sekä samat kolmeen kaupunkiin hki. Pariisi. Lontoo").
 *
 * Avaimet ovat samat kuin NAHTAVYYSJUTUT-taulussa: kaupungin tunnus →
 * kohteen NIMI → piirroksen polku. Numeropisteen napautus avaa kartan
 * päälle kortin (piirros + jutun alku), ja piirroksen napautus vie
 * itse juttuun (js/ui.js naytaMiniatyyri). Kaupunki tai kohde ilman
 * miniatyyriä toimii entiseen tapaan: napautus suoraan juttuun.
 *
 * Kuvat generoidaan tools/generoi-miniatyyrit.mjs:llä ja KATSOTAAN
 * SILMIN ennen tähän tauluun lisäämistä — tests/miniatyyrit.test.mjs
 * valvoo, että jokainen polku on olemassa ja jokainen nimi vastaa
 * kartan kohdetta.
 */

export const MINIATYYRIT = {
  berliini: {
    Valtiopäivätalo: 'assets/kartat/miniatyyrit/berliini-valtiopaivatalo.jpg',
    'Brandenburgin portti': 'assets/kartat/miniatyyrit/berliini-brandenburgin-portti.jpg',
    'Checkpoint Charlie': 'assets/kartat/miniatyyrit/berliini-checkpoint-charlie.jpg',
    Museosaari: 'assets/kartat/miniatyyrit/berliini-museosaari.jpg',
    'Tv-torni': 'assets/kartat/miniatyyrit/berliini-tv-torni.jpg',
    'East Side Gallery': 'assets/kartat/miniatyyrit/berliini-east-side-gallery.jpg',
  },
};
