/*
 * HEROKUVATYÖLISTA, MELBOURNE — VIITEKUVILLA (24.8.2026).
 *
 * MIKSI UUSIKSI. Melbournen kolme herokuvaa generoitiin kierroksella
 * 20 (tools/hero-tyolista-20.mjs) ILMAN viitekuvia, eikä niitä ole
 * kytketty peliin. Uusi standardi on, että nimetty kohde ankkuroidaan
 * kohteen OMASTA Commons-kategoriasta haettuihin valokuviin
 * (docs/moduulit/viitekuvat.md), joten kohteet tehdään uusiksi
 * viitekuvaputken läpi. Kohteet ovat samat kuin kierroksella 20:
 * kirjasto, Princes-silta ja St Kildan Luna Park. Yksikään niistä ei
 * ole Melbournen kaupunkilehden kansikuvana (Flinders Streetin asema,
 * näyttelypalatsi, Melbourne Cricket Ground) eikä avauskuvana
 * (Flagstaff Gardensin ilmakuva, Northbank, Albert Park).
 *
 * Ajo (kohdekansio herokoe/):
 *   NODE_USE_ENV_PROXY=1 POLLO_KEHITTAJAKOODI=<koodi> \
 *     node tools/hero-ajuri.mjs melbourne 0 3 herokoe
 *
 * KUVAKULMA tuodaan tools/hero-kuvakulmat.mjs:stä eikä kopioida.
 * Käytössä on OLETUS eli VAKIO: omistajan päätös 24.8.2026 on, että
 * alkuperäinen korkeus ja etäisyys on visuaalisesti paras ja että
 * kuvan pitää olla dronemainen, jotta kaupunki hahmottuu.
 *
 * MITTAKAAVA. Vakioprompti sanoo "the landmark towers large and
 * dominant", ja malli liioittelee sen takia kohteen kokoa — omistaja
 * on huomannut tämän joissakin kuvissa. Siksi jokaisen kohteen
 * kuvaukseen on kirjoitettu auki sen TODELLINEN suhde ympäristöönsä:
 * kirjasto on matala kaksikerroksinen kortteli tornien keskellä,
 * Princes-silta on leveä mutta hyvin matala, ja Luna Parkin kuunaama
 * on vain parikerroksisen talon korkuinen.
 *
 * VIITEHAUN KUIVAHARJOITUS 24.8.2026 (kelvollisia kuvia, >=1000 px,
 * PD/CC0/CC BY/CC BY-SA):
 *   State Library Victoria  Category:State Library of Victoria  47  portti aukeaa
 *   Princes-silta           Category:Princes Bridge             47  portti aukeaa
 *   Luna Park               Category:Luna Park, Melbourne       47  portti aukeaa
 * Kaikki kolme tunnistuivat en-Wikipedian otsikosta Wikidatan kautta,
 * mutta VARMENNETTU KATEGORIA ANNETAAN SILTI KENTÄSSÄ `kategoria`.
 * Syy näkyi kuivaharjoituksessa: Wikidatan rajapinta vastasi kesken
 * erän 429:llä (liikaa pyyntöjä), jolloin tunnistus putosi
 * tekstihakuun ja generointiportti meni kiinni täysin kelvollisesta
 * kohteesta. Kun kategoria on kirjattu tähän, yksi verkkokutsu jää
 * pois eikä kiireinen Wikidata voi kaataa ajoa. `wiki` jätetään
 * näkyviin, koska se dokumentoi, mitä reittiä kategoria löytyi.
 *
 * ALKUPERÄISKANSAT (perustuslain pilari 3): heroissa ei käytetä
 * alkuperäiskansojen aiheita kuvituksena. Joesta käytetään sen
 * wurundjeri-nimeä Birrarung kaupungin nykyisen käytännön mukaisesti,
 * mutta aiheet ovat rakennuksia ja maisemaa.
 *
 * FAKTAT tarkistettu en-Wikipediasta 24.8.2026 (State Library
 * Victoria, Princes Bridge, Luna Park Melbourne, The Great Scenic
 * Railway).
 */
import { VAKIO, prompti } from './hero-kuvakulmat.mjs';

export const TYOLISTA = [
  /* ---- OSAVALTIONKIRJASTO — Swanston Street, aamu. */
  {
    id: 'melbourne-aamu',
    tiedosto: 'hero-melbourne-aamu.png',
    kaupunki: 'Melbourne',
    tarkkaKohde: true,
    wiki: 'State Library Victoria',
    kategoria: 'Category:State Library of Victoria',
    viitehaku: 'State Library Victoria',
    // Kategoriassa on paljon lukusalin sisäkuvia; nämä sanat nostavat
    // julkisivun ja kupolin ulkoa kuvattuna.
    viitesuosi: ['slv', 'entrance', 'portico', 'forecourt'],
    prompti: prompti(
      'the State Library Victoria on Swanston Street in Melbourne in'
      + ' early morning light',
      'a long symmetrical library front of pale cream stone, a portico'
      + ' of six tall Corinthian columns standing on a broad flight of'
      + ' steps in the middle, plain pilastered wings with even rows of'
      + ' arched windows running away to both sides, and set back above'
      + ' the roofline the low green copper dome of the octagonal'
      + ' reading room; THE BUILDING IS ONLY TWO STOREYS HIGH AND VERY'
      + ' MUCH LOWER THAN THE OFFICE TOWERS THAT SURROUND IT — it is a'
      + ' broad low block, never a tower, and the modern buildings on'
      + ' every side rise far above its dome; low early morning sun'
      + ' from the east strikes the columns straight on so that the'
      + ' fluting, the deep porch and every step throw long shadows',
      'the sloping lawn and forecourt in front with chess tables, low'
      + ' clipped hedges and a bronze statue on a granite plinth, the'
      + ' camera standing on the library side so that the iron railing'
      + ' along the pavement and the top steps are in the foreground,'
      + ' students sitting on the grass with coffee cups as small'
      + ' figures, the wide straight run of Swanston Street below with'
      + ' a green tram and early cyclists, and the grid of much taller'
      + ' office towers and narrow laneways of the city centre'
      + ' stretching away behind',
      VAKIO,
    ),
    selite: 'State Library Victoria perustettiin 1854 nimellä Melbourne '
      + 'Public Library, ja se on Australian vanhin yleinen kirjasto; sen '
      + 'yli viiden miljoonan esineen kokoelmiin kuuluu myös Ned Kellyn '
      + 'haarniska.',
  },

  /* ---- PRINCES-SILTA — Yarra eli Birrarung, keskipäivä. */
  {
    id: 'melbourne-keskipaiva',
    tiedosto: 'hero-melbourne-keskipaiva.png',
    kaupunki: 'Melbourne',
    tarkkaKohde: true,
    wiki: 'Princes Bridge',
    kategoria: 'Category:Princes Bridge',
    viitehaku: 'Princes Bridge',
    viitesuosi: ['princes bridge'],
    prompti: prompti(
      'Princes Bridge carrying Swanston Street across the Yarra, the'
      + ' river the Wurundjeri call Birrarung, in Melbourne at midday',
      'a very wide bluestone and granite road bridge of three shallow'
      + ' arches, heavy rusticated piers stepping down into the'
      + ' brown-green water, cast iron spandrel panels and tall lamp'
      + ' standards along both parapets, a green tram crossing in the'
      + ' middle of the deck between cars while walkers fill the'
      + ' footways on either side; THE BRIDGE IS BROAD BUT VERY LOW —'
      + ' its deck sits only a few metres above the water and its'
      + ' arches are flat and shallow, so it reads as a wide horizontal'
      + ' band across the picture and not as a tall structure, and the'
      + ' buildings along both banks stand far higher than it; high'
      + ' midday sun bleaches the pale granite and throws the arch'
      + ' shadows straight down onto the river',
      'the river running away in both directions with rowing eights, a'
      + ' small ferry and kayaks on it, the wooden boathouses with their'
      + ' painted balconies along the far bank, the camera standing on'
      + ' the north bank side so that the bluestone river wall, a'
      + ' landing stage and a row of plane trees are in the foreground,'
      + ' joggers and picnickers as small figures on the promenade, and'
      + ' the concert hall spire and the glass towers of Southbank'
      + ' rising along the southern shore with the city grid behind',
      VAKIO,
    ),
    selite: 'Nykyinen Princes-silta valmistui 1888 kaupungin vanhimmalle '
      + 'jokiylitykselle ja yhdistää Swanston Streetin St Kilda Roadiin; '
      + 'se merkittiin Victorian rakennusperintörekisteriin 20. elokuuta '
      + '1982.',
  },

  /* ---- LUNA PARK — St Kilda, ilta. */
  {
    id: 'melbourne-ilta',
    tiedosto: 'hero-melbourne-ilta.png',
    kaupunki: 'Melbourne',
    tarkkaKohde: true,
    wiki: 'Luna Park, Melbourne',
    kategoria: 'Category:Luna Park, Melbourne',
    viitehaku: 'Luna Park Melbourne',
    viitesuosi: ['entrance', 'face', 'gate', 'mouth'],
    prompti: prompti(
      'the entrance face of Luna Park at St Kilda in Melbourne at sunset',
      'the painted entrance of an old seaside amusement park: a giant'
      + ' smiling moon face of moulded plaster whose open mouth is the'
      + ' gateway, flanked by two slender white towers with domed tops,'
      + ' strings of light bulbs following every curve of the'
      + ' plasterwork and already lit, and rising behind it the long'
      + ' white timber hoops of the scenic railway; THE WHOLE ENTRANCE'
      + ' IS SMALL — the moon face is only about the height of a'
      + ' two-storey house and its little towers barely clear the'
      + ' rooftops of the street beside it, so it is a low seaside'
      + ' structure and not a monument; warm low sunset light from the'
      + ' west makes the painted face glow orange while the towers go'
      + ' into shadow',
      'the forecourt with ticket booths, palms and a queue of visitors'
      + ' as small figures, the camera standing on the forecourt side so'
      + ' that the low fence and a row of park benches are in the'
      + ' foreground, the Esplanade with its tram stop and the last'
      + ' market stalls being packed away, the Victorian verandahs and'
      + ' pastel apartment blocks of St Kilda around it, the pier and'
      + ' the flat water of Port Phillip beyond, and the towers of the'
      + ' distant city small on the horizon to the north',
      VAKIO,
    ),
    selite: 'Luna Park Melbourne avattiin St Kildan rannalla 13. joulukuuta '
      + '1912, ja sen puinen Great Scenic Railway on maailman vanhin yhä '
      + 'toiminnassa oleva vuoristorata, jonka vaunussa seisoo edelleen '
      + 'jarrumies.',
  },
];
