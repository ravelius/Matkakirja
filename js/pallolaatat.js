/*
 * PALLON LAATTAKERROS JA SEN PUHTAAT APURIT.
 *
 * Moduulin alkuosa (erä E0) on pallon lepokerroksen puhtaat laskimet:
 * näkyvän alueen rajaus, laattakatto, tason valinta, laattaruudukko,
 * Millerin UV, verkon puskurit ja levon ajoitus. Ne eivät koske
 * kirjastoon, DOMiin eivätkä pallon tilaan, joten ne ovat yksin
 * testattavia (tests/pallolepokerros.test.mjs) — lepokerroksen elinkaari
 * (luoLepokerros) ja laatunosto (kytkeLaatunosto) ovat yhä js/pallo.js:ssä,
 * joka tuo ja vie nämä nimet edelleen.
 *
 * Moduulin loppuosa (erä E1) on itse LAATTAKERROS: pyramidin laatat
 * laatta kerrallaan pallon pinnalle, taso hystereesillä ruudun
 * pikseleistä, ristihäive ja LRU-kiintiö — sama tarkkuus liikkeessä kuin
 * levossa. Ks. luoLaattakerros ja sen otsikko alempana.
 *
 * Erät E0 ja E1 suunnitelmasta
 * docs/moduulit/pallon-liike-taydella-tarkkuudella.md (luvut 4 ja 6).
 *
 * MODUULI EI TUO js/pallo.js:ÄÄ. Siksi kaksi laatunoston vakiota, joita
 * nämä apurit tarvitsevat (LAATU_LEPOVIIVE_MS, LAATU_KAUKORAJA), muuttivat
 * mukana E0:ssa: js/pallo.js tuo ne täältä takaisin. Toisin päin tuonti
 * tekisi kehän, jossa LEPOKERROS_KORKEUSRAJA jäisi alustamatta — samasta
 * syystä kerros saa kirjaston luokat, pallon laattaluettelon ja laudan
 * tunnuksen kutsujalta (luoLaattakerros-parametrit) eikä tuo niitä.
 * Laattapyramidi ja projektio ovat oma asiansa: ne EIVÄT tuo palloa,
 * joten ne tuodaan tästä suoraan — sama ovi kuin tasokartalla.
 */
import {
  haePyramidinLuettelo, pyramidinKerrostasot, pyramidinLaattaOlemassa, pyramidinLaattaUrl,
} from './laattapyramidi.js';
import { laudaltaAsteiksi, projisoiLaudalle } from './fokusmitat.js';

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
  /*
   * RANTATASO (V4, omistaja 6.9.2026 ilta: pohja ilman rantaviivaa,
   * rantaviiva omalla läpinäkyvällä tasollaan). Pallon sarja kertoo
   * laatat.json:in `ranta`-kentässä, poltettiinko sen laatat rannan
   * kanssa (versio) vai ilman (null, kun vektoriviivat piirtävät
   * rannan). Kerros seuraa sarjaa DATA-OHJATUSTI: rannan kanssa
   * poltettu sarja → ranta-taso piirretään ja sen version on
   * täsmättävä pyramidiin; rannaton sarja → ranta-taso ohitetaan.
   * Vanha sarja ilman kenttää: pyramidin vanha pohja sisältää rannan,
   * ranta-tasoa ei ole → ranta false, käytös ennallaan.
   */
  const ranta = pallonLuettelo.ranta ?? null;
  if (ranta && ranta !== (pyramidi.rantataso?.versio ?? null)) return null;
  return { pohja: true, ranta: Boolean(ranta), viiva: Boolean(viivat), nosto: Boolean(nostot) };
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

/*
 * ======== LAATTAKERROS: SAMA TARKKUUS LIIKKEESSÄ KUIN LEVOSSA =======
 *
 * OMISTAJA 6.9.2026 ilta (Raamattu, PALLO LEVOSSA YHTA TERAVA KUIN
 * TASOKARTTA › PALAUTE v1642:STA, LIIKKEEN AIKAINEN TARKKUUS,
 * sanatarkasti): *"Saisiko tuota siirron aikaista matalampaa
 * resoluutiota mitenkään parannettua? Siinä ei oikeastaan ole mikään
 * muu häiritsevää kuin rannan ääriviiva, koska se kasvaa niin paljon
 * paksummaksi."* ja LISÄYS: *"Google Earthissä myös sisäänpäin zoomaus
 * näyttää portaattomalta."*
 *
 * MIKÄ TÄMÄ ON. Lepokerros on yksi kangas, joka kootaan levossa ja
 * poistetaan liikkeen alkaessa. Laattakerros on sama tekniikka LAATTA
 * KERRALLAAN ja PYSYVÄNÄ: pyramidin laatat (pohja + viiva + nosto
 * samassa järjestyksessä kuin tasokartalla) piirretään pallon pinnalle
 * yksi verkko per laatta, taso valitaan ruudun pikseleistä hystereesillä,
 * uudet laatat häipyvät vanhojen päälle ja vanhat pysyvät kunnes uudet
 * peittävät ne. Mitään ei pureta kerralla, joten liikkeessä ja levossa
 * näkyy sama kartta — se, jonka ruutu tarvitsee.
 *
 * KIRJASTON MOOTTORI JÄÄ POHJAKSI (js/pallo.js POHJAN_TASO_MAX): se
 * naulataan tasoon 5 ja näkyy vain napojen yli (pyramidin rajaus
 * 84° N…66° S) ja sen ajan, kun kerroksen laatta ei ole vielä saapunut.
 * Kynnyksiä ja pikselisuhdetta ei enää vaihdeta liikkeen mukaan.
 *
 * PIIRTOJÄRJESTYS on lepokerroksen (ks. PIIRTOJÄRJESTYS js/pallo.js:ssä):
 * kerros on TÄSMÄLLEEN pinnan säteellä (LEPOKERROS_KOROTUS 1, ei
 * suurennosta eli ei hyppyä) ja järjestys pohjaa vasten tulee
 * syvyyssiirrosta (LAATTAKERROS_SYVYYSSIIRTO −8, factor 0). Kerroksen
 * omat tasot erottaa toisistaan jänteen painuma: hienomman laatan verkko
 * on lähempänä kameraa kuin karkeamman, joten se voittaa syvyystestin
 * ilman omaa siirtoa, ja renderOrder (LAATTAKERROS_RENDER_ORDER_POHJA +
 * z) piirtää karkeat ensin.
 *
 * HÄIVE VAIN PEITON PÄÄLLE (v1641:n oppi: kaksi karttaa päällekkäin on
 * röpelöä). Sisään häivytetään aina — uusi laatta tulee vanhan tai
 * pohjan päälle, jotka peittävät sen alla olevan kokonaan. Ulos
 * häivytetään VAIN, kun karkeampi valmis laatta on jo sen alla; jos
 * hienommat laatat peittävät alueen kokonaan, ylimääräinen poistetaan
 * heti (se ei näy), ja jos mikään ei peitä, se pidetään.
 */
/** Tason valinta: laatan pikseli ≥ laitepikseli × tämä (1 = ei venytystä). */
export const LAATTAKERROS_TERAVYYS = 1;
/**
 * Hystereesi: nykyisestä tasosta luovutaan vasta, kun sen venytys
 * ylittää 1/0,7 = 1,43. Ilman tätä ruudun tarve heilahtaisi tason
 * rajalla edestakaisin (mitattu v1645: zoomissa 2–4 edestakaista
 * vaihtoa kahdeksassa sekunnissa).
 */
export const LAATTAKERROS_HYSTEREESI_ALAS = 0.7;
/** Näytepisteitä ruudulla sivua kohti (9 × 9 = 81 laskettua osumaa). */
export const LAATTAKERROS_NAYTTEITA = 9;
/** Reunus näkyvän alueen ympärille: vähintään näin monta astetta… */
export const LAATTAKERROS_VARA_AST = 0.5;
/** …ja vähintään tämä osuus laatikon suuremmasta sivusta (liikkeen vara). */
export const LAATTAKERROS_VARA_OSUUS = 0.03;
/** Näkyviä laattoja enintään: tätä isompi määrä pudottaa tason karkeammaksi. */
export const LAATTAKERROS_LAATTAKATTO_NAKYVA = 48;
/** Valmiita mutta näkymättömiä laattoja muistissa enintään (LRU). */
export const LAATTAKERROS_LAATTAKATTO_MUISTI = 24;
/** Tekstuurimuistin kiintiö: LRU purkaa, kunnes alitetaan (96 Mt). */
export const LAATTAKERROS_LAATTAKATTO_TAVUT = 96 * 1048576;
/** Rinnakkaisia laattalatauksia enintään. */
export const LAATTAKERROS_RINNAKKAIN = 6;
/** Tekstuureja näytönohjaimelle kehystä kohti (vienti ei saa ryöpytä). */
export const LAATTAKERROS_TEKSTUUREJA_PER_KEHYS = 2;
/** Häive sisään ja ulos (ms). Reduced motion: 0. */
export const LAATTAKERROS_HAIVE_MS = 260;
/** Kerros päivittyy liikkeessä enintään 10 kertaa sekunnissa. */
export const LAATTAKERROS_PAIVITYSVALI_LIIKE_MS = 100;
/** Verkon silmiä laatan sivulla vähintään / enintään. */
export const LAATTAKERROS_SILMAT_MIN = 16;
export const LAATTAKERROS_SILMAT_MAX = 160;
/** polygonOffsetUnits: syvyyspuskurin askelta kameraa kohti (negatiivinen). */
export const LAATTAKERROS_SYVYYSSIIRTO = -8;
/** renderOrder = tämä + z: karkeat tasot ensin, kaikki läpinäkyvien alkuun. */
export const LAATTAKERROS_RENDER_ORDER_POHJA = -10;
/** Onko kerros oletuksena päällä (?laattakerros=0 sammuttaa). */
export const LAATTAKERROS_OLETUS = true;
/** Laatan sivu pikseleinä, kun pyramidin luettelo ei kerro muuta. */
export const LAATTAKERROS_LAATTA = 512;

/**
 * Tason valinta hystereesillä. `nykyinen` on nykyinen taso (olio tai z)
 * tai null.
 *
 * Kaksi ehtoa, ei yhtä: nykyisestä pidetään kiinni vain, jos se on
 * (a) riittävän terävä (leveys/360 ≥ tarve × HYSTEREESI_ALAS) JA
 * (b) korkeintaan yhtä hieno kuin tarve vaatii. Pelkkä (a) jättäisi
 * ulos zoomatessa hienon tason ikuisesti voimaan — se täyttää ehdon
 * aina — ja näkyvä alue kasvaisi satoihin laattoihin.
 */
export function laattakerroksenTaso(tasot, tarvePxAste, nykyinen = null, {
  teravyys = LAATTAKERROS_TERAVYYS, hystereesi = LAATTAKERROS_HYSTEREESI_ALAS,
} = {}) {
  const tarve = lepokerroksenTaso(tasot, tarvePxAste, teravyys);
  if (!tarve) return null;
  const z = Number.isFinite(nykyinen?.z) ? nykyinen.z : nykyinen;
  const nyt = (tasot ?? []).find((t) => t && t.z === z && t.leveys > 0) ?? null;
  if (!nyt || nyt.z > tarve.z) return tarve;
  return nyt.leveys / 360 >= tarvePxAste * hystereesi ? nyt : tarve;
}

/*
 * NÄYTTEET LASKETAAN, EI SÄTEENJÄLJITETÄ (mitattu 6.9.2026). Lepokerros
 * kysyi näkyvän alueen kirjastolta (`toGlobeCoords`) kerran levossa;
 * laattakerros tarvitsee sen kymmenen kertaa sekunnissa, eikä kirjaston
 * säteenjäljitys kestä sitä: 81 kutsua maksoi puhelinnäkymässä
 * **444 ms** (Chromium, ei hidastusta), koska jokainen kutsu testaa
 * pallon kaikki laattaverkot — mittausnäkymässä 47 000 kolmiota, siis
 * 3,8 miljoonaa kolmiotestiä päivitystä kohti.
 *
 * Sama vastaus saadaan kahdella rivillä geometriaa: kamera on
 * TÄSMÄLLEEN säteellä R(1 + korkeus) suunnassa (lat, lng), sillä ei ole
 * kallistusta (OrbitControls, ylös = +Y), ja pallo on origokeskinen —
 * ruudun pisteen säde leikkaa pallon toisen asteen yhtälöllä. Mitattu
 * ero säteenjäljitykseen samassa näkymässä (Ateena, korkeus 0,35,
 * 374 × 771): laatikon reunat 0,03–0,05° kohdallaan, hinta alle 0,1 ms.
 *
 * @param {object} pov   { lat, lng, altitude }
 * @param {number} sx    ruudun x normalisoituna −1…1 (oikealle)
 * @param {number} sy    ruudun y normalisoituna −1…1 (YLÖS)
 * @returns {{lat: number, lng: number}|null} null, jos säde ohittaa pallon
 */
export function laattakerroksenOsuma(pov, sx, sy, { fov = 50, kuvasuhde = 1, sade = 100 } = {}) {
  if (!Number.isFinite(pov?.lat) || !Number.isFinite(pov?.lng) || !Number.isFinite(pov?.altitude)) return null;
  const n = pallonPiste(pov.lat, pov.lng, 1);
  /*
   * Ruudun oikea (itä) ja ylös (pohjoinen) kameran kehyksessä. Oikea on
   * r = ylös × n = (n.z, 0, −n.x) normalisoituna (y on nolla, koska
   * maailman ylös on +Y), ja ylös on u = n × r. Navalla r on
   * määrittelemätön; siellä kelpaa mikä tahansa suunta.
   */
  let rx = n.z;
  let rz = -n.x;
  const rl = Math.hypot(rx, rz);
  if (rl < 1e-9) { rx = 1; rz = 0; } else { rx /= rl; rz /= rl; }
  const ux = n.y * rz;
  const uy = n.z * rx - n.x * rz;
  const uz = -n.y * rx;
  const tanY = Math.tan((fov / 2) * RAD);
  const tanX = tanY * kuvasuhde;
  let dx = -n.x + rx * sx * tanX + ux * sy * tanY;
  let dy = -n.y + uy * sy * tanY;
  let dz = -n.z + rz * sx * tanX + uz * sy * tanY;
  const dl = Math.hypot(dx, dy, dz);
  if (!(dl > 0)) return null;
  dx /= dl; dy /= dl; dz /= dl;
  const etaisyys = sade * (1 + pov.altitude);
  const cx = n.x * etaisyys;
  const cy = n.y * etaisyys;
  const cz = n.z * etaisyys;
  const b = 2 * (cx * dx + cy * dy + cz * dz);
  const c = etaisyys * etaisyys - sade * sade;
  const disc = b * b - 4 * c;
  if (disc < 0) return null;
  const t = (-b - Math.sqrt(disc)) / 2;
  if (!(t > 0)) return null;
  const px = cx + t * dx;
  const py = cy + t * dy;
  const pz = cz + t * dz;
  return {
    lat: Math.asin(Math.max(-1, Math.min(1, py / sade))) / RAD,
    lng: Math.atan2(px, pz) / RAD,
  };
}

/**
 * Onko laatta pallon NÄKYVÄLLÄ puolella? Näkyvä alue on kalotti, jonka
 * reunalla pinnan normaalin ja kameran suunnan pistetulo on R/d =
 * 1/(1 + korkeus). Testi on kalottien leikkaus: laatan keskipisteen
 * kulmaetäisyys kameran alta saa olla enintään horisontti + laatan oma
 * kulmasäde, joten osittainkin näkyvä laatta jää mukaan.
 *
 * Miksi tämä tarvitaan: näkyvä alue on lat/lon-LAATIKKO, ja yleiskuvassa
 * laatikon kulmat ovat pallon takapuolella. Ilman testiä kerros loisi
 * takapuolen laatat (kirjaston moottorilla niitä oli mitattuna 45–139)
 * ja laattakatto pudottaisi tasoa turhaan — mitattu 6.9.2026: zoomissa
 * taso KARKENI kesken sisäänzoomauksen (3 → 2), kun laatikko kasvoi
 * nopeammin kuin taso tarkentui.
 *
 * @param {object} alue    laatan { lat0, lat1, lon0, lon1 }
 * @param {object} pov     { lat, lng, altitude }
 */
export function laattakerroksenNakyvissa(alue, pov) {
  if (!alue || !Number.isFinite(pov?.altitude)) return true;
  const n = pallonPiste(pov.lat, pov.lng, 1);
  const latK = (alue.lat0 + alue.lat1) / 2;
  const lonK = (alue.lon0 + alue.lon1) / 2;
  const c = pallonPiste(latK, lonK, 1);
  const nurkka = pallonPiste(alue.lat1, alue.lon1, 1);
  const pistetulo = (a, b) => Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const sade = Math.acos(pistetulo(c, nurkka));
  const horisontti = Math.acos(Math.max(-1, Math.min(1, 1 / (1 + Math.max(0, pov.altitude)))));
  return Math.acos(pistetulo(c, n)) <= horisontti + sade;
}

/** Verkon silmien määrä laatan sivun asteista (LEPOKERROS_RUUDUKKO_AST). */
export function laattakerroksenSilmat(asteet) {
  return Math.max(LAATTAKERROS_SILMAT_MIN, Math.min(LAATTAKERROS_SILMAT_MAX,
    Math.ceil(Math.abs(asteet) / LEPOKERROS_RUUDUKKO_AST)));
}

/**
 * Yhden laatan "kartta": sama muoto kuin lepokerroksenLaatat, mutta
 * kansX0/kansY0 tulevat laatan omasta pikselipaikasta. Kerros ei kokoa
 * yhtä kangasta vaan piirtää laatan omaksi tekstuurikseen, joten UV
 * (lepokerroksenUV) juoksee laatan sisällä 0…1 ja sauma katoaa: laatta
 * asetetaan omalle pituuspiirilleen, ja pallo on jaksollinen.
 */
export function laatanKartta(taso, sarake, rivi, {
  laatta = LAATTAKERROS_LAATTA, arkki = null, projektio = null, laudanY = null,
} = {}) {
  if (!taso || !(laatta > 0)) return null;
  if (!(sarake >= 0 && rivi >= 0 && sarake < taso.sarakkeita && rivi < taso.riveja)) return null;
  const w = Math.min(laatta, taso.leveys - sarake * laatta);
  const h = Math.min(laatta, taso.korkeus - rivi * laatta);
  if (!(w > 0 && h > 0)) return null;
  return {
    kansX0: sarake * laatta, kansY0: rivi * laatta, leveys: w, korkeus: h,
    laatat: [{ sarake, rivi, x: 0, y: 0, w, h }],
    ppu: taso.pikseliaPerYksikko, arkki, projektio, laudanY,
  };
}

/**
 * Peittotesti: peittävätkö tason z + 1 (tai `kohdeZ`) valmiit laatat
 * laatan `{ z, sarake, rivi }` alueen kokonaan? Millerin pyramidissa
 * tasot eivät sisäkkäisty siististi 2 × 2:na (sarakkeita on
 * 675 · 2^z / 512, ei potenssia kahdesta), joten alue projisoidaan
 * pikseleinä ja osuvat laatat luetellaan. Rajauksen ulkopuolelle jäävät
 * sarakkeet ja rivit eivät ole peiton este — niitä ei ole olemassa.
 *
 * @param {object} laatta  { z, sarake, rivi }
 * @param {Set|object} valmiit  avaimet 'z/sarake/rivi', jotka ovat valmiita
 * @param {Array} tasot    pyramidin tasot
 */
export function laattakerroksenPeitto(laatta, valmiit, tasot, {
  laattaKoko = LAATTAKERROS_LAATTA, kohdeZ = null,
} = {}) {
  const nyt = (tasot ?? []).find((t) => t && t.z === laatta?.z) ?? null;
  const kohde = (tasot ?? []).find((t) => t && t.z === (kohdeZ ?? (laatta?.z ?? 0) + 1)) ?? null;
  if (!nyt || !kohde || kohde.z <= nyt.z) return false;
  const s = kohde.leveys / nyt.leveys;
  const x0 = laatta.sarake * laattaKoko;
  const x1 = Math.min(nyt.leveys, x0 + laattaKoko);
  const y0 = laatta.rivi * laattaKoko;
  const y1 = Math.min(nyt.korkeus, y0 + laattaKoko);
  if (!(x1 > x0 && y1 > y0)) return false;
  const on = valmiit instanceof Set ? (a) => valmiit.has(a) : (a) => Boolean(valmiit?.[a]);
  const s0 = Math.floor((x0 * s) / laattaKoko);
  const s1 = Math.ceil((x1 * s) / laattaKoko) - 1;
  const r0 = Math.floor((y0 * s) / laattaKoko);
  const r1 = Math.ceil((y1 * s) / laattaKoko) - 1;
  for (let r = r0; r <= r1; r += 1) {
    if (r < 0 || r >= kohde.riveja) continue;
    for (let sar = s0; sar <= s1; sar += 1) {
      if (sar < 0 || sar >= kohde.sarakkeita) continue;
      if (!on(`${kohde.z}/${sar}/${r}`)) return false;
    }
  }
  return true;
}

/**
 * LRU: mitkä tietueet puretaan? Näkyviä ei pureta koskaan. Muista
 * pidetään enintään `katto` tuoreinta, ja jos tekstuurimuisti ylittää
 * `tavukatto`n, puretaan vanhimmasta alkaen kunnes alitetaan.
 *
 * @param {Array} tietueet  [{ avain, nakyva, kaytetty, tavut }]
 * @returns {string[]} purettavien avaimet purkujärjestyksessä
 */
export function laattakerroksenLRU(tietueet, katto = LAATTAKERROS_LAATTAKATTO_MUISTI,
  tavukatto = LAATTAKERROS_LAATTAKATTO_TAVUT) {
  const kaikki = [...(tietueet ?? [])].filter(Boolean);
  const ehdokkaat = kaikki.filter((t) => !t.nakyva).sort((a, b) => (a.kaytetty ?? 0) - (b.kaytetty ?? 0));
  const ulos = [];
  const purettu = new Set();
  const yli = Math.max(0, ehdokkaat.length - Math.max(0, katto));
  for (let i = 0; i < yli; i += 1) { ulos.push(ehdokkaat[i].avain); purettu.add(ehdokkaat[i].avain); }
  let tavuja = kaikki.reduce((s, t) => s + (purettu.has(t.avain) ? 0 : (t.tavut ?? 0)), 0);
  for (const t of ehdokkaat) {
    if (tavuja <= tavukatto) break;
    if (purettu.has(t.avain)) continue;
    ulos.push(t.avain);
    purettu.add(t.avain);
    tavuja -= t.tavut ?? 0;
  }
  return ulos;
}

/**
 * Laattakerroksen elinkaari yhdelle pallolle. Kutsutaan laatunoston
 * asennuksesta (js/pallo.js kytkeLaatunosto), kun kerros on päällä.
 *
 * Kirjaston luokat, pallon laattaluettelo ja laudan tunnus TUODAAN
 * SISÄÄN (kolmiulotteinen, pallonSarja, lauta, naparaja): ne asuvat
 * js/pallo.js:ssä, joka tuo tämän moduulin — tuonti toisin päin tekisi
 * kehän, jossa moduulin vakiot jäisivät alustamatta (ks. otsikko).
 *
 * @returns {{ paivita(pov, liikkeessa): boolean, mittarit(): object, pura(): void }}
 */
export function luoLaattakerros({
  pallo, kotelo, ikkuna, renderer,
  kolmiulotteinen, pallonSarja = () => null, lauta = 'maailmankartta', naparaja = 90,
}) {
  const doc = kotelo?.ownerDocument ?? ikkuna?.document ?? null;
  const aika = () => ikkuna.performance?.now?.() ?? Date.now();
  const reduced = () => Boolean(ikkuna.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  const mittarit = {
    tila: 'ei', taso: null, laattoja: 0, valmiita: 0, hapyvia: 0, pyyntoja: 0, pyydettyja: 0,
    syy: '', kaytetytTavut: 0, jonossa: 0, scenessa: 0, purettuja: 0, paivityksia: 0,
    /** Haettiinko pyramidi.json tästä (savukkeet laskevat sen kerroksen pyynnöksi). */
    luettelo: false,
    /** Lepokerroksen kenttä; kerros ei kokoa yhtä kangasta (savukkeiden tuloste). */
    kangas: null,
  };
  const pyydetyt = new Set();
  /** avain 'z/sarake/rivi' → tietue. */
  const laatat = new Map();
  const jono = [];
  const vientijono = [];
  let ladattavia = 0;
  let vientiRaf = 0;
  let taso = null;
  let pyramidi;
  let pyramidiHaussa = false;
  let kerrokset = null;
  let sukupolvi = 0;
  let viimePaivitys = -Infinity;
  let purettu = false;

  /*
   * Kirjaston luokat ja pallon ryhmä haetaan scenestä KERRAN. Haku
   * traversoi koko näyttämön, ja kerros päivittyy kymmenen kertaa
   * sekunnissa — muistiin pantuna se on yksi haku per pallo.
   */
  let kolmiMuisti = null;
  const kolmi = () => {
    if (kolmiMuisti) return kolmiMuisti;
    const k = kolmiulotteinen?.(pallo) ?? null;
    if (k?.laatatValmiit && k.Texture && k.BufferGeometry && k.BufferAttribute && k.juuri) kolmiMuisti = k;
    return k;
  };

  const laudanY = (lat) => projisoiLaudalle(lauta, 0, lat)?.y ?? NaN;
  const yLat = (y) => laudaltaAsteiksi(lauta, 0, y)?.lat ?? NaN;
  const tasoZ = (z) => (pyramidi?.tasot ?? []).find((t) => t.z === z) ?? null;
  const laattaKoko = () => pyramidi?.laatta ?? LAATTAKERROS_LAATTA;
  const luovuta = (syy) => { mittarit.syy = syy; return false; };

  /* ---------------- kuvat ---------------- */

  /**
   * Laatan kuva: createImageBitmap (dekoodaus pääsäikeen ulkopuolella).
   * Vara on tavallinen Image + decode(), jos selain ei tunne bittikarttaa
   * tai haku kaatuu. CORS on pakko: kangas menee WebGL-tekstuuriksi.
   */
  const haeKuva = async (url, merkki = null) => {
    pyydetyt.add(url);
    mittarit.pyyntoja += 1;
    if (ikkuna.createImageBitmap && ikkuna.fetch) {
      try {
        const vastaus = await ikkuna.fetch(url, { mode: 'cors', credentials: 'omit', signal: merkki ?? undefined });
        if (!vastaus.ok) return null;
        return await ikkuna.createImageBitmap(await vastaus.blob());
      } catch { /* vara alla */ }
    }
    // Katkaistu lataus (laatta purettiin kesken haun) ei mene varapolulle:
    // se ottaisi latauspaikan takaisin siltä laatalta, jota katsotaan.
    if (merkki?.aborted) return null;
    // Varapolku on OMA verkkopyyntönsä (haku kaatui): savukkeiden vartio
    // vähentää kerroksen pyynnöt tasokartan pyynnöistä, joten molemmat
    // lasketaan.
    mittarit.pyyntoja += 1;
    return new Promise((ok) => {
      const kuva = new ikkuna.Image();
      kuva.crossOrigin = 'anonymous';
      kuva.decoding = 'async';
      kuva.fetchPriority = 'high';
      kuva.onload = () => (kuva.decode ? kuva.decode().then(() => ok(kuva), () => ok(kuva)) : ok(kuva));
      kuva.onerror = () => ok(null);
      kuva.src = url;
    });
  };

  const luoKangas = (w, h) => {
    if (ikkuna.OffscreenCanvas) {
      try { return new ikkuna.OffscreenCanvas(w, h); } catch { /* vara alla */ }
    }
    const kangas = doc?.createElement?.('canvas');
    if (!kangas) return null;
    kangas.width = w;
    kangas.height = h;
    return kangas;
  };

  /* ---------------- häive ---------------- */

  const haivyta = (materiaali, kohde, kesto, valmis = null) => {
    const alku = materiaali.opacity;
    materiaali.__kohde = kohde;
    // Valmis laatta on läpinäkymätön (nopeampi ja kirjoittaa syvyyden);
    // ulos-häive tarvitsee läpinäkyvyyden takaisin, muuten opacity ei
    // vaikuta mihinkään.
    if (kohde < 1 && !materiaali.transparent) { materiaali.transparent = true; materiaali.needsUpdate = true; }
    const paata = () => {
      materiaali.opacity = kohde;
      if (kohde >= 1 && materiaali.transparent) { materiaali.transparent = false; materiaali.needsUpdate = true; }
      valmis?.();
    };
    if (!(kesto > 0) || alku === kohde) { paata(); return; }
    const t0 = aika();
    const askel = () => {
      if (materiaali.__haive !== askel) return;
      const t = Math.min(1, (aika() - t0) / kesto);
      const e = 1 - (1 - t) ** 3;
      materiaali.opacity = alku + (kohde - alku) * e;
      if (t < 1) { ikkuna.requestAnimationFrame(askel); return; }
      materiaali.__haive = null;
      paata();
    };
    materiaali.__haive = askel;
    ikkuna.requestAnimationFrame(askel);
  };

  /* ---------------- tietueen purku ---------------- */

  const poista = (t) => {
    if (!t) return;
    // Kesken oleva haku katkaistaan: purettu laatta ei saa pitää
    // latauspaikkaa (LAATTAKERROS_RINNAKKAIN) sen laatan tieltä, jota
    // juuri katsotaan.
    try { t.katkaisin?.abort?.(); } catch { /* ei väliä */ }
    t.katkaisin = null;
    if (t.materiaali) t.materiaali.__haive = null;
    if (t.verkko) {
      t.verkko.parent?.remove(t.verkko);
      t.verkko.geometry?.dispose?.();
    }
    t.tekstuuri?.dispose?.();
    t.materiaali?.dispose?.();
    t.verkko = null;
    t.materiaali = null;
    t.tekstuuri = null;
    t.scenessa = false;
    laatat.delete(t.avain);
    mittarit.purettuja += 1;
  };

  /* ---------------- laatan luonti ---------------- */

  /*
   * Laatan lat/lon-suorakaide sen omista pikselirajoista. Rivin
   * leveysasteet muistetaan: Millerin käänteismuunnos (laudaltaAsteiksi)
   * ajetaan päivityksessä sadoille laattaehdokkaille, ja rivejä on
   * kourallinen.
   */
  const rivimuisti = new Map();
  const laatanAlue = (tasoOlio, sarake, rivi) => {
    const { arkki, projektio } = pyramidi;
    const koko = laattaKoko();
    const ppu = tasoOlio.pikseliaPerYksikko;
    const lonPx = (px) => ((px / ppu + arkki.x) / projektio.leveys) * 360 + projektio.lon0;
    const latPx = (py) => {
      const avain = `${tasoOlio.z}/${py}`;
      let lat = rivimuisti.get(avain);
      if (lat === undefined) { lat = yLat(py / ppu + arkki.y); rivimuisti.set(avain, lat); }
      return lat;
    };
    const x0 = sarake * koko;
    const y0 = rivi * koko;
    const w = Math.min(koko, tasoOlio.leveys - x0);
    const h = Math.min(koko, tasoOlio.korkeus - y0);
    return {
      lon0: lonPx(x0), lon1: lonPx(x0 + w),
      lat1: latPx(y0), lat0: latPx(y0 + h),
    };
  };

  const lataa = async (t) => {
    const tasoOlio = tasoZ(t.z);
    const luokat = kolmi();
    if (!tasoOlio || !luokat?.laatatValmiit || !luokat.Texture || !luokat.BufferGeometry || !luokat.BufferAttribute) {
      t.tila = 'virhe';
      return;
    }
    const kartta = laatanKartta(tasoOlio, t.sarake, t.rivi, {
      laatta: laattaKoko(), arkki: pyramidi.arkki, projektio: pyramidi.projektio, laudanY,
    });
    if (!kartta) { t.tila = 'virhe'; return; }
    const kerrostasot = (pyramidinKerrostasot(t.z) ?? [])
      .filter((k) => (k.nosto ? kerrokset.nosto : (k.viiva ? kerrokset.viiva : (k.ranta ? kerrokset.ranta : true))));
    if (!kerrostasot.length) { t.tila = 'virhe'; return; }
    const katkaisin = ikkuna.AbortController ? new ikkuna.AbortController() : null;
    t.katkaisin = katkaisin;
    const kuvat = await Promise.all(kerrostasot.map((k) => (pyramidinLaattaOlemassa(k, t.sarake, t.rivi)
      ? haeKuva(pyramidinLaattaUrl(k, t.sarake, t.rivi), katkaisin?.signal ?? null) : null)));
    t.katkaisin = null;
    if (purettu || !laatat.has(t.avain)) { for (const k of kuvat) k?.close?.(); return; }
    if (!kuvat.some(Boolean)) { t.tila = 'virhe'; return; }
    const kangas = luoKangas(kartta.leveys, kartta.korkeus);
    const ctx = kangas?.getContext?.('2d');
    if (!ctx) { t.tila = 'virhe'; return; }
    for (const kuva of kuvat) {
      if (!kuva) continue;
      ctx.drawImage(kuva, 0, 0, kartta.leveys, kartta.korkeus);
      kuva.close?.();
    }
    // Verkko: laatan oma lat/lon-suorakaide, UV laatan omalla kankaalla.
    const alue = laatanAlue(tasoOlio, t.sarake, t.rivi);
    if (!Number.isFinite(alue.lat0) || !Number.isFinite(alue.lat1) || !(alue.lat1 > alue.lat0)) {
      t.tila = 'virhe';
      return;
    }
    const nx = laattakerroksenSilmat(alue.lon1 - alue.lon0);
    const ny = laattakerroksenSilmat(alue.lat1 - alue.lat0);
    const sade = pallo.getGlobeRadius() * LEPOKERROS_KOROTUS;
    const puskurit = lepokerroksenVerkko({ alue, kartta, sade, nx, ny });
    const geometria = new luokat.BufferGeometry();
    geometria.setAttribute('position', new luokat.BufferAttribute(puskurit.paikat, 3));
    geometria.setAttribute('normal', new luokat.BufferAttribute(puskurit.normaalit, 3));
    geometria.setAttribute('uv', new luokat.BufferAttribute(puskurit.uvt, 2));
    geometria.setIndex(puskurit.indeksit);
    const tekstuuri = new luokat.Texture(kangas);
    const malli = luokat.tekstuurimalli;
    // Sama väriavaruus kuin laatoilla — muuten sävy hyppäisi kerroksen alla.
    if (malli && 'colorSpace' in malli) tekstuuri.colorSpace = malli.colorSpace;
    else if (malli && 'encoding' in malli) tekstuuri.encoding = malli.encoding;
    const webgl2 = Boolean(renderer?.capabilities?.isWebGL2);
    tekstuuri.generateMipmaps = webgl2;
    tekstuuri.minFilter = webgl2 ? THREE_LINEAR_MIPMAP_LINEAR : THREE_LINEAR;
    tekstuuri.magFilter = THREE_LINEAR;
    tekstuuri.wrapS = THREE_CLAMP;
    tekstuuri.wrapT = THREE_CLAMP;
    tekstuuri.anisotropy = renderer?.capabilities?.getMaxAnisotropy?.() ?? 1;
    tekstuuri.needsUpdate = true;
    const materiaali = new luokat.LaattaMateriaali({
      map: tekstuuri, transparent: true, opacity: 0, depthWrite: true,
      polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: LAATTAKERROS_SYVYYSSIIRTO,
    });
    const verkko = new luokat.Mesh(geometria, materiaali);
    verkko.renderOrder = LAATTAKERROS_RENDER_ORDER_POHJA + t.z;
    // Kerros ei ota napautuksia: pelin merkit ja onGlobeClick kuten ennen.
    verkko.raycast = () => {};
    verkko.userData.laattakerros = { z: t.z, sarake: t.sarake, rivi: t.rivi };
    t.alue = alue;
    t.tekstuuri = tekstuuri;
    t.materiaali = materiaali;
    t.verkko = verkko;
    t.silmat = [nx, ny];
    t.tavut = Math.round(kartta.leveys * kartta.korkeus * 4 * (webgl2 ? 4 / 3 : 1));
    t.tila = 'valmis';
    vientijono.push(t);
    ajaVienti();
  };

  /* ---------------- latausjono ---------------- */

  const kaynnista = () => {
    if (purettu) return;
    jono.sort((a, b) => a.etaisyys - b.etaisyys);
    while (ladattavia < LAATTAKERROS_RINNAKKAIN && jono.length) {
      const t = jono.shift();
      if (!laatat.has(t.avain) || t.tila !== 'ladataan' || t.aloitettu) continue;
      t.aloitettu = true;
      ladattavia += 1;
      lataa(t)
        .catch((syy) => { t.tila = 'virhe'; mittarit.syy = String(syy?.message ?? syy); })
        .then(() => { ladattavia -= 1; kaynnista(); });
    }
    mittarit.jonossa = jono.length;
  };

  /* ---------------- tekstuurien vienti (≤ 2 / kehys) ---------------- */

  const ajaVienti = () => {
    if (purettu || vientiRaf || !vientijono.length) return;
    vientiRaf = ikkuna.requestAnimationFrame(() => {
      vientiRaf = 0;
      let n = 0;
      while (vientijono.length && n < LAATTAKERROS_TEKSTUUREJA_PER_KEHYS) {
        const t = vientijono.shift();
        if (!laatat.has(t.avain) || !t.tekstuuri) continue;
        renderer?.initTexture?.(t.tekstuuri);
        t.viety = true;
        n += 1;
        // Vanhentunut tietue (sukupolvi vaihtui eikä laatta ole enää
        // näkyvissä) ei mene sceneen; lataus itse ei koskaan peruunnu.
        if (t.nakyva) lisaaSceneen(t);
      }
      if (vientijono.length) ajaVienti();
    });
  };

  /* ---------------- scene ---------------- */

  const lisaaSceneen = (t) => {
    if (!t.verkko || t.scenessa) return;
    const juuri = kolmi()?.juuri;
    if (!juuri) return;
    juuri.add(t.verkko);
    t.scenessa = true;
    haivyta(t.materiaali, 1, reduced() ? 0 : LAATTAKERROS_HAIVE_MS);
  };

  /**
   * Onko ylimääräisen laatan alla valmis karkeampi laatta? Vain silloin
   * ulos-häive on turvallinen: alla on jo koko kartta, eikä kahta
   * karttaa jää päällekkäin (v1641:n oppi).
   */
  const karkeampiValmis = (t, valittu, valmiit) => {
    if (!(valittu.z < t.z)) return false;
    const oma = tasoZ(t.z);
    if (!oma) return false;
    const koko = laattaKoko();
    const s = valittu.leveys / oma.leveys;
    const sar = Math.floor(((t.sarake + 0.5) * koko * s) / koko);
    const rivi = Math.floor(((t.rivi + 0.5) * koko * s) / koko);
    return valmiit.has(`${valittu.z}/${sar}/${rivi}`);
  };

  /* ---------------- päivitys ---------------- */

  const varmistaPyramidi = () => {
    if (pyramidi !== undefined || pyramidiHaussa) return;
    pyramidiHaussa = true;
    mittarit.luettelo = true;
    haePyramidinLuettelo()
      .then((p) => { pyramidi = p ?? null; })
      .catch(() => { pyramidi = null; })
      .then(() => { if (!purettu) suorita(); });
  };

  function suorita() {
    if (purettu) return false;
    const luokat = kolmi();
    if (!luokat?.laatatValmiit || !luokat.Texture || !luokat.BufferGeometry || !luokat.BufferAttribute) {
      return luovuta('kirjaston luokat puuttuvat');
    }
    varmistaPyramidi();
    if (pyramidi === undefined) return luovuta('pyramidin luettelo haussa');
    if (!pyramidi) return luovuta('pyramidin luetteloa ei saatu');
    kerrokset = lepokerroksenKerrokset(pallonSarja(), pyramidi);
    if (!kerrokset) return luovuta('pallon sarja ja pyramidi eri versiota');
    const W = kotelo.clientWidth;
    const H = kotelo.clientHeight;
    if (!(W > 0 && H > 0)) return luovuta('kotelo piilossa');
    const pov = pallo.pointOfView?.();
    if (!pov || !Number.isFinite(pov.altitude)) return luovuta('ei kameraa');
    const kam = pallo.camera?.();
    const linssi = {
      fov: Number.isFinite(kam?.fov) ? kam.fov : 50,
      kuvasuhde: Number.isFinite(kam?.aspect) && kam.aspect > 0 ? kam.aspect : W / H,
      sade: pallo.getGlobeRadius(),
    };
    const osuma = (x, y) => laattakerroksenOsuma(pov, (2 * x) / W - 1, 1 - (2 * y) / H, linssi);
    const keski = osuma(W / 2, H / 2);
    const alas = osuma(W / 2, H / 2 + LEPOKERROS_MITTAMATKA_PX);
    if (!keski || !alas || !(Math.abs(keski.lat - alas.lat) > 1e-6)) return luovuta('keskipiste ei pallolla');
    const naytteet = [];
    const N = LAATTAKERROS_NAYTTEITA;
    for (let j = 0; j < N; j += 1) {
      for (let i = 0; i < N; i += 1) naytteet.push(osuma((W * i) / (N - 1), (H * j) / (N - 1)));
    }
    const rajaus = pyramidi.rajaus ?? pyramidi.arkki;
    const latMax = Math.min(naparaja, yLat(rajaus.y));
    const latMin = Math.max(-naparaja, yLat(rajaus.y + rajaus.h));
    const raaka = lepokerroksenAlue(naytteet, pov.lng, { latMin, latMax, vara: 0 });
    if (!raaka) return luovuta('ei näytteitä pallolla');
    /*
     * Vara on aina vähintään puoli astetta ja lisäksi 3 % laatikosta:
     * reunan uudet laatat ehtivät saapua ennen kuin panorointi tuo ne
     * näkyviin (suunnitelman luku 4.4, "reunan laatat saapuvat hitaasti").
     */
    const vara = Math.max(LAATTAKERROS_VARA_AST,
      LAATTAKERROS_VARA_OSUUS * Math.max(raaka.lat1 - raaka.lat0, raaka.lon1 - raaka.lon0));
    const alue = lepokerroksenAlue(naytteet, pov.lng, { latMin, latMax, vara }) ?? raaka;
    // Ruudun tarve: laitepikseleitä astetta kohti keskellä (fov on pystykulma).
    const suhde = renderer?.getPixelRatio?.() ?? (ikkuna.devicePixelRatio || 1);
    const tarvePxAste = (LEPOKERROS_MITTAMATKA_PX * suhde) / Math.abs(keski.lat - alas.lat);
    let valittu = laattakerroksenTaso(pyramidi.tasot, tarvePxAste, taso);
    let kartta = null;
    let nakyvatLaatat = null;
    while (valittu) {
      kartta = lepokerroksenLaatat({
        taso: valittu, laatta: laattaKoko(), arkki: pyramidi.arkki,
        projektio: pyramidi.projektio, alue, laudanY,
      });
      // Takapuoli pois ENNEN kattoa: laatikon kulmat ovat yleiskuvassa
      // pallon toisella puolella eivätkä saa pudottaa tasoa.
      nakyvatLaatat = kartta
        ? kartta.laatat.filter((l) => laattakerroksenNakyvissa(laatanAlue(valittu, l.sarake, l.rivi), pov))
        : null;
      if (nakyvatLaatat?.length && nakyvatLaatat.length <= LAATTAKERROS_LAATTAKATTO_NAKYVA) break;
      valittu = tasoZ(valittu.z - 1);
      kartta = null;
      nakyvatLaatat = null;
    }
    if (!valittu || !kartta) return luovuta('alue ei mahdu laattakattoon');
    if (taso?.z !== valittu.z) sukupolvi += 1;
    taso = valittu;
    const nyt = aika();
    const ppu = valittu.pikseliaPerYksikko;
    const keskiX = (((keski.lng - pyramidi.projektio.lon0) / 360) * pyramidi.projektio.leveys - pyramidi.arkki.x) * ppu;
    const keskiY = (laudanY(keski.lat) - pyramidi.arkki.y) * ppu;
    const koko = laattaKoko();

    /* 1. näkyvät laatat: tietue, latausjono ja sceneen lisäys. */
    const nakyvat = new Set();
    for (const l of nakyvatLaatat) {
      const avain = `${valittu.z}/${l.sarake}/${l.rivi}`;
      nakyvat.add(avain);
      let t = laatat.get(avain);
      if (!t) {
        t = {
          avain, z: valittu.z, sarake: l.sarake, rivi: l.rivi, alue: null, tila: 'ladataan',
          verkko: null, materiaali: null, tekstuuri: null, kaytetty: nyt, tavut: 0,
          nakyva: true, scenessa: false, viety: false, aloitettu: false, haipyy: false,
          katkaisin: null, etaisyys: 0, sukupolvi,
        };
        laatat.set(avain, t);
      }
      // Etäisyys ruudun keskeltä laattapikseleinä (sauma kierretään auki).
      let dx = (l.sarake + 0.5) * koko - keskiX;
      while (dx > valittu.leveys / 2) dx -= valittu.leveys;
      while (dx < -valittu.leveys / 2) dx += valittu.leveys;
      t.etaisyys = Math.hypot(dx, (l.rivi + 0.5) * koko - keskiY);
      t.kaytetty = nyt;
      t.nakyva = true;
      t.haipyy = false;
      // Ulos häipymässä ollut laatta palasi näkyviin: käännetään häive
      // takaisin. Sisään häipyvään ei kosketa — uudelleenaloitus joka
      // päivityksellä (10 kertaa sekunnissa) ei koskaan päättyisi.
      if (t.materiaali && t.materiaali.__kohde === 0) {
        haivyta(t.materiaali, 1, reduced() ? 0 : LAATTAKERROS_HAIVE_MS);
      }
      if (t.tila === 'valmis' && t.viety && !t.scenessa) lisaaSceneen(t);
    }
    for (const t of laatat.values()) if (!nakyvat.has(t.avain)) t.nakyva = false;

    /* 2. ylimääräiset: poista peiton alta, häivytä karkeamman päältä, muuten pidä. */
    const valmiit = new Set();
    for (const t of laatat.values()) {
      if (t.tila === 'valmis' && t.scenessa && t.materiaali && t.materiaali.opacity >= 1) valmiit.add(t.avain);
    }
    for (const t of [...laatat.values()]) {
      if (t.nakyva || !t.scenessa || t.haipyy) continue;
      if (t.z < valittu.z && laattakerroksenPeitto(t, valmiit, pyramidi.tasot, {
        laattaKoko: koko, kohdeZ: valittu.z,
      })) { poista(t); continue; }
      if (!karkeampiValmis(t, valittu, valmiit)) continue;
      t.haipyy = true;
      haivyta(t.materiaali, 0, reduced() ? 0 : LAATTAKERROS_HAIVE_MS, () => poista(t));
    }

    /* 3. LRU: näkymättömiä valmiita muistissa katon verran. */
    for (const avain of laattakerroksenLRU([...laatat.values()])) {
      const t = laatat.get(avain);
      if (t && !t.haipyy) poista(t);
    }

    /*
     * 4. Latausjono KOOTAAN JOKA PÄIVITYKSELLÄ näkyvistä lataamattomista,
     * lähin ensin. Zoomatessa taso vaihtuu monta kertaa sekunnissa, ja
     * kertaalleen jonoon jätetyt vanhentuneet tietueet veisivät kaistan
     * laatoilta, joita ei enää katsota (mitattu: jono ei tyhjentynyt
     * zoomin aikana lainkaan). Kesken oleva lataus jatkuu loppuun —
     * liike ei peru latauksia, vain vanhentuneiden lisäyksen sceneen.
     */
    jono.length = 0;
    for (const t of laatat.values()) {
      if (t.nakyva && t.tila === 'ladataan' && !t.aloitettu) jono.push(t);
    }

    const tietueet = [...laatat.values()];
    mittarit.tila = 'nakyy';
    mittarit.taso = valittu.z;
    mittarit.laattoja = tietueet.length;
    mittarit.valmiita = tietueet.filter((t) => t.tila === 'valmis').length;
    mittarit.hapyvia = tietueet.filter((t) => t.scenessa && t.materiaali && t.materiaali.opacity < 1).length;
    mittarit.scenessa = tietueet.filter((t) => t.scenessa).length;
    mittarit.kaytetytTavut = tietueet.reduce((s, t) => s + (t.tavut ?? 0), 0);
    mittarit.pyydettyja = pyydetyt.size;
    mittarit.paivityksia += 1;
    mittarit.syy = '';
    kaynnista();
    return true;
  }

  const paivita = (pov, liikkeessa = false) => {
    if (purettu) return false;
    const nyt = aika();
    if (liikkeessa && nyt - viimePaivitys < LAATTAKERROS_PAIVITYSVALI_LIIKE_MS) return false;
    viimePaivitys = nyt;
    return suorita();
  };

  return {
    paivita,
    /** Päivitä heti ilman harvennusta (savukkeet ja vartijat). */
    kokoa: () => paivita(null, false),
    /** Lepokerroksen rajapinta: kerros päivittyy, se ei kokoa eikä piiloudu. */
    levossa: () => paivita(null, false),
    piilota: () => false,
    mittarit: () => ({ ...mittarit, pyydetyt: [...pyydetyt], nakyvissa: mittarit.scenessa > 0 }),
    pura: () => {
      purettu = true;
      sukupolvi += 1;
      if (vientiRaf) ikkuna.cancelAnimationFrame?.(vientiRaf);
      vientiRaf = 0;
      vientijono.length = 0;
      jono.length = 0;
      for (const t of [...laatat.values()]) poista(t);
      laatat.clear();
      mittarit.tila = 'purettu';
      mittarit.laattoja = 0;
      mittarit.scenessa = 0;
    },
  };
}
