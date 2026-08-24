/*
 * FOKUSKARTAN PIIRTOMOOTTORI — yksi maa 1873-atlaksen akvarellina.
 *
 * Tämä tiedosto ajetaan SELAIMESSA (tools/tee-fokuskartta.mjs käynnistää
 * Chromiumin ja syöttää aineiston tänne), koska koko kuva rakentuu
 * canvasin omilla työkaluilla: monikulmion rasterointi maskiksi,
 * evenodd-leikkurit ja sumennussuodatin. Ne kaikki jouduttaisiin
 * kirjoittamaan käsin, jos kuva tehtäisiin Nodessa.
 *
 * Tyyli on omistajan 24.8.2026 hyväksymä prototyyppi (variantti B).
 *
 * === MIKÄ TÄSSÄ ON TOISIN KUIN PROTOTYYPISSÄ ===
 *
 * 1. PROJEKTIO ON LAUDAN, EI MERCATORIN. Kuva liimataan pelilaudalle,
 *    joten sen on käytettävä laudan omaa kaavaa — pelilaudalla Millerin
 *    lieriötä, maanosalaudoilla tasaväliä (ks. laudanProjektio). Väärä
 *    kaava siirtäisi maan pohjoisosaa kymmeniä yksikköjä, ja kaupunkien
 *    laatat jäisivät maaston viereen.
 *
 * 2. VAIN KOHDEMAA, LÄPINÄKYVÄ TAUSTA. Naapureita ei piirretä
 *    (fokusmoodin harso hoitaa ne pelissä) eikä merta väritetä: lauta on
 *    kuvan alla, ja sen oma pergamentti ja meri jäävät näkyviin. Peittävä
 *    meripohja jättäisi kuvan reunaan suoran sävyrajan keskelle
 *    Egeanmerta — läpinäkyvyys sulattaa kuvan lautaan.
 *
 * 3. EI YHTÄÄN TEKSTIÄ, ei kehystä, mittajanaa, kartuutsia eikä
 *    asteverkkoa. Nimet piirtää peli SVG:nä, jotta ne pysyvät terävinä
 *    joka zoomilla ja suomeksi.
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
  const { bbox, projektio, leveys, tarkistus, esikatseluTausta } = asetukset;
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
   * Tekstuurien mittakaava. Prototyyppi hiottiin 1600 pikseliä leveänä,
   * joten kaikki kuitujen, rakeen ja siveltimen mitat kerrotaan
   * suhteella — muuten sama kuva eri leveydellä olisi eri näköinen.
   */
  const S = W / 1600;

  // --- projektio: asteet -> lauta -> kuvapikselit ja takaisin --------
  const { lautaX, lautaY, lautaLon, lautaLat } = laudanProjektio(projektio);
  const kuvaX = (lon) => (lautaX(lon) - bbox.x) * px;
  const kuvaY = (lat) => (lautaY(lat) - bbox.y) * px;
  const lonPikselista = (x) => lautaLon(bbox.x + x / px);
  const latPikselista = (y) => lautaLat(bbox.y + y / px);

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

  /** Renkaat polkuna; jitter tekee reunasta siveltimen jäljen. */
  const polku = (g, renkaat, jitter = 0, siemen = 1, jatka = false) => {
    const rnd = mulberry32(siemen);
    if (!jatka) g.beginPath();
    for (const rengas of renkaat) {
      for (let i = 0; i < rengas.length; i++) {
        let x = kuvaX(rengas[i][0]);
        let y = kuvaY(rengas[i][1]);
        if (jitter) {
          x += (rnd() - 0.5) * jitter * S;
          y += (rnd() - 0.5) * jitter * S;
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

  const uusiCanvas = () => {
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    return c;
  };

  /** Maan alue alfamaskiksi (Uint8, koko kuva). */
  const maski = (renkaat) => {
    const c = uusiCanvas();
    const g = c.getContext('2d');
    g.fillStyle = '#000';
    polku(g, renkaat);
    g.fill('evenodd');
    const d = g.getImageData(0, 0, W, H).data;
    const m = new Uint8Array(W * H);
    for (let i = 0, j = 3; i < m.length; i++, j += 4) m[i] = d[j];
    return m;
  };

  const maanMaski = maski(aineisto.maa.renkaat);

  /*
   * 1. RANTAVYÖHYKKEET — 1873-atlaksen tapa saada rannikko irti merestä.
   *
   * Sama rantaviiva vedetään kolme kertaa yhä leveämpänä ja haaleampana,
   * mutta VAIN meren puolelle: leikkuri on koko kuva plus maan renkaat
   * evenodd-säännöllä, jolloin maa jää leikkurin ulkopuolelle eikä
   * vyöhyke vuoda rannalle. Jokainen saari saa vyönsä itsestään.
   *
   * Nämä ovat ainoa kohta, jossa kuva maalaa laudan MERELLE. Se on
   * tarkoituksellista: vyö on läpikuultava ja häviää muutamassa
   * lautayksikössä, joten se sävyttää laudan oman meren rannan tummaksi
   * eikä peitä sitä.
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
   * 2. MAASTO: hypsometria, varjostus ja akvarellin rakeisuus omalle
   * canvasille, joka liitetään maskin läpi — reuna pysyy rantaviivassa.
   */
  const maasto = uusiCanvas();
  {
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
  }
  ctx.drawImage(maasto, 0, 0);

  /*
   * 3. JOET JA JÄRVET — VAIN maan sisällä.
   *
   * Rajaus on koko fokusmoodin sääntö pienoiskoossa: naapurimaassa ei
   * ole dataa, joten Ohridin järvi ja Drin katkeavat rajalle. Leikkuri
   * on maan renkaat, ei aineiston karsinta — sama temppu toimii millä
   * tahansa maalla ilman esikäsittelyä.
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

  // 4. Rantaviiva: kynä akvarellin päällä, kaksi vetoa.
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

  /*
   * 5. Paperin rae koko kuvan yli — mutta VAIN sinne, missä on jo
   * maalia. Läpinäkyvä tausta on laudan omaa pergamenttia, eikä sitä saa
   * sävyttää: rae kerrotaan pikselin alfalla, joten meri jää koskematta
   * ja rantavyöhykkeen häivähdys saa rakeensa samassa suhteessa kuin
   * itse väriä.
   */
  {
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const a = d[i + 3];
        if (!a) continue;
        const rae = (KOHINA2(x / (1.35 * S) + 40, y / (1.35 * S) + 40) - 0.5) * 8;
        const kuitu = (fbm(KOHINA, x / (30 * S) + 11, y / (4 * S) + 11, 2) - 0.5) * 5;
        const v = (rae + kuitu) * (a / 255);
        d[i] = Math.max(0, Math.min(255, d[i] + v));
        d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + v));
        d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + v * 0.9));
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  /*
   * 6. TASAUKSEN TARKISTUSKUVA (vain --tarkistus).
   *
   * Päälle piirretään pelilaudan OMAT maarenkaat (js/packs/*-countries)
   * ja risti jokaisen tarkistuskaupungin laattakoordinaattiin. Jos
   * projektio on oikein, risti osuu rannikolle oikeaan kohtaan ja laudan
   * rengas kulkee muutaman yksikön päässä NE 10m -rannikosta (laudalla
   * on karkeampi 50m-aineisto). Tämä kuva EI ole se, joka viedään
   * ämpäriin.
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
   * 7. ESIKATSELUTAUSTA (vain --esikatselu).
   *
   * Läpinäkyvää kuvaa ei voi arvioida katselimessa, joka näyttää
   * läpinäkyvyyden mustana: rantavyöhykkeen viiden prosentin häivähdys
   * näyttää siellä paksulta tummalta renkaalta, vaikka pelilaudan
   * pergamentin päällä se on tuskin havaittava. Tausta lisätään
   * KAIKEN ALLE (destination-over), joten kuva itse on täsmälleen sama.
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
