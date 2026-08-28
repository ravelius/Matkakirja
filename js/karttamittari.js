/*
 * KARTTAMITTARI — laitemittari omistajan puhelimelle.
 *
 * Miksi tämä on olemassa: kartan tökkiminen on iPhonen (WKWebView)
 * vika, jota kehityskoneen WebKit ei toista lainkaan — se kompositoi
 * ohjelmistolla, joten sama lava, sama sisältö ja sama ele mitataan
 * siellä sujuvaksi. Kaikki tähänastiset korjaukset (v1128 sykkeet ja
 * asettelunluvut, v1149 wrapper-siirto, v1158 viivainnauha, v1294
 * LAVAIKKUNA) on siksi jouduttu perustelemaan välillisillä mittareilla.
 * Tämä mittari lukee luvut SIITÄ laitteesta, jossa vika on: omistaja
 * kytkee sen päälle, panoroi ja zoomaa, ja lukee laatikon.
 *
 * KUN MITTARI ON POIS, SE EI MAKSA MITÄÄN. `kaynnistaKarttamittari`
 * palaa ensimmäiseltä riviltä: ei rAF-silmukkaa, ei tarkkailijaa, ei
 * yhtään DOM-solmua. Moduuli on siis turvallista tuoda staattisesti
 * (js/ui.js), eikä pelaaja koskaan näe siitä merkkiäkään.
 *
 * KYTKENTÄ (sama kaava kuin kehittäjävivulla js/ui-apurit.js ja
 * lautaparametrilla js/main.js):
 *   - `?mittari=1` osoiterivillä kytkee päälle, `?mittari=0` pois,
 *   - kumpikin myös MUISTETAAN laitteelle (localStorage), jottei
 *     parametria tarvitse naputella uudelleen joka latauksella —
 *     puhelimella osoiterivin muokkaus on juuri sitä työtä, jota
 *     mittarin lukija ei jaksa tehdä.
 *
 * MITTARI EI SAA ITSE OLLA KUORMA. Kehyssilmukka tekee vain
 * aikaleiman talteenoton valmiiksi varattuihin taulukoihin (ei roskaa
 * — js/fokusmitat.js "KEHYSSILMUKKA EI SAA TUOTTAA ROSKAA"), ja
 * tekstit kirjoitetaan vasta kahdesti sekunnissa. Solmumäärät
 * lasketaan samassa harvassa tahdissa, ei kehyksittäin.
 */

/** Muistettu kytkin: sama nimiavaruus kuin muilla laitekytkimillä. */
const MITTARI_AVAIN = 'matkakirja-mittari';
/** Kehysaikojen liukuva ikkuna (ms). */
const KEHYSIKKUNA_MS = 2000;
/** Pitkien tehtävien ikkuna (ms). */
const TUKOSIKKUNA_MS = 5000;
/** Kuinka usein tekstit kirjoitetaan (ms). */
const PIIRTOVALI_MS = 500;
/** Kuinka usein sama tieto menee konsoliin yhtenä rivinä (ms). */
const KONSOLIVALI_MS = 5000;
/** Kehysrenkaan koko: 512 riittää 2 s:iin myös 120 Hz:n ruudulla. */
const KEHYKSIA = 512;
/** Tukosrenkaan koko: 5 s:ssa ei realistisesti tule enempää. */
const TUKOKSIA = 128;

/** Suomalainen desimaaliluku yhdellä desimaalilla. */
function luku(arvo) {
  return Number.isFinite(arvo) ? arvo.toFixed(1).replace('.', ',') : '–';
}

/**
 * Onko mittari päällä tällä laitteella?
 *
 * Osoiterivin parametri voittaa muistetun arvon JA kirjoittaa sen —
 * niin kytkin jää voimaan seuraavaankin lataukseen. Yksityisessä
 * selauksessa kirjoitus voi heittää; silloin mittari toimii vain tämän
 * latauksen ajan, mikä on täsmälleen oikea käytös.
 */
export function mittariPaalla() {
  let parametri = null;
  try {
    parametri = new URLSearchParams(location.search).get('mittari');
  } catch {
    parametri = null; // ei ikkunaa (testiajo Nodessa)
  }
  if (parametri === '1' || parametri === '0') {
    try {
      if (parametri === '1') localStorage.setItem(MITTARI_AVAIN, '1');
      else localStorage.removeItem(MITTARI_AVAIN);
    } catch {
      /* yksityinen selaus: kytkin jää vain tälle istunnolle */
    }
    return parametri === '1';
  }
  try {
    return localStorage.getItem(MITTARI_AVAIN) === '1';
  } catch {
    return false; // yksityinen selaus
  }
}

/** Mittarin laatikko kartan oikeaan ylänurkkaan. */
function teeLaatikko(pane) {
  const laatikko = document.createElement('div');
  laatikko.className = 'laitemittari';
  /*
   * Tyyli kirjoitetaan tähän eikä css/-tiedostoon: mittari on
   * kehittäjän työkalu, joka elää yhdessä moduulissa, eikä pelin
   * tyylitiedostojen kuulu kantaa siitä riviäkään.
   *
   * `pointer-events: none` on ehto eikä koriste — laatikko on kartan
   * PÄÄLLÄ, ja ilman sitä se söisi juuri ne eleet, joita mitataan.
   */
  laatikko.style.cssText = [
    'position:absolute', 'top:6px', 'right:6px', 'z-index:9999',
    'pointer-events:none', 'user-select:none',
    'background:rgba(12,12,16,0.78)', 'color:#f2e9d8',
    'border:1px solid rgba(242,233,216,0.35)', 'border-radius:6px',
    'padding:6px 8px', 'max-width:min(70vw,340px)',
    'font:600 13px/1.35 ui-monospace,Menlo,Consolas,monospace',
    'white-space:pre', 'text-shadow:0 1px 2px rgba(0,0,0,0.6)',
  ].join(';');
  laatikko.textContent = 'MITTARI\nodottaa kehyksiä…';
  pane.appendChild(laatikko);
  return laatikko;
}

/**
 * Käynnistää mittarin, jos kytkin on päällä.
 *
 * @param {object} ui  UI-olio (ui.mapPane, ui.svg, ui.lavaIkkunaTila…)
 * @returns {null|{sammuta:() => void}} ohjain, tai null kun pois päältä
 */
export function kaynnistaKarttamittari(ui) {
  if (!mittariPaalla()) return null;
  const pane = ui?.mapPane;
  if (!pane || typeof requestAnimationFrame !== 'function') return null;

  const laatikko = teeLaatikko(pane);

  // Kehysvälit ja niiden aikaleimat renkaassa: ei varauksia silmukassa.
  const kehysvalit = new Float64Array(KEHYKSIA);
  const kehysajat = new Float64Array(KEHYKSIA);
  let kehyspaa = 0;
  let kehysmaara = 0;
  let edellinen = 0;

  // Tukokset (longtask) samassa muodossa.
  const tukoskestot = new Float64Array(TUKOKSIA);
  const tukosajat = new Float64Array(TUKOKSIA);
  let tukospaa = 0;
  let tukosmaara = 0;
  let tukostuki = 'ei tuettu';

  let tarkkailija = null;
  try {
    tarkkailija = new PerformanceObserver((lista) => {
      for (const merkinta of lista.getEntries()) {
        tukoskestot[tukospaa] = merkinta.duration;
        tukosajat[tukospaa] = merkinta.startTime;
        tukospaa = (tukospaa + 1) % TUKOKSIA;
        if (tukosmaara < TUKOKSIA) tukosmaara += 1;
      }
    });
    tarkkailija.observe({ type: 'longtask', buffered: true });
    tukostuki = null;
  } catch {
    // Safari ei tunne longtaskia: sanotaan se suoraan eikä väitetä
    // nollaa tukosta — nolla olisi tässä valhe, ei mittaustulos.
    tarkkailija = null;
  }

  /**
   * Renkaan yhteenveto annetulta ikkunalta: montako, summa ja pisin.
   * Kulku on nuorimmasta vanhimpaan, joten ensimmäinen ikkunan
   * ulkopuolinen merkintä päättää silmukan.
   */
  const ikkunasta = (kestot, ajat, paa, maara, nyt, ikkuna) => {
    const koko = kestot.length;
    let n = 0;
    let summa = 0;
    let suurin = 0;
    for (let i = 0; i < maara; i += 1) {
      const kohta = ((paa - 1 - i) % koko + koko) % koko;
      if (nyt - ajat[kohta] > ikkuna) break;
      n += 1;
      summa += kestot[kohta];
      if (kestot[kohta] > suurin) suurin = kestot[kohta];
    }
    return { maara: n, summa, suurin };
  };

  /**
   * Lavan nykyinen koko pikseleinä ja ikkunoinnin tila.
   *
   * Mitta luetaan SVG:n omasta rivityylistä, koska juuri sen
   * lähikuvan sovitus kirjoittaa (js/kartta.js sovitaMannerZoom) ja
   * juuri se on se jättikerros, jota WKWebView rasteroi. Yleiskuvassa
   * tyyliä ei ole, ja silloin kelpaa asettelumitta — se ei elä
   * eleen mukana, koska siirto tehdään kuoreen eikä SVG:hen.
   */
  const lavanTila = () => {
    const svg = ui.svg;
    const leveys = Math.round(parseFloat(svg?.style?.width) || svg?.clientWidth || 0);
    const korkeus = Math.round(parseFloat(svg?.style?.height) || svg?.clientHeight || 0);
    const ikkuna = ui.lavaIkkunaTila;
    const skaala = ui.zoomSkaala;
    let lautaLeveys = 0;
    let lautaKorkeus = 0;
    if (ikkuna?.lauta && skaala > 0) {
      lautaLeveys = Math.round(ikkuna.lauta.w * skaala);
      lautaKorkeus = Math.round(ikkuna.lauta.h * skaala);
    }
    /*
     * Ikkunoitu = lava on koko lautaa pienempi jommassakummassa
     * suunnassa. Loitonnettuna ikkuna on laudan kokoinen, ja silloin
     * "koko lauta" on oikea vastaus eikä oire (ks. js/kartta.js
     * LAVAIKKUNA): vika oli LÄHIKUVAN täysikokoinen lava. Ilman
     * lähikuvaa (aloituksen yleiskuva) ikkunointia ei ole lainkaan.
     */
    let tila = 'yleiskuva';
    if (lautaLeveys > 0) {
      tila = (leveys < lautaLeveys - 1 || korkeus < lautaKorkeus - 1)
        ? 'ikkunoitu' : 'koko lauta';
    }
    return {
      leveys, korkeus, lautaLeveys, lautaKorkeus, tila,
    };
  };

  /** JS-muisti, jos selain kertoo sen (Safari ei kerro). */
  const muisti = () => {
    const m = performance.memory;
    if (!m?.usedJSHeapSize) return '–';
    return `${luku(m.usedJSHeapSize / 1048576)} MB`;
  };

  let viimePiirto = 0;
  let viimeKonsoli = 0;
  let pyynto = 0;
  let elossa = true;

  const kehys = (nyt) => {
    if (!elossa) return;
    pyynto = requestAnimationFrame(kehys);
    if (edellinen) {
      kehysvalit[kehyspaa] = nyt - edellinen;
      kehysajat[kehyspaa] = nyt;
      kehyspaa = (kehyspaa + 1) % KEHYKSIA;
      if (kehysmaara < KEHYKSIA) kehysmaara += 1;
    }
    edellinen = nyt;

    if (nyt - viimePiirto < PIIRTOVALI_MS) return;
    viimePiirto = nyt;

    const k = ikkunasta(kehysvalit, kehysajat, kehyspaa, kehysmaara, nyt, KEHYSIKKUNA_MS);
    const keski = k.maara ? k.summa / k.maara : NaN;
    const fps = k.maara && keski > 0 ? 1000 / keski : NaN;
    const t = ikkunasta(tukoskestot, tukosajat, tukospaa, tukosmaara, nyt, TUKOSIKKUNA_MS);
    const lava = lavanTila();
    const svgSolmut = ui.svg ? ui.svg.getElementsByTagName('*').length : 0;
    const domSolmut = document.getElementsByTagName('*').length;
    const dpr = window.devicePixelRatio || 1;
    const nakyma = `${window.innerWidth}×${window.innerHeight}`;
    const tukosrivi = tukostuki
      ? `tukokset  ${tukostuki}`
      : `tukokset  ${t.maara} kpl / 5 s · pisin ${luku(t.suurin)} ms`;

    laatikko.textContent = [
      'MITTARI',
      `kehys     ${luku(keski)} ms · max ${luku(k.suurin)} ms · ${luku(fps)} fps`,
      tukosrivi,
      `lava      ${lava.leveys}×${lava.korkeus} px · ${lava.tila}`,
      `lauta     ${lava.lautaLeveys || '–'}×${lava.lautaKorkeus || '–'} px`,
      `solmut    svg ${svgSolmut} · dom ${domSolmut}`,
      `laite     dpr ${dpr} · näkymä ${nakyma}`,
      `muisti    ${muisti()}`,
    ].join('\n');

    /*
     * SAMA TIETO KONSOLIIN YHTENÄ RIVINÄ 5 s VÄLEIN. Safarin
     * etäkonsolista (Mac → Kehitä → iPhone) rivin saa talteen
     * kokonaisena, eikä kuvakaappauksia tarvita.
     */
    if (nyt - viimeKonsoli >= KONSOLIVALI_MS) {
      viimeKonsoli = nyt;
      console.log(
        `[mittari] kehys ka ${luku(keski)} max ${luku(k.suurin)} fps ${luku(fps)}`
        + ` | tukokset ${tukostuki ?? `${t.maara} pisin ${luku(t.suurin)}`}`
        + ` | lava ${lava.leveys}x${lava.korkeus} ${lava.tila.replace(' ', '-')}`
        + ` | lauta ${lava.lautaLeveys}x${lava.lautaKorkeus}`
        + ` | svg ${svgSolmut} dom ${domSolmut}`
        + ` | dpr ${dpr} nakyma ${nakyma} | muisti ${muisti()}`,
      );
    }
  };

  pyynto = requestAnimationFrame(kehys);

  return {
    sammuta() {
      elossa = false;
      cancelAnimationFrame(pyynto);
      tarkkailija?.disconnect();
      laatikko.remove();
    },
  };
}
