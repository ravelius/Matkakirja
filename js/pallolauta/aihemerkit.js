/*
 * ══════════════════════════════════════════════════════════════════
 * AIHEMERKIT JA VIUHKA — saman aiheen lähekkäiset nostot yhtenä
 * merkkinä, nimet esiin napautuksesta
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJA 15.9.2026 klo 20.00 UTC (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 27), sanatarkasti Pariisin rykelmästä: *"Tee saman aiheen
 * nostot yhdeksi ilman selitettyä. Klikattaessa vaihtoehdot tulevat
 * viuhkana näkyviin nimien kanssa"*.
 *
 * MIKSI. Kun kohdemaan merkkikatto poistui (PAATOKSET 25, #2533),
 * Ranskan saapumisnäkymään tuli 62 merkkiä 22:n sijaan ja nimiöistä
 * 36 % limittyi — mitattu 15.9.2026. Sovittelu
 * (js/pallolauta/sovittelu.js) väistää minkä voi, mutta Pariisin
 * kokoisessa rykelmässä tilaa ei yksinkertaisesti ole. Omistajan
 * vastaus ei ole pienempi teksti vaan VÄHEMMÄN MERKKEJÄ: samaan
 * kohtaan osuvat saman aiheen nostot ovat yksi aihemerkki, ja nimet
 * ovat napautuksen takana.
 *
 * ══ YKSI EHTO, MITATTU: NIMIÖT LIMITTYISIVÄT ══════════════════════
 *
 * Ryhmä syntyy vain, jos merkkien omat nimiölaatikot
 * (js/pallolauta/nostot.js nostonLaatikko, sama kaava kuin
 * sovittelulla ja osumapinnalla) leikkaavat toisensa tai merkit ovat
 * sormen säteen sisällä toisistaan (RYHMITYKSEN_ETAISYYS_PX). Yksin
 * seisova nosto ei siis koskaan katoa merkin sisään — PAATOKSET 27
 * kohta 4: *"maan laajat yksittäiset nostot näkyvät nimiöin heti"*.
 *
 * ── ZOOMIPORTTI OLI TÄSSÄ, JA SE POISTETTIIN 16.9.2026 ────────────
 *
 * Ryhmityksellä oli 15.–16.9.2026 TOINEN ehto: zoomin oli oltava yhä
 * saapumisen tuntumassa (`lahizoomiAuki`, LAHIZOOMIN_OSUUS_ULOIMMASTA
 * 0,7). Perustelu oli, ettei limitys voi purkautua itsestään: nimiö
 * on PAATOKSET 14:stä lähtien KARTAN mitta, joten zoomatessa teksti
 * kasvoi samassa suhteessa kuin merkkien väli.
 *
 * PERUSTELU KAATUI KAHTEEN MITTAAN (Chromium 390 × 844 dpr 2,
 * Ranska-tallenne, pelaaja Pariisissa; Raamattu KARTTAUUDISTUKSEN
 * PAATOKSET 31):
 *
 *   a) PORTTI AVAUTUI ENNEN KUIN MERKIT ERKANIVAT. Uloszoomauksen
 *      esto pitää puhelimen sisimmän näkymän kohdassa 0,341
 *      uloimmasta (6,23 px lautayksikköä kohden), ja siellä Pariisin
 *      21 noston LYHIN keskinäinen ruutuväli on 39,2 px — yhä alle
 *      sormen 44 px:n, ja 19 nostoparia 210:stä on sen sisällä.
 *      Rykelmä EI siis voi hajota kokonaan millään pelin sallimalla
 *      zoomilla, mutta portti sammutti ryhmityksen jo 0,7:ssä, ja
 *      pelaajalle jäi kasa palloja ja viisi päällekkäistä nimeä
 *      (omistaja 16.9.2026: *"iso osa nostoista on jossain
 *      piilossa"*). Luvut ovat merkkien OMISTA ruutupisteistä, eivät
 *      sovittelun siirtämistä — taulukko js/pallolauta/nostot.js:ssä.
 *
 *   b) NIMIÖLLÄ ON NYT RUUTUPIKSELIKATTO (js/pallolauta/nostot.js
 *      NOSTON_NIMIO_KATTO_PX 16). Katon yläpuolella teksti seisoo ja
 *      merkkien väli kasvaa, joten limitys PURKAUTUU itsestään —
 *      juuri se, minkä puuttumiselle portti rakennettiin.
 *
 * Ryhmitys noudattaa siksi PAATOKSET 27 kohtaa 3 sellaisenaan:
 * merkit hajoavat omiksi nostoiksi nimiöineen *"kun nostot mahtuvat
 * limittymättä"* — oma mitta, ei kameran kello.
 *
 * ══ VIUHKA ON LISTA ══════════════════════════════════════════════
 *
 * OMISTAJA 17.9.2026 klo 20.35 Suomen aikaa (Raamattu,
 * KARTTAUUDISTUKSEN PAATOKSET 32 kohta 3, kolme iPhone-kuvaa
 * Pariisista v1933), sanatarkasti: *"Kun viuhka avautuu, tekstit ovat
 * liian lahella toisiaan. Viuhkana kohteet voisi avautua yhdeksi
 * siistiksi listaksi jossa selkea kehykseton pohja (vaalennus tai
 * tummennus seka pehmennys)."* TARKENNUS (klo 20.45): lista avautuu
 * *"MERKIN VIERESSA kartalla (tyhjalle puolelle, pehmennetty pohja,
 * sulkeutuu kartan napautuksesta tai zoomista)"*.
 *
 * KAARI ON POISSA. Kohdat ovat yhtenä PYSTYLISTANA merkin kyljessä:
 * sama dx kaikilla riveillä, dy rivi kerrallaan VIUHKAN_VALI_PX:n
 * välein, ja rivin laatikot ovat samanlevyisiä (listan leveys on
 * levein nimiö) — siksi lista on suora reunastaan eikä porrasta.
 *
 * LISTA PYSYY RUUDUSSA JA VÄISTÄÄ ESTEITÄ. `viuhkanAsemat` valitsee
 * puolen (kartan tyhjempi laita), kiinnittää listan ruudun sisään ja
 * kokeilee muutamaa pystysiirtoa; voittaja on se, joka jää vähiten
 * esteiden (kaupungin nimi, pelinappula) päälle. Haku on täysin
 * päätelty (ei satunnaisuutta), joten sama näkymä antaa aina saman
 * listan.
 *
 * POHJA ON KEHYKSETÖN. Yksi paperivaalennus koko listan alla, reuna
 * pehmennetty sisäkkäisillä vyöhykkeillä (ei reunaviivaa, ei
 * suodatinta — iOS-sääntö kieltää filterin kartan kerroksilta).
 *
 * EI SUODATTIMIA (Raamattu, iOS-sääntö; tests/rules.test.mjs):
 * avausliike on transform ja opacity, ei filter.
 */

import {
  NOSTOSYM_MINI_RUUTU, NOSTOSYM_PISTE_R,
  nostosymLyhennaNimio, nostosymNimioAsemointi, nostosymNimioMitta,
  piirraNostosymNimio,
} from '../fokusnosto-symbolit.js';
import { KARTTAVALO_AIHEET, karttavaloVari } from '../karttavalot.js';

const SVG = 'http://www.w3.org/2000/svg';

/** Ryhmityksen väljyys: näin monta pikseliä lähempänä = "limittyy". */
export const RYHMITYKSEN_VARA_PX = 1;
/*
 * TOINEN KYNNYS ON SORMI. Omistajan tilaus (PAATOKSET 27 kohta 1) on
 * *"lähekkäin, esim. kaupungin sisällä"*, ja pelkkä nimiölaatikoiden
 * leikkaus ei sitä tavoita: nimiö on LEVEÄ ja MATALA kaista merkin
 * kyljessä (puolikorkeus ~6 px saapumiszoomilla), joten kaksi merkkiä
 * voi olla 15 px:n päässä toisistaan pystysuunnassa ilman että
 * laatikot koskettavat — silmälle ne ovat silti sama rykelmä.
 *
 * Kynnys on NAPAUTUKSEN OMA SÄDE (js/pallolauta/lauta.js
 * NAPAUTUKSEN_SADE_PX 44): sitä lähempänä toisiaan olevia merkkejä
 * sormi ei erota toisistaan, joten niiden erillään pitäminen ei tuo
 * pelaajalle mitään — se vie vain tilan naapurin nimeltä.
 */
export const RYHMITYKSEN_ETAISYYS_PX = 44;
/** Pienin ryhmä: kaksi nostoa. Yksi nosto on aina oma merkkinsä. */
export const RYHMAN_VAHIN = 2;

/*
 * ══ KOLMAS KYNNYS EI OLE KYNNYS: SAMA KAUPUNKI YHDISTÄÄ AINA ══════
 *
 * OMISTAJA 16.9.2026 klo 19.00 UTC (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 27 TARKENNUS 2, Pariisin lähizoomin ennen/jälkeen-kuvasta,
 * sanatarkasti): *"Nuo saman kategorian jutut piti yhdistaa yhdeksi
 * nostoksi ja sitten sita klikkaamalla sen kategorian nostot aukeaisi
 * omaksi viuhkakseen esille."*
 *
 * Kohta 7 sanoo sen säännöksi: kaupungin rykelmässä saman AIHEEN
 * nostot yhdistetään AINA yhdeksi aihenostoksi *"zoomista riippumatta
 * - ei vain limityksen perusteella"*.
 *
 * MIKSI MITTA EI RIITTÄNYT. Limitys ja sormen säde ovat NÄKYMÄN
 * mittoja: kun pelaaja zoomaa Pariisiin, Mona Lisan varkaus ja
 * Vrain-Lucasin väärennökset erkanevat ruudulla toisistaan ja
 * hajoavat kahdeksi nimiöksi — vaikka ne ovat pelaajan silmissä yhä
 * "Pariisin skandaalit". Omistaja katsoi juuri sitä näkymää. Kaupunki
 * on siis oma, zoomista riippumaton jäsenyytensä (js/fokuskohteet.js
 * nostonKaupunkiAvain), ja se sitoo saman aiheen nostot yhteen
 * riippumatta siitä, kuinka kaukana ne ruudulla ovat.
 *
 * KAUPUNGIN ULKOPUOLELLA MITTA JÄÄ VOIMAAN. Nosto, jolla ei ole
 * kaupunkia (`kaupunkiAvain` on null), ryhmittyy yhä vain limityksen
 * tai sormen säteen perusteella — maaseudun kaksi lähekkäistä nostoa
 * eivät saa uutta sääntöä, ja maastokohde ei ryhmity lainkaan.
 */

/**
 * Saman aiheen lähekkäiset nostot ryhmiksi.
 *
 * Yhdistäminen on transitiivinen (liitoshaku): jos A limittyy B:n ja
 * B limittyy C:n kanssa, kaikki kolme ovat samaa rykelmää, vaikka A ja
 * C eivät koskettaisi. Näin Pariisin jono ei jää puoliksi puretuksi.
 *
 * MAASTOKOHDE EI RYHMITY (omistaja 16.9.2026, jatkoa PAATOKSET 27
 * kohtaan 4 — ks. docs/raportit/viesti-fable-aihemerkit-20260915.md
 * luku 3, jossa Opus jätti tämän Fablen ratkaistavaksi). Kohta 4 nimeää
 * Mont-Saint-Michelin ja Millaun sillan esimerkkeinä nostoista, jotka
 * näkyvät nimiöin heti — mutta 44 px:n kynnys yhdisti Mont-Saint-Michelin
 * Chandeleur-nostoon, koska molemmat ovat samaa aihetta (kulttuuri) ja
 * lähekkäin. Ratkaisu ei ole kynnyksen lasku (se maksoi mitatusti
 * moninkertaisesti muualla kartalla) vaan tämä rivi: merkki, jolla on
 * `maasto: true` (js/pallolauta/nostot.js merkinMaasto — vuori, meri,
 * joki, saari ja järvi ovat sitä TYYPIN perusteella; Mont-Saint-Michel
 * ja Millaun silta saavat lipun suoraan datassa, koska niiden tyyppi on
 * kulttuuri/tekniikka), EI liity mihinkään ryhmään EIKÄ vedä muita
 * ryhmäänsä — se pysyy aina omana nostonaan, riippumatta etäisyydestä
 * tai limityksestä. Tarkistus on ensimmäisenä silmukassa, ennen
 * aihevertailua, koska sääntö on ehdoton eikä aihekohtainen.
 *
 * @param {Array<object>} merkit  ehdokkaat (ryhmiteltävät nostot)
 * @param {function} laatikko  merkki → { x0, y0, x1, y1 } ruudulla
 * @param {number} [vara]  väljyys pikseleinä
 * @param {number} [etaisyys]  merkkien ruutuetäisyyden kynnys (px)
 * @returns {{ryhmat: Array<Array<object>>, yksin: Array<object>}}
 */
export function ryhmitaNostot(
  merkit, laatikko, vara = RYHMITYKSEN_VARA_PX, etaisyys = RYHMITYKSEN_ETAISYYS_PX,
) {
  const n = merkit.length;
  const isa = merkit.map((_, i) => i);
  const juuri = (i) => (isa[i] === i ? i : (isa[i] = juuri(isa[i])));
  const laatikot = merkit.map((m) => laatikko(m));
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      if (merkit[i].maasto || merkit[j].maasto) continue;
      if (merkit[i].aihe !== merkit[j].aihe) continue;
      // Sama kaupunki yhdistää aina, zoomista riippumatta (ks. lohko
      // KOLMAS KYNNYS EI OLE KYNNYS yllä, PAATOKSET 27 kohta 7).
      const samaKaupunki = Boolean(merkit[i].kaupunkiAvain)
        && merkit[i].kaupunkiAvain === merkit[j].kaupunkiAvain;
      if (samaKaupunki) { isa[juuri(i)] = juuri(j); continue; }
      const a = laatikot[i];
      const b = laatikot[j];
      if (!a || !b) continue;
      const osuu = a.x0 - vara < b.x1 && b.x0 - vara < a.x1
        && a.y0 - vara < b.y1 && b.y0 - vara < a.y1;
      const lahella = Math.hypot(
        merkit[i].p.x - merkit[j].p.x, merkit[i].p.y - merkit[j].p.y,
      ) <= etaisyys;
      if (osuu || lahella) isa[juuri(i)] = juuri(j);
    }
  }
  const kasat = new Map();
  for (let i = 0; i < n; i += 1) {
    const r = juuri(i);
    if (!kasat.has(r)) kasat.set(r, []);
    kasat.get(r).push(merkit[i]);
  }
  const ryhmat = [];
  const yksin = [];
  for (const kasa of kasat.values()) {
    if (kasa.length >= RYHMAN_VAHIN) ryhmat.push(kasa);
    else yksin.push(...kasa);
  }
  return { ryhmat, yksin };
}

/** Kohdan nimiörivin puolikorkeus osumapinnassa (px). */
export const VIUHKAN_RIVI_PX = 13;
/**
 * Listan rivien pystyväli ruudulla (px). PAATOKSET 32 kohta 3: *"rivit
 * väljästi (riviväli vähintään noston nimiön korkeus)"* — nimiörivin
 * korkeus on 2 × VIUHKAN_RIVI_PX = 26, joten 30 jättää rakoa.
 */
export const VIUHKAN_VALI_PX = 30;
/** Listan etäisyys merkin pisteestä sivusuunnassa (px). */
export const VIUHKAN_SADE_PX = 26;
/**
 * Alaspäin kasvavan listan ylimmän rivin keskikohta merkin pisteestä
 * (px). VIUHKAN_RIVI_PX + rako, jotta ylimmän rivin laatikko alkaa
 * vasta merkin alapuolelta eikä merkin päältä.
 */
export const VIUHKAN_ALAS_ALKU_PX = VIUHKAN_RIVI_PX + 6;
/** Tihein sallittu riviväli: täsmälleen nimiörivin korkeus (px). */
export const VIUHKAN_TIHEIN_VALI_PX = 2 * VIUHKAN_RIVI_PX;

/** Merkin alapuolelle jäävä pystytila ruudun alalaitaan asti (px). */
/**
 * KESKITETYN LISTAN KÄYTETTÄVISSÄ OLEVA KORKEUS (PAATOKSET 34 kohta
 * 12). Lista kasvaa yhtä paljon ylös ja alas, joten sen korkeus on
 * kaksi kertaa se puoli, joka on lyhyempi.
 */
function keskitettyTila(p, ruutu, vara = VIUHKAN_REUNAVARA_PX, riviPx = VIUHKAN_RIVI_PX) {
  const y = p?.y ?? 0;
  const yla = Math.max(0, y - (vara + riviPx));
  const ala = Math.max(0, ((ruutu?.korkeus ?? 0) - vara - riviPx) - y);
  return 2 * Math.min(yla, ala);
}

/**
 * MONTAKO RIVIÄ MAHTUU KESKITETTYNÄ MERKIN KOHDALLE (PAATOKSET 34
 * kohta 12). Mitta on TIHEIN väli, kuten alaspäin kasvavalla listalla:
 * kelaus alkaa vasta kun tiheinkään keskitetty lista ei mahdu.
 */
export function keskitettyMahtuvatRivit({
  p, ruutu, vara = VIUHKAN_REUNAVARA_PX,
  tihein = VIUHKAN_TIHEIN_VALI_PX, riviPx = VIUHKAN_RIVI_PX,
}) {
  const tilaa = keskitettyTila(p, ruutu, vara, riviPx);
  if (!(tilaa > 0)) return 0;
  return Math.floor(tilaa / Math.max(1, tihein)) + 1;
}

function alasTila(p, ruutu, vara = VIUHKAN_REUNAVARA_PX) {
  return Math.max(0, ((ruutu?.korkeus ?? 0) - vara - VIUHKAN_RIVI_PX)
    - ((p?.y ?? 0) + VIUHKAN_ALAS_ALKU_PX));
}
/** Reunavara: näin lähelle ruudun laitaa lista saa yltää (px). */
export const VIUHKAN_REUNAVARA_PX = 10;
/** Pehmeän pohjan levein vyö rivilaatikoiden ympärillä (px). */
export const VIUHKAN_POHJAN_VARA_PX = 10;

/**
 * Kovan esteen paino listan sakossa: kaupungin nimi ja pelinappula
 * (ks. ESTEELLÄ ON PAINO). Luku on niin suuri, että yhden kovan
 * esteen neliöpikseli painaa enemmän kuin koko listan alle jäävä
 * nostonimiö — piilotettava este väistyy aina ennen piilottamatonta.
 */
export const KOVAN_ESTEEN_PAINO = 50;
/** Pohjan vyöt uloimmasta sisimpään: [vara px, peitto]. */
export const VIUHKAN_POHJAN_VYOT = [
  [VIUHKAN_POHJAN_VARA_PX, 0.14],
  [VIUHKAN_POHJAN_VARA_PX * 0.55, 0.34],
  [VIUHKAN_POHJAN_VARA_PX * 0.2, 0.62],
  [0, 0.94],
];

const RAD = Math.PI / 180;

/**
 * Yhden kohdan laatikko ruudulla, kun se on kohdassa (dx, dy).
 *
 * RIVIN PUOLIKORKEUS ON PARAMETRI (kaupunkiliuska, PAATOKSET 34 kohta
 * 13 a). Viuhkan rivi on yhtä kokoa (VIUHKAN_RIVI_PX), mutta liuskan
 * kirjasin kasvaa poltetun musteen mukana, ja silloin laatikon on
 * kasvettava sen mukana — muuten osumapinta ja esteiden väistö
 * mittaisivat pienempää riviä kuin silmä näkee. Oletus pitää viuhkan
 * oman ladonnan ennallaan.
 */
export function kohdanLaatikko(dx, dy, leveys, puoli, riviPx = VIUHKAN_RIVI_PX) {
  const sisa = 12;
  const ulko = 16 + leveys;
  return puoli === 'vasen'
    ? {
      x0: dx - ulko, x1: dx + sisa, y0: dy - riviPx, y1: dy + riviPx,
    }
    : {
      x0: dx - sisa, x1: dx + ulko, y0: dy - riviPx, y1: dy + riviPx,
    };
}

/** Kuinka paljon laatikko on ruudun ulkopuolella (px, 0 = mahtuu). */
function yliReunan(laatikko, p, ruutu, vara = VIUHKAN_REUNAVARA_PX) {
  const x0 = p.x + laatikko.x0;
  const x1 = p.x + laatikko.x1;
  const y0 = p.y + laatikko.y0;
  const y1 = p.y + laatikko.y1;
  return Math.max(0, vara - x0) + Math.max(0, x1 - (ruutu.leveys - vara))
    + Math.max(0, vara - y0) + Math.max(0, y1 - (ruutu.korkeus - vara));
}

/** Kahden ruutulaatikon päällekkäisyys pinta-alana (px²). */
function paallekkaisyys(a, b) {
  const w = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
  const h = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
  return w > 0 && h > 0 ? w * h : 0;
}

/**
 * VIUHKAN ASEMAT: listan rivien siirrot merkin ruutupisteestä.
 *
 * Rivit ovat allekkain merkin toisessa kyljessä: sama `dx` kaikilla,
 * `dy` VIUHKAN_VALI_PX:n välein. Leveys on YKSI kaikille riveille
 * (levein nimiö), jotta lista on suora reunastaan — *"yhtenä siistinä
 * pystylistana"* (PAATOKSET 32 kohta 3).
 *
 * PUOLI JA PYSTYSIIRTO HAETAAN. Oletuspuoli on kartan keskeltä
 * poispäin (siellä on tyhjempää); lista kiinnitetään aina ruudun
 * sisään, ja muutamaa pystysiirtoa kokeillaan, jotta lista ei jää
 * kaupungin nimen tai pelinappulan päälle (`esteet`). Voittaja on
 * pienimmän sakon asento; tasapelin ratkaisee järjestys, jossa
 * oletukset ovat ensimmäisinä. Haku on päätelty eikä satunnainen.
 *
 * @param {object} p  merkin ruutupiste { x, y } kotelon pikseleinä
 * @param {object} ruutu  kotelon koko { leveys, korkeus }
 * @param {Array<number>} leveydet  kohtien nimiöleveydet ruudulla (px)
 * ESTEELLÄ ON PAINO. Kaupungin nimi ja pelinappula ovat KOVIA
 * esteitä (`paino` KOVAN_ESTEEN_PAINO): niitä ei piiloteta, joten
 * listan on väistettävä niitä. Muiden nostojen nimiöt ja merkit ovat
 * yhtä lailla esteitä, mutta ne VOI piilottaa listan ajaksi, joten
 * niiden paino on 1 — ahtaassa paikassa lista valitsee siis mieluummin
 * asennon, jossa sen alle jää nostonimiöitä kuin asennon, jossa se
 * peittää kaupungin nimen tai nappulan (js/pallolauta/nostot.js
 * LISTA EI KOSKAAN TOISEN TEKSTIN PÄÄLLE).
 *
 * @param {Array<object>} [esteet]  ruutulaatikot, joita lista väistää
 *   (`paino` valinnainen; oletus 1)
 * @returns {{puoli: string, leveys: number, asemat: Array<{dx, dy}>,
 *   pohja: ?{x0, y0, x1, y1}}}
 */
export function viuhkanAsemat({
  p, ruutu, leveydet, esteet = [], kasvu = 'keskitetty', kovaEnsin = false,
  vaakaEhdokkaat = [0],
  /*
   * RIVIN MITAT OVAT PARAMETREJA (kaupunkiliuska, PAATOKSET 34 kohta
   * 13 a). Riviväli ja rivin puolikorkeus seuraavat liuskan kirjasinta
   * (1,45 × fontti); oletukset ovat viuhkan omat vakiot, joten
   * aihemerkin viuhka latoo kuten ennenkin.
   */
  valiPx = VIUHKAN_VALI_PX, tiheinPx = VIUHKAN_TIHEIN_VALI_PX, riviPx = VIUHKAN_RIVI_PX,
}) {
  const n = leveydet.length;
  if (!n) {
    return {
      puoli: 'oikea', leveys: 0, asemat: [], pohja: null, kovaSakko: 0,
    };
  }
  const leveys = Math.max(0, ...leveydet);
  const vara = VIUHKAN_REUNAVARA_PX;
  /*
   * Rivien pystyväli kutistuu vain, jos lista ei muuten mahdu ruudulle
   * (puhelimen 390 px:n ruudulla mahtuu yli 20 riviä). ALASPÄIN
   * kasvavalla listalla tila on se, mikä jää MERKIN ALAPUOLELLE: 390
   * px:llä Pariisin pisin kategoria (13 riviä) jäi 3 px:n päähän
   * mahtumisesta ja lista olisi muuten joko noussut kaupungin nimen
   * päälle tai kelannut turhaan (mitattu 18.9.2026). Tiheinkään väli
   * ei päästä rivejä päällekkäin: se on täsmälleen nimiörivin korkeus.
   */
  const tila = Math.max(0, ruutu.korkeus - 2 * (vara + riviPx));
  /*
   * KESKITETTY LISTA (kasvu 'keskitetty', PAATOKSET 34 kohta 12,
   * omistaja: *"Lista voisi olla keskitetysti seka ylos etta alas"*):
   * tila on se, mikä jää merkin molemmin puolin SYMMETRISESTI, eli
   * kaksi kertaa lyhyempi puoli. Näin riviväli kutistuu silloin ja
   * vain silloin, kun keskitetty lista ei muuten mahdu — kelaus jää
   * yhä viimeiseksi keinoksi.
   */
  const kaytettava = kasvu === 'alas'
    ? Math.min(tila, alasTila(p, ruutu, vara))
    : Math.min(tila, keskitettyTila(p, ruutu, vara, riviPx));
  const vali = n > 1
    ? Math.max(tiheinPx, Math.min(valiPx, kaytettava / (n - 1)))
    : valiPx;
  const korkeus = (n - 1) * vali;
  const puolet = p.x <= ruutu.leveys / 2 ? ['oikea', 'vasen'] : ['vasen', 'oikea'];
  const askel = Math.round(vali);
  /*
   * KASVUSUUNTA. Viuhka on merkin ympärillä keskitetty, mutta
   * KAUPUNKILIUSKA KASVAA ALASPÄIN (Fablen tarkistus 18.9.2026:
   * avattu kategoria kasvoi ylöspäin PARIISI-nimen päälle). Alaspäin
   * kasvava lista alkaa merkin alapuolelta, ja vasta jos se ei mahdu
   * tai osuu kovaan esteeseen, kokeillaan ylempiä asentoja — asennot
   * ovat siis samat, vain järjestys ja lähtökohta vaihtuvat. Koska
   * tasapelin ratkaisee järjestys (ensimmäinen voittaa), alaspäin
   * kasvava lista valitsee aina alimman vapaan asennon.
   */
  const perus = kasvu === 'alas' ? VIUHKAN_ALAS_ALKU_PX : -korkeus / 2;
  const siirrot = kasvu === 'alas'
    ? [0, askel, -askel, 2 * askel, -2 * askel, 3 * askel, -3 * askel,
      -korkeus / 2 - VIUHKAN_ALAS_ALKU_PX]
    : [0, -askel, askel, -2 * askel, 2 * askel, -3 * askel, 3 * askel];
  let paras = null;
  /*
   * VAAKAPAKO KOVAN ESTEEN OHI (Fablen tarkistus 18.9.2026, kaappaus
   * pariisi-liuska-kategoria-390.png: avattu kategoria ladottiin
   * kartalle piirretyn "PARIISI"-nimen päälle).
   *
   * JUURISYY: vaakasuunnassa haku EI HAKENUT MITÄÄN. `dx0` oli vakio
   * VIUHKAN_SADE_PX, ja ainoa vaakasiirto oli kiinnitys ruudun reunaan
   * — este saattoi siis olla listan alla ilman että yksikään
   * kokeiltava asento olisi ollut sen ohi. Pystysiirtoja kokeiltiin
   * seitsemän, vaakasiirtoja yksi. Kaupungin nimi on kaupunkimerkin
   * OMALLA kohdalla ja kaupunkiliuska ripustetaan samaan merkkiin,
   * joten pystysiirto ei voi auttaa: nimi on aina listan rivien
   * korkeudella. Kameran ajokaan ei auta, koska nimi seuraa kaupunkia.
   *
   * Ehdokkaat ovat kutsujan (js/pallolauta/nostot.js) laskemia
   * ETÄISYYKSIÄ KOVIEN ESTEIDEN ULKOREUNAAN, ja 0 on aina ensin:
   * tasapelin ratkaisee järjestys, joten vapaassa paikassa lista
   * pysyy merkin kyljessä kuten ennen. Viuhka ei anna ehdokkaita
   * (oletus [0]), joten sen ladonta on ennallaan.
   */
  const asennot = [];
  for (const vaaka of (vaakaEhdokkaat.length ? vaakaEhdokkaat : [0])) {
    for (const siirto of siirrot) asennot.push({ vaaka: Math.max(0, vaaka), siirto });
  }
  for (const puoli of puolet) {
    for (const { vaaka, siirto } of asennot) {
      const dx0 = (puoli === 'vasen' ? -1 : 1) * (VIUHKAN_SADE_PX + vaaka);
      // Vaakakiinnitys: koko lista siirtyy yhtenä, rivit pysyvät suorassa.
      const rivi = kohdanLaatikko(dx0, 0, leveys, puoli, riviPx);
      let dx = dx0;
      if (p.x + rivi.x0 < vara) dx += vara - (p.x + rivi.x0);
      else if (p.x + rivi.x1 > ruutu.leveys - vara) dx += (ruutu.leveys - vara) - (p.x + rivi.x1);
      // Pystykiinnitys: ylin ja alin rivi ruudun sisään.
      let ylin = perus + siirto;
      const yYla = p.y + ylin - riviPx;
      const yAla = p.y + ylin + korkeus + riviPx;
      if (yYla < vara) ylin += vara - yYla;
      else if (yAla > ruutu.korkeus - vara) ylin += (ruutu.korkeus - vara) - yAla;
      const asemat = [];
      for (let i = 0; i < n; i += 1) asemat.push({ dx, dy: ylin + i * vali });
      let sakko = 0;
      // KOVA SAKKO ERIKSEEN: ruudun reuna ja kovat esteet (kaupungin
      // nimi, pelinappula). Kutsuja tarvitsee sen tietääkseen, onko
      // asento oikeasti vapaa — pehmeä muste saa jäädä alle, kova ei
      // (js/pallolauta/nostot.js, liuskan kelaus).
      let kova = 0;
      for (const a of asemat) {
        const l = kohdanLaatikko(a.dx, a.dy, leveys, puoli, riviPx);
        const yli = 1000 * yliReunan(l, p, ruutu, vara);
        sakko += yli;
        kova += yli;
        const ruudulla = {
          x0: p.x + l.x0, x1: p.x + l.x1, y0: p.y + l.y0, y1: p.y + l.y1,
        };
        for (const e of esteet ?? []) {
          const osuma = paallekkaisyys(ruudulla, e) * (e.paino ?? 1);
          sakko += osuma;
          if ((e.paino ?? 1) >= KOVAN_ESTEEN_PAINO) kova += osuma;
        }
      }
      /*
       * KOVA SAKKO RATKAISEE ENSIN (`kovaEnsin`, PAATOKSET 34 kohta
       * 12). Kaupunkiliuskan puoli EI saa ratketa pehmeästä musteesta:
       * muiden nostojen nimiöt piilotetaan listan ajaksi joka
       * tapauksessa (ks. LISTA EI KOSKAAN TOISEN TEKSTIN PÄÄLLE),
       * joten leveällä ruudulla runsas muste oikealla olisi vienyt
       * listan väärälle puolelle — mitattu 18.9.2026 1400 px:llä,
       * jossa lista asettui merkin VASEMMALLE puolelle vaikka
       * omistajan sääntö sanoo oikealle. Viuhkan oma valinta (yksi
       * yhteenlaskettu sakko) on ennallaan.
       */
      const parempi = paras === null
        || (kovaEnsin
          ? (kova < paras.kova - 0.001
            || (Math.abs(kova - paras.kova) <= 0.001 && sakko < paras.sakko - 0.001))
          : sakko < paras.sakko - 0.001);
      if (parempi) {
        paras = {
          sakko, kova, puoli, leveys, asemat,
        };
      }
      if (paras.sakko === 0) break;
    }
    if (paras.sakko === 0) break;
  }
  return {
    puoli: paras.puoli,
    leveys: paras.leveys,
    asemat: paras.asemat,
    pohja: listanPohja(paras.asemat, paras.leveys, paras.puoli, riviPx),
    kovaSakko: paras.kova,
  };
}

/**
 * MONTAKO RIVIÄ MAHTUU MERKIN ALAPUOLELLE (kasvu 'alas').
 *
 * Kaupunkiliuska ei saa ylittää kovia esteitä, joten kun avattu
 * kategoria ei mahdu ruudun alalaitaan asti, lista KELAA sisäisesti
 * sen sijaan että se venyisi kaupungin nimen päälle (PAATOKSET 34
 * kohta 5). Tämä on se katto, jonka mukaan rivit rajataan.
 */
export function alasMahtuvatRivit({ p, ruutu, vara = VIUHKAN_REUNAVARA_PX }) {
  const tilaa = alasTila(p, ruutu, vara);
  if (!(tilaa > 0)) return 0;
  // Mitta on TIHEIN väli: lista kutistaa rivivälin ennen kuin kelaa,
  // joten kelaus alkaa vasta kun tiheinkään lista ei mahdu.
  return Math.floor(tilaa / VIUHKAN_TIHEIN_VALI_PX) + 1;
}

/** Listan pehmeän pohjan laatikko merkin omissa ruutupikseleissä. */
export function listanPohja(asemat, leveys, puoli, riviPx = VIUHKAN_RIVI_PX) {
  if (!asemat?.length) return null;
  let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
  for (const a of asemat) {
    const l = kohdanLaatikko(a.dx, a.dy, leveys, puoli, riviPx);
    x0 = Math.min(x0, l.x0); y0 = Math.min(y0, l.y0);
    x1 = Math.max(x1, l.x1); y1 = Math.max(y1, l.y1);
  }
  return {
    x0, y0, x1, y1,
  };
}

/* ── AIHEMERKIN PIIRTO ──────────────────────────────────────────── */

/*
 * AIHENOSTO EI OLE ISOMPI KUIN MUUT (omistaja 17.9.2026, Raamattu
 * KARTTAUUDISTUKSEN PAATOKSET 32 kohta 4: *"Kaikki nostoPallot ja
 * tekstit saisi olla saman kokoisia kuin poltetussa kartassa …
 * aihenosto ei ole isompi"*).
 *
 * Lautasen säde oli 9,2 yksikköä, kun noston oma ruutu on
 * NOSTOSYM_MINI_RUUTU 7,4 — aihenosto piirtyi 1,24-kertaisena ja
 * varasi saman verran enemmän tilaa ladonnassa.
 *
 * ── MITTA ON POLTETTU PISTE, EI MERKIN RUUTU (omistaja 17.9.2026 klo
 * 21.40, Raamattu KARTTAUUDISTUKSEN PAATOKSET 33 kohta 3: *"kaikki
 * nostopisteet pitää olla yhtä pieniä, kuin mitä kartalle poltetut
 * merkit ovat. Viimeisimmässä kaappauksessa pisteet olivat vielä
 * liian isoja."*) ──────────────────────────────────────────────────
 *
 * MERKIN RUUTU EI OLE MERKIN MUSTE. NOSTOSYM_MINI_RUUTU 7,4 on se
 * LAATIKKO, jonka sisään merkki piirretään (hitunen musteen
 * ympärillä), ja siksi 7,4:n säteinen lautanen oli ruudulla
 * 2 × 7,4 × 0,773 ≈ 11,4 px, kun laattaan poltettu piste on
 * 2 × NOSTOSYM_PISTE_R × 0,773 ≈ 5,3 px — yli kaksinkertainen, juuri
 * se mikä omistajan kaappauksessa näkyi. Ensimmäinen erä siis pienensi
 * lautasen merkin ruudun kokoiseksi; nyt se on POLTETUN PISTEEN
 * kokoinen, eli täsmälleen sama muste kuin *Chartresin.*-pisteessä.
 *
 * SYMBOLI JÄÄ POIS LAUTASEN SISÄLTÄ. Viivamerkki on piirretty
 * ±6,5 yksikön alueelle, eikä se mahdu 3,4:n säteiseen pisteeseen
 * millään kutistuksella luettavana — ja poltetussa kartassa piste on
 * muutenkin pelkkä värillinen kiekko mustereunassa. Omistajan sääntö
 * sallii tämän sanatarkasti (*"symboli pallon sisällä saa pienentyä
 * tai jäädä pois"*, Fablen erä 3); aiheen kertoo nimiö, joka pysyy
 * poltetun nimiön kokoisena (8,5 px).
 */
/** Aihemerkin värilautasen säde merkin omissa yksiköissä. */
export const AIHEMERKIN_R = NOSTOSYM_PISTE_R;

/*
 * ══ AIHENOSTON NIMIÖ: TÄRKEIMMÄN NOSTON NIMI JA KOLME PISTETTÄ ════
 *
 * OMISTAJA 16.9.2026 klo 19.00 UTC (Raamattu, PAATOKSET 27 TARKENNUS
 * 2 kohta 8), sanatarkasti: *"Sen yhdistetyn noston voi nimeta
 * tarkeimman noston nimella ja laittaa loppuun vain kolme pistetta."*
 * Sama kohta poistaa lukumäärän: *"ei lukumaaraa palloon"*.
 *
 * KOLME PISTETTÄ ON YKSI MERKKI. Pelissä ellipsi on kaikkialla `…`
 * (js/pollo.js, js/ui-apurit.js, js/kuvagalleria.js), ei kolme
 * peräkkäistä pistettä — sama merkki tässä, jottei kartalle tule
 * omaa typografiaansa.
 *
 * LYHENNYS ENSIN, ELLIPSI SEN JÄLKEEN. Kartan oma lyhennystapa
 * (nostosymLyhennaNimio) katkaisee nimen 18 merkkiin ja päättää sen
 * YHTEEN pisteeseen (*"Halikarnassoksen."*). Aihenostossa tuo piste
 * ei ole lyhennysmerkki vaan väärä lupaus, joten se korvataan
 * ellipsillä: *"Mona Lisan varkaus…"*. Piirto ja mittaus on siksi
 * tehtävä `enintaan = Infinity` -mitalla, muuten kartan 18 merkin
 * sääntö söisi juuri lisätyn ellipsin.
 */
/** Kolmen pisteen merkki — sama kuin muualla pelissä. */
export const AIHENOSTON_ELLIPSI = '…';

/**
 * Aihenoston nimiö: tärkeimmän noston nimi + `…` (PAATOKSET 27
 * kohta 8). Tyhjä nimi antaa tyhjän nimiön (merkki jää pelkäksi
 * palloksi, kuten ennen tarkennusta).
 *
 * @param {?string} nimi  tärkeimmän noston nimi
 * @returns {string}
 */
export function aihenostonNimio(nimi) {
  const lyhyt = nostosymLyhennaNimio(nimi);
  const runko = lyhyt.replace(/\.+$/u, '').trim();
  return runko ? `${runko}${AIHENOSTON_ELLIPSI}` : '';
}

const el = (nimi, maareet, isa) => {
  const s = document.createElementNS(SVG, nimi);
  for (const [k, v] of Object.entries(maareet)) s.setAttribute(k, String(v));
  isa?.appendChild(s);
  return s;
};

/**
 * AIHEMERKKI (= AIHENOSTO): aiheen väripallo, ryhmän kärkisymboli ja
 * NIMIÖ *"tärkeimmän noston nimi + kolme pistettä"* (PAATOKSET 27
 * TARKENNUS 2 kohta 8). Lukumäärää ei ole — omistaja poisti sen
 * samassa kohdassa.
 *
 * Väri ja symboli tulevat SAMASTA LÄHTEESTÄ kuin lisää-valikon
 * (karttaselitteen) rivit: `karttavaloVari` lukee kärkisymbolin oman
 * mustemuuttujan ja `karttavaloKarkisymboli` antaa sen merkin, joka
 * kartalle muutenkin piirretään. Valikko ja kartta ovat siis samaa
 * sävyä ilman omaa taulukkoa täällä.
 */
export function aihemerkkiElementti(d) {
  const kuori = document.createElement('div');
  kuori.className = 'pallolauta-nosto pallolauta-aihemerkki';
  kuori.dataset.aihemerkki = d.id;
  kuori.dataset.aihe = d.aihe ?? '';
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('width', '1');
  svg.setAttribute('height', '1');
  svg.setAttribute('aria-hidden', 'true');
  const viuhka = document.createElementNS(SVG, 'g');
  viuhka.setAttribute('class', 'pallolauta-viuhka');
  svg.appendChild(viuhka);
  const g = document.createElementNS(SVG, 'g');
  g.setAttribute('class', 'pallolauta-aihemerkki-siirto');
  svg.appendChild(g);
  kuori.appendChild(svg);
  kuori.setAttribute('role', 'img');
  asetteleAihemerkki(kuori, d);
  return kuori;
}

/**
 * Aihemerkin sisäasettelu: mittakaava, sovittelun siirto ja resepti
 * (väri, symboli, nimiö).
 *
 * SIIRTO JA KYLKI OVAT SAMAA SOVITTELUA KUIN NOSTOILLA (js/pallolauta/
 * sovittelu.js): nyt kun aihenostolla on nimiö, se on myös väistävä
 * lappu — ilman siirtoa se makaisi kaupungin nimen päällä samalla
 * tavalla kuin nostojen laput ennen 7.9.2026 (Raamattu, KAUPUNGIN
 * NIMI NOSTOJEN PAALLA).
 */
export function asetteleAihemerkki(kuori, d) {
  const g = kuori.querySelector('.pallolauta-aihemerkki-siirto');
  if (!g) return;
  const mitta = d.mitta ?? 1;
  const dx = d.dx ?? 0;
  const dy = d.dy ?? 0;
  g.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${mitta.toFixed(4)})`;
  kuori.classList.toggle('pallolauta-aihemerkki-auki', Boolean(d.avattu));
  // Listan alle jäänyt merkki piiloutuu listan ajaksi (js/pallolauta/
  // nostot.js LISTA EI KOSKAAN TOISEN TEKSTIN PÄÄLLE).
  kuori.classList.toggle('pallolauta-nosto-piilossa', Boolean(d.piiloListanAlla));
  const nimio = d.nimioNakyy && d.nimi ? d.nimi : '';
  kuori.dataset.nimio = nimio;
  kuori.setAttribute('aria-label', `${d.aiheNimi ?? ''}: ${d.nimi ?? ''} (${d.maara ?? 0})`);
  // Viuhka on merkin oma sisus (ks. VIUHKA PIIRTYY AIHEMERKIN OMAAN
  // ELEMENTTIIN): resepti on kohtien nimet ja paikat, jottei kaari
  // piirry uudelleen joka ladonnassa.
  const juuri = kuori.querySelector('.pallolauta-viuhka');
  if (juuri) {
    const pohja = d.viuhkaPohja;
    const viuhkaResepti = `${pohja ? `${pohja.x0.toFixed(1)},${pohja.y0.toFixed(1)},${pohja.x1.toFixed(1)},${pohja.y1.toFixed(1)}` : '-'}#`
      + (d.viuhka ?? [])
        .map((k) => `${k.nimi}@${k.dx.toFixed(1)},${k.dy.toFixed(1)}|${k.puoli}|${k.leveys.toFixed(1)}`).join(';');
    if (juuri.dataset.resepti !== viuhkaResepti) {
      juuri.dataset.resepti = viuhkaResepti;
      piirraViuhka(juuri, d);
    }
  }
  const resepti = `${d.aihe ?? ''}|${d.maara ?? 0}|${d.avattu ? 1 : 0}`
    + `|${nimio}|${d.puoli ?? 'oikea'}`;
  if (g.dataset.resepti === resepti) return;
  g.dataset.resepti = resepti;
  g.replaceChildren();
  // Paperi ensin, väri sen päälle vaimeana: symboli jää luettavaksi
  // (ilman pohjaa tumma muste hukkui tummaan väripalloon).
  el('circle', {
    class: 'pallolauta-aihemerkki-pohja', r: AIHEMERKIN_R, cx: 0, cy: 0,
  }, g);
  el('circle', {
    class: 'pallolauta-aihemerkki-lautanen',
    r: AIHEMERKIN_R,
    cx: 0,
    cy: 0,
    fill: karttavaloVari(d.aihe),
  }, g);
  el('circle', {
    class: 'pallolauta-aihemerkki-keha', r: AIHEMERKIN_R, cx: 0, cy: 0,
  }, g);
  // Lautasen sisään ei piirretä symbolia: piste on poltetun musteen
  // kokoinen (ks. MITTA ON POLTETTU PISTE), eikä viivamerkki mahdu
  // siihen luettavana. Aiheen kertoo nimiö ja lautasen väri.
  // Nimiö on jo ladottu mittaansa (aihenostonNimio), joten kartan 18
  // merkin sääntö ei saa koskea siihen: Infinity = älä lyhennä.
  if (nimio) piirraNostosymNimio(g, nimio, d.symLaji ?? null, d.puoli ?? 'oikea', Infinity);
}

/**
 * Aihenoston laatikko ruudulla: värilautanen neliönä JA nimiön kaista
 * samasta kaavasta kuin nostolla (js/pallolauta/nostot.js
 * nostonLaatikko) — yksi mitta piirtoon, sovitteluun ja osumapintaan.
 *
 * @param {{x:number,y:number}} p  merkin ruutupiste
 * @param {object} d  aihemerkin datum
 * @param {object} [asetukset]  kylki/siirto/nimiö sovittelun kokeiluun
 */
export function aihemerkinLaatikko(p, d, {
  kylki = null, dx = 0, dy = 0, nimio = null,
} = {}) {
  const mitta = d.mitta ?? 1;
  const r = AIHEMERKIN_R * mitta;
  const x = p.x + dx;
  const y = p.y + dy;
  const laatikko = {
    x0: x - r, y0: y - r, x1: x + r, y1: y + r,
  };
  const nakyy = nimio === null ? Boolean(d.nimioNakyy) : Boolean(nimio);
  if (!nakyy || !d.nimi) return laatikko;
  const { leveys } = nostosymNimioMitta(d.nimi, d.symLaji ?? null, Infinity);
  const a = nostosymNimioAsemointi(kylki ?? d.puoli ?? 'oikea', leveys);
  return {
    x0: Math.min(laatikko.x0, x + a.x1 * mitta),
    y0: Math.min(laatikko.y0, y + a.y1 * mitta),
    x1: Math.max(laatikko.x1, x + a.x2 * mitta),
    y1: Math.max(laatikko.y1, y + a.y2 * mitta),
  };
}

/* ── VIUHKAN KOHDAT AIHEMERKIN SISÄLLÄ ──────────────────────────── */

/**
 * VIUHKA PIIRTYY AIHEMERKIN OMAAN ELEMENTTIIN, ei omiin merkkeihinsä.
 *
 * MITATTU SYY (Chromium 15.9.2026): kun viuhkan kohdat olivat oma
 * CSS2D-merkkinsä, niitä ei syntynyt DOMiin napautuksen jälkeen
 * lainkaan — `.pallolauta-viuhka`-elementtejä oli 0 vielä 900 ms
 * kuluttua, vaikka kerroksen data sisälsi ne. Kirjaston merkkikerros
 * rakentaa UUDET elementit vasta omalla kehyksellään, ja levossa
 * oleva pallo ei sellaista kehystä tuota; sama mittaus heti uuden
 * ladonnan (ja sen pakottaman kehyksen) jälkeen antoi 6.
 *
 * AIHEMERKIN ELEMENTTI ON JO OLEMASSA. Merkkirekisteri ajaa
 * `asettele`n jokaisessa ladonnassa (js/pallolauta/merkit.js aseta),
 * joten viuhka ilmestyy samalla hetkellä kuin napautus — ilman uutta
 * elementtiä, ilman kehyksen odotusta. Kohdat ovat merkin oman svg:n
 * lapsia (overflow: visible), siirrettyinä kaarelle ruutupikseleinä.
 *
 * NAPAUTUS EI KULJE ELEMENTIN KAUTTA — sama sääntö kuin kaikilla
 * pallon merkeillä (js/pallolauta/merkit.js: *"yksi osumatesti, yksi
 * kutsu"*), ja pallon kangas on osumajärjestyksessä CSS2D-kerroksen
 * päällä (mitattu: elementsFromPoint antoi kohdan päältä CANVASin).
 * Kohdan laatikko (kohdanLaatikko) on siksi RUUTULAATIKKO, jota laudan
 * oma napautus vertaa (js/pallolauta/lauta.js napautaPintaan →
 * nostot.napautaViuhkasta) — sama kaava piirtää ja ottaa sormen.
 */
export function piirraViuhka(juuri, d) {
  juuri.replaceChildren();
  const kohdat = d.viuhka ?? [];
  if (!kohdat.length) return;
  /*
   * KEHYKSETÖN POHJA (PAATOKSET 32 kohta 3): *"vaalennus tai tummennus
   * kartan paalla + pehmennys"*, EI reunaviivaa. Pehmennys on kolme
   * sisäkkäistä vyöhykettä, joiden peitto kasvaa sisäänpäin — sama
   * vaikutelma kuin liu'ulla, mutta ilman suodatinta (iOS-sääntö
   * kieltää filterin kartan kerroksilta, tests/rules.test.mjs).
   */
  const pohja = d.viuhkaPohja;
  if (pohja) {
    for (const [vara, peitto] of VIUHKAN_POHJAN_VYOT) {
      const r = el('rect', {
        class: 'pallolauta-viuhka-pohja',
        x: (pohja.x0 - vara).toFixed(2),
        y: (pohja.y0 - vara).toFixed(2),
        width: (pohja.x1 - pohja.x0 + 2 * vara).toFixed(2),
        height: (pohja.y1 - pohja.y0 + 2 * vara).toFixed(2),
        rx: (10 + vara).toFixed(1),
        'fill-opacity': peitto.toFixed(2),
      }, juuri);
      r.setAttribute('aria-hidden', 'true');
    }
  }
  for (const [nro, k] of kohdat.entries()) {
    const kohta = el('g', { class: 'pallolauta-viuhka-kohta' }, juuri);
    kohta.style.transform = `translate(${k.dx.toFixed(2)}px, ${k.dy.toFixed(2)}px)`;
    // Rivin järjestysluku porrastusta varten (css/styles.css
    // pallolauta-liuska-saapuu): 30 ms riviä kohti.
    kohta.style.setProperty('--liuskan-rivi', String(nro));
    const kuva = el('g', { class: 'pallolauta-viuhka-kuva' }, kohta);
    kuva.style.transform = `scale(${(k.mitta ?? 1).toFixed(4)})`;
    k.piirra?.(kuva, k.puoli);
  }
}

/**
 * Kohdan nimiön leveys ruudulla (px): kirjaston oma mitta merkin
 * mittakaavassa. Sama luku ohjaa sekä kaaren sovitusta että
 * osumapintaa, jottei sormi ja silmä mittaa eri asiaa.
 */
export function viuhkanNimioLeveys(leveysYksikkoina, mitta) {
  return Math.max(0, leveysYksikkoina) * mitta;
}

/** Aiheen näkyvä nimi (saavutettavuustekstiin) — selitteen oma taulu. */
export function aiheenNimi(aihe) {
  return KARTTAVALO_AIHEET.find((r) => r.aihe === aihe)?.nimi ?? 'Nostot';
}
