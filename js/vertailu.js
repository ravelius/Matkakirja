/*
 * Vertailutila ja Maiden tiedot -tila: kartan tilat, joissa kaupungit
 * väistyvät ja maat ovat napautettavia. Siirretty js/ui.js:stä
 * 17.8.2026 (remontin M3, mallin B pilotti). Funktiot saavat
 * ui-olion ensimmäisenä parametrinaan: ne LUKEVAT ui:n tilaa ja
 * kutsuvat sen julkisia metodeja, mutta KIRJOITTAVAT vain oman
 * piirteensä kenttiä (ui.vertailu*, ui.maatiedot*) — tämä on mallin
 * B omistajuussääntö.
 *
 * MOLEMMAT TILAT OSAAVAT MYÖS PALLOLAUDAN (aalto 1C,
 * docs/moduulit/karttapallo.md luku 10). Kun pallo on lauta, maita ei
 * piirretä SVG-kerrokseen vaan pallon pinnalle laudan linssiapurin
 * kautta (`ui.pallolauta.linssit`): muodot monikulmioina
 * (`polygonit`), nimet CSS2D-merkkeinä (`merkit`) ja tilan sammuessa
 * `pura`. Napautus, valinta, alapalkki ja maakyltti ovat samat
 * molemmilla laudoilla — vain piirtotapa vaihtuu, ja se vaihtuu
 * yhdessä haarassa piirtofunktion alussa.
 */

import { el } from './mapart.js';
import { sfx } from './sound.js';
import { MAATIEDOT } from './sisaltotaulut.js';
import { TOAST_MS, html } from './ui-apurit.js';

/*
 * Vertailun värit valintajärjestyksessä: sama lista kuin
 * js/maakayrat.js:n VERTAILUVARIT. Se on tässä toisintona, koska
 * karttanäkymän alapalkki tarvitsee värit heti eikä maakayrat.js
 * lataudu ennen kuin vertailunäkymä avataan (laiska tuonti, ks.
 * piirraMaaNumerotSivu). Testi vahtii, etteivät listat eriydy.
 */
const VERTAILUVARIT = [
  'maakayra-viiva', 'maakayra-toinen', 'maakayra-kolmas', 'maakayra-neljas',
];

/*
 * ===================================================================
 * MAAT PALLOLLE (aalto 1C)
 * ===================================================================
 *
 * Laudan maamuodot (map.countryShapes[iso].renkaat) ovat LAUDAN
 * yksiköissä; pallo puhuu asteita. Käännös tehdään kerran pakkaa
 * kohti (välimuisti alempana) ja se on tässä omana puhtaana
 * funktionaan, jotta sen voi ajaa Nodessa ilman selainta
 * (tests/maapolygonit-pallolla.test.mjs).
 *
 * KIERTÄVÄN LAUDAN SAUMA. Maailmankartta jatkuu reunan yli, ja
 * laudan käännös (js/fokusmitat.js laudaltaAsteiksi) kietoo
 * pituusasteen aina välille [−180°, 180°]. Rengas, joka kulkee
 * sauman yli, saisi siis keskelleen 360 asteen hypyn — pallolla se
 * piirtyisi vyönä maailman ympäri. Hyppy puretaan kulkemalla rengas
 * läpi ja pitämällä peräkkäiset pisteet lähekkäin (`kierto`), minkä
 * jälkeen koko rengas siirretään takaisin niin, että sen keskikohta
 * on välillä [−180°, 180°]. Silloin YKSIKÄÄN RENKAAN SIVU ei ylitä
 * 180 asteen pituuseroa, ja Aleuttien kaltainen sauman ylittävä
 * saarijono jää yhdeksi ehjäksi kappaleeksi hieman ±180 asteen yli —
 * pallolla se on sama piste, mutta kolmiointi ei enää kierrä väärin
 * päin maailman ympäri.
 *
 * JOKAINEN RENGAS ON OMA MONIKULMIONSA (MultiPolygon), koska laudan
 * aineisto ei erottele saaria ja reikiä: renkaat piirretään
 * tasokartallakin toisistaan riippumatta (`M…Z` kukin erikseen).
 */

/** Maakerroksen korkeus pallon pinnasta — pelin merkkien tasalla. */
export const MAAPOLYGONIN_KORKEUS = 0.004;

/**
 * Yksi rengas (laudan pisteitä) asteiksi ja saumasta ehjäksi.
 * Palauttaa GeoJSON-renkaan [[lon, lat], …] suljettuna, tai null jos
 * pisteitä ei kertynyt kolmiollista.
 */
function rengasAsteiksi(rengas, asteet) {
  const pisteet = [];
  let edellinen = null;
  let kierto = 0;
  for (const [x, y] of rengas) {
    const a = asteet({ x, y });
    const lat = a?.lat;
    const raaka = a?.lon ?? a?.lng;
    if (!Number.isFinite(lat) || !Number.isFinite(raaka)) continue;
    if (edellinen !== null) {
      while (raaka + kierto - edellinen > 180) kierto -= 360;
      while (raaka + kierto - edellinen < -180) kierto += 360;
    }
    const lon = raaka + kierto;
    edellinen = lon;
    pisteet.push([lon, lat]);
  }
  if (pisteet.length < 3) return null;
  // Rengas keskelle maailmaa: kierron purku on saattanut viedä sen
  // kokonaan sauman toiselle puolelle.
  let pieninLon = pisteet[0][0];
  let suurinLon = pisteet[0][0];
  for (const [lon] of pisteet) {
    if (lon < pieninLon) pieninLon = lon;
    if (lon > suurinLon) suurinLon = lon;
  }
  const keski = (pieninLon + suurinLon) / 2;
  let siirto = 0;
  while (keski + siirto > 180) siirto -= 360;
  while (keski + siirto < -180) siirto += 360;
  if (siirto) for (const p of pisteet) p[0] += siirto;
  // GeoJSON sulkee renkaan; laudan aineistossa osa on auki.
  const eka = pisteet[0];
  const vika = pisteet[pisteet.length - 1];
  if (eka[0] !== vika[0] || eka[1] !== vika[1]) pisteet.push([eka[0], eka[1]]);
  return pisteet;
}

/**
 * Laudan maamuodot pallon monikulmioiksi.
 *
 * `asteet` on laudan oma käännös ({ x, y } → { lat, lon }), eli
 * pallolaudalla `ui.pallolauta.asteet` (js/pallolauta/lauta.js
 * pallonAsteet). Palauttaa Mapin iso → { nimi, geometry, keskus:
 * { lat, lng }, leveys }, jossa `geometry` on GeoJSON Polygon tai
 * MultiPolygon asteina ja `leveys` on yhä LAUDAN yksiköissä — nimen
 * piirtoehto (leveys >= 60) on sama luku molemmilla laudoilla.
 */
export function maapolygonitPallolle(map, asteet) {
  const tulos = new Map();
  const muodot = map?.countryShapes;
  if (!muodot || typeof asteet !== 'function') return tulos;
  for (const [iso, maa] of Object.entries(muodot)) {
    if (!maa?.renkaat?.length) continue;
    const renkaat = [];
    for (const rengas of maa.renkaat) {
      const kaannetty = rengasAsteiksi(rengas, asteet);
      if (kaannetty) renkaat.push(kaannetty);
    }
    if (!renkaat.length) continue;
    const k = asteet({ x: maa.keskus?.[0], y: maa.keskus?.[1] });
    tulos.set(iso, {
      nimi: maa.nimi,
      leveys: maa.leveys ?? 0,
      keskus: k ? { lat: k.lat, lng: k.lon ?? k.lng } : null,
      geometry: renkaat.length === 1
        ? { type: 'Polygon', coordinates: [renkaat[0]] }
        : { type: 'MultiPolygon', coordinates: renkaat.map((r) => [r]) },
    });
  }
  return tulos;
}

/*
 * Käännös on sama koko pelin ajan (lauta ei muutu kesken pakan), ja
 * maailmankartalla se on 26 000 pistettä — se tehdään kerran pakkaa
 * kohti. WeakMap eikä Map: kartta-olio saa kadota tallenteen mukana.
 */
const polygoniMuisti = new WeakMap();

/** Onko pallo lauta juuri nyt (tasokartta nukkuu)? */
function pallolautaPaalla(ui) {
  return ui.pallolautaPaalla ? ui.pallolautaPaalla() : Boolean(ui.pallolauta);
}

/** Pakan maat pallon muodossa (välimuistista). */
function pallonMaat(ui) {
  const map = ui.game.pack.map;
  if (!map) return new Map();
  const valmis = polygoniMuisti.get(map);
  if (valmis) return valmis;
  const tulos = maapolygonitPallolle(map, ui.pallolauta?.asteet);
  // Tyhjää tulosta ei muisteta: se tarkoittaa, ettei laudalla ollut
  // vielä käännöstä, ja seuraava piirto saa yrittää uudestaan.
  if (tulos.size) polygoniMuisti.set(map, tulos);
  return tulos;
}

/*
 * MAAN SÄVYT PALLOLLA — samat värit kuin css:n .vertailu-maa ja
 * .maatiedot-maa, koska sama tila ei saa näyttää kahdelta. Globe.gl
 * ottaa värin merkkijonona (rgba käy), ei luokkana: pallon pinnalla ei
 * ole css:ää, jolla maan täytön voisi vaihtaa.
 *
 * Kolmas sävy `himmea` on pallon oma lisä samasta musteesta: kartalla
 * hiiren osoitin kertoo, mitkä maat ovat napautettavia, mutta pallolla
 * osoitinta ei ole — kun vertailu on täynnä (VERTAILU_MAX), valitsematta
 * jääneet himmenevät, jotta täysi lista näkyy ennen kuin sitä yrittää
 * kasvattaa.
 */
export const VERTAILUN_SAVYT = {
  valittu: { vari: 'rgba(176, 58, 43, 0.3)', reuna: '#b03a2b' },
  valittavissa: { vari: 'rgba(120, 96, 62, 0.06)', reuna: 'rgba(70, 51, 31, 0.55)' },
  himmea: { vari: 'rgba(120, 96, 62, 0.03)', reuna: 'rgba(70, 51, 31, 0.25)' },
};
export const MAATIETOJEN_SAVYT = {
  valittu: { vari: 'rgba(176, 34, 34, 0.16)', reuna: 'rgba(140, 30, 30, 0.9)' },
  valittavissa: { vari: 'rgba(140, 110, 70, 0.05)', reuna: 'rgba(70, 51, 31, 0.55)' },
};

/**
 * Maan nimi pallolle: yksi kevyt tekstielementti, jonka kirjasin ja
 * muste tulevat css:stä (.pallolauta-maanimi). Koko on RUUTUVAKIO
 * kuten muillakin pallon merkeillä — CSS2D-elementti ei skaalaudu
 * pallon mukana, joten tasokartan leveydestä laskettu kirjasinkoko ei
 * käänny tänne.
 */
function maanimiElementti(d) {
  const teksti = document.createElement('span');
  teksti.className = 'pallolauta-maanimi';
  teksti.textContent = d.nimi;
  return teksti;
}

/**
 * Maat pallon pinnalle. `osa` on linssiapurin osarekisterin avain,
 * `savy(iso)` antaa maan sävyn ja `napautus(iso)` sen teon.
 *
 * Palauttaa true, jos MAAT KUULUVAT PALLOLLE — myös silloin, kun
 * laudalta puuttuu vielä linssiapuri: tasokartta nukkuu pallon alla,
 * eikä sen kerrokseen ole mitään mieltä piirtää.
 */
function piirraMaatPallolle(ui, { osa, savy, napautus, nimienOsa = null }) {
  if (!pallolautaPaalla(ui)) return false;
  const linssit = ui.pallolauta?.linssit;
  if (!linssit) return true;
  const maat = pallonMaat(ui);
  const polygonit = [];
  const nimet = [];
  for (const [iso, maa] of maat) {
    const s = savy(iso);
    polygonit.push({
      avain: iso,
      geometry: maa.geometry,
      vari: s.vari,
      reuna: s.reuna,
      korkeus: MAAPOLYGONIN_KORKEUS,
      napautus: () => napautus(iso),
    });
    // Nimi vain tarpeeksi leveälle maalle — sama ehto kuin
    // tasokartalla, ettei pallo täyty pikkuvaltioiden nimistä.
    if (nimienOsa && maa.keskus && maa.leveys >= 60) {
      nimet.push({
        avain: `${nimienOsa}:${iso}`,
        laji: 'linssi',
        lat: maa.keskus.lat,
        lng: maa.keskus.lng,
        nimi: maa.nimi,
        elementti: maanimiElementti,
      });
    }
  }
  linssit.polygonit(osa, polygonit);
  if (nimienOsa) linssit.merkit(nimienOsa, nimet);
  return true;
}

/** Maakerros pallolta pois (tilan sammuessa). */
function puraMaatPallolta(ui, osat) {
  const linssit = ui.pallolauta?.linssit;
  if (!linssit) return;
  for (const osa of osat) linssit.pura(osa);
}

/*
 * ===================================================================
 * VERTAILUTILA (v321)
 * ===================================================================
 *
 * Omistajan malli 7.8.2026: *"vertailulinssi vois toimia hieman eri
 * tavalla kuin nyt. eli ei upoteta näkymää tutki osioon vaan linssi
 * toimisi suoraan karttanäkymässä mutta muuttaisi sen niin että
 * kaupungit poistuisivat ja maiden rajat näkyisivät selvemmin."*
 *
 * Tila on rakennettu radiotilan mallin mukaan: bodyn luokka piilottaa
 * muun toiminnan, kartalle tulee oma kerros ja alanapit korvautuvat
 * omalla palkilla. Näin tila purkautuu varmasti myös silloin, kun
 * linssi sammuu jotain muuta kautta.
 *
 * Valinta on enintään kolme maata + Suomi valmiina vaihtoehtona.
 * Suomi ei ole erikoistapaus koodissa: se on tavallinen valinta,
 * joka vain asetetaan valmiiksi, ja sen voi ottaa poiskin.
 */
export function vertailuPaalla() {
  return document.body.classList.contains('vertailu-tila');
}

/** Enimmäismäärä: kolme maata + Suomi valmiina. */
export const VERTAILU_MAX = 4;

/** Kytkee vertailutilan päälle tai pois. */
export function tahdistaVertailu(ui, halutaan) {
  if (halutaan === vertailuPaalla()) {
    if (halutaan) rakennaVertailuPalkki(ui);
    return;
  }
  document.body.classList.toggle('vertailu-tila', halutaan);
  if (halutaan) {
    /*
     * Suomi valmiina vaihtoehtona (omistajan toive). Se otetaan
     * mukaan vain, jos laudalla on Suomen muoto — Afrikan laudalla
     * ei ole, eikä tyhjää valintaa kannata tehdä.
     */
    if (!ui.vertailuValinnat?.length) {
      const suomiOn = Boolean(ui.game.pack.map?.countryShapes?.FIN);
      ui.vertailuValinnat = suomiOn ? ['FIN'] : [];
    }
    piirraVertailuMaat(ui);
    rakennaVertailuPalkki(ui);
  } else {
    ui.vertailuKerros?.remove();
    ui.vertailuKerros = null;
    // Pallolaudalla maat ja nimet ovat laudan omissa kerroksissa.
    puraMaatPallolta(ui, ['vertailu', 'vertailu-nimet']);
    ui.vertailuPalkki?.remove();
    ui.vertailuPalkki = null;
    suljeVertailuNakyma();
  }
  ui.drawTargets();
}

/**
 * Kaikkien maiden muodot omaan kerrokseensa napautettavina.
 *
 * Kerros menee kaupunkien tilalle samaan juureen: se kiertyy ja
 * zoomautuu kartan mukana ilman omaa laskentaa. Nimi kirjoitetaan
 * vain maille, joiden muoto on tarpeeksi leveä — muuten pikkuvaltiot
 * täyttäisivät kartan kaunokirjoituksella.
 */
export function piirraVertailuMaat(ui) {
  const map = ui.game.pack.map;
  const muodot = map?.countryShapes;
  if (!muodot) return;
  /*
   * PALLOLAUDALLA MAAT OVAT PALLON PINNALLA. Valinnan vaihtuessa
   * lista asetetaan uudestaan (värit vaihtuvat) — kerrosta ei pureta,
   * jotta Globe.gl siirtää olemassa olevat monikulmiot eikä rakenna
   * niitä uudestaan joka napautuksella.
   */
  const valinnat = ui.vertailuValinnat ?? [];
  const taynna = valinnat.length >= VERTAILU_MAX;
  const pallolla = piirraMaatPallolle(ui, {
    osa: 'vertailu',
    nimienOsa: 'vertailu-nimet',
    savy: (iso) => {
      if (valinnat.includes(iso)) return VERTAILUN_SAVYT.valittu;
      return taynna ? VERTAILUN_SAVYT.himmea : VERTAILUN_SAVYT.valittavissa;
    },
    napautus: (iso) => valitseVertailuMaa(ui, iso),
  });
  if (pallolla || !ui.svg) return;
  ui.vertailuKerros?.remove();
  ui.vertailuKerros = el('g', { class: 'vertailu-maat' }, ui.boardRoot ?? ui.svg);
  for (const [iso, maa] of Object.entries(muodot)) {
    if (!maa?.renkaat?.length) continue;
    const d = maa.renkaat
      .map((r) => `M${r.map(([x, y]) => `${x},${y}`).join(' L')}Z`)
      .join(' ');
    const valittu = ui.vertailuValinnat?.includes(iso);
    const polku = el('path', {
      d,
      class: `vertailu-maa${valittu ? ' valittu' : ''}`,
      'aria-label': maa.nimi,
    }, ui.vertailuKerros);
    polku.addEventListener('click', (e) => {
      // Napautus ei saa vuotaa kartalle: maailmankartalla se
      // zoomaisi ja muualla kutistaisi päiväkirjan.
      e.stopPropagation();
      valitseVertailuMaa(ui, iso);
    });
    if (maa.leveys >= 60) {
      const koko = Math.max(11, Math.min(22, (maa.leveys * 0.8) / Math.max(4, maa.nimi.length)));
      const nimi = el('text', {
        x: maa.keskus[0],
        y: maa.keskus[1],
        class: 'vertailu-maa-nimi',
        'text-anchor': 'middle',
        'font-size': koko.toFixed(0),
      }, ui.vertailuKerros);
      nimi.textContent = maa.nimi;
    }
  }
}

/**
 * MAIDEN TIEDOT -TILA (v350).
 *
 * Sama kartan tila kuin vertailussa — kaupungit väistyvät ja maat
 * ovat napautettavia — mutta ele tarkoittaa eri asiaa: vertailu
 * KERÄÄ maita listalle, tämä AVAA yhden maan luettavaksi.
 *
 * Napautus valitsee maan: sen rajat korostuvat ja oikean yläkulman
 * maakyltti näyttää nimen ja lipun — kyltistä maan lehti aukeaa
 * (omistajan tarkennus 14.8.2026; aiemmin nimi ja "i" piirtyivät
 * kartalle). Kaksi vaihetta yhden sijaan siksi, että kartalla osuu
 * helposti väärään maahan — ensimmäinen napautus näyttää mihin
 * osui, vasta kyltti avaa lehden.
 */
export function tahdistaMaatiedot(ui, halutaan) {
  const paalla = document.body.classList.contains('maatiedot-tila');
  if (halutaan === paalla) return;
  document.body.classList.toggle('maatiedot-tila', halutaan);
  if (halutaan) {
    ui.maatiedotValittu = null;
    piirraMaatiedotMaat(ui);
  } else {
    ui.maatiedotKerros?.remove();
    ui.maatiedotKerros = null;
    puraMaatPallolta(ui, ['maatiedot']);
    ui.maatiedotValittu = null;
    // Maakyltti on maaselaimen oma kaluste: tilan sulkeutuessa se
    // katoaa kartalta kokonaan.
    palautaPilleriPelaajalle(ui);
  }
  ui.drawTargets();
}

/**
 * Maakyltti pois kartalta (maaselaimen sulkeutuessa).
 *
 * Kyltti näytti ennen pelaajan oman maan aina, mutta Raamattu
 * lakkautti sen pelinäkymästä (*"oikean yläkulman maakyltti
 * poistetaan"*, ks. js/ui.js paivitaMaaPilleri): maan nimen kertoo
 * kartuutsi vasemmassa alanurkassa. Kyltti on siis olemassa vain niin
 * kauan kuin maatiedot-tila on auki.
 *
 * Nimi on entinen, koska kutsupaikka on sama: tämä on se kohta, jossa
 * selailun jäljet siivotaan.
 */
export function palautaPilleriPelaajalle(ui) {
  ui.paivitaMaaPilleri(null, null);
}

/** Maiden muodot napautettavina; valitulle nimi ja "i". */
export function piirraMaatiedotMaat(ui) {
  const muodot = ui.game.pack.map?.countryShapes;
  if (!muodot) return;
  /*
   * PALLOLAUDALLA sama tila pallon pinnalla. Ele on kaksivaiheinen
   * kuten kartalla: napautus valitsee maan (rajat korostuvat ja
   * maakyltti kertoo nimen), ja lehden avaa kyltti — kyltti on
   * kartan ja pallon yhteinen kaluste (ui.paivitaMaaPilleri asuu
   * mapPanessa, ei laudassa), joten sen koodi on alla yhteinen.
   * Nimiä ei ladota: maaselaimessa nimen kertoo kyltti (14.8.2026).
   */
  if (piirraMaatPallolle(ui, {
    osa: 'maatiedot',
    savy: (iso) => (ui.maatiedotValittu === iso
      ? MAATIETOJEN_SAVYT.valittu
      : MAATIETOJEN_SAVYT.valittavissa),
    napautus: (iso) => {
      ui.maatiedotValittu = ui.maatiedotValittu === iso ? null : iso;
      sfx.play('paper');
      piirraMaatiedotMaat(ui);
    },
  })) {
    naytaMaakyltti(ui, muodot);
    return;
  }
  if (!ui.svg) return;
  ui.maatiedotKerros?.remove();
  ui.maatiedotKerros = el('g', { class: 'maatiedot-maat' }, ui.boardRoot ?? ui.svg);
  for (const [iso, maa] of Object.entries(muodot)) {
    if (!maa?.renkaat?.length) continue;
    const d = maa.renkaat
      .map((r) => `M${r.map(([x, y]) => `${x},${y}`).join(' L')}Z`)
      .join(' ');
    const valittu = ui.maatiedotValittu === iso;
    const polku = el('path', {
      d,
      class: `maatiedot-maa${valittu ? ' valittu' : ''}`,
      'aria-label': maa.nimi,
    }, ui.maatiedotKerros);
    polku.addEventListener('click', (e) => {
      // Napautus ei saa vuotaa kartalle (zoom, päiväkirjan kutistus).
      e.stopPropagation();
      ui.maatiedotValittu = valittu ? null : iso;
      sfx.play('paper');
      piirraMaatiedotMaat(ui);
    });
  }
  naytaMaakyltti(ui, muodot);
}

/**
 * Valitun maan nimi ja lippu MAAKYLTTIIN, ei kartalle (omistaja
 * 14.8.2026: "oikealla saisi näkyä sama maakyltti kuin normaali-
 * tilassa"). Laudalle jää vain rajakorostus; kyltti kertoo mihin osui,
 * ja kyltin napautus avaa maan lehden — sama nappi, sama ele kuin
 * normaalitilassa. Ilman valintaa kyltti katoaa.
 */
function naytaMaakyltti(ui, muodot) {
  const valittuIso = ui.maatiedotValittu;
  if (valittuIso) ui.paivitaMaaPilleri(muodot[valittuIso], valittuIso);
  else palautaPilleriPelaajalle(ui);
}

/** Maa valintaan tai pois siitä. Täysi lista ei ota enempää. */
export function valitseVertailuMaa(ui, iso) {
  const lista = ui.vertailuValinnat ?? [];
  if (lista.includes(iso)) {
    ui.vertailuValinnat = lista.filter((k) => k !== iso);
  } else {
    if (lista.length >= VERTAILU_MAX) {
      const laatikko = ui.buildToast({
        kind: 'info',
        text: `Vertailuun mahtuu ${VERTAILU_MAX} maata`,
        sub: 'Poista ensin jokin lappu alapalkista.',
      });
      setTimeout(() => ui.removeToast(laatikko), TOAST_MS.default);
      return;
    }
    ui.vertailuValinnat = [...lista, iso];
  }
  sfx.play('paper');
  piirraVertailuMaat(ui);
  rakennaVertailuPalkki(ui);
}

/**
 * Alapalkki Tutki- ja nopanheittonappien tilalle: valitut maat
 * lappuina ja oikeassa reunassa Vertaa-nappi.
 *
 * Palkki on bodyn lapsi eikä kartan: se ei saa vieriä kartan mukana
 * eikä kadota kosketuskohteitaan zoomatessa (sama ratkaisu kuin
 * Tutki-ikkunan sivunavigaatiossa).
 */
export function rakennaVertailuPalkki(ui) {
  if (!vertailuPaalla()) return;
  if (!ui.vertailuPalkki) {
    ui.vertailuPalkki = html('div', 'vertailu-palkki');
    document.body.appendChild(ui.vertailuPalkki);
  }
  const palkki = ui.vertailuPalkki;
  palkki.replaceChildren();
  const valitut = ui.vertailuValinnat ?? [];
  const muodot = ui.game.pack.map?.countryShapes ?? {};
  if (!valitut.length) {
    palkki.appendChild(html('p', 'vertailu-ohje', 'Napauta kartalta maat, joita haluat verrata.'));
    return;
  }
  for (const [i, iso] of valitut.entries()) {
    const lappu = html('button', 'vertailu-lappu');
    lappu.type = 'button';
    lappu.title = 'Poista vertailusta';
    const laatta = html('span', `vertailu-laatta ${VERTAILUVARIT[i] ?? ''}-laatta`);
    lappu.appendChild(laatta);
    lappu.appendChild(document.createTextNode(muodot[iso]?.nimi ?? iso));
    lappu.addEventListener('click', () => valitseVertailuMaa(ui, iso));
    palkki.appendChild(lappu);
  }
  const vertaa = html('button', 'primary vertailu-vertaa', 'Vertaa');
  vertaa.type = 'button';
  vertaa.disabled = valitut.length < 2;
  vertaa.title = valitut.length < 2 ? 'Valitse vähintään kaksi maata' : 'Avaa vertailu';
  vertaa.addEventListener('click', () => avaaVertailuNakyma(ui));
  palkki.appendChild(vertaa);
}

/**
 * Vertailunäkymä: valitut maat rinnakkain samoilla asteikoilla.
 *
 * Yläreunassa maiden napit (kytke päälle tai pois) ja "Muuta
 * valintoja", joka palaa kartalle — vertailu on siis kaksisuuntainen
 * eikä umpikuja (omistajan malli). Ylärivin napit eivät muuta
 * KARTAN valintaa vaan sitä, mitkä valituista piirretään: kartalta
 * poistaminen on eri asia kuin viivan sammuttaminen hetkeksi.
 *
 * Aineisto ja piirtäjä haetaan laiskasti kuten Maa numeroina
 * -sivulla: yhden tiedoston versio jää ilman kumpaakin ja saa saman
 * kohteliaan verkkoyhteysrivin.
 */
export async function avaaVertailuNakyma(ui) {
  const dialogi = document.getElementById('vertailu-dialog');
  const sisalto = document.getElementById('vertailu-sisalto');
  const ylarivi = document.getElementById('vertailu-ylarivi');
  if (!dialogi || !sisalto || !ylarivi) return;
  ui.vertailuPois ??= new Set();
  if (!dialogi.open) dialogi.showModal();
  ui.nollaaDialoginVieritys(dialogi);
  sisalto.replaceChildren(html('p', 'johdanto', 'Haetaan tilastoja…'));
  rakennaVertailuYlarivi(ui);
  try {
    const { lataaMaakayrat, piirraVertailu } = await import('./maakayrat.js');
    const data = await lataaMaakayrat();
    if (!dialogi.open) return;
    if (!data) {
      sisalto.replaceChildren(html('p', 'johdanto',
        'Tämä näkymä tarvitsee verkkoyhteyden ensimmäisellä avauksella '
        + '— luvut haetaan silloin talteen.'));
      return;
    }
    const isot = (ui.vertailuValinnat ?? []).filter((iso) => !ui.vertailuPois.has(iso));
    const kortit = {};
    const muodot = ui.game.pack.map?.countryShapes ?? {};
    for (const iso of isot) {
      kortit[iso] = {
        nimi: muodot[iso]?.nimi ?? iso,
        kartta: ui.piirraMaakartta(iso, null),
        tunnusluvut: rakennaVertailuTunnusluvut(ui, iso),
      };
    }
    piirraVertailu(sisalto, isot, data, { kortit });
  } catch (syy) {
    console.error(syy);
    sisalto.replaceChildren(html('p', 'johdanto', 'Tilastoja ei saatu haettua.'));
  }
}

/** Ylärivin napit: maat päälle/pois ja paluu kartalle. */
export function rakennaVertailuYlarivi(ui) {
  const ylarivi = document.getElementById('vertailu-ylarivi');
  if (!ylarivi) return;
  ylarivi.replaceChildren();
  const muodot = ui.game.pack.map?.countryShapes ?? {};
  for (const [i, iso] of (ui.vertailuValinnat ?? []).entries()) {
    const paalla = !ui.vertailuPois.has(iso);
    const nappi = html('button', 'vertailu-lappu');
    nappi.type = 'button';
    nappi.setAttribute('aria-pressed', paalla ? 'true' : 'false');
    nappi.appendChild(html('span', `vertailu-laatta ${VERTAILUVARIT[i] ?? ''}-laatta`));
    nappi.appendChild(document.createTextNode(muodot[iso]?.nimi ?? iso));
    nappi.addEventListener('click', () => {
      if (ui.vertailuPois.has(iso)) ui.vertailuPois.delete(iso);
      else ui.vertailuPois.add(iso);
      void avaaVertailuNakyma(ui);
    });
    ylarivi.appendChild(nappi);
  }
  const muuta = html('button', 'ghost vertailu-muuta', 'Muuta valintoja');
  muuta.type = 'button';
  muuta.addEventListener('click', () => suljeVertailuNakyma());
  ylarivi.appendChild(muuta);
}

/** Sulkee näkymän ja palaa karttaan valitsemaan maita. */
export function suljeVertailuNakyma() {
  const dialogi = document.getElementById('vertailu-dialog');
  if (dialogi?.open) dialogi.close();
}

/**
 * Maan tunnusluvut vertailukorttiin tiiviinä rivinä.
 *
 * Erillään maaosaston naytaMaaTunnusluvut-piirrosta tarkoituksella:
 * se rakentaa palkit, tervehdykset ja V-Dem-infoikkunan kiinteisiin
 * elementteihin, eikä kortille kuulu niistä yksikään. Yhteistä on
 * vain lähde (MAATIEDOT), ja luvut näytetään samassa muodossa.
 */
export function rakennaVertailuTunnusluvut(ui, iso) {
  const tiedot = (MAATIEDOT[ui.game.pack.id] ?? {})[iso] ?? null;
  if (!tiedot) return null;
  const lista = html('ul', 'vertailu-luvut');
  const rivi = (nimio, arvo) => {
    if (!arvo) return;
    const li = html('li', '');
    li.appendChild(html('span', 'vertailu-luku-nimio', nimio));
    li.appendChild(document.createTextNode(arvo));
    lista.appendChild(li);
  };
  rivi('Väkiluku ', tiedot.vakiluku);
  rivi('Pinta-ala ', tiedot.pintaAla);
  rivi('Tulot ', tiedot.keskitulo?.arvo);
  rivi('V-Dem ', tiedot.demokratia?.arvo);
  return lista.children.length ? lista : null;
}

