/*
 * Dioraamamoottorin rakennuskone (Linnanrakentaja, ali-agentti B3, erä 1).
 * Speksi: docs/raportit/dioraama-rajapinnat-20260929.md kohdat 0, 3 ja 3b.
 *
 * CLI: node tools/dioraama/rakenna.mjs <rakennus-id> [--ulos dist/dioraama] [--saateita 48]
 *   → kansio <ulos>/<rakennus-id>/ (oletus dist/dioraama/<rakennus-id>/), ks. alla.
 *
 * PUTKI per tila (speksin kohta 3b): palikat.flatMap(sijoita) [reseptit.mjs, B2]
 *   → ryhmittely pinnan mukaan → kärkien yhdistys (hitsaus) → maailmatason UV
 *   normaalin pääakselin mukaan / toisto_m → AO peittäjinä oma tila + naapurit +
 *   'massa' [ao.mjs] → lämpö + pinnan hehku [ao.mjs] → COLOR_0 (R=AO, G=lämpö)
 *   → kirjoitaGlb [glb.mjs, B1].
 *
 * Tuotokset (kohta 3): tilat/<tila>.glb, rakennus.json (lähdedata + glb-kentät +
 * käytetyt pinnat/henkilot/aanet), hahmot/<id>.png (paikkamerkkihenkilöille),
 * manifest.json (aakkosjärjestys, sha256, tavuja, EI aikaleimoja).
 *
 * EI UUSIA NPM-RIIPPUVUUKSIA. B1:n (glb.mjs) ja B2:n (reseptit.mjs) tiedostoja
 * ei muokata tästä — vain käytetään niiden dokumentoitua rajapintaa.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';

import { kirjoitaGlb } from './glb.mjs';
import { sijoita } from './reseptit.mjs';
import { luoBvh, leivoAO, lampo } from './ao.mjs';
import { teePaikkamerkkiAtlas } from './paikkamerkit.mjs';
import { PINNAT } from '../../js/dioraama/pankit/pinnat.js';
import { HENKILOT } from '../../js/dioraama/pankit/henkilot.js';
import { AANET } from '../../js/dioraama/pankit/aanet.js';

const AO_MAX_M = 3; // speksin kohta 3: AO enintään 3 m kantama
const HITSAUS_PAIKKA = 1e-4; // kärkien yhdistys: paikkatoleranssi (m)
const HITSAUS_NORMAALI = 1e-3; // kärkien yhdistys: normaalitoleranssi

/* ==================== Pieni vektorimatematiikka (maailmakoordinaatit) ==================== */

function normalisoiVarmasti(v) {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

/** Litteä (kova) normaali kolmion maailmakoordinaateista: (p1−p0) × (p2−p0), normalisoituna. */
function laskeTasonNormaali(p0, p1, p2) {
  const e1x = p1[0] - p0[0]; const e1y = p1[1] - p0[1]; const e1z = p1[2] - p0[2];
  const e2x = p2[0] - p0[0]; const e2y = p2[1] - p0[1]; const e2z = p2[2] - p0[2];
  const nx = e1y * e2z - e1z * e2y;
  const ny = e1z * e2x - e1x * e2z;
  const nz = e1x * e2y - e1y * e2x;
  const l = Math.hypot(nx, ny, nz) || 1;
  return [nx / l, ny / l, nz / l];
}

/**
 * Hitsausavain kärjelle: sama pinta (ryhmittely hoitaa sen jo erikseen) +
 * paikka toleranssilla HITSAUS_PAIKKA + normaali toleranssilla HITSAUS_NORMAALI.
 * Toteutus on säännöllinen ristikkoon pyöristys (Math.round(arvo / toleranssi)) —
 * yksinkertainen ja deterministinen tapa toteuttaa "saman toleranssin sisällä
 * olevat kärjet yhdistetään" ilman kalliimpaa naapurihakua.
 */
function hitsausavain(p, n) {
  const px = Math.round(p[0] / HITSAUS_PAIKKA);
  const py = Math.round(p[1] / HITSAUS_PAIKKA);
  const pz = Math.round(p[2] / HITSAUS_PAIKKA);
  const nx = Math.round(n[0] / HITSAUS_NORMAALI);
  const ny = Math.round(n[1] / HITSAUS_NORMAALI);
  const nz = Math.round(n[2] / HITSAUS_NORMAALI);
  return `${px},${py},${pz}|${nx},${ny},${nz}`;
}

/**
 * Maailmatason UV normaalin pääakselin mukaan (speksin kohta 3b):
 * |nx| suurin → (z, y); |ny| suurin → (x, z); |nz| suurin → (x, y); / toisto_m.
 * Maailmakoordinaatteihin sidottu (ei per-palikka-paikallinen), joten toistuva
 * tekstuuri jatkuu saumattomasti palikasta toiseen.
 */
function laskeUv(p, n, toistoM) {
  const ax = Math.abs(n[0]); const ay = Math.abs(n[1]); const az = Math.abs(n[2]);
  let u;
  let v;
  if (ax >= ay && ax >= az) { u = p[2]; v = p[1]; } else if (ay >= az) { u = p[0]; v = p[2]; } else { u = p[0]; v = p[1]; }
  return [u / toistoM, v / toistoM];
}

/* ==================== Ryhmittely pinnan mukaan + kärkien hitsaus ==================== */

/**
 * `rawKolmiot`: sijoita():n tuottama Kolmio[] YHDELLE tilalle (maailmakoordinaatit).
 * Palauttaa Map<pinta, { positions, normals, uvs, indices (tavalliset JS-taulukot) }>
 * — yksi ryhmä per käytetty pinta, kärjet hitsattu toleranssilla (ks. yllä).
 */
function ryhmitteleJaHitsaa(rawKolmiot) {
  const ryhmat = new Map();
  for (const k of rawKolmiot) {
    const pintaTieto = PINNAT[k.pinta];
    if (!pintaTieto) {
      throw new Error(`rakenna: tuntematon pinta '${k.pinta}' (ei js/dioraama/pankit/pinnat.js:ssä)`);
    }
    let ryhma = ryhmat.get(k.pinta);
    if (!ryhma) {
      ryhma = {
        positions: [], normals: [], uvs: [], indices: [], vertexMap: new Map(),
      };
      ryhmat.set(k.pinta, ryhma);
    }
    // Normaali: pehmeä (k.n) jos annettu, muuten litteä kolmion tasosta.
    let normaalit3;
    if (k.n) {
      normaalit3 = [normalisoiVarmasti(k.n[0]), normalisoiVarmasti(k.n[1]), normalisoiVarmasti(k.n[2])];
    } else {
      const flat = laskeTasonNormaali(k.p[0], k.p[1], k.p[2]);
      normaalit3 = [flat, flat, flat];
    }
    const idx3 = [0, 0, 0];
    for (let v = 0; v < 3; v++) {
      const p = k.p[v]; const n = normaalit3[v];
      const avain = hitsausavain(p, n);
      let vi = ryhma.vertexMap.get(avain);
      if (vi === undefined) {
        vi = ryhma.positions.length / 3;
        ryhma.positions.push(p[0], p[1], p[2]);
        ryhma.normals.push(n[0], n[1], n[2]);
        const uv = laskeUv(p, n, pintaTieto.toisto_m);
        ryhma.uvs.push(uv[0], uv[1]);
        ryhma.vertexMap.set(avain, vi);
      }
      idx3[v] = vi;
    }
    ryhma.indices.push(idx3[0], idx3[1], idx3[2]);
  }
  return ryhmat;
}

/* ==================== Rakennuksen kolmiosoppa tilaa kohden (AO-peittäjiä varten) ==================== */

/** `rawKolmiot` (Kolmio[], maailmakoordinaatit) → tiivis Float32Array (9 lukua/kolmio), vain paikat. */
function litistaKolmiot(rawKolmiot) {
  const flat = new Float32Array(rawKolmiot.length * 9);
  for (let i = 0; i < rawKolmiot.length; i++) {
    const k = rawKolmiot[i]; const o = i * 9;
    flat[o] = k.p[0][0]; flat[o + 1] = k.p[0][1]; flat[o + 2] = k.p[0][2];
    flat[o + 3] = k.p[1][0]; flat[o + 4] = k.p[1][1]; flat[o + 5] = k.p[1][2];
    flat[o + 6] = k.p[2][0]; flat[o + 7] = k.p[2][1]; flat[o + 8] = k.p[2][2];
  }
  return flat;
}

/* ==================== Julkinen: rakennaData ==================== */

/**
 * Rakentaa yhden RAKENNUS-objektin dioraamapaketin levylle. Palauttaa
 * yhteenvedon (ei kirjoita mitään ajanhetkeä sisältävää dataan itse
 * tiedostoihin — vain paluuarvon `aikaMs`/`aoMs` CLI:n tulostusta varten).
 *
 * `ulos`: kansio, jonka ALLE `<rakennus.id>/` luodaan (oletus 'dist/dioraama').
 * `saateita`: leivoAO:n sädemäärä per kärki (oletus 48, ks. tools/dioraama/ao.mjs).
 */
/**
 * Tihentää kolmiot puolittamalla pisimmän sivun, kunnes jokainen sivu on ≤ maxReuna (m). Pehmeät normaalit
 * interpoloidaan ja normalisoidaan; litteät kolmiot pysyvät litteinä. Kiertosuunta säilyy. Nelikulmion
 * lävistäjä on molempien kolmioiden pisin sivu, joten jaetut sivut puolittuvat samasta kohdasta.
 */
export function tihenna(kolmiot, maxReuna) {
  const tulos = [];
  const pino = [...kolmiot];
  const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
  const keski = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
  const keskiN = (a, b) => {
    const m = keski(a, b), l = Math.hypot(m[0], m[1], m[2]) || 1;
    return [m[0] / l, m[1] / l, m[2] / l];
  };
  const raja = maxReuna * maxReuna;
  while (pino.length) {
    const t = pino.pop();
    const [a, b, c] = t.p;
    const s = [d2(a, b), d2(b, c), d2(c, a)];
    const i = s[0] >= s[1] && s[0] >= s[2] ? 0 : s[1] >= s[2] ? 1 : 2;
    if (s[i] <= raja) { tulos.push(t); continue; }
    // Kierrä niin, että puolitettava sivu on p0–p1.
    const j = [i, (i + 1) % 3, (i + 2) % 3];
    const P = j.map((k) => t.p[k]), N = t.n ? j.map((k) => t.n[k]) : null;
    const m = keski(P[0], P[1]), nm = N ? keskiN(N[0], N[1]) : null;
    const uusi = (p, n) => {
      const x = { ...t, p };
      if (n) x.n = n; else delete x.n;
      return x;
    };
    pino.push(uusi([P[0], m, P[2]], N ? [N[0], nm, N[2]] : null));
    pino.push(uusi([m, P[1], P[2]], N ? [nm, N[1], N[2]] : null));
  }
  return tulos;
}

/** Tihennyksen sivuraja palikalle (m): vesi ei tarvitse AO:ta, kallio on iso ja karkea. */
export function tihennysraja(palikka, tila) {
  if (palikka.resepti === 'vesi') return Infinity;
  if (palikka.resepti === 'kallio') return 4;
  return tila.kohdistettava === false ? 2 : 0.5;
}

export async function rakennaData(rakennus, { ulos = 'dist/dioraama', saateita = 48 } = {}) {
  if (!rakennus || typeof rakennus.id !== 'string' || rakennus.id.length === 0) {
    throw new Error('rakennaData: rakennus.id puuttuu tai ei ole merkkijono');
  }
  if (!Array.isArray(rakennus.tilat) || rakennus.tilat.length === 0) {
    throw new Error(`rakennaData: rakennuksella '${rakennus.id}' ei ole yhtään tilaa`);
  }
  const aikaAlku = performance.now();
  const kansio = join(ulos, rakennus.id);
  mkdirSync(join(kansio, 'tilat'), { recursive: true });
  mkdirSync(join(kansio, 'hahmot'), { recursive: true });

  // VAIHE A: jokaisen tilan raaka kolmiosoppa (sijoita, EI ryhmittelyä/hitsausta).
  // Tarvitaan KAIKILTA tiloilta etukäteen, koska AO:n peittäjät (kohta 3b: "oma
  // tila + naapurit + massa") voivat viitata TOISEEN tilaan, jota ei muuten
  // vielä olisi käsitelty.
  const rawPerTila = new Map(); // id -> Kolmio[]
  const flatPerTila = new Map(); // id -> Float32Array (samat kolmiot, litteänä BVH:ta varten)
  for (const tila of rakennus.tilat) {
    // Tihennys: kärkikohtainen AO ja lämpö tarvitsevat kärkiä myös isojen pintojen keskelle (12 × 7 m:n lattiassa
    // oli vain nurkat, eikä tulisijan hehku näkynyt). Kohdistettava tila 0,5 m, massa 2 m, kallio 4 m, vesi ei lainkaan.
    const raw = tila.palikat.flatMap((palikka) => tihenna(sijoita(palikka), tihennysraja(palikka, tila)));
    if (raw.length === 0) throw new Error(`rakenna: tilalla '${tila.id}' ei ole yhtään kolmiota (tyhjä palikat?)`);
    rawPerTila.set(tila.id, raw);
    flatPerTila.set(tila.id, litistaKolmiot(raw));
  }
  const tilaIdt = new Set(rakennus.tilat.map((t) => t.id));

  const kaytetytPinnat = new Set();
  const kaytetytHenkilot = new Set();
  const kaytetytAanet = new Set();
  const tilaTulokset = [];
  let aoMsYht = 0;

  for (const tila of rakennus.tilat) {
    const ryhmat = ryhmitteleJaHitsaa(rawPerTila.get(tila.id));

    // AO:n peittäjät: oma tila + naapurit + 'massa' (jos rakennuksessa on sellainen),
    // dedupoituna Setillä ja suodatettuna vain olemassa oleviin tiloihin.
    const peittajaIdt = new Set([tila.id, ...(tila.naapurit ?? [])].filter((id) => tilaIdt.has(id)));
    if (tilaIdt.has('massa')) peittajaIdt.add('massa');
    let peittajaKolmioMaara = 0;
    for (const id of peittajaIdt) peittajaKolmioMaara += flatPerTila.get(id).length / 9;
    const peittajaFlat = new Float32Array(peittajaKolmioMaara * 9);
    {
      let o = 0;
      for (const id of peittajaIdt) { const f = flatPerTila.get(id); peittajaFlat.set(f, o); o += f.length; }
    }

    const aoAlku = performance.now();
    const bvh = luoBvh(peittajaFlat);
    const osat = [];
    let kolmioYht = 0; let karkiYht = 0;
    for (const pinta of [...ryhmat.keys()].sort()) {
      const ryhma = ryhmat.get(pinta);
      kaytetytPinnat.add(pinta);
      const paikat = Float32Array.from(ryhma.positions);
      const normaalit = Float32Array.from(ryhma.normals);
      const uv = Float32Array.from(ryhma.uvs);
      const kolmiot = Uint32Array.from(ryhma.indices);
      const karkia = paikat.length / 3;

      const ao = leivoAO(bvh, paikat, normaalit, { saateita, max: AO_MAX_M });
      const lampoArvot = lampo(paikat, tila.valot ?? []);
      const hehku = PINNAT[pinta]?.hehku ?? 0;

      // COLOR_0: R = AO (1 = avoin), G = lämpö + pinnan hehku (rajattu [0,1]), B = 0, A = 255.
      const varit = new Uint8Array(karkia * 4);
      for (let i = 0; i < karkia; i++) {
        const aoArvo = Math.min(1, Math.max(0, ao[i]));
        const lampoArvo = Math.min(1, Math.max(0, lampoArvot[i] + hehku));
        varit[i * 4] = Math.round(aoArvo * 255);
        varit[i * 4 + 1] = Math.round(lampoArvo * 255);
        varit[i * 4 + 2] = 0;
        varit[i * 4 + 3] = 255;
      }

      osat.push({
        pinta, vari: PINNAT[pinta].vari, paikat, normaalit, uv, varit, kolmiot,
      });
      kolmioYht += kolmiot.length / 3;
      karkiYht += karkia;
    }
    aoMsYht += performance.now() - aoAlku;

    const glbBuffer = kirjoitaGlb({ nimi: tila.id, osat });
    const tiedostoSuhteellinen = `tilat/${tila.id}.glb`;
    writeFileSync(join(kansio, 'tilat', `${tila.id}.glb`), glbBuffer);
    const sha256 = createHash('sha256').update(glbBuffer).digest('hex');

    for (const hahmo of tila.hahmot ?? []) {
      kaytetytHenkilot.add(hahmo.henkilo);
      for (const rivi of [...(hahmo.repliikit ?? []), hahmo.reaktio].filter(Boolean)) {
        if (rivi.aani != null) kaytetytAanet.add(rivi.aani);
      }
    }
    for (const a of tila.aanet ?? []) {
      if (typeof a === 'string') kaytetytAanet.add(a);
      else if (a && typeof a.id === 'string') kaytetytAanet.add(a.id);
    }

    tilaTulokset.push({
      id: tila.id, tiedosto: tiedostoSuhteellinen, sha256, kolmiot: kolmioYht, karkia: karkiYht, tavuja: glbBuffer.length,
    });
  }

  // Paikkamerkkiatlaat: vain henkilöille, joilla on `paikkamerkki` (kohta 3).
  const hahmoTulokset = [];
  for (const id of [...kaytetytHenkilot].sort()) {
    const henkilo = HENKILOT[id];
    if (!henkilo) throw new Error(`rakenna: käytetty henkilö '${id}' puuttuu HENKILOT-pankista`);
    if (!henkilo.paikkamerkki) continue;
    const png = teePaikkamerkkiAtlas(henkilo, id);
    const polkuSuhteellinen = `hahmot/${id}.png`;
    writeFileSync(join(kansio, 'hahmot', `${id}.png`), png);
    hahmoTulokset.push({
      id, polku: polkuSuhteellinen, sha256: createHash('sha256').update(png).digest('hex'), tavuja: png.length,
    });
  }

  // rakennus.json: lähdedata sellaisenaan (syväkopio JSON:in kautta, jottei alkuperäistä
  // moduulia mutatoida) + jokaiselle tilalle glb-kentät + käytetyt pinnat/henkilot/aanet.
  const rakennusJson = JSON.parse(JSON.stringify(rakennus));
  for (const t of rakennusJson.tilat) {
    const tulos = tilaTulokset.find((x) => x.id === t.id);
    t.glb = {
      tiedosto: tulos.tiedosto, sha256: tulos.sha256, kolmiot: tulos.kolmiot, karkia: tulos.karkia,
    };
  }
  rakennusJson.pinnat = {};
  for (const id of [...kaytetytPinnat].sort()) rakennusJson.pinnat[id] = PINNAT[id];
  rakennusJson.henkilot = {};
  for (const id of [...kaytetytHenkilot].sort()) {
    const henkilo = HENKILOT[id];
    rakennusJson.henkilot[id] = henkilo.paikkamerkki ? { ...henkilo, atlas: `hahmot/${id}.png` } : { ...henkilo };
  }
  rakennusJson.aanet = {};
  for (const id of [...kaytetytAanet].sort()) {
    if (!Object.hasOwn(AANET, id)) throw new Error(`rakenna: käytetty ääni '${id}' puuttuu AANET-pankista`);
    rakennusJson.aanet[id] = AANET[id];
  }

  const rakennusJsonBuf = Buffer.from(`${JSON.stringify(rakennusJson, null, 2)}\n`, 'utf8');
  const rakennusJsonPolku = 'rakennus.json';
  writeFileSync(join(kansio, rakennusJsonPolku), rakennusJsonBuf);
  const rakennusJsonSha = createHash('sha256').update(rakennusJsonBuf).digest('hex');

  // manifest.json: aakkosjärjestyksessä, EI aikaleimoja — sama syöte = sama tavujono.
  const tiedostot = [
    ...tilaTulokset.map((t) => ({ polku: t.tiedosto, sha256: t.sha256, tavuja: t.tavuja })),
    ...hahmoTulokset.map((h) => ({ polku: h.polku, sha256: h.sha256, tavuja: h.tavuja })),
    { polku: rakennusJsonPolku, sha256: rakennusJsonSha, tavuja: rakennusJsonBuf.length },
  ].sort((a, b) => (a.polku < b.polku ? -1 : (a.polku > b.polku ? 1 : 0)));

  const manifest = {
    rakennus: rakennus.id, versio: rakennus.versio, hash: rakennusJsonSha, tiedostot,
  };
  const manifestBuf = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  const manifestPolku = 'manifest.json';
  writeFileSync(join(kansio, manifestPolku), manifestBuf);

  const aikaMs = performance.now() - aikaAlku;
  return {
    kansio,
    tilat: tilaTulokset,
    hahmot: hahmoTulokset,
    rakennusJson: { polku: rakennusJsonPolku, sha256: rakennusJsonSha, tavuja: rakennusJsonBuf.length },
    manifest: { polku: manifestPolku, sha256: createHash('sha256').update(manifestBuf).digest('hex'), tavuja: manifestBuf.length },
    aikaMs,
    aoMs: aoMsYht,
  };
}

/* ==================== CLI ==================== */

async function main() {
  const argv = process.argv.slice(2);
  const lippu = (nimi) => {
    const i = argv.indexOf(nimi);
    return i >= 0 ? argv[i + 1] : null;
  };
  // Vapaat (ei-lippu) argumentit: ohitetaan jokaisen "--lippu"-tokenin PERÄSSÄ
  // tuleva arvo, jottei esim. "--saateita 48 olavinlinna" tulkitse '48':aa
  // rakennus-id:ksi (lippu voi tulla ennen tai jälkeen positionaalisen argumentin).
  const vapaat = [];
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i].startsWith('--')) { i += 1; continue; }
    vapaat.push(argv[i]);
  }
  const rakennusId = vapaat[0];
  if (!rakennusId) {
    console.error('Käyttö: node tools/dioraama/rakenna.mjs <rakennus-id> [--ulos dist/dioraama] [--saateita 48]');
    process.exit(1);
    return;
  }
  const ulos = lippu('--ulos') ?? 'dist/dioraama';
  const saateitaArg = lippu('--saateita');
  const saateita = saateitaArg ? Number(saateitaArg) : 48;
  if (!Number.isFinite(saateita) || saateita <= 0) {
    console.error(`Käyttö: --saateita pitää olla positiivinen luku (oli ${JSON.stringify(saateitaArg)})`);
    process.exit(1);
    return;
  }

  const moduulinUrl = new URL(`../../js/dioraama/rakennukset/${rakennusId}.js`, import.meta.url);
  const { RAKENNUS } = await import(moduulinUrl.href);

  const tulos = await rakennaData(RAKENNUS, { ulos, saateita });

  console.log(`${RAKENNUS.otsikko ?? RAKENNUS.nimi} (${RAKENNUS.id}): ${tulos.tilat.length} tilaa\n`);
  let kolmioKaikki = 0; let karkiKaikki = 0; let tavuaKaikki = 0;
  for (const t of tulos.tilat) {
    console.log(
      `  ${t.id.padEnd(12)}: ${String(t.kolmiot).padStart(7)} kolmiota, `
      + `${String(t.karkia).padStart(7)} kärkeä, ${String(t.tavuja).padStart(9)} tavua  (${t.tiedosto})`,
    );
    kolmioKaikki += t.kolmiot; karkiKaikki += t.karkia; tavuaKaikki += t.tavuja;
  }
  console.log(
    `  ${'yhteensä'.padEnd(12)}: ${String(kolmioKaikki).padStart(7)} kolmiota, `
    + `${String(karkiKaikki).padStart(7)} kärkeä, ${String(tavuaKaikki).padStart(9)} tavua`,
  );
  if (tulos.hahmot.length > 0) {
    console.log(`\n  hahmot: ${tulos.hahmot.length} atlasta (${tulos.hahmot.map((h) => h.id).join(', ')})`);
  }
  console.log(`  ${tulos.rakennusJson.polku}: ${tulos.rakennusJson.tavuja} tavua`);
  console.log(`  ${tulos.manifest.polku}: ${tulos.manifest.tavuja} tavua`);
  console.log(`\n  aika: ${(tulos.aikaMs / 1000).toFixed(2)} s (josta AO-leivonta ${(tulos.aoMs / 1000).toFixed(2)} s)`);
  console.log(`  ulos: ${tulos.kansio}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err?.stack ?? String(err));
    process.exit(1);
  });
}
