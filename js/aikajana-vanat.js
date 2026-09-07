/*
 * ======== IHMISEN MATKA: VANAT PALLOLLA (rannikkoa maalaava kaista) ====
 *
 * OMISTAJA 7.9.2026 ilta (Raamattu, VANAT RANNIKKOA MAALAAVINA
 * KAISTOINA, EI VIIVA JA HALO, sanatarkasti): *"minusta olisi kiva, jos
 * se hehku maalaisi rannikkoa sen ääriviivan mukaisesti. Nythän se
 * menee sattumanvaraisesti yli. … ei tarvitse olla ohutta ja voimakasta
 * viivaa ja sen ympärillä olevaa haloa vain, vaan ennemmin niiden kahden
 * välistä olevalla peitolla oleva väri, joka leviää rannikkoa pitkin,
 * levittäytyen hieman sisämaahan. Ja siitä voisi tehdä hieman
 * vaihtelevan paksuista."*
 *
 * Geometria EI OLE KÄSIN PIIRRETTY: js/aikajana-virrat-laskenta.js
 * johdaVanat johtaa jokaisen vanan saapumisaikakentän edeltäjäketjusta
 * (docs/moduulit/ihmisen-matka-vanat.md luvut 2.1–2.3). Tämä tiedosto
 * vastaa vain PIIRROSTA (luku 14):
 *
 *   1. VANA ON YKSI PUOLILÄPINÄKYVÄ KAISTA, ei viiva + halo. Kaista on
 *      pallon pinnalle piirretty verkko: jokainen jana saa yhden
 *      instanssoidun nelikulmion ("hullin"), joka peittää kaistan alueen
 *      ruudulla, ja FRAGMENTTIVARJOSTIN laskee jokaiselle pikselille
 *      säde–pallo-leikkauksella pinnan pisteen ja sen ETÄISYYDEN OMAAN
 *      janaansa. Hulli piirtää vain siellä, missä oma jana on lähempänä
 *      kuin naapurit (OMISTUSSÄÄNTÖ, ks. FRAGMENTTI): pikseli kuuluu
 *      täsmälleen yhdelle hullille, ja peitto on etäisyyden pehmeä
 *      funktio. Liitokset ovat siten pyöreitä ja reuna häipyy — ei
 *      helminauhaa, ei Line2:n suorakaiteita, ei värinää.
 *   2. KAISTA LEIKATAAN RANTAVIIVAAN: varjostin lukee rantamaskin
 *      (js/linssit/ihmisen-matka-rantamaski.js, Natural Earth 0,125°,
 *      sama perhe kuin pallon vektorirantaviivat) tekstuurina ja
 *      kertoo peiton maan osuudella. Kaistan meren puoleinen reuna on
 *      siis rantaviiva, ja väri leviää siitä sisämaahan. Kärjet, jotka
 *      ovat aidosti merellä (Wallacea, Beringinsalmi, Tyynenmeren
 *      nauhat), saavat lipun `meri`: siellä kaista on kapea eikä
 *      maskaudu — meren ylitys näkyy pelkkänä vanana.
 *   3. LEVEYS VAIHTELEE AINEISTON MUKAAN: perusleveys km ja alueiden
 *      kertoimet (IHMISEN_MATKA_VANAT.kaista, kuvituksellinen — ei
 *      tiedeväite) kerrotaan kärkikohtaisesti pehmeällä laatikolla.
 *      Ruudulla on vähimmäisleveys pikseleinä, jotta kaista näkyy myös
 *      koko pallon näkymässä.
 *   4. KASVU JA VÄRI OVAT UNIFORMEJA, EIVÄT PUSKUREITA: kello etenee →
 *      per vana `kuljettu` (matkaHetkella) ja varjostin katkaisee janan
 *      siihen pyöreällä kärjellä; kärkiväri lasketaan varjostimessa
 *      samalla kaavalla kuin ennen (karjenPaino: rintama kymmenesosa
 *      kellosta). Korostus (korosta) on per vana peittokerroin.
 *   5. PÄÄLLEKKÄISYYS ON IDEMPOTENTTI: kaista kirjoittaa syvyyden, mutta
 *      ei nelikulmion omaa vaan pinnan pisteen syvyyden (gl_FragDepth
 *      samasta säde–pallo-leikkauksesta). Kaikilla saman pikselin
 *      fragmenteilla on täsmälleen sama syvyys, joten LESS-testi
 *      päästää vain ensimmäisen läpi — peitto ei summaudu liitoksissa
 *      eikä kamera-asento ratkaise voittajaa (ei värinää). Näkymätön
 *      fragmentti hylätään ennen syvyyskirjoitusta.
 *   6. PIIRTOJÄRJESTYS KALVOJEN JÄLKEEN (renderOrder 2 > kalvo 1):
 *      kerran maalatut kalvot (vanha väestö, varhaiset retket) eivät
 *      testaa kaistan kirjoittamaa syvyyttä. Vanha halo (Line2,
 *      depthWrite, −12) kirjoitti syvyyden ENNEN kalvoa samalla
 *      siirrolla, ja kalvon jänne painuu halon alle — sen z-taistelu
 *      oli omistajan näkemä "värinä pääviivan reunoilla" (mitattu
 *      7.9.2026, luku 14.2).
 *
 * KOTIPESÄT (Afrikan kolme lähdettä 300–164 ka) piirretään yhä
 * Line2-renkaina (luokat Globe.gl:n omasta nipusta, js/pallovektorit.js
 * line2Luokat): mallissa ne ovat toisistaan riippumattomia, ja niiden
 * välinen viiva olisi keksitty muuttoliike (suunnitelman 2.1.2).
 *
 * MODUULI EI KOSKE MUIHIN KERROKSIIN: se lisää omat olionsa pallon
 * ryhmään ja poistaa ne purkaessaan. Reittikerrokselta se lainaa
 * hetkeksi nollamittaisen polun (luokkien lukemiseksi) ja palauttaa
 * sen heti.
 */

import { kolmiulotteinen, kytkePallonKehys, pallonPiste } from './pallo.js';
import { line2Luokat } from './pallovektorit.js';
import { asteetLeveydesta, leveysKorkeudesta } from './pallolauta/kamera.js';
import {
  KM_ASTEELLA, RUUDUKON_KORKEUS, RUUDUKON_LEVEYS, puraMaamaski, rintamanLeveys, ruutu, virranVari,
} from './aikajana-virrat-laskenta.js';
import { RANTAMASKI } from './linssit/ihmisen-matka-rantamaski.js';

/** Vanan nosto pinnasta: rantaviivan (0) ja reittien (0,002) väliin. */
export const VANAN_KORKEUS = 0.0005;
/**
 * Läpinäkyvien jono: rantaviiva −0,5, reitit 0, kotipesät 0,6, kalvot 1,
 * KAISTA 2. Kaista piirtyy kalvojen jälkeen, koska se kirjoittaa
 * syvyyden (kohta 5–6 yllä).
 */
export const KAISTAN_RENDER_ORDER = 2;
export const KOTIPESAN_RENDER_ORDER = 0.6;
/** Kotipesän renkaan syvyyssiirto (laattakerroksen −8:n edelle). */
export const KOTIPESAN_SYVYYSSIIRTO = -16;
/**
 * Kaistan syvyysbias syvyyspuskurin yksikköinä (24-bittinen puskuri):
 * laattakerros vetää itsensä −8 yksikköä kameraa kohti
 * (LAATTAKERROS_SYVYYSSIIRTO), kaista pinnan pisteen syvyydestä −12.
 */
export const KAISTAN_SYVYYSBIAS = 12 / 16777216;
/**
 * Kaistan peitto: viivan (0,95) ja halon (0,14) välistä (omistaja:
 * *"niiden kahden välistä olevalla peitolla"*).
 */
export const KAISTAN_PEITTO = 0.5;
/** Kaistan KOKO leveys km kertoimella 1 (aineisto voi antaa omansa). */
export const KAISTAN_LEVEYS_KM = 200;
/** Meren ylityksen leveys osuutena maaleveydestä (kapea pelkkä vana). */
export const KAISTAN_MERI_KERROIN = 0.3;
/** Vähimmäisleveys ruudulla css-pikseleinä: maa / meri (koko leveys). */
export const KAISTAN_MIN_PX = 7;
export const KAISTAN_MERI_MIN_PX = 3;
/** Reunan pehmennys: vähintään tämä km ja vähintään tämä css-px. */
export const KAISTAN_PEHMENNYS_KM = 12;
export const KAISTAN_PEHMENNYS_PX = 1.5;
/** Leveyskertoimen rajat (aineiston alueet summautuvat, tulos rajataan). */
export const KAISTAN_KERROIN_RAJAT = [0.3, 3.5];
/** Alueen reunan pehmeys asteina, ellei alue anna omaansa. */
export const KAISTAN_ALUEEN_PEHMEYS = 4;
/**
 * Kärjen MERISYYS etäisyydestä lähimpään maahan (km): alle ensimmäisen
 * rajan kärki on rannikolla (leveä kaista, rantaviivaan leikattu), yli
 * toisen se on aidosti merellä (kapea vana ilman maskia), välissä
 * liukuu. Beringinsalmi on 82 km leveä (keskeltä 41 km rantaan), joten
 * ylitys on merellä. MALLIN KULKUMASKI RATKAISEE ENSIN (merisyys):
 * kärki, jonka 0,5° ruudussa malli KÄVELI (maata kulkumaskissa), on
 * rannikkoa, vaikka tarkka maski näyttäisi sen vedessä. Rannikkokärki,
 * joka on vedessä (0…45 km), maalaa RANNASTA sisämaahan: kaistan
 * etäisyys mitataan rantaan asti anteeksi (attribuutti iRanta), joten
 * mallin sileän vanan pyöristämä lahti ei jää tyhjäksi.
 */
export const KAISTAN_MERI_RAJAT_KM = [25, 45];
/** Rantamaskin maa/meri-kynnys ja pehmeys varjostimessa (bilineaarinen luku). */
export const RANTAMASKIN_KYNNYS = [0.35, 0.65];
/** Kärki kulkee kameran edellä: osuus kellon lukemasta (luku 3.2). */
export const VANAN_ENNAKKO = 0.04;
/*
 * ENNAKON KATTO ASTEINA. Neljä prosenttia kellosta on 75 ka:n kohdalla
 * 3 000 vuotta, ja mallissa Arabia → Altai kuluu 2 000 vuodessa: ilman
 * kattoa kamera katsoisi Kazakstania samalla kun piirretty kärki on
 * vielä Omanissa (mitattu selaimessa 6.9.2026, kuva oli tyhjä).
 * Ennakko saa siis viedä kohdetta enintään tämän verran kärjestä.
 */
export const VANAN_ENNAKKO_MAX_AST = 10;
/** Reduced motion: värit ja kasvu päivittyvät puolen sekunnin askelin. */
export const VANAN_ASKEL_MS = 500;
/** Kotipesän renkaan kärkien määrä. */
export const KOTIPESAN_KARKIA = 24;
/** Kotipesän renkaan leveys css-pikseleinä. */
export const KOTIPESAN_LEVEYS_PX = 2;
/** Kotipesän renkaan peitto. */
export const KOTIPESAN_PEITTO = 0.28;
/** Maapallon säde km (rantamaskin ja leveyksien yksikkömuunnos). */
export const MAAPALLON_SADE_KM = 6371;
/** Varjostimen uniformitaulukoiden koot: vanoja ja virtoja enintään. */
export const KAISTAN_VANOJA_MAX = 24;
export const KAISTAN_VIRTOJA_MAX = 8;
/** three:n vakiot (numerot ovat vakaat r100+; luokat luetaan elävästä pallosta). */
const LESS_DEPTH = 2;
const DOUBLE_SIDE = 2;
const RED_FORMAT = 1028;
const UNSIGNED_BYTE = 1009;
const LINEAR_FILTER = 1006;
const REPEAT_WRAP = 1000;
const CLAMP_WRAP = 1001;
/** Luokkien odotus: kierrosta × väli (ms). */
const LUOKKIEN_YRITYKSET = 100;
const LUOKKIEN_VALI_MS = 50;
/** Instanssin lomitetun puskurin leveys (floatteja): ks. RAKENNE alla. */
const INSTANSSIN_LEVEYS = 36;

/* ------------------------------------------------------ puhtaat apurit */

/**
 * Matka, jonka kärki on ehtinyt hetkellä `nyt` (vuosia sitten).
 * `matka` on kumulatiivinen maailmamatka kärjittäin ja `aika` kärkien
 * saapumisajat LASKEVASSA järjestyksessä.
 *
 *   nyt ≥ aika[0]        vana ei ole vielä alkanut → 0
 *   nyt ≤ aika[viim.]    vana on kokonaan piirretty → koko matka
 *
 * Väliltä haetaan pari, jonka välissä kello on, ja matka
 * interpoloidaan lineaarisesti — yksi haku per vana per päivitys.
 */
export function matkaHetkella(matka, aika, nyt) {
  const n = Math.min(matka?.length ?? 0, aika?.length ?? 0);
  if (n < 2) return 0;
  if (!(nyt < aika[0])) return 0;
  if (nyt <= aika[n - 1]) return matka[n - 1];
  for (let k = 0; k + 1 < n; k += 1) {
    const a = aika[k];
    const b = aika[k + 1];
    if (nyt <= a && nyt >= b) {
      const t = a === b ? 1 : (a - nyt) / (a - b);
      return matka[k] + (matka[k + 1] - matka[k]) * t;
    }
  }
  return matka[n - 1];
}

/**
 * Kärjen paino 0…1 hetkellä `nyt`: 1 rintamalla (juuri saavutettu),
 * 0 vanhalla osalla. Sama kaava kuin ruudunTila kalvolla, joten vana
 * ja väri vanhenevat samaa tahtia. Varjostin laskee saman kaavan
 * (ks. FRAGMENTTI), tämä on sen Node-testattava vastine.
 */
export function karjenPaino(aika, nyt, rintama, { pito = false } = {}) {
  if (!(aika > 0) || !(rintama > 0)) return 0;
  /*
   * PITOTILASSA MENNYT ON MENNYTTÄ (kertomusesitys, ks. paivita).
   * Kun kello on kelattu taaksepäin, vanan jo piirretyssä osassa on
   * kärkiä, joiden aika EI ole vielä tullut (aika < nyt). Ilman tätä
   * ehtoa kaava antaisi niille painon yli yhden — koko vana leimahtaisi
   * rintaman väriin. Pidetty osa on vanhaa väestöä, ei rintamaa.
   */
  if (pito && nyt > aika) return 0;
  return Math.max(0, Math.min(1, 1 - (aika - nyt) / rintama));
}

/** Pituusaste laatikon sisällä (väli saa kiertää antimeridiaanin): etäisyys reunaan asteina (≥ 0 sisällä). */
function laatikonSyvyysAst(lat, lon, laatikko) {
  const [s, n] = laatikko.lat;
  const [w, e] = laatikko.lon;
  const dLat = Math.min(lat - s, n - lat);
  let dLon;
  if (w <= e) {
    dLon = Math.min(lon - w, e - lon);
  } else {
    // Kiertää 180°: sisällä kun lon ≥ w tai lon ≤ e.
    const lonK = lon >= w ? lon : lon + 360;
    const eK = e + 360;
    dLon = Math.min(lonK - w, eK - lonK);
  }
  return Math.min(dLat, dLon);
}

/**
 * Kaistan LEVEYSKERROIN kärjelle. Jokainen alue antaa 1 + (kerroin − 1)
 * × pehmeä paino, missä paino on 1 alueen sisällä (pehmeysvyön verran
 * reunasta), 0 sen ulkopuolella ja liukuu välissä. Päällekkäiset alueet
 * eivät summaudu: suurin levennys (≥ 1) ja pienin kavennus (≤ 1)
 * kertautuvat. Alueet ovat kuvituksellisia (IHMISEN_MATKA_VANAT.kaista
 * .alueet; ei tiedeväite). Tulos rajataan KAISTAN_KERROIN_RAJAT:iin.
 */
export function leveyskerroin(lat, lon, alueet = [], {
  pehmeys = KAISTAN_ALUEEN_PEHMEYS, rajat = KAISTAN_KERROIN_RAJAT,
} = {}) {
  let levein = 1;
  let kapein = 1;
  for (const alue of alueet ?? []) {
    if (!alue?.lat || !alue?.lon) continue;
    const p = alue.pehmeys ?? pehmeys;
    const d = laatikonSyvyysAst(lat, lon, alue);
    // d = −p → 0, d = 0 → 0,5, d = +p → 1 (reuna on laatikon reunalla).
    const w = Math.max(0, Math.min(1, (d + p) / (2 * p)));
    if (w <= 0) continue;
    const k = 1 + ((alue.kerroin ?? 1) - 1) * w;
    if (k >= 1) levein = Math.max(levein, k);
    else kapein = Math.min(kapein, k);
  }
  return Math.max(rajat[0], Math.min(rajat[1], levein * kapein));
}

/** Kaistan koko leveys km kärjelle: perusleveys × kerroin. */
export function kaistanLeveysKm(lat, lon, kaista = {}) {
  const perus = kaista.leveysKm ?? KAISTAN_LEVEYS_KM;
  return perus * leveyskerroin(lat, lon, kaista.alueet ?? []);
}

/**
 * Vähimmäisleveys km ruudun mitasta: `px` css-pikseliä nykyisellä
 * km/px-mittakaavalla. Kaistan leveys on maantieteellinen, mutta koko
 * pallon näkymässä 200 km olisi alle pikselin — silloin kaista on
 * vähintään tämän levyinen.
 */
export function vahimmaisleveysKm(kmPerPx, px = KAISTAN_MIN_PX) {
  if (!(kmPerPx > 0)) return 0;
  return px * kmPerPx;
}

/** Rantamaskin ruutuindeksi (rivi 0 = 90°N, sarake 0 = 180°W). */
export function rantamaskinRuutu(lat, lon, maski = RANTAMASKI) {
  const W = maski.leveys;
  const H = maski.korkeus;
  const aste = maski.aste ?? 360 / W;
  const c = Math.min(W - 1, Math.max(0, Math.floor((((lon + 180) % 360) + 360) % 360 / aste)));
  const r = Math.min(H - 1, Math.max(0, Math.floor((90 - lat) / aste)));
  return r * W + c;
}

/**
 * Etäisyys lähimpään maaruutuun (km) enintään `maxKm`:n säteellä;
 * Infinity, jos maata ei ole. Käy läpi ruudut ±n sarakkeen ja rivin
 * ikkunassa (0,125° → 45 km on 4 ruutua) ja mittaa isoympyrämatkan
 * ruudun keskipisteeseen. Pituusaste kiertää.
 */
export function etaisyysMaahan(lat, lon, maa, maski = RANTAMASKI, maxKm = KAISTAN_MERI_RAJAT_KM[1]) {
  if (!maa) return 0;
  if (maa[rantamaskinRuutu(lat, lon, maski)]) return 0;
  const W = maski.leveys;
  const H = maski.korkeus;
  const aste = maski.aste ?? 360 / W;
  const RAD = Math.PI / 180;
  const c0 = Math.floor((((lon + 180) % 360) + 360) % 360 / aste);
  const r0 = Math.min(H - 1, Math.max(0, Math.floor((90 - lat) / aste)));
  const cosLat = Math.max(0.05, Math.cos(lat * RAD));
  const nRivi = Math.ceil(maxKm / (KM_ASTEELLA * aste)) + 1;
  const nSar = Math.min(W >> 1, Math.ceil(maxKm / (KM_ASTEELLA * aste * cosLat)) + 1);
  let paras = Infinity;
  const f1 = lat * RAD;
  for (let dr = -nRivi; dr <= nRivi; dr += 1) {
    const r = r0 + dr;
    if (r < 0 || r >= H) continue;
    const la = (90 - (r + 0.5) * aste) * RAD;
    for (let dc = -nSar; dc <= nSar; dc += 1) {
      const c = ((c0 + dc) % W + W) % W;
      if (!maa[r * W + c]) continue;
      const lo = (-180 + (c + 0.5) * aste);
      let dl = lo - lon;
      while (dl > 180) dl -= 360;
      while (dl < -180) dl += 360;
      const d = Math.acos(Math.max(-1, Math.min(1,
        Math.sin(f1) * Math.sin(la) + Math.cos(f1) * Math.cos(la) * Math.cos(dl * RAD)))) * MAAPALLON_SADE_KM;
      if (d < paras) paras = d;
    }
  }
  return paras;
}

/**
 * Kärjen merisyys 0…1 (ks. KAISTAN_MERI_RAJAT_KM): 0 rannikolla tai
 * maalla, 1 aidosti merellä, välissä liukuu. Ilman maskia 0. `kulku`
 * on mallin kulkumaski { maa, leveys, korkeus } (0,5°): jos malli käveli
 * kärjen ruudussa maalla, kärki on rannikkoa.
 */
export function merisyys(lat, lon, maa, maski = RANTAMASKI, rajat = KAISTAN_MERI_RAJAT_KM, kulku = null) {
  if (!maa) return 0;
  if (kulku?.maa) {
    const i = ruutu(lat, lon, kulku.leveys ?? RUUDUKON_LEVEYS, kulku.korkeus ?? RUUDUKON_KORKEUS);
    if (kulku.maa[i]) return 0;
  }
  if (maa[rantamaskinRuutu(lat, lon, maski)]) return 0;
  const d = etaisyysMaahan(lat, lon, maa, maski, rajat[1] + 5);
  if (!(d > rajat[0])) return 0;
  if (d >= rajat[1]) return 1;
  const t = (d - rajat[0]) / (rajat[1] - rajat[0]);
  return t * t * (3 - 2 * t);
}

/** Onko kärki merellä kaistan mielessä (merisyys yli puolen). */
export function karkiMerella(lat, lon, maa, maski = RANTAMASKI, kulku = null) {
  return merisyys(lat, lon, maa, maski, KAISTAN_MERI_RAJAT_KM, kulku) > 0.5;
}

/**
 * Vanan kärki hetkellä `nyt`: { lat, lng }. Kello kulkee yhteen
 * suuntaan, joten kärki liikkuu vain eteenpäin. `ennakko` siirtää
 * kohteen sinne, missä vana on 4 %:n kellonlukeman päästä — kamera
 * seuraa kärkeä hieman edellä (luku 3.2).
 */
export function karkiHetkella(pisteet, nyt, { ennakko = 0, maxAst = VANAN_ENNAKKO_MAX_AST } = {}) {
  if (!pisteet?.length) return null;
  if (ennakko > 0 && maxAst > 0) {
    // Ennakko rajattuna: kohde enintään `maxAst` päässä oikeasta kärjestä.
    const karki = karkiHetkella(pisteet, nyt, { ennakko: 0 });
    const edella = karkiHetkella(pisteet, nyt, { ennakko, maxAst: 0 });
    if (!karki || !edella) return karki ?? edella;
    const RAD = Math.PI / 180;
    const f1 = karki.lat * RAD;
    const f2 = edella.lat * RAD;
    let dl = edella.lng - karki.lng;
    while (dl > 180) dl -= 360;
    while (dl < -180) dl += 360;
    const d = Math.acos(Math.max(-1, Math.min(1,
      Math.sin(f1) * Math.sin(f2) + Math.cos(f1) * Math.cos(f2) * Math.cos(dl * RAD)))) / RAD;
    if (!(d > maxAst)) return edella;
    const osuus = maxAst / d;
    let lng = karki.lng + dl * osuus;
    while (lng > 180) lng -= 360;
    while (lng < -180) lng += 360;
    return { lat: karki.lat + (edella.lat - karki.lat) * osuus, lng };
  }
  const hetki = ennakko > 0 ? nyt * (1 - ennakko) : nyt;
  const eka = pisteet[0];
  const vika = pisteet[pisteet.length - 1];
  if (!(hetki < eka[2])) return { lat: eka[0], lng: eka[1] };
  if (hetki <= vika[2]) return { lat: vika[0], lng: vika[1] };
  for (let k = 0; k + 1 < pisteet.length; k += 1) {
    const a = pisteet[k];
    const b = pisteet[k + 1];
    if (hetki <= a[2] && hetki >= b[2]) {
      const t = a[2] === b[2] ? 1 : (a[2] - hetki) / (a[2] - b[2]);
      let dLon = b[1] - a[1];
      while (dLon > 180) dLon -= 360;
      while (dLon < -180) dLon += 360;
      let lng = a[1] + dLon * t;
      while (lng > 180) lng -= 360;
      while (lng < -180) lng += 360;
      return { lat: a[0] + (b[0] - a[0]) * t, lng };
    }
  }
  return { lat: vika[0], lng: vika[1] };
}

/** sRGB-tavu (0…255) lineaariseksi: varjostimen värit ovat lineaarisia. */
export function lineaariseksi(c) {
  const v = Math.max(0, Math.min(1, c / 255));
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

/** Kotipesän rengas asteina: ympyrä säteellä `sadeKm` pisteen ympäri. */
export function kotipesanRengas(lat, lon, sadeKm, karkia = KOTIPESAN_KARKIA) {
  const sadeAst = sadeKm / KM_ASTEELLA;
  const cosLat = Math.max(0.2, Math.cos((lat * Math.PI) / 180));
  const ulos = [];
  for (let k = 0; k <= karkia; k += 1) {
    const kulma = (2 * Math.PI * k) / karkia;
    let lng = lon + (sadeAst / cosLat) * Math.cos(kulma);
    while (lng > 180) lng -= 360;
    while (lng < -180) lng += 360;
    ulos.push([Math.max(-89.9, Math.min(89.9, lat + sadeAst * Math.sin(kulma))), lng]);
  }
  return ulos;
}

/*
 * ------------------------------------------------------------ varjostin
 *
 * RAKENNE: yksi InstancedBufferGeometry, jossa perusnelikulmio (4
 * kärkeä, `position.xy` = kulma ±1) ja instanssi per jana lomitetussa
 * puskurissa (INSTANSSIN_LEVEYS floattia):
 *
 *   0–11   iP0 iP1 iP2 iP3   janan j−1 alku, janan j alku ja loppu, janan j+1 loppu (xyz)
 *   12–15  iW                puolileveys (maailmayksikköä) kärjillä j−1 … j+2
 *   16–19  iMatka            kumulatiivinen matka kärjillä
 *   20–23  iAika             saapumisaika (vuosia sitten) kärjillä
 *   24–27  iMeri             1 = kärki merellä (kapea, ei maskia)
 *   28–31  iRanta            kärjen etäisyys rantaan vedessä (maailmayksikköä; 0 maalla)
 *   32–33  iVirta            virran indeksi kärjillä j, j+1
 *   34     iVana             vanan indeksi (kasvu ja korostus uniformeista)
 *   35     (vara)
 *
 * Kärkivarjostin levittää nelikulmion janan ympärille (puolileveys +
 * pehmennys + kärkien pyöreä pää) ja nostaa kulmat pallon pinnan
 * yläpuolelle, jotta jänne ei painu pinnan alle. Fragmenttivarjostin
 * ei käytä nelikulmion omaa pintaa mihinkään: se leikkaa kameran
 * säteen pallon kanssa ja laskee kaiken pinnan pisteestä (kohta 1 ja 5
 * tiedoston alussa).
 */
const KARKIVARJOSTIN = /* glsl */`
attribute vec3 iP0; attribute vec3 iP1; attribute vec3 iP2; attribute vec3 iP3;
attribute vec4 iW; attribute vec4 iMatka; attribute vec4 iAika; attribute vec4 iMeri; attribute vec4 iRanta;
attribute vec2 iVirta; attribute float iVana;
uniform float uSade;
uniform float uMinPuoli;
uniform float uPehmennys;
uniform float uKuljettu[VANOJA];
uniform float uVanaPeitto[VANOJA];
varying vec3 vPos;
varying vec3 vP0; varying vec3 vP1; varying vec3 vP2; varying vec3 vP3;
varying vec4 vW; varying vec4 vMatka; varying vec4 vAika; varying vec4 vMeri; varying vec4 vRanta;
varying vec4 vMeta; // virta j, virta j+1, kuljettu, peittokerroin
void main() {
  vec3 a = iP1;
  vec3 b = iP2;
  vec3 keski = position.y < 0.0 ? a : b;
  vec3 ab = b - a;
  float pituus = length(ab);
  vec3 suunta = pituus > 1e-5 ? ab / pituus : normalize(cross(normalize(keski), vec3(0.0, 1.0, 0.0)));
  vec3 normaali = normalize(cross(suunta, normalize(keski)));
  float H = max(max(iW.y, iW.z), uMinPuoli) + max(iRanta.y, iRanta.z) + uPehmennys + 0.02 * uSade;
  vec3 pos = keski + normaali * (position.x * H) + suunta * (position.y * H);
  // Jänteen painuma: kulma pallon pinnan yläpuolelle.
  float nosto = length(keski) + (H * H) / (2.0 * uSade) + 0.001 * uSade;
  pos = normalize(pos) * nosto;
  vPos = pos;
  vP0 = iP0; vP1 = iP1; vP2 = iP2; vP3 = iP3;
  vW = iW; vMatka = iMatka; vAika = iAika; vMeri = iMeri; vRanta = iRanta;
  int vana = int(iVana + 0.5);
  vMeta = vec4(iVirta.x, iVirta.y, uKuljettu[vana], uVanaPeitto[vana]);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const FRAGMENTTIVARJOSTIN = /* glsl */`
uniform vec3 uKamera;
uniform mat4 uMVP;
uniform mat4 uMVPKaanteinen;
uniform vec2 uRuutu;
uniform float uSade;
uniform float uSyvyysBias;
uniform float uMinPuoli;
uniform float uMinPuoliMeri;
uniform float uMeriKerroin;
uniform float uPehmennys;
uniform float uNyt;
uniform float uRintama;
uniform float uPito;
uniform float uPeitto;
uniform float uMaskiPaalla;
uniform vec2 uMaskiKynnys;
uniform sampler2D uMaski;
uniform vec3 uVanha[VIRTOJA];
uniform vec3 uKirkas[VIRTOJA];
varying vec3 vPos;
varying vec3 vP0; varying vec3 vP1; varying vec3 vP2; varying vec3 vP3;
varying vec4 vW; varying vec4 vMatka; varying vec4 vAika; varying vec4 vMeri; varying vec4 vRanta;
varying vec4 vMeta;

/* Etäisyys janaan a→b ja projektion parametri t (0…1). */
float janaan(vec3 q, vec3 a, vec3 b, out float t) {
  vec3 ab = b - a;
  float l2 = dot(ab, ab);
  t = l2 > 1e-10 ? clamp(dot(q - a, ab) / l2, 0.0, 1.0) : 0.0;
  return length(q - (a + ab * t));
}

/*
 * Jana k (pisteet a→b, matkat ma→mb) kasvun mukaan katkaistuna:
 * palauttaa etäisyyden ja kirjoittaa parametrin KOKO janalla (t × f).
 * Jana, jota kello ei ole vielä aloittanut, on äärettömän kaukana.
 */
float katkaistuun(vec3 q, vec3 a, vec3 b, float ma, float mb, float kulj, out float tKoko) {
  tKoko = 0.0;
  if (kulj <= ma) return 1e9;
  float f = mb > ma ? clamp((kulj - ma) / (mb - ma), 0.0, 1.0) : 1.0;
  vec3 bb = a + (b - a) * f;
  float t;
  float d = janaan(q, a, bb, t);
  tKoko = t * f;
  return d;
}

void main() {
  /*
   * KAMERAN SÄDE PIKSELISTÄ, EI NELIKULMIOSTA: suunta lasketaan
   * gl_FragCoordista käänteisellä MVP:llä, jolloin se on bitilleen sama
   * jokaiselle saman pikselin fragmentille — myös pinnan piste, peitto ja
   * syvyys. Nelikulmion interpoloidusta paikasta (vPos) laskettu suunta
   * erosi viimeisissä biteissä hullista toiseen, ja syvyystesti päästi
   * satunnaisesti toisenkin fragmentin läpi (kaistaan tuli päällekkäisten
   * hullien muotoisia tummempia kaaria; mitattu 7.9.2026).
   */
  vec2 ndc = (gl_FragCoord.xy / uRuutu) * 2.0 - 1.0;
  vec4 kauas = uMVPKaanteinen * vec4(ndc, 1.0, 1.0);
  vec3 suunta = normalize(kauas.xyz / kauas.w - uKamera);
  float b = dot(uKamera, suunta);
  float c = dot(uKamera, uKamera) - uSade * uSade;
  float disc = b * b - c;
  if (disc < 0.0) discard;
  float t0 = -b - sqrt(disc);
  if (t0 < 0.0) discard;
  vec3 q = uKamera + suunta * t0;

  float kulj = vMeta.z;
  /*
   * OMISTUSSÄÄNTÖ: HULLI MAALAA VAIN OMAN JANANSA ALUEEN.
   *
   * Hulli tuntee kolme janaa (edellinen, oma, seuraava). Ennen tätä se
   * otti niistä LÄHIMMÄN, ja silloin sama pikseli sai eri hulleilta eri
   * peiton: hullin peitto vaimenee sen kolmen janan ikkunan päässä
   * pyöreäksi kärjeksi, ja koska syvyys on kaikilla sama, LESS-testi
   * päästi läpi sen, joka piirtyi ENSIN — ei sitä, jonka jana oli
   * lähin. Tulos oli valojuova jokaisen kärjen kohdalla (helminauha) ja
   * kameran liikkuessa juovat pomppivat hullista toiseen: juuri se
   * "värinä pääviivan reunoilla", jonka omistaja näki (mitattu
   * 7.9.2026, luku 14.2).
   *
   * Nyt hulli piirtää vain siellä, missä OMA jana (vP1→vP2) on
   * lähempänä kuin naapurit. Alue on naapurien puolittajien rajaama
   * pala, jokainen pikseli kuuluu täsmälleen yhdelle hullille, ja
   * peitto lasketaan aina omasta etäisyydestä — se ei siis riipu
   * piirtojärjestyksestä eikä kameran asennosta. Puolittajalla
   * molemmat piirtävät (SUVAITSE), mutta siellä etäisyys ja kärkiväli
   * ovat samat, joten sauma ei näy. Vanan PÄISSÄ naapurijana on
   * rappeutunut (sama piste kahdesti), jolloin se ei koskaan ole
   * lähempänä ja pyöreä pää säilyy; kasvun kärjessä katkaistu jana on
   * omistaja, koska naapurin oma jana jää taakse.
   */
  float t1; float t2; float t3;
  float d1 = katkaistuun(q, vP0, vP1, vMatka.x, vMatka.y, kulj, t1);
  float d2 = katkaistuun(q, vP1, vP2, vMatka.y, vMatka.z, kulj, t2);
  float d3 = katkaistuun(q, vP2, vP3, vMatka.z, vMatka.w, kulj, t3);
  if (d2 > 1e8) discard;
  float SUVAITSE = 1e-4 * uSade;
  if (d1 < d2 - SUVAITSE || d3 < d2 - SUVAITSE) discard;
  float d = d2;
  float w = mix(vW.y, vW.z, t2);
  float aika = mix(vAika.y, vAika.z, t2);
  float meri = mix(vMeri.y, vMeri.z, t2);
  float ranta = mix(vRanta.y, vRanta.z, t2);

  /*
   * Peitto etäisyydestä: maalla leveä ja rantaviivaan leikattu, merellä
   * kapea. Rannikkokärki vedessä: etäisyys mitataan rannasta (ranta),
   * jotta kaista alkaa rantaviivasta eikä jää lahden keskelle.
   */
  float puoliMaa = max(w, uMinPuoli);
  float puoliMeri = max(w * uMeriKerroin, uMinPuoliMeri);
  float muotoMaa = 1.0 - smoothstep(puoliMaa - uPehmennys, puoliMaa, max(0.0, d - ranta));
  float muotoMeri = 1.0 - smoothstep(puoliMeri - uPehmennys, puoliMeri, d);
  float maa = 1.0;
  if (uMaskiPaalla > 0.5) {
    float r = length(q);
    float lat = asin(clamp(q.y / r, -1.0, 1.0));
    float lon = atan(q.x, q.z);
    vec2 uv = vec2(lon / 6.28318530718 + 0.5, 0.5 - lat / 3.14159265359);
    maa = smoothstep(uMaskiKynnys.x, uMaskiKynnys.y, texture2D(uMaski, uv).r);
  }
  float alpha = mix(muotoMaa * maa, muotoMeri, clamp(meri, 0.0, 1.0));
  alpha *= uPeitto * vMeta.w;
  if (alpha < 0.004) discard;

  /* Kärkiväri: sama kaava kuin karjenPaino (rintama kymmenesosa kellosta). */
  float paino = uRintama > 0.0 ? clamp(1.0 - (aika - uNyt) / uRintama, 0.0, 1.0) : 0.0;
  if (uPito > 0.5 && uNyt > aika) paino = 0.0;
  int v0 = int(vMeta.x + 0.5);
  int v1 = int(vMeta.y + 0.5);
  vec3 vanha = mix(uVanha[v0], uVanha[v1], t2);
  vec3 kirkas = mix(uKirkas[v0], uKirkas[v1], t2);
  vec3 vari = mix(vanha, kirkas, paino);
  gl_FragColor = vec4(vari, alpha);

  /* Syvyys pinnan pisteestä, ei nelikulmiosta: päällekkäiset fragmentit ovat tasan samassa syvyydessä. */
  vec4 leike = uMVP * vec4(q, 1.0);
  float z = leike.z / leike.w;
  gl_FragDepthEXT = clamp(z * 0.5 + 0.5 - uSyvyysBias, 0.0, 1.0);
}
`;

/* ------------------------------------------------------------- piirto */

/**
 * Vanat pallolle. Palauttaa kahvan, jota js/aikajana-virrat.js kutsuu:
 *
 *   valmis          lupaus: luokat saatu ja kaista rakennettu
 *   paivita(nyt)    kello siirtyi: kasvu ja kärkivärit (uniformit)
 *   korosta(virta)  tutkimusvaiheen korostus (per vana peittokerroin)
 *   karki(nyt)      selkärangan kärki { lat, lng } kameralle
 *   pisteet()       vanojen kärkilistat (tutkimusvaihe)
 *   tila()          mittarit savukkeelle
 *   pura()          kaikki pois
 *
 * @param vanat johdaVanat-tulos [{ tunnus, virta, virrat?, pisteet }]
 * @param virrat virtojen aineisto (värit tunnuksittain)
 * @param kaista IHMISEN_MATKA_VANAT.kaista (leveydet, alueet, peitto)
 * @param maamaski mallin kulkumaski (MAAMASKI: juoksut, leveys, korkeus) merisyyteen
 */
export function luoVanat({
  pallo, kotelo, reitit, vanat = [], kotipesat = [], virrat = [], kaista = {}, maamaski = null,
  reduced = false, ikkuna = globalThis,
}) {
  const virtalista = (virrat ?? []).map((v) => v.tunnus);
  const varit = new Map((virrat ?? []).map((v) => [v.tunnus, v.vari]));
  const oliot = [];
  const materiaalit = [];
  let luokat = null;
  let kolmi = null;
  let kehyspurku = () => {};
  let kehysmitat = null;
  let purettu = false;
  let viimeNyt = -1;
  let viimeAskel = -Infinity;
  let verkko = null;
  let materiaali = null;
  let tekstuuri = null;
  let maa = null;
  let kulku = null;
  const mittarit = {
    vanoja: 0, karkia: 0, janoja: 0, paivityksia: 0, leveysPx: 0, minPx: KAISTAN_MIN_PX, maski: false, syy: '',
  };
  const peitto = kaista.peitto ?? KAISTAN_PEITTO;
  const meriKerroin = kaista.meriKerroin ?? KAISTAN_MERI_KERROIN;

  const nytMs = () => ikkuna.performance?.now?.() ?? Date.now();
  const odota = (ms) => new Promise((ok) => { ikkuna.setTimeout(ok, ms); });
  const pallonSade = () => pallo?.getGlobeRadius?.() ?? 100;
  const sade = () => pallonSade() * (1 + VANAN_KORKEUS);
  /** Maailmayksikköä kilometriä kohti. */
  const yksPerKm = () => pallonSade() / MAAPALLON_SADE_KM;
  const ruutu = () => ({
    W: kehysmitat?.W || kotelo?.clientWidth || 1,
    H: kehysmitat?.H || kotelo?.clientHeight || 1,
  });
  const luovuta = (syy) => { mittarit.syy = syy; return false; };

  /** Kilometriä css-pikseliä kohti ruudun keskellä (vähimmäisleveyteen). */
  function kmPerPikseli() {
    const { W } = ruutu();
    const korkeus = kehysmitat?.pov?.altitude ?? pallo?.pointOfView?.()?.altitude ?? 1;
    const kuvasuhde = kehysmitat?.kuvasuhde || 1;
    const asteet = asteetLeveydesta(leveysKorkeudesta(korkeus, { kuvasuhde }));
    return (asteet * KM_ASTEELLA) / Math.max(1, W);
  }

  /** Vanan kärjet: paikat pallon pinnalla, matka, aika, puolileveys, meri, virta. */
  function karjet(vana, R) {
    const pisteet = vana.pisteet ?? [];
    const n = pisteet.length;
    const paikat = new Float32Array(n * 3);
    const matka = new Float32Array(n);
    const aika = new Float32Array(n);
    const puoli = new Float32Array(n);
    const meri = new Float32Array(n);
    const ranta = new Float32Array(n);
    const virta = new Float32Array(n);
    const kmYks = yksPerKm();
    let edellinen = null;
    let summa = 0;
    for (let k = 0; k < n; k += 1) {
      const [lat, lon, t] = pisteet[k];
      const p = pallonPiste(lat, lon, R);
      paikat[k * 3] = p.x;
      paikat[k * 3 + 1] = p.y;
      paikat[k * 3 + 2] = p.z;
      if (edellinen) summa += Math.hypot(p.x - edellinen.x, p.y - edellinen.y, p.z - edellinen.z);
      matka[k] = summa;
      aika[k] = t;
      puoli[k] = (kaistanLeveysKm(lat, lon, kaista) / 2) * kmYks;
      meri[k] = merisyys(lat, lon, maa, RANTAMASKI, KAISTAN_MERI_RAJAT_KM, kulku);
      const rantaKm = etaisyysMaahan(lat, lon, maa, RANTAMASKI, KAISTAN_MERI_RAJAT_KM[1]);
      ranta[k] = (Number.isFinite(rantaKm) ? rantaKm : KAISTAN_MERI_RAJAT_KM[1]) * kmYks;
      const tunnus = vana.virrat?.[k] ?? vana.virta;
      const i = virtalista.indexOf(tunnus);
      virta[k] = i >= 0 ? i : 0;
      edellinen = p;
    }
    return { paikat, matka, aika, puoli, meri, ranta, virta, n };
  }

  /** Rantamaski tekstuuriksi (R8, bilineaarinen, pituusaste kiertää). */
  function teeMaski() {
    if (!kolmi?.Texture || !RANTAMASKI?.juoksut) return null;
    const W = RANTAMASKI.leveys;
    const H = RANTAMASKI.korkeus;
    const data = new Uint8Array(W * H);
    for (let i = 0; i < data.length; i += 1) data[i] = maa[i] ? 255 : 0;
    const t = new kolmi.Texture();
    t.image = { data, width: W, height: H };
    t.isDataTexture = true;
    t.format = RED_FORMAT;
    t.type = UNSIGNED_BYTE;
    t.magFilter = LINEAR_FILTER;
    t.minFilter = LINEAR_FILTER;
    t.generateMipmaps = false;
    t.wrapS = REPEAT_WRAP;
    t.wrapT = CLAMP_WRAP;
    t.unpackAlignment = 1;
    t.flipY = false;
    t.needsUpdate = true;
    return t;
  }

  function rakenna() {
    const R = sade();
    const { W, H } = ruutu();
    const ShaderMaterial = Object.getPrototypeOf(luokat.LineMaterial.prototype).constructor;
    const InstancedBufferGeometry = Object.getPrototypeOf(luokat.LineSegmentsGeometry.prototype).constructor;
    const malli = new luokat.LineGeometry();
    malli.setPositions(new Float32Array([0, 0, 0, 1, 0, 0]));
    const alkuAttr = malli.getAttribute('instanceStart');
    const InterleavedBufferAttribute = alkuAttr?.constructor ?? null;
    const InstancedInterleavedBuffer = alkuAttr?.data?.constructor ?? null;
    malli.dispose?.();
    if (!ShaderMaterial || !InstancedBufferGeometry || !InterleavedBufferAttribute || !InstancedInterleavedBuffer
      || !kolmi.BufferAttribute || !kolmi.Mesh) {
      throw new Error('three-luokkia ei saatu elävästä pallosta');
    }

    /* Kärjet vanoittain ja janat yhteen instanssipuskuriin. */
    const vanaTiedot = [];
    let janoja = 0;
    for (const vana of vanat) {
      if (vanaTiedot.length >= KAISTAN_VANOJA_MAX) break;
      const k = karjet(vana, R);
      if (k.n < 2) continue;
      vanaTiedot.push({ vana, ...k });
      janoja += k.n - 1;
      mittarit.karkia += k.n;
    }
    const puskuri = new Float32Array(janoja * INSTANSSIN_LEVEYS);
    let j = 0;
    vanaTiedot.forEach((vt, vanaIdx) => {
      const { paikat, matka, aika, puoli, meri, ranta, virta, n } = vt;
      const P = (k) => Math.max(0, Math.min(n - 1, k));
      for (let s = 0; s + 1 < n; s += 1) {
        const o = j * INSTANSSIN_LEVEYS;
        const idx = [P(s - 1), s, s + 1, P(s + 2)];
        for (let q = 0; q < 4; q += 1) {
          puskuri[o + q * 3] = paikat[idx[q] * 3];
          puskuri[o + q * 3 + 1] = paikat[idx[q] * 3 + 1];
          puskuri[o + q * 3 + 2] = paikat[idx[q] * 3 + 2];
          puskuri[o + 12 + q] = puoli[idx[q]];
          puskuri[o + 16 + q] = matka[idx[q]];
          puskuri[o + 20 + q] = aika[idx[q]];
          puskuri[o + 24 + q] = meri[idx[q]];
          puskuri[o + 28 + q] = ranta[idx[q]];
        }
        puskuri[o + 32] = virta[s];
        puskuri[o + 33] = virta[s + 1];
        puskuri[o + 34] = vanaIdx;
        j += 1;
      }
    });
    const geom = new InstancedBufferGeometry();
    geom.setAttribute('position', new kolmi.BufferAttribute(new Float32Array([
      -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0,
    ]), 3));
    geom.setIndex([0, 1, 2, 0, 2, 3]);
    const lomitettu = new InstancedInterleavedBuffer(puskuri, INSTANSSIN_LEVEYS, 1);
    const attr = (nimi, koko, alku) => geom.setAttribute(nimi, new InterleavedBufferAttribute(lomitettu, koko, alku));
    attr('iP0', 3, 0); attr('iP1', 3, 3); attr('iP2', 3, 6); attr('iP3', 3, 9);
    attr('iW', 4, 12); attr('iMatka', 4, 16); attr('iAika', 4, 20); attr('iMeri', 4, 24); attr('iRanta', 4, 28);
    attr('iVirta', 2, 32); attr('iVana', 1, 34);
    geom.instanceCount = janoja;

    tekstuuri = teeMaski();
    mittarit.maski = Boolean(tekstuuri);
    const uniformit = {
      uKamera: { value: [0, 0, 0] },
      uMVP: { value: null },
      uMVPKaanteinen: { value: null },
      uRuutu: { value: [1, 1] },
      uSade: { value: R },
      uSyvyysBias: { value: KAISTAN_SYVYYSBIAS },
      uMinPuoli: { value: 0 },
      uMinPuoliMeri: { value: 0 },
      uMeriKerroin: { value: meriKerroin },
      uPehmennys: { value: KAISTAN_PEHMENNYS_KM * yksPerKm() },
      uNyt: { value: 0 },
      uRintama: { value: 1 },
      uPito: { value: 0 },
      uPeitto: { value: peitto },
      uMaskiPaalla: { value: tekstuuri ? 1 : 0 },
      uMaskiKynnys: { value: RANTAMASKIN_KYNNYS.slice() },
      uMaski: { value: tekstuuri },
      uKuljettu: { value: new Float32Array(KAISTAN_VANOJA_MAX) },
      uVanaPeitto: { value: new Float32Array(KAISTAN_VANOJA_MAX).fill(1) },
      // Litteät taulukot (three lataa vec3[]-uniformin suoraan Float32Arraysta).
      uVanha: { value: new Float32Array(KAISTAN_VIRTOJA_MAX * 3).fill(0.5) },
      uKirkas: { value: new Float32Array(KAISTAN_VIRTOJA_MAX * 3).fill(0.8) },
    };
    materiaali = new ShaderMaterial({
      uniforms: uniformit,
      vertexShader: KARKIVARJOSTIN,
      fragmentShader: FRAGMENTTIVARJOSTIN,
      defines: { VANOJA: KAISTAN_VANOJA_MAX, VIRTOJA: KAISTAN_VIRTOJA_MAX },
      transparent: true,
      depthTest: true,
      depthWrite: true,
      depthFunc: LESS_DEPTH,
      side: DOUBLE_SIDE,
    });
    materiaali.extensions = { ...(materiaali.extensions ?? {}), fragDepth: true };
    materiaalit.push(materiaali);
    /*
     * uMVP ja uKamera KOLMIULOTTEISTEN LUOKKIEN KAUTTA: Matrix4 ja
     * Vector3 luetaan verkon omista kentistä (matrixWorld, position),
     * jotta three:n luokkia ei tarvitse tuoda mistään.
     */
    verkko = new kolmi.Mesh(geom, materiaali);
    verkko.renderOrder = KAISTAN_RENDER_ORDER;
    verkko.frustumCulled = false;
    verkko.raycast = () => {};
    const Matrix4 = verkko.matrixWorld.constructor;
    const Vector3 = verkko.position.constructor;
    const mvp = new Matrix4();
    const mvpKaanteinen = new Matrix4();
    uniformit.uMVP.value = mvp;
    uniformit.uMVPKaanteinen.value = mvpKaanteinen;
    const kam = new Vector3();
    const kaanteinen = new Matrix4();
    verkko.onBeforeRender = (renderer, scene, camera) => {
      kaanteinen.copy(verkko.matrixWorld).invert();
      kam.copy(camera.position).applyMatrix4(kaanteinen);
      uniformit.uKamera.value = [kam.x, kam.y, kam.z];
      mvp.copy(camera.projectionMatrix).multiply(camera.matrixWorldInverse).multiply(verkko.matrixWorld);
      mvpKaanteinen.copy(mvp).invert();
      const gl = renderer.getContext?.();
      if (gl) uniformit.uRuutu.value = [gl.drawingBufferWidth || 1, gl.drawingBufferHeight || 1];
    };
    kolmi.juuri.add(verkko);

    for (const vt of vanaTiedot) {
      oliot.push({
        tunnus: vt.vana.tunnus,
        virta: vt.vana.virta,
        virrat: vt.vana.virrat ?? null,
        pisteet: vt.vana.pisteet,
        matka: vt.matka,
        aika: vt.aika,
        n: vt.n,
      });
    }
    mittarit.vanoja = oliot.length;
    mittarit.janoja = janoja;

    /* Kotipesät renkaina: laikku, ei linjaa (suunnitelman 2.1.2). */
    for (const pesa of kotipesat ?? []) {
      const rengas = kotipesanRengas(pesa.lat, pesa.lon, pesa.sade ?? 350);
      const n = rengas.length;
      const paikat = new Float32Array(n * 3);
      rengas.forEach(([lat, lon], k) => {
        const p = pallonPiste(lat, lon, R);
        paikat[k * 3] = p.x; paikat[k * 3 + 1] = p.y; paikat[k * 3 + 2] = p.z;
      });
      const rengasGeom = new luokat.LineGeometry();
      rengasGeom.setPositions(paikat);
      const mat = new luokat.LineMaterial({
        worldUnits: false,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: 0,
        polygonOffsetUnits: KOTIPESAN_SYVYYSSIIRTO,
        opacity: KOTIPESAN_PEITTO,
        linewidth: KOTIPESAN_LEVEYS_PX,
      });
      const [r, g, b] = virranVari(varit.get('paavirta') ?? { vanha: '#D9731E', rintama: '#FFB347' }, 0).vanha;
      if (typeof mat.color?.setStyle === 'function') mat.color.setStyle(`rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`);
      materiaalit.push(mat);
      const olio = new luokat.Line2(rengasGeom, mat);
      olio.computeLineDistances();
      olio.renderOrder = KOTIPESAN_RENDER_ORDER;
      olio.raycast = () => {};
      olio.visible = false;
      kolmi.juuri.add(olio);
      oliot.push({ tunnus: `kotipesa-${pesa.tunnus}`, kotipesa: pesa, olio, mat });
    }
    tahdista(W, H);
  }

  /** Ruutumitat: kotipesien resolution ja kaistan vähimmäisleveys. */
  function tahdista(W, H) {
    for (const m of materiaalit) m.resolution?.set?.(W, H);
    const kmPx = kmPerPikseli();
    const u = materiaali?.uniforms;
    if (!u || !(kmPx > 0)) return;
    const kmYks = yksPerKm();
    u.uMinPuoli.value = (vahimmaisleveysKm(kmPx, KAISTAN_MIN_PX) / 2) * kmYks;
    u.uMinPuoliMeri.value = (vahimmaisleveysKm(kmPx, KAISTAN_MERI_MIN_PX) / 2) * kmYks;
    u.uPehmennys.value = Math.max(KAISTAN_PEHMENNYS_KM, KAISTAN_PEHMENNYS_PX * kmPx) * kmYks;
    mittarit.leveysPx = +((kaista.leveysKm ?? KAISTAN_LEVEYS_KM) / kmPx).toFixed(1);
  }

  const valmis = (async () => {
    if (!pallo || !vanat?.length) return luovuta('ei vanoja');
    /*
     * NOLLAMITTAINEN POLKU luokkien lukemiseksi: läpinäkyvä kahden
     * saman pisteen viiva reittikerroksen omana osana, joka poistetaan
     * heti kun kirjasto on rakentanut siitä Line2:n (sama temppu kuin
     * js/pallovektorit.js:ssä; osarekisteri suojaa pelin reitit).
     */
    reitit?.aseta?.('vanat', [{
      avain: 'vanat-luokat', pisteet: [[0, 0], [0, 0]], paksuus: 1, vari: 'rgba(0,0,0,0)',
    }]);
    for (let i = 0; i < LUOKKIEN_YRITYKSET && !purettu; i += 1) {
      luokat = luokat ?? line2Luokat(pallo);
      kolmi = kolmi ?? kolmiulotteinen(pallo);
      if (luokat && kolmi?.juuri) break;
      await odota(LUOKKIEN_VALI_MS); // eslint-disable-line no-await-in-loop
    }
    reitit?.aseta?.('vanat', []);
    if (purettu) return false;
    if (!luokat) return luovuta('Line2-luokkia ei saatu');
    if (!kolmi?.juuri) return luovuta('pallon ryhmää ei saatu');
    maa = puraMaamaski(RANTAMASKI.juoksut, RANTAMASKI.leveys * RANTAMASKI.korkeus);
    if (maamaski?.juoksut) {
      const W = maamaski.leveys ?? RUUDUKON_LEVEYS;
      const H = maamaski.korkeus ?? RUUDUKON_KORKEUS;
      kulku = { maa: puraMaamaski(maamaski.juoksut, W * H), leveys: W, korkeus: H };
    }
    rakenna();
    // Ruutumitat ja vähimmäisleveys kehyksestä, kuten vektorikerroksella.
    kehyspurku = kytkePallonKehys(pallo, kotelo, (kehys) => {
      if (purettu) return;
      kehysmitat = kehys;
      tahdista(kehys.W, kehys.H);
    }, ikkuna);
    return true;
  })().catch((syy) => luovuta(String(syy?.message ?? syy)));

  /**
   * Kello siirtyi: kasvu (uKuljettu) ja sävyt (uVanha/uKirkas, uNyt,
   * uRintama). Kutsutaan enintään VIRTOJEN_PAIVITYS_MS:n tahdissa;
   * reduced motion askeltaa harvemmin.
   *
   * ── PITOTILA: RINTAMA EI KATOA ────────────────────────────────────
   *
   * Kertomusesitys (js/linssit/ihmisen-matka-esitys.js) ajaa kelloa
   * kaanonin jaksojen mukaan, ja kaanoni palaa ajassa TAAKSEPÄIN kahdesti:
   * Blombosista (75 ka) Karmelvuorelle (110 ka) ja Chilestä (14,5 ka)
   * aikahypyllä takaisin Keski-Aasiaan (50 ka). Ilman pitoa vana
   * kelautuisi kummallakin kerralla auki — koko Amerikkoihin asti
   * piirretty selkäranka katoaisi ruudulta. Raamattu KERTOMUS SOLJUVAKSI
   * ja omistajan ohje aikahypystä: *"rintama ei katoa, vaan Euroopan
   * haara alkaa kasvaa tästä."*
   *
   * PITO ON YKSISUUNTAINEN MAKSIMI vanaa kohti: piirretty pituus ei
   * koskaan lyhene, mutta kasvaa yhä normaalisti, kun kello ohittaa
   * ennätyksen. Kotipesät jäävät samasta syystä palamaan.
   *
   * @param {number} nyt kellon lukema (vuosia sitten)
   * @param {object} [asetukset]
   * @param {boolean} [asetukset.pito] älä koskaan lyhennä piirrettyä vanaa
   */
  function paivita(nyt, { pito = false } = {}) {
    if (purettu || !oliot.length || !(nyt >= 0)) return false;
    if (nyt === viimeNyt) return false;
    if (reduced) {
      const t = nytMs();
      if (t - viimeAskel < VANAN_ASKEL_MS) return false;
      viimeAskel = t;
    }
    viimeNyt = nyt;
    mittarit.paivityksia += 1;
    const u = materiaali?.uniforms;
    if (u) {
      u.uNyt.value = nyt;
      u.uRintama.value = rintamanLeveys(nyt);
      u.uPito.value = pito ? 1 : 0;
      virtalista.forEach((tunnus, i) => {
        if (i >= KAISTAN_VIRTOJA_MAX) return;
        const { vanha, rintama } = virranVari(varit.get(tunnus) ?? { vanha: '#888888', rintama: '#cccccc' }, nyt);
        for (let c = 0; c < 3; c += 1) {
          u.uVanha.value[i * 3 + c] = lineaariseksi(vanha[c]);
          u.uKirkas.value[i * 3 + c] = lineaariseksi(rintama[c]);
        }
      });
    }
    let vanaIdx = 0;
    let nakyvia = 0;
    for (const o of oliot) {
      if (o.kotipesa) {
        // Kotipesä syttyy pysäkkinsä hetkellä ja jää palamaan.
        // Pitotilassa myös kelauksen yli (ks. PITOTILA yllä).
        o.olio.visible = (pito && o.olio.visible) || nyt <= o.kotipesa.aika;
        continue;
      }
      const kuljettu = matkaHetkella(o.matka, o.aika, nyt);
      const matka = pito ? Math.max(o.pitomatka ?? 0, kuljettu) : kuljettu;
      o.pitomatka = matka;
      if (u) u.uKuljettu.value[vanaIdx] = matka;
      if (matka > 0) nakyvia += 1;
      vanaIdx += 1;
    }
    if (verkko) verkko.visible = nakyvia > 0;
    return true;
  }

  /**
   * VANAN KOROSTUS (tutkimusvaihe, omistaja 7.9.2026: *"se valittu väri
   * hehkuu kaikkia muita värejä vielä voimakkaammin kartan pinnassa"*).
   *
   * Valinta on VIRTA (viisi nappia = viisi virtaa), ei yksittäinen vana:
   * selkäranka kulkee kolmen virran läpi, ja kärkikohtainen `virrat`
   * kertoo, kuuluuko vana valittuun väriin. Vana kuuluu valintaan, jos
   * yksikin sen kärki on valitun virran väriä.
   *
   * Muutos on PELKKÄ UNIFORMI (per vana peittokerroin): valittu hehkuu
   * `hehku`-kertoimella, muut vaimenevat `vaimea`-kertoimeen; geometria,
   * kasvu ja kärkivärit eivät muutu, joten `paivita` saa yhä ajaa
   * kellon mukana korostuksen alla. `null` palauttaa lähtöarvot.
   *
   * @param {string|null} virta valitun virran tunnus tai null.
   * @param {{ vaimea?: number, hehku?: number }} asetukset
   */
  function korosta(virta = null, { vaimea = 0.35, hehku = 1.3 } = {}) {
    if (purettu) return false;
    const u = materiaali?.uniforms;
    let vanaIdx = 0;
    for (const o of oliot) {
      if (o.kotipesa) {
        if (o.mat) o.mat.opacity = virta && virta !== 'paavirta' ? KOTIPESAN_PEITTO * vaimea : KOTIPESAN_PEITTO;
        continue;
      }
      const omat = o.virrat?.length ? new Set(o.virrat) : new Set([o.virta]);
      const valittu = !virta || omat.has(virta);
      const kerroin = !virta ? 1 : valittu ? hehku : vaimea;
      o.korostus = kerroin;
      if (u) u.uVanaPeitto.value[vanaIdx] = kerroin;
      vanaIdx += 1;
    }
    return true;
  }

  /**
   * Vanojen kärkilistat ulos (tutkimusvaihe: napin rajaus ja nostojen
   * sävytys). Kopio kentistä, ei olioita: kutsuja ei pääse käsiksi
   * three.js-materiaaleihin.
   */
  function pisteet() {
    return oliot.filter((o) => !o.kotipesa).map((o) => ({
      tunnus: o.tunnus, virta: o.virta, virrat: o.virrat ?? null, pisteet: o.pisteet,
    }));
  }

  /** Selkärangan kärki kameralle (ensimmäinen vana on selkäranka). */
  function karki(nyt, { ennakko = VANAN_ENNAKKO } = {}) {
    const selka = oliot.find((o) => !o.kotipesa);
    if (!selka) return null;
    return karkiHetkella(selka.pisteet, nyt, { ennakko });
  }

  function pura() {
    if (purettu) return;
    purettu = true;
    kehyspurku();
    kehyspurku = () => {};
    if (verkko) {
      verkko.parent?.remove?.(verkko);
      verkko.geometry?.dispose?.();
      verkko = null;
    }
    for (const o of oliot) {
      if (!o.olio) continue;
      o.olio.parent?.remove?.(o.olio);
      o.olio.geometry?.dispose?.();
    }
    tekstuuri?.dispose?.();
    tekstuuri = null;
    for (const m of materiaalit) m.dispose?.();
    materiaalit.length = 0;
    materiaali = null;
    oliot.length = 0;
  }

  return {
    valmis,
    paivita,
    karki,
    korosta,
    pisteet,
    pura,
    /** Mittarit savukkeelle: vanoja, kärkiä, janoja, kaistan leveys ruudulla, maski. */
    tila: () => ({ ...mittarit, purettu }),
  };
}
