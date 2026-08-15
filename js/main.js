// Käynnistys: aloitusruutu, pelin luonti, tallennus ja dialogit.

import { MUUTOKSET } from './muutokset.js';
import { Game } from './game.js';
import { UI, kehittajaTilaPaalla, asetaKehittajaTila } from './ui.js';
import { sfx } from './sound.js';
import { packById } from './pack.js';
import { startQuizMusic, stopPlaceStream, stopQuizMusic } from './ambience-stream.js';
import { kertojaTila, asetaKertojaTila } from './aani-ehdokkaat.js';
import { asennaPollo } from './pollo.js';
// Lukijaäänen säädin (kehittäjätila): asetukset ja näytekuuntelu.
import {
  asetaPuheenNopeus, luePuheAsetukset, puheenNopeus, tallennaPuheAsetukset,
} from './puhe.js';
import { lueAaneen, pysaytaLukija } from './lukija.js';
// iOS-kuoren kytkennät. Selaimessa jokainen näistä on mykkä (js/natiivi.js).
import {
  natiiviKirjauduPelikeskukseen, natiiviKuunteleSynkka, natiiviMerkitseAika,
  natiiviSeuraa, natiiviSynkkaa, natiiviWidget, natiiviYhdistaLeimat,
} from './natiivi.js';
import { readStamps, writeStamps, STAMP_KEY } from './passport.js';

const PLAYER_COLOR = '#d94f3d';
/*
 * Tallennusavain on pelin omalla nimellä. Vanha avain luetaan yhä, jotta
 * kesken jäänyt peli ei katoa päivityksessä — se siirretään uuteen avaimeen
 * ensimmäisellä latauksella ja poistetaan vasta sitten.
 */
const SAVE_KEY = 'matkakirja-save-v1';
const VANHA_SAVE_KEY = 'afrikan-tahti-save-v1';
/*
 * iCloud-synkan lähtötilanne talteen HETI, ennen kuin peli ehtii
 * tallentaa kertaakaan: pelkkä avaaminen ei ole muutos, eikä vanha
 * tallennus saa leimautua tuoreeksi ja työntyä toisen laitteen
 * uudemman päälle (js/natiivi.js natiiviSeuraa). Selaimessa tämä on
 * pelkkää kirjanpitoa.
 */
natiiviSeuraa(SAVE_KEY);
natiiviSeuraa(STAMP_KEY);
// Vanha maailma korvattiin maailmankartalla; tallennukset siirretään.
const VANHA_LAUTA = 'vanhamaailma';
const UUSI_LAUTA = 'maailmankartta';
const APP_VERSION = '2026-08-09.701';

const rulesDialog = document.getElementById('rules-dialog');
const winnerDialog = document.getElementById('winner-dialog');

let ui = null;

/* --- päivitysruutu ja päivityksen jälkeinen nollaus ------------------------ */

/*
 * PÄIVITYSRUUTU (omistajan havainto 13.8.2026).
 *
 * Lippu asetetaan JUURI ennen uudelleenlatausta, ja index.html:n
 * pikkuskripti näyttää sen perusteella tumman ruudun logoineen heti
 * uuden latauksen ensimmäisellä maalauksella. Lippu on
 * sessionStoragessa eikä localStoragessa: se koskee tätä yhtä latausta
 * eikä saa jäädä laitteelle, jos päivitys jää kesken.
 */
const PAIVITYS_LIPPU = 'matkakirja-paivittyy';
/** Viimeksi nähty versio. Sama avain kuin versionumeron korostuksella. */
const NAHTY_VERSIO_AVAIN = 'matkakirja-nahty-versio';

function merkitsePaivitys() {
  try {
    sessionStorage.setItem(PAIVITYS_LIPPU, '1');
  } catch {
    /* yksityinen selaus: päivitys toimii, ruutu vain jää näyttämättä */
  }
  // Ruutu esiin jo ennen latausta, jottei vanha näkymä jää tuijottamaan.
  document.body.classList.add('paivittyy');
  const ruutu = document.getElementById('paivitysruutu');
  if (!ruutu) return;
  // Ruutu on tässä vaiheessa jo kertaalleen häivytetty pois (peli on
  // ollut pelattavissa), joten häivytys perutaan ja teksti vaihtuu
  // päivityksen omaksi: se kestää kauemmin kuin tavallinen avaus.
  ruutu.classList.remove('latausruutu-haipyy');
  ruutu.hidden = false;
  const teksti = ruutu.querySelector('.paivitysruutu-teksti');
  if (teksti) teksti.textContent = 'Päivitetään, odota hetki…';
}

/** Latausruudun häivytys millisekunteina. Sama luku on css:ssä. */
const LATAUSRUUDUN_HAIPYMA_MS = 280;

/**
 * Latausruutu pois — VASTA kun pelin oma näkymä on maalattu.
 *
 * OMISTAJAN HAVAINTO 13.8.2026 (iPhone): "näkyy ensin siisti Avataan
 * matkakirjaa -ruutu, mutta sen jälkeen vilahtaa vielä vanha ruma
 * välitila ennen kuin peli piirtyy."
 *
 * Syy oli järjestyksessä. Ruutu piilotettiin heti pelin rakentamisen
 * jälkeen samassa synkronisessa lohkossa, jossa peli rakennettiin:
 * selain ei ollut vielä maalannut kertaakaan, ja ensimmäinen maalaus
 * osui hetkeen, jolloin asettelu oli vasta valmistumassa. Pelaaja näki
 * siis täsmälleen sen rungon, jonka peittämiseksi ruutu on olemassa.
 *
 * Nyt vaiheet erotetaan:
 *
 *   1. body.paivittyy pois — peli tulee näkyviin ruudun ALLE, mutta
 *      ruutu on yhä läpinäkymätön sen päällä eikä pelaaja näe mitään.
 *   2. Kaksi requestAnimationFramea. Ensimmäisen jälkeen selain on
 *      laskenut asettelun, toisen jälkeen se on myös maalannut sen.
 *      Vasta silloin ruudun alla on valmis näkymä.
 *   3. Häivytys, ettei vaihdos nytkähdä, ja piilotus sen päätteeksi.
 *
 * Kaksi kehystä on halpa hinta: käynnistys ei hidastu mitattavasti,
 * eikä mikään odota verkkoa tai kuvia.
 */
function paataPaivitysruutu() {
  try {
    sessionStorage.removeItem(PAIVITYS_LIPPU);
  } catch {
    /* ei mitään siivottavaa */
  }
  // Peli näkyviin ruudun alle. Ruutu itse on yhä täysin peittävä.
  document.body.classList.remove('paivittyy');
  const ruutu = document.getElementById('paivitysruutu');
  if (!ruutu || ruutu.hidden) return;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    ruutu.classList.add('latausruutu-haipyy');
    setTimeout(() => {
      ruutu.hidden = true;
      ruutu.classList.remove('latausruutu-haipyy');
    }, LATAUSRUUDUN_HAIPYMA_MS);
  }));
}

/**
 * Onko tämä ensimmäinen lataus uudella versiolla?
 *
 * Luetaan KERRAN ja ennen kuin uusi versionumero kirjoitetaan, koska
 * sama tieto tarvitaan kahteen asiaan: versionumeron korostukseen ja
 * päivityksen jälkeiseen nollaukseen (nollaaValitila).
 */
let paivitysTapahtui = false;
/*
 * Aiemmin nähty versio erikseen: paivitysTapahtui on tosi myös aivan
 * ensimmäisellä käynnillä (mitään ei ole nähty), mutta päivitysilmoitus
 * kuuluu vain pelaajalle, jonka laitteella oli oikeasti vanhempi versio.
 */
let edellinenVersio = null;
try {
  edellinenVersio = localStorage.getItem(NAHTY_VERSIO_AVAIN);
  paivitysTapahtui = edellinenVersio !== APP_VERSION;
} catch {
  paivitysTapahtui = false;
}

// Pystyasento. Androidilla tämä lukitsee laitteen; iOS ei tue rajapintaa,
// joten siellä vaaka-asennon hoitaa css:n .rotate-guard.
try {
  screen.orientation?.lock?.('portrait').catch(() => {});
} catch {
  /* selain ei tue lukitusta — kehote riittää */
}

// --- tallennus -------------------------------------------------------------

function saveGame(game) {
  let talletettu = null;
  try {
    if (game.phase === 'over') localStorage.removeItem(SAVE_KEY);
    else {
      talletettu = JSON.stringify(game.toJSON());
      localStorage.setItem(SAVE_KEY, talletettu);
    }
  } catch {
    /* yksityinen selaustila tai täysi levy — peli jatkuu ilman tallennusta */
  }
  // Sama tallennus iCloudiin ja pelin tila kotinäytölle. Molemmat ovat
  // mykkiä selaimessa, ja kumpikin harventaa itse (js/natiivi.js).
  if (talletettu !== null) natiiviSynkkaa(SAVE_KEY, talletettu);
  synkkaaPassi();
  paivitaWidget(game);
}

/* --- iOS-kuori: iCloud-synkka, widget ja Game Center ---------------------- */

/*
 * PELIN TILA KOTINÄYTÖLLE.
 *
 * Widget näyttää tasan sen mitä sille kirjoitetaan, joten kentät
 * annetaan valmiiksi näytettävässä muodossa (kuori ei muotoile rahaa
 * eikä taivuta kaupunginnimiä). Kirjoitus tapahtuu kaupungin
 * vaihtuessa: iOS antaa widgetille päivityskiintiön, eikä sitä ole
 * varaa kuluttaa joka piirrolla.
 */
function paivitaWidget(game) {
  const city = game.cityOf?.();
  // Matkalla ei olla missään kaupungissa: widget jää näyttämään edellisen.
  if (!city) return;
  const iso = game.pack?.map?.cityCountry?.[city.id];
  const maa = iso ? game.pack?.map?.countryShapes?.[iso]?.nimi : '';
  natiiviWidget({
    kaupunki: city.name,
    maa: maa ?? '',
    paiva: game.dayCount(),
    raha: `£${game.player.money}`,
  });
}

/** Passin leimat pilveen, jos ne muuttuivat. */
function synkkaaPassi() {
  try {
    const leimat = localStorage.getItem(STAMP_KEY);
    if (leimat) natiiviSynkkaa(STAMP_KEY, leimat);
  } catch {
    /* yksityistila: passi elää vain tässä istunnossa */
  }
}

/*
 * UUDEMPI TALLENNUS TOISELTA LAITTEELTA.
 *
 * Sääntö on "uusin voittaa", mutta sitä EI sovelleta hiljaa: kesken
 * oleva matka on pelaajan käsissä juuri nyt, ja sen korvaaminen ilman
 * kysymistä olisi tallennuksen menetys — ei synkka. Peli kysyy siis
 * kerran, ja "Ei nyt" jättää paikallisen tallennuksen rauhaan.
 *
 * Ikkuna avataan vain kerran kerrallaan: iCloud voi lähettää saman
 * muutoksen useampana tapahtumana.
 */
const pilviDialog = document.getElementById('pilvi-dialog');
let pilviTarjolla = false;

function tarjoaPilviTallennus(raaka) {
  if (!pilviDialog || pilviTarjolla) return;
  // Kelvoton tallennus ei ansaitse kysymystä: se ei avautuisi peliksi.
  let tila = null;
  try {
    tila = JSON.parse(raaka);
  } catch {
    return;
  }
  if (!tila || typeof tila !== 'object') return;
  pilviTarjolla = true;
  pilviDialog.showModal();

  const sulje = () => {
    pilviTarjolla = false;
    if (pilviDialog.open) pilviDialog.close();
  };
  document.getElementById('pilvi-ei').onclick = sulje;
  document.getElementById('pilvi-jatka').onclick = () => {
    sulje();
    try {
      localStorage.setItem(SAVE_KEY, raaka);
    } catch {
      /* levy täynnä: peli jatkuu silti tästä tilasta */
    }
    // Aikaleima omaksi: muuten sama tallennus tarjoutuisi uudestaan.
    natiiviMerkitseAika(SAVE_KEY);
    siirraVanhaMaailma(tila);
    const jatkettu = Game.fromJSON(tila);
    if (jatkettu) attach(jatkettu);
  };
}

/*
 * PASSI YHDISTETÄÄN, EI KORVATA. Leimakokoelma vain kasvaa, joten
 * yhdistäminen ei voi hukata mitään eikä sitä tarvitse kysyä. Juuri
 * siksi passille ei tehdä "uusin voittaa" -korvausta: toisella
 * laitteella lennossa ansaittu leima katoaisi.
 */
function yhdistaPilviPassi(raaka) {
  let pilvesta = null;
  try {
    pilvesta = JSON.parse(raaka);
  } catch {
    return;
  }
  if (!pilvesta || typeof pilvesta !== 'object') return;
  const yhdistetty = natiiviYhdistaLeimat(readStamps(), pilvesta);
  writeStamps(yhdistetty);
  natiiviMerkitseAika(STAMP_KEY);
  // Matkalaukku rakentaa sisältönsä joka avauksella, joten uudet leimat
  // näkyvät seuraavalla kerralla ilman erillistä piirtoa.
}

function loadGame() {
  try {
    let raw = localStorage.getItem(SAVE_KEY);
    if (!raw) {
      // Siirtymä vanhasta avaimesta: siirrä kerran, älä lue sitä uudestaan.
      raw = localStorage.getItem(VANHA_SAVE_KEY);
      if (raw) {
        localStorage.setItem(SAVE_KEY, raw);
        localStorage.removeItem(VANHA_SAVE_KEY);
      }
    }
    if (!raw) return null;
    const tila = JSON.parse(raw);
    /*
     * Vanha maailma korvattiin maailmankartalla. Kesken jäänyt peli ei
     * saa kadota siihen: kartta on sama laajempana, ja kaikki 143
     * kaupunkia, 222 reittiä ja niiden askelmäärät ovat mukana
     * sellaisinaan. Tarkistettu vertaamalla, ennen kuin vaihto tehtiin.
     *
     * Siirto tehdään joka latauksella eikä kerran: tallennus kirjoitetaan
     * uudella tunnuksella heti ensimmäisen siirron jälkeen, mutta
     * selaimessa voi olla vanha välilehti auki vanhalla tunnuksella.
     */
    siirraVanhaMaailma(tila);
    const game = Game.fromJSON(tila);
    return game && game.phase !== 'over' ? game : null;
  } catch {
    return null;
  }
}

/*
 * Vaihtaa laudan tunnuksen tallennuksessa.
 *
 * Tunnus esiintyy monessa paikassa: juuripaketissa, `worlds`-kartan
 * AVAIMENA, pelaajien sijainneissa ja tutkittujen kaupunkien
 * `lauta:kaupunki`-avaimissa. Siksi vaihto tehdään koko rakenteen läpi
 * eikä yhdestä kentästä — yksikin unohtunut kohta jättäisi pelaajan
 * laudalle, jota ei enää ole.
 *
 * Kaupunkitunnukset ovat pieniä kirjaimia eivätkä voi olla
 * 'vanhamaailma', joten sekaannusta ei synny.
 */
function siirraVanhaMaailma(arvo) {
  if (Array.isArray(arvo)) {
    for (let i = 0; i < arvo.length; i++) {
      if (arvo[i] === VANHA_LAUTA) arvo[i] = UUSI_LAUTA;
      else if (typeof arvo[i] === 'string') arvo[i] = arvo[i].replace(`${VANHA_LAUTA}:`, `${UUSI_LAUTA}:`);
      else siirraVanhaMaailma(arvo[i]);
    }
    return arvo;
  }
  if (!arvo || typeof arvo !== 'object') return arvo;
  for (const avain of Object.keys(arvo)) {
    const sisus = arvo[avain];
    if (sisus === VANHA_LAUTA) arvo[avain] = UUSI_LAUTA;
    else if (typeof sisus === 'string') arvo[avain] = sisus.replace(`${VANHA_LAUTA}:`, `${UUSI_LAUTA}:`);
    else siirraVanhaMaailma(sisus);
    if (avain === VANHA_LAUTA) {
      arvo[UUSI_LAUTA] = arvo[avain];
      delete arvo[avain];
    }
  }
  return arvo;
}

function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ei mitään tehtävissä */
  }
}

// --- pelin aloitus ----------------------------------------------------------
//
// Peli on yksin pelattava vaellus eikä aloitusdialogia enää ole: uusi peli
// avautuu suoraan maailmankartalle, jolta ensimmäinen kohde valitaan
// ilmaiseksi. Matkaaja on aina herra Fogg.
//
// Kysymysten helpotustila on toistaiseksi pois käytöstä — kaikki pelaavat
// tasolla 'normal'. Kysymyspankkien level-kentät ja moottorin tuki jäävät
// paikoilleen, jotta helpotus voidaan palauttaa myöhemmin.

function newPlayer() {
  return {
    name: 'Herra Fogg',
    start: null, // lähtöpiste valitaan maailmankartalta
    quizLevel: 'normal',
    color: PLAYER_COLOR,
  };
}

function attach(game) {
  if (ui) ui.destroy();
  ui = new UI(game, { onNewGame: startGame, onChange: saveGame });
  ui.mount();
  // Kehityksen apuri konsolia varten. Vanha nimi jää rinnalle, koska
  // työkalut ja kuvakaappausskriptit käyttävät sitä.
  window.matkakirja = { game, ui, sfx };
  window.afrikanTahti = window.matkakirja;
}

function startGame() {
  if (winnerDialog.open) winnerDialog.close();
  clearSave();
  attach(new Game({ players: [newPlayer()], pack: packById('maailma') }));
}

// --- äänet ------------------------------------------------------------------

// Kertojavalikko yläpalkissa. Kolme tilaa (omistajan tiivistys
// 10.8.2026: lyhyt kertoja pois, järjestys käännettiin): kaikki
// äänet, äänet ilman kertojaa, äänet pois. Pelkät kuvakkeet ja
// täppä. Mykistys on sound.js:n enabled-tila (muistetaan käyntien
// yli), kertojan tila oma talletuksensa (aani-ehdokkaat.js) —
// vanha talletettu 'lyhyt' luetaan pitkänä. (Palautettu v525:ssä:
// v524:n versiokonfliktin ratkaisu pyyhkäisi tämän vahingossa.)
const KERTOJA_KIRJA = '<path d="M4.5 11c2.3-1.1 4.6-1.1 7.5 0 2.9-1.1 5.2-1.1 7.5 0v8.2c-2.3-1.1-4.6-1.1-7.5 0-2.9-1.1-5.2-1.1-7.5 0z"/><path d="M12 11v8.2"/>';
const KERTOJA_TILAT = [
  {
    tila: 'pitka',
    seloste: 'Kaikki äänet — kertoja lukee merkinnät ja avaustekstit',
    ikoni: `${KERTOJA_KIRJA}<path d="M10.2 6.8a2.9 2.9 0 0 1 3.6 0"/><path d="M8.6 4.2a5.6 5.6 0 0 1 6.8 0"/>`,
  },
  {
    tila: 'ei',
    seloste: 'Äänet ilman kertojaa — kaiutinnappi lukee pyydettäessä',
    ikoni: `${KERTOJA_KIRJA}<path d="M5.4 5.4l13.2 13.2"/>`,
  },
  {
    tila: 'mykistys',
    seloste: 'Äänet pois',
    ikoni: '<path d="M4.5 9.4h2.8l4.2-3.4v12l-4.2-3.4H4.5z"/><path d="M15.4 9.6l4.8 4.8M20.2 9.6l-4.8 4.8"/>',
  },
];
/*
 * Kertojan äänet ovat päävalikossa auki valmiiksi (omistajan toive
 * 5.8.2026), joten avausnappia ja sen kuvaketta ei enää ole. Valikko
 * ei myöskään piiloudu itsestään — se katoaa vasta päävalikon mukana.
 */
const kertojaValikko = document.getElementById('kertoja-valikko');
const svg = (piirto) => `<svg viewBox="0 0 24 24">${piirto}</svg>`;
const nykyinenKertoja = () => {
  if (!sfx.enabled) return 'mykistys';
  const tila = kertojaTila();
  // Poistunut 'lyhyt'-tila (10.8.2026) luetaan pitkänä, jotta vanha
  // laitteelle talletettu valinta ei jätä valikkoa täpättömäksi.
  return tila === 'lyhyt' ? 'pitka' : tila;
};

const naytaKertoja = () => {
  const nyt = nykyinenKertoja();
  for (const rivi of kertojaValikko.querySelectorAll('button')) {
    rivi.classList.toggle('valittu', rivi.dataset.tila === nyt);
  }
};

const valitseKertoja = (tila) => {
  if (tila === 'mykistys') {
    sfx.setEnabled(false);
    // Kaikki soiva hiljenee heti: striimit, luennat ja lentomoottori.
    stopPlaceStream();
    stopQuizMusic();
    sfx.stopFlight();
    ui?.stopDiaryVoice();
    ui?.stopIntroVoice();
  } else {
    const oliMykistys = !sfx.enabled;
    sfx.setEnabled(true); // palatessa kuuluu kuittausklikki
    asetaKertojaTila(tila);
    if (oliMykistys) {
      ui?.syncAmbience();
      if (ui?.game?.quiz) startQuizMusic(ui.game.pack.id);
    }
    // Kertojan vaihto hiljentää käynnissä olevan luennan; seuraava
    // saapuminen luetaan uuden tilan mukaan.
    if (tila === 'ei') ui?.stopDiaryVoice();
  }
  naytaKertoja();
};

for (const tiedot of KERTOJA_TILAT) {
  const rivi = document.createElement('button');
  rivi.type = 'button';
  rivi.dataset.tila = tiedot.tila;
  rivi.title = tiedot.seloste;
  rivi.setAttribute('aria-label', tiedot.seloste);
  rivi.innerHTML = `<span class="viiva-ikoni">${svg(tiedot.ikoni)}</span><span class="tappa">✓</span>`;
  rivi.addEventListener('click', () => valitseKertoja(tiedot.tila));
  kertojaValikko.appendChild(rivi);
}
naytaKertoja();

// --- päävalikko --------------------------------------------------------------
//
// Hampurilainen on takaisin (omistajan toive 4.8.2026). Säännöt ja uusi
// peli asuvat sen alla; päivitys ja kehittäjätila jäävät versionumeron
// taakse, minne ne v237:ssä siirrettiin.
//
// Valikko sulkeutuu valinnasta, napautuksesta muualle ja Escistä.

const menuBtn = document.getElementById('menu-btn');
const paavalikko = document.getElementById('paavalikko');

const suljeValikko = () => {
  if (paavalikko.hidden) return;
  paavalikko.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
};

menuBtn.addEventListener('click', () => {
  paavalikko.hidden = !paavalikko.hidden;
  menuBtn.setAttribute('aria-expanded', String(!paavalikko.hidden));
});

/*
 * Valinta sulkee valikon. Kuuntelija on valikossa itsessään, joten
 * nappien omat toiminnot pysyvät siellä missä ne on määritelty.
 *
 * POIKKEUS: varusteet ja äänet ovat säätimiä eivätkä komentoja. Niitä
 * napautetaan usein peräkkäin — linssin vaihto ja kuuntelu, äänitilan
 * kokeilu — ja jos valikko sulkeutuisi joka kerta, se pitäisi avata
 * uudelleen jokaista säätöä varten. Säännöt ja uusi peli sen sijaan
 * vievät pois valikosta, joten ne sulkevat sen.
 */
paavalikko.addEventListener('click', (event) => {
  const nappi = event.target.closest('button');
  if (!nappi) return;
  if (nappi.closest('.linssi-kotelo, .kertoja-kotelo')) return;
  suljeValikko();
});

document.addEventListener('pointerdown', (event) => {
  if (!event.target.closest?.('.valikko-kotelo')) suljeValikko();
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  suljeValikko();
});

// Napsautusääni kaikille napeille; vastausvaihtoehdoilla on omat äänensä.
document.addEventListener('pointerdown', (event) => {
  const button = event.target.closest?.('button');
  if (button && !button.classList.contains('quiz-option')) sfx.play('click');
});

// --- päivitys ----------------------------------------------------------------

/**
 * Hakee uusimman version: poistaa palvelutyöntekijän välimuistit ja lataa
 * sivun uudelleen. Kesken oleva peli säilyy, koska se on tallennettu erikseen.
 */
const updateBtn = document.getElementById('update-btn');
async function haeUusinVersio(nappi) {
  nappi.disabled = true;
  /*
   * Tekstiosa vaihtuu, jos nappilla on tekstiä; pelkän kuvakkeen
   * nappi (valikon pieni päivitysnappi) saa .paivittaa-luokan, joka
   * pyörittää kuvaketta CSS:ssä — tekstiä ei kirjoiteta kuvakkeen
   * päälle.
   */
  const nimio = nappi.querySelector('span:not(.viiva-ikoni)');
  if (nimio) nimio.textContent = 'Päivitetään…';
  nappi.classList.add('paivittaa');
  merkitsePaivitys();
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((reg) => reg.unregister()));
    }
    if (window.caches) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } catch {
    /* päivitys onnistuu myös ilman välimuistin siivousta */
  }
  // iOS:n kotivalikkosovellus välimuistittaa aloitussivun myös service
  // workerin ohi: pelkkä reload voi palauttaa vanhan sivun. Muuttuva
  // parametri tekee osoitteesta uuden, jolloin sivu haetaan oikeasti
  // verkosta. Peli ohittaa tuntemattomat parametrit.
  const osoite = new URL(location.href);
  osoite.searchParams.set('paivitys', String(Date.now()));
  location.replace(osoite.toString());
}
updateBtn.addEventListener('click', () => haeUusinVersio(updateBtn));

/*
 * Pieni päivitysnappi versionumeron vieressä hampurilaisvalikossa
 * (omistajan toive 13.8.2026: "versionumeron vasemmalle laitaan voisi
 * tehdä pienen päivitysnapin, tekstin korkuisen") — sama haku kuin
 * sääntöjen Päivitä-napilla, ilman päivityslokin avaamista.
 */
const versioPaivitys = document.getElementById('versio-paivitys');
versioPaivitys?.addEventListener('click', () => haeUusinVersio(versioPaivitys));

document.getElementById('app-version').textContent = APP_VERSION;

/*
 * Kulmaan lyhyt muoto ("v39") — koko päivämäärä on sääntöjen
 * alalaidassa. Kehittäjätila kerrotaan saman rivin perässä
 * ("v154 : kehittäjä", omistajan toive). Ensin siitä kertoi oma merkki
 * kartan yläreunassa, mutta se oli liian iso ele pienelle asetukselle:
 * nurkan numero on jo se paikka, josta pelin tila luetaan.
 */
const versioKulma = document.getElementById('versio-kulma');
function paivitaVersioKulma() {
  const numero = `v${APP_VERSION.split('.').pop()}`;
  // Kehittäjätila merkitään numeron perään (omistajan päätös 13.8.2026,
  // kumoaa 8.8. linjan): valikossa merkintä ei häiritse pelinäkymää.
  versioKulma.textContent = kehittajaTilaPaalla() ? `${numero} · kehittäjä` : numero;
}
paivitaVersioKulma();

/*
 * Tuore päivitys näkyy isommalla (omistajan toive 9.8.2026:
 * "versionumero saisi näkyä vielä isommalla jonkun aikaa aina
 * päivityksen jälkeen ja sitten pienentyä"). Ensimmäinen avaus
 * uudella versiolla pitää numeron korostettuna puoli minuuttia,
 * sitten se kutistuu tavalliseksi CSS-siirtymällä.
 */
try {
  if (paivitysTapahtui) {
    localStorage.setItem(NAHTY_VERSIO_AVAIN, APP_VERSION);
    versioKulma.classList.add('tuore');
    setTimeout(() => versioKulma.classList.remove('tuore'), 30000);
  }
} catch { /* yksityistila ilman localStoragea: ei korostusta */ }

/*
 * Päivitysloki napautuksesta (omistajan toive). Numero kulmassa on jo
 * se paikka, josta pelin tila luetaan, joten loki kuuluu sen taakse
 * eikä omaan valikkokohtaansa.
 *
 * Lista rakennetaan vasta ensimmäisellä avauksella: se on kymmeniä
 * rivejä, eikä useimmilla pelikerroilla katsota lainkaan.
 */
const muutoksetDialog = document.getElementById('muutokset-dialog');
const muutoksetLista = document.getElementById('muutokset-lista');
let lokiRakennettu = false;

function muutosRivi(m) {
  const rivi = document.createElement('li');
  const numero = document.createElement('span');
  numero.className = 'muutos-versio';
  numero.textContent = `v${m.v}`;
  const teksti = document.createElement('span');
  teksti.textContent = m.teksti;
  rivi.append(numero, teksti);
  return rivi;
}

function avaaMuutokset() {
  if (!lokiRakennettu) {
    for (const m of MUUTOKSET) muutoksetLista.appendChild(muutosRivi(m));
    lokiRakennettu = true;
  }
  muutoksetDialog.showModal();
}

versioKulma.addEventListener('click', avaaMuutokset);
/*
 * Lokin omat toiminnot sulkevat lokin ensin.
 *
 * Kehittäjätila avaa oman modaalinsa, ja kaksi päällekkäistä
 * <dialog>-modaalia jättää alemman taustahimmennyksen päälle. Päivitys
 * lataa sivun uudelleen, jolloin auki jäänyt ikkuna vilkahtaisi turhaan.
 */
muutoksetDialog.addEventListener('click', (e) => {
  if (e.target.closest?.('.muutokset-toiminnot button')) muutoksetDialog.close();
});
document.getElementById('muutokset-sulje')
  .addEventListener('click', () => muutoksetDialog.close());
// Napautus kortin ulkopuolelle sulkee, kuten muissakin ikkunoissa.
muutoksetDialog.addEventListener('click', (e) => {
  if (e.target === muutoksetDialog) muutoksetDialog.close();
});
/*
 * Uusi peli tyhjentää kaiken (omistajan toive). Sitä ennen kysytään
 * kerran: passin leimat ja laukun tavarat ovat pelin ainoa pysyvä
 * kertymä, eikä niitä saa takaisin. Voittoikkunan Uusi peli aloittaa
 * kuten ennenkin eikä tyhjennä mitään — siinä kohtaa pelaaja on juuri
 * ansainnut kertymänsä.
 */
const nollaaDialog = document.getElementById('nollaa-dialog');

/**
 * Kaikki pelin muistit pois: talletukset, välimuistit ja
 * palvelutyöntekijä. Sen jälkeen sivu haetaan uutena.
 *
 * Avaimet poistetaan etuliitteen perusteella eikä listana, jotta uusi
 * asetus ei jää siivouksen ulkopuolelle sitä mukaa kun niitä lisätään.
 */
/*
 * LAITTEEN ASETUKSET SÄILYVÄT TYHJENNYKSESSÄ (omistajan tilaus
 * 14.8.2026: "jos aloitan uuden pelin, kehittäjätila saisi pysyä
 * päällä"). Nämä eivät ole pelin muistia vaan laitteen asetuksia:
 * kehittäjätila koodeineen ja lukijaäänen säädöt. Kaikki muu
 * matkakirja-alkuinen pyyhkiytyy kuten ennenkin.
 */
const SAILYVAT_ASETUKSET = new Set([
  'matkakirja-kehittaja',
  'matkakirja-pollo-kehittajakoodi',
  'matkakirja-puhe-kehittaja',
  'matkakirja-puhe-voima',
  'matkakirja-puhe-nopeus',
  'matkakirja-puhe-persoonat',
]);

async function tyhjennaMuistit() {
  try {
    const poistettavat = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const avain = localStorage.key(i);
      if (avain && (avain.startsWith('matkakirja') || avain.startsWith('afrikan-tahti'))
        && !SAILYVAT_ASETUKSET.has(avain)) {
        poistettavat.push(avain);
      }
    }
    for (const avain of poistettavat) localStorage.removeItem(avain);
  } catch {
    /* yksityinen selaus: ei talletuksia poistettavaksi */
  }
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((reg) => reg.unregister()));
    }
    if (window.caches) {
      const avaimet = await caches.keys();
      await Promise.all(avaimet.map((avain) => caches.delete(avain)));
    }
  } catch {
    /* tyhjennys onnistuu myös ilman välimuistin siivousta */
  }
  // Sama kikka kuin Päivitä-napissa: iOS välimuistittaa aloitussivun
  // myös palvelutyöntekijän ohi, joten osoitteesta tehdään uusi.
  const osoite = new URL(location.href);
  osoite.searchParams.set('paivitys', String(Date.now()));
  location.replace(osoite.toString());
}

document.getElementById('newgame-btn').addEventListener('click', () => nollaaDialog.showModal());
document.getElementById('nollaa-peru').addEventListener('click', () => nollaaDialog.close());
document.getElementById('nollaa-ok').addEventListener('click', () => {
  const nappi = document.getElementById('nollaa-ok');
  nappi.disabled = true;
  nappi.textContent = 'Tyhjennetään…';
  merkitsePaivitys();
  tyhjennaMuistit();
});
document.getElementById('rules-btn').addEventListener('click', () => rulesDialog.showModal());
// Passi kuuluu pelaajalle eikä yksittäiselle pelille, joten nappi kytketään
// kerran täällä eikä käyttöliittymän mukana joka uudessa pelissä.
// Kukkaropilleri on samalla matkalaukun nappi (omistajan toive).
document.getElementById('turn-pill').addEventListener('click', () => ui?.openPassport());
// Alakulman huutomerkki: palaute juuri siitä kohdasta peliä, jossa
// pelaaja on. Kytketään kerran, koska nappi elää pelin ulkopuolella.
document.getElementById('palaute-kulma').addEventListener('click', () => ui?.naytaPalauteKulmasta());
document.getElementById('rules-close').addEventListener('click', () => rulesDialog.close());
document.getElementById('winner-close').addEventListener('click', startGame);

// Palvelutyöntekijä tekee pelistä asennettavan ja offline-toimivan.
// Ohitetaan hiljaisesti, jos sivu on avattu file://-osoitteesta tai hiekkalaatikossa.
// Yhden tiedoston versiossa ei ole manifestia eikä sw.js:ää, joten rekisteröinti
// tehdään vain kun sivulla on manifest-linkki.
const hasManifest = !!document.querySelector('link[rel="manifest"]');
if (hasManifest && 'serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      /* offline-tuki ei ole käytettävissä — peli toimii silti */
    });
  });

  // Kotivalikkoon asennettu sovellus voi herätä viikkojen takaa samaan
  // sivuun, jolloin uusi versio ei koskaan pääse käyttöön itsestään.
  // Kun uusi palvelutyöntekijä ottaa ohjat, sivu ladataan kerran
  // uudelleen — kesken oleva peli jatkuu tallennuksesta. Ensiasennuksessa
  // ohjaimen ilmestyminen ei ole päivitys, joten silloin ei ladata.
  let oliOhjain = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!oliOhjain) {
      oliOhjain = true;
      return;
    }
    // Sama siisti ruutu kuin Päivitä-napista: lataus alkaa heti, joten
    // lippu on asetettava ennen sitä.
    merkitsePaivitys();
    location.reload();
  });

  // Päivitystarkistus aina, kun sovellus palaa esiin taustalta.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') return;
    navigator.serviceWorker.getRegistration()
      .then((reg) => reg?.update())
      .catch(() => { /* tarkistus epäonnistui — yritetään taas seuraavalla kerralla */ });
  });
}

// Katselutila: ?lauta=<id> avaa laudan kartan suoraan ilman porttia,
// avaustekstiä ja tallennusta — työhuoneen Maanosat-välilehti näyttää
// kartat tällä. Kaupunkia voi klikata ja lautaa kokeilla vapaasti:
// mikään ei kirjoita tallennettua peliä yli, ja Uusi peli -nappi on
// piilossa, ettei se tyhjentäisi oikeaa tallennusta.
function avaaKatselu(pack) {
  document.body.classList.add('katselu');
  /*
   * Katselutila on mykkä.
   *
   * Työhuone näyttää kartat kehyksessä, ja kehyksessä pyörii oikea
   * peli — myös sen taustaääni. Työhuoneessa se kuuluu ambienssina,
   * jolle ei näy mitään lähdettä eikä säädintä. Kartan esikatselu on
   * kuva laudasta, ei pelisessio, joten ääntä ei tarvita.
   *
   * Lippu asetetaan suoraan eikä setEnabledillä: setEnabled kirjoittaa
   * valinnan localStorageen, ja se on sama varasto kuin oikealla
   * pelillä samassa osoitteessa. Kartan vilkaisu työhuoneessa
   * mykistäisi silloin omistajan oman pelin.
   */
  sfx.enabled = false;
  const game = new Game({ players: [newPlayer()], pack });
  if (ui) ui.destroy();
  ui = new UI(game, { onNewGame: () => {}, onChange: () => {} });
  ui.katselu = true;
  ui.aloitettu = true;
  ui.mount();
  window.matkakirja = { game, ui, sfx };
  window.afrikanTahti = window.matkakirja;
}

let katseluPack = null;
try {
  const lauta = new URLSearchParams(location.search).get('lauta');
  katseluPack = lauta ? packById(lauta) ?? null : null;
} catch {
  katseluPack = null;
}

/*
 * PÄIVITYKSEN JÄLKEINEN KOVA NOLLAUS (omistajan havainto 13.8.2026
 * iPadilla: "kartta jäi sumennetuksi ja saapumiskortti puuttui, uusi
 * peli korjasi").
 *
 * Tallennuksessa on kaksi eri lajia tietoa. Ensimmäinen on pelaajan
 * eteneminen — sijainti, rahat, löydöt, leimat, päivät — ja siihen EI
 * kosketa. Toinen on hetkellinen välitila: kesken jäänyt siirtovalinta,
 * auki ollut visa, tarjottu kohtaaminen, käynnissä ollut lento. Ne
 * kuuluvat siihen hetkeen, jona sivu suljettiin, ja ne odottavat
 * jatkoa käyttöliittymältä, jota ei enää ole.
 *
 * Tavallisessa latauksessa se ei haittaa: sama koodi jatkaa siitä
 * mihin jäi. Version vaihtuessa jatkaja on eri koodi, ja silloin
 * välitila voi jäädä ristiriitaan — sumennusverho päälle ilman
 * dialogia, saapumiskortti piirtämättä. Siksi juuri päivityksen
 * jälkeen välitila pyyhitään ja näkymä rakennetaan tallenteesta
 * puhtaalta pöydältä.
 *
 * Vaiheet 'pickstart' ja 'over' jätetään rauhaan: kumpikaan ei ole
 * välitila vaan pelin oma kohta.
 */
const VALITILAN_VAIHEET = new Set(['roll', 'move', 'quiz', 'offer', 'event', 'duel']);

function nollaaValitila(game) {
  if (!game) return game;
  // Selaimen puolen hetkelliset liput: animaatioluokat ja auki jääneet
  // ikkunat. DOM on latauksen jäljiltä puhdas, mutta tämä on halpa ja
  // tekee säännöstä yksiselitteisen.
  document.body.classList.remove(
    'flight-active', 'zoom-kaynnissa', 'manner-zoom', 'manner-odottaa',
    'kartta-raahaus', 'radio-tila',
  );
  for (const dialogi of document.querySelectorAll('dialog[open]')) dialogi.close();

  if (VALITILAN_VAIHEET.has(game.phase)) game.phase = 'action';
  game.die = null;
  game.moves = null;
  game.quiz = null;
  game.duel = null;
  game.eventCard = null;
  game.pendingFare = null;
  game.autoTravel = false;
  game.travelMode = null;
  game.lastPath = null;
  return game;
}

// Kesken jäänyt peli jatkuu automaattisesti, muuten kysytään pelaajat.
if (katseluPack) {
  avaaKatselu(katseluPack);
} else {
  const saved = loadGame();
  if (saved) {
    if (paivitysTapahtui) nollaaValitila(saved);
    attach(saved);
    // Nollattu tila myös levylle, jottei sama välitila palaa seuraavalla
    // avauksella.
    if (paivitysTapahtui) saveGame(saved);
  } else startGame();
}

// Peli on rakennettu: päivitysruutu väistyy.
paataPaivitysruutu();

/*
 * iOS-KUOREN KYTKENNÄT. Selaimessa jokainen näistä palaa heti takaisin
 * tekemättä mitään, eikä yhtään kuuntelijaa synny.
 *
 * Katselutila (työhuoneen kartta kehyksessä) jätetään ulos kokonaan:
 * se ei ole pelaajan matka, eikä sen pidä kirjautua Game Centeriin
 * eikä tarjota tallennusta pilvestä.
 */
/*
 * PILVITALLENNUKSEN KYSELY POIS PÄÄLTÄ (omistajan tilaus 14.8.2026:
 * "Ota game center synkkakysely pois päältä"). Toisen laitteen
 * tallennusta ei enää tarjota dialogilla — kuuntelija jää kytkemättä.
 * Passin leimat yhdistyvät yhä hiljaa (se ei kysy mitään), ja
 * paikallinen tallennus synkataan pilveen kuten ennenkin. Vipu on
 * vakiona tässä, jotta kyselyn saa takaisin yhdellä rivillä.
 */
const PILVIKYSELY_KAYTOSSA = false;

if (!katseluPack) {
  natiiviKirjauduPelikeskukseen();
  if (PILVIKYSELY_KAYTOSSA) {
    natiiviKuunteleSynkka(SAVE_KEY, (raaka) => tarjoaPilviTallennus(raaka));
  }
  natiiviKuunteleSynkka(STAMP_KEY, (raaka) => yhdistaPilviPassi(raaka));
}

/*
 * Päivityksen jälkeen pieni ilmoitus (omistajan toive 13.8.2026):
 * kahden uusimman version muutosrivit heti pelin auettua. Vain kun
 * laitteella oli oikeasti aiempi versio — uudelle pelaajalle rivit
 * eivät kerro mitään — eikä katselutilassa, joka on työhuoneen
 * esikatselu. Koko loki on edelleen versionumeron takana.
 */
if (paivitysTapahtui && edellinenVersio && !katseluPack) {
  const paivitysDialog = document.getElementById('paivitys-dialog');
  const paivitysLista = document.getElementById('paivitys-lista');
  for (const m of MUUTOKSET.slice(0, 2)) paivitysLista.appendChild(muutosRivi(m));
  document.getElementById('paivitys-sulje')
    .addEventListener('click', () => paivitysDialog.close());
  // Napautus kortin ulkopuolelle sulkee, kuten muissakin ikkunoissa.
  paivitysDialog.addEventListener('click', (e) => {
    if (e.target === paivitysDialog) paivitysDialog.close();
  });
  paivitysDialog.showModal();
}

/*
 * Kehittäjätila (omistajan toive). Muutoslokista aukeaa salasanaikkuna, ja
 * kytkennän jälkeen minkä tahansa kaupungin laatan napautus vie sinne
 * suoraan — sisällön tarkasteluun ei tarvitse pelata.
 *
 * Salasana on koodissa selkokielisenä tarkoituksella: se on kevyt lukko
 * eikä tietoturvaa. Tehtävä on estää tilan avautuminen vahingossa
 * lapsen kädessä, ei suojata mitään salaista — pelissä ei ole mitään
 * suojattavaa.
 */
/*
 * Kehittäjäkoodit ovat lähdekoodissa vain SHA-256-tiivisteinä (omistajan
 * toive 13.8.2026): koodia ei voi lukea suoraan koodista. Tämä on
 * näkösuoja, ei linnoitus — lyhyt koodi on kokeiltavissa läpi — mutta
 * pöllön rajaton käyttö varmistetaan joka tapauksessa palvelimella
 * (worker vertaa otsaketta omaan salaisuuteensa). Pääkoodin tiiviste
 * avaa kehittäjätilan JA tallettaa syötetyn koodin pöllön otsakkeeseen;
 * rajattu koodi (betatestaajille) avaa vain kehittäjätilan.
 */
const KEHITTAJA_TIIVISTE = '2f7f15d0bb83b97a7ce3054be0972e80b60742cfc8b4c36ce06f3330f6f045c6';
const KEHITTAJA_TIIVISTE_RAJATTU = 'b3282a2f2a28757b3a18ab833de16a9c54518c0b0cf493e3f0a7cf09386f326a';
async function sha256Hex(teksti) {
  const data = new TextEncoder().encode(teksti);
  const puskuri = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(puskuri)].map((t) => t.toString(16).padStart(2, '0')).join('');
}
const POLLO_KOODIAVAIN = 'matkakirja-pollo-kehittajakoodi';
function talletaPolloKoodi(koodi) {
  try {
    if (koodi) localStorage.setItem(POLLO_KOODIAVAIN, koodi);
    else localStorage.removeItem(POLLO_KOODIAVAIN);
  } catch { /* yksityistila: pöllön ohitus jää pois, muu toimii */ }
}
const kehittajaDialog = document.getElementById('kehittaja-dialog');
const kehittajaSalasana = document.getElementById('kehittaja-salasana');
const kehittajaVirhe = document.getElementById('kehittaja-virhe');
const kehittajaSelite = document.getElementById('kehittaja-selite');
const kehittajaOk = document.getElementById('kehittaja-ok');
const kehittajaMitat = document.getElementById('kehittaja-mitat');
const kehittajaLomake = document.getElementById('kehittaja-lomake');

/**
 * Ruudun mitat luettavassa muodossa. iOS:n turva-alueet eivät näy
 * JavaScriptille suoraan, joten ne luetaan :root-muuttujista, joihin
 * css kirjoittaa env()-arvot.
 *
 * Tämä on täällä syystä: asennetussa sovelluksessa kartan alle jäi
 * selittämätön kaista, eikä sen mittoja voi mitata muualta kuin
 * laitteelta itseltään.
 */
function kehittajaMittarivit() {
  const juuri = getComputedStyle(document.documentElement);
  const turva = (nimi) => juuri.getPropertyValue(nimi).trim() || '0px';
  const laatikko = (valitsin) => {
    const el = document.querySelector(valitsin);
    if (!el) return 'ei näkyvissä';
    const r = el.getBoundingClientRect();
    return `${Math.round(r.top)} → ${Math.round(r.bottom)} (${Math.round(r.height)})`;
  };
  const asennettu = window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true;
  return [
    `ruutu     ${window.innerWidth} × ${window.innerHeight}`,
    `näyttö    ${window.screen?.width ?? '?'} × ${window.screen?.height ?? '?'}`,
    `turva     ylä ${turva('--turva-yla')}  ala ${turva('--turva-ala')}`,
    `app       ${laatikko('.app')}`,
    `stage     ${laatikko('.stage')}`,
    `kartta    ${laatikko('.map-pane')}`,
    `asennettu ${asennettu ? 'kyllä' : 'ei'}`,
    `versio    ${APP_VERSION}`,
  ].join('\n');
}

function avaaKehittajaIkkuna() {
  const paalla = kehittajaTilaPaalla();
  kehittajaVirhe.hidden = true;
  kehittajaSalasana.value = '';
  kehittajaLomake.hidden = paalla;
  kehittajaSelite.textContent = paalla
    ? 'Kehittäjätila on päällä: kaupunkiin pääsee napauttamalla sen laattaa.'
    : 'Kytkettynä kaupunkiin pääsee napauttamalla sen laattaa.';
  kehittajaOk.textContent = paalla ? 'Kytke pois' : 'Kytke päälle';
  kehittajaMitat.textContent = kehittajaMittarivit();
  kehittajaMitat.hidden = false;
  kehittajaDialog.showModal();
  if (!paalla) kehittajaSalasana.focus();
}

async function kytkeKehittaja() {
  if (kehittajaTilaPaalla()) {
    asetaKehittajaTila(false);
    talletaPolloKoodi('');
    ui?.paivitaKehittajaTila();
    paivitaVersioKulma();
    paivitaPuheSaadin();
    kehittajaDialog.close();
    return;
  }
  const syote = kehittajaSalasana.value.trim();
  const tiiviste = await sha256Hex(syote);
  const taysi = tiiviste === KEHITTAJA_TIIVISTE;
  if (!taysi && tiiviste !== KEHITTAJA_TIIVISTE_RAJATTU) {
    kehittajaVirhe.hidden = false;
    kehittajaSalasana.value = '';
    kehittajaSalasana.focus();
    return;
  }
  // Pääkoodi kulkee pöllölle otsakkeessa (worker vertaa salaisuuteensa
  // ja ohittaa rajat); rajattu koodi ei koskaan lähde otsakkeessa.
  talletaPolloKoodi(taysi ? syote : '');
  asetaKehittajaTila(true);
  ui?.paivitaKehittajaTila();
  paivitaVersioKulma();
  paivitaPuheSaadin();
  kehittajaDialog.close();
}

document.getElementById('kehittaja-btn').addEventListener('click', avaaKehittajaIkkuna);
kehittajaOk.addEventListener('click', kytkeKehittaja);
document.getElementById('kehittaja-peru').addEventListener('click', () => kehittajaDialog.close());
// Enter kentässä kytkee: puhelimen näppäimistössä on "mene"-nappi.
kehittajaLomake.addEventListener('submit', (e) => {
  e.preventDefault();
  kytkeKehittaja();
});

/* --- Lukijaäänen säädin (kehittäjätila, omistajan tilaus 14.8.2026) ------- */

/*
 * Valikon Äänet-osiossa on kehittäjätilassa nappi, josta lukijaäänen
 * äänen, promptin ja nopeuden voi säätää suoraan pelistä. Säädöt
 * tallentuvat laitteelle heti (sama localStorage kuin työhuoneen
 * Lukijaääni-välilehdellä), ja worker tottelee ääni-/promptisäätöjä
 * vain kehittäjäkoodilla — joka on laitteella jo kehittäjätilan
 * avaamisesta (js/puhe.js lukee sen varapolkuna).
 */
const puheDialog = document.getElementById('puhe-dialog');
const puheSaadinNappi = document.getElementById('puhe-saadin-btn');
const puhePersoonaValinta = document.getElementById('puhe-persoona');
const puheAaniValinta = document.getElementById('puhe-aani');
const puheOhjeKentta = document.getElementById('puhe-ohje');
const puheNopeusLiuku = document.getElementById('puhe-nopeus');
const puheNopeusArvo = document.getElementById('puhe-nopeus-arvo');

const PUHE_AANIVAIHTOEHDOT = ['alloy', 'ash', 'ballad', 'coral', 'echo',
  'fable', 'nova', 'onyx', 'sage', 'shimmer', 'verse'];
const PUHE_OLETUSAANET = { merkinnat: 'onyx', kertoja: 'onyx', pollo: 'sage' };
const PUHE_NAYTTEET = {
  merkinnat: 'Saavuimme kaupunkiin illansuussa, ja teekaravaanin kellot '
    + 'kilisivät kadulla vielä pimeän tultua.',
  kertoja: 'Niilin tulva toi mudan pelloille joka kesä, ja koko '
    + 'valtakunnan verokalenteri laskettiin sen mukaan.',
  pollo: 'Hyvä kysymys! Baikal on maailman syvin järvi — sen syvin '
    + 'kohta on yli tuhat kuusisataa metriä.',
};

/** Napin näkyvyys seuraa kehittäjätilaa. */
function paivitaPuheSaadin() {
  if (puheSaadinNappi) puheSaadinNappi.hidden = !kehittajaTilaPaalla();
  // Kehittäjän liitteet (omistajan tilaus 15.8.2026): Raamattu ja
  // tilannetaulut luettavina lehtinä — linkit näkyvät vain vivun takana.
  const kehittajaKotelo = document.getElementById('kehittaja-kotelo');
  if (kehittajaKotelo) kehittajaKotelo.hidden = !kehittajaTilaPaalla();
}

document.getElementById('raamattu-lehti-btn')?.addEventListener('click', () => {
  window.matkakirja?.ui?.avaaRaamattuLehti();
});
document.getElementById('tilanne-lehti-btn')?.addEventListener('click', () => {
  window.matkakirja?.ui?.avaaTilanneLehti();
});

/** Täyttää kentät valitun lukijan tallennetuista säädöistä. */
function lataaPuheKentat() {
  const persoona = puhePersoonaValinta.value;
  const oma = luePuheAsetukset()[persoona] ?? {};
  // Oletusvaihtoehdon nimi kertoo, mikä pelin oletusääni on.
  puheAaniValinta.replaceChildren();
  const oletus = document.createElement('option');
  oletus.value = '';
  oletus.textContent = `(pelin oletus: ${PUHE_OLETUSAANET[persoona] ?? 'onyx'})`;
  puheAaniValinta.appendChild(oletus);
  for (const aani of PUHE_AANIVAIHTOEHDOT) {
    const o = document.createElement('option');
    o.value = aani;
    o.textContent = aani;
    puheAaniValinta.appendChild(o);
  }
  puheAaniValinta.value = PUHE_AANIVAIHTOEHDOT.includes(oma.aani) ? oma.aani : '';
  puheOhjeKentta.value = oma.ohje ?? '';
  puheNopeusLiuku.value = String(puheenNopeus());
  puheNopeusArvo.textContent = `${puheenNopeus().toFixed(2)}×`;
}

/** Tallettaa äänen ja promptin heti muutoksesta — ei erillistä nappia. */
function tallennaPuheKentat() {
  const kaikki = luePuheAsetukset();
  kaikki[puhePersoonaValinta.value] = {
    aani: puheAaniValinta.value || null,
    ohje: puheOhjeKentta.value.trim() || null,
  };
  tallennaPuheAsetukset(kaikki);
}

if (puheDialog && puheSaadinNappi) {
  puheSaadinNappi.addEventListener('click', () => {
    lataaPuheKentat();
    puheDialog.showModal();
  });
  puhePersoonaValinta.addEventListener('change', lataaPuheKentat);
  puheAaniValinta.addEventListener('change', tallennaPuheKentat);
  puheOhjeKentta.addEventListener('change', tallennaPuheKentat);
  puheNopeusLiuku.addEventListener('input', () => {
    const nopeus = asetaPuheenNopeus(Number(puheNopeusLiuku.value));
    puheNopeusArvo.textContent = `${nopeus.toFixed(2)}×`;
  });
  document.getElementById('puhe-oletus').addEventListener('click', () => {
    const kaikki = luePuheAsetukset();
    delete kaikki[puhePersoonaValinta.value];
    tallennaPuheAsetukset(kaikki);
    lataaPuheKentat();
  });
  document.getElementById('puhe-nayte').addEventListener('click', () => {
    tallennaPuheKentat();
    const persoona = puhePersoonaValinta.value;
    // Näyte ilman säilöä: kokeilut eivät saa täyttää äänisäilöjä.
    lueAaneen(PUHE_NAYTTEET[persoona] ?? PUHE_NAYTTEET.kertoja, null,
      { persoona, sailio: null });
  });
  document.getElementById('puhe-sulje').addEventListener('click', () => {
    tallennaPuheKentat();
    pysaytaLukija();
    puheDialog.close();
  });
  paivitaPuheSaadin();
}

/*
 * Viisas Pöllö: kartan kulman tietokumppani (js/pollo.js).
 *
 * Asennetaan kerran ja annetaan getteri UI-olioon — uusi peli luo uuden
 * UI:n, eikä pöllön pidä jäädä kiinni vanhaan. Pöllö ei koskaan avaudu
 * itsestään, se vain ilmestyy näkyviin kun avausteksti on väistynyt.
 */
asennaPollo(() => ui);
