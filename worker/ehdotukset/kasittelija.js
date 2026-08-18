/*
 * LUKIJOIDEN EHDOTUKSET — käsittelijälogiikka.
 *
 * Tämä moduuli on koko workerin sisältö: worker.js on pelkkä kuori,
 * joka antaa käsittelijälle pyynnön ja ympäristön. Jako on tehty
 * testejä varten — käsittelijän voi ajaa Nodessa ilman wrangleria
 * (tests/ehdotukset-worker.test.mjs, mock-R2).
 *
 * MITÄ TÄMÄ ON: pelaaja voi lähettää palautelomakkeen laajennuksella
 * kuvia ja juttuideoita lehtiin (js/tyohuone-raamattu.js, osio
 * "Lukijoiden ehdotukset"). Lähetykset menevät YKSITYISEEN R2-
 * ämpäriin — EIVÄT pelin julkiseen peiliin, koska mukana voi olla
 * sähköpostiosoite. Omistaja lukee ne pelin työhuoneesta
 * (Lukijoilta-lehti), joka hakee ne tämän workerin kautta avaimella.
 *
 * REITIT
 *   POST /laheta               julkinen, CORS vain pelin originille
 *   GET  /lista?avain=…        vain avaimella (metat, uusin ensin)
 *   GET  /kohde/<polku>?avain= vain avaimella (kuvan nouto)
 *   PUT  /kommentti?avain=…    vain avaimella (kuratointi)
 *
 * PRO-SISÄLLÖNTUOTTAJAT (/pro-… ja /tekija/…) ovat saman workerin
 * jatke omassa moduulissaan: worker/ehdotukset/pro.js. Reititys on
 * täällä, jotta CORS-, avain- ja origin-portit ovat yhdessä paikassa.
 *
 * SÄHKÖPOSTI ei vuoda mihinkään muualle kuin meta.jsoniin yksityisessä
 * ämpärissä: sitä ei kirjoiteta lokiin eikä palauteta kenellekään
 * ilman avainta.
 */

import { proOmistajanPolku, proPolku, proReitti, proSelaimenPolku } from './pro.js';

/** Sallitut kuvatyypit ja niiden tiedostopäätteet. */
export const KUVA_TYYPIT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/heic': 'heic',
  'image/heif': 'heic',
};

export const KUVIA_ENINTAAN = 3;
export const KUVAN_KATTO = 8 * 1024 * 1024;
export const TEKSTIN_KATTO = 4000;
export const KENTAN_KATTO = 200;
export const LISTAN_KATTO = 200;

/** Ehdotuksen kuratointitilat (kirjataan meta.jsoniin). */
export const TILAT = ['uusi', 'kuratoitu', 'hyvaksytty', 'hylatty'];

/** Kansioetuliite ämpärissä. */
export const ETULIITE = 'ehdotukset/';

/* ------------------------------------------------------------------ *
 * Pienet apurit
 * ------------------------------------------------------------------ */

/**
 * Vakioaikainen vertailu. Pituusero paljastuu joka tapauksessa, mutta
 * sisältöä ei verrata aikaisin poistuvalla vertailulla.
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
  return String(env?.EHDOTUS_ORIGINIT ?? '')
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
    'access-control-allow-methods': 'GET, POST, PUT, OPTIONS',
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
      'cache-control': 'no-store',
      ...korsOtsakkeet(origin, sallitut),
    },
  });
}

/** Lomakekentän luku: yksirivinen merkkijono, siivottuna ja katkaistuna. */
function kentta(lomake, nimi, katto = KENTAN_KATTO) {
  const arvo = lomake.get(nimi);
  if (typeof arvo !== 'string') return '';
  return arvo.replace(/\s+/g, ' ').trim().slice(0, katto);
}

/** Monirivinen kenttä: rivinvaihdot säilyvät, pituus katkaistaan. */
function tekstikentta(lomake, nimi, katto = TEKSTIN_KATTO) {
  const arvo = lomake.get(nimi);
  if (typeof arvo !== 'string') return '';
  return arvo.replace(/\r\n/g, '\n').trim().slice(0, katto);
}

/** Rasti päällä? Lomakkeet lähettävät 'on', '1' tai 'true'. */
function rasti(lomake, nimi) {
  const arvo = lomake.get(nimi);
  if (typeof arvo !== 'string') return false;
  return ['on', '1', 'true', 'kyllä', 'kylla'].includes(arvo.toLowerCase());
}

/** Kansiotunnus: aikaleima ensin, jotta lajittelu on aikajärjestys. */
export function teeKansio(nyt, tunnus) {
  const aika = nyt.toISOString().replace(/[:.]/g, '-');
  return `${ETULIITE}${aika}-${tunnus}`;
}

/** Satunnainen tunnus (kansiossa on jo aikaleima, joten kuusi merkkiä riittää). */
function satunnainenTunnus() {
  const tavut = new Uint8Array(4);
  crypto.getRandomValues(tavut);
  return [...tavut].map((t) => t.toString(16).padStart(2, '0')).join('').slice(0, 6);
}

/**
 * Onko polku turvallinen ämpärin avaimeksi? Vain oman etuliitteen
 * alta, ei kiipeilyä ylöspäin.
 */
export function turvallinenPolku(polku) {
  if (typeof polku !== 'string' || !polku.startsWith(ETULIITE)) return false;
  if (polku.includes('..') || polku.includes('//')) return false;
  return /^[\w./:-]+$/.test(polku);
}

/* ------------------------------------------------------------------ *
 * POST /laheta
 * ------------------------------------------------------------------ */

async function laheta(pyynto, env, kors, apurit) {
  const ampari = env?.EHDOTUKSET;
  if (!ampari) {
    return vastaa({ virhe: 'Ämpäri ei ole kytketty' }, { status: 503, ...kors });
  }

  let lomake;
  try {
    lomake = await pyynto.formData();
  } catch {
    return vastaa({ virhe: 'Lähetystä ei voitu lukea' }, { status: 400, ...kors });
  }

  /*
   * HUNAJAPURKKI: kenttä, joka on lomakkeessa piilossa. Ihminen ei näe
   * sitä eikä täytä sitä; robotti täyttää kaiken. Vastaus on silti
   * onnistunut, jottei robotti opi mitään.
   */
  if (kentta(lomake, 'hunaja')) {
    return vastaa({ ok: true, kansio: null }, kors);
  }

  const teksti = tekstikentta(lomake, 'teksti');
  const sivu = kentta(lomake, 'sivu');
  const tarkenne = kentta(lomake, 'tarkenne', 500);
  const nimimerkki = kentta(lomake, 'nimimerkki', 80);
  const sahkoposti = kentta(lomake, 'sahkoposti', 120);
  const saaKrediitteihin = rasti(lomake, 'saaKrediitteihin');
  const lisenssivakuutus = rasti(lomake, 'lisenssivakuutus');

  const tiedostot = lomake.getAll('kuvat')
    .filter((k) => k && typeof k === 'object' && typeof k.arrayBuffer === 'function');

  if (tiedostot.length > KUVIA_ENINTAAN) {
    return vastaa({ virhe: `Kuvia saa lähettää enintään ${KUVIA_ENINTAAN}.` },
      { status: 400, ...kors });
  }
  for (const tiedosto of tiedostot) {
    if (!KUVA_TYYPIT[tiedosto.type]) {
      return vastaa({ virhe: 'Kuvan tyyppi ei kelpaa (jpeg, png, webp tai heic).' },
        { status: 415, ...kors });
    }
    if ((tiedosto.size ?? 0) > KUVAN_KATTO) {
      return vastaa({ virhe: 'Kuva on liian iso (yli 8 Mt).' },
        { status: 413, ...kors });
    }
  }
  if (tiedostot.length && !lisenssivakuutus) {
    return vastaa({ virhe: 'Kuvista tarvitaan lisenssivakuutus.' },
      { status: 400, ...kors });
  }
  if (!teksti && !tiedostot.length) {
    return vastaa({ virhe: 'Kirjoita viesti tai liitä kuva.' },
      { status: 400, ...kors });
  }

  const nyt = apurit.nyt ? apurit.nyt() : new Date();
  const kansio = teeKansio(nyt, apurit.tunnus ? apurit.tunnus() : satunnainenTunnus());

  const kuvat = [];
  for (let i = 0; i < tiedostot.length; i += 1) {
    const tiedosto = tiedostot[i];
    const paate = KUVA_TYYPIT[tiedosto.type];
    const nimi = `kuva-${i + 1}.${paate}`;
    // eslint-disable-next-line no-await-in-loop
    await ampari.put(`${kansio}/${nimi}`, await tiedosto.arrayBuffer(), {
      httpMetadata: { contentType: tiedosto.type },
    });
    kuvat.push({ tiedosto: nimi, tyyppi: tiedosto.type, koko: tiedosto.size ?? null });
  }

  /*
   * META.JSON — tietomalli (päätoimittajan tarkennus 18.8.2026:
   * kuratoinnin läpäissyt ehdotus palkitaan pelirahalla lunastus-
   * koodilla). Palkkiokentät varataan JO NYT, vaikka itse lunastus
   * peliin rakennetaan vasta vaiheessa 2 — näin vanhoja meta.jsoneja
   * ei tarvitse myöhemmin siirtää.
   */
  const meta = {
    versio: 1,
    aikaleima: nyt.toISOString(),
    kansio,
    sivu,
    tarkenne,
    teksti,
    nimimerkki,
    saaKrediitteihin,
    sahkoposti,
    lisenssivakuutus,
    kuvat,
    // Kuratointi (PUT /kommentti täyttää nämä).
    tila: 'uusi',
    kommentti: '',
    palkkio: null,
    lunastuskoodi: '',
  };
  await ampari.put(`${kansio}/meta.json`, JSON.stringify(meta, null, 2), {
    httpMetadata: { contentType: 'application/json; charset=utf-8' },
  });

  return vastaa({ ok: true, kansio }, kors);
}

/* ------------------------------------------------------------------ *
 * Avaimelliset reitit
 * ------------------------------------------------------------------ */

function avainKelpaa(url, env) {
  return vertaaSalaisuus(url.searchParams.get('avain') ?? '', env?.EHDOTUS_AVAIN ?? '');
}

async function lista(env, kors) {
  const ampari = env.EHDOTUKSET;
  const avaimet = [];
  let kursori;
  do {
    // eslint-disable-next-line no-await-in-loop
    const sivu = await ampari.list({ prefix: ETULIITE, cursor: kursori });
    for (const olio of sivu.objects ?? []) {
      if (olio.key.endsWith('/meta.json')) avaimet.push(olio.key);
    }
    kursori = sivu.truncated ? sivu.cursor : null;
  } while (kursori);

  // Avain alkaa aikaleimalla, joten laskeva merkkijonojärjestys on
  // aikajärjestys uusimmasta vanhimpaan.
  avaimet.sort().reverse();

  const ehdotukset = [];
  for (const avain of avaimet.slice(0, LISTAN_KATTO)) {
    // eslint-disable-next-line no-await-in-loop
    const olio = await ampari.get(avain);
    if (!olio) continue;
    try {
      // eslint-disable-next-line no-await-in-loop
      ehdotukset.push(JSON.parse(await olio.text()));
    } catch {
      ehdotukset.push({
        kansio: avain.replace(/\/meta\.json$/, ''),
        virhe: 'meta.json ei jäsenny',
      });
    }
  }
  return vastaa({ ehdotukset }, kors);
}

async function kohde(env, polku, kors) {
  if (!turvallinenPolku(polku)) {
    return vastaa({ virhe: 'Polku ei kelpaa' }, { status: 400, ...kors });
  }
  const olio = await env.EHDOTUKSET.get(polku);
  if (!olio) return vastaa({ virhe: 'Ei löydy' }, { status: 404, ...kors });
  const runko = olio.body ?? await olio.arrayBuffer();
  return new Response(runko, {
    headers: {
      'content-type': olio.httpMetadata?.contentType ?? 'application/octet-stream',
      'cache-control': 'private, max-age=300',
      ...korsOtsakkeet(kors.origin, kors.sallitut),
    },
  });
}

/**
 * PUT /kommentti — kuratoinnin kirjaus.
 *
 * Runko: { kansio, kommentti, tila, palkkio, lunastuskoodi }. Vain
 * annetut kentät päivitetään; muu meta jää ennalleen.
 */
async function kommentti(pyynto, env, kors) {
  let runko;
  try {
    runko = await pyynto.json();
  } catch {
    return vastaa({ virhe: 'Runko ei jäsenny' }, { status: 400, ...kors });
  }
  const kansio = String(runko?.kansio ?? runko?.polku ?? '').replace(/\/meta\.json$/, '');
  if (!turvallinenPolku(kansio)) {
    return vastaa({ virhe: 'Polku ei kelpaa' }, { status: 400, ...kors });
  }
  const olio = await env.EHDOTUKSET.get(`${kansio}/meta.json`);
  if (!olio) return vastaa({ virhe: 'Ei löydy' }, { status: 404, ...kors });

  let meta;
  try {
    meta = JSON.parse(await olio.text());
  } catch {
    return vastaa({ virhe: 'meta.json ei jäsenny' }, { status: 500, ...kors });
  }

  if (typeof runko.kommentti === 'string') {
    meta.kommentti = runko.kommentti.slice(0, TEKSTIN_KATTO);
  }
  if (typeof runko.tila === 'string') {
    if (!TILAT.includes(runko.tila)) {
      return vastaa({ virhe: `Tila ei kelpaa (${TILAT.join(', ')})` }, { status: 400, ...kors });
    }
    meta.tila = runko.tila;
  }
  if (runko.palkkio !== undefined) {
    const luku = Number(runko.palkkio);
    if (runko.palkkio !== null && !Number.isFinite(luku)) {
      return vastaa({ virhe: 'Palkkio ei ole luku' }, { status: 400, ...kors });
    }
    meta.palkkio = runko.palkkio === null ? null : luku;
  }
  if (typeof runko.lunastuskoodi === 'string') {
    meta.lunastuskoodi = runko.lunastuskoodi.slice(0, KENTAN_KATTO);
  }
  meta.kuratoitu = new Date().toISOString();

  await env.EHDOTUKSET.put(`${kansio}/meta.json`, JSON.stringify(meta, null, 2), {
    httpMetadata: { contentType: 'application/json; charset=utf-8' },
  });
  return vastaa({ ok: true, meta }, kors);
}

/* ------------------------------------------------------------------ *
 * Reititys
 * ------------------------------------------------------------------ */

/**
 * Koko workerin käsittely.
 *
 * @param {Request} pyynto pyyntö
 * @param {object} env ympäristö: EHDOTUKSET (R2), EHDOTUS_AVAIN, EHDOTUS_ORIGINIT
 * @param {object} apurit testien kello ja tunnus: { nyt, tunnus }
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

  if (url.pathname === '/laheta') {
    if (pyynto.method !== 'POST') {
      return vastaa({ virhe: 'Vain POST' }, { status: 405, ...kors });
    }
    /*
     * Lähetys on selaimesta tuleva kirjoitus, joten origin-tarkistus
     * on ainoa portti: ilman sitä worker olisi kenen tahansa avoin
     * tallennustila.
     */
    if (!sallittuOrigin(origin, sallitut)) {
      return vastaa({ virhe: 'Origin ei ole sallittu' }, { status: 403, ...kors });
    }
    return laheta(pyynto, env, kors, apurit);
  }

  /*
   * PRO-PALIKKA. Portit ovat samat kolme kuin ehdotuskanavalla, mutta
   * eri poluilla: omistajan reitit avaimella, tuottajan selainreitit
   * origin-tarkistuksella (kuten /laheta) ja julkinen tekijäsivu ilman
   * kumpaakaan — se ei sisällä sähköpostia eikä koodia.
   */
  if (proPolku(url.pathname)) {
    if (proOmistajanPolku(url.pathname) && !avainKelpaa(url, env)) {
      return vastaa({ virhe: 'Avain puuttuu tai ei kelpaa' }, { status: 401, ...kors });
    }
    if (proSelaimenPolku(url.pathname) && !sallittuOrigin(origin, sallitut)) {
      return vastaa({ virhe: 'Origin ei ole sallittu' }, { status: 403, ...kors });
    }
    if (!env.EHDOTUKSET) {
      return vastaa({ virhe: 'Ämpäri ei ole kytketty' }, { status: 503, ...kors });
    }
    return proReitti({
      pyynto,
      url,
      env,
      kors,
      apu: { vastaa, otsakkeet: korsOtsakkeet, vertaa: vertaaSalaisuus },
    });
  }

  const avaimellinen = url.pathname === '/lista' || url.pathname === '/kommentti'
    || url.pathname.startsWith('/kohde/');
  if (avaimellinen) {
    if (!avainKelpaa(url, env)) {
      return vastaa({ virhe: 'Avain puuttuu tai ei kelpaa' }, { status: 401, ...kors });
    }
    if (!env.EHDOTUKSET) {
      return vastaa({ virhe: 'Ämpäri ei ole kytketty' }, { status: 503, ...kors });
    }
    if (url.pathname === '/lista') {
      if (pyynto.method !== 'GET') return vastaa({ virhe: 'Vain GET' }, { status: 405, ...kors });
      return lista(env, kors);
    }
    if (url.pathname === '/kommentti') {
      if (pyynto.method !== 'PUT') return vastaa({ virhe: 'Vain PUT' }, { status: 405, ...kors });
      return kommentti(pyynto, env, kors);
    }
    if (pyynto.method !== 'GET') return vastaa({ virhe: 'Vain GET' }, { status: 405, ...kors });
    return kohde(env, decodeURIComponent(url.pathname.slice('/kohde/'.length)), kors);
  }

  return vastaa({ virhe: 'Tuntematon reitti' }, { status: 404, ...kors });
}
