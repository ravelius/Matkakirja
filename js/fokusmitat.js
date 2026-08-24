/*
 * FOKUSNÄKYMÄN DYNAAMISET MITAT — mittajana, maan kartuutsi ja sen
 * takaa avautuva maataulu.
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
    return {
      // Koko kierros mahtuu laudan leveyteen, joten aste on leveys/360.
      yksikkoaAsteessa: p.leveys / 360,
      lat: (y) => {
        const my = y / skaala + yPohjoinen;
        return (Math.atan(Math.exp(-my / 1.25)) - Math.PI / 4) / 0.4 / RAD;
      },
    };
  }
  return {
    yksikkoaAsteessa: Math.abs(p.lonA),
    lat: (y) => (y - p.latB) / p.latA,
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
 * Säiliö on yksi: leveällä ruudulla se venyy laidasta laitaan ja
 * asettaa kartuutsin vasempaan ja janan oikeaan alanurkkaan, kapealla
 * se kutistuu vasempaan laitaan ja pinoaa ne päällekkäin (CSS).
 * Säiliö ei ota napautuksia vastaan (pointer-events: none), joten
 * kartta ja alanapit toimivat sen läpi; vain kartuutsi ja maataulu
 * ovat napautettavia.
 */
function rakenna(ui) {
  // Varmistus kaksoiskappaleita vastaan, kuten maapillerillä.
  for (const vanha of ui.mapPane.querySelectorAll('.fokusmitat, .fokus-maataulu')) {
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
  return sailio;
}

/*
 * MAATAULU: alhaalta liukuva, kevyesti läpinäkyvä taulu maan
 * perustiedoista (omistaja 25.8.2026).
 *
 * KOLME SÄÄNTÖÄ:
 *
 * 1. TAULU EI PEITÄ ALANAPPEJA. Sen alareuna on alanappirivin
 *    yläpuolella (CSS `bottom`), joten Liiku ja Tutki ovat käytössä
 *    koko ajan. Kartta jää näkyviin taustalle, koska taulu on
 *    läpikuultava.
 * 2. VIERITYS EI PANOROI KARTTAA. Taulu asuu karttaruudun sisällä,
 *    jonka oma kuuntelija ottaisi sormen panoroinniksi. Elementti
 *    pysäyttää osoitin-, kosketus- ja rullaustapahtumat itseensä ja
 *    sallii pystyvierityksen (`touch-action: pan-y`). Jos
 *    js/kartta.js:ään tulee KELLUVA_UI-valitsinlista, tämän luokan
 *    nimi on `fokus-maataulu`.
 * 3. LIIKE ON TRANSFORM JA OPACITY, EI SUODATIN. Sama iOS-sääntö kuin
 *    kartan kerroksilla; lisäksi prefers-reduced-motion sammuttaa
 *    siirtymän kokonaan (CSS).
 */
function rakennaMaataulu(ui) {
  const taulu = luo('div', 'fokus-maataulu');
  taulu.setAttribute('role', 'dialog');
  taulu.setAttribute('aria-label', 'Maan perustiedot');
  // Suljettuna taulu on olemassa mutta ei tavoitettavissa: hidden
  // katkaisisi siirtymän, inert pitää sen pois kohdistusjärjestyksestä.
  taulu.inert = true;

  const ylarivi = luo('div', 'fokus-maataulu-ylarivi');
  ylarivi.appendChild(luo('h2', 'fokus-maataulu-nimi', ''));
  const lehti = luo('button', 'fokus-maataulu-lehti', '+');
  lehti.type = 'button';
  lehti.title = 'Avaa maan lehti';
  lehti.addEventListener('click', (e) => {
    e.stopPropagation();
    const iso = ui.fokusMaatauluIso;
    avaaMaataulu(ui, false);
    if (iso) ui.avaaMaalehti?.(iso);
  });
  ylarivi.appendChild(lehti);
  const sulje = luo('button', 'fokus-maataulu-sulje', '×');
  sulje.type = 'button';
  sulje.setAttribute('aria-label', 'Sulje maan tiedot');
  sulje.addEventListener('click', (e) => {
    e.stopPropagation();
    avaaMaataulu(ui, false);
  });
  ylarivi.appendChild(sulje);
  taulu.appendChild(ylarivi);

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
  // Kartuutsi ja jana väistyvät auki olevan taulun alta, jottei
  // kapealla ruudulla synny päällekkäisyyttä.
  ui.fokusmitatSailio?.classList.toggle('taulun-alla', ui.fokusMaatauluAuki);

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
  taulu.querySelector('.fokus-maataulu-nimi').textContent = nimi;
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
  ui.fokusmitatSailio = null;
  ui.fokusKartuutsi = null;
  ui.fokusJana = null;
  ui.fokusMaataulu = null;
  ui.fokusMitatAvain = null;
  ui.fokusMaatauluIso = null;
}
