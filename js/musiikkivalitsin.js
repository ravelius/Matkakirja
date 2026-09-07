/*
 * ══════════════════════════════════════════════════════════════════
 * POHJARAIDAN VALITSIN — mikä musiikki soi juuri nyt
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan tilaus 5.9.2026 yöllä, sanatarkasti: *"generoi musiikkeja
 * kaikkiin kohtiin peliä, ne tuovat paljon lisää tunnelmaa."*
 *
 * Pelissä on YKSI pohjaraidan paikka sekoituksessa — ambienssiäänten
 * alla, saman väistön (pöllö, kertoja, lukija) ja saman
 * kehittäjäkertoimen ('musiikki') takana. Siihen paikkaan on nyt monta
 * ehdokasta: etusivu, kaupungin oma kappale, kaupungin alueen raita,
 * lehti, matkalaukku ja pohjavire. TÄMÄ MODUULI PÄÄTTÄÄ, KUKA VOITTAA;
 * soittaminen, ristihäivytys ja puuttuvan raidan sietäminen ovat yhä
 * js/ambience-stream.js:n pohjavirekoneistossa.
 *
 * Työnjako on sama kuin kaupunkiraidoilla alun perin: taulukot ja
 * säännöt ovat omassa pienessä moduulissaan, soitin siellä missä
 * kaikki muukin ääni. Kaksi soitinta samalle paikalle sekoituksessa
 * olisi kaksi paikkaa, joissa väistö ja taustatauko pitäisi muistaa.
 *
 * ------------------------------------------------------------------
 * KETJU, EI VALINTA
 * ------------------------------------------------------------------
 *
 * Valitsin ei palauta yhtä raitaa vaan KETJUN parhaasta alkaen:
 *
 *   tila (lehti, matkalaukku) → paikan raita (etusivu)
 *   → kaupungin oma kappale → kaupungin alueen raita → pohjavire
 *
 * Soittimen tehtävä on ottaa ensimmäinen, joka ei ole todettu
 * puuttuvaksi. Juuri siksi ketju eikä valinta: raidat generoidaan
 * yksi kerrallaan ja kytkentä on pelissä ennen kuin mp3 on olemassa
 * (sama etukäteisnimeäminen kuin luennoilla), joten puuttuva raita on
 * NORMAALI TILA — ja silloin seuraava taso ottaa sen paikan
 * automaattisesti. Peli ei ole hetkeäkään hiljainen.
 *
 * ------------------------------------------------------------------
 * TILA TULEE KAHDESTA PAIKASTA
 * ------------------------------------------------------------------
 *
 * 1. PAIKKA (`asetaMusiikkipaikka`) tulee playPlaceAmbiencesta —
 *    samasta kohdasta, josta koko peli pyytää taustaääntä. Mukana on
 *    kaupungin maa (pakan `map.cityCountry`), josta alue johdetaan.
 * 2. TILAT (`asetaMusiikkitila`) ovat päällekkäisiä syitä joukossa,
 *    kuten ambienssin hiljennykset: lehti voi avautua matkalaukun
 *    päälle, ja kummankin sulkeutuminen saa vaikuttaa vain omaan
 *    tilaansa. Järjestys TILARAIDAT-taulussa ratkaisee, kumpi voittaa.
 *
 * Lehden tila tulee ambienssin omasta hiljennyssyystä ('lehti'), jonka
 * lehden kaikki kolme avauskohtaa ja yksi sulkukohta jo kutsuvat —
 * uutta koukkua ei tarvittu. Matkalaukku ei hiljennä ambienssia (se ei
 * ole lukunäkymä), joten se kertoo tilansa suoraan js/ui.js:stä.
 */
import { musaPolku } from './media.js';
import { kaupunginRaidat } from './kaupunkimusiikki.js';

/** Pohjavire: viimeinen taso, joka soi kun mikään muu ei sovi. */
export const POHJARAITA = 'musa-pohja';

/**
 * TILARAIDAT — näkymä, joka vie musiikin mukanaan. JÄRJESTYS ON
 * PRIORITEETTI: ylin päällä oleva tila voittaa.
 *
 * Lehti ennen matkalaukkua, koska lehti on iso lukunäkymä ja
 * matkalaukku pieni väline: jos molemmat ovat auki, pelaaja lukee.
 */
export const TILARAIDAT = {
  lehti: {
    tunnus: 'musa-lehti',
    kuvaus: 'Lehden lukurauha: paperi ja kirjasto, harmonium ja kitara hyvin hiljaa.',
  },
  matkalaukku: {
    tunnus: 'musa-matkalaukku',
    kuvaus: 'Matkalaukku auki: nahka ja messinki, lyhyt ja hyvin hiljainen kierto.',
  },
};

/**
 * PAIKKARAIDAT — virtuaalipaikat, joilla on oma kappale. 'etusivu' on
 * pelin ainoa: se kattaa portin ("Aloita seikkailu"), avaustekstin,
 * pallon vapaan selailun ja lähtökaupungin valinnan, koska ne ovat
 * kaikki samaa vaihetta (game.phase === 'pickstart', js/ui.js
 * syncAmbience) ja samaa tunnelmaa — kartta auki, matka edessä.
 *
 * OMISTAJAN KYSYMYS (5.9.2026 yö) oli, tarvitseeko pallon vapaa
 * selailu oman raitansa etusivun rinnalle. EI TARVITSE: pelaaja ei
 * poistu mihinkään pallon ja avaustekstin välillä, ja raidan vaihto
 * kesken saman näkymän kuulostaisi virheeltä. Yksi raita, yksi vaihe.
 */
export const PAIKKARAIDAT = {
  etusivu: {
    tunnus: 'musa-etusivu',
    kuvaus: 'Etusivu ja lähtökaupungin valinta: avara ja odottava, kartan tunnelma.',
  },
};

/* ── tila ────────────────────────────────────────────────────────── */

let paikka = null;
let paikanMaa = null;
const tilat = new Set();
const musiikkiKuuntelijat = new Set();

/**
 * Missä ollaan. Kutsutaan js/ambience-stream.js:n pohjavirekoneistosta
 * joka renderöinnillä — arvo talletetaan, jotta tilan vaihtuminen
 * (lehti auki) osaa palata samaan paikkaan ilman erillistä muistia.
 *
 * @param {?string} cityId laudan kaupungin id tai virtuaalipaikka
 * @param {?string} maa kaupungin ISO-3-maakoodi (pakan cityCountry)
 */
export function asetaMusiikkipaikka(cityId = null, maa = null) {
  paikka = cityId ?? null;
  paikanMaa = maa ?? null;
}

/** Viimeksi kerrottu paikka (js/ambience-stream.js oletusparametri). */
export const musiikinPaikka = () => paikka;

/** Viimeksi kerrottu maa. */
export const musiikinMaa = () => paikanMaa;

/**
 * Näkymä auki tai kiinni. Tuntematon nimi on sallittu eikä tee mitään
 * — sama sietokyky kuin ambienssin hiljennyssyillä, joita kaikkia ei
 * ole nimetty raidaksi.
 *
 * @param {string} nimi TILARAIDAT-taulun avain
 * @param {boolean} paalla
 */
export function asetaMusiikkitila(nimi, paalla) {
  if (!Object.hasOwn(TILARAIDAT, nimi)) return;
  const ennen = tilat.has(nimi);
  if (paalla) tilat.add(nimi);
  else tilat.delete(nimi);
  if (tilat.has(nimi) === ennen) return;
  for (const fn of musiikkiKuuntelijat) fn();
}

/** Päällä olevat tilat prioriteettijärjestyksessä (testit ja lehti). */
export const musiikkitilat = () => Object.keys(TILARAIDAT).filter((n) => tilat.has(n));

/**
 * Ilmoita minulle, kun soivan raidan pitää vaihtua. Kuuntelija on
 * js/ambience-stream.js: se päättää itse, soittaako se mitään
 * (taustaäänten kytkin, radiotila).
 */
export function kuunteleMusiikkitilaa(fn) {
  musiikkiKuuntelijat.add(fn);
  return () => musiikkiKuuntelijat.delete(fn);
}

/* ── musiikin oma kytkin ─────────────────────────────────────────── */

/*
 * ══════════════════════════════════════════════════════════════════
 * MUSIIKKI JA ÄÄNIMAISEMA OVAT ERI ASIOITA (omistaja 7.9.2026 illalla,
 * sanatarkasti: *"striimilukija ei mene päälle, jos taustamusiikki on
 * kytketty pois. Ne ovat kaksia irrallista asiaa, joten striimi-ääni
 * pitäisi kuulua, vaikka taustamusiikki on kytketty pois."* —
 * Raamattu, VIAT v1672)
 * ══════════════════════════════════════════════════════════════════
 *
 * MITÄ ENNEN OLI. Äänivalikossa oli yksi kytkin nimeltä TAUSTAÄÄNET
 * (js/sound.js `enabled`), ja sen takana oli KAIKKI: paikkojen
 * äänimaisema, tehosteet, pohjaraita, kaupunkien kappaleet,
 * siirtymämusiikki ja visamusiikki. Pelaaja, joka halusi vain
 * musiikin pois, menetti samalla kenttä-äänitykset — juuri se, mistä
 * omistaja kirjoitti.
 *
 * MIKSI KYTKIN ASUU TÄÄLLÄ. Tämä moduuli on musiikin oma alin kerros
 * (pohjaraidan valitsin) eikä tuo mitään soittimista, joten sekä
 * js/ambience-stream.js (pohjaraita, visamusiikki), js/
 * siirtymamusiikki.js (matkan ja linssin raidat) että js/ui.js
 * (aarteen paljastusaihe) voivat kysyä siltä samaa asiaa ilman kehää.
 * Sama kaava kuin äänivalinnalla: valinta on pysyvä (localStorage),
 * oletus on PÄÄLLÄ, ja muutos kertoo kuuntelijoille — samoille, jotka
 * kuulevat tilanvaihdon, koska teko on molemmissa sama: katso mitä
 * pitäisi soida, ja soita se (tai vaikene).
 *
 * TYÖNJAKO: musiikin kytkin vaientaa VAIN musiikin. Äänimaisema
 * vaikenee omasta kytkimestään (äänivalikon Äänimaisema = sound.js
 * enabled) tai koko pelin mykistyksestä (js/aani-tausta.js, kun peli
 * ei ole päällimmäisenä).
 */
const MUSIIKIN_AVAIN = 'matkakirja-musiikki';

/** Luetaan kerran: valinta on pysyvä, oletus päällä. */
let musiikkiSallittu = (() => {
  try {
    return localStorage.getItem(MUSIIKIN_AVAIN) !== 'off';
  } catch {
    return true;
  }
})();

/** Soiko pelin musiikki (pohjaraita, siirtymä, visa, aarre, linssi)? */
export const musiikkiPaalla = () => musiikkiSallittu;

/**
 * Musiikki päälle tai pois. Kuuntelijat (js/ambience-stream.js) saavat
 * saman herätteen kuin tilanvaihdosta: pois → soiva raita vaikenee,
 * päälle → oikea raita palaa samaan paikkaan.
 */
export function asetaMusiikkiPaalla(paalla) {
  const uusi = Boolean(paalla);
  if (uusi === musiikkiSallittu) return uusi;
  musiikkiSallittu = uusi;
  try {
    localStorage.setItem(MUSIIKIN_AVAIN, uusi ? 'on' : 'off');
  } catch {
    /* tallennus ei ole välttämätöntä */
  }
  for (const fn of musiikkiKuuntelijat) fn();
  return uusi;
}

/* ── ketju ───────────────────────────────────────────────────────── */

/**
 * Raitojen polut parhaasta alkaen. Sama polku ei esiinny kahdesti.
 *
 * @param {?string} cityId oletuksena viimeksi kerrottu paikka
 * @param {?string} maa oletuksena viimeksi kerrottu maa
 * @returns {string[]} polut muodossa assets/audio/…
 */
export function musiikkiketju(cityId = paikka, maa = paikanMaa) {
  const polut = [];
  for (const nimi of Object.keys(TILARAIDAT)) {
    if (tilat.has(nimi)) polut.push(musaPolku(TILARAIDAT[nimi].tunnus));
  }
  if (cityId && Object.hasOwn(PAIKKARAIDAT, cityId)) {
    polut.push(musaPolku(PAIKKARAIDAT[cityId].tunnus));
  }
  polut.push(...kaupunginRaidat(cityId, maa));
  polut.push(musaPolku(POHJARAITA));
  return [...new Set(polut)];
}

/**
 * Ensimmäinen ketjun raita, jota ei ole todettu puuttuvaksi — tai
 * null, jos kaikki puuttuvat (silloin peli on tämän raidan osalta
 * hiljainen, eikä sitä yritetä uudestaan joka renderöinnillä).
 *
 * @param {Set<string>} puuttuvat js/ambience-stream.js:n muisti 404:istä
 */
export function valitseMusiikki(puuttuvat = new Set(), cityId = paikka, maa = paikanMaa) {
  return musiikkiketju(cityId, maa).find((polku) => !puuttuvat.has(polku)) ?? null;
}

/**
 * Vain testejä varten: unohtaa paikan, tilat JA kuuntelijat.
 *
 * Kuuntelijat kuuluvat nollaukseen, koska testi lataa soittimesta
 * (js/ambience-stream.js) tuoreen kopion joka kerta ja jokainen kopio
 * rekisteröi oman kuuntelijansa tähän jaettuun moduuliin. Ilman
 * nollausta vanhat kopiot heräisivät seuraavan testin tilanvaihdosta
 * ja rakentaisivat soittimia sen kirjanpitoon. Kutsu siis ENNEN uuden
 * kopion tuontia.
 */
export function nollaaMusiikkivalitsin() {
  paikka = null;
  paikanMaa = null;
  tilat.clear();
  musiikkiKuuntelijat.clear();
}
