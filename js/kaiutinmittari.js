/*
 * KAIUTTIMEN KOLME KAARTA VU-MITTARINA (omistaja 15.9.2026 klo 05.10
 * UTC, iPhone-kuva Dubrovnikin saapumisluennasta, sanatarkasti: *"onko
 * mahdollista animoida kaiuttimen kolmea kaarta elamaan Vu mittarin
 * tapaan ja ottaa feidaus animaatio siita pois?"*).
 *
 * MIKÄ TÄMÄ KORVAA. Luennan merkki oli koko kuvakkeen opacity/scale-syke
 * (css `@keyframes fact-kaiutin-syke`). Omistaja näki sen häivytyksenä;
 * tilalle tulee mittari, jossa kaiuttimen KOLME KAARTA syttyvät ja
 * sammuvat luennan tahdissa. Kuvake itse ei liiku eikä häivy.
 *
 * ══════════════════════════════════════════════════════════════════
 * KAARET SEURAAVAT PUHETTA, EIVÄT AJASTUSTA (omistaja 15.9.2026 klo
 * 08.35 UTC, iPhone v1908, sanatarkasti: *"Kajutin kuvake elää, mutta
 * se ei elä puheen tahdissa."*)
 * ══════════════════════════════════════════════════════════════════
 *
 * JUURISYY, jonka omistaja näki. v1908 luki analysaattoria vain jos
 * luenta sattui olemaan reititetty Web Audioon — ja js/luenta.js
 * reititti VAIN iOS:llä JA vain jos äänikonteksti oli sillä sekunnilla
 * jo `running`. `resume()` on asynkroninen, joten istunnon ensimmäinen
 * luenta (juuri saapumisluenta) jäi lähes aina reitittämättä. Silloin
 * `audio.aaniMittari` oli null ja mittari piirsi AJASTETTUA KUVIOTA:
 * kaaret elivät, mutta oman sinikäyränsä eivätkä isoisän tahdissa.
 *
 * KORJAUS on kahdessa paikassa:
 *   1. js/luenta.js reitittää luennan KAIKILLA laitteilla ja yrittää
 *      uudelleen, kun äänikonteksti herää (varaaReitityksenUusinta).
 *   2. Tämä moduuli mittaa aidon RMS:n ja liikuttaa kaaria sillä.
 *
 * ── LÄHDE ON AINA MITATTU, JOS AUDIOCONTEXT ON OLEMASSA ────────────
 *
 * Ajastettu kuvio on jäljellä vain varapolkuna sille selaimelle, jossa
 * AudioContextia EI OLE lainkaan, ja silloin siitä jää console.info.
 * Näin ajastus ei voi enää piiloutua "elävän" mittarin taakse.
 *
 * ── ATTACK NOPEA, RELEASE ~120 ms ──────────────────────────────────
 *
 * Verhokäyrän seuraaja on epäsymmetrinen ja SIDOTTU AIKAAN, ei
 * kehyksiin: nouseva reuna otetaan lähes sellaisenaan (tavun alku
 * näkyy heti), laskeva reuna vaimenee ~120 ms:n aikavakiolla, jotta
 * puheen sisäiset mikrotauot eivät välkytä kaaria. Puheen oikeat tauot
 * (satojen millisekuntien hiljaisuus) näkyvät silti: kaikki sammuu.
 *
 * ── MIKSI KOLME TASOA EIKÄ LIUKUVA ARVO ────────────────────────────
 *
 * Kaaria on kolme, joten mittarissa on neljä tilaa (0–3 palavaa). Tila
 * vaihtuu vain kun luku vaihtuu, eli DOM:iin kosketaan korkeintaan
 * muutaman kerran sekunnissa, vaikka silmukka pyörii joka kehyksellä.
 *
 * ── EI SUODATTIMIA (iOS-sääntö, tests/rules.test.mjs) ──────────────
 *
 * Kaaret vaihtavat vain `opacity`-arvoa luokan kautta. Ei blur-, ei
 * drop-shadow- eikä muutakaan suodatinta, ei myöskään skaalausta.
 */

/** Kaaria kaiuttimessa — sama luku kuin index.html:n poluissa. */
export const KAARIA = 3;

/** Ajastetun kuvion jakso: yksi nousu ja lasku (ms). */
const KUVION_JAKSO_MS = 900;

/**
 * Verhokäyrän laskuaika (aikavakio, ms). Nousu on lähes hetkellinen.
 *
 * MITTAAMALLA VALITTU: 120 ms on lyhyempi kuin puheen tauko (tyypillinen
 * lausetauko 300–700 ms), joten tauot näkyvät; ja pitempi kuin tavujen
 * välinen notkahdus (30–80 ms), joten kaaret eivät välky.
 */
const RELEASE_MS = 120;

/** Nousevan reunan aikavakio (ms). Käytännössä heti. */
const ATTACK_MS = 18;

/**
 * Tasot, joilla kaari syttyy analysaattorin RMS:llä (0…1).
 *
 * MITATTU Horation luennasta (Chromium, tools/savukkeet/
 * savuke-kaiutin-luentakuvat.mjs): puheen RMS kulkee tasolla
 * 0,03…0,25, hiljaisuus alle 0,01. Kynnykset asetetaan siihen, että
 * hiljaisuus on tasan nolla kaarta ja normaali puhe elää välillä 1–3.
 */
const KYNNYKSET = [0.04, 0.10, 0.20];

/** Alle tämän tason kaikki kaaret sammuvat — hiljaisuus on hiljaisuus. */
const HILJAISUUS = KYNNYKSET[0];

/**
 * Ajastetun kuvion omat kynnykset (0…1).
 *
 * Kuvion 0…1 ei ole RMS:ää, joten sillä on omat, tasavälisemmät
 * kynnyksensä — muuten mittari jumittuisi kahteen kaareen.
 */
const KUVION_KYNNYKSET = [0.18, 0.45, 0.72];

/**
 * Onko tässä selaimessa AudioContextia lainkaan? Vain tämä oikeuttaa
 * ajastettuun kuvioon (Raamattu: KAIUTTIMEN KAARET SEURAAVAT PUHETTA).
 */
function audioContextOlemassa() {
  return typeof globalThis.AudioContext === 'function'
    || typeof globalThis.webkitAudioContext === 'function';
}

/** Kuvion loki kerran istunnossa, ei joka luennasta. */
let kuviostaKerrottu = false;

function kerroKuviosta(syy) {
  if (kuviostaKerrottu) return;
  kuviostaKerrottu = true;
  globalThis.console?.info?.(
    `[kaiutinmittari] ajastettu kuvio käytössä: ${syy}. `
    + 'Kaaret eivät seuraa todellista äänitasoa.',
  );
}

/** Odotuslokin kertaluontoinen lippu. */
let odotuksestaKerrottu = false;

function kerroOdotuksesta() {
  if (odotuksestaKerrottu) return;
  odotuksestaKerrottu = true;
  globalThis.console?.info?.(
    '[kaiutinmittari] analysaattoria ei vielä ole (luennan reititys '
    + 'avautumassa) — kaaret pysyvät sammuksissa.',
  );
}

/**
 * Mittarin nykyinen lähde vartijoille ja testeille:
 * 'mitattu' = analysaattorin RMS, 'kuvio' = ajastettu, null = seis.
 */
let lahde = null;

/** @returns {?string} 'mitattu' | 'kuvio' | null */
export function kaiutinmittarinLahde() {
  return lahde;
}

/** Vain testejä varten: unohtaa kertaluontoisen lokin. */
export function nollaaKaiutinmittarinLoki() {
  kuviostaKerrottu = false;
  odotuksestaKerrottu = false;
}

/** Käynnissä oleva mittari, tai null. */
let mittariKay = null;

/**
 * Yhden napin kaaret. Haetaan kerran: nappi ei vaihdu pelin aikana,
 * mutta varmuuden vuoksi haku on tilakohtainen.
 */
function haeKaaret(nappi) {
  return [...(nappi?.querySelectorAll?.('.kaiutin-kaari') ?? [])];
}

/** Palavien kaarien määrä tasosta annetuilla kynnyksillä. */
function tasosta(taso, kynnykset) {
  let n = 0;
  for (const kynnys of kynnykset) if (taso >= kynnys) n += 1;
  return n;
}

/**
 * Analysaattorin RMS 0…1, tai null jos mittaria ei ole. Aikatasoinen
 * data riittää eikä vaadi taajuusmuunnosta.
 */
function mittarinTaso(mittari, puskuri) {
  if (!mittari || !puskuri) return null;
  try {
    mittari.getByteTimeDomainData(puskuri);
  } catch {
    return null;
  }
  let summa = 0;
  for (let i = 0; i < puskuri.length; i += 1) {
    const poikkeama = (puskuri[i] - 128) / 128;
    summa += poikkeama * poikkeama;
  }
  return Math.sqrt(summa / puskuri.length);
}

/**
 * Ajastettu kuvio: kaksi eri mittaista siniaaltoa päällekkäin, jotta
 * kuvio ei toistu tasan joka jaksolla eikä näytä metronomilta.
 */
function kuvionTaso(kulunut) {
  const a = Math.sin((kulunut / KUVION_JAKSO_MS) * Math.PI * 2);
  const b = Math.sin((kulunut / (KUVION_JAKSO_MS * 1.7)) * Math.PI * 2);
  // 0…1, painopiste keskellä: kaikki kolme kaarta palavat vain huipuilla.
  return Math.max(0, Math.min(1, 0.5 + 0.34 * a + 0.16 * b));
}

/** Sytytä n ensimmäistä kaarta, sammuta loput. */
function piirraKaaret(kaaret, n) {
  for (let i = 0; i < kaaret.length; i += 1) {
    kaaret[i].classList.toggle('palaa', i < n);
  }
}

/**
 * MITTARI KÄYNTIIN. Kutsutaan luentavahdista (js/ui.js) heti kun
 * kertoja on äänessä. Toistuva kutsu samalle napille ei tee mitään —
 * vahti kysyy tilaa 200 ms:n välein.
 *
 * @param {?Element} nappi kaiutinnappi (#fact-kuuntele)
 * @param {() => ?AnalyserNode} [haeMittari] luennan analysaattori, jos on
 * @param {{pakotaKuvio?: boolean, haeVahvistus?: () => ?number}} [asetukset]
 *   `haeVahvistus` palauttaa luennan gain-arvon, jolla mitattu taso
 *   normalisoidaan: analysaattori on ketjussa GAININ JÄLKEEN (yhteinen
 *   js/musiikkivahvistin.js), joten ilman normalisointia Lukija-liuku
 *   himmentäisi kaaret. Mittari näyttää PUHEEN tason, ei säätimen.
 *   `pakotaKuvio` on vain vastakoetta varten.
 * @returns {boolean} lähtikö mittari käyntiin tällä kutsulla
 */
export function kaynnistaKaiutinmittari(nappi, haeMittari = null, asetukset = {}) {
  if (!nappi || typeof globalThis.requestAnimationFrame !== 'function') return false;
  if (mittariKay?.nappi === nappi) return false;
  pysaytaKaiutinmittari();
  const kaaret = haeKaaret(nappi);
  if (!kaaret.length) return false;
  const kuvioKielletty = !asetukset.pakotaKuvio && audioContextOlemassa();
  const tila = {
    nappi,
    kaaret,
    haeMittari: asetukset.pakotaKuvio ? null : haeMittari,
    kuvioKielletty,
    haeVahvistus: asetukset.haeVahvistus ?? null,
    kahva: 0,
    alku: 0,
    edellinen: 0,
    taso: 0,
    nyt: -1,
    puskuri: null,
  };
  mittariKay = tila;
  lahde = null;
  const askel = (aika) => {
    if (mittariKay !== tila || !nappi.isConnected) return;
    if (!tila.alku) { tila.alku = aika; tila.edellinen = aika; }
    const dt = Math.max(1, Math.min(250, aika - tila.edellinen));
    tila.edellinen = aika;
    const mittari = tila.haeMittari?.() ?? null;
    if (mittari && (!tila.puskuri || tila.puskuri.length !== mittari.fftSize)) {
      tila.puskuri = new Uint8Array(mittari.fftSize);
    }
    const raaka = mittari ? mittarinTaso(mittari, tila.puskuri) : null;
    const vahvistus = Number(tila.haeVahvistus?.());
    const jakaja = Number.isFinite(vahvistus) && vahvistus > 0
      ? Math.max(0.2, Math.min(1, vahvistus)) : 1;
    const mitattu = raaka === null ? null : Math.min(1, raaka / jakaja);
    let n;
    if (mitattu !== null) {
      /*
       * AIKAAN SIDOTTU VERHOKÄYRÄ. Kerroin lasketaan kehysvälistä,
       * jotta seuraaja käyttäytyy samoin 60 fps:n puhelimella ja
       * kartan kuormittamalla 10 fps:n ruudulla — kehyskohtainen
       * vakiokerroin olisi jälkimmäisessä puolen sekunnin aikavakio ja
       * litistäisi puheen keskiarvokseen (mitattu v1908:ssa).
       */
      const vakio = mitattu > tila.taso ? ATTACK_MS : RELEASE_MS;
      const k = 1 - Math.exp(-dt / vakio);
      tila.taso += (mitattu - tila.taso) * k;
      n = tila.taso < HILJAISUUS ? 0 : tasosta(tila.taso, KYNNYKSET);
      lahde = 'mitattu';
    } else if (tila.kuvioKielletty) {
      /*
       * AudioContext on olemassa mutta analysaattoria ei — reititys on
       * vasta avautumassa (js/luenta.js varaaReitityksenUusinta).
       * Kaaret pysyvät sammuksissa sen sijaan että valehtelisivat
       * puheen tahtia; tila kestää korkeintaan yhden eleen verran.
       * Loki jää kerran istunnossa, jottei aukko voi jäädä hiljaiseksi.
       */
      kerroOdotuksesta();
      tila.taso = 0;
      n = 0;
      lahde = null;
    } else {
      // Ei AudioContextia lainkaan: ajastettu kuvio, ja siitä jää loki.
      kerroKuviosta(asetukset.pakotaKuvio
        ? 'vastakoe pakotti kuvion' : 'AudioContext puuttuu selaimesta');
      tila.taso = kuvionTaso(aika - tila.alku);
      n = tasosta(tila.taso, KUVION_KYNNYKSET);
      lahde = 'kuvio';
    }
    if (n !== tila.nyt) {
      tila.nyt = n;
      piirraKaaret(kaaret, n);
    }
    tila.kahva = globalThis.requestAnimationFrame(askel);
  };
  tila.kahva = globalThis.requestAnimationFrame(askel);
  return true;
}

/**
 * MITTARI SEIS JA KAIKKI KAARET SAMMUKSIIN. Luennan loppu, keskeytys
 * ja mykistys päätyvät kaikki tänne — mykistettynä ääntä ei synny,
 * joten luentavahti näkee saman tilan kuin vaikeneminen.
 *
 * @returns {boolean} oliko mittari käynnissä
 */
export function pysaytaKaiutinmittari() {
  const tila = mittariKay;
  if (!tila) return false;
  mittariKay = null;
  lahde = null;
  globalThis.cancelAnimationFrame?.(tila.kahva);
  piirraKaaret(tila.kaaret, 0);
  return true;
}

/** Onko mittari juuri nyt käynnissä? (vartijoita ja testejä varten) */
export function kaiutinmittariKaynnissa() {
  return mittariKay !== null;
}
