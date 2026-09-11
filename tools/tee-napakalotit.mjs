/*
 * NAPAKALOTIT — pohjoisnavan ja etelänavan oma kartta pallolle.
 *
 *   node tools/tee-napakalotit.mjs --ne=<kansio> [--ulos=<kansio>]
 *        [--versio=2026-09-11a] [--koko=2048] [--ylinaytto=2] [--kuiva]
 *        [--vain=pohjoinen|etela]
 *
 * === MIKSI TÄMÄ ON OLEMASSA =========================================
 *
 * OMISTAJA 11.9.2026, sanatarkasti: *"Maapallon ylä- ja alaosan voisi
 * piirtää oikeanlaiseksi. Siinä näkyy vielä se vanhan kartan teksti.
 * Pohjoisnavalta taas puuttuu kokonaan kartta ihan yläosasta.
 * Etelänavalta taas pitää piirtää vähän isompi alue."*
 *
 * Napaa ei voi laatoittaa millään tarkkuudella, koska molemmat
 * projektiot loppuvat kesken: Web Mercator 85,05°:een ja pelin juliste
 * jo 84,0° N:ään ja 61,47° S:ään. Se on projektion reikä, ei
 * tarkkuuskysymys — ja siksi navoille piirretään OMA kuva
 * ATSIMUTAALISESSA EKVIDISTANTISSA projektiossa, jossa napa on kuvan
 * keskipiste eikä reikää ole lainkaan. Peli kiinnittää kuvat
 * napakansien tilalle (js/pallo.js, NAPAKALOTIT).
 *
 * === SAMA AINEISTO JA SAMAT SÄVYT KUIN JULISTEELLA ==================
 *
 * Kalotti ei ole uusi kartta vaan sama kartta toisessa projektiossa,
 * joten jokainen luku tulee siitä samasta lähteestä kuin julisteen
 * laattapyramidilla (tools/fokuskartta/maailmapiirto.js, pikselipassi
 * "1-3. PINTA"):
 *
 *   paperi, rae, kuitu, laikut   tools/fokuskartta/piirto.js (PAPERI, KOHINA)
 *   meren syvyysporrastus        piirto.js lerpSyvyys
 *   hypsometria                  piirto.js ASTEIKKO + lerpVari
 *   rinnevarjo                   maastovarjo.js VALO, VARJON_VOIMA
 *   korkeus                      tools/korkeusaineisto/ (3', REPOSSA)
 *   maa vai meri, rantaviiva     Natural Earth ne_10m_ocean (haettava)
 *
 * MAA VAI MERI RATKAISTAAN VEKTORISTA, kuten julisteella: renkaat
 * kertovat MISSÄ maa on, korkeusruudukko vain KUINKA KORKEALLA se on
 * (maailmapiirto.js "VEKTORI ON AUKTORITEETTI"). Juliste tekee sen
 * juovapyyhkäisynä omille kuvariveilleen, koska Millerissä kuvarivi ON
 * leveyspiiri. Atsimutaalisessa kuvassa rivi ei ole leveyspiiri, joten
 * leikkaukset lasketaan omille LEVEYSPIIREILLEEN (leveyspiirien
 * leikkaukset) ja pikseli hakee lähimmän — askel on neljäsosa
 * kuvapikselistä, eli tarkempi kuin mitä kuvaan mahtuu.
 *
 * === MIKÄ ON TOISIN KUIN JULISTEELLA (ja miksi) =====================
 *
 * 1. RINNEVARJON ASKEL ON ISOTROOPPINEN. maastovarjo.js jakaa
 *    itä-länsi-erotuksen matkalla `2·d·M·cos(lat)`, joka kutistuu
 *    navalla nollaan: 89,95°:ssa kaksi näytettä olisivat ruudukon
 *    mitassa vastakkaisilla puolilla napaa ja jakaja 10 metriä. Tässä
 *    molemmat näyteparit otetaan GEODEETTISESTI saman matkan päästä
 *    (ruudukon väli 0,05° = 5566 m), jolloin kaava on sama myös
 *    navalla. Päiväntasaajalla ero on olematon (todistettu
 *    tests/napakalotit.test.mjs: sama valoisuus kuin varjostusPisteessa).
 *
 * 2. ETELÄMANTEREELLE JÄÄTÄYTE. Julisteen hypsometria (ASTEIKKO) maalaa
 *    2000-3500 metrin maan tummanruskeaksi, ja se on oikein vuorille —
 *    mutta Etelämanner on jäätä, ja sen ympärillä laatoissa on pelin
 *    oma napajään sävy (tee-pallolaatat.mjs JAA_SAVY). Ruskea kalotti
 *    keskellä vaaleaa jäätä olisi väärä kartta. Eteläkalotin maa saa
 *    siksi oman jääasteikkonsa (JAA_ASTEIKKO), joka alkaa täsmälleen
 *    laattojen jään sävystä ja vaalenee ylöspäin. Pohjoiskalotin maa
 *    (Grönlannin pohjoiskärki, Ellesmere, Huippuvuoret, Frans Joosefin
 *    maa) on julisteella laatoissa 80-84°:ssa, joten se piirretään
 *    julisteen omalla hypsometrialla — muuten liitos näkyisi.
 *
 * 3. EI TEKSTIÄ, EI KEHYSTÄ, EI KOMPASSIA. Kalotti on pinnoite eikä
 *    lehti: kaikki kalusteet kuuluvat arkille.
 *
 * 4. JÄRVIÄ EI PIIRRETÄ. Kummallakaan kalotilla ei ole yhtään
 *    ne_10m_lakes-järveä, joka olisi `jarvet`-kynnyksen (0,4°) kokoinen
 *    — pohjoiskalotti on merta ja jäätiköitä, eteläkalotti mannerjäätä.
 *
 * === REUNA HÄIVYTETÄÄN LÄPINÄKYVÄKSI ================================
 *
 * Kuvan uloin kehä liukuu alfalla nollaan (HAIVE_AST astetta), ja kuva
 * ulottuu tarkoituksella kauemmas kuin kansi, jonka se korvaa
 * (pohjoinen 80°, etelä 60°, kansi 83,7°). Näin liitos laattoihin ei
 * ole viiva vaan ristihäivytys, jonka alla on julisteen oma kartta.
 *
 * Tulos: <ulos>/pohjoinen.png, <ulos>/etela.png, <ulos>/kalotit.json ja
 * <ulos>/kansio.txt. Työnkulku .github/workflows/tee-napakalotit.yml vie
 * kansion polkuun julisteet/pallo/napakalotit/<versio>/.
 *
 * Kuvankäsittely on sharp-kirjastolla (työnkulku asentaa sen ajoon);
 * itse piirto on tämän tiedoston omaa pikselityötä, ei canvasia —
 * kalotti ei tarvitse Chromiumia.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { korkeusruudukko, meriRenkaat, rannikotRenkaista } from './fokuskartta/maailma.mjs';
import {
  ASTEIKKO, KOHINA, KOHINA2, PAPERI, fbm, lerpSyvyys, lerpVari,
} from './fokuskartta/piirto.js';
import { RANTATYYLI } from './fokuskartta/maailmapiirto.js';
import {
  M_PER_AST, VALO, bilineaarinenKorkeus, varjonVoimakkuus,
} from './fokuskartta/maastovarjo.js';
import { NAPAKALOTTI, kalotinAsteet } from '../js/pallo.js';

const TAMA = fileURLToPath(import.meta.url);
const RAD = Math.PI / 180;
/** Maapallon säde metreinä (sama pallo kuin muuallakin pelissä). */
export const MAAN_SADE = 6371000;
/** Korkeusruudukon väli asteina (tools/korkeusaineisto, 3 kaariminuuttia). */
export const RUUTU = 0.05;
/** Kuvan sivun pituus pikseleinä (potenssi kahdesta: mipmapit selaimessa). */
export const KOKO_OLETUS = 2048;
/** Ylinäytteistys: piirto tehdään tällä kertoimella ja kutistetaan. */
export const YLINAYTTO_OLETUS = 2;
/** Reunan häivytyskaistan leveys asteina. */
export const HAIVE_AST = 1.5;
/**
 * Paperin mittakaava. Sama valinta kuin laattapyramidilla (`paperiS: 1`):
 * painojälki on ULOSTULOPIKSELEISSÄ vakio, jolloin rantaviiva on
 * kalotilla saman levyinen kuin laatoissa eikä paksune kuvan koon
 * mukana.
 */
export const PAPERI_MITTA = 1;

/**
 * Etelämantereen jää. Alin sävy on täsmälleen se, jolla laatat
 * täyttävät napajään (tools/tee-pallolaatat.mjs JAA_SAVY 220,214,198),
 * jotta kalotin reuna ja laattojen täyte ovat samaa jäätä; ylöspäin
 * mannerjäätikkö vaalenee kuten vanhoissa kaiverruksissa.
 *
 * LUVUT OVAT VARJOSTUSTA ENNEN. Tasainen maa saa rinnevarjosta noin
 * 7,8 % lisää kirkkautta (varjonVoimakkuus tasaisella maalla −0,078),
 * ja Etelämantereen lakialue ON tasainen: asteikon ylin sävy 226 on
 * valmiissa kuvassa 244. Aiempi ylin sävy 244 leikkautui valkoiseksi,
 * ja koko mannerjäätikkö oli yhtä paperia ilman sävyeroa.
 */
export const JAA_ASTEIKKO = [
  { m: -30, v: [203, 197, 181] },
  { m: 0, v: [207, 201, 185] },
  { m: 1200, v: [213, 208, 194] },
  { m: 2600, v: [219, 215, 203] },
  { m: 4000, v: [226, 223, 214] },
];

/** Ämpärin kansio: versio on polussa, joten sisältö on vuoden välimuistissa. */
export const kalottienKansio = (versio) => `julisteet/pallo/napakalotit/${versio}/`;

/* ------------------------------------------------- geometriaa ------ */

/**
 * Piste, joka on `matka` metrin päässä pisteestä (lat, lon) suuntaan
 * `suunta` (astetta, 0 = pohjoinen, 90 = itä).
 *
 * NAPA EI OLE ERIKOISTAPAUS. Tavallinen `lon ± d/cos(lat)` räjähtää
 * navalla; tämä on iso ympyrä pallolla, ja navalla se antaa oikein sen
 * pisteen, joka on matkan päässä pitkin valittua meridiaania.
 */
export function siirraPinnalla(lat, lon, suunta, matka) {
  const d = matka / MAAN_SADE;
  const la = lat * RAD;
  const su = suunta * RAD;
  const la2 = Math.asin(Math.sin(la) * Math.cos(d) + Math.cos(la) * Math.sin(d) * Math.cos(su));
  const lo2 = lon * RAD + Math.atan2(
    Math.sin(su) * Math.sin(d) * Math.cos(la),
    Math.cos(d) - Math.sin(la) * Math.sin(la2),
  );
  return { lat: la2 / RAD, lon: ((((lo2 / RAD + 180) % 360) + 360) % 360) - 180 };
}

/**
 * Rinteen valoisuus 0…1 napa-alueella: sama valo ja sama liioittelu
 * kuin julisteella (maastovarjo.js VALO), mutta näyteparit otetaan
 * geodeettisesti saman matkan päästä idästä-lännestä ja pohjoisesta-
 * etelästä. Ks. tiedoston alku, kohta 1.
 *
 * @param {(lat:number, lon:number)=>number} korkeus metriä, NaN ulkona
 * @param {number} matka näytevälin puolikas metreinä
 */
export function napavarjostus(korkeus, lat, lon, matka) {
  const nayte = (suunta) => {
    const p = siirraPinnalla(lat, lon, suunta, matka);
    return korkeus(p.lat, p.lon);
  };
  const dzdx = (nayte(90) - nayte(270)) / (2 * matka);
  const dzdy = (nayte(0) - nayte(180)) / (2 * matka);
  // Sama neutraali 0,5 kuin moottorilla: ruudukon ulkopuoli ei ole
  // varjoa eikä valoa (maastovarjo.js).
  if (!Number.isFinite(dzdx) || !Number.isFinite(dzdy)) return 0.5;
  const z = VALO.liioittelu;
  const nx = -dzdx * z; const ny = -dzdy * z; const nz = 1;
  const len = Math.hypot(nx, ny, nz);
  const az = VALO.atsimuutti * RAD;
  const alt = VALO.korkeuskulma * RAD;
  const lx = Math.cos(alt) * Math.sin(az); const ly = Math.cos(alt) * Math.cos(az);
  const lz = Math.sin(alt);
  return Math.max(0, (nx * lx + ny * ly + nz * lz) / len);
}

/**
 * Kuvan alfan verho: 1 kuvan sisällä, 0 kehällä ja sen ulkopuolella.
 * Liuku on smoothstep, jotta liitos laattoihin ei näy rajana.
 *
 * @param {number} r etäisyys keskustasta (1 = kehä)
 * @param {number} haive häivytyskaistan leveys r:n yksiköissä
 */
export function reunanPeitto(r, haive) {
  if (r >= 1) return 0;
  if (r <= 1 - haive || haive <= 0) return 1;
  const t = (1 - r) / haive;
  return t * t * (3 - 2 * t);
}

/* --------------------------------------- meri leveyspiireittäin ---- */

/**
 * Meren monikulmion reunat leveysastekoreissa (1°), rajattuna
 * kalotin leveysasteisiin. Sama parillisuussääntö kuin julisteella:
 * säde lähtee pituusasteelta −180, joka on meren monikulmion
 * ULKOPUOLELLA (aineisto on leikattu ±180:een).
 */
export function meriIndeksi(renkaat, { lat0, lat1 }) {
  const xa = []; const ya = []; const xb = []; const yb = [];
  for (const r of renkaat) {
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const ay = r[j][1]; const by = r[i][1];
      // Vaakasuora reuna ei voi leikata leveyspiiriä.
      if (ay === by) continue;
      if (Math.max(ay, by) < lat0 || Math.min(ay, by) > lat1) continue;
      xa.push(r[j][0]); ya.push(ay); xb.push(r[i][0]); yb.push(by);
    }
  }
  const korit = new Map();
  for (let i = 0; i < ya.length; i += 1) {
    const a = Math.floor(Math.min(ya[i], yb[i]));
    const b = Math.floor(Math.max(ya[i], yb[i]));
    for (let c = a; c <= b; c += 1) {
      let l = korit.get(c);
      if (!l) { l = []; korit.set(c, l); }
      l.push(i);
    }
  }
  return {
    xa: Float64Array.from(xa),
    ya: Float64Array.from(ya),
    xb: Float64Array.from(xb),
    yb: Float64Array.from(yb),
    korit,
  };
}

/** Yhden leveyspiirin leikkauskohdat pituusasteina, nousevassa järjestyksessä. */
export function leveyspiirinLeikkaukset(indeksi, lat) {
  const lista = indeksi.korit.get(Math.floor(lat));
  if (!lista) return new Float64Array(0);
  const { xa, ya, xb, yb } = indeksi;
  const ulos = [];
  for (const i of lista) {
    if ((ya[i] > lat) === (yb[i] > lat)) continue;
    ulos.push(xa[i] + ((lat - ya[i]) / (yb[i] - ya[i])) * (xb[i] - xa[i]));
  }
  ulos.sort((a, b) => a - b);
  return Float64Array.from(ulos);
}

/** Onko piste meren alalla? Leikkaukset on laskettu tälle leveyspiirille. */
export function merenAlalla(leikkaukset, lon) {
  let lo = 0; let hi = leikkaukset.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (leikkaukset[mid] < lon) lo = mid + 1; else hi = mid;
  }
  return (lo & 1) === 1;
}

/**
 * Leveyspiirien leikkaukset valmiiksi taulukkoon: rivi `k` vastaa
 * leveysastetta lat0 + k·askel. Pikseli hakee lähimmän rivin, ja askel
 * on neljäsosa kuvapikselistä — tarkempi kuin mitä kuvaan mahtuu.
 */
export function leikkaustaulu(indeksi, { lat0, lat1, askel }) {
  const rivit = Math.max(2, Math.round((lat1 - lat0) / askel) + 1);
  const taulu = new Array(rivit);
  for (let k = 0; k < rivit; k += 1) {
    taulu[k] = leveyspiirinLeikkaukset(indeksi, lat0 + ((lat1 - lat0) * k) / (rivit - 1));
  }
  return { taulu, lat0, lat1, rivit };
}

/** Taulukon rivi leveysasteelle (lähin). */
export function taulunRivi(t, lat) {
  const k = Math.round(((lat - t.lat0) / (t.lat1 - t.lat0)) * (t.rivit - 1));
  return t.taulu[Math.min(t.rivit - 1, Math.max(0, k))];
}

/* ------------------------------------------------ viivan rasterointi */

/**
 * Janan peitto peittopuskuriin (0…255) pyöreällä kynällä.
 *
 * Peitto on pikselin keskipisteen etäisyys janasta: `leveys/2 + 0,5 −
 * etäisyys` rajattuna välille 0…1. Se on canvasin antialiasointia
 * yksinkertaisempi mutta samaa luokkaa — ja koko piirto tehdään
 * ylinäytteistettynä (YLINAYTTO), joten lopulliseen kuvaan tulee vielä
 * kutistuksen oma suodatus.
 *
 * Peitot YHDISTETÄÄN MAKSIMILLA eikä summalla: rantaviiva on yksi veto,
 * ja päällekkäiset janat (mutkat, kapeat salmet) tummuisivat summalla
 * kahdesti.
 */
export function piirraJana(peitto, N, x0, y0, x1, y1, leveys) {
  const s = leveys / 2 + 0.5;
  const minX = Math.max(0, Math.floor(Math.min(x0, x1) - s));
  const maxX = Math.min(N - 1, Math.ceil(Math.max(x0, x1) + s));
  const minY = Math.max(0, Math.floor(Math.min(y0, y1) - s));
  const maxY = Math.min(N - 1, Math.ceil(Math.max(y0, y1) + s));
  if (minX > maxX || minY > maxY) return;
  const dx = x1 - x0; const dy = y1 - y0;
  const pit2 = dx * dx + dy * dy;
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const px = x + 0.5 - x0; const py = y + 0.5 - y0;
      let t = pit2 > 0 ? (px * dx + py * dy) / pit2 : 0;
      t = Math.max(0, Math.min(1, t));
      const ex = px - t * dx; const ey = py - t * dy;
      const et = Math.hypot(ex, ey);
      const p = Math.max(0, Math.min(1, leveys / 2 + 0.5 - et));
      if (p <= 0) continue;
      const i = y * N + x;
      const v = Math.round(p * 255);
      if (v > peitto[i]) peitto[i] = v;
    }
  }
}

/* ------------------------------------------------------ piirto ----- */

/**
 * Yhden kalotin pikselit RGBA-puskurina ylinäytteistetyssä koossa.
 *
 * @returns {{ data: Uint8ClampedArray, N: number }}
 */
export function piirraKalotti({
  puoli, korkeus, indeksi, rannikot, koko = KOKO_OLETUS, ylinaytto = YLINAYTTO_OLETUS,
  jaatayte = false,
}) {
  const k = NAPAKALOTTI[puoli];
  const napa = k.merkki * 90;
  const span = Math.abs(napa - k.reuna);
  const N = koko * ylinaytto;
  const data = new Uint8ClampedArray(N * N * 4);
  const pohja = [
    parseInt(PAPERI.slice(1, 3), 16),
    parseInt(PAPERI.slice(3, 5), 16),
    parseInt(PAPERI.slice(5, 7), 16),
  ];
  const P = PAPERI_MITTA;
  const haive = HAIVE_AST / span;
  // Rinnevarjon näyteväli: ruudukon oma väli metreinä (ks. tiedoston alku).
  const askelM = RUUTU * M_PER_AST;
  const taulu = leikkaustaulu(indeksi, {
    lat0: Math.min(napa, k.reuna) - 0.2,
    lat1: Math.max(napa, k.reuna) + 0.2,
    askel: span / (koko / 2) / 4,
  });
  for (let iy = 0; iy < N; iy += 1) {
    for (let ix = 0; ix < N; ix += 1) {
      const i = (iy * N + ix) * 4;
      const a = kalotinAsteet(puoli, (ix + 0.5) / N, (iy + 0.5) / N);
      const peitto = reunanPeitto(a.r, haive);
      if (peitto <= 0) continue;
      // Kohina luetaan LOPULLISEN kuvan pikselistä: paperin rae on
      // paperin mitta, ei ylinäytteistyksen (piirto.js PAPERIVAKIOT).
      const gx = ix / ylinaytto; const gy = iy / ylinaytto;
      const kuitu = fbm(KOHINA, gx / (52 * P), gy / (7 * P), 3) - 0.5;
      const rae = KOHINA2(gx / (1.7 * P), gy / (1.7 * P)) - 0.5;
      const laikka = fbm(KOHINA2, gx / (260 * P), gy / (260 * P), 3) - 0.5;
      const v = kuitu * 9 + rae * 11 + laikka * 16;
      let r = pohja[0] + v * 1.05;
      let g = pohja[1] + v;
      let b = pohja[2] + v * 0.82;
      let m = korkeus(a.lat, a.lon);
      const vesi = merenAlalla(taulunRivi(taulu, a.lat), a.lon);
      if (vesi) {
        if (!Number.isFinite(m)) m = -900;
        const n = fbm(KOHINA, gx / (30 * P), gy / (30 * P), 4) - 0.5;
        const s = lerpSyvyys(m + n * Math.min(150, Math.max(12, -m * 1.25)));
        const o = 0.5;
        r = r * (1 - o) + s[0] * o;
        g = g * (1 - o) + s[1] * o;
        b = b * (1 - o) + s[2] * o;
      } else {
        if (!Number.isFinite(m)) m = 60;
        const n1 = fbm(KOHINA, gx / (26 * P), gy / (26 * P), 4) - 0.5;
        const n2 = fbm(KOHINA2, gx / (7 * P), gy / (7 * P), 3) - 0.5;
        /*
         * JÄÄTÄYTTEELLÄ KOHINA ON MALTILLISEMPI. Julisteen ±190 metrin
         * kohina on hypsometrian portaille, jotka ovat satoja metrejä
         * leveitä; jään asteikko on loivempi, ja täydellä kohinalla
         * mannerjäätikkö olisi laikukas eikä sileä.
         */
        const kohinaM = jaatayte ? 60 : 190;
        const kohinaM2 = jaatayte ? 20 : 60;
        const c = jaatayte
          ? lerpVari(JAA_ASTEIKKO, Math.max(-30, m + n1 * kohinaM + n2 * kohinaM2))
          : lerpVari(ASTEIKKO, Math.max(0, m + n1 * kohinaM + n2 * kohinaM2));
        const varjo = varjonVoimakkuus(napavarjostus(korkeus, a.lat, a.lon, askelM));
        const pigmentti = (KOHINA2(gx / (2.1 * P), gy / (2.1 * P)) - 0.5) * 13;
        const lai = (fbm(KOHINA, gx / (95 * P), gy / (95 * P), 3) - 0.5) * 12;
        const t = (kanava) => kanava * (1 - varjo) + pigmentti + lai + (varjo > 0 ? 0 : varjo * 30);
        r = t(c[0]);
        g = t(c[1] * (1 - varjo * 0.12));
        b = t(c[2] * (1 - varjo * 0.3));
      }
      data[i] = r; data[i + 1] = g; data[i + 2] = b; data[i + 3] = Math.round(peitto * 255);
    }
  }

  /*
   * RANNIKKO: kaksi vetoa kuten julisteella (maailmapiirto.js
   * RANTATYYLI) — kostea leveä reuna ja sen päällä kynä. Leveydet ovat
   * paperivakioita, joten ne kerrotaan ylinäytteistyksellä.
   */
  const usva = new Uint8Array(N * N);
  const muste = new Uint8Array(N * N);
  for (const viiva of rannikot) {
    let edellinen = null;
    for (const [lon, lat] of viiva) {
      const p = kalotinKuvaan(puoli, lat, lon, N);
      if (edellinen && (edellinen.r < 1.15 || p.r < 1.15)) {
        piirraJana(usva, N, edellinen.x, edellinen.y, p.x, p.y, RANTATYYLI.usva.leveys * P * ylinaytto);
        piirraJana(muste, N, edellinen.x, edellinen.y, p.x, p.y, RANTATYYLI.muste.leveys * P * ylinaytto);
      }
      edellinen = p;
    }
  }
  const sekoita = (peittoTaulu, vari, alfa) => {
    for (let i = 0; i < N * N; i += 1) {
      const c = peittoTaulu[i];
      if (!c) continue;
      const t = (c / 255) * alfa;
      const o = i * 4;
      if (data[o + 3] === 0) continue;
      data[o] = data[o] * (1 - t) + vari[0] * t;
      data[o + 1] = data[o + 1] * (1 - t) + vari[1] * t;
      data[o + 2] = data[o + 2] * (1 - t) + vari[2] * t;
    }
  };
  sekoita(usva, [74, 52, 33], 0.18);
  sekoita(muste, [58, 40, 25], 0.85);
  return { data, N };
}

/** Kalotin kuvapiste PIKSELEINÄ (kalotinKuvapiste kuvan kokoon skaalattuna). */
export function kalotinKuvaan(puoli, lat, lon, N) {
  const k = NAPAKALOTTI[puoli];
  const napa = k.merkki * 90;
  const r = (napa - lat) / (napa - k.reuna);
  const kulma = (k.merkki > 0 ? -lon : lon) * RAD;
  return {
    x: (0.5 + 0.5 * r * Math.sin(kulma)) * N,
    y: (0.5 - 0.5 * r * Math.cos(kulma)) * N,
    r,
  };
}

/* -------------------------------------------------------- ajo ------ */

/** Kalotin aineisto: korkeusnäytteenotin, merireunat ja rantaviivat. */
export async function keraaKalotti({ puoli, neKansio, renkaat, hiljaa = false }) {
  const k = NAPAKALOTTI[puoli];
  const napa = k.merkki * 90;
  // Reilu marginaali kuvan ulkopuolelle: rinnevarjo ottaa näytteitä
  // ruudukon välin päästä ja rantaviiva jatkuu kuvan reunan yli.
  const lat0 = Math.min(napa, k.reuna) - 2;
  const lat1 = Math.max(napa, k.reuna) + 2;
  const laatikko = {
    lon0: -180, lon1: 180, lat0: Math.max(-90, lat0), lat1: Math.min(90, lat1),
  };
  const K = await korkeusruudukko({ laatikko, ruutu: RUUTU, hiljaa });
  const ruudukko = {
    grid: K.grid,
    w: K.w,
    h: K.h,
    lon0: K.lon0,
    lat1: K.lat1,
    dlon: (K.lon1 - K.lon0) / (K.w - 1),
    dlat: (K.lat1 - K.lat0) / (K.h - 1),
  };
  const korkeus = (lat, lon) => bilineaarinenKorkeus(
    ruudukko, ((((lon + 180) % 360) + 360) % 360) - 180, lat,
  );
  const indeksi = meriIndeksi(renkaat, { lat0: laatikko.lat0, lat1: laatikko.lat1 });
  const rannikot = rannikotRenkaista(renkaat, { laatikko });
  return {
    korkeus, indeksi, rannikot, ruudukko, lahteet: K.lahteet, neKansio,
  };
}

async function paa() {
  const argv = process.argv.slice(2);
  const lippu = (nimi) => {
    const oma = argv.find((a) => a.startsWith(`${nimi}=`));
    if (oma) return oma.slice(nimi.length + 1);
    const i = argv.indexOf(nimi);
    return i >= 0 ? argv[i + 1] : null;
  };
  const kuiva = argv.includes('--kuiva');
  const neKansio = lippu('--ne') ?? 'ne-data';
  const ulos = lippu('--ulos') ?? 'napakalotit-ulos';
  const koko = Number(lippu('--koko') ?? KOKO_OLETUS);
  const ylinaytto = Number(lippu('--ylinaytto') ?? YLINAYTTO_OLETUS);
  const vain = lippu('--vain');
  const versio = lippu('--versio') || `${new Date().toISOString().slice(0, 10)}a`;
  const puolet = (vain ? [vain] : ['pohjoinen', 'etela']).filter((p) => NAPAKALOTTI[p]);
  if (!puolet.length) throw new Error(`--vain: pohjoinen tai etela (${vain})`);
  console.log(`napakalotit ${versio}: ${puolet.join(', ')}, ${koko} px `
    + `(piirto ${koko * ylinaytto} px), reunat `
    + `${puolet.map((p) => `${p} ${NAPAKALOTTI[p].reuna}°`).join(', ')} → ${kalottienKansio(versio)}`);
  if (kuiva) { console.log('Kuiva ajo: ei lueta aineistoa eikä kirjoiteta.'); return; }

  const sharp = (await import('sharp')).default;
  console.log('luetaan Natural Earthin meren ala…');
  const renkaat = meriRenkaat(neKansio);
  console.log(`  ${renkaat.length} rengasta`);
  mkdirSync(ulos, { recursive: true });
  const tiedot = [];
  for (const puoli of puolet) {
    const alkoi = Date.now();
    const aineisto = await keraaKalotti({ puoli, neKansio, renkaat });
    const { data, N } = piirraKalotti({
      puoli,
      korkeus: aineisto.korkeus,
      indeksi: aineisto.indeksi,
      rannikot: aineisto.rannikot,
      koko,
      ylinaytto,
      jaatayte: puoli === 'etela',
    });
    const polku = join(ulos, `${puoli}.png`);
    await sharp(Buffer.from(data.buffer, data.byteOffset, data.byteLength), {
      raw: { width: N, height: N, channels: 4 },
    })
      .resize(koko, koko, { kernel: 'lanczos3' })
      .png({ compressionLevel: 9 })
      .toFile(polku);
    const s = Math.round((Date.now() - alkoi) / 1000);
    console.log(`${puoli}: ${polku} (${koko}×${koko}, rantaviivoja `
      + `${aineisto.rannikot.length}, ${s} s)`);
    tiedot.push({
      puoli, reuna: NAPAKALOTTI[puoli].reuna, koko, tiedosto: `${puoli}.png`,
    });
  }
  writeFileSync(join(ulos, 'kalotit.json'), `${JSON.stringify({
    versio,
    projektio: 'atsimutaalinen ekvidistantti, napa keskellä, 0° ylös',
    haiveAst: HAIVE_AST,
    ylinaytto,
    kalotit: tiedot,
    lahteet: [
      'NOAA NGDC ETOPO1 Global Relief (Amante & Eakins 2009) — public domain',
      'Natural Earth 10m ne_10m_ocean (Kelso & Patterson) — public domain',
    ],
    tehty: new Date().toISOString(),
  }, null, 1)}\n`);
  writeFileSync(join(ulos, 'kansio.txt'), `${kalottienKansio(versio)}\n`);
  console.log(`kirjoitettu kansioon ${ulos}; ämpärin kansio: ${kalottienKansio(versio)}`);
}

if (process.argv[1] === TAMA) {
  paa().catch((e) => { console.error(e.stack ?? e.message ?? e); process.exit(1); });
}
