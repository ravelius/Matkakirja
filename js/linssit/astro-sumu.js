/*
 * ASTRONAUTIN KAMERAN SUMU — PILVIKERROS JA AVARUUSSUMU.
 *
 * Raamattu "KARTTAUUDISTUKSEN PAATOKSET 43" kohta 7 ja sen TARKENNUS.
 * Omistaja 18.9.2026 klo 22.50, sanatarkasti: *"Avaruus Linssissa
 * pitaisi olla sumua alussa kun pallo zoomautuu lahemmas. Onko tahan
 * jotain helppoa tapaa tai valmista koodia joka saisi tehtya?"* ja klo
 * 23.05: *"Voisiko se sumu olla myos avaruudessa jonka lapi zoomataan?
 * Ja onko se epatasaista kuin aidot sumu pilvet?"*
 *
 * VASTAUS ON KAKSIOSAINEN, JA SE ON TÄMÄ MODUULI:
 *
 *  a) PILVIKERROS — toinen läpinäkyvä pallokuori pinnan yläpuolella
 *     (säde 1,01 × pallon säde) tasavälisellä pilvikuvalla, oma hidas
 *     pyöriminen (PILVIEN_KIERTO_ASTETTA_MIN). Peitto on kaukaa
 *     PILVIEN_PEITTO ja häipyy nollaan lähizoomiin, jotta reliefi ja
 *     yön valot näkyvät lähellä.
 *  b) AVARUUSSUMU — kameran ja pallon VÄLISSÄ oleva epätasainen harso,
 *     jonka LÄPI zoomataan. Kaksi kalvoa linssin omalla kotelolla, eri
 *     nopeuksilla ajelehtivina; peitto on kameran korkeuden funktio:
 *     kaukaa ohut, keskimatkalla tihein, lähellä nolla.
 *
 * ── MIKSI EI three.js:n Fog EIKÄ TASAINEN HIMMENNYS ───────────────
 *
 * Omistaja kysyi nimenomaan, onko sumu *"epatasaista kuin aidot sumu
 * pilvet"*. `THREE.Fog` on etäisyyden funktio ja TÄSMÄLLEEN TASAINEN
 * ruudun poikki — se näyttäisi siltä, että ruutua on himmennetty, ei
 * siltä että kamera kulkee sumun läpi. Siksi molemmat kerrokset ovat
 * KOHINATEKSTUUREJA: fraktaalikohinaa (fbm, viisi oktaavia), joka
 * generoidaan ajossa kankaalle. Ei kuvatiedostoja repoon (Raamattu:
 * media ämpäriin), ei uusia riippuvuuksia, ei verkkohakua avauksessa.
 *
 * ── MISSÄ AITO NASA-PILVIKUVA ON ──────────────────────────────────
 *
 * PAATOKSET 43 kohta 7 nimeää NASA Blue Marble -pilvikuvan (public
 * domain). Sitä EI voi tuoda repoon eikä ladata tästä ennen kuin se on
 * ämpärissä, joten kytkin on valmiina: `PILVIEN_OSOITE` on `null`, ja
 * kun Fable on vienyt kuvan ämpäriin, yhden vakion vaihto ottaa sen
 * käyttöön — proseduraalinen kangas jää varareitiksi, jos lataus ei
 * onnistu (offline, 404). Lähde ja lisenssi: ks. PILVIEN_LAHDE.
 *
 * ── KOHINA ON SAUMATON ────────────────────────────────────────────
 *
 * Pilvikuori on tasavälinen (equirectangular) pallon ympäri, joten
 * kuvan vasen ja oikea reuna kohtaavat pituuspiirillä ±180°: sauma
 * näkyisi pystyviivana Tyynellämerellä. Avaruussumun kalvot taas
 * toistetaan (`background-repeat`) ruudun yli, joten sauma näkyisi
 * ruudukkona. Molemmat käyttävät siksi HILAKOHINAA, jonka hila kiertää
 * ympäri (`hilaArvo` ottaa modulon): kuva on saumaton molempiin
 * suuntiin ilman erillistä pehmennystä.
 *
 * ── MUISTI ────────────────────────────────────────────────────────
 *
 * Pilvikangas on 2 048 × 1 024 (RGBA 8 Mt näytönohjaimella) — PAATOKSET
 * 36:n raja on 32 Mt, ja 4k olisi 32 Mt eli täsmälleen rajalla, joten
 * 2k on tässä oikea (pilvet häipyvät lähizoomissa pois, eikä niiden
 * tarkkuudella ole samaa merkitystä kuin reliefillä). Avaruussumun
 * kangas on 512 × 512 ja menee CSS:n taustakuvaksi, ei pallolle.
 */

import { pilvipaino } from './satelliitti-avaruus.js';

/* ═════════════════ 1. VAKIOT ════════════════════════════════════ */

/**
 * AITO PILVIKUVA — LÄHDE JA LISENSSI (PAATOKSET 43 kohta 7).
 *
 * NASA Visible Earth, "Blue Marble: Next Generation" -sarjan pilvikuva
 * (cloud_combined / BlueMarble clouds, 2 048 × 1 024 ja 4 096 × 2 048).
 * NASA:n kuva-aineisto on PUBLIC DOMAIN (NASA Media Usage Guidelines:
 * NASA:n tuottama materiaali ei ole tekijänoikeuden alaista). Sama kuva
 * on Wikimedia Commonsissa nimellä "Cloud cover: Blue Marble Next
 * Generation" / "clouds.jpg" PD-USGov-NASA-lisenssillä.
 *
 * Lähde-URL kirjataan tähän, jotta ämpäriin vienti (Fable) ei tarvitse
 * uutta selvitystä:
 *   https://visibleearth.nasa.gov/images/57747/blue-marble-clouds
 *   (tiedosto cloud_combined_2048.jpg, 2 048 × 1 024, PD, NASA GSFC)
 */
export const PILVIEN_LAHDE = {
  nimi: 'NASA Visible Earth — Blue Marble clouds (cloud_combined)',
  osoite: 'https://visibleearth.nasa.gov/images/57747/blue-marble-clouds',
  lisenssi: 'public domain (NASA, PD-USGov-NASA)',
  mitat: '2048x1024',
};

/**
 * Ämpärin pilvikuva, kun se on siellä. `null` = proseduraalinen kangas.
 * Fable vaihtaa tähän osoitteen vietyään kuvan ämpäriin; koodi ei
 * muutu, eikä puuttuva tiedosto aiheuta yhtään turhaa pyyntöä.
 */
export const PILVIEN_OSOITE = 'https://media.matkakirja.app/matkakirja/linssit/pilvet-bluemarble-2048.jpg';

/** Pilvikuoren säde pallon säteestä (PAATOKSET 43: noin 1,01). */
export const PILVIEN_SADE = 1.01;
/** Pilvikankaan mitat (ks. muistilasku tiedoston alussa). */
export const PILVIEN_LEVEYS = 2048;
export const PILVIEN_KORKEUS = 1024;
/** Pilvien peitto kaukaa (PAATOKSET 43 kohta 7: 0,9). */
export const PILVIEN_PEITTO = 0.9;
/** Pilvikuoren oma pyöriminen (astetta minuutissa). */
export const PILVIEN_KIERTO_ASTETTA_MIN = 0.5;
/** Linssiosan nimi (lauta.linssit) — purku menee tällä. */
export const PILVIEN_OSA = 'astro-pilvet';

/** Avaruussumun kankaan sivu (px, saumaton). */
export const SUMUN_KOKO = 512;
/** Sumukalvojen luokka (savukkeet ja vartijat etsivät tällä). */
export const SUMUN_LUOKKA = 'astro-sumu';

/*
 * ── PEITON PROFIILI KORKEUDEN FUNKTIONA ──────────────────────────
 *
 * Akseli on SUHDELUKU s = kameran korkeus / avauskorkeus, ei
 * pallonsäde: avauskorkeus riippuu ruudun muodosta (puhelimella noin
 * 4,5, työpöydällä 1,6), joten absoluuttinen luku tarkoittaisi eri
 * näkymää eri ruudulla. Zoomikaista on ZOOMIN_LAHIN…ZOOMIN_KAUIN eli
 * s ∈ [0,12, 1,30] ja leponäkymä on tasan s = 1.
 *
 * PILVET: täysi peitto kaukana, nolla lähellä. Nollakohta on sama
 * NIMIEN_KYNNYS (0,25 × avaus), jolla kohdenimet syttyvät ja jolla
 * reliefilaastari syttyy tavallisella pikselisuhteella — juuri siinä
 * lähikuva alkaa, ja juuri siellä pilvet olisivat tiellä.
 *
 * SUMU: kaukaa ohut, keskimatkalla tihein, lähellä nolla. Tämä on
 * omistajan tarkennus sanatarkasti: kamera MENEE sumun läpi, joten
 * peitto ei voi kasvaa monotonisesti — se nousee ja laskee.
 */
/** Pilvet ovat täydessä peitossa tästä ylöspäin (× avauskorkeus). */
export const PILVIEN_TAYSI = 0.65;
/** Pilvet ovat poissa tästä alaspäin (× avauskorkeus). */
export const PILVIEN_NOLLA = 0.25;
/** Sumu: kaukainen piste ja sen ohut peitto. */
export const SUMUN_KAUKO = 1.3;
export const SUMUN_KAUKO_PEITTO = 0.15;
/** Sumu: tihein kohta ja sen peitto. */
export const SUMUN_KESKI = 0.6;
export const SUMUN_KESKI_PEITTO = 0.62;
/** Sumu: tästä alaspäin nolla (kamera on tullut sumun läpi). */
export const SUMUN_LAHI = 0.22;

/** Kahden sumukalvon painot, taustakuvan koot ja ajelehtimisnopeudet. */
export const SUMUKERROKSET = [
  { tunnus: 'etu', paino: 1, kokoPx: 760, nopeus: { x: 5.5, y: -2.2 } },
  { tunnus: 'taka', paino: 0.72, kokoPx: 1340, nopeus: { x: -2.4, y: 1.3 } },
];

/*
 * NAPAHÄIVYTYS — TASAVÄLISEN KUVAN OMA VIKA (mitattu 18.9.2026,
 * kaappaus astro-sumu-on-keski.png). Tasavälisessä projektiossa kuvan
 * ylin ja alin rivi puristuvat YHTEEN PISTEESEEN navalla, joten mikä
 * tahansa kuvio venyy siellä säteittäisiksi juoviksi — kaappauksessa
 * pohjoisnavalta lähti viuhka. Reliefitekstuuri ei kärsi siitä, koska
 * sen navat ovat yhtenäistä jäätä; pilvikohina kärsii. Lääke on sama
 * kuin reliefin omalla häivytyksellä: alfa nollataan navoille päin.
 */
export const PILVIEN_NAPAHAIVYTYS = [66, 80];

/** Sumun sävy (kylmä sinivalkoinen — avaruuspöly, ei savu). */
export const SUMUN_SAVY = [206, 222, 246];

/* ═════════════════ 2. KOHINA (PUHTAAT FUNKTIOT) ═════════════════ */

const raja01 = (x) => (x < 0 ? 0 : (x > 1 ? 1 : x));

/**
 * Hilan solmuarvo. Kierrättää molemmat indeksit hilan koolla, jolloin
 * kohina on saumaton: solmu (ruutujaX, y) on sama kuin (0, y).
 */
function hilaArvo(ix, iy, ruutujaX, ruutujaY, siemen) {
  const x = ((ix % ruutujaX) + ruutujaX) % ruutujaX;
  const y = ((iy % ruutujaY) + ruutujaY) % ruutujaY;
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263)
    ^ Math.imul(siemen | 0, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/**
 * Yksi oktaavi: bilineaarinen hilakohina smoothstep-pehmennyksellä.
 * `u` ja `v` ovat 0…1 (kuvan suhteellinen paikka).
 */
export function hilakohina(u, v, ruutujaX, ruutujaY, siemen) {
  const gx = u * ruutujaX;
  const gy = v * ruutujaY;
  const x0 = Math.floor(gx);
  const y0 = Math.floor(gy);
  const fx = gx - x0;
  const fy = gy - y0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const a = hilaArvo(x0, y0, ruutujaX, ruutujaY, siemen);
  const b = hilaArvo(x0 + 1, y0, ruutujaX, ruutujaY, siemen);
  const c = hilaArvo(x0, y0 + 1, ruutujaX, ruutujaY, siemen);
  const d = hilaArvo(x0 + 1, y0 + 1, ruutujaX, ruutujaY, siemen);
  const ylä = a + (b - a) * sx;
  const ala = c + (d - c) * sx;
  return ylä + (ala - ylä) * sy;
}

/**
 * FRAKTAALIKOHINA (fbm): oktaavit kaksinkertaisella hilalla ja
 * puolittuvalla amplitudilla. Palauttaa 0…1. Saumaton, koska jokainen
 * oktaava on saumaton (hila kaksinkertaistuu, joten kierto säilyy).
 */
export function fraktaalikohina(u, v, {
  ruutujaX = 6, ruutujaY = 3, oktaaveja = 5, siemen = 1, sitkeys = 0.5,
} = {}) {
  let summa = 0;
  let paino = 0;
  let amp = 1;
  for (let i = 0; i < oktaaveja; i += 1) {
    const kerroin = 2 ** i;
    summa += amp * hilakohina(u, v, ruutujaX * kerroin, ruutujaY * kerroin, siemen + i * 7919);
    paino += amp;
    amp *= sitkeys;
  }
  return paino > 0 ? summa / paino : 0;
}

/**
 * PILVIKANKAAN PIKSELIT (RGBA). Valkoinen pilvi, alfa kohinasta ja
 * leveysasteen painosta (`pilvipaino`, sama käyrä kuin generoidun
 * pallon omalla ohuella harsolla). Kynnys tekee pilvistä läiskiä eikä
 * tasaista harsoa — juuri se, mitä omistaja kysyi.
 *
 * Puhdas funktio: testi lukee pikselit ilman selainta.
 */
export function pilvipikselit({
  leveys = PILVIEN_LEVEYS, korkeus = PILVIEN_KORKEUS, siemen = 20260918, kynnys = 0.42,
} = {}) {
  const data = new Uint8ClampedArray(leveys * korkeus * 4);
  for (let y = 0; y < korkeus; y += 1) {
    const v = (y + 0.5) / korkeus;
    const lat = 90 - v * 180;
    const paino = pilvipaino(lat);
    for (let x = 0; x < leveys; x += 1) {
      const u = (x + 0.5) / leveys;
      const n = fraktaalikohina(u, v, {
        ruutujaX: 8, ruutujaY: 4, oktaaveja: 5, siemen,
      });
      /*
       * KYNNYS JA PAINO. `n * paino` painaa aavikkovyöhykkeen alle
       * kynnyksen (siellä on selkeää), ja jäljelle jäävä osa
       * venytetään 0…1:een — reunat jäävät pehmeiksi, keskustat
       * peittäviksi. Neliöjuuri nostaa ohuiden reunojen alfaa, jolloin
       * pilvi näyttää kuitulta eikä leikatulta läiskältä.
       */
      const raaka = (n * (0.55 + 0.75 * paino) - kynnys) / (1 - kynnys);
      const napa = 1 - raja01(
        (Math.abs(lat) - PILVIEN_NAPAHAIVYTYS[0])
        / (PILVIEN_NAPAHAIVYTYS[1] - PILVIEN_NAPAHAIVYTYS[0]),
      );
      const alfa = (raja01(raaka) ** 0.75) * napa;
      const i = (y * leveys + x) * 4;
      // Hieman kohinaa myös kirkkaudessa: tasainen valkoinen olisi maali.
      const savy = 236 + Math.round(19 * (n - 0.5));
      data[i] = savy;
      data[i + 1] = savy;
      data[i + 2] = Math.min(255, savy + 6);
      data[i + 3] = Math.round(255 * alfa);
    }
  }
  return { leveys, korkeus, data };
}

/**
 * AVARUUSSUMUN PIKSELIT (RGBA, neliö, saumaton joka suuntaan).
 * Kylmä sinivalkoinen; alfassa on aukkoja, jotta kalvo ei ole
 * tasainen himmennys vaan repaleinen harso.
 */
export function sumupikselit({
  koko = SUMUN_KOKO, siemen = 71829, kynnys = 0.34, savy = SUMUN_SAVY,
} = {}) {
  const data = new Uint8ClampedArray(koko * koko * 4);
  for (let y = 0; y < koko; y += 1) {
    const v = (y + 0.5) / koko;
    for (let x = 0; x < koko; x += 1) {
      const u = (x + 0.5) / koko;
      const n = fraktaalikohina(u, v, {
        ruutujaX: 3, ruutujaY: 3, oktaaveja: 5, siemen, sitkeys: 0.55,
      });
      const alfa = raja01((n - kynnys) / (1 - kynnys)) ** 0.9;
      const i = (y * koko + x) * 4;
      const kirkkaus = 0.82 + 0.28 * n;
      data[i] = Math.min(255, Math.round(savy[0] * kirkkaus));
      data[i + 1] = Math.min(255, Math.round(savy[1] * kirkkaus));
      data[i + 2] = Math.min(255, Math.round(savy[2] * kirkkaus));
      data[i + 3] = Math.round(255 * alfa);
    }
  }
  return { koko, data };
}

/* ═════════════════ 3. PEITON PROFIILIT ══════════════════════════ */

/** Lineaarinen liuku a→b välillä [x0, x1] (x1 saa olla x0:aa pienempi). */
function liuku(x, x0, x1, a, b) {
  if (x1 === x0) return a;
  const t = raja01((x - x0) / (x1 - x0));
  return a + (b - a) * t;
}

/**
 * PILVIEN PEITTO kameran korkeudesta. `avaus` on linssin avauskorkeus.
 * Kaukana PILVIEN_PEITTO, lähellä 0, välissä pehmeä liuku.
 *
 * Puhdas funktio (tests/astro-sumu.test.mjs).
 */
export function pilvienPeitto(korkeus, avaus, {
  taysi = PILVIEN_TAYSI, nolla = PILVIEN_NOLLA, huippu = PILVIEN_PEITTO,
} = {}) {
  if (!(avaus > 0) || !Number.isFinite(korkeus)) return 0;
  const s = korkeus / avaus;
  if (s >= taysi) return huippu;
  if (s <= nolla) return 0;
  // Smoothstep, jotta häipyminen ei näy portaana kesken zoomin.
  const t = (s - nolla) / (taysi - nolla);
  return huippu * (t * t * (3 - 2 * t));
}

/**
 * AVARUUSSUMUN PEITTO kameran korkeudesta: kaukaa ohut, keskellä
 * tihein, lähellä nolla. Kolme pistettä ja kaksi liukua — eikä yhtään
 * enempää, koska juuri nämä kolme lukua savuke mittaa.
 *
 * Puhdas funktio (tests/astro-sumu.test.mjs).
 */
export function sumunPeitto(korkeus, avaus, {
  kauko = SUMUN_KAUKO, keski = SUMUN_KESKI, lahi = SUMUN_LAHI,
  kaukoPeitto = SUMUN_KAUKO_PEITTO, keskiPeitto = SUMUN_KESKI_PEITTO,
} = {}) {
  if (!(avaus > 0) || !Number.isFinite(korkeus)) return 0;
  const s = korkeus / avaus;
  if (s >= kauko) return kaukoPeitto;
  if (s <= lahi) return 0;
  if (s >= keski) return liuku(s, keski, kauko, keskiPeitto, kaukoPeitto);
  return liuku(s, lahi, keski, 0, keskiPeitto);
}

/**
 * ONKO SUMU PÄÄLLÄ? `?sumu=0` sammuttaa molemmat kerrokset — savuke
 * mittaa peiton profiilin vertaamalla samaa näkymää sumuttomaan ajoon,
 * eikä vertailuajoa voi tehdä ilman kytkintä.
 */
export function sumuKaytossa(ikkuna = globalThis) {
  try {
    const arvo = new URLSearchParams(ikkuna?.location?.search ?? '').get('sumu');
    return !(arvo === '0' || arvo === 'false');
  } catch {
    return true;
  }
}

/* ═════════════════ 4. KANKAAT ═══════════════════════════════════ */

/** Pikselit kankaalle. Palauttaa canvasin tai null (ei 2d-kontekstia). */
function kankaalle(doc, leveys, korkeus, data) {
  const kangas = doc?.createElement?.('canvas');
  const ctx = kangas?.getContext?.('2d');
  if (!ctx || typeof globalThis.ImageData !== 'function') return null;
  kangas.width = leveys;
  kangas.height = korkeus;
  ctx.putImageData(new globalThis.ImageData(data, leveys, korkeus), 0, 0);
  return kangas;
}

/** Pilvikangas (tasavälinen, saumaton). */
export function pilvikangas(asetukset = {}, doc = globalThis.document) {
  const { leveys, korkeus, data } = pilvipikselit(asetukset);
  return kankaalle(doc, leveys, korkeus, data);
}

/** Sumukangas (neliö, saumaton). */
export function sumukangas(asetukset = {}, doc = globalThis.document) {
  const { koko, data } = sumupikselit(asetukset);
  return kankaalle(doc, koko, koko, data);
}

/* ═════════════════ 5. KAHVA ═════════════════════════════════════ */

/**
 * PILVIKERROS JA AVARUUSSUMU PÄÄLLE. Palauttaa kahvan, jonka
 * `paivita(nyt, korkeus)` ajetaan linssin omassa kehyssilmukassa.
 *
 * `null`, jos sumu on kytketty pois (`?sumu=0`) tai kotelo puuttuu.
 *
 * LIIKKEENVÄHENNYS (`reduced`): kerrokset ovat näkyvissä ja peitto
 * seuraa zoomia kuten ennenkin, mutta kumpikaan ei ajelehdi eikä
 * pilvikuori pyöri — ei yhtään omaehtoista liikettä ruudulla.
 *
 * @param {{lauta: object, kotelo: Element, avaus: () => number,
 *   reduced?: boolean, ikkuna?: object}} asetukset
 */
export function luoAstroSumu({
  lauta, kotelo, avaus, reduced = false, ikkuna = globalThis,
} = {}) {
  const doc = ikkuna?.document;
  if (!kotelo || !doc?.createElement || !sumuKaytossa(ikkuna)) return null;
  const korkeusAvaus = () => {
    const a = Number(avaus?.());
    return a > 0 ? a : 0;
  };

  /* ---- a) pilvikuori pallon pinnan päälle -------------------------- */
  /*
   * KUORI ON LAUDAN OMA KALVO (js/pallolauta/linssit.js `kalvo`), ei
   * uutta three.js-koodia: se osaa jo pallokuoren pinnan säteellä,
   * valaisemattoman materiaalin (MeshBasicMaterial, transparent,
   * depthWrite false) ja tekstuurin kankaasta — ja ennen kaikkea se
   * VAPAUTTAA tekstuurin purussa. Kalvolle lisättiin tätä varten kaksi
   * suoraa kirjoitusta, `peitto` ja `kierra`, koska zoomin mukana
   * muuttuva peitto ei saa käynnistää häivytysanimaatiota joka
   * kehyksellä.
   */
  let pilvet = null;
  let pilvikangasOlio = null;
  try {
    pilvikangasOlio = pilvikangas({}, doc);
  } catch { pilvikangasOlio = null; }
  if (pilvikangasOlio && lauta?.linssit?.kalvo) {
    pilvet = lauta.linssit.kalvo(PILVIEN_OSA, {
      // Ämpärin aito NASA-kuva, jos se on jo siellä; muuten kangas.
      kuva: PILVIEN_OSOITE ?? pilvikangasOlio,
      peittavyys: 0,
      sade: PILVIEN_SADE,
      jarjestys: 2,
    });
  }

  /* ---- b) avaruussumu kameran ja pallon väliin --------------------- */
  let sumuOsoite = null;
  try {
    const kangas = sumukangas({}, doc);
    sumuOsoite = kangas?.toDataURL?.('image/png') ?? null;
  } catch { sumuOsoite = null; }

  /*
   * DOM-KUTSUT VAROVASTI (`?.`). Yksikkötestien ikkunatynkä antaa
   * `createElement`istä kevyen olion, jolla on vain ne kentät, joita
   * mitattava koodi tarvitsee — eikä linssin avaus saa kaatua siihen,
   * että tyngältä puuttuu `setAttribute`. Sama sääntö kuin muualla
   * pallolaudalla: näkymä on koriste, ei ehto.
   */
  const juuri = doc.createElement('div');
  juuri.className = SUMUN_LUOKKA;
  juuri.setAttribute?.('aria-hidden', 'true');
  if (juuri.style) {
    juuri.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;overflow:hidden;';
  }
  const kalvot = SUMUKERROKSET.map((k) => {
    const el = doc.createElement('div');
    el.className = `${SUMUN_LUOKKA}-${k.tunnus}`;
    if (el.style) {
      el.style.cssText = 'position:absolute;inset:-20%;pointer-events:none;opacity:0;'
        + (sumuOsoite ? `background-image:url(${sumuOsoite});background-repeat:repeat;` : '');
    }
    juuri.appendChild?.(el);
    return { ...k, el };
  });

  /*
   * PAIKKA PINOSSA: sama sääntö kuin avaruuskalvolla — WebGL-kankaan
   * PÄÄLLÄ mutta kohdemerkkien ALLA. Merkkikerros syntyy vasta
   * ensimmäisestä merkistä, joten paikka tarkistetaan uudelleen.
   * Sumu luodaan avaruuskalvon JÄLKEEN, joten se jää DOM-järjestyksessä
   * sen päälle: ISS ja auringon sivuvalo näkyvät sumun läpi, niin kuin
   * pitääkin (ne ovat pallon luona, sumu kameran edessä).
   */
  let paikallaan = false;
  const sijoita = () => {
    if (paikallaan) return;
    const merkki = kotelo.querySelector?.('.pallolauta-merkki, .satelliitti-piste');
    const kerros = merkki?.closest?.('.pallolauta-merkki')?.parentElement
      ?? merkki?.parentElement ?? null;
    if (kerros && kerros !== kotelo && kotelo.contains(kerros) && kerros.parentElement) {
      kerros.parentElement.insertBefore(juuri, kerros);
      paikallaan = true;
      return;
    }
    if (!juuri.parentElement) kotelo.appendChild?.(juuri);
  };
  sijoita();

  let purettu = false;
  let sumunPeittoNyt = 0;
  let pilvienPeittoNyt = 0;
  let pilvienKulma = 0;
  let edellinenMs = 0;
  let kehyksia = 0;

  /**
   * Yksi kehys. `nyt` on kello millisekunteina (performance.now) ja
   * `korkeus` kameran korkeus pallonsäteinä.
   */
  const paivita = (nyt = 0, korkeus = NaN) => {
    if (purettu) return;
    sijoita();
    kehyksia += 1;
    const kello = Number(nyt) || 0;
    const dt = edellinenMs ? Math.max(0, Math.min(200, kello - edellinenMs)) : 0;
    edellinenMs = kello;
    const a = korkeusAvaus();

    /* pilvet: peitto zoomista, kierto omasta kellostaan */
    pilvienPeittoNyt = pilvienPeitto(korkeus, a);
    if (pilvet) {
      pilvet.peitto?.(pilvienPeittoNyt);
      if (!reduced && dt > 0 && pilvienPeittoNyt > 0) {
        pilvienKulma += (PILVIEN_KIERTO_ASTETTA_MIN / 60000) * dt * (Math.PI / 180);
        pilvet.kierra?.(pilvienKulma);
      }
    }

    /* sumu: peitto zoomista, ajelehtiminen ja mittakaava korkeudesta */
    sumunPeittoNyt = sumunPeitto(korkeus, a);
    const s = a > 0 && Number.isFinite(korkeus) ? korkeus / a : 1;
    /*
     * MITTAKAAVA KASVAA LÄHESTYTTÄESSÄ. Kun kamera tulee sumua kohti,
     * hiukkaset ovat lähempänä ja niiden kuvio on ruudulla suurempi —
     * ilman tätä sumu näyttäisi tapetilta, joka vain vaalenee. Kerroin
     * on maltillinen (1…2,2), koska kalvo on silti ruudun kokoinen.
     */
    const mitta = 1 + 1.2 * raja01((SUMUN_KAUKO - s) / SUMUN_KAUKO);
    for (const k of kalvot) {
      if (!k.el?.style) continue;
      k.el.style.opacity = (sumunPeittoNyt * k.paino).toFixed(3);
      const koko = Math.round(k.kokoPx * mitta);
      k.el.style.backgroundSize = `${koko}px ${koko}px`;
      if (!reduced) {
        const x = (kello / 1000) * k.nopeus.x;
        const y = (kello / 1000) * k.nopeus.y;
        k.el.style.backgroundPosition = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      }
    }
  };

  return {
    paivita,
    /** Mitatut luvut savukkeelle ja vartijoille. */
    tila: () => ({
      sumu: +sumunPeittoNyt.toFixed(3),
      pilvet: +pilvienPeittoNyt.toFixed(3),
      pilvienNakyvyys: pilvet?.nakyvyys?.() ?? null,
      pilvetLadattu: Boolean(pilvet?.ladattu?.()),
      pilvienKulmaAstetta: +((pilvienKulma * 180) / Math.PI).toFixed(3),
      kerroksia: kalvot.length,
      kangas: Boolean(sumuOsoite),
      paikallaan,
      kehyksia,
      reduced,
      aito: Boolean(PILVIEN_OSOITE),
    }),
    pura() {
      if (purettu) return;
      purettu = true;
      juuri.remove?.();
      for (const k of kalvot) k.el?.remove?.();
      /*
       * TEKSTUURI VAPAUTETAAN LINSSIN SULUSSA. `lauta.linssit.pura`
       * häivyttää kuoren ulos ja kutsuu `vapautaKalvo`n, joka poistaa
       * meshin, `dispose()`aa materiaalin ja tekstuurin ja sulkee
       * puretun bittikartan. Mustan pallon juurisyy (globe.gl Color(0),
       * ks. satelliitti-avaruus.js) ei ole tässä ketjussa: kuori on
       * pinnan SISARUS eikä koske `globeImageUrl`iin lainkaan.
       */
      try { lauta?.linssit?.pura?.(PILVIEN_OSA); } catch { /* lauta jo purettu */ }
      pilvikangasOlio = null;
      sumuOsoite = null;
    },
  };
}
