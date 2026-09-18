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
  pyramidinTasoitus, pyramidinVaritasonMaa,
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
 * Ruudun piste pallon pinnalle OMALLA säde–pallo-leikkauksella.
 *
 * TÄMÄ ON PALLON AINOA PINNANLUKIJA (vika v1649, mitattu 6.9.2026).
 * Kirjaston `toGlobeCoords` säteenjäljittää scenen, ja osuma tulee
 * kirjaston omasta pallosta, joka on 72 × 36 -jaettu monitahokas
 * (globeCurvatureResolution 5°): jänne painuu pinnan alle, ja
 * osumapiste eroaa oikeasta jopa 3,2 laitepikseliä (mediaani 1,4;
 * puhelin 390 × 844 dpr 3, Ateena korkeus 0,35, 124 px/aste). Sormiveto
 * (js/pallo.js asennaPallonEleet) syöttää tuon eron suoraan kameraan
 * JOKA pointermovessa, joten kartta ei pysy sormen alla — ja koska
 * liu'ussa (irrotuksen jälkeen) sitä ei lueta lainkaan, oire loppuu
 * täsmälleen silloin kun sormi irtoaa. Sama leikkaus kaikille:
 * vektorikerros ja laattakerros lukevat pinnan tästä.
 *
 * Pallo on origokeskinen säteellä R, joten leikkaus on toisen asteen
 * yhtälö — mikrosekunteja, kun säteenjäljitys maksoi mitatusti 585 ms
 * 49 näytteeltä. Palauttaa { lat, lng } tai null, jos säde menee pallon
 * ohi (ruudun kulma taivaalla).
 *
 * ── SÄDE LASKETAAN KAMERAN PAIKASTA, EI SEN MATRIISISTA ────────────
 * (vika v1664: *"Kartta räpsii panoroitaessa"*, mitattu 7.9.2026)
 *
 * Ensimmäinen toteutus (v1653) otti säteen suunnan `unproject`illa,
 * joka lukee kameran `matrixWorld`in — mutta origon `kamera.position`
 * ista. Ne EIVÄT ole samasta hetkestä: `pointOfView` siirtää kameran
 * paikan HETI, kun taas suunnan (lookAt origoon) päivittää OrbitControls
 * vasta seuraavassa piirrossa. Sormivedon aikana kameran paikka on siis
 * tuore ja suunta vanha, ja lukema on väärä kaikilla niillä
 * pointermoveilla, jotka osuvat kahden piirron väliin — iPhonella niitä
 * on joka toinen (120 Hz syöte, 60 Hz piirto).
 *
 * Mitattu (puhelin 390 × 844, Chromium, 7.9.2026): kun kamera oli juuri
 * siirretty 10° itään, ruudun keski luki **13,558°** eikä 10°. Kahdeksan
 * yhtä suurta 8 px:n sormiaskelta siirsivät karttaa
 * 0,1941° / 0,1261° / 0,1499° / 0,1415° / 0,1444° / 0,1433° / 0,1437° /
 * 0,1435° — sahaus **1,54×** (suurin / pienin). Juuri se on räpsintä:
 * kartta ei kulje sormen tahdissa vaan nykii joka toisella syötteellä.
 * Kirjaston vanha `toGlobeCoords` ei sahannut, koska three.js:n
 * `Raycaster.setFromCamera` ottaa MYÖS origon matriisista: lukema oli
 * yhden kehyksen vanha mutta itsensä kanssa yhtenäinen.
 *
 * Korjaus: säde rakennetaan pelkästä kameran paikasta (`position`) ja
 * linssistä samalla kaavalla kuin laattakerroksen näytteet
 * (laattakerroksenOsuma). Se on aina itsensä kanssa yhtenäinen, koska
 * OrbitControlsin tähtäyspiste on kirjaston pakottamana pallon
 * keskipiste eikä kameralla ole kallistusta. Mitattu korjauksen
 * jälkeen: sama 10°:n siirto luetaan 10,000°, ja samat kahdeksan
 * askelta ovat 0,1941…0,1947° — sahaus 1,003× (oli 1,54×).
 *
 * @param {object} kamera kirjaston kamera (position ja fov)
 * @param {number} x ruudun x css-pikseleinä kotelon vasemmasta reunasta
 * @param {number} y ruudun y css-pikseleinä kotelon yläreunasta
 * @param {number} W kotelon leveys css-pikseleinä
 * @param {number} H kotelon korkeus css-pikseleinä
 * @param {number} R pallon säde (getGlobeRadius)
 */
export function pinnanPiste(kamera, x, y, W, H, R) {
  const o = kamera?.position;
  if (!o || !(W > 0) || !(H > 0) || !(R > 0)) return null;
  const pituus = Math.hypot(o.x, o.y, o.z);
  if (!(pituus > R)) return null;
  const pov = {
    lat: Math.asin(Math.max(-1, Math.min(1, o.y / pituus))) / RAD,
    lng: Math.atan2(o.x, o.z) / RAD,
    altitude: pituus / R - 1,
  };
  const fov = Number.isFinite(kamera.fov) && kamera.fov > 0 ? kamera.fov : 50;
  return laattakerroksenOsuma(pov, (2 * x) / W - 1, 1 - (2 * y) / H,
    { fov, kuvasuhde: W / H, sade: R });
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

/*
 * KARTTA-ALA ON ARKIN KARTTA, EI KOKO ARKKI (vika 11.9.2026, omistaja
 * sanatarkasti: *"Maapallon ylä- ja alaosan voisi piirtää
 * oikeanlaiseksi. Siinä näkyy vielä se vanhan kartan teksti."*).
 *
 * MITATTU SYY. Pyramidin `rajaus` ulottuu arkin ALAKEHYKSEN yli: sen
 * alareuna on 66,0° S, mutta kartta loppuu jo 61,47° S:ään ja väliin jää
 * julisteen alamarginaali — kaksoisviivakehys, kompassiruusu ja rivit
 * "Painettu Matkakirjan kustantamossa MDCCCLXXIII" / "© Matkakirja".
 * Poltetut pallolaatat osaavat tämän (tools/tee-pallolaatat.mjs
 * julisteenLeveysvali vähentää `kehys.ala`:n ja täyttää alapuolen
 * merellä ja jäällä), mutta lepo- ja laattakerros rajasivat pelkkään
 * `rajaus`-laatikkoon ja piirsivät marginaalin pallon pinnalle: 900 ×
 * 900 px:n napanäkymässä kompassiruusu ja painajanrivi näkyivät
 * Etelämantereen ympärillä (mitattu Chromium-kaappauksella 11.9.2026,
 * ja SAMA näkymä ilman kerrosta ?laattakerros=0 oli puhdas).
 *
 * Pohjoisessa vähennystä ei tehdä: siellä kartta ulottuu rajauksen
 * yläreunaan (84° N, Huippuvuoret ja Frans Joosefin maa) — sama
 * päättely kuin polttotyökalussa. Pohjoisrajan tekee napakansi
 * (naparaja 83,7°), ei arkki.
 *
 * TÄMÄ RAJA KOSKEE MYÖS JOKAISTA YKSITTÄISTÄ LAATTAA (12.9.2026):
 * pelkkä valinta-alueen rajaus jätti arkin marginaalin laatan OMAAN
 * verkkoon, ja kartussi päätyi pohjoisnavalle — ks. laatanPalloAlue.
 *
 * @param {object} p.pyramidi  pyramidi.json (rajaus/arkki, kehys)
 * @param {function} p.yLat    arkin y (lautayksikköä) → leveysaste
 * @param {number} p.naparaja  napakansien leveysaste (NAPAKANNEN_LEVEYS)
 * @returns {{ latMin: number, latMax: number }}
 */
export function pyramidinKarttaAla({ pyramidi, yLat, naparaja = 90 }) {
  const rajaus = pyramidi?.rajaus ?? pyramidi?.arkki ?? { y: 0, h: 0 };
  const alakehys = Number(pyramidi?.kehys?.ala) || 0;
  const latMax = Math.min(naparaja, yLat(rajaus.y));
  const latMin = Math.max(-naparaja, yLat(rajaus.y + rajaus.h - alakehys));
  return { latMin, latMax };
}

/*
 * LAATAN OMA SUORAKAIDE PALLOLLA — RAJATTUNA KARTTA-ALAAN (vika
 * 12.9.2026, omistaja sanatarkasti: *"Pohjoisnapa kaukaa edelleen
 * väärin"*; kuvakaappauksessa navan päällä on julisteen KARTUSSI, se
 * pyöreä vaalea leima, jossa lukee MATKAKIRJA).
 *
 * MITATTU SYY. `pyramidinKarttaAla` rajasi vain sen laatikon, jolta
 * laatat VALITAAN — laatan oma verkko rakennettiin laatan koko
 * pikselisuorakaiteesta. Pyramidin ylin laattarivi on ARKKIA eikä
 * karttaa: arkin yläreuna on 88,65° N (laudaltaAsteiksi arkki.y:stä),
 * kartan yläreuna 84,0° N ja napakansi alkaa 83,7°:sta. Väliin jää
 * julisteen ylämarginaali, jossa on kartussi (MATKAKIRJA / Unohdettu
 * aarre, tools/fokuskartta/maailmapiirto.js osio 9) — ja se piirtyi
 * pallolle 84°–88,65° N:n kiekkona, jonka keskellä on reikä.
 *
 * MITTAUS (Chromium 390 × 844, 12.9.2026, kaikki viisi kamerakorkeutta
 * 0,3 / 0,6 / 1,0 / 1,6 / 2,5): rivin 0 laattojen verkon ylin
 * leveysaste oli JOKA korkeudella 88,65° eli 4,95° napakannen reunan
 * yli. Etelässä sama vuoto oli −65,43°, vaikka karttaAla rajaa
 * −61,47°:een (alakehys). Kalotti (js/pallo.js NAPAKALOTIT) peitti
 * vuodon lähikuvassa, mutta EI KAUKAA: laatan materiaalissa on
 * polygonOffsetUnits −8, ja se on ikkunasyvyyttä — mitä kauempana
 * kamera on, sitä enemmän maailmayksikköjä sama askel tarkoittaa.
 * Kaukana se ylittää kalotin korotuksen (säde × 0,0025) ja laatta
 * piirtyy kalotin päälle. Siksi vika näkyi vain kaukaa.
 *
 * KORJAUS ON SISÄLLÖSSÄ EIKÄ JÄRJESTYKSESSÄ: arkin kalusteita ei
 * piirretä pallolle lainkaan, millään tasolla eikä miltään
 * etäisyydeltä. Laatan verkko leikataan karttaAlaan; jos laatasta ei
 * jää karttaa lainkaan, verkkoa ei synny (lat1 ≤ lat0).
 *
 * @param {object} p.taso     pyramidin taso { z, leveys, korkeus, ... }
 * @param {number} p.laatta   laatan sivu pikseleinä
 * @param {function} p.lonPx  laatan pikselisarake → pituusaste
 * @param {function} p.latPx  laatan pikselirivi → leveysaste
 * @param {object} p.karttaAla { latMin, latMax } (pyramidinKarttaAla)
 */
export function laatanPalloAlue({ taso, sarake, rivi, laatta, lonPx, latPx, karttaAla }) {
  const x0 = sarake * laatta;
  const y0 = rivi * laatta;
  const w = Math.min(laatta, taso.leveys - x0);
  const h = Math.min(laatta, taso.korkeus - y0);
  const latMax = Number.isFinite(karttaAla?.latMax) ? karttaAla.latMax : 90;
  const latMin = Number.isFinite(karttaAla?.latMin) ? karttaAla.latMin : -90;
  return {
    lon0: lonPx(x0),
    lon1: lonPx(x0 + w),
    lat1: Math.min(latMax, latPx(y0)),
    lat0: Math.max(latMin, latPx(y0 + h)),
  };
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
export function lepokerroksenKerrokset(pallonLuettelo, pyramidi, variMaa = null) {
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
  /*
   * VÄRITASO EI SAA SAMMUTTAA KERROSTA (erä 1b, suunnitelman riski 4.2).
   *
   * Muut portit ovat KOKO KERROKSEN ehtoja: jos pallon sarja ja
   * pyramidi ovat eri versiota, laattoja ei saa piirtää lainkaan, koska
   * sama merkki olisi levossa laatassa ja liikkeessä elävänä. Väritaso
   * on eri laji: se on YHDEN MAAN lisäys pohjan päälle, eikä sen
   * puuttuminen tee kartasta väärää — se tekee siitä seepiaa, eli
   * täsmälleen sen kartan, joka peli oli ennen tätä erää. Siksi tämä
   * on BOOLEAN eikä `return null`: puuttuva tai eri versiossa oleva
   * värilaatasto pudottaa värit, ei karttaa.
   *
   * PORTTI ON MAAKOHTAINEN, koska laatastokin on: taulusta luetaan
   * pelaajan maan kirjaus, ja ilman sitä (muu maa, vanha luettelo,
   * ajamaton maa) väri on pois.
   */
  const variKirjaus = variMaa ? (pyramidi.varitasot?.[variMaa] ?? null) : null;
  const vari = Boolean(variKirjaus?.versio && variKirjaus.tasot?.length);
  /*
   * ══════════════════════════════════════════════════════════════
   * VIIVATASO EI TULE PALLOLLE — REITTIVIUHKA OLI POLTETTU LAATTAAN
   * ══════════════════════════════════════════════════════════════
   *
   * Raamattu KARTTAUUDISTUKSEN PAATOKSET 9 kohta 6 (omistaja
   * 14.9.2026, sanatarkasti): *"lisaksi reittiviuhka nakyy edelleen
   * vaikka ei olla liikkumistilassa. korjaa se myos."* Ja lähtötilaus
   * (PAATOKSET 8): *"onko kaupunkien valiset siirtymalinjat ja
   * merireitit omalla tasollaan? jos on niin ne voi ottaa pois
   * nakyvista ja palauttaa vasta kun pelaaja painaa liiku nappia."*
   *
   * MITATTU JUURISYY (Chromium 14.9.2026, Pariisi, ks. raportti
   * docs/raportit/viesti-fable-reittiviuhka-20260914.md): v1865 vei
   * viuhkan pois ELÄVÄSTÄ kerroksesta (js/ui.js matkareittienValinta →
   * js/pallolauta/reitit.js), ja se kerros mittaa nollaa kaupungissa
   * seistessä. Ruudulla viuhka näkyi silti, koska REITTIVERKKO ON
   * POLTETTU VIIVATASON LAATTOIHIN (tools/generoi-laattapyramidi.mjs
   * VIIVATASO, osoite .../viivat/z<taso>/…) ja pallo latoo ne joka
   * laatan kankaalle. Kokeessa `/viivat/`-laattojen esto poisti
   * TÄSMÄLLEEN ne neljä katkoviivaa askelhelmineen, jotka omistaja
   * näki — eikä mitään muuta tarpeellista.
   *
   * MIKSI KERROKSEN SAA JÄTTÄÄ POIS KOKONAAN. Viivatasolla on kolme
   * asiaa: reitit, erikoispiirit ja maiden rajat. Piirit on poltettu
   * pois jo 1.9.2026 (luettelon `viivataso.piirit` on epätosi), ja
   * RAJAT PALLO PIIRTÄÄ ITSE VEKTORINA (js/pallovektorit.js
   * VEKTORIT_RAJA_LEVEYS_CSS) — poltettu raja oli vektorin alla
   * kaksinkertaisena musteena. Jäljelle jää siis vain reittiverkko, ja
   * juuri se on se, minkä omistaja käski ottaa pois. Sama ratkaisu kuin
   * RANTATASOLLA yllä: kun pallolla on sama viiva vektorina, poltettua
   * ei ladata.
   *
   * MATKAN AIKANA VIUHKA TULEE ELÄVÄSTÄ KERROKSESTA — se on ainoa
   * lähde, ja siksi PAATOKSET 8:n matkasessio (js/ui.js
   * matkaSessioKesken) ratkaisee nyt yksin sen, mitä ruudulla on.
   *
   * TASOKARTTA ENNALLAAN: se latoo viivatason kuten ennenkin
   * (js/laattapyramidi.js pyramidiViivaKerros) — siellä rajat eivät ole
   * vektorina. Tämä portti on pallon oma.
   */
  return {
    pohja: true, ranta: Boolean(ranta), viiva: false, nosto: Boolean(nostot), vari,
  };
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
/*
 * MERET NÄKYVIIN ON KOKEILU KYTKIMEN TAKANA (`?meretNakyviin=1`).
 *
 * Omistaja 18.9.2026 (PAATOKSET 37 kohta 2): *"Ainakin haluaisin
 * kokeilla ja nahda sen"*. Maamaski maksaa yhden pikselipassin laattaa
 * kohti (ks. maalaaKermaMaamaskilla), ja sen rannikkolaatu on
 * nähtävä ruudulla ennen kuin siitä tulee oletus — siksi tämä on
 * lippu eikä vaihdos. Oletus on POIS, kunnes omistaja on nähnyt
 * kuvaparin; kytkimen poistaminen on yhden rivin muutos tähän.
 *
 * LIPPU LUETAAN KERRAN MODUULIN LATAUTUESSA: laattoja rakennetaan
 * sadoittain, eikä jokainen niistä saa jäsentää osoiteriviä uudestaan.
 */
export const MERET_NAKYVIIN = (() => {
  try {
    const arvo = new URLSearchParams(globalThis.location?.search ?? '').get('meretNakyviin');
    return arvo !== null && !/^(0|ei|off)$/.test(arvo);
  }
  catch { return false; }
})();
/*
 * NOPEA EDESTAKAINEN PANOROINTI (omistajan palaute v1649, iPad,
 * sanatarkasti): *"Ainoastaan jos todella nopeasti panoroi edestakaisin
 * päästämättä sormea irti niin kartta putoaa joiltain osin hetkeksi
 * matalaan laatuun vaikka ko. osa on jo ladattu ja ruudunpäivitys on
 * hyvä."*
 *
 * JUURISYY (mitattu tools/savukkeet/mittaa-pallon-liike.mjs
 * --vaihe=heiluri, puhelin 390 × 844 dpr 3, 4×, 6.9.2026): näkyvä alue
 * lasketaan VAIN nykyisestä pov:sta, ja latausjono kootaan joka
 * päivityksellä pelkistä näkyvistä laatoista. Heilurin ääripäässä
 * reunan laatta on näkyvissä yhden päivityksen ajan (100 ms), ehtii
 * jonoon muttei latauspaikkaan (RINNAKKAIN 6) — ja seuraavalla
 * päivityksellä se putoaa jonosta kokonaan. Mitattu: levossa 28
 * näkyvästä laatasta 28 scenessä, heilurin alkaessa näkyviä 35 ja
 * scenessä 31; ne neljä olivat olleet tietueina muistissa koko ajan
 * tilassa "ladataan" ilman että lataus oli koskaan alkanut.
 *
 * KOLME KORJAUSTA (vakiot alla):
 *  1. ENNAKKOALUE liikesuuntaan: alue laajennetaan sillä matkalla, jonka
 *     kamera kulki edellisestä päivityksestä, kerrottuna
 *     LIIKEVARA_KERROIN:lla ja MOLEMPIIN suuntiin (heiluri kääntyy).
 *     Ennakon laatat ladataan ja pidetään, mutta ne EIVÄT osallistu
 *     tason valintaan (LAATTAKATTO_NAKYVA) — tason on pysyttävä
 *     terävänä, vaikka jono kasvaa.
 *  2. PITO: laatta, joka on ollut näkyvissä tai ennakossa viimeisen
 *     PITO_MS:n aikana, ei putoa jonosta, sen hakua ei katkaista eikä
 *     LRU:n MÄÄRÄkatto pura sitä. Tavukatto (LAATTAKATTO_TAVUT) purkaa
 *     yhä myös pidettyjä — muisti on kova raja.
 *  3. Valmis laatta lisätään sceneen aina, kun se on yhä alueella
 *     (näkyvä tai pidetty), ei vain jos se sattui olemaan näkyvissä
 *     sillä kehyksellä, jolla tekstuuri vietiin näytönohjaimelle.
 */
/** Laatta pidetään (jono, LRU:n määräkatto) näin kauan viimeisestä näöstä. */
export const LAATTAKERROS_PITO_MS = 2000;
/** Ennakkoalue = näkyvä alue + tämä kertaa edellisen päivityksen matka. */
export const LAATTAKERROS_LIIKEVARA_KERROIN = 2;
/**
 * …tai laajemmalti: se laatikko, jonka kamera on PYYHKINYT viimeisen
 * PITO_MS:n aikana. Yhden päivitysvälin matka ei riitä, kun heiluri
 * kääntyy: käännöksen kohdalla matka on nolla, vaikka ruutu on juuri
 * ollut 20 % leveydestä sivummalla. Pyyhitty laatikko muistaa sen.
 */
export const LAATTAKERROS_LIIKEVARA_PYYHKAISY = true;
/** Ennakkoalueen laattoja enintään (fling ei saa tilata satoja). */
export const LAATTAKERROS_LAATTAKATTO_ENNAKKO = 96;
/** Näkyviä laattoja enintään: tätä isompi määrä pudottaa tason karkeammaksi. */
export const LAATTAKERROS_LAATTAKATTO_NAKYVA = 48;
/** Valmiita mutta näkymättömiä laattoja muistissa enintään (LRU). */
export const LAATTAKERROS_LAATTAKATTO_MUISTI = 24;
/** Tekstuurimuistin kiintiö: LRU purkaa, kunnes alitetaan (96 Mt). */
export const LAATTAKERROS_LAATTAKATTO_TAVUT = 96 * 1048576;
/** Rinnakkaisia laattalatauksia enintään. */
export const LAATTAKERROS_RINNAKKAIN = 6;
/*
 * TEKSTUUREJA YKSI KEHYSTÄ KOHTI, EI KAHTA (mitattu 7.9.2026,
 * savuke-pallo-kehystahti). Yksi `renderer.initTexture` maksoi
 * mittausympäristössä 3,0 ms (p50) ja 6,7 ms (max) — kaksi peräkkäin
 * samassa kehyksessä on siis pahimmillaan 13 ms 16,7 ms:n budjetista,
 * ja se yksin pudottaa kehyksen. Yksi vienti kehystä kohti on 60 Hz:n
 * ruudulla yhä 60 laattaa sekunnissa, eli enemmän kuin
 * LAATTAKERROS_RINNAKKAIN (6) ehtii ladata: jono ei kasva tästä.
 */
export const LAATTAKERROS_TEKSTUUREJA_PER_KEHYS = 1;
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
 * Tasoituksen kerma-peite laatan kankaalle: suojatun suorakaiteen
 * ULKOPUOLI maalataan käsin, sisäpuoli jätetään laatalle.
 *
 * MIKSI MAALAUS ON LAATAN ALLA EIKÄ PÄÄLLÄ. Kerma on peite, ei väri:
 * tulos on `0,15 · pohja + 0,85 · kerma`. Jos maalaus tulisi laatan
 * PÄÄLLE, laataston oma kerma jäisi alle ja peitto kertautuisi
 * (1 − 0,15² = 0,977) juuri siinä marginaalissa, jossa laatassa on jo
 * täysi kerma — eli uusi porras samaan paikkaan, josta vanha
 * poistettiin. Siksi laatta piirretään VAIN suojan sisään ja maalaus
 * vain sen ulkopuolelle: jokainen pikseli saa peiton täsmälleen kerran.
 *
 * REUNAT PYÖRISTETÄÄN KOKONAISIIN PIKSELEIHIN ja samat luvut annetaan
 * sekä maalaukselle että laatan leikkaukselle. Murto-osapikseli jättäisi
 * väliin raon, jossa pohjan seepia näkyisi peittämättä — yhden pikselin
 * terävä viiva on sekin terävä viiva.
 *
 * @param {object} p.tasoitus  pyramidinTasoitus(): { kerma, peitto, suoja }
 * @param {object} p.kuva      laataston kuva tai null (laattaa ei ole)
 * @returns {boolean} maalattiinko kermaa
 */
/**
 * Onko laatta KOKONAAN tasoituksen suojatun suorakaiteen ulkopuolella?
 *
 * VÄREILYN JUURISYY (mitattu 14.9.2026, iPad 1180 × 820 dpr 2, Ihmisen
 * matka Etiopiassa, kuvapari docs/raportit/kuvat/linssilaatat-*.jpg).
 * Tällaisessa laatassa EI OLE YHTÄÄN karttatietoa: `maalaaTasoitus`
 * maalaa sen kokonaan kermaan (`fillRect(0, 0, W, H)`), koska laataston
 * oma kuva piirretään vain suojan sisään. Kohdemaan laatasto kattaa
 * silti koko tason, joten linssin kertomuskamera lensi Afrikassa
 * seudulle, jossa jokainen värilaatta on TYHJÄ VAALEA ARKKI — ne
 * haettiin, häivytettiin seepiapohjan päälle ja purettiin taas.
 * Ruudulla se on juuri se, minkä omistaja näki: *"valilla kartan
 * pienta vareilee meinaten pudottaa topografian"*.
 *
 * Luvut ovat samat kuin `maalaaTasoitus`:ssa, samalla pyöristyksellä,
 * jottei kaksi laskentaa voi olla eri mieltä laatan reunalla.
 *
 * @returns {boolean} true, jos suojasta ei leikkaudu laatalle mitään
 */
export function tasoituksenUlkopuolella({
  tasoitus, kartta, ppu, arkki,
}) {
  if (!tasoitus?.suoja || !arkki || !(ppu > 0)) return false;
  if (!(kartta?.leveys > 0) || !(kartta.korkeus > 0)) return false;
  const W = kartta.leveys;
  const H = kartta.korkeus;
  const s = tasoitus.suoja;
  const raja = (a, b, c) => Math.max(a, Math.min(b, c));
  const x0 = raja(0, W, Math.round((s.x - arkki.x) * ppu - kartta.kansX0));
  const y0 = raja(0, H, Math.round((s.y - arkki.y) * ppu - kartta.kansY0));
  const x1 = raja(x0, W, Math.round((s.x + s.w - arkki.x) * ppu - kartta.kansX0));
  const y1 = raja(y0, H, Math.round((s.y + s.h - arkki.y) * ppu - kartta.kansY0));
  return !(x1 > x0) || !(y1 > y0);
}

/**
 * MAAILMANÄKYMÄN VÄRILAATTA: kuva vain kohdemaan renkaiden sisään,
 * kermaa ei lainkaan (Raamattu: KARTTAUUDISTUKSEN PAATOKSET 23).
 *
 * Laatan kankaalle on tässä vaiheessa jo piirretty pohjalaatta, eli
 * koko maailman topografia varjostuksineen. Värilaatan kuva leikataan
 * kohdemaan renkaisiin (`tasoitus.renkaat`, js/laattapyramidi.js) ja
 * piirretään niiden sisään sellaisenaan: kohdemaassa pikseli on sama
 * kuin kerman kanssa, sen ulkopuolella jää näkyviin pohja, eikä laatan
 * kankaaseen poltettu kerma (polttaVariLeikkuri) päädy ruudulle
 * ollenkaan.
 *
 * KOKONAAN RENKAIDEN ULKOPUOLINEN LAATTA EI PIIRRÄ MITÄÄN eikä avaa
 * leikkuria: se on valtaosa laatoista, ja jokainen niistä olisi muuten
 * turha `clip` + `drawImage` koko kankaan yli.
 *
 * SAUMAN MONISTUSTA EI TEHDÄ: värilaatasto on aina kohdemaan laatikon
 * alalla, eikä yhdenkään kohdemaan laatikko ylitä päivämääränrajaa.
 *
 * @returns {boolean} piirrettiinkö kuvaa
 */
export function maalaaMaailmanVari(ctx, {
  tasoitus, kartta, ppu, arkki, kuva = null,
}) {
  if (!ctx || !kuva || !arkki || !(ppu > 0)) return false;
  const renkaat = tasoitus?.renkaat;
  if (!renkaat?.length) return false;
  if (!(kartta?.leveys > 0) || !(kartta.korkeus > 0)) return false;
  const W = kartta.leveys;
  const H = kartta.korkeus;
  const kx = (bx) => (bx - arkki.x) * ppu - kartta.kansX0;
  const ky = (by) => (by - arkki.y) * ppu - kartta.kansY0;
  let osui = false;
  ctx.save();
  ctx.beginPath();
  for (const rengas of renkaat) {
    if (!rengas || rengas.length < 3) continue;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const piste of rengas) {
      const x = kx(piste[0]);
      const y = ky(piste[1]);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    if (maxX < 0 || minX > W || maxY < 0 || minY > H) continue;
    osui = true;
    for (let i = 0; i < rengas.length; i += 1) {
      const x = kx(rengas[i][0]);
      const y = ky(rengas[i][1]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }
  if (!osui) { ctx.restore(); return false; }
  ctx.clip();
  ctx.drawImage(kuva, 0, 0, W, H);
  ctx.restore();
  return true;
}

/*
 * ══════════════════════════════════════════════════════════════════
 * MAAMASKI PIKSELISTÄ: MERET JÄÄVÄT ALKUPERÄISIKSI
 * (omistaja 18.9.2026, Raamattu KARTTAUUDISTUKSEN PAATOKSET 37 kohta 2)
 * ══════════════════════════════════════════════════════════════════
 *
 * Sanatarkasti: *"meret saisi olla silla Alkuperaisella
 * korkeuserokartalla ja varilla … vain maiden kartoista otettaisiin
 * korkeuserot pois nakyvista mutta ei merista seka kohdemaasta."*
 *
 * MASKI LUETAAN POHJALAATAN PIKSELISTÄ, EI AINEISTOSTA. Merimaski on
 * generaattorin rakennusaikainen tieto (tools/generoi-laattapyramidi.mjs
 * merenAlalla): pelillä ei ole sitä, eikä sitä saa hakea kesken
 * panoroinnin — se olisi juuri se odotus, jonka kohta 1 kieltää.
 * Pohjalaatta on kuitenkin jo kankaalla, ja SIINÄ maa ja meri ovat eri
 * sävyjä samasta moottorista, joten maski on luettavissa pikselistä.
 *
 * EROTIN ON PUNAISEN JA SINISEN ERO (R − B), EI KIRKKAUS. Kirkkaus ei
 * erota matalaa merta alangosta — molemmat ovat vaaleaa paperia.
 * Sävykylläisyys erottaa: tools/fokuskartta/piirto.js ASTEIKKO on
 * lämmin seepia (R − B on merenpinnan tasolla 48, 500 m:ssä 80,
 * 1400 m:ssä 98), kun taas SYVYYS on *"viileää paperia"* (R − B
 * ankkureissa 32 → 10) ja se sekoitetaan paperiin puolella peitolla
 * (maailmapiirto.js MEREN_PEITTO 0,5), jolloin meren R − B on
 * 38 (ranta) … 27 (syvin valtameri).
 *
 * MAASTON RAE EI HÄIRITSE. Maapikselin kohina (`pigmentti`, `lai`)
 * lisätään maailmapiirto.js:ssä KAIKKIIN KOLMEEN KANAVAAN samana
 * lukuna, joten se katoaa erotuksesta kokonaan. Varjostus taas
 * KASVATTAA eroa (sininen vaimennetaan erikseen kertoimella
 * 1 − varjo · 0,3), joten vuoren varjopuoli ei luiskahda mereksi.
 *
 * RAJA ON PEHMEÄ, EI KYNNYS. Kova kynnys piirtäisi rannikolle
 * sahalaidan juuri siihen paikkaan, jossa webp:n väripakkaus on
 * sumeimmillaan. Siksi kerman peitto on `smoothstep` välillä
 * MERI_ERO … MAA_ERO: syvä meri jää koskematta, sisämaa saa täyden
 * peiton, ja ranta liukuu näiden välillä laatan omalla sumeudella.
 */
const TASOITUS_MERI_ERO = 36;
const TASOITUS_MAA_ERO = 52;

/**
 * Kerma laatan kankaalle suojan ULKOPUOLELLE niin, että meri jää
 * pohjan omaan syvyysväriin. Yksi pikselipassi laattaa kohti.
 *
 * @returns {boolean} maalattiinko
 */
function maalaaKermaMaamaskilla(ctx, {
  W, H, x0, y0, x1, y1, kerma, peitto,
}) {
  let data = null;
  try { data = ctx.getImageData(0, 0, W, H); } catch { return false; }
  const d = data.data;
  const [kr, kg, kb] = kerma;
  const vali = TASOITUS_MAA_ERO - TASOITUS_MERI_ERO;
  const suoja = x1 > x0 && y1 > y0;
  for (let y = 0; y < H; y += 1) {
    const rivilla = suoja && y >= y0 && y < y1;
    for (let x = 0; x < W; x += 1) {
      if (rivilla && x >= x0 && x < x1) { x = x1 - 1; continue; }
      const i = (y * W + x) * 4;
      const ero = d[i] - d[i + 2];
      if (ero <= TASOITUS_MERI_ERO) continue;
      let t = ero >= TASOITUS_MAA_ERO ? 1 : (ero - TASOITUS_MERI_ERO) / vali;
      t = t * t * (3 - 2 * t);
      const a = peitto * t;
      d[i] += (kr - d[i]) * a;
      d[i + 1] += (kg - d[i + 1]) * a;
      d[i + 2] += (kb - d[i + 2]) * a;
    }
  }
  ctx.putImageData(data, 0, 0);
  return true;
}

export function maalaaTasoitus(ctx, {
  tasoitus, kartta, ppu, arkki, kuva = null, maamaski = false,
}) {
  if (!ctx || !tasoitus?.suoja || !arkki || !(ppu > 0)) return false;
  if (!(kartta?.leveys > 0) || !(kartta.korkeus > 0)) return false;
  const W = kartta.leveys;
  const H = kartta.korkeus;
  const s = tasoitus.suoja;
  const raja = (a, b, c) => Math.max(a, Math.min(b, c));
  const x0 = raja(0, W, Math.round((s.x - arkki.x) * ppu - kartta.kansX0));
  const y0 = raja(0, H, Math.round((s.y - arkki.y) * ppu - kartta.kansY0));
  const x1 = raja(x0, W, Math.round((s.x + s.w - arkki.x) * ppu - kartta.kansX0));
  const y1 = raja(y0, H, Math.round((s.y + s.h - arkki.y) * ppu - kartta.kansY0));
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(tasoitus.kerma.slice(i, i + 2), 16));
  if (maamaski) {
    maalaaKermaMaamaskilla(ctx, {
      W, H, x0, y0, x1, y1, kerma: [r, g, b], peitto: tasoitus.peitto,
    });
    if (!(x1 > x0) || !(y1 > y0)) return true;
  }
  else {
    ctx.fillStyle = `rgba(${r},${g},${b},${tasoitus.peitto})`;
    if (!(x1 > x0) || !(y1 > y0)) { ctx.fillRect(0, 0, W, H); return true; }
    if (y0 > 0) ctx.fillRect(0, 0, W, y0);
    if (y1 < H) ctx.fillRect(0, y1, W, H - y1);
    if (x0 > 0) ctx.fillRect(0, y0, x0, y1 - y0);
    if (x1 < W) ctx.fillRect(x1, y0, W - x1, y1 - y0);
  }
  if (kuva) {
    // Laatan kuva venytetään kankaalle (reunalaatta on vajaa), joten
    // lähdesuorakaide on sama osuus kuvasta kuin kohde kankaasta.
    const sx = (x0 / W) * kuva.width;
    const sy = (y0 / H) * kuva.height;
    const sw = ((x1 - x0) / W) * kuva.width;
    const sh = ((y1 - y0) / H) * kuva.height;
    if (sw > 0 && sh > 0) ctx.drawImage(kuva, sx, sy, sw, sh, x0, y0, x1 - x0, y1 - y0);
  }
  return true;
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
 * LRU: mitkä tietueet puretaan? Näkyviä ei pureta koskaan.
 *
 * PIDETTYJÄ (`pito`, ks. LAATTAKERROS_PITO_MS) ei pura MÄÄRÄkatto: juuri
 * nähty laatta on se, johon heiluri palaa sadassa millisekunnissa, ja
 * sen purku maksaisi uuden haun, dekoodauksen ja tekstuurin viennin.
 * TAVUKATTO purkaa yhä myös pidetyt — muisti on kova raja (omistajan
 * palaute v1649 ja suunnitelman luku 4.4).
 *
 * @param {Array} tietueet  [{ avain, nakyva, pito, kaytetty, tavut }]
 * @returns {string[]} purettavien avaimet purkujärjestyksessä
 */
export function laattakerroksenLRU(tietueet, katto = LAATTAKERROS_LAATTAKATTO_MUISTI,
  tavukatto = LAATTAKERROS_LAATTAKATTO_TAVUT) {
  const kaikki = [...(tietueet ?? [])].filter(Boolean);
  const ehdokkaat = kaikki.filter((t) => !t.nakyva).sort((a, b) => (a.kaytetty ?? 0) - (b.kaytetty ?? 0));
  const vapaat = ehdokkaat.filter((t) => !t.pito);
  const ulos = [];
  const purettu = new Set();
  const yli = Math.max(0, vapaat.length - Math.max(0, katto));
  for (let i = 0; i < yli; i += 1) { ulos.push(vapaat[i].avain); purettu.add(vapaat[i].avain); }
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
    /*
     * NÄKYVÄN ALUEEN PEITTO (heilurimittaus, savuke --vaihe=heiluri).
     * `nakyvia` on näkyvän alueen laattojen määrä, `nakyviaScenessa`
     * niistä ne, jotka ovat scenessä (peittävät pohjan Z5:n), ja
     * `nakyviaTaysin` ne, joiden häive on jo perillä. Osuus
     * nakyviaScenessa / nakyvia on se luku, jonka on pysyttävä 100 %:ssa,
     * kun jo ladattua aluetta panoroidaan edestakaisin.
     */
    nakyvia: 0, nakyviaScenessa: 0, nakyviaTaysin: 0, ladattavia: 0, ennakkoja: 0, pidettyja: 0,
    /*
     * JUMISSA on tämän erän tarkin mitta: tietue, joka on tilassa
     * "ladataan", jota ei ole aloitettu eikä ole jonossa — laatta,
     * jonka kerros on unohtanut. Juuri niitä heilurin ääripäähän jäi
     * ennen v1649:n korjausta (mitattu 4 kpl 35:stä), ja pohjan Z5
     * näkyi niiden kohdalla joka käännöksellä. Mitta ei riipu verkon
     * viiveestä eikä kehysajasta, joten se kelpaa vartioksi myös
     * hitaassa mittausympäristössä.
     */
    jumissa: 0,
    /** Haettiinko pyramidi.json tästä (savukkeet laskevat sen kerroksen pyynnöksi). */
    luettelo: false,
    /** Lepokerroksen kenttä; kerros ei kokoa yhtä kangasta (savukkeiden tuloste). */
    kangas: null,
    /*
     * LAATAN VALMISTELU (kangas, drawImage, verkko, materiaali) on
     * pääsäikeen työtä, joka osuu satunnaiseen kehykseen — se ei näy
     * missään kehyskoukussa, joten se mitataan tässä
     * (savuke-pallo-kehystahti lukee nämä).
     */
    valmisteluMs: 0, valmisteluja: 0, valmisteluMax: 0,
    /*
     * VÄRITASO (erä 1b): `variMaa` on se maa, jonka värilaatasto on
     * juuri nyt käytössä (null = ei väriä), ja `varillisia` niiden
     * laattojen määrä, joihin värikerros haettiin. Nimet ovat erän 1
     * omat (js/laattapyramidi.js mittarit), jotta savukkeet lukevat
     * molemmilta laudoilta samaa kenttää.
     */
    variMaa: null, varillisia: 0, varimitatointeja: 0,
    /*
     * KERTOMUSLUKKO (ks. KERTOMUSLUKKO alla): naulattu taso (z) tai
     * null. Savukkeen ainoa tapa nähdä, onko lukko päällä ja mihin
     * tasoon se osui.
     */
    kertomustaso: null,
    /*
     * Laattoja, jotka koottiin ILMAN kerman maalausta, koska suojasta ei
     * leikkaudu niille mitään (ks. tasoituksenUlkopuolella). Savukkeen
     * mitta siitä, että lukko todella jättää tyhjät arkit pois.
     */
    kermattomia: 0,
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
  /*
   * VÄRITASON MAA EDELLISELTÄ PÄIVITYKSELTÄ. Laatan avain
   * (`z/sarake/rivi`) ei sisällä maata eikä laatan osoitteen versiota,
   * joten maanvaihto EI mitätöi laattoja itsestään: Ranskan värillinen
   * laatta jäisi kankaalle, kun pelaaja siirtyy Belgiaan. Purku on
   * olemassa (LRU ja `pura`), sen laukaisu ei — se on tässä.
   */
  let variMaaEdellinen = null;
  /*
   * TASOITUKSEN SUOJA TARKENTUU KESKEN AJON. Maapolygonit ovat laiskat,
   * ja ennen niitä suoja on koko laatikko (js/laattapyramidi.js
   * pyramidinTasoitus). Kun tarkka suoja saapuu, jo kootut kankaat on
   * maalattu väärällä rajalla — sama laji kuin maanvaihto, joten sama
   * mitätöinti.
   */
  let tasoitusAvainEdellinen = '';
  let sukupolvi = 0;
  let viimePaivitys = -Infinity;
  /**
   * Kameran paikat viimeisen LAATTAKERROS_PITO_MS:n ajalta: liikevara on
   * sekä seuraavan päivitysvälin ennuste (viimeisin ero × kerroin) että
   * se laatikko, jonka kamera on jo pyyhkinyt (heilurin ääripäät).
   */
  const povHistoria = [];
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
   *
   * BITTIKARTAN ASETUKSET (7.9.2026) ovat pääsäikeen työtä pois:
   * `imageOrientation: 'none'` ohittaa EXIF-tarkistuksen (laatoissa ei
   * ole EXIFiä) ja `colorSpaceConversion: 'none'` värimuunnoksen —
   * laatat ovat jo sRGB:tä, ja sama väriavaruus luetaan kirjaston
   * omasta laattamateriaalista alla.
   *
   * `premultiplyAlpha` JÄTETÄÄN SELAIMEN OLETUKSEKSI: bittikartta
   * piirretään 2D-kankaalle, joka säilyttää pikselit esikerrottuina,
   * joten 'none' pakottaisi muunnoksen juuri drawImagen kohdalla.
   * Laatat ovat läpinäkymättömiä, joten valinta ei näy kuvassa —
   * vain työn paikassa.
   */
  const BITTIKARTTA_ASETUKSET = { imageOrientation: 'none', colorSpaceConversion: 'none' };
  const haeKuva = async (url, merkki = null) => {
    pyydetyt.add(url);
    mittarit.pyyntoja += 1;
    if (ikkuna.createImageBitmap && ikkuna.fetch) {
      try {
        const vastaus = await ikkuna.fetch(url, { mode: 'cors', credentials: 'omit', signal: merkki ?? undefined });
        if (!vastaus.ok) return null;
        const blob = await vastaus.blob();
        try {
          return await ikkuna.createImageBitmap(blob, BITTIKARTTA_ASETUKSET);
        } catch (syy) {
          // Katkaistu haku ei mene varapolulle (ks. alla); vanha selain,
          // joka ei tunne asetuksia, saa saman kuvan ilman niitä.
          if (merkki?.aborted) return null;
          void syy;
        }
        return await ikkuna.createImageBitmap(blob);
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
  /*
   * ALUEMUISTI (7.9.2026): laatan lat/lon-suorakaide ei muutu koskaan,
   * mutta `laatanAlue` ajettiin joka päivityksellä jokaiselle
   * ehdokkaalle KAHDESTI (näkyvien suodatus ja ennakon suodatus) — ja
   * jokainen kutsu varasi uuden olion. Sadan ehdokkaan näkymässä se on
   * 200 oliota 100 ms:n välein. Muisti on rajattu: kun se paisuu yli
   * katon, se tyhjennetään kokonaan (laatat ovat halpoja laskea
   * uudestaan, muistivuoto ei ole).
   */
  const aluemuisti = new Map();
  const ALUEMUISTIN_KATTO = 4096;
  /*
   * KARTTA-ALA KERRAN. Pyramidi haetaan kerran, joten arkin karttaraja
   * (pyramidinKarttaAla) on vakio — ja sitä tarvitsee sekä laattojen
   * valinta (suorita) että jokaisen laatan verkko (laatanPalloAlue).
   */
  let karttaAlaMuisti = null;
  const karttaAla = () => {
    if (!karttaAlaMuisti && pyramidi) {
      karttaAlaMuisti = pyramidinKarttaAla({ pyramidi, yLat, naparaja });
    }
    return karttaAlaMuisti ?? { latMin: -naparaja, latMax: naparaja };
  };
  const laatanAlue = (tasoOlio, sarake, rivi) => {
    const muistiavain = `${tasoOlio.z}/${sarake}/${rivi}`;
    const muistissa = aluemuisti.get(muistiavain);
    if (muistissa) return muistissa;
    const laskettu = laskeLaatanAlue(tasoOlio, sarake, rivi);
    if (aluemuisti.size >= ALUEMUISTIN_KATTO) aluemuisti.clear();
    aluemuisti.set(muistiavain, laskettu);
    return laskettu;
  };
  const laskeLaatanAlue = (tasoOlio, sarake, rivi) => {
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
    // Arkin marginaalit (kartussi, kehys, painajanrivi) pois: ks.
    // laatanPalloAlue.
    return laatanPalloAlue({
      taso: tasoOlio, sarake, rivi, laatta: koko, lonPx, latPx, karttaAla: karttaAla(),
    });
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
    /*
     * VÄRITASOLLA ON OMA PORTTI (`kerrokset.vari`). Ilman sitä väri
     * menisi suodattimen `: true`-haaraan — samaan, jossa pohja on —
     * ja kohdemaan laatat piirtyisivät myös silloin, kun pelaaja on
     * naapurissa tai kun laatastoa ei ole ajettu tälle maalle.
     */
    const kerrostasot = (pyramidinKerrostasot(t.z) ?? [])
      .filter((k) => {
        if (k.nosto) return kerrokset.nosto;
        if (k.viiva) return kerrokset.viiva;
        if (k.ranta) return kerrokset.ranta;
        if (k.vari) return kerrokset.vari;
        return true;
      });
    if (!kerrostasot.length) { t.tila = 'virhe'; return; }
    const katkaisin = ikkuna.AbortController ? new ikkuna.AbortController() : null;
    t.katkaisin = katkaisin;
    const kuvat = await Promise.all(kerrostasot.map((k) => (pyramidinLaattaOlemassa(k, t.sarake, t.rivi)
      ? haeKuva(pyramidinLaattaUrl(k, t.sarake, t.rivi), katkaisin?.signal ?? null) : null)));
    // Väritaso mittariin vasta haun jälkeen: harvasta laatastosta
    // puuttuva laatta ei ole värillinen laatta.
    t.varillinen = kerrostasot.some((k, i) => k.vari && kuvat[i]);
    t.katkaisin = null;
    if (purettu || !laatat.has(t.avain)) { for (const k of kuvat) k?.close?.(); return; }
    if (!kuvat.some(Boolean)) { t.tila = 'virhe'; return; }
    /*
     * KANGAS ON MITATUSTI NOPEAMPI TEKSTUURILÄHDE KUIN BITTIKARTTA
     * (kokeiltu ja hylätty 7.9.2026). Kokeilussa yhden kerroksen laatta
     * — ja niitä on valtaosa, koska ranta-, viiva- ja nostotasot ovat
     * harvoja — vietiin `new Texture(bittikartta)`:na suoraan ilman
     * kangasta ja `drawImage`ia. Ajatus oli säästää yksi pääsäikeen
     * pikselikopio. TULOS OLI PÄINVASTAINEN: `renderer.initTexture`
     * kallistui 3,0 → 5,1 ms (p50) ja pahin vienti 6,7 → 64,2 ms
     * (savuke-pallo-kehystahti, 390 × 844 dpr 2).
     *
     * SYY ON PYSTYKÄÄNNÖSSÄ. three.js:n tekstuurin oletus on
     * `flipY = true`, ja kun lähde on bittikartta, kääntö tehdään
     * pikseli pikseliltä keskusmuistissa. Kangas taas elää jo
     * näytönohjaimessa (kiihdytetty 2D-konteksti), joten sama kääntö on
     * yksi GPU-kopio. Kangas siis MAKSAA yhden drawImagen ja SÄÄSTÄÄ
     * koko viennin.
     */
    /*
     * VALMISTELUN HINTA MITATAAN (7.9.2026). Tästä eteenpäin kaikki on
     * PÄÄSÄIKEEN työtä — kangas, drawImage, verkon puskurit, materiaali
     * — ja se osuu siihen kehykseen, jossa laatan haku sattuu
     * valmistumaan. Se ei näy missään kehyskoukussa, joten ilman tätä
     * mittaria se olisi savukkeelle näkymätöntä aikaa.
     */
    const valmisteluAlkoi = aika();
    const kangas = luoKangas(kartta.leveys, kartta.korkeus);
    const ctx = kangas?.getContext?.('2d');
    if (!ctx) { for (const k of kuvat) k?.close?.(); t.tila = 'virhe'; return; }
    /*
     * TASOITUS ULOTTUU LAATASTON ULKOPUOLELLE (kaistat, 13.9.2026).
     * Laatasto on vain kohdemaan laatikon alalla; laajalla ruudulla
     * kamera näkee sen ohi. Peli maalaa saman kerman samalla peitolla
     * suojatun suorakaiteen ulkopuolelle — myös laatoille, joita ei ole
     * olemassa — jolloin laatikon ja laattaruudukon reunat eivät ole
     * kartalla nähtävissä. Perustelu: js/laattapyramidi.js
     * pyramidinTasoitus.
     */
    const tasoitus = kerrokset.vari ? pyramidinTasoitus() : null;
    /*
     * ══════════════════════════════════════════════════════════════
     * KERMA EI ODOTA VÄRILAATTAA (omistaja 18.9.2026, Raamattu
     * KARTTAUUDISTUKSEN PAATOKSET 37 kohta 1)
     * ══════════════════════════════════════════════════════════════
     *
     * Sanatarkasti: *"peli valkkyy panoroitaessa, eli etta poistettu
     * korkeusero kartta tulee nakyviin aina vasta pienella viiveella"*.
     *
     * JUURISYY ON VÄRITASON TASOVÄLI, EI VERKON VIIVE. Kohdemaan
     * väritaso on ajettu vain tasoille z4…z8 (ämpärin pyramidi.json,
     * `varitasot.<ISO>.tasot`), ja `pyramidinKerrostasot(z)` lisää
     * `vari`-kerroksen VAIN niille tasoille. Tasoilla z0…z3 silmukka ei
     * siis koskaan päätynyt tähän haaraan, eikä `maalaaTasoitus`
     * maalannut mitään: karkea laatta oli koko maailman topografia
     * ILMAN KERMAA. Panoroitaessa uusi ala tulee ensin näkyviin
     * karkeana tasona ja tarkentuu vasta z4+:n saapuessa — juuri siinä
     * hetkessä reliefi välähtää ja katoaa.
     *
     * KORJAUS ON, ETTÄ KERMA EI RIIPU VÄRILAATASTA LAINKAAN. Suoja ja
     * renkaat tietää `pyramidinTasoitus()` ilman yhtään laattaa, joten
     * peitto maalataan SAMASSA VAIHEESSA kuin pohja piirretään — myös
     * tasolla, jolla väritasoa ei ole olemassa (`variTasolla` epätosi).
     * Värilaatta täydentää saapuessaan vain suojan sisäosan.
     *
     * JÄRJESTYS SÄILYY: kerma menee pohjan päälle mutta rannan,
     * viivan ja noston alle, kuten väritasokin (pyramidinKerrostasot).
     */
    const variTasolla = kerrostasot.some((k) => k?.vari);
    const piirraKerma = (kuva) => {
      if (tasoitus.maailma) {
        maalaaMaailmanVari(ctx, {
          tasoitus, kartta, ppu: tasoOlio.pikseliaPerYksikko, arkki: pyramidi.arkki, kuva,
        });
        return;
      }
      const tyhjaKerma = kertomuslukko && tasoituksenUlkopuolella({
        tasoitus, kartta, ppu: tasoOlio.pikseliaPerYksikko, arkki: pyramidi.arkki,
      });
      if (tyhjaKerma) {
        if (!t.kermatta) mittarit.kermattomia += 1;
        t.kermatta = true;
        return;
      }
      if (!tasoitus.suoja?.tarkka) return;
      maalaaTasoitus(ctx, {
        tasoitus,
        kartta,
        ppu: tasoOlio.pikseliaPerYksikko,
        arkki: pyramidi.arkki,
        kuva,
        maamaski: MERET_NAKYVIIN,
      });
    };
    for (let i = 0; i < kuvat.length; i += 1) {
      const kuva = kuvat[i];
      if (tasoitus && kerrostasot[i]?.vari) {
        /*
         * KARKEA SUOJA EI SAA PÄÄTYÄ RUUDULLE (mitattu 14.9.2026,
         * puhelimen saapumisnäkymä; omistajan kuvakaappaus klo 17.55
         * UTC: *"laattojen reunoilla repaleiset kermaläiskät"*).
         *
         * Ennen maapolygonien saapumista suoja on KOKO LAATASTON
         * LAATIKKO (js/laattapyramidi.js pyramidinTasoitus, `tarkka`
         * epätosi), eikä maalaus silloin peitä laataston sisältä
         * mitään: laatan oma kuva piirtyy sellaisenaan myös
         * Välimerelle, Espanjaan ja Marokkoon — harmaa meri ja
         * Atlaksen rinteet seepian päällä, laatan reunaan katkeavina
         * läiskinä. Mitattu 390 × 844 dpr 3: näin näytti 35 s ajan,
         * koska hitaalla laitteella suojan tarkentumisen jälkeinen
         * uudelleenpiirto ei ehtinyt valmiiksi (valmiita 4/30).
         *
         * VÄRITASO JÄTETÄÄN SILLOIN KOKONAAN POIS. Kartta on sen
         * hetken täsmälleen se seepiakartta, joka se oli ennen
         * tasoituskerrosta — ei koskaan väärä kuva. Suojan
         * tarkentuessa `tasoitus.avain` vaihtuu (L → T) ja kerros
         * mitätöi laattansa itse (ks. MAANVAIHTO MITÄTÖI LAATAT).
         */
        /*
         * TYHJÄ KERMALAATTA JÄTETÄÄN LINSSIN AJAKSI PIIRTÄMÄTTÄ
         * (ks. tasoituksenUlkopuolella). Laatta, josta suojaa ei
         * leikkaudu lainkaan, on pelkkä vaalea arkki — linssin
         * kertomuskamera lentää kohdemaan ulkopuolelle, ja juuri ne
         * arkit välkkyivät seepiakartan päällä. Ilman maalausta laatta
         * on se seepiakartta, joka se muutenkin on, eikä kerros hae
         * niille mitään.
         *
         * VAIN LINSSIN AJAKSI: pelin omalla kartalla kerman marginaali
         * on tarkoituksellinen (js/laattapyramidi.js), eikä sitä muuteta
         * täältä. Lipulla merkitty laatta puretaan lukon auetessa, jotta
         * kerma palaa entiselleen (lukitseKertomus).
         */
        /*
         * MAAILMANÄKYMÄSSÄ EI KERMAA (omistaja 15.9.2026, Raamattu:
         * KARTTAUUDISTUKSEN PAATOKSET 23). Kuva leikataan kohdemaan
         * renkaisiin ja muualle jää pohjan topografia; ilman renkaita
         * (aineisto vielä haussa) värilaatta jätetään kokonaan pois,
         * jolloin kartta on se pohjakartta, joka se muutenkin on.
         */
        piirraKerma(kuva);
        kuva?.close?.();
        continue;
      }
      if (!kuva) continue;
      ctx.drawImage(kuva, 0, 0, kartta.leveys, kartta.korkeus);
      kuva.close?.();
      /*
       * POHJA ON JUURI PIIRRETTY: kerma tähän, jos tällä tasolla ei ole
       * väritasoa lainkaan (z0…z3). Sama kehys, ei odotusta.
       */
      if (tasoitus && !variTasolla && i === 0) piirraKerma(null);
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
    const valmisteluKesti = aika() - valmisteluAlkoi;
    mittarit.valmisteluMs += valmisteluKesti;
    mittarit.valmisteluja += 1;
    if (valmisteluKesti > mittarit.valmisteluMax) mittarit.valmisteluMax = valmisteluKesti;
    vientijono.push(t);
    ajaVienti();
  };

  /* ---------------- latausjono ---------------- */

  const kaynnista = () => {
    if (purettu) return;
    // Näkyvät ensin, sitten ennakko ja pidetyt — kumpikin ruudun keskeltä.
    jono.sort((a, b) => (a.nakyva ? 0 : 1) - (b.nakyva ? 0 : 1) || a.etaisyys - b.etaisyys);
    while (ladattavia < LAATTAKERROS_RINNAKKAIN && jono.length) {
      const t = jono.shift();
      t.jonossa = false;
      if (!laatat.has(t.avain) || t.tila !== 'ladataan' || t.aloitettu) continue;
      t.aloitettu = true;
      ladattavia += 1;
      lataa(t)
        .catch((syy) => { t.tila = 'virhe'; mittarit.syy = String(syy?.message ?? syy); })
        .then(() => { ladattavia -= 1; kaynnista(); });
    }
    mittarit.jonossa = jono.length;
    mittarit.ladattavia = ladattavia;
  };

  /*
   * ── LUKKO: KERROS SEIS LINSSIN AJAKSI (12.9.2026) ────────────────
   *
   * Satelliittilinssi vaihtaa pallon pinnan Maaksi avaruudesta
   * (js/linssit/satelliitti-avaruus.js). Linssi piilottaa kerroksen
   * verkot piirtokerroksista, mutta se EI riitä: kerros rakentaa uusia
   * verkkoja aina kun laatan kuva saapuu verkosta, ja juuri saapunut
   * laatta ehtii yhden kehyksen ajan ruudulle ennen kuin linssin oma
   * kehyssilmukka sulkee sen (mitattu 12.9.2026: yksi karttapinta jäi
   * näkyviin kolmella näytöllä kolmesta ajosta). Lukko sulkee
   * PÄIVITYKSEN, jolloin uusia verkkoja ei synny lainkaan — ja samalla
   * peli lakkaa hakemasta laattoja, joita pelaaja ei voi nähdä.
   *
   * LUKKO EI PURA MITÄÄN: valmiit verkot jäävät paikoilleen ja tulevat
   * takaisin sellaisinaan, kun lukko avataan. Vain päivitys pysähtyy.
   */
  let lukittu = false;

  /*
   * ── KERTOMUSLUKKO: TASO JA LAATTAJOUKKO PAIKALLEEN LINSSIN AJAKSI ──
   *
   * OMISTAJA 14.9.2026 (iPad, Ihmisen matka, sanatarkasti): *"valilla
   * kartan pienta vareilee meinaten pudottaa topografian"*. Syy on
   * MITATTU (docs/raportit/viesti-fable-linssivika-20260914.md luku 3,
   * 30 s näyte iPad 1180 × 820 dpr 2): linssin kertomuskamera lentää
   * yhtäjaksoisesti (korkeus 0,19 → 2,5 → 0,19), ja kerros laskee
   * näkyvän joukon uudelleen joka liikkeellä. Laattoja purettiin
   * **368 kpl / 30 s**, pyyntöjä ehdittiin lähettää **66**, ja
   * näyttämölle jäi 0–15 laattaa tarvitusta 15–40:stä. Reliefi putosi
   * siis toistuvasti takaisin sumeaan pohjaan. Taso ehti lisäksi
   * vaihtua kesken ajon (z6 → z4 → z6 → z5), mikä vaihtaa koko
   * tekstuuriston kerralla.
   *
   * LUKKO EI OLE SAMA KUIN `lukitse` YLLÄ. Satelliittilinssin lukko
   * pysäyttää koko päivityksen, koska sen näkymässä karttapintaa ei
   * saa näkyä lainkaan. Kertomuslinssissä kartta on se, mitä
   * katsotaan: päivitys jatkuu, mutta
   *
   *   1. TASO PYSYY. Valinta ei seuraa tarvetta vaan lukittua z:aa.
   *      Laattakatto (LAATTAKERROS_LAATTAKATTO_NAKYVA) saa yhä laskea
   *      tasoa yleiskuvassa — se on muistin kova raja — mutta kun
   *      kamera palaa alas, valinta alkaa taas lukitusta tasosta eikä
   *      jää karkeaan.
   *   2. LAATTAJOUKKO PYSYY. `pito` ei vanhene ajassa, joten kerran
   *      ladattu laatta on yhä muistissa, kun kamera palaa samalle
   *      seudulle. Määräkatto ei pura pidettyjä (laattakerroksenLRU),
   *      mutta TAVUKATTO purkaa yhä — muisti on kova raja myös
   *      linssissä, eikä lukko saa kasvattaa sitä rajattomasti.
   *
   * PYYNTÖJÄ EI SULJETA. Kertomuskamera lentää uusille seuduille,
   * joilla kerroksella ei ole yhtään laattaa; pyyntöjen sulkeminen
   * jättäisi ne seudut kokonaan sumeaksi pohjaksi, eli tekisi juuri
   * sen, mitä lukko korjaa (mitattu, raportin luku 4).
   */
  let kertomuslukko = false;
  /** Taso, johon kertomuslukko naulasi valinnan (z), tai null. */
  let kertomustaso = null;

  /* ---------------- tekstuurien vienti (≤ 2 / kehys) ---------------- */

  const ajaVienti = () => {
    /*
     * LUKKO PYSÄYTTÄÄ MYÖS VIENNIN. Päivityksen pysäyttäminen ei yksin
     * riitä: jono voi olla täynnä laattoja, jotka latautuivat ennen
     * lukkoa, ja vienti lisäisi ne sceneen kaksi kehystä kohti vielä
     * pitkään lukon jälkeen (mitattu 12.9.2026: satelliittilinssin
     * avaruusnäkymässä yksi karttapinta ilmestyi joka kehyksellä).
     * Jono SÄILYY ja valuu sceneen, kun lukko avataan (lukitse kutsuu
     * ajaVientiä uudestaan) — mitään ei siis hukata.
     */
    if (purettu || lukittu || vientiRaf || !vientijono.length) return;
    vientiRaf = ikkuna.requestAnimationFrame(() => {
      vientiRaf = 0;
      let n = 0;
      while (vientijono.length && n < LAATTAKERROS_TEKSTUUREJA_PER_KEHYS) {
        const t = vientijono.shift();
        if (!laatat.has(t.avain) || !t.tekstuuri) continue;
        renderer?.initTexture?.(t.tekstuuri);
        t.viety = true;
        n += 1;
        /*
         * VALMIS LAATTA MENEE SCENEEN, JOS SE ON YHÄ ALUEELLA — näkyvä
         * tai juuri nähty (pito). Vanha ehto (vain `nakyva`) jätti
         * heilurin ääripään laatan scenen ulkopuolelle, kun tekstuuri
         * sattui valmistumaan sillä kehyksellä, jolla laatta oli
         * käännöksen toisella puolella (omistajan palaute v1649).
         */
        if (t.nakyva || t.pito) lisaaSceneen(t);
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

  /*
   * KEHYSMITAT YHDESTÄ LÄHTEESTÄ (vika v1649). Kerros ei enää mittaa
   * ruutua ja kameraa itse tapahtumakäsittelijän sisällä, vaan saa ne
   * renderöintikoukusta (js/pallo.js kytkePallonKehys): täsmälleen
   * samat luvut, samasta kehyksestä, kuin vektorikerros — ja ruudun
   * koko siitä, mitä REALLY piirretään (renderer.getSize), ei kotelon
   * CSS-laatikosta, joka voi olla kuoressa eri kokoinen. Ilman koukkua
   * (yksikkötestit, savukkeet, lepoon()) mitataan kuten ennen.
   */
  const kehysmitat = (kehys) => {
    if (kehys?.pov) return kehys;
    const kam = pallo.camera?.() ?? null;
    return {
      pov: pallo.pointOfView?.() ?? null,
      kamera: kam,
      W: kotelo.clientWidth,
      H: kotelo.clientHeight,
      suhde: renderer?.getPixelRatio?.() ?? (ikkuna.devicePixelRatio || 1),
      kuvasuhde: Number.isFinite(kam?.aspect) && kam.aspect > 0 ? kam.aspect : 0,
      fov: Number.isFinite(kam?.fov) ? kam.fov : 50,
      sade: pallo.getGlobeRadius(),
    };
  };

  function suorita(kehys) {
    if (purettu) return false;
    const luokat = kolmi();
    if (!luokat?.laatatValmiit || !luokat.Texture || !luokat.BufferGeometry || !luokat.BufferAttribute) {
      return luovuta('kirjaston luokat puuttuvat');
    }
    varmistaPyramidi();
    if (pyramidi === undefined) return luovuta('pyramidin luettelo haussa');
    if (!pyramidi) return luovuta('pyramidin luetteloa ei saatu');
    /*
     * KOHDEMAA LUETAAN YHDESTÄ LÄHTEESTÄ (js/laattapyramidi.js
     * variMaaNyt), jonka lauta asettaa samassa hetkessä kuin punaisen
     * kehän (js/pallolauta/lauta.js). Kerros ei päättele maata itse:
     * kaksi päättelyä ehtisi olla eri mieltä, ja väri on osa laatan
     * kangasta eikä kerros, jonka voisi piilottaa jälkikäteen.
     */
    const variMaa = pyramidinVaritasonMaa();
    kerrokset = lepokerroksenKerrokset(pallonSarja(), pyramidi, variMaa);
    if (!kerrokset) return luovuta('pallon sarja ja pyramidi eri versiota');
    /*
     * MAANVAIHTO MITÄTÖI LAATAT. Väri on kankaassa, joten vanhan maan
     * laatta on väärä kuva eikä vanhentunut kuva — se on purettava ja
     * haettava uudestaan. Sukupolvi kasvaa, jotta kesken oleva vienti
     * ei asenna purettua laattaa takaisin.
     */
    const tasoitusAvain = kerrokset.vari ? (pyramidinTasoitus()?.avain ?? '') : '';
    if (variMaa !== variMaaEdellinen || tasoitusAvain !== tasoitusAvainEdellinen) {
      variMaaEdellinen = variMaa;
      tasoitusAvainEdellinen = tasoitusAvain;
      mittarit.variMaa = kerrokset.vari ? variMaa : null;
      mittarit.varimitatointeja += 1;
      sukupolvi += 1;
      jono.length = 0;
      vientijono.length = 0;
      for (const t of [...laatat.values()]) poista(t);
      laatat.clear();
      taso = null;
    }
    const mitat = kehysmitat(kehys);
    const W = mitat.W;
    const H = mitat.H;
    if (!(W > 0 && H > 0)) return luovuta('kotelo piilossa');
    const pov = mitat.pov;
    if (!pov || !Number.isFinite(pov.altitude)) return luovuta('ei kameraa');
    const linssi = {
      fov: Number.isFinite(mitat.fov) ? mitat.fov : 50,
      kuvasuhde: mitat.kuvasuhde > 0 ? mitat.kuvasuhde : W / H,
      sade: mitat.sade ?? pallo.getGlobeRadius(),
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
    const { latMin, latMax } = karttaAla();
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
    const suhde = mitat.suhde;
    const tarvePxAste = (LEPOKERROS_MITTAMATKA_PX * suhde) / Math.abs(keski.lat - alas.lat);
    /*
     * TASO KERTOMUSLUKOSTA, JOS SE ON PÄÄLLÄ (ks. KERTOMUSLUKKO yllä).
     * Lukittu taso otetaan LÄHTÖKOHDAKSI, ei lopputulokseksi: alla oleva
     * silmukka laskee sitä yhä, jos alue ei mahdu laattakattoon.
     */
    let valittu = kertomuslukko && Number.isFinite(kertomustaso)
      ? (tasoZ(kertomustaso) ?? laattakerroksenTaso(pyramidi.tasot, tarvePxAste, taso))
      : laattakerroksenTaso(pyramidi.tasot, tarvePxAste, taso);
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
    /** Tietue laatalle (luodaan tarvittaessa), etäisyys ja pito päivitettynä. */
    const varmista = (l, nakyva) => {
      const avain = `${valittu.z}/${l.sarake}/${l.rivi}`;
      let t = laatat.get(avain);
      if (!t) {
        t = {
          avain, z: valittu.z, sarake: l.sarake, rivi: l.rivi, alue: null, tila: 'ladataan',
          verkko: null, materiaali: null, tekstuuri: null, kaytetty: nyt, tavut: 0,
          nakyva, scenessa: false, viety: false, aloitettu: false, haipyy: false, jonossa: false,
          varillinen: false, kermatta: false,
          katkaisin: null, etaisyys: 0, sukupolvi, pito: true, ennakko: !nakyva,
        };
        laatat.set(avain, t);
      }
      // Etäisyys ruudun keskeltä laattapikseleinä (sauma kierretään auki).
      let dx = (l.sarake + 0.5) * koko - keskiX;
      while (dx > valittu.leveys / 2) dx -= valittu.leveys;
      while (dx < -valittu.leveys / 2) dx += valittu.leveys;
      t.etaisyys = Math.hypot(dx, (l.rivi + 0.5) * koko - keskiY);
      t.kaytetty = nyt;
      t.pito = true;
      return t;
    };
    for (const l of nakyvatLaatat) {
      const t = varmista(l, true);
      nakyvat.add(t.avain);
      t.nakyva = true;
      t.ennakko = false;
      t.haipyy = false;
      // Ulos häipymässä ollut laatta palasi näkyviin: käännetään häive
      // takaisin. Sisään häipyvään ei kosketa — uudelleenaloitus joka
      // päivityksellä (10 kertaa sekunnissa) ei koskaan päättyisi.
      if (t.materiaali && t.materiaali.__kohde === 0) {
        haivyta(t.materiaali, 1, reduced() ? 0 : LAATTAKERROS_HAIVE_MS);
      }
      if (t.tila === 'valmis' && t.viety && !t.scenessa) lisaaSceneen(t);
    }
    for (const t of laatat.values()) {
      if (nakyvat.has(t.avain)) continue;
      t.nakyva = false;
      t.ennakko = false;
    }

    /*
     * 1b. ENNAKKOALUE LIIKESUUNTAAN (omistajan palaute v1649). Vara on
     * se matka, jonka kamera kulki edellisestä päivityksestä, kerrottuna
     * LIIKEVARA_KERROIN:lla ja MOLEMPIIN suuntiin: heiluri kääntyy
     * takaisin, joten jo ohitettu reuna tarvitaan yhtä pian kuin edessä
     * oleva. Ennakon laatat ladataan ja pidetään, mutta ne EIVÄT olleet
     * mukana tason valinnassa (LAATTAKATTO_NAKYVA) — taso pysyy yhtä
     * terävänä kuin ennen, vaikka jono kasvaa.
     */
    const ennakko = new Set();
    const edellinenPov = povHistoria[povHistoria.length - 1] ?? null;
    const kulunut = edellinenPov ? nyt - edellinenPov.hetki : Infinity;
    const tuore = edellinenPov && kulunut <= 4 * LAATTAKERROS_PAIVITYSVALI_LIIKE_MS;
    const lonEro = (a, b) => Math.abs(((a - b + 540) % 360) - 180);
    // Ennuste: seuraava päivitysväli vie yhtä pitkälle kuin edellinen.
    let varaLat = tuore ? LAATTAKERROS_LIIKEVARA_KERROIN * Math.abs(pov.lat - edellinenPov.lat) : 0;
    let varaLon = tuore ? LAATTAKERROS_LIIKEVARA_KERROIN * lonEro(pov.lng, edellinenPov.lng) : 0;
    while (povHistoria.length && nyt - povHistoria[0].hetki > LAATTAKERROS_PITO_MS) povHistoria.shift();
    if (LAATTAKERROS_LIIKEVARA_PYYHKAISY) {
      // Pyyhitty laatikko: heilurin ääripää on yhtä lähellä kuin edessä oleva.
      for (const h of povHistoria) {
        varaLat = Math.max(varaLat, Math.abs(pov.lat - h.lat));
        varaLon = Math.max(varaLon, lonEro(pov.lng, h.lng));
      }
    }
    povHistoria.push({ lat: pov.lat, lng: pov.lng, hetki: nyt });
    varaLat = Math.min(alue.lat1 - alue.lat0, varaLat);
    varaLon = Math.min(alue.lon1 - alue.lon0, varaLon);
    if (varaLat > 0 || varaLon > 0) {
      const laaja = {
        lat0: Math.max(latMin, alue.lat0 - varaLat), lat1: Math.min(latMax, alue.lat1 + varaLat),
        lon0: alue.lon0 - varaLon, lon1: alue.lon1 + varaLon,
      };
      const ennakkoKartta = lepokerroksenLaatat({
        taso: valittu, laatta: koko, arkki: pyramidi.arkki,
        projektio: pyramidi.projektio, alue: laaja, laudanY,
      });
      /*
       * ENNAKON EHDOKKAAT YHDELLÄ KIERROKSELLA JA KATTO HETI (7.9.2026).
       * Ennen tästä lähti kaksi `filter`-kierrosta, jotka rakensivat
       * välitaulukot KAIKISTA laajennetun alueen laatoista ennen kuin
       * katto (LAATTAKERROS_LAATTAKATTO_ENNAKKO) edes katsoi niitä.
       * Laajennus on enintään kolminkertainen kumpaankin suuntaan, eli
       * yhdeksänkertainen laattamäärä: 24 näkyvästä tulee yli 200
       * ehdokasta, joista katto ottaa 96. Nyt sama kierros tekee
       * suodatuksen ja lisäyksen ja pysähtyy kattoon.
       */
      for (const l of ennakkoKartta?.laatat ?? []) {
        if (ennakko.size >= LAATTAKERROS_LAATTAKATTO_ENNAKKO) break;
        if (nakyvat.has(`${valittu.z}/${l.sarake}/${l.rivi}`)) continue;
        if (!laattakerroksenNakyvissa(laatanAlue(valittu, l.sarake, l.rivi), pov)) continue;
        const t = varmista(l, false);
        t.ennakko = true;
        ennakko.add(t.avain);
        if (t.tila === 'valmis' && t.viety && !t.scenessa) lisaaSceneen(t);
      }
    }
    /*
     * PITO: laatta, joka on ollut näkyvissä tai ennakossa viimeisen
     * LAATTAKERROS_PITO_MS:n aikana, ei putoa jonosta eikä LRU:n
     * määräkatosta. Tavukatto purkaa yhä (ks. laattakerroksenLRU).
     */
    for (const t of laatat.values()) {
      const tuore = nyt - (t.kaytetty ?? 0) <= LAATTAKERROS_PITO_MS;
      /*
       * KERTOMUSLUKOSSA PITO EI VANHENE — MUTTA VAIN VALMIILLA
       * LAATALLA (ks. KERTOMUSLUKKO yllä). Pito on kaksikäyttöinen: se
       * suojaa LRU:lta JA pitää tietueen latausjonossa (`t.jonossa`
       * alla). Jos lukko pitäisi myös aloittamattomat tietueet, jokainen
       * laatta, jonka kamera on lennollaan ohittanut, jäisi jonoon
       * ikuisesti — lukko lisäisi pyyntöjä sen sijaan että vähentäisi
       * niitä. Valmis laatta ei ole jonossa, joten sen pito on pelkkää
       * muistisuojaa: juuri se, mitä tässä haetaan.
       */
      t.pito = tuore || (kertomuslukko && t.tila === 'valmis');
    }

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

    /*
     * 3. LRU: näkymättömiä valmiita muistissa katon verran. Sitä ennen
     * pois ALOITTAMATTOMAT tietueet, joita ei enää katsota eikä pidetä:
     * ne ovat pelkkää kirjanpitoa (jono kootaan näkyvistä ja pidetyistä),
     * ja laatta luodaan tarvittaessa uudestaan samalla avaimella.
     */
    for (const t of [...laatat.values()]) {
      if (!t.nakyva && !t.pito && t.tila === 'ladataan' && !t.aloitettu) poista(t);
    }
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
     *
     * JONOSSA OVAT MYÖS PIDETYT (v1649:n korjaus): heilurin ääripäässä
     * laatta on näkyvissä yhden päivityksen ajan, eikä se ehtinyt
     * latauspaikkaan ennen kuin vanha ehto (`t.nakyva`) pudotti sen
     * jonosta seuraavalla päivityksellä — se jäi ikuisesti tilaan
     * "ladataan", ja pohjan Z5 näkyi sen kohdalla joka käännöksellä.
     */
    jono.length = 0;
    for (const t of laatat.values()) {
      // `jonossa` on tietueen oma lippu eikä erillinen Set: mittarit
      // luetaan samalla kierroksella kuin kaikki muukin (ks. alla).
      t.jonossa = (t.nakyva || t.pito) && t.tila === 'ladataan' && !t.aloitettu;
      if (t.jonossa) jono.push(t);
    }

    /*
     * MITTARIT YHDELLÄ KIERROKSELLA (7.9.2026). Ennen tästä lähti
     * kahdeksan erillistä `filter`/`reduce`-kierrosta ja kaksi taulukko-
     * kopiota kaikista tietueista — kymmenen sadan alkion varausta
     * JOKAISELLA päivityksellä, eli 100 kertaa sekunnissa liikkeessä.
     * Kehysaikaa se ei yksinään syönyt paljon, mutta roskaa kyllä, ja
     * roskienkeruun tauko on juuri se 30 ms:n nykäys, jota mitataan
     * (jäljessä V8.GC_MC_BACKGROUND_MARKING 845 ms / 4 s). Sama tulos,
     * yksi kierros, ei yhtään varausta.
     */
    let jumissa = 0;
    let laattojaN = 0;
    let valmiitaN = 0;
    let hapyviaN = 0;
    let scenessaN = 0;
    let nakyviaScenessa = 0;
    let nakyviaTaysin = 0;
    let pidettyjaN = 0;
    let tavuja = 0;
    let varillisiaN = 0;
    for (const t of laatat.values()) {
      laattojaN += 1;
      tavuja += t.tavut ?? 0;
      if (t.varillinen) varillisiaN += 1;
      if (t.tila === 'valmis') valmiitaN += 1;
      if (t.tila === 'ladataan' && !t.aloitettu && !t.jonossa) jumissa += 1;
      if (t.scenessa) {
        scenessaN += 1;
        const tayte = t.materiaali ? t.materiaali.opacity : 0;
        if (tayte < 1) hapyviaN += 1;
        if (t.nakyva) {
          nakyviaScenessa += 1;
          if (t.materiaali && tayte >= 1) nakyviaTaysin += 1;
        }
      }
      if (t.pito && !t.nakyva) pidettyjaN += 1;
    }
    mittarit.jumissa = jumissa;
    mittarit.nakyvia = nakyvat.size;
    mittarit.nakyviaScenessa = nakyviaScenessa;
    mittarit.nakyviaTaysin = nakyviaTaysin;
    mittarit.ennakkoja = ennakko.size;
    mittarit.pidettyja = pidettyjaN;
    mittarit.tila = 'nakyy';
    mittarit.taso = valittu.z;
    mittarit.laattoja = laattojaN;
    mittarit.valmiita = valmiitaN;
    mittarit.hapyvia = hapyviaN;
    mittarit.scenessa = scenessaN;
    mittarit.kaytetytTavut = tavuja;
    mittarit.varillisia = varillisiaN;
    mittarit.variMaa = kerrokset.vari ? variMaaEdellinen : null;
    mittarit.pyydettyja = pyydetyt.size;
    mittarit.paivityksia += 1;
    mittarit.syy = '';
    kaynnista();
    return true;
  }

  /*
   * `kehys` on renderöintikoukun kehysmitat (js/pallo.js
   * kytkePallonKehys) tai null/vanha pov-argumentti: silloin mitat
   * luetaan kuten ennen. Kutsuja EI enää ole tapahtumakäsittelijä.
   */
  const paivita = (kehys, liikkeessa = false) => {
    if (purettu || lukittu) return false;
    const nyt = kehys?.aika ?? aika();
    if (liikkeessa && nyt - viimePaivitys < LAATTAKERROS_PAIVITYSVALI_LIIKE_MS) return false;
    viimePaivitys = nyt;
    return suorita(kehys);
  };

  return {
    paivita,
    /** Päivitä heti ilman harvennusta (savukkeet ja vartijat). */
    kokoa: () => paivita(null, false),
    /** Lepokerroksen rajapinta: kerros päivittyy, se ei kokoa eikä piiloudu. */
    levossa: () => paivita(null, false),
    piilota: () => false,
    /**
     * Päivitys seis (true) tai taas käyntiin (false). Ks. LUKKO yllä.
     * Palauttaa lukon tilan, jotta kutsuja voi mitata sen.
     */
    lukitse: (paalla) => {
      lukittu = Boolean(paalla);
      if (!lukittu) ajaVienti();
      return lukittu;
    },
    /** Onko kerros lukossa (savukkeet ja vartijat). */
    lukossa: () => lukittu,
    /**
     * KERTOMUSLUKKO päälle (true) tai pois (false). Ks. KERTOMUSLUKKO
     * yllä. Päälle mennessä naulataan se taso, joka on juuri nyt
     * valittuna — siis se, jonka laatat ovat jo ladattuina; pois
     * mennessä lukko ja naula katoavat, ja seuraava päivitys valitsee
     * tason taas tarpeesta. Palauttaa naulatun tason (z) tai null.
     */
    lukitseKertomus: (paalla) => {
      kertomuslukko = Boolean(paalla);
      kertomustaso = kertomuslukko ? (taso?.z ?? null) : null;
      mittarit.kertomustaso = kertomustaso;
      /*
       * Lukon auetessa puretaan ne laatat, jotka koottiin ILMAN kerman
       * maalausta (ks. TYHJÄ KERMALAATTA). Pelin omalla kartalla kerman
       * marginaali kuuluu kuvaan, joten ne on koottava uudelleen; muita
       * laattoja ei pureta, eikä kartta siis välähdä sulkiessa.
       */
      if (!kertomuslukko) {
        for (const t of [...laatat.values()]) if (t.kermatta) poista(t);
      }
      return kertomustaso;
    },
    /** Kertomuslukon tila savukkeille: naulattu z tai null. */
    kertomuslukossa: () => (kertomuslukko ? kertomustaso : null),
    /*
     * TILA JA SYY ILMAN VARAUSTA (7.9.2026). `mittarit()` kopioi koko
     * mittaritaulun JA pyydettyjen osoitteiden joukon taulukoksi —
     * satoja merkkijonoja. js/pallo.js kutsui sitä `vapautaPohja`ssa
     * JOKA PIIRRETYLLÄ KEHYKSELLÄ pelkän kahden kentän takia, eli
     * roskaa 60 kertaa sekunnissa. Nämä kaksi lukevat saman tiedon
     * varaamatta mitään; `mittarit()` jää savukkeille ja raporteille.
     */
    tila: () => mittarit.tila,
    syy: () => mittarit.syy,
    /** Valmistelun hinta (ms, kpl, pisin) savukkeelle — ei varausta. */
    valmistelu: () => [mittarit.valmisteluMs, mittarit.valmisteluja, mittarit.valmisteluMax],
    /** Peittääkö kerros koko näkyvän alueen juuri nyt (pohjan tarve)? */
    peittaa: () => mittarit.nakyvia > 0 && mittarit.nakyviaScenessa >= mittarit.nakyvia,
    mittarit: () => ({ ...mittarit, pyydetyt: [...pyydetyt], nakyvissa: mittarit.scenessa > 0 }),
    pura: () => {
      purettu = true;
      sukupolvi += 1;
      if (vientiRaf) ikkuna.cancelAnimationFrame?.(vientiRaf);
      vientiRaf = 0;
      vientijono.length = 0;
      jono.length = 0;
      povHistoria.length = 0;
      aluemuisti.clear();
      rivimuisti.clear();
      for (const t of [...laatat.values()]) poista(t);
      laatat.clear();
      mittarit.tila = 'purettu';
      mittarit.laattoja = 0;
      mittarit.scenessa = 0;
    },
  };
}
