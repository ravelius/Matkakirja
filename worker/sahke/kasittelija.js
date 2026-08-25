/*
 * SÄHKEJÄRJESTELMÄ — käsittelijälogiikka (moninpelin taustapalvelu).
 *
 * MITÄ TÄMÄ ON: pelaaja voi perustaa RETKIKUNNAN ja kutsua siihen
 * enintään kahdeksan matkakumppania kuuden merkin liittymiskoodilla.
 * Retkikunnan jäsenet näkevät toistensa etenemisen SÄHKEINÄ ja voivat
 * pyytää toisiltaan apua laatan arvoitukseen.
 *
 * KAKSI SÄÄNTÖÄ, JOTKA MÄÄRÄÄVÄT KAIKEN MUUN
 *
 *   1. SÄHKEESSÄ EI OLE VAPAATA TEKSTIÄ. Sähke on valkolistattu POHJA
 *      ('saavuin', 'aarre-loytyi', …) ja pelin kaupunkitunnus — ei
 *      riviäkään pelaajan kirjoittamaa. Peli ei ole viestikanava
 *      tuntemattomien välillä, ja tämä on ainoa tapa taata se: kun
 *      kenttää ei ole, siihen ei voi kirjoittaa. Ylimääräinen kenttä
 *      rungossa ei mene läpi vaan kaataa pyynnön 400:aan — hiljainen
 *      ohitus antaisi asiakkaan luulla, että kenttä tallennettiin.
 *
 *   2. NIMIMERKKI KOOTAAN VALKOLISTALTA. "Utelias Ilves" on kaksi
 *      sanaa kahdesta sanalistasta (nimimerkit.js). Palvelin tarkistaa
 *      ja palauttaa kanonisen muodon.
 *
 * APUPYYNTÖ on ainoa kohta, jossa liikkuu tekstiä — ja sekin on PELIN
 * OMAA sisältöä: asiakas lähettää laatan kysymyksen ja sen vaihtoehdot
 * sellaisina kuin peli ne näytti. Teksti mitoitetaan ja escapetaan
 * tallennettaessa, koska palvelin ei voi tietää, mistä asiakas sen
 * todella otti.
 *
 * REITIT
 *   POST /retkikunta/luo    {nimimerkki}
 *   POST /retkikunta/liity  {koodi, nimimerkki}
 *   GET  /retkikunta/tila?koodi=&jasenId=&avain=
 *   POST /sahke             {koodi, jasenId, avain, pohjaId, paikkaId}
 *   POST /apu/kysy          {koodi, jasenId, avain, apuId, kysymys, vaihtoehdot}
 *   POST /apu/vastaa        {koodi, jasenId, avain, apuId, veikkaus}
 *
 * TURVA: jokainen kirjoitus (ja tilannekuvan luku) vaatii kolmikon
 * koodi + jasenId + avain. Avain on jäsenkohtainen salaisuus, joka
 * annetaan kerran luonnissa tai liittymisessä; tietokannassa on vain
 * sen SHA-256, ja vertailu on vakioaikainen (vrt.
 * worker/ehdotukset/pro.js). Origin-portti on sama kuin
 * ehdotusworkerissa: pelin oma origin tai localhost.
 *
 * Logiikka on omana moduulinaan, jotta sen voi ajaa Nodessa ilman
 * wrangleria ja ilman D1:tä (tests/sahke-worker.test.mjs).
 */

import { normalisoiNimimerkki } from './nimimerkit.js';
import { teeVarasto } from './varasto.js';

/* ------------------------------------------------------------------ *
 * Vakiot
 * ------------------------------------------------------------------ */

/**
 * SÄHKEPOHJAT — valkolista. Asiakas lähettää tunnuksen, ei tekstiä;
 * sanamuoto asuu pelissä, jotta sen voi kirjoittaa uusiksi ilman
 * workerin julkaisua. Uusi pohja lisätään tähän listaan ja peliin —
 * tuntematon pohja on 400.
 */
export const POHJAT = Object.freeze([
  'aarre-loytyi',
  'saavuin',
  'vinkki-ei-paakaupunki',
  'vinkki-vesi',
  'vinkki-vuori',
  'juliste-saatu',
  'apua-arvoitus',
]);

export const JASENIA_ENINTAAN = 8;

/*
 * LIITTYMISKOODI luetaan ääneen ja näpytellään puhelimella, joten
 * aakkostosta puuttuvat sekoittuvat merkit I, O, 0 ja 1 (sama
 * aakkosto kuin pro-koodeissa). 32 merkkiä jakaa 256 tasan, joten
 * arvonta ei vinoudu. Kuusi merkkiä = noin miljardi koodia.
 */
export const KOODIN_PITUUS = 6;
const KOODIN_MERKIT = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/** Jäsentunnus on julkinen retkikunnan sisällä; avain ei ole koskaan. */
const TUNNUKSEN_MERKIT = 'abcdefghijkmnpqrstuvwxyz23456789';
export const JASENTUNNUKSEN_PITUUS = 12;
export const AVAIMEN_PITUUS = 32;

/** Apupyynnön mitat (omistajan speksi). */
export const KYSYMYKSEN_KATTO = 300;
export const VAIHTOEHDON_KATTO = 120;
export const VAIHTOEHTOJA_ENINTAAN = 4;
export const VAIHTOEHTOJA_VAHINTAAN = 2;

/** Tilannekuvan katot: yksi pyyntö ei koskaan palauta rajatta rivejä. */
export const LISTAN_KATTO = 200;

/** Siivousikkuna: sähkeet ja apupyynnöt vanhenevat kahdessa viikossa. */
export const SAILYTYS_VRK = 14;
/** Hiljentynyt retkikunta (jäsenineen) katoaa kuukaudessa. */
export const RETKIKUNNAN_SAILYTYS_VRK = 30;
const VRK_MS = 24 * 60 * 60 * 1000;

/** Karkea kirjoitusrajoitin: enintään 30 kirjoitusta minuutissa per jäsen. */
export const KIRJOITUKSIA_IKKUNASSA = 30;
export const IKKUNA_MS = 60 * 1000;

/** Retkikunnan elossa-leima päivitetään pollatessa korkeintaan tunnin välein. */
const LEIMAN_VALI_MS = 60 * 60 * 1000;

/** Muodot, jotka tarkistetaan ennen kuin mitään haetaan varastosta. */
const KOODI_MUOTO = new RegExp(`^[${KOODIN_MERKIT}]{${KOODIN_PITUUS}}$`);
const JASEN_MUOTO = new RegExp(`^[${TUNNUKSEN_MERKIT}]{${JASENTUNNUKSEN_PITUUS}}$`);
const AVAIN_MUOTO = new RegExp(`^[${TUNNUKSEN_MERKIT}]{${AVAIMEN_PITUUS}}$`);
/** Pelin kaupunkitunnus, esim. 'madrid' tai 'rio-de-janeiro'. */
const PAIKKA_MUOTO = /^[a-z0-9-]{2,40}$/;
/** Apupyynnön tunnus on asiakkaan antama; muoto rajataan silti tiukasti. */
const APU_MUOTO = /^[A-Za-z0-9_-]{1,64}$/;

/* ------------------------------------------------------------------ *
 * Pienet apurit
 * ------------------------------------------------------------------ */

/**
 * Vakioaikainen vertailu — sama toteutus kuin
 * worker/ehdotukset/kasittelija.js:ssä. Kopio eikä tuonti: nämä ovat
 * kaksi eri workeria, eikä sähkeiden nippuun kuulu R2-logiikkaa.
 */
export function vertaaSalaisuus(annettu, oikea) {
  if (typeof annettu !== 'string' || typeof oikea !== 'string') return false;
  if (!oikea || annettu.length !== oikea.length) return false;
  let ero = 0;
  for (let i = 0; i < oikea.length; i += 1) {
    ero |= annettu.charCodeAt(i) ^ oikea.charCodeAt(i);
  }
  return ero === 0;
}

/** Sallitut originit ympäristöstä (pilkulla erotettuna). */
export function sallitutOriginit(env) {
  return String(env?.SAHKE_ORIGINIT ?? '')
    .split(',').map((o) => o.trim()).filter(Boolean);
}

/** Onko origin sallittu? Paikallinen kehityspalvelin kelpaa aina. */
export function sallittuOrigin(origin, sallitut) {
  if (!origin) return false;
  if (sallitut.includes(origin)) return true;
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function korsOtsakkeet(origin, sallitut) {
  const otsakkeet = {
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    vary: 'Origin',
  };
  if (sallittuOrigin(origin, sallitut)) otsakkeet['access-control-allow-origin'] = origin;
  return otsakkeet;
}

function vastaa(data, { status = 200, origin = null, sallitut = [] } = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // Tilannekuva vanhenee sekunneissa — välimuisti ei saa koskea siihen.
      'cache-control': 'no-store',
      ...korsOtsakkeet(origin, sallitut),
    },
  });
}

/** Satunnainen merkkijono annetusta aakkostosta (tasajakauma). */
function arvo(merkit, pituus) {
  const tavut = new Uint8Array(pituus);
  crypto.getRandomValues(tavut);
  let ulos = '';
  for (const tavu of tavut) ulos += merkit[tavu % merkit.length];
  return ulos;
}

export function teeKoodi() { return arvo(KOODIN_MERKIT, KOODIN_PITUUS); }
export function teeJasenId() { return arvo(TUNNUKSEN_MERKIT, JASENTUNNUKSEN_PITUUS); }
export function teeAvain() { return arvo(TUNNUKSEN_MERKIT, AVAIMEN_PITUUS); }

/** Sähkeen tunnus. Aikaleima on omassa sarakkeessaan, joten tämä on pelkkä arpa. */
function teeSahkeId() { return arvo(TUNNUKSEN_MERKIT, 16); }

/**
 * Jäsenavaimen tiiviste. Tietokantaan ei kirjoiteta salaisuutta vaan
 * sen SHA-256: varaston vuoto ei anna oikeutta kirjoittaa kenenkään
 * nimissä. Suola on vakio, koska avain on jo 32 merkkiä arvottua
 * satunnaisuutta — sanakirjahyökkäystä vastaan ei ole mitään suojattavaa.
 */
export async function avainTiiviste(avain) {
  const tavut = new TextEncoder().encode(`matkakirja-sahke:${avain}`);
  const tiiviste = await crypto.subtle.digest('SHA-256', tavut);
  return [...new Uint8Array(tiiviste)].map((t) => t.toString(16).padStart(2, '0')).join('');
}

/** Aika rajapinnalle: tietokannassa millisekunteja, ulospäin ISO-8601. */
function aikaIso(ms) { return new Date(ms).toISOString(); }

/**
 * HTML-escape tallennettaessa. Peli piirtää tekstin itse, mutta
 * apupyynnön kysymys on ainoa kenttä, jonka sisältö tulee asiakkaalta
 * — se siivotaan siinä vaiheessa, kun se menee varastoon, jotta
 * yksikään lukija ei voi saada raakaa merkkausta.
 */
export function siivoaTeksti(teksti, katto) {
  return String(teksti ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, katto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Runko saa sisältää TÄSMÄLLEEN sallitut kentät — ei enempää.
 *
 * @param {object} runko jäsennetty JSON
 * @param {string[]} sallitut kenttien nimet
 * @returns {string} ylimääräisen kentän nimi tai '' jos runko on siisti
 */
export function ylimaarainenKentta(runko, sallitut) {
  if (!runko || typeof runko !== 'object' || Array.isArray(runko)) return '(runko)';
  for (const nimi of Object.keys(runko)) {
    if (!sallitut.includes(nimi)) return nimi;
  }
  return '';
}

/** Liittymiskoodi vertailukelpoiseksi: isot kirjaimet, välimerkit pois. */
export function normalisoiKoodi(teksti) {
  return String(teksti ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16);
}

/* ------------------------------------------------------------------ *
 * Tunnistus ja rajoitin
 * ------------------------------------------------------------------ */

/*
 * Valetiiviste tuntemattomalle kolmikolle: vertailu tehdään joka
 * tapauksessa, jottei vastausaika kerro, onko koodi tai jäsen olemassa.
 */
const VALE_TIIVISTE = '0'.repeat(64);

/**
 * Tarkistaa kolmikon koodi + jasenId + avain.
 *
 * @returns {Promise<{jasen: object}|null>} jäsen tai null
 */
async function tunnista(varasto, tunnukset) {
  const koodi = normalisoiKoodi(tunnukset.koodi);
  const jasenId = String(tunnukset.jasenId ?? '');
  const avain = String(tunnukset.avain ?? '');
  if (!KOODI_MUOTO.test(koodi) || !JASEN_MUOTO.test(jasenId) || !AVAIN_MUOTO.test(avain)) {
    vertaaSalaisuus(VALE_TIIVISTE, VALE_TIIVISTE);
    return null;
  }
  const jasen = await varasto.haeJasen(koodi, jasenId);
  const annettu = await avainTiiviste(avain);
  if (!jasen) {
    vertaaSalaisuus(annettu, VALE_TIIVISTE);
    return null;
  }
  if (!vertaaSalaisuus(annettu, jasen.avainTiiviste ?? '')) return null;
  return { jasen };
}

/**
 * Karkea kirjoitusrajoitin. Ikkuna on jäsenen omassa rivissä, joten
 * rajoitin ei tarvitse omaa varastoaan eikä se katoa kylmäkäynnistyksessä.
 *
 * @returns {Promise<boolean>} true jos kirjoitus mahtuu ikkunaan
 */
async function rajoita(varasto, jasen, nyt) {
  /*
   * Ikkunan vaihto päätellään OMANA lippunaan eikä vertaamalla
   * ikkunan alkua nykyhetkeen: kaksi kirjoitusta samalla
   * millisekunnilla ovat molemmat "ikkunan alussa", ja vertailu
   * nollaisi laskurin joka kerta — rajoitin ei rajoittaisi mitään.
   */
  const uusiIkkuna = nyt - jasen.ikkuna > IKKUNA_MS;
  const ikkunaAlkoi = uusiIkkuna ? nyt : jasen.ikkuna;
  const laskuri = uusiIkkuna ? 1 : jasen.laskuri + 1;
  await varasto.paivitaKirjoitusIkkuna(jasen.koodi, jasen.jasenId, ikkunaAlkoi, laskuri, nyt);
  return laskuri <= KIRJOITUKSIA_IKKUNASSA;
}

/* ------------------------------------------------------------------ *
 * Retkikunnan perustaminen ja liittyminen
 * ------------------------------------------------------------------ */

/** Uusi jäsen: tunnus, avain ja rivi varastoon. Palauttaa avaimen SELVÄKIELISENÄ. */
async function liitaJasen(varasto, koodi, nimimerkki, nyt) {
  const jasenId = teeJasenId();
  const avain = teeAvain();
  await varasto.lisaaJasen({
    koodi,
    jasenId,
    nimimerkki,
    avainTiiviste: await avainTiiviste(avain),
    liittyi: nyt,
  });
  return { jasenId, avain };
}

/** POST /retkikunta/luo — perustaja saa koodin, tunnuksen ja avaimen. */
async function luo(pyynto, varasto, kors, nyt) {
  let runko;
  try {
    runko = await pyynto.json();
  } catch {
    return vastaa({ virhe: 'Runko ei jäsenny' }, { status: 400, ...kors });
  }
  const ylimaarainen = ylimaarainenKentta(runko, ['nimimerkki']);
  if (ylimaarainen) {
    return vastaa({ virhe: `Tuntematon kenttä: ${ylimaarainen}` }, { status: 400, ...kors });
  }
  const nimimerkki = normalisoiNimimerkki(runko.nimimerkki);
  if (!nimimerkki) {
    return vastaa({ virhe: 'Nimimerkki ei ole sanalistoilta.' }, { status: 400, ...kors });
  }

  /*
   * Koodi arvotaan ja varataan samalla kertaa (INSERT OR IGNORE).
   * Törmäys on miljardin koodin joukossa harvinainen, mutta silmukka
   * on halvempi kuin selittää pelaajalle, miksi liittyminen vie hänet
   * jonkun toisen retkikuntaan.
   */
  let koodi = '';
  for (let yritys = 0; yritys < 8 && !koodi; yritys += 1) {
    const ehdokas = teeKoodi();
    // eslint-disable-next-line no-await-in-loop
    if (await varasto.luoRetkikunta(ehdokas, nyt)) koodi = ehdokas;
  }
  if (!koodi) {
    return vastaa({ virhe: 'Koodia ei saatu varattua, yritä uudelleen.' },
      { status: 503, ...kors });
  }

  const { jasenId, avain } = await liitaJasen(varasto, koodi, nimimerkki, nyt);
  // Retkikunnan perustaminen on harvinainen tapahtuma ja siksi hyvä
  // hetki siivota — cron-liipaisin tekee saman kerran vuorokaudessa.
  await siivoa(varasto, nyt);
  return vastaa({ koodi, jasenId, avain }, kors);
}

/** POST /retkikunta/liity — koodilla mukaan, enintään kahdeksan jäsentä. */
async function liity(pyynto, varasto, kors, nyt) {
  let runko;
  try {
    runko = await pyynto.json();
  } catch {
    return vastaa({ virhe: 'Runko ei jäsenny' }, { status: 400, ...kors });
  }
  const ylimaarainen = ylimaarainenKentta(runko, ['koodi', 'nimimerkki']);
  if (ylimaarainen) {
    return vastaa({ virhe: `Tuntematon kenttä: ${ylimaarainen}` }, { status: 400, ...kors });
  }
  const koodi = normalisoiKoodi(runko.koodi);
  if (!KOODI_MUOTO.test(koodi)) {
    return vastaa({ virhe: 'Liittymiskoodi ei kelpaa.' }, { status: 400, ...kors });
  }
  const nimimerkki = normalisoiNimimerkki(runko.nimimerkki);
  if (!nimimerkki) {
    return vastaa({ virhe: 'Nimimerkki ei ole sanalistoilta.' }, { status: 400, ...kors });
  }
  if (!await varasto.haeRetkikunta(koodi)) {
    return vastaa({ virhe: 'Retkikuntaa ei löydy.' }, { status: 404, ...kors });
  }

  const jasenet = await varasto.haeJasenet(koodi);
  if (jasenet.length >= JASENIA_ENINTAAN) {
    return vastaa({ virhe: `Retkikunta on täynnä (${JASENIA_ENINTAAN}).` },
      { status: 409, ...kors });
  }
  /*
   * Kaksi samannimistä samassa retkikunnassa tekisi sähkeistä
   * lukukelvottomia. Sanapareja on 576 ja jäseniä kahdeksan, joten
   * törmäys on harvinainen mutta mahdollinen — asiakas arpoo uuden.
   */
  if (jasenet.some((j) => j.nimimerkki === nimimerkki)) {
    return vastaa({ virhe: 'Nimimerkki on jo käytössä tässä retkikunnassa.' },
      { status: 409, ...kors });
  }

  const { jasenId, avain } = await liitaJasen(varasto, koodi, nimimerkki, nyt);
  await varasto.koskeRetkikuntaan(koodi, nyt);
  const kaikki = [...jasenet.map((j) => ({ jasenId: j.jasenId, nimimerkki: j.nimimerkki })),
    { jasenId, nimimerkki }];
  return vastaa({ jasenId, avain, jasenet: kaikki }, kors);
}

/* ------------------------------------------------------------------ *
 * Tilannekuva
 * ------------------------------------------------------------------ */

/**
 * Jäsenen virstanpylväät johdetaan hänen omista sähkeistään: sama
 * pohja samassa kaupungissa on yksi virstanpylväs, vanhin ensin.
 * Erillistä taulua ei ole, koska silloin sama tieto olisi kahdessa
 * paikassa ja voisi mennä eri tahtiin.
 */
function virstanpylvaat(sahkeetUusinEnsin, jasenId) {
  const nahdyt = new Set();
  const ulos = [];
  for (let i = sahkeetUusinEnsin.length - 1; i >= 0; i -= 1) {
    const sahke = sahkeetUusinEnsin[i];
    if (sahke.lahettaja !== jasenId) continue;
    const tunniste = `${sahke.pohjaId}|${sahke.paikkaId}`;
    if (nahdyt.has(tunniste)) continue;
    nahdyt.add(tunniste);
    ulos.push({ pohjaId: sahke.pohjaId, paikkaId: sahke.paikkaId, aika: aikaIso(sahke.aika) });
  }
  return ulos;
}

/** GET /retkikunta/tila — koko oman retkikunnan tilannekuva yhdellä pyynnöllä. */
async function tila(url, varasto, kors, nyt) {
  const loyto = await tunnista(varasto, {
    koodi: url.searchParams.get('koodi'),
    jasenId: url.searchParams.get('jasenId'),
    avain: url.searchParams.get('avain'),
  });
  if (!loyto) {
    return vastaa({ virhe: 'Tunnukset eivät täsmää.' }, { status: 401, ...kors });
  }
  const { koodi } = loyto.jasen;

  const [jasenet, sahkeet, apupyynnot, apuvastaukset] = await Promise.all([
    varasto.haeJasenet(koodi),
    varasto.haeSahkeet(koodi, LISTAN_KATTO),
    varasto.haeApupyynnot(koodi, LISTAN_KATTO),
    varasto.haeApuvastaukset(koodi, LISTAN_KATTO),
  ]);

  /*
   * Elossa-leima päivitetään pollatessakin, muuten aktiivinen mutta
   * hiljainen retkikunta siivoutuisi alta. Korkeintaan kerran tunnissa:
   * pollaus on tiheää eikä siitä saa tulla kirjoituskuormaa.
   */
  const retkikunta = await varasto.haeRetkikunta(koodi);
  if (retkikunta && nyt - (retkikunta.nahty ?? 0) > LEIMAN_VALI_MS) {
    await varasto.koskeRetkikuntaan(koodi, nyt);
  }

  return vastaa({
    jasenet: jasenet.map((j) => ({
      jasenId: j.jasenId,
      nimimerkki: j.nimimerkki,
      virstanpylvaat: virstanpylvaat(sahkeet, j.jasenId),
    })),
    sahkeet: sahkeet.map((s) => ({
      id: s.id,
      lahettaja: s.lahettaja,
      pohjaId: s.pohjaId,
      paikkaId: s.paikkaId,
      aika: aikaIso(s.aika),
    })),
    apupyynnot: apupyynnot.map((a) => ({
      apuId: a.apuId,
      kysyja: a.kysyja,
      kysymys: a.kysymys,
      vaihtoehdot: a.vaihtoehdot,
      aika: aikaIso(a.aika),
    })),
    apuvastaukset: apuvastaukset.map((v) => ({
      apuId: v.apuId,
      vastaaja: v.vastaaja,
      veikkaus: v.veikkaus,
      aika: aikaIso(v.aika),
    })),
  }, kors);
}

/* ------------------------------------------------------------------ *
 * Kirjoitukset
 * ------------------------------------------------------------------ */

/**
 * Yhteinen alku jokaiselle kirjoitukselle: runko, kenttäportti,
 * tunnistus ja rajoitin.
 *
 * @returns {Promise<{runko: object, jasen: object}|Response>} tiedot tai valmis virhe
 */
async function avaaKirjoitus(pyynto, varasto, kors, nyt, sallitutKentat) {
  let runko;
  try {
    runko = await pyynto.json();
  } catch {
    return vastaa({ virhe: 'Runko ei jäsenny' }, { status: 400, ...kors });
  }
  const ylimaarainen = ylimaarainenKentta(runko, sallitutKentat);
  if (ylimaarainen) {
    return vastaa({ virhe: `Tuntematon kenttä: ${ylimaarainen}` }, { status: 400, ...kors });
  }
  const loyto = await tunnista(varasto, runko);
  if (!loyto) {
    return vastaa({ virhe: 'Tunnukset eivät täsmää.' }, { status: 401, ...kors });
  }
  if (!await rajoita(varasto, loyto.jasen, nyt)) {
    return vastaa({ virhe: 'Liikaa lähetyksiä hetkessä — hengähdä hetki.' },
      { status: 429, ...kors });
  }
  return { runko, jasen: loyto.jasen };
}

/** POST /sahke — valkolistattu pohja ja pelin kaupunkitunnus, ei muuta. */
async function sahke(pyynto, varasto, kors, nyt) {
  const avattu = await avaaKirjoitus(pyynto, varasto, kors, nyt,
    ['koodi', 'jasenId', 'avain', 'pohjaId', 'paikkaId']);
  if (avattu instanceof Response) return avattu;
  const { runko, jasen } = avattu;

  const pohjaId = String(runko.pohjaId ?? '');
  if (!POHJAT.includes(pohjaId)) {
    return vastaa({ virhe: 'Tuntematon sähkepohja.' }, { status: 400, ...kors });
  }
  const paikkaId = String(runko.paikkaId ?? '');
  if (!PAIKKA_MUOTO.test(paikkaId)) {
    return vastaa({ virhe: 'Paikkatunnus ei kelpaa.' }, { status: 400, ...kors });
  }

  const rivi = {
    koodi: jasen.koodi,
    id: teeSahkeId(),
    lahettaja: jasen.jasenId,
    pohjaId,
    paikkaId,
    aika: nyt,
  };
  await varasto.lisaaSahke(rivi);
  await varasto.koskeRetkikuntaan(jasen.koodi, nyt);
  return vastaa({
    ok: true,
    sahke: {
      id: rivi.id,
      lahettaja: rivi.lahettaja,
      pohjaId,
      paikkaId,
      aika: aikaIso(nyt),
    },
  }, kors);
}

/** POST /apu/kysy — laatan kysymys ja vaihtoehdot retkikunnan nähtäväksi. */
async function apuKysy(pyynto, varasto, kors, nyt) {
  const avattu = await avaaKirjoitus(pyynto, varasto, kors, nyt,
    ['koodi', 'jasenId', 'avain', 'apuId', 'kysymys', 'vaihtoehdot']);
  if (avattu instanceof Response) return avattu;
  const { runko, jasen } = avattu;

  const apuId = String(runko.apuId ?? '');
  if (!APU_MUOTO.test(apuId)) {
    return vastaa({ virhe: 'Apupyynnön tunnus ei kelpaa.' }, { status: 400, ...kors });
  }
  const kysymys = siivoaTeksti(runko.kysymys, KYSYMYKSEN_KATTO);
  if (!kysymys) {
    return vastaa({ virhe: 'Kysymys puuttuu.' }, { status: 400, ...kors });
  }
  if (!Array.isArray(runko.vaihtoehdot)
    || runko.vaihtoehdot.length < VAIHTOEHTOJA_VAHINTAAN
    || runko.vaihtoehdot.length > VAIHTOEHTOJA_ENINTAAN) {
    return vastaa({
      virhe: `Vaihtoehtoja on oltava ${VAIHTOEHTOJA_VAHINTAAN}–${VAIHTOEHTOJA_ENINTAAN}.`,
    }, { status: 400, ...kors });
  }
  const vaihtoehdot = runko.vaihtoehdot.map((v) => siivoaTeksti(v, VAIHTOEHDON_KATTO));
  if (vaihtoehdot.some((v) => !v)) {
    return vastaa({ virhe: 'Tyhjä vaihtoehto ei kelpaa.' }, { status: 400, ...kors });
  }

  /*
   * Sama apuId kahdesti on tavallinen tilanne: verkko pätki ja asiakas
   * lähetti uudestaan. Oma pyyntö on silloin ok (idempotentti), mutta
   * toisen jäsenen pyyntöä ei saa korvata.
   */
  const vanha = await varasto.haeApupyynto(jasen.koodi, apuId);
  if (vanha && vanha.kysyja !== jasen.jasenId) {
    return vastaa({ virhe: 'Apupyynnön tunnus on jo varattu.' }, { status: 409, ...kors });
  }
  if (!vanha) {
    await varasto.lisaaApupyynto({
      koodi: jasen.koodi, apuId, kysyja: jasen.jasenId, kysymys, vaihtoehdot, aika: nyt,
    });
  }
  await varasto.koskeRetkikuntaan(jasen.koodi, nyt);

  const tallennettu = vanha ?? { apuId, kysyja: jasen.jasenId, kysymys, vaihtoehdot, aika: nyt };
  return vastaa({
    ok: true,
    apu: {
      apuId: tallennettu.apuId,
      kysyja: tallennettu.kysyja,
      kysymys: tallennettu.kysymys,
      vaihtoehdot: tallennettu.vaihtoehdot,
      aika: aikaIso(tallennettu.aika),
    },
  }, kors);
}

/** POST /apu/vastaa — veikkaus on indeksi vaihtoehtoihin, ei tekstiä. */
async function apuVastaa(pyynto, varasto, kors, nyt) {
  const avattu = await avaaKirjoitus(pyynto, varasto, kors, nyt,
    ['koodi', 'jasenId', 'avain', 'apuId', 'veikkaus']);
  if (avattu instanceof Response) return avattu;
  const { runko, jasen } = avattu;

  const apuId = String(runko.apuId ?? '');
  if (!APU_MUOTO.test(apuId)) {
    return vastaa({ virhe: 'Apupyynnön tunnus ei kelpaa.' }, { status: 400, ...kors });
  }
  const pyyntoRivi = await varasto.haeApupyynto(jasen.koodi, apuId);
  if (!pyyntoRivi) {
    return vastaa({ virhe: 'Apupyyntöä ei löydy.' }, { status: 404, ...kors });
  }
  // Avunpyytäjä ei veikkaa omaan pyyntöönsä — muuten vastauslista
  // näyttäisi kaverin mielipiteeltä sellainen, mikä on oma arvaus.
  if (pyyntoRivi.kysyja === jasen.jasenId) {
    return vastaa({ virhe: 'Omaan apupyyntöön ei vastata.' }, { status: 409, ...kors });
  }

  const veikkaus = Number(runko.veikkaus);
  if (!Number.isInteger(veikkaus) || veikkaus < 0
    || veikkaus >= pyyntoRivi.vaihtoehdot.length) {
    return vastaa({ virhe: 'Veikkaus on vaihtoehdon järjestysnumero.' },
      { status: 400, ...kors });
  }

  await varasto.tallennaApuvastaus({
    koodi: jasen.koodi, apuId, vastaaja: jasen.jasenId, veikkaus, aika: nyt,
  });
  await varasto.koskeRetkikuntaan(jasen.koodi, nyt);
  return vastaa({
    ok: true,
    vastaus: { apuId, vastaaja: jasen.jasenId, veikkaus, aika: aikaIso(nyt) },
  }, kors);
}

/* ------------------------------------------------------------------ *
 * Siivous
 * ------------------------------------------------------------------ */

/**
 * Poistaa vanhentuneen sisällön. Sähkeet ja apupyynnöt elävät kaksi
 * viikkoa, kokonaan hiljentynyt retkikunta jäsenineen kuukauden.
 *
 * @param {object} varasto varasto
 * @param {number} nyt aika millisekunteina
 */
export async function siivoa(varasto, nyt) {
  await varasto.siivoa(nyt - SAILYTYS_VRK * VRK_MS, nyt - RETKIKUNNAN_SAILYTYS_VRK * VRK_MS);
}

/** Cron-liipaisimen sisääntulo (worker.js: scheduled). */
export async function siivoaYmparisto(env, apurit = {}) {
  const varasto = apurit.varasto ?? teeVarasto(env.SAHKE);
  await siivoa(varasto, apurit.nyt ? apurit.nyt() : Date.now());
}

/* ------------------------------------------------------------------ *
 * Reititys
 * ------------------------------------------------------------------ */

/**
 * Koko workerin käsittely.
 *
 * @param {Request} pyynto pyyntö
 * @param {object} env ympäristö: SAHKE (D1), SAHKE_ORIGINIT
 * @param {object} apurit testien koukut: { nyt, varasto }
 * @returns {Promise<Response>} vastaus
 */
export async function kasittele(pyynto, env, apurit = {}) {
  const url = new URL(pyynto.url);
  const origin = pyynto.headers.get('origin');
  const sallitut = sallitutOriginit(env);
  const kors = { origin, sallitut };

  if (pyynto.method === 'OPTIONS') {
    if (!sallittuOrigin(origin, sallitut)) return new Response(null, { status: 403 });
    return new Response(null, { status: 204, headers: korsOtsakkeet(origin, sallitut) });
  }

  /*
   * Kaikki reitit ovat pelin selaimesta tulevia — myös tilannekuvan
   * luku, joka palauttaa retkikunnan yksityistä tietoa. Origin-portti
   * on ensimmäinen lukko ja kolmikko koodi+jasenId+avain toinen.
   */
  if (!sallittuOrigin(origin, sallitut)) {
    return vastaa({ virhe: 'Origin ei ole sallittu' }, { status: 403, ...kors });
  }

  const varasto = apurit.varasto ?? (env?.SAHKE ? teeVarasto(env.SAHKE) : null);
  if (!varasto) {
    return vastaa({ virhe: 'Tietokanta ei ole kytketty' }, { status: 503, ...kors });
  }
  const nyt = apurit.nyt ? apurit.nyt() : Date.now();
  const vain = (metodi) => vastaa({ virhe: `Vain ${metodi}` }, { status: 405, ...kors });

  switch (url.pathname) {
    case '/retkikunta/luo':
      return pyynto.method === 'POST' ? luo(pyynto, varasto, kors, nyt) : vain('POST');
    case '/retkikunta/liity':
      return pyynto.method === 'POST' ? liity(pyynto, varasto, kors, nyt) : vain('POST');
    case '/retkikunta/tila':
      return pyynto.method === 'GET' ? tila(url, varasto, kors, nyt) : vain('GET');
    case '/sahke':
      return pyynto.method === 'POST' ? sahke(pyynto, varasto, kors, nyt) : vain('POST');
    case '/apu/kysy':
      return pyynto.method === 'POST' ? apuKysy(pyynto, varasto, kors, nyt) : vain('POST');
    case '/apu/vastaa':
      return pyynto.method === 'POST' ? apuVastaa(pyynto, varasto, kors, nyt) : vain('POST');
    default:
      return vastaa({ virhe: 'Tuntematon reitti' }, { status: 404, ...kors });
  }
}
