/*
 * Sisältötaulut: lautojen yhdistetyt sisällöt, luentajoukot ja käsin
 * kuratoidut galleriat yhdessä paikassa. Siirretty sanatarkasti
 * js/ui.js:stä 17.8.2026 (moduuliremontin M1,
 * docs/moduulirakenne-suunnitelma.md) — pelkkää dataa ja puhtaita
 * hakufunktioita, ei DOM- eikä pelitilariippuvuuksia.
 */

import { AFRICA_SAAPUMISET } from './packs/africa-saapumiset.js';
import { EUROPE_SAAPUMISET } from './packs/europe-saapumiset.js';
import { ASIA_SAAPUMISET } from './packs/asia-saapumiset.js';
import { NORTHAMERICA_SAAPUMISET } from './packs/northamerica-saapumiset.js';
import { SOUTHAMERICA_SAAPUMISET } from './packs/southamerica-saapumiset.js';
import { OCEANIA_SAAPUMISET } from './packs/oceania-saapumiset.js';
import { AFRICA_KULTTUURI } from './packs/africa-kulttuuri.js';
import { EUROPE_KULTTUURI } from './packs/europe-kulttuuri.js';
import { AFRICA_VALOKUVAT } from './packs/africa-valokuvat.js';
import { EUROPE_VALOKUVAT } from './packs/europe-valokuvat.js';
import { ASIA_VALOKUVAT } from './packs/asia-valokuvat.js';
import { ASIA_LISAT_VALOKUVAT } from './packs/asia-lisat-valokuvat.js';
import { NORTHAMERICA_VALOKUVAT } from './packs/northamerica-valokuvat.js';
import { SOUTHAMERICA_VALOKUVAT } from './packs/southamerica-valokuvat.js';
import { OCEANIA_VALOKUVAT } from './packs/oceania-valokuvat.js';
import { AFRICA_MAATIEDOT } from './packs/africa-maatiedot.js';
import { EUROPE_MAATIEDOT } from './packs/europe-maatiedot.js';
import { ASIA_MAATIEDOT } from './packs/asia-maatiedot.js';
import { EUROPE_KIELET } from './packs/europe-kielet.js';
import { OMAT_ARTIKKELIT } from './packs/africa-artikkelit.js';
import { EUROPE_ARTIKKELIT } from './packs/europe-artikkelit.js';
import { ASIA_ARTIKKELIT } from './packs/asia-artikkelit.js';
import { NORTHAMERICA_ARTIKKELIT } from './packs/northamerica-artikkelit.js';
import { SOUTHAMERICA_ARTIKKELIT } from './packs/southamerica-artikkelit.js';
import { OCEANIA_ARTIKKELIT } from './packs/oceania-artikkelit.js';

// Uuden mallin saapumistekstit laudoittain (Afrikka valmis, Eurooppa
// rakentuu kaupunki kerrallaan — pilotti: Venetsia).
/*
 * Sisältötaulut laudoittain.
 *
 * VANHA MAAILMA PERII NELJÄN LAUDAN SISÄLLÖN. Yhdistetty lauta on
 * kokoelma samoja kaupunkeja, ja sen kaupunkitunnukset ovat samat kuin
 * lähdelaudoilla. Ilman näitä rivejä Tutki-ikkuna jäi vajaaksi:
 * kaupungin kuva ja tiivistelmä näkyivät, mutta maan palsta, kaupungin
 * elämää -osio, vanha valokuva ja kielinäyte jäivät piiloon, koska ne
 * haetaan laudan tunnuksella eikä yhdistetylle laudalle ollut mitään.
 * Omistajan havainto: "iPadilla tutki ikkuna on vajaa" — ja sama
 * iPhonella, eli kyse ei ollut ruudun koosta lainkaan.
 *
 * Yhdistäminen on turvallista, koska avaimet ovat kaupunkitunnuksia ja
 * porttikaupungit (Istanbul, Kairo, Teheran) ovat yhdistetyllä laudalla
 * yksi kappale kukin.
 */
/*
 * YHDISTETYT LAUDAT PERIVÄT LÄHDELAUTOJEN SISÄLLÖN.
 *
 * Yhdistelmät nimetään kerran ja jaetaan kaikille yhdistetyille
 * laudoille. Aiemmin sama objekti kirjoitettiin joka tauluun erikseen,
 * ja kun maailmankartta lisättiin, se jäi jokaisesta pois — uudella
 * laudalla Tutki-ikkunassa olisi näkynyt vain Wikipedian tiivistelmä,
 * ei matkakirjan merkintää, kulttuurinostoja, vanhaa valokuvaa,
 * kielinäytettä eikä maan tunnuslukuja.
 *
 * Tämä ansa on lauennut tässä projektissa jo kolmesti. Se on hiljainen:
 * mikään ei kaadu, mitään ei näy lokissa, sisältö vain puuttuu.
 * Nimetty yhdistelmä ei estä ansaa mutta tekee siitä yhden rivin
 * kokoisen: uusi lauta lisätään yhteen paikkaan taulua kohti.
 */
const KAIKKI_SAAPUMISET = {
  ...AFRICA_SAAPUMISET, ...EUROPE_SAAPUMISET, ...ASIA_SAAPUMISET,
  ...NORTHAMERICA_SAAPUMISET, ...SOUTHAMERICA_SAAPUMISET, ...OCEANIA_SAAPUMISET,
};
const KAIKKI_KULTTUURI = { ...AFRICA_KULTTUURI, ...EUROPE_KULTTUURI };
/*
 * Kohteet, joita ei kysytä valokuvakysymyksessä.
 *
 * Kysymys on "Mikä paikka valokuvassa on?", joten kuvan on esitettävä
 * paikkaa. Näiltä neljältä ei löydy Commonsista yhtään vapaasti
 * lisensoitua paikkakuvaa, joka täyttäisi vaatimuksen:
 *
 *   rashafun, sanambrosio  Asumattomia ja käytännössä saavuttamattomia.
 *                          Kaikki riittävän suuret tiedostot ovat
 *                          satelliittikuvia tai karttoja, ja
 *                          satelliittikuva näyttää lapsen silmin
 *                          kartalta, ei valokuvalta paikasta.
 *   alkufra, bahrelghazal  Kelvolliset paikkakuvat ovat vuosilta 1930
 *                          ja 1958. Ne kelpaisivat kysymykseen, mutta
 *                          uusi-kenttä on postikortin NYKYPUOLI, ja
 *                          vanha vedos siinä rikkoisi ennen–nyt-parin.
 *                          Kohteiden omat kuvat jäävät siis ennalleen,
 *                          ja ne vain jäävät pois kysymyksestä.
 *
 * Postikortit ja kuvapinot käyttävät näiden kohteiden kuvia yhä —
 * rajaus koskee vain valokuvakysymystä.
 */
export const EI_VALOKUVAKYSYMYKSEEN = new Set([
  'rashafun', 'sanambrosio', 'alkufra', 'bahrelghazal',
]);

export const KAIKKI_VALOKUVAT = {
  ...AFRICA_VALOKUVAT, ...EUROPE_VALOKUVAT, ...ASIA_VALOKUVAT, ...ASIA_LISAT_VALOKUVAT,
  ...NORTHAMERICA_VALOKUVAT, ...SOUTHAMERICA_VALOKUVAT, ...OCEANIA_VALOKUVAT,
};
const KAIKKI_MAATIEDOT = { ...AFRICA_MAATIEDOT, ...EUROPE_MAATIEDOT, ...ASIA_MAATIEDOT };

/*
 * HUOM: avain puuttuvalta laudalta ei kaada mitään — sisältö vain
 * katoaa hiljaa. Siksi myös avauslauta maailma on joka taulussa,
 * vaikka se tänään tarvitsee tauluista vain vähän: yhden laudan
 * pelissä (v529) matka alkaa maailma-laudan lennolla ja jatkuu
 * maailmankartalla, ja puuttuva avain jäisi huomaamatta kunnes
 * jokin sisältö vain "ei näy".
 */
export const SAAPUMISTEKSTIT = {
  africa: AFRICA_SAAPUMISET,
  europe: EUROPE_SAAPUMISET,
  // Aasian teksteillä ei ole omaa lautaa: kaupungit ovat vain
  // yhdistetyillä laudoilla, joten ne tulevat mukaan vain tänne.
  maailmankartta: KAIKKI_SAAPUMISET,
  maailma: KAIKKI_SAAPUMISET,
};

// Kaupungin elämää -nostot laudoittain.
export const KULTTUURIT = {
  africa: AFRICA_KULTTUURI,
  europe: EUROPE_KULTTUURI,
  maailmankartta: KAIKKI_KULTTUURI,
  maailma: KAIKKI_KULTTUURI,
};

// Vanhat valokuvat muistikirjan kylkeen laudoittain.
export const VALOKUVAT = {
  africa: AFRICA_VALOKUVAT,
  europe: EUROPE_VALOKUVAT,
  maailmankartta: KAIKKI_VALOKUVAT,
  maailma: KAIKKI_VALOKUVAT,
};
// Kaupungissa nauhoitettu puhenäyte: kieli kuuluviin omasta napistaan.
export const KIELET = {
  europe: EUROPE_KIELET,
  maailmankartta: EUROPE_KIELET,
  maailma: EUROPE_KIELET,
};

// Maiden tunnusluvut laudoittain.
export const MAATIEDOT = {
  africa: AFRICA_MAATIEDOT,
  europe: EUROPE_MAATIEDOT,
  maailmankartta: KAIKKI_MAATIEDOT,
  maailma: KAIKKI_MAATIEDOT,
};

// Omat artikkelit: yhteinen hakemisto wiki-otsikolla (mantereet eivät
// törmää, koska otsikot ovat eri). P-Amerikan taulu tuli mukaan
// 23.8.2026 New Yorkin kaupunkilehden myötä, ja E-Amerikan ja Oseanian
// taulut samana päivänä Rio de Janeiron ja Sydneyn myötä
// (spec-mantereet.md).
export const ARTIKKELIT = {
  ...OMAT_ARTIKKELIT, ...EUROPE_ARTIKKELIT, ...ASIA_ARTIKKELIT,
  ...NORTHAMERICA_ARTIKKELIT, ...SOUTHAMERICA_ARTIKKELIT,
  ...OCEANIA_ARTIKKELIT,
};

// Saapumishavaintojen luennat: 'pakka:kaupunki' kertoo, että tiedosto
// assets/audio/puhe-<pakka>-havainto-<kaupunki>.mp3 on olemassa
// (ElevenLabs, Viisas Kertoja). Kortin kaiutin ja luenta näkyvät vain
// näille — muut kaupungit saavat tekstinsä ilman ääntä, kunnes niiden
// luennat generoidaan.
/*
 * Saapumismerkintöjen luennat: 'pakka:kaupunki' kertoo, että tiedosto
 * assets/audio/puhe-<pakka>-saapuminen-<kaupunki>.mp3 on olemassa.
 * Kortin kaiutin ja luenta näkyvät vain näille; muut kaupungit saavat
 * merkintänsä ilman ääntä, kunnes luennat generoidaan.
 */
/*
 * Luentojen laudat.
 *
 * Luennat on avainnettu `lauta:kaupunki`, ja tiedoston nimessä on sama
 * laudan tunnus. Yhdistetyllä laudalla tunnus on `maailmankartta`, jolle
 * ei ole yhtään luentaa — eikä tulekaan, koska ne ovat samat kaupungit
 * ja samat nauhoitukset. Ilman tätä kaiutinnappi katosi kortista ja
 * matkakertoja vaikeni koko laudalla (omistajan havainto: "matkakirjan
 * lukija ääni puuttuu kaikkialta, myös äänen symboli puuttuu").
 *
 * Haku käy lähdelaudat läpi ja palauttaa sen, jolta luenta löytyy.
 * Palautettua tunnusta käytetään myös tiedoston nimessä.
 */
const LUENTA_LAUDAT = ['europe', 'africa', 'middleeast', 'asia',
  'northamerica', 'southamerica', 'oceania'];

export function luentaLauta(joukko, packId, cityId) {
  if (!cityId) return null;
  if (joukko.has(`${packId}:${cityId}`)) return packId;
  if (packId !== 'maailmankartta') return null;
  for (const lauta of LUENTA_LAUDAT) {
    if (joukko.has(`${lauta}:${cityId}`)) return lauta;
  }
  return null;
}

export const SAAPUMISLUENNAT = new Set([
  'africa:addisabeba',
  'africa:ahaggar',
  'africa:alkufra',
  'africa:angola',
  'africa:bahrelghazal',
  'africa:dakar',
  'africa:darfur',
  'africa:gao',
  'africa:kairo',
  'africa:kamerun',
  'africa:kano',
  'africa:kapkaupunki',
  'africa:kappalmas',
  'africa:karthago',
  'africa:kilimandzaro',
  'africa:kimberley',
  'africa:kongo',
  'africa:kumasi',
  'africa:lagos',
  'africa:madagaskar',
  'africa:marrakech',
  'africa:mosambik',
  'africa:murzuk',
  'africa:nairobi',
  'africa:namib',
  'africa:orjarannikko',
  'africa:rashafun',
  'africa:sahara',
  'africa:sansibar',
  'africa:sierraleone',
  'africa:sthelena',
  'africa:suakin',
  'africa:tanganjika',
  'africa:tanger',
  'africa:timbuktu',
  'africa:tripoli',
  'africa:tshadjarvi',
  'africa:viktoria',
  'africa:viktorianputoukset',
  'europe:alpit',
  'europe:amsterdam',
  'europe:ateena',
  'europe:barcelona',
  'europe:berliini',
  'europe:budapest',
  'europe:bukarest',
  'europe:dublin',
  'europe:dubrovnik',
  'europe:edinburgh',
  'europe:granada',
  'europe:helsinki',
  'europe:islanti',
  'europe:istanbul',
  'europe:kiova',
  'europe:kobenhavn',
  'europe:krakova',
  'europe:kreeta',
  'europe:lappi',
  'europe:lissabon',
  'europe:lontoo',
  'europe:madrid',
  'europe:marseille',
  'europe:moskova',
  'europe:odessa',
  'europe:oslo',
  'europe:pariisi',
  'europe:pietari',
  'europe:praha',
  'europe:riika',
  'europe:rooma',
  'europe:sarajevo',
  'europe:sisilia',
  'europe:sofia',
  'europe:tallinna',
  'europe:tromssa',
  'europe:tukholma',
  'europe:varsova',
  'europe:venetsia',
  'europe:vilna',
  'europe:wien',
  'middleeast:aden',
  'middleeast:ankara',
  'middleeast:bagdad',
  'middleeast:damaskos',
  'middleeast:doha',
  'middleeast:dubai',
  'middleeast:halab',
  'middleeast:isfahan',
  'middleeast:izmir',
  'middleeast:jerusalem',
  'middleeast:kapadokia',
  'middleeast:kuwait',
  'middleeast:luxor',
  'middleeast:masqat',
  'middleeast:medina',
  'middleeast:mekka',
  'middleeast:mosul',
  'middleeast:nikosia',
  'middleeast:persepolis',
  'middleeast:petra',
  'middleeast:riad',
  'middleeast:rubalkhali',
  'middleeast:salalah',
  'middleeast:sana',
  'middleeast:siinai',
  'middleeast:tabriz',
  'middleeast:teheran',
  'asia:astana',
  'asia:bangkok',
  'asia:borneo',
  'asia:chennai',
  'asia:colombo',
  'asia:delhi',
  'asia:hanoi',
  'asia:hongkong',
  'asia:irkutsk',
  'asia:jakarta',
  'asia:jakutsk',
  'asia:jekaterinburg',
  'asia:kabul',
  'asia:kamtsatka',
  'asia:karachi',
  'asia:kashgar',
  'asia:kathmandu',
  'asia:kolkata',
  'asia:lhasa',
  'asia:magadan',
  'asia:manila',
  'asia:mumbai',
  'asia:novosibirsk',
  'asia:peking',
  'asia:sahalin',
  'asia:samarkand',
  'asia:shanghai',
  'asia:singapore',
  'asia:soul',
  'asia:sumatra',
  'asia:taipei',
  'asia:tokio',
  'asia:ulanbator',
  'asia:vladivostok',
  'asia:xian',
  'asia:yangon',
  'northamerica:anchorage',
  'northamerica:appalakit',
  'northamerica:bermuda',
  'northamerica:chicago',
  'northamerica:churchill',
  'northamerica:denver',
  'northamerica:grandcanyon',
  'northamerica:guatemala',
  'northamerica:halifax',
  'northamerica:havanna',
  'northamerica:hawaii',
  'northamerica:houston',
  'northamerica:iqaluit',
  'northamerica:labrador',
  'northamerica:losangeles',
  'northamerica:managua',
  'northamerica:merida',
  'northamerica:mexico',
  'northamerica:miami',
  'northamerica:monterrey',
  'northamerica:montreal',
  'northamerica:mountrushmore',
  'northamerica:neworleans',
  'northamerica:newyork',
  'northamerica:nome',
  'northamerica:nuuk',
  'northamerica:panama',
  'northamerica:sanfrancisco',
  'northamerica:sanjuan',
  'northamerica:santafe',
  'northamerica:stjohns',
  'northamerica:toronto',
  'northamerica:vancouver',
  'northamerica:whitehorse',
  'northamerica:winnipeg',
  'northamerica:yellowknife',
  'northamerica:yellowstone',
  'southamerica:antofagasta',
  'southamerica:asuncion',
  'southamerica:bananal',
  'southamerica:boavista',
  'southamerica:bogota',
  'southamerica:buenosaires',
  'southamerica:campogrande',
  'southamerica:caphorn',
  'southamerica:caracas',
  'southamerica:cayenne',
  'southamerica:falkland',
  'southamerica:galapagos',
  'southamerica:iguazu',
  'southamerica:iquitos',
  'southamerica:joaopessoa',
  'southamerica:lima',
  'southamerica:macapa',
  'southamerica:machupicchu',
  'southamerica:manaus',
  'southamerica:montevideo',
  'southamerica:portoalegre',
  'southamerica:portovelho',
  'southamerica:puertomontt',
  'southamerica:puntaarenas',
  'southamerica:quito',
  'southamerica:rio',
  'southamerica:robinsoncrusoe',
  'southamerica:salta',
  'southamerica:salvador',
  'southamerica:sanambrosio',
  'southamerica:santacruz',
  'southamerica:santarem',
  'southamerica:saoluis',
  'southamerica:saopaulo',
  'southamerica:titicaca',
  'southamerica:valparaiso',
  'oceania:adelaide',
  'oceania:alicesprings',
  'oceania:auckland',
  'oceania:bali',
  'oceania:birdsville',
  'oceania:brisbane',
  'oceania:broome',
  'oceania:cairns',
  'oceania:christchurch',
  'oceania:cooberpedy',
  'oceania:darwin',
  'oceania:dili',
  'oceania:exmouth',
  'oceania:geraldton',
  'oceania:hobart',
  'oceania:honiara',
  'oceania:kalgoorlie',
  'oceania:melbourne',
  'oceania:milfordsound',
  'oceania:mountisa',
  'oceania:norfolk',
  'oceania:noumea',
  'oceania:nullarbor',
  'oceania:perth',
  'oceania:portmoresby',
  'oceania:portvila',
  'oceania:sepik',
  'oceania:suva',
  'oceania:sydney',
  'oceania:townsville',
  'oceania:uluru',
  'oceania:wellington',
]);

export const HAVAINTOLUENNAT = new Set([
  'africa:tanger',
  'africa:kairo',
  'africa:tripoli',
  'africa:murzuk',
  'africa:alkufra',
  'africa:sahara',
  'africa:ahaggar',
  'africa:timbuktu',
  'africa:gao',
  'africa:dakar',
  'africa:sierraleone',
  'africa:kappalmas',
  'africa:kumasi',
  'africa:orjarannikko',
  'africa:kano',
  'africa:kamerun',
  'africa:kongo',
  'africa:angola',
  'africa:namib',
  'africa:kapkaupunki',
  'africa:kimberley',
  'africa:mosambik',
  'africa:madagaskar',
  'africa:sansibar',
  'africa:kilimandzaro',
  'africa:viktoria',
  'africa:tanganjika',
  'africa:bahrelghazal',
  'africa:darfur',
  'africa:suakin',
  'africa:addisabeba',
  'africa:rashafun',
]);

/*
 * Kohtaamiset, joille luennat on generoitu (tools/generoi-
 * kohtaamiset.mjs). Kaupunki-id:llä, ei laudalla: kohtaaminen on
 * sama laudasta riippumatta (KOHTAAMISET). Tiedostot
 * assets/audio/puhe-kohtaaminen-<id>-{tervehdys,loyto}.mp3.
 * Ilman tätä nappia vastaavaa vahtia soitettaisiin hiljaisuutta
 * kaupungeissa, joiden luentaa ei ole vielä tehty.
 */
export const KOHTAAMISLUENNAT = new Set([
  'lontoo',
]);

// Lautojen tunnusluvut karttaselitteeseen: pinta-ala ja väkiluku isoin
// pyöristyksin (omistajan toive — vähäeleinen, vain numerot ja symboli).
export const LAUTA_TUNNUSLUVUT = {
  maailma: { ala: '150 milj. km²', vaki: '8 mrd' },
  africa: { ala: '30 milj. km²', vaki: '1,5 mrd' },
  europe: { ala: '10 milj. km²', vaki: '750 milj.' },
  asia: { ala: '45 milj. km²', vaki: '4,8 mrd' },
  oceania: { ala: '8,5 milj. km²', vaki: '45 milj.' },
  northamerica: { ala: '24 milj. km²', vaki: '600 milj.' },
  southamerica: { ala: '18 milj. km²', vaki: '440 milj.' },
  middleeast: { ala: '7 milj. km²', vaki: '500 milj.' },
  suomi: { ala: '340 000 km²', vaki: '5,6 milj.' },
  istanbul: { ala: '5 500 km²', vaki: '16 milj.' },
};

// Käsin valitut galleriat: kun artikkelin oma kuvalista on heikko (vain
// kaavioita), Tutki-sivun galleria kootaan näistä Commonsin kuvista.
// Lisenssit varmistettu tiedostokohtaisesti.
export const OMAT_GALLERIAT = {
  'Victoria-järvi': [
    { tiedosto: 'Sunset at Lake Victoria.jpg', caption: 'Auringonlasku Victorianjärvellä' },
    { tiedosto: 'Boats by the Lake Victoria Shore.jpg', caption: 'Kalastajaveneitä järven rannassa' },
    { tiedosto: 'Fishing on lake Victoria 01.jpg', caption: 'Kalastajia aamulla' },
    { tiedosto: 'Lake Victoria as visible from Kisumu City.jpg', caption: 'Järvi Kisumun kaupungista nähtynä' },
    { tiedosto: 'Still Life with Stork and Fishing Boats - Along Shore of Lake Victoria - Entebbe - Uganda.jpg', caption: 'Marabu ja veneitä Entebben rannassa' },
    { tiedosto: 'Sunset on lake Victoria in kisumu.jpg', caption: 'Ilta Kisumussa' },
  ],
};
