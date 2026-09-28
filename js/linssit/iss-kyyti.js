/*
 * ISS:N KYYTI — YDIN (omistajan kysymys 27.9.2026 klo 23.5x: *"pääseekö
 * astronautin kamerassa jo iss:n kyytiin?"*; Linssisepän suositus
 * docs/raportit/iss-kyyti-suositus-20260928.md, natiivi proto
 * linssiseppa/iss-kyyti: IssKyyti, IssKuvakulma, CupolanValo, LIVE 853259ec).
 *
 * Kolme tilaa napautuksella: kaukonäkymä → seuranta (kamera ISS:n takana ja
 * yllä 1 200 km, kallistus 55°) → Cupola-ikkuna (silmä ISS:ssä, katse radan
 * suuntaan 55° alas, kenttäkulma 80°) → takaisin seurantaan; ✕ palaa
 * kaukonäkymään. Luvut ovat SAMAT kuin natiivissa (IssKyytiTestit), ja
 * kaavat on käännetty sieltä riviltä riville.
 *
 * Puhdas moduuli (tests/iss-kyyti.test.mjs): kameran asento (kuvakulma)
 * ISS:n paikasta, korkeudesta ja maajäljen suunnasta, siirtymät asentojen
 * välillä, tilakone, tietorivin teksti ja ilmakehän kaaren kaava. DOM ja
 * three.js ovat tiedostossa iss-kyyti-nakyma.js.
 */

const DEG = Math.PI / 180;

/** Pallomalli (natiivi IssKuvakulma.MaanSadeM; ellipsoidin ero ei näy). */
export const MAAN_SADE_M = 6371000;
/** Seuranta: silmän etäisyys ISS:stä ja kallistus ISS:n pystysuorasta. */
export const SEURANNAN_ETAISYYS_M = 1200000;
export const SEURANNAN_KALLISTUS = 55;
/** Ikkuna: katse radan suuntaan näin monta astetta vaakatason alle. */
export const IKKUNAN_KATSE_ALAS = 55;
/** Cupolan keskilasin kenttäkulma pystyyn (lasi 80 cm, silmä 45 cm:n päässä). */
export const IKKUNAN_KENTTA = 80;
/** Siirtymien kestot (s): kaukaa seurantaan (+ enintään 1,5 s pallon toiselta puolelta), seuranta ↔ ikkuna, paluu. */
export const KYYTIIN_S = 2.5;
export const KYYTIIN_LISA_S = 1.5;
export const IKKUNAAN_S = 1.2;
export const KAUKOON_S = 2.0;
/** Paluun korkeus avauskorkeuden osuutena (astronautin kameran lepokorkeus). */
export const PALUU_KORKEUS = 0.72;
/** ISS-malli näkyy, kun kamera on sitä lähempänä (m), ja sen leveys ruudulla (px). */
export const MALLIN_NAKYMISRAJA_M = 3000000;
export const MALLIN_LEVEYS_PX = 90;
/** ISS-pisteen osuma-ala (px) ja kerran linssin avautuessa soiva syke (ms). */
export const ISS_OSUMA_PX = 44;
export const ISS_SYKE_MS = 600;
/** Ilmakehän kaari: kuoren korkeus (m), kirkkauden asteikkokorkeus (m), siirtymä (s). */
export const KAAREN_KORKEUS_M = 120000;
export const KAAREN_ASTEIKKO_M = 22000;
export const KAAREN_SIIRTYMA_S = 0.8;
export const KAAREN_VAALEA = Object.freeze([0.72, 0.88, 1]);
export const KAAREN_SYVA = Object.freeze([0.12, 0.30, 0.86]);
export const KAAREN_YO = 0.06;
/** Tähtien peitto kyydissä (päivävalo himmentää). */
export const TAHDET_KYYDISSA = 0.3;

export const TILA = Object.freeze({ kauko: 'kauko', seuranta: 'seuranta', ikkuna: 'ikkuna', kohde: 'kohde' });
/**
 * KOHTEEN YLLÄ (ylilento, omistaja 28.9.2026 klo 12.1x): silmä ISS:ssä,
 * katse kohteeseen kuten astronautin vinokuvissa. Kenttäkulma rajataan
 * niin, että noin KOHTEEN_NAKYMA_M leveä alue täyttää ruudun pystyn
 * (pitkä objektiivi), enintään 50° ja vähintään 6°.
 */
export const KOHTEEN_NAKYMA_M = 90000;
export const KOHTEESEEN_S = 1.2;

/** Smootherstep x³(6x² − 15x + 10) (natiivi Kamerakayrat.Pehmea). */
export function pehmea(t) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/** Kuvakulma: katsekohde (lat, lon, katseKorkeusM), etäisyys, kallistus ja suuntima. */
export function kuvakulma(lat, lon, etaisyysM, kallistus, suuntima, katseKorkeusM = 0) {
  return { lat, lon, etaisyysM, kallistus, suuntima, katseKorkeusM };
}

/** Isoympyrän alkusuunta pisteestä 1 pisteeseen 2 (asteina 0…360). */
export function suunta(lat1, lon1, lat2, lon2) {
  const p1 = lat1 * DEG;
  const p2 = lat2 * DEG;
  const dl = (lon2 - lon1) * DEG;
  const y = Math.sin(dl) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
  return (Math.atan2(y, x) / DEG + 360) % 360;
}

/** Piste isoympyrällä: lähtö, suunta ja keskuskulma (asteina) → { lat, lon, loppu }. */
export function kohde(lat, lon, suuntaA, kaariA) {
  const p1 = lat * DEG;
  const l1 = lon * DEG;
  const b = suuntaA * DEG;
  const d = kaariA * DEG;
  const p2 = Math.asin(Math.sin(p1) * Math.cos(d) + Math.cos(p1) * Math.sin(d) * Math.cos(b));
  const l2 = l1 + Math.atan2(Math.sin(b) * Math.sin(d) * Math.cos(p1), Math.cos(d) - Math.sin(p1) * Math.sin(p2));
  const lat2 = p2 / DEG;
  const lon2 = ((((l2 / DEG) + 540) % 360) + 360) % 360 - 180;
  return { lat: lat2, lon: lon2, loppu: (suunta(lat2, lon2, lat, lon) + 180) % 360 };
}

function yksikko(lat, lon) {
  const p = lat * DEG;
  const l = lon * DEG;
  return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)];
}

/** Keskuskulma (asteina) kahden pisteen välillä. */
export function kaari(lat1, lon1, lat2, lon2) {
  const a = yksikko(lat1, lon1);
  const b = yksikko(lat2, lon2);
  return Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))) / DEG;
}

/** ISS:n hetki: { lat, lon, korkeusM, suuntima }. Seuranta: katsekohde on ISS. */
export function seurannanKulma(iss) {
  return kuvakulma(iss.lat, iss.lon, SEURANNAN_ETAISYYS_M, SEURANNAN_KALLISTUS, iss.suuntima, iss.korkeusM);
}

/**
 * Ikkuna: silmä ISS:ssä, katse maajäljen suuntaan `alas` astetta
 * vaakatason alapuolelle. Katsekohde on maan piste, johon katse osuu:
 * nadiirikulma η = 90° − alas, kohteen zeniittikulma ζ = asin((R + h) / R ·
 * sin η), keskuskulma θ = ζ − η ja etäisyys ρ = R sin θ / sin η (420 km,
 * 55°: θ 2,69°, ρ 521 km, ζ 37,7°). Kallistus on ζ ja suuntima kohteessa
 * isoympyrän loppusuunta, jolloin silmä osuu ISS:ään.
 */
export function ikkunanKulma(iss, alasA = IKKUNAN_KATSE_ALAS) {
  const r = MAAN_SADE_M;
  const h = Math.max(1000, iss.korkeusM);
  // Katseen on osuttava maahan: horisontin alapuolella vähintään 1°.
  const horisontti = Math.acos(r / (r + h)) / DEG;
  const alas = Math.max(alasA, horisontti + 1);
  const eta = (90 - alas) * DEG;
  const zeta = Math.asin(Math.min(1, ((r + h) / r) * Math.sin(eta)));
  const theta = zeta - eta;
  const rho = eta > 1e-9 ? (r * Math.sin(theta)) / Math.sin(eta) : h;
  const k = kohde(iss.lat, iss.lon, iss.suuntima, theta / DEG);
  return kuvakulma(k.lat, k.lon, rho, zeta / DEG, k.loppu, 0);
}

/**
 * Kohteen yllä: katsekohde on kohde maan pinnalla, silmä ISS:ssä. Kohteen
 * zeniittikulma ζ ja etäisyys ρ kolmiosta (R, R + h, keskuskulma θ);
 * suuntima kohteessa on isoympyrän loppusuunta ISS:n alapisteestä, jolloin
 * silmä osuu ISS:ään (sama kaava kuin ikkunanKulma, suunta käännettynä).
 */
export function kohteenKulma(iss, kohdeP) {
  const r = MAAN_SADE_M;
  const h = Math.max(1000, iss.korkeusM);
  const theta = kaari(iss.lat, iss.lon, kohdeP.lat, kohdeP.lon) * DEG;
  const rho = Math.sqrt(r * r + (r + h) * (r + h) - 2 * r * (r + h) * Math.cos(theta));
  const zeta = Math.acos(Math.max(-1, Math.min(1, ((r + h) * Math.cos(theta) - r) / rho)));
  const loppu = theta < 1e-7 ? iss.suuntima : (suunta(kohdeP.lat, kohdeP.lon, iss.lat, iss.lon) + 180) % 360;
  return kuvakulma(kohdeP.lat, kohdeP.lon, rho, zeta / DEG, loppu, 0);
}

/** Kohteen kenttäkulma etäisyydestä (astetta). */
export function kohteenKentta(etaisyysM) {
  const k = (2 * Math.atan(KOHTEEN_NAKYMA_M / 2 / Math.max(1, etaisyysM))) / DEG;
  return Math.max(6, Math.min(50, k));
}

/** Kaukonäkymän asento pelaajan kamerasta (katse alas). */
export function kaukoKulma(lat, lon, korkeusM, kallistus = 0, suuntima = 0) {
  return kuvakulma(lat, lon, korkeusM, kallistus, suuntima, 0);
}

/**
 * Asentojen sekoitus (t = 0…1, jo pehmennetty): katsekohde isoympyrää
 * pitkin (slerp), etäisyys logaritmisesti (tasainen zoomin tuntu 18 000 km →
 * 1 200 km), kallistus ja katsekorkeus lineaarisesti, suuntima lyhintä tietä.
 */
export function sekoita(a, b, t) {
  if (t <= 0) return a;
  if (t >= 1) return b;
  const pa = yksikko(a.lat, a.lon);
  const pb = yksikko(b.lat, b.lon);
  const c = Math.max(-1, Math.min(1, pa[0] * pb[0] + pa[1] * pb[1] + pa[2] * pb[2]));
  const w = Math.acos(c);
  let x;
  let y;
  let z;
  if (w < 1e-9) {
    [x, y, z] = pa;
  } else {
    const s = Math.sin(w);
    const ka = Math.sin((1 - t) * w) / s;
    const kb = Math.sin(t * w) / s;
    x = ka * pa[0] + kb * pb[0];
    y = ka * pa[1] + kb * pb[1];
    z = ka * pa[2] + kb * pb[2];
  }
  const lat = Math.atan2(z, Math.sqrt(x * x + y * y)) / DEG;
  const lon = Math.atan2(y, x) / DEG;
  const et = Math.exp(Math.log(Math.max(1, a.etaisyysM)) * (1 - t) + Math.log(Math.max(1, b.etaisyysM)) * t);
  const ds = ((((b.suuntima - a.suuntima) % 360) + 540) % 360) - 180;
  return kuvakulma(lat, lon, et, a.kallistus + (b.kallistus - a.kallistus) * t,
    (((a.suuntima + ds * t) % 360) + 360) % 360,
    a.katseKorkeusM + (b.katseKorkeusM - a.katseKorkeusM) * t);
}

/**
 * Kameran silmä, katsekohde ja ylös-suunta Globe.gl:n näyttämön akseleilla
 * (y = pohjoisnapa; three-globe polar2Cartesian: x = cos φ sin λ, y = sin φ,
 * z = cos φ cos λ), yksikkönä `sade` / MAAN_SADE_M. Sama kaava kuin
 * natiivin PalloKierto.LaskeAsento (IssKyytiTestit.Silma): silmä on
 * kohteesta kallistuksen verran taaksepäin suuntimasta; ylös on kohtisuorassa
 * katsetta vastaan kohti suuntimaa, jolloin horisontti on vaakasuorassa ja
 * kallistuksella 0 ja suuntimalla 0 pohjoinen on ylhäällä (OrbitControlsin
 * oma asento, joten paluu kaukonäkymään on saumaton).
 */
export function kameranAsento(k, sade = MAAN_SADE_M) {
  const m = sade / MAAN_SADE_M;
  const p = k.lat * DEG;
  const l = k.lon * DEG;
  const ylos = [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
  // itä = Y × ylös, pohjoinen = ylös × itä (normalisoituina).
  const ita = [Math.cos(l), 0, -Math.sin(l)];
  const pohjoinen = [
    ylos[1] * ita[2] - ylos[2] * ita[1],
    ylos[2] * ita[0] - ylos[0] * ita[2],
    ylos[0] * ita[1] - ylos[1] * ita[0],
  ];
  const b = k.suuntima * DEG;
  const t = k.kallistus * DEG;
  const eteen = pohjoinen.map((v, i) => v * Math.cos(b) + ita[i] * Math.sin(b));
  const taakse = ylos.map((v, i) => v * Math.cos(t) - eteen[i] * Math.sin(t));
  const R = (MAAN_SADE_M + k.katseKorkeusM) * m;
  const kohdeP = ylos.map((v) => v * R);
  const silma = kohdeP.map((v, i) => v + taakse[i] * k.etaisyysM * m);
  const kameranYlos = eteen.map((v, i) => v * Math.cos(t) + ylos[i] * Math.sin(t));
  return { silma, kohde: kohdeP, ylos: kameranYlos };
}

/** Näyttämön piste → { lat, lon, korkeusM } (pallomalli, sama akselisto). */
export function pisteelta(v, sade = MAAN_SADE_M) {
  const r = Math.hypot(v[0], v[1], v[2]);
  return {
    lat: Math.asin(v[1] / r) / DEG,
    lon: Math.atan2(v[0], v[2]) / DEG,
    korkeusM: (r / sade) * MAAN_SADE_M - MAAN_SADE_M,
  };
}

/**
 * KYYDIN TILAKONE (natiivi IssKyyti): napautus vie seuraavaan tilaan,
 * `poistu` kaukonäkymään. `paivita` antaa joka kehys kameran asennon ja
 * kenttäkulman (siirtymän aikana sekoitettuna). Kaukonäkymässä kamera on
 * pelaajan, joten asentoa ei anneta. Ajat sekunteina.
 */
export function luoKyyti() {
  let tila = TILA.kauko;
  let siirtyy = false;
  let alku = null;
  let viimeisin = null;
  let alkuKentta = 0;
  let viimeisinKentta = 0;
  let t0 = 0;
  let kesto = 0;
  let paluuKorkeus = 0;
  let kohdeP = null;

  const aloita = (uusi, nykyinen, kentta, nyt, kestoS) => {
    tila = uusi;
    alku = nykyinen;
    alkuKentta = kentta;
    t0 = nyt;
    kesto = Math.max(0, kestoS);
    siirtyy = true;
  };
  const kyydissa = () => tila !== TILA.kauko || siirtyy;

  return {
    get tila() { return tila; },
    get kyydissa() { return kyydissa(); },
    get siirtyy() { return siirtyy; },
    /** Napautus: kauko → seuranta → ikkuna → seuranta. `nykyinen` = kameran asento nyt. */
    napauta(nykyinen, iss, kentta, nyt, vahennetty) {
      if (tila === TILA.kauko) {
        const k = kaari(nykyinen.lat, nykyinen.lon, iss.lat, iss.lon);
        aloita(TILA.seuranta, nykyinen, kentta, nyt, vahennetty ? 0 : KYYTIIN_S + (KYYTIIN_LISA_S * k) / 180);
      } else {
        // Seurannasta ikkunaan; ikkunasta ja kohteen yltä takaisin seurantaan.
        const seuraava = tila === TILA.seuranta ? TILA.ikkuna : TILA.seuranta;
        aloita(seuraava, siirtyy ? viimeisin : nykyinen, siirtyy ? viimeisinKentta : kentta, nyt,
          vahennetty ? 0 : IKKUNAAN_S);
      }
    },
    /** Kohteen yllä (ylilento): silmä ISS:ssä, katse kohteeseen. */
    kohteeseen(kohdePaikka, nykyinen, kentta, nyt, vahennetty) {
      kohdeP = { lat: kohdePaikka.lat, lon: kohdePaikka.lon };
      aloita(TILA.kohde, siirtyy ? viimeisin : nykyinen, siirtyy ? viimeisinKentta : kentta, nyt,
        vahennetty ? 0 : KOHTEESEEN_S);
    },
    get kohde() { return kohdeP; },
    /** ✕: paluu kaukonäkymään ISS:n alapisteen ylle korkeudelle `kaukoKorkeusM`. */
    poistu(kaukoKorkeusM, nyt, vahennetty) {
      if (!kyydissa() || (tila === TILA.kauko && siirtyy)) return;
      paluuKorkeus = kaukoKorkeusM;
      aloita(TILA.kauko, viimeisin, viimeisinKentta, nyt, vahennetty ? 0 : KAUKOON_S);
    },
    /** Kyyti pois heti (linssi suljetaan). */
    nollaa() { tila = TILA.kauko; siirtyy = false; },
    /**
     * Tämän kehyksen { asento, kentta, paluuValmis } tai null, kun kamera on
     * pelaajan. `paluuValmis`: kutsujan pitää lopettaa kuvaus ja palauttaa
     * kenttäkulma.
     */
    paivita(nyt, iss, perusKentta) {
      if (!kyydissa()) return null;
      let kohdeK;
      let kohdeKentta = perusKentta;
      if (tila === TILA.seuranta) kohdeK = seurannanKulma(iss);
      else if (tila === TILA.ikkuna) {
        kohdeK = ikkunanKulma(iss);
        kohdeKentta = IKKUNAN_KENTTA;
      } else if (tila === TILA.kohde && kohdeP) {
        kohdeK = kohteenKulma(iss, kohdeP);
        kohdeKentta = kohteenKentta(kohdeK.etaisyysM);
      } else {
        kohdeK = kaukoKulma(Math.max(-55, Math.min(55, iss.lat)), iss.lon, paluuKorkeus, 0, 0);
      }
      const u = kesto <= 0 ? 1 : Math.max(0, Math.min(1, (nyt - t0) / kesto));
      const s = pehmea(u);
      const asento = siirtyy ? sekoita(alku, kohdeK, s) : kohdeK;
      const kentta = siirtyy ? alkuKentta + (kohdeKentta - alkuKentta) * s : kohdeKentta;
      if (u >= 1) siirtyy = false;
      viimeisin = asento;
      viimeisinKentta = kentta;
      return { asento, kentta, paluuValmis: tila === TILA.kauko && !siirtyy, osuus: u };
    },
  };
}

/**
 * TIETORIVI (natiivi IssKyytiNakyma.Aseta, LIVE 853259ec, omistaja 28.9.):
 * "● LIVE · ISS · 436 km · 27 530 km/h". Ilman tuoretta TLE:tä (arvio tai
 * havainnollinen) ei LIVE-merkkiä vaan loppuun "· rata-arvio". Nopeus
 * pyöristetään kymmeniin, tuhaterotin on suomen väli (U+00A0 kuten
 * natiivin fi-FI).
 */
export function tietorivi(korkeusKm, nopeus, arvio, kerroin = null) {
  const luku = (n) => Math.round(n).toLocaleString('fi-FI').replace(/\s/g, '\u00a0');
  const km = luku(korkeusKm);
  const kmh = luku(Math.round(nopeus / 10) * 10);
  /*
   * NOPEUTETTUNA (omistaja 28.9. klo 12.1x): "● 100× · ISS · …" ilman
   * LIVE-sanaa, piste ei punainen — kerroin kertoo, ettei ISS ole juuri
   * nyt tuossa. Rata-arviossa ei LIVE-merkkiä kuten ennenkin.
   */
  const k = kerroin === null ? null : nopeudenMerkki(kerroin);
  const merkki = k ?? (arvio ? null : 'LIVE');
  return {
    live: !arvio && k === null,
    merkki,
    teksti: `${merkki ? '· ' : ''}ISS · ${km} km · ${kmh} km/h${arvio ? ' · rata-arvio' : ''}`,
  };
}

/** Nopeuskerroin pilleriin: 1×, 10×, 870× (kaksi merkitsevää numeroa). */
export function nopeudenMerkki(k) {
  const x = Math.abs(Number(k) || 0);
  if (x < 1.5) return '1×';
  const d = 10 ** Math.max(0, Math.floor(Math.log10(x)) - 1);
  return `${(Math.round(x / d) * d).toLocaleString('fi-FI').replace(/\s/g, '\u00a0')}×`;
}

/** Ylilennon kellonaika ja aika siihen: "Ylilento klo 14.32, 3 h 12 min päästä". */
export function ylilennonTeksti(ms, nytMs) {
  const d = new Date(ms);
  const klo = `${d.getHours()}.${String(d.getMinutes()).padStart(2, '0')}`;
  const min = Math.max(0, Math.round((ms - nytMs) / 60000));
  const h = Math.floor(min / 60);
  const vali = h > 0 ? `${h} h ${min % 60} min` : `${min} min`;
  return `Ylilento klo ${klo}, ${vali} päästä`;
}

/** Kaaren kirkkaus korkeudella h (m): exp(−h / 22 km). */
export function kaarenKirkkaus(hM) {
  return Math.exp(-Math.max(0, hM) / KAAREN_ASTEIKKO_M);
}

/** Kaaren sävy korkeudella h (m): syvästä sinisestä vaaleaan exp(−h / 6 km):llä. */
export function kaarenSavy(hM) {
  const t = Math.exp(-Math.max(0, hM) / 6000);
  return KAAREN_SYVA.map((s, i) => s + (KAAREN_VAALEA[i] - s) * t);
}

/** Auringon kirkkaus sivuamispisteessä: päivä 1, hämärä liukuu, yö 0,06. */
export function kaarenAurinko(ylosDotAurinko) {
  const x = Math.max(0, Math.min(1, (ylosDotAurinko + 0.105) / (0.07 + 0.105)));
  return KAAREN_YO + (1 - KAAREN_YO) * x * x * (3 - 2 * x);
}
