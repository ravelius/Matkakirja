/*
 * ── TAUSTALLE MENNYT PELI ON TÄYSIN HILJAA ───────────────────────────
 *
 * OMISTAJAN TILAUS 24.8.2026: *"Pelin äänet pitäisi hiljentyä kaikki
 * jos sovellus ei ole iOS-laitteella auki päällimmäisenä."*
 *
 * MIKSI SELAIN EI HOIDA TÄTÄ ITSE. iOS:n WebKit jatkaa taustalla sekä
 * <audio>-elementtejä että WebAudio-kontekstia aina kun sivun
 * äänisessio on toistoluokassa — ja peli asettaa sen luokan
 * tarkoituksella (js/sound.js mediakanavan ankkuri), jotta
 * Ohjauskeskuksen säädin hallitsisi peliä. Sama valinta, joka teki
 * äänisäätimestä oikean, tekee taustalle jäävästä pelistä soivan:
 * kotinäppäin, näytön lukitus tai toinen sovellus eteen jättää
 * äänimaiseman, radion ja kertojan kuulumaan. Selainvälilehdessä sama
 * koskee piiloon jäänyttä välilehteä.
 *
 * YKSI VAHTI, EI KYMMENTÄ. Äänilähteitä on kuusi (tehosteet,
 * syntetisoitu äänimaisema, nauhoitettu äänimaisema, visamusiikki,
 * lukijaääni ja radio), ja jokainen niistä eläisi omaa elämäänsä, jos
 * jokainen kuuntelisi näkyvyyttä itse. Tämä moduuli kuuntelee kerran
 * ja kertoo tiedon eteenpäin; jokainen äänimoduuli rekisteröi tänne
 * OMAN tapansa vaieta ja palata. Näin uusi äänilähde liittyy joukkoon
 * yhdellä rekisteröinnillä eikä yhdenkään moduulin tarvitse tietää
 * toisistaan mitään.
 *
 * TÄMÄ MODUULI EI TUO MITÄÄN. Se on kaikkien äänimoduulien alapuolella
 * riippuvuuspuussa, joten yksikään tuonti tänne ei saa syntyä — muuten
 * niputus (tools/build-standalone.mjs) menisi kehään.
 *
 * MITÄ TAPAHTUU PALATESSA (omistajan linjaus samassa tilauksessa):
 *  - äänimaisema, visamusiikki ja radio JATKAVAT itsestään: ne ovat
 *    tilaa, eivät tapahtumia, ja niiden hiljaisuus taustalla on vain
 *    tauko.
 *  - KESKEN JÄÄNYT LUENTA EI ALA ITSESTÄÄN. Kertoja jatkaisi keskeltä
 *    lausetta ilman että kukaan kuunteli sen alkua. Luenta jää
 *    tauolle (luentasoittimen paneeli näyttää jatkonapin) tai
 *    pysähtyy kokonaan, ja pelaaja käynnistää sen kuuntelunapista.
 *    Ks. js/lukija.js taustaHiljennaLukija.
 */

/* ------------------------------------------------------------------ */
/* Vaimentajien rekisteri                                              */
/* ------------------------------------------------------------------ */

/** @type {Set<{hiljenna?: Function, palauta?: Function}>} */
const vaimentajat = new Set();

let vahtiTaustalla = false;

/** Onko peli juuri nyt taustalla vahdin mielestä? */
export function taustallaNyt() {
  return vahtiTaustalla;
}

/**
 * Rekisteröi yhden äänilähteen taustavaimennuksen.
 *
 * @param {{hiljenna?: Function, palauta?: Function}} vaimennin
 * @returns {Function} poistaa rekisteröinnin
 */
export function lisaaTaustaVaimennus(vaimennin) {
  if (!vaimennin) return () => {};
  vaimentajat.add(vaimennin);
  // Jos vahti on jo taustalla, uusi tulokas vaikenee heti — muuten
  // taustalla syntynyt äänilähde jäisi ainoana soimaan.
  if (vahtiTaustalla) kutsu(vaimennin.hiljenna);
  return () => vaimentajat.delete(vaimennin);
}

function kutsu(fn) {
  if (typeof fn !== 'function') return;
  try {
    fn();
  } catch {
    /* yhden lähteen virhe ei saa jättää muita soimaan */
  }
}

/* ------------------------------------------------------------------ */
/* Turvaverkko: soittimet, joita yksikään moduuli ei omista            */
/* ------------------------------------------------------------------ */

/*
 * REKISTERÖINTI EI YKSIN RIITÄ. Osa pelin äänistä syntyy suoraan
 * näkymäkoodissa (js/ui.js: "Kuuntele näyte" -napin ääninäyte, joka
 * voi olla kokonainen suora radiolähetys, ja aarteen hihkaisu), eikä
 * niillä ole moduulia, joka voisi rekisteröityä tänne. Ne ovat
 * `new Audio()` -elementtejä, jotka eivät ole DOMissa, joten niitä ei
 * voi myöskään etsiä querySelectorilla.
 *
 * Siksi vahti pitää kirjaa JOKAISESTA soittimesta, jolle play() on
 * kutsuttu: HTMLMediaElement.prototype.play kääritään kerran, ja käärö
 * vain merkitsee elementin muistiin ennen alkuperäistä kutsua. Se ei
 * muuta paluuarvoa, ei nielaise virheitä eikä koske parametreihin.
 *
 * Käärö ei ole tyylivalinta vaan ainoa tapa: elementtiä ei ole missään
 * puussa eikä sen syntyä voi kuunnella. Vaihtoehto olisi ollut viedä
 * jokaiseen äänen luovaan näkymään oma kutsu, ja juuri se jäisi
 * unohtumaan seuraavasta äänestä.
 *
 * PALUUSÄÄNTÖ TURVAVERKOLLE: silmukka jatkaa, kertaluontoinen ei.
 * Silmukka on taustaa (ambienssi, musiikki), kertaluontoinen on
 * tapahtuma (näyte, hihkaisu) — ja tapahtuma, joka katkesi taustalle
 * mentäessä, on ohi. Katkennut soitin saa 'ended'-tapahtuman, jotta
 * sen omistaja siivoaa jälkensä samalla tavalla kuin luonnollisesta
 * lopusta: nappi palaa "Kuuntele"-asentoon ja taustan väistö purkautuu
 * (js/ui.js pysaytaKulttuuriAani, js/luenta.js vapautaPuhuja). Ilman
 * sitä tausta jäisi pysyvästi puheen alle.
 */

/*
 * Kirjanpito on HEIKKO. Soittimet ovat lyhytikäisiä (yksi näyte, yksi
 * luenta, yksi silmukan kierros), ja vahva viittaus pitäisi ne ja
 * niiden puskuroidun äänen muistissa koko istunnon. WeakRef antaa
 * roskienkeruun viedä ne; kuollut viite siivotaan seuraavalla
 * kierroksella. Ilman WeakRefiä (vanha moottori) turvaverkkoa ei ole —
 * rekisteröidyt vaimentajat kattavat silloinkin kaikki pelin omat
 * äänilähteet.
 */
const Heikko = typeof WeakRef === 'function' ? WeakRef : null;
/** WeakRefit soittimiin, joille play() on joskus kutsuttu. */
const soittimet = new Set();
/** Sama joukko jäsenyystestiä varten — silmukka jokaisesta play():stä olisi kallis. */
const tunnetut = typeof WeakSet === 'function' ? new WeakSet() : null;
/** Soittimet, jotka TÄMÄ vahti pysäytti — vahvat viittaukset tauon ajan. */
const vahdinPysayttamat = new Set();

function muistaSoitin(el) {
  if (!el || !Heikko || !tunnetut) return;
  if (tunnetut.has(el)) return;
  tunnetut.add(el);
  soittimet.add(new Heikko(el));
}

/** Elävät soittimet; kuolleet viitteet siivotaan samalla. */
function elavatSoittimet() {
  const elavat = [];
  for (const viite of soittimet) {
    const el = viite.deref();
    if (el) elavat.push(el);
    else soittimet.delete(viite);
  }
  return elavat;
}

function viritaSoitinKaaro() {
  if (typeof HTMLMediaElement !== 'function') return;
  const proto = HTMLMediaElement.prototype;
  const alkuperainen = proto?.play;
  if (typeof alkuperainen !== 'function') return;
  proto.play = function play(...args) {
    muistaSoitin(this);
    return alkuperainen.apply(this, args);
  };
}

viritaSoitinKaaro();

/** Pysäyttää kaiken, mitä rekisteröidyt vaimentajat eivät jo pysäyttäneet. */
function pysaytaLoput() {
  for (const el of elavatSoittimet()) {
    if (el.paused) continue;
    vahdinPysayttamat.add(el);
    try {
      el.pause();
    } catch {
      /* soitin oli jo pysähtynyt tai purettu */
    }
  }
}

/** Silmukat jatkavat, kertaluontoiset saavat loppunsa (ks. paluusääntö). */
function palautaLoput() {
  for (const el of vahdinPysayttamat) {
    try {
      if (el.loop) el.play()?.catch?.(() => { /* seuraava ele yrittää */ });
      else el.dispatchEvent(new Event('ended'));
    } catch {
      /* soitin oli jo purettu — omistaja on jo siivonnut sen */
    }
  }
  vahdinPysayttamat.clear();
}

/* ------------------------------------------------------------------ */
/* Vahdin kaksi käskyä                                                 */
/* ------------------------------------------------------------------ */

/** Peli taustalle: kaikki vaikenee. Palauttaa true, jos tila muuttui. */
export function hiljennaTaustalle() {
  if (vahtiTaustalla) return false;
  vahtiTaustalla = true;
  for (const vaimennin of vaimentajat) kutsu(vaimennin.hiljenna);
  pysaytaLoput();
  return true;
}

/** Peli etualalle: tausta ja radio jatkavat, luenta ei (ks. yllä). */
export function palautaEtualalle() {
  if (!vahtiTaustalla) return false;
  vahtiTaustalla = false;
  for (const vaimennin of vaimentajat) kutsu(vaimennin.palauta);
  palautaLoput();
  return true;
}

/* ------------------------------------------------------------------ */
/* Mistä tieto tulee                                                   */
/* ------------------------------------------------------------------ */

/*
 * NELJÄ LÄHDETTÄ, KOSKA YKSIKÄÄN EI YKSIN KATA KAIKKEA:
 *
 *  - `visibilitychange` on perusta: iOS lähettää sen sekä sovelluksen
 *    taustalle siirtyessä että näytön lukittuessa, työpöytäselain
 *    välilehden vaihtuessa.
 *  - `pagehide` kattaa sivulta poistumisen ja bfcacheen jäämisen.
 *    Vanhemmat iOS-versiot lähettävät sen myös taustalle mennessä
 *    ilman että visibilitychange ehtii ensin.
 *  - `freeze`/`resume` (Page Lifecycle) tulevat, kun selain jäädyttää
 *    piilossa olevan välilehden kokonaan.
 *  - iOS-KUOREN OMA TIETO on tarkin: kuori tietää sovelluksen
 *    elinkaaren eikä arvaa sitä sivun näkyvyydestä. Se lähettää
 *    tapahtumat 'taustalle' ja 'aktivoitui' myös tavallisena
 *    DOM-tapahtumana (ios/Matkakirja/Selain/natiivi-silta.js), joten
 *    tähän ei tarvita js/natiivi.js:n tuontia.
 *
 * Kaikki neljä ohjaavat samaa kaksitilaista vahtia, joten
 * päällekkäiset viestit ovat vaarattomia: toinen "taustalle" on tyhjä
 * kutsu.
 */
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  /*
   * Piilossa avattu sivu (linkki taustavälilehteen, kotivalikon
   * kuvakkeesta käynnistetty mutta heti taustalle jäänyt sovellus) ei
   * saa yhtään tapahtumaa ennen kuin se tulee esiin. Lähtötila luetaan
   * siis suoraan: näin ensimmäinenkään ääni ei lähde soimaan piiloon.
   */
  if (document.hidden) vahtiTaustalla = true;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' || document.hidden) hiljennaTaustalle();
    else palautaEtualalle();
  });
}

if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  const nakyvissa = () => typeof document === 'undefined' || !document.hidden;
  window.addEventListener('pagehide', () => hiljennaTaustalle());
  window.addEventListener('pageshow', () => {
    if (nakyvissa()) palautaEtualalle();
  });
  window.addEventListener('freeze', () => hiljennaTaustalle());
  window.addEventListener('resume', () => {
    if (nakyvissa()) palautaEtualalle();
  });
  window.addEventListener('matkakirja-natiivi', (tapahtuma) => {
    const laji = tapahtuma?.detail?.laji;
    if (laji === 'taustalle') hiljennaTaustalle();
    else if (laji === 'aktivoitui') palautaEtualalle();
  });
}
