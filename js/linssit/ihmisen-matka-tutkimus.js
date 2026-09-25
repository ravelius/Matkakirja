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
 *   lisää."*
 *
 * ja "IHMISEN MATKA: YKSI PALKKI, EI KARUSELLIA, KAIKKIIN NOSTOIHIN
 * KUVA, LINSSI MUISTAA PAIKKANSA" (7.9.2026 klo 17.40): viisi nappia
 * asuvat linssin YHDESSÄ PALKISSA Matkakirjan yläpalkin tilalla,
 * alareunan karuselli on poissa, ja vaihe palaa sulun jälkeen siihen,
 * mihin pelaaja jäi.)
 *
 * Kertomusmoottori (js/linssit/ihmisen-matka-esitys.js) päättää
 * esityksen ja kutsuu `ui.aloitaTutkimusvaihe?.()` (js/aikajana.js).
 * Tästä eteenpäin kello ei kulje, kamera ei seuraa ketään ja kartta on
 * pelaajan oma:
 *
 *   1. NOSTOT   Kaikki kaaren 20 löytöpaikkaa — myös esityksestä pois
 *               jääneet — sekä 20 lisänostoa (Toba, Sunda, Sahul,
 *               Flores, Ust'-Ishim, Sungir, Lascaux, Clovis, Rapa Nui …)
 *               hehkuvat kartalla pieninä sykkivinä pisteinä, kukin
 *               oman vanansa väriin sävytettynä. Napautus avaa KORTIN
 *               (js/linssit/ihmisen-matka-kortti.js) — saman, jonka
 *               esitys avaa lampusta ja kuvasta.
 *   2. NAPIT    Viisi nappia = viisi virtaa, linssin palkissa. Esityksen
 *               aikana ne ovat legenda (himmeät, ilman toimintoa); tässä
 *               ne heräävät: napautus kääntää pallon niin että koko vana
 *               näkyy, korostaa sen ja avaa summaavan tekstin
 *               pergamenttilapussa; toinen napautus samaan nappiin
 *               palauttaa kaikki.
 *   3. PULU     Kortin alla 2–3 valmista kysymystä (kortin moduuli).
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
 *
 * ── MUISTI ────────────────────────────────────────────────────────
 *
 * Moottori antaa `ajo.muisti`-kentässä sulun yli tallennetun tilan
 * (js/linssit/ihmisen-matka-muisti.js). Jos siinä on valittu virta tai
 * avoin kortti, ne palautetaan tässä ILMAN kameran kääntöä — kamera on
 * jo muistista paikallaan, ja napin oma ajo veisi sen muualle.
 */

import * as data from './ihmisen-matka-data.js';
import { IHMISEN_MATKA_VIRRAT } from './ihmisen-matka-virrat.js';
import {
  heksaRgb, kierraLon, kokoaNostot, luoNostokortti, nostonKonteksti, nostonVirta,
} from './ihmisen-matka-kortti.js';

/* Nostojen kokoaminen ja sävytys asuvat kortin moduulissa; testit ja
   savukkeet lukevat ne yhä tästä. */
export {
  heksaRgb, kierraLon, kokoaNostot, nostonKonteksti, nostonVirta,
};

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
export function lataaTutkimuksenTyyli() {
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

/* ==================== VIISI NAPPIA ==================== */

/**
 * Viisi nappia = viisi virtaa (väripilkku + nimi).
 *
 * YKSI TEHDAS KAHDELLE KÄYTÖLLE (Raamattu YKSI PALKKI): moottori
 * rakentaa napit linssin palkkiin jo linssin auetessa LEGENDANA
 * (himmeät, ilman toimintoa — esityksen aikana pelaaja lukee niistä
 * vain värit), ja tutkimusvaihe kytkee samoihin nappeihin toiminnon
 * (`kytke`). Kaksi nappiriviä samasta asiasta olisi kaksi totuutta.
 *
 * @param {Array<{tunnus:string, nimi:string, vari?:{rintama?:string}}>} virrat
 * @param {{ legenda?: boolean }} asetukset
 * @returns {{ el: Element, napit: Array<{el:Element,tunnus:string}>,
 *   kytke: (fn: (virta: object) => void) => void, aseta: (tunnus: string|null) => void,
 *   legenda: (paalla: boolean) => void }}
 */
export function luoVirtanapit(virrat = [], { legenda = false } = {}) {
  const el = solmu('div', 'ihmisen-vananapit');
  el.setAttribute('role', 'group');
  el.setAttribute('aria-label', 'Vanat');
  const napit = [];
  let toiminto = null;
  for (const virta of virrat) {
    const nappi = solmu('button', 'ihmisen-vananappi');
    nappi.type = 'button';
    nappi.setAttribute('aria-pressed', 'false');
    nappi.title = virta.nimi;
    nappi.dataset.virta = virta.tunnus;
    nappi.style.setProperty('--vana-savy', heksaRgb(virta.vari?.rintama));
    nappi.appendChild(solmu('span', 'ihmisen-vananappi-pilkku'));
    nappi.appendChild(solmu('span', 'ihmisen-vananappi-nimi', virta.nimi));
    // Puhelimella nimet lyhenevät yhdelle riville (css vaihtaa spanit).
    nappi.appendChild(solmu('span', 'ihmisen-vananappi-lyhyt', LYHYET[virta.tunnus] ?? virta.nimi));
    nappi.addEventListener('click', () => { if (toiminto) toiminto(virta); });
    el.appendChild(nappi);
    napit.push({ el: nappi, tunnus: virta.tunnus });
  }
  const asetaLegenda = (paalla) => {
    el.classList.toggle('legenda', Boolean(paalla));
    for (const { el: n } of napit) {
      n.disabled = Boolean(paalla);
      n.setAttribute('aria-disabled', paalla ? 'true' : 'false');
    }
  };
  asetaLegenda(legenda);
  return {
    el,
    napit,
    kytke: (fn) => { toiminto = fn; asetaLegenda(!fn); },
    aseta: (valittu) => {
      for (const { el: n, tunnus } of napit) {
        const paalla = tunnus === valittu;
        n.classList.toggle('valittu', paalla);
        n.setAttribute('aria-pressed', paalla ? 'true' : 'false');
      }
    },
    legenda: asetaLegenda,
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

  lataaTutkimuksenTyyli();

  /* --- 1. Kello seis, vanat loppuun, kameran seuranta pois ---------- */
  ajo.pysayta?.();
  const vanat = ajo.virrat?.tutkimus?.() ?? null;
  const vananPisteet = vanat?.pisteet?.() ?? [];

  ajo.juuri?.classList.add('tutkimusvaihe');
  document.body.classList.add('aikajana-tutkimus-auki');

  /* --- 2. Kortti: moottorin oma tai tarvittaessa oma ---------------- */
  let omaKortti = null;
  let kortti = ui.nostokortti ?? null;
  if (!kortti) {
    omaKortti = luoNostokortti({ ajo, ui, linssi, koti });
    kortti = omaKortti;
  }
  const nostot = kortti?.nostot ?? kokoaNostot(ajo.tapahtumat ?? [], data.IHMISEN_MATKA_LISANOSTOT ?? []);
  const varit = new Map(IHMISEN_MATKA_VIRRAT.map((v) => [v.tunnus, v.vari]));
  const merkit = new Map();

  /* --- 3. Nostot kartalle ------------------------------------------ */
  const merkinElementti = (nosto) => {
    let el = merkit.get(nosto.tunnus);
    if (el) return el;
    el = solmu('div', 'ihmisen-nosto');
    el.setAttribute('aria-hidden', 'true');
    const virta = kortti?.virta?.(nosto.tunnus) ?? nostonVirta(nosto, vananPisteet);
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
    napautus: () => kortti?.avaa(nosto.tunnus),
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

  /* --- 4. Kerros: pergamenttilappu (ja napit, jos palkkia ei ole) --- */
  const juuri = solmu('div', 'ihmisen-tutkimus');
  juuri.setAttribute('role', 'region');
  juuri.setAttribute('aria-label', `${linssi?.nimi ?? 'Ihmisen matka'}: tutkimusvaihe`);

  const lappu = solmu('div', 'ihmisen-vanalappu');
  lappu.hidden = true;
  const lapunOtsikko = solmu('h3', 'ihmisen-vanalappu-otsikko');
  const lapunTeksti = solmu('p', 'ihmisen-vanalappu-teksti');
  lappu.append(lapunOtsikko, lapunTeksti);
  juuri.append(lappu);
  koti.appendChild(juuri);

  /*
   * NAPIT OVAT PALKISSA (Raamattu YKSI PALKKI): moottori rakensi ne
   * linssin palkkiin legendana (`ajo.virtanapit`), ja tässä ne saavat
   * toiminnon. Ilman palkkia (kaari ilman kertomusta) rivi tehdään
   * omaan kerrokseen kuten ennen.
   */
  let virtanapit = ajo.virtanapit ?? null;
  let omatNapit = false;
  if (!virtanapit) {
    virtanapit = luoVirtanapit(IHMISEN_MATKA_VIRRAT);
    juuri.prepend(virtanapit.el);
    omatNapit = true;
  }

  /* --- 5. Viisi nappia --------------------------------------------- */
  let valittu = null;

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

  const valitseVana = (virta, { kamera = true } = {}) => {
    const uusi = valittu === virta.tunnus ? null : virta.tunnus;
    valittu = uusi;
    vanat?.korosta?.(uusi);
    virtanapit.aseta(uusi);
    if (!uusi) {
      lappu.hidden = true;
      lappu.classList.remove('esilla');
      ajo.tallennaMuisti?.();
      return;
    }
    lapunOtsikko.textContent = virta.nimi;
    lapunTeksti.textContent = virta.yhteenveto ?? '';
    lappu.hidden = false;
    // Pakotettu asettelu, jotta liuku lähtee alkuasennosta.
    void lappu.getBoundingClientRect();
    lappu.classList.add('esilla');
    if (kamera) kaannaVanaan(uusi);
    ajo.tallennaMuisti?.();
  };
  virtanapit.kytke(valitseVana);

  /* --- 6. Muisti: valittu virta ja avoin kortti sulun takaa --------- */
  const muisti = ajo.muisti?.vaihe === 'tutkimus' ? ajo.muisti : null;
  if (muisti?.virta) {
    const virta = IHMISEN_MATKA_VIRRAT.find((v) => v.tunnus === muisti.virta);
    // Kamera on jo muistista paikallaan: napin ajo ei saa viedä sitä.
    if (virta) valitseVana(virta, { kamera: false });
  }
  if (muisti?.kortti && kortti && kortti.auki() !== muisti.kortti) kortti.avaa(muisti.kortti);

  /** Mittarit savukkeelle ja testeille. */
  const tila = { nostoja: nostot.length, alku: Date.now() };

  return {
    /** Savukkeet ja testit: mitä vaiheessa on. */
    tila: () => ({
      ...tila,
      kysymyksia: kortti?.tila?.().kysymyksia ?? 0,
      valittu,
      auki: kortti?.auki?.() ?? null,
      merkkeja: datumit.length,
      vanoja: vananPisteet.length,
      palkissa: !omatNapit,
    }),
    /** Vain testejä ja savukkeita varten: napin painallus ohjelmallisesti. */
    valitse: (tunnus) => {
      const virta = IHMISEN_MATKA_VIRRAT.find((v) => v.tunnus === tunnus);
      if (virta) valitseVana(virta);
    },
    avaa: (tunnus) => kortti?.avaa(tunnus),
    pura: () => {
      kortti?.sulje?.();
      omaKortti?.pura?.();
      vanat?.korosta?.(null);
      virtanapit.aseta(null);
      // Palkin napit palaavat legendaksi; omat napit lähtevät kerroksen mukana.
      if (!omatNapit) virtanapit.kytke(null);
      merkkikahva?.pura?.();
      lauta.linssit.pura(TUTKIMUKSEN_OSA);
      merkit.clear();
      juuri.remove();
      ajo.juuri?.classList.remove('tutkimusvaihe');
      document.body.classList.remove('aikajana-tutkimus-auki');
    },
  };
}
