/*
 * DIORAAMAN KAMERALIIKE — puhdas logiikka (ei DOM:ia, ei THREE:ta).
 *
 * Tämä on viitetoteutus (docs/raportit/dioraama-rajapinnat-20260929.md
 * kohta 4): samat kaavat toteuttaa natiivissa C#-luokka Kameraliike
 * (Assets/Matkakirja/Linssit/Ydin/Dioraama/Kameraliike.cs). Kahden
 * toteutuksen pariteettia vartioidaan testivektorein
 * (tools/dioraama/tee-vektorit.mjs → tests/fixtures/dioraama/vektorit.json,
 * ajetaan tests/dioraama-logiikka.test.mjs:ssä JS-puolella ja
 * Linssit-testit/Testit/DioraamaTestit.cs:ssä C#-puolella).
 *
 * Koordinaatisto (kohta 0): metrit, +X itä, +Y ylös, +Z etelä
 * (oikeakätinen, kuten glTF/three.js). Kulmat asteina rajapinnassa,
 * radiaaneina vain tämän tiedoston sisällä. ASENTO-muoto (kohta 1):
 * { kohde: [x,y,z], atsimuutti, korkeus, etaisyys, fov, aukko }.
 */

const ASTE_RADIAANIKSI = Math.PI / 180;

/** Rajaa arvon x välille [lo, hi]. */
function rajaa(x, lo, hi) {
  return Math.min(hi, Math.max(lo, x));
}

function vahenna(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function pituus(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}

function lerp(a, b, e) {
  return a + (b - a) * e;
}

function lerpVektori(a, b, e) {
  return [lerp(a[0], b[0], e), lerp(a[1], b[1], e), lerp(a[2], b[2], e)];
}

/**
 * Lyhin kiertoero kahden kompassiasteen välillä, väli (-180, 180].
 * Esim. 350 → 10 antaa +20 (ei -340): kierto tapahtuu 0/360-rajan yli.
 * TULKINTA: tasan 180 asteen käännös palautuu arvona -180 (ei +180),
 * koska normalisointi tehdään puoliavoimelle välille (-180, 180].
 */
function kiertoero(a0, a1) {
  return (((a1 - a0 + 180) % 360) + 360) % 360 - 180;
}

/** smootherstep(t) = t³(t(6t − 15) + 10), t rajattu 0–1 ennen laskua. */
export function smootherstep(t) {
  const c = rajaa(t, 0, 1);
  return c * c * c * (c * (6 * c - 15) + 10);
}

/**
 * asentoSijainti(p): laskee kameran maailmansijainnin ASENTO-oliosta.
 * k = korkeus (astetta), a = atsimuutti (kompassiastetta, kohteesta
 * kameraan päin). a = 180 → kamera kohteen ETELÄPUOLELLA eli +Z:
 * cos k·sin 180 = 0, -cos k·cos 180 = +cos k → (0, sin k, +cos k).
 * Palauttaa { sijainti, kohde, fov, etaisyys, aukko }.
 */
export function asentoSijainti(p) {
  const k = p.korkeus * ASTE_RADIAANIKSI;
  const a = p.atsimuutti * ASTE_RADIAANIKSI;
  const ck = Math.cos(k);
  const suunta = [ck * Math.sin(a), Math.sin(k), -ck * Math.cos(a)];
  const sijainti = [
    p.kohde[0] + p.etaisyys * suunta[0],
    p.kohde[1] + p.etaisyys * suunta[1],
    p.kohde[2] + p.etaisyys * suunta[2],
  ];
  return { sijainti, kohde: [...p.kohde], fov: p.fov, etaisyys: p.etaisyys, aukko: p.aukko };
}

/**
 * siirtymanKesto(p0, p1): Δ = |kohde1 − kohde0| + |etaisyys1 − etaisyys0|;
 * T = clamp(1,6 + 0,35·√Δ, 2,0, 3,8) sekuntia.
 */
export function siirtymanKesto(p0, p1) {
  const delta = pituus(vahenna(p1.kohde, p0.kohde)) + Math.abs(p1.etaisyys - p0.etaisyys);
  return rajaa(1.6 + 0.35 * Math.sqrt(delta), 2.0, 3.8);
}

/**
 * siirtymaAsento(p0, p1, t): interpoloitu ASENTO kahden asennon välillä.
 * e = smootherstep(t) ohjaa kohteen, atsimuutin (lyhin kiertoero),
 * korkeuden, fov:n ja aukon lerpiä. etaisyys saa lisäksi nosturinoston
 * 0,25·|kohde1 − kohde0|·sin(π·t) — HUOM: tässä termissä t on RAAKA t
 * (ei smootherstepattu), joten nosto on 0 molemmissa päätepisteissä
 * (t=0 ja t=1) vaikka e olisi jo saavuttanut päätepisteen aiemmin.
 */
export function siirtymaAsento(p0, p1, t) {
  const e = smootherstep(t);
  const kohde = lerpVektori(p0.kohde, p1.kohde, e);
  const atsimuutti = p0.atsimuutti + kiertoero(p0.atsimuutti, p1.atsimuutti) * e;
  const korkeus = lerp(p0.korkeus, p1.korkeus, e);
  const fov = lerp(p0.fov, p1.fov, e);
  const aukko = lerp(p0.aukko, p1.aukko, e);
  const dKohde = pituus(vahenna(p1.kohde, p0.kohde));
  const etaisyys = lerp(p0.etaisyys, p1.etaisyys, e) + 0.25 * dKohde * Math.sin(Math.PI * t);
  return { kohde, atsimuutti, korkeus, etaisyys, fov, aukko };
}

/**
 * pelaajanAsento(p, {da, dk, zoom}): pelaajan ohjaama poikkeama
 * nykyisestä asennosta. da rajataan ±20, dk ±10, zoom 0,75–1,3.
 */
export function pelaajanAsento(p, { da, dk, zoom }) {
  const daR = rajaa(da, -20, 20);
  const dkR = rajaa(dk, -10, 10);
  const zoomR = rajaa(zoom, 0.75, 1.3);
  return {
    kohde: [...p.kohde],
    atsimuutti: p.atsimuutti + daR,
    korkeus: p.korkeus + dkR,
    etaisyys: p.etaisyys * zoomR,
    fov: p.fov,
    aukko: p.aukko,
  };
}
