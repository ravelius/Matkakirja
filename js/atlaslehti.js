/*
 * ATLASLEHTI — isoisän aikainen atlaksen lehti pallon päällä (VEDOS).
 *
 * Omistaja 21.9.2026 (Linssikatalogi osa Q2, Fablen tilaus Karttasepälle):
 * *"rasterinen linssi, jossa isoisän aikainen atlaslehti näkyy sellaisenaan
 * pallon päällä"* — omistaja haluaa nähdä vedoksen ennen päätöstä. Tämä
 * moduuli on se vedos: EI linssi (ei matkalaukun valitsinta, ei selitettä),
 * vaan kytkin `?atlas=1`, joka panee yhden georeferoidun lehden pallon
 * pinnalle laudan linssimoottorin kalvona (js/pallolauta/linssit.js
 * `kalvo` + `ikkuna`, sama mekanismi kuin topografian tarkennuslaastari).
 *
 * LEHTI: Stieler's Hand-Atlas, 6. laitos 1875, No. 33 "Frankreich und die
 * Schweiz" (Hrm. Berghaus; Gotha: Justus Perthes 1874). Wikimedia Commons,
 * public domain (David Rumsey Map Collection, skanni 15 876 × 12 892 px).
 * Georeferointi ja vääntö tasaväliseksi: docs/raportit/atlas-vedos-20260921.md
 * (kartioprojektio sovitettu lehden omasta asteverkosta, 36 leikkauspistettä,
 * jäännösvirhe keskimäärin 4 px ≈ 0,4 km skannissa).
 *
 * KUVA on yksi tasavälinen (equirectangular) WebP-kuva ikkunaan
 * IKKUNA — ei laattoja. Reunoilla 0,45°:n häivytys läpinäkyväksi, jotta
 * lehti ei pääty terävään viivaan pallon päällä. 8192 px leveä kuva on
 * 455 px/aste eli tarkempi kuin lähizoomin 178 px/aste ruudulla; sen
 * hinta on 8192 × 4437 RGBA ≈ 145 Mt näytönohjaimelta, mikä on vedoksen
 * hyväksytty hinta työpöydällä — puhelimelle tarvittaisiin laatasto tai
 * pienempi kuva (`?atlaskoko=4096`, 36 Mt).
 *
 * PEITTÄVYYS: linssien sovittu katto on 0,72 (js/linssit/topografia.js
 * PEITTAVYYS: reitit ovat kalvon alla). Vedos noudattaa sitä oletuksena;
 * `?atlaspeitto=0.95` näyttää lehden lähes peittävänä vertailua varten.
 */

/** Kytkimen nimi osoitteessa. */
export const ATLAS_KYTKIN = 'atlas';

/** Kuvan juuri ämpärissä (linssikuvat samassa kansiossa kuin topografian). */
const ATLAS_JUURI = 'https://media.matkakirja.app/matkakirja/linssit/';

/** Kuvatiedostot leveyden mukaan (px). */
const ATLASKUVAT = {
  8192: 'atlaslehti-stieler33-ranska-8192-20260921.webp',
  4096: 'atlaslehti-stieler33-ranska-4096-20260921.webp',
};

/**
 * Lehden ikkuna asteina — lehden kehyksen sisäreunan rajasuorakulmio
 * tasavälisessä projektiossa (tools/atlaslehti/vaanna.mjs IKKUNA).
 * Lehti itse on kartioprojektion "tuuletin" tämän suorakulmion sisällä;
 * suorakulmion kulmat ovat kuvassa läpinäkyviä.
 */
export const ATLAS_IKKUNA = { lat0: 41.5, lat1: 51.25, lng0: -6.65, lng1: 11.35 };

/** Linssien yhteinen peittävyyskatto (ks. js/linssit/topografia.js). */
export const ATLAS_PEITTAVYYS = 0.72;

/** Onko vedos päällä tässä istunnossa (`?atlas=1`)? */
export function atlaslehtiPaalla(ikkuna = globalThis) {
  try {
    const arvo = new URLSearchParams(ikkuna.location?.search ?? '').get(ATLAS_KYTKIN);
    return arvo === '1' || arvo === 'true' || arvo === 'kylla';
  } catch {
    return false;
  }
}

/** Vedoksen asetukset osoitteesta: kuvan leveys ja peittävyys. */
export function atlaslehdenAsetukset(ikkuna = globalThis) {
  let koko = 8192;
  let peittavyys = ATLAS_PEITTAVYYS;
  try {
    const haku = new URLSearchParams(ikkuna.location?.search ?? '');
    const k = Number(haku.get('atlaskoko'));
    if (ATLASKUVAT[k]) koko = k;
    const p = Number(haku.get('atlaspeitto'));
    if (Number.isFinite(p) && p > 0 && p <= 1) peittavyys = p;
  } catch {
    // Ei osoitetta: oletukset.
  }
  const juuri = typeof ikkuna?.ATLASLEHTI_JUURI === 'string' && ikkuna.ATLASLEHTI_JUURI
    ? ikkuna.ATLASLEHTI_JUURI : ATLAS_JUURI;
  return { koko, peittavyys, kuva: juuri + ATLASKUVAT[koko] };
}

/**
 * Pane lehti pallolle, jos kytkin on päällä. Palauttaa kalvon kahvan
 * (`pura`, `nakyvyys`, `ladattu` …) tai null.
 *
 * Kalvo on koko pallon kalvon (KALVON_SADE) päällä (`jarjestys` 2) ja
 * saa oman, hieman suuremman säteen, jotta se ei riitele topografian
 * laastarin kanssa, jos molemmat ovat auki.
 */
export function asetaAtlaslehti(lauta, ikkuna = globalThis) {
  if (!atlaslehtiPaalla(ikkuna) || !lauta?.linssit?.kalvo) return null;
  const { kuva, peittavyys } = atlaslehdenAsetukset(ikkuna);
  const kahva = lauta.linssit.kalvo('atlaslehti', {
    kuva, peittavyys, ikkuna: ATLAS_IKKUNA, sade: 1.002, jarjestys: 2,
  });
  // Savukkeille ja vedoksen mittaukseen.
  lauta.atlaslehti = kahva;
  return kahva;
}
