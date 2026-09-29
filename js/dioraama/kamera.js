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
 * { kohde: [x,y,z], atsimuutti, korkeus, etaisyys, fov, aukko,
 * kierto?: KIERTO }, KIERTO = { atsimuuttiMin, atsimuuttiMax, korkeusMin,
 * korkeusMax, etaisyysMin, etaisyysMax } | null (molemmat atsimuutti-
 * kentät null = vapaa 360°).
 *
 * ERÄ 2B (docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohdat 1 ja
 * 5): siirtymaAsento tekee KAARILENNON (nousu + etäisyyden pullistuma
 * keskellä lentoa, ei enää era 1:n suoraa nosturinostoa); rajaaKierto ja
 * leijunta ovat uusia — pariteetti Kameraliike.cs:n kanssa (C#-puolen
 * Kierto-luokka DioraamaData.cs:ssä, agentti P0).
 */

const ASTE_RADIAANIKSI = Math.PI / 180;
/** matka01-jakaja (kohta 1): kohteiden etäisyys tätä pidemmälle -> matka01 kyllästyy 1:een. */
const MATKA01_JAKAJA_M = 60;
/** etäisyyden kaarikerroin (kohta 5): keskellä lentoa etäisyys · (1 + tämä · matka01 · sin(πs)). */
const KAAREN_ETAISYYS_KERROIN = 0.35;
/**
 * TULKINTA (ei numeroarvoa speksissä, kirjattu raporttiin): korkeuden "nousu" kaavassa
 * "korkeus += nousu · sin(πs)" ei saa speksissä lukuarvoa. Analogisesti etäisyyden matka01-kertoimen
 * kanssa (molemmat termit häviävät lyhyillä/paikallisilla siirtymillä, kasvavat pitkillä) nousu skaalataan
 * samalla matka01:llä: nousu = KAAREN_NOUSU_MAX_ASTETTA · matka01. Näin lyhyt siirtymä (esim. huoneen
 * sisäinen kohdistus) ei nykäise kameraa ylös, mutta tilasta toiseen -lento kaartaa selvästi.
 */
const KAAREN_NOUSU_MAX_ASTETTA = 12;

/** Oletus kiertorajat (kohta 1), kun asennolla (perus) ei ole kierto-kenttää lainkaan. */
export const OLETUS_KIERTO_TILA = { atsimuuttiMin: -55, atsimuuttiMax: 55, korkeusMin: 6, korkeusMax: 65, etaisyysMin: 0.55, etaisyysMax: 1.6 };
export const OLETUS_KIERTO_YLEIS = { atsimuuttiMin: null, atsimuuttiMax: null, korkeusMin: 8, korkeusMax: 70, etaisyysMin: 0.45, etaisyysMax: 1.8 };

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
 * siirtymaAsento(p0, p1, t): interpoloitu ASENTO kahden asennon välillä, KAARILENTONA (era 2b, kohta 5;
 * korvaa era 1:n suoran nosturinoston). e = smootherstep(t) ohjaa kohteen, atsimuutin (lyhin kiertoero),
 * fov:n ja aukon lerpiä. matka01 = |kohde1 − kohde0| / 60 m, rajattuna 0–1 (kohta 1). Keskellä lentoa
 * (s = RAAKA t, ei smootherstepattu, kuten era 1:ssä — nosto/pullistuma 0 molemmissa päätepisteissä vaikka
 * e olisi jo saavuttanut päätepisteen aiemmin):
 *   korkeus = lerp(korkeus0, korkeus1, e) + KAAREN_NOUSU_MAX_ASTETTA · matka01 · sin(π·s)
 *   etaisyys = lerp(etaisyys0, etaisyys1, e) · (1 + KAAREN_ETAISYYS_KERROIN · matka01 · sin(π·s))
 * (nousu skaalataan matka01:llä kuten etäisyyskin — TULKINTA, ks. yllä KAAREN_NOUSU_MAX_ASTETTA-vakion
 * kommentti). Kamera nousee ja laskeutuu lennon aikana, ei koskaan leikkaa suoraan asennosta toiseen.
 */
export function siirtymaAsento(p0, p1, t) {
  const e = smootherstep(t);
  const kohde = lerpVektori(p0.kohde, p1.kohde, e);
  const atsimuutti = p0.atsimuutti + kiertoero(p0.atsimuutti, p1.atsimuutti) * e;
  const fov = lerp(p0.fov, p1.fov, e);
  const aukko = lerp(p0.aukko, p1.aukko, e);
  const dKohde = pituus(vahenna(p1.kohde, p0.kohde));
  const matka01 = rajaa(dKohde / MATKA01_JAKAJA_M, 0, 1);
  const s = Math.sin(Math.PI * t);
  const korkeus = lerp(p0.korkeus, p1.korkeus, e) + KAAREN_NOUSU_MAX_ASTETTA * matka01 * s;
  const etaisyys = lerp(p0.etaisyys, p1.etaisyys, e) * (1 + KAAREN_ETAISYYS_KERROIN * matka01 * s);
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
    kierto: p.kierto,
  };
}

/**
 * rajaaKierto(perus, asento, yleisnakyma = false): rajaa PELAAJAN asennon (esim. pelaajanAsento-funktion
 * tulos) perusasentoon suhteutettuihin kierto-rajoihin (kohta 1). Rajat luetaan perus.kierto-kentästä; jos
 * sitä ei ole (asennolla ei ole kierto-kenttää lähteessä), käytetään speksin oletusta — OLETUS_KIERTO_YLEIS
 * kun yleisnakyma on tosi, muuten OLETUS_KIERTO_TILA (kutsuja tietää kumpi on kyseessä: PoikkileikkausLinssi
 * tuntee nykyisen kohdetilan). atsimuuttiMin/Max null (molemmat) = vapaa 360° kierto (ei rajaa atsimuuttiin).
 * korkeus rajataan absoluuttisena, etaisyys perusasennon etäisyyden kertoimena (kerroinMin/Max · perus.etaisyys).
 */
export function rajaaKierto(perus, asento, yleisnakyma = false) {
  const k = perus.kierto || (yleisnakyma ? OLETUS_KIERTO_YLEIS : OLETUS_KIERTO_TILA);
  let atsimuutti = asento.atsimuutti;
  if (k.atsimuuttiMin != null && k.atsimuuttiMax != null) {
    const ero = rajaa(kiertoero(perus.atsimuutti, asento.atsimuutti), k.atsimuuttiMin, k.atsimuuttiMax);
    atsimuutti = perus.atsimuutti + ero;
  }
  const korkeus = rajaa(asento.korkeus, k.korkeusMin, k.korkeusMax);
  const etaisyys = rajaa(asento.etaisyys, perus.etaisyys * k.etaisyysMin, perus.etaisyys * k.etaisyysMax);
  return { kohde: [...asento.kohde], atsimuutti, korkeus, etaisyys, fov: asento.fov, aukko: asento.aukko };
}

/**
 * leijunta(asento, t): hidas ajelehtiminen levossa olevaan asentoon (kohta 5) — atsimuutti ±3° jaksolla
 * 24 s, korkeus ±1,5° jaksolla 31 s (eri jaksot: ei toistu tahdissa, Lissajous-tuntuinen ajelehdus). t=0
 * antaa nollapoikkeaman (sin(0)=0), jottei leijunta nykäise kameraa kytkettäessä päälle.
 */
export function leijunta(asento, t) {
  const da = 3 * Math.sin((2 * Math.PI * t) / 24);
  const dk = 1.5 * Math.sin((2 * Math.PI * t) / 31);
  return { ...asento, kohde: [...asento.kohde], atsimuutti: asento.atsimuutti + da, korkeus: asento.korkeus + dk };
}
