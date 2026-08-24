/*
 * FOKUSMOODIN ANNOSTELUVIRTA — kaupungin esittely kortteina kartan päällä.
 *
 * Raamatun osio "Fokusmoodi", kohta ANNOSTELU (omistaja 24.8.2026):
 * uuteen kaupunkiin saavuttaessa esittely alkaa AUTOMAATTISESTI, ja
 * kulku on kuusivaiheinen:
 *
 *   1 matkakirja   muutama lause isoisän äänellä + VANHA kuva
 *   2 pöllö        nykypäivän huomio + UUSI kuva (herokuva)
 *   3 valinta      pöllö kysyy 2–3 painikkeella, mikä kiinnostaa
 *   4 täky         syvennys + kuva → MINIVISA → palkkio → takaisin 3:een
 *   5 oppitunti    nosto, joka pohjustaa varsinaista kysymystä
 *   6 kohtaaminen  paikallinen esittäytyy → nykyinen laattakysymys
 *
 * ETENEMINEN (sama osio): vähintään YKSI täky on tehtävä ennen pääsyä
 * aarrekysymyksen luo; loput ovat vapaaehtoisia ja tuovat lisää rahaa.
 * Aarteen jälkeen alkaa vapaa tutkinta, ja vasta silloin kaupungin lehti
 * aukeaa — sitä ennen lehtinapit ohjaavat takaisin virtaan (LEHTILUKKO
 * alla).
 *
 * EI KOKO RUUDUN MODAALIA. Kortti kelluu karttapinnan alareunassa ja
 * kartta näkyy sen takaa — juuri se on fokusmoodin idea: kartta on
 * näkymä, teksti on annos sen päällä. Kuvat suurenevat napautuksesta
 * pelin omalla katselimella (ui.openLightbox), samalla kuin lehdissä.
 *
 * MITÄ TÄMÄ MODUULI EI TEE. Se ei kosketa laattamekaniikkaa: vaiheen 6
 * nappi kutsuu tismalleen samaa game.actionQuizia kuin saapumiskortin
 * "Tapaa …" -nappi (js/ui.js), joten varsinainen kysymys, aarre,
 * uusinnat ja palkkiot ovat ennallaan. Se ei myöskään koske
 * kaupunkeihin, joilla ei ole fokusvirtadataa (js/packs/fokusvirrat.js),
 * eikä mihinkään kaupunkiin fokusmoodin ollessa pois päältä.
 *
 * OMA TYYLITIEDOSTO (css/fokusvirta.css, ladataan täältä): css/styles.css
 * on toisen työvaiheen hallussa, eikä yhteen tiedostoon kirjoita kaksi
 * tekijää yhtä aikaa — sama ratkaisu kuin radiosoittimella
 * (js/linssit/radiosoitin.js lataaTyyli).
 */

import { fokusmoodiPaalla, html, jaaKappaleiksi, TOAST_MS } from './ui-apurit.js';
import { asetaKuva, julisteUrl } from './media.js';
import { valokuvaUrl, valokuvaVara, valokuvaSuurennos } from './packs/africa-valokuvat.js';
import { kaupunginJuliste } from './packs/julisteet.js';
import { fokusvirtaKaupungille } from './packs/fokusvirrat.js';
import { natiiviVastaus } from './natiivi.js';
import { sfx } from './sound.js';

/*
 * MINIVISAN PALKKIO. Raamatun osio "Aarteet ja eteneminen" antaa pienen
 * paikallisaarteen tasoksi ~100–250 puntaa; minivisa on sitä pienempi
 * lämmittely, ja lähin olemassa oleva vertailukohta on tutkimisvastauksen
 * löytöpalkkio (js/game.js EXPLORE_REWARD = 50). Luku on tässä yhtenä
 * vakiona, jotta annostelun tasoa voi säätää yhdestä paikasta.
 */
export const TAKY_PALKKIO = 50;

/** Virran vaiheet järjestyksessä. Viimeinen on "virta pelattu läpi". */
export const FOKUSVIRRAN_VAIHEET = Object.freeze([
  'matkakirja', 'pollo', 'valinta', 'taky', 'oppitunti', 'kohtaaminen', 'valmis',
]);

/* ==================== TILAKONE (puhdas, DOM:iton) ==================== */

/** Uuden kaupungin lähtötila: ensimmäinen kortti, ei yhtään täkyä. */
export function fokusvirtaAlkutila() {
  return { vaihe: 'matkakirja', taky: null, tehdyt: [] };
}

/**
 * Siivoaa tallennuksesta luetun tilan sisältöä vasten.
 *
 * Tallennus voi olla vanhempi kuin sisältö: täky on voitu nimetä
 * uudelleen tai poistaa, ja silloin virta jäisi roikkumaan vaiheeseen,
 * jonka sisältöä ei ole. Tuntematon vaihe ja tuntemattomat täkytunnukset
 * pudotetaan, ja avoin täky ilman sisältöä palauttaa valintaan.
 */
export function fokusvirtaSiivoa(tila, data) {
  const tunnukset = new Set((data?.takyt ?? []).map((t) => t.id));
  const vaihe = FOKUSVIRRAN_VAIHEET.includes(tila?.vaihe) ? tila.vaihe : 'matkakirja';
  const tehdyt = (Array.isArray(tila?.tehdyt) ? tila.tehdyt : []).filter((id) => tunnukset.has(id));
  const taky = tunnukset.has(tila?.taky) ? tila.taky : null;
  if (vaihe === 'taky' && !taky) return { vaihe: 'valinta', taky: null, tehdyt };
  return { vaihe, taky, tehdyt };
}

/** Onko portti aarrekysymykselle auki (ETENEMINEN: vähintään yksi täky)? */
export function fokusvirtaPorttiAuki(tila, data) {
  const vaadittuja = data?.valinta?.vaadittuja ?? 1;
  return (tila?.tehdyt?.length ?? 0) >= vaadittuja;
}

/** Vielä valittavissa olevat täyt (tehtyjä ei tarjota uudelleen). */
export function fokusvirtaJaljella(tila, data) {
  const tehdyt = new Set(tila?.tehdyt ?? []);
  return (data?.takyt ?? []).filter((t) => !tehdyt.has(t.id));
}

/**
 * Tilakoneen ainoa siirtymä. Palauttaa UUDEN tilan; kelvoton teko
 * palauttaa tilan muuttumattomana, eikä mikään siirtymä muokkaa
 * annettua oliota.
 *
 * Teot: 'jatka' | { tyyppi: 'taky', id } | 'visa' | 'aarteelle' | 'kysymys'
 *
 * MIKSI 'visa' MERKITSEE TÄYN TEHDYKSI RIIPPUMATTA VASTAUKSESTA:
 * portti mittaa sitä, onko pelaaja kuunnellut yhden tarinan, ei sitä
 * osasiko hän. Väärä vastaus jättäisi muuten pelaajan lukkoon
 * kaupunkiin, jonka kaikki täyt on jo käytetty (minitehtävään vastataan
 * vain kerran, js/game.js actionMinitehtava).
 */
export function fokusvirtaSiirto(tila, teko, data) {
  const nyt = fokusvirtaSiivoa(tila, data);
  const t = typeof teko === 'string' ? { tyyppi: teko } : (teko ?? {});
  switch (nyt.vaihe) {
    case 'matkakirja':
      return t.tyyppi === 'jatka' ? { ...nyt, vaihe: 'pollo' } : nyt;
    case 'pollo':
      return t.tyyppi === 'jatka' ? { ...nyt, vaihe: 'valinta' } : nyt;
    case 'valinta':
      if (t.tyyppi === 'taky') {
        const kelpaa = fokusvirtaJaljella(nyt, data).some((x) => x.id === t.id);
        return kelpaa ? { ...nyt, vaihe: 'taky', taky: t.id } : nyt;
      }
      if (t.tyyppi === 'aarteelle' && fokusvirtaPorttiAuki(nyt, data)) {
        return { ...nyt, vaihe: 'oppitunti', taky: null };
      }
      return nyt;
    case 'taky':
      if (t.tyyppi === 'visa') {
        return nyt.tehdyt.includes(nyt.taky)
          ? nyt : { ...nyt, tehdyt: [...nyt.tehdyt, nyt.taky] };
      }
      if (t.tyyppi === 'jatka') return { ...nyt, vaihe: 'valinta', taky: null };
      return nyt;
    case 'oppitunti':
      return t.tyyppi === 'jatka' ? { ...nyt, vaihe: 'kohtaaminen' } : nyt;
    case 'kohtaaminen':
      return t.tyyppi === 'kysymys' ? { ...nyt, vaihe: 'valmis' } : nyt;
    default:
      return nyt;
  }
}

/* ==================== TILAN SÄILYTYS PELITALLENTEESSA ==================== */

/** Tallennusavain: sama kaupunki eri laudalla on eri matka. */
function tilaAvain(game, city) {
  return `${game.pack.id}:${city.id}`;
}

/** Kaupungin virran tila pelitallenteesta (aina siivottuna). */
export function fokusvirtaTila(game, city, data) {
  const tallessa = game?.fokusvirrat?.[tilaAvain(game, city)];
  return fokusvirtaSiivoa(tallessa ?? fokusvirtaAlkutila(), data);
}

/** Kirjaa tilan pelitallenteeseen. Tallennuksen laukaisee kutsuja. */
export function asetaFokusvirtaTila(game, city, tila) {
  if (!game) return;
  (game.fokusvirrat ??= {})[tilaAvain(game, city)] = tila;
}

/* ==================== KYTKENTÄ PELIIN ==================== */

/**
 * Onko tällä kaupungilla fokusvirta juuri nyt käytössä?
 *
 * Kolme ehtoa, kaikki pakolliset: fokusmoodi päällä (laitekohtainen
 * kytkin, js/ui-apurit.js), kaupungilla on sisältö, ja pelaaja on
 * ihminen. Muuten palautetaan null ja kaikki toimii kuten ennenkin.
 */
export function fokusvirtaSisalto(ui, city) {
  if (!city || !ui?.game || ui.game.player?.isBot) return null;
  if (!fokusmoodiPaalla()) return null;
  return fokusvirtaKaupungille(city.id);
}

/**
 * LEHTILUKKO. Fokusmoodissa kaupungin lehti aukeaa vasta, kun laatan
 * aarre on löydetty (Raamattu, ETENEMINEN: *"Aarteen jälkeen vapaa
 * tutkinta: kaupunki- ja maalehdet aukeavat"*).
 *
 * Lukon mitta on laatta: niin kauan kuin laatta on kääntämättä,
 * lehtinapit ohjaavat virtaan. Kun laatta on käännetty — löytyi sen
 * alta mitä tahansa — lukko aukeaa lopullisesti. Väärä vastaus ei siis
 * jätä pelaajaa umpikujaan: laatta jää paikalleen ja kysymyksen voi
 * yrittää uudelleen, ja lehti odottaa yhä toisella puolella.
 */
export function fokusvirtaLukitseeLehden(ui, city) {
  const data = fokusvirtaSisalto(ui, city);
  if (!data) return false;
  return Boolean(ui.game.tokens?.has(city.id));
}

/**
 * KYTKENTÄKOHTA js/ui.js:n openArrivalissa.
 *
 * Palauttaa true, kun fokusvirta ottaa lehden paikan: silloin
 * openArrival palaa heti eikä saapumiskorttia avata lainkaan. Sama
 * kutsu palvelee sekä alanapin Tutki-nappia että kaikkia muita lehden
 * avauskohtia — yksi portti, ei kuutta.
 */
export function fokusvirtaOhittaaLehden(ui, city) {
  if (!fokusvirtaLukitseeLehden(ui, city)) return false;
  avaaFokusvirta(ui, city);
  return true;
}

/**
 * KYTKENTÄKOHTA js/ui.js:n renderissä (paivitaTutkiSykkeen jälkeen).
 *
 * Fokusmoodissa esittely alkaa itsestään, kun pelaaja saapuu
 * kaupunkiin — tämä on Raamatussa nimetty poikkeus "mikään ei ponnahda
 * ruudulle" -sääntöön. Saapuminen luetaan samasta merkistä kuin
 * Tutki-napin syke (ui.lehtitila.tutkiSyke), ja avaus tehdään kerran
 * istuntoa ja kaupunkia kohti: pelaaja saa sulkea kortin ilman että se
 * ilmestyy takaisin joka piirrossa.
 */
export function fokusvirtaSaapuminen(ui) {
  const city = ui?.game?.cityOf?.();
  if (!city || !fokusvirtaLukitseeLehden(ui, city)) return;
  const avain = `${ui.game.pack.id}:${city.id}`;
  if (ui.lehtitila?.tutkiSyke !== avain) return;
  ui.fokusvirtaAvattu ??= new Set();
  if (ui.fokusvirtaAvattu.has(avain)) return;
  ui.fokusvirtaAvattu.add(avain);
  avaaFokusvirta(ui, city);
}

/* ==================== KORTTI ==================== */

const TYYLIN_TUNNUS = 'fokusvirta-tyyli';

/** Oma tyylitiedosto sivulle, jos sitä ei vielä ole. */
function lataaTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  // Yhden tiedoston versiossa erillistä linkkiä ei ole: tyylit ovat
  // silloin jo sivun <style>-lohkossa (tools/build-standalone.mjs).
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('fokusvirta.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/** Sulkee kortin. Ei kosketa virran tilaan — se on jo tallessa. */
export function suljeFokusvirta(ui) {
  ui.fokusvirtaKortti?.remove();
  ui.fokusvirtaKortti = null;
}

/**
 * Avaa (tai päivittää) kortin kaupungin virran nykyiseen vaiheeseen.
 * Kutsuttavissa milloin tahansa: kortti rakennetaan aina uudestaan
 * tilasta, joten sama kutsu sekä avaa että piirtää uudelleen.
 */
export function avaaFokusvirta(ui, city) {
  const data = fokusvirtaSisalto(ui, city);
  if (!data) return false;
  lataaTyyli();
  const tila = fokusvirtaTila(ui.game, city, data);
  piirraKortti(ui, city, data, tila);
  return true;
}

/** Kirjaa uuden tilan, tallentaa pelin ja piirtää kortin uudelleen. */
function siirry(ui, city, data, teko) {
  const tila = fokusvirtaSiirto(fokusvirtaTila(ui.game, city, data), teko, data);
  asetaFokusvirtaTila(ui.game, city, tila);
  ui.onChange?.(ui.game);
  piirraKortti(ui, city, data, tila);
  return tila;
}

/** Kortin runko: sama kehys joka vaiheessa, sisältö vaihtuu. */
function piirraKortti(ui, city, data, tila) {
  if (typeof document === 'undefined') return;
  suljeFokusvirta(ui);
  const koti = document.querySelector('.map-pane') ?? document.body;
  const kortti = html('div', 'fokusvirta-kortti');
  kortti.setAttribute('role', 'group');
  kortti.setAttribute('aria-label', `${city.name}: esittely`);

  const sulje = html('button', 'fokusvirta-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje esittely');
  sulje.addEventListener('click', () => {
    sfx.play('paper');
    suljeFokusvirta(ui);
    /*
     * Vanha tallennus voi herätä tarjousvaiheeseen, jossa kortin sulku
     * päättää vuoron — sama sopimus kuin saapumiskortin sulkunapilla
     * (js/ui.js arrival-no).
     */
    if (ui.game.phase === 'offer') ui.doAction(() => ui.game.actionSkipQuiz());
  });
  kortti.appendChild(sulje);

  const sisalto = html('div', 'fokusvirta-sisalto');
  kortti.appendChild(sisalto);
  koti.appendChild(kortti);
  ui.fokusvirtaKortti = kortti;

  switch (tila.vaihe) {
    case 'matkakirja': piirraMatkakirja(ui, city, data, sisalto); break;
    case 'pollo': piirraPollo(ui, city, data, sisalto); break;
    case 'taky': piirraTaky(ui, city, data, tila, sisalto); break;
    case 'oppitunti': piirraOppitunti(ui, city, data, sisalto); break;
    case 'kohtaaminen':
    case 'valmis': piirraKohtaaminen(ui, city, data, sisalto); break;
    default: piirraValinta(ui, city, data, tila, sisalto); break;
  }
}

/** Otsikkorivi: kuka puhuu. */
function otsikko(kohde, ylarivi, teksti) {
  if (ylarivi) kohde.appendChild(html('p', 'fokusvirta-ylarivi', ylarivi));
  if (teksti) kohde.appendChild(html('h3', 'fokusvirta-otsikko', teksti));
}

/**
 * Kuva kortille. Napautus avaa pelin oman suurennoksen (ui.openLightbox)
 * — sama katselin kuin lehdissä, joten kuvateksti ja lähde näkyvät
 * suurenakin (CC BY vaatii tekijän maininnan myös siellä).
 */
function piirraKuva(ui, kohde, kuva) {
  if (!kuva) return;
  const nappi = html('button', 'fokusvirta-kuva');
  nappi.type = 'button';
  nappi.title = 'Katso kuva suurempana';
  const img = document.createElement('img');
  img.alt = kuva.selite ?? '';
  img.loading = 'lazy';
  img.draggable = false;
  if (kuva.ampari) {
    asetaKuva(img, julisteUrl(kuva.ampari), null);
  } else {
    asetaKuva(img, valokuvaUrl(kuva.tiedosto, 900), valokuvaVara(kuva.tiedosto, 900));
  }
  nappi.appendChild(img);
  nappi.addEventListener('click', () => {
    const suuri = kuva.ampari
      ? julisteUrl(kuva.ampari) : valokuvaSuurennos(kuva.tiedosto, 1600);
    ui.openLightbox(null, img.alt, suuri,
      [{ src: suuri, caption: kuva.selite ?? '', lahde: kuva.lahde ?? '' }]);
  });
  kohde.appendChild(nappi);
  const kuvateksti = html('p', 'fokusvirta-kuvateksti');
  kuvateksti.append(
    html('span', 'fokusvirta-kuvaselite', kuva.selite ?? ''),
    html('span', 'fokusvirta-kuvalahde', kuva.lahde ?? ''),
  );
  kohde.appendChild(kuvateksti);
}

/**
 * Annosteltu teksti kappaleiksi.
 *
 * EI lehden piirraLeipaa: se lihavoi kappaleen neljä ensimmäistä sanaa
 * (lehtitaiton aloitus), ja pöllön repliikki alkaa lainausmerkillä —
 * lihavoitu `"Isoisäsi ei koskaan` näyttäisi virheeltä. Kappalejako on
 * silti sama (jaaKappaleiksi), joten kirjoittajan omat rivinvaihdot
 * pitävät myös täällä.
 */
function piirraTeksti(kohde, teksti) {
  const leipa = html('div', 'fokusvirta-teksti');
  for (const kappale of jaaKappaleiksi(teksti)) {
    leipa.appendChild(html('p', '', kappale));
  }
  kohde.appendChild(leipa);
  return leipa;
}

/** Napit kortin alalaitaan. */
function piirraNapit(kohde, napit) {
  const rivi = html('div', 'fokusvirta-napit');
  for (const n of napit) rivi.appendChild(n);
  kohde.appendChild(rivi);
}

/** Yksi nappi: teksti, luokka ja toiminto. */
function nappi(teksti, luokka, toiminto, este = null) {
  const el = html('button', luokka, teksti);
  el.type = 'button';
  if (este) {
    el.disabled = true;
    el.title = este;
  } else {
    el.addEventListener('click', toiminto);
  }
  return el;
}

/* ---------- vaihe 1 ---------- */
function piirraMatkakirja(ui, city, data, kohde) {
  otsikko(kohde, 'Matkapäiväkirjasta', data.matkakirja.paikkarivi);
  piirraKuva(ui, kohde, data.matkakirja.kuva);
  piirraTeksti(kohde, data.matkakirja.teksti);
  piirraNapit(kohde, [nappi('Jatka', 'primary', () => {
    sfx.play('paper');
    siirry(ui, city, data, 'jatka');
  })]);
}

/* ---------- vaihe 2 ---------- */
function piirraPollo(ui, city, data, kohde) {
  otsikko(kohde, 'Viisas Pöllö', null);
  piirraKuva(ui, kohde, data.pollo.kuva);
  piirraTeksti(kohde, data.pollo.teksti);
  piirraNapit(kohde, [nappi('Jatka', 'primary', () => {
    sfx.play('paper');
    siirry(ui, city, data, 'jatka');
  })]);
}

/* ---------- vaihe 3 ---------- */
function piirraValinta(ui, city, data, tila, kohde) {
  otsikko(kohde, 'Viisas Pöllö', data.valinta?.kysymys ?? 'Mistä haluaisit kuulla?');
  const jaljella = fokusvirtaJaljella(tila, data);
  const napit = jaljella.map((taky) => nappi(taky.nappi, '', () => {
    sfx.play('paper');
    siirry(ui, city, data, { tyyppi: 'taky', id: taky.id });
  }));
  const auki = fokusvirtaPorttiAuki(tila, data);
  napit.push(nappi(
    data.valinta?.aarreNappi ?? 'Jatka aarteelle',
    auki ? 'primary' : '',
    () => {
      sfx.play('paper');
      siirry(ui, city, data, 'aarteelle');
    },
    auki ? null : (data.valinta?.aarreEste ?? 'Kuuntele ensin yksi tarina'),
  ));
  piirraNapit(kohde, napit);
}

/* ---------- vaihe 4 ---------- */
function piirraTaky(ui, city, data, tila, kohde) {
  const taky = data.takyt.find((t) => t.id === tila.taky);
  if (!taky) { piirraValinta(ui, city, data, tila, kohde); return; }
  otsikko(kohde, 'Viisas Pöllö', taky.otsikko ?? taky.nappi);
  piirraKuva(ui, kohde, taky.kuva);
  piirraTeksti(kohde, taky.teksti);
  piirraMinivisa(ui, city, data, taky, kohde);
}

/**
 * MINIVISA JA PALKKIO.
 *
 * Kirjanpito on lehden minitehtävän oma (js/game.js actionMinitehtava):
 * sama avain vastataan kerran, raha maksetaan vain oikeasta, ja kaikki
 * kulkee pelitallenteessa ilman uutta mekaniikkaa. Avaimeen tulee etuliite
 * `fokus:`, jottei se voi osua lehden aihesivun avaimeen.
 *
 * JULISTE (Raamattu: *"palkkio: rahaa + generoitu juliste"*) myönnetään
 * ensimmäisestä oikeasta vastauksesta, jos kaupungilla on juliste
 * (js/packs/julisteet.js). Myöntö on game.myonnaJuliste — sama kutsu kuin
 * lehden minitehtävässä — ja katselun avaa erillinen nappi, jottei
 * suurennos peitä faktariviä kesken lukemisen (omistajan tilaus
 * 22.8.2026, js/ui.js piirraMinitehtava).
 */
function piirraMinivisa(ui, city, data, taky, kohde) {
  const visa = taky.visa;
  const laatikko = html('div', 'fokusvirta-visa');
  const jatka = () => nappi('Takaisin', 'primary', () => {
    sfx.play('paper');
    siirry(ui, city, data, 'jatka');
  });
  if (!visa) {
    kohde.appendChild(laatikko);
    piirraNapit(kohde, [jatka()]);
    return;
  }
  const avain = `${ui.game.pack.id}:${city.id}:fokus:${taky.id}`;
  laatikko.appendChild(html('p', 'fokusvirta-visa-kysymys', visa.kysymys));
  const tulos = html('p', 'fokusvirta-visa-tulos');
  // Jo vastattu (palattu korttiin tallennuksesta): näytetään vain fakta.
  if (ui.game.minitehtavatVastatut?.has(avain)) {
    tulos.textContent = visa.fakta ?? 'Tähän on jo vastattu.';
    laatikko.appendChild(tulos);
    kohde.appendChild(laatikko);
    piirraNapit(kohde, [jatka()]);
    return;
  }
  const vaihtoehdot = html('div', 'fokusvirta-vaihtoehdot');
  visa.vaihtoehdot.forEach((teksti, i) => {
    const nap = html('button', '', teksti);
    nap.type = 'button';
    nap.addEventListener('click', () => {
      const oikein = i === visa.oikea;
      const vastaus = ui.game.actionMinitehtava(city.id, `fokus:${taky.id}`, oikein, TAKY_PALKKIO);
      if (!vastaus.ok) return;
      vaihtoehdot.replaceChildren();
      tulos.className = `fokusvirta-visa-tulos ${oikein ? 'oikein-tulos' : 'vaarin-tulos'}`;
      tulos.textContent = (oikein
        ? `Oikein! +${TAKY_PALKKIO} puntaa. `
        : `Oikea vastaus: ${visa.vaihtoehdot[visa.oikea]}. `) + (visa.fakta ?? '');
      sfx.play(oikein ? 'correct' : 'wrong');
      natiiviVastaus(oikein);
      if (oikein) {
        const laatikkoToast = ui.buildToast?.({
          kind: 'stamp', icon: 'kukkaro',
          text: `+${TAKY_PALKKIO} puntaa`, sub: 'Pöllön täky ratkesi',
        });
        if (laatikkoToast) {
          setTimeout(() => ui.removeToast(laatikkoToast), TOAST_MS.default);
        }
        const juliste = kaupunginJuliste(city.id);
        if (juliste && !ui.game.julisteet?.has(city.id)) {
          ui.game.myonnaJuliste(city.id);
          ui.elavoitaLaukku?.();
          const lunasta = nappi('Lunasta juliste', '', () => ui.naytaJuliste(city.id));
          laatikko.appendChild(lunasta);
        }
      }
      // Täky on tehty vastauksesta riippumatta (ks. fokusvirtaSiirto).
      const uusi = fokusvirtaSiirto(fokusvirtaTila(ui.game, city, data), 'visa', data);
      asetaFokusvirtaTila(ui.game, city, uusi);
      ui.onChange?.(ui.game);
      ui.renderTurnPill?.();
    });
    vaihtoehdot.appendChild(nap);
  });
  laatikko.append(vaihtoehdot, tulos);
  kohde.appendChild(laatikko);
  piirraNapit(kohde, [jatka()]);
}

/* ---------- vaihe 5 ---------- */
function piirraOppitunti(ui, city, data, kohde) {
  otsikko(kohde, 'Viisas Pöllö', data.oppitunti.otsikko);
  piirraKuva(ui, kohde, data.oppitunti.kuva);
  piirraTeksti(kohde, data.oppitunti.teksti);
  piirraNapit(kohde, [nappi(data.kohtaaminen?.nappi ?? 'Jatka', 'primary', () => {
    sfx.play('paper');
    siirry(ui, city, data, 'jatka');
  })]);
}

/* ---------- vaihe 6 ---------- */
function piirraKohtaaminen(ui, city, data, kohde) {
  const kohtaaminen = data.kohtaaminen ?? {};
  otsikko(kohde, 'Kohtaaminen', kohtaaminen.hahmo ?? null);
  piirraTeksti(kohde, kohtaaminen.teksti ?? '');
  piirraNapit(kohde, [nappi(kohtaaminen.nappi ?? 'Tapaa paikallinen', 'primary', () => {
    sfx.play('paper');
    siirry(ui, city, data, 'kysymys');
    suljeFokusvirta(ui);
    /*
     * Tästä eteenpäin peli on ennallaan: sama kutsu kuin saapumiskortin
     * tehtävänapilla (js/ui.js). Kohtaamisen oma muotoarvonta jää pois
     * vain silloin, kun isoisän pulma ei odota — kuten siellä.
     */
    const pulmaOdottaa = ui.game.pendingPuzzle?.();
    ui.doAction(() => ui.game.actionQuiz(pulmaOdottaa ? {} : { form: 'quiz' }));
  })]);
}
