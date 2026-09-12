/*
 * SATELLIITTILINSSIN AVARUUSNÄKYMÄ — Maa avaruudesta, tähdet taustalla.
 *
 * OMISTAJAN TILAUS 12.9.2026, sanatarkasti: *"Astronoottikuvat ovat
 * hienoja, niitä voisi olla vaikka enemmänkin. Saisiko maapallosta
 * tehtyä sen näköistä, miltä se näyttää avaruudestakin? Ja laittaisi
 * vielä tähtiä taustalle. Linssi voisi alkaa niin, että maapallon
 * reunat näkyvät ja taustalla on tähtiä. Maapallonhan ei tarvitse olla
 * kovin tarkka. Eli zoomaustasoja ei tarvitse olla juurikaan."*
 *
 * Linssi katsoo astronautin silmin: kuvat on otettu avaruudesta, joten
 * myös pallon pitää olla se pallo, jonka astronautti näkee ikkunasta.
 * Mitattu vika ennen tätä (12.9.2026, kolme ruutua): linssi avautui
 * siihen zoomiin, jossa pelaaja sattui olemaan — puhelimella pallon
 * halkaisija oli 1 908 px 374 px:n ruudulla, eli reunoja ei näkynyt
 * lainkaan, ja ruudulla oli 1873-vuoden paperikartta Kreikan yllä.
 *
 * ── NELJÄ MUUTOSTA, KAIKKI LINSSIN AJAKSI ─────────────────────────
 *
 *  1. AVAUSNÄKYMÄ. Kamera nousee korkeudelle, jolla KOKO pallo mahtuu
 *     ruudun kapeimpaan suuntaan (avausKorkeus). Luku lasketaan
 *     kotelon omista mitoista eikä ole vakio: pystyruudulla rajaa
 *     LEVEYS, vaikka Globe.gl:n fov on pystysuunnan kulma.
 *  2. TÄHDET. Laudalla on jo tähtitaivas (js/pallolauta/tahdet.js,
 *     kirjoitettu Ihmisen matka -linssin avausjaksoa varten): kolme
 *     pistekerrosta kirjaston omalla hiukkaskerroksella, 2 190 pistettä
 *     ja siemenluku, joka antaa aina saman taivaan. UUTTA TÄHTIKENTTÄÄ
 *     EI SIIS TEHDÄ eikä kuvatiedostoa tuoda repoon (Raamattu: media
 *     ämpäriin, ei repoon) — tämä moduuli vain kutsuu sitä.
 *  3. MAAPALLO AVARUUDESTA. Pelin pinta on 1873-juliste; astronautin
 *     ikkunasta näkyy sininen pallo. Pinta vaihdetaan linssin ajaksi
 *     GENEROITUUN tekstuuriin (maapallonVarit alla), ilmakehän hehku
 *     kellanruskeasta taivaansiniseen ja taustaväri avaruuden mustaksi.
 *  4. KAPEA ZOOM. Pallo ei saa kadota ruudulta eikä pelaaja sukeltaa
 *     pintaan: zoomiraja on avauskorkeuden ympärillä
 *     (ZOOMIN_LAHIN/-KAUIN). PYÖRITYS SÄILYY — kohteet etsitään palloa
 *     pyörittämällä, ja se on omistajan linjaus.
 *
 * KAIKKI NELJÄ PURETAAN SULKIESSA. Lähtötila luetaan talteen avatessa
 * ja kirjoitetaan takaisin sellaisenaan: muun pelin pallon ulkoasu ei
 * muutu pysyvästi millään tavalla (mitattu ennen/jälkeen kolmella
 * ruudulla).
 *
 * ── MIKSI TEKSTUURI GENEROIDAAN EIKÄ HAETA ────────────────────────
 *
 * Ämpärissä on 1873-juliste, ei sinistä palloa, eikä repoon saa tuoda
 * mediaa. Omistaja sanoo suoraan, ettei pallon tarvitse olla tarkka.
 * Pelissä on kuitenkin jo maan ja meren raja koneluettavana:
 * js/linssit/ihmisen-matka-maamaski.js on 720 × 360 ruudun maapeitto
 * (0…9 osumaa yhdeksästä alinäytteestä), poltettu pelin omasta
 * laudasta. Siitä maalataan leveysvyöhykkeinen Maa — meri, sademetsä,
 * savanni, aavikko, lehtimetsä, taiga, tundra ja napajää — ja päälle
 * ohut pilviharso. Se on "uskottava pallo" eikä satelliittikuva, juuri
 * niin kuin tilattiin.
 *
 * MASKIN RAJAT OVAT LAUDAN RAJAT: juliste loppuu 76° N:ään ja 58° S:ään,
 * joten sen ulkopuoli on maskissa merta. Napajää maalataan siksi omana
 * kerroksenaan 66°:sta navalle, jolloin Etelämanner ja Jäämeren jää
 * tulevat esiin ilman erillistä aineistoa.
 */

import { MAAMASKI } from './ihmisen-matka-maamaski.js';
import { puraPeitto } from '../aikajana-virrat-laskenta.js';
import { luoTahtitaivas } from '../pallolauta/tahdet.js';

/* ═════════════════ 1. AVAUSNÄKYMÄN KORKEUS ══════════════════════ */

/**
 * Reunan rako: osuus ruudun kapeimmasta sivusta, joka jää pallon ja
 * ruudun laidan väliin. Pallon REUNAT ovat tilauksen ydin, joten rakoa
 * on oltava sen verran, että kaari erottuu tähtitaustaa vasten myös
 * silloin kun pelaaja on pyörittänyt palloa hieman sivuun.
 */
export const AVAUKSEN_MARGINAALI = 0.12;

/** Globe.gl:n kameran avauskulma pystysuunnassa (sama kuin PALLO_FOV). */
export const AVARUUDEN_FOV = 50;

/** Zoomin lähin raja avauskorkeudesta: pallo täyttää ruudun, ei enempää. */
export const ZOOMIN_LAHIN = 0.55;
/** Zoomin kauin raja avauskorkeudesta: pallo pienenee, ei katoa. */
export const ZOOMIN_KAUIN = 1.3;

/** Avausajon kesto (ms); liikkeenvähennyksellä hyppy. */
export const AVAUSAJON_MS = 900;
/**
 * Sormiliu'un naulaus sulkiessa (ms). Pallon oma liuku (js/pallo.js
 * asennaPallonEleet) jatkaa kirjoittamista kameraan sormen irrottua,
 * eikä sitä voi pysäyttää ulkoa; lähtöpaikka kirjoitetaan siksi joka
 * kehyksellä liu'un keston yli. Mitattu 12.9.2026: yksi kirjoitus jätti
 * kameran 0,32° sivuun, kun pelaaja pyöräytti palloa juuri ennen
 * sulkemista.
 */
export const LIUUN_NAULAUS_MS = 900;

/**
 * Asettumisen ikkuna (ms): tämän ajan sisällä kotelon koon muutos on
 * yläpalkin vaihtumista eikä pelaajan tekoa, ja kamera saa sovittaa
 * itsensä uudestaan vaikka avausajo olisi kesken.
 */
export const ASETTUMISEN_IKKUNA_MS = 2500;

/**
 * KOKO PALLO RUUTUUN — kameran korkeus pallonsäteinä.
 *
 * PUHDAS FUNKTIO (tests/satelliitti-avaruus.test.mjs), riippumaton
 * pallon säteestä: kulma on sama olipa pallo minkä kokoinen tahansa.
 *
 * Kamera on etäisyydellä d = R · (1 + korkeus). Pallon siluetin
 * kulmasäde on a = asin(R / d), ja perspektiivikuvassa sen ruutusäde on
 *
 *     r = (K / 2) · tan(a) / tan(fov / 2),
 *
 * missä K on kotelon KORKEUS pikseleinä (fov on pystykulma). Pallon on
 * mahduttava MOLEMPIIN suuntiin, joten halkaisijan katto on ruudun
 * kapeampi sivu marginaalilla vähennettynä — ja juuri tämä on se kohta,
 * joka pystyruudulla menee väärin, jos leveyttä ei katsota lainkaan.
 *
 * @param {{leveys: number, korkeus: number, fov?: number, marginaali?: number}} mitat
 * @returns {number} Globe.gl:n `altitude`
 */
export function avausKorkeus({
  leveys, korkeus, fov = AVARUUDEN_FOV, marginaali = AVAUKSEN_MARGINAALI,
} = {}) {
  const K = Number(korkeus) > 0 ? Number(korkeus) : 0;
  const L = Number(leveys) > 0 ? Number(leveys) : 0;
  if (!K || !L) return 2.5;
  const m = Math.max(0, Math.min(0.6, Number(marginaali) || 0));
  const mahtuu = Math.min(L, K) * (1 - m);
  // tan(a) = (mahtuu / K) · tan(fov / 2)
  const tanA = (mahtuu / K) * Math.tan((fov / 2) * (Math.PI / 180));
  const sinA = tanA / Math.sqrt(1 + tanA * tanA);
  if (!(sinA > 0)) return 2.5;
  return 1 / sinA - 1;
}

/**
 * Pallon halkaisija ruudulla (px) annetulla korkeudella — avausKorkeuden
 * käänteisluku, jota mittaukset ja testit lukevat.
 */
export function halkaisijaRuudulla(alt, { korkeus, fov = AVARUUDEN_FOV } = {}) {
  const K = Number(korkeus) > 0 ? Number(korkeus) : 0;
  const d = 1 + Math.max(0, Number(alt) || 0);
  if (!K || !(d > 1)) return 0;
  const a = Math.asin(Math.min(1, 1 / d));
  return K * Math.tan(a) / Math.tan((fov / 2) * (Math.PI / 180));
}

/** Zoomirajat avauskorkeudesta: kapea kaista pallon ympärillä. */
export function zoomirajat(alt) {
  const a = Math.max(0.05, Number(alt) || 0.05);
  return { min: a * ZOOMIN_LAHIN, max: a * ZOOMIN_KAUIN };
}

/* ═════════════════ 2. MAAN VÄRIT ════════════════════════════════ */

/**
 * LEVEYSVYÖHYKKEET — sävy ja se leveysaste, jolla se on puhtaimmillaan.
 *
 * Maa ei ole yksivärinen pallo, ja juuri vyöhykkeet tekevät siitä
 * tunnistettavan: vihreä päiväntasaajalla, keltainen aavikkovyöhyke
 * noin 25°:ssa, vihreä uudestaan lauhkealla, harmaanvihreä taigassa.
 * Pituuspiiriä ei katsota lainkaan — Sahara on oikeassa kohdassa
 * leveyssuunnassa mutta jatkuu maapallon ympäri. Omistaja: *"Maapallon
 * ei tarvitse olla kovin tarkka."*
 */
export const MAAVYOHYKKEET = [
  { lat: 0, vari: [46, 84, 44] },
  { lat: 14, vari: [92, 106, 52] },
  { lat: 25, vari: [170, 142, 96] },
  { lat: 38, vari: [88, 104, 58] },
  { lat: 52, vari: [62, 86, 58] },
  { lat: 64, vari: [116, 118, 104] },
  { lat: 90, vari: [214, 220, 224] },
];

/** Syvän meren ja matalan rannikkoveden sävyt. */
export const MERI_SYVA = [9, 32, 72];
export const MERI_MATALA = [28, 86, 126];
/** Napajään sävy ja vyöhyke, jolla se sulautuu ympäristöönsä. */
export const JAAN_VARI = [236, 240, 244];
export const JAAVYOHYKE = [64, 78];

/**
 * VALON VASTAKAAVA — miksi tekstuuri on navoilta tummempi kuin Maa.
 *
 * MITATTU 12.9.2026 (kaappaus puhelimelta): napa-alue paloi puhtaaksi
 * valkoiseksi. Syy on pallon valaistuksessa, ei tekstuurissa: kirjaston
 * valot ovat AmbientLight π (= kerroin 1,0) ja DirectionalLight 0,6 π
 * SUORAAN POHJOISNAVAN YLÄPUOLELTA (js/pallo.js kertoo saman
 * napakansien yhteydessä). Pinnan kirkkaus on siis
 *
 *     väri × (1 + 0,6 · max(0, sin(leveysaste))),
 *
 * eli navalla 1,6-kertainen. Napajää 236 → 378 → leikkautuu 255:een, ja
 * koko Jäämeri on yksi valkoinen läiskä ilman muotoa.
 *
 * TEKSTUURI EI VOI OLLA VALAISTUKSEN ARMOILLA, eikä valoja saa muuttaa:
 * ne ovat PELIN pallon valot, ja tämä on linssitila. Siksi tekstuuriin
 * poltetaan valon KÄÄNTEISLUKU — jokainen rivi jaetaan samalla
 * kertoimella, jolla valo sen kertoo. Lopputulos ruudulla on juuri se
 * väri, joka tässä tiedostossa on kirjoitettu.
 */
export const VALON_KOMPENSAATIO = 0.6;

/** Tekstuurin oletusmitat: 0,35° / pikseli, riittää yleiskuvaan. */
export const TEKSTUURIN_LEVEYS = 1024;
export const TEKSTUURIN_KORKEUS = 512;

const raja01 = (x) => (x < 0 ? 0 : (x > 1 ? 1 : x));
const pehmea = (a, b, x) => {
  if (b === a) return x < a ? 0 : 1;
  const t = raja01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const sekoita = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t,
];

/** Vyöhykeväri leveysasteelta (lineaarinen liuku taulukon välillä). */
export function vyohykeVari(lat) {
  const a = Math.abs(Number(lat) || 0);
  for (let i = 1; i < MAAVYOHYKKEET.length; i += 1) {
    const ed = MAAVYOHYKKEET[i - 1];
    const nyt = MAAVYOHYKKEET[i];
    if (a <= nyt.lat) return sekoita(ed.vari, nyt.vari, (a - ed.lat) / (nyt.lat - ed.lat));
  }
  return MAAVYOHYKKEET[MAAVYOHYKKEET.length - 1].vari.slice();
}

/**
 * Toistettava arvokohina (hash → 0…1). Sama siemen antaa aina saman
 * Maan, joten kuvakaappaukset vertautuvat keskenään.
 */
function kohina(x, y, siemen) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(siemen | 0, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
/** Kaksiulotteinen sileä kohina ruudukolla `askel`. */
function sileaKohina(x, y, askel, siemen) {
  const gx = x / askel;
  const gy = y / askel;
  const x0 = Math.floor(gx);
  const y0 = Math.floor(gy);
  const fx = gx - x0;
  const fy = gy - y0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const a = kohina(x0, y0, siemen);
  const b = kohina(x0 + 1, y0, siemen);
  const c = kohina(x0, y0 + 1, siemen);
  const d = kohina(x0 + 1, y0 + 1, siemen);
  return (a + (b - a) * sx) + ((c + (d - c) * sx) - (a + (b - a) * sx)) * sy;
}

/**
 * PILVIEN PAINO LEVEYSASTEELLA. Ilmakehä ei jaa pilviä tasan: niitä on
 * päiväntasaajan nousuvyöhykkeessä ja lauhkeissa matalapaineissa, ja
 * aavikkovyöhykkeessä (noin 25°) tuskin lainkaan. Tämä yksi käyrä tekee
 * kuvasta uskottavan — tasainen harso näyttäisi sumulta.
 */
export function pilvipaino(lat) {
  const a = Math.abs(Number(lat) || 0);
  const paiva = Math.exp(-((a - 4) ** 2) / 110);
  const lauhkea = Math.exp(-((a - 55) ** 2) / 320);
  return raja01(0.22 + 0.75 * paiva + 0.65 * lauhkea);
}

/**
 * MAAPEITON PURKU KERRAN. Maski on 720 × 360 ruutua; purku on halpa,
 * mutta sitä ei tehdä kahdesti samassa istunnossa.
 */
let peittoValimuisti = null;
export function maapeitto() {
  if (peittoValimuisti) return peittoValimuisti;
  const koko = MAAMASKI.leveys * MAAMASKI.korkeus;
  peittoValimuisti = puraPeitto(MAAMASKI.peitot, koko) ?? new Uint8Array(koko);
  return peittoValimuisti;
}

/** Maapeitto 0…1 asteina, bilineaarisesti maskin ruuduista. */
function peittoAsteilla(peitto, lat, lon) {
  const W = MAAMASKI.leveys;
  const H = MAAMASKI.korkeus;
  // Rivi 0 = 90°N…89,5°N, sarake 0 = 180°W…179,5°W (maskin oma sopimus).
  const fy = raja01((90 - lat) / 180) * H - 0.5;
  const fx = ((lon + 180) / 360) * W - 0.5;
  const y0 = Math.floor(fy);
  const x0 = Math.floor(fx);
  const ty = fy - y0;
  const tx = fx - x0;
  const nayte = (xi, yi) => {
    const y = yi < 0 ? 0 : (yi > H - 1 ? H - 1 : yi);
    const x = ((xi % W) + W) % W;
    return peitto[y * W + x] / 9;
  };
  const a = nayte(x0, y0);
  const b = nayte(x0 + 1, y0);
  const c = nayte(x0, y0 + 1);
  const d = nayte(x0 + 1, y0 + 1);
  return (a + (b - a) * tx) + ((c + (d - c) * tx) - (a + (b - a) * tx)) * ty;
}

/**
 * MAA AVARUUDESTA — tasavälinen (equirectangular) RGBA-kuva.
 *
 * PUHDAS FUNKTIO ilman canvasia, jotta yksikkötesti voi lukea sen
 * Nodessa (tests/satelliitti-avaruus.test.mjs mittaa meren ja maan
 * osuudet, napajään ja sen, ettei kuvassa ole läpinäkyviä pikseleitä).
 *
 * @returns {{ leveys: number, korkeus: number, data: Uint8ClampedArray }}
 */
export function maapallonVarit({
  leveys = TEKSTUURIN_LEVEYS, korkeus = TEKSTUURIN_KORKEUS, siemen = 20260912,
} = {}) {
  const W = Math.max(8, Math.round(leveys));
  const H = Math.max(4, Math.round(korkeus));
  const peitto = maapeitto();
  const data = new Uint8ClampedArray(W * H * 4);
  for (let y = 0; y < H; y += 1) {
    const lat = 90 - ((y + 0.5) / H) * 180;
    const maaVari = vyohykeVari(lat);
    const jaa = pehmea(JAAVYOHYKE[0], JAAVYOHYKE[1], Math.abs(lat));
    const pilvia = pilvipaino(lat);
    // Valon vastakaava: ks. VALON_KOMPENSAATIO.
    const valo = 1 + VALON_KOMPENSAATIO * Math.max(0, Math.sin((lat * Math.PI) / 180));
    for (let x = 0; x < W; x += 1) {
      const lon = -180 + ((x + 0.5) / W) * 360;
      const m = peittoAsteilla(peitto, lat, lon);
      // Meri: matalampi rannikolla (osittainen maapeitto = rantaruutu).
      const meri = sekoita(MERI_SYVA, MERI_MATALA, raja01(m * 2.2) * 0.6);
      // Maa: vyöhykeväri + karkea kohina, joka rikkoo tasaisen laikun.
      const k = sileaKohina(x, y, 9, siemen) - 0.5;
      const maa = [
        maaVari[0] + k * 26, maaVari[1] + k * 22, maaVari[2] + k * 16,
      ];
      let vari = sekoita(meri, maa, pehmea(0.18, 0.62, m));
      // Napajää viimeisenä: se peittää sekä maan että meren.
      if (jaa > 0) vari = sekoita(vari, JAAN_VARI, jaa);
      // Pilviharso: kaksi oktaavia, painotus leveysasteelta.
      const p = sileaKohina(x, y, 26, siemen + 11) * 0.65
        + sileaKohina(x, y, 11, siemen + 29) * 0.35;
      const pilvi = raja01((p - 0.52) * 3.1) * pilvia;
      if (pilvi > 0) vari = sekoita(vari, [246, 248, 252], pilvi * 0.72);
      const i = (y * W + x) * 4;
      data[i] = vari[0] / valo;
      data[i + 1] = vari[1] / valo;
      data[i + 2] = vari[2] / valo;
      data[i + 3] = 255;
    }
  }
  return { leveys: W, korkeus: H, data };
}

/**
 * Tekstuuri data-URLina selaimessa. Erillään maapallonVarit-funktiosta,
 * koska tämä tarvitsee canvasin — testit lukevat pikselit suoraan.
 */
export function maapallonTekstuuri(asetukset = {}, doc = globalThis.document) {
  const { leveys, korkeus, data } = maapallonVarit(asetukset);
  const kangas = doc?.createElement?.('canvas');
  const ctx = kangas?.getContext?.('2d');
  if (!ctx) return null;
  kangas.width = leveys;
  kangas.height = korkeus;
  ctx.putImageData(new globalThis.ImageData(data, leveys, korkeus), 0, 0);
  return kangas.toDataURL('image/png');
}

/* ═════════════════ 3. NÄKYMÄN ASENNUS JA PURKU ══════════════════ */

/** Avaruuden taustaväri (kangas pallon takana). */
export const AVARUUDEN_TAUSTA = '#04060e';
/** Ilmakehän hehku reunalla: astronautin näkemä sininen kaista. */
export const ILMAKEHAN_VARI = '#7fb6ff';
export const ILMAKEHAN_KORKEUS = 0.25;
/**
 * Tähtitaivaan venytys. Kerroin 1 on laudan oma taivas pallon lähellä
 * (korkeudet 2,6–6,5 pallonsädettä); avausnäkymässä kamera on
 * korkeudella 1,6–4,5, joten kaukaisin kerros siirretään selvästi
 * kameran taakse — muuten tähdet olisivat osin kameran edessä.
 */
export const TAHTIEN_KERROIN = 1.6;

/**
 * PELIN OMAT KARTTAPINNAT POIS LINSSIN AJAKSI.
 *
 * Pallon päällä on 1873-kartan pintoja, jotka avaruudesta katsottuna
 * ovat väärää tarinaa — ja MITATTU 12.9.2026: ilman tätä linssi avautui
 * tähtitaivaaseen, jonka keskellä oli paperikartta.
 *
 *   • LAATTAKERROS (js/pallolaatat.js luoLaattakerros): pelin oma
 *     pyramidikerros pallon pinnalla. TÄMÄ on se, joka piirtää kartan —
 *     ei Globe.gl:n oma laattamoottori, joka suljetaan erikseen.
 *   • LEPOKERROS (js/pallo.js luoLepokerros): terävä kuva levossa.
 *   • NAPAKANNET JA -KALOTIT (js/pallo.js): paperinsävyinen kansi ja
 *     atsimutaalinen karttakuva navoilla.
 *   • VEKTORIT (js/pallovektorit.js): rantaviiva ja VALTIONRAJAT.
 *     Rajoja ei näy avaruuteen.
 *
 * MIKSI TOISTUVA PYYHKÄISY EIKÄ KERTAKYTKIN. Laattakerros rakentaa
 * uusia verkkoja aina kun kamera liikkuu JA kirjoittaa niiden
 * näkyvyyden itse häivytyksessä, eikä siinä ole ulkoista kytkintä;
 * kytkimen lisääminen sinne muuttaisi PELIN pallon koodia linssin
 * takia. Sen sijaan linssi pyyhkäisee näyttämön joka kehyksellä ja
 * sulkee sen, mitä löytää — noin 150 oliota, mikrosekunteja, ja koko
 * tieto siitä mitä linssi tekee jää yhteen tiedostoon. Sulkeminen
 * puretaan tarkalleen: jokaisen olion lähtöarvo on muistissa.
 *
 * VEKTORIT SULJETAAN MATERIAALISTA: kerros jakaa materiaalin lajeittain
 * (rannikko, rajat), joten `material.visible = false` sulkee myös ne
 * oliot, joita ei vielä ole olemassa.
 */
function piilotaKarttapinnat(pallo, lauta, ikkuna = globalThis) {
  /*
   * KERROS SULJETAAN PIIRTOKERROKSISTA, EI `visible`-lipusta. Mitattu
   * 12.9.2026: laattakerros kirjoittaa omien verkkojensa `visible`-lipun
   * uudestaan OMASSA kehyskutsussaan, joka ajetaan linssin pyyhkäisyn
   * JÄLKEEN samalla kehyksellä — yksi karttapinta jäi näkyviin
   * puhelimella ja työpöydällä, vaikka pyyhkäisy ajoi joka kehys.
   * three.js:n `layers`-maski on eri kenttä, jota mikään pelin kerros ei
   * kirjoita: maski 0 tarkoittaa, ettei yksikään kamera näe oliota.
   * Lähtömaski (yleensä 1) on muistissa ja kirjoitetaan purkaessa takaisin.
   */
  const maskit = new Map();
  const materiaalit = new Map();
  let purettu = false;
  const piiloon = (olio) => {
    if (!olio?.layers) return;
    if (!maskit.has(olio)) maskit.set(olio, olio.layers.mask);
    olio.layers.mask = 0;
  };
  const suljeMateriaali = (m) => {
    if (!m) return;
    if (!materiaalit.has(m)) materiaalit.set(m, m.visible);
    m.visible = false;
  };
  let pyyhkaisyja = 0;
  const pyyhkaise = () => {
    if (purettu) return;
    pyyhkaisyja += 1;
    pallo.scene?.()?.traverse?.((o) => {
      const ud = o?.userData;
      if (!ud) return;
      if (ud.laattakerros || ud.lepokerros || ud.napakansi || ud.napakalotti) piiloon(o);
      if (ud.pallovektorit && o.material) suljeMateriaali(o.material);
    });
  };
  pyyhkaise();
  /*
   * PINTAKERROS SEIS. `lauta.lepokerros()` antaa pallon pintakerroksen
   * kahvan — laattakerroksen, kun se on päällä (oletus), ja vanhan
   * lepokerroksen kun se on sammutettu (js/pallo.js pallonLepokerros).
   * `lukitse` pysäyttää päivityksen, jolloin uusia karttaverkkoja ei
   * synny linssin aikana lainkaan; `piilota` vie pois sen, mitä on jo
   * koottu. Vanhassa lepokerroksessa ei ole lukkoa (se ei kokoa
   * yleiskuvassa lainkaan), ja `?.` hoitaa senkin tapauksen.
   */
  const pintakerros = lauta?.lepokerros?.() ?? null;
  pintakerros?.lukitse?.(true);
  pintakerros?.piilota?.();
  /*
   * PYYHKÄISY AJETAAN JOKA KEHYS (linssin oma kehyssilmukka kutsuu
   * tätä). Ajastin ei riitä: laattakerros luo verkon vasta kun sen
   * tekstuuri on ladattu, JA se kirjoittaa oman näkyvyytensä takaisin
   * päälle häivytyksessä — mitattu 12.9.2026 iPadilla, jossa 200 ms:n
   * ajastimen väliin ehti yksi näkyvä karttapinta. Pyyhkäisy on yhden
   * näyttämön läpikäynti (noin 150 oliota), eli murto-osa siitä, mitä
   * three.js tekee samalla kehyksellä.
   */
  return {
    /** Mittari savukkeelle: montako pintaa on suljettu. */
    maara: () => maskit.size + materiaalit.size,
    /** Mittari: montako kertaa näyttämö on käyty läpi. */
    kertoja: () => pyyhkaisyja,
    /** Yksi pyyhkäisy: kehyssilmukka kutsuu. */
    pyyhkaise,
    pura() {
      if (purettu) return;
      purettu = true;
      pintakerros?.lukitse?.(false);
      for (const [olio, maski] of maskit) olio.layers.mask = maski;
      for (const [m, nakyi] of materiaalit) m.visible = nakyi;
      maskit.clear();
      materiaalit.clear();
    },
  };
}

/**
 * AVARUUSNÄKYMÄ PÄÄLLE. Palauttaa kahvan, jonka `pura` kirjoittaa
 * pallon lähtötilan takaisin sellaisenaan.
 *
 * @param {object} lauta pallolauta (js/pallolauta/lauta.js)
 * @param {{ ui?: object, ikkuna?: object }} asetukset
 */
export function avaaAvaruusnakyma(lauta, { ui = null, ikkuna = globalThis } = {}) {
  const pallo = lauta?.pallo;
  const kotelo = lauta?.kotelo;
  if (!pallo?.pointOfView) return null;
  const reduced = Boolean(ui?.reducedMotion);

  /* ---- lähtötila talteen ------------------------------------------- */
  const lahto = {
    pov: { ...pallo.pointOfView() },
    tausta: pallo.backgroundColor?.(),
    ilmakehanVari: pallo.atmosphereColor?.(),
    ilmakehanKorkeus: pallo.atmosphereAltitude?.(),
    laattaUrl: pallo.globeTileEngineUrl?.(),
    kuvaUrl: pallo.globeImageUrl?.(),
  };

  /* ---- 1. pinta: generoitu Maa laattamoottorin tilalle -------------- */
  /*
   * LAATTAMOOTTORI ON SULJETTAVA, EI VAIN PEITETTÄVÄ. Globe.gl piirtää
   * joko laattaverkon TAI pohjapallon tekstuurilla — kirjaston oma rivi
   * on `tileEngine.visible = !(globeObj.visible = !globeTileEngineUrl)`.
   * Ilman moottorin sulkemista globeImageUrl ei näkyisi lainkaan.
   */
  let tekstuuri = null;
  try {
    tekstuuri = maapallonTekstuuri({}, ikkuna.document);
  } catch { tekstuuri = null; }
  if (tekstuuri) {
    pallo.globeTileEngineUrl(null);
    pallo.globeImageUrl(tekstuuri);
  }
  /*
   * KIILTO POIS. Pohjapallon materiaali on MeshPhongMaterial, jonka
   * specular on 0x111111 ja shininess 30 — paperikartalla se ei näy,
   * mutta vaalealla jäällä suoraan navan yläpuolella olevan valon alla
   * se lisää oman heijastuksensa jo valmiiksi kirkkaimpaan kohtaan.
   * Maa ei kiillä avaruuteen kuin peili, joten linssin ajaksi nolla.
   */
  const materiaali = pallo.globeMaterial?.();
  const kiiltoEnnen = materiaali
    ? { spec: materiaali.specular?.getHex?.(), shine: materiaali.shininess }
    : null;
  if (materiaali) {
    materiaali.specular?.setHex?.(0x000000);
    materiaali.shininess = 0;
    materiaali.needsUpdate = true;
  }
  pallo.backgroundColor?.(AVARUUDEN_TAUSTA);
  pallo.atmosphereColor?.(ILMAKEHAN_VARI);
  pallo.atmosphereAltitude?.(ILMAKEHAN_KORKEUS);
  const pinnat = piilotaKarttapinnat(pallo, lauta, ikkuna);
  // Luokka kertoo CSS:lle, että pisteitä on ruudulla koko pallon verran
  // (css/satelliitti.css: nimet pienemmällä). Poistetaan purkaessa.
  ikkuna.document?.body?.classList?.add?.('satelliitti-avaruus');

  /* ---- 2. tähdet ---------------------------------------------------- */
  const taivas = luoTahtitaivas(pallo, {
    reducedMotion: reduced, ikkuna, kerroin: TAHTIEN_KERROIN,
  });
  taivas?.paivita?.(0, 1);
  /*
   * LINSSIN OMA KEHYSSILMUKKA. Kaksi työtä samassa silmukassa: pölyn
   * hidas ajautuma (tarvitsee kehyskellon; liikkeenvähennyksellä dt
   * jätetään antamatta, jolloin taivas on liikkumaton) ja karttapintojen
   * pyyhkäisy (ks. piilotaKarttapinnat). Silmukka elää vain linssin
   * ajan, eikä pallon oma silmukka tiedä siitä mitään.
   */
  let kehys = 0;
  let edellinen = 0;
  const askel = (t) => {
    kehys = ikkuna.requestAnimationFrame?.(askel) ?? 0;
    pinnat.pyyhkaise();
    if (!taivas) return;
    const dt = reduced || !edellinen ? 0 : (t - edellinen) / 1000;
    edellinen = t;
    taivas.paivita(dt, 1);
  };
  kehys = ikkuna.requestAnimationFrame?.(askel) ?? 0;

  /* ---- 3. avausnäkymä ja 4. kapea zoom ------------------------------ */
  /*
   * MITTA LUETAAN UUDESTAAN, KUN KOTELO MUUTTUU (mitattu 12.9.2026).
   * Linssin oma yläpalkki korvaa Matkakirjan palkin, ja kotelo kasvaa
   * sen verran kuin palkkien korkeusero on — puhelimella 771 → 828 px.
   * Ensimmäinen mitta osuu siis vanhaan koteloon, ja avauskorkeudeksi
   * tuli 4,12 kun oikea luku on 4,49: pallo täytti 94 % ruudun
   * leveydestä, vaikka marginaaliksi pyydettiin 12 %. Sovitus ajetaan
   * siksi uudestaan jokaisesta kotelon koon muutoksesta — sama korjaa
   * myös laitteen kääntämisen linssin ollessa auki.
   */
  const avattu = Date.now();
  const mitat = { leveys: 0, korkeus: 0 };
  let alt = 0;
  let rajat = { min: 0, max: 0 };
  let omaKorkeus = 0;
  const sovita = () => {
    mitat.leveys = kotelo?.clientWidth ?? 0;
    mitat.korkeus = kotelo?.clientHeight ?? 0;
    const uusi = avausKorkeus(mitat);
    if (Math.abs(uusi - alt) < 0.001) return;
    alt = uusi;
    rajat = zoomirajat(alt);
    /*
     * ZOOMIRAJAT ENSIN, KAMERA VASTA SEN JÄLKEEN. OrbitControls rajaa
     * etäisyyden joka kehyksellä omilla min/maxDistance-luvuillaan
     * (js/pallolauta/lauta.js tahdistaZoomirajat), ja laudan katto
     * PALLO_KORKEUS_MAX 2,5 on puhelimen avauskorkeutta 4,5 pienempi:
     * ilman nostoa kamera vedettäisiin takaisin eikä pallo mahtuisi.
     */
    lauta?.zoomirajat?.({ min: rajat.min, max: rajat.max });
    /*
     * PELAAJAN OMA ZOOMI EI SAA HYPÄTÄ: kamera siirretään vain, jos se
     * on yhä siinä korkeudessa, johon linssi sen viimeksi vei. Jos
     * pelaaja on sen jälkeen nipistänyt, uusi mitta muuttaa vain rajat.
     *
     * AVAUKSEN AIKAIKKUNA on poikkeus: ensimmäiset ASETTUMISEN_IKKUNA_MS
     * ovat yläpalkin vaihtumista ja asettelua, ja silloin kamera on yhä
     * kesken avausajon — sen hetkinen korkeus ei kerro pelaajan
     * tahdosta mitään, eikä vertailu siihen kelpaa (mitattu 12.9.2026:
     * puhelin jäi korkeuteen 4,12, kun oikea oli 4,49).
     */
    const tuore = Date.now() - avattu < ASETTUMISEN_IKKUNA_MS;
    const nyt = pallo.pointOfView()?.altitude ?? 0;
    const omassa = tuore || !omaKorkeus || Math.abs(nyt - omaKorkeus) < omaKorkeus * 0.02;
    omaKorkeus = alt;
    if (!omassa) return;
    lauta?.kamera?.pysaytaKameraAjo?.();
    // Napa keskellä olisi outo avaus: pidetään pelaajan oma kohta, mutta
    // korkeintaan 55 asteessa, jotta pallo näyttää pallolta eikä kiekolta.
    const lat = Math.max(-55, Math.min(55, Number(pallo.pointOfView()?.lat) || 0));
    const lng = Number(pallo.pointOfView()?.lng) || 0;
    pallo.pointOfView({ lat, lng, altitude: alt }, reduced ? 0 : AVAUSAJON_MS);
    lauta?.heraa?.();
  };
  sovita();
  const kokovahti = kotelo && ikkuna.ResizeObserver ? new ikkuna.ResizeObserver(sovita) : null;
  kokovahti?.observe(kotelo);

  return {
    /** Mitatut luvut savukkeelle ja vartijoille. */
    tila: () => ({
      avauskorkeus: +alt.toFixed(3),
      halkaisijaPx: Math.round(halkaisijaRuudulla(alt, { korkeus: mitat.korkeus })),
      kotelo: { ...mitat },
      rajat,
      tahtia: taivas?.tila?.()?.pisteita ?? 0,
      tahtikerroksia: taivas?.tila?.()?.kerroksia ?? 0,
      piilotettuja: pinnat.maara(),
      pyyhkaisyja: pinnat.kertoja(),
      tekstuuri: Boolean(tekstuuri),
    }),
    pura() {
      kokovahti?.disconnect?.();
      if (kehys) ikkuna.cancelAnimationFrame?.(kehys);
      kehys = 0;
      taivas?.pura?.();
      pinnat.pura();
      ikkuna.document?.body?.classList?.remove?.('satelliitti-avaruus');
      lauta?.zoomirajat?.(null);
      if (tekstuuri) {
        /*
         * PINTA TAKAISIN TÄSMÄLLEEN: ensin laattamoottorin osoite (se
         * kytkee pohjapallon pois) ja vasta sitten pohjapallon oma
         * kuva-asetus lähtöarvoonsa. Toisessa järjestyksessä kirjasto
         * ehtisi ladata 1873-julisteen pohjapallolle turhaan.
         */
        pallo.globeTileEngineUrl(lahto.laattaUrl ?? null);
        pallo.globeImageUrl(lahto.kuvaUrl ?? null);
      }
      if (materiaali && kiiltoEnnen) {
        if (Number.isFinite(kiiltoEnnen.spec)) materiaali.specular?.setHex?.(kiiltoEnnen.spec);
        materiaali.shininess = kiiltoEnnen.shine;
        materiaali.needsUpdate = true;
      }
      pallo.backgroundColor?.(lahto.tausta ?? 'rgba(0,0,0,0)');
      pallo.atmosphereColor?.(lahto.ilmakehanVari ?? '#d9a13b');
      pallo.atmosphereAltitude?.(lahto.ilmakehanKorkeus ?? 0.18);
      /*
       * KAMERA PALAUTETAAN KOLMESTI. Pallon oma sormiliuku (js/pallo.js
       * asennaPallonEleet) jatkaa kirjoittamista `pointOfView`iin vielä
       * puoli sekuntia sormen irrottua, eikä sitä voi pysäyttää ulkoa
       * ilman koko elekuuntelijan purkua. Mitattu 12.9.2026 puhelimella:
       * kertapalautus jätti kameran 0,32° sivuun, kun pelaaja oli juuri
       * pyöräyttänyt palloa ennen sulkemista. Kaksi lisäkirjoitusta
       * liu'un keston yli naulaavat lähtöpaikan.
       */
      const palautaKamera = () => {
        lauta?.kamera?.pysaytaKameraAjo?.();
        pallo.pointOfView(lahto.pov, 0);
        lauta?.heraa?.();
      };
      palautaKamera();
      const loppu = Date.now() + LIUUN_NAULAUS_MS;
      const naulaa = () => {
        if (Date.now() > loppu) return;
        palautaKamera();
        ikkuna.requestAnimationFrame?.(naulaa);
      };
      ikkuna.requestAnimationFrame?.(naulaa);
    },
  };
}
