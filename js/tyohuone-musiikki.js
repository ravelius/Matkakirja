/*
 * ══════════════════════════════════════════════════════════════════
 * MUSIIKKI — kehittäjän kuuntelulehti
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan tilaus 3.9.2026, sanatarkasti: *"kehittäjä hampurilaiseen
 * voisi tehdä oman sivun taustamusiikeille, jossa voisin käydä
 * kuuntelemassa niitä"*.
 *
 * Pelin musiikki on hajallaan kolmessa koneistossa — siirtymän ja
 * linssin raidat (js/siirtymamusiikki.js), musiikkipaletti (pohjavire
 * js/ambience-stream.js, visan looppi js/aani-ehdokkaat.js, aarrepari
 * js/ui.js) ja tulossa olevat kohahdustehosteet — eikä yksikään niistä
 * soi silloin kun kehittäjä haluaisi kuulla sen. Raidan kuuleminen
 * vaati tähän asti sen tilanteen pelaamista: siirtymämusiikin kuuli
 * vain heittämällä noppaa, pääaarteen aiheen vain löytämällä
 * pääaarteen. Tämä lehti kokoaa ne yhdelle sivulle, jolla jokaisen
 * raidan voi soittaa napista.
 *
 * MITÄ RIVI KERTOO: nimi, mihin raitaa käytetään, mistä osoitteista se
 * haetaan, onko se olemassa, kuinka pitkä se on ja napit Soita/Pysäytä.
 *
 * ------------------------------------------------------------------
 * KOLME PERIAATETTA
 * ------------------------------------------------------------------
 *
 * 1. OLEMASSAOLO KYSYTÄÄN ÄÄNIELEMENTILLÄ, EI FETCHILLÄ. Ämpärin
 *    julkinen osoite vastaa HEAD-pyyntöön 200 mutta ILMAN
 *    Access-Control-Allow-Origin-otsaketta, joten fetch kaatuu
 *    CORS-virheeseen ja "virhe = puuttuu" valehtelisi jokaisesta
 *    olemassa olevasta raidasta (mitattu 3.9.2026, ks.
 *    js/siirtymamusiikki.js onOlemassaAani). Kysely tehdään samalla
 *    välineellä kuin soitto: <audio preload="metadata"> lataa vain
 *    otsakkeet, ja loadedmetadata = löytyi, error = puuttuu. Sama
 *    lataus antaa yleensä myös keston. Tekniikka on kopioitu eikä
 *    tuotu: siirtymämusiikin oma tarkistin on sen moduulin sisäinen
 *    eikä se palauta kestoa. Osa raidoista ei kerro kestoaan
 *    metatiedoissa lainkaan (mp3 ilman Xing/Info-otsaketta, esim.
 *    musa-pohja.mp3); niille kesto haetaan loppuun hyppäämällä, ja
 *    jos se ei siltikään selviä, se täydentyy viimeistään raitaa
 *    soitettaessa (ks. kysyMetatiedot ja soitaRaita).
 *
 * 2. YKSI RAITA SOI KERRALLAAN. Uusi Soita pysäyttää edellisen, sivun
 *    vaihto ja lehden sulkeminen pysäyttävät soivan raidan ja
 *    vapauttavat elementin. Soitto hiljentää äänimaiseman omalla
 *    syyllään (HILJENNYKSEN_SYY) ja palauttaa sen pysäytyksessä —
 *    syyt ovat joukko, joten lehden oma hiljennys ('lehti') pysyy
 *    voimassa eikä tämä nosta sitä.
 *
 * 3. MYKISTYS VOITTAA. Jos taustaäänet ovat pois (sfx.enabled false),
 *    sivun kärjessä on huomautus ja soittonapit ovat pois käytöstä.
 *    Kuuntelulehti ei ole se paikka, jossa peli ohittaa pelaajan
 *    oman äänivalinnan.
 *
 * ------------------------------------------------------------------
 * MISTÄ RAIDAT TULEVAT
 * ------------------------------------------------------------------
 *
 * KAIKKI MUSIIKKI ON GOOGLE LYRIA 3.5:N (omistajan linjaus 5.9.2026,
 * sanatarkasti: *"kaikki musiikki lyrialla"*; paate -lyria). Siirtyma-
 * ja linssiraidat tekee tools/generoi-siirtymamusiikki.mjs, paletin
 * tools/generoi-musiikki.mjs — molemmat samalla haulla (tools/lyria.mjs)
 * ja kummassakin ElevenLabs jaa vertailumoottoriksi (--moottori eleven,
 * paljas nimi, ei soi pelissa). Tehosteet tools/generoi-tehosteet.mjs;
 * ajot tehdaan Actionsissa. Paletin rivit seuraavat js/media.js:n
 * MUSIIKIN_PAATE-kytkinta, joten lehti ei voi kuunnella eri tiedostoa
 * kuin peli soittaa.
 * Tämä moduuli ei tunne avaimia eikä generoi mitään — se vain
 * soittaa sen, mikä ämpärissä on.
 */
import { html } from './ui-apurit.js';
import { AANI_JUURI, aaniUrl, musaPolku } from './media.js';
import { KAUPUNKIRAIDAT, kaupunkiraidanTunnus } from './kaupunkimusiikki.js';
import { MUSIIKKILAJIT } from './siirtymamusiikki.js';
import { sfx } from './sound.js';
import { hiljennaAmbienssi, palautaAmbienssi } from './ambience-stream.js';

/**
 * Hiljennyksen syy äänimaisemalle. Oma syynsä, koska pelaaja voi olla
 * lehdessä ('lehti') samaan aikaan: joukko purkautuu vasta kun kumpikin
 * syy on poistunut (js/ambience-stream.js hiljennaAmbienssi).
 */
export const HILJENNYKSEN_SYY = 'musiikkisivu';

/*
 * ------------------------------------------------------------------
 * SIIRTYMÄN JA LINSSIN RAIDAT
 * ------------------------------------------------------------------
 *
 * Lajit luetaan js/siirtymamusiikki.js:n MUSIIKKILAJIT-listasta, jotta
 * uusi laji ei voi jäädä tästä lehdestä pois. Tiedostonimet ja selitteet
 * ovat tässä taulukossa: soittava moduuli pitää oman RAIDAT-taulunsa
 * yksityisenä eikä sitä muuteta tämän lehden takia. Jos lajilista ja
 * tämä taulukko eroavat, ero näkyy TUNTEMATTOMAT_LAJIT-listassa ja
 * tests/musiikkilehti.test.mjs kaatuu — hiljaista puutosriviä ei jää.
 */
const LAJIEN_TIEDOT = {
  jalan: {
    osasto: 'siirtyma',
    tiedosto: 'siirtyma-jalan-lyria.mp3',
    kaytto: 'Soi kävelysiirtymän ajan, kun nappula kulkee kartalla.',
  },
  laiva: {
    osasto: 'siirtyma',
    tiedosto: 'siirtyma-laiva-lyria.mp3',
    kaytto: 'Soi laivasiirtymän ajan; aallokon huojunta, hitaampi kuin jalan.',
  },
  lento: {
    osasto: 'siirtyma',
    tiedosto: 'siirtyma-lento-lyria.mp3',
    kaytto: 'Soi lentokohtauksessa matkustamoäänitteen ALLA, siksi matalimmalla tasolla.',
  },
  keksinnot: {
    osasto: 'linssi',
    tiedosto: 'linssi-keksinnot-lyria.mp3',
    kaytto: 'Soi aikajanalinssin koko ajon ajan; pitkä looppi, koska ajo kestää minuutteja.',
  },
};

/*
 * ------------------------------------------------------------------
 * MUSIIKKIPALETTI
 * ------------------------------------------------------------------
 *
 * Neljä raitaa, jotka menevät moottorilta repoon sellaisenaan
 * (tools/generoi-musiikki.mjs) ja ämpäriin vie-aanet.yml:n mukana.
 * Soitto-osoite lasketaan aina aaniUrl:llä, joka valitsee ämpärin tai
 * repon polun peilin tilan mukaan (js/media.js).
 *
 * TIEDOSTONIMI TULEE KYTKIMESTÄ. Rivit antavat vain raidan tunnuksen
 * (`musa-pohja`), ja js/media.js `musaPolku` liittää siihen
 * moottoripäätteen (MUSIIKIN_PAATE, '' tai '-lyria'). Näin lehti
 * kuuntelee tasan niitä tiedostoja, jotka pelikin soittaa — omistajan
 * linjaus 5.9.2026: *"kaikki musiikki lyrialla"*.
 *
 * Visan raita on musa-visa-2 eikä musa-visa: vanhaa visamusiikkia
 * ei korvattu vaan sen rinnalle tehtiin uusi (tools/generoi-musiikki.mjs).
 */
const PALETTI = [
  {
    id: 'pohja',
    tunnus: 'musa-pohja',
    kaytto: 'Pohjavire, joka soi äänimaiseman alla kaikkialla pelissä (−19 dB ambienssiin).',
  },
  {
    id: 'visa',
    tunnus: 'musa-visa-2',
    kaytto: 'Kysymyskortin tikittävä uteliaisuus; looppi visan ajan.',
  },
  {
    id: 'aarre',
    tunnus: 'musa-aarre',
    kaytto: 'Tavallisen aarteen lämmin aihe paljastuskortin päällä.',
  },
  {
    id: 'paaaarre',
    tunnus: 'musa-paaaarre',
    kaytto: 'Sama sävelaihe koko kamarikokoonpanolla pääaarteen paljastuksessa.',
  },
];

/*
 * ------------------------------------------------------------------
 * KAUPUNKIRAIDAT
 * ------------------------------------------------------------------
 *
 * Omistajan tilaus 5.9.2026 klo 00.35: *"ateenaan saavuttaessa voisi
 * vaihtua kappale. generoi sinne oma musiikki."* Kaupungin oma kappale
 * korvaa pohjavireen siksi aikaa, kun pelaaja on kaupungissa
 * (js/ambience-stream.js kaynnistaPohjaMusiikki). Rivit luetaan pelin
 * omasta taulukosta (js/kaupunkimusiikki.js KAUPUNKIRAIDAT), joten uusi
 * kaupunki ilmestyy tähän lehteen ilman että tätä tiedostoa muokataan —
 * ja tunnus tulee samasta nimisäännöstä kuin pelillä.
 *
 * Puuttuva raita on tässä lehdessä normaali tila ("puuttuu"): taulukko
 * on mainissa ennen kuin mp3 on generoitu.
 */
const KAUPUNGIT = Object.entries(KAUPUNKIRAIDAT).map(([id, raita]) => ({
  id: `kaupunki-${id}`,
  nimi: id,
  tunnus: kaupunkiraidanTunnus(id),
  kaytto: `${raita.kuvaus} Soi pohjavireen tilalla, kun pelaaja on kaupungissa.`,
}));

/*
 * ------------------------------------------------------------------
 * TEHOSTEET
 * ------------------------------------------------------------------
 *
 * Kohahdukset ovat ämpärin aanet/tehosteet/-kansiossa eivätkä repossa:
 * ne generoidaan tools/generoi-tehosteet.mjs:llä Actionsissa. Rivit ovat
 * täällä ENNEN tiedostoja tarkoituksella — puuttuva raita on tässä
 * lehdessä normaali tila, ja rivi kertoo sen suoraan ("puuttuu"), jolloin
 * ämpäriin viety tiedosto näkyy heti seuraavalla avauksella.
 */
const KOHAHDUKSIA = 4;

/** Kohahduksen ämpäripolku numerolla 1…4. */
const kohahduksenPolku = (n) => `${AANI_JUURI}aanet/tehosteet/kohahdus-${n}.mp3`;

/*
 * ------------------------------------------------------------------
 * SYNTETISOIDUT TEHOSTEET
 * ------------------------------------------------------------------
 *
 * js/sound.js:n SOUNDS-taulu ei ole vietävissä (moduulin sisäinen), joten
 * nimet ovat tässä listana. sfx.play(nimi) soittaa oikean äänitteen, jos
 * se on ladattu puskuriin, ja muuten syntetisoidun version — juuri sen,
 * mitä pelaaja kuulee ilman verkkoa. Lista on kuuntelujärjestyksessä
 * eikä aakkosissa: käyttöliittymä ensin, sitten noppa ja matka, sitten
 * visa ja palkinnot.
 */
export const SFX_NIMET = [
  'click', 'paper', 'pen', 'swipe', 'flip', 'popup', 'kupla', 'typeBell',
  // Sähketehtävän kirjoittuvat rivit (3.9.2026): lennätinkonttorin
  // naputus ja rivin lopun kello.
  'kirjoituskone', 'bling',
  'quizOpen', 'zoom', 'owl', 'hint',
  'dieTick', 'dieLand', 'step', 'arrive', 'ferry', 'flight', 'clack',
  'tick', 'timeout', 'correct', 'wrong', 'vuosi',
  'star', 'gem', 'coin', 'robber', 'empty', 'stuck', 'turn', 'win',
];

/** Osastojen otsikot ja järjestys lehdessä. */
const OSASTOT = {
  siirtyma: 'Siirtymämusiikki',
  linssi: 'Linssit',
  paletti: 'Musiikkipaletti',
  kaupunki: 'Kaupunkiraidat',
  tehoste: 'Tehosteet',
};

/**
 * Lajit, joille tässä lehdessä ei ole selitettä. Tyhjä lista on ainoa
 * hyväksyttävä tila; testi vartioi sitä.
 */
export const TUNTEMATTOMAT_LAJIT = MUSIIKKILAJIT.filter((laji) => !LAJIEN_TIEDOT[laji]);

/**
 * Lehden koko raitaluettelo yhtenä taulukkona.
 *
 * Kenttä `ampari` on valmis R2-osoite (tai null) ja `oma` repon polku
 * muodossa assets/audio/… (tai null). Soitto-osoitteet lasketaan vasta
 * pyydettäessä (raidanOsoitteet), koska aaniUrl:n vastaus riippuu peilin
 * tilasta, joka voi vaihtua kesken istunnon.
 */
export const MUSIIKKISIVUN_RAIDAT = [
  ...MUSIIKKILAJIT.map((laji) => {
    const tiedot = LAJIEN_TIEDOT[laji] ?? {
      osasto: 'siirtyma',
      tiedosto: `${laji}.mp3`,
      kaytto: 'Selite puuttuu tästä lehdestä — lisää se js/tyohuone-musiikki.js:ään.',
    };
    return {
      id: laji,
      nimi: laji,
      osasto: tiedot.osasto,
      kaytto: tiedot.kaytto,
      ampari: `${AANI_JUURI}aanet/${tiedot.tiedosto}`,
      oma: `assets/audio/${tiedot.tiedosto}`,
    };
  }),
  ...PALETTI.map((raita) => ({
    id: raita.id,
    nimi: raita.id,
    osasto: 'paletti',
    kaytto: raita.kaytto,
    // Paletin raidat ovat repon omia: ämpäriosoite on aaniUrl:n
    // audio/-polku, joka lasketaan vasta soitettaessa.
    ampari: null,
    oma: musaPolku(raita.tunnus),
  })),
  ...KAUPUNGIT.map((raita) => ({
    id: raita.id,
    nimi: raita.nimi,
    osasto: 'kaupunki',
    kaytto: raita.kaytto,
    // Sama polku kuin paletilla: repon assets/audio, josta aaniUrl
    // tekee ämpärin audio/-osoitteen soitettaessa.
    ampari: null,
    oma: musaPolku(raita.tunnus),
  })),
  ...Array.from({ length: KOHAHDUKSIA }, (_, i) => ({
    id: `kohahdus-${i + 1}`,
    nimi: `kohahdus ${i + 1}`,
    osasto: 'tehoste',
    kaytto: 'Yleisön kohahdus, neljä vaihtoehtoa; generointi tools/generoi-tehosteet.mjs.',
    ampari: kohahduksenPolku(i + 1),
    oma: null,
  })),
];

/**
 * Raidan soitto-osoitteet siinä järjestyksessä, jossa peli ne kokeilee:
 * ämpärin aanet/ ensin, repon oma polku (aaniUrl → ämpärin audio/) perään.
 */
export function raidanOsoitteet(raita) {
  return [raita.ampari, raita.oma ? aaniUrl(raita.oma) : null].filter(Boolean);
}

/* ══════════════════════════════════════════════════════════════════
 * OLEMASSAOLO JA KESTO
 * ══════════════════════════════════════════════════════════════════ */

/*
 * Kyselyn aikakatkaisu. Vastaamaton palvelin on arkipäivää (kontti,
 * lentokone), ja ilman katkaisua rivi jäisi pysyvästi lukemaan
 * "tarkistetaan…". Sama luku kuin js/siirtymamusiikki.js:ssä.
 */
const MUSIIKIN_KATKAISU_MS = 4000;

/** Istunnon muisti: osoite → { url, kesto } tai null. Ei kysytä kahdesti. */
const tarkistetut = new Map();

/**
 * Kysyy yhden osoitteen metatiedot. Palauttaa { url, kesto } tai null.
 * Kesto on sekunteina tai null, jos selain ei kerro sitä.
 *
 * KESTO PUUTTUU OTSAKKEETTOMASTA MP3:STA. Selain lukee keston
 * Xing/Info-otsakkeesta, ja ElevenLabsin suoraan tuottamissa
 * tiedostoissa (musa-pohja.mp3) sitä ei ole: `duration` on silloin
 * `Infinity`. Kierto on vanha ja vakiintunut — hyppy tiedoston
 * loppuun (`currentTime` valtavaksi) pakottaa selaimen etsimään
 * todellisen pään, ja `durationchange` kertoo sen (mitattu 3.9.2026
 * Chromiumilla: Infinity → 80,016 s). Hyppy tehdään VAIN kun kestoa
 * ei muuten saa, ja se kulkee osina (range) eikä lataa raitaa
 * soitettavaksi. Ellei kesto tule määräajassa, rivi näyttää pelkän
 * "olemassa" — kestoa ei arvata.
 */
function kysyMetatiedot(url) {
  return new Promise((valmis) => {
    if (typeof Audio === 'undefined') { valmis(null); return; }
    let tehty = false;
    const soitin = new Audio();
    const ohi = (tulos) => {
      if (tehty) return;
      tehty = true;
      clearTimeout(ajastin);
      // Lataus poikki: elementti ei jää vetämään dataa taustalla.
      soitin.removeAttribute('src');
      try { soitin.load(); } catch { /* tynkäselain */ }
      valmis(tulos);
    };
    const kesto = () => (Number.isFinite(soitin.duration) && soitin.duration > 0
      ? soitin.duration : null);
    /*
     * Aikakatkaisu ei saa VALEHDELLA LÖYTYMISESTÄ: ennen metatietoja
     * se on "ei vastausta" = puuttuu, ja vasta niiden jälkeen "löytyi,
     * kestoa ei saatu". Ilman tätä eroa vastaamaton ämpäri olisi
     * näyttänyt jokaisen raidan olemassa olevana.
     */
    let metatiedotSaatu = false;
    const ajastin = setTimeout(
      () => ohi(metatiedotSaatu ? { url, kesto: kesto() } : null),
      MUSIIKIN_KATKAISU_MS,
    );
    soitin.preload = 'metadata';
    soitin.addEventListener('loadedmetadata', () => {
      metatiedotSaatu = true;
      if (kesto() !== null) { ohi({ url, kesto: kesto() }); return; }
      // Otsakkeeton mp3: haetaan pää käsin ja odotetaan durationchangea.
      // Aikakatkaisu on jo pystyssä, joten tämä ei voi jäädä roikkumaan.
      soitin.addEventListener('durationchange', () => {
        if (kesto() !== null) ohi({ url, kesto: kesto() });
      });
      try { soitin.currentTime = 1e101; } catch { ohi({ url, kesto: null }); }
    }, { once: true });
    /*
     * Virhe metatietojen JÄLKEEN ei ole puuttuva raita: se voi tulla
     * loppuun hyppäämisestä (osittaisnouto, jota palvelin ei tue).
     * Raita on silloin olemassa, kesto vain jää kertomatta.
     */
    soitin.addEventListener('error',
      () => ohi(metatiedotSaatu ? { url, kesto: kesto() } : null), { once: true });
    soitin.src = url;
    try { soitin.load(); } catch { ohi(null); }
  });
}

/**
 * Raidan tila: ensimmäinen vastaava osoite kestoineen, tai null jos
 * yksikään ei vastaa. Tulos jää istunnon muistiin, joten sivun selaus
 * edestakaisin ei tuota uusia latauksia.
 */
async function tarkistaRaita(raita) {
  if (tarkistetut.has(raita.id)) return tarkistetut.get(raita.id);
  let tulos = null;
  for (const url of raidanOsoitteet(raita)) {
    // Järjestys on merkitsevä (ämpäri ensin), joten kyselyt tehdään
    // peräkkäin eikä rinnan: ensimmäinen osuma riittää, eikä puuttuvaa
    // raitaa haeta kahdesta paikasta yhtä aikaa.
    tulos = await kysyMetatiedot(url);
    if (tulos) break;
  }
  tarkistetut.set(raita.id, tulos);
  return tulos;
}

/** "12,4 s" tai tyhjä, jos selain ei kertonut kestoa. */
function kestoTeksti(kesto) {
  if (!Number.isFinite(kesto) || kesto <= 0) return '';
  return `${kesto.toFixed(1).replace('.', ',')} s`;
}

/* ══════════════════════════════════════════════════════════════════
 * SOITTO — yksi raita kerrallaan
 * ══════════════════════════════════════════════════════════════════ */

/** Soiva raita: { audio, id, merkitse } tai null. */
let soivaRaita = null;

/**
 * Pysäyttää soivan raidan, vapauttaa elementin ja palauttaa
 * äänimaiseman. Turvallinen kutsua vaikkei mikään soi.
 */
export function pysaytaMusiikkisivu() {
  const vanha = soivaRaita;
  soivaRaita = null;
  if (!vanha) return;
  vanha.audio.pause();
  vanha.audio.removeAttribute('src');
  try { vanha.audio.load(); } catch { /* tynkäselain */ }
  vanha.merkitse?.(false);
  palautaAmbienssi(HILJENNYKSEN_SYY);
}

/**
 * Soittaa yhden raidan alusta. Edellinen pysähtyy ensin, ja
 * äänimaisema hiljenee soiton ajaksi.
 *
 * `kerroKesto` täydentää rivin keston, jos metatietokysely ei sitä
 * saanut: OSA RAIDOISTA EI KERRO KESTOAAN METATIEDOISSA. mp3:n kesto
 * luetaan Xing/Info-otsakkeesta, ja ElevenLabsin suoraan tuottamissa
 * tiedostoissa (esim. musa-pohja.mp3) sitä ei ole — selain palauttaa
 * silloin `Infinity`, kunnes koko tiedosto on ladattu. Soitto lataa
 * sen joka tapauksessa, joten kesto ilmestyy riville viimeistään
 * kuunnellessa. Kysely itse pysyy metatietolatauksena, jottei lehden
 * avaaminen vedä kymmentä raitaa kokonaan.
 */
function soitaRaita(url, id, merkitse, kerroKesto) {
  pysaytaMusiikkisivu();
  if (!sfx.enabled) return;
  const audio = new Audio(url);
  audio.preload = 'auto';
  const tarkennaKesto = () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) kerroKesto?.(audio.duration);
  };
  audio.addEventListener('loadedmetadata', tarkennaKesto);
  audio.addEventListener('durationchange', tarkennaKesto);
  // Kuuntelulehti soittaa raidan sellaisenaan: pelin omat kertoimet
  // (SIIRTYMA_VOIMA, POHJA_VOIMA) ovat sekoituksen sääntöjä eivätkä
  // kuulu tähän — kehittäjä haluaa kuulla raidan, ei sen paikkaa
  // sekoituksessa.
  audio.volume = 1;
  const oma = { audio, id, merkitse };
  soivaRaita = oma;
  hiljennaAmbienssi(HILJENNYKSEN_SYY);
  merkitse?.(true);
  audio.addEventListener('ended', () => {
    if (soivaRaita === oma) pysaytaMusiikkisivu();
  }, { once: true });
  audio.addEventListener('error', () => {
    if (soivaRaita === oma) pysaytaMusiikkisivu();
  }, { once: true });
  audio.play().catch(() => {
    // Ele puuttui tai laite kieltäytyi: rivi palaa entiselleen.
    if (soivaRaita === oma) pysaytaMusiikkisivu();
  });
}

/** Soiko juuri nyt jokin lehden raita, ja mikä? Savukkeita varten. */
export function musiikkisivuSoi() {
  return soivaRaita?.id ?? null;
}

/* ══════════════════════════════════════════════════════════════════
 * PIIRTO
 * ══════════════════════════════════════════════════════════════════ */

/*
 * Lehden sulkeminen pysäyttää soivan raidan. Kuuntelu on lehden oma
 * tila eikä pelin ääni: jos raita jäisi soimaan lehden alle, sitä ei
 * voisi enää pysäyttää mistään. Kuuntelija kytketään kerran dialogia
 * kohti (WeakSet), koska sivu piirretään uudelleen joka sivunvaihdolla.
 */
const sulkuKytketty = new WeakSet();

function kytkeSulku(ui) {
  const dialogi = ui?.arrivalDialog;
  if (!dialogi || sulkuKytketty.has(dialogi)) return;
  sulkuKytketty.add(dialogi);
  dialogi.addEventListener('close', () => pysaytaMusiikkisivu());
}

/** Yhden raidan rivi: nimi, käyttö, polut, tila, kesto ja napit. */
function piirraRivi(raita, aanetPaalla) {
  const rivi = html('div', 'mus-rivi');
  const otsikko = html('div', 'mus-nimi');
  otsikko.appendChild(html('b', '', raita.nimi));
  const tila = html('span', 'mus-tila', 'tarkistetaan…');
  otsikko.appendChild(tila);
  rivi.appendChild(otsikko);
  rivi.appendChild(html('p', 'mus-kaytto', raita.kaytto));
  if (raita.ampari) rivi.appendChild(html('p', 'mus-polku', `ämpäri: ${raita.ampari}`));
  if (raita.oma) rivi.appendChild(html('p', 'mus-polku', `oma: ${raita.oma}`));

  const napit = html('div', 'mus-napit');
  const soita = html('button', 'wiki-btn mus-soita', 'Soita');
  soita.type = 'button';
  const seis = html('button', 'wiki-btn mus-seis', 'Pysäytä');
  seis.type = 'button';
  seis.disabled = true;
  napit.appendChild(soita);
  napit.appendChild(seis);
  rivi.appendChild(napit);

  /** Rivin napit soivan tilan mukaan. */
  const merkitse = (soi) => {
    rivi.classList.toggle('soi', soi);
    seis.disabled = !soi;
    soita.textContent = soi ? 'Soi' : 'Soita';
  };

  if (!aanetPaalla) {
    soita.disabled = true;
    seis.disabled = true;
    soita.title = 'Taustaäänet ovat pois päältä.';
  }

  /** "olemassa" tai "olemassa · 12,4 s"; kesto voi täydentyä soitossa. */
  const naytaOlemassa = (kesto) => {
    const teksti = kestoTeksti(kesto);
    tila.textContent = teksti ? `olemassa \u00b7 ${teksti}` : 'olemassa';
    tila.classList.add('olemassa');
  };

  // Osoite ratkeaa vasta tarkistuksessa: soitetaan sitä, joka vastasi.
  let osoite = null;
  soita.addEventListener('click', () => {
    if (!osoite || !sfx.enabled) return;
    soitaRaita(osoite, raita.id, merkitse, naytaOlemassa);
  });
  seis.addEventListener('click', () => pysaytaMusiikkisivu());

  tarkistaRaita(raita).then((tulos) => {
    if (!tulos) {
      tila.textContent = 'puuttuu';
      tila.classList.add('puuttuu');
      soita.disabled = true;
      return;
    }
    osoite = tulos.url;
    naytaOlemassa(tulos.kesto);
    if (aanetPaalla) soita.disabled = false;
  });

  return rivi;
}

/** Osaston otsikko ja sen rivit. */
function piirraOsasto(kohde, osasto, aanetPaalla) {
  const raidat = MUSIIKKISIVUN_RAIDAT.filter((r) => r.osasto === osasto);
  if (!raidat.length) return;
  kohde.appendChild(html('h4', 'mus-osasto', OSASTOT[osasto] ?? osasto));
  for (const raita of raidat) kohde.appendChild(piirraRivi(raita, aanetPaalla));
}

/** Huomautus mykistyksestä; null jos äänet ovat päällä. */
function mykistysHuomio() {
  return html('p', 'mus-huomio',
    'Taustaäänet ovat pois päältä (valikon Taustaäänet-kytkin), joten '
    + 'soittonapit eivät ole käytössä. Rivit näkyvät silti: tila ja kesto '
    + 'kysytään metatiedoista, mikä ei soita mitään.');
}

/** Lehden johdanto ja lähderivi ensimmäisen sivun kärkeen. */
function piirraJohdanto(kohde) {
  kohde.appendChild(html('p', 'johdanto',
    'Pelin musiikki yhdellä sivulla kuunneltavaksi. Jokainen rivi kertoo, '
    + 'mihin raitaa käytetään, mistä se haetaan, löytyykö se ja kuinka '
    + 'pitkä se on. Yksi raita soi kerrallaan, ja soitto hiljentää '
    + 'äänimaiseman kuuntelun ajaksi. Puuttuva raita on normaali tila: '
    + 'peli jää sen kohdalla hiljaiseksi eikä virhettä synny.'));
  kohde.appendChild(html('p', 'mus-lahde',
    'Raidat generoidaan ElevenLabs Music -APIlla '
    + '(tools/generoi-siirtymamusiikki.mjs, generoi-musiikki.mjs), '
    + 'tehosteet tools/generoi-tehosteet.mjs; ajo Actionsissa.'));
}

/**
 * Syntetisoitujen tehosteiden napit. Nämä eivät ole tiedostoja vaan
 * pelin oma äänisynteesi (js/sound.js): sfx.play soittaa oikean
 * äänitteen jos se on puskurissa ja muuten syntetisoidun version.
 */
function piirraSfxNapit(kohde, aanetPaalla) {
  kohde.appendChild(html('h4', 'mus-osasto', 'Pelin tehostenimet'));
  kohde.appendChild(html('p', 'mus-kaytto',
    'sfx.play(nimi) — soittaa oikean äänitteen, jos se on ladattu '
    + 'puskuriin, ja muuten syntetisoidun version. Nämä eivät kulje '
    + 'yllä olevan Soita/Pysäytä-koneiston kautta eivätkä hiljennä '
    + 'äänimaisemaa: tehoste on lyhyt.'));
  if (!aanetPaalla) {
    kohde.appendChild(html('p', 'mus-huomio',
      'Taustaäänet ovat pois päältä, joten napit eivät soita mitään.'));
  }
  const kotelo = html('div', 'mus-sfx');
  for (const nimi of SFX_NIMET) {
    const nappi = html('button', 'wiki-btn mus-sfx-nappi', nimi);
    nappi.type = 'button';
    nappi.disabled = !aanetPaalla;
    nappi.addEventListener('click', () => {
      if (sfx.enabled) sfx.play(nimi);
    });
    kotelo.appendChild(nappi);
  }
  kohde.appendChild(kotelo);
}

/**
 * Yhden sivun piirto. Sivunvaihto pysäyttää soivan raidan: napit
 * katoavat DOMin mukana, joten soittoa ei enää voisi pysäyttää.
 */
function piirraSivu(kohde, ui, osastot, { johdanto = false, sfxNapit = false } = {}) {
  pysaytaMusiikkisivu();
  kytkeSulku(ui);
  const aanetPaalla = Boolean(sfx.enabled);
  if (johdanto) piirraJohdanto(kohde);
  if (!aanetPaalla) kohde.appendChild(mykistysHuomio());
  for (const osasto of osastot) piirraOsasto(kohde, osasto, aanetPaalla);
  if (sfxNapit) piirraSfxNapit(kohde, aanetPaalla);
}

/** Musiikki-lehden sivut kehittäjän liitteenä (js/lehti.js). */
export function musiikkiSivut() {
  return [
    {
      id: 'musiikki-siirtymat',
      nimi: 'Musiikki',
      yksipalsta: true,
      rakenna: (kohde, ui) => piirraSivu(kohde, ui, ['siirtyma', 'linssi'], { johdanto: true }),
    },
    {
      id: 'musiikki-paletti',
      nimi: 'Paletti',
      yksipalsta: true,
      rakenna: (kohde, ui) => piirraSivu(kohde, ui, ['paletti', 'kaupunki']),
    },
    {
      id: 'musiikki-tehosteet',
      nimi: 'Tehosteet',
      yksipalsta: true,
      rakenna: (kohde, ui) => piirraSivu(kohde, ui, ['tehoste'], { sfxNapit: true }),
    },
  ];
}

/** Vain testejä varten: unohtaa tarkistukset ja pysäyttää soiton. */
export function nollaaMusiikkisivu() {
  tarkistetut.clear();
  pysaytaMusiikkisivu();
}
