/*
 * IHMISEN MATKA VÄRIVIRTOINA — LASKENNAN YDIN (puhdas moduuli).
 *
 * Omistajan linjaus 6.9.2026 (Raamattu, IHMISEN MATKA ON VARIVIRTOJA,
 * EI PISTEITA): leviäminen näytetään maata pitkin laajenevina
 * värialueina puolen asteen ruudukossa; saapumisaika lasketaan
 * maamaskilla, meri estää paitsi nimetyissä ylityksissä. Miten-osa:
 * docs/moduulit/ihmisen-matka-virrat.md luvut 3, 5 ja 11.
 *
 * Tässä tiedostossa EI ole DOM:ia, three.js:ää eikä pelin tilaa: kaikki
 * on typed-array-laskentaa, joka ajaa samalla tavalla Nodessa
 * (tests/aikajana-virrat.test.mjs, tools/tee-maamaski.mjs) ja
 * selaimessa (js/aikajana-virrat.js piirtää tuloksen pallolle).
 *
 * ── RUUDUKKO ───────────────────────────────────────────────────────
 *
 * 720 × 360 ruutua, rivi 0 pohjoisin (90°N…89,5°N), sarake 0 läntisin
 * (180°W…179,5°W) — sama järjestys kuin tasavälisessä pallotekstuurissa,
 * joten sama puskuri on suoraan pallon kalvo. Ruudun indeksi on
 * rivi × 720 + sarake.
 *
 * ── AIKA ───────────────────────────────────────────────────────────
 *
 * Kaikki ajat ovat VUOSIA SITTEN (300 000 = kaaren alku). Dijkstra
 * tarvitsee kasvavan avaimen, joten kentässä kuljetetaan τ = −vuosia
 * sitten; ulos annetaan aina vuosia sitten. HUOMIO: keon avaimen on
 * oltava sama Float32-pyöristetty arvo kuin kentän, muuten
 * `t > tau[u]` hylkää puolet avauksista (suunnitelman luku 5.2).
 */

export const RUUDUKON_LEVEYS = 720;
export const RUUDUKON_KORKEUS = 360;
/** Ruudun sivu asteina. */
export const RUUDUN_ASTE = 0.5;
/** Leveysasteen pituus kilometreinä (sama vakio kuin js/fokusmitat.js). */
export const KM_ASTEELLA = 111.32;

const RAD = Math.PI / 180;

/* ------------------------------------------------------------ ruudut */

/** Ruudun indeksi asteista (lat 90…−90, lon −180…180; lon kiertää). */
export function ruutu(lat, lon, leveys = RUUDUKON_LEVEYS, korkeus = RUUDUKON_KORKEUS) {
  let l = lon;
  while (l < -180) l += 360;
  while (l >= 180) l -= 360;
  const rivi = Math.min(korkeus - 1, Math.max(0, Math.floor((90 - lat) / RUUDUN_ASTE)));
  const sarake = Math.min(leveys - 1, Math.max(0, Math.floor((l + 180) / RUUDUN_ASTE)));
  return rivi * leveys + sarake;
}

/** Ruudun keskipiste asteina. */
export function ruudunKeskus(i, leveys = RUUDUKON_LEVEYS) {
  const rivi = Math.floor(i / leveys);
  const sarake = i - rivi * leveys;
  return { lat: 90 - (rivi + 0.5) * RUUDUN_ASTE, lon: -180 + (sarake + 0.5) * RUUDUN_ASTE };
}

/** Pituusaste ruudukon [−180, 180) -välille. */
export function kierraLon(lon) {
  let l = lon;
  while (l < -180) l += 360;
  while (l >= 180) l -= 360;
  return l;
}

/* ---------------------------------------------------------- maamaski */

/**
 * Maski rivijuoksuina: vuorotellen meri- ja maajuoksun pituus
 * (ensimmäinen on meri, mahdollisesti 0), varint-tavuina base64:nä.
 * 6 kt riittää koko maapallolle (mitattu suunnitelman kokeessa).
 */
export function pakkaaMaamaski(maa) {
  const tavut = [];
  const varint = (n) => {
    let v = n;
    while (v >= 0x80) { tavut.push((v & 0x7f) | 0x80); v >>>= 7; }
    tavut.push(v);
  };
  let nykyinen = 0;
  let pituus = 0;
  for (let i = 0; i < maa.length; i += 1) {
    const arvo = maa[i] ? 1 : 0;
    if (arvo === nykyinen) { pituus += 1; continue; }
    varint(pituus);
    nykyinen = arvo;
    pituus = 1;
  }
  varint(pituus);
  return tavuistaBase64(tavut);
}

/** Maski takaisin Uint8Arrayksi (1 = maa). */
export function puraMaamaski(juoksut, koko = RUUDUKON_LEVEYS * RUUDUKON_KORKEUS) {
  const tavut = base64Tavuiksi(juoksut);
  const maa = new Uint8Array(koko);
  let i = 0;
  let arvo = 0;
  let paikka = 0;
  while (paikka < tavut.length && i < koko) {
    let n = 0;
    let siirto = 0;
    let tavu;
    do {
      tavu = tavut[paikka];
      paikka += 1;
      n |= (tavu & 0x7f) << siirto;
      siirto += 7;
    } while (tavu & 0x80);
    if (arvo) maa.fill(1, i, Math.min(koko, i + n));
    i += n;
    arvo ^= 1;
  }
  return maa;
}

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function tavuistaBase64(tavut) {
  let ulos = '';
  for (let i = 0; i < tavut.length; i += 3) {
    const a = tavut[i];
    const b = tavut[i + 1];
    const c = tavut[i + 2];
    const n = (a << 16) | ((b ?? 0) << 8) | (c ?? 0);
    ulos += B64[(n >> 18) & 63] + B64[(n >> 12) & 63]
      + (b === undefined ? '=' : B64[(n >> 6) & 63])
      + (c === undefined ? '=' : B64[n & 63]);
  }
  return ulos;
}

function base64Tavuiksi(teksti) {
  const puhdas = teksti.replace(/[^A-Za-z0-9+/]/g, '');
  const ulos = [];
  for (let i = 0; i < puhdas.length; i += 4) {
    const n = (B64.indexOf(puhdas[i]) << 18) | (B64.indexOf(puhdas[i + 1]) << 12)
      | ((B64.indexOf(puhdas[i + 2]) & 63) << 6) | (B64.indexOf(puhdas[i + 3]) & 63);
    ulos.push((n >> 16) & 255);
    if (puhdas[i + 2] !== undefined) ulos.push((n >> 8) & 255);
    if (puhdas[i + 3] !== undefined) ulos.push(n & 255);
  }
  return ulos;
}

/**
 * Rannikkomaski: maaruutu, jolla on meri naapurina (4-naapurusto,
 * pituussuunnassa kiertäen). Rannikkoruutu leviää täydellä nopeudella,
 * sisämaa `sisamaa`-kertoimella — tämä yksi luku antaa rannikkoreitin
 * ilman jokia tai maastoa.
 */
export function rannikkoMaski(maa, leveys = RUUDUKON_LEVEYS, korkeus = RUUDUKON_KORKEUS) {
  const ulos = new Uint8Array(maa.length);
  for (let r = 0; r < korkeus; r += 1) {
    for (let c = 0; c < leveys; c += 1) {
      const i = r * leveys + c;
      if (!maa[i]) continue;
      const vas = r * leveys + ((c + leveys - 1) % leveys);
      const oik = r * leveys + ((c + 1) % leveys);
      const yla = r > 0 ? i - leveys : -1;
      const ala = r < korkeus - 1 ? i + leveys : -1;
      if (!maa[vas] || !maa[oik] || (yla >= 0 && !maa[yla]) || (ala >= 0 && !maa[ala])) ulos[i] = 1;
    }
  }
  return ulos;
}

/** Yhtenäiset maa-alueet (8-naapurusto): { tunnus: Int32Array, koot }. */
export function maaKomponentit(maa, leveys = RUUDUKON_LEVEYS, korkeus = RUUDUKON_KORKEUS) {
  const tunnus = new Int32Array(maa.length).fill(-1);
  const koot = [];
  const pino = new Int32Array(maa.length);
  for (let alku = 0; alku < maa.length; alku += 1) {
    if (!maa[alku] || tunnus[alku] >= 0) continue;
    const id = koot.length;
    let koko = 0;
    let p = 0;
    pino[p++] = alku;
    tunnus[alku] = id;
    while (p > 0) {
      const i = pino[--p];
      koko += 1;
      const r = Math.floor(i / leveys);
      const c = i - r * leveys;
      for (let dr = -1; dr <= 1; dr += 1) {
        const rr = r + dr;
        if (rr < 0 || rr >= korkeus) continue;
        for (let dc = -1; dc <= 1; dc += 1) {
          if (!dr && !dc) continue;
          const j = rr * leveys + ((c + dc + leveys) % leveys);
          if (maa[j] && tunnus[j] < 0) { tunnus[j] = id; pino[p++] = j; }
        }
      }
    }
    koot.push(koko);
  }
  return { tunnus, koot };
}

/* -------------------------------------------------------------- kohina */

/**
 * Deterministinen arvokohina ruudulle (−1…1): hajautus 4°:n hilan
 * solmuihin ja pehmeä interpolointi. Sillä rosoitetaan porttien ja
 * alueiden laatikkoreunat (omistajan päätös 13: laatikot +
 * satunnaistettu reuna) — sama siemen antaa aina saman reunan.
 */
export function kohina(lat, lon, siemen = 1, hila = 4) {
  const x = (lon + 180) / hila;
  const y = (90 - lat) / hila;
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const s = (a) => a * a * (3 - 2 * a);
  const h = (ix, iy) => {
    let n = (ix * 374761393 + iy * 668265263 + siemen * 1442695041) | 0;
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    n ^= n >>> 16;
    return ((n & 0xffff) / 0x7fff) - 1;
  };
  const a = h(x0, y0);
  const b = h(x0 + 1, y0);
  const c = h(x0, y0 + 1);
  const d = h(x0 + 1, y0 + 1);
  const ux = s(fx);
  const uy = s(fy);
  return (a * (1 - ux) + b * ux) * (1 - uy) + (c * (1 - ux) + d * ux) * uy;
}

/* ------------------------------------------------------------ laatikot */

/**
 * Onko piste laatikossa { lat: [etela, pohjoinen], lon: [lansi, ita] }.
 * Pituusväli saa ylittää antimeridiaanin (lon: [150, -160]). `reuna`
 * (asteina) rosoittaa rajan kohinalla: raja siirtyy ±reuna astetta.
 */
export function laatikossa(lat, lon, laatikko, reuna = 0, siemen = 1) {
  const siirto = reuna ? reuna * kohina(lat, lon, siemen, 3) : 0;
  const [etela, pohjoinen] = laatikko.lat ?? [-90, 90];
  if (lat < etela + siirto || lat > pohjoinen + siirto) return false;
  if (!laatikko.lon) return true;
  const [lansi, ita] = laatikko.lon;
  const l = kierraLon(lon);
  const w = kierraLon(lansi + siirto);
  const e = kierraLon(ita + siirto);
  if (w <= e) return l >= w && l <= e;
  return l >= w || l <= e;
}

/**
 * PISTEEN SYVYYS LAATIKOSSA asteina: positiivinen sisällä (etäisyys
 * lähimpään reunaan), negatiivinen ulkona. Raja rosoitetaan samalla
 * kohinalla kuin laatikossa(), joten syvyys 0 on täsmälleen sama viiva.
 * Pituussuunnan etäisyys skaalataan cos φ:llä, jotta kaista on
 * suunnilleen yhtä leveä kilometreinä joka suuntaan.
 *
 * Miksi tämä on olemassa (hionta 6.9.2026): puolen asteen ruudukossa
 * laatikon raja on porrasreuna, joka näkyi Tiibetin ja Laurentiden
 * jään reunoina rappusina. Syvyys on JATKUVA funktio, ja siitä johdettu
 * kenttä (portin luisu, vanhan väestön pehmeä reuna) on jatkuva myös
 * ruutujen välissä, jolloin kalvon bilineaarinen suurennus piirtää
 * rajan pehmeänä käyränä.
 */
export function laatikonSyvyys(lat, lon, laatikko, reuna = 0, siemen = 1) {
  const siirto = reuna ? reuna * kohina(lat, lon, siemen, 3) : 0;
  const [etela, pohjoinen] = laatikko.lat ?? [-90, 90];
  let syvyys = Math.min(lat - (etela + siirto), (pohjoinen + siirto) - lat);
  const [lansi, ita] = laatikko.lon ?? [-180, 180];
  let leveys = ita - lansi;
  while (leveys < 0) leveys += 360;
  // Koko kierroksen laatikko ei rajaa pituussuunnassa: antimeridiaanille
  // ei saa syntyä keinotekoista reunaa.
  if (laatikko.lon && leveys < 360) {
    let dl = kierraLon(lon) - kierraLon(lansi + siirto);
    while (dl < 0) dl += 360;
    while (dl >= 360) dl -= 360;
    const dLon = dl <= leveys ? Math.min(dl, leveys - dl) : -Math.min(dl - leveys, 360 - dl);
    syvyys = Math.min(syvyys, dLon * Math.max(0.2, Math.cos(lat * RAD)));
  }
  return syvyys;
}

/**
 * Portin luisukaista: { leveys (astetta), vuodet (viive kaistan
 * ulkolaidalla) }. Oletus PORTIN_LUISU_ASTE ja avautumisajan osuus;
 * `luisu: null` datassa poistaa kaistan (terävä portti, testit).
 */
export const PORTIN_LUISU_ASTE = 1.5;
export const PORTIN_LUISU_OSUUS = 0.75;

export function portinLuisu(portti) {
  if (portti.luisu === null) return null;
  return {
    leveys: portti.luisu?.leveys ?? PORTIN_LUISU_ASTE,
    vuodet: portti.luisu?.vuodet ?? portti.avautuu * PORTIN_LUISU_OSUUS,
  };
}

/** Suurin syvyys laatikkolistassa (unioni): positiivinen jossakin sisällä. */
export function laatikoidenSyvyys(lat, lon, laatikot, reuna = 0, siemen = 1) {
  let paras = -Infinity;
  for (const laatikko of laatikot) {
    const s = laatikonSyvyys(lat, lon, laatikko, reuna, siemen);
    if (s > paras) paras = s;
  }
  return paras;
}

/**
 * Laatikoiden rivialue ruudukossa (rivit, joilla jokin laatikko
 * `vara` asteella laajennettuna voi osua). Karsii turhan läpikäynnin.
 */
function laatikoidenRivit(laatikot, vara, korkeus) {
  let etela = 90;
  let pohjoinen = -90;
  for (const l of laatikot) {
    etela = Math.min(etela, (l.lat?.[0] ?? -90) - vara);
    pohjoinen = Math.max(pohjoinen, (l.lat?.[1] ?? 90) + vara);
  }
  return [
    Math.max(0, Math.floor((90 - pohjoinen) / RUUDUN_ASTE)),
    Math.min(korkeus - 1, Math.floor((90 - etela) / RUUDUN_ASTE)),
  ];
}

/**
 * PEHMEÄ LAATIKKOMASKI: paino 0…1 syvyyden mukaan, `pehmeys` asteen
 * kaistalla rajan molemmin puolin (1 syvällä sisällä, 0,5 rajalla, 0
 * ulkona). Vanhan väestön alue (päätös 7) piirretään tällä, jotta
 * harmaan reuna häipyy eikä porrastu.
 */
export function laatikkoPehmea(laatikot, {
  reuna = 0, siemen = 1, pehmeys = 2, leveys = RUUDUKON_LEVEYS, korkeus = RUUDUKON_KORKEUS, maa = null,
} = {}) {
  const ulos = new Float32Array(leveys * korkeus);
  if (!laatikot?.length) return ulos;
  const [r0, r1] = laatikoidenRivit(laatikot, reuna + pehmeys, korkeus);
  for (let r = r0; r <= r1; r += 1) {
    const lat = 90 - (r + 0.5) * RUUDUN_ASTE;
    for (let c = 0; c < leveys; c += 1) {
      const i = r * leveys + c;
      if (maa && !maa[i]) continue;
      const lon = -180 + (c + 0.5) * RUUDUN_ASTE;
      const s = laatikoidenSyvyys(lat, lon, laatikot, reuna, siemen);
      const w = 0.5 + s / pehmeys;
      if (w > 0) ulos[i] = Math.min(1, w);
    }
  }
  return ulos;
}

/**
 * Ruudukon maski laatikkolistasta (rosoreunalla). 1 = jossakin laatikossa.
 *
 * Kohina lasketaan vain reunakaistalla: selvästi sisällä tai ulkona
 * oleva ruutu ratkeaa ilman sitä (laatikko kutistettuna / laajennettuna
 * reunan verran). Se pudottaa työn viidesosaan — laskenta ajetaan
 * puhelimella avausjakson aikana.
 */
export function laatikkoMaski(laatikot, {
  reuna = 0, siemen = 1, leveys = RUUDUKON_LEVEYS, korkeus = RUUDUKON_KORKEUS, maa = null,
} = {}) {
  const ulos = new Uint8Array(leveys * korkeus);
  if (!laatikot?.length) return ulos;
  const siirra = (laatikko, d) => ({
    lat: [(laatikko.lat?.[0] ?? -90) + d, (laatikko.lat?.[1] ?? 90) - d],
    lon: laatikko.lon ? [laatikko.lon[0] + d, laatikko.lon[1] - d] : null,
  });
  const sisemmat = laatikot.map((l) => siirra(l, reuna));
  const ulommat = laatikot.map((l) => siirra(l, -reuna));
  for (let r = 0; r < korkeus; r += 1) {
    const lat = 90 - (r + 0.5) * RUUDUN_ASTE;
    // Rivin ulkopuoliset laatikot karsitaan kerran, ei ruuduittain.
    const ehdokkaat = [];
    for (let k = 0; k < laatikot.length; k += 1) {
      const [etela, pohjoinen] = ulommat[k].lat;
      if (lat >= etela && lat <= pohjoinen) ehdokkaat.push(k);
    }
    if (!ehdokkaat.length) continue;
    for (let c = 0; c < leveys; c += 1) {
      const i = r * leveys + c;
      if (maa && !maa[i]) continue;
      const lon = -180 + (c + 0.5) * RUUDUN_ASTE;
      for (const k of ehdokkaat) {
        if (!laatikossa(lat, lon, ulommat[k])) continue;
        if (!reuna || laatikossa(lat, lon, sisemmat[k]) || laatikossa(lat, lon, laatikot[k], reuna, siemen)) {
          ulos[i] = 1;
          break;
        }
      }
    }
  }
  return ulos;
}

/* --------------------------------------------------------------- keko */

/** Binäärikeko (avain, arvo) — tavallinen Dijkstra-keko ilman kirjastoa. */
function luoKeko() {
  const avaimet = [];
  const arvot = [];
  return {
    koko: () => avaimet.length,
    lisaa(avain, arvo) {
      avaimet.push(avain);
      arvot.push(arvo);
      let i = avaimet.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (avaimet[p] <= avaimet[i]) break;
        [avaimet[p], avaimet[i]] = [avaimet[i], avaimet[p]];
        [arvot[p], arvot[i]] = [arvot[i], arvot[p]];
        i = p;
      }
    },
    ota() {
      const avain = avaimet[0];
      const arvo = arvot[0];
      const va = avaimet.pop();
      const vr = arvot.pop();
      if (avaimet.length) {
        avaimet[0] = va;
        arvot[0] = vr;
        let i = 0;
        for (;;) {
          const l = 2 * i + 1;
          const r = l + 1;
          let m = i;
          if (l < avaimet.length && avaimet[l] < avaimet[m]) m = l;
          if (r < avaimet.length && avaimet[r] < avaimet[m]) m = r;
          if (m === i) break;
          [avaimet[m], avaimet[i]] = [avaimet[i], avaimet[m]];
          [arvot[m], arvot[i]] = [arvot[i], arvot[m]];
          i = m;
        }
      }
      return { avain, arvo };
    },
  };
}

/* ------------------------------------------------------------ nopeus */

/**
 * Nopeus km/vuosi hetkellä `vuosiaSitten`. Luku tai taulu
 * [[vuosiaSitten, kmv], …] laskevassa aikajärjestyksessä: rivi on
 * voimassa omasta ajastaan seuraavan riviin asti.
 */
export function nopeusHetkella(nopeus, vuosiaSitten) {
  if (typeof nopeus === 'number') return nopeus;
  let arvo = nopeus[0][1];
  for (const [alkaen, kmv] of nopeus) {
    if (vuosiaSitten <= alkaen) arvo = kmv;
  }
  return arvo;
}

/* ---------------------------------------------------------- lähin maa */

/** Lähin maaruutu pisteelle (säde ruutuina), tai −1. */
export function lahinMaa(maa, lat, lon, sade = 3, leveys = RUUDUKON_LEVEYS, korkeus = RUUDUKON_KORKEUS) {
  const keski = ruutu(lat, lon, leveys, korkeus);
  if (maa[keski]) return keski;
  const r0 = Math.floor(keski / leveys);
  const c0 = keski - r0 * leveys;
  let paras = -1;
  let parasEt = Infinity;
  for (let dr = -sade; dr <= sade; dr += 1) {
    const r = r0 + dr;
    if (r < 0 || r >= korkeus) continue;
    for (let dc = -sade; dc <= sade; dc += 1) {
      const c = (c0 + dc + leveys) % leveys;
      const i = r * leveys + c;
      if (!maa[i]) continue;
      const et = dr * dr + dc * dc;
      if (et < parasEt) { parasEt = et; paras = i; }
    }
  }
  return paras;
}

/* ---------------------------------------------------------- Dijkstra */

/**
 * Yhden virran saapumisajat.
 *
 * @param virta { nopeus, sisamaa, alue?, pois?, reuna?, lahteet: [{lat, lon, aika}],
 *                ylitykset?: [{a:{lat,lon}, b:{lat,lon}, ikkuna:[avautuu, sulkeutuu], kesto}],
 *                portit?: [{ alue: [laatikot], avautuu, hajonta? }],
 *                nauhat?: [{ pisteet: [[lat, lon, aika]…], sade }] }
 * @param ymparisto { maa, rannikko, leveys, korkeus, siemen }
 * @returns { aika, meri, edeltaja, nauhaPiste, nauhaNro }
 *
 * EDELTÄJÄKETJU (VIRRAT VANOINA, omistaja 6.9.2026): jokaiselle
 * ruudulle talletetaan se ruutu, JOSTA sen aika viimeksi parani —
 * ylityksessä a, tavallisessa askelessa naapuri, lähteessä ja nauhassa
 * −1. Ketju päätepisteestä lähteeseen ON se polku, jota pitkin väri
 * mallissa sinne kulki, ja siitä johdetaan vanat (johdaVanat,
 * docs/moduulit/ihmisen-matka-vanat.md 2.1). Kirjanpito ei muuta
 * `aika`- eikä `meri`-kenttää tavullakaan: se vain kirjoittaa
 * rinnalle, kun tau paranee.
 */
export function laskeVirta(virta, {
  maa, rannikko = null, leveys = RUUDUKON_LEVEYS, korkeus = RUUDUKON_KORKEUS, siemen = 1,
}) {
  const koko = leveys * korkeus;
  const tau = new Float32Array(koko).fill(Infinity);
  const meri = new Float32Array(koko);
  // Edeltäjäketju vanoja varten: −1 = lähde, nauha tai saavuttamaton.
  const edeltaja = new Int32Array(koko).fill(-1);
  const nauhaPiste = new Int16Array(koko).fill(-1);
  const nauhaNro = new Int16Array(koko).fill(-1);
  const sisamaa = virta.sisamaa ?? 0.5;
  const reuna = virta.reuna ?? 1.5;
  // Sallittu alue: `alue`-laatikot (tai kaikki) miinus `pois`-laatikot.
  const sallittu = new Uint8Array(koko);
  // Sama siemen alueelle ja poissulkeville laatikoille: naapurivirran
  // `alue` ja tämän `pois` ovat sama laatikko, joten raja on yksi
  // rosoinen viiva ilman rakoa tai päällekkäisyyttä.
  const alueMaski = virta.alue?.length ? laatikkoMaski(virta.alue, { reuna, siemen, leveys, korkeus, maa }) : null;
  const poisMaski = virta.pois?.length ? laatikkoMaski(virta.pois, { reuna, siemen, leveys, korkeus, maa }) : null;
  for (let i = 0; i < koko; i += 1) {
    if (!maa[i]) continue;
    if (alueMaski && !alueMaski[i]) continue;
    if (poisMaski && poisMaski[i]) continue;
    sallittu[i] = 1;
  }
  /*
   * PORTIT: ruudun avautumisaika (vuosia sitten). Ruutu voi kuulua
   * useaan porttiin; myöhäisin voittaa. Laatikon REUNA rosoitetaan
   * (päätös 13), ja portin avauduttua väri leviää sen sisään omalla
   * nopeudellaan reunasta alkaen — se antaa luonnollisen rintaman.
   * Ruutukohtainen aikahajonta (`hajonta`) on oletuksena nolla:
   * kokeessa (6.9.2026, Tiibetin portti 40 ka) se kynnysti kohinakentän
   * neliömäisiksi laikuiksi, jotka näyttivät pahemmalta kuin suora reuna.
   */
  const avautuu = new Float32Array(koko).fill(Infinity);
  for (const [n, portti] of (virta.portit ?? []).entries()) {
    const rosoreuna = portti.reuna ?? reuna;
    const luisu = portinLuisu(portti);
    const hajonta = portti.hajonta ?? 0;
    const portinSiemen = siemen + 11 + n;
    const [r0, r1] = laatikoidenRivit(portti.alue, rosoreuna + (luisu?.leveys ?? 0), korkeus);
    for (let r = r0; r <= r1; r += 1) {
      const lat = 90 - (r + 0.5) * RUUDUN_ASTE;
      for (let c = 0; c < leveys; c += 1) {
        const i = r * leveys + c;
        if (!maa[i]) continue;
        const lon = -180 + (c + 0.5) * RUUDUN_ASTE;
        const s = laatikoidenSyvyys(lat, lon, portti.alue, rosoreuna, portinSiemen);
        let aika;
        if (s >= 0) {
          aika = portti.avautuu * (1 + hajonta * kohina(lat, lon, siemen + 23 + n, 2));
        } else if (luisu && s > -luisu.leveys) {
          /*
           * LUISU (hionta 6.9.2026): portin ULKOPUOLINEN kaista avautuu
           * sitä myöhemmin, mitä lähempänä rajaa ruutu on — neliöllisesti,
           * jotta kaukana kaistan laidalla luonnollinen saapuminen voittaa
           * ja rajan tuntumassa lähestyminen hidastuu pehmeästi. Kenttä on
           * jatkuva rajan yli, joten rintama ei pysähdy rappusreunaan vaan
           * hiipuu ylängön tai jään juurelle.
           */
          const x = -s / luisu.leveys;
          aika = portti.avautuu + luisu.vuodet * x * x;
        } else {
          continue;
        }
        if (aika < avautuu[i]) avautuu[i] = aika;
      }
    }
  }
  const keko = luoKeko();
  /** Ruudun aika (ja edeltäjä) paremmaksi; palauttaa tosi, jos parani. */
  const kirjaa = (i, t, mista = -1) => {
    // Portti: alueeseen ei pääse ennen sen avautumista.
    const tt = Math.fround(Math.max(t, -avautuu[i]));
    if (!(tt < tau[i])) return false;
    tau[i] = tt;
    edeltaja[i] = mista;
    /*
     * Nauhamerkintä kuuluu VOITTANEELLE saapumiselle: jos ruutu, johon
     * nauha kylvi ajan, saavutetaan myöhemmin maata pitkin vanhempana,
     * vana ei saa hypätä siinä nauhalle. Merkintä nollataan joka
     * parannuksella ja kirjoitetaan uudelleen vain, kun nauha voittaa.
     */
    nauhaPiste[i] = -1;
    nauhaNro[i] = -1;
    keko.lisaa(tt, i);
    return true;
  };
  // Lähteet.
  for (const l of virta.lahteet ?? []) {
    const i = lahinMaa(maa, l.lat, l.lon, 3, leveys, korkeus);
    if (i >= 0 && Number.isFinite(l.aika)) kirjaa(i, -l.aika);
  }
  // Nauhat: janan sisään jäävät ruudut saavat ajan janalta.
  const merkitseNauha = (i, piste, nro) => { nauhaPiste[i] = piste; nauhaNro[i] = nro; edeltaja[i] = -1; };
  (virta.nauhat ?? []).forEach((nauha, nro) => {
    rasteroiNauha(nauha, { maa, sallittu, meri, kirjaa, leveys, korkeus, nro, merkitseNauha });
  });
  // Ylitykset: lisäsärmä a → b.
  const lisasarmat = new Map();
  for (const y of virta.ylitykset ?? []) {
    const a = lahinMaa(maa, y.a.lat, y.a.lon, 3, leveys, korkeus);
    const b = lahinMaa(maa, y.b.lat, y.b.lon, 3, leveys, korkeus);
    if (a < 0 || b < 0) continue;
    if (!lisasarmat.has(a)) lisasarmat.set(a, []);
    lisasarmat.get(a).push({ b, avautuu: y.ikkuna?.[0] ?? Infinity, sulkeutuu: y.ikkuna?.[1] ?? 0, kesto: y.kesto ?? 0 });
  }
  const askelKm = KM_ASTEELLA * RUUDUN_ASTE;
  while (keko.koko() > 0) {
    const { avain: t, arvo: u } = keko.ota();
    if (t > tau[u]) continue;
    const r = Math.floor(u / leveys);
    const c = u - r * leveys;
    const vuosiaSitten = -t;
    const nopeus = nopeusHetkella(virta.nopeus, vuosiaSitten);
    const lat = 90 - (r + 0.5) * RUUDUN_ASTE;
    const cosLat = Math.max(0.05, Math.cos(lat * RAD));
    for (let dr = -1; dr <= 1; dr += 1) {
      const rr = r + dr;
      if (rr < 0 || rr >= korkeus) continue;
      for (let dc = -1; dc <= 1; dc += 1) {
        if (!dr && !dc) continue;
        const v = rr * leveys + ((c + dc + leveys) % leveys);
        if (!sallittu[v]) continue;
        const dx = dc ? askelKm * cosLat : 0;
        const dy = dr ? askelKm : 0;
        const km = Math.hypot(dx, dy);
        const kerroin = rannikko && !rannikko[v] ? sisamaa : 1;
        kirjaa(v, t + km / (nopeus * kerroin), u);
      }
    }
    const ylitykset = lisasarmat.get(u);
    if (ylitykset) {
      for (const y of ylitykset) {
        // Rintama odottaa ikkunan avautumista; ikkunan jälkeen kiinni.
        const lahto = Math.max(t, -y.avautuu);
        if (lahto > -y.sulkeutuu) continue;
        if (!sallittu[y.b] && !maa[y.b]) continue;
        kirjaa(y.b, lahto + y.kesto, u);
      }
    }
  }
  const aika = new Float32Array(koko);
  for (let i = 0; i < koko; i += 1) if (tau[i] < Infinity) aika[i] = -tau[i];
  return { aika, meri, edeltaja, nauhaPiste, nauhaNro };
}

/**
 * Nauha reitiksi ruudukkoon: pisteet [lat, lon, aika], sade km. Ruudut
 * säteen sisällä saavat ajan janalta lineaarisesti; reunalla aika on
 * 15 % myöhäisempi, jotta nauha täyttyy keskeltä. Maaruudut kirjataan
 * lähteiksi (leviävät edelleen), meriruudut merikenttään.
 */
function rasteroiNauha(nauha, { maa, sallittu, meri, kirjaa, leveys, korkeus, nro = -1, merkitseNauha = null }) {
  const pisteet = nauha.pisteet ?? [];
  const sade = nauha.sade ?? 120;
  const meriSade = nauha.meriSade ?? sade * 0.6;
  for (let k = 0; k + 1 < pisteet.length; k += 1) {
    const [lat1, lon1, t1] = pisteet[k];
    const [lat2, lon2, t2] = pisteet[k + 1];
    // Jana ruutuina: laatikko janan ympärille säteen verran.
    const latMin = Math.min(lat1, lat2) - sade / KM_ASTEELLA - 1;
    const latMax = Math.max(lat1, lat2) + sade / KM_ASTEELLA + 1;
    const cosMin = Math.max(0.1, Math.cos(Math.max(Math.abs(lat1), Math.abs(lat2)) * RAD));
    let dLon = lon2 - lon1;
    while (dLon > 180) dLon -= 360;
    while (dLon < -180) dLon += 360;
    const lonA = lon1;
    const lonB = lon1 + dLon;
    const lonMin = Math.min(lonA, lonB) - sade / (KM_ASTEELLA * cosMin) - 1;
    const lonMax = Math.max(lonA, lonB) + sade / (KM_ASTEELLA * cosMin) + 1;
    const r0 = Math.max(0, Math.floor((90 - latMax) / RUUDUN_ASTE));
    const r1 = Math.min(korkeus - 1, Math.floor((90 - latMin) / RUUDUN_ASTE));
    for (let r = r0; r <= r1; r += 1) {
      const lat = 90 - (r + 0.5) * RUUDUN_ASTE;
      const cosLat = Math.max(0.05, Math.cos(lat * RAD));
      for (let lon = Math.floor(lonMin / RUUDUN_ASTE) * RUUDUN_ASTE; lon <= lonMax; lon += RUUDUN_ASTE) {
        const c = Math.floor((kierraLon(lon + RUUDUN_ASTE / 2) + 180) / RUUDUN_ASTE);
        const i = r * leveys + ((c % leveys) + leveys) % leveys;
        // Etäisyys janaan tasossa, jossa pituusaste on skaalattu cos(lat):lla.
        const px = (lon + RUUDUN_ASTE / 2 - lonA) * cosLat * KM_ASTEELLA;
        const py = (lat - lat1) * KM_ASTEELLA;
        const vx = (lonB - lonA) * cosLat * KM_ASTEELLA;
        const vy = (lat2 - lat1) * KM_ASTEELLA;
        const pituus2 = vx * vx + vy * vy;
        const u = pituus2 > 0 ? Math.max(0, Math.min(1, (px * vx + py * vy) / pituus2)) : 0;
        const d = Math.hypot(px - u * vx, py - u * vy);
        const aika = (t1 + (t2 - t1) * u) * (1 - 0.15 * Math.min(1, d / sade));
        if (maa[i]) {
          // Nauhan ruutu muistaa pisteensä: vana jatkuu nauhaa pitkin taaksepäin.
          if (d <= sade && sallittu[i] && kirjaa(i, -aika) && merkitseNauha) merkitseNauha(i, u < 0.5 ? k : k + 1, nro);
        } else if (d <= meriSade) {
          if (!meri[i] || aika > meri[i]) meri[i] = aika;
        }
      }
    }
  }
}

/* ---------------------------------------------------------- yhdistä */

/**
 * Virrat yhdeksi kentäksi: ruudun väri on ENSIN saapuneen virran väri.
 *
 * @param kentat [{ tunnus, aika, meri }] virtojen järjestyksessä
 * @returns { aika, virta (Int8: indeksi listassa, −1 = ei kukaan), meri, meriVirta }
 */
export function yhdistaVirrat(kentat, koko = RUUDUKON_LEVEYS * RUUDUKON_KORKEUS) {
  const aika = new Float32Array(koko);
  const virta = new Int8Array(koko).fill(-1);
  const meri = new Float32Array(koko);
  const meriVirta = new Int8Array(koko).fill(-1);
  kentat.forEach((k, n) => {
    for (let i = 0; i < koko; i += 1) {
      const a = k.aika[i];
      if (a > 0 && (virta[i] < 0 || a > aika[i])) { aika[i] = a; virta[i] = n; }
      const m = k.meri?.[i] ?? 0;
      if (m > 0 && (meriVirta[i] < 0 || m > meri[i])) { meri[i] = m; meriVirta[i] = n; }
    }
  });
  return { aika, virta, meri, meriVirta };
}

/* -------------------------------------------------------------- tila */

/**
 * Rintaman leveys vuosina: kymmenesosa kellon lukemasta, vähintään 600
 * (omistajan päätös 3). Peittävyys nousee pehmeästi ennen saapumista
 * 5 %:n matkalla (vähintään 300 v), jotta reuna ei napsahda.
 */
export const RINTAMAN_OSUUS = 0.1;
export const RINTAMAN_MIN_V = 600;
export const NOUSUN_OSUUS = 0.05;
export const NOUSUN_MIN_V = 300;

export function rintamanLeveys(nyt) {
  return Math.max(RINTAMAN_MIN_V, RINTAMAN_OSUUS * nyt);
}

const smoothstep = (x) => {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
};

/**
 * Ruudun tila kellon hetkellä `nyt`: paino w (1 rintamalla, 0 vanhalla
 * alueella) ja peittävyys (0 ennen saapumista, nousee smoothstepillä).
 * `askelittain` (reduced motion) jättää nousun pois: ruutu on joko
 * värjäytynyt tai ei.
 *
 * @param {number} aika ruudun saapumisaika (vuosia sitten, 0 = ei)
 * @param {number} nyt kellon lukema (vuosia sitten)
 */
export function ruudunTila(aika, nyt, { askelittain = false } = {}) {
  if (!(aika > 0)) return { w: 0, peitto: 0 };
  const ika = aika - nyt; // vuosia saapumisesta; negatiivinen = tulossa
  if (ika < 0) {
    if (askelittain) return { w: 0, peitto: 0 };
    const nousu = Math.max(NOUSUN_MIN_V, NOUSUN_OSUUS * nyt);
    const peitto = smoothstep(1 + ika / nousu);
    return { w: 1, peitto };
  }
  const leveys = rintamanLeveys(nyt);
  return { w: Math.max(0, 1 - ika / leveys), peitto: 1 };
}

/* -------------------------------------------------------------- väri */

/** '#rrggbb' → [r, g, b]. */
export function heksaRGB(heksa) {
  const h = heksa.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Virran väri hetkellä `aika` (vuosia sitten): vanhan alueen sävy ja
 * rintaman sävy, joiden välillä paino w liukuu. `liuku` (Amerikat)
 * siirtää molempia sävyjä KELLON mukaan välillä alkaen → valmis
 * [{ aika, vanha, rintama }…] — koko virran alue vaihtaa sävyä ajan
 * kuluessa, mikä on omistajan pyytämä "eriytyvä populaatio" (Raamattu:
 * "savy eriytyy ajan mukana"), ei rannikon ja sisämaan välinen ero.
 *
 * @returns { vanha: [r,g,b], rintama: [r,g,b] }
 */
export function virranVari(vari, aika = 0) {
  const liuku = vari.liuku;
  if (!liuku?.length || !(aika > 0)) return { vanha: heksaRGB(vari.vanha), rintama: heksaRGB(vari.rintama) };
  // Askeleet laskevassa aikajärjestyksessä (vanhin ensin).
  if (aika >= liuku[0].aika) return { vanha: heksaRGB(liuku[0].vanha), rintama: heksaRGB(liuku[0].rintama) };
  const viimeinen = liuku[liuku.length - 1];
  if (aika <= viimeinen.aika) return { vanha: heksaRGB(viimeinen.vanha), rintama: heksaRGB(viimeinen.rintama) };
  for (let k = 0; k + 1 < liuku.length; k += 1) {
    const a = liuku[k];
    const b = liuku[k + 1];
    if (aika <= a.aika && aika >= b.aika) {
      const t = (a.aika - aika) / (a.aika - b.aika);
      const va = heksaRGB(a.vanha);
      const vb = heksaRGB(b.vanha);
      const ra = heksaRGB(a.rintama);
      const rb = heksaRGB(b.rintama);
      return {
        vanha: [lerp(va[0], vb[0], t), lerp(va[1], vb[1], t), lerp(va[2], vb[2], t)],
        rintama: [lerp(ra[0], rb[0], t), lerp(ra[1], rb[1], t), lerp(ra[2], rb[2], t)],
      };
    }
  }
  return { vanha: heksaRGB(vari.vanha), rintama: heksaRGB(vari.rintama) };
}

/* -------------------------------------------------------- painopiste */

/**
 * Virtojen rintamien painopisteet kameralle hetkellä `nyt`.
 *
 * Painopiste lasketaan 3D-yksikkövektoreiden summana, jotta
 * Beringinsalmi (antimeridiaani) ei riko sitä; paino on
 * (1 − ikä/leveys) · cos φ. Hajonta on tasaisen kiekon kulmasäde
 * asteina, laskettuna keskiarvovektorin pituudesta.
 *
 * @returns [{ virta, paino, lat, lon, hajonta }] — vain virrat, joilla on rintamaa
 */
export function rintamienPainopisteet({ aika, virta }, nyt, { leveys = RUUDUKON_LEVEYS, korkeus = RUUDUKON_KORKEUS, ohita = null } = {}) {
  const rintama = rintamanLeveys(nyt);
  const summat = new Map();
  for (let i = 0; i < aika.length; i += 1) {
    const a = aika[i];
    if (!(a > 0)) continue;
    const v = virta[i];
    if (v < 0 || (ohita && ohita.has(v))) continue;
    const ika = a - nyt;
    if (ika < 0 || ika > rintama) continue;
    const r = Math.floor(i / leveys);
    const c = i - r * leveys;
    const lat = (90 - (r + 0.5) * RUUDUN_ASTE) * RAD;
    const lon = (-180 + (c + 0.5) * RUUDUN_ASTE) * RAD;
    const cosLat = Math.cos(lat);
    const paino = (1 - ika / rintama) * cosLat;
    let s = summat.get(v);
    if (!s) { s = { x: 0, y: 0, z: 0, paino: 0 }; summat.set(v, s); }
    s.x += paino * cosLat * Math.cos(lon);
    s.y += paino * cosLat * Math.sin(lon);
    s.z += paino * Math.sin(lat);
    s.paino += paino;
  }
  const ulos = [];
  for (const [v, s] of summat) {
    if (!(s.paino > 0)) continue;
    const x = s.x / s.paino;
    const y = s.y / s.paino;
    const z = s.z / s.paino;
    const R = Math.min(1, Math.hypot(x, y, z));
    const lat = Math.atan2(z, Math.hypot(x, y)) / RAD;
    const lon = Math.atan2(y, x) / RAD;
    // Tasaisen kiekon kulmasäde θ: R̄ = (1 + cos θ) / 2 → θ = acos(2R̄ − 1).
    const hajonta = Math.acos(Math.max(-1, Math.min(1, 2 * R - 1))) / RAD;
    ulos.push({ virta: v, paino: s.paino, lat, lon, hajonta });
  }
  return ulos.sort((a, b) => b.paino - a.paino);
}

/** Kameran näkyvä leveys asteina hajonnasta: clamp(2,6·hajonta + 12, 28, 100). */
export function kameranLeveysAsteina(hajonta) {
  return Math.max(28, Math.min(100, 2.6 * hajonta + 12));
}

/* --------------------------------------------------------- peitto */

/**
 * MAAPEITTO 0…9: kuinka moni ruudun yhdeksästä alinäytteestä osui
 * maahan (tools/tee-maamaski.mjs). Maski (`juoksut`) on yhä binäärinen
 * ja ratkaisee kulun; peitto ratkaisee vain PIIRRON: rannikkoruutu,
 * josta viidennes on maata, saa viidenneksen peittävyyden eikä täyttä
 * neliötä. Hionta 6.9.2026 (Malakan itäpuolen "ylimääräinen maa" oli
 * juuri näitä täysinä piirrettyjä reunaruutuja).
 *
 * Pakkaus: (arvo, juoksun pituus) -pareja, arvo nibblenä ja pituus
 * varintina, base64:nä. Meri (0) ja täysi maa (9) ovat pitkiä juoksuja,
 * rannikko lyhyitä.
 */
export function pakkaaPeitto(peitto) {
  const tavut = [];
  const varint = (n) => {
    let v = n;
    while (v >= 0x80) { tavut.push((v & 0x7f) | 0x80); v >>>= 7; }
    tavut.push(v);
  };
  let arvo = peitto[0] ?? 0;
  let pituus = 0;
  for (let i = 0; i < peitto.length; i += 1) {
    if (peitto[i] === arvo) { pituus += 1; continue; }
    tavut.push(arvo & 15);
    varint(pituus);
    arvo = peitto[i];
    pituus = 1;
  }
  tavut.push(arvo & 15);
  varint(pituus);
  return tavuistaBase64(tavut);
}

/** Peitto takaisin Uint8Arrayksi (0…9). Tyhjä syöte → null. */
export function puraPeitto(pakattu, koko = RUUDUKON_LEVEYS * RUUDUKON_KORKEUS) {
  if (!pakattu) return null;
  const tavut = base64Tavuiksi(pakattu);
  const ulos = new Uint8Array(koko);
  let i = 0;
  let paikka = 0;
  while (paikka + 1 < tavut.length && i < koko) {
    const arvo = tavut[paikka] & 15;
    paikka += 1;
    let n = 0;
    let siirto = 0;
    let tavu;
    do {
      tavu = tavut[paikka];
      paikka += 1;
      n |= (tavu & 0x7f) << siirto;
      siirto += 7;
    } while (tavu & 0x80);
    if (arvo) ulos.fill(arvo, i, Math.min(koko, i + n));
    i += n;
  }
  return ulos;
}

/* ------------------------------------------------------- tarkennus */

/**
 * KENTÄT PIIRTORESOLUUTIOON (hionta 6.9.2026, ruutureunat).
 *
 * Puolen asteen ruutu on lähikuvassa 20–25 pikseliä, ja yksi arvo per
 * ruutu näkyi rappusina rintaman, rannikon ja alueiden rajoilla.
 * Kalvo piirretään `kerroin`-kertaisella resoluutiolla (2 → 1440 × 720),
 * ja jokainen kalvon pikseli saa arvonsa neljän lähimmän ruudun
 * BILINEAARISENA sekoituksena:
 *
 *   - saapumisaika painotettuna niiden ruutujen kesken, jotka ylipäänsä
 *     värjäytyvät (jatkuva kenttä → rintaman raja on pehmeä käyrä);
 *   - `paino` = värjäytyvän maan osuus × maapeitto (rannikko häipyy);
 *   - kaksi vahvinta virtaa ja niiden sekoitussuhde (alueiden raja
 *     liukuu värista toiseen eikä porrastu);
 *   - sama meriruuduille (nauhat), retkelle ja vanhalle väestölle.
 *
 * Tulos on TIIVIS: vain pikselit, joilla on jokin kerros (`indeksi`),
 * ja jokaiselle rinnakkaiset taulukot. Näin muisti pysyy muutamassa
 * megatavussa ja kehyksen maalaus käy listan läpi kerran. Ajetaan
 * Workerissa laskennan perään (js/aikajana-virrat-tyo.js).
 */
export function tarkennaKentat(kentat, {
  maa, peitto = null, leveys = RUUDUKON_LEVEYS, korkeus = RUUDUKON_KORKEUS, kerroin = 2,
}) {
  const { aika, virta, meri, meriVirta, retki, vanha } = kentat;
  const W2 = leveys * kerroin;
  const H2 = korkeus * kerroin;
  const koko = W2 * H2;
  /*
   * Kasvavat puskurit: aktiivisia pikseleitä on n. neljännes kalvosta,
   * eikä määrää tiedetä etukäteen. Tuplaus tarvittaessa; lopuksi
   * leikataan mittaan. Ei olioita eikä taulukoita pikseliä kohti —
   * miljoona pikseliä × varaus olisi satoja millisekunteja.
   */
  let tila = 1 << 18;
  let n = 0;
  let ind = new Int32Array(tila);
  let tA = new Float32Array(tila);
  let tP = new Uint8Array(tila);
  let tV = new Int8Array(tila);
  let tV2 = new Int8Array(tila);
  let tS = new Uint8Array(tila);
  let tM = new Float32Array(tila);
  let tMP = new Uint8Array(tila);
  let tMV = new Int8Array(tila);
  let tR = new Float32Array(tila);
  let tRP = new Uint8Array(tila);
  let tVa = new Uint8Array(tila);
  const kasvata = () => {
    tila *= 2;
    const laajenna = (vanhaT, Tyyppi) => { const uusi = new Tyyppi(tila); uusi.set(vanhaT); return uusi; };
    ind = laajenna(ind, Int32Array);
    tA = laajenna(tA, Float32Array);
    tP = laajenna(tP, Uint8Array);
    tV = laajenna(tV, Int8Array);
    tV2 = laajenna(tV2, Int8Array);
    tS = laajenna(tS, Uint8Array);
    tM = laajenna(tM, Float32Array);
    tMP = laajenna(tMP, Uint8Array);
    tMV = laajenna(tMV, Int8Array);
    tR = laajenna(tR, Float32Array);
    tRP = laajenna(tRP, Uint8Array);
    tVa = laajenna(tVa, Uint8Array);
  };
  const painot = new Float32Array(16); // virtapainot (enintään 16 virtaa)
  const meriPainot = new Float32Array(16);
  const osuus = new Float32Array(leveys * korkeus);
  for (let i = 0; i < osuus.length; i += 1) osuus[i] = peitto ? peitto[i] / 9 : (maa[i] ? 1 : 0);
  const i4 = new Int32Array(4);
  const w4 = new Float32Array(4);
  for (let v = 0; v < H2; v += 1) {
    const y = (v + 0.5) / kerroin - 0.5;
    const r0 = Math.floor(y);
    const fy = y - r0;
    const rA = Math.max(0, Math.min(korkeus - 1, r0));
    const rB = Math.max(0, Math.min(korkeus - 1, r0 + 1));
    for (let u = 0; u < W2; u += 1) {
      const x = (u + 0.5) / kerroin - 0.5;
      const c0 = Math.floor(x);
      const fx = x - c0;
      const cA = (c0 + leveys) % leveys;
      const cB = (c0 + 1 + leveys) % leveys;
      i4[0] = rA * leveys + cA;
      i4[1] = rA * leveys + cB;
      i4[2] = rB * leveys + cA;
      i4[3] = rB * leveys + cB;
      w4[0] = (1 - fx) * (1 - fy);
      w4[1] = fx * (1 - fy);
      w4[2] = (1 - fx) * fy;
      w4[3] = fx * fy;
      let paino = 0;
      let summa = 0;
      let retkiPaino = 0;
      let retkiSumma = 0;
      let vanhaPaino = 0;
      let meriPaino = 0;
      let meriSumma = 0;
      painot.fill(0);
      meriPainot.fill(0);
      for (let k = 0; k < 4; k += 1) {
        const i = i4[k];
        const w = w4[k];
        const q = w * osuus[i];
        const a = aika[i];
        if (a > 0 && virta[i] >= 0 && q > 0) {
          paino += q;
          summa += q * a;
          painot[virta[i]] += q;
        }
        if (retki && retki[i] > 0 && q > 0) {
          retkiPaino += q;
          retkiSumma += q * retki[i];
        }
        if (vanha && vanha[i] > 0) vanhaPaino += q * vanha[i];
        const m = meri[i];
        if (m > 0 && meriVirta[i] >= 0) {
          meriPaino += w;
          meriSumma += w * m;
          meriPainot[meriVirta[i]] += w;
        }
      }
      if (paino <= 0 && retkiPaino <= 0 && vanhaPaino <= 0 && meriPaino <= 0) continue;
      let v1 = -1;
      let v2 = -1;
      let p1 = 0;
      let p2 = 0;
      if (paino > 0) {
        for (let k = 0; k < painot.length; k += 1) {
          const pk = painot[k];
          if (pk > p1) { v2 = v1; p2 = p1; v1 = k; p1 = pk; } else if (pk > p2) { v2 = k; p2 = pk; }
        }
      }
      let mv = -1;
      let mp = 0;
      if (meriPaino > 0) {
        for (let k = 0; k < meriPainot.length; k += 1) if (meriPainot[k] > mp) { mp = meriPainot[k]; mv = k; }
      }
      if (n >= tila) kasvata();
      ind[n] = v * W2 + u;
      tA[n] = paino > 0 ? summa / paino : 0;
      tP[n] = Math.round(Math.min(1, paino) * 255);
      tV[n] = v1;
      tV2[n] = v2;
      tS[n] = v2 >= 0 ? Math.round(255 * (p2 / (p1 + p2))) : 0;
      tM[n] = meriPaino > 0 ? meriSumma / meriPaino : 0;
      tMP[n] = Math.round(Math.min(1, meriPaino) * 255);
      tMV[n] = mv;
      tR[n] = retkiPaino > 0 ? retkiSumma / retkiPaino : 0;
      tRP[n] = Math.round(Math.min(1, retkiPaino) * 255);
      tVa[n] = Math.round(Math.min(1, vanhaPaino) * 255);
      n += 1;
    }
  }
  return {
    leveys: W2,
    korkeus: H2,
    koko,
    indeksi: ind.slice(0, n),
    aika: tA.slice(0, n),
    paino: tP.slice(0, n),
    virta: tV.slice(0, n),
    virta2: tV2.slice(0, n),
    sekoitus: tS.slice(0, n),
    meri: tM.slice(0, n),
    meriPaino: tMP.slice(0, n),
    meriVirta: tMV.slice(0, n),
    retki: retki ? tR.slice(0, n) : null,
    retkiPaino: retki ? tRP.slice(0, n) : null,
    vanha: vanha ? tVa.slice(0, n) : null,
  };
}

/* ------------------------------------------------------------ vanat */

/**
 * VANAT: leviäminen PÄÄREITTINÄ, ei mantereen täyttönä (Raamattu,
 * "VIRRAT VANOINA", omistaja 6.9.2026; docs/moduulit/ihmisen-matka-vanat.md
 * luku 2.1).
 *
 * Vanaa ei piirretä käsin: se JOHDETAAN samasta saapumisaikakentästä,
 * joka värjää ruudut. Dijkstran edeltäjäketju päätepisteestä lähteeseen
 * on täsmälleen se polku, jota pitkin väri mallissa sinne kulki —
 * ylitykset, portit ja nauhat mukaan lukien — ja jokainen kärki kantaa
 * oman saapumisaikansa. Kun malliin säädetään nopeutta tai porttia,
 * vana seuraa perässä eikä yksikään käsin piirretty linja vanhene.
 *
 * Käsin annetaan vain PÄÄTEPISTEET (aineistoa: Monte Verde, Lake Mungo,
 * Lissabon, …) ja Afrikan kotipesät. Käsin piirretty käytävä hylättiin
 * kokeessa: sen ajat kentästä eivät olleet monotonisia ja se poikkesi
 * mallin polusta mediaanina 414 km — kaksi totuutta samalla kartalla
 * (suunnitelman 2.1 B).
 */

/** Vartija: edeltäjäketju ei voi olla ruudukkoa pidempi. */
const VANAN_VARTIJA = 30000;

/** Kahden pisteen etäisyys kilometreinä (tasoapproksimaatio riittää ruudukolla). */
export function vanaKm(a, b) {
  const f1 = a.lat * RAD;
  const f2 = b.lat * RAD;
  let dl = b.lon - a.lon;
  while (dl > 180) dl -= 360;
  while (dl < -180) dl += 360;
  return 6371 * Math.hypot(dl * RAD * Math.cos((f1 + f2) / 2), f2 - f1);
}

/** Vanan pituus kilometreinä. */
export function vananPituusKm(pisteet) {
  let s = 0;
  for (let k = 1; k < pisteet.length; k += 1) s += vanaKm(pisteet[k - 1], pisteet[k]);
  return s;
}

/**
 * Onko piste enintään `raja` km:n päässä jonkin vanan kärjestä?
 * Haaran katkaisu kysyy tätä jokaiselta raakapolun pisteeltä, joten
 * etäisyys lasketaan halvalla: leveysero karsii ensin (yksi vähennys),
 * ja pituusero skaalataan kysyjän omalla kosinilla — trigonometriaa ei
 * lasketa pisteparia kohti lainkaan.
 */
function lahellaVanoja(piste, vanat, raja) {
  const cosLat = Math.cos(piste.lat * RAD);
  const latRaja = raja / KM_ASTEELLA;
  for (const v of vanat) {
    for (const p of v.pisteet) {
      const dLat = p[0] - piste.lat;
      if (dLat > latRaja || dLat < -latRaja) continue;
      let dLon = p[1] - piste.lon;
      while (dLon > 180) dLon -= 360;
      while (dLon < -180) dLon += 360;
      const dx = dLon * cosLat;
      if (Math.hypot(dx, dLat) * KM_ASTEELLA <= raja) return true;
    }
  }
  return false;
}

/**
 * EDELTÄJÄPOLKU päätepisteestä lähteeseen, kärki ensin käännettynä
 * lähteestä päätepisteeseen. Kolme erikoistapausta ratkeaa ketjussa
 * ilmaiseksi (suunnitelman 2.1 A):
 *
 *   - YLITYS on ketjussa tavallinen särmä (b:n edeltäjä on a);
 *   - NAUHAN ruudussa hypätään nauhan pisteitä taaksepäin sen alkuun ja
 *     jatketaan siitä kentässä;
 *   - SIIRTYMÄ toiseen virtaan (Beringia) jatkuu toisen virran
 *     lukupisteestä; virran omassa lähteessä (Altai, Bacho Kiro)
 *     hypätään rungon lähimpään VANHEMPAAN ruutuun.
 */
function edeltajapolku(kentat, siirtymat, runko, tunnus, lat, lon, { maa, leveys, korkeus }) {
  const polku = [];
  let k = kentat.get(tunnus);
  let i = lahinMaa(maa, lat, lon, 4, leveys, korkeus);
  let vartija = 0;
  while (k && i >= 0 && vartija < VANAN_VARTIJA) {
    vartija += 1;
    const p = ruudunKeskus(i, leveys);
    polku.push({ lat: p.lat, lon: p.lon, aika: k.aika[i], virta: k.tunnus });
    if (k.nauhaPiste[i] >= 0) {
      const nauha = k.nauhat[k.nauhaNro[i]];
      if (!nauha) break;
      for (let q = k.nauhaPiste[i]; q >= 0; q -= 1) {
        const [nlat, nlon, naika] = nauha.pisteet[q];
        polku.push({ lat: nlat, lon: nlon, aika: naika, virta: k.tunnus, nauha: true });
      }
      const alku = lahinMaa(maa, nauha.pisteet[0][0], nauha.pisteet[0][1], 4, leveys, korkeus);
      // Nauhan alun ruudusta jatketaan, jos se on saatu muualta kuin nauhasta.
      if (alku >= 0 && k.nauhaPiste[alku] < 0 && k.edeltaja[alku] >= 0) { i = k.edeltaja[alku]; continue; }
      // Muuten lähin ei-nauharuutu, joka on nauhan alkua vanhempi.
      i = alku >= 0 ? vanhinLahella(k, alku, nauha.pisteet[0][2], { leveys, korkeus, nauhatPois: true }) : -1;
      continue;
    }
    const s = siirtymat.find((x) => x.tunnus === k.tunnus && x.kohde === i);
    if (s) {
      const toinen = kentat.get(s.virta);
      if (!toinen || s.lue < 0) break;
      k = toinen;
      i = s.lue;
      continue;
    }
    if (k.edeltaja[i] < 0) {
      // Virran oma lähde: jatka rungossa, jos se on ehtinyt tänne aiemmin.
      if (runko && k.tunnus !== runko.tunnus) {
        const j = vanhinLahella(runko, i, k.aika[i], { leveys, korkeus });
        if (j >= 0) { k = runko; i = j; continue; }
      }
      break;
    }
    i = k.edeltaja[i];
  }
  return polku.reverse();
}

/** Lähin ruutu (säde 8), jonka aika kentässä on ≥ `vahintaan`; vanhin voittaa. */
function vanhinLahella(kentta, keski, vahintaan, { leveys, korkeus, sade = 8, nauhatPois = false }) {
  const r0 = Math.floor(keski / leveys);
  const c0 = keski - r0 * leveys;
  let paras = -1;
  let parasAika = 0;
  for (let dr = -sade; dr <= sade; dr += 1) {
    const r = r0 + dr;
    if (r < 0 || r >= korkeus) continue;
    for (let dc = -sade; dc <= sade; dc += 1) {
      const j = r * leveys + ((c0 + dc + leveys) % leveys);
      if (nauhatPois && kentta.nauhaPiste[j] >= 0) continue;
      const a = kentta.aika[j];
      if (a > parasAika && a >= vahintaan) { paras = j; parasAika = a; }
    }
  }
  return paras;
}

/** Douglas–Peucker: säilytettävien pisteiden indeksit (etäisyys km). */
function dpIndeksit(pisteet, tolKm, alku = 0, loppu = pisteet.length - 1) {
  if (loppu <= alku + 1) return loppu > alku ? [alku, loppu] : [alku];
  const a = pisteet[alku];
  const b = pisteet[loppu];
  let paras = alku;
  let parasD = -1;
  let dlon = b.lon - a.lon;
  while (dlon > 180) dlon -= 360;
  while (dlon < -180) dlon += 360;
  for (let k = alku + 1; k < loppu; k += 1) {
    const p = pisteet[k];
    const cl = Math.cos(p.lat * RAD);
    let plon = p.lon - a.lon;
    while (plon > 180) plon -= 360;
    while (plon < -180) plon += 360;
    const vx = dlon * cl;
    const vy = b.lat - a.lat;
    const px = plon * cl;
    const py = p.lat - a.lat;
    const l2 = vx * vx + vy * vy;
    const u = l2 > 0 ? Math.max(0, Math.min(1, (px * vx + py * vy) / l2)) : 0;
    const d = Math.hypot(px - u * vx, py - u * vy) * KM_ASTEELLA;
    if (d > parasD) { parasD = d; paras = k; }
  }
  if (parasD <= tolKm) return [alku, loppu];
  return [...dpIndeksit(pisteet, tolKm, alku, paras).slice(0, -1), ...dpIndeksit(pisteet, tolKm, paras, loppu)];
}

/**
 * AIKATIHENNYS: Douglas–Peucker karsii paikan mukaan eikä tiedä ajasta.
 * Jos kahden säilytetyn kärjen aikaväli on iso (portin tasanne,
 * Bab-el-Mandebin odotus), kärki "liukuisi" portin yli lineaarisesti
 * sen sijaan että odottaisi rajalla. Siksi raakapisteitä palautetaan
 * väliin, kun aikaväli ylittää `rajaV` vuotta tai `osuus`-osan
 * vanhemmasta ajasta.
 */
function tihennaAjoilla(raaka, indeksit, rajaV, osuus) {
  const ulos = [indeksit[0]];
  for (let n = 1; n < indeksit.length; n += 1) {
    const ia = ulos[ulos.length - 1];
    const ib = indeksit[n];
    let ed = raaka[ia];
    for (let j = ia + 1; j < ib; j += 1) {
      const p = raaka[j];
      const raja = Math.max(rajaV, osuus * ed.aika);
      if (ed.aika - p.aika > raja || (raaka[j + 1] && p.aika - raaka[j + 1].aika > raja)) {
        ulos.push(j);
        ed = p;
      }
    }
    ulos.push(ib);
  }
  return ulos;
}

/** Chaikin-tasoitus (päät kiinni); ajat liukuvat lineaarisesti. */
function chaikinTasoitus(pisteet, kierroksia) {
  let p = pisteet;
  for (let n = 0; n < kierroksia; n += 1) {
    if (p.length < 3) break;
    const u = [p[0]];
    for (let k = 0; k + 1 < p.length; k += 1) {
      const a = p[k];
      const b = p[k + 1];
      let dlon = b.lon - a.lon;
      while (dlon > 180) dlon -= 360;
      while (dlon < -180) dlon += 360;
      u.push({ lat: a.lat + 0.25 * (b.lat - a.lat), lon: kierraLon(a.lon + 0.25 * dlon), aika: a.aika + 0.25 * (b.aika - a.aika), virta: a.virta });
      u.push({ lat: a.lat + 0.75 * (b.lat - a.lat), lon: kierraLon(a.lon + 0.75 * dlon), aika: a.aika + 0.75 * (b.aika - a.aika), virta: b.virta });
    }
    u.push(p[p.length - 1]);
    p = u;
  }
  return p;
}

/** Ajat monotonisesti laskeviksi (kello kulkee yhteen suuntaan). */
function monotonisetAjat(pisteet) {
  for (let k = 1; k < pisteet.length; k += 1) {
    if (pisteet[k].aika > pisteet[k - 1].aika) pisteet[k].aika = pisteet[k - 1].aika;
  }
  return pisteet;
}

/**
 * VANAT KENTÄSTÄ.
 *
 * @param kentat laskeKentat-tulos (tarvitsee `edeltajat` ja `siirtymat`)
 * @param aineisto IHMISEN_MATKA_VANAT (js/linssit/ihmisen-matka-virrat.js)
 * @param ymparisto { maa, leveys, korkeus, pysakit } — pysäkit kotipesille
 * @returns { vanat: [{ tunnus, virta, paksuus, pisteet: [[lat, lon, aika]…] }], kotipesat }
 *          selkäranka ensin, sitten haarat aineiston järjestyksessä ja
 *          Tyynenmeren nauhat sellaisinaan.
 */
export function johdaVanat(kentat, aineisto, {
  maa, leveys = RUUDUKON_LEVEYS, korkeus = RUUDUKON_KORKEUS, pysakit = null,
} = {}) {
  const edeltajat = kentat?.edeltajat ?? [];
  if (!edeltajat.length || !aineisto || !maa) return { vanat: [], kotipesat: [] };
  const siirtymat = kentat.siirtymat ?? [];
  const kentanVirrat = new Map(edeltajat.map((k) => [k.tunnus, k]));
  const runko = edeltajat[0];
  const y = aineisto.yksinkertaistus ?? {};
  const dpKm = y.dpKm ?? 60;
  const aikaV = y.aikaV ?? 1500;
  const aikaOsuus = y.aikaOsuus ?? 0.06;
  const kierroksia = y.chaikin ?? 2;
  const haaranEroKm = y.haaranEroKm ?? 100;
  const ymparisto = { maa, leveys, korkeus };
  const vanat = [];

  const johda = ({ tunnus, virta, paate, paksuus }, katkaise) => {
    const raaka = edeltajapolku(kentanVirrat, siirtymat, runko, virta, paate.lat, paate.lon, ymparisto);
    if (raaka.length < 2) return;
    /*
     * HAARAN KATKAISU: haara jakaa rungon kanssa alkupään (australia
     * kulkee Omosta Intiaan samoja ruutuja kuin selkäranka, ja
     * Amerikkojen haarat koko matkan Arabiasta Beringiaan). Haara
     * alkaa siitä kärjestä, jossa se VIIMEKSI on `haaranEroKm`:n
     * päässä jostakin jo johdetusta PAKSUMMASTA vanasta — se kärki jää
     * liitokseksi, ja sen jälkeen haara kulkee omaa linjaansa.
     *
     * Miksi viimeinen lähellä eikä ensimmäinen kaukana (mitattu
     * 6.9.2026): tasoitettu runko kaartaa paikoin yli 100 km raa'an
     * polun ohi, ja yksi tällainen yksittäinen poikkeama heti
     * liitoksen jälkeen katkaisisi haaran liian aikaisin — Brasilian
     * ja Grönlannin vanat piirtyivät silloin selkärangan päälle
     * Arabiasta Beringiaan asti (135–175 päällekkäistä kärkeä).
     */
    let alku = 0;
    if (katkaise) {
      const paksummat = vanat.filter((v) => v.paksuus > paksuus);
      if (paksummat.length) {
        let viimeLahella = -1;
        for (let k = 0; k < raaka.length; k += 1) {
          if (lahellaVanoja(raaka[k], paksummat, haaranEroKm)) viimeLahella = k;
        }
        if (viimeLahella >= raaka.length - 2) return; // haara kulkee kokonaan rungon päällä
        alku = Math.max(0, viimeLahella);
      }
    }
    const osa = raaka.slice(alku);
    if (osa.length < 2) return;
    const indeksit = tihennaAjoilla(osa, dpIndeksit(osa, dpKm), aikaV, aikaOsuus);
    const karjet = monotonisetAjat(chaikinTasoitus(indeksit.map((k) => ({ ...osa[k] })), kierroksia));
    vanat.push({
      tunnus,
      virta,
      paksuus,
      pisteet: karjet.map((p) => [+p.lat.toFixed(3), +kierraLon(p.lon).toFixed(3), Math.round(p.aika)]),
    });
  };

  if (aineisto.selkaranka) johda({ tunnus: 'selkaranka', ...aineisto.selkaranka }, false);
  for (const haara of aineisto.haarat ?? []) johda(haara, true);

  // Tyynenmeren nauhat ovat jo polylinjoja aikoineen: merivirta nauhana.
  if (aineisto.nauhat) {
    const nauhaVirta = edeltajat.find((k) => k.tunnus === aineisto.nauhat);
    (nauhaVirta?.nauhat ?? []).forEach((n, k) => {
      vanat.push({
        tunnus: `${aineisto.nauhat}-${k + 1}`,
        virta: aineisto.nauhat,
        paksuus: aineisto.nauhanPaksuus ?? 2,
        pisteet: n.pisteet.map(([lat, lon, aika]) => [lat, lon, aika]),
      });
    });
  }

  /*
   * KOTIPESÄT (suunnitelman 2.1.2): Afrikassa on kolme toisistaan
   * riippumatonta lähdettä, eikä niiden välille piirretä linjaa —
   * kentän ajat sen varrella eivät ole monotonisia, joten linja olisi
   * keksitty muuttoliike. Ne näytetään pehmeäreunaisina laikkuina,
   * jotka syttyvät pysäkin hetkellä.
   */
  const kotipesat = [];
  for (const pesa of aineisto.kotipesat ?? []) {
    const t = (pysakit ?? []).find((s) => s.tunnus === pesa.tunnus);
    if (!t) continue;
    kotipesat.push({ tunnus: pesa.tunnus, lat: t.lat, lon: t.lon, aika: t.vuosiaSitten, sade: pesa.sade ?? 350 });
  }
  return { vanat, kotipesat };
}

/* ---------------------------------------------------------- kaikki */

/**
 * Ylityksen saapumisaika lähtöpään ajasta: lähtö aikaisintaan ikkunan
 * avautuessa, ikkunan sulkeuduttua kiinni (0). Vuosia sitten.
 */
export function ylityksenSaapuminen(aikaA, [avautuu, sulkeutuu], kesto = 0) {
  if (!(aikaA > 0)) return 0;
  const lahto = Math.min(aikaA, avautuu);
  if (lahto < sulkeutuu) return 0;
  return lahto - kesto;
}

/**
 * KOKO KAAREN KENTÄT: virrat järjestyksessä (myöhempi saa lukea
 * aiemman kentän `lahteetToisesta`-lähteillä), sammuva läikkä ja vanhan
 * väestön alue. Palauttaa piirtäjälle kaiken, mitä ruudun väri vaatii.
 *
 * @param aineisto { virrat, retki, vanha } (js/linssit/ihmisen-matka-virrat.js)
 * @param ymparisto { maa, siemen }
 */
export function laskeKentat(aineisto, ymparisto) {
  let tulos = null;
  for (const vaihe of laskeKentatVaiheittain(aineisto, ymparisto)) tulos = vaihe;
  return tulos.kentat;
}

/**
 * Sama laskenta VAIHEITTAIN: generaattori tuottaa virran kerrallaan
 * ({ vaihe, virta, kentat }), viimeisessä tuotoksessa `kentat` on koko
 * tulos. Selain ajaa vaiheet setTimeout-paloissa avausjakson mustan
 * peitteen aikana, jottei yksi 300–500 ms:n laskenta jäädytä
 * kirjoituskonetta eikä nappia (suunnitelman luku 7.1).
 */
export function* laskeKentatVaiheittain({ virrat, retki = null, vanha = null }, {
  maa, siemen = 1, leveys = RUUDUKON_LEVEYS, korkeus = RUUDUKON_KORKEUS,
}) {
  const rannikko = rannikkoMaski(maa, leveys, korkeus);
  const ymparisto = { maa, rannikko, leveys, korkeus, siemen };
  const kentat = [];
  const kentta = new Map();
  const edeltajat = [];
  const siirtymat = [];
  for (const virta of virrat) {
    const lahteet = [...(virta.lahteet ?? [])];
    for (const l of virta.lahteetToisesta ?? []) {
      const toinen = kentta.get(l.virta);
      const i = toinen ? lahinMaa(maa, l.lue.lat, l.lue.lon, 4, leveys, korkeus) : -1;
      const aika = i >= 0 ? ylityksenSaapuminen(toinen.aika[i], l.ikkuna, l.kesto) : 0;
      if (aika > 0) {
        lahteet.push({ nimi: l.nimi, lat: l.lat, lon: l.lon, aika });
        /*
         * SIIRTYMÄ virrasta toiseen (Beringia): kohderuudun edeltäjä
         * ei ole tässä kentässä vaan toisen virran lukupisteessä.
         * Vana hyppää siitä toiseen kenttään (johdaVanat).
         */
        siirtymat.push({
          tunnus: virta.tunnus,
          kohde: lahinMaa(maa, l.lat, l.lon, 3, leveys, korkeus),
          virta: l.virta,
          lue: i,
        });
      }
    }
    const tulos = laskeVirta({ ...virta, lahteet }, ymparisto);
    kentta.set(virta.tunnus, tulos);
    kentat.push({ tunnus: virta.tunnus, ...tulos });
    edeltajat.push({
      tunnus: virta.tunnus,
      aika: tulos.aika,
      edeltaja: tulos.edeltaja,
      nauhaPiste: tulos.nauhaPiste,
      nauhaNro: tulos.nauhaNro,
      nauhat: virta.nauhat ?? [],
    });
    yield { vaihe: virta.tunnus, kentat: null };
  }
  const yhdiste = yhdistaVirrat(kentat, leveys * korkeus);
  const retkiKentta = retki ? laskeVirta(retki, ymparisto).aika : null;
  // Vanhan väestön alue pehmeällä reunalla (paino 0…1), vain maalla.
  const vanhaMaski = vanha
    ? laatikkoPehmea(vanha.alue, {
      reuna: vanha.reuna ?? 3, siemen: siemen + 41, pehmeys: vanha.pehmeys ?? 2, leveys, korkeus, maa,
    })
    : null;
  yield { vaihe: 'valmis', kentat: { ...yhdiste, retki: retkiKentta, vanha: vanhaMaski, rannikko, edeltajat, siirtymat } };
}
