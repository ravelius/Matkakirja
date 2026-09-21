/*
 * ISOISÄN LINSSI — VUOSI 1873.
 *
 * Raamattu, Karttalinssit "ISOISÄN LINSSI — VUOSI 1873" (omistaja
 * 21.9.2026 klo 09.07, Fablen linjaus): oma vahvasti retro linssi VAIN
 * isoisän matkan vuodesta — sen vuoden rajat ja maiden nimet, Horation
 * reitti katkoviivana, myöhemmin isoisän valokuvat, äänet ja media. Ei
 * aikajanaa: tämä on yksi pysähtynyt vuosi, ei kello.
 *
 * ERÄ 1 (Karttaseppä 21.9.2026): rajat ja nimet pallolla.
 *
 *  - RAJAT: assets/data/rajat-1873.json (tools/tee-rajat-1873.mjs) —
 *    historical-basemaps 1878 → 1873, naulattu Natural Earthin nykyrajoihin
 *    siellä missä raja ei ole muuttunut. Piirto pallon vektorikerroksen
 *    soluttomana lajina (js/pallovektorit.js asetaHistoriarajat): sama
 *    LineSegments2-moottori kuin rantaviivalla, tasan pikselin levyinen
 *    joka korkeudella; nykyiset rajat sammuvat linssin ajaksi. Lisenssi:
 *    GPL-3.0 johdetulle aineistolle (tiedoston `lisenssi`-kenttä; peli
 *    itse ei muutu, aineisto on erillinen tiedosto).
 *  - NIMET: valtioiden 1873-nimet (js/packs/valtiot-1873.js, kolme
 *    kokoluokkaa kameran korkeuden mukaan) ja nimistön poliittiset
 *    maakunnat (js/packs/nimisto-1873.js rivit aika='1873') CSS2D-
 *    merkkeinä laudan linssimoottorin kautta (linssit.merkit). Merkit
 *    ovat eläviä, eivät poltettuja: linssi voi joskus vaihtaa vuotta.
 *
 * MIKSI VEKTORI EIKÄ RASTERI: 10 k pistettä on 59 kt gzipattuna; sama
 * rajaviivasto kelpaa sellaisenaan viivatason polttoon (tools/fokuskartta/
 * rajat-1873.json.gz, rajasetti '1873'), jos rajat halutaan joskus
 * laattoihin. Rasterinen atlaslehti (Stieler 1875) on eri linssi (Q2).
 *
 * Tasokartalla (`piirra`) linssi ei piirrä mitään: peli on pallolla
 * (omistaja 5.9.2026), ja tasokartan rajat tulisivat samasta
 * rajasetistä polttamalla, ei tästä.
 */

import { kytkePallonKehys } from '../pallo.js';
import { NIMISTO_1873 } from '../packs/nimisto-1873.js';
import { VALTIOT_1873 } from '../packs/valtiot-1873.js';

/** Rajaviivaston osoite (assets, sama alkuperä). */
export const RAJAT_OSOITE = 'assets/data/rajat-1873.json';

/** Osien nimet laudan linssimoottorissa. */
export const OSA_VALTIOT = 'isoisa-1873-valtiot';
export const OSA_MAAKUNNAT = 'isoisa-1873-maakunnat';

/**
 * Nimien näkyvyys kameran korkeuden (Globe.gl altitude, 1 = pallon säde)
 * mukaan: koko pallolla vain suuret valtakunnat, Euroopan mitassa myös
 * keskikokoiset, lähempänä kaikki ja maakunnat. Rajat samasta taulusta
 * kuin nimibudjetti (js/pallolauta/nimet.js: 20 = koko pallo).
 */
export const NIMIEN_KORKEUSRAJAT = Object.freeze({
  suuri: Infinity,
  keski: Infinity,
  pieni: 0.13,
  maakunta: 0.15,
});

/** Nimien arvojärjestys törmäyksessä: pienempi luku voittaa. */
export const NIMIEN_ARVO = Object.freeze({ suuri: 0, keski: 1, pieni: 2, maakunta: 3 });

/** Nimien välinen rako ruutupikseleinä törmäystarkistuksessa. */
export const NIMIEN_RAKO_PX = 4;

/**
 * Törmäyksen ratkaisu: arvokkaampi jää, heikompi piiloon — sama
 * periaate kuin nimiöiden vakaudessa (Raamattu: NIMIÖIDEN VAKAUS,
 * näkyvyydellä ei siirrolla). `laatikot` = [{ avain, arvo, x0, y0, x1, y1 }]
 * lähtöjärjestyksessä; palauttaa piilotettavien avaimet.
 */
export function ratkaiseTormaykset(laatikot, rako = NIMIEN_RAKO_PX) {
  const jarjestys = [...laatikot].sort((a, b) => a.arvo - b.arvo);
  const pidetyt = [];
  const piiloon = new Set();
  for (const l of jarjestys) {
    const osuu = pidetyt.some((p) => l.x0 - rako < p.x1 && l.x1 + rako > p.x0
      && l.y0 - rako < p.y1 && l.y1 + rako > p.y0);
    if (osuu) piiloon.add(l.avain); else pidetyt.push(l);
  }
  return piiloon;
}

/** Näkyvyyden päivitysjarru (ms): kamera liikkuu, nimet vaihtuvat vasta levossa. */
export const NAKYVYYDEN_JARRU_MS = 150;

let rajat = null;
let rajalupaus = null;

/** Lataa rajaviivaston kerran; epäonnistuminen jättää linssin ilman rajoja, ei kaada. */
export async function lataaRajat(haku = globalThis.fetch) {
  if (rajat) return rajat;
  if (!rajalupaus) {
    rajalupaus = (async () => {
      try {
        const vastaus = await haku(RAJAT_OSOITE);
        if (!vastaus?.ok) throw new Error(`HTTP ${vastaus?.status}`);
        const data = await vastaus.json();
        if (!Array.isArray(data?.viivat)) throw new Error('viivat puuttuu');
        rajat = data;
      } catch (syy) {
        console.warn('Isoisän linssi: rajaviivastoa ei saatu.', syy);
        rajat = null;
      }
      return rajat;
    })();
  }
  return rajalupaus;
}

/** Nimen elementti pallolle (ks. css .pallolauta-isoisa-nimi). */
export function nimenElementti(d) {
  const el = document.createElement('span');
  el.className = `pallolauta-isoisa-nimi pallolauta-isoisa-nimi--${d.koko}`;
  if (d.luokka === 2) el.classList.add('pallolauta-isoisa-nimi--vasalli');
  if (d.luokka === 3) el.classList.add('pallolauta-isoisa-nimi--alusmaa');
  el.textContent = d.teksti;
  el.dataset.koko = d.koko;
  el.dataset.avain = d.avain;
  el.setAttribute('aria-hidden', 'true');
  return el;
}

/** Valtioiden datumit linssimoottorille. */
export function valtioDatumit(valtiot = VALTIOT_1873) {
  return valtiot.map((v) => ({
    avain: `valtio-${v.teksti}`, lat: v.lat, lng: v.lon, teksti: v.teksti, koko: v.koko,
    luokka: v.luokka, elementti: nimenElementti,
  }));
}

/** Maakuntien (aika='1873') datumit. */
export function maakuntaDatumit(nimisto = NIMISTO_1873) {
  return nimisto.filter((n) => n.aika === '1873').map((n) => ({
    avain: `maakunta-${n.teksti}`, lat: n.lat, lng: n.lon, teksti: n.teksti, koko: 'maakunta',
    luokka: 0, elementti: nimenElementti,
  }));
}

/** Näkyykö tämän kokoluokan nimi tällä kameran korkeudella? */
export function nimiNakyy(koko, korkeus) {
  return korkeus <= (NIMIEN_KORKEUSRAJAT[koko] ?? 0);
}

export const LINSSI = {
  tunnus: 'isoisa-1873',
  jarjestys: 12,
  kerros: true,

  nimi: 'Isoisän linssi 1873',
  lyhyt: 'Maailma isoisän silmin: vuoden 1873 rajat ja valtakunnat.',
  // Vanha silmälasipari: kaksi linssiä ja nenäsilta.
  ikoni: '<circle cx="7.5" cy="13" r="4.2"/><circle cx="16.5" cy="13" r="4.2"/>'
    + '<path d="M11.7 13h0.6M3.3 13 4.6 6.4M20.7 13l-1.3-6.6"/>',

  laudat: ['maailmankartta'],

  lahde: {
    aineisto: 'historical-basemaps (aourednik) world_1878 → 1873, tarkennus Natural Earth '
      + '10m admin_0_boundary_lines_land; valtioiden nimet 1873-muodossa',
    lisenssi: 'GPL-3.0 (rajaviivasto), Natural Earth public domain',
    osoite: 'https://github.com/aourednik/historical-basemaps',
    haettu: '2026-09-21',
  },

  async lataa() {
    await lataaRajat();
  },

  /** Tasokartalla ei piirretä mitään (ks. otsake). */
  piirra() {
    return false;
  },

  /**
   * Pallolla: rajat vektorikerrokseen, nimet merkeiksi. Nimien näkyvyys
   * seuraa kameran korkeutta laudan kehyskoukusta jarrutettuna.
   */
  pallolle(lauta) {
    if (!lauta?.linssit) return { pura: () => {} };
    const vektorit = lauta.vektorit?.() ?? null;
    let suljettu = false;

    void (async () => {
      const data = await lataaRajat();
      if (suljettu || !data) return;
      vektorit?.asetaHistoriarajat?.({ avain: '1873', viivat: data.viivat });
    })();

    const valtiot = valtioDatumit();
    const maakunnat = maakuntaDatumit();
    lauta.linssit.merkit(OSA_VALTIOT, valtiot);
    lauta.linssit.merkit(OSA_MAAKUNNAT, maakunnat);

    /*
     * Näkyvyys kokoluokittain: elementin luokka `piilossa` (css display:
     * none), jotta kirjaston oma näkyvyys (pallon takapuoli) säilyy.
     */
    let viimeAvain = '';
    let kello = 0;
    const elementit = () => [...(lauta.kotelo?.querySelectorAll?.('.pallolauta-isoisa-nimi') ?? [])];
    const paivita = () => {
      kello = 0;
      if (suljettu) return;
      const pov = lauta.pallo?.pointOfView?.();
      const korkeus = pov?.altitude;
      if (!(korkeus >= 0)) return;
      // Sama näkymä (0,01 korkeutta, 0,2° paikkaa) ei ladota uudestaan.
      const avain = `${korkeus.toFixed(2)}|${pov.lat.toFixed(1)}|${pov.lng.toFixed(1)}`;
      if (avain === viimeAvain) return;
      viimeAvain = avain;
      const kaikki = elementit();
      // 1. korkeusraja kokoluokittain
      const ehdokkaat = [];
      for (const el of kaikki) {
        const koko = el.dataset.koko;
        const sallittu = nimiNakyy(koko, korkeus);
        el.classList.toggle('piilossa', !sallittu);
        if (sallittu) ehdokkaat.push(el);
      }
      // 2. törmäykset ruudulla: kirjaston oma näkyvyys (pallon takapuoli)
      // näkyy elementin display-arvona, joten mitta otetaan vain näkyvistä.
      const laatikot = [];
      for (const el of ehdokkaat) {
        const r = el.getBoundingClientRect();
        if (!(r.width > 0)) continue;
        laatikot.push({ avain: el.dataset.avain, arvo: NIMIEN_ARVO[el.dataset.koko] ?? 9, x0: r.left, y0: r.top, x1: r.right, y1: r.bottom, el });
      }
      const piiloon = ratkaiseTormaykset(laatikot);
      for (const l of laatikot) if (piiloon.has(l.avain)) l.el.classList.add('piilossa');
    };
    const kuuntelija = () => {
      if (kello || suljettu) return;
      kello = setTimeout(paivita, NAKYVYYDEN_JARRU_MS);
    };
    // Sama piirtokoukku kuin vektorikerroksella (js/pallo.js): kutsu
    // joka kehyksellä, jarru päästää yhden päivityksen 150 ms:ssa.
    const kehyspurku = kytkePallonKehys(lauta.pallo, lauta.kotelo, kuuntelija);
    // Ensimmäinen luokitus heti, kun merkit ovat puussa.
    setTimeout(paivita, 0);

    return {
      pura() {
        suljettu = true;
        if (kello) clearTimeout(kello);
        kehyspurku();
        vektorit?.asetaHistoriarajat?.(null);
        lauta.linssit.pura(OSA_VALTIOT);
        lauta.linssit.pura(OSA_MAAKUNNAT);
      },
      /** Savukkeille: montako nimeä on näkyvissä tällä korkeudella. */
      nakyvia: () => elementit().filter((el) => !el.classList.contains('piilossa')).length,
    };
  },

  selite() {
    return [
      { vari: '#4a3320', teksti: 'Valtionraja vuonna 1873' },
      { vari: '#8a6a48', teksti: 'Osmanien vasalli tai autonominen alue (Romania, Serbia, Montenegro, Egypti)' },
      { vari: '#6b5539', teksti: 'Valtakuntien ja siirtomaiden nimet isoisän ajan muodossa' },
    ];
  },
};
