/*
 * FOKUSVIRTOJEN REKISTERI — kevyt taulu kaupunki-id → annostelusisältö.
 *
 * Avain on KAUPUNGIN tunnus ilman laudan tunnusta, samoin kuin
 * julisteilla ja kohtaamisilla (js/packs/kohtaamiset.js): Ateena on
 * sama kaupunki kummalla tahansa laudalla, ja sen esittelyvirtakin on
 * sama. Kaupunki, jolla ei ole riviä, ei saa mitään uutta — fokusmoodi
 * käyttäytyy siellä täsmälleen kuten ennenkin.
 *
 * Pilotti on Ateena (Raamatun osio "Fokusmoodi": PILOTTI). Rekisteri on
 * oma tiedostonsa, jotta seuraavan kaupungin lisääminen on yhden rivin
 * työ eikä koske moottoriin (js/fokusvirta.js) lainkaan.
 *
 * Sofia on toinen kaupunki (omistajan lupa 25.8.2026) ja todistaa sen:
 * uusi kaupunki oli yksi tuonti ja yksi rivi tähän tauluun. Sofia on
 * Ateenasta yksi askel jalan pelin maantieteessä.
 */
import { FOKUSVIRTA_ALPIT } from './fokusvirta-alpit.js';
import { FOKUSVIRTA_ATEENA } from './fokusvirta-ateena.js';
import { FOKUSVIRTA_BERLIINI } from './fokusvirta-berliini.js';
import { FOKUSVIRTA_BUDAPEST } from './fokusvirta-budapest.js';
import { FOKUSVIRTA_DUBROVNIK } from './fokusvirta-dubrovnik.js';
import { FOKUSVIRTA_ISTANBUL } from './fokusvirta-istanbul.js';
import { FOKUSVIRTA_BUKAREST } from './fokusvirta-bukarest.js';
import { FOKUSVIRTA_HELSINKI } from './fokusvirta-helsinki.js';
import { FOKUSVIRTA_KOBENHAVN } from './fokusvirta-kobenhavn.js';
import { FOKUSVIRTA_LONTOO } from './fokusvirta-lontoo.js';
import { FOKUSVIRTA_MADRID } from './fokusvirta-madrid.js';
import { FOKUSVIRTA_PRAHA } from './fokusvirta-praha.js';
import { FOKUSVIRTA_PARIISI } from './fokusvirta-pariisi.js';
import { FOKUSVIRTA_ROOMA } from './fokusvirta-rooma.js';
import { FOKUSVIRTA_SARAJEVO } from './fokusvirta-sarajevo.js';
import { FOKUSVIRTA_SOFIA } from './fokusvirta-sofia.js';
import { FOKUSVIRTA_TALLINNA } from './fokusvirta-tallinna.js';
import { FOKUSVIRTA_TUKHOLMA } from './fokusvirta-tukholma.js';
import { FOKUSVIRTA_WIEN } from './fokusvirta-wien.js';
import { FOKUSVIRTA_SEVILLA } from './fokusvirta-sevilla.js';
import { FOKUSVIRTA_BERGEN } from './fokusvirta-bergen.js';
import { FOKUSVIRTA_AMSTERDAM } from './fokusvirta-amsterdam.js';
import { FOKUSVIRTA_DUBLIN } from './fokusvirta-dublin.js';
import { FOKUSVIRTA_EDINBURGH } from './fokusvirta-edinburgh.js';
import { FOKUSVIRTA_LISSABON } from './fokusvirta-lissabon.js';
import { FOKUSVIRTA_RIIKA } from './fokusvirta-riika.js';
import { FOKUSVIRTA_BARCELONA } from './fokusvirta-barcelona.js';
import { FOKUSVIRTA_FIRENZE } from './fokusvirta-firenze.js';
import { FOKUSVIRTA_VENETSIA } from './fokusvirta-venetsia.js';
import { FOKUSVIRTA_MARSEILLE } from './fokusvirta-marseille.js';
import { FOKUSVIRTA_OSLO } from './fokusvirta-oslo.js';
import { FOKUSVIRTA_TAMPERE } from './fokusvirta-tampere.js';
import { FOKUSVIRTA_VILNA } from './fokusvirta-vilna.js';
import { FOKUSVIRTA_GRANADA } from './fokusvirta-granada.js';
import { FOKUSVIRTA_KIOVA } from './fokusvirta-kiova.js';
import { FOKUSVIRTA_KRAKOVA } from './fokusvirta-krakova.js';
import { FOKUSVIRTA_MOSKOVA } from './fokusvirta-moskova.js';
import { FOKUSVIRTA_ODESSA } from './fokusvirta-odessa.js';
import { FOKUSVIRTA_PIETARI } from './fokusvirta-pietari.js';
import { FOKUSVIRTA_VARSOVA } from './fokusvirta-varsova.js';
import { FOKUSVIRTA_ISLANTI } from './fokusvirta-islanti.js';
import { FOKUSVIRTA_KREETA } from './fokusvirta-kreeta.js';
import { FOKUSVIRTA_LAPPI } from './fokusvirta-lappi.js';
import { FOKUSVIRTA_SISILIA } from './fokusvirta-sisilia.js';
import { FOKUSVIRTA_TROMSSA } from './fokusvirta-tromssa.js';

/**
 * KEVYET PAKIT — vain matkakirja ja pulun kupla (omistaja 8.9.2026).
 *
 * Nämä kuusi kohdetta olivat Euroopan viimeiset, joiden merkintä
 * luettiin vanhasta saapumistaulusta (js/packs/europe-saapumiset.js,
 * arkistoitu docs/arkisto/europe-saapumiset-2026-09-08.js.txt).
 * Omistajan linjaus 8.9.2026 (Raamattu: KOKO EUROOPPA KULKEE
 * FOKUSVIRTAPAKKIEN KAUTTA) siirsi ne fokusvirtapakkeihin, mutta VAIN
 * siltä osin kuin peli lukee: kortit ovat pois käytöstä
 * (js/fokusvirta.js FOKUSVIRTA_KORTIT === false), joten täkyjä,
 * oppituntia, kohtaamista ja lehtitehtäviä ei ole kirjoitettu.
 *
 * MIKSI JOUKKO ON NIMETTY EIKÄ PÄÄTELTY. Testit vaativat täydeltä
 * pakilta neljä kuvaa, aarrevaiheen ja kolme täkyä
 * (tests/fokusvirta.test.mjs). Jos kevyt pakki tunnistettaisiin siitä,
 * että kentät puuttuvat, sama sääntö vaientaisi vartion myös silloin
 * kun kentät katoavat TÄYDESTÄ pakista vahingossa. Nimetty joukko
 * pitää poikkeuksen luettelona: uusi kevyt pakki on yksi rivi tässä,
 * ja täyden pakin rapautuminen kaataa testin kuten ennenkin.
 */
export const KEVYET_FOKUSVIRRAT = new Set([
  'alpit', 'islanti', 'kreeta', 'lappi', 'sisilia', 'tromssa',
]);

export const FOKUSVIRRAT = {
  ateena: FOKUSVIRTA_ATEENA,
  sofia: FOKUSVIRTA_SOFIA,
  istanbul: FOKUSVIRTA_ISTANBUL,
  rooma: FOKUSVIRTA_ROOMA,
  bukarest: FOKUSVIRTA_BUKAREST,
  sarajevo: FOKUSVIRTA_SARAJEVO,
  /*
   * EUROOPPA KAUTTAALTAAN VALMIIKSI, AALTO 1 (Raamattu, osio
   * "Fokusmoodi", omistaja 28.8.2026 ilta): Madrid, Wien, Pariisi ja
   * Berliini nostettiin vanhasta mallista fokusvirtamalliin. Kaikki
   * neljä ovat maansa aarrekaupunkeja, joten ne saavat Raamatun
   * syvyysportaikon TÄYDEN pinon — matkakirja, Livia, herokuva, kolme
   * täkyä, oppitunti, kohtaaminen ja lehtitehtävät.
   */
  madrid: FOKUSVIRTA_MADRID,
  wien: FOKUSVIRTA_WIEN,
  pariisi: FOKUSVIRTA_PARIISI,
  berliini: FOKUSVIRTA_BERLIINI,
  /*
   * AALTO 2 (sama Raamatun osio, 29.8.2026): Lontoo, Budapest,
   * Dubrovnik ja Praha. Nämäkin ovat maansa aarrekaupunkeja ja saavat
   * saman TÄYDEN pinon.
   *
   * AALTO 2 EROAA AALLOSTA 1 YHDESSÄ ASIASSA: näille neljälle maalle
   * ei ollut takynostot-työaineistoa, joten täyt, oppitunnit,
   * lehtitehtävät ja maakohtaiset täkynostot on rakennettu pelin omasta
   * kuratoidusta aineistosta ja siihen erikseen tarkistetuista
   * lisätiedoista. Perustelut ja lähteet ovat kunkin paketin omissa
   * kommenteissa.
   */
  lontoo: FOKUSVIRTA_LONTOO,
  budapest: FOKUSVIRTA_BUDAPEST,
  dubrovnik: FOKUSVIRTA_DUBROVNIK,
  praha: FOKUSVIRTA_PRAHA,
  /*
   * AALTO 3 (sama Raamatun osio, 29.8.2026): Pohjola ja Baltia —
   * Tukholma, Kööpenhamina, Helsinki ja Tallinna. Sama TÄYSI pino ja
   * sama faktapohja kuin aallolla 2 (kuratoitu pelidata + kahden
   * riippumattoman lähteen tarkistus).
   *
   * TUKHOLMA POIKKEAA YHDESSÄ ASIASSA: se pilotoi PÖLLÖN SÄHKETEHTÄVÄN
   * kohtaamisen sijasta (Raamattu, PÖLLÖN SÄHKETEHTÄVÄ). Rekisteri ei
   * huomaa siitä mitään — valinta on datassa (`sahketehtava` kentän
   * `kohtaaminen` tilalla), ei täällä.
   */
  tukholma: FOKUSVIRTA_TUKHOLMA,
  kobenhavn: FOKUSVIRTA_KOBENHAVN,
  helsinki: FOKUSVIRTA_HELSINKI,
  tallinna: FOKUSVIRTA_TALLINNA,
  /*
   * AALTO 4A (sama Raamatun osio, 29.8.2026): seitsemän kaupunkia,
   * jotka täydentävät Länsi- ja Pohjois-Euroopan rannikon — Sevilla,
   * Bergen, Amsterdam, Dublin, Edinburgh, Lissabon ja Riika. Sama
   * TÄYSI pino ja sama faktapohja kuin aalloilla 2 ja 3 (kuratoitu
   * pelidata + kahden riippumattoman lähteen tarkistus). Kunkin
   * paketin omat perustelut ja lähteet ovat sen omissa kommenteissa.
   *
   * SEVILLA JA EDINBURGH EIVÄT OLE MAANSA AARREKAUPUNKEJA (ne ovat
   * Madrid ja Lontoo), joten ne ovat ensimmäiset fokuskaupungit, jotka
   * syventävät maata jo avatun aarteen rinnalla. Rekisteri ei huomaa
   * siitäkään mitään — ero on paketin sisällössä, ei täällä.
   *
   * LIVIAN MAADOITUS on tässä aallossa jaettu Fablen kaanontekstistä
   * virkkeen rajaa pitkin kenttiin `maadoitus` ja `teksti` niissä
   * paketeissa, joissa kaanoni antaa yhden puheenvuoron (Dublin,
   * Lissabon, Riika; Edinburgh teki jaon jo omalla haarallaan).
   * Yhtäkään Livian sanaa ei ole kirjoitettu lisää.
   */
  sevilla: FOKUSVIRTA_SEVILLA,
  bergen: FOKUSVIRTA_BERGEN,
  amsterdam: FOKUSVIRTA_AMSTERDAM,
  dublin: FOKUSVIRTA_DUBLIN,
  edinburgh: FOKUSVIRTA_EDINBURGH,
  lissabon: FOKUSVIRTA_LISSABON,
  riika: FOKUSVIRTA_RIIKA,
  /*
   * AALTO 4B (sama Raamatun osio, 29.8.2026): seitsemän kaupunkia
   * Välimereltä, Pohjolasta ja Baltiasta — Barcelona, Firenze,
   * Venetsia, Marseille, Oslo, Tampere ja Vilna. Sama TÄYSI pino ja
   * sama faktapohja kuin aalloilla 2–4A (kuratoitu pelidata + kahden
   * riippumattoman lähteen tarkistus); perustelut ja lähteet ovat
   * kunkin paketin omissa kommenteissa.
   *
   * VILNA AVAA UUDEN MAAN. Liettua (LTU) ei ollut ennen tätä aaltoa
   * yhdenkään fokuskaupungin maa, joten Vilnan paketti tuo mukanaan
   * oman `takynostot`-poolinsa ja LTU on lisätty js/fokusnosto.js:n
   * NOSTO_MAAT-tauluun. Kuusi muuta kaupunkia nojaavat maansa jo
   * olemassa olevaan pooliin (ESP, ITA, FRA, NOR, FIN).
   *
   * OSLO, FIRENZE, VENETSIA, BARCELONA, MARSEILLE JA TAMPERE EIVÄT OLE
   * MAANSA AARREKAUPUNKEJA (ne ovat Bergen, Rooma, Madrid, Pariisi ja
   * Helsinki), eli aallon 4A tapaan ne syventävät maata jo avatun
   * aarteen rinnalla. Rekisteri ei huomaa siitä mitään.
   *
   * LIVIAN MAADOITUS on tässä aallossa jaettu Fablen kaanontekstistä
   * virkkeen rajaa pitkin kenttiin `maadoitus` ja `teksti` niissä
   * paketeissa, joissa kaanoni antaa yhden puheenvuoron (Barcelona ja
   * Vilna); muissa maadoitus on paketin omaa Livia-tekstiä kaanonin
   * edellä. Yhtäkään Livian sanaa ei ole kirjoitettu kaanoniin lisää.
   */
  barcelona: FOKUSVIRTA_BARCELONA,
  firenze: FOKUSVIRTA_FIRENZE,
  venetsia: FOKUSVIRTA_VENETSIA,
  marseille: FOKUSVIRTA_MARSEILLE,
  oslo: FOKUSVIRTA_OSLO,
  tampere: FOKUSVIRTA_TAMPERE,
  vilna: FOKUSVIRTA_VILNA,
  /*
   * AALTO 4C (sama Raamatun osio, 30.8.2026): EUROOPAN VIIMEISET
   * SEITSEMÄN FOKUSKAUPUNKIA — Granada, Kiova, Krakova, Moskova,
   * Odessa, Pietari ja Varsova. Tämän erän jälkeen manner on valmis:
   * 39 fokuskaupunkia. Sama TÄYSI pino ja sama faktapohja kuin
   * aalloilla 2–4B (kuratoitu pelidata + kahden riippumattoman lähteen
   * tarkistus); perustelut ja lähteet ovat kunkin paketin omissa
   * kommenteissa.
   *
   * KOLME UUTTA MAATA. Ukraina (UKR), Puola (POL) ja Venäjä (RUS)
   * eivät olleet ennen tätä aaltoa yhdenkään fokuskaupungin maita.
   * Kolme paketeista tuo mukanaan oman `takynostot`-poolinsa — Kiova
   * (UKR), Krakova (POL) ja Pietari (RUS) — ja kaikki kolme maata on
   * lisätty js/fokusnosto.js:n NOSTO_MAAT-tauluun, jotta nostot
   * näkyvät myös maan toisessa kaupungissa (Odessa, Varsova, Moskova).
   * Granada nojaa Espanjan jo olemassa olevaan pooliin (ESP).
   *
   * GRANADA, ODESSA, VARSOVA JA MOSKOVA EIVÄT OLE MAANSA
   * TÄKYNOSTOLÄHTEITÄ (ne ovat Madrid, Kiova, Krakova ja Pietari),
   * eli aaltojen 4A–4B tapaan ne syventävät maata toisen kaupungin
   * rinnalla. Rekisteri ei huomaa siitä mitään.
   *
   * FABLEN KAANONKORJAUKSET 30.8.2026 on ajettu sisään kolmeen
   * pakettiin: Granadan matkakirjan avaus ilman värisanaa, Krakovan
   * aarremerkintä kokonaan uutena (kokoelma evakossa Pariisissa,
   * mikä poistaa 1873/1876-törmäyksen) ja Varsovan Livia-repliikki
   * ilman säveltäjän nimeä ja ilman jälleenrakennuksen menetelmää.
   * Kussakin paketissa on kentän vieressä kommentti siitä, mikä
   * muuttui ja miksi.
   */
  granada: FOKUSVIRTA_GRANADA,
  kiova: FOKUSVIRTA_KIOVA,
  krakova: FOKUSVIRTA_KRAKOVA,
  moskova: FOKUSVIRTA_MOSKOVA,
  odessa: FOKUSVIRTA_ODESSA,
  pietari: FOKUSVIRTA_PIETARI,
  varsova: FOKUSVIRTA_VARSOVA,
  /*
   * KEVYT ERÄ (omistaja 8.9.2026, Raamattu: KOKO EUROOPPA KULKEE
   * FOKUSVIRTAPAKKIEN KAUTTA): Euroopan laudan kuusi viimeistä kohdetta
   * — Kreeta, Sisilia, Islanti, Alpit, Rovaniemi (tunnus `lappi`) ja
   * Tromssa. Näiden merkintä luettiin siihen asti vanhasta
   * saapumistaulusta, joka on nyt arkistoitu pois pelistä
   * (docs/arkisto/europe-saapumiset-2026-09-08.js.txt). Tämän erän
   * jälkeen JOKAISELLA Euroopan laudan kaupungilla on fokusvirtapakki —
   * vartiona tests/fokusvirta.test.mjs.
   *
   * PAKIT OVAT KEVYITÄ (KEVYET_FOKUSVIRRAT yllä): matkakirja ja pulun
   * kupla, ei täkyjä eikä kortteja. Rekisteri ei huomaa siitä mitään —
   * ero on paketin sisällössä, ei täällä.
   */
  kreeta: FOKUSVIRTA_KREETA,
  sisilia: FOKUSVIRTA_SISILIA,
  islanti: FOKUSVIRTA_ISLANTI,
  alpit: FOKUSVIRTA_ALPIT,
  lappi: FOKUSVIRTA_LAPPI,
  tromssa: FOKUSVIRTA_TROMSSA,
};

/** Kaupungin fokusvirta tai null, jos kaupungille ei ole sisältöä. */
export function fokusvirtaKaupungille(cityId) {
  return (cityId && FOKUSVIRRAT[cityId]) || null;
}

/**
 * KAUPUNGIT, JOILLA ON LUENTAKUVA (omistaja 9.9.2026 klo 12.20,
 * sanatarkasti: *"Kuvaputkelta tulee kohta kahdeksan kuvaa, joita
 * käytetään matkakirjan luennon kanssa yhtä aikaa. … Voisit nyt merkata
 * eri värillä sellaiset kaupungit, joissa tällaiset kuvat on."*).
 *
 * Joukko JOHDETAAN pakeista (matkakirja.luentakuva), ei ylläpidetä
 * käsin: kartan merkintä seuraa dataa eikä lupaa kuvaa, jota ei ole.
 * Kartta (js/pallolauta/lauta.js kaupunkipisteenVari, js/ui.js
 * luentakuvakehä) värjää nämä pisteet omalla värillään.
 *
 * @returns {Set<string>} kaupunkien tunnukset
 */
export function luentakuvallisetKaupungit() {
  const joukko = new Set();
  for (const [id, virta] of Object.entries(FOKUSVIRRAT)) {
    if (virta?.matkakirja?.luentakuva) joukko.add(id);
  }
  return joukko;
}
