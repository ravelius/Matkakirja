/*
 * REAKTIOT — peukku ja virheilmoitus jokaisen sisällön kylkeen.
 *
 * MIKÄ TÄMÄ ON: pelaaja lukee lehteä, kohdekorttia tai nähtävyysjuttua
 * ja huomaa joko jotain hyvää tai jotain väärää. Kummallekin on nyt
 * yksi ele: pieni PEUKKU ("tästä pidin") ja pieni LIPPU ("tässä on
 * virhe"). Peukku on yhden napautuksen mittainen; lipun takaa aukeaa
 * kenttä, johon voi — mutta ei tarvitse — kirjoittaa mitä on vialla.
 *
 * MIKSI OMA MODUULI: sama rivi kiinnittyy neljään eri piirtäjään
 * (js/maalehti.js aihesivu, js/nahtavyydet.js juttu, js/fokuskohteet.js
 * kartan tietoruutu ja sen suurennos, js/ui.js kuvasuurennos). Yksi
 * komponentti yhdessä paikassa on ainoa tapa pitää ele samana kaikissa.
 * Malli on pöllöpoiminnoista (js/pollopoiminnat.js): pieni piirtäjä,
 * joka saa säiliön ja sisällön tunnisteen.
 *
 * ── KANAVA ────────────────────────────────────────────────────────
 *
 * Reaktio kulkee SAMAA putkea kuin lukijoiden ehdotukset
 * (js/ehdotukset.js lahetaEhdotus → workerin POST /laheta → yksityinen
 * ämpäri → työhuoneen Lukijoilta-lehti). Workeriin EI tarvita mitään
 * muutosta: reaktio muotoillaan olemassa olevan ehdotuksen sisään niin,
 * että tyyppi näkyy tekstin ja tarkenteen ETULIITTEESSÄ
 * ("REAKTIO/PEUKKU:", "REAKTIO/VIRHE:"). Omistaja voi siis lajitella
 * ne Lukijoilta-lehdessä heti, ja jos kanava joskus saa oman reittinsä,
 * vaihdos on tämän tiedoston sisäinen asia.
 *
 * KANAVA KIINNI = RIVIÄ EI OLE. Sama sääntö kuin ehdotuslomakkeella:
 * kun EHDOTUS_OSOITE on tyhjä, pelaajalle ei näytetä nappia, joka ei
 * tee mitään.
 *
 * ── KOLME SÄÄNTÖÄ, JOTKA PITÄVÄT ──────────────────────────────────
 *
 *   1. PELAAMINEN EI KOSKAAN PYSÄHDY. Lähetys on tulessa-ja-unohda:
 *      verkkovirhe ei näy pelaajalle vaan menee jonoon (localStorage)
 *      ja lähtee uudestaan seuraavalla kerralla tai kun selain palaa
 *      verkkoon. Peukku kuittaa heti, ennen kuin verkosta tiedetään
 *      mitään.
 *   2. PEUKKUJA SAA ANTAA MONTA, VIRHEILMOITUKSIA YKSI per sisältö per
 *      istunto. Ilo saa toistua; virheilmoitus ei ole klikkailua, ja
 *      sama vika kymmenenä kopiona vain hukuttaa kuratoinnin. Esto on
 *      kevyt (muistissa oleva joukko) eikä pysyvä: uusi istunto avaa
 *      lipun uudestaan, koska juttu on voinut sillä välin muuttua.
 *   3. RIVI EI OLE SISÄLTÖÄ. Se ei päädy lukijan ääneen (ei
 *      data-lukija-solmuja) eikä pöllön kontekstiin (data-pollo="ei").
 */

import { html } from './ui-apurit.js';
import { ehdotusKaytossa, lahetaEhdotus } from './ehdotukset.js';

/* ------------------------------------------------------------------ *
 * Vakiot
 * ------------------------------------------------------------------ */

/** Aihe-etuliitteet, joilla omistaja tunnistaa reaktion Lukijoilta-lehdessä. */
export const REAKTIO_ETULIITTEET = {
  peukku: 'REAKTIO/PEUKKU',
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

/** Lähettämättä jääneet reaktiot laitteen muistissa. */
export const REAKTIO_JONO_TALLE = 'matkakirja-reaktiojono';

/**
 * Sisällöt, joista on jo ilmoitettu virhe TÄSSÄ istunnossa.
 *
 * Muistissa eikä localStoragessa tarkoituksella: esto on kohteliaisuus
 * kuratointia kohtaan, ei lukko. Peli päivittyy monta kertaa viikossa,
 * ja seuraavan käynnistyksen jälkeen sama juttu voi olla eri juttu.
 */
const REAKTIO_ILMOITETUT = new Set();

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

/** Unohtaa istunnon virheilmoitukset (testit ja savukkeet). */
export function nollaaReaktiot() {
  REAKTIO_ILMOITETUT.clear();
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
 * Hyötykuorma, jonka worker näkee.
 *
 * Muoto on tarkoituksella ehdotuksen muoto (teksti + sivu + tarkenne),
 * jotta nykyinen worker ottaa sen vastaan sellaisenaan. Tyyppi ja
 * sisällön tunniste ovat KAHDESTI — etuliitteessä ja omalla rivillään
 * — koska Lukijoilta-lehti näyttää tarkenteen otsikkona ja tekstin
 * leipänä, ja kummankin on kerrottava mistä on kyse yksin.
 *
 * @param {'peukku'|'virhe'} tyyppi reaktion laji
 * @param {string} tunniste sisällön tunniste, esim. 'juttu:lontoo:Tower Bridge'
 * @param {object} [lisat]
 * @param {string} [lisat.teksti] pelaajan vapaateksti (vain virhe)
 * @param {string} [lisat.otsikko] sisällön ihmisluettava nimi
 * @returns {object} ehdotuskanavan kentät
 */
export function reaktionKuorma(tyyppi, tunniste, { teksti = '', otsikko = '' } = {}) {
  const etuliite = REAKTIO_ETULIITTEET[tyyppi] ?? REAKTIO_ETULIITTEET.peukku;
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
 * Jono — lähetys ei saa kadota verkkokatkoon
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
 * Yrittää lähettää jonossa odottavat reaktiot.
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
 * Lähettää yhden reaktion. EI KOSKAAN HYLKÄÄ: virhe menee jonoon ja
 * kutsuja saa falsen, jolloin se voi halutessaan sanoa sen ääneen —
 * mutta peli ei pysähdy eikä pelaajalle näytetä virheilmoitusta
 * peukusta, joka ei mennyt perille sekunnissa.
 *
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

/*
 * Kaksi piirrosta samalla kynällä kuin pelin muut viivaikonit
 * (js/ui-apurit.js VIIVA_IKONIT): 24 × 24, pelkkä ääriviiva, ei
 * täyttöä. Peukku on käsi ja rannekäänne; virhe on kartoittajan
 * lippu tankoineen — ei somen huutomerkkiä vaan merkki, jonka
 * tutkimusmatkailija jättää paikkaan, johon on palattava.
 */
const REAKTIO_PEUKKU_POLKU = '<path d="M7.4 20.4V10.6h2.1l3.3-6.2c.2-.4.6-.7 1.1-.7'
  + '.9 0 1.6.8 1.5 1.7l-.5 3.7h4.1c1 0 1.8.9 1.6 1.9l-1.1 6.3c-.2 1-1 1.7-2 1.7z"/>'
  + '<rect x="3.6" y="10.6" width="3.8" height="9.8" rx="1"/>';

const REAKTIO_LIPPU_POLKU = '<path d="M6.6 20.4V4.2"/>'
  + '<path d="M6.6 5.1h10.9l-2.4 3.6 2.4 3.6H6.6z"/>'
  + '<path d="M4.4 20.4h4.4"/>';

/** Viivaikoni napin sisään. */
function reaktioIkoni(polut) {
  const span = html('span', 'reaktio-ikoni');
  span.innerHTML = `<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"`
    + ` fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"`
    + ` stroke-linejoin="round">${polut}</svg>`;
  return span;
}

/* ------------------------------------------------------------------ *
 * Rivi
 * ------------------------------------------------------------------ */

/**
 * Piirtää reaktiorivin sisällön loppuun.
 *
 * Rivi on tarkoituksella vaisu: kaksi pientä kuvakenappia lähderivin
 * kokoisina, ei somen nappirivi. Se on lehden reunamerkintä, ei
 * kehotus.
 *
 * @param {HTMLElement} kohde säiliö, jonka loppuun rivi liitetään
 * @param {string} tunniste sisällön tunniste (peukku ja virhe osoittavat
 *   tähän; ilman sitä riviä ei piirretä)
 * @param {object} [asetukset]
 * @param {string} [asetukset.otsikko] sisällön ihmisluettava nimi
 * @param {string} [asetukset.luokka] lisäluokka riville (sijoittelu)
 * @returns {HTMLElement|null} rivi tai null
 */
export function piirraReaktiot(kohde, tunniste, asetukset = {}) {
  if (!kohde || typeof document === 'undefined') return null;
  if (!tunniste || !reaktiotKaytossa()) return null;
  const { otsikko = '', luokka = '' } = asetukset;

  // Odottavat lähetykset pois alta aina kun rivi piirtyy: pelaaja on
  // juuri nyt sisällön äärellä, ja jos verkko on palannut, jono lähtee
  // huomaamatta. Virhe ei kaada piirtoa.
  puraReaktiojono().catch(() => {});

  const rivi = html('div', `reaktiorivi${luokka ? ` ${luokka}` : ''}`);
  // Pöllön musta lista: palautenapit eivät ole juttua eivätkä kuulu
  // chatin kontekstiin (js/pollo.js SPOILERI_LOHKOT).
  rivi.dataset.pollo = 'ei';

  const napit = html('div', 'reaktio-napit');
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

  /* ---------- peukku ---------- */

  const peukku = html('button', 'reaktionappi reaktio-peukku');
  peukku.type = 'button';
  peukku.title = 'Tästä pidin';
  peukku.setAttribute('aria-label', otsikko ? `Tästä pidin: ${otsikko}` : 'Tästä pidin');
  peukku.appendChild(reaktioIkoni(REAKTIO_PEUKKU_POLKU));
  peukku.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    // Kuittaus ENSIN: peukku on yhden napautuksen ele, eikä pelaajan
    // kuulu jäädä odottamaan verkkoa nähdäkseen että se meni perille.
    peukku.classList.remove('reaktio-poks');
    void peukku.offsetWidth;
    peukku.classList.add('reaktio-poks');
    sano('Kiitos!');
    lahetaReaktio('peukku', tunniste, { otsikko });
  });
  napit.appendChild(peukku);

  /* ---------- virheilmoitus ---------- */

  const virhe = html('button', 'reaktionappi reaktio-virhenappi');
  virhe.type = 'button';
  virhe.title = 'Tässä on virhe';
  virhe.setAttribute('aria-label', otsikko ? `Ilmoita virhe: ${otsikko}` : 'Ilmoita virhe');
  virhe.setAttribute('aria-expanded', 'false');
  virhe.appendChild(reaktioIkoni(REAKTIO_LIPPU_POLKU));
  napit.appendChild(virhe);

  rivi.append(napit, kuittaus);

  /*
   * Lomake syntyy vasta napautuksesta eikä piiloon jokaisen jutun
   * pohjalle: tyhjä textarea joka artikkelissa olisi turhaa painoa
   * DOMissa ja ruudunlukijan puheessa.
   */
  let lomake = null;

  const suljeLomake = () => {
    lomake?.remove();
    lomake = null;
    virhe.setAttribute('aria-expanded', 'false');
  };

  const merkitseIlmoitetuksi = () => {
    REAKTIO_ILMOITETUT.add(String(tunniste));
    virhe.disabled = true;
    virhe.title = 'Virhe on jo ilmoitettu tästä sisällöstä';
  };

  if (reaktioIlmoitettu(tunniste)) merkitseIlmoitetuksi();

  virhe.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    if (lomake) { suljeLomake(); return; }
    lomake = html('div', 'reaktio-lomake');
    const kentta = document.createElement('textarea');
    kentta.className = 'reaktio-teksti';
    kentta.rows = 2;
    kentta.maxLength = REAKTIO_TEKSTIN_KATTO;
    kentta.placeholder = 'Mikä tässä on väärin? (vapaaehtoinen)';
    kentta.setAttribute('aria-label', 'Virheen kuvaus, vapaaehtoinen');
    const lomakenapit = html('div', 'reaktio-lomakenapit');
    const laheta = html('button', 'reaktio-laheta', 'Lähetä');
    laheta.type = 'button';
    const peru = html('button', 'reaktio-peru', 'Peru');
    peru.type = 'button';
    peru.addEventListener('click', (e) => { e.stopPropagation(); suljeLomake(); });
    laheta.addEventListener('click', (e) => {
      e.stopPropagation();
      const teksti = kentta.value;
      // Kuittaus ja esto heti: lähetys jatkuu taustalla, ja jos verkko
      // pettää, kuorma menee jonoon eikä pelaaja näe siitä mitään.
      merkitseIlmoitetuksi();
      suljeLomake();
      sano('Kiitos — ilmoitus lähti.', true);
      lahetaReaktio('virhe', tunniste, { teksti, otsikko });
    });
    lomakenapit.append(laheta, peru);
    lomake.append(kentta, lomakenapit);
    rivi.appendChild(lomake);
    virhe.setAttribute('aria-expanded', 'true');
    // Kohdistus vasta liittämisen jälkeen, jotta näppäimistö avautuu
    // kosketuslaitteella samalla eleellä.
    kentta.focus?.();
  });

  kohde.appendChild(rivi);
  return rivi;
}
