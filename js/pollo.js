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
import { haeKatkelmat, rakennaIndeksi } from './pollo-haku.js';

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
 * VALKOINEN LISTA: mistä lehden tekstit luetaan.
 *
 * Järjestys on tärkeysjärjestys — jos paketti täyttyy, loppupää jää
 * pois. Otsikko on se sana, jolla lohko esitellään pöllölle.
 */
export const LEHTI_LOHKOT = [
  { valitsin: '#arrival-city', otsikko: 'Lehden nimiö' },
  { valitsin: '#arrival-lehti-pvm', otsikko: 'Päiväys' },
  { valitsin: '#arrival-intro', otsikko: 'Kaupungin esittely' },
  { valitsin: '#arrival-maa-nimi', otsikko: 'Maa' },
  { valitsin: '#arrival-maa-intro', otsikko: 'Maan esittely' },
  { valitsin: '#arrival-maa-tunnusluvut', otsikko: 'Maa numeroina' },
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
 * Pelin tila kontekstia varten.
 *
 * TÄMÄ ON SPOILERISUOJAN YDIN: funktio lukee vain nämä neljä kenttää.
 * game.quiz, game.duel, game.eventCard ja game.arrivalFact jäävät
 * koskematta — niissä ovat aktiivisen tehtävän kysymys, vaihtoehdot ja
 * oikean vastauksen indeksi.
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
  return {
    lauta: game.pack?.name ?? null,
    kaupunki,
    maaIso: cityId ? game.pack?.map?.cityCountry?.[cityId] ?? null : null,
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
  if (maa) rivit.push(`Maa: ${polloSiisti(maa)}`);
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
 * ui-olio on valinnainen: siitä otetaan vain maan nimi ja tieto siitä,
 * kumpi lehti on auki. Ilman sitä paketti on hieman köyhempi mutta
 * kelvollinen.
 */
export function lueNakyma({ game = null, ui = null, doc = document, aineisto = [] } = {}) {
  const tila = pelinTila(game);
  const lehti = doc?.getElementById?.('arrival-dialog') ?? null;
  const lehtiAuki = Boolean(lehti?.open);
  const matkakirja = polloSiisti(doc?.getElementById?.('fact-text')?.textContent);
  return kokoaKonteksti({
    ...tila,
    maa: ui?.arrivalMaaTiedot?.nimi ?? tila.maaIso ?? null,
    matkakirja,
    nakyma: lehtiAuki
      ? (ui?.tutkiMaaLehti ? 'maan lehti auki' : 'kaupungin lehti auki')
      : 'kartta',
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
    // Sanelu on ensisijainen syöttötapa; näppäimistö on varalla.
    this.tila = haePuheTunnistus() ? 'sanelu' : 'kirjoitus';
    this.rakenna();
    this.seuraaNakymaa();
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

    const paneeli = polloElementti('div', 'pollo-paneeli');
    paneeli.hidden = true;
    paneeli.setAttribute('role', 'dialog');
    paneeli.setAttribute('aria-label', 'Viisas Pöllö');
    // Paneelin sisällä napautus ei saa sulkea alanappirivin liukua.
    paneeli.addEventListener('click', (e) => e.stopPropagation());

    const yla = polloElementti('div', 'pollo-yla');
    yla.appendChild(polloElementti('span', 'pollo-otsikko', 'Viisas Pöllö'));
    const sulje = polloElementti('button', 'pollo-sulje', '×');
    sulje.type = 'button';
    sulje.title = 'Sulje';
    sulje.setAttribute('aria-label', 'Sulje keskustelu');
    sulje.addEventListener('click', () => this.sulje());
    yla.appendChild(sulje);
    paneeli.appendChild(yla);

    this.ehdotukset = polloElementti('div', 'pollo-ehdotukset');
    this.ehdotukset.hidden = true;
    paneeli.appendChild(this.ehdotukset);

    this.virta = polloElementti('div', 'pollo-virta');
    paneeli.appendChild(this.virta);

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
     * Matala nappirivi: näppäimistö 1/3, mikrofoni 2/3. Rivi on aina
     * paneelin pohjalla, joten kirjoituskenttä avautuu sen yläpuolelle
     * eikä sen tilalle — mikrofoni on siis yhden napautuksen päässä myös
     * kirjoitettaessa, ja erillistä "Sanele sen sijaan" -linkkiä ei
     * tarvita.
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
    this.naytaSyote();
    return syote;
  }

  /**
   * Piirtää syöttöalueen nykyisen tilan mukaan.
   *
   * Nappirivi on esillä aina kun selain osaa sanella. Jos ei osaa,
   * rivi jää pois kokonaan ja kirjoituskenttä on suoraan esillä —
   * näppäimistönappi olisi silloin ainoa vaihtoehto eikä siis valinta.
   */
  naytaSyote() {
    const saneluTuettu = Boolean(haePuheTunnistus());
    const sanelussa = this.tila === 'sanelu' && saneluTuettu;
    this.saneluOsa.hidden = !saneluTuettu;
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
    if (!this.virta.childElementCount) this.lisaaViesti('pollo', TERVEHDYS);
    this.naytaSyote();
    // Indeksi rakennetaan laiskasti ensimmäisellä avauksella, ei pelin
    // käynnistyksessä. Ehdotushaku odottaa sen valmistumista.
    this.varmistaIndeksi();
    this.haeEhdotukset();
  }

  sulje() {
    this.lopetaSanelu();
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

  /** Napautettavat linkit vastauksen alle. Enintään kolme, vain aidosti osuvat. */
  naytaLinkit(katkelmat) {
    const nahdyt = new Set();
    const reitit = [];
    for (const katkelma of katkelmat ?? []) {
      const reitti = katkelma?.reitti;
      if (!reitti) continue;
      const avain = `${reitti.tyyppi}:${reitti.tunniste}:${reitti.sivu ?? reitti.kohde ?? ''}`;
      if (nahdyt.has(avain)) continue;
      if (!this.reittiAvattavissa(reitti)) continue;
      nahdyt.add(avain);
      reitit.push(reitti);
      if (reitit.length >= 3) break;
    }
    if (!reitit.length) return;
    const laatikko = polloElementti('div', 'pollo-linkit');
    for (const reitti of reitit) {
      const nappi = polloElementti('button', 'pollo-linkki', `Lue: ${reitti.leima ?? reitti.otsikko}`);
      nappi.type = 'button';
      nappi.addEventListener('click', () => this.avaaKohde(reitti));
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
    const tulos = haeKatkelmat(indeksi, kysymys, {
      maara: 4,
      onVastattu: (m) => this.tehtavaRatkaistu(m),
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
    const vastaus = await fetch(this.palvelin, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
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
    this.ehdotukset.replaceChildren();
    for (const teksti of lista.slice(0, 3)) {
      const nappi = polloElementti('button', 'pollo-ehdotus', teksti);
      nappi.type = 'button';
      nappi.addEventListener('click', () => this.kysy(teksti));
      this.ehdotukset.appendChild(nappi);
    }
    this.ehdotukset.hidden = !this.ehdotukset.childElementCount;
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
      this.lisaaViesti('pollo', teksti);
      this.naytaLinkit(this.viimeisetKatkelmat);
      this.historia.push({ rooli: 'kayttaja', teksti: kysymys });
      this.historia.push({ rooli: 'pollo', teksti });
      this.historia = this.historia.slice(-HISTORIAN_KATTO);
    } catch (virhe) {
      odotus.remove();
      this.lisaaViesti('pollo', virhe?.viesti
        ?? 'Pöllö ei saanut ajatuksesta kiinni. Yritä hetken päästä uudelleen.');
    } finally {
      this.asetaKesken(false);
      this.virta.scrollTop = this.virta.scrollHeight;
    }
  }

  /* --- sanelu ------------------------------------------------------ */

  /** Mikrofonin napautus: aloita tai lopeta. */
  vaihdaSanelu() {
    if (this.tunnistin) {
      this.lopetaSanelu({ laheta: true });
      return;
    }
    this.aloitaSanelu();
  }

  aloitaSanelu() {
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
      this.mikki.classList.remove('kuuntelee');
      this.mikki.setAttribute('aria-pressed', 'false');
      if (!oliTunnistin) return;
      const teksti = this.puhuttu.trim();
      if (teksti) this.kysy(teksti);
      else if (this.saneluTila.textContent === SANELU_KUUNTELEE) {
        this.saneluTila.textContent = 'En kuullut mitään. Yritä uudelleen.';
      }
    };
    this.tunnistin = tunnistin;
    this.mikki.classList.add('kuuntelee');
    this.mikki.setAttribute('aria-pressed', 'true');
    this.saneluTila.textContent = SANELU_KUUNTELEE;
    try {
      // Mikrofonilupa kysytään vasta tästä — ei paneelia avattaessa.
      tunnistin.start();
    } catch {
      this.tunnistin = null;
      this.mikki.classList.remove('kuuntelee');
      this.saneluTila.textContent = 'Sanelu ei käynnisty juuri nyt.';
    }
  }

  lopetaSanelu({ laheta = false } = {}) {
    const tunnistin = this.tunnistin;
    if (!tunnistin) return;
    if (!laheta) this.tunnistin = null;
    this.mikki.classList.remove('kuuntelee');
    this.mikki.setAttribute('aria-pressed', 'false');
    try {
      tunnistin.stop();
    } catch {
      /* tunnistin oli jo pysähtynyt */
    }
  }

  /** Siisti suomenkielinen tila jokaiselle virheelle — ei konsolia. */
  saneluVirhe(koodi) {
    this.tunnistin = null;
    this.mikki.classList.remove('kuuntelee');
    this.mikki.setAttribute('aria-pressed', 'false');
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
    this.saneluTila.textContent = 'Sanelu ei onnistunut. Voit myös kirjoittaa.';
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
  // Savukkeet ja kehitys tarvitsevat kahvan; peli itse ei käytä tätä.
  window.matkakirjaPollo = nykyinenPollo;
  return nykyinenPollo;
}
