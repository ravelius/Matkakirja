#!/usr/bin/env node
/*
 * RAJAVIIVOJEN KORKEUS NATIIVIPELILLE (Karttaseppä 25.9.2026, Fablen tilaus
 * omistajan päätöksestä 25.9.: natiivi piirtää rannat ja rajat omana
 * viivaverkkonaan webin vektorisarjasta, ja korkeuskertoimella nostettu
 * maasto peittää maan pintaan piirretyn viivan).
 *
 *   node tools/maasto/vie-rajakorkeudet.mjs --ulos <kansio>
 *        [--lahde https://media.matkakirja.app/julisteet/pallo/vektorit/2026-09-21-gshhs/ | <kansio>]
 *        [--lajit rajat] [--kopioi rannikko] [--tasot 0-4] [--alue lon0,lat0,lon1,lat1]
 *        [--dem <glo30>] [--dem90 <glo90>] [--sse 2] [--versio 2026-09-25-gshhs-korkeus]
 *
 * === TIEDOSTOMUOTO (Natiivisepän lukija, proto natiiviseppa/loydos46
 *     3880bf4, Vektorisolut.Pura) =====================================
 *
 * Sama sarja kuin webin (tee-pallovektorit.mjs): luettelo.json ja
 * <laji>/l<k>/<sarake>_<rivi>.bin. Korkeudellisen lajin luettelossa on
 * "korkeus": true (lajilla ja jokaisella tasolla), ja solun viiva on
 *
 *   int32 n, int32 lon·1e4, int32 lat·1e4, int16 h0,
 *   (n−1) × (int16 dlon, int16 dlat, int16 h)
 *
 * little-endian. lon/lat ja deltat ovat TAVULLEEN lähteen deltat (sama
 * viivajako, samat katkot); h on ABSOLUUTTINEN korkeus metreinä (ei delta).
 * Lajit, joille korkeutta ei lasketa (--kopioi, esim. rannikko), kopioidaan
 * lähteestä sellaisinaan ilman lippua, jotta natiivi voi vaihtaa koko
 * sarjan yhdellä versiopolulla. Uusi sarja kuuluu OMAAN versiopolkuunsa
 * (julisteet/pallo/vektorit/<versio>/) — webin sarja pysyy ennallaan.
 *
 * === MITÄ h TARKOITTAA ================================================
 *
 * Natiivin maasto on quantized-mesh `julisteet/maasto/2026-09-24-maailma`
 * (tee-maasto.mjs). Tason z laatan verkko on RTIN-harvennettu 65 × 65
 * -ruudukosta, jonka näytteet ovat MAAILMANHILASSA lon = −180 + i·s,
 * lat = −90 + j·s, s = 180 / 2^z / 64, ja näyte on `dem.korkeus(lon, lat, s)`
 * (sama GLO-30/GLO-90-valinta, sama overview). RTIN-kolmiot ovat
 * puolisolujen yhdisteitä, joten verkko on jokaisessa puolisolussa
 * lineaarinen sen kolmen ruudukkopisteen välillä, ja pisteessä p:
 *
 *     verkko(p) ≤ max(solun neljä kulmanäytettä) + nousu(z)
 *
 * nousu(z) = RTIN:n suurin nousu ruudukon yli, rajattu RTIN_KERROIN ×
 * kynnys(z) (kynnys = max(0,5; 77 067 m / 2^z · 0,5), sama kuin teeLaatta).
 * Tämä on pisteen yläraja B(p). JANAN yläraja J on B:n maksimi koko janan
 * matkalta (näytteet kolmasosan solun välein). Pisteen h on
 *
 *     h_i = max(B_i, J_{i−1}, J_i)
 *
 * eli Fablen "maksimi harvennetun janan matkalta": natiivi interpoloi h:n
 * janan päiden välillä lineaarisesti, ja kun molemmat päät ovat janan
 * maksimin yllä, jana ei painu harjanteen alle millään kohdalla (paitsi
 * jänteen kaarevuuden verran, jonka natiivi hoitaa pilkkomalla janat
 * 0,1°:n paloihin).
 *
 * SAATAVUUS: syvä taso on olemassa vain osassa maailmaa (maailma-ajo:
 * z0–z10 koko maailma, z7+ vain maalaatat, z11–z12 vain Euroopan laatikko).
 * Puuttuvan laatan kohdalla Cesium näyttää emolaatan verkkoa, joten B
 * luetaan syvimmältä olemassa olevalta tasolta (`tehokasTaso`), samoilla
 * säännöillä kuin layer.jsonin available.
 *
 * === MILLÄ MAASTOTASOLLA ============================================
 *
 * Vektoritaso k on käytössä tiheysvälillä tol[k]·D ≤ 0,5 < tol[k−1]·D (D =
 * laitepikseliä astetta kohti, web `vektoritaso`). Cesium näyttää tason z,
 * jolla geometrinen virhe 77 067 m / 2^z mahtuu SSE-pikseliin (natiivi:
 * Cesium3DTileset 16 / 8 = 2 px, KarttaKerrokset.cs):
 *
 *     z(D) = ceil(log2(77 067 · D / (SSE · 111 320)))
 *
 * Tason k korkeus lasketaan tasolla z(Dmax[k]) eli TARKIMMALLA maastolla,
 * jota ruudun keskellä näytetään tämän vektoritason aikana: l0 z1, l1 z3,
 * l2 z5, l3 z6, l4 z12 (Euroopan ulkopuolella z10). Kauempana ja
 * loitommalla näkyvä karkeampi verkko poikkeaa tästä enintään oman
 * SSE:nsä verran (≈ 2 px), ja sen hoitaa natiivin syvyysnosto
 * (Vektorikerros.NostoM + NostoOsuus × etäisyys). Yksi h per piste ei
 * voi olla yhtä aikaa tarkka lähellä ja varma kaukana; tarkin taso valittiin,
 * jotta viiva ei leiju lähikuvassa.
 *
 * KORKEUDEN NOLLA on sama kuin maastolaatoissa (Copernicus: EGM2008-geoidi,
 * jota tee-maasto ei muunna ellipsoidille — Cesium lukee sen ellipsoidin
 * korkeutena), joten viiva ja maasto ovat samassa järjestelmässä.
 * Korkeuskerroin (KorkeusKerroin.cs: p' = p + n·max(h, 0)·(k − 1)) on
 * lineaarinen, joten yläraja pätee myös liioitellulle verkolle.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  CESIUM_TASO0_VIRHE, avaaLahteet, laattaOnMaalla, tasonLaatat, tasonSuunnitelma,
} from './tee-maasto.mjs';

/** Näytteitä laatan sivulla (tee-maasto --ruudukko 65). */
export const RUUDUKKO = 65;
/** Metriä leveysastetta kohti (pikselin koko metreinä = 111 320 / D). */
const M_ASTE = 111320;
/**
 * RTIN:n suurin nousu ruudukon yli suhteessa kynnykseen. Martini-tyyppinen
 * virhe mittaa keskipisteen poikkeaman oman hypotenuusan keskiarvosta,
 * joten syvällä kolmion sisällä poikkeamat voivat kasautua kynnyksen yli.
 * Mitattu 25.9.2026 oikeasta DEM:stä samalla koodilla kuin maastolaatat
 * (1 793 laattaa, z4–z12: Alpit, Pyreneet, Norja, Kreikka, Kaukasus,
 * Himalaja, Andit): nousu kulmanäytteiden yli enintään 1,54 × kynnys,
 * tyypillisesti 1,1–1,4. Kerroin 2 jättää varaa; metreinä z12 19 m,
 * z10 75 m, z6 1,2 km (tasolla, jolla pikseli on ~0,9 km).
 */
export const RTIN_KERROIN = 2;

/** Oletukset = maailma-ajo 2026-09-24-maailma (maasto-poltto/aja-maailma.sh). */
export const MAASTO = {
  versio: '2026-09-24-maailma',
  alue: [-25, 34, 45, 72],
  maailma: 10,
  vainMaaAlkaen: 7,
  zMax: 12,
};
export const OLETUSLAHDE = 'https://media.matkakirja.app/julisteet/pallo/vektorit/2026-09-21-gshhs/';
export const DEM30 = '/Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/dem/copernicus-glo30';
export const DEM90 = '/Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/dem/copernicus-glo90';

/** Tason z näyteväli asteina. */
export const naytevali = (z, n = RUUDUKKO) => 180 / 2 ** z / (n - 1);
/** RTIN-kynnys tasolla z (tee-maasto teeLaatta). */
export const rtinKynnys = (z) => Math.max(0.5, (CESIUM_TASO0_VIRHE / 2 ** z) * 0.5);

/**
 * Cesiumin näyttämä maastotaso tiheydellä D (laitepikseliä astetta kohti):
 * ensimmäinen z, jolla geometrinen virhe ≤ SSE pikseliä.
 */
export function maastotasoTiheydelle(D, sse = 2, zMax = MAASTO.zMax) {
  if (!(D > 0)) return 0;
  if (!Number.isFinite(D)) return zMax;
  const z = Math.ceil(Math.log2((CESIUM_TASO0_VIRHE * D) / (sse * M_ASTE)) - 1e-9);
  return Math.max(0, Math.min(zMax, z));
}

/** Vektoritason k tiheysväli [Dmin, Dmax] (web vektoritaso). */
export function vektoritasonTiheys(lodit, k, teravyys = 0.5) {
  const dMin = k > 0 && lodit[k - 1] > 0 ? teravyys / lodit[k - 1] : 0;
  const dMax = lodit[k] > 0 ? teravyys / lodit[k] : Infinity;
  return [dMin, dMax];
}

/** Vektoritason k maastotaso: tarkin, joka näkyy tason tiheysvälillä. */
export function vektoritasonMaasto(lodit, k, { sse = 2, teravyys = 0.5, zMax = MAASTO.zMax } = {}) {
  return maastotasoTiheydelle(vektoritasonTiheys(lodit, k, teravyys)[1], sse, zMax);
}

/**
 * Laatan saatavuus maastossa. Samat säännöt kuin layer.jsonin available
 * (tee-maasto kerroksenKuvaus): tasot ≤ maailma koko maailmalle, syvemmät
 * alueen laatikkoon, vain-maa-tasoilla vain DEM-ruutua leikkaavat.
 */
export function saatavuus({
  alue = MAASTO.alue, maailma = MAASTO.maailma, vainMaaAlkaen = MAASTO.vainMaaAlkaen,
  zMax = MAASTO.zMax, onRuutu,
}) {
  const suunnitelmat = [];
  for (let z = 0; z <= zMax; z += 1) {
    const s = tasonSuunnitelma(z, { alue, maailma, vainMaaAlkaen });
    suunnitelmat.push({ ...s, laatat: tasonLaatat(z, s.alue) });
  }
  const muisti = new Map();
  const onLaatta = (z, x, y) => {
    const s = suunnitelmat[z];
    if (!s || x < s.laatat.x0 || x > s.laatat.x1 || y < s.laatat.y0 || y > s.laatat.y1) return false;
    if (!s.vainMaa) return true;
    const avain = `${z}/${x}/${y}`;
    let v = muisti.get(avain);
    if (v === undefined) { v = laattaOnMaalla(z, x, y, onRuutu); muisti.set(avain, v); }
    return v;
  };
  /** Syvin olemassa oleva taso ≤ z pisteessä (lon, lat). */
  const tehokasTaso = (z, lon, lat) => {
    for (let t = Math.min(z, zMax); t > 0; t -= 1) {
      const koko = 180 / 2 ** t;
      const x = Math.min(2 ** (t + 1) - 1, Math.max(0, Math.floor((lon + 180) / koko)));
      const y = Math.min(2 ** t - 1, Math.max(0, Math.floor((lat + 90) / koko)));
      if (onLaatta(t, x, y)) return t;
    }
    return 0;
  };
  return { onLaatta, tehokasTaso };
}

/**
 * Korkeuden yläraja tasolla z: `piste(z, lon, lat)` ja `jana(z, …)` (m, ei
 * pyöristetty). `dem.korkeus(lon, lat, vali)` kuten tee-maastossa.
 * Kulmanäytteet välimuistissa (viereiset pisteet ja janat jakavat solut).
 */
export function ylaraja(dem, tehokasTaso, { n = RUUDUKKO, kerroin = RTIN_KERROIN } = {}) {
  const naytteet = new Map();
  const nayte = (z, i, j, s) => {
    const avain = `${z}/${i}/${j}`;
    let v = naytteet.get(avain);
    if (v === undefined) {
      if (naytteet.size > 4e6) naytteet.clear();
      v = dem.korkeus(-180 + i * s, -90 + j * s, s);
      naytteet.set(avain, v);
    }
    return v;
  };
  /** Solun (i, j) tasolla t kulmien maksimi + RTIN-nousu. */
  const solu = (t, i, j) => {
    const s = naytevali(t, n);
    const m = Math.max(nayte(t, i, j, s), nayte(t, i + 1, j, s), nayte(t, i, j + 1, s), nayte(t, i + 1, j + 1, s));
    return m + kerroin * rtinKynnys(t);
  };
  const paikka = (z, lon, lat) => {
    const t = tehokasTaso(z, lon, lat);
    const s = naytevali(t, n);
    return [t, Math.floor((lon + 180) / s), Math.floor((lat + 90) / s)];
  };
  return {
    piste(z, lon, lat) { const [t, i, j] = paikka(z, lon, lat); return solu(t, i, j); },
    /**
     * Janan yläraja: näytteet kolmasosan solun välein päistä päihin, joten
     * askel ei koskaan hyppää solun yli. Kun jana vaihtaa solua kulman
     * kautta (sekä i että j muuttuvat), mukaan otetaan myös molemmat
     * sivusolut — jana hipoo toista niistä, eikä näytteistys sitä näe.
     */
    jana(z, lon0, lat0, lon1, lat1) {
      const s = naytevali(Math.max(tehokasTaso(z, lon0, lat0), tehokasTaso(z, lon1, lat1)), n);
      const pituus = Math.max(Math.abs(lon1 - lon0), Math.abs(lat1 - lat0));
      const askelia = Math.max(1, Math.min(200000, Math.ceil((3 * pituus) / s)));
      let m = -Infinity;
      let ed = null;
      for (let q = 0; q <= askelia; q += 1) {
        const u = q / askelia;
        const p = paikka(z, lon0 + (lon1 - lon0) * u, lat0 + (lat1 - lat0) * u);
        if (ed && ed[0] === p[0] && ed[1] === p[1] && ed[2] === p[2]) continue;
        m = Math.max(m, solu(...p));
        if (ed && ed[0] === p[0] && ed[1] !== p[1] && ed[2] !== p[2]) {
          m = Math.max(m, solu(p[0], ed[1], p[2]), solu(p[0], p[1], ed[2]));
        }
        ed = p;
      }
      return m;
    },
  };
}

/* ---------------- koodaus ja purku ---------------------------------- */

const int16 = (v) => Math.max(-32768, Math.min(32767, Math.ceil(v)));

/**
 * Lähteen deltatiedosto (tee-pallovektorit deltakoodaa) korkeudelliseksi.
 * Koordinaatit kopioidaan kokonaislukuina, joten viivat ovat tavulleen
 * samat. `korkeudet(pisteet)` saa viivan [lon, lat, …] asteina ja palauttaa
 * n korkeutta (m).
 *
 * @returns {{ puskuri: Buffer, viivoja: number, pisteita: number, hMin: number, hMax: number }}
 */
export function lisaaKorkeudet(lahde, korkeudet) {
  const d = new DataView(lahde.buffer, lahde.byteOffset, lahde.byteLength);
  const osat = [];
  let o = 0; let pisteita = 0; let hMin = Infinity; let hMax = -Infinity;
  while (o + 12 <= d.byteLength) {
    const n = d.getInt32(o, true);
    const x0 = d.getInt32(o + 4, true); const y0 = d.getInt32(o + 8, true);
    o += 12;
    const dx = new Int16Array(n); const dy = new Int16Array(n);
    const pisteet = new Float64Array(n * 2);
    let x = x0; let y = y0;
    pisteet[0] = x / 1e4; pisteet[1] = y / 1e4;
    for (let i = 1; i < n; i += 1) {
      dx[i] = d.getInt16(o, true); dy[i] = d.getInt16(o + 2, true); o += 4;
      x += dx[i]; y += dy[i];
      pisteet[2 * i] = x / 1e4; pisteet[2 * i + 1] = y / 1e4;
    }
    const h = korkeudet(pisteet);
    const b = Buffer.alloc(14 + (n - 1) * 6);
    b.writeInt32LE(n, 0); b.writeInt32LE(x0, 4); b.writeInt32LE(y0, 8);
    for (let i = 0; i < n; i += 1) {
      const v = int16(h[i]);
      if (v < hMin) hMin = v;
      if (v > hMax) hMax = v;
      if (i === 0) { b.writeInt16LE(v, 12); continue; }
      const p = 14 + (i - 1) * 6;
      b.writeInt16LE(dx[i], p); b.writeInt16LE(dy[i], p + 2); b.writeInt16LE(v, p + 4);
    }
    osat.push(b);
    pisteita += n;
  }
  if (o !== d.byteLength) throw new Error(`lähdetiedosto katkeaa: ${o} / ${d.byteLength} tavua`);
  return { puskuri: Buffer.concat(osat), viivoja: osat.length, pisteita, hMin, hMax };
}

/**
 * Purkaa korkeudellisen solun: viivat Float64Array [lon, lat, h, …].
 * Sama logiikka kuin natiivin Vektorisolut.Pura(b, korkeus: true).
 */
export function puraKorkeusdelta(puskuri) {
  const d = puskuri instanceof ArrayBuffer
    ? new DataView(puskuri)
    : new DataView(puskuri.buffer, puskuri.byteOffset, puskuri.byteLength);
  const viivat = [];
  let o = 0;
  while (o + 14 <= d.byteLength) {
    const n = d.getInt32(o, true);
    let x = d.getInt32(o + 4, true); let y = d.getInt32(o + 8, true);
    const v = new Float64Array(n * 3);
    v[0] = x / 1e4; v[1] = y / 1e4; v[2] = d.getInt16(o + 12, true);
    o += 14;
    for (let i = 1; i < n; i += 1) {
      x += d.getInt16(o, true); y += d.getInt16(o + 2, true);
      v[3 * i] = x / 1e4; v[3 * i + 1] = y / 1e4; v[3 * i + 2] = d.getInt16(o + 4, true);
      o += 6;
    }
    viivat.push(v);
  }
  return viivat;
}

/**
 * Viivan korkeudet tasolla z: h_i = max(B_i, J_{i−1}, J_i).
 * @param {Float64Array} pisteet [lon, lat, …]
 */
export function viivanKorkeudet(pisteet, z, raja) {
  const n = pisteet.length / 2;
  const h = new Float64Array(n);
  for (let i = 0; i < n; i += 1) h[i] = raja.piste(z, pisteet[2 * i], pisteet[2 * i + 1]);
  for (let i = 0; i < n - 1; i += 1) {
    const j = raja.jana(z, pisteet[2 * i], pisteet[2 * i + 1], pisteet[2 * i + 2], pisteet[2 * i + 3]);
    if (j > h[i]) h[i] = j;
    if (j > h[i + 1]) h[i + 1] = j;
  }
  return h;
}

/* ---------------- ajo ----------------------------------------------- */

async function lueLahde(lahde, polku) {
  if (/^https?:/.test(lahde)) {
    const r = await fetch(new URL(polku, lahde));
    if (!r.ok) throw new Error(`${polku}: HTTP ${r.status}`);
    return Buffer.from(await r.arrayBuffer());
  }
  return readFileSync(join(lahde, polku));
}

/** Solun (avain `s_r`, koko `solu` astetta) laatikko [lon0, lat0, lon1, lat1]. */
export function solunLaatikko(avain, solu) {
  const [s, r] = avain.split('_').map(Number);
  return [-180 + s * solu, 90 - (r + 1) * solu, -180 + (s + 1) * solu, 90 - r * solu];
}

const leikkaa = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];

export function lueAsetukset(argv) {
  const arvo = (nimi, oletus) => { const i = argv.indexOf(`--${nimi}`); return i >= 0 ? argv[i + 1] : oletus; };
  const tasot = arvo('tasot', '0-4').split('-').map(Number);
  return {
    lahde: arvo('lahde', OLETUSLAHDE),
    ulos: arvo('ulos'),
    versio: arvo('versio', `${new Date().toISOString().slice(0, 10)}-gshhs-korkeus`),
    lajit: arvo('lajit', 'rajat').split(',').filter(Boolean),
    kopioi: arvo('kopioi', '').split(',').filter(Boolean),
    tasot: [tasot[0], tasot[1] ?? tasot[0]],
    alue: arvo('alue') ? arvo('alue').split(',').map(Number) : null,
    demKansio: arvo('dem', DEM30),
    dem90Kansio: arvo('dem90', DEM90),
    sse: Number(arvo('sse', 2)),
    teravyys: Number(arvo('teravyys', 0.5)),
  };
}

/**
 * Koko ajo. `--alue` rajaa laskettavat solut (koeajo); luettelo kirjaa
 * silloin vain lasketut solut ja kentän `alue`, eikä sarjaa ole tarkoitettu
 * ämpäriin.
 */
export async function aja(argv, loki = console.log) {
  const a = lueAsetukset(argv);
  if (!a.ulos) throw new Error('käyttö: --ulos <kansio> [--lahde url|kansio] [--lajit rajat] [--kopioi rannikko] [--tasot 0-4] [--alue lon0,lat0,lon1,lat1] [--versio]');
  const lahde = a.lahde.endsWith('/') || !/^https?:/.test(a.lahde) ? a.lahde : `${a.lahde}/`;
  const lahdeLuettelo = JSON.parse(await lueLahde(lahde, 'luettelo.json'));
  const { dem, maininta } = avaaLahteet({ demKansio: a.demKansio, dem90Kansio: a.dem90Kansio });
  const { tehokasTaso } = saatavuus({ onRuutu: dem.onRuutu });
  const raja = ylaraja(dem, tehokasTaso);
  const luettelo = {
    ...lahdeLuettelo,
    versio: a.versio,
    korkeus: {
      lahde: `${lahdeLuettelo.versio} (${lahde})`,
      maasto: { ...MAASTO, ruudukko: RUUDUKKO, rtinKerroin: RTIN_KERROIN },
      sse: a.sse,
      teravyys: a.teravyys,
      kaava: 'h_i = max(B_i, J_{i-1}, J_i), B = maastolaatan verkon yläraja tasolla z (tools/maasto/vie-rajakorkeudet.mjs)',
      maininta,
      ...(a.alue ? { alue: a.alue } : {}),
    },
    lajit: {},
  };
  const alku = Date.now();
  for (const laji of Object.keys(lahdeLuettelo.lajit)) {
    const laske = a.lajit.includes(laji);
    if (!laske && !a.kopioi.includes(laji)) continue;
    luettelo.lajit[laji] = laske ? { korkeus: true, tasot: [] } : { tasot: [] };
    for (const taso of lahdeLuettelo.lajit[laji].tasot) {
      if (laske && (taso.k < a.tasot[0] || taso.k > a.tasot[1])) continue;
      const z = vektoritasonMaasto(lahdeLuettelo.lodit, taso.k, a);
      const t0 = Date.now();
      const kansio = join(a.ulos, laji, `l${taso.k}`);
      mkdirSync(kansio, { recursive: true });
      const tiedostot = {};
      let tavuja = 0; let pisteita = 0; let hMax = -Infinity;
      for (const avain of Object.keys(taso.tiedostot).sort()) {
        if (a.alue && !leikkaa(solunLaatikko(avain, taso.solu), a.alue)) continue;
        const raaka = await lueLahde(lahde, `${laji}/l${taso.k}/${avain}.bin`);
        if (!laske) {
          writeFileSync(join(kansio, `${avain}.bin`), raaka);
          tiedostot[avain] = taso.tiedostot[avain];
          tavuja += raaka.length;
          continue;
        }
        const t = lisaaKorkeudet(raaka, (p) => viivanKorkeudet(p, z, raja));
        writeFileSync(join(kansio, `${avain}.bin`), t.puskuri);
        tiedostot[avain] = {
          tavua: t.puskuri.length, viivoja: t.viivoja, pisteita: t.pisteita, hMin: t.hMin, hMax: t.hMax,
          lahdeSha256: createHash('sha256').update(raaka).digest('hex'),
        };
        tavuja += t.puskuri.length; pisteita += t.pisteita; hMax = Math.max(hMax, t.hMax);
      }
      const uusi = laske
        ? { ...taso, korkeus: true, maastotaso: z, tiedostot, soluja: Object.keys(tiedostot).length }
        : { ...taso, tiedostot };
      luettelo.lajit[laji].tasot.push(uusi);
      const s = (Date.now() - t0) / 1000;
      loki(laske
        ? `${laji} l${taso.k}: maasto z${z}, ${Object.keys(tiedostot).length} solua, ${pisteita} pistettä, ${(tavuja / 1024).toFixed(0)} kt, hMax ${hMax} m, ${s.toFixed(1)} s`
        : `${laji} l${taso.k}: kopioitu ${Object.keys(tiedostot).length} solua, ${(tavuja / 1024).toFixed(0)} kt`);
    }
  }
  dem.sulje();
  writeFileSync(join(a.ulos, 'luettelo.json'), JSON.stringify(luettelo));
  writeFileSync(join(a.ulos, 'kansio.txt'), `julisteet/pallo/vektorit/${a.versio}/\n`);
  loki(`valmis ${((Date.now() - alku) / 1000).toFixed(0)} s → ${a.ulos} (ämpäriin julisteet/pallo/vektorit/${a.versio}/)`);
  return luettelo;
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  if (!existsSync(DEM90) && !process.argv.includes('--dem90')) console.error(`varoitus: ${DEM90} ei ole saatavilla`);
  try { await aja(process.argv.slice(2)); } catch (e) {
    if (!e.message.startsWith('käyttö')) throw e;
    console.error(e.message); process.exit(2);
  }
}
