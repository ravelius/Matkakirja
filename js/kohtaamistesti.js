/*
 * KEHITTÄJÄN KOHTAAMISLISTA — kaikki aarrekohtaamiset maanosittain, ja
 * jokainen niistä avattavissa hiekkalaatikossa.
 *
 * Omistajan tilaus 5.9.2026 sanatarkasti: *"Tarvitaan joku kehittäjätila
 * missä pääsen testaamaan kaikki aarre kohtaamiset ja niiden tehtävä
 * pelit listasta valitsemalla. Lajittele listat maanosien mukaan."*
 *
 * ── MITÄ AARREKOHTAAMINEN ON KOODISSA ─────────────────────────────
 *
 * Kohtaaminen on TARINAKAAREN kohde (js/packs/tarinakaari.js, aineisto
 * js/tyohuone-kehitys-data.js KAARI_PAKETIT). Sen tunniste on
 * KAUPUNGIN TUNNUS (`praha`, `ateena`), ja pelissä se etenee näin:
 *
 *   1. SAAPUMINEN  kohteen `saapuminen` — isoisän 1873-merkintä, joka
 *      piirtyy matkakirjakorttiin (js/ui.js renderFact).
 *   2. KOHTAAMINEN kohteen `kohtaaminen` — nykyhetki. Laatan tai
 *      lehden tehtävänappi kutsuu game.actionQuiz(), joka pariuttaa
 *      henkilön repliikin ja kysymyksen yhdeksi kortiksi
 *      (js/game.js actionQuiz → kaariTarina). Kuva tulee
 *      js/kohtaamiskuvat-data.js:stä (js/visa.js renderQuiz).
 *   3. TEHTÄVÄPELI kohteen `kysymys` — monivalinta tiimalasilla, kaksi
 *      yritystä (js/game.js KAARI_YRITYKSET, js/visa.js).
 *   4. AARRE      kohteen `aarre` — laatan paljastuskortilla tai
 *      laatattoman löydön tuloskortilla (js/ui.js playTokenReveal,
 *      js/visa.js).
 *
 * Kaupungin manner luetaan maailmankartan omasta taulusta
 * (js/packs/maailmankartta.js cityManner), ja mantereiden nimet ja
 * järjestys tulevat js/game.js:n MANNER_NIMET-taulusta — ei omaa
 * listaa, tai lista ja peli eriytyisivät.
 *
 * ── HIEKKALAATIKKO ────────────────────────────────────────────────
 *
 * Testi ei saa muuttaa pelitilaa (tallenne, raha, päivät, löydetyt
 * aarteet, tietäjäpisteet). Malli on katselutilasta (js/main.js
 * avaaKatselu): siellä kehittäjän kartta pyörii OMASSA Game-oliossaan
 * ja onChange on tyhjä funktio. Sama tehdään tässä kevyemmin:
 *
 *   - testin ajaksi ui.game vaihdetaan KLOONIIN (Game.fromJSON
 *     omasta toJSONista), joten oikeaan Game-olioon ei kosketa
 *     kertaakaan;
 *   - ui.kohtaamistesti-lippu estää js/ui.js:n renderiä kutsumasta
 *     onChangea (tallennus) ja stampPassportia (passin leimat), joten
 *     laitteelle ei kirjoiteta mitään;
 *   - lehden sulkeutuessa ui.game palautetaan ja näkymä piirretään
 *     uudelleen.
 *
 * Peli itse (js/game.js) on ennallaan: kloonaus, siirto ja kohtaamisen
 * avaus tehdään pelin omilla julkisilla toiminnoilla
 * (toJSON/fromJSON, actionKehittajaSiirto, actionQuiz).
 */

import { Game, MANNER_NIMET } from './game.js';
import { kohtaamiskuvaKohteelle } from './kohtaamiskuvat-data.js';
import { packById } from './pack.js';
import { EUROPE_PUZZLES } from './packs/europe-puzzles.js';
import { FOKUSVIRRAT } from './packs/fokusvirrat.js';
import { KAARI_LAUDAT, TARINAKAARI } from './packs/tarinakaari.js';
import { KAARI_PAKETIT } from './tyohuone-kehitys-data.js';
import { html, kehittajaTilaPaalla } from './ui-apurit.js';

/** Kaaren kolme ääneen luettavaa osaa (kysymys jää pelaajan visaksi). */
const KOHTAAMISTESTIN_OSAT = ['saapuminen', 'kohtaaminen', 'aarre'];

/** Lauta, jolta kaupungit, nimet ja mantereet luetaan. */
const KOHTAAMISTESTIN_LAUTA = 'maailmankartta';

/**
 * Henkilön kutsumanimi kuvauksesta, kun tarinakaari ei anna sitä
 * valmiina. Kaari laskee nimen vain peliin päätyville kohteille
 * (js/packs/tarinakaari.js kutsumanimi); listassa ovat myös ne, joilta
 * luennat vielä puuttuvat, joten sama sääntö tarvitaan tässä.
 * Kaava: "<ammatti> <Nimi> <tekee>…" — nimi on alun viimeinen isolla
 * alkava sana.
 */
function kohtaamistestinNimi(kohde) {
  const valmis = TARINAKAARI[kohde.id]?.nimi;
  if (valmis) return valmis;
  const sanat = String(kohde.henkilo ?? '').split(' ').slice(0, 3)
    .map((s) => s.replace(/[,."]/g, ''));
  let nimi = null;
  for (const sana of sanat) if (/^[A-ZÅÄÖ]/u.test(sana)) nimi = sana;
  return nimi;
}

/**
 * Otsikko ilman kaupungin nimeä: kaaren otsikko on muotoa
 * "Praha — kynttilä tyhjässä talossa", ja kaupunki on rivillä jo
 * omana sarakkeenaan.
 */
function kohtaamistestinAihe(otsikko) {
  const osat = String(otsikko ?? '').split('—');
  return (osat.length > 1 ? osat.slice(1).join('—') : osat[0]).trim();
}

/**
 * Kaupungin tehtäväpelin laji. Kohtaamisen oma tehtävä on aina
 * monivalinta, mutta kaupungissa voi olla sen rinnalla pöllön
 * sähketehtävä (js/packs/fokusvirta-*.js `sahketehtava`) tai isoisän
 * piirrospulma (js/packs/europe-puzzles.js). Laji kertoo, kumpi niistä
 * kaupungissa on — muuten pelkkä visa.
 */
function kohtaamistestinLaji(id) {
  if (FOKUSVIRRAT[id]?.sahketehtava) return 'sähke';
  if (EUROPE_PUZZLES.some((pulma) => pulma.city === id)) return 'pulma';
  return 'visa';
}

/**
 * Kaikkien aarrekohtaamisten rivit datasta — ei verkkoa, ei selainta.
 * Yksikkötesti lukee tämän suoraan (tests/kohtaamistesti.test.mjs).
 *
 * @returns {Array<object>} rivi per kohtaaminen
 */
export function kohtaamistestinRivit() {
  const pack = packById(KOHTAAMISTESTIN_LAUTA);
  const mantereet = pack.map?.cityManner ?? {};
  const nimet = new Map((pack.cities ?? []).map((c) => [c.id, c.name]));
  return (KAARI_PAKETIT.kohteet ?? []).map((kohde) => {
    const kuva = kohtaamiskuvaKohteelle(kohde.id);
    const mykistetyt = kohde.mykistetyt ?? [];
    return {
      id: kohde.id,
      kaupunki: nimet.get(kohde.id) ?? kohde.id,
      manner: mantereet[kohde.id] ?? pack.id,
      otsikko: kohde.otsikko ?? '',
      aihe: kohtaamistestinAihe(kohde.otsikko),
      henkilo: kohtaamistestinNimi(kohde),
      laji: kohtaamistestinLaji(kohde.id),
      // Kuva: tarkistettu valokuva ämpärissä vai kaaridatan vanha
      // pergamenttipiirros — vai ei kumpaakaan (js/visa.js renderQuiz).
      kuva: kuva ? 'valokuva' : (kohde.kuva ? 'piirros' : null),
      // Tekstit: kaikki neljä osaa kirjoitettu.
      tekstit: Boolean(kohde.saapuminen && kohde.kohtaaminen
        && kohde.aarre && kohde.kysymys),
      // Luennat: montako kolmesta osasta soi (mykistetty osa on
      // kirjoitettu uusiksi ilman uutta äänitettä).
      luennat: kohde.luennat === false
        ? 0 : KOHTAAMISTESTIN_OSAT.filter((osa) => !mykistetyt.includes(osa)).length,
      // Onko kohtaaminen pelissä: TARINAKAARI suodattaa pois kohteet,
      // joilta luennat puuttuvat kokonaan (js/packs/tarinakaari.js).
      pelissa: Boolean(TARINAKAARI[kohde.id]?.kysymys),
      saapuminen: kohde.saapuminen ?? '',
      kohtaaminen: kohde.kohtaaminen ?? '',
      aarre: kohde.aarre ?? '',
    };
  });
}

/** Puuttuuko riviltä kuva tai teksti (lehden suodatin)? */
export function kohtaamistestinPuutteita(rivi) {
  return !rivi.kuva || !rivi.tekstit;
}

/**
 * Rivit maanosaryhmiksi MANNER_NIMET-järjestyksessä (Eurooppa ensin).
 * Ryhmä syntyy jokaiselle mantereelle, myös tyhjälle — juuri tyhjä
 * ryhmä on se tieto, jota omistaja listalta hakee ("Eurooppa ensin,
 * sitten monistetaan muihin maanosiin").
 *
 * @param {{vainPuuttuvat?: boolean}} [opts]
 * @returns {Array<{manner:string, nimi:string, rivit:Array, kaupunkeja:number}>}
 */
export function kohtaamistestinRyhmat({ vainPuuttuvat = false } = {}) {
  const pack = packById(KOHTAAMISTESTIN_LAUTA);
  const mantereet = pack.map?.cityManner ?? {};
  const kaupunkeja = new Map();
  for (const city of pack.cities ?? []) {
    const manner = mantereet[city.id] ?? pack.id;
    kaupunkeja.set(manner, (kaupunkeja.get(manner) ?? 0) + 1);
  }
  const kaikki = kohtaamistestinRivit();
  return Object.keys(MANNER_NIMET).map((manner) => {
    // Ryhmän sisällä aakkosjärjestys: lista on läpikäytävä työjono,
    // ja aakkoset ovat ainoa järjestys, josta kehittäjä muistaa mihin
    // jäi. Sama järjestys ohjaa Seuraava-nappia.
    const omat = kaikki.filter((rivi) => rivi.manner === manner)
      .sort((a, b) => a.kaupunki.localeCompare(b.kaupunki, 'fi'));
    return {
      manner,
      nimi: MANNER_NIMET[manner]?.nimi ?? manner,
      rivit: vainPuuttuvat ? omat.filter(kohtaamistestinPuutteita) : omat,
      kohtaamisia: omat.length,
      kaupunkeja: kaupunkeja.get(manner) ?? 0,
    };
  });
}

/* ==================== HIEKKALAATIKKO ==================== */

/**
 * Testipeli oikean pelin rinnalle. Kaarilaudalla se on KLOONI
 * nykyisestä tilanteesta (sama kartta, samat laatat, sama raha), joten
 * kohtaaminen näyttää täsmälleen siltä kuin pelissä. Muualla — esim.
 * aloitusnäytön maailmalaudalla, jolla kaarta ei ole — tilalle
 * rakennetaan tyhjä maailmankarttapeli.
 */
function kohtaamistestinPeli(peli) {
  if (peli && KAARI_LAUDAT.has(peli.pack?.id)) {
    try {
      const kopio = Game.fromJSON(JSON.parse(JSON.stringify(peli.toJSON())));
      if (kopio) return kopio;
    } catch {
      /* kloonaus ei onnistunut — tehdään tyhjä testipeli alta */
    }
  }
  const pelaaja = peli?.player ?? {};
  return new Game({
    players: [{
      name: pelaaja.name ?? 'Fogg',
      color: pelaaja.color ?? '#c9a227',
      start: null,
    }],
    pack: packById(KOHTAAMISTESTIN_LAUTA),
  });
}

/** Lehden ja hiekkalaatikon tila. Yksi kerrallaan, kuten lehtiäkin. */
const tila = {
  ui: null,
  sisalto: null,
  selite: null,
  oikeaPeli: null,
  jono: [],
  kohdalla: -1,
  vainPuuttuvat: false,
  auki: new Set(['europe']),
  kuuntelija: null,
};

/**
 * Vaihtaa pelin testikloonaan ja sulkee tallennuksen. Kutsutaan vasta
 * ensimmäisen kohtaamisen avauksessa: pelkkä listan selailu ei kosketa
 * peliin lainkaan.
 */
function aloitaHiekkalaatikko(ui) {
  if (tila.oikeaPeli) return;
  tila.oikeaPeli = ui.game;
  ui.kohtaamistesti = true;
  ui.game = kohtaamistestinPeli(ui.game);
}

/** Palauttaa oikean pelin ja piirtää näkymän uudelleen. */
function lopetaHiekkalaatikko(ui) {
  if (!tila.oikeaPeli) return;
  ui.game = tila.oikeaPeli;
  tila.oikeaPeli = null;
  ui.kohtaamistesti = false;
  ui.render();
}

/**
 * Avaa yhden kohtaamisen pelin omaa polkua pitkin: nappula kaupunkiin
 * (sama oikotie kuin kehittäjäsiirrossa) ja sen jälkeen actionQuiz,
 * joka pariuttaa henkilön repliikin ja kysymyksen kortiksi. Kortin
 * piirtää js/visa.js kuten pelissä.
 */
function avaaKohtaaminen(ui, rivi) {
  if (!rivi?.pelissa) return false;
  aloitaHiekkalaatikko(ui);
  const peli = ui.game;
  const avain = `${peli.pack.id}:${rivi.id}`;
  // Sama kohtaaminen saa auketa listalta yhä uudelleen: yritykset ja
  // mahdollinen lukko nollataan ennen jokaista testiä.
  peli.kaariYritykset?.delete(avain);
  peli.aarreLukot?.delete(avain);
  // Tervehdys kirjoittuu joka kerta — pelissä se näytetään kerran per
  // istunto (js/visa.js kohtaamisetNahty), testissä aina.
  ui.kohtaamisetNahty?.delete(avain);
  /*
   * doAction ohittaa kutsun, jos edellinen teko on vielä kesken
   * (js/ui.js run: `if (this.busy) return`). Seuraava-nappi osuu juuri
   * siihen hetkeen — edellisen kortin sulku on vielä ajossa — joten
   * odotetaan vuoro pienissä askelissa. Kattona kolme sekuntia: jumi
   * ei saa jäädä pyörimään ajastimeksi.
   */
  let jaljella = 25;
  const yrita = () => {
    if (ui.dead) return;
    if (ui.busy && jaljella > 0) {
      jaljella -= 1;
      setTimeout(yrita, 120);
      return;
    }
    ui.doAction(() => {
      const siirto = peli.actionKehittajaSiirto(rivi.id);
      return siirto.ok ? peli.actionQuiz() : siirto;
    });
  };
  yrita();
  return true;
}

/* ==================== LEHDEN PIIRTO ==================== */

/** Merkkirivi: kuva, tekstit, luenta ja tehtäväpelin laji. */
function piirraKohtaamisMerkit(rivi) {
  const kotelo = html('span', 'kt-merkit');
  kotelo.appendChild(html('span', `kt-merkki kt-laji kt-laji-${rivi.laji}`, rivi.laji));
  kotelo.appendChild(html('span', `kt-merkki ${rivi.kuva ? 'on' : 'ei'}`,
    rivi.kuva === 'valokuva' ? 'kuva' : (rivi.kuva === 'piirros' ? 'piirros' : 'ei kuvaa')));
  kotelo.appendChild(html('span', `kt-merkki ${rivi.tekstit ? 'on' : 'ei'}`,
    rivi.tekstit ? 'tekstit' : 'ei tekstejä'));
  kotelo.appendChild(html('span', `kt-merkki ${rivi.luennat ? 'on' : 'ei'}`,
    rivi.luennat ? `luenta ${rivi.luennat}/3` : 'ei luentaa'));
  if (!rivi.pelissa) kotelo.appendChild(html('span', 'kt-merkki ei', 'ei vielä pelissä'));
  return kotelo;
}

/** Yhden kohtaamisen rivi listassa. */
function piirraKohtaamisrivi(ui, rivi) {
  const nappi = html('button', 'kt-rivi');
  nappi.type = 'button';
  nappi.dataset.kohtaaminen = rivi.id;
  const ylarivi = html('span', 'kt-rivi-yla');
  ylarivi.appendChild(html('b', 'kt-kaupunki', rivi.kaupunki));
  if (rivi.henkilo) ylarivi.appendChild(html('span', 'kt-henkilo', rivi.henkilo));
  nappi.appendChild(ylarivi);
  nappi.appendChild(html('span', 'kt-aihe', rivi.aihe));
  nappi.appendChild(piirraKohtaamisMerkit(rivi));
  nappi.addEventListener('click', () => naytaKohtaamiskohde(ui, rivi.id));
  return nappi;
}

/** Mannerryhmä: otsikkonappi ja sen alla rivit. */
function piirraKohtaamisryhma(ui, ryhma) {
  const kotelo = html('section', 'kt-ryhma');
  const otsikko = html('button', 'kt-ryhma-otsikko');
  otsikko.type = 'button';
  const auki = tila.auki.has(ryhma.manner);
  otsikko.setAttribute('aria-expanded', String(auki));
  otsikko.appendChild(html('span', 'kt-ryhma-nimi', ryhma.nimi));
  otsikko.appendChild(html('span', 'kt-ryhma-luku',
    `${ryhma.rivit.length}/${ryhma.kaupunkeja} kaupunkia`));
  kotelo.appendChild(otsikko);
  const lista = html('div', 'kt-rivit');
  lista.hidden = !auki;
  if (!ryhma.rivit.length) {
    lista.appendChild(html('p', 'kt-tyhja', ryhma.kohtaamisia
      ? 'Ei suodattimeen osuvia kohtaamisia.'
      : 'Ei vielä yhtään kohtaamista tällä mantereella.'));
  }
  for (const rivi of ryhma.rivit) lista.appendChild(piirraKohtaamisrivi(ui, rivi));
  kotelo.appendChild(lista);
  otsikko.addEventListener('click', () => {
    const nyt = tila.auki.has(ryhma.manner);
    if (nyt) tila.auki.delete(ryhma.manner);
    else tila.auki.add(ryhma.manner);
    otsikko.setAttribute('aria-expanded', String(!nyt));
    lista.hidden = nyt;
    // Luokka pois sulkiessa, jotta avausanimaatio käynnistyy uudelleen
    // joka kerta — sama luokka uudestaan ei toistaisi animaatiota.
    lista.classList.toggle('kt-avautuu', !nyt);
  });
  return kotelo;
}

/** Koko lista maanosittain. */
function naytaKohtaamislista(ui) {
  const ryhmat = kohtaamistestinRyhmat({ vainPuuttuvat: tila.vainPuuttuvat });
  tila.jono = ryhmat.flatMap((r) => r.rivit).filter((r) => r.pelissa);
  tila.kohdalla = -1;
  const yhteensa = ryhmat.reduce((s, r) => s + r.rivit.length, 0);
  const ilman = ryhmat.flatMap((r) => r.rivit).filter(kohtaamistestinPuutteita).length;
  tila.selite.textContent = `${yhteensa} kohtaamista · ${ilman} vailla kuvaa tai tekstiä`;
  tila.sisalto.replaceChildren(...ryhmat.map((ryhma) => piirraKohtaamisryhma(ui, ryhma)));
}

/** Yhden kohtaamisen kortti: saapumisteksti ja testin napit. */
function naytaKohtaamiskohde(ui, id) {
  // Jono on lehden oma järjestys (maanosat, aakkoset) — Seuraava
  // seuraa listaa, ei datan kirjoitusjärjestystä.
  const kaikki = kohtaamistestinRyhmat().flatMap((ryhma) => ryhma.rivit);
  const rivi = kaikki.find((r) => r.id === id);
  if (!rivi) return;
  if (!tila.jono.length) tila.jono = kaikki.filter((r) => r.pelissa);
  tila.kohdalla = tila.jono.findIndex((r) => r.id === id);
  tila.selite.textContent = rivi.otsikko;

  const kortti = html('div', 'kt-kohde');
  kortti.appendChild(piirraKohtaamisMerkit(rivi));
  // Saapuminen: isoisän matkakirjamerkintä 1873. Sama teksti kirjoittuu
  // matkakirjakorttiin kartalla, kun nappula siirtyy kaupunkiin.
  kortti.appendChild(html('p', 'kt-osa-nimi', 'Saapuminen — isoisän matkakirjasta 1873'));
  kortti.appendChild(html('p', 'kt-teksti', rivi.saapuminen));
  if (rivi.laji !== 'visa') {
    kortti.appendChild(html('p', 'kt-huomio', rivi.laji === 'sähke'
      ? 'Kaupungissa on myös pöllön sähketehtävä (vihreä piste lehdessä).'
      : 'Kaupungissa on myös isoisän piirrospulma (aarteen jälkeen).'));
  }

  const napit = html('div', 'kt-napit');
  const avaa = html('button', 'primary kt-avaa',
    rivi.henkilo ? `Tapaa ${rivi.henkilo}` : 'Avaa kohtaaminen');
  avaa.type = 'button';
  avaa.disabled = !rivi.pelissa;
  avaa.addEventListener('click', () => avaaKohtaaminen(ui, rivi));
  napit.appendChild(avaa);

  const seuraava = html('button', 'ghost kt-seuraava', 'Seuraava');
  seuraava.type = 'button';
  seuraava.disabled = tila.jono.length < 2;
  seuraava.addEventListener('click', () => {
    if (!tila.jono.length) return;
    const uusi = tila.jono[(tila.kohdalla + 1 + tila.jono.length) % tila.jono.length];
    naytaKohtaamiskohde(ui, uusi.id);
    avaaKohtaaminen(ui, uusi);
  });
  napit.appendChild(seuraava);

  const takaisin = html('button', 'ghost kt-takaisin', 'Takaisin listaan');
  takaisin.type = 'button';
  takaisin.addEventListener('click', () => naytaKohtaamislista(ui));
  napit.appendChild(takaisin);
  kortti.appendChild(napit);

  if (!rivi.pelissa) {
    kortti.appendChild(html('p', 'kt-huomio',
      'Tekstit ovat valmiit, mutta luentoja ei ole vielä generoitu — '
      + 'kohde ei siksi ole pelissä (js/packs/tarinakaari.js suodattaa sen pois).'));
  }
  tila.sisalto.replaceChildren(kortti);
}

/* ==================== AVAUS JA SULKU ==================== */

/**
 * Kohtaamiset-lehti kehittäjän ratasvalikosta.
 *
 * Lehti jää AUKI koko testin ajaksi: pelin oma tehtäväkortti
 * (#quiz-dialog) avautuu sen päälle, ja kun kortti sulkeutuu, lista on
 * heti taas näkyvissä. Siksi tämä on oma dialoginsa eikä kehittäjän
 * liitelehti — liitelehti asuu #arrival-dialogissa, jonka js/ui.js:n
 * render sulkee heti kun pelivaihe ei ole 'offer'.
 */
export function avaaKohtaamistesti(ui) {
  if (!kehittajaTilaPaalla()) return;
  const dialogi = document.getElementById('kohtaamistesti-dialog');
  if (!dialogi) return;
  tila.ui = ui;
  tila.sisalto = document.getElementById('kohtaamistesti-sisalto');
  tila.selite = document.getElementById('kohtaamistesti-selite');
  if (!tila.sisalto || !tila.selite) return;

  const suodatin = document.getElementById('kohtaamistesti-suodatin');
  if (suodatin && !suodatin.dataset.kytketty) {
    suodatin.dataset.kytketty = '1';
    suodatin.addEventListener('click', () => {
      tila.vainPuuttuvat = !tila.vainPuuttuvat;
      suodatin.setAttribute('aria-pressed', String(tila.vainPuuttuvat));
      naytaKohtaamislista(tila.ui);
    });
  }
  if (suodatin) suodatin.setAttribute('aria-pressed', String(tila.vainPuuttuvat));

  const sulje = document.getElementById('kohtaamistesti-sulje');
  if (sulje && !sulje.dataset.kytketty) {
    sulje.dataset.kytketty = '1';
    sulje.addEventListener('click', () => dialogi.close());
  }
  if (!dialogi.dataset.kytketty) {
    dialogi.dataset.kytketty = '1';
    // Lehden sulku päättää hiekkalaatikon: oikea peli takaisin ja
    // näkymä uudelleen. Sama polku Esc-näppäimeltä ja Sulje-napista.
    dialogi.addEventListener('close', () => {
      if (tila.kuuntelija) {
        document.getElementById('quiz-dialog')?.removeEventListener('close', tila.kuuntelija);
        tila.kuuntelija = null;
      }
      if (tila.ui) lopetaHiekkalaatikko(tila.ui);
    });
  }
  // Tehtäväkortin sulkeutuminen palauttaa listan kortin ajan tasalle:
  // merkit lasketaan datasta, mutta kortin napit halutaan takaisin.
  if (!tila.kuuntelija) {
    tila.kuuntelija = () => {
      if (!dialogi.open || tila.kohdalla < 0) return;
      naytaKohtaamiskohde(tila.ui, tila.jono[tila.kohdalla]?.id);
    };
    document.getElementById('quiz-dialog')?.addEventListener('close', tila.kuuntelija);
  }

  naytaKohtaamislista(ui);
  if (!dialogi.open) dialogi.showModal();
}
