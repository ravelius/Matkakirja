/*
 * KAUPUNGIN ISO POP-UP JA TURISTI-INFO KARTALLA — karttauudistuksen erä 4
 * (13.9.2026; suunnitelma
 * docs/raportit/karttauudistus-suunnitelma-pallo-20260913.md luku 3.3,
 * tasokarttaversion luvut 4.3–4.4, Raamattu osio "Kaupungit":
 * KARTTAUUDISTUS ja KARTTAUUDISTUKSEN PAATOKSET 1–3).
 *
 * OMISTAJAN SANAT (13.9.2026): *"Kaupunkia klikkaamalla pelaajalle
 * avautuu isossa pop up ikkunassa Kaupunkilehden herokuvat ja
 * esittelyteksti sekä nähtävyyskartta. Kaupungin viereen kartalle tulee
 * oma "turisti info" merkki ja teksti ja sitä klikkaamalla avautuu
 * pelkkä nykyisen lehden tursti ja matkustusopas omassa pop upissa."*
 *
 * TÄMÄ MODUULI EI KIRJOITA YHTÄÄN UUTTA SISÄLTÖTEKSTIÄ. Jokainen kuva,
 * otsikko, kappale ja lähderivi luetaan samasta lehtidatasta kuin
 * kaupunkilehden etusivulla, samoilla piirtäjillä:
 *
 *   • herokuvat     js/lehti.js  latoLehtiKuvat   (kansikuvat, avauskuvat, ennenNyt)
 *   • esittely      js/lehti.js  latoKaupunginEsittely (ARTIKKELIT[...].intro)
 *   • kohdekartta   js/nahtavyydet.js piirraKaupunkiKartta (KAUPUNKIKARTAT)
 *   • matkustusopas js/nahtavyydet.js piirraMatkailijalle (kansi.matkailijalle)
 *
 * Erän työ oli juuri näiden neljän IRROTTAMINEN kutsuttaviksi — ei
 * uudelleenkirjoitus. Jos pop-upissa lukee jotain, mitä lehdessä ei
 * lue, se on vika tässä tiedostossa.
 *
 * VANHA OVI JÄÄ RINNALLE (tehtävänanto: *"ei poisteta kaupunkilehteä"*).
 * Kaupunkilehti avataan yhä `ui.avaaTutkinta`lla — fokusvirrasta
 * (js/fokusvirta.js) ja nipun kuoresta (js/fokusniput.js) — ja pop-upin
 * alarivissä on sen oma ovi. (Kartan "Etsi aarre" -nappi oli kolmas ovi
 * erään 9 asti; omistaja poisti sen 13.9.2026.) Vasta omistajan nähtyä uuden kulun päätetään, kumpi jää.
 *
 * MERKIT OVAT KARTTAAN KIINNITETTYJÄ (PAATOKSET 2, kohta 2: *"maan
 * tiedot, lisää-valikko, nostot ja muut elementit KIINNITETÄÄN KARTTAAN
 * (karttakoordinaatit, skaalautuvat zoomatessa kuin painettu kartta)"*).
 * Turisti-info on siksi pallon merkkikerroksen datum
 * (js/pallolauta/merkit.js htmlLat/htmlLng) eikä karttaruudun lapsi, ja
 * sen mittakaava luetaan kameran näkyvästä leveydestä
 * (kaupunkimerkinMitta alla). Pop-upin ankkuri on merkin RUUTUPISTE
 * (suunnitelman luku 3.3), joten kortti aukeaa sen merkin viereen, jota
 * napautettiin, eikä ruudun keskelle.
 *
 * MIKSI OMA ASEMOINTI EIKÄ js/fokuskohteet.js:n. Kohdekortin asemointi
 * (`asetaKohteenPaikka`) on sidottu `ui.fokuskohdeAuki`-tilaan, kuva
 * edellä -kortin kaksivaiheeseen ja raahaukseen; sen avaaminen tälle
 * kortille olisi ollut isompi muutos kuin kolmen pakon (ruutu, alanapit,
 * Pulun paneeli) laskeminen tässä. Pakot ja niiden perustelut ovat
 * samat — ja Pulun väistö on nimenomaan se, joka pitää chatin ja kuplat
 * pop-upin päällä.
 */

import { piirraNostosymKartalle } from './fokusnosto-symbolit.js';
import { kuvatekstiLyhyt } from './kuvatekstit.js';
import {
  avaaTiivisLehtiarkki, kaupunginKansi, latoKaupunginEsittely, latoLehtiKuvat,
  suljeTiivisLehtiarkki,
} from './lehti.js';
import { ensimmainenLause } from './lauseraja.js';
import {
  avaaNahtavyys, kaupunginNahtavyysteksti, piirraKaupunkiKartta, piirraMatkailijalle,
} from './nahtavyydet.js';
import { KAUPUNKIKARTAT } from './packs/maakartat.js';
import { sfx } from './sound.js';
import { taytaLahderivi } from './tekijakortti.js';
import { html, jaaKappaleiksi, kuunteleSulkevaNapautus } from './ui-apurit.js';

/* ===================== MERKIN MITAT KARTALLA ===================== */

/**
 * TURISTI-INFON PAIKKA: KAUPUNGIN VIEREEN, EI PÄÄLLE (suunnitelman luku
 * 4.4: *"sijoitus kaupungin viereen, ei päälle"*).
 *
 * SIIRTO ON ASTEITA, EI LAUDAN YKSIKKÖJÄ EIKÄ RUUDUN PIKSELEITÄ. Asteet
 * ovat projektiosta riippumattomia, joten merkki on samassa paikassa
 * kaupungistaan riippumatta siitä, mikä lauta pallon alla on — ja koska
 * merkki on pallon merkkikerroksen datum (htmlLat/htmlLng), siirto tekee
 * siitä maantieteellisesti ankkuroidun pisteen eikä ruutuun kiinnitettyä
 * lappua (PAATOKSET 2).
 *
 * PITUUSASTE JAETAAN KOSINILLA. Pallolla vaakasuora pikselimäärä yhtä
 * pituusastetta kohti on `cos(lat)` kertaa se, minkä yksi leveysaste
 * antaa pystysuunnassa; ilman jakoa merkki painuisi Pohjolassa kaupungin
 * päälle ja levähtäisi päiväntasaajalla kaukaisuuteen. Kosinille on
 * lattia, jottei napa-alueen merkki karkaa maapallon toiselle puolelle.
 *
 * MITTA ON MITATTU JA SITTEN KASVATETTU (savuke-kaupunkipopup, 13.9.2026).
 * Ensimmäinen arvio (0,72° / 0,36°) antoi Ranskan saapumisnäkymässä
 * 390 px:n ruudulla vain **18,6 px** eroa kaupunkipisteeseen — ja koska
 * osumatesti on lähin merkki 44 px:n sisällä (js/pallolauta/lauta.js
 * R-malli), kaupungin ja turisti-infon napautukset kilpailivat samasta
 * sormesta. Nyt siirto on 1,5° / 0,75°, mitattuna **39 px** samassa
 * näkymässä: kaksi erillistä kohdetta, jotka ovat silti yhdessä
 * silmäyksessä. Mittayksikkö ruudulla oli 23 px yhtä kaaren astetta
 * kohti (Ranska ~13° leveä, saapumiskorkeus 0,627).
 */
export const TURISTI_INFO_SIIRTO = Object.freeze({ lon: 1.5, lat: -0.75 });

/**
 * MERKKI ON PARIISIN VIERESSÄ JOKA ZOOMILLA — MITATTU, EI ARVATTU
 * (omistaja 14.9.2026: *"turisti info nappi pitaisi olla pariisin
 * vieressa"*; Raamattu KARTTAUUDISTUKSEN PAATOKSET 11 kohta 4).
 *
 * ASTEISSA ILMAISTU SIIRTO EI PYSY VIERESSÄ. Ylläolevat 1,5° / −0,75°
 * ovat maantieteellisesti kiinteät, mutta ruudulla yksi aste on sitä
 * useampi pikseli mitä lähempänä kamera on. MITATTU 14.9.2026 Pariisissa
 * (saapumisnäkymä, ladonta levossa):
 *
 *   390 × 844  →  kaupunkipiste (203, 394), merkki (236, 409) = 36 px
 *   1400 × 900 →  kaupunkipiste (722, 326), merkki (815, 370) = 103 px
 *
 * Sama siirto siis kolminkertaistui työpöydällä: merkki ei ollut enää
 * kaupungin vieressä vaan sen naapurissa.
 *
 * UUSI SIIRTO ON RUUTUPIKSELEITÄ. Halutusta ruutusiirrosta lasketaan
 * asteet käänteisellä Jacobin matriisilla, jonka alkiot MITATAAN
 * kamerasta joka ladonnassa (kolme `getScreenCoords`-näytettä:
 * kaupunki, kaupunki + 1° leveyttä, kaupunki + 1° pituutta). Näin
 * kaava ei oleta projektiosta mitään — se lukee sen, mitä pallo
 * juuri nyt tekee — ja merkki on samalla etäisyydellä puhelimella ja
 * työpöydällä. Merkki on yhä KARTTAAN KIINNITETTY datum (PAATOKSET 2):
 * asteet lasketaan uudestaan joka levossa, joten merkki kulkee
 * kaupunkinsa mukana panoroidessa.
 *
 * MITTA 36 / 16 px = 39 px ON SAMA LUKU, JOKA MITATTIIN HYVÄKSI erässä
 * 4 (ks. TURISTI_INFO_SIIRTO yllä): kaksi erillistä napautuskohdetta
 * (osumatesti on lähin merkki 44 px:n sisällä, js/pallolauta/lauta.js),
 * jotka ovat silti yhdessä silmäyksessä. Nyt se luku vain pysyy samana
 * kaikilla ruuduilla eikä vain siinä yhdessä, jolla se mitattiin.
 */
export const TURISTI_INFO_RUUTUSIIRTO = Object.freeze({ dx: 36, dy: 16 });

/*
 * ══════════════════════════════════════════════════════════════════
 * KYLTTI SIIRTYY SIVUUN, EI NIMIÖ (omistaja 17.9.2026 klo 06.35 UTC,
 * Raamattu KARTTAUUDISTUKSEN PAATOKSET 31 TARKENNUS 3, kortti
 * *"Kyltti siirtyy sivuun"*)
 * ══════════════════════════════════════════════════════════════════
 *
 * MITATTU VIKA (17.9.2026, Pariisin lähizoomi, molemmat ruudut): kun
 * kyltin varaus tuli ladontaan oikean kokoisena (TARKENNUS 2 kohta 6),
 * *Impressionistit…* -aihemerkki jäi kyltin laatikon SISÄÄN, eikä sen
 * nimiölle löytynyt vapaata asentoa yhdeltäkään neljästä kyljestä —
 * sovittelun viimeinen keino oli nimiön piilotus. Omistajan päätös:
 * siirtyvä osapuoli on KYLTTI, ei nimiö.
 *
 * ASENNOT OVAT RUUTUSIIRTOJA, JÄRJESTYS ON ETUSIJA. Ensimmäinen on
 * TURISTI_INFO_RUUTUSIIRTO eli se 39 px:n paikka, joka mitattiin
 * hyväksi erässä 4 — kyltti ei siis liiku, ellei ole pakko. Sen jälkeen
 * kokeillaan sama (oikea) kylki ylhäältä ja kauempaa, ja vasta sitten
 * kaupungin vasen puoli: kaupungin NIMIKYLTTI on PAATOKSET 24:n mukaan
 * oletuksena merkin VASEMMALLA puolella, joten vasen puoli on ahtaampi.
 * MITATTU 17.9.2026: kun vasen puoli oli järjestyksessä toisena,
 * työpöydän 1400 px:n näkymässä kyltti meni *PARIISI*-nimen päälle
 * (savuke-pariisi-lahizoom 7e, 1 nimi varauksen päällä). `vasen` kertoo, että ankkuri on siirrettävä
 * laatikon leveyden verran vasemmalle: nimiö piirtyy aina merkin
 * OIKEALLE puolelle (asetteleTuristiInfo, kylki 'oikea'), joten
 * pelkkä negatiivinen dx jättäisi nimiön kaupungin päälle.
 *
 * Etäisyydet on pidetty pieninä tarkoituksella: kyltin on oltava yhä
 * kaupungin VIERESSÄ (tools/savukkeet/savuke-kaupunkietusivu.mjs
 * TURISTI_INFO_ETAISYYS_MAX = 48 px saapumisnäkymässä), ja ladonta
 * pääsee kauemmas vain silloin, kun lähempänä ei ole tilaa.
 */
export const TURISTI_INFON_ASENNOT = Object.freeze([
  Object.freeze({ dx: 36, dy: 16 }),
  Object.freeze({ dx: 36, dy: -16 }),
  Object.freeze({ dx: 36, dy: 44 }),
  Object.freeze({ dx: 36, dy: -44 }),
  Object.freeze({ dx: 36, dy: 76 }),
  Object.freeze({ dx: 36, dy: -76 }),
  Object.freeze({ dx: -36, dy: 16, vasen: true }),
  Object.freeze({ dx: -36, dy: -16, vasen: true }),
  Object.freeze({ dx: -36, dy: 44, vasen: true }),
  Object.freeze({ dx: -36, dy: -44, vasen: true }),
  Object.freeze({ dx: -36, dy: 76, vasen: true }),
  Object.freeze({ dx: -36, dy: -76, vasen: true }),
]);

/**
 * Turisti-infon paikka asteina, kun halutaan KIINTEÄ RUUTUSIIRTO.
 *
 * `naytteet` on kolme ruutupistettä samalta kameralta:
 *   p0    kaupunki itse
 *   pLat  kaupunki + `dLat` astetta leveyttä
 *   pLon  kaupunki + `dLon` astetta pituutta
 *
 * Niistä saadaan suoraan se, montako pikseliä yksi aste kumpaankin
 * suuntaan juuri nyt on (Jacobin matriisi), ja sen käänteismatriisi
 * kertoo, montako astetta haluttu pikselisiirto on. Palauttaa null, jos
 * näytteitä ei ole tai matriisi on surkastunut (kaupunki pallon
 * reunalla) — kutsuja palaa silloin asteisiin.
 */
export function turistiInfonAsteetRuudulta(lat, lon, naytteet,
  siirto = TURISTI_INFO_RUUTUSIIRTO) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  const {
    p0, pLat, pLon, dLat = 1, dLon = 1,
  } = naytteet ?? {};
  if (!p0 || !pLat || !pLon || !(dLat > 0) || !(dLon > 0)) return null;
  const a = (pLon.x - p0.x) / dLon;
  const b = (pLat.x - p0.x) / dLat;
  const c = (pLon.y - p0.y) / dLon;
  const d = (pLat.y - p0.y) / dLat;
  const det = a * d - b * c;
  if (!Number.isFinite(det) || Math.abs(det) < 1e-6) return null;
  const dlon = (siirto.dx * d - siirto.dy * b) / det;
  const dlat = (a * siirto.dy - c * siirto.dx) / det;
  if (!Number.isFinite(dlon) || !Number.isFinite(dlat)) return null;
  // Järjetön tulos (kaupunki lähes horisontissa) hylätään: asteet
  // palauttavat merkin varmasti kartalle.
  if (Math.abs(dlat) > 20 || Math.abs(dlon) > 40) return null;
  return { lat: lat + dlat, lon: lon + dlon };
}
/** Kosinin lattia (ks. yllä): napa-alueella siirto ei kasva rajatta. */
export const TURISTI_INFO_KOSINIRAJA = 0.25;

/**
 * Turisti-infon merkin paikka asteina kaupungin pisteestä. Yksi kaava,
 * jota sekä merkin datum että pop-upin ankkuri lukevat.
 */
export function turistiInfonAsteet(lat, lon) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  const kosini = Math.max(TURISTI_INFO_KOSINIRAJA, Math.cos((lat * Math.PI) / 180));
  return { lat: lat + TURISTI_INFO_SIIRTO.lat, lon: lon + (TURISTI_INFO_SIIRTO.lon / kosini) };
}

/**
 * MERKIN PERUSMITTA — sama luku kuin elävillä nostoilla
 * (js/pallolauta/nostot.js NOSTON_MITTA = KARTTANIMI_KOOT.kohde /
 * NOSTOSYM_NIMIO_KOKO = 8,5 / 11). Luku on TOISTETTU eikä tuotu, koska
 * js/pallolauta/ ei ole yhden tiedoston niputuksessa eikä tämä moduuli
 * saa ripustaa itseään siihen; arvo on vakio ja sen lähde on kirjattu
 * tähän.
 */
export const KAUPUNKIMERKIN_MITTA = 8.5 / 11;
/*
 * ══════════════════════════════════════════════════════════════════
 * KYLTTI SKAALAUTUU KUTEN MUUTKIN KARTAN MERKIT — SAMA KERROIN, SAMA
 * KATTO (omistaja 17.9.2026 klo 03.30 UTC, Raamattu KARTTAUUDISTUKSEN
 * PAATOKSET 31 TARKENNUS 2 kohta 5, kortti *"Sama kerroin kuin
 * muilla"*)
 * ══════════════════════════════════════════════════════════════════
 *
 * MITATTU EPÄSUHTA (16.9.2026, Ranska-tallenne, pelaaja Pariisissa).
 * Kyltin mitta laskettiin omalla vertailullaan `uloin / näkyvä`, jossa
 * `uloin` oli MAAN LAATIKKO × 1,15 (uloszoomausraja, PAATOKSET 1),
 * kun nostot ja kaupunkimerkit käyttävät LAITTEEN OMAA saapumisnäkymää
 * (js/pallolauta/nostot.js nostonKarttakerroin, PAATOKSET 14). Sama
 * pelitilanne antoi siksi saapumisnäkymässä puhelimelle 27,18 px:n ja
 * työpöydälle 8,25 px:n nimiön — 3,3-kertainen ero, ja 16 px:n katon
 * jälkeen puhelimella kyltti seisoi katossa jo saapuessa.
 *
 * KORJAUS EI OLE UUSI KAAVA VAAN VANHAN POISTO: mitta tulee nyt
 * samasta funktiosta kuin kaupunkimerkillä (js/pallolauta/nostot.js
 * `nostonMitta(KAUPUNKIMERKIN_KERROIN)`, kutsu js/pallolauta/lauta.js
 * paivitaTuristiInfo), joten kyltti on n. 11,5 px saapuessa ja 16 px
 * lähizoomissa MOLEMMILLA ruuduilla. Kerroin ja katto asuvat siis
 * yhdessä paikassa, eikä tässä moduulissa ole enää omaa mittakaavaa —
 * vain perusmitta varapolulle (`d.mitta` puuttuu vain, jos ladonta ei
 * ole vielä ehtinyt ajaa).
 *
 * MIKSI MITTA TULEE ULKOAPÄIN EIKÄ TUODA TÄNNE: js/pallolauta/ ei ole
 * yhden tiedoston niputuksessa, eikä tämä moduuli saa ripustaa itseään
 * siihen (sama syy kuin KAUPUNKIMERKIN_MITTA-vakiolla). Lauta antaa
 * luvun datumin `mitta`-kentässä.
 */

/* ===================== MITÄ KAUPUNGILLA ON ===================== */

/**
 * Kaupungin turisti- ja matkustusopas (kansiosaston `matkailijalle`)
 * tai null. Tämä on turisti-info-merkin ainoa ehto: merkkiä ei
 * piirretä, jos oppaan takana ei ole kappaletta.
 */
export function kaupunginMatkailijalle(cityId) {
  return kaupunginKansi(cityId)?.matkailijalle ?? null;
}

/**
 * Onko kaupungilla kohdekartta (nähtävyyskartta)? Ison pop-upin kolmas
 * lohko jää pois ilman sitä — kortti aukeaa silti, koska esittely
 * kirjoitetaan aina ja herokuvat ovat useimmilla.
 */
export function kaupungillaKohdekartta(cityId) {
  return Boolean(cityId && KAUPUNKIKARTAT[cityId]);
}

/* ===================== MERKIN ELEMENTTI ===================== */

const SVG = 'http://www.w3.org/2000/svg';

/**
 * TURISTI-INFON MERKKI: sama mustepiirros ja nimiö kuin karttanostoilla
 * (js/fokusnosto-symbolit.js piirraNostosymKartalle), symbolina
 * `silma` = Nähtävyydet (NOSTOSYM_LUOKAT). Uutta muotoa ei piirretä:
 * Raamatun SYMBOLITAKSONOMIA pysyy yhtenä totuutena, ja pelaaja
 * tunnistaa merkin samaksi kieleksi kuin muut kartan merkinnät.
 *
 * Nimiön teksti on omistajan oma sana *"turisti info"* talon
 * kirjoitusasussa — ei keksittyä sisältöä vaan merkin nimi.
 */
export const TURISTI_INFO_NIMIO = 'Turisti-info';
/** Symbolikategoria (NOSTOSYM_LUOKAT: silma = Nähtävyydet). */
export const TURISTI_INFO_SYMBOLI = 'silma';

/** Merkin elementti pallon merkkikerrokseen (datumin `elementti`). */
export function turistiInfoElementti(d) {
  const el = document.createElement('div');
  el.className = 'pallolauta-turisti-info';
  el.dataset.kaupunki = d.cityId ?? '';
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('width', '1');
  svg.setAttribute('height', '1');
  svg.setAttribute('aria-hidden', 'true');
  const g = document.createElementNS(SVG, 'g');
  g.setAttribute('class', 'pallolauta-turisti-info-siirto');
  svg.appendChild(g);
  el.appendChild(svg);
  asetteleTuristiInfo(el, d);
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', `${TURISTI_INFO_NIMIO}: ${d.nimi ?? ''}`.trim());
  return el;
}

/**
 * Merkin sisäasettelu: mittakaava kameran mukaan (ks.
 * kaupunkimerkinMitta). Rasteri piirretään vain kun resepti muuttuu —
 * sama sääntö kuin elävillä nostoilla, koska piirraNostosymKartalle
 * LISÄÄ ryhmään solmun eikä tyhjennä sitä.
 */
export function asetteleTuristiInfo(el, d) {
  const g = el.querySelector('.pallolauta-turisti-info-siirto');
  if (!g) return;
  const mitta = d.mitta ?? KAUPUNKIMERKIN_MITTA;
  g.style.transform = `scale(${mitta.toFixed(4)})`;
  const resepti = `${TURISTI_INFO_SYMBOLI}|${TURISTI_INFO_NIMIO}`;
  if (g.dataset.resepti !== resepti) {
    g.dataset.resepti = resepti;
    g.replaceChildren();
    piirraNostosymKartalle(g, TURISTI_INFO_SYMBOLI, TURISTI_INFO_NIMIO, null, 'oikea');
  }
}

/* ===================== POP-UPIN TYYLI ===================== */

const KAUPUNKINOSTON_TYYLIN_TUNNUS = 'kaupunkinosto-tyyli';

/**
 * Tyyli ladataan vasta ensimmäisellä avauksella (sama kuvio kuin
 * js/fokuskohteet.js lataaKohdeTyyli): kartan kanssa ei tarvita
 * pop-upin sääntöjä, ja yhden tiedoston versio liittää ne itse.
 */
function lataaKaupunkiTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KAUPUNKINOSTON_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = KAUPUNKINOSTON_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('kaupunkinosto.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/* ===================== POP-UPIN ASEMOINTI ===================== */

/** Reunavara karttaruudun laidasta (px) — sama kuin kohdekortilla. */
const MARGINAALI = 10;
/** Rako merkin ja kortin väliin (px). */
const RAKO = 14;

/** Pulun paneeli, jos se on auki ja ruudulla (ks. js/fokuskohteet.js). */
function polloPaneeli() {
  const paneeli = document.querySelector('.pollo-paneeli');
  if (!paneeli || paneeli.hidden) return null;
  const r = paneeli.getBoundingClientRect();
  return r.width > 0 && r.height > 0 ? r : null;
}

/** Ankkurin ruutupiste laatikoksi (piste, ei ala). */
function kaupunkinostonAnkkurinLaatikko(auki, pane) {
  const ankkuri = typeof auki.ankkuri === 'function' ? auki.ankkuri() : auki.ankkuri;
  if (Number.isFinite(ankkuri?.x) && Number.isFinite(ankkuri?.y)) {
    return {
      left: ankkuri.x, right: ankkuri.x, top: ankkuri.y, bottom: ankkuri.y, width: 0, height: 0,
    };
  }
  return {
    left: pane.left + pane.width / 2,
    right: pane.left + pane.width / 2,
    top: pane.top + pane.height / 2,
    bottom: pane.top + pane.height / 2,
    width: 0,
    height: 0,
  };
}

/**
 * Kortin paikka merkin viereen. KOLME PAKKOA, samat kuin
 * kohdekortilla: kortti ei valu karttaruudun ulkopuolelle, se ei peitä
 * alanappeja (vuorolaatikko luetaan ruudulta), ja se väistää auki
 * olevaa Pulun paneelia — ensin sivuun, ja jos ei mahdu, ylöspäin.
 * Ahtaassa pystysuunnassa kortti saa oman kattonsa ja loppu vieritetään
 * sen sisällä.
 */
export function asemoiKaupunkipopup(ui) {
  const auki = ui?.kaupunkipopupAuki;
  if (!auki?.popup?.isConnected) return;
  const koti = auki.popup.offsetParent ?? auki.popup.parentNode;
  const pane = koti?.getBoundingClientRect?.();
  if (!pane || !(pane.width > 0)) return;
  const m = kaupunkinostonAnkkurinLaatikko(auki, pane);
  let alaraja = pane.bottom - MARGINAALI;
  const ylaraja = pane.top + MARGINAALI;
  let oikeaRaja = pane.right - MARGINAALI;
  const vasenRaja = pane.left + MARGINAALI;
  const napit = document.querySelector('.turn-card')?.getBoundingClientRect();
  if (napit && napit.height > 0 && napit.right > pane.left && napit.left < pane.right
    && napit.top > pane.top) {
    alaraja = Math.min(alaraja, napit.top - MARGINAALI);
  }
  const leveys = auki.popup.getBoundingClientRect().width;
  const chat = polloPaneeli();
  if (chat && chat.right > vasenRaja && chat.left < oikeaRaja && chat.bottom > pane.top) {
    if (chat.left - vasenRaja >= leveys + RAKO) oikeaRaja = Math.min(oikeaRaja, chat.left - RAKO);
    else alaraja = Math.min(alaraja, chat.top - MARGINAALI);
  }
  const katto = Math.max(160, Math.round(alaraja - ylaraja));
  auki.popup.style.maxHeight = `${katto}px`;
  const korkeus = auki.popup.getBoundingClientRect().height;
  let vasen = m.right + RAKO;
  if (vasen + leveys > oikeaRaja) vasen = m.left - RAKO - leveys;
  vasen = Math.max(vasenRaja, Math.min(vasen, oikeaRaja - leveys));
  let ylin = m.top + m.height / 2 - korkeus / 2;
  ylin = Math.min(ylin, alaraja - korkeus);
  ylin = Math.max(ylaraja, ylin);
  auki.popup.style.left = `${Math.round(vasen - pane.left)}px`;
  auki.popup.style.top = `${Math.round(ylin - pane.top)}px`;
}

/* ===================== POP-UPIN SISÄLLYS ===================== */

/**
 * ISON POP-UPIN SISÄLLYS: herokuvat, esittely, kohdekartta — juuri ne
 * kolme, jotka omistaja nimesi, ja siinä järjestyksessä kuin ne ovat
 * lehden etusivulla.
 *
 * TYHJÄ LOHKO EI JÄÄ KORTTIIN (vastakoe: kaupunki ilman herokuvia).
 * `latoLehtiKuvat` piilottaa oman kuvapaikkansa, jos kuvia ei ole,
 * mutta kehys jäisi silti korttiin omalla marginaalillaan — siksi koko
 * hero-lohko piilotetaan, kun kumpikin paikka on piilossa. Sama
 * kohdekartalle: `piirraKaupunkiKartta` palaa piirtämättä, jos
 * kaupungilla ei ole karttaa.
 */
function latoKaupunkiSisalto(ui, sisalto, city) {
  const kansi = kaupunginKansi(city.id);
  const hero = html('div', 'kaupunkipopup-hero');
  const paakuva = html('div', 'lehti-paakuva');
  const kuvarivi = html('div', 'lehti-kuvarivi');
  hero.appendChild(paakuva);
  hero.appendChild(kuvarivi);
  sisalto.appendChild(hero);
  latoLehtiKuvat(ui, {
    paakuva,
    kuvarivi,
    kuvat: kansi?.kansikuvat,
    avauskuvat: kansi?.avauskuvat ?? null,
    ennenNyt: kansi?.ennenNyt ?? null,
  });
  if (paakuva.hidden && kuvarivi.hidden) hero.hidden = true;
  latoKaupunginEsittely(sisalto, city);
  const kartta = html('div', 'kaupunkipopup-kartta');
  sisalto.appendChild(kartta);
  piirraKaupunkiKartta(ui, kartta, { cityId: city.id });
  if (!kartta.childElementCount) kartta.hidden = true;
  latoLehtiOvi(ui, sisalto, city);
}

/**
 * VANHA OVI POP-UPIN POHJALLA (tehtävänanto: *"vanha ovi avaaTutkinta
 * jää rinnalle, kunnes omistaja on nähnyt uuden"*).
 *
 * Napin teksti on pelin oma vakiintunut sana kaupunkilehdelle
 * (Raamattu, osio "Kaupungit"); uutta sisältötekstiä ei kirjoiteta.
 * Nappi sulkee pop-upin ensin, koska kaupunkilehti on modaali arkki —
 * kortti jäisi muuten sen alle odottamaan.
 */
function latoLehtiOvi(ui, sisalto, city) {
  if (typeof ui?.avaaTutkinta !== 'function') return;
  const rivi = html('div', 'kaupunkipopup-alarivi');
  const nappi = html('button', 'kaupunkipopup-lehti', 'Kaupunkilehti');
  nappi.type = 'button';
  nappi.addEventListener('click', () => {
    suljeKaupunkipopup(ui);
    ui.avaaTutkinta(city);
  });
  rivi.appendChild(nappi);
  sisalto.appendChild(rivi);
}

/**
 * TURISTI-INFON SISÄLLYS: PELKKÄ nykyisen lehden turisti- ja
 * matkustusopas (etusivun "Matkailijalle"-lohko kuvineen, nauhoineen ja
 * Lue lisää -linkkeineen). Ei herokuvia, ei esittelyä, ei karttaa —
 * omistajan sana on *"pelkkä"*.
 */
function latoInfoSisalto(ui, sisalto, city) {
  piirraMatkailijalle(ui, sisalto, { kansi: kaupunginKansi(city.id) });
}

/* ===================== POP-UPIN AVAUS JA SULKU ===================== */

/** Sulkee auki olevan kaupunki-pop-upin (myös kuuntelijat). */
export function suljeKaupunkipopup(ui) {
  const auki = ui?.kaupunkipopupAuki;
  if (!auki) return;
  ui.kaupunkipopupAuki = null;
  document.body.classList.remove('nosto-popup-auki');
  auki.purku?.();
  auki.popup?.remove();
}

/** Onko kaupunki-pop-up auki (ja mille kaupungille)? */
export function kaupunkipopupAuki(ui) {
  const auki = ui?.kaupunkipopupAuki;
  return auki?.popup?.isConnected ? auki : null;
}

/**
 * Kortin kuuntelijat: Esc, napautus kortin ulkopuolelle ja ikkunan koko.
 * Palauttaa purkufunktion — jokainen tähän lisätty kuuntelija on
 * purettava, tai suljettu kortti jäisi kuuntelemaan ikkunaa ikuisesti.
 *
 * PULU EI SULJE KORTTIA (sama sopimus kuin kohdekortilla): pöllönappi ja
 * paneeli ovat kortin työpari, joten napautus niihin jättää kortin auki
 * ja asemoi sen uudelleen paneelin viereen.
 */
function kuunteleKaupunkipopupia(ui, popup) {
  const nappain = (tapahtuma) => {
    if (tapahtuma.key !== 'Escape') return;
    tapahtuma.stopPropagation();
    sfx.play('paper');
    suljeKaupunkipopup(ui);
  };
  const asemoi = () => asemoiKaupunkipopup(ui);
  const ulos = (tapahtuma) => {
    if (popup.contains(tapahtuma.target)) return false;
    // Kortin omat jatkeet bodyssa: kohdekartan kokoruutu, nähtävyysjuttu
    // ja kuvasuurennos. Napautus niissä ei ole kortin sulku.
    if (tapahtuma.target?.closest?.(
      '.kartta-suurennos, .nahtavyys-dialog, .postikortti, .fokuskohde-zoom',
    )) return false;
    if (tapahtuma.target?.closest?.('.pollo-nappi, .pollo-paneeli')) {
      globalThis.requestAnimationFrame?.(asemoi);
      setTimeout(asemoi, 260);
      return false;
    }
    return true;
  };
  const sulkeva = () => {
    sfx.play('paper');
    suljeKaupunkipopup(ui);
  };
  document.addEventListener('keydown', nappain, true);
  const puraNapautus = kuunteleSulkevaNapautus(
    document, { kelpaa: ulos, napautus: sulkeva }, { kaappaus: true },
  );
  globalThis.addEventListener?.('resize', asemoi);
  globalThis.addEventListener?.('orientationchange', asemoi);
  return () => {
    document.removeEventListener('keydown', nappain, true);
    puraNapautus();
    globalThis.removeEventListener?.('resize', asemoi);
    globalThis.removeEventListener?.('orientationchange', asemoi);
  };
}

/**
 * Kortin runko: otsikko, sulkunappi ja vieritettävä sisältö. `lato`
 * täyttää sisällön, joten iso pop-up ja turisti-info ovat sama kortti
 * eri sisällöllä — yksi kehys, yksi sulkusopimus, yksi asemointi.
 */
function avaaKortti(ui, city, { laji, otsikko, ankkuri, lato }) {
  if (typeof document === 'undefined' || !city) return null;
  sfx.play('popup');
  lataaKaupunkiTyyli();
  suljeKaupunkipopup(ui);
  const koti = document.querySelector('.map-pane') ?? document.body;
  const popup = html('div', `kaupunkipopup kaupunkipopup-${laji}`);
  popup.setAttribute('role', 'group');
  popup.setAttribute('aria-label', `${otsikko}: tietoruutu`);
  /*
   * NAPAUTUS KORTIN PÄÄLLÄ EI SULJE, VAAN JÄÄ KORTILLE. Iso pop-up on
   * täynnä omia eleitä — kuvakaruselli, kohdekartan zoom, panorointi,
   * kokoruutu — ja kortin päältä alkava sulku olisi vienyt ne kaikki.
   * Ulkopuolinen napautus sulkee (kuunteleKaupunkipopupia).
   */
  popup.addEventListener('pointerdown', (tapahtuma) => tapahtuma.stopPropagation());
  const sulje = html('button', 'kaupunkipopup-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', `Sulje ${otsikko}`);
  sulje.addEventListener('click', () => {
    sfx.play('paper');
    suljeKaupunkipopup(ui);
  });
  popup.appendChild(sulje);
  popup.appendChild(html('h3', 'kaupunkipopup-otsikko', otsikko));
  const sisalto = html('div', 'kaupunkipopup-sisalto');
  popup.appendChild(sisalto);
  koti.appendChild(popup);
  ui.kaupunkipopupAuki = {
    laji, city, popup, ankkuri, purku: null,
  };
  // Yhteinen nostopopupin lippu, ks. js/fokuskohteet.js avaaFokuskohde.
  document.body.classList.add('nosto-popup-auki');
  // Sisällys vasta kun kortti on DOMissa: kohdekartta mittaa oikeita
  // ruutulaatikoita (js/nahtavyydet.js mitoitaKehys, hajautaPiirrospisteet),
  // eikä irrallisella elementillä ole sellaisia.
  lato(ui, sisalto, city);
  ui.kaupunkipopupAuki.purku = kuunteleKaupunkipopupia(ui, popup);
  asemoiKaupunkipopup(ui);
  // Mitta uudelleen, kun asettelu ja tyyli ovat valmiit: ensimmäinen
  // mitta voi osua hetkeen, jolloin tyylitiedosto on vasta matkalla.
  globalThis.requestAnimationFrame?.(() => asemoiKaupunkipopup(ui));
  setTimeout(() => asemoiKaupunkipopup(ui), 220);
  return popup;
}

/**
 * KAUPUNGIN ISO POP-UP: herokuvat, esittely ja zoomattava kohdekartta.
 * `ankkuri` on merkin ruutupiste ({ x, y }) tai funktio, joka laskee
 * sen uudestaan joka asemoinnilla — kortti seuraa merkkiään, kun pallo
 * pysähtyy (js/pallolauta/lauta.js).
 */
export function avaaKaupunkipopup(ui, city, { ankkuri = null } = {}) {
  return avaaKortti(ui, city, {
    laji: 'kaupunki',
    otsikko: city?.name ?? '',
    ankkuri,
    lato: latoKaupunkiSisalto,
  });
}

/**
 * TURISTI-INFO: pelkkä turisti- ja matkustusopas omassa pop-upissaan.
 * Ilman opasta ei avata tyhjää korttia — merkkiäkään ei silloin ole.
 */
export function avaaTuristiInfo(ui, city, { ankkuri = null } = {}) {
  if (!kaupunginMatkailijalle(city?.id)) return null;
  return avaaKortti(ui, city, {
    laji: 'info',
    otsikko: TURISTI_INFO_NIMIO,
    ankkuri,
    lato: latoInfoSisalto,
  });
}

/**
 * TURISTI-INFO AVAA SUORAAN ISON OPPAAN (omistaja 14.9.2026
 * sanatarkasti: *"se saisi suoraan aueta isoon muotoon (jata pienempi
 * vali popup pois kokonaan)"*; Raamattu KARTTAUUDISTUKSEN PAATOKSET 11
 * kohta 4).
 *
 * "Iso muoto" on matkailijan oppaan oma arkki — täsmälleen se, jonka
 * matkailuliitteen kolme sisäänkäyntiä (kuva, kulmanauha, Lue lisää
 * -linkki) avaavat js/nahtavyydet.js:n `piirraMatkailijalle`ssa. Tämä
 * funktio kutsuu samaa `avaaNahtavyys`ia samoilla asetuksilla; uutta
 * näkymää ei ole tehty eikä yhtään tekstiä kirjoitettu.
 *
 * VÄLIPOP-UP (`avaaTuristiInfo`) JÄÄ MODUULIIN mutta poistuu tästä
 * polusta: se on yhä se kortti, jonka pelkkä liite-lohko täyttää, ja
 * sen testit ja tyylit ovat paikallaan, jos välivaihe joskus palaa.
 * Kartan merkki ei enää avaa sitä.
 *
 * Kaikilla 190 kaupungilla, joilla on `matkailijalle`, on myös
 * `artikkeli.teksti` (tarkistettu datasta 14.9.2026) — merkin ehto
 * (kaupunginMatkailijalle) riittää siis myös oppaan ehdoksi. Varmuuden
 * vuoksi puuttuva artikkeli palauttaa null eikä avaa mitään.
 */
export function turistiOppaanArtikkeli(cityId) {
  const opas = kaupunginMatkailijalle(cityId)?.artikkeli ?? null;
  return opas?.teksti ? opas : null;
}

/** Avaa kaupungin matkailijan oppaan isossa muodossaan. */
export function avaaTuristiOpas(ui, city) {
  const artikkeli = turistiOppaanArtikkeli(city?.id);
  if (!artikkeli) return null;
  // Kartan omat kortit pois alta: opas on modaali arkki.
  suljeKaupunkipopup(ui);
  avaaNahtavyys(ui, artikkeli, null, { henkilolinkit: [], valikko: false });
  return artikkeli;
}

/* ============ TIIVISTETTY KAUPUNKIETUSIVU (PAATOKSET 10) ============ */

/**
 * TIIVISTETTY KOPIO KAUPUNKILEHDEN ETUSIVUSTA (Raamattu, osio
 * "Kaupungit": KARTTAUUDISTUKSEN PAATOKSET 10; omistaja 14.9.2026
 * sanatarkasti: *"kohdekaupunkia klikkaamalla voisi avautua
 * kaupunkilehden vanha etusivu mutta ilman matkailu liitetta ja alaosan
 * navigointia. Saasta vanha kaupunki lehti koskemattomana. Tee siita
 * vain uusi tiivistetty kopio. Ota myos ne kaksi ennen ja nyt
 * vertailukuvat pois ja siirra kaupungin leipateksti vasta kaupunki
 * kartan jalkeen ja nayta siita vain ensimmainen kappale ja loppuun
 * lisaa nappi joka jatkaa tekstin loppuun asti."*).
 *
 * TÄMÄ ON KOPIO, EI MUUNNOS. Vanha kaupunkilehti (js/lehti.js
 * rakennaSivut, piirraLehtiKuvat, sivupino, sisällysvalikko) ja tämän
 * tiedoston vanha `latoKaupunkiSisalto` jäävät koskemattomiksi — uusi
 * ladonta lukee TÄSMÄLLEEN samaa dataa samoilla piirtäjillä ja vain
 * valitsee siitä vähemmän. Yhtään uutta sisältötekstiä ei kirjoiteta.
 *
 * NELJÄ EROA VANHAAN ETUSIVUUN, kaikki omistajan luettelosta:
 *   1. EI ENNEN/NYT -PARIA: `latoLehtiKuvat` saa `ennenNyt: null`,
 *      jolloin pikkurivi palaa kansikuvien pariin kuten kaupungilla,
 *      jolla paria ei ole. Data säilyy — vain tämä kortti jättää sen
 *      lukematta.
 *   2. EI MATKAILULIITETTÄ: `piirraMatkailijalle`a ei kutsuta. Opas on
 *      yhä omassa turisti-info-kortissaan (avaaTuristiInfo).
 *   3. EI ALAOSAN NAVIGOINTIA: ei sivunvaihtoa, ei sisällysvalikkoa,
 *      ei hampurilaista — eikä myöskään vanhaa ovea kaupunkilehteen
 *      (latoLehtiOvi), koska se on juuri se alarivi, jonka omistaja
 *      nimesi. Kaupunkilehti avautuu yhä fokusvirrasta.
 *   4. JÄRJESTYS: herokuvat → kohdekartta → leipätekstin ENSIMMÄINEN
 *      kappale → nappi, joka näyttää loput kappaleet PAIKALLEEN.
 *
 * LOPUT KAPPALEET OVAT DOMISSA ALUSTA ASTI, piilotettuina. Näin napin
 * painallus ei lado tekstiä uudestaan (eikä siis voi ladota sitä
 * toisin), ja kortin korkeus lasketaan uudestaan vasta kun pelaaja itse
 * pyytää loput (asemoiKaupunkipopup napin jälkeen).
 */
export const JATKA_NAPIN_TEKSTI = 'Lue loppuun';

/**
 * Kortin tunnusluokka savukkeelle ja tyyleille.
 *
 * ERÄ 11 SIIRSI KORTIN LEHDEN KEHYKSEEN, muttei vaihtanut sen nimeä:
 * tiivistetty etusivu tunnistetaan yhä tästä luokasta, joka on nyt
 * lehtiarkin dialogissa (js/lehti.js avaaTiivisLehtiarkki).
 */
export const TIIVIS_LUOKKA = 'kaupunkipopup-tiivis';

/** "Lue loppuun" -napin luokka (lehden oma nappityyli + oma koukku). */
export const JATKA_LUOKKA = 'tiivis-jatka';

export function latoTiivisEtusivu(ui, sisalto, city) {
  const kansi = kaupunginKansi(city.id);
  /*
   * KUVAPAIKAT OVAT LEHDEN OMAT ELEMENTIT (erä 11). Vanha kortti kääri
   * ne omaan `.kaupunkipopup-hero`-lohkoonsa; lehden etusivulla
   * `.lehti-paakuva` ja `.lehti-kuvarivi` ovat palstan suoria lapsia
   * (index.html #arrival-lehti-paakuva, #arrival-lehti-kuvat), ja juuri
   * siitä niiden marginaalit ja leveydet tulevat. Kääre jätetään siis
   * pois, jotta taitto on lehden eikä kortin.
   */
  const paakuva = html('div', 'lehti-paakuva');
  const kuvarivi = html('div', 'lehti-kuvarivi');
  sisalto.appendChild(paakuva);
  sisalto.appendChild(kuvarivi);
  latoLehtiKuvat(ui, {
    paakuva,
    kuvarivi,
    kuvat: kansi?.kansikuvat,
    avauskuvat: kansi?.avauskuvat ?? null,
    // Ennen/nyt pois (ero 1): ei suodatusta tässä, vaan kenttää ei lueta.
    ennenNyt: null,
  });
  // Kohdekartta ENNEN leipätekstiä (ero 4).
  const kartta = html('div', 'tiivis-kartta');
  sisalto.appendChild(kartta);
  piirraKaupunkiKartta(ui, kartta, { cityId: city.id });
  if (!kartta.childElementCount) kartta.hidden = true;
  const lohko = latoKaupunginEsittely(sisalto, city);
  // Lehden leipätekstin säännöt (css/styles.css .dialog.lehti .lehti-leipa:
  // palstoitus, anfangi, koko) — sama luokka kuin index.html:n
  // #arrival-introlla, ei kopioituja arvoja.
  lohko.classList.add('lehti-leipa');
  const loput = [...lohko.querySelectorAll(':scope > p')].slice(1);
  if (!loput.length) return;
  for (const p of loput) p.hidden = true;
  /*
   * Nappi on lehden oma "Lue lisää" -nappi (.wiki-btn, css/styles.css):
   * sama muoto, väri ja marginaali kuin etusivun omalla napilla. Oma
   * luokka on pelkkä koukku savukkeelle ja kuuntelijalle.
   */
  const nappi = html('button', `wiki-btn ${JATKA_LUOKKA}`, JATKA_NAPIN_TEKSTI);
  nappi.type = 'button';
  nappi.addEventListener('click', () => {
    for (const p of loput) p.hidden = false;
    nappi.remove();
  });
  sisalto.appendChild(nappi);
}

/**
 * Kaupungin napautuksen kortti: tiivistetty etusivu KAUPUNKILEHDEN
 * OMASSA KEHYKSESSÄ (omistaja 14.9.2026: *"sisalto on oikea, mutta sen
 * ulkoasu saisi olla tasmalleen sama kuin kaupunkilehdessa kaikilta
 * osin (myos pop upin leveys)"*; Raamattu PAATOKSET 11 kohta 3).
 *
 * Kehys, leveys, paperi ja typografia tulevat js/lehti.js:n
 * `avaaTiivisLehtiarkki`sta — ei yhtään kopioitua tyyliä. Ankkuria ei
 * enää ole: lehti on modaali arkki keskellä ruutua, ei merkin viereen
 * asemoitu kortti. Parametri jää kytkentäkohdaksi, jotta pallon
 * napautuspolku (js/pallolauta/lauta.js) pysyy rivilleen entisenä.
 */
export function avaaTiivisKaupunkietusivu(ui, city, { ankkuri = null } = {}) {
  void ankkuri;
  // Kartan oma kortti (turisti-info) ei saa jäädä lehden alle.
  suljeKaupunkipopup(ui);
  const arkki = avaaTiivisLehtiarkki(ui, city, latoTiivisEtusivu);
  arkki?.classList.add(TIIVIS_LUOKKA);
  // Kehys on YKSI elementti koko pelin ajaksi (js/lehti.js
  // LEHTIARKIN_TUNNUS), joten edellisen näkymän tunnusluokka on
  // poistettava — muuten savuke näkisi kaksi näkymää yhdessä kortissa.
  arkki?.classList.remove(KAUPUNKIESITTELY_LUOKKA, NAHTAVYYSNAKYMA_LUOKKA);
  return arkki;
}

/** Sulkee tiivistetyn etusivun (savukkeet ja kutsujat). */
export function suljeTiivisKaupunkietusivu() {
  suljeTiivisLehtiarkki();
}

/* ===== LIUSKAN KAKSI YLÄRIVIÄ (PAATOKSET 34 kohta 16) ===== */

/**
 * OMISTAJAN PÄÄTÖS 18.9.2026 klo 14.05 (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 34 kohta 16, kohdat d ja e): kaupunkiliuskan kaksi ylintä
 * riviä avaavat nyt kumpikin OMAN KEVYEN NÄKYMÄNSÄ eivätkä koko lehteä:
 *
 *   d) "PARIISI" (kaupungin oma rivi) → herokuva, kaksi pikkukuvaa
 *      (vanha ja uusi) ja leipäteksti. EI kaupunkilehteä eikä sen
 *      osioita, EI kohdekarttaa.
 *   e) "NÄHTÄVYYDET" → kohdekartta ja sen alla nähtävyysteksti, josta
 *      näkyy ensimmäinen lause ja "Lue lisää" -nappi. EI kartan alaista
 *      kohdeluetteloa — kohteet avataan kartalta napauttamalla.
 *
 * KUMPIKAAN EI OLE UUTTA SISÄLTÖÄ EIKÄ UUSI PIIRTÄJÄ. Molemmat latovat
 * samoilla funktioilla samaa dataa kuin lehti (latoLehtiKuvat,
 * latoKaupunginEsittely, piirraKaupunkiKartta) ja avautuvat samaan
 * kehykseen kuin tiivis etusivu (avaaTiivisLehtiarkki, "ison pop-upin
 * kehys kelpaa") — vain valinta on eri. Vanha `latoTiivisEtusivu` jää
 * koskemattomana paikalleen, koska kaupunkimerkin oma napautuspolku
 * (js/pallolauta/lauta.js) käyttää sitä yhä.
 */

/** Kaupungin esittelynäkymän tunnusluokka (savuke ja tyylit). */
export const KAUPUNKIESITTELY_LUOKKA = 'kaupunkiesittely-nakyma';
/** Nähtävyysnäkymän tunnusluokka. */
export const NAHTAVYYSNAKYMA_LUOKKA = 'nahtavyysnakyma';
/** "Lue lisää" -napin teksti ja luokka (lehden oma nappityyli). */
export const LUE_LISAA_TEKSTI = 'Lue lisää';
export const LUE_LISAA_LUOKKA = 'nahtavyysnakyma-lisaa';
/** Nähtävyystekstin kappale — yksi elementti, joka KASVAA napista. */
export const NAHTAVYYSTEKSTIN_LUOKKA = 'nahtavyysnakyma-teksti';
/**
 * Merkkimäärä, jota lyhyempi nähtävyysteksti ladotaan KOKONAAN ilman
 * "Lue lisää" -nappia (omistajan päätös 18.9.2026 klo 15.20, kohta
 * 17 e alakohta 2: *"raja: alle 900 merkkiä"*).
 */
export const NAHTAVYYSTEKSTIN_KATKAISURAJA = 900;
/** Nähtävyysnäkymän kevyen yläosan otsikko (kohta 17 e alakohta 1). */
export const NAHTAVYYSNAKYMAN_OTSIKKO = 'Nähtävyydet';

/**
 * d) KAUPUNGIN ESITTELYNÄKYMÄ: herokuva, kaksi pikkukuvaa, leipäteksti.
 *
 * Kuvat tulevat kannen omista kentistä samalla piirtäjällä kuin
 * lehdessä. Pikkurivi on TASAN KAKSI KUVAA: kun kannella on
 * ennenNyt-pari, `latoLehtiKuvat` latoo juuri sen (vasemmalle vanha,
 * oikealle uusi) — ja ilman paria sama funktio latoo kansikuvista kaksi.
 * Kohdekartta ei kuulu tähän näkymään lainkaan (se on "Nähtävyydet").
 */
export function latoKaupunkiesittely(ui, sisalto, city) {
  const kansi = kaupunginKansi(city.id);
  const paakuva = html('div', 'lehti-paakuva');
  const kuvarivi = html('div', 'lehti-kuvarivi');
  sisalto.appendChild(paakuva);
  sisalto.appendChild(kuvarivi);
  latoLehtiKuvat(ui, {
    paakuva,
    kuvarivi,
    kuvat: kansi?.kansikuvat,
    avauskuvat: kansi?.avauskuvat ?? null,
    // VANHA JA UUSI (kohta 16 d): kannen ennenNyt-pari on juuri se pari,
    // jonka omistaja nimesi — tiivis etusivu jättää sen lukematta, tämä
    // näkymä lukee sen.
    ennenNyt: kansi?.ennenNyt ?? null,
  });
  const lohko = latoKaupunginEsittely(sisalto, city);
  // Lehden leipätekstin säännöt (css/styles.css .dialog.lehti .lehti-leipa).
  lohko.classList.add('lehti-leipa');
}

/**
 * e) NÄHTÄVYYSNÄKYMÄ: kartta ja sen alla nähtävyysteksti.
 *
 * KOLME RAJAUSTA piirraKaupunkiKartan lipuilla, kaikki omistajan
 * luettelosta: saateteksti ei tule kartan yläpuolelle (se ladotaan
 * kartan ALLE ensimmäinen lause edellä), kohdeluettelo jää pois
 * kokonaan, eikä kuvagallerian nappi kuulu tähän näkymään.
 *
 * KEVENNYS 18.9.2026 klo 15.20 (kohta 17 e): näkymän yläosassa ei ole
 * enää lehden mastoa (avaaTiivisLehtiarkki saa otsikon), lyhyt teksti
 * ladotaan kokonaan ilman nappia (NAHTAVYYSTEKSTIN_KATKAISURAJA), ja
 * arkki on sisältönsä mittainen (css/styles.css .nahtavyysnakyma).
 *
 * LOPPUTEKSTI ON DOMISSA VASTA NAPISTA, MUTTA SAMASSA KAPPALEESSA:
 * omistaja sanoi *"napautus tuo loput tekstistä samaan kappaleeseen
 * ensimmäisen lauseen jatkoksi (ei uutta näkymää, ei kelaa pois)"*.
 * Siksi teksti on YKSI <p>, jonka sisältöä nappi jatkaa — ei toista
 * kappaletta eikä piilotettua lohkoa, jolloin lukija jatkaa samasta
 * kohdasta eikä näkymä hyppää.
 */
export function latoNahtavyysnakyma(ui, sisalto, city) {
  const kartta = html('div', 'tiivis-kartta');
  sisalto.appendChild(kartta);
  piirraKaupunkiKartta(ui, kartta, {
    cityId: city.id, esittely: false, selitelista: false, kuvagalleria: false,
    /*
     * OSION OMA OTSAKE POIS (PAATOKSET 34 kohta 18 c): arkilla lukee
     * jo NAHTAVYYSNAKYMAN_OTSIKKO, joten kartan oma h3 oli sama sana
     * toiseen kertaan heti sen alla.
     */
    otsikko: false,
    // Kohta 18 e-g: kokoruutu on oikea nappi kartan yläpuolella,
    // plus/miinus ja kartan päälliskyltit jäävät pois.
    zoomiNapit: false, opasteet: false, kokoruutuNappi: true,
  });
  if (!kartta.childElementCount) kartta.hidden = true;
  const koko = kaupunginNahtavyysteksti(city.id);
  if (!koko) return;
  /*
   * LYHYT TEKSTI NÄYTETÄÄN KOKONAAN (omistajan päätös 18.9.2026 klo
   * 15.20, kohta 17 e alakohta 2). Raja on merkkimäärä eikä lauseiden
   * määrä, koska kyse on siitä, paljonko paperia teksti vie: alle
   * NAHTAVYYSTEKSTIN_KATKAISURAJA merkin teksti mahtuu arkille
   * kerralla, eikä "Lue lisää" tekisi muuta kuin veisi yhden
   * napautuksen. Pidempi teksti pitää kohdan 16 e napin ennallaan
   * (ensimmainenLause, js/lauseraja.js).
   */
  if (koko.length < NAHTAVYYSTEKSTIN_KATKAISURAJA) {
    sisalto.appendChild(html('p', `kaupunkikartta-esittely ${NAHTAVYYSTEKSTIN_LUOKKA}`, koko));
    return;
  }
  const { ensimmainen, loput } = ensimmainenLause(koko);
  const kappale = html('p', `kaupunkikartta-esittely ${NAHTAVYYSTEKSTIN_LUOKKA}`, ensimmainen);
  sisalto.appendChild(kappale);
  if (!loput) return;
  const nappi = html('button', `wiki-btn ${LUE_LISAA_LUOKKA}`, LUE_LISAA_TEKSTI);
  nappi.type = 'button';
  nappi.addEventListener('click', () => {
    kappale.appendChild(document.createTextNode(` ${loput}`));
    nappi.remove();
  });
  sisalto.appendChild(nappi);
}

/** Avaa kaupungin esittelynäkymän (liuskan kaupunkirivi). */
export function avaaKaupunkiesittely(ui, city) {
  suljeKaupunkipopup(ui);
  const arkki = avaaTiivisLehtiarkki(ui, city, latoKaupunkiesittely);
  arkki?.classList.add(KAUPUNKIESITTELY_LUOKKA);
  arkki?.classList.remove(NAHTAVYYSNAKYMA_LUOKKA, TIIVIS_LUOKKA);
  return arkki;
}

/** Avaa nähtävyysnäkymän (liuskan "Nähtävyydet"-rivi). */
export function avaaNahtavyysnakyma(ui, city) {
  suljeKaupunkipopup(ui);
  const arkki = avaaTiivisLehtiarkki(ui, city, latoNahtavyysnakyma,
    { otsikko: NAHTAVYYSNAKYMAN_OTSIKKO });
  arkki?.classList.add(NAHTAVYYSNAKYMA_LUOKKA);
  arkki?.classList.remove(KAUPUNKIESITTELY_LUOKKA, TIIVIS_LUOKKA);
  return arkki;
}

/* ========== LISÄKAUPUNGIN KAUPUNKIKORTTI (PAATOKSET 16) ========== */

/**
 * LISÄKAUPUNGIN KORTTI — kuva, esittely ja YKSI nosto.
 *
 * OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 16,
 * 14.9.2026) sanatarkasti: *"Yhdista nuo kaksi ens. Vaihtoehtoa ja
 * pyyda putkelta kuhunkin kaupunkiin hero kuva. Esittelyn jalkeen voi
 * siis tulla yksi nosto teksti. Jos useampi olisi tarjolla niin
 * jatetaan seuraavat kartalle omiksi nostoikseen."*
 *
 * Kortti koskee kartan lisäkaupunkeja (js/packs/nakyvat-kaupungit-
 * fra.js), jotka eivät ole laudan matkakohteita. Edellinen erä merkitsi
 * ne `vainNimi`-lipulla, koska korttiin ei ollut tekstiä; lippu on nyt
 * poissa ja merkki ottaa napautuksen.
 *
 * SAMA KEHYS KUIN TIIVIILLÄ KAUPUNKIETUSIVULLA (PAATOKSET 10). Kortti
 * avataan samalla `avaaKortti`lla: sama pergamentti, sama sulkunappi,
 * sama Esc- ja ulkonapautussopimus, sama ankkurointi merkin
 * ruutupisteeseen. Uusia tyylejä on yksi ja vain yksi — kuvan
 * paikkamerkki (.kaupunkipopup-heropaikka), jota ei ollut olemassa,
 * koska tähän asti kortissa ei ole ollut kuvatonta kuvapaikkaa.
 *
 * KOLME LOHKOA, JA JOKAINEN PUUTTUU KOKONAAN JOS SEN DATAA EI OLE —
 * tyhjää kehystä ei jätetä (sama sääntö kuin `latoTiivisEtusivu`n
 * hero-lohkolla):
 *
 *   1. KUVA. `kohde.herokuva` on kuvaputken URL. Kun se on `null`
 *      (nyt), kortti piirtää PAIKKAMERKIN eikä hae mitään ulkoa:
 *      seepiaruutu ja kaupungin nimi. Kun putki toimittaa kuvan, vaihto
 *      on yksi datarivi.
 *   2. ESITTELY. `kohde.esittely` on 2–3 lauseen teksti (Fable
 *      hyväksyi Ranskan seitsemän 14.9.2026 klo 21.25 UTC). Kun kenttä
 *      on tyhjä, lohko jää pois kokonaan — hyväksymätöntä tekstiä ei
 *      panna peliin, eikä tyhjää kehystä jätetä korttiin.
 *   3. NOSTO. `kohde.korttiNosto` on viite maalehtinoston omaan olioon
 *      (js/packs/maalehtinostot-fra.js) — EI KOPIO. Otsikko ja teksti
 *      piirretään samoilla luokilla kuin nostokortissa
 *      (js/fokusnosto.js piirraNostonSisus: h3
 *      .fokusnosto-kortti-otsikko ja div.fokusnosto-teksti), joten
 *      kortilla lukee sanasta sanaan sama kuin noston omalla kortilla.
 *      Ranskan seitsemästä lisäkaupungista vain Lyonilla on kaupunkiin
 *      ankkuroitu nosto (mitattu, ks. datatiedoston taulukko); muilla
 *      lohko puuttuu.
 *
 * MIKSI TÄSSÄ EI TUODA js/fokusnosto.js:ää. Se toisi tuontikehän
 * (fokuskohteet → kaupunkinosto → fokusnosto → fokuskohteet). Kortti
 * tarvitsee siitä vain kaksi luokkanimeä ja tyylitiedoston, ja
 * tyylilataaja on talon oma kahdeksan rivin kuvio (lataaKaupunkiTyyli
 * yllä, js/fokusnosto.js nostoLataaTyyli, js/fokuskohteet.js
 * lataaKohdeTyyli). Kolmas kopio on halvempi kuin kehä.
 */

/** Nostokortin tyylitiedosto; sama kuvio kuin `lataaKaupunkiTyyli`. */
const KAUPUNKINOSTON_NOSTO_TYYLIN_TUNNUS = 'fokusnosto-tyyli';

function lataaNostotyyliKortille() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KAUPUNKINOSTON_NOSTO_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = KAUPUNKINOSTON_NOSTO_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('fokusnosto.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/** Kortin tunnusluokka savukkeelle ja tyyleille. */
export const LISAKAUPUNKI_LUOKKA = 'kaupunkipopup-lisakaupunki';
/** Kuvan paikkamerkin luokka (seepiaruutu, kun herokuvaa ei vielä ole). */
export const HEROPAIKAN_LUOKKA = 'kaupunkipopup-heropaikka';

/**
 * Noston teksti yhtenä merkkijonona. Maalehtinostoilla se on
 * `lunastus`-taulukko (js/packs/maalehtinostot-fra.js korttiLehdesta),
 * muualla valmis `teksti`. Sama levitys kuin js/fokusnosto.js
 * nostonLunastusteksti tekee poolille — kappaleraja on tyhjä rivi,
 * jonka `jaaKappaleiksi` tunnistaa.
 */
function kortinNostonTeksti(nosto) {
  if (nosto?.teksti) return nosto.teksti;
  const lunastus = nosto?.lunastus;
  if (Array.isArray(lunastus)) {
    return lunastus.map((k) => String(k ?? '').trim()).filter(Boolean).join('\n\n');
  }
  return typeof lunastus === 'string' ? lunastus : '';
}

export function latoLisakaupunginKortti(ui, sisalto, kohde) {
  sisalto.closest('.kaupunkipopup')?.classList.add(LISAKAUPUNKI_LUOKKA);
  const nimi = kohde?.nimi ?? '';
  /* 1. Kuva tai sen paikkamerkki. */
  const hero = html('div', 'kaupunkipopup-hero');
  const paakuva = html('div', 'lehti-paakuva');
  hero.appendChild(paakuva);
  /*
   * HEROKUVA JA SEN KREDITTI (kuvatoimitus 14.9.2026, kytkentä
   * 15.9.2026). Kenttä on joko pelkkä osoite (vanha muoto) tai
   * kuvaolio, jolla on `osoite` ja kuvateksti-/lähdekentät samassa
   * muodossa kuin lehden herokuvilla (js/lehti.js latoLehtiKuvat):
   * sivulla lyhyt teksti (js/kuvatekstit.js kuvatekstiLyhyt) ja sen
   * perässä lähderivi samalla rivillä (js/tekijakortti.js
   * taytaLahderivi, css/styles.css "LÄHDERIVI KUVATEKSTIN JATKEEKSI").
   * Krediitti on lisenssin vaatimus eikä koriste: Commons-sivu ja
   * lisenssi linkittyvät lähderivistä, ja kuvan todellinen ajoitus
   * kulkee kuvatekstissä — näitä EI esitetä vuoden 1873 kuvina.
   *
   * Kuva sovitetaan CONTAIN-tavalla (css/kaupunkinosto.css): toimitetut
   * vedokset ovat suhteessa 1,34–1,56:1 eikä alkuperäistä kehystä saa
   * rajata pois.
   */
  const heroKuva = kohde?.herokuva ?? null;
  const heroOsoite = typeof heroKuva === 'string' ? heroKuva : (heroKuva?.osoite ?? '');
  if (heroOsoite) {
    const kehys = html('figure', 'lehti-kuva');
    const kuva = document.createElement('img');
    kuva.src = heroOsoite;
    const lyhyt = typeof heroKuva === 'string' ? '' : kuvatekstiLyhyt(heroKuva);
    kuva.alt = lyhyt || nimi;
    kuva.loading = 'lazy';
    kuva.decoding = 'async';
    kehys.appendChild(kuva);
    if (lyhyt) {
      const teksti = html('figcaption', 'kuvateksti', lyhyt);
      if (heroKuva.lahde) {
        teksti.appendChild(taytaLahderivi(
          html('span', 'lehti-kuvalahde'), heroKuva.lahde, heroKuva,
        ));
      }
      kehys.appendChild(teksti);
    }
    paakuva.appendChild(kehys);
  } else {
    // PAIKKAMERKKI EI HAE MITÄÄN ULKOA: pelkkä ruutu ja nimi, jotta
    // kortin mitta on jo nyt sama kuin kuvan kanssa.
    const paikka = html('div', HEROPAIKAN_LUOKKA, nimi);
    paikka.setAttribute('role', 'img');
    paikka.setAttribute('aria-label', `${nimi}: kuva tulossa`);
    paakuva.appendChild(paikka);
  }
  sisalto.appendChild(hero);
  /* 2. Esittely — vain jos se on kirjoitettu ja hyväksytty. */
  const esittely = String(kohde?.esittely ?? '').trim();
  if (esittely) {
    const lohko = html('div', 'arrival-intro');
    for (const kappale of jaaKappaleiksi(esittely)) {
      lohko.appendChild(html('p', '', kappale));
    }
    sisalto.appendChild(lohko);
  }
  /* 3. Yksi kaupunkiin ankkuroitu nosto, nostokortin omilla luokilla. */
  const nosto = kohde?.korttiNosto ?? null;
  const nostonTeksti = kortinNostonTeksti(nosto);
  if (!nosto?.otsikko || !nostonTeksti) return;
  lataaNostotyyliKortille();
  sisalto.appendChild(html('h3', 'fokusnosto-kortti-otsikko', nosto.otsikko));
  const teksti = html('div', 'fokusnosto-teksti');
  for (const kappale of jaaKappaleiksi(nostonTeksti)) {
    teksti.appendChild(html('p', '', kappale));
  }
  sisalto.appendChild(teksti);
}

/**
 * Lisäkaupungin napautuksen kortti. `kohde` on kartan kohdeolio
 * (js/packs/nakyvat-kaupungit-fra.js), ei laudan kaupunki — siksi
 * kehykselle annetaan vain nimi ja tunnus.
 */
export function avaaLisakaupunginKortti(ui, kohde, { ankkuri = null } = {}) {
  if (!kohde) return null;
  return avaaKortti(ui, { id: kohde.id, name: kohde.nimi ?? '' }, {
    laji: 'kaupunki',
    otsikko: kohde.nimi ?? '',
    ankkuri,
    lato: (u, sisalto) => latoLisakaupunginKortti(u, sisalto, kohde),
  });
}
