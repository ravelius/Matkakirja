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
 * ══ VIUHKA ════════════════════════════════════════════════════════
 *
 * Viuhkan kohdat ovat SAMAN KERROKSEN CSS2D-merkkejä kuin nostot
 * itse: jokainen kohta on ankkuroitu aihemerkin omaan
 * lat/lng-pisteeseen ja siirretty kaarelle RUUTUPIKSELEINÄ
 * (`transform: translate`). Siksi kaari on aina ruudun mittainen
 * riippumatta siitä, missä päin palloa merkki on, eikä kaaren
 * pisteille tarvitse laskea omia koordinaatteja.
 *
 * KAARI KÄÄNTYY, JOTTA SE MAHTUU (PAATOKSET 27:n mittaus: *"viuhka
 * mahtuu ruudulle 390 ja 1400 px"*). `viuhkanAsemat` hakee kaarelle
 * puolen, kierron ja säteen niin, että jokainen kohta nimineen on
 * ruudulla; haku on pieni ja täysin päätelty (ei satunnaisuutta),
 * joten sama näkymä antaa aina saman viuhkan.
 *
 * EI SUODATTIMIA (Raamattu, iOS-sääntö; tests/rules.test.mjs):
 * avausliike on transform ja opacity, ei filter.
 */

import {
  nostosymLyhennaNimio, nostosymNimioAsemointi, nostosymNimioMitta,
  piirraNostosymMini, piirraNostosymNimio,
} from '../fokusnosto-symbolit.js';
import { KARTTAVALO_AIHEET, karttavaloKarkisymboli, karttavaloVari } from '../karttavalot.js';

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

/** Viuhkan kohtien pystyväli ruudulla (px) — nimiörivin korkeus + rako. */
export const VIUHKAN_VALI_PX = 26;
/** Viuhkan pienin säde (px): kohta irti aihemerkistä, sormi mahtuu väliin. */
export const VIUHKAN_SADE_PX = 56;
/** Viuhkan kaaren aukeama asteina. */
export const VIUHKAN_KAARI_ASTETTA = 150;
/** Kohdan nimiörivin puolikorkeus osumapinnassa (px). */
export const VIUHKAN_RIVI_PX = 13;
/** Reunavara: näin lähelle ruudun laitaa viuhka saa yltää (px). */
export const VIUHKAN_REUNAVARA_PX = 10;

const RAD = Math.PI / 180;

/** Yhden kohdan laatikko ruudulla, kun se on kohdassa (dx, dy). */
export function kohdanLaatikko(dx, dy, leveys, puoli) {
  const sisa = 12;
  const ulko = 16 + leveys;
  return puoli === 'vasen'
    ? {
      x0: dx - ulko, x1: dx + sisa, y0: dy - VIUHKAN_RIVI_PX, y1: dy + VIUHKAN_RIVI_PX,
    }
    : {
      x0: dx - sisa, x1: dx + ulko, y0: dy - VIUHKAN_RIVI_PX, y1: dy + VIUHKAN_RIVI_PX,
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

/**
 * VIUHKAN ASEMAT: kohtien siirrot merkin ruutupisteestä.
 *
 * Kohdat ovat kaarella, jonka aukeama on VIUHKAN_KAARI_ASTETTA ja
 * jonka säde venyy niin, että vierekkäisten kohtien väli on vähintään
 * VIUHKAN_VALI_PX — pystysuunnassa siis rivi kerrallaan, ei kasaa.
 *
 * PUOLI, KIERTO JA SÄDE HAETAAN. Ruudun laita ei ole neuvoteltavissa
 * (puhelimessa 390 px on kapea), joten kolmea muuttujaa kokeillaan
 * pienessä ruudukossa ja voittaja on se, joka jää vähiten reunan yli;
 * tasapelin ratkaisee järjestys, jossa oletukset ovat ensimmäisinä
 * (kartan keskeltä poispäin, suora kaari, laajin säde). Haku on
 * päätelty eikä satunnainen: sama näkymä antaa aina saman viuhkan.
 *
 * @param {object} p  merkin ruutupiste { x, y } kotelon pikseleinä
 * @param {object} ruutu  kotelon koko { leveys, korkeus }
 * @param {Array<number>} leveydet  kohtien nimiöleveydet ruudulla (px)
 * @returns {{puoli: string, sade: number, asemat: Array<{dx, dy}>}}
 */
export function viuhkanAsemat({ p, ruutu, leveydet }) {
  const n = leveydet.length;
  const kaari = VIUHKAN_KAARI_ASTETTA * RAD;
  const vahinSade = n > 1
    ? ((n - 1) * VIUHKAN_VALI_PX) / (2 * Math.sin(kaari / 2))
    : 0;
  const perusSade = Math.max(VIUHKAN_SADE_PX, vahinSade);
  const kulmat = n > 1
    ? leveydet.map((_, i) => -kaari / 2 + (i * kaari) / (n - 1))
    : [0];
  // Oletuspuoli on kartan keskeltä poispäin: siellä on eniten tilaa.
  const oletus = p.x <= ruutu.leveys / 2 ? 'oikea' : 'vasen';
  const puolet = [oletus, oletus === 'oikea' ? 'vasen' : 'oikea'];
  const kierrot = [0, 15, -15, 30, -30, 45, -45, 60, -60];
  const sateet = [1, 0.88, 0.76];
  let paras = null;
  for (const puoli of puolet) {
    for (const kierto of kierrot) {
      for (const kerroin of sateet) {
        const sade = Math.max(VIUHKAN_SADE_PX * 0.76, perusSade * kerroin);
        const asemat = kulmat.map((a) => {
          const kulma = a + kierto * RAD;
          return {
            dx: (puoli === 'vasen' ? -1 : 1) * sade * Math.cos(kulma),
            dy: sade * Math.sin(kulma),
          };
        });
        let yli = 0;
        asemat.forEach((s, i) => {
          yli += yliReunan(kohdanLaatikko(s.dx, s.dy, leveydet[i], puoli), p, ruutu);
        });
        if (!paras || yli < paras.yli - 0.001) paras = { yli, puoli, sade, asemat };
        if (paras.yli === 0) return { puoli: paras.puoli, sade: paras.sade, asemat: paras.asemat };
      }
    }
  }
  return { puoli: paras.puoli, sade: paras.sade, asemat: paras.asemat };
}

/* ── AIHEMERKIN PIIRTO ──────────────────────────────────────────── */

/** Aihemerkin värilautasen säde merkin omissa yksiköissä. */
export const AIHEMERKIN_R = 9.2;

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
  const nimio = d.nimioNakyy && d.nimi ? d.nimi : '';
  kuori.dataset.nimio = nimio;
  kuori.setAttribute('aria-label', `${d.aiheNimi ?? ''}: ${d.nimi ?? ''} (${d.maara ?? 0})`);
  // Viuhka on merkin oma sisus (ks. VIUHKA PIIRTYY AIHEMERKIN OMAAN
  // ELEMENTTIIN): resepti on kohtien nimet ja paikat, jottei kaari
  // piirry uudelleen joka ladonnassa.
  const juuri = kuori.querySelector('.pallolauta-viuhka');
  if (juuri) {
    const viuhkaResepti = (d.viuhka ?? [])
      .map((k) => `${k.nimi}@${k.dx.toFixed(1)},${k.dy.toFixed(1)}|${k.puoli}`).join(';');
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
  const sym = el('g', { class: 'pallolauta-aihemerkki-sym' }, g);
  piirraNostosymMini(sym, karttavaloKarkisymboli(d.kategoria ?? d.aihe) ?? 'historia', d.symLaji ?? null);
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
function piirraViuhka(juuri, d) {
  juuri.replaceChildren();
  for (const k of d.viuhka ?? []) {
    const viiva = el('line', {
      class: 'pallolauta-viuhka-viiva', x1: 0, y1: 0, x2: k.dx.toFixed(2), y2: k.dy.toFixed(2),
    }, juuri);
    viiva.setAttribute('aria-hidden', 'true');
    const kohta = el('g', { class: 'pallolauta-viuhka-kohta' }, juuri);
    kohta.style.transform = `translate(${k.dx.toFixed(2)}px, ${k.dy.toFixed(2)}px)`;
    const laatikko = kohdanLaatikko(0, 0, k.leveys, k.puoli);
    el('rect', {
      class: 'pallolauta-viuhka-osuma',
      x: laatikko.x0.toFixed(2),
      y: laatikko.y0.toFixed(2),
      width: (laatikko.x1 - laatikko.x0).toFixed(2),
      height: (laatikko.y1 - laatikko.y0).toFixed(2),
    }, kohta);
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
