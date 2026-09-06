/*
 * PALLON LAATTAKERROKSEN APURIT — puhtaat funktiot ilman kirjastoa.
 *
 * Tässä moduulissa ovat pallon lepokerroksen (ja erässä E1 tulevan
 * laattakerroksen) puhtaat laskimet: näkyvän alueen rajaus, laattakatto,
 * tason valinta, laattaruudukko, Millerin UV, verkon puskurit ja levon
 * ajoitus. Ne eivät koske kirjastoon, DOMiin eivätkä pallon tilaan, joten
 * ne ovat yksin testattavia (tests/pallolepokerros.test.mjs) ja E1 voi
 * rakentaa niiden päälle itse kerroksen — kerroksen elinkaari
 * (luoLepokerros) ja laatunosto (kytkeLaatunosto) ovat yhä js/pallo.js:ssä,
 * joka tuo ja vie nämä nimet edelleen.
 *
 * Erä E0 suunnitelmasta docs/moduulit/pallon-liike-taydella-tarkkuudella.md
 * (luvut 4 ja 6): mekaaninen siirto js/pallo.js:stä, sanatarkasti.
 *
 * MODUULI EI TUO MITÄÄN. Siksi kaksi laatunoston vakiota, joita nämä
 * apurit tarvitsevat (LAATU_LEPOVIIVE_MS, LAATU_KAUKORAJA), muuttivat
 * mukana: js/pallo.js tuo ne täältä takaisin. Toisin päin tuonti tekisi
 * kehän, jossa LEPOKERROS_KORKEUSRAJA jäisi alustamatta.
 */

/** Kuinka kauan kameran on oltava paikallaan ennen lepolaatua (ms). */
export const LAATU_LEPOVIIVE_MS = 260;
/** Korkeus, jonka yläpuolella terävyys on yleiskuvan arvo. */
export const LAATU_KAUKORAJA = 0.6;
/** Korkeus, jonka yläpuolella lepokerrosta ei koota (= yleiskuva). */
export const LEPOKERROS_KORKEUSRAJA = LAATU_KAUKORAJA;
/** Tason valinta: laatan pikseli ≥ laitepikseli × tämä (1 = ei venytystä). */
export const LEPOKERROS_TERAVYYS = 1;
/*
 * LAATTAKATTO ON RUUDUN KOKOINEN, EI VAKIO (mitattu 6.9.2026). Näkyvä
 * alue on pallon pinnalla leveys-pituus-laatikko, joka on perspektiivin
 * ja Millerin venytyksen takia 2–3 kertaa ruudun pikselimäärä: työpöytä
 * 2758 × 1642 (4,5 Mpx) tarvitsi Kreikan lähikuvassa z7:llä 48 laattaa
 * (12,6 Mpx), puhelin 1170 × 2532 (3,0 Mpx) Euroopan yllä z6:lla 42.
 * Kiinteä 32 pudotti kummankin tasoa karkeammaksi — työpöydällä z6:een,
 * joka on SUMEAMPI kuin pallon omat Z8-laatat (Laplace-varianssi 363 →
 * 133). Katto on siksi ruudun laitepikseleistä: kerroin × pikselit /
 * laatan ala, rajattuna 16…64 (64 × 512² ≈ 67 Mt kangas + mipmapit).
 */
export const LEPOKERROS_KATTOKERROIN = 4;
export const LEPOKERROS_LAATTAKATTO_MIN = 16;
export const LEPOKERROS_LAATTAKATTO_MAX = 64;
/** Kankaan sivu enintään (px) — näytönohjaimen katto rajaa vielä alemmas. */
export const LEPOKERROS_KANGASKATTO = 8192;
/**
 * Kerros kootaan vain, jos pyramidin taso on vähintään tämän osan pallon
 * omien laattojen tiheydestä katsotulla leveysasteella: Mercator-laatta
 * tihenee 1/cos φ, joten Euroopan yleiskuvassa Z7 (133 px/aste 47° N)
 * on jo tiheämpi kuin pyramidin z5, johon laattakatto pakottaisi —
 * karkeampi kerros olisi askel taaksepäin (mitattu puhelimella: 224 →
 * 123). Sama tiheys kelpaa, koska lepokerros säästää kaksi
 * uudelleennäytteistystä ja jpeg-pakkauksen.
 */
export const LEPOKERROS_TIHEYSOSUUS = 0.85;
/**
 * Verkon silmän koko asteina ja silmiä sivulla vähintään / enintään.
 * Vähimmäismäärä on 64, ei 8: lähikuvassa syvyyspuskurin askel on
 * pienimmillään, ja jänteen painuma pitää pysyä sen alla (ks.
 * PIIRTOJÄRJESTYS) — 65² kärkeä on silti mitätön verkko.
 */
export const LEPOKERROS_RUUDUKKO_AST = 0.25;
export const LEPOKERROS_RUUDUKKO_MIN = 64;
export const LEPOKERROS_RUUDUKKO_MAX = 160;
/** Reunus näkyvän alueen ympärille asteina (pieni korjaus ei paljasta reunaa). */
export const LEPOKERROS_VARA_AST = 0.5;
/**
 * Kerros TÄSMÄLLEEN pinnan säteellä (ei suurennosta, ks. PIIRTOJÄRJESTYS
 * yllä); järjestys laattoihin nähden tulee syvyyssiirrosta.
 */
export const LEPOKERROS_KOROTUS = 1;
/** polygonOffsetUnits: syvyyspuskurin askelta kameraa kohti (negatiivinen). */
export const LEPOKERROS_SYVYYSSIIRTO = -8;
/** Häivytys päälle (ms). Reduced motion: 0. Pois HETI liikkeestä, ilman häivettä. */
export const LEPOKERROS_HAIVE_SISAAN_MS = 260;
/**
 * Aito lepo: kerros kootaan vasta, kun kamera on ollut paikallaan tämän
 * ajan (LAATU_LEPOVIIVE_MS:n 260 ms:n lepo nostaa vain laattatason) ja
 * sormet ovat irti. Raahauksen mikrotauko on tyypillisesti alle
 * 300 ms; 400 ms jättää sen väliin (ks. LEPOKERROS JA LIIKE).
 */
export const LEPOKERROS_LEPOVIIVE_MS = 400;
/** Purettuja laattakuvia muistissa enintään (512² × 4 t ≈ 1 Mt kukin). */
export const LEPOKERROS_KUVAKATTO = 96;
/** Näytepisteitä ruudulla sivua kohti (7 × 7 = 49 säteenjäljitystä). */
export const LEPOKERROS_NAYTTEITA = 7;
/** Ruutupikselien matka keskipisteestä alas, josta tiheys mitataan (css-px). */
export const LEPOKERROS_MITTAMATKA_PX = 40;

const RAD = Math.PI / 180;

/**
 * Pallon pinnan piste kirjaston koordinaatistossa (mitattu 6.9.2026:
 * getCoords(0, 0) = +z, getCoords(0, 90) = +x, napa = +y). Sama kaava
 * kuin three-globen polar2Cartesian; lepokerros ei kutsu getCoordsia
 * tuhansia kertoja per kokoaminen.
 */
export function pallonPiste(lat, lng, sade = 100) {
  const la = lat * RAD;
  const lo = lng * RAD;
  return { x: sade * Math.cos(la) * Math.sin(lo), y: sade * Math.sin(la), z: sade * Math.cos(la) * Math.cos(lo) };
}

/**
 * Näkyvä alue näytteistä. Pituuspiirit AUKIKIERRETÄÄN keskipituuspiirin
 * ympärille (−180…180 siitä), jotta sauman yli katsova ruutu ei saa
 * koko maailman levyistä laatikkoa. Palauttaa { lat0, lat1, lon0, lon1 }
 * (lon aukikierrettynä, lon1 > lon0) tai null, jos yksikään näyte ei
 * osunut palloon. Leveys rajataan latMin…latMax (kartta-ala ja
 * napakannet).
 */
export function lepokerroksenAlue(naytteet, keskiLng, {
  vara = LEPOKERROS_VARA_AST, latMin = -90, latMax = 90,
} = {}) {
  let lat0 = Infinity;
  let lat1 = -Infinity;
  let lon0 = Infinity;
  let lon1 = -Infinity;
  let n = 0;
  for (const p of naytteet) {
    if (!p || !Number.isFinite(p.lat) || !Number.isFinite(p.lng)) continue;
    const d = ((p.lng - keskiLng + 540) % 360) - 180;
    lat0 = Math.min(lat0, p.lat);
    lat1 = Math.max(lat1, p.lat);
    lon0 = Math.min(lon0, d);
    lon1 = Math.max(lon1, d);
    n += 1;
  }
  if (!n) return null;
  lat0 = Math.max(latMin, lat0 - vara);
  lat1 = Math.min(latMax, lat1 + vara);
  if (!(lat1 > lat0)) return null;
  lon0 -= vara;
  lon1 += vara;
  if (lon1 - lon0 >= 360) { lon0 = -180; lon1 = 180; }
  return { lat0, lat1, lon0: keskiLng + lon0, lon1: keskiLng + lon1, naytteita: n };
}

/** Laattakatto ruudun laitepikseleistä (ks. LEPOKERROS_KATTOKERROIN). */
export function lepokerroksenLaattakatto(pikseleita, laatta = 512) {
  const tarve = Math.ceil((LEPOKERROS_KATTOKERROIN * Math.max(0, pikseleita)) / (laatta * laatta));
  return Math.max(LEPOKERROS_LAATTAKATTO_MIN, Math.min(LEPOKERROS_LAATTAKATTO_MAX, tarve));
}

/**
 * Onko pyramidin taso vähintään pallon omien laattojen tiheyttä
 * (LEPOKERROS_TIHEYSOSUUS) leveysasteella lat, kun laattamoottori on
 * Mercator-tasolla mercatorTaso (256 px:n laatat)?
 */
export function lepokerroksenTasoRiittaa(taso, mercatorTaso, lat, osuus = LEPOKERROS_TIHEYSOSUUS) {
  if (!taso || !Number.isFinite(mercatorTaso)) return true;
  const cos = Math.max(0.1, Math.cos((Number.isFinite(lat) ? lat : 0) * RAD));
  const mercator = (256 * 2 ** mercatorTaso) / 360 / cos;
  return taso.leveys / 360 >= osuus * mercator;
}

/**
 * Pyramidin taso, jonka tiheys riittää ruudun tarpeeseen: matalin
 * taso, jolla laatan pikseleitä astetta kohti (leveys / 360) on
 * vähintään tarve × terävyys. Jos mikään ei riitä, syvin — silloin
 * kerros on yhä paras, mitä levyllä on (sama kuin tasokartan syvä zoom).
 */
export function lepokerroksenTaso(tasot, tarvePxAste, teravyys = LEPOKERROS_TERAVYYS) {
  const jarjestys = [...(tasot ?? [])].filter((t) => t && t.leveys > 0).sort((a, b) => a.z - b.z);
  for (const t of jarjestys) if (t.leveys / 360 >= tarvePxAste * teravyys) return t;
  return jarjestys[jarjestys.length - 1] ?? null;
}

/**
 * Mitkä kerrokset lepokerros saa piirtää, kun pallon sarja (laatat.json)
 * ja pyramidi (pyramidi.json) ovat nämä. Pohja vaatii saman version;
 * viiva- ja nostotaso piirretään vain jos pallon sarjaan on poltettu
 * täsmälleen sama versio (muuten sama merkki olisi levossa laatassa ja
 * liikkeessä elävänä tai poissa). Null = ei kerrosta lainkaan.
 */
export function lepokerroksenKerrokset(pallonLuettelo, pyramidi) {
  if (!pallonLuettelo?.versio || !pyramidi?.versio) return null;
  if (pallonLuettelo.versio !== pyramidi.versio) return null;
  const viivat = pallonLuettelo.viivat ?? null;
  const nostot = pallonLuettelo.nostot ?? null;
  if (viivat && viivat !== (pyramidi.viivataso?.versio ?? null)) return null;
  if (nostot && nostot !== (pyramidi.nostotaso?.versio ?? null)) return null;
  return { pohja: true, viiva: Boolean(viivat), nosto: Boolean(nostot) };
}

/**
 * Laatat ja kankaan mitat alueelle tasolla `taso` — sama ruudukko kuin
 * tasokartan jokaLaatta, mutta pikseliavaruus on AUKIKIERRETTY: sauman
 * yli katsova alue jatkuu tason leveyden verran oikealle, ja sarake
 * haetaan kierroksen sisältä (k · leveys + sarake · laatta). Viimeinen
 * sarake ja rivi ovat VAJAITA (tason leveys ei ole laattakoon
 * monikerta), joten laatan leveys luetaan tason pikseleistä — muuten
 * sauman takainen laatta osuisi väärään kohtaan.
 *
 * @param {object} p.taso      pyramidin taso { z, leveys, korkeus, pikseliaPerYksikko, sarakkeita, riveja }
 * @param {number} p.laatta    laatan sivu (512)
 * @param {object} p.arkki     { x, y } laudan yksikköinä
 * @param {object} p.projektio { leveys, lon0 } (pyramidi.json projektio)
 * @param {object} p.alue      lepokerroksenAlue
 * @param {function} p.laudanY lat → laudan y (Miller)
 * @returns {{ kansX0, kansY0, leveys, korkeus, laatat, ppu }} tai null
 */
export function lepokerroksenLaatat({ taso, laatta, arkki, projektio, alue, laudanY }) {
  if (!taso || !alue || !(laatta > 0) || !projektio?.leveys) return null;
  const ppu = taso.pikseliaPerYksikko;
  const xU = (lon) => ((lon - projektio.lon0) / 360) * projektio.leveys;
  const px0 = (xU(alue.lon0) - arkki.x) * ppu;
  const px1 = (xU(alue.lon1) - arkki.x) * ppu;
  const py0 = Math.max(0, (laudanY(alue.lat1) - arkki.y) * ppu);
  const py1 = Math.min(taso.korkeus, (laudanY(alue.lat0) - arkki.y) * ppu);
  if (!(py1 > py0) || !(px1 > px0)) return null;
  const r0 = Math.floor(py0 / laatta);
  const r1 = Math.min(taso.riveja - 1, Math.floor((py1 - 1e-6) / laatta));
  const k0 = Math.floor(px0 / taso.leveys);
  const k1 = Math.floor((px1 - 1e-6) / taso.leveys);
  const sarake = (px, k) => Math.max(0, Math.min(taso.sarakkeita - 1, Math.floor((px - k * taso.leveys) / laatta)));
  const s0 = sarake(px0, k0);
  const s1 = sarake(px1 - 1e-6, k1);
  const kansX0 = k0 * taso.leveys + s0 * laatta;
  const kansY0 = r0 * laatta;
  const laatat = [];
  for (let k = k0; k <= k1; k += 1) {
    const a = k === k0 ? s0 : 0;
    const b = k === k1 ? s1 : taso.sarakkeita - 1;
    for (let s = a; s <= b; s += 1) {
      const w = Math.min(laatta, taso.leveys - s * laatta);
      for (let r = r0; r <= r1; r += 1) {
        const h = Math.min(laatta, taso.korkeus - r * laatta);
        laatat.push({ sarake: s, rivi: r, x: k * taso.leveys + s * laatta - kansX0, y: r * laatta - kansY0, w, h });
      }
    }
  }
  const viimeinen = laatat[laatat.length - 1];
  if (!viimeinen) return null;
  const leveys = Math.max(...laatat.map((l) => l.x + l.w));
  const korkeus = Math.max(...laatat.map((l) => l.y + l.h));
  return { kansX0, kansY0, leveys, korkeus, laatat, ppu, arkki, projektio, laudanY };
}

/** Pinnan pisteen (lon aukikierrettynä, lat) UV kankaalla (v ylhäältä alas käännettynä, flipY). */
export function lepokerroksenUV(kartta, lon, lat) {
  const px = (((lon - kartta.projektio.lon0) / 360) * kartta.projektio.leveys - kartta.arkki.x) * kartta.ppu;
  const py = (kartta.laudanY(lat) - kartta.arkki.y) * kartta.ppu;
  return { u: (px - kartta.kansX0) / kartta.leveys, v: 1 - (py - kartta.kansY0) / kartta.korkeus };
}

/**
 * Suunnitelma: taso tarpeesta, sitten karkeammaksi kunnes laattamäärä ja
 * kangas mahtuvat kattoihin. Null, jos edes matalin taso ei mahdu.
 */
export function lepokerroksenSuunnitelma({
  tasot, tarvePxAste, alue, laatta, arkki, projektio, laudanY,
  katto = LEPOKERROS_LAATTAKATTO_MIN, kangasKatto = LEPOKERROS_KANGASKATTO, teravyys = LEPOKERROS_TERAVYYS,
}) {
  let taso = lepokerroksenTaso(tasot, tarvePxAste, teravyys);
  const tasoista = new Map((tasot ?? []).map((t) => [t.z, t]));
  while (taso) {
    const kartta = lepokerroksenLaatat({ taso, laatta, arkki, projektio, alue, laudanY });
    if (kartta && kartta.laatat.length <= katto && kartta.leveys <= kangasKatto && kartta.korkeus <= kangasKatto) {
      return { taso, kartta };
    }
    taso = tasoista.get(taso.z - 1) ?? null;
  }
  return null;
}

/** Verkon silmien määrä asteista: LEPOKERROS_RUUDUKKO_AST:n silmä, rajattuna. */
export function lepokerroksenSilmat(asteet) {
  return Math.max(LEPOKERROS_RUUDUKKO_MIN, Math.min(LEPOKERROS_RUUDUKKO_MAX,
    Math.ceil(Math.abs(asteet) / LEPOKERROS_RUUDUKKO_AST)));
}

/**
 * Verkon puskurit: (nx + 1) × (ny + 1) kärkeä, sarake = pituusaste itään,
 * rivi = leveysaste pohjoisesta etelään (sama kierto kuin kirjaston
 * SphereGeometryllä, jotta etupuoli on ulospäin). Normaali on säteen
 * suunta, UV Millerin kankaalta.
 */
export function lepokerroksenVerkko({ alue, kartta, sade, nx, ny }) {
  const kohtia = (nx + 1) * (ny + 1);
  const paikat = new Float32Array(kohtia * 3);
  const normaalit = new Float32Array(kohtia * 3);
  const uvt = new Float32Array(kohtia * 2);
  let i = 0;
  for (let iy = 0; iy <= ny; iy += 1) {
    const lat = alue.lat1 - ((alue.lat1 - alue.lat0) * iy) / ny;
    for (let ix = 0; ix <= nx; ix += 1) {
      const lon = alue.lon0 + ((alue.lon1 - alue.lon0) * ix) / nx;
      const p = pallonPiste(lat, lon, sade);
      const n = pallonPiste(lat, lon, 1);
      paikat[i * 3] = p.x; paikat[i * 3 + 1] = p.y; paikat[i * 3 + 2] = p.z;
      normaalit[i * 3] = n.x; normaalit[i * 3 + 1] = n.y; normaalit[i * 3 + 2] = n.z;
      const uv = lepokerroksenUV(kartta, lon, lat);
      uvt[i * 2] = uv.u; uvt[i * 2 + 1] = uv.v;
      i += 1;
    }
  }
  const indeksit = [];
  for (let iy = 0; iy < ny; iy += 1) {
    for (let ix = 0; ix < nx; ix += 1) {
      const a = iy * (nx + 1) + ix + 1;
      const b = iy * (nx + 1) + ix;
      const c = (iy + 1) * (nx + 1) + ix;
      const d = (iy + 1) * (nx + 1) + ix + 1;
      indeksit.push(a, b, d, b, c, d);
    }
  }
  return { paikat, normaalit, uvt, indeksit };
}

/** THREE:n vakiot (kirjasto ei vie niitä): suodattimet ja reunan kiinnitys. */
const THREE_LINEAR = 1006;
const THREE_LINEAR_MIPMAP_LINEAR = 1008;
const THREE_CLAMP = 1001;

/**
 * Lepokerroksen ajoitus: aito lepo ennen kokoamista (ks. LEPOKERROS JA
 * LIIKE). `levossa()` tulee laattamoottorin levosta (LAATU_LEPOVIIVE_MS
 * viimeisestä liikkeestä) ja käynnistää loppuajan LEPOKERROS_LEPOVIIVE_MS:ään;
 * `liike()` peruu kaiken; `sormiAlas()`/`sormiYlos()` laskevat pohjassa
 * olevia osoittimia — kokoaminen odottaa, kunnes viimeinenkin on irti,
 * ja lähtee silloin heti (kamera ei liiku, jos sormi ei liikkunut).
 * Puhdas ja testattava: aika ja ajastimet tulevat ikkunasta.
 *
 * @returns {{ levossa(): void, liike(): void, sormiAlas(): void, sormiYlos(): void, pura(): void, tila(): object }}
 */
export function luoLepokerroksenAjoitus({
  ikkuna, kokoa, lepoviive = LAATU_LEPOVIIVE_MS, viive = LEPOKERROS_LEPOVIIVE_MS,
}) {
  let lepo = false;
  let sormia = 0;
  let ajastin = 0;
  let odottaa = false;
  const peru = () => { if (ajastin) { ikkuna.clearTimeout(ajastin); ajastin = 0; } odottaa = false; };
  const laukaise = () => {
    ajastin = 0;
    if (!lepo) return;
    // Sormi pohjassa: raahauksen tauko. Kokoaminen odottaa irrotusta.
    if (sormia > 0) { odottaa = true; return; }
    odottaa = false;
    kokoa();
  };
  return {
    levossa() {
      lepo = true;
      peru();
      ajastin = ikkuna.setTimeout(laukaise, Math.max(0, viive - lepoviive));
    },
    liike() { lepo = false; peru(); },
    sormiAlas() { sormia += 1; },
    sormiYlos() {
      sormia = Math.max(0, sormia - 1);
      if (sormia === 0 && odottaa) laukaise();
    },
    pura() { lepo = false; sormia = 0; peru(); },
    tila: () => ({ lepo, sormia, odottaa, ajastettu: Boolean(ajastin) }),
  };
}

/*
 * Kirjaston vakiot pysyvät moduulin sisäisinä kuten ennen; js/pallo.js
 * tarvitsee ne lepokerroksen tekstuuriin, joten ne viedään erikseen.
 */
export { THREE_CLAMP, THREE_LINEAR, THREE_LINEAR_MIPMAP_LINEAR };
