/**
 * Temple-nukkekodin kopina (koe: Kuninkaan kerros). SK sitonut 16.11.2026.
 *
 * Kuusi lyhyttä puista kopsahdusta, jotka soivat, kun pahvinukke siirtyy
 * paikasta toiseen (omistaja 16.11. 08.30: "joku kopina, mutta ei askelten ääniä").
 * JU vienyt ämpäriin 16.11.2026 klo 13.28 (temple-nukkekoti-aanet-vienti-20261116,
 * 6/6, virheitä 0).
 *
 * Lähde ja lisenssi: Sonniss.com GDC 2017 Game Audio Bundle, Double Trouble Audio,
 * "Wood Impacts and Debris" (royalty-free, kaupallinen käyttö sallittu, ei
 * nimeämisvelvollisuutta). Musiikki EI ole mukana (KK 11.08: ei vientiä).
 *
 * KÄYTTÖ (NS/PK): pomppu ja kallistus → arvo `KOPINA_POMPPU`-joukosta (älä toista
 * samaa kahdesti peräkkäin); nuken paikalleen lasku → `KOPINA_LASKU`. Hyvästien
 * kohtauksessa (KK: ei pomppimista) vain `KOPINA_LASKU` tai ei mitään.
 * Tiedostot ovat mono mp3 192k; kopina-1…5 −26 LUFS, lasku −32 LUFS.
 */
import { AANI_JUURI } from './media.js';

/** Ämpärin kansio. */
export const TEMPLE_KOPINA_JUURI = `${AANI_JUURI}aanet/temple-nukkekoti-v1/`;

/** Rivit: id, tiedosto, kesto sekunteina (LAHTEET.md) ja sha256 (SHA256SUMS). */
export const TEMPLE_KOPINAT = Object.freeze([
  { id: 'kopina-1', tiedosto: 'temple-kopina-1.mp3', kesto: 0.21, rooli: 'pomppu', sha256: 'fd457b84d9ab6a406fc31642ecc07aa7fe3c7f673950753a81dbab99252e7494' },
  { id: 'kopina-2', tiedosto: 'temple-kopina-2.mp3', kesto: 0.13, rooli: 'pomppu', sha256: 'dca1ac93e21a621f0815eb28fbbd1af724e23c5eb11dbaa674bb4b7f18f8d136' },
  { id: 'kopina-3', tiedosto: 'temple-kopina-3.mp3', kesto: 0.23, rooli: 'pomppu', sha256: '7a518def0bd75e04825ac7ed6e2ac4e819a02967d3644326bcb2300e160a4529' },
  { id: 'kopina-4', tiedosto: 'temple-kopina-4.mp3', kesto: 0.165, rooli: 'pomppu', sha256: '2419e050fe345b5fd311b76c454f479b739029e866a302c359bc81658b63ec19' },
  { id: 'kopina-5', tiedosto: 'temple-kopina-5.mp3', kesto: 0.21, rooli: 'pomppu', sha256: 'ef9db40cb3d334b9629700b88e386085c0a92890926e70619a8a60435113684c' },
  { id: 'kopina-lasku', tiedosto: 'temple-kopina-lasku.mp3', kesto: 0.17, rooli: 'lasku', sha256: '766868c7867d9f9d6c4ee30b36de58754a4fb5d1b839a1267b587ff70a6716a9' },
].map((r) => Object.freeze({ ...r, url: `${TEMPLE_KOPINA_JUURI}${r.tiedosto}` })));

/** Pomppuun ja kallistukseen: viisi vaihtelevaa kopsahdusta. */
export const KOPINA_POMPPU = Object.freeze(TEMPLE_KOPINAT.filter((r) => r.rooli === 'pomppu'));
/** Nuken laskuun paikalleen: yksi tumma, pehmeä isku ilman kimpoamaa. */
export const KOPINA_LASKU = TEMPLE_KOPINAT.find((r) => r.rooli === 'lasku');
