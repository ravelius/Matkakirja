/*
 * TARKKA VARJO — 1′-KORKEUSVARJOSTUS LIVENÄ LAATTOJEN PÄÄLLE.
 *
 * Omistajan kokeilu 1.9.2026, sanatarkka: *"korkeusdatan 1′-ajoa
 * simuloidaan liverenderöinnillä pelissä: ensin haetaan normaali pohja
 * laatoista ja sitten peli rakentaa reaaliajassa tarkemman
 * korkeusvarjostuksen."*
 *
 * Pohjalaatoissa varjo on poltettu KOLMEN kaariminuutin ruudukosta
 * (Raamattu: "KORKEUSDATA 3 KAARIMINUUTTIA"). Tämä kerros laskee saman
 * varjon ETOPO1:n natiivista YHDEN kaariminuutin ruudukosta ja piirtää
 * sen laattojen päälle. Kokeilun kysymys on yksi: näkyykö ero, ja onko
 * se sen arvoinen että pohja poltetaan uudestaan.
 *
 * === OMISTAJAN KOLME PÄÄTÖSTÄ =======================================
 *
 * 1. *"1′-varjo piirretään SUORAAN laattojen päälle läpikuultavana
 *    (sama läpinäkyvyys kuin moottorin varjostuksella), EI
 *    sekoitustilaa."* Kerros on siis tavallinen alfakuva, ei
 *    multiply- eikä overlay-kerros.
 * 2. *"Hyväksytään, että rinteet saavat sekä poltetun 3′-varjon että
 *    1′-varjon."* Varjo siis KAKSINKERTAISTUU rinteillä. Se on
 *    tietoinen kokeilun hinta — vertailukelpoinen kuva syntyisi vasta
 *    erotuksesta, ja erotus vaatisi tiedon siitä mitä laattaan on
 *    poltettu.
 * 3. *"Lopullinen ratkaisu on pohjan uusintapoltto."* Tämä kerros ei
 *    siis ole matkalla pelaajan näkymään; se on mittalaite, joka asuu
 *    kehittäjän valikossa ("tarkka varjo", #kehittaja-varjo-btn).
 *
 * === NELJÄ SÄÄNTÖÄ ==================================================
 *
 * 1. KERROS ELÄÄ KARTAN MUUNNOKSEN SISÄLLÄ. Varjokuva on <image>
 *    laudan koordinaateissa, samassa <g>:ssä kuin laatat — silloin
 *    kartan siirtokuori liikuttaa sitä kompositorilla, eikä panorointi
 *    tai zoomaus laske mitään uudelleen. Ruutuavaruudessa elävä canvas
 *    mitattiin laattapyramidissa kahdeksan kertaa hitaammaksi.
 * 2. PÄIVITYS VASTA KUN ELE ON ASETTUNUT. Tämä moduuli kutsutaan
 *    js/laattapyramidi.js:n paivitaPyramidi-funktiosta, joka ajetaan
 *    kerran jokaisesta asettuneesta näkymästä — ei kehyksestä.
 * 3. VAIN SYVILLÄ TASOILLA. Alle z5:n yksi 1′-solu on alle kaksi
 *    kuvapikseliä, eikä kaavassa ole silloin mitään mitä 3′ ei jo
 *    sanoisi — se olisi pelkkää kohinaa ja latausta.
 * 4. LASKENTA OMASSA SÄIKEESSÄ. Ks. js/korkeus-worker.js.
 *
 * === YHDEN TIEDOSTON VERSIO ==========================================
 *
 * tools/build-standalone.mjs kokoaa pelin yhdeksi <script>-lohkoksi,
 * jossa ei ole moduuleja eikä erillisiä tiedostoja. Worker tarvitsee
 * kumpaakin, ja file://-sivulta workeria ei saa käynnistää lainkaan.
 * Kokeilu kytkeytyy siellä siis itsestään pois (workerin luonti
 * epäonnistuu, `tuettu` jää epätodeksi) — ja niin kuuluukin: palat
 * tulevat verkosta, eikä yhden tiedoston versio oleta verkkoa.
 */
import { el } from './mapart.js';
import { korkeuspalaUrl } from './media.js';
import { FOKUS_LAUTAPROJEKTIOT } from './packs/fokus-grc.js';
import { kehittajaTilaPaalla, tarkkaVarjoPaalla } from './ui-apurit.js';

const VARJO_RAD = Math.PI / 180;

/**
 * Syvin taso, jolla kerros on hiljaa.
 *
 * z5 on 1,8 px lautayksikköä kohti eli 60 px astetta kohti: yksi
 * kaariminuutin solu on tasan yksi kuvapikseli. Sitä karkeammalla
 * tasolla naapurisolut osuvat samaan pikseliin, ja tarkempi ruudukko
 * näkyisi vain kohinana — juuri se, minkä takia pohjaan poltettiin
 * kolme kaariminuuttia.
 */
const SYVIN_HILJAINEN_TASO = 4;

/**
 * Varjokuvan reunus: näkyvän alueen ympärille tämä osuus ruutua joka
 * suuntaan. Ele ei laske varjoa uudelleen, joten reunus on se, mikä
 * pitää kuvan reunan poissa ruudulta sormenvedon aikana. Neljäsosa on
 * pinta-alana 2,25-kertainen, ja pinta-ala on tämän kerroksen hinta.
 */
const REUNUS = 0.25;

/**
 * Varjokuvan pikselikatto.
 *
 * Yksi pikseli maksaa neljä bilineaarista korkeusnäytettä eli 16
 * ruudukkolukua, joten katto on suoraan laskenta-aika. 1,6 Mpx on
 * iPhone-profiilissa (390 × 844, dpr 3, reunus mukaan lukien 2,2 Mpx
 * laitepikseliä) noin 0,7-kertainen tiheys — z7:llä yhä 2,5 pikseliä
 * yhtä 1′-solua kohti, eli katto ei hukkaa yhtään aineiston
 * yksityiskohtaa. Se vain estää sen, että katto olisi laite.
 */
const PIKSELIKATTO = 1.6e6;

/**
 * Palan sivu asteina. Sama sopimus kuin tools/tee-korkeuspalat.mjs —
 * jos tämä ja pilkkoja ovat eri mieltä, peli hakee palaa jota ei ole.
 */
const PALAN_ASTEITA = 10;

/*
 * PALOJEN JUURI ON VAIHDETTAVISSA. Oletus on R2-ämpäri, jonne
 * .github/workflows/vie-korkeuspalat.yml vie palat. Savuke tarjoilee ne
 * paikallisesti, koska ämpärissä niitä ei kokeilun alkaessa vielä ole
 * — siksi juuri luetaan osoiteriviltä (`?korkeusjuuri=/palat/`).
 */
let juuriMuisti;
function palanOsoite(nimi) {
  if (juuriMuisti === undefined) {
    try {
      juuriMuisti = new URLSearchParams(location.search).get('korkeusjuuri') || null;
    } catch {
      juuriMuisti = null;
    }
  }
  return juuriMuisti ? `${juuriMuisti}${nimi}.bin.gz` : korkeuspalaUrl(nimi);
}

/* ------------------------------------------------------------ projektio */

/*
 * LAUDAN KÄÄNTEISKAAVA. Sama Millerin lieriö kuin kuvan renderöinnissä
 * (tools/fokuskartta/piirto.js laudanProjektio) ja mittajanalla
 * (js/fokusmitat.js) — ja kuten siellä, se on tässä toistettuna eikä
 * tuotuna, koska työkalut ovat Node-puolella eikä peli lataa niitä.
 * Kaava lasketaan kerran moduulin elinaikana: se on kolme vakiota ja
 * kaksi funktiota.
 */
const P = FOKUS_LAUTAPROJEKTIOT.maailmankartta;
const SKAALA = P.leveys / (2 * Math.PI);
const Y_POHJOINEN = -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * P.pohjoinen * VARJO_RAD));

/** Lautayksikkö → pituusaste (ei kierrätetä: kutsuja tietää saumansa). */
const lautaLon = (x) => P.lon0 + (x / SKAALA) / VARJO_RAD;
/** Lautayksikkö → leveysaste. */
const lautaLat = (y) => {
  const my = y / SKAALA + Y_POHJOINEN;
  return (Math.atan(Math.exp(-my / 1.25)) - Math.PI / 4) / 0.4 / VARJO_RAD;
};

/* --------------------------------------------------------------- tila */

/**
 * Moduulin tila. Kartan tilaa eikä pelin: sama worker ja sama
 * palavälimuisti palvelevat koko istunnon, ja uusi peli samalla
 * laudalla saa ne valmiina.
 */
let worker = null;
let tuettu = null;
let seuraavaId = 1;
let kesken = 0;
/** Palat, jotka on JO lähetetty workerille (nimi → Promise). */
const lahetetyt = new Map();
/** Viimeksi piirretty pyyntö, jottei sama näkymä laske kahdesti. */
let edellinenAvain = null;

/** Kehittäjän mittarit: konsolista `window.__tarkkaVarjo`. */
const varjoMittarit = {
  paalla: false,
  taso: null,
  paloja: 0,
  epaonnistui: 0,
  leveys: 0,
  korkeus: 0,
  laskuMs: 0,
  paivityksia: 0,
};
try {
  globalThis.__tarkkaVarjo = () => ({ ...varjoMittarit });
} catch {
  /* jäädytetty globaali: mittari on kehittäjän mukavuus, ei ehto */
}

/* -------------------------------------------------------------- worker */

/**
 * Worker pystyyn — kerran, ja vain jos selain osaa kaiken tarvittavan.
 *
 * Kolme ehtoa, ja jokainen on oikeasti puuttunut jossain ympäristössä:
 * moduuliworker (yhden tiedoston versio), DecompressionStream (vanha
 * Safari) ja OffscreenCanvas-vapaa piirto (tehdään pääsäikeessä, joten
 * sitä ei tarvita). Jos worker ei synny, kerros on hiljaa pois eikä
 * kaada mitään.
 */
function varmistaWorker() {
  if (tuettu !== null) return tuettu;
  tuettu = false;
  try {
    if (typeof Worker !== 'function' || typeof DecompressionStream !== 'function') {
      return tuettu;
    }
    worker = new Worker('js/korkeus-worker.js', { type: 'module' });
    worker.onmessage = (viesti) => vastaanota(viesti.data);
    worker.onerror = () => {
      // Moduuliworkerin lataus voi kaatua vasta täällä (yhden tiedoston
      // versio, file://). Kerros vaikenee eikä yritä uudelleen.
      tuettu = false;
      worker = null;
    };
    tuettu = true;
  } catch {
    worker = null;
    tuettu = false;
  }
  return tuettu;
}

/** Odottavat varjopyynnöt id:n mukaan. */
const odottavat = new Map();

function vastaanota(t) {
  if (t.tyyppi === 'varjo') {
    const pyynto = odottavat.get(t.id);
    odottavat.delete(t.id);
    kesken -= 1;
    if (pyynto) pyynto(t);
    return;
  }
  if (t.tyyppi === 'virhe') {
    varjoMittarit.epaonnistui += 1;
    const pyynto = odottavat.get(t.id);
    if (pyynto) { odottavat.delete(t.id); kesken -= 1; pyynto(null); }
  }
}

/* --------------------------------------------------------------- palat */

/**
 * Yksi pala workerille — kerran istuntoa kohti.
 *
 * Välimuisti on nimien joukko eikä puskureiden: itse ruudukot elävät
 * workerissa, ja pääsäie muistaa vain sen, mikä on jo lähetetty. Näin
 * sama pala ei kulje verkosta eikä säikeeltä toiselle kahdesti,
 * eivätkä 720 kt:n taulukot pääse kertymään pääsäikeeseen.
 *
 * PUUTTUVA PALA EI OLE VIRHE. Ämpärissä ei tarvitse olla kaikkia
 * paloja (koeajo vie kolme), ja meripalat voivat puuttua kokonaan.
 * 404 merkitään lähetetyksi, jotta sitä ei haeta uudelleen joka
 * näkymästä — pikselit jäävät läpinäkyviksi ja laatta näkyy sellaisenaan.
 */
function laheta(nimi) {
  if (lahetetyt.has(nimi)) return lahetetyt.get(nimi);
  const lupaus = fetch(palanOsoite(nimi))
    .then((v) => (v.ok ? v.arrayBuffer() : null))
    .then((puskuri) => {
      if (!puskuri || !worker) return false;
      worker.postMessage({ tyyppi: 'pala', nimi, data: puskuri }, [puskuri]);
      varjoMittarit.paloja += 1;
      return true;
    })
    .catch(() => false);
  lahetetyt.set(nimi, lupaus);
  return lupaus;
}

/** Palan nimi lounaisnurkasta — sama sääntö kuin pilkkojalla. */
function palanNimi(lon0, lat0) {
  const ns = lat0 < 0 ? 'S' : 'N';
  const ew = lon0 < 0 ? 'W' : 'E';
  return `${ns}${String(Math.abs(lat0)).padStart(2, '0')}`
    + `${ew}${String(Math.abs(lon0)).padStart(3, '0')}`;
}

/**
 * Alueen tarvitsemat palat.
 *
 * Reunus on YKSI SOLU joka suuntaan, koska varjo lasketaan
 * keskeisdifferenssinä: reunimmaisen pikselin naapuri on jo
 * seuraavassa palassa, ja ilman sitä joka kymmenennen asteen kohdalle
 * jäisi varjoton viiva.
 */
function tarvittavatPalat(lonAlku, lonLoppu, latAla, latYla) {
  const solu = 1 / 60;
  const nimet = [];
  const kokoMaailma = lonLoppu - lonAlku >= 360;
  const l0 = Math.floor((latAla - solu) / PALAN_ASTEITA) * PALAN_ASTEITA;
  const l1 = Math.floor((latYla + solu) / PALAN_ASTEITA) * PALAN_ASTEITA;
  const x0 = kokoMaailma ? -180 : Math.floor((lonAlku - solu) / PALAN_ASTEITA) * PALAN_ASTEITA;
  const x1 = kokoMaailma ? 170 : Math.floor((lonLoppu + solu) / PALAN_ASTEITA) * PALAN_ASTEITA;
  for (let lat0 = Math.max(-90, l0); lat0 <= Math.min(80, l1); lat0 += PALAN_ASTEITA) {
    for (let lon = x0; lon <= x1; lon += PALAN_ASTEITA) {
      // Kierto: näkymä voi ylittää laudan sauman, jolloin pituusaste
      // juoksee yli 180:n. Pala on silti se, mikä on maailman toisella
      // laidalla.
      const lon0 = ((lon + 180) % 360 + 360) % 360 - 180;
      nimet.push(palanNimi(lon0, lat0));
    }
  }
  return [...new Set(nimet)];
}

/* --------------------------------------------------------------- piirto */

/** Kerroksen <g> laattojen päälle, kartan muunnoksen sisään. */
function varmistaKerros(ui) {
  if (ui.korkeusKerros?.isConnected) return ui.korkeusKerros;
  const tarkka = ui.pyramidiTarkkaKerros;
  if (!tarkka?.isConnected) return null;
  /*
   * PAIKKA ON TARKAN LAATTATASON JÄLKEEN. Silloin varjo on laattojen
   * päällä (omistajan päätös) mutta viivatason ja nostojen ALLA:
   * mustetta ei tummenneta rinteen mukaan, tai nimiö näyttäisi eri
   * paksuiselta vuorella ja tasangolla.
   */
  ui.korkeusKerros = el('g', { class: 'korkeus-kerros' });
  tarkka.after(ui.korkeusKerros);
  return ui.korkeusKerros;
}

/** Vanha kuva pois ja sen object-URL vapaaksi. */
function tyhjennaKuva(ui) {
  if (ui.korkeusKuva) {
    const vanha = ui.korkeusKuva.getAttribute('href');
    ui.korkeusKuva.remove();
    ui.korkeusKuva = null;
    if (vanha?.startsWith('blob:')) URL.revokeObjectURL(vanha);
  }
}

/**
 * Valmis varjokuva lautakoordinaatteihin.
 *
 * Kuva vaihdetaan vasta kun uusi on LADATTU: <image>-elementin href
 * vaihtuu tyhjäksi hetkeksi, jos vanha poistetaan ensin, ja se näkyy
 * välähdyksenä. Sama sääntö kuin laattapyramidin tasonvaihdolla.
 */
function naytaKuva(ui, alue, kuva, leveys, korkeus) {
  const kerros = varmistaKerros(ui);
  if (!kerros) return;
  const canvas = document.createElement('canvas');
  canvas.width = leveys;
  canvas.height = korkeus;
  canvas.getContext('2d').putImageData(new ImageData(kuva, leveys, korkeus), 0, 0);
  canvas.toBlob((blob) => {
    if (!blob || ui.dead || !kerros.isConnected) return;
    /*
     * VANHA TALTEEN ENNEN UUTTA. Ensimmäinen versio poisti "vanhan"
     * kuvan uuden load-tapahtumassa lukemalla sen `ui`-oliosta — ja
     * koska sama kenttä oli jo ehditty asettaa uudeksi, se poisti ja
     * vapautti juuri saapuneen kuvan itsensä. Kuva oli puussa
     * hetken ja katosi näkymättömiin: DOMissa oli <image>, jonka
     * osoite ei enää osoittanut mihinkään.
     */
    const vanha = ui.korkeusKuva;
    const url = URL.createObjectURL(blob);
    const uusi = el('image', {
      x: alue.x,
      y: alue.y,
      width: alue.w,
      height: alue.h,
      href: url,
      preserveAspectRatio: 'none',
      class: 'korkeus-varjo',
    }, kerros);
    ui.korkeusKuva = uusi;
    const poistaVanha = () => {
      if (!vanha) return;
      const osoite = vanha.getAttribute('href');
      vanha.remove();
      if (osoite?.startsWith('blob:')) URL.revokeObjectURL(osoite);
    };
    uusi.addEventListener('load', poistaVanha, { once: true });
    // Jos load ei tule lainkaan, vanha ei saa jäädä uuden alle
    // ikuisesti: sekunti on paljon enemmän kuin blob-kuvan purku vie.
    setTimeout(poistaVanha, 1000);
  }, 'image/png');
}

/* ---------------------------------------------------------- päivitys */

/**
 * Kerroksen päivitys. Kutsutaan js/laattapyramidi.js:stä kerran
 * jokaisesta asettuneesta näkymästä.
 *
 * @param {object} ui pelin UI-olio
 * @param {{z: number, pikseliaPerYksikko: number}} taso valittu laattataso
 * @param {{x: number, y: number, w: number, h: number, skaala?: number}} nakyva
 */
export function paivitaKorkeuskerros(ui, taso, nakyva) {
  const halutaan = kehittajaTilaPaalla() && tarkkaVarjoPaalla();
  varjoMittarit.paalla = halutaan;
  varjoMittarit.taso = taso?.z ?? null;
  if (!halutaan || !nakyva?.w || taso.z <= SYVIN_HILJAINEN_TASO) {
    // Kytkin pois tai liian kaukaa: kerros tyhjenee HETI. Vanha varjo
    // väärässä mittakaavassa olisi pahempi kuin ei varjoa lainkaan.
    // Muisti nollataan aina, jottei kytkimen takaisin kääntäminen
    // törmää samaan avaimeen ja jää piirtämättä.
    nollaaKorkeuskerros(ui);
    return;
  }
  if (!varmistaWorker()) return;

  const alue = {
    x: nakyva.x - nakyva.w * REUNUS,
    y: nakyva.y - nakyva.h * REUNUS,
    w: nakyva.w * (1 + 2 * REUNUS),
    h: nakyva.h * (1 + 2 * REUNUS),
  };
  const dpr = globalThis.devicePixelRatio || 1;
  const tarve = Math.min((nakyva.skaala ?? 1) * dpr, taso.pikseliaPerYksikko);
  const katto = Math.sqrt(PIKSELIKATTO / (alue.w * alue.h));
  const tiheys = Math.min(tarve, katto);
  const leveys = Math.max(1, Math.round(alue.w * tiheys));
  const korkeus = Math.max(1, Math.round(alue.h * tiheys));

  /*
   * SAMAA NÄKYMÄÄ EI LASKETA KAHDESTI. paivitaPyramidi ajetaan myös
   * silloin kun laatta saapuu tai luettelo latautuu, eikä näkymä ole
   * silloin muuttunut. Avain on kuvan koko ja sijainti kolmen desimaalin
   * tarkkuudella — sitä hienompi ero ei näy pikselissä.
   */
  const avain = `${leveys}x${korkeus}@${alue.x.toFixed(3)},${alue.y.toFixed(3)}`;
  if (avain === edellinenAvain) return;
  edellinenAvain = avain;

  /*
   * Yksi lasku kerrallaan. Jos näkymä ehtii vaihtua kesken laskun,
   * uusi pyyntö odottaa vuoroaan — worker ei ole jono vaan yksi säie,
   * ja peräkkäiset panoroinnit tekisivät siitä kymmenen kuvan velan.
   */
  if (kesken > 0) { edellinenAvain = null; return; }

  const lonAlku = lautaLon(alue.x);
  const lonLoppu = lautaLon(alue.x + alue.w);
  const latYla = lautaLat(alue.y);
  const latAla = lautaLat(alue.y + alue.h);

  // Rivin ja sarakkeen asteet lasketaan KERRAN: Millerin lieriössä
  // kuvarivi on tasan yksi leveyspiiri ja sarake tasan yksi pituuspiiri,
  // joten sama luku kelpaa koko riville.
  const lonit = new Float64Array(leveys);
  for (let x = 0; x < leveys; x += 1) {
    lonit[x] = lautaLon(alue.x + (x + 0.5) / tiheys);
  }
  const latit = new Float64Array(korkeus);
  for (let y = 0; y < korkeus; y += 1) {
    latit[y] = lautaLat(alue.y + (y + 0.5) / tiheys);
  }

  const id = seuraavaId;
  seuraavaId += 1;
  kesken += 1;
  const alkoi = performance.now();
  odottavat.set(id, (vastaus) => {
    if (!vastaus || ui.dead) return;
    varjoMittarit.laskuMs = Math.round(performance.now() - alkoi);
    varjoMittarit.leveys = leveys;
    varjoMittarit.korkeus = korkeus;
    varjoMittarit.paivityksia += 1;
    // Kytkin on voinut kääntyä laskun aikana.
    if (!kehittajaTilaPaalla() || !tarkkaVarjoPaalla()) return;
    naytaKuva(ui, alue, vastaus.kuva, leveys, korkeus);
  });

  const nimet = tarvittavatPalat(lonAlku, lonLoppu, latAla, latYla);
  Promise.all(nimet.map(laheta)).then(() => {
    if (!worker) { odottavat.delete(id); kesken -= 1; return; }
    worker.postMessage({
      tyyppi: 'varjo', id, leveys, korkeus, lonit, latit,
    }, [lonit.buffer, latit.buffer]);
  });
}

/** Kerros pois: laudan vaihto, pelin loppu tai kytkin pois. */
export function nollaaKorkeuskerros(ui) {
  edellinenAvain = null;
  if (!ui) return;
  tyhjennaKuva(ui);
  if (ui.korkeusKerros) {
    ui.korkeusKerros.remove();
    ui.korkeusKerros = null;
  }
  varjoMittarit.leveys = 0;
  varjoMittarit.korkeus = 0;
}
