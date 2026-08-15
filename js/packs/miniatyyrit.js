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
    Valtiopäivätalo: 'assets/kartat/miniatyyrit/berliini-valtiopaivatalo.png',
    'Brandenburgin portti': 'assets/kartat/miniatyyrit/berliini-brandenburgin-portti.png',
    'Checkpoint Charlie': 'assets/kartat/miniatyyrit/berliini-checkpoint-charlie.png',
    Museosaari: 'assets/kartat/miniatyyrit/berliini-museosaari.png',
    'Tv-torni': 'assets/kartat/miniatyyrit/berliini-tv-torni.png',
    'East Side Gallery': 'assets/kartat/miniatyyrit/berliini-east-side-gallery.png',
  },
  helsinki: {
    'Temppeliaukion kirkko': 'assets/kartat/miniatyyrit/helsinki-temppeliaukion-kirkko.png',
    Linnanmäki: 'assets/kartat/miniatyyrit/helsinki-linnanmaki.png',
    Päärautatieasema: 'assets/kartat/miniatyyrit/helsinki-paarautatieasema.png',
    'Kaisaniemen puisto': 'assets/kartat/miniatyyrit/helsinki-kaisaniemen-puisto.png',
    'Kallion kirkko': 'assets/kartat/miniatyyrit/helsinki-kallion-kirkko.png',
    Tuomiokirkko: 'assets/kartat/miniatyyrit/helsinki-tuomiokirkko.png',
    'Uspenskin katedraali': 'assets/kartat/miniatyyrit/helsinki-uspenskin-katedraali.png',
    Johanneksenkirkko: 'assets/kartat/miniatyyrit/helsinki-johanneksenkirkko.png',
    Suomenlinna: 'assets/kartat/miniatyyrit/helsinki-suomenlinna.png',
  },
  pariisi: {
    'Eiffel-torni': 'assets/kartat/miniatyyrit/pariisi-eiffel-torni.png',
    Riemukaari: 'assets/kartat/miniatyyrit/pariisi-riemukaari.png',
    'Concorden aukio': 'assets/kartat/miniatyyrit/pariisi-concorden-aukio.png',
    Louvre: 'assets/kartat/miniatyyrit/pariisi-louvre.png',
    'Luxembourgin puisto': 'assets/kartat/miniatyyrit/pariisi-luxembourgin-puisto.png',
    'Sacré-Cœur': 'assets/kartat/miniatyyrit/pariisi-sacre-coeur.png',
    Panthéon: 'assets/kartat/miniatyyrit/pariisi-pantheon.png',
    'Notre-Dame': 'assets/kartat/miniatyyrit/pariisi-notre-dame.png',
  },
  lontoo: {
    'Buckinghamin palatsi': 'assets/kartat/miniatyyrit/lontoo-buckinghamin-palatsi.png',
    'Trafalgar Square': 'assets/kartat/miniatyyrit/lontoo-trafalgar-square.png',
    'Big Ben': 'assets/kartat/miniatyyrit/lontoo-big-ben.png',
    'Lontoon silmä': 'assets/kartat/miniatyyrit/lontoo-lontoon-silma.png',
    'Pyhän Paavalin katedraali': 'assets/kartat/miniatyyrit/lontoo-pyhan-paavalin-katedraali.png',
    'Tower Bridge': 'assets/kartat/miniatyyrit/lontoo-tower-bridge.png',
  },
};
