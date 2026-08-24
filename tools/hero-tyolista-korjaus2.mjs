/*
 * Herokuvien KORJAUSERÄ 2: silmätarkistuksen erän 2 VÄÄRÄ-tuomiot.
 *
 * Lähde: docs/mantereet-tyoaineisto/herokuvien-silmatarkistus-2.md.
 * Erässä katsottiin 21 kuvaa 57:ää aitoa Commons-valokuvaa vasten:
 * 17 OK, 2 EPÄILYTTÄVÄÄ, 2 VÄÄRÄÄ. Vain nämä kaksi tehdään uusiksi
 * (omistajan kustannuskuri: vain pahimmat).
 *
 * KATEGORIAT ETSITTY KÄSIN, koska putki ei tunnistanut kohteita:
 *  - Category:Jabal al-Nour        18 kelvollista kuvaa
 *  - Category:Palace Tomb (Petra)  49 kelvollista kuvaa
 * Arvattavat nimet eivät toimineet: Category:Hira,
 * Category:Royal Tombs (Petra) ja Category:Royal tombs in Petra ovat
 * kaikki tyhjiä tai olemattomia. Sama sudenkuoppa kuin Oodilla.
 */
import { VAKIO, prompti } from './hero-kuvakulmat.mjs';

export const TYOLISTA = [
  /*
   * ---- MEKKA: Jabal al-Nour. Tarkistuksen vakavin löydös.
   *
   * Vanhassa kuvassa oli kaksi vikaa: vuori oli terävä kartio (aito on
   * leveä kumpare) ja sen laelle oli KEKSITTY valkoinen kupolipyhäkkö,
   * jota siellä ei ole. Keksitty rakennus islamin pyhimmällä alueella
   * on asiavirheen lisäksi kunnioituskysymys, ja siksi tämä on erän
   * ensimmäinen.
   *
   * Promptissa sanotaan ERIKSEEN, ettei laella ole rakennusta. Malli
   * täyttää tyhjän huipun mielellään jollakin, joten kielto on
   * kirjoitettava auki eikä vain jätettävä mainitsematta.
   */
  {
    id: 'mekka-ilta',
    tiedosto: 'hero-mekka-ilta.png',
    kaupunki: 'Mekka',
    tarkkaKohde: true,
    kategoria: 'Category:Jabal al-Nour',
    viitehaku: 'Jabal al-Nour',
    viitesuosi: ['jabal', 'nour', 'mountain', 'hira'],
    prompti: prompti(
      'the mountain Jabal al-Nour outside Mecca in the late afternoon',
      'a BROAD, ROUNDED, HUMPED mountain of bare grey-brown rock —'
      + ' emphatically not a sharp peak and not a cone — its slopes'
      + ' covered in loose boulders and scree, a thin pale footpath'
      + ' zigzagging up the flank in long switchbacks toward the'
      + ' summit; THE SUMMIT IS BARE ROCK WITH NO BUILDING, NO DOME,'
      + ' NO SHRINE AND NO WHITE STRUCTURE OF ANY KIND ON IT, only'
      + ' weathered stone against the sky',
      'the dry rocky valley at the foot of the mountain, a road and'
      + ' scattered low buildings at a distance, and the haze of the'
      + ' city further off under a warm late sun',
      VAKIO,
    ),
    selite: null, // säilyy ennallaan js/packs/kulttuuri-kategoriat.js:ssä
  },

  /*
   * ---- PETRA: Kuningashautojen rivistö.
   *
   * Vanhassa kuvassa oli neljä lähes identtistä Ad-Deirin kopiota
   * eikä yhtään aitoa kuningashautaa; tunnistettavin, kolmikerroksinen
   * Palatsihauta, puuttui kokonaan. Sama vikamekanismi kuin
   * Kašgarissa: arkkityyppi täytti aukon.
   *
   * Viitekategoria on Palatsihaudan oma, ja se on tässä oikea valinta
   * myös rivistölle: kategoriassa on kuvia, joissa Palatsihauta ja
   * Korinttilainen hauta näkyvät vierekkäin samassa jyrkänteessä.
   */
  {
    id: 'petra-ilta',
    tiedosto: 'hero-petra-ilta.png',
    kaupunki: 'Petra',
    tarkkaKohde: true,
    kategoria: 'Category:Palace Tomb (Petra)',
    viitehaku: 'Palace Tomb Petra',
    viitesuosi: ['palace', 'tomb', 'royal', 'corinthian'],
    prompti: prompti(
      'the row of Royal Tombs carved into the western cliff face at'
      + ' Petra in late afternoon light',
      'several DIFFERENT and clearly distinct monumental tomb facades'
      + ' cut side by side directly into one continuous wall of rose'
      + ' and ochre sandstone, their carved fronts flush with the rock'
      + ' and their interiors dark; the largest and most prominent is a'
      + ' very wide facade of THREE STACKED STOREYS of columns, its'
      + ' upper rows partly eroded, standing beside a narrower and more'
      + ' ruined facade and a further tomb with a rounded urn above its'
      + ' pediment; the horizontal bands of colour in the sandstone run'
      + ' straight through carving and cliff alike',
      'the rubble slope and dusty path running along the foot of the'
      + ' cliff with a few visitors as small distant figures for scale,'
      + ' and the dry valley of Petra opening out beyond',
      VAKIO,
    ),
    selite: null, // säilyy ennallaan
  },
];
