/*
 * VIISAS PÖLLÖ — pelin oma tietokumppani.
 *
 * Pöllö on alanappirivin keskimmäinen nappi (js/ui.js piirraToimintorivi)
 * ja lehtinäkymässä lehden kulmassa kelluva nappi. Napautus avaa
 * chat-paneelin: yläosassa muutama tekoälyn ehdottama kysymys, alhaalla
 * sanelunappi ja sen takana kirjoituskenttä. Pöllö EI koskaan ponnahda
 * itsestään (pelin sääntö) — se aukeaa vain napautuksesta ja sulkeutuu
 * selvästä rastista.
 *
 * KOLME ASIAA, JOTKA TÄSSÄ TIEDOSTOSSA OVAT TÄRKEIMMÄT
 *
 * 1. Kontekstinkeruu. Pöllö saa tietää, missä pelaaja on ja mitä
 *    ruudulla näkyy, jotta se voi syventää juuri sitä. Paketti kootaan
 *    avaus- ja kysymyshetkellä, ja se on enintään 5000 merkkiä.
 *
 * 2. Paikallinen tietohaku (js/pollo-haku.js). Ennen kysymyksen
 *    lähettämistä pelin omasta tarkistetusta aineistosta haetaan
 *    osuvimmat katkelmat lähdeleimoineen ja ne liitetään pakettiin.
 *    Pöllö suosii niitä, koska ne on jo kertaalleen tarkistettu.
 *
 * 3. Spoilerisuoja. Aktiivista tehtävää — visaa, minitehtävää,
 *    kohtaamisen kysymystä — vaihtoehtoineen ja vastauksineen ei laiteta
 *    kontekstiin KOSKAAN. Se on toteutettu kolmella lukolla:
 *
 *      a) VALKOINEN LISTA. Lehdestä luetaan vain LEHTI_LOHKOT-listan
 *         nimeämät lohkot. Mitään ei kerätä "kaikki näkyvä teksti"
 *         -periaatteella, joten uusi tehtävälohko ei voi vahingossa
 *         vuotaa mukaan — se pitäisi erikseen lisätä listalle.
 *      b) MUSTA LISTA. Sallitunkin lohkon sisältä poistetaan
 *         SPOILERI_LOHKOT-listan solmut ennen tekstin lukemista
 *         (aihesivun minitehtävä asuu kirjaimellisesti jutun perässä
 *         samassa säiliössä, joten pelkkä valkoinen lista ei riittäisi).
 *      c) HAUN RAJAUS. Indeksiin ei oteta tarinakaanonia eikä
 *         kysymyspankkeja lainkaan, ja minitehtävän fakta tulee mukaan
 *         vasta kun pelaaja on ratkaissut sen (js/pollo-haku.js).
 *
 *    Pelin tilaa luetaan vain pelinTila():n nimeämistä kentistä. Se ei
 *    kosketa game.quiz-, game.duel- eikä game.eventCard-olioihin
 *    lainkaan — niissä asuvat kysymykset ja oikeat vastaukset.
 *
 * Neljäs lukko on palvelimen puolella: järjestelmäkehote elää
 * workerissa (tools/pollo/worker.js), joten sitä ei voi kiertää
 * muokkaamalla selaimen koodia.
 *
 * Kertojaääntä ei kytketä tähän — pöllön luenta on myöhempi
 * natiiviominaisuus. Sanelu on eri asia: se on pelaajan puhetta
 * sisään, ei pöllön puhetta ulos.
 */

import { POLLOPALVELIN } from './packs/pollo-asetukset.js';
import { KULTTUURI_KATEGORIAT } from './packs/kulttuuri-kategoriat.js';
import { MAA_KATEGORIAT } from './packs/maa-kategoriat.js';
import { NAHTAVYYSJUTUT } from './packs/nahtavyysjutut.js';
import { POLLON_LINKKIKATTO, etsiAnkkuri, haeKatkelmat, rakennaIndeksi } from './pollo-haku.js';
import { lueAaneen, lukijaTuettu, pysaytaLukija } from './lukija.js';

/** Kontekstipaketin katto merkkeinä. Sama luku myös workerin puolella. */
export const KONTEKSTIN_ENIMMAISPITUUS = 5000;

/** Yksittäisten osien katot, jottei mikään niistä syö koko pakettia. */
const MATKAKIRJAN_KATTO = 900;
const LOHKON_KATTO = 1600;
const AINEISTON_KATTO = 1900;

/** Montako viestiä keskustelusta lähetetään mukaan seuraavaan. */
const HISTORIAN_KATTO = 6;

/** Puheentunnistuksen kieli. */
export const PUHE_KIELI = 'fi-FI';

/**
 * Kaiuttimen tila laitteella.
 *
 * Kaiutin on VIPU eikä kertakäyttönappi: päällä ollessaan se lukee
 * jokaisen uuden vastauksen heti sen saavuttua. Valinta on laitteen
 * asetus (kuten äänet ja kertoja), joten se säilyy käyntien yli eikä
 * kuulu pelin tallennukseen.
 */
export const POLLO_AANI_AVAIN = 'matkakirja-pollo-aani';

/**
 * Kehittäjäkoodi laitteella.
 *
 * Koodi EI ole repossa: omistaja syöttää sen kehittäjätilassa pöllön
 * paneeliin, ja se lähtee pyynnön otsakkeessa välityspalvelimelle,
 * joka ohittaa sillä käyttörajat (tools/pollo/worker.js).
 */
export const POLLO_KEHITTAJAKOODI_AVAIN = 'matkakirja-pollo-kehittajakoodi';

/** Otsake, jossa kehittäjäkoodi kulkee. Sama nimi workerin puolella. */
export const POLLO_KEHITTAJA_OTSAKE = 'X-Pollo-Kehittaja';

/*
 * Kehittäjätilan avain luetaan suoraan localStoragesta eikä js/ui.js:n
 * kautta: ui.js tuo tämän tiedoston, joten tuonti takaisin olisi kehä.
 * Sama ratkaisu kuin js/linssit/omistus.js:ssä.
 */
const POLLO_KEHITTAJA_TILA_AVAIN = 'matkakirja-kehittaja';

/**
 * VALKOINEN LISTA: mistä lehden tekstit luetaan.
 *
 * Järjestys on tärkeysjärjestys — jos paketti täyttyy, loppupää jää
 * pois. Otsikko on se sana, jolla lohko esitellään pöllölle.
 */
export const LEHTI_LOHKOT = [
  { valitsin: '#arrival-city', otsikko: 'Lehden nimiö' },
  { valitsin: '#arrival-lehti-pvm', otsikko: 'Päiväys' },
  { valitsin: '#arrival-intro', otsikko: 'Kaupungin esittely' },
  /*
   * Lehden oma maaosasto EI ole sijaintitieto: Maiden tiedot
   * -varusteella auki voi olla minkä tahansa maan lehti. Otsikot
   * sanovat sen ääneen, jottei pöllö lue niitä pelaajan sijainniksi.
   */
  { valitsin: '#arrival-maa-nimi', otsikko: 'Lehden maaosasto koskee maata' },
  { valitsin: '#arrival-maa-intro', otsikko: 'Lehden maaosaston esittely' },
  { valitsin: '#arrival-maa-tunnusluvut', otsikko: 'Lehden maaosasto numeroina' },
  { valitsin: '#arrival-kategoria', otsikko: 'Avoinna oleva sivu' },
  { valitsin: '#arrival-kulttuuri-lista', otsikko: 'Lehden nostot' },
];

/**
 * MUSTA LISTA: mitä sallitunkin lohkon sisältä poistetaan.
 *
 * Nämä ovat pelin tehtäviä: kysymys, vaihtoehdot, vihje ja tulos.
 * Jos peliin tulee uusi tehtävätyyppi, sen juurisolmu lisätään tähän —
 * tai sille annetaan attribuutti data-pollo="ei", joka toimii ilman
 * koodimuutosta.
 */
export const SPOILERI_LOHKOT = [
  '[data-pollo="ei"]',
  '.minitehtava',
  '#arrival-kulttuuri-visa',
  '#arrival-kulttuuri-kysymys',
  '#arrival-kulttuuri-vaihtoehdot',
  '.kulttuuri-vaihtoehdot',
  '#quiz-dialog',
  '.quiz-question',
  '.quiz-options',
  '.quiz-hint-text',
  '.quiz-result',
];

/* ------------------------------------------------------------------ */
/* Kontekstinkeruu                                                     */
/* ------------------------------------------------------------------ */

/** Rivinvaihdot ja tuplavälit pois; tyhjästä tulee tyhjä merkkijono. */
function polloSiisti(teksti) {
  return String(teksti ?? '').replace(/\s+/g, ' ').trim();
}

/** Leikkaa tekstin kattoon ja merkitsee leikkauksen. */
function polloLeikkaa(teksti, katto) {
  const t = String(teksti ?? '');
  return t.length > katto ? `${t.slice(0, katto - 1)}…` : t;
}

/** Onko elementti (tai jokin sen esivanhempi) piilotettu? */
function polloPiilossa(el) {
  if (!el) return true;
  if (el.hidden) return true;
  return Boolean(el.closest?.('[hidden]'));
}

/**
 * Yhden lohkon teksti ilman spoilereita.
 *
 * Työ tehdään KOPIOLLE: alkuperäistä DOMia ei kosketa, joten pelaajan
 * näkymä ei muutu vaikka tehtävälohkoja poistetaan luettavasta.
 */
export function tekstiIlmanSpoilereita(el, estot = SPOILERI_LOHKOT) {
  if (!el) return '';
  // Jos lohko on itse tehtävä, siitä ei oteta mitään.
  for (const esto of estot) {
    if (el.matches?.(esto)) return '';
  }
  const kopio = el.cloneNode ? el.cloneNode(true) : el;
  for (const esto of estot) {
    for (const roska of kopio.querySelectorAll?.(esto) ?? []) roska.remove?.();
  }
  return polloSiisti(kopio.textContent);
}

/**
 * Kerää valkoisen listan lohkot juuresta.
 *
 * Piilotetut lohkot ohitetaan: lehden sivut ovat samassa dialogissa ja
 * vain avoinna oleva sivu on näkyvissä, joten tämä rajaa paketin
 * siihen mitä pelaaja oikeasti katsoo.
 */
export function poimiLohkot(juuri, lohkot = LEHTI_LOHKOT, estot = SPOILERI_LOHKOT) {
  if (!juuri?.querySelectorAll) return [];
  const tulos = [];
  for (const { valitsin, otsikko } of lohkot) {
    for (const el of juuri.querySelectorAll(valitsin) ?? []) {
      if (polloPiilossa(el)) continue;
      const teksti = polloLeikkaa(tekstiIlmanSpoilereita(el, estot), LOHKON_KATTO);
      if (teksti) tulos.push({ otsikko, teksti });
    }
  }
  return tulos;
}

/**
 * Maan nimi ISO-3-tunnuksesta pelin omalla aineistolla.
 *
 * Sama lähde kuin kartan maakyltillä (js/ui.js drawCountryBorders →
 * paivitaMaaPilleri): map.countryShapes[iso].nimi. Jos laudalla ei ole
 * tälle maalle muotoa, nimeä EI ole — silloin myös kartan kyltti on
 * piilossa, eikä pöllökään saa keksiä maata omin päin.
 *
 * Nimi on pöllön oma (polloMaanNimi eikä maanNimi): yhden tiedoston
 * koonti on yhtä näkyvyysaluetta, ja js/ui.js käyttää nimeä maanNimi
 * sekä paikallismuuttujana että parametrina.
 */
function polloMaanNimi(game, iso) {
  if (!iso) return null;
  try {
    return game?.pack?.map?.countryShapes?.[iso]?.nimi ?? null;
  } catch {
    return null;
  }
}

/**
 * Pelin tila kontekstia varten.
 *
 * TÄMÄ ON SPOILERISUOJAN YDIN: funktio lukee vain nämä kentät.
 * game.quiz, game.duel, game.eventCard ja game.arrivalFact jäävät
 * koskematta — niissä ovat aktiivisen tehtävän kysymys, vaihtoehdot ja
 * oikean vastauksen indeksi.
 *
 * MAA JOHDETAAN AINA KAUPUNGISTA (omistajan havainto 13.8.2026).
 * Pelaaja oli Sofiassa, ja pöllö väitti Sofiaa Kreikan pääkaupungiksi:
 * konteksti luki maan ui.arrivalMaaTiedoista, joka osoittaa VIIMEKSI
 * AVATTUUN maalehteen — Maiden tiedot -varusteella selattu Kreikka jäi
 * siihen roikkumaan, vaikka pelaaja seisoi Bulgariassa. Nyt ketju on
 * yksi ja sama kuin kartan maakyltillä: kaupunki → map.cityCountry →
 * map.countryShapes[iso].nimi. Jos nimeä ei löydy, maa jää kokonaan
 * pois — väärä maa on pahempi kuin puuttuva.
 */
export function pelinTila(game) {
  if (!game) return {};
  const cityId = game.player?.pos?.city ?? null;
  let kaupunki = null;
  try {
    kaupunki = cityId ? game.board?.cityById?.get(cityId)?.name ?? null : null;
  } catch {
    kaupunki = null;
  }
  let paiva = null;
  try {
    paiva = game.dayCount?.() ?? null;
  } catch {
    paiva = null;
  }
  let maaIso = null;
  try {
    maaIso = cityId ? game.pack?.map?.cityCountry?.[cityId] ?? null : null;
  } catch {
    maaIso = null;
  }
  return {
    lauta: game.pack?.name ?? null,
    kaupunki,
    maaIso,
    maa: polloMaanNimi(game, maaIso),
    paiva,
  };
}

/**
 * Kokoaa tekstipaketin. Enintään KONTEKSTIN_ENIMMAISPITUUS merkkiä.
 *
 * Järjestys on tärkeysjärjestys: otsikkorivit ensin (ne mahtuvat
 * aina), sitten pelin oman aineiston katkelmat omalla katollaan, ja
 * lopuksi avoinna olevan lehden tekstit niin paljon kuin jää tilaa.
 * Aineistolla on oma katto siksi, ettei pitkä lehtisivu söisi sitä
 * kokonaan — tarkistettu tieto on juuri se, mitä pöllön pitäisi
 * ensisijaisesti käyttää.
 */
export function kokoaKonteksti({
  lauta = null,
  kaupunki = null,
  maa = null,
  paiva = null,
  nakyma = null,
  matkakirja = null,
  aineisto = [],
  lohkot = [],
} = {}, katto = KONTEKSTIN_ENIMMAISPITUUS) {
  const rivit = [];
  if (lauta) rivit.push(`Lauta: ${polloSiisti(lauta)}`);
  if (kaupunki) rivit.push(`Kaupunki, jossa pelaaja on: ${polloSiisti(kaupunki)}`);
  // Sama sanamuoto kuin kaupungilla: lehtilohkoissa voi olla toisen maan
  // osasto (Maiden tiedot -varusteella selattu vieras maalehti), joten
  // pelkkä "Maa:" olisi kahdesti kontekstissa eri merkityksessä.
  if (maa) rivit.push(`Maa, jossa pelaaja on: ${polloSiisti(maa)}`);
  if (paiva) rivit.push(`Matkapäivä: ${paiva}`);
  if (nakyma) rivit.push(`Näkymä: ${polloSiisti(nakyma)}`);
  if (matkakirja) {
    rivit.push(`Isoisän matkakirjamerkintä: ${polloLeikkaa(polloSiisti(matkakirja), MATKAKIRJAN_KATTO)}`);
  }
  let teksti = rivit.join('\n');

  const palat = Array.isArray(aineisto) ? aineisto : [];
  if (palat.length) {
    let osio = '\n\nPELIN TARKISTETTUA AINEISTOA (käytä ensisijaisesti tätä):';
    for (const pala of palat) {
      const rivi = `\n- [${pala.leima}] ${polloSiisti(pala.teksti)}`;
      if (osio.length + rivi.length > AINEISTON_KATTO) break;
      osio += rivi;
    }
    if (teksti.length + osio.length <= katto) teksti += osio;
  }

  for (const lohko of Array.isArray(lohkot) ? lohkot : []) {
    const tilaa = katto - teksti.length;
    if (tilaa < 40) break;
    const pala = `\n\n${lohko.otsikko}: ${lohko.teksti}`;
    teksti += pala.length <= tilaa ? pala : `${pala.slice(0, tilaa - 1)}…`;
  }
  return teksti.slice(0, katto);
}

/**
 * Lukee nykytilan pelistä ja DOMista yhdeksi tekstipaketiksi.
 *
 * ui-olio on valinnainen: siitä otetaan vain tieto siitä, kumpi lehti on
 * auki ja minkä maan lehti se on. Ilman sitä paketti on hieman köyhempi
 * mutta kelvollinen.
 *
 * SIJAINTI EI TULE KOSKAAN UI:STA. Maa luetaan pelinTilasta eli
 * kaupungista johdettuna; ui.arrivalMaaTiedot kertoo vain, minkä maan
 * osasto lehdessä sattuu olemaan auki, ja se voi olla mikä tahansa maa
 * (Maiden tiedot -varuste). Sen käyttäminen sijaintina oli juuri se
 * vika, joka teki Sofiasta Kreikan pääkaupungin.
 */
export function lueNakyma({ game = null, ui = null, doc = document, aineisto = [] } = {}) {
  const tila = pelinTila(game);
  const lehti = doc?.getElementById?.('arrival-dialog') ?? null;
  const lehtiAuki = Boolean(lehti?.open);
  const matkakirja = polloSiisti(doc?.getElementById?.('fact-text')?.textContent);
  // Maalehti kerrotaan nimeltä, jottei sen maaosasto sekoitu siihen
  // maahan, jossa pelaaja seisoo.
  const maalehtiIso = lehtiAuki ? ui?.tutkiMaaLehti ?? null : null;
  const lehdenMaa = polloMaanNimi(game, maalehtiIso);
  let nakyma = 'kartta';
  if (lehtiAuki && maalehtiIso) {
    nakyma = lehdenMaa ? `maan lehti auki (${lehdenMaa})` : 'maan lehti auki';
  } else if (lehtiAuki) {
    nakyma = 'kaupungin lehti auki';
  }
  return kokoaKonteksti({
    ...tila,
    matkakirja,
    nakyma,
    aineisto,
    lohkot: lehtiAuki ? poimiLohkot(lehti) : [],
  });
}

/* ------------------------------------------------------------------ */
/* Käyttöliittymä                                                      */
/* ------------------------------------------------------------------ */

/**
 * Seepiapöllö. Viivapiirros samaan tapaan kuin pelin muut kuvakkeet
 * (.viiva-ikoni): pelkkä ääriviiva, täyttö vain silmäterissä, jotta se
 * istuu kartan mustekynätyyliin.
 */
export const POLLO_IKONI = '<svg viewBox="0 0 24 24" aria-hidden="true">'
  + '<path d="M6.4 5.2 8.4 7.6"/><path d="M17.6 5.2 15.6 7.6"/>'
  + '<path d="M12 3.7c3.3 0 5.7 2.6 5.7 6.3 0 5.1-2.3 8.5-5.7 8.5s-5.7-3.4-5.7-8.5c0-3.7 2.4-6.3 5.7-6.3z"/>'
  + '<circle cx="9.6" cy="9.5" r="1.9"/><circle cx="14.4" cy="9.5" r="1.9"/>'
  + '<circle class="taytto" cx="9.6" cy="9.5" r="0.75"/>'
  + '<circle class="taytto" cx="14.4" cy="9.5" r="0.75"/>'
  + '<path d="M12 11.3 11 13.1h2z"/>'
  + '<path d="M8.7 14.7c1 .9 1.9 1.3 3.3 1.3s2.3-.4 3.3-1.3"/>'
  + '<path d="M9.4 18.4v1.6M14.6 18.4v1.6"/>'
  + '<path d="M4.4 20.2h15.2"/>'
  + '</svg>';

/** Mikrofoni samalla viivakynällä. */
const MIKKI_IKONI = '<svg viewBox="0 0 24 24" aria-hidden="true">'
  + '<rect x="9" y="2.8" width="6" height="11.4" rx="3"/>'
  + '<path d="M5.6 11.4a6.4 6.4 0 0 0 12.8 0"/>'
  + '<path d="M12 17.8v3.4M8.6 21.2h6.8"/>'
  + '</svg>';

/**
 * Näppäimistö samalla viivakynällä. Näppäimet ovat pyöreäpäisiä
 * pistemäisiä vetoja (h.01), jolloin ne piirtyvät pisteinä eivätkä
 * vaadi omaa täyttöä.
 */
const NAPPAIMISTO_IKONI = '<svg viewBox="0 0 24 24" aria-hidden="true">'
  + '<rect x="2.4" y="6.2" width="19.2" height="11.6" rx="2.2"/>'
  + '<path d="M6 10h.01M9.3 10h.01M12.6 10h.01M15.9 10h.01M19.2 10h.01"/>'
  + '<path d="M6 13h.01M9.3 13h.01M12.6 13h.01M15.9 13h.01M19.2 13h.01"/>'
  + '<path d="M8.4 15.6h7.2"/>'
  + '</svg>';

/**
 * Kaiutin samalla viivakynällä kuin muutkin pöllön kuvakkeet.
 *
 * Piirto on sama kuin lukijan napissa (js/lukija.js KAIUTIN_PIIRTO),
 * mutta oma vakionsa: pöllö ei saa riippua lukijan kuvakkeesta, ja
 * yhden tiedoston koonti on yhtä näkyvyysaluetta, jossa kaksi samaa
 * nimeä törmäisi.
 */
const POLLO_KAIUTIN_IKONI = '<svg viewBox="0 0 24 24" aria-hidden="true">'
  + '<path d="M4.2 9.3h3.2l4.4-3.6v12.6l-4.4-3.6H4.2z"/>'
  + '<path d="M14.8 9.4a3.7 3.7 0 0 1 0 5.2"/>'
  + '<path d="M17.4 6.9a7.3 7.3 0 0 1 0 10.2"/>'
  + '</svg>';

/** Laitteelle talletettu asetus. Yksityinen selaus ei saa kaataa mitään. */
function polloAsetus(avain) {
  try {
    return globalThis.localStorage?.getItem(avain) ?? '';
  } catch {
    return '';
  }
}

function polloTallenna(avain, arvo) {
  try {
    if (arvo) globalThis.localStorage?.setItem(avain, arvo);
    else globalThis.localStorage?.removeItem(avain);
  } catch {
    /* yksityinen selaus: valinta jää vain tälle istunnolle */
  }
}

/** Onko pelin kehittäjätila päällä? */
function polloKehittajaTila() {
  return polloAsetus(POLLO_KEHITTAJA_TILA_AVAIN) === '1';
}

const TERVEHDYS = 'Kysy minulta mitä tahansa siitä, mitä kartalla tai '
  + 'lehdessä juuri nyt näkyy — tai muusta maailmasta. Pelin tehtäviä en '
  + 'ratkaise puolestasi.';

const EI_HEREILLA = 'Pöllö ei ole vielä hereillä.';
const EI_HEREILLA_LISA = 'Tietokumppani odottaa vielä käyttöönottoa. '
  + 'Peli toimii normaalisti ilman sitä.';

const SANELU_KUUNTELEE = 'Kuuntelen…';

function polloElementti(tagi, luokka = '', teksti = '') {
  const el = document.createElement(tagi);
  if (luokka) el.className = luokka;
  if (teksti) el.textContent = teksti;
  return el;
}

/** Selaimen puheentunnistus, jos sellainen on. Luetaan vasta tarvittaessa. */
function haePuheTunnistus() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

/**
 * iOS-KUOREN SANELUSILTA (ios/Matkakirja/Selain/natiivi-silta.js).
 *
 * WKWebView ei tarjoa SpeechRecognitionia lainkaan, joten natiivissa
 * kuoressa pöllön mikrofoni olisi ilman tätä pelkkä koriste: nappi
 * näkyisi (Chromium-pohjaisissa selaimissa) tai katoaisi kokonaan, ja
 * sanelu jäisi tekemättä. Kuori tarjoaa saman asian omalla
 * rajapinnallaan — luvat, aloita, tapahtumat, lopeta — ja pelin puoli
 * valitsee sen aina kun se on tarjolla.
 *
 * Ominaisuuslippu ratkaisee: vanha kuori voi tarjota olion ilman
 * toimivaa sanelua. Tiedot luetaan myös suoraan
 * __matkakirjaNatiiviTiedot-oliosta siltä varalta, että kysytään ennen
 * kuin silta on ehtinyt sulattaa sen.
 */
function haeNatiiviSanelu() {
  if (typeof window === 'undefined') return null;
  const natiivi = window.matkakirjaNatiivi;
  if (!natiivi?.onkoNatiivi) return null;
  if (typeof natiivi.sanelu?.aloita !== 'function') return null;
  const lippu = natiivi.ominaisuudet?.sanelu
    ?? window.__matkakirjaNatiiviTiedot?.ominaisuudet?.sanelu;
  return lippu ? natiivi : null;
}

/** Osaako tämä laite sanella jommallakummalla tavalla? */
function saneluTuettu() {
  return Boolean(haeNatiiviSanelu() || haePuheTunnistus());
}

class Pollo {
  /**
   * @param {() => object|null} haeUi palauttaa nykyisen UI-olion.
   *   Getteri eikä suora viittaus, koska uusi peli luo uuden UI:n.
   */
  constructor(haeUi, { palvelin = POLLOPALVELIN, doc = document } = {}) {
    this.haeUi = haeUi;
    this.palvelin = String(palvelin ?? '').replace(/\/+$/, '');
    this.doc = doc;
    this.auki = false;
    this.kesken = false;
    this.historia = [];
    this.ankkuri = null;
    this.indeksi = null;
    this.tunnistin = null;
    this.puhuttu = '';
    // Natiivisanelun purkajat: kuuntele() palauttaa poistofunktion.
    this.saneluKuulijat = [];
    this.natiiviSanelussa = false;
    // Kaiuttimen vipu muistetaan laitteella (ks. POLLO_AANI_AVAIN).
    this.aaniPaalla = polloAsetus(POLLO_AANI_AVAIN) === '1';
    this.viimeisetKatkelmat = [];
    // Sanelu on ensisijainen syöttötapa; näppäimistö on varalla.
    this.tila = saneluTuettu() ? 'sanelu' : 'kirjoitus';
    this.rakenna();
    this.seuraaNakymaa();
    this.seuraaSulkemista();
    this.paivitaNakyvyys();
  }

  /* --- rakenne --------------------------------------------------- */

  rakenna() {
    /*
     * Nappi on samaa muotoa kuin muut alanappirivin napit (.icon-btn:
     * viivaikoni ja selite), jotta se istuu riviin ilman omaa
     * poikkeustyyliä. Lehden päällä kelluessaan se saa lisäluokan
     * .pollo-kelluu, joka tekee siitä pyöreän kelluvan napin.
     */
    const nappi = polloElementti('button', 'icon-btn pollo-nappi');
    nappi.type = 'button';
    nappi.title = 'Viisas Pöllö';
    nappi.setAttribute('aria-label', 'Viisas Pöllö — avaa keskustelu');
    nappi.setAttribute('aria-expanded', 'false');
    nappi.innerHTML = `<span class="icon-glyph viiva-ikoni">${POLLO_IKONI}</span>`
      + '<span class="icon-label">Pöllö</span>';
    nappi.addEventListener('click', (e) => {
      e.stopPropagation();
      this.vaihdaTila();
    });
    this.nappi = nappi;

    /*
     * PANEELISSA EI OLE YLÄPALKKIA (omistajan linjaus 12.8.2026).
     *
     * Otsikko "Viisas Pöllö" ja ×-nappi poistuivat: nimi lukee jo napissa
     * josta paneeli aukesi, ja pieni paneeli on kokonaan luettavaa tilaa.
     * Nimi jää aria-labeliin, joten ruudunlukija tietää yhä minkä
     * keskustelun se avasi. Sulkeminen: napautus paneelin ulkopuolelle,
     * Esc tai pöllön oma nappi (seuraaSulkemista).
     */
    const paneeli = polloElementti('div', 'pollo-paneeli');
    paneeli.hidden = true;
    paneeli.setAttribute('role', 'dialog');
    paneeli.setAttribute('aria-label', 'Viisas Pöllö');
    // Paneelin sisällä napautus ei saa sulkea alanappirivin liukua.
    paneeli.addEventListener('click', (e) => e.stopPropagation());

    /*
     * EHDOTUKSET ELÄVÄT VIRRASSA (omistajan havainto 13.8.2026).
     *
     * Ennen ehdotuslaatikko oli paneelin oma ylin osa, eli se jäi
     * lukituksi yläreunaan keskustelun päälle: kun pelaaja avasi
     * paneelin uudelleen, kolme kysymysnappia leijui vanhan vastauksen
     * yläpuolella kuin ne kuuluisivat siihen. Nyt laatikko on virran
     * sisällä ja siirtyy aina viimeisen viestin perään — mikään
     * paneelin osa ei enää kiinnity keskustelun päälle.
     */
    this.virta = polloElementti('div', 'pollo-virta');
    paneeli.appendChild(this.virta);

    this.ehdotukset = polloElementti('div', 'pollo-ehdotukset');
    this.ehdotukset.hidden = true;
    this.virta.appendChild(this.ehdotukset);

    paneeli.appendChild(this.rakennaSyote());
    this.paneeli = paneeli;
    this.kiinnita();
  }

  /**
   * Syöttöalue: matala nappirivi paneelin alareunassa.
   *
   * Omistajan linjaus 12.8.2026: alareunassa on yksi matala rivi koko
   * paneelin leveydeltä — vasemmalla näppäimistökuvake (kolmasosa),
   * oikealla mikrofoni (kaksi kolmasosaa). Sanelu on yhä ensisijainen
   * syöttötapa, ja se saa siksi leveämmän puolikkaan, mutta iso pyöreä
   * mikki ja sen alla olleet selitetekstit ("Napauta ja kysy ääneen.",
   * "Kirjoita sen sijaan") ovat poissa: rivi vie nyt murto-osan
   * paneelin korkeudesta ja jättää tilaa vastauksille. Kuvakkeiden
   * merkitys luetaan aria-labelista, koska tekstit poistuivat.
   *
   * DOM-järjestys alhaalta lukien: nappirivi on viimeisenä, sen yllä
   * kirjoituskenttä ja ylimpänä sanelun tilarivi (tyhjänä piilossa).
   */
  rakennaSyote() {
    const syote = polloElementti('div', 'pollo-syote');

    /*
     * Erillistä kehittäjäkoodikenttää ei enää ole (omistajan päätös
     * 13.8.2026): kehittäjätilan avauskoodi talletetaan kytkennän
     * yhteydessä (js/main.js) ja lähtee otsakkeessa automaattisesti.
     * Rajattu koodi 1122 avaa kehittäjätilan ilman pöllön rajojen
     * ohitusta, eikä se koskaan päädy otsakkeeseen.
     */

    /*
     * Tilarivi kertoo vain sen mitä juuri nyt tapahtuu: "Kuuntelen…",
     * puheeksi tunnistettu teksti tai virheen syy. Tyhjänä se ei vie
     * riviäkään (css: :empty), joten paneeli pysyy matalana.
     */
    this.saneluTila = polloElementti('p', 'pollo-sanelu-tila');
    this.saneluTila.setAttribute('aria-live', 'polite');
    syote.appendChild(this.saneluTila);

    const lomake = polloElementti('form', 'pollo-rivi');
    this.kentta = polloElementti('input', 'pollo-kentta');
    this.kentta.type = 'text';
    this.kentta.placeholder = 'Kysy pöllöltä…';
    this.kentta.setAttribute('aria-label', 'Kysymys pöllölle');
    this.kentta.maxLength = 300;
    this.laheta = polloElementti('button', 'pollo-laheta', '→');
    this.laheta.type = 'submit';
    this.laheta.title = 'Lähetä';
    this.laheta.setAttribute('aria-label', 'Lähetä kysymys');
    lomake.appendChild(this.kentta);
    lomake.appendChild(this.laheta);
    lomake.addEventListener('submit', (e) => {
      e.preventDefault();
      this.kysy(this.kentta.value);
    });
    this.lomake = lomake;
    syote.appendChild(lomake);

    /*
     * Matala nappirivi: näppäimistö, kaiutin ja mikrofoni. Rivi on aina
     * paneelin pohjalla, joten kirjoituskenttä avautuu sen yläpuolelle
     * eikä sen tilalle — mikrofoni on siis yhden napautuksen päässä myös
     * kirjoitettaessa, ja erillistä "Sanele sen sijaan" -linkkiä ei
     * tarvita.
     *
     * Leveydet tulevat flexistä (css .pollo-sanelu): näppäimistö 1,
     * kaiutin 1, mikrofoni 2. Kun jokin napeista puuttuu (laite ei osaa
     * lukea tai ei osaa sanella), jäljelle jäävät jakavat rivin samassa
     * suhteessa — tyhjää saraketta ei jää.
     */
    const rivi = polloElementti('div', 'pollo-sanelu');

    const kirjoita = polloElementti('button', 'pollo-nappula pollo-kirjoita');
    kirjoita.type = 'button';
    kirjoita.title = 'Kirjoita kysymys';
    kirjoita.setAttribute('aria-label', 'Kirjoita kysymys');
    kirjoita.innerHTML = `<span class="icon-glyph viiva-ikoni">${NAPPAIMISTO_IKONI}</span>`;
    kirjoita.addEventListener('click', () => this.vaihdaTilaan('kirjoitus', { kohdista: true }));
    this.kirjoitaNappi = kirjoita;
    rivi.appendChild(kirjoita);

    /*
     * KAIUTIN ON VIPU, EI SOITTONAPPI.
     *
     * Päällä ollessaan jokainen UUSI vastaus luetaan ääneen heti kun se
     * saapuu. Luettavaksi menee vain vastausteksti: kysymykset,
     * ehdotukset, jatkokysymykset ja "ei hereillä" -ilmoitus jäävät
     * lukematta, koska ne ovat käyttöliittymää eivätkä pöllön puhetta.
     */
    const kaiutin = polloElementti('button', 'pollo-nappula pollo-kaiutin');
    kaiutin.type = 'button';
    kaiutin.innerHTML = `<span class="icon-glyph viiva-ikoni">${POLLO_KAIUTIN_IKONI}</span>`;
    kaiutin.addEventListener('click', () => this.vaihdaAani());
    this.kaiutin = kaiutin;
    rivi.appendChild(kaiutin);

    const mikki = polloElementti('button', 'pollo-nappula pollo-mikki');
    mikki.type = 'button';
    mikki.title = 'Kysy ääneen';
    mikki.setAttribute('aria-label', 'Kysy ääneen');
    mikki.innerHTML = `<span class="icon-glyph viiva-ikoni">${MIKKI_IKONI}</span>`;
    mikki.addEventListener('click', () => this.vaihdaSanelu());
    this.mikki = mikki;
    rivi.appendChild(mikki);

    this.saneluOsa = rivi;
    syote.appendChild(rivi);

    this.syote = syote;
    this.merkitseKaiutin();
    this.naytaSyote();
    return syote;
  }

  /* --- kaiutin ---------------------------------------------------- */

  /** Kaiutinnapin ulkoasu ja saavutettava nimi seuraavat vipua. */
  merkitseKaiutin() {
    const paalla = this.aaniPaalla;
    const nimi = paalla
      ? 'Vastausten luenta päällä — kytke pois'
      : 'Lue vastaukset ääneen';
    this.kaiutin.classList.toggle('paalla', paalla);
    this.kaiutin.setAttribute('aria-pressed', paalla ? 'true' : 'false');
    this.kaiutin.setAttribute('aria-label', nimi);
    this.kaiutin.title = nimi;
  }

  /** Vivun napautus. Pois kytkeminen katkaisee myös käynnissä olevan luennan. */
  vaihdaAani() {
    this.aaniPaalla = !this.aaniPaalla;
    polloTallenna(POLLO_AANI_AVAIN, this.aaniPaalla ? '1' : '');
    if (!this.aaniPaalla) pysaytaLukija();
    this.merkitseKaiutin();
  }

  /**
   * Lukee vastauksen ääneen, jos vipu on päällä.
   *
   * Uusi vastaus keskeyttää edellisen luennan: lueAaneen pysäyttää
   * käynnissä olevan aina ensin (js/lukija.js).
   */
  lueVastaus(teksti) {
    if (!this.aaniPaalla || !teksti) return;
    try {
      lueAaneen(teksti);
    } catch {
      /* laitteen puheääni ei ole käytettävissä — vastaus jää luettavaksi */
    }
  }

  /**
   * Piirtää syöttöalueen nykyisen tilan mukaan.
   *
   * Nappirivi on esillä, jos laite osaa edes toisen kahdesta: sanella
   * (mikrofoni) tai lukea ääneen (kaiutin). Kumpikin nappi näkyy vain
   * jos sen taustajärjestelmä on olemassa — nappi, joka ei tee mitään,
   * on pahempi kuin puuttuva nappi.
   *
   * Kirjoituskenttä on suoraan esillä aina kun sanelua ei ole: silloin
   * näppäimistönappi ei olisi valinta vaan ainoa vaihtoehto.
   */
  naytaSyote() {
    // Natiivikuoressa sanelu tulee sillalta, selaimessa
    // SpeechRecognitionista — kummankin puuttuessa mikkiä ei ole.
    const osaaSanella = saneluTuettu();
    const osaaLukea = lukijaTuettu();
    const sanelussa = this.tila === 'sanelu' && osaaSanella;
    this.mikki.hidden = !osaaSanella;
    this.kaiutin.hidden = !osaaLukea;
    this.saneluOsa.hidden = !osaaSanella && !osaaLukea;
    this.lomake.hidden = sanelussa;
  }

  vaihdaTilaan(tila, { kohdista = false } = {}) {
    this.lopetaSanelu();
    this.tila = tila;
    this.naytaSyote();
    // Näppäimistö avautuu vasta kun pelaaja itse valitsee kirjoittamisen.
    if (tila === 'kirjoitus' && kohdista) this.kentta.focus({ preventScroll: true });
  }

  /**
   * Missä nappi ja paneeli asuvat?
   *
   * Lehti on <dialog>, joka avataan modaalina. Modaali elää selaimen
   * ylimmässä kerroksessa, joten alanappirivissä oleva nappi jäisi sen
   * alle eikä olisi napautettavissa. Siksi nappi ja paneeli SIIRRETÄÄN
   * lehden sisään, kun lehti on auki — sama ratkaisu kuin lehden omalla
   * sisällysluettelolevyllä (ui.js: avaaSisallysvalikko). Kartalla ne
   * palaavat alanappirivin keskimmäiseen paikkaan.
   */
  kiinnitysKohde() {
    const lehti = this.doc.getElementById('arrival-dialog');
    if (lehti?.open) return lehti;
    return this.ankkuri?.isConnected ? this.ankkuri : this.doc.body;
  }

  /** Alanappirivi ilmoittaa paikkansa joka piirrolla (js/ui.js). */
  ankkuroi(el) {
    this.ankkuri = el ?? null;
    this.kiinnita();
  }

  kiinnita() {
    const kohde = this.kiinnitysKohde();
    if (!kohde) return;
    // Kelluva muoto vain silloin, kun nappi ei ole rivissä.
    const kelluu = kohde !== this.ankkuri;
    this.nappi.classList.toggle('pollo-kelluu', kelluu);
    this.paneeli.classList.toggle('pollo-paneeli-kelluu', kelluu);
    if (this.nappi.parentNode !== kohde) kohde.appendChild(this.nappi);
    if (this.paneeli.parentNode !== kohde) kohde.appendChild(this.paneeli);
  }

  /**
   * Näkyvyyssääntö: pöllö ei ole etusivun alkutekstin päällä.
   *
   * Alkuteksti on #intro, joka on näkyvissä vain lähtöpaikkaa
   * valittaessa. Kun se väistyy, pöllö ilmestyy — eikä koskaan
   * itsestään avaudu, vain näy. Alanappirivissä ollessaan pöllö
   * noudattaa lisäksi rivin omaa piilotuslogiikkaa (js/ui.js).
   */
  nakyyko() {
    const intro = this.doc.getElementById('intro');
    return !intro || intro.hidden;
  }

  paivitaNakyvyys() {
    const nakyy = this.nakyyko();
    this.nappi.hidden = !nakyy;
    if (!nakyy && this.auki) this.sulje();
  }

  /**
   * Seuraa, milloin lehti aukeaa/sulkeutuu ja milloin alkuteksti
   * väistyy. Kumpikaan ei lähetä omaa tapahtumaansa, joten tila
   * luetaan attribuuteista.
   */
  seuraaNakymaa() {
    const lehti = this.doc.getElementById('arrival-dialog');
    const intro = this.doc.getElementById('intro');
    if (typeof MutationObserver !== 'function') return;
    if (lehti) {
      new MutationObserver(() => {
        this.kiinnita();
        // Lehden sulkeutuminen sulkee myös pöllön: paneeli siirtyy
        // takaisin kartalle, eikä keskustelun pidä jäädä leijumaan
        // siirtymän päälle.
        if (!lehti.open && this.auki) this.sulje();
      }).observe(lehti, { attributes: true, attributeFilter: ['open'] });
    }
    if (intro) {
      new MutationObserver(() => this.paivitaNakyvyys())
        .observe(intro, { attributes: true, attributeFilter: ['hidden'] });
    }
  }

  /**
   * SULKEMINEN ILMAN RASTIA (omistajan linjaus 12.8.2026).
   *
   * Paneelin yläpalkki katosi otsikkoineen ja ×-nappeineen, joten
   * keskustelu suljetaan napauttamalla sen ulkopuolelle — karttaa,
   * lehteä, mitä tahansa — tai Esc-näppäimestä. Pöllön oma nappi on yhä
   * vipu: se avaa ja sulkee.
   *
   * pointerdown eikä click: sama tapahtuma, jolla alanappirivin liuku
   * sulkeutuu (js/ui.js kytkeLiukuSulku), joten kartan napautus sulkee
   * molemmat samalla kertaa eikä sulkeminen odota sormen nostoa.
   * Kuuntelijat ovat dokumentissa, koska napautus voi osua minne vain;
   * paneeli ja nappi rajataan pois closestilla.
   *
   * Esc estetään etenemästä: lehtinäkymässä <dialog> sulkeutuisi muuten
   * samasta painalluksesta, ja pelaaja menettäisi lehden vain
   * sulkiessaan chatin. Toinen painallus sulkee lehden normaalisti.
   */
  seuraaSulkemista() {
    if (typeof this.doc.addEventListener !== 'function') return;
    this.doc.addEventListener('pointerdown', (e) => {
      if (!this.auki) return;
      if (e.target?.closest?.('.pollo-paneeli, .pollo-nappi')) return;
      this.sulje();
    });
    this.doc.addEventListener('keydown', (e) => {
      if (!this.auki || e.key !== 'Escape') return;
      e.preventDefault();
      e.stopPropagation();
      this.sulje();
    });
  }

  /* --- avaus ja sulku -------------------------------------------- */

  vaihdaTila() {
    if (this.auki) this.sulje();
    else this.avaa();
  }

  avaa() {
    // Liuku peittäisi pöllön napin: se väistyy, kun chat aukeaa.
    this.haeUi?.()?.suljeLiuku?.();
    this.kiinnita();
    this.auki = true;
    this.paneeli.hidden = false;
    this.nappi.setAttribute('aria-expanded', 'true');
    this.nappi.classList.add('auki');
    if (!this.palvelin) {
      this.naytaNukkuva();
      return;
    }
    // Ehdotuslaatikko asuu virrassa, joten tervehdystä ei etsitä
    // lapsimäärästä vaan viesteistä.
    if (!this.virta.querySelector('.pollo-viesti')) this.lisaaViesti('pollo', TERVEHDYS);
    // Kehittäjätila voi vaihtua kesken pelin, joten kenttä katsotaan
    // joka avauksella eikä kerran käynnistyksessä.
    this.naytaSyote();
    // Indeksi rakennetaan laiskasti ensimmäisellä avauksella, ei pelin
    // käynnistyksessä. Ehdotushaku odottaa sen valmistumista.
    this.varmistaIndeksi();
    this.haeEhdotukset();
  }

  sulje() {
    this.lopetaSanelu();
    // Chatin sulkeutuminen hiljentää myös luennan: pöllön ääni ei jää
    // puhumaan tyhjälle kartalle. Vipu jää päälle seuraavaa kertaa
    // varten.
    if (this.aaniPaalla) pysaytaLukija();
    this.auki = false;
    this.paneeli.hidden = true;
    this.nappi.setAttribute('aria-expanded', 'false');
    this.nappi.classList.remove('auki');
  }

  /** Tila, jossa omistaja ei ole vielä ottanut välityspalvelinta käyttöön. */
  naytaNukkuva() {
    this.ehdotukset.hidden = true;
    this.syote.hidden = true;
    if (this.virta.querySelector('.pollo-nukkuu')) return;
    this.virta.replaceChildren();
    const laatikko = polloElementti('div', 'pollo-nukkuu');
    laatikko.appendChild(polloElementti('p', 'pollo-nukkuu-otsikko', EI_HEREILLA));
    laatikko.appendChild(polloElementti('p', 'pollo-nukkuu-lisa', EI_HEREILLA_LISA));
    this.virta.appendChild(laatikko);
  }

  /* --- paikallinen tietohaku -------------------------------------- */

  /** Rakentaa hakuindeksin kerran. Mittaustulos jää talteen raportointia varten. */
  varmistaIndeksi() {
    if (this.indeksi) return this.indeksi;
    try {
      this.indeksi = rakennaIndeksi({
        kulttuuri: KULTTUURI_KATEGORIAT,
        maat: MAA_KATEGORIAT,
        nahtavyydet: NAHTAVYYSJUTUT,
      });
    } catch {
      // Aineiston puuttuminen ei saa estää kysymistä.
      this.indeksi = { merkinnat: [], kesto: 0, sanoja: 0 };
    }
    return this.indeksi;
  }

  /**
   * Onko merkinnän minitehtävä jo ratkaistu?
   *
   * Avain on sama kuin pelillä (game.js actionMinitehtava:
   * pakka:kaupunki:aihe, jossa maalehden aihe on ISO:aihe). Ilman
   * tätä vastaamattoman tehtävän fakta selittäisi vastauksen.
   */
  tehtavaRatkaistu(merkinta) {
    const game = this.haeUi?.()?.game ?? null;
    const cityId = game?.player?.pos?.city;
    if (!game?.minitehtavatVastatut || !cityId) return false;
    const aihe = merkinta.tyyppi === 'maa'
      ? `${merkinta.omistaja}:${merkinta.tehtavaAvain}`
      : merkinta.tehtavaAvain;
    return game.minitehtavatVastatut.has(`${game.pack?.id}:${cityId}:${aihe}`);
  }

  /**
   * Avaa pelin oman jutun hakutuloksen reittikuvauksesta.
   *
   * Reitti on yleinen {tyyppi, tunniste, sivu|kohde}: tässä on yksi rivi
   * per tyyppi, ja jokainen rivi kutsuu SAMAA metodia, jota pelin oma
   * navigointi käyttää — rinnakkaista navigointia ei rakenneta. Uusi
   * sisältötyyppi (esim. pidemmät artikkelit) tarvitsee vain uuden
   * rivin tähän.
   */
  avaaKohde(reitti) {
    const ui = this.haeUi?.();
    if (!ui || !reitti) return false;
    // Chat väistyy, mutta nappi jää: paluu keskusteluun on yksi
    // napautus, ja historia säilyy.
    this.sulje();
    if (reitti.tyyppi === 'maalehti') {
      ui.avaaMaalehti?.(reitti.tunniste);
      this.siirraSivulle(ui, reitti.sivu);
      return true;
    }
    if (reitti.tyyppi === 'kaupunkilehti') {
      const city = ui.game?.board?.cityById?.get(reitti.tunniste);
      if (!city) return false;
      ui.openArrival?.(city);
      this.siirraSivulle(ui, reitti.sivu);
      return true;
    }
    if (reitti.tyyppi === 'nahtavyys') {
      const juttu = NAHTAVYYSJUTUT[reitti.tunniste]?.[reitti.kohde];
      if (!juttu) return false;
      // Tyhjä henkilölinkkilista: juttu ei linkitä itseensä.
      ui.avaaNahtavyys?.({ nimi: reitti.kohde, ...juttu }, null, { henkilolinkit: [] });
      return true;
    }
    return false;
  }

  /** Lehden sivunvaihto: sivu 0 on kansi, siksi +1. */
  siirraSivulle(ui, sivuId) {
    if (!sivuId) return;
    const i = (ui.tutkiSivut ?? []).findIndex((sivu) => sivu?.id === sivuId);
    if (i >= 0) ui.naytaTutkiSivu?.(i + 1, { heti: true });
  }

  /**
   * Onko reitti oikeasti avattavissa juuri nyt?
   *
   * Linkkiä ei näytetä, jos kohde ei ole tällä laudalla — rikkinäinen
   * linkki on pahempi kuin puuttuva linkki.
   */
  reittiAvattavissa(reitti) {
    const game = this.haeUi?.()?.game ?? null;
    if (!reitti || !game) return false;
    if (reitti.tyyppi === 'maalehti') {
      return Boolean(game.pack?.map?.countryShapes?.[reitti.tunniste]);
    }
    if (reitti.tyyppi === 'kaupunkilehti') {
      return Boolean(game.board?.cityById?.get(reitti.tunniste));
    }
    if (reitti.tyyppi === 'nahtavyys') {
      // Kohdekartta kuuluu kaupunkiin, jossa pelaaja seisoo.
      return game.player?.pos?.city === reitti.tunniste
        && Boolean(NAHTAVYYSJUTUT[reitti.tunniste]?.[reitti.kohde]);
    }
    return false;
  }

  /**
   * Avattavat kohteet hakutuloksista.
   *
   * Enintään POLLON_LINKKIKATTO kappaletta, ei kahta samaa, ja vain ne
   * jotka oikeasti aukeavat tällä laudalla. Osuvuuskynnys on jo tehty
   * haussa (js/pollo-haku.js) — jos mikään ei ylittänyt sitä, tämä
   * palauttaa tyhjän listan, ja se on oikea vastaus.
   */
  poimiLinkit(katkelmat) {
    const nahdyt = new Set();
    const ulos = [];
    for (const katkelma of katkelmat ?? []) {
      const reitti = katkelma?.reitti;
      if (!reitti) continue;
      const avain = `${reitti.tyyppi}:${reitti.tunniste}:${reitti.sivu ?? reitti.kohde ?? ''}`;
      if (nahdyt.has(avain)) continue;
      if (!this.reittiAvattavissa(reitti)) continue;
      nahdyt.add(avain);
      ulos.push({ reitti, ankkurit: katkelma.ankkurit ?? [] });
      if (ulos.length >= POLLON_LINKKIKATTO) break;
    }
    return ulos;
  }

  /**
   * ALLEVIIVATTU LINKKI KESKELLE VASTAUSTA (omistajan tilaus 12.8.2026).
   *
   * Erillisen "Lue: …" -napin sijaan vastauksesta etsitään kohta, joka
   * puhuu samasta asiasta, ja SE muutetaan linkiksi. Ankkurisanat
   * tulevat pelin omasta indeksistä (js/pollo-haku.js ankkuriSanat),
   * eivät koskaan mallin tekstistä, joten linkki ei voi osoittaa
   * mihinkään keksittyyn.
   *
   * TURVALLISUUS: mallin tekstiä ei koskaan tulkita HTML:nä. Solmut
   * rakennetaan käsin ja teksti asetetaan tekstisisältönä, joten
   * vastaus ei voi injektoida merkkausta paneeliin.
   *
   * @returns {Array} ne linkit, joille ei löytynyt ankkuria tekstistä
   */
  korostaLinkit(viesti, linkit) {
    const jaljelle = [];
    for (const linkki of linkit) {
      if (!this.sidoLinkki(viesti, linkki)) jaljelle.push(linkki);
    }
    return jaljelle;
  }

  /** Yksi linkki tekstiin. Palauttaa tosi, jos ankkuri löytyi. */
  sidoLinkki(viesti, { reitti, ankkurit }) {
    // Vain koskemattomat tekstisolmut kelpaavat: jo linkitetyn kohdan
    // sisään ei rakenneta toista linkkiä.
    for (const solmu of [...viesti.childNodes]) {
      if (solmu.nodeType !== 3) continue;
      const osuma = etsiAnkkuri(solmu.data, ankkurit);
      if (!osuma) continue;
      const teksti = solmu.data;
      const linkki = polloElementti('a', 'pollo-tekstilinkki', teksti.slice(osuma.alku, osuma.loppu));
      linkki.href = '#';
      linkki.title = `Lue: ${reitti.leima ?? reitti.otsikko}`;
      linkki.addEventListener('click', (e) => {
        e.preventDefault();
        this.avaaKohde(reitti);
      });
      const jalki = viesti.ownerDocument.createTextNode(teksti.slice(osuma.loppu));
      solmu.data = teksti.slice(0, osuma.alku);
      solmu.parentNode.insertBefore(jalki, solmu.nextSibling);
      solmu.parentNode.insertBefore(linkki, jalki);
      return true;
    }
    return false;
  }

  /*
   * Erillisiä "Lue:"-nappeja ei enää ole (omistajan päätös 13.8.2026):
   * linkki näytetään VAIN, jos se istuu vastaustekstiin alleviivattuna
   * ankkurina. Jos ankkuria ei löydy, linkki jää kokonaan pois —
   * irrallinen nappilista vastauksen alla tarjosi liian usein
   * epäolennaista. korostaLinkit palauttaa yhä ankkurittomat linkit,
   * mutta niille ei tehdä mitään.
   */

  /**
   * Jatkokysymykset vastauksen alle.
   *
   * Samaa muotoa kuin avausruudun ehdotukset, mutta ne elävät
   * keskusteluvirrassa vastauksen perässä eivätkä paneelin yläreunassa:
   * ne kuuluvat juuri siihen vastaukseen. Napautus lähettää kysymyksen.
   * Kaiutin ei lue näitä — ne ovat käyttöliittymää, eivät pöllön puhetta.
   */
  naytaJatkot(lista) {
    const jatkot = (Array.isArray(lista) ? lista : []).slice(0, 2);
    if (!jatkot.length) return;
    const laatikko = polloElementti('div', 'pollo-jatkot');
    for (const teksti of jatkot) {
      const nappi = polloElementti('button', 'pollo-ehdotus pollo-jatko', teksti);
      nappi.type = 'button';
      nappi.addEventListener('click', () => this.kysy(teksti));
      laatikko.appendChild(nappi);
    }
    this.virta.appendChild(laatikko);
    this.virta.scrollTop = this.virta.scrollHeight;
  }

  /** Osuvimmat katkelmat pelin omasta aineistosta. */
  haeAineisto(kysymys) {
    const indeksi = this.varmistaIndeksi();
    if (!indeksi?.merkinnat?.length) return [];
    const game = this.haeUi?.()?.game ?? null;
    // Missä pelaaja seisoo: oman kaupungin ja maan jutut painavat
    // haussa selvästi enemmän (js/pollo-haku.js HAUN_SIJAINTIKERROIN).
    const cityId = game?.player?.pos?.city ?? null;
    const tulos = haeKatkelmat(indeksi, kysymys, {
      maara: 4,
      onVastattu: (m) => this.tehtavaRatkaistu(m),
      sijainti: {
        kaupunki: cityId,
        maa: cityId ? game?.pack?.map?.cityCountry?.[cityId] ?? null : null,
      },
      nimet: {
        kaupunki: (id) => game?.board?.cityById?.get(id)?.name ?? id,
        maa: (iso) => game?.pack?.map?.countryShapes?.[iso]?.nimi ?? iso,
      },
    });
    this.hakuKesto = tulos.kesto;
    // Talteen linkkejä varten: linkit rakennetaan näistä, ei mallin
    // tekstistä (omistajan linjaus 12.8.2026).
    this.viimeisetKatkelmat = tulos.katkelmat;
    return tulos.katkelmat;
  }

  /* --- keskustelu ------------------------------------------------- */

  lisaaViesti(rooli, teksti) {
    const viesti = polloElementti('p', `pollo-viesti pollo-${rooli}`, teksti);
    this.virta.appendChild(viesti);
    this.virta.scrollTop = this.virta.scrollHeight;
    return viesti;
  }

  /**
   * VASTAUS ALKAA NÄKYMÄN YLÄREUNASTA (omistajan havainto 13.8.2026).
   *
   * Virta kelasi jokaisen vastauksen jälkeen pohjaan, jolloin pitkän
   * vastauksen luku alkoi sen viimeiseltä riviltä ja pelaaja joutui
   * kelaamaan ylös. Nyt vastauksen ENSIMMÄINEN rivi tuodaan näkyviin ja
   * loppu jää pelaajan itsensä vieritettäväksi. Pelaajan oma kysymys
   * kelaa yhä pohjaan (lisaaViesti) — se on lyhyt ja kuuluu näkyä heti.
   *
   * Muutama pikseli jätetään yläpuolelle, jottei rivi liimaudu kiinni
   * reunaan: edellisen viestin häntä kertoo, että ylempänä on lisää.
   */
  vieritaAlkuun(el, pehmuste = 8) {
    if (!el?.getBoundingClientRect || !this.virta?.getBoundingClientRect) return;
    try {
      const ero = el.getBoundingClientRect().top - this.virta.getBoundingClientRect().top;
      this.virta.scrollTop += ero - pehmuste;
    } catch {
      /* asettelua ei ole käytettävissä — vieritys jää tekemättä */
    }
  }

  /** Kevyt jarru: yksi pyyntö kerrallaan. */
  asetaKesken(kesken) {
    this.kesken = kesken;
    this.kentta.disabled = kesken;
    this.laheta.disabled = kesken;
    this.mikki.disabled = kesken;
    this.paneeli.classList.toggle('pollo-odottaa', kesken);
    for (const nappi of this.ehdotukset.querySelectorAll('button')) {
      nappi.disabled = kesken;
    }
    // Vastausten alla olevat jatkokysymykset ovat samaa jarrua.
    for (const nappi of this.virta.querySelectorAll('.pollo-jatko')) {
      nappi.disabled = kesken;
    }
  }

  konteksti(kysymys = '') {
    try {
      const ui = this.haeUi?.() ?? null;
      return lueNakyma({
        game: ui?.game ?? null,
        ui,
        doc: this.doc,
        aineisto: kysymys ? this.haeAineisto(kysymys) : [],
      });
    } catch {
      // Kontekstin puuttuminen ei saa estää kysymistä.
      return '';
    }
  }

  /**
   * Yksi pyyntö välityspalvelimelle.
   *
   * Virheet eivät koskaan päädy konsoliin: pelaajalle näkyy siisti
   * viesti, ja peli jatkuu. Verkkovirhe on täysin normaali tilanne
   * puhelimessa eikä se ole pelin vika.
   */
  async pyyda(runko) {
    const otsakkeet = { 'content-type': 'application/json' };
    /*
     * Kehittäjäkoodi mukaan vain jos se on laitteelle talletettu.
     * Ilman koodia otsaketta ei lähetetä lainkaan, ja ilman workerin
     * salaisuutta se ei tekisi mitään vaikka lähetettäisiinkin.
     */
    const koodi = polloAsetus(POLLO_KEHITTAJAKOODI_AVAIN).trim();
    if (koodi) otsakkeet[POLLO_KEHITTAJA_OTSAKE] = koodi;
    const vastaus = await fetch(this.palvelin, {
      method: 'POST',
      headers: otsakkeet,
      body: JSON.stringify(runko),
    });
    const data = await vastaus.json().catch(() => ({}));
    if (!vastaus.ok) {
      const virhe = new Error(data?.virhe ?? 'virhe');
      virhe.viesti = data?.viesti ?? null;
      throw virhe;
    }
    return data;
  }

  async haeEhdotukset() {
    if (this.kesken || !this.palvelin) return;
    this.ehdotukset.replaceChildren();
    this.ehdotukset.hidden = true;
    this.asetaKesken(true);
    try {
      const data = await this.pyyda({ tehtava: 'ehdotukset', konteksti: this.konteksti() });
      this.naytaEhdotukset(Array.isArray(data?.ehdotukset) ? data.ehdotukset : []);
    } catch {
      // Ehdotukset ovat lisä, eivät välttämättömiä: jos ne eivät tule,
      // sanelu ja kirjoituskenttä riittävät eikä pelaajalle valiteta.
      this.ehdotukset.hidden = true;
    } finally {
      this.asetaKesken(false);
    }
  }

  naytaEhdotukset(lista) {
    // Sama siivous kuin kysyttäessä: näkyvissä on aina vain tuorein
    // ehdotusjoukko. Ilman tätä paneelin uudelleenavaus jätti edellisen
    // vastauksen jatkokysymykset pinoon uusien ylle (omistaja 13.8.2026).
    for (const vanha of this.virta.querySelectorAll('.pollo-jatkot')) vanha.remove();
    this.ehdotukset.replaceChildren();
    for (const teksti of lista.slice(0, 2)) {
      const nappi = polloElementti('button', 'pollo-ehdotus', teksti);
      nappi.type = 'button';
      nappi.addEventListener('click', () => this.kysy(teksti));
      this.ehdotukset.appendChild(nappi);
    }
    this.ehdotukset.hidden = !this.ehdotukset.childElementCount;
    // Laatikko siirtyy viimeisen viestin perään: se koskee sitä, mitä
    // keskustelussa on nyt, ei sitä mistä keskustelu alkoi.
    if (!this.ehdotukset.hidden) {
      this.virta.appendChild(this.ehdotukset);
      this.virta.scrollTop = this.virta.scrollHeight;
    }
  }

  async kysy(raakaKysymys) {
    const kysymys = String(raakaKysymys ?? '').trim();
    if (!kysymys || this.kesken || !this.palvelin) return;
    this.kentta.value = '';
    // Tilarivi tyhjenee: kysymys on jo keskustelussa, eikä sanelun
    // väliaikainen teksti saa jäädä vastauksen alle.
    this.saneluTila.textContent = '';
    this.ehdotukset.replaceChildren();
    this.ehdotukset.hidden = true;
    // Vanhat jatkokysymykset pois virrasta: ehdotuksia näkyy vain
    // tuoreimman vastauksen alla, muuten ne kasautuvat pinoksi
    // (omistajan huomio 13.8.2026).
    for (const vanha of this.virta.querySelectorAll('.pollo-jatkot')) vanha.remove();
    this.lisaaViesti('kayttaja', kysymys);
    const odotus = this.lisaaViesti('odottaa', 'Pöllö miettii…');
    this.asetaKesken(true);
    this.viimeisetKatkelmat = [];
    try {
      const data = await this.pyyda({
        tehtava: 'vastaus',
        kysymys,
        konteksti: this.konteksti(kysymys),
        historia: this.historia.slice(-HISTORIAN_KATTO),
      });
      const teksti = String(data?.vastaus ?? '').trim() || 'En osaa vastata tähän.';
      odotus.remove();
      const viesti = this.lisaaViesti('pollo', teksti);
      /*
       * Järjestys: ensin linkit tekstin sisään, sitten varapolun napit,
       * viimeisenä jatkokysymykset. Luenta saa VAIN vastaustekstin —
       * linkit ja jatkot ovat käyttöliittymää.
       */
      const linkit = this.poimiLinkit(this.viimeisetKatkelmat);
      this.korostaLinkit(viesti, linkit);
      this.naytaJatkot(data?.jatkot);
      // Vasta kun koko vastaus liitteineen on virrassa: nyt sen alkuun
      // voi vierittää, koska sisältöä on riittävästi alapuolella.
      this.vieritaAlkuun(viesti);
      this.lueVastaus(teksti);
      this.historia.push({ rooli: 'kayttaja', teksti: kysymys });
      this.historia.push({ rooli: 'pollo', teksti });
      this.historia = this.historia.slice(-HISTORIAN_KATTO);
    } catch (virhe) {
      odotus.remove();
      // Virheilmoitus on yksi rivi: se saa kelata pohjaan kuten ennenkin.
      this.lisaaViesti('pollo', virhe?.viesti
        ?? 'Pöllö ei saanut ajatuksesta kiinni. Yritä hetken päästä uudelleen.');
    } finally {
      this.asetaKesken(false);
    }
  }

  /* --- sanelu ------------------------------------------------------ */

  /** Mikrofonin napautus: aloita tai lopeta. */
  vaihdaSanelu() {
    if (this.tunnistin || this.natiiviSanelussa) {
      this.lopetaSanelu({ laheta: true });
      return;
    }
    this.aloitaSanelu();
  }

  /** Mikkinapin ulkoasu: kuunteleva vai lepäävä. */
  merkitseMikki(kuuntelee) {
    this.mikki.classList.toggle('kuuntelee', Boolean(kuuntelee));
    this.mikki.setAttribute('aria-pressed', kuuntelee ? 'true' : 'false');
  }

  /** Natiivisanelun tapahtumakuuntelijat pois. */
  purkaSaneluKuulijat() {
    for (const purku of this.saneluKuulijat) {
      try {
        purku();
      } catch {
        /* silta oli jo purettu */
      }
    }
    this.saneluKuulijat = [];
  }

  /**
   * SANELU iOS-KUOREN SILLALTA.
   *
   * Kulku on sillan oma: luvat → aloita → osittaiset tulokset
   * tapahtumina → lopeta. Mikkinapin tilat ovat samat kuin
   * selainsanelussa, ja valmis teksti menee samaa reittiä kysymykseksi
   * — vain tunnistin vaihtuu.
   *
   * Luentaa ei tarvitse pysäyttää täältä: silta keskeyttää puheen
   * itse, kun sanelu alkaa.
   */
  async aloitaNatiiviSanelu(natiivi) {
    if (this.tila !== 'sanelu') this.vaihdaTilaan('sanelu');
    this.puhuttu = '';
    this.natiiviSanelussa = true;
    this.merkitseMikki(true);
    this.saneluTila.textContent = SANELU_KUUNTELEE;

    // Mikrofoni- ja puheentunnistuslupa kysytään vasta tästä, ei
    // paneelia avattaessa — sama sääntö kuin selainsanelussa.
    try {
      const luvat = await natiivi.sanelu.luvat();
      if (luvat && luvat.kunnossa === false) {
        this.natiiviSanelussa = false;
        this.merkitseMikki(false);
        this.saneluTila.textContent = 'Mikrofonin käyttö ei ole sallittu.';
        this.vaihdaTilaan('kirjoitus');
        return;
      }
    } catch (virhe) {
      this.natiiviSanelussa = false;
      this.merkitseMikki(false);
      this.saneluTila.textContent = virhe?.message ?? 'Sanelu ei käynnisty juuri nyt.';
      return;
    }
    // Nappia on voitu napauttaa uudestaan lupien odotuksen aikana.
    if (!this.natiiviSanelussa) return;

    const kuuntele = (laji, kuulija) => {
      const purku = natiivi.kuuntele?.(laji, kuulija);
      if (typeof purku === 'function') this.saneluKuulijat.push(purku);
    };
    kuuntele('sanelu-osittainen', (tieto) => {
      this.puhuttu = String(tieto?.teksti ?? '');
      this.saneluTila.textContent = this.puhuttu.trim() || SANELU_KUUNTELEE;
    });
    kuuntele('sanelu-valmis', (tieto) => {
      const teksti = String(tieto?.teksti ?? this.puhuttu).trim();
      this.paataNatiiviSanelu();
      if (teksti) this.kysy(teksti);
      else this.saneluTila.textContent = 'En kuullut mitään. Yritä uudelleen.';
    });
    kuuntele('sanelu-keskeytyi', (tieto) => {
      const teksti = String(tieto?.teksti ?? this.puhuttu).trim();
      this.paataNatiiviSanelu();
      if (teksti) this.kysy(teksti);
      else this.saneluTila.textContent = 'Sanelu keskeytyi. Yritä uudelleen.';
    });
    kuuntele('sanelu-virhe', (tieto) => {
      this.paataNatiiviSanelu();
      this.saneluVirhe(tieto?.syy, tieto?.viesti);
    });

    try {
      await natiivi.sanelu.aloita({ kieli: PUHE_KIELI });
    } catch (virhe) {
      this.paataNatiiviSanelu();
      this.saneluTila.textContent = virhe?.message ?? 'Sanelu ei käynnisty juuri nyt.';
    }
  }

  /** Natiivisanelu kiinni: kuulijat pois ja mikki lepoon. */
  paataNatiiviSanelu() {
    this.natiiviSanelussa = false;
    this.purkaSaneluKuulijat();
    this.merkitseMikki(false);
  }

  aloitaSanelu() {
    // Natiivisilta ensin: WKWebView:ssä SpeechRecognitionia ei ole.
    const natiivi = haeNatiiviSanelu();
    if (natiivi) {
      this.aloitaNatiiviSanelu(natiivi);
      return;
    }
    const Tunnistus = haePuheTunnistus();
    if (!Tunnistus) {
      // Selain ei osaa: kirjoituskenttä esiin ilman konsolivirhettä.
      this.vaihdaTilaan('kirjoitus');
      return;
    }
    // Mikrofonia voi napauttaa myös kirjoitustilassa: rivi on aina
    // esillä, joten sanelu palauttaa kentän piiloon.
    if (this.tila !== 'sanelu') this.vaihdaTilaan('sanelu');
    let tunnistin;
    try {
      tunnistin = new Tunnistus();
    } catch {
      this.saneluTila.textContent = 'Sanelu ei käynnisty tässä selaimessa.';
      this.vaihdaTilaan('kirjoitus');
      return;
    }
    tunnistin.lang = PUHE_KIELI;
    tunnistin.interimResults = true;
    tunnistin.continuous = false;
    tunnistin.maxAlternatives = 1;
    this.puhuttu = '';
    tunnistin.onresult = (tapahtuma) => {
      let teksti = '';
      const tulokset = tapahtuma?.results ?? [];
      for (let i = 0; i < tulokset.length; i += 1) {
        teksti += tulokset[i]?.[0]?.transcript ?? '';
      }
      this.puhuttu = teksti;
      this.saneluTila.textContent = teksti.trim() || SANELU_KUUNTELEE;
    };
    tunnistin.onerror = (tapahtuma) => this.saneluVirhe(tapahtuma?.error);
    tunnistin.onend = () => {
      const oliTunnistin = this.tunnistin;
      this.tunnistin = null;
      this.merkitseMikki(false);
      if (!oliTunnistin) return;
      const teksti = this.puhuttu.trim();
      if (teksti) this.kysy(teksti);
      else if (this.saneluTila.textContent === SANELU_KUUNTELEE) {
        this.saneluTila.textContent = 'En kuullut mitään. Yritä uudelleen.';
      }
    };
    this.tunnistin = tunnistin;
    this.merkitseMikki(true);
    this.saneluTila.textContent = SANELU_KUUNTELEE;
    try {
      // Mikrofonilupa kysytään vasta tästä — ei paneelia avattaessa.
      tunnistin.start();
    } catch {
      this.tunnistin = null;
      this.merkitseMikki(false);
      this.saneluTila.textContent = 'Sanelu ei käynnisty juuri nyt.';
    }
  }

  lopetaSanelu({ laheta = false } = {}) {
    /*
     * Natiivisanelu lopetetaan sillan kautta: lopeta() palauttaa
     * viimeistellyn tekstin, ja se kelpaa kysymykseksi myös silloin,
     * kun 'sanelu-valmis' ei ehdi tulla perille ennen sulkemista.
     */
    if (this.natiiviSanelussa) {
      const natiivi = haeNatiiviSanelu();
      this.paataNatiiviSanelu();
      const kesken = this.puhuttu.trim();
      try {
        Promise.resolve(natiivi?.sanelu?.lopeta?.()).then((tulos) => {
          const teksti = String(tulos?.teksti ?? kesken).trim();
          if (laheta && teksti) this.kysy(teksti);
        }, () => {
          if (laheta && kesken) this.kysy(kesken);
        });
      } catch {
        if (laheta && kesken) this.kysy(kesken);
      }
      return;
    }
    const tunnistin = this.tunnistin;
    if (!tunnistin) return;
    if (!laheta) this.tunnistin = null;
    this.merkitseMikki(false);
    try {
      tunnistin.stop();
    } catch {
      /* tunnistin oli jo pysähtynyt */
    }
  }

  /**
   * Siisti suomenkielinen tila jokaiselle virheelle — ei konsolia.
   *
   * Koodit tulevat selaimen SpeechRecognitionista; natiivisilta antaa
   * lisäksi valmiin suomenkielisen viestin, joka näytetään sellaisenaan
   * silloin kun koodia ei tunnisteta.
   */
  saneluVirhe(koodi, viesti = '') {
    this.tunnistin = null;
    this.natiiviSanelussa = false;
    this.purkaSaneluKuulijat();
    this.merkitseMikki(false);
    if (koodi === 'not-allowed' || koodi === 'service-not-allowed') {
      this.saneluTila.textContent = 'Mikrofonin käyttö ei ole sallittu.';
      this.vaihdaTilaan('kirjoitus');
      return;
    }
    if (koodi === 'audio-capture') {
      this.saneluTila.textContent = 'Mikrofonia ei löytynyt.';
      this.vaihdaTilaan('kirjoitus');
      return;
    }
    if (koodi === 'no-speech') {
      this.saneluTila.textContent = 'En kuullut mitään. Yritä uudelleen.';
      return;
    }
    this.saneluTila.textContent = viesti || 'Sanelu ei onnistunut. Voit myös kirjoittaa.';
  }
}

/*
 * Yksi pöllö per peli. Alanappirivi tarvitsee kahvan voidakseen
 * ilmoittaa paikkansa joka piirrolla, eikä js/ui.js:n kuulu tuntea
 * oliota — riittää että se osaa antaa paikan.
 */
let nykyinenPollo = null;

/** Alanappirivi ilmoittaa pöllön paikan (js/ui.js piirraToimintorivi). */
export function polloAnkkuri(el) {
  nykyinenPollo?.ankkuroi(el);
}

/** Onko pöllö auki? Alanappirivi tarvitsee tiedon liukua sulkiessaan. */
export function polloAuki() {
  return Boolean(nykyinenPollo?.auki);
}

/** Sulkee chatin. Alanappirivin liuku peittää pöllön, joten se sulkee myös chatin. */
export function polloSulje() {
  nykyinenPollo?.sulje();
}

/**
 * Asentaa pöllön peliin. Kutsutaan kerran käynnistyksessä.
 *
 * @param {() => object|null} haeUi getteri nykyiseen UI-olioon.
 * @returns {Pollo|null} olio testejä ja savukkeita varten.
 */
export function asennaPollo(haeUi, asetukset = {}) {
  if (typeof document === 'undefined') return null;
  nykyinenPollo = new Pollo(haeUi, asetukset);
  /*
   * ALANAPPIRIVI ON USEIN PIIRRETTY JO ENNEN ASENNUSTA.
   *
   * main.js palauttaa kesken jääneen pelin (attach → mount → render)
   * ennen kuin se asentaa pöllön, joten piirraToimintorivin
   * polloAnkkuri-kutsu osui tyhjään: rivin keskimmäinen paikka jäi
   * tyhjäksi ja nappi kiinnittyi bodyyn kelluvana (.pollo-kelluu).
   * Työpöydällä se näkyi ruudun oikeassa alakulmassa väärässä
   * kohdassa, ja korjautui vasta ensimmäisessä kaupunginvaihdossa,
   * jolloin rivi piirretään uudelleen (omistajan havainto 13.8.2026).
   *
   * Paikka luetaan siis suoraan DOMista, jos se on jo olemassa — sama
   * lopputulos kuin kaupunginvaihdon piirrossa, ilman että
   * käynnistysjärjestykseen tarvitsee koskea.
   */
  const doc = asetukset.doc ?? document;
  const paikka = doc.querySelector('.pollo-paikka');
  if (paikka) nykyinenPollo.ankkuroi(paikka);
  // Savukkeet ja kehitys tarvitsevat kahvan; peli itse ei käytä tätä.
  window.matkakirjaPollo = nykyinenPollo;
  return nykyinenPollo;
}
