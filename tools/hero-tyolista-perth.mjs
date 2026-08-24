/*
 * HEROKUVATYÖLISTA, PERTH — VIITEKUVILLA (24.8.2026).
 *
 * MIKSI UUSIKSI. Perthin kolme herokuvaa generoitiin kierroksella 20
 * (tools/hero-tyolista-20.mjs) ILMAN viitekuvia, eikä niitä ole
 * kytketty peliin. Uusi standardi on, että nimetty kohde ankkuroidaan
 * kohteen OMASTA Commons-kategoriasta haettuihin valokuviin
 * (docs/moduulit/viitekuvat.md).
 *
 * KAIKKI KOLME KOHDETTA VAIHDETTU, kukin omasta syystään:
 *
 *  1. Kierroksen 20 ILTAKUVA oli Cottesloen ranta. Se on Perthin
 *     kaupunkilehden KOLMAS KANSIKUVA (js/packs/kulttuuri-kategoriat.js,
 *     perth → kansikuvat, 'Cottesloe Beach, May 2021 02.jpg'), joten
 *     hero toistaisi lehden oman kannen. Ranta ei myöskään ole
 *     "nimetty rakennus", jonka Commons-kategoriaan generointi voisi
 *     ankkuroitua.
 *  2. Kierroksen 20 AAMUKUVA oli Kings Parkin latvuskävelysilta.
 *     Puistolla ei ole sillan omaa kategoriaa, vaan
 *     Category:Kings Park, Western Australia on koko puiston
 *     kategoria: viitteiksi tulisi kukkia ja näköaloja, ei siltaa.
 *     Ankkurointi jäisi siis tekemättä juuri siltä osin, jota varten
 *     koko putki rakennettiin.
 *  3. Kierroksen 20 KESKIPÄIVÄKUVA oli kellotorni, joka esiintyy
 *     lehden nostokuvana ('Perth Swan Bells Tower.jpg') ja seisoo
 *     aivan lehden kansikuvan Elizabeth Quayn vieressä.
 *
 * Tilalle valittiin kolme maamerkkiä, jotka eivät esiinny Perthin
 * lehdessä lainkaan — eivät kansi-, avaus- eivätkä nostokuvina — ja
 * joilla kaikilla on oma, runsas Commons-kategoria: Pyhän Marian
 * katedraali Victoria Squarella, Matagarup-silta Swan-joen yli ja
 * Council House St Georges Terracella.
 *
 * Ajo (kohdekansio herokoe/):
 *   NODE_USE_ENV_PROXY=1 POLLO_KEHITTAJAKOODI=<koodi> \
 *     node tools/hero-ajuri.mjs perth 0 3 herokoe
 *
 * KUVAKULMA tuodaan tools/hero-kuvakulmat.mjs:stä eikä kopioida.
 * Käytössä on OLETUS eli VAKIO (omistajan päätös 24.8.2026:
 * alkuperäinen korkeus ja etäisyys, dronemainen näkymä).
 *
 * MITTAKAAVA. Vakioprompti houkuttelee liioittelemaan kohteen kokoa,
 * joten todellinen suhde ympäristöön on kirjoitettu auki: katedraali
 * on matala kivikirkko toimistotornien keskellä, Matagarup-silta on
 * pitkä ja matala kaarisilta leveän joen yllä, ja Council House on
 * vain 49,8 metriä eli selvästi naapureitaan matalampi.
 *
 * ALKUPERÄISKANSAT (perustuslain pilari 3): Matagarup on sillan
 * virallinen nimi ja nyungarinkielinen paikannimi Heirisson Islandin
 * seudulle. Nimi ja sen merkitys kerrotaan selitteessä samalla
 * periaatteella kuin Melbournen Birrarung; kuvituksena ei käytetä
 * alkuperäiskansojen aiheita.
 *
 * VIITEHAUN KUIVAHARJOITUS 24.8.2026 (kelvollisia kuvia, >=1000 px,
 * PD/CC0/CC BY/CC BY-SA):
 *   Pyhän Marian katedraali
 *       Category:St Mary's Roman Catholic Cathedral, Perth  43  portti aukeaa
 *   Matagarup-silta   Category:Matagarup Bridge             48  portti aukeaa
 *   Council House     Category:Council House, Perth         50  portti aukeaa
 * Kaikki kolme tunnistuivat en-Wikipedian otsikosta Wikidatan kautta,
 * mutta VARMENNETTU KATEGORIA ANNETAAN SILTI KENTÄSSÄ `kategoria`.
 * Syy näkyi kuivaharjoituksessa: Wikidatan rajapinta vastasi kesken
 * erän 429:llä (liikaa pyyntöjä), jolloin tunnistus putosi
 * tekstihakuun ja generointiportti meni kiinni täysin kelvollisesta
 * kohteesta. Kun kategoria on kirjattu tähän, yksi verkkokutsu jää
 * pois eikä kiireinen Wikidata voi kaataa ajoa. `wiki` jätetään
 * näkyviin, koska se dokumentoi, mitä reittiä kategoria löytyi.
 * Huomaa, että katedraalin kategorian nimi on eri kuin artikkelin
 * otsikko — juuri siksi kategoriaa ei saa arvata, vaan se haetaan.
 *
 * FAKTAT tarkistettu en-Wikipediasta 24.8.2026 (St Mary's Cathedral,
 * Perth; Matagarup Bridge; Council House, Perth).
 */
import { VAKIO, prompti } from './hero-kuvakulmat.mjs';

export const TYOLISTA = [
  /* ---- PYHÄN MARIAN KATEDRAALI — Victoria Square, aamu. */
  {
    id: 'perth-aamu',
    tiedosto: 'hero-perth-aamu.png',
    kaupunki: 'Perth',
    tarkkaKohde: true,
    wiki: "St Mary's Cathedral, Perth",
    kategoria: "Category:St Mary's Roman Catholic Cathedral, Perth",
    viitehaku: "St Mary's Cathedral Perth",
    // Kategoriassa on paljon sisäkuvia ja aukion yleiskuvia;
    // kohteen oma nimi tiedostonimessä nostaa julkisivukuvat.
    viitesuosi: ['st mary'],
    prompti: prompti(
      "St Mary's Cathedral on Victoria Square in Perth in early morning"
      + ' light',
      'a cathedral in two clearly different halves joined into one'
      + ' building: an older gothic church of rough honey-coloured'
      + ' limestone with pointed windows, buttresses and a slender'
      + ' spire, and beside it a newer addition of smooth pale stone'
      + ' whose western end is a broad CURVED wall of glass and stone'
      + ' with a second, plainer spire above it, the two halves meeting'
      + ' without hiding the seam; THE CATHEDRAL IS A LOW BUILDING OF'
      + ' ONLY A FEW STOREYS — its spires reach nowhere near the tops'
      + ' of the office towers standing a block away, and it sits low'
      + ' and wide in its square rather than rising over the city; low'
      + ' early morning sun from the east rakes across the limestone so'
      + ' that every buttress and window reveal throws a long shadow'
      + ' and the curved glass wall catches the light',
      'the open paved square in front with jacarandas, lawn, low hedges'
      + ' and a bronze statue, the camera standing on the square side so'
      + ' that a park bench, a drinking fountain and the edge of the'
      + ' lawn are in the foreground, a few early walkers and people'
      + ' arriving as small distant figures on the steps, the quiet'
      + ' streets around the square with parked cars and a bus, the'
      + ' brick terraces and low offices of the surrounding blocks, and'
      + ' the glass towers of the city centre and the flat blue reach'
      + ' of the Swan River beyond',
      VAKIO,
    ),
    selite: 'Perthin Pyhän Marian katedraalin peruskivi laskettiin '
      + '8. helmikuuta 1863 ja ensimmäinen vaihe valmistui 1865, mutta '
      + '1920-luvulla aloitettu laajennus jäi lamaan kesken ja '
      + 'seitsemänkymmenen vuoden jälkeen valmistunut kaareva jatke '
      + 'vihittiin käyttöön vasta joulukuussa 2009.',
  },

  /* ---- MATAGARUP-SILTA — Swan-joki, keskipäivä. */
  {
    id: 'perth-keskipaiva',
    tiedosto: 'hero-perth-keskipaiva.png',
    kaupunki: 'Perth',
    tarkkaKohde: true,
    wiki: 'Matagarup Bridge',
    kategoria: 'Category:Matagarup Bridge',
    viitehaku: 'Matagarup Bridge',
    viitesuosi: ['matagarup'],
    prompti: prompti(
      'the Matagarup Bridge across the Swan River between East Perth'
      + ' and Burswood at midday',
      'a white pedestrian bridge whose deck is hung on cables from two'
      + ' tall steel arches that lean together and twist as they rise,'
      + ' the arches meeting near the middle of the river and the'
      + ' cables fanning down to a narrow walking deck with a slender'
      + ' handrail, the whole structure painted white and standing out'
      + ' against the dark blue water; THE BRIDGE IS LONG AND LOW —'
      + ' the deck runs almost flat and close to the water across a'
      + ' very wide river, and only the two arches rise, to about the'
      + ' height of a twenty-storey building, so the picture is mostly'
      + ' water and horizontal line rather than a tall structure; hard'
      + ' midday sun straight overhead makes the white steel glare and'
      + ' lays the shadow of the arches flat on the river',
      'the broad blue river below with small sailing boats and a ferry'
      + ' on it, the camera standing on the East Perth side so that the'
      + ' riverside path, a railing and a row of young trees are in the'
      + ' foreground, walkers and cyclists crossing the deck as small'
      + ' figures, the wide grassy foreshore and the bowl of the big'
      + ' stadium with its bronze-coloured facade on the far bank,'
      + ' car parks and railway lines behind it, and the glass towers'
      + ' of the Perth city centre standing along the river to the west'
      + ' under a hard blue sky',
      VAKIO,
    ),
    selite: 'Matagarup-silta avattiin jalankulkijoille 14. heinäkuuta 2018, '
      + 'ja se sai nimensä 2017 nyungarinkielisestä paikannimestä '
      + 'Matagarup, joka tarkoittaa kohtaa, jossa joki on vain sääreen '
      + 'asti ja jonka voi kahlata yli.',
  },

  /* ---- COUNCIL HOUSE — St Georges Terrace, ilta. */
  {
    id: 'perth-ilta',
    tiedosto: 'hero-perth-ilta.png',
    kaupunki: 'Perth',
    tarkkaKohde: true,
    wiki: 'Council House, Perth',
    kategoria: 'Category:Council House, Perth',
    viitehaku: 'Council House Perth',
    // Pelkkä 'council house' nosti kärkeen myös vuoden 1962 kuvan;
    // nämä sanat osuvat valaistuun julkisivuun eli iltakuvaan.
    viitesuosi: ['council house lights', 'night'],
    prompti: prompti(
      'Council House on St Georges Terrace in Perth at sunset',
      'a rectangular modernist office block of thirteen storeys, its'
      + ' two long faces covered from top to bottom in a regular grid'
      + ' of precast concrete sun hoods — a lattice of pale T-shaped'
      + ' frames standing out in front of the glass so that the whole'
      + ' facade reads as a honeycomb — the ends of the block plain'
      + ' concrete, and the ground floor set back behind slender'
      + ' columns; THE BUILDING IS ONLY ABOUT FIFTY METRES HIGH AND IS'
      + ' PLAINLY SHORTER THAN THE OFFICE TOWERS AROUND IT — the glass'
      + ' skyscrapers along the same street rise several times its'
      + ' height, so it is a modest slab among giants; warm low sunset'
      + ' light from the west catches one long face so that every'
      + ' concrete frame throws its own shadow, while the first'
      + ' coloured lights begin to glow inside the lattice',
      'the mature gardens directly beside it with figs, palms and lawn,'
      + ' the camera standing on the garden side so that the treetops,'
      + ' a lamp post and a low stone wall are in the foreground,'
      + ' office workers walking home along the pavement as small'
      + ' figures, the tree-lined run of St Georges Terrace below with'
      + ' evening traffic and a bus, the older stone facades of the'
      + ' governor\'s residence next door, and the taller glass towers'
      + ' of the city centre with the river and the darkening hills'
      + ' beyond',
      VAKIO,
    ),
    selite: 'Howlett and Bailey Architectsin suunnitteleman Council Housen '
      + 'vihki käyttöön kuningatar Elisabet II vuonna 1963, vuotta '
      + 'Perthin isännöimien Kansainyhteisön kisojen jälkeen; '
      + '13-kerroksinen ja 49,8 metriä korkea talo säästettiin purku-'
      + 'aikeilta ja vietiin lopulta osavaltion rakennusperintörekisteriin.',
  },
];
