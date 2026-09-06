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
 *
 * TÄSMENNYS 5.9.2026 klo 21.30, sanatarkasti: *"pallo saisi pyöriä koko
 * etusivun alalla. isoisän kuva saisi olla isompi ja vaihtua aina
 * samaan paikkaan."*
 *
 * TÄSMENNYS 5.9.2026 klo 21.45, sanatarkasti: *"animaatio pitää mennä
 * koko maapallon ympäri niin että se voi loopata. eli pysähtyy
 * lontooseen ja punainen viiva ottaa kiinni lopuksi."*
 *
 * TÄSMENNYS 5.9.2026 klo 22.45, sanatarkasti: *"isoisän kuvat voivat
 * olla blurrattuja ja haalealla ja jäädä tekstin alle"* ja *"ne voisivat
 * pinoutua hieman sikin sokin toistensa päälle."*
 *
 * ── ISOISÄN KUVAT POIS ETUSIVULTA (6.9.2026 klo 01.20) ─────────────
 *
 * OMISTAJAN PÄÄTÖS, sanatarkasti: *"Jätä isoisän kuvat pois
 * etusivulta"*. Kuvapino (kortit, asennot, katto, laskeutumisten
 * kuvahetket) on POISTETTU kokonaan tästä kerroksesta: etusivulla ei
 * synny pinon DOMia eikä sen tyylejä käytetä, joten kuolevaa koodia ei
 * jää ajoon. Poistettu koodi on kokonaisuudessaan versiohistoriassa
 * (viimeinen kuvallinen versio v1603:n jälkeen), joten palautus on
 * käytännössä revert.
 *
 * PAKKA JÄÄ: js/packs/etusivun-isoisakuvat.js ja tämän moduulin
 * `saapumisenKuva` / `saapumisenKaupunki` / `ETUSIVUN_KUVAKIERTO`
 * pysyvät vientinä — kuvat ovat aitoja aikalaisvedoksia ja odottavat
 * uutta käyttöpaikkaansa (albumi, lentokohtaus), eikä pakkaa haluta
 * hakea uudelleen kuvaputkelta.
 *
 * ── KUVAT TAKAISIN, MUTTA PALLON PINNALLE (6.9.2026 aamu) ──────────
 *
 * OMISTAJAN UUSI TILAUS, sanatarkasti: *"Etusivulla kuvat voisivat
 * tulla pienellä kartalle kaupungin käännöksen kohdalle ja seurata
 * kaupunkia ja lopulta häipyä sitä kautta näkyvistä. Käytä uusia
 * vaaleita kuvia. Voi olla isoisän ottamia kuvia."*
 *
 * PINO EI PALAA: kuva on nyt pieni, ankkuroitu kaupungin
 * lat/lon-pisteeseen ja lasketaan joka kehyksellä samalla
 * projektiolla kuin kone ja punainen viiva (pallonPiste +
 * videostaRuudulle). Se ilmestyy käännöksessä, seuraa kaupunkiaan
 * pallon pyöriessä ja häipyy — viimeistään kun kaupunki lähestyy
 * pallon reunaa. Ks. osio REITTIKUVAT PALLON PINNALLA.
 *
 * (Raamattu: PELAAJAN LAUTAKYTKIN, VANHIN MAAILMANKUVA -LINSSI,
 * ETUSIVUN PALLO, kohta 3; docs/moduulit/karttapallo.md luku 0 kohta 5
 * ja luku 10.3.)
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
 * ── KIERROS ON TÄSMÄLLEEN 360° (5.9.2026 ilta) ─────────────────────
 *
 * Reitti on Foggin oma maailmanympärimatka Lontoosta itään takaisin
 * Lontooseen, ja pituusasteet lasketaan JATKUVINA: viimeisen pisteen
 * pituusaste on tasan lähtöpisteen + 360°. Kamera on siksi jaksollinen
 * (koneenTila kelaa sauman yli, kameranNakyma silottaa sen läpi), joten
 * kierroksen viimeinen kehys on sama kuin ensimmäinen ja video looppaa
 * ilman saumaa — työkalu ei enää polta häivytystä videoon.
 *
 * Kierroksen lopussa kone PYSÄHTYY LONTOOSEEN (LOPPU_PITO_S:n
 * mittainen jakso ilman matkaa), jolloin punainen viiva ehtii sulkea
 * ympyrän: viivan kärki on koneen kohdalla ja viivan alkupää samassa
 * pisteessä. Vasta sen jälkeen SVG-kerros (viiva + kone) häivytetään
 * pehmeästi pois HAIVYTYS_S:n aikana ja piirto alkaa loopin alusta
 * tyhjältä (Raamattu: KAIKKI LIIKE ANIMOIDAAN PEHMEASTI).
 *
 * ── KERROS ON KOKO ETUSIVUN KOKOINEN ────────────────────────────────
 *
 * Kerros asuu KOKO avauspaneelin (.intro) taustalla eikä enää pelkässä
 * ylälohkossa, ja video rajataan `object-fit: cover` -tavalla (SVG
 * `preserveAspectRatio="xMidYMid slice"`). Sama muunnos molemmille
 * tulee yhdestä funktiosta (kerroksenSovitus + videostaRuudulle),
 * joten koneen ruutupiste osuu videon pallolle myös silloin, kun
 * kerros on paljon leveämpi tai korkeampi kuin neliömäinen video.
 *
 * ── JULISTE NÄKYY HETI, VIDEO VAIHTUU SEN TILALLE ──────────────────
 *
 * OMISTAJA 5.9.2026 ilta, sanatarkasti: *"tuon etusivun voisi animoida
 * niin että pallo lähtee heti pyörimään"*. Kerros odotti ennen videon
 * `loadeddata`-tapahtumaa ennen kuin se sai `nakyy`-luokan, ja koska
 * peittävyys nollattiin JUURELTA, myös videon oma poster jäi piiloon:
 * etusivu oli ensimmäiset sekunnit tyhjä pergamentti.
 *
 * Nyt juliste on OMA KERROKSENSA videon alla, kerros saa `nakyy`-luokan
 * heti DOMiin liitettäessä, ja video häivytetään julisteen päälle vasta
 * kun se on valmis (KERROKSEN_ILMESTYS_MS, sama luku kuin css:ssä).
 * SVG (viiva ja kone) on aluksi läpinäkyvä, jotta julisteen päällä ei
 * seiso konetta ennen kuin video pyörii — piirto sytyttää sen itse.
 *
 * ── VARAPOLUT ──────────────────────────────────────────────────────
 *
 *   pallolauta     → PÄÄLLÄ ilman lippua (aalto 1D, omistaja 5.9.2026:
 *                    *"Käännä kaikki pallolle, niin voidaan sulkea vanha
 *                    kartta kokonaan."*); lippu on enää poiskytkin
 *                    (?etusivupallo=0, kehittäjävalikon vipu)
 *   ?lauta=kartta  → pois: etusivu jää vanhaan pienoiskarttaan
 *                    (poistuu aallossa 3)
 *   ei verkkoa     → luettelo tai video ei lataudu → kerros puretaan ja
 *                    etusivu jää PELKÄKSI PAPERIKSI: tasokarttaa ei
 *                    herätetä pallolaudalla, joten paneelissa on
 *                    pergamentti ja julisteotsikko, ei koskaan tyhjä ruutu
 *   dist/          → dynaaminen tuonti kaatuu js/ui.js:ssä (kuten
 *                    linsseillä ja pallolaudalla) → tasokartta herätetään
 *                    ja etusivu on entinen pienoiskartta
 *   reduced motion → yksi pysäytyskuva (juliste) ja kone paikallaan
 */

import { laudaltaAsteiksi } from './fokusmitat.js';
import { lataaKuvaSitkeasti, PEILI_JUURI, UUSINNAN_VIIVE_MS } from './media.js';
import { ETUSIVUN_ISOISAKUVAT, isoisakuvanSavy } from './packs/etusivun-isoisakuvat.js';
import {
  ETUSIVUPALLO_AVAIN, asetaEtusivupallo, etusivupalloOletus,
  etusivupalloOsoitteesta, etusivupalloPaalla,
} from './ui-apurit.js';

/* ==================== LIPPU ======================================= */

/*
 * LIPPU ASUU js/ui-apurit.js:SSÄ laudan valinnan vieressä (aalto 1D):
 * js/ui.js:n mount päättää ENNEN ensimmäistä piirtoa, alustetaanko
 * tasokartta etusivua varten, eikä se voi odottaa tämän moduulin
 * dynaamista tuontia. Rajapinta viedään tästä edelleen ulos, jotta
 * js/main.js:n vipu ja testit näkevät saman moduulin kuin ennenkin.
 */
export {
  ETUSIVUPALLO_AVAIN, asetaEtusivupallo, etusivupalloOletus,
  etusivupalloOsoitteesta, etusivupalloPaalla,
};

/* ==================== ÄMPÄRIN POLUT =============================== */

/**
 * Videosarjan versio = kansio ämpärissä. Työkalu kirjoittaa saman
 * version luetteloon, ja kerros kieltäytyy, jos versiot eivät täsmää:
 * väärällä videolla kone lentäisi väärässä paikassa.
 *
 * 2026-09-05c = ensimmäinen TÄYSI KIERROS (360°, saumaton looppi).
 * Video on poltettava uudelleen työnkululla tee-etusivupallo ennen kuin
 * kerros näkyy — vanha 2026-09-05b hylätään versiotarkistuksessa, ja
 * siihen asti etusivu on pelkkää pergamenttia julisteotsikon kanssa
 * (sama varapolku kuin verkkovialla).
 */
export const ETUSIVUPALLO_VERSIO = '2026-09-05c';
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
 * REITTI ON FOGGIN KIERROS (docs/tarina.md; omistaja 5.9.2026 ilta:
 * *"animaatio pitää mennä koko maapallon ympäri niin että se voi
 * loopata"*): Lontoosta itään Suezin, Intian, Kiinan, Tyynenmeren ja
 * Atlantin yli takaisin Lontooseen. Tunnukset ovat pelin omat
 * kaupunkitunnukset (js/packs/maailmankartta.js) — Bombay on pelissä
 * 'mumbai', Kalkutta 'kolkata', Jokohaman satama 'tokio' ja Suezin pää
 * 'kairo'; muut ovat nimensä näköisiä. Lontoo on listassa kahdesti,
 * lähtönä ja paluuna, ja juuri se tekee kierroksesta tasan 360°.
 */
export const ETUSIVUN_REITTI = [
  'lontoo', 'pariisi', 'kairo', 'mumbai', 'kolkata',
  'singapore', 'hongkong', 'tokio', 'sanfrancisco', 'newyork', 'lontoo',
];

/** Täysi kierros pituusasteina — saumattoman loopin ehto. */
export const KIERROKSEN_ASTEET = 360;

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

/**
 * Jakson kesto: pohja + matka asteina. Koko kierros (kymmenen jaksoa,
 * 322° kaarta) ja Lontoon pysähdys antavat noin 50 s kierroksen —
 * omistajan ehto oli, ettei koko kierros ole liian nopea.
 */
export const JAKSON_POHJA_S = 1.0;
export const JAKSON_ASTE_S = 0.115;
/**
 * KONE PYSÄHTYY LONTOOSEEN kierroksen lopuksi (omistaja 5.9.2026 ilta:
 * *"pysähtyy lontooseen ja punainen viiva ottaa kiinni lopuksi"*).
 * Jakso ilman matkaa: viiva on silloin sulkenut ympyrän, ja pidon
 * viimeinen HAIVYTYS_S häivyttää viivan pois ennen loopin alkua.
 */
export const LOPPU_PITO_S = 2.6;
/** Viivan ja koneen häivytys kierroksen saumassa (s). Video ei häivy. */
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
 * Pituusasteet jatkuvina, jotta reitti kulkee idän suuntaan — Lontoo
 * listan lopussa saa siis lähtöarvonsa + 360°.
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
    /*
     * SAMA KAUPUNKI PERÄKKÄIN ON KIERROS, EI PAIKALLAAN OLOA: paluu
     * Lontooseen on aina idän kautta, joten nollaeron tilalle tulee
     * täysi kierros. Ilman tätä reitti päättyisi lähtöpisteeseen ja
     * kamera jäisi paikalleen.
     */
    let lon = p.lon;
    if (edellinen) {
      const ero = kaariAste(p.lon - edellinen.lon);
      lon = edellinen.lon + (Math.abs(ero) < 1e-9 ? KIERROKSEN_ASTEET : ero);
    }
    ulos.push({ id, nimi: c.name, lat: p.lat, lon });
  }
  return ulos;
}

/**
 * Reitin jaksot ja koko kierroksen kesto. Jakson kesto on suhteessa
 * matkaan, joten kone lentää tasaista vauhtia eikä pysähdy kaupunkiin
 * (omistaja: *"kone jatkaa automaattisesti lentoa uuteen kohteeseen
 * pysähtymättä"*) — paitsi VIIMEISENÄ Lontoossa, jonne se jää
 * odottamaan viivan sulkeutumista (omistaja 5.9.2026 ilta).
 */
export function reitinJaksot(pisteet, pito = LOPPU_PITO_S) {
  const jaksot = [];
  let alku = 0;
  for (let i = 0; i + 1 < pisteet.length; i++) {
    const matka = kaarietaisyys(pisteet[i], pisteet[i + 1]);
    const kesto = JAKSON_POHJA_S + matka * JAKSON_ASTE_S;
    jaksot.push({ a: pisteet[i], b: pisteet[i + 1], matka, alku, kesto });
    alku += kesto;
  }
  if (pito > 0 && jaksot.length) {
    const maali = pisteet[pisteet.length - 1];
    jaksot.push({
      a: maali, b: maali, matka: 0, alku, kesto: pito, pito: true,
    });
    alku += pito;
  }
  return { jaksot, kesto: alku };
}

/** Valmis reitti: pisteet, jaksot ja kesto yhdessä oliossa. */
export function teeReitti(pisteet) {
  const { jaksot, kesto } = reitinJaksot(pisteet);
  return { pisteet, jaksot, kesto };
}

/**
 * Koneen paikka hetkellä t (s). Palauttaa myös jakson ja osuuden.
 *
 * JAKSOLLINEN: t saa olla kierroksen ulkopuolella, jolloin pituusaste
 * jatkuu 360° kierrosta kohti. Kameran silotus (kameranNakyma) kurkistaa
 * sauman yli molempiin suuntiin, ja juuri tämä tekee kamerasta
 * jaksollisen — ilman sitä videon ensimmäinen ja viimeinen kehys eivät
 * olisi samat eikä looppi olisi saumaton.
 */
export function koneenTila(reitti, t) {
  const jaksot = reitti.jaksot;
  if (!jaksot.length || !(reitti.kesto > 0)) {
    return { lat: 0, lon: 0, jakso: 0, osuus: 0 };
  }
  const kierros = Math.floor(t / reitti.kesto);
  const aika = t - kierros * reitti.kesto;
  let i = jaksot.length - 1;
  while (i > 0 && aika < jaksot[i].alku) i -= 1;
  const j = jaksot[i];
  const osuus = j.kesto > 0 ? Math.min(1, Math.max(0, (aika - j.alku) / j.kesto)) : 1;
  const p = suurympyra(j.a, j.b, osuus);
  return {
    lat: p.lat, lon: p.lon + kierros * KIERROKSEN_ASTEET, jakso: i, osuus,
  };
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
 * Pallon pinnan piste VIDEON pikseleiksi. Sama perspektiivikamera kuin
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

/* ==================== SOVITUS: VIDEO JA SVG SAMOIN ================ */

/*
 * KOKO ETUSIVUN ALA (omistaja 5.9.2026 klo 21.30: *"pallo saisi pyöriä
 * koko etusivun alalla"*). Kerros on paneelin kokoinen, video on
 * neliö — joten video täyttää alan `cover`-tavalla ja ylimenevät reunat
 * rajautuvat pois. SVG saa saman rajauksen sanaparilla
 * `preserveAspectRatio="xMidYMid slice"`, joka on täsmälleen sama
 * muunnos kuin CSS:n `object-fit: cover` oletusasemassa 50 % 50 %.
 *
 * Muunnos on YHDESSÄ funktiossa, jotta kone ja punainen viiva osuvat
 * videon pallolle myös rajatussa näkymässä: SVG hoitaa piirron, ja sama
 * laskenta on saatavilla JS:stä (kerroksenSovitus + videostaRuudulle,
 * kahvan koneRuudulla), jotta savuke ja testit voivat tarkistaa osuman
 * ilman selaimen SVG-moottoria.
 */
export const SOVITUS_TAPA = 'cover';
/** CSS:n object-fit ↔ SVG:n preserveAspectRatio -parit. */
export const SVG_SOVITUS = { cover: 'xMidYMid slice', contain: 'xMidYMid meet' };

/**
 * Videon (leveys × korkeus) sovitus kotelon (leveys × korkeus) sisään.
 * Palauttaa skaalan ja keskityssiirtymän kotelon pikseleissä.
 */
export function kerroksenSovitus(mitat, kotelo, tapa = SOVITUS_TAPA) {
  const lev = mitat?.leveys > 0 ? mitat.leveys : 1;
  const kork = mitat?.korkeus > 0 ? mitat.korkeus : 1;
  const kw = Math.max(0, kotelo?.leveys ?? 0);
  const kh = Math.max(0, kotelo?.korkeus ?? 0);
  const skaala = tapa === 'cover'
    ? Math.max(kw / lev, kh / kork)
    : Math.min(kw / lev, kh / kork);
  return {
    tapa,
    skaala,
    siirtoX: (kw - lev * skaala) / 2,
    siirtoY: (kh - kork * skaala) / 2,
  };
}

/** Videon pikselipiste kerroksen pikseleiksi (sama muunnos kuin SVG:llä). */
export function videostaRuudulle(piste, sovitus) {
  return {
    x: sovitus.siirtoX + piste.x * sovitus.skaala,
    y: sovitus.siirtoY + piste.y * sovitus.skaala,
    nakyy: piste.nakyy,
  };
}

/**
 * Lennetty jälki näytteinä hetkeen t asti (isoympyrää pitkin, noin
 * JALJEN_ASKEL_ASTE:n välein). Viimeinen näyte on kone itse — Lontoon
 * pysähdyksessä se on sama piste kuin jäljen alku, eli ympyrä sulkeutuu.
 */
export function jaljenPisteet(reitti, t, askel = JALJEN_ASKEL_ASTE) {
  const kone = koneenTila(reitti, t);
  const ulos = [];
  for (let i = 0; i <= kone.jakso; i++) {
    const j = reitti.jaksot[i];
    if (!j || !(j.matka > 0)) continue; // Lontoon pysähdys ei piirrä uutta jälkeä
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
  for (const j of reitti.jaksot) if (!j.pito && t >= j.alku + j.kesto) n += 1;
  return n;
}

/* ==================== ISOISÄN AIKALAISKUVAT ======================= */

/*
 * KUVAT TULEVAT PAKASTA (js/packs/etusivun-isoisakuvat.js, omistaja
 * 5.9.2026 klo 22.50). Pakka on totuus: kuvaputken toimitus lisätään
 * SINNE yhtenä rivinä, eikä tähän moduuliin kosketa. Jokaisella kuvalla
 * on `kaupunki` — se reitin jakso, jonka laskeutuessa kuva tulee
 * pinoon — ja kuvat, joiden kaupunki ei ole reitillä, tulevat
 * kiertovuorollaan.
 */
export const ETUSIVUN_KUVAKIERTO = ETUSIVUN_ISOISAKUVAT;

/** Monenteenko kaupunkiin kone laskeutui (nro = 1 → reitin toinen piste). */
export function saapumisenKaupunki(reitti, nro) {
  return reitti?.pisteet?.[nro]?.id ?? null;
}

/**
 * Monennenko laskeutumisen kuva (1 = ensimmäinen kohde Lontoon jälkeen).
 * Kaupungin oma kuva voittaa kierron; muuten kierretään pakkaa.
 *
 * ETUSIVU EI ENÄÄ KUTSU TÄTÄ (omistaja 6.9.2026 klo 01.20: *"Jätä
 * isoisän kuvat pois etusivulta"*). Funktio jää, koska se on pakan
 * ainoa valintasääntö ja odottaa kuvien uutta käyttöpaikkaa; vartiot
 * ovat tests/etusivupallo.test.mjs:ssä.
 */
export function saapumisenKuva(nro, kaupunki = null, kuvat = ETUSIVUN_ISOISAKUVAT) {
  if (!kuvat.length || nro < 1) return null;
  const oma = kaupunki ? kuvat.findIndex((k) => k.kaupunki === kaupunki) : -1;
  const i = oma >= 0 ? oma : (nro - 1) % kuvat.length;
  return { avain: kuvat[i].tunnus, kuva: kuvat[i] };
}

/* ==================== REITTIKUVAT PALLON PINNALLA ================= */

/*
 * OMISTAJA 6.9.2026 aamu, sanatarkasti: *"Etusivulla kuvat voisivat
 * tulla pienellä kartalle kaupungin käännöksen kohdalle ja seurata
 * kaupunkia ja lopulta häipyä sitä kautta näkyvistä. Käytä uusia
 * vaaleita kuvia. Voi olla isoisän ottamia kuvia."*
 *
 * ERO VANHAAN PINOON: pino oli ruudun laidassa oleva korttikasa, eikä
 * se palaa (ks. yllä *"Jätä isoisän kuvat pois etusivulta"*). Nyt kuva
 * on ANKKUROITU KAUPUNGIN lat/lon-PISTEESEEN: ruutupaikka lasketaan
 * joka kehyksellä samalla projektiolla kuin koneen ja punaisen viivan
 * paikka (pallonPiste + videostaRuudulle), joten kuva seuraa kaupunkia
 * pallon pyöriessä ja katoaa kaupungin mukana pallon reunan taakse.
 *
 * VAALEA REUNA SULAUTUU PALLOON (päätoimittajan tarkennus 6.9.2026):
 * kuvaputken kuvat on vinjetoitu VAALEAAN paperinsävyyn, joten kuva
 * näytetään KOKONAAN paperireunoineen — ei pyöreää rajausta, joka
 * leikkaisi vinjetin — ja css sulattaa vaalean reunan pallon vaaleaan
 * karttapintaan `mix-blend-mode: multiply` -sekoituksella. Ei kehystä,
 * ei varjoa, ei tummaa reunusta.
 */

/** Kuvan koko: osuus kerroksen lyhyemmästä sivusta (omistaja: "pienellä"). */
export const REITTIKUVAN_KOKO_OSUUS = 0.14;
/*
 * HARSOKORJAUS (mitattu Chromiumilla 6.9.2026). Pakan `haalea` on
 * tehty kuvapinolle, joka lepäsi tummemman taustan päällä. Pallolla
 * kuva on yhtä vaalean pergamentin päällä ja vielä avaustekstin
 * pergamenttiharson alla, joten samalla haaleudella siitä ei näkynyt
 * mitään: kuvan osuus ruudun pikseleistä jäi alle kymmeneen yksikköön
 * 255:stä. Korjaus nostaa vaalean kuvan katon ykköseen — sama
 * periaate kuin poistetun pinon `--pino-harsokorjaus`-muuttujassa.
 */
export const REITTIKUVAN_KIRKASTUS = 0.15;
/** Kuvan keskipiste kaupungin YLÄPUOLELLA (osuus koosta): kone jää vapaaksi. */
export const REITTIKUVAN_NOSTO = 0.58;
/** Ilmestyminen, täysi näkyvyys ja häipyminen sekunteina (omistaja: ~600 ms / ~2,5–3 s). */
export const REITTIKUVAN_ILMESTYS_S = 0.6;
export const REITTIKUVAN_PITO_S = 1.2;
export const REITTIKUVAN_HAIPYMINEN_S = 2.8;
/** Kuvan elinikä käännöksestä: ilmestys + pito + häipyminen. */
export const REITTIKUVAN_ELINIKA_S = REITTIKUVAN_ILMESTYS_S
  + REITTIKUVAN_PITO_S + REITTIKUVAN_HAIPYMINEN_S;
/**
 * Reunaehto (omistaja: kuva häipyy *"viimeistään kun kaupunki lähestyy
 * pallon reunaa"*): kulma kameran akselista asteina, ja vyö, jonka
 * matkalla peittävyys valuu nollaan. 70° + 10° = 80°, eli kuva on
 * poissa ennen näkyvän kalotin reunaa (noin 71–90° kameran korkeudesta
 * riippuen), eikä koskaan litisty pallon reunalle.
 */
export const REITTIKUVAN_REUNAKULMA = 70;
export const REITTIKUVAN_REUNAVYO = 10;

/**
 * KUVAN OSOITE PALLOLLE (omistaja 6.9.2026: *"Etusivulle kuvat
 * kannattaa varmaan pienentää valmiiksi että pyörii parhaiten"*).
 * Repon pienennetty 320 px:n vedos voittaa aina ämpärin ison kuvan;
 * `osoite` jää lähteeksi, ja jos pienennystä ei vielä ole (uusi
 * kuvaputken toimitus), kerros lataa lähteen eikä jää ilman kuvaa.
 */
export function reittikuvanOsoite(kuva) {
  return kuva?.pieni ?? kuva?.osoite ?? '';
}

/** Kaupunkitunnus → pakan kuva. Ensimmäinen osuma voittaa. */
export function reitinKuvat(kuvat = ETUSIVUN_ISOISAKUVAT) {
  const kartta = new Map();
  for (const k of kuvat) if (k?.kaupunki && !kartta.has(k.kaupunki)) kartta.set(k.kaupunki, k);
  return kartta;
}

/**
 * Käännökset, joissa kuva nousee pallolle: jokainen laskeutuminen,
 * jolle pakasta löytyy kaupungin kuva. Aika on jakson loppu eli hetki,
 * jolloin kone kääntyy kaupungin kohdalla; paikka on kaupungin oma
 * lat/lon, johon kuva ankkuroidaan.
 *
 * KUVATON KAUPUNKI JÄTETÄÄN VÄLIIN (Pariisi 6.9.2026): väliaikaista
 * sijaista ei panna, vaan käännös menee ilman kuvaa kunnes kuvaputki
 * toimittaa Pariisin kuvan pakkaan.
 */
export function saapumisenHetket(reitti, kuvat = ETUSIVUN_ISOISAKUVAT) {
  const kartta = reitinKuvat(kuvat);
  const ulos = [];
  const jaksot = reitti?.jaksot ?? [];
  for (let i = 0; i < jaksot.length; i++) {
    const j = jaksot[i];
    if (j.pito || !(j.matka > 0)) continue;
    const id = reitti.pisteet?.[i + 1]?.id ?? null;
    const kuva = id ? kartta.get(id) : null;
    if (!kuva) continue;
    ulos.push({ id, kuva, lat: j.b.lat, lon: j.b.lon, aika: j.alku + j.kesto });
  }
  return ulos;
}

/**
 * Kuvan ikä hetkellä t. Kello kelaa kierroksen mitassa, joten viimeisen
 * käännöksen kuva saa jatkaa häipymistään loopin sauman yli.
 */
export function reittikuvanIka(t, aika, kesto) {
  const ika = t - aika;
  return ika < 0 && kesto > 0 ? ika + kesto : ika;
}

/** Pisteen kulma kameran akselista asteina (0 = pallon keskellä). */
export function kameranKulma(paikka, kamera) {
  const c = yksikko(kamera.lat, kamera.lon);
  const p = yksikko(paikka.lat, paikka.lon);
  return asteiksi(Math.acos(Math.min(1, Math.max(-1, piste3(p, c)))));
}

/**
 * Kuvan peittävyys: ilmestyy pehmeästi, pysyy hetken ja häipyy — tai
 * häipyy aikaisemmin, kun kaupunki lähestyy pallon reunaa. `huippu` on
 * kuvan oma haaleus pakasta (isoisakuvanSavy).
 *
 * LIIKE VÄHENNETTYNÄ (`portaittain`) peittävyys ei liu'u kehyksittäin:
 * kuva on joko esillä tai poissa, ja css hoitaa pelkän häivytyksen
 * ilman liikettä (Raamattu, sääntö 4).
 */
export function reittikuvanPeitto(ika, kulma, asetukset = {}) {
  const { huippu = 1, portaittain = false } = asetukset;
  if (!(ika >= 0) || ika > REITTIKUVAN_ELINIKA_S) return 0;
  const reuna = Math.min(1, Math.max(0,
    1 - (kulma - REITTIKUVAN_REUNAKULMA) / REITTIKUVAN_REUNAVYO));
  if (reuna <= 0) return 0;
  if (portaittain) return huippu * reuna;
  const sisaan = Math.min(1, ika / REITTIKUVAN_ILMESTYS_S);
  const ulos = Math.min(1, Math.max(0,
    (REITTIKUVAN_ELINIKA_S - ika) / REITTIKUVAN_HAIPYMINEN_S));
  return huippu * Math.max(0, Math.min(sisaan, ulos, reuna));
}

/** Kuvan sivu kerroksen pikseleinä (lyhyempi sivu ratkaisee). */
export function reittikuvanKoko(leveys, korkeus) {
  return REITTIKUVAN_KOKO_OSUUS * Math.max(0, Math.min(leveys, korkeus));
}

/*
 * KUVA EI NÄY JULISTEOTSIKON KOHDALLA (omistaja 6.9.2026,
 * iPhone-kuvakaappaus: reittikuva piirtyi "OSA II · UNOHDETTU AARRE"
 * -rivin taakse ja näkyi sen läpi).
 *
 * PELKKÄ PINOJÄRJESTYS EI RIITÄ, vaikka juliste onkin kuvakerroksen
 * päällä: otsikkorivien välistä ja kirjainten lomasta näkyy läpi, ja
 * julisteen oma pergamenttiharso on tarkoituksella läpikuultava
 * (css --harson-peitto 0,8 ja liuku nollaan) — kuva paistoi sen alta.
 *
 * KOKO KUVAN HÄIVYTTÄMINEN OLISI LIIKAA. Kuva on ankkuroitu
 * kaupunkiin, ja kaupungit kulkevat juuri pallon keskeltä eli
 * julisteen takaa: simulaatio koko kierroksesta (Chromiumin mitatuilla
 * laatikoilla 1280 × 800 ja 390 × 844) antaa 69–74 % kuvien
 * näkyvyysajasta julisteen laatikon sisään. Jos kuva sammutettaisiin
 * kokonaan aina kun se osuu laatikkoon, kuvista jäisi näkyviin vain
 * neljännes ja omistajan v1630 tilaus menisi käytännössä pois.
 *
 * SIKSI LEIKKAUS ON PAIKALLINEN: kuvakerros saa maskin, jossa
 * julisteen kohdalla on pehmeäreunainen soikea aukko. Kuvan se osa,
 * joka menisi otsikon päälle, ei piirry lainkaan; loppu kuvasta näkyy
 * normaalisti ja liukuu aukkoon kuin vinjetti (kuvilla on jo oma
 * pehmeä reunamaski, ks. css .etusivupallo-reittikuva). Maski on
 * SOIKIO, koska otsikon kirjain- ja viivarivit muodostavat soikion:
 * levein rivi on keskellä, kapeimmat ylä- ja alalaidassa.
 */
/*
 * AUKON MITAT. Soikio piirretään julisteen laatikon puolikkaista:
 *
 *   JULISTEEN_MASKIAUKKO  umpinaisen aukon säde laatikon puolikkaana.
 *                         1,0 olisi laatikkoon SISÄÄN piirretty soikio,
 *                         joka jättäisi nurkat auki — ja juuri
 *                         nurkkakaistalle osuvat hiusviivakoristeen
 *                         (.juliste-viiva, 17em) päät ylä- ja
 *                         alalaidassa. 1,3 vetää soikion niiden yli
 *                         molemmilla mitatuilla ruuduilla.
 *   JULISTEEN_MASKIVYO    häivytysvyö aukon ulkopuolella, osuutena
 *                         aukon säteestä. Ilman vyötä kuva katkeaisi
 *                         terävään reunaan.
 */
export const JULISTEEN_MASKIAUKKO = 1.3;
export const JULISTEEN_MASKIVYO = 0.2;
/** Julisteen laatikko mitataan joka N:s kehys — se ei liiku avauksen aikana. */
export const JULISTEEN_MITTAUSVALI = 12;

/**
 * Kuvakerroksen maski: läpinäkyvä (= kuva pois) soikea aukko julisteen
 * laatikon kohdalla, ja siitä ulospäin pehmeä liuku täyteen mustaan
 * (= kuva näkyy). Laatikko on `{ vasen, yla, oikea, ala }` kerroksen
 * pikseleissä; ilman julistetta maskia ei ole ('none').
 */
export function julisteenMaski(
  juliste, aukko = JULISTEEN_MASKIAUKKO, vyo = JULISTEEN_MASKIVYO,
) {
  const leveys = juliste ? juliste.oikea - juliste.vasen : 0;
  const korkeus = juliste ? juliste.ala - juliste.yla : 0;
  if (!(leveys > 0) || !(korkeus > 0)) return 'none';
  const kx = (juliste.vasen + juliste.oikea) / 2;
  const ky = (juliste.yla + juliste.ala) / 2;
  // Säde piirretään vyön kanssa; aukko loppuu siihen, mistä liuku alkaa.
  const rx = (leveys / 2) * aukko * (1 + vyo);
  const ry = (korkeus / 2) * aukko * (1 + vyo);
  const raja = 100 / (1 + vyo);
  /*
   * VYÖ ON S-KÄYRÄ, EI SUORA (omistaja 6.9.2026 iltapäivä: *"näkyy
   * vielä vähän suoraa rajaa tekstin vaaleassa taustassa"*). Suora
   * liuku alkaa ja päättyy kulmaan, jonka silmä lukee reunana; pysäkit
   * seuraavat pehmeää askelta (3t² − 2t³), joten kuva syttyy aukon
   * laidasta huomaamatta.
   */
  const pysakit = [0, 0.25, 0.5, 0.75, 1].map((t) => {
    const a = t * t * (3 - 2 * t);
    return `rgba(0, 0, 0, ${Number(a.toFixed(3))}) ${(raja + (100 - raja) * t).toFixed(1)}%`;
  });
  return `radial-gradient(ellipse ${rx.toFixed(0)}px ${ry.toFixed(0)}px`
    + ` at ${kx.toFixed(0)}px ${ky.toFixed(0)}px, ${pysakit.join(', ')})`;
}

/* ==================== KERROS ETUSIVULLE =========================== */
/**
 * Kerroksen ja julisteen ilmestyminen (ms) — sama luku kuin css
 * .etusivupallo-siirtymässä. Kerros näkyy heti (juliste), ja jos video
 * ei latautunut, sama luku häivyttää kerroksen pois ennen poistoa:
 * pergamentti ei välähdä paikalleen (Raamattu: KAIKKI LIIKE ANIMOIDAAN
 * PEHMEASTI).
 */
export const KERROKSEN_ILMESTYS_MS = 900;

/** Koneen piirros — sama runko kuin aloituslennolla (js/ui.js). */
const KONEEN_POLKU = 'M14,0 L-6,0 M-10,0 L-14,0 M2,0 L-8,-9 L-4,-9 L6,0 L-4,9 L-8,9 z '
  + 'M-11,0 L-15,-5 L-13,-5 L-9,0 L-13,5 L-15,5 z';
/** Koneen koko videon pikseleinä (skaalautuu kerroksen mukana). */
const KONEEN_SKAALA = 1.15;

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
   * Pallo: video koko paneelin taakse. Sama rajaus kuin SVG:llä
   * (object-fit: cover ≡ preserveAspectRatio="xMidYMid slice"), joten
   * koneen ruutupiste osuu videon pikseliin ilman omaa
   * sovitusmatematiikkaa piirrossa.
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
  /*
   * SITKEÄSTI (6.9.2026, r2.dev 429): juliste on avausruudun ainoa
   * kuva ja tulee samasta ämpäristä kuin muukin media. Ohimenevä
   * purskerajoitus jätti avaussivun pergamentiksi — uusinta hoitaa
   * sen (js/media.js). Jonon ohi, koska tämä on ruudun ainoa kuva
   * eikä saa jäädä odottamaan kaaren esilatauksia.
   */
  void lataaKuvaSitkeasti(juliste, `${ETUSIVUPALLO_JUURI}${ETUSIVUPALLO_TIEDOSTOT.juliste}`,
    { jonota: false });

  /*
   * JULISTE POHJALLE JA NÄKYVIIN HETI, video sen päälle. Reduced
   * motionissa videota ei synny DOMiin lainkaan (yksi pysäytyskuva).
   */
  juuri.appendChild(juliste);
  if (!vahennettyLiike) juuri.appendChild(video);
  const naytaJuliste = () => juliste.classList.add('nakyy');
  if (juliste.complete) naytaJuliste();
  else juliste.addEventListener('load', naytaJuliste, { once: true });

  /*
   * REITTIKUVAT PALLON PINNALLE (omistaja 6.9.2026 aamu). Kerros on
   * videon PÄÄLLÄ mutta SVG:n ALLA, joten kone ja punainen viiva
   * piirtyvät aina kuvan päälle — kuva ei saa peittää konetta. Otsikko
   * ja teksti ovat oma kerroksensa koko pallon yläpuolella (css
   * z-index), joten niidenkään päälle kuva ei nouse.
   *
   * ESILATAUS REITIN ALUSSA: jokainen kuva saa osoitteensa jo tässä
   * (lataaKuvaSitkeasti, sama uusintasääntö kuin julisteella), jotta
   * käännöksessä ei ole latausviivettä. Ladattava tiedosto on repon
   * PIENENNETTY 320 px:n vedos (ETUSIVUN_PIENET), ei ämpärin iso kuva
   * — yhdeksän kuvaa on yhteensä noin 95 kt, ja ne ovat sw.js:n
   * SHELLissä, joten ne ovat valmiina myös offline.
   */
  const kuvakerros = document.createElement('div');
  kuvakerros.className = 'etusivupallo-kuvat';
  const reittikuvat = saapumisenHetket(reitti).map((s) => {
    const el = document.createElement('img');
    el.className = 'etusivupallo-reittikuva';
    el.decoding = 'async';
    el.draggable = false;
    // Kuvateksti ei näy pallolla (kuva on pieni) mutta on alt-teksti.
    el.alt = s.kuva.kuvateksti ?? '';
    el.style.opacity = '0';
    void lataaKuvaSitkeasti(el, reittikuvanOsoite(s.kuva));
    kuvakerros.appendChild(el);
    return {
      ...s,
      el,
      huippu: Math.min(1, isoisakuvanSavy(s.kuva).haalea + REITTIKUVAN_KIRKASTUS),
    };
  });
  juuri.appendChild(kuvakerros);

  const svg = svgEl('svg', {
    class: 'etusivupallo-reitti',
    viewBox: `0 0 ${mitat.leveys} ${mitat.korkeus}`,
    preserveAspectRatio: SVG_SOVITUS[SOVITUS_TAPA],
  }, juuri);
  /*
   * VIIVA JA KONE ODOTTAVAT PIIRTOA. Juliste näkyy heti, mutta SVG:hen
   * ei ole vielä laskettu mitään — ilman tätä kone seisoisi kerroksen
   * vasemmassa ylänurkassa (muunnos puuttuu) julisteen päällä. Piirto
   * asettaa peittävyyden itse joka kehyksellä (kierroksen sauma).
   */
  svg.style.opacity = '0';
  const viiva = svgEl('path', { class: 'etusivupallo-viiva', d: '' }, svg);
  const kone = svgEl('g', { class: 'etusivupallo-kone' }, svg);
  svgEl('path', { class: 'etusivupallo-koneen-runko', d: KONEEN_POLKU }, kone);

  kotelo.insertBefore(juuri, kotelo.firstChild);
  /*
   * KERROS NÄKYVIIN HETI — EI ODOTETA VIDEOTA (omistaja 5.9.2026 ilta:
   * *"pallo lähtee heti pyörimään"*). Aiemmin `nakyy` lisättiin vasta
   * `loadeddata`-tapahtuman jälkeen, ja koska peittävyys on JUURELLA,
   * se piilotti myös julisteen. Nyt juliste on ruudulla heti ja video
   * häivytetään sen päälle, kun se on valmis.
   */
  const avaus = kotelo.closest?.('.intro') ?? null;
  juuri.classList.add('nakyy');
  // Sumuverho kevenee pallon päällä (css .intro-pallolla): video on jo
  // sumennettu, eikä backdrop-filteriä kannata maksaa joka kehyksellä.
  avaus?.classList.add('intro-pallolla');

  /*
   * VANHA KUVAPINO EI PALAA (omistaja 6.9.2026 klo 01.20,
   * sanatarkasti: *"Jätä isoisän kuvat pois etusivulta"*). Tässä syntyi
   * ennen kuvapinon oma kerros (`.etusivupallo-pino`) kortteineen,
   * asentoineen ja kattoineen — sitä ei ole. Saman aamun uusi tilaus
   * toi kuvat takaisin PALLON PINNALLE (`.etusivupallo-kuvat` yllä),
   * eli ankkuroituna kaupunkiin eikä ruudun laitaan pinoutuvana
   * korttikasana.
   */

  /* ---------- piirto ---------- */

  let purettu = false;
  let kehys = 0;
  let suuntaAste = 0;

  /** Kerroksen mitat nyt — sovitus lasketaan näistä (cover). */
  const sovitusNyt = () => kerroksenSovitus(mitat, {
    leveys: juuri.clientWidth, korkeus: juuri.clientHeight,
  });

  /** Koneen paikka KERROKSEN pikseleinä hetkellä t (savuke ja testit). */
  const koneRuudulla = (t) => videostaRuudulle(
    pallonPiste(koneenTila(reitti, t), kameranNakyma(reitti, t, kamera), mitat),
    sovitusNyt(),
  );

  /*
   * AUKKO JULISTEOTSIKON KOHDALLE. Otsikon laatikko mitataan
   * harvakseen (JULISTEEN_MITTAUSVALI): se ei liiku avauksen aikana —
   * koko on lyöty lukkoon jo portin takana (js/ui.js fitIntro) — ja
   * getBoundingClientRect kesken piirron pakottaisi turhan
   * uudelleenladonnan joka kehyksellä. Harva mittaus riittää myös
   * ruudun kääntöön: maski seuraa perässä parissa sadassa
   * millisekunnissa.
   *
   * Maski kirjoitetaan vain kun kuvio muuttuu, joten pyörivä pallo ei
   * maksa siitä mitään.
   */
  let julistelaskuri = 0;
  let kuvamaski = '';
  const paivitaKuvamaski = () => {
    if (julistelaskuri++ % JULISTEEN_MITTAUSVALI !== 0) return;
    const el = avaus?.querySelector('.intro-juliste');
    const k = juuri.getBoundingClientRect();
    let laatikko = null;
    if (el?.isConnected) {
      const j = el.getBoundingClientRect();
      laatikko = {
        vasen: j.left - k.left, yla: j.top - k.top,
        oikea: j.right - k.left, ala: j.bottom - k.top,
      };
    }
    const maski = julisteenMaski(laatikko);
    if (maski === kuvamaski) return;
    kuvamaski = maski;
    kuvakerros.style.webkitMaskImage = maski;
    kuvakerros.style.maskImage = maski;
  };

  /**
   * REITTIKUVAT KAUPUNKIENSA PÄÄLLE. Sama projektio kuin koneella ja
   * viivalla, joten kuva pysyy kaupungin kohdalla pallon pyöriessä.
   * Peittävyys tulee reittikuvanPeitosta (ilmestys, pito, häipyminen ja
   * pallon reuna); liike vähennettynä se on portaittainen, jolloin css
   * häivyttää kuvan liikkumatta. Julisteotsikon kohdalla kuvasta ei
   * piirry mitään (kerroksen maski, paivitaKuvamaski).
   */
  const piirraReittikuvat = (t, nakyma) => {
    if (!reittikuvat.length) return;
    paivitaKuvamaski();
    const sov = sovitusNyt();
    const koko = reittikuvanKoko(juuri.clientWidth, juuri.clientHeight);
    for (const r of reittikuvat) {
      const peitto = reittikuvanPeitto(
        reittikuvanIka(t, r.aika, kesto),
        kameranKulma(r, nakyma),
        { huippu: r.huippu, portaittain: vahennettyLiike },
      );
      if (peitto <= 0) {
        if (r.el.style.opacity !== '0') r.el.style.opacity = '0';
        continue;
      }
      const p = videostaRuudulle(pallonPiste(r, nakyma, mitat), sov);
      r.el.style.width = `${koko.toFixed(1)}px`;
      r.el.style.transform = `translate(${p.x.toFixed(1)}px, `
        + `${(p.y - koko * REITTIKUVAN_NOSTO).toFixed(1)}px) translate(-50%, -50%)`;
      r.el.style.opacity = peitto.toFixed(3);
    }
  };

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
    const edella = koneenTila(reitti, t + 0.12);
    const a = pallonPiste(nyt, nakyma, mitat);
    const b = pallonPiste(edella, nakyma, mitat);
    /*
     * Lontoon pysähdyksessä kone ei liiku, joten suuntaa ei lasketa
     * nollavektorista: se jää siihen, mihin kone saapui.
     */
    const liike = Math.hypot(b.x - a.x, b.y - a.y);
    if (liike > 0.01) suuntaAste = Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI);
    kone.setAttribute('transform',
      `translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) `
      + `rotate(${suuntaAste.toFixed(1)}) scale(${KONEEN_SKAALA})`);
    kone.style.opacity = a.nakyy ? '1' : '0';

    /*
     * KIERROKSEN SAUMA: video looppaa saumattomasti (kierros on tasan
     * 360°), joten häivytys koskee vain SVG:tä — punainen viiva sulkee
     * ympyrän Lontoossa, häipyy pehmeästi pois pidon lopussa ja alkaa
     * kasvaa uudestaan tyhjästä loopin alettua.
     */
    const haivytys = Math.min(1, t / HAIVYTYS_S, (kesto - t) / HAIVYTYS_S);
    svg.style.opacity = Math.max(0, haivytys).toFixed(3);

    /*
     * KÄÄNNÖKSEN KUVA. Pinoa ei lasketa (`saapumisia`-laskuria ei enää
     * lueta täällä): jokainen kuva elää oman käännöksensä ajan ja
     * seuraa kaupunkiaan, ja piirto tapahtuu SVG:n alla, jotta kone
     * jää aina kuvan päälle.
     */
    piirraReittikuvat(t, nakyma);
  };

  const askel = () => {
    if (purettu) return;
    /*
     * Kierroksen saumaa ei enää tarvitse tunnistaa (ennen se nollasi
     * kuvalaskurin): video looppaa itsestään ja piirto lukee kellon.
     */
    piirraHetki((video.currentTime || 0) % kesto);
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
      /*
       * YKSI UUSINTA MYÖS VIDEOLLE (6.9.2026, r2.dev 429). Video ei
       * kerro statustaan sen paremmin kuin kuvakaan, ja ohimeneva
       * rajoitus pudotti koko kerroksen pois (paluu vanhaan
       * etusivuun). Ensimmäinen virhe käynnistää siis uuden `load()`:n
       * lyhyen odotuksen jälkeen, ja vasta toinen luovuttaa. Osoite ei
       * muutu — lähteet ovat <source>-elementeissä, ja sw.js
       * välimuistittaa polulla.
       */
      let uusittu = false;
      video.addEventListener('error', () => {
        if (uusittu) { paata(false); return; }
        uusittu = true;
        win.setTimeout(() => {
          if (ratkaistu) return;
          try { video.load(); } catch { paata(false); }
        }, UUSINNAN_VIIVE_MS);
      });
      win.setTimeout(() => paata(video.readyState >= 2), 9000);
      try { video.load(); } catch { paata(false); }
    });
    if (!valmis || purettu || !juuri.isConnected) {
      /*
       * Video ei latautunut → etusivu jää vanhaan karttaan. Juliste on
       * tässä vaiheessa voinut jo tulla näkyviin, joten kerros
       * HÄIVYTETÄÄN pois eikä napsauteta: pergamentti ei välähdä.
       */
      juuri.classList.remove('nakyy');
      avaus?.classList.remove('intro-pallolla');
      win.setTimeout(() => juuri.remove(), KERROKSEN_ILMESTYS_MS + 80);
      return null;
    }
    try { await video.play(); } catch { /* selain kieltäytyi: kuva jää paikalleen */ }
    // Video julisteen päälle pehmeästi (css .etusivupallo-video.nakyy).
    video.classList.add('nakyy');
    kehys = win.requestAnimationFrame(askel);
  }

  return {
    juuri,
    video,
    reitti,
    mitat,
    kamera,
    kesto,
    piirraHetki,
    koneRuudulla,
    reittikuvat,
    sovitus: sovitusNyt,
    pura() {
      if (purettu) return;
      purettu = true;
      if (kehys) win.cancelAnimationFrame(kehys);
      try { video.pause(); } catch { /* ei väliä */ }
      video.removeAttribute('src');
      avaus?.classList.remove('intro-pallolla');
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
  /*
   * KOTELO ON KOKO AVAUSPANEELI (omistaja 5.9.2026: *"pallo saisi
   * pyöriä koko etusivun alalla"*) eikä enää ylälohko .intro-kartta:
   * kerros menee paneelin ensimmäiseksi lapseksi, siis sumuverhon ja
   * molempien lohkojen taakse.
   */
  const kotelo = ui.introEl ?? ui.introKartta?.closest?.('.intro') ?? null;
  if (!kotelo) return;
  ui.etusivupalloAvautuu = true;
  void avaaEtusivupallo(kotelo).then((pallo) => {
    ui.etusivupalloAvautuu = false;
    if (!pallo) return;
    if (ui.dead || ui.game?.phase !== 'pickstart' || !etusivupalloPaalla()) { pallo.pura(); return; }
    ui.etusivupallo = pallo;
  }).catch(() => { ui.etusivupalloAvautuu = false; });
}
