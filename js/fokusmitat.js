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
 *
 * TARKENNE ON OSA VÄITETTÄ EIKÄ KORISTE (omistaja 27.8.2026). Tässä
 * pudotettiin ennen suluissa oleva tarkenne pois tilanpuutteen takia,
 * jolloin datan "turkki (Länsi-Traakia)" latoutui tauluun muotoon
 * "turkki" — ja taulu väitti turkkia Kreikan kieleksi ilman sitä
 * ainoaa sanaa, joka tekee väitteestä tosen. Tarkenne on siis
 * NÄYTETTÄVÄ; se ladotaan kielen nimen perään pienempänä ja
 * haaleampana, samalla erotinpisteellä kuin muutkin lisät.
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
    /*
     * Kielen nimi ja sen jälkeen mahdollinen tarkenne omana palanaan.
     * Sulut jäävät pois, koska rivillä on jo omat erottimensa: piste
     * erottaa tarkenteen kevyemmin kuin sulkumerkit, jotka näyttäisivät
     * ahtaassa taulussa kirjoitusvirheeltä katkettuaan.
     */
    const [, nimiOsa = t.kieli, tarkenne] = /^(.*?)\s*\(([^)]*)\)$/.exec(t.kieli) ?? [];
    osa.appendChild(luo('span', 'maa-sija tervehdys-osuus', nimiOsa));
    if (tarkenne) {
      osa.appendChild(luo('span', 'fokus-kieli-tarkenne', `· ${tarkenne}`));
    }
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
 * MAATAULU: KARTUUTSIN YLÄPUOLELLE nouseva taulu maan perustiedoista
 * (omistaja 25.8.2026, viimeistely pelitesteissä 26.–27.8.2026).
 *
 * TAULULLA EI OLE ENÄÄ OMAA POHJAA (omistaja 27.8.2026): teksti on
 * suoraan kartan päällä kuten kartuutsissakin, ja luettavuus tulee
 * halosta (CSS). Samalla taulu laskettiin kiinni kartuutsiin —
 * alareuna mitataan siitä (paivitaTaulunPohja) eikä arvata remeinä.
 *
 * VIISI SÄÄNTÖÄ:
 *
 * 1. TAULU NOUSEE KARTUUTSIN KOHDALTA, EI KOKO RUUDUN LEVYISENÄ
 *    ALALEVYNÄ (omistajan pelitestitilaus). Se on ankkuroitu samaan
 *    vasempaan laitaan kuin kartuutsi ja alkaa heti sen yläpuolelta —
 *    kartuutsi jää näkyviin taulun alle, ja juuri siksi taulussa EI OLE
 *    OTSIKKOA: maan nimi lukee jo kartuutsissa.
 * 2. TAULU EI PEITÄ ALANAPPEJA. Sen alareuna on kartuutsin JA
 *    Liiku-neliön yläpuolella — kummankin mitatun yläreunan mukaan
 *    (paivitaTaulunPohja), joten Liiku on käytössä koko ajan.
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
   * PALJAS PLUS LUKURIVIEN VIEREEN (css/styles.css .fokus-maataulu-lehti).
   * Se on taulun ainoa nappi ja samalla ainoa
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
  /*
   * Lähderiviä ei ole (omistajan tarkennus 26.8.2026 ilta: "ota se
   * koko rivi pois joka alkoi samat luvut tekstillä" — kumoaa saman
   * illan lyhennyksen). Lähdemaininta Maailmanpankista ja V-Demistä
   * on maan lehdessä, jossa samat luvut esitetään laajemmin.
   */

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
   * MATKUSTA-NAPPI VÄISTYY TAULUN AJAKSI (omistajan tilaus #102:
   * *"se voisi piilottaa matkusta-napin väliaikaisesti, jos se on
   * laudalla"*).
   *
   * Lippu on BODYSSÄ eikä napissa, koska nappi syntyy ja katoaa joka
   * piirrossa (piirraToimintorivi rakentaa rivin uudestaan): napin
   * omaan luokkaan kirjattu piilotus katoaisi ensimmäisessä
   * renderöinnissä taulun ollessa yhä auki. Tämä on samalla se yksi
   * kytkin, jonka varassa myös taulun alle jäävän kartan sumennus on
   * (css/styles.css body.maataulu-auki).
   *
   * KAIKKI VAIHDOT KULKEVAT TÄSTÄ: avaus kartuutsista, sulku
   * kartasta/Escistä, plussan vienti maalehteen ja laudan vaihdon
   * nollaus (nollaaFokusmitat) kutsuvat kaikki avaaMaataulua, joten
   * luokka ei voi jäädä päälle taulun kadotessa.
   */
  document.body.classList.toggle('maataulu-auki', ui.fokusMaatauluAuki);
  /*
   * Vasen viivain varaa kaistan auki olevalle taululle (ks.
   * paivitaViivaimet), joten lukemat on ladottava uudelleen heti
   * avattaessa ja suljettaessa — muuten ne palaisivat vasta seuraavan
   * panoroinnin päätteeksi.
   */
  paivitaViivaimet(ui);
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
  /*
   * PLUS PALSTOJEN RAJALLE (omistaja 26.8.2026: keskitys taulun
   * leveyteen näytti oikealle harhautuneelta, koska arvopalsta on
   * otsikkopalstaa leveämpi). Raja mitataan ensimmäisestä arvosolusta
   * KERRAN täytön yhteydessä — ei mittauksia missään silmukassa.
   */
  const lehti = taulu.querySelector('.fokus-maataulu-lehti');
  const arvo = lista.querySelector('dd');
  if (lehti && arvo) {
    requestAnimationFrame(() => {
      const raja = arvo.getBoundingClientRect().left
        - lista.getBoundingClientRect().left;
      if (raja > 0) lehti.style.marginLeft = `${Math.max(0, raja - 22)}px`;
    });
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
 * NELJÄ SIVUA, EI KAHTA (omistajan pelitestitilaus 25.8.2026:
 * *"aste-asteikot laajennetaan neljälle sivulle"*). Leveysasteet ovat
 * MOLEMMISSA pystyreunoissa ja pituusasteet MOLEMMISSA vaakareunoissa,
 * kuten aikakauden atlaksen lehdessä: lukema löytyy siitä reunasta,
 * joka sattuu olemaan lähinnä katsottua kohtaa, eikä silmän tarvitse
 * hakea koko ruudun poikki. Lukemat lasketaan KERRAN ja ladotaan
 * molempiin nauhoihin — kaksi erillistä laskentaa voisi antaa samasta
 * ruudusta kaksi eri astetta.
 *
 * VIIVAIN VÄISTÄÄ RUUDUN KALUSTEET (ks. KALUSTEET). Kaksi uutta reunaa
 * osuvat väistämättä johonkin: alalaidassa ovat kartuutsi, Liiku-neliö
 * ja mittajana, oikeassa reunassa kelluva pöllö ja zoomiportaat.
 * Kalusteita ei siirretä eikä nauhaa kavenneta — pois jää se yksi
 * merkki, joka osuisi kalusteen kohdalle, kuten maataulun kanssa on
 * tehty alusta asti. Paikat MITATAAN ajossa, koska yksikään kaluste ei
 * ole kiinteässä kohdassa: kartuutsin leveys riippuu maan nimestä,
 * napit ja pöllö turva-alueesta, zoomiportaat osoitinlaitteesta.
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
/* Nurkka on kahden viivaimen risteys: pystyviivainten ylin ja alin
 * lukema jätetään pois, jotteivat ne osu vaakaviivainten numeroriviin.
 * Nurkat kuuluvat siis vaakaviivaimille, kaikissa neljässä kulmassa. */
const NURKKA_PX = 30;
/* Vaakaviivaimen oma reunavara: lukema ei ala aivan ruudun laidasta. */
const REUNA_PX = 8;

/*
 * KUINKA KAUAS NAUHA SAA LIUKUA ENNEN UUTTA LADONTAA (ks. paivitaNauha).
 *
 * Merkit ladotaan tämän verran yli ruudun molemmista päistä, joten
 * niin kauan kuin nauha on liukunut vähemmän kuin marginaalin verran,
 * ruudulla näkyvälle alueelle on VARMASTI valmis merkki jokaista
 * asteviivaa kohti. Marginaali on siis kate eikä arvaus: liu'un
 * jälkeen katettu alue on [-M+d, raja+M+d], joka sisältää ruudun
 * [0, raja] aina kun |d| ≤ M.
 *
 * 160 px on runsaat kaksi tiheintä asteväliä (VALIN_MIN 78), eli
 * nauhaan tulee pari ylimääräistä merkkiä kumpaankin päähän ja uusi
 * ladonta osuu kohdalle noin kerran 160 pikselin panoroinnissa.
 */
const LIUKUVARA = 160;

/*
 * RUUDUN KALUSTEET, JOIDEN KOHDALTA VIIVAIN VÄISTÄÄ.
 *
 * Lista on VALITSIMIA eikä mittoja: jokainen näistä elää oman
 * sääntönsä mukaan (kartuutsin leveys maan nimestä, napit ja pöllö
 * turva-alueesta), joten ainoa kestävä mitta on ajossa luettu
 * ruutulaatikko.
 *
 * Kartan zoomiportaat (.zoomi) olivat listalla, kunnes napit
 * poistettiin 27.8.2026 — kartan oikea reuna on nyt vapaa.
 *
 * Maataulu EI ole listalla vaikka sekin väistetään: sen avaus on
 * scaleY-siirtymä, ja ruutulaatikko kertoisi kesken animaation väärän
 * korkeuden — se mitataan asettelulaatikosta erikseen (ks.
 * kalusteLaatikot).
 */
const KALUSTEET = [
  '.fokus-kartuutsi',
  '.fokus-jana',
  '.toimintorivi button',
  '.pollo-nappi.pollo-kelluu',
];

/*
 * Kuinka paljon kalusteen ympärille jätetään ilmaa. Merkin lukema on
 * leveämpi kuin korkea ("37,5°P" on parikymmentä pikseliä leveä mutta
 * yhden rivin korkuinen), ja vaakaviivaimessa lukema on vielä
 * KESKITETTY viivan kohdalle — siksi vaakasuunnassa varataan puolikas
 * lukema kumpaankin suuntaan ja pystysuunnassa vain rivin verran.
 */
const MERKKI_VARA_X = 26;
const MERKKI_VARA_Y = 9;

/*
 * KOSKETUS EI OLE PEITTO. Kaluste varaa kaistan vain jos se osuu
 * nauhaan tätä syvemmältä.
 *
 * Mitattu vika: alanappirivin painikkeet päättyvät tasan alaviivaimen
 * yläreunaan, ja pyöristyksen jälkeen ne menivät nauhan kanssa
 * päällekkäin 0,45 pikseliä. Sillä ei peitä mitään — mutta se varasi
 * napin koko leveyden, ja alaviivain jäi tyhjäksi ruudun puolikkaalta.
 * Raja on siis pienempi kuin mikään lukema mutta suurempi kuin
 * pyöristysvirhe.
 */
const OSUMA_MIN = 4;

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

/*
 * Reunaviivainten säiliö. Vain YLÄ ja VASEN (omistaja 26.8.2026:
 * "riittää että näkyy vain vasemmassa sekä yläreunassa") — kuten
 * aikakauden atlaksissa usein: lukemat kahdessa reunassa, kaksi muuta
 * jää kartalle.
 */
function rakennaViivaimet(ui) {
  const sailio = luo('div', 'fokus-viivaimet');
  sailio.setAttribute('aria-hidden', 'true');
  sailio.hidden = true;
  for (const sivu of ['yla', 'vasen']) {
    sailio.appendChild(luo('div', `fokus-viivain fokus-viivain-${sivu}`));
  }
  ui.mapPane.appendChild(sailio);
  return sailio;
}

/*
 * ============ KAMERAN LUVUT ILMAN ASETTELUN LUKEMISTA ===============
 *
 * Omistajan tilaus 28.8.2026: *"muuta ne päivittymään reaaliajassa
 * panoroitaessa ja zoomatessa"* — ja sen ehdoton reunaehto (v1115:n
 * oppi kartan sujuvuudesta): *"silmukassa EI YHTÄÄN asettelunlukua
 * (getBoundingClientRect tms.)"*.
 *
 * Ristiriita on näennäinen. Panorointi ja nipistys eivät muuta laudan
 * ASETTELUA lainkaan: molemmat kirjoittavat pelkän CSS-muunnoksen
 * KARTAN SIIRTOKUOREEN (`.kartta-kuori`; js/kartta.js asetaPan,
 * paivitaNipistys, ajaKamera — wrapper-siirto 26.8.2026, ennen tätä
 * kohde oli `svg.style.transform`), ja laudan oma paikka, koko ja
 * viewBox pysyvät siinä missä olivat. Siksi ruutupaikat voi laskea
 * kahdesta osasta:
 *
 *   PERUSTA — mitataan KERRAN, kun näkymä on levossa: laudan
 *   asettelusijainti karttaruudussa, pikseliä lautayksikköä kohti ja
 *   viewBoxin nurkka. Tässä on ainoat getBoundingClientRect-kutsut.
 *
 *   SIIRTO — luetaan JOKA KEHYS `style.transform`-merkkijonosta.
 *   Inline-tyylin lukeminen ei koske asetteluun: se on sama
 *   merkkijono, jonka kartta juuri kirjoitti, eikä selaimen tarvitse
 *   laskea mitään sen antamiseksi. (getComputedStyle olisi eri asia ja
 *   siksi kielletty tässä.)
 *
 * Kaava on origon 0 0 ansiosta suora (css: #board { transform-origin:
 * 0 0 }): piirretty kulma = asettelukulma + siirto, ja koko = asettelu-
 * koko × kerroin. Siitä saa sekä eteen- että taaksepäin:
 *
 *   px  = asetteluX + tx + s · (bx − vbX) · pxPerYks
 *   bx  = vbX + (px − asetteluX − tx) / (s · pxPerYks)
 *
 * PERUSTA VANHENEE VAIN ZOOMIPORTAASSA. viewBox ja inline-mitat
 * muuttuvat silloin kun kartta sovitetaan uudelleen (fitViewBox:
 * zoomipainike, rullaus, laudan vaihto, ikkunan koon muutos) — ei
 * koskaan kesken eleen. Tarkkailija tunnistaa juuri ne attribuutit ja
 * mittaa perustan silloin uudelleen; silmukka ei mittaa koskaan.
 */

/**
 * Kartan nykyinen CSS-muunnos lukuina. Ei kosketa asetteluun.
 *
 * Muunnos luetaan SIIRTOKUORESTA eikä laudasta (wrapper-siirto
 * 26.8.2026): kuori on se elementti, jota kartta liikuttaa, ja lauta
 * seuraa mukana sen sisällä.
 */
function kameranSiirto(ui) {
  const teksti = (ui?.karttaKuori ?? ui?.svg)?.style?.transform ?? '';
  if (!teksti) return { tx: 0, ty: 0, s: 1 };
  const siirto = /translate3d\(\s*(-?[\d.]+)px\s*,\s*(-?[\d.]+)px/.exec(teksti);
  const kerroin = /scale\(\s*(-?[\d.]+)/.exec(teksti);
  const s = kerroin ? Number(kerroin[1]) : 1;
  return {
    tx: siirto ? Number(siirto[1]) : 0,
    ty: siirto ? Number(siirto[2]) : 0,
    s: Number.isFinite(s) && s > 0 ? s : 1,
  };
}

/**
 * Mittaa perustan ruutulaatikoista. AINOA paikka, joka lukee asettelua.
 *
 * Nykyinen muunnos vähennetään pois, jotta perusta on aina
 * SIIRTÄMÄTTÖMÄN laudan mitta — mittaus onnistuu siis myös kesken
 * eleen, jos perusta sattuu vanhentumaan silloin.
 */
function mittaaPerusta(ui) {
  const pane = ui.mapPane;
  const svg = ui.svg;
  const vb = svg?.viewBox?.baseVal;
  if (!pane || !vb?.width) return null;
  const l = svg.getBoundingClientRect();
  const p = pane.getBoundingClientRect();
  const { tx, ty, s } = kameranSiirto(ui);
  const pxPerYks = l.width / (vb.width * s);
  if (!(pxPerYks > 0) || !(p.width > 0)) return null;
  return {
    lautaOsa: svg,
    vbX: vb.x,
    vbY: vb.y,
    pxPerYks,
    asetteluX: (l.left - p.left) - tx,
    asetteluY: (l.top - p.top) - ty,
    leveys: p.width,
    korkeus: p.height,
    // Kalusteiden varaamat kaistat nauhoittain; mitataan samalla kertaa.
    kaistat: null,
  };
}

/**
 * Laudan koordinaatti ruudun pikseleiksi — perustasta ja elävästä
 * siirrosta. Ei yhtäkään asettelunlukua.
 */
function ruutuKaavat(ui) {
  const perusta = ui.fokusViivainPerusta;
  if (!perusta || perusta.lautaOsa !== ui.svg) return null;
  const { tx, ty, s } = kameranSiirto(ui);
  const skaala = perusta.pxPerYks * s;
  if (!(skaala > 0)) return null;
  const x0 = perusta.asetteluX + tx;
  const y0 = perusta.asetteluY + ty;
  return {
    skaala,
    /*
     * Kameran nollakohta ruudulla. Viivainnauhat liu'uttavat itsensä
     * juuri tämän muutoksella (ks. paivitaNauha): kun mittakaava pysyy,
     * JOKAINEN laudan piste siirtyy ruudulla saman x0/y0-erotuksen
     * verran, joten koko nauhan saa yhdellä muunnoksella oikeaan
     * kohtaan — merkkeihin koskematta.
     */
    x0,
    y0,
    leveys: perusta.leveys,
    korkeus: perusta.korkeus,
    px: (bx) => x0 + (bx - perusta.vbX) * skaala,
    py: (by) => y0 + (by - perusta.vbY) * skaala,
    // Käänteissuunta: ruudun reuna laudan yksiköiksi.
    lautaX: (sx) => perusta.vbX + (sx - x0) / skaala,
    lautaY: (sy) => perusta.vbY + (sy - y0) / skaala,
  };
}

/** Lukema atlaksen asussa: "22°", "37,5°" ja pallonpuolisko kirjaimena. */
function asteTeksti(arvo, [plus, miinus]) {
  const luku = Math.abs(Math.round(arvo * 1000) / 1000);
  const teksti = String(Number(luku.toFixed(3))).replace('.', ',');
  if (Math.abs(arvo) < 1e-9) return `${teksti}°`;
  return `${teksti}°${arvo > 0 ? plus : miinus}`;
}

/**
 * Latoo nauhan merkit UUDELLEENKÄYTTÄEN elementit.
 *
 * NELJÄ SÄÄNTÖÄ, JOTKA TEKEVÄT TÄSTÄ KEHYSKELPOISEN:
 *
 *   1. ELEMENTIT SÄILYVÄT. Vanha versio tyhjensi nauhan ja loi merkit
 *      alusta joka kerta. Se kelpasi, kun ladonta tapahtui kerran
 *      levossa, mutta kuudessakymmenessä kehyksessä sekunnissa se olisi
 *      satoja solmuja roskaksi joka sekunti.
 *   2. PAIKKA ON TRANSFORM eikä `left`/`top`. Muunnos ei pakota
 *      uudelleenasettelua; `left` pakottaisi, ja silloin viivaimet
 *      maksaisivat juuri sen, mitä tässä yritetään välttää.
 *      Keskitys (-50 %) tulee mukaan samaan muunnokseen, koska
 *      inline-tyyli syrjäyttää tyylitiedoston oman.
 *   3. TEKSTI VAIHDETAAN VAIN JOS SE MUUTTUI. Panoroitaessa sama
 *      lukema säilyy kymmeniä kehyksiä ja vain liukuu; turha kirjoitus
 *      mitätöisi tekstin asettelun joka kehyksellä.
 *   4. MERKKI TUNNETAAN LUKEMASTAAN, EI TAULUKKOPAIKASTAAN — ks. alla.
 *
 * === MIKSI SÄÄNTÖ 3 EI YKSIN RIITTÄNYT (omistaja 26.8.2026: *"vieritys
 * tökkii vieläkin"*) ===
 *
 * Sääntö 3 vertaa oikeaa merkkiä väärään. Vanha silmukka jakoi merkit
 * TAULUKON JÄRJESTYKSESSÄ: merkki 0 sai aina ensimmäisen näkyvän
 * asteen, merkki 1 toisen ja niin edelleen. Kun panorointi työntää
 * ruudun reunasta sisään YHDEN uuden asteviivan, koko jono siirtyy
 * yhden pykälän — ja jokainen vertailu `luku.textContent !== teksti`
 * osuu, koska jokainen merkki sai naapurinsa lukeman. Yksi uusi viiva
 * kirjoitti siis koko nauhan uusiksi.
 *
 * Mitattu (Chromium, 4× CPU-kuristus, 150 kehyksen skriptattu raahaus
 * Kreikan fokusnäkymässä, 18 merkkiä kahdessa nauhassa): 157
 * tekstinmuutosta 22 erässä, suurin erä 11 merkkiä kerralla. Oikea luku
 * on noin 22 — tasan yksi merkki per ruudun yli vaihtunut asteviiva.
 * Ja koska teksti on ainoa asia, joka näissä nauhoissa likaa asettelun,
 * juuri se näkyi kehysmittarissa: 0,33 asettelua/kehys, josta viivainten
 * osuus 0,27 (silmukka pois kytkettynä jäi 0,06).
 *
 * KORJAUS: merkki muistaa lukemansa (`__lukema`), ja ladonta etsii
 * ensin jokaiselle asteelle sen OMAN merkin. Vain ne merkit, joiden
 * lukema putosi ruudulta, kierrätetään uusille asteille — ja silloin
 * teksti oikeasti muuttui. Liike on niille muille pelkkä muunnos.
 *
 * DOM-JÄRJESTYS EI ENÄÄ VASTAA RUUDUN JÄRJESTYSTÄ, eikä sen tarvitse:
 * merkit ovat absoluuttisesti asemoituja eivätkä mene päällekkäin, ja
 * säiliö on `aria-hidden` (lukemat eivät ole ruudunlukijan sisältöä).
 */
function ladoNauha(nauha, parit, pysty, tila) {
  /*
   * Varasto lukeman mukaan ja erikseen ne merkit, joilla ei ole omaa
   * lukemaa (vasta luodut) — jälkimmäiset kierrätetään ensin, koska
   * niiden teksti on kirjoitettava joka tapauksessa.
   */
  const varasto = new Map();
  const vapaat = [];
  for (const merkki of nauha.children) {
    const lukema = merkki.__lukema;
    if (lukema != null && !varasto.has(lukema)) varasto.set(lukema, merkki);
    else vapaat.push(merkki);
  }

  // Kierros 1: sama aste löytää saman merkin, eikä tekstiin kosketa.
  const kohteet = new Array(parit.length);
  for (let i = 0; i < parit.length; i++) {
    const merkki = varasto.get(parit[i][1]);
    if (!merkki) continue;
    kohteet[i] = merkki;
    varasto.delete(parit[i][1]);
  }

  // Kierros 2: loput kierrätetään — ensin lukemattomat, sitten ne,
  // joiden aste juuri putosi ruudulta.
  const kierratettavat = [...vapaat, ...varasto.values()];
  let seuraava = 0;
  for (let i = 0; i < parit.length; i++) {
    if (kohteet[i]) continue;
    let merkki = kierratettavat[seuraava];
    if (merkki) seuraava += 1;
    else {
      merkki = luo('span', 'fokus-viivain-merkki');
      merkki.appendChild(luo('i', 'fokus-viivain-viiva'));
      merkki.appendChild(luo('b', 'fokus-viivain-luku'));
      nauha.appendChild(merkki);
    }
    kohteet[i] = merkki;
  }

  tila.merkit.length = 0;
  for (let i = 0; i < parit.length; i++) {
    const [paikka, teksti] = parit[i];
    const merkki = kohteet[i];
    merkki.style.transform = pysty
      ? `translate3d(0, ${paikka.toFixed(1)}px, 0) translateY(-50%)`
      : `translate3d(${paikka.toFixed(1)}px, 0, 0) translateX(-50%)`;
    merkki.__paikka = paikka;
    if (merkki.__lukema !== teksti) {
      merkki.lastChild.textContent = teksti;
      merkki.__lukema = teksti;
    }
    tila.merkit.push(merkki);
  }

  /*
   * Ladonnan ulkopuolelle jääneet piiloon. Lukema jää muistiin: ruudulta
   * pudonnut aste palaa usein takaisin muutaman kehyksen päästä, ja
   * silloin se löytää oman merkkinsä ilman yhtäkään kirjoitusta.
   */
  for (let i = seuraava; i < kierratettavat.length; i++) piilotaMerkki(kierratettavat[i]);
}

/**
 * Merkin näkyvyys. `display` eikä `visibility`, koska savukkeen väite
 * 7t (savuke-fokuskartta) mittaa merkkien ruutulaatikot: piilotetun
 * merkin on oltava mitaltaan olematon, jotta kalusteen kohdalle jäävä
 * merkki ei näytä osuvan siihen.
 */
function piilotaMerkki(merkki) {
  if (merkki.__piilossa === true) return;
  merkki.style.display = 'none';
  merkki.__piilossa = true;
}

function naytaMerkki(merkki) {
  if (merkki.__piilossa === false) return;
  merkki.style.display = '';
  merkki.__piilossa = false;
}

/*
 * ============ NAUHA LIUKUU KOKONAISENA, MERKIT PYSYVÄT ==============
 *
 * Omistajan pelitesti 26.8.2026 (iPad, v1149): *"vieritys tökkii
 * vieläkin."* Wrapper-siirron jälkeen jäljelle jäänyt kehystyö
 * paikannettiin mittauksella (Chromium, 4× CPU-kuristus, 150 kehyksen
 * skriptattu raahaus Kreikan fokusnäkymässä; CDP:n
 * invalidationTracking + LayoutCount + ablaatiot):
 *
 *   1398  tyylin mitätöintiä  SPAN.fokus-viivain-merkki (inline-tyyli)
 *    150  tyylin mitätöintiä  DIV.kartta-kuori (itse panorointi)
 *
 * Eli kartan oma siirto maksoi yhden tyylikirjoituksen kehyksessä ja
 * viivaimet YHDEKSÄN. Ablaatio kertoi saman toisin päin: viivainsilmukka
 * pois kytkettynä asettelu putosi 0,33 → 0,06 kehykseltä ja pääsäikeen
 * työ noin kolmanneksen.
 *
 * SYY EI OLLUT LASKENTA VAAN KIRJOITTAMINEN. Jokainen
 * `merkki.style.transform` on oma CSS-arvon jäsennys ja oma tyylin
 * mitätöinti, ja niitä oli kahdeksantoista kehyksessä — vaikka merkit
 * liikkuivat KAIKKI SAMAN VERRAN.
 *
 * KOSKA MITTAKAAVA EI MUUTU PANOROINNISSA, kaikki laudan pisteet
 * siirtyvät ruudulla saman verran (ruutuKaavat x0/y0). Nauha on siis
 * liikutettavissa yhtenä kappaleena: yksi muunnos nauhalle korvaa
 * kahdeksantoista muunnosta merkeille, ja merkkien keskinäiset paikat
 * ovat samat pikselilleen — tämä ei ole likiarvo.
 *
 * MITÄ EI SILTI SAA MENETTÄÄ:
 *
 *   LUKEMAT OVAT OIKEIN JOKA HETKI. Ne eivät riipu liu'usta lainkaan:
 *   merkki näyttää oman asteensa, ja aste on siinä kohdassa laudalla
 *   missä on. Ele päättyy paivitaViivaimet-lepoladontaan, joka mittaa
 *   perustan uudelleen ja latoo nauhat nollasta.
 *
 *   REUNAT JA KALUSTEET VÄISTETÄÄN YHÄ KEHYS KEHYKSELTÄ. Näkyvyys
 *   lasketaan joka kehyksellä merkin omasta paikasta plus liu'usta
 *   (paivitaNauha), joten aukko zoomipainikkeiden ja kartuutsin kohdalla
 *   on oikeassa kohdassa myös kesken eleen. Kirjoitus tapahtuu vain kun
 *   näkyvyys OIKEASTI vaihtuu — muutama kerta eleessä, ei joka kehys.
 *
 *   RUUDUN LAIDASTA SISÄÄN TULEVA ASTE ON VALMIINA. Ladonta ulottuu
 *   LIUKUVARAn verran yli ruudun molemmista päistä, ja kun liuku ylittää
 *   marginaalin, nauha ladotaan uudelleen. Siksi ruudulle ei voi jäädä
 *   aukkoa.
 */

/** Nauhan ladontatila: mistä kamerasta merkit ladottiin ja mitkä ne ovat. */
function nauhanTila(nauha) {
  if (!nauha.__lado) {
    nauha.__lado = {
      skaala: 0, pohja: 0, kaistat: null, raja: 0, siirto: null, merkit: [],
    };
  }
  return nauha.__lado;
}

/**
 * Yksi nauha nykyiseen näkymään: joko liu'utetaan tai ladotaan uudelleen.
 *
 * `laske` on funktio, joka tuottaa parit [paikka, lukema] — sitä
 * kutsutaan VAIN uudelleenladonnassa, joten liukukehyksessä ei lasketa
 * projektioita eikä ladota merkkijonoja.
 */
function paivitaNauha(nauha, pysty, ruutu, kaistat, laske) {
  const tila = nauhanTila(nauha);
  const pohja = pysty ? ruutu.y0 : ruutu.x0;
  const raja = pysty ? ruutu.korkeus : ruutu.leveys;
  const reuna = pysty ? NURKKA_PX : REUNA_PX;
  let siirto = pohja - tila.pohja;
  /*
   * Uudelleenladonnan ehdot. Kaistat vertaillaan VIITTEENÄ eikä
   * sisältönä: uusi taulukko syntyy täsmälleen silloin kun kalusteet on
   * mitattu uudelleen (paivitaPerusta), ja juuri silloin aukkojen paikat
   * on ladottava uusiksi.
   */
  const uusi = !tila.merkit.length
    || tila.skaala !== ruutu.skaala
    || tila.kaistat !== kaistat
    || tila.raja !== raja
    || !(Math.abs(siirto) <= LIUKUVARA);
  if (uusi) {
    ladoNauha(nauha, laske(), pysty, tila);
    tila.skaala = ruutu.skaala;
    tila.pohja = pohja;
    tila.kaistat = kaistat;
    tila.raja = raja;
    siirto = 0;
  }
  const muunnos = siirto
    ? (pysty ? `translate3d(0, ${siirto.toFixed(1)}px, 0)` : `translate3d(${siirto.toFixed(1)}px, 0, 0)`)
    : '';
  if (tila.siirto !== muunnos) {
    nauha.style.transform = muunnos;
    tila.siirto = muunnos;
  }
  for (const merkki of tila.merkit) {
    const paikka = merkki.__paikka + siirto;
    if (paikka >= reuna && paikka <= raja - reuna && !kaistallaVarattu(paikka, kaistat)) {
      naytaMerkki(merkki);
    } else piilotaMerkki(merkki);
  }
}

/**
 * Ruudun kalusteiden laatikot karttaruudun koordinaatteina.
 *
 * MITATAAN RUUTULAATIKOISTA, KOSKA KALUSTEET EIVÄT OLE SAMAN VANHEMMAN
 * LAPSIA. Kartuutsi ja jana ovat karttaruudussa, alanappirivi
 * .rail-kerroksessa ja kelluva pöllö kiinni ikkunassa (position:
 * fixed) — offsetTop tarkoittaisi kullakin eri origoa. Ruutulaatikko on
 * yhteinen kieli, ja karttaruudun oma laatikko kääntää sen paneelin
 * koordinaateiksi.
 */
function kalusteLaatikot(ui) {
  const p = ui.mapPane.getBoundingClientRect();
  const laatikot = [];
  for (const valitsin of KALUSTEET) {
    for (const osa of document.querySelectorAll(valitsin)) {
      const r = osa.getBoundingClientRect();
      if (!(r.width > 0) || !(r.height > 0)) continue;
      laatikot.push({
        x1: r.left - p.left,
        x2: r.right - p.left,
        y1: r.top - p.top,
        y2: r.bottom - p.top,
      });
    }
  }
  /*
   * AUKI OLEVA MAATAULU VARAA KAISTAN ITSELLEEN. Taulu on pohjaton
   * (ks. rakennaMaataulu), ja sen lukurivit alkavat samasta
   * pystyviivasta kuin kartuutsi eli viivainnauhan päältä. Ennen
   * paperilaatta peitti lukemat; nyt ne latoutuisivat "34°P KESKITULO"
   * -sotkuksi. Lukema on kahdesta vähäarvoisempi — se palaa heti kun
   * taulu sulkeutuu — joten viivain väistää eikä taulu.
   *
   * ASETTELULAATIKKO EIKÄ getBoundingClientRect: taulun avaus on
   * transform-siirtymä (scaleY), ja ruutulaatikko kertoisi kesken
   * animaation väärän korkeuden. offsetTop/offsetHeight ovat
   * karttaruudun suhteen ja transformista riippumattomat.
   */
  const taulu = ui.fokusMaatauluAuki ? ui.fokusMaataulu : null;
  if (taulu && taulu.offsetHeight > 0) {
    laatikot.push({
      x1: taulu.offsetLeft,
      x2: taulu.offsetLeft + taulu.offsetWidth,
      y1: taulu.offsetTop,
      y2: taulu.offsetTop + taulu.offsetHeight,
    });
  }
  return laatikot;
}

/**
 * Nauhan oma kaista karttaruudussa.
 *
 * offset* eikä ruutulaatikko: nauha on karttaruudun absoluuttinen lapsi
 * ja sen paikka on suoraan luettavissa asettelusta, ilman ruudun
 * kulmien vähennyslaskua. Sama luku kelpaa kalusteiden laatikoiden
 * rinnalle, koska nekin käännetään karttaruudun koordinaatteihin.
 */
function nauhanKaista(nauha) {
  return {
    x1: nauha.offsetLeft,
    x2: nauha.offsetLeft + nauha.offsetWidth,
    y1: nauha.offsetTop,
    y2: nauha.offsetTop + nauha.offsetHeight,
  };
}

/**
 * Kaistat, joihin nauha ei saa latoa merkkiä.
 *
 * Mukaan otetaan VAIN ne kalusteet, jotka oikeasti osuvat tähän
 * nauhaan: pöllö on oikean reunan asia eikä saa jättää aukkoa vasempaan
 * viivaimeen, ja kartuutsi on alalaidan asia eikä saa syödä merkkiä
 * yläreunasta.
 */
function varatutKaistat(laatikot, kaista, pysty) {
  const varatut = [];
  const yhteinen = (a1, a2, b1, b2) => Math.min(a2, b2) - Math.max(a1, b1);
  for (const laatikko of laatikot) {
    const osuu = yhteinen(laatikko.x1, laatikko.x2, kaista.x1, kaista.x2) > OSUMA_MIN
      && yhteinen(laatikko.y1, laatikko.y2, kaista.y1, kaista.y2) > OSUMA_MIN;
    if (!osuu) continue;
    varatut.push(pysty
      ? [laatikko.y1 - MERKKI_VARA_Y, laatikko.y2 + MERKKI_VARA_Y]
      : [laatikko.x1 - MERKKI_VARA_X, laatikko.x2 + MERKKI_VARA_X]);
  }
  return varatut;
}

const kaistallaVarattu = (paikka, varatut) => varatut
  .some(([alku, loppu]) => paikka > alku && paikka < loppu);

/** Nauhat nimineen; haetaan kerran ja pidetään perustan rinnalla. */
function viivainNauhat(sailio) {
  return {
    yla: sailio.querySelector('.fokus-viivain-yla'),
    vasen: sailio.querySelector('.fokus-viivain-vasen'),
  };
}

/**
 * Mittaa perustan ja kalusteiden varaamat kaistat uudelleen.
 *
 * TÄSSÄ OVAT KAIKKI ASETTELUNLUVUT. Kutsutaan kolmesta paikasta,
 * joista yksikään ei ole kehyssilmukka: näkymän asettuessa
 * (paivitaFokusmitat), maataulua avattaessa ja silloin kun laudan
 * viewBox tai inline-mitat muuttuvat (zoomiporras, ikkunan koko).
 */
function paivitaPerusta(ui) {
  const sailio = ui.fokusViivaimet;
  const perusta = mittaaPerusta(ui);
  ui.fokusViivainPerusta = perusta;
  if (!perusta || !sailio?.isConnected) return perusta;
  const laatikot = kalusteLaatikot(ui);
  const nauhat = viivainNauhat(sailio);
  perusta.kaistat = {
    yla: varatutKaistat(laatikot, nauhanKaista(nauhat.yla), false),
    vasen: varatutKaistat(laatikot, nauhanKaista(nauhat.vasen), true),
  };
  return perusta;
}

/**
 * Latoo viivaimet siihen näkymään, jossa kartta juuri nyt on.
 *
 * TÄMÄ AJETAAN JOKA KEHYS KARTAN LIIKKUESSA (ks. elavaKehys), joten se
 * ei saa lukea asettelua eikä luoda solmuja: paikat tulevat perustasta
 * ja elävästä muunnoksesta (ruutuKaavat), kalusteiden kaistat perustan
 * mukana mitatusta taulukosta ja merkit nauhojen omasta varastosta
 * (ladoNauha).
 *
 * Omistajan tilaus 28.8.2026: lukemien on muututtava REAALIAJASSA
 * panoroitaessa ja zoomatessa. Ennen ne laskettiin vasta liikkeen
 * päätteeksi, ja koko nauha liukui ruudun ulkopuolelle siksi aikaa kun
 * se ei voinut olla oikeassa — nyt se on oikeassa koko ajan, eikä
 * piiloa tarvita.
 */
function piirraViivaimet(ui) {
  const sailio = ui.fokusViivaimet;
  if (!sailio?.isConnected) return;
  const kaavat = projektionKaavat(FOKUS_LAUTAPROJEKTIOT[ui.game?.pack?.id]);
  const ruutu = ruutuKaavat(ui);
  const perusta = ui.fokusViivainPerusta;
  const nauhat = viivainNauhat(sailio);
  if (!kaavat || !ruutu || !perusta?.kaistat) {
    sailio.hidden = true;
    return;
  }
  sailio.hidden = false;

  /*
   * ASKEL VALITAAN RUUDUSTA, MERKIT LADOTAAN RUUDUN YLI. Tiheys on
   * ruudun ominaisuus (valitseAskel), joten se lasketaan näkyvästä
   * alueesta — mutta merkit ulottuvat LIUKUVARAn verran yli molempien
   * laitojen, jotta nauha voi liukua ilman aukkoa (ks. paivitaNauha).
   */
  paivitaNauha(nauhat.yla, false, ruutu, perusta.kaistat.yla, () => {
    const lonAlku = kaavat.lon(ruutu.lautaX(0));
    const lonLoppu = kaavat.lon(ruutu.lautaX(ruutu.leveys));
    const pxAsteessa = Math.abs(ruutu.leveys / (lonLoppu - lonAlku));
    const parit = [];
    if (!Number.isFinite(pxAsteessa) || !(pxAsteessa > 0)) return parit;
    const askel = valitseAskel(pxAsteessa);
    const reunaA = kaavat.lon(ruutu.lautaX(-LIUKUVARA));
    const reunaB = kaavat.lon(ruutu.lautaX(ruutu.leveys + LIUKUVARA));
    const alku = Math.ceil(Math.min(reunaA, reunaB) / askel) * askel;
    const loppu = Math.max(reunaA, reunaB);
    for (let lon = alku; lon <= loppu + 1e-9; lon += askel) {
      parit.push([ruutu.px(kaavat.x(lon)), asteTeksti(lon, ['I', 'L'])]);
    }
    return parit;
  });

  paivitaNauha(nauhat.vasen, true, ruutu, perusta.kaistat.vasen, () => {
    const latYla = kaavat.lat(ruutu.lautaY(0));
    const latAla = kaavat.lat(ruutu.lautaY(ruutu.korkeus));
    const pxLeveysasteessa = Math.abs(ruutu.korkeus / (latYla - latAla));
    const parit = [];
    if (!Number.isFinite(pxLeveysasteessa) || !(pxLeveysasteessa > 0)) return parit;
    const askel = valitseAskel(pxLeveysasteessa);
    const reunaA = kaavat.lat(ruutu.lautaY(-LIUKUVARA));
    const reunaB = kaavat.lat(ruutu.lautaY(ruutu.korkeus + LIUKUVARA));
    const alku = Math.ceil(Math.min(reunaA, reunaB) / askel) * askel;
    const loppu = Math.max(reunaA, reunaB);
    for (let lat = alku; lat <= loppu + 1e-9; lat += askel) {
      parit.push([ruutu.py(kaavat.y(lat)), asteTeksti(lat, ['P', 'E'])]);
    }
    return parit;
  });
}

/** Mittaus ja ladonta yhdessä: näkymän asettuminen ja taulun avaus. */
function paivitaViivaimet(ui) {
  if (!ui.fokusViivaimet?.isConnected) return;
  paivitaPerusta(ui);
  piirraViivaimet(ui);
}

/* --------------------------------------- viivaimet elävät liikkeen mukana */

/*
 * LUKEMAT PÄIVITTYVÄT REAALIAJASSA (omistajan tilaus 28.8.2026):
 * *"kartan reunojen leveys-/pituuspiirimerkinnät feidataan nyt pois
 * liikkeen ajaksi; muuta ne päivittymään reaaliajassa panoroitaessa ja
 * zoomatessa."*
 *
 * MIKÄ MUUTTUI. Ennen merkit laskettiin vasta kun näkymä oli asettunut,
 * ja koska liikkeen aikana ne olisivat väittäneet edellisen ruudun
 * asteita, koko nauha liukui ruudun ulkopuolelle eleen ajaksi. Nyt
 * lukema on oikea joka kehyksellä, joten piiloa ei tarvita: viivain on
 * kartan mitta, ja mitta luetaan silloin kun karttaa liikutetaan.
 *
 * MIKSI SE ON HALPAA (ks. "KAMERAN LUVUT ILMAN ASETTELUN LUKEMISTA").
 * Kehyksessä ei ole yhtäkään getBoundingClientRectia eikä yhtäkään
 * uutta solmua: paikat lasketaan levossa mitatusta perustasta ja
 * kartan omasta muunnoksesta, merkit ovat nauhojen omassa varastossa
 * ja teksti kirjoitetaan vain kun lukema oikeasti vaihtuu. Juuri tämä
 * on v1115:n oppi — silmukka, joka lukee asettelua, tekee
 * panoroinnista tahmeaa riippumatta siitä, kuinka vähän se piirtää.
 *
 * === MISTÄ LIIKE TIEDETÄÄN ===
 *
 * Kartta ei kutsu tätä moduulia liikkeen aikana — eikä saa kutsua, sillä
 * juuri sen välttäminen tekee panoroinnista sujuvaa (js/kartta.js
 * asetaPan: "siirron aikana EI piirretä bittikarttaa"). Signaali
 * KATSOTAAN siis kartasta itsestään, tässä moduulissa, kahdella
 * tarkkailijalla:
 *
 *   1. LAUDAN JA SIIRTOKUOREN OMAT ATTRIBUUTIT. Panorointi on
 *      kuoren `style.transform` (`.kartta-kuori`, wrapper-siirto
 *      26.8.2026) ja zoomi laudan `viewBox` + `style.width/height`
 *      (js/kartta.js asetaPan, fitViewBox, kamera-ajot). Yksikään muu
 *      kuin kartan liike ei kirjoita niihin, joten MutationObserver
 *      näiden päällä on täsmälleen "kartta liikkui juuri nyt".
 *
 *      TÄSSÄ ON MYÖS PERUSTAN VANHENEMINEN. `style.transform` on pelkkä
 *      siirto, jonka kehys osaa lukea itse — mutta viewBox ja
 *      inline-mitat muuttavat laudan ASETTELUA, ja silloin perusta on
 *      mitattava uudelleen. Se tehdään tässä, tarkkailijan
 *      takaisinkutsussa: kerran zoomiporrasta kohti, ei kertaakaan
 *      kehyksessä.
 *   2. RUNGON LIIKELUOKAT. Zoomiliuku ja kamera-ajo asettavat lopullisen
 *      muunnoksen kerralla ja antavat CSS:n hoitaa välikuvat — silloin
 *      attribuutti muuttuu vain kerran, vaikka kuva liikkuu vielä
 *      puoli sekuntia. body-luokat (`zoom-kaynnissa`, `kartta-raahaus`,
 *      ...) kertovat sen ajan, ja niiden ollessa päällä lepoa
 *      siirretään eteenpäin.
 *
 * Näin kartta.js:ään ja ui.js:ään ei tarvitse koskea lainkaan.
 */

/** Viive liikkeen päättymisestä siihen, kun kalusteet mitataan uudelleen. */
const LEPO_MS = 480;
/** Uusi yritys, jos kartta on yhä liikkeessä (esim. zoomiliuku kesken). */
const UUSI_YRITYS_MS = 140;

/*
 * Rungon luokat, jotka tarkoittavat "kuva liikkuu VIELÄ".
 *
 * TILALUOKKA EI OLE LIIKELUOKKA. Tämä lista on tarkka juuri siksi, että
 * ensimmäinen versio ei ollut: siihen otettiin mukaan `manner-zoom` ja
 * `aloitus-zoom`, jotka kuulostavat liikkeeltä mutta ovat TILOJA — ne
 * kertovat, että kartta on lähikuvassa, ja pysyvät rungossa niin kauan
 * kuin pelaaja siellä on (js/kartta.js poistaa ne vasta lähikuvasta
 * poistuttaessa). Viivaimet jäivät ruudun ulkopuolelle pysyvästi, koska
 * "liike" ei loppunut koskaan. Mukaan kelpaavat vain luokat, jotka
 * jokin ajastin tai eleen loppu ottaa varmasti pois.
 *
 * Lista on sama kuin pelin omalla "onko ruutu rauhassa" -tarkistuksella
 * (js/ui.js tarkkuusOdotus) — sama kysymys, sama vastaus.
 */
const LIIKELUOKAT = [
  'kartta-raahaus', 'zoom-kaynnissa', 'manner-odottaa', 'flight-active',
];

const kartanLiike = () => LIIKELUOKAT.some((l) => document.body.classList.contains(l));

/**
 * Yksi kehys liikkeen aikana: lukemat siihen kohtaan, jossa kartta on.
 *
 * SILMUKKA EI MITTAA MITÄÄN. Jos perusta puuttuu (uusi lauta, ruutu
 * juuri ilmestynyt), kehys ohitetaan ja perusta mitataan siellä missä
 * mittaaminen on halpaa: liikkeen lopun levossa. Väärä lukema ei
 * pääse ruudulle, koska piirtoa ei silloin tehdä lainkaan.
 */
function elavaKehys(ui) {
  const vahti = ui.fokusViivainVahti;
  if (!vahti) return;
  vahti.kehys = 0;
  if (!vahti.liikkeessa) return;
  const sailio = ui.fokusViivaimet;
  if (sailio?.isConnected && !sailio.hidden && ui.fokusViivainPerusta?.kaistat) {
    piirraViivaimet(ui);
  }
  vahti.kehys = requestAnimationFrame(() => elavaKehys(ui));
}

/**
 * Kartta liikkui: elävä ladonta käyntiin ja lepolaskuri alusta.
 *
 * `asettelu` kertoo, että muutos koski viewBoxia tai inline-mittoja eli
 * laudan asettelua — silloin perusta on mitattava uudelleen ennen
 * seuraavaa kehystä (ks. tarkkailijan perustelu yllä).
 */
function merkitseViivainLiike(ui, asettelu) {
  const sailio = ui.fokusViivaimet;
  const vahti = ui.fokusViivainVahti;
  if (!sailio || !vahti || sailio.hidden) return;
  if (asettelu) paivitaPerusta(ui);
  vahti.liikkeessa = true;
  clearTimeout(vahti.ajastin);
  vahti.ajastin = setTimeout(() => viivaimetLepoon(ui), LEPO_MS);
  if (!vahti.kehys) vahti.kehys = requestAnimationFrame(() => elavaKehys(ui));
}

/**
 * Liike loppui: silmukka seis ja kalusteet mitattuna uudelleen.
 *
 * Kalusteet (kartuutsi, mittajana, zoomiportaat, pöllö) voivat vaihtaa
 * kokoa eleen aikana — mittajanan luku pitenee zoomatessa ja kartuutsi
 * saa uuden maan nimen — joten niiden varaamat kaistat luetaan levossa
 * uudelleen. Silmukan aikana käytetään eleen alun mittoja: pari
 * pikseliä väärässä kohdassa oleva aukko on hinta, jonka sujuvuus
 * maksaa mielellään.
 */
function viivaimetLepoon(ui) {
  const vahti = ui.fokusViivainVahti;
  if (!vahti) return;
  if (kartanLiike()) {
    vahti.ajastin = setTimeout(() => viivaimetLepoon(ui), UUSI_YRITYS_MS);
    return;
  }
  vahti.liikkeessa = false;
  cancelAnimationFrame(vahti.kehys);
  vahti.kehys = 0;
  paivitaViivaimet(ui);
}

/** Tarkkailijat pois ja silmukka seis. */
function puraViivainVahti(vahti) {
  if (!vahti) return;
  vahti.liikkeessa = false;
  clearTimeout(vahti.ajastin);
  cancelAnimationFrame(vahti.kehys);
  vahti.lauta?.disconnect();
  vahti.runko?.disconnect();
}

/**
 * Kytkee liiketarkkailijat, jos niitä ei vielä ole tälle laudalle.
 *
 * LAUTA VOI VAIHTUA ILMAN ETTÄ VIIVAIMET VAIHTUVAT: uusi paketti luo
 * uuden svg-elementin karttaruudun sisään, mutta säiliö jää paikalleen
 * eikä rakenna() aja itseään uudelleen. Siksi tarkkailija tunnistetaan
 * siitä laudasta, jota se katsoo — vanha jäisi muuten tuijottamaan
 * irronnutta elementtiä, eikä kartan liike näkyisi enää missään.
 */
function vahdiKartanLiiketta(ui) {
  const vanha = ui.fokusViivainVahti;
  if (vanha && vanha.lautaOsa === ui.svg) return;
  puraViivainVahti(vanha);
  const vahti = {
    lautaOsa: ui.svg, ajastin: 0, kehys: 0, liikkeessa: false,
  };
  if (ui.svg) {
    vahti.lauta = new MutationObserver((muutokset) => {
      // Vain viewBox ja inline-mitat vanhentavat perustan; pelkkä
      // muunnos (style) on siirto, jonka kehys lukee itse.
      const asettelu = muutokset.some((m) => m.attributeName !== 'style');
      merkitseViivainLiike(ui, asettelu);
    });
    vahti.lauta.observe(ui.svg, {
      attributes: true,
      attributeFilter: ['style', 'viewBox', 'width', 'height'],
    });
    /*
     * SIIRTOKUORI SAMALLE TARKKAILIJALLE (wrapper-siirto 26.8.2026).
     * Panoroinnin muunnos kirjoitetaan nykyään kuoreen, eikä lauta
     * itse muutu eleen aikana lainkaan — ilman tätä havaintoa
     * viivaimet eivät enää tietäisi kartan liikkuvan. Kuoresta
     * kelpaa vain `style`, joten se ei koskaan vanhenna perustaa.
     */
    if (ui.karttaKuori) {
      vahti.lauta.observe(ui.karttaKuori, {
        attributes: true,
        attributeFilter: ['style'],
      });
    }
  }
  /*
   * Runkoa katsotaan LUOKKALISTAN TILANA eikä muutoksena: bodyn
   * luokkiin kirjoitetaan pelin joka käänteessä (lehdet, paneelit,
   * tilat), ja jos jokainen niistä työntäisi viivaimet ulos, ne
   * vilkkuisivat läpi pelin. Vain liikeluokkien totuusarvon vaihtuminen
   * on kartan liikettä.
   */
  let edellinen = kartanLiike();
  vahti.runko = new MutationObserver(() => {
    const nyt = kartanLiike();
    if (nyt === edellinen) return;
    edellinen = nyt;
    merkitseViivainLiike(ui, false);
  });
  vahti.runko.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  ui.fokusViivainVahti = vahti;
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

/* Rako taulun alareunan ja kartuutsin yläreunan väliin. Pieni, koska
 * juuri raon pienuus tekee kahdesta kalusteesta yhden (omistaja
 * 27.8.2026: *"muodostavat yhtenäisen kokonaisuuden"*). */
const TAULUN_RAKO = 6;

/**
 * MAATAULUN ALAREUNA MITATAAN KARTUUTSISTA — samasta syystä kuin
 * neliönapin paikka mitataan sen leveydestä (ks. paivitaNappipaikka).
 *
 * Käsin kirjoitettu rem-luku ei voi osua kartuutsin yläreunaan, koska
 * kalusteet eivät ole ankkuroituina samaan viivaan: kartuutsi on
 * karttaruudun alalaidassa `bottom: 0.9rem` ja saa turva-alueen mukaan
 * vasta kapealla ruudulla, kun taas taulu laski turva-alueen aina
 * mukaan. iPadilla ero oli tasan turva-alueen verran, ja juuri se rako
 * sai taulun näyttämään omalta erilliseltä ikkunaltaan.
 *
 * MITTA LASKETAAN SÄILIÖN OMASTA ANKKURISTA, EI KARTTARUUDUN
 * ALAREUNASTA. Sekä taulu että mittasäiliö ovat karttaruudun
 * absoluuttisia lapsia ja molemmat ankkuroitu `bottom`-arvolla, joten
 * oikea mitta on säiliön oma `bottom` plus kartuutsin korkeus. Erotus
 * karttaruudun alareunasta olisi sama luku vain silloin, kun ruutu on
 * juuri mitatun korkuinen — ja karttaruutu venyy ja kutistuu kesken
 * pelin (fokusvirran kortti), jolloin taulu jäisi kellumaan kauas
 * kartuutsista seuraavaan päivitykseen asti.
 *
 * LIIKU-NELIÖ OTETAAN MUKAAN. Se on kartuutsin rinnalla mutta hitusen
 * ylempänä (alanappirivi asuu .rail-kerroksessa eikä karttaruudussa),
 * ja taulu peittäisi pelin ainoan liikkumisnapin, jos ylin reuna
 * luettaisiin pelkästä kartuutsista. Ero luetaan näiden kahden
 * ruutulaatikon erotuksena, joka ei riipu karttaruudun mitoista.
 *
 * Muuttuja asetetaan bodyyn samasta syystä kuin --fokus-nappipaikka.
 */
function paivitaTaulunPohja(ui) {
  const kartuutsi = ui.fokusKartuutsi;
  const sailio = ui.fokusmitatSailio;
  if (!kartuutsi || !sailio) return;
  const korkeus = kartuutsi.offsetHeight;
  const ankkuri = parseFloat(getComputedStyle(sailio).bottom);
  if (!(korkeus > 0) || !Number.isFinite(ankkuri)) return;
  const oma = kartuutsi.getBoundingClientRect();
  const nappi = document.querySelector('.toimintorivi.rivi-yksi .monitoimi-nappi');
  const napinRuutu = nappi?.getBoundingClientRect();
  // Kuinka paljon neliö on kartuutsia ylempänä (nolla tai enemmän).
  const napinYli = napinRuutu?.height > 0 && oma.height > 0
    ? Math.max(0, oma.top - napinRuutu.top)
    : 0;
  const pohja = Math.round(ankkuri + korkeus + napinYli + TAULUN_RAKO);
  if (!(pohja > 0)) return;
  document.body.style.setProperty('--fokus-taulupohja', `${pohja}px`);
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
      puraViivainVahti(ui.fokusViivainVahti);
      ui.fokusViivainVahti = null;
      // Perusta on mitattu ruudusta, jota ei enää ole: se mitataan
      // uudelleen kun viivaimet palaavat.
      ui.fokusViivainPerusta = null;
      document.body.style.removeProperty('--fokus-nappipaikka');
      document.body.style.removeProperty('--fokus-taulupohja');
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

  // Neliönapin paikka ja taulun alareuna mitataan joka päivityksellä:
  // ruudun leveys (ja sen myötä kartuutsin kirjasinkoko) sekä
  // karttaruudun korkeus voivat vaihtua kesken pelin.
  paivitaNappipaikka(ui);
  paivitaTaulunPohja(ui);
  // Liiketarkkailu kytketään tässä eikä rakenna()ssa: lauta voi vaihtua
  // säiliön alta (ks. vahdiKartanLiiketta).
  vahdiKartanLiiketta(ui);
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
  puraViivainVahti(ui.fokusViivainVahti);
  ui.fokusViivainVahti = null;
  ui.fokusmitatSailio?.remove();
  ui.fokusMaataulu?.remove();
  ui.fokusViivaimet?.remove();
  document.body.style.removeProperty('--fokus-nappipaikka');
  document.body.style.removeProperty('--fokus-taulupohja');
  ui.fokusmitatSailio = null;
  ui.fokusKartuutsi = null;
  ui.fokusJana = null;
  ui.fokusMaataulu = null;
  ui.fokusViivaimet = null;
  ui.fokusViivainPerusta = null;
  ui.fokusMitatAvain = null;
  ui.fokusMaatauluIso = null;
  // Varmistus: taulu on nyt poissa, joten sen lippukaan ei saa jäädä
  // piilottamaan Matkusta-nappia (#102). avaaMaataulu yllä hoitaa tämän
  // normaalisti, mutta se palaa saman tien, jos taulua ei ollut.
  document.body.classList.remove('maataulu-auki');
}
