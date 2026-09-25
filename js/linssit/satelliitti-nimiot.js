/**
 * ASTRONAUTIN KAMERAN NIMIÖT EIVÄT MENE PÄÄLLEKKÄIN (omistaja 19.9.2026,
 * iPhone-kuva Egyptin yllä: "Niilin suisto", "Suezin kanava", "Kairo
 * yöllä" ja "Faiyumin keidas" limittäin; Fablen erä E).
 *
 * MITATTU (WebKit 390 × 844 dpr 3, tools/savukkeet/savuke-astro-pallo.mjs
 * väite 46, raportti docs/raportit/viesti-fable-astro-nimiot-20260919.md):
 * lähimmällä sallitulla korkeudella (ZOOMIN_LAHIN 0,084) Niilin suiston ja
 * Suezin kanavan nimiöt leikkasivat 21 %, vanhan katon korkeudella 35 %.
 *
 * KEVYT PURKU, SAMA PERIAATE KUIN PELILAUDAN NIMIÖLADONNASSA
 * (js/nostoladonta.js 'v11-limitys'): nimiö kokeilee kylkiä järjestyksessä
 * ala → ylä → oikea → vasen ja ottaa ensimmäisen, joka ei osu jo
 * ladottuun nimiöön eikä toisen pisteen ytimeen. Jos mikään kylki ei ole
 * vapaa, nimiö piiloutuu, kunnes pelaaja zoomaa lähemmäs ja tilaa on.
 * Pisteet pysyvät aina ruudulla — vain teksti väistää.
 *
 * VAKAUS: edellinen kylki kokeillaan ensin, jottei nimiö hypi kyljeltä
 * toiselle joka kehyksellä pallon pyöriessä. Järjestys on merkkien oma
 * (aineiston järjestys), joten sama näkymä antaa aina saman ladonnan.
 *
 * Puhdas ladonta (ladoNimiot) on DOM-iton ja testattu
 * (tests/satelliitti-nimiot.test.mjs); luoNimiolimitys lukee ruudun ja
 * kirjoittaa kyljen `data-kylki`-attribuuttiin (css/satelliitti.css).
 */

/** Nimiön etäisyys pisteen keskeltä (px) — sama kuin CSS:n `top: 11px`. */
export const NIMION_VALI = 11;
/** Kokeilujärjestys. Ala on oletus (CSS ilman attribuuttia). */
export const KYLJET = ['ala', 'yla', 'oikea', 'vasen'];
/** Piiloon jäänyt nimiö. */
export const PIILO = 'piilo';
/** Laatikoiden väliin jätettävä rako (px). */
export const NIMIOIDEN_RAKO = 2;
/** Pisteen ytimen este-ala (px, sivu): nimiö ei peitä toista pistettä. */
export const YTIMEN_ESTE = 6;
/** Ladonnan väli (ms): pallo liikkuu, mutta ruutua ei mitata joka kehys. */
export const LADONNAN_VALI_MS = 120;

/** Nimiön laatikko kyljellä `kylki` pisteen keskipisteestä. */
export function nimionLaatikko({ x, y, w, h }, kylki) {
  const v = NIMION_VALI;
  switch (kylki) {
    case 'yla': return { x: x - w / 2, y: y - v - h, w, h };
    case 'oikea': return { x: x + v, y: y - h / 2, w, h };
    case 'vasen': return { x: x - v - w, y: y - h / 2, w, h };
    default: return { x: x - w / 2, y: y + v, w, h };
  }
}

/** Leikkaavatko laatikot (rako mukaan)? */
export function leikkaa(a, b, rako = 0) {
  return a.x < b.x + b.w + rako && b.x < a.x + a.w + rako
    && a.y < b.y + b.h + rako && b.y < a.y + a.h + rako;
}

/** Leikkauksen osuus pienemmän laatikon alasta (0…1). */
export function leikkausOsuus(a, b) {
  const ix = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const iy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const pienempi = Math.min(a.w * a.h, b.w * b.h);
  return pienempi > 0 ? (ix * iy) / pienempi : 0;
}

/**
 * Ladonta. `kohteet` järjestyksessä (ensimmäinen saa valita ensin):
 * { id, x, y, w, h } — piste (x, y) ja nimiön koko (w, h).
 *
 * @param {Array<{id: string, x: number, y: number, w: number, h: number}>} kohteet
 * @param {{ edelliset?: Map<string, string>, rako?: number }} [asetukset]
 * @returns {Map<string, string>} id → kylki tai PIILO
 */
export function ladoNimiot(kohteet, { edelliset = new Map(), rako = NIMIOIDEN_RAKO } = {}) {
  const tulos = new Map();
  const ladotut = [];
  const ytimet = kohteet.map((k) => ({
    id: k.id,
    x: k.x - YTIMEN_ESTE / 2,
    y: k.y - YTIMEN_ESTE / 2,
    w: YTIMEN_ESTE,
    h: YTIMEN_ESTE,
  }));
  for (const k of kohteet) {
    const aiempi = edelliset.get(k.id);
    const jarjestys = KYLJET.includes(aiempi) ? [aiempi, ...KYLJET.filter((x) => x !== aiempi)] : KYLJET;
    let valittu = PIILO;
    for (const kylki of jarjestys) {
      const laatikko = nimionLaatikko(k, kylki);
      if (ladotut.some((l) => leikkaa(laatikko, l, rako))) continue;
      if (ytimet.some((y) => y.id !== k.id && leikkaa(laatikko, y))) continue;
      valittu = kylki;
      ladotut.push(laatikko);
      break;
    }
    tulos.set(k.id, valittu);
  }
  return tulos;
}

/**
 * Ruudun ladonta Astronautin kameralle. `paivita(nyt)` on kevyt ja
 * kutsutaan kehyssilmukasta: se mittaa vain LADONNAN_VALI_MS:n välein ja
 * vain kun nimet ovat näkyvissä (body.satelliitti-nimet).
 *
 * @param {{ doc?: Document, nakyvat?: () => boolean }} asetukset
 */
export function luoNimiolimitys({ doc = globalThis.document, nakyvat = () => true } = {}) {
  let viimeksi = -Infinity;
  const edelliset = new Map();
  const koot = new WeakMap();
  let ladontoja = 0;
  let piilossa = 0;

  const tyhjenna = () => {
    for (const el of doc?.querySelectorAll?.('.satelliitti-piste[data-kylki]') ?? []) {
      el.removeAttribute('data-kylki');
    }
    edelliset.clear();
    piilossa = 0;
  };

  const paivita = (nyt = Date.now()) => {
    if (!doc?.querySelectorAll) return false;
    if (!nakyvat()) {
      if (edelliset.size) tyhjenna();
      return false;
    }
    if (nyt - viimeksi < LADONNAN_VALI_MS) return false;
    viimeksi = nyt;
    const kohteet = [];
    const elementit = new Map();
    let i = 0;
    for (const el of doc.querySelectorAll('.satelliitti-piste')) {
      i += 1;
      if (el.classList.contains('pallolauta-takana')) {
        if (el.hasAttribute('data-kylki')) el.removeAttribute('data-kylki');
        continue;
      }
      const nimi = el.querySelector('.satelliitti-nimi');
      const ydin = el.querySelector('.satelliitti-ydin') ?? el;
      if (!nimi) continue;
      const r = ydin.getBoundingClientRect();
      if (!(r.width || r.height)) continue;
      /* Nimiön koko on vakio (teksti ei muutu): mitataan kerran. */
      let koko = koot.get(nimi);
      if (!koko || !koko.w) {
        koko = { w: nimi.offsetWidth || 0, h: nimi.offsetHeight || 0 };
        koot.set(nimi, koko);
      }
      if (!koko.w) continue;
      const id = el.dataset?.kohde || nimi.textContent || String(i);
      elementit.set(id, el);
      kohteet.push({ id, x: r.left + r.width / 2, y: r.top + r.height / 2, w: koko.w, h: koko.h });
    }
    const tulos = ladoNimiot(kohteet, { edelliset });
    piilossa = 0;
    for (const [id, kylki] of tulos) {
      const el = elementit.get(id);
      if (kylki === PIILO) piilossa += 1;
      const arvo = kylki === 'ala' ? null : kylki;
      if (arvo === null) {
        if (el.hasAttribute('data-kylki')) el.removeAttribute('data-kylki');
      } else if (el.getAttribute('data-kylki') !== arvo) {
        el.setAttribute('data-kylki', arvo);
      }
      edelliset.set(id, kylki);
    }
    ladontoja += 1;
    return true;
  };

  return {
    paivita,
    /** Seuraava paivita mittaa heti (esim. kameran hyppy). */
    pakota: () => { viimeksi = -Infinity; },
    tila: () => ({ ladontoja, piilossa, ladottuja: edelliset.size }),
    pura: () => tyhjenna(),
  };
}
