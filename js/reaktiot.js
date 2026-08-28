/*
 * REAKTIOT — viisi kaiverrettua symbolia jokaisen sisällön ja jokaisen
 * väliotsikon kylkeen (omistajan tilaus 27.8.2026, vahvistettu 28.8.).
 *
 * MIKÄ TÄMÄ ON: pelaaja lukee lehteä, kohdekorttia tai nähtävyysjuttua
 * ja tuntee jotain. Kaikelle tuntemiselle on nyt sama ele ja viisi
 * sanaa:
 *
 *   laakeriseppele  Hieno
 *   sydän           Ihana
 *   suurennuslasi   Mielenkiintoinen
 *   tiimalasi       Tylsä
 *   mustetahra      Virhe
 *
 * Symbolit ovat 1873:n kaiverrusta samalla kynällä kuin kartan
 * merkit: pelkkä ääriviiva, ei täyttöä, ei somen hymiötä. Neljä
 * ensimmäistä on pelkkä ääni; mustetahra avaa tekstikentän, koska
 * virheestä pitää tietää MIKÄ on väärin.
 *
 * ── LEPOTILA ON YKSI NAPPI ─────────────────────────────────────────
 *
 * Rivi ei ole nappirivi vaan YKSI pieni himmeä nappi, jossa on eniten
 * ääniä saanut symboli ja sen määrä. Napautus avaa kaikki viisi
 * äänimäärineen; oma ääni on korostettu ja vaihdettavissa. Näin lehden
 * marginaali pysyy marginaalina eikä muutu palautelomakkeeksi, mutta
 * äänestäminen on yhden napautuksen päässä.
 *
 * YKSI ÄÄNI PER LAITE PER KOHDE. Oma ääni on laitteen muistissa
 * (localStorage) ja sen voi vaihtaa toiseen symboliin tai perua
 * napauttamalla samaa uudestaan. Rajoitus on kohteliaisuus eikä lukko:
 * palvelin ei tiedä laitteista mitään eikä voisi valvoa sitä ilman
 * juuri sitä tunnistetta, jota sinne ei haluta.
 *
 * ── JAETUT LASKURIT ────────────────────────────────────────────────
 *
 * Äänet ovat KAIKKIEN pelaajien yhteisiä. Laskurit asuvat
 * ehdotuskanavan workerissa (worker/ehdotukset/reaktiot.js) samassa
 * R2-ämpärissä oman etuliitteensä alla:
 *
 *   GET  /reaktiot?kohteet=…  laskurit, kun nappi avataan
 *   POST /reaktio             yksi ääni (uusi ja mahdollinen edellinen)
 *
 * Haku tehdään VASTA kun nappi avataan — ei jokaisen artikkelin
 * piirrossa. Oma ääni näkyy heti optimistisesti, ennen kuin verkosta
 * tiedetään mitään. Verkko poikki = nollanäkymä ja oma ääni, ei
 * virheilmoitusta eikä estettä: rivi ei koskaan blokkaa lukemista.
 *
 * ── VIRHEILMOITUS ──────────────────────────────────────────────────
 *
 * Mustetahra avaa minipopupin (js/minipopup.js — sama komponentti kuin
 * pöllörivin i-nappi) tekstikentällä. Lähetys menee KAHTA reittiä:
 * laskuri saa tahran (näkyy julkisesti, kunnes omistaja merkitsee
 * virheen korjatuksi) ja vapaateksti kulkee vanhaa ehdotusreittiä
 * (js/ehdotukset.js lahetaEhdotus → POST /laheta) omistajan
 * Lukijoilta-lehdelle arvioitavaksi. Tekstireitin jono (localStorage)
 * pitää huolen siitä, ettei ilmoitus katoa verkkokatkoon.
 *
 * KANAVA KIINNI = RIVIÄ EI OLE. Sama sääntö kuin ehdotuslomakkeella:
 * kun EHDOTUS_OSOITE on tyhjä, pelaajalle ei näytetä nappia, joka ei
 * tee mitään.
 *
 * ── KOLME SÄÄNTÖÄ, JOTKA PITÄVÄT ──────────────────────────────────
 *
 *   1. PELAAMINEN EI KOSKAAN PYSÄHDY. Lähetys on tulessa-ja-unohda.
 *   2. VIRHEILMOITUKSIA YKSI per sisältö per istunto. Ilo saa toistua,
 *      virheilmoitus ei ole klikkailua.
 *   3. RIVI EI OLE SISÄLTÖÄ. Se ei päädy lukijan ääneen (ei
 *      data-lukija-solmuja) eikä pöllön kontekstiin (data-pollo="ei").
 */

import { html } from './ui-apurit.js';
import { EHDOTUS_OSOITE, ehdotusKaytossa, lahetaEhdotus } from './ehdotukset.js';
import { avaaMinipopup, suljeMinipopup } from './minipopup.js';

/* ------------------------------------------------------------------ *
 * Symbolit
 * ------------------------------------------------------------------ */

/*
 * VÄLIAIKAISET VIIVAIKONIT. Nämä on piirretty käsin samalla kynällä
 * kuin pelin muut viivaikonit (js/ui-apurit.js VIIVA_IKONIT): 24 × 24,
 * pelkkä ääriviiva, ei täyttöä. Lopulliset kaiverretut symbolit
 * generoidaan symboliputkella (.github/workflows/generoi-symbolit.yml,
 * OPENAI_API_KEY) samaan tapaan kuin kartan 12 karttasymbolia — kun ne
 * valmistuvat, vain nämä polut vaihtuvat eikä muuhun tarvitse koskea.
 */

/**
 * Laakeriseppele: kaksi kaarta ja kolme lehteä kummallakin puolella.
 *
 * Lehti on SULJETTU linssi (M … C … C … Z), ei kaksi irrallista kaarta:
 * auki jäävät päät sulautuivat 17 pikselin koossa mustiksi täpliksi.
 */
const SYM_LAAKERI = '<path d="M12 20.6C7.6 19.1 5 14.6 5.8 9"/>'
  + '<path d="M12 20.6c4.4-1.5 7-6 6.2-11.6"/>'
  + '<path d="M7.6 16.6C5.9 17.2 4.2 16.5 3.4 14.8 5.2 14.3 6.9 14.9 7.6 16.6Z"/>'
  + '<path d="M6.2 12.1C4.6 12.1 3.1 11.1 2.6 9.4 4.4 9.1 5.9 10.2 6.2 12.1Z"/>'
  + '<path d="M5.9 8.3C4.5 7.7 3.5 6.3 3.5 4.7 5.2 5.2 6.1 6.6 5.9 8.3Z"/>'
  + '<path d="M16.4 16.6c1.7.6 3.4-.1 4.2-1.8-1.8-.5-3.5.1-4.2 1.8Z"/>'
  + '<path d="M17.8 12.1c1.6 0 3.1-1 3.6-2.7-1.8-.3-3.3.8-3.6 2.7Z"/>'
  + '<path d="M18.1 8.3c1.4-.6 2.4-2 2.4-3.6-1.7.5-2.6 1.9-2.4 3.6Z"/>';

/** Sydän: yksi viiva, ei täyttöä — kaiverrus eikä hymiö. */
const SYM_SYDAN = '<path d="M12 20.2C12 20.2 3.8 15 3.8 9.4A4.1 4.1 0 0 1 12 7.6'
  + 'a4.1 4.1 0 0 1 8.2 1.8c0 5.6-8.2 10.8-8.2 10.8z"/>';

/** Suurennuslasi: linssi, sanka ja varsi. */
const SYM_LASI = '<circle cx="10.4" cy="10" r="5.6"/>'
  + '<path d="M14.5 14.2 20 19.9"/>'
  + '<path d="M7.4 8.2a4 4 0 0 1 2.6-1.7"/>';

/** Tiimalasi: laudat, kuroutuva vyötärö ja kasautunut hiekka. */
const SYM_TIIMALASI = '<path d="M6.8 3.6h10.4"/><path d="M6.8 20.4h10.4"/>'
  + '<path d="M8.2 3.6v3c0 1.7 1.1 2.8 2.5 4 .9.8.9 1.9 0 2.7-1.4 1.2-2.5 2.4-2.5 4v3.1"/>'
  + '<path d="M15.8 3.6v3c0 1.7-1.1 2.8-2.5 4-.9.8-.9 1.9 0 2.7 1.4 1.2 2.5 2.4 2.5 4v3.1"/>'
  + '<path d="M9.6 18.1h4.8"/>';

/**
 * Mustetahra: epäsäännöllinen läikkä ja kaksi roisketta —
 * kartoittajan onnettomuus eikä somen huutomerkki.
 */
const SYM_TAHRA = '<path d="M11.4 4.1C14.3 3.7 16.7 4.6 17.9 6.4 19 8.1 18 9.6 '
  + '17.9 11.1 17.8 13 16.1 13.8 14.9 15.2 13.5 16.9 13.9 19.9 11.2 19.9 8.7 19.9 '
  + '8.1 17.4 6.8 15.6 5.3 13.5 3.7 12.3 4.3 9.7 5 6.3 8 4.4 11.4 4.1Z"/>'
  + '<circle cx="20.1" cy="5.1" r="1.1"/>'
  + '<circle cx="17.6" cy="20.3" r=".8"/>';

/**
 * VIISI SYMBOLIA — järjestys on sama napissa, valikossa ja workerissa
 * (worker/ehdotukset/reaktiot.js REAKTIO_SYMBOLIT).
 *
 * `nimi` on tooltip ja aria-label suomeksi: symboli yksin ei kerro
 * merkitystään kenellekään, joka ei ole nähnyt sitä ennen.
 */
export const REAKTIO_SYMBOLIT = [
  { id: 'hieno', nimi: 'Hieno', polku: SYM_LAAKERI },
  { id: 'ihana', nimi: 'Ihana', polku: SYM_SYDAN },
  { id: 'mielenkiintoinen', nimi: 'Mielenkiintoinen', polku: SYM_LASI },
  { id: 'tylsa', nimi: 'Tylsä', polku: SYM_TIIMALASI },
  { id: 'virhe', nimi: 'Virhe', polku: SYM_TAHRA },
];

/** Symbolin tiedot tunnuksesta. */
export function reaktioSymboli(id) {
  return REAKTIO_SYMBOLIT.find((s) => s.id === id) ?? null;
}

/* ------------------------------------------------------------------ *
 * Vakiot
 * ------------------------------------------------------------------ */

/**
 * Aihe-etuliite, jolla omistaja tunnistaa virheilmoituksen
 * Lukijoilta-lehdessä. Vain virhe kulkee tekstikanavaa — muut neljä
 * symbolia ovat pelkkiä laskureita eivätkä kuulu kuratoitavien
 * ehdotusten joukkoon.
 */
export const REAKTIO_ETULIITTEET = {
  virhe: 'REAKTIO/VIRHE',
};

/**
 * Vapaatekstin katto. Virheilmoitus on osoitus eikä essee: rivi tai
 * kaksi riittää kertomaan mikä on väärin ja missä kohtaa.
 */
export const REAKTIO_TEKSTIN_KATTO = 300;

/** Kuittauksen näkyvyys ennen kuin rivi palaa lepoon. */
const REAKTIO_KUITTAUS_MS = 2600;

/** Jonon katto: vanhin putoaa pois, ettei muisti kasva rajatta. */
const REAKTIO_JONON_KATTO = 40;

/** Lähettämättä jääneet virheilmoitukset laitteen muistissa. */
export const REAKTIO_JONO_TALLE = 'matkakirja-reaktiojono';

/** Laitteen omat äänet: { kohde: symboliId }. */
export const REAKTIO_AANET_TALLE = 'matkakirja-reaktioaanet';

/** Omien äänten katto laitteella (vanhin putoaa pois). */
const REAKTIO_AANIA_KATTO = 500;

/**
 * Sisällöt, joista on jo ilmoitettu virhe TÄSSÄ istunnossa.
 *
 * Muistissa eikä localStoragessa tarkoituksella: esto on kohteliaisuus
 * kuratointia kohtaan, ei lukko. Peli päivittyy monta kertaa viikossa,
 * ja seuraavan käynnistyksen jälkeen sama juttu voi olla eri juttu.
 */
const REAKTIO_ILMOITETUT = new Set();

/**
 * Viimeksi nähdyt laskurit kohteittain. Sama kohde piirtyy usein
 * uudelleen (lehti taittuu, kortti avataan uudestaan), eikä jokainen
 * piirto saa lähettää omaa hakuaan.
 */
const REAKTIO_VALIMUISTI = new Map();

/*
 * LIVIAN NOLO KIITOS. Kolme kiinteää repliikkiä koodissa — ei
 * verkkokutsua, ei generointia: kiitos ei saa jäädä odottamaan
 * yhteyttä. Ääni on Livian (kirjekyyhky Columba Livia, hieman
 * pröystäilevä ja juuri nyt hieman nolo): ei huutomerkkejä, ei
 * anteeksipyytelyä, kuiva toteamus.
 */
const LIVIAN_KIITOKSET = [
  'Livia kiittää. Se merkitsee tämän muistiin ja katsoo hetken tarkasti muualle.',
  'Ohhoh. Livia kiittää — ja huomauttaa, että virhe on nyt matkalla oikeaan osoitteeseen.',
  'Livia kiittää ja sanoo, ettei tämä ollut sen vika. Se sanoo sen hieman liian nopeasti.',
];

/**
 * Livian jatkokysymys, kun tahra napautetaan mutta kenttä jää tyhjäksi.
 *
 * OIKAISU VAIN ILMEISEN VARMOISSA TAPAUKSISSA: koodi ei arvaa, onko
 * pelaaja väärässä — se ei näe sisältöä eikä voisi tietää. Ainoa
 * varma tapaus on tyhjä ilmoitus, josta ei voi korjata mitään, ja
 * siihen Livia vastaa kysymyksellä eikä väitteellä.
 */
const LIVIAN_JATKOKYSYMYS = 'Livia kallistaa päätään: mikä kohta oli väärin? '
  + 'Yksi rivi riittää — muuten se ei löydä sitä.';

/* ------------------------------------------------------------------ *
 * Pienet apurit
 * ------------------------------------------------------------------ */

/** Onko reaktiokanava kytketty? Sama portti kuin ehdotuslomakkeella. */
export function reaktiotKaytossa() {
  return ehdotusKaytossa();
}

/** Onko tästä sisällöstä jo ilmoitettu virhe tässä istunnossa? */
export function reaktioIlmoitettu(tunniste) {
  return REAKTIO_ILMOITETUT.has(String(tunniste ?? ''));
}

/** Unohtaa istunnon virheilmoitukset ja välimuistin (testit ja savukkeet). */
export function nollaaReaktiot() {
  REAKTIO_ILMOITETUT.clear();
  REAKTIO_VALIMUISTI.clear();
}

/**
 * Pelin versio lähetykseen.
 *
 * Luetaan DOMista eikä js/muutokset.js:stä: muutosloki on yhden
 * tiedoston niputuksessa vasta ui.js:n JÄLKEEN (tools/build-standalone.mjs),
 * eikä tämä moduuli voi tuoda sitä ilman järjestysvirhettä. Ohjesivun
 * versiokenttään js/main.js kirjoittaa saman luvun heti käynnistyksessä.
 */
export function reaktioVersio(doc = (typeof document === 'undefined' ? null : document)) {
  try {
    return String(doc?.getElementById?.('app-version')?.textContent ?? '').trim();
  } catch {
    return '';
  }
}

/**
 * VÄLIOTSIKON KOHDEAVAIN.
 *
 * Muoto on `otsikko:<sivun avain>:<ankkuri>`, esimerkiksi
 * `otsikko:aihe:lontoo:historia:sumu-ja-savu`. Sivun avain on sama,
 * jolla pöllöpoiminnat ja sivun oma reaktiorivi kiinnittyvät
 * (js/pollopoiminnat.js aiheAvain), ja ankkuri on otsikosta johdettu
 * vakaa liuska. Otsikon SANAMUOTO saa muuttua pilkun verran ilman että
 * äänet katoavat — ankkuri kestää ison alkukirjaimen, välimerkit ja
 * peräkkäiset välilyönnit.
 *
 * @param {string} sivunAvain sivun tunniste (aihe:… tai juttu:…)
 * @param {string} otsikko väliotsikon teksti
 * @returns {string|null} kohdeavain tai null jos jompikumpi puuttuu
 */
export function otsikkoAvain(sivunAvain, otsikko) {
  const sivu = String(sivunAvain ?? '').trim();
  const ankkuri = String(otsikko ?? '')
    .toLowerCase()
    .normalize('NFD')
    // Diakriitit pois: ä → a, ö → o. Ankkuri on kone-eikä
    // ihmisluettava, ja sama otsikko tuottaa saman avaimen riippumatta
    // siitä, onko ä kirjoitettu yhtenä vai kahtena merkkinä.
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  if (!sivu || !ankkuri) return null;
  return `otsikko:${sivu}:${ankkuri}`;
}

/**
 * Hyötykuorma, jonka worker näkee virheilmoituksesta.
 *
 * Muoto on tarkoituksella ehdotuksen muoto (teksti + sivu + tarkenne),
 * jotta nykyinen worker ottaa sen vastaan sellaisenaan. Tyyppi ja
 * sisällön tunniste ovat KAHDESTI — etuliitteessä ja omalla rivillään
 * — koska Lukijoilta-lehti näyttää tarkenteen otsikkona ja tekstin
 * leipänä, ja kummankin on kerrottava mistä on kyse yksin.
 *
 * @param {'virhe'} tyyppi reaktion laji (vain virhe kulkee tekstikanavaa)
 * @param {string} tunniste sisällön tunniste, esim. 'juttu:lontoo:Tower Bridge'
 * @param {object} [lisat]
 * @param {string} [lisat.teksti] pelaajan vapaateksti
 * @param {string} [lisat.otsikko] sisällön ihmisluettava nimi
 * @returns {object} ehdotuskanavan kentät
 */
export function reaktionKuorma(tyyppi, tunniste, { teksti = '', otsikko = '' } = {}) {
  const etuliite = REAKTIO_ETULIITTEET[tyyppi] ?? REAKTIO_ETULIITTEET.virhe;
  const nimi = String(otsikko ?? '').trim();
  const kohde = String(tunniste ?? '').trim();
  const vapaa = String(teksti ?? '').trim().slice(0, REAKTIO_TEKSTIN_KATTO);
  const versio = reaktioVersio();
  const rivit = [`${etuliite}: ${nimi || kohde}`];
  if (vapaa) rivit.push('', vapaa);
  rivit.push('', `Sisältö: ${kohde}`);
  if (nimi) rivit.push(`Otsikko: ${nimi}`);
  if (versio) rivit.push(`Versio: ${versio}`);
  return {
    teksti: rivit.join('\n'),
    sivu: kohde,
    tarkenne: `${etuliite} · ${nimi || kohde}`,
  };
}

/* ------------------------------------------------------------------ *
 * Laitteen oma ääni
 * ------------------------------------------------------------------ */

/** Kaikki laitteen omat äänet kohteittain. */
export function lueOmatAanet() {
  try {
    const data = JSON.parse(localStorage.getItem(REAKTIO_AANET_TALLE) ?? '{}');
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  } catch {
    return {}; // yksityinen selaus tai rikkinäinen arvo
  }
}

/** Laitteen oma ääni yhdelle kohteelle, tai tyhjä. */
export function omaAani(tunniste) {
  const arvo = lueOmatAanet()[String(tunniste ?? '')];
  return reaktioSymboli(arvo) ? arvo : '';
}

/**
 * Kirjaa laitteen oman äänen. Tyhjä symboli poistaa äänen.
 *
 * @param {string} tunniste kohdeavain
 * @param {string} symboli symbolin tunnus tai '' (peruminen)
 * @returns {string} edellinen ääni tai ''
 */
export function asetaOmaAani(tunniste, symboli) {
  const avain = String(tunniste ?? '');
  const aanet = lueOmatAanet();
  const edellinen = reaktioSymboli(aanet[avain]) ? aanet[avain] : '';
  if (symboli) aanet[avain] = symboli;
  else delete aanet[avain];
  // Katto: vanhimmat pois lisäysjärjestyksessä, jottei muisti kasva
  // rajatta pitkässä pelissä.
  const parit = Object.entries(aanet);
  const siivottu = parit.length > REAKTIO_AANIA_KATTO
    ? Object.fromEntries(parit.slice(-REAKTIO_AANIA_KATTO)) : aanet;
  try {
    localStorage.setItem(REAKTIO_AANET_TALLE, JSON.stringify(siivottu));
  } catch {
    /* yksityinen selaus: ääni jää istunnon mittaiseksi, peli jatkuu */
  }
  return edellinen;
}

/* ------------------------------------------------------------------ *
 * Laskurit — jaetut äänet workerilta
 * ------------------------------------------------------------------ */

/** Tyhjä äänirivistö. */
export function tyhjatAanet() {
  return Object.fromEntries(REAKTIO_SYMBOLIT.map((s) => [s.id, 0]));
}

/** Laskurit puhtaiksi: vain tunnetut symbolit, vain ei-negatiiviset luvut. */
function siivoaAanet(raaka) {
  const aanet = tyhjatAanet();
  for (const { id } of REAKTIO_SYMBOLIT) {
    const luku = Number(raaka?.[id]);
    if (Number.isFinite(luku) && luku > 0) aanet[id] = Math.floor(luku);
  }
  return aanet;
}

/**
 * Hakee jaetut laskurit kohteille.
 *
 * EI KOSKAAN HEITÄ: verkkovirhe on nollanäkymä eikä poikkeus. Rivi on
 * marginaalimerkintä, ei palvelu, jonka alhaalla olo pitäisi kertoa
 * pelaajalle.
 *
 * @param {string[]} kohteet kohdeavaimet
 * @returns {Promise<Record<string, object>>} laskurit kohteittain
 */
export async function haeReaktiolaskurit(kohteet) {
  const lista = [...new Set((kohteet ?? []).map((k) => String(k ?? '').trim()).filter(Boolean))];
  if (!lista.length || !reaktiotKaytossa()) return {};
  try {
    const kysely = lista.map((k) => encodeURIComponent(k)).join(',');
    const vastaus = await fetch(`${EHDOTUS_OSOITE}/reaktiot?kohteet=${kysely}`);
    if (!vastaus.ok) return {};
    const data = await vastaus.json();
    const tulos = {};
    for (const kohde of lista) tulos[kohde] = siivoaAanet(data?.reaktiot?.[kohde]);
    return tulos;
  } catch {
    return {};
  }
}

/**
 * Lähettää yhden äänen jaettuun laskuriin.
 *
 * TULESSA-JA-UNOHDA. Ääntä ei jonoteta: se ei ole viesti omistajalle
 * vaan yksi luku sadoista, ja pelaaja näkee oman äänensä laitteellaan
 * joka tapauksessa. Virheilmoituksen VAPAATEKSTI on eri asia — se
 * jonotetaan (lahetaReaktio).
 *
 * @param {string} tunniste kohdeavain
 * @param {string} symboli uusi ääni tai '' (peruminen)
 * @param {string} edellinen aiempi ääni tai ''
 * @param {string} [otsikko] kohteen ihmisluettava nimi omistajan listaan
 * @returns {Promise<object|null>} workerin palauttamat laskurit tai null
 */
export async function lahetaAani(tunniste, symboli, edellinen, otsikko = '') {
  if (!reaktiotKaytossa() || !tunniste) return null;
  if (!symboli && !edellinen) return null;
  try {
    const vastaus = await fetch(`${EHDOTUS_OSOITE}/reaktio`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        kohde: tunniste,
        otsikko,
        symboli: symboli || null,
        edellinen: edellinen || null,
      }),
    });
    if (!vastaus.ok) return null;
    const data = await vastaus.json();
    return siivoaAanet(data?.aanet);
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * Jono — virheilmoitus ei saa kadota verkkokatkoon
 * ------------------------------------------------------------------ */

function lueJono() {
  try {
    const data = JSON.parse(localStorage.getItem(REAKTIO_JONO_TALLE) ?? '[]');
    return Array.isArray(data) ? data.filter((k) => k && typeof k.teksti === 'string') : [];
  } catch {
    return []; // yksityinen selaus tai rikkinäinen arvo
  }
}

function kirjoitaJono(jono) {
  try {
    if (jono.length) localStorage.setItem(REAKTIO_JONO_TALLE, JSON.stringify(jono));
    else localStorage.removeItem(REAKTIO_JONO_TALLE);
  } catch {
    /* yksityinen selaus: reaktio jää lähettämättä, peli jatkuu */
  }
}

/** Lisää lähettämättä jääneen kuorman jonon perään. */
export function jonotaReaktio(kuorma) {
  const jono = lueJono();
  jono.push(kuorma);
  kirjoitaJono(jono.slice(-REAKTIO_JONON_KATTO));
}

/**
 * Yrittää lähettää jonossa odottavat virheilmoitukset.
 *
 * Jono tyhjennetään ENNEN lähetystä ja epäonnistuneet palautetaan
 * takaisin: näin kaksi rinnakkaista purkua ei lähetä samaa kuormaa
 * kahdesti, ja yhä toimimaton verkko jättää kuorman odottamaan.
 *
 * @returns {Promise<number>} montako lähti perille
 */
export async function puraReaktiojono() {
  if (!reaktiotKaytossa()) return 0;
  const jono = lueJono();
  if (!jono.length) return 0;
  kirjoitaJono([]);
  const jaljelle = [];
  let lahti = 0;
  for (const kuorma of jono) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await lahetaEhdotus(kuorma);
      lahti += 1;
    } catch {
      jaljelle.push(kuorma);
    }
  }
  if (jaljelle.length) kirjoitaJono([...lueJono(), ...jaljelle].slice(-REAKTIO_JONON_KATTO));
  return lahti;
}

/**
 * Lähettää yhden virheilmoituksen tekstikanavaan. EI KOSKAAN HYLKÄÄ:
 * virhe menee jonoon ja kutsuja saa falsen, mutta peli ei pysähdy.
 *
 * @param {'virhe'} tyyppi reaktion laji
 * @param {string} tunniste kohdeavain
 * @param {object} [lisat] { teksti, otsikko }
 * @returns {Promise<boolean>} pääsikö perille heti
 */
export async function lahetaReaktio(tyyppi, tunniste, lisat = {}) {
  if (!reaktiotKaytossa() || !tunniste) return false;
  const kuorma = reaktionKuorma(tyyppi, tunniste, lisat);
  try {
    await lahetaEhdotus(kuorma);
    return true;
  } catch {
    jonotaReaktio(kuorma);
    return false;
  }
}

/* ------------------------------------------------------------------ *
 * Kuvakkeet
 * ------------------------------------------------------------------ */

/** Viivaikoni napin sisään. */
function reaktioIkoni(polut, koko = 17) {
  const span = html('span', 'reaktio-ikoni');
  span.innerHTML = `<svg viewBox="0 0 24 24" width="${koko}" height="${koko}" aria-hidden="true"`
    + ` fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"`
    + ` stroke-linejoin="round">${polut}</svg>`;
  return span;
}

/** Voittajasymboli: eniten ääniä, tasapelissä listan järjestys. */
export function voittajaSymboli(aanet) {
  let paras = null;
  for (const { id } of REAKTIO_SYMBOLIT) {
    const maara = aanet?.[id] ?? 0;
    if (maara > 0 && (!paras || maara > paras.maara)) paras = { id, maara };
  }
  return paras;
}

/* ------------------------------------------------------------------ *
 * Rivi
 * ------------------------------------------------------------------ */

/**
 * Piirtää reaktionapin sisällön loppuun tai väliotsikon perään.
 *
 * Lepotilassa nappeja on YKSI: voittajasymboli ja sen äänimäärä, tai
 * haalea seppele jos ääniä ei ole. Napautus avaa kaikki viisi
 * äänimäärineen, ja toinen napautus sulkee taas.
 *
 * @param {HTMLElement} kohde säiliö, jonka loppuun rivi liitetään
 * @param {string} tunniste sisällön tunniste (ilman sitä riviä ei piirretä)
 * @param {object} [asetukset]
 * @param {string} [asetukset.otsikko] sisällön ihmisluettava nimi
 * @param {string} [asetukset.luokka] lisäluokka riville (sijoittelu)
 * @returns {HTMLElement|null} rivi tai null
 */
export function piirraReaktiot(kohde, tunniste, asetukset = {}) {
  if (!kohde || typeof document === 'undefined') return null;
  if (!tunniste || !reaktiotKaytossa()) return null;
  const { otsikko = '', luokka = '' } = asetukset;
  const avain = String(tunniste);

  // Odottavat virheilmoitukset pois alta aina kun rivi piirtyy: pelaaja
  // on juuri nyt sisällön äärellä, ja jos verkko on palannut, jono
  // lähtee huomaamatta. Virhe ei kaada piirtoa.
  puraReaktiojono().catch(() => {});

  const rivi = html('div', `reaktiorivi${luokka ? ` ${luokka}` : ''}`);
  // Pöllön musta lista: palautenapit eivät ole juttua eivätkä kuulu
  // chatin kontekstiin (js/pollo.js SPOILERI_LOHKOT).
  rivi.dataset.pollo = 'ei';

  /* ---------- tila ---------- */

  let aanet = REAKTIO_VALIMUISTI.get(avain) ?? tyhjatAanet();
  let oma = omaAani(avain);
  let auki = false;
  let haettu = REAKTIO_VALIMUISTI.has(avain);

  const kuittaus = html('span', 'reaktio-kuittaus');
  kuittaus.setAttribute('role', 'status');
  kuittaus.setAttribute('aria-live', 'polite');
  let kuittausAjastin = null;
  const sano = (teksti, pysyva = false) => {
    kuittaus.textContent = teksti;
    clearTimeout(kuittausAjastin);
    if (!pysyva && teksti) {
      kuittausAjastin = setTimeout(() => { kuittaus.textContent = ''; }, REAKTIO_KUITTAUS_MS);
    }
  };

  /* ---------- lepotilan nappi ---------- */

  const lepo = html('button', 'reaktionappi reaktio-lepo');
  lepo.type = 'button';
  lepo.setAttribute('aria-expanded', 'false');
  const lepoIkoni = html('span', 'reaktio-lepoikoni');
  const lepoLuku = html('span', 'reaktio-luku');
  lepo.append(lepoIkoni, lepoLuku);

  const paivitaLepo = () => {
    const voittaja = voittajaSymboli(aanet);
    // Oma ääni voittaa näkymässä silloin, kun kukaan muu ei ole vielä
    // äänestänyt: pelaajan on nähtävä oma valintansa napissa.
    const nayta = voittaja ?? (oma ? { id: oma, maara: 1 } : null);
    const symboli = nayta ? reaktioSymboli(nayta.id) : REAKTIO_SYMBOLIT[0];
    lepoIkoni.replaceChildren(reaktioIkoni(symboli.polku));
    lepoLuku.textContent = nayta ? String(nayta.maara) : '';
    lepo.classList.toggle('tyhja', !nayta);
    lepo.classList.toggle('oma', Boolean(oma) && nayta?.id === oma);
    const nimi = otsikko ? ` — ${otsikko}` : '';
    lepo.title = nayta
      ? `${symboli.nimi}: ${nayta.maara} ${nayta.maara === 1 ? 'ääni' : 'ääntä'}`
      : 'Anna reaktio';
    lepo.setAttribute('aria-label', nayta
      ? `Reaktiot${nimi}: eniten ${symboli.nimi.toLowerCase()}, ${nayta.maara}`
      : `Anna reaktio${nimi}`);
  };

  /* ---------- avattu valikko ---------- */

  const valikko = html('div', 'reaktio-valikko');
  valikko.hidden = true;
  const napit = new Map();

  for (const symboli of REAKTIO_SYMBOLIT) {
    const nappi = html('button', `reaktionappi reaktio-symboli reaktio-${symboli.id}`);
    nappi.type = 'button';
    nappi.dataset.symboli = symboli.id;
    nappi.appendChild(reaktioIkoni(symboli.polku, 16));
    const luku = html('span', 'reaktio-luku');
    nappi.appendChild(luku);
    napit.set(symboli.id, { nappi, luku });
    valikko.appendChild(nappi);
  }

  const paivitaValikko = () => {
    for (const symboli of REAKTIO_SYMBOLIT) {
      const { nappi, luku } = napit.get(symboli.id);
      const maara = aanet[symboli.id] ?? 0;
      luku.textContent = maara ? String(maara) : '';
      const omaTama = oma === symboli.id;
      nappi.classList.toggle('oma', omaTama);
      nappi.setAttribute('aria-pressed', omaTama ? 'true' : 'false');
      const lukema = maara ? `, ${maara} ${maara === 1 ? 'ääni' : 'ääntä'}` : '';
      nappi.title = symboli.id === 'virhe'
        ? `Virhe — kerro mikä on väärin${lukema}`
        : `${symboli.nimi}${lukema}`;
      nappi.setAttribute('aria-label', omaTama
        ? `${symboli.nimi}${lukema} — oma äänesi, napauta perumiseksi`
        : `${symboli.nimi}${lukema}`);
    }
    // Virheilmoituksen istuntoesto: tahran saa yhä painaa (ääni on
    // ääni), mutta tekstikenttä ei aukea toista kertaa samalle
    // sisällölle. Nappi kertoo sen otsikossaan.
    if (reaktioIlmoitettu(avain)) {
      const { nappi } = napit.get('virhe');
      nappi.classList.add('ilmoitettu');
      nappi.title = 'Virhe on jo ilmoitettu tästä sisällöstä';
    }
  };

  const piirraKaikki = () => { paivitaLepo(); paivitaValikko(); };

  /* ---------- laskurien haku ---------- */

  const hae = async () => {
    if (haettu) return;
    haettu = true;
    const tulos = await haeReaktiolaskurit([avain]);
    if (!tulos[avain]) return; // verkko poikki: nollanäkymä jää voimaan
    aanet = tulos[avain];
    REAKTIO_VALIMUISTI.set(avain, aanet);
    piirraKaikki();
  };

  /* ---------- äänestys ---------- */

  const aanesta = (symboliId) => {
    const edellinen = oma;
    // Sama symboli uudestaan perii äänen — sama ele antaa ja ottaa.
    const uusi = edellinen === symboliId ? '' : symboliId;
    // OPTIMISTINEN PÄIVITYS: luvut liikkuvat heti, ennen kuin verkosta
    // tiedetään mitään. Palvelimen vastaus korjaa ne, jos joku muu
    // ehti äänestää samalla.
    if (edellinen && aanet[edellinen] > 0) aanet[edellinen] -= 1;
    if (uusi) aanet[uusi] = (aanet[uusi] ?? 0) + 1;
    oma = uusi;
    asetaOmaAani(avain, uusi);
    REAKTIO_VALIMUISTI.set(avain, aanet);
    piirraKaikki();
    if (uusi) {
      const { nappi } = napit.get(uusi);
      nappi.classList.remove('reaktio-poks');
      void nappi.offsetWidth;
      nappi.classList.add('reaktio-poks');
    }
    lahetaAani(avain, uusi, edellinen, otsikko).then((vahvistetut) => {
      if (!vahvistetut) return;
      aanet = vahvistetut;
      REAKTIO_VALIMUISTI.set(avain, aanet);
      piirraKaikki();
    });
  };

  /* ---------- virheilmoituksen minipopup ---------- */

  const avaaVirheikkuna = () => {
    const runko = html('div', 'reaktio-virheikkuna');
    runko.appendChild(html('p', 'reaktio-virheohje',
      'Mikä tässä on väärin? Kirjoita lyhyesti — vuosiluku, nimi, '
      + 'paikka tai mikä tahansa, mikä ei täsmää.'));
    const kentta = document.createElement('textarea');
    kentta.className = 'reaktio-teksti';
    kentta.rows = 3;
    kentta.maxLength = REAKTIO_TEKSTIN_KATTO;
    kentta.placeholder = 'Esimerkiksi: silta valmistui 1894, ei 1849.';
    kentta.setAttribute('aria-label', 'Virheen kuvaus');
    runko.appendChild(kentta);
    const livia = html('p', 'reaktio-livia');
    livia.hidden = true;
    runko.appendChild(livia);
    const lomakenapit = html('div', 'reaktio-lomakenapit');
    const laheta = html('button', 'reaktio-laheta', 'Lähetä Livialle');
    laheta.type = 'button';
    const peru = html('button', 'reaktio-peru', 'Peru');
    peru.type = 'button';
    peru.addEventListener('click', () => suljeMinipopup());
    lomakenapit.append(laheta, peru);
    runko.appendChild(lomakenapit);

    // Jatkokysymys kysytään KERRAN: jos pelaaja lähettää tyhjän kentän
    // uudestaan, ilmoitus lähtee sellaisenaan. Tahra on tieto siinäkin
    // tapauksessa — vain korjaaminen on hitaampaa.
    let kysytty = false;
    laheta.addEventListener('click', () => {
      const teksti = kentta.value.trim();
      if (!teksti && !kysytty) {
        kysytty = true;
        livia.textContent = LIVIAN_JATKOKYSYMYS;
        livia.hidden = false;
        kentta.focus?.();
        return;
      }
      REAKTIO_ILMOITETUT.add(avain);
      // Tahra on ääni siinä missä muutkin: sama polku, samat laskurit.
      if (oma !== 'virhe') aanesta('virhe');
      else piirraKaikki();
      lahetaReaktio('virhe', avain, { teksti, otsikko });
      livia.textContent = LIVIAN_KIITOKSET[Math.floor(Math.random() * LIVIAN_KIITOKSET.length)];
      livia.hidden = false;
      kentta.disabled = true;
      laheta.disabled = true;
      peru.textContent = 'Sulje';
      sano('Kiitos — ilmoitus lähti.', true);
    });

    avaaMinipopup({
      otsikko: otsikko ? `Virheilmoitus — ${otsikko}` : 'Virheilmoitus',
      sisalto: runko,
      luokka: 'minipopup-reaktio',
    });
    kentta.focus?.();
  };

  /* ---------- eleet ---------- */

  for (const symboli of REAKTIO_SYMBOLIT) {
    const { nappi } = napit.get(symboli.id);
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      if (symboli.id !== 'virhe') { aanesta(symboli.id); return; }
      // Tahra: jos siitä on jo ilmoitettu tässä istunnossa, napautus on
      // pelkkä ääni (tai sen peruminen) eikä avaa kenttää uudestaan.
      if (reaktioIlmoitettu(avain) || oma === 'virhe') { aanesta('virhe'); return; }
      avaaVirheikkuna();
    });
  }

  const asetaAuki = (tila) => {
    auki = tila;
    valikko.hidden = !tila;
    rivi.classList.toggle('auki', tila);
    lepo.setAttribute('aria-expanded', tila ? 'true' : 'false');
    if (tila) hae();
  };

  lepo.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    asetaAuki(!auki);
  });

  rivi.append(lepo, valikko, kuittaus);
  piirraKaikki();
  kohde.appendChild(rivi);
  return rivi;
}

/**
 * Väliotsikon reaktionappi: sama komponentti pienenä, otsikkorivin
 * PÄÄHÄN eikä leipätekstin päälle.
 *
 * Oma kutsupintansa, koska väliotsikoita on satoja ja niiden
 * kohdeavain on johdettu (otsikkoAvain) — kutsupaikan ei pidä joka
 * kerta muistaa kumpaakaan.
 *
 * @param {HTMLElement} otsikkoRivi otsikon säiliö (rivin päähän)
 * @param {string} sivunAvain sivun tunniste (aihe:… tai juttu:…)
 * @param {string} otsikko väliotsikon teksti
 * @returns {HTMLElement|null} rivi tai null
 */
export function piirraOtsikonReaktio(otsikkoRivi, sivunAvain, otsikko) {
  const avain = otsikkoAvain(sivunAvain, otsikko);
  if (!avain) return null;
  return piirraReaktiot(otsikkoRivi, avain, { otsikko, luokka: 'reaktiot-otsikko' });
}

/* ------------------------------------------------------------------ *
 * Työhuone (js/lehti.js Lukijoilta-lehti)
 * ------------------------------------------------------------------ */

/**
 * Kaikki kohteet, joilla on ääniä — tahralliset ensin.
 *
 * @param {string} avain kuratointiavain (EHDOTUS_AVAIN)
 * @returns {Promise<Array<object>>} kohteet laskureineen
 */
export async function haeReaktiolista(avain) {
  const vastaus = await fetch(
    `${EHDOTUS_OSOITE}/reaktio-lista?avain=${encodeURIComponent(avain)}`,
  );
  if (vastaus.status === 401) throw new Error('Avain ei kelpaa.');
  if (!vastaus.ok) throw new Error(`HTTP ${vastaus.status}`);
  const data = await vastaus.json();
  return data.kohteet ?? [];
}

/**
 * Merkitsee kohteen virheen korjatuksi: tahralaskuri nollautuu ja
 * tahra häviää pelaajien näkymästä. Muut äänet jäävät koskematta.
 *
 * @param {string} avain kuratointiavain
 * @param {string} kohde kohdeavain
 * @returns {Promise<object>} workerin vastaus
 */
export async function merkitseVirheKorjatuksi(avain, kohde) {
  const vastaus = await fetch(
    `${EHDOTUS_OSOITE}/reaktio-korjattu?avain=${encodeURIComponent(avain)}`,
    {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ kohde }),
    },
  );
  let data = null;
  try { data = await vastaus.json(); } catch { /* tyhjä runko */ }
  if (vastaus.status === 401) throw new Error('Avain ei kelpaa.');
  if (!vastaus.ok) throw new Error(data?.virhe ?? `HTTP ${vastaus.status}`);
  // Välimuisti pois, jotta seuraava piirto näyttää nollatun tahran.
  REAKTIO_VALIMUISTI.delete(String(kohde));
  return data ?? {};
}
