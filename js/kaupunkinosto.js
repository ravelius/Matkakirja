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
import { kaupunginKansi, latoKaupunginEsittely, latoLehtiKuvat } from './lehti.js';
import { piirraKaupunkiKartta, piirraMatkailijalle } from './nahtavyydet.js';
import { KAUPUNKIKARTAT } from './packs/maakartat.js';
import { sfx } from './sound.js';
import { html, kuunteleSulkevaNapautus } from './ui-apurit.js';

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
/** Mittakaavan rajat (suunnitelman luku 3.0, kolmas pala). */
export const KAUPUNKIMERKIN_MITTA_MIN = 0.75;
export const KAUPUNKIMERKIN_MITTA_MAX = 3;

/**
 * MERKKI SKAALAUTUU ZOOMATESSA KUIN PAINETTU KARTTA (PAATOKSET 2).
 *
 * Mitta on suhde `uloin / näkyvä`: uloimmalla zoomilla (koko maan
 * laatikko ruudussa) merkki on perusmitassaan, ja lähikuvassa se kasvaa
 * samassa suhteessa kuin kartta sen alla. Katto on pakollinen — ilman
 * sitä nimiö kasvaisi lähikuvassa ruudun kokoiseksi ja nimiladonta
 * (js/pallolauta/sovittelu.js) laskisi ruutupikseleitä, jotka eivät
 * mahdu mihinkään. Lattia pitää merkin luettavana silloinkin, kun
 * kamera on maan laatikkoa kauempana (kehittäjän maailmanäkymä).
 *
 * Tuntematon leveys palauttaa perusmitan: merkki näkyy aina, vaikka
 * maan laatikkoa ei olisi vielä laskettu (saapumisrajaus on asynkroninen).
 */
export function kaupunkimerkinMitta(nakyvaLeveys, uloinLeveys) {
  if (!(nakyvaLeveys > 0) || !(uloinLeveys > 0)) return KAUPUNKIMERKIN_MITTA;
  const mitta = KAUPUNKIMERKIN_MITTA * (uloinLeveys / nakyvaLeveys);
  return Math.min(KAUPUNKIMERKIN_MITTA_MAX,
    Math.max(KAUPUNKIMERKIN_MITTA_MIN, mitta));
}

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

const TYYLIN_TUNNUS = 'kaupunkinosto-tyyli';

/**
 * Tyyli ladataan vasta ensimmäisellä avauksella (sama kuvio kuin
 * js/fokuskohteet.js lataaKohdeTyyli): kartan kanssa ei tarvita
 * pop-upin sääntöjä, ja yhden tiedoston versio liittää ne itse.
 */
function lataaKaupunkiTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = TYYLIN_TUNNUS;
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
function ankkurinLaatikko(auki, pane) {
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
  const m = ankkurinLaatikko(auki, pane);
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
