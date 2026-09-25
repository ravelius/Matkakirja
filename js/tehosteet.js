/*
 * ══════════════════════════════════════════════════════════════════
 * ÄÄNITEHOSTEET ÄMPÄRISTÄ — KOHAHDUS
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan tilaus 3.9.2026, sanatarkasti: *"se efektiääni
 * vuodenvaihtuessa voisi olla joku uuu-huudahdus, aivan kuin yleisö
 * kohahtaisi, kun uusi hieno keksintö saapuu maailmaan. Niitä vain
 * pitäisi sitten generoida useampia variantteja, jotta sama
 * ääniefekti ei toistuisi peräjälkeen. Ne voisivat kuitenkin olla
 * aika lähellä toisiaan. ääniefektin ei tarvitse nousta merkittävästi
 * taustamusiikin päälle."*
 *
 * ------------------------------------------------------------------
 * MIKSI OMA MODUULI EIKÄ RIVI js/sound.js:ÄÄN
 * ------------------------------------------------------------------
 *
 * js/sound.js on SYNTEESIÄ ja Web Audio -puskureita: sen `play()`
 * valitsee syntetisoidun kuvion tai repoon kuuluvan äänitteen
 * (REAL_SAMPLES), ja kaikki kulkee saman masterin läpi. Kohahdus ei
 * ole kumpaakaan:
 *
 *   - Se on NELJÄ VARIANTTIA, joista arvotaan yksi eikä koskaan
 *     samaa kahdesti peräkkäin. Arvonta ja edellisen muisti ovat tila,
 *     jota SOUNDS-taulukon puhtailla funktioilla ei ole.
 *   - Tiedostot ovat ÄMPÄRISSÄ (aanet/tehosteet/), eivät repossa —
 *     Raamatun linjaus "kaikki aina ämpäriin". Sama kaksoiselämä kuin
 *     musiikkiraidoilla: peli kytketään ennen tiedostoja, ja puuttuva
 *     tiedosto on normaali hiljainen tila, ei virhe.
 *   - Soitto on `<audio>`-elementillä eikä Web Audiolla, koska
 *     tiedosto on ämpärissä eikä sitä esiladata puskuriksi. Sama
 *     ratkaisu ja samat perustelut kuin js/siirtymamusiikki.js:ssä.
 *
 * ------------------------------------------------------------------
 * PUUTTUVA TIEDOSTO ON NORMAALI TILA
 * ------------------------------------------------------------------
 *
 * `soitaKohahdus()` palauttaa `false`, jos varianttia ei ole (404,
 * ei vielä ladattu, mykistys, taustatila tai edellinen kohahdus soi
 * yhä). Kutsuja soittaa silloin varansa — aikajanalinssillä se on
 * kellon oma syntetisoitu naksahdus (js/aikajana.js naksahda). Tämä
 * moduuli ei tiedä varasta mitään eikä soita mitään itse.
 *
 * ------------------------------------------------------------------
 * TASO
 * ------------------------------------------------------------------
 *
 * Omistaja: *"ei tarvitse nousta merkittävästi taustamusiikin
 * päälle"*. Tehostetiedosto normalisoidaan −30 LUFSiin
 * (tools/generoi-tehosteet.mjs) eli 3 dB musiikkia kovemmaksi, ja
 * pelin oma kerroin on 0,35 × linssiraidan voima (0,11) — kohahdus
 * jää siis selvästi musiikin alle. KOHAHDUS_VOIMA on kuulokokeen
 * nuppi, kuten siirtymämusiikin `voima`.
 */
import { AANI_JUURI } from './media.js';
import { sfx } from './sound.js';

/** Tehosteiden kansio ämpärissä (sama juuri kuin musiikkiraidoilla). */
export const TEHOSTE_JUURI = `${AANI_JUURI}aanet/tehosteet/`;

/** Montako kohahdusvarianttia ämpäristä haetaan (kohahdus-1 … -4). */
export const KOHAHDUS_VARIANTTEJA = 4;

/**
 * Kohahduksen taso: 0,35 × linssiraidan voima (js/siirtymamusiikki.js
 * RAIDAT.keksinnot.voima = 0,11). Vakio on tässä eikä laskettu
 * musiikista: kohahdus soi samalla tasolla myös silloin, kun raitaa ei
 * ole ämpärissä lainkaan.
 */
export const KOHAHDUS_VOIMA = 0.0385;

/** Variantit: { i, audio, petti }. Rakennetaan kerran, laiskasti. */
const variantit = [];
/** Viimeksi soitettu variantti — sama ei saa toistua peräkkäin. */
let edellinen = -1;
/** Soiva variantti; uusi ei ala, jos edellinen on vielä kesken. */
let soiva = null;

/** Variantin osoite ämpärissä: kohahdus-1.mp3 … kohahdus-4.mp3. */
export function kohahdusUrl(i) {
  return `${TEHOSTE_JUURI}kohahdus-${i + 1}.mp3`;
}

/**
 * Esilataa variantit `preload="metadata"`-elementteinä. Turvallinen
 * kutsua monta kertaa; ilman `Audio`-toteutusta (testiympäristö ilman
 * tynkää) palauttaa tyhjän listan.
 *
 * Metadata riittää: se kertoo, ONKO tiedostoa (404 laukaisee
 * `error`-tapahtuman) latamatta koko äänitettä etukäteen.
 */
export function esilataaKohahdukset() {
  if (variantit.length || typeof Audio === 'undefined') return variantit;
  for (let i = 0; i < KOHAHDUS_VARIANTTEJA; i += 1) {
    const audio = new Audio(kohahdusUrl(i));
    audio.preload = 'metadata';
    audio.volume = KOHAHDUS_VOIMA;
    const rivi = { i, audio, petti: false };
    // 404 tai muu latausvirhe: variantti on pysyvästi poissa käytöstä
    // tältä istunnolta — sama sääntö kuin puuttuvalla musiikkiraidalla.
    audio.addEventListener('error', () => { rivi.petti = true; });
    variantit.push(rivi);
  }
  return variantit;
}

/**
 * Arvonta ilman välitöntä toistoa: sama variantti ei tule kahdesti
 * peräkkäin, ellei kelvollisia ole vain yksi.
 *
 * Puhdas funktio, jotta sääntö on testattavissa ilman soitinta.
 *
 * @param {number[]} kelpaavat käytettävissä olevien indeksit
 * @param {number} edellinenI viimeksi soitettu indeksi (-1 = ei mitään)
 * @param {number} arpa 0…1
 * @returns {number} valittu indeksi tai -1
 */
export function valitseKohahdus(kelpaavat, edellinenI, arpa = Math.random()) {
  if (!kelpaavat.length) return -1;
  const muut = kelpaavat.filter((i) => i !== edellinenI);
  const joukko = muut.length ? muut : kelpaavat;
  const n = Math.min(joukko.length - 1, Math.max(0, Math.floor(arpa * joukko.length)));
  return joukko[n];
}

/** Onko variantti soitettavissa juuri nyt? */
function kelpaa(rivi) {
  // readyState 0 = mitään ei ole vielä ladattu. Metadatan saapuminen
  // (>= 1) on merkki siitä, että tiedosto on oikeasti olemassa.
  return !rivi.petti && (rivi.audio.readyState ?? 0) >= 1;
}

/**
 * Soittaa yhden kohahduksen. Palauttaa `false`, jos mitään ei
 * soitettu — silloin kutsuja soittaa oman varansa.
 *
 * Ei koskaan kahta päällekkäin: uusi ei ala, jos edellinen on vielä
 * kesken. Yleisö kohahtaa kerran, ei kuorossa.
 */
export function soitaKohahdus({ arpa = Math.random() } = {}) {
  // Mykistys ja taustatila kuten pelin muillakin tehosteillä
  // (js/sound.js play): taustalla ääni jäisi jonoon ja purskahtaisi
  // paluussa.
  if (!sfx.enabled || sfx.taustaTauko) return false;
  const rivit = esilataaKohahdukset();
  if (!rivit.length) return false;
  if (soiva && !soiva.paused && !soiva.ended) return false;
  const valinta = valitseKohahdus(rivit.filter(kelpaa).map((r) => r.i), edellinen, arpa);
  if (valinta < 0) return false;
  const { audio } = rivit[valinta];
  edellinen = valinta;
  soiva = audio;
  audio.volume = KOHAHDUS_VOIMA;
  try {
    audio.currentTime = 0;
  } catch {
    /* siirtämätön elementti: soi alusta joka tapauksessa */
  }
  const lupaus = audio.play();
  // Ele puuttui tai laite kieltäytyi: ei virhe eikä puuttuva tiedosto
  // — seuraava vaihdos yrittää uudestaan.
  if (lupaus?.catch) lupaus.catch(() => { if (soiva === audio) soiva = null; });
  return true;
}

/** Vain testejä varten: unohtaa variantit, arvonnan ja soivan äänen. */
export function nollaaTehosteet() {
  variantit.length = 0;
  edellinen = -1;
  soiva = null;
}
