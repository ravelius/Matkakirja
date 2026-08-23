/*
 * HEROKUVATYÖLISTA, TAMPERE — VIITEKUVAPUTKEN ENSIMMÄINEN OIKEA AJO
 * (omistajan tilaus 23.8.2026).
 *
 * Tämä lista on koeajo: omistaja tuntee nämä neljä rakennusta hyvin
 * ja arvioi laadun itse, joten tämä erä ratkaisee, kelpaako
 * viitekuvaputki muille kaupungeille. Ei oikaisuja missään kohdassa.
 *
 * Ajo (kohdekansio herokoe/):
 *   NODE_USE_ENV_PROXY=1 POLLO_KEHITTAJAKOODI=<koodi> \
 *     node tools/hero-ajuri.mjs tampere 0 4 herokoe
 *
 * Jokainen kohta on `tarkkaKohde: true`, eli GENEROINTIPORTTI on
 * päällä: kuva syntyy vain, jos kohde tunnistettiin sen omasta
 * Commons-kategoriasta JA viitekuvia on vähintään kaksi. Muuten
 * ajuri kirjaa syyn eikä generoi (docs/moduulit/viitekuvat.md).
 *
 * KOHTEIDEN TUNNISTUS on tehty en-Wikipedian otsikolla, ei vapaalla
 * tekstillä. Syy: hakusana "Old Church of Tampere" palautti pääosin
 * MESSUKYLÄN vanhan kirkon, keskiaikaisen kivikirkon kaupungin
 * laidalla — ei tämän listan kohdetta, Carlo Bassin puista Vanhaa
 * kirkkoa Keskustorilla. Otsikko 'Tampere Old Church' vie
 * Wikidatan kautta oikeaan kategoriaan.
 *
 * VIITEHAUN TULOS 23.8.2026 (kelvollisia kuvia kategoriassa):
 *   Näsilinna / Milavida  22   (Category:Näsilinna)
 *   Pääkirjasto Metso     25   (Category:Tampere City Library, Metso)
 *   Vanha kirkko          32   (Category:Tampere Old church)
 *   Näsinneula            43   (Category:Näsinneula)
 * Portti aukeaa siis kaikille neljälle.
 *
 * TIEDOSTONIMET OVAT SIDOTUT JULKAISTUIHIN KUVATEKSTEIHIN. Tampereella
 * on jo kierroksen 19 herot samoilla nimillä (js/packs/
 * kulttuuri-kategoriat.js, avauskuvat), ja jokaisella on oma selite.
 * Tämä erä korvaa ne viitekuvilla ankkuroiduilla versioilla, joten
 * KOHTEEN JA TIEDOSTONIMEN PARI ON PIDETTÄVÄ TÄSMÄLLEEN SAMANA:
 *   hero-tampere-aamu.png       = Näsilinna / Museo Milavida
 *   hero-tampere-keskipaiva.png = pääkirjasto Metso
 *   hero-tampere-ilta.png       = Vanha kirkko
 * Parin vaihtaminen tekisi juuri sen virheen, jota koko viitekuvaputki
 * on rakennettu estämään: kuvateksti lupaisi eri rakennuksen kuin kuva.
 * Neljäs kuva (Näsinneulan yläosa) on uusi eikä korvaa mitään.
 *
 * FAKTAT tarkistettu en-Wikipediasta 23.8.2026.
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
  /* ---- NÄSILINNA / MUSEO MILAVIDA — Näsinpuisto, aamu. */
  {
    id: 'tampere-aamu',
    tiedosto: 'hero-tampere-aamu.png',
    kaupunki: 'Tampere',
    tarkkaKohde: true,
    wiki: 'Näsilinna',
    viitehaku: 'Näsilinna Milavida',
    viitesuosi: ['näsilinna', 'milavida'],
    prompti: p(
      'the Näsilinna palace on the Näsikallio hill in Tampere in early'
      + ' morning light',
      'a symmetrical neo-baroque palace of pale plastered walls with'
      + ' rusticated corners, a high central section crowned by a shallow'
      + ' dome, tall arched windows in two main storeys, a broad terrace'
      + ' and balustrade across the front and a wide flight of steps down'
      + ' into the park, low morning sun coming in from the east so that'
      + ' the pale plaster glows and every cornice casts a long shadow',
      'the sloping green park of Näsinpuisto with its gravel paths, old'
      + ' trees and park benches, a couple of early walkers as small'
      + ' distant figures on the terrace steps, the roofs of the city'
      + ' centre below, and the open water of Lake Näsijärvi stretching'
      + ' to the far shore under a clear morning sky',
    ),
    selite: 'Karl August Wreden suunnittelema palatsi valmistui 1898 Peter '
      + 'von Nottbeckin kodiksi nimellä Milavida; nykyään siinä toimii '
      + 'Museo Milavida.',
  },

  /* ---- PÄÄKIRJASTO METSO — Hämeenpuisto, keskipäivä. */
  {
    id: 'tampere-keskipaiva',
    tiedosto: 'hero-tampere-keskipaiva.png',
    kaupunki: 'Tampere',
    tarkkaKohde: true,
    wiki: 'Tampere Central Library',
    viitehaku: 'Metso library',
    viitesuosi: ['metso', 'kirjasto', 'library'],
    prompti: p(
      'the Metso main library beside the Hämeenpuisto boulevard in Tampere'
      + ' at midday',
      'a low sweeping building of curved organic forms, its walls of pale'
      + ' granite, rapakivi and dark copper folding in long arcs, a fan of'
      + ' curving green-patinated copper roofs spreading like wings,'
      + ' deep-set irregular windows and a rounded glazed entrance under a'
      + ' projecting canopy, hard midday light picking out the curve of'
      + ' every roof plate',
      'the wide tree-lined Hämeenpuisto boulevard with its double avenue'
      + ' of limes, cyclists and pedestrians as small distant figures, the'
      + ' park lawn and benches in front of the entrance, the apartment'
      + ' blocks of the city centre along the boulevard, and the ridge of'
      + ' Pyynikki with its pines rising beyond',
    ),
    selite: 'Reima ja Raili Pietilän suunnittelema pääkirjasto avattiin '
      + '1986; se sai kutsumanimensä Metso siitä, että ylhäältä katsottuna '
      + 'sen muoto muistuttaa lintua.',
  },

  /* ---- VANHA KIRKKO — Keskustori, ilta. */
  {
    id: 'tampere-ilta',
    tiedosto: 'hero-tampere-ilta.png',
    kaupunki: 'Tampere',
    tarkkaKohde: true,
    wiki: 'Tampere Old Church',
    viitehaku: 'Old Church',
    // Kategoriassa on myös aukion yleiskuvia ja kuvia, jotka on
    // otettu kirkosta POISPÄIN; nämä sanat nostavat itse kirkon.
    viitesuosi: ['vanha kirkko', 'old church'],
    prompti: p(
      'the wooden Old Church of Tampere on the Keskustori square at sunset',
      'a low cross-shaped wooden church with pale painted board walls and'
      + ' white-framed windows, a shallow shingled roof and a small ridge'
      + ' turret, standing among tall old trees in its own green churchyard,'
      + ' the separate white belfry beside it, warm low evening sun raking'
      + ' across the boards from the west so that every plank casts its own'
      + ' shadow and the white frames glow',
      'the wide open Keskustori square with tram rails and evening traffic,'
      + ' market stalls being packed up, people crossing the square as small'
      + ' distant figures, the pale stone and brick facades of the city'
      + ' centre with their windows lighting up, and the rapids and'
      + ' red-brick factory chimneys of the Tammerkoski beyond',
    ),
    selite: 'Carlo Bassin suunnittelema puinen ristikirkko valmistui 1824 '
      + 'ja on Tampereen keskustan vanhin säilynyt rakennus; C. L. Engelin '
      + 'kellotapuli nousi sen viereen 1828.',
  },

  /*
   * ---- NÄSINNEULAN YLÄOSA LÄHIKUVASSA (omistajan lisätilaus
   * 23.8.2026). Tämä on putken kova testi: malli osaa tehdä "tornin",
   * mutta oikeat mittasuhteet — betonivarsi, ylhäällä pyöreä
   * näkötasanne ja sen päällä ohut antenni — tulevat vain
   * viitekuvista. Siksi `viitesuosi` hakee nimenomaan lähikuvia
   * näkötasanteesta ja ravintolakerroksesta, ei kaukaisia siluetteja.
   *
   * Tämä kohta EI käytä yhteistä KUVAKULMA-loppuosaa: se määrää
   * kameran rakennuksen puoliväliin ja kadut näkyviin, mikä on juuri
   * väärin lähikuvalle tornin huipusta.
   */
  {
    id: 'tampere-nasinneula',
    tiedosto: 'hero-tampere-nasinneula.png',
    kaupunki: 'Tampere',
    tarkkaKohde: true,
    wiki: 'Näsinneula',
    viitehaku: 'Näsinneula',
    // Sanat verrataan tiedostonimeen. 'obsevation' ei ole kirjoitusvirhe
    // täällä vaan Commonsissa: File:Näsinneula obsevation deck.jpg.
    viitesuosi: ['deck', 'obsevation', 'ravintola', 'cropped'],
    prompti:
      'A photorealistic wide photograph of the TOP OF THE NÄSINNEULA'
      + ' OBSERVATION TOWER in Tampere, Finland, filling the frame in'
      + ' close-up: a slender vertical concrete shaft rising from the'
      + ' bottom of the picture, widening near the top into a broad round'
      + ' two-level pod — a glazed revolving restaurant ring above an'
      + ' open observation gallery, both wrapped in continuous bands of'
      + ' window glass with a narrow walkway and railing around them —'
      + ' and above the pod a thin tapering antenna mast continuing far'
      + ' up into the sky. The concrete is pale grey and weathered, the'
      + ' glass reflects the sky, and the whole structure is sharply lit'
      + ' by afternoon sun from one side. Camera close to the tower and'
      + ' tilted UPWARD, so the pod is large and dominant against open'
      + ' sky. Far below and much smaller, out of focus: the lake shore,'
      + ' the low roofs and green trees of the city and the open water of'
      + ' Lake Näsijärvi. Professional full-frame photograph, long lens,'
      + ' natural colours, crisp detail, realistic atmosphere, no'
      + ' stylization. Absolutely no text, no watermark, no borders.',
    selite: 'Pekka Ilveskosken suunnittelema Näsinneula valmistui 1971 ja on '
      + '168 metrillään Suomen korkein vapaasti seisova rakennelma; sen '
      + 'pyörivä ravintola on 124 metrin korkeudessa.',
  },
];
