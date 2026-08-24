/*
 * FOKUSNÄKYMÄN DYNAAMISET MITAT — mittajana, maan kartuutsi, sen päältä
 * nouseva maataulu ja kartan reunojen asteviivaimet.
 *
 * Omistajan tilaus 25.8.2026 (Raamatun osio "JATKUVA KARTTA JA
 * DYNAAMISET MITAT"): fokuskartasta JATKUVA pinta ja mittataulukoista
 * DYNAAMISET. Aiemmin kehys, KREIKKA-kartuutsi ja "200 km" -mittajana
 * oli POLTETTU esirenderöityyn kuvaan (tools/fokuskartta/piirto.js
 * osio 9). Kaksi vikaa seurasi siitä:
 *
 *   1. Mittajana valehteli heti kun pelaaja zoomasi. Kuvaan poltettu
 *      jana on kiinni KUVASSA, joten se venyi zoomin mukana ja väitti
 *      yhä samaa 200 kilometriä. Mittakaava on kuitenkin ruudun
 *      ominaisuus, ei kuvan.
 *   2. Kehys ja kartuutsi tekivät kuvasta "sivun" keskelle lautaa.
 *      Jatkuvassa pinnassa maasto ja meri jatkuvat reunan yli, eikä
 *      mikään saa piirtää siihen suorakaidetta.
 *
 * Siksi molemmat piirtää nyt PELI, RUUTUUN ANKKUROITUINA. Ne eivät
 * skaalaudu kartan mukana, ne pysyvät luettavina joka zoomilla, ja
 * mittajana laskee pituutensa siitä, mitä ruudulla oikeasti näkyy.
 *
 * === MIKSI HTML EIKÄ SVG-LAUTA ===
 *
 * Elementit ovat tavallisia HTML-elementtejä kartan päällä (.map-pane),
 * eivät <text>-elementtejä SVG-laudalla, kolmesta syystä:
 *
 *   RUUTUANKKUROINTI. Laudalla mitat ovat laudan yksiköitä, jotka
 *   skaalautuvat ja panoroituvat kartan mukana — juuri se, mitä tässä
 *   EI haluta. Ruutuun ankkuroitu nurkka pysyy nurkassa.
 *
 *   TYPOGRAFIA JA MEDIAKYSELYT. Pienellä ruudulla kartuutsi ja jana
 *   saavat olla pienempiä ja pinottuja; CSS tekee sen yhdellä
 *   mediakyselyllä. SVG:ssä sama olisi käsin laskettua fontskaalausta.
 *
 *   SAMA RATKAISU KUIN MAAKYLTILLÄ. Kartan maapilleri (ui.js
 *   paivitaMaaPilleri) on jo tehty näin ja samasta syystä: *"HTML-nappi
 *   ei skaalaudu zoomissa, ei liiku panoroinnissa eikä voi peittää
 *   kaupunkia tai nappulaa"*.
 *
 * Suodattimia ei käytetä (tests/rules.test.mjs iOS-sääntö), eikä näissä
 * ole niille tarvetta.
 *
 * === MAAKYLTTI VÄISTYY ===
 *
 * Kartuutsi korvaa oikean yläkulman maapillerin fokusnäkymässä
 * (omistaja 25.8.2026). Piilotus on CSS:ssä `body.fokuspohja
 * .maa-pilleri`, eli täsmälleen silloin kun kartuutsi on näkyvissä —
 * fokusmoodin ulkopuolella vanha kyltti jää ennalleen.
 */
import { asetaKuva } from './media.js';
import { lippuUrl, lippuVara } from './packs/africa-valokuvat.js';
import { FOKUS_LAUTAPROJEKTIOT, FOKUS_MAANIMET, FOKUS_POHJAT } from './packs/fokus-grc.js';
import { MAATIEDOT } from './sisaltotaulut.js';

/* ------------------------------------------------------- mittakaava */

const RAD = Math.PI / 180;

/*
 * Pituusasteen pituus PÄIVÄNTASAAJALLA kilometreinä. Sama vakio kuin
 * kohdekarttojen mittakaavajanalla (js/packs/maakartat.js: 111 320 m),
 * jotta kaksi janaa samasta pelistä ei anna eri lukua.
 */
const KM_PITUUSASTEELLA = 111.32;

/*
 * Janan sallitut pituudet kilometreinä.
 *
 * SARJA ON SAMA KUIN PELIN OMILLA KOHDEKARTOILLA (js/packs/maakartat.js
 * JANAN_PITUUDET, tests/mittakaava.test.mjs): 1 – 2 – 2,5 – 5 joka
 * kymmenluvulla. "327 km" olisi tarkempi mutta ei mittakaavajana.
 *
 * VÄLIASKEL 2,5 ON RATKAISEVA, ei koristetta. Pelkällä 1–2–5-sarjalla
 * peräkkäisten lukujen suhde on kaksi, ja koska omistajan tavoitehaarukka
 * 15–25 % on kapeampi (suhde 1,67), sarja voi hypätä sen yli:
 * fokusikkunassa 200 km on 12,5 % ruudusta ja 500 km jo 31 %. 250 km
 * osuu haarukkaan. Alapää (0,5–5 km) on lähintä zoomiporrasta varten.
 */
const PITUUDET = [
  0.5, 1, 2, 2.5, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000,
];

/*
 * Tavoiteosuus ruudun leveydestä ja sallittu haarukka (omistaja:
 * ~15–25 % ruudun leveydestä). Tavoite on haarukan keskikohta, ja
 * haarukka on kova ehto: sen sisältä valitaan tavoitetta lähin luku, ja
 * vain jos yksikään sarjan luku ei mahdu haarukkaan, otetaan koko
 * sarjan lähin. Ilman tätä kaksivaiheista valintaa lähin luku voi olla
 * haarukan ulkopuolella, vaikka haarukassa olisi kelvollinen —
 * mitattu: 200 km (12,5 %) voitti 250 km:n (15,3 %), koska tavoite oli
 * 327 km.
 */
const TAVOITE_OSUUS = 0.2;
const OSUUS_MIN = 0.15;
const OSUUS_MAX = 0.25;

/**
 * Laudan projektio numeroina: montako lautayksikköä yksi PITUUSASTE on,
 * ja mikä leveysaste on laudan y-koordinaatilla.
 *
 * KAAVA ON SAMA KUIN KUVAN RENDERÖINNISSÄ (tools/fokuskartta/piirto.js
 * laudanProjektio). Se on tässä toistettuna eikä tuotuna, koska
 * työkalut ovat Node-puolella eikä peli lataa niitä — mutta juuri
 * siksi tämän on pysyttävä identtisenä: eri kaava antaisi eri
 * kilometrit kuin se kuva, jonka päällä jana piirretään.
 *
 * MILLERIN LIERIÖSSÄ pituusaste on lineaarinen (koko kierros on laudan
 * leveys), mutta leveysaste ei — siksi lat lasketaan käänteiskaavalla.
 * Tasavälisessä projektiossa molemmat ovat suoria kertoimia.
 */
function projektionKaavat(p) {
  if (!p) return null;
  if (p.tyyppi === 'miller') {
    const skaala = p.leveys / (2 * Math.PI);
    const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
    const yPohjoinen = millerY(p.pohjoinen);
    const kierros = 2 * Math.PI;
    return {
      // Koko kierros mahtuu laudan leveyteen, joten aste on leveys/360.
      yksikkoaAsteessa: p.leveys / 360,
      lat: (y) => {
        const my = y / skaala + yPohjoinen;
        return (Math.atan(Math.exp(-my / 1.25)) - Math.PI / 4) / 0.4 / RAD;
      },
      lon: (x) => p.lon0 + (x / skaala) / RAD,
      x: (lon) => {
        const d = (lon - p.lon0) * RAD;
        return (((d % kierros) + kierros) % kierros) * skaala;
      },
      y: (lat) => (millerY(lat) - yPohjoinen) * skaala,
    };
  }
  return {
    yksikkoaAsteessa: Math.abs(p.lonA),
    lat: (y) => (y - p.latB) / p.latA,
    lon: (x) => (x - p.lonB) / p.lonA,
    x: (lon) => p.lonA * lon + p.lonB,
    y: (lat) => p.latA * lat + p.latB,
  };
}

/**
 * Mittajanan luvut nykyiselle näkymälle.
 *
 * Palauttaa { km, pikselia, teksti } tai null, jos näkymää ei saada
 * mitattua (lauta ei ole ruudulla, projektio tuntematon).
 *
 * KAAVA KOKONAISUUDESSAAN:
 *
 *   1. Leveysaste luetaan NÄKYVÄN ALUEEN KESKIKOHDASTA laudan
 *      käänteiskaavalla. Millerin lieriössä kilometri on eri määrä
 *      lautayksikköjä Kreetalla ja Thessalonikissa, ja sama jana
 *      valehtelisi molemmissa päissä, jos leveysaste kiinnitettäisiin.
 *   2. km yhtä lautayksikköä kohti = 111,32 · cos(lat) / (yksikköä
 *      pituusasteessa). Osoittaja on leveyspiirin pituus asteessa,
 *      nimittäjä laudan oma mittakaava.
 *   3. km yhtä RUUTUPIKSELIÄ kohti = edellinen / näkymän skaala, jossa
 *      skaala on ruutupikseleitä lautayksikköä kohti (ui.nakyvaAlue).
 *   4. Tavoitepituus = 20 % karttaruudun leveydestä kilometreiksi, ja
 *      siitä valitaan sarjan lähin pyöreä luku.
 */
export function laskeMittajana(ui) {
  const nakyva = ui.nakyvaAlue?.();
  if (!nakyva || !(nakyva.skaala > 0)) return null;
  const lauta = ui.game?.pack?.id;
  const kaavat = projektionKaavat(FOKUS_LAUTAPROJEKTIOT[lauta]);
  if (!kaavat) return null;
  const lat = kaavat.lat(nakyva.y + nakyva.h / 2);
  if (!Number.isFinite(lat) || Math.abs(lat) > 89) return null;
  const kmYksikossa = (KM_PITUUSASTEELLA * Math.cos(lat * RAD)) / kaavat.yksikkoaAsteessa;
  const kmPikselissa = kmYksikossa / nakyva.skaala;
  if (!(kmPikselissa > 0)) return null;
  const ruutuLeveys = ui.mapPane?.getBoundingClientRect().width ?? 0;
  if (!(ruutuLeveys > 0)) return null;

  const tavoiteKm = ruutuLeveys * TAVOITE_OSUUS * kmPikselissa;
  // Ensin haarukkaan mahtuvat, sitten koko sarja (ks. TAVOITE_OSUUS).
  const osuus = (km) => km / kmPikselissa / ruutuLeveys;
  const haarukassa = PITUUDET.filter(
    (km) => osuus(km) >= OSUUS_MIN && osuus(km) <= OSUUS_MAX,
  );
  const ehdokkaat = haarukassa.length ? haarukassa : PITUUDET;
  let paras = ehdokkaat[0];
  for (const km of ehdokkaat) {
    if (Math.abs(km / tavoiteKm - 1) < Math.abs(paras / tavoiteKm - 1)) paras = km;
  }
  return {
    km: paras,
    pikselia: paras / kmPikselissa,
    // Suomi käyttää desimaalipilkkua; sarjan alapää on ainoa murtoluku.
    teksti: `${String(paras).replace('.', ',')} km`,
  };
}

/* ---------------------------------------------------- maan faktarivit */

/*
 * PERUSTIEDOT TULEVAT MAALEHDEN OMASTA LÄHTEESTÄ — YKSI TOTUUS.
 *
 * Omistajan tarkennus 25.8.2026: *"kaikki luvut löytyvät jo
 * maalehdestä — älä hae mitään Wikipediasta äläkä luo uutta
 * datalähdettä"*. Maalehti lukee ne MAATIEDOT-taulusta
 * (js/maalehti.js naytaMaaTunnusluvut: `MAATIEDOT[pack.id][iso]`), ja
 * tämä taulu lukee TÄSMÄLLEEN samasta paikasta samalla avaimella.
 * Uusi maa ei siis vaadi tältä moduulilta riviäkään: kun maalehti
 * tuntee maan luvut, taulu tuntee ne samalla hetkellä.
 *
 * Rivit ovat myös samat ja samassa järjestyksessä kuin maalehden
 * tunnuslukurivi — väkiluku, pinta-ala, demokratia, keskitulo — ja
 * perässä kielet, jotka lehti näyttää tervehdyksinä. Sija (suluissa
 * lehdessä) kulkee arvon perässä samoin kuin siellä.
 */

/** Maan nimi laudan omasta taulusta, versaaleina kartuutsiin. */
function maanNimi(ui, iso) {
  return ui.game?.pack?.map?.countryShapes?.[iso]?.nimi ?? iso;
}

/**
 * Maataulun rivit: [otsikko, arvo, sija]. Puuttuva tieto jää kokonaan
 * pois — tyhjä rivi näyttäisi rikkinäiseltä, ja kaikilla mailla ei ole
 * kaikkia lukuja.
 */
function maanRivit(ui, iso) {
  const tiedot = (MAATIEDOT[ui.game?.pack?.id] ?? {})[iso] ?? {};
  const rivit = [];
  if (tiedot.vakiluku) rivit.push(['Väkiluku', tiedot.vakiluku, tiedot.vakilukuSija ?? '']);
  if (tiedot.pintaAla) rivit.push(['Pinta-ala', tiedot.pintaAla, tiedot.pintaAlaSija ?? '']);
  if (tiedot.demokratia?.arvo) {
    rivit.push(['Demokratia', `${tiedot.demokratia.arvo} · V-Dem`, tiedot.demokratia.sija ?? '']);
  }
  if (tiedot.keskitulo?.arvo) {
    rivit.push(['Keskitulo', tiedot.keskitulo.arvo, tiedot.keskitulo.sija ?? '']);
  }
  return rivit;
}

/**
 * Kielirivin sisältö: tervehdys, lippu ja kielen nimi — SAMASTA
 * DATASTA JA SAMOILLA KUVILLA kuin maalehdessä (omistaja 25.8.2026).
 *
 * Maalehti latoo tervehdykset täsmälleen näin (js/maalehti.js
 * naytaMaaTunnusluvut): `.tervehdys`-kääre, `.tervehdys-teksti`
 * dir="auto" -eristyksellä ja lippu samoilla osoitteilla
 * (lippuUrl/lippuVara, 40 px). Luokat ovat samat, joten ulkoasukin on
 * — ei omaa tyyliä eikä omaa lippulähdettä.
 *
 * LIPPU SAA PUUTTUA. Maalehden sääntö pätee tässäkin: vähemmistökielen
 * merkitseminen naapurivaltion lipulla liittäisi puhujat toiseen
 * maahan, joten `lippu`-kenttä on tarkoituksella joskus tyhjä.
 */
function kieliOsat(ui, iso) {
  const tiedot = (MAATIEDOT[ui.game?.pack?.id] ?? {})[iso] ?? {};
  return (tiedot.tervehdykset ?? []).map((t) => {
    const osa = luo('span', 'tervehdys');
    osa.title = `"Hyvää päivää" — ${t.kieli}${t.osuus ? `, noin ${t.osuus} puhuu` : ''}`;
    const teksti = luo('span', 'tervehdys-teksti', t.teksti);
    teksti.dir = 'auto';
    osa.appendChild(teksti);
    if (t.lippu) {
      const lippu = document.createElement('img');
      lippu.alt = t.kieli;
      lippu.className = 'tervehdys-lippu';
      asetaKuva(lippu, lippuUrl(t.lippu, 40), lippuVara(t.lippu, 40), () => lippu.remove());
      osa.appendChild(lippu);
    }
    // Suluissa oleva tarkenne ("turkki (Länsi-Traakia)") on lehden
    // asia; ahtaassa taulussa riittää kielen nimi.
    osa.appendChild(luo('span', 'maa-sija tervehdys-osuus',
      t.kieli.replace(/\s*\(.*\)$/, '')));
    return osa;
  });
}

/* ------------------------------------------------------- elementit */

const luo = (tagi, luokka, teksti) => {
  const e = document.createElement(tagi);
  if (luokka) e.className = luokka;
  if (teksti != null) e.textContent = teksti;
  return e;
};

/**
 * Rakentaa elementit kerran ja panee ne karttaruutuun.
 *
 * Säiliö on yksi ja se on ruudun alalaidan levyinen: kartuutsi
 * vasempaan alanurkkaan ja mittajana oikeaan. Pieni Liiku-neliö
 * asettuu kartuutsin RINNALLE (css: .toimintorivi-perus saa
 * vasemmalle pehmusteen `--fokus-nappipaikka`, joka lasketaan
 * kartuutsin mitatusta leveydestä — ks. paivitaNappipaikka).
 * Säiliö ei ota napautuksia vastaan (pointer-events: none), joten
 * kartta ja alanapit toimivat sen läpi; vain kartuutsi ja maataulu
 * ovat napautettavia.
 */
function rakenna(ui) {
  // Varmistus kaksoiskappaleita vastaan, kuten maapillerillä.
  for (const vanha of ui.mapPane.querySelectorAll(
    '.fokusmitat, .fokus-maataulu, .fokus-viivaimet',
  )) {
    vanha.remove();
  }

  const sailio = luo('div', 'fokusmitat');
  sailio.hidden = true;

  /*
   * KARTUUTSI: suomenkielinen nimi, viiva ja sen alla MAAN OMA NIMI
   * (omistaja 25.8.2026). Kuvaan poltetussa kartuutsissa alarivi oli
   * "isoisän matkakirjan mukaan · 1873"; se jäi kokonaan pois, koska
   * taulun luvut ovat tämän päivän lukuja (ks. rakennaMaataulu).
   *
   * Aikakauden valtiomuoto ("kuningaskunta v. 1873") ladotaan samalle
   * riville pienenä kursiivina. Rivi ei katkea (nowrap): jos jonkin
   * maan yhdistelmä ei mahtuisi kapealle ruudulle, kentän saa jättää
   * pois taulusta (js/packs/fokus-grc.js) — sitä ei typistetä tässä.
   */
  const kartuutsi = luo('button', 'fokus-kartuutsi');
  kartuutsi.type = 'button';
  kartuutsi.appendChild(luo('span', 'fokus-kartuutsi-nimi', ''));
  kartuutsi.appendChild(luo('span', 'fokus-kartuutsi-viiva'));
  const alarivi = luo('span', 'fokus-kartuutsi-alarivi');
  alarivi.appendChild(luo('span', 'fokus-kartuutsi-paikallinen', ''));
  alarivi.appendChild(luo('span', 'fokus-kartuutsi-aika', ''));
  kartuutsi.appendChild(alarivi);
  kartuutsi.addEventListener('click', (e) => {
    e.stopPropagation();
    avaaMaataulu(ui, !ui.fokusMaatauluAuki);
  });
  sailio.appendChild(kartuutsi);

  /* --- mittajana: vuorottelevat lohkot ja kaksi lukemaa ------------ */
  const jana = luo('div', 'fokus-jana');
  jana.setAttribute('aria-hidden', 'true');
  const palkki = luo('div', 'fokus-jana-palkki');
  for (let i = 0; i < 4; i++) palkki.appendChild(luo('span', 'fokus-jana-lohko'));
  jana.appendChild(palkki);
  const luvut = luo('div', 'fokus-jana-luvut');
  luvut.appendChild(luo('span', 'fokus-jana-nolla', '0'));
  luvut.appendChild(luo('span', 'fokus-jana-maksimi', ''));
  jana.appendChild(luvut);
  sailio.appendChild(jana);

  ui.mapPane.appendChild(sailio);
  ui.fokusmitatSailio = sailio;
  ui.fokusKartuutsi = kartuutsi;
  ui.fokusJana = jana;
  ui.fokusMaataulu = rakennaMaataulu(ui);
  ui.fokusViivaimet = rakennaViivaimet(ui);
  return sailio;
}

/*
 * MAATAULU: KARTUUTSIN YLÄPUOLELLE nouseva, läpikuultava taulu maan
 * perustiedoista (omistaja 25.8.2026, viimeistely pelitestissä
 * 26.8.2026).
 *
 * VIISI SÄÄNTÖÄ:
 *
 * 1. TAULU NOUSEE KARTUUTSIN KOHDALTA, EI KOKO RUUDUN LEVYISENÄ
 *    ALALEVYNÄ (omistajan pelitestitilaus). Se on ankkuroitu samaan
 *    vasempaan laitaan kuin kartuutsi ja alkaa heti sen yläpuolelta —
 *    kartuutsi jää näkyviin taulun alle, ja juuri siksi taulussa EI OLE
 *    OTSIKKOA: maan nimi lukee jo kartuutsissa.
 * 2. TAULU EI PEITÄ ALANAPPEJA. Sen alareuna on alanappirivin
 *    yläpuolella (CSS `bottom`), joten Liiku on käytössä koko ajan.
 * 3. SULKUNAPPIA EI OLE. Taulu sulkeutuu napauttamalla karttaa, samaa
 *    kartuutsia uudelleen tai Escistä — ristin paikka meni taulun
 *    ainoalle kalusteelle, plussalle.
 * 4. VIERITYS EI PANOROI KARTTAA. Taulu asuu karttaruudun sisällä,
 *    jonka oma kuuntelija ottaisi sormen panoroinniksi. Elementti
 *    pysäyttää osoitin-, kosketus- ja rullaustapahtumat itseensä ja
 *    sallii pystyvierityksen (`touch-action: pan-y`). Jos
 *    js/kartta.js:ään tulee KELLUVA_UI-valitsinlista, tämän luokan
 *    nimi on `fokus-maataulu`.
 * 5. LIIKE ON TRANSFORM JA OPACITY, EI SUODATIN. Sama iOS-sääntö kuin
 *    kartan kerroksilla; lisäksi prefers-reduced-motion sammuttaa
 *    siirtymän ja plussan sykkeen kokonaan (CSS).
 */
function rakennaMaataulu(ui) {
  const taulu = luo('div', 'fokus-maataulu');
  taulu.setAttribute('role', 'dialog');
  taulu.setAttribute('aria-label', 'Maan perustiedot');
  // Suljettuna taulu on olemassa mutta ei tavoitettavissa: hidden
  // katkaisisi siirtymän, inert pitää sen pois kohdistusjärjestyksestä.
  taulu.inert = true;

  /*
   * PLUS OIKEAAN YLÄREUNAAN. Se on taulun ainoa nappi ja samalla ainoa
   * kutsu eteenpäin (maan lehteen), joten se saa kevyen sykkeen —
   * transform ja opacity, ei suodatinta eikä varjoanimaatiota.
   */
  const lehti = luo('button', 'fokus-maataulu-lehti', '+');
  lehti.type = 'button';
  lehti.title = 'Avaa maan lehti';
  lehti.addEventListener('click', (e) => {
    e.stopPropagation();
    const iso = ui.fokusMaatauluIso;
    avaaMaataulu(ui, false);
    if (iso) ui.avaaMaalehti?.(iso);
  });
  taulu.appendChild(lehti);

  taulu.appendChild(luo('dl', 'fokus-maataulu-rivit'));
  /*
   * "ISOISÄN MATKAKIRJAN MUKAAN · 1873" EI OLE MISSÄÄN (omistajan
   * linjaus 25.8.2026). Se oli kuvaan poltetun kartuutsin alarivi, ja
   * sitä ehdittiin siirtää ensin kartuutsiin ja sitten tähän tauluun —
   * kunnes periaate täsmentyi: KARTTA ON SISÄLLÖLTÄÄN NYKYAIKAINEN,
   * vaikka tyyliltään aikakauden mukainen. Luvut ovat tämän päivän
   * lukuja, eikä niiden päälle saa luvata 1873:n päiväkirjaa.
   *
   * Aikakausi jää siihen, mikä on aikakautta oikeastikin: maan oma
   * nimi 1873-atlaksen asussa (ΕΛΛΑΣ) ja pieni valtiomuotolisä
   * kartuutsissa.
   */
  // Sama lähdemaininta kuin maalehdessä: luvut ovat MAATIEDOT-taulusta.
  taulu.appendChild(luo('p', 'fokus-maataulu-lahde',
    'Samat luvut kuin maan lehdessä · Maailmanpankki ja V-Dem'));

  // Ele jää tauluun eikä valu kartalle (ks. sääntö 2 yllä).
  for (const tapahtuma of ['pointerdown', 'touchstart', 'wheel']) {
    taulu.addEventListener(tapahtuma, (e) => e.stopPropagation(), { passive: true });
  }
  ui.mapPane.appendChild(taulu);
  return taulu;
}

/** Avaa tai sulkee maataulun ja hoitaa sen kuuntelijat. */
export function avaaMaataulu(ui, auki) {
  const taulu = ui.fokusMaataulu;
  if (!taulu) return;
  if (Boolean(ui.fokusMaatauluAuki) === Boolean(auki)) return;
  ui.fokusMaatauluAuki = Boolean(auki);
  taulu.classList.toggle('auki', ui.fokusMaatauluAuki);
  taulu.inert = !ui.fokusMaatauluAuki;
  ui.fokusKartuutsi?.setAttribute('aria-expanded', String(ui.fokusMaatauluAuki));
  /*
   * KARTUUTSI JÄÄ NÄKYVIIN TAULUN ALLE (omistajan pelitestitilaus
   * 26.8.2026). Ennen koko mittasäiliö häivytettiin taulun tieltä
   * (.taulun-alla), koska taulu oli ruudun levyinen alalevy ja peitti
   * molemmat. Nyt taulu nousee kartuutsin kohdalta sen YLÄPUOLELLE ja
   * on itse taulun otsikko: jos kartuutsi katoaisi, tauluun jäisi
   * kertomatta minkä maan luvut siinä ovat. Mittajana on ruudun
   * toisessa laidassa eikä taulu yllä sinne.
   */

  if (ui.fokusMaatauluKuuntelijat) {
    for (const [kohde, laji, kasittele] of ui.fokusMaatauluKuuntelijat) {
      kohde.removeEventListener(laji, kasittele, true);
    }
    ui.fokusMaatauluKuuntelijat = null;
  }
  if (!ui.fokusMaatauluAuki) return;

  /*
   * Sulkeminen: Esc tai napautus taulun ULKOPUOLELLE. Kuuntelijat ovat
   * kaappausvaiheessa, jotta ne ehtivät ennen kartan omaa eleen
   * käsittelyä — muuten kartta ehtisi aloittaa panoroinnin ja taulu
   * sulkeutuisi vasta sormen noustessa.
   */
  const nappain = (e) => { if (e.key === 'Escape') avaaMaataulu(ui, false); };
  const ulkona = (e) => {
    if (taulu.contains(e.target) || ui.fokusKartuutsi?.contains(e.target)) return;
    avaaMaataulu(ui, false);
  };
  document.addEventListener('keydown', nappain, true);
  document.addEventListener('pointerdown', ulkona, true);
  ui.fokusMaatauluKuuntelijat = [
    [document, 'keydown', nappain],
    [document, 'pointerdown', ulkona],
  ];
}

/** Maataulun sisältö nykyiselle maalle. */
function taytaMaataulu(ui, iso) {
  const taulu = ui.fokusMaataulu;
  if (!taulu) return;
  ui.fokusMaatauluIso = iso;
  const nimi = maanNimi(ui, iso);
  /*
   * NIMI ON ARIASSA, EI OTSIKKOSOLMUSSA. Näkyvä otsikko poistui
   * (kartuutsi on taulun alla ja kertoo maan), mutta ruudunlukijalle
   * dialogi ei saa jäädä nimettömäksi — se saa nimensä tästä.
   */
  taulu.setAttribute('aria-label', `${nimi}: maan perustiedot`);
  taulu.querySelector('.fokus-maataulu-lehti')
    .setAttribute('aria-label', `Avaa ${nimi}-lehti`);
  const lista = taulu.querySelector('.fokus-maataulu-rivit');
  lista.textContent = '';
  for (const [otsikko, arvo, lisa] of maanRivit(ui, iso)) {
    lista.appendChild(luo('dt', 'fokus-maataulu-otsikko', otsikko));
    const dd = luo('dd', 'fokus-maataulu-arvo', arvo);
    if (lisa) dd.appendChild(luo('span', 'fokus-maataulu-sija', lisa));
    lista.appendChild(dd);
  }
  /*
   * KIELET LIPPUINEEN viimeisenä rivinä (omistaja 25.8.2026). Rivi on
   * lukujen jälkeen, koska se on leveä ja saa kietoutua usealle
   * riville — lukurivien sarakejako pysyy silloin siistinä.
   */
  const kielet = kieliOsat(ui, iso);
  if (kielet.length) {
    lista.appendChild(luo('dt', 'fokus-maataulu-otsikko', 'Kielet'));
    const dd = luo('dd', 'fokus-maataulu-arvo fokus-maataulu-kielet');
    for (const osa of kielet) dd.appendChild(osa);
    lista.appendChild(dd);
  }
}

/* ---------------------------------------------------- asteviivaimet */

/*
 * KARTAN REUNAVIIVAIMET (omistajan pelitestitilaus 26.8.2026:
 * *"dynaamiset asteviivaimet ruudun reunoihin ... laskettuna näkyvästä
 * alueesta samalla projektiokaavalla kuin mittajana"*).
 *
 * MIKSI REUNAAN EIKÄ RUUDUKKONA. 1873-atlaksessa asteverkko piirretään
 * lehden marginaaliin: lukemat kertovat, missä ollaan, mutta viivasto ei
 * sotke maastoa. Sama pätee tässä kahdesti — pinta on JATKUVA (ei
 * lehteä, ei marginaalia), joten viivaimet ovat ruudun reunassa, ja
 * kartan päällä on jo kaupunkien laatat, fokusvirran kortit ja
 * alanapit. Reunanauha on muutaman pikselin levyinen eikä siksi osu
 * mihinkään niistä.
 *
 * KAAVA ON SAMA KUIN MITTAJANALLA (FOKUS_LAUTAPROJEKTIOT,
 * projektionKaavat). Jos viivaimet käyttäisivät omaa kaavaansa, sama
 * ruutu väittäisi kahta eri leveysastetta.
 *
 * ASKEL VALITAAN RUUDULTA, EI ZOOMITASOSTA. Sarja on atlaksen oma
 * (30–20–10–5–2–1–½–¼–⅒ astetta), ja siitä otetaan TIHEIN, jonka väli
 * on ruudulla vielä vähintään VALIN_MIN pikseliä (ks. valitseAskel).
 * Sama kartta on eri kokoinen puhelimessa ja työpöydällä, joten pelkkä
 * mittakaava ei riittäisi: kapealla ruudulla lukemat menisivät
 * päällekkäin.
 */
const ASTEASKELEET = [30, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1];
const VALIN_MIN = 78;
/* Nurkka on kahden viivaimen risteys: pystyviivaimen ylin lukema
 * jätetään pois, jottei se osu vaakaviivaimen numeroriviin. */
const NURKKA_PX = 30;

/**
 * PIENIN askel, jonka väli on ruudulla vielä luettava.
 *
 * SARJA ON LASKEVA, JOTEN `find` OLISI VÄÄRIN. Ensimmäinen ehdon
 * täyttävä on aina 30°, koska 30 asteen väli on leveämpi kuin mikään
 * muu — ja juuri niin kävi ensimmäisessä mittauksessa: Kreikan
 * ikkunassa (17°…31° ruudun leveydellä) viivaimeen jäi yksi ainoa
 * merkki. Oikea valinta on sarjan VIIMEINEN ehdon täyttävä eli tihein
 * väli, joka vielä mahtuu; jos yksikään ei mahdu (yleiskuva), otetaan
 * harvin.
 */
function valitseAskel(pxAsteessa) {
  const mahtuvat = ASTEASKELEET.filter((a) => a * pxAsteessa >= VALIN_MIN);
  return mahtuvat.length ? mahtuvat[mahtuvat.length - 1] : ASTEASKELEET[0];
}

/** Reunaviivainten säiliö: kaksi nauhaa, ylä ja vasen. */
function rakennaViivaimet(ui) {
  const sailio = luo('div', 'fokus-viivaimet');
  sailio.setAttribute('aria-hidden', 'true');
  sailio.hidden = true;
  sailio.appendChild(luo('div', 'fokus-viivain fokus-viivain-yla'));
  sailio.appendChild(luo('div', 'fokus-viivain fokus-viivain-vasen'));
  ui.mapPane.appendChild(sailio);
  return sailio;
}

/**
 * Laudan koordinaatti ruudun pikseleiksi karttaruudun sisällä.
 *
 * Miksi omat kaavat eikä ui.nakyvaAlue: nakyvaAlue kertoo NÄKYVÄN
 * laatikon laudan yksiköissä, mutta ei sitä, mihin kohtaan ruutua
 * laudan origo osuu. Kun lauta on ruutua kapeampi (loitonnettu
 * yleiskuva), sen vasen reuna ei ole ruudun vasen reuna, ja pelkällä
 * näkyvällä laatikolla laskettu piste heittäisi juuri sen verran.
 */
function ruutuKaavat(ui) {
  const pane = ui.mapPane;
  const svg = ui.svg;
  const vb = svg?.viewBox?.baseVal;
  if (!pane || !vb?.width) return null;
  const l = svg.getBoundingClientRect();
  const p = pane.getBoundingClientRect();
  const skaala = l.width / vb.width;
  if (!(skaala > 0) || !(p.width > 0)) return null;
  return {
    skaala,
    leveys: p.width,
    korkeus: p.height,
    px: (bx) => (l.left - p.left) + (bx - vb.x) * skaala,
    py: (by) => (l.top - p.top) + (by - vb.y) * skaala,
    // Käänteissuunta: ruudun reuna laudan yksiköiksi.
    lautaX: (sx) => vb.x + (sx - (l.left - p.left)) / skaala,
    lautaY: (sy) => vb.y + (sy - (l.top - p.top)) / skaala,
  };
}

/** Lukema atlaksen asussa: "22°", "37,5°" ja pallonpuolisko kirjaimena. */
function asteTeksti(arvo, [plus, miinus]) {
  const luku = Math.abs(Math.round(arvo * 1000) / 1000);
  const teksti = String(Number(luku.toFixed(3))).replace('.', ',');
  if (Math.abs(arvo) < 1e-9) return `${teksti}°`;
  return `${teksti}°${arvo > 0 ? plus : miinus}`;
}

/** Yksi viivainmerkki: viiva reunasta ja sen vieressä lukema. */
function viivainMerkki(nauha, paikka, teksti, pysty) {
  const merkki = luo('span', 'fokus-viivain-merkki');
  merkki.style[pysty ? 'top' : 'left'] = `${Math.round(paikka)}px`;
  merkki.appendChild(luo('i', 'fokus-viivain-viiva'));
  merkki.appendChild(luo('b', 'fokus-viivain-luku', teksti));
  nauha.appendChild(merkki);
}

/**
 * Piirtää viivaimet nykyiseen näkymään.
 *
 * Kutsutaan samasta paikasta kuin mittajana eli VASTA KUN NÄKYMÄ ON
 * ASETTUNUT — merkit eivät siis liiku panoroinnin aikana vaan
 * asettuvat kerran sen päätteeksi, kuten maastonimetkin.
 */
function paivitaViivaimet(ui) {
  const sailio = ui.fokusViivaimet;
  if (!sailio?.isConnected) return;
  const kaavat = projektionKaavat(FOKUS_LAUTAPROJEKTIOT[ui.game?.pack?.id]);
  const ruutu = ruutuKaavat(ui);
  const yla = sailio.querySelector('.fokus-viivain-yla');
  const vasen = sailio.querySelector('.fokus-viivain-vasen');
  yla.textContent = '';
  vasen.textContent = '';
  if (!kaavat || !ruutu) { sailio.hidden = true; return; }
  sailio.hidden = false;

  /* --- pituusasteet yläreunaan --- */
  const lonAlku = kaavat.lon(ruutu.lautaX(0));
  const lonLoppu = kaavat.lon(ruutu.lautaX(ruutu.leveys));
  const pxAsteessa = Math.abs(ruutu.leveys / (lonLoppu - lonAlku));
  if (Number.isFinite(pxAsteessa) && pxAsteessa > 0) {
    const askel = valitseAskel(pxAsteessa);
    const alku = Math.ceil(Math.min(lonAlku, lonLoppu) / askel) * askel;
    const loppu = Math.max(lonAlku, lonLoppu);
    for (let lon = alku; lon <= loppu + 1e-9; lon += askel) {
      const x = ruutu.px(kaavat.x(lon));
      if (x < 8 || x > ruutu.leveys - 8) continue;
      viivainMerkki(yla, x, asteTeksti(lon, ['I', 'L']), false);
    }
  }

  /* --- leveysasteet vasempaan reunaan --- */
  const latYla = kaavat.lat(ruutu.lautaY(0));
  const latAla = kaavat.lat(ruutu.lautaY(ruutu.korkeus));
  const pxLeveysasteessa = Math.abs(ruutu.korkeus / (latYla - latAla));
  if (Number.isFinite(pxLeveysasteessa) && pxLeveysasteessa > 0) {
    const askel = valitseAskel(pxLeveysasteessa);
    const alku = Math.ceil(Math.min(latYla, latAla) / askel) * askel;
    const loppu = Math.max(latYla, latAla);
    for (let lat = alku; lat <= loppu + 1e-9; lat += askel) {
      const y = ruutu.py(kaavat.y(lat));
      // Nurkka kuuluu yläviivaimelle, alanurkka kartuutsille.
      if (y < NURKKA_PX || y > ruutu.korkeus - 64) continue;
      viivainMerkki(vasen, y, asteTeksti(lat, ['P', 'E']), true);
    }
  }
}

/**
 * PIENEN LIIKU-NELIÖN PAIKKA KARTUUTSIN RINNALLA.
 *
 * Alanappirivi (js/ui.js piirraToimintorivi) on oma elementtinsä eikä
 * tiedä kartuutsista mitään, ja kartuutsin leveys riippuu maan nimestä
 * — "KREIKKA" ja "ΕΛΛΑΣ · Hellas · kuningaskunta v. 1873" latoutuvat
 * eri levyisiksi kuin minkä tahansa muun maan vastineet. Leveys siis
 * MITATAAN ja välitetään CSS-muuttujana; tyylitiedosto tekee siitä
 * rivin vasemman pehmusteen. Näin neliö asettuu kartuutsin viereen
 * ilman, että kummankaan mitat on kirjoitettu käsin.
 *
 * MUUTTUJA ASETETAAN BODYYN EIKÄ KARTTARUUTUUN. Alanappirivi ei ole
 * karttaruudun lapsi vaan asuu sen rinnalla kelluvassa .rail-kerroksessa
 * (index.html), joten karttaruutuun kirjoitettu muuttuja ei periytyisi
 * sinne lainkaan — mitattu: pehmuste jäi nollaksi ja neliö kartuutsin
 * päälle. Body on molempien yhteinen esi-isä.
 *
 * KARTUUTSI JA RIVI ALKAVAT SAMASTA KOHDASTA. Kartuutsi on
 * .fokusmitat-säiliössä (left: 0.7rem karttaruudusta) ja rivi
 * .turn-cardissa (left: 0.7rem samasta reunasta fokusnäkymässä), joten
 * pehmusteeksi riittää kartuutsin leveys ja pieni rako — kahden eri
 * ankkurin erotusta ei tarvitse laskea.
 */
function paivitaNappipaikka(ui) {
  const kartuutsi = ui.fokusKartuutsi;
  if (!kartuutsi) return;
  const leveys = kartuutsi.getBoundingClientRect().width;
  if (!(leveys > 0)) return;
  document.body.style.setProperty('--fokus-nappipaikka', `${Math.round(leveys + 8)}px`);
}

/* ------------------------------------------------------- päivitys */

/**
 * Tahdistaa mitat nykyiseen näkymään.
 *
 * Kutsutaan kolmesta paikasta (js/ui.js): kun fokuspohja ilmestyy tai
 * katoaa (paivitaFokusPohja), kun fokuskerros päivittyy
 * (paivitaFokusKerros) ja kun NÄKYMÄ ON ASETTUNUT (paivitaMaastonimet
 * — sama kohta kuin maastonimillä ja fokusnimillä). Viimeinen on se,
 * joka pitää mittajanan ajan tasalla: se ei siis päivity joka
 * kehyksessä vaan zoomin ja panoroinnin PÄÄTTEEKSI.
 */
export function paivitaFokusmitat(ui) {
  if (!ui.mapPane) return;
  const pohja = ui.fokusPohjaBbox ?? null;
  const iso = pohja ? ui.fokuskarttaAvain : null;
  // Näkyvissä vain kun fokuspohja on laudalla ja maa on tiedossa.
  const nakyy = Boolean(pohja && iso && FOKUS_POHJAT[iso]);
  const sailio = ui.fokusmitatSailio?.isConnected ? ui.fokusmitatSailio : rakenna(ui);
  if (!nakyy) {
    if (!sailio.hidden) {
      sailio.hidden = true;
      if (ui.fokusViivaimet) ui.fokusViivaimet.hidden = true;
      document.body.style.removeProperty('--fokus-nappipaikka');
      avaaMaataulu(ui, false);
      ui.fokusMitatAvain = null;
    }
    return;
  }
  sailio.hidden = false;

  if (ui.fokusMitatAvain !== iso) {
    ui.fokusMitatAvain = iso;
    const nimi = maanNimi(ui, iso);
    ui.fokusKartuutsi.querySelector('.fokus-kartuutsi-nimi').textContent = nimi.toUpperCase();
    /*
     * Maan oma nimi ja aikakauden valtiomuoto kartuutsin alariville.
     * Puuttuva tieto jättää oman palansa tyhjäksi eikä riviä puolikkaaksi
     * lauseeksi — tuntemattomalla maalla koko alarivi jää tyhjäksi ja
     * CSS kutistaa sen pois.
     */
    const omat = FOKUS_MAANIMET[iso] ?? {};
    ui.fokusKartuutsi.querySelector('.fokus-kartuutsi-paikallinen')
      .textContent = omat.paikallinen ?? '';
    ui.fokusKartuutsi.querySelector('.fokus-kartuutsi-aika')
      .textContent = omat.paikallinen && omat.valtiomuoto ? ` · ${omat.valtiomuoto}` : '';
    ui.fokusKartuutsi.setAttribute('aria-label', `${nimi}: avaa maan perustiedot`);
    ui.fokusKartuutsi.setAttribute('aria-expanded', String(Boolean(ui.fokusMaatauluAuki)));
    taytaMaataulu(ui, iso);
  }

  // Neliönapin paikka mitataan joka päivityksellä: ruudun leveys (ja
  // sen myötä kartuutsin kirjasinkoko) voi vaihtua kesken pelin.
  paivitaNappipaikka(ui);
  paivitaViivaimet(ui);

  const jana = laskeMittajana(ui);
  if (!jana) { ui.fokusJana.hidden = true; return; }
  ui.fokusJana.hidden = false;
  ui.fokusJana.style.setProperty('--jana-leveys', `${Math.round(jana.pikselia)}px`);
  ui.fokusJana.querySelector('.fokus-jana-maksimi').textContent = jana.teksti;
  ui.fokusJana.dataset.km = String(jana.km);
}

/** Laudan vaihto tai UI:n purku: elementit ja tila pois. */
export function nollaaFokusmitat(ui) {
  avaaMaataulu(ui, false);
  ui.fokusmitatSailio?.remove();
  ui.fokusMaataulu?.remove();
  ui.fokusViivaimet?.remove();
  document.body.style.removeProperty('--fokus-nappipaikka');
  ui.fokusmitatSailio = null;
  ui.fokusKartuutsi = null;
  ui.fokusJana = null;
  ui.fokusMaataulu = null;
  ui.fokusViivaimet = null;
  ui.fokusMitatAvain = null;
  ui.fokusMaatauluIso = null;
}
