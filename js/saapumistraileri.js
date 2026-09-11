import { html } from './ui-apurit.js';
import { julisteUrl, asetaKuva } from './media.js';
import { valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import { KULTTUURI_KATEGORIAT } from './packs/kulttuuri-kategoriat.js';
import { ISKULAUSEET } from './packs/iskulauseet.js';
import { ilmoitaLivianTilanne } from './livia-tilanteet.js';
import { sfx } from './sound.js';

/*
 * KAUPUNGIN MINITRAILERI — kolme herokuvaa ja nimi ennen isoisän ääntä.
 *
 * Raamattu: SAAPUMISEN UUSI JARJESTYS: KAUPUNGIN MINITRAILERI, ISOT
 * KUVAT KESKELLA, LYHENNETTY MERKINTA (omistaja 11.9.2026 klo 12.40,
 * sanatarkasti: *"kun saavutaan uuteen kaupunkiin niin ennen kuin
 * matkakirjan luenta alkaa naytolle tulee samaan tapaan kuin
 * matkakirjan kuvat kolme hero kuvaa kaupunki lehdesta nopeilla 2sek
 * vaihtovaleilla siten etta kuvien paalle animoidaan kaupungin nimi
 * harvennetuilla kapitaaleilla kirjain kerrallaan nakyville. … Jos
 * mahdollista kirjaimet voisivat lentaa ruudun keskelta kaukaa
 * horisontista tullen oikeille paikoilleen kuin kaukaisuudesta ammutut
 * kirjaimet. Kun kuvat ovat ohi ne voisivat syoksya samaa lentorataa
 * kaikki lahes yhtaaikaa samaa lentoreittia ulos ruudusta. … Ne kolme
 * kuvaa voisivat liukua oikealta vasemmalle pysahtyen keskelle ruutua
 * kahden sekunnin ajaksi. Liut menisi tutulla nopeutus hidastus
 * kiihdytyksilla"*).
 *
 * KOLME ASIAA, JOTKA EIVÄT NÄY DIFFISTÄ:
 *
 *  1. KUVAT OVAT LEHDEN OMAT, EIVÄT UUSI KUVASTO. Trailerin kuvat ovat
 *     kaupunkilehden avauskuvat (kulttuuri-kategoriat, kansilohko
 *     `avauskuvat`) ja niiden puuttuessa kansikuvat — sama kuvasto,
 *     sama osoiteporrastus (ämpäri tai Commons) kuin lehdellä
 *     (js/lehti.js piirraLehtiKuvat). Kuvaton kaupunki ei saa traileria
 *     eikä sen saapuminen muutu millään tavalla.
 *
 *  2. LUPAUS ON SOPIMUS KUTSUJAN KANSSA. Kirjoituskone, luenta,
 *     välihuuto ja luentakuva alkavat VASTA kun tämä lupaus ratkeaa
 *     (js/ui.js renderFact) — muuten kertoja puhuisi trailerin alta.
 *     Lupaus ratkeaa myös ohituksesta ja siivouksesta, jottei mikään
 *     jää odottamaan traileria, joka on jo poissa.
 *
 *  3. TEHOSTEET, ISKULAUSE JA PULUN TILANNETAPAHTUMAT OVAT SAMAA
 *     TILAUSTA (Raamattu: MINITRAILERIN LISAYKSET: PULUN VAISTO,
 *     KAMERAN KLIK, SUHINA JA ISKULAUSE, omistaja 11.9.2026 klo 12.55,
 *     sanatarkasti: *"Kirjainten tullessa pulu voisi tehda
 *     vaistoliikkeen pois ruudulta ja palata varovaisen tunnustellen
 *     takaisin naytolle kun isoisan kertomus alkaa. … Kuville tarvitaan
 *     kameran KLIK aani tehoste ja kirjaimille jokin lento suhina
 *     efekti. Kaupungin nimen alle voisi feidautua kaupungin isku
 *     lause"*). Pulun oma vaisto on tekstisession puolella: traileri
 *     vain KERTOO tilanteensa (ilmoitaLivianTilanne 'trailer'), eikä
 *     tiedä mitään pulun eleistä.
 *
 *  4. LIIKE ON VAIN TRANSFORMIA JA OPACITYÄ. Sama sääntö kuin kartan
 *     kamera-ajossa ja kuvasuurennoksessa: asettelu tehdään kerran ja
 *     liike jätetään kompositorille. Kirjainten lento on perspektiivi-
 *     kehyksen sisällä translate3d:llä, jolloin ne suurenevat
 *     perspektiivin mukaan lähestyessään ilman omaa skaalauslaskua.
 */

/** Kuinka monta kuvaa traileriin enintään otetaan. */
export const TRAILERIN_KUVIA = 3;

/** Kuvan liuku sisään ruudun oikealta reunalta (ms). */
export const TRAILERIN_LIUKU_MS = 700;
/** Kuinka kauan kuva seisoo keskellä (ms). */
export const TRAILERIN_PYSAHDYS_MS = 2000;
/** Kuvan liuku ulos vasemmalle (ms). */
export const TRAILERIN_ULOS_MS = 600;
/** Kuinka paljon seuraava kuva limittyy edellisen lähtöön (ms). */
export const TRAILERIN_LIMITYS_MS = 200;

/** Kirjainten porrastus sisään lennettäessä (ms). */
export const NIMEN_PORRAS_MS = 90;
/** Yhden kirjaimen lento horisontista (ms). */
export const NIMEN_LENTO_MS = 650;
/** Kirjainten porrastus ulos syöksyttäessä (ms). */
export const NIMEN_ULOS_PORRAS_MS = 20;
/** Kirjainten syöksy katsojan ohi ulos ruudusta (ms). */
export const NIMEN_ULOS_MS = 450;

/** Iskulauseen häivytys näkyviin viimeisen kirjaimen laskeuduttua (ms). */
export const ISKULAUSEEN_VIIVE_MS = 500;
/** Iskulauseen oma häivytys (ms) — se ei lennä, se vain feidaa. */
export const ISKULAUSEEN_FEIDI_MS = 600;

/** Ohituksen häivytys (ms). */
export const TRAILERIN_OHITUS_MS = 200;

/** Yhden kuvan oma vuoro: sisään, seisonta ja seuraavan limitys. */
const KUVAN_VUORO_MS = TRAILERIN_LIUKU_MS + TRAILERIN_PYSAHDYS_MS;

/**
 * Trailerin kokonaiskesto annetulle kuvamäärälle (ms).
 *
 * Testin ja kutsujan on voitava laskea sama luku kuin moduulin
 * ajastimien — siksi kesto on funktio eikä käsin kirjoitettu vakio.
 */
export function trailerinKesto(kuvia) {
  const n = Math.max(0, Number(kuvia) || 0);
  return n ? n * KUVAN_VUORO_MS + TRAILERIN_ULOS_MS : 0;
}

/*
 * Onko liike vähennetty (sama tarkistus kuin fokusvirran suurennoksella).
 * Nimet ovat tässä moduulissa omat (traileri-etuliite), koska yhden
 * tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen eikä
 * kahta samannimistä ylätason julistusta saa olla
 * (tools/tarkista-niputus.mjs sääntö 1).
 */
function trailerinLiikeVahennetty() {
  return Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
}

/**
 * TRAILERIN KUVAT: AVAUSKUVAT ENSIN, KANSIKUVAT VARALLA.
 *
 * Avauskuvat ovat lehden yleisnäkymiä ("laadukas vaakakuva jossa näkyy
 * itse kaupunkia enemmän", omistaja 15.8.2026) ja siksi juuri sitä,
 * mitä minitraileri tarvitsee. Kaupungit, joille avauskuvia ei ole
 * vielä tehty, saavat trailerin kansikuvista; ilman kumpiakaan
 * traileria ei ole.
 *
 * @param {{id:string}} city
 * @returns {Array<object>} enintään kolme kuvaa
 */
export function trailerinKuvat(city) {
  const kategoriat = KULTTUURI_KATEGORIAT[city?.id] ?? [];
  const kansi = [...kategoriat].find((k) => k?.id === 'kaupunki') ?? null;
  const avaus = Array.isArray(kansi?.avauskuvat) ? kansi.avauskuvat : [];
  const kannet = Array.isArray(kansi?.kansikuvat) ? kansi.kansikuvat : [];
  const lista = avaus.length ? avaus : kannet;
  return lista.slice(0, TRAILERIN_KUVIA);
}

/** Kuvan osoite samasta porrastuksesta kuin lehden herokuvilla. */
function trailerinKuvanOsoite(kuva) {
  return kuva?.ampari ? julisteUrl(kuva.ampari) : valokuvaUrl(kuva?.tiedosto, 1280);
}

/** Kuvan varareitti (vain Commonsin tiedostolla on sellainen). */
function trailerinKuvanVara(kuva) {
  return kuva?.ampari ? null : valokuvaVara(kuva?.tiedosto, 1280);
}

/**
 * Kaupungin nimi kirjain kerrallaan omiin spaneihinsa.
 *
 * Välilyönti on oma spaninsa eikä tyhjä merkki: harvennetuissa
 * kapitaaleissa sanaväli on muuten olematon, ja kirjainten porrastus
 * lasketaan spanien järjestyksestä.
 */
function nimenKirjaimet(nimi) {
  const kotelo = html('div', 'saapumistraileri-nimi');
  kotelo.setAttribute('aria-label', String(nimi ?? ''));
  /*
   * KIRJAINMÄÄRÄ CSS:LLE: nimi ladotaan yhdelle riville, ja
   * kirjasinkoko lasketaan sen pituudesta (css/saapumistraileri.css).
   * Ilman tätä pitkä nimi rivittyi ja viimeinen kirjain putosi omalle
   * rivilleen (mitattu Chromiumilla 11.9.2026).
   */
  kotelo.style.setProperty('--nimen-merkit', String([...String(nimi ?? '')].length || 1));
  [...String(nimi ?? '')].forEach((merkki, i) => {
    const span = html('span', merkki.trim() ? 'saapumistraileri-kirjain' : 'saapumistraileri-kirjain saapumistraileri-vali');
    span.textContent = merkki === ' ' ? ' ' : merkki;
    span.setAttribute('aria-hidden', 'true');
    span.style.setProperty('--kirjaimen-viive', `${i * NIMEN_PORRAS_MS}ms`);
    span.style.setProperty('--kirjaimen-ulosviive', `${i * NIMEN_ULOS_PORRAS_MS}ms`);
    kotelo.appendChild(span);
  });
  return kotelo;
}

/**
 * KAUPUNGIN ISKULAUSE NIMEN ALLE (js/packs/iskulauseet.js).
 *
 * Puuttuva avain ei ole virhe vaan hiljaisuus: silloin trailerissa on
 * pelkkä nimi, kuten ennenkin.
 *
 * @param {{id:string}} city
 * @returns {string} iskulause tai tyhjä
 */
export function trailerinIskulause(city) {
  const rivi = ISKULAUSEET[city?.id];
  return typeof rivi === 'string' ? rivi.trim() : '';
}

/**
 * MILLOIN ISKULAUSE FEIDAUTUU: puoli sekuntia VIIMEISEN kirjaimen
 * laskeuduttua. Viimeinen kirjain lähtee porrastuksensa verran muita
 * myöhemmin ja lentää oman lentoaikansa — siksi viive lasketaan nimen
 * pituudesta eikä käsin kirjoitetusta luvusta.
 *
 * @param {string} nimi
 * @returns {number} ms trailerin alusta
 */
export function iskulauseenViive(nimi) {
  const merkkeja = Math.max(1, [...String(nimi ?? '')].length);
  return (merkkeja - 1) * NIMEN_PORRAS_MS + NIMEN_LENTO_MS + ISKULAUSEEN_VIIVE_MS;
}

/*
 * TEHOSTEET SAMALLA PORTILLA KUIN PULUN OMAT ÄÄNET (js/sound.js sfx,
 * taulu PULUN_TEHOSTEET). Portti kunnioittaa mykistystä, äänitilaa ja
 * taustataukoa itsestään, ja lataamaton äänite on hiljaisuus eikä
 * virhe. try/catch on tässä siksi, että traileri on tervehdys: ääni ei
 * saa koskaan kaataa saapumista (eikä testiajoa, jossa WebAudiota ei
 * ole).
 */
function trailerinTehoste(nimi) {
  try {
    sfx.play(nimi);
  } catch {
    /* hiljaisuus riittää */
  }
}

/**
 * KAMERAN LAUKAISIMEN KLIK yhdelle keskelle pysähtyneelle kuvalle.
 *
 * Sama tehoste soi trailerin kolmelle kuvalle ja isoisän/PuluCamin
 * isolle kuvasarjalle (js/fokusvirta.js), joten portti on yksi ja
 * sama — omistaja tilasi KLIKin "kuville", ei yhdelle näkymälle.
 */
export function soitaKameranKlik() {
  trailerinTehoste('pulu.kamera-klik');
}

/** Kirjainten lennon suhina (sisään kerran, ulos kerran). */
function soitaKirjaintenSuhina() {
  trailerinTehoste('pulu.kirjain-suhina');
}

/** Trailerin oma tyylitiedosto sivulle (sama kaava kuin fokusvirralla). */
const TRAILERIN_TYYLIN_TUNNUS = 'saapumistraileri-tyyli';

function lataaTrailerinTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(TRAILERIN_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  // Yhden tiedoston versiossa tyylit ovat jo sivun <style>-lohkossa.
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = TRAILERIN_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('saapumistraileri.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/**
 * TRAILERI POIS — ohitus, kaupungin vaihto ja laudan vaihto.
 *
 * Kehittäjän hyppy kaupungista toiseen ei saa jättää traileria
 * ruudulle, joten tämä on se yksi siivouskohta, jota fokusvirran
 * poistumistiet kutsuvat (suljeFokusvirta, piilotaLuentakuva).
 *
 * @returns {boolean} oliko traileri ruudulla
 */
export function piilotaSaapumistraileri(ui, { peru = false } = {}) {
  const tila = ui?.saapumistraileri;
  if (!tila) return false;
  ui.saapumistraileri = null;
  for (const t of tila.ajastimet) clearTimeout(t);
  tila.irrota?.();
  tila.kehys?.remove?.();
  /*
   * LOPPU ILMOITETAAN TASAN KERRAN (sopimus tekstisession kanssa).
   * Kaikki kolme poistumistietä — traileri loppuun asti, napautuksen
   * ohitus ja kaupungin vaihdon siivous — kulkevat tämän saman
   * funktion kautta, joten portti kuuluu tänne eikä kutsupaikkoihin.
   */
  /*
   * PERU EROTETAAN LOPUSTA (tekstisession pyyntö 11.9.2026): kaupungin
   * vaihto, virran sulkeminen tai tuho keskeyttää esityksen, eikä pulun
   * 3 s:n varapaluu saa ilmestyä uuteen kaupunkiin vanhasta trailerista.
   * Pelaajan napautusohitus on tavallinen loppu. Sama tunnus kaikissa
   * vaiheissa; vanhan tunnuksen loppu ei vaikuta uudempaan.
   */
  if (!tila.loppuIlmoitettu) {
    tila.loppuIlmoitettu = true;
    ilmoitaLivianTilanne('trailer', {
      vaihe: peru ? 'peru' : 'loppu', tunnus: tila.tunnus, kaupunki: tila.kaupunki,
    });
  }
  // Lupaus ratkeaa aina: kutsuja odottaa sitä ennen luentaa.
  tila.ratkaise?.(true);
  return true;
}

/**
 * KUVAN OMA KUVASUHDE KOTELON MUUTTUJAAN (--traileri-kuvasuhde).
 *
 * Luku kirjoitetaan heti, jos kuva on jo välimuistissa, ja uudestaan
 * latauksen valmistuttua. Varareitin kuva laukaisee oman load-tapahtumansa,
 * joten kuuntelija jää paikalleen koko trailerin ajaksi.
 *
 * @param {HTMLElement} kotelo
 * @param {HTMLImageElement} img
 */
function merkitseKuvasuhde(kotelo, img) {
  const merkitse = () => {
    const leveys = Number(img.naturalWidth) || 0;
    const korkeus = Number(img.naturalHeight) || 0;
    if (!leveys || !korkeus) return;
    kotelo.style.setProperty('--traileri-kuvasuhde', String(leveys / korkeus));
  };
  img.addEventListener('load', merkitse);
  merkitse();
}

/**
 * MINITRAILERI RUUDULLE (js/ui.js renderFact, ennen kirjoituskonetta).
 *
 * @param {object} ui
 * @param {{id:string, name:string}} city
 * @returns {Promise<boolean>} ratkeaa kun traileri on ohi tai ohitettu;
 *   false = traileria ei ollut (ei kuvia tai ei dokumenttia)
 */
export function naytaSaapumistraileri(ui, city) {
  if (typeof document === 'undefined' || !ui || !city) return Promise.resolve(false);
  piilotaSaapumistraileri(ui);
  const kuvat = trailerinKuvat(city);
  if (!kuvat.length) return Promise.resolve(false);
  lataaTrailerinTyyli();

  const vahennetty = trailerinLiikeVahennetty();
  const kehys = html('div', vahennetty
    ? 'saapumistraileri liike-vahennetty' : 'saapumistraileri');
  kehys.setAttribute('role', 'presentation');
  const kuvatila = html('div', 'saapumistraileri-kuvat');
  const ajastimet = [];

  const kuvaKotelot = kuvat.map((kuva) => {
    const kotelo = html('div', 'saapumistraileri-kuva');
    const img = document.createElement('img');
    img.decoding = 'async';
    img.draggable = false;
    img.alt = '';
    asetaKuva(img, trailerinKuvanOsoite(kuva), trailerinKuvanVara(kuva));
    /*
     * KUVASUHDE CSS:LLE (omistaja 11.9.2026 klo 22.26: *"herokuva on
     * yhä liian pieni"*). Css laskee kuvan leveyden pienempänä kahdesta
     * — leveyskatto tai korkeuskattoon mahtuva leveys — ja tarvitsee
     * siihen kuvan oman suhteen. Ilman tätä lukua css käyttää lehden
     * herokuvien 3:2-oletusta, jolloin poikkeava kuva jäisi joko
     * korkeuskaton yli tai turhan pieneksi.
     */
    merkitseKuvasuhde(kotelo, img);
    kotelo.appendChild(img);
    kuvatila.appendChild(kotelo);
    return kotelo;
  });
  const nimi = nimenKirjaimet(city.name);
  /*
   * NIMI JA ISKULAUSE SAMAAN PYSTYRIVIIN. Päällys on keskittävä flex,
   * joten ilman omaa koteloa iskulause asettuisi nimen VIEREEN eikä
   * sen alle.
   */
  const teksti = html('div', 'saapumistraileri-teksti');
  teksti.appendChild(nimi);
  const iskulause = trailerinIskulause(city);
  const iskurivi = iskulause
    ? html('div', 'saapumistraileri-iskulause', iskulause) : null;
  if (iskurivi) {
    iskurivi.setAttribute('aria-hidden', 'true');
    teksti.appendChild(iskurivi);
  }
  kehys.append(kuvatila, teksti);
  /*
   * KOTI ON BODY, EI KARTTAPINTA. Traileri on koko ruudun päällys
   * (position: fixed), ja karttapinnalla on omat muunnoksensa —
   * muunnettu esi-isä tekisi fixed-elementistä sen sisäisen, jolloin
   * traileri asettuisi kartan mukana vinoon eikä ruudun keskelle.
   */
  document.body.appendChild(kehys);

  let ratkaise = null;
  const lupaus = new Promise((ok) => { ratkaise = ok; });
  /*
   * TUNNUS ON OLIO, EI MERKKIJONO: sama traileri voi alkaa samassa
   * kaupungissa uudestaan, ja kuulijan (pulun sovitin) on tunnistettava
   * ALKU ja LOPPU pareiksi ilman laskuria.
   */
  const tunnus = {};
  const tila = {
    kehys, ajastimet, ratkaise, irrota: null,
    tunnus, kaupunki: city.id, loppuIlmoitettu: false,
  };
  ui.saapumistraileri = tila;

  /*
   * NAPAUTUS OHITTAA HETI (omistaja: traileri on tervehdys, ei este).
   * Kuuntelija on kehyksessä itsessään — se peittää koko ruudun, joten
   * jokainen napautus osuu siihen eikä kartalle.
   */
  const ohita = () => {
    if (ui.saapumistraileri !== tila) return;
    kehys.classList.add('ohitettu');
    for (const t of ajastimet) clearTimeout(t);
    ajastimet.length = 0;
    ajastimet.push(setTimeout(() => piilotaSaapumistraileri(ui), TRAILERIN_OHITUS_MS));
  };
  kehys.addEventListener('pointerdown', ohita);
  kehys.addEventListener('click', ohita);
  tila.irrota = () => {
    kehys.removeEventListener('pointerdown', ohita);
    kehys.removeEventListener('click', ohita);
  };

  const aja = (viive, tyo) => ajastimet.push(setTimeout(() => {
    if (ui.saapumistraileri === tila) tyo();
  }, Math.max(0, viive)));

  // Nimi lähtee lentoon heti ensimmäisen kuvan mukana ja jää paikalleen
  // kaikkien kuvien ajaksi (omistaja: yksi nimi, kolme kuvaa).
  let kirjaimetLahtivat = false;
  const nostaNimi = () => {
    nimi.classList.add('nakyy');
    // Kaksi herätystä (rAF ja 50 ms) nostavat saman nimen; suhina ja
    // tilannetapahtuma kuuluvat silti vain ensimmäiselle kirjaimelle.
    if (kirjaimetLahtivat) return;
    kirjaimetLahtivat = true;
    soitaKirjaintenSuhina();
    ilmoitaLivianTilanne('trailer', {
      vaihe: 'kirjaimet', tunnus, kaupunki: city.id,
    });
  };
  globalThis.requestAnimationFrame?.(nostaNimi);
  aja(50, nostaNimi);

  // Iskulause feidautuu nimen alle vasta kun viimeinen kirjain on
  // laskeutunut (omistaja: *"Kaupungin nimen alle voisi feidautua
  // kaupungin isku lause"*) ja häipyy kirjainten syöksyn mukana.
  if (iskurivi) aja(iskulauseenViive(city.name), () => iskurivi.classList.add('nakyy'));

  kuvaKotelot.forEach((kotelo, i) => {
    const alku = i * KUVAN_VUORO_MS;
    let klikattu = false;
    const keskita = () => {
      kotelo.classList.add('keskella');
      // Kuva on nyt paikallaan keskellä: kameran laukaisin.
      if (klikattu) return;
      klikattu = true;
      soitaKameranKlik();
    };
    if (alku <= 0) {
      globalThis.requestAnimationFrame?.(keskita);
      aja(50, keskita);
    } else aja(alku, keskita);
    // Ulos vasemmalle hitusen ennen seuraavan tuloa (limitys).
    aja(alku + KUVAN_VUORO_MS - TRAILERIN_LIMITYS_MS, () => {
      kotelo.classList.remove('keskella');
      kotelo.classList.add('ulos');
    });
  });

  // Viimeisen kuvan lähtiessä kirjaimet syöksyvät samaa rataa ulos.
  aja(kuvat.length * KUVAN_VUORO_MS - TRAILERIN_LIMITYS_MS, () => {
    nimi.classList.add('ulos');
    // Iskulause ei lennä mukana, se vain feidaa pois.
    iskurivi?.classList.add('ulos');
    soitaKirjaintenSuhina();
  });
  aja(trailerinKesto(kuvat.length), () => piilotaSaapumistraileri(ui));

  return lupaus;
}
