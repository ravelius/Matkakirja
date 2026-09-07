/*
 * PALLOLAUDAN NOSTOT — karttanostot, skandaalit, historian hetket,
 * Matkakirjan ihmeet, eläintäyt ja kohtaamispiste pallolla (vaihe 3,
 * docs/moduulit/karttapallo.md luku 4.2).
 *
 * KAKSI KERROSTA RINNAKKAIN (Raamattu, KARTTANOSTOT POLTETAAN
 * LAATTOIHIN): laatoissa oleva nosto on POLTETTU ja saa vain
 * R-osuman — ei elementtiä, vain ruutupiste, johon napautus vertaa
 * (js/pallolauta/lauta.js napautaPintaan: lähin merkki 44 px:n sisällä,
 * fokusniput sääntö 9: lähin keskipiste voittaa). Polttamaton nosto on
 * ELÄVÄ ja piirtyy H-elementtinä: sama viivamerkki ja nimiö kuin
 * tasokartalla (js/fokusnosto-symbolit.js piirraNostosymKartalle) omaan
 * pieneen svg:hen, ruutuvakiona. Kumpi kumpi on, kertoo PALLON OMA
 * laattaluettelo (js/pallo.js pallonNostoOnPoltettu) — pallon sarja
 * poltetaan pyramidista eri hetkellä, joten pyramidi.json ei kelpaa.
 *
 * LADONTA ON SAMA KUIN LAATASSA JA KARTALLA. Merkkien paikat, kasaus
 * kaupungin kyljille (js/fokusniput.js), erottelu ja nimiön kylki
 * tulevat samasta tyngästä, jolla laatta poltettiin
 * (js/fokuskohteet.js maanKohdemerkit → ladoMaanTynka) — pallo ei lado
 * nostoja itse. Merkit näkyvät vasta, kun maan lehti täyttää vähintään
 * puolet näkymästä (LEHDEN_VAHIN_OSUUS), ei siirron aikana — sama
 * portti kuin kartalla.
 *
 * KATTO. Elävät H-merkit ovat CSS2D-elementtejä (karttapallo.md luku 6):
 * enintään NOSTOJEN_KATTO kerrallaan, lähimmät ruudun keskipistettä
 * ensin; ylimenevät odottavat polttoa (ne eivät ole ruudulla eivätkä
 * siksi napautettavia). Kohtaamispiste on aina ensimmäinen.
 *
 * KORTIT ANKKUROIDAAN RUUTUPISTEESTÄ: napautus antaa avaajalle merkin
 * ruutupisteen (avaaFokuskohde { ankkuri }), ja lauta siirtää auki olevaa
 * korttia levossa (asemoiFokuskohde).
 *
 * AIHEVALOT (js/karttavalot.js, karttaselite) ovat pistekerroksen
 * täpliä (P) vain ruudulla olevien merkkien alla; laskurit kertovat
 * selitteelle kappaleet samasta joukosta.
 */

import { FOKUS_POHJAT } from '../packs/fokus-grc.js';
import {
  LEHDEN_VAHIN_OSUUS, avaaFokuskohde, kohteidenNykyinenIso, maanKohdemerkit, maanKohdetiedot,
  naapurienPoltetutMerkit, suljeFokuskohde,
} from '../fokuskohteet.js';
import { ELAINTAKY_NAKYY_ASTETTA, avaaElaintaky, elaintakyLaudalla } from '../elaintaky.js';
import { avaaFokuspiste, fokuspisteKuvio, fokuspisteenSiirto } from '../fokuspiste.js';
import { fokusvirtaKohtaamispiste } from '../fokusvirta.js';
import {
  NOSTOSYM_MINI_RUUTU, NOSTOSYM_NIMIO_KOKO, nostosymNimioAsemointi, nostosymNimioMitta,
  nostosymPaakategoria, piirraNostosymKartalle,
} from '../fokusnosto-symbolit.js';
import { KARTTANIMI_KOOT } from '../karttanimet.js';
import { karttavaloVari, karttavalotLue } from '../karttavalot.js';
import { nostoladontaTiiviste } from '../nostoladonta.js';
import { pallonNostoOnPoltettu } from '../pallo.js';
import { PALLOLAUDAN_LEVEYS } from './kamera.js';
import { sovitteleLaput } from './sovittelu.js';

/** Eläviä nostoja pallolla enintään kerrallaan (karttapallo.md luku 6). */
export const NOSTOJEN_KATTO = 40;
/**
 * Merkin mitta ruudulla: kirjaston yksikkö → px niin, että nimiö on
 * kartan kohdenimiön kokoinen (js/karttanimet.js KOKO.kohde 8,5 px,
 * joka on myös poltetun nimiön katto) — sama koko kuin laatassa 1:1.
 */
export const NOSTON_MITTA = KARTTANIMI_KOOT.kohde / NOSTOSYM_NIMIO_KOKO;
/** Aihevalon säde (Globe.gl pointRadius-yksikköä) ja korkeus kaupunkipisteen alla. */
export const VALON_SADE = 0.06;
export const VALON_KORKEUS = 0.0015;
export const VALON_PEITTO = 0.45;

const SVG = 'http://www.w3.org/2000/svg';

/** Elävän noston elementti: viivamerkki + nimiö samaan pieneen svg:hen. */
export function nostoElementti(d) {
  const el = document.createElement('div');
  el.className = `pallolauta-nosto pallolauta-nosto-${d.perhe}`;
  el.dataset.nosto = d.id;
  el.dataset.aihe = d.aihe ?? '';
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('width', '1');
  svg.setAttribute('height', '1');
  svg.setAttribute('aria-hidden', 'true');
  const g = document.createElementNS(SVG, 'g');
  g.setAttribute('class', 'pallolauta-nosto-siirto');
  svg.appendChild(g);
  el.appendChild(svg);
  asetteleNosto(el, d);
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', d.nimi || d.id);
  return el;
}

/**
 * Noston sisäasettelu: mittakaava, sovittelun pieni siirto ja se kylki,
 * jolla nimiö piirretään (js/pallolauta/sovittelu.js).
 *
 * SIIRTO ON CSS-MUUNNOS, EI transform-MÄÄRE: `.pallolauta-nosto-siirto`
 * animoi muunnoksen 200 ms:ssä (css/styles.css), joten väistö liukuu
 * eikä hypi — sama ratkaisu kuin nimen siirtymällä
 * (js/pallolauta/nimet.js .pallolauta-nimi-siirto). Reduced motion
 * poistaa siirtymän samasta säännöstä.
 *
 * RASTERI PIIRRETÄÄN VAIN KUN RESEPTI MUUTTUU. piirraNostosymKartalle
 * LISÄÄ ryhmään uuden <image>-solmun eikä tyhjennä sitä, joten ryhmä on
 * tyhjennettävä ensin — ja koska kyljen vaihto on rasterille vain uusi
 * välimuistiavain (kylki on avaimessa), uusi kuva saapuu osumassa jo
 * samalla mikrotehtävällä.
 */
export function asetteleNosto(el, d) {
  const g = el.querySelector('.pallolauta-nosto-siirto');
  if (!g) return;
  const dx = d.dx ?? 0;
  const dy = d.dy ?? 0;
  g.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${NOSTON_MITTA.toFixed(4)})`;
  const nimio = d.nimioNakyy && d.nimi ? d.nimi : '';
  const puoli = d.puoli ?? 'oikea';
  const resepti = `${d.kategoria ?? ''}|${d.symLaji ?? ''}|${puoli}|${nimio}`;
  if (g.dataset.resepti !== resepti) {
    g.dataset.resepti = resepti;
    g.replaceChildren();
    piirraNostosymKartalle(g, d.kategoria, nimio, d.symLaji, puoli);
  }
  el.dataset.nimio = nimio;
  el.classList.toggle('lunastettu', Boolean(d.lunastettu));
}

/** Kohtaamispisteen elementti: sama tuike kuin kartalla (css/fokusvirta.css). */
export function pisteElementti(d) {
  const el = document.createElement('div');
  el.className = 'pallolauta-piste';
  el.dataset.piste = d.id;
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('width', '1');
  svg.setAttribute('height', '1');
  svg.setAttribute('aria-hidden', 'true');
  const g = document.createElementNS(SVG, 'g');
  g.setAttribute('class', 'fokuspiste');
  svg.appendChild(g);
  el.appendChild(svg);
  fokuspisteKuvio(g);
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', `${d.nimi}: ${d.teko}`);
  return el;
}

/**
 * Elävän noston laatikko ruudulla (nimiladonnan varaus): symbolin
 * ruutu ja nimiön kaista kirjaston asemoinnista (nostosymNimioAsemointi)
 * merkin mitassa.
 */
export function nostonLaatikko(p, d, {
  kylki = null, dx = 0, dy = 0, nimio = null,
} = {}) {
  const r = NOSTOSYM_MINI_RUUTU * NOSTON_MITTA;
  const x = p.x + dx;
  const y = p.y + dy;
  const laatikko = {
    x0: x - r, y0: y - r, x1: x + r, y1: y + r,
  };
  const nakyy = nimio === null ? Boolean(d.nimioNakyy) : Boolean(nimio);
  if (!nakyy || !d.nimi) return laatikko;
  const { leveys } = nostosymNimioMitta(d.nimi, d.symLaji);
  const a = nostosymNimioAsemointi(kylki ?? d.puoli ?? 'oikea', leveys);
  return {
    x0: Math.min(laatikko.x0, x + a.x1 * NOSTON_MITTA),
    y0: Math.min(laatikko.y0, y + a.y1 * NOSTON_MITTA),
    x1: Math.max(laatikko.x1, x + a.x2 * NOSTON_MITTA),
    y1: Math.max(laatikko.y1, y + a.y2 * NOSTON_MITTA),
  };
}

/**
 * Nostokerros pallolle. `ruudulla(lat, lng)` antaa ruutupisteen tai
 * null (pallon takana tai ulkona), `merkit` on merkkirekisteri (osa
 * `nostot`), `onPoltettu(tunnus, tiiviste)` pallon laattaluettelon
 * vastaus.
 */
export function luoNostot({
  ui, merkit, asteet, ruudulla, onPoltettu = pallonNostoOnPoltettu,
}) {
  let osumat = []; // ruudulla olevat, napautettavat merkit
  let laatikot = [];
  let laskurit = new Map();
  let valot = [];
  let lappuja = []; // elävät nimiölaput sovittelua varten ({ r, datum })
  let datumit = []; // viimeksi asetetut nostodatumit (sovittelu päivittää)
  let sovittelu = {
    siirretty: 0, kylkiVaihtui: 0, piilotettu: 0, jaljella: 0, lappuja: 0,
  };
  let laskeLaatikot = () => { laatikot = []; };
  const varit = new Map();

  /** Aiheen väri CSS-muuttujasta pistekerroksen väriksi (rgba). */
  const valonVari = (aihe) => {
    if (varit.has(aihe)) return varit.get(aihe);
    let vari = 'rgba(138, 109, 74, 0.45)';
    try {
      const koe = document.createElement('span');
      koe.style.color = karttavaloVari(aihe);
      document.body.appendChild(koe);
      const rgb = getComputedStyle(koe).color.match(/\d+(\.\d+)?/g);
      koe.remove();
      if (rgb && rgb.length >= 3) vari = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${VALON_PEITTO})`;
    } catch { /* ilman DOMia oletusväri */ }
    varit.set(aihe, vari);
    return vari;
  };

  /** Valotäplät palaville aiheille ruudulla olevien merkkien alle. */
  const paivitaValot = () => {
    const palaa = karttavalotLue();
    valot = osumat
      .filter((o) => o.aihe && palaa.has(o.aihe))
      .map((o) => ({
        laji: 'valo', id: `valo:${o.avain}`, aihe: o.aihe, lat: o.lat, lon: o.lng, vari: valonVari(o.aihe),
      }));
    return valot;
  };

  /**
   * Kerää tämän näkymän merkit: oman maan nostot (elävät ja poltetut),
   * naapurimaiden poltetut, eläintäyt ja kohtaamispiste. `nakyva` on
   * kameran näkyvä alue laudan yksiköissä (ui.nakyvaAlue-muoto).
   */
  const keraa = (nakyva) => {
    const { game } = ui;
    const pack = game?.pack;
    const rivit = [];
    if (!pack || ui.katselu || game.phase === 'pickstart' || ui.aloituslentoKesken) return rivit;
    const liikkuu = ui.movingPlayerId != null;
    const iso = kohteidenNykyinenIso(ui);
    const pohja = iso ? FOKUS_POHJAT[iso] : null;
    const lehtiNakyy = Boolean(pohja?.bbox && pohja.lauta === pack.id && nakyva?.w > 0
      && pohja.bbox.w / nakyva.w >= LEHDEN_VAHIN_OSUUS);
    if (lehtiNakyy && !liikkuu) {
      const tiedot = maanKohdetiedot(ui, iso);
      for (const m of maanKohdemerkit(pack, iso, pohja, onPoltettu)) {
        const a = asteet(m);
        if (!a) continue;
        const kohde = tiedot.get(m.id) ?? m.kohde;
        if (!kohde) continue;
        rivit.push({
          avain: `nosto:${m.id}`,
          id: m.id,
          perhe: 'nosto',
          lat: a.lat,
          lng: a.lon,
          nimi: m.nimi ?? '',
          nimioNakyy: m.nimioNakyy,
          kategoria: m.kategoria,
          symLaji: m.laji,
          puoli: m.puoli ?? 'oikea',
          aihe: nostosymPaakategoria(m.kategoria),
          poltettu: m.poltettu,
          avaa: (ankkuri) => avaaFokuskohde(ui, kohde, { ankkuri }),
        });
      }
      // Naapurimaan poltettu muste on myös napautettava (2.9.2026, Bosnia).
      for (const m of naapurienPoltetutMerkit(ui, nakyva, onPoltettu)) {
        const a = asteet(m);
        if (!a || !m.kohde) continue;
        rivit.push({
          avain: `naapuri:${m.iso}:${m.id}`,
          id: m.id,
          perhe: 'nosto',
          lat: a.lat,
          lng: a.lon,
          nimi: m.nimi ?? '',
          nimioNakyy: Boolean(m.nimio),
          kategoria: m.kategoria,
          symLaji: m.laji,
          puoli: m.puoli ?? 'oikea',
          aihe: nostosymPaakategoria(m.kategoria),
          poltettu: true,
          avaa: (ankkuri) => avaaFokuskohde(ui, m.kohde, { ankkuri }),
        });
      }
    }
    // Eläintäyt: koko laudalla, vasta kun näkymä on maanosan levyinen.
    const asteita = nakyva?.w > 0 ? (nakyva.w * 360) / PALLOLAUDAN_LEVEYS : Infinity;
    if (asteita <= ELAINTAKY_NAKYY_ASTETTA && !liikkuu) {
      for (const t of elaintakyLaudalla(ui)) {
        const a = asteet(t);
        if (!a) continue;
        const tiiviste = nostoladontaTiiviste({
          tunnus: t.tunnus, symboli: 'elain', laji: 'elain', nimio: t.nimio, x: t.x, y: t.y, osat: [],
        });
        rivit.push({
          avain: `elain:${t.iso}`,
          id: t.tunnus,
          perhe: 'elain',
          lat: a.lat,
          lng: a.lon,
          nimi: t.nimio,
          nimioNakyy: true,
          kategoria: 'elain',
          symLaji: 'elain',
          puoli: 'oikea',
          aihe: 'elaimet',
          lunastettu: Boolean(game.elaintakyLunastettu?.(t.iso)),
          poltettu: onPoltettu(t.tunnus, tiiviste),
          avaa: () => { if (!ui.busy) avaaElaintaky(ui, t.iso); },
        });
      }
    }
    // Kevyen kulun vihreä kohtaamispiste (js/fokuspiste.js sääntö).
    const city = game.cityOf?.();
    const piste = city ? fokusvirtaKohtaamispiste(ui, city) : null;
    if (piste) {
      /*
       * PISTE POIS NAPPULAN ALTA (omistaja 6.9.2026 ilta: *"aarteen
       * piste syttyy liian lähelle ateenaa, ei pysty painamaan"*): sama
       * sivusiirto kuin tasokartalla (js/fokuspiste.js
       * fokuspisteenSiirto) — merkki JA osuma siirtyvät, data ei.
       * Nappula ei ota napautuksia (css pointer-events), mutta ilman
       * siirtoa piste ja kaupunki olivat samassa ruutupisteessä ja
       * lähin merkki -sääntö antoi tasapelin kaupungille.
       */
      const siirto = fokuspisteenSiirto(city, piste);
      const a = asteet({ x: piste.x + siirto.x, y: piste.y + siirto.y });
      if (a) {
        rivit.push({
          avain: `piste:${city.id}`,
          id: `piste:${city.id}`,
          perhe: 'piste',
          lat: a.lat,
          lng: a.lon,
          nimi: piste.nimi,
          teko: piste.teko,
          nimioNakyy: true,
          aihe: null,
          poltettu: false,
          avaa: () => avaaFokuspiste(ui, city),
        });
      }
    }
    return rivit;
  };

  /**
   * Päivittää kerroksen: kutsutaan levossa (js/pallolauta/lauta.js).
   * Palauttaa elävien laatikot nimiladonnan varauksiksi ja määrän.
   */
  const paivita = ({ nakyva, katto = NOSTOJEN_KATTO, keskipiste = null } = {}) => {
    const rivit = keraa(nakyva);
    const nakyvat = [];
    for (const r of rivit) {
      const p = ruudulla(r.lat, r.lng);
      if (!p) continue;
      nakyvat.push({ ...r, p, etaisyys: keskipiste ? Math.hypot(p.x - keskipiste.x, p.y - keskipiste.y) : 0 });
    }
    // Elävät: kohtaamispiste ensin, sitten lähimmät ruudun keskipistettä.
    const elavat = nakyvat.filter((r) => !r.poltettu)
      .sort((a, b) => ((a.perhe === 'piste') - (b.perhe === 'piste')) * -1 || (a.etaisyys - b.etaisyys));
    const naytetaan = elavat.slice(0, Math.max(0, katto));
    datumit = naytetaan.map((r) => ({
      avain: r.avain,
      laji: r.perhe === 'piste' ? 'piste' : 'nosto',
      id: r.id,
      perhe: r.perhe,
      lat: r.lat,
      lng: r.lng,
      nimi: r.nimi,
      teko: r.teko ?? null,
      nimioNakyy: r.nimioNakyy,
      kategoria: r.kategoria ?? null,
      symLaji: r.symLaji ?? null,
      puoli: r.puoli ?? 'oikea',
      dx: 0,
      dy: 0,
      aihe: r.aihe ?? null,
      lunastettu: Boolean(r.lunastettu),
      elementti: r.perhe === 'piste' ? pisteElementti : nostoElementti,
      asettele: r.perhe === 'piste' ? undefined : asetteleNosto,
    }));
    merkit.aseta('nostot', datumit);
    /*
     * NIMILAPPU ON OSA OSUMAPINTAA (Raamattu, VIAT v1672; omistaja
     * 7.9.2026 illalla sanatarkasti: *"Karttanostoissa teksti ei ota
     * klikkausta ainoastaan kuvake. Saisiko myös tekstit
     * klikattaviksi?"*).
     *
     * Osuma on tähän asti ollut pelkkä ruutuetäisyys merkin pisteeseen
     * (js/pallolauta/lauta.js napautaPintaan, 44 px), ja lappu piirtyy
     * ikonin KYLKEEN: pitkän nimen ulkopää jää säteen ulkopuolelle tai
     * lähemmäksi naapurin keskipistettä, jolloin napautus tekstiin ei
     * tehnyt mitään tai avasi väärän noston.
     *
     * Jokainen osuma antaa siksi oman LAPPUNSA LAATIKON ruudulla —
     * täsmälleen sen, jota sovittelu (js/pallolauta/sovittelu.js) käytti
     * väistössä, samasta kaavasta (nostonLaatikko) samoilla asennoilla.
     * Piilotetulla lapulla (sovittelu vei nimen) laatikko on pelkkä
     * IKONIN ruutu — jokaisella nostolla on oma laatikkonsa, jotta
     * kuvakkeen päällä oleva sormi ei häviä naapurin lapun
     * kosketusvaralle (js/pallolauta/lauta.js LAPUN_KOSKETUSVARA_PX).
     *
     * Laatikko lasketaan VASTA NAPAUTUKSESSA annetusta ruutupisteestä
     * (`lappu(p)`) eikä ladonnan hetkellä: kamera on voinut liikkua
     * ladonnan jälkeen, ja lappu seuraa merkkiään.
     */
    naytetaan.forEach((r, i) => {
      const d = datumit[i];
      if (r.perhe === 'piste') return;
      // Datum kantaa sovittelun jälkeisen asennon (kylki ja siirto);
      // osuma lukee sen vasta napautuksessa, jotta väistö näkyy myös
      // osumapinnassa.
      r.datum = d;
      // Piiloon sovitellulla lapulla laatikko on pelkkä IKONIN ruutu —
      // ei null. Osumatestillä on kosketusvara (js/pallolauta/lauta.js
      // LAPUN_KOSKETUSVARA_PX), ja ilman omaa laatikkoa nimetön nosto
      // häviäisi kuvakkeensa päällä naapurin lapun varalle.
      r.lappu = (p) => nostonLaatikko(p, r, {
        kylki: d.puoli, dx: d.dx, dy: d.dy, nimio: Boolean(d.nimioNakyy && d.nimi),
      });
    });
    // Poltetun musteen lappu on paistettu laattaan: lauta ei näe sitä,
    // mutta tuntee sen laatikon samasta kaavasta (ladonta on sama).
    for (const r of nakyvat) {
      if (!r.poltettu || r.perhe === 'piste') continue;
      r.lappu = (p) => nostonLaatikko(p, r, { nimio: Boolean(r.nimioNakyy && r.nimi) });
    }
    osumat = [...naytetaan, ...nakyvat.filter((r) => r.poltettu)];
    /*
     * KIINTEÄ MUSTE ON NIMILADONNAN VARAUS, LIIKKUVA EI (Raamattu,
     * KAUPUNGIN NIMI NOSTOJEN PAALLA). Nimi väistää vain sitä, mikä ei
     * voi väistää itse: POLTETUN noston koko musteen (ikoni + laattaan
     * paistettu nimiö) ja elävän noston IKONIN, joka on kiinni omassa
     * karttapisteessään. Elävän noston LAPPU ei ole varaus — se on
     * sovittelun liikkuva osapuoli, ja se väistää nimen jälkeenpäin
     * (sovittele). Ennen tätä järjestys oli päinvastainen: lappu varasi
     * paikkansa ja NIMI putosi, mikä on juuri se, mitä omistaja ei
     * halunnut.
     */
    lappuja = [];
    const ikonit = [];
    naytetaan.forEach((r, i) => {
      if (r.perhe === 'piste') return;
      ikonit.push({ r, datum: datumit[i] });
      if (r.nimioNakyy && r.nimi) lappuja.push({ r, datum: datumit[i] });
    });
    const ikonilaatikko = ({ r, datum }) => nostonLaatikko(r.p, r, {
      dx: datum.dx, dy: datum.dy, nimio: false,
    });
    laskeLaatikot = () => {
      laatikot = [
        ...ikonit.map(ikonilaatikko),
        ...nakyvat.filter((r) => r.poltettu).map((r) => nostonLaatikko(r.p, r)),
      ];
    };
    laskeLaatikot();
    sovittelu = {
      siirretty: 0, kylkiVaihtui: 0, piilotettu: 0, jaljella: 0, lappuja: lappuja.length,
    };
    laskurit = new Map();
    for (const o of osumat) if (o.aihe) laskurit.set(o.aihe, (laskurit.get(o.aihe) ?? 0) + 1);
    paivitaValot();
    // Auki oleva kortti, jonka merkki ei ole enää ruudulla, sulkeutuu
    // kuten kartalla kerroksen piiloutuessa.
    const auki = ui.fokuskohdeAuki;
    if (auki?.ankkuri && !osumat.some((o) => o.id === auki.id)) suljeFokuskohde(ui);
    return { maara: naytetaan.length, laatikot, osumia: osumat.length };
  };

  /**
   * NOSTOJEN LAPUT VÄISTÄVÄT KAUPUNGIN NIMEÄ (js/pallolauta/sovittelu.js).
   * Ajetaan `paivita`n ja nimiladonnan JÄLKEEN samassa levossa: nimet
   * ovat silloin kiinteitä laatikoita, joita lappu ei saa peittää.
   *
   * `nimet` on ladottujen kaupunkinimien ruutulaatikot
   * (js/pallolauta/nimet.js laatikot). Mitat lasketaan kaavasta
   * (nostonLaatikko) eikä ruudulta, joten sovittelu ei koske DOMiin
   * ennen kuin jokin lappu oikeasti liikkuu — ei layout-thrashia.
   */
  const sovittele = ({ nimet = [] } = {}) => {
    if (!lappuja.length) return sovittelu;
    const tulos = sovitteleLaput({
      laput: lappuja.map(({ r, datum }) => ({
        avain: datum.avain,
        kylki: datum.puoli,
        laatikko: (kylki, dx, dy, nimio) => nostonLaatikko(r.p, r, {
          kylki, dx, dy, nimio,
        }),
      })),
      esteet: nimet,
    });
    let muuttui = false;
    for (const { r, datum } of lappuja) {
      const a = tulos.asennot.get(datum.avain);
      if (!a) continue;
      if (datum.puoli === a.kylki && datum.dx === a.dx && datum.dy === a.dy
        && datum.nimioNakyy === a.nimio) continue;
      datum.puoli = a.kylki;
      datum.dx = a.dx;
      datum.dy = a.dy;
      datum.nimioNakyy = a.nimio;
      muuttui = true;
    }
    // Siirtynyt ikoni on myös siirtynyt varaus (js/pallolauta/lauta.js
    // lukee laatikot myös sovittelun jälkeen).
    if (muuttui) { laskeLaatikot(); merkit.aseta('nostot', datumit); }
    sovittelu = {
      siirretty: tulos.siirretty,
      kylkiVaihtui: tulos.kylkiVaihtui,
      piilotettu: tulos.piilotettu,
      jaljella: tulos.jaljella,
      lappuja: lappuja.length,
    };
    return sovittelu;
  };

  return {
    paivita,
    sovittele,
    paivitaValot,
    /**
     * Napautettavat merkit ruudulla ({ avain, id, lat, lng, nimi, avaa,
     * perhe, poltettu }). Nostoilla ja eläintäyillä on lisäksi
     * `lappu(p)`: nimilapun ruutulaatikko annetussa ruutupisteessä —
     * ikonin ja näkyvän nimiön yhdiste, tai pelkkä ikonin ruutu, jos
     * lappua ei juuri nyt ole (ks. NIMILAPPU ON OSA OSUMAPINTAA).
     */
    osumat: () => osumat,
    /** Kiinteän musteen laatikot nimiladonnan varauksiksi (ks. paivita). */
    laatikot: () => laatikot,
    /** Viimeisimmän sovittelun luvut (savukkeet ja vartijat). */
    sovittelunTulos: () => sovittelu,
    /**
     * Elävien nostojen NIMILAPPUJEN laatikot sovittelun jälkeen —
     * mitat kaavasta, samasta kuin sovittelu käytti (savukkeet ja
     * vartijat mittaavat tästä, eivät ruudulta: elementin oma svg on
     * 1 x 1 px ja ylivuotava, joten getBoundingClientRect ei kerro
     * lapusta mitään).
     */
    lappuLaatikot: () => lappuja
      .filter(({ datum }) => datum.nimioNakyy && datum.nimi)
      .map(({ r, datum }) => ({
        id: datum.id,
        nimi: datum.nimi,
        // Perhe kertoo savukkeelle, mikä ovi lapun takaa aukeaa
        // (nosto = kohdekortti, elain = eläintäky).
        perhe: datum.perhe,
        puoli: datum.puoli,
        dx: datum.dx,
        dy: datum.dy,
        ...nostonLaatikko(r.p, r, {
          kylki: datum.puoli, dx: datum.dx, dy: datum.dy, nimio: true,
        }),
      })),
    /**
     * NAPAUTETTAVIEN LAPPUJEN LAATIKOT juuri nyt (savukkeet ja
     * vartijat): sama `lappu(p)`, jota osumatesti käyttää
     * (js/pallolauta/lauta.js lappuunOsunut), joten savuke mittaa
     * täsmälleen sitä pintaa, jota sormi napauttaa — myös POLTETUSTA
     * musteesta, jolla ei ole elementtiä lainkaan.
     */
    osumaLaatikot: () => osumat.map((o) => {
      const p = typeof o.lappu === 'function' ? ruudulla(o.lat, o.lng) : null;
      const r = p ? o.lappu(p) : null;
      return r ? {
        id: o.id,
        nimi: o.nimi,
        perhe: o.perhe,
        poltettu: Boolean(o.poltettu),
        puoli: o.datum?.puoli ?? o.puoli ?? 'oikea',
        ...r,
      } : null;
    }).filter(Boolean),
    valot: () => valot,
    /** Kappaleet aiheittain selitevalikolle (js/karttavalot.js). */
    laskurit: () => laskurit,
  };
}
