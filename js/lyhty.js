/*
 * LYHDYT — kaksi elävää valoa avauslaatikon yläkulmissa.
 *
 * OMISTAJAN TILAUS 4.9.2026 (kuvakaappaus avauslaatikosta, sanatarkasti):
 * *"Saisiko tähän ne valot loimuamaan kuin valo tulisi padasta? Eli
 * haluaisin luoda illuusion valolla että yläreunan kummassakin nurkassa
 * olisi lyhty joiden valot eläisivät (alueelliset valovaihtelut Liekin
 * lailla) paperin päällä."*
 *
 * Ensimmäinen versio (v1519) lepatti CSS-keyframeilla: kaksi jaksoa,
 * pelkkä koko laatikon kajon himmennys. Se ei näyttänyt liekiltä, koska
 * liekin valo ei syki tasaisesti vaan VAELTAA: kirkkaus on monen
 * eritahtisen aallon summa, siihen tulee satunnaisia puuskia, ja valon
 * keskipiste heiluu muutaman pikselin. Siksi lyhty ohjataan tästä
 * skriptillä kehys kerrallaan, ja CSS piirtää vain kerrokset.
 *
 * ── KERROKSET (css/aikajana.css .aikajana-lyhty) ──────────────────
 *
 *   .kajo   laaja, pehmeä valokeila paperilla (soft-light) — "pata"
 *   .ydin   pieni kuuma keskus nurkassa (screen) — itse liekin hehku
 *
 * Kumpikin saa oman kirkkautensa (opacity) ja siirtymänsä (transform)
 * tämän moduulin laskemana. Liekkimalli on PUHDAS FUNKTIO ajasta ja
 * lyhdyn vaiheista (lyhdynTila), joten testi voi todentaa, että valo
 * pysyy rajoissa eikä kahden lyhdyn loimu ole sama.
 *
 * ── LIIKE ON PEHMEÄÄ ───────────────────────────────────────────────
 *
 * Raamattu "KAIKKI LIIKE ANIMOIDAAN PEHMEASTI": puuska ei hyppää vaan
 * liukuu kohti uutta tavoitetta (eksponentiaalinen lähestyminen), ja
 * kaikki aallot ovat sinejä. prefers-reduced-motion: valot palavat
 * tasaisesti (yksi kehys, ei silmukkaa).
 */

/** Kirkkauden rajat: valo ei sammu eikä ylivalota paperia. */
export const LYHTY_MIN = 0.45;
export const LYHTY_MAX = 1;

/** Vaiheet ja taajuudet kummallekin lyhdylle — eri, jotta loimu ei ole peilikuva. */
export const LYHDYT = {
  vasen: { vaihe: [0.0, 1.9, 4.1, 2.6], taajuus: [1.7, 3.9, 7.1, 0.37], puuska: [0.9, 2.3] },
  oikea: { vaihe: [2.2, 0.7, 5.3, 1.1], taajuus: [1.5, 4.3, 6.4, 0.31], puuska: [1.1, 2.7] },
};

const rajaa = (v, a, b) => Math.min(b, Math.max(a, v));

/** Uusi lyhdyn tila (puuskan tavoite ja nykyarvo). `arpa` on testattavuutta varten. */
export function lyhdynTila(nimi, arpa = Math.random) {
  const m = LYHDYT[nimi];
  return { nimi, m, arpa, puuska: 0, tavoite: 0, seuraava: 0, edellinen: 0 };
}

/**
 * Liekin hetki: kirkkaus ja siirtymä ajanhetkellä `t` (sekunteina).
 *
 * Kirkkaus = perustaso + kolme eritahtista aaltoa (hidas hengitys,
 * lepatus, värinä) + puuska, joka arvotaan 0,9–2,7 s välein alueelta
 * [-0,20, +0,12] ja jota kohti liu'utaan (aikavakio ~0,25 s). Siirtymä
 * on kaksi hidasta aaltoa, muutama pikseli: liekin kärki vaeltaa.
 */
export function liekinHetki(tila, t) {
  const { m } = tila;
  const dt = Math.max(0, Math.min(0.1, t - tila.edellinen));
  tila.edellinen = t;
  if (t >= tila.seuraava) {
    tila.tavoite = -0.2 + tila.arpa() * 0.32;
    tila.seuraava = t + m.puuska[0] + tila.arpa() * (m.puuska[1] - m.puuska[0]);
  }
  tila.puuska += (tila.tavoite - tila.puuska) * (1 - Math.exp(-dt / 0.25));
  const [f1, f2, f3, f4] = m.taajuus;
  const [p1, p2, p3, p4] = m.vaihe;
  const hehku = 0.8
    + 0.12 * Math.sin(t * f1 + p1)
    + 0.07 * Math.sin(t * f2 + p2)
    + 0.04 * Math.sin(t * f3 + p3)
    + tila.puuska;
  const kajo = rajaa(hehku, LYHTY_MIN, LYHTY_MAX);
  // Ydin lepattaa jyrkemmin kuin kajo: sama pohja, värinä kaksinkertaisena.
  const ydin = rajaa(hehku + 0.07 * Math.sin(t * f3 * 1.6 + p2) + 0.06, LYHTY_MIN, LYHTY_MAX);
  const dx = 3.0 * Math.sin(t * 1.3 + p1) + 1.5 * Math.sin(t * f4 * 9 + p3);
  const dy = 2.0 * Math.sin(t * 1.1 + p2) + 1.2 * Math.sin(t * f2 * 0.7 + p4);
  const koko = 1 + 0.04 * Math.sin(t * f4 * 4 + p4) + 0.3 * (kajo - 0.8);
  return { kajo, ydin, dx, dy, koko };
}

/** Kirjoittaa hetken lyhdyn elementtiin (opacity + transform, ei muuta). */
export function asetaLyhty(el, h) {
  el.style.setProperty('--lyhty-kajo', h.kajo.toFixed(3));
  el.style.setProperty('--lyhty-ydin', h.ydin.toFixed(3));
  el.style.setProperty('--lyhty-dx', `${h.dx.toFixed(2)}px`);
  el.style.setProperty('--lyhty-dy', `${h.dy.toFixed(2)}px`);
  el.style.setProperty('--lyhty-koko', h.koko.toFixed(4));
}

/**
 * Sytyttää lyhdyt laatikon yläkulmiin ja palauttaa sammuttimen.
 *
 * Luo kaksi `.aikajana-lyhty`-elementtiä (vasen, oikea) kajo- ja
 * ydin-kerroksineen laatikon alkuun (sisällön alle, z-index CSS:ssä).
 * `reducedMotion`: yksi tasainen kehys, ei silmukkaa. Silmukka
 * pysähtyy sammuttimesta tai kun laatikko irtoaa dokumentista.
 */
export function sytytaLyhdyt(laatikko, { reducedMotion = false, raf = globalThis.requestAnimationFrame, caf = globalThis.cancelAnimationFrame } = {}) {
  // Testien kevyt DOM-jäljitelmä ei anna ownerDocumentia: silloin lyhtyjä ei luoda.
  const doc = laatikko.ownerDocument ?? globalThis.document;
  if (typeof doc?.createElement !== 'function') return () => {};
  const lyhdyt = ['vasen', 'oikea'].map((nimi) => {
    const el = doc.createElement('div');
    el.className = `aikajana-lyhty ${nimi}`;
    el.setAttribute('aria-hidden', 'true');
    for (const kerros of ['kajo', 'ydin']) {
      const s = doc.createElement('span');
      s.className = kerros;
      el.appendChild(s);
    }
    if (typeof laatikko.insertBefore === 'function') laatikko.insertBefore(el, laatikko.firstChild ?? null);
    else laatikko.appendChild(el);
    return { el, tila: lyhdynTila(nimi) };
  });
  if (reducedMotion || typeof raf !== 'function') {
    for (const l of lyhdyt) asetaLyhty(l.el, { kajo: 0.85, ydin: 0.9, dx: 0, dy: 0, koko: 1 });
    return () => {};
  }
  let kehys = 0;
  let palaa = true;
  const alku = performance.now();
  const askel = (nyt) => {
    if (!palaa) return;
    if (!laatikko.isConnected) { palaa = false; return; }
    const t = (nyt - alku) / 1000;
    for (const l of lyhdyt) asetaLyhty(l.el, liekinHetki(l.tila, t));
    kehys = raf(askel);
  };
  kehys = raf(askel);
  return () => { palaa = false; if (kehys && typeof caf === 'function') caf(kehys); };
}
