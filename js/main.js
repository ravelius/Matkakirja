// Käynnistys: aloitusruutu, pelin luonti, tallennus ja dialogit.

import { MUUTOKSET } from './muutokset.js';
import { Game } from './game.js';
import { UI, kehittajaTilaPaalla, asetaKehittajaTila } from './ui.js';
import { sfx } from './sound.js';
import { packById } from './pack.js';
import { startQuizMusic, stopPlaceStream, stopQuizMusic } from './ambience-stream.js';
import { kertojaTila, asetaKertojaTila } from './aani-ehdokkaat.js';

const PLAYER_COLOR = '#d94f3d';
/*
 * Tallennusavain on pelin omalla nimellä. Vanha avain luetaan yhä, jotta
 * kesken jäänyt peli ei katoa päivityksessä — se siirretään uuteen avaimeen
 * ensimmäisellä latauksella ja poistetaan vasta sitten.
 */
const SAVE_KEY = 'matkakirja-save-v1';
const VANHA_SAVE_KEY = 'afrikan-tahti-save-v1';
// Vanha maailma korvattiin maailmankartalla; tallennukset siirretään.
const VANHA_LAUTA = 'vanhamaailma';
const UUSI_LAUTA = 'maailmankartta';
const APP_VERSION = '2026-08-09.452';

const rulesDialog = document.getElementById('rules-dialog');
const winnerDialog = document.getElementById('winner-dialog');

let ui = null;

// Pystyasento. Androidilla tämä lukitsee laitteen; iOS ei tue rajapintaa,
// joten siellä vaaka-asennon hoitaa css:n .rotate-guard.
try {
  screen.orientation?.lock?.('portrait').catch(() => {});
} catch {
  /* selain ei tue lukitusta — kehote riittää */
}

// --- tallennus -------------------------------------------------------------

function saveGame(game) {
  try {
    if (game.phase === 'over') localStorage.removeItem(SAVE_KEY);
    else localStorage.setItem(SAVE_KEY, JSON.stringify(game.toJSON()));
  } catch {
    /* yksityinen selaustila tai täysi levy — peli jatkuu ilman tallennusta */
  }
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

// Kertojavalikko yläpalkissa (omistajan toive): mykistys, ei kertojaa,
// lyhyt kertoja (vain nuoren herran osuus) ja pitkä kertoja. Pelkät
// kuvakkeet ja täppä — kirja kertoo lukijasta, kaaret puheen määrästä.
// Mykistys on sound.js:n enabled-tila (muistetaan käyntien yli),
// kertojan tila oma talletuksensa (aani-ehdokkaat.js).
const KERTOJA_KIRJA = '<path d="M4.5 11c2.3-1.1 4.6-1.1 7.5 0 2.9-1.1 5.2-1.1 7.5 0v8.2c-2.3-1.1-4.6-1.1-7.5 0-2.9-1.1-5.2-1.1-7.5 0z"/><path d="M12 11v8.2"/>';
const KERTOJA_TILAT = [
  {
    tila: 'mykistys',
    seloste: 'Mykistä kaikki äänet',
    ikoni: '<path d="M4.5 9.4h2.8l4.2-3.4v12l-4.2-3.4H4.5z"/><path d="M15.4 9.6l4.8 4.8M20.2 9.6l-4.8 4.8"/>',
  },
  {
    tila: 'ei',
    seloste: 'Ei kertojaa — muut äänet soivat, kaiutinnappi lukee pyydettäessä',
    ikoni: `${KERTOJA_KIRJA}<path d="M5.4 5.4l13.2 13.2"/>`,
  },
  {
    tila: 'lyhyt',
    seloste: 'Lyhyt kertoja — vain nuoren herran osuus matkakirjasta',
    ikoni: `${KERTOJA_KIRJA}<path d="M10.2 6.8a2.9 2.9 0 0 1 3.6 0"/>`,
  },
  {
    tila: 'pitka',
    seloste: 'Pitkä kertoja — koko merkintä ja avaustekstit',
    ikoni: `${KERTOJA_KIRJA}<path d="M10.2 6.8a2.9 2.9 0 0 1 3.6 0"/><path d="M8.6 4.2a5.6 5.6 0 0 1 6.8 0"/>`,
  },
];
/*
 * Kertojan äänet ovat päävalikossa auki valmiiksi (omistajan toive
 * 5.8.2026), joten avausnappia ja sen kuvaketta ei enää ole. Valikko
 * ei myöskään piiloudu itsestään — se katoaa vasta päävalikon mukana.
 */
const kertojaValikko = document.getElementById('kertoja-valikko');
const svg = (piirto) => `<svg viewBox="0 0 24 24">${piirto}</svg>`;
const nykyinenKertoja = () => (sfx.enabled ? kertojaTila() : 'mykistys');

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
updateBtn.addEventListener('click', async () => {
  updateBtn.disabled = true;
  updateBtn.textContent = 'Päivitetään…';
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
});

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
  // Pelkkä numero myös kehittäjätilassa (omistajan päätös 8.8.2026:
  // "Kehittäjä tekstin voi ottaa pois. Tunnistan tilan kyllä itse").
  versioKulma.textContent = numero;
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
  const AVAIN = 'matkakirja-nahty-versio';
  if (localStorage.getItem(AVAIN) !== APP_VERSION) {
    localStorage.setItem(AVAIN, APP_VERSION);
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

function avaaMuutokset() {
  if (!lokiRakennettu) {
    for (const m of MUUTOKSET) {
      const rivi = document.createElement('li');
      const numero = document.createElement('span');
      numero.className = 'muutos-versio';
      numero.textContent = `v${m.v}`;
      const teksti = document.createElement('span');
      teksti.textContent = m.teksti;
      rivi.append(numero, teksti);
      muutoksetLista.appendChild(rivi);
    }
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
async function tyhjennaMuistit() {
  try {
    const poistettavat = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const avain = localStorage.key(i);
      if (avain && (avain.startsWith('matkakirja') || avain.startsWith('afrikan-tahti'))) {
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

// Kesken jäänyt peli jatkuu automaattisesti, muuten kysytään pelaajat.
if (katseluPack) {
  avaaKatselu(katseluPack);
} else {
  const saved = loadGame();
  if (saved) attach(saved);
  else startGame();
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
const KEHITTAJA_SALASANA = '5545';
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

function kytkeKehittaja() {
  if (kehittajaTilaPaalla()) {
    asetaKehittajaTila(false);
    ui?.paivitaKehittajaTila();
    paivitaVersioKulma();
    kehittajaDialog.close();
    return;
  }
  if (kehittajaSalasana.value.trim() !== KEHITTAJA_SALASANA) {
    kehittajaVirhe.hidden = false;
    kehittajaSalasana.value = '';
    kehittajaSalasana.focus();
    return;
  }
  asetaKehittajaTila(true);
  ui?.paivitaKehittajaTila();
  paivitaVersioKulma();
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
