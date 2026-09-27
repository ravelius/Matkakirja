/*
 * DELTA-LUOKITIN — MITKÄ LAATAT SISÄLTÄVÄT VETTÄ JA MITKÄ MAATA
 * (Karttaseppä 26.9.2026, omistajan pyyntö Fablen kautta: "delta-tila").
 *
 * === MIKSI TÄMÄ ON OLEMASSA =========================================
 *
 * Reseptin muutos koskee usein vain toista puolta kartasta: meren
 * syvyysliuku (resepti 2026-09-26, löydös 129) muuttaa vain vettä,
 * kermaharso tai rajat vain maata. Koko pyramidin uusintapoltto on silti
 * tunteja ja 93 000 laattaa, joista puolet on piirretty tavulleen samoiksi
 * kuin edellisessä versiossa. DELTA-POLTTO piirtää vain ne laatat, joihin
 * muutos voi osua, ja kopioi loput edellisestä versiosta palvelinkopiona
 * — samalla tavalla kuin paikkaus (tools/paikkaa-pyramidi.mjs) kopioi
 * laatikon ulkopuolen.
 *
 *   --delta meri   piirretään laatat, joiden alalla on YHTÄÄN vettä
 *   --delta maa    piirretään laatat, joiden alalla on YHTÄÄN maata
 *
 * Kaikki muu kopioidaan. Kehyksen paperimarginaalin laatat (kartta-alan
 * ulkopuoli marginaalin verran) eivät ole kumpaakaan, joten ne kopioidaan
 * aina.
 *
 * === MIKÄ ON VETTÄ: SAMA KUIN PIIRTOMOOTTORILLE =====================
 *
 * Luokitus lukee TÄSMÄLLEEN sen aineiston, josta piirtomoottori päättää
 * pikselin veden ja maan (tools/fokuskartta/maailmapiirto.js osio 1-3,
 * `merenAlallaRivilla` ja maski-AA:n `meriOsuus`): meren monikulmion
 * harvennetut renkaat (tools/fokuskartta/maailma.mjs meriRenkaat, SAMA
 * `--rannikon-harvennus`) ja isot järvet (maailma.mjs jarvet, samat
 * oletukset kuin keraaMaailma). Korkeusruudukon merimaski (MERIMASKI)
 * EI kelpaa: se on moottorissa enää vara, ja sen solu on 3′ tai tason
 * DEM-väli — kapea vuono jäisi siitä pois, vaikka moottori maalaa sen
 * vedeksi pikselin tarkkuudella.
 *
 * JÄRVI ON MOLEMPIA (VESI | MAA). Moottori maalaa ensin maan järven
 * alle ja vasta sitten peittävän järven päälle; patina taas lukee järven
 * matalakromaisena pintana vedeksi (tools/patina.mjs SYVYYS.kromaVali).
 * Järvilaatta piirretään siis kummassakin deltassa — muutama laatta,
 * eikä yhtään arvailua siitä, mikä passi mitäkin lukee.
 *
 * JOET EIVÄT OLE VETTÄ tässä mielessä: uoma on maan päälle vedetty viiva,
 * eikä meren syvyysrampin tai meren kohinan muutos koske sitä.
 *
 * === LAATTA LUOKITELLAAN KOKO ALALTAAN MARGINAALIN KANSSA ===========
 *
 * Laatta on "vettä sisältävä", jos vettä on sen alalla TAI marginaalin
 * päässä sen reunasta. Marginaali on se matka, jonka päästä naapurin
 * pikseli voi vielä muuttaa tämän laatan pikseliä:
 *
 *   REUNUS 32 px (generoi-laattapyramidi.mjs reunusTasolle): patinan
 *     suurin paikallinen ulottuma (SYVYYS.rantaVali 7, kohdistus 2,6,
 *     leviäminen 2 → 9, +16 pienennettyjen kenttien reunalle, pyöristys
 *     kahdeksaan). Se on suurin ulottuma koko pohjan piirrossa: juuri sen
 *     varassa laatta on tavulleen sama ajettiinpa se maailma-, alue- tai
 *     paikkausajossa (PAIKKAUS). Mikään muu passi ei lue kauempaa:
 *     `--maski-aa` on pikselin sisäinen peittosuhde, `--meri-kohina` ja
 *     `--syvyyskohina lauta` ovat pistekohtaisia kohinoita, ja
 *     korkeusnäyte on bilineaarinen oman solunsa sisällä.
 *   +2 px (DELTA_LISAMARGINAALI_PX): maski-AA:n sekapikseli ja
 *     pyöristys (rivin näytekohta y + 0,5, lohkon reuna).
 *
 * Marginaali annetaan PIKSELEINÄ, joten se on joka tasolla sama
 * suhteessa laattaan (laatta on aina 512 px) — patina on paperivakio.
 *
 * === MIKSI LAATTATASOLLA EIKÄ PIKSELITASOLLA =========================
 *
 * Laatat ovat häviöllistä webp:tä. Kooderi tekee koko kuvaa koskevia
 * valintoja (segmentit, suodattimen voima), joten jos yksikin laatan
 * pikseli muuttuu, uudelleen pakattu laatta voi erota lähteestä myös
 * muuttumattomien pikselien kohdalla. Siksi luokka on LAATAN ominaisuus
 * ja pallon sarjan delta johdetaan pyramidin laattojen riippuvuuksista
 * (tee-pallolaatat.mjs pallonDeltaSuunnitelma) eikä pikseleistä.
 *
 * === LASKENTA ======================================================
 *
 * Rivi kerrallaan: rivin kaistan (laatan korkeus + marginaali, leikattuna
 * kartta-alaan) leveysastealueelle osuvat rantajanat merkitsevät
 * sarakkeensa (VESI | MAA). Laatta, jota yksikään jana ei merkinnyt, on
 * koko alaltaan samaa lajia, ja sen laji ratkaistaan yhdellä
 * parillisuustestillä laatan keskeltä — samalla säännöllä kuin moottori
 * (säde pituusasteelta −180). Kehyksen janat (±180 ja navat, maailma.mjs
 * kehyspiste) eivät ole rantaa eivätkä merkitse, mutta ovat mukana
 * parillisuudessa kuten moottorissakin.
 */
import { createHash } from 'node:crypto';

export const VESI = 1;
export const MAA = 2;
/** Delta-lajit ja se luokkabitti, joka tekee laatasta piirrettävän. */
export const DELTA_LAJIT = Object.freeze({ meri: VESI, maa: MAA });
/** Maski-AA:n sekapikseli ja pyöristys REUNUKSEN päälle (ks. yllä). */
export const DELTA_LISAMARGINAALI_PX = 2;
/**
 * Tarkistusotos tasoa kohti: kopioitavia laattoja, jotka piirretään
 * silti uudella reseptillä ja joiden on oltava tavulleen lähteen
 * laattoja (paikkaa-pyramidi.mjs vertaa). Otos valitaan piirrettävän
 * alan REUNALTA — juuri sieltä, missä liian pieni marginaali tai
 * epäpuhdas muutos (esim. patina, joka lukee vaalean maan vedeksi)
 * näkyisi ensimmäisenä.
 */
export const DELTA_TARKISTUS_OLETUS = 4;

const RAD = Math.PI / 180;

/** Lajin bitti; tuntematon laji on virhe eikä hiljainen täysajo. */
export function deltaBitti(laji) {
  const b = DELTA_LAJIT[laji];
  if (!b) throw new Error(`--delta ${laji}: tunnetut lajit ${Object.keys(DELTA_LAJIT).join(', ')}`);
  return b;
}

/*
 * KEHYS EI OLE RANTAA (sama raja kuin maailma.mjs kehyspiste): meren
 * monikulmio on suljettu maailmankartan kehyksellä ±180:ssa ja navoilla.
 */
const kehyspiste = ([lon, lat]) => Math.abs(lon) >= 179.99 || lat >= 89.99 || lat <= -89.99;

/** [-180, 180) kuten moottorin NORMLON. */
const normLon = (lon) => ((((lon + 180) % 360) + 360) % 360) - 180;

/**
 * Janat typed-taulukoihin ja 1°:n leveysastekoreihin (kuten moottorin
 * `__meriReunat`). `rannikko` = kehysjanat pois; `parillisuus` =
 * vaakasuorat pois (ne eivät voi leikata leveyspiiriä).
 */
function kokoaJanat(renkaat, { rannikko }) {
  let n = 0;
  for (const r of renkaat) n += r.length;
  const lonA = new Float64Array(n); const latA = new Float64Array(n);
  const lonB = new Float64Array(n); const latB = new Float64Array(n);
  let k = 0;
  for (const r of renkaat) {
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const a = r[j]; const b = r[i];
      if (a[0] === b[0] && a[1] === b[1]) continue;
      if (rannikko && kehyspiste(a) && kehyspiste(b)) continue;
      if (!rannikko && a[1] === b[1]) continue;
      lonA[k] = a[0]; latA[k] = a[1]; lonB[k] = b[0]; latB[k] = b[1];
      k += 1;
    }
  }
  const korit = new Map();
  for (let i = 0; i < k; i += 1) {
    const c0 = Math.floor(Math.min(latA[i], latB[i]));
    const c1 = Math.floor(Math.max(latA[i], latB[i]));
    for (let c = c0; c <= c1; c += 1) {
      let l = korit.get(c);
      if (!l) { l = []; korit.set(c, l); }
      l.push(i);
    }
  }
  return {
    lonA, latA, lonB, latB, n: k, korit, nahty: new Int32Array(k), sukupolvi: 0,
  };
}

/** Janat, joiden leveysastealue leikkaa [latS, latN] (kukin kerran). */
function janatValilla(janat, latS, latN, kutsu) {
  janat.sukupolvi += 1;
  const sp = janat.sukupolvi;
  const {
    latA, latB, korit, nahty,
  } = janat;
  for (let c = Math.floor(latS); c <= Math.floor(latN); c += 1) {
    const l = korit.get(c);
    if (!l) continue;
    for (const i of l) {
      if (nahty[i] === sp) continue;
      nahty[i] = sp;
      if (Math.max(latA[i], latB[i]) < latS || Math.min(latA[i], latB[i]) > latN) continue;
      kutsu(i);
    }
  }
}

/** Leveyspiirin lat leikkauskohdat (pituusasteina, nousevasti). */
function leikkaukset(janat, lat) {
  const ulos = [];
  janatValilla(janat, lat, lat, (i) => {
    const ya = janat.latA[i]; const yb = janat.latB[i];
    if ((ya > lat) === (yb > lat)) return;
    ulos.push(janat.lonA[i] + ((lat - ya) / (yb - ya)) * (janat.lonB[i] - janat.lonA[i]));
  });
  return Float64Array.from(ulos).sort();
}

/** Parillisuus: pariton määrä leikkauksia säteellä −180…lon = sisällä. */
function sisalla(leik, lon) {
  const n = normLon(lon);
  let lo = 0; let hi = leik.length;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (leik[mid] < n) lo = mid + 1; else hi = mid; }
  return (lo & 1) === 1;
}

/**
 * Sarakkeet, jotka pikseliväli [p0, p1] kattaa kiertävällä tasolla
 * (leveys W, laatta L, viimeinen sarake voi olla vajaa); `f(c)` kerran
 * kutakin kohti (kierron yli mentäessä kahdessa pätkässä).
 */
function kaySarakkeet(p0, p1, W, L, sarakkeita, f) {
  if (!(p1 >= p0)) return;
  if (p1 - p0 >= W) { for (let c = 0; c < sarakkeita; c += 1) f(c); return; }
  const a = ((p0 % W) + W) % W;
  const b = a + (p1 - p0);
  const pala = (x0, x1) => {
    const c0 = Math.min(sarakkeita - 1, Math.floor(x0 / L));
    const c1 = Math.min(sarakkeita - 1, Math.floor(x1 / L));
    for (let c = c0; c <= c1; c += 1) f(c);
  };
  if (b < W) pala(a, b);
  else { pala(a, W - 1e-9); pala(0, b - W); }
}

/** Sama listana (testeille ja pallon riippuvuuksille). */
export function sarakkeetValilla(p0, p1, W, L, sarakkeita) {
  const ulos = new Set();
  kaySarakkeet(p0, p1, W, L, sarakkeita, (c) => ulos.add(c));
  return [...ulos];
}

/**
 * Pyramidin tason ruudukko luokittimelle: Miller-arkki samoilla kaavoilla
 * kuin generoi-laattapyramidi.mjs (laudanProjektio, laatanBbox) ja
 * tee-pallotekstuuri.mjs arkinPikseli. `geometria` = luettelon
 * { projektio, arkki, rajaus, laatta }; `taso` = { z, leveys, korkeus,
 * sarakkeita, riveja }.
 */
export function pyramidinRuudukko(geometria, taso) {
  const {
    projektio: p, arkki, rajaus, laatta: L = 512,
  } = geometria;
  const sk = p.leveys / (2 * Math.PI);
  const px = taso.leveys / arkki.w;
  const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
  const yP = millerY(p.pohjoinen);
  const lautaLat = (y) => (Math.atan(Math.exp(-(y / sk + yP) / 1.25)) - Math.PI / 4) / 0.4 / RAD;
  const yksikkoaAste = p.leveys / 360;
  return {
    z: taso.z,
    sarakkeita: taso.sarakkeita,
    riveja: taso.riveja,
    W: taso.leveys,
    H: taso.korkeus,
    L,
    pxAste: yksikkoaAste * px,
    xLon: (lon) => ((((lon - p.lon0) % 360) + 360) % 360) * yksikkoaAste * px - arkki.x * px,
    lonX: (x) => p.lon0 + (x / px + arkki.x) / yksikkoaAste,
    yLat: (lat) => ((millerY(lat) - yP) * sk - arkki.y) * px,
    latY: (y) => lautaLat(y / px + arkki.y),
    kartta: [(rajaus.y - arkki.y) * px, (rajaus.y + rajaus.h - arkki.y) * px],
    /*
     * KARTAN YLÄ- JA ALAREUNAN YLI ULOTTUVAT LAATAT OVAT VETTÄ (valvottu
     * koeajo 26.9.2026, Karttaseppä): arkin täyttö kartan rajauksen
     * ulkopuolella seuraa meren sävyä, joten 25 → 26 (vain meri) muutti
     * jokaisen tason ensimmäisen ja viimeisen rivin (z6: 31/31 laattaa),
     * vaikka niissä ei ole rantaa. Ilman tätä meren delta kopioisi ne
     * vanhoina. Maan deltassa ne kopioidaan kuten ennen.
     */
    ulkona: VESI,
  };
}

/**
 * Luokitin meren ja järvien renkaista.
 *
 * @param {object} a
 * @param {number[][][]} a.meri   meren monikulmion renkaat [[lon, lat], …]
 * @param {number[][][]} a.jarvet järvien renkaat
 */
export function luoLuokitin({ meri = [], jarvet = [] } = {}) {
  const ranta = kokoaJanat([...meri, ...jarvet], { rannikko: true });
  const meriP = kokoaJanat(meri, { rannikko: false });
  const jarviP = kokoaJanat(jarvet, { rannikko: false });

  /**
   * Ruudukon jokaisen laatan luokka (VESI | MAA -bitit, 0 = ei kumpaakaan).
   * `marginaaliPx` tason pikseleinä, `marginaaliAste` lisäksi asteina.
   */
  function luokitteleRuudukko(r, { marginaaliPx = 0, marginaaliAste = 0 } = {}) {
    const S = r.sarakkeita;
    const luokat = new Uint8Array(S * r.riveja);
    const merkitty = new Uint8Array(S);
    const M = marginaaliPx;
    const lisaX = M + marginaaliAste * r.pxAste;
    for (let rivi = 0; rivi < r.riveja; rivi += 1) {
      const y0 = rivi * r.L;
      const y1 = Math.min(r.H, (rivi + 1) * r.L);
      const o = rivi * S;
      if (r.ulkona && (y0 < r.kartta[0] || y1 > r.kartta[1])) {
        for (let c = 0; c < S; c += 1) luokat[o + c] |= r.ulkona;
      }
      const ya = Math.max(y0 - M, r.kartta[0]);
      const yb = Math.min(y1 + M, r.kartta[1]);
      if (!(yb > ya)) continue;
      const latN = r.latY(ya) + marginaaliAste;
      const latS = r.latY(yb) - marginaaliAste;
      merkitty.fill(0);
      janatValilla(ranta, latS, latN, (i) => {
        const la = ranta.latA[i]; const lb = ranta.latB[i];
        const oa = ranta.lonA[i]; const ob = ranta.lonB[i];
        let lo; let hi;
        if (la === lb) {
          lo = Math.min(oa, ob); hi = Math.max(oa, ob);
        } else {
          // Vain se osa janasta, joka on kaistan leveysasteilla.
          const t0 = (latS - la) / (lb - la);
          const t1 = (latN - la) / (lb - la);
          const ta = Math.max(0, Math.min(t0, t1));
          const tb = Math.min(1, Math.max(t0, t1));
          const u = oa + ta * (ob - oa); const v = oa + tb * (ob - oa);
          lo = Math.min(u, v); hi = Math.max(u, v);
        }
        const x = r.xLon(lo);
        kaySarakkeet(x - lisaX, x + (hi - lo) * r.pxAste + lisaX, r.W, r.L, S, (c) => { merkitty[c] = 1; });
      });
      const latT = r.latY((ya + yb) / 2);
      let meriLeik = null; let jarviLeik = null;
      for (let c = 0; c < S; c += 1) {
        if (merkitty[c]) { luokat[o + c] |= VESI | MAA; continue; }
        meriLeik = meriLeik ?? leikkaukset(meriP, latT);
        const xc = c * r.L + Math.min(r.L, r.W - c * r.L) / 2;
        const lon = r.lonX(xc);
        if (sisalla(meriLeik, lon)) { luokat[o + c] |= VESI; continue; }
        jarviLeik = jarviLeik ?? leikkaukset(jarviP, latT);
        luokat[o + c] |= sisalla(jarviLeik, lon) ? VESI | MAA : MAA;
      }
    }
    return luokat;
  }

  return { luokitteleRuudukko, janoja: ranta.n };
}

/** Luokitin aineistokansiosta (ne_10m_ocean + ne_10m_lakes), samat kutsut kuin keraaMaailma. */
export async function lataaLuokitin(kansio, { harvennus = 0.006 } = {}) {
  const { meriRenkaat, jarvet } = await import('./fokuskartta/maailma.mjs');
  const meri = meriRenkaat(kansio, { harvennus });
  let jarviRenkaat = [];
  try {
    jarviRenkaat = jarvet(kansio).flatMap((j) => j.renkaat);
  } catch {
    /* Ei järviaineistoa: moottorikaan ei piirrä järviä (aineisto.jarvet on tyhjä). */
    jarviRenkaat = [];
  }
  return luoLuokitin({ meri, jarvet: jarviRenkaat });
}

/** 1 = piirretään (lajin bitti luokassa), 0 = kopioidaan. */
export function deltaValinta(luokat, laji) {
  const bitti = deltaBitti(laji);
  const ulos = new Uint8Array(luokat.length);
  for (let i = 0; i < luokat.length; i += 1) ulos[i] = (luokat[i] & bitti) ? 1 : 0;
  return ulos;
}

/**
 * TARKISTUSOTOS: `n` kopioitavaa laattaa piirrettävän alan reunalta
 * (4-naapuri on piirrettävä), tasaisin välein rivijärjestyksestä.
 * Deterministinen ja koko tason geometriasta — sama joukko jokaisessa
 * shardissa, joten kukin shardi piirtää oman kaistansa osuuden.
 */
export function tarkistusotos(piirra, sarakkeita, riveja, n = DELTA_TARKISTUS_OLETUS) {
  if (!(n > 0)) return [];
  const ehdokkaat = [];
  for (let r = 0; r < riveja; r += 1) {
    for (let c = 0; c < sarakkeita; c += 1) {
      const i = r * sarakkeita + c;
      if (piirra[i]) continue;
      const naapuri = (c > 0 && piirra[i - 1]) || (c < sarakkeita - 1 && piirra[i + 1])
        || (r > 0 && piirra[i - sarakkeita]) || (r < riveja - 1 && piirra[i + sarakkeita]);
      if (naapuri) ehdokkaat.push(i);
    }
  }
  if (ehdokkaat.length <= n) return ehdokkaat;
  const ulos = [];
  for (let k = 0; k < n; k += 1) ulos.push(ehdokkaat[Math.floor(((k + 0.5) * ehdokkaat.length) / n)]);
  return ulos;
}

/**
 * Koko pyramidin delta-suunnitelma: jokaiselle tasolle luokat,
 * piirrettävät (1/0) ja tarkistusotos. `tiiviste` sitoo suunnitelman
 * luetteloon, jotta pallon sarja (tee-pallolaatat) voi todeta
 * laskeneensa SAMAN joukon kuin pyramidin poltto.
 */
export function pyramidinDeltaSuunnitelma({
  luokitin, geometria, tasot, laji, marginaaliPx, marginaaliAste = 0,
  tarkistus = DELTA_TARKISTUS_OLETUS,
}) {
  deltaBitti(laji);
  const hash = createHash('sha256');
  hash.update(`${laji}|${marginaaliPx}|${marginaaliAste}|${tarkistus}`);
  const ulos = [];
  for (const taso of [...tasot].sort((a, b) => a.z - b.z)) {
    const r = pyramidinRuudukko(geometria, taso);
    const luokat = luokitin.luokitteleRuudukko(r, { marginaaliPx, marginaaliAste });
    const piirra = deltaValinta(luokat, laji);
    const otos = tarkistusotos(piirra, taso.sarakkeita, taso.riveja, tarkistus);
    hash.update(`|z${taso.z}:${taso.sarakkeita}x${taso.riveja}:`);
    hash.update(piirra);
    hash.update(`:${otos.join(',')}`);
    ulos.push({
      z: taso.z, sarakkeita: taso.sarakkeita, riveja: taso.riveja, luokat, piirra, tarkistus: new Set(otos),
    });
  }
  return {
    laji, marginaaliPx, marginaaliAste, tarkistus, tasot: ulos, tiiviste: hash.digest('hex').slice(0, 16),
  };
}

/** Tason luvut: { kaikki, piirretaan, tarkistus, kopioidaan, vesi, maa, molemmat, ulkona }. */
export function tasonLuvut(t) {
  let piirretaan = 0; let vesi = 0; let maa = 0; let molemmat = 0; let ulkona = 0;
  for (let i = 0; i < t.piirra.length; i += 1) {
    piirretaan += t.piirra[i];
    const l = t.luokat ? t.luokat[i] : 0;
    if (l === (VESI | MAA)) molemmat += 1;
    else if (l === VESI) vesi += 1;
    else if (l === MAA) maa += 1;
    else ulkona += 1;
  }
  const kaikki = t.piirra.length;
  const tarkistus = t.tarkistus?.size ?? 0;
  return {
    kaikki, piirretaan, tarkistus, kopioidaan: kaikki - piirretaan, vesi, maa, molemmat, ulkona,
  };
}
