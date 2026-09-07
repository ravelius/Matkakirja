/*
 * IHMISEN MATKA — ESITYS YHTENÄ KAARENA.
 *
 * Raamattu, IHMISEN MATKA ON YKSI KAARI, EI PYSAKKEJA (omistaja
 * 7.9.2026 ilta, sanatarkasti): *"Tässä on siis yksi pitkä
 * tarinankaari. Toisin kuin keksijöissä, oli jokaisessa oma nostonsa.
 * Ja silloin myös nämä kuvituskuvat ovat vain sivuosassa. … Ne pysäkit
 * ovat vain meidän tekemiämme kaivauksia ja havaintoja, mutta se ei
 * saisi rikkoa sitä virtaa."* — sekä ALKAA MUSTASTA RUUDUSTA, KERTOMUS
 * SOLJUVAKSI ja KAARI HYVAKSYTTY, TUTKIMUSVAIHE, VIISI NAPPIA.
 *
 * Tämä moduuli on ESITYKSEN OHJAAJA. Se ei omista mitään pintaa:
 * kellon, kameran, vanat, musiikin ja lamput omistaa aikajanamoottori
 * (js/aikajana.js), ja tämä kertoo niille, mitä kaanoni
 * (js/linssit/ihmisen-matka-kertomus.js) kussakin jaksossa tahtoo.
 * Moottorin pysäkkikello (kehys → aikajanaAskel → sytyta) EI KÄY
 * esityksen aikana lainkaan: `tila.i` jää arvoon −1, jolloin myös
 * värivirtojen oma kameraohjaus pysyy poissa päältä
 * (js/aikajana-virrat.js ohjaaKameraa) ja kamera on kokonaan tämän
 * käsissä.
 *
 * ── VIISI VAIHETTA ────────────────────────────────────────────────
 *
 *   1. PIMEÄ    Käynnistä-napin jälkeen ruutu on musta (oma peite
 *               linssin juuressa). Kartta ja käyttöliittymä ovat
 *               piilossa, vain sulkunappi on käytettävissä; kertojan
 *               'avaus'-luenta soi. Musiikki EI vielä ala.
 *   2. VALOT    'afrikka'-jakson alkaessa musta häipyy VALOJEN_MS:ssä
 *               ja pallo on jo rajattuna koko Afrikkaan (kamera ajettiin
 *               paikalleen mustan alla). Musiikki nousee sisään.
 *   3. MATKA    Jaksot peräkkäin ILMAN TAUKOA: luenta soi, kamera liukuu
 *               jakson kohteeseen tai nimettyyn alueeseen, kello etenee
 *               lineaarisesti jakson vuosista seuraavan jakson vuosiin
 *               luennan keston mukaan, ja vanat kasvavat kellon tahdissa.
 *   4. HYPPY    'aikahyppy': kello kelaa taaksepäin (14 500 → 50 000)
 *               nopeana mutta pehmeänä liukuna ja kamera siirtyy
 *               Keski-Aasiaan. Rintama ei katoa (ks. PITO alla).
 *   5. LOPPU    Kamera vetäytyy koko palloon, kaikki vanat näkyvissä,
 *               pulun välihuomio — ja `ui.aloitaTutkimusvaihe?.()`.
 *
 * ── PITO: RINTAMA EI KATOA ────────────────────────────────────────
 *
 * Kaanoni palaa ajassa taaksepäin kahdesti (Blombos 75 ka →
 * Karmelvuori 110 ka ja Chile 14,5 ka → aikahyppy 50 ka). Ilman
 * pitoa vana kelautuisi kummallakin kerralla auki. Pito kytketään
 * päälle KOKO ESITYKSEN AJAKSI heti valojen syttyessä
 * (js/aikajana-virrat.js asetaPito, js/aikajana-vanat.js paivita):
 * piirretty vana ei enää lyhene, mutta kasvaa yhä normaalisti.
 *
 * ── KUVAT OVAT SIVUOSASSA ─────────────────────────────────────────
 *
 * Kun jaksolla on kohde, sen kuva nousee PIENENÄ (KUVAN_OSUUS ruudun
 * leveydestä, pergamenttikehys) kohteen viereen pallon pinnalle
 * luennan ajaksi ja häipyy jakson päättyessä. Se ei pysäytä mitään:
 * kello käy, kamera liukuu ja kertoja jatkaa. Lippu
 * IHMISEN_MATKA_KUVAT_ESITYKSESSA kytkee kuvat kokonaan pois
 * (omistaja: *"Vaihtoehtoisesti ne voitaisiin jopa hetkeksi jättää
 * pois kokonaan"*); saman tekee osoiterivin `?esityskuvat=ei`, jottei
 * kokeilu vaadi koodin muokkausta.
 *
 * ── LUENTA JA KESTO ───────────────────────────────────────────────
 *
 * Jakson luenta on ämpärissä kaaren omassa puhekansiossa nimellä, jonka
 * antaa js/linssipuhe.js kertomuksenRunko — sama funktio kuin
 * generointityökalulla (tools/generoi-linssiluennat.mjs --kertomus),
 * joten nimi ei voi eriytyä. Jakson kesto luetaan ÄÄNITTEESTÄ heti kun
 * sen metatiedot saapuvat; siihen asti (ja kokonaan ilman äänitettä)
 * kesto on tekstin pituus jaettuna 14 merkillä sekunnissa
 * (kertomuksenVarakesto). Esitys ei siis pysähdy siihen, ettei ääntä
 * ole — mykistetty peli kulkee luetun mittaisena.
 *
 * ── PULUN VÄLIHUOMIOT ─────────────────────────────────────────────
 *
 * Jakson `pulu` luetaan pulun äänellä jakson LUENNAN PÄÄTYTTYÄ, ennen
 * seuraavaa jaksoa: pieni kupla (js/pollo.js polloLinssikupla, linssin
 * oma poikkeus kuplaporttiin) ja äänite 0,7 × tasolla ilman kertojan
 * väistöä — sama mekanismi kuin fokusvirran huudahduksella
 * (js/liviapuhe.js soitaLivianLinssiAani). Kello ei pysähdy siksi
 * aikaa; jakso vain saa hännäkseen PULUN_VARA_MS.
 *
 * ── TUTKIMUSVAIHE ON TOISEN TYÖTÄ ─────────────────────────────────
 *
 * Esitys päättyy koukkuun `ui.aloitaTutkimusvaihe?.()`. Mitä sen
 * takana on — hehkuvat nostokohdat, viisi nappia, pulun kutsu — ei
 * kuulu tälle moduulille (Raamattu KAARI HYVAKSYTTY, TUTKIMUSVAIHE,
 * VIISI NAPPIA). Ilman koukkua esitys päättyy siihen, että kartta jää
 * pelaajalle: esinerivi palaa ja ohjaimet tulevat takaisin.
 */

import { projisoiLaudalle } from '../fokusmitat.js';
import { kertomuksenRunko, kertomuksenVarakesto, soitaLinssiluenta } from '../linssipuhe.js';
import { soitaLivianLinssiAani } from '../liviapuhe.js';
import { polloLinssikupla } from '../pollo.js';
import { karkiHetkella } from '../aikajana-vanat.js';
import { kulmaEro } from './ihmisen-matka-kortti.js';
import { rajauksenLeveys, vananRajaus } from './ihmisen-matka-tutkimus.js';

/** Lauta, jonka koordinaatistoon nimetyt alueet projisoidaan. */
const LAUTA = 'maailmankartta';

/**
 * KUVAT ESITYKSESSÄ (oletus päällä). Omistajan koeasetus: false jättää
 * löytökuvat kokonaan pois, jolloin ruudulla on vain viiva, kello ja
 * kertojan ääni. Osoiterivin `?esityskuvat=ei` tekee saman ilman
 * koodin muokkausta.
 */
export const IHMISEN_MATKA_KUVAT_ESITYKSESSA = true;

/** Kuvan leveys osuutena ruudun leveydestä (omistajan mitta: "pienenä"). */
export const KUVAN_OSUUS = 0.22;

/**
 * KAMERAN LÄHIKUVA JAKSOLLA. Väljempi kuin pysäkkiajon 560
 * (js/linssit/ihmisen-matka.js IHMISEN_MATKAN_LAHIKUVA): kertomuksessa
 * ei pysähdytä katsomaan löytöä vaan katsotaan, MITEN VIIVA LAAJENEE
 * kohteen ohi. 1 200 lautayksikköä on noin 36° eli 4 000 km ruudun
 * leveydellä — kohde on selvästi tunnistettavassa lähikuvassa, mutta
 * vanan kärki ja sen suunta mahtuvat samaan kuvaan.
 */
export const ESITYKSEN_LAHIKUVA = 1200;

/** Koko maapallo laudan yksiköissä (sama laatikko kuin linssin `alue`). */
const MAAILMA = {
  x: 0, y: 0, w: 12000, h: 5399,
};

/**
 * NIMETYT RAJAUKSET kaanonin `alue`-kentälle. Laatikot ovat asteina
 * (lat/lon) ja käännetään laudan yksiköiksi vasta ajossa, jotta luvut
 * ovat luettavia ja tarkistettavia. Kamera saa laatikon
 * (`ajaKamera({ bbox })`), joka mahtuu ruudulle kummassakin suunnassa
 * kuvasuhteesta riippumatta — siksi tässä ei ole korkeuksia.
 */
export const ESITYKSEN_ALUEET = {
  // Koko Afrikka: Hyväntoivonniemeltä Välimerelle, Atlantilta Somaliaan.
  afrikka: {
    lat: [-35, 37], lon: [-18, 52],
  },
  // Afrikan itälaita: Etiopian jokilaaksot ja Punaisenmeren rannikko.
  'afrikka-ita': {
    lat: [0, 18], lon: [30, 50],
  },
  // Keski-Aasia laajana: Altai, Siperian eteläreuna ja Iranin ylängöt.
  'keski-aasia': {
    lat: [28, 60], lon: [50, 105],
  },
  // Koko pallo: lopun peräytyminen.
  maailma: null,
};

/** Mustan häivytys valojen syttyessä (omistaja: "2–3 s"). */
export const VALOJEN_MS = 2600;
/** Aikahypyn kelaus: nopea mutta pehmeä liuku taaksepäin. */
export const KELAUKSEN_MS = 2400;
/** Jakson häntä, jonka aikana pulun välihuomio ehtii kuulua. */
export const PULUN_VARA_MS = 2600;
/** Lyhin ja pisin kamera-ajo jaksolla. */
export const KAMERAN_POHJA_MS = 1400;
export const KAMERAN_KATTO_MS = 9000;
/** Osuus jakson luennasta, jonka kamera-ajo saa kestää. */
export const KAMERAN_OSUUS = 0.85;
/** Kuvan häivytys (css .aikajana-kertomuskuva). */
export const KUVAN_POISTUMA_MS = 420;
/** Loppunäkymän varmistava liuku, jos viimeinen ajo jäi kesken (ks. paata). */
export const LOPUN_ASETUS_MS = 1200;

/*
 * KÄRKI EI SAA POISTUA KUVASTA (Raamattu IHMISEN MATKA: ETELA-AFRIKASSA
 * KAMERA ULOS, VANA EI SAA HUKKUA; omistaja 7.9.2026 klo 18.15,
 * sanatarkasti: *"siinä tarinan alkupaikkeella, kun käydään
 * Etelä-Afrikan kohdalla, niin kartta voisi zoomautua ulospäin, jotta
 * ei hukattaisi sitä viivaa, jossa oltiin menossa niin pahasti"*).
 *
 * MITATTU (kontti, 7.9.2026, vanojen kärjet jaksoittain): 'ranta'-
 * jaksossa (164 000 → 75 000) kamera oli Pinnacle Pointissa (34° E),
 * mutta selkärangan kärki kulki Etiopiasta (12° N, 43° I) Arabiaan
 * (24° N, 58° I) — 50–65° päässä kohteesta, siis kokonaan kuvan
 * ulkopuolella 1 200 yksikön (n. 36°) lähikuvassa. Sama toistui
 * 'arabia'-jaksossa (kärki Keski-Aasiaan) ja 'denisova'-jaksossa
 * (kärki Beringiaan).
 *
 * SÄÄNTÖ (jaksonRajaus): kohteellisen jakson kamera rajataan
 * laatikkoon, jossa ovat KOHDE ja jakson aikana LIIKKUVIEN vanojen
 * kärkipolut (viisi näytettä jakson kellovälillä). Vain UUTTA piirtävä
 * osuus lasketaan — pito (kello käy kaanonissa kahdesti taaksepäin)
 * pitää jo piirretyn paikallaan, eikä sen "kärki" ole rintama. Kun
 * jakso ei piirrä mitään uutta (kello palaa taaksepäin: 'blombos'),
 * mukaan otetaan nykyinen rintama, jotta se ei katoa kuvasta.
 *
 * KAKSI ETÄISYYSKATTOA, koska koko maailma ei ole yksi näyttämö:
 * selkäranka (kertomuksen päälinja) otetaan mukaan KARJEN_ETAISYYS_MAX_AST
 * asti (65° Pinnacle Point → Arabia mahtuu), sivuhaara vain
 * HAARAN_ETAISYYS_MAX_AST asti — Euroopan haaran kärki Lissabonissa ei
 * saa vetää Denisovan jakson kameraa puolen pallon näkymään, kun
 * Eurooppa kerrotaan vasta aikahypyn jälkeen. Rajaus ei koskaan mene
 * lähikuvaa (ESITYKSEN_LAHIKUVA) tiukemmaksi.
 */
export const KARJEN_ETAISYYS_MAX_AST = 80;
export const HAARAN_ETAISYYS_MAX_AST = 45;
/** Kärjen on liikuttava vähintään tämän verran, jotta vana on "kulkeva". */
export const KARJEN_LIIKE_MIN_AST = 2;
/** Rajauksen marginaali (osuus sivusta kummallakin laidalla). */
export const KARJEN_VARA = 0.14;
/** Näytteitä kärkipolulta jakson kellovälillä. */
const KARJEN_NAYTTEET = [0, 0.25, 0.5, 0.75, 1];

/**
 * Jakson kameran rajaus: kohde ja liikkuvien vanojen kärkipolut.
 *
 * PUHDAS FUNKTIO (tests/ihmisen-matka-esitys.test.mjs).
 *
 * @param {object} asetukset
 * @param {{lat:number, lon:number}} asetukset.kohde jakson kohde
 * @param {Array<{pisteet: Array<[number, number, number]>}>} asetukset.vanat
 *   vanojen kärkilistat (ensimmäinen on selkäranka), [lat, lon, vuosia]
 * @param {number} asetukset.alku jakson kello alussa (vuosia sitten)
 * @param {number} asetukset.loppu jakson kello lopussa
 * @param {number} [asetukset.pitoMin] pienin kellolukema tähän asti (pito)
 * @returns {{ rajaus: object|null, karjet: Array<[number, number]> }}
 */
export function jaksonRajaus({
  kohde, vanat = [], alku, loppu, pitoMin = Infinity,
  selkaMaxAst = KARJEN_ETAISYYS_MAX_AST, haaraMaxAst = HAARAN_ETAISYYS_MAX_AST,
  liikeMinAst = KARJEN_LIIKE_MIN_AST,
}) {
  if (!Number.isFinite(kohde?.lat) || !Number.isFinite(kohde?.lon)) return { rajaus: null, karjet: [] };
  const pisteet = [[kohde.lat, kohde.lon]];
  const karjet = [];
  // Uutta piirtävä kelloväli: pito pitää jo piirretyn, joten alku ei
  // voi olla pitoMin:iä vanhempi; taaksepäin kulkeva jakso kutistuu
  // yhteen hetkeen (nykyinen rintama).
  const hi = Math.min(Number(alku), Number.isFinite(pitoMin) ? pitoMin : Infinity);
  const lo = Math.min(Number(loppu), hi);
  if (!Number.isFinite(hi) || !Number.isFinite(lo)) return { rajaus: vananRajaus(pisteet), karjet };
  const naytteet = hi === lo ? [hi] : KARJEN_NAYTTEET.map((f) => hi + (lo - hi) * f);
  vanat.forEach((vana, k) => {
    const p = vana?.pisteet;
    if (!p?.length) return;
    const eka = p[0][2];
    const vika = p[p.length - 1][2];
    // Vana on käynnissä välillä: alkanut ennen ikkunan loppua eikä
    // valmis ennen sen alkua.
    if (!(vika < hi && eka > lo)) return;
    const kohdat = naytteet.map((t) => karkiHetkella(p, t)).filter(Boolean);
    if (!kohdat.length) return;
    const liike = kulmaEro(kohdat[0].lat, kohdat[0].lng, kohdat[kohdat.length - 1].lat, kohdat[kohdat.length - 1].lng);
    if (hi !== lo && liike < liikeMinAst) return;
    const katto = k === 0 ? selkaMaxAst : haaraMaxAst;
    if (kohdat.some((c) => kulmaEro(kohde.lat, kohde.lon, c.lat, c.lng) > katto)) return;
    for (const c of kohdat) {
      pisteet.push([c.lat, c.lng]);
      karjet.push([c.lat, c.lng]);
    }
  });
  return { rajaus: vananRajaus(pisteet), karjet };
}

/**
 * Nimetyn alueen kameralaatikko laudan yksiköissä.
 *
 * PUHDAS FUNKTIO (tests/ihmisen-matka-esitys.test.mjs). Palauttaa
 * MAAILMA-laatikon, kun aluetta ei tunneta tai se on koko pallo —
 * tuntematon nimi ei saa jättää kameraa paikoilleen ilman jälkeä.
 *
 * @param {string} tunnus kaanonin `alue`
 * @returns {{x:number,y:number,w:number,h:number}}
 */
export function alueenLaatikko(tunnus) {
  const alue = ESITYKSEN_ALUEET[tunnus];
  if (!alue) return { ...MAAILMA };
  const a = projisoiLaudalle(LAUTA, alue.lon[0], alue.lat[1]);
  const b = projisoiLaudalle(LAUTA, alue.lon[1], alue.lat[0]);
  if (!a || !b) return { ...MAAILMA };
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return {
    x, y, w: Math.abs(b.x - a.x), h: Math.abs(b.y - a.y),
  };
}

/**
 * Jakson kellotahti: mistä lukemasta mihin kello kulkee.
 *
 * PUHDAS FUNKTIO (tests). Viimeinen jakso jää lukemaansa — kello ei
 * juokse kaaren ohi.
 *
 * @param {Array<object>} kertomus kaanonin jaksot
 * @param {number} i jakson indeksi
 * @returns {{alku:number, loppu:number}} lukemat (vuosia sitten)
 */
export function jaksonTahti(kertomus, i) {
  const jakso = kertomus?.[i];
  const seuraava = kertomus?.[i + 1];
  const alku = Number(jakso?.vuosia);
  const perus = Number.isFinite(alku) ? alku : 0;
  /*
   * AIKAHYPPY KUULUU HYPPYJAKSOLLE, EI SITÄ EDELTÄVÄLLE. Ilman tätä
   * ehtoa Chilen jakso (14 500) kelaisi itse takaisin Keski-Aasiaan
   * (50 000) kertojan puhuessa pisimmästä kävelymatkasta — kelaus
   * alkaisi väärässä paikassa ja väärän tekstin alla. Hyppyjakso
   * lähtee siitä lukemasta, johon edellinen jäi (ks. kelauksenAlku).
   */
  if (seuraava?.vaihe === 'hyppy') return { alku: perus, loppu: perus };
  const loppu = Number(seuraava?.vuosia);
  return { alku: perus, loppu: Number.isFinite(loppu) ? loppu : perus };
}

/**
 * AIKASELAIMEN KELATTU LUKEMA nauhan jatkuvasta osuudesta (0…1).
 *
 * PUHDAS FUNKTIO (tests/aikaselain.test.mjs). Nauhan viivat ovat
 * jaksojärjestyksessä tasavälein (js/linssit/aikaselain.js), joten
 * osuus 0 on ensimmäinen jakso ja 1 viimeinen; viivojen VÄLISSÄ lukema
 * interpoloidaan GEOMETRISESTI, samalla kaavalla kuin kellon oma
 * asteikko (js/aikajana.js vuosiaSittenLukema) — muuten sormi hyppäisi
 * 300 000:sta 240 000:een lineaarisesti ja kello näyttäisi eri lukua
 * kuin sama kohta esityksen kuluessa. Nolla tai negatiivinen pää
 * (viimeinen jakso on 0) menee suoraan, koska logaritmi ei kestä sitä.
 *
 * @param {Array<{vuosia:number}>} kertomus kaanonin jaksot
 * @param {number} osuus 0…1
 * @returns {number} vuosia sitten
 */
export function kelauksenLukema(kertomus, osuus) {
  const n = kertomus?.length ?? 0;
  if (!n) return 0;
  const t = Math.max(0, Math.min(1, Number(osuus) || 0)) * (n - 1);
  const i = Math.min(n - 2, Math.floor(t));
  if (i < 0) return Number(kertomus[0]?.vuosia) || 0;
  const f = Math.max(0, Math.min(1, t - i));
  const a = Number(kertomus[i]?.vuosia);
  const b = Number(kertomus[i + 1]?.vuosia);
  if (!Number.isFinite(a)) return 0;
  if (!Number.isFinite(b)) return a;
  if (!(a > 0) || !(b > 0)) return a + (b - a) * f;
  return a * ((b / a) ** f);
}

/** Pehmennys kelaukselle: hidas lähtö, hidas pysähdys (ei ylitystä). */
export function kelauksenPehmennys(t) {
  const x = Math.max(0, Math.min(1, t));
  return x < 0.5 ? 2 * x * x : 1 - ((-2 * x + 2) ** 2) / 2;
}

/** Onko kuvien näyttö päällä (lippu tai osoiterivin koe). */
function kuvatKaytossa() {
  const haku = new URLSearchParams(globalThis.location?.search ?? '');
  const valinta = haku.get('esityskuvat');
  if (valinta === 'ei' || valinta === '0') return false;
  if (valinta === 'kylla' || valinta === '1') return true;
  return IHMISEN_MATKA_KUVAT_ESITYKSESSA;
}

function solmu(tag, luokka) {
  const el = document.createElement(tag);
  if (luokka) el.className = luokka;
  return el;
}

/**
 * Esityksen ohjaaja yhdelle ajolle.
 *
 * @param {object} asetukset
 * @param {object} asetukset.ajo js/aikajana.js:n Aikajana-olio
 * @returns {object} { aloita, taukoTaiJatka, tauko, jatka, pura, tila }
 */
export function luoEsitys({ ajo }) {
  const kertomus = ajo.kaari?.kertomus ?? [];
  const etuliite = ajo.kaari?.kertomusRunko;
  const reduced = Boolean(ajo.reducedMotion);
  const kuvat = kuvatKaytossa();
  /** Jakson tunnus → moottorin pysäkin indeksi (kuva ja lamppu). */
  const pysakit = new Map();
  ajo.tapahtumat.forEach((t, i) => { if (t?.tunnus) pysakit.set(t.tunnus, i); });

  const tila = {
    i: -1,
    /*
     * KULUNUT ON SEINÄKELLOA, EI KEHYSTEN SUMMAA. Luenta on
     * reaaliaikaista ääntä, joten jakson eteneminen on mitattava
     * samasta kellosta: kehyksiä summaava laskuri jäisi jälkeen aina
     * kun pallo piirtyy hitaasti (kontin ohjelmisto-WebGL piirtää noin
     * kehyksen sekunnissa), ja kertoja puhuisi jaksosta, jota kartta ei
     * vielä näytä. Tauko siirtää lähtöhetkeä eikä pysäytä laskuria.
     */
    alkuHetki: 0,
    kulunut: 0,
    /** Jakson koko kesto (luenta + pulun vara). */
    kesto: 0,
    /** Luennan osuus jakson kestosta — kello kulkee tässä ajassa. */
    luenta: 0,
    /** Kelauksen lähtölukema aikahypyssä (null = ei kelausta). */
    kelauksenAlku: null,
    puluSanottu: false,
    kaynnissa: false,
    tauolla: false,
    purettu: false,
    paattynyt: false,
    raf: 0,
    aani: null,
    kuva: null,
    /** Mittarit savukkeelle. */
    jaksoja: 0,
    kuviaNaytetty: 0,
    pulujaSanottu: 0,
    koukkuKutsuttu: false,
    vuosia: Number(kertomus[0]?.vuosia) || 0,
    /** Pienin kellolukema tähän asti: pidon pohja (ks. PITO ja jaksonRajaus). */
    pitoMin: Infinity,
    /** Jakson kameraan otetut kärjet [lat, lng] (savukkeen mittari). */
    karjet: [],
    /** Jatkettiinko muistista (ei pimeää, ei avausta). */
    muistista: false,
    /*
     * AIKASELAIMEN VETO KESKEN (js/linssit/aikaselain.js). Null, kun
     * sormi ei ole nauhalla; vedon ajaksi tähän jää tieto siitä, oliko
     * pelaaja itse tauolla — irrotus jatkaa esitystä vain, jos ei ollut
     * (Raamattu LINSSIEN AIKASELAIN ALAREUNAAN).
     */
    selaus: null,
    /** Mittari savukkeelle: montako kertaa nauhasta on valittu jakso. */
    selauksia: 0,
  };

  /* ---------------------------------------------------------- pinnat */

  const peite = solmu('div', 'aikajana-esitys-peite');
  peite.setAttribute('aria-hidden', 'true');
  const tekstirivi = solmu('div', 'aikajana-kertomusteksti');
  tekstirivi.setAttribute('role', 'status');
  tekstirivi.setAttribute('aria-live', 'polite');
  const tekstilaatikko = solmu('p', 'aikajana-kertomusteksti-sisus');
  tekstirivi.appendChild(tekstilaatikko);

  const asennaPinnat = ({ pimea = true } = {}) => {
    const juuri = ajo.juuri;
    if (!juuri) return;
    // Peite ensimmäiseksi lapseksi: kaikki muu on sen päällä DOM-
    // järjestyksessä, ja luokka `esitys-pimea` piilottaa ne erikseen.
    // Muistista jatkettaessa peitettä ei panna lainkaan: läpinäkyvänäkin
    // se ottaisi napautukset (pointer-events: auto) kartan edestä.
    if (pimea) juuri.prepend(peite);
    juuri.appendChild(tekstirivi);
    juuri.classList.add('esitys-kaynnissa');
  };

  /* ---------------------------------------------------------- kamera */

  const kamera = () => (ajo.pallolla ? ajo.kamera() : null);

  const ajaAlueeseen = (tunnus, kesto) => {
    const k = kamera();
    if (!k?.ajaKamera) return Promise.resolve(false);
    const bbox = alueenLaatikko(tunnus);
    return k.ajaKamera({ bbox, marginaali: 0.04 }, { kesto: reduced ? 0 : kesto });
  };

  const kuvasuhde = () => {
    const kotelo = ajo.lauta?.kotelo ?? ajo.ui?.mapPane ?? null;
    const w = kotelo?.clientWidth ?? 0;
    const h = kotelo?.clientHeight ?? 0;
    return w > 0 && h > 0 ? w / h : 1;
  };

  /**
   * Kamera kohteeseen NIIN, ETTÄ KULKEVA VANA PYSYY KUVASSA (Raamattu
   * ETELA-AFRIKASSA KAMERA ULOS, VANA EI SAA HUKKUA): rajaus on kohde +
   * jakson aikana liikkuvien vanojen kärkipolut (jaksonRajaus), eikä
   * koskaan lähikuvaa tiukempi. Ilman vanoja (tasokartta, laskenta
   * kesken) rajaus on pelkkä kohde eli entinen lähikuva.
   */
  const ajaKohteeseen = (tunnus, kesto, { alku = null, loppu = null } = {}) => {
    const k = kamera();
    const i = pysakit.get(tunnus);
    const t = ajo.tapahtumat[i];
    if (!k?.ajaKamera || !t || !Number.isFinite(t.lat) || !Number.isFinite(t.lon)) {
      return Promise.resolve(false);
    }
    const vanat = ajo.virrat?.vanat?.()?.pisteet?.() ?? [];
    const { rajaus, karjet } = jaksonRajaus({
      kohde: t,
      vanat,
      alku: Number.isFinite(alku) ? alku : tila.vuosia,
      loppu: Number.isFinite(loppu) ? loppu : tila.vuosia,
      pitoMin: tila.pitoMin,
    });
    tila.karjet = karjet;
    const leveys = Math.max(ESITYKSEN_LAHIKUVA, rajauksenLeveys(rajaus, kuvasuhde(), KARJEN_VARA) ?? 0);
    return k.ajaKamera(
      {
        lat: rajaus?.lat ?? t.lat, lng: rajaus?.lon ?? t.lon, leveys,
      },
      { kesto: reduced ? 0 : kesto },
    );
  };

  /* ------------------------------------------------------------ kuva */

  const suljeKuva = () => {
    const vanha = tila.kuva;
    tila.kuva = null;
    if (!vanha) return;
    vanha.classList.remove('esilla');
    if (reduced) vanha.remove();
    else setTimeout(() => vanha.remove(), KUVAN_POISTUMA_MS);
  };

  /**
   * Löytökuva kohteen viereen pallon pinnalle. Kehys ripustetaan
   * LAMPUN elementtiin (js/aikajana.js rakennaValotPallolle), joten se
   * seuraa pistettä kameran liikkuessa eikä sitä tarvitse asemoida.
   */
  const naytaKuva = (tunnus) => {
    suljeKuva();
    if (!kuvat) return;
    const i = pysakit.get(tunnus);
    const t = ajo.tapahtumat[i];
    const g = ajo.valot?.[i]?.g ?? null;
    const osoite = t?.ilmio?.osoite ?? t?.kuva?.osoite ?? null;
    if (!g || !osoite) return;
    const kehys = solmu('div', 'aikajana-kertomuskuva');
    kehys.style.setProperty('--kertomuskuva-leveys', `${Math.round(KUVAN_OSUUS * 100)}vw`);
    /*
     * KUVA ON NAPAUTETTAVA (omistaja 7.9.2026: *"myöskään ei niistä
     * valokuvista tapahdu mitään"*). Kehys on lampun CSS2D-elementin
     * lapsi, ja koko merkkikerros on pointer-events: none — napautus
     * meni pallon pintaan, ja siellä lähin merkki (44 px) oli harvoin
     * tämä lamppu, koska kuva on 1,4 rem sivussa ja 22 % ruudun
     * levyinen. Kehys ottaa siksi napautuksen ITSE (css pointer-events:
     * auto) ja avaa saman kortin kuin lamppu ja hehku.
     */
    kehys.setAttribute('role', 'button');
    kehys.setAttribute('aria-label', `${t.otsikko ?? ''}: avaa nosto`);
    kehys.addEventListener('click', (e) => {
      e.stopPropagation();
      ajo.ui?.nostokortti?.avaa?.(tunnus);
    });
    const img = new Image();
    img.alt = '';
    img.decoding = 'async';
    img.src = osoite;
    kehys.appendChild(img);
    g.appendChild(kehys);
    tila.kuva = kehys;
    tila.kuviaNaytetty += 1;
    if (reduced) kehys.classList.add('esilla');
    else requestAnimationFrame(() => kehys.classList.add('esilla'));
  };

  /* ----------------------------------------------------------- lamppu */

  /**
   * Kohteen lamppu palamaan ja jäämään. Löytöpaikat eivät ole
   * pysäkkejä, joten yksikään ei ole "nykyinen" — ne jäävät hiljaisiksi
   * hehkuiksi kartalle tutkimusvaihetta varten.
   */
  const sytytaKohde = (tunnus) => {
    const valo = ajo.valot?.[pysakit.get(tunnus)] ?? null;
    if (valo) ajo.asetaValonTila(valo, true, false);
  };

  /* ------------------------------------------------------------ kello */

  const kirjoitaKello = (vuosia) => {
    const arvo = Math.max(0, vuosia);
    tila.vuosia = arvo;
    tila.pitoMin = Math.min(tila.pitoMin, arvo);
    const paikka = ajo.asteikko.paikka?.(arvo) ?? arvo;
    ajo.tila = { ...ajo.tila, vuosi: paikka };
    ajo.naytaVuosi(paikka, reduced);
  };

  /**
   * KELLO JA VANAT KELATTUUN HETKEEN (aikaselaimen veto). Ero
   * `kirjoitaKello`-funktioon on kaksi:
   *
   *   1. PITOA EI KASVATETA (`tila.pitoMin`): kelaus taaksepäin on
   *      pelaajan oma ele, ja pidon pohja asetetaan vasta valinnassa.
   *   2. VANAT PÄIVITETÄÄN SUORAAN. Esityksen aikana virtojen oma
   *      silmukka lukisi kellon 80 ms:n välein, mutta TUTKIMUSVAIHEESSA
   *      se ei lue sitä lainkaan (js/aikajana-virrat.js silmukka: lukema
   *      on siellä vakio 0) — ilman suoraa kutsua nauha ei kelaisi
   *      levinneisyyttä lopussa mihinkään. Sama kutsu antaa esityksen
   *      aikana vasteen heti sormen liikkeeseen.
   */
  const kelaaKello = (vuosia) => {
    const arvo = Math.max(0, Number(vuosia) || 0);
    tila.vuosia = arvo;
    const paikka = ajo.asteikko.paikka?.(arvo) ?? arvo;
    ajo.tila = { ...ajo.tila, vuosi: paikka };
    ajo.naytaVuosi(paikka, reduced);
    ajo.virrat?.vanat?.()?.paivita?.(arvo, { pito: false });
  };

  /* ------------------------------------------------------------ luenta */

  const aloitaLuenta = (jakso, { alkukohta = 0 } = {}) => {
    const runko = kertomuksenRunko(jakso, etuliite);
    tila.aani = runko
      ? soitaLinssiluenta(ajo.ui, null, { runko, juuri: ajo.luentajuuri, viive: 0 })
      : null;
    const aani = tila.aani;
    if (!aani) return;
    /*
     * JATKO KESKELTÄ JAKSOA (muisti): äänite kelataan samaan kohtaan
     * kuin kello, heti kun sen kesto tiedetään. Kelaus ennen
     * metatietoja ei ole luotettava kaikissa selaimissa.
     */
    if (alkukohta > 0) {
      const kelaa = () => {
        if (tila.aani !== aani || tila.purettu) return;
        const kesto = Number(aani.duration);
        if (Number.isFinite(kesto) && kesto > 0 && alkukohta / 1000 < kesto - 0.5) {
          try { aani.currentTime = alkukohta / 1000; } catch { /* ei kelattavissa */ }
        }
      };
      aani.addEventListener('loadedmetadata', kelaa, { once: true });
      if (Number.isFinite(aani.duration) && aani.duration > 0) kelaa();
    }
    /*
     * KESTO ÄÄNITTEESTÄ HETI KUN SE TIEDETÄÄN. Varakesto on jo
     * käytössä, joten metatietojen viive ei pysäytä mitään: jakson
     * kesto vain tarkentuu kesken jakson. Vanha äänite (edellinen
     * jakso) ei saa muuttaa nykyistä — siksi tunnistus kahvasta.
     */
    const tarkenna = () => {
      if (tila.aani !== aani || tila.purettu) return;
      const kesto = Number(aani.duration);
      if (!Number.isFinite(kesto) || kesto <= 0) return;
      tila.luenta = Math.round(kesto * 1000);
      tila.kesto = tila.luenta + (jakso.pulu ? PULUN_VARA_MS : 0);
    };
    aani.addEventListener('loadedmetadata', tarkenna, { once: true });
    tarkenna();
  };

  /* ------------------------------------------------------------- pulu */

  const sanoPulu = (jakso) => {
    tila.puluSanottu = true;
    if (!jakso.pulu) return;
    const nakyi = polloLinssikupla([jakso.pulu], {
      luokka: 'aikajana-kertomus-pulu',
      aani: () => soitaLivianLinssiAani(ajo.ui, ajo.linssi?.tunnus ?? 'ihmisen-matka', jakso.id, {
        teksti: jakso.pulu,
      }),
    });
    if (nakyi) tila.pulujaSanottu += 1;
  };

  /* ------------------------------------------------------------- jakso */

  const aloitaJakso = (i, { kulunut = 0 } = {}) => {
    const jakso = kertomus[i];
    if (!jakso) { paata(); return; }
    tila.i = i;
    // Jakson oma lähtöhetki: kulunut mitataan seinäkellosta (ks. tila).
    // Muistista jatkettaessa jakso alkaa keskeltä (kulunut > 0).
    tila.alkuHetki = performance.now() - kulunut;
    tila.kulunut = kulunut;
    tila.puluSanottu = false;
    tila.jaksoja += 1;
    tila.luenta = kertomuksenVarakesto(jakso);
    tila.kesto = tila.luenta + (jakso.pulu ? PULUN_VARA_MS : 0);
    tila.kelauksenAlku = null;

    tekstilaatikko.textContent = jakso.teksti ?? '';
    tekstirivi.classList.toggle('esilla', Boolean(jakso.teksti));

    if (jakso.vaihe === 'valot') sytytaValot();
    // Kelaus lähtee nykyisestä lukemasta; keskeltä jatkettaessa
    // (muisti) kelaus on jo tehty ja kello jatkaa jakson lukemasta.
    if (jakso.vaihe === 'hyppy') tila.kelauksenAlku = kulunut >= KELAUKSEN_MS ? null : tila.vuosia;

    const tahti = jaksonTahti(kertomus, i);
    // Kello jakson alkuun heti (kelaus lähtee omasta lukemastaan).
    if (jakso.vaihe !== 'hyppy' || tila.kelauksenAlku === null) kirjoitaKello(tahti.alku);

    aloitaLuenta(jakso, { alkukohta: kulunut });

    /*
     * KAMERAN KESTO LASKETAAN VARAKESTOSTA eikä äänitteestä: ajo on
     * lähdettävä samalla hetkellä kuin luenta, ja äänitteen metatiedot
     * saapuvat vasta hetkeä myöhemmin.
     *
     * AJO VOI JÄÄDÄ KESKEN, JA SE ON SALLITTUA. Varakesto on tekstin
     * mitta (14 merkkiä/s) ja äänite usein lyhyempi: lopun jaksolla
     * arvio oli 10,4 s ja ajo 8,9 s, mutta äänitteen mukaan jakso
     * kesti 5,6 s. Keskellä kaarta se ei haittaa — seuraava ajo lähtee
     * siitä, mihin kamera ehti (js/pallolauta/kamera.js aloittaa aina
     * nykyisestä näkymästä), ja liike pysyy jatkuvana. VIIMEISELLÄ
     * jaksolla haittasi: loppunäkymä jäi puolitiehen (mitattu
     * savukkeella 7.9.2026: 2 698 lautayksikköä odotetun 3 546
     * sijaan), ja siksi `paata` asemoi lopun erikseen.
     */
    const kesto = Math.max(
      KAMERAN_POHJA_MS,
      Math.min(KAMERAN_KATTO_MS, Math.round(tila.luenta * KAMERAN_OSUUS)),
    );
    if (jakso.kohde) {
      sytytaKohde(jakso.kohde);
      naytaKuva(jakso.kohde);
      ajaKohteeseen(jakso.kohde, kesto, { alku: tahti.alku, loppu: tahti.loppu });
    } else {
      tila.karjet = [];
      suljeKuva();
      if (jakso.alue) ajaAlueeseen(jakso.alue, jakso.vaihe === 'valot' ? 0 : kesto);
    }
    // Aikaselaimen valittu viiva seuraa esitystä (Raamattu LINSSIEN
    // AIKASELAIN ALAREUNAAN: "vuosiluku … voisi toistua pienellä sen
    // korkeamman viivan päällä").
    ajo.aikaselain?.aseta?.(jakso.id);
    // Muisti seuraa jaksoa: sulku tai virkistys jatkaa tästä jaksosta.
    ajo.tallennaMuisti?.();
  };

  /**
   * VALOT SYTTYVÄT (Raamattu ALKAA MUSTASTA RUUDUSTA). Musta häipyy,
   * käyttöliittymä palaa, musiikki nousee sisään ja vanojen pito
   * kytkeytyy päälle koko lopun esityksen ajaksi.
   */
  const sytytaValot = () => {
    ajo.juuri?.classList.remove('esitys-pimea');
    peite.classList.add('pois');
    if (reduced) peite.remove();
    else setTimeout(() => peite.remove(), VALOJEN_MS);
    ajo.virrat?.asetaPito?.(true);
    ajo.aloitaMusiikki?.(true);
  };

  /* ------------------------------------------------------------ silmukka */

  const paivitaKello = () => {
    const jakso = kertomus[tila.i];
    if (!jakso) return;
    const { alku, loppu } = jaksonTahti(kertomus, tila.i);
    if (jakso.vaihe === 'hyppy' && tila.kelauksenAlku !== null) {
      const kelaus = Math.min(1, tila.kulunut / KELAUKSEN_MS);
      if (kelaus < 1) {
        const f = kelauksenPehmennys(kelaus);
        kirjoitaKello(tila.kelauksenAlku + (alku - tila.kelauksenAlku) * f);
        return;
      }
      const jaljella = Math.max(1, tila.luenta - KELAUKSEN_MS);
      const osuus = Math.min(1, (tila.kulunut - KELAUKSEN_MS) / jaljella);
      kirjoitaKello(alku + (loppu - alku) * osuus);
      return;
    }
    const osuus = Math.min(1, tila.kulunut / Math.max(1, tila.luenta));
    kirjoitaKello(alku + (loppu - alku) * osuus);
  };

  const kehys = (nyt) => {
    if (!tila.kaynnissa || tila.purettu) return;
    tila.raf = requestAnimationFrame(kehys);
    tila.kulunut = nyt - tila.alkuHetki;
    paivitaKello();
    if (!tila.puluSanottu && tila.kulunut >= tila.luenta) sanoPulu(kertomus[tila.i]);
    if (tila.kulunut >= tila.kesto) {
      if (tila.i + 1 < kertomus.length) aloitaJakso(tila.i + 1);
      else paata();
    }
  };

  const kaynnista = () => {
    if (tila.kaynnissa || tila.purettu) return;
    tila.kaynnissa = true;
    tila.tauolla = false;
    ajo.kaynnissa = true;
    ajo.juuri?.classList.remove('tauolla');
    if (ajo.taukoNappi) ajo.taukoNappi.textContent = 'Tauko';
    ajo.saadaMusiikki?.(true);
    // Jatko samasta kohdasta: lähtöhetki siirtyy kuluneen verran taakse.
    tila.alkuHetki = performance.now() - tila.kulunut;
    tila.raf = requestAnimationFrame(kehys);
  };

  const seis = () => {
    tila.kaynnissa = false;
    ajo.kaynnissa = false;
    cancelAnimationFrame(tila.raf);
    tila.raf = 0;
  };

  /* ------------------------------------------------------------ loppu */

  function paata({ kamera = true } = {}) {
    if (tila.paattynyt) return;
    tila.paattynyt = true;
    seis();
    /*
     * LOPPUNÄKYMÄ ON VARMISTETTU, EI TOIVOTTU. Viimeisen jakson
     * kamera-ajo on voinut jäädä kesken (jakso lyheni äänitteen
     * mukaan, kehysväli venyi, ele keskeytti), ja silloin esitys
     * päättyisi puolittaiseen zoomiin. Sama rajaus ajetaan siksi
     * uudestaan lyhyellä liu'ulla: jos kamera on jo perillä, laudan
     * oma ajo huomaa sen eikä liikuta mitään (js/pallolauta/kamera.js
     * "ajo, joka ei liikuta mitään, on turha").
     */
    const viimeinen = kertomus[tila.i];
    // Nauhan valinta jää loppuun; tutkimusvaiheessa siitä jatketaan.
    if (viimeinen?.id) ajo.aikaselain?.aseta?.(viimeinen.id);
    if (kamera && viimeinen?.alue) ajaAlueeseen(viimeinen.alue, reduced ? 0 : LOPUN_ASETUS_MS);
    suljeKuva();
    tekstirivi.classList.remove('esilla');
    // Esinerivi ja ohjaimet takaisin pelaajalle ennen koukkua: kartta
    // on nyt hänen.
    ajo.juuri?.classList.remove('esitys-kaynnissa');
    if (ajo.taukoNappi) {
      ajo.taukoNappi.textContent = 'Loppu';
      ajo.taukoNappi.disabled = true;
    }
    tila.koukkuKutsuttu = true;
    // Koukku viimeisenä: tutkimusvaihe on toisen moduulin työtä, ja se
    // saa ottaa ruudun haltuunsa vasta kun esitys on siivonnut jälkensä.
    ajo.ui?.aloitaTutkimusvaihe?.();
  }

  /* ---------------------------------------------------------- aikaselain */

  /**
   * NAUHAN VETO (esikatselu). Esitys menee HILJAA tauolle — kertoja
   * vaikenee, silmukka pysähtyy — ja kello sekä vanat seuraavat sormea.
   * Nappien tekstiin ei kosketa: veto ei ole Tauko-napin painallus, ja
   * irrotus joko jatkaa esitystä tai jättää sen tauolle sen mukaan,
   * kummassa tilassa pelaaja oli (Raamattu LINSSIEN AIKASELAIN
   * ALAREUNAAN: *"irrotus jatkaa esitystä siitä"*).
   *
   * Pito katkaistaan vedon ajaksi: pito on yksisuuntainen maksimi
   * (luku 12.5), eikä taaksepäin kelattu kartta saa jäädä näyttämään
   * Amerikkoja Afrikan jakson kohdalla.
   *
   * @param {number} osuus nauhan jatkuva sijainti 0…1
   */
  function esikatsele(osuus) {
    if (tila.purettu) return false;
    if (!tila.selaus) {
      tila.selaus = { oliTauolla: !tila.kaynnissa };
      if (tila.kaynnissa) seis();
      tila.tauolla = true;
      try { tila.aani?.pause(); } catch { /* soitin oli jo purettu */ }
      ajo.virrat?.asetaPito?.(false);
    }
    kelaaKello(kelauksenLukema(kertomus, osuus));
    return true;
  }

  /**
   * NAUHAN VALINTA (sormi irtosi tai napautus). Esitys jatkaa valitusta
   * jaksosta SEN ALUSTA — luenta alkaa, kamera ajaa ja kello lähtee
   * jakson lukemasta. Tutkimusvaiheessa (esityksen jälkeen) sama
   * valinta on pelkkä kelaus: kello ja vanat siirtyvät hetkeen, kertoja
   * on vaiti.
   */
  function valitse(id) {
    if (tila.purettu) return false;
    const i = kertomus.findIndex((j) => j.id === id);
    if (i < 0) return false;
    const selaus = tila.selaus;
    tila.selaus = null;
    tila.selauksia += 1;
    const vuosia = Number(kertomus[i]?.vuosia) || 0;
    // Pidon pohja alkaa valitusta hetkestä (ks. esikatsele).
    tila.pitoMin = vuosia;
    ajo.virrat?.asetaPito?.(true);
    ajo.aikaselain?.aseta?.(kertomus[i].id);
    if (tila.paattynyt) {
      tila.i = i;
      kelaaKello(vuosia);
      ajo.virrat?.vanat?.()?.paivita?.(vuosia, { pito: true });
      ajo.tallennaMuisti?.();
      return true;
    }
    suljeKuva();
    aloitaJakso(i);
    if (selaus?.oliTauolla) {
      // Pelaaja oli itse tauolla: jakso vaihtuu, mutta esitys ei lähde.
      seis();
      tila.tauolla = true;
      try { tila.aani?.pause(); } catch { /* soitin oli jo purettu */ }
      ajo.saadaMusiikki?.(false);
      if (ajo.taukoNappi) ajo.taukoNappi.textContent = 'Jatka';
      ajo.juuri?.classList.add('tauolla');
    } else kaynnista();
    return true;
  }

  /* ------------------------------------------------------------- muisti */

  /**
   * JATKO MUISTISTA (Raamattu LINSSI MUISTAA PAIKKANSA). Ei pimeää eikä
   * avausta: valot ovat päällä, musiikki nousee, pito kytketään ja sen
   * POHJA piirretään ensin (vanat siihen asti, mihin kello oli
   * pisimmillään ehtinyt — muuten Amerikat olisivat tyhjät, jos jatko
   * on Euroopan haarassa). Kamera on moottorin muistista jo paikallaan.
   * Tutkimusvaihe jatkuu suoraan koukkuun ilman kamera-ajoa.
   */
  function jatkaMuistista(muisti) {
    tila.muistista = true;
    asennaPinnat({ pimea: false });
    ajo.virrat?.asetaPito?.(true);
    ajo.aloitaMusiikki?.(true);
    if (Number.isFinite(muisti.pitoMin)) {
      tila.pitoMin = muisti.pitoMin;
      ajo.virrat?.vanat?.()?.paivita?.(muisti.pitoMin, { pito: true });
    }
    if (muisti.vaihe === 'tutkimus') {
      tila.i = kertomus.length - 1;
      tila.jaksoja = kertomus.length;
      kirjoitaKello(0);
      paata({ kamera: false });
      return true;
    }
    const i = kertomus.findIndex((j) => j.id === muisti.jakso);
    if (i < 0) return false;
    // Jakson kesto tarkentuu äänitteestä; kulunut ei saa ylittää varakestoa.
    const kulunut = Math.max(0, Math.min(Number(muisti.kulunut) || 0, kertomuksenVarakesto(kertomus[i]) - 200));
    aloitaJakso(i, { kulunut });
    kaynnista();
    return true;
  }

  /* ------------------------------------------------------------ julkinen */

  return {
    /**
     * Käynnistä-napista: musta ruutu, avausluenta, ei vielä musiikkia.
     * `muisti` (js/linssit/ihmisen-matka-muisti.js) jatkaa suoraan
     * siitä, mihin pelaaja jäi — ilman pimeää, ilman avausta.
     */
    aloita({ muisti = null } = {}) {
      if (tila.purettu || tila.i >= 0) return false;
      if (muisti) return jatkaMuistista(muisti);
      asennaPinnat();
      ajo.juuri?.classList.add('esitys-pimea');
      // Peite on musta HETI: avauslaatikon oma peite häipyy sen päältä,
      // eikä ruudulla välähdä karttaa.
      peite.classList.add('musta');
      // Kamera Afrikkaan jo pimeässä, jotta valot syttyvät valmiiseen
      // näkymään (omistaja: *"sitten voisi syttyä valot ja ruudulla
      // näkyä Afrikka kokonaisuudessaan"*).
      ajaAlueeseen('afrikka', 0);
      kirjoitaKello(Number(kertomus[0]?.vuosia) || 0);
      aloitaJakso(0);
      kaynnista();
      return true;
    },
    /**
     * AIKASELAIN (js/linssit/aikaselain.js) kutsuu näitä kahta: veto
     * esikatselee hetken, irrotus valitsee jakson. Moottori välittää
     * kutsut sellaisenaan (js/aikajana.js rakennaAikaselain).
     */
    esikatsele,
    valitse,
    /** Yläpalkin yksi nappi. */
    taukoTaiJatka() {
      if (tila.paattynyt) return;
      if (tila.kaynnissa) this.tauko(); else this.jatka();
    },
    /** Tauko: luenta ja kello pysähtyvät samasta kohdasta. */
    tauko() {
      if (!tila.kaynnissa) return;
      seis();
      tila.tauolla = true;
      try { tila.aani?.pause(); } catch { /* soitin oli jo purettu */ }
      ajo.saadaMusiikki?.(false);
      if (ajo.taukoNappi) ajo.taukoNappi.textContent = 'Jatka';
      ajo.juuri?.classList.add('tauolla');
    },
    /** Jatko samasta kohdasta: luenta jatkuu, kello lähtee siitä mihin jäi. */
    jatka() {
      if (tila.kaynnissa || tila.paattynyt || tila.purettu) return;
      if (tila.tauolla && tila.aani && !tila.aani.ended) {
        tila.aani.play().catch(() => { /* puuttuva ääni on hiljainen */ });
      }
      kaynnista();
    },
    pura() {
      if (tila.purettu) return;
      tila.purettu = true;
      seis();
      suljeKuva();
      peite.remove();
      tekstirivi.remove();
      ajo.juuri?.classList.remove('esitys-pimea', 'esitys-kaynnissa');
    },
    /** Mittarit savukkeelle ja testeille. */
    tila: () => ({
      jakso: kertomus[tila.i]?.id ?? null,
      vaihe: kertomus[tila.i]?.vaihe ?? null,
      indeksi: tila.i,
      jaksoja: tila.jaksoja,
      vuosia: Math.round(tila.vuosia),
      kaynnissa: tila.kaynnissa,
      tauolla: tila.tauolla,
      paattynyt: tila.paattynyt,
      pimea: Boolean(ajo.juuri?.classList.contains('esitys-pimea')),
      kuvia: tila.kuviaNaytetty,
      /*
       * ESILLÄ, EI VAIN LIITETTY. Kehys syntyy nollakoossa
       * (scale 0,6) ja saa `esilla`-luokan vasta seuraavassa
       * kehyksessä; ilman tätä eroa mittaaja voi osua siihen yhteen
       * kehykseen, jossa kuva on jo DOMissa mutta vielä kutistettuna
       * (savuke mittasi 110 px odotetun 183 px:n sijaan).
       */
      kuvaEsilla: Boolean(tila.kuva?.isConnected && tila.kuva.classList.contains('esilla')),
      kuvatKaytossa: kuvat,
      puluja: tila.pulujaSanottu,
      koukku: tila.koukkuKutsuttu,
      kesto: Math.round(tila.kesto),
      luenta: Math.round(tila.luenta),
      kulunut: Math.round(tila.kulunut),
      pitoMin: Number.isFinite(tila.pitoMin) ? Math.round(tila.pitoMin) : null,
      karjet: tila.karjet,
      muistista: tila.muistista,
      /** Aikaselaimen veto kesken (kertoja vaiti, kello sormen alla). */
      selaus: Boolean(tila.selaus),
      selauksia: tila.selauksia,
    }),
  };
}
