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
  helsinki: {
    'Temppeliaukion kirkko': 'assets/kartat/miniatyyrit/helsinki-temppeliaukion-kirkko.jpg',
    Linnanmäki: 'assets/kartat/miniatyyrit/helsinki-linnanmaki.jpg',
    Päärautatieasema: 'assets/kartat/miniatyyrit/helsinki-paarautatieasema.jpg',
    'Kaisaniemen puisto': 'assets/kartat/miniatyyrit/helsinki-kaisaniemen-puisto.jpg',
    'Kallion kirkko': 'assets/kartat/miniatyyrit/helsinki-kallion-kirkko.jpg',
    Tuomiokirkko: 'assets/kartat/miniatyyrit/helsinki-tuomiokirkko.jpg',
    'Uspenskin katedraali': 'assets/kartat/miniatyyrit/helsinki-uspenskin-katedraali.jpg',
    Johanneksenkirkko: 'assets/kartat/miniatyyrit/helsinki-johanneksenkirkko.jpg',
    Suomenlinna: 'assets/kartat/miniatyyrit/helsinki-suomenlinna.jpg',
  },
  pariisi: {
    'Eiffel-torni': 'assets/kartat/miniatyyrit/pariisi-eiffel-torni.jpg',
    Riemukaari: 'assets/kartat/miniatyyrit/pariisi-riemukaari.jpg',
    'Concorden aukio': 'assets/kartat/miniatyyrit/pariisi-concorden-aukio.jpg',
    Louvre: 'assets/kartat/miniatyyrit/pariisi-louvre.jpg',
    'Luxembourgin puisto': 'assets/kartat/miniatyyrit/pariisi-luxembourgin-puisto.jpg',
    'Sacré-Cœur': 'assets/kartat/miniatyyrit/pariisi-sacre-coeur.jpg',
    Panthéon: 'assets/kartat/miniatyyrit/pariisi-pantheon.jpg',
    'Notre-Dame': 'assets/kartat/miniatyyrit/pariisi-notre-dame.jpg',
  },
  lontoo: {
    'Buckinghamin palatsi': 'assets/kartat/miniatyyrit/lontoo-buckinghamin-palatsi.jpg',
    'Trafalgar Square': 'assets/kartat/miniatyyrit/lontoo-trafalgar-square.jpg',
    'Big Ben': 'assets/kartat/miniatyyrit/lontoo-big-ben.jpg',
    'Lontoon silmä': 'assets/kartat/miniatyyrit/lontoo-lontoon-silma.jpg',
    'Pyhän Paavalin katedraali': 'assets/kartat/miniatyyrit/lontoo-pyhan-paavalin-katedraali.jpg',
    'Tower Bridge': 'assets/kartat/miniatyyrit/lontoo-tower-bridge.jpg',
  },
};
