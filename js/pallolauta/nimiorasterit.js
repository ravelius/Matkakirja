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
import { nappulaElementti } from './merkit.js';

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
      for (const osa of [svg, ...svg.querySelectorAll('*')]) {
        const cs = getComputedStyle(osa);
        for (const nimi of NAPPULAN_TYYLIT) {
          const arvo = cs.getPropertyValue(nimi);
          if (arvo) osa.style.setProperty(nimi, arvo);
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
  const kuvamerkki = taso1 ? (d.kuvamerkki ?? null) : null;
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
  kotelo, dpr = globalThis.devicePixelRatio || 1, doc = globalThis.document, katto = nostosymMitanKatto(),
  luoKangas = null, bitmap = typeof createImageBitmap === 'function',
  /** UI pelinappulan rasteria varten (js/ui.js pawnShape); ilman sitä nappula jää CSS2D:hen. */
  ui = null,
} = {}) {
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
      const lupaus = (async () => {
        const s = await tee();
        s.kuva = await bitmapiksi(s.kuva);
        talleta(avain, s);
        kesken.delete(avain);
      })().catch(() => { kesken.delete(avain); });
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
  const haeNostonOsa = (d, osa, resepti) => {
    const porras = nostosymPorrasNyt();
    const avain = `nosto|${nostosymRasterinAvain(resepti, porras)}|${dpr}`;
    const katot = nostonKatto(d, katto);
    return {
      osa,
      ...tuotanto(avain, async () => {
        const { valmis } = nostosymRasteri(resepti, kotelo, porras);
        const r = await valmis;
        const kuva = await lataaKuva(r.osoite, doc);
        return {
          kuva, w: kuva.width ?? kuva.naturalWidth, h: kuva.height ?? kuva.naturalHeight,
          ankkuriX: r.origoX * porras, ankkuriY: r.origoY * porras,
          // Kirjaston yksikkö → CSS px: mitta (scale) / porras (px per yksikkö).
          skaala: (d.mitta > 0 ? d.mitta : 1) / porras,
          katto: katot,
        };
      }),
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

  return {
    /** Datumin spritet: laji datumista (nimi: teksti; nosto: kategoria; piste: sadePx). */
    hae: (d) => {
      if (d.laji === 'nimi' || d.teksti) return [haeNimi(d)];
      if (d.laji === 'nappula') return [haeNappula(d)];
      if (d.laji === 'piste' || d.sadePx) return [haePiste(d)];
      return haeNosto(d);
    },
    haeNimi: (d) => [haeNimi(d)],
    haeNappula: (d) => [haeNappula(d)],
    haeNosto,
    haePiste: (d) => [haePiste(d)],
    tilaaRasterit: (f) => { tilaajat.add(f); return () => tilaajat.delete(f); },
    /** Kuoren kerroin (E2): kotelon --nimiokerroin, halpa luku. */
    kuorenKerroin: () => {
      const v = parseFloat(kotelo?.style?.getPropertyValue?.('--nimiokerroin'));
      return v > 0 ? v : 1;
    },
    /** Välimuistin tila (mittarit). */
    tila: () => ({ valmiita: valmiit.size, kesken: kesken.size, fontitValmiit }),
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
