/*
 * PALLON VEKTORIVIIVAT — rantaviivat ja maiden rajat ämpäriin.
 *
 *   node tools/tee-pallovektorit.mjs --ne=<kansio> [--ulos=<kansio>]
 *        [--versio=2026-09-07a] [--lodit=0.1,0.03,0.008,0.004,0]
 *        [--solu=10] [--yksisolu=0.03] [--kuiva]
 *
 * OMISTAJAN LINJAUS (Raamattu, "PALLO LEVOSSA YHTA TERAVA KUIN
 * TASOKARTTA" › lisäys VEKTORIT SAMALLA, 6.9.2026 ilta: *"Tehdään se
 * vektori juttu nyt samalla"*): pallon pinnalle piirretään laattojen
 * päälle vektorikerros, jonka viiva on aina tasan tavoiteleveytensä
 * laitepikseleinä — levossa, liikkeessä ja zoomin joka portaalla.
 * Suunnitelma: docs/moduulit/pallon-vektoriviivat.md (erä V0 on tämä
 * työkalu; erä V1 on selainmoduuli js/pallovektorit.js).
 *
 * === MIKSI TÄSMÄLLEEN SAMA LÄHDE KUIN POLTETULLA VIIVALLA ==========
 *
 * Laattoihin poltettu rantaviiva tulee Natural Earthin ne_10m_ocean-
 * aineistosta 0,006°:n harvennuksella (tools/fokuskartta/maailma.mjs
 * meriRenkaat) ja maiden rajat rajasetistä `nykyiset`
 * (tools/fokuskartta/rajat.mjs). Vektorin ON KULJETTAVA POLTETUN
 * VIIVAN PÄÄLLÄ PIKSELILLEEN, muuten levossa näkyisi kaksoisreuna
 * kaikkialla (mitattu: 1:50m vs 1:10m ero mediaani 0,46 ja max 1,43
 * lautayksikköä = 0,5–1,5 px z7:llä, pallon-vektoriviivat.md 2.4).
 * Siksi tämä työkalu kutsuu TÄSMÄLLEEN samoja funktioita samoilla
 * asetuksilla kuin laattapyramidi — ei omaa lukijaa eikä omaa
 * harvennusta.
 *
 * === TASOT JA SOLUT ================================================
 *
 * Viivat yksinkertaistetaan Douglas–Peuckerilla viidelle tasolle
 * (toleranssi asteina: 0,1 / 0,03 / 0,008 / 0,004 / 0 = harventamaton
 * lähde) ja leikataan 10°:n soluihin, jotta lähikuva lataa vain
 * näkyvän alueen. Karkeat tasot (toleranssi ≥ --yksisolu) ovat YKSI
 * solu: yleiskuva lataa ne kerralla eikä 378 pyyntöä kannata.
 * Solun vaihtuessa viiva katkaistaan ja rajapiste kuuluu MOLEMPIIN
 * soluihin — muuten naapurisolujen väliin jäisi rako.
 *
 * === TIEDOSTOMUOTO (int16-delta) ===================================
 *
 * <laji>/l<k>/<sarake>_<rivi>.bin sisältää viivoja peräkkäin:
 *
 *   int32 n          pisteiden määrä
 *   int32 lon0·1e4   ensimmäinen piste 1e-4°-yksikköinä
 *   int32 lat0·1e4
 *   (n−1) × (int16 dlon, int16 dlat)    erotus edelliseen, 1e-4°
 *
 * little-endian. 1e-4° on päiväntasaajalla 11 m eli z7:n 240 px/asteella
 * 0,024 px — kaukana silmän alta. Delta on int16, joten yksi askel on
 * enintään ±3,2767°; jos askel on pidempi, viiva KATKAISTAAN uuteen
 * osaan (määrä kirjataan taulukkoon `katkoja`). Muoto on kolmasosa
 * Float32-taulukon koosta (mitattu 3 234 kt → 1 662 kt, ja gzipattuna
 * 1 254 kt koko maailman tarkin rannikko).
 *
 * Purkaja `puraDelta` on tässä tiedostossa ja SAMANA KOPIONA
 * js/pallovektorit.js:ssä (V1); tests/pallovektorit-aineisto.test.mjs
 * lukee molemmat tekstinä ja kaatuu, jos rungot eroavat.
 *
 * Tulos: <ulos>/luettelo.json, <ulos>/mitat.json, <ulos>/kansio.txt ja
 * <ulos>/<laji>/l<k>/<sarake>_<rivi>.bin. Työnkulku
 * .github/workflows/tee-pallovektorit.yml vie kansion polkuun
 * julisteet/pallo/vektorit/<versio>/.
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

import { meriRenkaat, rannikotRenkaista } from './fokuskartta/maailma.mjs';
import { lueRajaviivasto } from './fokuskartta/rajat.mjs';

/** Sama harvennus kuin poltetulla rantaviivalla (maailma.mjs oletus). */
export const HARVENNUS = 0.006;
/** Rajasetti: sama kuin viivatasolla (tools/fokuskartta/rajat-nykyiset.json.gz). */
export const RAJASETTI = 'nykyiset';
/** Natural Earthin nouto — sama osoite kuin generoi-pyramidi.yml:ssä. */
export const OCEAN_URL = 'https://raw.githubusercontent.com/nvkelso/'
  + 'natural-earth-vector/master/geojson/ne_10m_ocean.geojson';
/** Yksi delta-askel int16:na: ±3,2767°. */
export const DELTA_KATTO = 32767;

/** Ämpärin kansio: versio on polussa, joten sisältö on vuoden välimuistissa. */
export const vektorienKansio = (versio) => `julisteet/pallo/vektorit/${versio}/`;

/* ---------------- Douglas–Peucker (asteet, tasokoordinaatit) ------- */

/**
 * Douglas–Peucker asteina. Kopio kokeilusta
 * (tools/kokeilut/pallon-vektorit/tee-aineisto.mjs) — sama tulos, jotta
 * mitatut pistemäärät pitävät.
 *
 * @param {Array<[number, number]>} pisteet [lon, lat]
 * @param {number} tol toleranssi asteina; 0 = ei yksinkertaistusta
 */
export function dp(pisteet, tol) {
  if (tol <= 0 || pisteet.length < 3) return pisteet;
  const pida = new Uint8Array(pisteet.length);
  pida[0] = 1; pida[pisteet.length - 1] = 1;
  const pino = [[0, pisteet.length - 1]];
  const t2 = tol * tol;
  while (pino.length) {
    const [a, b] = pino.pop();
    if (b - a < 2) continue;
    const [ax, ay] = pisteet[a]; const [bx, by] = pisteet[b];
    const dx = bx - ax; const dy = by - ay;
    const l2 = dx * dx + dy * dy;
    let paras = -1; let parasD = -1;
    for (let i = a + 1; i < b; i += 1) {
      const [px, py] = pisteet[i];
      let d;
      if (l2 === 0) d = (px - ax) ** 2 + (py - ay) ** 2;
      else {
        const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2));
        d = (px - (ax + t * dx)) ** 2 + (py - (ay + t * dy)) ** 2;
      }
      if (d > parasD) { parasD = d; paras = i; }
    }
    if (parasD > t2) { pida[paras] = 1; pino.push([a, paras], [paras, b]); }
  }
  return pisteet.filter((_, i) => pida[i]);
}

/* ---------------- solut --------------------------------------------- */

/**
 * Solun avain `<sarake>_<rivi>`: sarake lännestä itään, rivi pohjoisesta
 * etelään. Napa ja itälaita pyöristyvät viimeiseen soluun.
 */
export function soluAvain(lon, lat, solu) {
  const s = Math.min(Math.floor((lon + 180) / solu), Math.ceil(360 / solu) - 1);
  const r = Math.min(Math.floor((90 - lat) / solu), Math.ceil(180 / solu) - 1);
  return `${s}_${r}`;
}

/**
 * Leikkaa viivat soluihin: solun vaihtuessa viiva katkaistaan ja
 * rajapiste kuuluu MOLEMPIIN soluihin (muuten väliin jäisi rako).
 *
 * ERO KOKEILUUN: kokeilu (tee-aineisto.mjs) aloitti uuden osan
 * rajapisteellä ja lisäsi saman pisteen heti perään toistamiseen, eli
 * jokainen solun vaihdos jätti nollamittaisen janan. Float32-kokeilussa
 * se oli vain hukkatavuja, mutta LineSegments2 piirtää nollamittaisen
 * janan pisteenä — tuotannossa uusi osa alkaa rajapisteellä KERRAN.
 *
 * @returns {Map<string, Array<Array<[number, number]>>>}
 */
export function soluihin(viivat, solu) {
  const solut = new Map();
  const lisaa = (avain, osa) => {
    if (osa.length < 2) return;
    if (!solut.has(avain)) solut.set(avain, []);
    solut.get(avain).push(osa);
  };
  for (const viiva of viivat) {
    let osa = [];
    let avain = null;
    for (const p of viiva) {
      const a = soluAvain(p[0], p[1], solu);
      if (avain !== null && a !== avain) { osa.push(p); lisaa(avain, osa); osa = [p]; } else osa.push(p);
      avain = a;
    }
    lisaa(avain, osa);
  }
  return solut;
}

/* ---------------- delta: koodaus ja purku --------------------------- */

/**
 * Viivat int16-deltapuskuriksi. Yli ±32767:n askel katkaisee viivan
 * uuteen osaan (int16 ei venyisi), ja katkojen määrä palautetaan.
 *
 * @param {Array<Array<[number, number]>>} viivat
 * @returns {{ puskuri: Buffer, katkoja: number, viivoja: number, pisteita: number }}
 */
export function deltakoodaa(viivat) {
  const osat = [];
  let katkoja = 0;
  let pisteita = 0;
  for (const viiva of viivat) {
    let alku = 0;
    while (alku < viiva.length - 1) {
      // Kerätään yhtä osaa niin pitkälle kuin askeleet mahtuvat int16:een.
      const deltat = [];
      let x = Math.round(viiva[alku][0] * 1e4);
      let y = Math.round(viiva[alku][1] * 1e4);
      const x0 = x; const y0 = y;
      let i = alku + 1;
      for (; i < viiva.length; i += 1) {
        const nx = Math.round(viiva[i][0] * 1e4);
        const ny = Math.round(viiva[i][1] * 1e4);
        const dx = nx - x; const dy = ny - y;
        if (Math.abs(dx) > DELTA_KATTO || Math.abs(dy) > DELTA_KATTO) break;
        deltat.push(dx, dy);
        x = nx; y = ny;
      }
      if (deltat.length === 0) {
        // Yksikin askel ei mahdu: jana jää piirtämättä ja uusi osa alkaa
        // sen toisesta päästä.
        katkoja += 1;
        alku += 1;
        continue;
      }
      const n = deltat.length / 2 + 1;
      const b = Buffer.alloc(12 + (n - 1) * 4);
      b.writeInt32LE(n, 0);
      b.writeInt32LE(x0, 4);
      b.writeInt32LE(y0, 8);
      for (let j = 0; j < deltat.length; j += 2) {
        b.writeInt16LE(deltat[j], 12 + (j / 2) * 4);
        b.writeInt16LE(deltat[j + 1], 12 + (j / 2) * 4 + 2);
      }
      osat.push(b);
      pisteita += n;
      // Jos silmukka katkesi liian pitkään askeleeseen, jana jää
      // piirtämättä ja seuraava osa alkaa sen toisesta päästä.
      if (i < viiva.length) katkoja += 1;
      alku = i;
    }
  }
  return {
    puskuri: Buffer.concat(osat), katkoja, viivoja: osat.length, pisteita,
  };
}

/**
 * Purkaa int16-deltapuskurin viivoiksi.
 *
 * SAMA RUNKO ON js/pallovektorit.js:ssä (erä V1) — testi vertaa
 * tekstinä. Siksi tässä käytetään vain DataView'ta, joka on sama
 * Nodessa ja selaimessa (fetch antaa ArrayBufferin, Node Bufferin).
 *
 * @param {ArrayBuffer|Uint8Array} puskuri
 * @returns {Float64Array[]} viivat [lon, lat, lon, lat, …]
 */
export function puraDelta(puskuri) {
  const tavut = puskuri instanceof ArrayBuffer
    ? new DataView(puskuri)
    : new DataView(puskuri.buffer, puskuri.byteOffset, puskuri.byteLength);
  const viivat = [];
  let o = 0;
  while (o + 12 <= tavut.byteLength) {
    const n = tavut.getInt32(o, true);
    let x = tavut.getInt32(o + 4, true);
    let y = tavut.getInt32(o + 8, true);
    o += 12;
    const viiva = new Float64Array(n * 2);
    viiva[0] = x / 1e4;
    viiva[1] = y / 1e4;
    for (let i = 1; i < n; i += 1) {
      x += tavut.getInt16(o, true);
      y += tavut.getInt16(o + 2, true);
      o += 4;
      viiva[i * 2] = x / 1e4;
      viiva[i * 2 + 1] = y / 1e4;
    }
    viivat.push(viiva);
  }
  return viivat;
}

/* ---------------- ajo ----------------------------------------------- */

const laske = (viivat) => viivat.reduce((s, v) => s + v.length, 0);

/**
 * Laskee ja (ellei kuiva) kirjoittaa koko aineiston.
 *
 * @param {object} asetukset ne, ulos, versio, lodit, solu, yksiSoluRaja, kuiva
 * @returns {{ luettelo: object, taulukko: object[] }}
 */
export function teeVektorit({
  ne, ulos, versio, lodit, solu: SOLU, yksiSoluRaja, kuiva = false, kerro = () => {},
}) {
  const t0 = Date.now();
  const renkaat = meriRenkaat(ne, { harvennus: HARVENNUS });
  // Kehyksen (±180, navat) osuudet katkaisevat viivan: rannikko on polyviivoja.
  const rannikko = rannikotRenkaista(renkaat, { laatikko: { lat0: -90, lat1: 90 } });
  const rajat = lueRajaviivasto(RAJASETTI).viivat.map((v) => v.map(([lon, lat]) => [lon, lat]));
  const sha = createHash('sha256').update(readFileSync(join(ne, 'ne_10m_ocean.geojson'))).digest('hex');
  kerro(`lähteet ${((Date.now() - t0) / 1000).toFixed(1)} s: rannikko ${rannikko.length} viivaa / `
    + `${laske(rannikko)} pistettä (${HARVENNUS}°-harvennus), `
    + `rajat ${rajat.length} viivaa / ${laske(rajat)} pistettä`);
  kerro(`ne_10m_ocean.geojson sha256 ${sha}`);

  const luettelo = {
    versio,
    lahteet: { ocean: { url: OCEAN_URL, sha256: sha }, rajat: RAJASETTI },
    harvennus: HARVENNUS,
    lodit,
    solu: SOLU,
    yksiSoluRaja,
    lajit: {},
  };
  const taulukko = [];
  for (const laji of ['rannikko', 'rajat']) {
    const lahde = laji === 'rannikko' ? rannikko : rajat;
    luettelo.lajit[laji] = { tasot: [] };
    lodit.forEach((tol, k) => {
      const harva = lahde.map((v) => dp(v, tol)).filter((v) => v.length > 1);
      const solu = tol >= yksiSoluRaja ? 360 : SOLU;
      const solut = soluihin(harva, solu);
      const kansio = join(ulos, laji, `l${k}`);
      if (!kuiva) mkdirSync(kansio, { recursive: true });
      const tiedostot = {};
      let tavuja = 0; let gz = 0; let katkoja = 0;
      for (const [avain, viivat] of solut) {
        const d = deltakoodaa(viivat);
        if (!kuiva) writeFileSync(join(kansio, `${avain}.bin`), d.puskuri);
        tavuja += d.puskuri.length;
        gz += gzipSync(d.puskuri).length;
        katkoja += d.katkoja;
        tiedostot[avain] = { tavua: d.puskuri.length, viivoja: d.viivoja, pisteita: d.pisteita };
      }
      const pisteita = laske(harva);
      luettelo.lajit[laji].tasot.push({
        k, tol, solu, soluja: solut.size, viivoja: harva.length, pisteita, tiedostot,
      });
      taulukko.push({
        laji,
        k,
        tol,
        solu,
        soluja: solut.size,
        viivoja: harva.length,
        pisteita,
        deltaKt: Math.round(tavuja / 1024),
        deltaGzKt: Math.round(gz / 1024),
        katkoja,
      });
    });
  }
  if (!kuiva) {
    mkdirSync(ulos, { recursive: true });
    writeFileSync(join(ulos, 'luettelo.json'), JSON.stringify(luettelo));
    writeFileSync(join(ulos, 'mitat.json'), JSON.stringify(taulukko, null, 1));
    writeFileSync(join(ulos, 'kansio.txt'), `${vektorienKansio(versio)}\n`);
  }
  kerro(`${kuiva ? 'kuiva ajo' : `kirjoitettu ${ulos}`} (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
  return { luettelo, taulukko };
}

const TAMA = fileURLToPath(import.meta.url);
if (process.argv[1] === TAMA) {
  const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d);
  const NE = arg('ne', null);
  if (!NE) {
    console.error('anna --ne=<kansio, jossa ne_10m_ocean.geojson>');
    process.exit(1);
  }
  const KUIVA = process.argv.includes('--kuiva');
  const ULOS = arg('ulos', join(dirname(TAMA), '..', 'pallovektorit-ulos'));
  // Oletusversio: päivä + kirjain a. Uusi kirjain aina, kun sisältö
  // muuttuu — polku on vuoden välimuistissa eikä samaan kansioon saa
  // koskaan kirjoittaa eri aineistoa.
  const VERSIO = arg('versio', `${new Date().toISOString().slice(0, 10)}a`);
  const LODIT = arg('lodit', '0.1,0.03,0.008,0.004,0').split(',').map(Number);
  const SOLU = Number(arg('solu', 10));
  const YKSI_SOLU_RAJA = Number(arg('yksisolu', 0.03));
  const { taulukko } = teeVektorit({
    ne: NE,
    ulos: ULOS,
    versio: VERSIO,
    lodit: LODIT,
    solu: SOLU,
    yksiSoluRaja: YKSI_SOLU_RAJA,
    kuiva: KUIVA,
    kerro: (rivi) => console.log(rivi),
  });
  console.log(`versio ${VERSIO} → ${vektorienKansio(VERSIO)}`);
  console.table(taulukko);
}
