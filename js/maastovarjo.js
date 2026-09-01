/*
 * MAASTON VARJOSTUS — YKSI KAAVA, KAKSI KÄYTTÄJÄÄ.
 *
 * Tämä on se rinnevarjo, jonka laattapyramidin moottori polttaa
 * pohjalaattoihin (tools/fokuskartta/maailmapiirto.js, pikselipassi
 * "1-3. PINTA"). Kaava asui ennen moottorin sisällä sulkeumana, ja
 * niin kauan kuin sillä oli yksi käyttäjä, se sai asua siellä.
 *
 * NYT KÄYTTÄJIÄ ON KAKSI. Omistajan kokeilu 1.9.2026 (sanatarkka:
 * *"korkeusdatan 1′-ajoa simuloidaan liverenderöinnillä pelissä:
 * ensin haetaan normaali pohja laatoista ja sitten peli rakentaa
 * reaaliajassa tarkemman korkeusvarjostuksen"*) laskee saman varjon
 * selaimessa ETOPO1:n natiivista yhden kaariminuutin ruudukosta ja
 * piirtää sen laattojen päälle. Jos peli ja moottori laskisivat
 * varjonsa kahdesta eri kopiosta, ne ehtisivät eriytyä ensimmäisessä
 * hienosäädössä — ja ero näkyisi juuri siinä, mitä kokeilulla
 * yritetään mitata.
 *
 * Siksi kaava on tässä, ja molemmat tuovat sen täältä. Tiedosto ei
 * tuo mitään eikä koske verkkoon: se on puhdasta laskentaa, jonka voi
 * ladata sekä Nodeen että selaimen Web Workeriin.
 *
 * MIKSI js/ EIKÄ tools/: peli lataa tämän selaimeen (Web Worker), ja
 * GitHub Pagesiin kopioidaan vain css/, js/, assets/ ja docs/
 * (.github/workflows/pages.yml) — tools/-kansiota EI ole julkaistulla
 * sivulla lainkaan. Node-työkalu tuo tämän täältä samalla tavalla kuin
 * se tuo js/nostoladonta.js:n; suunta on aina tämä eikä toisin päin.
 *
 * HUOM: tämä EI ole sama kuin tools/varjostus.mjs. Se on vanhan
 * pohjakartan oma varjostin (koko ruudukko kerralla, aurinko 45°);
 * tämä on yleislehden ja laattapyramidin PISTEKOHTAINEN varjo, jonka
 * aurinko on 315°/42° ja liioittelu 2,6.
 */

/** Yhden leveysasteen pituus metreinä. Sama vakio kuin moottorilla. */
export const M_PER_AST = 111320;

/*
 * Varjostuksen valo ja liioittelu.
 *
 * Nämä luvut ovat moottorin omat, siirrettyinä sanasta sanaan:
 * liioittelu on "hitusen maltillisempi" kuin maalehdellä, koska
 * yleislehden ruudukko on kolme kaariminuuttia eikä yhtä — samalla
 * kertoimella rinteet olisivat kaukozoomissa rakeisia.
 */
export const VALO = {
  /** Pystysuunnan liioittelu (z-exaggeration). */
  liioittelu: 2.6,
  /** Auringon suunta asteina (315 = luode). */
  atsimuutti: 315,
  /** Auringon korkeuskulma asteina. */
  korkeuskulma: 42,
};

/**
 * Rinteen valoisuus 0…1 yhdessä pisteessä.
 *
 * @param {(lon: number, lat: number) => number} korkeus
 *        Bilineaarinen korkeusnäyte metreinä; NaN ruudukon ulkopuolella.
 *        Kutsuja omistaa ruudukon — tämä ei tiedä siitä mitään.
 * @param {number} lon  pituusaste
 * @param {number} lat  leveysaste
 * @param {number} d    derivaatan askel ASTEINA. Moottorilla se on
 *        ruudukon oma väli (3′ = 0,05°); selaimen tarkassa varjossa
 *        1′ = 1/60. Askel on nimenomaan parametri eikä vakio: juuri
 *        sen muutos ON koko kokeilu.
 * @returns {number} 0 (varjossa) … 1 (kohtisuoraan valoa vasten);
 *        tasainen maa antaa sin(korkeuskulma) ≈ 0,669.
 */
export function varjostusPisteessa(korkeus, lon, lat, d) {
  /*
   * KESKEISDIFFERENSSI MOLEMPIIN SUUNTIIN. Itä–länsi-askel kutistuu
   * kosinin mukana navoille päin: sama asteväli on Norjassa alle
   * puolet siitä matkasta, jonka se on päiväntasaajalla, ja ilman
   * kosinia rinteet loivenisivat pohjoisessa.
   */
  const dzdx = (korkeus(lon + d, lat) - korkeus(lon - d, lat))
    / (2 * d * M_PER_AST * Math.cos(lat * Math.PI / 180));
  const dzdy = (korkeus(lon, lat + d) - korkeus(lon, lat - d)) / (2 * d * M_PER_AST);
  /*
   * Ruudukon ulkopuoli (NaN) ei ole varjoa eikä valoa vaan "ei
   * tietoa" — 0,5 on se neutraali arvo, jonka moottori on aina
   * antanut, ja sen on pysyttävä samana, tai kartan reunaan
   * ilmestyisi viiva.
   */
  if (!Number.isFinite(dzdx) || !Number.isFinite(dzdy)) return 0.5;
  const z = VALO.liioittelu;
  const nx = -dzdx * z; const ny = -dzdy * z; const nz = 1;
  const len = Math.hypot(nx, ny, nz);
  const az = VALO.atsimuutti * Math.PI / 180;
  const alt = VALO.korkeuskulma * Math.PI / 180;
  const lx = Math.cos(alt) * Math.sin(az); const ly = Math.cos(alt) * Math.cos(az);
  const lz = Math.sin(alt);
  return Math.max(0, (nx * lx + ny * ly + nz * lz) / len);
}

/**
 * Bilineaarinen korkeusnäyte tasavälisestä ruudukosta.
 *
 * Sama kaava kuin moottorin sisäinen `korkeus(lon, lat)`, mutta
 * ruudukko tulee parametrina. Selaimen tarkka varjo kokoaa
 * ruudukkonsa monesta 10°-palasta, joten sillä on oma näytteenottajansa
 * — tämä on tarjolla niille kutsujille, joilla ruudukko on yhtenä
 * taulukkona (testit, Node-työkalut).
 *
 * @param {{grid: ArrayLike<number>, w: number, h: number,
 *          lon0: number, lat1: number, dlon: number, dlat: number}} K
 *        `lat1` on POHJOISIN rivi (y = 0), kuten moottorilla.
 */
export function bilineaarinenKorkeus(K, lon, lat) {
  const fx = (lon - K.lon0) / K.dlon;
  const fy = (K.lat1 - lat) / K.dlat;
  if (fx < 0 || fy < 0 || fx > K.w - 1 || fy > K.h - 1) return NaN;
  const x0 = Math.floor(fx); const y0 = Math.floor(fy);
  const x1 = Math.min(K.w - 1, x0 + 1); const y1 = Math.min(K.h - 1, y0 + 1);
  const tx = fx - x0; const ty = fy - y0;
  const a = K.grid[y0 * K.w + x0]; const b = K.grid[y0 * K.w + x1];
  const c = K.grid[y1 * K.w + x0]; const d = K.grid[y1 * K.w + x1];
  return (a + (b - a) * tx) * (1 - ty) + (c + (d - c) * tx) * ty;
}

/**
 * Varjon voimakkuus siinä muodossa, jossa moottori sen käyttää.
 *
 * Moottorin maastopassi kirjoittaa `const varjo = (0.5 - varjostus) *
 * 0.46;` ja kertoo sillä pikselin: positiivinen luku tummentaa,
 * negatiivinen vaalentaa. Sama luku on selaimen tarkan varjon
 * peittävyys, joten kerroin kuuluu tänne eikä kahteen paikkaan.
 */
export const VARJON_VOIMA = 0.46;

/** @returns {number} > 0 tummentaa, < 0 vaalentaa; itseisarvo enintään 0,46. */
export function varjonVoimakkuus(valoisuus) {
  return (0.5 - valoisuus) * VARJON_VOIMA;
}
