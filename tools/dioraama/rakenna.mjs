/*
 * Dioraamamoottorin rakennuskone (Linnanrakentaja, ali-agentti B3, erä 1;
 * media-putki laajennettu erä 2:ssa). Speksi: docs/raportit/dioraama-rajapinnat-
 * 20260929.md kohdat 0, 3 ja 3b sekä docs/raportit/dioraama-rajapinnat-era2-
 * 20260929.md kohdat 1 ja 2.
 *
 * CLI: node tools/dioraama/rakenna.mjs <rakennus-id> [--ulos dist/dioraama]
 *   [--saateita 48] [--aanet <kansio>]
 *   → kansio <ulos>/<rakennus-id>/ (oletus dist/dioraama/<rakennus-id>/), ks. alla.
 *
 * PUTKI per tila (speksin kohta 3b): palikat.flatMap(sijoita) [reseptit.mjs, B2]
 *   → ryhmittely pinnan mukaan → kärkien yhdistys (hitsaus) → maailmatason UV
 *   normaalin pääakselin mukaan / toisto_m → AO peittäjinä oma tila + naapurit +
 *   'massa' [ao.mjs] → lämpö + pinnan hehku [ao.mjs] → COLOR_0 (R=AO, G=lämpö,
 *   B=osan satunnaisluku, era2b kohta 1) → kirjoitaGlb [glb.mjs, B1].
 *
 * Tuotokset (kohta 3 + era2 kohdat 1–2, media.mjs): tilat/<tila>.glb, rakennus.json
 * (lähdedata + glb-kentät + käytetyt pinnat/henkilot/liekit/aanet + liikkeet [era2b kohta 4,
 * vain jos ≥1 3D-hahmo]), pinnat/<id>.jpg
 * (kuvallisille pinnoille), hahmot/<id>.png (maalattu tai paikkamerkki),
 * liekit/<id>.png (maalattu tai paikkamerkki), aanet/v<versio>/<id>.mp3 (vain --aanet,
 * versio AANET-pankista — natiivin URL-välimuisti),
 * manifest.json (aakkosjärjestys, sha256, tavuja, EI aikaleimoja). Puuttuva
 * mediatiedosto EI ole virhe: tulostaa `ei lähdettä: <polku>` ja käyttää
 * paikkamerkkiä / jättää kentän pois.
 *
 * BLENDER-PUTKI (Linnanrakentaja 30.9.2026; TF 1.0.61 näytti palikkalinnan, koska Blender-tuotokset olivat vain
 * paikallisessa _valmiit-kansiossa ja Siirtosepän peilissä). PEILI EI OLE JULKAISU. Jokaisella dioraamalla, jolla on
 * Blender-kuori tai leivotut tilat, julkaisu kulkee näin:
 *   1. Leivonta/kuori → /Users/Shared/Claude/proto-3d/_valmiit/<id>-blender/ (ulkokuori/, tilat/, valot/).
 *   2. OMISTAJA ajaa tools/dioraama/vie-blender.sh [--rakennus <id>] (ensin --kuiva): muuttumaton kansio
 *      dioraama/<id>/blender/<hash>/ ämpäriin ja js/dioraama/rakennukset/<id>/blender.json repoon.
 *   3. blender.json commitoidaan ja mergetään (Julkaisijan juna). Tämä tiedosto lukee sen main():ssa ja lisää
 *      kentät lisaaBlender():lla; tarkistaBlenderPaketti() hylkää paketin ilman ulkokuorta (tests/dioraama-blender).
 *   4. vie-dioraama.yml tarkistaa lähdekansion, kopioi sen palvelimella pakettiin <hash>/blender/ ja vaihtaa
 *      osoittimen vasta sitten. 5. Siirtoseppä todentaa PUHTAALLA asennuksella (ei peiliä).
 *   Jokainen _valmiit-muutos = uusi vie-blender.sh-ajo (uusi hash) + uusi blender.json-commit, muuten julkaisu jää
 *   vanhaan. main() varoittaa, jos _valmiit-kansio on olemassa mutta blender.json puuttuu tai on sitä vanhempi.
 *
 * EI UUSIA NPM-RIIPPUVUUKSIA. B1:n (glb.mjs) ja B2:n (reseptit.mjs) tiedostoja
 * ei muokata tästä — vain käytetään niiden dokumentoitua rajapintaa.
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';

import { kirjoitaGlb, kirjoitaMonisolmuGlb } from './glb.mjs';
import { teeHahmo3d } from './hahmot3d.mjs';
import { sijoita } from './reseptit.mjs';
import { sijoitaTila } from './sijoitus.mjs';
import { mulberry32 } from './reseptit-apu.mjs';
import { luoBvh, leivoAO, lampo } from './ao.mjs';
import {
  OLETUS_ASSETS_JUURI, kopioiPinnanKuva, teeHenkilonAtlas, teeLiekinAtlas, kopioiAanet,
} from './media.mjs';
import { PINNAT } from '../../js/dioraama/pankit/pinnat.js';
import { HENKILOT } from '../../js/dioraama/pankit/henkilot.js';
import { LIEKIT } from '../../js/dioraama/pankit/liekit.js';
import { AANET } from '../../js/dioraama/pankit/aanet.js';
// Huulisynkka ja eleiden ajoitus (Linnanrakentaja 7.10.2026): ElevenLabsin merkkikohdistukset puheille (raaka-vastaus = valmiin
// tiedoston aikajana, tarkistettu kestoista), id → { merkit, alut_s, loput_s }. Lähde _valmiit/linna-kohtaukset-v3/raaka/*-vastaus.json.
const KOHDISTUKSET = JSON.parse(readFileSync(new URL('../../js/dioraama/pankit/kohdistukset.json', import.meta.url), 'utf8'));
import { LIIKKEET } from '../../js/dioraama/pankit/liikkeet.js';

const AO_MAX_M = 3; // speksin kohta 3: AO enintään 3 m kantama
const HITSAUS_PAIKKA = 1e-4; // kärkien yhdistys: paikkatoleranssi (m)
const HITSAUS_NORMAALI = 1e-3; // kärkien yhdistys: normaalitoleranssi
// COLOR_0.B (era2b kohta 1): kiinteä siemen, jotta sama `osa`-merkkijono antaa AINA saman
// satunnaisluvun riippumatta ajojärjestyksestä tai muista osista (osanSatunnaisluku on puhdas
// funktio siitä — ks. alla).
const OSAN_B_SIEMEN = 0x5eed0b17;

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

/** Merkkijonon hajautus 32-bittiseksi kokonaisluvuksi (FNV-1a, deterministinen). */
function hajautaMerkkijono(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Osan (koko palikka, tai reseptin oma pienempi osa — esim. yksittäinen lattialaatta, ks.
 * reseptit-lattiat.mjs) deterministinen satunnaisluku 0…1 COLOR_0.B:hen (era2b kohta 1): sama
 * `osa`-merkkijono → sama luku aina, ajojärjestyksestä ja muista osista riippumatta (puhdas
 * funktio: mulberry32 alustettuna osan hajautuksella XOR kiinteä siemen).
 */
function osanSatunnaisluku(osa) {
  return mulberry32((hajautaMerkkijono(osa) ^ OSAN_B_SIEMEN) >>> 0)();
}

/**
 * Hitsausavain kärjelle: sama pinta (ryhmittely hoitaa sen jo erikseen) +
 * paikka toleranssilla HITSAUS_PAIKKA + normaali toleranssilla HITSAUS_NORMAALI.
 * Toteutus on säännöllinen ristikkoon pyöristys (Math.round(arvo / toleranssi)) —
 * yksinkertainen ja deterministinen tapa toteuttaa "saman toleranssin sisällä
 * olevat kärjet yhdistetään" ilman kalliimpaa naapurihakua.
 *
 * `uv` (erä 2, speksin kohta "UV"): jos resepti antoi kärjelle uv_m:n (esim.
 * torni, kartiokatto), se lisätään avaimeen SELLAISENAAN (ei pyöristystä).
 * Saumakohdassa (esim. tornin 0°/360°) kärjet ovat samassa paikassa ja
 * normaalissa mutta eri uv:ssä — ilman tätä ne hitsautuisivat yhdeksi
 * kärjeksi ja UV hyppäisi väärin sauman yli sen sijaan että jatkuisi.
 */
export function hitsausavain(p, n, uv) {
  const px = Math.round(p[0] / HITSAUS_PAIKKA);
  const py = Math.round(p[1] / HITSAUS_PAIKKA);
  const pz = Math.round(p[2] / HITSAUS_PAIKKA);
  const nx = Math.round(n[0] / HITSAUS_NORMAALI);
  const ny = Math.round(n[1] / HITSAUS_NORMAALI);
  const nz = Math.round(n[2] / HITSAUS_NORMAALI);
  const uvOsa = uv ? `|${uv[0]},${uv[1]}` : '';
  return `${px},${py},${pz}|${nx},${ny},${nz}${uvOsa}`;
}

/**
 * Maailmatason UV normaalin pääakselin mukaan (speksin kohta 3b):
 * |nx| suurin → (z, y); |ny| suurin → (x, z); |nz| suurin → (x, y); / toisto (tu, tv).
 * Maailmakoordinaatteihin sidottu (ei per-palikka-paikallinen), joten toistuva
 * tekstuuri jatkuu saumattomasti palikasta toiseen. `toistoM` on number (tu = tv)
 * tai [tu, tv] (erä 2: eri toisto per akseli, esim. leikkaus ja tiili [4, 1]).
 *
 * `uvM` (erä 2, speksin kohta "UV"): jos resepti antoi kärjelle uv_m = [a, b]
 * metreinä (esim. torni, kartiokatto — kaarenpituus/korkeus), UV = [a / tu, b / tv]
 * eikä tasoprojektiota käytetä lainkaan.
 */
export function laskeUv(p, n, toistoM, uvM) {
  const [tu, tv] = Array.isArray(toistoM) ? toistoM : [toistoM, toistoM];
  if (uvM) return [uvM[0] / tu, uvM[1] / tv];
  const ax = Math.abs(n[0]); const ay = Math.abs(n[1]); const az = Math.abs(n[2]);
  let u;
  let v;
  if (ax >= ay && ax >= az) { u = p[2]; v = p[1]; } else if (ay >= az) { u = p[0]; v = p[2]; } else { u = p[0]; v = p[1]; }
  return [u / tu, v / tv];
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
        positions: [], normals: [], uvs: [], osaTunnisteet: [], indices: [], vertexMap: new Map(),
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
      // uv_m (erä 2): resepti (torni, kartiokatto) voi antaa kärjelle valmiin uv_m:n
      // maailmankärjen sijaan — silloin se ohittaa tasoprojektion JA otetaan mukaan
      // hitsausavaimeen, jotta saumakärjet (sama paikka/normaali, eri uv) eivät hitsaudu.
      const uvM = k.uv_m ? k.uv_m[v] : undefined;
      const avain = hitsausavain(p, n, uvM);
      let vi = ryhma.vertexMap.get(avain);
      if (vi === undefined) {
        vi = ryhma.positions.length / 3;
        ryhma.positions.push(p[0], p[1], p[2]);
        ryhma.normals.push(n[0], n[1], n[2]);
        const uv = laskeUv(p, n, pintaTieto.toisto_m, uvM);
        ryhma.uvs.push(uv[0], uv[1]);
        ryhma.osaTunnisteet.push(k.osa ?? 'osa'); // COLOR_0.B (era2b kohta 1): ks. osanSatunnaisluku
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
 * `assetsJuuri` (erä 2): juuri pinta-/hahmo-/liekkilähdekuville (oletus
 * media.mjs:n OLETUS_ASSETS_JUURI = 'assets/dioraama') — testit voivat antaa
 * väliaikaiskansion tähän, ettei oikeaa assets/-kansiota kosketa.
 * `aanetKansio` (erä 2): paikallinen kansio, josta `<id>.mp3`-tiedostot
 * kopioidaan (speksin kohta 1, `--aanet`-lippu) — null/puuttuu = ei kopioida.
 */
/**
 * Tihentää kolmiot puolittamalla pisimmän sivun, kunnes jokainen sivu on ≤ maxReuna (m). Pehmeät normaalit
 * interpoloidaan ja normalisoidaan; litteät kolmiot pysyvät litteinä. Kiertosuunta säilyy. Nelikulmion
 * lävistäjä on molempien kolmioiden pisin sivu, joten jaetut sivut puolittuvat samasta kohdasta.
 *
 * uv_m (erä 2, speksin kohta "UV"): interpoloidaan LINEAARISESTI puolituspisteeseen (a ja b erikseen,
 * ei normalisointia — toisin kuin normaali, uv_m ei ole yksikkövektori) puolitettavan sivun kahden
 * kärjen väliltä. Jos jommalla kummalla puolitettavan sivun kärjellä ei ole uv_m:ää (ei pitäisi
 * tapahtua nykyisillä resepteillä, jotka asettavat sen aina koko kolmiolle kerralla), uv_m jätetään
 * KOKONAAN POIS jälkeläisiltä sen sijaan että jäätäisiin sekaan puoliksi projisoitu/puoliksi uv_m-
 * kolmio — silloin jälkeläinen palaa tavalliseen tasoprojektioon.
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
    // Erä 3 (kolmiobudjetti): kapeita kaistaleita (korkeus pisintä sivua vasten < KAISTALE_M, esim. lattian
    // 1 cm:n viisteet ja lankkujen sivut) ja alaspäin osoittavia pintoja (pohjat) ei tihennetä — niiden AO:n
    // vaihtelu ei näy, mutta pitkinä ne tuottivat kymmeniätuhansia kolmioita (keskushallin lattia 187 k).
    if (maxReuna < KAISTALE_TIHENNYS_RAJA && (kaistale(a, b, c, s[i]) || alaspain(t, a, b, c))) {
      tulos.push(t); continue;
    }
    // Kierrä niin, että puolitettava sivu on p0–p1.
    const j = [i, (i + 1) % 3, (i + 2) % 3];
    const P = j.map((k) => t.p[k]), N = t.n ? j.map((k) => t.n[k]) : null;
    const UV = t.uv_m ? j.map((k) => t.uv_m[k]) : null;
    const m = keski(P[0], P[1]), nm = N ? keskiN(N[0], N[1]) : null;
    const uvM = (UV && UV[0] && UV[1]) ? [(UV[0][0] + UV[1][0]) / 2, (UV[0][1] + UV[1][1]) / 2] : null;
    const uusi = (p, n, uv) => {
      const x = { ...t, p };
      if (n) x.n = n; else delete x.n;
      if (uv) x.uv_m = uv; else delete x.uv_m;
      return x;
    };
    pino.push(uusi([P[0], m, P[2]], N ? [N[0], nm, N[2]] : null, uvM ? [UV[0], uvM, UV[2]] : null));
    pino.push(uusi([m, P[1], P[2]], N ? [nm, N[1], N[2]] : null, uvM ? [uvM, UV[1], UV[2]] : null));
  }
  return tulos;
}

const KAISTALE_M = 0.15; // tihennetään vain, jos kolmion korkeus pisintä sivua vasten on ≥ tämä
const KAISTALE_TIHENNYS_RAJA = 1; // sääntö koskee hienoa tihennystä (kohdistettavat tilat, 0,5 m)
/** Kolmion korkeus pisintä sivua vasten (2 · ala / pisin sivu) < KAISTALE_M. */
function kaistale(a, b, c, pisin2) {
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const x = u[1] * v[2] - u[2] * v[1], y = u[2] * v[0] - u[0] * v[2], z = u[0] * v[1] - u[1] * v[0];
  return Math.hypot(x, y, z) / Math.sqrt(pisin2) < KAISTALE_M;
}
/** Pinta osoittaa alas (normaalin y < −0,7): pohjat eivät näy dioraaman kameroista. */
function alaspain(t, a, b, c) {
  if (t.n) return (t.n[0][1] + t.n[1][1] + t.n[2][1]) / 3 < -0.7;
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const x = u[1] * v[2] - u[2] * v[1], y = u[2] * v[0] - u[0] * v[2], z = u[0] * v[1] - u[1] * v[0];
  return y / (Math.hypot(x, y, z) || 1) < -0.7;
}

/** Tihennyksen sivuraja palikalle (m): vesi ei tarvitse AO:ta, kallio on iso ja karkea. */
export function tihennysraja(palikka, tila) {
  if (palikka.resepti === 'vesi') return Infinity;
  if (palikka.resepti === 'kallio') return 4;
  return tila.kohdistettava === false ? 2 : 0.5;
}

/**
 * Blender-tuotokset rakennus.json:iin (Linnanrakentaja 30.9., TF 1.0.61:n palikkalinna): tools/dioraama/vie-blender.sh
 * lataa kuoren, leivotut tilat ja valoatlakset muuttumattomaan kansioon dioraama/<id>/blender/<hash>/ ja kirjoittaa
 * blender.json:n. Paketissa ne ovat alikansiossa blender/ (vie-dioraama.yml kopioi ne palvelimella), rakennus.json saa
 * Siirtosepän peilin kentät (tunnelma, ulkokuori, tilat[].glb → leivottu, tilat[].valoatlas) ja tilat rajataan niihin,
 * joilla on leivottu glb (massa korvautuu kuorella, kuten peilissä). Muokkaa rakennusJsonia paikallaan, palauttaa
 * manifestin rivit. Puuttuva kuoritiedosto blender.json:ssa on virhe.
 */
export function lisaaBlender(rakennusJson, blender) {
  const on = new Map(blender.tiedostot.map((t) => [t.polku, t]));
  const B = (p) => { if (!on.has(p)) throw new Error(`blender.json: puuttuu ${p}`); return `blender/${p}`; };
  // Huippu-taso käyttää 8k-atlasta (Real-ESRGAN ×4 → 8k, laatusuunnitelma 30.9., täyden laadun laitteet), jos se on
  // viety blender.json:iin; muuten 4k kuten ennen (vanha blender.json ei riko rakennusta).
  const on8k = on.has('ulkokuori/ulkokuori-8k-4x4.astcm') && on.has('ulkokuori/ulkokuori-hamara-8k-4x4.astcm')
    && on.has('ulkokuori/ulkokuori-hamara-8k.jpg');
  const tasot = { huippu: on8k ? '8k' : '4k', normaali: '4k', kevyt: '2k' };
  // Skinnatut hahmot (omistaja 2.10. 18.0x): blender/hahmot/<henkilo>.glb + js/dioraama/hahmot-skin.json → henkilot[id].malli3d.skin
  // (natiivi: DioraamaGlb skin + sekoitin; nivelhahmo malli3d.glb jää varalle). Vain henkilöille, joiden glb on viety.
  const SKIN = JSON.parse(readFileSync(new URL('../../js/dioraama/hahmot-skin.json', import.meta.url), 'utf8'));
  for (const [id, h] of Object.entries(rakennusJson.henkilot || {})) {
    if (!SKIN[id] || !on.has(`hahmot/${id}.glb`) || !h.malli3d) continue;
    h.malli3d = { ...h.malli3d, skin: { glb: B(`hahmot/${id}.glb`), ...SKIN[id] } };
    // Faceit-ilmeet (morph-kohteet) omassa glb:ssä rinnalla (v41, 7.10.2026): vanha appi (TF 154) hylkää morph-glb:n
    // ("Dioraama GLB: morph ei tuettu") ja linna jäi tyhjäksi, joten skin.glb on ilman morpheja ja vain junan 156 koodi lukee
    // skin.faceit-kentän.
    if (on.has(`hahmot/${id}-faceit.glb`)) h.malli3d.skin.faceit = B(`hahmot/${id}-faceit.glb`);
  }
  // Pelaajahahmo (Siirtoseppä 7.10.2026, E1 pystyleike): blender/hahmot/fogg.glb + js/dioraama/pelaaja.json (leikkeet, liikkeiden
  // mitatut nopeudet ja toistokertoimet, kapseli). Vain jos glb on viety.
  if (on.has('hahmot/fogg.glb')) {
    const P = JSON.parse(readFileSync(new URL('../../js/dioraama/pelaaja.json', import.meta.url), 'utf8'));
    delete P.huom;
    rakennusJson.pelaaja = { glb: B('hahmot/fogg.glb'), ...P };
  }
  rakennusJson.tunnelma = 'hamara';
  rakennusJson.ulkokuori = {
    ...Object.fromEntries(Object.keys(tasot).map((t) => [t, B(`ulkokuori/ulkokuori_${t}.glb`)])),
    vesi: -7,
    tekstuurit: {
      ...Object.fromEntries(Object.entries(tasot).map(([t, k]) => [t, B(`ulkokuori/ulkokuori-${k}-4x4.astcm`)])),
      hamara: Object.fromEntries(Object.entries(tasot).map(([t, k]) => [t, B(`ulkokuori/ulkokuori-hamara-${k}-4x4.astcm`)])),
      hamaraJpg: Object.fromEntries(Object.entries(tasot).map(([t, k]) => [t, B(`ulkokuori/ulkokuori-hamara-${k}.jpg`)])),
    },
  };
  // Päivätilan JPEG-vara ilman ASTC:tä (Siirtoseppä 4.10.; ennen glb:n upotettu JPEG, joka poistetaan, kun natiivi lukee
  // tämän): vain jos kaikki tasojen JPEG:t on viety blender.json:iin.
  if (Object.values(tasot).every((k) => on.has(`ulkokuori/ulkokuori-${k}.jpg`))) {
    rakennusJson.ulkokuori.tekstuurit.jpg = Object.fromEntries(Object.entries(tasot).map(([t, k]) => [t, B(`ulkokuori/ulkokuori-${k}.jpg`)]));
  }
  // Hybridi-PBR (menetelmä B, Siirtosepän muoto 30.9.): maski + kirjaston 4 materiaalia maskin kanavajärjestyksessä,
  // vain jos viety blender.json:iin. Toisto metreinä kirjaston manifestista (js/dioraama/kirjasto/lahteet.json).
  const DETALJI = ['graniittilohkomuuri', 'paanukatto', 'kivilaatta', 'kallio'];
  const kp = (id, k) => `kirjasto/materiaali/${id}/${id}_${k}`;
  if (on.has('ulkokuori/hybridi/kuori-materiaali-2k.png') && DETALJI.every((id) => on.has(kp(id, 'diff.jpg')) && on.has(kp(id, 'nor_gl.jpg')))) {
    const kirjasto = JSON.parse(readFileSync(new URL('../../js/dioraama/kirjasto/lahteet.json', import.meta.url), 'utf8'));
    rakennusJson.ulkokuori.detalji = {
      maski: B('ulkokuori/hybridi/kuori-materiaali-2k.png'), voimakkuus: 0.8, normaali: 0.7,
      kanavat: DETALJI.map((id) => ({ id, diff: B(kp(id, 'diff.jpg')), nor: B(kp(id, 'nor_gl.jpg')),
        toisto_m: kirjasto[`materiaali/${id}`].toisto_m,
        // ASTC (Siirtoseppä 1.10.: ei runtime-pakkausta) + keski = diff-kuvan lineaarinen luminanssi (0,299/0,587/0,114),
        // jonka natiivi ennen laski GetPixelsillä; vain jos .astcm on viety (keski_luminanssi.py → lahteet.json).
        ...(on.has(kp(id, 'diff-4x4.astcm')) && on.has(kp(id, 'nor_gl-4x4.astcm'))
          ? { diff_astc: B(kp(id, 'diff-4x4.astcm')), nor_astc: B(kp(id, 'nor_gl-4x4.astcm')), keski: kirjasto[`materiaali/${id}`].keski } : {}) })),
    };
  }
  // Ympäristö (laatusuunnitelman vaihe 5, aikakerros n1500; Siirtosepän kenttänimet 1.10.): Kyrönsalmen maasto
  // laatutasoittain, ortokuva ASTC:nä (hämärä erikseen), puulista + korttiatlakset, horisonttirengas ja veden
  // syvyyskartta. Vain jos kaikki ympäristön tiedostot ovat blender.json:ssa (vanha paketti ei muutu).
  const Y = (p) => `ymparisto/${p}`;
  const YMP = ['ymparisto_huippu.glb', 'ymparisto_normaali.glb', 'ymparisto_kevyt.glb', 'puut.json', 'puukortit.png',
    'puukortit-hamara.png', 'puukortit.json', 'horisontti.glb', 'horisontti-1k.jpg', 'horisontti-hamara-1k.jpg', 'syvyys.png',
    ...['8k', '4k', '2k'].flatMap((k) => [`ymparisto-${k}-4x4.astcm`, `ymparisto-hamara-${k}-4x4.astcm`])];
  if (YMP.every((p) => on.has(Y(p)))) {
    const yt = { huippu: '8k', normaali: '4k', kevyt: '2k' };
    const syv = JSON.parse(readFileSync(new URL('../../js/dioraama/rakennukset/olavinlinna/ymparisto-syvyys.json', import.meta.url), 'utf8'));
    rakennusJson.ymparisto = {
      ...Object.fromEntries(Object.keys(yt).map((t) => [t, B(Y(`ymparisto_${t}.glb`))])),
      orto: Object.fromEntries(Object.entries(yt).map(([t, k]) => [t, B(Y(`ymparisto-${k}-4x4.astcm`))])),
      puut: B(Y('puut.json')), puukortit: B(Y('puukortit.png')), puukortit_tiedot: B(Y('puukortit.json')),
      horisontti: B(Y('horisontti.glb')), horisontti_kuva: B(Y('horisontti-1k.jpg')),
      hamara: {
        orto: Object.fromEntries(Object.entries(yt).map(([t, k]) => [t, B(Y(`ymparisto-hamara-${k}-4x4.astcm`))])),
        puukortit: B(Y('puukortit-hamara.png')), horisontti_kuva: B(Y('horisontti-hamara-1k.jpg')),
      },
      syvyys: { kuva: B(Y('syvyys.png')), pikseli_m: syv.pikseli_m, kerroin_m: syv.kerroin_m, origo: syv.origo },
    };
    // Lähimaaston kerrosmaskit (Siirtosepän splat-rajapinta 1.10.) ja aluskasvit (Linssiseppä 2), jos viety.
    const MAA = JSON.parse(readFileSync(new URL('../../js/dioraama/rakennukset/olavinlinna/ymparisto-maasto.json', import.meta.url), 'utf8'));
    const maaTied = ['splat-0.png', 'splat-1.png', 'splat-normaali-0.png',
      ...MAA.kerrokset.flatMap((k) => [`maasto/${k.lahde}_diff_1k.jpg`, `maasto/${k.lahde}_nor_gl_1k.jpg`])];
    if (maaTied.every((p) => on.has(Y(p)))) {
      rakennusJson.ymparisto.maasto = {
        alue: MAA.alue, lahi_m: MAA.lahi_m,
        maski: [B(Y('splat-0.png')), B(Y('splat-1.png'))], maski_normaali: B(Y('splat-normaali-0.png')),
        kerrokset: MAA.kerrokset.map((k) => ({ id: k.id, diff: B(Y(`maasto/${k.lahde}_diff_1k.jpg`)),
          nor: B(Y(`maasto/${k.lahde}_nor_gl_1k.jpg`)), toisto_m: k.toisto_m,
          // ASTC + keski (lineaarinen luminanssi 0,2126/0,7152/0,0722, ymparisto-maasto.json), vain jos .astcm on viety.
          ...([`maasto/${k.lahde}_diff_1k-4x4.astcm`, `maasto/${k.lahde}_nor_gl_1k-4x4.astcm`].every((p) => on.has(Y(p)))
            ? { diff_astc: B(Y(`maasto/${k.lahde}_diff_1k-4x4.astcm`)), nor_astc: B(Y(`maasto/${k.lahde}_nor_gl_1k-4x4.astcm`)), keski: k.keski } : {}) })),
      };
    }
    // Puukorttien normaalikartta (v3, Siirtoseppä 1.10.: tangenttiavaruus, OpenGL), jos viety.
    if (on.has(Y('puukortit-normaali.png'))) rakennusJson.ymparisto.puukortit_normaali = B(Y('puukortit-normaali.png'));
    // Taivas (Siirtosepän pyyntö 1.10.): välikuvien Poly Haven -taivaat LDR-equirectinä (AgX, 2048 × 1024). u = 0 osoittaa
    // atsimuuttiin taivas_suunta (270 = länsi) ja u kasvaa myötäpäivään; kuvan alapuolisko on HDRI:n synteettistä maata.
    if (['taivas-2k.jpg', 'taivas-hamara-2k.jpg'].every((p) => on.has(Y(p)))) {
      Object.assign(rakennusJson.ymparisto, { taivas: B(Y('taivas-2k.jpg')), taivas_hamara: B(Y('taivas-hamara-2k.jpg')), taivas_suunta: 270 });
    }
    if (['aluskasvit.png', 'aluskasvit-hamara.png', 'aluskasvit.json', 'aluskasvit-lista.json'].every((p) => on.has(Y(p)))) {
      rakennusJson.ymparisto.aluskasvit = { atlas: B(Y('aluskasvit.png')), atlas_hamara: B(Y('aluskasvit-hamara.png')),
        kortit: B(Y('aluskasvit.json')), lista: B(Y('aluskasvit-lista.json')) };
    }
    // ASTC-mipketjut (Siirtoseppä 1.10., ensilataus v2: iPadin LoadImage-purkupiikit pois). png/jpg-kentät jäävät
    // (simulaattori ja vanhat natiivit); *_astc vain, jos .astcm on viety. Lohko 4×4, alfa säilyy, normaalikartta lineaarisena.
    const ya = rakennusJson.ymparisto;
    const astc = (o, k, p) => { if (o && on.has(Y(p))) o[k] = B(Y(p)); };
    astc(ya, 'puukortit_astc', 'puukortit-4x4.astcm'); astc(ya.hamara, 'puukortit_astc', 'puukortit-hamara-4x4.astcm');
    if (ya.puukortit_normaali) astc(ya, 'puukortit_normaali_astc', 'puukortit-normaali-4x4.astcm');
    astc(ya, 'horisontti_kuva_astc', 'horisontti-1k-4x4.astcm'); astc(ya.hamara, 'horisontti_kuva_astc', 'horisontti-hamara-1k-4x4.astcm');
    if (ya.taivas) { astc(ya, 'taivas_astc', 'taivas-2k-4x4.astcm'); astc(ya, 'taivas_hamara_astc', 'taivas-hamara-2k-4x4.astcm'); }
    astc(ya.aluskasvit, 'atlas_astc', 'aluskasvit-4x4.astcm'); astc(ya.aluskasvit, 'atlas_hamara_astc', 'aluskasvit-hamara-4x4.astcm');
  }
  // Staattiset ympäristömallit (Siirtoseppä 7.10., natiivi historia-h0): ymparisto/mallit/<id>.glb (+ <id>-kevyt.glb) →
  // ymparisto.mallit[] { id, huippu, kevyt }. Rantakivikko ja kalliojalusta, myöhemmin vene. Vanha natiivi ohittaa kentän.
  const mallit = [...on.keys()].filter((p) => /^ymparisto\/mallit\/[^/]+\.glb$/.test(p) && !p.endsWith('-kevyt.glb')).sort()
    .map((p) => { const id = p.slice('ymparisto/mallit/'.length, -4); const kevyt = `ymparisto/mallit/${id}-kevyt.glb`;
      return { id, huippu: B(p), kevyt: B(on.has(kevyt) ? kevyt : p), ...(rakennusJson.ymparistoMallit?.[id] ?? {}) }; });
  delete rakennusJson.ymparistoMallit;   // rakennuskohtaiset lisäkentät malleille, esim. vene { maailmaan: false } (Siirtoseppä 7.10.)
  if (mallit.length) { rakennusJson.ymparisto = rakennusJson.ymparisto || {}; rakennusJson.ymparisto.mallit = mallit; }
  // Vapaa kävely (omistaja 7.10. 08.4x; Linnanrakentaja + Siirtoseppä): kavely/osat.json (osien glb:t, rajat, naapurit,
  // portaalit, leikkaukset, kamera_rajat) ja kavely/merkit.json (ovi:, piilo:, esine:, partio:). Polut osat.jsonissa
  // suhteessa kavely/-kansioon. Vain jos viety; vanha natiivi ohittaa kentän.
  if (on.has('kavely/osat.json') && on.has('kavely/merkit.json')) {
    rakennusJson.kavely = { osat: B('kavely/osat.json'), merkit: B('kavely/merkit.json') };
  }
  const atlas = (id, v) => ({
    tiedosto: B(`valot/${id}${v}.jpg`), puoli: B(`valot/${id}${v}-2k.jpg`),
    astc: B(`valot/${id}${v}-4x4.astcm`), astcPuoli: B(`valot/${id}${v}-2k-4x4.astcm`),
  });
  // Äänitilat (Linnanrakentaja 30.9., Siirtosepän kuittaus): yleisnäkymän taustaäänet soivat massa-tilasta
  // (natiivin Aanimaisema.MassaTilaId), joten kohdistamaton tila, jolla on ääniä mutta ei leivottua glb:tä, jää
  // pakettiin ILMAN glb:tä ja vain kentillä id, nimi, kohdistettava, rajat, aanet ja tehosteet (lataaja ohittaa
  // piirron; hahmot, palikat, valot, liekit ja käsikirjoitus pois, etteivät ne ilmesty kuoren päälle).
  const aanitilat = rakennusJson.tilat
    .filter((t) => !on.has(`tilat/${t.id}.glb`) && t.kohdistettava === false && (t.aanet?.length || t.tehosteet?.length))
    .map((t) => ({ id: t.id, nimi: t.nimi, kohdistettava: false, rajat: t.rajat, aanet: t.aanet ?? [],
      tehosteet: t.tehosteet ?? [] }));
  rakennusJson.tilat = rakennusJson.tilat.filter((t) => on.has(`tilat/${t.id}.glb`));
  for (const t of rakennusJson.tilat) {
    const g = on.get(`tilat/${t.id}.glb`);
    t.glb = { tiedosto: B(`tilat/${t.id}.glb`), sha256: g.sha256, tavuja: g.tavuja };
    // Kohdistamaton tila (tunnelma; erä 1b, Päätoimittaja 2.10. 23.xx): liekit tulevat leivotun glb:n liekki:-tyhjistä,
    // jotka natiivi leikkaa leikkauskäytävästä telineidensä kanssa. JSON-liekit jäivät näkyviin ilman telinettä
    // (fatabuuri, keittiö, laituri: liekki "tyhjässä"), joten ne jätetään pois paketista.
    if (t.kohdistettava === false) delete t.liekit;
    if (on.has(`valot/${t.id}.jpg`)) {
      t.valoatlas = atlas(t.id, '');
      if (on.has(`valot/${t.id}-hamara.jpg`)) t.valoatlas.hamara = atlas(t.id, '-hamara');
    }
  }
  rakennusJson.tilat.push(...aanitilat);
  return blender.tiedostot.map((t) => ({ polku: `blender/${t.polku}`, sha256: t.sha256, tavuja: t.tavuja }));
}

/**
 * Palikkapaketin vartija (TF 1.0.61): kun rakennuksella on blender.json, rakennus.json EI saa lähteä ilman ulkokuorta
 * tai proseduraalisilla tila-glb:illä. Heittää virheen, jolloin rakennus ja vie-dioraama.yml pysähtyvät ennen latausta.
 */
export function tarkistaBlenderPaketti(rakennusJson, blender) {
  if (!blender) return;
  const k = rakennusJson.ulkokuori;
  if (!k || !['huippu', 'normaali', 'kevyt'].every((t) => typeof k[t] === 'string' && k[t].startsWith('blender/'))) {
    throw new Error(`${rakennusJson.id}: blender.json on olemassa, mutta rakennus.json:sta puuttuu ulkokuori (palikkapaketti)`);
  }
  if (!rakennusJson.tilat?.length) throw new Error(`${rakennusJson.id}: blender.json on olemassa, mutta tiloja ei ole`);
  for (const t of rakennusJson.tilat) {
    if (t.glb === undefined && t.kohdistettava === false && !t.hahmot && !t.palikat && !t.valot && !t.liekit) continue;   // äänitila
    if (!t.glb?.tiedosto?.startsWith('blender/')) throw new Error(`${rakennusJson.id}/${t.id}: tila-glb ei ole leivottu (blender/)`);
  }
}

export async function rakennaData(rakennus, {
  ulos = 'dist/dioraama', saateita = 48, assetsJuuri = OLETUS_ASSETS_JUURI, aanetKansio = null, blender = null,
} = {}) {
  if (!rakennus || typeof rakennus.id !== 'string' || rakennus.id.length === 0) {
    throw new Error('rakennaData: rakennus.id puuttuu tai ei ole merkkijono');
  }
  if (!Array.isArray(rakennus.tilat) || rakennus.tilat.length === 0) {
    throw new Error(`rakennaData: rakennuksella '${rakennus.id}' ei ole yhtään tilaa`);
  }
  // Tilakohtainen sijoitus (sijoitus.mjs, speksi rajapinnat-blender kohta 2): muunnetaan ENNEN kaikkea muuta, jolloin
  // glb:t, AO ja rakennus.json (JSON-kopio alempana) saavat sijoitetut arvot. Ei muuta alkuperäistä.
  rakennus = { ...rakennus, tilat: rakennus.tilat.map(sijoitaTila) };
  const aikaAlku = performance.now();
  const kansio = join(ulos, rakennus.id);
  mkdirSync(join(kansio, 'tilat'), { recursive: true });
  mkdirSync(join(kansio, 'hahmot'), { recursive: true });
  mkdirSync(join(kansio, 'hahmot3d'), { recursive: true }); // era2b kohta 4: 3D-pienoisfiguurit

  // VAIHE A: jokaisen tilan raaka kolmiosoppa (sijoita, EI ryhmittelyä/hitsausta).
  // Tarvitaan KAIKILTA tiloilta etukäteen, koska AO:n peittäjät (kohta 3b: "oma
  // tila + naapurit + massa") voivat viitata TOISEEN tilaan, jota ei muuten
  // vielä olisi käsitelty.
  const rawPerTila = new Map(); // id -> Kolmio[]
  const flatPerTila = new Map(); // id -> Float32Array (samat kolmiot, litteänä BVH:ta varten)
  const valotPerTila = new Map(); // id -> rekvisiitan valot (era2b kohta 3: kynttilänjalka/öljylamppu)
  for (const tila of rakennus.tilat) {
    // Tihennys: kärkikohtainen AO ja lämpö tarvitsevat kärkiä myös isojen pintojen keskelle (12 × 7 m:n lattiassa
    // oli vain nurkat, eikä tulisijan hehku näkynyt). Kohdistettava tila 0,5 m, massa 2 m, kallio 4 m, vesi ei lainkaan.
    const valotTassaTilassa = [];
    const raw = tila.palikat.flatMap((palikka, i) => {
      const sijoitettu = sijoita(palikka);
      // Rekvisiitan valot (era2b kohta 3): .valo ei ole Kolmio-alkio, joten se pitää ottaa talteen
      // TÄSSÄ — tihenna() rakentaa uuden taulukon ja flatMap litistää, molemmat pudottaisivat
      // ei-indeksoidun ominaisuuden. lepatus resepti-nimen mukaan (koordinaattorin ohje: kynttilä
      // 0,2, lamppu 0,1).
      if (sijoitettu.valo) {
        const lepatus = palikka.resepti === 'kynttilanjalka' ? 0.2 : 0.1;
        valotTassaTilassa.push({ ...sijoitettu.valo, lahde: 'rekvisiitta', lepatus });
      }
      const kolmiot = tihenna(sijoitettu, tihennysraja(palikka, tila));
      // COLOR_0.B (era2b kohta 1): oletus `osa` = koko palikka kerrallaan, JOS resepti ei ole itse
      // merkinnyt kärkiä pienemmillä osilla (esim. lattioiden yksittäiset laatat/lankut, ks.
      // reseptit-lattiat.mjs) — sijoita() on jo kopioinut sellaisen k.osa:ksi jos resepti antoi sen.
      const osaOletus = `${tila.id}#${i}`;
      for (const k of kolmiot) if (k.osa === undefined) k.osa = osaOletus;
      return kolmiot;
    });
    if (raw.length === 0) throw new Error(`rakenna: tilalla '${tila.id}' ei ole yhtään kolmiota (tyhjä palikat?)`);
    rawPerTila.set(tila.id, raw);
    flatPerTila.set(tila.id, litistaKolmiot(raw));
    valotPerTila.set(tila.id, valotTassaTilassa);
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
    // Lämmön valot: tilan omat (esim. tulisija) + rekvisiitan kynttilät/lamput (era2b kohta 3) —
    // rekvisiitan valot leivotaan lämpöön SAMALLA kaavalla kuin tilan muutkaan valot (ks. yllä).
    // tyyppi 'keila' (era2b, ikkunan aurinko, omistajan valo-päätös 29.9.) OHITETAAN tästä: auringonvalo
    // ei ole lämpöä, vain reaaliaikainen valo natiivissa/esikatselussa. Suodatus ei mutatoi `tila.valot`-
    // taulukkoa (spread + filter palauttavat uudet taulukot) — rakennus.json (t.valot alempana) vie siis
    // keila-valon SELLAISENAAN, filter vaikuttaa vain tähän paikalliseen lämpölaskuun.
    const valotLampoon = [...(tila.valot ?? []), ...valotPerTila.get(tila.id)].filter((v) => v.tyyppi !== 'keila');
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
      const osaTunnisteet = ryhma.osaTunnisteet; // rinnakkain paikat/normaalit/uv:n kanssa

      const ao = leivoAO(bvh, paikat, normaalit, { saateita, max: AO_MAX_M });
      const lampoArvot = lampo(paikat, valotLampoon);
      const hehku = PINNAT[pinta]?.hehku ?? 0;

      // COLOR_0: R = AO (1 = avoin), G = lämpö + pinnan hehku (rajattu [0,1]),
      // B = osan satunnaisluku (era2b kohta 1, ks. osanSatunnaisluku), A = 255.
      const varit = new Uint8Array(karkia * 4);
      for (let i = 0; i < karkia; i++) {
        const aoArvo = Math.min(1, Math.max(0, ao[i]));
        const lampoArvo = Math.min(1, Math.max(0, lampoArvot[i] + hehku));
        const bArvo = osanSatunnaisluku(osaTunnisteet[i]);
        varit[i * 4] = Math.round(aoArvo * 255);
        varit[i * 4 + 1] = Math.round(lampoArvo * 255);
        varit[i * 4 + 2] = Math.round(bArvo * 255);
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
    // Tilan äänisilmukat: kentän nimi on speksin (era2 kohta 2 "AANET") mukaan `aani`, ei `id`
    // — merkkijonotuki (lyhyt muoto, pelkkä id) säilytetty siltä varalta että jokin data käyttää sitä.
    for (const a of tila.aanet ?? []) {
      if (typeof a === 'string') kaytetytAanet.add(a);
      else if (a && typeof a.aani === 'string') kaytetytAanet.add(a.aani);
    }
    // Tilan satunnaiset kertaäänet (era2 kohta 2 "AANET": tehosteet[].aanet[]) ja tilan oman
    // taulun kohdat (taulu.kohdat[].aani) — RAKENNUS-tason taulu kerätään erikseen alempana.
    for (const t of tila.tehosteet ?? []) {
      for (const id of t.aanet ?? []) if (typeof id === 'string') kaytetytAanet.add(id);
    }
    for (const kohta of tila.taulu?.kohdat ?? []) {
      if (kohta.aani != null) kaytetytAanet.add(kohta.aani);
    }

    tilaTulokset.push({
      id: tila.id, tiedosto: tiedostoSuhteellinen, sha256, kolmiot: kolmioYht, karkia: karkiYht, tavuja: glbBuffer.length,
    });
  }

  // Irtoesineet (elävä linna, voudin sinetti 29.9.): tilan `esineet[]` ovat palikan muotoisia (resepti, paikka, suunta,
  // parametrit), mutta niitä EI yhdistetä tilan verkkoon eikä valoatlakseen, koska natiivi liikuttaa niitä (arkun kansi
  // aukeaa saranastaan, sinetti nousee käteen). Jokainen omaksi glb:kseen esineet/<tila>-<id>.glb (maailmakoordinaatit
  // kuten tilat; COLOR_0: AO 1, lämpö = pinnan hehku). Valinnainen `sarana: [u, y, w]` (esineen paikallinen) viedään
  // maailmapisteeksi ja `akseli` esineen u-suunnaksi, jonka ympäri natiivi kääntää `avaa`-asteen verran.
  const esineTulokset = new Map();
  for (const tila of rakennus.tilat) {
    for (const e of tila.esineet ?? []) {
      mkdirSync(join(kansio, 'esineet'), { recursive: true });
      const raw = sijoita(e);
      for (const k of raw) k.osa = `${tila.id}:${e.id}`;
      const ryhmat = ryhmitteleJaHitsaa(raw);
      const osat = [];
      for (const pinta of [...ryhmat.keys()].sort()) {
        const r = ryhmat.get(pinta); kaytetytPinnat.add(pinta);
        const karkia = r.positions.length / 3, varit = new Uint8Array(karkia * 4);
        const g = Math.round(Math.min(1, PINNAT[pinta]?.hehku ?? 0) * 255);
        for (let i = 0; i < karkia; i++) varit.set([255, g, Math.round(osanSatunnaisluku(r.osaTunnisteet[i]) * 255), 255], i * 4);
        osat.push({
          pinta, vari: PINNAT[pinta].vari, paikat: Float32Array.from(r.positions), normaalit: Float32Array.from(r.normals),
          uv: Float32Array.from(r.uvs), varit, kolmiot: Uint32Array.from(r.indices),
        });
      }
      const buf = kirjoitaGlb({ nimi: `${tila.id}-${e.id}`, osat });
      const tiedosto = `esineet/${tila.id}-${e.id}.glb`;
      writeFileSync(join(kansio, tiedosto), buf);
      const tulos = { tiedosto, sha256: createHash('sha256').update(buf).digest('hex'), tavuja: buf.length };
      if (Array.isArray(e.sarana)) {
        const s = (e.suunta || 0) * Math.PI / 180, r = [Math.cos(s), 0, Math.sin(s)], f = [Math.sin(s), 0, -Math.cos(s)];
        const [u, y, w] = e.sarana, [px, py, pz] = e.paikka;
        const pyor = (x) => Math.round(x * 1e6) / 1e6;
        tulos.sarana = [pyor(px + u * r[0] + w * f[0]), pyor(py + y), pyor(pz + u * r[2] + w * f[2])];
        tulos.akseli = r.map(pyor);
      }
      if (!esineTulokset.has(tila.id)) esineTulokset.set(tila.id, []);
      esineTulokset.get(tila.id).push({ id: e.id, ...tulos });
    }
  }

  // RAKENNUS-tason taulun äänet (era2 kohta 2 "AANET"): eri taulu kuin tilojen omat (esim.
  // 'massa'-tilalla ei ole omaa taulua — se käyttää tätä yhteistä linnan taulua).
  for (const kohta of rakennus.taulu?.kohdat ?? []) {
    if (kohta.aani != null) kaytetytAanet.add(kohta.aani);
  }
  // Uuden linnan puheet (#3742, Siirtoseppä 1.10.2026: kuiva paketti 353b5142 ilman näitä → 43/133 ääntä puuttui
  // pankista, eikä natiivi soittanut niitä): kertojan jaksot, Pulun kertomukset (rakennus ja tilat), tilan kuunnelma
  // ja etsinnän repliikit.
  const lisaaAani = (id) => { if (typeof id === 'string') kaytetytAanet.add(id); };
  for (const jakso of rakennus.kertoja?.jaksot ?? []) lisaaAani(jakso?.aani);
  lisaaAani(rakennus.pulu?.aani);
  for (const tila of rakennus.tilat) {
    lisaaAani(tila.pulu?.aani);
    for (const rivi of tila.kuunnelma ?? []) lisaaAani(rivi?.aani);
    for (const vaihe of tila.etsinta ?? []) { lisaaAani(vaihe?.aani); lisaaAani(vaihe?.repliikki?.aani); }
  }

  // Käytetyt liekit (erä 2, era2-speksin kohta 2 "LIEKIT"): kerätty tilojen omista
  // `liekit`-listoista (oma pieni silmukka — ei kosketa yllä olevaa geometria/AO-silmukkaa).
  const kaytetytLiekit = new Set();
  for (const tila of rakennus.tilat) {
    for (const l of tila.liekit ?? []) {
      if (l && typeof l.liekki === 'string') kaytetytLiekit.add(l.liekki);
    }
  }

  // Pintakuvat (erä 2, media.mjs): kopioidaan käytetyille pinnoille, joilla on `lahde`
  // JA lähdetiedosto löytyy levyltä. Puuttuva → "ei lähdettä" (media.mjs tulostaa) + ei tekstuuria.
  const pintaTulokset = [];
  const pintaAtlas = new Map(); // id -> tiedosto (vain onnistuneet kopiot)
  for (const id of [...kaytetytPinnat].sort()) {
    const tulos = kopioiPinnanKuva(id, PINNAT[id], kansio, assetsJuuri);
    if (tulos) { pintaTulokset.push({ id, ...tulos }); pintaAtlas.set(id, tulos); }
  }

  // Henkilöatlaat: maalattu (jos lähde löytyy) tai paikkamerkki (media.mjs, kohta 2 "HENKILOT").
  const hahmoTulokset = [];
  const henkiloAtlas = new Map(); // id -> { polku, maalattu }
  for (const id of [...kaytetytHenkilot].sort()) {
    const henkilo = HENKILOT[id];
    if (!henkilo) throw new Error(`rakenna: käytetty henkilö '${id}' puuttuu HENKILOT-pankista`);
    const tulos = teeHenkilonAtlas(id, henkilo, kansio, assetsJuuri);
    if (!tulos) continue; // ei paikkamerkkiä eikä maalattua lähdettä (ei tapahdu nykyisellä pankilla)
    henkiloAtlas.set(id, { polku: tulos.polku, maalattu: tulos.maalattu });
    hahmoTulokset.push({ id, polku: tulos.polku, sha256: tulos.sha256, tavuja: tulos.tavuja });
  }

  // 3D-pienoisfiguurit (era2b kohta 4 "3D-HAHMOT", ali-agentti P4a): jokaiselle
  // käytetylle henkilölle, jolla on malli3d, teeHahmo3d [hahmot3d.mjs] + kirjoita-
  // MonisolmuGlb [glb.mjs] -> hahmot3d/<id>.glb. Henkilöllä ei ole malli3d:tä EI
  // ole virhe (ei tapahdu nykyisellä pankilla, mutta rakennuskone ei pakota 3D-mallia).
  const hahmo3dTulokset = [];
  const hahmo3dPolku = new Map(); // id -> 'hahmot3d/<id>.glb'
  for (const id of [...kaytetytHenkilot].sort()) {
    const henkilo = HENKILOT[id];
    if (!henkilo?.malli3d) continue;
    const hahmo3d = teeHahmo3d(id, henkilo);
    const glbBuffer3d = kirjoitaMonisolmuGlb({ nimi: id, solmut: hahmo3d.solmut });
    const tiedostoSuhteellinen3d = `hahmot3d/${id}.glb`;
    writeFileSync(join(kansio, 'hahmot3d', `${id}.glb`), glbBuffer3d);
    const sha3d = createHash('sha256').update(glbBuffer3d).digest('hex');
    hahmo3dPolku.set(id, tiedostoSuhteellinen3d);
    hahmo3dTulokset.push({ id, polku: tiedostoSuhteellinen3d, sha256: sha3d, tavuja: glbBuffer3d.length });
  }

  // Liekkiatlaat: lähde (jos löytyy) tai proseduraalinen paikkamerkki (media.mjs, kohta 2 "LIEKIT").
  // Liekillä on aina jotain piirrettävää, joten atlas syntyy aina käytetylle liekille.
  const liekkiTulokset = [];
  const liekkiAtlas = new Map(); // id -> tiedosto
  for (const id of [...kaytetytLiekit].sort()) {
    const liekki = LIEKIT[id];
    if (!liekki) throw new Error(`rakenna: käytetty liekki '${id}' puuttuu LIEKIT-pankista`);
    const tulos = teeLiekinAtlas(id, liekki, kansio, assetsJuuri);
    liekkiTulokset.push({ id, ...tulos });
    liekkiAtlas.set(id, tulos);
  }

  // Äänten versiot (koordinaattorin lisäys 29.9., era2 kohta 1/2): natiivi välimuistittaa äänet
  // levylle URL:n mukaan, joten polku sisältää AANET-pankin version (uusintaotto → versio kasvaa
  // VAIN sillä äänellä → uusi URL). Puuttuvalle id:lle oletus 1 — alempi Object.hasOwn-tarkistus
  // heittää joka tapauksessa selvän virheen, joten tämä ei peitä sitä.
  const aanetVersiot = Object.fromEntries([...kaytetytAanet].map((id) => [id, AANET[id]?.versio ?? 1]));

  // Äänten paikalliskopio (vain jos --aanet annettu; ks. era2-speksin kohta 1).
  const aanetTulokset = kopioiAanet(kaytetytAanet, kansio, aanetKansio, aanetVersiot);

  // rakennus.json: lähdedata sellaisenaan (syväkopio JSON:in kautta, jottei alkuperäistä
  // moduulia mutatoida) + jokaiselle tilalle glb-kentät + käytetyt pinnat/henkilot/liekit/aanet.
  const rakennusJson = JSON.parse(JSON.stringify(rakennus));
  for (const t of rakennusJson.tilat) {
    const tulos = tilaTulokset.find((x) => x.id === t.id);
    t.glb = {
      tiedosto: tulos.tiedosto, sha256: tulos.sha256, kolmiot: tulos.kolmiot, karkia: tulos.karkia,
    };
    // Rekvisiitan valot (era2b kohta 3) tilan OMAN valot-listan jatkoksi — sama muoto
    // (paikka, sade, voima, vari), lisänä lahde: 'rekvisiitta' ja lepatus (ks. valotPerTila yllä).
    t.valot = [...(t.valot ?? []), ...valotPerTila.get(t.id)];
    if (t.esineet) {
      const et = esineTulokset.get(t.id) ?? [];
      t.esineet = t.esineet.map((e) => ({ ...e, ...et.find((x) => x.id === e.id) }));
    }
  }
  rakennusJson.pinnat = {};
  for (const id of [...kaytetytPinnat].sort()) {
    // `lahde` ei tulostu — `tekstuuri` korvaa sen vain jos lähde todella kopioitui (era2 kohta 2 "PINNAT").
    const { lahde, ...muu } = PINNAT[id];
    const atlas = pintaAtlas.get(id);
    // tekstuuri_puoli (era 2b, tekstuurimuisti): mukana vain jos kopioiPinnanKuva löysi puolikkaan
    // (ks. media.mjs) -- natiivi (DioraamaData.Pinta.TekstuuriPuoli) käyttää täyttä, jos kenttä puuttuu.
    rakennusJson.pinnat[id] = atlas
      ? { ...muu, tekstuuri: atlas.polku, ...(atlas.puoli ? { tekstuuri_puoli: atlas.puoli.polku } : {}) }
      : muu;
  }
  rakennusJson.henkilot = {};
  for (const id of [...kaytetytHenkilot].sort()) {
    const henkilo = HENKILOT[id];
    const atlas = henkiloAtlas.get(id);
    if (atlas?.maalattu) {
      // Maalattu-muoto (era2 kohta 2 "HENKILOT"): maalattu-lohkon kentät ylätasolle
      // (ei `lahde`) + nimi/korkeus_m henkilöltä itseltään + atlas-polku.
      const { lahde, ...maalattuMuu } = henkilo.maalattu;
      rakennusJson.henkilot[id] = {
        nimi: henkilo.nimi, korkeus_m: henkilo.korkeus_m, ...maalattuMuu, atlas: atlas.polku,
      };
    } else {
      // Nykyinen paikkamerkkimuoto (ei px_per_m). `maalattu` (jos oli, mutta lähde
      // puuttui levyltä) ei kuulu tänne — samasta syystä kuin pinnan `lahde`.
      const { maalattu, ...muu } = henkilo;
      rakennusJson.henkilot[id] = atlas ? { ...muu, atlas: atlas.polku } : muu;
    }
    // era2b kohta 4: malli3d.glb korvaa lähdedatan malli3d-oliossa (sama tapa kuin
    // atlas edellä) — vain jos hahmot3d/<id>.glb todella syntyi tälle henkilölle.
    if (hahmo3dPolku.has(id)) {
      rakennusJson.henkilot[id].malli3d = { ...henkilo.malli3d, glb: hahmo3dPolku.get(id) };
    }
  }
  rakennusJson.liekit = {};
  for (const id of [...kaytetytLiekit].sort()) {
    const { lahde, ...muu } = LIEKIT[id];
    rakennusJson.liekit[id] = { ...muu, atlas: liekkiAtlas.get(id).polku };
  }
  rakennusJson.aanet = {};
  for (const id of [...kaytetytAanet].sort()) {
    if (!Object.hasOwn(AANET, id)) throw new Error(`rakenna: käytetty ääni '${id}' puuttuu AANET-pankista`);
    const { silmukka, voimakkuus, kesto_s: kestoS, versio, kuiva, kaiku, kaikuPitka, kohdistus } = AANET[id];
    // `tiedosto` on suhteessa rakennuksen juureen (ei hash-kansioon) — vakio polku riippumatta
    // siitä, kopioitiinko paikallinen mp3 tässä ajossa (`--aanet`); ämpäri tarjoaa sen julkaisussa.
    // v<versio>-alikansio: ks. aanetVersiot yllä (natiivin URL-välimuisti).
    rakennusJson.aanet[id] = { tiedosto: `aanet/v${versio ?? 1}/${id}.mp3`, silmukka, voimakkuus, kesto_s: kestoS };
    // Mikseritilan valinnaiset otot (kehittäjätila; Pelikoodari 30.9.): '/'-alkuinen polku median juuresta.
    for (const [k, v] of Object.entries({ kuiva, kaiku, kaikuPitka })) if (v !== undefined) rakennusJson.aanet[id][k] = v;
    // Huulisynkka (Linnanrakentaja 6.10., Faceit-ilmeet): ElevenLabsin merkkikohdistus { merkit, alut_s, loput_s } sellaisenaan.
    const kohd = kohdistus ?? KOHDISTUKSET[id];
    if (kohd !== undefined) rakennusJson.aanet[id].kohdistus = kohd;
  }
  // era2b kohta 4 (3D-hahmot, ali-agentti P4b): liikesilmukkapankki LIIKKEET rakennus.json:iin SELLAISENAAN
  // (sama muoto kuin js/dioraama/pankit/liikkeet.js — ei rakennuskohtaista suodatusta, koska mikä silmukka
  // milloin soi, päättää Heratys.HahmonTilan ajonaikaisesti, ei rakennuskone). Vain jos rakennuksella on
  // vähintään yksi 3D-hahmo (hahmo3dTulokset) — muuten kenttä jää kokonaan pois (DioraamaData.Rakennus.Liikkeet
  // pysyy tyhjänä, kuten Liekit/Aanet vanhassa muodossa).
  if (hahmo3dTulokset.length > 0) rakennusJson.liikkeet = LIIKKEET;

  // Blender-tuotokset (ks. alkukommentin BLENDER-PUTKI): kentät lisaaBlender(), tarkistus ennen rakennus.json:n kirjoitusta.
  const blenderRivit = blender ? lisaaBlender(rakennusJson, blender) : [];
  tarkistaBlenderPaketti(rakennusJson, blender);

  // Matkamuistojen kuvat (voudin sinetti 29.9., Pelikoodarin löytökortti): <assets>/<rakennus>/matkamuistot/<etsinta.id>.jpg
  // pakettiin samaan polkuun, etsintään kenttä `kuva` ja manifestiin. Puuttuva kuva ei ole virhe (kortti ilman kuvaa).
  const matkamuistoTulokset = [];
  for (const e of rakennusJson.etsinnat ?? []) {
    const polku = `matkamuistot/${e.id}.jpg`, lahde = join(assetsJuuri, rakennus.id, polku);
    if (!existsSync(lahde)) { console.log(`  ei lähdettä: ${lahde}`); continue; }
    mkdirSync(join(kansio, 'matkamuistot'), { recursive: true });
    copyFileSync(lahde, join(kansio, polku));
    const buf = readFileSync(lahde);
    matkamuistoTulokset.push({ polku, sha256: createHash('sha256').update(buf).digest('hex'), tavuja: buf.length });
    e.kuva = polku;
  }

  const rakennusJsonBuf = Buffer.from(`${JSON.stringify(rakennusJson, null, 2)}\n`, 'utf8');
  const rakennusJsonPolku = 'rakennus.json';
  writeFileSync(join(kansio, rakennusJsonPolku), rakennusJsonBuf);
  const rakennusJsonSha = createHash('sha256').update(rakennusJsonBuf).digest('hex');

  // manifest.json: aakkosjärjestyksessä, EI aikaleimoja — sama syöte = sama tavujono.
  const tiedostot = [
    ...tilaTulokset.map((t) => ({ polku: t.tiedosto, sha256: t.sha256, tavuja: t.tavuja })),
    // Puolikas (p.puoli, ks. media.mjs kopioiPinnanKuva) on OMA fyysinen tiedosto pakettikansiossa --
    // pitää listata manifestissa niin kuin täysikin, tai paketin sisältö ei täsmää manifestiin.
    ...pintaTulokset.flatMap((p) => [
      { polku: p.polku, sha256: p.sha256, tavuja: p.tavuja },
      ...(p.puoli ? [{ polku: p.puoli.polku, sha256: p.puoli.sha256, tavuja: p.puoli.tavuja }] : []),
    ]),
    ...hahmoTulokset.map((h) => ({ polku: h.polku, sha256: h.sha256, tavuja: h.tavuja })),
    ...hahmo3dTulokset.map((h) => ({ polku: h.polku, sha256: h.sha256, tavuja: h.tavuja })),
    ...liekkiTulokset.map((l) => ({ polku: l.polku, sha256: l.sha256, tavuja: l.tavuja })),
    ...aanetTulokset.map((a) => ({ polku: a.polku, sha256: a.sha256, tavuja: a.tavuja })),
    ...[...esineTulokset.values()].flat().map((e) => ({ polku: e.tiedosto, sha256: e.sha256, tavuja: e.tavuja })),
    ...matkamuistoTulokset,
    ...blenderRivit,
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
    pinnat: pintaTulokset,
    hahmot: hahmoTulokset,
    hahmot3d: hahmo3dTulokset,
    liekit: liekkiTulokset,
    aanet: aanetTulokset,
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
    console.error('Käyttö: node tools/dioraama/rakenna.mjs <rakennus-id> [--ulos dist/dioraama] [--saateita 48] [--aanet <kansio>]');
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
  const aanetKansio = lippu('--aanet'); // null = ei kopioida paikallisia ääniä (speksin kohta 1)

  const moduulinUrl = new URL(`../../js/dioraama/rakennukset/${rakennusId}.js`, import.meta.url);
  const { RAKENNUS } = await import(moduulinUrl.href);

  const blenderPolku = new URL(`../../js/dioraama/rakennukset/${RAKENNUS.id}/blender.json`, import.meta.url);
  const blender = existsSync(blenderPolku) ? JSON.parse(readFileSync(blenderPolku, 'utf8')) : null;
  if (blender) console.log(`  blender.json: ${blender.tiedostot.length} tiedostoa, kansio ${blender.kansio}`);
  const valmiit = `/Users/Shared/Claude/proto-3d/_valmiit/${RAKENNUS.id}-blender`;
  const uusinValmis = existsSync(valmiit)
    ? Math.max(0, ...readdirSync(valmiit, { recursive: true }).map((f) => statSync(join(valmiit, f)).mtimeMs)) : 0;
  if (uusinValmis > 0 && (!blender || uusinValmis > statSync(blenderPolku).mtimeMs)) {
    console.warn(`  VAROITUS: ${valmiit} on ${blender ? 'uudempi kuin blender.json' : 'olemassa, mutta blender.json puuttuu'}`
      + ' — peili ei ole julkaisu: omistaja ajaa tools/dioraama/vie-blender.sh ja blender.json commitoidaan.');
  }
  const tulos = await rakennaData(RAKENNUS, { ulos, saateita, aanetKansio, blender });

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
  if (tulos.pinnat.length > 0) {
    console.log(`\n  pinnat: ${tulos.pinnat.length} kuvaa (${tulos.pinnat.map((p) => p.id).join(', ')})`);
  }
  if (tulos.hahmot.length > 0) {
    console.log(`\n  hahmot: ${tulos.hahmot.length} atlasta (${tulos.hahmot.map((h) => h.id).join(', ')})`);
  }
  if (tulos.hahmot3d.length > 0) {
    console.log(`  hahmot3d: ${tulos.hahmot3d.length} mallia (${tulos.hahmot3d.map((h) => h.id).join(', ')})`);
  }
  if (tulos.liekit.length > 0) {
    console.log(`\n  liekit: ${tulos.liekit.length} atlasta (${tulos.liekit.map((l) => l.id).join(', ')})`);
  }
  if (tulos.aanet.length > 0) {
    console.log(`\n  aanet: ${tulos.aanet.length} tiedostoa (${tulos.aanet.map((a) => a.id).join(', ')})`);
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
