/*
 * NIMIÖRASTERIT — GL-KERROKSEN RASTERILÄHDE (GL-kerros vaihe 1,
 * Pelikoodari; docs/raportit/gl-kerros-suunnitelma-20260921.md).
 *
 * Karttasepän runko (js/pallonimiot-gl.js) piirtää nimiöt ja merkit
 * pallon omaan WebGL-piirtoon instanssoituina spriteinä. Tämä moduuli
 * on ainoa, joka tietää, MILTÄ ne näyttävät: se antaa jokaiselle
 * datumille (kaupungin nimi, nosto, kaupunkipiste) yhden tai kaksi
 * rasteria samalla muodolla, jotta runko ei erottele lajeja:
 *
 *   { avain, kuva, w, h, ankkuriX, ankkuriY, skaala, katto }
 *
 *   avain     vakaa merkkijono (laji|resepti|porras|dpr) — sama avain on
 *             sama rasteri, runko välimuistittaa UV:n avaimella
 *   kuva      ImageBitmap (tai canvas) LAITEPIKSELEISSÄ, läpinäkyvä
 *             tausta, ei premultiply-oletuksia
 *   w, h      kuvan mitat laitepikseleinä
 *   ankkuriX/Y  maapisteen (sprite ripustetaan tähän) paikka rasterissa
 *             laitepikseleinä
 *   skaala    CSS-pikseliä per rasterin pikseli kertoimella 1: ruudulla
 *             sprite on w·skaala·kuorenKerroin CSS-px leveä
 *   katto     nostoilla { a, b } kuten --nimio-a/-b (nimet.js
 *             asetaKuorenKatto): näytetty kerroin = min(k·a, b); nimillä null
 *
 * NOSTOT käyttävät TÄSMÄLLEEN samaa rasteria ja välimuistia kuin SVG-
 * kuva (js/fokusnosto-symbolit.js nostosymRasteri: sama avain, sama
 * blob) — ikoni ja nimiö erillisinä spriteinä kuten CSS2D:ssä
 * (erillinenNimio), joten kylkivaihto ja piilotus ovat rungossa
 * nimiöspriten opacity. KAUPUNKIEN NIMET rasteroidaan tässä canvasille
 * samalla kirjasimella ja musteella kuin SVG-teksti (asu luetaan
 * CSS:stä koettimella, ei kahdennettuna); KAUPUNKIPISTE on kiekko
 * pisteen omalla värillä.
 *
 * VALMISTUMINEN. `hae(d)` palauttaa heti, mitä on: valmis rasteri tai
 * { avain, valmis: false } ja käynnistää työn; kun rasteri valmistuu,
 * tilaajat (tilaaRasterit) saavat avaimen ja runko merkitsee
 * instanssin päivitettäväksi. Rasteri tehdään vasta
 * `document.fonts.ready`n jälkeen, jotta kirjasin on oikea.
 *
 * VÄLIMUISTI on LRU (NIMIORASTERIEN_KATTO); vanhin ImageBitmap
 * suljetaan (close), kun katto ylittyy.
 */

import { KARTTANIMI_FONTTI } from '../karttanimet.js';
import {
  nostosymMitanKatto, nostosymPorrasNyt, nostosymRasteri, nostosymRasterinAvain, nostosymReseptit,
} from '../fokusnosto-symbolit.js';
import { ruudunKerroin } from './nostot.js';
import {
  KOHDEMERKIN_HALO_KESKI, KOHDEMERKIN_HALO_LAAJIN, KOHDEMERKIN_NIMI_PX,
  KOHDEMERKIN_NIMI_RAKO_PX, KOHDEMERKIN_PISTE_PX, KOHDEMERKIN_PX, nappulaElementti,
} from './merkit.js';

/** Välimuistin katto (rastereita); yli menevät suljetaan vanhin ensin. */
export const NIMIORASTERIEN_KATTO = 600;
/** Nimen rasterin pehmuste (CSS px) halon ja kirjainten ylityksen varalle. */
export const NIMEN_PEHMUSTE_PX = 3;
/** Kaupunkipisteen rasterin pehmuste (px). */
const PISTEEN_PEHMUSTE_PX = 1.5;

/**
 * Kaupungin nimen asu CSS:stä: kirjasin, muste ja halo luetaan
 * koettimella `<svg><text class="karttanimi karttanimi-kaupunki">`
 * kotelosta, jotta tyyli on yksi (css/styles.css .karttanimi). Vara-arvot
 * ovat samat kuin tyylitiedostossa.
 */
export function lueNimenAsu(kotelo, doc = globalThis.document) {
  const vara = {
    kirjasin: KARTTANIMI_FONTTI, muste: 'rgba(103, 88, 73, 0.92)', halo: null, haloLeveys: 0, tyyli: 'normal',
  };
  if (!doc?.createElementNS || !kotelo?.appendChild) return vara;
  try {
    const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none';
    const teksti = doc.createElementNS('http://www.w3.org/2000/svg', 'text');
    teksti.setAttribute('class', 'karttanimi karttanimi-kaupunki');
    teksti.style.fontFamily = KARTTANIMI_FONTTI;
    teksti.textContent = 'x';
    svg.appendChild(teksti);
    kotelo.appendChild(svg);
    const cs = getComputedStyle(teksti);
    const stroke = cs.stroke && cs.stroke !== 'none' ? cs.stroke : null;
    const ulos = {
      kirjasin: cs.fontFamily || vara.kirjasin,
      muste: cs.fill || vara.muste,
      halo: stroke,
      haloLeveys: stroke ? parseFloat(cs.strokeWidth) || 0 : 0,
      tyyli: cs.fontStyle || 'normal',
    };
    svg.remove();
    return ulos;
  } catch {
    return vara;
  }
}

/** Nimen rasterin avain: teksti, koko, asu, ankkuri, dpr. */
export function nimenAvain(d, dpr) {
  return `nimi|${d.teksti}|${Number(d.koko).toFixed(2)}|${d.ank ?? 'start'}|${d.tyylitys ?? ''}|${Number(d.vali ?? 0).toFixed(2)}|${dpr}`;
}

/**
 * Kaupungin nimi kankaalle. Ankkuri on tekstin origo (x = alku/keski/
 * loppu `ank`in mukaan, y = keskilinja kuten dominant-baseline: middle),
 * eli sama piste, johon SVG-teksti on kiinnitetty translate(dx, dy):llä.
 * `luoKangas` annetaan testeille (Node ilman canvasia).
 */
export function rasteroiNimi(d, asu, dpr, luoKangas = (w, h) => {
  const k = document.createElement('canvas');
  k.width = w;
  k.height = h;
  return k;
}) {
  const koko = Number(d.koko) || 12;
  const vali = Number(d.vali) || 0;
  const mitta = luoKangas(1, 1).getContext('2d');
  const kirjasin = `${asu.tyyli === 'italic' ? 'italic ' : ''}${d.tyylitys === 'small-caps' ? 'small-caps ' : ''}${koko * dpr}px ${asu.kirjasin}`;
  mitta.font = kirjasin;
  const merkit = [...String(d.teksti ?? '')];
  const leveydet = merkit.map((m) => mitta.measureText(m).width);
  const tekstiLeveys = leveydet.reduce((s, w) => s + w, 0) + vali * dpr * Math.max(0, merkit.length - 1);
  const pehmuste = (NIMEN_PEHMUSTE_PX + (asu.haloLeveys || 0)) * dpr;
  const w = Math.max(1, Math.ceil(tekstiLeveys + 2 * pehmuste));
  const h = Math.max(1, Math.ceil(koko * dpr * 1.4 + 2 * pehmuste));
  const kangas = luoKangas(w, h);
  const ctx = kangas.getContext('2d');
  ctx.font = kirjasin;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.lineJoin = 'round';
  const ank = d.ank === 'middle' ? 0.5 : (d.ank === 'end' ? 1 : 0);
  const alku = pehmuste;
  const y = h / 2;
  const piirra = (fn) => {
    let x = alku;
    merkit.forEach((m, i) => { fn(m, x, y); x += leveydet[i] + vali * dpr; });
  };
  if (asu.halo && asu.haloLeveys > 0) {
    ctx.strokeStyle = asu.halo;
    ctx.lineWidth = asu.haloLeveys * dpr;
    piirra((m, x, yy) => ctx.strokeText(m, x, yy));
  }
  ctx.fillStyle = asu.muste;
  piirra((m, x, yy) => ctx.fillText(m, x, yy));
  return {
    kuva: kangas, w, h,
    ankkuriX: alku + tekstiLeveys * ank,
    ankkuriY: y,
    skaala: 1 / dpr,
    katto: null,
  };
}

/** Kaupunkipisteen kiekko: säde CSS-pikseleinä, väri, halkaisijan mukainen rasteri. */
export function rasteroiPiste({ sadePx, vari, reuna = null }, dpr, luoKangas = (w, h) => {
  const k = document.createElement('canvas');
  k.width = w;
  k.height = h;
  return k;
}) {
  const r = Math.max(0.5, sadePx) * dpr;
  const koko = Math.ceil(2 * (r + PISTEEN_PEHMUSTE_PX * dpr));
  const kangas = luoKangas(koko, koko);
  const ctx = kangas.getContext('2d');
  ctx.beginPath();
  ctx.arc(koko / 2, koko / 2, r, 0, Math.PI * 2);
  ctx.fillStyle = vari;
  ctx.fill();
  if (reuna) {
    ctx.strokeStyle = reuna;
    ctx.lineWidth = Math.max(1, dpr);
    ctx.stroke();
  }
  return { kuva: kangas, w: koko, h: koko, ankkuriX: koko / 2, ankkuriY: koko / 2, skaala: 1 / dpr, katto: null };
}

/*
 * ======== KOHDEMERKKI GL-KERROKSEEN (A, 22.9.2026) =================
 *
 * Omistajan tuntumatesti v2106: *"tekstit ja pisteet pysyvät
 * paikoillaan PAITSI kohdekaupunkien pallot liikkuvat vielä"*. Syy on
 * rakenteellinen: nimet, nostot ja nappula ovat GL-kerroksessa (samassa
 * kankaassa kuin kartta), mutta KOHTEET olivat yhä CSS2D:nä. DOM-kerros
 * ja kangas sommitellaan laitteella erikseen, joten DOM-merkki ehtii
 * ruudulle kehyksen kankaan jäljessä ja laahaa panoroidessa. Ennuste
 * (pallo.js E4b) kompensoi sitä, mutta se on oletuksena pois, koska se
 * sai nimiöt heilumaan; kun merkki piirretään SAMAAN kankaaseen kuin
 * kartta, se ei voi laahata rakenteellisesti.
 *
 * KOLME OSAA, KUTEN CSS2D:SSÄ (merkit.js kohdeElementti): halokehä
 * (hengittää), kultalevy katkoviivarenkaineen ja nimi. Asu luetaan
 * CSS:stä samalla koettimella kuin nimen asu (.target-halo.fokus,
 * .target-piste, .target-nimi), jottei värejä ja viivoja kirjoiteta
 * kahteen paikkaan.
 *
 * ANIMOITUJA ARVOJA EI LUETA KOETTIMESTA. getComputedStyle antaa
 * animoituvalle elementille sen HETKEN arvon, joten halon peitto ja
 * skaala tulevat merkit.js:n vakioista (KOHDEMERKIN_HALO_*), eivät
 * koettimesta. Vain värit ja viivanleveydet luetaan.
 *
 * NON-SCALING-STROKE: CSS:ssä halon viiva pysyy 3,4 px:nä skaalauksesta
 * riippumatta. GL-kerroksessa syke skaalaa koko spriten, joten viiva
 * hengittää mukana ±7 %. Ero on silmälle olematon ja se on hinta siitä,
 * että hengitys tulee valmiista uniformista eikä uudesta rasterista
 * joka kehys.
 */

/** Kohdemerkin rasterin pehmuste (px): halon viiva ja sykkeen varaa. */
export const KOHTEEN_PEHMUSTE_PX = 4;

/**
 * Kohdemerkin asu CSS:stä. `far` = askelpiste ilman kaupunkia
 * (.target-halo.fokus.far, .target-piste.far). Vara-arvot ovat samat
 * kuin css/styles.css:ssä.
 */
export function lueKohteenAsu(kotelo, doc = globalThis.document, far = false) {
  const vara = {
    haloVari: 'rgba(234, 184, 78, 1)',
    haloLeveys: far ? 2.4 : 3.4,
    levy: far ? 'rgba(246, 210, 122, 0.55)' : 'rgba(246, 210, 122, 0.72)',
    viiva: 'rgba(150, 62, 48, 0.95)',
    viivaLeveys: far ? 2.2 : 3,
    katko: far ? [4, 3] : [6, 4],
  };
  if (!doc?.createElementNS || !kotelo?.appendChild) return vara;
  try {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = doc.createElementNS(NS, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none';
    const keha = doc.createElementNS(NS, 'circle');
    keha.setAttribute('class', far ? 'target-halo fokus far' : 'target-halo fokus');
    const levy = doc.createElementNS(NS, 'circle');
    levy.setAttribute('class', far ? 'target-piste far' : 'target-piste');
    svg.append(keha, levy);
    kotelo.appendChild(svg);
    const ck = getComputedStyle(keha);
    const cl = getComputedStyle(levy);
    const katko = (cl.strokeDasharray || '').split(/[\s,]+/).map((n) => parseFloat(n)).filter((n) => n > 0);
    const ulos = {
      // Peitto ja skaala EIVÄT tule tästä: ne ovat animoituja (ks. yllä).
      haloVari: ck.stroke && ck.stroke !== 'none' ? ck.stroke : vara.haloVari,
      haloLeveys: parseFloat(ck.strokeWidth) || vara.haloLeveys,
      levy: cl.fill && cl.fill !== 'none' ? cl.fill : vara.levy,
      viiva: cl.stroke && cl.stroke !== 'none' ? cl.stroke : vara.viiva,
      viivaLeveys: parseFloat(cl.strokeWidth) || vara.viivaLeveys,
      katko: katko.length ? katko : vara.katko,
    };
    svg.remove();
    return ulos;
  } catch {
    return vara;
  }
}

/** Kohteen nimen asu CSS:stä (.target-nimi) — sama koetin kuin lueNimenAsu. */
export function lueKohteenNimenAsu(kotelo, doc = globalThis.document) {
  const vara = {
    kirjasin: '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
    muste: 'rgba(60, 48, 38, 1)', halo: 'rgba(247, 237, 216, 0.92)', haloLeveys: 3, tyyli: 'normal',
  };
  if (!doc?.createElementNS || !kotelo?.appendChild) return vara;
  try {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = doc.createElementNS(NS, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none';
    const teksti = doc.createElementNS(NS, 'text');
    teksti.setAttribute('class', 'target-nimi');
    teksti.textContent = 'x';
    svg.appendChild(teksti);
    kotelo.appendChild(svg);
    const cs = getComputedStyle(teksti);
    const stroke = cs.stroke && cs.stroke !== 'none' ? cs.stroke : null;
    const ulos = {
      kirjasin: cs.fontFamily || vara.kirjasin,
      muste: cs.fill || vara.muste,
      halo: stroke,
      haloLeveys: stroke ? parseFloat(cs.strokeWidth) || 0 : 0,
      tyyli: cs.fontStyle || 'normal',
    };
    svg.remove();
    return ulos;
  } catch {
    return vara;
  }
}

/** Yhteinen kangas ympyrälle: säde CSS-px, pehmuste viivalle. */
const kohteenKangas = (sadePx, viiva, dpr, luoKangas) => {
  const r = Math.max(0.5, sadePx) * dpr;
  const koko = Math.ceil(2 * (r + viiva * dpr + KOHTEEN_PEHMUSTE_PX * dpr));
  return { r, koko, kangas: luoKangas(koko, koko) };
};

/**
 * Halokehä KESKIASTEESEEN piirrettynä (KOHDEMERKIN_HALO_KESKI): rungon
 * syke-uniform heiluttaa sitä kapeamman ja laajemman välillä ja peitto
 * hengittää vastavaiheessa (glnimiot-sovitin.js).
 */
export function rasteroiKohdeHalo({ sadePx, asu, keskiaste = 1.28 }, dpr, luoKangas = (w, h) => {
  const k = document.createElement('canvas');
  k.width = w;
  k.height = h;
  return k;
}) {
  const { r, koko, kangas } = kohteenKangas(sadePx * keskiaste, asu.haloLeveys, dpr, luoKangas);
  const ctx = kangas.getContext('2d');
  ctx.beginPath();
  ctx.arc(koko / 2, koko / 2, r, 0, Math.PI * 2);
  ctx.strokeStyle = asu.haloVari;
  ctx.lineWidth = Math.max(1, asu.haloLeveys * dpr);
  ctx.stroke();
  return { kuva: kangas, w: koko, h: koko, ankkuriX: koko / 2, ankkuriY: koko / 2, skaala: 1 / dpr, katto: null };
}

/*
 * LEVY JA NIMI SAMAAN RASTERIIN, EI SIIRTOA. Rungon verteksivarjostin
 * kertoo siirron kuoren kertoimella (`siirto * kerroin`), joten
 * ruutuvakiona pysyvää nimen etäisyyttä ei voi antaa siirtona: nimi
 * liikkuisi zoomissa. Siksi levy ja nimi piirretään SAMAAN kankaaseen
 * kuten CSS2D:n svg:ssä (merkit.js kohdeElementti), ja molemmat
 * spritet istuvat maapisteessä ilman siirtoa. Halo on oma spritensä,
 * koska vain se hengittää.
 */

/** Kultalevy, punamullan katkoviiva ja (kaupungilla) nimi sen yläpuolella. */
export function rasteroiKohdeMerkki({
  sadePx, asu, nimi = '', nimenAsu = null, nimenKoko = 13, nimenSade = 0, nimenRako = 8,
}, dpr, luoKangas = (w, h) => {
  const k = document.createElement('canvas');
  k.width = w;
  k.height = h;
  return k;
}) {
  const r = Math.max(0.5, sadePx) * dpr;
  const pehmuste = (asu.viivaLeveys + KOHTEEN_PEHMUSTE_PX) * dpr;
  const mitta = luoKangas(1, 1).getContext('2d');
  const kirjasin = nimi && nimenAsu
    ? `${nimenAsu.tyyli === 'italic' ? 'italic ' : ''}${nimenKoko * dpr}px ${nimenAsu.kirjasin}`
    : '';
  let nimenLeveys = 0;
  if (kirjasin) { mitta.font = kirjasin; nimenLeveys = mitta.measureText(nimi).width; }
  const nimenHalo = (nimenAsu?.haloLeveys || 0) * dpr;
  // Nimen keskilinja merkin keskipisteen YLÄPUOLELLA (CSS: y = -(nimenSade + rako),
  // alphabetic-peruslinja; keskilinja on siitä ~0,32 em ylempänä).
  const nimenY = nimi ? (nimenSade + nimenRako) * dpr + 0.32 * nimenKoko * dpr : 0;
  const ylos = Math.max(r + pehmuste, nimenY + nimenKoko * dpr * 0.7 + nimenHalo);
  const alas = r + pehmuste;
  const leveys = Math.max(2 * (r + pehmuste), nimenLeveys + 2 * nimenHalo + 2 * dpr);
  const w = Math.max(1, Math.ceil(leveys));
  const h = Math.max(1, Math.ceil(ylos + alas));
  const kangas = luoKangas(w, h);
  const ctx = kangas.getContext('2d');
  const kx = w / 2;
  const ky = ylos; // merkin keskipiste kankaalla
  ctx.beginPath();
  ctx.arc(kx, ky, r, 0, Math.PI * 2);
  ctx.fillStyle = asu.levy;
  ctx.fill();
  ctx.strokeStyle = asu.viiva;
  ctx.lineWidth = Math.max(1, asu.viivaLeveys * dpr);
  if (ctx.setLineDash) ctx.setLineDash(asu.katko.map((n) => n * dpr));
  ctx.stroke();
  if (ctx.setLineDash) ctx.setLineDash([]);
  if (kirjasin) {
    ctx.font = kirjasin;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    if (nimenAsu.halo && nimenHalo > 0) {
      ctx.strokeStyle = nimenAsu.halo;
      ctx.lineWidth = nimenHalo;
      ctx.strokeText(nimi, kx, ky - nimenY);
    }
    ctx.fillStyle = nimenAsu.muste;
    ctx.fillText(nimi, kx, ky - nimenY);
  }
  return { kuva: kangas, w, h, ankkuriX: kx, ankkuriY: ky, skaala: 1 / dpr, katto: null };
}

/** Tyylit, jotka nappulan svg:stä kopioidaan inline ennen sarjallistusta. */
const NAPPULAN_TYYLIT = [
  'fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-linejoin',
  'stroke-linecap', 'stroke-dasharray', 'opacity',
];

/**
 * PELINAPPULA RASTERIKSI (GL vaihe 4). Sama svg kuin CSS2D-merkillä
 * (js/pallolauta/merkit.js nappulaElementti → js/ui.js pawnShape):
 * elementti tuodaan hetkeksi koteloon, jotta tyylitiedoston säännöt
 * (.pawn-shadow, .pawn-active-ring, liukuvärit) voidaan kopioida
 * inline-tyyleiksi, sarjallistetaan ja piirretään kankaalle
 * laitepikseleinä. Ankkuri on alareunan keskipiste — CSS2D:n
 * `translate(-50%, -100%)` — eli jalka on pisteessä. Katto { a: 1e6,
 * b: 1 } pitää koon kuoren kertoimesta riippumatta (nappula ei skaalaudu
 * zoomin mukana). `lataa` annetaan testeille.
 */
export async function rasteroiNappula(ui, {
  kotelo, dpr = 1, doc = globalThis.document, luokka = 'pallolauta-nappula', aktiivinen = true,
  luoKangas = (w, h) => { const k = doc.createElement('canvas'); k.width = w; k.height = h; return k; },
  lataa = null,
} = {}) {
  const el = nappulaElementti(ui, luokka, aktiivinen);
  const svg = el.querySelector('svg');
  if (!svg) return null;
  const leveys = Number(svg.getAttribute('width')) || 32;
  const korkeus = Number(svg.getAttribute('height')) || 36;
  // Vain ruudun ulkopuolelle: visibility/opacity periytyisivät laskettuihin tyyleihin.
  el.style.cssText = 'position:absolute;left:-9999px;top:0;pointer-events:none';
  kotelo?.appendChild?.(el);
  try {
    if (globalThis.getComputedStyle && el.isConnected) {
      /*
       * MAALIT (url(#id)) TULEVAT SVG:N MUKAAN. Puisen nappulan täyte on
       * liukuväri `#nappula-puu`, joka on määritelty tasokartan
       * nappulakerroksessa (js/ui.js puuliuku), ei tässä svg:ssä. Data-
       * osoitteeksi sarjallistettu svg ei näe dokumentin defs-osaa:
       * Chromium piirsi css:n varavärin (`fill: url(#…) #c49a63`), WebKit
       * MUSTAA (Laitetestaaja iPad v2018). Viitattu elementti kloonataan
       * svg:n omaan <defs>-osaan ja arvoon jätetään varaväri.
       */
      let defs = null;
      const tuoMaali = (arvo) => {
        const m = /url\(["']?#([^"')]+)["']?\)/.exec(arvo ?? '');
        if (!m) return;
        const lahde = doc.getElementById(m[1]);
        if (!lahde || svg.querySelector(`#${CSS.escape(m[1])}`)) return;
        defs ??= svg.insertBefore(doc.createElementNS('http://www.w3.org/2000/svg', 'defs'), svg.firstChild);
        defs.appendChild(lahde.cloneNode(true));
      };
      for (const osa of [svg, ...svg.querySelectorAll('*')]) {
        const cs = getComputedStyle(osa);
        for (const nimi of NAPPULAN_TYYLIT) {
          const arvo = cs.getPropertyValue(nimi);
          if (!arvo) continue;
          if (nimi === 'fill' || nimi === 'stroke') tuoMaali(arvo);
          osa.style.setProperty(nimi, arvo);
        }
      }
    }
  } finally {
    el.remove();
  }
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', String(leveys * dpr));
  svg.setAttribute('height', String(korkeus * dpr));
  const xml = new XMLSerializer().serializeToString(svg);
  const osoite = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
  const kuva = await (lataa ?? ((o) => lataaKuva(o, doc)))(osoite);
  const w = Math.ceil(leveys * dpr);
  const h = Math.ceil(korkeus * dpr);
  const kangas = luoKangas(w, h);
  kangas.getContext('2d').drawImage(kuva, 0, 0, w, h);
  return { kuva: kangas, w, h, ankkuriX: w / 2, ankkuriY: h, skaala: 1 / dpr, katto: { a: 1e6, b: 1 } };
}

/**
 * Noston reseptit (ikoni ja nimiö erikseen) datumista — sama kaava kuin
 * js/pallolauta/nostot.js asetteleNosto → piirraNostosymKartalle
 * (nostosymReseptit: tunnus, lyhennys ja kylki samasta funktiosta).
 */
export function nostonReseptit(d) {
  const taso1 = d.taso === 1 && !d.poltettu;
  // Kuvamerkki: ykköstaso aina, muut lähizoomissa (nostot.js TYYPPIMERKIT LÄHIZOOMISSA).
  const kuvamerkki = !d.poltettu ? (d.kuvamerkki ?? null) : null;
  return nostosymReseptit(d.kategoria, d.nimi ?? '', d.symLaji, d.puoli ?? 'oikea', {
    kuvamerkki, ruutuKerroin: ruudunKerroin(d), tumma: taso1,
  });
}

/** Katon muuttujat nostolle: a = raaka/katettu, b = katto/katettu (nimet.js asetaKuorenKatto). */
export function nostonKatto(d, katto) {
  const mitta = d.mitta;
  if (!(mitta > 0) || !(katto > 0) || !Number.isFinite(katto)) return null;
  const raaka = d.mittaRaaka > 0 ? d.mittaRaaka : mitta;
  return { a: raaka / mitta, b: katto / mitta };
}

/**
 * Rasterilähde: `hae(d)` → lista spriteistä { osa, avain, valmis, kuva… }
 * (nimi: yksi; nosto: ikoni + nimiö; piste: yksi). `tilaaRasterit(fn)` →
 * fn(avain) kun rasteri valmistuu. `kuorenKerroin()` lukee kotelon
 * `--nimiokerroin`-muuttujan (E2, sama lähde kuin CSS).
 */
export function luoRasterilahde({
  // Katto luetaan joka haulla: se nousee lähizoomissa (nostosymAsetaNimionKatto); testit antavat vakion.
  kotelo, dpr = globalThis.devicePixelRatio || 1, doc = globalThis.document, katto = null,
  luoKangas = null, bitmap = typeof createImageBitmap === 'function',
  /** UI pelinappulan rasteria varten (js/ui.js pawnShape); ilman sitä nappula jää CSS2D:hen. */
  ui = null,
  /**
   * RASTEROINNIT JONOON LIIKKEESSÄ (sulavuus 22.9.2026, ablaatiotikas):
   * kun `liikkeessa()` on tosi, uusia rastereita aloitetaan enintään
   * yksi kehystä kohti (rAF), loput odottavat jonossa; levossa kaikki
   * heti. Rasterin teko (svg → kuva → ImageBitmap) osui liikkeessä
   * samaan kehykseen ladonnan ja laattapyyntöjen kanssa.
   */
  liikkeessa = () => false,
  ajasta = (f) => (globalThis.requestAnimationFrame ? globalThis.requestAnimationFrame(f) : setTimeout(f, 16)),
} = {}) {
  const jono = []; // odottavat rasterityöt liikkeen aikana
  let jonoAjastettu = false;
  const puraJonoa = () => {
    jonoAjastettu = false;
    if (!jono.length) return;
    const nyt = liikkeessa() ? 1 : jono.length;
    for (let i = 0; i < nyt && jono.length; i += 1) jono.shift()();
    if (jono.length) { jonoAjastettu = true; ajasta(puraJonoa); }
  };
  const kaynnista = (tyo) => {
    if (!liikkeessa()) { tyo(); return; }
    jono.push(tyo);
    if (!jonoAjastettu) { jonoAjastettu = true; ajasta(puraJonoa); }
  };
  const valmiit = new Map(); // avain → sprite
  const kesken = new Map(); // avain → Promise
  const tilaajat = new Set();
  let asu = null;
  let fontitValmiit = Boolean(doc?.fonts?.status === 'loaded') || !doc?.fonts;
  if (!fontitValmiit) doc.fonts.ready.then(() => { fontitValmiit = true; }).catch(() => { fontitValmiit = true; });

  const ilmoita = (avain) => { for (const f of tilaajat) { try { f(avain); } catch { /* tilaaja ei kaada */ } } };
  const talleta = (avain, sprite) => {
    valmiit.set(avain, sprite);
    if (valmiit.size > NIMIORASTERIEN_KATTO) {
      const vanhin = valmiit.keys().next().value;
      const s = valmiit.get(vanhin);
      valmiit.delete(vanhin);
      s?.kuva?.close?.();
    }
    ilmoita(avain);
  };
  const bitmapiksi = async (kangasTaiKuva) => {
    if (!bitmap) return kangasTaiKuva;
    try { return await createImageBitmap(kangasTaiKuva, { premultiplyAlpha: 'none' }); } catch { return kangasTaiKuva; }
  };
  const tuotanto = (avain, tee) => {
    const oleva = valmiit.get(avain);
    if (oleva) { valmiit.delete(avain); valmiit.set(avain, oleva); return { ...oleva, avain, valmis: true }; }
    if (!kesken.has(avain)) {
      const lupaus = new Promise((valmis) => {
        kaynnista(() => {
          (async () => {
            const s = await tee();
            s.kuva = await bitmapiksi(s.kuva);
            talleta(avain, s);
          })().catch(() => {}).finally(() => { kesken.delete(avain); valmis(); });
        });
      });
      kesken.set(avain, lupaus);
    }
    return { avain, valmis: false };
  };

  const haeNimi = (d) => {
    const avain = nimenAvain(d, dpr);
    if (!fontitValmiit) return { osa: 'nimi', avain, valmis: false };
    return { osa: 'nimi', ...tuotanto(avain, async () => {
      asu ??= lueNimenAsu(kotelo, doc);
      return rasteroiNimi(d, asu, dpr, luoKangas ?? undefined);
    }) };
  };
  /*
   * MITTA JA KATTO OVAT DATUMIN, EIVÄT RASTERIN (omistajan löydös
   * 21.9.2026 v2021 iPhone: Camarguessa nimiöt eri kokoisia ja koko
   * vaihtui pelkästään panoroidessa). Rasterin avain on resepti +
   * porras, joten sama kuva palvelee kaikkia saman kategorian ikoneja
   * ja samaa nostoa joka zoomilla. Kun `skaala` ja `katto` tallettuivat
   * välimuistiin ENSIMMÄISEN datumin mitasta, jokainen myöhempi
   * lukija (toinen nosto, toinen zoomi) sai ruudulle sen vanhan koon:
   * saapumiszoomilla tehty rasteri piirtyi pienenä syvälläkin, ja
   * panoroinnissa ruutuun tullut uusi nosto sai tuoreen, isomman
   * mitan. Nyt kuva on välimuistissa, mutta koko luetaan joka haulla
   * datumista — sama nosto, sama zoomi → sama koko, ladonnasta
   * riippumatta.
   */
  const haeNostonOsa = (d, osa, resepti) => {
    const porras = nostosymPorrasNyt();
    const avain = `nosto|${nostosymRasterinAvain(resepti, porras)}|${dpr}`;
    return {
      osa,
      ...tuotanto(avain, async () => {
        const { valmis } = nostosymRasteri(resepti, kotelo, porras);
        const r = await valmis;
        const kuva = await lataaKuva(r.osoite, doc);
        return {
          kuva, w: kuva.width ?? kuva.naturalWidth, h: kuva.height ?? kuva.naturalHeight,
          ankkuriX: r.origoX * porras, ankkuriY: r.origoY * porras,
        };
      }),
      // Kirjaston yksikkö → CSS px: mitta (scale) / porras (px per yksikkö).
      skaala: (d.mitta > 0 ? d.mitta : 1) / porras,
      katto: nostonKatto(d, katto ?? nostosymMitanKatto()),
      porras,
    };
  };
  const haeNosto = (d) => {
    const { ikoni, nimio } = nostonReseptit(d);
    const ulos = [haeNostonOsa(d, 'ikoni', ikoni)];
    if (nimio) ulos.push(haeNostonOsa(d, 'nimio', nimio));
    return ulos;
  };
  /** Nappula: avain pelaajan väristä ja tilasta; ui annetaan lähteelle. */
  const haeNappula = (d) => {
    const pelaaja = ui?.game?.player;
    const aktiivinen = d?.aktiivinen !== false;
    const avain = `nappula|${pelaaja?.color ?? ''}|${aktiivinen ? 1 : 0}|${dpr}`;
    if (!ui) return { osa: 'nappula', avain, valmis: false };
    return { osa: 'nappula', ...tuotanto(avain, () => rasteroiNappula(ui, { kotelo, dpr, doc, aktiivinen, luoKangas: luoKangas ?? undefined })) };
  };
  const haePiste = (d) => {
    const avain = `piste|${Number(d.sadePx).toFixed(2)}|${d.vari}|${d.reuna ?? ''}|${dpr}`;
    return { osa: 'piste', ...tuotanto(avain, async () => rasteroiPiste(d, dpr, luoKangas ?? undefined)) };
  };
  /*
   * KOHDEMERKKI: halo, levy ja nimi (ks. KOHDEMERKKI GL-KERROKSEEN).
   * Asut luetaan kerran per far-laji ja pidetään muistissa — koetin
   * koskee DOMia, eikä sitä haluta joka merkille.
   */
  const kohteenAsut = new Map();
  const kohteenAsu = (far) => {
    const avain = far ? 'far' : 'lahi';
    let asu = kohteenAsut.get(avain);
    if (!asu) { asu = lueKohteenAsu(kotelo, doc, far); kohteenAsut.set(avain, asu); }
    return asu;
  };
  let kohteenNimenAsu = null;
  const haeKohteenOsa = (d, osa) => {
    const far = !d.city;
    const sadePx = (far ? KOHDEMERKIN_PISTE_PX : KOHDEMERKIN_PX) / 2;
    const asu = kohteenAsu(far);
    if (osa === 'halo') {
      const avain = `kohdehalo|${far ? 1 : 0}|${sadePx.toFixed(2)}|${dpr}`;
      return { osa, ...tuotanto(avain, async () => rasteroiKohdeHalo(
        { sadePx, asu, keskiaste: KOHDEMERKIN_HALO_KESKI }, dpr, luoKangas ?? undefined,
      )) };
    }
    // Merkki = levy + nimi samassa rasterissa. Nimi vaatii fontit.
    const nimi = d.city?.name ?? '';
    const avain = `kohdemerkki|${far ? 1 : 0}|${sadePx.toFixed(2)}|${nimi}|${dpr}`;
    if (nimi && !fontitValmiit) return { osa, avain, valmis: false };
    if (nimi && !kohteenNimenAsu) kohteenNimenAsu = lueKohteenNimenAsu(kotelo, doc);
    return { osa, ...tuotanto(avain, async () => rasteroiKohdeMerkki({
      sadePx,
      asu,
      nimi,
      nimenAsu: nimi ? kohteenNimenAsu : null,
      nimenKoko: KOHDEMERKIN_NIMI_PX,
      nimenSade: sadePx * KOHDEMERKIN_HALO_LAAJIN,
      nimenRako: KOHDEMERKIN_NIMI_RAKO_PX,
    }, dpr, luoKangas ?? undefined)) };
  };
  /** Kohteen spritet: hengittävä halo ja merkki (levy + nimi). */
  const haeKohde = (d) => [haeKohteenOsa(d, 'halo'), haeKohteenOsa(d, 'merkki')];

  return {
    /** Datumin spritet: laji datumista (nimi: teksti; nosto: kategoria; piste: sadePx). */
    hae: (d) => {
      if (d.laji === 'nimi' || d.teksti) return [haeNimi(d)];
      if (d.laji === 'nappula') return [haeNappula(d)];
      if (d.laji === 'piste' || d.sadePx) return [haePiste(d)];
      if (d.laji === 'kohde') return haeKohde(d);
      return haeNosto(d);
    },
    haeNimi: (d) => [haeNimi(d)],
    haeNappula: (d) => [haeNappula(d)],
    haeNosto,
    haePiste: (d) => [haePiste(d)],
    haeKohde,
    tilaaRasterit: (f) => { tilaajat.add(f); return () => tilaajat.delete(f); },
    /** Kuoren kerroin (E2): kotelon --nimiokerroin, halpa luku. */
    kuorenKerroin: () => {
      const v = parseFloat(kotelo?.style?.getPropertyValue?.('--nimiokerroin'));
      return v > 0 ? v : 1;
    },
    /** Välimuistin tila (mittarit). */
    tila: () => ({ valmiita: valmiit.size, kesken: kesken.size, jonossa: jono.length, fontitValmiit }),
    pura: () => {
      for (const s of valmiit.values()) s.kuva?.close?.();
      valmiit.clear();
      kesken.clear();
      tilaajat.clear();
    },
  };
}

/** Blob-URL kuvaksi (nostot); ImageBitmap tehdään kutsujassa. */
function lataaKuva(osoite, doc) {
  return new Promise((ok, ei) => {
    const kuva = new (doc?.defaultView?.Image ?? globalThis.Image)();
    kuva.decoding = 'async';
    kuva.onload = () => ok(kuva);
    kuva.onerror = () => ei(new Error(`rasteri ei latautunut: ${osoite}`));
    kuva.src = osoite;
  });
}
