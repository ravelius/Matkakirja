/*
 * YLEISLEHDEN PIIRTOMOOTTORI — koko pelilauta yhtenä 1873-atlaksen
 * lehtenä, ilman yhtäkään korostettua maata.
 *
 * Tämä ajetaan SELAIMESSA aivan kuten maalehtien moottori
 * (tools/fokuskartta/piirto.js): tools/tee-yleislehti.mjs käynnistää
 * Chromiumin, syöttää aineiston ja tallentaa canvasin.
 *
 * === MIKSI OMA MOOTTORI EIKÄ LIPPU MAALEHDEN MOOTTORIIN ===
 *
 * Maalehden moottori on rakennettu YHDEN MAAN ympärille: siinä on
 * kohdemaan maski, etäisyyskenttä kohdemaan rannikosta, naapurien
 * sumenevat vyöhykkeet ja kaikki merkinnät (vesileima, naapurien nimet,
 * kaupungit) suhteessa siihen maahan. Yleislehdessä EI OLE kohdemaata
 * — juuri se on koko tilauksen ydin (omistaja 26.8.2026: uloszoomattu
 * maailma näyttää tilkkutäkiltä, koska jokainen maalehti korostaa omaa
 * maataan ja piirtää naapurit haaleina. Kaukozoomiin tarvitaan yksi
 * yhtenäinen kartta, jossa kaikki maat ovat samalla voimalla).
 *
 * Lippu maalehden moottoriin olisi tarkoittanut ehtoa jokaisen kerroksen
 * ympärille — ja niiden ehtojen alle jäisi juuri se koodi, joka tekee
 * maalehdestä maalehden. Sen sijaan PALETTI ja KOHINA tuodaan
 * maalehden moottorista sellaisenaan (piirto.js vie ne), joten
 * lehtilajien paperi, hypsometria ja meren syvyysporrastus ovat
 * samasta lähteestä eivätkä voi ajautua eri sävyihin.
 *
 * === MITÄ TÄSSÄ ON JA MITÄ EI ===
 *
 *   ON     opaakki paperi, meren syvyysporrastus, akvarellihypsometria
 *          varjostuksineen, rannikko, isot järvet, harva asteverkko ja
 *          muutama valtameren nimi kursiivilla.
 *
 *   EI OLE maakorostusta, rajaviivoja, naapurien sumennusta,
 *          kartuutsia, mittajanaa, kehystä eikä yhtäkään kaupunkia.
 *          Kaupunkien nimet ovat pelin omia laattoja (js/ui.js), ja
 *          kaukozoomissa niitä ei muutenkaan lueta.
 *
 * === LAUTA KIERTÄÄ, JA SE ON PIIRRON ASIA ===
 *
 * Lehti kattaa koko laudan eli täyden 360 asteen kierroksen
 * pituusasteelta −175 asteelle +185. Projektio (piirto.js
 * laudanProjektio) palauttaa jokaiselle pituusasteelle x:n väliltä
 * [0, 12000), joten päivämääränrajan yli kulkeva viiva hyppäisi laudan
 * laidasta toiseen ja piirtäisi vaakasuoran viivan yli koko kartan. Siksi
 * JOKAINEN viiva katkaistaan siellä, missä x hyppää yli puolen kuvan
 * (`viivaPolku`). Sama sääntö koskee rannikkoa, järviä ja asteverkkoa.
 */

import {
  ASTEIKKO, KOHINA, KOHINA2, MUSTE, PAPERI,
  fbm, laudanProjektio, lerpSyvyys, lerpVari,
} from './piirto.js';

/* =========================================================== moottori */

export function piirraMaailma(canvas, aineisto, asetukset) {
  const {
    bbox, projektio, leveys, tyyli = {}, esikatseluTausta,
  } = asetukset;

  const px = leveys / bbox.w;
  const W = Math.round(leveys);
  const H = Math.round(bbox.h * px);
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  /*
   * S = MITTAKAAVA SUHTEESSA VIITETARKKUUTEEN (6400 px).
   *
   * Maalehdessä S on yksi PROTOTYYPPIPIKSELI, koska sen mitat on hiottu
   * 1600 pikselin levyisenä lehtenä. Yleislehdellä sellaista prototyyppiä
   * ei ole: sen mitat — paperin rae, rannikon viivanleveys, nimien koko —
   * on säädetty silmällä 6400 pikselin kuvasta, joka on se tarkkuus,
   * jolla lehti tehdään. Näin `--leveys 9600` tuo lisää pikseleitä eikä
   * isompaa tekstiä, aivan kuten maalehdillä.
   */
  const S = leveys / 6400;

  // --- projektio: asteet -> lauta -> kuvapikselit ja takaisin --------
  const { lautaX, lautaY, lautaLon, lautaLat } = laudanProjektio(projektio);
  const kuvaX = (lon) => (lautaX(lon) - bbox.x) * px;
  const kuvaY = (lat) => (lautaY(lat) - bbox.y) * px;
  const lonPikselista = (x) => lautaLon(bbox.x + x / px);
  const latPikselista = (y) => lautaLat(bbox.y + y / px);

  // --- korkeusruudukko ------------------------------------------------
  const K = aineisto.korkeus;
  const GRID = K.grid;
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
   * MAA VAI MERI — sama sääntö kuin maalehdillä: ETOPO alle nollan JA
   * piste Natural Earthin meren alalla. Merenpinnan alapuolinen KUIVA
   * maa (Kaspian alanko, Kuollutmeri, Qattara) jää siis maaksi, ja
   * Kaspianmeri on vettä vaikka se on järvi. Ks. aineisto.mjs.
   */
  const MERI = aineisto.meri ?? null;
  const merenAlalla = (lon, lat) => {
    if (!MERI) return true;
    const x = Math.round((lon - K.lon0) / DLON);
    const y = Math.round((K.lat1 - lat) / DLAT);
    if (x < 0 || y < 0 || x > K.w - 1 || y > K.h - 1) return true;
    const i = y * K.w + x;
    return ((MERI[i >> 3] >> (i & 7)) & 1) === 1;
  };

  /*
   * Varjostus: valo luoteesta, askel ruudukon väli METREINÄ. Sama kaava
   * kuin maalehdellä; liioittelu on hitusen maltillisempi, koska
   * yleislehden ruudukko on kolme kaariminuuttia eikä yksi — samalla
   * kertoimella rinteet olisivat kaukozoomissa rakeisia.
   */
  const M_PER_AST = 111320;
  const varjostus = (lon, lat) => {
    const d = DLON;
    const dzdx = (korkeus(lon + d, lat) - korkeus(lon - d, lat))
      / (2 * d * M_PER_AST * Math.cos(lat * Math.PI / 180));
    const dzdy = (korkeus(lon, lat + d) - korkeus(lon, lat - d)) / (2 * d * M_PER_AST);
    if (!Number.isFinite(dzdx) || !Number.isFinite(dzdy)) return 0.5;
    const z = 2.6;
    const nx = -dzdx * z; const ny = -dzdy * z; const nz = 1;
    const len = Math.hypot(nx, ny, nz);
    const az = 315 * Math.PI / 180; const alt = 42 * Math.PI / 180;
    const lx = Math.cos(alt) * Math.sin(az); const ly = Math.cos(alt) * Math.cos(az);
    const lz = Math.sin(alt);
    return Math.max(0, (nx * lx + ny * ly + nz * lz) / len);
  };

  /* ================================================== 1-3. PINTA
   *
   * Paperi, meri ja maasto YHDELLÄ pikselikierroksella.
   *
   * Maalehdellä nämä ovat kolme erillistä kierrosta, koska sen maasto
   * tarvitsee oman canvasin ja maskin (rannikko leikataan kohdemaan
   * monikulmiosta). Yleislehdellä maskia ei ole — maan ja meren raja
   * tulee ruudukosta — joten jokainen pikseli osaa maalata itsensä
   * kerralla. Ero on iso: koko kuva on 6400 x 2880 eli 18 megapikseliä,
   * ja jokainen ylimääräinen ImageData on 74 megatavua.
   */
  {
    const img = ctx.createImageData(W, H);
    const d = img.data;
    // Paperin pohjaväri kolmena lukuna, jottei sitä pilkota silmukassa.
    const pohja = [
      parseInt(PAPERI.slice(1, 3), 16),
      parseInt(PAPERI.slice(3, 5), 16),
      parseInt(PAPERI.slice(5, 7), 16),
    ];
    for (let y = 0; y < H; y++) {
      const lat = latPikselista(y + 0.5);
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        // --- paperi: kuitujuovat, rae ja laikut ---
        const kuitu = fbm(KOHINA, x / (52 * S), y / (7 * S), 3) - 0.5;
        const rae = KOHINA2(x / (1.7 * S), y / (1.7 * S)) - 0.5;
        const laikka = fbm(KOHINA2, x / (260 * S), y / (260 * S), 3) - 0.5;
        const v = kuitu * 9 + rae * 11 + laikka * 16;
        let r = pohja[0] + v * 1.05;
        let g = pohja[1] + v;
        let b = pohja[2] + v * 0.82;

        const lon = lonPikselista(x + 0.5);
        let m = korkeus(lon, lat);
        const vesi = Number.isFinite(m) ? (m < 0 && merenAlalla(lon, lat)) : true;
        if (vesi) {
          // --- meri: syvyysvyöhykkeet, raja aaltoilee kohinasta ---
          if (!Number.isFinite(m)) m = -900;
          const n = fbm(KOHINA, x / (30 * S), y / (30 * S), 4) - 0.5;
          const s = lerpSyvyys(m + n * Math.min(150, Math.max(12, -m * 1.25)));
          const a = 0.5;
          r = r * (1 - a) + s[0] * a;
          g = g * (1 - a) + s[1] * a;
          b = b * (1 - a) + s[2] * a;
        } else {
          // --- maasto: hypsometria, varjostus, akvarellin rae ---
          if (!Number.isFinite(m)) m = 60;
          const n1 = fbm(KOHINA, x / (26 * S), y / (26 * S), 4) - 0.5;
          const n2 = fbm(KOHINA2, x / (7 * S), y / (7 * S), 3) - 0.5;
          const c = lerpVari(ASTEIKKO, Math.max(0, m + n1 * 190 + n2 * 60));
          const varjo = (0.5 - varjostus(lon, lat)) * 0.46;
          const pigmentti = (KOHINA2(x / (2.1 * S), y / (2.1 * S)) - 0.5) * 13;
          const lai = (fbm(KOHINA, x / (95 * S), y / (95 * S), 3) - 0.5) * 12;
          const t = (k) => k * (1 - varjo) + pigmentti + lai + (varjo > 0 ? 0 : varjo * 30);
          r = t(c[0]);
          g = t(c[1] * (1 - varjo * 0.12));
          b = t(c[2] * (1 - varjo * 0.3));
        }
        d[i] = Math.max(0, Math.min(255, r));
        d[i + 1] = Math.max(0, Math.min(255, g));
        d[i + 2] = Math.max(0, Math.min(255, b));
        d[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  /* ------------------------------------------------------------ polut */

  /**
   * Viiva kuvaan — katkaistuna siellä, missä lauta kiertää ympäri.
   *
   * Hyppy yli puolen kuvan leveyden tarkoittaa, että viiva ylitti laudan
   * sauman (ks. tiedoston johdanto): silloin aloitetaan uusi osapolku
   * eikä vedetä viivaa kartan poikki.
   */
  const viivaPolku = (g, viivat, suljettu = false) => {
    g.beginPath();
    for (const viiva of viivat) {
      let edellinen = null;
      for (let i = 0; i < viiva.length; i++) {
        const x = kuvaX(viiva[i][0]);
        const y = kuvaY(viiva[i][1]);
        if (edellinen === null || Math.abs(x - edellinen) > W / 2) g.moveTo(x, y);
        else g.lineTo(x, y);
        edellinen = x;
      }
      if (suljettu) g.closePath();
    }
  };

  /* ================================================== 4. RANNIKKO
   *
   * Kaksi vetoa kuten maalehdellä: kostea leveä reuna ja sen päällä
   * kynä. Maalehdellä kostea reuna leikataan meren puolelle kohdemaan
   * monikulmiolla; yleislehdellä leikkuria ei ole eikä tarvita —
   * vetoja on 3 ja 1,1 pikseliä, joten maan puolelle jäävä puolikas on
   * pikselin murto-osa eikä erotu rannikon omasta pigmentistä.
   */
  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgba(74,52,33,0.18)';
  ctx.lineWidth = 3 * S;
  viivaPolku(ctx, aineisto.rannikot);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(58,40,25,0.85)';
  ctx.lineWidth = 1.1 * S;
  viivaPolku(ctx, aineisto.rannikot);
  ctx.stroke();
  ctx.restore();

  /* ================================================== 5. JÄRVET
   *
   * Vain isot (tools/fokuskartta/maailma.mjs `jarvet`). Sama sävy kuin
   * maalehdellä, jotta Suuret järvet näyttävät samalta kaukaa ja
   * lähempää.
   */
  ctx.save();
  ctx.lineJoin = 'round';
  for (const j of aineisto.jarvet ?? []) {
    ctx.fillStyle = 'rgba(203,200,182,0.9)';
    viivaPolku(ctx, j.renkaat, true);
    ctx.fill('evenodd');
    ctx.strokeStyle = 'rgba(118,107,80,0.75)';
    ctx.lineWidth = 0.9 * S;
    ctx.stroke();
  }
  ctx.restore();

  /* ================================================== 6. ASTEVERKKO
   *
   * HARVA JA HAALEA. Kaukozoomissa kartta on pelaajan yleiskuva, ja
   * asteverkko on siinä mittapuu eikä koriste: 20 asteen väli antaa
   * yhdeksäntoista meridiaania ja seitsemän leveyspiiriä koko laudalle.
   * Päiväntasaaja on hitusen tummempi, kuten aikakauden kartoissa.
   *
   * Reunalukemia EI piirretä — ne olisivat kuvaan poltettua sivua, ja
   * peli piirtää omat mittansa ruutuun ankkuroituina (js/fokusmitat.js).
   */
  if (tyyli.asteverkko !== false) {
    const vali = tyyli.asteverkkoVali ?? 20;
    ctx.save();
    ctx.lineWidth = 0.7 * S;
    ctx.strokeStyle = 'rgba(96,74,46,0.22)';
    ctx.beginPath();
    for (let lon = -180; lon <= 180; lon += vali) {
      const x = kuvaX(lon);
      ctx.moveTo(x, 0); ctx.lineTo(x, H);
    }
    const latYla = Math.floor(lautaLat(bbox.y) / vali) * vali;
    const latAla = Math.ceil(lautaLat(bbox.y + bbox.h) / vali) * vali;
    for (let lat = latAla; lat <= latYla; lat += vali) {
      if (lat === 0) continue;
      const y = kuvaY(lat);
      ctx.moveTo(0, y); ctx.lineTo(W, y);
    }
    ctx.stroke();
    ctx.strokeStyle = 'rgba(96,74,46,0.36)';
    ctx.beginPath();
    const y0 = kuvaY(0);
    ctx.moveTo(0, y0); ctx.lineTo(W, y0);
    ctx.stroke();
    ctx.restore();
  }

  /* ================================================== 7. MERTEN NIMET */

  /** Yksi tekstirivi harvennettuna; sama kaava kuin maalehdellä. */
  const teksti = (s, x, y, {
    koko = 13, fontti = '"Liberation Serif", serif', tyylitys = '', vari = MUSTE,
    ank = 'left', vali = 0, kulma = 0,
  } = {}) => {
    ctx.save();
    ctx.translate(x, y);
    if (kulma) ctx.rotate(kulma * Math.PI / 180);
    ctx.font = `${tyylitys} ${koko * S}px ${fontti}`.trim();
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    const merkit = [...s];
    const lev = merkit.reduce((sum, m) => sum + ctx.measureText(m).width, 0)
      + vali * S * (merkit.length - 1);
    let t = ank === 'center' ? -lev / 2 : ank === 'right' ? -lev : 0;
    ctx.fillStyle = vari;
    for (const m of merkit) { ctx.fillText(m, t, 0); t += ctx.measureText(m).width + vali * S; }
    ctx.restore();
  };

  /*
   * Valtamerten nimet ovat karttatypografiaa eivätkä paikkatietoa: ne
   * on aseteltu silmällä sinne, missä ulappaa riittää (tyylitiedosto
   * tools/tee-yleislehti.mjs MERET). Ei haloa — nimi jää paperiin kuten
   * maalehdillä.
   */
  for (const m of tyyli.meret ?? []) {
    teksti(m.nimi, kuvaX(m.lon), kuvaY(m.lat), {
      koko: m.koko ?? 20, tyylitys: 'italic', vari: 'rgba(112,99,76,0.62)',
      ank: 'center', vali: (m.koko ?? 20) * 0.34, kulma: m.kulma ?? 0,
    });
  }

  /* ================================================== 8. PAPERIN RAE
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

  /* ================================================== 9. REUNAHÄIVYTYS
   *
   * VAIN YLÄ- JA ALAREUNA, EI SIVUJA.
   *
   * Lehti on tasan laudan kokoinen, joten sen sivut ovat laudan sauma:
   * peli piirtää kartan uudelleen laudan leveyden päähän (js/ui.js
   * kiertoKohdat), ja häivytetty pystyreuna näkyisi siinä kohtaa
   * vaaleana raitana keskellä Tyyntämerta. Ylä- ja alareunassa lehti
   * sen sijaan kohtaa laudan oman pergamentin, ja muutaman pikselin
   * häivytys sulattaa sauman siihen.
   */
  {
    const hy = Math.max(1, Math.round(H * 0.004));
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let y = 0; y < H; y++) {
      const a = Math.min(1, Math.min(y + 0.5, H - 0.5 - y) / hy);
      if (a >= 1) continue;
      for (let x = 0; x < W; x++) d[(y * W + x) * 4 + 3] = Math.round(255 * a);
    }
    ctx.putImageData(img, 0, 0);
  }

  /*
   * ESIKATSELU (vain --esikatselu): häivytetty reuna näkyy katselimessa
   * mustana, joten tausta lisätään KAIKEN ALLE. Kuva itse on sama.
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
