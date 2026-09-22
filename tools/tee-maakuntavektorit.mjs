/*
 * MAAKUNTAVEKTORIT — admin-1-alueet kolmioituna pallon vektoritasoksi.
 *
 *   node tools/tee-maakuntavektorit.mjs --ne=<ne_10m_admin_1_states_provinces.geojson>
 *        [--ulos=<kansio>] [--maat=CHE,DEU,…] [--versio=2026-09-22a]
 *        [--harvennus=0.004] [--maxsarma=1.5] [--nykyalueet=<kansio>] [--kuiva]
 *        [--taso=admin1|admin0]   admin0 = maapolygonit (ne_10m_admin_0_countries)
 *
 * OMISTAJAN TOIVE (maakuntalinssi, Karttasepän luovutus 21.9.2026 ilta,
 * kohta 4): karttatyökaluun nykyisten maakuntien VEKTORITASO — admin-1-
 * polygonit kolmioituna, väri kärkiattribuuttina, yksi piirtokutsu per
 * maa (pallovektorit-kerroksen tapaan), napautus = piste polygonissa
 * CPU:lla. Ei poltettua värilaattatasoa (+50 % laattatekstuureja, ei
 * osumaa). Tämä on OFFLINE-työkalu (erä M0): pelikoodin kytkentä (M1)
 * tehdään vasta, kun sulavuus on kuitattu.
 *
 * === LÄHDE JA RYHMITTELY ===========================================
 *
 * Natural Earth 10m admin_1_states_provinces (public domain), SAMA
 * ryhmittely kuin nimiötason nykyalueilla (docs/raportit/kaappaukset/
 * maakuntavedos-20260921/vedos4/tee-nykyalueet.mjs): ITA/ESP/FRA
 * `region`, GBR `geonunit`, muut `name`. Suomenkieliset nimet luetaan
 * --nykyalueet-kansion nykyalueet-<iso>.json-tiedostoista, kun ne
 * on; muuten NE:n `name`. Harvennus 0,004° = nimiötason rajaviivojen
 * harvennus, jotta vektoriraja kulkee poltetun rajan päällä.
 *
 * === KOLMIOINTI ====================================================
 *
 * Ei kirjastoa (repossa ei ole earcutia eikä d3-geo:ta): korvanleikkaus
 * (ear clipping) reikien silloituksella. Ulkorengas CCW, reiät CW;
 * reikä liitetään ulkorenkaaseen siltasärmällä sen itäisimmästä
 * pisteestä (Eberly: säde itään, lähin leikkaus, sitten lähin
 * näkyvä kärki), ja tuloksena oleva yksinkertainen monikulmio
 * leikataan korva kerrallaan. Jos numeriikka jumittaa (kolme pistettä
 * samalla suoralla), poistetaan litteimmän kulman kärki ja jatketaan
 * — pinta-alan vertailu (kolmioiden summa vs. renkaiden shoelace)
 * kirjataan mittoihin, ja tests/maakuntavektorit.test.mjs vaatii
 * eron alle 1e-9 synteettisillä monikulmioilla.
 *
 * === PITKÄT SÄRMÄT (--maxsarma) ====================================
 *
 * Pallon pinnalla litteä kolmio painuu pinnan alle: 5°:n jänne on
 * 6 km:n notko (R·(1−cos 2,5°)), ja suuri kolmio katoaisi laattojen
 * alle. Siksi särmät, jotka ovat pidempiä kuin --maxsarma astetta,
 * puolitetaan keskipisteestä. Puolitus tehdään GEOMETRISEN särmän
 * kaikkiin kolmioihin kerralla — myös naapurialueen kopioon (kärjet
 * on kahdennettu alueittain, koska väri on kärkiattribuutti) — jolloin
 * verkkoon ei jää T-liitoksia eikä rajalle rakoa. Silmukka päättyy,
 * koska särmät vain lyhenevät.
 *
 * === VÄRIT =========================================================
 *
 * Alueille lasketaan naapuruus jaetuista rajasärmistä ja ahne
 * väritys (suurin aste ensin): `vari` on 0…k−1 ja naapureilla eri
 * väri. Peli valitsee paletin; tyypillisesti k ≤ 5.
 *
 * === TIEDOSTOMUOTO <ISO>.bin (little-endian) =======================
 *
 *   char[4] 'MKV1'
 *   uint32  kärkiä K, uint32 kolmioita T, uint32 alueita A
 *   K × (float32 lon, float32 lat)          kärjet renkaittain; puolituksen
 *                                            keskipisteet loppuun
 *   K × uint16 alue                          kärjen alueen indeksi (väri)
 *   (täyte 4 tavuun)
 *   T × 3 × uint32                           kolmioiden kärki-indeksit
 *
 * <ISO>.json: alueet nimineen, väreineen, keskipisteineen, laatikoineen
 * (`saumassa: true`, kun alue ylittää päivämäärärajan) ja renkaiden
 * kärkiväleineen [alku, loppu, reikä] — osuma lasketaan SAMOISTA
 * kärjistä (piste renkaassa, reiät pois), joten piirto ja osuma eivät
 * voi eriytyä. luettelo.json: maat, tiedostot, koot ja tarkistukset
 * (koko maailma 50 kt); mitat.json: sama taulukkona.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

import { dp } from './tee-pallovektorit.mjs';

/** Sama harvennus kuin nimiötason rajaviivoilla (tee-nykyalueet.mjs). */
export const HARVENNUS = 0.004;
/** Särmän enimmäispituus asteina ennen puolitusta. */
export const MAXSARMA = 1.5;
/** Ämpärin kansio: versio polussa, sisältö vuoden välimuistissa. */
export const maakuntienKansio = (versio) => `julisteet/pallo/maakunnat/${versio}/`;

/**
 * Ilman --maat ohitettavat: Etelämantereella ei ole hallintoalueita, ja
 * napa-alueen puolitus paisuttaisi sen 12,6 Mt:n tiedostoksi (mitattu).
 */
export const OHITA = new Set(['ATA']);

/** Ryhmittely maittain — sama kuin nimiötason nykyalueilla. */
const RYHMA = {
  ITA: (p) => p.region, ESP: (p) => p.region, FRA: (p) => p.region, GBR: (p) => p.geonunit,
};
export const ryhmanTunnus = (iso, p) => (RYHMA[iso]?.(p) || p.name || p.adm1_code);

/*
 * ADMIN-0 SAMASTA PUTKESTA (Fable 22.9.2026: kerma tehdään GPU-
 * peittotasona, Pelikoodari tarvitsee maapolygonit kolmioituna per maa).
 * `--taso=admin0` lukee ne_10m_admin_0_countries: yksi alue per maa
 * (tunnus = ADM0_A3, nimi = NAME), muuten sama kolmiointi, puolitus ja
 * tiedostomuoto. NE:n admin-0-kentät ovat ISOLLA (ADM0_A3, NAME), admin-1:n
 * pienellä — `piirteenIso` lukee kummankin. HUOM: admin-0:n rannikko ei
 * ole sama viiva kuin laattoihin poltettu GSHHG-ranta (mitattu ocean-
 * aineistoa vastaan mediaani 72 m, maksimit yli 700 m, js/pallovektorit.js
 * osio KOROSTUSKEHÄ) — peittotason reuna on sovitettava sen mukaan.
 */
export const piirteenIso = (p) => p.adm0_a3 ?? p.ADM0_A3 ?? null;
export const maapolygonienKansio = (versio) => `julisteet/pallo/maapolygonit/${versio}/`;

/* ---------------- geometria ---------------------------------------- */

/** Renkaan etumerkillinen pinta-ala (shoelace, asteet²): CCW > 0. */
export function pintaAla(rengas) {
  let a = 0;
  for (let i = 0, n = rengas.length; i < n; i += 1) {
    const [x0, y0] = rengas[i]; const [x1, y1] = rengas[(i + 1) % n];
    a += x0 * y1 - x1 * y0;
  }
  return a / 2;
}

/**
 * Rengas kolmiointikuntoon: harvennus, peräkkäiset kaksoispisteet pois,
 * sulkupiste pois, alle kolmen pisteen tai nollapinta-alan rengas → null.
 */
export function siistiRengas(rengas, harvennus) {
  let p = rengas;
  if (p.length > 1 && p[0][0] === p[p.length - 1][0] && p[0][1] === p[p.length - 1][1]) {
    p = dp(p, harvennus);
    p = p.slice(0, -1);
  } else {
    p = dp(p, harvennus);
  }
  const ulos = [];
  for (const q of p) {
    const e = ulos[ulos.length - 1];
    if (e && e[0] === q[0] && e[1] === q[1]) continue;
    ulos.push([q[0], q[1]]);
  }
  while (ulos.length > 1 && ulos[0][0] === ulos[ulos.length - 1][0] && ulos[0][1] === ulos[ulos.length - 1][1]) ulos.pop();
  if (ulos.length < 3 || Math.abs(pintaAla(ulos)) < 1e-12) return null;
  return ulos;
}

const risti = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);

/** Piste kolmion sisällä tai reunalla (CCW-kolmio). */
function kolmiossa(a, b, c, p) {
  return risti(a, b, p) >= 0 && risti(b, c, p) >= 0 && risti(c, a, p) >= 0;
}

/**
 * Reiät silloitetaan ulkorenkaaseen (Eberly). Palauttaa yhden
 * yksinkertaisen monikulmion kärki-INDEKSEINÄ (indeksit viittaavat
 * `pisteet`-taulukkoon, jossa ulkorengas on ensin ja reiät perässä).
 *
 * @param {Array<[number, number]>} pisteet
 * @param {number[][]} renkaat indeksilistat: [0] ulko (CCW), loput reiät (CW)
 */
export function silloita(pisteet, renkaat) {
  let mono = renkaat[0].slice();
  const reiat = renkaat.slice(1).map((r) => {
    let paras = 0;
    for (let i = 1; i < r.length; i += 1) if (pisteet[r[i]][0] > pisteet[r[paras]][0]) paras = i;
    return { r, paras, x: pisteet[r[paras]][0] };
  }).sort((a, b) => b.x - a.x);
  for (const { r, paras } of reiat) {
    const M = pisteet[r[paras]];
    // 1) säde itään: lähin leikkaus monikulmion särmän kanssa
    let lahinX = Infinity; let lahinI = -1; let lahinPiste = null;
    for (let i = 0, n = mono.length; i < n; i += 1) {
      const A = pisteet[mono[i]]; const B = pisteet[mono[(i + 1) % n]];
      if ((A[1] > M[1]) === (B[1] > M[1])) continue;
      const x = A[0] + ((M[1] - A[1]) * (B[0] - A[0])) / (B[1] - A[1]);
      if (x >= M[0] && x < lahinX) {
        lahinX = x; lahinI = i; lahinPiste = [x, M[1]];
      }
    }
    if (lahinI < 0) {
      // Reikä ulkorenkaan ulkopuolella (datavirhe) — ohitetaan.
      continue;
    }
    // 2) särmän itäisempi pää P ehdokkaaksi; jos kolmiossa (M, I, P) on
    //    reflex-kärkiä, valitaan niistä pienimmän kulman kärki.
    const iA = lahinI; const iB = (lahinI + 1) % mono.length;
    let P = pisteet[mono[iA]][0] > pisteet[mono[iB]][0] ? iA : iB;
    if (pisteet[mono[P]][0] === lahinPiste[0] && pisteet[mono[P]][1] === lahinPiste[1]) {
      // Säde osui suoraan kärkeen.
    } else {
      const Pp = pisteet[mono[P]];
      let parasKulma = Infinity; let parasJ = -1;
      for (let j = 0, n = mono.length; j < n; j += 1) {
        if (j === P) continue;
        const q = pisteet[mono[j]];
        const e = pisteet[mono[(j + n - 1) % n]]; const f = pisteet[mono[(j + 1) % n]];
        if (risti(e, q, f) >= 0) continue; // ei reflex
        if (!kolmiossa(M, lahinPiste, Pp, q) && !kolmiossa(M, Pp, lahinPiste, q)) continue;
        const kulma = Math.abs(Math.atan2(q[1] - M[1], q[0] - M[0]));
        if (kulma < parasKulma) { parasKulma = kulma; parasJ = j; }
      }
      if (parasJ >= 0) P = parasJ;
    }
    // 3) liitos: mono[0..P], reikä kierrettynä parasista alkaen + paras, P
    const reika = [];
    for (let k = 0; k < r.length; k += 1) reika.push(r[(paras + k) % r.length]);
    reika.push(r[paras]);
    mono = [...mono.slice(0, P + 1), ...reika, ...mono.slice(P)];
  }
  return mono;
}

/**
 * Korvanleikkaus yksinkertaiselle CCW-monikulmiolle (indeksit `pisteet`-
 * taulukkoon). Palauttaa kolmiot indeksikolmikkoina.
 */
export function leikkaaKorvat(pisteet, mono) {
  const n0 = mono.length;
  const seur = new Int32Array(n0); const edel = new Int32Array(n0);
  for (let i = 0; i < n0; i += 1) { seur[i] = (i + 1) % n0; edel[i] = (i + n0 - 1) % n0; }
  const P = (i) => pisteet[mono[i]];
  const onReflex = (i) => risti(P(edel[i]), P(i), P(seur[i])) <= 0;
  const reflex = new Set();
  for (let i = 0; i < n0; i += 1) if (onReflex(i)) reflex.add(i);
  const kolmiot = [];
  let jaljella = n0; let i = 0; let kierros = 0;
  while (jaljella > 3) {
    const a = edel[i]; const b = i; const c = seur[i];
    let korva = false;
    if (!reflex.has(b) && risti(P(a), P(b), P(c)) > 0) {
      korva = true;
      for (const r of reflex) {
        if (r === a || r === b || r === c) continue;
        const q = P(r);
        // Sama piste kuin kärjessä (siltakopio) ei estä korvaa.
        if ((q[0] === P(a)[0] && q[1] === P(a)[1]) || (q[0] === P(c)[0] && q[1] === P(c)[1])) continue;
        if (kolmiossa(P(a), P(b), P(c), q)) { korva = false; break; }
      }
    }
    if (korva || kierros > jaljella) {
      if (korva) kolmiot.push([mono[a], mono[b], mono[c]]);
      // Muuten litteä/jumissa: kärki poistetaan ilman kolmiota.
      seur[a] = c; edel[c] = a; reflex.delete(b);
      for (const k of [a, c]) { if (onReflex(k)) reflex.add(k); else reflex.delete(k); }
      jaljella -= 1; kierros = 0; i = c;
      continue;
    }
    i = c; kierros += 1;
  }
  if (jaljella === 3) {
    const a = edel[i]; const c = seur[i];
    if (risti(P(a), P(i), P(c)) > 0) kolmiot.push([mono[a], mono[i], mono[c]]);
  }
  return kolmiot;
}

/**
 * Yksi polygoni (ulkorengas + reiät) kolmioiksi. Palauttaa kärjet ja
 * kolmiot paikallisin indeksein sekä renkaiden välit.
 */
export function kolmioiPolygoni(polygoni, harvennus = 0) {
  /*
   * Douglas–Peucker voi tehdä pienestä renkaasta rusetin (itseään
   * leikkaavan): Alaskan luoto 4 pisteellä, ala 1e-4 mutta kolmioita
   * 3e-4. Rusetti paljastuu kolmioiden ja renkaan alan erosta, jolloin
   * rengas harvennetaan uudelleen puolella toleranssilla, viimeksi
   * harventamatta.
   */
  for (let yritys = 0, tol = harvennus; yritys < 8; yritys += 1, tol = tol > 1e-5 ? tol / 2 : 0) {
    const tulos = kolmioiRenkaat(polygoni, tol);
    if (!tulos) return null;
    const kolmioAla = tulos.kolmiot.reduce((s, [a, b, c]) => s + risti(tulos.pisteet[a], tulos.pisteet[b], tulos.pisteet[c]) / 2, 0);
    tulos.alaEro = Math.abs(kolmioAla - tulos.ala) / Math.max(1e-9, Math.abs(tulos.ala));
    tulos.harvennus = tol;
    if (tulos.alaEro < 1e-6 || tol === 0) return tulos;
  }
  return null;
}

function kolmioiRenkaat(polygoni, harvennus) {
  const renkaat = [];
  const ulko = siistiRengas(polygoni[0], harvennus);
  if (!ulko) return null;
  if (pintaAla(ulko) < 0) ulko.reverse();
  renkaat.push(ulko);
  for (const r of polygoni.slice(1)) {
    const h = siistiRengas(r, harvennus);
    if (!h) continue;
    if (pintaAla(h) > 0) h.reverse();
    renkaat.push(h);
  }
  const pisteet = []; const indeksit = []; const valit = [];
  for (let k = 0; k < renkaat.length; k += 1) {
    const alku = pisteet.length;
    indeksit.push(renkaat[k].map((p) => pisteet.push(p) - 1));
    valit.push([alku, pisteet.length, k > 0 ? 1 : 0]);
  }
  const mono = silloita(pisteet, indeksit);
  // Nolla-alaiset korvat (kolme pistettä suoralla) pois: ne eivät piirrä mitään.
  const kolmiot = leikkaaKorvat(pisteet, mono).filter(([a, b, c]) => risti(pisteet[a], pisteet[b], pisteet[c]) > 0);
  const ala = renkaat.reduce((s, r) => s + pintaAla(r), 0);
  return { pisteet, kolmiot, valit, ala };
}

/* ---------------- särmien puolitus --------------------------------- */

const sarmaAvain = (p, q) => {
  const a = `${p[0]},${p[1]}`; const b = `${q[0]},${q[1]}`;
  return a < b ? `${a}|${b}` : `${b}|${a}`;
};

/**
 * Puolittaa kaikki yli `max`-asteen särmät keskipisteestä Rivaran
 * pisimmän särmän säännöllä: särmä halkaistaan vasta, kun se on
 * PISIN särmä jokaisessa sitä käyttävässä kolmiossa — muuten
 * naapurin pisin särmä halkaistaan ensin (LEPP-ketju). Ilman tätä
 * naapurin lyhyen sivun pakkopuolitus synnyttää yhä litteämpiä
 * kolmioita, joiden mediaanit ovat lähes yhtä pitkiä kuin sivut, ja
 * verkko räjähtää (mitattu: 4°:n neliö, max 1,2° → ei pääty).
 * Geometrisen särmän kaikki kolmiot halkaistaan kerralla — myös eri
 * alueen kopio — jotta verkkoon ei jää T-liitoksia. Muokkaa `maa`-oliota
 * paikallaan ja palauttaa halkaisujen määrän.
 *
 * @param {{ pisteet: number[][], alue: number[], kolmiot: (number[]|null)[] }} maa
 */
export function puolitaSarmat(maa, max) {
  const { pisteet, alue, kolmiot } = maa;
  const max2 = max * max;
  const pituus2 = (i, j) => {
    const dx = pisteet[i][0] - pisteet[j][0]; const dy = pisteet[i][1] - pisteet[j][1];
    return dx * dx + dy * dy;
  };
  const avain = (i, j) => sarmaAvain(pisteet[i], pisteet[j]);
  /** Kolmion pisin särmä: { e: sivun indeksi, key, l2 }. */
  const pisinSarma = (k) => {
    let e = 0; let l2 = -1;
    for (let s = 0; s < 3; s += 1) {
      const d = pituus2(k[s], k[(s + 1) % 3]);
      if (d > l2) { l2 = d; e = s; }
    }
    return { e, key: avain(k[e], k[(e + 1) % 3]), l2 };
  };
  // särmä → kolmioiden indeksit
  const sarmat = new Map();
  const lisaa = (t) => {
    for (let s = 0; s < 3; s += 1) {
      const key = avain(kolmiot[t][s], kolmiot[t][(s + 1) % 3]);
      if (!sarmat.has(key)) sarmat.set(key, new Set());
      sarmat.get(key).add(t);
    }
  };
  const poista = (t) => {
    for (let s = 0; s < 3; s += 1) sarmat.get(avain(kolmiot[t][s], kolmiot[t][(s + 1) % 3]))?.delete(t);
  };
  for (let t = 0; t < kolmiot.length; t += 1) lisaa(t);
  // keskipiste alueittain (sama koordinaatti, eri alue → eri kärki)
  const keskipisteet = new Map();
  const keskipiste = (i, j) => {
    const key = `${avain(i, j)}#${alue[i]}`;
    let k = keskipisteet.get(key);
    if (k === undefined) {
      k = pisteet.push([(pisteet[i][0] + pisteet[j][0]) / 2, (pisteet[i][1] + pisteet[j][1]) / 2]) - 1;
      alue.push(alue[i]);
      keskipisteet.set(key, k);
    }
    return k;
  };
  const jono = [];
  let halkaisuja = 0;
  /** Halkaisee särmän `key` kaikista kolmioistaan, kun se on niiden pisin. */
  const halkaise = (key, syvyys = 0) => {
    if (syvyys > 10000) throw new Error('puolitus: LEPP-ketju ei pääty');
    for (;;) {
      const omistajat = [...(sarmat.get(key) ?? [])].filter((t) => kolmiot[t]);
      if (!omistajat.length) return;
      // Onko särmä jokaisen omistajan pisin? Jos ei, naapurin pisin ensin.
      let odottaa = null;
      for (const t of omistajat) {
        const p = pisinSarma(kolmiot[t]);
        let l2 = -1;
        for (let s = 0; s < 3; s += 1) if (avain(kolmiot[t][s], kolmiot[t][(s + 1) % 3]) === key) l2 = pituus2(kolmiot[t][s], kolmiot[t][(s + 1) % 3]);
        if (p.key !== key && p.l2 > l2 * (1 + 1e-9)) { odottaa = p.key; break; }
      }
      if (odottaa) { halkaise(odottaa, syvyys + 1); continue; }
      for (const t of omistajat) {
        const k = kolmiot[t];
        let e = -1;
        for (let s = 0; s < 3; s += 1) if (avain(k[s], k[(s + 1) % 3]) === key) e = s;
        if (e < 0) continue;
        const a = k[e]; const b = k[(e + 1) % 3]; const c = k[(e + 2) % 3];
        const m = keskipiste(a, b);
        poista(t);
        kolmiot[t] = null;
        const t1 = kolmiot.push([a, m, c]) - 1;
        const t2 = kolmiot.push([m, b, c]) - 1;
        lisaa(t1); lisaa(t2); jono.push(t1, t2);
        halkaisuja += 1;
      }
      return;
    }
  };
  for (let t = 0; t < kolmiot.length; t += 1) jono.push(t);
  while (jono.length) {
    const t = jono.pop();
    if (!kolmiot[t]) continue;
    const p = pisinSarma(kolmiot[t]);
    if (p.l2 <= max2) continue;
    halkaise(p.key);
  }
  maa.kolmiot = kolmiot.filter(Boolean);
  return halkaisuja;
}

/* ---------------- väritys ------------------------------------------- */

/** Ahne väritys: suurin aste ensin, pienin vapaa väri. */
export function varita(naapurit) {
  const n = naapurit.length;
  const jarjestys = [...naapurit.keys()].sort((a, b) => naapurit[b].size - naapurit[a].size);
  const vari = new Array(n).fill(-1);
  for (const i of jarjestys) {
    const varatut = new Set();
    for (const j of naapurit[i]) if (vari[j] >= 0) varatut.add(vari[j]);
    let v = 0;
    while (varatut.has(v)) v += 1;
    vari[i] = v;
  }
  return vari;
}

/* ---------------- maa ------------------------------------------------ */

/**
 * Yhden maan alueet NE-piirteistä kolmioverkoksi.
 *
 * @param {object[]} piirteet NE-piirteet (adm0_a3 = iso)
 * @param {{ harvennus?: number, maxsarma?: number, nimet?: Record<string,string> }} asetukset
 */
export function kolmioiMaa(iso, piirteet, asetukset = {}) {
  const harvennus = asetukset.harvennus ?? HARVENNUS;
  const maxsarma = asetukset.maxsarma ?? MAXSARMA;
  const admin0 = asetukset.taso === 'admin0';
  const ryhmat = new Map();
  for (const f of piirteet) {
    const tunnus = admin0 ? iso : ryhmanTunnus(iso, f.properties);
    const nimi = admin0 ? (f.properties.NAME ?? f.properties.name ?? iso) : (RYHMA[iso] ? tunnus : f.properties.name);
    if (!ryhmat.has(tunnus)) ryhmat.set(tunnus, { tunnus, nimi, polygonit: [] });
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    ryhmat.get(tunnus).polygonit.push(...polys);
  }
  const maa = { pisteet: [], alue: [], kolmiot: [] };
  const alueet = [];
  let alaEro = 0; let uudelleen = 0;
  for (const r of ryhmat.values()) {
    const indeksi = alueet.length;
    const alue = {
      tunnus: r.tunnus, nimi: asetukset.nimet?.[r.tunnus] ?? r.nimi, vari: 0, renkaat: [],
      lon: 0, lat: 0, laatikko: [Infinity, Infinity, -Infinity, -Infinity],
    };
    let ala = 0; let cx = 0; let cy = 0;
    for (const poly of r.polygonit) {
      const k = kolmioiPolygoni(poly, harvennus);
      if (!k) continue;
      const alku = maa.pisteet.length;
      for (const p of k.pisteet) {
        maa.pisteet.push(p); maa.alue.push(indeksi);
        if (p[0] < alue.laatikko[0]) alue.laatikko[0] = p[0];
        if (p[1] < alue.laatikko[1]) alue.laatikko[1] = p[1];
        if (p[0] > alue.laatikko[2]) alue.laatikko[2] = p[0];
        if (p[1] > alue.laatikko[3]) alue.laatikko[3] = p[1];
      }
      for (const t of k.kolmiot) maa.kolmiot.push([t[0] + alku, t[1] + alku, t[2] + alku]);
      for (const [a, b, reika] of k.valit) alue.renkaat.push([a + alku, b + alku, reika]);
      alaEro = Math.max(alaEro, k.alaEro);
      if (k.harvennus !== harvennus) uudelleen += 1;
      // pinta-alapainotettu keskipiste ulkorenkaista
      const ulko = k.pisteet.slice(k.valit[0][0], k.valit[0][1]);
      const a = pintaAla(ulko);
      let x = 0; let y = 0;
      for (let i = 0, n = ulko.length; i < n; i += 1) {
        const f = ulko[i][0] * ulko[(i + 1) % n][1] - ulko[(i + 1) % n][0] * ulko[i][1];
        x += (ulko[i][0] + ulko[(i + 1) % n][0]) * f; y += (ulko[i][1] + ulko[(i + 1) % n][1]) * f;
      }
      if (a) { cx += x / 6; cy += y / 6; ala += a; }
    }
    if (!alue.renkaat.length) continue;
    alue.lon = Math.round((cx / ala) * 1e3) / 1e3; alue.lat = Math.round((cy / ala) * 1e3) / 1e3;
    alue.ala = Math.round(ala * 1e3) / 1e3;
    alue.laatikko = alue.laatikko.map((v) => Math.round(v * 1e3) / 1e3);
    // NE katkaisee päivämäärärajan ylittävät alueet (Tšukotka, Fidži)
    // ±180°:een: laatikko kattaa koko kierroksen, ja pelin osumatesti
    // kiertää pisteen sauman auki kuten pallovektorit-kerros.
    if (alue.laatikko[2] - alue.laatikko[0] > 180) {
      alue.saumassa = true;
      // Keskipiste kierretyllä pituusasteella (lon < 0 → +360), muuten se
      // osuisi keskelle Siperiaa.
      let A = 0; let X = 0; let Y = 0;
      for (const [alkuR, loppuR, reika] of alue.renkaat) {
        if (reika) continue;
        const r = maa.pisteet.slice(alkuR, loppuR).map(([x, y]) => [x < 0 ? x + 360 : x, y]);
        const a2 = pintaAla(r);
        let x = 0; let y = 0;
        for (let i = 0, n = r.length; i < n; i += 1) {
          const f = r[i][0] * r[(i + 1) % n][1] - r[(i + 1) % n][0] * r[i][1];
          x += (r[i][0] + r[(i + 1) % n][0]) * f; y += (r[i][1] + r[(i + 1) % n][1]) * f;
        }
        if (a2) { X += x / 6; Y += y / 6; A += a2; }
      }
      const lon = X / A;
      alue.lon = Math.round((lon > 180 ? lon - 360 : lon) * 1e3) / 1e3; alue.lat = Math.round((Y / A) * 1e3) / 1e3;
    }
    alueet.push(alue);
  }
  // Naapuruus jaetuista rajasärmistä (ennen puolitusta, renkaiden särmät).
  const sarmanAlueet = new Map();
  for (let i = 0; i < alueet.length; i += 1) {
    for (const [a, b] of alueet[i].renkaat) {
      for (let j = a; j < b; j += 1) {
        const key = sarmaAvain(maa.pisteet[j], maa.pisteet[j + 1 < b ? j + 1 : a]);
        if (!sarmanAlueet.has(key)) sarmanAlueet.set(key, new Set());
        sarmanAlueet.get(key).add(i);
      }
    }
  }
  const naapurit = alueet.map(() => new Set());
  for (const s of sarmanAlueet.values()) {
    if (s.size < 2) continue;
    for (const i of s) for (const j of s) if (i !== j) naapurit[i].add(j);
  }
  const varit = varita(naapurit);
  alueet.forEach((a, i) => { a.vari = varit[i]; a.naapureita = naapurit[i].size; });
  const kolmioitaEnnen = maa.kolmiot.length;
  const puolituksia = maxsarma > 0 ? puolitaSarmat(maa, maxsarma) : 0;
  // Puolitus voi jättää nolla-alaisen kolmion (keskipiste suoralla): pois.
  // Ala lasketaan float32-pyöristetyistä kärjistä, koska tiedosto on float32
  // ja peli näkisi muuten kääntyneen kolmion.
  const f32 = maa.pisteet.map(([x, y]) => [Math.fround(x), Math.fround(y)]);
  maa.kolmiot = maa.kolmiot.filter(([a, b, c]) => risti(f32[a], f32[b], f32[c]) > 0);
  return {
    iso, alueet, pisteet: maa.pisteet, alue: maa.alue, kolmiot: maa.kolmiot,
    mitat: {
      alueita: alueet.length, karkia: maa.pisteet.length, kolmioita: maa.kolmiot.length, kolmioitaEnnen,
      puolituksia, uudelleenHarvennettuja: uudelleen, alaEro: Number(alaEro.toExponential(2)), vareja: Math.max(...varit) + 1,
    },
  };
}

/* ---------------- tiedostomuoto -------------------------------------- */

/** Maan kolmioverkko MKV1-puskuriksi. */
export function koodaaMaa(maa) {
  const K = maa.pisteet.length; const T = maa.kolmiot.length;
  const alueTavut = Math.ceil((K * 2) / 4) * 4;
  const b = Buffer.alloc(16 + K * 8 + alueTavut + T * 12);
  b.write('MKV1', 0, 'latin1');
  b.writeUInt32LE(K, 4); b.writeUInt32LE(T, 8); b.writeUInt32LE(maa.alueet.length, 12);
  let o = 16;
  for (const [lon, lat] of maa.pisteet) { b.writeFloatLE(lon, o); b.writeFloatLE(lat, o + 4); o += 8; }
  for (const a of maa.alue) { b.writeUInt16LE(a, o); o += 2; }
  o = 16 + K * 8 + alueTavut;
  for (const [x, y, z] of maa.kolmiot) { b.writeUInt32LE(x, o); b.writeUInt32LE(y, o + 4); b.writeUInt32LE(z, o + 8); o += 12; }
  return b;
}

/** MKV1-puskuri takaisin kärjiksi, alueiksi ja kolmioiksi (pelin lukijan malli). */
export function puraMaa(puskuri) {
  const dv = new DataView(puskuri.buffer, puskuri.byteOffset, puskuri.byteLength);
  if (String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3)) !== 'MKV1') throw new Error('ei MKV1');
  const K = dv.getUint32(4, true); const T = dv.getUint32(8, true); const A = dv.getUint32(12, true);
  const paikat = new Float32Array(K * 2); const alue = new Uint16Array(K); const kolmiot = new Uint32Array(T * 3);
  let o = 16;
  for (let i = 0; i < K * 2; i += 1) { paikat[i] = dv.getFloat32(o, true); o += 4; }
  for (let i = 0; i < K; i += 1) { alue[i] = dv.getUint16(o, true); o += 2; }
  o = 16 + K * 8 + Math.ceil((K * 2) / 4) * 4;
  for (let i = 0; i < T * 3; i += 1) { kolmiot[i] = dv.getUint32(o, true); o += 4; }
  return { paikat, alue, kolmiot, alueita: A };
}

/** Piste alueessa: ulkorenkaissa parillinen/pariton, reiät vähentävät. */
export function pisteAlueessa(paikat, renkaat, lon, lat) {
  let sisalla = false;
  for (const [alku, loppu] of renkaat) {
    for (let i = alku, j = loppu - 1; i < loppu; j = i, i += 1) {
      const xi = paikat[i * 2]; const yi = paikat[i * 2 + 1];
      const xj = paikat[j * 2]; const yj = paikat[j * 2 + 1];
      if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) sisalla = !sisalla;
    }
  }
  return sisalla;
}

/* ---------------- ajo -------------------------------------------------- */

/**
 * Suomenkieliset nimet nykyalueet-*.json-tiedostoista (vedosten kansio):
 * iso → (tunnus → nimiFi). Tiedosto voi sisältää useita maita
 * (nykyalueet-fra-deu.json), joten avain luetaan riviltä.
 */
export function lueNimet(kansio) {
  const nimet = new Map();
  if (!kansio || !existsSync(kansio)) return nimet;
  for (const tiedosto of readdirSync(kansio)) {
    if (!/^nykyalueet-.*\.json$/.test(tiedosto)) continue;
    const alueet = JSON.parse(readFileSync(join(kansio, tiedosto), 'utf8')).alueet ?? [];
    for (const al of alueet) {
      if (!al.iso || !al.tunnus) continue;
      if (!nimet.has(al.iso)) nimet.set(al.iso, {});
      nimet.get(al.iso)[al.tunnus] = al.nimiFi ?? al.nimi;
    }
  }
  return nimet;
}

/**
 * @param {{ ne: string, ulos: string, versio: string, maat?: string[], harvennus?: number,
 *   maxsarma?: number, nykyalueet?: string, kuiva?: boolean, kerro?: (rivi: string) => void }} a
 */
export function teeMaakuntavektorit(a) {
  const kerro = a.kerro ?? (() => {});
  const ne = JSON.parse(readFileSync(a.ne, 'utf8'));
  const maittain = new Map();
  for (const f of ne.features) {
    const iso = piirteenIso(f.properties);
    if (!iso) continue;
    if (a.maat ? !a.maat.includes(iso) : OHITA.has(iso)) continue;
    if (!maittain.has(iso)) maittain.set(iso, []);
    maittain.get(iso).push(f);
  }
  const taso = a.taso === 'admin0' ? 'admin0' : 'admin1';
  const luettelo = {
    versio: a.versio, muoto: 'MKV1', taso,
    lahde: taso === 'admin0' ? 'Natural Earth 10m admin_0_countries (public domain)' : 'Natural Earth 10m admin_1_states_provinces (public domain)',
    harvennus: a.harvennus ?? HARVENNUS, maxsarma: a.maxsarma ?? MAXSARMA, maat: {},
  };
  const taulukko = [];
  const nimet = lueNimet(a.nykyalueet);
  if (!a.kuiva) mkdirSync(a.ulos, { recursive: true });
  for (const [iso, piirteet] of [...maittain.entries()].sort()) {
    const alku = Date.now();
    const maa = kolmioiMaa(iso, piirteet, { harvennus: luettelo.harvennus, maxsarma: luettelo.maxsarma, nimet: nimet.get(iso) ?? null, taso });
    const puskuri = koodaaMaa(maa);
    const gz = gzipSync(puskuri).length;
    const alueet = maa.alueet.map((x) => ({
      tunnus: x.tunnus, nimi: x.nimi, vari: x.vari, lon: x.lon, lat: x.lat, ala: x.ala,
      laatikko: x.laatikko, ...(x.saumassa ? { saumassa: true } : {}), renkaat: x.renkaat,
    }));
    const alueJson = JSON.stringify({ iso, versio: a.versio, alueet });
    if (!a.kuiva) {
      writeFileSync(join(a.ulos, `${iso}.bin`), puskuri);
      writeFileSync(join(a.ulos, `${iso}.json`), alueJson);
    }
    // Luettelo pysyy pienenä (koko maailma 50 kt): alueet nimineen ja
    // renkaineen ovat maan omassa <ISO>.json:issa, joka ladataan .bin:n kanssa.
    luettelo.maat[iso] = { tiedosto: `${iso}.bin`, alueet: `${iso}.json`, tavut: puskuri.length + alueJson.length, ...maa.mitat };
    const rivi = { iso, ...maa.mitat, kt: Math.round(puskuri.length / 1024), gzKt: Math.round(gz / 1024), ms: Date.now() - alku };
    taulukko.push(rivi);
    kerro(`${iso}: ${rivi.alueita} aluetta, ${rivi.karkia} kärkeä, ${rivi.kolmioita} kolmiota (puolituksia ${rivi.puolituksia}), ${rivi.kt} kt (gz ${rivi.gzKt}), ala-ero ${rivi.alaEro}, värejä ${rivi.vareja}, ${rivi.ms} ms`);
  }
  if (!a.kuiva) {
    writeFileSync(join(a.ulos, 'luettelo.json'), JSON.stringify(luettelo));
    writeFileSync(join(a.ulos, 'mitat.json'), JSON.stringify(taulukko, null, 1));
    writeFileSync(join(a.ulos, 'kansio.txt'), `${(taso === 'admin0' ? maapolygonienKansio : maakuntienKansio)(a.versio)}\n`);
  }
  return { luettelo, taulukko };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const arg = (nimi, oletus) => {
    const p = process.argv.find((x) => x.startsWith(`--${nimi}=`));
    return p ? p.slice(nimi.length + 3) : oletus;
  };
  const NE = arg('ne', null);
  if (!NE) {
    console.error('anna --ne=<ne_10m_admin_1_states_provinces.geojson>');
    process.exit(2);
  }
  const VERSIO = arg('versio', `${new Date().toISOString().slice(0, 10)}a`);
  const MAAT = arg('maat', null);
  const { taulukko } = teeMaakuntavektorit({
    ne: NE,
    ulos: arg('ulos', join('maakuntavektorit-ulos', VERSIO)),
    versio: VERSIO,
    maat: MAAT ? MAAT.split(',') : null,
    harvennus: Number(arg('harvennus', HARVENNUS)),
    maxsarma: Number(arg('maxsarma', MAXSARMA)),
    nykyalueet: arg('nykyalueet', null),
    taso: arg('taso', 'admin1'),
    kuiva: process.argv.includes('--kuiva'),
    kerro: (rivi) => console.log(rivi),
  });
  console.log(`versio ${VERSIO} → ${(arg('taso', 'admin1') === 'admin0' ? maapolygonienKansio : maakuntienKansio)(VERSIO)}`);
  console.table(taulukko);
}
