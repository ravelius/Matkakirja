/*
 * ======== IHMISEN MATKA: VANAT PALLOLLA (Line2-viivat) ============
 *
 * OMISTAJA 6.9.2026 ilta (Raamattu, VIRRAT VANOINA, sanatarkasti):
 * *"Se että väri peittää koko mantereen on outo. Olisi kivempi katsoa
 * tarkempaa linjaa miten ehkä ihmiset kulkivat ainakin pääasiassa …
 * Olisiko parempi näyttää looginen linja miten ihmiset todennäköisesti
 * etenivät ensin Amerikkaan ja sitten muut linjat."*
 *
 * Tämä moduuli piirtää ne linjat. Geometria EI OLE KÄSIN PIIRRETTY:
 * js/aikajana-virrat-laskenta.js johdaVanat johtaa jokaisen vanan
 * saapumisaikakentän edeltäjäketjusta, joten viiva on aina mallin oma
 * (docs/moduulit/ihmisen-matka-vanat.md luvut 2.1–2.3). Tämä tiedosto
 * vastaa vain PIIRROSTA: kolmesta asiasta kerrallaan.
 *
 *   1. VIIVA ON FAT LINE (Line2 + LineMaterial), sama mekanismi kuin
 *      rantaviivoilla (js/pallovektorit.js): varjostin laskee leveyden
 *      RUUTUPIKSELEINÄ (worldUnits false, resolution = kotelon
 *      css-mitat), joten päävirta on 4 px ja haara 2,5 px yhtä lailla
 *      puhelimella ja työpöydällä. Luokat luetaan Globe.gl:n omasta
 *      nipusta elävän polkuolion kautta — uutta kirjastoa ei ladata.
 *   2. VANA KASVAA KELLON MUKANA KATKOVIIVALLA, ei geometriaa
 *      rakentamalla: `dashSize` = matka, jonka kärki on ehtinyt,
 *      `gapSize` = ääretön. Sama ratkaisu kuin avauslennon jäljellä
 *      (js/pallolauta/reitit.js `jalki`), ja se maksaa yhden luvun
 *      materiaaliin per vana per päivitys.
 *   3. KÄRKI ON KIRKAS, HÄNTÄ VANHAA SÄVYÄ: jokainen kärki kantaa oman
 *      värinsä (vertexColors), ja väri lasketaan TÄSMÄLLEEN samalla
 *      kaavalla kuin ruudun väri kalvolla (ruudunTila): rintama on
 *      kymmenesosa kellon lukemasta (omistajan päätös 3). Amerikkojen
 *      sävyn liuku ajan mukana (virranVari) toimii sellaisenaan,
 *      koska värit lasketaan kehyksessä.
 *
 * KAISTA on sama geometria toisella, leveällä ja haalealla
 * materiaalilla (omistaja: *"kapea haalea kaista"* vanan ympärillä).
 * Leveä läpinäkyvä Line2 piirtää jokaisen janan omana neliönään, ja
 * liitoksissa neliöt summautuisivat kaksinkertaiseksi peitoksi —
 * kaista näytti kokeessa helminauhalta. Siksi kaista KIRJOITTAA
 * SYVYYDEN ja käyttää tiukkaa syvyystestiä (LessDepth): saman viivan
 * päällekkäiset neliöt ovat samassa syvyydessä ja toinen hylätään.
 * Vana itse piirtyy kaistan jälkeen omalla syvyyssiirrollaan (−16 vs.
 * kaistan −12), jottei se z-taistele kaistan kirjoittamaa syvyyttä
 * vastaan (mitattu 6.9.2026, suunnitelman luku 2.3).
 *
 * KOTIPESÄT (Afrikan kolme lähdettä 300–164 ka) piirretään renkaina
 * eikä linjana: mallissa ne ovat toisistaan riippumattomia, ja niiden
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
import { KM_ASTEELLA, rintamanLeveys, virranVari } from './aikajana-virrat-laskenta.js';

/** Vanan nosto pinnasta: rantaviivan (0) ja reittien (0,002) väliin. */
export const VANAN_KORKEUS = 0.0005;
/** Syvyyssiirto kameraa kohti: kaistan (−12) edelle, ettei vana z-taistele. */
export const VANAN_SYVYYSSIIRTO = -16;
export const KAISTAN_SYVYYSSIIRTO = -12;
/** Läpinäkyvien jono: rantaviiva −0,5, reitit 0, vana, kaista, kalvo 1. */
export const VANAN_RENDER_ORDER = 0.6;
export const KAISTAN_RENDER_ORDER = 0.5;
/** Vanan ja kaistan peitto (päätös 2: rintama 0,95). */
export const VANAN_PEITTO = 0.95;
export const KAISTAN_PEITTO = 0.14;
/** Kaistan leveys maastossa (km) ja ruudulla (css-px, kameran mukaan). */
export const KAISTAN_KM = 250;
export const KAISTAN_MIN_PX = 10;
export const KAISTAN_MAX_PX = 40;
/** Kärki kulkee kameran edellä: osuus kellon lukemasta (luku 3.2). */
export const VANAN_ENNAKKO = 0.04;
/** Reduced motion: värit ja katko päivittyvät puolen sekunnin askelin. */
export const VANAN_ASKEL_MS = 500;
/** Kotipesän renkaan kärkien määrä. */
export const KOTIPESAN_KARKIA = 24;
/** Kotipesän renkaan leveys css-pikseleinä. */
export const KOTIPESAN_LEVEYS_PX = 2;
/** three:n LessDepth (piirretään vain aidosti lähempi pikseli). */
const LESS_DEPTH = 2;
/** Luokkien odotus: kierrosta × väli (ms). */
const LUOKKIEN_YRITYKSET = 100;
const LUOKKIEN_VALI_MS = 50;

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
 * ja väri vanhenevat samaa tahtia.
 */
export function karjenPaino(aika, nyt, rintama) {
  if (!(aika > 0) || !(rintama > 0)) return 0;
  return Math.max(0, Math.min(1, 1 - (aika - nyt) / rintama));
}

/** Kaistan leveys css-pikseleinä: 250 km ruudulla, rajattuna 10–40 px. */
export function kaistanLeveysPx(kmPerPx, {
  kaistaKm = KAISTAN_KM, min = KAISTAN_MIN_PX, max = KAISTAN_MAX_PX,
} = {}) {
  if (!(kmPerPx > 0)) return min;
  return Math.max(min, Math.min(max, kaistaKm / kmPerPx));
}

/**
 * Vanan kärki hetkellä `nyt`: { lat, lng }. Kello kulkee yhteen
 * suuntaan, joten kärki liikkuu vain eteenpäin. `ennakko` siirtää
 * kohteen sinne, missä vana on 4 %:n kellonlukeman päästä — kamera
 * seuraa kärkeä hieman edellä (luku 3.2).
 */
export function karkiHetkella(pisteet, nyt, { ennakko = 0 } = {}) {
  if (!pisteet?.length) return null;
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

/** sRGB-tavu (0…255) lineaariseksi: kärkivärit ovat varjostimessa lineaarisia. */
function lineaariseksi(c) {
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

/* ------------------------------------------------------------- piirto */

/**
 * Vanat pallolle. Palauttaa kahvan, jota js/aikajana-virrat.js kutsuu:
 *
 *   valmis          lupaus: luokat saatu ja viivat rakennettu
 *   paivita(nyt)    kello siirtyi: katko ja kärkivärit
 *   karki(nyt)      selkärangan kärki { lat, lng } kameralle
 *   tila()          mittarit savukkeelle
 *   pura()          kaikki pois
 *
 * @param vanat johdaVanat-tulos [{ tunnus, virta, paksuus, pisteet }]
 * @param virrat virtojen aineisto (värit tunnuksittain)
 */
export function luoVanat({
  pallo, kotelo, reitit, vanat = [], kotipesat = [], virrat = [], reduced = false, ikkuna = globalThis,
}) {
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
  const mittarit = {
    vanoja: 0, karkia: 0, kaistoja: 0, paivityksia: 0, kaistaPx: 0, syy: '',
  };

  const nytMs = () => ikkuna.performance?.now?.() ?? Date.now();
  const odota = (ms) => new Promise((ok) => { ikkuna.setTimeout(ok, ms); });
  const sade = () => (pallo?.getGlobeRadius?.() ?? 100) * (1 + VANAN_KORKEUS);
  const ruutu = () => ({
    W: kehysmitat?.W || kotelo?.clientWidth || 1,
    H: kehysmitat?.H || kotelo?.clientHeight || 1,
  });
  const luovuta = (syy) => { mittarit.syy = syy; return false; };

  /** Kilometriä css-pikseliä kohti ruudun keskellä (kaistan leveyteen). */
  function kmPerPikseli() {
    const { W } = ruutu();
    const korkeus = kehysmitat?.pov?.altitude ?? pallo?.pointOfView?.()?.altitude ?? 1;
    const kuvasuhde = kehysmitat?.kuvasuhde || 1;
    const asteet = asteetLeveydesta(leveysKorkeudesta(korkeus, { kuvasuhde }));
    return (asteet * KM_ASTEELLA) / Math.max(1, W);
  }

  /** Vanan geometria: paikat pallon pinnalla + matka ja aika kärjittäin. */
  function geometria(vana, R) {
    const pisteet = vana.pisteet ?? [];
    const n = pisteet.length;
    const paikat = new Float32Array(n * 3);
    const matka = new Float32Array(n);
    const aika = new Float32Array(n);
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
      edellinen = p;
    }
    return { paikat, matka, aika, n };
  }

  /** Yhteiset materiaaliasetukset (ks. tiedoston alun mittaukset). */
  function materiaali(asetukset) {
    const m = new luokat.LineMaterial({
      worldUnits: false,
      transparent: true,
      depthTest: true,
      polygonOffset: true,
      polygonOffsetFactor: 0,
      dashed: true,
      ...asetukset,
    });
    m.dashScale = 1;
    m.gapSize = 1e6;
    m.dashSize = 0;
    materiaalit.push(m);
    return m;
  }

  /** Väri materiaaliin sRGB-muunnoksella (sama sävy kuin kalvolla). */
  function asetaVari(m, rgb) {
    const [r, g, b] = rgb;
    if (typeof m.color?.setStyle === 'function') m.color.setStyle(`rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`);
    else m.color?.setRGB?.(lineaariseksi(r), lineaariseksi(g), lineaariseksi(b));
  }

  function rakenna() {
    const R = sade();
    const { W, H } = ruutu();
    const kaistaPx = kaistanLeveysPx(kmPerPikseli());
    mittarit.kaistaPx = +kaistaPx.toFixed(1);
    for (const vana of vanat) {
      const { paikat, matka, aika, n } = geometria(vana, R);
      if (n < 2) continue;
      const vari = varit.get(vana.virta) ?? { vanha: '#888888', rintama: '#cccccc' };
      /*
       * KAISTA ENSIN: se kirjoittaa syvyyden (helminauha pois), ja vana
       * piirtyy sen päälle omalla syvyyssiirrollaan.
       */
      const kaistaGeom = new luokat.LineGeometry();
      kaistaGeom.setPositions(paikat);
      const kaistaMat = materiaali({
        depthWrite: true,
        depthFunc: LESS_DEPTH,
        opacity: KAISTAN_PEITTO,
        linewidth: kaistaPx,
        polygonOffsetUnits: KAISTAN_SYVYYSSIIRTO,
      });
      asetaVari(kaistaMat, virranVari(vari, 0).vanha);
      const kaista = new luokat.Line2(kaistaGeom, kaistaMat);
      kaista.computeLineDistances();
      kaista.renderOrder = KAISTAN_RENDER_ORDER;
      kaista.raycast = () => {};
      kolmi.juuri.add(kaista);

      const geom = new luokat.LineGeometry();
      geom.setPositions(paikat);
      /*
       * KÄRKIVÄRIT KIRJOITETAAN ELÄVÄÄN PUSKURIIN. setColors KOPIOI
       * annetun taulukon omaan instanssipuskuriinsa (mitattu selaimessa
       * 6.9.2026: oma taulukko jäi irralleen ja vana piirtyi mustana),
       * joten puskuri luetaan takaisin geometriasta ja päivitykset
       * kirjoitetaan siihen. Väriattribuutit (janan alku ja loppu) ovat
       * näkymiä samaan lomitettuun puskuriin, joten yksi
       * needsUpdate riittää.
       */
      geom.setColors(new Float32Array(n * 3));
      const mat = materiaali({
        depthWrite: false,
        opacity: VANAN_PEITTO,
        linewidth: vana.paksuus ?? 2,
        polygonOffsetUnits: VANAN_SYVYYSSIIRTO,
        vertexColors: true,
      });
      const olio = new luokat.Line2(geom, mat);
      olio.computeLineDistances();
      olio.renderOrder = VANAN_RENDER_ORDER;
      olio.raycast = () => {};
      kolmi.juuri.add(olio);
      const variAttr = geom.getAttribute?.('instanceColorStart') ?? null;
      const variPuskuri = variAttr?.data?.array ?? null;

      oliot.push({
        tunnus: vana.tunnus,
        virta: vana.virta,
        vari,
        // Kärkikohtainen virta: selkäranka vaihtaa sävyä matkalla.
        virrat: vana.virrat ?? null,
        pisteet: vana.pisteet,
        matka,
        aika,
        n,
        olio,
        mat,
        kaista,
        kaistaMat,
        varit: variPuskuri,
        puskuri: variAttr?.data ?? null,
      });
      mittarit.karkia += n;
    }
    /* Kotipesät renkaina: laikku, ei linjaa (suunnitelman 2.1.2). */
    for (const pesa of kotipesat ?? []) {
      const rengas = kotipesanRengas(pesa.lat, pesa.lon, pesa.sade ?? 350);
      const { paikat, n } = geometria({ pisteet: rengas.map(([lat, lon]) => [lat, lon, pesa.aika]) }, R);
      if (n < 2) continue;
      const geom = new luokat.LineGeometry();
      geom.setPositions(paikat);
      const mat = materiaali({
        depthWrite: false,
        opacity: KAISTAN_PEITTO * 2,
        linewidth: KOTIPESAN_LEVEYS_PX,
        polygonOffsetUnits: VANAN_SYVYYSSIIRTO,
        dashed: false,
      });
      asetaVari(mat, virranVari(varit.get('paavirta') ?? { vanha: '#D9731E', rintama: '#FFB347' }, 0).vanha);
      const olio = new luokat.Line2(geom, mat);
      olio.renderOrder = VANAN_RENDER_ORDER;
      olio.raycast = () => {};
      olio.visible = false;
      kolmi.juuri.add(olio);
      oliot.push({ tunnus: `kotipesa-${pesa.tunnus}`, kotipesa: pesa, olio, mat });
    }
    mittarit.vanoja = oliot.filter((o) => !o.kotipesa).length;
    mittarit.kaistoja = oliot.filter((o) => o.kaista).length;
    tahdista(W, H);
  }

  /** Ruutumitat materiaaleihin (leveys css-pikseleinä ⇒ resolution css). */
  function tahdista(W, H) {
    for (const m of materiaalit) m.resolution?.set?.(W, H);
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
    rakenna();
    // Ruutumitat ja kaistan leveys kehyksestä, kuten vektorikerroksella.
    kehyspurku = kytkePallonKehys(pallo, kotelo, (kehys) => {
      if (purettu) return;
      kehysmitat = kehys;
      tahdista(kehys.W, kehys.H);
      const px = kaistanLeveysPx(kmPerPikseli());
      if (Math.abs(px - mittarit.kaistaPx) > 0.5) {
        mittarit.kaistaPx = +px.toFixed(1);
        for (const o of oliot) if (o.kaistaMat) o.kaistaMat.linewidth = px;
      }
    }, ikkuna);
    return true;
  })().catch((syy) => luovuta(String(syy?.message ?? syy)));

  /**
   * Kello siirtyi: katko (kasvu) ja kärkivärit. Kutsutaan enintään
   * VIRTOJEN_PAIVITYS_MS:n tahdissa; reduced motion askeltaa harvemmin.
   */
  function paivita(nyt) {
    if (purettu || !oliot.length || !(nyt >= 0)) return false;
    if (nyt === viimeNyt) return false;
    if (reduced) {
      const t = nytMs();
      if (t - viimeAskel < VANAN_ASKEL_MS) return false;
      viimeAskel = t;
    }
    viimeNyt = nyt;
    mittarit.paivityksia += 1;
    const rintama = rintamanLeveys(nyt);
    const savyt = new Map();
    for (const o of oliot) {
      if (o.kotipesa) {
        // Kotipesä syttyy pysäkkinsä hetkellä ja jää palamaan.
        o.olio.visible = nyt <= o.kotipesa.aika;
        continue;
      }
      const matka = matkaHetkella(o.matka, o.aika, nyt);
      o.mat.dashSize = matka;
      o.kaistaMat.dashSize = matka;
      const nakyy = matka > 0;
      o.olio.visible = nakyy;
      o.kaista.visible = nakyy;
      if (!nakyy || !o.varit) continue;
      /*
       * Kärkivärit: vanha → rintama painolla w, sama kaava kuin
       * kalvolla. Jokainen kärki saa OMAN virtansa sävyn (selkäranka
       * kulkee päävirrasta Siperian kautta Amerikkoihin), ja sävyt
       * lasketaan kerran virtaa kohti — ei kärkeä kohti.
       */
      savyt.clear();
      const savy = (tunnus) => {
        let s = savyt.get(tunnus);
        if (s) return s;
        const { vanha, rintama: karki } = virranVari(varit.get(tunnus) ?? o.vari, nyt);
        s = {
          v0: [lineaariseksi(vanha[0]), lineaariseksi(vanha[1]), lineaariseksi(vanha[2])],
          v1: [lineaariseksi(karki[0]), lineaariseksi(karki[1]), lineaariseksi(karki[2])],
        };
        savyt.set(tunnus, s);
        return s;
      };
      /*
       * PUSKURIN MUOTO ON JANOITTAIN, EI KÄRJITTÄIN: LineGeometry
       * kahdentaa sisäkärjet janoiksi, joten elävässä puskurissa on
       * kuusi lukua per jana (alkupään rgb + loppupään rgb) eikä
       * kolmea per kärki. Kärjittäin kirjoittaminen väritti puolet
       * vanasta väärin ja jätti lopun mustaksi (nähty selaimessa
       * 6.9.2026: selkäranka muuttui turkoosiksi jo Adenissa).
       */
      const karjenVari = (k) => {
        const { v0, v1 } = savy(o.virrat?.[k] ?? o.virta);
        const w = karjenPaino(o.aika[k], nyt, rintama);
        return [
          v0[0] + (v1[0] - v0[0]) * w,
          v0[1] + (v1[1] - v0[1]) * w,
          v0[2] + (v1[2] - v0[2]) * w,
        ];
      };
      let edellinen = karjenVari(0);
      for (let j = 0; j + 1 < o.n; j += 1) {
        const seuraava = karjenVari(j + 1);
        const kohta = j * 6;
        if (kohta + 5 >= o.varit.length) break;
        o.varit[kohta] = edellinen[0];
        o.varit[kohta + 1] = edellinen[1];
        o.varit[kohta + 2] = edellinen[2];
        o.varit[kohta + 3] = seuraava[0];
        o.varit[kohta + 4] = seuraava[1];
        o.varit[kohta + 5] = seuraava[2];
        edellinen = seuraava;
      }
      // Yksi lippu riittää: molemmat väriattribuutit ovat saman
      // lomitetun puskurin näkymiä.
      if (o.puskuri) o.puskuri.needsUpdate = true;
    }
    return true;
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
    for (const o of oliot) {
      for (const olio of [o.olio, o.kaista]) {
        if (!olio) continue;
        olio.parent?.remove?.(olio);
        olio.geometry?.dispose?.();
      }
    }
    for (const m of materiaalit) m.dispose?.();
    materiaalit.length = 0;
    oliot.length = 0;
  }

  return {
    valmis,
    paivita,
    karki,
    pura,
    /** Mittarit savukkeelle: vanoja, kärkiä, kaistoja, kaistan leveys. */
    tila: () => ({ ...mittarit, purettu }),
  };
}
