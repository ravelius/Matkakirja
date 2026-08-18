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
import { haeValmiskysymykset } from './packs/pollo-kysymykset.js';
import { KULTTUURI_KATEGORIAT } from './packs/kulttuuri-kategoriat.js';
import { MAA_KATEGORIAT } from './packs/maa-kategoriat.js';
import { NAHTAVYYSJUTUT } from './packs/nahtavyysjutut.js';
import { KAUPUNKIKARTAT } from './packs/maakartat.js';
import { valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import { asetaKuva } from './media.js';
import { POLLON_LINKKIKATTO, etsiAnkkuri, haeKatkelmat, rakennaIndeksi } from './pollo-haku.js';
import { haeKuvallinenArtikkeli, suurennusportaat } from './wiki.js';
import { lueAaneen, lueVirtana, lukijaTuettu, pysaytaLukija } from './lukija.js';
import { sfx } from './sound.js';
import {
  hiljennaAmbienssi, palautaAmbienssi, taukoaSanelunAjaksi, jatkaSanelunJalkeen,
} from './ambience-stream.js';

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
 * kaupungista johdettuna; ui.lehtitila.arrivalMaaTiedot kertoo vain, minkä maan
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
  const maalehtiIso = lehtiAuki ? ui?.lehtitila?.tutkiMaaLehti ?? null : null;
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
/* Pöllölinkit: [[avainkäsitteet]] vastaustekstissä                     */
/* ------------------------------------------------------------------ */

/**
 * PÖLLÖLINKIT (omistajan tilaus 13.8.2026).
 *
 * Vastauksissa on kahdenlaisia linkkejä. Artikkelilinkki vie pelin omaan
 * juttuun ja se rakennetaan paikallisen haun tuloksista (korostaLinkit).
 * Pöllölinkki on toinen laji: pöllö merkitsee vastaukseensa 1–3
 * avainkäsitettä, ja niitä napauttamalla se kertoo lisää samasta
 * asiasta. Merkintä tulee mallilta muodossa [[käsite]], ja se on
 * TARKOITUKSELLA jätetty palvelimella paikalleen — vain sijainti kertoo,
 * mihin kohtaan lausetta linkki kuuluu.
 *
 * Kaksi sääntöä, jotka eivät jousta:
 *
 *   1. Hakasulkeet eivät saa näkyä pelaajalle KOSKAAN. Kaikki teksti
 *      kulkee poistaKasiteMerkinnat-suodattimen läpi, myös kesken
 *      striimin ja myös silloin kun merkintä jää rikki.
 *   2. Vastausta ei tulkita merkkauksena. Solmut rakennetaan käsin ja
 *      teksti asetetaan tekstisisältönä, kuten artikkelilinkeissäkin.
 */
/*
 * Katto on turvaraja, ei tyylivalinta (omistajan havainto 13.8.2026:
 * "kaikki paikat ja erisnimet, kuten Beethoven, olisi kiva saada
 * jatkokysymyspainikkeeksi tekstiin"). Kolmen katto leikkasi palvelimen
 * antamat linkit kesken lauseen, joten loppuvastaus jäi linkittömäksi.
 * Kaksitoista ei käytännössä osu vastaan — se on olemassa vain siltä
 * varalta, että malli merkitsee joskus koko vastauksen hakasulkeisiin.
 */
const KASITTEIDEN_KATTO = 12;

/** Yhden käsitemerkinnän kuvio. Rivinvaihto katkaisee: se on jo virhe. */
const KASITE_KUVIO = /\[\[([^[\]\n]{1,60})\]\]/g;

/*
 * Putkimerkintä [[perusmuoto|taivutus]] puretaan aina: pelaajalle
 * näytetään taivutus, ja kysymys tehdään perusmuodosta. Kehote kieltää
 * putken, mutta malli lipsuu wiki-tapoihinsa (omistajan kaappaus
 * 13.8.2026: "juutalaisuus|juutalaisuudelle" näkyi raakana tekstissä)
 * — pelaaja ei saa koskaan nähdä pystyviivaa, kielsi kehote tai ei.
 */
function puraPutki(kasite) {
  const kohta = kasite.indexOf('|');
  if (kohta < 0) return { aihe: kasite, nayttomuoto: kasite };
  const aihe = kasite.slice(0, kohta).trim();
  const nayttomuoto = kasite.slice(kohta + 1).split('|').pop().trim();
  return {
    aihe: aihe || nayttomuoto,
    nayttomuoto: nayttomuoto || aihe,
  };
}

/** Teksti ilman merkintöjä. Myös keskeneräinen "[[" katoaa striimissä. */
export function poistaKasiteMerkinnat(teksti) {
  return String(teksti ?? '')
    .replace(KASITE_KUVIO, (_, sisus) => puraPutki(sisus.trim()).nayttomuoto)
    // Rikkinäiset ja keskeneräiset jäänteet pois: pelaaja näkee vain
    // tekstin, ei koskaan sulkeita.
    .replace(/\[\[|\]\]/g, '')
    .replace(/\[$/, '');
}

/**
 * Jäsentää vastauksen paloiksi: tavallinen teksti ja käsitteet.
 *
 * @returns {Array<{teksti: string, kasite: boolean}>}
 */
export function jasennaKasitteet(teksti, katto = KASITTEIDEN_KATTO) {
  const koko = String(teksti ?? '');
  const palat = [];
  let kohta = 0;
  let loydetty = 0;
  for (const osuma of koko.matchAll(KASITE_KUVIO)) {
    if (loydetty >= katto) break;
    const kasite = osuma[1].trim();
    if (!kasite) continue;
    const { aihe, nayttomuoto } = puraPutki(kasite);
    palat.push({ teksti: poistaKasiteMerkinnat(koko.slice(kohta, osuma.index)), kasite: false });
    palat.push({ teksti: nayttomuoto, kasite: true, aihe });
    kohta = osuma.index + osuma[0].length;
    loydetty += 1;
  }
  palat.push({ teksti: poistaKasiteMerkinnat(koko.slice(kohta)), kasite: false });
  return palat.filter((pala) => pala.teksti);
}

/**
 * VASTAUKSEN KUVAN HAKUAIHE (omistajan tilaus 15.8.2026: "pöllö hakisi
 * aina yksi kuva per vastaus").
 *
 * Paras aihe on pöllön oma ensimmäinen käsitemerkintä: pöllö on jo
 * poiminut vastauksensa avainkäsitteet, ja ensimmäinen niistä on
 * yleensä vastauksen pääaihe. Ilman merkintöjä aiheeksi kelpaa
 * pelaajan kysymys sellaisenaan — Wikipedian haku sietää kokonaisen
 * lauseen. Katkenneessa striimissä puolikas merkintä ei kelpaa
 * aiheeksi: jasennaKasitteet tunnistaa vain kokonaiset [[...]]-parit.
 */
export function vastauskuvanAihe(teksti, kysymys = '') {
  for (const pala of jasennaKasitteet(teksti)) {
    if (pala.kasite && pala.aihe) return pala.aihe;
  }
  const siisti = polloSiisti(kysymys).replace(/[?!.]+$/, '').trim();
  return siisti || null;
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

/*
 * PÖLLÖ ON AARRE (omistajan tilaus 18.8.2026).
 *
 * Peli alkaa ilman pöllöä, ja se löytyy ensimmäisen käännetyn laatan
 * alta omana aarteenaan — laatan oma sisältö säilyy koskemattomana,
 * pöllö tulee sen lisäksi. Kortin tekstit ovat samassa muodossa kuin
 * muidenkin aarteiden: nuoren herran huudahdus, aarteen nimi, lyhyt
 * selite ja kerronnallinen jatko (js/ui.js naytaPolloAarre).
 *
 * Sävy on tarinakaaren aarretekstien sävy: minämuotoista kerrontaa,
 * jonka sisällä puhutaan suoraan. Kohderyhmä on 13 vuotta täyttäneet
 * ja aikuiset, joten pöllö on kohtelias matkakumppani eikä maskotti.
 *
 * KALEVALAINEN KEHYS (päätoimittajan kaanonteksti, omistaja hyväksyi
 * 18.8.2026): Viisas Pöllö on tietäjien ikivanha matkakumppani, ja
 * isoisä oli hänen oppilaistaan viimeisin. Tekstiä ei muuteta ilman
 * päätoimittajaa.
 */
export const POLLO_AARRE = {
  /*
   * Pöllön oma generoitu muotokuva. Sama tyylikääre kuin
   * tietäjätasojen avatareilla (tools/generoi-tietaja-avatarit.mjs,
   * avain viisas-pollo), mutta ERI LAJI: Viisas Pöllö on suuri
   * huuhkaja, tasoavatarit lehtopöllöjä. Paljastuskortti näyttää
   * kuvan uudessa paljastusnäkymässä; puuttuva tiedosto jättää
   * pelkän tekstin.
   */
  kuva: 'assets/tietaja/viisas-pollo.jpg',
  huudahdus: 'Se liikkui — kätkössä oli jotain elävää!',
  nimi: 'Viisas Pöllö',
  selite: 'Tietäjien ikivanha matkakumppani liittyy seuraan',
  esittely: 'Kätkön reunalta nousi pölyä, ja pölyn keskeltä katsoi suuri '
    + 'huuhkaja. "Minä olen Viisas Pöllö", se sanoi ja kumarsi hitaasti. '
    + '"Olen kulkenut tietäjien matkassa niin kauan kuin sanoja on etsitty '
    + '— isoisänne oli oppilaistani viimeisin. Nyt otan teidät siipieni '
    + 'suojaan tiedon tielle. Kysykää minulta kaupungeista, kartoista ja '
    + 'Aarnin luettelosta: jokaisella asialla on syntynsä, ja joka synnyn '
    + 'tuntee, se asian hallitsee. Visan vastauksia en anna — ne teidän on '
    + 'löydettävä itse."',
};

/** Mikrofoni samalla viivakynällä. */
const MIKKI_IKONI = '<svg viewBox="0 0 24 24" aria-hidden="true">'
  + '<rect x="9" y="2.8" width="6" height="11.4" rx="3"/>'
  + '<path d="M5.6 11.4a6.4 6.4 0 0 0 12.8 0"/>'
  + '<path d="M12 17.8v3.4M8.6 21.2h6.8"/>'
  + '</svg>';

/**
 * Pysäytysneliö sanelun ajaksi (omistajan tilaus 13.8.2026).
 *
 * Sanelun aikana mikrofonikuvake vaihtuu neliöksi ja napin viereen tulee
 * teksti "Lopeta": ennen nappi oli kuunnellessaan täysin tyhjä, ja
 * ainoa merkki sanelusta oli tilarivin "Kuuntelen…". Neliö on täytetty
 * (.taytto), koska pelkkä ääriviiva luettaisiin toiseksi mikrofoniksi.
 */
const PYSAYTYS_IKONI = '<svg viewBox="0 0 24 24" aria-hidden="true">'
  + '<rect class="taytto" x="7.2" y="7.2" width="9.6" height="9.6" rx="1.6"/>'
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
 * Väkänen alaspäin: valmiskysymysten "näytä loput" -nappi.
 */
const VAKANEN_IKONI = '<svg viewBox="0 0 24 24" aria-hidden="true">'
  + '<path d="M6.5 9.7 12 15.2l5.5-5.5"/>'
  + '</svg>';

/** Valmiskysymyksiä per tilanne (js/packs/pollo-kysymykset.js). */
const VALMIITA_ENINTAAN = 5;

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

/**
 * Yksi SSE-tapahtuma tyhjän rivin erottamasta lohkosta.
 *
 * Muoto on palvelimen oma ja tarkoituksella suppea (tools/pollo/worker.js):
 * rivi "event:" kertoo lajin ja rivi "data:" JSON-rungon. Rikkinäinen
 * lohko palauttaa nullin — yksi hukattu pala ei saa kaataa virtaa.
 */
function polloTapahtuma(lohko) {
  let laji = 'viesti';
  const rivit = [];
  for (const rivi of String(lohko ?? '').split('\n')) {
    if (rivi.startsWith('event:')) laji = rivi.slice(6).trim();
    else if (rivi.startsWith('data:')) rivit.push(rivi.slice(5).trim());
  }
  if (!rivit.length) return null;
  try {
    return { laji, data: JSON.parse(rivit.join('\n')) };
  } catch {
    return null;
  }
}

/** Osaako tämä selain lukea vastauksen virtana? */
function polloStriimiTuettu() {
  return typeof TextDecoder === 'function' && typeof ReadableStream === 'function';
}

/*
 * ── NAPUTUS STRIIMIN TAUSTALLE (omistajan tilaus 13.8.2026) ──────────
 *
 * *"saisiko siihen taustalle konekirjoitusäänen taustalle (vaikka sama
 * kuin etusivulla)"*.
 *
 * Ääni on sama kuin etusivun avaustekstillä (sfx 'pen', näytteistetty
 * kirjoituskoneen näppäinlyönti), mutta kolme asiaa on eri:
 *
 *   1. RYTMI TULEE AJASTIMESTA, EI PALOISTA. Teksti saapuu verkosta
 *      epätasaisina paloina — joskus kolme sanaa kerralla, joskus kaksi
 *      merkkiä. Jos lyönti sidottaisiin palaan, naputus olisi milloin
 *      ryöppy milloin hiljaisuus, eikä se kuulostaisi kirjoittajalta.
 *      Ajastin lyö omaan tahtiinsa niin kauan kuin virta on auki.
 *   2. TAHTI HUOJUU. Tasavälinen naputus alkaa kuulua kellona (sama syy
 *      kuin js/ui.js KIRJOITUSTAUOT), joten väli arvotaan haarukasta ja
 *      joka kuudennen kohdalla pidetään lyhyt hengähdys.
 *   3. VOIMAKKUUS ON TAUSTAMAINEN. Etusivulla naputus on pääosassa;
 *      tässä sen alla luetaan tekstiä, joten lyönti soi alle puolella
 *      voimalla (sound.js 'pen' voima-kerroin).
 */
const NAPUTUS_MIN_MS = 95;
const NAPUTUS_MAX_MS = 210;
/** Miten usein kirjoittaja hengähtää, ja kuinka pitkäksi aikaa. */
const NAPUTUS_TAUKO_VALI = 6;
const NAPUTUS_TAUKO_MS = 420;
/** Taustanaputus on selvästi hiljaisempi kuin etusivun kirjoituskone. */
const NAPUTUS_VOIMA = 0.55;
/*
 * PUHEEN ALLA NAPUTUS VAIMENEE MUTTEI VAIKENE (omistaja 13.8.2026
 * ilta: "pöllön kirjoituskone ei kuulu" — aiempi linja hiljensi
 * naputuksen kokonaan kaiuttimen lukiessa, ja kaiutinta käyttävälle
 * kone katosi kokonaan). Nyt kone naputtaa luennan taustalla selvästi
 * vaimeampana — kuin kirjoituskone radiohaastattelun taustalla:
 * läsnä, ei pääosassa.
 */
const NAPUTUS_VOIMA_PUHEEN_ALLA = 0.22;

/*
 * ── LUENTA ALKAA ENSIMMÄISESTÄ VIRKKEESTÄ (omistaja 13.8.2026) ───────
 *
 * *"voiko ääni alkaa lukea tekstiä jo striimauksen aikana?"*
 *
 * Striimistä leikataan luettavaksi vain se osa, joka on VARMASTI
 * valmista. Kaksi rajaa, kummallakin oma syynsä:
 *
 *   1. AVOIN KÄSITEMERKINTÄ katkaisee. "[[Wolfgang Amadeus" voi jatkua
 *      seuraavassa palassa, ja puolikkaasta merkinnästä kuuluisi
 *      hakasulkeet — sääntö, joka ei jousta (ks. jasennaKasitteet).
 *      Kaikki avoimen "[[":n jälkeinen jää siis odottamaan sulkua.
 *   2. VIRKKEEN RAJA katkaisee. Kesken lauseen katkaistu lausuma
 *      kuulostaisi änkytykseltä, ja syntetisaattori tarvitsee
 *      välimerkin osatakseen intonaation.
 *
 * Loppu luetaan striimin päättyessä, oli se kokonainen virke tai ei.
 */
const VIRKKEEN_RAJA = /[.!?…]["»)\]]?(\s|$)/g;

/**
 * Kuinka pitkälti teksti on valmista luettavaksi.
 *
 * @returns {number} merkkien määrä alusta, tai 0 jos mikään ei ole valmista
 */
export function luettavaRaja(teksti) {
  const koko = String(teksti ?? '');
  // Avoin merkintä ensin: sen jälkeinen teksti ei ole vielä varmaa.
  const auki = koko.lastIndexOf('[[');
  const kiinni = koko.lastIndexOf(']]');
  const varma = auki > kiinni ? koko.slice(0, auki) : koko;
  let raja = 0;
  VIRKKEEN_RAJA.lastIndex = 0;
  for (const osuma of varma.matchAll(VIRKKEEN_RAJA)) raja = osuma.index + osuma[0].length;
  return raja;
}

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
/*
 * "Kuuntelen…" vasta kun mikrofoni on OIKEASTI auki (omistaja
 * 13.8.2026: "pöllössä lukee kuuntelen vaikka mikki ei vielä päällä").
 * Käynnistys voi kestää sekunteja — lupakysely, äänisession vaihto,
 * moottorin startti — ja sinä aikana tilarivi kertoo rehellisesti
 * että mikki on vasta tulossa. Selainpolku vaihtaa tekstin
 * onaudiostartissa, natiivipolku sillan sanelu-alkoi-tapahtumassa.
 */
const SANELU_KAYNNISTYY = 'Käynnistän mikrofonia…';

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
    // Kevyt kuvapopup nähtävyyslinkin päällä (avaaKuvapopup).
    this.kuvapopup = null;
    /*
     * Vastauksen ankkuri. odotettuVieritys on se kohta, johon ankkurointi
     * jätti virran; jos pelaaja on sen jälkeen vierittänyt itse, näkymään
     * ei enää kosketa (omistajan reunaehto: vastaus ei koskaan rullaa
     * itsestään). ankkuriViesti on se kysymys, joka nostettiin
     * yläreunaan, ja tyhjaTila kertoo paljonko varattua tyhjää on vielä
     * jäljellä sen alla — null tarkoittaa, ettei varausta ole.
     */
    this.odotettuVieritys = null;
    this.ankkuriViesti = null;
    this.tyhjaTila = null;
    this.tyhjanKatto = null;
    this.sisallonPohja = 0;
    // Striimin taustanaputus: ajastimen kahva ja lyöntilaskuri (ks.
    // aloitaNaputus). null tarkoittaa, ettei naputus ole käynnissä.
    this.naputusAjastin = null;
    this.naputuksia = 0;
    // Puheen alla naputus soi vaimeana (ks. NAPUTUS_VOIMA_PUHEEN_ALLA);
    // lippu päivittyy joka striimipalasta ja luetaan joka lyönnillä.
    this.naputusVaimeana = false;
    /*
     * Striimin virtaluenta (ks. luettavaRaja). `luentaVirta` on
     * js/lukija.js:n lueVirtana-kahva ja `luettuun` kertoo, mihin
     * kohtaan kertynyttä tekstiä luenta on jo saanut. Kumpikin null/0,
     * kun luentaa ei ole käynnissä.
     */
    this.luentaVirta = null;
    this.luettuun = 0;
    // Sanelu on ensisijainen syöttötapa; näppäimistö on varalla.
    this.tila = saneluTuettu() ? 'sanelu' : 'kirjoitus';
    this.rakenna();
    this.seuraaPaneelinKokoa();
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
    /*
     * "EHDOTA SISÄLTÖÄ" OIKEASSA YLÄKULMASSA (omistajan tilaus
     * 18.8.2026). Hampurilaisen ehdotusnappi näkyy vain karttavalikossa;
     * pöllö taas on läsnä myös lehden päällä, joten sama lomake avataan
     * tästä — pelaaja voi ehdottaa sisältöä juuri siltä sivulta, jota
     * hän lukee. Nappi kutsuu SAMAA polkua kuin hampurilainen
     * (js/ui.js naytaPalauteKulmasta): lomake on <dialog>, joka
     * avataan showModalilla bodyyn, joten se nousee top-layerissa
     * auki olevan lehtidialogin PÄÄLLE. Chat väistyy ensin samalla
     * säännöllä kuin linkkiä avattaessa (avaaKohde): paluu
     * keskusteluun on yksi napautus ja historia säilyy.
     *
     * Rivi on oma kapea lohkonsa eikä virran päälle asemoitu nappi:
     * paneelissa ei ole yläpalkkia (linjaus 12.8.2026), mutta virran
     * päällä kelluva nappi peittäisi vieritettävää tekstiä.
     */
    const ylarivi = polloElementti('div', 'pollo-ylarivi');
    const ehdota = polloElementti('button', 'pollo-ehdota', 'Ehdota sisältöä');
    ehdota.type = 'button';
    ehdota.title = 'Ehdota sisältöä tähän kohtaan peliä';
    ehdota.setAttribute('aria-label', 'Ehdota sisältöä — avaa ehdotuslomake');
    ehdota.addEventListener('click', () => {
      const ui = this.haeUi?.();
      if (typeof ui?.naytaPalauteKulmasta !== 'function') return;
      this.sulje();
      ui.naytaPalauteKulmasta();
    });
    this.ehdotaNappi = ehdota;
    ylarivi.appendChild(ehdota);
    paneeli.appendChild(ylarivi);

    this.virta = polloElementti('div', 'pollo-virta');
    paneeli.appendChild(this.virta);

    this.ehdotukset = polloElementti('div', 'pollo-ehdotukset');
    this.ehdotukset.hidden = true;
    this.virta.appendChild(this.ehdotukset);

    /*
     * Vastauksen alle varattava tyhjä (viritaTyhjaTila). Lohko on
     * virran viimeinen lapsi ja korkeudeltaan nolla, kunnes kysymys
     * virittää sen. Se on pelkkää tilaa, joten ruudunlukija ohittaa sen.
     */
    this.tyhja = polloElementti('div', 'pollo-tyhja');
    this.tyhja.setAttribute('aria-hidden', 'true');
    this.tyhja.style.height = '0px';
    this.virta.appendChild(this.tyhja);

    paneeli.appendChild(this.rakennaValmiit());
    paneeli.appendChild(this.rakennaSyote());
    this.paneeli = paneeli;
    this.kiinnita();
  }

  /**
   * VALMISKYSYMYSTEN ALUE paneelin alaosaan, syöterivin yläpuolelle
   * (omistajan tilaus 18.8.2026).
   *
   * Käsin kirjoitetut avauskysymykset (js/packs/pollo-kysymykset.js)
   * näkyvät vain keskustelun ALUSSA: kaksi kysymystä kerrallaan ja
   * pieni väkänen, josta — tai aluetta vierittämällä — loput tulevat
   * esiin. Napautus lähettää kysymyksen täsmälleen samaa polkua kuin
   * kirjoitettu (kysy). Ensimmäisen oman tai valitun kysymyksen
   * jälkeen alue katoaa ja tilalle tulevat pöllön dynaamiset
   * jatkokysymykset, kuten ennenkin.
   */
  rakennaValmiit() {
    const alue = polloElementti('div', 'pollo-valmiit');
    alue.hidden = true;
    // Lista on oma vieritettävä lohkonsa: suljettuna sen korkeus
    // rajataan kahteen kysymykseen (rajaaValmiit).
    this.valmiitLista = polloElementti('div', 'pollo-valmiit-lista');
    alue.appendChild(this.valmiitLista);
    const lisaa = polloElementti('button', 'pollo-valmiit-lisaa');
    lisaa.type = 'button';
    lisaa.title = 'Näytä kaikki kysymykset';
    lisaa.setAttribute('aria-label', 'Näytä kaikki valmiit kysymykset');
    lisaa.setAttribute('aria-expanded', 'false');
    lisaa.innerHTML = `<span class="icon-glyph viiva-ikoni">${VAKANEN_IKONI}</span>`;
    lisaa.addEventListener('click', () => this.avaaValmiit());
    this.valmiitNappi = lisaa;
    alue.appendChild(lisaa);
    this.valmiit = alue;
    return alue;
  }

  /**
   * Mihin tilanteeseen valmiskysymykset valitaan?
   *
   * Avain on kaupunki-id + konteksti ('laatta' | 'lehti'), sama muoto
   * kuin pakassa. Lehtikonteksti katsotaan auki olevasta lehdestä
   * (lehtitila.arrivalShownFor — sen kaupungin lehteä pelaaja lukee),
   * laattakonteksti pelaajan sijainnista. Maalehti on eri julkaisu:
   * sille ei ole valmiskysymyksiä, ja väärän kaupungin kysymykset
   * olisivat pahempia kuin ei mitään.
   */
  valmiskysymysTilanne() {
    const ui = this.haeUi?.() ?? null;
    const game = ui?.game ?? null;
    const lehti = this.doc.getElementById?.('arrival-dialog') ?? null;
    if (lehti?.open) {
      if (ui?.lehtitila?.tutkiMaaLehti) return null;
      const kaupunki = ui?.lehtitila?.arrivalShownFor
        ?? game?.player?.pos?.city ?? null;
      return kaupunki ? { kaupunki, konteksti: 'lehti' } : null;
    }
    const kaupunki = game?.player?.pos?.city ?? null;
    return kaupunki ? { kaupunki, konteksti: 'laatta' } : null;
  }

  /**
   * Näyttää valmiskysymykset, jos tilanteeseen on kirjoitettu ne.
   *
   * @returns {boolean} tuliko alue näkyviin
   */
  naytaValmiit() {
    if (!this.valmiit) return false;
    // Vain keskustelun alkuun: ensimmäisen oman kysymyksen jälkeen
    // ehdotukset tulevat dynaamisesta jatkokysymyslogiikasta.
    if (this.historia.some((viesti) => viesti.rooli === 'kayttaja')) {
      return this.piilotaValmiit();
    }
    const tilanne = this.valmiskysymysTilanne();
    // Yksi hakufunktio pakan edessä: vaihe 2 voi vaihtaa sen taakse
    // palvelimelta haetun listan kutsujaan koskematta.
    const kysymykset = tilanne
      ? haeValmiskysymykset(tilanne.kaupunki, tilanne.konteksti) : [];
    // Kaupunki ilman kysymyksiä: aluetta ei näytetä lainkaan —
    // tyhjä laatikko olisi pahempi kuin puuttuva.
    if (!kysymykset.length) return this.piilotaValmiit();
    this.valmiitLista.replaceChildren();
    /*
     * KÄÄNTEINEN JÄRJESTYS (omistaja 18.8.2026: "riittäisi, kun vain
     * scrollaisi ylöspäin"): piilotetut kysymykset ovat näkyvien
     * YLÄPUOLELLA, joten lista täytetään lopusta alkuun — kaksi
     * tärkeintä istuvat alimpana näkyvässä ikkunassa, lähinnä
     * syöteriviä, ja loput löytyvät vierittämällä ylös.
     */
    for (const teksti of kysymykset.slice(0, VALMIITA_ENINTAAN).reverse()) {
      const nappi = polloElementti('button', 'pollo-ehdotus pollo-valmis', teksti);
      nappi.type = 'button';
      // Sama polku kuin kirjoitetulla kysymyksellä.
      nappi.addEventListener('click', () => this.kysy(teksti));
      this.valmiitLista.appendChild(nappi);
    }
    this.valmiit.classList.remove('auki');
    this.valmiitNappi.hidden = false;
    this.valmiitNappi.setAttribute('aria-expanded', 'false');
    this.valmiit.hidden = false;
    this.rajaaValmiit();
    return true;
  }

  /**
   * Suljetun alueen korkeus: täsmälleen kaksi ALINTA kysymystä
   * (lista on käännetty — tärkeimmät alimpana, ks. naytaValmiit).
   *
   * Mitta luetaan napeista eikä kirjoiteta remeinä, koska kysymys voi
   * rivittyä kahdelle riville — kiinteä luku näyttäisi silloin
   * puolikkaan napin. Loput löytyvät vierittämällä ylös tai
   * väkäsestä; lista vieritetään valmiiksi pohjaan.
   */
  rajaaValmiit() {
    const lista = this.valmiitLista;
    if (!lista?.style) return;
    lista.style.maxHeight = '';
    const lapset = lista.children ?? [];
    const toiseksiViimeinen = lapset[lapset.length - 2];
    if (!toiseksiViimeinen || typeof toiseksiViimeinen.offsetTop !== 'number') return;
    const raja = lista.scrollHeight - toiseksiViimeinen.offsetTop;
    if (raja > 0) {
      lista.style.maxHeight = `${raja}px`;
      lista.scrollTop = lista.scrollHeight;
    }
  }

  /** Väkäsen napautus: koko lista esiin, väkänen pois. */
  avaaValmiit() {
    if (!this.valmiit) return;
    this.valmiit.classList.add('auki');
    if (this.valmiitLista?.style) this.valmiitLista.style.maxHeight = '';
    this.valmiitNappi.hidden = true;
    this.valmiitNappi.setAttribute('aria-expanded', 'true');
  }

  /** @returns {boolean} aina false, jotta kutsuja voi palauttaa tämän */
  piilotaValmiit() {
    if (this.valmiit) this.valmiit.hidden = true;
    return false;
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
    mikki.addEventListener('click', () => this.vaihdaSanelu());
    this.mikki = mikki;
    // Sisältö, nimi ja tila tulevat samasta paikasta kuin sanelun aikana.
    this.merkitseMikki(false);
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

  /**
   * Vivun napautus. Pois kytkeminen katkaisee myös käynnissä olevan
   * luennan — myös striimin rinnalla juoksevan (peruLuenta tyhjentää
   * jonon, jottei peruttu luenta jatku seuraavasta virkkeestä).
   *
   * Vipu on myös se käyttäjän ele, jonka iOS vaatii ennen ensimmäistä
   * puhetta. Siksi luentaa ei koskaan aloiteta ilman sitä.
   */
  vaihdaAani() {
    this.aaniPaalla = !this.aaniPaalla;
    polloTallenna(POLLO_AANI_AVAIN, this.aaniPaalla ? '1' : '');
    if (!this.aaniPaalla) {
      this.peruLuenta();
      pysaytaLukija();
      // Kesken striimin sammutettu kaiutin palauttaa naputuksen: se
      // vaikeni vain siksi, että puhe soi sen päällä.
      if (this.kesken) this.aloitaNaputus();
    } else if (!this.kesken) {
      /*
       * Jälkikäteen päälle käännetty vipu lukee viimeisimmän vastauksen
       * (omistajan havainto 13.8.2026: "jos vastaus on annettu, se ei
       * lue sitä tekstiä vaan vasta kun tehdään uusi kysymys"). Kesken
       * vastauksen tätä ei tehdä: striimissä syotaLuennalle aloittaa
       * saapuneen tekstin alusta, eikä edellinen vastaus saa puhua
       * uuden päälle.
       */
      const viimeisin = [...this.historia].reverse()
        .find((viesti) => viesti.rooli === 'pollo');
      if (viimeisin) this.lueVastaus(viimeisin.teksti);
    }
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
      // Pöllö puhuu omalla persoonallaan (js/puhe.js → workerin
      // persoonataulu); laitteen ääni jää varapoluksi lukijan sisällä.
      lueAaneen(teksti, null, { persoona: 'pollo' });
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
    /*
     * Myös artikkeli-ikkunat (Lue lisää -wiki ja nähtävyysarkki) ovat
     * modaaleja, ja pöllön pitää olla saatavilla niissäkin (omistaja
     * 13.8.2026: "Pöllö saisi olla sivussa näkyvissä näissä myös").
     * Järjestys on pinojärjestys: wiki voi aueta nähtävyyden tai
     * lehden päälle, joten se tarkistetaan ensin — pöllön on asuttava
     * PÄÄLLIMMÄISESSÄ modaalissa ollakseen napautettavissa.
     */
    for (const id of ['wiki-dialog', 'nahtavyys-dialog', 'arrival-dialog']) {
      const dialogi = this.doc.getElementById(id);
      if (dialogi?.open) return dialogi;
    }
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
   * Näkyvyyssääntö: pöllö on löydettävä, eikä se ole alkutekstin päällä.
   *
   * KAKSI EHTOA. Alkuteksti on #intro, joka on näkyvissä vain
   * lähtöpaikkaa valittaessa; kun se väistyy, pöllö saa ilmestyä —
   * eikä koskaan itsestään avaudu, vain näy. TOISEKSI pöllö on aarre
   * (omistajan tilaus 18.8.2026): peli alkaa ilman sitä, ja nappi
   * ilmestyy vasta kun ensimmäinen laatta on kääntynyt
   * (game.polloLoydetty). Ennen sitä myös kuplat vaikenevat itsestään,
   * koska naytaVihje ei näytä mitään piilossa olevan napin vierestä.
   *
   * Ehto on nimenomaan `=== false`: jos peliä ei ole (työhuoneen
   * esikatselu, savuke, testi), pöllö näkyy kuten ennenkin.
   * Alanappirivissä ollessaan pöllö noudattaa lisäksi rivin omaa
   * piilotuslogiikkaa (js/ui.js).
   */
  nakyyko() {
    const intro = this.doc.getElementById('intro');
    if (intro && !intro.hidden) return false;
    const game = this.haeUi?.()?.game ?? null;
    return game?.polloLoydetty !== false;
  }

  /**
   * @param {boolean} korosta pieni ilmestymisliike (löytöhetki).
   */
  paivitaNakyvyys(korosta = false) {
    const nakyy = this.nakyyko();
    this.nappi.hidden = !nakyy;
    if (!nakyy && this.auki) this.sulje();
    if (!nakyy) this.piilotaVihje();
    // Löytöhetkellä nappi nytkähtää kerran esiin, jottei se vain
    // ilmesty riviin huomaamatta. Luokka poistetaan animaation
    // jälkeen, ettei se jää estämään seuraavaa nytkäystä.
    if (nakyy && korosta) {
      this.nappi.classList.remove('pollo-ilmestyy');
      void this.nappi.offsetWidth;
      this.nappi.classList.add('pollo-ilmestyy');
    }
  }

  /* --- paikallinen vihjekupla ------------------------------------- */

  /**
   * VIHJE ILMAN TEKOÄLYÄ (omistajan toive 13.8.2026: *"Pöllö voi
   * tarpeen mukaan vinkata, jos pelaaja ei osaa painaa mitään
   * nappia."*).
   *
   * Kupla on kiinteä teksti: se ei kysy palvelimelta mitään eikä avaa
   * keskustelua, vaan ilmestyy pöllönapin viereen, kun peli on jäänyt
   * odottamaan pelaajan valintaa (js/ui.js paivitaValintavihje).
   *
   * Kupla asuu bodyssa ja asemoidaan napin senhetkisen paikan mukaan,
   * koska nappi vaihtaa paikkaa kolmen kodin välillä: alanappirivi,
   * kelluva nappi kartalla ja lehden sisällä kelluva nappi. Napautus
   * menee kuplan LÄPI (css: pointer-events: none), jotta se ei varasta
   * kartalta yhtään osumaa.
   */
  naytaVihje(teksti, kohde) {
    if (!teksti || this.auki || this.nappi.hidden) return;
    /*
     * Kupla voi osoittaa muuallekin kuin pöllönappiin: 'valikko'
     * ankkuroi sen hampurilaisnapin alle kärki ylöspäin, koska
     * ehdotuskutsun toiminto asuu siellä (omistaja 18.8.2026:
     * "Infokyltti pitäisi osoittaa hampurilaiseen"). Ankkuri
     * talletetaan, jotta asetaVihjeenPaikka osaa saman valinnan.
     */
    this.vihjeAnkkuri = kohde === 'valikko'
      ? this.doc.getElementById('menu-btn') : null;
    /*
     * Siirtovaiheessa alanappiriviä ei piirretä lainkaan (js/ui.js
     * renderActions), joten napin ankkuripaikka on irronnut puusta ja
     * nappi on sen mukana poissa ruudulta. kiinnita() palauttaa napin
     * kelluvaan muotoonsa — muuten vihje osoittaisi tyhjään kohtaan, ja
     * pöllö olisi juuri sillä hetkellä tavoittamattomissa, kun pelaaja
     * eniten kaipaa apua. Rivin seuraava piirto vie napin takaisin
     * paikalleen itsestään (polloAnkkuri).
     */
    this.kiinnita();
    const kupla = this.varmistaKupla();
    kupla.classList.remove('pollo-vihje-juhla');
    kupla.classList.toggle('pollo-vihje-ylos', Boolean(this.vihjeAnkkuri));
    kupla.textContent = teksti;
    kupla.hidden = false;
    this.asetaVihjeenPaikka();
  }

  /** Kupla bodyyn kerran; sama elementti palvelee vihjettä ja juhlaa. */
  varmistaKupla() {
    if (!this.vihje) {
      this.vihje = polloElementti('div', 'pollo-vihje');
      // role="status": ruudunlukija kertoo vihjeen ilman että se
      // sieppaa kohdistuksen kesken vuoron.
      this.vihje.setAttribute('role', 'status');
      // Napautus häivyttää kuplan (omistaja 18.8.2026: "Pöllön
      // puhekuplia pitää häipyä jos sitä koskettaa") — kupla ei siis
      // enää päästä kosketusta lävitseen, vaan ottaa sen sulkeutuakseen.
      this.vihje.addEventListener('pointerdown', () => this.piilotaVihje());
      this.doc.body.appendChild(this.vihje);
    }
    return this.vihje;
  }

  /**
   * JUHLAKUPLA: iso avatar, kalevalainen värssy ja onnittelulause
   * (omistajan tilaus 18.8.2026). Tietäjätason nousu ei anna mitään
   * muuta kuin nimikkeen, joten ilmoitus on koko palkinto — ja emo
   * lausuu sen. Sama kuplaperhe kuin vihjeellä: sama paperi, sama
   * kärki, sama paikannus. Vain sisältö on juhlava.
   *
   * @param {object} p
   * @param {string} p.teksti onnittelulause (pakollinen; ilman sitä ei kuplaa).
   * @param {string} [p.kuva] tason avatarin polku.
   * @param {string[]} [p.sakeet] värssyn säkeet omille riveilleen.
   */
  naytaOnnittelu({ teksti = '', kuva = '', sakeet = [] } = {}) {
    if (!teksti || this.auki || this.nappi.hidden) return;
    this.kiinnita();
    /*
     * Juhlakupla ilmestyy MATKALAUKUN kohdalle ylös (omistaja
     * 18.8.2026: "sehän pitää tulla matkalaukun kohdalle ylös") —
     * tasonnousu näkyy laukun tietäjärivillä, joten kupla osoittaa
     * sinne. Ilman pilleriä (esim. työhuoneen esikatselu) pudotaan
     * pöllönapin viereen.
     */
    this.vihjeAnkkuri = this.doc.getElementById('turn-pill');
    const kupla = this.varmistaKupla();
    kupla.classList.toggle('pollo-vihje-ylos', Boolean(this.vihjeAnkkuri));
    kupla.classList.add('pollo-vihje-juhla');
    kupla.replaceChildren();
    if (kuva) {
      const kuvake = document.createElement('img');
      kuvake.className = 'pollo-vihje-avatar';
      kuvake.src = kuva;
      kuvake.alt = '';
      kuvake.decoding = 'async';
      kuvake.draggable = false;
      /*
       * Kuva muuttaa kuplan korkeutta latautuessaan, ja kupla on
       * asemoitu alareunastaan napin yläpuolelle — ilman uutta
       * mittausta se hyppäisi paikaltaan juuri kun pelaaja katsoo sitä.
       */
      kuvake.addEventListener('load', () => this.asetaVihjeenPaikka(), { once: true });
      kupla.appendChild(kuvake);
    }
    if (sakeet.length) {
      const varssy = polloElementti('p', 'pollo-vihje-varssy');
      for (const sae of sakeet) {
        varssy.appendChild(polloElementti('span', 'pollo-vihje-sae', sae));
      }
      kupla.appendChild(varssy);
    }
    kupla.appendChild(polloElementti('p', 'pollo-vihje-lause', teksti));
    kupla.hidden = false;
    this.asetaVihjeenPaikka();
  }

  /** Kupla napin yläpuolelle, ruudun reunojen sisään. */
  asetaVihjeenPaikka() {
    const kupla = this.vihje;
    if (!kupla || kupla.hidden) return;
    const ikkuna = this.doc.defaultView ?? window;
    // Ankkuri on yleensä pöllönappi; valikkovihjeellä hampurilainen
    // (ks. naytaVihje). Ankkurin alle mentäessä kärki on ylhäällä,
    // joten kupla asemoidaan topilla — bottom ja top nollataan
    // ristiin, koska sama elementti kiertää molemmissa asennoissa.
    const ankkuri = this.vihjeAnkkuri ?? this.nappi;
    const nappi = ankkuri.getBoundingClientRect();
    const leveys = kupla.getBoundingClientRect().width;
    const marginaali = 8;
    const keskitetty = nappi.left + nappi.width / 2 - leveys / 2;
    const vasen = Math.max(marginaali,
      Math.min(keskitetty, (ikkuna.innerWidth || 0) - leveys - marginaali));
    kupla.style.left = `${Math.round(vasen)}px`;
    if (this.vihjeAnkkuri) {
      kupla.style.bottom = '';
      kupla.style.top = `${Math.round(nappi.bottom + 10)}px`;
    } else {
      kupla.style.top = '';
      kupla.style.bottom = `${Math.round((ikkuna.innerHeight || 0) - nappi.top + 10)}px`;
    }
  }

  /** Kupla pois: pelaaja teki valinnan, koski karttaa tai vaihe vaihtui. */
  piilotaVihje() {
    if (!this.vihje) return;
    this.vihje.hidden = true;
  }

  /**
   * Seuraa, milloin lehti aukeaa/sulkeutuu ja milloin alkuteksti
   * väistyy. Kumpikaan ei lähetä omaa tapahtumaansa, joten tila
   * luetaan attribuuteista.
   */
  seuraaNakymaa() {
    const intro = this.doc.getElementById('intro');
    if (typeof MutationObserver !== 'function') return;
    // Sama seuranta kaikille modaaleille, joissa pöllö voi asua
    // (ks. kiinnitysKohde): avautuminen siirtää napin ikkunan sisään,
    // sulkeutuminen palauttaa sen — ja sulkee auki jääneen paneelin,
    // ettei keskustelu jää leijumaan siirtymän päälle.
    for (const id of ['arrival-dialog', 'wiki-dialog', 'nahtavyys-dialog']) {
      const dialogi = this.doc.getElementById(id);
      if (!dialogi) continue;
      new MutationObserver(() => {
        this.kiinnita();
        if (!dialogi.open && this.auki) this.sulje();
      }).observe(dialogi, { attributes: true, attributeFilter: ['open'] });
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
      if (e.key !== 'Escape') return;
      // Kuvapopup on chatin päällä: Esc sulkee ensin sen, ja vasta
      // toinen painallus koskee keskusteluun.
      if (this.kuvapopup) {
        e.preventDefault();
        e.stopPropagation();
        this.suljeKuvapopup();
        return;
      }
      if (!this.auki) return;
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
    // Pöllön paneeli on ponnahdusikkuna siinä missä muutkin: lukija
    // vaikenee (omistajan tilaus 15.8.2026 "eikä pöllö [pysäytä]").
    // Paneeli on oma elementtinsä eikä dialog/postikortti, joten
    // lukija.js:n keskitetty tarkkailija ei näe sitä — kutsu tässä.
    pysaytaLukija();
    // Liuku peittäisi pöllön napin: se väistyy, kun chat aukeaa.
    this.haeUi?.()?.suljeLiuku?.();
    // Keskustelu korvaa vihjeen: kupla ei jää paneelin viereen.
    this.piilotaVihje();
    this.kiinnita();
    this.auki = true;
    // Edellisen vastauksen tyhjä varaus pois ennen kuin paneeli näkyy:
    // avattaessa ehdotukset kelaavat virran pohjaan, ja varauksen kanssa
    // pohjalla olisi pelkkää paperia.
    this.nollaaTyhjaTila();
    this.merkitseAuki(true);
    this.paneeli.hidden = false;
    this.nappi.setAttribute('aria-expanded', 'true');
    this.nappi.classList.add('auki');
    /*
     * PÖLLÖ HERÄTETÄÄN (omistajan tilaus 13.8.2026: *"saisiko pöllölle
     * oman äänen kun hänet 'herättää'"*). Lyhyt "hu" — ks. sound.js
     * 'owl'. Soi joka avauksella, myös nukkuvassa tilassa: linnun
     * herääminen ei riipu siitä, onko välityspalvelin pystyssä.
     */
    sfx.play('owl');
    // Taustaäänimaisema madaltuu lukemisen ajaksi (ks.
    // ambience-stream.js hiljennaAmbienssi). Syy on nimetty, joten
    // samanaikainen lehti ei purkaudu tämän sulkeutuessa.
    hiljennaAmbienssi('pollo');
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
    /*
     * VALMISKYSYMYKSET KESKUSTELUN ALKUUN (omistajan tilaus 18.8.2026):
     * ennen ensimmäistä omaa kysymystä syöterivin yllä on käsin
     * kirjoitettu kysymysvalikko (js/packs/pollo-kysymykset.js), eikä
     * palvelimelta haeta avausehdotuksia — kaksi kilpailevaa
     * ehdotuslistaa olisi yksi liikaa. Kaupungeissa, joille valmiita
     * ei vielä ole kirjoitettu, kaikki toimii täsmälleen kuten ennen.
     */
    if (!this.naytaValmiit()) this.haeEhdotukset();
  }

  sulje() {
    // Naputus katkeaa ENNEN mitään muuta: kesken jäänyt striimi ei saa
    // jäädä naputtamaan suljetun paneelin takana. Kello ei soi, koska
    // vastaus ei valmistunut.
    this.lopetaNaputus();
    // Ambienssi takaisin täyteen voimaansa. Purku tapahtuu kaikilla
    // sulkupoluilla (Esc, ulkopuolinen napautus, lehden sulkeutuminen),
    // koska ne kaikki kulkevat tämän kautta.
    palautaAmbienssi('pollo');
    this.lopetaSanelu();
    this.suljeKuvapopup();
    // Chatin sulkeutuminen hiljentää myös luennan: pöllön ääni ei jää
    // puhumaan tyhjälle kartalle. Vipu jää päälle seuraavaa kertaa
    // varten. peruLuenta tyhjentää myös striimin rinnalla juoksevan
    // jonon — pelkkä pysäytys jättäisi jonoon virkkeitä, jotka
    // heräisivät seuraavasta lausumasta.
    this.peruLuenta();
    if (this.aaniPaalla) pysaytaLukija();
    this.auki = false;
    this.merkitseAuki(false);
    this.paneeli.hidden = true;
    this.nappi.setAttribute('aria-expanded', 'false');
    this.nappi.classList.remove('auki');
  }

  /**
   * Runkoon merkintä auki olevasta keskustelusta.
   *
   * Puhelimella kartan alanappirivi väistyy paneelin ajaksi
   * (css body.pollo-auki .turn-card): paneelin alle jää tarkoituksella
   * rako, josta kartta näkyy, ja siitä raosta kurkkisivat muuten myös
   * napit. Luokka poistetaan aina sulkiessa — myös silloin, kun
   * sulkeminen tulee näkyvyyssäännöstä (paivitaNakyvyys) eikä pelaajalta.
   */
  merkitseAuki(auki) {
    this.doc.body?.classList?.toggle('pollo-auki', Boolean(auki));
  }

  /** Tila, jossa omistaja ei ole vielä ottanut välityspalvelinta käyttöön. */
  naytaNukkuva() {
    this.ehdotukset.hidden = true;
    this.piilotaValmiit();
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
        // Kohdekartan pisteiden nimet: niistä tulee merkintöjen
        // nimiankkurit (js/pollo-haku.js liitaKohdenimet).
        kohdekartat: KAUPUNKIKARTAT,
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

  /* --- kuvapopup nähtävyyslinkeille -------------------------------- */

  /**
   * KEVYT KUVAPOPUP (omistajan tilaus 13.8.2026).
   *
   * Kun pöllön linkki osoittaa nähtävyysjuttuun, jolla on kuva, ei
   * hypätä suoraan koko juttuun: ensin avautuu paperikortti, jossa on
   * pelkkä kuva, jutun oma valmis kuvateksti ja pieni "Avaa juttu"
   * -nappi. Se on vilkaisu, ei lukusessio — ja sen sulkee napauttamalla
   * kortin ulkopuolelle.
   *
   * Linkit muihin kohteisiin (lehtisivut, kuvattomat jutut) avautuvat
   * kuten ennenkin suoraan.
   */
  avaaLinkki(reitti) {
    if (this.avaaKuvapopup(reitti)) return true;
    return this.avaaKohde(reitti);
  }

  /** Nähtävyysjutun ensimmäinen kuva, jos sellainen on. */
  jutunKuva(reitti) {
    if (reitti?.tyyppi !== 'nahtavyys') return null;
    const juttu = NAHTAVYYSJUTUT[reitti.tunniste]?.[reitti.kohde];
    const kuva = juttu?.kuvat?.[0];
    return kuva?.tiedosto ? kuva : null;
  }

  avaaKuvapopup(reitti) {
    const kuva = this.jutunKuva(reitti);
    if (!kuva || !this.reittiAvattavissa(reitti)) return false;
    this.suljeKuvapopup();

    /*
     * POPUP ON OMA MODAALINSA, EI PANEELIN LAPSI.
     *
     * Ensimmäinen versio oli position: fixed -kerros pöllöpaneelin
     * vieressä, ja se asettui ruudun sijasta alanappirivin sisään:
     * rivillä on muunnos (transform), ja muunnettu esivanhempi tekee
     * itsestään kiinteän asemoinnin kiinnityskohdan. Sama ansa on
     * kaikkialla pelissä ratkaistu <dialog>-elementillä, joka elää
     * selaimen ylimmässä kerroksessa — myös silloin kun lehti on auki
     * modaalina allaan.
     */
    const tausta = this.doc.createElement('dialog');
    tausta.className = 'pollo-kuvatausta';
    // Chat jää auki popupin taakse: napautus kortin ulkopuolelle
    // palauttaa keskusteluun eikä sulje sitä (seuraaSulkemista).
    tausta.addEventListener('pointerdown', (e) => e.stopPropagation());
    tausta.addEventListener('click', (e) => {
      if (e.target === tausta) this.suljeKuvapopup();
    });
    // Selaimen oma sulku (Esc) siivoaa elementin samalla tavalla.
    tausta.addEventListener('close', () => {
      tausta.remove();
      if (this.kuvapopup === tausta) this.kuvapopup = null;
    });

    const kortti = polloElementti('figure', 'pollo-kuvakortti');
    const el = this.doc.createElement('img');
    el.className = 'pollo-kuva';
    el.alt = kuva.selite ?? reitti.kohde ?? '';
    el.decoding = 'async';
    el.draggable = false;
    /*
     * 1024 eikä 640 (16.8.2026): popupin kortti sai kasvaa 320:stä
     * 640 pikseliin, ja 640 pikselin lähde olisi tarkan näytön
     * puolikkaalla tarkkuudella. Sama porras on käytössä muissakin
     * suurissa kuvissa (kohdekartta 1000, teoskuva 900–1600).
     */
    asetaKuva(el, valokuvaUrl(kuva.tiedosto, 1024), valokuvaVara(kuva.tiedosto, 1024));
    kortti.appendChild(el);

    // Kuvateksti on jutun oma, valmiiksi kirjoitettu ja tarkistettu.
    if (kuva.selite) kortti.appendChild(polloElementti('figcaption', 'pollo-kuvateksti', kuva.selite));

    const nappi = polloElementti('button', 'pollo-kuvanappi', 'Avaa juttu');
    nappi.type = 'button';
    nappi.addEventListener('click', () => {
      this.suljeKuvapopup();
      this.avaaKohde(reitti);
    });
    kortti.appendChild(nappi);

    tausta.appendChild(kortti);
    this.doc.body.appendChild(tausta);
    this.kuvapopup = tausta;
    try {
      tausta.showModal();
    } catch {
      // Vanha selain ilman modaalitukea: kortti näkyy silti sivulla.
      tausta.setAttribute('open', '');
    }
    nappi.focus?.({ preventScroll: true });
    return true;
  }

  suljeKuvapopup() {
    const tausta = this.kuvapopup;
    this.kuvapopup = null;
    if (!tausta) return;
    try {
      tausta.close();
    } catch {
      /* ei ollut modaalina auki */
    }
    tausta.remove();
  }

  /* --- vastauksen kuva (omistajan tilaus 15.8.2026) ----------------- */

  /*
   * "Olisiko pöllön mahdollista hakea aina yksi kuva per vastaus, joka
   * näkyisi ensin suhteellisen pienenä oikeassa yläreunassa ja jonka
   * voisi klikata sitten auki isommaksi?"
   *
   * Kuva valitaan kahdesta lähteestä tässä järjestyksessä:
   *
   *   1. PELIN OMA AINEISTO. Jos paikallinen haku osui nähtävyysjuttuun,
   *      jolla on kuva, käytetään sitä: kuva on tarkistettu, kuvateksti
   *      valmis ja napautus avaa tutun kuvapopupin "Avaa juttu"
   *      -nappeineen.
   *   2. WIKIPEDIA. Muuten haetaan vastauksen ensimmäisen käsitteen
   *      (tai kysymyksen) artikkelin pääkuva samalla rajapinnalla kuin
   *      Lue lisää -ikkunassa (js/wiki.js). Montaasit, kartat ja logot
   *      karsii sama BAD_IMAGE-suodatin. Napautus avaa kuvan isompana
   *      lähdelinkin kera.
   *
   * Ilman verkkoa tai osumaa vastaus jää kuvattomaksi — se on
   * kelvollinen lopputulos, ei virhe.
   */
  liitaVastausKuva(viesti, teksti, kysymys) {
    // Poletti mitätöi myöhässä valmistuvan haun, jos uusi kysymys on
    // jo lähtenyt (sama malli kuin ehdotuksilla).
    const poletti = (this.vastausKuvaPoletti = (this.vastausKuvaPoletti ?? 0) + 1);
    const oma = this.paikallinenVastausKuva();
    if (oma) {
      this.naytaVastausKuva(viesti, {
        esikatselu: valokuvaUrl(oma.kuva.tiedosto, 320),
        vara: valokuvaVara(oma.kuva.tiedosto, 320),
        seloste: oma.kuva.selite ?? oma.reitti.kohde ?? '',
        avaa: () => this.avaaLinkki(oma.reitti),
      });
      return;
    }
    const aihe = vastauskuvanAihe(teksti, kysymys);
    if (!aihe) return;
    /*
     * PAIKANPITÄJÄ HAUN AJAKSI (omistaja 15.8.2026: "Kuvan voi hakea
     * vaikka sitten vasta kun teksti valmis. Voi olla joku place
     * holder sen aikaa ja animaatio"). Kuvan paikka varautuu heti
     * tekstin valmistuttua sykkivänä laattana; kuva liukuu tilalle
     * saapuessaan, ja tulokseton haku vie laatan hiljaa pois.
     * Aikavahti siivoaa laatan myös jos haku jää roikkumaan.
     */
    const pidike = this.naytaVastausKuvanPidike(viesti);
    const vahti = setTimeout(() => pidike?.remove(), 12000);
    const pois = () => {
      clearTimeout(vahti);
      pidike?.remove();
    };
    // Suora nimi ensin, haku varalle (js/wiki.js): kysymyslause tai
    // taivutettu käsite löytää silti kuvallisen artikkelin.
    haeKuvallinenArtikkeli(aihe).then((summary) => {
      pois();
      if (poletti !== this.vastausKuvaPoletti) return;
      if (!viesti?.isConnected) return;
      if (!summary?.image) return;
      this.naytaVastausKuva(viesti, {
        esikatselu: summary.image,
        seloste: summary.title ?? aihe,
        avaa: () => this.avaaWikiKuva(summary),
      });
    }).catch(() => {
      // Ei yhteyttä — kuvaton vastaus on kelvollinen.
      pois();
    });
  }

  /** Paikallisen haun osumista ensimmäinen, jolla on kuva. */
  paikallinenVastausKuva() {
    for (const katkelma of this.viimeisetKatkelmat ?? []) {
      const reitti = katkelma?.reitti;
      const kuva = this.jutunKuva(reitti);
      if (kuva && this.reittiAvattavissa(reitti)) return { reitti, kuva };
    }
    return null;
  }

  /**
   * Pieni kuva vastauskuplan oikeaan yläkulmaan. Teksti kiertää sen
   * (float), ja napautus avaa ison version. Kuva lisätään vasta valmiin
   * vastauksen renderöintiin, koska striimi kirjoittaa kuplan
   * textContentin yli palasta toiseen.
   */
  /**
   * Sykkivä paikanpitäjä kuvan paikalle haun ajaksi. Sama kelluva
   * paikka kuin valmiilla kuvalla, joten teksti ei nytkähdä kuvan
   * saapuessa. Palauttaa elementin, jonka kutsuja poistaa.
   */
  naytaVastausKuvanPidike(viesti) {
    if (!viesti) return null;
    viesti.querySelector('.pollo-kuvapidike')?.remove();
    const pidike = polloElementti('span', 'pollo-vastauskuva pollo-kuvapidike');
    pidike.setAttribute('aria-hidden', 'true');
    pidike.appendChild(polloElementti('span', 'pollo-kuvapidike-sykli'));
    viesti.insertBefore(pidike, viesti.firstChild);
    this.paivitaTyhjaTila();
    return pidike;
  }

  naytaVastausKuva(viesti, { esikatselu, vara = null, seloste = '', avaa }) {
    if (!viesti || viesti.querySelector('.pollo-vastauskuva:not(.pollo-kuvapidike)')) return;
    viesti.querySelector('.pollo-kuvapidike')?.remove();
    const nappi = polloElementti('button', 'pollo-vastauskuva');
    nappi.type = 'button';
    nappi.title = 'Näytä kuva isompana';
    nappi.setAttribute('aria-label', seloste
      ? `Näytä kuva isompana: ${seloste}` : 'Näytä kuva isompana');
    const el = this.doc.createElement('img');
    el.alt = seloste;
    el.decoding = 'async';
    el.draggable = false;
    // Kuvan latautuminen kasvattaa kuplaa: varattu tyhjä elää mukana,
    // ettei ankkuroitu näkymä nytkähdä.
    el.addEventListener('load', () => this.paivitaTyhjaTila());
    if (vara) asetaKuva(el, esikatselu, vara);
    else el.src = esikatselu;
    nappi.appendChild(el);
    nappi.addEventListener('click', (e) => {
      e.stopPropagation();
      avaa?.();
    });
    viesti.insertBefore(nappi, viesti.firstChild);
    this.paivitaTyhjaTila();
  }

  /**
   * Wikipedian kuva isompana: sama paperikortti kuin nähtävyyksien
   * kuvapopupissa, mutta napin tilalla lähdelinkki artikkeliin —
   * ulkopuolinen kuva ei koskaan esiinny ilman lähdettään.
   */
  avaaWikiKuva(summary) {
    this.suljeKuvapopup();
    const tausta = this.doc.createElement('dialog');
    tausta.className = 'pollo-kuvatausta';
    tausta.addEventListener('pointerdown', (e) => e.stopPropagation());
    tausta.addEventListener('click', (e) => {
      if (e.target === tausta) this.suljeKuvapopup();
    });
    tausta.addEventListener('close', () => {
      tausta.remove();
      if (this.kuvapopup === tausta) this.kuvapopup = null;
    });

    const kortti = polloElementti('figure', 'pollo-kuvakortti');
    const el = this.doc.createElement('img');
    el.className = 'pollo-kuva';
    el.alt = summary.title ?? '';
    el.decoding = 'async';
    el.draggable = false;
    // Suurin ensin, pikkukuva viimeisenä varana (js/wiki.js:n portaat).
    const portaat = suurennusportaat(summary.image);
    let porras = 0;
    el.addEventListener('error', () => {
      porras += 1;
      if (porras < portaat.length) el.src = portaat[porras];
    });
    el.src = portaat[0] ?? summary.image;
    kortti.appendChild(el);

    if (summary.title) {
      kortti.appendChild(polloElementti('figcaption', 'pollo-kuvateksti', summary.title));
    }
    const lahde = polloElementti('a', 'pollo-kuvalahde', `Kuva: Wikipedia — ${summary.title ?? ''}`);
    lahde.href = summary.url ?? '#';
    lahde.target = '_blank';
    lahde.rel = 'noopener noreferrer';
    kortti.appendChild(lahde);

    tausta.appendChild(kortti);
    this.doc.body.appendChild(tausta);
    this.kuvapopup = tausta;
    try {
      tausta.showModal();
    } catch {
      tausta.setAttribute('open', '');
    }
    return true;
  }

  /** Lehden sivunvaihto: sivu 0 on kansi, siksi +1. */
  siirraSivulle(ui, sivuId) {
    if (!sivuId) return;
    const i = (ui.lehtitila?.tutkiSivut ?? []).findIndex((sivu) => sivu?.id === sivuId);
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
        this.avaaLinkki(reitti);
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
    /*
     * Laatikko ei kelaa virtaa. Vieritys on kysy():n asia: näkymä on
     * ankkuroitu kysymykseen, ja jatkot ilmestyvät vastauksen alle
     * varattuun tyhjään — ne eivät saa napata näkymää pohjaan
     * (omistajan reunaehto 13.8.2026).
     */
    this.virta.appendChild(laatikko);
    this.paivitaTyhjaTila();
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
    /*
     * Ankkuroidun vastauksen aikana virta EI kelaa pohjaan: pohja on
     * varattua tyhjää, ja kelaaminen sinne jättäisi ruudulle pelkkää
     * paperia. Uusi rivi (esim. "Ajatus katkesi") kirjoittuu tyhjään
     * kuten vastauskin, eikä näkymä liiku (omistaja 13.8.2026).
     */
    if (this.tyhjaTila === null) this.virta.scrollTop = this.virta.scrollHeight;
    else this.paivitaTyhjaTila();
    return viesti;
  }

  /**
   * TYHJÄ TILA VASTAUKSEN ALLE (omistajan tilaus 13.8.2026).
   *
   * *"Kun pöllö alkaa vastata suoratoistona, niin teksti voisi
   * automaattisesti hypätä yläreunaan ja jättää alle vain tyhjää, jotta
   * ruutu ei hypi jokaisen rivin kohdalla."*
   *
   * Ilman varausta kysymystä ei VOI vierittää yläreunaan: sen alla ei ole
   * vielä mitään, joten vieritys pysähtyy pohjaan. Ankkurointi jäi siksi
   * vajaaksi, ja jokainen uusi rivi antoi sille lisää varaa — näkymä
   * nytkähti alaspäin rivi riviltä koko vastauksen ajan.
   *
   * Virran loppuun asetetaan siis tyhjä lohko, joka on paneelin näkyvän
   * korkeuden mittainen. Kysymys nousee yläreunaan kerralla, ja teksti
   * kirjoittuu valmiiseen tyhjään ilman että vierityskohta muuttuu.
   * Mitta luetaan paneelista eikä kirjoiteta pikselilukuna, jotta se
   * seuraa ruutua, näppäimistöä ja kiertoa.
   *
   * Miksi oma lohko eikä virran padding-bottom: virta on paneelin
   * flex-lapsi, ja täyte on osa sen pienintä mahdollista korkeutta.
   * Satojen pikselien padding työnsi alimman nappirivin paneelin
   * ulkopuolelle, jossa `overflow: hidden` leikkasi sen puoliksi.
   */
  viritaTyhjaTila() {
    const virta = this.virta;
    const tyhja = this.tyhja;
    if (!virta?.style || !tyhja?.style || typeof virta.clientHeight !== 'number') return;
    const korkeus = virta.clientHeight;
    if (!korkeus) return;
    // Lohko kuuluu aina viimeiseksi: kaikki uusi ilmestyy sen yläpuolelle.
    if (virta.lastElementChild !== tyhja) virta.appendChild(tyhja);
    // Sisällön pohja mitataan ilman varausta: siitä lasketaan myöhemmin,
    // paljonko tekstiä on tullut lisää ja paljonko tyhjää on jäljellä.
    tyhja.style.height = '0px';
    this.sisallonPohja = virta.scrollHeight;
    this.tyhjaTila = korkeus;
    // Varauksen katto: tähän asti tyhjä saa kasvaa takaisin, jos sisältö
    // kutistuu (ks. paivitaTyhjaTila). Enempää ei tarvita — ankkurointi
    // on mitoitettu täsmälleen tällä korkeudella.
    this.tyhjanKatto = korkeus;
    tyhja.style.height = `${korkeus}px`;
  }

  /**
   * Teksti syö varattua tyhjää alhaalta.
   *
   * Virran kokonaiskorkeus pysyy samana, kun sisältö kasvaa ja varaus
   * kutistuu saman verran — juuri siksi vierityskohta ei liiku. Kun
   * tyhjä on syöty loppuun, ylivuoto jatkuu näkymän alapuolelle
   * piiloon, kuten omistaja pyysi.
   *
   * VARAUS MYÖS KASVAA TAKAISIN (omistaja 13.8.2026: *"silloin pöllö
   * voisi jättää alareunaan vain tyhjää eikä rullata näkymää ylöspäin
   * täyttääkseen koko ruudun"*). Loppurenderöinnissä sisältö voi käydä
   * pienemmäksi kuin striimin aikana — sama teksti rivittyy toisin, kun
   * käsitteistä tulee linkkejä. Ilman kasvua virran kokonaiskorkeus
   * putoaisi, selain leikkaisi scrollTopin ja näkymä valuisi ylös
   * edellisen vastauksen päälle. Katto on alkuperäinen varaus: sitä
   * suuremmaksi tyhjä ei voi paisua.
   */
  paivitaTyhjaTila() {
    const virta = this.virta;
    const tyhja = this.tyhja;
    if (this.tyhjaTila === null || !virta?.style || !tyhja?.style) return;
    // Jatkokysymykset ja virherivit tulevat vastauksen perään, joten
    // tyhjä siirtyy jälleen viimeiseksi ennen mittausta.
    if (virta.lastElementChild !== tyhja) virta.appendChild(tyhja);
    const sisalto = virta.scrollHeight - this.tyhjaTila;
    const kasvu = sisalto - this.sisallonPohja;
    if (!kasvu) return;
    this.sisallonPohja = sisalto;
    const katto = this.tyhjanKatto ?? this.tyhjaTila;
    this.tyhjaTila = Math.min(katto, Math.max(0, this.tyhjaTila - kasvu));
    tyhja.style.height = `${this.tyhjaTila}px`;
  }

  /**
   * Ajaa muutoksen niin, ettei virran vierityskohta liiku.
   *
   * Loppurenderöinti vaihtaa vastauksen sisällön ja lisää sen perään
   * linkit ja jatkokysymykset. Yksikään noista ei saa siirtää näkymää:
   * kysymys on ankkuroitu paneelin yläreunaan, ja siellä sen kuuluu
   * pysyä myös silloin, kun vastaus on lyhyt eikä täytä ruutua.
   *
   * Pelaajan oma vieritys voittaa yhä: jos hän on liikuttanut virtaa
   * ankkuroinnin jälkeen, kohtaa ei palauteta (sama sääntö kuin
   * seuraaPaneelinKokoa).
   */
  sailytaVieritys(tee) {
    const virta = this.virta;
    const oma = this.odotettuVieritys !== null
      && Math.abs((virta?.scrollTop ?? 0) - this.odotettuVieritys) > 2;
    const ennen = virta?.scrollTop ?? 0;
    tee();
    if (!virta || oma) return;
    if (Math.abs(virta.scrollTop - ennen) > 0.5) virta.scrollTop = ennen;
    this.odotettuVieritys = virta.scrollTop;
  }

  /**
   * Varaus pois.
   *
   * Ei kesken vastauksen: varaus jää voimaan siihen asti, kunnes
   * seuraava kysymys virittää sen uudelleen. Purku tehdään vain
   * tilanteissa, joissa näkymä muutenkin asettuu uudelleen (paneelin
   * avaus) tai joissa pohjaan kelaaminen on oikein (virheilmoitus) —
   * muuten purku itsessään hypäyttäisi näkymää.
   */
  nollaaTyhjaTila() {
    this.tyhjaTila = null;
    this.tyhjanKatto = null;
    this.sisallonPohja = 0;
    this.ankkuriViesti = null;
    this.odotettuVieritys = null;
    if (this.tyhja?.style) this.tyhja.style.height = '0px';
  }

  /**
   * Paneelin koko voi muuttua kesken vastauksen: näppäimistö nousee,
   * puhelin kääntyy. Varaus mitoitetaan silloin uudelleen ja kysymys
   * palautetaan yläreunaan — vanhan korkeuden mittainen tyhjä jättäisi
   * ankkurin väärään kohtaan. Pelaajan oma vieritys voittaa: jos hän on
   * liikuttanut virtaa, näkymään ei kosketa.
   */
  seuraaPaneelinKokoa() {
    if (typeof ResizeObserver !== 'function' || !this.paneeli) return;
    let edellinen = 0;
    this.kokoVahti = new ResizeObserver(() => {
      const korkeus = this.virta?.clientHeight ?? 0;
      if (korkeus === edellinen) return;
      edellinen = korkeus;
      if (this.tyhjaTila === null || !this.ankkuriViesti) return;
      if (this.odotettuVieritys !== null
        && Math.abs(this.virta.scrollTop - this.odotettuVieritys) > 2) return;
      this.viritaTyhjaTila();
      this.ankkuroiYlos(this.ankkuriViesti);
    });
    this.kokoVahti.observe(this.paneeli);
  }

  /**
   * KYSYMYS YLÄREUNAAN — KERRAN (omistajan tilaus 13.8.2026).
   *
   * Näkymä asetetaan yhden kerran, heti kun kysymys on lähtenyt: kysymys
   * paneelin yläreunaan ja sen alle varattua tyhjää (viritaTyhjaTila).
   * Sen jälkeen vieritykseen ei kosketa — ei striimin aikana, ei
   * vastauksen valmistuessa eikä silloin, kun linkit ja jatkokysymykset
   * ilmestyvät sen alle. Teksti täyttää tyhjän ja jatkaa näkymän
   * alapuolelle piiloon; pelaaja vierittää itse jos haluaa.
   *
   * Sama sääntö koskee suoratoistoa ja varapolkua: kumpikin näyttää
   * vastauksen alun samasta kohdasta, joten ruutu käyttäytyy aina
   * samoin riippumatta siitä, tuleeko vastaus palasina vai kerralla.
   *
   * Muutama pikseli jätetään yläpuolelle, jottei rivi liimaudu kiinni
   * reunaan: edellisen viestin häntä kertoo, että ylempänä on lisää.
   */
  ankkuroiYlos(el, pehmuste = 8) {
    const virta = this.virta;
    if (!el?.getBoundingClientRect || !virta?.getBoundingClientRect) return;
    try {
      const ero = el.getBoundingClientRect().top - virta.getBoundingClientRect().top - pehmuste;
      virta.scrollTop += ero;
      this.odotettuVieritys = virta.scrollTop;
    } catch {
      /* asettelua ei ole käytettävissä — ankkurointi jää tekemättä */
    }
  }

  /**
   * Vastausteksti viestin sisään: pöllölinkit omiksi solmuikseen.
   *
   * TURVALLISUUS: mallin tekstiä ei tulkita merkkauksena missään
   * vaiheessa. Käsitteet ovat omia elementtejään ja kaikki teksti
   * asetetaan tekstisisältönä — sama takuu kuin artikkelilinkeissä.
   */
  taytaVastaus(viesti, teksti) {
    /*
     * SISÄLTÖ VAIHTUU YHDELLÄ KUTSULLA, EI TYHJENTÄMÄLLÄ ENSIN.
     *
     * JUURISYY omistajan havaintoon 13.8.2026 (*"kun vastaus on valmis
     * ja tekstiin päivittyy linkit, niin teksti saattaa vierittyä niin
     * että yläreunassa näkyykin vielä edellistä vastausta"*):
     * replaceChildren() ilman argumentteja jätti kuplan hetkeksi
     * TYHJÄKSI. Virran scrollHeight romahti vastauksen korkeuden verran,
     * selain leikkasi scrollTopin uuteen maksimiin — ja kun teksti
     * palasi, vierityskohta oli jo menetetty. Näkymä oli valunut
     * ylöspäin, ja yläreunassa näkyi edellinen vastaus.
     *
     * Solmut rakennetaan siis valmiiksi listaan ja vaihdetaan kerralla:
     * kuplan korkeus ei käy nollassa missään vaiheessa.
     */
    const solmut = [];
    for (const pala of jasennaKasitteet(teksti)) {
      if (!pala.kasite) {
        solmut.push(this.doc.createTextNode(pala.teksti));
        continue;
      }
      const linkki = polloElementti('a', 'pollo-kasitelinkki', pala.teksti);
      linkki.href = '#';
      // Kysymys tehdään perusmuodosta jos putkimerkintä antoi sen —
      // "Kerro lisää: Jeesus" on luontevampi kuin "Kerro lisää: Jeesuksen".
      const aihe = pala.aihe ?? pala.teksti;
      linkki.title = `Kerro lisää: ${aihe}`;
      linkki.addEventListener('click', (e) => {
        e.preventDefault();
        this.kysy(`Kerro lisää: ${aihe}`);
      });
      solmut.push(linkki);
    }
    viesti.replaceChildren(...solmut);
    return viesti;
  }

  /** Kevyt jarru: yksi pyyntö kerrallaan. */
  asetaKesken(kesken) {
    this.kesken = kesken;
    this.kentta.disabled = kesken;
    this.laheta.disabled = kesken;
    this.mikki.disabled = kesken;
    /*
     * Paneelin odotustila on OMA luokkansa (omistaja 13.8.2026:
     * *"saisiko strimitekstin ilman kursiivia"*). Tässä oli aiemmin
     * .pollo-odottaa — sama nimi kuin "Pöllö miettii…" -kuplalla — ja
     * sen kursiivi ja himmeä muste periytyivät paneelista koko
     * striimattuun vastaukseen. Teksti kirjoittui siis kursiivilla ja
     * suoristui vasta valmistuessaan.
     */
    this.paneeli.classList.toggle('pollo-kesken', kesken);
    for (const nappi of this.ehdotukset.querySelectorAll('button')) {
      nappi.disabled = kesken;
    }
    // Vastausten alla olevat jatkokysymykset ovat samaa jarrua.
    for (const nappi of this.virta.querySelectorAll('.pollo-jatko')) {
      nappi.disabled = kesken;
    }
    // Samoin valmiskysymysten alue — se on yleensä jo piilossa, kun
    // pyyntö on käynnissä, mutta jarru ei nojaa siihen.
    for (const nappi of this.valmiit?.querySelectorAll('button') ?? []) {
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
      headers: this.otsakkeet(),
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

  /**
   * Pyynnön otsakkeet.
   *
   * Kehittäjäkoodi mukaan vain jos se on laitteelle talletettu. Ilman
   * koodia otsaketta ei lähetetä lainkaan, ja ilman workerin salaisuutta
   * se ei tekisi mitään vaikka lähetettäisiinkin.
   */
  otsakkeet(lisat = {}) {
    const ulos = { 'content-type': 'application/json', ...lisat };
    const koodi = polloAsetus(POLLO_KEHITTAJAKOODI_AVAIN).trim();
    if (koodi) ulos[POLLO_KEHITTAJA_OTSAKE] = koodi;
    return ulos;
  }

  /**
   * SUORATOISTETTU VASTAUS (omistajan tilaus 13.8.2026).
   *
   * Sama pyyntö kuin ennen, mutta lippu `striimi` päällä. Palvelin
   * vastaa SSE-virralla, jossa on kolme tapahtumaa: `pala` (näytettävä
   * lisä), `loppu` (koko vastaus ja jatkokysymykset) ja `virhe`.
   * JATKOT-lohkoa ei tule paloissa koskaan — worker pidättää sen
   * (tools/pollo/rajat.js luoJatkoSuodatin).
   *
   * VARAPOLKU. Jos palvelin vastaa tavallisella JSONilla — vanha
   * worker, välityspalvelin joka ei osaa virtoja — vastaus luetaan
   * sellaisenaan EIKÄ kysytä uudelleen: pyyntö on jo laskettu rajaan.
   *
   * @returns {Promise<{vastaus: string, jatkot: string[], katkesi: boolean}>}
   */
  async pyydaStriimi(runko, onPala) {
    const vastaus = await fetch(this.palvelin, {
      method: 'POST',
      headers: this.otsakkeet({ accept: 'text/event-stream' }),
      body: JSON.stringify({ ...runko, striimi: true }),
    });
    if (!vastaus.ok) {
      const data = await vastaus.json().catch(() => ({}));
      const virhe = new Error(data?.virhe ?? 'virhe');
      virhe.viesti = data?.viesti ?? null;
      throw virhe;
    }
    const laji = vastaus.headers?.get?.('content-type') ?? '';
    if (!/text\/event-stream/i.test(laji) || typeof vastaus.body?.getReader !== 'function') {
      const data = await vastaus.json().catch(() => ({}));
      return {
        vastaus: String(data?.vastaus ?? ''),
        jatkot: Array.isArray(data?.jatkot) ? data.jatkot : [],
        katkesi: false,
      };
    }

    const lukija = vastaus.body.getReader();
    const purkaja = new TextDecoder();
    let jono = '';
    let kertynyt = '';
    let tulos = null;
    let katkesi = false;
    for (;;) {
      // eslint-disable-next-line no-await-in-loop
      const { value, done } = await lukija.read();
      if (done) break;
      jono += purkaja.decode(value, { stream: true });
      let raja = jono.indexOf('\n\n');
      while (raja >= 0) {
        const tapahtuma = polloTapahtuma(jono.slice(0, raja));
        jono = jono.slice(raja + 2);
        raja = jono.indexOf('\n\n');
        if (!tapahtuma) continue;
        if (tapahtuma.laji === 'pala') {
          const teksti = String(tapahtuma.data?.teksti ?? '');
          if (teksti) {
            kertynyt += teksti;
            onPala?.(kertynyt);
          }
        } else if (tapahtuma.laji === 'loppu') {
          tulos = tapahtuma.data;
        } else if (tapahtuma.laji === 'virhe') {
          katkesi = true;
        }
      }
    }
    if (tulos?.vastaus) {
      /*
       * LOPULLINEN TEKSTI TULEE AINA loppu-TAPAHTUMASTA.
       *
       * Vain siinä käsitemerkinnät ovat ehjinä: paloista kasattu teksti
       * on voinut katketa keskeltä merkintää ("[[Wolfgang Amadeus" |
       * " Mozart]]"), ja rikkinäisestä merkinnästä ei synny linkkiä.
       * `lopullinen` kertoo kutsujalle, kelpaako teksti linkkien
       * jäsentämiseen (ks. kysy).
       */
      return {
        vastaus: String(tulos.vastaus),
        jatkot: Array.isArray(tulos.jatkot) ? tulos.jatkot : [],
        katkesi: false,
        lopullinen: true,
      };
    }
    // Virta loppui kesken: näytetään se, mitä ehti tulla — mutta ilman
    // linkkejä, koska merkinnöistä ei ole takeita.
    return { vastaus: kertynyt, jatkot: [], katkesi: true, lopullinen: false };
  }

  /* --- striimin äänet ---------------------------------------------- */

  /**
   * Naputus käyntiin (ks. NAPUTUS_MIN_MS ja sen yllä oleva selitys).
   *
   * Ajastin ketjuttaa itsensä eikä käytä setIntervalia: väli arvotaan
   * joka lyönnille erikseen, ja tasavälinen tahti kuulostaisi koneelta
   * eikä kirjoittajalta. Toinen kutsu ei käynnistä toista silmukkaa.
   */
  aloitaNaputus() {
    if (this.naputusAjastin !== null) return;
    // Sanelun aikana mikrofoni kuuntelee huonetta: naputus menisi
    // suoraan tunnistukseen. Tähän ei pitäisi päästä (asetaKesken estää
    // mikin), mutta ehto on halpa ja virhe olisi kallis.
    if (this.tunnistin || this.natiiviSanelussa) return;
    this.naputuksia = 0;
    const lyo = () => {
      // Mykistys tarkistuu sfx.play():n sisällä (SoundKit.enabled), joten
      // äänet pois -asetus vaientaa naputuksen samalla tavalla kuin
      // kaikki muutkin tehosteet.
      sfx.play('pen', {
        voima: this.naputusVaimeana ? NAPUTUS_VOIMA_PUHEEN_ALLA : NAPUTUS_VOIMA,
      });
      this.naputuksia += 1;
      const hengahdys = this.naputuksia % NAPUTUS_TAUKO_VALI === 0 ? NAPUTUS_TAUKO_MS : 0;
      const vali = NAPUTUS_MIN_MS + Math.random() * (NAPUTUS_MAX_MS - NAPUTUS_MIN_MS);
      this.naputusAjastin = setTimeout(lyo, vali + hengahdys);
    };
    lyo();
  }

  /**
   * Naputus poikki.
   *
   * Kutsutaan JOKAISESTA polusta, joka lopettaa striimin: valmis
   * vastaus, virhe ja paneelin sulkeminen kesken vastauksen. Naputus ei
   * saa jäädä soimaan suljetun paneelin taakse, joten tämä on myös
   * sulje():n ensimmäisiä tehtäviä.
   */
  lopetaNaputus() {
    this.naputusVaimeana = false;
    if (this.naputusAjastin === null) return;
    clearTimeout(this.naputusAjastin);
    this.naputusAjastin = null;
  }

  /* --- luenta striimin rinnalla ------------------------------------ */

  /**
   * Syöttää striimistä luennalle sen, mikä on valmista.
   *
   * Kutsutaan joka palasta. Luenta käynnistyy laiskasti ensimmäisestä
   * kokonaisesta virkkeestä — ei pyynnön lähtiessä, koska silloin ei ole
   * vielä mitään luettavaa.
   *
   * KAIUTIN KESKEN STRIIMIN: jos vipu kytketään päälle vastauksen
   * aikana, luenta alkaa siitä tekstistä, joka on jo saapunut, ja jatkaa
   * virtaan. Näin kuunneltava vastaus on aina KOKO vastaus — sama lupaus
   * kuin ei-striimatussa polussa, jossa kaiutin lukee tekstin alusta.
   * `luettuun` on nolla siihen asti kun luenta alkaa, joten alku tulee
   * mukaan itsestään.
   *
   * @returns {boolean} kuuluuko puhetta juuri nyt
   */
  syotaLuennalle(kertynyt) {
    if (!this.aaniPaalla) return false;
    if (!this.luentaVirta) {
      // Virtaluenta kulkee ensisijaisesti lukijaäänellä (js/puhe.js),
      // joka toimii myös iOS-kuoressa. Ilman sitä ja ilman selaimen
      // puhesyntetisaattoria (natiivisilta) virtaluentaa ei ole:
      // vastaus luetaan valmiina, kuten ennenkin.
      try {
        this.luentaVirta = lueVirtana(null, { persoona: 'pollo' });
      } catch {
        this.luentaVirta = null;
      }
      if (!this.luentaVirta) return false;
    }
    const raja = luettavaRaja(kertynyt);
    if (raja > this.luettuun) {
      const pala = poistaKasiteMerkinnat(kertynyt.slice(this.luettuun, raja)).trim();
      this.luettuun = raja;
      if (pala) this.luentaVirta.lisaa(pala);
    }
    return true;
  }

  /**
   * Striimin loppu luennalle: viimeinen vajaa virke ja päätös.
   *
   * Jatkokysymyksiä ei lueta koskaan — ne ovat käyttöliittymää, eivät
   * pöllön puhetta — eikä palvelin edes lähetä JATKOT-lohkoa
   * pala-tapahtumissa (tools/pollo/rajat.js).
   *
   * @returns {boolean} hoitiko virtaluenta tämän vastauksen
   */
  paataLuenta(kertynyt) {
    const virta = this.luentaVirta;
    const mihin = this.luettuun;
    this.luentaVirta = null;
    this.luettuun = 0;
    if (!virta) return false;
    const hanta = poistaKasiteMerkinnat(String(kertynyt ?? '').slice(mihin)).trim();
    if (hanta) virta.lisaa(hanta);
    virta.paata();
    return true;
  }

  /** Kesken jäänyt virtaluenta pois (sulku, virhe, kaiutin pois). */
  peruLuenta() {
    if (!this.luentaVirta) return;
    this.luentaVirta = null;
    this.luettuun = 0;
    pysaytaLukija();
  }

  async haeEhdotukset() {
    if (this.kesken || !this.palvelin) return;
    this.ehdotukset.replaceChildren();
    this.ehdotukset.hidden = true;
    /*
     * Ehdotushaku EI lukitse syöteriviä (omistaja 13.8.2026: "saisiko
     * pöllön mikrofonin käyttöön heti? Nyt se odottaa muutaman
     * sekunnin ennen kuin esimerkkikysymykset valmistuvat"). Ehdotukset
     * ovat lisuke — mikki, näppäimistö ja lähetys toimivat heti, ja
     * pelaajan oma kysymys ohittaa haun. Poletti mitätöi haun, jos
     * kysymys ehtii ensin: myöhässä saapuvat ehdotukset eivät saa
     * putkahtaa uuden keskustelun päälle (kysy kasvattaa polettia).
     */
    const poletti = (this.ehdotusPoletti = (this.ehdotusPoletti ?? 0) + 1);
    try {
      const data = await this.pyyda({ tehtava: 'ehdotukset', konteksti: this.konteksti() });
      if (poletti !== this.ehdotusPoletti || this.kesken) return;
      this.naytaEhdotukset(Array.isArray(data?.ehdotukset) ? data.ehdotukset : []);
    } catch {
      // Ehdotukset ovat lisä, eivät välttämättömiä: jos ne eivät tule,
      // sanelu ja kirjoituskenttä riittävät eikä pelaajalle valiteta.
      this.ehdotukset.hidden = true;
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
    // Kesken oleva ehdotushaku mitätöidään: pelaajan kysymys voittaa,
    // eivätkä myöhässä valmistuvat ehdotukset putkahda vastauksen alle.
    this.ehdotusPoletti = (this.ehdotusPoletti ?? 0) + 1;
    this.kentta.value = '';
    // Tilarivi tyhjenee: kysymys on jo keskustelussa, eikä sanelun
    // väliaikainen teksti saa jäädä vastauksen alle.
    this.saneluTila.textContent = '';
    this.ehdotukset.replaceChildren();
    this.ehdotukset.hidden = true;
    // Valmiskysymykset koskevat vain keskustelun alkua: ensimmäinen
    // kysymys — oma tai valittu — vie ne pois, ja vastauksen alle
    // tulevat dynaamiset jatkokysymykset (naytaJatkot).
    this.piilotaValmiit();
    // Vanhat jatkokysymykset pois virrasta: ehdotuksia näkyy vain
    // tuoreimman vastauksen alla, muuten ne kasautuvat pinoksi
    // (omistajan huomio 13.8.2026).
    for (const vanha of this.virta.querySelectorAll('.pollo-jatkot')) vanha.remove();
    this.suljeKuvapopup();
    // Edellisen vastauksen varaus pois, jotta kysymys ja "Pöllö miettii…"
    // kelaavat vielä pohjaan — uusi varaus viritetään heti perään.
    this.nollaaTyhjaTila();
    const kysymysViesti = this.lisaaViesti('kayttaja', kysymys);
    const odotus = this.lisaaViesti('odottaa', 'Pöllö miettii…');
    this.asetaKesken(true);
    this.viimeisetKatkelmat = [];
    /*
     * Näkymä asetetaan tässä, kerran: alle varataan paneelin korkeuden
     * verran tyhjää ja kysymys nostetaan yläreunaan. Loppu vastauksesta
     * — striimin palat, linkit ja jatkokysymykset — kirjoittuu tuohon
     * tyhjään, eikä vierityskohta enää muutu.
     */
    this.ankkuriViesti = kysymysViesti;
    this.viritaTyhjaTila();
    this.ankkuroiYlos(kysymysViesti);
    const runko = {
      tehtava: 'vastaus',
      kysymys,
      konteksti: this.konteksti(kysymys),
      historia: this.historia.slice(-HISTORIAN_KATTO),
    };
    /*
     * Vastauskupla syntyy vasta ensimmäisestä palasta: siihen asti
     * ruudulla on "Pöllö miettii…". Kupla luodaan tyhjänä, ja striimin
     * teksti kirjoitetaan siihen suodatettuna (hakasulkeet pois).
     */
    let viesti = null;
    const avaaKupla = () => {
      if (viesti) return viesti;
      odotus.remove();
      viesti = this.lisaaViesti('pollo', '');
      return viesti;
    };
    try {
      let tulos = null;
      let striimattiin = false;
      // Viimeisin kertymä talteen: striimin loppu luetaan siitä eikä
      // loppu-tapahtuman tekstistä, jottei jo luettua toisteta.
      let kertyma = '';
      if (polloStriimiTuettu()) {
        striimattiin = true;
        tulos = await this.pyydaStriimi(runko, (kertynyt) => {
          kertyma = kertynyt;
          /*
           * PUHE JA NAPUTUS SOIVAT KERROKSINA (omistajan tarkennus
           * 13.8.2026 ilta: "pöllön kirjoituskone ei kuulu" — aiempi
           * linja hiljensi naputuksen kokonaan luennan ajaksi). Puheen
           * alla naputus soi vaimeana taustana, ilman puhetta täydellä
           * taustavoimallaan. Kello soi valmistuessa kuten ennenkin.
           */
          this.naputusVaimeana = this.syotaLuennalle(kertynyt);
          // Naputus alkaa ENSIMMÄISESTÄ palasta eikä pyynnön
          // lähtiessä: kirjoituskone ei naputa tyhjää paperia.
          this.aloitaNaputus();
          avaaKupla().textContent = poistaKasiteMerkinnat(kertynyt);
          // Näkymä on jo ankkuroitu: uusi teksti syö varattua tyhjää
          // alhaalta, joten virran vierityskohta ei muutu riviäkään.
          this.paivitaTyhjaTila();
        });
      } else {
        /*
         * VARAPOLKU: vastaus tulee kerralla. Naputusta ei soiteta —
         * mitään ei kirjoiteta vähitellen, joten naputus olisi valhe.
         */
        const data = await this.pyyda(runko);
        tulos = {
          vastaus: String(data?.vastaus ?? ''),
          jatkot: Array.isArray(data?.jatkot) ? data.jatkot : [],
          katkesi: false,
          lopullinen: true,
        };
      }
      // Naputus loppuu ennen kelloa, ei sen kanssa päällekkäin.
      this.lopetaNaputus();
      const raaka = String(tulos?.vastaus ?? '').trim();
      // Katkennutkin virta näyttää sen, mitä ehti tulla.
      const teksti = raaka || (tulos?.katkesi ? '' : 'En osaa vastata tähän.');
      avaaKupla();
      /*
       * LOPULLINEN SISÄLTÖ RAKENNETAAN KERRALLA JA PAIKALLAAN.
       *
       * Järjestys: ensin vastausteksti pöllölinkkeineen, sitten
       * artikkelilinkit tekstin sisään, viimeisenä jatkokysymykset.
       * Luenta saa VAIN vastaustekstin — linkit ja jatkot ovat
       * käyttöliittymää.
       *
       * Linkit jäsennetään VAIN lopullisesta tekstistä (tulos.lopullinen
       * eli loppu-tapahtuman koko vastaus). Katkenneessa virrassa on
       * jäljellä pelkkä paloista kasattu teksti, jonka merkinnät ovat
       * voineet katketa palarajalle — siitä tehty linkki osoittaisi
       * puolikkaaseen käsitteeseen. Silloin teksti näytetään
       * sellaisenaan, ja se on hyväksyttävä vikasieto.
       *
       * Koko loppurenderöinti ajetaan sailytaVierityksen sisällä:
       * kysymys pysyy paneelin yläreunassa myös lyhyellä vastauksella,
       * jonka linkit ja jatkokysymykset kasvattavat sisältöä.
       */
      const linkitetaan = tulos?.lopullinen !== false;
      this.sailytaVieritys(() => {
        if (linkitetaan) {
          this.taytaVastaus(viesti, teksti);
          this.korostaLinkit(viesti, this.poimiLinkit(this.viimeisetKatkelmat));
        } else {
          viesti.textContent = poistaKasiteMerkinnat(teksti);
        }
        if (tulos?.katkesi) {
          this.lisaaViesti('virherivi', 'Ajatus katkesi kesken lauseen.');
        } else {
          // Jatkokysymykset tulevat aina tuoreesta loppu-tapahtumasta:
          // vanhat poistettiin jo kysymystä lähetettäessä, joten
          // vastauksen alla on vain sitä koskevat ehdotukset.
          this.naytaJatkot(tulos?.jatkot);
        }
        // Kuva vastauksen oikeaan yläkulmaan (omistajan tilaus
        // 15.8.2026). Paikallinen kuva tulee heti; Wikipedian haku
        // valmistuu omaan tahtiinsa eikä koske näkymän ankkuriin.
        this.liitaVastausKuva(viesti, teksti, kysymys);
        /*
         * Näkymään ei kosketa: ankkuri asetettiin kysymyksen kohdalla.
         * Valmis vastaus, sen linkit ja jatkokysymykset kirjoittuvat
         * varattuun tyhjään — sama sääntö striimissä ja varapolussa.
         */
        this.paivitaTyhjaTila();
      });
      /*
       * RIVINVAIHTOKELLO (omistajan tilaus 13.8.2026). Vain onnistuneen
       * suoratoiston päätteeksi: varapolussa mitään ei kirjoitettu, eikä
       * katkennut ajatus ansaitse valmiin rivin kilahdusta.
       */
      if (striimattiin && !tulos?.katkesi) sfx.play('typeBell');
      const puhdas = poistaKasiteMerkinnat(teksti);
      /*
       * LUENTA. Striimissä se on jo käynnissä ja tarvitsee vain lopun
       * (paataLuenta lukee viimeisen vajaan virkkeen ja päättää jonon).
       * Muuten — varapolku, kaiutin pois päältä koko striimin ajan,
       * laite ilman selaimen puhesyntetisaattoria — luetaan valmis
       * vastaus entiseen tapaan.
       */
      if (!this.paataLuenta(kertyma)) this.lueVastaus(puhdas);
      this.historia.push({ rooli: 'kayttaja', teksti: kysymys });
      this.historia.push({ rooli: 'pollo', teksti: puhdas });
      this.historia = this.historia.slice(-HISTORIAN_KATTO);
    } catch (virhe) {
      // Virhe katkaisee naputuksen ja kesken jääneen luennan heti eikä
      // soita kelloa.
      this.lopetaNaputus();
      this.peruLuenta();
      odotus.remove();
      // Virheilmoitus on yksi rivi: varaus puretaan, jotta se kelaa
      // pohjaan kuten ennenkin eikä jää tyhjän yläpuolelle.
      this.nollaaTyhjaTila();
      this.lisaaViesti('pollo', virhe?.viesti
        ?? 'Pöllö ei saanut ajatuksesta kiinni. Yritä hetken päästä uudelleen.');
    } finally {
      // Vikaverkko: mikään polku ei saa jättää naputusta soimaan.
      this.lopetaNaputus();
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
    // Uusi napautus saa taas yhden hiljaisen uusinnan (saneluVirhe).
    this.saneluUusittu = false;
    this.aloitaSanelu();
  }

  /**
   * Mikkinapin ulkoasu: kuunteleva vai lepäävä.
   *
   * SANELUTILALLA ON OMA SISÄLTÖNSÄ (omistajan tilaus 13.8.2026).
   * Kuunnellessaan nappi näyttää pysäytysneliön ja sanan "Lopeta" — se
   * on sekä tilan merkki että ohje siitä, mitä napautus nyt tekee.
   * Lepotilassa nappi on entisellään pelkkä mikrofoni. Saavutettava
   * nimi seuraa mukana, koska sen kertoma toiminto vaihtuu.
   */
  merkitseMikki(kuuntelee) {
    const paalla = Boolean(kuuntelee);
    this.mikki.classList.toggle('kuuntelee', paalla);
    this.mikki.setAttribute('aria-pressed', paalla ? 'true' : 'false');
    const nimi = paalla ? 'Lopeta sanelu' : 'Kysy ääneen';
    this.mikki.setAttribute('aria-label', nimi);
    this.mikki.title = nimi;
    const ikoni = polloElementti('span', 'icon-glyph viiva-ikoni');
    // Kuvake on tämän tiedoston oma vakio, ei koskaan mallin tai
    // aineiston tekstiä — merkkaus tulee vain täältä.
    ikoni.innerHTML = paalla ? PYSAYTYS_IKONI : MIKKI_IKONI;
    this.mikki.replaceChildren(ikoni);
    if (paalla) this.mikki.appendChild(polloElementti('span', 'pollo-mikki-teksti', 'Lopeta'));
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
    this.saneluTila.textContent = SANELU_KAYNNISTYY;

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

    // Sama kova äänitauko kuin selainsanelussa: myös WKWebView:n sivun
    // äänet pitävät sovelluksen äänisessiota toistotilassa.
    taukoaSanelunAjaksi();

    const kuuntele = (laji, kuulija) => {
      const purku = natiivi.kuuntele?.(laji, kuulija);
      if (typeof purku === 'function') this.saneluKuulijat.push(purku);
    };
    kuuntele('sanelu-alkoi', () => {
      // Moottori pyörii ja kaappaus on käynnissä — nyt kuunnellaan.
      if (!this.puhuttu.trim()) this.saneluTila.textContent = SANELU_KUUNTELEE;
    });
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

  /** Natiivisanelu kiinni: kuulijat pois, äänet takaisin ja mikki lepoon. */
  paataNatiiviSanelu() {
    jatkaSanelunJalkeen();
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
    /*
     * Edellinen tunnistin puretaan AINA ennen uutta (omistajan iPad
     * 13.8.2026: "mikrofonia ei löydy vaikka lupa on annettu ja
     * aiemmin toimi" — ja tilapalkin mikkimerkki paloi yhä). Jumiin
     * jäänyt istunto pitää mikrofonia hallussaan, ja seuraava start
     * kaatuu audio-captureen niin kauan kuin vanha elää.
     */
    if (this.tunnistin) {
      const vanha = this.tunnistin;
      this.tunnistin = null;
      try {
        vanha.abort();
      } catch {
        /* oli jo pysähtynyt */
      }
    }
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
    tunnistin.onaudiostart = () => {
      // Äänen kaappaus alkoi oikeasti — vasta nyt "Kuuntelen…".
      if (this.tunnistin === tunnistin && !this.puhuttu.trim()) {
        this.saneluTila.textContent = SANELU_KUUNTELEE;
      }
    };
    tunnistin.onerror = (tapahtuma) => this.saneluVirhe(tapahtuma?.error);
    tunnistin.onend = () => {
      // Äänet takaisin heti kun mikrofoni on vapaa (ks. kova äänitauko).
      this.suljeMikkiKanava();
      jatkaSanelunJalkeen();
      const oliTunnistin = this.tunnistin;
      this.tunnistin = null;
      this.merkitseMikki(false);
      if (!oliTunnistin) return;
      const teksti = this.puhuttu.trim();
      if (teksti) this.kysy(teksti);
      else if (this.saneluTila.textContent === SANELU_KUUNTELEE
        || this.saneluTila.textContent === SANELU_KAYNNISTYY) {
        this.saneluTila.textContent = 'En kuullut mitään. Yritä uudelleen.';
      }
    };
    this.tunnistin = tunnistin;
    this.merkitseMikki(true);
    this.saneluTila.textContent = SANELU_KAYNNISTYY;
    /*
     * KOVA ÄÄNITAUKO ENNEN STARTTIA (omistajan havainto 13.8.2026:
     * "mikrofonia ei löydy" myös kylmäkäynnistyksen jälkeen). iOS:n
     * WebKit ei aloita kaappausta, jos sivun äänisessio on toistossa —
     * ja v614:stä alkaen huhuilu herättää äänipiirin heti paneelin
     * avautuessa. Ambienssi oikeasti tauolle ja konteksti kylmäksi;
     * palautus onendissä ja virhepolussa.
     */
    taukoaSanelunAjaksi();
    /*
     * MIKROFONIKANAVAN ESIAVAUS UUSINNALLA. Jos ensimmäinen start
     * kaatui audio-captureen (saneluVirhe), uusintayritys avaa ensin
     * oikean mikrofonivirran getUserMedialla: iOS siirtää äänisession
     * äänitystilaan vasta virrasta, ja tunnistuksen oma kaappaus
     * pääsee sen jälkeen käyntiin. Virta pidetään auki tunnistuksen
     * ajan ja suljetaan lopussa (sama sivu saa molemmat).
     */
    const kaynnista = () => {
      try {
        // Mikrofonilupa kysytään vasta tästä — ei paneelia avattaessa.
        tunnistin.start();
      } catch {
        this.tunnistin = null;
        this.merkitseMikki(false);
        this.saneluTila.textContent = 'Sanelu ei käynnisty juuri nyt.';
        this.suljeMikkiKanava();
        jatkaSanelunJalkeen();
      }
    };
    if (this.saneluUusittu && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((virta) => {
        if (this.tunnistin !== tunnistin) {
          for (const raide of virta.getTracks()) raide.stop();
          return;
        }
        this.mikkiKanava = virta;
        kaynnista();
      }, () => kaynnista());
      return;
    }
    kaynnista();
  }

  /** Esiavattu mikrofonivirta kiinni (ks. aloitaSanelu). */
  suljeMikkiKanava() {
    const virta = this.mikkiKanava;
    this.mikkiKanava = null;
    if (!virta) return;
    try {
      for (const raide of virta.getTracks()) raide.stop();
    } catch {
      /* virta oli jo suljettu */
    }
  }

  /**
   * Mikrofonin vianetsintärivi (ks. saneluVirhe audio-capture).
   * Suomeksi ja tiiviisti — tämä näkyy pelaajalle asti, mutta vain
   * kun sanelu on jo kahdesti epäonnistunut.
   */
  async keraaMikkiDiagnoosi() {
    const osat = [];
    try {
      const laitteet = await navigator.mediaDevices?.enumerateDevices?.() ?? [];
      osat.push(`laitteita ${laitteet.filter((l) => l.kind === 'audioinput').length}`);
    } catch {
      osat.push('laitteita ?');
    }
    try {
      const virta = await navigator.mediaDevices.getUserMedia({ audio: true });
      for (const raide of virta.getTracks()) raide.stop();
      osat.push('virta ok');
    } catch (virhe) {
      osat.push(`virta ${virhe?.name ?? 'virhe'}`);
    }
    osat.push(window.matchMedia?.('(display-mode: standalone)')?.matches
      ? 'kotivalikko' : 'selain');
    return osat.join(', ');
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
    this.merkitseMikki(false);
    if (!laheta) {
      /*
       * Lähettämätön lopetus vapauttaa mikrofonin HETI: stop() jää
       * odottamaan lopputulosta ja voi iOS:lla jättää istunnon
       * roikkumaan (mikkimerkki paloi tilapalkissa ja seuraava
       * käynnistys kaatui audio-captureen). Abortilta ei odoteta
       * mitään — siksi se on tässä oikea työkalu.
       */
      this.tunnistin = null;
      this.suljeMikkiKanava();
      try {
        tunnistin.abort();
      } catch {
        /* tunnistin oli jo pysähtynyt */
      }
      return;
    }
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
    // Äänet takaisin ja esiavattu virta kiinni joka virhepolussa.
    this.suljeMikkiKanava();
    jatkaSanelunJalkeen();
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
      /*
       * iOS voi hylätä kaappauksen hetkellisesti, kun edellinen
       * äänisessio on vasta vapautumassa. Uusinta tehdään kerran —
       * ja uusinnalla mikrofonikanava ESIAVATAAN getUserMedialla
       * (aloitaSanelu): oikea mikrofonivirta pakottaa iOS:n
       * äänisession äänitystilaan, jolloin tunnistuksen oma kaappaus
       * pääsee käyntiin. Lippu nollataan mikkinapin napautuksessa.
       */
      if (!this.saneluUusittu) {
        this.saneluUusittu = true;
        setTimeout(() => {
          if (this.auki && this.tila === 'sanelu' && !this.tunnistin) this.aloitaSanelu();
        }, 400);
        return;
      }
      /*
       * Toinen peräkkäinen epäonnistuminen: kerätään pelaajan ruudulle
       * diagnoosi (omistajan iPhonella vika jatkui v623:ssa asti eikä
       * konsolia ole käytettävissä). Rivistä näkee suoraan, missä
       * kerroksessa vika on: saako sivu ylipäätään mikrofonivirran,
       * näkyykö äänilaitteita, ja ollaanko kotivalikkosovelluksessa.
       */
      this.saneluTila.textContent = 'Mikrofonia ei löytynyt…';
      this.keraaMikkiDiagnoosi().then((diagnoosi) => {
        this.saneluTila.textContent = `Mikrofonia ei löytynyt (${diagnoosi}).`;
      });
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
 * Näyttää pöllönapin vieressä kiinteän vihjekuplan (js/ui.js
 * paivitaValintavihje). Ei tekoälykutsua eikä keskustelun avausta —
 * pelkkä lause siitä, mitä pelaajalta odotetaan.
 *
 * @param {string} [kohde] 'valikko' ankkuroi kuplan hampurilaisnappiin
 *   kärki ylöspäin — kupla osoittaa sinne, mistä kutsuttu toiminto
 *   löytyy (omistaja 18.8.2026 ehdotuskutsusta: "Infokyltti pitäisi
 *   osoittaa hampurilaiseen").
 */
export function polloVihje(teksti, kohde) {
  nykyinenPollo?.naytaVihje(teksti, kohde);
}

/**
 * Emon onnittelukupla tietäjätason noususta (js/ui.js
 * naytaTietajaNousut): iso avatar, värssy ja onnittelulause samassa
 * kuplassa. Sama kupla kuin vihjeellä, juhlavassa asussa.
 */
export function polloOnnittelu(sisalto) {
  nykyinenPollo?.naytaOnnittelu(sisalto);
}

/** Vihjekupla pois. */
export function polloVihjePois() {
  nykyinenPollo?.piilotaVihje();
}

/**
 * Näkyvyys uudelleen arvioitavaksi. Pöllö on aarre, joten napin
 * näkyminen riippuu pelin tilasta (game.polloLoydetty) — ja se voi
 * vaihtua kesken istunnon kahdesta syystä: uusi peli piilottaa pöllön
 * (js/ui.js mount) ja ensimmäinen laatta löytää sen (playTokenReveal).
 *
 * @param {boolean} korosta pieni ilmestymisliike (löytöhetki).
 */
export function polloPaivitaNakyvyys(korosta = false) {
  nykyinenPollo?.paivitaNakyvyys(korosta);
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
