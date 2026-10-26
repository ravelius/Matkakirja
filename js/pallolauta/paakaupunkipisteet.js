/*
 * PÄÄKAUPUNKIPISTEET PALLOLLA (omistaja 10.10.2026 PT:n kautta: "tee kaikkiin
 * maihin pääkaupunki ja maan ja kaupungin perustiedot sekä maan rajat"; PT:n
 * päätös, suositus A: pääkaupunki, joka ei ole laudan pysäkki, on KEVYT PISTE).
 *
 * Aineisto on js/packs/paakaupungit.js (Karttaseppä, tools/tee-paakaupungit.mjs).
 * Piste piirretään OLEMASSA OLEVALLA KAUPUNKIMERKILLÄ ja nimellä PIENIMMÄSSÄ
 * TÄRKEYSLUOKASSA (tarkeys 0, aste 0), joten nimibudjetti karsii sen ensin
 * (UI-POHJAT: ei uutta merkkiä). Pelikaupungin toimintoja ei ole: ei reittejä,
 * ei siirtoa, ei kaupunkilehteä eikä liuskaa. Napautus avaa maan olemassa olevan
 * maalehden (ui.avaaMaalehti).
 *
 * VAIN PALLO. Tasokartta (varapolku) on ennallaan; tunnisteet saavat etuliitteen
 * PK_ETULIITE, jotta ne eivät voi törmätä laudan kaupunkeihin missään joukossa
 * (nimetyt, rajaus, osumat).
 */
import { projisoiLaudalle } from '../fokusmitat.js';
import { PAAKAUPUNKIPISTEET } from '../packs/paakaupungit.js';

export const PK_ETULIITE = 'pk:';

/** Onko tunnus pääkaupunkipisteen (ei laudan kaupungin). */
export const onPaakaupunkipiste = (id) => typeof id === 'string' && id.startsWith(PK_ETULIITE);

/**
 * Pääkaupunkipisteet pallon kaupunkeina ja nimiaineistona. `laudanIdt` ovat
 * laudan omat kaupungit: jos pääkaupunki on jo pysäkki, pistettä ei tehdä.
 *
 * @returns {Array<{id:string,n:string,nimi:string,lat:number,lon:number,
 *   x:number,y:number,maa:string,pk:true,alku:false,kayty:false,
 *   la:string,lx:number,ly:number,iso:false,tarkeys:0,aste:0}>}
 */
export function paakaupunkipisteet(lauta, laudanIdt = new Set(), lahde = PAAKAUPUNKIPISTEET) {
  const tulos = [];
  for (const p of lahde ?? []) {
    if (!p?.id || laudanIdt.has(p.id)) continue;
    if (!Number.isFinite(p.lat) || !Number.isFinite(p.lon) || !p.maa) continue;
    const xy = projisoiLaudalle(lauta, p.lon, p.lat);
    if (!xy || !Number.isFinite(xy.x) || !Number.isFinite(xy.y)) continue;
    tulos.push({
      id: PK_ETULIITE + p.id,
      // Pallon kaupungin nimikenttä on `n` (js/pallo.js pallonKaupungit), ladonnan `nimi`.
      n: p.nimi,
      nimi: p.nimi,
      lat: p.lat,
      lon: p.lon,
      x: xy.x,
      y: xy.y,
      maa: p.maa,
      pk: true,
      alku: false,
      kayty: false,
      // Ladonnan tietue kuten js/karttanimet.js keraaAineisto (oletusasettelu).
      la: 'start',
      lx: 0,
      ly: 0,
      iso: false,
      tarkeys: 0,
      aste: 0,
    });
  }
  return tulos;
}
