/*
 * Dioraamamoottorin AO-leivonta (Linnanrakentaja, ali-agentti B3, erä 1).
 * Speksi: docs/raportit/dioraama-rajapinnat-20260929.md kohdat 0, 3 ja 3b.
 *
 * BVH (keskijako, lehdessä enintään LEHDEN_KOKO kolmiota) + Möller–Trumbore
 * -säde/kolmio-testi, ja niiden päälle:
 *  - leivoAO: deterministinen kosinipainotettu Fibonacci-puolipallo per kärki,
 *    lähimmän osuman etäisyyteen perustuva peittopainotus.
 *  - lampo: valojen käänteisneliöllinen (pehmennetty) etäisyyspainotus.
 *
 * EI NPM-RIIPPUVUUKSIA. Kaikki isot taulukot ovat Float32Array/Uint32Array/
 * Int32Array suorituskyvyn vuoksi (esim. 50 000 kärkeä × 48 sädettä on jo
 * 2,4 miljoonaa sädetestiä yhdelle rakennukselle — ks. suorituskykytesti
 * tests/dioraama-ao.test.mjs:ssä).
 *
 * Julkinen rajapinta (speksin kohta 3b):
 *   luoBvh(kolmiot: Float32Array, 9 lukua/kolmio) → bvh
 *   leivoAO(bvh, pisteet, normaalit, { saateita = 48, max = 3 } = {}) → Float32Array (1 = avoin)
 *   lampo(pisteet, valot) → Float32Array (0–1)
 * Lisäksi `sadeOsuma` on julkinen pieni apufunktio testejä ja diagnostiikkaa
 * varten (BVH:n lähin osuma yhdelle säteelle) — rakenna.mjs ei tarvitse sitä.
 */

const EPS_T = 1e-4; // säteen minimietäisyys itseleikkauksen numeerisen kohinan varalta
const LEHDEN_KOKO = 4; // BVH-lehden enimmäiskolmiomäärä (speksi: "lehdessä ≤ 4 kolmiota")

/* ==================== Pieni vektorimatematiikka ==================== */

function pituus(x, y, z) {
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Ortonormaali kehys (tangentti, bitangentti) normaalin ympärille; normaali
 * itse toimii kolmantena akselina. "Building an Orthonormal Basis, Revisited"
 * (Duff, Burgess, Christensen, Hery, Kensler, Liani, Villemin — JCGT 2017):
 * branchless (yhtä etumerkkivalintaa lukuun ottamatta) ja vakaa myös silloin
 * kun normaali osoittaa lähes suoraan "alas" — naiivi ristitulo kiinteän
 * ylös-vektorin kanssa rappeutuisi juuri siinä tapauksessa.
 */
function ortonormaaliKehys(nx, ny, nz) {
  const s = nz >= 0 ? 1 : -1;
  const a = -1 / (s + nz);
  const b = nx * ny * a;
  const tx = 1 + s * nx * nx * a;
  const ty = s * b;
  const tz = -s * nx;
  const bx = b;
  const by = s + ny * ny * a;
  const bz = -ny;
  return [tx, ty, tz, bx, by, bz];
}

/* ==================== BVH: rakennus (keskijako) ==================== */

/**
 * Rakentaa BVH:n kolmiojoukolle. `kolmiot`: Float32Array, 9 lukua per
 * kolmio (kärki0.xyz, kärki1.xyz, kärki2.xyz), maailmankoordinaatteina.
 *
 * Jako: KESKIJAKO (median split) pisimmän akselin mukaan, akseli ja väli
 * valitaan kolmioiden KESKIPISTEIDEN (centroid) rajoista tällä välillä;
 * osajoukko jaetaan tasan kahtia järjestämällä (TypedArray#sort in-place,
 * komparaattorilla) kolmioindeksit keskipisteen mukaan ja katkaisemalla
 * puolesta välistä. Koska jako on aina TASAN KESKELTÄ MÄÄRÄN mukaan (ei
 * spatiaalisen puolituksen mukaan), puun syvyys on taattu O(log N) myös
 * pahimmassa tapauksessa (esim. päällekkäiset kolmiot) — SAH-koreja ei
 * tarvita, keskijako riittää speksin mukaan ("SAH-kori TAI keskijako").
 *
 * Rakennus on iteratiivinen (eksplisiittinen pino), ei rekursiota.
 */
export function luoBvh(kolmiot) {
  const triCount = kolmiot.length / 9;
  if (triCount === 0) {
    return {
      tyhja: true,
      triCount: 0,
      kolmiot,
      triIndices: new Uint32Array(0),
      boundsMin: new Float32Array(0),
      boundsMax: new Float32Array(0),
      leftFirst: new Int32Array(0),
      count: new Int32Array(0),
      nodeCount: 0,
    };
  }

  // Per-kolmio rajat ja keskipisteet (kerran, käytetään koko rakennuksen ajan).
  const triMinX = new Float32Array(triCount); const triMinY = new Float32Array(triCount); const triMinZ = new Float32Array(triCount);
  const triMaxX = new Float32Array(triCount); const triMaxY = new Float32Array(triCount); const triMaxZ = new Float32Array(triCount);
  const cx = new Float32Array(triCount); const cy = new Float32Array(triCount); const cz = new Float32Array(triCount);
  for (let i = 0; i < triCount; i++) {
    const o = i * 9;
    const x0 = kolmiot[o]; const y0 = kolmiot[o + 1]; const z0 = kolmiot[o + 2];
    const x1 = kolmiot[o + 3]; const y1 = kolmiot[o + 4]; const z1 = kolmiot[o + 5];
    const x2 = kolmiot[o + 6]; const y2 = kolmiot[o + 7]; const z2 = kolmiot[o + 8];
    triMinX[i] = Math.min(x0, x1, x2); triMinY[i] = Math.min(y0, y1, y2); triMinZ[i] = Math.min(z0, z1, z2);
    triMaxX[i] = Math.max(x0, x1, x2); triMaxY[i] = Math.max(y0, y1, y2); triMaxZ[i] = Math.max(z0, z1, z2);
    cx[i] = (x0 + x1 + x2) / 3; cy[i] = (y0 + y1 + y2) / 3; cz[i] = (z0 + z1 + z2) / 3;
  }

  const triIndices = new Uint32Array(triCount);
  for (let i = 0; i < triCount; i++) triIndices[i] = i;

  // Tiukka yläraja solmumäärälle: binääripuu, jossa on enintään triCount
  // lehteä (kullakin ≥ 1 kolmio) → solmuja ≤ 2·triCount − 1.
  const maxNodes = Math.max(1, 2 * triCount - 1);
  const boundsMin = new Float32Array(maxNodes * 3);
  const boundsMax = new Float32Array(maxNodes * 3);
  const leftFirst = new Int32Array(maxNodes);
  const count = new Int32Array(maxNodes);
  let nodeCount = 0;

  function laskeRajat(start, end, nodeIdx) {
    let minX = Infinity; let minY = Infinity; let minZ = Infinity;
    let maxX = -Infinity; let maxY = -Infinity; let maxZ = -Infinity;
    for (let i = start; i < end; i++) {
      const t = triIndices[i];
      if (triMinX[t] < minX) minX = triMinX[t];
      if (triMinY[t] < minY) minY = triMinY[t];
      if (triMinZ[t] < minZ) minZ = triMinZ[t];
      if (triMaxX[t] > maxX) maxX = triMaxX[t];
      if (triMaxY[t] > maxY) maxY = triMaxY[t];
      if (triMaxZ[t] > maxZ) maxZ = triMaxZ[t];
    }
    const b = nodeIdx * 3;
    boundsMin[b] = minX; boundsMin[b + 1] = minY; boundsMin[b + 2] = minZ;
    boundsMax[b] = maxX; boundsMax[b + 1] = maxY; boundsMax[b + 2] = maxZ;
  }

  // Eksplisiittinen pino (iteratiivinen rakennus): rinnakkaiset taulukot
  // [start, end, nodeIdx) korvaavat rekursion.
  const pinoStart = [0]; const pinoEnd = [triCount]; const pinoNode = [nodeCount++];

  while (pinoStart.length > 0) {
    const start = pinoStart.pop();
    const end = pinoEnd.pop();
    const nodeIdx = pinoNode.pop();
    laskeRajat(start, end, nodeIdx);
    const n = end - start;
    if (n <= LEHDEN_KOKO) {
      leftFirst[nodeIdx] = start;
      count[nodeIdx] = n;
      continue;
    }
    // Pisin akseli kolmioiden keskipisteiden rajoista tällä välillä.
    let cMinX = Infinity; let cMinY = Infinity; let cMinZ = Infinity;
    let cMaxX = -Infinity; let cMaxY = -Infinity; let cMaxZ = -Infinity;
    for (let i = start; i < end; i++) {
      const t = triIndices[i];
      if (cx[t] < cMinX) cMinX = cx[t]; if (cx[t] > cMaxX) cMaxX = cx[t];
      if (cy[t] < cMinY) cMinY = cy[t]; if (cy[t] > cMaxY) cMaxY = cy[t];
      if (cz[t] < cMinZ) cMinZ = cz[t]; if (cz[t] > cMaxZ) cMaxZ = cz[t];
    }
    let akseli = 0; let paras = cMaxX - cMinX;
    const ey = cMaxY - cMinY; const ez = cMaxZ - cMinZ;
    if (ey > paras) { akseli = 1; paras = ey; }
    if (ez > paras) { akseli = 2; paras = ez; }
    const keskipiste = akseli === 0 ? cx : (akseli === 1 ? cy : cz);

    // Huom: vaikka kaikki keskipisteet olisivat samat (paras ≈ 0), jako
    // tehdään silti MÄÄRÄN mukaan tasan kahtia (mid alla) — tämä takaa
    // edistymisen (ja siis O(log N) -syvyyden) myös täysin rappeutuneelle
    // syötteelle, koska sort on stabiili ei-vaikutuksetonkaan jaon suhteen.
    const sub = triIndices.subarray(start, end);
    sub.sort((a, b) => keskipiste[a] - keskipiste[b]);
    const mid = start + (n >> 1);

    const leftIdx = nodeCount++;
    const rightIdx = nodeCount++;
    leftFirst[nodeIdx] = leftIdx;
    count[nodeIdx] = 0; // sisäsolmun merkki (lehdellä count on aina ≥ 1)
    pinoStart.push(start); pinoEnd.push(mid); pinoNode.push(leftIdx);
    pinoStart.push(mid); pinoEnd.push(end); pinoNode.push(rightIdx);
  }

  return {
    tyhja: false, triCount, kolmiot, triIndices, boundsMin, boundsMax, leftFirst, count, nodeCount,
  };
}

/* ==================== Möller–Trumbore + BVH-säde ==================== */

/**
 * Yhden kolmion säde/kolmio-leikkaus (Möller–Trumbore). Palauttaa t:n
 * (etäisyys origosta osumaan suunnan (dx,dy,dz) pituuksissa) tai -1 jos ei
 * osumaa. EI taustapinnan karsintaa — AO:ta varten pitää löytää osuma
 * kummalta tahansa puolelta (esim. suljetun laatikon sisäseinät voivat
 * osoittaa kumpaan suuntaan tahansa riippuen lähdedatan kiertosuunnasta).
 */
function leikkaaKolmio(kolmiot, triIdx, ox, oy, oz, dx, dy, dz) {
  const b = triIdx * 9;
  const v0x = kolmiot[b]; const v0y = kolmiot[b + 1]; const v0z = kolmiot[b + 2];
  const e1x = kolmiot[b + 3] - v0x; const e1y = kolmiot[b + 4] - v0y; const e1z = kolmiot[b + 5] - v0z;
  const e2x = kolmiot[b + 6] - v0x; const e2y = kolmiot[b + 7] - v0y; const e2z = kolmiot[b + 8] - v0z;
  const hx = dy * e2z - dz * e2y;
  const hy = dz * e2x - dx * e2z;
  const hz = dx * e2y - dy * e2x;
  const a = e1x * hx + e1y * hy + e1z * hz;
  if (a > -1e-12 && a < 1e-12) return -1; // säde yhdensuuntainen kolmion tason kanssa
  const f = 1 / a;
  const sx = ox - v0x; const sy = oy - v0y; const sz = oz - v0z;
  const u = f * (sx * hx + sy * hy + sz * hz);
  if (u < 0 || u > 1) return -1;
  const qx = sy * e1z - sz * e1y;
  const qy = sz * e1x - sx * e1z;
  const qz = sx * e1y - sy * e1x;
  const v = f * (dx * qx + dy * qy + dz * qz);
  if (v < 0 || u + v > 1) return -1;
  return f * (e2x * qx + e2y * qy + e2z * qz);
}

/** Säde vs. solmun AABB (slab-menetelmä), tMin/tMax rajattuna. */
function osuuAabb(boundsMin, boundsMax, nodeIdx, ox, oy, oz, invDx, invDy, invDz, tMin, tMax) {
  const b = nodeIdx * 3;
  let t1 = (boundsMin[b] - ox) * invDx; let t2 = (boundsMax[b] - ox) * invDx;
  let tNear = Math.min(t1, t2); let tFar = Math.max(t1, t2);
  t1 = (boundsMin[b + 1] - oy) * invDy; t2 = (boundsMax[b + 1] - oy) * invDy;
  tNear = Math.max(tNear, Math.min(t1, t2)); tFar = Math.min(tFar, Math.max(t1, t2));
  t1 = (boundsMin[b + 2] - oz) * invDz; t2 = (boundsMax[b + 2] - oz) * invDz;
  tNear = Math.max(tNear, Math.min(t1, t2)); tFar = Math.min(tFar, Math.max(t1, t2));
  return tFar >= Math.max(tNear, tMin) && tNear <= tMax;
}

/**
 * BVH:n lähin osuma säteelle origosta (ox,oy,oz) suuntaan (dx,dy,dz)
 * (suunnan ei tarvitse olla yksikköpituinen — t on silloin suunnan
 * pituuksissa). Palauttaa etäisyyden väliltä (EPS_T, tMax), tai Infinity
 * jos ei osumaa. Läpikäynti on ITERATIIVINEN (eksplisiittinen pino, ei
 * rekursiota) ja kutistaa etsintäväliä (tMax) heti kun lähempi osuma
 * löytyy — tämä karsii suuren osan puusta erityisesti AO-säteille, joiden
 * lähin este on tyypillisesti lähellä.
 */
function bvhLahinOsuma(bvh, ox, oy, oz, dx, dy, dz, tMax, pino) {
  if (bvh.tyhja) return Infinity;
  const invDx = 1 / (dx === 0 ? 1e-20 : dx);
  const invDy = 1 / (dy === 0 ? 1e-20 : dy);
  const invDz = 1 / (dz === 0 ? 1e-20 : dz);
  const { boundsMin, boundsMax, leftFirst, count, triIndices, kolmiot } = bvh;
  // HUOM: `paras` (palautusarvo) ja `raja` (AABB/kolmiotestien etsintäkatto)
  // pidetään ERILLÄÄN: jos mitään ei osu, funktion pitää palauttaa Infinity
  // — ei tMax:ia — jotta kutsuja (mm. sadeOsuma) voi erottaa "ei osumaa"
  // -tapauksen "osui juuri tMax:n kohdalla" -tapauksesta.
  let paras = Infinity;
  let raja = tMax;
  let sp = 0;
  pino[sp++] = 0; // juurisolmu
  while (sp > 0) {
    const nodeIdx = pino[--sp];
    if (!osuuAabb(boundsMin, boundsMax, nodeIdx, ox, oy, oz, invDx, invDy, invDz, EPS_T, raja)) continue;
    const c = count[nodeIdx];
    if (c > 0) {
      const first = leftFirst[nodeIdx];
      for (let i = 0; i < c; i++) {
        const triIdx = triIndices[first + i];
        const t = leikkaaKolmio(kolmiot, triIdx, ox, oy, oz, dx, dy, dz);
        if (t > EPS_T && t < raja) { raja = t; paras = t; }
      }
    } else {
      const left = leftFirst[nodeIdx];
      if (sp + 2 > pino.length) throw new Error('bvhLahinOsuma: pino liian pieni (BVH poikkeuksellisen syvä)');
      pino[sp++] = left;
      pino[sp++] = left + 1;
    }
  }
  return paras;
}

/**
 * Julkinen säde/BVH-kysely testausta ja diagnostiikkaa varten (esim.
 * tests/dioraama-ao.test.mjs vertaa tätä raa'an voiman läpikäyntiin).
 * `origo`/`suunta` = [x,y,z]. Palauttaa lähimmän osuman etäisyyden tai
 * Infinity. rakenna.mjs ei kutsu tätä suoraan (vain leivoAO/lampo).
 */
export function sadeOsuma(bvh, origo, suunta, max = Infinity) {
  const pino = new Int32Array(256); // BVH-syvyys on taattu O(log N) (ks. luoBvh) — 256 on reilu marginaali
  return bvhLahinOsuma(bvh, origo[0], origo[1], origo[2], suunta[0], suunta[1], suunta[2], max, pino);
}

/* ==================== Kosinipainotettu Fibonacci-puolipallo ==================== */

const KULTAINEN_KULMA = Math.PI * (3 - Math.sqrt(5)); // ≈ 2,39996 rad (kultaisen leikkauksen kulma)

/**
 * N determinististä säteensuuntaa PAIKALLISESSA kehyksessä, z = "ylös"
 * (kohti normaalia myöhemmin ortonormaaliKehys:n kautta). Kosinipainotettu
 * jakauma Malleyn menetelmällä: jos (u1, u2) olisivat tasajakautuneita
 * [0,1)²:ssa, niin r = √u1, kulma = 2π·u2, z = √(1−u1) tuottavat
 * kosinipainotetun puolipallojakauman (tiheys ∝ cosθ, θ = zeniittikulma).
 * Tässä u1 = (i+0,5)/N (Hammersley-tyylinen, välttää sekä täsmälleen
 * zeniitin että täsmälleen vaakatason) ja u2 korvataan Fibonacci-kultaisella
 * kulmalla i·KULTAINEN_KULMA (mod 2π periodisuuden kautta) — matalan
 * poikkeaman, täysin deterministinen "Fibonacci-puolipallo", ei Math.randomia.
 */
function teeHemisfaariSuunnat(n) {
  const suunnat = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u1 = (i + 0.5) / n;
    const r = Math.sqrt(u1);
    const kulma = i * KULTAINEN_KULMA;
    suunnat[i * 3] = r * Math.cos(kulma);
    suunnat[i * 3 + 1] = r * Math.sin(kulma);
    suunnat[i * 3 + 2] = Math.sqrt(Math.max(0, 1 - u1));
  }
  return suunnat;
}

// Sama säademäärä (aina 48 käytännössä, ks. rakenna.mjs) tuottaa aina saman
// suuntataulukon — vältetään turha uudelleenlasku, kun leivoAO:ta kutsutaan
// monta kertaa peräkkäin samalla saateita-arvolla (kerran per tilan
// pinta-ryhmä rakennusajossa).
let hemiValimuisti = null; // { n, suunnat }
function haeHemisfaariSuunnat(n) {
  if (hemiValimuisti && hemiValimuisti.n === n) return hemiValimuisti.suunnat;
  const suunnat = teeHemisfaariSuunnat(n);
  hemiValimuisti = { n, suunnat };
  return suunnat;
}

/* ==================== Julkinen: leivoAO ==================== */

/**
 * Leipoo ambient-occlusion-arvon jokaiselle kärjelle. `pisteet`/`normaalit`:
 * Float32Array, 3 lukua per kärki (maailmakoordinaatit; normaalien ei
 * tarvitse olla valmiiksi yksikköpituisia, funktio normalisoi ne). Palauttaa
 * Float32Array:n (yksi arvo per kärki): 1 = täysin avoin, 0 = täysin peitossa.
 *
 * MENETELMÄ (dokumentoitu speksin pyynnöstä): `saateita` kiinteää,
 * deterministista kosinipainotettua puolipallosädettä normaalin ympärillä
 * (ortonormaali kehys). Lähtöpiste siirretään 1e-3 normaalin suuntaan
 * itseleikkauksen välttämiseksi (koska jokaisen säteen paikallinen
 * z-komponentti on aina ≥ √(0,5/saateita) > 0, säde ei geometrisesti voi
 * koskaan palata takaisin omaan tangenttitasoonsa — 1e-3-siirto on siis
 * puhtaasti liukulukukohinan marginaali, ei ainoa itseleikkaussuoja).
 *
 * Jokainen säde etsii LÄHIMMÄN osuman BVH:sta väliltä (0, max]. Osuman
 * peittovaikutus painotetaan LINEAARISESTI etäisyyden mukaan:
 *   peitto = max(0, 1 − t/max)
 * eli lähellä oleva este peittää enemmän kuin kaukainen (binäärisen
 * "osui tai ei" sijaan) — tämä pehmentää tulosta samalla säademäärällä
 * eikä vaadi erillistä pehmennyspassia jälkikäteen. AO-arvo on 1 miinus
 * säteiden peittojen keskiarvo, rajattuna välille [0, 1].
 */
export function leivoAO(bvh, pisteet, normaalit, { saateita = 48, max = 3 } = {}) {
  const n = pisteet.length / 3;
  const tulos = new Float32Array(n);
  if (n === 0) return tulos;
  const suunnat = haeHemisfaariSuunnat(saateita);
  const pino = new Int32Array(256);
  const SIIRTO = 1e-3;

  for (let i = 0; i < n; i++) {
    const pi = i * 3;
    const px = pisteet[pi]; const py = pisteet[pi + 1]; const pz = pisteet[pi + 2];
    let nx = normaalit[pi]; let ny = normaalit[pi + 1]; let nz = normaalit[pi + 2];
    const nl = pituus(nx, ny, nz);
    if (nl < 1e-20) { tulos[i] = 1; continue; } // rappeutunut normaali: ei arvioitavissa, oletetaan avoin
    nx /= nl; ny /= nl; nz /= nl;
    const ox = px + nx * SIIRTO; const oy = py + ny * SIIRTO; const oz = pz + nz * SIIRTO;
    const [tx, ty, tz, bx, by, bz] = ortonormaaliKehys(nx, ny, nz);

    let peittoSumma = 0;
    for (let s = 0; s < saateita; s++) {
      const si = s * 3;
      const lx = suunnat[si]; const ly = suunnat[si + 1]; const lz = suunnat[si + 2];
      // Paikallinen (x,y,z=ylös) -> maailma: tangentti·lx + bitangentti·ly + normaali·lz.
      const dx = tx * lx + bx * ly + nx * lz;
      const dy = ty * lx + by * ly + ny * lz;
      const dz = tz * lx + bz * ly + nz * lz;
      const t = bvhLahinOsuma(bvh, ox, oy, oz, dx, dy, dz, max, pino);
      if (t < max) peittoSumma += 1 - t / max;
    }
    const ao = 1 - peittoSumma / saateita;
    tulos[i] = ao < 0 ? 0 : (ao > 1 ? 1 : ao);
  }
  return tulos;
}

/* ==================== Julkinen: lampo ==================== */

/**
 * Lämpöarvo jokaiselle pisteelle valojen perusteella:
 *   lampo(p) = Σ_valo voima · (1 − d/sade)²   (vain kun d < sade), rajattuna [0, 1]:een.
 * `valot`: [{ paikka: [x,y,z], sade, voima }]. `pisteet`: Float32Array, 3 lukua/kärki.
 */
export function lampo(pisteet, valot) {
  const n = pisteet.length / 3;
  const tulos = new Float32Array(n);
  if (!valot || valot.length === 0) return tulos;
  for (let i = 0; i < n; i++) {
    const pi = i * 3;
    const px = pisteet[pi]; const py = pisteet[pi + 1]; const pz = pisteet[pi + 2];
    let summa = 0;
    for (const valo of valot) {
      const lx = valo.paikka[0]; const ly = valo.paikka[1]; const lz = valo.paikka[2];
      const dx = px - lx; const dy = py - ly; const dz = pz - lz;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (d < valo.sade) {
        const k = 1 - d / valo.sade;
        summa += valo.voima * k * k;
      }
    }
    tulos[i] = summa < 0 ? 0 : (summa > 1 ? 1 : summa);
  }
  return tulos;
}
