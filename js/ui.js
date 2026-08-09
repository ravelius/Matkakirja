// Käyttöliittymä: aarrekartan piirto, ohjauspaneeli, tietovisa ja bottien ohjaus.

import { pixelOf, pointAlong, posKey } from './rules.js';
import {
  chooseDuelAnswer,
  chooseMove,
  chooseQuizAnswer,
  chooseTravel,
  wantsDuelBypass,
  wantsDuelRelief,
  wantsFiftyFifty,
  wantsHint,
} from './ai.js';
import {
  DUEL_BYPASS_SHOES, DUEL_PRIZE, EXPLORE_REWARD, FIFTY_FIFTY_PRICE, FLIGHT_PRICE,
  HARD_BONUS, HINT_EVERY_TURNS, HINT_PRICE, QUIZ_SECONDS, SEA_FARE,
} from './game.js';
import {
  factSource, factText, factVoice, isSourceUrl, PACKS, packById, sourceLabel, voiceTitle,
} from './pack.js';
import { stampBoard } from './passport.js';
// Matkalaukun alalaidan "Unohdettu aarre": tekijänoikeus ja lähdeluettelo.
import { LAHTEET, LAHTEITA, PELI } from './lahteet.js';
import {
  fetchArticle, fetchImage, fetchImages, fetchSummary, suurennusportaat,
} from './wiki.js';
import { drawPuzzle as piirraAfrikanPulma, hasSketch as afrikanPulma } from './packs/africa-puzzles.js';
import { drawPuzzle as piirraEuroopanPulma } from './packs/europe-puzzles.js';

/**
 * Pulman piirros oikeasta laudasta. Tunnisteet ovat yksilöllisiä yli
 * lautojen, joten oikea piirtäjä löytyy kysymällä.
 */
function drawPuzzle(svg, id, data) {
  if (afrikanPulma(id)) piirraAfrikanPulma(svg, id, data);
  else piirraEuroopanPulma(svg, id, data);
}
import { OMAT_TIIVISTELMAT } from './packs/omat-tiivistelmat.js';
import { OMAT_ARTIKKELIT } from './packs/africa-artikkelit.js';
import { AFRICA_MAATIEDOT } from './packs/africa-maatiedot.js';
import {
  AFRICA_VALOKUVAT, lippuUrl, lippuVara, valokuvaUrl, valokuvaVara,
} from './packs/africa-valokuvat.js';
import {
  asetaKuva, peiliPetti, peilinLaji, aaniOsoite, onPeilista,
} from './media.js';
import { AFRICA_SAAPUMISET } from './packs/africa-saapumiset.js';
import { AFRICA_KULTTUURI, KULTTUURI_PALKKIO } from './packs/africa-kulttuuri.js';
import { EUROPE_SAAPUMISET } from './packs/europe-saapumiset.js';
import { TARINAKAARI, KAARI_LAUDAT } from './packs/tarinakaari.js';
import { ASIA_SAAPUMISET } from './packs/asia-saapumiset.js';
import { NORTHAMERICA_SAAPUMISET } from './packs/northamerica-saapumiset.js';
import { SOUTHAMERICA_SAAPUMISET } from './packs/southamerica-saapumiset.js';
import { OCEANIA_SAAPUMISET } from './packs/oceania-saapumiset.js';
import { ASIA_ARTIKKELIT } from './packs/asia-artikkelit.js';
import { ASIA_VALOKUVAT } from './packs/asia-valokuvat.js';
/*
 * Loput kuvapaketit. Aasia on kahdessa tiedostossa, koska ensimmäiset
 * 40 kaupunkia kirjoitettiin omalla ajollaan eikä valmista pakettia
 * saa korvata — koostaja kirjoittaa tiedoston kokonaan uusiksi, ja
 * ylikirjoitus veisi mukanaan kaiken, mitä siihen on käsin korjattu.
 * Yksi ylimääräinen tiedosto on halvempi kuin yksi menetetty.
 */
import { ASIA_LISAT_VALOKUVAT } from './packs/asia-lisat-valokuvat.js';
import { NORTHAMERICA_VALOKUVAT } from './packs/northamerica-valokuvat.js';
import { SOUTHAMERICA_VALOKUVAT } from './packs/southamerica-valokuvat.js';
import { OCEANIA_VALOKUVAT } from './packs/oceania-valokuvat.js';
import { ASIA_MAATIEDOT } from './packs/asia-maatiedot.js';
import { radioMaalle } from './packs/radiot.js';
import { EUROPE_KULTTUURI } from './packs/europe-kulttuuri.js';
import { KULTTUURI_KATEGORIAT } from './packs/kulttuuri-kategoriat.js';
import { MAA_KATEGORIAT } from './packs/maa-kategoriat.js';
import { MAAKARTAT, KAUPUNKIKARTAT, karttapiste, mittakaava } from './packs/maakartat.js';
import { NAHTAVYYSJUTUT } from './packs/nahtavyysjutut.js';
import { HENKILOT, HENKILOLINKIT } from './packs/henkilot.js';
import { SAATIEDOT } from './packs/saatiedot.js';
import { KOHTAAMISET } from './packs/kohtaamiset.js';
import {
  haeUutiset, haeArtikkeli,
  kaannaSuomeksi, uutislahde,
} from './uutiset.js';
import {
  haeSaaTanaan, saaKuvaus, SAA_IKONIT, kuukausiSsa, piirraVuosiSaa,
} from './saa.js';
import { EUROPE_VALOKUVAT } from './packs/europe-valokuvat.js';
import { EUROPE_KIELET } from './packs/europe-kielet.js';
import { EUROPE_MAATIEDOT } from './packs/europe-maatiedot.js';
import { EUROPE_ARTIKKELIT } from './packs/europe-artikkelit.js';
import { LIPPU_TEKIJAT } from './packs/lippu-tekijat.js';

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
const EI_VALOKUVAKYSYMYKSEEN = new Set([
  'rashafun', 'sanambrosio', 'alkufra', 'bahrelghazal',
]);

const KAIKKI_VALOKUVAT = {
  ...AFRICA_VALOKUVAT, ...EUROPE_VALOKUVAT, ...ASIA_VALOKUVAT, ...ASIA_LISAT_VALOKUVAT,
  ...NORTHAMERICA_VALOKUVAT, ...SOUTHAMERICA_VALOKUVAT, ...OCEANIA_VALOKUVAT,
};
const KAIKKI_MAATIEDOT = { ...AFRICA_MAATIEDOT, ...EUROPE_MAATIEDOT, ...ASIA_MAATIEDOT };

const SAAPUMISTEKSTIT = {
  africa: AFRICA_SAAPUMISET,
  europe: EUROPE_SAAPUMISET,
  // Aasian teksteillä ei ole omaa lautaa: kaupungit ovat vain
  // yhdistetyillä laudoilla, joten ne tulevat mukaan vain tänne.
  maailmankartta: KAIKKI_SAAPUMISET,
};

// Kaupungin elämää -nostot laudoittain.
const KULTTUURIT = {
  africa: AFRICA_KULTTUURI,
  europe: EUROPE_KULTTUURI,
  maailmankartta: KAIKKI_KULTTUURI,
};

// Vanhat valokuvat muistikirjan kylkeen laudoittain.
const VALOKUVAT = {
  africa: AFRICA_VALOKUVAT,
  europe: EUROPE_VALOKUVAT,
  maailmankartta: KAIKKI_VALOKUVAT,
};
// Kaupungissa nauhoitettu puhenäyte: kieli kuuluviin omasta napistaan.
const KIELET = {
  europe: EUROPE_KIELET,
  maailmankartta: EUROPE_KIELET,
};

// Maiden tunnusluvut laudoittain.
const MAATIEDOT = {
  africa: AFRICA_MAATIEDOT,
  europe: EUROPE_MAATIEDOT,
  maailmankartta: KAIKKI_MAATIEDOT,
};

/*
 * Kehittäjätila (omistajan toive): kaupunkiin pääsee napauttamalla sen
 * laattaa, jolloin minkä tahansa kaupungin sisältöä voi katsoa ilman
 * että sinne pitää pelata.
 *
 * Tila säilyy selaimessa, koska sisällön tarkastelu jatkuu yleensä
 * seuraavallakin avauksella. Se ei kuulu pelin tallennukseen: tila on
 * laitteen asetus eikä pelitilanteen osa, eikä sen pidä matkustaa
 * tallennuksen mukana.
 */
const KEHITTAJA_AVAIN = 'matkakirja-kehittaja';

export function kehittajaTilaPaalla() {
  try {
    return localStorage.getItem(KEHITTAJA_AVAIN) === '1';
  } catch {
    return false; // yksityinen selaus
  }
}

export function asetaKehittajaTila(paalla) {
  try {
    if (paalla) localStorage.setItem(KEHITTAJA_AVAIN, '1');
    else localStorage.removeItem(KEHITTAJA_AVAIN);
  } catch {
    /* yksityinen selaus: tila jää vain tälle istunnolle */
  }
}

// Omat artikkelit: yhteinen hakemisto wiki-otsikolla (mantereet eivät
// törmää, koska otsikot ovat eri).
const ARTIKKELIT = { ...OMAT_ARTIKKELIT, ...EUROPE_ARTIKKELIT, ...ASIA_ARTIKKELIT };

// Tiivistelmät ja kuvat haetaan kerran per artikkeli: sama kuva näkyy
// sekä saapumiskortissa että Lue lisää -dialogissa ilman uutta hakua.
const wikiSummaryCache = new Map();
const wikiImageCache = new Map();

async function cachedSummary(title) {
  if (!wikiSummaryCache.has(title)) {
    // Oma suomenkielinen tiivistelmä paikkaa puuttuvan tai englannin-
    // kielisen wikitekstin — ja toimii myös ilman verkkoa. Kunnollinen
    // fi-artikkeli ohittaa oman tekstin itsestään. Wikihaun kuva
    // säilytetään, otsikko pysyy pelin omana.
    wikiSummaryCache.set(title, fetchSummary(title).then((summary) => {
      const oma = OMAT_TIIVISTELMAT[title];
      if (!oma || (summary && summary.lang === 'fi')) return summary;
      return { ...(summary ?? {}), title, extract: oma, lang: 'fi', oma: true };
    }).catch(() => {
      const oma = OMAT_TIIVISTELMAT[title];
      return oma ? { title, extract: oma, lang: 'fi', oma: true } : null;
    }));
  }
  return wikiSummaryCache.get(title);
}

async function cachedImage(title) {
  if (!wikiImageCache.has(title)) {
    wikiImageCache.set(title, cachedSummary(title).then((s) => fetchImage(s)));
  }
  return wikiImageCache.get(title);
}

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

function luentaLauta(joukko, packId, cityId) {
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

// Kaupungit, joiden aarrevihjeelle on kuiskattu luenta (ElevenLabs).
// Euroopassa vihjeet ovat ilmansuunnittain (starHintAlue,
// js/packs/europe.js) — rivit ovat alueita, eivät kaupunkeja.
export const VIHJELUENNAT = new Set([
  'europe:pohjoinen',
  'europe:lansi',
  'europe:etela',
  'europe:ita',
  'africa:karthago',
  'africa:nairobi',
  'africa:lagos',
  'africa:viktorianputoukset',
  'africa:tshadjarvi',
  'africa:marrakech',
  'africa:sthelena',
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

const HAVAINTOLUENNAT = new Set([
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
const KOHTAAMISLUENNAT = new Set([
  'lontoo',
]);

// Lautojen tunnusluvut karttaselitteeseen: pinta-ala ja väkiluku isoin
// pyöristyksin (omistajan toive — vähäeleinen, vain numerot ja symboli).
const LAUTA_TUNNUSLUVUT = {
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

const wikiGalleryCache = new Map();

// Käsin valitut galleriat: kun artikkelin oma kuvalista on heikko (vain
// kaavioita), Tutki-sivun galleria kootaan näistä Commonsin kuvista.
// Lisenssit varmistettu tiedostokohtaisesti.
const OMAT_GALLERIAT = {
  'Victoria-järvi': [
    { tiedosto: 'Sunset at Lake Victoria.jpg', caption: 'Auringonlasku Victorianjärvellä' },
    { tiedosto: 'Boats by the Lake Victoria Shore.jpg', caption: 'Kalastajaveneitä järven rannassa' },
    { tiedosto: 'Fishing on lake Victoria 01.jpg', caption: 'Kalastajia aamulla' },
    { tiedosto: 'Lake Victoria as visible from Kisumu City.jpg', caption: 'Järvi Kisumun kaupungista nähtynä' },
    { tiedosto: 'Still Life with Stork and Fishing Boats - Along Shore of Lake Victoria - Entebbe - Uganda.jpg', caption: 'Marabu ja veneitä Entebben rannassa' },
    { tiedosto: 'Sunset on lake Victoria in kisumu.jpg', caption: 'Ilta Kisumussa' },
  ],
};

async function cachedGallery(title) {
  if (!wikiGalleryCache.has(title)) {
    const oma = OMAT_GALLERIAT[title];
    wikiGalleryCache.set(title, oma
      ? Promise.resolve(oma.map((k) => ({
        src: valokuvaUrl(k.tiedosto, 1200),
        vara: valokuvaVara(k.tiedosto, 1200),
        caption: k.caption,
      })))
      : cachedSummary(title).then((s) => fetchImages(s)));
  }
  return wikiGalleryCache.get(title);
}
import { sfx, treasureSound } from './sound.js';
import {
  playPlaceAmbience, startQuizMusic, stopPlaceStream, stopQuizMusic,
  vaimennaTausta, palautaTausta, puheAlkoi, puheLoppui,
} from './ambience-stream.js';
import { puheVoima, jaaAlku, kertojaTila } from './aani-ehdokkaat.js';
import { BoardDie } from './die.js';
import {
  el,
  hash01,
  vary,
  drawCompass,
  drawDefs,
  drawDoodles,
  drawHemisphereFrames,
  drawLand,
  drawPaperOverlay,
  drawParchment,
  drawTerrain,
  drawTokenIcon,
  drawWaves,
  isOnLand,
  revealFaceSvg,
  revealRaysSvg,
  tokenIconSvg,
  paperi,
  kasinPiirretty,
  rasteroiRuutu,
  RUUTU_TYHJA,
  piirtotarkkuus,
  ruudunKoko,
  valmisteleTaide,
  pilkoTaide,
  tyylitSisaan,
  drawMaasto,
  drawMaastonimet,
  drawLahivesi,
  lahivedenVoima,
} from './mapart.js';
import { MAAILMANKARTAN_NIMET } from './packs/maailmankartta-nimet.js';
import { MERISYVYYS } from './packs/maailmankartta-syvyys.js';
import { MAASTON_VARJOSTUS } from './packs/maailmankartta-varjostus.js';

const DIE_FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
const BOT_DELAY = 650;
const BOT_QUIZ_DELAY = 1500; // botin kysymys jää hetkeksi näkyviin luettavaksi
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Animaatioiden rytmi millisekunteina.
/*
 * Luennan loppuhäivytys. Aiempi neljännessekunti oli niin lyhyt, että
 * kertoja katkesi töksähtäen (omistajan havainto) — etenkin lyhyessä
 * kertojatilassa, jossa ääni pysäytettiin lauserajalla ilman häivytystä
 * lainkaan. Puolitoista sekuntia riittää pehmentämään lopun ilman että
 * viimeinen sana hukkuu, koska käyrä on aluksi loiva.
 */
const LUENNAN_HAIPYMA_S = 1.5;
/*
 * Nauhoituksen LUONNOLLISEN lopun häivytys on eri asia.
 *
 * Yllä oleva puolitoista sekuntia on oikea silloin, kun luenta
 * katkaistaan kesken tiedoston lauserajalla: siinä häivytys korvaa
 * töksähtävän katkon keskellä puhetta. Nauhoituksen omassa lopussa se
 * on väärin — se alkaa jo puolitoista sekuntia ennen loppua ja nielee
 * viimeisen sanan (omistajan havainto).
 *
 * Lopussa tarvitaan vain sen verran, ettei soittimen pysäytys napsahda.
 *
 * VIISIKYMMENTÄ MILLISEKUNTIA EI RIITTÄNYT. Voimakkuutta säädetään
 * ruudunpäivityksen tahdissa eli noin 16 millisekunnin välein, joten
 * viimeinen säätö osui pahimmillaan kolmasosaan täydestä
 * voimakkuudesta — ja siitä syntyi napsahdus. Se kuului vain osassa
 * äänitteitä (omistajan havainto), koska osa loppuu jo valmiiksi
 * hiljaisuuteen eikä niissä ole mitä napsahtaa.
 *
 * Nyt häivytys on hitusen pidempi ja saavuttaa NOLLAN selvästi ennen
 * tiedoston loppua. Viimeiset parikymmentä millisekuntia ovat
 * hiljaisuutta, ja vasta siinä soitin pysäytetään.
 */
const LOPUN_HAIPYMA_S = 0.12;
/** Kuinka kauan ennen loppua ääni on jo täysin vaiennut. */
const LOPUN_HILJAISUUS_S = 0.025;
/** Pehmennyskäyrä: alkaa hitaasti, jyrkkenee lopussa (ease-in). */
const pehmene = (t) => Math.max(0, Math.min(1, t)) ** 1.8;

const STEP_MS = 190; // yksi askel kartalla
const FLIGHT_MS = 900;
// Mantereen sisäinen lento liukuu rauhallisemmin moottorin hurinalla.
const MANNER_LENTO_MS = 2800;
// Lentoanimaation kesto: sen verran, että repliikin ehtii lukea.
// Kalvolento saa kestää: matka on tarkoitus tuntea, ei ohittaa.
const FLY_OVERLAY_MS = 4800;
/*
 * Lennon kesto seuraa repliikin pituutta.
 *
 * Kiinteä 4,8 sekuntia riitti koneelle mutta ei lukijalle: omistajan
 * havainto avauslennolta oli, että "lentokoneen pitää lentää hitaammin
 * koska tekstin luku kestää paljon kauemmin". Repliikki kirjoittuu
 * sanoittain ja jää sitten paikalleen, joten hidas osuus ei ole
 * kirjoitus vaan lukeminen.
 *
 * Aika lasketaan sanoista eikä merkeistä: silmä lukee sanan kerrallaan,
 * ja lyhyet suomen sanat pidentäisivät merkkilaskurilla arviota väärään
 * suuntaan. Yläraja on siksi, ettei poikkeuksellisen pitkä rivi jätä
 * konetta ilmaan minuutiksi — lennon voi joka tapauksessa hypäyttää
 * perille napauttamalla.
 */
const LENNON_POHJA_MS = 2200;
const LENNON_SANA_MS = 210;
const LENNON_ENINTAAN_MS = 15000;
// Kuinka kauan lennon jälkeen odotetaan, ennen kuin pieni nuoli syttyy.
const LENNON_NUOLI_MS = 3500;
const TOAST_MS = { die: 950, default: 1200 };

/*
 * Vertailun värit valintajärjestyksessä: sama lista kuin
 * js/maakayrat.js:n VERTAILUVARIT. Se on tässä toisintona, koska
 * karttanäkymän alapalkki tarvitsee värit heti eikä maakayrat.js
 * lataudu ennen kuin vertailunäkymä avataan (laiska tuonti, ks.
 * piirraMaaNumerotSivu). Testi vahtii, etteivät listat eriydy.
 */
const VERTAILUVARIT = [
  'maakayra-viiva', 'maakayra-toinen', 'maakayra-kolmas', 'maakayra-neljas',
];
const AUTO_ROLL_MS = 320; // tauko ennen itsestään pyörähtävää noppaa
// Kuinka paljon pergamenttia jatketaan kartan alle avaustekstiä varten.
const INTRO_SPACE = 0.5;
// Kuinka paljon lautaa lasketaan yläreunasta aloitusnäkymässä.
const INTRO_TOP = 0.05;
// Kirjoituskoneen tahti: avaus saa naksua rauhassa, muut tekstit ripeästi.
const TYPE_MS = 50;
const INTRO_TYPE_MS = 190;
// Tehtäväkortti paljastuu vaiheittain: kehys, tauko, kysymys, tauko,
// vaihtoehdot. Kirjoituskone on etusivua ripeämpi mutta rauhallisempi
// kuin pelitilanneilmoitukset.
const QUIZ_TYPE_MS = 95;
const QUIZ_PAUSE_MS = 700;
// Avaustekstin kirjasinkoko sovitetaan kaistaan näiden rajojen sisällä.
const INTRO_FONT_MAX = 1.32;
const INTRO_FONT_MIN = 0.72;
// Omistajan päättämä avausteksti. ÄLÄ muokkaa ilman omistajan lupaa
// (docs/tyolista-opukselle.md, paketti 3). Lyhennetty omistajan
// pyynnöstä 4.8.2026: pitkää versiota ei jaksanut kuunnella.
const INTRO_TEXT = 'Vintiltä löytyi isoisän kulunut matkakirja: '
  + '"Maailman ympäri kahdeksassakymmenessä päivässä".\n\n'
  + 'Viimeinen sivu oli revitty kesken lauseen: "…voinut uskoa, siellä '
  + 'olikin…" Mitä hän oli löytänyt?\n\n'
  + 'Juoksin kentälle kirja kädessäni:\n\n'
  + 'mistä aloitan?';
/*
 * Mantereiden lähikuva puhelimella. Ilme hiotaan ensin Euroopalla
 * (omistajan päätös); muut laudat lisätään tähän settiin sitä mukaa kuin
 * ne on käyty läpi.
 */
const ZOOMATTAVAT = new Set(['europe', 'maailmankartta']);
const MANNER_ZOOM = 2.3;        // vanha kiinteä kerroin; nykyään portaat lasketaan

/*
 * Zoomiportaat (omistajan toive: painikkeet kaikille alustoille).
 *
 * Portaat kerrotaan siitä, kuinka LEVEÄ pala lautaa näkyy — ei siitä,
 * moninkertainen lähikuva on yleiskuvaan.
 *
 * Ero ratkaisee isolla laudalla. Ennen portaat olivat kertoimia
 * [1, 1.5, 2.3, 3.4, 5]. Tuhannen yksikön laudalla suurin porras näytti
 * 200 yksikköä eli kaupungin ympäristön, mutta yhdistetyllä 7200
 * yksikön laudalla sama kerroin näytti 1440 yksikköä — koko Euroopan.
 * Sama nappi tarkoitti eri asiaa eri laudalla, ja isolla laudalla ei
 * päässyt lähelle lainkaan (omistajan havainto).
 *
 * Luvut ovat samat kuin vanhat kertoimet tuhannen yksikön laudalla
 * (1000/1.5 = 667, 1000/2.3 = 435 ja niin edelleen), joten pienet
 * laudat käyttäytyvät täsmälleen kuten ennen. Kaksi uutta porrasta
 * jatkavat lähemmäs: niitä tarvitaan vasta isolla laudalla.
 *
 * Portaat eivät ole tasavälein: alapäässä ero on pieni, jotta yleiskuvan
 * ja ensimmäisen lähikuvan välillä ei hypätä liikaa, ja yläpäässä
 * suurempi, koska lähellä pieni muutos ei enää tunnu miltään.
 */
/*
 * Portaat lasketaan puolitoistakertaisina askelina laudan leveydestä
 * lähimpään portaaseen asti.
 *
 * Kiinteä lista näkyviä leveyksiä ei kelvannut. Sen tihein porras oli
 * 667 yksikköä, ja se on tuhannen yksikön laudalla sopiva ensiaskel
 * mutta 7200 yksikön laudalla jo kaupungin ympäristö: yleiskuvan ja
 * ensimmäisen portaan väliin jäi yhdentoista kertaluokan hyppy.
 * Omistajan havainto iPadilta: "zoomautuu aivan liian lähelle Ateenaa."
 *
 * Suhteellinen askel korjaa sen itsestään. Tuhannen yksikön laudalla
 * portaat ovat 1000, 667, 444, 296, 198, 132, 88 — käytännössä samat
 * kuin vanhat kertoimet [1, 1.5, 2.3, 3.4, 5] ja kaksi lisää
 * lähemmäs. Isolla laudalla väliin syntyy portaita sitä mukaa kuin
 * lautaa on enemmän.
 */
const ZOOMI_ASKEL = 1.5;
// Lähin porras: yhden kaupungin ympäristö millä tahansa laudalla.
const ZOOMI_LAHIN = 88;

/*
 * Mihin saapumiszoom pysähtyy.
 *
 * Osuus laudasta on sama kuin ennen (vanha MANNER_ZOOM 2.3 näytti
 * 1/2,3 eli 43 % laudasta). Isolla laudalla pelkkä osuus veisi liian
 * kauas, joten sille on lisäksi yläraja yksikköinä: 2400 yksikköä
 * vastaa yhdistetyllä kartalla noin viittäkymmentä pituusastetta eli
 * Lissabonista Moskovaan — omistajan toive oli, että saavuttaessa
 * näkyy Eurooppa eikä koko vanha maailma.
 */
const SAAPUMIS_OSUUS = 0.43;
/*
 * 2400 yksikköä oli yhä liian laaja: iPadilla näkyi Marseillesta
 * Jerusalemiin (omistajan kuvakaappaus). 1500 osuu portaalle 1422, joka
 * on noin kolmekymmentä pituusastetta — Lontoosta Varsovaan, eli
 * Eurooppa siinä mielessä kuin omistaja sen tarkoitti.
 */
const SAAPUMIS_LEVEIN = 1500;
const MANNER_ZOOM_VIIVE = 1400; // kokonäkymä näkyy tämän verran ennen zoomausta
// Kuinka suuri osa ruudusta varataan laudan eteläpuolelle, jotta
// alarivin nappien alle jäävät kaupungit saa panoroitua näkyviin.
const ALAKAISTA = 0.3;
// Sama pohjoiseen: matkakirjan kortti peittää laudan yläreunan, joten
// pohjoisimmat kaupungit (Tromssa, Lappi, Islanti) tarvitsevat tilaa,
// johon panoroida (omistajan havainto).
const YLAKAISTA = 0.26;
// Zoomausliu'un kesto. Omistajan palaute on vienyt tätä pidemmäksi
// kerta kerralta: 600 ms → 1200 → 2000 → 2400.
/*
 * Loitonnuksen varmuusvara: osuus laudan leveydestä, joka jää aina
 * näkymän ulkopuolelle, jottei sauma näy kahtena (ks. rajaaSkaala).
 */
const SAUMAN_VARA = 0.03;
/*
 * Saapumisnäkymän siirto kohdemantereen suuntaan (ks. mantereenKeskitys).
 * OSUUS on matka mantereen painopisteeseen; SIIRTO_X ja SIIRTO_Y
 * rajaavat sen osuuteen näkyvästä alasta, jottei kaupunki karkaa
 * laitaan. Y on tiukempi, koska ruutu on matalampi kuin leveä ja
 * kaupungin yläpuolella on matkakirjan kortti.
 */
const MANNER_PAINO = 0.5;
const MANNER_SIIRTO_X = 0.26;
const MANNER_SIIRTO_Y = 0.2;
/*
 * Saapumisliu'un lähtölaajuus isolla laudalla: monenko kertaisena
 * näkymä avautuu ennen kuin se laskeutuu lähikuvaan. Kokonäkymästä ei
 * lähdetä (ks. zoomaaMantereelle).
 *
 * Nostettu 2,6:sta omistajan pyynnöstä: "aloita zoomaus hieman
 * kauempaa kuin tällä hetkellä". 3,6 on yhä selvästi alle kokonäkymän
 * — maailmankartalla se on noin kolmasosa laudan leveydestä eli
 * mannerta ympäristöineen, ei maapalloa.
 */
const MANNER_LAAJUUS = 3.6;
/*
 * Zoomiliu'un kesto. Nostettu 2400:sta omistajan havainnon jälkeen:
 * "zoomaus tökkii kun kartta yrittää pysyä perässä piirtämisessä.
 * zoomausvauhti voisi olla ainakin hitaampi." Hitaampi liuku antaa
 * bittikartalle aikaa, ja liikkeestä tulee samalla arvokkaampi.
 */
const ZOOM_MS = 3400;
// Etusivun zoomaus vielä tätäkin hitaammin (omistajan toive): se on
// pelin avaus, ja koko maailmankartta on iso matka lähikuvaan.
const ALOITUS_ZOOM_MS = 3600;
// Kiihdytys ja jarrutus molemmissa päissä (omistajan toive): kartta
// lähtee liikkeelle hyvin hitaasti, kiihtyy vähitellen täyteen
// vauhtiin ja jarruttaa pitkään. Ensimmäinen ohjauspiste on kaukana
// oikealla juuri siksi, että alku on tarpeeksi verkkainen.
// HUOM: sama arvo on js/sound.js:ssä, jotta äänen korkeus seuraa
// samaa kaarta. Jos muutat toisen, muuta myös toinen.
const ZOOM_PEHMENNYS = 'cubic-bezier(0.68, 0, 0.3, 1)';
// Hiljainen hetki ennen zoomausta, jotta moottoriääni erottuu.
// Lehden minitehtävän palkkio: pienempi kuin kulttuurivisan, koska
// vastaus lukee samalla sivulla.
const MINITEHTAVA_PALKKIO = 10;
const ZOOM_TAUKO_MS = 260;
/*
 * Hiiren rullan vähimmäisväli. Tarkka rulla ja trackpad lähettävät
 * kymmeniä tapahtumia yhdestä eleestä, ja ilman väliä kartta hyppäisi
 * portaikon läpi yhdellä nykäisyllä.
 */
const RULLAN_VALI_MS = 220;
// Aloituskartan lähikuvan suurennos yleiskuvaan nähden.
const ALOITUS_ZOOM = 3.1;
/*
 * Palautelomakkeen vastaanottava ulkopuolinen palvelu. Tyhjänä lomakkeen
 * tilalla näkyy GitHub-linkki, joten palaute toimii ilman asetuksia.
 *
 * Käyttöönotto: luo lomake esim. Formspreessa (formspree.io) tai
 * Web3Formsissa ja liitä palvelun antama osoite tähän, esimerkiksi
 * 'https://formspree.io/f/xxxxxxxx'. Osoite ei paljasta sähköpostia:
 * palvelu tietää sen, sivun lähdekoodi ei.
 */
const PALAUTE_LOMAKE = '';

/**
 * Versionumero palauteviestiin. Luetaan sivulta (js/main.js kirjoittaa
 * sen asetuksiin), jottei ui.js tarvitse tuontia main.js:stä — se olisi
 * kehämäinen riippuvuus.
 */
function peliVersio() {
  return document.getElementById('app-version')?.textContent?.trim() ?? '?';
}

// Päiväkirjakortin nurkkahaku: kuinka suuri osa kartasta on "nurkka".
const FACT_CORNER = 0.34;
const FACT_WIDTH = 340; // pidettävä samana kuin .fact-card css:ssä
const TURN_WIDTH = 560; // pidettävä samana kuin .turn-card css:ssä

// Tapahtumakuplien äänet.
const EVENT_SOUND = { fare: 'ferry', flight: 'flight', aid: 'coin', stuck: 'stuck' };

// Paljastusruudun alateksti laattatyypeittäin.
// Matkustustapojen nimet paneelissa.
const TRAVEL_LABEL = { land: 'Maitse', sea: 'Laivalla', fly: 'Lentäen', stay: 'Paikallaan' };

const REVEAL_SUB = {
  star: 'Vie unohdettu aarre kotiin ja voitat pelin!',
  horseshoe: 'Voit voittaa, jos ehdit kotiin ensimmäisenä',
  robber: 'Rosvo haastaa kaksintaisteluun!',
  empty: 'Isoisän merkintä oli vanhentunut — täältä ei löytynyt mitään',
  // Ilman tätä riviä taikalasin alle tulisi "+0 puntaa": laattatyypin
  // arvo on nolla, koska linssi ei ole rahaa (js/tokens.js).
  linssi: 'Uusi linssi kartalle — katso maailmaa toisin',
};

/*
 * Nuoren herran huudahdus paljastushetkellä (omistajan tilaus
 * 9.8.2026): lyhyt spontaani repliikki heti kun aarre kääntyy esiin,
 * ENNEN varsinaista cliffhanger-tekstiä. Sävy kasvaa aarteen arvon
 * mukana — pikkulöytö kuitataan, suurlöytö vie sanat. Arvotaan joka
 * kerta, jotta toisto ei kulu.
 */
const HUUDAHDUKSET = {
  300: [
    'Hei — löytyi sittenkin!',
    'Pieni, mutta aito!',
    'Kelpaa tämäkin!',
    'Taskuun ja eteenpäin!',
  ],
  600: [
    'Mahtavaa!',
    'Sepä vasta löytö!',
    'Isoisä olisi hykerrellyt!',
    'Tämä merkitään päiväkirjaan!',
  ],
  1000: [
    'Uskomatonta!',
    'Jes! Katsokaa nyt tätä!',
    'Sydän hakkaa — mikä löytö!',
    'Juuri tällaisesta isoisä kirjoitti!',
  ],
  star: [
    'Se on totta... se on oikeasti totta!',
    'Aarni oli oikeassa — se on olemassa!',
    'Isoisä... minä löysin sen.',
  ],
};

/** Arvo huudahdus laattatyypin mukaan; muille kuin aarteille ei mitään. */
function arvoHuudahdus(type, token) {
  const lista = type === 'star' ? HUUDAHDUKSET.star : HUUDAHDUKSET[token.value];
  return lista ? lista[Math.floor(Math.random() * lista.length)] : null;
}

/*
 * Aarrekuvan osoitepari asetaKuvalle. AI-generoidut aarrekuvat ovat
 * repon omassa assets/aarteet-kansiossa — ne ladataan suoraan, ilman
 * peiliä tai Commons-varareittiä, joita niillä ei ole. Commons-nimi
 * (ilman assets-alkua) kulkee entistä peili + Commons -reittiä, jos
 * jokin lauta vielä sellaista käyttää.
 */
function aarrekuvanOsoitteet(kuva) {
  if (kuva.startsWith('assets/')) return [kuva, null];
  return [valokuvaUrl(kuva, 640), valokuvaVara(kuva, 640)];
}

/*
 * Valittu linssi on laitteen katseluasetus, ei pelin tapahtuma.
 *
 * Siksi se ei kuulu pelitallennukseen vaan omaan avaimeensa kuten
 * äänet ja kertoja (docs/linssit-suunnitelma.md luku 5.3). Kelvoton tai
 * omistamaton arvo ohitetaan hiljaa: tallennus voi olla vanhalta
 * versiolta, jossa linssi oli toisen niminen.
 */
const LINSSI_AVAIN = 'matkakirja-linssi';

function tallennettuLinssi() {
  try {
    return localStorage.getItem(LINSSI_AVAIN);
  } catch {
    return null; // yksityinen selaus
  }
}

function tallennaLinssi(tunnus) {
  try {
    if (tunnus) localStorage.setItem(LINSSI_AVAIN, tunnus);
    else localStorage.removeItem(LINSSI_AVAIN);
  } catch {
    /* yksityinen selaus: valinta jää vain tälle istunnolle */
  }
}

/**
 * Ensimmäinen virke lainaus- ja päätösmerkkeineen; loput erikseen.
 * Päiväkirjan luennassa ääneen luetaan vain tämä ja teksti lihavoidaan.
 */
function ekaLause(teksti) {
  const m = /^[\s\S]*?[.!?…](?:["»”])?(?=\s|$)/.exec(teksti);
  if (!m) return { eka: teksti, loput: '' };
  return { eka: m[0], loput: teksti.slice(m[0].length).trimStart() };
}

function html(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/*
 * Onko valokuva niin vanha, että se näytetään mustavalkoisena?
 *
 * Omistajan toive: "matkakirjan kuvat pitäisi pitää värillisinä jos ne
 * ovat uusia. vain oikeasti vanhat kuvat saisivat olla mustavalkoisia,
 * jotta kävisi helpommin ilmi, kumpia kuvat ovat."
 *
 * Aiemmin harmaasävy oli CSS-sääntö, joka koski kaikkia postikortin
 * kuvia. Silloin nykypäivän kuva näytti yhtä vanhalta kuin sadan
 * vuoden takainen, ja koko ennen/nyt-asetelma katosi.
 *
 * Ratkaisu luetaan AINEISTOSTA eikä kortin paikasta: jokaisella
 * kuvalla on vuosi-kenttä, ja se kertoo totuuden silloinkin, kun
 * pinon keskellä on 1924 otettu lisäkuva.
 *
 * Raja on 1960, sama kuin tools/tarkista-kuvaiat.mjs:ssä. Väri­kuvaus
 * yleistyi 1950-luvulla, joten sitä vanhempi kuva on käytännössä aina
 * mustavalkoinen jo valmiiksi — harmaasävy ei siis muuta sitä miltä
 * kuva näyttää, vaan siistii skannauksen kellastumat pois.
 */
const VARIKUVAN_RAJA = 1960;

function vuosiluku(teksti) {
  const m = /\d{4}/.exec(String(teksti ?? ''));
  return m ? Number(m[0]) : null;
}

function onVanhaKuva(kuvaTiedot, oletusVanha = false) {
  const v = vuosiluku(kuvaTiedot?.vuosi);
  // Tuntematon vuosi: luotetaan kutsujan tietoon siitä, mikä kuva on
  // kyseessä. Pelkkä arvaus värittäisi historiakuvan tai
  // harmaannuttaisi nykykuvan, ja molemmat valehtelisivat.
  if (v === null) return oletusVanha;
  return v < VARIKUVAN_RAJA;
}

/**
 * Merkkijono turvalliseksi innerHTML:ään.
 *
 * Radioasemien nimet tulevat generoidusta paketista, joka on koottu
 * Radio Browserin avoimesta hakemistosta — siellä on ampersandeja ja
 * lainausmerkkejä ("Rádio & Televisão", 'FM 83.4"'). Ilman suojausta
 * ne rikkoisivat napin rakenteen.
 */
function suojaa(teksti) {
  return String(teksti)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/*
 * Soita- ja pysäytä-merkit ääninappeihin.
 *
 * Aiemmin napissa oli kaiutinkuvake, joka pysyi samana soi tai ei —
 * vain teksti vaihtui. Kolmio ja neliö kertovat tilan yhdellä
 * silmäyksellä, ja ne ovat samat merkit kuin kaikissa soittimissa,
 * joten niitä ei tarvitse opetella.
 *
 * Piirretään samalla kynällä kuin kartta: pelkkä ääriviiva nykyisellä
 * tekstivärillä (ks. VIIVA_IKONIT alla).
 */
const MERKKI_SOITA = '<svg class="merkki" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">'
  + '<path d="M8.4 5.8 18 12l-9.6 6.2z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'
  + '</svg>';
const MERKKI_SEIS = '<svg class="merkki" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">'
  + '<rect x="7" y="7" width="10" height="10" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.7"/>'
  + '</svg>';

/*
 * Aiheliuskojen kuvakkeet.
 *
 * Omistajan toive: "liuskan otsikot ehkä kuvakkeina että mahtuu yhteen
 * riviin." Yhdeksän suomenkielistä sanaa vie puhelimella kolme riviä;
 * yhdeksän kuvaketta mahtuu yhdelle.
 *
 * Piirretty samalla ohuella kynällä kuin kartta ja muut viivaikonit:
 * pelkkä ääriviiva nykyisellä tekstivärillä, ei täyttöä.
 *
 * Jokaisella liuskalla on silti nimi — se on napin aria-label ja
 * title, ja se lukee avatun liuskan alla otsikkona. Pelkkä kuvake
 * ilman nimeä jättäisi arvailun varaan, ja arvailu on sitä
 * todennäköisempää mitä pienempi kuvake on.
 */
const AIHE_IKONIT = {
  historia: '<path d="M7 3.6h10M7 20.4h10M8 3.6c0 4 4 5.6 4 8.4s-4 4.4-4 8.4M16 3.6c0 4-4 5.6-4 8.4s4 4.4 4 8.4"/>',
  kuvataide: '<path d="M4.4 19.6 14 10l1.9 1.9-9.6 9.6zM4.4 19.6l-.9 2.9 2.9-.9"/><path d="m15.9 8.1 2.4-2.4a1.7 1.7 0 0 1 2.4 2.4l-2.4 2.4z"/>',
  kirjallisuus: '<path d="M5 20.5c3-7.5 8-12.5 14.5-16.5-1 7-4.5 12-9.5 15"/><path d="M5 20.5c1.5-1 3.5-1.5 5-1.5"/>',
  musiikki: '<path d="M9 18.5V6.2l9-1.7v11.3"/><circle cx="6.8" cy="18.6" r="2.2"/><circle cx="15.8" cy="15.9" r="2.2"/>',
  ruoka: '<path d="M3.5 11.5h17c0 4.4-3.8 7-8.5 7s-8.5-2.6-8.5-7z"/><path d="M2.5 21h19"/><path d="M9 8.4c0-1.3 1.2-1.6 1.2-2.9M12 8.4c0-1.3 1.2-1.6 1.2-2.9M15 8.4c0-1.3 1.2-1.6 1.2-2.9"/>',
  luonto: '<path d="M12 21c0-6.5 2.5-11 8-13.5C20 14 16.5 19 12 21z"/><path d="M12 21C12 14.5 9.5 10 4 7.5 4 14 7.5 19 12 21z"/><path d="M12 21v-6"/>',
  tiede: '<path d="M9.5 3.5h5M10.5 3.5v6L5.5 19a1.6 1.6 0 0 0 1.4 2.4h10.2A1.6 1.6 0 0 0 18.5 19l-5-9.5v-6"/><path d="M7.8 15.4h8.4"/>',
  nykytaide: '<path d="M4 20.5 12 4l8 16.5z"/><path d="M8.2 13h7.6"/>',
  huumori: '<path d="M3.6 8.4c2.8-1.6 5.6-1.6 8.4 0 2.8-1.6 5.6-1.6 8.4 0-.4 5.2-2.6 8.4-4.8 8.4-1.6 0-2.6-1.4-3.6-1.4s-2 1.4-3.6 1.4c-2.2 0-4.4-3.2-4.8-8.4z"/><circle cx="8" cy="11.4" r="1"/><circle cx="16" cy="11.4" r="1"/>',
  // Varaliuska kaupungeille, joilla on vain litteä nostolista.
  elama: '<circle cx="12" cy="12" r="4.2"/><path d="M12 3.4v2.4M12 18.2v2.4M3.4 12h2.4M18.2 12h2.4M5.9 5.9l1.7 1.7M16.4 16.4l1.7 1.7M18.1 5.9l-1.7 1.7M7.6 16.4l-1.7 1.7"/>',
  // Yleiskuvake aiheelle, jolle ei ole omaa: kirjanmerkki. Ilman tätä
  // tuntematon aihe-id piirtyisi leveänä tekstinappina ja rikkoisi
  // yhden rivin kuvakerivin.
  muu: '<path d="M7 3.6h10v16.8l-5-3.4-5 3.4z"/>',
};

/**
 * Toimintonappien viivaikonit: emoji erottui kartan mustepiirroksesta,
 * joten ikonit piirretään samalla kynällä kuin kartta — pelkkä ääriviiva
 * nykyisellä tekstivärillä. Nopan silmät ovat ainoa täytetty muoto.
 */
const VIIVA_IKONIT = {
  saapas: '<path d="M7 3.5h4.4v8.2c0 .9.6 1.7 1.5 2l4.8 1.6c1.4.5 2.3 1.3 2.3 2.4 0 .8-.6 1.4-1.4 1.4H8.6c-.9 0-1.6-.7-1.6-1.6z"/><path d="M7 6h4.4M7 8.2h4.4M4 20.6h16.5"/>',
  purje: '<path d="M11 5.4 6 13.6h5zM13 4.2l5.6 9.4H13z"/><path d="M4.6 16.2h14.8l-2 3.4H6.6zM12 13.6v2.6"/>',
  suurennuslasi: '<circle cx="9.8" cy="9.8" r="5.6"/><path d="M13.9 13.9 20 20"/>',
  /*
   * Silmälasit linssivalitsimelle. Suurennuslasi oli siinä ennen, mutta
   * se on jo Tutki-napissa — sama kuvake kahdessa eri toiminnossa on
   * pahempi kuin osuva ja tylsä (omistaja: "suurennuslasikuvake on jo
   * toisessa napissa"). Lasit sopivat myös nimeen: linssit ovat pelissä
   * TAIKALASIT, eivät suurennuslaseja.
   */
  taikalasit: '<circle cx="6.9" cy="13.6" r="3.5"/><circle cx="17.1" cy="13.6" r="3.5"/>'
    + '<path d="M10.4 13.2c1-.8 2.2-.8 3.2 0"/>'
    + '<path d="M3.5 12.2 2.1 9.2M20.5 12.2 21.9 9.2"/>',
  /*
   * VARUSTEET: matkareppu läppineen ja solkineen.
   *
   * Valikon nimi vaihtui taikalaseista varusteiksi (omistaja 5.8.2026),
   * ja kuvakkeen oli vaihduttava mukana: lasit ovat yksi väline, ja
   * valikossa on jo radio ja kartta-aiheiset linssit. Reppu on se, mistä
   * välineet otetaan — sama esine kuin pelin matkalaukku mutta selässä,
   * eli se ei sekoitu ylärivin kukkaroon.
   *
   * Ei kompassia: se on jo kartan piirroksessa ja omana ikoninaan.
   */
  varusteet: '<path d="M9.2 8.4V6.9a2.8 2.8 0 0 1 5.6 0v1.5"/>'
    + '<rect x="4.6" y="8.4" width="14.8" height="12" rx="3.4"/>'
    + '<path d="M4.7 14.6h14.6"/>'
    + '<rect x="10.4" y="13.1" width="3.2" height="3.8" rx="1.1"/>',
  noppa: '<rect x="3.6" y="3.6" width="16.8" height="16.8" rx="3.2"/><g class="taytto"><circle cx="8.2" cy="8.2" r="1.25"/><circle cx="15.8" cy="8.2" r="1.25"/><circle cx="12" cy="12" r="1.25"/><circle cx="8.2" cy="15.8" r="1.25"/><circle cx="15.8" cy="15.8" r="1.25"/></g>',
  kompassi: '<circle cx="12" cy="12" r="8.4"/><path d="M12 5.8 14.3 12 12 18.2 9.7 12z"/><circle class="taytto" cx="12" cy="12" r="1"/>',
  nuoli: '<path d="M9.5 6.2 5 10.6l4.5 4.4"/><path d="M5 10.6h9.2a4.6 4.6 0 1 1 0 9.2H9.5"/>',
  kone: '<path d="M12 3.6v5.9l7.6 4.6v2.1L12 13.7v4.4l2.4 1.9v1.6L12 20.5l-2.4 1.1V20l2.4-1.9v-4.4L4.4 16.2v-2.1L12 9.5z"/>',
  tahti: '<path d="m12 3.8 2.5 5.2 5.5.7-4 3.9 1 5.6-5-2.7-5 2.7 1-5.6-4-3.9 5.5-.7z"/>',
  passi: '<rect x="5.5" y="3.5" width="13" height="17" rx="2"/><circle cx="12" cy="10.3" r="2.9"/><path d="M8.6 16.6h6.8"/>',
  paivita: '<path d="M19.4 4.8v3.7h-3.7"/><path d="M19.2 8.4a7.4 7.4 0 1 0 1 5.4"/>',
  kallo: '<path d="M12 3.8c-3.9 0-6.5 2.7-6.5 6.1 0 2 .9 3.3 2.1 4.2v2.5h8.8v-2.5c1.2-.9 2.1-2.2 2.1-4.2 0-3.4-2.6-6.1-6.5-6.1z"/><g class="taytto"><circle cx="9.6" cy="10.1" r="1.3"/><circle cx="14.4" cy="10.1" r="1.3"/></g><path d="M10.3 16.6v2.4M13.7 16.6v2.4"/>',
  kenka: '<path d="M5.2 19.6h4.3v-3.2a5.7 5.7 0 1 1 5 0v3.2h4.3"/>',
  kukkaro: '<path d="M9.6 6.9 8.3 4.2h7.4L14.4 6.9"/><path d="M9.6 6.9h4.8c2.5 1.6 4.1 4.2 4.1 7 0 3.3-2.5 5.4-6.5 5.4s-6.5-2.1-6.5-5.4c0-2.8 1.6-5.4 4.1-7z"/>',
  estetty: '<circle cx="12" cy="12" r="8.4"/><path d="M6.3 6.3l11.4 11.4"/>',
  ankkuri: '<circle cx="12" cy="5" r="1.8"/><path d="M12 6.8v12.6M8.7 9.6h6.6"/><path d="M5.2 13.8c.3 3.9 3.2 6.3 6.8 6.3s6.5-2.4 6.8-6.3"/><path d="M5.2 13.8 3.5 12.6M18.8 13.8l1.7-1.2"/>',
  mitali: '<path d="M9.6 3.6 8.2 9.2M14.4 3.6l1.4 5.6"/><circle cx="12" cy="14.4" r="5.2"/><circle class="taytto" cx="12" cy="14.4" r="1.1"/>',
  // Kaiutin ääniaaltoineen — aloitussivun ääniviihje.
  kaiutin: '<path d="M4.2 9.3h3.2l4.4-3.6v12.6l-4.4-3.6H4.2z"/><path d="M14.8 9.4a3.7 3.7 0 0 1 0 5.2"/><path d="M17.4 6.9a7.3 7.3 0 0 1 0 10.2"/>',
};

/*
 * Linssivalitsimen oma kuvake: sama suurennuslasi kuin Tutki-napissa,
 * yliviivattuna. Se on valitsimen "Ei linssiä" -rivi, ja siksi se on
 * piirretty samalla kynällä kuin linssien omat kuvakkeet — rivien on
 * oltava keskenään samaa sarjaa, tai valinta näyttää sekalaiselta.
 */
/**
 * Viivaikoni omaksi SVG-elementikseen annetussa koossa.
 *
 * Linssimoduulit antavat kuvakkeensa 24 × 24 -polkuina ilman <svg>-kuorta
 * (sama muoto kuin VIIVA_IKONIT). Matkalaukku tarvitsee niistä isomman
 * version tavaroiden riveille, ja tämä on se kuori.
 */
function viivaIkoniSvg(polut, koko = 44) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(koko));
  svg.setAttribute('height', String(koko));
  svg.setAttribute('class', 'viiva-ikoni-kuva');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = polut;
  return svg;
}

const LINSSI_EI_IKONI = `${VIIVA_IKONIT.taikalasit}<path d="M5.4 5.4 20 20"/>`;

/**
 * Liuskanapin kuvake. Sama kuori kuin aiheliuskoilla (rakennaLiuskat):
 * linssimoduulit antavat kuvakkeensa täsmälleen samassa muodossa,
 * 24×24-polkuina ilman <svg>-kuorta.
 */
function liuskaIkoniSvg(piirto, koko = 19) {
  return `<svg viewBox="0 0 24 24" width="${koko}" height="${koko}" aria-hidden="true" fill="none"
       stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
       stroke-linejoin="round">${piirto}</svg>`;
}

/** Viivaikoni ikonin nimellä — tai null, jos nimi onkin tekstimerkki. */
function viivaIkoni(nimi) {
  const piirto = VIIVA_IKONIT[nimi];
  if (!piirto) return null;
  const span = html('span', 'icon-glyph viiva-ikoni');
  span.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${piirto}</svg>`;
  return span;
}

/**
 * Lyhentää Wikipedian tiivistelmän saapumiskortin parin lauseen esittelyksi.
 * Suomen järjestysluvut ("3. suurin") voivat katkaista lauseen liian
 * aikaisin — se on harvinaista ja lopputulos on silti luettava.
 */
function shortIntro(text, maxChars = 280, maxSentences = 3) {
  const siisti = String(text).replace(/\s+/g, ' ').trim();
  const lauseet = siisti.match(/[^.!?]+[.!?]+/g);
  if (!lauseet) {
    return siisti.length > maxChars ? `${siisti.slice(0, maxChars).trimEnd()}…` : siisti;
  }
  let esittely = '';
  let maara = 0;
  for (const lause of lauseet) {
    if (maara && (maara >= maxSentences || esittely.length + lause.length > maxChars)) break;
    esittely += lause;
    maara++;
  }
  return esittely.trim();
}

/*
 * ══════════════════════════════════════════════════════════════════════
 * TUTKI-SIVUN TYPOGRAFIA: LEHTIMÄINEN LEIPÄTEKSTI
 * ══════════════════════════════════════════════════════════════════════
 *
 * Omistaja: "Se on tällä hetkellä vaivalloinen lukea, kun tekstiä on niin
 * paljon." Ja: "tekstiä pitäisi vähän elävöittää poldauksilla tai muilla
 * nostoilla, niin kuin lehdessä."
 *
 * Kaksi vikaa, jotka näkyvät jo mitasta. Yhden kategorian sivulla on
 * 4–7 nostoa à noin 500–650 merkkiä eli kolmisen tuhatta merkkiä
 * yhtenäistä tekstiä — ja se oli KIRJOITUSKONEKIRJASIMELLA yhtenä
 * kappaleena nostoa kohti. Kirjoituskone on oikea valinta otsikoihin ja
 * nappeihin, mutta pitkän leipätekstin lukeminen sillä on työlästä:
 * tasalevyinen kirjasin ei anna sanoille muotoa, josta silmä tunnistaa
 * ne vilkaisulla.
 *
 * Tämä funktio tekee tekstille kolme lehdestä tuttua asiaa:
 *
 *   1. KAPPALEJAKO. Virkkeet jaetaan kahteen kappaleeseen suunnilleen
 *      puolivälistä. Yksi tekstimuuri muuttuu kahdeksi luettavaksi
 *      palaksi ilman että sanoihin kosketaan.
 *   2. LIHAVOITU ALOITUS. Ensimmäiset sanat lihavana — se on lehden vanha
 *      keino tarttua lukijaan, ja juuri se "poldaus", jota omistaja
 *      pyysi. Sanamäärä on kiinteä eikä valittu sisällön mukaan: kone ei
 *      osaa päättää, mikä kohta on tärkeä, mutta alku on aina alku.
 *   3. ANFANGI ensimmäiseen kappaleeseen sivulla (vain kerran, ks.
 *      kutsuja) — aukeaman avaus.
 */
const LEIPAN_ALOITUS_SANOJA = 4;

/*
 * VIRKEJAKO, JOKA OSAA SUOMEA.
 *
 * Ensimmäinen versio katkaisi jokaisesta pisteestä, ja se meni heti
 * pieleen: suomen JÄRJESTYSLUVUSSA on piste. Teksti "…10. kesäkuuta 1735
 * astui voimaan laki…" katkesi luvun jälkeen, ja sivun sitaattinosto
 * alkoi keskeltä virkettä sanalla "kesäkuuta" — nähtiin esikatselussa
 * ennen julkaisua.
 *
 * Piste päättää virkkeen vain, jos sen edellä EI ole numeroa
 * (järjestysluku, päivämäärä, mitta) ja sen jälkeen tulee väli ja iso
 * kirjain tai lainausmerkki.
 *
 * Ei takaumakatsetta (lookbehind): sitä ei ole vanhemmissa iOS-Safareissa,
 * ja tämä on peli, jota pelataan puhelimella. Silmukka on yhtä tarkka.
 */
const VIRKKEEN_ALKU = /[0-9A-ZÅÄÖÜÉ"\u201C\u00AB]/;

function virkkeiksi(teksti) {
  const t = String(teksti ?? '');
  const ulos = [];
  let alku = 0;
  for (let i = 0; i < t.length; i++) {
    const merkki = t[i];
    if (merkki !== '.' && merkki !== '!' && merkki !== '?') continue;
    if (merkki === '.' && /[0-9]/.test(t[i - 1] ?? '')) continue;
    const osuma = /^\s+(.)/.exec(t.slice(i + 1));
    if (!osuma) break;
    if (!VIRKKEEN_ALKU.test(osuma[1])) continue;
    ulos.push(t.slice(alku, i + 1).trim());
    alku = i + 1;
  }
  if (alku < t.length) ulos.push(t.slice(alku).trim());
  return ulos.filter(Boolean);
}

function jaaKappaleiksi(teksti) {
  const virkkeet = virkkeiksi(teksti);
  if (virkkeet.length < 3) return [String(teksti ?? '').trim()].filter(Boolean);
  const puoli = Math.ceil(virkkeet.length / 2);
  return [virkkeet.slice(0, puoli).join(' '), virkkeet.slice(puoli).join(' ')].filter(Boolean);
}

function piirraLeipa(kohde, teksti, { anfangi = false } = {}) {
  const kappaleet = jaaKappaleiksi(teksti);
  /*
   * Kappaleet kääritään yhteen lohkoon, jotta leipäteksti voidaan
   * taittaa leveällä ruudulla kahdelle palstalle YHTENÄ juoksuna
   * (omistajan toive 5.8.2026) — palstoitus kappale kerrallaan
   * katkeaisi kahdeksi erilliseksi palstapariksi.
   */
  const leipa = html('div', 'leipa');
  kohde.appendChild(leipa);
  kohde = leipa;
  kappaleet.forEach((kappale, i) => {
    const p = html('p', i === 0 ? 'teksti ensimmainen' : 'teksti');
    if (i === 0 && anfangi) p.classList.add('anfangi');
    if (i === 0) {
      // Lihavoitu aloitus omaksi elementikseen; loppu jää tavalliseksi.
      const sanat = kappale.split(' ');
      const alku = sanat.slice(0, LEIPAN_ALOITUS_SANOJA).join(' ');
      const loppu = sanat.slice(LEIPAN_ALOITUS_SANOJA).join(' ');
      p.appendChild(html('strong', 'leipa-aloitus', alku));
      if (loppu) p.appendChild(document.createTextNode(` ${loppu}`));
    } else {
      p.textContent = kappale;
    }
    kohde.appendChild(p);
  });
  return leipa;
}

/**
 * Sivun oma nosto: yksi virke lehden tapaan isolla väliin.
 *
 * KERRAN SIVUA KOHTI eikä joka nostossa. Sitaattinosto toistaa virkkeen,
 * joka on jo tekstissä — se on lehden tapa ja lukija tunnistaa sen, mutta
 * seitsemän kertaa peräkkäin se olisi pelkkää toistoa. Valinta on pisin
 * virke, koska lyhyt virke nostettuna näyttää irralliselta.
 *
 * VIRKE OTETAAN ENSIMMÄISESTÄ NOSTOSTA, ja nosto sijoitetaan sen JÄLKEEN.
 * Ensimmäinen esikatselu otti virkkeen mistä tahansa, ja se osui juuri
 * seuraavaan nostoon: sitaatti luki saman lauseen, joka alkoi kahden
 * rivin päästä uudestaan. Lehdessä nosto kaikuu sitä, minkä lukija on jo
 * lukenut — ei sitä, mitä hän on juuri lukemassa.
 */
function poimiNostoVirke(nostot) {
  let paras = '';
  for (const nosto of nostot ?? []) {
    for (const virke of virkkeiksi(nosto.teksti)) {
      if (virke.length > paras.length && virke.length <= 170) paras = virke;
    }
  }
  return paras;
}

export class UI {
  constructor(game, { onNewGame, onChange }) {
    this.game = game;
    this.onNewGame = onNewGame;
    this.onChange = onChange;
    this.botTimer = null;

    this.svg = document.getElementById('board');
    this.hint = document.getElementById('board-hint');
    this.turnPill = document.getElementById('turn-pill');
    this.turnStatus = document.getElementById('turn-status');
    this.dieEl = document.getElementById('die');
    this.actionsEl = document.getElementById('actions');
    this.errorEl = document.getElementById('error');
    this.passportDialog = document.getElementById('passport-dialog');
    this.passportAarteet = document.getElementById('passport-aarteet');
    this.passportFinds = document.getElementById('passport-finds');
    this.passportProgress = document.getElementById('passport-progress');

    /*
     * Laukun alalaidan nimikilpi avaa lähdeikkunan.
     *
     * Kaksi <dialog>-modaalia päällekkäin jättäisi alemman
     * taustahimmennyksen päälle (sama ansa kuin päivityslokissa,
     * js/main.js), joten laukku suljetaan ensin. Sulkeminen ei hävitä
     * mitään: laukku rakennetaan uudelleen joka avauksella.
     */
    this.lahteetDialog = document.getElementById('lahteet-dialog');
    this.lahteetSisus = document.getElementById('lahteet-sisus');
    /*
     * Ylärivin logo avaa tekijätiedot ja lähdeluettelon (omistajan toive
     * 5.8.2026). Linkki oli ennen matkalaukun alalaidassa nimikilpenä,
     * eli kahden napautuksen takana ja väärässä paikassa: laukku on
     * pelaajan tavaroita varten, ei pelin tekijöitä.
     *
     * Laukkua ei enää tarvitse sulkea ennen avausta — logo on kartalla
     * eikä laukun sisällä, joten kahden modaalin päällekkäisyyttä ei
     * synny.
     */
    document.getElementById('brand-btn')?.addEventListener('click', () => {
      this.avaaLahteet();
    });

    /*
     * Napautus laukun ulkopuolelle sulkee sen.
     *
     * Sulje-nappi poistui (omistaja: "se on turha kun voi klikata vain
     * karttaa"), joten tämä on nyt ainoa hiiriele ulos. Modaalin
     * taustakerros on osa <dialog>-elementtiä itseään, joten napautus
     * kortin vierestä osuu dialogiin — kortin sisällä osuu korttiin.
     */
    this.passportDialog?.addEventListener('click', (e) => {
      if (e.target === this.passportDialog) this.passportDialog.close();
    });

    this.turnCard = document.getElementById('actions').closest('.turn-card');
    this.introEl = document.getElementById('intro');
    this.introText = document.getElementById('intro-text');
    // Avausteksti kirjoittuu kahteen osaan, jotta viimeinen rivi
    // ("mistä aloitan?") voidaan lihavoida ilman että itse tekstiä
    // muutetaan (INTRO_TEXT on omistajan lukitsema).
    this.introRunko = document.getElementById('intro-runko');
    this.introLopetus = document.getElementById('intro-lopetus');

    this.arrivalDialog = document.getElementById('arrival-dialog');
    this.arrivalCity = document.getElementById('arrival-city');
    this.arrivalImage = document.getElementById('arrival-image');
    // Kuvan galleria selattavana jo pikkukoossa: hento laskuri ja
    // nuolet (omistajan toive). Suurennos aukeaa selatusta kohdasta.
    this.arrivalKuvakotelo = document.getElementById('arrival-kuvakotelo');
    this.arrivalKuvaLaskuri = document.getElementById('arrival-kuva-laskuri');
    this.arrivalKuvat = [];
    this.arrivalKuvaKohdalla = 0;
    this.arrivalImage.addEventListener('click', () => {
      const city = this.game.board.cityById.get(this.arrivalShownFor);
      if (city?.wiki) this.openLightbox(city.wiki, city.name, this.arrivalImage.src || null);
    });
    const selaaKuvaa = (askel) => {
      if (this.arrivalKuvat.length < 2) return;
      this.arrivalKuvaKohdalla = (this.arrivalKuvaKohdalla + askel
        + this.arrivalKuvat.length) % this.arrivalKuvat.length;
      this.arrivalImage.src = this.arrivalKuvat[this.arrivalKuvaKohdalla].src;
      this.paivitaKuvaLaskuri();
    };
    document.getElementById('arrival-kuva-edellinen')
      .addEventListener('click', (e) => { e.stopPropagation(); selaaKuvaa(-1); });
    document.getElementById('arrival-kuva-seuraava')
      .addEventListener('click', (e) => { e.stopPropagation(); selaaKuvaa(1); });
    this.arrivalImage.addEventListener('error', () => {
      this.pudotaRikkiKuva(this.arrivalKuvat, this.arrivalImage, 'arrival');
    });
    this.arrivalIntro = document.getElementById('arrival-intro');
    this.arrivalWiki = document.getElementById('arrival-wiki');
    this.arrivalWiki.addEventListener('click', () => this.openWiki(this.arrivalShownFor));
    // Maan tiedot kaupungin rinnalla: lohko täyttyy openArrivalissa.
    this.arrivalMaa = document.getElementById('arrival-maa');
    this.arrivalMaaNimi = document.getElementById('arrival-maa-nimi');
    this.arrivalMaaIntro = document.getElementById('arrival-maa-intro');
    this.arrivalMaaKartta = document.getElementById('arrival-maa-kartta');
    this.arrivalMaaTunnusluvut = document.getElementById('arrival-maa-tunnusluvut');
    // Uutisotsikot maaosastossa (vaatii omistajan uutisvälityksen).
    this.arrivalUutiset = document.getElementById('arrival-uutiset');
    // Mediarivi: maan radio ja tv-kanavan suora lähetys.
    this.arrivalMedia = document.getElementById('arrival-media');
    // Kaupunkilehden oma mediarivi (ks. paivitaMediarivit).
    this.arrivalMediaKaupunki = document.getElementById('arrival-media-kaupunki');
    this.arrivalMaaTervehdykset = document.getElementById('arrival-maa-tervehdykset');
    // Lippu näytetään vasta kun se on oikeasti latautunut — ilman verkkoa
    // riviltä ei jää rikkinäistä kuvaruutua.
    this.arrivalMaaLippu = document.getElementById('arrival-maa-lippu');
    this.arrivalMaaLippu.addEventListener('load', () => {
      this.arrivalMaaLippu.hidden = false;
    });
    this.arrivalMaaLippu.addEventListener('error', () => {
      this.arrivalMaaLippu.hidden = true;
    });
    this.arrivalMaaWiki = document.getElementById('arrival-maa-wiki');
    this.arrivalMaaWiki.addEventListener('click', () => {
      const maa = this.arrivalMaaTiedot;
      if (maa) this.openWikiArticle(maa.wiki ?? maa.nimi, maa.nimi);
    });
    // Kaupungin elämää -lohko täytetään openArrivalissa.
    this.arrivalKulttuuri = document.getElementById('arrival-kulttuuri');
    this.arrivalKulttuuriLista = document.getElementById('arrival-kulttuuri-lista');
    this.arrivalLiuskat = document.getElementById('arrival-liuskat');
    this.arrivalKategoria = document.getElementById('arrival-kategoria');
    // Kaupungin kohdekartta lehden etusivun lopussa (omistajan
    // tarkennus 7.8.2026: "kartta pitäisi olla jo ihan ensimmäisellä
    // sivulla" — aiemmin se oli kaupunki-aihesivun pohjalla).
    this.arrivalKaupunkiKartta = document.getElementById('arrival-kaupunkikartta');
    // Kaupunki- ja maapalstat: näkyvät vain lehden etusivulla.
    this.arrivalPalstat = document.querySelector('#arrival-dialog .arrival-palstat');
    // Uutiset ja mediarivi yhteisessä kääreessä (siirtyy maa-etusivulle
    // niissä maissa, joilla on oma karttasivu — ks. piirraMaaEtusivu).
    this.arrivalOikea = document.getElementById('arrival-oikea');
    // Kulmalinkki lehden etusivulta maaosion aloitussivulle (omistajan
    // toive 7.8.2026: maaosasto pois etusivulta, tilalle linkki
    // "Saksa-osio ›" oikeaan yläkulmaan).
    this.arrivalMaaLinkki = document.getElementById('arrival-maa-linkki');
    /*
     * Kulmalinkki avaa maalehden, ei enää sivua samasta pinosta.
     *
     * Ennen v350:tä maan etusivu oli kaupungin sivujen jatkona, ja
     * linkki hyppäsi sen kohdalle. Kun lehdet erotettiin, maan sivut
     * lähtivät tutkiSivut-listasta — findIndex palautti -1 eikä
     * napista tapahtunut mitään. Nyt se tekee saman kuin kartan "i":
     * avaa maalehden.
     */
    this.arrivalMaaLinkki.addEventListener('click', () => {
      if (this.tutkiMaaIso) this.avaaMaalehti(this.tutkiMaaIso);
    });
    // Lehtitaitto (omistajan toive 5.8.2026): kaupungin oma kansiosio
    // taittuu etusivulle, ja masto kertoo että käsissä on paikallislehti.
    // Lehden etusivun kuvataitto: iso pääkuva maston alla ja
    // pienempien kuvien rivi esittelytekstin jälkeen.
    this.arrivalLehtiPaakuva = document.getElementById('arrival-lehti-paakuva');
    this.arrivalLehtiKuvat = document.getElementById('arrival-lehti-kuvat');
    this.arrivalLehtiYla = document.getElementById('arrival-lehti-yla');
    this.arrivalLehtiAla = document.getElementById('arrival-lehti-ala');
    this.arrivalLehtiPvm = document.getElementById('arrival-lehti-pvm');
    // Päivän sää maston alla; napautus avaa koko vuoden graafin.
    this.arrivalSaa = document.getElementById('arrival-saa');
    this.arrivalSaa.addEventListener('click', () => this.naytaVuosiSaa());
    this.arrivalKulttuuriVisa = document.getElementById('arrival-kulttuuri-visa');
    // Visa aukeaa omasta napistaan samaan näkymään (omistajan toive):
    // nappi väistyy ja kysymys vaihtoehtoineen tulee tilalle.
    this.arrivalKulttuuriKysymys = document.getElementById('arrival-kulttuuri-kysymys');
    this.arrivalKulttuuriVaihtoehdot = document.getElementById('arrival-kulttuuri-vaihtoehdot');
    this.arrivalKulttuuriTulos = document.getElementById('arrival-kulttuuri-tulos');
    document.getElementById('arrival-yes').addEventListener('click', () => {
      // Tutki paikka vie tietovisaan: tauolle jäänyt luenta ei saa
      // jatkua kysymyksen alle. Ehto closeArrivalissa ei riitä, koska
      // visa syntyy vasta actionQuizissa — sulku ehtii ensin
      // (omistajan havainto Tangerissa).
      this.luentaTauolla = null;
      this.closeArrival();
      sfx.play('paper');
      /*
       * Kohtaamiskaupungissa hahmo esittää kysymyksen itse, joten
       * muotoarvonta (väittämä, valokuvaaja, tullimies) ohitetaan —
       * "Tapaa gondolieeri" ei saa avata tullimiestä. Isoisän pulma
       * pysyy silti etusijalla: nimetty muoto ohittaisi sen, joten
       * pulman odottaessa kutsu tehdään entiseen tapaan.
       */
      const kohtaaminen = KOHTAAMISET[this.game.cityOf()?.id];
      const pulmaOdottaa = this.game.pendingPuzzle?.();
      this.doAction(() => this.game.actionQuiz(
        kohtaaminen && !pulmaOdottaa ? { form: 'quiz' } : {},
      ));
    });
    document.getElementById('arrival-no').addEventListener('click', () => {
      this.closeArrival();
      // Kortti avataan nykyään Tutki-napista kesken vuoron, jolloin
      // sulkeminen on pelkkä paluu kartalle — päiväkirja pysyy ennallaan.
      // Vanha tallennus voi silti herätä tarjousvaiheeseen, jossa
      // sulkeminen päättää vuoron.
      if (this.game.phase === 'offer') this.doAction(() => this.game.actionSkipQuiz());
    });

    this.quizSketch = document.getElementById('quiz-sketch');
    this.quizSelite = document.getElementById('quiz-selite');
    this.quizPhoto = document.getElementById('quiz-photo');
    this.quizPhoto.addEventListener('click', () => {
      const quiz = this.game.quiz;
      // Vain kuratoitu valokuva suurena, ei artikkeligalleriaa: se
      // paljastaisi vastauksen kuvateksteissään.
      if (quiz?.photoFile) {
        this.openLightbox(null, 'Matkavalokuvaajan vedos',
          valokuvaUrl(quiz.photoFile, 1600));
      }
    });
    this.quizBadge = document.getElementById('quiz-badge');

    this.wikiDialog = document.getElementById('wiki-dialog');
    this.wikiTitle = document.getElementById('wiki-title');
    this.wikiImage = document.getElementById('wiki-image');
    this.wikiExtract = document.getElementById('wiki-extract');

    this.wikiSource = document.getElementById('wiki-source');
    // Sama galleriaselaus kuin Tutki-kortin kuvassa (omistajan toive):
    // laskuri ja nuolet Lue lisää -lehden kuvaan, suurennos aukeaa
    // selatusta kohdasta.
    this.wikiKuvakotelo = document.getElementById('wiki-kuvakotelo');
    this.wikiKuvaLaskuri = document.getElementById('wiki-kuva-laskuri');
    this.wikiKuvat = [];
    this.wikiKuvaKohdalla = 0;
    this.wikiKuvaPortaat = [];
    this.wikiImage.addEventListener('click', () => {
      if (this.wikiOpenFor) {
        this.openLightbox(this.wikiOpenFor, this.wikiTitle.textContent, this.wikiImage.src || null);
      }
    });
    const selaaWikiKuvaa = (askel) => {
      if (this.wikiKuvat.length < 2) return;
      this.wikiKuvaKohdalla = (this.wikiKuvaKohdalla + askel
        + this.wikiKuvat.length) % this.wikiKuvat.length;
      this.naytaWikiKuva(this.wikiKuvat[this.wikiKuvaKohdalla].src);
      this.paivitaWikiKuvaLaskuri();
    };
    document.getElementById('wiki-kuva-edellinen')
      .addEventListener('click', (e) => { e.stopPropagation(); selaaWikiKuvaa(-1); });
    document.getElementById('wiki-kuva-seuraava')
      .addEventListener('click', (e) => { e.stopPropagation(); selaaWikiKuvaa(1); });
    this.wikiImage.addEventListener('error', () => {
      /*
       * SUURENNOS PUUTTUU — OTETAAN SEURAAVA PORRAS, EI PUDOTETA KUVAA.
       *
       * Kuva pyydetään ensin suurimmassa koossa (naytaWikiKuva). Jos
       * sitä kokoa ei ole tehty tälle tiedostolle, Wikipedia vastaa
       * virheellä. Ilman tätä haaraa `pudotaRikkiKuva` olisi poistanut
       * aivan kelvollisen kuvan galleriasta — ja pahempaa: se ei olisi
       * edes löytänyt sitä listalta, koska osoite on eri, joten kuva
       * olisi jäänyt rikkinäiseksi ruuduksi.
       */
      if (this.wikiKuvaPortaat?.length) {
        this.wikiImage.src = this.wikiKuvaPortaat.shift();
        return;
      }
      this.pudotaRikkiKuva(this.wikiKuvat, this.wikiImage, 'wiki');
    });
    this.factImage = document.getElementById('fact-image');
    this.factImage.addEventListener('click', () => {
      if (this.factImageTitle) this.openWikiArticle(this.factImageTitle);
    });
    // Kaiutin jatkaa merkinnän luentaa siitä, mihin se pysähtyi
    // ensimmäisen virkkeen jälkeen — ja toimii myös taukonappina.
    // Vanha valokuva muistikirjan kyljessä: pikkukuva aukeaa napautuksesta
    // postikortiksi kortin viereen. Latausvirhe (esim. ei verkkoa)
    // piilottaa pikkukuvan siististi.
    this.factValokuva = document.getElementById('fact-valokuva');
    this.factValokuvaKuva = document.getElementById('fact-valokuva-kuva');
    this.factValokuvaKuva.addEventListener('error', () => {
      this.factValokuva.hidden = true;
    });
    this.factValokuva.addEventListener('click', (event) => {
      event.stopPropagation();
      this.naytaPostikortti();
    });
    this.postikorttiSulkija = (e) => {
      // Kuvapinossa napautus mihin tahansa kuvaan vaihtaa kortit päikseen;
      // pinosta pääsee pois napauttamalla karttaa eli pinon ulkopuolelle
      // (omistajan toive). Yhden kuvan kortti sulkeutuu mistä napautuksesta
      // tahansa, kuten ennenkin.
      /*
       * Pino kiertää eteenpäin, ei vaihda päikseen.
       *
       * Kahdella kuvalla vaihto riitti, mutta pinossa voi nyt olla
       * useampi (omistajan toive). Napautus nostaa seuraavan
       * päällimmäiseksi ja kiertää lopusta alkuun; pinosta pääsee pois
       * napauttamalla sen ulkopuolelle.
       */
      const kortit = this.postikortti
        ? [...this.postikortti.querySelectorAll('.postikortti-kortti')] : [];
      const kortilla = this.postikortti && e.composedPath?.().includes(this.postikortti);
      if (kortit.length > 1 && kortilla) {
        e.preventDefault();
        e.stopPropagation();
        this.postikorttiIndeksi = ((this.postikorttiIndeksi ?? 0) + 1) % kortit.length;
        kortit.forEach((k, i) => k.classList.toggle('alla', i !== this.postikorttiIndeksi));
        sfx.play('swipe');
        return;
      }
      this.suljePostikortti();
    };

    this.factKuuntele = document.getElementById('fact-kuuntele');
    this.factKuuntele.addEventListener('click', () => {
      const audio = this.diaryVoice;
      if (audio) {
        if (audio.paused) {
          audio.jatkettu = true; // automaattinen pysäytys ei enää koske
          audio.play().catch(() => {});
        } else {
          audio.pause();
        }
        return;
      }
      // Ääni ehti sulkeutua (esim. korttien vaihto) — aloitetaan alusta.
      if (this.diaryFullUrl) this.playDiaryVoice(this.diaryFullUrl);
    });

    this.eventDialog = document.getElementById('event-dialog');
    this.eventText = document.getElementById('event-text');
    this.eventEffect = document.getElementById('event-effect');
    document.getElementById('event-ok').addEventListener('click', () => {
      if (this.eventDialog.open) this.eventDialog.close();
      this.eventShownFor = null;
      sfx.play('paper');
      this.doAction(() => this.game.closeEvent());
    });

    this.factVoiceEl = document.getElementById('fact-voice');
    this.factPlace = document.getElementById('fact-place');
    this.factText = document.getElementById('fact-text');
    this.factCard = this.factText.closest('.fact-card');
    this.factKey = null;
    // Jatkuu-vihje: nuoli ja häivytys näkyvät, kun tekstiä on näkymän
    // alapuolella. Tarkkailija kattaa myös kirjoituskoneen etenemisen,
    // joten vihje syttyy heti kun teksti kasvaa yli näkymän.
    this.factTekstiRivi = this.factText.closest('.fact-teksti-rivi');
    const jatkuuVihje = () => {
      const el = this.factText;
      const jatkuu = el.scrollHeight - el.clientHeight - el.scrollTop > 6;
      this.factTekstiRivi?.classList.toggle('jatkuu', jatkuu);
      // Vieritettäessä pikkukuva väistyy, ettei teksti katoa sen alle
      // (omistajan havainto) — alkuun palatessa kuva palaa paikalleen.
      this.factTekstiRivi?.classList.toggle('vieritetty', el.scrollTop > 4);
    };
    this.paivitaJatkuuVihje = jatkuuVihje;
    this.factText.addEventListener('scroll', jatkuuVihje, { passive: true });
    new MutationObserver(jatkuuVihje)
      .observe(this.factText, { childList: true, characterData: true, subtree: true });

    /*
     * PÄIVÄKIRJALLA EI OLE ENÄÄ VÄLIKOKOA (omistajan päätös 7.8.2026):
     * "matkakirja voisi avautua jatkossa kokonaan, koska se pienenee
     * kätevästi kokonaan kun karttaa liikuttaa. eli sen välikoon voisi
     * ottaa pois kokonaan."
     *
     * Kokoja oli kolme: yhden rivin nimilappu, viiden rivin ikkuna ja
     * napautuksella auki levitetty kortti. Keskimmäinen poistui, joten
     * merkintä näkyy heti kokonaan eikä sitä tarvitse avata erikseen —
     * ja kartan liike kutistaa kortin edelleen yhdelle riville.
     * Tekstirivin napautuskuuntelija poistui samalla: sillä ei ole
     * enää kokoa vaihdettavanaan.
     *
     * Vieritys jää varalle: jos merkintä ei mahdu kortin kattoon
     * (74 dvh), teksti vierii kuten ennenkin ja jatkuu-nuoli kertoo
     * siitä.
     */

    /*
     * Yhden rivin päiväkirja: koko kortti on painike.
     *
     * Kutistuneena kortista näkyy vain kaupungin nimi (.fact-place), ja
     * kaikki muu on kartan päällä tieltä pois. Napautus mihin tahansa
     * kohtaan lappua palauttaa tavallisen ikkunan — kortin omat napit ja
     * tekstirivi eivät silloin ota napautuksia vastaan lainkaan (css:n
     * pointer-events), joten tähän ei tarvita nappisuodatusta.
     *
     * stopPropagation on tässä tahallinen: kutistunut lappu on pieni,
     * mutta se on kartan päällä, ja sen oma napautus ei saa jatkaa
     * kartalle napautuszoomaukseksi.
     */
    this.factCard.addEventListener('click', (e) => {
      if (!this.factCard.classList.contains('pieni')) return;
      e.stopPropagation();
      this.asetaPaivakirjanKoko(false);
    });
    // Sama näppäimistöltä: kutistuneena kortilla on role="button" ja
    // tabindex, joten sen kuuluu totella myös Enteriä ja välilyöntiä.
    this.factCard.addEventListener('keydown', (e) => {
      if (!this.factCard.classList.contains('pieni')) return;
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      e.preventDefault();
      e.stopPropagation();
      this.asetaPaivakirjanKoko(false);
    });

    this.winnerDialog = document.getElementById('winner-dialog');
    this.quizDialog = document.getElementById('quiz-dialog');
    this.quizCity = document.getElementById('quiz-city');
    this.quizQuestion = document.getElementById('quiz-question');
    // Kohtaamisen tervehdys kysymyksen yllä (js/packs/kohtaamiset.js).
    this.quizKohtaaminen = document.getElementById('quiz-kohtaaminen');
    this.quizIsoisa = document.getElementById('quiz-isoisa');
    this.quizIsoisaTeksti = document.getElementById('quiz-isoisa-teksti');
    // Tervehdys luetaan kerran per kaupunki ja istunto — toistuvassa
    // käynnissä hahmo menee suoraan asiaan.
    this.kohtaamisetNahty = new Set();
    this.quizOptions = document.getElementById('quiz-options');
    this.quizResult = document.getElementById('quiz-result');
    this.quizHintText = document.getElementById('quiz-hint-text');
    this.quizFifty = document.getElementById('quiz-5050');
    this.quizFifty.addEventListener('click', () => {
      if (this.game.phase === 'duel') {
        sfx.play('robber');
        this.doAction(() => this.game.actionDuelRelief());
        return;
      }
      sfx.play('swipe');
      this.doAction(() => this.game.actionFiftyFifty());
    });
    this.quizHint = document.getElementById('quiz-hint');
    this.quizHint.addEventListener('click', () => {
      if (this.game.phase === 'duel') {
        sfx.play('coin');
        this.doAction(() => this.game.actionDuelBypass());
        return;
      }
      sfx.play('hint');
      this.doAction(() => this.game.actionHint());
    });

    // Tiimalasi
    this.quizTimerEl = document.getElementById('quiz-timer');
    this.quizSeconds = document.getElementById('quiz-seconds');
    this.hourglass = document.getElementById('hourglass');
    this.hgTopSand = document.getElementById('hg-top-sand');
    this.hgBottomSand = document.getElementById('hg-bottom-sand');
    this.hgStream = document.getElementById('hg-stream');
    this.quizTimer = null;
    this.timedQuiz = null;
    this.quizContinue = document.getElementById('quiz-continue');
    this.quizContinue.addEventListener('click', () => this.doAction(() => (
      this.game.phase === 'duel' ? this.game.closeDuel() : this.game.closeQuiz()
    )));

    // Lappu sulkeutuu myös taustaa — siis karttaa — napauttamalla, ettei
    // sulkunappia tarvitse etsiä; tietovisassa sellaista ei edes ole.
    // Napautus vastaa lapun kevyintä poistumistietä (sulje / Jatka matkaa).
    this.lappuTausta = (event) => {
      if (event.target === event.currentTarget) this.suljeLappu(event.currentTarget);
    };
    // Esc kulkee samaa polkua: selaimen oletus sulkisi lapun päivittämättä
    // pelitilaa, ja peli jäisi jumiin kysymys- tai tapahtumavaiheeseen.
    this.lappuPeruutus = (event) => {
      event.preventDefault();
      this.suljeLappu(event.currentTarget);
    };
    this.taustaLaput = [
      this.arrivalDialog, this.wikiDialog, this.eventDialog, this.passportDialog,
      this.quizDialog, this.winnerDialog, document.getElementById('rules-dialog'),
      // Lähdeikkuna ei vie pelitilaa eteenpäin, joten sille riittää
      // suljeLappun viimeinen haara: paperin kahina ja close(). Esc
      // sulkee sen selaimen omalla oletuksella.
      this.lahteetDialog,
    ];
    for (const lappu of this.taustaLaput) lappu.addEventListener('click', this.lappuTausta);
    this.peruutusLaput = [this.quizDialog, this.eventDialog, this.arrivalDialog];
    for (const lappu of this.peruutusLaput) lappu.addEventListener('cancel', this.lappuPeruutus);

    this.mapPane = this.svg.parentElement;
    /*
     * Kartan napautus kutistaa päiväkirjan yhden rivin lapuksi
     * (omistajan toive; v317 asti se kutisti auki levitetyn kortin
     * viiden rivin ikkunaan, jota ei enää ole). Näin kartan saa
     * näkyviin myös napauttamalla, ei vain liikuttamalla.
     *
     * Kuuntelija on kartta-alueella, jonka päällä kortit vain
     * kelluvat, joten kortin oma napautus ei osu tähän.
     */
    this.mapPane.addEventListener('click', () => this.asetaPaivakirjanKoko(true));

    // Zoomipainikkeet. Napautus ei saa vuotaa kartalle asti: mapPanen
    // oma kuuntelija kutistaisi päiväkirjan ja maailmankartalla
    // napautuszoomaus veisi näkymän muualle.
    this.zoomiKuuntelijat = [];
    for (const [id, suunta] of [['zoom-in', 1], ['zoom-out', -1]]) {
      const nappi = document.getElementById(id);
      if (!nappi) continue;
      const kasittele = (e) => {
        e.stopPropagation();
        this.zoomaaPainikkeella(suunta);
      };
      nappi.addEventListener('click', kasittele);
      this.zoomiKuuntelijat.push([nappi, kasittele]);
    }

    /*
     * Maiden lehdet -nappi (omistajan havainto 8.8.2026: *"Kartalta
     * pitäisi päästä myös"*).
     *
     * Sama kartan tila kuin Maiden tiedot -varusteella, mutta ilman
     * varustetta: maalehti on hakuteos, ja hakuteokseen pitää päästä
     * käsiksi ensimmäisestä pelihetkestä alkaen. Varuste jää
     * ennalleen — omistaja päättää myöhemmin, mikä siitä tulee
     * (docs/tutki-aiheet.md).
     */
    const maaNappi = document.getElementById('maalehti-nappi');
    if (maaNappi) {
      maaNappi.addEventListener('click', (e) => {
        e.stopPropagation();
        this.maaNappiPaalla = !this.maaNappiPaalla;
        sfx.play('paper');
        this.tahdistaMaatiedot(this.maatiedotHalutaan());
        this.paivitaMaalehtiNappi();
      });
    }

    /*
     * Linssivalitsin ylärivissä (docs/linssit-suunnitelma.md luku 5.1).
     *
     * Kotelo on index.html:ssä valmiina mutta piilossa: nappi ilmestyy
     * vasta kun pelaaja omistaa ensimmäisen linssin, joten uudelle
     * pelaajalle ylärivi pysyy tarkalleen entisellään. Sisältö
     * rakennetaan täällä, koska valikoima riippuu sekä omistuksesta
     * että laudasta.
     *
     * Valitsin on YLÄRIVISSÄ eikä kartan reunassa: @media (pointer:
     * coarse) and (hover: none) piilottaa .zoomin kokonaan, ja sama
     * sääntö veisi valitsimen juuri iPadilta, jolla peliä eniten
     * pelataan (suunnitelman riski 10).
     */
    this.linssiKotelo = document.getElementById('linssi-kotelo');
    /*
     * Varusteet ovat päävalikossa auki valmiiksi (omistajan toive
     * 5.8.2026), joten avausnappia ja sen kuvaketta ei enää ole.
     * Kenttiin jäi null, ja ne on jätetty näkyviin, koska useampi
     * paikka tarkistaa ne — tyhjä viittaus kertoo että nappi puuttuu
     * tarkoituksella eikä vahingossa.
     */
    this.linssiNappi = null;
    this.linssiNapinIkoni = null;
    this.linssiValikko = document.getElementById('linssi-valikko');
    this.linssiTuki = null; // moottori ja omistus, kun dynaaminen tuonti onnistui
    /*
     * Maailmanradio talteen synkronisesti: drawTargets kysyy tilaa
     * kesken piirron eikä voi odottaa lupausta.
     */
    this.radioModuuli = null;
    this.radioLataus = null;
    this.radioAani = null;
    this.linssiLataus = null; // kesken oleva tuonti; jaetaan kaikille kutsujille
    this.linssiValittu = tallennettuLinssi();
    this.linssiPiirretty = null; // mihin kerrokseen linssi on piirretty
    this.linssiPois = new Set(); // linssit, joilla ei ollut tälle laudalle mitään
    this.linssiLauta = null; // mille laudalle valikoima on laskettu
    this.linssiTunniste = null; // valikoiman tunniste: valikko rakennetaan vain muutoksesta
    this.linssiAskeleet = new Map(); // valittu askel linssiä kohti
    /*
     * Valitsin ei enää avaudu eikä sulkeudu: se on osa päävalikkoa ja
     * katoaa sen mukana. Sulkeutumisen kuuntelijat (napautus muualle,
     * Esc) poistuivat samalla — päävalikko hoitaa molemmat.
     */
    this.linssiKuuntelijat = [];

    this.busy = false;
    this.dead = false; // destroy() jälkeen instanssi ei saa enää piirtää
    this.travelExpanded = false; // matkavalinnan toinen vaihe auki
    this.kehittajaTila = kehittajaTilaPaalla();
    this.autoRollTimer = null;
    this.movingPlayerId = null;
    this.revealShownFor = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.viewBoxSize = { vw: 1000, vh: 1000 };
    // Aloituskartan lähikuva ja sen vaakapanorointi (puhelin).
    this.aloitusZoom = false;
    this.panX = null;
    this.panVara = 0;
  }

  mount() {
    this.drawBoardFor(this.game.pack);
    this.boardDie = new BoardDie(this.mapPane);
    this.asennaPanorointi();
    this.fitViewBox();
    this.observer = new ResizeObserver(() => this.fitViewBox());
    this.observer.observe(this.svg.parentElement);
    this.render();
    this.esilataaAarrekuvat();
  }

  /*
   * Aarteiden kuvat lämpimiksi ennen ensimmäistä paljastusta:
   * paljastuskortti on ruudulla vain pari sekuntia, eikä kylmä lataus
   * ehtisi siihen ikkunaan. Kolme pientä kuvaa per lauta — halpa hinta
   * siitä, että aarre NÄKYY.
   */
  esilataaAarrekuvat() {
    for (const type of Object.values(this.game.tokenTypes ?? {})) {
      if (!type.kuva) continue;
      const kuva = new Image();
      const [osoite, vara] = aarrekuvanOsoitteet(type.kuva);
      asetaKuva(kuva, osoite, vara);
    }
  }

  /**
   * Kehittäjätilan kytkin.
   *
   * Tila näkyy versionumeron perässä ("v154 : kehittäjä", js/main.js).
   * Ensin siitä kertoi oma merkki kartan yläreunassa, mutta se oli
   * omistajan mielestä liian iso ele pienelle asetukselle — nurkan
   * numero on jo se paikka, josta pelin tila luetaan.
   */
  paivitaKehittajaTila() {
    this.kehittajaTila = kehittajaTilaPaalla();
    this.render();
  }

  /** Piirtää annetun laudan; vaelluksessa lauta vaihtuu porttien kautta. */
  drawBoardFor(pack) {
    this.drawnPackId = pack.id;
    this.svg.setAttribute('aria-label', pack.ariaLabel);
    this.svg.dataset.style = pack.style ?? 'map';
    document.body.dataset.pack = pack.id;
    // Lauta vaihtui: mahdollinen edellinen lähikuva puretaan, ja uudelle
    // mantereelle ajastetaan oma zoomaus kokonäkymän jälkeen.
    this.nollaaAloitusZoom();
    this.drawBoard();
    this.fitViewBox();
    this.ajastaMannerZoom();
  }

  /**
   * Pelisisällön rajauslaatikko: kaupungit nimineen, reitit, lentokaaret ja
   * koristeet. Näkymä sovitetaan tähän eikä koko karttapohjaan, jolloin lauta
   * näkyy mahdollisimman suurena eikä tyhjää merta jää reunoille.
   */
  boardBounds() {
    const { board, pack } = this.game;
    // Valmiiksi rajattu lauta (esim. Maailma) käyttää omaa kehystään.
    // Kopio, koska aloitusnäkymä kasvattaa laatikkoa eikä pakkaa saa muuttaa.
    if (pack.map.frame) return this.withIntroSpace({ ...pack.map.frame });

    const pts = [];
    // Karkea arvio nimikirjaimen leveydestä. Aloituskaupungit piirtyvät
    // isommalla versaalifontilla (21px, kirjainväli 0.1em), joten niissä
    // kirjain vie puolitoista kertaa tavallisen levyn — muuten esimerkiksi
    // Aasian Tokio jäisi rajauksen ulkopuolelle ja leikkautuisi reunaan.
    const CHAR_W = 9.5;
    const START_CHAR_W = 15.2;
    const STROKE = 2; // nimen vaalea reunusviiva levittää tekstiä hieman
    for (const c of board.cities) {
      pts.push([c.x - 34, c.y - 34], [c.x + 34, c.y + 34]);
      const w = c.name.length * (c.start ? START_CHAR_W : CHAR_W) + STROKE * 2;
      const anchor = c.la ?? 'middle';
      const lx = c.x + (c.lx ?? 0);
      const ly = c.y + (c.ly ?? -(c.start ? 28 : 19));
      const x0 = anchor === 'start' ? lx : anchor === 'end' ? lx - w : lx - w / 2;
      pts.push([x0, ly - 18], [x0 + w, ly + 6]);
    }
    for (const e of board.edges) {
      for (const p of e.poly) pts.push(p);
    }
    for (const route of this.game.airRoutes) {
      const a = board.cityById.get(route.a);
      const b = board.cityById.get(route.b);
      pts.push([(a.x + b.x) / 2 + (b.y - a.y) * 0.12, (a.y + b.y) / 2 - (b.x - a.x) * 0.12]);
    }
    const d = pack.decor;
    pts.push(
      [d.compass.x - d.compass.r - 14, d.compass.y - d.compass.r - 26],
      [d.compass.x + d.compass.r + 14, d.compass.y + d.compass.r + 14],
    );
    const titleHalf = Math.max(110, d.mapLabel.length * 12.5);
    pts.push([d.mapLabelPos.x - titleHalf, d.mapLabelPos.y - 34], [d.mapLabelPos.x + titleHalf, d.mapLabelPos.y + 60]);
    if (d.ship) pts.push([d.ship.x - 62, d.ship.y - 56], [d.ship.x + 62, d.ship.y + 46]);
    if (d.serpent) pts.push([d.serpent.x - 96, d.serpent.y - 26], [d.serpent.x + 96, d.serpent.y + 30]);

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const [x, y] of pts) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
    const pad = 12;
    const box = { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 };
    /*
     * Kiertävällä kartalla vaakarajaus on laudan leveys, ei sisällön.
     *
     * Sisällöstä laskettu laatikko on täällä väärä mitta: rannikot ja
     * reitit JATKUVAT laudan reunan yli, koska sauman ylittävät viivat
     * pidetään yhtenäisinä. Mitattuna laatikko oli 24860 yksikköä eli
     * yli kaksi maapalloa, ja kaikki siitä johdettu meni mukana —
     * kierron jakso, elementin leveys ja loitonnuksen raja.
     *
     * Pystysuunta lasketaan yhä sisällöstä: siellä ei kierretä.
     */
    if (this.kiertava()) {
      box.x = 0;
      box.w = pack.map.width;
    }
    // Aloitusnäkymässä pergamenttia jatketaan kartan alapuolelle, jotta
    // avausteksti mahtuu siihen ja lauta nousee ruudun yläreunaan. Näkymä
    // keskittää laatikon, joten alaosan kasvattaminen nostaa karttaa ylös.
    return this.withIntroSpace(box);
  }

  /**
   * Aloitusnäkymässä pergamenttia jatketaan kartan alapuolelle avaustekstiä
   * varten. Näkymä kiinnitetään yläreunaan (fitViewBox), joten kasvatus
   * nostaa laudan ruudun ylälaitaan ja jättää tekstille tyhjän alaosan.
   */
  withIntroSpace(box) {
    // Katselutila (?lauta=) ei näytä avaustekstiä, joten pergamenttia ei
    // jatketa — muuten lauta kutistuu ja jää yläreunaan (omistajan havainto).
    if (this.game.phase !== 'pickstart' || this.katselu) return box;
    return { ...box, h: box.h * (1 + INTRO_SPACE) };
  }

  destroy() {
    // Kuollut instanssi ei saa enää koskea jaettuun DOM:iin: sen
    // tapahtumakuuntelijat ja kesken olevat animaatioketjut jäävät elämään
    // uuden pelin rinnalle, ja ilman lippua ne piirtäisivät vanhan pelin
    // tilaa uuden päälle (esim. edellisen pelin kysymyksen tekstin).
    this.dead = true;
    // Tarkkuusvahti on documentin kuuntelija: ilman purkua kuollut
    // instanssi jäisi tarkkailemaan näkyvyyttä uuden pelin rinnalle.
    if (this.tarkkuusVahti) {
      document.removeEventListener('visibilitychange', this.tarkkuusVahti);
      this.tarkkuusVahti = null;
    }
    // Puskurirenkaan jono elää joutohetkien varassa: ilman perumista se
    // piirtäisi kuolleen pelin ruutuja uuden kartan päälle.
    this.peruutaRengas();
    stopPlaceStream();
    stopQuizMusic();
    sfx.stopFlight();
    this.stopIntroVoice();
    this.stopDiaryVoice();
    this.suljePostikortti();
    this.suljeKulttuuriKuva();
    this.pysaytaKulttuuriAani();
    // Kesken jäänyt lentokalvo siivotaan, ettei se jää uuden pelin päälle.
    document.body.classList.remove('flight-active');
    // Radiotila piilottaa matkakirjan ja alanapit; ilman purkua ne
    // jäisivät piiloon uudessa pelissä.
    document.body.classList.remove('radio-tila');
    for (const kalvo of document.querySelectorAll('.flight-overlay')) kalvo.remove();
    this.suljeAloitusportti();
    clearTimeout(this.botTimer);
    clearTimeout(this.autoRollTimer);
    clearTimeout(this.lentoPuheAjastin);
    clearTimeout(this.zoomAlkuAjastin);
    clearTimeout(this.zoomTaustaAjastin);
    if (this.previewFrame) cancelAnimationFrame(this.previewFrame);
    for (const timer of Object.values(this.typeTimers ?? {})) clearTimeout(timer);
    this.stopQuizTimer();
    for (const lappu of this.taustaLaput ?? []) lappu.removeEventListener('click', this.lappuTausta);
    for (const lappu of this.peruutusLaput ?? []) lappu.removeEventListener('cancel', this.lappuPeruutus);
    // Nipistyksen kuuntelijat pois: ne ovat paneelissa, joka jää eloon.
    for (const [nimi, kasittele] of this.nipistysKuuntelijat ?? []) {
      this.mapPane?.removeEventListener(nimi, kasittele, { passive: false });
    }
    this.nipistysKuuntelijat = [];
    for (const [nappi, kasittele] of this.zoomiKuuntelijat ?? []) {
      nappi.removeEventListener('click', kasittele);
    }
    // Linssin kuuntelijat ovat documentissa ja ylärivissä, jotka jäävät
    // eloon uuden pelin ajaksi.
    for (const [kohde, nimi, kasittele] of this.linssiKuuntelijat ?? []) {
      kohde.removeEventListener(nimi, kasittele);
    }
    this.linssiKuuntelijat = [];
    /*
     * Kuollut käyttöliittymä luopuu linssistään: sammutus vapauttaa
     * rasterin blob-osoitteen (10,4 Mt kerrallaan) ja body-luokat.
     * Kerroksen hakija tarkistaa dead-lipun, joten tämä ei voi tyhjentää
     * uuden pelin kerrosta, vaikka uusi peli ehtisi jo alkaa.
     */
    this.linssiTuki?.moottori?.sammuta();
    // Soitin elää document.bodyssä eikä laudassa, joten se jäisi
    // ruutuun ja soimaan uuden pelin päälle.
    this.radioModuuli?.pois();
    this.linssiSelite?.remove();
    this.linssiSelite = null;
    if (this.linssiKotelo) this.linssiKotelo.hidden = true;
    this.observer?.disconnect();
  }

  /**
   * Lapun kevyin poistumistie taustanapautukselle ja Esc:lle: takaisin
   * karttanäkymään. Tietovisassa sulkeminen on kysymyksestä luopumista —
   * pulma palaa taskuun, muu kysymys päättää vuoron vastaamatta.
   * Rosvon kaksintaistelusta ei karata taustaa napauttamalla.
   */
  suljeLappu(lappu) {
    const { game } = this;
    if (lappu === this.quizDialog) {
      if (this.busy) return;
      if (game.phase === 'duel') {
        const duel = game.duel;
        if (duel && duel.chosen !== null && this.revealShownFor === duel) {
          sfx.play('paper');
          this.doAction(() => game.closeDuel());
        }
        return;
      }
      if (game.phase !== 'quiz' || !game.quiz) return;
      // Tuomion paljastus on kesken — tulos ei saa jäädä näkemättä.
      if (game.quiz.chosen !== null && this.revealShownFor !== game.quiz) return;
      sfx.play('paper');
      this.doAction(() => game.closeQuiz());
      return;
    }
    // Saapumis- ja tapahtumalaput vievät pelitilaa eteenpäin, joten
    // taustanapautus painaa niiden omaa jatkonappia.
    if (lappu === this.eventDialog) {
      document.getElementById('event-ok').click();
      return;
    }
    if (lappu === this.arrivalDialog) {
      document.getElementById('arrival-no').click();
      return;
    }
    sfx.play('paper');
    lappu.close();
  }

  /**
   * Sovittaa näkymän pelisisällön rajauslaatikkoon ja venyttää sen ruudun
   * muotoiseksi, jolloin pergamentti täyttää koko alueen ja pelialue näkyy
   * mahdollisimman suurena. Kartta on staattinen: sitä ei zoomata eikä
   * raahata, joten kaikki on aina esillä.
   */
  /** Kiertääkö tämän laudan kartta ympäri? */
  kiertava() {
    return this.game?.pack?.map?.kiertava === true;
  }

  /*
   * Pienin sallittu mittakaava kiertävällä kartalla.
   *
   * Omistajan vaatimus: yksi paikka ei saa näkyä kahdessa kohdassa
   * samaan aikaan. Näkyvä leveys on paneelin leveys jaettuna
   * mittakaavalla, joten mittakaava ei saa alittaa arvoa
   * paneeli / maailman leveys.
   *
   * Raja tarvitaan erikseen lähikuvassa, koska siellä mittakaava
   * lasketaan KORKEUDEN mukaan. Leveässä ja matalassa ikkunassa
   * (2400 x 420) korkeus kutistaa mittakaavan niin pieneksi, että
   * maailma mahtui ruudulle kahdesti — mitattu, ei arvattu.
   */
  rajaaSkaala(skaala, paneW, box) {
    if (!this.kiertava()) return skaala;
    /*
     * Raja on laudan leveys MIINUS pieni varmuusvara.
     *
     * Tasan laudan levyinen näkymä on teoriassa oikein: sauma osuu
     * ruudun laitaan eikä mikään näy kahdesti. Käytännössä ei osu.
     * Näkyvä leveys lasketaan paneelin pikselileveydestä, joka on
     * murtoluku, ja pyöristys, laitteen pikselisuhde ja kartan omien
     * viivojen paksuus vievät reunimmaisen kaistaleen milloin
     * kummallekin puolelle — omistajan havainto: "siinä näkyy sama
     * paikka kahteen kertaan, kun se on kokonaan zoomattu ulos."
     *
     * Vara maksaa kolme prosenttia loitonnusta ja tekee saumasta aina
     * saumattoman. Se on halvempi kuin kaksi kertaa piirtyvä ranta.
     */
    return Math.max(skaala, paneW / (box.w * (1 - SAUMAN_VARA)));
  }

  fitViewBox() {
    const pane = this.svg.parentElement;
    const w = pane.clientWidth;
    const h = pane.clientHeight;
    if (!w || !h) return;
    const box = this.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    // Katselutila (?lauta=) näyttää laudan kuin pelissä: ei porttia eikä
    // avaustekstiä, vaikka vaihe on pickstart.
    const alkuun = this.game.phase === 'pickstart' && !this.katselu;
    // Leveällä ikkunalla (Mac) lauta täyttäisi koko korkeuden ja alareunan
    // kelluvat kortit ruuhkautuisivat kartan eteläosan päälle: kun korkeus
    // on rajoittava mitta, laudalta varataan alakaista korteille. Kapealla
    // ruudulla leveys rajoittaa, kaista jää nollaan eikä asettelu muutu.
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const kaista = !alkuun && w / box.w > h / box.h ? Math.min(h * 0.2, rem * 7) : 0;
    /*
     * Loitonnuksen raja kiertävällä kartalla (omistajan vaatimus): yksi
     * paikka ei saa näkyä kahdessa kohdassa samaan aikaan.
     *
     * Näkyvä leveys on w / scale, joten se ei saa ylittää laudan
     * leveyttä. Ilman rajaa leveä ja matala ikkuna teki juuri sen:
     * korkeus rajoitti mittakaavaa, ja 2000 x 400 pikselin ikkunaan
     * olisi mahtunut kaksi maapalloa vierekkäin.
     *
     * Raja leikkaa pystysuunnasta eikä vaakasuunnasta — kartan ylä- ja
     * alalaidassa on merta, kaupungit ovat keskellä.
     */
    let scale = Math.min(w / box.w, (h - kaista) / box.h);
    if (this.kiertava()) scale = this.rajaaSkaala(scale, w, box);
    const vw = w / scale;
    const vh = h / scale;
    this.viewBoxSize = { vw, vh };
    // Aloitusnäkymässä lauta on ennen Aloita seikkailu -nappia keskellä
    // ruutua (pystyruudulla alaosa ammotti muuten tyhjänä), ja nousee
    // portin auettua ylös, jolloin alle jäävä kaista annetaan kokonaan
    // avaustekstille suurella fontilla. Pelissä sisältö keskitetään
    // kaistan yläpuoliseen osaan.
    let vy;
    if (alkuun && !this.aloitettu) {
      const laudanKorkeus = box.h / (1 + INTRO_SPACE);
      vy = box.y + laudanKorkeus / 2 - vh / 2;
    } else if (alkuun) {
      vy = box.y - box.h * INTRO_TOP;
    } else {
      vy = box.y + box.h / 2 - (h - kaista) / (2 * scale);
    }
    this.svg.setAttribute(
      'viewBox',
      `${box.x + box.w / 2 - vw / 2} ${vy} ${vw} ${vh}`,
    );
    // Aloituskartan lähikuva hoitaa oman rajauksensa ja kokonsa.
    if (this.aloitusZoom && alkuun) {
      this.sovitaAloitusZoom(w, h);
      this.taydennaTaide?.();
      return;
    }
    if (this.mannerZoom && !alkuun) {
      this.sovitaMannerZoom(w, h);
      this.taydennaTaide?.();
      return;
    }
    // Lähikuvasta poistuttaessa (kaupunki valittu, uusi peli) kartta
    // palaa paneelin kokoiseksi: inline-mitat ja siirto pois.
    if (this.aloitusZoom || this.mannerZoom || this.svg.style.width) this.nollaaAloitusZoom();
    if (alkuun) this.placeIntro(box, vy, vh, h);
    this.placeFactCard(w, h);
    // Noppa lepää kartan koordinaateissa, joten se siirretään uuteen mittakaavaan.
    if (this.dieThrown && this.boardDie) this.boardDie.place(this.dieRestingSpot());
    /*
     * Kartan kuva päivitetään AINA kun näkymä asettuu.
     *
     * Ilman tätä ensimmäinen kuva jäi voimaan: se piirtyi heti laudan
     * luonnin jälkeen, jolloin viewBox oli vielä oletusarvoinen
     * 1000 x 1000, ja ikkunaksi tuli 3000 yksikköä. Kun näkymä sen
     * jälkeen asettui 6379 yksikön levyiseksi, mikään ei pyytänyt uutta
     * kuvaa — yleiskuvassa ei panoroida — ja kartta jäi kaistaleeksi.
     */
    this.taydennaTaide?.();
  }

  /**
   * Aloituskartan lähikuva puhelimella (omistajan toive).
   *
   * Kapealla ruudulla koko maailmankartta mahtuu näytölle niin pienenä,
   * ettei yksittäistä kaupunkia voi osua sormella. Siksi ensimmäinen
   * napautus zoomaa kartan lähemmäs sen sijaan että valitsisi kaupungin,
   * ja avausteksti väistyy tieltä.
   *
   * Lähikuvassa kartta piirretään niin, että sen KORKEUS täyttää
   * paneelin; leveyttä jää yli, ja se selataan sivusuunnassa. Pystyyn ei
   * jää liikuttavaa, joten panorointi on yksiulotteista.
   *
   * Panorointi tehdään CSS-muunnoksella eikä viewBoxia siirtämällä:
   * muunnos on kompositorin työtä, joten selain käyttää valmista
   * rasteria eikä piirrä koko karttaa uudelleen joka kehyksellä. Se on
   * käytännössä sama kuin kartan muuttaminen kuvaksi, mutta kartta
   * pysyy tarkkana ja napautukset osuvat oikeisiin kohtiin itsestään.
   */
  /**
   * Kaupunkien pystysuunnan keskikohta laudalla. Aloituskartan lähikuva
   * rajataan tähän eikä laudan keskelle: maailmankartan navat ovat
   * tyhjää merta, ja niiden näyttäminen veisi tilan kaupungeilta.
   */
  kaupunkienKeskiY(box, laudanKorkeus) {
    const ys = (this.game.board?.cities ?? []).map((c) => c.y);
    if (!ys.length) return box.y + laudanKorkeus / 2;
    return (Math.min(...ys) + Math.max(...ys)) / 2;
  }

  sovitaAloitusZoom(paneW, paneH) {
    const box = this.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    // Rajauslaatikko ilman avaustekstin varaamaa alaosaa: lähikuvassa
    // teksti on jo väistynyt, joten koko korkeus on laudan käytössä.
    const laudanKorkeus = box.h / (1 + INTRO_SPACE);
    const yleiskuva = Math.min(paneW / box.w, paneH / box.h);
    const skaala = this.rajaaSkaala(yleiskuva * ALOITUS_ZOOM, paneW, box);
    const leveys = Math.round(box.w * skaala);
    // Kartta täyttää paneelin myös pystysuunnassa. Näkymä rajataan
    // kaupunkien korkeudelle eikä laudan keskelle: maailmankartan ylä-
    // ja alalaidassa ovat pallonpuoliskojen napa-alueet, joissa ei ole
    // yhtään napautettavaa kohdetta eikä mannerta (omistajan havainto).
    const nakyvaKorkeus = paneH / skaala;
    const vy = this.kaupunkienKeskiY(box, laudanKorkeus) - nakyvaKorkeus / 2;
    // Kiertävällä kartalla yksi ruudullinen yli laudan leveyden: se on
    // kaistale, jonka <use>-kopio täyttää kun vieritys kiertyy ympäri.
    const yliLeveys = this.kiertava() ? Math.ceil(paneW) : 0;
    const nakyvaYks = box.w + yliLeveys / skaala;
    this.svg.setAttribute('viewBox', `${box.x} ${vy} ${nakyvaYks} ${nakyvaKorkeus}`);
    this.svg.style.width = `${leveys + yliLeveys}px`;
    this.svg.style.height = `${Math.round(nakyvaKorkeus * skaala)}px`;
    this.svg.style.flex = '0 0 auto';
    this.svg.style.alignSelf = 'center';
    this.viewBoxSize = { vw: nakyvaYks, vh: nakyvaKorkeus };
    this.zoomYlaReuna = vy;
    this.zoomSkaala = skaala;
    // Panorointivara: kuinka paljon karttaa jää ruudun ulkopuolelle.
    // Kiertävällä kartalla varaa ei ole — on jakso, joka kiertää ympäri.
    this.panJakso = this.kiertava() ? leveys : 0;
    this.panVara = this.kiertava() ? 0 : Math.max(0, leveys - paneW);
    // Aloituskohta: sama kohta kartasta, joka oli keskellä yleiskuvassa.
    if (this.panX == null) {
      const keskiX = this.zoomAnkkuri ?? box.x + box.w / 2;
      this.panX = paneW / 2 - (keskiX - box.x) * skaala;
    }
    this.asetaPan(this.panX);
    this.placeFactCard(paneW, paneH);
  }

  /**
   * Siirtää karttaa; rajat pitävät kartan ruudulla. Aloituskartalla
   * liikutaan vain vaakasuunnassa (panVaraY = 0), mantereella molempiin.
   */
  asetaPan(x, y = this.panY ?? 0) {
    if (this.panJakso) {
      /*
       * Kiertävällä kartalla vieritys ei pysähdy vaan kiertää ympäri.
       *
       * Arvo pidetään välillä [-jakso, 0). Kun se ylittää rajan, se
       * hyppää tasan yhden laudan leveyden verran — ja koska sisällöstä
       * on kopio juuri sen päässä, ruudulla ei muutu mikään. Sauma on
       * olemassa vain lukuna.
       */
      const j = this.panJakso;
      this.panX = ((x % j) + j) % j - j;
    } else {
      this.panX = Math.min(0, Math.max(-(this.panVara ?? 0), x));
    }
    this.panY = Math.min(0, Math.max(-(this.panVaraY ?? 0), y));
    this.svg.style.transform =
      `translate3d(${this.panX.toFixed(1)}px, ${this.panY.toFixed(1)}px, 0)`;
    /*
     * Siirron aikana EI piirretä bittikarttaa.
     *
     * Aiemmin tässä tilattiin uusi kuva heti kun reuna lähestyi, ja
     * juuri se tökki: rasterointi vie satoja millisekunteja
     * pääsäikeessä, ja sormen alla se tuntuu nykäyksenä. Puskuria on
     * ruudullisen verran joka suuntaan, eli koko sen matkan minkä yksi
     * pyyhkäisy voi karttaa siirtää, joten kesken eleen ei tarvitse
     * piirtää mitään (omistajan linjaus).
     */
  }

  /*
   * --- zoomipainikkeet ------------------------------------------------
   *
   * Omistajan toive: "universaalit zoomipainikkeet kartalle kaikille
   * alustoille". Aiemmin lähikuvaan pääsi vain automaattisesti ja vain
   * kapealla ruudulla; tietokoneella karttaa ei voinut lähentää lainkaan.
   *
   * Painikkeet käyttävät samaa lähikuvakoneistoa kuin automaattinen
   * mannerzoom — vain zoomitaso vaihtuu. mannerZoomTarpeen() rajaa
   * ainoastaan AUTOMAATTISEN zoomauksen (Eurooppa, kapea ruutu), ja
   * fitViewBox katsoo pelkkää this.mannerZoom-lippua, joten painikkeilla
   * lähikuva aukeaa millä tahansa laudalla ja millä tahansa ruudulla.
   */

  /**
   * Ollaanko avausnäkymässä, jossa kartalla on oma lähikuvansa ja
   * avausteksti? Katselutila (?lauta=) on vaiheeltaan pickstart mutta
   * näyttää laudan kuin pelissä. Sama ehto on fitViewBoxissa.
   */
  avausNakymassa() {
    return this.game.phase === 'pickstart' && !this.katselu;
  }

  /** Nykyinen zoomiporras; kokonäkymässä 0. */
  get zoomiIndeksi() {
    if (!this.mannerZoom) return 0;
    return this.zoomiPorras ?? this.saapumisPorras();
  }

  /**
   * Zoomiportaat tälle laudalle kertoimina. Porras 0 on kokonäkymä.
   *
   * Kerroin lasketaan laudan leveydestä, jotta sama nappi tuo yhtä
   * lähelle kaikilla laudoilla. Portaat, jotka olisivat kokonäkymää
   * kauempana, jätetään pois: pienellä laudalla ei ole mieltä tarjota
   * porrasta, joka näyttäisi lautaa enemmän kuin sitä on.
   */
  zoomiTasot() {
    const leveys = this.contentBox?.w ?? 1000;
    const tasot = [1];
    let nakyva = leveys / ZOOMI_ASKEL;
    while (nakyva > ZOOMI_LAHIN * 1.05) {
      tasot.push(leveys / nakyva);
      nakyva /= ZOOMI_ASKEL;
    }
    tasot.push(leveys / ZOOMI_LAHIN);
    return tasot;
  }

  /**
   * Porras, johon mantereelle saavuttaessa zoomataan.
   *
   * Valitaan se porras, joka on lähimpänä tavoiteltua näkyvää leveyttä.
   * Kiinteä indeksi ei kelpaa, koska portaiden määrä riippuu laudan
   * koosta: sama numero olisi pienellä laudalla lähikuva ja isolla
   * suurpiirteinen yleisnäkymä.
   */
  saapumisPorras() {
    const leveys = this.contentBox?.w ?? 1000;
    const tavoite = Math.min(leveys * SAAPUMIS_OSUUS, SAAPUMIS_LEVEIN);
    const tasot = this.zoomiTasot();
    let paras = 1;
    for (let i = 1; i < tasot.length; i++) {
      if (Math.abs(leveys / tasot[i] - tavoite) < Math.abs(leveys / tasot[paras] - tavoite)) paras = i;
    }
    return paras;
  }

  /** Zoomikerroin, jolla sovitaMannerZoom laskee lähikuvan mitat. */
  get zoomiKerroin() {
    /*
     * Nipistys antaa minkä tahansa kertoimen portaiden välistä, ja
     * silloin se voittaa portaikon. Painikkeet nollaavat sen, jolloin
     * portaat palaavat käyttöön: kaksi eri tapaa zoomata samaan
     * lukuun, eikä niiden tarvitse olla samaa mieltä.
     */
    if (this.zoomiVapaa) return this.zoomiVapaa;
    const tasot = this.zoomiTasot();
    return tasot[this.zoomiIndeksi] ?? tasot[this.saapumisPorras()] ?? MANNER_ZOOM;
  }

  /** Pienin ja suurin sallittu kerroin: portaikon päät. */
  zoomiRajat() {
    const tasot = this.zoomiTasot();
    return { pienin: tasot[0] ?? 1, suurin: tasot.at(-1) ?? MANNER_ZOOM };
  }

  /**
   * Kartan piste, joka on juuri nyt paneelin keskellä. Zoomatessa tämä
   * pidetään paikallaan — muuten kartta karkaisi käsistä joka
   * painalluksella, koska lähikuva keskitettäisiin aina laudan keskelle.
   *
   * Käänteisluku sovitaMannerZoomin sijoituksesta:
   *   panX = paneW / 2 - (kohde.x - box.x) * skaala
   */
  nykyinenKeskipiste() {
    const pane = this.svg.parentElement;
    if (!pane || !this.zoomSkaala || !this.mannerZoom) return null;
    const box = this.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    return {
      x: box.x + (pane.clientWidth / 2 - (this.panX ?? 0)) / this.zoomSkaala,
      y: (this.zoomYlaReuna ?? box.y)
        + (pane.clientHeight / 2 - (this.panY ?? 0)) / this.zoomSkaala,
    };
  }

  /**
   * Siirtyy zoomiportaissa. suunta on +1 (lähemmäs) tai -1 (kauemmas).
   * Palauttaa true, jos taso muuttui.
   */
  zoomaaPainikkeella(suunta) {
    if (this.dead || !this.svg) return false;
    // Avausnäkymässä kartalla on oma lähikuvansa ja avausteksti; sinne
    // painikkeet eivät kuulu. Katselutila (?lauta=) näyttää laudan kuin
    // pelissä, joten siellä ne kuuluvat — sama ehto kuin fitViewBoxissa.
    if (this.avausNakymassa()) return false;

    const tasot = this.zoomiTasot();
    /*
     * Nipistyksen jälkeen ollaan portaiden VÄLISSÄ. Painike siirtyy
     * silloin lähimpään portaaseen menosuunnassa — ei indeksiin, jota
     * ei ole.
     */
    const vapaa = this.zoomiVapaa;
    const nykyinen = vapaa
      ? tasot.findIndex((t) => (suunta > 0 ? t > vapaa * 1.02 : t >= vapaa * 0.98))
      : this.zoomiIndeksi;
    const lahin = nykyinen < 0 ? tasot.length - 1 : nykyinen;
    const uusi = vapaa
      ? Math.min(tasot.length - 1, Math.max(0, suunta > 0 ? lahin : lahin - 1))
      : Math.min(tasot.length - 1, Math.max(0, lahin + suunta));
    this.zoomiVapaa = 0;
    if (!vapaa && uusi === nykyinen) return false;

    /*
     * Keskipiste luetaan ENNEN tason vaihtoa, vanhalla mittakaavalla.
     * Rullalla se on osoittimen alla oleva kartan piste, painikkeilla
     * ruudun keskipiste — painikkeella ei ole osoitinta.
     */
    const keskipiste = this.rullanKohta ?? this.nykyinenKeskipiste();

    if (uusi === 0) {
      // Takaisin kokonäkymään: lähikuvan mitat ja siirto pois.
      this.nollaaAloitusZoom();
      this.fitViewBox();
      this.paivitaZoomiNapit();
      return true;
    }

    this.zoomiPorras = uusi;
    if (!this.mannerZoom) {
      // Kokonäkymästä lähikuvaan. Ilman aiempaa keskipistettä
      // kohdistetaan pelaajan nappulaan, jotta lähennys vie sinne missä
      // peli on menossa eikä laudan geometriseen keskipisteeseen.
      this.mannerZoom = true;
      document.body.classList.add('manner-zoom');
      this.zoomKohde = this.pelaajanKohta() ?? null;
    } else {
      this.zoomKohde = keskipiste;
    }
    // panX/panY nolliksi, jotta sovitaMannerZoom keskittää zoomKohteeseen.
    this.panX = null;
    this.panY = null;
    this.fitViewBox();
    this.paivitaZoomiNapit();
    return true;
  }

  /**
   * Muuttaa kartan staattisen taiteen yhdeksi kuvaksi.
   *
   * Rajaus on pergamentin koko eikä laudan: paperi jatkuu reunojen yli,
   * ja lähikuvassa panoroidaan sinne. Jos rajaisi laudan mukaan, reunan
   * takaa paljastuisi tyhjää.
   *
   * Kutsu ei odota tulosta. Kartta näkyy heti vektoreina ja vaihtuu
   * kuvaksi kun se on valmis; jos vaihto ei onnistu, vektorit jäävät.
   */
  rasteroiTaide(ryhma) {
    /*
     * Taide sarjallistetaan KERRAN ja tyylit kirjoitetaan elementteihin.
     *
     * Irrallinen SVG ei peri sivun tyylitiedostoa: säännöt on kirjoitettu
     * sivun rakennetta vasten (`#board`, `body...`), eikä kuvassa ole
     * bodya. Ilman tätä kartasta tulisi musta paperi mustine
     * mantereineen.
     *
     * Sarjallistus kerran on nopeuden kannalta olennaista: jokainen
     * ruutu tehdään samasta tekstistä, ja 6500 elementin läpikäynti
     * ruutua kohti maksaisi enemmän kuin itse piirto.
     */
    this.taideRyhma = ryhma;
    /*
     * Pilkottu taide, jos se onnistuu; muuten yksi teksti kuten ennen.
     *
     * Pilkkominen tarvitsee elävän puun mitat, ja se on tehtävä NYT —
     * vektorit poistetaan heti kun ensimmäiset ruudut ovat valmiit.
     * Varareitti ei ole muodollisuus: pilkkominen palauttaa nullin, jos
     * kloonin ja elävän puun rakenne ei täsmää, ja silloin kartta
     * piirtyy hitaammin mutta oikein.
     */
    const tyylitelty = tyylitSisaan(ryhma);
    const maarittelyt = this.svg.querySelector('defs');
    this.taide = pilkoTaide(tyylitelty, ryhma, maarittelyt,
      { leveys: this.kiertava() ? this.game.pack.map.width : 0 })
      ?? valmisteleTaide(tyylitelty, maarittelyt);
    this.taideRuudut = new Map();
    this.taideTyhjat = new Set();
    this.taideSkaala = 0;
    this.taideRuutu = 0;
    this.taideRengas = null;
    this.taideVektorit = ryhma.firstElementChild ? [...ryhma.children] : [];
    // Ensimmäinen piirto vasta seuraavalla kehyksellä: laudan
    // luontihetkellä viewBox on vielä oletusarvoinen eikä paneelin koko
    // ole tiedossa.
    requestAnimationFrame(() => this.taydennaTaide());
    this.vahdiTarkkuutta();
  }

  /**
   * Turvaverkko sumealle kartalle (omistajan havainto 7.8.2026:
   * *"kartta näkyy pehmeänä sen jälkeen kun peli päivittyy
   * automaattisesti uuteen versioon"* — ja korjautuu, kun zoomaa ulos
   * ja takaisin).
   *
   * Ruudut piirretään sillä mittakaavalla, joka kartalla oli
   * rasterointihetkellä, ja uusi sarja pyydetään vasta kun mittakaava
   * muuttuu yli viidenneksen. Jos ensimmäinen rasterointi osuu
   * hetkeen, jolloin näkymä ei ole vielä lopullinen — päivityksen
   * jälkeinen lataus voi tapahtua taustavälilehdessä, jossa
   * requestAnimationFrame ei laukea — ruudut jäävät väärän tarkkuisiksi
   * eikä mikään pyydä niitä uudestaan. Kartta näyttää venytetyltä.
   *
   * Tämä vahti vertaa ruutujen mittakaavaa siihen, mikä kartalla
   * oikeasti on, aina kun peli palaa näkyviin. Kynnys on tiukempi kuin
   * täydennyksen oma (2 % eikä 20 %), koska tässä ei olla kesken
   * eleen: pieni ero tarkoittaa juuri sitä väärää tarkkuutta.
   *
   * Vahti ei korjaa syytä vaan seurauksen — juurisyytä ei ole saatu
   * toistettua kehityskoneella. Uudelleenrasterointi maksaa muutaman
   * ruudun verran työtä ja tapahtuu vain kun ero on todellinen.
   */
  vahdiTarkkuutta() {
    if (this.tarkkuusVahti) return;
    this.tarkkuusVahti = () => {
      if (this.dead || document.visibilityState !== 'visible') return;
      if (!this.taide || !this.taideSkaala) return;
      const nakyva = this.nakyvaAlue();
      if (!nakyva) return;
      const suhde = nakyva.skaala / this.taideSkaala;
      if (suhde > 1.02 || suhde < 0.98) {
        // Nollaus pakottaa uuden sarjan: taydennaTaide vertaa tähän.
        this.taideSkaala = 0;
        this.taydennaTaide({ heti: true });
      }
    };
    document.addEventListener('visibilitychange', this.tarkkuusVahti);
  }

  /**
   * Näkyvä alue laudan koordinaatteina.
   *
   * Luvut luetaan ruudulta eikä zoomimuuttujista: this.zoomSkaala on
   * olemassa vain lähikuvassa, ja yleiskuvassa se on nolla. viewBox ja
   * elementin oma koko ovat olemassa aina.
   */
  nakyvaAlue() {
    const pane = this.svg?.parentElement;
    if (!pane) return null;
    const vb = this.svg.viewBox?.baseVal;
    const laatikko = this.svg.getBoundingClientRect();
    const paneeli = pane.getBoundingClientRect();
    if (!vb?.width || !laatikko.width) return null;
    const skaala = laatikko.width / vb.width;
    return {
      x: vb.x + Math.max(0, paneeli.left - laatikko.left) / skaala,
      y: vb.y + Math.max(0, paneeli.top - laatikko.top) / skaala,
      w: Math.min(paneeli.width, laatikko.width) / skaala,
      h: Math.min(paneeli.height, laatikko.height) / skaala,
      skaala,
    };
  }

  /**
   * Täydentää kartan bittikartan puuttuvilla ruuduilla.
   *
   * KOLME SÄÄNTÖÄ, JOTKA OMISTAJA ANTOI:
   *
   * 1. Kesken eleen ei ladata. Piirto vie satoja millisekunteja
   *    pääsäikeessä, ja se tökkii sormen alla riippumatta siitä kuinka
   *    pieni pala on. Aiemmin lataus alkoi heti kun reuna lähestyi, ja
   *    juuri se tökki.
   * 2. Puskuria on niin paljon, ettei kesken eleen TARVITSE ladata.
   *    Yksi pyyhkäisy siirtää karttaa korkeintaan ruudullisen, koska
   *    sormi ei mahdu kulkemaan ruutua pidemmälle. Ruutuja piirretään
   *    siksi ruudullisen verran näkyvän alueen ympärille.
   * 3. Ladataan vain uusi osa. Ruudukko pysyy paikallaan, ja jo
   *    piirretyt ruudut jäävät sellaisinaan — uutta työtä on vain se
   *    kaistale, joka tuli näkyviin.
   */
  taydennaTaide({ heti = false } = {}) {
    if (this.dead) return;
    /*
     * Maastonimet päivitetään SAMASSA KOHDASSA kuin kartan kuva.
     *
     * Molemmat riippuvat täsmälleen samasta asiasta — siitä mikä osa
     * laudasta on näkyvissä ja millä mittakaavalla — ja tätä funktiota
     * kutsutaan jokaisesta kohdasta, jossa näkymä asettuu: fitViewBox,
     * zoomipainikkeet, nipistys ja raahauksen loppu. Oma kutsuketju
     * olisi neljä uutta tilaisuutta unohtaa yksi niistä.
     *
     * Nimet ovat kuitenkin ENNEN rasteroinnin tarkistusta: ne piirtyvät
     * elävään kerrokseen, joten niiden on toimittava myös selaimessa,
     * jossa bittikarttaa ei saada tehtyä (rasteroiRuutu palauttaa
     * silloin nullin eikä this.taide ole olemassa).
     */
    if (!this.kartanRaahaus && !document.body.classList.contains('flight-active')) {
      this.paivitaLahivesi();
      this.paivitaMaastonimet();
    }
    if (!this.taide || !this.taideRyhma) return;
    /*
     * Lennon aikana ei rasteroida.
     *
     * Lauta piirretään kalvon taakse jo lennon aikana, ja rasterointi vie
     * satoja millisekunteja pääsäikeessä. Omistajan havainto: "lento
     * tökki, mutta kartta toimii" — eli hitaus oli siirtynyt juuri tähän
     * kohtaan. Sama jumi selittää todennäköisesti myös sen, ettei
     * matkakertojan ääni käynnistynyt: puhe alkaa ajastimella lennon
     * aikana, ja ajastin ei pääse ajoon jumin läpi.
     *
     * Kuva täydennetään heti kun kalvo väistyy.
     */
    if (document.body.classList.contains('flight-active')) { this.taideOdottaa = true; return; }
    /*
     * Zoomiliu'un aikana ei rasteroida.
     *
     * Sama syy kuin lennolla: yksi ruutu vie satoja millisekunteja
     * pääsäikeessä, ja liuku on CSS-muunnos, jonka kompositori hoitaisi
     * muuten ilman nykäisyä. Omistaja: "zoomaus tökkii kun kartta
     * yrittää pysyä perässä piirtämisessä." Kuva täydennetään heti kun
     * liuku on ohi (kaynnistaZoomLiuku poistaa luokan).
     */
    if (document.body.classList.contains('zoom-kaynnissa')) { this.taideOdottaa = true; return; }
    // Kesken eleen ei ladata. Merkitään vain, että päättyessä pitää.
    if (this.kartanRaahaus && !heti) { this.taideOdottaa = true; return; }
    if (this.taidePiirtyy) { this.taideOdottaa = true; return; }
    const nakyva = this.nakyvaAlue();
    if (!nakyva) return;
    /*
     * Vanha rengastyö pois ennen uutta laskentaa.
     *
     * Jono rakennetaan tässä uudestaan, ja jo piirretyt ruudut jäävät
     * siitä pois — vanha jono olisi siis parhaassakin tapauksessa sama
     * ja pahimmassa väärän mittakaavan.
     */
    this.peruutaRengas();

    // Mittakaavan vaihtuessa vanhat ruudut ovat väärän tarkkuisia.
    if (!this.taideSkaala || nakyva.skaala > this.taideSkaala * 1.2
        || nakyva.skaala < this.taideSkaala * 0.8) {
      this.taideSkaala = nakyva.skaala;
      const pane = this.svg.parentElement;
      this.taideTarkkuus = piirtotarkkuus(pane?.clientWidth ?? 400, pane?.clientHeight ?? 800);
      this.taideRuutu = ruudunKoko(nakyva.skaala, this.taideTarkkuus);
      /*
       * Kiertävällä kartalla ruudun on jaettava maailma tasan.
       *
       * Ruudun koko lasketaan pikselirajasta, ja loitonnetulla
       * maailmankartalla se venyi 23860 yksikköön — kaksi kertaa
       * maailmaa leveämmäksi. Ruutu on läpinäkymätön pergamentti koko
       * alaltaan, joten sen TYHJÄ oikea puoli maalattiin kierron
       * kopion päälle: kartta loppui pystysuoraan reunaan ja oikealla
       * oli tyhjää (omistajan kuvakaappaus iPadilta).
       *
       * Kun leveys on maailman jaollinen osa, yksikään ruutu ei ulotu
       * laudan ulkopuolelle eikä siis voi peittää kopiota.
       *
       * YLÖSPÄIN eikä lähimpään: pyöristys alaspäin SUURENTAA ruutua.
       * Yleiskuvassa laskettu koko oli 9573 ja lähin jaollinen sarake-
       * määrä yksi, jolloin ruudusta tuli koko maailma — 12000 yksikköä
       * yhteen 1100 pikselin kuvaan. Kartta oli neljä kertaa liian
       * karkea, ja yhden ruudun rasterointi kesti 4,7 sekuntia
       * mitattuna; kolme ruutua vei ensimmäiseltä piirrolta 13 sekuntia,
       * jonka ajan jokainen zoomaus jäi jonoon. Ylöspäin pyöristäen
       * ruutu on aina pikselibudjetin sisällä eli tarkka, ja työ
       * pilkkoutuu paloihin, joiden välissä sormi ehtii liikkua.
       */
      if (this.kiertava()) {
        const W = this.game.pack.map.width;
        this.taideRuutu = W / Math.max(1, Math.ceil(W / this.taideRuutu));
      }
      this.taideVanhat = [...this.taideRuudut.values()];
      this.taideRuudut = new Map();
      this.taideTyhjat = new Set();
    }

    const koko = this.taideRuutu;
    const arkki = paperi(this.game.pack.map);
    const PUSKURI = 1; // ruudullista joka suuntaan: koko pyyhkäisyn matka
    const kiertava = this.kiertava();
    const W = this.game.pack.map.width;
    /*
     * Kiertävällä kartalla ruudut EIVÄT rajaudu laudan leveyteen — ne
     * kiertyvät sen yli.
     *
     * Näkyvä alue voi ulottua laudan oikean reunan yli, ja sen osan
     * täyttää <use>-kopio, joka näyttää laudan VASENTA reunaa. Ruudun
     * ei siis pidä syntyä sinne minne katsotaan vaan sinne mistä kuva
     * haetaan: sarake W:n takaa on sama sarake kuin sarake nollan
     * kohdalla.
     *
     * Vanha versio rajasi hakualueen väliin [0, W] eikä koskaan
     * pyytänyt niitä vasemman reunan ruutuja, joita kopio tarvitsi.
     * Kartta loppui siksi pystysuoraan saumaan ja oikealla oli pelkkä
     * tyhjä pergamentti (omistajan kuvakaappaus, Beringinsalmi).
     *
     * Ruutu jakaa laudan tasan (ks. taideRuutu yllä), joten sarakkeita
     * on kokonaisluku ja jakojäännös osuu aina ruudun reunaan.
     */
    const sarakkeita = kiertava ? Math.max(1, Math.round(W / koko)) : 0;
    const x0 = kiertava ? nakyva.x - nakyva.w * PUSKURI
      : Math.max(arkki.x, nakyva.x - nakyva.w * PUSKURI);
    const y0 = Math.max(arkki.y, nakyva.y - nakyva.h * PUSKURI);
    const x1 = kiertava ? nakyva.x + nakyva.w * (1 + PUSKURI)
      : Math.min(arkki.x + arkki.w, nakyva.x + nakyva.w * (1 + PUSKURI));
    const y1 = Math.min(arkki.y + arkki.h, nakyva.y + nakyva.h * (1 + PUSKURI));

    const puuttuvat = [];
    const jonossa = new Map();
    /*
     * Osuuko ruutu OIKEASTI näkyvään alueeseen — puskuri pois luettuna?
     *
     * Tähän jakoon koko optimointi nojaa: näkyvät ruudut piirretään
     * heti, rengas joutohetkinä. Osuvuus lasketaan kiertämättömästä
     * sarakkeesta (rx), koska juuri se kertoo, mihin kohtaan ruutua
     * katsotaan; kiertävällä laudalla sama sarake voi olla yhtä aikaa
     * näkyvissä ja renkaassa, ja silloin näkyvyys voittaa.
     */
    const nakyvissa = (rx, ry) => (rx + 1) * koko > nakyva.x && rx * koko < nakyva.x + nakyva.w
      && (ry + 1) * koko > nakyva.y && ry * koko < nakyva.y + nakyva.h;
    for (let ry = Math.floor(y0 / koko); ry <= Math.floor((y1 - 0.001) / koko); ry++) {
      for (let rx = Math.floor(x0 / koko); rx <= Math.floor((x1 - 0.001) / koko); rx++) {
        // Sama sarake voi osua hakualueeseen kahdesti, kun puskurillinen
        // näkymä on laudan levyinen. Ruutu piirretään silti kerran.
        const sarake = kiertava ? ((rx % sarakkeita) + sarakkeita) % sarakkeita : rx;
        const avain = `${sarake},${ry}`;
        if (this.taideRuudut.has(avain) || this.taideTyhjat.has(avain)) continue;
        let ruutu = jonossa.get(avain);
        if (!ruutu) {
          ruutu = { avain, rx: sarake, ry, nakyy: false };
          jonossa.set(avain, ruutu);
          puuttuvat.push(ruutu);
        }
        if (nakyvissa(rx, ry)) ruutu.nakyy = true;
      }
    }
    if (!puuttuvat.length) {
      this.poistaVanhatRuudut();
      return;
    }

    // Lähimmät ensin: keskeltä ruutua reunoja kohti. Kiertävällä laudalla
    // etäisyys mitataan lähintä kopiota pitkin, ei laudan koordinaatteina
    // — muuten sauman takainen ruutu näyttäisi maailman levyiseltä.
    const kx = nakyva.x + nakyva.w / 2;
    const ky = nakyva.y + nakyva.h / 2;
    const etaisyys = (r) => {
      let dx = (r.rx + 0.5) * koko - kx;
      if (kiertava) dx = ((dx % W) + W + W / 2) % W - W / 2;
      return Math.hypot(dx, (r.ry + 0.5) * koko - ky);
    };
    puuttuvat.sort((a, b) => etaisyys(a) - etaisyys(b));

    /*
     * NÄKYVÄT RUUDUT ENSIN, PUSKURIRENGAS JOUTOHETKINÄ (v339).
     *
     * Omistaja: *"se vielä vähän tökkii, lähinnä kun joutuu lataamaan
     * zoomauksen jälkeen uutta karttamateriaalia scrollattaessa."*
     *
     * Puskuroitu alue on yhdeksän ruudullista (näkyvä + ruudullinen
     * joka suuntaan), mutta pelaaja katsoo niistä yhtä. Ennen kaikki
     * yhdeksän piirrettiin samassa keskeytymättömässä silmukassa, joten
     * zoomauksen jälkeen pääsäie oli varattuna vielä pitkään sen
     * jälkeen, kun näkyvä osa oli jo terävä — ja juuri siihen kohtaan
     * osuu se sormenveto, joka nykii.
     *
     * Jako on siksi kahtia. Näkyvät ruudut piirretään heti, samassa
     * silmukassa kuin ennenkin: ne pelaaja näkee nyt. Rengas siirtyy
     * taydennaRengas-jonoon, joka ottaa yhden ruudun kerrallaan
     * joutohetkellä ja väistyy sormen tieltä.
     *
     * Puskuri ei siis pienene — sääntö "puskuria on niin paljon, ettei
     * kesken eleen tarvitse ladata" pätee yhä. Vain sen valmistumisen
     * ajoitus muuttuu.
     */
    const nakyvat = puuttuvat.filter((r) => r.nakyy);
    const rengas = puuttuvat.filter((r) => !r.nakyy);

    this.taidePiirtyy = true;
    this.taideOdottaa = false;
    const skaala = this.taideSkaala;
    (async () => {
      for (const { avain, rx, ry } of nakyvat) {
        if (this.dead || skaala !== this.taideSkaala) break;
        // Uusi ele kesken piirron: keskeytetään ja jatketaan sen jälkeen.
        if (this.kartanRaahaus) { this.taideOdottaa = true; break; }
        /*
         * Mittakaava luetaan RUUDULTA joka ruudun välissä, ei
         * this.taideSkaalasta.
         *
         * taideSkaala päivittyy vain tämän funktion alussa, ja alkuun ei
         * pääse niin kauan kuin piirto on kesken. Zoomaus kesken piirron
         * jäi siksi odottamaan, että vanhentunut sarja piirtyy loppuun
         * — käynnistyksessä se oli mitattuna kuusi sekuntia työtä, joka
         * heitettiin heti pois, ja zoomia napauttaessa jono vain kasvoi.
         * Kun näkymä on vaihtunut, tämä sarja lopetetaan kesken.
         */
        const nyt = this.nakyvaAlue();
        if (nyt && (nyt.skaala > skaala * 1.2 || nyt.skaala < skaala * 0.8)) {
          this.taideOdottaa = true;
          break;
        }
        const ikkuna = { x: rx * koko, y: ry * koko, w: koko, h: koko };
        const kuva = await rasteroiRuutu(this.taide, ikkuna, skaala, this.taideTarkkuus);
        if (this.dead || skaala !== this.taideSkaala) continue;
        // Tyhjä ruutu kirjataan tyhjänä: sitä ei piirretä eikä pyydetä uudestaan.
        if (kuva === RUUTU_TYHJA) { this.taideTyhjat.add(avain); continue; }
        if (!kuva) continue;
        this.taideRuudut.set(avain, kuva);
        // Uusi ruutu alimmaiseksi: vanhan mittakaavan ruudut jäävät
        // päälle siihen asti, kunnes koko näkymä on katettu.
        this.taideRyhma.insertBefore(kuva, this.taideRyhma.firstChild);
      }
      this.taidePiirtyy = false;
      if (this.taideOdottaa && !this.kartanRaahaus) {
        this.poistaVanhatRuudut();
        this.taydennaTaide({ heti: true });
        return;
      }
      // Sarja katkesi kesken (peli vaihtui tai mittakaava muuttui):
      // siivotaan kuten ennenkin, ettei vanha kerros jää DOM:iin.
      if (this.dead || skaala !== this.taideSkaala) { this.poistaVanhatRuudut(); return; }
      /*
       * Vanhat ruudut poistetaan vasta kun RENGAS on valmis.
       *
       * Vanhan mittakaavan ruudut jäävät uusien alle, ja ne peittävät
       * juuri sen alueen, jonne rengas on tulossa. Jos ne poistettaisiin
       * heti näkyvän osan valmistuttua, reunan yli vieritettäessä
       * paljastuisi tyhjä pergamentti — ennen siellä oli edes sumea
       * kartta. taydennaRengas hoitaa poiston, myös kun jono on tyhjä.
       */
      this.taydennaRengas(rengas, skaala);
    })();
  }

  /**
   * Piirtää puskurirenkaan ruutu kerrallaan joutohetkinä.
   *
   * requestIdleCallback on tässä oikea työkalu kahdesta syystä. Se ei
   * laukea kesken sormenvedon — selain on silloin kiireinen, ja työ
   * odottaa itsestään eleen ohi ilman omaa lippukirjanpitoa. Ja se
   * ottaa yhden ruudun kerrallaan, joten pisin yhtenäinen tukos on
   * yhden ruudun mittainen eikä koko renkaan.
   *
   * Aikakatkaisu (timeout) on mukana, jottei rengas jäisi ikuisesti
   * tekemättä sivulla, joka ei koskaan ole joutilas: viimeistään
   * sekunnin päästä ruutu piirretään joka tapauksessa. Selaimessa
   * ilman requestIdleCallbackia (vanhemmat Safarit) tilalle tulee
   * ajastin — hitaampi mutta samanlainen: yksi ruutu kerrallaan.
   */
  taydennaRengas(jono, skaala) {
    this.peruutaRengas();
    if (this.dead || skaala !== this.taideSkaala) return;
    if (!jono?.length) { this.poistaVanhatRuudut(); return; }

    const koko = this.taideRuutu;
    const tarkkuus = this.taideTarkkuus;
    const pyyda = window.requestIdleCallback
      ? (tehtava) => window.requestIdleCallback(tehtava, { timeout: 1000 })
      : (tehtava) => setTimeout(tehtava, 60);
    const tyo = { id: 0, jono };
    this.taideRengas = tyo;

    const askel = async () => {
      // Vanhentunut työ: mittakaava vaihtui tai peli vaihtui alta.
      if (this.dead || this.taideRengas !== tyo || skaala !== this.taideSkaala) return;
      /*
       * Samat kolme kieltoa kuin täydennyksellä: eleen, lennon ja
       * zoomiliu'un aikana ei rasteroida. Ero on, ettei tässä
       * merkitä odottavaa työtä lipuksi vaan pyydetään yksinkertaisesti
       * seuraava joutohetki — jono on tallessa tässä sulkeumassa.
       */
      if (this.kartanRaahaus || this.taidePiirtyy
          || document.body.classList.contains('flight-active')
          || document.body.classList.contains('zoom-kaynnissa')) {
        tyo.id = pyyda(askel);
        return;
      }
      const { avain, rx, ry } = jono.shift();
      if (!this.taideRuudut.has(avain) && !this.taideTyhjat.has(avain)) {
        const ikkuna = { x: rx * koko, y: ry * koko, w: koko, h: koko };
        const kuva = await rasteroiRuutu(this.taide, ikkuna, skaala, tarkkuus);
        if (this.dead || this.taideRengas !== tyo || skaala !== this.taideSkaala) return;
        if (kuva === RUUTU_TYHJA) this.taideTyhjat.add(avain);
        else if (kuva) {
          this.taideRuudut.set(avain, kuva);
          // Alimmaiseksi, kuten näkyvätkin: vanhat jäävät päälle.
          this.taideRyhma.insertBefore(kuva, this.taideRyhma.firstChild);
        }
      }
      if (jono.length) { tyo.id = pyyda(askel); return; }
      this.taideRengas = null;
      this.poistaVanhatRuudut();
    };
    tyo.id = pyyda(askel);
  }

  /** Peruu kesken olevan rengastyön. Kesken oleva ruutu saa valmistua. */
  peruutaRengas() {
    if (!this.taideRengas) return;
    // Sidottuna: irrotettu window-metodi kaatuu "Illegal invocation".
    if (window.cancelIdleCallback) window.cancelIdleCallback(this.taideRengas.id);
    else clearTimeout(this.taideRengas.id);
    this.taideRengas = null;
  }

  /**
   * Piirtää maastonimet uudelleen näkyvälle alueelle.
   *
   * Piirto tehdään vain kun näkymä on OIKEASTI muuttunut. Sama funktio
   * kutsutaan jokaisesta näkymän asettumisesta, ja moni niistä ei siirrä
   * karttaa lainkaan (fitViewBox ajetaan myös ikkunan koon muuttuessa ja
   * paneelin auetessa). Turha piirto maksaisi muutaman sadan elementin
   * poiston ja luonnin joka kerta.
   */
  /**
   * Lähikuvan vesi: uomat, järvien syvyys ja meren pohja.
   *
   * Sama tunnistetemppu kuin maastonimillä: pieni liike ei muuta
   * mitään, koska kerros herää ja sammuu kokonaisina askelina.
   * Tunnisteessa on mukana voimakkuus eikä pelkkä mittakaava, jotta
   * häivytyksen välivaiheet piirtyvät mutta paikallaan seisominen ei
   * piirrä mitään uudelleen.
   */
  paivitaLahivesi() {
    /*
     * LÄHIVESI ON POIS KÄYTÖSTÄ. Joet ja järvet siirtyivät omaan
     * linssiinsä (ks. mapart.js drawMaasto), eikä pohjakartalla ole enää
     * vettä piirrettävänä. Kerrosta ei luoda, joten tämä palaa heti.
     */
    if (!this.lahivesiKerros) return;
    const nakyva = this.nakyvaAlue();
    if (!nakyva) return;
    const voima = lahivedenVoima(nakyva.w);
    const tunniste = voima
      ? [Math.round(voima * 20), ...[nakyva.x, nakyva.y, nakyva.w].map((n) => Math.round(n / 40))].join(':')
      : 'pois';
    if (this.lahivesiTunniste === tunniste) return;
    this.lahivesiTunniste = tunniste;
    drawLahivesi(this.lahivesiKerros, this.game.pack.map, {
      nakyva,
      nimet: this.maastonimet,
      syvyys: this.merisyvyys,
      meriRajaus: this.meriRajaus,
    });
  }

  paivitaMaastonimet() {
    if (!this.maastonimiKerros) return;
    if (!this.maastonimet) return;
    const nakyva = this.nakyvaAlue();
    if (!nakyva) return;
    // Tunniste karkealla tarkkuudella: pienempi liike ei muuta yhtään
    // nimeä, koska nimet ilmestyvät ja katoavat kokonaisina.
    /*
     * Vesistölinssi kuuluu tunnisteeseen: linssin vaihto ei liikuta
     * karttaa, joten pelkkä näkymä olisi sama ennen ja jälkeen — ja
     * jokien nimet jäisivät piirtymättä (tai jäisivät päälle) siihen
     * asti kun pelaaja seuraavan kerran panoroi.
     */
    /*
     * Moottorin tunnus eikä `linssiValittu`: valinta voi olla
     * tallennettu edelliseltä pelikerralta linssistä, jota pelaaja ei
     * vielä omista, ja silloin kerrosta ei sytytetä. Jokien nimet
     * seuraavat sitä mikä KARTALLA on, ei sitä mikä on muistissa.
     */
    const joet = this.linssiTuki?.moottori?.tunnus === 'vesistot';
    const tunniste = [nakyva.x, nakyva.y, nakyva.w, nakyva.skaala]
      .map((n) => Math.round(n * 4)).join(':') + (joet ? '+joet' : '');
    if (this.maastonimiTunniste === tunniste) return;
    this.maastonimiTunniste = tunniste;
    drawMaastonimet(this.maastonimiKerros, this.game.pack.map, {
      nimet: this.maastonimet,
      nakyva,
      avaa: (kohde) => this.avaaMaastonimi(kohde),
      joet,
    });
  }

  /**
   * i-ikonin napautus: Wikipedian artikkeli kohteesta.
   *
   * Sama ikkuna kuin kaupungeilla, joten kuvat, galleria ja lähdemerkintä
   * tulevat ilmaiseksi. Nimipaketin oma suomenkielinen selitys näytetään
   * heti odotustekstin tilalla — se on paikalla ennen kuin verkosta
   * kuuluu mitään, ja se jää ainoaksi tekstiksi, jos yhteyttä ei ole.
   */
  avaaMaastonimi(kohde) {
    if (!kohde?.wiki) return;
    this.openWikiArticle(kohde.wiki, kohde.nimi, { alkuteksti: kohde.selitys });
  }

  /**
   * Poistaa edellisen mittakaavan ruudut ja alkuperäiset vektorit.
   *
   * Vasta täällä, ei heti uuden ruudun tullessa: vanha kuva saa jäädä
   * ruudulle siihen asti kunnes uusi kattaa saman alueen. Muuten
   * kartalla vilahtaisi tyhjää joka kerta kun zoomataan.
   */
  poistaVanhatRuudut() {
    if (this.taidePiirtyy) return;
    for (const solmu of this.taideVanhat ?? []) {
      solmu.remove();
      if (solmu.dataset?.osoite) URL.revokeObjectURL(solmu.dataset.osoite);
    }
    this.taideVanhat = [];
    if (this.taideRuudut?.size) {
      for (const solmu of this.taideVektorit ?? []) solmu.remove();
      this.taideVektorit = [];
    }
  }

  /** Vuorossa olevan pelaajan nappulan kohta laudan koordinaateissa. */
  pelaajanKohta() {
    // turn voi olla määrittelemättä heti tallennuksen latauduttua
    // (mitattu 8.8.2026: players oli jo paikallaan, turn ei) — silloin
    // players[undefined] hukkasi pelaajan ja kartta keskittyi laudan
    // keskelle. Yksinpelissä oletus 0 on aina oikein.
    const pelaaja = this.game.players?.[this.game.turn ?? 0];
    const kaupunki = pelaaja && this.game.board?.cityById?.get(pelaaja.pos?.city);
    return kaupunki ? { x: kaupunki.x, y: kaupunki.y } : null;
  }

  /**
   * Painikkeiden tila: kumpikin himmenee kun porras on päässä. Nappi ei
   * katoa vaan menee pois käytöstä — katoava nappi saa sormen etsimään
   * sitä, ja kartan reunassa se olisi erityisen ärsyttävää.
   */
  /**
   * Onko maiden tiedot -tila päällä: napista tai varusteesta.
   *
   * Kaksi lähdettä yhdelle tilalle tarvitsee yhden totuuden, tai
   * varusteen vaihto sammuttaisi napilla avatun tilan.
   */
  maatiedotHalutaan() {
    return Boolean(this.maaNappiPaalla) || this.linssiValittu === 'maatiedot';
  }

  /** Napin ulkoasu ja näkyvyys: vain laudoilla, joilla on maiden rajat. */
  paivitaMaalehtiNappi() {
    const nappi = document.getElementById('maalehti-nappi');
    if (!nappi) return;
    const rajat = Boolean(this.game?.pack?.map?.countryShapes);
    nappi.hidden = !rajat || this.avausNakymassa();
    nappi.setAttribute('aria-pressed', String(this.maatiedotHalutaan()));
  }

  paivitaZoomiNapit() {
    // Maiden lehdet -nappi elää samaa elämää kuin zoomi: se piiloutuu
    // avausnäkymässä ja palaa kartan mukana. Kutsu on ennen zoomin
    // varhaista paluuta, jottei se jää tekemättä.
    this.paivitaMaalehtiNappi();
    const sisaan = document.getElementById('zoom-in');
    const ulos = document.getElementById('zoom-out');
    if (!sisaan || !ulos) return;
    const piilossa = this.avausNakymassa();
    const ryhma = sisaan.parentElement;
    if (ryhma) ryhma.hidden = piilossa;
    sisaan.disabled = this.zoomiIndeksi >= this.zoomiTasot().length - 1;
    ulos.disabled = this.zoomiIndeksi <= 0;
  }

  /** Palauttaa kartan tavalliseen kokoonsa (uusi peli, laudan vaihto). */
  nollaaAloitusZoom() {
    this.aloitusZoom = false;
    this.mannerZoom = false;
    // Porras oletukselle: seuraava lähikuva alkaa taas saapumistasolta.
    this.zoomiPorras = null;
    this.panX = null;
    this.panY = null;
    this.panVara = 0;
    this.panVaraY = 0;
    this.panJakso = 0;
    this.zoomiVapaa = 0;
    this.svg.style.transition = '';
    this.svg.style.transform = '';
    this.svg.style.width = '';
    this.svg.style.height = '';
    this.svg.style.flex = '';
    this.svg.style.alignSelf = '';
    clearTimeout(this.mannerAjastin);
    clearTimeout(this.kiikariAjastin);
    clearTimeout(this.zoomAjastin);
    clearTimeout(this.korttiAjastin);
    document.body.classList.remove(
      'aloitus-zoom', 'manner-zoom', 'kartta-raahaus', 'kiikari-paalla',
      'zoom-kaynnissa', 'manner-odottaa',
    );
  }

  /**
   * Mantereen lähikuva puhelimella (omistajan toive). Sama idea kuin
   * aloituskartalla, mutta kartta on panoroitavissa kaikkiin neljään
   * suuntaan — manner on isompi kuin ruutu joka suuntaan.
   *
   * Toistaiseksi vain Euroopalla: ilme hiotaan siellä kuntoon ennen kuin
   * sama tuodaan muille laudoille (lisää laudan id ZOOMATTAVAT-settiin).
   */
  mannerZoomTarpeen() {
    if (this.katselu || this.reducedMotion) return false;
    if (this.game.phase === 'pickstart') return false;
    if (!ZOOMATTAVAT.has(this.game.pack.id)) return false;
    // Lentokalvon aikana lauta piirtyy jo taustalle, mutta pelaaja ei näe
    // sitä. Zoomaus odottaa Astu mantereelle -napin painallusta
    // (omistajan havainto: zoomaus ehti tapahtua lennon aikana).
    if (document.body.classList.contains('flight-active')) return false;
    // Isolla laudalla lähikuva tarvitaan aina, myös leveällä ruudulla:
    // kokonäkymä näyttäisi koko vanhan maailman kerralla, eikä siitä
    // erota mitään.
    if (this.isoLauta()) return true;
    return (this.svg.parentElement?.clientWidth ?? 0) < 700;
  }

  /**
   * Onko lauta niin iso, ettei kokonäkymästä ole hyötyä?
   *
   * Vanhat laudat ovat 1000 yksikköä leveitä, ja niiden kokonäkymä on
   * luettava. Yhdistetty vanha maailma on 7200, ja kokonäkymässä
   * Lissabonista Tokioon mahtuu puhelimen ruudulle — kaupungit ovat
   * pisteitä eikä nimiä erota. Omistajan toive: lennettäessä kartan
   * pitää olla valmiiksi yhtä lähellä kuin ennenkin, ja loput näkyvät
   * vasta jos pelaaja itse loitontaa.
   */
  isoLauta() {
    return (this.contentBox?.w ?? 1000) > 2000;
  }

  /**
   * Saapumisnäkymän keskipiste: kaupunki, mutta kohdemantereen suuntaan
   * siirrettynä.
   *
   * Omistajan havainto: "nyt kartta keskittää kaupungin ja Tangerin
   * kohdalla näkyy Eurooppaa yhtä paljon kuin Aasiaa." Tanger on
   * Afrikan pohjoisimmassa kulmassa, joten kaupunki keskellä tarkoittaa,
   * että puolet ruudusta on sitä mannerta, jonne ei olla tultu.
   *
   * Painopiste lasketaan saman mantereen kaupungeista (map.cityManner),
   * ei mantereen muodosta: kaupungit ovat se, mitä pelissä tehdään, ja
   * ne ovat valmiina laudan koordinaateissa. Kiertävällä kartalla
   * jokainen kaupunki tuodaan ensin lähimmäksi kohdetta — muuten
   * Beringinsalmen molemmin puolin ulottuva Aasia antaisi painopisteen
   * keskeltä Atlanttia.
   *
   * Siirto on osittainen ja rajattu. Koko matka painopisteeseen veisi
   * kaupungin ruudun laitaan, ja kaupunki on se, mihin on tultu.
   */
  mantereenKeskitys(kohde, paneW, paneH, skaala) {
    const kartta = this.game.pack.map;
    const manner = kohde?.id && kartta?.cityManner?.[kohde.id];
    if (!manner || !skaala) return kohde;
    const W = this.kiertava() ? kartta.width : 0;
    let summaX = 0;
    let summaY = 0;
    let montako = 0;
    for (const kaupunki of this.game.board.cities ?? []) {
      if (kartta.cityManner[kaupunki.id] !== manner) continue;
      let x = kaupunki.x;
      if (W) {
        while (x - kohde.x > W / 2) x -= W;
        while (x - kohde.x < -W / 2) x += W;
      }
      summaX += x;
      summaY += kaupunki.y;
      montako += 1;
    }
    if (montako < 2) return kohde;
    const rajaX = (paneW / skaala) * MANNER_SIIRTO_X;
    const rajaY = (paneH / skaala) * MANNER_SIIRTO_Y;
    const vali = (arvo, raja) => Math.max(-raja, Math.min(raja, arvo));
    return {
      x: kohde.x + vali((summaX / montako - kohde.x) * MANNER_PAINO, rajaX),
      y: kohde.y + vali((summaY / montako - kohde.y) * MANNER_PAINO, rajaY),
    };
  }

  /** Mantereen lähikuvan mitat ja rajat. */
  sovitaMannerZoom(paneW, paneH) {
    /*
     * Vanhentunut panorointi hylätään, kun ruudun koko on muuttunut
     * laskennan jälkeen. Latauksessa pan ehdittiin laskea ennen kuin
     * asettelu oli lopullinen, ja väärä arvo jäi voimaan — kartta
     * aukesi aina keskelle Atlanttia vaikka kohde (pelaajan kaupunki)
     * oli koko ajan oikein (omistajan havainto 8.8.2026, v386;
     * mitattu: sama laskenta oikealla koolla keskittää täsmälleen).
     * Käsin panorointi säilyy niin kauan kuin koko ei muutu.
     */
    if (this.panX != null
      && (this.panKoko?.w !== paneW || this.panKoko?.h !== paneH)) {
      this.panX = null;
      this.panY = null;
    }
    this.panKoko = { w: paneW, h: paneH };
    const box = this.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    const yleiskuva = Math.min(paneW / box.w, paneH / box.h);
    // Zoomitaso tulee portaikosta: automaattinen saapumiszoom käyttää
    // oletusporrasta, painikkeet siirtävät sitä.
    const skaala = this.rajaaSkaala(yleiskuva * this.zoomiKerroin, paneW, box);
    // Laudan eteläpuolelle varataan tilaa alarivin nappien verran, jotta
    // eteläisimmät kaupungit saa panoroitua niiden alta pois (omistajan
    // havainto: Kreeta ja Ateena jäivät nappien alle). Tila ei muuta
    // zoomaustasoa — se vain jatkaa panoroitavaa aluetta, ja siihen
    // osuu kartan oma Pohjois-Afrikan kaistale.
    const etelaJatko = (paneH * ALAKAISTA) / skaala;
    // Sama tila laudan pohjoispuolelle (omistajan havainto: myös
    // pohjoisesta hukkui kaupunkeja). Ylhäällä tilan vievät matkakirjan
    // kortti ja kartan yläreuna, joten Tromssa ja Lappi jäivät piiloon
    // eikä niiden yläpuolella ollut mitään, mihin panoroida. Kartan
    // pergamentti jatkuu rajauksen yli joka suuntaan (mapart.js PAPER),
    // joten kaista näyttää kartalta eikä tyhjältä.
    const pohjoisJatko = (paneH * YLAKAISTA) / skaala;
    const ylaReuna = box.y - pohjoisJatko;
    const korkeusYks = box.h + pohjoisJatko + etelaJatko;
    /*
     * Kiertävällä kartalla piirretään yksi ruudullinen yli laudan
     * leveyden. Se on juuri se kaistale, jonka <use>-kopio täyttää, ja
     * juuri se mitä tarvitaan kun vieritys on kiertymässä ympäri.
     */
    const jakso = Math.round(box.w * skaala);
    const yliLeveys = this.kiertava() ? Math.ceil(paneW) : 0;
    const nakyvaYks = box.w + yliLeveys / skaala;
    const leveys = jakso + yliLeveys;
    const korkeus = Math.round(korkeusYks * skaala);
    this.svg.setAttribute('viewBox', `${box.x} ${ylaReuna} ${nakyvaYks} ${korkeusYks}`);
    this.svg.style.width = `${leveys}px`;
    this.svg.style.height = `${korkeus}px`;
    this.svg.style.flex = '0 0 auto';
    this.svg.style.alignSelf = 'flex-start';
    this.viewBoxSize = { vw: nakyvaYks, vh: korkeusYks };
    this.zoomSkaala = skaala;
    // Maan "i" -napin osumapinta on SVG-yksiköissä: se on mitoitettava
    // uudestaan aina kun skaala muuttuu, tai se kutistuu loitonnettaessa.
    this.paivitaMaaIOsuma();
    this.zoomYlaReuna = ylaReuna;
    this.panJakso = this.kiertava() ? jakso : 0;
    this.panVara = this.kiertava() ? 0 : Math.max(0, leveys - paneW);
    this.panVaraY = Math.max(0, korkeus - paneH);
    if (this.panX == null || this.panY == null) {
      /*
       * Ilman asetettua kohdetta keskitetään PELAAJAAN, ei laudan
       * geometriseen keskipisteeseen — maailmanlaudalla keskipiste on
       * keskellä Atlanttia, ja päivityksen jälkeinen uusi lataus
       * aukesi aina sinne (omistajan havainto 8.8.2026, v386).
       */
      const kohde = this.zoomKohde ?? this.pelaajanKohta()
        ?? { x: box.x + box.w / 2, y: box.y + box.h / 2 };
      const keskus = this.mantereenKeskitys(kohde, paneW, paneH, skaala);
      this.panX = paneW / 2 - (keskus.x - box.x) * skaala;
      this.panY = paneH / 2 - (keskus.y - ylaReuna) * skaala;
    }
    this.asetaPan(this.panX, this.panY);
    this.placeFactCard(paneW, paneH);
    if (this.dieThrown && this.boardDie) this.boardDie.place(this.dieRestingSpot());
  }

  /**
   * Mantereelle saavuttaessa näytetään ensin kokonäkymä ja vasta sen
   * jälkeen zoomataan pelinappulan kohdalle (omistajan toive): pelaaja
   * ehtii nähdä, minne on tullut, ennen kuin kartta menee lähelle.
   */
  ajastaMannerZoom() {
    clearTimeout(this.mannerAjastin);
    if (!this.mannerZoomTarpeen() || this.mannerZoom) {
      document.body.classList.remove('manner-odottaa');
      return;
    }
    /*
     * Isolla laudalla kokonäkymää ei näytetä lainkaan.
     *
     * Kokonäkymä on siellä siksi, että pelaaja näkee minne on tullut.
     * Vanhalla maailmalla se ei kerro sitä: koko manner mahtuu ruudulle
     * niin pienenä, ettei kaupunkeja erota. Silloin on parempi laskeutua
     * suoraan lähikuvaan, kuten pienemmillä laudoilla ennenkin.
     */
    if (this.isoLauta()) {
      this.zoomaaMantereelle();
      return;
    }
    // Matkakirja ja toimintonapit odottavat zoomauksen loppuun (omistajan
    // toive): pelaaja näkee ensin mantereen kokonaan ja saa sen jälkeen
    // vasta kortit eteensä.
    document.body.classList.add('manner-odottaa');
    this.mannerAjastin = setTimeout(() => {
      if (this.dead || !this.mannerZoomTarpeen() || this.mannerZoom) return;
      this.zoomaaMantereelle();
    }, MANNER_ZOOM_VIIVE);
  }

  /** Zoomaa mantereen kartan nappulan kohdalle pehmeästi liukuen. */
  zoomaaMantereelle() {
    if (this.mannerZoom) return;
    const [vx, vy, vw, vh] = (this.svg.getAttribute('viewBox') ?? '0 0 1000 1000')
      .split(/\s+/).map(Number);
    // Kohde: pelaajan nappula, tai näkymän keskus jos sitä ei löydy.
    // pelaajanKohta on toinen varareitti: uudelleenlatauksessa cityOf
    // ei palauttanut koordinaatteja, ja näkymä putosi laudan keskelle
    // — maailmanlaudalla keskelle Atlanttia (omistajan havainto
    // 8.8.2026, v386: "Päivityksen jälkeen kartta siirtyy aina tänne").
    const oma = this.game.cityOf?.();
    const kohde = oma && Number.isFinite(oma.x)
      ? { x: oma.x, y: oma.y, id: oma.id }
      : (this.pelaajanKohta() ?? { x: vx + vw / 2, y: vy + vh / 2 });

    this.mannerZoom = true;
    this.panX = null;
    this.panY = null;
    this.zoomKohde = kohde;
    document.body.classList.add('manner-zoom');
    this.fitViewBox();
    /*
     * EI LIUKUA (omistajan päätös 7.8.2026): *"ota zoomausanimaatiot
     * pois kun tullaan aloitusnäytöltä lentokoneella mantereelle. peli
     * vain siis siirtyy suoraan oikeaan zoom tasoon ilman
     * animaatiota."*
     *
     * Tässä oli ennen kaksi liukua: isolla laudalla saapuminen
     * MANNER_LAAJUUS-kertaisesta näkymästä ja muilla laudoilla liuku
     * napautuskohdasta. Molemmat poistettiin — fitViewBox yllä on jo
     * asettanut lopullisen näkymän, joten mitään muuta ei tarvita.
     *
     * Zoomausääni lähti mukana: se soi täsmälleen liu'un mittaisena
     * (js/sound.js ZOOM_VAUHTI), eikä moottorin humaus ilman liikettä
     * kerro mitään. asetaZoomAlku ja asetaSaapumisAlku jäävät
     * käyttöön aloituskartan omassa zoomissa (zoomaaAloituskartta).
     *
     * Kuva pyydetään heti oikealla mittakaavalla: ilman tätä ruudut
     * jäisivät yleiskuvan tarkkuuteen siihen asti, kunnes jokin muu
     * kutsuisi täydennyksen.
     */
    this.paivitaZoomiNapit();
    document.body.classList.remove('manner-odottaa');
    this.taydennaTaide?.({ heti: true });
  }

  /**
   * Saapumisliu'un alkuasento isolla laudalla: sama näkymä
   * MANNER_LAAJUUS kertaa laajempana.
   *
   * Keskipiste luetaan lopullisesta panoroinnista eikä lasketa
   * kohteesta. Kiertävällä kartalla panX on normalisoitu välille
   * [-jakso, 0), ja kohde voi näkyä ruudulla kierron kopion kautta —
   * jolloin kohteesta laskettu piste olisi maailman leveyden verran
   * pielessä ja liuku lentäisi koko kartan poikki.
   */
  asetaSaapumisAlku(paneW, paneH) {
    if (this.reducedMotion) return;
    const s = 1 / MANNER_LAAJUUS;
    // Ruudun keskipiste elementin omissa pikseleissä, sellaisena kuin
    // se juuri nyt on.
    const ex = paneW / 2 - (this.panX ?? 0);
    const ey = paneH / 2 - (this.panY ?? 0);
    const tx = paneW / 2 - s * ex;
    const ty = paneH / 2 - s * ey;
    this.svg.style.transition = 'none';
    this.svg.style.transform =
      `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${s.toFixed(4)})`;
    // Pakotettu asettelu, jotta selain näkee alkuasennon omana tilanaan.
    void this.svg.getBoundingClientRect();
  }

  /**
   * Zoomaa aloituskartan lähikuvaan. Avausteksti häivytetään ensin pois,
   * jotta lauta saa koko ruudun. Kutsutaan ensimmäisestä napautuksesta.
   */
  zoomaaAloituskartta(kohta = null) {
    if (this.aloitusZoom) return;
    const pane = this.svg.parentElement;
    const paneW = pane.clientWidth;
    const paneH = pane.clientHeight;
    // Yleiskuvan rajaus talteen: liu'un alkuasento lasketaan siitä.
    const [vx, vy, vw, vh] = (this.svg.getAttribute('viewBox') ?? '0 0 1000 1000')
      .split(/\s+/).map(Number);
    const yleisSkaala = paneW / vw;
    // Tarkennuspiste: se kohta karttaa, johon käyttäjä napautti — ei
    // näkymän keskus (omistajan toive: zoomaus keskittyy napautettuun
    // kohtaan riippumatta siitä, osuiko se kaupunkiin).
    const fokus = kohta ?? { x: vx + vw / 2, y: vy + vh / 2 };
    // Napautuskohta ruudulla ennen zoomausta: siitä liuku lähtee.
    const sx = (fokus.x - vx) * yleisSkaala;
    const sy = (fokus.y - vy) * yleisSkaala;

    this.aloitusZoom = true;
    this.panX = null;
    this.zoomAnkkuri = fokus.x;
    document.body.classList.add('aloitus-zoom');
    this.fitViewBox();
    // Renkaat piirretään uudelleen, jotta napautus valitsee kaupungin
    // eikä enää zoomaa.
    this.drawTargets();
    // Alkuasento heti: muuten kartta näyttäisi hyppäävän lähikuvaan jo
    // ennen kuin liuku ehtii alkaa hiljaisen hetken jälkeen.
    this.asetaZoomAlku(fokus, sx, sy, yleisSkaala);
    this.zoomAanellaJaViiveella(
      () => this.kaynnistaZoomLiuku(ALOITUS_ZOOM_MS), ALOITUS_ZOOM_MS,
    );
  }

  /**
   * Zoomausäänen tieltä raivataan hetki hiljaisuutta (omistajan toive):
   * lukuääni lopetetaan kokonaan ja taustaäänimaisema vaimennetaan, ja
   * vasta pienen viiveen jälkeen zoomausääni ja liuku käynnistyvät.
   * Ilman taukoa moottori hukkui puheen ja meren alle.
   */
  zoomAanellaJaViiveella(liuku, kesto = ZOOM_MS) {
    this.stopIntroVoice();
    this.stopDiaryVoice();
    vaimennaTausta();
    clearTimeout(this.zoomAlkuAjastin);
    this.zoomAlkuAjastin = setTimeout(() => {
      if (this.dead) return;
      // Moottori soi täsmälleen liu'un mittaisena, ja sen korkeus
      // seuraa liu'un vauhtia (js/sound.js ZOOM_VAUHTI).
      sfx.play('zoom', { kesto: kesto / 1000 });
      liuku();
      // Taustamaisema palaa vasta kun moottori on vaiennut.
      clearTimeout(this.zoomTaustaAjastin);
      this.zoomTaustaAjastin = setTimeout(() => {
        if (!this.dead) palautaTausta();
      }, kesto + 300);
    }, ZOOM_TAUKO_MS);
  }

  /** Napautuskohta ruudulla kartan omiksi koordinaateiksi. */
  kartanKohta(clientX, clientY) {
    const r = this.svg.getBoundingClientRect();
    const [vx, vy, vw, vh] = (this.svg.getAttribute('viewBox') ?? '0 0 1000 1000')
      .split(/\s+/).map(Number);
    if (!r.width || !r.height) return null;
    return {
      x: vx + ((clientX - r.left) / r.width) * vw,
      y: vy + ((clientY - r.top) / r.height) * vh,
    };
  }

  /**
   * Pehmeä siirtymä yleiskuvasta lähikuvaan.
   *
   * Kartta on jo piirretty lähikuvan tarkkuudella, ja siirtymä tehdään
   * pelkällä CSS-muunnoksella: se on kompositorin työtä, joten selain
   * rasteroi kartan kerran ja venyttää valmista rasteria. Tämä on sama
   * asia kuin kartan tekeminen ennalta bittikartaksi (omistajan ehdotus),
   * mutta ilman erillistä kuvaa — eikä lopputulos sumene, koska
   * animaation päättyessä ruudulla on täysi tarkkuus.
   */
  asetaZoomAlku(fokus, sx, sy, yleisSkaala) {
    if (this.reducedMotion) return;
    const box = this.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    const s = yleisSkaala / this.zoomSkaala;
    // Tarkennuspiste elementin omissa pikseleissä lähikuvan mitoilla.
    const ex = (fokus.x - box.x) * this.zoomSkaala;
    const ey = (fokus.y - (this.zoomYlaReuna ?? box.y)) * this.zoomSkaala;
    // Alkuasento: sama piste pysyy siinä kohdassa ruutua, jossa se oli
    // napautushetkellä — kuva laajenee napautetusta kohdasta ulospäin.
    const tx = sx - s * ex;
    const ty = sy - s * ey;
    this.svg.style.transition = 'none';
    this.svg.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${s.toFixed(4)})`;
    // Pakotettu asettelu, jotta selain näkee alkuasennon omana tilanaan
    // eikä hyppää suoraan loppuun.
    void this.svg.getBoundingClientRect();
  }

  /**
   * Käynnistää liu'un alkuasennosta lähikuvaan.
   *
   * Kiikariefekti nostetaan esiin vasta, kun liuku on valmis (omistajan
   * toive) — liikkuvan kuvan päällä sumennus on sekä rumaa että
   * puhelimelle raskasta. Feidauksen hoitaa css.
   */
  kaynnistaZoomLiuku(kesto = ZOOM_MS) {
    if (this.reducedMotion) return;
    this.svg.style.transition = `transform ${kesto}ms ${ZOOM_PEHMENNYS}`;
    // Liu'un ajaksi kartan oma reunahäivytys sammuu (omistajan
    // havainto). Lähikuvan kartta on rajattu kaupunkien korkeuteen,
    // joten liu'un alussa se ei täytä paneelia — häivytys piirtyi
    // paljaalle taustalle ja näkyi ruudun laidoissa tummina kaarina.
    document.body.classList.add('zoom-kaynnissa');
    // Avausteksti lähtee liikkeelle samalla hetkellä kuin kartta.
    this.tyonnaAvausteksti(kesto);
    this.asetaPan(this.panX, this.panY);
    clearTimeout(this.zoomAjastin);
    this.zoomAjastin = setTimeout(() => {
      this.svg.style.transition = '';
      document.body.classList.remove('zoom-kaynnissa');
      // Liuku ohi: nyt kuva saa piirtyä loppuun.
      this.taydennaTaide?.({ heti: true });
    }, kesto + 60);
    clearTimeout(this.kiikariAjastin);
    // Kortit takaisin näkyviin, kun liuku on ohi.
    clearTimeout(this.korttiAjastin);
    this.korttiAjastin = setTimeout(() => {
      if (!this.dead) document.body.classList.remove('manner-odottaa');
    }, kesto);
    // Kiikari kuuluu toistaiseksi vain maailmankarttaan (omistajan
    // toive koski etusivua).
    if (!this.aloitusZoom) return;
    this.kiikariAjastin = setTimeout(() => {
      if (!this.dead) document.body.classList.add('kiikari-paalla');
    }, kesto);
  }

  /**
   * Avausteksti työntyy alas täsmälleen sen verran kuin kartan alareuna
   * liikkuu (omistajan toive): teksti ei häivy erikseen vaan kasvava
   * kartta työntää sen ruudun alle.
   *
   * Matka mitataan geometriasta eikä arvata prosenttina. Alkuasento on
   * jo asetettu (asetaZoomAlku), joten kartan alareunan voi lukea
   * suoraan; loppuasento lasketaan lähikuvan mitoista. Kesto ja
   * pehmennys ovat samat kuin kartalla, joten liike on samaa tahtia
   * koko matkan eikä vain päätepisteissä.
   *
   * Tekstistä ei tarvitse tehdä kuvaa: siirto on pelkkä transform,
   * jonka selain hoitaa kompositorissa ilman uudelleenlatomista tai
   * -piirtoa. will-change varmistaa oman kerroksen, joka on juuri se
   * hyöty, jonka kuva antaisi.
   */
  tyonnaAvausteksti(kesto) {
    const teksti = this.introEl;
    if (!teksti || teksti.hidden || !this.aloitusZoom) return;
    const pane = this.mapPane.getBoundingClientRect();
    const alkuAla = this.svg.getBoundingClientRect().bottom;
    const korkeus = parseFloat(this.svg.style.height) || pane.height;
    const loppuAla = pane.top + (this.panY ?? 0) + korkeus;
    // Vähintään paneelin verran, jottei teksti jää näkyviin silloinkaan
    // kun kartta sattuu kasvamaan odotettua vähemmän.
    const siirto = Math.max(pane.height - teksti.offsetTop, loppuAla - alkuAla);
    teksti.style.setProperty('--intro-tyonto', `${Math.round(siirto)}px`);
    teksti.style.setProperty('--intro-kesto', `${kesto}ms`);
    teksti.style.setProperty('--intro-pehmennys', ZOOM_PEHMENNYS);
    teksti.classList.add('intro-pois');
  }

  /**
   * Onko lähikuva tarpeen? Vain kapealla ruudulla: leveällä koko lauta
   * näkyy kerralla riittävän isona, eikä ylimääräinen napautus tuo
   * mitään (omistajan toive koski nimenomaan puhelinta).
   */
  zoomTarpeen() {
    if (this.katselu || this.reducedMotion) return false;
    return (this.svg.parentElement?.clientWidth ?? 0) < 700;
  }

  /**
   * Vaakapanorointi lähikuvassa. Sormen liike siirtää karttaa; pystyyn ei
   * reagoida. Raahauksen ajaksi kartan animaatiot vaimennetaan
   * (omistajan toive), jotta ruudunpäivitys pysyy nopeana.
   */
  asennaPanorointi() {
    const pane = this.svg.parentElement;
    let alku = null;
    let liikkui = false;

    /*
     * --- nipistys ---------------------------------------------------
     *
     * Omistajan toive: zoomaus nipistyseleen taakse. Painikkeet jäävät,
     * koska tietokoneella ei nipistetä.
     *
     * KOSKETUSTAPAHTUMAT eikä osoitintapahtumat. Ero on ratkaiseva
     * iOS:llä: `touch-action: none` estää siellä vierityksen mutta EI
     * selaimen omaa nipistyszoomia. Safari aloittaa oman eleensä ja
     * peruu osoitintapahtumat kesken kaiken, jolloin käsittelijä ei saa
     * elettä koskaan valmiiksi — omistajan havainto: "nipistys ei tee
     * mitään". `touchmove`in preventDefault pysäyttää sivun zoomin, ja
     * se toimii sekä Safarissa että Chromessa.
     *
     * Ele piirretään CSS-muunnoksella ja mittakaava lukitaan vasta kun
     * sormet irtoavat. Sama sääntö kuin siirrossa ja samasta syystä:
     * rasterointi vie satoja millisekunteja pääsäikeessä.
     *
     * Muunnoksen origo on elementin vasen yläkulma, joten sormien
     * keskipiste pysyy paikallaan kun siirto lasketaan
     *   t = m - (m - siirto) * suhde
     */
    let nipistys = null;

    const kaksiSormea = (e) => {
      const [a, b] = [e.touches[0], e.touches[1]];
      return {
        etaisyys: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
        // Asiakaskoordinaatteina: paneelin suhteen laskettu keskipiste
        // ei kelpaa ankkuriksi, koska elementti ei ala paneelin kulmasta.
        keski: { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 },
      };
    };

    /*
     * Ruudun piste laudan koordinaateiksi — ELEMENTIN OMASTA
     * SIJAINNISTA, ei zoomimuuttujista.
     *
     * Ensin laskin tämän kaavalla panX/panY ja zoomYlaReuna. Kaava on
     * oikein, mutta se olettaa SVG:n alkavan paneelin vasemmasta
     * yläkulmasta. Pystysuunnassa se ei pidä paikkaansa: lähikuvassa
     * elementti on `align-self: flex-start`, aloituskartalla `center`,
     * ja asettelu siirtää sitä. Ero näkyi juuri niin kuin omistaja
     * kuvasi — kartta heilahti sormien irrotessa, ja heilahdus oli
     * lähes kokonaan pystysuuntainen.
     *
     * getBoundingClientRect ja viewBox kertovat totuuden ilman
     * oletuksia, ja sama laskenta kelpaa kumpaankin suuntaan.
     */
    const laudanKuvaus = () => {
      const r = this.svg.getBoundingClientRect();
      const vb = this.svg.viewBox?.baseVal;
      if (!r.width || !vb?.width) return null;
      return { r, vb, pxPerYks: r.width / vb.width };
    };

    /** Asiakaskoordinaatti laudan koordinaatiksi. */
    const laudalle = (asiakas) => {
      const k = laudanKuvaus();
      if (!k) return { x: 0, y: 0 };
      return {
        x: k.vb.x + (asiakas.x - k.r.left) / k.pxPerYks,
        y: k.vb.y + (asiakas.y - k.r.top) / k.pxPerYks,
      };
    };

    const aloitaNipistys = (e) => {
      const { etaisyys, keski } = kaksiSormea(e);
      if (etaisyys < 24) return;
      // Kokonäkymästä nipistettäessä siirrytään ensin lähikuvatilaan,
      // muuten mittakaavaa ei ole mistä jatkaa.
      if (!this.mannerZoom && !this.aloitusZoom) {
        this.mannerZoom = true;
        document.body.classList.add('manner-zoom');
        this.zoomKohde = this.pelaajanKohta() ?? null;
        this.panX = null;
        this.panY = null;
        this.fitViewBox();
      }
      nipistys = {
        etaisyys,
        keski,
        kohde: laudalle(keski),
        panX: this.panX ?? 0,
        panY: this.panY ?? 0,
        kerroin: this.zoomiKerroin,
        suhde: 1,
      };
      alku = null;
      liikkui = false;
      this.kartanRaahaus = true;
      document.body.classList.add('kartta-raahaus');
      // Kartta lähtee kahden sormen alla liikkeelle: päiväkirja riviksi.
      this.asetaPaivakirjanKoko(true);
      this.svg.style.transition = '';
    };

    const paivitaNipistys = (e) => {
      if (!nipistys || e.touches.length < 2) return;
      const { etaisyys } = kaksiSormea(e);
      const { pienin, suurin } = this.zoomiRajat();
      // Rajat kertoimessa eikä suhteessa: sama katto riippumatta siitä,
      // mistä ele alkoi.
      const kerroin = Math.min(suurin, Math.max(pienin, nipistys.kerroin * (etaisyys / nipistys.etaisyys)));
      nipistys.suhde = kerroin / nipistys.kerroin;
      const laatikko = pane.getBoundingClientRect();
      const m = { x: nipistys.keski.x - laatikko.left, y: nipistys.keski.y - laatikko.top };
      const tx = m.x - (m.x - nipistys.panX) * nipistys.suhde;
      const ty = m.y - (m.y - nipistys.panY) * nipistys.suhde;
      this.svg.style.transform =
        `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${nipistys.suhde.toFixed(4)})`;
    };

    const paataNipistys = () => {
      if (!nipistys) return;
      const { pienin } = this.zoomiRajat();
      const kerroin = nipistys.kerroin * nipistys.suhde;
      const kohde = nipistys.kohde;
      const keski = nipistys.keski;
      nipistys = null;
      this.kartanRaahaus = false;
      document.body.classList.remove('kartta-raahaus');
      this.svg.style.transform = '';
      // Napautus eleen jälkeen ei saa valita kaupunkia.
      this.raahattiin = true;
      setTimeout(() => { this.raahattiin = false; }, 0);
      // Alarajalle nipistäminen palaa kokonäkymään: sama kuin
      // loitonnusnapin viimeinen painallus.
      if (kerroin <= pienin * 1.02) {
        this.nollaaAloitusZoom();
        this.fitViewBox();
        this.paivitaZoomiNapit();
        return;
      }
      /*
       * Uusi mittakaava — ja sen jälkeen ankkuri takaisin sormien alle.
       *
       * fitViewBox keskittää kartan zoomKohteeseen eli ruudun KESKELLE.
       * Eleen aikana ankkuri on kuitenkin sormien keskipisteessä, ja jos
       * se lopuksi siirretään ruudun keskelle, kartta heilahtaa juuri sen
       * verran kuin sormet olivat keskeltä sivussa. Omistaja: "kartta
       * heilahtaa rajusti kun sormet päästää irti."
       *
       * Siksi vieritys lasketaan tässä uudelleen suoraan ankkurista:
       * piste, joka oli sormien alla, on siellä yhä.
       */
      this.zoomiVapaa = kerroin;
      this.zoomKohde = kohde;
      this.panX = null;
      this.panY = null;
      this.fitViewBox();
      const k = laudanKuvaus();
      if (k) {
        // Elementin asettelusijainti = nykyinen kulma miinus nykyinen siirto.
        const asetteluX = k.r.left - (this.panX ?? 0);
        const asetteluY = k.r.top - (this.panY ?? 0);
        this.asetaPan(
          keski.x - asetteluX - (kohde.x - k.vb.x) * k.pxPerYks,
          keski.y - asetteluY - (kohde.y - k.vb.y) * k.pxPerYks,
        );
      }
      this.paivitaZoomiNapit();
      this.taydennaTaide({ heti: true });
    };

    this.nipistysKuuntelijat = [
      ['touchstart', (e) => {
        if (e.touches.length !== 2) return;
        e.preventDefault();
        aloitaNipistys(e);
      }],
      ['touchmove', (e) => {
        if (!nipistys) return;
        e.preventDefault();
        paivitaNipistys(e);
      }],
      ['touchend', (e) => { if (nipistys && e.touches.length < 2) paataNipistys(); }],
      ['touchcancel', () => { if (nipistys) paataNipistys(); }],
      // Safarin oma ele: estetään, ettei sivu zoomaa kartan alta.
      ['gesturestart', (e) => e.preventDefault()],
      ['gesturechange', (e) => e.preventDefault()],
      /*
       * HIIREN RULLA ZOOMAA (omistajan toive).
       *
       * Työpöydällä kartalla oli vain +/- -painikkeet, ja rulla vieritti
       * sivua kartan alta. Rulla on se, mihin käsi tarttuu kartalla
       * ensimmäisenä.
       *
       * Rulla kulkee samat portaat kuin painikkeet — ei vapaata
       * mittakaavaa. Portaat on valittu niin, ettei mikään paikka näy
       * kahdesti (rajaaSkaala), ja vapaa rulla ohittaisi sen rajan.
       *
       * Kohdistus kursoriin: zoomKohde asetetaan siihen kartan pisteeseen,
       * joka on osoittimen alla, jolloin kuva laajenee siitä eikä ruudun
       * keskeltä. Painikkeet pitävät keskipisteen, koska niillä ei ole
       * osoitinta.
       *
       * Nykäisyjä hillitään: tarkka rulla (trackpad) lähettää kymmeniä
       * tapahtumia yhdestä eleestä, ja jokainen niistä olisi kokonainen
       * porras.
       */
      ['wheel', (e) => {
        if (nipistys) return;
        if (this.avausNakymassa() || this.radioPaalla()) return;
        e.preventDefault();
        const nyt = performance.now();
        if (nyt - (this.rullanHetki ?? 0) < RULLAN_VALI_MS) return;
        const suunta = e.deltaY < 0 ? 1 : -1;
        const kohta = this.kartanKohta(e.clientX, e.clientY);
        this.rullanHetki = nyt;
        this.rullanKohta = kohta;
        this.zoomaaPainikkeella(suunta);
        this.rullanKohta = null;
      }],
    ];
    for (const [nimi, kasittele] of this.nipistysKuuntelijat) {
      pane.addEventListener(nimi, kasittele, { passive: false });
    }
    /** Onko nipistys kesken? Siirto ei saa sekaantua siihen. */
    const nipistetaan = () => nipistys !== null;

    pane.addEventListener('pointerdown', (e) => {
      if (nipistetaan()) return;
      if (!this.aloitusZoom && !this.mannerZoom) return;
      if (!this.panVara && !this.panVaraY && !this.panJakso) return;
      alku = {
        x: e.clientX, y: e.clientY, pan: this.panX ?? 0, panY: this.panY ?? 0, id: e.pointerId,
      };
      liikkui = false;
      // Kesken oleva zoomausliuku ei saa jarruttaa raahausta.
      clearTimeout(this.zoomAjastin);
      this.svg.style.transition = '';
      // HUOM: osoitinta EI kaapata tässä. Kaappaus ohjaisi myös
      // click-tapahtuman paneelille, jolloin pelkkä napautus ei enää
      // osuisi kaupunkiin. Kaappaus otetaan vasta kun liike ylittää
      // kynnyksen eli kyse on oikeasti raahauksesta.
    });

    pane.addEventListener('pointermove', (e) => {
      if (nipistetaan()) return;
      if (!alku || e.pointerId !== alku.id) return;
      const dx = e.clientX - alku.x;
      // Mantereella liikutaan molempiin suuntiin, aloituskartalla vain
      // vaakaan (panVaraY on siellä nolla).
      const dy = this.panVaraY ? e.clientY - alku.y : 0;
      // Pieni kynnys: pelkkä napautus ei saa laskea raahaukseksi eikä
      // sammuttaa sykähdyksiä turhaan.
      if (!liikkui && Math.hypot(dx, dy) < 6) return;
      if (!liikkui) {
        liikkui = true;
        this.kartanRaahaus = true;
        document.body.classList.add('kartta-raahaus');
        pane.setPointerCapture?.(e.pointerId);
        /*
         * Päiväkirja yhdelle riville heti kun kartta lähtee liikkeelle
         * — ja vain kerran eleen aikana (omistajan toive: kortti ei saa
         * napsahdella kesken vierityksen). Tämä haara on kynnyksen
         * takana ja suoritetaan eleessä täsmälleen kerran, ja
         * asetaPaivakirjanKoko palaa saman tien, jos lappu on jo pieni.
         */
        this.asetaPaivakirjanKoko(true);
      }
      this.asetaPan(alku.pan + dx, alku.panY + dy);
    });

    const paata = (e) => {
      if (!alku || (e && e.pointerId !== alku.id)) return;
      if (liikkui) pane.releasePointerCapture?.(alku.id);
      alku = null;
      // Sykähdykset palaavat heti kun sormi irtoaa.
      document.body.classList.remove('kartta-raahaus');
      // Raahauksen päättävä napautus ei saa valita kaupunkia: lippu
      // luetaan click-vaiheessa (alla) ja nollataan vasta sen jälkeen.
      this.raahattiin = liikkui;
      if (liikkui) setTimeout(() => { this.raahattiin = false; }, 0);
      /*
       * Bittikartta täydennetään VAIN tässä: heti kun sormi irtoaa.
       *
       * Omistajan linjaus: "lataus siis aina vain juuri kun sormi
       * irtoaa, ei muulloin." Ele saa kulkea täysin valmiin kuvan
       * päällä, ja työ tehdään vasta kun ruutu on paikallaan.
       */
      this.kartanRaahaus = false;
      if (liikkui) this.taydennaTaide({ heti: true });
    };
    pane.addEventListener('pointerup', paata);
    pane.addEventListener('pointercancel', paata);

    // Raahauksen jälkeinen click ei saa mennä kaupungille asti.
    // Sama kuuntelija hoitaa aloituskartan ensimmäisen napautuksen:
    // zoomaus lähtee mistä tahansa kohdasta karttaa eikä vaadi osumaa
    // kaupunkiin (omistajan toive). Kaappausvaiheessa, jotta kaupungin
    // oma napautus ei ehdi valita lähtöpaikkaa.
    pane.addEventListener('click', (e) => {
      if (this.raahattiin) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      if (this.aloitusZoom || !this.zoomTarpeen()) return;
      // Zoomaus lähtee vain itse kartalta. Kartan päällä kelluu muutakin
      // — lentokalvo "Astu mantereelle" -nappeineen, aloitusportti,
      // matkakirjan kortti — ja koska tämä kuuntelija on kaappaus-
      // vaiheessa, se söi niiden napautukset ennen kuin ne ehtivät
      // nappiin asti. Lentokalvo jäi silloin ruudulle eikä Euroopan
      // kartta auennut lainkaan.
      if (!e.target.closest('svg')) return;
      // Sama napautuszoomaus toimii myös silloin, kun maailmankartalle
      // palataan kesken matkan (omistajan havainto): kartta on yhtä pieni
      // kummallakin kerralla. Aloitusportin takana zoomausta ei tarjota.
      if (!this.aloitettu || this.aloitusportti) return;
      /*
       * Vain maailmankartalla. Mantereilla on oma lähikuvansa
       * (zoomaaMantereelle), eikä aloituskartan napautuszoomaus kuulu
       * niille lainkaan.
       *
       * Ilman tätä ehtoa napautus lisäsi bodyyn aloitus-zoom-luokan.
       * Euroopassa fitViewBox palaa sen jälkeen mannerzoomin haarasta
       * eikä ehdi nollata lippua, joten kartta zoomasi uudelleen ja
       * perään syttyi kiikari — joka kuuluu vain etusivulle (omistajan
       * havainto: laivamatkan valinta Ateenassa).
       *
       * Sama ehto lopettaa toisenkin haitan: kuuntelija on
       * kaappausvaiheessa ja pysäyttää tapahtuman, joten mantereella se
       * söi kartalla olevien kohderenkaiden napautukset.
       */
      if (this.game.pack.id !== 'maailma') return;
      e.stopPropagation();
      e.preventDefault();
      this.zoomaaAloituskartta(this.kartanKohta(e.clientX, e.clientY));
    }, true);
  }

  /**
   * Avausteksti keskelle sitä tyhjää pergamenttia, joka jää laudan alle.
   * Kaista lasketaan näkymästä eikä arvata prosentteina, koska kapealla
   * ruudulla laatikko on myös pystysuunnassa kirjekuoressa.
   */
  placeIntro(box, vy, vh, paneH) {
    const paneY = (boardY) => ((boardY - vy) / vh) * paneH;
    // Kaista alkaa laudan alareunasta ja päättyy rajauslaatikon pohjaan.
    // Rajataan paneelin sisään, jottei teksti valu ulos matalalla ruudulla.
    const ylin = Math.max(0, paneY(box.y + box.h / (1 + INTRO_SPACE)));
    // Kaista jatkuu paneelin pohjaan asti: pergamentti ulottuu sinne, joten
    // kapealla ruudulla teksti saa käyttöönsä kaiken tyhjän tilan.
    const alin = paneH;
    this.introEl.style.top = `${Math.round(ylin)}px`;
    this.introEl.style.height = `${Math.max(0, Math.round(alin - ylin))}px`;
    this.fitIntro();
  }

  /**
   * Kutistaa avaustekstiä, jos se ei mahdu kaistaan. Matalalla ruudulla
   * kaista jää kapeaksi, eikä teksti saa valua laudan tai kartan reunan yli.
   */
  fitIntro() {
    const kaista = this.introEl.clientHeight;
    if (!kaista) return;
    let koko = INTRO_FONT_MAX;
    this.introText.style.fontSize = `${koko}rem`;
    // Askelia riittävästi koko haarukkaan; INTRO_FONT_MIN on lattia.
    for (let i = 0; i < 8 && this.introText.scrollHeight > kaista; i++) {
      koko = Math.max(INTRO_FONT_MIN, koko - 0.09);
      this.introText.style.fontSize = `${koko}rem`;
    }
  }

  /**
   * Päiväkirjakortti asetetaan sille kartan nurkalle, jossa on eniten merta.
   * Näin kortti ei koskaan peitä mannerta ja lauta näkyy kokonaisena. Kortti
   * on kartan päällä, joten jokin nurkka menetetään joka tapauksessa — meri
   * on niistä halvin.
   *
   * Alanurkat hylätään, jos kortti ja toimintokortti eivät mahdu rinnakkain:
   * silloin ne peittäisivät toisensa.
   */
  placeFactCard(paneW, paneH) {
    const vb = this.svg.viewBox.baseVal;
    if (!vb || !vb.width) return;
    const { map } = this.game.pack;

    // Nurkan kokoinen otos: kolmannes leveydestä ja korkeudesta.
    const meriosuus = (kx, ky) => {
      let meri = 0;
      let kaikki = 0;
      for (let i = 0; i <= 6; i++) {
        for (let j = 0; j <= 6; j++) {
          const x = vb.x + vb.width * (kx + (i / 6) * FACT_CORNER);
          const y = vb.y + vb.height * (ky + (j / 6) * FACT_CORNER);
          kaikki++;
          if (!isOnLand([x, y], map)) meri++;
        }
      }
      return meri / kaikki;
    };

    const loppu = 1 - FACT_CORNER;
    /*
     * MATKAKIRJA ON AINA KARTAN YLÄREUNASSA.
     *
     * Omistaja 5.8.2026: *"Matkakirja saisi olla aina kartan
     * yläreunassa. Nyt nimittäin isommalla iPad-ruudulla se menee
     * alareunan nappien kanssa päällekkäin, mutta ylhäällä se ei olisi
     * tiellä. Enkä haittaa, vaikka laukku tai hampurilainen
     * väliaikaisesti avautuisi sen päälle."*
     *
     * Alanurkat olivat mukana valinnassa, ja niitä yritettiin karsia
     * kahdella painotuksella: alanurkat viimeisiksi kun kortit eivät
     * mahdu riville, ja yläreunalle 0,15:n etu tasatilanteessa. Kumpikin
     * oli kiertotie sen ympäri, että alanurkka on aina väärin — siellä
     * ovat toimintonapit. Painotus voi hävitä, kielto ei.
     *
     * Vasen vai oikea ratkeaa yhä merenpinta-alan mukaan, jottei kortti
     * peitä mannerta ja kaupunkien nimiä.
     */
    const nurkat = [
      { id: 'tl', kx: 0, ky: 0 },
      { id: 'tr', kx: loppu, ky: 0 },
    ];

    for (const n of nurkat) n.meri = meriosuus(n.kx, n.ky);
    nurkat.sort((a, b) => b.meri - a.meri);
    this.factCard.dataset.corner = nurkat[0].id;
    // Linssin selitekortti väistää päiväkirjaa: se saa oman nurkkansa
    // vasta kun päiväkirjan nurkka on tiedossa.
    this.sijoitaLinssiSelite();
  }

  /** Kartan koordinaatit kartta-alueen pikseleiksi. */
  mapToPane({ x, y }) {
    const point = this.svg.createSVGPoint();
    point.x = x;
    point.y = y;
    const screen = point.matrixTransform(this.svg.getScreenCTM());
    const rect = this.mapPane.getBoundingClientRect();
    return { x: screen.x - rect.left, y: screen.y - rect.top };
  }

  /**
   * Nopan lepopaikka: avomerta, jotta noppa ei jää kenenkään nappulan tai
   * kaupungin päälle. Paikka arpoutuu hieman joka heitolla, jotta noppa ei
   * osu aina täsmälleen samaan kohtaan. Päiväkirjakortti hakeutuu
   * merellisimpään kulmaan — usein samaan, jonne nopan paikka on valittu —
   * joten kortin kulmaa väistetään peilaamalla paikka vastakkaiselle
   * sivulle (tai pakan omaan varapaikkaan decor.dieSpotAlt).
   */
  dieRestingSpot() {
    const pane = this.mapPane;
    const w = pane.clientWidth || 600;
    const h = pane.clientHeight || 600;
    const decor = this.game.pack.decor;
    let spot = decor.dieSpot;
    const corner = this.factCard?.hidden ? null : this.factCard?.dataset.corner;
    if (corner) {
      const spotCorner = (spot.y < 0.5 ? 't' : 'b') + (spot.x < 0.5 ? 'l' : 'r');
      if (spotCorner === corner) spot = decor.dieSpotAlt ?? { x: 1 - spot.x, y: spot.y };
    }
    const jitter = this.dieJitter ?? { x: 0, y: 0 };
    return {
      x: w * (spot.x + jitter.x),
      y: h * (spot.y + jitter.y),
    };
  }

  /** Kohdat, joihin maastokuvioita ei saa piirtää: kaupungit, nimet ja reitit. */
  mapObstacles() {
    const { board } = this.game;
    const spots = [];
    for (const c of board.cities) {
      spots.push({ x: c.x, y: c.y });
      spots.push({ x: c.x + (c.lx ?? 0), y: c.y + (c.ly ?? -20) });
      spots.push({ x: c.x + 21, y: c.y + 17 }); // laatan paikka
    }
    for (const e of board.edges) {
      const a = board.cityById.get(e.a);
      const b = board.cityById.get(e.b);
      const steps = Math.max(e.steps * 2, 4);
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        spots.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
      }
    }
    return spots;
  }

  // --- kartta -------------------------------------------------------------

  drawBoard() {
    const { board, pack } = this.game;
    const { decor } = pack;
    this.contentBox = this.boardBounds();
    this.svg.textContent = '';

    drawDefs(this.svg);
    // Kaikki piirretään juuriryhmään: esikatselu siirtää ryhmää, ei SVG:tä,
    // jolloin elementin taakse ei paljastu tyhjää taustaa raahatessa.
    const root = el('g', { class: 'board-root' }, this.svg);
    const svg = { appendChild: (node) => root.appendChild(node) };
    this.boardRoot = root;

    /*
     * Kiertävä kartta: yksi kopio koko sisällöstä laudan leveyden verran
     * oikealle.
     *
     * <use> viittaa elävään ryhmään, joten kopio seuraa kaikkea mitä
     * alkuperäisessä tapahtuu — myös bittikarttaruutuja, laattoja ja
     * nappulaa — ilman että mitään piirretään toiseen kertaan. Kopiosta
     * ei voi napauttaa mitään, koska tapahtuma osuisi <use>-elementtiin
     * eikä sen sisältöön; siksi napautettavat kohderenkaat monistetaan
     * erikseen oikeina elementteinä (piirraKohteet).
     *
     * Vain oikealle: vieritys pidetään välillä [-leveys, 0), jolloin
     * näkyvä alue on aina [0, leveys + ruudullinen]. Vasemmalle
     * puolelle ei siis koskaan katsota.
     */
    if (this.kiertava()) {
      root.setAttribute('id', 'lauta-sisalto');
      const kopio = el('use', {
        class: 'lauta-kierto',
        transform: `translate(${pack.map.width}, 0)`,
        'pointer-events': 'none',
      }, this.svg);
      kopio.setAttribute('href', '#lauta-sisalto');
      this.laudanKierto = kopio;
    } else {
      this.laudanKierto = null;
    }

    /*
     * Kartan raskas, muuttumaton osa omaan ryhmäänsä.
     *
     * Pergamentti, mantereet, aallot, maasto ja koristeet eivät muutu
     * pelin aikana, ja niitä on ylivoimaisesti eniten: yhdistetyllä
     * laudalla noin 6500 elementtiä 7200:sta. Ne muutetaan piirron
     * jälkeen yhdeksi kuvaksi, jotta panorointi ei joudu piirtämään
     * niitä uudelleen joka kehyksellä.
     */
    const staattinen = el('g', { class: 'staattinen' }, root);
    const taide = { appendChild: (node) => staattinen.appendChild(node) };

    drawParchment(taide, this.game.pack.map);
    // Pallonpuoliskokartalla kehykset ja asteverkko piirtyvät maiden alle.
    drawHemisphereFrames(taide, pack.map);
    drawLand(taide, pack.map);
    // Korkeusvyöhykkeet, joet ja järvet maan päälle mutta reittien ja
    // kaupunkien alle: maiseman piirre, ei pelielementti. Nimi on
    // drawMaasto eikä drawTerrain, koska jälkimmäinen on varattu
    // maastosymboleille (puut, vuoret, dyynit) — eri asia.
    //
    // Varjostus tulee tässä erikseen samasta syystä kuin MERISYVYYS:
    // se on laudalle projisoitua aineistoa, jota on vain
    // maailmankartalla, eikä se mahdu koneen kirjoittamaan
    // maailmankartta.js:ään ilman että koostajan seuraava ajo pyyhkii sen.
    drawMaasto(taide, pack.map, pack.id === 'maailmankartta' ? MAASTON_VARJOSTUS : null);

    /*
     * Linssikerros: staattisen karttakuvan päällä, kaupunkien alla.
     *
     * JUURIRYHMÄN SISÄÄN, koska kiertävä kartta saa sisällön ilmaiseksi:
     * <use href="#lauta-sisalto"> on elävä viittaus ja seuraa kaikkea
     * mitä juuriryhmään lisätään. Suoraan this.svg:hen lisätty kerros ei
     * näkyisi sauman toisella puolella lainkaan.
     *
     * TÄHÄN KOHTAAN, koska lapsijärjestys on g.staattinen →
     * clipPath#maa-rajaus → g.country-borders → g.country-names →
     * g.cities → rect.grain → nappulat. Linssi on siis koko
     * bittikarttakartan päällä mutta kaupunkien, nimien, laattojen,
     * kohderenkaiden ja nappuloiden alla: linssi selittää maailmaa, se
     * ei peitä pelitilaa.
     *
     * pointer-events: none, ettei kerros syö kartan omaa
     * napautuszoomausta eikä kohderenkaiden napautuksia.
     *
     * Kerros on tyhjä, kunnes joku sytyttää linssin. Sisällön piirtää
     * js/linssit/kerros.js, jota EI tuoda tähän tiedostoon staattisesti
     * (ks. sen tiedoston alkukommentti: yhden tiedoston version kokoaja
     * vaatisi linssit MODULES-listalleen).
     */
    if (pack.map.kiertava) {
      /*
       * Rajaus sauman yli.
       *
       * Mitattu vika (js/mapart.js paperi() 24–41): jos sisältö vuotaa
       * laudan reunan yli, <use>-kopio ja alkuperäinen menevät
       * päällekkäin ja kaistale tummuu — ruudulla se näkyi pystysuorana
       * sävyrajana keskellä merta. Läpikuultava linssi tekee tasan saman:
       * peittävyys tuplaantuu siinä vyöhykkeessä. Ja sisältö todella
       * vuotaa: map.outlines ulottuu x = 12178,6 asti.
       *
       * Rajaus on juuriryhmän sisällä, joten kopio saa saman rajatun
       * sisällön siirrettynä ja kattaa tarkalleen [12000, 24000).
       */
      const rajaus = el('clipPath', { id: 'linssi-rajaus' }, root);
      /*
       * Rajaus vain VAAKASUUNNASSA.
       *
       * Kierron kaksinkertaistuminen on vaakasuuntainen ilmiö: kopio on
       * laudan leveyden päässä sivussa. Pystysuunnassa rajaus ei estä
       * mitään — se vain leikkasi pois sen, mitä linssi piirtää laudan
       * ylä- ja alapuolelle varattuun kaistaan. Topografialinssi täyttää
       * kaistan merellä, ja rajaus söi täytön: kartan yläreunaan jäi
       * pergamenttikaistale keskelle Jäämerta (omistajan havainto).
       */
      el('rect', {
        x: 0,
        y: -pack.map.height,
        width: pack.map.width,
        height: pack.map.height * 3,
      }, rajaus);
    }
    this.linssiKerros = el('g', {
      class: 'linssi',
      'pointer-events': 'none',
      ...(pack.map.kiertava ? { 'clip-path': 'url(#linssi-rajaus)' } : {}),
    }, root);

    // Nykyisen maan korostus (hento sävy + nimi kaunolla) piirretään tähän
    // kerrokseen pelin edetessä (drawCountryBorders). Sävy rajataan
    // tyylitellyn rantaviivan sisään, ettei se valu mereen — maiden
    // todelliset rannikot poikkeavat piirretystä.
    if (pack.map.countryShapes) {
      const clip = el('clipPath', { id: 'maa-rajaus' }, root);
      for (const outline of pack.map.outlines) {
        const d = `M${outline.map(([x, y]) => `${x},${y}`).join(' L')}Z`;
        el('path', { d }, clip);
      }
    }
    this.countryLayer = el('g', { class: 'country-borders', 'clip-path': 'url(#maa-rajaus)' }, root);
    /*
     * MERENPOHJAN RAJAUS ON POISTETTU YHDESSÄ SYVYYSVYÖHYKKEIDEN KANSSA.
     *
     * Rajaus oli laudan kokoinen `evenodd`-polku, johon koottiin koko
     * rantaviiva (317 000 merkkiä), ja se arvioitiin uudelleen joka kerta
     * kun lähivesi piirrettiin — eli joka panorointiaskeleella. Se oli
     * olemassa vain siksi, että syvyysvyöhykkeet eivät valuisi maalle;
     * kun vyöhykkeitä ei piirretä (ks. this.merisyvyys), sillä ei ole
     * mitään rajattavaa.
     *
     * `maa-rajaus` yllä jää: se on eri raja eri tarkoitukseen (maan
     * korostussävy pysyy rannan sisällä) ja se koskee vain yhtä maata
     * kerrallaan.
     */
    this.meriRajaus = null;
    /*
     * Nimi piirretään leikkaamattomaan kerrokseen: maan todellinen
     * keskipiste voi osua tyylitellyn rannikon ulkopuolelle, eikä
     * kaunokirjoituksen saa katketa siihen.
     *
     * Kerros luodaan tässä mutta NOSTETAAN kaupunkien päälle heti kun
     * kaupunkikerros on olemassa (ks. root.appendChild alempana).
     * Omistajan bugilöydös 9.8.2026: Ateenassa Kreikan kyltistä näkyi
     * vain kirjainten häntä kaupunginnimen takaa, eikä i-nappia
     * erottanut lainkaan. Kyltti on nappi, jota pelaajan on määrä
     * painaa — se ei voi jäädä koristeen alle. Koneellinen mittaus
     * kertoi, ettei kyse ollut yhdestä maasta: Euroopan 29 maasta
     * 15:llä kaupungin nimi peitti kylttiä, ja kuudella peitto osui
     * i-nappiin asti. Pelkkä ankkurin siirto olisi korjannut yhden
     * ruudun ja jättänyt loput.
     */
    this.countryNameLayer = el('g', { class: 'country-names' }, root);
    /*
     * Maastonimet: joet, järvet ja vuoristot kaunokirjoituksella.
     *
     * JUURIRYHMÄN ULKOPUOLELLE, toisin kuin muut kerrokset: ks.
     * maastonimiKerros alempana. Nimi on merkintä kartalla eikä osa
     * maastoa, joten kierron kopio ei saa kirjoittaa sitä toiseen
     * kertaan.
     *
     * ELÄVÄÄN PUUHUN eikä staattiseen taiteeseen, koska nimet muuttuvat
     * zoomin mukana: mikä nimi näkyy ja minkä kokoisena riippuu siitä
     * mitä ruudulla juuri nyt on (ks. drawMaastonimet). Bittikartassa ne
     * jäätyisivät ensimmäisen piirron mittakaavaan.
     *
     * Nimiaineisto on toistaiseksi vain maailmankartalla: se on
     * projisoitu juuri tälle laudalle (tools/tee-maastonimet.mjs).
     * Muilla laudoilla kerros jää tyhjäksi eikä maksa mitään.
     */
    this.maastonimet = pack.id === 'maailmankartta' ? MAAILMANKARTAN_NIMET : null;
    /*
     * Lähikuvan vesi maastonimien ALLE.
     *
     * Nimi on luettava veden päältä. Jos kerrokset olisivat toisin
     * päin, uoman vaalea valojuova kulkisi juuri joen nimen yli — ja
     * juuri siinä kohtaa, missä nimi on, koska nimi piirretään uoman
     * mukaan.
     */
    /*
     * MERISYVYYS POIS KÄYTÖSTÄ.
     *
     * Vyöhykkeet olivat neljän raportin lähde: sinistä maalla, maan sävy
     * eri zoomeilla, ja lopulta tökkivä vieritys. Mitattu matkan varrella:
     * rajaus poistaa vuodosta vain noin 40 %, koska syvyysaineisto on
     * karkeampaa kuin rannikko eikä kahden eri tarkkuuden rajaa saa
     * osumaan yhteen pikselilleen; peittävyys jouduttiin pudottamaan
     * kolmasosaan (0,07), jolloin kerros ei enää juuri näy — mutta se
     * maksaa yhä 82 polkua ja 317 000 merkin rajauspolun uudelleen joka
     * panorointiaskeleella.
     *
     * Hinta on siis täysi ja hyöty lähes olematon. Aineisto ja piirtäjä
     * jäävät paikalleen: tämän rivin palauttaminen tuo vyöhykkeet
     * takaisin, jos ne joskus halutaan omalla saumallaan projisoituina.
     */
    this.merisyvyys = null;
    // Lähivesikerrosta ei luoda: vesi on omassa linssissään.
    this.lahivesiKerros = null;
    this.lahivesiTunniste = null;
    /*
     * MAASTONIMET JUURIRYHMÄN ULKOPUOLELLE — YKSI NIMI, EI KAHTA.
     *
     * Kaikki muu piirretään `root`iin, jonka kiertävä kartta monistaa
     * <use>-kopiona laudan leveyden verran oikealle. Vedelle ja maalle se
     * on juuri oikein: molemmat puolet ovat samaa maastoa. NIMELLE SE EI
     * OLE. Nimi on merkintä kartalla, ei osa maastoa, ja kopio kirjoitti
     * sen toistamiseen — omistaja: "Joen nimi vain kerran. Nyt lukee
     * monta kertaa."
     *
     * Kerros on nyt `this.svg`:n suora lapsi eli <use>-kopion sisar. Se
     * liikkuu ja skaalautuu yhä kartan mukana, koska panorointi tehdään
     * viewBoxilla eikä ryhmän muunnoksella. Sauman yli menevän nimen
     * paikan hoitaa jo `saumasiirto` (js/mapart.js), joten kopiota ei
     * tarvita mihinkään.
     */
    this.maastonimiKerros = el('g', { class: 'maastonimet' }, this.svg);
    // Uusi lauta, tyhjä kerros: muistettu näkymätunniste ei saa jäädä
    // voimaan, tai nimet jäisivät piirtymättä kun sama näkymä palaa.
    this.maastonimiTunniste = null;
    this.countryKey = null;
    drawWaves(taide, pack.map, [
      { x: decor.compass.x, y: decor.compass.y, r: decor.compass.r + 45 },
      ...decor.waveSkip,
    ]);
    drawTerrain(taide, pack.map, this.mapObstacles(), decor.terrainBands);
    drawCompass(taide, decor.compass.x, decor.compass.y, decor.compass.r);
    drawDoodles(taide, decor);

    // Lentoreitit kaarina.
    const air = el('g', { class: 'air-routes' }, staattinen);
    for (const route of this.game.airRoutes) {
      const a = board.cityById.get(route.a);
      const b = board.cityById.get(route.b);
      const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.12;
      const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.12;
      el('path', { d: `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`, class: 'air-route' }, air);
    }

    // Reitit ja askelpisteet. Merireitit kaartavat rannikon ympäri.
    /*
     * Reitit ilman suodatinta ja osana kartan kuvaa.
     *
     * SUODATIN POIS. Tämä oli v159:n vian viimeinen jäänne. Silloin
     * poistettiin #rough mantereilta, aalloilta ja maastolta, koska
     * iOS:n webapp-tila palautti suodatetun kerroksen TYHJÄNÄ eikä
     * saanut sen piirtopuskuria enää varattua. Reittikerros sai pitää
     * suodattimensa, koska se oli pieni. Yhdistetyllä laudalla se ei
     * ole pieni: kerros ulottuu Lissabonista Tokioon, ja omistajan
     * kuvakaappaus iPadilta näyttää saman oireen — kaupungit, nimet ja
     * lentoreitit näkyvät, tiet eivät.
     *
     * Heilunta piirretään nyt pisteisiin kuten rannikoillakin, jolloin
     * puskuria ei tarvita lainkaan.
     *
     * KARTAN KUVAAN. Reitit eivät muutu pelin aikana — mikään ei
     * muokkaa niitä piirron jälkeen — joten ne kuuluvat samaan kuvaan
     * kuin muu muuttumaton taide. Se poistaa ne myös panoroinnin
     * tieltä: niitä on askelpisteineen noin tuhat elementtiä.
     */
    const routes = el('g', { class: 'routes' }, staattinen);
    for (const e of board.edges) {
      const d = kasinPiirretty(e.poly, 2)
        .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
      el('path', {
        d,
        class: `route route-${e.type}`,
        opacity: (0.82 + hash01(`route:${e.id}`) * 0.36).toFixed(2),
      }, routes);

      for (let i = 1; i < e.steps; i++) {
        const key = `${e.id}:${i}`;
        // Askelmat eivät ole tasavälein eivätkä täysin samankokoisia.
        const t = (i + vary(`${key}:t`, 0.09)) / e.steps;
        const { x, y } = pointAlong(e.poly, Math.min(Math.max(t, 0.04), 0.96));
        const r = 5.3 + hash01(`${key}:r`) * 1.5;
        el('ellipse', {
          cx: x + vary(`${key}:x`, 1.6),
          cy: y + vary(`${key}:y`, 1.6),
          rx: r,
          ry: r * (0.86 + hash01(`${key}:ry`) * 0.24),
          transform: `rotate(${vary(`${key}:rot`, 40).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})`,
          opacity: (0.72 + hash01(`${key}:o`) * 0.5).toFixed(2),
          class: `step step-${e.type}`,
        }, routes);
      }
    }

    // Vakiohinta kerrotaan kerran kartan selitteessä; reitille merkitään
    // hinta vain, jos se poikkeaa vakiosta. Näin meri pysyy siistinä.
    const fares = el('g', { class: 'fares' }, staattinen);
    for (const e of board.edges) {
      if (e.type !== 'sea' || e.fee === SEA_FARE) continue;
      const mid = pointAlong(e.poly, 0.5);
      el('text', {
        x: mid.x,
        y: mid.y - 12,
        class: 'fare',
        'text-anchor': 'middle',
        transform: `rotate(${vary(`fare:${e.id}`, 2.6).toFixed(2)} ${mid.x.toFixed(1)} ${mid.y.toFixed(1)})`,
        opacity: (0.85 + hash01(`fare:o:${e.id}`) * 0.3).toFixed(2),
      }, fares).textContent = `⚓${e.fee}`;
    }

    /*
     * Nyt kaikki muuttumaton on piirretty: pergamentti, mantereet,
     * aallot, maasto, koristeet, lento- ja matkareitit askelpisteineen.
     * Ne muuttuvat yhdeksi kuvaksi, ja elävään puuhun jäävät vain
     * kaupungit, nimet, laatat, kohderenkaat ja nappulat.
     */
    this.rasteroiTaide(staattinen);

    // Selite kartan otsikon alle: alueen pinta-ala ja väkiluku isoin
    // pyöristyksin — pelkät numerot ja viivasymbolit (omistajan toive;
    // matkustushinnat poistuivat selitteestä). Rivit keskitetään
    // mittaamalla, koska symboli istuu tekstin vasemmalla puolella.
    const tunnus = LAUTA_TUNNUSLUVUT[pack.id];
    if (tunnus) {
      // Yksi rivi (omistajan toive): symbolit ja luvut ladotaan peräkkäin
      // mitaten, ja koko rivi keskitetään lopuksi otsikon alle.
      const osat = [
        { teksti: tunnus.ala, ikoni: '<rect x="1" y="1" width="12.6" height="12.6" rx="1.8"/><path d="M1 9.4l3.4-3 2.6 2.2 3.2-3.6 3.4 2.6"/>' },
        { teksti: tunnus.vaki, ikoni: '<circle cx="7.3" cy="4.1" r="2.7"/><path d="M2 13.4c.7-3.4 2.7-5.1 5.3-5.1s4.6 1.7 5.3 5.1"/>' },
      ];
      const g = el('g', { class: 'map-tunnus' }, root);
      const y = decor.mapLabelPos.y + 44;
      let x = 0;
      for (const osa of osat) {
        const kuvake = el('g', {
          class: 'map-tunnus-ikoni',
          transform: `translate(${x.toFixed(1)}, ${y - 12.5})`,
        }, g);
        kuvake.innerHTML = osa.ikoni;
        const teksti = el('text', {
          x: x + 19, y, class: 'map-legend', 'text-anchor': 'start',
        }, g);
        teksti.textContent = osa.teksti;
        x += 19 + teksti.getComputedTextLength() + 24;
      }
      const bb = g.getBBox();
      g.setAttribute('transform',
        `translate(${(decor.mapLabelPos.x - bb.width / 2 - bb.x).toFixed(1)}, 0)`);
    }

    // Kaupungit ja nimet.
    const cities = el('g', { class: 'cities' }, root);
    // Kaupunkilaudalla solmut ovat pienempiä: mittakaava on kortteleissa.
    const nodeScale = pack.style === 'city' ? 0.82 : 1;
    for (const c of board.cities) {
      const wobble = `rotate(${vary(`city:rot:${c.id}`, 12).toFixed(1)} ${c.x} ${c.y})`;
      const base = (c.start ? 20 : 11.6) * nodeScale;
      const rx = base + vary(`city:rx:${c.id}`, 0.7);
      const ry = base + vary(`city:ry:${c.id}`, 0.7);
      if (c.start) {
        el('ellipse', {
          cx: c.x, cy: c.y, rx, ry, transform: wobble, class: 'city-start',
        }, cities);
        el('ellipse', {
          cx: c.x, cy: c.y, rx: rx * 0.6, ry: ry * 0.6, transform: wobble, class: 'coast-soft',
        }, cities);
      } else {
        el('ellipse', {
          cx: c.x,
          cy: c.y,
          rx,
          ry,
          transform: wobble,
          'stroke-width': (2.2 + hash01(`city:sw:${c.id}`) * 0.7).toFixed(2),
          class: 'city',
        }, cities);
      }
      // Porttikaupungista lähtee pitkä lento toiselle laudalle: kaksoiskehä
      // erottaa sen tavallisesta lentokentästä jo kartalta katsottaessa.
      if (this.game.isGateway(c)) {
        const gr = base + 9;
        el('ellipse', {
          cx: c.x,
          cy: c.y,
          rx: gr + vary(`gate:rx:${c.id}`, 1.1),
          ry: gr + vary(`gate:ry:${c.id}`, 1.1),
          transform: wobble,
          class: 'city-gate',
        }, cities);
      }
      if (c.airport) {
        el('text', {
          x: c.x, y: c.y + 5, class: 'airport', 'text-anchor': 'middle',
        }, cities).textContent = '✈';
      }
      const anchor = c.la ?? 'middle';
      const dx = c.lx ?? 0;
      const dy = c.ly ?? -(c.start ? 28 : 19);
      const lx = c.x + dx;
      const ly = c.y + dy + vary(`label:y:${c.id}`, 1.2);
      const label = el('text', {
        x: lx,
        y: ly,
        class: c.start ? 'city-label start-label' : 'city-label',
        'text-anchor': anchor,
        transform: `rotate(${vary(`label:rot:${c.id}`, 1.1).toFixed(2)} ${lx.toFixed(1)} ${ly.toFixed(1)})`,
        opacity: (0.92 + hash01(`label:o:${c.id}`) * 0.08).toFixed(2),
      }, cities);
      label.textContent = c.name;
    }

    // Paperin rakeisuus ja tummuvat reunat piirretään kartan päälle mutta
    // liikkuvien kerrosten ALLE. Aiemmin tämä oli päällimmäisenä, ja koska
    // rakeisuus sekoittuu multiply-tilassa, selain joutui lukemaan taustan
    // takaisin ja sekoittamaan uudelleen joka kerta kun nappula, laatta tai
    // lentokone liikkui sen alla. Kartta näyttää samalta, mutta liikkuvat
    // osat eivät enää maksa koko ruudun sekoitusta.
    drawPaperOverlay(svg, this.game.pack.map);

    /*
     * Maakyltti kaupunkien PÄÄLLE (ks. countryNameLayer yllä). Kyltti
     * näkyy vain siinä maassa, jossa pelaaja juuri on, ja katoaa heti
     * kun hän siirtyy rajan yli — se ei siis peitä karttaa pysyvästi,
     * ja sen alle jäävä kaupunki on se, jonka nimen pelaaja näkee
     * muutenkin saapumiskortissa.
     *
     * Nappulat ja laatat jäävät tarkoituksella kyltin päälle: ne
     * kertovat, missä pelaaja on ja mitä on jo löydetty, eikä kyltti
     * saa piilottaa niitä. Kyltin ankkureita siirrettiin samassa
     * erässä niin, että päällekkäisyys nappulan kanssa on harvinaista.
     */
    root.appendChild(this.countryNameLayer);

    this.tokenLayer = el('g', { class: 'tokens' }, root);
    this.targetLayer = el('g', { class: 'targets' }, root);
    this.pawnLayer = el('g', { class: 'pawns' }, root);
    // Lentoanimaatio piirtyy kaiken päälle: kone ja sen perässä kulkeva viiva.
    this.flightLayer = el('g', { class: 'flight' }, root);
  }

  /**
   * Korostaa maan, jossa pelaaja on: alue sävytetään aavistuksen
   * tummemmaksi ja maan nimi kirjoitetaan hennosti kaunokirjoituksella
   * keskelle. Reitillä (kaupunkien välissä) edellinen korostus jää
   * näkyviin, kunnes seuraava kaupunki vaihtaa maata — kartta ei vilku.
   */
  drawCountryBorders() {
    if (!this.countryLayer) return;
    const map = this.game.pack.map;
    const city = this.game.cityOf();
    const iso = city ? map.cityCountry?.[city.id] : null;
    if (!iso) return;
    const key = `${this.game.pack.id}:${iso}`;
    if (this.countryKey === key) return;
    this.countryKey = key;
    this.countryLayer.textContent = '';
    this.countryNameLayer.textContent = '';
    const maa = map.countryShapes?.[iso];
    if (!maa) return;
    const d = maa.renkaat
      .map((r) => `M${r.map(([x, y]) => `${x},${y}`).join(' L')}Z`)
      .join(' ');
    el('path', { d, class: 'country-tint' }, this.countryLayer);
    this.piirraMaaKilpi(maa, iso);
  }

  /**
   * Maan nimikilpi: nimi ja i-merkki YHTENÄ nappina valitun maan
   * keskellä.
   *
   * Omistajan tarkennus 8.8.2026 illalla: *"maan nimi näkyy välillä
   * huonosti ja tuo i hyppää oudosti. Valittuna maan nimi voisi näkyä
   * omana boksinaan jossa samassa i-merkki, eli yksi yhteinen nappi
   * jossa nimi ja i symboli, mutta aina vain sen maan kohdalla joka
   * on valittuna."*
   *
   * Aiempi muoto oli haalea kaunokirjoitusnimi + erillinen i-ympyrä,
   * jonka paikka mitattiin nimen leveydestä — siksi se "hyppäsi", kun
   * mittaus ehti valmistua eri aikaan kuin piirto. Kilpi on yksi
   * ryhmä, jonka kaikki mitat lasketaan samalla kertaa skaalasta.
   */
  piirraMaaKilpi(maa, iso) {
    const nappi = el('g', {
      class: 'maa-kilpi',
      role: 'button',
      tabindex: '0',
      'aria-label': `${maa.nimi}: avaa maan lehti`,
    }, this.countryNameLayer);
    const tausta = el('rect', { class: 'maa-kilpi-tausta' }, nappi);
    const nimi = el('text', {
      class: 'maa-kilpi-nimi', 'text-anchor': 'middle', 'dominant-baseline': 'central',
    }, nappi);
    nimi.textContent = maa.nimi;
    const keha = el('circle', { class: 'maa-i-kehä' }, nappi);
    const kirjain = el('text', {
      class: 'maa-i-kirjain', 'text-anchor': 'middle', 'dominant-baseline': 'central',
    }, nappi);
    kirjain.textContent = 'i';
    // Läpinäkyvä osumapinta koko kilven yli — sormelle vähintään 44 px.
    const osuma = el('rect', { class: 'maa-i-osuma' }, nappi);
    this.maaKilpi = { tausta, nimi, keha, kirjain, osuma, maa };
    this.paivitaMaaIOsuma();
    const avaa = (e) => {
      // Napautus ei saa vuotaa kartalle: kartta zoomaisi tai
      // päiväkirja kutistuisi saman eleen päälle.
      e.stopPropagation();
      e.preventDefault();
      this.avaaMaalehti(iso);
    };
    nappi.addEventListener('click', avaa);
    nappi.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') avaa(e); });
  }

  /**
   * Kilven mitat nykyiseen kartan skaalaan.
   *
   * Mitat ovat SVG-yksiköissä, joten NÄYTTÖkoko riippuu siitä, kuinka
   * pieneksi kartta on kutistettu. Siksi kaikki lasketaan
   * tavoitepikseleistä taaksepäin (teksti ~13 px, osumapinta ≥44 px)
   * ja päivitetään joka zoomilla. Skaala luetaan suoraan DOMista
   * (leveys / viewBoxin leveys) eikä this.zoomSkaalasta: se ei ole
   * asetettu kaikilla laudoilla, ja väärä oletus 1 kutisti aiemman
   * i-napin yhdentoista pikselin ympyräksi.
   */
  paivitaMaaIOsuma() {
    const k = this.maaKilpi;
    if (!k) return;
    const laatikko = this.svg?.getBoundingClientRect?.();
    const vb = this.svg?.getAttribute?.('viewBox')?.split(/\s+/);
    const skaala = laatikko?.width && vb?.[2] ? laatikko.width / Number(vb[2]) : (this.zoomSkaala || 1);
    if (!Number.isFinite(skaala) || skaala <= 0) return;
    /*
     * Kirjasinkoko on SAMA kuin kaupunkien nimillä (omistajan sääntö
     * 9.8.2026: "napin teksti ei saisi ylittää kaupungin nimen kokoa
     * vaan pitäisi olla aina saman kokoinen sen kanssa"). Kaupungin
     * nimi on 18 laudan yksikköä (mapart.js KAUPUNGIN_NIMI_YKSIKKOA),
     * joten kilpi skaalautuu zoomissa täsmälleen nimien mukana —
     * aiemmat näyttöpikselilaskelmat poistuivat. Vain osumapinta
     * lasketaan yhä skaalasta, jotta sormi osuu kaukaakin.
     */
    const kirjasin = 18;
    k.nimi.setAttribute('font-size', kirjasin.toFixed(1));
    // Nimen leveys mitataan, ei arvata — mutta vasta kirjasinkoon
    // asettamisen jälkeen, jotta mitta vastaa lopullista piirtoa.
    let leveys = 0;
    try { leveys = k.nimi.getComputedTextLength?.() ?? 0; } catch { leveys = 0; }
    if (!leveys) leveys = k.maa.nimi.length * kirjasin * 0.62;
    const r = kirjasin * 0.55;
    const valiX = kirjasin * 0.55;
    const pehmusteX = kirjasin * 0.75;
    const korkeus = kirjasin * 1.9;
    const leveysKaikki = pehmusteX + leveys + valiX + 2 * r + pehmusteX;
    const [cx, cy] = k.maa.keskus;
    const x0 = cx - leveysKaikki / 2;
    const y0 = cy - korkeus / 2;
    k.tausta.setAttribute('x', x0.toFixed(1));
    k.tausta.setAttribute('y', y0.toFixed(1));
    k.tausta.setAttribute('width', leveysKaikki.toFixed(1));
    k.tausta.setAttribute('height', korkeus.toFixed(1));
    k.tausta.setAttribute('rx', (korkeus / 2).toFixed(1));
    k.tausta.setAttribute('stroke-width', '1.4');
    k.nimi.setAttribute('x', (x0 + pehmusteX + leveys / 2).toFixed(1));
    k.nimi.setAttribute('y', cy.toFixed(1));
    const iX = x0 + pehmusteX + leveys + valiX + r;
    k.keha.setAttribute('cx', iX.toFixed(1));
    k.keha.setAttribute('cy', cy.toFixed(1));
    k.keha.setAttribute('r', r.toFixed(1));
    k.keha.setAttribute('stroke-width', '1.4');
    k.kirjain.setAttribute('x', iX.toFixed(1));
    k.kirjain.setAttribute('y', cy.toFixed(1));
    k.kirjain.setAttribute('font-size', (r * 1.3).toFixed(1));
    // Osumapinta: koko kilpi, mutta vähintään 44 px joka suuntaan.
    const osumaK = Math.max(korkeus, 44 / skaala);
    const osumaL = Math.max(leveysKaikki, 44 / skaala);
    k.osuma.setAttribute('x', (cx - osumaL / 2).toFixed(1));
    k.osuma.setAttribute('y', (cy - osumaK / 2).toFixed(1));
    k.osuma.setAttribute('width', osumaL.toFixed(1));
    k.osuma.setAttribute('height', osumaK.toFixed(1));
  }

  /** Kartalla näkyvät vain käännetyt laatat omina kuvakkeinaan. */
  drawTokens() {
    const { game } = this;
    this.tokenLayer.textContent = '';
    for (const [cityId, type] of game.revealed) {
      const city = game.board.cityById.get(cityId);
      const g = el('g', {
        class: 'token-found',
        transform: `translate(${city.x + 22},${city.y + 18}) rotate(${vary(`token:${cityId}`, 8).toFixed(1)})`,
      }, this.tokenLayer);
      el('circle', {
        r: 16.4 + hash01(`token:r:${cityId}`) * 1.4,
        class: 'token-disc',
      }, g);
      const icon = drawTokenIcon(g, type);
      icon.setAttribute('transform', 'scale(0.88)');
    }
  }

  drawTargets() {
    const { game } = this;
    this.targetLayer.textContent = '';

    /*
     * Maailmanradio: kaupungit ovat itse play-nappeja eikä kartalla
     * ole muita kohteita. Ei nopanheiton kohteita, ei lentokohteita,
     * ei lähtöpisteen valintaa — se on koko tilan idea (omistaja
     * 4.8.2026: "kaikki muu toiminto häviää").
     *
     * ENNEN kehittäjätilaa: radiotilassa napautus kuuluu radiolle
     * silloinkin kun kehittäjätila on päällä, muuten radiota ei voisi
     * kokeilla juuri siinä tilassa, jota varten se avattiin.
     */
    if (this.radioPaalla()) {
      this.radioModuuli.piirraKaupunkinapit(this.targetLayer, game.board.cities,
        { kiertoKohdat: (x) => this.kiertoKohdat(x) });
      return;
    }

    /*
     * Kehittäjätila (omistajan toive): jokainen kaupunki on napautettava
     * ja napautus vie sinne suoraan. Tämä ohittaa kaikki muut kohteet,
     * myös lähtöpisteen valinnan — muuten tilaa ei pääsisi käyttämään
     * pelin alussa lainkaan.
     *
     * Lähtöpaikkaa ei ole vielä valittu ennen ensimmäistä napautusta,
     * joten pickstart-vaiheessa käytetään pelin omaa aloitusta ja
     * hypätään vasta sen jälkeen.
     *
     * Kohdealueet ovat näkymättömiä (omistajan toive): 41 rengasta
     * kerralla peitti kartan eikä kartan katselusta tullut mitään.
     * Napautus toimii silti, ja yläreunan merkki kertoo tilan olevan
     * päällä.
     */
    if (this.kehittajaTila && !game.player?.isBot && game.phase !== 'over') {
      for (const c of game.board.cities) {
        const g = el('g', { class: 'target' }, this.targetLayer);
        el('circle', { cx: c.x, cy: c.y, r: 34, class: 'target-hit' }, g);
        g.addEventListener('click', () => this.doKehittajaSiirto(c));
      }
      return;
    }

    // Lähtöpisteen valinta: kaikki kaupungit ovat napautettavia.
    if (game.phase === 'pickstart') {
      // Puhelimella ensimmäinen napautus zoomaa kartan lähemmäs sen
      // sijaan että valitsisi kaupungin — kaukaa katsottuna kaupungit
      // ovat liian pieniä osuttaviksi (omistajan havainto). Zoomauksen
      // hoitaa paneelin oma kuuntelija (asennaPanorointi), joten tässä
      // riittää olla valitsematta kaupunkia.
      const zoomaa = this.zoomTarpeen() && !this.aloitusZoom;
      for (const c of game.board.cities) {
        for (const x of this.kiertoKohdat(c.x)) {
          const g = el('g', { class: 'target' }, this.targetLayer);
          el('circle', { cx: x, cy: c.y, r: 34, class: 'target-hit' }, g);
          el('circle', {
            cx: x,
            cy: c.y,
            r: c.start ? 27 : 22,
            class: 'target-ring pick',
          }, g);
          g.addEventListener('click', () => {
            if (!zoomaa) this.doPickStart(c);
          });
        }
      }
      return;
    }

    // Lentokohteet näkyvät kartalla lentovalinnan aikana: rengas ja pieni
    // kone kohdekaupungin päällä, ja napautus ostaa lennon suoraan
    // (omistajan toive). Porttilennot toisille laudoille pysyvät napeissa,
    // koska niiden kohde ei ole tällä kartalla.
    if (game.phase === 'action' && this.travelExpanded && !game.player.isBot) {
      for (const dest of game.airportDestinations()) {
        const city = game.board.cityById.get(dest);
        if (!city) continue;
        for (const x of this.kiertoKohdat(city.x)) {
          const g = el('g', { class: 'target' }, this.targetLayer);
          el('circle', { cx: x, cy: city.y, r: 34, class: 'target-hit' }, g);
          el('circle', { cx: x, cy: city.y, r: 25, class: 'target-ring lento' }, g);
          const merkki = el('text', {
            x, y: city.y - 33, class: 'lento-kohde-merkki', 'text-anchor': 'middle',
          }, g);
          merkki.textContent = '✈';
          g.addEventListener('click', () => this.doFly(dest));
        }
      }
      return;
    }

    if (game.phase !== 'move' || game.player.isBot) return;
    for (const opt of game.moveOptions()) {
      const { x, y } = pixelOf(game.board, opt.pos);
      for (const kx of this.kiertoKohdat(x)) {
        const g = el('g', { class: 'target' }, this.targetLayer);
        el('circle', { cx: kx, cy: y, r: 30, class: 'target-hit' }, g);
        el('circle', {
          cx: kx,
          cy: y,
          r: opt.city ? 22 : 14,
          class: opt.city ? 'target-ring' : 'target-ring far',
        }, g);
        g.addEventListener('click', () => this.doMove(opt.key));
      }
    }
  }

  /*
   * Napautettavan kohdan x-koordinaatit.
   *
   * Kartan sisällöstä on kiertävällä laudalla <use>-kopio laudan
   * leveyden verran oikealla, mutta kopiosta ei voi napauttaa mitään:
   * tapahtuma osuisi <use>-elementtiin eikä sen sisältöön. Siksi
   * napautettavat renkaat piirretään oikeina elementteinä molempiin
   * kohtiin. Niitä on korkeintaan muutama kymmenen, joten hinta on
   * olematon — ja ilman tätä oikeaan laitaan kiertynyt kaupunki näyttää
   * napautettavalta mutta ei ole sitä.
   */
  kiertoKohdat(x) {
    if (!this.kiertava()) return [x];
    return [x, x + this.game.pack.map.width];
  }

  /** Pelinappula: varjo, vaalea kehys, pelaajan väri ja kiilto. */
  pawnShape(parent, player, active) {
    const g = el('g', { class: 'pawn' }, parent);
    el('ellipse', { cx: 2, cy: 9, rx: 11, ry: 4, class: 'pawn-shadow' }, g);
    if (active) {
      el('circle', { r: 15, class: 'pawn-pulse', stroke: player.color }, g);
      el('circle', { r: 17, class: 'pawn-active-ring' }, g);
    }
    el('circle', { r: 13, class: 'pawn-ring' }, g);
    el('circle', { r: 9.5, fill: player.color, class: 'pawn-dot' }, g);
    el('path', { d: 'M-5,-3 a6,6 0 0 1 8,-3', class: 'pawn-gloss', fill: 'none',
      stroke: 'rgba(255,255,255,0.6)', 'stroke-width': 2.2, 'stroke-linecap': 'round' }, g);
    if (player.hasStar) {
      el('text', { x: 0, y: -18, class: 'pawn-star', 'text-anchor': 'middle' }, g).textContent = '◈';
    }
    return g;
  }

  drawPawns() {
    const { game } = this;
    this.pawnLayer.textContent = '';
    const groups = new Map();
    for (const p of game.players) {
      if (p.id === this.movingPlayerId) continue; // liikkuva nappula piirretään erikseen
      if (p.packId !== this.drawnPackId) continue; // toisella laudalla olevat eivät näy
      const key = posKey(p.pos);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(p);
    }
    for (const [, players] of groups) {
      const base = pixelOf(game.board, players[0].pos);
      players.forEach((p, i) => {
        const angle = (i / Math.max(players.length, 1)) * Math.PI * 2 - Math.PI / 2;
        const spread = players.length > 1 ? 17 : 0;
        const x = base.x + Math.cos(angle) * spread;
        const y = base.y + Math.sin(angle) * spread;
        const g = this.pawnShape(this.pawnLayer, p, p.id === game.current && !this.busy);
        g.setAttribute('transform', `translate(${x},${y})`);
      });
    }
  }

  // --- paneeli ------------------------------------------------------------

  renderTurnPill() {
    const { game } = this;
    this.turnPill.textContent = '';
    // Laukun kahva pillerin edessä: pilleri on samalla matkalaukun nappi,
    // ja ilman kuvaketta mikään ei kertoisi sen aukeavan (omistajan toive).
    const laukku = html('span', 'laukku-ikoni');
    laukku.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">'
      + '<rect x="4" y="8" width="16" height="11.5" rx="2"/>'
      + '<path d="M9.3 8V6.3a1.7 1.7 0 0 1 1.7-1.7h2a1.7 1.7 0 0 1 1.7 1.7V8'
      + 'M8.6 8v11.5M15.4 8v11.5"/></svg>';
    this.turnPill.appendChild(laukku);
    if (game.phase === 'over') {
      this.turnPill.appendChild(html('span', '', `${game.winner.name} voitti`));
      return;
    }
    // Yläpalkissa on kukkaro ja päiväkirjan päivämäärä. Sijainti, kokemus ja
    // tietoprosentti ovat passissa: kartta on tärkeämpi kuin mittaristo.
    this.turnPill.appendChild(html('span', '', `£${game.player.money}`));
    // Mittari on päivämäärä, ei kello eikä palkki: aika on tarinaa, ei uhkaa,
    // joten se ei saa hälytysväriä eikä muutu punaiseksi ennätyksen jälkeen.
    const kello = game.clockLabel();
    this.turnPill.appendChild(html('span', 'clock', kello));
    // Ajan eteneminen välähtää kevyesti, jotta pelaaja huomaa vilkaista
    // päivämäärää (omistajan toive). Ensimmäinen piirto ei väläytä.
    if (this.kelloEdellinen !== undefined && this.kelloEdellinen !== kello) {
      this.turnPill.classList.remove('aika-valahdys');
      void this.turnPill.offsetWidth;
      this.turnPill.classList.add('aika-valahdys');
    }
    this.kelloEdellinen = kello;
  }

  /** Matkan tiedot passiin: missä ollaan, paljonko kokemusta ja tietoa. */
  renderProgress() {
    const { game } = this;
    const p = game.player;
    this.passportProgress.textContent = '';

    const rivi = (label, value) => {
      const row = html('div', 'find');
      row.appendChild(html('span', 'find-text', label));
      row.appendChild(html('span', 'find-value', value));
      this.passportProgress.appendChild(row);
    };

    const city = this.factCity(p.pos);
    rivi('Sijainti', p.pos.type === 'edge' ? `matkalla — ${city.name}` : city.name);
    rivi('Kukkaro', `£${p.money}`);
    rivi('Kokemus', `${p.xp ?? 0} kp`);
    const tieto = game.knowledgePercent(p);
    if (tieto !== null) rivi('Tieto tästä laudasta', `${tieto} %`);
  }

  renderActions() {
    const { game } = this;
    this.actionsEl.textContent = '';
    // Matkustustavan ensimmäinen vaihe latoo nappinsa aina yhteen riviin;
    // muut näkymät (vaihe B, kysymykset) käyttävät tavallista ruudukkoa.
    delete this.actionsEl.dataset.rivi;
    this.errorEl.hidden = true;

    if (game.phase === 'over') {
      this.turnStatus.textContent = 'Peli päättyi.';
      this.hint.textContent = '';
      this.dieEl.hidden = true;
      const again = html('button', 'primary', 'Uusi peli');
      again.addEventListener('click', () => this.onNewGame());
      this.actionsEl.appendChild(again);
      return;
    }

    const p = game.player;
    this.dieEl.hidden = true; // silmäluku näkyy laudalla olevassa nopassa

    // Lähtöpisteen valinta tehdään kartalta yhdellä napautuksella, joten
    // toimintopaneelissa on vain ohje.
    // Aloitusnäkymässä ei ole toimintoja eikä tilariviä: avausteksti hoitaa
    // kehotuksen, ja tyhjä kortti vain veisi tilaa kartalta.
    if (game.phase === 'pickstart') {
      this.turnStatus.textContent = '';
      this.hint.textContent = '';
      this.turnCard.hidden = true;
      return;
    }
    this.turnCard.hidden = false;

    if (p.isBot) {
      this.turnStatus.textContent = `${p.name} miettii…`;
      this.hint.textContent = '';
      return;
    }

    if (game.phase === 'move') {
      // Tilarivi kertoo jo "valitse kohde kartalta" — erillinen kupla
      // ylhäällä olisi sama kehotus kahdesti ja jäisi päiväkirjan päälle.
      this.turnStatus.textContent = `Heitit ${game.die} — valitse kohde kartalta.`;
      this.hint.textContent = '';
      return;
    }

    if (game.phase === 'event') {
      this.turnStatus.textContent = 'Matkalla sattui jotain.';
      this.hint.textContent = '';
      return;
    }
    if (game.phase === 'quiz') {
      this.turnStatus.textContent = 'Tietovisa käynnissä.';
      this.hint.textContent = '';
      return;
    }

    this.hint.textContent = '';
    const modes = game.travelModes();

    // Saapuminen aarrekaupunkiin kerrotaan keskelle ruutua omana korttinaan;
    // valinta tehdään siellä, joten toimintopaneeliin ei tule nappeja.
    if (game.phase === 'offer') {
      const city = game.cityOf();
      this.turnStatus.textContent = `${city.name} — saavuit perille.`;
      this.openArrival(city);
      return;
    }

    if (game.phase === 'roll') {
      // Kun matkustustapa valittiin automaattisesti, ei ole valittavaa eikä
      // mihin palata: noppa pyörähtää itsestään.
      if (game.autoTravel) {
        this.turnStatus.textContent = `${TRAVEL_LABEL[game.travelMode]} — noppa pyörähtää.`;
        this.autoRoll();
        return;
      }
      this.turnStatus.textContent = `${TRAVEL_LABEL[game.travelMode]} — heitä noppa.`;
      const rollBtn = this.ikoniTekstiNappi('noppa', 'Heitä noppa', 'primary');
      rollBtn.addEventListener('click', () => this.doRoll());
      this.actionsEl.appendChild(rollBtn);

      const backBtn = this.ikoniTekstiNappi('nuoli', 'Vaihda matkustustapa');
      backBtn.addEventListener('click', () => this.doAction(() => game.actionCancelTravel()));
      this.actionsEl.appendChild(backBtn);
      return;
    }

    // Vaihe 'action': matkustustavan valinta. Näytöllä pidetään kerrallaan
    // vain kourallinen nappeja — laivat, lennot ja portit odottavat
    // toisen vaiheen takana.
    this.renderTravelChoice(modes);
  }

  /**
   * Matkustustavan valinta kahdessa vaiheessa. Vaihe A: jalan, "laiva &
   * lento…" ja aarrekaupungin kysymys. Vaihe B (`travelExpanded`): kaikki
   * maksulliset ja laudalta toiselle vievät vaihtoehdot.
   */
  renderTravelChoice(modes) {
    const { game } = this;
    const flights = game.airportDestinations();
    const gateways = game.gatewayOptions();
    const countryGates = game.countryGateOptions();
    const hasSlow = modes.includes('sea') || flights.length > 0
      || gateways.length > 0 || countryGates.length > 0;

    // Jos välivaiheeseen ei jää yhtään valintaa (esim. rahat eivät riitä
    // lentoon eikä satamaa ole), palataan suoraan perusvalintoihin —
    // pelkkä Takaisin-nappi ei ole näkymä.
    if (this.travelExpanded && !hasSlow) this.travelExpanded = false;

    if (!this.travelExpanded) {
      this.turnStatus.textContent = 'Valitse matkustustapa.';
      // Kaikki vaiheen A napit mahtuvat aina yhteen riviin.
      this.actionsEl.dataset.rivi = 'yksi';

      if (modes.includes('land')) {
        const landBtn = this.iconButton('saapas', 'Jalan', modes.includes('stay') ? '' : 'primary');
        landBtn.addEventListener('click', () => this.doWalk());
        this.actionsEl.appendChild(landBtn);
      }

      if (hasSlow) {
        const moreBtn = this.iconButton('purje', 'Laiva & lento');
        moreBtn.addEventListener('click', () => {
          this.travelExpanded = true;
          this.render();
        });
        this.actionsEl.appendChild(moreBtn);
      }

      if (modes.includes('stay')) {
        const stayBtn = this.iconButton('suurennuslasi', 'Tutki', 'primary');
        stayBtn.addEventListener('click', () => {
          sfx.play('paper');
          // Tutki avaa ensin saapumiskortin (esittely, kuva ja Lue lisää) —
          // peliin siirrytään vasta kortin omasta Tutki paikka -napista.
          this.openArrival(game.cityOf());
        });
        this.actionsEl.appendChild(stayBtn);
      }
      return;
    }

    // Vaihe B.
    this.turnStatus.textContent = 'Laivalla, lentäen vai portin kautta?';

    if (modes.includes('sea')) {
      const seaBtn = this.ikoniTekstiNappi('purje', `Laivalla (${SEA_FARE} p)`, 'wide');
      seaBtn.addEventListener('click', () => {
        this.travelExpanded = false;
        sfx.play('ferry');
        this.doAction(() => game.actionTravel('sea'));
      });
      this.actionsEl.appendChild(seaBtn);
    }

    for (const dest of flights) {
      const city = game.board.cityById.get(dest);
      const flyBtn = this.ikoniTekstiNappi('kone', `${city.name} (${FLIGHT_PRICE} p)`, 'wide');
      flyBtn.addEventListener('click', () => this.doFly(dest));
      this.actionsEl.appendChild(flyBtn);
    }

    // Vaelluksessa porttikaupungeista jatketaan toisille laudoille.
    for (const link of gateways) {
      const gwBtn = this.ikoniTekstiNappi('kompassi', link.label, 'wide');
      gwBtn.addEventListener('click', async () => {
        this.travelExpanded = false;
        sfx.play('flight');
        // Lentokalvo kuuluu vain maailmankartalle — mantereella lento
        // tapahtuu suoraan karttanäkymässä. Siirto tehdään ennen kalvoa,
        // jotta perillä odottava päiväkirjamerkintä alkaa puheineen jo
        // lennon aikana.
        const lahto = game.cityOf()?.name ?? '';
        const kalvo = game.pack.id === 'maailma';
        const line = kalvo ? game.flightLine(link.city, packById(link.pack)) : null;
        // Lippu ennen siirtoa: kohteen äänimaisema ja päiväkirja odottavat
        // kalvon alla, kunnes pelaaja astuu ulos.
        if (kalvo && !this.reducedMotion) document.body.classList.add('flight-active');
        this.doAction(() => game.actionGateway(link.index));
        if (kalvo) await this.animateFlight(lahto, link.label, line);
      });
      this.actionsEl.appendChild(gwBtn);
    }

    // Tietoportti: maan lauta aukeaa pääkaupungista vaikealla kysymyksellä.
    for (const gate of countryGates) {
      const gateBtn = this.ikoniTekstiNappi('tahti', `${gate.label} — vaikea kysymys`, 'wide');
      gateBtn.addEventListener('click', () => {
        this.travelExpanded = false;
        sfx.play('paper');
        this.doAction(() => game.actionGateQuiz(gate.index));
      });
      this.actionsEl.appendChild(gateBtn);
    }

    const backBtn = this.iconButton('nuoli', 'Takaisin');
    backBtn.addEventListener('click', () => {
      this.travelExpanded = false;
      this.render();
    });
    this.actionsEl.appendChild(backBtn);
  }

  /**
   * Toimintonappi ikonina. Teksti jää saavutettavuutta varten title- ja
   * aria-label-määreisiin sekä leveälle ruudulle näkyväksi selitteeksi, jotta
   * napit vievät kartalta mahdollisimman vähän tilaa.
   */
  iconButton(icon, label, extra = '') {
    const btn = html('button', `icon-btn${extra ? ` ${extra}` : ''}`);
    btn.type = 'button';
    btn.title = label;
    btn.setAttribute('aria-label', label);
    btn.appendChild(viivaIkoni(icon) ?? html('span', 'icon-glyph', icon));
    btn.appendChild(html('span', 'icon-label', label));
    return btn;
  }

  /** Tekstinappi, jonka edessä on kartan kynällä piirretty viivaikoni. */
  ikoniTekstiNappi(ikoni, teksti, luokka = '') {
    const btn = html('button', `ikoni-teksti${luokka ? ` ${luokka}` : ''}`);
    btn.type = 'button';
    const kuva = viivaIkoni(ikoni);
    if (kuva) btn.appendChild(kuva);
    btn.appendChild(html('span', '', teksti));
    return btn;
  }

  /** Vaihtaa olemassa olevan napin sisällöksi viivaikonin ja tekstin. */
  ikonoi(btn, ikoni, teksti) {
    btn.classList.add('ikoni-teksti');
    btn.textContent = '';
    const kuva = viivaIkoni(ikoni);
    if (kuva) btn.appendChild(kuva);
    btn.appendChild(html('span', '', teksti));
  }

  /**
   * Lähtöpisteen valinta: napautus vie suoraan perille. Porttikaupungista
   * laskeudutaan mantereen omalle laudalle, muualta jäädään maailmankartalle.
   * Useamman portin kaupungeista (Kairo, Mumbai) otetaan ensimmäinen eli
   * kaupungin oma manner — välikysymystä ei enää esitetä.
   */
  async doPickStart(city) {
    const { game } = this;
    const portti = (city.links ?? []).length > 0;
    sfx.play(portti ? 'flight' : 'paper');
    // Pelin avaus on se filmihetki: avausteksti häipyy ja lento piirtyy
    // kalvona kartan päälle ennen kuin mantereen kartta aukeaa.
    const lontoo = game.board.cityById.get('lontoo');
    if (lontoo && lontoo.id !== city.id) {
      // Lukuääni väistyy, kun matka alkaa.
      this.stopIntroVoice();
      this.introEl.classList.add('intro-fade');
      // Repliikki ennen siirtoa, jotta rng-kutsut osuvat samaan kohtaan.
      const line = game.firstFlightLine(city.id);
      // Lippu ennen siirtoa, jotta saapumismerkintä ei ala kalvon alla —
      // se odottaa Astu ulos -nappia. animateFlight poistaa lipun.
      if (!this.reducedMotion) document.body.classList.add('flight-active');
      this.doAction(() => game.actionPickStart(city.id, portti ? 0 : null));
      if (!this.reducedMotion) {
        // Avauslennon repliikki on lukittu ja luettu ääneen: puhe alkaa
        // pienellä viiveellä, kun moottori on jo ehtinyt nousta esiin.
        this.lentoPuheAjastin = setTimeout(() => {
          // Lentorepliikin lukee vain pitkä kertoja.
          if (!this.dead && kertojaTila() === 'pitka') {
            this.playDiaryVoice('assets/audio/puhe-lento-alku.mp3');
          }
        }, 1400);
      }
      await this.animateFlight(
        'Lontoo', city.name, line,
        { dx: city.x - lontoo.x, dy: city.y - lontoo.y },
      );
      clearTimeout(this.lentoPuheAjastin);
      return;
    }
    this.doAction(() => game.actionPickStart(city.id, portti ? 0 : null));
  }


  /**
   * Kehittäjätilan hyppy kaupunkiin. Pelin alussa lähtöpaikka pitää
   * valita pelin omilla säännöillä (se avaa portin mantereelle), joten
   * ensimmäinen napautus menee tavallista tietä ja vasta seuraavat
   * hyppäävät.
   */
  doKehittajaSiirto(city) {
    const { game } = this;
    if (game.phase === 'pickstart') {
      this.doPickStart(city);
      return;
    }
    // Nappula siirtyy ilman animaatiota: oikotie saa näyttää oikotieltä.
    this.haivytaLuenta();
    this.travelExpanded = false;
    this.doAction(() => game.actionKehittajaSiirto(city.id));
  }

  /** Jalan: matkustustapa ja nopanheitto samalla painalluksella. */
  doWalk() {
    // Radiotilassa kartalla ei liikuta.
    if (this.radioPaalla()) return;
    const { game } = this;
    // Nopanheitto keskeyttää tarinan: luenta häipyy pehmeästi pois.
    this.haivytaLuenta();
    this.run(
      () => {
        const chosen = game.actionTravel('land');
        return chosen.ok ? game.actionRoll() : chosen;
      },
      { after: (result) => this.animateDie(result.die) },
    );
  }

  /**
   * Heittää nopan ilman painallusta. Sallittu vain kun matkustustapa
   * valikoitui itsestään — muuten pelaaja saa aina painaa itse.
   */
  autoRoll() {
    if (this.busy || this.autoRollTimer) return;
    this.autoRollTimer = setTimeout(() => {
      this.autoRollTimer = null;
      const { game } = this;
      if (game.phase === 'roll' && game.autoTravel && !game.player.isBot) this.doRoll();
    }, AUTO_ROLL_MS);
  }

  /**
   * Kaupunki, jonka tiedon paneeli näyttää. Reitin varrella valitaan se pää,
   * jota lähempänä pelaaja on.
   */
  factCity(pos) {
    const { board } = this.game;
    if (pos.type === 'city') return board.cityById.get(pos.city);
    const edge = board.edgeById.get(pos.edge);
    const nearer = pos.idx * 2 <= edge.steps ? edge.a : edge.b;
    return board.cityById.get(nearer);
  }

  /**
   * Maan minikartta saapumiskorttiin pelin omasta rajadatasta: maan
   * muoto, pelin kaupungit pisteinä ja nykyinen kaupunki korostettuna.
   * Sama kynä kuin laudalla — ja toimii ilman verkkoa, toisin kuin
   * Wikipediasta haettu kartta.
   */
  piirraMaakartta(iso, nykyinenId) {
    const map = this.game.pack.map;
    const maa = map?.countryShapes?.[iso];
    if (!maa?.renkaat?.length) return null;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const rengas of maa.renkaat) {
      for (const [x, y] of rengas) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
    const mitta = Math.max(maxX - minX, maxY - minY);
    // Nimilaput tarvitsevat reunoille hieman ilmaa muodon ympärille —
    // alareunaan vähemmän, jotta tunnusluvut istuvat lähelle karttaa
    // (omistajan toive).
    const vara = mitta * 0.14;
    const varaAla = mitta * 0.05;
    const svg = el('svg', {
      class: 'arrival-maa-kartta-svg',
      viewBox: `${minX - vara} ${minY - vara} ${maxX - minX + vara * 2} ${maxY - minY + vara + varaAla}`,
      'aria-hidden': 'true',
    });
    const d = maa.renkaat
      .map((r) => `M${r.map(([x, y]) => `${x},${y}`).join(' L')}Z`)
      .join(' ');
    el('path', { d, class: 'minimaa-pohja' }, svg);
    for (const [cityId, maanIso] of Object.entries(map.cityCountry ?? {})) {
      if (maanIso !== iso) continue;
      const kaupunki = this.game.board.cityById.get(cityId);
      if (!kaupunki) continue;
      const oma = cityId === nykyinenId;
      el('circle', {
        cx: kaupunki.x,
        cy: kaupunki.y,
        r: ((oma ? 0.024 : 0.016) * mitta).toFixed(2),
        class: oma ? 'minimaa-piste nykyinen' : 'minimaa-piste',
      }, svg);
      const nimi = el('text', {
        x: kaupunki.x,
        y: kaupunki.y - 0.04 * mitta,
        class: 'minimaa-nimi',
        'text-anchor': 'middle',
        'font-size': (0.07 * mitta).toFixed(1),
      }, svg);
      nimi.textContent = kaupunki.name;
    }
    return svg;
  }

  /**
   * Vanhan valokuvan pikkukuva muistikirjan kylkeen, jos kaupungille on
   * kuva kuvastossa. Null piilottaa kuvan ja sulkee auki jääneen kortin.
   */
  naytaFactValokuva(cityId, paikka) {
    const valokuva = cityId ? (VALOKUVAT[this.game.pack.id] ?? {})[cityId] ?? null : null;
    // Kaupungin vaihtuessa edellisen kaupungin auki jäänyt kortti suljetaan
    // aina — muuten vanha pino voi jäädä uuden kaupungin kortin alle.
    if (cityId !== this.factValokuvaCityId) this.suljePostikortti();
    this.factValokuvaCityId = cityId;
    this.factValokuvaTiedot = valokuva ? { ...valokuva, paikka } : null;
    if (!valokuva) {
      this.factValokuva.hidden = true;
      this.suljePostikortti();
      return;
    }
    asetaKuva(this.factValokuvaKuva,
      valokuvaUrl(valokuva.tiedosto, 160), valokuvaVara(valokuva.tiedosto, 160));
    this.factValokuva.hidden = false;
  }

  /**
   * Valokuva aukeaa postikorttina hieman vinottain keskelle ruutua:
   * valkoiset reunukset, kuvateksti ja lähde. Kuvapinossa napautus kuvaan
   * vaihtaa kortit; kortti suljetaan napauttamalla sen ulkopuolelle.
   */
  naytaPostikortti() {
    this.suljePostikortti();
    const tiedot = this.factValokuvaTiedot;
    if (!tiedot) return;
    const kortti = html('div', 'postikortti');
    const teeKortti = (kuvaTiedot, luokka, altTeksti, oletusVanha = false) => {
      const osa = html('div', `postikortti-kortti${luokka ? ` ${luokka}` : ''}`);
      const kuva = document.createElement('img');
      asetaKuva(kuva,
        valokuvaUrl(kuvaTiedot.tiedosto, 1000), valokuvaVara(kuvaTiedot.tiedosto, 1000));
      // Harmaasävy vain aidosti vanhoille (ks. onVanhaKuva).
      if (onVanhaKuva(kuvaTiedot, oletusVanha)) kuva.classList.add('vanha-vedos');
      kuva.alt = altTeksti;
      osa.appendChild(kuva);
      // Parin lauseen selite kertoo mitä kuvassa näkyy; lähde ja vuosi
      // jäävät omalle pienemmälle rivilleen (omistajan toive).
      if (kuvaTiedot.selite) osa.appendChild(html('p', 'kuvateksti', kuvaTiedot.selite));
      osa.appendChild(html('p', 'kuvalahde',
        [tiedot.paikka, kuvaTiedot.vuosi, kuvaTiedot.lahde].filter(Boolean).join(' · ')));
      return osa;
    };
    /*
     * Pinossa voi olla enemmän kuin kaksi kuvaa.
     *
     * Omistajan toive 3.8.2026: "Matkakirjassa mainitut näkymät ja asiat
     * olisi kiva saada kuvin matkakirjan kuviin, joita voi siis olla
     * enemmän kuin kaksi." Päiväkirja mainitsee Suakinissa korallitalot,
     * sataman ja dhow-veneet — jokaisesta voi olla oma kuvansa.
     *
     * Järjestys: vanha valokuva ensin, sitten päiväkirjan mainitsemat
     * näkymät, viimeisenä nykypäivä. Näin pino kertoo saman tarinan kuin
     * teksti ja päättyy siihen, mitä paikasta on jäljellä.
     */
    const pino = [
      { ...tiedot, alt: `Vanha valokuva: ${tiedot.paikka}` },
      ...(tiedot.lisat ?? []).map((k) => ({
        ...k,
        alt: `${k.selite ? k.selite.slice(0, 60) : tiedot.paikka}`,
      })),
      ...(tiedot.uusi
        ? [{
          ...tiedot.uusi,
          vuosi: tiedot.uusi.vuosi ?? 'nykypäivä',
          alt: `Uusi valokuva: ${tiedot.paikka}`,
        }]
        : []),
    ];
    this.postikorttiPino = pino.length;
    this.postikorttiIndeksi = 0;
    pino.forEach((kuvaTiedot, i) => {
      const luokat = [
        kuvaTiedot === pino[pino.length - 1] && tiedot.uusi ? 'uusi' : '',
        i === 0 ? '' : 'alla',
      ].filter(Boolean).join(' ');
      // Pinon ensimmainen on kaupungin historiakuva. Jos siita puuttuu
      // vuosi, se on silti vanha — muissa oletus on varillinen.
      const osa = teeKortti(kuvaTiedot, luokat, kuvaTiedot.alt, i === 0);
      // Laskuri kertoo, että kuvia on lisää — muuten pinon alta
      // pilkottava reuna jää helposti huomaamatta.
      if (pino.length > 1) {
        osa.appendChild(html('p', 'postikortti-laskuri', `${i + 1}/${pino.length}`));
      }
      kortti.appendChild(osa);
    });
    // Kortti keskelle ruutua — sama paikka yhdelle kuvalle ja pinolle,
    // jotta avaus näyttää samalta joka laitteella. Pystykeskitys tehdään
    // CSS:llä eikä mittaamalla: kortin korkeus ei ole tiedossa ennen kuin
    // kuva on latautunut, ja mitattu keskitys valui alas (omistajan
    // havainto iPadilla).
    /*
     * Keskitys tehdään CSS:llä molempiin suuntiin.
     *
     * Vaakakeskitys laskettiin ennen JavaScriptissä oletuksella, että
     * kortti on korkeintaan 400 pikseliä leveä. Kun kortti kasvoi
     * isolla ruudulla 720 pikseliin, laskelma jäi vanhaksi ja kortti
     * valui oikealle yli ruudun reunan (omistajan havainto iPadilla:
     * "ei keskellä"). Sama virhe oli aiemmin pystysuunnassa, ja se
     * korjattiin silloin samalla tavalla — leveys ei ole tiedossa
     * ennen kuin tyylit on laskettu.
     */
    kortti.style.left = '50%';
    kortti.style.top = '50%';
    // Hienoinen nosto ylös: alta pilkottava kortti jatkuu alaspäin.
    kortti.style.transform = 'translate(-50%, -52%)';
    document.body.appendChild(kortti);
    this.postikortti = kortti;
    // Sieppausvaiheessa, jotta kartan omat käsittelijät eivät estä
    // sulkemista — napautus mihin tahansa sulkee kortin.
    setTimeout(() => {
      document.addEventListener('pointerdown', this.postikorttiSulkija, { capture: true });
    }, 0);
  }

  suljePostikortti() {
    document.removeEventListener('pointerdown', this.postikorttiSulkija, true);
    this.postikortti = null;
    // Poistetaan seuratun kortin lisäksi mahdolliset orvoiksi jääneet
    // kortit — kaksi päällekkäistä korttia eri kaupungeista näytti
    // rikkinäiseltä (omistajan havainto). Kulttuurisuurennos ei ole
    // bodyn alla, joten se ei osu tähän.
    for (const kortti of document.querySelectorAll('body > .postikortti')) kortti.remove();
  }

  /**
   * Tietoruutu pelaajan sijainnista. Siinä puhuu vuorotellen kaksi ääntä:
   * isoisän 1870-luvun päiväkirja ja nuoren herran nykyhavainto. Teksti
   * vaihtuu kierroksittain mutta pysyy samana saman vuoron ajan, jotta sen
   * ehtii lukea.
   */
  /**
   * Isoisän aikataulurivi matkakirjamerkinnän perään: pieni oma rivinsä,
   * joka ei peitä merkintää (omistajan havainto Gaossa — aikataulukortti
   * ajoi uuden saapumistekstin ohi koko käynnin ajaksi).
   */
  aikatauluRivi() {
    const aikataulu = this.game.scheduleNote;
    if (!aikataulu || aikataulu.packId !== this.game.pack.id) return null;
    const rivi = html('span', 'aikataulu-rivi');
    rivi.appendChild(html('b', '', `Isoisän aikataulusta, päivä ${aikataulu.day}: `));
    rivi.appendChild(document.createTextNode(aikataulu.text));
    return rivi;
  }

  /**
   * Uusi päiväkirjamerkintä alkaa aina alusta ja avaa kortin.
   *
   * Teksti palautetaan alkuun, koska edellinen merkintä on voitu
   * jättää vieritettynä keskeltä — muuten uusi merkintä alkaisi
   * näkyä puolivälistä.
   *
   * Linssi tai kartan vieritys on voinut kutistaa kortin yhden rivin
   * lapuksi, ja jos se jäisi siihen, pelaaja ei näkisi juuri
   * kirjoitettua tekstiä lainkaan — hän ei edes tietäisi, että
   * sellainen tuli (omistajan linjaus). Seuraava kartan liike tai
   * napautus kutistaa kortin taas.
   */
  uusiFactKey(key) {
    this.factKey = key;
    if (this.factText) this.factText.scrollTop = 0;
    this.asetaPaivakirjanKoko(false);
    this.paivitaJatkuuVihje?.();
  }

  /**
   * Päiväkirjan kaksi kokoa kartalla: koko merkintä ja yhden rivin
   * nimilappu. Välikoko poistui v317:ssä (omistajan päätös), joten
   * näiden väliin ei jää mitään.
   *
   * Lappu on kolmen tilanteen vastaus (omistajan toive 4.8.2026):
   * linssin päällä kartan pitää näkyä selitteen ja päiväkirjan välistä,
   * ja kun karttaa vieritetään sormella tai napautetaan, kortti on
   * tiellä juuri siinä nurkassa, jota katsotaan. Kutistuminen on aina
   * peruttavissa napautuksella, eikä se koskaan kestä uuden merkinnän
   * yli.
   *
   * Tila luetaan ja kirjoitetaan luokasta itsestään, ei erillisestä
   * kentästä: niin kortin ulkoasu ja saavutettavuusmääreet eivät voi
   * ajautua eri linjoille.
   */
  asetaPaivakirjanKoko(pieni) {
    if (!this.factCard) return;
    if (this.factCard.classList.contains('pieni') === pieni) return;
    this.factCard.classList.toggle('pieni', pieni);
    if (pieni) {
      // Teksti alkuun: jos merkintä oli vieritetty keskeltä, lapun
      // avaaminen näyttäisi muuten katkelman keskeltä virkettä.
      if (this.factText) this.factText.scrollTop = 0;
      this.factCard.setAttribute('role', 'button');
      this.factCard.setAttribute('tabindex', '0');
      this.factCard.setAttribute('aria-expanded', 'false');
      this.factCard.setAttribute('aria-label', 'Avaa matkapäiväkirjan merkintä');
    } else {
      // Auki kortti on tavallista sisältöä omine nappeineen, joten
      // painikkeen rooli ja tila otetaan pois — sisäkkäinen painike
      // painikkeen sisällä ei ole luettavissa oleva tila.
      this.factCard.removeAttribute('role');
      this.factCard.removeAttribute('tabindex');
      this.factCard.removeAttribute('aria-expanded');
      this.factCard.removeAttribute('aria-label');
    }
    this.paivitaJatkuuVihje?.();
  }

  renderFact() {
    const { game } = this;
    // Aloitusnäkymässä kartta saa puhua puolestaan: tietoruutu on piilossa.
    this.factCard.hidden = game.phase === 'pickstart';
    if (game.phase === 'pickstart') {
      // Piilotuksen lisäksi sisältö tyhjennetään: muuten edellisen pelin
      // teksti voi välähtää ruudulla ennen kuin kortti ehtii piiloon.
      this.uusiFactKey(null);
      this.factCard.classList.remove('vihjekortti');
      this.factVoiceEl.textContent = '';
      this.factPlace.textContent = '';
      this.factText.textContent = '';
      this.factImage.hidden = true;
      this.factKuuntele.hidden = true;
      this.naytaFactValokuva(null);
      this.stopDiaryVoice();
      return;
    }

    // Matkalla kortti ei päivity: sama merkintä pysyy näytöllä, kunnes
    // saavutaan uuteen kaupunkiin — uusi nopanheitto reitillä ei vaihda
    // tekstiä (omistajan päätös).
    /*
     * Isoisän vihje nousee esiin kaupunkien välissä (omistajan
     * linjaus 7.8.2026) — siksi se lasketaan ENNEN reunan
     * varhaispoistumista, joka muuten jäädyttäisi kortin matkan
     * ajaksi. Harvennus tehdään täällä: sama vihje ei nouse joka
     * pysähdyksellä, vaan aikaisintaan HINT_EVERY_TURNS vuoron
     * välein (game.starHint on puhdas funktio piirtoa varten).
     */
    const vihjeTeksti = game.starHint();
    const vihjeEsilla = this.factKey?.startsWith('hint:') ?? false;
    const vihjeTuore = Boolean(vihjeTeksti) && (vihjeEsilla
      || this.vihjeVuoro == null
      || game.turnCount - this.vihjeVuoro >= HINT_EVERY_TURNS);
    if (game.player.pos.type === 'edge' && this.factKey && !vihjeTuore) return;

    // Matkakirjan merkintä voittaa aina (omistajan havainto Gaossa:
    // aikataulurivi peitti uuden saapumistekstin koko käynnin ajaksi).
    // Kaupungissa ollessa aikataulu liitetään merkinnän perään omana
    // rivinään; oma korttinsa siitä tulee vain ilman saapumismerkintää.
    const saapuvilla = game.arrivalFact
      && game.arrivalFact.packId === game.pack.id
      && game.player.pos.type === 'city'
      && game.player.pos.city === game.arrivalFact.cityId;

    // Isoisän aikataulu nousee esiin, kun matkapäivä ohittaa merkinnän.
    const aikataulu = game.scheduleNote;
    if (aikataulu && aikataulu.packId === game.pack.id && !saapuvilla) {
      const key = `schedule:${aikataulu.packId}:${aikataulu.day}`;
      if (this.factKey === key) return;
      this.uusiFactKey(key);
      this.factCard.classList.remove('vihjekortti');
      this.factVoiceEl.textContent = 'Isoisän aikataulusta';
      this.factPlace.textContent = `Päivä ${aikataulu.day}`;
      this.factImage.hidden = true;
      this.factKuuntele.hidden = true;
      this.naytaFactValokuva(null);
      this.stopDiaryVoice();
      this.typeText(this.factText, aikataulu.text);
      return;
    }

    // Isoisän vihje laudan pääaarteesta nousee esiin harvakseltaan
    // kaupunkien välissä. Vihjekortti erottuu tavallisesta
    // merkinnästä: tähtiotsikko, oma revityn sivun ilme ja paperin
    // rapina — pelkkä otsikkorivi meni pelaajalta ohi ja hiljainen
    // kortti tuntui virheeltä (omistajan havainto).
    if (vihjeTuore) {
      const key = `hint:${game.pack.id}:${game.turnCount}`;
      if (this.factKey === key) return;
      this.uusiFactKey(key);
      this.vihjeVuoro = game.turnCount;
      this.factCard.classList.add('vihjekortti');
      this.factVoiceEl.textContent = '◈ Isoisän vihje aarteesta';
      this.factPlace.textContent = 'Päiväkirjasta revitty sivu';
      this.factImage.hidden = true;
      this.naytaFactValokuva(null);
      this.stopDiaryVoice();
      sfx.play('paper');
      // Kuiskattu luenta (omistajan tilaus): vihje luetaan hiljaa, jos
      // luenta on generoitu — kaiutinnapista sen voi kuunnella uudelleen.
      // Aluevihjeillä (esim. Eurooppa) äänitiedosto on alueen, ei
      // kaupungin: starHintAlue kuvaa kaupungin ilmansuunnaksi.
      const vihjeKaupunki = game.starHintCity();
      const vihjeAvain = game.pack.texts.starHintAlue?.[vihjeKaupunki] ?? vihjeKaupunki;
      const vihjeLauta = luentaLauta(VIHJELUENNAT, game.pack.id, vihjeAvain);
      this.diaryFullUrl = vihjeLauta
        ? `assets/audio/puhe-${vihjeLauta}-vihje-${vihjeAvain}.mp3`
        : null;
      this.factKuuntele.hidden = !vihjeLauta;
      if (vihjeLauta && kertojaTila() !== 'ei') {
        this.playDiaryVoice(this.diaryFullUrl, { viive: 1200 });
      }
      this.typeText(this.factText, vihjeTeksti);
      return;
    }

    // Saapumishavainto: kortti kertoo aina siitä kaupungista, jossa
    // matkaaja on. Isoisän muistelu luetaan ääneen ensisijaisesti; ilman
    // sitä käytetään kaupungin ensimmäistä havaintoa. Sama teksti pysyy
    // koko käynnin ajan, ja luenta kuuluu vain kerran per saapuminen.
    const saapuminen = game.arrivalFact;
    if (saapuminen && saapuminen.packId === game.pack.id
      && game.player.pos.type === 'city' && game.player.pos.city === saapuminen.cityId) {
      // Lennon aikana ruudussa on lentorepliikki — havainto ja luenta
      // alkavat vasta, kun pelaaja astuu ulos koneesta. Muuten lukija
      // lukisi eri tekstiä kuin ruudulla näkyy.
      if (document.body.classList.contains('flight-active')) return;
      const kaupunki = game.board.cityById.get(saapuminen.cityId);

      // Uusi malli (pilotti): nuoren herran fiiliskuvaus lihavoituna,
      // perässä isoisän nosto, ja lukija lukee koko merkinnän tunteella.
      // Teksti ei vaihdu kaupungissa olon aikana.
      // Aikataulurivi elää merkinnän perässä: sen ilmestyminen muuttaa
      // kortin avainta (teksti piirtyy uusiksi), mutta luenta ei ala
      // alusta — luentaa seurataan perusavaimella.
      const aikatauluLisa = aikataulu && aikataulu.packId === game.pack.id
        ? `:a${aikataulu.day}` : '';

      /*
       * Tarinakaaren saapumismerkintä syrjäyttää vanhan mallin
       * (omistajan tilaus 9.8.2026: paketti suoraan peliin) — isoisän
       * merkintä on kirjoitettu kaaren kohtaamisen ja aarteen pariksi.
       * Nosto jää pois: merkintä on jo kokonainen.
       */
      const kaariMerkinta = KAARI_LAUDAT.has(saapuminen.packId)
        ? TARINAKAARI[saapuminen.cityId] : null;
      const uusi = kaariMerkinta
        ? { kuvaus: kaariMerkinta.saapuminen, nosto: '' }
        : (SAAPUMISTEKSTIT[saapuminen.packId] ?? {})[saapuminen.cityId];
      if (uusi && kaupunki) {
        const luentaAvain = `saapui:${saapuminen.packId}:${saapuminen.cityId}`;
        const key = luentaAvain + aikatauluLisa;
        if (this.factKey === key) return;
        this.uusiFactKey(key);
        this.factCard.classList.remove('vihjekortti');
        this.factVoiceEl.textContent = 'Matkakirjasta';
        this.factPlace.textContent = kaupunki.name;
        this.factImageTitle = null;
        this.factImage.hidden = true;
        this.naytaFactValokuva(saapuminen.cityId, kaupunki.name);
        this.factText.textContent = '';
        const lihava = html('b', 'fact-lead');
        const jatko = html('span');
        this.factText.appendChild(lihava);
        this.factText.appendChild(document.createTextNode(' '));
        this.factText.appendChild(jatko);
        // Vain ensimmäinen lause lihavoituna (omistajan toive) — loppu
        // kuvauksesta ja isoisän nosto jatkuvat tavallisella leikkauksella.
        const { eka, loput } = ekaLause(uusi.kuvaus);
        const jatkoTeksti = [loput, uusi.nosto].filter(Boolean).join(' ');
        this.typeText(lihava, eka, 'fact', () => {
          this.typeText(jatko, jatkoTeksti, 'fact', () => {
            const rivi = this.aikatauluRivi();
            if (rivi) this.factText.appendChild(rivi);
          });
        });
        // Kaiutin ja luenta vain kaupungeille, joille luenta on generoitu.
        // Ilman tätä nappi näkyi kaikilla ja tuotti hiljaisuutta.
        // Kaaren kohteilla luenta on aina: puhe-kaari-saapuminen-<id>.mp3.
        const saapumisLauta = kaariMerkinta
          ? 'kaari'
          : luentaLauta(SAAPUMISLUENNAT, saapuminen.packId, saapuminen.cityId);
        this.diaryFullUrl = saapumisLauta
          ? `assets/audio/puhe-${saapumisLauta}-saapuminen-${saapuminen.cityId}.mp3`
          : null;
        this.factKuuntele.hidden = !saapumisLauta;
        if (saapumisLauta && this.luettuSaapuminen !== luentaAvain) {
          this.luettuSaapuminen = luentaAvain;
          // Kertojan tila (yläpalkin valikko): pitkä lukee koko merkinnän,
          // lyhyt vain ensimmäisen lauseen (omistajan tarkennus — luenta
          // pysähtyy ensimmäisen virkkeen jälkeiseen hengähdykseen), ei
          // kertojaa jättää luennan aloittamatta — kaiutinnappi yliajaa
          // sen hetkellisesti.
          const tila = kertojaTila();
          if (tila === 'ei') {
            this.stopDiaryVoice();
          } else if (tila === 'lyhyt') {
            this.playDiaryVoice(this.diaryFullUrl, {
              ekaLauseeseen: true,
              osuus: eka.length / (uusi.kuvaus.length + 1 + (uusi.nosto?.length ?? 0)),
              viive: 1000,
            });
          } else {
            this.playDiaryVoice(this.diaryFullUrl, { viive: 1000 });
          }
        } else {
          this.stopDiaryVoice();
        }
        return;
      }

      const faktat = game.pack.placeFacts?.[saapuminen.cityId] ?? [];
      const isoisanIdx = faktat.findIndex((f) => factVoice(f) === 'isoisa');
      const fakta = faktat[isoisanIdx >= 0 ? isoisanIdx : 0];
      if (fakta && kaupunki) {
        const luentaAvain = `saapui:${saapuminen.packId}:${saapuminen.cityId}`;
        const key = luentaAvain + aikatauluLisa;
        if (this.factKey === key) return;
        this.uusiFactKey(key);
        this.factCard.classList.remove('vihjekortti');
        this.factVoiceEl.textContent = voiceTitle(factVoice(fakta));
        this.factPlace.textContent = kaupunki.name;
        this.factImageTitle = typeof fakta === 'string' ? null : fakta.wiki ?? null;
        this.factImage.hidden = !this.factImageTitle;
        // Vanha valokuva kaupungista pikkukuvana tekstin kylkeen.
        this.naytaFactValokuva(saapuminen.cityId, kaupunki.name);
        // Ensimmäinen lause lihavoituna, loput perään samalla koneella.
        const teksti = factText(fakta);
        const { eka, loput } = ekaLause(teksti);
        this.factText.textContent = '';
        const lihava = html('b', 'fact-lead');
        const jatko = html('span');
        this.factText.appendChild(lihava);
        this.factText.appendChild(document.createTextNode(' '));
        this.factText.appendChild(jatko);
        this.typeText(lihava, eka, 'fact', () => {
          const loppuun = () => {
            const rivi = this.aikatauluRivi();
            if (rivi) this.factText.appendChild(rivi);
          };
          if (loput) this.typeText(jatko, loput, 'fact', loppuun);
          else loppuun();
        });
        // Luenta pysähtyy ensimmäisen virkkeen jälkeiseen hengähdykseen —
        // kaiutin jatkaa samasta kohdasta. Vihjeen tai aikataulun väläys
        // ei käynnistä luentaa uudelleen samassa kaupungissa.
        const havaintoLauta = luentaLauta(HAVAINTOLUENNAT, saapuminen.packId, saapuminen.cityId);
        this.diaryFullUrl = havaintoLauta
          ? `assets/audio/puhe-${havaintoLauta}-havainto-${saapuminen.cityId}.mp3`
          : null;
        this.factKuuntele.hidden = !havaintoLauta;
        if (havaintoLauta && this.luettuSaapuminen !== luentaAvain && kertojaTila() !== 'ei') {
          this.luettuSaapuminen = luentaAvain;
          this.playDiaryVoice(this.diaryFullUrl, {
            ekaLauseeseen: true,
            // Ensimmäisen virkkeen osuus tekstistä ohjaa tauon valintaa.
            osuus: teksti.length ? eka.length / teksti.length : null,
            viive: 1000,
          });
        } else {
          this.stopDiaryVoice();
        }
        return;
      }
    }

    const player = game.player;
    const city = this.factCity(player.pos);
    const facts = game.pack.placeFacts[city.id];
    if (!facts || facts.length === 0) return;

    const pick = Math.floor(hash01(`fact:${city.id}:${game.turnCount}:${player.id}`) * facts.length);
    const fact = facts[Math.min(pick, facts.length - 1)];
    const text = factText(fact);
    const key = `${city.id}:${text}`;
    if (key === this.factKey) return;
    this.uusiFactKey(key);
    this.factKuuntele.hidden = true;
    this.naytaFactValokuva(player.pos.type === 'city' ? city.id : null, city.name);
    this.stopDiaryVoice();

    // Otsikko kertoo kumpi ääni puhuu, alarivi paikan.
    const onRoute = player.pos.type === 'edge';
      this.factCard.classList.remove('vihjekortti');
    this.factVoiceEl.textContent = voiceTitle(factVoice(fact));
    this.factPlace.textContent = onRoute ? `Matkalla — ${city.name}` : city.name;
    // Havaintoon voi liittyä kuva: pieni linkki avaa ilmiön Wikipedia-kuvan.
    this.factImageTitle = typeof fact === 'string' ? null : fact.wiki ?? null;
    this.factImage.hidden = !this.factImageTitle;
    const source = this.sourceLine(factSource(fact));
    this.typeText(this.factText, text, 'fact', () => {
      if (source) this.factText.appendChild(source);
    });

    // Uusi tieto häivähtää esiin, jotta vaihdoksen huomaa.
    this.factText.classList.remove('fact-in');
    void this.factText.offsetWidth;
    this.factText.classList.add('fact-in');
  }

  /**
   * Lähderivi vastauksen perään. Verkko-osoite näytetään linkkinä palvelimen
   * nimellä, sanallinen viite sellaisenaan. Periaate 2: väite on tarkistettavissa.
   */
  sourceLine(sources) {
    if (!sources || sources.length === 0) return null;
    const row = html('span', 'source-line');
    row.appendChild(html('span', 'source-label', 'Lähde:'));
    sources.forEach((source, i) => {
      if (i > 0) row.appendChild(html('span', '', ' · '));
      if (isSourceUrl(source)) {
        const link = html('a', '', sourceLabel(source));
        link.href = source;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        row.appendChild(link);
      } else {
        row.appendChild(html('span', '', source));
      }
    });
    return row;
  }

  /**
   * Äänimaisema seuraa matkaajaa: paikan oikea äänite jos sellainen on
   * merkitty, muuten kaupungin syntetisoitu ambienssi, tai meri kun ollaan
   * reitillä merellä. Ilman ambience-kenttää ei soiteta mitään, joten muut
   * laudat pysyvät hiljaisina kunnes ne saavat omansa.
   */
  syncAmbience() {
    const { game } = this;
    // Radiotilassa radio on ainoa ääni. Kaupungin äänimaiseman sulkee
    // radio.paalle() itse; tämä estää sen palaamisen.
    if (this.radioPaalla()) return;
    // Lennon aikana kuuluu vain moottori: kaupungin äänimaisema alkaa
    // vasta, kun pelaaja astuu ulos koneesta (kalvon sulkeva render).
    if (document.body.classList.contains('flight-active')) {
      playPlaceAmbience(null, null);
      return;
    }
    if (game.phase === 'over') {
      playPlaceAmbience(null, null);
      return;
    }
    // Etusivullakin on äänimaisema: satama ja meri odottavat lähtijää.
    // 'etusivu' ja 'merimatka' ovat virtuaalipaikkoja, joille voi valita
    // äänen studiosta kuten kaupungeille. Lauta kertoo maanosan, jonka
    // korista ääni arvotaan.
    const lauta = game.pack?.id;
    if (game.phase === 'pickstart') {
      playPlaceAmbience('etusivu', 'meri', lauta);
      return;
    }
    const pos = game.player.pos;
    if (pos.type === 'edge') {
      const edge = game.board.edgeById.get(pos.edge);
      if (edge?.type === 'sea') playPlaceAmbience('merimatka', 'meri', lauta);
      else playPlaceAmbience(null, null);
      return;
    }
    const city = game.board.cityById.get(pos.city);
    playPlaceAmbience(city?.id ?? null, city?.ambience ?? null, lauta, this.game.pack?.map?.cityCountry ?? null);
  }

  /**
   * Käynnistää määränpään äänimaiseman jo ennen saapumista (omistajan
   * toive): ristihäivytys ehtii alkaa, ja kun kertoja aloittaa sekunnin
   * kuluttua saapumisesta, tausta on ollut hetken kuuluvissa.
   *
   * Ohittaa syncAmbiencen lentolipun tarkoituksella — juuri lennon
   * lopussa tämä on ainoa tapa saada ääni liikkeelle ennen kalvon
   * sulkeutumista. Saapumisen jälkeinen syncAmbience toteaa saman
   * kaupungin eikä aloita mitään uudestaan.
   */
  ennakoiAmbienssi(pos) {
    const { game } = this;
    if (!pos || pos.type !== 'city' || game.phase === 'over') return;
    const city = game.board.cityById.get(pos.city);
    if (!city) return;
    playPlaceAmbience(city.id, city.ambience ?? null, game.pack?.id, game.pack?.map?.cityCountry ?? null);
  }

  /**
   * Kertoo moottorille, mistä laudan kaupungeista on kuratoitu valokuva
   * valokuvakysymystä varten.
   *
   * Ennen v413:a tämä latasi Wikipedian artikkelikuvia taustalla ja
   * hyväksyi kaupungin poolliin, jos kuva ylipäätään saatiin. Kuvan
   * SISÄLTÖÄ ei tarkistettu mitenkään, ja siksi paikkakysymykseen
   * päätyi Kumasin kohdalla Kofi Annanin muotokuva ja Nairobin kohdalla
   * kuva vuoden 1998 pommi-iskusta.
   *
   * Matkakirjan omat valokuvat (KAIKKI_VALOKUVAT) on valittu käsin ja
   * ne esittävät paikkaa. Ne ovat myös repossa ja peilissä, joten
   * kysymys toimii ilman verkkoa eikä latausta tarvitse odottaa.
   */
  primePhotoPool() {
    const pack = this.game.pack;
    this.photoPools ??= new Map();
    if (!this.photoPools.has(pack.id)) {
      const kuvat = new Map();
      for (const c of pack.cities) {
        if (EI_VALOKUVAKYSYMYKSEEN.has(c.id)) continue;
        const valokuva = KAIKKI_VALOKUVAT[c.id];
        /*
         * Nykykuva ensin: kysymys on "mikä paikka tämä on", ja
         * nykyvalokuva vastaa siihen suoremmin kuin isoisän ajan vedos.
         * Vanha vedos kelpaa varalle — sekin on kuva samasta paikasta.
         */
        const valittu = valokuva?.uusi?.tiedosto ? valokuva.uusi : valokuva;
        if (!valittu?.tiedosto) continue;
        kuvat.set(c.id, { tiedosto: valittu.tiedosto, lahde: valittu.lahde ?? null });
      }
      this.photoPools.set(pack.id, kuvat);
    }
    const kuvat = this.photoPools.get(pack.id);
    this.game.setPhotoPool([...kuvat.keys()], kuvat);
  }

  render() {
    this.syncAmbience();
    if (this.dead) return;
    this.primePhotoPool();
    this.onChange?.(this.game);
    // Aloituskartalla asettelu on kahdessa palstassa; pelin käynnistyttyä
    // kartta täyttää koko ruudun ja paneelit kelluvat sen päällä.
    // Katselutila käyttäytyy kuin peli olisi jo käynnissä.
    document.body.dataset.mode = this.game.phase === 'pickstart' && !this.katselu ? 'start' : 'play';
    // Matkavalinnan toinen vaihe koskee vain käsillä olevaa valintaa: heti
    // kun vaihe vaihtuu, ollaan taas seuraavan vuoron ensimmäisessä vaiheessa.
    if (this.game.phase !== 'action') this.travelExpanded = false;
    // Saapumiskortti kuuluu vain offer-vaiheeseen: botin vuorolla ja muissa
    // vaiheissa se suljetaan, jottei se jää roikkumaan kartan päälle.
    if (this.game.phase !== 'offer' || this.game.player.isBot) this.closeArrival();
    this.renderIntro();
    this.stampPassport();
    // Vuorossa oleva pelaaja voi olla eri laudalla kuin edellinen.
    if (this.game.pack.id !== this.drawnPackId) this.drawBoardFor(this.game.pack);
    // Zoomiportaan päät ja näkyvyys tarkistetaan joka piirrossa: vaihe
    // vaihtuu, lauta vaihtuu ja automaattinen saapumiszoom muuttaa tasoa.
    this.paivitaZoomiNapit();
    this.drawCountryBorders();
    /*
     * Vertailutilan maakerros piirretään joka piirrossa uudestaan
     * kuten muutkin kerrokset: kartta rakennetaan kokonaan uusiksi kun
     * lauta vaihtuu (drawBoardFor), ja ilman tätä kerros jäisi vanhan
     * puun mukana pois — kaupungit palaisivat kartalle kesken
     * vertailun.
     */
    if (this.vertailuPaalla()) {
      this.piirraVertailuMaat();
      this.rakennaVertailuPalkki();
    }
    this.drawTokens();
    this.drawTargets();
    this.drawPawns();
    this.renderTurnPill();
    this.renderActions();
    this.renderFact();
    this.renderQuiz();
    // Linssit tahdistetaan joka piirrossa, mutta työ tehdään vasta kun
    // jokin oikeasti muuttui: uusi löytö, uusi lauta tai uusi kerros.
    void this.paivitaLinssit();

    if (this.game.phase === 'over') {
      this.showWinner();
      return;
    }
    this.scheduleBot();
  }

  /**
   * Vihreä passi saa leiman jokaisesta laudasta, jolla matkaaja on käynyt.
   * Leimat säilyvät pelikertojen yli, joten aloitusnäkymässä ei leimata:
   * lauta on vasta valitsematta.
   */
  stampPassport() {
    const { game } = this;
    if (game.phase === 'pickstart') return;
    if (stampBoard(game.pack.id, game.pack.boardLabel)) {
      // Ei ilmoitusta kartan päälle: uusi leima näkyy vain pienenä
      // laukun elävöitymisenä ja paperin rapinana (omistajan toive).
      sfx.play('paper');
      this.elavoitaLaukku();
    }

    // Kunniamerkintä: isoisän ennätys rikottiin tällä laudalla. Sekin on
    // passissa eikä pelitallenteessa, joten se jää talteen uusiin peleihin.
    const mark = game.recordMark;
    if (mark && stampBoard(`kunnia:${mark.packId}`, `${game.pack.boardLabel} — ${mark.label}`)) {
      const box = this.buildToast({
        kind: 'stamp',
        icon: 'mitali',
        text: mark.label,
        sub: `Aarre löytyi päivänä ${mark.day}`,
      });
      sfx.play('paper');
      this.elavoitaLaukku();
      setTimeout(() => this.removeToast(box), TOAST_MS.default);
    }
  }

  /*
   * Selain säilyttää dialogikortin vierityskohdan sulkemisen yli ja
   * palauttaa sen showModalissa. Suljettu dialogi on display:none —
   * ennen avaamista tehty scrollTop-nollaus valuu siksi hukkaan, ja
   * lehti tai popup aukesi edellisen käynnin kohdasta (omistajan
   * havainto 9.8.2026). Nollaus tehdään siksi aina showModalin JÄLKEEN.
   */
  nollaaDialoginVieritys(dialogi) {
    for (const kortti of dialogi.querySelectorAll('.dialog-card')) kortti.scrollTop = 0;
  }

  /**
   * Saapumiskortti: kaupungin matkatarina keskellä ruutua ja sen lopussa
   * valinta, avataanko aarre. Kieltävä vastaus päättää vuoron, jolloin
   * seuraava nopanheitto alkaa tavalliseen tapaan.
   */
  openArrival(city) {
    if (this.arrivalShownFor === city.id && this.arrivalDialog.open) return;
    this.arrivalShownFor = city.id;
    // Matkakirjan luenta tauolle Tutki-näkymän ajaksi: se jatkaa samasta
    // kohdasta, kun pelaaja palaa karttanäkymään (omistajan toive).
    if (this.diaryVoice && !this.diaryVoice.paused) {
      this.diaryVoice.pause();
      this.luentaTauolla = this.diaryVoice;
    }

    // Kortissa on kuva, parin lauseen esittely ja päätös. Esittely tulee
    // Wikipedian tiivistelmästä; kunnes haku valmistuu — tai jos paikalla
    // ei ole artikkelia — kortissa lukee isoisän vakiorivi.
    this.arrivalCity.textContent = city.name;
    // Kohtaamiskaupungissa nappi kutsuu hahmon luo, ei kätkön:
    // aarretehtävä aukeaa tarinallisen kohtaamisen kautta.
    document.getElementById('arrival-yes').textContent = KOHTAAMISET[city.id]?.nappi ?? 'Etsi kätkö';
    this.arrivalImage.hidden = true;
    this.arrivalImage.removeAttribute('src');
    this.arrivalKuvakotelo.hidden = true;
    this.arrivalKuvat = [];
    this.arrivalKuvaKohdalla = 0;
    this.paivitaKuvaLaskuri();
    // Maalehti piilottaa esittelyrivin (ks. avaaMaalehti); kaupunkiin
    // palattaessa se on palautettava, tai se jäisi piiloon lopullisesti.
    this.arrivalIntro.hidden = false;
    this.arrivalIntro.textContent = 'Isoisä on merkinnyt tämän paikan karttaansa.';
    this.arrivalWiki.hidden = true;
    // Oma lyhytnosto (pilottikaupungit) näkyy heti ja toimii ilman
    // verkkoa; Lue lisää avaa oman artikkelin, joten nappi voi näkyä heti.
    // Avain on wiki-otsikko, mutta useimmilla kaupungeilla se on sama
    // kuin nimi. Ilman varasuunnitelmaa oma nosto katosi hiljaa
    // kaupungeilta, joilta wiki-kenttä puuttui.
    const omaIntro = ARTIKKELIT[city.wiki ?? city.name]?.intro;
    if (omaIntro) {
      this.arrivalIntro.textContent = omaIntro;
      this.arrivalWiki.hidden = false;
    }

    // Maan tiedot kaupungin rinnalla (omistajan toive): nimi näkyy heti,
    // parin lauseen esittely täyttyy kun haku ehtii. Laudoilla, joilla
    // kaupunki→maa-kytkentää ei ole, lohko pysyy piilossa.
    const iso = this.game.pack.map?.cityCountry?.[city.id];
    const maa = iso ? this.game.pack.map?.countryShapes?.[iso] : null;
    this.arrivalMaaTiedot = maa ?? null;
    this.arrivalMaa.hidden = !maa;
    this.arrivalMaaWiki.hidden = true;
    if (maa) {
      this.arrivalMaaNimi.textContent = maa.nimi;
      this.arrivalMaaIntro.textContent = '';
      // Lippu suht pienenä nimen vieressä; puuttuva verkko piilottaa sen.
      this.arrivalMaaLippu.hidden = true;
      if (maa.lippu) {
        this.arrivalMaaLippu.alt = `${maa.nimi} — lippu`;
        asetaKuva(this.arrivalMaaLippu, lippuUrl(maa.lippu, 96), lippuVara(maa.lippu, 96));
      } else {
        this.arrivalMaaLippu.removeAttribute('src');
      }
      // Minikartta pelin omasta rajadatasta — toimii myös ilman verkkoa.
      this.arrivalMaaKartta.textContent = '';
      const kartta = this.piirraMaakartta(iso, city.id);
      if (kartta) this.arrivalMaaKartta.appendChild(kartta);
      // Tunnusluvut ja tervehdykset kartan alle (pilottimaat).
      this.naytaMaaTunnusluvut(iso);
      this.naytaMaaUutiset(iso, city.id);
      // Mediarivit rakennetaan joka kaupungille uudestaan.
      this.mediaKaupunki = city;
      this.mediaIso = iso;
      this.paivitaMediarivit();
      // Oma lyhytnosto maasta (pilottimaat) näkyy heti ja voittaa wikin
      // automaattikatkelman; Lue lisää avaa oman artikkelin.
      //
      // Kun kaupunki ja maa ovat sama paikka (Islanti, samoin kuin
      // St. Helena Afrikassa), sama teksti osuisi kortille kahdesti
      // vierekkäin. Silloin maapalstan esittely jätetään pois — kartta,
      // tunnusluvut ja tervehdykset kertovat maasta jo omansa.
      const maanAvain = maa.wiki ?? maa.nimi;
      const omaMaaIntro = maanAvain === (city.wiki ?? city.name)
        ? null
        : ARTIKKELIT[maanAvain]?.intro;
      if (omaMaaIntro) {
        this.arrivalMaaIntro.textContent = omaMaaIntro;
        this.arrivalMaaWiki.hidden = false;
      }
      // Sama poikkeus kuin yllä: samasta artikkelista ei haeta katkelmaa
      // maapalstalle, jos kaupunkipalsta näyttää sen jo.
      if (maanAvain !== (city.wiki ?? city.name)) {
        cachedSummary(maanAvain).then((summary) => {
          if (!this.arrivalDialog.open || this.arrivalShownFor !== city.id) return;
          if (!summary?.extract) return;
          if (!omaMaaIntro) this.arrivalMaaIntro.textContent = shortIntro(summary.extract);
          // Lehdessä ei ole Lue lisää -nappia (ks. rakennaSivut).
          if (!this.tutkiLehti) this.arrivalMaaWiki.hidden = false;
        });
      }
    }

    // Kaupungin elämää: taide-, ruoka- ja musiikkinostot ja niihin
    // liittyvä tutustu ja vastaa -kysymys (pilottikaupungit).
    this.naytaKulttuuri(city);
    this.rakennaSivut(city.id);
    this.esilataaKaupunki(city);

    // Sanomalehtiarkki: koko ruudun korkuinen painopaperi, kartta jää
    // sumeana laidoille. (Käsinpiirretty aaltoreuna poistui v299:ssä —
    // omistajan päätös: pohja sanomalehden tyyliin kaikissa
    // kaupungeissa, suora leikattu reuna.)
    this.arrivalDialog.classList.add('arkki');
    if (!this.arrivalDialog.open) this.arrivalDialog.showModal();
    this.nollaaDialoginVieritys(this.arrivalDialog);
    const arkki = this.arrivalDialog.querySelector('.dialog-card');
    // Sivujen selaus pyyhkäisyllä ja nuolinäppäimillä.
    if (arkki) this.kytkeTutkiSelaus(arkki);
    if (!city.wiki) return;

    Promise.all([cachedSummary(city.wiki), cachedImage(city.wiki)]).then(([summary, image]) => {
      // Pelaaja on voinut ehtiä jatkaa matkaa haun aikana.
      if (!this.arrivalDialog.open || this.arrivalShownFor !== city.id) return;
      if (!summary) return;
      // Lehtikaupungilla on omat kuvat ja riittävä teksti — wikin
      // karuselli ja Lue lisää eivät saa ponnahtaa haun valmistuttua.
      if (this.tutkiLehti) return;
      if (image) {
        this.arrivalImage.src = image;
        this.arrivalImage.alt = summary.title || city.name;
        this.arrivalImage.hidden = false;
        this.arrivalKuvakotelo.hidden = false;
        // Galleria taustalla: kun lista on saatu, pikkukuvaan tulevat
        // hento laskuri ja selailunuolet.
        cachedGallery(city.wiki).then((lista) => {
          if (this.arrivalShownFor !== city.id || lista.length < 2) return;
          this.arrivalKuvat = lista;
          this.arrivalKuvaKohdalla = Math.max(0, lista.findIndex((k) => k.src === image));
          this.paivitaKuvaLaskuri();
        });
      }
      // Oma lyhytnosto voittaa wikin automaattikatkelman (pilottikaupungit).
      if (summary.extract && !omaIntro) this.arrivalIntro.textContent = shortIntro(summary.extract);
      this.arrivalWiki.hidden = false;
    });
  }

  /**
   * Hakee kaupungin kuvat ja ääninäytteet valmiiksi selaimen välimuistiin
   * heti saapuessa (omistajan toive): kuvakarusellin selaaminen ja
   * Kuuntele näyte -nappi toimivat silloin heti eivätkä odota latausta.
   *
   * Kaikki menee selaimen omaan välimuistiin, joten varsinainen näyttö
   * käyttää samoja osoitteita eikä lataa mitään toiseen kertaan. Haut
   * porrastetaan, ettei saapumishetki tuki yhteyttä juuri silloin kun
   * kortti piirtyy ja kertoja alkaa puhua.
   *
   * Esilataus on pelkkää nopeutta: jos se epäonnistuu, kaikki toimii
   * kuten ennenkin. Siksi virheet niellään hiljaa.
   */
  esilataaKaupunki(city) {
    if (!city || this.esilatattu === city.id) return;
    this.esilatattu = city.id;
    const kuvat = [];
    const aanet = [];

    // Kulttuurinostojen kuvat ja ääninäytteet. Kuvat ovat lazy-tilassa
    // eivätkä lataudu ennen kuin lohko avataan; ääninäyte alkaisi ladata
    // vasta napin painalluksesta.
    const kulttuuri = (KULTTUURIT[this.game.pack.id] ?? {})[city.id];
    // Kategoriakaupungissa litteät nostot eivät piirry, joten niiden
    // kuvia ei esiladata — ensimmäisen aiheen kuvat renderöityvät heti
    // avattaessa eivätkä nekään tarvitse erillistä esilatausta.
    if (!(KULTTUURI_KATEGORIAT[city.id] ?? []).length) {
      for (const nosto of kulttuuri?.nostot ?? []) {
        if (nosto.tiedosto) kuvat.push(valokuvaUrl(nosto.tiedosto, 640));
        if (nosto.aani) aanet.push(aaniOsoite(jaaAlku(nosto.aani).url));
      }
    }
    // Silloin ja nyt -valokuvapari.
    const valokuva = (VALOKUVAT[this.game.pack.id] ?? {})[city.id];
    // `uusi` on oma merkintänsä selitteineen, ei pelkkä tiedostonimi.
    if (valokuva?.tiedosto) kuvat.push(valokuvaUrl(valokuva.tiedosto, 640));
    if (valokuva?.uusi?.tiedosto) kuvat.push(valokuvaUrl(valokuva.uusi.tiedosto, 640));

    // Wikipedian kuvagalleria: juuri sitä pelaaja selaa nuolilla.
    if (city.wiki) {
      cachedGallery(city.wiki).then((lista) => {
        if (this.esilatattu !== city.id) return;
        this.esilataaOsoitteet(lista.map((k) => k.src), city.id);
      }).catch(() => { /* galleriaa ei saatu — selaus toimii silti */ });
    }

    this.esilataaOsoitteet(kuvat, city.id);
    for (const url of aanet) {
      if (!url) continue;
      const audio = new Audio(url);
      audio.preload = 'auto';
      // Elementti pidetään hengissä latauksen ajan; selain säilyttää
      // tavut omassa välimuistissaan senkin jälkeen.
      (this.esiladatutAanet ??= []).push(audio);
      audio.addEventListener('error', () => { /* soitto hoitaa varareitin */ });
    }
    if ((this.esiladatutAanet?.length ?? 0) > 6) this.esiladatutAanet.splice(0, 3);
  }

  /** Lataa kuvat taustalla muutama kerrallaan, jottei yhteys tuki. */
  esilataaOsoitteet(osoitteet, cityId, kerralla = 3) {
    const jono = osoitteet.filter(Boolean);
    const seuraava = () => {
      if (this.dead || this.esilatattu !== cityId) return;
      const url = jono.shift();
      if (!url) return;
      const kuva = new Image();
      kuva.addEventListener('load', seuraava, { once: true });
      kuva.addEventListener('error', seuraava, { once: true });
      kuva.src = url;
    };
    for (let i = 0; i < kerralla; i += 1) seuraava();
  }

  /**
   * Maan tunnusluvut ja tervehdykset kartan alle (pilottimaat, omistajan
   * toive): väkiluku, pinta-ala, demokratiaindeksi (V-Dem — klikkaus
   * avaa maan kuvaajan Our World in Datassa) ja keskitulo pieninä
   * symboliriveinä; alla "hyvää päivää" maan merkittävillä kielillä ja
   * kunkin perässä kielen maan pikkulippu.
   */
  naytaMaaTunnusluvut(iso) {
    const tiedot = (MAATIEDOT[this.game.pack.id] ?? {})[iso] ?? null;
    this.arrivalMaaTunnusluvut.hidden = !tiedot;
    this.arrivalMaaTervehdykset.hidden = !tiedot?.tervehdykset?.length;
    this.arrivalMaaTunnusluvut.textContent = '';
    this.arrivalMaaTervehdykset.textContent = '';
    if (!tiedot) return;
    const IKONIT = {
      vaki: '<circle cx="7.3" cy="4.1" r="2.7"/><path d="M2 13.4c.7-3.4 2.7-5.1 5.3-5.1s4.6 1.7 5.3 5.1"/>',
      ala: '<rect x="1" y="1" width="12.6" height="12.6" rx="1.8"/><path d="M1 9.4l3.4-3 2.6 2.2 3.2-3.6 3.4 2.6"/>',
      vaaka: '<path d="M7.3 1.8v11.4M3.6 13.2h7.4M2.4 4.2h9.8"/><path d="M2.4 4.2 1 7.9a2.2 2.2 0 0 0 2.8 0zM12.2 4.2l-1.4 3.7a2.2 2.2 0 0 0 2.8 0z"/>',
      raha: '<circle cx="7.3" cy="7.5" r="5.9"/><path d="M7.3 4.3v6.4M5.5 6.2c0-.9.8-1.6 1.8-1.6s1.8.65 1.8 1.5c0 1.9-3.6 1.05-3.6 2.95 0 .85.8 1.5 1.8 1.5s1.8-.7 1.8-1.6"/>',
    };
    // Kaksi riviä (omistajan toive): väkiluku ja pinta-ala ylhäällä,
    // demokratia ja tulot alempana sijoituksineen.
    const rivi1 = html('div', 'maa-tunnusrivi');
    const rivi2 = html('div', 'maa-tunnusrivi');
    // Tulot heti V-Demin alla ilman väliä (omistajan toive) — väli on
    // vasta tulojen jälkeen ennen tervehdyksiä.
    const rivi3 = html('div', 'maa-tunnusrivi tiivis');
    this.arrivalMaaTunnusluvut.appendChild(rivi1);
    this.arrivalMaaTunnusluvut.appendChild(rivi2);
    this.arrivalMaaTunnusluvut.appendChild(rivi3);
    const kohta = (emo, ikoni, sisalto, seloste) => {
      const osa = html('span', 'maa-tunnus');
      osa.title = seloste;
      const kuvake = html('span', 'maa-tunnus-ikoni');
      kuvake.innerHTML = `<svg viewBox="0 0 15 15" aria-hidden="true">${IKONIT[ikoni]}</svg>`;
      osa.appendChild(kuvake);
      for (const pala of [].concat(sisalto)) {
        osa.appendChild(typeof pala === 'string' ? document.createTextNode(pala) : pala);
      }
      emo.appendChild(osa);
      return osa;
    };
    // Todella pieni vakiomittainen palkki samalla rivillä (omistajan
    // tarkennus): täyttyvä osa on toteutuva osuus maksimista, ja väri
    // kertoo tason — punainen jos vähän, keltainen keskivaiheilla,
    // vihreä jos hyvällä mallilla.
    const palkki = (osa, osuus) => {
      const pohja = html('span', 'maa-palkki');
      const tayte = html('span', 'maa-palkki-tayte');
      const rajattu = Math.min(1, Math.max(0.03, osuus));
      tayte.style.width = `${Math.round(rajattu * 100)}%`;
      tayte.style.background = osuus < 1 / 3 ? '#bf3d2d' : osuus < 2 / 3 ? '#d9a41f' : '#3e8f4a';
      pohja.appendChild(tayte);
      osa.appendChild(pohja);
    };
    // Suluissa sijoitus maailmassa (omistajan toive).
    const sija = (arvo) => (arvo ? html('span', 'maa-sija', ` (${arvo})`) : '');
    kohta(rivi1, 'vaki', [tiedot.vakiluku, sija(tiedot.vakilukuSija)],
      'Väkiluku, suluissa sijoitus maailmassa');
    kohta(rivi1, 'ala', [tiedot.pintaAla, sija(tiedot.pintaAlaSija)],
      'Pinta-ala, suluissa sijoitus maailmassa');
    if (tiedot.demokratia) {
      // Klikkaus avaa ensin pienen infoikkunan, joka selittää miksi
      // maan luku on se mikä on — varsinainen kuvaajalinkki on siellä
      // (omistajan toive).
      const nappi = html('button', 'maa-demokratia', `${tiedot.demokratia.arvo} · V-Dem`);
      nappi.type = 'button';
      nappi.addEventListener('click', () => this.naytaVdemInfo(tiedot.demokratia));
      const osa = kohta(rivi2, 'vaaka', [nappi, sija(tiedot.demokratia.sija)],
        'Demokratiaindeksi (V-Dem, 0–1), suluissa sijoitus maailmassa — avaa selityksen');
      // Indeksin maksimi on 1.
      const arvo = parseFloat(tiedot.demokratia.arvo.replace(',', '.'));
      if (Number.isFinite(arvo)) palkki(osa, arvo);
    }
    if (tiedot.keskitulo) {
      const osa = kohta(rivi3, 'raha', [tiedot.keskitulo.arvo, sija(tiedot.keskitulo.sija)],
        'Bruttokansantulo asukasta kohden vuodessa, suluissa sijoitus maailmassa');
      // Maksimina maailman kärkitulo (noin 100 000 $/v).
      const tulo = parseInt(tiedot.keskitulo.arvo.replace(/[^0-9]/g, ''), 10);
      if (Number.isFinite(tulo)) palkki(osa, tulo / 100000);
    }
    for (const t of tiedot.tervehdykset ?? []) {
      const osa = html('span', 'tervehdys');
      osa.title = `"Hyvää päivää" — ${t.kieli}${t.osuus ? `, noin ${t.osuus} puhuu` : ''}`;
      osa.appendChild(document.createTextNode(`${t.teksti} `));
      // Lippu voi puuttua tarkoituksella. Vähemmistökielen merkitseminen
      // naapurivaltion lipulla liittäisi puhujat toiseen maahan, vaikka
      // he ovat oman maansa kansalaisia — ja niissä maissa, joihin se
      // valtio on hyökännyt tai jotka se on miehittänyt, se olisi
      // suorastaan väärin (omistajan päätös). Silloin rivillä on pelkkä
      // tervehdys ja kielen nimi.
      if (t.lippu) {
        const lippu = document.createElement('img');
        lippu.alt = t.kieli;
        // Ei loading="lazy": liput ovat repossa ja pikkuruisia, ja laiska
        // lataus jätti ne dialogin sisällä toisinaan kokonaan lataamatta.
        // Poisto vasta kun kumpikin osoite on pettänyt — oma virhekuuntelija
        // olisi vienyt lipun jo peilin ensimmäisestä virheestä.
        asetaKuva(lippu, lippuUrl(t.lippu, 40), lippuVara(t.lippu, 40), () => lippu.remove());
        osa.appendChild(lippu);
      }
      // Karkea puhujaosuus kielen perässä (omistajan kokeilu).
      if (t.osuus) osa.appendChild(html('span', 'maa-sija', ` ${t.osuus}`));
      this.arrivalMaaTervehdykset.appendChild(osa);
    }
  }

  /**
   * Kuuntele kieltä: kaupungissa nauhoitettu näyte, jossa ihmiset
   * puhuvat (omistajan toive). Nappi on tervehdysrivin perässä, koska
   * teksti kertoo mitä sanotaan ja näyte miltä se kuulostaa.
   *
   * Näyte on eri asia kuin kaupungin taustaääni: se soi kerran
   * painalluksesta, joten selvä puhe on siinä vahvuus eikä toistuva
   * häiriö. Tausta väistyy näytteen ajaksi kuten kulttuurinostoissa.
   */
  /**
   * Mediarivit molempiin lehtiin (omistajan toive 8.8.2026: "radio- ja
   * videonapit näkyviin kumpaankin lehteen").
   *
   * Ennen rivejä oli yksi ja se asui maaosastossa. Kun maaosasto
   * siirtyi karttamaissa omalle sivulleen, radio ja tv lähtivät
   * kaupunkilehdestä mukana — pelaaja oli juuri saapunut paikkaan,
   * mutta paikallisradio löytyi vain toisesta lehdestä.
   *
   * Nyt rivejä on kaksi. Kaupunkilehden rivi on aina, ja maaosaston
   * rivi vain silloin kun osasto on OMALLA sivullaan: jos se on
   * kaupungin etusivun palstassa (maat ilman korkokarttaa), samat
   * napit näkyisivät kahdesti samassa näkymässä.
   */
  paivitaMediarivit() {
    const city = this.mediaKaupunki;
    const iso = this.mediaIso;
    for (const kohde of [this.arrivalMedia, this.arrivalMediaKaupunki]) {
      if (!kohde) continue;
      kohde.replaceChildren();
      kohde.hidden = true;
    }
    if (city && this.arrivalMediaKaupunki) {
      this.naytaKieliNappi(city, this.arrivalMediaKaupunki);
    }
    // Maaosaston rivi vain, kun osasto ei ole kaupungin etusivulla.
    if (!(this.tutkiMaaEtusivu || this.tutkiTila === 'maa')) return;
    /*
     * Maalehden voi avata mistä tahansa maasta (Maiden tiedot), eikä
     * se silloin ole se maa, jossa pelaaja seisoo. Radio on maan oma ja
     * seuraa lehteä, mutta kaupungissa nauhoitettu kielinäyte EI kuulu
     * vieraan maan lehteen — se olisi väärästä paikasta. Siksi kaupunki
     * annetaan vain oman maan lehdelle.
     */
    const maanIso = this.tutkiTila === 'maa' ? (this.tutkiMaaLehti ?? iso) : iso;
    this.naytaKieliNappi(maanIso === iso ? city : null, this.arrivalMedia, maanIso);
  }

  naytaKieliNappi(city, kohde = this.arrivalMedia, iso = null) {
    const nayte = city ? (KIELET[this.game.pack.id] ?? {})[city.id] : null;
    /*
     * Suora lähetys ensin, äänite varalle (omistajan järjestys).
     * Äänitettä ei poistettu: lähetysosoitteet lakkaavat toimimasta
     * ilman varoitusta, ja silloin nappi soittaa nauhan sen sijaan
     * että jäisi hiljaiseksi.
     */
    const maa = iso ?? (city ? this.game.pack.map?.cityCountry?.[city.id] : null);
    const radio = radioMaalle(maa);
    if (!radio && !nayte?.url) return;
    kohde.hidden = false;
    /*
     * Napissa lukee aseman nimi, ei "Kuuntele kieltä" (omistajan
     * toive). Nimi on se, mikä tekee napista houkuttelevan: "TRT
     * Radyo 1" kertoo että toisessa päässä on oikea asema, kun taas
     * yleisnimike voisi olla mitä tahansa nauhaa.
     *
     * Merkki vuorottelee soita/pysäytä-kuvakkeiden välillä, ja
     * suoralle lähetykselle näkyy punainen piste. Piste EI ole
     * koriste vaan tieto: jos suora katkeaa ja soitin putoaa
     * nauhoitettuun näytteeseen, piste sammuu — muuten se väittäisi
     * suoraa lähetystä nauhasta.
     */
    const nappi = html('button', 'kulttuuri-kuuntele kieli-kuuntele');
    nappi.type = 'button';
    const nimi = radio ? radio.asema : (nayte.nimi ?? 'Kaupungissa nauhoitettu näyte');
    nappi.title = radio ? `${nimi} — suora lähetys` : nimi;
    nappi.innerHTML = `${MERKKI_SOITA}<span>${suojaa(nimi)}</span>`
      + (radio ? '<span class="live" title="suora lähetys">live</span>' : '')
      + '<span class="aika" hidden></span>';
    // Sama soitin kuin kulttuurinostojen näytteillä: peilin varareitti,
    // taustan väistö ja aikanäyttö tulevat siitä valmiina.
    nappi.addEventListener('click', () => this.kulttuuriAaniNapista({
      aani: radio ? radio.url : nayte.url,
      vara: radio ? (nayte?.url ?? null) : null,
      otsikko: nimi,
      suora: Boolean(radio),
    }, nappi));
    kohde.appendChild(nappi);
  }

  /**
   * Pieni infoikkuna V-Dem-luvusta (omistajan toive): maakohtainen
   * selitys siitä, miksi luku on se mikä on, lyhyt kuvaus V-Demistä ja
   * vasta niiden alla varsinainen linkki maan kuvaajaan.
   */
  naytaVdemInfo(demokratia) {
    const emo = this.arrivalDialog.open ? this.arrivalDialog : document.body;
    const kerros = html('div', 'vdem-info');
    const kortti = html('div', 'vdem-kortti');
    const maaNimi = this.arrivalMaaNimi?.textContent || '';
    kortti.appendChild(html('h3', 'vdem-otsikko', `Demokratia — ${maaNimi}`));
    kortti.appendChild(html('p', 'vdem-arvo',
      `V-Dem-indeksi ${demokratia.arvo}` + (demokratia.sija ? ` · sija ${demokratia.sija} maailmassa` : '')));
    if (demokratia.selitys) {
      kortti.appendChild(html('p', 'vdem-selitys', demokratia.selitys));
    }
    kortti.appendChild(html('p', 'vdem-yleis',
      'V-Dem (Varieties of Democracy) on Göteborgin yliopiston tutkimus'
      + 'laitos, jonka liberaalin demokratian indeksi (0–1) mittaa vaalien '
      + 'vapautta, kansalaisoikeuksia ja vallankäytön valvontaa. Luku on '
      + 'satojen tutkijoiden arvioiden yhdistelmä.'));
    const linkki = html('a', 'vdem-linkki', 'Avaa maan kuvaaja — Our World in Data');
    linkki.href = demokratia.linkki;
    linkki.target = '_blank';
    linkki.rel = 'noopener noreferrer';
    kortti.appendChild(linkki);
    kerros.appendChild(kortti);
    // Napautus kortin ulkopuolelle sulkee.
    kerros.addEventListener('click', (e) => {
      if (e.target === kerros) kerros.remove();
    });
    const sulje = html('button', 'vdem-sulje', '✕');
    sulje.type = 'button';
    sulje.addEventListener('click', () => kerros.remove());
    kortti.appendChild(sulje);
    emo.appendChild(kerros);
  }

  /**
   * Kaupungin elämää -lohko: nostot (kuva, teksti tai linkki lähteineen)
   * ja niiden perässä tutustu ja vastaa -kysymys. Oikeasta vastauksesta
   * pieni palkkio kerran per kaupunki — väärästä ei rangaista, mutta
   * uutta yritystä ei saa.
   */
  /*
   * Kulttuurinostot annettuun kohteeseen.
   *
   * Erotettu omaksi metodikseen, koska nostoja piirretään nyt kahdesta
   * paikasta: Tutki-ikkunan liuskoilta ja (siirtymän ajan) muualta.
   * Kaksi kopiota samasta piirrosta ajautuisi erilleen ensimmäisellä
   * muutoksella — ja juuri musiikkilinkit ja ääninäytteet ovat se osa,
   * jota muutetaan useimmin.
   */
  piirraKulttuuriNostot(lista, nostot) {
    lista.textContent = '';
    // Nostot tulevat parametrina. Tässä luki aiemmin `tiedot.nostot`,
    // joka jäi metodia irrotettaessa osoittamaan kutsuvan funktion
    // muuttujaan: metodin omassa näkyvyysalueessa sellaista ei ole,
    // joten jokainen kutsu heitti ReferenceErrorin ja Tutki-ikkunan
    // liuska jäi tyhjäksi.
    for (const nosto of nostot ?? []) {
      const lohko = html('div', 'kulttuuri-nosto');
      // Otsikko ja mahdollinen ääninäyte samalla rivillä: selkeä nappi
      // kaiutinkuvakkeella erottuu tekstilinkeistä (omistajan toive).
      const otsikkoRivi = html('div', 'kulttuuri-otsikkorivi');
      otsikkoRivi.appendChild(html('p', 'kulttuuri-otsikko', nosto.otsikko));
      // Ääninäyte, Apple Music ja ilmainen musiikkinäyte — yhteinen
      // toteutus kategorianostojen kanssa (lisaaNostonNapit).
      this.lisaaNostonNapit(otsikkoRivi, nosto);
      lohko.appendChild(otsikkoRivi);
      if (nosto.tyyppi === 'kuva' && nosto.tiedosto) {
        const kuva = document.createElement('img');
        /*
         * EI loading="lazy". Kuva säilyttää mittasuhteensa (width: auto),
         * jolloin sen laatikko on ennen latausta nollan kokoinen — eikä
         * WebKit lataa nollan kokoista laiskaa kuvaa koskaan. iPhonella
         * nostot jäivät kokonaan ilman kuvaa. Nämä kuvat esiladataan jo
         * saapuessa, joten laiskuus ei säästänyt mitään.
         */
        // Napautus avaa kuvan isompana (omistajan toive).
        kuva.classList.add('kulttuuri-kuva-nappi');
        this.varustaNostonKuva(kuva, nosto, 640);
        lohko.appendChild(kuva);
      }
      lohko.appendChild(html('p', 'arrival-intro', nosto.teksti));
      if (nosto.wiki) {
        const nappi = html('button', 'wiki-btn', 'Lue lisää aiheesta');
        nappi.type = 'button';
        nappi.addEventListener('click', () => this.openWikiArticle(nosto.wiki, nosto.otsikko));
        lohko.appendChild(nappi);
      }
      this.lisaaNostonLinkki(lohko, nosto);
      const lahteet = [nosto.lahde, nosto.aaniLahde].filter(Boolean).join(' · ');
      if (lahteet) lohko.appendChild(html('p', 'kulttuuri-lahde', lahteet));
      lista.appendChild(lohko);
    }

  }

  naytaKulttuuri(city) {
    const tiedot = (KULTTUURIT[this.game.pack.id] ?? {})[city.id] ?? null;
    this.arrivalKulttuuri.hidden = !tiedot;
    this.arrivalKulttuuri.open = false;
    // Lehden etusivu näyttää visan; naytaTutkiSivu tarvitsee tiedon
    // siitä, onko sitä ylipäätään olemassa.
    this.kulttuuriSaatavilla = Boolean(tiedot);
    if (!tiedot) return;
    /*
     * Nostot EIVÄT ole enää saapumiskortissa vaan Tutki-ikkunassa
     * (omistajan toive: "nyt kun tutki ikkunaan tulee lisää, sinne
     * voisi lisätä myös nostoja enemmän").
     *
     * Saapumiskortti on saapumisen hetki: lyhyt, ja se tarjoaa
     * valinnan. Tutki-ikkuna on se, jonka pelaaja on itse valinnut
     * avata, ja syventävä sisältö kuuluu sinne.
     *
     * Kulttuurivisa jää tänne, koska se on pelitoiminto eikä
     * luettavaa: siitä saa puntia, ja se kuuluu samaan hetkeen kuin
     * "Etsi kätkö".
     */
    this.arrivalKulttuuriLista.textContent = '';

    const { kysymys } = tiedot;
    this.arrivalKulttuuriVisa.hidden = !kysymys;
    this.arrivalKulttuuriTulos.hidden = true;
    this.arrivalKulttuuriTulos.className = 'arrival-intro';
    this.arrivalKulttuuriVaihtoehdot.textContent = '';
    if (!kysymys) return;
    const vastattu = this.game.kulttuuriVastatut?.has(`${this.game.pack.id}:${city.id}`);
    this.arrivalKulttuuriKysymys.textContent = vastattu
      ? 'Kulttuurivisaan on jo vastattu tässä kaupungissa.'
      : `Tutustuitko? ${kysymys.q}`;
    // Visa näkyy heti ilman avausnappia (omistajan toive 5.8.2026:
    // "saisi näkyä heti ilman klikkausta").
    this.arrivalKulttuuriKysymys.hidden = false;
    this.arrivalKulttuuriVaihtoehdot.hidden = vastattu;
    if (vastattu) return;
    kysymys.options.forEach((vaihtoehto, i) => {
      const nappi = html('button', '', vaihtoehto);
      nappi.type = 'button';
      nappi.addEventListener('click', () => {
        const oikein = i === kysymys.correct;
        const vastaus = this.game.actionKulttuuri(city.id, oikein, KULTTUURI_PALKKIO);
        this.arrivalKulttuuriVaihtoehdot.textContent = '';
        this.arrivalKulttuuriKysymys.textContent = kysymys.q;
        this.arrivalKulttuuriTulos.hidden = false;
        // Hiljaista polkua ei ole: myös jo vastattu kysymys saa näkyvän
        // vastauksen (omistajan havainto — palaute ei saa jäädä arvailuksi).
        if (!vastaus.ok) {
          this.arrivalKulttuuriTulos.className = 'kulttuuri-tulos';
          this.arrivalKulttuuriTulos.textContent = 'Kysymykseen on jo vastattu tässä kaupungissa.';
          return;
        }
        this.arrivalKulttuuriTulos.className = oikein
          ? 'kulttuuri-tulos oikein-tulos'
          : 'kulttuuri-tulos vaarin-tulos';
        this.arrivalKulttuuriTulos.textContent = (oikein
          ? `Oikein! +${KULTTUURI_PALKKIO} puntaa. `
          : `Oikea vastaus: ${kysymys.options[kysymys.correct]}. `) + (kysymys.fact ?? '');
        // Palaute vieritetään näkyviin — kysymys elää dialogin alalaidassa.
        this.arrivalKulttuuriTulos.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        sfx.play(oikein ? 'correct' : 'wrong');
        // Palkkiosta myös toast kortin ulkopuolelle, jotta hyvitys näkyy
        // varmasti vaikka katse olisi muualla.
        if (oikein) {
          const box = this.buildToast({
            kind: 'stamp',
            icon: 'kukkaro',
            text: `+${KULTTUURI_PALKKIO} puntaa`,
            sub: 'Tunsit paikallista kulttuuria',
          });
          setTimeout(() => this.removeToast(box), TOAST_MS.default);
        }
        // Koko render() sulkisi Tutki-napista avatun kortin (kortti pysyy
        // auki vain offer-vaiheessa), jolloin palaute ei ehtisi näkyä.
        // Riittää tallentaa peli ja päivittää rahapilleri.
        this.onChange?.(this.game);
        this.renderTurnPill();
      });
      this.arrivalKulttuuriVaihtoehdot.appendChild(nappi);
    });
  }

  /**
   * Nostokuvan lataus ja napautus yhdessä paikassa (litteät nostot ja
   * aihenostot).
   *
   * KUVA EI KOSKAAN POISTU LATAUSVIRHEESTÄ. Ennen molemmat piirrot
   * antoivat `asetaKuvalle` varareitin `() => kuva.remove()`, jolloin
   * kuva katosi sivulta pysyvästi heti kun sekä peili että Commons
   * pettivät. Ja kun peilin katkaisija on lauennut (kolme virhettä
   * samassa istunnossa, tila sessionStoragessa), `valokuvaUrl` ja
   * `valokuvaVara` palauttavat SAMAN Commons-osoitteen — silloin
   * `asetaKuva` ei enää pidä sitä varareittinä ja ensimmäinen virhe
   * riitti poistoon. Luvusta katosivat kaikki kuvat kerralla, eikä
   * sivulla näkynyt rikkinäistä kuvaa eikä aukkoa, joka kertoisi syyn.
   *
   * Nyt osoitteita kokeillaan vuorotellen kolme kertaa pienellä
   * odotuksella, ja vasta sen jälkeen kuva jää piiloon — se ei poistu,
   * joten uusi yritys onnistuu heti kun yhteys palaa.
   *
   * EI myöskään `fetchPriority = 'low'`: kuva on luvun sisältöä eikä
   * koriste, eikä sen lataus saa jäädä muiden pyyntöjen jalkoihin.
   */
  varustaNostonKuva(kuva, nosto, leveys) {
    kuva.decoding = 'async';
    kuva.alt = nosto.selite ?? nosto.otsikko;
    /*
     * Selaimen oma kuvanraahaus keskeyttää osoitintapahtumat
     * (pointercancel), ja sivunvaihtopyyhkäisy kuoli heti kun se alkoi
     * kuvan päältä — juuri siitä mistä se useimmiten alkaa.
     */
    kuva.draggable = false;
    const osoitteet = [...new Set([
      valokuvaUrl(nosto.tiedosto, leveys), valokuvaVara(nosto.tiedosto, leveys),
    ])].filter(Boolean);
    let yritys = 0;
    const YRITYKSIA = 3;
    const seuraava = () => {
      if (yritys >= YRITYKSIA) { kuva.hidden = true; return; }
      const url = osoitteet[yritys % osoitteet.length];
      yritys += 1;
      // Sama osoite uudelleen ei lähtisi liikkeelle pelkällä src-
      // asetuksella, joten se nollataan ensin.
      if (kuva.getAttribute('src') === url) kuva.removeAttribute('src');
      kuva.src = url;
    };
    kuva.addEventListener('error', () => {
      // Galleriateoksen virhe kuuluu asetaKuvan varareitille — tämä
      // kuuntelija hoitaa vain noston oman kuvan osoitteet, muuten se
      // palauttaisi selatun teoksen takaisin ensimmäiseen.
      if (!osoitteet.includes(kuva.getAttribute('src'))) return;
      if (onPeilista(kuva.currentSrc || kuva.src)) {
        peiliPetti(peilinLaji(kuva.currentSrc || kuva.src) ?? 'kuvat');
      }
      // Pieni odotus: heti uusittu pyyntö kaatuisi samaan syyhyn.
      setTimeout(seuraava, 700);
    });
    seuraava();
    // Suurennus vain tarkoituksellisesta napautuksesta, ei vierityksen
    // tai raahauksen päätteeksi (omistajan toive). Galleriassa avataan
    // kohdalla oleva teos ja koko sarja selattavana.
    this.napautuksesta(kuva, () => {
      const tila = kuva.galleriaTila;
      if (tila) {
        this.naytaKulttuuriKuva(tila.teokset[tila.kohdalla], {
          teokset: tila.teokset, kohdalla: tila.kohdalla,
        });
      } else {
        this.naytaKulttuuriKuva(nosto);
      }
    });
  }

  /**
   * Napautus, joka ei laukea vieritettäessä.
   *
   * Kuvat elävät vierivän arkin sisällä, ja kosketusnäytöllä sormi
   * liikkuu lähes aina hieman. Suurennus avataan vasta kun osoitin
   * pysyi paikallaan — muuten sivupyyhkäisy tai vierityksen pysäytys
   * avasi kuvan vahingossa.
   */
  napautuksesta(el, toiminto) {
    let alku = null;
    el.addEventListener('pointerdown', (e) => { alku = { x: e.clientX, y: e.clientY }; });
    el.addEventListener('pointercancel', () => { alku = null; });
    el.addEventListener('click', (e) => {
      const paikka = alku;
      alku = null;
      // Näppäimistön ja hiiren napsautuksissa pointerdownia ei
      // välttämättä ole — ne kelpaavat sellaisenaan.
      if (paikka && Math.hypot(e.clientX - paikka.x, e.clientY - paikka.y) > 10) return;
      toiminto();
    });
  }

  /**
   * Kulttuurinoston kuva isompana: valokuvavedos keskellä ruutua valkoisin
   * reunuksin. Katselin on saapumisikkunan sisällä, koska modaalin päälle
   * ei muuten pääse. Napautus sulkee.
   */
  /**
   * @param {object[]} [asetukset.teokset] koko sarja: suurennoksesta
   *   tulee selattava (nuolet ja laskuri kuvan päällä), ja selite ja
   *   lähderivi vaihtuvat teoksen mukana. Näin Canaletton galleriaa —
   *   ja lehden etusivun kuvia — voi katsoa läpi täydellä ruudulla
   *   (omistajan toive 5.8.2026).
   */
  naytaKulttuuriKuva(nosto, { teokset = null, kohdalla = 0 } = {}) {
    this.suljeKulttuuriKuva();
    const kortti = html('div', 'postikortti kulttuuri-suurennos');
    // Kuva omaan koteloonsa, jotta nuolet ja laskuri asemoituvat
    // täsmälleen kuvan päälle myös kapean pystykuvan kohdalla.
    const kotelo = html('div', 'suurennos-kuvakotelo');
    const kuva = document.createElement('img');
    kuva.draggable = false;
    kotelo.appendChild(kuva);
    kortti.appendChild(kotelo);
    // Parin lauseen selite teoksesta kuvan alla (omistajan toive);
    // otsikko ja lähde jäävät pienemmälle riville.
    const kuvateksti = html('p', 'kuvateksti');
    const kuvalahde = html('p', 'kuvalahde');
    kortti.appendChild(kuvateksti);
    kortti.appendChild(kuvalahde);
    const lista = (teokset?.length ?? 0) > 1 ? teokset : null;
    let indeksi = Math.max(0, Math.min(kohdalla, (lista?.length ?? 1) - 1));
    let laskuri = null;
    const nayta = () => {
      const teos = lista ? lista[indeksi] : nosto;
      asetaKuva(kuva, valokuvaUrl(teos.tiedosto, 1400), valokuvaVara(teos.tiedosto, 1400));
      kuva.alt = teos.otsikko ?? teos.selite ?? '';
      kuvateksti.textContent = teos.selite ?? '';
      kuvateksti.hidden = !teos.selite;
      kuvalahde.textContent = [teos.otsikko, teos.lahde].filter(Boolean).join(' · ');
      kuvalahde.hidden = !kuvalahde.textContent;
      if (laskuri) laskuri.textContent = `${indeksi + 1} / ${lista.length}`;
    };
    if (lista) {
      const nuoli = (luokka, merkki, nimi, suunta) => {
        const nappi = html('button', `arrival-kuva-nuoli ${luokka}`, merkki);
        nappi.type = 'button';
        nappi.setAttribute('aria-label', nimi);
        nappi.addEventListener('click', (e) => {
          e.stopPropagation();
          indeksi = (indeksi + suunta + lista.length) % lista.length;
          sfx.play('paper');
          nayta();
        });
        kotelo.appendChild(nappi);
      };
      nuoli('edellinen', '‹', 'Edellinen kuva', -1);
      nuoli('seuraava', '›', 'Seuraava kuva', 1);
      laskuri = html('span', 'arrival-kuva-laskuri');
      kotelo.appendChild(laskuri);
    }
    nayta();
    kortti.addEventListener('click', () => this.suljeKulttuuriKuva());
    /*
     * Suurennos liitetään PÄÄLLIMMÄISEEN avoimeen dialogiin. Modaali
     * (showModal) elää selaimen top layer -kerroksessa, joka peittää
     * kaiken ulkopuolisen z-indexistä riippumatta — kun kuvaa
     * napautettiin nähtävyysikkunassa, arrivalDialogiin liitetty
     * suurennos jäi ikkunan TAAKSE (omistajan löytö 8.8.2026).
     * Saman dialogin lapsena suurennos on samassa kerroksessa ja
     * z-index 70 nostaa sen kortin ylle; position: fixed kattaa yhä
     * koko ruudun, koska dialogilla ei ole transformia.
     */
    const nahtavyys = document.getElementById('nahtavyys-dialog');
    const isanta = nahtavyys?.open ? nahtavyys : this.arrivalDialog;
    isanta.appendChild(kortti);
    this.kulttuuriKuvaEl = kortti;
  }

  suljeKulttuuriKuva() {
    this.kulttuuriKuvaEl?.remove();
    this.kulttuuriKuvaEl = null;
    this.kulttuuriHuntuEl?.remove();
    this.kulttuuriHuntuEl = null;
  }

  /*
   * Kevyt blurrihuntu popupin taakse (omistajan toive: ei tummennusta
   * mutta kevyt sumennus). Oma elementti kortin ALLA — kortin sisään
   * piirretty kerros sumentaisi kortin oman taustan. Napautus sulkee.
   */
  lisaaKevytHuntu() {
    const huntu = html('div', 'kevythuntu');
    huntu.addEventListener('click', () => this.suljeKulttuuriKuva());
    this.arrivalDialog.appendChild(huntu);
    this.kulttuuriHuntuEl = huntu;
  }

  /**
   * Kuuntele näyte -napin vaihtokytkin: soitto alkaa pehmeällä nousulla ja
   * toinen painallus tai kortin sulkeminen pysäyttää. Näyte on taustaa
   * hiljaisempi luenta — ei täyttä voimaa.
   */
  kulttuuriAaniNapista(nosto, nappi) {
    if (this.kulttuuriAani) {
      this.pysaytaKulttuuriAani();
      return;
    }
    const asetus = jaaAlku(nosto.aani);
    const audio = new Audio(aaniOsoite(asetus.url));
    audio.preload = 'auto';
    audio.volume = Math.min(1, 0.55 * (asetus.voima ?? 1));
    if (asetus.alku) {
      audio.addEventListener('loadedmetadata', () => {
        try {
          audio.currentTime = asetus.alku;
        } catch {
          /* soi alusta */
        }
      }, { once: true });
    }
    // Vain tekstiosa vaihtuu — kaiutinkuvake säilyy napissa.
    const nimio = nappi.querySelector('span');
    // Napin oma teksti talteen: samaa soitinta käyttävät myös
    // "Kuuntele kieltä" ja "Kuuntele musiikkia", ja ilman tätä ne
    // muuttuivat pysäytettäessä "Kuuntele näyte" -napeiksi.
    const alkuperainen = nimio?.textContent ?? 'Kuuntele näyte';
    this.kulttuuriAani = { audio, nappi, nimi: alkuperainen };
    /*
     * Radionapissa lukee aseman nimi, ja se saa jäädä lukemaan sitä
     * myös soidessa: nimi on napin tunniste, ei kehotus. Muissa
     * napeissa teksti on kehotus ("Kuuntele näyte"), ja silloin sen
     * on vaihduttava. Merkki (kolmio/neliö) kertoo tilan molemmissa.
     */
    const merkki = nappi.querySelector('.merkki');
    if (merkki) merkki.outerHTML = MERKKI_SEIS;
    if (nimio && !merkki) nimio.textContent = 'Pysäytä näyte';
    nappi.classList.add('soi');
    // Kesto ja toistokohta näkyvät napissa näytteen soidessa
    // (omistajan toive) — muodossa 0:12 / 3:10.
    const aika = nappi.querySelector('.aika');
    const muoto = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
    const naytaAika = () => {
      if (!aika || !Number.isFinite(audio.duration)) return;
      aika.hidden = false;
      aika.textContent = `${muoto(audio.currentTime)} / ${muoto(audio.duration)}`;
    };
    audio.addEventListener('loadedmetadata', naytaAika);
    audio.addEventListener('timeupdate', naytaAika);
    // Paikan taustaääni väistyy näytteen ajaksi ja palaa pysäytettäessä.
    vaimennaTausta();
    const nollaa = () => {
      if (this.kulttuuriAani?.audio === audio) this.pysaytaKulttuuriAani();
    };
    // Peilin pettäessä sama äänite haetaan alkuperäisestä lähteestä
    // ennen kuin näyte luovuttaa (ks. js/media.js).
    let varareittiKokeiltu = false;
    let toinenAaniKokeiltu = false;
    const petti = () => {
      if (this.kulttuuriAani?.audio !== audio) return;
      if (!varareittiKokeiltu && onPeilista(audio.getAttribute('src'))) {
        varareittiKokeiltu = true;
        peiliPetti('aanet');
        audio.src = asetus.url;
        audio.load();
        audio.play().catch(petti);
        return;
      }
      /*
       * Kokonaan toinen ääni, ei saman äänen toinen osoite. "Kuuntele
       * kieltä" soittaa suoraa radiolähetystä, ja lähetysosoitteet
       * lakkaavat toimimasta ilman varoitusta — silloin soitetaan
       * kaupungissa nauhoitettu näyte sen sijaan että nappi jäisi
       * hiljaiseksi. Kokeillaan vain kerran, joten silmukkaa ei synny.
       */
      if (!toinenAaniKokeiltu && nosto.vara) {
        toinenAaniKokeiltu = true;
        varareittiKokeiltu = false;
        /*
         * Live-merkki sammuu tässä. Nyt soi kaupungissa nauhoitettu
         * näyte, ei suora lähetys, ja punainen piste väittäisi
         * muuta. Merkki on tieto eikä koriste, joten sen on
         * kadottava samalla hetkellä kuin sen kertoma asia.
         */
        nappi.querySelector('.live')?.remove();
        audio.src = aaniOsoite(jaaAlku(nosto.vara).url);
        audio.load();
        audio.play().catch(petti);
        return;
      }
      nollaa();
    };
    audio.addEventListener('ended', nollaa);
    audio.addEventListener('error', petti);
    audio.play().catch(petti);
  }

  pysaytaKulttuuriAani() {
    const soiva = this.kulttuuriAani;
    this.kulttuuriAani = null;
    if (!soiva) return;
    soiva.audio.pause();
    soiva.audio.removeAttribute('src');
    const merkki = soiva.nappi.querySelector('.merkki');
    if (merkki) merkki.outerHTML = MERKKI_SOITA;
    const nimio = soiva.nappi.querySelector('span');
    // Nimiö palautetaan vain jos se oli kehotus. Radionapissa lukee
    // aseman nimi, eikä se muuttunut soidessakaan.
    if (nimio && !merkki) nimio.textContent = soiva.nimi ?? 'Kuuntele näyte';
    const aika = soiva.nappi.querySelector('.aika');
    if (aika) {
      aika.hidden = true;
      aika.textContent = '';
    }
    soiva.nappi.classList.remove('soi');
    palautaTausta();
  }

  /**
   * Muotoilee koko artikkelin tekstin: MediaWiki extracts palauttaa
   * väliotsikot muodossa "== Otsikko ==", ja ne muutetaan omiksi
   * otsikkoriveiksi. Pelkkää tekstiä — HTML:ää ei upoteta.
   *
   * Artikkeli katkaistaan ensimmäiseen HÄNTÄOSASTOON (Lähteet, Katso
   * myös, Aiheesta muualla…): explaintext riisuu viiteluettelot,
   * linkkilistat ja galleriat, joten näistä osastoista jää jäljelle
   * vain rivi tyhjiä otsikoita artikkelin perään (omistajan havainto
   * 10.8.2026 Espanjalaisista portaista: "Tätä ei ole siistitty").
   * Häntäosastot ovat Wikipediassa aina artikkelin lopussa, joten
   * katkaisu ei vie asiasisältöä mukanaan. Lista kattaa molemmat
   * hakukielet (WIKI_LANGS: fi ja en) — Colosseumin kaltaiset paikat
   * ratkeavat englanninkieliseen artikkeliin.
   */
  renderArticle(container, text) {
    const hanta = /^(katso myös|lähteet|viitteet|lähteet ja viitteet|kirjallisuutta?|aiheesta muualla|ulkoiset linkit|kuvia|kuvagalleria|galleria|huomautukset|aiheeseen liittyvää|see also|references|notes|footnotes|citations|sources|bibliography|further reading|external links|gallery)$/i;
    container.textContent = '';
    let para = [];
    const flush = () => {
      if (para.length) container.appendChild(html('p', 'wiki-p', para.join(' ')));
      para = [];
    };
    for (const line of text.split('\n')) {
      const t = line.trim();
      if (!t) {
        flush();
        continue;
      }
      const m = t.match(/^(={2,6})\s*(.+?)\s*={2,6}$/);
      if (m) {
        flush();
        if (m[1].length <= 2 && hanta.test(m[2])) return;
        container.appendChild(html('p', m[1].length <= 2 ? 'wiki-h2' : 'wiki-h3', m[2]));
      } else {
        para.push(t);
      }
    }
    flush();
  }

  /**
   * "Lue lisää": Wikipedian artikkeli paikasta. Dialogi avautuu heti,
   * tiivistelmä täyttyy kun haku valmistuu, ja koko artikkeli ladataan
   * perään samalta kieleltä. Jos haku epäonnistuu — ei yhteyttä, 404 tai
   * täsmennyssivu — dialogissa lukee kohteliaasti, ettei tietoja saatu,
   * eikä peli jää siitä jumiin.
   */
  async openWiki(cityId) {
    const city = this.game.board.cityById.get(cityId);
    if (!city?.wiki) return;
    await this.openWikiArticle(city.wiki, city.name);
  }

  /**
   * Kirjanmerkkiliuskat Tutki-ikkunan yläreunaan.
   *
   * Omistajan toive: nostot jaoteltuina kategorioihin, joista yksi on
   * auki kerrallaan.
   *
   * Yleistä-liuska on aina ensimmäinen ja se on artikkeli. Sitä EI
   * korvata kategorioilla, vaikka omistaja ehdotti sitä: 122
   * kaupungilla on oma artikkeli ja kategorioita on toistaiseksi
   * yhdellä. Korvaaminen tyhjentäisi 142 kaupunkia sinä päivänä, kun
   * ominaisuus julkaistaan.
   *
   * Liuskat piilotetaan kokonaan, jos kategorioita ei ole. Yhden
   * liuskan rivi ei valitse mitään eikä siis kerro mitään.
   */
  /*
   * Käsinpiirretty aaltoreuna (arkinAariviiva + piirraArkinReuna)
   * poistettiin v299:ssä: pohja on nyt sanomalehden tyyliin suora
   * leikattu reuna kaikissa kaupungeissa (omistajan päätös). Historia
   * löytyy gitistä hakusanalla "arkinAariviiva".
   */

  /**
   * Tutki-ikkunan sivut: taitettu lehti (omistajan toive).
   *
   * "Ensimmäisellä sivulla olisi Lontoo, Iso-Britannia ja sen alla
   * historia — poistetaan nuo keskellä olevat valintanapit kokonaan.
   * Pelaaja voi yksinkertaisesti pyyhkäistä sivuja eteenpäin, jolloin
   * seuraavalle sivulle avautuisi aina yksi aihealue kerrallaan ja sen
   * alueen otsikko lukisi ylhäällä."
   *
   * Sivu 0 on etusivu: kaupunki ja maa, ei mitään muuta. Sivut 1…n ovat
   * yksi aihe kukin. Sivumäärä tulee aineistosta, ei koodista.
   *
   * ETUSIVULLA OLI ENNEN MYÖS ENSIMMÄINEN AIHE. Alkuperäisessä
   * toiveessa se luki mukana ("Lontoo, Iso-Britannia ja sen alla
   * historia"), mutta lopputulos oli epäsymmetrinen: historia oli
   * ainoa aihe ilman omaa sivuaan, se jäi kahden palstan alle
   * jatkoksi eikä sen otsikko aloittanut sivua kuten muiden.
   * Omistajan tarkennus 5.8.2026: *"Lontoon tutki sivun ens. sivu
   * voisi palauttaa alkuperäiseen muotoon ja siirtää historia omalle
   * sivulleen kuten muutkin aiheet."*
   *
   * Entinen kuvakeliuskarivi (rakennaLiuskat) on poistettu. Elementti
   * jää DOM:iin piiloon, jottei index.html ja muut siihen viittaavat
   * kohdat mene rikki.
   */
  rakennaSivut(cityId) {
    /*
     * Maaosasto takaisin etusivun palstaan: piirraMaaEtusivu siirtää
     * elementin karttasivulle, ja ilman palautusta seuraava kaupunki,
     * jolla karttasivua ei ole, jäisi ilman maaosastoa.
     */
    if (this.arrivalMaa.parentElement !== this.arrivalPalstat) {
      this.arrivalPalstat.appendChild(this.arrivalMaa);
    }
    // Mediarivi samasta syystä takaisin uutisten kylkeen: maalehti
    // lainaa sen aihesivun kärkeen (ks. naytaTutkiSivu).
    if (this.arrivalMedia && this.arrivalOikea
      && this.arrivalMedia.parentElement !== this.arrivalOikea) {
      this.arrivalOikea.appendChild(this.arrivalMedia);
    }
    // Maa-etusivun kuvanosto ei kuulu etusivun maaosastoon.
    this.arrivalMaa.querySelector(':scope > .maa-etusivu-nosto')?.remove();
    const kategoriat = cityId ? [...(KULTTUURI_KATEGORIAT[cityId] ?? [])] : [];
    const kaupunginOmia = kategoriat.length;
    /*
     * Kaupungit, joilla ei ole kategorioita mutta on litteä nostolista,
     * saavat yhden sivun nimeltä "Elämää".
     *
     * Ilman tätä nostot katoaisivat kokonaan 79 kaupungista, kun ne
     * siirrettiin pois saapumiskortista. Sama sääntö kuin artikkelin
     * kanssa: ominaisuuden lisääminen ei saa viedä mitään pois niiltä,
     * jotka eivät sitä vielä saa.
     */
    const litteat = cityId ? ((KULTTUURIT[this.game.pack.id] ?? {})[cityId]?.nostot ?? []) : [];
    if (!kaupunginOmia && litteat.length) {
      kategoriat.push({ id: 'elama', nimi: 'Elämää', nostot: litteat, litteä: true });
    }
    /*
     * Maan aiheet kaupungin sivujen perään (omistajan malli 5.8.2026):
     * lehden kansisivut ovat kaupunkia, sisäsivut maata — sama
     * maapaketti palvelee maan jokaista kaupunkia, vain kansi vaihtuu.
     * Jos kaupungilla on jo sama aihe-id, kaupungin versio voittaa,
     * jotta Lontoon yhdeksän omaa aihetta eivät saa rinnalleen maan
     * kaksoiskappaleita.
     */
    const maanIso = cityId ? this.game.pack.map?.cityCountry?.[cityId] : null;
    /*
     * Maan sivut erottuvat kaupungin sivuista maan lipulla otsikkorivin
     * oikeassa reunassa (omistajan tarkennus 7.8.2026: "Saksan
     * historia yms. otsikoista voisi ottaa saksan pois ja korvata se
     * lipulla"). Aiempi ratkaisu oli genetiivi otsikossa ("SAKSAN
     * HISTORIA", 6.8.2026) — maanAiheOtsikko ja genetiivitaulu ovat
     * yhä maa-kategoriat.js:ssä muuta käyttöä varten.
     */
    const otsikonMaa = maanIso ? this.game.pack.map?.countryShapes?.[maanIso]?.nimi : null;
    const maanLippu = maanIso ? this.game.pack.map?.countryShapes?.[maanIso]?.lippu : null;
    /*
     * Maaosion aloitussivu (omistajan toive 7.8.2026): iso korkokartta
     * kaupunkeineen, ja lehden etusivun maaosasto muuttaa tälle
     * sivulle — kumpikin etusivu on oma tiivistelmänsä, ja seuraavat
     * sivut syventävät. Vain maat, joille on kartta
     * js/packs/maakartat.js:ssä (pilottina Saksa); muut kaupungit
     * näyttävät maaosaston etusivulla entiseen tapaan.
     */
    const maakartta = maanIso && otsikonMaa ? MAAKARTAT[maanIso] ?? null : null;
    /*
     * KAUPUNKILEHTI JA MAALEHTI OVAT ERI LEHTIÄ (v350, omistajan
     * päätös 8.8.2026: "erotetaan kaupunki ja maa lehti toisistaan").
     *
     * Ennen nämä olivat yksi pino: kansi, kaupungin aiheet, maan
     * etusivu, maan aiheet ja numerot. Lontoossa siitä tuli 14 sivua,
     * ja kaupungin oma tarina hukkui maan alle. Nyt kaupunkilehti on
     * 3-4 sivua, ja maa on oma lehtensä, joka avataan kartalta maan
     * nimen "i"-painikkeesta tai Maiden tiedot -varusteella.
     *
     * Sama aihetunnus kaupungilla ja maalla ei enää piilota maan
     * sivua, koska listat ovat erilliset — mutta samaa sisältöä ei
     * silti kannata olla kahdessa paikassa (ks. Lontoon jako v349).
     */
    this.maanSivut = [];
    if (maakartta) this.maanSivut.push({ id: 'maa-etusivu', nimi: otsikonMaa, kartta: maakartta });
    for (const osa of (maanIso ? MAA_KATEGORIAT[maanIso] ?? [] : [])) {
      this.maanSivut.push(maanLippu ? { ...osa, maaLippu: maanLippu, maa: otsikonMaa } : osa);
    }
    /*
     * Lehtitaitto (omistajan toive 5.8.2026): aihe, jonka id on
     * 'kaupunki', tekee kaupungista lehtikaupungin. Etusivu rakentuu
     * esittelytekstin ja isojen kuvien varaan, ja maa on samalla
     * sivulla omana osastonaan — kansiosion nostot saavat OMAN sivunsa
     * heti etusivun jälkeen, jottei etusivu veny eivätkä maan
     * ydintiedot huku (omistajan tarkennus 5.8.2026: ensimmäinen
     * versio taittoi nostot etusivulle, ja sivusta tuli liian pitkä).
     * Muut kaupungit näyttävät etusivun entiseen tapaan.
     */
    const kansi = kategoriat.find((k) => k.id === 'kaupunki') ?? null;
    const lehti = Boolean(kansi);
    /*
     * MENOVINKIT NÄKYY MOLEMMISSA LEHDISSÄ (omistajan tilaus 8.8.2026:
     * "tämä sivu voi kattaa koko maan linkit ja saisi näkyä myös maan
     * omalla lehdellä").
     *
     * Sivu ei ole matkaopas vaan lista parhaista paikoista
     * NETTIMATKAAJALLE: museoiden verkkokokoelmat, digitoidut arkistot
     * ja suorat kamerat. Sellainen aineisto on lähes aina koko maan
     * yhteistä — National Gallery ja Kew palvelevat samaa lukijaa
     * riippumatta siitä, mihin noppa vei — joten sisältö asuu
     * maapaketissa yhtenä kappaleena ja lainataan tähän. Kaupungille
     * ei tehdä omaa kopiota: kaksi kopiota ajautuisi erilleen
     * ensimmäisellä päivityksellä.
     *
     * Viimeiseksi sivuksi, koska se on lehden uloskäynti: linkit
     * vievät pelistä pois, ja niiden jälkeen odottaa enää kohtaaminen.
     *
     * Sivu tuodaan maan lipun kanssa (maanSivut on jo varustanut sen),
     * ja se on tarkoitus: lippu kertoo kaupunkilehdessäkin, että nämä
     * osoitteet kattavat koko maan eivätkä vain tätä kaupunkia.
     */
    if (lehti) {
      const vinkit = this.maanSivut.find((s) => s.id === 'menovinkit');
      if (vinkit) kategoriat.push(vinkit);
    }
    /*
     * "Maa numeroina" viimeiseksi sivuksi jokaiseen kaupunkiin, jolla
     * on maatunnus (docs/valtion-analyysi.md): lehtikaupungissa se on
     * lehden arkkisivu, muualla sama sisältö maalohkon jatkona
     * kevyemmässä kehyksessä — kehys kevenee itsestään, koska
     * lehtitaitto on vain lehtikaupunkien luokka. Sivu lisätään
     * datasta riippumatta — aineisto haetaan laiskasti vasta sivun
     * avautuessa, ja jos sitä ei saada (yhden tiedoston versio ilman
     * verkkoa), sivu kertoo sen kohteliaasti itse.
     */
    if (maanIso) {
      // Otsikossa maan nimi kuten muillakin maan sivuilla (omistajan
      // toive 7.8.2026: "muuta myös maa numeroina sivu esim. Egypti
      // numeroina muotoon") — tässä nominatiivissa, koska "numeroina"
      // on jo taivutettu: "EGYPTI NUMEROINA".
      const nimi = otsikonMaa ? `${otsikonMaa} numeroina` : 'Maa numeroina';
      // Numerot ovat maan tietoa, joten ne kuuluvat maalehteen.
      this.maanSivut.push({ id: 'maa-numeroina', nimi, numerot: maanIso });
    }
    this.tutkiLehti = lehti;
    // Karttamaissa maaosasto ei asu etusivulla: kulmalinkki vie sen
    // omalle sivulleen, eikä sama sisältö saa näkyä kahdesti.
    this.tutkiMaaEtusivu = Boolean(maakartta);
    if (maakartta) this.arrivalMaa.hidden = true;
    this.tutkiMaaIso = maanIso;
    this.tutkiMaaNimi = otsikonMaa ?? null;
    // Liitelinkki päiväysrivillä: "Suomi-liite" (omistajan taitto-ohje 9.8.2026).
    this.arrivalMaaLinkki.textContent = maakartta ? `${otsikonMaa}-liite` : '';
    this.arrivalDialog.classList.toggle('lehti', lehti);
    this.piirraLehtiKuvat(kansi?.kansikuvat);
    // Lehdessä ei ole Lue lisää -nappeja eikä wikin kuvakarusellia:
    // etusivun tekstit riittävät alkuun, ja syventyminen tapahtuu
    // sivuja kääntämällä. Kuvat ovat omia, tarkistettuja valintoja.
    if (lehti) {
      this.arrivalWiki.hidden = true;
      this.arrivalMaaWiki.hidden = true;
      this.arrivalKuvakotelo.hidden = true;
    }
    this.arrivalLehtiYla.hidden = !lehti;
    // Päiväysrivi kuin lehden nimiön alla: maa ja monesko matkapäivä.
    // Maan nimi on omassa spanissaan, koska kapealla ruudulla se
    // väistyy liitelinkin tieltä (linkki peitti päiväyksen iPhonella,
    // omistajan havainto 9.8.2026) — linkissä lukee sama maa, joten
    // tieto ei katoa. CSS: .pvm-maa.
    const maanNimi = this.arrivalMaaTiedot?.nimi;
    this.arrivalLehtiPvm.replaceChildren();
    if (lehti) {
      if (maanNimi) this.arrivalLehtiPvm.appendChild(html('span', 'pvm-maa', `${maanNimi} · `));
      this.arrivalLehtiPvm.appendChild(document.createTextNode(`${this.game.dayCount()}. matkapäivä`));
    }
    this.arrivalLehtiAla.hidden = !lehti;
    this.naytaLehtiSaa(lehti ? cityId : null);
    this.arrivalLiuskat.replaceChildren();
    this.arrivalLiuskat.hidden = true;
    this.tutkiSivut = kategoriat;
    // Kaupunkilehti aukeaa aina kaupunkitilassa; maalehti on oma
    // näkymänsä, joka avataan kartalta (avaaMaalehti).
    this.tutkiTila = 'kaupunki';
    this.tutkiMaaLehti = null;
    // Vasta tässä tiedetään, onko maaosasto omalla sivullaan, joten
    // mediarivit ratkaistaan uudestaan (ks. paivitaMediarivit).
    this.paivitaMediarivit();
    this.naytaTutkiSivu(0, { heti: true });
  }

  /**
   * Sivumäärä: etusivu ja sen jälkeen yksi sivu aihetta kohti.
   *
   * Etusivu on aina olemassa, aiheita voi olla nolla — silloin sivuja on
   * yksi eikä navigaatiota piirretä lainkaan (paivitaTutkiNavi).
   */
  tutkiSivuja() {
    return 1 + (this.tutkiSivut?.length ?? 0);
  }

  /**
   * Näyttää yhden sivun. Etusivulla (0) ovat kaupunki- ja maapalstat sekä
   * kulttuurivisa; aihesivuilla vain aihe, jotta luettava alkaa heti
   * otsikosta.
   */
  naytaTutkiSivu(indeksi, { heti = false, suunta = 0 } = {}) {
    const sivuja = this.tutkiSivuja();
    const i = Math.min(Math.max(indeksi, 0), sivuja - 1);
    this.tutkiSivu = i;
    /*
     * Väkäsen näkyvyys lasketaan vasta kun sivun sisältö on
     * asettunut: ilman tätä nappi jäi piiloon lehteä avattaessa,
     * koska tila oli laskettu edellisen (lyhyen) sisällön mukaan
     * eikä mikään vieritys ollut vielä päivittänyt sitä.
     */
    setTimeout(() => this.tutkiVakanen?.(), 120);
    const etusivu = i === 0;
    if (this.arrivalPalstat) this.arrivalPalstat.hidden = !etusivu;
    /*
     * Visa on pelitoiminto ja kuuluu saapumiseen, ei luettaviin
     * sivuihin. Lehtikaupungissa se asuu kaupungin omalla sivulla
     * (sivu 1) eikä etusivulla — etusivun päätehtävä on kohtaaminen,
     * eikä visa saa kilpailla sen kanssa (omistajan tarkennus
     * 5.8.2026). Muilla kaupungeilla visa pysyy etusivulla.
     */
    /*
     * Visa on saapumisen pelitoiminto: siitä saa puntia siitä
     * kaupungista, johon pelaaja juuri saapui. Maalehti avataan
     * kartalta mistä tahansa maasta, joten siellä visa olisi väärässä
     * paikassa — ja Maiden tiedot -varusteella sen voisi pelata
     * matkustamatta minnekään.
     */
    const visasivu = this.tutkiTila !== 'maa'
      && (this.tutkiLehti && sivuja > 1 ? i === 1 : etusivu);
    this.arrivalKulttuuri.hidden = !visasivu || !this.kulttuuriSaatavilla;

    // Kaupungin kohdekartta lehden etusivun loppuun (omistajan
    // tarkennus 7.8.2026: "kartta pitäisi olla jo ihan ensimmäisellä
    // sivulla" — aiemmin kaupunki-aihesivun pohjalla). Piirto on
    // kevyt ja kuva paikallinen, joten se tehdään joka avauksella.
    /*
     * Vain kaupunkilehdessä: maalehden nimiösivu on myös indeksi 0,
     * ja ilman tutkiTila-ehtoa Suomen lehden ensimmäisellä sivulla
     * luki "Kaupunki kartalla" ja alla oli Helsingin kohdekartta
     * (omistajan havainto 9.8.2026). Vika näkyi silloin, kun maalehti
     * avattiin kaupunkilehden liitenapista, koska arrivalShownFor
     * osoittaa yhä kaupunkiin.
     */
    const karttaEtusivulla = etusivu && this.tutkiTila !== 'maa'
      && KAUPUNKIKARTAT[this.arrivalShownFor];
    this.arrivalKaupunkiKartta.hidden = !karttaEtusivulla;
    this.arrivalKaupunkiKartta.replaceChildren();
    if (karttaEtusivulla) this.piirraKaupunkiKartta(this.arrivalKaupunkiKartta);

    /*
     * Kaupunkilehden radiorivi asuu palstojen ulkopuolella kohdekartan
     * yllä (omistajan taitto-ohje 9.8.2026: "radio napin voisi siirtää
     * ennen kaupunki kartalla kohtaan"), joten se ei enää peity
     * palstojen mukana — sivukohtainen näkyvyys ratkaistaan tässä.
     * Sisällön täyttää paivitaMediarivit ennen tätä; maalehdessä rivi
     * ei näy, koska siellä radio on maaosaston omalla rivillä.
     */
    if (this.arrivalMediaKaupunki) {
      this.arrivalMediaKaupunki.hidden = this.tutkiTila === 'maa' || !etusivu
        || !this.arrivalMediaKaupunki.childElementCount;
    }

    // Etusivu ei ole aihesivu, joten aiheiden numerointi alkaa vasta
    // sivulta 1: sivu 1 on ensimmäinen aihe, ei toinen.
    const kategoria = etusivu ? null : (this.tutkiSivut?.[i - 1] ?? null);
    // Kulmalinkki maaosioon näkyy vain karttamaan etusivulla.
    this.arrivalMaaLinkki.hidden = !etusivu || !this.tutkiMaaEtusivu;
    // Karttasivu ja tilastosivu piirtyvät omilla piirroillaan — ne
    // ovat karttaa ja käyriä, eivät nostolistoja.
    this.arrivalKategoria.classList.toggle('maa-etusivu', Boolean(kategoria?.kartta));
    if (kategoria?.kartta) this.piirraMaaEtusivu(kategoria);
    else if (kategoria?.numerot) this.piirraMaaNumerotSivu(kategoria);
    else this.piirraKategoria(kategoria);
    this.arrivalKategoria.hidden = !kategoria;
    /*
     * Mediarivi maalehden ensimmäiselle sivulle myös silloin, kun
     * maalla ei ole korkokarttaa.
     *
     * Karttamailla rivi tulee maaosaston mukana (piirraMaaEtusivu
     * siirtää arrivalMaan sivulle). Ruotsilla ja Espanjalla karttaa ei
     * vielä ole, joten niiden maalehti alkaa suoraan aihesivusta eikä
     * radiota näkyisi lainkaan — juuri sitä omistaja pyysi
     * korjaamaan. Rivi siirretään, ei kopioida: sama elementti palaa
     * paikalleen seuraavalla rakennaSivut-ajolla.
     */
    if (this.tutkiTila === 'maa' && i === 1 && !kategoria?.kartta
      && this.arrivalMedia && !this.arrivalMedia.hidden) {
      this.arrivalKategoria.insertBefore(this.arrivalMedia, this.arrivalKategoria.firstChild);
    }

    // Liike kertoo suunnan; ilman sitä sivu vain vaihtuu paikallaan.
    this.arrivalKategoria.classList.remove('sivu-vasemmalta', 'sivu-oikealta');
    if (!heti && suunta) {
      // Uudelleenkäynnistys vaatii välissä asettelun lukemisen.
      void this.arrivalKategoria.offsetWidth;
      this.arrivalKategoria.classList.add(suunta > 0 ? 'sivu-oikealta' : 'sivu-vasemmalta');
    }

    this.paivitaTutkiNavi();
    // Uusi sivu alkaa alusta, ei edellisen sivun vierityskohdasta.
    const kortti = this.arrivalDialog.querySelector('.dialog-card');
    if (kortti) kortti.scrollTop = 0;
  }

  /**
   * Maalehti omana näkymänään (omistajan päätös 8.8.2026: "erotetaan
   * kaupunki ja maa lehti toisistaan ... maan sivuille pääsisi nyt
   * suoraan kartalta").
   *
   * Sama arkki ja sama sivunkääntö kuin kaupunkilehdellä — vain
   * sivulista vaihtuu. Näin koko taitto, kuvien suurennus ja
   * pyyhkäisyselaus tulevat ilmaiseksi eikä mitään tarvitse toistaa.
   *
   * Kaupunkilehteen palataan sulkemalla; maalehti ei ole kaupungin
   * sivujen jatke vaan rinnakkainen lehti.
   */
  avaaMaalehti(iso, { nimi = null } = {}) {
    const maa = this.game?.pack?.map?.countryShapes?.[iso];
    if (!maa) return;
    const otsikko = nimi ?? maa.nimi;
    const sivut = [];
    /*
     * SISÄLLYSLUETTELOSIVUA EI OLE (omistajan päätös 8.8.2026: "Tämän
     * sivun voi ottaa pois kokonaan kun hampurilainen korvaa tuon").
     *
     * Vaiheet: ennen v366:ta etusivuna oli maan korkokartta, sitten
     * sisällysluettelo, ja nyt ei kumpaakaan omana sivunaan. Sama
     * luettelo aukeaa alapalkin hampurilaisesta pop-uppina miltä
     * tahansa sivulta, joten oma sivu oli vain yksi ylimääräinen
     * käännös ennen sisältöä.
     *
     * Kartta ei katoa: se on lehden ensimmäinen sivu niillä mailla,
     * joilla se on.
     */
    const kartta = MAAKARTAT[iso];
    const aiheet = (MAA_KATEGORIAT[iso] ?? [])
      .map((osa) => (maa.lippu ? { ...osa, maaLippu: maa.lippu, maa: otsikko } : osa));
    const numerot = { id: 'maa-numeroina', nimi: `${otsikko} numeroina`, numerot: iso };
    const sisalto = [
      ...(kartta ? [{ id: 'maa-etusivu', nimi: `${otsikko} kartalla`, kartta }] : []),
      ...aiheet,
      numerot,
    ];
    if (!sisalto.length) return;
    sivut.push(...sisalto);

    /*
     * Maalehdellä ei ole kaupungin osia: ei kansikuvia, ei säärivi
     * eikä kohtaamista. Ne piilotetaan tässä, ja kaupunkilehti
     * palauttaa ne omalla rakennaSivut-ajollaan.
     */
    this.tutkiTila = 'maa';
    this.tutkiMaaLehti = iso;
    this.tutkiSivut = sivut;
    this.tutkiLehti = true;
    this.tutkiMaaEtusivu = false;
    this.arrivalDialog.classList.add('lehti', 'arkki');
    this.arrivalDialog.classList.toggle('maalehti', true);
    this.piirraLehtiKuvat(null);
    this.arrivalPalstat.hidden = true;
    this.arrivalKulttuuri.hidden = true;
    /*
     * Saapumisen vakiolause pois maalehdestä (omistajan päätös
     * 8.8.2026): "Isoisä on merkinnyt tämän paikan karttaansa" on
     * oikein kaupunkilehdessä mutta ei maalehdessä — isoisä merkitsee
     * karttaansa PAIKKOJA, ei valtioita. Lause jää edelleen
     * kaupunkilehteen, jossa se on kirjoitettu.
     */
    this.arrivalIntro.textContent = '';
    this.arrivalIntro.hidden = true;
    this.arrivalLehtiYla.hidden = false;
    this.arrivalCity.textContent = otsikko;
    this.arrivalLehtiPvm.textContent = 'Maan oma lehti';
    this.arrivalLehtiAla.hidden = false;
    this.naytaLehtiSaa(null);
    if (!this.arrivalDialog.open) this.arrivalDialog.showModal();
    const arkki = this.arrivalDialog.querySelector('.dialog-card');
    if (arkki) this.kytkeTutkiSelaus(arkki);
    // Radio ja tv seuraavat lehteä: maalehdessä ne ovat SEN maan,
    // ei sen, jossa pelaaja sattuu seisomaan (ks. paivitaMediarivit).
    this.paivitaMediarivit();
    // Maalehti alkaa maan etusivulta (indeksi 0 on kaupunkilehden
    // kansi, jota maalehdellä ei ole — siksi sivu 1).
    this.naytaTutkiSivu(1, { heti: true });
  }

  /** Sivun vaihto suuntaan (+1 seuraava, -1 edellinen). */
  vaihdaTutkiSivu(suunta) {
    const sivuja = this.tutkiSivuja();
    const uusi = (this.tutkiSivu ?? 0) + suunta;
    if (uusi < 0 || uusi >= sivuja) return false;
    sfx.play('paper');
    this.naytaTutkiSivu(uusi, { suunta });
    return true;
  }

  /**
   * Sivunuolet ja sivunumero. Ne ovat dialogin lapsia eivätkä kortin:
   * kortti vierii, ja sen sisällä ne katoaisivat heti kun tekstiä lukee
   * — sama syy kuin arkin reunakerroksilla.
   */
  paivitaTutkiNavi() {
    const sivuja = this.tutkiSivuja();
    let navi = this.arrivalDialog.querySelector(':scope > .tutki-navi');
    if (!navi) {
      navi = html('div', 'tutki-navi');
      const nuoli = (luokka, nimi, d) => {
        const nappi = html('button', `tutki-nuoli ${luokka}`);
        nappi.type = 'button';
        nappi.title = nimi;
        nappi.setAttribute('aria-label', nimi);
        nappi.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"
             stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
             stroke-linejoin="round"><path d="${d}"/></svg>`;
        nappi.addEventListener('click', () => this.vaihdaTutkiSivu(luokka === 'seuraava' ? 1 : -1));
        navi.appendChild(nappi);
        return nappi;
      };
      nuoli('edellinen', 'Edellinen sivu', 'M15 5 8 12l7 7');
      nuoli('seuraava', 'Seuraava sivu', 'M9 5l7 7-7 7');
      navi.appendChild(html('p', 'tutki-sivunumero'));
      this.arrivalDialog.appendChild(navi);
    }
    const edellinen = navi.querySelector('.edellinen');
    const seuraava = navi.querySelector('.seuraava');
    const numero = navi.querySelector('.tutki-sivunumero');
    // Yhden sivun kaupungissa ei ole mitään selattavaa: koko navi pois.
    navi.hidden = sivuja < 2;
    edellinen.hidden = this.tutkiSivu <= 0;
    seuraava.hidden = this.tutkiSivu >= sivuja - 1;
    numero.textContent = `${(this.tutkiSivu ?? 0) + 1} / ${sivuja}`;
    this.paivitaTutkiAlapalkki();
  }

  /**
   * Lehden alapalkki (omistajan päätös 8.8.2026: "muuta kaupunkilehden
   * navigointi alas niin että tapaa henkilö x on vasta viimeisellä
   * sivulla. aiemmilla sivuilla on nappi seuraavalle (ja edelliselle
   * jos on) sekä poistu").
   *
   * Kohtaaminen on lehden PÄÄTEPISTE: se ei kilpaile lukemisen kanssa
   * vaan odottaa, kunnes lehti on luettu. Sitä ennen alapalkki on
   * pelkkää navigointia.
   *
   * Maalehdellä ei ole kohtaamista lainkaan — siellä viimeiselläkin
   * sivulla on vain Poistu.
   */
  paivitaTutkiAlapalkki() {
    const kyllä = document.getElementById('arrival-yes');
    const ei = document.getElementById('arrival-no');
    if (!kyllä || !ei) return;
    const sivuja = this.tutkiSivuja();
    const viimeisella = (this.tutkiSivu ?? 0) >= sivuja - 1;
    const etusivulla = (this.tutkiSivu ?? 0) === 0;
    const maalehti = this.tutkiTila === 'maa';
    /*
     * Kohtaaminen/kätkö JOKAISEN kaupunkisivun alareunassa
     * (omistajan tarkennus 9.8.2026: "etsi kätkö pitää olla
     * jokaisen kaupunkisivun alareunassa") — täysleveä palkki, jota
     * ei tarvitse etsiä miltään tietyltä sivulta.
     */
    kyllä.hidden = maalehti;
    ei.textContent = maalehti || viimeisella ? 'Poistu' : 'Poistu lehdestä';

    /*
     * "Lue X-liite" kaupunkilehden viimeiselle sivulle (omistajan
     * toive 9.8.2026): lehden lopusta pääsee suoraan maalehteen,
     * jossa pitkä versio asuu. Nappi rakennetaan kerran ja
     * päivitetään sivun mukana.
     */
    let liite = this.arrivalDialog.querySelector(':scope .maa-liite-nappi');
    if (!liite) {
      liite = html('button', 'maa-liite-nappi');
      liite.type = 'button';
      liite.addEventListener('click', () => {
        if (this.tutkiMaaIso) this.avaaMaalehti(this.tutkiMaaIso);
      });
      ei.parentElement?.appendChild(liite);
    }
    const liiteNimi = this.tutkiMaaNimi;
    liite.hidden = maalehti || !viimeisella || !this.tutkiMaaIso || !liiteNimi;
    // Pelkkä "Suomi-liite" (omistajan tarkennus 9.8.2026).
    liite.textContent = liiteNimi ? `${liiteNimi}-liite` : '';

    let palkki = this.arrivalDialog.querySelector(':scope .tutki-alanapit');
    if (!palkki) {
      palkki = html('div', 'tutki-alanapit');
      /*
       * Napin sisällä on kaksi riviä: suunta ja sen alla pienellä se
       * aihe, jolle nappi vie (omistajan toive 8.8.2026). "Seuraava"
       * kertoo vain että jotain tulee; "Seuraava — Ruokaa ja
       * tapakulttuuria" kertoo kannattaako mennä.
       */
      const tee = (luokka, teksti, suunta) => {
        const nappi = html('button', `tutki-alanappi ${luokka}`);
        nappi.type = 'button';
        nappi.appendChild(html('span', 'alanappi-suunta', teksti));
        nappi.appendChild(html('span', 'alanappi-aihe'));
        nappi.addEventListener('click', () => this.vaihdaTutkiSivu(suunta));
        palkki.appendChild(nappi);
        return nappi;
      };
      tee('edellinen', 'Edellinen', -1);
      tee('seuraava', 'Seuraava', 1);
      /*
       * Hampurilaisvalikko sisällysluetteloon (omistajan toive
       * 8.8.2026). Sisällys on etusivulla, mutta sivulta 5 sinne
       * pääsisi muuten vain selaamalla takaisin — valikko tekee
       * hypystä yhden napautuksen mistä tahansa.
       */
      const valikko = html('button', 'tutki-alanappi sisallysnappi');
      valikko.type = 'button';
      valikko.title = 'Sisällys';
      valikko.setAttribute('aria-label', 'Sisällys');
      valikko.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none"'
        + ' stroke="currentColor" stroke-width="1.8" stroke-linecap="round">'
        + '<path d="M4 7h16M4 12h16M4 17h16"/></svg>';
      valikko.addEventListener('click', () => this.avaaSisallysvalikko());
      palkki.appendChild(valikko);
      ei.parentElement?.insertBefore(palkki, ei);
    }

    // Aihe nappien alle: mihin sivulle kumpikin suunta vie.
    const sivunNimi = (i) => {
      // Sivu 0 on molemmissa lehdissä nimiö ja esittely. Maalehdessä
      // se luki ennen "Sisällys", koska sisällysluettelo oli oma
      // sivunsa — nyt luettelo on vain alapalkin pop-upissa.
      if (i <= 0) return 'Etusivu';
      return this.tutkiSivut?.[i - 1]?.nimi ?? '';
    };
    const nyt = this.tutkiSivu ?? 0;
    const edellinen = palkki.querySelector('.edellinen');
    const seuraava = palkki.querySelector('.seuraava');
    edellinen.querySelector('.alanappi-aihe').textContent = sivunNimi(nyt - 1);
    seuraava.querySelector('.alanappi-aihe').textContent = sivunNimi(nyt + 1);
    edellinen.hidden = nyt <= 0;
    seuraava.hidden = viimeisella;
    /*
     * Valikko vain maalehdessä (omistajan päätös 8.8.2026:
     * *"Kaupunkilehdessä on niin vähän sivuja että se on turha."*).
     *
     * v382 kokeili valikkoa myös kaupunkilehdessä, jotta maaosioon
     * olisi ollut sieltä rivi. Reitiksi riittävät etusivun kulmalinkki
     * ja kartan Maiden lehdet -nappi, ja viiden sivun lehdessä valikko
     * on enemmän nappi kuin oikotie.
     */
    palkki.querySelector('.sisallysnappi').hidden = !maalehti || sivuja < 3;
    palkki.hidden = sivuja < 2;
  }

  /**
   * Sisällysluettelo alapalkin valikosta.
   *
   * Sama lista kuin etusivulla, mutta päälle avautuvana levynä. Ei
   * uutta dialogia: lehti on jo dialogissa, ja sisäkkäiset modaalit
   * sotkevat sekä näppäimistön että paluunapin.
   */
  avaaSisallysvalikko() {
    const vanha = this.arrivalDialog.querySelector(':scope > .sisallys-levy');
    if (vanha) { vanha.remove(); return; }
    // Sisällyssivua ei enää ole: lehden sivut OVAT sisällys.
    const sisallys = this.tutkiSivut ?? [];
    const levy = html('div', 'sisallys-levy');
    const sulje = () => levy.remove();
    const otsikkoRivi = html('div', 'sisallys-levy-ylä');
    otsikkoRivi.appendChild(html('span', '', 'Sisällys'));
    const x = html('button', 'sisallys-sulje', '×');
    x.type = 'button';
    x.title = 'Sulje';
    x.addEventListener('click', sulje);
    otsikkoRivi.appendChild(x);
    levy.appendChild(otsikkoRivi);
    levy.appendChild(this.rakennaSisallysLista(sisallys, { suljeValikko: sulje }));
    levy.addEventListener('click', (e) => { if (e.target === levy) sulje(); });
    this.arrivalDialog.appendChild(levy);
  }

  /**
   * Sivunvaihto pyyhkäisystä ja nuolinäppäimistä.
   *
   * Pyyhkäisy ei saa syödä pystyvieritystä: sivu on pitkä ja sitä
   * luetaan pystyyn. Siksi pystysuunta voittaa heti kun se on
   * vaakasuuntaa suurempi, ja vaakasuunnalta vaaditaan sekä 60
   * pikselin matka että kaksinkertainen ylivoima pystysuuntaan.
   *
   * Kuuntelijat ovat kortissa, eivät ikkunassa: kartalla on oma
   * raahauslogiikkansa, eikä Tutki-ikkunan ele saa vuotaa sinne.
   */
  kytkeTutkiSelaus(kortti) {
    if (this.tutkiSelausKytketty) return;
    this.tutkiSelausKytketty = true;
    let alku = null;
    kortti.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) { alku = null; return; }
      alku = { x: e.clientX, y: e.clientY, pysty: false };
    });
    kortti.addEventListener('pointermove', (e) => {
      if (!alku || alku.pysty) return;
      if (Math.abs(e.clientY - alku.y) > Math.abs(e.clientX - alku.x)) alku.pysty = true;
    });
    kortti.addEventListener('pointercancel', () => { alku = null; });
    kortti.addEventListener('pointerup', (e) => {
      const a = alku;
      alku = null;
      if (!a || a.pysty) return;
      const dx = e.clientX - a.x;
      const dy = e.clientY - a.y;
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 2) return;
      if (!this.vaihdaTutkiSivu(dx < 0 ? 1 : -1)) return;
      // Pyyhkäisyn päättävä napsautus ei saa painaa nappia eikä avata
      // kuvaa sillä sivulla, jolle juuri siirryttiin.
      kortti.addEventListener('click', (napsautus) => {
        napsautus.preventDefault();
        napsautus.stopPropagation();
      }, { capture: true, once: true });
    });
    this.arrivalDialog.addEventListener('keydown', (e) => {
      if (!this.arrivalDialog.open || this.tutkiSivuja() < 2) return;
      if (e.key === 'ArrowRight') { if (this.vaihdaTutkiSivu(1)) e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { if (this.vaihdaTutkiSivu(-1)) e.preventDefault(); }
    });

    /*
     * RUUDUN YLÄ- JA ALAREUNA VIERITTÄVÄT PÄÄHÄN.
     *
     * Omistajan toive: "Tutkissivu voisi scrollautua kokonaan ylös ja
     * alas painamalla näytön ihan yläreunaa ja vastaavasti ihan
     * alareunaa." Artikkeli on pitkä, ja puhelimessa alkuun palaaminen
     * vaatii muuten monta pyyhkäisyä.
     *
     * Kaista on ohut ja se reagoi vain napautukseen, joka EI ole
     * pyyhkäisy eikä osu mihinkään nappiin — muuten se veisi
     * napautukset kuvilta ja linkeiltä, jotka ovat sivun ylälaidassa.
     */
    /*
     * Väkänen alareunaan kertomassa, että sieltä pääsee pohjaan.
     * Piiloutuu kun ollaan jo pohjassa, ettei se osoita sinne missä
     * ollaan. Se on pelkkä vihje: napautuksen ottaa vastaan alakaista,
     * ei väkänen itse (pointer-events: none).
     */
    /*
     * Väkänen on nyt ITSE nappi (omistajan päätös 9.8.2026:
     * "ota alareunan napautus pois. Sen sijaan kevyt kelluva nuoli
     * väkänen alaspäin jolla pääsisi sivun loppuun") — napautuskaista
     * poistui kokonaan, koska iPadilla vierityksen pysäyttävä sormi
     * laukaisi sen yhä 350 ms:n vahdista huolimatta.
     */
    const vakanen = html('button', 'tutki-pohjaan');
    vakanen.type = 'button';
    vakanen.setAttribute('aria-label', 'Vieritä sivun loppuun');
    vakanen.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9 L12 15 L18 9" fill="none"'
      + ' stroke="currentColor" stroke-width="2" stroke-linecap="round"'
      + ' stroke-linejoin="round"/></svg>';
    this.arrivalDialog.appendChild(vakanen);
    vakanen.addEventListener('click', (e) => {
      e.stopPropagation();
      kortti.scrollTo({ top: kortti.scrollHeight, behavior: this.reducedMotion ? 'auto' : 'smooth' });
    });
    const paivitaVakanen = () => {
      const pohjassa = kortti.scrollTop + kortti.clientHeight >= kortti.scrollHeight - 8;
      vakanen.hidden = pohjassa || kortti.scrollHeight <= kortti.clientHeight + 8;
    };
    kortti.addEventListener('scroll', paivitaVakanen, { passive: true });
    this.arrivalDialog.addEventListener('close', () => { vakanen.hidden = true; });
    this.tutkiVakanen = paivitaVakanen;
    paivitaVakanen();
  }


  /**
   * Lehden etusivun kuvataitto (omistajan toive 5.8.2026): iso
   * pääkuva maston alla ja pienempien kuvien rivi esittelytekstin
   * jälkeen. Kuvat ovat kansikategorian omia, tarkistettuja valintoja
   * (kansikuvat-kenttä) — eivät wikin satunnaiskaruselli. Napautus
   * avaa selattavan suurennoksen, jossa koko sarja kulkee nuolilla.
   */
  piirraLehtiKuvat(kuvat) {
    const lista = kuvat ?? [];
    this.arrivalLehtiPaakuva.replaceChildren();
    this.arrivalLehtiKuvat.replaceChildren();
    this.arrivalLehtiPaakuva.hidden = !lista.length;
    this.arrivalLehtiKuvat.hidden = lista.length < 2;
    if (!lista.length) return;
    const teeKuva = (teos, indeksi, leveys) => {
      const kotelo = html('figure', 'lehti-kuva');
      const kuva = document.createElement('img');
      kuva.decoding = 'async';
      kuva.draggable = false;
      kuva.alt = teos.selite ?? '';
      asetaKuva(kuva, valokuvaUrl(teos.tiedosto, leveys), valokuvaVara(teos.tiedosto, leveys));
      this.napautuksesta(kuva, () => this.naytaKulttuuriKuva(teos, {
        teokset: lista, kohdalla: indeksi,
      }));
      kotelo.appendChild(kuva);
      if (teos.selite) {
        const teksti = html('figcaption', 'kuvateksti', teos.selite);
        if (teos.lahde) teksti.appendChild(html('span', 'lehti-kuvalahde', ` ${teos.lahde}`));
        kotelo.appendChild(teksti);
      }
      return kotelo;
    };
    this.arrivalLehtiPaakuva.appendChild(teeKuva(lista[0], 0, 1200));
    for (let i = 1; i < Math.min(lista.length, 3); i += 1) {
      this.arrivalLehtiKuvat.appendChild(teeKuva(lista[i], i, 640));
    }
  }

  /**
   * Päivän sää lehden mastoon (omistajan toive 5.8.2026). Rivillä
   * lukee heti kuukauden normaali — se toimii ilman verkkoa — ja
   * ennusteen valmistuttua tilalle vaihtuu tämä päivä. Rivi on nappi:
   * napautus avaa koko vuoden graafin (naytaVuosiSaa).
   */
  naytaLehtiSaa(cityId) {
    const tiedot = cityId ? SAATIEDOT[cityId] : null;
    this.lehtiSaaTiedot = tiedot ?? null;
    this.arrivalSaa.hidden = !tiedot;
    if (!tiedot) return;
    const kuukausi = new Date().getMonth();
    this.asetaSaaRivi('pilvi',
      `${kuukausiSsa(kuukausi)} keskimäärin ${Math.round(tiedot.keskilampo[kuukausi])}°, sadetta ${tiedot.sade[kuukausi]} mm`);
    haeSaaTanaan(tiedot.lat, tiedot.lon).then((saa) => {
      // Pelaaja on voinut ehtiä jatkaa matkaa haun aikana.
      if (!saa || this.arrivalShownFor !== cityId) return;
      const kuvaus = saaKuvaus(saa.koodi);
      const sade = saa.sademaara >= 1 ? `, sadetta ${Math.round(saa.sademaara)} mm` : '';
      this.asetaSaaRivi(kuvaus.kuvake,
        `tänään ${saa.lampotila}° (${saa.alin}…${saa.ylin}°), ${kuvaus.teksti}${sade}`);
    });
  }

  asetaSaaRivi(kuvake, teksti) {
    this.arrivalSaa.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">'
      + `${SAA_IKONIT[kuvake] ?? SAA_IKONIT.pilvi}</svg>`
      + '<span class="saa-teksti"></span><span class="saa-vihje">koko vuosi ›</span>';
    this.arrivalSaa.querySelector('.saa-teksti').textContent = teksti;
  }

  /**
   * Koko vuoden sää samana korttina kuin kulttuurikuvan suurennos:
   * keskilämpökäyrä ja sadepalkit kuukausittain, napautus sulkee.
   * Graafi piirtyy staattisista normaaleista, joten se aukeaa myös
   * ilman verkkoa.
   */
  naytaVuosiSaa() {
    const tiedot = this.lehtiSaaTiedot;
    if (!tiedot) return;
    this.suljeKulttuuriKuva();
    this.lisaaKevytHuntu();
    const kortti = html('div', 'postikortti kulttuuri-suurennos vuosisaa-kortti');
    const sulku = html('button', 'uutinen-sulku', '×');
    sulku.type = 'button';
    sulku.setAttribute('aria-label', 'Sulje sää');
    kortti.appendChild(sulku);
    const nimi = this.game.board.cities.find((c) => c.id === this.arrivalShownFor)?.name ?? '';
    kortti.appendChild(html('p', 'kuvateksti vuosisaa-otsikko', `Sää vuoden mittaan — ${nimi}`));
    kortti.appendChild(piirraVuosiSaa(tiedot));
    kortti.appendChild(html('p', 'kuvalahde',
      'Käyrä keskilämpö °C · palkit sademäärä mm · Open-Meteo (ERA5), 1991–2020'));
    kortti.addEventListener('click', () => this.suljeKulttuuriKuva());
    this.arrivalDialog.appendChild(kortti);
    this.kulttuuriKuvaEl = kortti;
    sfx.play('paper');
  }

  /**
   * Ajankohtaiset uutisotsikot maaosastoon paikallisella kielellä
   * (omistajan toive 5.8.2026). Osio näkyy vain, kun maalla on lähde
   * uutislahteet.js:ssä JA uutisvälitys on otettu käyttöön — muuten
   * mitään ei haeta eikä näytetä. Otsikoita ei lyhennetä eikä
   * mukailla; napautus avaa uutisen pelin kirjasimilla.
   */
  naytaMaaUutiset(iso, cityId) {
    const lahde = uutislahde(iso);
    this.arrivalUutiset.hidden = true;
    if (!lahde) return;
    haeUutiset(iso).then((uutiset) => {
      if (!uutiset.length) return;
      if (!this.arrivalDialog.open || this.arrivalShownFor !== cityId) return;
      // "Uutisissa tänään" ja lähde suluissa (omistajan sanamuoto).
      this.arrivalUutiset.querySelector('.uutiset-nimio').textContent =
        `Uutisissa tänään (${lahde.nimi})`;
      const lista = this.arrivalUutiset.querySelector('.uutiset-lista');
      lista.replaceChildren();
      for (const uutinen of uutiset.slice(0, 3)) {
        const rivi = html('button', 'uutinen-rivi');
        rivi.type = 'button';
        rivi.lang = lahde.kieli;
        const teksti = html('span', 'uutinen-rivi-teksti', uutinen.otsikko);
        // dir="auto": oikealta vasemmalle kirjoitettava otsikko (esim.
        // arabia) asettuu oikein ilman kielikohtaista koodia.
        teksti.dir = 'auto';
        rivi.appendChild(teksti);
        rivi.addEventListener('click', () => this.avaaUutinen(uutinen, lahde));
        lista.appendChild(rivi);
        // Suomennos otsikon alle pienemmällä ja kevyemmällä — ilman
        // etikettiä (omistajan toive).
        kaannaSuomeksi(uutinen.otsikko, lahde.kieli).then((suomeksi) => {
          if (!suomeksi || !rivi.isConnected) return;
          const rivinSuomennos = html('span', 'uutinen-rivi-suomeksi', suomeksi);
          rivinSuomennos.dir = 'auto';
          teksti.appendChild(rivinSuomennos);
        });
        // Pikkukuva otsikon viereen (omistajan toive): sama
        // artikkelihaku lämmittää muistin, joten popup aukeaa heti.
        haeArtikkeli(uutinen.linkki).then((artikkeli) => {
          if (!artikkeli?.kuva || !rivi.isConnected) return;
          const pikkukuva = document.createElement('img');
          pikkukuva.alt = '';
          pikkukuva.loading = 'lazy';
          pikkukuva.addEventListener('error', () => {
            pikkukuva.remove();
            rivi.classList.remove('kuvallinen');
          });
          pikkukuva.src = artikkeli.kuva;
          rivi.prepend(pikkukuva);
          rivi.classList.add('kuvallinen');
        });
      }
      this.arrivalUutiset.hidden = false;
    });
  }

  /**
   * Uutispopup pikkulehtenä (omistajan toive 7.8.2026): ylärivillä
   * jutun päiväys ja Käännä-nappi, niiden alla lähteen nimiö lehden
   * tuplaviivojen välissä, iso otsikko ja leipäteksti, jota
   * artikkelin kuva taittaa — teksti juoksee kellutetun kuvan
   * ympäri. Koko juttu haetaan uutissivulta workerin kautta, ja
   * syötteen lyhyt kuvaus on vain varateksti. Tausta EI tummene;
   * kortin sulkee sen napautus tai kulman rasti.
   */
  avaaUutinen(uutinen, lahde) {
    this.suljeKulttuuriKuva();
    sfx.play('paper');
    this.lisaaKevytHuntu();
    const kortti = html('div', 'postikortti kulttuuri-suurennos uutinen-kortti');
    const sulku = html('button', 'uutinen-sulku', '×');
    sulku.type = 'button';
    sulku.setAttribute('aria-label', 'Sulje uutinen');
    kortti.appendChild(sulku);

    // Ylärivi: jutun päiväys vasemmalla, käännösnappi oikealla rastin
    // vieressä. Kellonaika on lehdessä turha — päivä riittää.
    const ylarivi = html('div', 'uutinen-ylarivi');
    const aika = uutinen.aika ? new Date(uutinen.aika) : null;
    ylarivi.appendChild(html('span', 'uutinen-paivays',
      aika && !Number.isNaN(aika.getTime())
        ? `${aika.getDate()}.${aika.getMonth() + 1}.${aika.getFullYear()}`
        : ''));
    const nappi = html('button', 'uutinen-kaanna', 'Käännä');
    nappi.type = 'button';
    ylarivi.appendChild(nappi);
    kortti.appendChild(ylarivi);

    // Lähteen nimiö kuin lehden masto: tuplaviiva yllä, ohut alla.
    kortti.appendChild(html('p', 'uutinen-masto', lahde.nimi));

    const otsikko = html('p', 'uutinen-otsikko', uutinen.otsikko);
    otsikko.lang = lahde.kieli;
    otsikko.dir = 'auto';
    kortti.appendChild(otsikko);

    /*
     * Runko: artikkelin kuva on rungon SISÄLLÄ ja kelluu oikealla,
     * jotta kappaleet juoksevat sen ympäri. Syötteen kuvaus näkyy
     * heti, ja koko artikkeli korvaa sen kun haku valmistuu; jos
     * artikkelia ei saada (esim. workerin vanha versio), kuvaus jää
     * — popup ei ole koskaan tyhjä.
     */
    const runko = html('div', 'uutinen-runko');
    const kuva = document.createElement('img');
    kuva.className = 'uutinen-kuva';
    kuva.alt = '';
    kuva.hidden = true;
    kuva.addEventListener('error', () => { kuva.hidden = true; });
    runko.appendChild(kuva);
    kortti.appendChild(runko);

    /*
     * Käännös vaihtaa otsikon ja kappaleet PAIKALLAAN samoihin
     * elementteihin: suomi saa täsmälleen saman taiton ja tyylin kuin
     * alkuperäinen (omistaja 7.8.2026: ei kursiivia, jutun pitää olla
     * yhtä hyvän näköinen suomeksi), eikä kelluva kuva hypähdä.
     */
    let alkuperaiset = uutinen.kuvaus ? [uutinen.kuvaus] : [];
    let naytaSuomi = false;
    let suomennos = null;
    const naytaOtsikko = (teksti, kieli) => {
      otsikko.textContent = teksti;
      otsikko.lang = kieli;
    };
    const naytaKappaleet = (tekstit, kieli) => {
      for (const p of runko.querySelectorAll('p')) p.remove();
      runko.lang = kieli;
      for (const teksti of tekstit) {
        const p = html('p', 'uutinen-kappale', teksti);
        // dir="auto": oikealta vasemmalle kirjoitettava kieli (esim.
        // arabia) asettuu oikein ilman kielikohtaista koodia.
        p.dir = 'auto';
        runko.appendChild(p);
      }
    };
    if (alkuperaiset.length) naytaKappaleet(alkuperaiset, lahde.kieli);

    /*
     * Suomennos: otsikko ja kappaleet käännetään erikseen, jotta
     * kappalejako säilyy. Jos ilmainen palvelu ehtyy kesken jutun,
     * näytetään käännetyt kappaleet eikä sekakielistä loppua —
     * otsikon on kuitenkin käännyttävä tai koko yritys hylätään.
     */
    const kaannaKaikki = async () => {
      const otsikkoFi = await kaannaSuomeksi(uutinen.otsikko, lahde.kieli);
      if (!otsikkoFi) return null;
      const kappaleetFi = [];
      for (const kappale of alkuperaiset) {
        const fi = await kaannaSuomeksi(kappale, lahde.kieli);
        if (!fi) break;
        kappaleetFi.push(fi);
      }
      if (!kappaleetFi.length) return null;
      return { otsikko: otsikkoFi, kappaleet: kappaleetFi };
    };

    haeArtikkeli(uutinen.linkki).then(async (artikkeli) => {
      if (!kortti.isConnected || !artikkeli) return;
      if (artikkeli.kuva) {
        kuva.src = artikkeli.kuva;
        kuva.hidden = false;
      }
      if (artikkeli.kappaleet?.length) {
        alkuperaiset = artikkeli.kappaleet;
        // Pelkästä kuvauksesta tehty suomennos ei kata artikkelia.
        suomennos = null;
        if (!naytaSuomi) {
          naytaKappaleet(alkuperaiset, lahde.kieli);
          return;
        }
        // Pelaaja ehti kääntää pelkän kuvauksen — käännetään koko
        // juttu perään (valmiit palat ovat muistissa, haku on kevyt).
        const koko = await kaannaKaikki();
        if (!kortti.isConnected || !naytaSuomi || !koko) return;
        suomennos = koko;
        naytaOtsikko(koko.otsikko, 'fi');
        naytaKappaleet(koko.kappaleet, 'fi');
      }
    });

    // Sama nappi kulkee kahteen suuntaan: Käännä suomentaa myös
    // otsikon, jolloin näkyvissä on pelkkää suomea, ja Palauta tuo
    // alkuperäiskielen takaisin (omistajan malli 7.8.2026).
    nappi.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (naytaSuomi) {
        naytaSuomi = false;
        naytaOtsikko(uutinen.otsikko, lahde.kieli);
        naytaKappaleet(alkuperaiset, lahde.kieli);
        nappi.textContent = 'Käännä';
        return;
      }
      if (!suomennos) {
        nappi.textContent = 'Käännetään…';
        nappi.disabled = true;
        suomennos = await kaannaKaikki();
        // Kortti on voitu ehtiä sulkea käännöksen aikana.
        if (!kortti.isConnected) return;
        nappi.disabled = false;
        if (!suomennos) {
          nappi.textContent = 'Yritä uudelleen';
          return;
        }
      }
      naytaSuomi = true;
      naytaOtsikko(suomennos.otsikko, 'fi');
      naytaKappaleet(suomennos.kappaleet, 'fi');
      nappi.textContent = 'Palauta';
    });

    kortti.addEventListener('click', () => this.suljeKulttuuriKuva());
    this.arrivalDialog.appendChild(kortti);
    this.kulttuuriKuvaEl = kortti;
  }

  /**
   * Yhden kategorian nostot: johdanto ja sen alla kortit.
   *
   * Kohde on oletuksena aihesivun oma elementti; otsikon ja sitaatin
   * voi jättää pois, jos sama piirto taittaa sisältöä muualle.
   */
  /**
   * "Maa numeroina" -arkkisivu: moduuli ja aineisto haetaan vasta
   * tässä. Dynaaminen tuonti kuten linsseillä — yhden tiedoston
   * versio jää tarkoituksella ilman piirtäjää ja päätyy samaan
   * kohteliaaseen verkkoyhteysriviin kuin puuttuva aineisto.
   */
  /**
   * Maaosion aloitussivu: iso korkokartta kaupunkipisteineen oikealla,
   * tunnusluvut ja esittely kiertävät sen vasemmalta, uutiset ja
   * mediarivi alla (omistajan taittotoive 7.8.2026).
   *
   * Sivu ei piirrä maaosaston sisältöä uudelleen vaan SIIRTÄÄ etusivun
   * #arrival-maa-elementin tänne: tunnusluvut, tervehdykset, esittely,
   * uutiset ja mediarivi täyttyvät openArrivalissa entiseen tapaan, ja
   * kuuntelijat ja kesken olevat haut seuraavat elementin mukana.
   * rakennaSivut palauttaa elementin etusivun palstaan seuraavassa
   * kaupungissa. Kartan päällystys asuu maakartat.js:ssä: pisteet
   * asemoidaan prosentteina tiedostosivun reunakoordinaateista.
   */
  piirraMaaEtusivu(kategoria) {
    const kohde = this.arrivalKategoria;
    kohde.replaceChildren();
    kohde.appendChild(html('h3', 'aihe-nimi', kategoria.nimi));
    const kartta = kategoria.kartta;
    // Kartta ennen tekstiä: kellutus koskee vain sen jälkeen tulevaa.
    const kehys = html('div', 'maakartta-kehys');
    // Pisteiden prosenttiasemointi vaatii kotelon, jossa on VAIN kuva —
    // lähderivi kehyksen sisällä venyttäisi asemointipohjaa alaspäin.
    const kotelo = html('div', 'maakartta-kotelo');
    const kuva = document.createElement('img');
    kuva.alt = `${kategoria.nimi} — korkokartta`;
    asetaKuva(kuva, valokuvaUrl(kartta.tiedosto, 1000), valokuvaVara(kartta.tiedosto, 1000));
    kotelo.appendChild(kuva);
    for (const k of kartta.kaupungit ?? []) {
      const p = karttapiste(kartta, k.lat, k.lon);
      const piste = html('span', `maakartta-piste${k.paa ? ' paa' : ''}`);
      piste.style.left = `${p.x.toFixed(1)}%`;
      piste.style.top = `${p.y.toFixed(1)}%`;
      // Itäreunan lähellä nimi aukeaa länteen, ettei se leikkaudu
      // kuvan ulkopuolelle.
      if (p.x > 60) piste.classList.add('nimi-vasen');
      piste.appendChild(html('span', 'maakartta-nimi', k.nimi));
      kotelo.appendChild(piste);
    }
    kehys.appendChild(kotelo);
    kehys.appendChild(html('p', 'lahde', kartta.lahde));
    kohde.appendChild(kehys);
    this.arrivalMaa.hidden = false;
    kohde.appendChild(this.arrivalMaa);
    /*
     * Kuvanosto kartan ja uutisten väliin elävöittämään sivua
     * (omistajan toive 7.8.2026). Nosto piirretään maaosaston
     * SISÄÄN ennen uutispalstaa, koska uutiset ja media asuvat
     * samassa kääreessä — ja siivotaan pois rakennaSivutissa, kun
     * osasto palaa etusivun palstaan.
     */
    this.arrivalMaa.querySelector(':scope > .maa-etusivu-nosto')?.remove();
    if (kartta.nosto) {
      const nostoKotelo = html('div', 'maa-etusivu-nosto');
      this.piirraKategoria({ nostot: [kartta.nosto] }, nostoKotelo, { otsikko: false, sitaatti: false });
      this.arrivalMaa.insertBefore(nostoKotelo, this.arrivalOikea);
    }
    /*
     * PÄIVÄN KUVA POISTETTU (omistajan päätös 8.8.2026).
     *
     * Kuva tuli omasta tarkistetusta listasta ja vaihtui joka päivä,
     * mutta se ei liittynyt siihen maahan, jonka sivulla se oli.
     * Maalehdessä sivun jokaisen osan pitää kertoa siitä maasta.
     * js/packs/paivan-kuvat.js jää paikalleen: aineisto on
     * tarkistettua eikä sille ole tässä muuta käyttöä, mutta se voi
     * palata muualle.
     */
  }

  async piirraMaaNumerotSivu(kategoria) {
    const kohde = this.arrivalKategoria;
    kohde.replaceChildren();
    kohde.appendChild(html('h3', 'aihe-nimi', kategoria.nimi));
    const tila = html('p', 'johdanto', 'Haetaan tilastoja…');
    kohde.appendChild(tila);
    try {
      const { lataaMaakayrat, piirraMaaNumerot } = await import('./maakayrat.js');
      const data = await lataaMaakayrat();
      // Pelaaja ehti kääntää sivua: piirraKategoria tyhjensi kotelon,
      // eikä myöhässä valmistunut sivu saa kirjoittaa uuden päälle.
      if (!kohde.contains(tila)) return;
      if (!data) {
        tila.textContent = 'Tämä sivu tarvitsee verkkoyhteyden ensimmäisellä '
          + 'avauksella — luvut haetaan silloin talteen.';
        return;
      }
      if (!data.maat?.[kategoria.numerot]) {
        // Aineisto on, mutta maa puuttuu siitä — eri asia kuin verkko.
        tila.textContent = 'Tästä maasta ei ole vielä tilastosarjoja.';
        return;
      }
      tila.remove();
      // V-Dem on jo pelissä (maatiedot-paketit) — näytetään uudelleen,
      // ei haeta uudestaan.
      const maatiedot = MAATIEDOT[this.game.pack.id] ?? {};
      const demokratia = maatiedot[kategoria.numerot]?.demokratia ?? null;
      /*
       * VERTAILU MUUTTI KARTALLE (v321). Tällä sivulla oli
       * Vertailulinssin maavalitsin, josta toisen maan sai samoille
       * asteikoille. Omistajan päätös 7.8.2026: *"ei upoteta näkymää
       * tutki osioon vaan linssi toimisi suoraan karttanäkymässä"* —
       * valitsin poistui, ja linssi ottaa nyt kartan haltuunsa
       * (tahdistaVertailu). Sivu palasi siihen, mitä se oli ennen
       * linssiä: maan omat käyrät ja Suomi himmeänä vertailuviivana.
       */
      piirraMaaNumerot(kohde, kategoria.numerot, data, { demokratia });
    } catch {
      tila.textContent = 'Tämä sivu tarvitsee verkkoyhteyden ensimmäisellä '
        + 'avauksella — luvut haetaan silloin talteen.';
    }
  }

  /**
   * Menovinkkien listamalli: ryhmiteltyjä rivejä, joissa on pieni
   * kuva, nimi linkkinä ja lyhyt selitys.
   *
   * Ryhmäotsikko on lukijan kartta: kaksikymmentä osoitetta peräkkäin
   * on luettelo, mutta samat kaksikymmentä neljän otsikon alla on
   * hakemisto, josta löytää sen mitä etsii.
   *
   * Kuvaton rivi on täysin kelvollinen (ks. piirraKategoria).
   */
  /**
   * Yhden aihesivun tiivistys sisällysluetteloon: pieni kuva ja
   * yhden rivin ingressi.
   *
   * Kuva otetaan sivun omasta aineistosta eikä erillisestä
   * kansikuvakentästä — sellaista ei ole, ja jokaisen aiheen
   * varustaminen sillä käsin olisi kahdenkymmenen maan työ. Sivun
   * ensimmäinen kuva on käytännössä aina sen paras kuva.
   */
  sisallysTiedot(osa) {
    if (osa.kartta) return { kuva: osa.kartta.tiedosto, ingressi: 'Kaupungit ja maasto kartalla.' };
    if (osa.numerot) return { kuva: null, ingressi: 'Väkiluku, pinta-ala ja muut tunnusluvut.' };
    const ensimmainen = osa.lista?.[0]?.kohteet?.[0] ?? osa.nostot?.[0] ?? null;
    // Ingressi on johdannon ensimmäinen virke: se on kirjoitettu
    // kertomaan mistä sivulla on kyse, eli juuri tähän tarkoitukseen.
    const johdanto = osa.johdanto ?? ensimmainen?.teksti ?? '';
    const virke = (johdanto.match(/[^.!?]+[.!?]/) ?? [johdanto])[0].trim();
    return { kuva: ensimmainen?.tiedosto ?? null, ingressi: virke };
  }

  /** Sisällysluettelon rivit. Käytetään sekä etusivulla että valikossa. */
  rakennaSisallysLista(sisallys, { suljeValikko = null } = {}) {
    const lista = html('div', 'sisallys');
    for (const osa of sisallys ?? []) {
      const { kuva, ingressi } = this.sisallysTiedot(osa);
      const rivi = html('button', 'sisallys-rivi');
      rivi.type = 'button';
      if (kuva) {
        const img = document.createElement('img');
        img.className = 'sisallys-kuva';
        img.alt = '';
        img.decoding = 'async';
        asetaKuva(img, valokuvaUrl(kuva, 320), valokuvaVara(kuva, 320));
        rivi.appendChild(img);
      }
      const teksti = html('div', 'sisallys-teksti');
      teksti.appendChild(html('span', 'sisallys-otsikko', osa.nimi));
      if (ingressi) teksti.appendChild(html('span', 'sisallys-ingressi', ingressi));
      rivi.appendChild(teksti);
      rivi.addEventListener('click', () => {
        const i = (this.tutkiSivut ?? []).indexOf(osa);
        if (i >= 0) {
          suljeValikko?.();
          this.naytaTutkiSivu(i + 1, { suunta: 1 });
        }
      });
      lista.appendChild(rivi);
    }
    return lista;
  }

  piirraVinkkilista(kohde, ryhmat) {
    for (const ryhma of ryhmat ?? []) {
      if (ryhma.otsikko) kohde.appendChild(html('h4', 'vinkki-ryhma', ryhma.otsikko));
      const lista = html('ul', 'vinkkilista');
      for (const k of ryhma.kohteet ?? []) {
        const rivi = html('li', `vinkki${k.tiedosto ? '' : ' kuvaton'}`);
        if (k.tiedosto) {
          const kuva = document.createElement('img');
          kuva.className = 'vinkki-kuva';
          kuva.alt = k.selite ?? k.nimi ?? '';
          kuva.decoding = 'async';
          kuva.draggable = false;
          // Pikkukuva riittää: rivin kuva on noin sata pikseliä leveä,
          // ja iso tiedosto vain hidastaisi kahdenkymmenen rivin sivua.
          asetaKuva(kuva, valokuvaUrl(k.tiedosto, 320), valokuvaVara(k.tiedosto, 320));
          rivi.appendChild(kuva);
        }
        const teksti = html('div', 'vinkki-teksti');
        const linkki = html('a', 'vinkki-nimi', k.nimi ?? k.linkki);
        linkki.href = k.linkki;
        linkki.target = '_blank';
        linkki.rel = 'noopener noreferrer';
        teksti.appendChild(linkki);
        if (k.teksti) teksti.appendChild(html('p', 'vinkki-selitys', k.teksti));
        // Lähdemaininta on lisenssin ehto, ei koriste — pienellä,
        // mutta aina näkyvissä.
        if (k.lahde) teksti.appendChild(html('p', 'vinkki-lahde', k.lahde));
        rivi.appendChild(teksti);
        lista.appendChild(rivi);
      }
      kohde.appendChild(lista);
    }
  }

  piirraKategoria(kategoria, kohde = this.arrivalKategoria, { otsikko = true, sitaatti = true } = {}) {
    kohde.replaceChildren();
    if (!kategoria) return;
    // Kuvake ei kerro nimeä, joten nimi lukee sisällön yllä.
    if (otsikko) {
      const nimi = html('h3', 'aihe-nimi', kategoria.nimi);
      // Maan sivun tunnisteena lippu otsikkorivin oikeassa reunassa
      // (omistajan toive 7.8.2026) — nimessä ei enää maan genetiiviä.
      if (kategoria.maaLippu) {
        const lippu = document.createElement('img');
        lippu.className = 'aihe-lippu';
        lippu.alt = kategoria.maa ?? '';
        lippu.title = kategoria.maa ?? '';
        asetaKuva(lippu, lippuUrl(kategoria.maaLippu, 96), lippuVara(kategoria.maaLippu, 96));
        nimi.appendChild(lippu);
      }
      kohde.appendChild(nimi);
    }
    /*
     * Litteä nostolista piirretään vanhalla piirrolla: siinä on
     * musiikkilinkit, ääninäytteet ja "Lue lisää aiheesta" -napit,
     * joita kategorianostoissa ei ole.
     */
    if (kategoria.litteä) {
      this.piirraKulttuuriNostot(kohde, kategoria.nostot ?? []);
      return;
    }
    if (kategoria.johdanto) {
      kohde.appendChild(html('p', 'johdanto', kategoria.johdanto));
    }
    /*
     * LISTAMALLI (omistajan päätös 8.8.2026: menovinkit "enemmän
     * listamaiseksi").
     *
     * Nostomalli antaa yhdelle kohteelle puoli sivua. Se on oikein
     * silloin, kun kohteita on kuusi ja jokaisesta on jotain
     * kerrottavaa — mutta menovinkit on hakemisto, ja hakemistossa
     * määrä on arvo itsessään: kaksikymmentä osoitetta ryhmiteltynä
     * palvelee lukijaa paremmin kuin kuusi esseetä.
     *
     * Rivi on siis pieni kuva, nimi linkkinä ja lause tai kaksi.
     * Kuva on VAPAAEHTOINEN: hyvä osoite pääsee listalle ilman
     * kuvaakin, koska kelvollista vapaata kuvaa ei ole jokaisesta
     * museosta eikä puuttuva kuva saa karsia hyvää kohdetta.
     */
    if (kategoria.lista) {
      this.piirraVinkkilista(kohde, kategoria.lista);
      if (kategoria.tehtava) this.piirraMinitehtava(kohde, kategoria);
      return;
    }
    /*
     * Sitaattinosto sivun alkupuolelle: lehdessä se on aukeaman
     * hengähdyspaikka, ei koriste. Yksi per sivu, ks. poimiNostoVirke.
     */
    // Kansiosio on lyhyt, ja sitaatti toistaisi viereisen virkkeen
    // melkein kiinni alkuperäisessä — siksi se voidaan jättää pois.
    /*
     * Sitaatti otetaan siitä nostosta, jonka ALLE se joutuu (indeksi 1),
     * ei siitä, jonka perään se ladotaan.
     *
     * Ensimmäisestä nostosta poimittuna se toisti sanasta sanaan
     * virkkeen, joka oli juuri luettu parikymmentä pikseliä ylempänä —
     * Lontoon Menovinkit-sivulla ne olivat samassa ruudussa (mitattu
     * 8.8.2026, 834 px). Lehdessä nostositaatti kuuluu sen jutun
     * yhteyteen, jota se houkuttelee lukemaan, ja seuraavasta
     * nostosta poimittuna se tekee juuri sen.
     */
    const nostoVirke = sitaatti ? poimiNostoVirke((kategoria.nostot ?? []).slice(1, 2)) : null;
    let ensimmainen = true;
    let nostoSijoitettu = false;
    for (const nosto of kategoria.nostot ?? []) {
      if (!ensimmainen && !nostoSijoitettu && nostoVirke) {
        const sitaatti = html('blockquote', 'wiki-sitaatti');
        sitaatti.appendChild(html('p', '', nostoVirke));
        kohde.appendChild(sitaatti);
        nostoSijoitettu = true;
      }
      const lohko = html('div', 'wiki-nosto');
      // Otsikko ja kuuntelu-/musiikkinapit samalla rivillä — sama
      // toiminnallisuus kuin litteissä nostoissa, ettei monistaminen
      // hävitä Apple Music -linkkejä ja ääninäytteitä.
      const otsikkoRivi = html('div', 'kulttuuri-otsikkorivi');
      otsikkoRivi.appendChild(html('h3', '', nosto.otsikko));
      this.lisaaNostonNapit(otsikkoRivi, nosto);
      // Ajankohta otsikkorivin oikeassa reunassa hahmottamisen tueksi
      // (omistajan toive 7.8.2026: "Historia sivulla vuosisadan voisi
      // merkitä jotenkin otsikkorivillä") — kenttä on vapaaehtoinen
      // ja toimii millä tahansa sivulla.
      if (nosto.aika) otsikkoRivi.appendChild(html('span', 'nosto-aika', nosto.aika));
      lohko.appendChild(otsikkoRivi);
      let kuva = null;
      if (nosto.tiedosto) {
        kuva = document.createElement('img');
        // Sama syy kuin litteissä nostoissa: nollan kokoinen laiska kuva
        // ei lataudu WebKitissä lainkaan. Vain avatun aiheen kuvat ovat
        // kerrallaan DOM:issa, joten määrä pysyy pienenä.
        this.varustaNostonKuva(kuva, nosto, 900);
        /*
         * Pystykuva saa tekstin viereensä (omistajan toive 5.8.2026):
         * korkea kapea kuva jättäisi täysleveänä molemmin puolin
         * tyhjää ja venyttäisi sivun tarpeettoman pitkäksi. Suunta
         * selviää vasta kuvan latauduttua. Gallerianostot pidetään
         * aina täysleveinä — teokset vaihtuvat, eikä taitto saa
         * hyppiä selatessa.
         */
        if (!nosto.galleria?.length) {
          kuva.addEventListener('load', () => {
            if (kuva.naturalHeight > kuva.naturalWidth * 1.15) {
              lohko.classList.add('pysty');
            }
          }, { once: true });
        }
        lohko.appendChild(kuva);
      }
      // Kuvateksti ja lähderivi HETI kuvan alle kuten lehtijutussa —
      // leipäteksti vasta niiden jälkeen (omistajan toive 5.8.2026;
      // palstataitossa selite jutun perässä näytti irralliselta).
      // Kuva ja sen tekstit kääritään yhteiseen kehykseen, joka
      // kutistuu kuvan mittoihin: kuvateksti ei saa ylittää kuvan
      // reunaa (omistajan toive).
      const selite = nosto.selite ? html('p', 'selite', nosto.selite) : null;
      const lahde = nosto.lahde ? html('p', 'lahde', nosto.lahde) : null;
      if (kuva && (selite || lahde)) {
        const kehys = html('div', 'kuvakehys');
        kehys.appendChild(kuva);
        if (selite) kehys.appendChild(selite);
        if (lahde) kehys.appendChild(lahde);
        lohko.appendChild(kehys);
      } else {
        if (selite) lohko.appendChild(selite);
        if (lahde) lohko.appendChild(lahde);
      }
      const leipa = piirraLeipa(lohko, nosto.teksti, { anfangi: ensimmainen });
      ensimmainen = false;
      if (nosto.wiki) {
        const nappi = html('button', 'wiki-btn', 'Lue lisää aiheesta');
        nappi.type = 'button';
        nappi.addEventListener('click', () => this.openWikiArticle(nosto.wiki, nosto.otsikko));
        // Heti leipätekstin loppuun, ei erilliseksi lohkoksi sivun
        // pohjalle (omistajan toive 5.8.2026).
        leipa.appendChild(nappi);
      }
      this.lisaaNostonLinkki(leipa, nosto);
      // Selattava teosgalleria noston kuvan ympärille (pilottina
      // Venetsian Canaletto): nuolet vaihtavat teosta, selite ja
      // lähderivi seuraavat mukana.
      if (kuva && nosto.galleria?.length) {
        this.kaariNostoGalleria(kuva, nosto, { selite, lahde });
      }
      kohde.appendChild(lohko);
    }
    // Lehden minitehtävä sivun loppuun (omistajan toive 5.8.2026).
    if (kategoria.tehtava) this.piirraMinitehtava(kohde, kategoria);
    // Kohdekartta EI ole enää täällä kaupunkisivun pohjalla: omistajan
    // tarkennus 7.8.2026 "kartta pitäisi olla jo ihan ensimmäisellä
    // sivulla" siirsi sen lehden etusivulle (naytaTutkiSivu), eikä
    // sama sisältö saa näkyä kahdesti.
  }

  /**
   * Kaupunkisivun lopun kohdekartta. Omistajan taittopäätös 7.8.2026:
   * "Kartta kannattaakin tehdä isoksi ja merkata siihen
   * yksinkertaisesti pelkkiä ympyröitä, joissa on numero sisällä, ja
   * sitten tehdä selitteet tekstimuodossa kartan ulkopuolelle."
   *
   * Järjestys: otsikko, esittely, koko palstan levyinen kartta,
   * numeroidut selitteet ja lähderivi. Numerointi tulee kohteiden
   * järjestyksestä datassa. Kohde, jolla on tarkistettu fi.wikipedian
   * artikkeli, aukeaa sekä kartan ympyrästä että selitteestä; muut
   * ovat pelkkiä merkkejä. Data: js/packs/maakartat.js
   * (KAUPUNKIKARTAT).
   */
  piirraKaupunkiKartta(kohde) {
    const kartta = KAUPUNKIKARTAT[this.arrivalShownFor];
    if (!kartta) return;
    const lohko = html('div', 'kaupunkikartta');
    lohko.appendChild(html('h3', 'kaupunkikartta-otsikko', 'Kaupunki kartalla'));
    for (const kappale of (kartta.esittely ?? '').split('\n\n').filter(Boolean)) {
      lohko.appendChild(html('p', 'kaupunkikartta-esittely', kappale));
    }
    const kotelo = html('div', 'maakartta-kotelo kaupunkikartta-kotelo');
    const kuva = document.createElement('img');
    kuva.alt = 'Kaupungin kartta';
    // Oma julistekartta on paikallinen tiedosto (assets/kartat/);
    // Commons-pohjainen kartta haetaan peilin kautta kuten kuvat.
    if (kartta.polku) kuva.src = kartta.polku;
    else asetaKuva(kuva, valokuvaUrl(kartta.tiedosto, 1000), valokuvaVara(kartta.tiedosto, 1000));
    kotelo.appendChild(kuva);
    /*
     * Mittakaavajana kartan vasempaan alakulmaan (omistajan toive
     * 9.8.2026). Pituus ja teksti tulevat rajauksesta
     * (maakartat.js:n mittakaava), joten uusi kaupunki saa janan
     * ilman että tähän kosketaan.
     *
     * Leveys on prosentteina kuvan leveydestä eikä pikseleinä: kuva
     * skaalautuu puhelimesta työpöytään, ja pikselimitta valehtelisi
     * heti ensimmäisellä kokomuutoksella. Prosentti pitää janan
     * oikeana joka leveydellä.
     */
    const jana = mittakaava(kartta);
    if (jana) {
      const mitta = html('div', 'kartta-mittajana');
      mitta.style.width = `${jana.osuus.toFixed(2)}%`;
      mitta.appendChild(html('span', 'kartta-mittajana-teksti', jana.teksti));
      mitta.setAttribute('aria-label', `Mittakaava: janan pituus vastaa ${jana.teksti}`);
      kotelo.appendChild(mitta);
    }
    const selitteet = html('div', 'kartta-selitteet');
    /*
     * Nähtävyysjuttu voi asua joko suoraan kartan kohdeoliossa
     * (Lontoo, kirjoitettu maakartat.js:ään) tai omassa tiedostossaan
     * nimen mukaan avaimistettuna (js/packs/nahtavyysjutut.js) —
     * näin kartta/koordinaattidataa (maakartat.js) ei tarvitse
     * koskea, kun juttuja lisätään uusille kaupungeille. Juttu
     * voittaa kohteen mahdollisen wiki-kentän (undefined ohittaa
     * sen), koska omalla jutulla ei näytetä "Lue lisää" -linkkiä.
     */
    const kaupunki = this.arrivalShownFor;
    (kartta.kohteet ?? []).forEach((raaka, i) => {
      const juttu = NAHTAVYYSJUTUT[kaupunki]?.[raaka.nimi];
      const k = juttu ? { ...raaka, wiki: undefined, ...juttu } : raaka;
      const numero = String(i + 1);
      const p = karttapiste(kartta, k.lat, k.lon);
      // Napautettava, jos kohteella on oma juttu TAI wiki-artikkeli.
      const avattava = Boolean(k.teksti || k.wiki);
      const piste = html(avattava ? 'button' : 'span', 'maakartta-piste kaupunki-kohde kohde-numero', numero);
      piste.style.left = `${p.x.toFixed(1)}%`;
      piste.style.top = `${p.y.toFixed(1)}%`;
      const selite = html(avattava ? 'button' : 'span', 'kartta-selite');
      selite.appendChild(html('span', 'kartta-selite-numero', numero));
      selite.appendChild(document.createTextNode(k.nimi));
      /*
       * Oma juttu voittaa wikin (omistajan toive 7.8.2026: "kirjoita
       * itse nähtävyyksien tekstit"). Ilman omaa tekstiä napautus avaa
       * wikin kuten ennenkin, ja ilman kumpaakaan piste on pelkkä
       * merkki — vanhat kaupungit toimivat siis ennallaan.
       */
      const avaa = k.teksti ? () => this.avaaNahtavyys(k, numero)
        : (k.wiki ? () => this.openWikiArticle(k.wiki, k.nimi) : null);
      /*
       * Kohteen nimi hiiren alla (omistajan toive 8.8.2026). Ympyrässä
       * lukee vain numero, ja selitelista on kartan alla — työpöydällä
       * kohteen tunnistaminen vaati siis katseen siirtämistä edestakaisin.
       *
       * Vihje on oma elementtinsä eikä selaimen `title`, koska title
       * ilmestyy sekunnin viiveellä eikä sitä voi tyylitellä. Se on myös
       * syy, miksi pisteestä EI enää anneta titleä: kaksi vihjettä
       * päällekkäin olisi pahempi kuin ei kumpaakaan. Saavutettava nimi
       * tulee tilalle aria-labelina, ja selitelistan napissa title
       * säilyy — siinä lukee jo nimi, joten päällekkäisyyttä ei synny.
       *
       * Näkyvyyden ratkaisee CSS yksin (`hover: hover`), joten
       * kosketuslaitteella tämä on olemassa vain DOM:issa: napautus
       * avaa jutun täsmälleen kuten ennen.
       */
      if (avaa) {
        const otsikko = k.teksti ? `${k.nimi} — lue lisää` : `${k.nimi} — avaa artikkelin`;
        for (const el of [piste, selite]) {
          el.type = 'button';
          el.addEventListener('click', avaa);
        }
        selite.title = otsikko;
        piste.setAttribute('aria-label', otsikko);
      }
      const vihje = html('span', 'kohde-vihje', k.nimi);
      vihje.setAttribute('aria-hidden', 'true');
      piste.appendChild(vihje);
      kotelo.appendChild(piste);
      selitteet.appendChild(selite);
    });
    lohko.appendChild(kotelo);
    lohko.appendChild(selitteet);
    lohko.appendChild(html('p', 'lahde', kartta.lahde));
    kohde.appendChild(lohko);
  }

  /**
   * Kaupunkikartan kohteen oma juttu (omistajan toive 7.8.2026:
   * *"kirjoita itse nähtävyyksien tekstit ... kuvia voisi näyttää
   * niiden nostossa gallerian sijaan tekstin joukossa 3-5"*).
   *
   * Taitto on lehtijutun taitto eikä galleriaselain: kappaleet ovat
   * lyhyitä, ja kuvat ovat yhdessä kehyksessä avauskappaleen jälkeen
   * — useampi kuva karusellina (omistajan palaute 10.8.2026:
   * peräkkäin ladottuina lisäkuvat venyttivät sivun liian pitkäksi).
   *
   * Vuosiluku on oma rivinsä otsikon yllä (omistajan toive: "käytä
   * vuosiluku korostuksia"), ja lainaus nostetaan kappaleiden väliin
   * omaksi lohkokseen silloin kun se on mielekäs — ei väkisin.
   */
  avaaNahtavyys(kohde, numero, { henkilolinkit = null } = {}) {
    const dialogi = document.getElementById('nahtavyys-dialog');
    if (!dialogi) return;
    /*
     * Nähtävyystekstissä mainittu henkilö linkitetään omaan juttuunsa
     * (omistajan tilaus 10.8.2026, pilotti: Engel Helsingissä).
     * Linkit tulevat kaupungin mukaan (arrivalShownFor on kaupunki,
     * jonka kartalta juttu avattiin); henkilöjuttu itse avataan
     * tyhjällä listalla, ettei nimi linkitä itseensä.
     */
    const linkit = henkilolinkit ?? (HENKILOLINKIT[this.arrivalShownFor] ?? []);
    /*
     * Sulku taustaa napauttamalla (omistajan toive 8.8.2026). Kortti
     * täyttää dialogin tarkalleen, joten dialogiin itseensä osuva
     * napautus voi tulla vain reunojen ulkopuolelta eli taustalta.
     * Jos kuvasuurennos on auki, suljetaan ensin vain se.
     */
    if (!dialogi.dataset.taustaSulkee) {
      dialogi.dataset.taustaSulkee = '1';
      dialogi.addEventListener('click', (e) => {
        if (e.target !== dialogi) return;
        if (this.kulttuuriKuvaEl) { this.suljeKulttuuriKuva(); return; }
        dialogi.close();
      });
    }
    document.getElementById('nahtavyys-otsikko').textContent = kohde.nimi;
    const aika = document.getElementById('nahtavyys-aika');
    aika.textContent = [numero ? `Kohde ${numero}` : null, kohde.aika]
      .filter(Boolean).join(' · ');
    aika.hidden = !aika.textContent;

    const sisalto = document.getElementById('nahtavyys-sisalto');
    sisalto.textContent = '';
    const kappaleet = String(kohde.teksti ?? '').split('\n\n').filter(Boolean);
    const kuvat = (kohde.kuvat ?? []).slice(0, 5);
    /*
     * Useampi kuva näytetään KARUSELLINA yhden kehyksen sisällä
     * (omistajan palaute 10.8.2026: peräkkäin ladottuina lisäkuvat
     * venyttivät sivun liian pitkäksi). Kehys tulee heti
     * avauskappaleen jälkeen — juttu ei ala eikä lopu kuvaan.
     */
    const kuvaKehys = kuvat.length > 1
      ? this.nahtavyydenKaruselli(kuvat)
      : (kuvat.length ? this.nahtavyydenKuva(kuvat[0]) : null);
    // Lainaus keskelle, kappaleiden puoliväliin.
    const lainauksenPaikka = kohde.lainaus ? Math.ceil(kappaleet.length / 2) : -1;

    kappaleet.forEach((kappale, i) => {
      sisalto.appendChild(this.nahtavyysKappale(kappale, linkit));
      if (i + 1 === lainauksenPaikka) {
        const lohko = html('blockquote', 'nahtavyys-lainaus');
        lohko.appendChild(html('p', 'nahtavyys-lainaus-teksti', kohde.lainaus.teksti));
        if (kohde.lainaus.lahde) {
          lohko.appendChild(html('p', 'nahtavyys-lainaus-lahde', kohde.lainaus.lahde));
        }
        sisalto.appendChild(lohko);
      }
      if (i === 0 && kuvaKehys) sisalto.appendChild(kuvaKehys);
    });
    // Kappaleeton juttu (ei pitäisi olla, mutta data voi yllättää):
    // kuva ei saa kadota.
    if (!kappaleet.length && kuvaKehys) sisalto.appendChild(kuvaKehys);

    // Jutun ensimmäinen kuva saa oman luokkansa: vaakana se levenee
    // koko palstalle, pystynä se pysyy pienenä (omistajan ohje).
    sisalto.querySelector('.nahtavyys-kuvakehys')?.classList.add('nahtavyys-ensikuva');

    if (kohde.wiki) {
      const nappi = html('button', 'wiki-btn', 'Lue lisää aiheesta');
      nappi.type = 'button';
      nappi.addEventListener('click', () => this.openWikiArticle(kohde.wiki, kohde.nimi));
      sisalto.appendChild(nappi);
    } else if (kohde.lahde) {
      // Oma kooste ilman tarkistettua fi.wikipedian artikkelia: pelkkä
      // lähdemaininta, ei linkkiä (omistajan spesifikaatio 8.8.2026).
      sisalto.appendChild(html('p', 'nahtavyys-lahderivi', kohde.lahde));
    }
    if (!dialogi.open) dialogi.showModal();
    this.nollaaDialoginVieritys(dialogi);
  }

  /**
   * Kappale, jossa vuosiluvut on korostettu (omistajan toive: "käytä
   * vuosiluku korostuksia").
   *
   * Korostus tehdään KOODISSA eikä aineistossa: jos vuosiluvut
   * kirjoitettaisiin dataan HTML-tageina, jokainen tekstikenttä pitäisi
   * renderöidä innerHTML:llä — ja silloin yksikin lainausmerkki tai
   * ampersandi aineistossa voisi rikkoa taiton tai pahempaa. Tässä
   * teksti pilkotaan säännöllisellä lausekkeella ja osat lisätään
   * tekstisolmuina; mikään aineistossa oleva merkki ei voi muuttua
   * merkkaukseksi.
   *
   * Tunnistetaan neljä muotoa: 1666, 1940-luku, 1863–1866 ja 2500 eaa.
   *
   * NELINUMEROINEN riittää yksinään, KOLMINUMEROINEN vaatii
   * ajanmääreen (879 jaa., 300-luku). Ilman tätä eroa mitat
   * korostuisivat vuosiluvuiksi: "korkeus 146 metriä" näytti
   * ensimmäisessä versiossa vuodelta. Kaksinumeroisia ei korosteta
   * lainkaan — ne ovat lähes aina lukumääriä.
   */
  nahtavyysKappale(teksti, henkilot = []) {
    const p = html('p', 'nahtavyys-kappale');
    /*
     * Henkilölinkit ensin: kappale jaetaan nimiosumien kohdalta, nimet
     * muuttuvat napeiksi jotka avaavat henkilön oman jutun
     * (js/packs/henkilot.js), ja muut osat saavat vuosikorostuksen
     * entiseen tapaan. Nappi eikä <a>, koska kohde ei ole osoite vaan
     * saman dialogin sisältö — ja tekstisolmupohjainen jako pitää
     * saman turvatakuun kuin vuosikorostus: aineiston merkit eivät
     * voi muuttua merkkaukseksi.
     */
    let loppu = teksti;
    for (;;) {
      let eka = null;
      for (const h of henkilot) {
        const osuma = loppu.match(h.kuvio);
        if (osuma && (!eka || osuma.index < eka.osuma.index)) eka = { h, osuma };
      }
      if (!eka) break;
      this.vuosikorosta(p, loppu.slice(0, eka.osuma.index));
      const nappi = html('button', 'henkilo-linkki', eka.osuma[0]);
      nappi.type = 'button';
      const henkilo = HENKILOT[eka.h.id];
      nappi.addEventListener('click', () => this.avaaNahtavyys(henkilo, null, { henkilolinkit: [] }));
      p.appendChild(nappi);
      loppu = loppu.slice(eka.osuma.index + eka.osuma[0].length);
    }
    this.vuosikorosta(p, loppu);
    return p;
  }

  /** Lisää tekstin kappaleeseen vuosiluvut korostettuina (ks. yllä). */
  vuosikorosta(p, teksti) {
    if (!teksti) return;
    const jakso = '(?:\\s?[–-]\\s?\\d{2,4})?';
    const kuvio = new RegExp(
      `\\b\\d{4}${jakso}(?:-luvu\\w*)?(?:\\s(?:eaa\\.|jaa\\.))?`
      + `|\\b\\d{3}${jakso}(?:-luvu\\w*(?:\\s(?:eaa\\.|jaa\\.))?|\\s(?:eaa\\.|jaa\\.))`,
      'g',
    );
    let kohta = 0;
    for (const osuma of teksti.matchAll(kuvio)) {
      /*
       * Tuhaterotin ei ole vuosiluku: "1 700 siltaa" ei saa korostua
       * muotoon "1 [700] siltaa". Tarkistus tehdään käsin eikä
       * lookbehindillä, koska Safari sai lookbehind-tuen vasta
       * versiossa 16.4 ja peliä luetaan vanhemmillakin iPadeilla.
       */
      const edellinen = teksti[osuma.index - 1];
      const sitaEdellinen = teksti[osuma.index - 2];
      if ((edellinen === ' ' || edellinen === '\u00a0') && /\d/.test(sitaEdellinen ?? '')) continue;
      if (osuma.index > kohta) p.appendChild(document.createTextNode(teksti.slice(kohta, osuma.index)));
      p.appendChild(html('b', '', osuma[0]));
      kohta = osuma.index + osuma[0].length;
    }
    if (kohta < teksti.length) p.appendChild(document.createTextNode(teksti.slice(kohta)));
  }

  /** Yksi nähtävyysjutun kuva selitteineen ja lähteineen. */
  nahtavyydenKuva(kuva) {
    const kehys = html('figure', 'nahtavyys-kuvakehys');
    const el = document.createElement('img');
    el.className = 'nahtavyys-kuva kulttuuri-kuva-nappi';
    el.alt = kuva.selite ?? '';
    // Sama peiliputki ja suurennus kuin nostojen kuvilla.
    this.varustaNostonKuva(el, kuva, 900);
    /*
     * Kuvan suunta luokaksi kehykseen (omistajan ohje 8.8.2026:
     * jutun ensimmäinen kuva saa olla iso jos se on vaaka; pysty
     * pidetään pienempänä). Suunta selviää vasta kun selain tietää
     * kuvan mitat, joten luokka lisätään load-hetkellä — CSS päättää
     * koon vasta ensikuva+suunta-yhdistelmästä.
     */
    const luokita = () => {
      if (!el.naturalWidth || !el.naturalHeight) return;
      kehys.classList.add(el.naturalWidth >= el.naturalHeight ? 'kuva-vaaka' : 'kuva-pysty');
    };
    if (el.complete) luokita();
    el.addEventListener('load', luokita, { once: true });
    kehys.appendChild(el);
    const teksti = html('figcaption', 'nahtavyys-kuvateksti');
    if (kuva.selite) teksti.appendChild(html('span', 'nahtavyys-selite', kuva.selite));
    if (kuva.lahde) teksti.appendChild(html('span', 'nahtavyys-lahde', kuva.lahde));
    kehys.appendChild(teksti);
    return kehys;
  }

  /**
   * Useamman kuvan karuselli nähtävyysjuttuun: yksi kuva kerrallaan
   * samassa kehyksessä, nuolet ja "1/3"-laskuri päällä (omistajan
   * palaute 10.8.2026: peräkkäin ladottuina lisäkuvat venyttivät
   * sivun liian pitkäksi).
   *
   * Kuvaelementti luodaan joka vaihdolla UUTENA, koska
   * varustaNostonKuva olettaa kertakäytön: se lisää elementille
   * virhe- ja napautuskuuntelijat, jotka kasautuisivat samaa
   * elementtiä kierrätettäessä (suurennos aukeaisi väärään kuvaan).
   * Suuntaluokka (kuva-vaaka/pysty) lasketaan joka kuvalle load-
   * hetkellä uudestaan, koska pysty- ja vaakakuvia voi olla sekaisin
   * samassa jutussa.
   */
  nahtavyydenKaruselli(kuvat) {
    const kehys = html('figure', 'nahtavyys-kuvakehys nahtavyys-karuselli');
    const ikkuna = html('div', 'karuselli-ikkuna');
    const teksti = html('figcaption', 'nahtavyys-kuvateksti');
    let kohta = 0;
    let el = null;

    const nayta = (i) => {
      kohta = (i + kuvat.length) % kuvat.length;
      const kuva = kuvat[kohta];
      kehys.classList.remove('kuva-vaaka', 'kuva-pysty');
      const uusi = document.createElement('img');
      uusi.className = 'nahtavyys-kuva kulttuuri-kuva-nappi';
      uusi.addEventListener('load', () => {
        if (uusi !== el || !uusi.naturalWidth || !uusi.naturalHeight) return;
        kehys.classList.add(uusi.naturalWidth >= uusi.naturalHeight ? 'kuva-vaaka' : 'kuva-pysty');
      });
      this.varustaNostonKuva(uusi, kuva, 900);
      if (el) el.replaceWith(uusi); else ikkuna.prepend(uusi);
      el = uusi;
      teksti.replaceChildren();
      if (kuva.selite) teksti.appendChild(html('span', 'nahtavyys-selite', kuva.selite));
      if (kuva.lahde) teksti.appendChild(html('span', 'nahtavyys-lahde', kuva.lahde));
      laskuri.textContent = `${kohta + 1}/${kuvat.length}`;
    };

    const nuoli = (luokka, merkki, siirto, nimi) => {
      const nappi = html('button', `karuselli-nuoli ${luokka}`, merkki);
      nappi.type = 'button';
      nappi.setAttribute('aria-label', nimi);
      nappi.addEventListener('click', () => nayta(kohta + siirto));
      return nappi;
    };
    ikkuna.appendChild(nuoli('vasen', '‹', -1, 'Edellinen kuva'));
    ikkuna.appendChild(nuoli('oikea', '›', 1, 'Seuraava kuva'));
    const laskuri = html('span', 'karuselli-laskuri');
    ikkuna.appendChild(laskuri);

    kehys.appendChild(ikkuna);
    kehys.appendChild(teksti);
    nayta(0);
    return kehys;
  }

  /**
   * Lehden minitehtävä: kehystetty tehtäväpalsta sivun lopussa kuin
   * sanomalehden ristikkonurkka. Kysymykseen osaa vastata luettuaan
   * saman sivun — ja oikeasta vastauksesta saa pienen rahapalkkion,
   * kerran per lehti (game.actionMinitehtava). Maan yhteinen aihesivu
   * voi palkita uudelleen saman maan toisessa kaupungissa.
   */
  piirraMinitehtava(kohde, kategoria) {
    const { tehtava } = kategoria;
    const cityId = this.arrivalShownFor;
    /*
     * Maalehden aihe erotellaan maatunnuksella. Ilman sitä avain on
     * pakka:kaupunki:aihe, ja koska maan lehden saa auki kartalta
     * mistä tahansa (v390), Prahassa seisova pelaaja olisi voinut
     * ratkaista Tšekin Historian ja sitten Saksan Historia-sivu olisi
     * ollut "jo ratkaistu" — eri maa, sama aihetunnus, sama kaupunki.
     * Kaupunki jää avaimeen, joten maan aihesivu palkitsee yhä
     * uudestaan saman maan toisessa kaupungissa.
     */
    const aiheAvain = this.tutkiTila === 'maa' && this.tutkiMaaLehti
      ? `${this.tutkiMaaLehti}:${kategoria.id}`
      : kategoria.id;
    const laatikko = html('div', 'minitehtava');
    laatikko.appendChild(html('p', 'minitehtava-otsikko', 'Lehden minitehtävä'));
    const avain = `${this.game.pack.id}:${cityId}:${aiheAvain}`;
    if (this.game.minitehtavatVastatut?.has(avain)) {
      /*
       * "Tämän SIVUN", ei "tämän lehden": palkkioavain on
       * pakka:kaupunki:aihe (game.js actionMinitehtava), eli jokainen
       * aihesivu on oma tehtävänsä. Kun kaupunkilehden molemmat
       * aihesivut saivat tehtävän (omistajan toive 8.8.2026), vanha
       * teksti alkoi valehdella: se väitti koko lehden ratkaistuksi,
       * vaikka toisella sivulla oli tehtävä yhä auki.
       */
      laatikko.appendChild(html('p', 'minitehtava-kysymys',
        'Tämän sivun minitehtävä on jo ratkaistu.'));
      kohde.appendChild(laatikko);
      return;
    }
    laatikko.appendChild(html('p', 'minitehtava-kysymys', tehtava.kysymys));
    const vaihtoehdot = html('div', 'kulttuuri-vaihtoehdot');
    const tulos = html('p', 'kulttuuri-tulos');
    tulos.hidden = true;
    tehtava.vaihtoehdot.forEach((teksti, i) => {
      const nappi = html('button', '', teksti);
      nappi.type = 'button';
      nappi.addEventListener('click', () => {
        const oikein = i === tehtava.oikea;
        const vastaus = this.game.actionMinitehtava(
          cityId, aiheAvain, oikein, MINITEHTAVA_PALKKIO,
        );
        if (!vastaus.ok) return;
        vaihtoehdot.replaceChildren();
        tulos.hidden = false;
        tulos.className = oikein
          ? 'kulttuuri-tulos oikein-tulos'
          : 'kulttuuri-tulos vaarin-tulos';
        tulos.textContent = (oikein
          ? `Oikein! +${MINITEHTAVA_PALKKIO} puntaa. `
          : `Oikea vastaus: ${tehtava.vaihtoehdot[tehtava.oikea]}. `)
          + (tehtava.fakta ?? '');
        sfx.play(oikein ? 'correct' : 'wrong');
        // Palkkiosta toast myös kortin ulkopuolelle — sama syy kuin
        // kulttuurivisassa: hyvitys ei saa jäädä huomaamatta.
        if (oikein) {
          const box = this.buildToast({
            kind: 'stamp',
            icon: 'kukkaro',
            text: `+${MINITEHTAVA_PALKKIO} puntaa`,
            sub: 'Lehden minitehtävä ratkesi',
          });
          setTimeout(() => this.removeToast(box), TOAST_MS.default);
        }
        // Koko render() sulkisi Tutki-kortin — riittää tallentaa ja
        // päivittää rahapilleri (sama syy kuin kulttuurivisassa).
        this.onChange?.(this.game);
        this.renderTurnPill();
      });
      vaihtoehdot.appendChild(nappi);
    });
    laatikko.appendChild(vaihtoehdot);
    laatikko.appendChild(tulos);
    kohde.appendChild(laatikko);
  }

  /**
   * Kääräisee noston kuvan galleriaksi: kuva saa ympärilleen kotelon,
   * jossa ovat samat selailunuolet ja laskuri kuin saapumiskuvassa.
   * Teoslista alkaa noston omasta kuvasta ja jatkuu galleria-kentän
   * teoksilla; selailu kiertää ympäri. Selite- ja lähderivit vaihtuvat
   * teoksen mukana, ja suurennos avaa aina kohdalla olevan teoksen
   * (kuva.galleriaKohde — ks. varustaNostonKuva).
   */
  kaariNostoGalleria(kuva, nosto, { selite = null, lahde = null } = {}) {
    const kotelo = html('div', 'arrival-kuvakotelo nosto-galleria');
    kuva.replaceWith(kotelo);
    kotelo.appendChild(kuva);
    const teokset = [
      { otsikko: nosto.otsikko, tiedosto: nosto.tiedosto, selite: nosto.selite, lahde: nosto.lahde },
      ...nosto.galleria,
    ];
    let kohdalla = 0;
    const laskuri = html('span', 'arrival-kuva-laskuri', `1 / ${teokset.length}`);
    // Suurennos avaa kohdalla olevan teoksen JA koko sarjan selattavana
    // (ks. varustaNostonKuva ja naytaKulttuuriKuva).
    kuva.galleriaTila = { teokset, kohdalla };
    const nayta = (suunta) => {
      kohdalla = (kohdalla + suunta + teokset.length) % teokset.length;
      const teos = teokset[kohdalla];
      asetaKuva(kuva, valokuvaUrl(teos.tiedosto, 900), valokuvaVara(teos.tiedosto, 900));
      kuva.alt = teos.selite ?? teos.otsikko ?? nosto.otsikko;
      kuva.galleriaTila = { teokset, kohdalla };
      if (selite) selite.textContent = teos.selite ?? '';
      if (lahde) lahde.textContent = teos.lahde ?? nosto.lahde ?? '';
      laskuri.textContent = `${kohdalla + 1} / ${teokset.length}`;
    };
    const nuoli = (luokka, merkki, nimi, suunta) => {
      const nappi = html('button', `arrival-kuva-nuoli ${luokka}`, merkki);
      nappi.type = 'button';
      nappi.setAttribute('aria-label', nimi);
      nappi.addEventListener('click', (e) => {
        e.stopPropagation();
        sfx.play('paper');
        nayta(suunta);
      });
      kotelo.appendChild(nappi);
    };
    nuoli('edellinen', '‹', 'Edellinen teos', -1);
    nuoli('seuraava', '›', 'Seuraava teos', 1);
    kotelo.appendChild(laskuri);
  }

  /*
   * Ääninäyte-, Apple Music- ja musiikkinäytenapit otsikkoriville.
   * Yksi toteutus molemmille nostomuodoille (litteä ja kategoria) —
   * kaksi kopiota ajautuisi erilleen ensimmäisellä muutoksella.
   */
  /*
   * Ulkoinen linkki noston loppuun (Menovinkit-sivut, omistajan
   * tilaus 8.8.2026: "parhaat menovinkit nettimatkaajalle").
   *
   * Tämä on eri asia kuin `wiki`: se avaa Wikipedian tiivistelmän
   * pelin sisällä, tämä vie museon omaan verkkokokoelmaan uuteen
   * välilehteen. Siksi oikea elementti on <a> eikä nappi — pelaaja
   * näkee osoitteen, voi avata sen keskipainikkeella ja tallentaa
   * kirjanmerkiksi. Ulkoasu on sama tekstilinkki (wiki-btn), jotta
   * sivu ei täyty erinäköisistä kutsuista.
   *
   * linkkiNimi on linkin näkyvä teksti: kohde kannattaa nimetä
   * ("National Gallery — Auringonkukat zoomattavana"), koska pelkkä
   * "Avaa sivusto" ei kerro minne ollaan menossa.
   */
  lisaaNostonLinkki(kohde, nosto) {
    if (!nosto.linkki) return;
    const linkki = html('a', 'wiki-btn nosto-linkki', nosto.linkkiNimi ?? 'Avaa sivusto');
    linkki.href = nosto.linkki;
    linkki.target = '_blank';
    linkki.rel = 'noopener noreferrer';
    kohde.appendChild(linkki);
  }

  lisaaNostonNapit(otsikkoRivi, nosto) {
    if (nosto.aani) {
      const nappi = html('button', 'kulttuuri-kuuntele');
      nappi.type = 'button';
      nappi.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">'
        + '<path d="M4.5 9.6v4.8h3.2l4.5 3.8V5.8L7.7 9.6Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'
        + '<path d="M15.2 9.4a3.6 3.6 0 0 1 0 5.2M17.6 7.2a6.9 6.9 0 0 1 0 9.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
        + '</svg><span>Kuuntele näyte</span><span class="aika" hidden></span>';
      nappi.addEventListener('click', () => this.kulttuuriAaniNapista(nosto, nappi));
      otsikkoRivi.appendChild(nappi);
    }
    if (nosto.musiikki) {
      const linkki = html('a', 'kulttuuri-musiikkilinkki');
      linkki.href = nosto.musiikki;
      linkki.target = '_blank';
      linkki.rel = 'noopener';
      if (nosto.musiikkiNimi) linkki.title = nosto.musiikkiNimi;
      linkki.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">'
        + '<path d="M9 18.5V6.2l9-1.7v11.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'
        + '<circle cx="6.8" cy="18.6" r="2.2" fill="currentColor"/>'
        + '<circle cx="15.8" cy="15.9" r="2.2" fill="currentColor"/></svg> Apple Music';
      otsikkoRivi.appendChild(linkki);
    }
    if (nosto.musiikkiNayte) {
      const nappi = html('button', 'kulttuuri-kuuntele kulttuuri-musiikkinayte');
      nappi.type = 'button';
      nappi.title = nosto.musiikkiNayteNimi ?? 'Vapaasti lisensoitu ääninäyte';
      nappi.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">'
        + '<path d="M9 18.5V6.2l9-1.7v11.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'
        + '<circle cx="6.8" cy="18.6" r="2.2" fill="currentColor"/>'
        + '<circle cx="15.8" cy="15.9" r="2.2" fill="currentColor"/></svg>'
        + '<span>Kuuntele musiikkia</span><span class="aika" hidden></span>';
      nappi.addEventListener('click', () => this.kulttuuriAaniNapista(
        { aani: nosto.musiikkiNayte, otsikko: nosto.otsikko }, nappi,
      ));
      otsikkoRivi.appendChild(nappi);
    }
    /*
     * Esikuuntelu (omistajan hyväksyntä 7.8.2026): uudempi musiikki —
     * ABBA, Dietrich, flamenco — ei ole vapaasti lisensoitua, joten se
     * soi Applen 30 sekunnin esikuunteluna. Vapaa näyte voittaa aina:
     * jos nostolla on musiikkiNayte, esikuuntelunappia ei näytetä.
     */
    if (nosto.esikuuntelu && !nosto.musiikkiNayte) {
      const nappi = html('button', 'kulttuuri-kuuntele kulttuuri-musiikkinayte');
      nappi.type = 'button';
      nappi.title = 'Esikuuntelu Apple Musicista (30 s)';
      nappi.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">'
        + '<path d="M9 18.5V6.2l9-1.7v11.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'
        + '<circle cx="6.8" cy="18.6" r="2.2" fill="currentColor"/>'
        + '<circle cx="15.8" cy="15.9" r="2.2" fill="currentColor"/></svg>'
        + '<span>Kuuntele näyte</span><span class="aika" hidden></span>';
      nappi.addEventListener('click', () => this.esikuunteluNapista(nosto, nappi));
      otsikkoRivi.appendChild(nappi);
    }
  }

  /**
   * Hakee Applen 30 sekunnin esikuuntelun ja soittaa sen kuten muutkin
   * musiikkinäytteet. iTunes Search API on avoin (ei avainta, ja
   * CORS-otsake sallii kutsun suoraan selaimesta — tarkistettu
   * 7.8.2026), mutta previewUrl-osoitteet eivät ole pysyviä, joten
   * paketteihin tallennetaan vain hakutermi (esikuuntelu-kenttä) ja
   * osoite haetaan lennossa. Termi → osoite muistetaan istunnon ajan.
   * Applen ehto palveluun linkittämisestä täyttyy viereisestä Apple
   * Music -linkistä, joka esikuuntelunostoilla on aina.
   */
  async esikuunteluNapista(nosto, nappi) {
    this.esikuuntelut ??= new Map();
    let url = this.esikuuntelut.get(nosto.esikuuntelu) ?? null;
    if (!url) {
      const teksti = nappi.querySelector('span');
      const alku = teksti.textContent;
      teksti.textContent = 'Haetaan…';
      nappi.disabled = true;
      try {
        const haku = new URL('https://itunes.apple.com/search');
        haku.searchParams.set('term', nosto.esikuuntelu);
        haku.searchParams.set('entity', 'song');
        haku.searchParams.set('limit', '1');
        haku.searchParams.set('country', 'fi');
        const vastaus = await fetch(haku, { signal: AbortSignal.timeout(10000) });
        url = (await vastaus.json()).results?.[0]?.previewUrl ?? null;
      } catch {
        url = null;
      }
      nappi.disabled = false;
      teksti.textContent = alku;
      if (!url) {
        // Sama kohtelias linja kuin uutisissa: ilman verkkoa nappi
        // kertoo syyn hetken eikä jää jumiin.
        teksti.textContent = 'Ei yhteyttä';
        setTimeout(() => { teksti.textContent = alku; }, 2500);
        return;
      }
      this.esikuuntelut.set(nosto.esikuuntelu, url);
    }
    this.kulttuuriAaniNapista({ aani: url, otsikko: nosto.otsikko }, nappi);
  }

  /**
   * Sama dialogi mille tahansa artikkelille — esimerkiksi havainnossa
   * mainitulle ilmiölle (Katso kuva), jolla ei ole omaa kaupunkia.
   */
  /**
   * @param {string} [asetukset.alkuteksti] näytetään "Haetaan…" tilalla,
   *   kunnes verkosta tulee vastaus. Maastonimillä se on paketin oma
   *   suomenkielinen selitys: ikkunassa lukee jotain heti, ja jos
   *   yhteyttä ei ole, se jää ainoaksi tekstiksi kohteliaan
   *   virheilmoituksen sijaan.
   */
  async openWikiArticle(title, label = title, { alkuteksti = null } = {}) {
    this.wikiOpenFor = title;
    this.wikiTitle.textContent = label;
    this.wikiImage.hidden = true;
    this.wikiImage.removeAttribute('src');
    this.wikiKuvakotelo.hidden = true;
    this.wikiKuvat = [];
    this.wikiKuvaKohdalla = 0;
    // Edellisen artikkelin suurennusportaat eivät saa jäädä voimaan.
    this.wikiKuvaPortaat = [];
    this.paivitaWikiKuvaLaskuri();
    this.wikiExtract.textContent = alkuteksti || 'Haetaan…';
    this.wikiSource.textContent = '';
    if (!this.wikiDialog.open) this.wikiDialog.showModal();
    this.nollaaDialoginVieritys(this.wikiDialog);

    const summary = await cachedSummary(title);
    // Pelaaja on voinut ehtiä sulkea dialogin tai avata toisen paikan.
    if (!this.wikiDialog.open || this.wikiOpenFor !== title) return;

    if (!summary) {
      // Oma selitys on parempi kuin pahoittelu: se on jo ruudulla, ja
      // lentokoneessa se on ainoa mitä kohteesta voidaan kertoa.
      if (!alkuteksti) this.wikiExtract.textContent = 'Tietoja ei saatu haettua. Matka jatkuu.';
      return;
    }

    this.wikiTitle.textContent = summary.title || label;
    cachedImage(title).then((image) => {
      if (!this.wikiDialog.open || this.wikiOpenFor !== title || !image) return;
      this.naytaWikiKuva(image);
      this.wikiImage.alt = summary.title || label;
      this.wikiImage.hidden = false;
      this.wikiKuvakotelo.hidden = false;
      // Galleria taustalla: laskuri ja nuolet, kun kuvia on useampi.
      cachedGallery(title).then((lista) => {
        if (this.wikiOpenFor !== title || lista.length < 2) return;
        this.wikiKuvat = lista;
        this.wikiKuvaKohdalla = Math.max(0, lista.findIndex((k) => k.src === image));
        this.paivitaWikiKuvaLaskuri();
      });
    });

    // Oma artikkeli (pilottikaupungit): Wikipedia-tekstin sijaan näytetään
    // pelin tyyliin kirjoitettu lyhyempi artikkeli — Wikipedian pohjalta,
    // joten lähdemaininta säilyy. Kuva haetaan silti Wikipediasta.
    /*
     * Kaksi kenttänimeä samalle asialle. Vanhemmat artikkelit
     * (Tanger, Tripoli, maat) käyttävät nimeä `artikkeli`, uudemmat
     * `teksti`. Renderöinti luki vain ensimmäistä, ja 69 paikan
     * kohdalla se sai undefinedin — "Lue lisää" kaatui kokonaan
     * Venetsiassa, Roomassa, Ateenassa, Krakovassa ja Sarajevossa.
     *
     * Kenttiä ei yhtenäistetä tässä: se olisi 69 tiedostomuutosta
     * yhden rivin ongelmaan.
     */
    const oma = ARTIKKELIT[title];
    const omaTeksti = oma?.artikkeli ?? oma?.teksti ?? null;
    if (omaTeksti) {
      this.renderArticle(this.wikiExtract, omaTeksti);
      this.wikiSource.textContent = 'Unohdetun aarteen oma artikkeli, kirjoitettu Wikipedian pohjalta (CC BY-SA)';
      if (summary.url) {
        this.wikiSource.appendChild(document.createTextNode(' — '));
        const alkup = html('a', '', 'lue alkuperäinen');
        alkup.href = summary.url;
        alkup.target = '_blank';
        alkup.rel = 'noopener noreferrer';
        this.wikiSource.appendChild(alkup);
      }
      return;
    }

    this.wikiExtract.textContent = summary.extract;

    // Koko artikkeli ladataan tiivistelmän perään; tiivistelmä jää, jos
    // hakua ei saada tehtyä. Kysytään vain kerran per avaus.
    fetchArticle(summary.title, summary.lang).then((article) => {
      if (!this.wikiDialog.open || this.wikiOpenFor !== title || !article) return;
      if (article.length <= summary.extract.length) return;
      this.renderArticle(this.wikiExtract, article);
    });

    // CC BY-SA vaatii maininnan ja linkin — myös kaupallisessa käytössä.
    // Oma tiivistelmä ei ole Wikipediaa, joten sille kerrotaan oma lähde.
    if (summary.oma) {
      this.wikiSource.textContent = 'Unohdetun aarteen oma tiivistelmä — fi-Wikipediassa ei vielä ole tästä artikkelia.';
      return;
    }
    this.wikiSource.textContent = 'Lähde: Wikipedia (CC BY-SA) — ';
    const link = html('a', '', 'lue artikkeli');
    link.href = summary.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    this.wikiSource.appendChild(link);
  }

  /**
   * Kuvakatselin: napautettu kuva aukeaa isona, ja jos artikkelissa on
   * useampia kelvollisia kuvia, niitä voi selata nuolista tai pyyhkäisemällä.
   * Katselin lisätään avoimen dialogin sisään, koska dialogi on selaimen
   * top layerissa — muualle lisätty kerros jäisi sen alle.
   */
  /** Lue lisää -lehden kuvan laskuri ja nuolet — sama malli kuin Tutki-kortissa. */
  paivitaWikiKuvaLaskuri() {
    const monta = this.wikiKuvat.length > 1;
    this.wikiKuvaLaskuri.hidden = !monta;
    this.wikiKuvaLaskuri.textContent = monta
      ? `${this.wikiKuvaKohdalla + 1}/${this.wikiKuvat.length}` : '';
    document.getElementById('wiki-kuva-edellinen').hidden = !monta;
    document.getElementById('wiki-kuva-seuraava').hidden = !monta;
  }

  /**
   * Latausvirhe ei saa jättää rikkinäisen kuvan merkkiä galleriaan:
   * lähteestä voi kadota tiedosto (uudelleennimeäminen tai poisto), ja
   * silloin kelaus vain jää jumiin kysymysmerkkiin.
   *
   * Ensin kokeillaan varareittiä: jos peili ei vastaa, sama kuva löytyy
   * yhä alkuperäisestä lähteestä. Vasta kun sekin pettää, kuva pudotetaan
   * listalta ja näytetään seuraava; jos kuvia ei jää yhtään, koko kotelo
   * piilotetaan. Lista lyhenee joka virheellä, joten ketju päättyy.
   */
  /**
   * Artikkelin kuva niin suurena kuin sitä on olemassa.
   *
   * Omistajan toive 6.8.2026: "kaikilla Wikipedia-artikkelisivuilla
   * kuvat näytetään mahdollisimman suurina". Kuvaosoite tulee joko
   * tiivistelmästä tai kuvalistasta, ja MOLEMMAT ovat pikkukuvia:
   * tiivistelmän thumbnail on mitattuna noin 330 px leveä (Madrid
   * 330 × 283, alkuperäinen 1184 × 1016) ja kuvalistan srcset tarjoaa
   * usein 500 px. Osoitteessa on leveys muodossa `/330px-`, ja
   * `upsizeImage` vaihtaa sen — sama temppu kuin suurennoskatselimessa
   * (openLightbox), nyt myös itse artikkelisivulla.
   *
   * 1600 eikä 1200: lehti on iPadilla noin 700 CSS-pikseliä leveä, ja
   * tarkalla näytöllä se on 1400 laitepikseliä. Pienempi luku näkyisi
   * juuri siellä, missä kuvaa katsotaan tarkimmin.
   *
   * Portaat jäävät talteen: jos suurinta kokoa ei ole tehty tälle
   * tiedostolle, virhekäsittelijä ottaa listalta seuraavan ja lopulta
   * alkuperäisen pikkukuvan (ks. wikiImage error).
   */
  naytaWikiKuva(src) {
    if (!src) return;
    this.wikiKuvaPortaat = suurennusportaat(src);
    this.wikiImage.src = this.wikiKuvaPortaat.shift();
  }

  pudotaRikkiKuva(lista, kuva, mika) {
    const nyt = kuva.getAttribute('src');
    if (!nyt) return;
    const sama = (s) => Boolean(s)
      && new URL(s, location.href).href === new URL(nyt, location.href).href;
    const kohta = lista.findIndex((k) => sama(k.src));
    if (kohta < 0) return;
    const merkinta = lista[kohta];
    if (merkinta.vara && merkinta.vara !== merkinta.src) {
      peiliPetti(peilinLaji(merkinta.src) ?? 'kuvat');
      merkinta.src = merkinta.vara;
      kuva.src = merkinta.vara;
      return;
    }
    lista.splice(kohta, 1);
    const kotelo = mika === 'wiki' ? this.wikiKuvakotelo : this.arrivalKuvakotelo;
    if (!lista.length) {
      kuva.removeAttribute('src');
      kotelo.hidden = true;
      return;
    }
    if (mika === 'wiki') {
      this.wikiKuvaKohdalla %= lista.length;
      // Myös korvaava kuva näytetään suurena; jos suurennosta ei ole,
      // virhekäsittelijä palaa pikkukuvaan kuten muissakin kohdissa.
      this.naytaWikiKuva(lista[this.wikiKuvaKohdalla].src);
      this.paivitaWikiKuvaLaskuri();
    } else {
      this.arrivalKuvaKohdalla %= lista.length;
      kuva.src = lista[this.arrivalKuvaKohdalla].src;
      this.paivitaKuvaLaskuri();
    }
  }

  /** Pikkukuvan laskuri ja nuolet näkyvät vain, kun galleriassa on selattavaa. */
  paivitaKuvaLaskuri() {
    const monta = this.arrivalKuvat.length > 1;
    this.arrivalKuvaLaskuri.hidden = !monta;
    this.arrivalKuvaLaskuri.textContent = monta
      ? `${this.arrivalKuvaKohdalla + 1}/${this.arrivalKuvat.length}` : '';
    document.getElementById('arrival-kuva-edellinen').hidden = !monta;
    document.getElementById('arrival-kuva-seuraava').hidden = !monta;
  }

  async openLightbox(title, alt = '', aloitusSrc = null) {
    if (!title && !aloitusSrc) return;
    const parent = [this.wikiDialog, this.arrivalDialog].find((d) => d.open) ?? document.body;
    const overlay = html('div', 'lightbox');
    const img = html('img', 'lightbox-img');
    img.alt = alt;
    const lataus = html('div', 'lightbox-loading', 'Ladataan…');
    const kuvateksti = html('div', 'lightbox-caption');
    const prev = html('button', 'lightbox-nav prev', '‹');
    const next = html('button', 'lightbox-nav next', '›');
    const counter = html('div', 'lightbox-counter');
    const close = html('button', 'lightbox-close', '✕');
    prev.hidden = next.hidden = kuvateksti.hidden = true;
    img.hidden = true; // rikkinäisen kuvan kysymysmerkki ei saa vilahtaa
    overlay.append(img, lataus, kuvateksti, prev, next, counter, close);
    parent.appendChild(overlay);

    let kuvat = []; // { src, caption }
    let kohdalla = 0;
    // Nykyisen kuvan jäljellä olevat suurennusportaat, ks. wiki.js.
    let portaat = [];
    img.addEventListener('load', () => {
      img.hidden = false;
      lataus.hidden = true;
    });
    const nayta = () => {
      if (!kuvat.length) return;
      const kohde = kuvat[kohdalla];
      img.hidden = true;
      lataus.hidden = false;
      lataus.textContent = 'Ladataan…';
      portaat = suurennusportaat(kohde.src);
      img.src = portaat.shift();
      kuvateksti.textContent = kohde.caption ?? '';
      kuvateksti.hidden = !kohde.caption;
      counter.textContent = kuvat.length > 1 ? `${kohdalla + 1} / ${kuvat.length}` : '';
      prev.hidden = next.hidden = kuvat.length < 2;
    };
    /*
     * Jos suurinta kokoa ei ole tehty tälle tiedostolle, otetaan
     * seuraava porras ja lopulta kuvalistan oma osoite. Aiemmin tässä
     * oli yksi kiinteä suurennos (1200 px) ja paluu pikkukuvaan — ja
     * koska 1200 ei ole Wikipedian vakiokoko, katselin päätyi lähes
     * aina takaisin 330 pikselin pikkukuvaan.
     */
    img.addEventListener('error', () => {
      if (!kuvat.length) return;
      if (portaat.length) { img.src = portaat.shift(); return; }
      lataus.textContent = 'Kuvaa ei saatu ladattua.';
    });
    const siirry = (askel) => {
      if (kuvat.length < 2) return;
      kohdalla = (kohdalla + askel + kuvat.length) % kuvat.length;
      nayta();
      sfx.play('swipe');
    };
    prev.addEventListener('click', (e) => { e.stopPropagation(); siirry(-1); });
    next.addEventListener('click', (e) => { e.stopPropagation(); siirry(1); });
    close.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
    // Pyyhkäisy vaihtaa kuvaa sormella.
    let alkuX = null;
    overlay.addEventListener('pointerdown', (e) => { alkuX = e.clientX; });
    overlay.addEventListener('pointerup', (e) => {
      if (alkuX === null) return;
      const siirtyma = e.clientX - alkuX;
      alkuX = null;
      if (Math.abs(siirtyma) > 40) siirry(siirtyma < 0 ? 1 : -1);
    });

    // Ensimmäinen kuva heti ruutuun, koko galleria kun lista on haettu.
    // Jos suurennos avattiin selatusta pikkukuvasta, aloitetaan siitä.
    const eka = aloitusSrc || (title ? await cachedImage(title) : null);
    if (!overlay.isConnected) return;
    if (eka) {
      kuvat = [{ src: eka, caption: null }];
      nayta();
    }
    /*
     * Ilman otsikkoa suurennos jää yhteen kuvaan. Valokuvakysymys
     * käyttää tätä: artikkeligalleria näyttäisi samat kuvat, joista
     * koko vika alkoi, ja sen kuvatekstit kertoisivat vastauksen.
     */
    if (!title) return;
    const lista = await cachedGallery(title);
    if (!overlay.isConnected || !lista.length) return;
    const nykyinen = kuvat[0]?.src ?? null;
    kuvat = lista;
    kohdalla = Math.max(0, lista.findIndex((k) => k.src === nykyinen));
    nayta();
  }

  closeArrival() {
    this.arrivalShownFor = null;
    this.suljeKulttuuriKuva();
    this.pysaytaKulttuuriAani();
    if (this.arrivalDialog.open) this.arrivalDialog.close();
    // Tauolle jäänyt luenta jatkuu, kun palataan karttanäkymään — mutta
    // ei tietovisan tai kaksintaistelun päälle (Tutki paikka -polku).
    const kesken = this.luentaTauolla;
    this.luentaTauolla = null;
    if (kesken && kesken === this.diaryVoice && !this.game.quiz && !this.game.duel) {
      kesken.play().catch(() => {});
    }
  }

  /**
   * Avausteksti kirjoittuu kartan alapuoliseen tyhjään pergamenttiin.
   * Teksti on omistajan lukkoon lyömä eikä sitä muokata täällä; se naksuu
   * esiin kirjoituskoneen tapaan ja väistyy heti kun kohde on valittu.
   */
  renderIntro() {
    // Katselutilassa (?lauta=) porttia ja avaustekstiä ei näytetä: kartta
    // on heti esillä täydessä koossaan.
    const nakyy = this.game.phase === 'pickstart' && !this.katselu;
    this.introEl.hidden = !nakyy;
    // Uusi peli tuo tekstin takaisin täyteen näkyvyyteen häivytyksestä —
    // mutta lähikuvassa teksti on väistynyt tarkoituksella, joten sitä ei
    // palauteta joka renderöinnillä.
    if (nakyy && !this.aloitusZoom) this.introEl.classList.remove('intro-fade', 'intro-pois');
    if (!nakyy) {
      this.introShown = false;
      this.introRunko.textContent = '';
      this.introLopetus.textContent = '';
      this.stopIntroVoice();
      this.suljeAloitusportti();
      return;
    }
    if (this.introShown) return;
    // Seikkailu alkaa napista: selain sallii äänet vasta napautuksesta,
    // joten lukuääni, kirjoituskone ja ambienssi käynnistyvät kaikki
    // samasta Aloita seikkailu -painalluksesta. Tausta on himmeänä takana.
    if (!this.aloitettu) {
      this.showAloitusportti();
      return;
    }
    this.introShown = true;
    this.playIntroVoice();
    // Avausteksti kirjoittuu selvästi hitaammin kuin muut: se on matkan
    // ensimmäinen hetki eikä pelitilanteen ilmoitus. Viimeinen rivi
    // kirjoittuu omaan lihavoituun elementtiinsä, jotta kysymys erottuu
    // (omistajan toive) — itse tekstiä ei muuteta.
    const raja = INTRO_TEXT.lastIndexOf('\n\n');
    const runko = raja < 0 ? INTRO_TEXT : INTRO_TEXT.slice(0, raja);
    const lopetus = raja < 0 ? '' : INTRO_TEXT.slice(raja);
    // Lopetus varaa tilansa jo ennen kirjoitusta samalla näkymättömällä
    // varjotekstillä kuin typeText. Ilman sitä fitIntro mittaisi tekstin
    // ilman viimeistä riviä, ja lihavoitu "mistä aloitan?" jäisi ruudun
    // alapuolelle (omistajan havainto).
    this.introLopetus.textContent = '';
    if (lopetus) {
      const varaus = html('span', 'pending');
      varaus.textContent = lopetus;
      this.introLopetus.appendChild(varaus);
    }
    this.typeText(this.introRunko, runko, 'intro', () => {
      if (lopetus) this.typeText(this.introLopetus, lopetus, 'intro-loppu', null, INTRO_TYPE_MS);
    }, INTRO_TYPE_MS);
    // Koko teksti on jo paikallaan, joten koon voi sovittaa heti — sen
    // jälkeen mikään ei enää liiku kirjoituksen aikana.
    this.fitIntro();
  }

  /** Aloita seikkailu -portti: keskellä ruutua, kartta himmeänä takana. */
  showAloitusportti() {
    if (this.aloitusportti) return;
    const portti = html('div', 'start-gate');
    const keskus = html('div', 'start-gate-keskus');

    // Ääniviihje napin yläpuolelle (omistajan toive): peli on tehty
    // kuunneltavaksi, ja selain sallii äänet vasta napautuksesta.
    const aanet = html('p', 'start-aanet');
    aanet.appendChild(document.createTextNode('Laita äänet päälle '));
    const kaiutin = viivaIkoni('kaiutin');
    if (kaiutin) aanet.appendChild(kaiutin);
    keskus.appendChild(aanet);

    const nappi = html('button', 'start-btn primary', 'Aloita seikkailu');
    nappi.addEventListener('click', () => {
      this.aloitettu = true;
      this.suljeAloitusportti();
      // Lauta siirtyy keskeltä ylös tekstin tieltä heti portin auettua.
      this.fitViewBox();
      this.render();
    });
    keskus.appendChild(nappi);
    portti.appendChild(keskus);

    // Alareunan linkki pelin periaatteisiin.
    const alaosa = html('div', 'start-gate-alaosa');
    const linkki = html('button', 'start-linkki', 'Oppiminen on hauskaa');
    linkki.type = 'button';
    linkki.addEventListener('click', () => this.naytaPeriaatteet());
    alaosa.appendChild(linkki);
    portti.appendChild(alaosa);

    this.mapPane.appendChild(portti);
    this.aloitusportti = portti;
  }

  /**
   * Pelin periaatteet omana ikkunanaan aloitussivulta (omistajan toive).
   * Sisältö on tiivistys README:stä ja docs/periaatteet.md:stä: miksi peli
   * on olemassa ja millä säännöillä sisältöä siihen tehdään.
   */
  naytaPeriaatteet() {
    sfx.play('paper');
    const lappu = html('dialog', 'dialog periaate-lappu');
    const kortti = html('div', 'dialog-card');
    lappu.appendChild(kortti);

    const otsikko = html('h2', 'periaate-otsikko', 'Oppiminen on hauskaa');
    kortti.appendChild(otsikko);

    const kappale = (teksti, luokka = '') => {
      const p = html('p', `periaate-teksti ${luokka}`.trim());
      p.textContent = teksti;
      kortti.appendChild(p);
    };
    const valiotsikko = (teksti) => {
      const h = html('h3', 'periaate-valiotsikko');
      h.textContent = teksti;
      kortti.appendChild(h);
    };

    kappale('Matkakirja ja unohdettu aarre on seikkailupeli, jonka sivutuotteena opitaan — '
      + 'ei oppikirja, johon on liimattu noppa. Pelin pitää olla '
      + 'koukuttava ensin; tieto tarttuu matkassa.', 'kärki');

    valiotsikko('Mitä pelissä opitaan');
    kappale('Maiden arkea ja kulttuuria, maantiedettä ja historiaa, '
      + 'geopolitiikkaa ja poliittista tilannetta — ja ennen kaikkea sitä, '
      + 'että maailma on suurempi kuin oma ympäristö. Jokaisella '
      + 'pysähdyksellä on jotain katsottavaa: valokuva silloin ja nyt, '
      + 'maan tunnusluvut, kaupungin musiikkia ja ruokaa.');

    valiotsikko('Kaksi ääntä');
    kappale('Isoisän päiväkirja vuodelta 1873 ja nuoren herran havainto '
      + 'tänään. Vanha ääni loistaa siinä, mikä ei ole muuttunut, ja on '
      + 'toivottoman vanhentunut nimissä ja rajoissa.');

    valiotsikko('Totuus ja lähteet');
    kappale('Jokainen väittämä on tarkistettavissa. Epävarmaa ei väitetä '
      + 'eikä kiistanalaista esitetä varmana. Politiikka ja historia '
      + 'kuvataan, ei tuomita: kerrotaan mitä on ja miksi.');

    valiotsikko('Kunnioitus');
    kappale('Jokainen maa kuvataan asukkaidensa silmin — ei stereotypioita, '
      + 'ei pilkkaa eikä säälittelyä, ei pelkkiä turistikliseitä. '
      + 'Vaikeita aiheita ei kaunistella eikä kauhistella.');

    valiotsikko('Avointa ja ilmaista');
    kappale('Peli on ilmainen harrastusprojekti, ja sen lähdekoodi on '
      + 'kaikkien luettavissa. Kuvat, äänet ja tiedot tulevat avoimista '
      + 'lähteistä, ja jokaisen kohdalla lukee mistä se on ja kuka sen '
      + 'on tehnyt. Peli itse on tekijänsä omaisuutta: sitä saa pelata '
      + 'ja lähdekoodia lukea vapaasti, mutta julkaisuun tai omaan '
      + 'tuotteeseen tarvitaan lupa.');

    // Lippukuvat näkyvät pieninä tervehdysten vieressä, eikä niiden alle
    // mahdu omaa lähderiviä. Valtaosa on public domainia, mutta muutaman
    // lisenssi vaatii tekijän nimeämisen — se tehdään tässä, jotta
    // "jokaisen kohdalla lukee kuka sen on tehnyt" pitää paikkansa.
    if (LIPPU_TEKIJAT.length) {
      const lippurivi = html('p', 'periaate-teksti periaate-liput');
      lippurivi.textContent = `Lippukuvat ovat Wikimedia Commonsista. `
        + `Näiden tekijät lisenssi käskee nimetä: `
        + `${LIPPU_TEKIJAT.map((l) => `${l.tekija} (${l.lisenssi})`).join(', ')}.`;
      kortti.appendChild(lippurivi);
    }

    const linkit = html('p', 'periaate-linkit');
    const gh = html('a', 'periaate-linkki', 'Pelin GitHub-sivu');
    gh.href = 'https://github.com/ravelius/Matkakirja';
    gh.target = '_blank';
    gh.rel = 'noopener';
    linkit.appendChild(gh);
    kortti.appendChild(linkit);

    kortti.appendChild(this.periaatePalaute());

    const oikeudet = html('p', 'periaate-oikeudet', '© Sami Reivinen');
    kortti.appendChild(oikeudet);

    const sulje = html('button', 'ghost periaate-sulje', 'Takaisin');
    sulje.type = 'button';
    sulje.addEventListener('click', () => lappu.close());
    kortti.appendChild(sulje);

    lappu.addEventListener('close', () => lappu.remove());
    lappu.addEventListener('click', (e) => { if (e.target === lappu) lappu.close(); });
    document.body.appendChild(lappu);
    lappu.showModal();
    // showModal siirtää kohdistuksen ensimmäiseen napautettavaan
    // elementtiin, joka on kortin lopussa — selain vieritti ikkunan
    // valmiiksi alas (omistajan havainto). Kohdistus otsikkoon ja
    // vieritys alkuun.
    kortti.scrollTop = 0;
    otsikko.setAttribute('tabindex', '-1');
    otsikko.focus({ preventScroll: true });
  }

  /**
   * Palautelohko periaateikkunan loppuun (omistajan toive). Viesti menee
   * ulkopuoliselle lomakepalvelulle, joka välittää sen tekijälle —
   * sähköpostiosoitetta ei ole sivulla eikä lähdekoodissa, joten
   * roskapostirobotit eivät saa sitä käsiinsä.
   *
   * Jos PALAUTE_LOMAKE on tyhjä, lohko tarjoaa GitHub-linkin, jolloin
   * palaute toimii ilman mitään asetuksia.
   */
  periaatePalaute() {
    const lohko = html('div', 'periaate-palaute');
    const otsikko = html('h3', 'periaate-valiotsikko', 'Palaute ja mukaan');
    lohko.appendChild(otsikko);

    const johdanto = html('p', 'periaate-teksti');
    johdanto.textContent = 'Jos tämä peli kiinnostaa, lähetä palautetta. '
      + 'Voit myös osallistua pelin kehittämiseen — sisältöä, kuvia, '
      + 'kysymyksiä tai koodia.';
    lohko.appendChild(johdanto);

    const vihje = html('p', 'periaate-teksti');
    vihje.textContent = 'Pelin oikeassa alakulmassa on huutomerkki. Sitä '
      + 'napauttamalla voit lähettää palautetta juuri siitä kohdasta, '
      + 'jossa olet — kätevää etenkin, jos jokin näyttää menneen vikaan.';
    lohko.appendChild(vihje);

    lohko.appendChild(this.palauteKentat());
    return lohko;
  }

  /**
   * Palautteen kentät ja lähetys. Sama lohko palvelee sekä periaate-
   * ikkunaa että alakulman huutomerkkiä; tilanne-teksti kulkee viestin
   * mukana, jotta virheilmoitus osuu oikeaan kohtaan peliä.
   *
   * Jos PALAUTE_LOMAKE on tyhjä, tarjolla on GitHub-linkki, jolloin
   * palaute toimii ilman mitään asetuksia.
   */
  palauteKentat(tilanne = '') {
    const lohko = html('div', 'periaate-lomake');
    if (!PALAUTE_LOMAKE) {
      lohko.appendChild(this.palauteGithub(tilanne));
      return lohko;
    }

    const kentta = html('textarea', 'periaate-kentta');
    kentta.rows = 4;
    kentta.placeholder = 'Kirjoita viestisi tähän…';
    kentta.setAttribute('aria-label', 'Viesti pelin tekijälle');
    lohko.appendChild(kentta);

    // Yhteydenottokenttä (omistajan toive): ilman sitä palautteeseen ei
    // voi vastata. Vapaaehtoinen — nimettömän viestin saa lähettää.
    const paluu = html('input', 'periaate-kentta periaate-paluu');
    paluu.type = 'email';
    paluu.placeholder = 'Sähköpostisi, jos haluat vastauksen';
    paluu.setAttribute('aria-label', 'Sähköpostiosoitteesi, vapaaehtoinen');
    lohko.appendChild(paluu);

    const nappi = html('button', 'primary periaate-laheta', 'Lähetä palautetta');
    nappi.type = 'button';
    lohko.appendChild(nappi);

    const huomio = html('p', 'periaate-huomio');
    huomio.setAttribute('role', 'status');
    huomio.textContent = 'Viesti menee suoraan pelin tekijälle.';
    lohko.appendChild(huomio);

    nappi.addEventListener('click', async () => {
      const viesti = kentta.value.trim();
      if (!viesti) {
        huomio.textContent = 'Kirjoita ensin viesti.';
        kentta.focus();
        return;
      }
      nappi.disabled = true;
      huomio.textContent = 'Lähetetään…';
      try {
        const vastaus = await fetch(PALAUTE_LOMAKE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            viesti,
            email: paluu.value.trim(),
            tilanne,
            // Vaihe on kehittäjän tieto eikä näy pelaajalle: se kertoo
            // virheraportissa, mitä peli oli juuri tekemässä.
            vaihe: this.game?.phase ?? '',
            versio: peliVersio(),
            _subject: tilanne
              ? `Matkakirja — palaute: ${tilanne}`
              : 'Matkakirja — palaute',
          }),
        });
        if (!vastaus.ok) throw new Error(`HTTP ${vastaus.status}`);
        kentta.value = '';
        paluu.value = '';
        huomio.textContent = 'Kiitos! Viesti lähti perille.';
        nappi.textContent = 'Lähetetty';
      } catch (err) {
        console.warn('Palautteen lähetys ei onnistunut:', err);
        nappi.disabled = false;
        huomio.textContent = 'Lähetys ei onnistunut. Kokeile hetken päästä uudelleen.';
      }
    });
    return lohko;
  }

  /**
   * Varareitti, kun lomakepalvelua ei ole vielä asetettu: palaute
   * GitHubin kautta. Julkinen kanava, ei sähköpostiosoitetta.
   */
  palauteGithub(tilanne = '') {
    const laatikko = html('p', 'periaate-huomio');
    const linkki = html('a', 'periaate-linkki', 'Lähetä palautetta GitHubissa');
    const otsikko = tilanne
      ? `Palautetta: ${tilanne}`
      : 'Palautetta Unohdetusta aarteesta';
    const runko = `\n\n---\nMatkakirja v${peliVersio()}`
      + (tilanne ? `\nKohta pelissä: ${tilanne}` : '');
    linkki.href = 'https://github.com/ravelius/Matkakirja/issues/new'
      + `?title=${encodeURIComponent(otsikko)}`
      + `&body=${encodeURIComponent(runko)}`;
    linkki.target = '_blank';
    linkki.rel = 'noopener';
    laatikko.appendChild(linkki);
    return laatikko;
  }

  /**
   * Alakulman huutomerkki (omistajan toive): palaute juuri siitä
   * kohdasta peliä, jossa pelaaja on. Ikkuna kertoo lyhyesti mistä on
   * kyse ja näyttää, mikä tilanne kulkee viestin mukana.
   */
  naytaPalauteKulmasta() {
    if (document.querySelector('.palaute-lappu')) return;
    sfx.play('paper');
    const tilanne = this.palauteTilanne();
    const lappu = html('dialog', 'dialog periaate-lappu palaute-lappu');
    const kortti = html('div', 'dialog-card periaate-kortti');
    lappu.appendChild(kortti);

    const otsikko = html('h2', 'periaate-otsikko', 'Kerro mitä huomasit');
    kortti.appendChild(otsikko);

    const selitys = html('p', 'periaate-teksti');
    selitys.textContent = 'Tätä kautta voit lähettää palautetta '
      + 'mahdollisista virheistä tai kehitysehdotuksista juuri tässä '
      + 'kohdassa peliä. Kerro lyhyesti mitä näet ja mitä odotit.';
    kortti.appendChild(selitys);

    if (tilanne) {
      const rivi = html('p', 'palaute-tilanne');
      rivi.textContent = `Viestin mukana lähtee: ${tilanne}`;
      kortti.appendChild(rivi);
    }

    kortti.appendChild(this.palauteKentat(tilanne));

    const sulje = html('button', 'ghost periaate-sulje', 'Takaisin peliin');
    sulje.type = 'button';
    sulje.addEventListener('click', () => lappu.close());
    kortti.appendChild(sulje);

    lappu.addEventListener('close', () => lappu.remove());
    lappu.addEventListener('click', (e) => { if (e.target === lappu) lappu.close(); });
    document.body.appendChild(lappu);
    lappu.showModal();
    kortti.scrollTop = 0;
    otsikko.setAttribute('tabindex', '-1');
    otsikko.focus({ preventScroll: true });
  }

  /**
   * Lyhyt kuvaus pelin nykytilasta palauteviestin liitteeksi. Näkyy myös
   * pelaajalle, joten teksti on selkokieltä eikä koodin sisäisiä
   * tunnisteita: lauta ja kaupunki riittävät paikantamaan kohdan.
   */
  palauteTilanne() {
    const osat = [];
    try {
      // ariaLabel on pakan ainoa ihmisluettava nimi ("Euroopan
      // aarrekartta"); pelkkä id olisi "europe".
      const lauta = this.game?.pack?.ariaLabel;
      if (lauta) osat.push(lauta);
      const kaupunki = this.game?.cityOf?.();
      if (kaupunki?.name) osat.push(kaupunki.name);
    } catch (err) {
      console.warn('Pelitilanteen luku palautetta varten ei onnistunut:', err);
    }
    return osat.join(' · ');
  }

  suljeAloitusportti() {
    this.aloitusportti?.remove();
    this.aloitusportti = null;
  }

  /**
   * Avausteksti luettuna: omistajan ElevenLabsilla tuottama lukuääni
   * (assets/audio/intro-puhe.mp3). Selain ei salli ääntä ennen
   * ensimmäistä kosketusta — silloin puhe alkaa vasta ensimmäisestä
   * napautuksesta. Puuttuva tiedosto ei haittaa: virhe ohitetaan.
   */
  playIntroVoice() {
    if (!sfx.enabled) return;
    // Vain pitkä kertoja lukee avaustekstin: lyhyt lukee pelkän
    // matkakirjan kuvauksen ja ei kertojaa -tila ei mitään.
    if (kertojaTila() !== 'pitka') return;
    this.stopIntroVoice();
    const audio = new Audio('assets/audio/intro-puhe.mp3');
    audio.volume = puheVoima();
    this.pehmeaLoppu(audio);
    this.introVoice = audio;
    this.merkitsePuhuja(audio);
    audio.play().catch(() => {
      const aloita = () => {
        if (this.introVoice === audio && this.game.phase === 'pickstart' && !this.dead) {
          audio.play().catch(() => {});
        }
      };
      window.addEventListener('pointerdown', aloita, { once: true });
    });
  }

  stopIntroVoice() {
    const vanha = this.introVoice;
    this.introVoice = null;
    if (!vanha) return;
    vanha.pause();
    vanha.removeAttribute('src');
    this.vapautaPuhuja(vanha);
  }

  /**
   * Merkitsee äänen puhujaksi: tausta väistyy niin kauan kuin yksikin
   * puhuu. Vapautus tapahtuu kerran ja vain kerran — 'ended' ja
   * 'error' voivat molemmat laueta, ja kaksinkertainen vapautus
   * nostaisi taustan kesken toisen luennan.
   */
  merkitsePuhuja(audio) {
    if (!audio || audio.puhujaMerkitty) return;
    audio.puhujaMerkitty = true;
    puheAlkoi();
    const lopeta = () => this.vapautaPuhuja(audio);
    audio.addEventListener('ended', lopeta);
    audio.addEventListener('error', lopeta);
  }

  /** Vapauttaa äänen puhujan roolista; turvallista kutsua monta kertaa. */
  vapautaPuhuja(audio) {
    if (!audio?.puhujaMerkitty) return;
    audio.puhujaMerkitty = false;
    this.luennat?.delete(audio);
    puheLoppui();
  }

  /**
   * Saapumismerkinnän lukuääni. Soi kerran kun merkintä ilmestyy ja
   * vaikenee, kun tietoruutu vaihtaa aihetta. Puuttuva tiedosto (esim.
   * lauta jolle puhetta ei ole tuotettu) ohitetaan hiljaa.
   * `ekaLauseeseen` pysäyttää toiston ensimmäisen virkkeen jälkeiseen
   * hiljaisuuteen — kaiutinnappi jatkaa samasta kohdasta.
   */
  /*
   * Omistajan ehto 4.8.2026: radiotilassa kaupungin matkakirja saa
   * päivittyä, mutta ilman luenta-ääntä. Kaksi ääntä yhtä aikaa on
   * sekasotku. Yksi tarkistus kattaa kaikki kuusi luennan
   * aloituskohtaa, koska ne kaikki kulkevat tästä.
   */
  playDiaryVoice(url, { ekaLauseeseen = false, osuus = null, viive = 0 } = {}) {
    this.stopDiaryVoice();
    if (this.radioModuuli && !this.radioModuuli.luentaSallittu()) return;
    if (!url || !sfx.enabled) return;
    const audio = new Audio(url);
    audio.volume = puheVoima();
    this.pehmeaLoppu(audio);
    this.diaryVoice = audio;
    // Kirjanpito kaikista luennoista: pysäytys hiljentää myös sellaisen
    // äänen, joka ei enää ole diaryVoice mutta soi yhä.
    (this.luennat ??= new Set()).add(audio);
    // Tausta väistyy puheen ajaksi (omistajan havainto: puhetta oli
    // vaikea kuulla). Merkintä tehdään tähän eikä play():n jälkeen,
    // jotta se pariutuu varmasti vapautuksen kanssa myös silloin kun
    // soitto ei koskaan käynnisty.
    this.merkitsePuhuja(audio);
    if (ekaLauseeseen) {
      this.lauseTauko(url, osuus).then((raja) => {
        if (this.diaryVoice !== audio || raja == null) return;
        const vahti = () => {
          if (audio.jatkettu) {
            audio.removeEventListener('timeupdate', vahti);
            return;
          }
          // Häivytys alkaa jo ennen lauserajaa, jotta ääni on hiljainen
          // juuri silloin kun se loppuu — pelkkä pause() katkaisi sen
          // töksähtäen (omistajan havainto).
          if (audio.currentTime >= raja - LUENNAN_HAIPYMA_S) {
            audio.removeEventListener('timeupdate', vahti);
            this.haivytaAani(audio);
          }
        };
        audio.addEventListener('timeupdate', vahti);
      });
    }
    const aloita = () => {
      audio.play().then(() => {
        // play() on asynkroninen: jos luenta ehti vaihtua tai pysähtyä
        // käynnistyksen aikana, myöhässä herännyt ääni pysäytetään heti —
        // muuten kaksi luentaa soi päällekkäin (omistajan havainto).
        if (this.diaryVoice !== audio) audio.pause();
      }).catch((virhe) => {
        /*
         * Virhe näkyviin. Aiemmin se niellettiin kokonaan, ja silloin
         * "ääni ei kuulu" -vika ei jätä mitään jälkeä mihinkään.
         * iOS hylkää play():n NotAllowedError-virheellä, jos kutsu ei
         * enää liity käyttäjän eleeseen — sen erottaa nyt latausvirheestä.
         */
        console.warn('luenta ei käynnistynyt:', virhe?.name ?? virhe, url);
        if (this.diaryVoice === audio) this.diaryVoice = null;
      });
    };
    // Pieni hengähdys ennen luennan alkua (omistajan toive): kortti ehtii
    // asettua ennen kuin lukija aloittaa. Pysäytys ohittaa odottavan
    // luennan, koska diaryVoice ei enää osoita tähän ääneen.
    if (viive > 0) {
      setTimeout(() => {
        if (this.diaryVoice === audio) aloita();
      }, viive);
    } else {
      aloita();
    }
  }

  /**
   * Ensimmäisen virkkeen jälkeisen hengähdyksen paikka äänitteessä.
   * Pelkkä "ensimmäinen hiljaisuus" osui lukijan hengitykseen ja katkaisi
   * virkkeen kesken (omistajan havainto), joten raja valitaan nyt
   * tekstistä lasketun arvion läheltä: ensimmäisen virkkeen osuus koko
   * tekstistä kertoo, missä kohdassa puhetta virkkeen loppu suunnilleen
   * on, ja sitä lähin vähintään 0,3 sekunnin hiljaisuus voittaa.
   * Lasketaan kerran per tiedosto ja muistetaan.
   */
  lauseTauko(url, osuus = null) {
    this.lauseTauot ??= new Map();
    const avain = `${url}|${osuus == null ? '' : osuus.toFixed(3)}`;
    if (!this.lauseTauot.has(avain)) {
      const lupaus = (async () => {
        const ctx = sfx.ensureContext();
        if (!ctx) return null;
        const data = await fetch(url).then((r) => (r.ok ? r.arrayBuffer() : Promise.reject()));
        const buf = await ctx.decodeAudioData(data);
        const kanava = buf.getChannelData(0);
        const ikkuna = Math.floor(buf.sampleRate * 0.05);
        let huippu = 0;
        for (let i = 0; i < kanava.length; i += 16) huippu = Math.max(huippu, Math.abs(kanava[i]));
        const raja = huippu * 0.04;
        // Ikkunoittainen äänekkyys: siitä puheen alku ja loppu sekä
        // puheen sisään jäävät hiljaisuudet.
        const aanekas = [];
        for (let i = 0; i < kanava.length; i += ikkuna) {
          let maksimi = 0;
          const loppu = Math.min(i + ikkuna, kanava.length);
          for (let j = i; j < loppu; j += 4) maksimi = Math.max(maksimi, Math.abs(kanava[j]));
          aanekas.push(maksimi >= raja);
        }
        const eka = aanekas.indexOf(true);
        const vika = aanekas.lastIndexOf(true);
        if (eka < 0) return null;
        const s = 0.05; // yhden ikkunan kesto sekunteina
        const tauot = []; // vähintään 0,3 s hiljaisuuksien alkukohdat
        let alkoi = -1;
        for (let i = eka; i <= vika + 1; i++) {
          if (i <= vika && !aanekas[i]) {
            if (alkoi < 0) alkoi = i;
          } else {
            if (alkoi >= 0 && (i - alkoi) * s >= 0.3) tauot.push(alkoi * s);
            alkoi = -1;
          }
        }
        if (!tauot.length) return null; // yksivirkkeinen — soi kokonaan
        const puheAlku = eka * s;
        const puheLoppu = (vika + 1) * s;
        let valinta = null;
        if (osuus == null) {
          // Ilman tekstiarviota kelpaa ensimmäinen tauko 1,2 s jälkeen.
          valinta = tauot.find((t) => t >= 1.2) ?? null;
        } else {
          // Arvio virkkeen lopusta puheen kestoon sovitettuna — lähin
          // tauko voittaa, jolloin hengitystauko kesken virkkeen häviää
          // aina oikealle virkerajalle.
          const arvio = puheAlku + (puheLoppu - puheAlku) * osuus;
          for (const t of tauot) {
            if (valinta == null || Math.abs(t - arvio) < Math.abs(valinta - arvio)) valinta = t;
          }
        }
        // Tauon alku + pieni hengähdys, jotta sana ehtii loppuun.
        return valinta == null ? null : valinta + 0.15;
      })().catch(() => null);
      this.lauseTauot.set(avain, lupaus);
    }
    return this.lauseTauot.get(avain);
  }

  /**
   * Pehmeä loppu puhetiedostoille: viimeinen neljännessekunti häivytetään
   * ja toisto pysäytetään juuri ennen tiedoston reunaa. ElevenLabsin
   * tiedosto päättyy keskeltä signaalia, ja kova reuna kuului pienenä
   * töksähdyksenä (omistajan havainto etusivulla) — pehmennys tehdään
   * toistossa, joten tiedostoja ei tarvinnut generoida uusiksi.
   */
  pehmeaLoppu(audio) {
    const perus = audio.volume;
    let rampissa = false;
    const rullaa = () => {
      if (audio.paused || !audio.duration) {
        rampissa = false;
        audio.volume = perus;
        return;
      }
      const jaljella = audio.duration - audio.currentTime;
      /*
       * Ääntä EI pysäytetä ennen aikojaan.
       *
       * Aiemmin soitin pysäytettiin, kun loppuun oli 50 millisekuntia —
       * ja sitä ennen ääni oli jo häivytetty puolentoista sekunnin ajan.
       * Yhdessä ne söivät viimeisen sanan. Nyt nauhoitus soi loppuun
       * asti ja vain aivan viimeinen hetki vaimenee, jottei pysäytys
       * napsahda.
       */
      if (jaljella <= LOPUN_HILJAISUUS_S) {
        // Pysäytys osuu jo vaienneeseen ääneen eikä voi napsahtaa.
        audio.volume = 0;
        audio.pause();
        rampissa = false;
        return;
      }
      if (jaljella < LOPUN_HAIPYMA_S) {
        const matka = (jaljella - LOPUN_HILJAISUUS_S) / (LOPUN_HAIPYMA_S - LOPUN_HILJAISUUS_S);
        audio.volume = perus * Math.max(0, Math.min(1, matka));
      }
      requestAnimationFrame(rullaa);
    };
    // timeupdate on liian harva häivytykseen (~4 krt/s): se vain
    // käynnistää tiheän rampin, kun loppu lähestyy. Puoli sekuntia
    // ennen loppua on riittävä varoaika 50 millisekunnin häivytykselle.
    audio.addEventListener('timeupdate', () => {
      if (rampissa || !audio.duration) return;
      if (audio.duration - audio.currentTime < LOPUN_HAIPYMA_S + 0.5) {
        rampissa = true;
        requestAnimationFrame(rullaa);
      }
    });
  }

  /**
   * Häivyttää soivan luennan pois annetussa ajassa. Käytetään myös
   * lyhyen kertojan lauserajalla: siellä ääni pysähtyi ennen kesken
   * sanaa, koska pause() tuli ilman häivytystä.
   */
  haivytaAani(audio, kesto = LUENNAN_HAIPYMA_S * 1000) {
    const perus = audio.volume;
    const t0 = performance.now();
    const askel = (nyt) => {
      if (audio.paused) return;
      const t = Math.min(1, Math.max(0, (nyt - t0) / kesto));
      audio.volume = perus * pehmene(1 - t);
      if (t < 1) requestAnimationFrame(askel);
      else audio.pause();
    };
    requestAnimationFrame(askel);
  }

  stopDiaryVoice() {
    this.diaryVoice = null;
    this.luentaTauolla = null;
    // Kaikki luennat kiinni — myös mahdollinen myöhästelijä, joka ei
    // enää ollut diaryVoice mutta soi yhä.
    for (const audio of [...(this.luennat ?? [])]) {
      audio.pause();
      audio.removeAttribute('src');
      // Vapautus ennen tyhjennystä: muuten laskuri jäisi plussalle eikä
      // tausta palaisi enää koskaan täyteen voimaan.
      this.vapautaPuhuja(audio);
    }
    this.luennat?.clear();
  }

  /** Matkalaukku: matkan tiedot, Aarnin luettelo ja tavarat. */
  openPassport() {
    this.renderProgress();
    this.renderAarteet();
    this.renderFinds();
    if (!this.passportDialog.open) this.passportDialog.showModal();
    this.nollaaDialoginVieritys(this.passportDialog);
    this.asemoiLaukku();
  }

  /*
   * AARNIN LUETTELO: mitä ollaan etsimässä ja mikä on jo löytynyt.
   *
   * Tämä tuli vihreän passin tilalle (omistaja 5.8.2026: "koko vihreän
   * passin voi poistaa, tehdään sen tilalle pääaarteista oma osio").
   * Leimat kertoivat vain missä on käyty, minkä matkarivin Sijainti
   * kertoo jo — luettelo kertoo mihin ollaan menossa.
   *
   * NIMISTÖ ON SITOVA (docs/tyolista-opukselle.md, päätös 4.8.2026):
   * pelaajalle näkyvissä teksteissä aarre on "unohdettu aarre" eikä
   * "pääaarre" eikä "tähti", ja luettelon erisnimi on Aarnin luettelo.
   * Rivien nimet tulevat lautojen omista aarrelaatoista, joten luettelo
   * ei voi mennä eri tahtiin pelin kanssa.
   *
   * LÖYTYNYT TARKOITTAA TÄTÄ MATKAA. Aarteen löytymistä ei tallenneta
   * pelikertojen yli (js/passport.js tuntee vain lautaleimat ja
   * linssit), joten luettelo kertoo rehellisesti tämän matkan tilanteen
   * eikä väitä muistavansa enempää.
   */
  renderAarteet() {
    if (!this.passportAarteet) return;
    const { game } = this;
    this.passportAarteet.textContent = '';

    /*
     * VAIN LÖYTYNEET NIMELTÄ, LOPUT LUKUNA.
     *
     * Ensin tässä luki koko luettelo rivi riviltä, ja jokaisen perässä
     * "KATEISSA". Se oli sekä spoileri että tautologiaa: luettelo
     * paljasti kaikki yksitoista nimeä ennen kuin pelaaja oli löytänyt
     * yhtään, ja "kateissa" toisti sen minkä himmennys jo kertoi.
     * Omistaja: "laita vain että kateissa: (määrä) — vasta sitten kun
     * jotain löytyy, niin sen nimi tulee Aarnin luetteloon."
     *
     * Nyt luettelo täyttyy matkan mukana, kuten Aarnin oma luettelo
     * täyttyi. Kateissa-luku kertoo silti kuinka pitkä matka on jäljellä.
     */
    const kaikki = PACKS.map((pakkaus) => pakkaus.tokens?.types?.star)
      .filter((aarre) => aarre?.name);

    /*
     * LÖYTYNYT TARKOITTAA TÄTÄ MATKAA. Aarteen löytymistä ei tallenneta
     * pelikertojen yli (js/passport.js tuntee vain lautaleimat ja
     * linssit), joten luettelo kertoo rehellisesti tämän matkan
     * tilanteen eikä väitä muistavansa enempää.
     */
    const loydetyt = [];
    if (game.player?.hasStar) {
      const oma = game.pack?.tokens?.types?.star;
      if (oma?.name) loydetyt.push(oma);
    }

    for (const aarre of loydetyt) {
      const rivi = html('div', 'aarre-rivi loytynyt');
      const merkki = html('span', 'aarre-merkki');
      // ◈ on pelin oma aarremerkki (docs: laatan ja nappulan merkki).
      merkki.textContent = '◈';
      rivi.appendChild(merkki);
      rivi.appendChild(html('span', 'aarre-nimi', aarre.name));
      rivi.appendChild(html('span', 'aarre-tila', 'löytyi'));
      this.passportAarteet.appendChild(rivi);
    }

    const kateissa = Math.max(0, kaikki.length - loydetyt.length);
    const rivi = html('div', 'aarre-rivi aarre-kateissa');
    rivi.appendChild(html('span', 'aarre-nimi', 'Kateissa'));
    rivi.appendChild(html('span', 'aarre-luku', String(kateissa)));
    this.passportAarteet.appendChild(rivi);
  }

  /*
   * LAUKKU AUKEAA PILLERIN ALLE (omistaja 5.8.2026: "eikös tämä
   * matkalaukku pitänyt aueta suoraan tuon pillerin alapuolelle").
   *
   * <dialog> keskittää itsensä ruudulle, eikä sitä voi asemoida
   * pelkällä CSS:llä sen napin suhteen, joka sen avasi — nappi on
   * ylärivissä ja dialogi on ylimmässä kerroksessa, eivätkä ne ole
   * sukua toisilleen. Paikka lasketaan siis avattaessa.
   *
   * Vasen reuna kohdistetaan pilleriin mutta pidetään ruudulla: kapealla
   * puhelimella kortti on lähes ruudun levyinen, ja pilleriin
   * kohdistettuna sen oikea laita valuisi yli.
   */
  asemoiLaukku() {
    const kortti = this.passportDialog?.querySelector('.dialog-card');
    if (!kortti || !this.turnPill) return;
    const pilleri = this.turnPill.getBoundingClientRect();
    if (!pilleri.width) return;
    const VARA = 8;
    const leveys = kortti.getBoundingClientRect().width || kortti.offsetWidth;
    const suurinVasen = Math.max(VARA, window.innerWidth - leveys - VARA);
    const vasen = Math.min(Math.max(VARA, pilleri.left), suurinVasen);
    /*
     * KIINNI YLÄPALKKIIN, EI PILLERIN ALLE VÄLIN PÄÄHÄN.
     *
     * Omistaja: "laukun yläreunan voisi ottaa kokonaan pois, niin että
     * näyttäisi että laukku aukeaa suoraan yläpalkista." Rako palkin ja
     * kortin välissä tekisi siitä ponnahdusikkunan; kiinni oleva lukee
     * laatikoksi, joka vedetään ulos palkista. Yläreunus ja yläkulmien
     * pyöristys ovat pois CSS:ssä samasta syystä.
     */
    const palkki = document.querySelector('.topbar')?.getBoundingClientRect();
    const ylin = palkki?.bottom ?? pilleri.bottom;
    this.passportDialog.style.left = `${Math.round(vasen)}px`;
    this.passportDialog.style.top = `${Math.round(ylin)}px`;
    this.passportDialog.classList.add('pillerin-alla');
  }

  /**
   * Matkasaalis passissa: tähti, hevosenkengät ja jalokivet. Nämä näkyivät
   * ennen erillisessä pelaajapaneelissa, joka vei tilaa kartalta.
   */
  renderFinds() {
    const { game } = this;
    const p = game.player;
    this.passportFinds.textContent = '';

    const rivi = (icon, text) => {
      const row = html('div', 'find');
      row.appendChild(icon);
      row.appendChild(html('span', 'find-text', text));
      this.passportFinds.appendChild(row);
    };

    // Isommat kuvat ja selite alla — tavarat kuin matkamuistohyllyllä
    // (omistajan toive).
    if (p.hasStar) rivi(tokenIconSvg('star', 44), game.pack.tokens.types.star.name);
    if (p.horseshoes) rivi(tokenIconSvg('horseshoe', 44), `Hevosenkenkiä ${p.horseshoes}`);

    // Jalokivet tyypeittäin: sama laji voi toistua monelta laudalta.
    const gems = p.finds.filter((t) => (game.tokenTypes[t]?.value ?? 0) > 0);
    const counts = new Map();
    for (const type of gems) counts.set(type, (counts.get(type) ?? 0) + 1);
    for (const [type, n] of counts) {
      rivi(tokenIconSvg(type, 44), `${game.tokenTypes[type].name}${n > 1 ? ` ×${n}` : ''}`);
    }

    /*
     * Varusteet: tämän matkan aikana löydetyt linssit.
     *
     * Lista luetaan pelaajan omasta linssit-kentästä eikä finds-listasta
     * kahdesta syystä: finds saa 'linssi'-merkinnän myös silloin, kun
     * kotelo oli tyhjä (kaikki jo omistettu), ja yllä oleva suodatin
     * päästää läpi vain arvokkaat laatat — linssi on arvoton puntina.
     *
     * Nimi tulee linssimoduulista, jos se on jo ladattu. Ellei ole,
     * rivi kertoo silti mitä laukussa on: laattatyypin nimi on
     * "Taikalasi", ei tyhjä.
     */
    /*
     * Omistetut EIKÄ pelaajan oma kenttä.
     *
     * p.linssit on se, mitä pelaaja on LÖYTÄNYT. Omistukseen kuuluu
     * lisäksi passin leimat (aiemmat pelikerrat) ja kehittäjätilan
     * lahja — ja juuri jälkimmäinen puuttui: kehittäjätilassa radio
     * toimi yläpalkin valitsimesta mutta laukku väitti olevansa tyhjä.
     * Omistuksesta on yksi totuus, ja se on omistus.js.
     */
    const omat = this.linssiTuki?.omistus?.omistetut?.(game, p) ?? new Set(p.linssit ?? []);
    for (const tunnus of omat) {
      const linssi = this.linssiTuki?.kaikki.find((l) => l.tunnus === tunnus) ?? null;
      /*
       * LINSSIN OMA KUVAKE, EI LAATTATYYPIN.
       *
       * Kaikki kolme varustetta piirtyivät samana suurennuslasina, koska
       * ne saivat laattatyypin 'linssi' kuvakkeen — laatta on se, mistä
       * varuste löytyi, ei se mitä se on. Omistajan havainto: "näihin
       * voisi päivittää kuvakkeet vastaamaan paremmin tavaroiden
       * ominaisuuksia."
       *
       * Kuvake tulee linssimoduulista samassa muodossa kuin
       * valitsimessa (24 × 24 -polkuja ilman <svg>-kuorta), joten
       * laukussa ja valikossa on sama kuva samasta esineestä. Jos
       * moduulia ei ole vielä ladattu, varalla on laattatyypin kuvake.
       */
      rivi(
        linssi?.ikoni ? viivaIkoniSvg(linssi.ikoni, 44) : tokenIconSvg('linssi', 44),
        linssi?.nimi ?? game.tokenTypes.linssi?.name ?? 'Varuste',
      );
    }

    if (!this.passportFinds.childElementCount) {
      this.passportFinds.appendChild(html('p', 'muted', 'Laukku on vielä tyhjä.'));
    }
  }

  /**
   * Nimikilpi laukun alalaidasta: pelin tekijänoikeus, tekijätiedot ja
   * luettelo kaikista aineistoista, joista peli on koottu.
   *
   * Sisältö rakennetaan VASTA ensimmäisellä avauksella ja jää sitten
   * paikoilleen. Rivejä on toista sataa, eikä useimmilla pelikerroilla
   * ikkunaa avata lainkaan — sama päätös kuin päivityslokissa
   * (js/main.js avaaMuutokset).
   */
  avaaLahteet() {
    if (!this.lahteetDialog || !this.lahteetSisus) return;
    if (!this.lahteetRakennettu) {
      const sisus = this.lahteetSisus;
      sisus.replaceChildren();

      sisus.appendChild(html('p', 'lahteet-alaotsikko', PELI.englanniksi));
      sisus.appendChild(html('p', 'lahteet-copyright', PELI.copyright));
      sisus.appendChild(html('p', 'lahteet-teksti', PELI.tekija));
      sisus.appendChild(html('p', 'lahteet-teksti', PELI.apu));
      sisus.appendChild(html('p', 'lahteet-teksti', PELI.ehdot));
      sisus.appendChild(html('p', 'lahteet-teksti', PELI.johdanto));

      sisus.appendChild(html('h3', 'lahteet-otsikko', 'Lähteet ja aineistot'));
      sisus.appendChild(html('p', 'lahteet-teksti', PELI.kolmannet));

      for (const ryhma of LAHTEET) {
        sisus.appendChild(html('h4', 'lahteet-ryhma', ryhma.otsikko));
        if (ryhma.johdanto) {
          sisus.appendChild(html('p', 'lahteet-ryhma-johdanto', ryhma.johdanto));
        }
        const lista = html('ul', 'lahteet-lista');
        for (const rivi of ryhma.rivit) {
          const kohta = html('li');
          kohta.appendChild(html('span', 'lahteet-nimi', rivi.nimi));
          if (rivi.tekija) kohta.appendChild(html('span', 'lahteet-tekija', rivi.tekija));
          /*
           * Kirjaamaton lisenssi merkitään näkyvästi eikä jätetä pois.
           * Tyhjä kohta luettaisiin "ei ehtoja", ja se olisi juuri
           * väärä johtopäätös — epäselvyyden pitää näkyä.
           */
          kohta.appendChild(html(
            'span',
            rivi.lisenssi ? 'lahteet-lisenssi' : 'lahteet-lisenssi epaselva',
            rivi.lisenssi ?? 'Lisenssi epäselvä',
          ));
          if (rivi.huom) kohta.appendChild(html('span', 'lahteet-huom', rivi.huom));
          lista.appendChild(kohta);
        }
        sisus.appendChild(lista);
      }

      sisus.appendChild(html('p', 'lahteet-lopetus',
        `${LAHTEITA} aineistoa. Yksittäisen valokuvan, äänitteen ja väitteen `
        + 'oma lähde näkyy siinä kohdassa peliä, jossa se esitetään.'));
      this.lahteetRakennettu = true;
    }
    if (!this.lahteetDialog.open) this.lahteetDialog.showModal();
    this.nollaaDialoginVieritys(this.lahteetDialog);
  }

  // --- linssit: valitsin, kerros ja selitekortti -----------------------------

  /**
   * Linssikoneisto tuodaan DYNAAMISESTI ja tarkalleen kerran.
   *
   * Staattinen tuonti kaataisi yhden tiedoston version kokoajan
   * (tools/build-standalone.mjs vaatii jokaisen from-tuonnin
   * MODULES-listalleen, eivätkä linssit kuulu sinne — suunnitelman luku
   * 2.1). Samalla tämä pitää pelin käynnistyksen ennallaan: linssien
   * metatiedot ovat kilotavuja, ja raskas aineisto haetaan vasta kun
   * linssi sytytetään.
   *
   * Epäonnistuminen ei ole virhe vaan hyväksytty raja: yhden tiedoston
   * versiossa linssejä ei ole, ja silloin koko valitsin jää pois.
   */
  /**
   * Maailmanradion moduuli. OMA laiska tuontinsa eikä osa
   * lataaLinssit():ia: jos radio ei lataudu (yhden tiedoston versio),
   * muiden linssien pitää silti toimia.
   */
  lataaRadio() {
    if (!this.radioLataus) {
      this.radioLataus = import('./linssit/radio.js')
        .then((moduuli) => { this.radioModuuli = moduuli; return moduuli; })
        .catch((syy) => {
          console.warn('Maailmanradiota ei voitu ladata; linssi jää pois.', syy);
          return null;
        });
    }
    return this.radioLataus;
  }

  /*
   * Erillistä X-nappia EI ole.
   *
   * Sellainen oli hetken ruudun oikeassa yläkulmassa, mutta soittimessa
   * on jo virtakytkin, joka sammuttaa koko radiotilan (onSulje).
   * Omistaja 4.8.2026: "Poista myös yläreunan x. Riittää kun radiosta
   * saa suljettua." Kaksi sulkutapaa samalle tilalle on yksi liikaa, ja
   * kytkin on se, joka kuuluu laitteeseen.
   */

  /** Onko radiotila päällä? Synkroninen: piirto kysyy tätä. */
  radioPaalla() {
    return this.radioModuuli?.paalla() === true;
  }

  /*
   * ===================================================================
   * VERTAILUTILA (v321)
   * ===================================================================
   *
   * Omistajan malli 7.8.2026: *"vertailulinssi vois toimia hieman eri
   * tavalla kuin nyt. eli ei upoteta näkymää tutki osioon vaan linssi
   * toimisi suoraan karttanäkymässä mutta muuttaisi sen niin että
   * kaupungit poistuisivat ja maiden rajat näkyisivät selvemmin."*
   *
   * Tila on rakennettu radiotilan mallin mukaan: bodyn luokka piilottaa
   * muun toiminnan, kartalle tulee oma kerros ja alanapit korvautuvat
   * omalla palkilla. Näin tila purkautuu varmasti myös silloin, kun
   * linssi sammuu jotain muuta kautta.
   *
   * Valinta on enintään kolme maata + Suomi valmiina vaihtoehtona.
   * Suomi ei ole erikoistapaus koodissa: se on tavallinen valinta,
   * joka vain asetetaan valmiiksi, ja sen voi ottaa poiskin.
   */
  vertailuPaalla() {
    return document.body.classList.contains('vertailu-tila');
  }

  /** Enimmäismäärä: kolme maata + Suomi valmiina. */
  static get VERTAILU_MAX() { return 4; }

  /** Kytkee vertailutilan päälle tai pois. */
  tahdistaVertailu(halutaan) {
    if (halutaan === this.vertailuPaalla()) {
      if (halutaan) this.rakennaVertailuPalkki();
      return;
    }
    document.body.classList.toggle('vertailu-tila', halutaan);
    if (halutaan) {
      /*
       * Suomi valmiina vaihtoehtona (omistajan toive). Se otetaan
       * mukaan vain, jos laudalla on Suomen muoto — Afrikan laudalla
       * ei ole, eikä tyhjää valintaa kannata tehdä.
       */
      if (!this.vertailuValinnat?.length) {
        const suomiOn = Boolean(this.game.pack.map?.countryShapes?.FIN);
        this.vertailuValinnat = suomiOn ? ['FIN'] : [];
      }
      this.piirraVertailuMaat();
      this.rakennaVertailuPalkki();
    } else {
      this.vertailuKerros?.remove();
      this.vertailuKerros = null;
      this.vertailuPalkki?.remove();
      this.vertailuPalkki = null;
      this.suljeVertailuNakyma();
    }
    this.drawTargets();
  }

  /**
   * Kaikkien maiden muodot omaan kerrokseensa napautettavina.
   *
   * Kerros menee kaupunkien tilalle samaan juureen: se kiertyy ja
   * zoomautuu kartan mukana ilman omaa laskentaa. Nimi kirjoitetaan
   * vain maille, joiden muoto on tarpeeksi leveä — muuten pikkuvaltiot
   * täyttäisivät kartan kaunokirjoituksella.
   */
  piirraVertailuMaat() {
    const map = this.game.pack.map;
    const muodot = map?.countryShapes;
    if (!muodot || !this.svg) return;
    this.vertailuKerros?.remove();
    this.vertailuKerros = el('g', { class: 'vertailu-maat' }, this.boardRoot ?? this.svg);
    for (const [iso, maa] of Object.entries(muodot)) {
      if (!maa?.renkaat?.length) continue;
      const d = maa.renkaat
        .map((r) => `M${r.map(([x, y]) => `${x},${y}`).join(' L')}Z`)
        .join(' ');
      const valittu = this.vertailuValinnat?.includes(iso);
      const polku = el('path', {
        d,
        class: `vertailu-maa${valittu ? ' valittu' : ''}`,
        'aria-label': maa.nimi,
      }, this.vertailuKerros);
      polku.addEventListener('click', (e) => {
        // Napautus ei saa vuotaa kartalle: maailmankartalla se
        // zoomaisi ja muualla kutistaisi päiväkirjan.
        e.stopPropagation();
        this.valitseVertailuMaa(iso);
      });
      if (maa.leveys >= 60) {
        const koko = Math.max(11, Math.min(22, (maa.leveys * 0.8) / Math.max(4, maa.nimi.length)));
        const nimi = el('text', {
          x: maa.keskus[0],
          y: maa.keskus[1],
          class: 'vertailu-maa-nimi',
          'text-anchor': 'middle',
          'font-size': koko.toFixed(0),
        }, this.vertailuKerros);
        nimi.textContent = maa.nimi;
      }
    }
  }

  /**
   * MAIDEN TIEDOT -TILA (v350).
   *
   * Sama kartan tila kuin vertailussa — kaupungit väistyvät ja maat
   * ovat napautettavia — mutta ele tarkoittaa eri asiaa: vertailu
   * KERÄÄ maita listalle, tämä AVAA yhden maan luettavaksi.
   *
   * Napautus valitsee maan: sen rajat korostuvat ja nimen viereen
   * ilmestyy "i", josta maan lehti aukeaa. Kaksi vaihetta yhden sijaan
   * siksi, että kartalla osuu helposti väärään maahan — ensimmäinen
   * napautus näyttää mihin osui, vasta "i" avaa lehden.
   */
  tahdistaMaatiedot(halutaan) {
    const paalla = document.body.classList.contains('maatiedot-tila');
    if (halutaan === paalla) return;
    document.body.classList.toggle('maatiedot-tila', halutaan);
    if (halutaan) {
      this.maatiedotValittu = null;
      this.piirraMaatiedotMaat();
    } else {
      this.maatiedotKerros?.remove();
      this.maatiedotKerros = null;
      this.maatiedotValittu = null;
    }
    this.drawTargets();
  }

  /** Maiden muodot napautettavina; valitulle nimi ja "i". */
  piirraMaatiedotMaat() {
    const muodot = this.game.pack.map?.countryShapes;
    if (!muodot || !this.svg) return;
    this.maatiedotKerros?.remove();
    this.maatiedotKerros = el('g', { class: 'maatiedot-maat' }, this.boardRoot ?? this.svg);
    for (const [iso, maa] of Object.entries(muodot)) {
      if (!maa?.renkaat?.length) continue;
      const d = maa.renkaat
        .map((r) => `M${r.map(([x, y]) => `${x},${y}`).join(' L')}Z`)
        .join(' ');
      const valittu = this.maatiedotValittu === iso;
      const polku = el('path', {
        d,
        class: `maatiedot-maa${valittu ? ' valittu' : ''}`,
        'aria-label': maa.nimi,
      }, this.maatiedotKerros);
      polku.addEventListener('click', (e) => {
        // Napautus ei saa vuotaa kartalle (zoom, päiväkirjan kutistus).
        e.stopPropagation();
        this.maatiedotValittu = valittu ? null : iso;
        sfx.play('paper');
        this.piirraMaatiedotMaat();
      });
      if (!valittu) continue;
      /*
       * Nimi ja "i" vain valitulle maalle. Jos kaikkien maiden nimet
       * piirrettäisiin, kartta täyttyisi tekstistä eikä valinta
       * erottuisi mitenkään — ja juuri valinnan näkyminen on tämän
       * kahden vaiheen koko tarkoitus.
       */
      const koko = Math.max(12, Math.min(24, (maa.leveys * 0.8) / Math.max(4, maa.nimi.length)));
      const nimi = el('text', {
        x: maa.keskus[0],
        y: maa.keskus[1],
        class: 'maatiedot-nimi',
        'text-anchor': 'middle',
        'font-size': koko.toFixed(0),
      }, this.maatiedotKerros);
      nimi.textContent = `${maa.nimi} ⓘ`;
      nimi.addEventListener('click', (e) => {
        e.stopPropagation();
        this.avaaMaalehti(iso);
      });
    }
  }

  /** Maa valintaan tai pois siitä. Täysi lista ei ota enempää. */
  valitseVertailuMaa(iso) {
    const lista = this.vertailuValinnat ?? [];
    if (lista.includes(iso)) {
      this.vertailuValinnat = lista.filter((k) => k !== iso);
    } else {
      if (lista.length >= UI.VERTAILU_MAX) {
        const laatikko = this.buildToast({
          kind: 'info',
          text: `Vertailuun mahtuu ${UI.VERTAILU_MAX} maata`,
          sub: 'Poista ensin jokin lappu alapalkista.',
        });
        setTimeout(() => this.removeToast(laatikko), TOAST_MS.default);
        return;
      }
      this.vertailuValinnat = [...lista, iso];
    }
    sfx.play('paper');
    this.piirraVertailuMaat();
    this.rakennaVertailuPalkki();
  }

  /**
   * Alapalkki Tutki- ja nopanheittonappien tilalle: valitut maat
   * lappuina ja oikeassa reunassa Vertaa-nappi.
   *
   * Palkki on bodyn lapsi eikä kartan: se ei saa vieriä kartan mukana
   * eikä kadota kosketuskohteitaan zoomatessa (sama ratkaisu kuin
   * Tutki-ikkunan sivunavigaatiossa).
   */
  rakennaVertailuPalkki() {
    if (!this.vertailuPaalla()) return;
    if (!this.vertailuPalkki) {
      this.vertailuPalkki = html('div', 'vertailu-palkki');
      document.body.appendChild(this.vertailuPalkki);
    }
    const palkki = this.vertailuPalkki;
    palkki.replaceChildren();
    const valitut = this.vertailuValinnat ?? [];
    const muodot = this.game.pack.map?.countryShapes ?? {};
    if (!valitut.length) {
      palkki.appendChild(html('p', 'vertailu-ohje', 'Napauta kartalta maat, joita haluat verrata.'));
      return;
    }
    for (const [i, iso] of valitut.entries()) {
      const lappu = html('button', 'vertailu-lappu');
      lappu.type = 'button';
      lappu.title = 'Poista vertailusta';
      const laatta = html('span', `vertailu-laatta ${VERTAILUVARIT[i] ?? ''}-laatta`);
      lappu.appendChild(laatta);
      lappu.appendChild(document.createTextNode(muodot[iso]?.nimi ?? iso));
      lappu.addEventListener('click', () => this.valitseVertailuMaa(iso));
      palkki.appendChild(lappu);
    }
    const vertaa = html('button', 'primary vertailu-vertaa', 'Vertaa');
    vertaa.type = 'button';
    vertaa.disabled = valitut.length < 2;
    vertaa.title = valitut.length < 2 ? 'Valitse vähintään kaksi maata' : 'Avaa vertailu';
    vertaa.addEventListener('click', () => this.avaaVertailuNakyma());
    palkki.appendChild(vertaa);
  }

  /**
   * Vertailunäkymä: valitut maat rinnakkain samoilla asteikoilla.
   *
   * Yläreunassa maiden napit (kytke päälle tai pois) ja "Muuta
   * valintoja", joka palaa kartalle — vertailu on siis kaksisuuntainen
   * eikä umpikuja (omistajan malli). Ylärivin napit eivät muuta
   * KARTAN valintaa vaan sitä, mitkä valituista piirretään: kartalta
   * poistaminen on eri asia kuin viivan sammuttaminen hetkeksi.
   *
   * Aineisto ja piirtäjä haetaan laiskasti kuten Maa numeroina
   * -sivulla: yhden tiedoston versio jää ilman kumpaakin ja saa saman
   * kohteliaan verkkoyhteysrivin.
   */
  async avaaVertailuNakyma() {
    const dialogi = document.getElementById('vertailu-dialog');
    const sisalto = document.getElementById('vertailu-sisalto');
    const ylarivi = document.getElementById('vertailu-ylarivi');
    if (!dialogi || !sisalto || !ylarivi) return;
    this.vertailuPois ??= new Set();
    if (!dialogi.open) dialogi.showModal();
    this.nollaaDialoginVieritys(dialogi);
    sisalto.replaceChildren(html('p', 'johdanto', 'Haetaan tilastoja…'));
    this.rakennaVertailuYlarivi();
    try {
      const { lataaMaakayrat, piirraVertailu } = await import('./maakayrat.js');
      const data = await lataaMaakayrat();
      if (!dialogi.open) return;
      if (!data) {
        sisalto.replaceChildren(html('p', 'johdanto',
          'Tämä näkymä tarvitsee verkkoyhteyden ensimmäisellä avauksella '
          + '— luvut haetaan silloin talteen.'));
        return;
      }
      const isot = (this.vertailuValinnat ?? []).filter((iso) => !this.vertailuPois.has(iso));
      const kortit = {};
      const muodot = this.game.pack.map?.countryShapes ?? {};
      for (const iso of isot) {
        kortit[iso] = {
          nimi: muodot[iso]?.nimi ?? iso,
          kartta: this.piirraMaakartta(iso, null),
          tunnusluvut: this.rakennaVertailuTunnusluvut(iso),
        };
      }
      piirraVertailu(sisalto, isot, data, { kortit });
    } catch (syy) {
      console.error(syy);
      sisalto.replaceChildren(html('p', 'johdanto', 'Tilastoja ei saatu haettua.'));
    }
  }

  /** Ylärivin napit: maat päälle/pois ja paluu kartalle. */
  rakennaVertailuYlarivi() {
    const ylarivi = document.getElementById('vertailu-ylarivi');
    if (!ylarivi) return;
    ylarivi.replaceChildren();
    const muodot = this.game.pack.map?.countryShapes ?? {};
    for (const [i, iso] of (this.vertailuValinnat ?? []).entries()) {
      const paalla = !this.vertailuPois.has(iso);
      const nappi = html('button', 'vertailu-lappu');
      nappi.type = 'button';
      nappi.setAttribute('aria-pressed', paalla ? 'true' : 'false');
      nappi.appendChild(html('span', `vertailu-laatta ${VERTAILUVARIT[i] ?? ''}-laatta`));
      nappi.appendChild(document.createTextNode(muodot[iso]?.nimi ?? iso));
      nappi.addEventListener('click', () => {
        if (this.vertailuPois.has(iso)) this.vertailuPois.delete(iso);
        else this.vertailuPois.add(iso);
        void this.avaaVertailuNakyma();
      });
      ylarivi.appendChild(nappi);
    }
    const muuta = html('button', 'ghost vertailu-muuta', 'Muuta valintoja');
    muuta.type = 'button';
    muuta.addEventListener('click', () => this.suljeVertailuNakyma());
    ylarivi.appendChild(muuta);
  }

  /** Sulkee näkymän ja palaa karttaan valitsemaan maita. */
  suljeVertailuNakyma() {
    const dialogi = document.getElementById('vertailu-dialog');
    if (dialogi?.open) dialogi.close();
  }

  /**
   * Maan tunnusluvut vertailukorttiin tiiviinä rivinä.
   *
   * Erillään maaosaston naytaMaaTunnusluvut-piirrosta tarkoituksella:
   * se rakentaa palkit, tervehdykset ja V-Dem-infoikkunan kiinteisiin
   * elementteihin, eikä kortille kuulu niistä yksikään. Yhteistä on
   * vain lähde (MAATIEDOT), ja luvut näytetään samassa muodossa.
   */
  rakennaVertailuTunnusluvut(iso) {
    const tiedot = (MAATIEDOT[this.game.pack.id] ?? {})[iso] ?? null;
    if (!tiedot) return null;
    const lista = html('ul', 'vertailu-luvut');
    const rivi = (nimio, arvo) => {
      if (!arvo) return;
      const li = html('li', '');
      li.appendChild(html('span', 'vertailu-luku-nimio', nimio));
      li.appendChild(document.createTextNode(arvo));
      lista.appendChild(li);
    };
    rivi('Väkiluku ', tiedot.vakiluku);
    rivi('Pinta-ala ', tiedot.pintaAla);
    rivi('Tulot ', tiedot.keskitulo?.arvo);
    rivi('V-Dem ', tiedot.demokratia?.arvo);
    return lista.children.length ? lista : null;
  }

  /**
   * Kytkee maailmanradion päälle tai pois.
   *
   * Kutsutaan joka kerta kun linssi sytytetään, myös kun sama linssi
   * sytytetään uudelleen. Se on turvallista: moottori sammuttaa aina
   * ensin, ja paalle() purkaa vielä itsekin vanhan tilan.
   */
  async tahdistaRadio(halutaan) {
    const radio = await this.lataaRadio();
    if (!radio || this.dead) return;
    if (halutaan) {
      // Kertoja vaikenee radion tieltä. Radio sulkee itse kaupungin
      // äänimaiseman, mutta se ei tunne luentaa eikä voi tuoda ui.js:ää.
      this.stopDiaryVoice();
      /*
       * Radiotilassa ruudulla on vain kartta ja soitin.
       *
       * Omistajan toive 4.8.2026: "Piilota Matkakirja ja alanapit radion
       * ollessa käytössä. Poista myös yläreunan x. Riittää kun radiosta
       * saa suljettua."
       *
       * Radiotilassa peli on tauolla: matkustustavan valinta ja
       * matkakirjan kortti eivät koske mihinkään, mitä radiossa voi
       * tehdä. Piilotus tehdään bodyn luokalla eikä elementti kerrallaan,
       * jotta se purkautuu varmasti myös silloin kun radio sammuu
       * omalta puoleltaan.
       */
      document.body.classList.add('radio-tila');
      radio.paalle({
        map: this.game.pack.map,
        kaupungit: this.game.board.cities,
        juuri: document.body,
        aani: this.radioAani,
        // Soittimen asteikko keskittyy siihen, missä pelaaja seisoo,
        // kunnes ensimmäinen kanava valitaan.
        sijainti: this.game.player?.pos?.city ?? null,
        // Soittimen virtakytkin (OFF) sammuttaa koko radiotilan, ei vain
        // laitetta: radio ei tunne linssivalikkoa eikä saa tuntea.
        onSulje: () => this.valitseLinssi(null),
        onMuutos: (tilanne) => {
          this.radioAani = tilanne.aani;
          // Soivan kaupungin napin ulkoasu päivittyy vain näin.
          if (!this.dead) this.drawTargets();
        },
      });
    } else {
      /*
       * X-nappi katoaa aina, myös silloin kun radiotila on jo purettu
       * omalta puoleltaan (soittimen OFF-kytkin ehtii kutsua pois():n
       * ennen kuin linssi sammuu). Ehdon sisällä nappi jäisi ruudulle
       * yksin sulkemaan tilaa, joka on jo suljettu.
       */
      document.body.classList.remove('radio-tila');
      if (radio.paalla()) {
        radio.pois();
        // Radio ei tiedä kaupunkia eikä maisematyyppiä, joten kaupungin
        // oma äänimaisema palautetaan täältä.
        this.syncAmbience();
      }
    }
    this.drawTargets();
  }

  lataaLinssit() {
    if (!this.linssiLataus) {
      this.linssiLataus = (async () => {
        try {
          const [kerros, omistus] = await Promise.all([
            import('./linssit/kerros.js'),
            import('./linssit/omistus.js'),
          ]);
          const tuki = {
            kerros,
            omistus,
            /*
             * Moottorille annetaan oma kerroksen hakija.
             *
             * Oletushakija etsii kerroksen documentista, jolloin kuollut
             * käyttöliittymä voisi kirjoittaa seuraavan pelin kerrokseen
             * — kesken jäänyt rasterointi valmistuu vasta uuden pelin
             * alettua. Tämä hakija palauttaa null heti kun instanssi on
             * kuollut, ja seuraa muuten drawBoardin luomaa uutta ryhmää.
             */
            moottori: new kerros.Linssikerros(() => (this.dead ? null : this.linssiKerros ?? null)),
            kaikki: await kerros.haeKaikki(),
          };
          this.linssiTuki = tuki;
          return tuki;
        } catch (syy) {
          console.warn('Linssejä ei voitu ladata; valitsin jää pois.', syy);
          return null;
        }
      })();
    }
    return this.linssiLataus;
  }

  /**
   * Linssit, jotka pelaaja omistaa ja jotka pätevät tälle laudalle.
   *
   * Löytämätön linssi ei näy valitsimessa edes harmaana: valikko
   * kertoisi muuten suoraan, montako on vielä löytämättä ja mistä.
   */
  nakyvatLinssit(tuki) {
    const omat = tuki.omistus.omistetut(this.game, this.game.player);
    return tuki.kaikki.filter((linssi) => omat.has(linssi.tunnus)
      && tuki.kerros.kelpaaLaudalle(linssi, this.game.pack.id)
      && !this.linssiPois.has(linssi.tunnus));
  }

  /**
   * Valitsimen ja kerroksen tahdistus. Kutsutaan joka renderissä, mutta
   * valikko rakennetaan vain kun valikoima oikeasti muuttuu: löydetty
   * linssi ilmestyy itsestään eikä välissä tehdä turhaa työtä.
   */
  async paivitaLinssit() {
    const tuki = await this.lataaLinssit();
    if (!tuki || this.dead || !this.linssiKotelo) return;
    // Laudan vaihto antaa uuden mahdollisuuden niille linsseille, joilla
    // ei ollut edelliselle laudalle mitään näytettävää: pudotus koski
    // lautaa eikä linssiä.
    if (this.linssiLauta !== this.game.pack.id) {
      this.linssiLauta = this.game.pack.id;
      this.linssiPois.clear();
    }
    const nakyvat = this.nakyvatLinssit(tuki);
    this.linssiKotelo.hidden = nakyvat.length === 0;


    const tunniste = `${this.game.pack.id}|${nakyvat.map((l) => l.tunnus).join(',')}`;
    if (tunniste !== this.linssiTunniste) {
      this.linssiTunniste = tunniste;
      this.rakennaLinssivalikko(nakyvat);
    }

    // Omistamaton tai tuntematon tallennettu valinta ohitetaan hiljaa
    // (suunnitelman luku 5.3): tallennus voi olla toiselta pelikerralta.
    const haluttu = nakyvat.some((l) => l.tunnus === this.linssiValittu) ? this.linssiValittu : null;
    /*
     * Lauta piirretään uudelleen monesta syystä (uusi peli, laudan
     * vaihto, kehittäjätilan esikatselu), ja silloin kerros on uusi ja
     * tyhjä. Moottori ei kuuntele karttaa, joten linssi on sytytettävä
     * tässä uudelleen — muuten se katoaisi ilman yhtään virhettä.
     */
    if (haluttu !== tuki.moottori.tunnus || this.linssiKerros !== this.linssiPiirretty) {
      await this.sytytaLinssi(haluttu);
    }
  }

  /** Sytyttää linssin kartalle; tunnus === null sammuttaa. */
  async sytytaLinssi(tunnus) {
    const tuki = await this.lataaLinssit();
    if (!tuki || this.dead) return;
    const askel = tunnus ? this.linssiAskeleet.get(tunnus) ?? null : null;
    let tulos = null;
    try {
      tulos = await tuki.moottori.vaihda(tunnus, tuki.kerros.linssitila(this.game.pack, askel));
    } catch (syy) {
      /*
       * Moottori heittää sopimusrikkeestä tarkoituksella: se on aina
       * linssimoduulin oma vika ja se pitää nähdä. Peli ei silti saa
       * kaatua siihen — rikkinäinen linssi pudotetaan valikoimasta ja
       * kartta jää entiselleen.
       */
      console.error(syy);
      this.pudotaLinssi(tunnus);
      return;
    }
    if (this.dead) return;
    this.linssiPiirretty = this.linssiKerros;
    if (tulos === false) {
      // Linssillä ei ollut tälle laudalle mitään näytettävää.
      this.pudotaLinssi(tunnus);
      return;
    }
    // Maailmanradio ei ole karttakerros vaan kartan TILA: moottori
    // merkitsi linssin vain valituksi (kerros: false), ja tila
    // kytketään tässä.
    await this.tahdistaRadio(tunnus === 'radio');
    if (this.dead) return;
    // Vertailulinssi on radion tavoin kartan TILA eikä karttakerros
    // (kerros: false) — se kytketään tässä samalla tavalla.
    this.tahdistaVertailu(tunnus === 'vertailu');
    if (this.dead) return;
    // Maiden tiedot on samaa perhettä: kartan tila, ei kerros. Tila
    // voi olla päällä myös kartan omasta napista, joten varusteen
    // vaihto ei saa sammuttaa sitä yksin (ks. maatiedotHalutaan).
    this.tahdistaMaatiedot(this.maatiedotHalutaan());
    if (this.dead) return;
    this.paivitaMaalehtiNappi();
    this.paivitaLinssiNappi();
    this.paivitaLinssiTiedot();
    this.piirraLinssiSelite();
    /*
     * Jokien nimet kuuluvat vesistölinssiin mutta asuvat kartan omassa
     * nimikerroksessa (js/mapart.js drawMaastonimet). Kerros piirtää
     * uudelleen vain kun näkymä muuttuu, eikä linssin vaihto liikuta
     * karttaa — muistettu tunniste on siis nollattava käsin, tai nimet
     * ilmestyisivät vasta seuraavasta panoroinnista.
     */
    this.maastonimiTunniste = null;
    this.paivitaMaastonimet();
  }

  /** Ottaa linssin pois valikoimasta ja palaa linssittömään karttaan. */
  pudotaLinssi(tunnus) {
    if (tunnus) this.linssiPois.add(tunnus);
    this.linssiValittu = null;
    tallennaLinssi(null);
    this.linssiTunniste = null;
    this.linssiPiirretty = null;
    void this.paivitaLinssit();
  }

  /** Valitsimen rivin napautus. tunnus === null = "Ei linssiä". */
  valitseLinssi(tunnus) {
    if (this.linssiValittu === tunnus) return;
    this.linssiValittu = tunnus;
    tallennaLinssi(tunnus);
    // Merkintä valikkoon heti, kerros hetkeä myöhemmin: raskas linssi
    // rasteroidaan, eikä napin pidä odottaa sitä näyttääkseen valinnan.
    this.paivitaLinssiTiedot();
    void this.sytytaLinssi(tunnus);
  }

  /*
   * Valitsin on päävalikossa auki valmiiksi eikä sitä enää avata tai
   * suljeta erikseen. Metodit jäivät tyhjinä, koska niitä kutsutaan
   * useammasta paikasta — sulkupyyntö on nyt kohteeton mutta ei virhe.
   */
  avaaLinssivalikko() {}

  suljeLinssivalikko() {}

  /**
   * Valitsimen sisältö: kuvakerivi ja sen alla valitun linssin nimi,
   * kuvaus ja lähde.
   *
   * Kuvio on Tutki-ikkunan aiheliuskoista (rakennaLiuskat): kuvakkeet
   * yhdellä rivillä, valittu liuska samaa paperia kuin sisältö alla.
   * Rooli on kuitenkin aria-pressed eikä role="tab" — role="tab" lupaa
   * nuolinäppäinnavigoinnin, jota tässä pelissä ei ole yhdessäkään
   * liuskarivissä (suunnitelman luku 5.2).
   */
  rakennaLinssivalikko(linssit) {
    if (!this.linssiValikko) return;
    this.linssiValikko.replaceChildren();
    // Vanha tietolohko jäi irralleen puusta: viittaus siihen kirjoittaisi
    // näkymättömään elementtiin.
    this.linssiTiedot = null;
    if (!linssit.length) return;

    const liuskat = html('nav', 'linssi-liuskat');
    liuskat.setAttribute('role', 'group');
    liuskat.setAttribute('aria-label', 'Linssit');
    // "Ei linssiä" on aina ensimmäisenä: paluu tavalliseen karttaan on
    // yhtä lähellä kuin linssin valinta.
    liuskat.appendChild(this.linssiLiuska(null, 'Ei linssiä', LINSSI_EI_IKONI));
    for (const linssi of linssit) {
      liuskat.appendChild(this.linssiLiuska(linssi.tunnus, linssi.nimi, linssi.ikoni));
    }
    this.linssiValikko.appendChild(liuskat);
    this.linssiTiedot = html('div', 'linssi-tiedot');
    this.linssiValikko.appendChild(this.linssiTiedot);
    this.paivitaLinssiNappi();
    this.paivitaLinssiTiedot();
  }

  linssiLiuska(tunnus, nimi, ikoni) {
    const nappi = html('button');
    nappi.type = 'button';
    nappi.dataset.linssi = tunnus ?? '';
    // Nimi jää saavutettavuuteen ja pitkään painallukseen, vaikka
    // ruudulla näkyy vain kuvake.
    nappi.title = nimi;
    nappi.setAttribute('aria-label', nimi);
    nappi.innerHTML = liuskaIkoniSvg(ikoni);
    nappi.addEventListener('click', () => this.valitseLinssi(tunnus));
    return nappi;
  }

  /** Ylärivin nappi näyttää päällä olevan linssin kuvakkeen. */
  paivitaLinssiNappi() {
    if (!this.linssiNappi || !this.linssiNapinIkoni) return;
    const linssi = this.paallaOlevaLinssi();
    this.linssiNapinIkoni.innerHTML = `<svg viewBox="0 0 24 24">${linssi?.ikoni ?? VIIVA_IKONIT.varusteet}</svg>`;
    this.linssiNappi.title = linssi ? `Linssi: ${linssi.nimi}` : 'Varusteet — valitse linssi kartalle';
    this.linssiNappi.classList.toggle('paalla', Boolean(linssi));
  }

  /** Valittu linssi moduulina, tai null kun karttaa katsotaan paljain silmin. */
  paallaOlevaLinssi() {
    if (!this.linssiValittu) return null;
    return this.linssiTuki?.kaikki.find((l) => l.tunnus === this.linssiValittu) ?? null;
  }

  /** Valittu rivi korostetaan ja sen kuvaus kirjoitetaan rivien alle. */
  paivitaLinssiTiedot() {
    if (!this.linssiValikko) return;
    for (const nappi of this.linssiValikko.querySelectorAll('.linssi-liuskat button')) {
      const paalla = (nappi.dataset.linssi || null) === this.linssiValittu;
      nappi.classList.toggle('paalla', paalla);
      nappi.setAttribute('aria-pressed', String(paalla));
    }
    if (!this.linssiTiedot) return;
    this.linssiTiedot.replaceChildren();
    const linssi = this.paallaOlevaLinssi();
    if (!linssi) {
      this.linssiTiedot.appendChild(html('p', 'linssi-lyhyt', 'Kartta sellaisena kuin isoisä sen piirsi.'));
      return;
    }
    this.linssiTiedot.appendChild(html('h3', 'linssi-nimi', linssi.nimi));
    this.linssiTiedot.appendChild(html('p', 'linssi-lyhyt', linssi.lyhyt));

    /*
     * LÄHDELINKKI POISTETTU VALIKOSTA (omistaja 5.8.2026: "poista myös,
     * mistä tämä tieto on, linkki").
     *
     * Tässä oli nappi, joka avasi aineiston nimen, lisenssin ja
     * hakupäivän. Se oli valikossa väärässä paikassa kahdesta syystä:
     * valikko on säädin eikä lukusali, ja täysleveä tekstinappi rikkoi
     * keskitetyn ladelman.
     *
     * NIMEÄMINEN EI KADONNUT. Molempien nykyisten linssien aineistot
     * (Natural Earth ja ETOPO1) ovat luettelossa js/lahteet.js:ssä, joka
     * aukeaa ylärivin logosta — ja siellä ne ovat täydellisinä
     * merkintöinä lisensseineen. Jos joskus tulee CC BY -aineistoon
     * perustuva linssi, sen nimeäminen kuuluu sinne, ei tähän.
     */
  }

  /**
   * Selitekortti kartan nurkassa: linssin nimi, värilaput selityksineen,
   * mahdolliset askeleet ja lähdemerkintä.
   *
   * Kortti on tavallista DOM:ia kartan päällä eikä SVG:tä, joten
   * napautukset toimivat normaalisti eikä kierron <use>-kopio koske
   * siihen lainkaan.
   */
  piirraLinssiSelite() {
    const linssi = this.paallaOlevaLinssi();
    const kerrosPaalla = !!linssi && linssi.kerros !== false && !this.dead;
    /*
     * Linssin syttyminen kutistaa päiväkirjan yhdelle riville ja
     * sammuminen palauttaa sen (omistajan toive): kartan päällä on
     * silloin kaksi paperia, ja kartan pitää näkyä niiden välistä.
     *
     * Vain vaihtumishetkellä, ei joka piirrolla: selite piirretään
     * uudelleen myös askelvalinnasta ja laudan vaihdosta, eikä pelaajan
     * omaa napautusta saa kumota selän takaa.
     */
    this.linssiKortitPienina ??= false;
    if (kerrosPaalla !== this.linssiKortitPienina) {
      this.linssiKortitPienina = kerrosPaalla;
      this.asetaPaivakirjanKoko(kerrosPaalla);
    }
    // Kerrokseton linssi (radio, tähtitaivas) ei piirrä kartalle mitään,
    // joten sillä ei ole kartalla selitettävää.
    if (!kerrosPaalla) {
      this.suljeLinssiSelite();
      return;
    }
    /*
     * Selite avautuu ja sulkeutuu napauttamalla, ja kutistettuna siitä
     * jää näkyviin vain linssin nimi. Aloitustila on kutistettu: linssin
     * päällä kartta on se, jota katsotaan, ja värilaatikot ovat
     * yhden napautuksen päässä. Valinta säilyy istunnon yli linssistä
     * toiseen, joten kerran avattu selite pysyy auki.
     */
    this.linssiSelitePieni ??= true;
    if (!this.linssiSelite) {
      this.linssiSelite = html('aside', 'linssi-selite');
      // Kartan oma napautuskuuntelija kutistaisi päiväkirjan, ja
      // kortin napit ovat napautuksia varten.
      this.linssiSelite.addEventListener('click', (e) => {
        e.stopPropagation();
        // Otsikkopainike ja askelliuskat hoitavat oman napautuksensa.
        if (e.target.closest('button')) return;
        this.vaihdaLinssiSelite();
      });
      this.mapPane.appendChild(this.linssiSelite);
    }
    const kortti = this.linssiSelite;
    kortti.replaceChildren();
    /*
     * Nimi on oikea painike eikä pelkkä otsikko: kutistettuna se on
     * ainoa näkyvä osa selitteestä, ja aria-expanded kertoo apuvälineelle
     * kumpi tila on päällä. Otsikkotaso säilyy sen ympärillä.
     */
    const otsikko = html('h2');
    const otsikkoNappi = html('button', 'linssi-selite-nappi', linssi.nimi);
    otsikkoNappi.type = 'button';
    otsikkoNappi.addEventListener('click', () => this.vaihdaLinssiSelite());
    otsikko.appendChild(otsikkoNappi);
    kortti.appendChild(otsikko);

    let rivit = [];
    try {
      rivit = linssi.selite?.() ?? [];
    } catch (syy) {
      console.warn(`Linssin "${linssi.tunnus}" selite kaatui.`, syy);
    }
    if (rivit.length) {
      const lista = html('ul', 'linssi-selite-rivit');
      for (const rivi of rivit) {
        const kohta = html('li');
        if (rivi.vari) {
          const lappu = html('span', 'linssi-lappu');
          // Väri tulee aineistosta, joten se asetetaan tyylinä eikä
          // luokkana: luokkia olisi yhtä monta kuin vyöhykkeitä.
          lappu.style.background = rivi.vari;
          kohta.appendChild(lappu);
        }
        kohta.appendChild(html('span', '', rivi.teksti ?? ''));
        lista.appendChild(kohta);
      }
      kortti.appendChild(lista);
    }

    let askeleet = null;
    try {
      askeleet = linssi.askeleet?.() ?? null;
    } catch (syy) {
      console.warn(`Linssin "${linssi.tunnus}" askeleet kaatui.`, syy);
    }
    if (askeleet?.vaihtoehdot?.length) {
      /*
       * Askellus on aina pelaajan komennolla, ei ajastimella. Mitattu:
       * yksikin sykkivä elementti kartan päällä pudottaa ruudunpäivityksen
       * 60:stä 15 kuvaan sekunnissa (js/ui.js 7529–7534) — ja juuri
       * aikajanalinsseillä houkutus animaatioon on suurin.
       */
      const valittu = this.linssiAskeleet.get(linssi.tunnus) ?? askeleet.valittu ?? null;
      if (askeleet.otsikko) kortti.appendChild(html('p', 'linssi-askel-otsikko', askeleet.otsikko));
      const rivi = html('nav', 'linssi-liuskat linssi-askeleet');
      rivi.setAttribute('role', 'group');
      rivi.setAttribute('aria-label', askeleet.otsikko ?? 'Askeleet');
      for (const vaihtoehto of askeleet.vaihtoehdot) {
        const nappi = html('button', '', vaihtoehto.nimi);
        nappi.type = 'button';
        const paalla = vaihtoehto.avain === valittu;
        nappi.classList.toggle('paalla', paalla);
        nappi.setAttribute('aria-pressed', String(paalla));
        nappi.addEventListener('click', () => this.valitseLinssiAskel(linssi.tunnus, vaihtoehto.avain));
        rivi.appendChild(nappi);
      }
      kortti.appendChild(rivi);
    }

    /*
     * Lähdemerkintä EI ole tässä kortissa (omistajan päätös 4.8.2026).
     *
     * Kartan päällä se oli kolmen rivin mittainen aineiston nimi
     * ("NOAA NGDC ETOPO1 … Public domain"), joka vei selitteeltä tilan
     * eikä kertonut pelaajalle mitään siitä, mitä värit tarkoittavat.
     * Merkintä ei silti katoa mihinkään: kaikkien aineistojen lähteet,
     * tekijät ja lisenssit ovat yhdessä paikassa matkalaukun alalaidan
     * "Unohdettu aarre" -ikkunassa (js/lahteet.js) sekä README.md:ssä,
     * ja linssin oma pitkä merkintä on yhä linssivalitsimen "Mistä tämä
     * tieto on?" -napin takana (paivitaLinssiTiedot).
     */
    this.vaihdaLinssiSelite(this.linssiSelitePieni);
    this.sijoitaLinssiSelite();
  }

  /**
   * Selite auki tai kiinni. Ilman argumenttia napautus vaihtaa tilaa;
   * argumentin kanssa tila vain kirjoitetaan uudelleen piirrettyyn
   * korttiin (piirraLinssiSelite rakentaa lapset joka kerta uusiksi).
   */
  vaihdaLinssiSelite(pieni) {
    this.linssiSelitePieni = pieni ?? !this.linssiSelitePieni;
    const kortti = this.linssiSelite;
    if (!kortti) return;
    kortti.classList.toggle('pieni', this.linssiSelitePieni);
    kortti.querySelector('.linssi-selite-nappi')
      ?.setAttribute('aria-expanded', String(!this.linssiSelitePieni));
  }

  suljeLinssiSelite() {
    this.linssiSelite?.remove();
    this.linssiSelite = null;
  }

  /**
   * Selitekortti sille kartan nurkalle, jossa päiväkirja ei ole.
   * Päiväkirja valitsee nurkkansa meren mukaan (placeFactCard); kortti
   * ottaa ensimmäisen vapaan mieluisuusjärjestyksessä, jotta kaksi
   * paperia ei koskaan mene päällekkäin.
   */
  sijoitaLinssiSelite() {
    if (!this.linssiSelite) return;
    const varattu = this.factCard?.dataset.corner ?? 'bl';
    /*
     * Kapealla ruudulla alanurkat ovat toimintokortin käytössä: se on
     * leveydeltään koko ruutu miinus rako. Sama mitta kuin päiväkirjalla
     * (placeFactCard), joten kortit tekevät saman päätöksen samasta
     * syystä — leveällä ruudulla alanurkka on rauhallisin paikka, mutta
     * puhelimella siellä ovat matkustusnapit.
     */
    const leveys = this.mapPane?.getBoundingClientRect().width ?? 0;
    const jarjestys = leveys >= FACT_WIDTH + TURN_WIDTH + 40
      ? ['bl', 'tl', 'br', 'tr']
      // Vasen ylänurkka ennen oikeaa: oikeasta laskeutuu valitsimen
      // paneeli, ja sen alle jäävä kortti näkyisi vasta paneelin
      // sulkeuduttua.
      : ['tl', 'tr', 'br', 'bl'];
    this.linssiSelite.dataset.corner = jarjestys.find((n) => n !== varattu) ?? 'tr';
  }

  /** Aikajanan tai mittarin vaihto: moduulille tieto ja kerros uusiksi. */
  async valitseLinssiAskel(tunnus, avain) {
    this.linssiAskeleet.set(tunnus, avain);
    const linssi = this.linssiTuki?.kaikki.find((l) => l.tunnus === tunnus) ?? null;
    try {
      linssi?.valitseAskel?.(avain);
    } catch (syy) {
      console.warn(`Linssin "${tunnus}" valitseAskel kaatui.`, syy);
    }
    await this.sytytaLinssi(tunnus);
  }

  showWinner() {
    clearTimeout(this.botTimer);
    if (!this.winnerDialog.open) sfx.play('win');
    const w = this.game.winner;
    document.getElementById('winner-title').textContent = `${w.name} voitti!`;
    this.typeText(document.getElementById('winner-text'), w.hasStar
      ? this.game.pack.texts.winnerStar(w.name, w.money)
      : `${w.name} ehti hevosenkengän kanssa kotiin ennen unohdetun aarteen löytäjää.`, 'winner');
    const roamBtn = document.getElementById('winner-roam');
    roamBtn.onclick = () => {
      this.winnerDialog.close();
      this.doAction(() => this.game.continueRoaming());
    };
    if (!this.winnerDialog.open) this.winnerDialog.showModal();
  }

  // --- tietovisa ----------------------------------------------------------

  /**
   * Vastausnapit rakennetaan vain kun kysymys vaihtuu, ja päivitetään muuten
   * paikallaan. Jos ne rakennettaisiin joka renderillä uudelleen, esiin-
   * liukuva option-in-animaatio alkaisi alusta joka kerta ja koko lista
   * välähtäisi esimerkiksi väärän vastauksen jälkeen.
   */
  syncOptions(data, onPick) {
    if (this.builtOptionsFor !== data) {
      this.builtOptionsFor = data;
      this.optionButtons = data.options.map((text, i) => {
        const btn = html('button', 'quiz-option');
        btn.style.setProperty('--i', String(i));
        btn.appendChild(html('span', 'letter', LETTERS[i]));
        btn.appendChild(html('span', 'text', text));
        btn.addEventListener('click', () => {
          if (!btn.disabled) onPick(i);
        });
        return btn;
      });
      this.quizOptions.textContent = '';
      for (const btn of this.optionButtons) this.quizOptions.appendChild(btn);
    }

    const answered = data.chosen !== null;
    this.optionButtons.forEach((btn, i) => {
      const hidden = data.hidden.includes(i);
      btn.classList.toggle('hidden-option', hidden);
      btn.classList.toggle('correct', answered && i === data.correct);
      btn.classList.toggle('wrong', answered && i === data.chosen && !data.right);
      btn.disabled = hidden || answered || this.game.player.isBot;
    });
  }

  /**
   * Tapahtumakortti: kysymyksen sijaan tapahtuu jotain. Vaikutus kerrotaan
   * kortin lopussa omalla rivillään, jottei pelaajan tarvitse päätellä
   * sääntöä tarinatekstistä.
   */
  renderEvent() {
    const { game } = this;
    const kortti = game.eventCard;
    if (game.phase !== 'event' || !kortti) {
      if (this.eventDialog.open) this.eventDialog.close();
      this.eventShownFor = null;
      return;
    }
    if (this.eventShownFor === kortti) return;
    this.eventShownFor = kortti;

    const selitteet = {
      viive: 'Matka viivästyy yhdellä vuorolla.',
      kyyti: 'Saat ilmaisen kyydin naapurikaupunkiin.',
    };
    const { effect } = kortti;
    this.eventEffect.textContent = effect?.kind === 'raha'
      ? (effect.amount >= 0 ? `Kukkaroon +${effect.amount} puntaa.` : `Kukkarosta ${effect.amount} puntaa.`)
      : (selitteet[effect?.kind] ?? '');
    this.eventText.textContent = '';
    this.typeText(this.eventText, kortti.text, 'event');
    if (!this.eventDialog.open) this.eventDialog.showModal();
  }

  renderQuiz() {
    if (this.dead) return; // kesken jäänyt animaatioketju voi kutsua tätä vielä destroyn jälkeen
    const { game } = this;
    this.renderEvent();
    if (game.phase === 'duel' && game.duel) {
      this.renderDuel();
      return;
    }
    const quiz = game.quiz;
    if (game.phase !== 'quiz' || !quiz) {
      this.stopQuizTimer();
      stopQuizMusic();
      if (this.quizDialog.open) this.quizDialog.close();
      return;
    }

    const city = game.board.cityById.get(quiz.cityId);
    const hardTag = quiz.hard ? ` · vaikea kysymys +${HARD_BONUS} p` : '';
    // Kohtaaminen koskee tavallista visaa: muut muodot (pulma, väittämä,
    // valokuva, lippu, portti) pitävät omat kehyshahmonsa.
    const kohtaaminen = (!quiz.kind && !quiz.gate) ? (KOHTAAMISET[quiz.cityId] ?? null) : null;
    const tervehdysAvain = `${game.pack.id}:${quiz.cityId}`;
    /*
     * Tarinakaaren kohtaaminen syrjäyttää tavallisen tervehdyksen:
     * kaupungin ensimmäisessä aarrevisassa puhuu kaaren henkilö, ja
     * hänen kysymyksensä on visan kysymys (game.js pariutti ne).
     * Avain merkitään nähdyksi, ettei vanha tervehdyshahmo esittäydy
     * heti perään toisessa visassa.
     */
    const kaariTarina = quiz.kaari ? (TARINAKAARI[quiz.cityId] ?? null) : null;
    const tervehdys = kaariTarina
      ? kaariTarina.kohtaaminen
      : (kohtaaminen && !this.kohtaamisetNahty.has(tervehdysAvain)
        ? kohtaaminen.tervehdys
        : null);
    // Pulman piirros ensin, kysymysrivi alla — kortti on isoisän luonnos.
    // HUOM: SVGElement ei peri HTMLElementiä, joten .hidden-ominaisuus ei
    // heijastu attribuuttiin — se jäisi päälle ja [hidden]-sääntö piilottaisi
    // piirroksen pysyvästi. Attribuuttia on siis käsiteltävä suoraan.
    this.quizSketch.toggleAttribute('hidden', quiz.kind !== 'puzzle');
    if (quiz.kind === 'puzzle' && this.sketchFor !== quiz) {
      this.sketchFor = quiz;
      this.quizSketch.textContent = '';
      drawPuzzle(this.quizSketch, quiz.puzzleId, quiz.sketchData);
    }
    // Piirroksen selite: kertoo mitä luonnoksessa näkyy.
    this.quizSelite.hidden = quiz.kind !== 'puzzle' || !quiz.selite;
    if (!this.quizSelite.hidden) this.quizSelite.textContent = quiz.selite;

    // Valokuvakysymyksen kuva ladataan kerran per kysymys. Jos kuvaa ei
    // saada (esim. verkko katkesi kysymyksen avauduttua), tilalle jää
    // kysymysteksti — vaihtoehtoihin voi silti vastata tai antaa ajan
    // valua umpeen.
    this.quizPhoto.hidden = quiz.kind !== 'photo' && quiz.kind !== 'flag';
    if (quiz.kind === 'photo' && this.photoShownFor !== quiz) {
      this.photoShownFor = quiz;
      this.quizPhoto.removeAttribute('src');
      // Kuratoitu valokuva samasta putkesta kuin postikortit ja liput:
      // paikallinen kopio tai peili ensin, Commons varalla.
      if (quiz.photoFile) {
        asetaKuva(this.quizPhoto,
          valokuvaUrl(quiz.photoFile, 640), valokuvaVara(quiz.photoFile, 640));
        this.quizPhoto.alt = 'Matkavalokuvaajan vedos';
      }
    }
    /*
     * Lippu tulee samaan kehykseen kuin valokuva, mutta se on repossa
     * eikä verkossa — kysymys toimii siis myös yhteydettömänä. Alt-teksti
     * ei saa kertoa maata: se olisi vastaus.
     */
    this.quizPhoto.classList.toggle('quiz-lippu', quiz.kind === 'flag');
    if (quiz.kind === 'flag' && this.photoShownFor !== quiz) {
      this.photoShownFor = quiz;
      asetaKuva(this.quizPhoto, lippuUrl(quiz.flagFile, 320), lippuVara(quiz.flagFile, 320));
      this.quizPhoto.alt = 'Tullimiehen näyttämä lippu';
    }

    // Leima näkyy vain pulmissa ja valokuvissa: irrallinen "Tietovisa"-sana
    // on turha, kun kehys kertoo kuka kysymyksen esittää.
    this.quizBadge.hidden = !['puzzle', 'photo', 'flag'].includes(quiz.kind);
    this.quizBadge.textContent = { photo: 'Valokuva', flag: 'Lippu' }[quiz.kind] ?? 'Pulma';
    let otsikko;
    if (quiz.kind === 'puzzle') {
      otsikko = `Isoisän luonnoskirjasta — ${quiz.title}`;
    } else if (quiz.kind === 'claim') {
      // Väittämässä puhuu isoisä, ei peli: otsikko kertoo äänen ja paikan,
      // jota merkintä koskee — se on usein muu kuin pelaajan sijainti.
      const aihe = quiz.place ? ` · ${quiz.place}` : '';
      otsikko = `Isoisän päiväkirjasta, 1873${aihe} — pitääkö tämä yhä paikkansa?`;
    } else if (quiz.gate) {
      otsikko = `${city.name} — portti: ${quiz.gate.label}`;
    } else if (kaariTarina) {
      // Tarinakaaren kohtaaminen: kehyksenä kaupunki ja kohtaaminen —
      // henkilö esittäytyy itse repliikissään.
      otsikko = `${city.name} — kohtaaminen:${hardTag}`;
    } else if (kohtaaminen) {
      // Tarinallinen kohtaaminen (omistajan toive 5.8.2026): nimetty
      // paikallinen hahmo kysyy, ei satunnainen kysyjä.
      otsikko = `${city.name} — ${kohtaaminen.frame}:${hardTag}`;
    } else {
      // Kehystarina: paikallinen kysyjä. Vanhassa tallenteessa kehystä ei
      // ole, jolloin otsikkona on pelkkä kaupunki.
      otsikko = quiz.frame
        ? `${city.name} — ${quiz.frame}:${hardTag}`
        : `${city.name}${hardTag}`;
    }
    // Kortti paljastuu vaiheittain kirjoituskoneella: ensin kehystarina,
    // pieni tauko, sitten kysymys, tauko, ja vasta lopuksi vaihtoehdot.
    // Samalla kääntyy päiväkirjan sivu ja hiljainen mietintämusiikki alkaa.
    if (this.typedQuizFor !== quiz) {
      this.typedQuizFor = quiz;
      this.quizStage = 0;
      sfx.play('quizOpen');
      startQuizMusic(this.game.pack.id);
      this.quizQuestion.textContent = '';
      this.quizKohtaaminen.textContent = '';
      this.quizKohtaaminen.hidden = !tervehdys;
      /*
       * Vanha isoisän sitaattilohko poistui, kun tarinakaari korvasi
       * sen (omistajan tilaus 9.8.2026): isoisän jälki kulkee nyt
       * kohtaamisen ja sen kysymyksen kautta, ei erillisenä
       * sitaattina kysymyksen yllä.
       */
      this.quizIsoisa.hidden = true;
      const vaihtoehdot = () => {
        if (this.dead || this.typedQuizFor !== quiz) return;
        this.quizStage = 2;
        this.renderQuiz();
      };
      const kysymys = () => {
        if (this.dead || this.typedQuizFor !== quiz) return;
        this.quizStage = 1;
        this.typeText(this.quizQuestion, quiz.question, 'quiz', () => {
          this.typeTimers.quiz = setTimeout(vaihtoehdot, QUIZ_PAUSE_MS);
        }, QUIZ_TYPE_MS);
      };
      // Kohtaamisen avaus kirjoittuu otsikon ja kysymyksen väliin —
      // vain ensi kerralla; sen jälkeen hahmo menee suoraan asiaan.
      const avaus = () => {
        if (this.dead || this.typedQuizFor !== quiz) return;
        if (!tervehdys) {
          kysymys();
          return;
        }
        this.kohtaamisetNahty.add(tervehdysAvain);
        // Tervehdys luetaan ääneen kirjoituskoneen rinnalla (omistajan
        // rajaus 7.8.2026: "riittää vain alkutarinan luenta"). Kertoja
        // lukee kehyksen ja hahmo repliikkinsä omalla äänellään —
        // playDiaryVoice hiljentää musiikin puheen ajaksi.
        // Tarinakaaren kohtaamisella on oma luentansa joka kohteelle.
        if (kaariTarina && kertojaTila() !== 'ei') {
          this.playDiaryVoice(
            `assets/audio/puhe-kaari-kohtaaminen-${quiz.cityId}.mp3`,
            { viive: 300 },
          );
        } else if (!kaariTarina && KOHTAAMISLUENNAT.has(quiz.cityId) && kertojaTila() !== 'ei') {
          this.playDiaryVoice(
            `assets/audio/puhe-kohtaaminen-${quiz.cityId}-tervehdys.mp3`,
            { viive: 300 },
          );
        }
        this.typeText(this.quizKohtaaminen, tervehdys, 'quiz', () => {
          this.typeTimers.quiz = setTimeout(kysymys, QUIZ_PAUSE_MS);
        }, QUIZ_TYPE_MS);
      };
      this.typeText(this.quizCity, otsikko, 'quiz', () => {
        this.typeTimers.quiz = setTimeout(avaus, QUIZ_PAUSE_MS);
      }, QUIZ_TYPE_MS);
    } else if ((this.quizStage ?? 2) >= 2) {
      // Itsekorjaus valmiille kortille: jos jokin muu kirjoitus on ehtinyt
      // sotkea tekstit (esim. edellisen pelin kesken jäänyt kirjoituskone),
      // ne asetetaan kerralla kokonaan — muuten vaihtoehdot ja tulos
      // näkyisivät väärän kysymyksen alla.
      if (this.quizCity.textContent !== otsikko) this.quizCity.textContent = otsikko;
      if (this.quizQuestion.textContent !== String(quiz.question)) {
        this.quizQuestion.textContent = quiz.question;
      }
    }
    this.syncOptions(quiz, (i) => this.answerQuiz(i));
    // Vaihtoehdot ja apukeinot pysyvät piilossa, kunnes kysymys on
    // kirjoitettu loppuun. Vanha tallenne (ei quizStage-arvoa) näyttää
    // kaiken heti.
    const esilla = (this.quizStage ?? 2) >= 2 || quiz.chosen !== null;
    this.quizOptions.hidden = !esilla;

    const answered = quiz.chosen !== null;
    // Vastauksen jälkeen näytetään ensin pelkkä tuomio, ja vasta aarteen
    // paljastuksen jälkeen löytö ja selitys.
    const revealed = this.revealShownFor === quiz;

    // Apukeinot: 40 punnalla sanallinen vihje, 80 punnalla kaksi väärää pois.
    const p = game.player;
    const used = quiz.hidden.length > 0;
    // Väittämässä on kaksi vaihtoehtoa ja karttakysymykseen vastataan
    // kartalta, joten 50:50 ei kuulu niihin lainkaan.
    this.quizFifty.hidden = !esilla || answered || p.isBot || quiz.options.length < 4;
    this.quizFifty.disabled = used || p.money < FIFTY_FIFTY_PRICE;
    this.quizFifty.textContent = used ? '50:50 käytetty' : `50:50 (${FIFTY_FIFTY_PRICE} p)`;

    this.quizHint.hidden = !esilla || answered || p.isBot || !quiz.hint;
    this.quizHint.disabled = quiz.hintShown || p.money < HINT_PRICE;
    this.quizHint.textContent = quiz.hintShown ? 'Vihje ostettu' : `Vihje (${HINT_PRICE} p)`;

    this.quizHintText.hidden = !quiz.hintShown;
    if (quiz.hintShown) this.quizHintText.textContent = quiz.hint;

    // Tiimalasi käynnistyy vasta, kun vaihtoehdot ovat esillä — lukuaikaa
    // ei kuluteta kirjoituskoneen naksutteluun.
    if (esilla) {
      this.renderTimer(quiz);
    } else {
      this.quizTimerEl.hidden = true;
      this.stopQuizTimer();
    }

    this.quizResult.hidden = !answered;
    if (answered) {
      this.quizResult.className = `quiz-result ${quiz.right ? 'right' : 'wrong'}`;
      this.quizResult.textContent = '';

      if (!revealed) {
        const verdict = quiz.timedOut ? 'Aika loppui!' : quiz.right ? 'Oikein!' : 'Väärin.';
        this.quizResult.appendChild(html('strong', 'quiz-verdict', verdict));
      } else {
        const found = quiz.found ? game.tokenTypes[quiz.found] : null;
        const body = html('div');
        if (quiz.gate && quiz.right) {
          body.appendChild(html('strong', '', `◈ Portti aukeaa — ${quiz.gate.label}!`));
          body.appendChild(html('span', 'muted', 'Tieto avasi tien: matka jatkuu ilmaiseksi.'));
        } else if (quiz.right && found) {
          this.quizResult.appendChild(tokenIconSvg(quiz.found, 24));
          body.appendChild(html('strong', '', `Löysit: ${found.name}`));
        } else if (quiz.right && quiz.explore) {
          body.appendChild(html('strong', '', `Oikein! Löytöpalkkio +${EXPLORE_REWARD} puntaa.`));
        } else if (quiz.right) {
          body.appendChild(html('strong', '', 'Oikein!'));
        } else {
          const lead = quiz.timedOut ? 'Aika loppui. ' : '';
          body.appendChild(
            html('strong', '', `${lead}Oikea vastaus oli "${quiz.options[quiz.correct]}".`),
          );
          body.appendChild(
            html('span', 'muted', 'Vuoro vaihtuu — seuraavalla vuorolla saat uuden kysymyksen.'),
          );
        }
        // Hahmon repliikki päättää kohtaamisen: löytö, tyhjä kätkö tai
        // lohdutus väärästä vastauksesta.
        if (kohtaaminen) {
          const repliikki = !quiz.right
            ? kohtaaminen.vaarin
            : (quiz.explore || (quiz.found && quiz.found !== 'empty'))
              ? kohtaaminen.loyto
              : kohtaaminen.tyhja;
          if (repliikki) body.appendChild(html('span', 'kohtaaminen-repliikki', repliikki));
          /*
           * Löytöhetken sananvaihto luetaan ääneen (omistajan rajaus
           * 7.8.2026: hahmon ja pelaajan lyhyt dialogi, "nyt kiireesti
           * seuraavaan paikkaan"). Vain löytö — tyhjä ja väärin jäävät
           * lukematta. renderQuiz ajetaan paljastuksen jälkeen monta
           * kertaa, joten vahti pitää luennan yhdessä aloituksessa.
           */
          if (repliikki === kohtaaminen.loyto && this.loytoLuentaFor !== quiz
            && KOHTAAMISLUENNAT.has(quiz.cityId) && kertojaTila() !== 'ei') {
            this.loytoLuentaFor = quiz;
            this.playDiaryVoice(
              `assets/audio/puhe-kohtaaminen-${quiz.cityId}-loyto.mp3`,
              { viive: 300 },
            );
          }
        }
        if (quiz.fact) body.appendChild(html('span', 'muted', quiz.fact));
        const quizSource = this.sourceLine(quiz.source);
        if (quizSource) body.appendChild(quizSource);
        this.quizResult.appendChild(body);
      }
    }
    this.quizContinue.hidden = !answered || !revealed || game.player.isBot;

    if (!this.quizDialog.open) this.quizDialog.showModal();
  }

  /** Rosvon kaksintaistelu: 8 vaihtoehtoa, helpotukset ja hevosenkenkäohitus. */
  renderDuel() {
    const { game } = this;
    const duel = game.duel;
    const p = game.player;

    this.quizBadge.hidden = true;
    // Kaksintaistelussa ei ole kohtaamista — edellisen visan tervehdys
    // ei saa jäädä kortille.
    this.quizKohtaaminen.hidden = true;
    this.quizCity.textContent = `Rosvon kaksintaistelu — ${p.name}`;
    // Kaksintaistelu ei käytä vaiheittaista paljastusta: vaihtoehdot ovat
    // heti esillä, eikä edellisen kortin piilotus saa jäädä päälle.
    this.quizStage = 2;
    this.quizOptions.hidden = false;
    if (this.typedQuizFor !== duel) {
      this.typedQuizFor = duel;
      startQuizMusic(this.game.pack.id);
      this.typeText(this.quizQuestion, duel.question, 'quiz');
    } else if (this.quizQuestion.textContent !== String(duel.question)) {
      // Sama itsekorjaus kuin tietovisassa: teksti ei saa jäädä eriämään.
      this.quizQuestion.textContent = duel.question;
    }
    this.syncOptions(duel, (i) => this.answerDuelUi(i));

    const answered = duel.chosen !== null;
    const revealed = this.revealShownFor === duel;

    // Helpotus rosvolta: puolet rahoista, puolet vääristä pois.
    const toll = Math.floor(p.money / 2);
    this.quizFifty.hidden = answered || p.isBot;
    this.quizFifty.disabled = duel.reliefs >= 2 || toll <= 0;
    if (duel.reliefs >= 2) this.quizFifty.textContent = 'Helpotukset käytetty';
    else this.ikonoi(this.quizFifty, 'kallo', `Helpotus (rosvo vie ${toll} p)`);

    // Kolmella hevosenkengällä pääsee ohi.
    this.quizHint.hidden = answered || p.isBot || p.horseshoes < DUEL_BYPASS_SHOES;
    this.quizHint.disabled = false;
    this.ikonoi(this.quizHint, 'kenka', `Ohita rosvo (${DUEL_BYPASS_SHOES} kenkää)`);

    this.quizHintText.hidden = duel.reliefs === 0;
    if (duel.reliefs > 0) {
      this.quizHintText.textContent = `Rosvo on vienyt ${duel.taken} puntaa.`;
    }

    this.renderTimer(duel);

    this.quizResult.hidden = !answered;
    if (answered) {
      this.quizResult.className = `quiz-result ${duel.right ? 'right' : 'wrong'}`;
      this.quizResult.textContent = '';
      if (!revealed) {
        const verdict = duel.timedOut ? 'Aika loppui!' : duel.right ? 'Oikein!' : 'Väärin.';
        this.quizResult.appendChild(html('strong', 'quiz-verdict', verdict));
      } else {
        const body = html('div');
        if (duel.right && duel.prize) {
          body.appendChild(html('strong', '', `Voitit rosvon — saalis ${duel.prize} puntaa!`));
        } else if (duel.right) {
          body.appendChild(html('strong', '', 'Voitit rosvon — loput rahat säilyvät.'));
        } else {
          const lead = duel.timedOut ? 'Aika loppui. ' : '';
          body.appendChild(
            html('strong', '', `${lead}Rosvo vei rahat — oikea vastaus oli "${duel.options[duel.correct]}".`),
          );
        }
        if (duel.fact) body.appendChild(html('span', 'muted', duel.fact));
        const duelSource = this.sourceLine(duel.source);
        if (duelSource) body.appendChild(duelSource);
        this.quizResult.appendChild(body);
      }
    }
    this.quizContinue.hidden = !answered || !revealed || p.isBot;

    if (!this.quizDialog.open) this.quizDialog.showModal();
  }

  /** Vastaus rosvolle: tuomio, tauko ja selitys — kuten tietovisassa. */
  answerDuelUi(index) {
    const { game } = this;
    this.stopQuizTimer();
    this.run(() => game.answerDuel(index), {
      after: async () => {
        const duel = game.duel;
        if (!duel) return;
        sfx.play(duel.right ? 'correct' : 'robber');
        this.renderQuiz();
        await this.wait(this.reducedMotion ? 200 : 900);
        this.revealShownFor = duel;
        this.renderQuiz();
        await this.wait(this.reducedMotion ? 0 : 500);
      },
    });
  }

  // --- tiimalasi ------------------------------------------------------------

  /** Käynnistää tai pysäyttää vastausajan sen mukaan, kuka on vuorossa. */
  renderTimer(quiz) {
    // Toimii sekä tietovisalle että kaksintaistelulle: molemmilla on
    // chosen- ja seconds-kentät.
    // Pulmassa ei ole kelloa: se on päättelytehtävä, ei nopeuskilpailu.
    const show = !this.game.player.isBot && quiz.chosen === null && quiz.kind !== 'puzzle';
    this.quizTimerEl.hidden = !show;
    if (!show) {
      this.stopQuizTimer();
      return;
    }
    if (this.timedQuiz !== quiz) this.startQuizTimer(quiz);
  }

  startQuizTimer(quiz) {
    this.stopQuizTimer();
    this.timedQuiz = quiz;
    this.remaining = (quiz.seconds ?? QUIZ_SECONDS) * 1000;
    this.lastTick = performance.now();
    this.lastWhole = Math.ceil(this.remaining / 1000);
    if (!this.reducedMotion) {
      this.hourglass.classList.remove('turning');
      void this.hourglass.getBoundingClientRect();
      this.hourglass.classList.add('turning');
    }
    this.updateTimer();
    this.quizTimer = setInterval(() => this.tickTimer(), 100);
  }

  stopQuizTimer() {
    if (this.quizTimer) clearInterval(this.quizTimer);
    this.quizTimer = null;
    this.timedQuiz = null;
  }

  tickTimer() {
    const now = performance.now();
    const dt = now - this.lastTick;
    this.lastTick = now;
    // Animaatioiden ajaksi kello pysähtyy, jotta aikaa ei kulu odotellessa.
    if (this.busy) return;

    this.remaining = Math.max(0, this.remaining - dt);
    const quiz = this.game.quiz;
    if (quiz) quiz.seconds = Math.ceil(this.remaining / 1000);
    this.updateTimer();

    const whole = Math.ceil(this.remaining / 1000);
    if (whole !== this.lastWhole) {
      this.lastWhole = whole;
      if (whole > 0 && whole <= 10) sfx.play('tick');
    }
    if (this.remaining <= 0) this.timeUp();
  }

  updateTimer() {
    const secs = Math.ceil(this.remaining / 1000);
    this.quizSeconds.textContent = String(secs);
    this.quizTimerEl.classList.toggle('urgent', secs <= 10);
    this.setSand(1 - this.remaining / (QUIZ_SECONDS * 1000));
  }

  /**
   * Piirtää hiekan tiimalasiin: ylhäällä pinta valuu suppilon muotoisena
   * kuoppana kohti kaulaa, alhaalla kasa nousee pyöreänä kekona.
   */
  setSand(progress) {
    const t = Math.min(1, Math.max(0, progress));
    const cx = 22;

    // Yläkupu: leveä ylhäällä (y 8.4), kapea kaulassa (y 33.6).
    const surface = 8.4 + t * 25.2;
    const topHalf = Math.max(0, 12.8 - (surface - 8.4) * 0.4901);
    const dip = 1.5 * (1 - t) + 0.25;
    this.hgTopSand.setAttribute(
      'd',
      t >= 0.999
        ? ''
        : `M ${(cx - topHalf).toFixed(2)} ${surface.toFixed(2)} `
          + `Q ${cx} ${(surface + dip * 2).toFixed(2)} ${(cx + topHalf).toFixed(2)} ${surface.toFixed(2)} `
          + `L 22.45 33.6 L 21.55 33.6 Z`,
    );

    // Alakupu: hiekka kertyy pohjalle (y 60.2) ja nousee kohti kaulaa (y 34.4).
    const level = 60.2 - t * 25.8;
    const botHalf = Math.min(12.8, 0.45 + (level - 34.4) * 0.4787);
    const height = 60.2 - level;
    const mound = Math.min(2.6, height * 0.5, (level - 34.4) * 0.4);
    this.hgBottomSand.setAttribute(
      'd',
      t <= 0.001
        ? ''
        : `M 9.2 60.2 L 34.8 60.2 L ${(cx + botHalf).toFixed(2)} ${level.toFixed(2)} `
          + `Q ${cx} ${(level - mound * 2).toFixed(2)} ${(cx - botHalf).toFixed(2)} ${level.toFixed(2)} Z`,
    );

    // Virtaava hiekka näkyy vain niin kauan kuin sitä riittää.
    const flowing = t > 0.004 && t < 0.999;
    this.hgStream.style.display = flowing ? '' : 'none';
    this.hgStream.setAttribute('height', Math.max(0, level - 33.6).toFixed(2));
  }

  /** Aika loppui: sama rytmi kuin väärässä vastauksessa, mutta ilman paljastusta. */
  timeUp() {
    this.stopQuizTimer();
    const { game } = this;
    if (game.phase === 'duel' && game.duel && game.duel.chosen === null) {
      this.run(() => game.timeoutDuel(), {
        after: async () => {
          const duel = game.duel;
          if (!duel) return;
          sfx.play('timeout');
          this.renderQuiz();
          await this.wait(this.reducedMotion ? 200 : 900);
          this.revealShownFor = duel;
          this.renderQuiz();
          await this.wait(this.reducedMotion ? 0 : 500);
        },
      });
      return;
    }
    if (game.phase !== 'quiz' || !game.quiz || game.quiz.chosen !== null) return;
    this.run(() => game.timeoutQuiz(), {
      after: async () => {
        const quiz = game.quiz;
        if (!quiz) return;
        sfx.play('timeout');
        this.renderQuiz();
        await this.wait(this.reducedMotion ? 200 : 900);
        this.revealShownFor = quiz;
        this.renderQuiz();
        await this.wait(this.reducedMotion ? 0 : 500);
      },
    });
  }

  /**
   * Vastaus tietovisaan: ensin "Oikein!"/"Väärin.", pieni tauko ja sitten
   * aarteen paljastus, jossa iso laatta kääntyy ympäri.
   */
  answerQuiz(index) {
    const { game } = this;
    this.stopQuizTimer();
    this.run(() => game.answerQuiz(index), {
      after: async () => {
        const quiz = game.quiz;
        if (!quiz) return;
        sfx.play(quiz.right ? 'correct' : 'wrong');
        this.renderQuiz();
        await this.wait(this.reducedMotion ? 200 : 850);
        if (quiz.right && quiz.found) await this.playTokenReveal(quiz.found);
        this.revealShownFor = quiz;
        this.renderQuiz();
        if (!quiz.right) await this.wait(this.reducedMotion ? 0 : 500);
      },
    });
  }

  /**
   * Aarteen paljastus ruudun keskellä. Aarre, jolla on oma AI-kuva
   * (ruby/emerald/topaz), NOUSEE MUSTASTA: kuva keskelle ilman
   * kehyksiä ja tekstit sen ympärille (omistajan palaute 9.8.2026 —
   * vanha kääntyvä laattakuva oli kuvan rinnalla sekava). Kuvattomat
   * laatat (tähti, kenkä, rosvo, tyhjä, linssi) kääntyvät entiseen
   * tapaan.
   */
  async playTokenReveal(type) {
    const token = this.game.tokenTypes[type];
    const onKuva = Boolean(token.kuva);
    const overlay = html('div', `reveal-overlay${onKuva ? ' kuvallinen' : ''}`);
    const scene = html('div', 'reveal-scene');

    let disc = null;
    let aarrekuva = null;
    let rays = null;
    if (onKuva) {
      aarrekuva = document.createElement('img');
      aarrekuva.className = 'reveal-aarrekuva';
      aarrekuva.alt = token.name;
      const [osoite, vara] = aarrekuvanOsoitteet(token.kuva);
      // Puuttuva tiedosto (yhden tiedoston versio levyltä) ei saa
      // jättää rikkinäistä kuvaketta — kortti jatkaa tekstillä.
      asetaKuva(aarrekuva, osoite, vara, () => aarrekuva.remove());
    } else {
      disc = html('div', `reveal-disc ${type}`);
      const back = html('div', 'reveal-face reveal-back');
      back.appendChild(revealFaceSvg('back'));
      const front = html('div', 'reveal-face reveal-front');
      front.appendChild(revealFaceSvg('front', type));
      disc.appendChild(back);
      disc.appendChild(front);
      rays = revealRaysSvg();
      rays.classList.add('reveal-rays');
    }

    const caption = html('div', 'reveal-caption');
    // Nuoren herran huudahdus ensin — se kuuluu juuri siihen hetkeen,
    // kun aarre tulee näkyviin; cliffhanger-teksti vasta sen jälkeen.
    const huudahdus = arvoHuudahdus(type, token);
    if (huudahdus) caption.appendChild(html('span', 'reveal-huudahdus', huudahdus));
    caption.appendChild(html('strong', '', token.name));
    caption.appendChild(html('span', '', REVEAL_SUB[type] ?? `+${token.value} puntaa`));
    /*
     * Tarinakaaren aarreteksti paljastuksen alle: kätkön löytyessä
     * kaaren henkilö sulkee kohtaamisen ja jättää auki jäävän vihjeen
     * (omistajan tilaus 9.8.2026 — korvasi isoisän aarresitaatin).
     * Ei tyhjälle laatalle — pettymyksellä on oma selitteensä. Teksti
     * on kerrontaa eikä sitaatti, joten lainausmerkkejä tai nimiötä
     * ei lisätä päälle.
     */
    const kaari = (type !== 'empty' && KAARI_LAUDAT.has(this.game.pack.id))
      ? TARINAKAARI[this.game.quiz?.cityId] : null;
    if (kaari?.aarre) {
      caption.appendChild(html('p', 'reveal-isoisa', kaari.aarre));
      if (kertojaTila() !== 'ei') {
        this.playDiaryVoice(`assets/audio/puhe-kaari-aarre-${this.game.quiz.cityId}.mp3`, { viive: 900 });
      }
    }
    /*
     * Taikalasin kohdalla "Taikalasi" ei kerro vielä mitään: pelaajan
     * pitää nähdä KUMPI lasi löytyi ja mitä sillä näkee. Nimi ja kuvaus
     * asuvat linssimoduulissa (suunnitelman luku 3), joten ne haetaan
     * dynaamisella tuonnilla — eikä laatan kääntyminen jää sitä
     * odottamaan, vaan teksti täydentyy paikalleen kun se saapuu.
     */
    if (type === 'linssi') void this.taydennaLinssiPaljastus(caption);

    if (onKuva) {
      scene.appendChild(aarrekuva);
    } else {
      const stage = html('div', 'reveal-stage');
      stage.appendChild(rays);
      stage.appendChild(disc);
      scene.appendChild(stage);
    }
    scene.appendChild(caption);
    overlay.appendChild(scene);
    // Dialogi on top layerissa, joten paljastus lisätään sen sisään.
    this.quizDialog.appendChild(overlay);

    // Näyttöaika kasvaa selitteen mukana: "+300 puntaa" saa vilahtaa,
    // mutta pitkä selite (esim. tyhjän laatan "merkintä oli vanhentunut")
    // pitää ehtiä lukea. Napautus ohittaa odotuksen.
    const seliteMs = ((REVEAL_SUB[type] ?? '').length + (kaari?.aarre?.length ?? 0)) * 45;
    const napautus = new Promise((resolve) => {
      overlay.addEventListener('pointerdown', resolve, { once: true });
    });

    if (this.reducedMotion) {
      if (onKuva) {
        aarrekuva.classList.add('shown');
      } else {
        disc.classList.add('flipped');
        rays.classList.add('shown');
      }
      caption.classList.add('shown');
      sfx.play(treasureSound(type));
      await Promise.race([this.wait(900 + seliteMs), napautus]);
    } else if (onKuva) {
      // Kuva nousee mustasta: hidas häivytys ja kasvu, ei kääntöä.
      await this.wait(420);
      aarrekuva.classList.add('shown');
      sfx.play(treasureSound(type));
      await this.wait(760);
      caption.classList.add('shown');
      await Promise.race([this.wait(1250 + seliteMs), napautus]);
      overlay.classList.add('leaving');
      await this.wait(300);
    } else {
      await this.wait(420);
      disc.classList.add('flipped');
      sfx.play('flip');
      await this.wait(760);
      sfx.play('clack');
      sfx.play(treasureSound(type));
      rays.classList.add('shown');
      caption.classList.add('shown');
      await Promise.race([this.wait(1250 + seliteMs), napautus]);
      overlay.classList.add('leaving');
      await this.wait(300);
    }
    overlay.remove();
    // Löytö päätyy matkalaukkuun: yläreunan Laukku-nappi heilahtaa
    // eloisasti merkiksi (omistajan toive). Tyhjä laatta ei tuo mitään.
    if (type !== 'empty') this.elavoitaLaukku();
  }

  /**
   * Paljastusruudun teksti taikalasille: linssin oma nimi ja se yksi
   * rivi, joka kertoo miksi lasi on hieno.
   *
   * Tunnus luetaan pelin tapahtumajonosta, johon revealToken juuri
   * kirjoitti sen (kenttä linssi). Jono tyhjennetään vasta
   * playEventsissä, joka ajetaan tämän animaation jälkeen.
   */
  async taydennaLinssiPaljastus(caption) {
    const tunnus = this.game.events?.find((e) => e.linssi)?.linssi ?? null;
    if (!tunnus) return;
    const tuki = await this.lataaLinssit();
    const linssi = tuki?.kaikki.find((l) => l.tunnus === tunnus) ?? null;
    // Kortti on voinut jo poistua ruudulta: hidas tuonti ei saa
    // kirjoittaa irralliseen elementtiin.
    if (!linssi || !caption.isConnected) return;
    caption.firstChild.textContent = linssi.nimi;
    caption.lastChild.textContent = linssi.lyhyt;
  }

  /**
   * Laukku-nappi herää hetkeksi eloon, kun laukkuun tulee jotain uutta:
   * passileima, kunniamerkintä tai löydetty aarre. Sama pieni heilahdus
   * joka kerta — huomio kiinnittyy yläreunaan ilman uutta ilmoitusta.
   */
  elavoitaLaukku() {
    const nappi = document.getElementById('turn-pill');
    if (!nappi) return;
    nappi.classList.remove('laukku-elo');
    void nappi.offsetWidth;
    nappi.classList.add('laukku-elo');
  }

  // --- toiminnot ja animaatiot ---------------------------------------------

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Kirjoituskone: teksti naksuu ruudulle sana kerrallaan kuin vanhalla
   * matkakirjoituskoneella. Sama paikka (slot) keskeyttää edellisen
   * kirjoituksen, jotta tekstit eivät sekoitu keskenään. Liikkeen
   * vähennystä toivovalle teksti ilmestyy kerralla.
   */
  /**
   * Kirjoituskoneteksti. Koko teksti on alusta asti paikallaan, mutta
   * kirjoittamaton osa on näkymätöntä: se varaa tilansa, joten rivitys ei
   * muutu kesken kirjoituksen eikä jo luettu teksti hyppää paikaltaan.
   * Aiemmin sanat lisättiin yksi kerrallaan, jolloin koko kappale latoutui
   * uudelleen joka sanalla.
   */
  typeText(target, text, slot = 'fact', done = null, speed = TYPE_MS) {
    this.typeTimers ??= {};
    clearTimeout(this.typeTimers[slot]);
    const full = String(text);
    if (this.reducedMotion) {
      target.textContent = full;
      done?.();
      return;
    }

    target.textContent = '';
    const kirjoitettu = html('span', 'typed');
    const tuleva = html('span', 'pending');
    target.appendChild(kirjoitettu);
    target.appendChild(tuleva);

    const words = full.split(' ');
    let shown = 0;
    const piirra = () => {
      kirjoitettu.textContent = words.slice(0, shown).join(' ');
      tuleva.textContent = shown < words.length
        ? (shown ? ' ' : '') + words.slice(shown).join(' ')
        : '';
    };
    piirra();

    // Avaustekstillä on kirjoittajan rytmi: sanaväli huojuu ja
    // välimerkin jälkeen pidetään tauko — tasainen konemainen tahti
    // kuulosti ja näytti luonnottomalta.
    const viive = (sana) => {
      if (slot !== 'intro') return speed;
      const perus = speed * (0.7 + Math.random() * 0.6);
      // Revennyt katkelma jättää lukijan tyhjän päälle: pitkä hiljaisuus
      // ennen kuin seuraava ajatus naksahtaa ruutuun.
      if (/…"?$/.test(sana)) return perus + 1200 + Math.random() * 500;
      if (/[.!?]$/.test(sana)) return perus + 620 + Math.random() * 320;
      if (/[,;:—–]$/.test(sana)) return perus + 300 + Math.random() * 160;
      // Kirjoittaja pysähtyy välillä miettimään kesken virkkeenkin.
      if (Math.random() < 0.15) return perus + 280 + Math.random() * 340;
      return perus;
    };

    const kirjoita = () => {
      shown++;
      piirra();
      // Kirjoituskoneen lyönti täsmälleen sillä hetkellä, kun sana
      // ilmestyy — ei ennen eikä jälkeen.
      if (slot === 'intro') sfx.play('pen');
      if (shown >= words.length) {
        // Lopuksi pelkkä teksti, jotta perään lisättävä lähderivi asettuu
        // luontevasti eikä jää näkymättömän jäänteen taakse.
        target.textContent = full;
        done?.();
        return;
      }
      this.typeTimers[slot] = setTimeout(kirjoita, viive(words[shown - 1]));
    };
    this.typeTimers[slot] = setTimeout(kirjoita, speed);
  }

  showError(message) {
    this.errorEl.textContent = message;
    this.errorEl.hidden = false;
  }

  /**
   * Suorittaa toiminnon ja antaa animaatioiden pyöriä rauhassa: uusi klikkaus
   * tai botin vuoro odottaa, kunnes edellinen tapahtuma on näytetty.
   */
  async run(fn, { after } = {}) {
    if (this.busy || this.dead) return;
    this.busy = true;
    this.actionsEl.dataset.busy = 'true';
    try {
      const result = fn();
      if (result && result.ok === false) {
        this.showError(result.error);
        // Peruuntunut lento ei saa jättää kalvolippua päälle mykistämään
        // äänimaisemaa.
        if (!document.querySelector('.flight-overlay')) {
          document.body.classList.remove('flight-active');
        }
        return;
      }
      if (after) await after(result);
      await this.playEvents();
    } finally {
      this.busy = false;
      delete this.actionsEl.dataset.busy;
      this.render();
    }
  }

  doAction(fn) {
    this.run(fn);
  }

  /** Nopanheitto: silmäluku pyörii kartan päällä ja jää hetkeksi näkyviin. */
  doRoll() {
    // Radiotilassa kartalla ei liikuta.
    if (this.radioPaalla()) return;
    // Nopanheitto keskeyttää tarinan: luenta häipyy pehmeästi pois.
    this.haivytaLuenta();
    this.run(() => this.game.actionRoll(), { after: (result) => this.animateDie(result.die) });
  }

  /**
   * Häivyttää käynnissä olevan luennan pehmeästi pois (nopanheitto
   * keskeyttää tarinan — omistajan toive: ei töksähdystä). Tauolla
   * oleva tai jo hiljainen luenta suljetaan suoraan.
   */
  haivytaLuenta(kestoMs = 700) {
    const audio = this.diaryVoice;
    if (!audio || audio.paused) {
      this.stopDiaryVoice();
      return;
    }
    // Irrotetaan heti, jotta seuraava luenta saa alkaa puhtaalta pöydältä.
    this.diaryVoice = null;
    this.luentaTauolla = null;
    const alku = audio.volume;
    const t0 = performance.now();
    const askel = (nyt) => {
      const t = Math.min(1, (nyt - t0) / kestoMs);
      audio.volume = alku * (1 - t);
      if (t < 1 && !audio.paused) {
        requestAnimationFrame(askel);
      } else {
        audio.pause();
        audio.removeAttribute('src');
        this.luennat?.delete(audio);
        /*
         * Vapautus puhujan roolista, samasta syystä kuin
         * stopDiaryVoicessa: muuten laskuri jää plussalle eikä tausta
         * palaa enää koskaan täyteen voimaan.
         *
         * Tämä puuttui, ja se näkyi juuri kehittäjätilassa (omistajan
         * havainto: "taustaäänet katoavat kun jonkun aikaa hypin
         * kartalla"). Jokainen hyppy kutsuu haivytaLuentaa, ja
         * pysäytetty luenta ei laukaise enää 'ended'- eikä
         * 'error'-tapahtumaa — eli sitä, jonka varassa merkitsePuhujan
         * vapautus muuten on. Yksikin keskeytetty luenta jätti taustan
         * pysyvästi puheen alle (0,25), eikä laskuri palannut nollaan
         * enää istunnon aikana.
         *
         * Vasta häivytyksen päätteeksi eikä heti alussa: tausta nousee
         * silloin kun luenta oikeasti vaikenee, ei sen päälle.
         */
        this.vapautaPuhuja(audio);
      }
    };
    requestAnimationFrame(askel);
  }

  /** Siirto: nappula hyppii reittiä pitkin piste kerrallaan. */
  doMove(key) {
    // Radiotilassa kartalla ei liikuta.
    if (this.radioPaalla()) return;
    const { game } = this;
    const move = game.moves?.get(key);
    if (!move) return;
    const player = game.player;
    const from = player.pos;
    const path = move.path;
    this.run(() => game.actionMove(key), { after: () => this.animatePawn(player, from, path) });
  }

  doFly(destination) {
    // Radiotilassa kartalla ei liikuta.
    if (this.radioPaalla()) return;
    const { game } = this;
    // Matkavalinnan välivaihe ei saa jäädä päälle seuraavaan vuoroon.
    this.travelExpanded = false;
    const player = game.player;
    const from = player.pos;
    const lahto = from.type === 'city' ? game.board.cityById.get(from.city) : null;
    const kohde = game.board.cityById.get(destination);
    const suunta = lahto && kohde ? { dx: kohde.x - lahto.x, dy: kohde.y - lahto.y } : null;
    // Repliikki arvotaan ennen siirtoa, jotta rng-kutsu osuu samaan kohtaan
    // riippumatta siitä, näytetäänkö animaatio.
    const line = game.flightLine(destination);
    // Kalvollisella lennolla kohteen äänimaisema odottaa kalvon loppuun.
    if (game.pack.id === 'maailma') {
      sfx.play('flight');
      if (!this.reducedMotion) document.body.classList.add('flight-active');
    }
    this.run(() => game.actionFly(destination), {
      after: async () => {
        // Lentokalvo kuuluu vain maailmankartalle; mantereella nappula
        // lentää suoraan karttanäkymässä — rauhallisemmin ja moottorin
        // hurinan saattelemana (omistajan toive).
        if (game.pack.id === 'maailma') {
          await this.animateFlight(lahto?.name ?? '', kohde?.name ?? '', line, suunta);
          await this.animatePawn(player, from, [player.pos], FLIGHT_MS);
        } else {
          sfx.startFlight(MANNER_LENTO_MS);
          await this.animatePawn(player, from, [player.pos], MANNER_LENTO_MS);
          sfx.stopFlight();
        }
      },
    });
  }

  /**
   * Zoomaa näkymän kahden pisteen ympärille lennon ajaksi — kertaheitolla,
   * ei liukuen: viewBoxin animointi piirtää koko kartan joka ruudulla
   * uudelleen ja tökkii hitaammilla koneilla. Rajaus on tiukka, jotta
   * lentoreitti täyttää reilusti yli puolet ruudusta ja matka näyttää
   * matkalta. Palauttaa lähtönäkymän viewBox-merkkijonon paluuta varten.
   */
  /**
   * Indiana Jones -lentoanimaatio läpikuultavana kalvona kartan päällä.
   * Näytetään vain maailmankartalla — mantereella lento tapahtuu suoraan
   * karttanäkymässä. Kohtaus häipyy itsestään hetken kuluttua perillä,
   * ja napautus mihin tahansa ohittaa sen heti.
   *
   * `prefers-reduced-motion` ohittaa animaation kokonaan: silloin ei piirretä
   * mitään eikä odoteta, jotta peli etenee samaa tahtia kuin ennenkin.
   */
  async animateFlight(fromLabel, toLabel, line = null, dir = null) {
    if (this.reducedMotion) return;
    return this.isoAnimaatio(() => this.animateFlightSisalla(fromLabel, toLabel, line, dir));
  }

  /** Lennon varsinainen piirto; kääre yllä hiljentää kartan animaatiot. */
  async animateFlightSisalla(fromLabel, toLabel, line = null, dir = null) {

    const overlay = html('div', 'flight-overlay');
    const scene = el('svg', { viewBox: '0 0 1000 560', class: 'flight-scene' }, overlay);
    this.mapPane.appendChild(overlay);
    // Alareunan kortit ja napit piiloon lennon ajaksi: kalvon alla näkyy
    // vain kohdemantereen kartta. Lukuääni jatkuu kalvon alla.
    document.body.classList.add('flight-active');

    // Napautus mihin tahansa hypäyttää koneen perille; kalvo pysyy
    // kuitenkin esillä, kunnes pelaaja astuu ulos napista. Animaatiot
    // kerätään talteen, jotta napautus voi viedä ne loppuun.
    const lentoAnimaatiot = [];
    overlay.addEventListener('pointerdown', () => {
      for (const a of lentoAnimaatiot) a.finish();
    }, { once: true });

    // Isoisän karttalehti: käsin piirretyt vyöhykeviivat katkoviivalla
    // (kääntöpiirit) ja himmeitä päiväkirjamerkintöjä piirroksineen.
    const vyohyke = (y, nimi) => {
      el('path', {
        d: `M20,${y} q160,-8 330,-2 t320,8 t310,-6`,
        class: 'flight-zone',
      }, scene);
      const t = el('text', { x: 962, y: y - 10, 'text-anchor': 'end', class: 'flight-zone-name' }, scene);
      t.textContent = nimi;
    };
    vyohyke(120, 'Kravun kääntöpiiri');
    vyohyke(300, 'päiväntasaaja');
    vyohyke(470, 'Kauriin kääntöpiiri');
    const muistiinpano = (x, y, rivit, kulma = -2) => {
      const g = el('g', { transform: `translate(${x},${y}) rotate(${kulma})`, class: 'flight-note' }, scene);
      rivit.forEach((rivi, i) => {
        const t = el('text', { x: 0, y: i * 26, class: 'flight-note-text' }, g);
        t.textContent = rivi;
      });
      return g;
    };
    muistiinpano(60, 80, ['pasaatituuli kantaa', 'lounaaseen — luota siihen'], -3);
    muistiinpano(640, 90, ['N.B. monsuuni kääntyy', 'lokakuussa'], 2);
    muistiinpano(90, 505, ['täällä kompassi', 'valehtelee hiukan'], -1);
    // Pieni kompassiruusu ja aaltoja isoisän käden jälkeä.
    const ruusu = el('g', { transform: 'translate(905,505)', class: 'flight-note' }, scene);
    el('circle', { cx: 0, cy: 0, r: 26, fill: 'none', class: 'flight-doodle' }, ruusu);
    el('path', { d: 'M0,-24 L5,0 L0,24 L-5,0 z M-24,0 L0,-5 L24,0 L0,5 z', class: 'flight-doodle-fill' }, ruusu);
    el('path', { d: 'M330,520 q14,-10 28,0 q14,10 28,0', fill: 'none', class: 'flight-doodle' }, scene);
    el('path', { d: 'M540,60 l14,-18 l12,18 l10,-12 l9,12', fill: 'none', class: 'flight-doodle' }, scene);

    // Lennon suunta seuraa oikeaa maantiedettä, kun molempien päiden
    // koordinaatit tunnetaan: Lontoosta Tangeriin lennetään ylhäältä
    // oikealta alas vasemmalle, kuten oikeallakin kartalla. Ilman suuntaa
    // (esim. porttilento toiselle laudalle) lento nousee vasemmalta ylös.
    const itaan = dir ? dir.dx >= 0 : true;
    const etelaan = dir ? dir.dy >= 0 : false;
    const a = { x: itaan ? 130 : 870, y: etelaan ? 120 : 450 };
    const b = { x: itaan ? 870 : 130, y: etelaan ? 450 : 120 };
    el('circle', { cx: a.x, cy: a.y, r: 9, class: 'flight-dot' }, scene);
    el('circle', { cx: b.x, cy: b.y, r: 9, class: 'flight-dot' }, scene);
    const nimi = (p, teksti) => {
      const t = el('text', {
        x: p.x, y: p.y + 56, 'text-anchor': p.x > 500 ? 'end' : 'start', class: 'flight-name',
      }, scene);
      t.textContent = teksti;
    };
    if (fromLabel) nimi(a, fromLabel);
    if (toLabel) nimi(b, toLabel);

    // Kaari kaartuu aina ylöspäin kulkusuunnasta riippumatta, kuin
    // lentorata vanhan filmin kartalla.
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    let px = -dy / len;
    let py = dx / len;
    if (py > 0) { px = -px; py = -py; }
    const kx = (a.x + b.x) / 2 + px * 170;
    const ky = (a.y + b.y) / 2 + py * 170;
    const d = `M${a.x},${a.y} Q${kx},${ky} ${b.x},${b.y}`;
    const reitti = el('path', { d, class: 'flight-trail' }, scene);
    const kokoPituus = reitti.getTotalLength();
    reitti.style.strokeDasharray = kokoPituus;
    reitti.style.strokeDashoffset = kokoPituus;

    const kone = el('g', { class: 'flight-plane' }, scene);
    // Yksinkertainen kone ylhäältä: runko, siivet ja pyrstö.
    el('path', {
      d: 'M14,0 L-6,0 M-10,0 L-14,0 M2,0 L-8,-9 L-4,-9 L6,0 L-4,9 L-8,9 z '
        + 'M-11,0 L-15,-5 L-13,-5 L-9,0 L-13,5 L-15,5 z',
      class: 'flight-plane-body',
      transform: 'scale(1.7)',
    }, kone);

    // Reitti näytteistetään kerran valmiiksi: getPointAtLength jokaisella
    // ruudunpäivityksellä oli raskas (etenkin iPadin Safarissa) ja teki
    // koneen liikkeestä nykivän. Taulukosta poiminta on ilmaista.
    const NAYTTEITA = 240;
    const naytteet = [];
    for (let i = 0; i <= NAYTTEITA; i++) {
      naytteet.push(reitti.getPointAtLength((kokoPituus * i) / NAYTTEITA));
    }
    const kohta = (osuus) => {
      const f = Math.min(NAYTTEITA - 0.001, Math.max(0, osuus * NAYTTEITA));
      const i = Math.floor(f);
      const j = f - i;
      const p1 = naytteet[i];
      const p2 = naytteet[i + 1];
      return {
        x: p1.x + (p2.x - p1.x) * j,
        y: p1.y + (p2.y - p1.y) * j,
        kulma: (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI,
      };
    };

    // Repliikki ja Astu mantereelle -nappi asuvat samassa kelluvassa
    // alaosassa: asettelu hoituu itsestään eikä napin osumakohtaa
    // tarvitse laskea käsin.
    const alaosa = html('div', 'flight-alaosa');
    overlay.appendChild(alaosa);
    if (line) this.showFlightLine(line, alaosa);
    // Lennon kesto repliikin mukaan; ilman repliikkiä perusmitta.
    const sanoja = line ? String(line).trim().split(/\s+/).length : 0;
    const lennonKesto = Math.min(
      LENNON_ENINTAAN_MS,
      Math.max(FLY_OVERLAY_MS, LENNON_POHJA_MS + sanoja * LENNON_SANA_MS),
    );
    /*
     * Pieni nuoli oikeaan alanurkkaan muutaman sekunnin kuluttua.
     *
     * Kalvon saa jo nyt hypäytettyä perille napauttamalla mistä
     * tahansa, mutta sitä ei näe mistään. Omistajan toive: "oikeassa
     * alareunassa voisi olla pieni nuoli joka syttyisi muutaman
     * sekunnin kuluttua. Se saa olla kuitenkin aika huomaamaton."
     *
     * Huomaamaton on tässä vaatimus eikä makuasia: nuoli kilpailee
     * saman ruudun repliikin kanssa, ja jos se vetää katseen, se vie
     * huomion juuri siitä tekstistä, jonka lukemiseen aikaa lisättiin.
     */
    const nuoli = html('button', 'flight-eteen');
    nuoli.type = 'button';
    nuoli.setAttribute('aria-label', 'Ohita lento');
    nuoli.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">'
      + '<path d="M8 5 L15 12 L8 19" fill="none" stroke="currentColor"'
      + ' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    overlay.appendChild(nuoli);
    const nuolenAjastin = setTimeout(() => nuoli.classList.add('nakyy'), LENNON_NUOLI_MS);
    nuoli.addEventListener('click', () => {
      for (const a of lentoAnimaatiot) a.finish();
    });
    // Potkurihurina koko kohtauksen ajaksi: nousee ja laskee sen mukana.
    sfx.startFlight(lennonKesto);

    // Kone ja reittiviiva lentävät selaimen omina WAAPI-animaatioina, ei
    // rAF-silmukalla: pääsäikeessä naputtava kirjoituskone ja käynnistyvä
    // lukuääni pudottivat rAF-ruutuja ja kone nykäisi (omistajan havainto).
    // Avainruudut lasketaan valmiiksi pehmennys sisään leivottuna, ja
    // selain interpoloi niiden välit tasaisesti omassa tahdissaan.
    const RUUTUJA = 120;
    const koneRuudut = [];
    const reittiRuudut = [];
    for (let i = 0; i <= RUUTUJA; i++) {
      const t = i / RUUTUJA;
      // Pehmeä kiihdytys ja jarrutus, jottei kone nykäise liikkeelle.
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const p = kohta(e);
      koneRuudut.push({
        offset: t,
        transform: `translate(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px) rotate(${p.kulma.toFixed(2)}deg)`,
      });
      reittiRuudut.push({ offset: t, strokeDashoffset: kokoPituus * (1 - e) });
    }
    // Lähtöasento ennen animaation alkua, ettei kone välähdä origossa.
    kone.style.transform = koneRuudut[0].transform;
    const koneAnim = kone.animate(koneRuudut, {
      duration: lennonKesto, easing: 'linear', fill: 'forwards',
    });
    const reittiAnim = reitti.animate(reittiRuudut, {
      duration: lennonKesto, easing: 'linear', fill: 'forwards',
    });
    lentoAnimaatiot.push(koneAnim, reittiAnim);
    await Promise.all([koneAnim.finished, reittiAnim.finished]).catch(() => {
      /* peruttu animaatio (esim. dialogin sulku) ei kaada lentoa */
    });

    // Moottori jää käymään kalvon ajaksi — se hiljenee vasta, kun
    // pelaaja astuu ulos koneesta.

    // Perillä kalvo jää odottamaan: lukuääni saa puhua rauhassa, ja
    // pelaaja astuu ulos itse valitsemallaan hetkellä.
    clearTimeout(nuolenAjastin);
    nuoli.remove();
    await new Promise((resolve) => {
      const nappi = html('button', 'flight-exit', 'Astu mantereelle');
      nappi.addEventListener('click', resolve, { once: true });
      // Nappi virtaa repliikin alle samassa alaosassa — osumakohta on
      // aina täsmälleen siinä missä nappi näkyy.
      alaosa.appendChild(nappi);
    });

    sfx.stopFlight();
    // Kohteen äänimaisema alkaa jo kalvon häivytyksen aikana: kun
    // kertoja aloittaa sekunnin kuluttua saapumisesta, tausta on ehtinyt
    // nousta kuuluviin eikä ilmesty puheen kanssa yhtä aikaa.
    this.ennakoiAmbienssi(this.game.player?.pos);
    /*
     * SAAPUMISNÄKYMÄ ASETETAAN ENNEN KALVON HÄIVYTYSTÄ.
     *
     * Kalvo häipyy 280 millisekuntia, ja sen läpi näkyy kartta. Jos
     * saapumiszoom ajastetaan vasta kalvon poiston jälkeen, häivytyksen
     * ajan näkyy laudan KOKONÄKYMÄ — ja vasta sitten kuva hyppää
     * lähemmäs ja alkaa liukua. Omistaja näki juuri sen: "näkyy ensin
     * koko maailmankartta, sitten se vain hyppää lähemmäs ja sitten
     * vasta zoomaa."
     *
     * Kun näkymä asetetaan ensin, kalvon takaa paljastuu suoraan liu'un
     * lähtöasento eikä kokonäkymä. Hyppyä ei ole, koska mitään ei
     * ehditty näyttää siitä mistä hypättäisiin.
     *
     * zoomaaMantereelle asettaa asennon heti mutta käynnistää liu'un
     * vasta ZOOM_TAUKO_MS:n kuluttua (260 ms), eli suunnilleen silloin
     * kun kalvo on juuri kadonnut.
     *
     * flight-active on purettava ENSIN. mannerZoomTarpeen() palauttaa
     * falsen niin kauan kuin lippu on päällä (zoomaus ehti muuten
     * tapahtua lennon aikana), joten ilman purkua saapumiszoom ei
     * käynnisty lainkaan — mitattuna näkyvä leveys jäi laudan
     * levyiseksi koko saapumisen ajaksi.
     */
    document.body.classList.remove('flight-active');
    this.ajastaMannerZoom();
    overlay.classList.add('flight-leaving');
    await this.wait(280);
    overlay.remove();
    this.hideFlightLine();
    // Ulos astuttaessa päiväkirja pääsee ääneen: lennon ajaksi lykätty
    // saapumismerkintä alkaa kirjoittua ja soida vasta nyt.
    if (!this.dead) this.render();
    // Kartan bittikartta täydennetään vasta tässä: lennon aikana
    // rasterointi olisi jumittanut kalvon animaation ja puheen ajastimen.
    this.taydennaTaide?.({ heti: true });
  }

  /**
   * Nuoren herran repliikki lennon ajaksi, kirjoituskoneella. Rivi elää
   * kalvon kelluvassa alaosassa ja poistuu kalvon mukana.
   */
  showFlightLine(line, kotelo) {
    this.flightLine = html('p', 'flight-line');
    kotelo.appendChild(this.flightLine);
    this.typeText(this.flightLine, line, 'flight');
  }

  hideFlightLine() {
    // Rivi poistuu kalvon mukana; viite siivotaan, ettei kirjoitus jatku
    // irronneeseen elementtiin.
    this.flightLine = null;
  }

  /** Siirtää nappulaa askel kerrallaan annettua polkua pitkin. */
  async animatePawn(player, from, path, stepMs = STEP_MS) {
    return this.isoAnimaatio(() => this.animatePawnSisalla(player, from, path, stepMs));
  }

  /** Nappulan varsinainen siirto; kääre yllä hiljentää kartan animaatiot. */
  async animatePawnSisalla(player, from, path, stepMs = STEP_MS) {
    if (!path || path.length === 0) return;
    const { board } = this.game;

    this.movingPlayerId = player.id;
    this.drawPawns();
    const g = this.pawnShape(this.pawnLayer, player, false);
    g.classList.add('pawn-moving');
    if (stepMs !== STEP_MS) g.style.transitionDuration = `${stepMs}ms`;

    const start = pixelOf(board, from);
    g.style.transform = `translate(${start.x}px, ${start.y}px)`;
    g.getBoundingClientRect(); // varmistaa, että ensimmäinenkin askel animoituu

    for (const [i, pos] of path.entries()) {
      const { x, y } = pixelOf(board, pos);
      g.style.transform = `translate(${x}px, ${y}px)`;
      // Määränpään äänimaisema lähtee nousemaan jo viimeisellä
      // askeleella, jotta ristihäivytys on käynnissä saapumishetkellä
      // eikä ala vasta kertojan kanssa yhtä aikaa (omistajan toive).
      if (i === path.length - 1) this.ennakoiAmbienssi(pos);
      sfx.play(i === path.length - 1 ? 'arrive' : 'step');
      await this.wait(this.reducedMotion ? 0 : stepMs);
    }

    g.remove();
    this.movingPlayerId = null;
    this.revealShownFor = null;
    this.drawPawns();
  }

  /** Nopanheitto: noppa lentää nappulan vierestä laudalle ja jää siihen. */
  /**
   * Ajaa isoja animaatioita: kartan päällä ei saa sinä aikana olla mitään
   * jatkuvaa. Yksikin sykkivä elementti suodatetun kartan päällä pakottaa
   * kartan piirtymään uudelleen joka kehyksellä (mitattu 15 fps vastaan
   * 60 fps), ja juuri isot animaatiot ovat ne, joissa se näkyy nykimisenä.
   *
   * Laskuri eikä lippu, koska animaatiot voivat mennä sisäkkäin: lento
   * kutsuu nappulan siirtoa omansa sisällä.
   */
  async isoAnimaatio(tehtava) {
    this.isojaAnimaatioita = (this.isojaAnimaatioita ?? 0) + 1;
    document.body.classList.add('animaatio-kaynnissa');
    try {
      return await tehtava();
    } finally {
      this.isojaAnimaatioita -= 1;
      if (this.isojaAnimaatioita <= 0) {
        this.isojaAnimaatioita = 0;
        document.body.classList.remove('animaatio-kaynnissa');
      }
    }
  }

  async animateDie(value) {
    if (!value) return;
    this.dieEl.hidden = true;
    this.turnStatus.textContent = 'Noppa pyörii…';

    const player = this.game.player;
    this.dieJitter = { x: (Math.random() - 0.5) * 0.06, y: (Math.random() - 0.5) * 0.05 };
    const from = this.mapToPane(pixelOf(this.game.board, player.pos));
    const to = this.dieRestingSpot();
    this.dieThrown = true;

    await this.isoAnimaatio(() => this.boardDie.roll(value, from, to, {
      reduced: this.reducedMotion,
      onTick: () => sfx.play('dieTick'),
      onLand: () => sfx.play('dieLand'),
      onBounce: () => sfx.play('clack'),
    }));
    this.turnStatus.textContent = `Heitit ${value} — valitse kohde kartalta.`;
    await this.wait(this.reducedMotion ? 0 : 260);
  }

  buildToast({ kind, text, sub, icon, token }) {
    const box = html('div', `event-toast ${kind === 'robber' ? 'bad' : kind}`);
    // Ikoni voi olla viivaikonin nimi tai suora merkki — kuplat piirretään
    // samalla kynällä kuin napit aina kun ikoni sarjasta löytyy.
    const kuva = viivaIkoni(icon);
    if (kuva) kuva.classList.add('toast-icon');
    if (token) box.appendChild(tokenIconSvg(token, kind === 'die' ? 30 : 34));
    else box.appendChild(kuva ?? html('span', 'toast-icon', icon ?? '•'));
    const body = html('div');
    body.appendChild(html('span', 'toast-text', text));
    if (sub) body.appendChild(html('span', 'toast-sub', sub));
    box.appendChild(body);
    this.mapPane.appendChild(box);
    return box;
  }

  async removeToast(box) {
    box.classList.add('leaving');
    await this.wait(this.reducedMotion ? 0 : 300);
    box.remove();
  }

  /** Näyttää kertyneet tapahtumat yksi kerrallaan kartan päällä. */
  async playEvents() {
    // Aarre ja ryöstäjä nähdään jo paljastusanimaatiossa, joten niitä ei toisteta.
    const events = this.game.takeEvents().filter((e) => e.kind !== 'treasure' && e.kind !== 'robber');
    for (const event of events) {
      sfx.play(EVENT_SOUND[event.kind] ?? 'turn');
      const box = this.buildToast(event);
      await this.wait(this.reducedMotion ? 0 : TOAST_MS[event.kind] ?? TOAST_MS.default);
      await this.removeToast(box);
    }
  }

  scheduleBot() {
    clearTimeout(this.botTimer);
    const { game } = this;
    if (this.busy || game.phase === 'over' || !game.player.isBot) return;
    const delay = game.phase === 'quiz' || game.phase === 'duel' ? BOT_QUIZ_DELAY : BOT_DELAY;
    this.botTimer = setTimeout(() => this.botStep(), delay);
  }

  botStep() {
    const { game } = this;
    if (this.busy || game.phase === 'over' || !game.player.isBot) return;

    if (game.phase === 'event') {
      this.run(() => game.closeEvent());
      return;
    }
    if (game.phase === 'duel') {
      if (game.duel.chosen !== null) this.run(() => game.closeDuel());
      else if (wantsDuelBypass(game)) this.run(() => game.actionDuelBypass());
      else if (wantsDuelRelief(game)) this.run(() => game.actionDuelRelief());
      else this.answerDuelUi(chooseDuelAnswer(game));
      return;
    }

    if (game.phase === 'quiz') {
      if (game.quiz.chosen !== null) this.run(() => game.closeQuiz());
      else if (wantsHint(game)) this.run(() => game.actionHint());
      else if (wantsFiftyFifty(game)) this.run(() => game.actionFiftyFifty());
      else this.answerQuiz(chooseQuizAnswer(game));
      return;
    }

    if (game.phase === 'offer') {
      this.run(() => game.actionQuiz());
      return;
    }

    if (game.phase === 'move') {
      const key = chooseMove(game);
      if (key) this.doMove(key);
      else this.run(() => game.endTurn());
      return;
    }

    if (game.phase === 'roll') {
      this.doRoll();
      return;
    }

    const travel = chooseTravel(game);
    if (travel.type === 'fly') this.doFly(travel.destination);
    else this.run(() => game.actionTravel(travel.type));
  }
}
