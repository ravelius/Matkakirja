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
 * OMISTAJAN PALAUTE 6.9.2026 KESKIPÄIVÄ (iPhone, Ihmisen matka
 * -avauslaatikko, sanatarkasti): *"Miten tulen Loimuun saisi lisää
 * tunnelmaa ja elävyyttä. Nyt liian huomaamaton efekti."* Malli oli
 * teknisesti oikea mutta liian kaino: kirkkaus liikkui vain välillä
 * 0,45–1,0 ja käytti siitäkin vain vajaan kolmanneksen, joten paperilla
 * näkyi tasainen lämmin läiskä. Nyt mitattu vaihteluväli on koko
 * 0,25–1,0 (aiemmin ~0,25 yksikköä, nyt ~0,75), puuskat tulevat noin
 * kaksi kertaa tiheämmin ja valon keskipiste vaeltaa kaksinkertaisen
 * matkan. Kirkkauden vastapainoksi laatikko saa saman mallin
 * VARJOARVON (laatikonValo): kun liekit vaimenevat, paperin alareuna
 * tummuu ja laatikon ulkopuolinen kajo mustassa hiipuu — laatikko on
 * ainoa valonlähde pimeässä ruudussa.
 *
 * ── KERROKSET (css/aikajana.css .aikajana-lyhty) ──────────────────
 *
 *   .kajo   laaja, pehmeä valokeila paperilla (screen) — "pata"
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
 * kaikki aallot ovat sinejä. Aikavakio nostettiin 0,25 s:stä 0,32
 * s:iin juuri siksi, että puuskat kasvoivat: isompi askel ehtii silti
 * liukua (mitattu suurin muutos kehyksessä 0,032, ei näy hyppynä).
 * prefers-reduced-motion: valot palavat tasaisesti (yksi kehys, ei
 * silmukkaa).
 */

/**
 * Kirkkauden rajat: valo ei sammu eikä ylivalota paperia.
 * Alaraja laskettiin 0,45 → 0,25 omistajan 6.9.2026 palautteesta
 * ("liian huomaamaton efekti"): liekki saa painua selvästi hiillokseksi
 * ennen kuin se leimahtaa taas.
 */
export const LYHTY_MIN = 0.25;
export const LYHTY_MAX = 1;

/** Vaiheet ja taajuudet kummallekin lyhdylle — eri, jotta loimu ei ole peilikuva. */
export const LYHDYT = {
  vasen: { vaihe: [0.0, 1.9, 4.1, 2.6], taajuus: [1.7, 3.9, 7.1, 0.37], puuska: [0.55, 1.5] },
  oikea: { vaihe: [2.2, 0.7, 5.3, 1.1], taajuus: [1.5, 4.3, 6.4, 0.31], puuska: [0.7, 1.8] },
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
 * lepatus, värinä) + puuska, joka arvotaan 0,55–1,8 s välein alueelta
 * [-0,26, +0,14] ja jota kohti liu'utaan (aikavakio 0,32 s). Siirtymä
 * on kaksi hidasta aaltoa, korkeintaan yhdeksän pikseliä: liekin kärki
 * vaeltaa nyt niin paljon, että valokeilan reuna liikkuu paperilla.
 */
export function liekinHetki(tila, t) {
  const { m } = tila;
  const dt = Math.max(0, Math.min(0.1, t - tila.edellinen));
  tila.edellinen = t;
  if (t >= tila.seuraava) {
    tila.tavoite = -0.26 + tila.arpa() * 0.4;
    tila.seuraava = t + m.puuska[0] + tila.arpa() * (m.puuska[1] - m.puuska[0]);
  }
  tila.puuska += (tila.tavoite - tila.puuska) * (1 - Math.exp(-dt / 0.32));
  const [f1, f2, f3, f4] = m.taajuus;
  const [p1, p2, p3, p4] = m.vaihe;
  const hehku = 0.7
    + 0.17 * Math.sin(t * f1 + p1)
    + 0.11 * Math.sin(t * f2 + p2)
    + 0.06 * Math.sin(t * f3 + p3)
    + tila.puuska;
  const kajo = rajaa(hehku, LYHTY_MIN, LYHTY_MAX);
  // Ydin lepattaa jyrkemmin kuin kajo: sama pohja, värinä kaksinkertaisena.
  const ydin = rajaa(hehku + 0.1 * Math.sin(t * f3 * 1.6 + p2) + 0.1, LYHTY_MIN, LYHTY_MAX);
  const dx = 6.0 * Math.sin(t * 1.3 + p1) + 2.6 * Math.sin(t * f4 * 9 + p3);
  const dy = 3.6 * Math.sin(t * 1.1 + p2) + 2.0 * Math.sin(t * f2 * 0.7 + p4);
  const koko = 1 + 0.05 * Math.sin(t * f4 * 4 + p4) + 0.2 * (kajo - 0.7);
  return { kajo, ydin, dx, dy, koko };
}

/**
 * VALON VASTAKOHTA (omistaja 6.9.2026: lisää tunnelmaa ja elävyyttä).
 * Kahden lyhdyn keskikirkkaudesta lasketaan kaksi laatikkotason arvoa:
 *
 *   varjo  0 = liekit täydellä, 1 = hiilloksella. CSS syventää tällä
 *          paperin alareunan ja alakulmat, joten varjo HENGITTÄÄ
 *          vastakkaisessa tahdissa valon kanssa.
 *   ulko   laatikon ulkopuolelle mustaan lankeavan lämpimän kajon
 *          peittävyys: pimeässä ruudussa laatikko on ainoa valonlähde.
 *
 * Puhdas funktio, jotta testi näkee vastakohdan ilman selainta.
 */
export function laatikonValo(kajot) {
  const keski = kajot.length ? kajot.reduce((a, b) => a + b, 0) / kajot.length : LYHTY_MAX;
  const osuus = rajaa((keski - LYHTY_MIN) / (LYHTY_MAX - LYHTY_MIN), 0, 1);
  return { varjo: 1 - osuus, ulko: 0.08 + 0.3 * keski };
}

/** Kirjoittaa hetken lyhdyn elementtiin (opacity + transform, ei muuta). */
export function asetaLyhty(el, h) {
  el.style.setProperty('--lyhty-kajo', h.kajo.toFixed(3));
  el.style.setProperty('--lyhty-ydin', h.ydin.toFixed(3));
  el.style.setProperty('--lyhty-dx', `${h.dx.toFixed(2)}px`);
  el.style.setProperty('--lyhty-dy', `${h.dy.toFixed(2)}px`);
  el.style.setProperty('--lyhty-koko', h.koko.toFixed(4));
}

/** Kirjoittaa laatikon (tai kehyksen) varjo- ja ulkokajoarvot. */
export function asetaLaatikonValo(el, v) {
  if (!el?.style?.setProperty) return;
  el.style.setProperty('--lyhty-varjo', v.varjo.toFixed(3));
  el.style.setProperty('--lyhty-ulko', v.ulko.toFixed(3));
}

/**
 * Sytyttää lyhdyt laatikon yläkulmiin ja palauttaa sammuttimen.
 *
 * Luo kaksi `.aikajana-lyhty`-elementtiä (vasen, oikea) kajo- ja
 * ydin-kerroksineen laatikon alkuun (sisällön alle, z-index CSS:ssä).
 * `valokohde` saa laatikkotason varjo- ja ulkokajoarvot: se on
 * avausjaksossa laatikon KEHYS, koska laatikko itse on leikattu
 * repaleiseksi (clip-path) eikä sen ulkopuolinen kajo näkyisi.
 * `reducedMotion`: yksi tasainen kehys, ei silmukkaa. Silmukka
 * pysähtyy sammuttimesta tai kun laatikko irtoaa dokumentista.
 */
export function sytytaLyhdyt(laatikko, {
  reducedMotion = false, valokohde = null,
  raf = globalThis.requestAnimationFrame, caf = globalThis.cancelAnimationFrame,
} = {}) {
  // Testien kevyt DOM-jäljitelmä ei anna ownerDocumentia: silloin lyhtyjä ei luoda.
  const doc = laatikko.ownerDocument ?? globalThis.document;
  if (typeof doc?.createElement !== 'function') return () => {};
  const kohde = valokohde ?? laatikko;
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
    asetaLaatikonValo(kohde, laatikonValo([0.85, 0.85]));
    return () => {};
  }
  let kehys = 0;
  let palaa = true;
  const alku = performance.now();
  const askel = (nyt) => {
    if (!palaa) return;
    if (!laatikko.isConnected) { palaa = false; return; }
    const t = (nyt - alku) / 1000;
    const kajot = [];
    for (const l of lyhdyt) {
      const h = liekinHetki(l.tila, t);
      asetaLyhty(l.el, h);
      kajot.push(h.kajo);
    }
    asetaLaatikonValo(kohde, laatikonValo(kajot));
    kehys = raf(askel);
  };
  kehys = raf(askel);
  return () => { palaa = false; if (kehys && typeof caf === 'function') caf(kehys); };
}
