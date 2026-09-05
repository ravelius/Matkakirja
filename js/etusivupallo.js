/*
 * ETUSIVUN ESIRENDERÖITY PALLO (pallolauta, vaihe 5a).
 *
 * OMISTAJAN TILAUS 5.9.2026, sanatarkasti: *"etusivun kartan voi pitää
 * aluksi vielä vanhassa mutta sitten kun ehditään tehdä uusi, niin
 * siihen kannattaa varmaan renderöidä oma spesifi zoomattu pallo joka
 * pyörii hitaasti lontoosta kohti aasiaa, mutta on jo renderöity
 * blurrattuna, jotta efekti ei vie etusivulla tehoja. ja siinä
 * lentokone voisi lentää eri kaupunkien välillä samalla kun pallo
 * pyörii ja piirtää paksua punaista viivaa ja aina ei kaupunkien
 * välillä kun kone laskeutuu, tulee uusi isoisän aikalaiskuva jonnekin
 * kartan ulkopuolelle pienellä, niin että ei jää etusivun tekstin
 * päälle. kone jatkaa automaattisesti lentoa uuteen kohteeseen
 * pysähtymättä, muuttaa vain hieman suuntaa."*
 * (Raamattu: PELAAJAN LAUTAKYTKIN, VANHIN MAAILMANKUVA -LINSSI,
 * ETUSIVUN PALLO, kohta 3; docs/moduulit/karttapallo.md luku 0 kohta 5
 * ja luku 7 vaihe 5.)
 *
 * ── MIKÄ ON ESIRENDERÖITY, MIKÄ ELÄÄ ───────────────────────────────
 *
 * PALLO ON VIDEO. Kuvasarja on poltettu valmiiksi työkalulla
 * tools/tee-etusivupallo.mjs (Globe.gl + pelin omat laatat headless-
 * Chromiumissa), sumennettu jo poltossa ja pakattu kahdeksi videoksi
 * (VP9/WebM ja H.264/MP4) ämpäriin. Etusivulla ei siis ole WebGL:ää,
 * ei laattapyyntöjä eikä kirjastoa — vain yksi <video>, jonka selain
 * purkaa raudalla. Tämä on omistajan ehto "jotta efekti ei vie
 * etusivulla tehoja".
 *
 * KONE, VIIVA JA KUVAT ELÄVÄT. Niiden paikka lasketaan joka kehyksellä
 * pallon pinnalta samalla perspektiivikameralla, jolla video
 * poltettiin — kevyttä trigonometriaa, ei WebGL:ää. Videon aika ↔
 * kameran pituusaste on tunnettu, koska sekä työkalu että tämä moduuli
 * laskevat kameran samasta funktiosta (kameranNakyma) ja samasta
 * reitistä, joka on kirjattu ämpärin luetteloon (etusivu.json).
 * Luettelo on totuus: video on poltettu niillä koordinaateilla, jotka
 * siinä lukevat.
 *
 * ── VARAPOLUT ──────────────────────────────────────────────────────
 *
 *   ei lippua      → ei mitään (oletus on POIS, kunnes omistaja on
 *                    nähnyt tämän; kehittäjävalikon vipu "etusivupallo")
 *   ei verkkoa     → luettelo tai video ei lataudu → kerros puretaan ja
 *                    etusivu jää ENNALLEEN (vanha pienoiskartta)
 *   dist/          → dynaaminen tuonti kaatuu js/ui.js:ssä (kuten
 *                    linsseillä ja pallolaudalla) → vanha etusivu
 *   reduced motion → yksi pysäytyskuva (juliste) ja kone paikallaan
 */

import { laudaltaAsteiksi } from './fokusmitat.js';
import { PEILI_JUURI } from './media.js';
import { ISOISAN_VALOKUVAT, rajausTyyli, valokuvanKuvateksti } from './isoisan-valokuvat.js';

/* ==================== LIPPU ======================================= */

/**
 * Pelaajan/kehittäjän lippu (localStorage). Oletus POIS: vain '1'
 * kytkee etusivun pallon päälle. Sama malli kuin sivunkääntö
 * (js/sivunkaanto.js) ja lautavalinta (js/ui-apurit.js), mutta
 * käänteisellä oletuksella — omistaja ei ole vielä nähnyt tätä.
 */
export const ETUSIVUPALLO_AVAIN = 'matkakirja-etusivupallo';

/** URL-parametri ohittaa muistin savukkeita ja esittelyä varten. */
export function etusivupalloOsoitteesta(win = globalThis) {
  try {
    const arvo = new URLSearchParams(win.location?.search ?? '').get('etusivupallo');
    if (arvo === null) return null;
    return arvo !== '0' && arvo !== 'ei';
  } catch {
    return null;
  }
}

/** Onko etusivun pallo kytketty päälle? (URL › muisti › oletus pois) */
export function etusivupalloPaalla(win = globalThis) {
  const osoitteesta = etusivupalloOsoitteesta(win);
  if (osoitteesta !== null) return osoitteesta;
  try {
    return win.localStorage?.getItem(ETUSIVUPALLO_AVAIN) === '1';
  } catch {
    return false;
  }
}

/** Kytkee etusivun pallon päälle ('1') tai pois (avain poistuu). */
export function asetaEtusivupallo(paalla, win = globalThis) {
  try {
    if (paalla) win.localStorage?.setItem(ETUSIVUPALLO_AVAIN, '1');
    else win.localStorage?.removeItem(ETUSIVUPALLO_AVAIN);
  } catch {
    /* yksityinen tila */
  }
}

/* ==================== ÄMPÄRIN POLUT =============================== */

/**
 * Videosarjan versio = kansio ämpärissä. Työkalu kirjoittaa saman
 * version luetteloon, ja kerros kieltäytyy, jos versiot eivät täsmää:
 * väärällä videolla kone lentäisi väärässä paikassa.
 */
export const ETUSIVUPALLO_VERSIO = '2026-09-05b';
export const ETUSIVUPALLO_JUURI = `${PEILI_JUURI}julisteet/etusivu/${ETUSIVUPALLO_VERSIO}/`;
export const ETUSIVUPALLO_LUETTELO = `${ETUSIVUPALLO_JUURI}etusivu.json`;
/**
 * Tiedostonimet ämpärissä (työkalu kirjoittaa samat). Juliste on JPEG
 * eikä WebP: se on videon poster-attribuutti ja reduced motionin ainoa
 * kuva, joten sen on latauduttava kaikkialla ilman varapolkuja.
 */
export const ETUSIVUPALLO_TIEDOSTOT = {
  webm: 'pallo.webm',
  mp4: 'pallo.mp4',
  juliste: 'juliste.jpg',
};

/* ==================== REITTI JA KAMERA ============================ */

/*
 * REITTI ON ISOISÄN 1873 (docs/tarina.md): Lontoosta itään kohti
 * Aasiaa. Tunnukset ovat pelin omat kaupunkitunnukset
 * (js/packs/maailmankartta.js) — Bombay on pelissä 'mumbai' ja
 * Jokohaman satama 'tokio', muut ovat nimensä näköisiä.
 */
export const ETUSIVUN_REITTI = [
  'lontoo', 'pariisi', 'wien', 'istanbul', 'kairo', 'mumbai', 'singapore', 'hongkong', 'tokio',
];

/**
 * Kamera: korkeus pallon säteinä (Globe.gl pointOfView), pystykulma
 * (three.js oletus 50°) ja lievä kallistus — kamera katsoo koneen
 * leveyspiiriä loivemmalta kulmalta, jotta Eurooppa on ylhäällä ja
 * Aasia keskellä. Sama olio ohjaa polttoa ja tätä kerrosta.
 */
export const ETUSIVUN_KAMERA = {
  korkeus: 1.55,
  fov: 50,
  /** Kameran leveysaste = kerroin × koneen (silotettu) leveysaste. */
  latKerroin: 0.62,
  latMin: 2,
  latMax: 38,
  /** Silotusikkuna sekunteina: kamera seuraa konetta pehmeästi. */
  silotusS: 3.4,
};

/** Jakson kesto: pohja + matka asteina. Antaa noin 40 s kierroksen. */
export const JAKSON_POHJA_S = 1.2;
export const JAKSON_ASTE_S = 0.2;
/** Kierroksen sauman häivytys (s): video häipyy paperiin ja takaisin. */
export const HAIVYTYS_S = 1.1;
/** Jäljen näytteenotto asteina (isoympyrää pitkin). */
export const JALJEN_ASKEL_ASTE = 1.5;

const RAD = Math.PI / 180;
const asteiksi = (r) => r / RAD;

/** Pituusaste välille (−180, 180]. */
export function kaariAste(a) {
  let x = a;
  while (x > 180) x -= 360;
  while (x <= -180) x += 360;
  return x;
}

const yksikko = (lat, lon) => {
  const a = lat * RAD;
  const b = lon * RAD;
  return [Math.cos(a) * Math.sin(b), Math.sin(a), Math.cos(a) * Math.cos(b)];
};
const piste3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const risti = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const normi = (a) => {
  const p = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / p, a[1] / p, a[2] / p];
};

/** Kahden pisteen isoympyräetäisyys asteina. */
export function kaarietaisyys(a, b) {
  const kulma = Math.acos(Math.min(1, Math.max(-1,
    piste3(yksikko(a.lat, a.lon), yksikko(b.lat, b.lon)))));
  return asteiksi(kulma);
}

/**
 * Isoympyrän piste (slerp) osuudella u. Pituusaste palautetaan
 * JATKUVANA lähtöpisteen ympärillä (ei hyppyä ±180° kohdalla), jotta
 * kameran silotus ja jäljen piirto eivät katkea.
 */
export function suurympyra(a, b, u) {
  const va = yksikko(a.lat, a.lon);
  const vb = yksikko(b.lat, b.lon);
  const kulma = Math.acos(Math.min(1, Math.max(-1, piste3(va, vb))));
  let p;
  if (kulma < 1e-6) {
    p = va;
  } else {
    const s = Math.sin(kulma);
    const k1 = Math.sin((1 - u) * kulma) / s;
    const k2 = Math.sin(u * kulma) / s;
    p = [va[0] * k1 + vb[0] * k2, va[1] * k1 + vb[1] * k2, va[2] * k1 + vb[2] * k2];
  }
  const lat = asteiksi(Math.asin(Math.min(1, Math.max(-1, p[1]))));
  const lonRaaka = asteiksi(Math.atan2(p[0], p[2]));
  return { lat, lon: a.lon + kaariAste(lonRaaka - a.lon) };
}

/**
 * Reitin kaupungit asteina pelin omasta paketista: lauta (x, y) on
 * ainoa paikkatotuus (karttapallo.md luku 1), joten asteet lasketaan
 * js/fokusmitat.js laudaltaAsteiksi-funktiolla eikä talleteta mihinkään.
 * Pituusasteet jatkuvina, jotta reitti kulkee idän suuntaan.
 */
export function reitinPisteet(pack, tunnukset = ETUSIVUN_REITTI) {
  const kaupungit = new Map((pack?.cities ?? []).map((c) => [c.id, c]));
  const ulos = [];
  for (const id of tunnukset) {
    const c = kaupungit.get(id);
    if (!c) continue;
    const p = laudaltaAsteiksi(pack.id, c.x, c.y);
    if (!p) continue;
    const edellinen = ulos[ulos.length - 1];
    const lon = edellinen ? edellinen.lon + kaariAste(p.lon - edellinen.lon) : p.lon;
    ulos.push({ id, nimi: c.name, lat: p.lat, lon });
  }
  return ulos;
}

/**
 * Reitin jaksot ja koko kierroksen kesto. Jakson kesto on suhteessa
 * matkaan, joten kone lentää tasaista vauhtia eikä pysähdy kaupunkiin
 * (omistaja: *"kone jatkaa automaattisesti lentoa uuteen kohteeseen
 * pysähtymättä"*).
 */
export function reitinJaksot(pisteet) {
  const jaksot = [];
  let alku = 0;
  for (let i = 0; i + 1 < pisteet.length; i++) {
    const matka = kaarietaisyys(pisteet[i], pisteet[i + 1]);
    const kesto = JAKSON_POHJA_S + matka * JAKSON_ASTE_S;
    jaksot.push({ a: pisteet[i], b: pisteet[i + 1], matka, alku, kesto });
    alku += kesto;
  }
  return { jaksot, kesto: alku };
}

/** Valmis reitti: pisteet, jaksot ja kesto yhdessä oliossa. */
export function teeReitti(pisteet) {
  const { jaksot, kesto } = reitinJaksot(pisteet);
  return { pisteet, jaksot, kesto };
}

/** Koneen paikka hetkellä t (s). Palauttaa myös jakson ja osuuden. */
export function koneenTila(reitti, t) {
  const jaksot = reitti.jaksot;
  if (!jaksot.length) return { lat: 0, lon: 0, jakso: 0, osuus: 0 };
  const aika = Math.min(Math.max(t, 0), reitti.kesto);
  let i = jaksot.length - 1;
  while (i > 0 && aika < jaksot[i].alku) i -= 1;
  const j = jaksot[i];
  const osuus = Math.min(1, Math.max(0, (aika - j.alku) / j.kesto));
  const p = suurympyra(j.a, j.b, osuus);
  return { lat: p.lat, lon: p.lon, jakso: i, osuus };
}

/**
 * Kameran näkymä hetkellä t: koneen paikka SILOTETTUNA (liukuva
 * keskiarvo ±silotusS), jotta pallo pyörii tasaisesti eikä nytkähdä
 * jokaisen kaupungin kohdalla. Kone liikkuu tämän suhteen — juuri se
 * on omistajan *"lentokone lentää kaupunkien välillä samalla kun pallo
 * pyörii"*.
 */
export function kameranNakyma(reitti, t, kamera = ETUSIVUN_KAMERA) {
  const n = 9;
  let lat = 0;
  let lon = 0;
  for (let i = 0; i < n; i++) {
    const osuus = i / (n - 1);
    const hetki = t + (osuus * 2 - 1) * kamera.silotusS;
    const p = koneenTila(reitti, hetki);
    lat += p.lat;
    lon += p.lon;
  }
  lat /= n;
  lon /= n;
  const kallistus = Math.min(kamera.latMax, Math.max(kamera.latMin, lat * kamera.latKerroin));
  return { lat: kallistus, lon, korkeus: kamera.korkeus };
}

/**
 * Pallon pinnan piste ruudulle. Sama perspektiivikamera kuin
 * Globe.gl:llä: kamera etäisyydellä D = 1 + korkeus pallon säteinä,
 * pystykulma fov, kuvan korkeus = kankaan korkeus.
 *
 * mitat: { leveys, korkeus, lava, fov } — `lava` on renderöidyn
 * (neliömäisen) kankaan sivu ja leveys/korkeus siitä rajattu kuva;
 * sumennus levittää reunat, joten kuva rajataan lavan keskeltä.
 *
 * Palauttaa myös `nakyy`: pallon takapuolella oleva piste ei ole
 * näkyvissä (näkyvän kalotin ehto cos ≥ 1/D).
 */
export function pallonPiste(paikka, kamera, mitat) {
  const lava = mitat.lava ?? Math.max(mitat.leveys, mitat.korkeus);
  const fov = mitat.fov ?? ETUSIVUN_KAMERA.fov;
  const D = 1 + (kamera.korkeus ?? ETUSIVUN_KAMERA.korkeus);
  const c = yksikko(kamera.lat, kamera.lon);
  const p = yksikko(paikka.lat, paikka.lon);
  const oikea = normi(risti([0, 1, 0], c));
  const ylos = risti(c, oikea);
  const syvyys = D - piste3(p, c);
  const f = (lava / 2) / Math.tan((fov * RAD) / 2);
  const x = lava / 2 + (f * piste3(p, oikea)) / syvyys - (lava - mitat.leveys) / 2;
  const y = lava / 2 - (f * piste3(p, ylos)) / syvyys - (lava - mitat.korkeus) / 2;
  return { x, y, nakyy: piste3(p, c) >= 1 / D };
}

/**
 * Lennetty jälki näytteinä hetkeen t asti (isoympyrää pitkin, noin
 * JALJEN_ASKEL_ASTE:n välein). Viimeinen näyte on kone itse.
 */
export function jaljenPisteet(reitti, t, askel = JALJEN_ASKEL_ASTE) {
  const kone = koneenTila(reitti, t);
  const ulos = [];
  for (let i = 0; i <= kone.jakso; i++) {
    const j = reitti.jaksot[i];
    const loppu = i === kone.jakso ? kone.osuus : 1;
    const naytteita = Math.max(1, Math.ceil((j.matka * loppu) / askel));
    for (let k = 0; k <= naytteita; k++) {
      if (i > 0 && k === 0) continue; // sama piste kuin edellisen jakson loppu
      ulos.push(suurympyra(j.a, j.b, (loppu * k) / naytteita));
    }
  }
  return ulos;
}

/** Monesko kaupunki on saavutettu hetkeen t mennessä (0 = ei yhtään). */
export function saapumisia(reitti, t) {
  let n = 0;
  for (const j of reitti.jaksot) if (t >= j.alku + j.kesto) n += 1;
  return n;
}

/* ==================== ISOISÄN AIKALAISKUVAT ======================= */

/*
 * KUVAT KIERTÄVÄT (js/isoisan-valokuvat.js). Kuvaputki on tuottanut
 * toistaiseksi kaksi albumiinivedosta (Bombay ja Kanton), joten
 * laskeutumisilla kierrätetään niitä vuorotellen; kun uusia
 * aikalaiskuvia tulee, ne lisätään ISOISAN_VALOKUVAT-tauluun ja tämä
 * kierto pitenee itsestään.
 */
export const ETUSIVUN_KUVAKIERTO = ['bombay', 'kanton'];

/** Monennenko laskeutumisen kuva (1 = ensimmäinen kohde Lontoon jälkeen). */
export function saapumisenKuva(nro, kierto = ETUSIVUN_KUVAKIERTO) {
  const avaimet = kierto.filter((k) => ISOISAN_VALOKUVAT[k]);
  if (!avaimet.length || nro < 1) return null;
  const avain = avaimet[(nro - 1) % avaimet.length];
  return { avain, kuva: ISOISAN_VALOKUVAT[avain] };
}

/*
 * KUVA KARTAN ULKOPUOLELLE, EI TEKSTIN PÄÄLLE (omistaja sanatarkasti).
 * Ehdokaspaikat ovat pallolohkon neljä nurkkaa; valitaan se, joka
 * leikkaa vähiten avaustekstin laatikoita (juliste, palsta) — ja
 * tasapelissä eri puoli kuin edellinen kuva, jotta kuvat vaihtelevat
 * laidasta laitaan. Puhdas funktio: testi ajaa tämän ilman selainta.
 */
export const KUVAPAIKAT = ['vasen', 'oikea'];
/** Pystyhaun askel kuvapaikkaa etsittäessä (px). */
export const KUVAHAUN_ASKEL = 8;

function leikkaus(a, b) {
  const w = Math.min(a.x + a.leveys, b.x + b.leveys) - Math.max(a.x, b.x);
  const h = Math.min(a.y + a.korkeus, b.y + b.korkeus) - Math.max(a.y, b.y);
  return w > 0 && h > 0 ? w * h : 0;
}

/**
 * Kuva PIENENEE, kunnes se mahtuu vapaaseen nurkkaan. Puhelimella
 * julisteotsikko täyttää lohkon keskiosan, joten täysikokoinen kortti
 * leikkaisi sitä joka nurkassa — omistajan ehto on, ettei kuva jää
 * tekstin päälle, ja "pienellä" on omistajan oma sana.
 */
export const KUVAN_KUTISTUS = [1, 0.86, 0.74, 0.62, 0.52];

/**
 * Kuvan paikka ja koko: { paikka, x, y, leveys, korkeus, leikkaus }.
 *
 * Kotelo on KOKO avausnäkymä (.intro), ei pelkkä pallolohko: puhelimella
 * julisteotsikko täyttää lohkon keskiosan, ja ainoa vapaa kaista on
 * pallon alalaidan ja avaustekstin arkin välissä. Siksi kuva haetaan
 * laidoilta pystysuunnassa skannaten sen sijaan että se lyötäisiin
 * nurkkaan: ensin täydellä koolla, sitten kutistaen. Esteet ovat
 * laatikoita kotelon koordinaateissa (julisteotsikko, avaustekstin
 * palsta), ja `toivottuY` vetää kuvan pallon alalaitaan, jotta se on
 * kartan vieressä eikä satunnaisessa kohdassa.
 */
export function valitseKuvapaikka(kotelo, koko, esteet = [], edellinen = null, reunus = 6) {
  const toivottu = Number.isFinite(kotelo.toivottuY)
    ? kotelo.toivottuY : kotelo.korkeus - koko.korkeus - reunus;
  let paras = null;
  for (const kutistus of KUVAN_KUTISTUS) {
    const mitta = {
      leveys: Math.round(koko.leveys * kutistus),
      korkeus: Math.round(koko.korkeus * kutistus),
    };
    const ylin = kotelo.korkeus - mitta.korkeus - reunus;
    if (ylin < reunus) continue;
    for (const paikka of KUVAPAIKAT) {
      const x = paikka === 'vasen' ? reunus : kotelo.leveys - mitta.leveys - reunus;
      for (let y = reunus; y <= ylin; y += KUVAHAUN_ASKEL) {
        const laatikko = {
          x, y, leveys: mitta.leveys, korkeus: mitta.korkeus,
        };
        const summa = esteet.reduce((s, e) => s + leikkaus(laatikko, e), 0);
        const vaihtaaPuolta = !edellinen || paikka !== edellinen;
        // Leikkaus ratkaisee ensin, sitten läheisyys toivottuun kohtaan
        // ja viimeisenä puolen vaihto (kuvat vuorottelevat laidasta laitaan).
        const pisteet = summa * 1000 + Math.abs(y - toivottu) + (vaihtaaPuolta ? 0 : 40);
        if (!paras || pisteet < paras.pisteet - 1e-9) {
          paras = {
            paikka, x, y, leikkaus: summa, pisteet, ...mitta,
          };
        }
      }
    }
    // Vapaa kaista löytyi tällä koolla — ei kutisteta turhaan.
    if (paras && paras.leikkaus <= 0) break;
  }
  return paras;
}

/* ==================== KERROS ETUSIVULLE =========================== */

/** Koneen piirros — sama runko kuin aloituslennolla (js/ui.js). */
const KONEEN_POLKU = 'M14,0 L-6,0 M-10,0 L-14,0 M2,0 L-8,-9 L-4,-9 L6,0 L-4,9 L-8,9 z '
  + 'M-11,0 L-15,-5 L-13,-5 L-9,0 L-13,5 L-15,5 z';
/** Koneen koko videon pikseleinä (skaalautuu kerroksen mukana). */
const KONEEN_SKAALA = 1.15;
/** Kuvan leveys kotelon lyhyemmästä sivusta. */
const KUVAN_OSUUS = 0.26;
const KUVAN_LEVEYS_MIN = 66;
const KUVAN_LEVEYS_MAX = 116;
/** Kuvan vaihdon häivytys (ms): vanha pois, uusi tilalle. */
const KUVAN_VAIHTO_MS = 360;

const svgEl = (nimi, attrit = {}, vanhempi = null) => {
  const el = document.createElementNS('http://www.w3.org/2000/svg', nimi);
  for (const [k, v] of Object.entries(attrit)) el.setAttribute(k, String(v));
  if (vanhempi) vanhempi.appendChild(el);
  return el;
};

/** Liike vähennettynä: yksi pysäytyskuva ja kone paikallaan. */
export function liikeVahennetty(win = globalThis) {
  try {
    return Boolean(win.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  } catch {
    return false;
  }
}

/** Luettelo ämpäristä. Null, jos sitä ei saada tai versio ei täsmää. */
export async function lueLuettelo(haku = globalThis.fetch, osoite = ETUSIVUPALLO_LUETTELO) {
  try {
    const vastaus = await haku(osoite, { cache: 'force-cache' });
    if (!vastaus?.ok) return null;
    const luettelo = await vastaus.json();
    if (!luettelo || luettelo.versio !== ETUSIVUPALLO_VERSIO) return null;
    if (!Array.isArray(luettelo.reitti) || luettelo.reitti.length < 2) return null;
    if (!(luettelo.kesto > 0) || !luettelo.mitat?.leveys) return null;
    return luettelo;
  } catch {
    return null;
  }
}

/**
 * Rakentaa kerroksen ja käynnistää animaation. Palauttaa ohjaimen
 * (`pura`) tai null, jos aineistoa ei saatu — silloin etusivu jää
 * ennalleen.
 */
export async function avaaEtusivupallo(kotelo, asetukset = {}) {
  const {
    haku = globalThis.fetch?.bind(globalThis),
    win = globalThis,
    vahennettyLiike = liikeVahennetty(win),
    esteet = () => [],
  } = asetukset;
  const luettelo = await lueLuettelo(haku);
  if (!luettelo || !kotelo?.isConnected) return null;

  const reitti = teeReitti(luettelo.reitti);
  const mitat = { ...luettelo.mitat, fov: luettelo.mitat.fov ?? ETUSIVUN_KAMERA.fov };
  const kamera = { ...ETUSIVUN_KAMERA, ...(luettelo.kamera ?? {}) };
  const kesto = luettelo.kesto;

  const juuri = document.createElement('div');
  juuri.className = 'etusivupallo';
  juuri.setAttribute('aria-hidden', 'true');

  /*
   * Pallo: video tekstin TAAKSE. Sama rajaus kuin SVG:llä
   * (preserveAspectRatio="xMidYMid meet" ≡ object-fit: contain), joten
   * koneen ruutupiste osuu videon pikseliin ilman omaa
   * sovitusmatematiikkaa.
   */
  const video = document.createElement('video');
  video.className = 'etusivupallo-video';
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.autoplay = !vahennettyLiike;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('muted', '');
  video.preload = 'auto';
  video.poster = `${ETUSIVUPALLO_JUURI}${ETUSIVUPALLO_TIEDOSTOT.juliste}`;
  for (const [tyyppi, tiedosto] of [
    ['video/webm', ETUSIVUPALLO_TIEDOSTOT.webm],
    ['video/mp4', ETUSIVUPALLO_TIEDOSTOT.mp4],
  ]) {
    const lahde = document.createElement('source');
    lahde.type = tyyppi;
    lahde.src = `${ETUSIVUPALLO_JUURI}${tiedosto}`;
    video.appendChild(lahde);
  }

  const juliste = document.createElement('img');
  juliste.className = 'etusivupallo-juliste';
  juliste.decoding = 'async';
  juliste.alt = '';
  juliste.src = `${ETUSIVUPALLO_JUURI}${ETUSIVUPALLO_TIEDOSTOT.juliste}`;

  juuri.appendChild(vahennettyLiike ? juliste : video);

  const svg = svgEl('svg', {
    class: 'etusivupallo-reitti',
    viewBox: `0 0 ${mitat.leveys} ${mitat.korkeus}`,
    preserveAspectRatio: 'xMidYMid meet',
  }, juuri);
  const viiva = svgEl('path', { class: 'etusivupallo-viiva', d: '' }, svg);
  const kone = svgEl('g', { class: 'etusivupallo-kone' }, svg);
  svgEl('path', { class: 'etusivupallo-koneen-runko', d: KONEEN_POLKU }, kone);

  kotelo.insertBefore(juuri, kotelo.firstChild);

  /*
   * Isoisän kortti asuu KOKO avausnäkymässä eikä pallolohkossa: ainoa
   * vapaa kaista puhelimella on pallon alalaidan ja avaustekstin arkin
   * välissä, ja lohkon oma overflow leikkaisi kortin siitä poikki.
   */
  const paneeli = kotelo.closest?.('.intro') ?? kotelo;
  const kuvakortti = document.createElement('figure');
  kuvakortti.className = 'etusivupallo-kuva';
  const kuvaEl = document.createElement('img');
  kuvaEl.className = 'isoisa-rajattu';
  kuvaEl.decoding = 'async';
  kuvaEl.draggable = false;
  const lappu = document.createElement('figcaption');
  kuvakortti.append(kuvaEl, lappu);
  paneeli.appendChild(kuvakortti);

  /* ---------- piirto ---------- */

  let purettu = false;
  let kehys = 0;
  let edellinenKuva = 0;
  let edellinenPaikka = null;
  let edellinenAika = 0;

  const kuvanKoko = () => {
    const lyhyt = Math.min(juuri.clientWidth || 320, juuri.clientHeight || 320);
    const leveys = Math.round(Math.min(KUVAN_LEVEYS_MAX,
      Math.max(KUVAN_LEVEYS_MIN, lyhyt * KUVAN_OSUUS)));
    // Kortti on hieman korkeampi kuin leveä (cabinet card) + kuvateksti.
    return { leveys, korkeus: Math.round(leveys * 1.42) };
  };

  /*
   * Kortin paikka MITATAAN eikä arvata: kortin todellinen korkeus
   * riippuu kuvan mittasuhteesta ja kuvatekstin riveistä, ja kallistus
   * (css rotate) kasvattaa sen ulkolaatikkoa. Siksi sijoitus tehdään
   * kortin omasta getBoundingClientRectistä (joka sisältää kallistuksen)
   * ja korjataan kerran, jos kortti jouduttiin kutistamaan. Sama funktio
   * ajetaan uudestaan, kun avaustekstin koko muuttuu (fitIntro säätää
   * julisteotsikon kirjasinkokoa vielä ilmestymisen jälkeen).
   */
  const sijoitaKuva = () => {
    if (purettu || !kuvakortti.isConnected || !juuri.isConnected) return;
    const paneelinLaatikko = paneeli.getBoundingClientRect();
    const oma = juuri.getBoundingClientRect();
    if (!(paneelinLaatikko.width > 0) || !(paneelinLaatikko.height > 0)) return;
    const tila = esteet(paneeli);
    for (let kierros = 0; kierros < 2; kierros++) {
      const r = kuvakortti.getBoundingClientRect();
      if (!(r.width > 0) || !(r.height > 0)) return;
      const paikka = valitseKuvapaikka({
        leveys: paneelinLaatikko.width,
        korkeus: paneelinLaatikko.height,
        toivottuY: oma.bottom - paneelinLaatikko.top - r.height - 6,
      }, { leveys: r.width, korkeus: r.height }, tila, edellinenPaikka);
      if (!paikka) return;
      // Kallistus levittää ulkolaatikkoa tasan kummallekin puolelle,
      // joten asettelulaatikko siirretään puolikkaan verran sisään.
      const lisaX = (r.width - kuvakortti.offsetWidth) / 2;
      const lisaY = (r.height - kuvakortti.offsetHeight) / 2;
      kuvakortti.style.left = `${Math.round(paikka.x + lisaX)}px`;
      kuvakortti.style.top = `${Math.round(paikka.y + lisaY)}px`;
      edellinenPaikka = paikka.paikka;
      if (paikka.leveys >= r.width - 0.5) break;
      // Kutistettiin: sama suhde asettelulaatikkoon ja mitataan uudestaan.
      kuvakortti.style.width = `${Math.round(kuvakortti.offsetWidth * (paikka.leveys / r.width))}px`;
    }
  };

  const naytaKuva = (nro) => {
    const valinta = saapumisenKuva(nro);
    if (!valinta) return;
    kuvakortti.classList.remove('nakyy');
    win.setTimeout(() => {
      if (purettu) return;
      kuvaEl.src = valinta.kuva.osoite;
      kuvaEl.alt = valinta.kuva.selite;
      kuvaEl.style.cssText = rajausTyyli(valinta.kuva);
      lappu.textContent = valokuvanKuvateksti(valinta.kuva);
      kuvakortti.style.width = `${kuvanKoko().leveys}px`;
      sijoitaKuva();
      kuvakortti.classList.add('nakyy');
      // Kuva latautuu vasta nyt: korkeus voi muuttua, joten paikka
      // tarkistetaan kerran uudestaan, kun asettelu on asettunut.
      win.setTimeout(sijoitaKuva, 900);
    }, KUVAN_VAIHTO_MS);
  };

  const asettelunMuutos = () => { if (kuvakortti.classList.contains('nakyy')) sijoitaKuva(); };
  win.addEventListener?.('resize', asettelunMuutos);

  const piirraHetki = (t) => {
    const nakyma = kameranNakyma(reitti, t, kamera);
    let d = '';
    let irti = true;
    for (const p of jaljenPisteet(reitti, t)) {
      const r = pallonPiste(p, nakyma, mitat);
      if (!r.nakyy) { irti = true; continue; }
      d += `${irti ? 'M' : 'L'}${r.x.toFixed(1)},${r.y.toFixed(1)} `;
      irti = false;
    }
    viiva.setAttribute('d', d.trim());

    const nyt = koneenTila(reitti, t);
    const edella = koneenTila(reitti, Math.min(kesto, t + 0.12));
    const a = pallonPiste(nyt, nakyma, mitat);
    const b = pallonPiste(edella, nakyma, mitat);
    const suunta = Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI);
    kone.setAttribute('transform',
      `translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${suunta.toFixed(1)}) `
      + `scale(${KONEEN_SKAALA})`);
    kone.style.opacity = a.nakyy ? '1' : '0';

    /*
     * Kierroksen sauma häivytetään samalla käyrällä, joka on poltettu
     * videoon: kone ja viiva katoavat paperiin eivätkä hyppää, kun
     * kamera palaa Tokiosta Lontooseen.
     */
    const haivytys = Math.min(1, t / HAIVYTYS_S, (kesto - t) / HAIVYTYS_S);
    svg.style.opacity = Math.max(0, haivytys).toFixed(3);

    const saapunut = saapumisia(reitti, t);
    if (saapunut !== edellinenKuva) {
      edellinenKuva = saapunut;
      if (saapunut > 0) naytaKuva(saapunut);
      else kuvakortti.classList.remove('nakyy');
    }
  };

  const askel = () => {
    if (purettu) return;
    const t = (video.currentTime || 0) % kesto;
    if (t < edellinenAika) {
      // Kierros alkoi alusta: kuva häipyy pois videon sauman kanssa.
      edellinenKuva = 0;
      kuvakortti.classList.remove('nakyy');
    }
    edellinenAika = t;
    piirraHetki(t);
    kehys = win.requestAnimationFrame(askel);
  };

  if (vahennettyLiike) {
    /*
     * Yksi pysäytyskuva: kone seisoo siinä hetkessä, johon juliste on
     * poltettu, ja punainen viiva on siihen asti valmiina.
     */
    piirraHetki(luettelo.julisteAika ?? kesto / 2);
  } else {
    const valmis = await new Promise((ok) => {
      let ratkaistu = false;
      const paata = (arvo) => { if (!ratkaistu) { ratkaistu = true; ok(arvo); } };
      video.addEventListener('loadeddata', () => paata(true), { once: true });
      video.addEventListener('error', () => paata(false), { once: true });
      win.setTimeout(() => paata(video.readyState >= 2), 9000);
      try { video.load(); } catch { paata(false); }
    });
    if (!valmis || purettu || !juuri.isConnected) {
      // Video ei latautunut → etusivu jää vanhaan karttaan.
      win.removeEventListener?.('resize', asettelunMuutos);
      kuvakortti.remove();
      juuri.remove();
      return null;
    }
    try { await video.play(); } catch { /* selain kieltäytyi: kuva jää paikalleen */ }
    kehys = win.requestAnimationFrame(askel);
  }

  juuri.classList.add('nakyy');
  // Sumuverho kevenee pallon päällä (css .intro-pallolla): video on jo
  // sumennettu, eikä backdrop-filteriä kannata maksaa joka kehyksellä.
  const avaus = kotelo.closest?.('.intro') ?? null;
  avaus?.classList.add('intro-pallolla');

  return {
    juuri,
    video,
    reitti,
    mitat,
    kamera,
    kesto,
    piirraHetki,
    pura() {
      if (purettu) return;
      purettu = true;
      if (kehys) win.cancelAnimationFrame(kehys);
      try { video.pause(); } catch { /* ei väliä */ }
      video.removeAttribute('src');
      avaus?.classList.remove('intro-pallolla');
      win.removeEventListener?.('resize', asettelunMuutos);
      kuvakortti.remove();
      juuri.remove();
    },
  };
}

/**
 * YKSI KOUKKU js/ui.js:n renderIntroon. Kaikki muu (lippu, lataus,
 * varapolku, purku) on tässä moduulissa.
 */
export function paivitaEtusivupallo(ui, nakyy) {
  // Lippu luetaan joka kerta: kehittäjävalikon vipu sammuttaa kerroksen
  // ilman sivulatausta (js/main.js).
  if (!nakyy || !etusivupalloPaalla()) {
    ui.etusivupallo?.pura();
    ui.etusivupallo = null;
    return;
  }
  if (ui.etusivupallo || ui.etusivupalloAvautuu) return;
  const kotelo = ui.introKartta;
  if (!kotelo) return;
  ui.etusivupalloAvautuu = true;
  void avaaEtusivupallo(kotelo, {
    /*
     * Avaustekstin laatikot ovat esteitä: isoisän kuva ei saa jäädä
     * niiden päälle (omistaja: *"ei jää etusivun tekstin päälle"*).
     */
    esteet: (kehys) => {
      const oma = kehys.getBoundingClientRect();
      /*
       * Myös arkin säätimet ovat esteitä (kaappaus 5.9.2026: kuva jäi
       * "Laita äänet päälle" -rivin ja Aloita-napin päälle): napit,
       * äänirivi, valinnat ja linkit koko avausnäkymästä.
       */
      const intro = kehys.closest?.('#intro') ?? ui.introKartta?.closest?.('#intro') ?? null;
      const doc = kehys.ownerDocument ?? document;
      // Aloita seikkailu -portti (js/ui.js renderStartGate) on avausnäkymän
      // päällä oma kerroksensa: äänirivi, nappi ja linkki.
      const saatimet = [
        ...(intro ? intro.querySelectorAll('button, label, a, .intro-aanet, .intro-valinta') : []),
        ...doc.querySelectorAll('.start-gate-keskus, .start-aanet, .start-btn, .start-linkki'),
      ];
      return [ui.introPalsta, ui.introOtsikko, ui.introText, ...saatimet]
        .filter(Boolean)
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.width > 0 && r.height > 0)
        .map((r) => ({
          x: r.left - oma.left, y: r.top - oma.top, leveys: r.width, korkeus: r.height,
        }));
    },
  }).then((pallo) => {
    ui.etusivupalloAvautuu = false;
    if (!pallo) return;
    if (ui.dead || ui.game?.phase !== 'pickstart' || !etusivupalloPaalla()) { pallo.pura(); return; }
    ui.etusivupallo = pallo;
  }).catch(() => { ui.etusivupalloAvautuu = false; });
}
