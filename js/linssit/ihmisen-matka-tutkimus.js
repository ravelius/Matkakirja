/*
 * IHMISEN MATKA — TUTKIMUSVAIHE (omistaja 7.9.2026 ilta, Raamattu
 * "IHMISEN MATKA: KAARI HYVAKSYTTY, TUTKIMUSVAIHE, VIISI NAPPIA,
 * PULUN VALIHUOMIOT", sanatarkasti:
 *
 *   *"kun esitys on ohi, niin sen jälkeen pelaaja voisi klikkailla
 *   kartalla niitä nostokohtia, ja niitä saa olla todella paljon …
 *   kartassa voisi olla ylhäällä viisi nappia, joista jokainen
 *   vastaisi sitten niitä eri alueita, ja jolloin kartta
 *   automaattisesti pyörähtäisi niin, että koko se alue näkyy ja se
 *   valittu väri hehkuu kaikkia muita värejä vielä voimakkaammin …
 *   niissä nostoissa olisi tietenkin myös jo valmiiksi generoituja
 *   muutamia kysymyksiä, mitä painamalla pulu voisi sitten selittää
 *   lisää."*)
 *
 * Kertomusmoottori (js/linssit/ihmisen-matka.js) päättää esityksen ja
 * kutsuu `ui.aloitaTutkimusvaihe?.()` (js/aikajana.js). Tästä
 * eteenpäin kello ei kulje, kamera ei seuraa ketään ja kartta on
 * pelaajan oma:
 *
 *   1. NOSTOT   Kaikki kaaren 20 löytöpaikkaa — myös esityksestä pois
 *               jääneet — sekä 20 lisänostoa (Toba, Sunda, Sahul,
 *               Flores, Ust'-Ishim, Sungir, Lascaux, Clovis, Rapa Nui …)
 *               hehkuvat kartalla pieninä sykkivinä pisteinä, kukin
 *               oman vanansa väriin sävytettynä. Napautus avaa kortin.
 *   2. NAPIT    Viisi nappia = viisi virtaa. Napautus kääntää pallon
 *               niin että koko vana näkyy, korostaa sen ja avaa
 *               summaavan tekstin pergamenttilapussa; toinen napautus
 *               samaan nappiin palauttaa kaikki.
 *   3. PULU     Kortin alla 2–3 valmista kysymystä. Napautus lähettää
 *               kysymyksen pulun chattiin, ja noston teksti ja lähde
 *               kulkevat mukana kontekstina.
 *
 * ── MIKSI OMA TIEDOSTO ────────────────────────────────────────────
 *
 * Esitys ja tutkimusvaihe tehtiin rinnakkain kahdessa työssä. Raja on
 * `ui.aloitaTutkimusvaihe()`: sitä ennen kaikki on kertomusmoottorin,
 * sen jälkeen kaikki on tämän moduulin. Siksi tämä ei kirjoita
 * riviäkään esityksen kulkuun eikä lue kertomuksen jaksoja — ainoa
 * side on se yksi kutsu ja moottorin ajo-olio (kello, lauta, virrat).
 *
 * ── MIKSI EI OMAA KELLOA EIKÄ OMAA KAMERAA ────────────────────────
 *
 * Vanat, kalvot ja kameran seuranta ovat js/aikajana-virrat.js:n
 * hallussa koko ajon. Tutkimusvaihe pyytää sieltä yhden kerran
 * `tutkimus()`, joka piirtää vanat loppuun ja lopettaa seurannan
 * pysyvästi; kameran ajot menevät sen jälkeen laudan omaa rajapintaa
 * (`ui.kamera().ajaKamera`) kuten kaikki muukin pelin liike. Kaksi
 * kameraa samalla pallolla olisi kaksi totuutta.
 *
 * ── PULUN KUPLA EI TULE TÄÄLTÄ ────────────────────────────────────
 *
 * *"Kartta on sinun. Kysy vain, jos löydät jotain kiinnostavaa."* on
 * kaanonia (js/linssit/ihmisen-matka-kertomus.js, jakson `loppu`
 * pulu-kenttä), ja sen soittaa kertomusmoottori esityksen viimeisenä
 * tekona. Tämä moduuli EI toista sitä — kupla kahdesti olisi virhe.
 * Chatin portti sen sijaan avataan: body-luokka `aikajana-tutkimus-auki`
 * päästää pelaajan keskustelemaan pulun kanssa linssin päällä
 * (js/ui-apurit.js linssiEstaaChatin).
 */

import * as data from './ihmisen-matka-data.js';
import { IHMISEN_MATKA_VIRRAT } from './ihmisen-matka-virrat.js';
import { polloKysy } from '../pollo.js';

/** Laudan linssiapurin osa: oma, jottei aikajanan purku vie näitä. */
export const TUTKIMUKSEN_OSA = 'ihmisen-tutkimus';

/** Maailmankartan leveys yksikköinä (js/packs/fokus-grc.js). */
const LAUDAN_LEVEYS = 12000;

/** Lautayksikköä pituusasteella: Miller-lieriössä koko kierros on laudan leveys. */
const YKSIKKOA_ASTEELLA = LAUDAN_LEVEYS / 360;

/**
 * Vanan rajauksen marginaali (osuus laatikon sivusta kummallakin
 * laidalla). 0,12 antaa Amerikoille ja päävirralle ilmaa reunoille
 * ilman että vana kutistuu ruudun keskelle pikkuviivaksi.
 */
const RAJAUKSEN_VARA = 0.12;

/** Kameran ajon kesto napista (ms). Sama luokka kuin laudan omat ajot. */
const KAANNON_KESTO_MS = 1500;

/** Kapein ja levein rajaus lautayksikköinä (koko maapallo on 12 000). */
const RAJAUS_MIN = 900;
const RAJAUS_MAX = 12000;

/**
 * Napin lyhyt nimi puhelimelle (omistaja: napit yhdelle riville).
 * Molemmat nimet ovat DOMissa ja css valitsee — yksi mitta vähemmän
 * javascriptin puolella, eikä nimi vaihdu kesken kääntämisen.
 */
const LYHYET = {
  paavirta: 'Pää',
  eurooppa: 'Eur.',
  siperia: 'Sib.',
  amerikat: 'Am.',
  tyynimeri: 'Tyyni',
};

/* ==================== TYYLI ==================== */

const TYYLIN_TUNNUS = 'ihmisen-tutkimus-tyyli';

/**
 * Tyylitiedosto sivulle kerran. Sama kuvio kuin js/aikajana.js:llä
 * (lataaTyyli): linkki tehdään peruslinkin osoitteen suhteen, ja
 * yhden tiedoston versiossa peruslinkkiä ei ole — silloin tyylit ovat
 * jo sivun <style>-lohkossa eikä mitään haeta.
 */
function lataaTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('ihmisen-tutkimus.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/* ==================== APURIT ==================== */

function solmu(tag, luokka, teksti) {
  const e = document.createElement(tag);
  if (luokka) e.className = luokka;
  if (teksti != null) e.textContent = teksti;
  return e;
}

/** Pituusaste [-180, 180]. */
export function kierraLon(lon) {
  let v = lon;
  while (v > 180) v -= 360;
  while (v < -180) v += 360;
  return v;
}

/**
 * VANAN RAJAUS: lat/lon-laatikko pistejoukosta, antimeridiaani
 * kestäen.
 *
 * Tyynenmeren nauhat kulkevat Taiwanilta (121° I) Rapa Nuille
 * (109° L), eli suora min/max antaisi 230° levyisen laatikon ja
 * kameran keskipisteeksi Afrikan. Siksi pituusasteet PURETAAN
 * jonoksi: jokainen piste siirretään lähimmäksi edellistä (±360°),
 * jolloin laatikko on todellinen kaari ja keskipiste sen keskellä.
 *
 * Palauttaa { lat, lon, leveysAst, korkeusAst } tai null.
 */
export function vananRajaus(pisteet) {
  const lista = (pisteet ?? []).filter((p) => Number.isFinite(p?.[0]) && Number.isFinite(p?.[1]));
  if (!lista.length) return null;
  let latMin = Infinity;
  let latMax = -Infinity;
  let lonMin = Infinity;
  let lonMax = -Infinity;
  let edellinen = null;
  for (const [lat, lon] of lista) {
    let l = lon;
    if (edellinen != null) {
      while (l - edellinen > 180) l -= 360;
      while (edellinen - l > 180) l += 360;
    }
    edellinen = l;
    latMin = Math.min(latMin, lat);
    latMax = Math.max(latMax, lat);
    lonMin = Math.min(lonMin, l);
    lonMax = Math.max(lonMax, l);
  }
  return {
    lat: (latMin + latMax) / 2,
    lon: kierraLon((lonMin + lonMax) / 2),
    leveysAst: Math.min(360, lonMax - lonMin),
    korkeusAst: latMax - latMin,
  };
}

/**
 * Rajaus kameran pyynnöksi: leveys lautayksikköinä ruudun leveydellä.
 *
 * Laatikon on mahduttava MOLEMPIIN suuntiin, joten korkeusehto
 * muunnetaan leveydeksi kuvasuhteella (sama kaava kuin
 * js/pallolauta/kamera.js kameranKohde bbox-haarassa). Korkeus
 * lasketaan asteina eikä laudan y-yksikköinä, koska Millerin lieriö
 * venyttää navat — vana ei saa kutistua ruudulla siksi, että se
 * sattuu kulkemaan Siperiassa.
 */
export function rajauksenLeveys(rajaus, kuvasuhde = 1, vara = RAJAUKSEN_VARA) {
  if (!rajaus) return null;
  const kerroin = 1 + 2 * vara;
  const leveys = rajaus.leveysAst * YKSIKKOA_ASTEELLA * kerroin;
  const korkeus = rajaus.korkeusAst * YKSIKKOA_ASTEELLA * kerroin * Math.max(0.2, kuvasuhde);
  return Math.max(RAJAUS_MIN, Math.min(RAJAUS_MAX, Math.max(leveys, korkeus)));
}

/** Heksaväri → "r, g, b" css-muuttujaan (sävytys ja hehku). */
export function heksaRgb(heksa, oletus = '212, 175, 90') {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(heksa ?? '').trim());
  if (!m) return oletus;
  const n = parseInt(m[1], 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/** Isoympyräetäisyys asteina (noston sävytys lähimmästä vanasta). */
function kulmaEro(aLat, aLon, bLat, bLon) {
  const RAD = Math.PI / 180;
  const f1 = aLat * RAD;
  const f2 = bLat * RAD;
  let dl = kierraLon(bLon - aLon) * RAD;
  if (!Number.isFinite(dl)) dl = 0;
  const k = Math.sin(f1) * Math.sin(f2) + Math.cos(f1) * Math.cos(f2) * Math.cos(dl);
  return Math.acos(Math.max(-1, Math.min(1, k))) / RAD;
}

/**
 * Noston virta: datan oma kenttä, tai lähin vanan kärki.
 *
 * Löytöpaikoilla (kaaren 20 pysäkkiä) kenttää ei ole — ne ovat
 * todisteita, eivät virran osia — joten sävy haetaan kartalta: mihin
 * vanaan piste on lähinnä, sen väriin se hehkuu. Kärkikohtainen
 * `virrat` ratkaisee, koska selkäranka vaihtaa väriä matkalla.
 */
export function nostonVirta(nosto, vanat = []) {
  if (nosto?.virta) return nosto.virta;
  let paras = null;
  let parasEro = Infinity;
  for (const vana of vanat) {
    const pisteet = vana?.pisteet ?? [];
    for (let k = 0; k < pisteet.length; k += 1) {
      const [lat, lon] = pisteet[k];
      const ero = kulmaEro(nosto.lat, nosto.lon, lat, lon);
      if (ero < parasEro) {
        parasEro = ero;
        paras = vana.virrat?.[k] ?? vana.virta;
      }
    }
  }
  return paras;
}

/**
 * Tutkimusvaiheen nostot yhtenä listana: kaaren löytöpaikat ensin,
 * lisänostot perään.
 *
 * LÖYTÖPAIKAN KORTTITEKSTI ON `loyto` eikä `juttu`: kortti on kartan
 * päällä kelluva lappu, ja koko juttu (kaksi kappaletta) kuuluu
 * Tiedeliitteeseen. `loyto` kertoo juuri sen, mitä pelaaja tässä
 * kysyy — kuka löysi, mistä ja milloin. Selite on varana.
 *
 * @param {object[]} tapahtumat moottorin pysäkit (ihmisenMatkanPysakit)
 * @param {object[]} lisat IHMISEN_MATKA_LISANOSTOT
 */
export function kokoaNostot(tapahtumat = [], lisat = []) {
  const nostot = [];
  for (const t of tapahtumat) {
    if (!Number.isFinite(t?.lat) || !Number.isFinite(t?.lon)) continue;
    nostot.push({
      tunnus: t.tunnus,
      laji: 'loytopaikka',
      otsikko: t.otsikko,
      paikka: t.paikka ?? null,
      maa: t.maa ?? null,
      ajoitus: t.ajoitus,
      vuosiaSitten: t.vuosiaSitten,
      lat: t.lat,
      lon: t.lon,
      teksti: t.loyto ?? t.selite ?? '',
      // ihmisenMatkanPysakit siirsi havainnekuvan `ilmio`-kenttään ja
      // löytökuvan `kuva`-kenttään; alkuperäinen `esine` on tallella.
      kuva: t.ilmio?.osoite ?? null,
      esine: t.esine?.osoite ?? null,
      esineSelite: t.esine?.selite ?? null,
      lahde: t.lahde ?? null,
      virta: null,
      kysymykset: t.kysymykset ?? [],
    });
  }
  for (const l of lisat) {
    if (!Number.isFinite(l?.lat) || !Number.isFinite(l?.lon)) continue;
    nostot.push({
      tunnus: l.tunnus,
      laji: 'lisanosto',
      otsikko: l.otsikko,
      paikka: null,
      maa: null,
      ajoitus: l.ajoitus,
      vuosiaSitten: l.vuosiaSitten,
      lat: l.lat,
      lon: l.lon,
      teksti: l.teksti ?? '',
      kuva: null,
      esine: null,
      esineSelite: null,
      lahde: l.lahde ?? null,
      virta: l.virta ?? null,
      kysymykset: l.kysymykset ?? [],
    });
  }
  return nostot;
}

/** Kysymyksen konteksti pululle: noston teksti ja lähde. */
export function nostonKonteksti(nosto) {
  const osat = [nosto.otsikko, nosto.ajoitus].filter(Boolean).join(', ');
  const lahde = nosto.lahde ? ` (Lähde: ${nosto.lahde}.)` : '';
  const paikka = nosto.paikka ? `${nosto.paikka}${nosto.maa ? `, ${nosto.maa}` : ''}. ` : '';
  return {
    nimi: `${nosto.otsikko}${nosto.ajoitus ? ` — ${nosto.ajoitus}` : ''}`,
    tyyppi: 'Ihmisen matka -linssin nosto',
    teksti: `${osat}. ${paikka}${nosto.teksti}${lahde}`,
  };
}

/* ==================== TUTKIMUSVAIHE ==================== */

/**
 * Käynnistää tutkimusvaiheen. Kutsutaan yhdestä paikasta
 * (js/aikajana.js `ui.aloitaTutkimusvaihe`), joka myös purkaa tämän
 * linssin sulkeutuessa.
 *
 * @param {{ ajo: object, ui: object, linssi: object }} asetukset
 * @returns {{ pura: () => void, tila: () => object }|null}
 */
export function luoTutkimusvaihe({ ajo, ui, linssi }) {
  if (typeof document === 'undefined' || !ajo || !ui) return null;
  const lauta = ajo.lauta ?? null;
  const koti = ui.mapPane ?? null;
  // Tutkimusvaihe on pallon vaihe: tasokartalla ei ole vanoja eikä
  // linssiapurin merkkejä, joten siellä esitys päättyy kuten ennen.
  if (!lauta?.linssit || !koti) return null;

  lataaTyyli();

  /* --- 1. Kello seis, vanat loppuun, kameran seuranta pois ---------- */
  ajo.pysayta?.();
  const vanat = ajo.virrat?.tutkimus?.() ?? null;
  const vananPisteet = vanat?.pisteet?.() ?? [];

  /*
   * ESINERIVI TAKAISIN NÄKYVIIN (tehtävänanto kohta 4). Karuselli on
   * moottorin oma nauha; esitys on voinut häivyttää sen luokalla
   * `tyhja` tai piilottaa koko juuren. Tutkimusvaiheessa se palaa —
   * löydöt ovat juuri sitä, mitä pelaaja nyt selaa.
   */
  const nauha = ajo.nauha ?? null;
  const nauhanTila = nauha ? { tyhja: nauha.classList.contains('tyhja'), hidden: nauha.hidden } : null;
  if (nauha) {
    nauha.classList.remove('tyhja');
    nauha.hidden = false;
  }
  ajo.juuri?.classList.add('tutkimusvaihe');
  document.body.classList.add('aikajana-tutkimus-auki');

  /* --- 2. Nostot kartalle ------------------------------------------ */
  const nostot = kokoaNostot(ajo.tapahtumat ?? [], data.IHMISEN_MATKA_LISANOSTOT ?? []);
  const varit = new Map(IHMISEN_MATKA_VIRRAT.map((v) => [v.tunnus, v.vari]));
  const merkit = new Map();
  let auki = null;

  const merkinElementti = (nosto) => {
    let el = merkit.get(nosto.tunnus);
    if (el) return el;
    el = solmu('div', 'ihmisen-nosto');
    el.setAttribute('aria-hidden', 'true');
    const virta = nostonVirta(nosto, vananPisteet);
    const vari = varit.get(virta)?.rintama ?? null;
    // Kulta on pohja, vanan sävy sekoittuu siihen: piste kertoo
    // yhdellä silmäyksellä, mihin virtaan kohta kuuluu.
    el.style.setProperty('--nosto-savy', heksaRgb(vari));
    el.appendChild(solmu('span', 'ihmisen-nosto-syke'));
    el.appendChild(solmu('span', 'ihmisen-nosto-ydin'));
    merkit.set(nosto.tunnus, el);
    return el;
  };

  const datumit = nostot.map((nosto) => ({
    avain: `tutkimus:${nosto.tunnus}`,
    lat: nosto.lat,
    lng: nosto.lon,
    elementti: () => merkinElementti(nosto),
    napautus: () => avaaKortti(nosto),
  }));
  const merkkikahva = lauta.linssit.merkit(TUTKIMUKSEN_OSA, datumit);
  /*
   * PALLO HERÄTETÄÄN. Kirjasto rakentaa merkkien elementit vasta
   * seuraavassa piirrossa, ja pallo saa nukkua (js/pallolauta/lauta.js
   * lepaa) — nukkuvalla pallolla nostot eivät ilmestyisi lainkaan.
   * Mitattu savukkeessa 7.9.2026: ilman herätystä 40 datumia oli
   * listalla mutta 0 elementtiä ruudulla.
   */
  lauta.heraa?.();

  /* --- 3. Kerros: napit, kortti ja pergamenttilappu ----------------- */
  const juuri = solmu('div', 'ihmisen-tutkimus');
  juuri.setAttribute('role', 'region');
  juuri.setAttribute('aria-label', `${linssi?.nimi ?? 'Ihmisen matka'}: tutkimusvaihe`);

  const napit = solmu('div', 'ihmisen-vananapit');
  napit.setAttribute('role', 'group');
  napit.setAttribute('aria-label', 'Vanat');
  const lappu = solmu('div', 'ihmisen-vanalappu');
  lappu.hidden = true;
  const lapunOtsikko = solmu('h3', 'ihmisen-vanalappu-otsikko');
  const lapunTeksti = solmu('p', 'ihmisen-vanalappu-teksti');
  lappu.append(lapunOtsikko, lapunTeksti);
  const kortti = solmu('div', 'ihmisen-nostokortti');
  kortti.hidden = true;
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-label', 'Nosto');
  juuri.append(napit, lappu, kortti);
  koti.appendChild(juuri);

  /* --- 4. Viisi nappia --------------------------------------------- */
  let valittu = null;
  const nappilista = [];

  /** Vanan kaikki kärjet, jotka kuuluvat valittuun virtaan. */
  const virranPisteet = (tunnus) => {
    const ulos = [];
    for (const vana of vananPisteet) {
      const pisteet = vana.pisteet ?? [];
      for (let k = 0; k < pisteet.length; k += 1) {
        if ((vana.virrat?.[k] ?? vana.virta) === tunnus) ulos.push(pisteet[k]);
      }
    }
    return ulos;
  };

  const kuvasuhde = () => {
    const kotelo = lauta.kotelo ?? koti;
    const w = kotelo?.clientWidth ?? 0;
    const h = kotelo?.clientHeight ?? 0;
    return w > 0 && h > 0 ? w / h : 1;
  };

  const kaannaVanaan = (tunnus) => {
    const rajaus = vananRajaus(virranPisteet(tunnus));
    const leveys = rajauksenLeveys(rajaus, kuvasuhde());
    const kamera = ui.kamera?.() ?? lauta.kamera ?? null;
    if (!rajaus || !leveys || !kamera?.ajaKamera) return false;
    kamera.ajaKamera({ lat: rajaus.lat, lng: rajaus.lon, leveys }, { kesto: KAANNON_KESTO_MS });
    return true;
  };

  const valitseVana = (virta) => {
    const uusi = valittu === virta.tunnus ? null : virta.tunnus;
    valittu = uusi;
    vanat?.korosta?.(uusi);
    for (const { el, tunnus } of nappilista) {
      const paalla = tunnus === uusi;
      el.classList.toggle('valittu', paalla);
      el.setAttribute('aria-pressed', paalla ? 'true' : 'false');
    }
    if (!uusi) {
      lappu.hidden = true;
      lappu.classList.remove('esilla');
      return;
    }
    lapunOtsikko.textContent = virta.nimi;
    lapunTeksti.textContent = virta.yhteenveto ?? '';
    lappu.hidden = false;
    // Pakotettu asettelu, jotta liuku lähtee alkuasennosta.
    void lappu.getBoundingClientRect();
    lappu.classList.add('esilla');
    asetaLapunKorkeus();
    kaannaVanaan(uusi);
  };

  for (const virta of IHMISEN_MATKA_VIRRAT) {
    const nappi = solmu('button', 'ihmisen-vananappi');
    nappi.type = 'button';
    nappi.setAttribute('aria-pressed', 'false');
    nappi.title = virta.nimi;
    nappi.style.setProperty('--vana-savy', heksaRgb(virta.vari?.rintama));
    nappi.appendChild(solmu('span', 'ihmisen-vananappi-pilkku'));
    nappi.appendChild(solmu('span', 'ihmisen-vananappi-nimi', virta.nimi));
    // Puhelimella nimet lyhenevät yhdelle riville (css vaihtaa spanit).
    nappi.appendChild(solmu('span', 'ihmisen-vananappi-lyhyt', LYHYET[virta.tunnus] ?? virta.nimi));
    nappi.addEventListener('click', () => valitseVana(virta));
    napit.appendChild(nappi);
    nappilista.push({ el: nappi, tunnus: virta.tunnus });
  }

  /*
   * LAPPU ASETTUU KARUSELLIN PÄÄLLE MITATTUUN KORKEUTEEN. Nauhan
   * korkeus tulee kortin leveydestä (css laskee sen muuttujista), joten
   * kiinteä `bottom` osuisi väärin kaikilla muilla ruuduilla kuin
   * sillä, jolla se kirjoitettiin.
   */
  function asetaLapunKorkeus() {
    const korkeus = nauha?.isConnected ? nauha.getBoundingClientRect().height : 0;
    juuri.style.setProperty('--tutkimus-nauha', `${Math.round(korkeus)}px`);
  }
  asetaLapunKorkeus();

  /* --- 5. Noston kortti kysymyksineen ------------------------------- */
  /** Mittarit savukkeelle ja testeille. */
  const tila = { nostoja: nostot.length, kysymyksia: 0, alku: Date.now() };

  function suljeKortti() {
    auki = null;
    kortti.hidden = true;
    kortti.classList.remove('esilla');
    kortti.replaceChildren();
    if (ui.fokuskohdeAuki?.linssinosto) ui.fokuskohdeAuki = null;
  }

  function avaaKortti(nosto) {
    if (auki === nosto.tunnus) { suljeKortti(); return; }
    auki = nosto.tunnus;
    kortti.replaceChildren();

    const sulje = solmu('button', 'ihmisen-nostokortti-sulje', '✕');
    sulje.type = 'button';
    sulje.setAttribute('aria-label', 'Sulje nosto');
    sulje.addEventListener('click', suljeKortti);
    kortti.appendChild(sulje);

    kortti.appendChild(solmu('div', 'ihmisen-nostokortti-ajoitus', nosto.ajoitus ?? ''));
    kortti.appendChild(solmu('h2', 'ihmisen-nostokortti-otsikko', nosto.otsikko ?? ''));
    if (nosto.paikka) {
      kortti.appendChild(solmu('div', 'ihmisen-nostokortti-paikka',
        nosto.maa ? `${nosto.paikka} — ${nosto.maa}` : nosto.paikka));
    }
    if (nosto.kuva || nosto.esine) {
      const kuvat = solmu('div', 'ihmisen-nostokortti-kuvat');
      for (const [osoite, selite] of [[nosto.kuva, nosto.otsikko], [nosto.esine, nosto.esineSelite]]) {
        if (!osoite) continue;
        const kuva = document.createElement('img');
        kuva.className = 'ihmisen-nostokortti-kuva';
        kuva.loading = 'lazy';
        kuva.decoding = 'async';
        kuva.src = osoite;
        kuva.alt = selite ?? '';
        // Puuttuva kuva ei jätä tyhjää laatikkoa kortin keskelle.
        kuva.addEventListener('error', () => kuva.remove());
        kuvat.appendChild(kuva);
      }
      if (kuvat.childElementCount) kortti.appendChild(kuvat);
    }
    kortti.appendChild(solmu('p', 'ihmisen-nostokortti-teksti', nosto.teksti ?? ''));
    if (nosto.lahde) kortti.appendChild(solmu('div', 'ihmisen-nostokortti-lahde', nosto.lahde));

    const kysymykset = (nosto.kysymykset ?? []).filter(Boolean).slice(0, 3);
    if (kysymykset.length) {
      const ryhma = solmu('div', 'ihmisen-nostokortti-kysymykset');
      ryhma.appendChild(solmu('div', 'ihmisen-nostokortti-kysyotsikko', 'Kysy pululta'));
      for (const kysymys of kysymykset) {
        const nappi = solmu('button', 'ihmisen-nostokysymys', kysymys);
        nappi.type = 'button';
        nappi.addEventListener('click', () => kysyPululta(nosto, kysymys, nappi));
        ryhma.appendChild(nappi);
      }
      kortti.appendChild(ryhma);
    }

    kortti.hidden = false;
    void kortti.getBoundingClientRect();
    kortti.classList.add('esilla');
    kortti.scrollTop = 0;
    /*
     * KONTEKSTI PULULLE (js/pollo.js avoinKohdetietoruutu): sama kenttä
     * kuin kartan kohdetietoruudulla, joten noston teksti ja lähde
     * kulkevat kysymyksen mukana ilman että pöllö tarvitsee tiedon
     * tästä moduulista. `linssinosto` erottaa oman merkintämme
     * fokuskohteen omasta, jottei purku vie väärää korttia.
     */
    ui.fokuskohdeAuki = { kohde: nostonKonteksti(nosto), popup: kortti, linssinosto: true };
  }

  /** Valmis kysymys chattiin. Epäonnistuminen näkyy napissa, ei konsolissa. */
  function kysyPululta(nosto, kysymys, nappi) {
    ui.fokuskohdeAuki = { kohde: nostonKonteksti(nosto), popup: kortti, linssinosto: true };
    const lahti = polloKysy(kysymys);
    nappi.classList.add(lahti ? 'lahetetty' : 'ei-lahtenyt');
    nappi.disabled = lahti;
    tila.kysymyksia += lahti ? 1 : 0;
  }

  /* --- 6. Ikkunan koko ja purku ------------------------------------- */
  const koonMuutos = () => {
    if (!juuri.isConnected) return;
    asetaLapunKorkeus();
  };
  globalThis.addEventListener?.('resize', koonMuutos);

  return {
    /** Savukkeet ja testit: mitä vaiheessa on. */
    tila: () => ({
      ...tila,
      valittu,
      auki,
      merkkeja: datumit.length,
      vanoja: vananPisteet.length,
    }),
    /** Vain testejä ja savukkeita varten: napin painallus ohjelmallisesti. */
    valitse: (tunnus) => {
      const virta = IHMISEN_MATKA_VIRRAT.find((v) => v.tunnus === tunnus);
      if (virta) valitseVana(virta);
    },
    avaa: (tunnus) => {
      const nosto = nostot.find((n) => n.tunnus === tunnus);
      if (nosto) avaaKortti(nosto);
    },
    pura: () => {
      globalThis.removeEventListener?.('resize', koonMuutos);
      suljeKortti();
      vanat?.korosta?.(null);
      merkkikahva?.pura?.();
      lauta.linssit.pura(TUTKIMUKSEN_OSA);
      merkit.clear();
      juuri.remove();
      ajo.juuri?.classList.remove('tutkimusvaihe');
      document.body.classList.remove('aikajana-tutkimus-auki');
      if (nauha && nauhanTila) {
        nauha.classList.toggle('tyhja', nauhanTila.tyhja);
        nauha.hidden = nauhanTila.hidden;
      }
    },
  };
}
