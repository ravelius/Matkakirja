/*
 * FOKUSKARTAN PIIRTOMOOTTORI — yksi maa 1873-atlaksen lehtenä.
 *
 * Tämä tiedosto ajetaan SELAIMESSA (tools/tee-fokuskartta.mjs käynnistää
 * Chromiumin ja syöttää aineiston tänne), koska koko kuva rakentuu
 * canvasin omilla työkaluilla: monikulmion rasterointi maskiksi,
 * evenodd-leikkurit ja sumennussuodatin. Ne kaikki jouduttaisiin
 * kirjoittamaan käsin, jos kuva tehtäisiin Nodessa.
 *
 * Tyyli on omistajan 24.8.2026 hyväksymä prototyyppi (variantti B), ja
 * saman päivän illan linjaus oli ehdoton: *"näkymän pitää näyttää
 * TÄSMÄLLEEN hyväksytyltä prototyyppikuvalta pieniä yksityiskohtia
 * myöten (mittajana ym.)"*. Siksi tässä on prototyypin KOKO ulkoasu —
 * opaakki paperi, meren syvyysporrastus, naapurien sumenevat
 * ääriviivat, merten ja vuorten nimet — eikä pelkkä maastorasteri
 * kuten v1091–v1095:ssä.
 *
 * === JATKUVA PINTA (omistaja 25.8.2026, Raamatun osio "JATKUVA KARTTA
 * JA DYNAAMISET MITAT") ===
 *
 * Lehden KALUSTEET on sittemmin otettu kuvasta pois: kehysviiva,
 * KREIKKA-kartuutsi, mittajana ja asteverkon reunalukemat eivät ole
 * karttaa vaan sivua, ja ne tekivät kuvasta suljetun "lehden" keskelle
 * lautaa. Kaikki ne piirtää nyt PELI ruutuun ankkuroituina
 * (js/fokusmitat.js), jolloin ne pysyvät samankokoisina zoomista
 * riippumatta ja mittajana kertoo TODELLISEN mittakaavan.
 *
 * Kuvasta jää se, mikä on karttaa: maasto, meri, rannikko, joet,
 * vuoret, merten ja paikkojen nimet sekä ΕΛΛΑΣ-vesileima. Maasto ei
 * myöskään lopu kohdemaan rajalle: NAAPURIEN topografia piirretään
 * samasta ETOPO-ruudukosta haaleana ja harmaampana, ja se haalistuu
 * kauemmas mentäessä. Fokusointi hoituu himmeydellä, ei rajaviivalla.
 *
 * Kytkin on maakohtainen (tools/fokuskartta/maat.mjs `jatkuva`), jotta
 * vanha lehtiasu on yhä yhden lipun päässä.
 *
 * === KOLME ASIAA, JOTKA OVAT TOISIN KUIN PROTOTYYPISSÄ ===
 *
 * 1. PROJEKTIO ON LAUDAN, EI MERCATORIN. Kuva liimataan pelilaudalle,
 *    joten sen on käytettävä laudan omaa kaavaa — pelilaudalla Millerin
 *    lieriötä, maanosalaudoilla tasaväliä (ks. laudanProjektio). Väärä
 *    kaava siirtäisi maan pohjoisosaa kymmeniä yksikköjä, ja kaupunkien
 *    laatat jäisivät maaston viereen.
 *
 * 2. KAKSI LAATIKKOA: `bbox` on koko kuva, `rajaus` on IKKUNA, johon
 *    peli ajaa kameran. Bboxin ja rajauksen väliin jäävä osa on
 *    VUOTOA: ruudun kuvasuhde ei ole koskaan ikkunan kuvasuhde, joten
 *    kamera näyttää aina hitusen ikkunaa enemmän, ja vuoto estää sauman
 *    laudan omaan grafiikkaan. Uloin reuna häivytetään läpinäkyväksi,
 *    jotta sauma sulaa lautaan siellä missä vuoto loppuu kesken
 *    (pystynäkymä). Jatkuvassa pinnassa vuoto ei ole tyhjää paperia
 *    vaan samaa maastoa ja merta kuin muukin kuva — mikään ei kerro
 *    pelaajalle, mistä ikkuna alkaa.
 *
 * 3. PELILAATTOJEN KAUPUNKEJA EI PIIRRETÄ. Prototyypissä Athína ja
 *    Irákleio olivat kuvassa; pelissä ne ovat laattoja, jotka peli
 *    piirtää itse. Kuvaan poltettu toisinto olisi tupla. Muut
 *    kaupungit (Thessaloníki, Pátra, Ioánnina, Náfplio) ovat kuvassa
 *    kuten prototyypissä — ne eivät ole pelikohteita.
 *
 * Lehden käsin aseteltavat asiat (merten nimet, vuoret, kartuutsin
 * teksti) tulevat tyylitiedostosta tools/fokuskartta/maat.mjs.
 */

/* ------------------------------------------------------------ paletti */

/*
 * Hypsometrinen asteikko. Alanko on haalean khakinvihreä (1873-atlaksen
 * tapa), ylöspäin lämpimän ruskean puolelle — sama väriperhe kuin pelin
 * seepiakartassa (#e7d2a4 -> #c69257 -> #a2603a).
 */
const ASTEIKKO = [
  { m: -60, v: [214, 202, 168] },
  { m: 0, v: [221, 216, 173] },
  { m: 200, v: [226, 212, 163] },
  { m: 500, v: [222, 197, 142] },
  { m: 900, v: [209, 172, 115] },
  { m: 1400, v: [190, 141, 92] },
  { m: 2000, v: [169, 110, 72] },
  { m: 2900, v: [150, 90, 62] },
];

/* Meri: ei sinistä vaan viileä paperi, syvyys porrastettuna. */
const SYVYYS = [
  { m: 0, v: [225, 217, 191] },
  { m: -120, v: [219, 212, 189] },
  { m: -600, v: [211, 205, 186] },
  { m: -1500, v: [202, 197, 182] },
  { m: -3000, v: [193, 189, 177] },
  { m: -5000, v: [185, 182, 172] },
];

const PAPERI = '#e8dcbc';
const MUSTE = '#4a3421';

/*
 * Naapurit piirretään PUOLIKKAALLA tarkkuudella ja venytetään paikalleen.
 *
 * Ne ovat pelkkiä ääriviivoja, jotka sumennetaan neljässä vyöhykkeessä
 * — sumennettua ei kannata laskea täydellä tarkkuudella. Puolikkaalla
 * lehti on yhä tarkempi kuin prototyypin oma 3200 pikselin canvas, ja
 * viisi koko kuvan kokoista ImageDataa ja viisi sumennusta jäävät
 * neljäsosaan muistista ja ajasta. Täydellä tarkkuudella Chromium
 * kaatui muistiin 6400 pikselin lehdellä.
 */
const NAAPURI_JAKO = 2;

/* ------------------------------------------------------------- apurit */

function mulberry32(a) {
  return function satunnainen() {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Siemenellinen arvokohina: 256x256 taulu ja bilineaarinen haku. */
function teeKohina(siemen) {
  const N = 256;
  const rnd = mulberry32(siemen);
  const t = new Float32Array(N * N);
  for (let i = 0; i < t.length; i++) t[i] = rnd();
  return (x, y) => {
    const xi = Math.floor(x); const yi = Math.floor(y);
    const fx = x - xi; const fy = y - yi;
    const x0 = ((xi % N) + N) % N; const y0 = ((yi % N) + N) % N;
    const x1 = (x0 + 1) % N; const y1 = (y0 + 1) % N;
    const sx = fx * fx * (3 - 2 * fx); const sy = fy * fy * (3 - 2 * fy);
    const a = t[y0 * N + x0]; const b = t[y0 * N + x1];
    const c = t[y1 * N + x0]; const d = t[y1 * N + x1];
    const ylin = a + (b - a) * sx;
    return ylin + ((c + (d - c) * sx) - ylin) * sy;
  };
}

function fbm(kohina, x, y, oktaavit = 4) {
  let s = 0; let amp = 0.5; let f = 1; let norm = 0;
  for (let i = 0; i < oktaavit; i++) {
    s += amp * kohina(x * f, y * f);
    norm += amp; amp *= 0.5; f *= 2;
  }
  return s / norm;
}

const KOHINA = teeKohina(18730425);
const KOHINA2 = teeKohina(90211);

/** Lineaarinen väriliuku asteikolta, joka on järjestetty NOUSEVASTI. */
function lerpVari(asteikko, m) {
  if (m <= asteikko[0].m) return asteikko[0].v;
  for (let i = 1; i < asteikko.length; i++) {
    if (m <= asteikko[i].m) {
      const a = asteikko[i - 1]; const b = asteikko[i];
      const t = (m - a.m) / (b.m - a.m);
      return [
        a.v[0] + (b.v[0] - a.v[0]) * t,
        a.v[1] + (b.v[1] - a.v[1]) * t,
        a.v[2] + (b.v[2] - a.v[2]) * t,
      ];
    }
  }
  return asteikko[asteikko.length - 1].v;
}

/** Sama LASKEVALLE asteikolle: syvyys menee nollasta alaspäin. */
function lerpSyvyys(m) {
  if (m >= 0) return SYVYYS[0].v;
  for (let i = 1; i < SYVYYS.length; i++) {
    if (m >= SYVYYS[i].m) {
      const a = SYVYYS[i - 1]; const b = SYVYYS[i];
      const t = (m - a.m) / (b.m - a.m);
      return [
        a.v[0] + (b.v[0] - a.v[0]) * t,
        a.v[1] + (b.v[1] - a.v[1]) * t,
        a.v[2] + (b.v[2] - a.v[2]) * t,
      ];
    }
  }
  return SYVYYS[SYVYYS.length - 1].v;
}

/* -------------------------------------------------------- projektiot */

const RAD = Math.PI / 180;

/*
 * LAUDAN PROJEKTIO MOLEMPIIN SUUNTIIN.
 *
 * Kuva liimataan pelilaudalle, joten sen on käytettävä laudan omaa
 * kaavaa. Kaavoja on kaksi:
 *
 *   tasavali  Maanosalaudat, esim. Eurooppa:
 *             x = (lon + 11) * 19.2, y = (72 - lat) * 26.3.
 *
 *   miller    Maailmankartta eli se lauta, jolla peliä pelataan
 *             (js/packs/maailmankartta.js, tools/vanha-maailma.mjs
 *             sovitaMaailma). Leveysaste EI ole lineaarinen: Miller
 *             venyttää pohjoista, ja 12000 yksikön laudalla ero on
 *             Kreikan kohdalla satoja yksiköitä. Lineaarinen kaava
 *             siirtäisi maan pohjoisosaa kymmeniä kilometrejä.
 *
 * Käänteiskaavaa tarvitaan joka pikselille (korkeus ja varjostus
 * haetaan asteista), joten se on osa samaa oliota eikä erillinen
 * arvaus.
 */
export function laudanProjektio(p) {
  if (p.tyyppi === 'miller') {
    const { leveys, lon0, pohjoinen } = p;
    const skaala = leveys / (2 * Math.PI);
    const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
    const yPohjoinen = millerY(pohjoinen);
    const kierros = 2 * Math.PI;
    return {
      lautaX: (lon) => {
        const d = (lon - lon0) * RAD;
        return (((d % kierros) + kierros) % kierros) * skaala;
      },
      lautaY: (lat) => (millerY(lat) - yPohjoinen) * skaala,
      lautaLon: (x) => lon0 + (x / skaala) / RAD,
      lautaLat: (y) => {
        const my = y / skaala + yPohjoinen;
        return (Math.atan(Math.exp(-my / 1.25)) - Math.PI / 4) / 0.4 / RAD;
      },
    };
  }
  // tasavali: x = lonA * lon + lonB, y = latA * lat + latB
  return {
    lautaX: (lon) => p.lonA * lon + p.lonB,
    lautaY: (lat) => p.latA * lat + p.latB,
    lautaLon: (x) => (x - p.lonB) / p.lonA,
    lautaLat: (y) => (y - p.latB) / p.latA,
  };
}

/* =========================================================== moottori */

export function piirra(canvas, aineisto, asetukset) {
  const {
    bbox, rajaus, projektio, leveys, tyyli, tarkistus, esikatseluTausta,
  } = asetukset;
  /*
   * JATKUVA PINTA vai vanha lehti? Kytkin tulee maan tyylistä (maat.mjs)
   * ja ratkaisee kaksi asiaa: piirretäänkö naapureille maasto, ja
   * jätetäänkö lehden kalusteet (kehys, kartuutsi, mittajana,
   * reunalukemat, vinjetti) pois. Ne kuuluvat nyt pelille.
   */
  const jatkuva = Boolean(tyyli.jatkuva);
  /*
   * Yksi kuvapikseli laudan yksikköinä ja päinvastoin. Kuvan on
   * istuttava bboxiin PIKSELILLEEN: peli asettaa <image>-elementin
   * täsmälleen samaan laatikkoon, ja jokainen virhe tässä näkyisi
   * kaupunkien laattoina maaston vieressä.
   */
  const px = leveys / bbox.w;
  const W = Math.round(leveys);
  const H = Math.round(bbox.h * px);
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  /*
   * S = YKSI PROTOTYYPPIPIKSELI KUVAPIKSELEINÄ.
   *
   * Prototyyppi hiottiin 1600 pikselin levyisenä lehtenä, ja kaikki sen
   * mitat — kirjainkoot, viivanleveydet, kehyksen marginaali, paperin
   * rae — on annettu sen pikseleinä. Kun lehti (rajaus) on kuvassa
   * `rajaus.w * px` pikseliä leveä, yksi prototyyppipikseli on tämän
   * verran kuvapikseleitä. Näin sama lehti näyttää samalta millä
   * tahansa renderöintitarkkuudella: tarkkuuden nosto tuo lisää
   * pikseleitä, ei isompaa tekstiä.
   */
  const S = (rajaus.w * px) / 1600;

  // --- projektio: asteet -> lauta -> kuvapikselit ja takaisin --------
  const { lautaX, lautaY, lautaLon, lautaLat } = laudanProjektio(projektio);
  const kuvaX = (lon) => (lautaX(lon) - bbox.x) * px;
  const kuvaY = (lat) => (lautaY(lat) - bbox.y) * px;
  const lonPikselista = (x) => lautaLon(bbox.x + x / px);
  const latPikselista = (y) => lautaLat(bbox.y + y / px);

  // Lehden reunat kuvapikseleinä.
  const rx0 = (rajaus.x - bbox.x) * px;
  const ry0 = (rajaus.y - bbox.y) * px;
  const rx1 = rx0 + rajaus.w * px;
  const ry1 = ry0 + rajaus.h * px;

  // --- korkeusruudukko -----------------------------------------------
  const K = aineisto.korkeus;
  const GRID = new Int16Array(
    Uint8Array.from(atob(K.b64), (c) => c.charCodeAt(0)).buffer,
  );
  const DLON = (K.lon1 - K.lon0) / (K.w - 1);
  const DLAT = (K.lat1 - K.lat0) / (K.h - 1);

  /** Bilineaarinen korkeus (m); NaN ruudukon ulkopuolella. */
  const korkeus = (lon, lat) => {
    const fx = (lon - K.lon0) / DLON;
    const fy = (K.lat1 - lat) / DLAT;          // y = 0 on pohjoisin rivi
    if (fx < 0 || fy < 0 || fx > K.w - 1 || fy > K.h - 1) return NaN;
    const x0 = Math.floor(fx); const y0 = Math.floor(fy);
    const x1 = Math.min(K.w - 1, x0 + 1); const y1 = Math.min(K.h - 1, y0 + 1);
    const tx = fx - x0; const ty = fy - y0;
    const a = GRID[y0 * K.w + x0]; const b = GRID[y0 * K.w + x1];
    const c = GRID[y1 * K.w + x0]; const d = GRID[y1 * K.w + x1];
    return (a + (b - a) * tx) * (1 - ty) + (c + (d - c) * tx) * ty;
  };

  /*
   * Varjostus: valo luoteesta, liioittelu maltillinen. Askel on
   * ruudukon väli METREINÄ, jotta rinne on aito kaltevuus eikä
   * pikselien ero — muuten sama maasto varjostuisi eri tavalla eri
   * kuvakoossa.
   */
  const M_PER_AST = 111320;
  const varjostus = (lon, lat) => {
    const d = DLON;
    const dzdx = (korkeus(lon + d, lat) - korkeus(lon - d, lat))
      / (2 * d * M_PER_AST * Math.cos(lat * Math.PI / 180));
    const dzdy = (korkeus(lon, lat + d) - korkeus(lon, lat - d)) / (2 * d * M_PER_AST);
    if (!Number.isFinite(dzdx) || !Number.isFinite(dzdy)) return 0.5;
    const z = 3.2;
    const nx = -dzdx * z; const ny = -dzdy * z; const nz = 1;
    const len = Math.hypot(nx, ny, nz);
    const az = 315 * Math.PI / 180; const alt = 42 * Math.PI / 180;
    const lx = Math.cos(alt) * Math.sin(az); const ly = Math.cos(alt) * Math.cos(az);
    const lz = Math.sin(alt);
    return Math.max(0, (nx * lx + ny * ly + nz * lz) / len);
  };

  // --- polut ----------------------------------------------------------

  /**
   * Renkaat polkuna; jitter tekee reunasta siveltimen jäljen.
   *
   * `k` kutistaa polun pienemmälle canvasille (naapurit piirretään
   * puolikkaalla tarkkuudella) — sama koodi molempiin.
   */
  const polku = (g, renkaat, jitter = 0, siemen = 1, jatka = false, k = 1) => {
    const rnd = mulberry32(siemen);
    if (!jatka) g.beginPath();
    for (const rengas of renkaat) {
      for (let i = 0; i < rengas.length; i++) {
        let x = kuvaX(rengas[i][0]) * k;
        let y = kuvaY(rengas[i][1]) * k;
        if (jitter) {
          x += (rnd() - 0.5) * jitter * S * k;
          y += (rnd() - 0.5) * jitter * S * k;
        }
        if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
      }
      g.closePath();
    }
  };

  const viivaPolku = (g, osat) => {
    g.beginPath();
    for (const osa of osat) {
      for (let i = 0; i < osa.length; i++) {
        const x = kuvaX(osa[i][0]);
        const y = kuvaY(osa[i][1]);
        if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
      }
    }
  };

  const uusiCanvas = (w = W, h = H) => {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    return c;
  };

  /** Canvas pois muistista heti kun sitä ei enää tarvita. */
  const vapauta = (c) => { c.width = 1; c.height = 1; };

  /** Maan alue alfamaskiksi (Uint8) annetussa koossa. */
  const maski = (renkaat, w = W, h = H, k = 1) => {
    const c = uusiCanvas(w, h);
    const g = c.getContext('2d');
    g.fillStyle = '#000';
    polku(g, renkaat, 0, 1, false, k);
    g.fill('evenodd');
    const d = g.getImageData(0, 0, w, h).data;
    const m = new Uint8Array(w * h);
    for (let i = 0, j = 3; i < m.length; i++, j += 4) m[i] = d[j];
    vapauta(c);
    return m;
  };

  /* ================================================== 1. PAPERI

   * OPAAKKI POHJA (omistaja 24.8.2026 ilta: kuvan on peitettävä laudan
   * vanha grafiikka alueellaan). Aiempi versio jätti taustan
   * läpinäkyväksi, jolloin laudan omat reittiviivat, pisteet ja
   * maastonimet kuulsivat lehden läpi. Nyt lehti on paperia reunasta
   * reunaan: lämmin pohja, kuitujuovat ja rae.
   */
  {
    ctx.fillStyle = PAPERI;
    ctx.fillRect(0, 0, W, H);
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const kuitu = fbm(KOHINA, x / (52 * S), y / (7 * S), 3) - 0.5;
        const rae = KOHINA2(x / (1.7 * S), y / (1.7 * S)) - 0.5;
        const laikka = fbm(KOHINA2, x / (260 * S), y / (260 * S), 3) - 0.5;
        const v = kuitu * 9 + rae * 11 + laikka * 16;
        d[i] = Math.max(0, Math.min(255, d[i] + v * 1.05));
        d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + v));
        d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + v * 0.82));
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  /* ================================================== 2. MERI
   *
   * Syvyysvyöhykkeet haaleina, reunat kosteina. Vyöhykkeen raja
   * aaltoilee, koska korkeuteen lisätään kohinaa ENNEN värihakua —
   * mekaaninen syvyyskäyrä katoaa, mutta muoto pysyy.
   *
   * Korkeusruudukon ULKOPUOLI on avomerta (-900 m). Ruudukko on
   * haettava koko kuvan kokoisena (ks. aineisto.mjs), muuten tähän
   * jäisi tasaisen sävyinen kaistale keskelle ulappaa.
   */
  {
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const lon = lonPikselista(x + 0.5);
        const lat = latPikselista(y + 0.5);
        let m = korkeus(lon, lat);
        if (!Number.isFinite(m)) m = -900;
        if (m >= 0) continue;
        const n = fbm(KOHINA, x / (30 * S), y / (30 * S), 4) - 0.5;
        const v = lerpSyvyys(m + n * 150);
        const i = (y * W + x) * 4;
        const a = 0.5;
        d[i] = d[i] * (1 - a) + v[0] * a;
        d[i + 1] = d[i + 1] * (1 - a) + v[1] * a;
        d[i + 2] = d[i + 2] * (1 - a) + v[2] * a;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  /* ================================================== 3. NAAPURIT
   *
   * Pelkkä ääriviiva ja vaimea täyttö, jotka HIMMENEVÄT ja SUMENEVAT
   * rajasta poispäin. Toteutus on kuoriliuska kerrallaan: sama taso
   * piirretään viisi kertaa eri sumennuksella, ja kukin päästetään läpi
   * vain omalta etäisyysvyöhykkeeltään. Juuri tämä on se ero, jonka
   * omistaja halusi nähdä: raja on tarkka, kaukainen sumu.
   *
   * Etäisyys mitataan KOHDEMAAN reunasta chamfer-muunnoksella (3-4)
   * neljäsosaresoluutiossa, ja `hae` palauttaa sen PROTOTYYPPIPIKSELEINÄ
   * — vyöhykkeiden rajat on säädetty silmällä 1600 pikselin lehdestä.
   */
  const nw = Math.max(1, Math.round(W / NAAPURI_JAKO));
  const nh = Math.max(1, Math.round(H / NAAPURI_JAKO));
  const nk = nw / W;                       // kuvapikseli -> naapuripikseli

  const kentta = (() => {
    const m = maski(aineisto.maa.renkaat, nw, nh, nk);
    const sw = Math.ceil(nw / 4); const sh = Math.ceil(nh / 4);
    const d = new Float32Array(sw * sh).fill(1e9);
    for (let y = 0; y < sh; y++) {
      for (let x = 0; x < sw; x++) {
        if (m[Math.min(nh - 1, y * 4) * nw + Math.min(nw - 1, x * 4)] > 40) d[y * sw + x] = 0;
      }
    }
    const aseta = (i, v) => { if (v < d[i]) d[i] = v; };
    for (let y = 0; y < sh; y++) {
      for (let x = 0; x < sw; x++) {
        const i = y * sw + x;
        if (x > 0) aseta(i, d[i - 1] + 3);
        if (y > 0) aseta(i, d[i - sw] + 3);
        if (x > 0 && y > 0) aseta(i, d[i - sw - 1] + 4);
        if (x < sw - 1 && y > 0) aseta(i, d[i - sw + 1] + 4);
      }
    }
    for (let y = sh - 1; y >= 0; y--) {
      for (let x = sw - 1; x >= 0; x--) {
        const i = y * sw + x;
        if (x < sw - 1) aseta(i, d[i + 1] + 3);
        if (y < sh - 1) aseta(i, d[i + sw] + 3);
        if (x < sw - 1 && y < sh - 1) aseta(i, d[i + sw + 1] + 4);
        if (x > 0 && y < sh - 1) aseta(i, d[i + sw - 1] + 4);
      }
    }
    /*
     * 3 chamfer-yksikköä = 1 ruutu neljäsosaruudukossa = 4
     * naapuripikseliä = 4/(S*nk) prototyyppipikseliä.
     */
    const muunnin = 4 / (S * nk) / 3;
    return {
      // x,y ovat NAAPURIpikseleitä.
      hae: (x, y) => d[Math.min(sh - 1, y >> 2) * sw + Math.min(sw - 1, x >> 2)] * muunnin,
      // x,y ovat KUVApikseleitä.
      haeKuvasta: (x, y) => d[
        Math.min(sh - 1, Math.round(y * nk) >> 2) * sw
        + Math.min(sw - 1, Math.round(x * nk) >> 2)
      ] * muunnin,
    };
  })();

  /*
   * ================================ 2b. NAAPURIEN MAASTO (jatkuva pinta)
   *
   * Omistaja 25.8.2026: *"maasto ja meri jatkuvat koko kuvan alueelle:
   * myös NAAPURIMAAT saavat topografian, mutta selvästi
   * haaleampana/harmaampana kuin kohdemaa — himmeys hoitaa
   * fokusoinnin"*.
   *
   * MAAN JA MEREN RAJA TULEE ETOPO-RUUDUKOSTA, EI RAJADATASTA. Ruudukko
   * kattaa jo koko bboxin (aineisto.mjs vaatii sen meren sävyn takia),
   * joten jokainen pikseli tietää korkeutensa — myös Bulgaria, Turkki ja
   * Libyan rannikko, joista lehdellä ei ole yhtään monikulmiota. Sama
   * temppu toimii siis millä tahansa maalla ilman uutta aineistoa.
   *
   * KOLME ASIAA TEKEE PINNASTA HAALEAN:
   *   1. väri sekoitetaan harmaaseen paperiin (HIMMEA),
   *   2. varjostus on kolmasosa kohdemaan liioittelusta,
   *   3. peitto laskee etäisyyden mukaan kohdemaan rannikosta
   *      (kentta), joten kaukainen manner on pelkkä aavistus.
   *
   * Kohdemaan alue maalataan tässä turhaan, mutta sen oma maastokerros
   * (osio 5) peittää sen täydellä peitolla — erillinen maski maksaisi
   * koko kuvan kokoisen ImageDatan säästämättä mitään.
   */
  if (jatkuva) {
    // Paperinharmaa, johon naapurin hypsometria sekoitetaan.
    const HIMMEA = [205, 197, 178];
    const SEKOITUS = 0.45;
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const lon = lonPikselista(x + 0.5);
        const lat = latPikselista(y + 0.5);
        const m = korkeus(lon, lat);
        if (!Number.isFinite(m) || m < 0) continue;
        /*
         * Etäisyys kohdemaan rannikosta prototyyppipikseleinä. Sama
         * kenttä kuin naapurien ääriviivoilla, joten maasto ja viiva
         * haalistuvat samaa tahtia eikä niiden väliin jää eroa.
         */
        const dist = kentta.haeKuvasta(x, y);
        const peitto = Math.max(0.32, Math.min(0.68, 0.68 - dist / 1300));
        const n1 = fbm(KOHINA, x / (26 * S), y / (26 * S), 4) - 0.5;
        const n2 = fbm(KOHINA2, x / (7 * S), y / (7 * S), 3) - 0.5;
        const v = lerpVari(ASTEIKKO, Math.max(0, m + n1 * 190 + n2 * 60));
        const varjo = (0.5 - varjostus(lon, lat)) * 0.16;
        const rae = (KOHINA2(x / (2.1 * S), y / (2.1 * S)) - 0.5) * 9;
        const i = (y * W + x) * 4;
        for (let k = 0; k < 3; k++) {
          const sekoitettu = v[k] * (1 - SEKOITUS) + HIMMEA[k] * SEKOITUS;
          const savy = Math.max(0, Math.min(255, sekoitettu * (1 - varjo) + rae));
          d[i + k] = d[i + k] * (1 - peitto) + savy * peitto;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  if (Object.keys(aineisto.naapurit ?? {}).length) {
    const taso = uusiCanvas(nw, nh);
    const g = taso.getContext('2d');
    for (const [a3, maa] of Object.entries(aineisto.naapurit)) {
      /*
       * Täyttö on vain aavistus: naapurista näytetään ÄÄRIVIIVA, ei
       * pintaa. Jatkuvassa pinnassa täyttö jää kokonaan pois — pinta on
       * jo maalattu topografiana (osio 2b), ja tasainen beessi lätäkkö
       * sen päällä latistaisi juuri sen maaston, jonka takia koko
       * kerros tehtiin.
       */
      if (!jatkuva) {
        g.fillStyle = 'rgba(152,130,98,0.20)';
        polku(g, maa.renkaat, 1.1, a3.charCodeAt(0) * 97 + 3, false, nk);
        g.fill('evenodd');
      }
      g.strokeStyle = 'rgba(56,38,24,1)';
      g.lineWidth = 2.3 * S * nk;
      g.lineJoin = 'round';
      polku(g, maa.renkaat, 0.9, a3.charCodeAt(1) * 31 + 7, false, nk);
      g.stroke();
    }

    /*
     * Vyöhykkeet: (etäisyys prototyyppipikseleinä, sumennus, peitto).
     * Ensimmäinen on rajaviivan tuntumassa lähes terävä, viimeinen
     * pelkkä aavistus. Reunapehmennys tehdään maskiin, jotta
     * vyöhykkeiden väliin ei jää näkyvää saumaa.
     */
    const vyot = [
      { d0: 0, d1: 26, blur: 0.4, alpha: 1 },
      { d0: 26, d1: 62, blur: 1.8, alpha: 0.82 },
      { d0: 62, d1: 120, blur: 4.5, alpha: 0.58 },
      { d0: 120, d1: 210, blur: 9.5, alpha: 0.36 },
      { d0: 210, d1: 1e9, blur: 17, alpha: 0.2 },
    ];

    const maskiC = uusiCanvas(nw, nh);
    const maskiG = maskiC.getContext('2d');
    const pala = uusiCanvas(nw, nh);
    const palaG = pala.getContext('2d');

    for (const v of vyot) {
      // 1) vyöhykkeen maski pehmeine reunoineen
      const im = maskiG.createImageData(nw, nh);
      const md = im.data;
      const liuku = 18;                 // prototyyppipikseleinä kuten d0/d1
      for (let y = 0; y < nh; y++) {
        for (let x = 0; x < nw; x++) {
          const dist = kentta.hae(x, y);
          let a = 0;
          if (dist >= v.d0 - liuku && dist <= v.d1 + liuku) {
            const ala = v.d0 === 0 ? 1 : Math.min(1, (dist - (v.d0 - liuku)) / (2 * liuku));
            const yla = v.d1 > 1e8 ? 1 : Math.min(1, ((v.d1 + liuku) - dist) / (2 * liuku));
            a = Math.max(0, Math.min(ala, yla));
          }
          md[(y * nw + x) * 4 + 3] = a * 255;
        }
      }
      maskiG.putImageData(im, 0, 0);

      // 2) sumennettu kopio tasosta
      palaG.clearRect(0, 0, nw, nh);
      palaG.filter = `blur(${v.blur * S * nk}px)`;
      palaG.drawImage(taso, 0, 0);
      palaG.filter = 'none';
      // 3) leikkaa maskilla ja liitä koko kuvan kokoisena
      palaG.globalCompositeOperation = 'destination-in';
      palaG.drawImage(maskiC, 0, 0);
      palaG.globalCompositeOperation = 'source-over';

      ctx.save();
      ctx.globalAlpha = v.alpha;
      ctx.drawImage(pala, 0, 0, nw, nh, 0, 0, W, H);
      ctx.restore();
    }
    vapauta(taso); vapauta(maskiC); vapauta(pala);
  }

  const maanMaski = maski(aineisto.maa.renkaat);

  /*
   * ================================================== 4. RANTAVYÖHYKKEET
   *
   * 1873-atlaksen tapa saada rannikko irti merestä. Sama rantaviiva
   * vedetään kolme kertaa yhä leveämpänä ja haaleampana, mutta VAIN
   * meren puolelle: leikkuri on koko kuva plus maan renkaat
   * evenodd-säännöllä, jolloin maa jää leikkurin ulkopuolelle eikä
   * vyöhyke vuoda rannalle. Jokainen saari saa vyönsä itsestään.
   */
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, W, H);
  polku(ctx, aineisto.maa.renkaat, 0, 1, true);
  ctx.clip('evenodd');
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  for (const [lev, a] of [[21, 0.05], [12, 0.055], [6, 0.065]]) {
    ctx.strokeStyle = `rgba(96,74,46,${a})`;
    // Puolet leveydestä jää maan puolelle; leikkuri syö sen.
    ctx.lineWidth = lev * 2 * S;
    polku(ctx, aineisto.maa.renkaat, 0.6, Math.round(lev * 13));
    ctx.stroke();
  }
  ctx.restore();

  /*
   * ================================================== 5. MAASTO
   *
   * Hypsometria, varjostus ja akvarellin rakeisuus omalle canvasille,
   * joka liitetään maskin läpi — reuna pysyy rantaviivassa.
   */
  {
    const maasto = uusiCanvas();
    const g = maasto.getContext('2d');
    const img = g.createImageData(W, H);
    const d = img.data;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        if (maanMaski[y * W + x] < 8) { d[i + 3] = 0; continue; }
        const lon = lonPikselista(x + 0.5);
        const lat = latPikselista(y + 0.5);
        let m = korkeus(lon, lat);
        if (!Number.isFinite(m)) m = 60;
        /*
         * Vyöhykkeen raja aaltoilee: korkeuteen lisätään kohinaa ENNEN
         * värihakua. Tämä on koko akvarellivaikutelman ydin —
         * mekaaninen ääriviiva katoaa ilman että muoto muuttuu.
         */
        const n1 = fbm(KOHINA, x / (26 * S), y / (26 * S), 4) - 0.5;
        const n2 = fbm(KOHINA2, x / (7 * S), y / (7 * S), 3) - 0.5;
        const v = lerpVari(ASTEIKKO, Math.max(0, m + n1 * 190 + n2 * 60));

        const s = varjostus(lon, lat);
        const varjo = (0.5 - s) * 0.46;                 // + = tummenna
        // Rakeisuus: pigmentti kasautuu paperin kuoppiin.
        const rae = (KOHINA2(x / (2.1 * S), y / (2.1 * S)) - 0.5) * 13;
        const laikka = (fbm(KOHINA, x / (95 * S), y / (95 * S), 3) - 0.5) * 12;
        const t = (k) => Math.max(0, Math.min(255,
          k * (1 - varjo) + rae + laikka + (varjo > 0 ? 0 : varjo * 30)));
        d[i] = t(v[0]);
        d[i + 1] = t(v[1] * (1 - varjo * 0.12));
        d[i + 2] = t(v[2] * (1 - varjo * 0.3));
        d[i + 3] = Math.min(255, maanMaski[y * W + x]);
      }
    }
    g.putImageData(img, 0, 0);
    ctx.drawImage(maasto, 0, 0);
    vapauta(maasto);
  }

  /*
   * ================================================== 6. JOET JA JÄRVET
   *
   * VAIN maan sisällä. Rajaus on koko fokusmoodin sääntö pienoiskoossa:
   * naapurimaassa ei ole dataa, joten Ohridin järvi ja Drin katkeavat
   * rajalle. Leikkuri on maan renkaat, ei aineiston karsinta — sama
   * temppu toimii millä tahansa maalla ilman esikäsittelyä.
   */
  ctx.save();
  polku(ctx, aineisto.maa.renkaat);
  ctx.clip('evenodd');
  for (const j of aineisto.jarvet) {
    ctx.fillStyle = 'rgba(203,200,182,0.9)';
    polku(ctx, j.renkaat, 0.8, (j.nimi.length + 11) * 17);
    ctx.fill('evenodd');
    ctx.strokeStyle = 'rgba(118,107,80,0.8)';
    ctx.lineWidth = 1.2 * S;
    ctx.stroke();
  }
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const j of aineisto.joet) {
    // Kaksi vetoa: kostea reuna ja sen sisällä uoma.
    const paino = j.luokka <= 7 ? 1 : 0.78;
    ctx.strokeStyle = 'rgba(120,109,82,0.42)';
    ctx.lineWidth = 4.4 * paino * S;
    viivaPolku(ctx, j.osat); ctx.stroke();
    ctx.strokeStyle = 'rgba(88,78,56,1)';
    ctx.lineWidth = 1.7 * paino * S;
    viivaPolku(ctx, j.osat); ctx.stroke();
  }
  ctx.restore();

  // ============================================ 7. RANTAVIIVA
  // Kynä akvarellin päällä, kaksi vetoa.
  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgba(74,52,33,0.20)';
  ctx.lineWidth = 3.4 * S;
  polku(ctx, aineisto.maa.renkaat, 1.4, 555);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(58,40,25,0.9)';
  ctx.lineWidth = 1.35 * S;
  polku(ctx, aineisto.maa.renkaat, 0.35, 909);
  ctx.stroke();
  ctx.restore();

  /* ================================================== 8. MERKINNÄT */

  /**
   * Yksi tekstirivi. `vali` on kirjainväli prototyyppipikseleinä ja
   * merkit piirretään yksitellen, koska canvasin `letterSpacing` ei ole
   * kaikissa selaimissa — ja koska harvennus on tämän kartan tyyli.
   */
  const teksti = (s, x, y, {
    koko = 13, fontti = '"Liberation Serif", serif', tyylitys = '', vari = MUSTE,
    ank = 'left', vali = 0, halo = 'rgba(232,220,188,0.85)', haloLev = 3.2, kulma = 0,
  } = {}) => {
    ctx.save();
    ctx.translate(x, y);
    if (kulma) ctx.rotate(kulma * Math.PI / 180);
    ctx.font = `${tyylitys} ${koko * S}px ${fontti}`.trim();
    ctx.textBaseline = 'middle';
    const merkit = [...s];
    const lev = merkit.reduce((sum, m) => sum + ctx.measureText(m).width, 0)
      + vali * S * (merkit.length - 1);
    const alku = ank === 'center' ? -lev / 2 : ank === 'right' ? -lev : 0;
    ctx.textAlign = 'left';
    if (halo) {
      ctx.strokeStyle = halo;
      ctx.lineWidth = haloLev * S;
      ctx.lineJoin = 'round';
      let t = alku;
      for (const m of merkit) { ctx.strokeText(m, t, 0); t += ctx.measureText(m).width + vali * S; }
    }
    ctx.fillStyle = vari;
    let t = alku;
    for (const m of merkit) { ctx.fillText(m, t, 0); t += ctx.measureText(m).width + vali * S; }
    ctx.restore();
    return lev;
  };

  // 8a. Kohdemaan nimi: iso harva versaali maan päällä, hyvin haaleana.
  if (tyyli.vesileima) {
    const v = tyyli.vesileima;
    teksti(v.teksti, kuvaX(v.lon), kuvaY(v.lat), {
      koko: v.koko ?? 31, vali: v.vali ?? 11, ank: 'center',
      fontti: '"FreeSerif", serif', vari: 'rgba(70,48,29,0.26)', halo: null,
    });
  }

  // 8b. Merten nimet: harvaa kursiivia, ei haloa — ne jäävät paperiin.
  for (const m of tyyli.meret ?? []) {
    teksti(m.nimi, kuvaX(m.lon), kuvaY(m.lat), {
      koko: m.koko, tyylitys: 'italic', vari: 'rgba(120,108,84,0.72)',
      ank: 'center', vali: m.koko * 0.28, kulma: m.kulma ?? 0, halo: null,
    });
  }

  /*
   * 8c. Naapurimaiden nimet: haaleina, samassa suhteessa kuin niiden
   * ääriviiva. Kehyksen sisäreuna on yläraja — nimi ei saa jäädä viivan
   * alle.
   */
  {
    /*
     * Rajat, joiden sisään nimi on mahduttava. Lehtiasussa se on
     * kehyksen sisäreuna; jatkuvassa pinnassa kehystä ei ole, joten
     * rajana on kuvan oma reuna — nimi saa mennä vuodon puolelle,
     * koska sielläkin on karttaa.
     */
    const ylaraja = (jatkuva ? 0 : ry0) + 46 * S;
    const vasen = jatkuva ? 24 * S : rx0;
    const oikea = jatkuva ? W - 24 * S : rx1;
    const alaraja = jatkuva ? H - 24 * S : ry1;
    for (const n of tyyli.naapurit ?? []) {
      if (!aineisto.naapurit?.[n.iso]) continue;
      const x = kuvaX(n.lon);
      const y0 = kuvaY(n.lat);
      const y = Math.max(ylaraja, y0);
      if (x < vasen || x > oikea || y0 > alaraja) continue;
      const dist = kentta.haeKuvasta(
        Math.max(0, Math.min(W - 1, Math.round(x))),
        Math.max(0, Math.min(H - 1, Math.round(y))),
      );
      const a = Math.max(0.14, 0.62 - dist / 420);
      teksti(n.nimi.toUpperCase(), x, y, {
        koko: 14, vali: 3.4, ank: 'center',
        vari: `rgba(74,52,33,${a.toFixed(2)})`, halo: null,
      });
    }
  }

  // 8d. Jokien nimet kursiivilla uoman varteen.
  for (const j of aineisto.joet) {
    const nimi = tyyli.jokinimet?.[j.nimi];
    if (!nimi) continue;
    const osa = j.osat.reduce((a, b) => (b.length > a.length ? b : a), j.osat[0]);
    const i = Math.floor(osa.length * 0.55);
    const x = kuvaX(osa[i][0]); const y = kuvaY(osa[i][1]);
    const j2 = Math.min(osa.length - 1, i + 3);
    const x2 = kuvaX(osa[j2][0]); const y2 = kuvaY(osa[j2][1]);
    let kulma = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI;
    if (kulma > 90) kulma -= 180;
    if (kulma < -90) kulma += 180;
    teksti(nimi, x, y - 8 * S, {
      koko: 11.5, tyylitys: 'italic', vari: 'rgba(96,86,62,0.95)',
      ank: 'center', kulma,
    });
  }

  // 8e. Vuoret: pieni hachure-kolmio ja kursiivinimi + korkeus.
  for (const v of tyyli.vuoret ?? []) {
    const x = kuvaX(v.lon); const y = kuvaY(v.lat);
    const r = (v.iso ? 9 : 6.5) * S;
    ctx.save();
    ctx.strokeStyle = 'rgba(58,40,25,0.8)';
    ctx.lineWidth = 1.15 * S;
    ctx.lineJoin = 'round';
    const hx = x; const hy = y - r * 0.75;
    const jalka = r * 0.65;
    ctx.beginPath();
    ctx.moveTo(x - r, y + jalka);
    ctx.lineTo(hx, hy);
    ctx.lineTo(x + r, y + jalka);
    ctx.stroke();
    /*
     * Hachure: viivat huipulta jalkaa kohti. 1873-atlaksen vuoret ovat
     * viivoitusta, eivät pisteitä.
     */
    ctx.lineWidth = 0.75 * S;
    ctx.strokeStyle = 'rgba(58,40,25,0.4)';
    for (let i = 1; i <= 4; i++) {
      const t = i / 5;
      ctx.beginPath();
      ctx.moveTo(hx + (x - r - hx) * t * 0.55, hy + (jalka + r * 0.75) * t * 0.55);
      ctx.lineTo(hx + (x - r - hx) * t, y + jalka);
      ctx.moveTo(hx + (x + r - hx) * t * 0.55, hy + (jalka + r * 0.75) * t * 0.55);
      ctx.lineTo(hx + (x + r - hx) * t, y + jalka);
      ctx.stroke();
    }
    ctx.restore();
    teksti(v.nimi, x, y + r * 1.9, {
      koko: v.iso ? 13 : 11, tyylitys: 'italic', ank: 'center',
      vari: 'rgba(74,52,33,0.92)',
    });
    teksti(`${v.m} m`, x, y + r * 1.9 + (v.iso ? 15 : 13) * S, {
      koko: v.iso ? 10 : 9, ank: 'center', vari: 'rgba(110,88,62,0.85)',
    });
  }

  /*
   * 8f. Kaupungit — EI PELILAATTOJA (ks. tiedoston sääntö 3). Pieni
   * rengas ja nimi, aivan kuten prototyypissä; pelilaatan tyylinen iso
   * kiekko tähtineen kuuluu pelille.
   */
  for (const k of tyyli.kaupungit ?? []) {
    const x = kuvaX(k.lon); const y = kuvaY(k.lat);
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 4.2 * S, 0, Math.PI * 2);
    ctx.fillStyle = '#f5ebd4';
    ctx.fill();
    ctx.strokeStyle = '#4a3421';
    ctx.lineWidth = 1.5 * S;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 1.3 * S, 0, Math.PI * 2);
    ctx.fillStyle = '#4a3421';
    ctx.fill();
    ctx.restore();
    teksti(k.nimi, x + (k.dx ?? 9) * S, y + (k.dy ?? 0) * S, {
      koko: 13.5, ank: k.ank || 'left', vali: 0.5,
    });
  }

  /*
   * ================================================== 9. LEHDEN KEHYS
   *
   * Vinjetti, kaksoiskehys, asteverkon ruksit reunalukemineen,
   * mittajana ja kartuutsi — kaikki RAJAUKSEN mittojen mukaan, ei
   * kuvan. Kuvan ja rajauksen väliin jäävä vuoto on paperia, jonka
   * kamera näyttää vain sen verran kuin ruudun kuvasuhde vaatii.
   *
   * === JATKUVASSA PINNASSA TÄTÄ EI PIIRRETÄ LAINKAAN ===
   *
   * Jokainen tämän osion elementti on SIVUA eikä karttaa, ja jokainen
   * niistä kertoo katsojalle, missä kuva loppuu: kehysviiva rajaa,
   * reunalukemat istuvat kehyksessä, kartuutsi ja mittajana ovat
   * kehyksen nurkissa. Vinjetti kuuluu samaan joukkoon — se tummentaa
   * kuvan reunaa ja piirtää siten laudalle suorakaiteen ilman yhtään
   * viivaa.
   *
   * Kartuutsin ja mittajanan piirtää nyt peli ruutuun ankkuroituna
   * (js/fokusmitat.js), ja mittajana laskee pituutensa TODELLISESTA
   * zoomista — kuvaan poltettu 200 km valehteli heti kun pelaaja
   * lähensi karttaa. Asteverkon reunalukemat jäivät toistaiseksi pois
   * kokonaan (ks. js/fokusmitat.js).
   */
  if (!jatkuva) {
    ctx.save();
    // Vinjetti koko kuvan yli: lehti tummenee reunoilta kuin vanha paperi.
    const g = ctx.createRadialGradient(W / 2, H * 0.46, H * 0.25, W / 2, H * 0.5, H * 0.95);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(88,62,32,0.20)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    const m = 22 * S;
    const kx0 = rx0 + m; const ky0 = ry0 + m;
    const kx1 = rx1 - m; const ky1 = ry1 - m;
    ctx.strokeStyle = 'rgba(74,52,33,0.75)';
    ctx.lineWidth = 2.4 * S;
    ctx.strokeRect(kx0, ky0, kx1 - kx0, ky1 - ky0);
    ctx.lineWidth = 0.9 * S;
    ctx.strokeStyle = 'rgba(74,52,33,0.5)';
    ctx.strokeRect(kx0 + 6 * S, ky0 + 6 * S, (kx1 - kx0) - 12 * S, (ky1 - ky0) - 12 * S);

    // Asteikkoruksit reunoihin (koko astetta).
    ctx.strokeStyle = 'rgba(74,52,33,0.6)';
    ctx.lineWidth = 1.2 * S;
    const lonAlku = Math.ceil(lautaLon(rajaus.x));
    const lonLoppu = Math.floor(lautaLon(rajaus.x + rajaus.w));
    for (let lon = lonAlku; lon <= lonLoppu; lon++) {
      const x = kuvaX(lon);
      if (x < kx0 || x > kx1) continue;
      const pit = lon % 2 === 0 ? 9 : 5;
      ctx.beginPath();
      ctx.moveTo(x, ky0 + 6 * S); ctx.lineTo(x, ky0 + (6 + pit) * S);
      ctx.moveTo(x, ky1 - 6 * S); ctx.lineTo(x, ky1 - (6 + pit) * S);
      ctx.stroke();
      if (lon % 2 === 0) {
        teksti(`${lon}°`, x, ky1 - 24 * S, {
          koko: 9.5, ank: 'center', vari: 'rgba(74,52,33,0.7)', halo: null,
        });
      }
    }
    const latAla = Math.ceil(lautaLat(rajaus.y + rajaus.h));
    const latYla = Math.floor(lautaLat(rajaus.y));
    for (let lat = latAla; lat <= latYla; lat++) {
      const y = kuvaY(lat);
      if (y < ky0 || y > ky1) continue;
      const pit = lat % 2 === 0 ? 9 : 5;
      ctx.beginPath();
      ctx.moveTo(kx0 + 6 * S, y); ctx.lineTo(kx0 + (6 + pit) * S, y);
      ctx.moveTo(kx1 - 6 * S, y); ctx.lineTo(kx1 - (6 + pit) * S, y);
      ctx.stroke();
      if (lat % 2 === 0) {
        teksti(`${lat}°`, kx0 + 20 * S, y, {
          koko: 9.5, vari: 'rgba(74,52,33,0.7)', halo: null,
        });
      }
    }

    /*
     * MITTAJANA: 200 km lehden alaoikeaan. Pituus mitataan lehden omalla
     * keskileveysasteella, koska Millerin lieriössä kilometri on eri
     * määrä pikseleitä pohjoisessa ja etelässä.
     */
    const km = 200;
    const keskiLat = lautaLat(rajaus.y + rajaus.h / 2);
    const keskiLon = lautaLon(rajaus.x + rajaus.w / 2);
    const ax = kuvaX(keskiLon);
    const bx = kuvaX(keskiLon + km / (111.32 * Math.cos(keskiLat * Math.PI / 180)));
    const pit = bx - ax;
    const sx = kx1 - 34 * S - pit; const sy = ky1 - 46 * S;
    ctx.strokeStyle = 'rgba(74,52,33,0.85)';
    ctx.fillStyle = 'rgba(74,52,33,0.85)';
    ctx.lineWidth = 1.3 * S;
    ctx.strokeRect(sx, sy, pit, 6 * S);
    for (let i = 0; i < 4; i += 2) ctx.fillRect(sx + pit * i / 4, sy, pit / 4, 6 * S);
    teksti('0', sx, sy - 9 * S, { koko: 9.5, ank: 'center', halo: null });
    teksti(`${km} km`, sx + pit, sy - 9 * S, { koko: 9.5, ank: 'center', halo: null });

    // KARTUUTSI vasempaan alakulmaan.
    const cx = kx0 + 30 * S; const cy = ky1 - 74 * S;
    teksti(tyyli.otsikko, cx, cy, { koko: 24, vali: 3.4, vari: '#3a2819', halo: null });
    ctx.strokeStyle = 'rgba(74,52,33,0.6)';
    ctx.lineWidth = 1 * S;
    ctx.beginPath();
    ctx.moveTo(cx, cy + 16 * S); ctx.lineTo(cx + 250 * S, cy + 16 * S);
    ctx.stroke();
    if (tyyli.alaotsikko) {
      teksti(tyyli.alaotsikko, cx, cy + 30 * S, {
        koko: 12, tyylitys: 'italic', vari: 'rgba(74,52,33,0.8)', halo: null,
      });
    }
    ctx.restore();
  }

  /*
   * ================================================== 10. PAPERIN RAE
   *
   * Viimeinen kerros koko lehden yli: rae sitoo maalin ja musteen
   * yhteen, jottei mikään osa näytä liimatulta.
   */
  {
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const rae = (KOHINA2(x / (1.35 * S) + 40, y / (1.35 * S) + 40) - 0.5) * 8;
        const kuitu = (fbm(KOHINA, x / (30 * S) + 11, y / (4 * S) + 11, 2) - 0.5) * 5;
        d[i] = Math.max(0, Math.min(255, d[i] + rae + kuitu));
        d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + rae + kuitu));
        d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + (rae + kuitu) * 0.9));
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  /*
   * ================================================== 11. REUNAHÄIVYTYS
   *
   * Kuvan uloin reuna häivytetään läpinäkyväksi. Vuoto riittää
   * peittämään ruudun kaikissa vaakakuvasuhteissa, mutta pystyssä
   * kamera näyttää lehteä korkeammalta kuin vuotoa riittää — ja silloin
   * kuvan reuna olisi terävä viiva keskellä ulappaa. Häivytys tekee
   * siitä sulavan siirtymän laudan omaan pergamenttiin.
   *
   * Häivytys on kolmasosa vuodosta, jolloin täysin peittävää paperia on
   * yhä kaksi kolmasosaa: lehti ei siis kutistu, vaan sen ulkoreuna
   * pehmenee.
   */
  {
    const vuotoX = Math.max(1, rx0);
    const vuotoY = Math.max(1, ry0);
    const hx = vuotoX / 3;
    const hy = vuotoY / 3;
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let y = 0; y < H; y++) {
      const ay = Math.min(1, Math.min(y + 0.5, H - 0.5 - y) / hy);
      for (let x = 0; x < W; x++) {
        const ax = Math.min(1, Math.min(x + 0.5, W - 0.5 - x) / hx);
        const a = Math.min(ax, ay);
        if (a < 1) d[(y * W + x) * 4 + 3] = Math.round(255 * a);
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  /*
   * ================================================== 12. TARKISTUSKUVA
   *
   * (vain --tarkistus) Päälle piirretään pelilaudan OMAT maarenkaat
   * (js/packs/*-countries) ja risti jokaisen tarkistuskaupungin
   * laattakoordinaattiin. Jos projektio on oikein, risti osuu
   * rannikolle oikeaan kohtaan ja laudan rengas kulkee muutaman yksikön
   * päässä NE 10m -rannikosta (laudalla on karkeampi 50m-aineisto).
   * Tämä kuva EI ole se, joka viedään ämpäriin.
   */
  if (tarkistus) {
    ctx.save();
    ctx.strokeStyle = 'rgba(190,40,40,0.85)';
    ctx.lineWidth = 2;
    for (const rengas of tarkistus.renkaat ?? []) {
      ctx.beginPath();
      rengas.forEach(([bx, by], i) => {
        const x = (bx - bbox.x) * px;
        const y = (by - bbox.y) * px;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(20,60,200,0.95)';
    ctx.lineWidth = 3;
    for (const { x: bx, y: by } of tarkistus.ristit ?? []) {
      const x = (bx - bbox.x) * px;
      const y = (by - bbox.y) * px;
      const r = 26;
      ctx.beginPath();
      ctx.moveTo(x - r, y); ctx.lineTo(x + r, y);
      ctx.moveTo(x, y - r); ctx.lineTo(x, y + r);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, r * 0.45, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  /*
   * ================================================== 13. ESIKATSELU
   *
   * (vain --esikatselu) Lehti on opaakki, mutta sen häivytetty reuna ei
   * ole: katselin näyttää läpinäkyvyyden mustana, ja reuna näyttäisi
   * siltä kuin lehti olisi palanut. Tausta lisätään KAIKEN ALLE
   * (destination-over), joten kuva itse on täsmälleen sama.
   */
  if (esikatseluTausta) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = esikatseluTausta;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  return { w: W, h: H };
}
