/*
 * IHMISEN MATKA — ESITYS YHTENÄ KAARENA.
 *
 * Raamattu, IHMISEN MATKA ON YKSI KAARI, EI PYSAKKEJA (omistaja
 * 7.9.2026 ilta, sanatarkasti): *"Tässä on siis yksi pitkä
 * tarinankaari. Toisin kuin keksijöissä, oli jokaisessa oma nostonsa.
 * Ja silloin myös nämä kuvituskuvat ovat vain sivuosassa. … Ne pysäkit
 * ovat vain meidän tekemiämme kaivauksia ja havaintoja, mutta se ei
 * saisi rikkoa sitä virtaa."* — sekä ALKAA MUSTASTA RUUDUSTA, KERTOMUS
 * SOLJUVAKSI ja KAARI HYVAKSYTTY, TUTKIMUSVAIHE, VIISI NAPPIA.
 *
 * Tämä moduuli on ESITYKSEN OHJAAJA. Se ei omista mitään pintaa:
 * kellon, kameran, vanat, musiikin ja lamput omistaa aikajanamoottori
 * (js/aikajana.js), ja tämä kertoo niille, mitä kaanoni
 * (js/linssit/ihmisen-matka-kertomus.js) kussakin jaksossa tahtoo.
 * Moottorin pysäkkikello (kehys → aikajanaAskel → sytyta) EI KÄY
 * esityksen aikana lainkaan: `tila.i` jää arvoon −1, jolloin myös
 * värivirtojen oma kameraohjaus pysyy poissa päältä
 * (js/aikajana-virrat.js ohjaaKameraa) ja kamera on kokonaan tämän
 * käsissä.
 *
 * ── VIISI VAIHETTA ────────────────────────────────────────────────
 *
 *   1. PIMEÄ    Käynnistä-napin jälkeen ruutu on musta (oma peite
 *               linssin juuressa). Kartta ja käyttöliittymä ovat
 *               piilossa, vain sulkunappi on käytettävissä; kertojan
 *               'avaus'-luenta soi. Musiikki EI vielä ala.
 *   2. VALOT    'afrikka'-jakson alkaessa musta häipyy VALOJEN_MS:ssä
 *               ja pallo on jo rajattuna koko Afrikkaan (kamera ajettiin
 *               paikalleen mustan alla). Musiikki nousee sisään.
 *   3. MATKA    Jaksot peräkkäin ILMAN TAUKOA: luenta soi, kamera liukuu
 *               jakson kohteeseen tai nimettyyn alueeseen, kello etenee
 *               lineaarisesti jakson vuosista seuraavan jakson vuosiin
 *               luennan keston mukaan, ja vanat kasvavat kellon tahdissa.
 *   4. HYPPY    'aikahyppy': kello kelaa taaksepäin (14 500 → 50 000)
 *               nopeana mutta pehmeänä liukuna ja kamera siirtyy
 *               Keski-Aasiaan. Rintama ei katoa (ks. PITO alla).
 *   5. LOPPU    Kamera vetäytyy koko palloon, kaikki vanat näkyvissä,
 *               pulun välihuomio — ja `ui.aloitaTutkimusvaihe?.()`.
 *
 * ── PITO: RINTAMA EI KATOA ────────────────────────────────────────
 *
 * Kaanoni palaa ajassa taaksepäin kahdesti (Blombos 75 ka →
 * Karmelvuori 110 ka ja Chile 14,5 ka → aikahyppy 50 ka). Ilman
 * pitoa vana kelautuisi kummallakin kerralla auki. Pito kytketään
 * päälle KOKO ESITYKSEN AJAKSI heti valojen syttyessä
 * (js/aikajana-virrat.js asetaPito, js/aikajana-vanat.js paivita):
 * piirretty vana ei enää lyhene, mutta kasvaa yhä normaalisti.
 *
 * ── KUVAT OVAT SIVUOSASSA ─────────────────────────────────────────
 *
 * Kun jaksolla on kohde, sen kuva nousee PIENENÄ (KUVAN_OSUUS ruudun
 * leveydestä, pergamenttikehys) kohteen viereen pallon pinnalle
 * luennan ajaksi ja häipyy jakson päättyessä. Se ei pysäytä mitään:
 * kello käy, kamera liukuu ja kertoja jatkaa. Lippu
 * IHMISEN_MATKA_KUVAT_ESITYKSESSA kytkee kuvat kokonaan pois
 * (omistaja: *"Vaihtoehtoisesti ne voitaisiin jopa hetkeksi jättää
 * pois kokonaan"*); saman tekee osoiterivin `?esityskuvat=ei`, jottei
 * kokeilu vaadi koodin muokkausta.
 *
 * ── LUENTA JA KESTO ───────────────────────────────────────────────
 *
 * Jakson luenta on ämpärissä kaaren omassa puhekansiossa nimellä, jonka
 * antaa js/linssipuhe.js kertomuksenRunko — sama funktio kuin
 * generointityökalulla (tools/generoi-linssiluennat.mjs --kertomus),
 * joten nimi ei voi eriytyä. Jakson kesto luetaan ÄÄNITTEESTÄ heti kun
 * sen metatiedot saapuvat; siihen asti (ja kokonaan ilman äänitettä)
 * kesto on tekstin pituus jaettuna 14 merkillä sekunnissa
 * (kertomuksenVarakesto). Esitys ei siis pysähdy siihen, ettei ääntä
 * ole — mykistetty peli kulkee luetun mittaisena.
 *
 * ── PULUN VÄLIHUOMIOT ─────────────────────────────────────────────
 *
 * Jakson `pulu` luetaan pulun äänellä jakson LUENNAN PÄÄTYTTYÄ, ennen
 * seuraavaa jaksoa: pieni kupla (js/pollo.js polloLinssikupla, linssin
 * oma poikkeus kuplaporttiin) ja äänite 0,7 × tasolla ilman kertojan
 * väistöä — sama mekanismi kuin fokusvirran huudahduksella
 * (js/liviapuhe.js soitaLivianLinssiAani). Kello ei pysähdy siksi
 * aikaa; jakso vain saa hännäkseen PULUN_VARA_MS.
 *
 * ── TUTKIMUSVAIHE ON TOISEN TYÖTÄ ─────────────────────────────────
 *
 * Esitys päättyy koukkuun `ui.aloitaTutkimusvaihe?.()`. Mitä sen
 * takana on — hehkuvat nostokohdat, viisi nappia, pulun kutsu — ei
 * kuulu tälle moduulille (Raamattu KAARI HYVAKSYTTY, TUTKIMUSVAIHE,
 * VIISI NAPPIA). Ilman koukkua esitys päättyy siihen, että kartta jää
 * pelaajalle: esinerivi palaa ja ohjaimet tulevat takaisin.
 */

import { projisoiLaudalle } from '../fokusmitat.js';
import { kertomuksenRunko, kertomuksenVarakesto, soitaLinssiluenta } from '../linssipuhe.js';
import { soitaLivianLinssiAani } from '../liviapuhe.js';
import { polloLinssikupla } from '../pollo.js';

/** Lauta, jonka koordinaatistoon nimetyt alueet projisoidaan. */
const LAUTA = 'maailmankartta';

/**
 * KUVAT ESITYKSESSÄ (oletus päällä). Omistajan koeasetus: false jättää
 * löytökuvat kokonaan pois, jolloin ruudulla on vain viiva, kello ja
 * kertojan ääni. Osoiterivin `?esityskuvat=ei` tekee saman ilman
 * koodin muokkausta.
 */
export const IHMISEN_MATKA_KUVAT_ESITYKSESSA = true;

/** Kuvan leveys osuutena ruudun leveydestä (omistajan mitta: "pienenä"). */
export const KUVAN_OSUUS = 0.22;

/**
 * KAMERAN LÄHIKUVA JAKSOLLA. Väljempi kuin pysäkkiajon 560
 * (js/linssit/ihmisen-matka.js IHMISEN_MATKAN_LAHIKUVA): kertomuksessa
 * ei pysähdytä katsomaan löytöä vaan katsotaan, MITEN VIIVA LAAJENEE
 * kohteen ohi. 1 200 lautayksikköä on noin 36° eli 4 000 km ruudun
 * leveydellä — kohde on selvästi tunnistettavassa lähikuvassa, mutta
 * vanan kärki ja sen suunta mahtuvat samaan kuvaan.
 */
export const ESITYKSEN_LAHIKUVA = 1200;

/** Koko maapallo laudan yksiköissä (sama laatikko kuin linssin `alue`). */
const MAAILMA = {
  x: 0, y: 0, w: 12000, h: 5399,
};

/**
 * NIMETYT RAJAUKSET kaanonin `alue`-kentälle. Laatikot ovat asteina
 * (lat/lon) ja käännetään laudan yksiköiksi vasta ajossa, jotta luvut
 * ovat luettavia ja tarkistettavia. Kamera saa laatikon
 * (`ajaKamera({ bbox })`), joka mahtuu ruudulle kummassakin suunnassa
 * kuvasuhteesta riippumatta — siksi tässä ei ole korkeuksia.
 */
export const ESITYKSEN_ALUEET = {
  // Koko Afrikka: Hyväntoivonniemeltä Välimerelle, Atlantilta Somaliaan.
  afrikka: {
    lat: [-35, 37], lon: [-18, 52],
  },
  // Afrikan itälaita: Etiopian jokilaaksot ja Punaisenmeren rannikko.
  'afrikka-ita': {
    lat: [0, 18], lon: [30, 50],
  },
  // Keski-Aasia laajana: Altai, Siperian eteläreuna ja Iranin ylängöt.
  'keski-aasia': {
    lat: [28, 60], lon: [50, 105],
  },
  // Koko pallo: lopun peräytyminen.
  maailma: null,
};

/** Mustan häivytys valojen syttyessä (omistaja: "2–3 s"). */
export const VALOJEN_MS = 2600;
/** Aikahypyn kelaus: nopea mutta pehmeä liuku taaksepäin. */
export const KELAUKSEN_MS = 2400;
/** Jakson häntä, jonka aikana pulun välihuomio ehtii kuulua. */
export const PULUN_VARA_MS = 2600;
/** Lyhin ja pisin kamera-ajo jaksolla. */
export const KAMERAN_POHJA_MS = 1400;
export const KAMERAN_KATTO_MS = 9000;
/** Osuus jakson luennasta, jonka kamera-ajo saa kestää. */
export const KAMERAN_OSUUS = 0.85;
/** Kuvan häivytys (css .aikajana-kertomuskuva). */
export const KUVAN_POISTUMA_MS = 420;

/**
 * Nimetyn alueen kameralaatikko laudan yksiköissä.
 *
 * PUHDAS FUNKTIO (tests/ihmisen-matka-esitys.test.mjs). Palauttaa
 * MAAILMA-laatikon, kun aluetta ei tunneta tai se on koko pallo —
 * tuntematon nimi ei saa jättää kameraa paikoilleen ilman jälkeä.
 *
 * @param {string} tunnus kaanonin `alue`
 * @returns {{x:number,y:number,w:number,h:number}}
 */
export function alueenLaatikko(tunnus) {
  const alue = ESITYKSEN_ALUEET[tunnus];
  if (!alue) return { ...MAAILMA };
  const a = projisoiLaudalle(LAUTA, alue.lon[0], alue.lat[1]);
  const b = projisoiLaudalle(LAUTA, alue.lon[1], alue.lat[0]);
  if (!a || !b) return { ...MAAILMA };
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return {
    x, y, w: Math.abs(b.x - a.x), h: Math.abs(b.y - a.y),
  };
}

/**
 * Jakson kellotahti: mistä lukemasta mihin kello kulkee.
 *
 * PUHDAS FUNKTIO (tests). Viimeinen jakso jää lukemaansa — kello ei
 * juokse kaaren ohi.
 *
 * @param {Array<object>} kertomus kaanonin jaksot
 * @param {number} i jakson indeksi
 * @returns {{alku:number, loppu:number}} lukemat (vuosia sitten)
 */
export function jaksonTahti(kertomus, i) {
  const jakso = kertomus?.[i];
  const seuraava = kertomus?.[i + 1];
  const alku = Number(jakso?.vuosia);
  const perus = Number.isFinite(alku) ? alku : 0;
  /*
   * AIKAHYPPY KUULUU HYPPYJAKSOLLE, EI SITÄ EDELTÄVÄLLE. Ilman tätä
   * ehtoa Chilen jakso (14 500) kelaisi itse takaisin Keski-Aasiaan
   * (50 000) kertojan puhuessa pisimmästä kävelymatkasta — kelaus
   * alkaisi väärässä paikassa ja väärän tekstin alla. Hyppyjakso
   * lähtee siitä lukemasta, johon edellinen jäi (ks. kelauksenAlku).
   */
  if (seuraava?.vaihe === 'hyppy') return { alku: perus, loppu: perus };
  const loppu = Number(seuraava?.vuosia);
  return { alku: perus, loppu: Number.isFinite(loppu) ? loppu : perus };
}

/** Pehmennys kelaukselle: hidas lähtö, hidas pysähdys (ei ylitystä). */
export function kelauksenPehmennys(t) {
  const x = Math.max(0, Math.min(1, t));
  return x < 0.5 ? 2 * x * x : 1 - ((-2 * x + 2) ** 2) / 2;
}

/** Onko kuvien näyttö päällä (lippu tai osoiterivin koe). */
function kuvatKaytossa() {
  const haku = new URLSearchParams(globalThis.location?.search ?? '');
  const valinta = haku.get('esityskuvat');
  if (valinta === 'ei' || valinta === '0') return false;
  if (valinta === 'kylla' || valinta === '1') return true;
  return IHMISEN_MATKA_KUVAT_ESITYKSESSA;
}

function solmu(tag, luokka) {
  const el = document.createElement(tag);
  if (luokka) el.className = luokka;
  return el;
}

/**
 * Esityksen ohjaaja yhdelle ajolle.
 *
 * @param {object} asetukset
 * @param {object} asetukset.ajo js/aikajana.js:n Aikajana-olio
 * @returns {object} { aloita, taukoTaiJatka, tauko, jatka, pura, tila }
 */
export function luoEsitys({ ajo }) {
  const kertomus = ajo.kaari?.kertomus ?? [];
  const etuliite = ajo.kaari?.kertomusRunko;
  const reduced = Boolean(ajo.reducedMotion);
  const kuvat = kuvatKaytossa();
  /** Jakson tunnus → moottorin pysäkin indeksi (kuva ja lamppu). */
  const pysakit = new Map();
  ajo.tapahtumat.forEach((t, i) => { if (t?.tunnus) pysakit.set(t.tunnus, i); });

  const tila = {
    i: -1,
    /*
     * KULUNUT ON SEINÄKELLOA, EI KEHYSTEN SUMMAA. Luenta on
     * reaaliaikaista ääntä, joten jakson eteneminen on mitattava
     * samasta kellosta: kehyksiä summaava laskuri jäisi jälkeen aina
     * kun pallo piirtyy hitaasti (kontin ohjelmisto-WebGL piirtää noin
     * kehyksen sekunnissa), ja kertoja puhuisi jaksosta, jota kartta ei
     * vielä näytä. Tauko siirtää lähtöhetkeä eikä pysäytä laskuria.
     */
    alkuHetki: 0,
    kulunut: 0,
    /** Jakson koko kesto (luenta + pulun vara). */
    kesto: 0,
    /** Luennan osuus jakson kestosta — kello kulkee tässä ajassa. */
    luenta: 0,
    /** Kelauksen lähtölukema aikahypyssä (null = ei kelausta). */
    kelauksenAlku: null,
    puluSanottu: false,
    kaynnissa: false,
    tauolla: false,
    purettu: false,
    paattynyt: false,
    raf: 0,
    aani: null,
    kuva: null,
    /** Mittarit savukkeelle. */
    jaksoja: 0,
    kuviaNaytetty: 0,
    pulujaSanottu: 0,
    koukkuKutsuttu: false,
    vuosia: Number(kertomus[0]?.vuosia) || 0,
  };

  /* ---------------------------------------------------------- pinnat */

  const peite = solmu('div', 'aikajana-esitys-peite');
  peite.setAttribute('aria-hidden', 'true');
  const tekstirivi = solmu('div', 'aikajana-kertomusteksti');
  tekstirivi.setAttribute('role', 'status');
  tekstirivi.setAttribute('aria-live', 'polite');
  const tekstilaatikko = solmu('p', 'aikajana-kertomusteksti-sisus');
  tekstirivi.appendChild(tekstilaatikko);

  const asennaPinnat = () => {
    const juuri = ajo.juuri;
    if (!juuri) return;
    // Peite ensimmäiseksi lapseksi: kaikki muu on sen päällä DOM-
    // järjestyksessä, ja luokka `esitys-pimea` piilottaa ne erikseen.
    juuri.prepend(peite);
    juuri.appendChild(tekstirivi);
    juuri.classList.add('esitys-kaynnissa');
  };

  /* ---------------------------------------------------------- kamera */

  const kamera = () => (ajo.pallolla ? ajo.kamera() : null);

  const ajaAlueeseen = (tunnus, kesto) => {
    const k = kamera();
    if (!k?.ajaKamera) return Promise.resolve(false);
    const bbox = alueenLaatikko(tunnus);
    return k.ajaKamera({ bbox, marginaali: 0.04 }, { kesto: reduced ? 0 : kesto });
  };

  const ajaKohteeseen = (tunnus, kesto) => {
    const k = kamera();
    const i = pysakit.get(tunnus);
    const t = ajo.tapahtumat[i];
    if (!k?.ajaKamera || !t || !Number.isFinite(t.lat) || !Number.isFinite(t.lon)) {
      return Promise.resolve(false);
    }
    return k.ajaKamera(
      {
        x: t.x, y: t.y, lat: t.lat, lng: t.lon, leveys: ESITYKSEN_LAHIKUVA,
      },
      { kesto: reduced ? 0 : kesto },
    );
  };

  /* ------------------------------------------------------------ kuva */

  const suljeKuva = () => {
    const vanha = tila.kuva;
    tila.kuva = null;
    if (!vanha) return;
    vanha.classList.remove('esilla');
    if (reduced) vanha.remove();
    else setTimeout(() => vanha.remove(), KUVAN_POISTUMA_MS);
  };

  /**
   * Löytökuva kohteen viereen pallon pinnalle. Kehys ripustetaan
   * LAMPUN elementtiin (js/aikajana.js rakennaValotPallolle), joten se
   * seuraa pistettä kameran liikkuessa eikä sitä tarvitse asemoida.
   */
  const naytaKuva = (tunnus) => {
    suljeKuva();
    if (!kuvat) return;
    const i = pysakit.get(tunnus);
    const t = ajo.tapahtumat[i];
    const g = ajo.valot?.[i]?.g ?? null;
    const osoite = t?.ilmio?.osoite ?? t?.kuva?.osoite ?? null;
    if (!g || !osoite) return;
    const kehys = solmu('div', 'aikajana-kertomuskuva');
    kehys.setAttribute('aria-hidden', 'true');
    kehys.style.setProperty('--kertomuskuva-leveys', `${Math.round(KUVAN_OSUUS * 100)}vw`);
    const img = new Image();
    img.alt = '';
    img.decoding = 'async';
    img.src = osoite;
    kehys.appendChild(img);
    g.appendChild(kehys);
    tila.kuva = kehys;
    tila.kuviaNaytetty += 1;
    if (reduced) kehys.classList.add('esilla');
    else requestAnimationFrame(() => kehys.classList.add('esilla'));
  };

  /* ----------------------------------------------------------- lamppu */

  /**
   * Kohteen lamppu palamaan ja jäämään. Löytöpaikat eivät ole
   * pysäkkejä, joten yksikään ei ole "nykyinen" — ne jäävät hiljaisiksi
   * hehkuiksi kartalle tutkimusvaihetta varten.
   */
  const sytytaKohde = (tunnus) => {
    const valo = ajo.valot?.[pysakit.get(tunnus)] ?? null;
    if (valo) ajo.asetaValonTila(valo, true, false);
  };

  /* ------------------------------------------------------------ kello */

  const kirjoitaKello = (vuosia) => {
    const arvo = Math.max(0, vuosia);
    tila.vuosia = arvo;
    const paikka = ajo.asteikko.paikka?.(arvo) ?? arvo;
    ajo.tila = { ...ajo.tila, vuosi: paikka };
    ajo.naytaVuosi(paikka, reduced);
  };

  /* ------------------------------------------------------------ luenta */

  const aloitaLuenta = (jakso) => {
    const runko = kertomuksenRunko(jakso, etuliite);
    tila.aani = runko
      ? soitaLinssiluenta(ajo.ui, null, { runko, juuri: ajo.luentajuuri, viive: 0 })
      : null;
    const aani = tila.aani;
    if (!aani) return;
    /*
     * KESTO ÄÄNITTEESTÄ HETI KUN SE TIEDETÄÄN. Varakesto on jo
     * käytössä, joten metatietojen viive ei pysäytä mitään: jakson
     * kesto vain tarkentuu kesken jakson. Vanha äänite (edellinen
     * jakso) ei saa muuttaa nykyistä — siksi tunnistus kahvasta.
     */
    const tarkenna = () => {
      if (tila.aani !== aani || tila.purettu) return;
      const kesto = Number(aani.duration);
      if (!Number.isFinite(kesto) || kesto <= 0) return;
      tila.luenta = Math.round(kesto * 1000);
      tila.kesto = tila.luenta + (jakso.pulu ? PULUN_VARA_MS : 0);
    };
    aani.addEventListener('loadedmetadata', tarkenna, { once: true });
    tarkenna();
  };

  /* ------------------------------------------------------------- pulu */

  const sanoPulu = (jakso) => {
    tila.puluSanottu = true;
    if (!jakso.pulu) return;
    const nakyi = polloLinssikupla([jakso.pulu], {
      luokka: 'aikajana-kertomus-pulu',
      aani: () => soitaLivianLinssiAani(ajo.ui, ajo.linssi?.tunnus ?? 'ihmisen-matka', jakso.id, {
        teksti: jakso.pulu,
      }),
    });
    if (nakyi) tila.pulujaSanottu += 1;
  };

  /* ------------------------------------------------------------- jakso */

  const aloitaJakso = (i) => {
    const jakso = kertomus[i];
    if (!jakso) { paata(); return; }
    tila.i = i;
    // Jakson oma lähtöhetki: kulunut mitataan seinäkellosta (ks. tila).
    tila.alkuHetki = performance.now();
    tila.kulunut = 0;
    tila.puluSanottu = false;
    tila.jaksoja += 1;
    tila.luenta = kertomuksenVarakesto(jakso);
    tila.kesto = tila.luenta + (jakso.pulu ? PULUN_VARA_MS : 0);
    tila.kelauksenAlku = null;

    tekstilaatikko.textContent = jakso.teksti ?? '';
    tekstirivi.classList.toggle('esilla', Boolean(jakso.teksti));

    if (jakso.vaihe === 'valot') sytytaValot();
    if (jakso.vaihe === 'hyppy') tila.kelauksenAlku = tila.vuosia;

    // Kello jakson alkuun heti (kelaus lähtee omasta lukemastaan).
    if (jakso.vaihe !== 'hyppy') kirjoitaKello(jaksonTahti(kertomus, i).alku);

    aloitaLuenta(jakso);

    /*
     * KAMERAN KESTO LASKETAAN VARAKESTOSTA eikä äänitteestä: ajo on
     * lähdettävä samalla hetkellä kuin luenta, ja äänitteen metatiedot
     * saapuvat vasta hetkeä myöhemmin. Jos jakso osoittautuu lyhyemmäksi
     * kuin arvio, ajo jää kesken ja seuraava lähtee siitä, mihin kamera
     * ehti (js/pallolauta/kamera.js aloittaa aina nykyisestä näkymästä)
     * — liike on silti jatkuvaa, eikä kamera nykäise.
     */
    const kesto = Math.max(
      KAMERAN_POHJA_MS,
      Math.min(KAMERAN_KATTO_MS, Math.round(tila.luenta * KAMERAN_OSUUS)),
    );
    if (jakso.kohde) {
      sytytaKohde(jakso.kohde);
      naytaKuva(jakso.kohde);
      ajaKohteeseen(jakso.kohde, kesto);
    } else {
      suljeKuva();
      if (jakso.alue) ajaAlueeseen(jakso.alue, jakso.vaihe === 'valot' ? 0 : kesto);
    }
  };

  /**
   * VALOT SYTTYVÄT (Raamattu ALKAA MUSTASTA RUUDUSTA). Musta häipyy,
   * käyttöliittymä palaa, musiikki nousee sisään ja vanojen pito
   * kytkeytyy päälle koko lopun esityksen ajaksi.
   */
  const sytytaValot = () => {
    ajo.juuri?.classList.remove('esitys-pimea');
    peite.classList.add('pois');
    if (reduced) peite.remove();
    else setTimeout(() => peite.remove(), VALOJEN_MS);
    ajo.virrat?.asetaPito?.(true);
    ajo.aloitaMusiikki?.(true);
  };

  /* ------------------------------------------------------------ silmukka */

  const paivitaKello = () => {
    const jakso = kertomus[tila.i];
    if (!jakso) return;
    const { alku, loppu } = jaksonTahti(kertomus, tila.i);
    if (jakso.vaihe === 'hyppy' && tila.kelauksenAlku !== null) {
      const kelaus = Math.min(1, tila.kulunut / KELAUKSEN_MS);
      if (kelaus < 1) {
        const f = kelauksenPehmennys(kelaus);
        kirjoitaKello(tila.kelauksenAlku + (alku - tila.kelauksenAlku) * f);
        return;
      }
      const jaljella = Math.max(1, tila.luenta - KELAUKSEN_MS);
      const osuus = Math.min(1, (tila.kulunut - KELAUKSEN_MS) / jaljella);
      kirjoitaKello(alku + (loppu - alku) * osuus);
      return;
    }
    const osuus = Math.min(1, tila.kulunut / Math.max(1, tila.luenta));
    kirjoitaKello(alku + (loppu - alku) * osuus);
  };

  const kehys = (nyt) => {
    if (!tila.kaynnissa || tila.purettu) return;
    tila.raf = requestAnimationFrame(kehys);
    tila.kulunut = nyt - tila.alkuHetki;
    paivitaKello();
    if (!tila.puluSanottu && tila.kulunut >= tila.luenta) sanoPulu(kertomus[tila.i]);
    if (tila.kulunut >= tila.kesto) {
      if (tila.i + 1 < kertomus.length) aloitaJakso(tila.i + 1);
      else paata();
    }
  };

  const kaynnista = () => {
    if (tila.kaynnissa || tila.purettu) return;
    tila.kaynnissa = true;
    tila.tauolla = false;
    ajo.kaynnissa = true;
    ajo.juuri?.classList.remove('tauolla');
    if (ajo.taukoNappi) ajo.taukoNappi.textContent = 'Tauko';
    ajo.saadaMusiikki?.(true);
    // Jatko samasta kohdasta: lähtöhetki siirtyy kuluneen verran taakse.
    tila.alkuHetki = performance.now() - tila.kulunut;
    tila.raf = requestAnimationFrame(kehys);
  };

  const seis = () => {
    tila.kaynnissa = false;
    ajo.kaynnissa = false;
    cancelAnimationFrame(tila.raf);
    tila.raf = 0;
  };

  /* ------------------------------------------------------------ loppu */

  function paata() {
    if (tila.paattynyt) return;
    tila.paattynyt = true;
    seis();
    suljeKuva();
    tekstirivi.classList.remove('esilla');
    // Esinerivi ja ohjaimet takaisin pelaajalle ennen koukkua: kartta
    // on nyt hänen.
    ajo.juuri?.classList.remove('esitys-kaynnissa');
    if (ajo.taukoNappi) {
      ajo.taukoNappi.textContent = 'Loppu';
      ajo.taukoNappi.disabled = true;
    }
    tila.koukkuKutsuttu = true;
    // Koukku viimeisenä: tutkimusvaihe on toisen moduulin työtä, ja se
    // saa ottaa ruudun haltuunsa vasta kun esitys on siivonnut jälkensä.
    ajo.ui?.aloitaTutkimusvaihe?.();
  }

  /* ------------------------------------------------------------ julkinen */

  return {
    /** Käynnistä-napista: musta ruutu, avausluenta, ei vielä musiikkia. */
    aloita() {
      if (tila.purettu || tila.i >= 0) return false;
      asennaPinnat();
      ajo.juuri?.classList.add('esitys-pimea');
      // Peite on musta HETI: avauslaatikon oma peite häipyy sen päältä,
      // eikä ruudulla välähdä karttaa.
      peite.classList.add('musta');
      // Kamera Afrikkaan jo pimeässä, jotta valot syttyvät valmiiseen
      // näkymään (omistaja: *"sitten voisi syttyä valot ja ruudulla
      // näkyä Afrikka kokonaisuudessaan"*).
      ajaAlueeseen('afrikka', 0);
      kirjoitaKello(Number(kertomus[0]?.vuosia) || 0);
      aloitaJakso(0);
      kaynnista();
      return true;
    },
    /** Yläpalkin yksi nappi. */
    taukoTaiJatka() {
      if (tila.paattynyt) return;
      if (tila.kaynnissa) this.tauko(); else this.jatka();
    },
    /** Tauko: luenta ja kello pysähtyvät samasta kohdasta. */
    tauko() {
      if (!tila.kaynnissa) return;
      seis();
      tila.tauolla = true;
      try { tila.aani?.pause(); } catch { /* soitin oli jo purettu */ }
      ajo.saadaMusiikki?.(false);
      if (ajo.taukoNappi) ajo.taukoNappi.textContent = 'Jatka';
      ajo.juuri?.classList.add('tauolla');
    },
    /** Jatko samasta kohdasta: luenta jatkuu, kello lähtee siitä mihin jäi. */
    jatka() {
      if (tila.kaynnissa || tila.paattynyt || tila.purettu) return;
      if (tila.tauolla && tila.aani && !tila.aani.ended) {
        tila.aani.play().catch(() => { /* puuttuva ääni on hiljainen */ });
      }
      kaynnista();
    },
    pura() {
      if (tila.purettu) return;
      tila.purettu = true;
      seis();
      suljeKuva();
      peite.remove();
      tekstirivi.remove();
      ajo.juuri?.classList.remove('esitys-pimea', 'esitys-kaynnissa');
    },
    /** Mittarit savukkeelle ja testeille. */
    tila: () => ({
      jakso: kertomus[tila.i]?.id ?? null,
      vaihe: kertomus[tila.i]?.vaihe ?? null,
      indeksi: tila.i,
      jaksoja: tila.jaksoja,
      vuosia: Math.round(tila.vuosia),
      kaynnissa: tila.kaynnissa,
      tauolla: tila.tauolla,
      paattynyt: tila.paattynyt,
      pimea: Boolean(ajo.juuri?.classList.contains('esitys-pimea')),
      kuvia: tila.kuviaNaytetty,
      kuvaEsilla: Boolean(tila.kuva?.isConnected),
      kuvatKaytossa: kuvat,
      puluja: tila.pulujaSanottu,
      koukku: tila.koukkuKutsuttu,
      kesto: Math.round(tila.kesto),
      luenta: Math.round(tila.luenta),
      kulunut: Math.round(tila.kulunut),
    }),
  };
}
