/*
 * PULUN ISS-REPLIIKIT — Livia Astronautin kamerassa ja ISS:n kyydissä.
 *
 * Päätoimittajan käsikirjoitus 28.9.2026 (docs/raportit/
 * pulu-iss-kasikirjoitus-20260928.md, omistaja klo 19.3x): Pulu toivottaa
 * avaruuslinssiin tervetulleeksi, suosittelee, pyöräyttää pallon, räppäisee
 * väärän näkymän, pahoittelee ja luovuttaa ohjauksen (A–C,
 * js/linssit/pulu-tervetulo.js) — ja palaa radioon, kun pelaaja menee
 * ISS:n kyytiin (D, tämä moduuli).
 *
 * TEKSTIT OVAT KAANONIA js/livia.js:n LIVIAN_ISS-taulussa, äänitteet
 * eleven_v4:llä esigeneroituja (tools/generoi-pulu.mjs, lähteet iss-a …
 * iss-d, js/liviapuhe.js LIVIAN_VERSIOIDUT_AANET). Kesto on siis tiedossa
 * etukäteen (LIVIAN_KESTOT), ja kameran liikkeet ajastetaan sen mukaan.
 *
 * ── D: ISS-KYYTI (rajapinta, ei vielä kytketty) ───────────────────────
 *
 * Kyyti asuu haarassa pelikoodari-iss-kyyti (js/linssit/iss-kyyti-nakyma.js),
 * joka ei ole vielä mainissa. Tämä moduuli antaa valmiin rajapinnan, jonka
 * kyyti kutsuu (luoPulunIssKyyti):
 *
 *   kyytiAlkoi()     pelaaja nousi kyytiin → D1 kerran per sessio
 *                    (sivun elinkaari), D2 noin 20 s D1:n alusta
 *   yopuoliAlla()    asema on yöpuolen yllä → D3 ensimmäisellä kerralla
 *                    (kerran per sessio)
 *   kyytiPaattyi()   pelaaja poistui → D4, jos Livia puhui tässä kyydissä
 *   pura()           linssi suljettiin: kaikki hiljaa, ajastimet pois
 *
 * QUINDAR-PIIPPAUS (NASAn radion "roger beep"): 2 525 Hz:n siniääni,
 * 250 ms, jokaisen D-repliikin alkuun ja loppuun. Malli ei tuota sitä
 * (koe docs/raportit/pulu-efektit-koe-20260928.md: kapean kaistan osuus
 * sama kuin puheessa), joten se soitetaan Web Audiolla pelin omassa
 * äänikontekstissa (js/musiikkivahvistin.js musiikkiKonteksti — sama
 * konteksti, jonka kautta Livian puhe reititetään iOS:llä) ja samalla
 * tasolla kuin Livian puhe: pulun oma liuku × LIVIAN_PERUSTASO.
 *
 * MYKISTYS: mykistetyssä pelissä (kertojan kytkin pois tai pulun liuku
 * nollassa) mitään ei soiteta eikä kertalippuja kuluteta — repliikki tulee
 * silloin, kun pelaaja kuulee sen. D:ssä ei ole kameraliikkeitä, joten
 * Vähennä liikettä ei vaienna sitä.
 */

import { pulunVoima } from '../aani-ehdokkaat.js';
import { LIVIAN_ISS } from '../livia.js';
import {
  LIVIAN_KESTOT, LIVIAN_PERUSTASO, pysaytaLivianAani, soitaLivianAani,
} from '../liviapuhe.js';
import { luentaKytkinPaalla } from '../luenta.js';
import { musiikkiKonteksti } from '../musiikkivahvistin.js';
import { polloKuplatPois, polloLinssikupla } from '../pollo.js';

/** Quindar-piippauksen taajuus (NASA Apollo/ISS: 2 525 Hz alku, 2 475 Hz loppu; käsikirjoitus: 2 525 molemmat). */
export const QUINDAR_TAAJUUS_HZ = 2525;
/** Piippauksen kesto. */
export const QUINDAR_KESTO_MS = 250;
/**
 * Piippauksen huippuamplitudi suhteessa Livian puheen tasoon. Puheen
 * keskitaso on noin −18…−24 dBFS; 0,1:n siniaallon RMS on −23 dBFS, joten
 * piippaus kuuluu selvästi mutta ei peitä puhetta.
 */
export const QUINDAR_TASO = 0.1;
/** Piippauksen reunojen pehmennys (naksahdukseton alku ja loppu). */
export const QUINDAR_REUNA_MS = 6;
/** Hiljaisuus piippauksen ja puheen välissä. */
export const QUINDAR_VALI_MS = 150;
/** D2 tulee näin kauan D1:n alun jälkeen (käsikirjoitus: "~20 s myöhemmin"). */
export const PULUN_ISS_D2_VIIVE_MS = 20000;
/** Hengähdys kahden peräkkäisen repliikin välissä. */
export const PULUN_ISS_HENGAHDYS_MS = 400;
/** Varakello, jos soitin ei kerro loppuaan: äänitteen kesto + tämä. */
export const PULUN_ISS_VARA_MS = 2000;
/** Kuplan luokka (sama kuplaperhe kuin muissa linssien pulukuplissa). */
export const PULUN_ISS_KUPLA = 'pulu-iss-kupla';

/**
 * Yksi ISS-repliikki: lähde, indeksi, avain, teksti ja tunnettu kesto.
 *
 * @param {'a'|'b'|'c'|'d'} ryhma käsikirjoituksen ryhmä
 * @param {number} indeksi ryhmän monesko (0-alkuinen)
 * @returns {{lahde:string, indeksi:number, avain:string, teksti:string, kestoMs:number}|null}
 */
export function pulunIssRepliikki(ryhma, indeksi) {
  const teksti = LIVIAN_ISS[ryhma]?.[indeksi];
  if (!teksti) return null;
  const lahde = `iss-${ryhma}`;
  const avain = `${lahde}-${indeksi + 1}`;
  const kesto = Number(LIVIAN_KESTOT[avain]);
  return {
    lahde, indeksi, avain, teksti,
    kestoMs: Number.isFinite(kesto) && kesto > 0 ? Math.round(kesto * 1000) : 0,
  };
}

/** Onko Livian ääni pois (kertojan kytkin tai pulun oma liuku nollassa)? */
export function pulunIssMykistetty() {
  try {
    return !luentaKytkinPaalla() || !(pulunVoima() > 0);
  } catch {
    return true;
  }
}

/** Vähennä liikettä: pelin oma lippu tai selaimen asetus. */
export function pulunIssVahennaLiiketta(ui = null) {
  if (ui?.reducedMotion) return true;
  try {
    return Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  } catch {
    return false;
  }
}

/**
 * QUINDAR-PIIPPAUS Web Audiolla. Palauttaa true, jos piippaus ajastettiin.
 *
 * Oskillaattori → vahvistin → kontekstin ulostulo. Amplitudi nousee ja
 * laskee QUINDAR_REUNA_MS:ssa, jotta alku ja loppu eivät naksahda.
 *
 * @param {object} [asetukset]
 * @param {AudioContext|null} [asetukset.konteksti] pelin äänikonteksti
 * @param {number} [asetukset.taso] huippuamplitudi (oletus: pulun liuku × perustaso × QUINDAR_TASO)
 * @param {number} [asetukset.viiveMs] alkaa näin monen millisekunnin päästä
 */
export function soitaQuindar({
  konteksti = musiikkiKonteksti(),
  taso = pulunVoima() * LIVIAN_PERUSTASO * QUINDAR_TASO,
  viiveMs = 0,
} = {}) {
  if (!konteksti || !(taso > 0)) return false;
  try {
    const alku = Number(konteksti.currentTime || 0) + Math.max(0, viiveMs) / 1000;
    const kesto = QUINDAR_KESTO_MS / 1000;
    const reuna = QUINDAR_REUNA_MS / 1000;
    const osc = konteksti.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(QUINDAR_TAAJUUS_HZ, alku);
    const vahvistin = konteksti.createGain();
    vahvistin.gain.setValueAtTime(0, alku);
    vahvistin.gain.linearRampToValueAtTime(taso, alku + reuna);
    vahvistin.gain.setValueAtTime(taso, alku + kesto - reuna);
    vahvistin.gain.linearRampToValueAtTime(0, alku + kesto);
    osc.connect(vahvistin).connect(konteksti.destination);
    osc.start(alku);
    osc.stop(alku + kesto + 0.02);
    osc.onended = () => {
      try { osc.disconnect(); vahvistin.disconnect(); } catch { /* jo irti */ }
    };
    return true;
  } catch {
    return false;
  }
}

/**
 * SANOO YHDEN ISS-REPLIIKIN: kupla ensin, ääni sen mukana (sama järjestys
 * ja sama kuplaperhe kuin Ihmisen matkan välihuomioilla,
 * js/pollo.js polloLinssikupla). Palauttaa kahvan tai null, jos kupla ei
 * näkynyt (Livia ei ole vielä pelissä, chatti on auki) — silloin mitään
 * ei soiteta.
 *
 * @param {object} ui pelin käyttöliittymä
 * @param {object} repliikki pulunIssRepliikki()
 * @param {object} [riippuvuudet] testien korvattavat kutsut
 * @returns {{audio: HTMLAudioElement|null, repliikki: object}|null}
 */
export function sanoPulunIssRepliikki(ui, repliikki, {
  kupla = polloLinssikupla, soita = soitaLivianAani,
} = {}) {
  if (!repliikki) return null;
  let audio = null;
  const nakyi = kupla([repliikki.teksti], {
    luokka: PULUN_ISS_KUPLA,
    aani: () => {
      audio = soita(ui, repliikki.lahde, repliikki.indeksi, { teksti: repliikki.teksti });
      return audio;
    },
  });
  return nakyi ? { audio, repliikki } : null;
}

/**
 * Kutsuu `valmis` kerran, kun repliikki on sanottu: soittimen 'ended' tai
 * 'error', tai varakello (kesto + PULUN_ISS_VARA_MS), jos soitinta ei ole
 * tai se ei koskaan kerro loppuaan. Palauttaa peruutusfunktion.
 */
export function kunRepliikkiLoppuu(kahva, valmis, kello = globalThis) {
  let tehty = false;
  const audio = kahva?.audio ?? null;
  const kerran = () => {
    if (tehty) return;
    tehty = true;
    kello.clearTimeout?.(vara);
    audio?.removeEventListener?.('ended', kerran);
    audio?.removeEventListener?.('error', kerran);
    valmis();
  };
  const kestoMs = kahva?.repliikki?.kestoMs ?? 0;
  const vara = kello.setTimeout?.(kerran, kestoMs + PULUN_ISS_VARA_MS);
  audio?.addEventListener?.('ended', kerran);
  audio?.addEventListener?.('error', kerran);
  return () => {
    tehty = true;
    kello.clearTimeout?.(vara);
    audio?.removeEventListener?.('ended', kerran);
    audio?.removeEventListener?.('error', kerran);
  };
}

/*
 * ISTUNNON MUISTI: D1 ja D3 kerran per sessio. Sessio on sivun elinkaari
 * (moduulin muisti), ei laitteen muisti: uusi pelikerta saa taas
 * tervehdyksen. Testit nollaavat muistin funktiolla.
 */
const pulunIssIstunto = { d1: false, d3: false };

/** Testeille: istunnon kertaliput alkutilaan. */
export function nollaaPulunIssIstunto() {
  pulunIssIstunto.d1 = false;
  pulunIssIstunto.d3 = false;
}

/**
 * ISS-KYYDIN LIVIA (D1–D4) — rajapinta kyydille.
 *
 * Repliikit menevät jonoon: jos D3 osuu D1:n päälle, se odottaa vuoroaan
 * eikä katkaise edellistä. Radiorepliikki on aina piippaus → puhe →
 * piippaus. `kyytiPaattyi` hiljentää kesken olevan repliikin ja sanoo D4:n
 * vain, jos Livia puhui tässä kyydissä.
 *
 * @param {object} p
 * @param {object} p.ui pelin käyttöliittymä
 * @param {object} [p.kello] setTimeout/clearTimeout (testit)
 * @param {Function} [p.sano] (ui, repliikki) → kahva|null (testit)
 * @param {Function} [p.piippaa] (asetukset) → boolean (testit)
 * @param {Function} [p.mykistetty] () → boolean (testit)
 * @param {Function} [p.vaikene] (ui) → void: kesken olevan puheen pysäytys
 */
export function luoPulunIssKyyti({
  ui = null,
  kello = globalThis,
  sano = sanoPulunIssRepliikki,
  piippaa = soitaQuindar,
  mykistetty = pulunIssMykistetty,
  vaikene = (u) => { pysaytaLivianAani(u, { haivyta: false }); polloKuplatPois(); },
} = {}) {
  let kyydissa = false;
  let puhuiTassaKyydissa = false;
  let purettu = false;
  const jono = [];
  let puhuu = false;
  let peruLoppu = null;
  const ajastimet = new Set();
  const sanotut = [];

  const ajasta = (fn, ms) => {
    const id = kello.setTimeout?.(() => { ajastimet.delete(id); fn(); }, ms);
    ajastimet.add(id);
    return id;
  };
  const tyhjennaAjastimet = () => {
    for (const id of ajastimet) kello.clearTimeout?.(id);
    ajastimet.clear();
  };

  const seuraava = () => {
    if (puhuu || purettu) return;
    const repliikki = jono.shift();
    if (!repliikki) return;
    if (mykistetty()) { jono.length = 0; return; }
    puhuu = true;
    // Radio: piippaus → hengähdys → puhe → piippaus.
    piippaa({});
    ajasta(() => {
      if (purettu) { puhuu = false; return; }
      const kahva = sano(ui, repliikki);
      if (!kahva) {
        // Kupla ei näkynyt (Livia ei ole pelissä tai chatti on auki):
        // repliikkiä ei sanottu, eikä sen perään piipata.
        ajasta(() => { puhuu = false; seuraava(); }, PULUN_ISS_HENGAHDYS_MS);
        return;
      }
      sanotut.push(repliikki.avain);
      peruLoppu = kunRepliikkiLoppuu(kahva, () => {
        peruLoppu = null;
        if (kahva?.audio && !mykistetty()) piippaa({});
        ajasta(() => { puhuu = false; seuraava(); }, QUINDAR_KESTO_MS + PULUN_ISS_HENGAHDYS_MS);
      }, kello);
    }, QUINDAR_KESTO_MS + QUINDAR_VALI_MS);
  };

  const jonoon = (repliikki) => {
    if (!repliikki || purettu) return false;
    jono.push(repliikki);
    seuraava();
    return true;
  };

  const katkaise = () => {
    tyhjennaAjastimet();
    jono.length = 0;
    peruLoppu?.();
    peruLoppu = null;
    if (puhuu) {
      try { vaikene(ui); } catch { /* ei soitinta */ }
    }
    puhuu = false;
  };

  return {
    /** Pelaaja nousi kyytiin. Palauttaa true, jos D1 lähti jonoon. */
    kyytiAlkoi() {
      if (purettu || kyydissa) return false;
      kyydissa = true;
      puhuiTassaKyydissa = false;
      if (pulunIssIstunto.d1 || mykistetty()) return false;
      pulunIssIstunto.d1 = true;
      puhuiTassaKyydissa = true;
      jonoon(pulunIssRepliikki('d', 0));
      ajasta(() => {
        if (kyydissa && !mykistetty()) jonoon(pulunIssRepliikki('d', 1));
      }, PULUN_ISS_D2_VIIVE_MS);
      return true;
    },
    /** Asema on yöpuolen yllä. Palauttaa true, jos D3 lähti jonoon. */
    yopuoliAlla() {
      if (purettu || !kyydissa || pulunIssIstunto.d3 || mykistetty()) return false;
      pulunIssIstunto.d3 = true;
      puhuiTassaKyydissa = true;
      return jonoon(pulunIssRepliikki('d', 2));
    },
    /** Pelaaja poistui kyydistä. Palauttaa true, jos D4 lähti jonoon. */
    kyytiPaattyi() {
      if (purettu || !kyydissa) return false;
      kyydissa = false;
      katkaise();
      if (!puhuiTassaKyydissa || mykistetty()) return false;
      puhuiTassaKyydissa = false;
      return jonoon(pulunIssRepliikki('d', 3));
    },
    /** Linssi suljettiin: kaikki hiljaa. */
    pura() {
      if (purettu) return;
      katkaise();
      purettu = true;
      kyydissa = false;
    },
    /** Mittari testeille ja savukkeelle. */
    tila: () => ({ kyydissa, puhuu, jonossa: jono.length, sanotut: sanotut.slice(), purettu }),
  };
}
