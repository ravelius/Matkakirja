// Aarrekartan grafiikka: pergamentti, käsin piirretty rannikko, aallot, maasto,
// kompassiruusu ja reunuskoristeet. Kaikki piirretään SVG:nä ilman kuvatiedostoja.
//
// Piirto ei tiedä mitään yksittäisestä laudasta: rannikot tulevat paketin
// map.outlines-listasta ja koristeet paketin decor-osiosta.

const NS = 'http://www.w3.org/2000/svg';

// Paperi jatkuu reilusti pelialueen ulkopuolelle, jotta se täyttää ruudun
// näkymäikkunan (viewBox) muodosta riippumatta.
// Pergamentti ulottuu selvästi laudan ulkopuolelle: kapealla pystyruudulla
// näkymä on paljon lautaa korkeampi, ja liian pieni arkki jätti alalaitaan
// tumman kaistan.
/*
 * Pergamentin koko. Se on tarkoituksella laudan reunojen yli joka
 * suuntaan: lähikuvassa karttaa panoroidaan, eikä paperi saa loppua
 * kesken.
 *
 * Mitat olivat kiinteät (3600 x 3600) ja riittivät, kun jokainen lauta
 * oli 1000 x 1000. Vanha maailma on 7200 x 2620, ja kiinteä paperi
 * jätti meren mustaksi kaikkialta muualta paitsi vasemmasta
 * yläkulmasta. Nyt paperi lasketaan laudan mukaan.
 */
export function paperi(map) {
  const w = map?.width ?? 1000;
  const h = map?.height ?? 1000;
  const vara = Math.max(w, h) * 1.3;
  /*
   * Kiertävällä kartalla pergamentti EI jatku sivuille.
   *
   * Jatkoa ei tarvita: kartasta on kopio laudan leveyden päässä, ja se
   * tuo pergamentin mukanaan. Mutta jos jatko on, kopio ja alkuperäinen
   * menevät päällekkäin — ja koska rakeisuus sekoittuu kertolaskulla,
   * päällekkäinen kaistale tummuu. Ruudulla se näkyi pystysuorana
   * sävyrajana keskellä merta.
   *
   * Pystysuunnassa jatko säilyy: siellä ei kierretä.
   */
  if (map?.kiertava) return { x: 0, y: -vara, w, h: h + vara * 2 };
  return { x: -vara, y: -vara, w: w + vara * 2, h: h + vara * 2 };
}

/** Yhteensopivuus: oletuslauta 1000 x 1000. */
export const PAPER = paperi({ width: 1000, height: 1000 });

/*
 * PERGAMENTIN POHJA: PAPERI EI SAA LOPPUA MISSÄÄN RUUDUN MUODOSSA.
 *
 * Omistajan vaatimus 17.8.2026: sivun oma taustapaperi ei saa koskaan
 * pilkottaa laudan pergamentin takaa.
 *
 * paperi() mitoittaa arkin laudan mukaan (vara 1,3 x pidempi sivu). Se
 * riittää tavallisessa ikkunassa muttei venytetyssä. Kokonäkymässä lauta
 * sovitetaan ruutuun, joten näkyvä alue on laudan KORKEUS kertaa ruudun
 * kuvasuhde (leveä ikkuna) tai laudan LEVEYS jaettuna sillä (kapea
 * ikkuna). MITATTU 400 x 2400 pikselin ikkunassa: Maailma-laudalla
 * (1150 x 800) näkyvä alue on 6900 yksikköä korkea ja arkki vain 3790 —
 * loput ruudusta oli sivun omaa taustaa, ja väliin jäi vaakasuora sauma.
 *
 * Arkkia ei saa kasvattaa sen korjaamiseksi. Kaksi syytä:
 *
 *   1. paperi() rajaa myös rasteroinnin (ikkunaPaperilla, pohjanMitat).
 *   2. #paper-grad on arkin rajauslaatikon yksiköissä, joten venytetty
 *      arkki venyttäisi liukuvärin mukanaan ja vaalentaisi koko kartan.
 *
 * Siksi pohja on OMA, elävä kerros arkin alla:
 *
 *   1. Se on laudan juuriryhmän ensimmäinen lapsi eikä kuulu
 *      rasteroitavaan taideryhmään. Se on pakko: bittikarttapyramidin
 *      pohjataso kattaa yleiskuvassa vain laudan ja 12 % sen ympäriltä
 *      (pohjanMitat), ja vektorit poistetaan heti kun pohja on valmis —
 *      taideryhmään piirretty jatke katoaisi siinä samassa.
 *   2. Sen liukuväri on sama ellipsi täsmälleen samassa kohdassa kuin
 *      arkin #paper-grad, mutta userSpaceOnUse-yksiköissä. Arkin
 *      alueella väri on siis sama kuin ennenkin eikä saumaa synny;
 *      arkin ulkopuolella liukuväri on jo päättynyt reunaväriinsä
 *      (#cfae79) ja jatkuu sinä.
 *   3. Kiertävällä laudalla pohja EI jatku sivuille — sama syy kuin
 *      paperi():ssa, ks. sen kommentti.
 */

/*
 * Ruudun äärimmäinen kuvasuhde, jolle paperi mitoitetaan. 9 kattaa 9:1
 * ja 1:9; puhelimen pystyruutu on 1:2,2 ja levein työpöytäikkuna
 * käytännössä alle 4:1. Laudan mitta kahdesti päälle, koska näkymän
 * keskus ei ole aina laudan keskellä (avausnäkymän tekstitila nostaa
 * laudan ylös, ks. js/ui.js INTRO_SPACE).
 */
const RUUDUN_SUHDE = 9;

export function paperinPohja(map) {
  const w = map?.width ?? 1000;
  const h = map?.height ?? 1000;
  const arkki = paperi(map);
  const korkeus = Math.max(arkki.h, w * RUUDUN_SUHDE + h * 2);
  const y = h / 2 - korkeus / 2;
  if (map?.kiertava) return { x: 0, y, w, h: korkeus };
  const leveys = Math.max(arkki.w, h * RUUDUN_SUHDE + w * 2);
  return { x: w / 2 - leveys / 2, y, w: leveys, h: korkeus };
}

/*
 * RAE ON KARTALLA KAHDESTI — JA POHJAN ON SILTI VASTATTAVA SITÄ.
 *
 * Bittikarttaruutuun ja pyramidin pohjatasoon rae leivotaan ruudun
 * omissa pikseleissä (piirraRakeisuus), ja elävä rect.grain kertautuu
 * senkin päälle. Se on tarkoitus: leivottu rae antaa pinnan joka
 * etäisyydellä, elävä on lähikuvassa niin suurta ettei se enää ole
 * pintaa vaan tasainen tummennus.
 *
 * Pergamentin pohja saa vain elävän rakeen, joten ilman korjausta se
 * olisi rasteroitua karttaa noin 4,5 % vaaleampi. MITATTU 1280 x 800
 * ruudulla ensimmäisestä korjausyrityksestä: kartta 220,201,161 vastaan
 * pohja 229,211,172 — vaalea kehys bittikarttapohjan ympärillä, eli
 * sauma toisessa paikassa.
 *
 * Siksi pohjan liukuväriin leivotaan rakeen KESKIMÄÄRÄINEN tummennus.
 * Kerroin lasketaan rakeen omista vakioista: kohinan keskiarvo on 0,5,
 * siitä alfa 0,3 (grainTile) ja peitto 0,5 (css .grain).
 *
 * Korjaus osuu oikein myös silloin, kun elävä rae on piilossa
 * (body.linssi-valokuva, body.flight-active): silloin kartalla on rae
 * kerran ja pohjalla kerran. Ainoa kohta, jossa se on väärä, on lyhyt
 * hetki laudan luonnin jälkeen ennen kuin vektorit on rasteroitu.
 */
const RAKEEN_VARI = [115, 92, 56];
const RAKEEN_KESKIALFA = 0.5 * 0.3 * 0.5;

function raetta(hex) {
  const luku = (i) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16);
  return `#${[0, 1, 2].map((i) => {
    const pohja = luku(i) * (1 - RAKEEN_KESKIALFA + RAKEEN_KESKIALFA * RAKEEN_VARI[i] / 255);
    return Math.round(pohja).toString(16).padStart(2, '0');
  }).join('')}`;
}

/*
 * Pohjan liukuväri: #paper-grad uudelleen, mutta laudan yksiköissä.
 *
 * #paper-grad on objectBoundingBox-yksiköissä (cx 50 %, cy 46 %, r 62 %),
 * eli se on ARKIN kokoinen ellipsi — vaakasäde 0,62 x arkin leveys,
 * pystysäde 0,62 x arkin korkeus. Sama ellipsi kirjoitetaan tässä
 * kiinteisiin koordinaatteihin, jolloin se ei enää riipu siitä
 * suorakaiteesta, jota sillä täytetään. Vain niin isompi pohja voi
 * saada arkin kanssa täsmälleen saman sävyn joka pisteessä.
 */
const POHJAN_LIUKUVARI = 'paper-pohja-grad';

export function paperiPohjanLiukuvari(defs, map = null) {
  const arkki = paperi(map);
  const cx = arkki.x + arkki.w * 0.5;
  const cy = arkki.y + arkki.h * 0.46;
  const venytys = arkki.h / arkki.w;
  const grad = el('radialGradient', {
    id: POHJAN_LIUKUVARI,
    gradientUnits: 'userSpaceOnUse',
    cx: cx.toFixed(2),
    cy: cy.toFixed(2),
    r: (arkki.w * 0.62).toFixed(2),
    // Ympyrä ellipsiksi: y venytetään arkin kuvasuhteen mukaan keskuksen
    // ympäri (y' = venytys * y + cy * (1 - venytys)).
    gradientTransform: `translate(0 ${(cy * (1 - venytys)).toFixed(2)})`
      + ` scale(1 ${venytys.toFixed(5)})`,
  }, defs);
  // Samat pysäkit kuin #paper-grad:ssa, rakeen keskitummennus leivottuna
  // (ks. raetta yllä).
  el('stop', { offset: '0%', 'stop-color': raetta('#f6e7c6') }, grad);
  el('stop', { offset: '55%', 'stop-color': raetta('#ecd8ae') }, grad);
  el('stop', { offset: '100%', 'stop-color': raetta('#cfae79') }, grad);
  return grad;
}

/**
 * Ruudun täyttävä pergamentti kaiken muun alle. Kutsutaan laudan
 * juuriryhmän ENSIMMÄISENÄ, ennen rasteroitavaa taideryhmää.
 */
export function drawPaperPohja(svg, map = null, defs = null) {
  const alue = paperinPohja(map);
  paperiPohjanLiukuvari(defs ?? el('defs', {}, svg), map);
  el('rect', {
    x: alue.x, y: alue.y, width: alue.w, height: alue.h,
    class: 'paper-pohja',
    fill: `url(#${POHJAN_LIUKUVARI})`,
    'pointer-events': 'none',
  }, svg);
}

/**
 * Deterministinen 0–1 -arvo merkkijonosta (FNV-1a). Sama piirre saa aina saman
 * pienen poikkeaman, joten kartta näyttää käsin piirretyltä mutta ei väreile.
 */
export function hash01(key) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100003) / 100003;
}

/** Symmetrinen poikkeama välillä ±amount. */
export function vary(key, amount) {
  return (hash01(key) - 0.5) * 2 * amount;
}

export function el(tag, attrs = {}, parent = null) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  if (parent) parent.appendChild(node);
  return node;
}

/*
 * KÄSIN PIIRRETTY HEILUNTA ILMAN SUODATINTA
 *
 * Rannikko, aallot ja maasto heiluivat ennen feTurbulence +
 * feDisplacementMap -suodattimella (#rough ja #rough-soft). Se näytti
 * hyvältä mutta hajosi iOS:n webapp-tilassa: kun sovellus kävi taustalla
 * ja palasi, juuri suodatetut kerrokset tulivat takaisin TYHJINÄ — maa,
 * rannikko, meren kaiut ja aallot katosivat, ja jäljelle jäi paljas
 * paperi. Omistajalla vika toistui joka kerta (kuvakaappaus 2.8.2026).
 *
 * Suodatin tarvitsee oman piirtopuskurin, jonka koko seuraa kerroksen
 * rajauslaatikkoa ja zoomia. Mannerkerros on kartan suurin, ja
 * lähikuvassa sen puskuri kasvaa moninkertaiseksi; iOS vapauttaa
 * taustalle jääneen sovelluksen puskurit eikä ilmeisesti saa tuota
 * kokoa enää varattua. v158 yritti herättää kerrokset irrottamalla ja
 * liittämällä suodatinviitteen takaisin — se ei auttanut, koska ongelma
 * ei ole vanhentunut viite vaan puuttuva puskuri.
 *
 * Sama jälki syntyy siirtämällä pisteitä itse. Kohina lasketaan kerran
 * piirrossa eikä joka ruudunpäivityksellä, joten puskuria ei tarvita
 * lainkaan — eikä ole mitään mitä menettää.
 */

/**
 * Pehmeä pseudokohina paikan mukaan, -1…1. Sama piste saa aina saman
 * arvon ja lähekkäiset pisteet lähes saman, joten viiva aaltoilee
 * loivasti kuin käsi olisi vapissut — ei tärise pisteestä toiseen.
 *
 * Solun koko vastaa vanhan suodattimen aallonpituutta: baseFrequency
 * 0.017 tarkoittaa noin 59 yksikön jaksoa.
 */
const KOHINA_SOLU = 58;

export function kohina(x, y, siemen) {
  const gx = Math.floor(x / KOHINA_SOLU);
  const gy = Math.floor(y / KOHINA_SOLU);
  const fx = x / KOHINA_SOLU - gx;
  const fy = y / KOHINA_SOLU - gy;
  // Kuutiollinen pehmennys, jottei solujen raja näy viivassa taitteena.
  const s = (t) => t * t * (3 - 2 * t);
  const ux = s(fx);
  const uy = s(fy);
  const n = (ix, iy) => hash01(`${siemen}:${ix}:${iy}`) - 0.5;
  const ylä = n(gx, gy) * (1 - ux) + n(gx + 1, gy) * ux;
  const ala = n(gx, gy + 1) * (1 - ux) + n(gx + 1, gy + 1) * ux;
  return (ylä * (1 - uy) + ala * uy) * 2;
}

/**
 * Siirtää pistejonon pisteitä kohinan verran. Vanha suodatin siirsi
 * scale 8:lla eli enintään ±4 yksikköä; sama määrä tässä.
 */
export function kasinPiirretty(points, maara = 4) {
  return points.map(([x, y]) => [
    Number((x + kohina(x, y, 'kasi-x') * maara).toFixed(1)),
    Number((y + kohina(x, y, 'kasi-y') * maara).toFixed(1)),
  ]);
}

/**
 * Catmull–Rom-pehmennys: pisteistä sulava suljettu käyrä.
 *
 * Viety ulos vesistölinssiä varten (js/linssit/vesistot.js). Linssin on
 * pakko piirtää järvet TÄSMÄLLEEN samalla pehmennyksellä kuin pohjakartta
 * piirtäisi ne: sama rengas janoina ja kaarina eroaa toisistaan lahden
 * levyisesti (ks. rantaviivanPolut alempana samasta syystä).
 */
export function smoothClosedPath(points) {
  const n = points.length;
  const p = (i) => points[((i % n) + n) % n];
  let d = `M${p(0)[0]},${p(0)[1]}`;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = p(i - 1);
    const [x1, y1] = p(i);
    const [x2, y2] = p(i + 1);
    const [x3, y3] = p(i + 2);
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${x2},${y2}`;
  }
  return `${d} Z`;
}

// Pehmeiksi käyriksi lasketut rannikot muistetaan karttakohtaisesti.
const outlineCache = new WeakMap();

/**
 * Rantaviivan polut TÄSMÄLLEEN siinä muodossa kuin ne piirretään.
 *
 * Tämä on olemassa rajauksia varten (js/ui.js `meri-rajaus`). Ensimmäinen
 * yritys rakensi merenpohjan rajauksen suoraan `map.outlines`-pisteistä
 * janoina, ja sininen vuoti yhä maalle: piirretty rannikko EI ole niistä
 * pisteistä vedetty monikulmio vaan sen pehmennetty ja käsin heiluteltu
 * versio (kasinPiirretty + smoothClosedPath). Pisteitä on noin 280 per
 * manner, joten kaari ja jana eroavat toisistaan lahden levyisesti.
 *
 * Rajaus on pakko tehdä samasta datasta kuin piirto, tai se rajaa
 * johonkin muuhun kuin siihen rantaan, jonka pelaaja näkee.
 */
export function rantaviivanPolut(map) {
  return outlinePaths(map);
}

function outlinePaths(map) {
  let paths = outlineCache.get(map);
  if (!paths) {
    // Heilunta lasketaan pisteisiin ennen pehmennystä, jolloin käyrä
    // kaartaa siirtyneiden pisteiden kautta eikä vain väpätä paikallaan.
    paths = map.outlines.map((o) => smoothClosedPath(kasinPiirretty(o)));
    outlineCache.set(map, paths);
  }
  return paths;
}

/** Suodattimet ja liukuvärit, joilla paperi ja mustejälki saavat elävän pinnan. */
// Rakeisuuslaatan koko laudan koordinaateissa. Riittävän suuri, ettei
// toisto erotu, ja riittävän pieni, että laatta pysyy kevyenä.
const GRAIN_TILE = 160;
let grainTileUrl = null;
let grainKangas = null;

/*
 * Rakeen koko RUUDULLA, ei laudalla.
 *
 * Tässä oli koko "kartta näyttää kuolleelta lähempää" -vika. Kuvio on
 * laudan koordinaateissa (GRAIN_TILE = 160 yksikköä), joten se suurenee
 * yhdessä kartan kanssa: koko maailma näkyvissä yksi rae on noin 16
 * pikseliä eli hienoa hiekkaa, mutta kaupungin kohdalle zoomattuna sama
 * rae venyy satoihin pikseleihin — pehmeäksi läiskäksi, jota ei erota
 * tasaisesta väristä. Pinta ei siis kadonnut mihinkään, se suurennettiin
 * näkymättömäksi.
 *
 * Rasteroidussa ruudussa rakeisuus piirretään siksi vasta canvakselle,
 * ruudun omissa pikseleissä. Silloin paperin pinta on samanlainen joka
 * etäisyydellä, eikä se maksa mitään: laatta on valmiina muistissa ja
 * ruutu piirretään joka tapauksessa kerran.
 */
const GRAIN_RUUDULLA_PX = 110;

/**
 * Piirtää paperin kuituhäiriön kerran canvakselle ja palauttaa sen
 * data-osoitteena. Sävy ja voimakkuus vastaavat vanhaa feTurbulence-
 * suodatinta: ruskea (0.45, 0.36, 0.22) ja alfa 0.3 kohinan mukaan.
 *
 * Kohina lasketaan kolmella oktaavilla, jotta pinta on samalla tavalla
 * pehmeän epätasainen kuin fractalNoise eikä pelkkää valkoista kohinaa.
 */
function grainTile() {
  if (grainTileUrl) return grainTileUrl;
  const koko = 256; // laatan tarkkuus pikseleinä
  const canvas = document.createElement('canvas');
  canvas.width = koko;
  canvas.height = koko;
  const ctx = canvas.getContext('2d');
  const kuva = ctx.createImageData(koko, koko);

  // Toistuva kohina: arvo lasketaan hilasta, joka kiertää laatan reunan yli,
  // jotta saumaa ei näy.
  const oktaavi = (x, y, jako, siemen) => {
    const gx = Math.floor(x / jako);
    const gy = Math.floor(y / jako);
    const fx = (x / jako) - gx;
    const fy = (y / jako) - gy;
    const solmu = (ix, iy) => {
      const kx = ((ix % (koko / jako)) + (koko / jako)) % (koko / jako);
      const ky = ((iy % (koko / jako)) + (koko / jako)) % (koko / jako);
      return hash01(`grain:${siemen}:${kx}:${ky}`);
    };
    // Pehmennyskäyrä, jotta hilan solmut eivät näy ruudukkona.
    const u = fx * fx * (3 - 2 * fx);
    const v = fy * fy * (3 - 2 * fy);
    const a = solmu(gx, gy);
    const b = solmu(gx + 1, gy);
    const c = solmu(gx, gy + 1);
    const d = solmu(gx + 1, gy + 1);
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  };

  for (let y = 0; y < koko; y++) {
    for (let x = 0; x < koko; x++) {
      const n = oktaavi(x, y, 2, 'a') * 0.55
        + oktaavi(x, y, 4, 'b') * 0.3
        + oktaavi(x, y, 8, 'c') * 0.15;
      const i = (y * koko + x) * 4;
      kuva.data[i] = 115;      // 0.45 * 255
      kuva.data[i + 1] = 92;   // 0.36 * 255
      kuva.data[i + 2] = 56;   // 0.22 * 255
      kuva.data[i + 3] = Math.round(n * 0.3 * 255);
    }
  }
  ctx.putImageData(kuva, 0, 0);
  grainKangas = canvas;
  grainTileUrl = canvas.toDataURL('image/png');
  return grainTileUrl;
}

/**
 * Sivelee paperin rakeisuuden valmiin ruudun päälle sen omissa
 * pikseleissä, ks. GRAIN_RUUDULLA_PX.
 *
 * `kanvaksiaPerCss` kertoo, montako canvas-pikseliä vastaa yhtä ruudun
 * pikseliä. Ruudun tarkkuus ei ole vakio — se on katossa 1100 pikseliä
 * ja retinanäytöllä kaksinkertainen — joten ilman tätä rae olisi eri
 * kokoinen eri laitteilla ja eri zoomaustasoilla, eli sama vika
 * uudestaan pienempänä.
 *
 * Sekoitus ja voimakkuus vastaavat vektoripuolen tyyliä
 * (css/styles.css .grain: opacity 0.5, mix-blend-mode multiply), jotta
 * rasteroitu ja rasteroimaton kartta näyttävät samalta.
 */
/*
 * RAE LAATOITETAAN KERRAN, EI JOKA RUUDULLE.
 *
 * Ensimmäinen versio täytti ruudun kuviolla (`createPattern` +
 * `setTransform`) multiply-sekoituksessa. Se on oikea lopputulos mutta
 * väärä tapa: selain laskee kuvion muunnoksen ja sekoituksen pikseli
 * kerrallaan. MITATTU 1100 × 1100 ruudulle:
 *
 *   kuviotäyttö + multiply     28,9 ms
 *   valmis laatta + multiply    2,6 ms
 *   pelkkä pohjaväri            0,3 ms
 *
 * Ruutuja syntyy panoroinnin aikana useita, joten 28 ms per ruutu on
 * juuri se tökkiminen, josta omistaja huomautti ("kartan vieritys
 * tökkii taas") — ja se tuli mukana v245:ssä, samassa versiossa kuin
 * rae itse.
 *
 * Nyt rae laatoitetaan kerran valmiiksi ruudun kokoiseksi kankaaksi, ja
 * ruutuun se menee yhtenä `drawImage`-kutsuna. Ulkonäkö on täsmälleen
 * sama: multiply ja peittävyys ovat ennallaan, vain toisto on laskettu
 * etukäteen.
 *
 * Kankaat välimuistissa raekoon mukaan. Kokoja on käytännössä yksi tai
 * kaksi (laitteen pikselisuhde ja ruudun tarkkuuskatto), ja koko
 * pyöristetään kahdeksaan pikseliin, ettei pieni vaihtelu synnytä uutta
 * kangasta. Kolme on katto: yksi kangas on noin viisi megatavua.
 */
const grainKankaat = new Map();
const GRAIN_KANKAITA = 3;

function grainLaatoitettu(koko) {
  const valmis = grainKankaat.get(koko);
  if (valmis) return valmis;
  if (!grainKangas) grainTile();
  if (!grainKangas || typeof document === 'undefined') return null;
  const kangas = document.createElement('canvas');
  kangas.width = RUUDUN_PIKSELIT;
  kangas.height = RUUDUN_PIKSELIT;
  const ctx = kangas.getContext('2d');
  const kuvio = ctx?.createPattern?.(grainKangas, 'repeat');
  if (!kuvio) return null;
  if (kuvio.setTransform && typeof DOMMatrix === 'function') {
    kuvio.setTransform(new DOMMatrix([koko / grainKangas.width, 0, 0, koko / grainKangas.height, 0, 0]));
  }
  ctx.fillStyle = kuvio;
  ctx.fillRect(0, 0, RUUDUN_PIKSELIT, RUUDUN_PIKSELIT);
  if (grainKankaat.size >= GRAIN_KANKAITA) {
    grainKankaat.delete(grainKankaat.keys().next().value);
  }
  grainKankaat.set(koko, kangas);
  return kangas;
}

function piirraRakeisuus(ctx, leveysPx, korkeusPx, kanvaksiaPerCss) {
  const koko = Math.max(24, Math.round(GRAIN_RUUDULLA_PX * kanvaksiaPerCss / 8) * 8);
  const laatta = grainLaatoitettu(koko);
  if (!laatta) return;
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  ctx.globalAlpha = 0.5;
  /*
   * Laatta TOISTETAAN koko kankaan yli. Yksi drawImage riitti niin
   * kauan kuin jokainen rasteroitava kangas oli enintään laatan
   * kokoinen (RUUDUN_PIKSELIT) — mutta pyramidin pohjataso on 2200
   * pikseliä leveä, ja rae jäi siinä vasempaan ylänurkkaan. Rajan yli
   * sävy hyppäsi mitatusti ~11/255: juuri se "kartta on eri väriinen
   * joistain kohdista", jonka omistaja näki iPadilla — rakeeton osa
   * pohjaa on vaaleampi kuin rakeiset tarkat ruudut, ja nopean zoomin
   * jälkeen näkymä on sekunteja pelkän pohjan varassa. Laatan sauma ei
   * piirry näkyviin: rae on matala-alfaista kohinaa ilman kohdistuvia
   * kuvioita.
   */
  for (let y = 0; y < korkeusPx; y += laatta.height) {
    for (let x = 0; x < leveysPx; x += laatta.width) {
      const w = Math.min(leveysPx - x, laatta.width);
      const h = Math.min(korkeusPx - y, laatta.height);
      // Lähdealue 1:1, ei skaalausta: rae pysyy juuri sen kokoisena
      // kuin se laatoitettiin.
      ctx.drawImage(laatta, 0, 0, w, h, x, y, w, h);
    }
  }
  ctx.restore();
}

export function drawDefs(svg) {
  const defs = el('defs', {}, svg);

  /*
   * Tässä oli myös #rough, joka antoi rannikolle käsin piirretyn
   * vapinan. Se on poistettu: iOS:n webapp-tilassa suodatettu kerros
   * palasi taustalta TYHJÄNÄ ja koko meri katosi kartalta. Rannikon,
   * aaltojen ja maaston heilunta piirretään nyt pisteisiin (kohina ja
   * kasinPiirretty ylempänä), jolloin piirtopuskuria ei tarvita
   * lainkaan eikä ole mitään mitä menettää.
   *
   * #rough-soft on nyt myös poissa. Se jäi v159:ssä, koska reittikerros
   * käytti sitä ja näkyi omistajan kuvassa oikein — se oli silloin
   * pieni kerros. Yhdistetyllä laudalla se ulottuu Lissabonista
   * Tokioon, ja sama oire palasi: iPadilla kaupungit ja nimet näkyivät
   * mutta tiet eivät. Reittien heilunta piirretään nyt pisteisiin
   * (kasinPiirretty), joten kartalla ei ole enää yhtään suodatinta.
   */

  // Paperin kuitupinta laattana. Aiemmin tämä oli feTurbulence-suodatin,
  // joka peitti koko ruudun ja sekoittui multiplyllä kaiken päälle. Se
  // maksoi mittausten mukaan koko pelin ruudunpäivityksen: selain joutui
  // laskemaan kohinan ja sekoituksen uudelleen joka kerta kun mikä tahansa
  // sen alla liikkui — 15 fps pysyvästi, myös silloin kun mitään ei
  // tapahtunut. Kohina on staattista, joten se piirretään kerran laataksi
  // ja toistetaan kuviona. Ulkonäkö on sama, hinta nolla.
  const kuvio = el('pattern', {
    id: 'grain-kuvio',
    patternUnits: 'userSpaceOnUse',
    width: GRAIN_TILE,
    height: GRAIN_TILE,
  }, defs);
  el('image', {
    href: grainTile(),
    x: 0,
    y: 0,
    width: GRAIN_TILE,
    height: GRAIN_TILE,
  }, kuvio);

  const paper = el('radialGradient', { id: 'paper-grad', cx: '50%', cy: '46%', r: '62%' }, defs);
  el('stop', { offset: '0%', 'stop-color': '#f6e7c6' }, paper);
  el('stop', { offset: '55%', 'stop-color': '#ecd8ae' }, paper);
  el('stop', { offset: '100%', 'stop-color': '#cfae79' }, paper);

  /*
   * MAAN VÄRI ON ERI KUIN PAPERIN — ja tässä oli koko "meri vuotaa maiden
   * päälle" -vika.
   *
   * Meri on kartalla paljasta pergamenttia; se on tarkoitus. Maalla on oma
   * liukuvärinsä. Mutta ne olivat käytännössä SAMA VÄRI. Mitattu 4.8.2026
   * pelin omasta ruudusta:
   *
   *   Välimeri  200,177,135  vs  Saharan rannikko  201,178,135   ero 1
   *   Atlantti  217,202,170  vs  Afrikan länsi     215,201,172   ero 2
   *
   * Yhden yksikön ero 255:stä ei ole raja. Rannikkoa erotti vain
   * mustepiirto, ja siksi silmä luki koko vaalean kentän mereksi — maa
   * mukaan lukien. Omistaja raportoi tästä kolmesti eri sanoin, ja joka
   * kerta etsin vikaa siitä, mikä piirtyy maan päälle. Mitään ei piirtynyt
   * maan päälle: maa vain näytti mereltä.
   *
   * Väri pysyy lämpimänä (omistajan linjaus v239: peruskorkeuden on oltava
   * sama lämmin sävy kuin ennen korkeuserojen käyttöönottoa), mutta se on
   * nyt selvästi paperia tummempi ja kylläisempi. Korkeusvyöhykkeet
   * piirtyvät tämän päälle kuten ennenkin.
   */
  const land = el('linearGradient', { id: 'land-grad', x1: '0', y1: '0', x2: '0.4', y2: '1' }, defs);
  el('stop', { offset: '0%', 'stop-color': '#e2c898' }, land);
  el('stop', { offset: '100%', 'stop-color': '#cba86e' }, land);


  return defs;
}

/** Paperipohja ja hennot pituus- ja leveyspiirit. */
export function drawParchment(svg, map = null) {
  const PAPER = paperi(map);
  el('rect', { x: PAPER.x, y: PAPER.y, width: PAPER.w, height: PAPER.h, class: 'paper' }, svg);

  const grid = el('g', { class: 'graticule' }, svg);
  for (let x = PAPER.x; x < PAPER.x + PAPER.w; x += 125) {
    el('line', {
      x1: x + vary(`grid:v:${x}`, 2), y1: PAPER.y,
      x2: x + vary(`grid:v2:${x}`, 2), y2: PAPER.y + PAPER.h,
      opacity: (0.7 + hash01(`grid:vo:${x}`) * 0.6).toFixed(2),
    }, grid);
  }
  for (let y = PAPER.y; y < PAPER.y + PAPER.h; y += 125) {
    el('line', {
      x1: PAPER.x, y1: y + vary(`grid:h:${y}`, 2),
      x2: PAPER.x + PAPER.w, y2: y + vary(`grid:h2:${y}`, 2),
      opacity: (0.7 + hash01(`grid:ho:${y}`) * 0.6).toFixed(2),
    }, grid);
  }
}

/** Paperin rakeisuus ja tummuvat reunat piirretään päällimmäiseksi. */
export function drawPaperOverlay(svg, map = null) {
  /*
   * Rae seuraa POHJAA eikä arkkia (paperinPohja, ei paperi).
   *
   * Rae on tässä elävä kerros — sitä ei rasteroida taiteen mukana (ks.
   * pilkoTaide, joka jättää sen pois) — ja se on ainoa asia, joka antaa
   * paperille pinnan. Jos se loppuisi arkin reunaan, venytetyssä
   * ruudussa pohjan jatke olisi sileää väriä arkin rakeisen pinnan
   * vieressä: sauma katoaisi väristä mutta jäisi pintaan.
   *
   * Laatta on kuvio (#grain-kuvio), joten isompi suorakaide ei maksa
   * muistia — selain maalaa vain näkyvän osan.
   */
  const PAPER = paperinPohja(map);
  el('rect', {
    x: PAPER.x, y: PAPER.y, width: PAPER.w, height: PAPER.h,
    class: 'grain', fill: 'url(#grain-kuvio)',
  }, svg);
  /* Vinjetti (tummuvat reunat) on poistettu omistajan päätöksellä:
     kartta on liikuteltava joka laudalla, eikä reunan tummennus rajaa
     mitään — se vain tummentaa sitä osaa karttaa, jota katsotaan.
     Rakeisuus jää. */
}

/** Manner: rannikon kaikuviivat, täyttö ja mustepiirto. */
export function drawLand(svg, map) {
  const paths = outlinePaths(map);
  const g = el('g', { class: 'landmass' }, svg);
  for (const d of paths) {
    el('path', { d, class: 'sea-echo sea-echo-1' }, g);
    el('path', { d, class: 'sea-echo sea-echo-2' }, g);
    el('path', { d, class: 'sea-echo sea-echo-3' }, g);
  }
  for (const d of paths) {
    el('path', { d, class: 'land' }, g);
    el('path', { d, class: 'coast' }, g);
  }
  for (const lake of map.lakes ?? []) {
    const d = smoothClosedPath(kasinPiirretty(lake));
    el('path', { d, class: 'lake' }, g);
    el('path', { d, class: 'coast' }, g);
  }
  // Maiden rajat hyvin hennolla katkoviivalla — koriste, ei pelielementti.
  // Sama heilunta kuin rannikolla antaa käsin piirretyn vaikutelman.
  for (const line of map.borders ?? []) {
    const d = `M${kasinPiirretty(line).map(([x, y]) => `${x},${y}`).join(' L')}`;
    el('path', { d, class: 'border' }, g);
  }
}

/*
 * Maasto: korkeusvyöhykkeet, joet ja järvet.
 *
 * Omistajan toive 3.8.2026: *"Voisiko merkittävimmät ylängöt ja vuoret
 * sekä joet piirtää karttaan? Joet voisivat näkyä kevyen sinisinä ja
 * vuoret tummemman ruskeina. Vuorien näkyvyys voisi kuitenkin olla
 * hillitty, eli ei mikään oikea korkeuskartta, joka on aika hässäkän
 * näköinen, ennemmin vain suuret linjat."*
 *
 * Kolme sääntöä, jotka seuraavat siitä:
 *
 * 1. Vyöhykkeitä on kolme eikä kolmeakymmentä. Alle kilometrin
 *    korkeuserot eivät näy lainkaan — se on omistajan raja, ja se on
 *    tämän kerroksen tärkein piirre. Ilman sitä kartta menee tukkoon.
 * 2. Piirto on samassa staattisessa ryhmässä kuin muu kartta-taide,
 *    joten bittikarttaruudukko hoitaa sen ilmaiseksi eikä maasto
 *    hidasta panorointia.
 * 3. Ei suodattimia. Sama iOS-sääntö kuin kaikella muullakin kartalla:
 *    suodatettu kerros tarvitsee oman piirtopuskurin, jonka iOS
 *    vapauttaa taustalla eikä saa enää varattua — ja kerros katoaa.
 *
 * Kerros piirtyy maan päälle mutta reittien ja kaupunkien alle. Ilman
 * aineistoa funktio ei tee mitään, joten lauta ilman maastoa toimii
 * kuten ennenkin.
 *
 * --- varjostus ---
 *
 * Kolmas argumentti on valinnainen varjostusaineisto (js/packs/
 * maailmankartta-varjostus.js). Se on eri asia kuin korkeusvyöhykkeet:
 * vyöhyke kertoo KUINKA KORKEALLA maa on, varjo MIHIN SUUNTAAN se
 * viettää. Silmä lukee muodon varjosta, ei väristä, ja siksi vaimeat
 * vyöhykkeet alkavat vasta varjon kanssa näyttää maastolta eivätkä
 * täplältä.
 *
 * Se tulee erillisenä argumenttina eikä map-oliossa, koska map on
 * koneen kirjoittamassa js/packs/maailmankartta.js:ssä: sinne lisätty
 * kenttä katoaisi seuraavassa koostajan ajossa.
 */
export function drawMaasto(svg, map, varjostus = null, nimet = null) {
  const maasto = map?.maasto;
  if (!maasto) return;
  const g = el('g', { class: 'maasto' }, svg);

  // Vyöhykkeet matalimmasta ylimpään: korkeampi piirtyy alemman päälle.
  for (const [luokka, renkaat] of [
    ['korkeus-keski', maasto.keski],
    ['korkeus-ylos', maasto.ylos],
    ['korkeus-huippu', maasto.huippu],
  ]) {
    for (const rengas of renkaat ?? []) {
      if (rengas.length < 4) continue;
      el('path', { d: smoothClosedPath(kasinPiirretty(rengas)), class: luokka }, g);
    }
  }

  /*
   * Varjo vyöhykkeiden PÄÄLLE mutta järvien ja jokien alle.
   *
   * Järjestys ei ole makuasia. Varjo on tumma kalvo, jonka koko idea on
   * nostaa vyöhykkeen pinta esiin — vyöhykkeen ALLE piirrettynä se
   * jäisi ruskean täytön peittoon juuri siellä missä sitä eniten
   * tarvitaan eli vuorilla. Vesi taas kuuluu varjon päälle: joki
   * kulkee laaksossa eikä katoa rinteen varjoon.
   *
   * varjo1 ennen varjo2:ta, koska ne ovat sisäkkäisiä: päällekkäisyys
   * tummentaa syvimmät kohdat itsestään, aivan kuten korkeusvyöhykkeillä.
   */
  for (const [luokka, renkaat] of [
    ['varjo-1', varjostus?.varjo1],
    ['varjo-2', varjostus?.varjo2],
    ['valo-1', varjostus?.valo1],
  ]) {
    for (const rengas of renkaat ?? []) {
      if (rengas.length < 4) continue;
      el('path', { d: smoothClosedPath(kasinPiirretty(rengas)), class: luokka }, g);
    }
  }

  /*
   * VAIN PÄÄJOET POHJAKARTALLA — JÄRVEN TYYLIIN.
   *
   * Historia kahdessa päätöksessä. 4.8.2026: "Ota joet pois kokonaan.
   * Täytyy tehdä niistä vaikka oma linssi... Nykyinen on liian
   * sekava" — kaikki 169 jokea poistuivat pohjakartalta ja
   * vesistölinssi sai ne itselleen. 10.8.2026: "Kokeile lisätä
   * merkittävimmät joet kartalle samalla tavalla ja värillä kuin
   * järvet" — takaisin tulevat VAIN tärkeysluokan 1 pääjoet
   * (kahdeksan: Jangtse, Volga, Mississippi, Tonava, Niili, Ganges,
   * Amazon, Kongo). Sekavuus tuli määrästä, ei joista.
   *
   * "Samalla tavalla kuin järvet" on tässä kirjaimellista: uoma on
   * paperia (.iso-jarvi-täyttö viivana) ja reunat meren mustetta
   * puolella peitolla (.iso-jarvi-reunan arvot). Leveämpi
   * reunaveto alle, paperiveto päälle — näkyviin jää järven
   * reunaviivan levyinen kaistale kummallakin rannalla, eikä
   * suodattimia tarvita (iOS-sääntö).
   *
   * Tärkeys tulee nimiaineistosta (maailmankartta-nimet.js) samalla
   * avaimella kuin vesistölinssissä: avain === joen nimi. Ilman
   * nimet-argumenttia jokia ei piirretä — lauta ilman nimiaineistoa
   * toimii kuten ennenkin. Loput joet (tärkeys 2–3) ovat edelleen
   * vain vesistölinssin.
   */
  const paajoet = new Set(
    (nimet?.joet ?? []).filter((j) => j.tarkeys === 1).map((j) => j.avain),
  );
  if (paajoet.size) {
    /*
     * Päiden jatke: keskilinja-aineisto päättyy omaan rantaviivaansa,
     * joka ei osu käsin piirrettyyn rantaan — joki jäi töpöksi ennen
     * merta ja suisto näytti kököltä (omistajan havainto 10.8.2026).
     * Viimeistä suuntaa jatketaan vähän molemmista päistä: suulla
     * nauha ylettyy veteen asti, ja latvassa lyhyt jatke uppoaa
     * maastoon huomaamatta.
     */
    const JATKE = 14;
    const jatkaPaita = (pisteet) => {
      const jatke = (mista, mihin) => {
        const dx = mihin[0] - mista[0];
        const dy = mihin[1] - mista[1];
        const pituus = Math.hypot(dx, dy) || 1;
        return [mihin[0] + (dx / pituus) * JATKE, mihin[1] + (dy / pituus) * JATKE];
      };
      return [
        jatke(pisteet[1], pisteet[0]),
        ...pisteet,
        jatke(pisteet[pisteet.length - 2], pisteet[pisteet.length - 1]),
      ];
    };
    const joet = el('g', { class: 'iso-joet' }, g);
    for (const joki of maasto.joet ?? []) {
      if (!paajoet.has(joki.nimi)) continue;
      const pisteet = joki.pisteet ?? [];
      if (pisteet.length < 2) continue;
      /*
       * EI kasinPiirretty-huojuntaa: keskilinjassa on jo luonnollinen
       * mutkittelu, ja lisätty jitter teki lähizoomilla teräviä
       * sahalaitoja (sama omistajan havainto). Pelkkä pehmennys
       * riittää — joki on maiseman piirre, ei ääriviiva.
       */
      const d = smoothOpenPath(jatkaPaita(pisteet));
      el('path', { d, class: 'iso-joki-reuna' }, joet);
      el('path', { d, class: 'iso-joki' }, joet);
    }
  }

  /*
   * Järvet vyöhykkeiden ja jokien päälle: järvi on vettä maan sisällä,
   * ja joki laskee järveen — järven reunaviivan kuuluu peittää
   * jokisuun pää, ei toisinpäin.
   *
   * Täyttö on paperia eikä väriä (ks. .iso-jarvi), joten järvi erottuu
   * vain siitä että maan sävy loppuu. Sävytön reunaviiva on siksi
   * pakollinen eikä koriste: ilman sitä järven raja katoaa vaaleimman
   * ylängön kohdalla kokonaan. Sama d molemmille, jotta viiva osuu
   * täytön reunaan tarkalleen.
   */
  for (const jarvi of maasto.jarvet ?? []) {
    const rengas = jarvi.rengas ?? jarvi;
    if (!rengas || rengas.length < 4) continue;
    const d = smoothClosedPath(kasinPiirretty(rengas));
    el('path', { d, class: 'iso-jarvi' }, g);
    el('path', { d, class: 'iso-jarvi-reuna' }, g);
  }
}

// --- maastonimet ------------------------------------------------------------

/*
 * Joen, järven ja vuoriston nimi kartalle kaunokirjoituksella.
 *
 * Omistajan toive 4.8.2026: *"Zoomattaessa tarpeeksi lähelle suurimmat
 * järvet ja vuoristot voisi nimetä ja kirjoittaa kaunokirjoituksella."*
 * Ja: *"Niissä voisi olla pieni i-ikoni tai vastaava perässä, jota
 * painamalla pääsisi lukemaan ja katsomaan kuvia paikasta, ellei siinä
 * ole jo omaa laattaansa tehtynä."*
 *
 * --- miksi tämä EI ole staattista taidetta ---
 *
 * Kartan raskas osa muutetaan bittikartaksi kerran (ks. valmisteleTaide),
 * koska se ei muutu pelin aikana. Nimet muuttuvat: mikä nimi näkyy,
 * minkä kokoisena ja missä kohdassa laudan kiertoa, riippuu siitä mitä
 * ruudulla juuri nyt on. Bittikartassa ne jäätyisivät ensimmäisen
 * piirron zoomiin — Mississippi olisi joko kilometrin korkuinen tai
 * kadonnut. Siksi nimet piirretään elävään kerrokseen ja piirretään
 * uudelleen aina kun näkymä asettuu.
 *
 * Hinta on pieni juuri siksi, että nimiä on kerrallaan vähän: tämä
 * funktio piirtää vain sen, mikä osuu näkyvään alueeseen ja mahtuu
 * sinne. Tyypillisesti muutama kymmenen elementtiä.
 *
 * --- kolme sääntöä, jotka pitävät kartan siistinä ---
 *
 * 1. TÄRKEYS RATKAISEE MILLOIN. Nimi ilmestyy vasta, kun näkyvä alue on
 *    kapeampi kuin sen luokan raja. Ilman tätä 213 nimeä olisi
 *    yleiskuvassa yhtä aikaa eikä kartasta näkisi mitään.
 * 2. NIMEN ON MAHDUTTAVA KOHTEESEENSA. Saint Lawrence on tärkeydeltään
 *    2 mutta laudalla vain 44 yksikköä pitkä, koska aineistossa siitä on
 *    vain pätkä. Pelkkä tärkeys sijoittaisi sen kartalle kymmenen kertaa
 *    kohdettaan pidempänä. Siksi vaaditaan, että kohde on ruudulla
 *    leveämpi kuin sen nimi.
 * 3. PÄÄLLEKKÄISYYS KARSITAAN. Nimet käydään tärkeysjärjestyksessä, ja
 *    nimi, joka osuisi jo piirretyn päälle, jää pois. Tärkeämpi voittaa.
 *
 * --- ei suodattimia ---
 *
 * Sama iOS-sääntö kuin kaikella muullakin kartalla (ks. drawDefs):
 * suodatettu kerros palaa taustalta tyhjänä. Nimissä ei ole yhtään
 * suodatinta eikä varjoa.
 */


/*
 * MAASTONIMI ON SAMAA KOKOA KUIN KAUPUNGIN NIMI.
 *
 * Tässä oli pitkä kierros, joka päättyy nyt yksinkertaiseen sääntöön.
 *
 * Kaupungin nimi (.city-label) on 18 LAUDAN yksikköä: se kutistuu
 * ruudulla, kun karttaa loitontaa, kuten kaikki muukin kartalla.
 * Maastonimi oli sen sijaan kiinteä RUUDUN pikseleissä (15…23 px), eli
 * se ei kutistunut lainkaan — ja siksi se kasvoi loitontaessa yhä
 * suuremmaksi suhteessa kaupunkeihin, kunnes Volga oli moninkertainen
 * Helsinkiin nähden (omistajan kuvakaappaus).
 *
 * Omistajan linjaus: "piirrä samaan kokoon + kaunolle pieni koko lisä."
 * Maastonimi on nyt kaupungin nimen kokoinen laudan yksiköissä, ja
 * kaunokirjoituksen pieni lisä on siinä, koska kursiivi ja vaaleampi
 * muste luetaan pienemmäksi kuin se on.
 */
const KAUPUNGIN_NIMI_YKSIKKOA = 18;   // css .city-label font-size
const KAUNON_LISA = 1.18;
const MAASTONIMEN_YKSIKKOA = KAUPUNGIN_NIMI_YKSIKKOA * KAUNON_LISA;

/*
 * NIMET SYTTYVÄT VASTA KUN KAUPUNKIEN NIMET NÄKYVÄT.
 *
 * Omistajan toive. Raja ei ole enää laudan leveys vaan se, kuinka
 * suurena kaupungin nimi piirtyy RUUDULLE — juuri se on "näkyykö
 * kaupunkien nimiä". Kun mitta on sama, maastonimet eivät voi tulla
 * esiin ennen kaupunkeja millään laitteella eikä millään laudalla.
 *
 * Tärkeysluokat porrastuvat kertoimella: pääjoet ja suuret vuoristot
 * heti kun nimiä ylipäänsä lukee, pienemmät vasta lähempää.
 */
const NIMI_LUETTAVA_PX = 4.5;
const NIMEN_VAATIMUS = { 1: 1, 2: 1.8, 3: 3.2 };

/** Näkyykö tämän tärkeysluokan nimi tällä mittakaavalla? */
function nimiNakyy(tarkeys, skaala) {
  const nakyva = KAUPUNGIN_NIMI_YKSIKKOA * (skaala || 0);
  return nakyva >= NIMI_LUETTAVA_PX * (NIMEN_VAATIMUS[tarkeys] ?? 1);
}

/*
 * Joen nimen ankkuri pysyy paikallaan niin kauan kuin se näkyy.
 *
 * Nimi kirjoitetaan siihen uoman pisteeseen, joka on lähinnä ruudun
 * keskustaa. Se on oikea sääntö sille, MISTÄ nimi valitaan, mutta väärä
 * sille, milloin se vaihtuu: keskusta liikkuu joka kuvaruudulla, joten
 * nimi liukui pitkin jokea koko vierityksen ajan (omistaja: "jokien
 * nimien paikat hyppivät villisti, kun näyttöä vierittää").
 *
 * Muisti korjaa juuri sen: kerran valittu piste pidetään niin kauan kuin
 * se on ruudulla. Nimi vaihtaa paikkaa vasta kun vanha katoaa näkyvistä
 * — silloin siirtymä on tarpeellinen eikä häiritsevä.
 */
const jokienAnkkurit = new Map();

/*
 * Kirjaimen keskileveys osuutena fonttikoosta.
 *
 * Kaunokirjoitus on kapeaa ja kaltevaa. Arvo on mitattu Snell
 * Roundhandista ruudulla; se on arvio eikä mittaus, ja sitä käytetään
 * vain sen päättämiseen mahtuuko nimi — ei sen sijoittamiseen. Väärä
 * arvio siirtäisi i-ikonia muutaman pikselin, ei enempää.
 */
const KIRJAIMEN_LEVEYS = 0.55;

const nimenLeveys = (teksti, fontti) => teksti.length * fontti * KIRJAIMEN_LEVEYS;

/*
 * Ikkuna, jonka verran uomaa varataan nimelle: reilusti yli arvion.
 *
 * <textPath> LEIKKAA polun ulkopuolelle jäävät kirjaimet pois — ei
 * siirrä niitä, vaan jättää piirtämättä. Kun arvio oli liian tiukka,
 * Donista tuli kartalle "Do". Ylimitoitus taas ei maksa mitään: polku
 * itse on näkymätön, ja nimi keskitetään sen puoliväliin.
 */
const KAAREN_VARA = 2.4;

/*
 * Nimen TODELLINEN leveys ruudulta, jos selain suostuu mittaamaan.
 *
 * Kirjainarvio (KIRJAIMEN_LEVEYS) riittää päättämään mahtuuko nimi,
 * mutta i-ikonin paikka on eri asia: muutaman prosentin virhe siirtää
 * ikonin viimeisen kirjaimen päälle. getComputedTextLength tietää
 * tarkalleen, myös silloin kun laitteella on eri kaunokirjoitusfontti
 * kuin toisella. Arvio jää varareitiksi.
 */
function mitattuLeveys(elementti, arvio) {
  try {
    const mitta = elementti.getComputedTextLength?.();
    if (mitta > 0) return mitta;
  } catch { /* mittaus ei onnistunut; arvio kelpaa */ }
  return arvio;
}

/** Catmull–Rom-pehmennys AVOIMELLE viivalle: joen pisteistä sulava kaari. */
export function smoothOpenPath(points) {
  if (points.length < 2) return '';
  const p = (i) => points[Math.max(0, Math.min(points.length - 1, i))];
  const luku = (n) => n.toFixed(1);
  let d = `M${luku(p(0)[0])},${luku(p(0)[1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = p(i - 1);
    const [x1, y1] = p(i);
    const [x2, y2] = p(i + 1);
    const [x3, y3] = p(i + 2);
    d += ` C${luku(x1 + (x2 - x0) / 6)},${luku(y1 + (y2 - y0) / 6)}`
      + ` ${luku(x2 - (x3 - x1) / 6)},${luku(y2 - (y3 - y1) / 6)} ${luku(x2)},${luku(y2)}`;
  }
  return d;
}

/** Murtoviivan pituus ja piste annetun matkan päässä sen alusta. */
function viivanPituus(pisteet) {
  let summa = 0;
  for (let i = 1; i < pisteet.length; i++) {
    summa += Math.hypot(pisteet[i][0] - pisteet[i - 1][0], pisteet[i][1] - pisteet[i - 1][1]);
  }
  return summa;
}

/*
 * Uoman pätkä nimen alle: tasavälinen, pehmennetty ja vasemmalta oikealle.
 *
 * TÄMÄ ON KOKO JOKINIMEN VAIKEIN KOHTA, ja ensimmäinen versio meni
 * siihen pieleen. Se pani nimen suoraan piirretylle uomalle — samoille
 * pisteille ja samalle heilunnalle kuin viiva itse — ja lähikuvassa
 * lopputulos oli lukukelvoton: Väinäjoki kiemursi kerälle, Tigris meni
 * solmuun, Amudarja luki takaperin. Syy on mittasuhde. Uoman mutka on
 * muutaman kymmenen yksikön mittainen ja käsin piirretty heilunta
 * ±4 yksikköä; kun kirjain on kymmenen yksikön korkuinen, jokainen
 * kirjain kääntyy eri suuntaan.
 *
 * Kartantekijät ratkaisevat saman asian samalla tavalla: nimi seuraa
 * joen YLEISSUUNTAA, ei jokaista mutkaa. Siksi tästä otetaan nimen
 * mittainen ikkuna, se harvennetaan muutamaksi tasaväliseksi pisteeksi
 * — mikä keskiarvoistaa mutkat ja heilunnan pois — ja niiden läpi
 * vedetään loiva kaari.
 *
 * Heiluntaa EI lisätä takaisin. Se siirtäisi nimeä enintään neljä
 * yksikköä, mikä on kaukaa näkymätöntä ja läheltä juuri se, mikä teki
 * tekstistä sotkun.
 *
 * Suunta tarkistetaan IKKUNALLE eikä koko joelle. Aineistossa on
 * korjattu joen yleissuunta (tools/tee-maastonimet.mjs), mutta yksi
 * mutka voi silti kulkea vastavirtaan — ja siinä nimi olisi ylösalaisin.
 */
/*
 * Kaksi lukua, jotka päättävät luettavuuden.
 *
 * OTOKSET on kaari-ikkunan pisteiden määrä. Kuusi oli liikaa: se
 * seurasi vielä yksittäisiä mutkia, ja Väinäjoki luki kaarella joka
 * kääntyi kolmesti nimen mitalla. Kaksi väliä eli kolme pistettä antaa
 * yhden loivan kaaren — sen minkä silmä tunnistaa joen suunnaksi.
 *
 * OIKAISU vetää välipisteet puoliväliin kohti suoraa jännettä. Se on
 * sama temppu kuin käsin piirretyssä kartassa: nimi kaartaa joen
 * mukana, mutta vähemmän kuin joki. Ilman sitä jyrkkä mutka levittää
 * kirjaimet kaaren ulkoreunalle ja puristaa ne sisäreunalla yhteen.
 */
const KAAREN_OTOKSET = 2;
const KAAREN_OIKAISU = 0.5;

function nimenKaari(pisteet, kohtaIndeksi, tarve) {
  const matkat = [0];
  for (let i = 1; i < pisteet.length; i++) {
    matkat.push(matkat[i - 1]
      + Math.hypot(pisteet[i][0] - pisteet[i - 1][0], pisteet[i][1] - pisteet[i - 1][1]));
  }
  const kokonais = matkat.at(-1);
  const puolikas = Math.min(tarve, kokonais) / 2;
  const keskus = Math.min(Math.max(matkat[kohtaIndeksi] ?? kokonais / 2, puolikas),
    kokonais - puolikas);

  /** Piste annetun matkan päässä; matkat on jo laskettu. */
  const kohdassa = (matka) => {
    let i = 1;
    while (i < matkat.length - 1 && matkat[i] < matka) i++;
    const jakso = matkat[i] - matkat[i - 1];
    const t = jakso > 0 ? (matka - matkat[i - 1]) / jakso : 0;
    return [
      pisteet[i - 1][0] + (pisteet[i][0] - pisteet[i - 1][0]) * t,
      pisteet[i - 1][1] + (pisteet[i][1] - pisteet[i - 1][1]) * t,
    ];
  };

  const otokset = [];
  for (let k = 0; k <= KAAREN_OTOKSET; k++) {
    otokset.push(kohdassa(keskus - puolikas + (puolikas * 2 * k) / KAAREN_OTOKSET));
  }

  // Välipisteet puoliväliin kohti jännettä: kaari loivenee, suunta jää.
  const [ax, ay] = otokset[0];
  const [bx, by] = otokset.at(-1);
  for (let k = 1; k < otokset.length - 1; k++) {
    const t = k / KAAREN_OTOKSET;
    const jx = ax + (bx - ax) * t;
    const jy = ay + (by - ay) * t;
    otokset[k] = [
      otokset[k][0] + (jx - otokset[k][0]) * KAAREN_OIKAISU,
      otokset[k][1] + (jy - otokset[k][1]) * KAAREN_OIKAISU,
    ];
  }
  /*
   * Suunta: teksti vasemmalta oikealle, ja pystysuoralla uomalla
   * alhaalta ylös.
   *
   * RATKAISEE VAAKASUUNTA, ei kumpi ero on suurempi. Teksti kääntyy
   * ylösalaisin aina kun polku kulkee vasemmalle — myös silloin kun se
   * kulkee enimmäkseen ylöspäin. Kun suunta valittiin hetken aikaa
   * suuremman eron mukaan, Amudarja nousee luoteeseen ja luki
   * peilikuvana.
   *
   * Vain lähes pystysuoralla uomalla (Volga Volgogradin yläpuolella,
   * Niili) vaakaero on niin pieni, ettei se kerro mitään; silloin
   * valitaan ylöspäin, mikä on karttojen tapa kirjoittaa pystysuora
   * nimi — sama sääntö, jolla vuoristojen kulmat on laskettu
   * (maasto-nimet-vuoret.js).
   */
  const dx = otokset.at(-1)[0] - otokset[0][0];
  const dy = otokset.at(-1)[1] - otokset[0][1];
  const pysty = Math.abs(dx) < Math.abs(dy) * 0.05;
  const nurin = pysty ? dy > 0 : dx < 0;
  return nurin ? otokset.reverse() : otokset;
}

/*
 * Kelpaako kaari nimen alustaksi?
 *
 * Kaksi ehtoa. JÄNNE: päiden välinen suora on oltava nimeä pidempi,
 * muuten nimi ei mahdu kaarelle vaikka polkua olisi. KÄÄNNÖS: kaari ei
 * saa taittua jyrkästi, koska taitteessa kirjaimet leviävät ulkokaarelle
 * ja puristuvat sisäkaarelle. Volgan mutka Volgogradin luona läpäisi
 * pelkän jännetestin ja piirtyi silti kirjainkasana — 72 asteen taite
 * riittää siihen.
 */
const KAAREN_TAITTO = 45;

function kaariKelpaa(kaari, tekstinLeveys) {
  const janne = Math.hypot(kaari.at(-1)[0] - kaari[0][0], kaari.at(-1)[1] - kaari[0][1]);
  if (janne < tekstinLeveys * 1.05) return false;
  for (let i = 1; i < kaari.length - 1; i++) {
    const a = Math.atan2(kaari[i][1] - kaari[i - 1][1], kaari[i][0] - kaari[i - 1][0]);
    const b = Math.atan2(kaari[i + 1][1] - kaari[i][1], kaari[i + 1][0] - kaari[i][0]);
    let ero = ((b - a) * 180) / Math.PI;
    while (ero > 180) ero -= 360;
    while (ero < -180) ero += 360;
    if (Math.abs(ero) > KAAREN_TAITTO) return false;
  }
  return true;
}

function pisteMatkalla(pisteet, matka) {
  let jaljella = Math.max(0, matka);
  for (let i = 1; i < pisteet.length; i++) {
    const [x1, y1] = pisteet[i - 1];
    const [x2, y2] = pisteet[i];
    const pit = Math.hypot(x2 - x1, y2 - y1);
    if (jaljella <= pit || i === pisteet.length - 1) {
      const t = pit ? Math.min(1, jaljella / pit) : 0;
      return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
    }
    jaljella -= pit;
  }
  return pisteet.at(-1);
}

/*
 * Nimen paikka kiertävällä kartalla.
 *
 * Sama nimi on olemassa laudan leveyden välein loputtomiin, ja piirtoon
 * kelpaa se kopio, joka sattuu olemaan näkyvissä. Kopio valitaan tässä
 * eikä jätetä <use>-kierrolle, koska kierron kopiosta ei voi napauttaa
 * mitään: i-ikoni osuisi <use>-elementtiin eikä sen sisältöön. Näin
 * ikoni on aina oikea elementti, missä päin lautaa tahansa katsotaan.
 *
 * Palauttaa siirron laudan yksiköissä tai null, jos nimi ei osu
 * näkyvään alueeseen millään kopiolla.
 */
function saumasiirto(x, nakyva, leveys, vara) {
  const kopiot = leveys ? [0, leveys, -leveys, leveys * 2] : [0];
  for (const siirto of kopiot) {
    const kohta = x + siirto;
    if (kohta >= nakyva.x - vara && kohta <= nakyva.x + nakyva.w + vara) return siirto;
  }
  return null;
}

/**
 * Piirtää näkyvät maastonimet annettuun kerrokseen.
 *
 * @param {SVGElement} svg   kerros, joka tyhjennetään ja täytetään
 * @param {object} map       lauta (leveys ja kiertävyys)
 * @param {object} asetukset { nimet, nakyva, avaa, joet }
 *   nimet   js/packs/maailmankartta-nimet.js:n MAAILMANKARTAN_NIMET
 *   nakyva  js/ui.js:n nakyvaAlue(): { x, y, w, h, skaala }
 *   avaa    kutsutaan i-ikonin napautuksesta: avaa(kohde)
 *   joet    tosi vain kun vesistölinssi on päällä (ks. alempaa)
 * @returns {number} montako nimeä piirrettiin (testejä ja mittausta varten)
 */
export function drawMaastonimet(svg, map, { nimet, nakyva, avaa, joet = false } = {}) {
  if (!svg) return 0;
  svg.textContent = '';
  if (!nimet || !nakyva?.skaala || !(nakyva.w > 0)) return 0;

  const { skaala } = nakyva;
  // Laudan yksiköitä, vakio: sama mitta kuin kaupungin nimellä.
  const fontti = MAASTONIMEN_YKSIKKOA;
  // Ikoni seuraa nimeä, ei ruutua: muuten se kasvaisi nimen ohi kaukaa.
  const iSade = fontti * 0.42;
  const leveys = map?.kiertava ? map.width : 0;

  /*
   * Ehdokkaat: oikean tärkeysluokan nimet, jotka osuvat näkyvään
   * alueeseen ja joiden kohde on ruudulla nimeään leveämpi.
   *
   * Reunavara on nimen puolikas: nimi, jonka keskipiste on juuri
   * ruudun ulkopuolella, näkyy silti puoliksi eikä saa kadota.
   */
  const ehdokkaat = [];
  const lisaa = (kohde, laji, x, y, mitta) => {
    if (!nimiNakyy(kohde.tarkeys, skaala)) return;
    const teksti = nimenLeveys(kohde.nimi, fontti);
    // Kohteen on oltava nimeään leveämpi, muuten nimi ei kuvaa mitään.
    if (mitta !== null && mitta < teksti * 1.15) return;
    const siirto = saumasiirto(x, nakyva, leveys, teksti);
    if (siirto === null) return;
    if (y < nakyva.y - fontti * 2 || y > nakyva.y + nakyva.h + fontti * 2) return;
    ehdokkaat.push({
      kohde, laji, x: x + siirto, y, siirto, teksti,
    });
  };

  /*
   * JOKIEN NIMET VAIN VESISTÖLINSSIN KANSSA.
   *
   * Nimi piirretään sinne missä sen kohde on. Joet lähtivät
   * pohjakartalta (drawMaasto), joten niiden nimet lähtivät mukana:
   * kaunokirjoitettu "Tonava" tyhjän maan päällä ei kerro mitään.
   * Vesistölinssi (js/linssit/vesistot.js) piirtää uomat takaisin, ja
   * silloin nimillä on taas kohde — `joet` on tosi juuri silloin.
   *
   * Nimet EIVÄT ole linssin omassa kerroksessa, vaikka ne kuuluvat
   * linssiin. Syy on mittakaava: linssikerros piirretään kerran linssiä
   * vaihdettaessa, tämä kerros joka zoomilla. Linssin sisällä nimi
   * jäätyisi yhteen kokoon — maailmankuvassa lukukelvottomaksi ja
   * kaupunkikuvassa jättimäiseksi.
   *
   * Ankkuri on uoman KIINTEÄ keskikohta eikä lähin piste ruudun
   * keskustaan: omistaja "Joen nimi hyppii uusiin paikkoihin kun karttaa
   * katsoo eri paikassa". Nimi kuuluu paikkaan, ei katseeseen.
   */
  if (joet) {
    for (const joki of nimet.joet ?? []) {
      const pisteet = joki.pisteet ?? [];
      if (pisteet.length < 2) continue;
      const piste = pisteet[Math.floor(pisteet.length / 2)];
      lisaa(joki, 'joki', piste[0], piste[1], joki.pituus);
    }
  }
  for (const jarvi of nimet.jarvet ?? []) lisaa(jarvi, 'jarvi', jarvi.x, jarvi.y, jarvi.pituus);
  // Vuoristolla ei ole mittaa: se on nimipaketissa piste ja kulma, ei
  // muoto. Nimi kirjoitetaan sen yli, joten se mahtuu aina.
  for (const vuori of nimet.vuoret ?? []) lisaa(vuori, 'vuori', vuori.x, vuori.y, null);

  /*
   * Tärkein ensin, ja saman luokan sisällä suurin kohde ensin. Kun
   * kaksi nimeä on päällekkäin, kartalle jää se, joka kertoo enemmän.
   */
  ehdokkaat.sort((a, b) => (a.kohde.tarkeys - b.kohde.tarkeys)
    || ((b.kohde.pituus ?? 0) - (a.kohde.pituus ?? 0)));

  const varatut = [];
  const vapaa = (laatikko) => !varatut.some((v) => (
    laatikko.x0 < v.x1 && laatikko.x1 > v.x0 && laatikko.y0 < v.y1 && laatikko.y1 > v.y0
  ));

  const maarittelyt = el('defs', {}, svg);
  let piirretty = 0;

  for (const e of ehdokkaat) {
    const { kohde } = e;
    // i-ikoni vain sinne, missä ei ole jo omaa laattaa tai kaupunkia.
    const ikoni = !kohde.laatta;
    const kokoLeveys = e.teksti + (ikoni ? iSade * 3.2 : 0);
    const laatikko = {
      x0: e.x - kokoLeveys / 2, x1: e.x + kokoLeveys / 2,
      y0: e.y - fontti * 0.75, y1: e.y + fontti * 0.75,
    };
    if (!vapaa(laatikko)) continue;
    varatut.push(laatikko);
    piirretty += 1;

    /*
     * Kohteen oma paikka jää määreiksi (ilman saumasiirtoa), jotta
     * kutsuja voi päätellä MISSÄ MAASSA nimi on. Fokusmoodi tarvitsee
     * sen: muiden alueiden maastonimet himmennetään harson mukana
     * (js/ui.js himmennaMaastonimet), eikä nimestä muuten näkisi
     * mihin se kartalla osuu.
     */
    const ryhma = el('g', {
      class: `maastonimi maastonimi-${e.laji}`,
      'data-x': (e.x - e.siirto).toFixed(1),
      'data-y': e.y.toFixed(1),
    }, svg);
    let ikoninPaikka = null;

    /*
     * Kelpaako uoma kaareksi juuri tässä kohdassa?
     *
     * Joki voi tehdä nimen mitalla täyskäännöksen (Volgan mutka
     * Volgogradin kohdalla). Silloin kaaren päät ovat lähes päällekkäin
     * eikä sille voi kirjoittaa mitään — nimi kiertyisi kerälle.
     * Ikkunaa yritetään ensin leventää, koska laajemmalla otoksella
     * mutka keskiarvoistuu pois ja joen yleissuunta löytyy. Jos sekään
     * ei auta, nimi kirjoitetaan suorana: luettava nimi väärällä
     * kulmalla on parempi kuin lukukelvoton oikealla.
     */
    /*
     * KAIKKI NIMET VAAKAAN.
     *
     * Ennen joen nimi seurasi uomaa ja vuoriston nimi jonon kulmaa. Se
     * näytti kartalta — mutta pohjois-eteläinen jono kääntää nimen
     * pystyyn, ja pystyssä oleva nimi on kyltti jota ei lueta.
     * Omistajan havainto: "Uralin nimikyltistä ei saa selvää. Nimet
     * voisi kirjoittaa aina vaakasuuntaan ja saa olla kyllä isommalla."
     * Ural on aineistossa -87 astetta ja Andit -84, eli käytännössä
     * pystysuoria.
     *
     * Luettavuus voittaa tyylin. Nimi kirjoitetaan siihen kohtaan, joka
     * kohteesta on lähinnä ruudun keskustaa — joen kohdalla se on yhä
     * uoman piste, joten nimi osuu uomalle vaikkei seuraakaan sitä.
     */
    const teksti = el('text', {
      x: e.x.toFixed(1), y: e.y.toFixed(1), class: 'maastonimi-teksti',
      'font-size': fontti.toFixed(1), 'text-anchor': 'middle',
    }, ryhma);
    teksti.textContent = kohde.nimi;
    if (ikoni) {
      ikoninPaikka = [
        e.x + mitattuLeveys(teksti, e.teksti) / 2 + iSade * 1.6,
        e.y - fontti * 0.3,
      ];
    }

    if (ikoni && ikoninPaikka) piirraIIkoni(ryhma, ikoninPaikka, iSade, kohde, avaa, 0);
  }

  return piirretty;
}

/*
 * Pieni i nimen perässä: napautus avaa Lue lisää -ikkunan.
 *
 * Ikoni käännetään takaisin pystyyn silloinkin kun nimi on kallellaan
 * (Ural -87°, Andit -84°): kirjain i luetaan pystyssä, ja kallellaan se
 * näyttäisi virheeltä eikä tyyliltä.
 *
 * Napautus pysäytetään tähän. Kartalla on oma napautuszoomauksensa ja
 * kaupunkien valinta, ja ilman pysäytystä i-ikonin painallus zoomaisi
 * kartan sen sijaan että avaisi ikkunan.
 */
function piirraIIkoni(parent, [x, y], sade, kohde, avaa, kulma) {
  const g = el('g', {
    class: 'maastonimi-i',
    transform: `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${-kulma})`,
    role: 'button',
    tabindex: '0',
  }, parent);
  el('title', {}, g).textContent = `${kohde.nimi} — lue lisää`;
  el('circle', { r: sade.toFixed(1), class: 'maastonimi-i-keha' }, g);
  el('text', {
    x: 0, y: sade * 0.36, class: 'maastonimi-i-kirjain',
    'font-size': (sade * 1.15).toFixed(1), 'text-anchor': 'middle',
  }, g).textContent = 'i';
  if (!avaa) return g;
  const paina = (e) => {
    e.stopPropagation();
    e.preventDefault();
    avaa(kohde);
  };
  g.addEventListener('click', paina);
  // Osoittimen painallus pysäytetään erikseen: kartan raahaus alkaa
  // pointerdownista, eikä ikonin painaminen saa käynnistää sitä.
  g.addEventListener('pointerdown', (e) => e.stopPropagation());
  g.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') paina(e);
  });
  return g;
}


// --- lähikuvan vesi ------------------------------------------------------------

/*
 * Vesi muuttuu sitä mukaa kuin sitä lähestyy.
 *
 * Omistajan toive 4.8.2026: "Joet voisi levetä ja tulla
 * kolmiulotteisemmiksi kun zoomattu tarpeeksi. Silloin voisi ehkä tulla
 * myös sininen väri. Sama järvissä ja merissä. Niihin voisi tehdä saman
 * kevyen topografian."
 *
 * Kaukaa katsottuna kartta on vanha painate: meri on paperia ja joki
 * ohut mustejuova. Se on oikea vaikutelma yleisnäkymässä, ja siihen ei
 * kosketa. Lähellä sama kartta on eri esine — silloin joella on uoma,
 * järvellä syvyys ja merellä pohja.
 *
 * TÄMÄ KERROS EI OLE STAATTISESSA TAITEESSA. Staattinen taide
 * muutetaan bittikartaksi kerran, joten zoomista riippuva sävy
 * jäätyisi siihen mittakaavaan, jossa kuva sattui syntymään. Siksi
 * lähivesi on elävässä puussa kuten maastonimet — ja siksi sen
 * elementtimäärä on pidettävä kurissa: piirretään vain se, mikä on
 * näkyvissä.
 */

/* Näkyvä leveys laudan yksiköinä: mistä vesi alkaa herätä ja missä se on täysi. */
const LAHIVESI_ALKAA = 3400;
const LAHIVESI_TAYSI = 900;

/*
 * Uoman leveys laudan yksiköinä tärkeysluokan mukaan.
 *
 * Laudan yksikköinä eikä pikseleinä: silloin uoma levenee ruudulla
 * samassa tahdissa kuin kartta, mikä on juuri se vaikutelma jota
 * haettiin. Pikselimitta pysyisi samana ja joki näyttäisi kutistuvan
 * mitä lähemmäs mennään.
 *
 * Ensimmäiset luvut (13 / 8 / 5) olivat yli kaksinkertaiset. Amazon
 * piirtyi paksumpana kuin kaupunkien ympyrät, ja kartalta katosi
 * mittasuhde: joki näytti moottoritieltä. Omistaja: "joet näkyvät
 * liian suurina, kolmiulotteisuus pitäisi olla hienovaraisempi".
 * Nyt levein uoma on kaupungin ympyrää kapeampi, ja se on oikea
 * suhde — joki on maiseman piirre, ei pelin kohde.
 */
/*
 * Uoman leveys tärkeysluokittain, laudan yksiköitä.
 *
 * Kavennettu kolmanneksella (6 / 3,6 / 2,2 -> 4 / 2,4 / 1,5) omistajan
 * havainnon jälkeen: "Joet ovat liian leveitä." Sama huomautus tuli jo
 * kerran aiemmin, ja silloin kavennettiin liian varovasti. Joki on
 * kartalla viiva eikä nauha: leveä uoma vie huomion mantereelta ja saa
 * pienen joen näyttämään suurelta.
 */
const UOMAN_LEVEYS = { 1: 4, 2: 2.4, 3: 1.5 };

const rajaa = (arvo, ala, yla) => Math.min(yla, Math.max(ala, arvo));

/** Kuinka voimakkaana lähivesi näkyy: 0 kaukana, 1 lähellä. */
export function lahivedenVoima(nakyvaLeveys) {
  if (!nakyvaLeveys) return 0;
  return rajaa((LAHIVESI_ALKAA - nakyvaLeveys) / (LAHIVESI_ALKAA - LAHIVESI_TAYSI), 0, 1);
}

const osuuIkkunaan = (pisteet, ikkuna, vara) => {
  let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
  for (const [x, y] of pisteet) {
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
  return !(x0 > ikkuna.x + ikkuna.w + vara || x1 < ikkuna.x - vara
    || y0 > ikkuna.y + ikkuna.h + vara || y1 < ikkuna.y - vara);
};

/**
 * Lähikuvan vesi: uomat, järvien syvyys ja meren pohja.
 *
 * @param ryhma    elävä <g>, joka tyhjennetään ja täytetään
 * @param map      pack.map (maasto, kiertava, width)
 * @param nakyva   { x, y, w, h } laudan yksiköissä
 * @param nimet    VESISTONIMET tärkeysluokkia varten (valinnainen)
 * @param syvyys   MERISYVYYS-vyöhykkeet (valinnainen)
 * @param meriRajaus  clip-path-viittaus, joka rajaa merenpohjan mereen
 *                    (valinnainen; ks. lahivesi-meri alempana)
 */
export function drawLahivesi(ryhma, map, { nakyva, nimet, syvyys, meriRajaus } = {}) {
  if (!ryhma) return;
  ryhma.textContent = '';
  const voima = lahivedenVoima(nakyva?.w);
  if (!voima || !map?.maasto) return;

  const vara = nakyva.w * 0.2;
  const kierrot = map.kiertava ? [0, -map.width, map.width] : [0];
  const nakyy = (pisteet) => kierrot.some((dx) => osuuIkkunaan(
    dx ? pisteet.map(([x, y]) => [x + dx, y]) : pisteet, nakyva, vara,
  ));

  /*
   * Ryhmän peittävyys hoitaa häivytyksen. Yksittäisten viivojen
   * peittävyyden säätäminen kasaisi ne päällekkäin: kolme läpikuultavaa
   * vetoa samasta uomasta näkyisi kolmena raitana eikä yhtenä nauhana.
   */
  const g = el('g', { class: 'lahivesi', opacity: voima.toFixed(3) }, ryhma);

  /*
   * --- meren pohja: matalimmasta syvimpään, sisäkkäiset vyöhykkeet ---
   *
   * RAJATTU MAAN ULKOPUOLELLE. Syvyysvyöhykkeet ovat omaa aineistoaan
   * eivätkä tunne tämän kartan rantaviivaa: ne on projisoitu laudalle
   * karkeampana kuin piirretty rannikko, ja matalikko (0–200 m) ulottuu
   * siksi rannan yli maalle. Omistajan havainto: "veden sinisyys vuotaa
   * maiden päälle" — Itämeren, Mustanmeren ja Punaisenmeren ympärillä
   * vaalea sävy peitti kokonaisia maakuntia.
   *
   * Kerros piirretään laudan päälle (js/ui.js: lahivesiKerros on
   * staattisen taiteen jälkeen), joten järjestys ei sitä korjaa: sama
   * kerros sisältää joet ja järvet, joiden PITÄÄ olla maan päällä.
   * Rajaus koskee siis vain merenpohjaa.
   *
   * Sama vika korjattiin kerran jo toiseen suuntaan: maan korostussävy
   * valui mereen, ja se rajattiin rantaviivan sisään (js/ui.js
   * `maa-rajaus`). Tämä on saman rajan toinen puoli.
   */
  if (syvyys?.vyohykkeet?.length) {
    const meri = el('g', {
      class: 'lahivesi-meri',
      ...(meriRajaus ? { 'clip-path': meriRajaus } : {}),
    }, g);
    for (const vyohyke of syvyys.vyohykkeet) {
      const luokka = `merisyvyys merisyvyys-${String(vyohyke.metria).replace('-', '')}`;
      for (const rengas of vyohyke.renkaat ?? []) {
        if (rengas.length < 4 || !nakyy(rengas)) continue;
        el('path', { d: smoothClosedPath(rengas), class: luokka }, meri);
      }
    }
  }

  // --- järvet: vesi ja matala reunus ---
  const tarkeydet = new Map((nimet?.jarvet ?? []).map((j) => [j.avain, j.tarkeys]));
  const jarvet = el('g', { class: 'lahivesi-jarvet' }, g);
  let rajausNro = 0;
  for (const jarvi of map.maasto.jarvet ?? []) {
    const rengas = jarvi.rengas ?? jarvi;
    if (!rengas || rengas.length < 4 || !nakyy(rengas)) continue;
    const d = smoothClosedPath(kasinPiirretty(rengas));
    el('path', { d, class: 'lahivesi-jarvi' }, jarvet);
    /*
     * Matala reunus paksuna viivana järven SISÄPUOLELLE rajattuna.
     * Oikea monikulmion kutistus on työläs ja menee solmuun kapeilla
     * järvillä (Baikal, Tanganjika); rajattu paksu veto antaa saman
     * vaikutelman — reuna matala, keskusta syvä — ilman geometriaa.
     */
    const tunnus = `jarviraja${rajausNro++}`;
    const rajaus = el('clipPath', { id: tunnus }, jarvet);
    el('path', { d }, rajaus);
    el('path', { d, class: 'lahivesi-jarvi-matala', 'clip-path': `url(#${tunnus})` }, jarvet);
    void tarkeydet;
  }

  // --- joet: uoma, rannat ja valo ---
  const jokiTarkeys = new Map((nimet?.joet ?? []).map((j) => [j.avain, j.tarkeys]));
  const joet = el('g', { class: 'lahivesi-joet' }, g);
  for (const joki of map.maasto.joet ?? []) {
    const pisteet = joki.pisteet ?? joki;
    if (!pisteet || pisteet.length < 2 || !nakyy(pisteet)) continue;
    const leveys = UOMAN_LEVEYS[jokiTarkeys.get(joki.nimi) ?? 3] ?? UOMAN_LEVEYS[3];
    const d = smoothOpenPath(kasinPiirretty(pisteet));
    /*
     * Kolme vetoa päällekkäin tekee pyöreän nauhan ilman suodattimia:
     * levein tummana rantana, keskimmäinen vetenä ja kapein vaaleana
     * valona hieman ylävasemmalle siirrettynä. Suodattimet olisivat
     * helpompi tapa, mutta iOS:n webapp-tila palauttaa suodatetun
     * kerroksen tyhjänä — se on rikkonut tämän kartan kolmesti.
     *
     * MITTASUHTEET OVAT KOKO TEMPUN YDIN. Ensin ranta oli 1,35-kertainen
     * ja valo siirtyi kuudesosan leveydestä: molemmat erottuivat omiksi
     * viivoikseen, ja nauhasta tuli putki jossa on kolme raitaa. Kun
     * ranta on vain hitusen uomaa leveämpi ja valo siirtyy alle
     * kymmenesosan, silmä ei enää erota vetoja toisistaan vaan lukee
     * ne yhdeksi pyöreäksi pinnaksi. Hienovaraisuus ei ole tässä
     * makuasia vaan se, mikä erottaa veden putkesta.
     */
    el('path', { d, class: 'lahivesi-ranta', 'stroke-width': (leveys * 1.18).toFixed(2) }, joet);
    el('path', { d, class: 'lahivesi-uoma', 'stroke-width': leveys.toFixed(2) }, joet);
    el('path', {
      d, class: 'lahivesi-valo', 'stroke-width': (leveys * 0.22).toFixed(2),
      transform: `translate(${(-leveys * 0.09).toFixed(2)},${(-leveys * 0.09).toFixed(2)})`,
    }, joet);
  }
}

// --- geometria: missä on merta, missä tyhjää maata ------------------------

/*
 * Ääriviivan rajauslaatikko muistissa.
 *
 * Piste, joka on laatikon ulkopuolella, on varmasti myös ääriviivan
 * ulkopuolella — ja laatikon tarkistus on neljä vertailua, kun koko
 * ääriviivan läpikäynti on tuhansia. Yhdistetyllä kartalla on 38
 * ääriviivaa ja niissä yhteensä tuhansia pisteitä, joten ilman tätä
 * jokainen "onko tämä maalla" -kysymys maksoi noin millisekunnin.
 * Kartan piirto kysyy sitä tuhansia kertoja.
 *
 * WeakMap eikä kenttä ääriviivaan: pakettien data on jaettua, eikä
 * siihen pidä kirjoittaa mitään.
 */
const rajaukset = new WeakMap();

function rajaus(poly) {
  let laatikko = rajaukset.get(poly);
  if (laatikko) return laatikko;
  let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
  for (const [x, y] of poly) {
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
  laatikko = { x0, y0, x1, y1 };
  rajaukset.set(poly, laatikko);
  return laatikko;
}

/*
 * Ääriviivan janat vaakakaistoihin.
 *
 * Säteenheitto laskee vain ne janat, jotka ylittävät pisteen
 * korkeuden — muut eivät voi osua. Ilman kaistoja ne silti käydään
 * läpi: Euraasian ja Afrikan yhteinen rannikko on kymmenentuhatta
 * pistettä, ja jokainen "onko tämä maalla" kävi ne kaikki.
 *
 * Rajauslaatikko ei auta tässä, koska Euraasian laatikko peittää
 * puolet kartasta. Kaista peittää muutaman kymmenen janaa.
 */
const kaistat = new WeakMap();
const KAISTAN_KORKEUS = 64;

function kaistoita(poly) {
  let indeksi = kaistat.get(poly);
  if (indeksi) return indeksi;
  const r = rajaus(poly);
  const maara = Math.max(1, Math.ceil((r.y1 - r.y0) / KAISTAN_KORKEUS) + 1);
  const listat = Array.from({ length: maara }, () => []);
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const ala = Math.min(poly[i][1], poly[j][1]);
    const yla = Math.max(poly[i][1], poly[j][1]);
    const k0 = Math.max(0, Math.floor((ala - r.y0) / KAISTAN_KORKEUS));
    const k1 = Math.min(maara - 1, Math.floor((yla - r.y0) / KAISTAN_KORKEUS));
    for (let k = k0; k <= k1; k++) listat[k].push([poly[i], poly[j]]);
  }
  indeksi = { y0: r.y0, listat };
  kaistat.set(poly, indeksi);
  return indeksi;
}

function pointInPolygon([px, py], poly) {
  const r = rajaus(poly);
  if (px < r.x0 || px > r.x1 || py < r.y0 || py > r.y1) return false;
  const { y0, listat } = kaistoita(poly);
  const kaista = listat[Math.min(listat.length - 1, Math.max(0, Math.floor((py - y0) / KAISTAN_KORKEUS)))];
  let inside = false;
  for (const [[xi, yi], [xj, yj]] of kaista) {
    const hits = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (hits) inside = !inside;
  }
  return inside;
}

function distanceToPolygon([px, py], poly) {
  let best = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [x1, y1] = poly[j];
    const [x2, y2] = poly[i];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len2 = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / len2));
    best = Math.min(best, Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy)));
  }
  return best;
}

function onLand(p, map) {
  /*
   * Kiertävällä kartalla sama piste on olemassa kolmessa kohdassa.
   *
   * Ääriviivat saavat mennä laudan reunan yli — Tšukotka alkaa laudan
   * oikeasta laidasta ja jatkuu tuhat yksikköä sen yli. Piste, joka on
   * vasemmassa laidassa, on siis oikeasti sen ääriviivan sisällä,
   * vaikka lukuina ne ovat kaukana toisistaan. Ja päinvastoin: reitin
   * välipiste voi olla laudan ulkopuolella ja silti keskellä mannerta.
   *
   * Siksi kokeillaan kolmea kohtaa: piste itse ja sen kopiot molemmin
   * puolin. Tavallisella kartalla tämä ei muutu miksikään.
   */
  const kohdat = map.kiertava
    ? [p, [p[0] - map.width, p[1]], [p[0] + map.width, p[1]]]
    : [p];
  const osuma = kohdat.find((k) => map.outlines.some((outline) => pointInPolygon(k, outline)));
  if (!osuma) return false;
  // Järvet ovat vettä maan sisällä (map.lakes) — esimerkiksi Saimaa tai Inari.
  return !(map.lakes ?? []).some((lake) => pointInPolygon(osuma, lake));
}

/*
 * Rannikkojanat ruudukkoon, kerran laudalle.
 *
 * Ilman tätä `coastDistance` kävi läpi JOKAISEN rannikkopisteen joka
 * kerta. Vanhalla maailmalla se oli siedettävää; maailmankartalla se
 * ei ollut. Kartta on kolme kertaa isompi ja siinä on kaksi kertaa
 * enemmän rannikkoa, ja taustapisteiden laskenta vei 22 sekuntia —
 * sivu ei latautunut lainkaan.
 *
 * Ruudukko rakennetaan laiskasti ja säilytetään WeakMapissa laudan
 * mukana, joten se katoaa laudan mukana eikä vuoda muistia.
 */
const RANTARUUDUKOT = new WeakMap();
const RUUDUN_KOKO = 120;

function rantaruudukko(map) {
  let ruudukko = RANTARUUDUKOT.get(map);
  if (ruudukko) return ruudukko;
  const solut = new Map();
  for (const outline of [...map.outlines, ...(map.lakes ?? [])]) {
    for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
      const jana = [outline[j], outline[i]];
      const x0 = Math.floor(Math.min(jana[0][0], jana[1][0]) / RUUDUN_KOKO);
      const x1 = Math.floor(Math.max(jana[0][0], jana[1][0]) / RUUDUN_KOKO);
      const y0 = Math.floor(Math.min(jana[0][1], jana[1][1]) / RUUDUN_KOKO);
      const y1 = Math.floor(Math.max(jana[0][1], jana[1][1]) / RUUDUN_KOKO);
      for (let x = x0; x <= x1; x++) {
        for (let y = y0; y <= y1; y++) {
          const avain = `${x}:${y}`;
          let lista = solut.get(avain);
          if (!lista) solut.set(avain, lista = []);
          lista.push(jana);
        }
      }
    }
  }
  ruudukko = solut;
  RANTARUUDUKOT.set(map, ruudukko);
  return ruudukko;
}

/** Pisteen etäisyys yhteen janaan. */
function janaEtaisyys([px, py], [[x1, y1], [x2, y2]]) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / len2));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

/*
 * Etäisyys lähimpään rantaan. Haku laajenee ruutukehä kerrallaan ja
 * pysähtyy heti kun ulompi kehä ei voi enää sisältää lähempää janaa.
 *
 * Yläraja on kaksitoista kehää eli noin 1400 yksikköä. Kauempana
 * merellä tarkka luku ei kiinnosta ketään: kutsujat vertaavat sitä
 * muutaman kymmenen yksikön marginaaliin.
 */
function coastDistance(p, map) {
  const solut = rantaruudukko(map);
  const cx = Math.floor(p[0] / RUUDUN_KOKO);
  const cy = Math.floor(p[1] / RUUDUN_KOKO);
  let best = Infinity;
  for (let r = 0; r <= 12; r++) {
    for (let x = cx - r; x <= cx + r; x++) {
      for (let y = cy - r; y <= cy + r; y++) {
        // Vain uusi kehä; sisemmät on jo käyty.
        if (Math.max(Math.abs(x - cx), Math.abs(y - cy)) !== r) continue;
        for (const jana of solut.get(`${x}:${y}`) ?? []) {
          best = Math.min(best, janaEtaisyys(p, jana));
        }
      }
    }
    if (best <= r * RUUDUN_KOKO) return best;
  }
  return best;
}

/** Ruudukon pisteet merellä, riittävän kaukana rannikosta. */
export function seaPoints(map, spacing = 92, margin = 46) {
  const points = [];
  for (let x = 30; x < map.width; x += spacing) {
    for (let y = 30; y < map.height; y += spacing) {
      const p = [x, y];
      if (onLand(p, map) || coastDistance(p, map) < margin) continue;
      points.push(p);
    }
  }
  return points;
}

/** Ruudukon pisteet maalla, riittävän kaukana rannikosta ja esteistä. */
export function landPoints(map, obstacles, spacing = 78, clearance = 34) {
  const points = [];
  for (let x = 40; x < map.width; x += spacing) {
    for (let y = 40; y < map.height; y += spacing) {
      const p = [x, y];
      if (!onLand(p, map) || coastDistance(p, map) < 34) continue;
      if (obstacles.some((o) => Math.hypot(p[0] - o.x, p[1] - o.y) < clearance)) continue;
      points.push(p);
    }
  }
  return points;
}

function blocked(p, zones) {
  return zones.some((z) => Math.hypot(p[0] - z.x, p[1] - z.y) < (z.r ?? 90));
}

/** Merelle piirretyt kaksoiskaaret, jotka merkitsevät aaltoja. */
export function drawWaves(svg, map, skipZones = []) {
  // Ei suodatinta: aaltomerkit vaihtelevat jo paikaltaan, kooltaan,
  // kallistukseltaan ja tummuudeltaan, joten suodattimen lisäämä ±1,75
  // yksikön väre ei niissä juuri näkynyt — mutta sen puskuri katosi.
  const g = el('g', { class: 'waves' }, svg);
  seaPoints(map).forEach((p, i) => {
    if (i % 2 === 1 || blocked(p, skipZones)) return;
    const key = `wave:${p[0]}:${p[1]}`;
    const x = p[0] + vary(`${key}:x`, 9);
    const y = p[1] + vary(`${key}:y`, 7);
    const w = 17 + hash01(`${key}:w`) * 9;
    const lift = 5 + hash01(`${key}:l`) * 4;
    const tilt = vary(`${key}:r`, 5);
    const wave = el('g', {
      transform: `rotate(${tilt.toFixed(2)} ${x.toFixed(1)} ${y.toFixed(1)})`,
      opacity: (0.75 + hash01(`${key}:o`) * 0.45).toFixed(2),
    }, g);
    el('path', {
      d: `M${x - w},${y} q${w / 2},${-lift} ${w},0 q${w / 2},${lift} ${w},0`,
      class: 'wave',
    }, wave);
    el('path', {
      d: `M${x - w + 7},${y + 11 + lift} q${w / 2},${-lift} ${w},0 q${w / 2},${lift} ${w},0`,
      class: 'wave',
    }, wave);
  });
}

// Yksittäisten maastomerkkien piirto: dyynit, puu ja vuoret.
const TERRAIN_MARKS = {
  dunes(mark, x, y) {
    el('path', {
      d: `M${x - 16},${y} q8,-9 16,0 M${x - 2},${y + 8} q8,-9 16,0`,
      class: 'terrain-mark',
    }, mark);
  },
  trees(mark, x, y) {
    el('path', { d: `M${x},${y + 8} L${x},${y - 4}`, class: 'terrain-mark' }, mark);
    el('path', {
      d: `M${x},${y - 4} q-11,-2 -13,-10 q9,1 13,7 q4,-6 13,-7 q-2,8 -13,10 z`,
      class: 'terrain-fill',
    }, mark);
  },
  mountains(mark, x, y) {
    el('path', {
      d: `M${x - 15},${y + 8} l9,-14 l7,10 l6,-8 l8,12 z`,
      class: 'terrain-mark',
    }, mark);
  },
  // Kaupunkilaudan korttelit: kaksi pientä taloa harjakattoineen.
  houses(mark, x, y) {
    el('path', {
      d: `M${x - 13},${y + 7} L${x - 13},${y - 1} L${x - 7},${y - 7} L${x - 1},${y - 1} L${x - 1},${y + 7} Z`,
      class: 'terrain-mark',
    }, mark);
    el('path', {
      d: `M${x + 3},${y + 7} L${x + 3},${y + 1} L${x + 8},${y - 4} L${x + 13},${y + 1} L${x + 13},${y + 7} Z`,
      class: 'terrain-mark',
    }, mark);
  },
};

/**
 * Maaston merkit vanhan kartan tapaan. Merkin laji valitaan paketin
 * leveysvyöhykkeistä (decor.terrainBands), ja merkit piirretään vain kohtiin,
 * joissa ei ole reittejä tai nimiä.
 */
export function drawTerrain(svg, map, obstacles, bands) {
  // Ei suodatinta, ks. drawWaves: merkeillä on jo oma vaihtelunsa.
  const g = el('g', { class: 'terrain' }, svg);
  landPoints(map, obstacles).forEach((p, i) => {
    if (i % 2 === 1) return;
    const key = `terrain:${p[0]}:${p[1]}`;
    const x = p[0] + vary(`${key}:x`, 8);
    const y = p[1] + vary(`${key}:y`, 6);
    const mark = el('g', {
      transform: `rotate(${vary(`${key}:r`, 6).toFixed(2)} ${x.toFixed(1)} ${y.toFixed(1)}) `
        + `scale(${(0.88 + hash01(`${key}:s`) * 0.3).toFixed(2)})`,
      opacity: (0.8 + hash01(`${key}:o`) * 0.4).toFixed(2),
      'transform-origin': `${x.toFixed(1)}px ${y.toFixed(1)}px`,
    }, g);
    const band = bands.find((b) => y < b.maxY) ?? bands[bands.length - 1];
    (TERRAIN_MARKS[band.kind] ?? TERRAIN_MARKS.mountains)(mark, x, y);
  });
}

/** Kompassiruusu. */
/**
 * Pallonpuoliskokartan kehykset: 1600-luvun maailmankartoissa kumpikin
 * puolisko piirrettiin kaksoiskehän sisään, jonka väliin merkittiin asteet.
 * Sisään piirretään asteverkko — stereografisessa projektiossa sekä
 * pituus- että leveyspiirit ovat ympyränkaaria, mutta tässä riittää
 * kaarien approksimointi murtoviivalla samasta projektiokaavasta.
 */
/** Murtoviiva SVG-poluksi. */
function linePath(points) {
  return points
    .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join('');
}

export function drawHemisphereFrames(svg, map) {
  const kehat = map.hemispheres ?? [];
  const navat = map.polars ?? [];
  if (!kehat.length && !navat.length) return;
  // Ei suodatinta. Kehykset ovat laskettuja ympyröitä ja kaaria, joten
  // heilunta piirretään niihin itseensä — muuten 1600-luvun kartasta
  // tulisi harpilla vedetty.
  const g = el('g', { class: 'hemi-frames' }, svg);
  const kehaPolku = (r, siemen) => wobblyCircle(r, siemen, 2.2, 72);

  const RAD = Math.PI / 180;
  // Sama kaava kuin tools/hemispheres.mjs — pidettävä yhtenäisenä.
  const project = ({ cx, cy, r, lon0 }) => (lon, lat) => {
    let d = lon - lon0;
    while (d > 180) d -= 360;
    while (d < -180) d += 360;
    const k = r / (1 + Math.cos(lat * RAD) * Math.cos(d * RAD));
    return [cx + k * Math.cos(lat * RAD) * Math.sin(d * RAD), cy - k * Math.sin(lat * RAD)];
  };

  for (const kehä of kehat) {
    const { cx, cy, r } = kehä;
    const f = project(kehä);

    // Asteverkko: pituuspiirit 30° välein, leveyspiirit 30° välein.
    const verkko = el('g', { class: 'graticule' }, g);
    for (let lon = -180; lon < 180; lon += 30) {
      const pts = [];
      for (let lat = -88; lat <= 88; lat += 4) {
        const d = ((lon - kehä.lon0 + 540) % 360) - 180;
        if (Math.abs(d) > 89.5) continue;
        pts.push(f(lon, lat));
      }
      if (pts.length > 1) {
        el('path', { d: linePath(kasinPiirretty(pts, 1.8)), class: 'graticule-line' }, verkko);
      }
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts = [];
      for (let d = -89.5; d <= 89.5; d += 3) pts.push(f(kehä.lon0 + d, lat));
      el('path', { d: linePath(kasinPiirretty(pts, 1.8)), class: 'graticule-line' }, verkko);
    }
    // Päiväntasaaja hieman vahvempana.
    const eq = [];
    for (let d = -89.5; d <= 89.5; d += 3) eq.push(f(kehä.lon0 + d, 0));
    el('path', { d: linePath(kasinPiirretty(eq, 1.8)), class: 'graticule-line strong' }, verkko);

    // Kaksoiskehä ja astepykälät väliin.
    el('path', {
      d: kehaPolku(r + 13, `hemi:${cx}:ulko`), transform: `translate(${cx},${cy})`,
      class: 'hemi-ring outer',
    }, g);
    el('path', {
      d: kehaPolku(r, `hemi:${cx}:sisa`), transform: `translate(${cx},${cy})`,
      class: 'hemi-ring',
    }, g);
    const ticks = el('g', { class: 'hemi-ticks' }, g);
    for (let a = 0; a < 360; a += 5) {
      const rad = a * RAD;
      const iso = a % 15 === 0;
      const r1 = r + (iso ? 1 : 5);
      const r2 = r + 12;
      el('path', {
        d: `M${(cx + r1 * Math.cos(rad)).toFixed(1)},${(cy + r1 * Math.sin(rad)).toFixed(1)}`
          + `L${(cx + r2 * Math.cos(rad)).toFixed(1)},${(cy + r2 * Math.sin(rad)).toFixed(1)}`,
        class: 'hemi-tick',
      }, ticks);
    }
  }

  // Napaympyrät: yksinkertaisempi kehä ja säteittäinen verkko.
  for (const napa of navat) {
    const { cx, cy, r } = napa;
    const verkko = el('g', { class: 'graticule' }, g);
    for (let a = 0; a < 360; a += 30) {
      const rad = a * RAD;
      el('path', {
        d: `M${cx},${cy}L${(cx + r * Math.cos(rad)).toFixed(1)},${(cy + r * Math.sin(rad)).toFixed(1)}`,
        class: 'graticule-line',
      }, verkko);
    }
    for (const osa of [0.34, 0.67]) {
      el('path', {
        d: kehaPolku(r * osa, `napa:${cx}:${osa}`), transform: `translate(${cx},${cy})`,
        class: 'graticule-line', fill: 'none',
      }, verkko);
    }
    el('path', {
      d: kehaPolku(r + 9, `napa:${cx}:ulko`), transform: `translate(${cx},${cy})`,
      class: 'hemi-ring outer',
    }, g);
    el('path', {
      d: kehaPolku(r, `napa:${cx}:sisa`), transform: `translate(${cx},${cy})`,
      class: 'hemi-ring',
    }, g);
  }
}

export function drawCompass(svg, cx, cy, r = 62) {
  const g = el('g', { class: 'compass-rose', transform: `translate(${cx},${cy})` }, svg);
  el('circle', { r, class: 'compass' }, g);
  el('circle', { r: r * 0.72, class: 'compass' }, g);

  for (const angle of [0, 90, 180, 270]) {
    el('path', {
      d: `M0,${-r} L${r * 0.17},0 L0,${r * 0.17} L${-r * 0.17},0 Z`,
      class: 'compass-fill',
      transform: `rotate(${angle})`,
    }, g);
  }
  for (const angle of [45, 135, 225, 315]) {
    el('path', {
      d: `M0,${-r * 0.72} L${r * 0.09},0 L0,${r * 0.09} L${-r * 0.09},0 Z`,
      class: 'compass',
      transform: `rotate(${angle})`,
    }, g);
  }
  el('text', {
    x: 0, y: -r - 12, class: 'compass-letter', 'text-anchor': 'middle',
  }, g).textContent = 'N';
}

/** Onko piste mantereella (myös testien käytössä). */
export function isOnLand(point, map) {
  return onLand(point, map);
}

// --- laattojen kuvakkeet ---------------------------------------------------

/**
 * Piirtää laatan kuvakkeen ryhmään. Kuvat on suunniteltu ruutuun -12…12,
 * joten samaa kuvaketta voi käyttää kartalla ja paneelissa eri koossa.
 */
export function drawTokenIcon(parent, type) {
  const g = el('g', { class: `icon icon-${type}` }, parent);

  switch (type) {
    case 'star':
      el('path', {
        d: 'M0,-12 L3.5,-4 L12,-3.5 L5.6,2 L7.6,11 L0,6.4 L-7.6,11 L-5.6,2 L-12,-3.5 L-3.5,-4 Z',
        class: 'icon-star',
      }, g);
      break;

    case 'robber':
      // Leveälierinen hattu ja silmänaamio.
      el('path', { d: 'M-12,-2 q12,-5 24,0 q-12,4 -24,0 z', class: 'icon-hat' }, g);
      el('path', { d: 'M-7,-2 q1,-8 7,-8 q6,0 7,8 z', class: 'icon-hat' }, g);
      el('path', { d: 'M-8,2 q8,-2 16,0 l0,4 q-8,2 -16,0 z', class: 'icon-mask' }, g);
      el('circle', { cx: -3.5, cy: 4, r: 1.4, class: 'icon-eye' }, g);
      el('circle', { cx: 3.5, cy: 4, r: 1.4, class: 'icon-eye' }, g);
      break;

    case 'empty':
      el('circle', { r: 9, class: 'icon-empty' }, g);
      el('path', { d: 'M-4,0 L4,0', class: 'icon-empty-line' }, g);
      break;

    case 'linssi':
      /*
       * Taikalasi EI ole laatta vaan varuste (Raamattu: varusteet
       * ostetaan kaupasta). Kuvake on silti täällä, koska matkalaukun
       * varustenappi käyttää sitä varasoluna, jos varustekuva ei
       * lataudu (js/ui.js rakennaLinssivalikko).
       *
       * Lasi on läpikuultava eikä aarteen tapaan täyteen väritetty:
       * linssi ei peitä maailmaa vaan näyttää siitä uuden puolen.
       */
      el('circle', { cx: -2, cy: -3, r: 7.4, class: 'icon-linssi-lasi' }, g);
      el('path', { d: 'M3.2,2.2 L9.6,8.8', class: 'icon-linssi-varsi' }, g);
      // Valon kajo lasissa: sama pieni kaari kuin isoisän kiikarissa.
      el('path', { d: 'M-6.6,-4.4 A5,5 0 0 1 -2.8,-7.8', class: 'icon-linssi-kajo' }, g);
      break;

    case 'pieniAarre':
      // Pieni paikallisaarre: kolikkopino. Varasolu maalle, jonka
      // omaa aarreparia ei ole vielä kirjoitettu — ja sille hetkelle,
      // kun aarrekuva ei lataudu.
      el('ellipse', { cx: 0, cy: 6, rx: 9, ry: 3.4, class: 'icon-aarre' }, g);
      el('ellipse', { cx: 0, cy: 1, rx: 9, ry: 3.4, class: 'icon-aarre' }, g);
      el('ellipse', { cx: 0, cy: -4, rx: 9, ry: 3.4, class: 'icon-aarre' }, g);
      break;

    default: {
      /*
       * Iso paikallisaarre ja mantereen aarre: kätköarkku. Sama kuvake
       * kummallekin — ero on arvossa ja nimessä, ei muodossa, ja
       * useimmiten tilalla on aarteen oma kuva.
       */
      el('path', { d: 'M-11,-1 q11,-8 22,0 l0,9 q-11,3 -22,0 z', class: 'icon-aarre' }, g);
      el('path', { d: 'M-11,-1 L11,-1', class: 'icon-aarre-viivat' }, g);
      el('path', { d: 'M-2,-2.5 L-2,4 M2,-2.5 L2,4', class: 'icon-aarre-viivat' }, g);
    }
  }
  return g;
}

// --- käsin piirretyt apumuodot ---------------------------------------------

/** Käsin piirretyn näköinen ympyrä: säde heittelee hieman kulman mukaan. */
function wobblyCircle(radius, seed, amount = 2.4, steps = 46) {
  const pts = [];
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const r = radius + vary(`${seed}:${i}`, amount) + Math.sin(a * 3 + radius) * amount * 0.25;
    pts.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  return `${pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ')} Z`;
}

/** Sama kuvake itsenäisenä SVG:nä HTML-paneeleihin. */
export function tokenIconSvg(type, size = 18) {
  const svg = el('svg', {
    width: size,
    height: size,
    viewBox: '-13 -13 26 26',
    class: 'token-icon',
    role: 'img',
  });
  drawTokenIcon(svg, type);
  return svg;
}

/** Purjelaiva, meripeto ja karttaotsikko täyttämässä tyhjää merta. */
/**
 * Maamerkkien piirrokset. Samaa mustetyyliä kuin purjelaiva ja meripeto:
 * ohut viiva, muutama täytetty pinta, ei yksityiskohtia. Jokainen piirtyy
 * origon ympärille, jotta sijoitus on pelkkä siirto.
 */
const LANDMARKS = {
  // Giza: kolme pyramidia rivissä, takimmainen pienempänä syvyyden vuoksi.
  pyramids: (g) => {
    el('path', { d: 'M-26,14 L-9,-16 L8,14 Z', class: 'doodle-fill' }, g);
    el('path', { d: 'M2,14 L15,-8 L28,14 Z', class: 'doodle-fill' }, g);
    el('path', { d: 'M20,14 L28,1 L36,14 Z', class: 'doodle-fill' }, g);
    // Hiekan viiva jalustan alla sitoo ryhmän maahan.
    el('path', { d: 'M-32,16 q32,6 70,0', class: 'doodle' }, g);
  },
  // Pöytävuori: litteä laki ja jyrkät reunat, päällä pöytäliinapilvi.
  tablemountain: (g) => {
    el('path', { d: 'M-30,16 L-22,-8 L22,-8 L30,16 Z', class: 'doodle-fill' }, g);
    el('path', { d: 'M-24,-12 q10,-7 24,-4 q12,3 22,2', class: 'doodle' }, g);
    el('path', { d: 'M-30,16 q30,5 60,0', class: 'doodle' }, g);
  },
  // Kilimandžaro: leveä kartio, jonka laki on lumessa.
  snowpeak: (g) => {
    el('path', { d: 'M-30,16 L0,-20 L30,16 Z', class: 'doodle' }, g);
    el('path', { d: 'M-12,-6 L0,-20 L12,-6 q-12,5 -24,0 z', class: 'doodle-fill' }, g);
    el('path', { d: 'M-30,16 q30,5 60,0', class: 'doodle' }, g);
  },
  // Akropolis: pylväsrivi ja päätykolmio kalliokukkulan päällä.
  acropolis: (g) => {
    el('path', { d: 'M-34,18 q34,-9 68,0', class: 'doodle' }, g);
    el('path', { d: 'M-26,4 L0,-14 L26,4 Z', class: 'doodle-fill' }, g);
    el('path', { d: 'M-26,4 L26,4', class: 'doodle' }, g);
    for (const x of [-20, -10, 0, 10, 20]) {
      el('path', { d: `M${x},6 L${x},16`, class: 'doodle' }, g);
    }
    el('path', { d: 'M-24,16 L24,16', class: 'doodle' }, g);
  },
  // Colosseum: soikea kehä kahdessa kaarikerroksessa, toinen laita murtunut.
  colosseum: (g) => {
    // Ääriviivat täytön sijaan: umpinaisena muoto jäi tummaksi läiskäksi
    // eivätkä kaaret erottuneet.
    el('path', { d: 'M-26,8 q26,10 52,0', class: 'doodle' }, g);
    el('path', { d: 'M-26,8 L-26,-8 q26,-12 52,0 L26,8', class: 'doodle' }, g);
    el('path', { d: 'M-26,-2 q26,10 52,0', class: 'doodle' }, g);
    for (const x of [-17, -6, 5, 16]) {
      el('path', { d: `M${x},2 q0,-7 5,-7 q5,0 5,7`, class: 'doodle' }, g);
      el('path', { d: `M${x},-8 q0,-6 5,-6 q5,0 5,6`, class: 'doodle' }, g);
    }
    // Murtunut kohta oikealla: keskiajalla kivi vietiin kirkkoihin.
    el('path', { d: 'M20,-12 L26,-6', class: 'doodle' }, g);
  },
  // Tulivuori: kartio, jonka laelta nousee savu.
  volcano: (g) => {
    // Kartio ääriviivana; vain kraaterin lakiosa täytetään, jotta
    // savu erottuu eikä vuoresta tule tummaa kolmiota.
    el('path', { d: 'M-28,16 L-9,-14 L9,-14 L28,16', class: 'doodle' }, g);
    el('path', { d: 'M-9,-14 q9,5 18,0 L13,-8 q-13,5 -26,0 Z', class: 'doodle-fill' }, g);
    el('path', { d: 'M-4,-19 q-7,-9 2,-14 q9,-5 3,-13', class: 'doodle' }, g);
    el('path', { d: 'M7,-19 q7,-8 -1,-13', class: 'doodle' }, g);
    el('path', { d: 'M-14,-4 q6,10 2,20 M12,-2 q-5,9 -1,18', class: 'doodle' }, g);
    el('path', { d: 'M-28,18 q28,5 56,0', class: 'doodle' }, g);
  },
  // Geysir: maasta purkautuva vesipatsas ja höyryä.
  geyser: (g) => {
    el('path', { d: 'M-22,16 q22,-6 44,0', class: 'doodle' }, g);
    el('path', { d: 'M-8,14 q8,-16 0,-30 q-3,-8 3,-12', class: 'doodle' }, g);
    el('path', { d: 'M6,14 q-6,-14 1,-26', class: 'doodle' }, g);
    el('path', { d: 'M-14,-16 q6,-6 3,-12 M12,-14 q-5,-7 1,-12', class: 'doodle' }, g);
    el('ellipse', { cx: -1, cy: 15, rx: 13, ry: 4, class: 'doodle-fill' }, g);
  },
  // Revontulet: kaksi aaltoilevaa verhoa ja muutama tähti.
  aurora: (g) => {
    el('path', { d: 'M-32,2 q12,-20 26,-8 q14,12 30,-10', class: 'doodle' }, g);
    el('path', { d: 'M-30,12 q12,-19 26,-8 q14,12 30,-10', class: 'doodle' }, g);
    el('path', { d: 'M-26,20 q12,-17 24,-7 q13,11 27,-9', class: 'doodle' }, g);
    for (const [x, y] of [[-24, -14], [4, -18], [26, -8]]) {
      el('path', { d: `M${x - 3},${y} L${x + 3},${y} M${x},${y - 3} L${x},${y + 3}`, class: 'doodle' }, g);
    }
  },
  // Dhow: kolmiomainen latinalaispurje, joka on Intian valtameren tuntomerkki.
  dhow: (g) => {
    el('path', { d: 'M-20,10 L22,10 L14,20 L-14,20 Z', class: 'doodle-fill' }, g);
    el('path', { d: 'M-6,10 L2,-26', class: 'doodle' }, g);
    el('path', { d: 'M2,-24 L18,8 L-4,8 z', class: 'doodle-fill' }, g);
    el('path', { d: 'M-28,26 q12,7 24,0 M6,26 q12,7 24,0', class: 'doodle' }, g);
  },
};

export function drawDoodles(svg, decor) {
  if (decor.ship) {
    const ship = el('g', {
      class: 'doodle-ship', transform: `translate(${decor.ship.x},${decor.ship.y})`,
    }, svg);
    el('path', { d: 'M-40,10 L40,10 L28,30 L-28,30 Z', class: 'doodle-fill' }, ship);
    el('path', { d: 'M-2,10 L-2,-48 M18,10 L18,-30', class: 'doodle' }, ship);
    el('path', { d: 'M0,-46 q26,16 0,30 z', class: 'doodle-fill' }, ship);
    el('path', { d: 'M20,-28 q18,12 0,22 z', class: 'doodle-fill' }, ship);
    el('path', { d: 'M-52,38 q13,9 26,0 M18,38 q13,9 26,0', class: 'doodle' }, ship);
  }

  if (decor.serpent) {
    const serpent = el('g', {
      class: 'doodle-serpent', transform: `translate(${decor.serpent.x},${decor.serpent.y})`,
    }, svg);
    el('path', {
      d: 'M-78,14 q14,-30 30,-2 q10,18 22,0 q10,-16 22,-2',
      class: 'doodle',
    }, serpent);
    el('path', {
      d: 'M-4,10 q14,-22 34,-16 q-8,7 -6,16 q-12,6 -28,0 z',
      class: 'doodle-fill',
    }, serpent);
    el('path', { d: 'M-86,10 q-10,6 -6,16 q8,-4 8,-12', class: 'doodle-fill' }, serpent);
  }

  // Maamerkit: pieniä viivapiirroksia vanhojen karttojen tapaan. Ne myös
  // vihjaavat pulmista (pyramidit ↔ Kairo, Pöytävuori ↔ Kapkaupunki), joten
  // ne ovat tarkoituksella lähellä kaupunkiaan. Ei tekstiä — pelkkä kuva.
  for (const mark of decor.landmarks ?? []) {
    const g = el('g', {
      class: `doodle-landmark landmark-${mark.kind}`,
      transform: `translate(${mark.x},${mark.y})${mark.flip ? ' scale(-1,1)' : ''}`,
    }, svg);
    LANDMARKS[mark.kind]?.(g);
  }

  const title = el('g', {
    class: 'map-title-group',
    transform: `translate(${decor.mapLabelPos.x},${decor.mapLabelPos.y})`,
  }, svg);
  el('text', {
    x: 0, y: 0, class: 'map-title', 'text-anchor': 'middle', 'font-size': 34,
  }, title).textContent = decor.mapLabel;
  el('path', { d: 'M-80,14 L80,14 M-58,22 L58,22', class: 'doodle' }, title);
}

// --- staattinen taide bittikartaksi ----------------------------------------

/*
 * Kartan raskas osa — pergamentti, mantereet, aallot, maasto ja
 * koristeet — muutetaan yhdeksi kuvaksi.
 *
 * MIKSI. Panorointi tehdään CSS-muunnoksella, ja koodin vanha kommentti
 * lupasi, että selain käyttää silloin valmista rasteria. Mittaus osoitti
 * lupauksen vääräksi: yhdistetyllä laudalla SVG:ssä on 7192 elementtiä,
 * ja yksi panorointikehys maksoi 236 millisekuntia — noin neljä kuvaa
 * sekunnissa. Euroopan laudalla, jossa elementtejä on 741, sama kehys
 * maksoi 30 millisekuntia. Selain siis piirsi vektorit uudelleen joka
 * kehyksellä. Omistaja arvasi tämän itse: "onhan se bittikarttana kun
 * scrollataan?"
 *
 * Kuvaksi muutettuna elävään puuhun jää vain se, mikä muuttuu pelin
 * aikana: reitit, kaupungit, nimet, laatat ja nappulat.
 *
 * TYYLIT PITÄÄ OTTAA MUKAAN. Kartan värit tulevat sivun tyylitiedostosta,
 * eikä irrotettu SVG peri niitä mistään. Säännöt kirjoitetaan siksi
 * kuvan sisään. Ilman tätä kartasta tulisi musta paperi ja mustat
 * mantereet.
 *
 * EPÄONNISTUMINEN EI SAA RIKKOA KARTTAA. Jos kuvan teko ei onnistu —
 * vanha selain, estetty blob, mikä tahansa — vektorikerros jää
 * paikalleen ja peli näyttää täsmälleen samalta, vain hitaammalta.
 */

/*
 * Tyylit kirjoitetaan elementteihin.
 *
 * Ensimmäinen versio upotti sivun tyylitiedoston kuvan sisään. Se ei
 * toiminut: säännöt on kirjoitettu sivun rakennetta vasten (`#board`,
 * `body.jotain ...`), eikä irrallisessa SVG:ssä ole bodya eikä
 * board-tunnusta. Yksikään sääntö ei osunut, ja kartasta tuli musta
 * paperi mustine mantereineen.
 *
 * Nyt jokaiselta elävältä elementiltä kysytään sen LASKETTU tyyli ja
 * kirjoitetaan se kloonin omaksi tyyliksi. Silloin ei ole väliä, mistä
 * arvo tuli — se on sama kuin ruudulla.
 */
const KOPIOITAVAT = [
  'fill', 'fill-opacity', 'fill-rule',
  'stroke', 'stroke-width', 'stroke-opacity', 'stroke-linecap',
  'stroke-linejoin', 'stroke-dasharray', 'stroke-dashoffset',
  'opacity', 'mix-blend-mode',
  'font-family', 'font-size', 'font-style', 'font-weight',
  'letter-spacing', 'text-anchor', 'dominant-baseline',
];

/**
 * Klooni, jonka tyylit ovat kiinni elementeissä. Tehdään kerran laudan
 * piirron jälkeen; ikkunat rasteroidaan tästä.
 */
export function tyylitSisaan(ryhma) {
  const klooni = ryhma.cloneNode(true);
  const elavat = [ryhma, ...ryhma.querySelectorAll('*')];
  const kloonit = [klooni, ...klooni.querySelectorAll('*')];
  if (elavat.length !== kloonit.length) return klooni;
  for (let i = 0; i < elavat.length; i++) {
    const laskettu = window.getComputedStyle(elavat[i]);
    const palat = [];
    for (const nimi of KOPIOITAVAT) {
      const arvo = laskettu.getPropertyValue(nimi);
      if (arvo) palat.push(`${nimi}:${arvo}`);
    }
    kloonit[i].setAttribute('style', palat.join(';'));
  }
  return klooni;
}

/*
 * Ruudun enimmäiskoko pikseleinä.
 *
 * Yksi ruutu on noin tuhat pikseliä sivultaan. Isompi olisi hitaampi
 * piirtää eikä auttaisi: ruutuja lisätään vain sen verran kuin näkyvä
 * alue tarvitsee.
 */
const RUUDUN_PIKSELIT = 1100;

/**
 * Valmistelee kartan taiteen rasterointia varten KERRAN.
 *
 * Tämä on nopeuden kannalta olennaisin kohta. Jokainen ruutu tehdään
 * samasta taiteesta, ja jos taide sarjallistettaisiin joka ruudulle
 * uudestaan, 6500 elementin läpikäynti maksaisi enemmän kuin itse
 * piirto. Nyt teksti syntyy kerran ja ruutu vaihtaa siitä vain
 * näkymäikkunan ja koon.
 *
 * --- mutta yksi teksti ei riitä ---
 *
 * Sarjallistus kerran ratkaisi väärän puolen ongelmasta. Teksti syntyy
 * kerran, mutta SELAIN JÄSENTÄÄ SEN JOKA RUUDULLA UUDESTAAN: ruutu on
 * oma <svg>-blobinsa, ja blobin sisällä on koko maailmankartta.
 * Mitattuna 12,4 megatavua ja 12 512 elementtiä — ja yhteen ruutuun
 * niistä osuu 353 eli KOLME PROSENTTIA. Loput 97 % jäsennetään,
 * asetellaan ja rajataan pois joka kerta.
 *
 * viewBox rajaa vasta piirron, ei työn: mitään ei voi jättää
 * jäsentämättä sillä perusteella, että se jää lopulta ruudun
 * ulkopuolelle.
 *
 * Siksi taide pilkotaan: jokaisesta osasta talletetaan sen teksti ja
 * sen rajauslaatikko laudan koordinaateissa. Ruutu kootaan niistä
 * osista, jotka oikeasti osuvat siihen. Pilkkominen maksaa kerran,
 * ruutuja on kymmeniä.
 */
export function valmisteleTaide(ryhma, maarittelyt) {
  if (typeof XMLSerializer === 'undefined') return null;
  const sarjallistin = new XMLSerializer();
  const osat = [];
  if (maarittelyt) osat.push(sarjallistin.serializeToString(maarittelyt));
  osat.push(sarjallistin.serializeToString(ryhma));
  return osat.join('');
}

/*
 * Rajauslaatikko laudan koordinaateissa.
 *
 * getBBox antaa laatikon elementin OMASSA koordinaatistossa, ja
 * koristeryhmillä on siirtoja (translate(700,4535)). Pelkkä getBBox
 * osuisi niillä satoja yksiköitä väärään paikkaan, jolloin koriste
 * katoaisi ruudusta johon se kuuluu.
 *
 * getScreenCTM antaa muunnoksen ruutupikseleihin. Kahden CTM:n erotus
 * antaa muunnoksen elementistä juureen riippumatta siitä, montako
 * siirtoa välissä on ja mikä viewBox sattuu olemaan voimassa.
 */
function laatikkoJuuressa(elementti, juurenCtmKaanteinen) {
  let b;
  try { b = elementti.getBBox(); } catch { return null; }
  if (!b || (!b.width && !b.height)) return null;
  const ctm = elementti.getScreenCTM?.();
  if (!ctm || !juurenCtmKaanteinen) return { x0: b.x, y0: b.y, x1: b.x + b.width, y1: b.y + b.height };
  const m = juurenCtmKaanteinen.multiply(ctm);
  let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
  for (const [px, py] of [[b.x, b.y], [b.x + b.width, b.y],
    [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]]) {
    const x = m.a * px + m.c * py + m.e;
    const y = m.b * px + m.d * py + m.f;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
  return { x0, y0, x1, y1 };
}

/**
 * Pilkkoo taiteen paloihin, joista ruutu voidaan koota.
 *
 * Palan koko on ryhmän suora lapsi: reittikerroksessa yksi tie,
 * mantereissa yksi ääriviiva. Se on oikea raekoko — yksittäinen
 * <path> olisi tarkempi mutta maksaisi 12 512 sarjallistusta, ja
 * ryhmä kokonaisuutena olisi liian karkea (reittikerros yksin kattaa
 * koko laudan).
 *
 * Ryhmä, jolla on oma siirto tai joka on pieni, otetaan yhtenä
 * palana: pilkkomisesta ei ole hyötyä, jos osia on kymmenen.
 *
 * Palauttaa null, jos pilkkominen ei onnistu — silloin kutsuja
 * käyttää entistä yhtä tekstiä eikä mikään hajoa.
 */
const PILKO_VAHINTAAN = 24;

/*
 * KAKSI PUUTA, EI YHTÄ.
 *
 * Teksti otetaan tyylitellystä KLOONISTA, koska vain siinä tyylit ovat
 * kiinni elementeissä — irrallinen SVG ei peri sivun tyylitiedostoa.
 * Mitat on pakko lukea ELÄVÄSTÄ puusta, koska getBBox ja getScreenCTM
 * vaativat asetellun dokumentin: kloonilla ne palauttavat nollaa, ja
 * jokainen pala päätyisi ruutuun 0,0.
 *
 * Puut käydään rinnakkain. tyylitSisaan takaa saman rakenteen tai
 * palauttaa kloonin koskemattomana, joten varmistetaan lapsimäärä
 * ennen kuin niihin luotetaan.
 */
/*
 * Laudan reunan yli menevä pala myös reunan toiselle puolelle.
 *
 * Kiertävällä kartalla laudan oikea reuna ja vasen reuna ovat SAMA
 * kohta maastossa, ja moni muoto menee sen yli: Tšukotka alkaa 170.
 * itäiseltä pituuspiiriltä ja päättyy 169. läntiselle, eli se jatkuu
 * sauman toiselle puolelle. Yhdistetty ääriviiva ulottui siksi 179
 * yksikköä laudan oikean reunan ULKOPUOLELLE — ja siellä sitä ei
 * piirtänyt kukaan: ruudut kattavat välin [0, W], joten ylimenevä kärki
 * jäi jokaisen ruudun ulkopuolelle. Kartalla näkyi reikä, ja
 * Beringinsalmi levisi kaksinkertaiseksi (omistajan kuvakaappaus).
 *
 * Korjaus tehdään tässä eikä aineistossa: sama sääntö koskee mitä
 * tahansa kerrosta — rantaviivoja, maastoa, jokia — ilman että yhtäkään
 * pakettia tarvitsee luoda uudelleen. Pala, joka menee reunan yli, saa
 * kaksoiskappaleen laudan leveyden verran toiseen suuntaan siirrettynä.
 * Siirretty kappale on sama muoto samalla mallilla; vain kääre on eri.
 */
function reunanYliMenevat(palat, leveys) {
  if (!leveys) return palat;
  const ulos = [];
  for (const pala of palat) {
    ulos.push(pala);
    const siirto = pala.x1 > leveys ? -leveys : (pala.x0 < 0 ? leveys : 0);
    if (!siirto) continue;
    /*
     * Kaksoiskappaleen rajauslaatikko kutistetaan siihen osaan, jota
     * varten se on olemassa. Euraasian ääriviiva ulottuu 5249:stä
     * 12179:ään, joten siirretty kappale kattaisi laatikkona välin
     * −6751…179 — ja tulisi mukaan jokaiseen laudan vasemman puolen
     * ruutuun, vaikka siitä näkyy vain 179 yksikön kärki. Laatikoksi
     * riittää se, mikä oli laudan ulkopuolella.
     */
    ulos.push({
      ...pala,
      x0: siirto < 0 ? 0 : pala.x0 + siirto,
      x1: siirto < 0 ? pala.x1 + siirto : leveys,
      kuori: `<g transform="translate(${siirto},0)">${pala.kuori ?? ''}`,
      sulku: pala.kuori ? '</g></g>' : '</g>',
    });
  }
  return ulos;
}

export function pilkoTaide(klooni, elava, maarittelyt, { leveys = 0 } = {}) {
  if (typeof XMLSerializer === 'undefined') return null;
  if (!klooni || !elava?.getScreenCTM) return null;
  if (klooni.children.length !== elava.children.length) return null;
  const juurenCtm = elava.getScreenCTM();
  if (!juurenCtm) return null;
  const kaanteinen = juurenCtm.inverse();
  const sarjallistin = new XMLSerializer();
  const palat = [];

  const lisaa = (kloonattu, elavaSama, kuori) => {
    /*
     * Rakeisuus jätetään ruudun ulkopuolelle: rasteroituun ruutuun se
     * piirretään canvakselle ruudun omissa pikseleissä
     * (piirraRakeisuus). Jos laudan kokoinen kuviosuorakaide tulisi
     * mukaan tähänkin, sama pinta olisi kahdesti — ja se kalliimpi
     * puolikas on juuri se, joka lähempää katsoen suurenee läiskiksi.
     * Elävään SVG:hen suorakaide jää, koska rasteroimaton kartta
     * tarvitsee sen yhä.
     */
    if (elavaSama.classList?.contains('grain')) return;
    const laatikko = laatikkoJuuressa(elavaSama, kaanteinen);
    if (!laatikko) return;
    palat.push({ ...laatikko, xml: sarjallistin.serializeToString(kloonattu), kuori });
  };

  for (let i = 0; i < elava.children.length; i++) {
    const e = elava.children[i];
    const k = klooni.children[i];
    if (!k) return null;
    const omat = e.children ?? [];
    const jaettava = e.tagName === 'g' && !e.getAttribute('transform')
      && omat.length >= PILKO_VAHINTAAN && k.children.length === omat.length;
    if (!jaettava) { lisaa(k, e, null); continue; }
    /*
     * Ryhmän avaus talletetaan erikseen, jotta lapset voidaan kääriä
     * takaisin samaan ryhmään. Luokka ja tyyli ovat ryhmässä, ja ilman
     * kuorta lapset menettäisivät ne.
     */
    const avaus = `<g${[...k.attributes].map((a) => ` ${a.name}="${a.value.replace(/"/g, '&quot;')}"`).join('')}>`;
    for (let j = 0; j < omat.length; j++) lisaa(k.children[j], omat[j], avaus);
  }
  if (!palat.length) return null;

  /*
   * SAMA ÄÄRIVIIVA VAIN KERRAN.
   *
   * Rantaviiva piirretään viitenä päällekkäisenä polkuna: maan täyttö,
   * paksu ranta, hento ranta ja kaksi meren kaikua. Niillä on eri väri
   * ja paksuus mutta TÄSMÄLLEEN sama d. Mitattuna 79 eri ääriviivaa
   * vievät 4,7 megatavua, joista 3,6 on pelkkää toistoa — ja Euraasian
   * ääriviiva yksin on 321 kilotavua ja 23 668 pistettä.
   *
   * Selain jäsentää jokaisen kopion erikseen. <use> viittaa kerran
   * jäsennettyyn polkuun, joten viisi kopiota maksaa yhden.
   *
   * Mallikappaleesta on riisuttava tyyli. tyylitSisaan on kirjoittanut
   * jokaiseen elementtiin oman style-attribuutin, ja jos se jää
   * mallikappaleeseen, se voittaa <use>-elementin tyylin — jolloin
   * kaikki viisi kerrosta piirtyisivät samannäköisinä.
   */
  const kertoja = new Map();
  for (const pala of palat) {
    const d = pala.xml.match(/ d="([^"]*)"/)?.[1];
    if (!d || d.length < 400) continue;
    kertoja.set(d, (kertoja.get(d) ?? 0) + 1);
  }
  const mallit = new Map();
  const tunnukset = new Map();
  for (const [d, kertaa] of kertoja) {
    if (kertaa < 2) continue;
    const tunnus = `mp${mallit.size}`;
    tunnukset.set(d, tunnus);
    mallit.set(tunnus, `<path id="${tunnus}" d="${d}"/>`);
  }
  for (const pala of palat) {
    const d = pala.xml.match(/ d="([^"]*)"/)?.[1];
    const tunnus = d && tunnukset.get(d);
    if (!tunnus) continue;
    // Polku käytöksi: d pois, viittaus tilalle, muut määreet ennallaan.
    pala.malli = tunnus;
    pala.xml = pala.xml
      .replace(/^<path\b/, '<use')
      .replace(/ d="[^"]*"/, ` href="#${tunnus}"`)
      .replace(/<\/path>/, '</use>');
  }

  return {
    maarittelyt: maarittelyt ? sarjallistin.serializeToString(maarittelyt) : '',
    /*
     * Mallikappaleet EIVÄT ole valmiissa maarittelyt-lohkossa.
     *
     * Ne ovat yhteensä yli megatavun, ja jos ne liitettäisiin jokaiseen
     * ruutuun, koko säästö menisi päinvastoin: ruutu kantaisi kaikkien
     * mantereiden ääriviivat vaikka näkyvissä olisi yksi. Ruutu ottaa
     * vain ne mallit, joihin sen omat palat viittaavat.
     */
    mallit,
    palat: reunanYliMenevat(palat, leveys),
  };
}

/**
 * Kokoaa yhden ruudun taiteen: vain ne palat, jotka osuvat ikkunaan.
 *
 * Reunavara on tarpeen, koska rajauslaatikko ei tunne viivan
 * paksuutta: juuri ruudun ulkopuolelle jäävä ääriviiva piirtäisi silti
 * viivansa ruudun puolelle, ja ilman varaa siihen jäisi sauma.
 */
const REUNAVARA = 40;

export function kokoaRuudunTaide(pilkottu, ikkuna) {
  if (!pilkottu) return null;
  const x0 = ikkuna.x - REUNAVARA;
  const y0 = ikkuna.y - REUNAVARA;
  const x1 = ikkuna.x + ikkuna.w + REUNAVARA;
  const y1 = ikkuna.y + ikkuna.h + REUNAVARA;
  const osat = [];
  const tarvitut = new Set();
  let auki = null;
  let sulku = '</g>';
  for (const pala of pilkottu.palat) {
    if (pala.x0 > x1 || pala.x1 < x0 || pala.y0 > y1 || pala.y1 < y0) continue;
    if (pala.malli) tarvitut.add(pala.malli);
    if (pala.kuori !== auki) {
      if (auki) osat.push(sulku);
      if (pala.kuori) osat.push(pala.kuori);
      auki = pala.kuori;
      // Siirretyllä palalla on kaksi ryhmää auki, tavallisella yksi.
      sulku = pala.sulku ?? '</g>';
    }
    osat.push(pala.xml);
  }
  if (auki) osat.push(sulku);
  if (!osat.length) return null;

  // Mallit ennen käyttöä: <use> ei löydä viitettä, joka tulee vasta
  // sen jälkeen samassa asiakirjassa.
  const mallit = [];
  for (const tunnus of tarvitut) {
    const malli = pilkottu.mallit?.get(tunnus);
    if (malli) mallit.push(malli);
  }
  return `${pilkottu.maarittelyt}${mallit.length ? `<defs>${mallit.join('')}</defs>` : ''}${osat.join('')}`;
}

/**
 * Rasteroi yhden ruudun oikeaksi bittikartaksi.
 *
 * RUUTU EIKÄ IKKUNA. Aiemmin koko näkyvä alue puskureineen piirrettiin
 * kerralla uudestaan aina kun reuna lähestyi. Se tökki, koska työtä
 * tehtiin joka kerta yhtä paljon riippumatta siitä, kuinka pieni pala
 * oli oikeasti uutta. Omistajan linjaus: "heti kun sormi irtoaa
 * ladataan lisää ja silloinkin vain uusi osa jotta itse lataus mahd.
 * nopea."
 *
 * CANVAS EIKÄ SVG-KUVA. Ensimmäinen rasterointi antoi <image>-
 * elementille SVG-blobin osoitteen. Elementtien määrä laski, mutta
 * panorointi hidastui sitä mukaa kuin kuvaan lisättiin sisältöä —
 * SVG-kuva on yhä vektoria, ja selain piirtää sen uudelleen aina kun
 * muunnos muuttuu. Vasta canvakselle piirretty PNG on bittikartta.
 *
 * Palauttaa <image>-elementin tai null. Epäonnistuminen ei ole virhe:
 * kutsuja jättää silloin vektorit paikalleen.
 */
/**
 * @param taide  merkkijono (koko taide) TAI pilkoTaiteen palanippu.
 *               Nippu on nopeampi: ruutuun kootaan vain sen omat palat.
 */
/*
 * Tyhjä ruutu erotettuna epäonnistuneesta.
 *
 * Molemmat palauttivat ennen nullin, ja kutsuja hyppäsi molempien yli
 * kirjaamatta mitään. Tyhjä ruutu — pelkkää merta ilman yhtään palaa —
 * pyydettiin siksi uudestaan joka kerta kun näkymä asettui, ja avomeren
 * yllä se tarkoitti samaa turhaa työtä loputtomiin.
 *
 * Ero on pakko säilyttää: epäonnistunutta EI saa muistaa, koska
 * selaimessa, jossa rasterointi ei toimi lainkaan, kartta jäisi
 * lopullisesti tyhjäksi vektorien sijaan.
 */
export const RUUTU_TYHJA = 'tyhjä';

/*
 * PAKKAUSMUODON VALINTA MITATAAN, EI ARVATA (iPad-kierros 13.8.2026).
 *
 * "WebP eikä PNG" valittiin aikanaan Chromium-mittauksin, ja siellä
 * se on yhä oikein: aidolla peliruudulla WebP 301 ms, JPEG 1126 ms,
 * PNG 1154 ms. WebKitissä järjestys voi olla toinen, ja omistajan
 * iPadilla juuri pakkaus oli ruutuputken suurin yksittäinen
 * pääsäietukos (mitattuna 500–1400 ms per ruutu). Siksi nopein muoto
 * mitataan kerran istunnossa siinä selaimessa, jossa pelataan.
 *
 * KAKSI KORJAUSTA ENSIMMÄISEEN KOKEESEEN (vaihe 2, 13.8.2026 ilta):
 *
 * 1. LÄMMITTELY. Ensimmäinen toBlob-kutsu maksaa pakkausmoottorin
 *    alustuksen, ja ilman lämmittelyä koe mittasi alustusta eikä
 *    pakkausta. WebKit-GTK:ssa kylmä 256 px koe antoi WebP 196 ms ja
 *    JPEG 16 ms — mutta OIKEALLA 1027 px ruudulla lämpimänä JPEG on
 *    287 ms ja WebP 131 ms eli järjestys on päinvastainen. Vanha koe
 *    valitsi siis hitaamman muodon joka ruudulle.
 * 2. TODELLINEN KOKO. Pakkausaika kasvaa pinta-alan mukana muttei
 *    tasaisesti muotojen kesken, joten koe tehdään 512 px kankaalla —
 *    riittävän isolla kertomaan ison ruudun järjestyksen, riittävän
 *    pienellä ettei kertamittaus tunnu (yhteensä ~200 ms joutoaikana).
 *
 * JPEG otetaan käyttöön vain, jos se on selvästi (yli kaksi kertaa)
 * WebP:tä nopeampi. JPEG ei osaa läpinäkyvyyttä, joten se kelpaa vain
 * ruudulle, jonka joka pikseli on peittävä; nopealla reitillä se
 * päätellään pergamentin alueesta (ikkunaPaperilla) ja varareitillä
 * luetaan pikseleistä (taysinPeittava). Laatu 0.90 vastaa
 * silmämääräisesti WebP:n 0.92:ta pergamenttikartalla, ja tiedostokoko
 * on samaa luokkaa (mitattu 194 kt vs 164 kt).
 */
const PAKKAUS_KOE_PX = 512;
let pakkausvalintaLupaus = null;

function nopeinPakkausmuoto() {
  if (pakkausvalintaLupaus) return pakkausvalintaLupaus;
  pakkausvalintaLupaus = (async () => {
    try {
      const koekangas = document.createElement('canvas');
      koekangas.width = PAKKAUS_KOE_PX;
      koekangas.height = PAKKAUS_KOE_PX;
      const ctx = koekangas.getContext('2d');
      if (!ctx || !koekangas.toBlob) return 'image/webp';
      // Kohinaa kuten kartalla: tasainen väri pakkautuisi kaikilla
      // muodoilla hetkessä eikä kertoisi eroista mitään.
      ctx.fillStyle = '#ecd8ae';
      ctx.fillRect(0, 0, PAKKAUS_KOE_PX, PAKKAUS_KOE_PX);
      for (let i = 0; i < 6000; i++) {
        ctx.fillStyle = `rgba(${(i * 7) % 120},60,30,0.3)`;
        ctx.fillRect((i * 37) % PAKKAUS_KOE_PX, (i * 91) % PAKKAUS_KOE_PX, 3, 3);
      }
      const aika = (tyyppi, laatu) => new Promise((valmis) => {
        const alku = performance.now();
        koekangas.toBlob((b) => valmis(b && b.type === tyyppi
          ? performance.now() - alku : Infinity), tyyppi, laatu);
      });
      // Lämmittelykierros alustaa molemmat moottorit; vasta toinen
      // kierros mittaa itse pakkausta (ks. korjaus 1 yllä).
      await aika('image/webp', 0.92);
      await aika('image/jpeg', 0.9);
      const webp = await aika('image/webp', 0.92);
      const jpeg = await aika('image/jpeg', 0.9);
      return jpeg * 2 < webp ? 'image/jpeg' : 'image/webp';
    } catch {
      return 'image/webp';
    }
  })();
  return pakkausvalintaLupaus;
}

/**
 * Onko kankaan jokainen pikseli täysin peittävä? JPEG hukkaa
 * läpinäkyvyyden, ja esimerkiksi meriruudussa, jossa on vain yksi
 * saari, läpinäkyvä osa muuttuisi mustaksi. Koko kankaan luku maksaa
 * muutaman millisekunnin — murto-osan siitä, mitä väärä pakkausmuoto
 * maksaisi joka ruudulla.
 */
function taysinPeittava(piirturi, leveys, korkeus) {
  try {
    const data = piirturi.getImageData(0, 0, leveys, korkeus).data;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 255) return false;
    }
    return true;
  } catch {
    return false;
  }
}

/*
 * --- kerran jäsennetty taidelähde (tiilipyramidin ydin) ---------------------
 *
 * RUUDUN PIIRTO EI ENÄÄ JÄSENNÄ SVG:TÄ. Vanha putki rakensi joka
 * ruudulle oman SVG-blobin ja antoi sen <img>-elementille, jolloin
 * selain jäsensi saman taiteen yhä uudelleen. MITATTU (iPad-kierros
 * 13.8.2026, maailmankartta lähikuvassa, 1027 px ruutu):
 *
 *   WebKit:   jäsennys+lataus 169 ms/ruutu, peittävyyden luku
 *             pikseleistä 230 ms, pakkaus 196 ms — yhteensä ~600 ms
 *   Chromium (4x CPU-kuristus ≈ iPad): lataus 1886 ms/ruutu
 *
 * Sama taide jäsennetään nyt KERRAN yhdeksi SVG-kuvaksi, ja jokainen
 * ruutu leikataan siitä canvas.drawImagen lähderajauksella (sx,sy,sw,sh).
 * Selaimet piirtävät SVG-kuvan vektorina piirtohetken muunnoksella,
 * joten leikattu ruutu on täsmälleen yhtä terävä kuin erikseen
 * jäsennetty — mitattu pikselintarkasti samaksi (ero 0,00–0,01/px) ja
 * reunaterävyys samaksi molemmilla moottoreilla myös silloin, kun
 * luonnollinen koko on murto-osa piirtokoosta. MITATTU:
 *
 *   WebKit:   jäsennys kerran 881 ms, sitten 5,6 ms/ruutu
 *   Chromium (4x): jäsennys kerran 4101 ms, sitten 58 ms/ruutu
 *
 * Lähde pidetään muistissa laudan eliniän: se korvaa jäsennystyön,
 * jonka vanha putki teki joka ruudulle. Jos lataus ei onnistu, kutsuja
 * saa nullin ja ruudut piirretään vanhaa reittiä — hitaammin mutta
 * oikein.
 */

/*
 * Luonnollisen koon yläraja. SVG-kuvan luonnollinen koko ei vaikuta
 * terävyyteen (vektoripiirto, ks. yllä), mutta yli ~32 000 pikselin
 * mitat osuvat selainten sisäisiin rajoihin. Maailmankartan pergamentti
 * on 33 820 yksikköä korkea, joten mitat jaetaan tarvittaessa.
 */
const LAHTEEN_MITTA_ENINTAAN = 16000;

export async function avaaTaidelahde(taide, map) {
  if (!taide || typeof document === 'undefined' || !window.Blob || !URL.createObjectURL) return null;
  try {
    const alue = paperi(map);
    // Ikkuna reilusti paperia isompi: mukaan tulevat kaikki palat,
    // myös kierron siirretyt kaksoiskappaleet.
    const sisalto = typeof taide === 'string' ? taide
      : kokoaRuudunTaide(taide, {
        x: alue.x - REUNAVARA, y: alue.y - REUNAVARA,
        w: alue.w + REUNAVARA * 2, h: alue.h + REUNAVARA * 2,
      });
    if (!sisalto) return null;
    const jako = Math.max(1, Math.ceil(Math.max(alue.w, alue.h) / LAHTEEN_MITTA_ENINTAAN));
    const xml = `<svg xmlns="${NS}" viewBox="${alue.x} ${alue.y} ${alue.w} ${alue.h}"`
      + ` width="${(alue.w / jako).toFixed(1)}" height="${(alue.h / jako).toFixed(1)}">${sisalto}</svg>`;
    const osoite = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
    try {
      const kuva = await new Promise((valmis, virhe) => {
        const k = new Image();
        k.onload = () => valmis(k);
        k.onerror = () => virhe(new Error('taidelähde ei latautunut'));
        k.src = osoite;
      });
      return { kuva, alue, jako };
    } finally {
      // Kuvadokumentti on jäsennetty; osoitetta ei tarvita enää.
      URL.revokeObjectURL(osoite);
    }
  } catch {
    return null;
  }
}

/**
 * Onko ruudussa yhtään palaa? Sama rajaustesti kuin kokoaRuudunTaide,
 * mutta ilman merkkijonojen kokoamista: nopea reitti ei kokoa mitään,
 * ja silti tyhjä ruutu on muistettava tyhjänä (ks. RUUTU_TYHJA).
 */
function ruutuOnTyhja(taide, ikkuna) {
  if (typeof taide === 'string' || !taide?.palat) return false;
  const x0 = ikkuna.x - REUNAVARA;
  const y0 = ikkuna.y - REUNAVARA;
  const x1 = ikkuna.x + ikkuna.w + REUNAVARA;
  const y1 = ikkuna.y + ikkuna.h + REUNAVARA;
  return !taide.palat.some((p) => !(p.x0 > x1 || p.x1 < x0 || p.y0 > y1 || p.y1 < y0));
}

/*
 * Peittävyys PÄÄTELLÄÄN, EI LUETA PIKSELEISTÄ.
 *
 * taysinPeittava lukee koko kankaan takaisin näytönohjaimelta, ja se
 * oli mitattuna nopean reitin kallein vaihe: WebKitissä 230 ms ja
 * kuristetussa Chromiumissa 631 ms per 1027 px ruutu — enemmän kuin
 * kaikki muut vaiheet yhteensä. Lukua ei tarvita: ruudun ainoa
 * läpinäkyvyys tulee pergamentin ULKOPUOLELLE jäävästä osasta, ja
 * pergamentti on yksi akselinsuuntainen suorakaide (paperi()). Ruutu,
 * joka on kokonaan sen sisällä, on varmasti peittävä; muu pakataan
 * WebP:nä kuten ennenkin. Vanha reitti pitää pikselitarkistuksensa,
 * koska sillä ei ole lähteen aluetta käytettävissään.
 */
function ikkunaPaperilla(ikkuna, alue) {
  return ikkuna.x >= alue.x && ikkuna.y >= alue.y
    && ikkuna.x + ikkuna.w <= alue.x + alue.w
    && ikkuna.y + ikkuna.h <= alue.y + alue.h;
}

/*
 * Kankaan pakkaus, purku ja kääriminen <image>-elementiksi — sama
 * loppupää nopealle reitille, vanhalle reitille ja pohjatasolle.
 *
 * WebP eikä PNG: PNG-pakkaus oli mitattuna ruudun toiseksi kallein
 * vaihe heti SVG:n jäsennyksen jälkeen. Se on häviötön ja siksi hidas,
 * ja kartta on juuri sellaista kuvaa — laajoja tasaisia sävyjä ja
 * ohuita viivoja — jota se pakkaa huonoiten. WebP laadulla 0.92 on
 * samaa luokkaa tarkka mutta moninkertaisesti nopeampi. JPEG vain jos
 * se on TÄSSÄ selaimessa mitatusti nopein JA ruutu on kauttaaltaan
 * peittävä (ks. nopeinPakkausmuoto). Vanha PNG jää varareitiksi:
 * toBlob palauttaa null tuntemattomalle tyypille joissakin selaimissa,
 * ja silloin on parempi olla hidas kuin tyhjä.
 */
async function kangasKuvaksi(canvas, ikkuna, peittava, puraOdottaen = true) {
  const pakkaa = (tyyppi, laatu) => new Promise((valmis) => {
    if (!canvas.toBlob) { valmis(null); return; }
    canvas.toBlob((b) => valmis(b && b.type === tyyppi ? b : null), tyyppi, laatu);
  });
  const jpegKelpaa = (await nopeinPakkausmuoto()) === 'image/jpeg' && peittava;
  const blobi = (jpegKelpaa ? await pakkaa('image/jpeg', 0.9) : null)
    ?? await pakkaa('image/webp', 0.92) ?? await pakkaa('image/png');
  const osoite = blobi ? URL.createObjectURL(blobi) : canvas.toDataURL('image/png');

  /*
   * Kuva puretaan valmiiksi ennen kuin se pannaan karttaan. Ilman tätä
   * kuva välkkyi vaihtuessaan: <image> hakee ja purkaa blobin vasta
   * kun elementti on puussa, ja siinä välissä ehtii tyhjä kehys.
   *
   * Purkua EI odoteta, kun kutsuja tietää ettei tyhjää kehystä voi
   * tulla (puraOdottaen = false): pyramidin pohjataso on aina uuden
   * ruudun alla, joten purkamaton ruutu näyttää hetken pohjan sumeampaa
   * karttaa eikä koskaan tyhjää. Odotus oli mitattuna ruutusarjan
   * pisin vaihe (WebKit 280 ms per ruutu, sarjassa 20 ruutua = 5,6 s),
   * ja se tehtiin sarjassa peräkkäin — purku itse tapahtuu purkajan
   * säikeessä, joten käynnistys riittää.
   */
  const purku = (async () => {
    try {
      const valmis = new Image();
      valmis.src = osoite;
      if (valmis.decode) await valmis.decode();
      else await new Promise((r) => { valmis.onload = r; valmis.onerror = r; });
    } catch { /* purku ei onnistunut; kuva piirtyy silti, vain hitaammin */ }
  })();
  if (puraOdottaen) await purku;

  const kuva = el('image', {
    x: ikkuna.x, y: ikkuna.y, width: ikkuna.w, height: ikkuna.h,
    href: osoite, preserveAspectRatio: 'none',
  });
  if (blobi) kuva.dataset.osoite = osoite;
  return kuva;
}

/*
 * `keskeyta` on vapaaehtoinen luovutusehto. Ruudun kallein osa —
 * SVG:n maalaus kanvakselle ja pakkaus — on jakamatonta
 * pääsäietyötä, ja jos sormi ehtii kartalle kesken kuvan latauksen,
 * juuri se työ tuntuisi nykäyksenä eleen alla. Kun ehto palaa toteen,
 * loput vaiheet jätetään tekemättä ja palautetaan null; kutsuja
 * pyytää ruudun uudestaan eleen jälkeen. Tarkistus on latauksen
 * KALTAISTEN odotusten jälkeen, koska juuri niiden aikana ele ehtii
 * alkaa.
 */
/**
 * @param lahde  avaaTaidelahde:n palauttama kerran jäsennetty lähde tai
 *               null. Lähteen kanssa ruutu leikataan drawImagella eikä
 *               SVG:tä jäsennetä lainkaan (ks. avaaTaidelahde); ilman
 *               sitä käytetään vanhaa ruutukohtaista blobireittiä.
 */
export async function rasteroiRuutu(taide, ikkuna, skaala, tarkkuus = 1, keskeyta = null, lahde = null) {
  if (!taide || !window.Blob || !URL.createObjectURL) return null;
  try {
    const teho = skaala * tarkkuus;
    const leveysPx = Math.min(RUUDUN_PIKSELIT, Math.max(32, Math.round(ikkuna.w * teho)));
    const korkeusPx = Math.min(RUUDUN_PIKSELIT, Math.max(32, Math.round(ikkuna.h * teho)));
    const canvas = document.createElement('canvas');
    canvas.width = leveysPx;
    canvas.height = korkeusPx;
    const piirturi = canvas.getContext('2d');
    let peittava;

    if (lahde?.kuva) {
      // --- NOPEA REITTI: leikkaus kerran jäsennetystä lähteestä. ---
      // Pergamentti tulee kartan taustasta, joten tyhjää ei tarvitse
      // rasteroida lainkaan — mutta se on muistettava tyhjänä.
      if (ruutuOnTyhja(taide, ikkuna)) return RUUTU_TYHJA;
      /*
       * Suoraan lähteestä, EI väliin puskuroitua kaistaa. Kokeiltiin
       * myös kolmen ruudun rivikaistaa, josta ruudut olisivat pelkkiä
       * pikselikopioita — mutta WebKitissä lähteen toistokustannus
       * kasvaa piirretyn LÄHDEALUEEN mukana, joten leveä kaista maksoi
       * kolmen ruudun verran eikä säästänyt mitään (mitattu sarja:
       * suoraan 340 ms/ruutu, kaistalla 568 ms/ruutu).
       */
      piirturi.drawImage(
        lahde.kuva,
        (ikkuna.x - lahde.alue.x) / lahde.jako,
        (ikkuna.y - lahde.alue.y) / lahde.jako,
        ikkuna.w / lahde.jako,
        ikkuna.h / lahde.jako,
        0, 0, leveysPx, korkeusPx,
      );
      peittava = ikkunaPaperilla(ikkuna, lahde.alue);
    } else {
      // --- VARAREITTI: ruutukohtainen SVG-blobi kuten ennen. ---
      const sisalto = typeof taide === 'string' ? taide : kokoaRuudunTaide(taide, ikkuna);
      if (!sisalto) return RUUTU_TYHJA;
      const xml = `<svg xmlns="${NS}" viewBox="${ikkuna.x} ${ikkuna.y} ${ikkuna.w} ${ikkuna.h}"`
        + ` width="${leveysPx}" height="${korkeusPx}">${sisalto}</svg>`;

      const lahdeOsoite = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
      let kuvalahde;
      try {
        kuvalahde = await new Promise((valmis, virhe) => {
          const koe = new Image();
          koe.onload = () => valmis(koe);
          koe.onerror = () => virhe(new Error('kuvaa ei voitu ladata'));
          koe.src = lahdeOsoite;
        });
      } catch {
        URL.revokeObjectURL(lahdeOsoite);
        return null;
      }
      // Ele alkoi latauksen aikana: maalaus ja pakkaus jäävät tekemättä.
      if (keskeyta?.()) {
        URL.revokeObjectURL(lahdeOsoite);
        return null;
      }
      piirturi.drawImage(kuvalahde, 0, 0, leveysPx, korkeusPx);
      URL.revokeObjectURL(lahdeOsoite);
      // Varareitillä peittävyys luetaan pikseleistä kuten ennenkin —
      // lähteen aluetta ei ole, josta sen voisi päätellä.
      peittava = null;
    }

    // Paperin pinta ruudun omissa pikseleissä, ks. GRAIN_RUUDULLA_PX.
    const ruudullaPx = ikkuna.w * skaala;
    if (ruudullaPx > 0) piirraRakeisuus(piirturi, leveysPx, korkeusPx, leveysPx / ruudullaPx);

    // Ele alkoi maalauksen aikana: pakkaus (mitattuna pisin yksittäinen
    // pääsäievaihe) jää tekemättä ja ruutu pyydetään myöhemmin uudestaan.
    if (keskeyta?.()) return null;

    // Nopealla reitillä pohjataso on ruudun alla, joten purkua ei
    // tarvitse odottaa (ks. kangasKuvaksi); varareitillä odotetaan.
    return await kangasKuvaksi(canvas, ikkuna,
      peittava ?? taysinPeittava(piirturi, leveysPx, korkeusPx), !lahde?.kuva);
  } catch {
    return null;
  }
}

/*
 * --- pyramidin pohjataso ----------------------------------------------------
 *
 * Koko laudan karkea bittikartta yhtenä kuvana, leikattuna samasta
 * kerran jäsennetystä lähteestä. Kaksi tehtävää:
 *
 * 1. LAUDAN LUONTIHETKI. Raskas vektorikerros (maailmankartalla ~12 500
 *    elementtiä, panorointikehys 236 ms) voidaan piilottaa heti kun
 *    pohja on olemassa — sitä ei tarvitse odottaa, että kokonainen
 *    ruutusarja valmistuu. Pohjan maalaus lähteestä on mitattu:
 *    WebKit 48 ms, Chromium (4x kuristus) 128 ms.
 * 2. ELE PIIRTÄÄ AINA VALMISTA BITTIKARTTAA. Pohja on aina ruutujen
 *    alla koko laudan alueella, joten nipistys tai pyyhkäisy alueelle,
 *    jonka tarkkoja ruutuja ei vielä ole, näyttää sumeahkon kartan
 *    eikä paljasta tyhjää pergamenttia.
 *
 * Mitoitus muistibudjetista: 2200 pikselin leveys riittää iPadin
 * yleiskuvaan (1100 css-pikseliä × 2), ja pikselikatto pitää korkean
 * laudan kurissa. Maailmankartalla pohja on 2200 × ~700 px ≈ 6 Mt
 * purettuna. Toista, tarkempaa kokolaudan tasoa EI rakenneta: se olisi
 * maailmankartalla nelinkertainen (~25 Mt pysyvää muistia iPadilla),
 * ja mittausten jälkeen tarkat ruudut syntyvät niin nopeasti (ks.
 * avaaTaidelahde), ettei välitasolle jäänyt tehtävää.
 */
const POHJAN_LEVEYS_PX = 2200;
const POHJAN_PIKSELIKATTO = 4.2e6;

/**
 * Pohjatason ikkuna ja koko lasketaan laudasta, ei kuvasta — joten ne
 * tiedetään jo ENNEN kuin pohja on rakennettu. Kutsuja käyttää tätä
 * päättämään, kannattaako ruutuja edes rakentaa vai odottaa pohjaa
 * (ks. js/ui.js taydennaTaide).
 *
 * Pohja kattaa laudan ja kaistaleen sen ympäriltä, EI koko
 * pergamenttia: paperi jatkuu yli kymmenkertaisena laudan ylä- ja
 * alapuolelle, ja sen kattava pohja olisi lähes pelkkää tyhjää
 * paperia muistissa. Reunan yli panoroitaessa tarkat ruudut
 * piirtyvät sinne kuten ennenkin.
 */
export function pohjanMitat(map) {
  const w = map?.width ?? 1000;
  const h = map?.height ?? 1000;
  const alue = paperi(map);
  const vara = Math.max(w, h) * 0.12;
  const x0 = map?.kiertava ? 0 : Math.max(alue.x, -vara);
  const x1 = map?.kiertava ? w : Math.min(alue.x + alue.w, w + vara);
  const y0 = Math.max(alue.y, -vara);
  const y1 = Math.min(alue.y + alue.h, h + vara);
  const ikkuna = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  const leveysPx = Math.min(POHJAN_LEVEYS_PX,
    Math.max(64, Math.floor(Math.sqrt((POHJAN_PIKSELIKATTO * ikkuna.w) / ikkuna.h))));
  const korkeusPx = Math.max(32, Math.round((leveysPx * ikkuna.h) / ikkuna.w));
  // teho = pikseliä per laudan yksikkö: vertailukelpoinen näkymän
  // tarpeeseen (skaala * piirtotarkkuus).
  return { ikkuna, leveysPx, korkeusPx, teho: leveysPx / ikkuna.w };
}

export async function rasteroiPohja(lahde, map) {
  if (!lahde?.kuva || typeof document === 'undefined') return null;
  try {
    const { ikkuna, leveysPx, korkeusPx } = pohjanMitat(map);

    const canvas = document.createElement('canvas');
    canvas.width = leveysPx;
    canvas.height = korkeusPx;
    const piirturi = canvas.getContext('2d');
    piirturi.drawImage(
      lahde.kuva,
      (ikkuna.x - lahde.alue.x) / lahde.jako,
      (ikkuna.y - lahde.alue.y) / lahde.jako,
      ikkuna.w / lahde.jako,
      ikkuna.h / lahde.jako,
      0, 0, leveysPx, korkeusPx,
    );
    /*
     * Rae pohjan omissa pikseleissä suhteella 1: pohja on näkyvin
     * kerros juuri yleiskuvassa, jossa sen pikselit vastaavat suunnilleen
     * ruudun pikseleitä. Lähempänä pohja vilahtaa vain eleen aikana
     * tarkkojen ruutujen alta, eikä raekoon hetkellinen ero ehdi näkyä.
     */
    piirraRakeisuus(piirturi, leveysPx, korkeusPx, 1);
    const kuva = await kangasKuvaksi(canvas, ikkuna, ikkunaPaperilla(ikkuna, lahde.alue));
    // Pikseliä per laudan yksikkö: kutsuja vertaa tätä näkymän tarpeeseen.
    return kuva ? { kuva, teho: leveysPx / ikkuna.w } : null;
  } catch {
    return null;
  }
}

/*
 * Kuinka monta laitepikseliä yhtä logiikkapikseliä kohti piirretään.
 *
 * iPadin näyttö on kaksinkertainen, joten logiikkapikseleillä piirretty
 * kuva venytetään näytöllä kaksinkertaiseksi ja näyttää pehmeältä —
 * ohuet rantaviivat katoavat kokonaan. Tarkkuus maksaa kuitenkin
 * muistia neliöllisesti, ja puskuroitua aluetta on yhdeksän ruudullista
 * (ruudullinen joka suuntaan), joten kaksinkertainen tarkkuus veisi
 * tabletilla toista sataa megatavua.
 *
 * Tarkkuus valitaan siksi budjetista: otetaan niin tarkka kuin annettuun
 * muistiin mahtuu, enintään näytön oma tarkkuus.
 */
const MUISTIBUDJETTI = 48 * 1024 * 1024; // tavua, 4 tavua per pikseli

export function piirtotarkkuus(paneW, paneH) {
  const laite = Math.min(window.devicePixelRatio || 1, 2);
  // Puskuroitu alue on kolme ruudullista molempaan suuntaan.
  const pikseleita = Math.max(1, paneW * 3 * paneH * 3);
  const mahtuu = Math.sqrt(MUISTIBUDJETTI / 4 / pikseleita);
  return Math.max(1, Math.min(laite, mahtuu));
}

/** Ruudun koko laudan yksiköissä annetulla mittakaavalla ja tarkkuudella. */
export function ruudunKoko(skaala, tarkkuus = 1) {
  return Math.max(1, RUUDUN_PIKSELIT / Math.max(skaala * tarkkuus, 1e-6));
}
