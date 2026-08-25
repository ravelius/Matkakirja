/*
 * PRO-SISÄLLÖNTUOTTAJAT — koodit, profiilit ja julkiset tekijäsivut.
 *
 * Tämä on suora jatke lukijoiden ehdotuskanavalle (kasittelija.js).
 * Ero on siinä, KUKA lähettää: ehdotuskanava on auki kaikille
 * pelaajille, pro-kanava vain niille ammattilaisille (valokuvaajat,
 * tutkijat), jotka omistaja on henkilökohtaisesti hyväksynyt.
 * Vastineeksi laadukkaasta sisällöstä he saavat pelissä krediitin ja
 * oman tekijäsivun: kuva, esittely ja linkit omille kotisivuilleen.
 *
 * KOLME ROOLIA, KOLME PORTTIA
 *   omistaja  EHDOTUS_AVAIN kyselyparametrissa (sama salaisuus kuin
 *             ehdotusten luvussa) — luo tuottajia ja hyväksyy profiilit
 *   tuottaja  sähköposti + PYSYVÄ koodi jokaisessa pyynnössä, vertailu
 *             vakioaikainen — lähettää ja päivittää oman profiilinsa
 *   pelaaja   ei mitään — lukee vain 'julkaistu'-tilaisen tekijäsivun
 *
 * MITÄ EI SAA VUOTAA: sähköposti ja koodi eivät päädy julkiseen
 * vastaukseen eivätkä lokiin. Siksi julkinen profiili on ERI OLIO eri
 * avaimessa (pro/julkiset/<id>.json) eikä siivottu versio tuottajan
 * tietueesta — siivous unohtuu, erillinen olio ei.
 *
 * TIETOMALLI (R2, etuliite pro/)
 *   pro/tuottajat/<sha256(sähköposti)>.json   YKSITYINEN tietue
 *   pro/kuvat/<tekijaId>.<pääte>              profiilikuva (tavut)
 *   pro/julkiset/<tekijaId>.json              JULKINEN profiili
 *
 * Sähköposti on avaimessa tiivisteenä eikä selväkielisenä: ämpärin
 * avainlistaus ei saa olla osoiterekisteri.
 *
 * REITIT (kasittelija.js reitittää tänne)
 *   PUT  /pro-tuottaja?avain=      omistaja  luo tuottajan, palauttaa koodin
 *   GET  /pro-lista?avain=         omistaja  kaikki tuottajat tiloineen
 *   GET  /pro-kuva/<id>?avain=     omistaja  odottavan profiilin kuva
 *   PUT  /pro-hyvaksy?avain=       omistaja  odottaa → julkaistu | hylatty
 *   POST /pro-tarkista             tuottaja  onko pari voimassa
 *   POST /pro-profiili             tuottaja  kuva + esittely + linkit
 *   GET  /tekija/<id>              pelaaja   julkaistu profiili
 *   GET  /tekija/<id>/kuva         pelaaja   julkaistun profiilin kuva
 *
 * MATERIAALIN LÄHETYS ei ole täällä vaan ehdotuskanavan /laheta-
 * reitillä (kasittelija.js): materiaali on ehdotus siinä missä
 * pelaajankin lähetys, ja omistaja lukee kaikki samalta
 * Lukijoilta-lehdeltä. Tämä moduuli antaa siihen vain tunnistuksen
 * (tunnista) ja lisenssilistan (MATERIAALIN_LISENSSIT).
 */

/** Kansioetuliitteet ämpärissä. */
export const PRO_ETULIITE = 'pro/';
const TUOTTAJAT = `${PRO_ETULIITE}tuottajat/`;
const KUVAT = `${PRO_ETULIITE}kuvat/`;
const JULKISET = `${PRO_ETULIITE}julkiset/`;

/**
 * Tuottajan tilat.
 *   kutsuttu  koodi luotu, profiilia ei ole vielä lähetetty
 *   odottaa   profiili lähetetty, omistajan katsottavana
 *   julkaistu tekijäsivu näkyy pelissä
 *   hylatty   profiili ei kelvannut; koodi on yhä voimassa, joten
 *             tuottaja voi lähettää uuden
 */
export const PRO_TILAT = ['kutsuttu', 'odottaa', 'julkaistu', 'hylatty'];

/** Tilat, joihin omistaja voi siirtää odottavan profiilin. */
export const PRO_PAATOKSET = ['julkaistu', 'hylatty'];

/*
 * KOODI on kahdeksan merkkiä eikä satunnaista tavupuuroa: omistaja
 * lukee sen ruudulta ja kirjoittaa sähköpostiin, tuottaja näpyttelee
 * sen puhelimella. Aakkostosta on siksi jätetty pois sekoittuvat
 * merkit I, O, 0 ja 1. 32 merkkiä jakaa 256 tasan, joten jakojäännös
 * ei vinouta arvontaa. Pituus on VAKIO, mikä on myös turvallisuus-
 * ominaisuus: vakioaikainen vertailu vaatii saman mitan.
 */
export const KOODIN_PITUUS = 8;
const KOODIN_MERKIT = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/*
 * TEKIJÄTUNNUS on julkinen ja päätyy pelin pakkeihin (kuvan
 * lähderivin kenttä `tekijaId`). Se EI saa olla johdettu
 * sähköpostista — muuten julkinen peli kantaisi osoitetta
 * tiivisteenä, ja tiivisteen voi arvata sanakirjalla. Siksi puhdas
 * arvonta.
 */
export const TUNNUKSEN_PITUUS = 10;
const TUNNUKSEN_MERKIT = 'abcdefghijkmnpqrstuvwxyz23456789';

/** Profiilin rajat. */
export const ESITTELYN_KATTO = 600;
export const LINKKEJA_ENINTAAN = 3;
export const LINKIN_KATTO = 200;
export const NIMEN_KATTO = 120;
export const PRO_KUVAN_KATTO = 4 * 1024 * 1024;
export const PRO_KUVA_TYYPIT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

/** Julkisen tunnuksen muoto — sama tarkistus joka reitillä. */
const TUNNUS_MUOTO = /^[a-z0-9]{4,32}$/;

/*
 * MATERIAALIN LISENSSIT (omistaja 25.8.2026). Raamatun eläintäky- ja
 * pro-materiaalilinjaus: "oikeudet ja nimeämisrivi kirjataan aina
 * kirjallisesti". Siksi lisenssi on VALINTA suljetusta listasta eikä
 * vapaa teksti — vapaasta tekstistä ei myöhemmin tiedä, mitä
 * julisteessa saa käyttää.
 *
 *   matkakirja    vain tässä pelissä ja sen julisteissa
 *   cc-by-4.0     CC BY 4.0 (nimeäminen)
 *   cc-by-sa-4.0  CC BY-SA 4.0 (nimeäminen, sama lisenssi)
 */
export const MATERIAALIN_LISENSSIT = ['matkakirja', 'cc-by-4.0', 'cc-by-sa-4.0'];

/* ------------------------------------------------------------------ *
 * Pienet apurit
 * ------------------------------------------------------------------ */

/** Satunnainen merkkijono annetusta aakkostosta (tasajakauma). */
function arvo(merkit, pituus) {
  const tavut = new Uint8Array(pituus);
  crypto.getRandomValues(tavut);
  let ulos = '';
  for (const tavu of tavut) ulos += merkit[tavu % merkit.length];
  return ulos;
}

export function teeKoodi() { return arvo(KOODIN_MERKIT, KOODIN_PITUUS); }
export function teeTekijaId() { return arvo(TUNNUKSEN_MERKIT, TUNNUKSEN_PITUUS); }

/**
 * Sähköposti vertailukelpoiseen muotoon. Ei täyttä RFC-tarkistusta —
 * riittää, että osoitteessa on yksi @ ja piste sen jälkeen, koska
 * omistaja kirjoittaa osoitteen itse ja virhe näkyy heti.
 */
export function normalisoiSahkoposti(teksti) {
  const posti = String(teksti ?? '').trim().toLowerCase();
  if (posti.length > NIMEN_KATTO) return '';
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(posti) ? posti : '';
}

/**
 * Koodi vertailukelpoiseen muotoon: isot kirjaimet, väliviivat ja
 * välilyönnit pois. Tuottaja saa siis kirjoittaa koodin miten
 * tahansa — pieni kirjain tai liimauksesta tarttunut väli ei kaada
 * kirjautumista.
 */
export function normalisoiKoodi(teksti) {
  return String(teksti ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

/** Sähköpostin tiiviste ämpärin avaimeksi (osoite ei ole avaimessa). */
async function postiTiiviste(posti) {
  const tavut = new TextEncoder().encode(`matkakirja-pro:${posti}`);
  const tiiviste = await crypto.subtle.digest('SHA-256', tavut);
  return [...new Uint8Array(tiiviste)].map((t) => t.toString(16).padStart(2, '0')).join('');
}

async function tuottajaAvain(posti) {
  return `${TUOTTAJAT}${await postiTiiviste(posti)}.json`;
}

/**
 * Kelpaako linkki? Vain http ja https — mailto, javascript ja data
 * eivät kuulu pelin ulkoiseen linkkiin missään muodossa.
 *
 * @param {string} teksti käyttäjän kirjoittama osoite
 * @returns {{nimi: string, url: string}|null} siivottu linkki tai null
 */
export function siivoaLinkki(teksti) {
  const raaka = String(teksti ?? '').trim().slice(0, LINKIN_KATTO);
  if (!raaka) return null;
  let url;
  try {
    url = new URL(raaka);
  } catch {
    return null;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
  return { nimi: url.hostname.replace(/^www\./, ''), url: url.href };
}

/** Julkinen olio tuottajan tietueesta — sähköposti ja koodi EIVÄT tule mukaan. */
function julkinenProfiili(tietue) {
  return {
    versio: 1,
    id: tietue.tekijaId,
    nimi: tietue.nimi,
    esittely: tietue.profiili?.esittely ?? '',
    linkit: tietue.profiili?.linkit ?? [],
    kuva: tietue.profiili?.kuva ? `/tekija/${tietue.tekijaId}/kuva` : null,
    julkaistu: tietue.julkaistu ?? '',
  };
}

/* ------------------------------------------------------------------ *
 * Tunnistus (sähköposti + koodi)
 * ------------------------------------------------------------------ */

/**
 * Etsii tuottajan ja tarkistaa koodin vakioaikaisesti.
 *
 * Tuntematon osoite tekee saman vertailun valekoodia vasten, jottei
 * vastausaika kerro, onko osoite rekisterissä.
 *
 * Vietynä myös ehdotuskanavan käyttöön: /laheta tunnistaa pro-
 * tuottajan samalla parilla, kun tämä lähettää materiaalia.
 *
 * @returns {Promise<{avain: string, tietue: object}|null>} tuottaja tai null
 */
export async function tunnista(env, posti, koodi, apu) {
  const annettu = normalisoiKoodi(koodi);
  const VALE = 'ZZZZZZZZ';
  if (!posti || annettu.length !== KOODIN_PITUUS) {
    apu.vertaa(annettu, VALE);
    return null;
  }
  const avain = await tuottajaAvain(posti);
  const olio = await env.EHDOTUKSET.get(avain);
  if (!olio) {
    apu.vertaa(annettu, VALE);
    return null;
  }
  let tietue;
  try {
    tietue = JSON.parse(await olio.text());
  } catch {
    return null;
  }
  if (!apu.vertaa(annettu, tietue.koodi ?? '')) return null;
  return { avain, tietue };
}

/** Tallentaa tuottajan tietueen. */
async function talleta(env, avain, tietue) {
  await env.EHDOTUKSET.put(avain, JSON.stringify(tietue, null, 2), {
    httpMetadata: { contentType: 'application/json; charset=utf-8' },
  });
}

/* ------------------------------------------------------------------ *
 * Omistajan reitit
 * ------------------------------------------------------------------ */

/**
 * PUT /pro-tuottaja — luo tuottajan tai palauttaa olemassa olevan.
 *
 * KOODI ON PYSYVÄ. Sama osoite toisen kerran ei arvo uutta koodia,
 * koska tuottajalla voi olla vanha koodi jo sähköpostissaan ja pelin
 * localStorage tyhjenee milloin tahansa. Nimen saa päivittää.
 */
async function luoTuottaja(pyynto, env, kors, apu) {
  let runko;
  try {
    runko = await pyynto.json();
  } catch {
    return apu.vastaa({ virhe: 'Runko ei jäsenny' }, { status: 400, ...kors });
  }
  const posti = normalisoiSahkoposti(runko?.sahkoposti);
  if (!posti) {
    return apu.vastaa({ virhe: 'Sähköposti ei kelpaa' }, { status: 400, ...kors });
  }
  const nimi = String(runko?.nimi ?? '').replace(/\s+/g, ' ').trim().slice(0, NIMEN_KATTO);

  const avain = await tuottajaAvain(posti);
  const vanha = await env.EHDOTUKSET.get(avain);
  if (vanha) {
    const tietue = JSON.parse(await vanha.text());
    if (nimi && nimi !== tietue.nimi) {
      tietue.nimi = nimi;
      await talleta(env, avain, tietue);
    }
    return apu.vastaa({ ok: true, uusi: false, tuottaja: tietue }, kors);
  }

  const tietue = {
    versio: 1,
    luotu: new Date().toISOString(),
    sahkoposti: posti,
    nimi: nimi || posti.split('@')[0],
    koodi: teeKoodi(),
    tekijaId: teeTekijaId(),
    tila: 'kutsuttu',
    kommentti: '',
    profiili: null,
    julkaistu: '',
  };
  await talleta(env, avain, tietue);
  return apu.vastaa({ ok: true, uusi: true, tuottaja: tietue }, kors);
}

/** GET /pro-lista — kaikki tuottajat koodeineen ja profiilitiloineen. */
async function proLista(env, kors, apu) {
  const avaimet = [];
  let kursori;
  do {
    // eslint-disable-next-line no-await-in-loop
    const sivu = await env.EHDOTUKSET.list({ prefix: TUOTTAJAT, cursor: kursori });
    for (const olio of sivu.objects ?? []) {
      if (olio.key.endsWith('.json')) avaimet.push(olio.key);
    }
    kursori = sivu.truncated ? sivu.cursor : null;
  } while (kursori);

  const tuottajat = [];
  for (const avain of avaimet) {
    // eslint-disable-next-line no-await-in-loop
    const olio = await env.EHDOTUKSET.get(avain);
    if (!olio) continue;
    try {
      // eslint-disable-next-line no-await-in-loop
      tuottajat.push(JSON.parse(await olio.text()));
    } catch {
      tuottajat.push({ avain, virhe: 'tietue ei jäsenny' });
    }
  }
  // Uusin ensin: omistaja katsoo yleensä juuri lisättyä tai juuri
  // profiilinsa lähettänyttä.
  tuottajat.sort((a, b) => String(b.luotu ?? '').localeCompare(String(a.luotu ?? '')));
  return apu.vastaa({ tuottajat }, kors);
}

/**
 * PUT /pro-hyvaksy — omistajan päätös odottavasta profiilista.
 *
 * Runko: { sahkoposti, tila: 'julkaistu'|'hylatty', kommentti }.
 * Julkaisu kirjoittaa ERILLISEN julkisen olion; hylkäys poistaa sen,
 * jotta aiemmin julkaistu tekijäsivu katoaa pelistä heti.
 */
async function hyvaksy(pyynto, env, kors, apu) {
  let runko;
  try {
    runko = await pyynto.json();
  } catch {
    return apu.vastaa({ virhe: 'Runko ei jäsenny' }, { status: 400, ...kors });
  }
  const posti = normalisoiSahkoposti(runko?.sahkoposti);
  if (!posti) {
    return apu.vastaa({ virhe: 'Sähköposti ei kelpaa' }, { status: 400, ...kors });
  }
  if (!PRO_PAATOKSET.includes(runko?.tila)) {
    return apu.vastaa({ virhe: `Tila ei kelpaa (${PRO_PAATOKSET.join(', ')})` },
      { status: 400, ...kors });
  }
  const avain = await tuottajaAvain(posti);
  const olio = await env.EHDOTUKSET.get(avain);
  if (!olio) return apu.vastaa({ virhe: 'Ei löydy' }, { status: 404, ...kors });

  let tietue;
  try {
    tietue = JSON.parse(await olio.text());
  } catch {
    return apu.vastaa({ virhe: 'Tietue ei jäsenny' }, { status: 500, ...kors });
  }
  if (!tietue.profiili) {
    return apu.vastaa({ virhe: 'Tuottaja ei ole vielä lähettänyt profiilia' },
      { status: 409, ...kors });
  }

  tietue.tila = runko.tila;
  if (typeof runko.kommentti === 'string') {
    tietue.kommentti = runko.kommentti.slice(0, ESITTELYN_KATTO);
  }
  const julkinenAvain = `${JULKISET}${tietue.tekijaId}.json`;
  if (runko.tila === 'julkaistu') {
    tietue.julkaistu = new Date().toISOString();
    await env.EHDOTUKSET.put(julkinenAvain,
      JSON.stringify(julkinenProfiili(tietue), null, 2),
      { httpMetadata: { contentType: 'application/json; charset=utf-8' } });
  } else {
    tietue.julkaistu = '';
    await env.EHDOTUKSET.delete?.(julkinenAvain);
  }
  await talleta(env, avain, tietue);
  return apu.vastaa({ ok: true, tuottaja: tietue }, kors);
}

/** Kuvan tavut ämpäristä (pääte etsitään sallituista tyypeistä). */
async function annaKuva(env, tunnus, kors, apu) {
  for (const paate of new Set(Object.values(PRO_KUVA_TYYPIT))) {
    // eslint-disable-next-line no-await-in-loop
    const olio = await env.EHDOTUKSET.get(`${KUVAT}${tunnus}.${paate}`);
    if (!olio) continue;
    const runko = olio.body ?? await olio.arrayBuffer();
    return new Response(runko, {
      headers: {
        'content-type': olio.httpMetadata?.contentType ?? 'application/octet-stream',
        'cache-control': 'public, max-age=600',
        ...apu.otsakkeet(kors.origin, kors.sallitut),
      },
    });
  }
  return apu.vastaa({ virhe: 'Ei löydy' }, { status: 404, ...kors });
}

/** GET /pro-kuva/<tekijaId>?avain= — odottavan profiilin kuva omistajalle. */
async function omistajanKuva(env, tunnus, kors, apu) {
  if (!TUNNUS_MUOTO.test(tunnus)) {
    return apu.vastaa({ virhe: 'Tunnus ei kelpaa' }, { status: 400, ...kors });
  }
  return annaKuva(env, tunnus, kors, apu);
}

/* ------------------------------------------------------------------ *
 * Tuottajan reitit
 * ------------------------------------------------------------------ */

/** Lukee sähköpostin ja koodin joko JSON-rungosta tai lomakkeesta. */
async function lueTunnukset(pyynto) {
  const tyyppi = pyynto.headers.get('content-type') ?? '';
  if (tyyppi.includes('application/json')) {
    const runko = await pyynto.json();
    return { posti: normalisoiSahkoposti(runko?.sahkoposti), koodi: runko?.koodi ?? '' };
  }
  const lomake = await pyynto.formData();
  return {
    posti: normalisoiSahkoposti(lomake.get('sahkoposti')),
    koodi: lomake.get('koodi') ?? '',
  };
}

/** POST /pro-tarkista — onko sähköposti + koodi voimassa? */
async function tarkista(pyynto, env, kors, apu) {
  let tunnukset;
  try {
    tunnukset = await lueTunnukset(pyynto);
  } catch {
    return apu.vastaa({ virhe: 'Lähetystä ei voitu lukea' }, { status: 400, ...kors });
  }
  const loyto = await tunnista(env, tunnukset.posti, tunnukset.koodi, apu);
  if (!loyto) {
    return apu.vastaa({ virhe: 'Sähköposti ja koodi eivät täsmää.' },
      { status: 401, ...kors });
  }
  const { tietue } = loyto;
  return apu.vastaa({
    ok: true,
    nimi: tietue.nimi,
    tekijaId: tietue.tekijaId,
    tila: tietue.tila,
    kommentti: tietue.kommentti ?? '',
    profiili: tietue.profiili
      ? {
        esittely: tietue.profiili.esittely,
        linkit: tietue.profiili.linkit,
        kuva: Boolean(tietue.profiili.kuva),
      }
      : null,
  }, kors);
}

/**
 * POST /pro-profiili — tuottajan oma sivu: kuva, esittely, linkit.
 *
 * Jokainen lähetys korvaa edellisen ja palauttaa tilan 'odottaa':
 * julkaistuunkin profiiliin tehty muutos käy omistajan kautta.
 */
async function profiili(pyynto, env, kors, apu) {
  let lomake;
  try {
    lomake = await pyynto.formData();
  } catch {
    return apu.vastaa({ virhe: 'Lähetystä ei voitu lukea' }, { status: 400, ...kors });
  }
  const posti = normalisoiSahkoposti(lomake.get('sahkoposti'));
  const loyto = await tunnista(env, posti, lomake.get('koodi'), apu);
  if (!loyto) {
    return apu.vastaa({ virhe: 'Sähköposti ja koodi eivät täsmää.' },
      { status: 401, ...kors });
  }
  const { avain, tietue } = loyto;

  const esittelyRaaka = lomake.get('esittely');
  const esittely = typeof esittelyRaaka === 'string'
    ? esittelyRaaka.replace(/\r\n/g, '\n').trim().slice(0, ESITTELYN_KATTO) : '';
  if (!esittely) {
    return apu.vastaa({ virhe: 'Kirjoita lyhyt esittely.' }, { status: 400, ...kors });
  }

  const linkkiTekstit = lomake.getAll('linkit')
    .filter((l) => typeof l === 'string' && l.trim());
  if (linkkiTekstit.length > LINKKEJA_ENINTAAN) {
    return apu.vastaa({ virhe: `Linkkejä saa antaa enintään ${LINKKEJA_ENINTAAN}.` },
      { status: 400, ...kors });
  }
  const linkit = [];
  for (const teksti of linkkiTekstit) {
    const linkki = siivoaLinkki(teksti);
    if (!linkki) {
      return apu.vastaa({ virhe: 'Linkin pitää olla http- tai https-osoite.' },
        { status: 400, ...kors });
    }
    linkit.push(linkki);
  }

  const tiedostot = lomake.getAll('kuva')
    .filter((k) => k && typeof k === 'object' && typeof k.arrayBuffer === 'function');
  if (tiedostot.length > 1) {
    return apu.vastaa({ virhe: 'Omakuvia otetaan vastaan yksi.' }, { status: 400, ...kors });
  }
  let kuva = tietue.profiili?.kuva ?? null;
  if (tiedostot.length) {
    const tiedosto = tiedostot[0];
    const paate = PRO_KUVA_TYYPIT[tiedosto.type];
    if (!paate) {
      return apu.vastaa({ virhe: 'Kuvan tyyppi ei kelpaa (jpeg, png tai webp).' },
        { status: 415, ...kors });
    }
    if ((tiedosto.size ?? 0) > PRO_KUVAN_KATTO) {
      return apu.vastaa({ virhe: 'Kuva on liian iso (yli 4 Mt).' }, { status: 413, ...kors });
    }
    await env.EHDOTUKSET.put(`${KUVAT}${tietue.tekijaId}.${paate}`,
      await tiedosto.arrayBuffer(), { httpMetadata: { contentType: tiedosto.type } });
    kuva = {
      tiedosto: `${tietue.tekijaId}.${paate}`,
      tyyppi: tiedosto.type,
      koko: tiedosto.size ?? null,
    };
  }

  tietue.profiili = { esittely, linkit, kuva, paivitetty: new Date().toISOString() };
  /*
   * Muutos vie profiilin AINA takaisin jonoon — myös julkaistun.
   * Muuten tuottaja voisi vaihtaa hyväksytyn esittelyn perään mitä
   * tahansa, ja peli näyttäisi sen ilman että kukaan on lukenut sitä.
   */
  tietue.tila = 'odottaa';
  tietue.julkaistu = '';
  await env.EHDOTUKSET.delete?.(`${JULKISET}${tietue.tekijaId}.json`);
  await talleta(env, avain, tietue);

  return apu.vastaa({
    ok: true,
    tila: 'odottaa',
    tekijaId: tietue.tekijaId,
    viesti: 'Profiili odottaa julkaisua — saat krediitin kun ensimmäinen '
      + 'kuvasi julkaistaan lehdessä.',
  }, kors);
}

/* ------------------------------------------------------------------ *
 * Julkinen tekijäsivu
 * ------------------------------------------------------------------ */

/** GET /tekija/<id> ja /tekija/<id>/kuva — vain julkaistu profiili. */
async function tekijaSivu(env, polku, kors, apu) {
  const osat = polku.split('/').filter(Boolean);
  const tunnus = osat[0] ?? '';
  const kelpaa = TUNNUS_MUOTO.test(tunnus) && osat.length <= 2
    && (osat.length === 1 || osat[1] === 'kuva');
  if (!kelpaa) {
    return apu.vastaa({ virhe: 'Tunnus ei kelpaa' }, { status: 400, ...kors });
  }
  const olio = await env.EHDOTUKSET.get(`${JULKISET}${tunnus}.json`);
  if (!olio) return apu.vastaa({ virhe: 'Ei löydy' }, { status: 404, ...kors });
  if (osat.length === 2) return annaKuva(env, tunnus, kors, apu);
  let julkinen;
  try {
    julkinen = JSON.parse(await olio.text());
  } catch {
    return apu.vastaa({ virhe: 'Profiili ei jäsenny' }, { status: 500, ...kors });
  }
  // Vyö ja henkselit: julkinen olio kirjoitetaan ilman sähköpostia ja
  // koodia, mutta vastaukseen poimitaan silti vain tunnetut kentät.
  return apu.vastaa({
    tekija: {
      id: julkinen.id,
      nimi: julkinen.nimi,
      esittely: julkinen.esittely,
      linkit: julkinen.linkit ?? [],
      kuva: julkinen.kuva ?? null,
      julkaistu: julkinen.julkaistu ?? '',
    },
  }, kors);
}

/* ------------------------------------------------------------------ *
 * Reititys
 * ------------------------------------------------------------------ */

/** Kuuluuko polku pro-palikalle? */
export function proPolku(polku) {
  return polku.startsWith('/pro-') || polku.startsWith('/tekija/');
}

/** Vaatiiko polku omistajan avaimen? */
export function proOmistajanPolku(polku) {
  return polku === '/pro-tuottaja' || polku === '/pro-lista'
    || polku === '/pro-hyvaksy' || polku.startsWith('/pro-kuva/');
}

/** Onko polku tuottajan selaimesta tuleva kirjoitus (origin-portti)? */
export function proSelaimenPolku(polku) {
  return polku === '/pro-tarkista' || polku === '/pro-profiili';
}

/**
 * Pro-reittien käsittely.
 *
 * @param {object} p { pyynto, url, env, kors, apu }
 *   apu = { vastaa, otsakkeet, vertaa } kasittelija.js:stä. Jaettu
 *   CORS- ja vertailulogiikka pysyy yhdessä paikassa, eikä tämä
 *   moduuli tuo kasittelijaa takaisin (kehäriippuvuus).
 * @returns {Promise<Response>} vastaus
 */
export async function proReitti({ pyynto, url, env, kors, apu }) {
  const polku = url.pathname;
  const vain = (metodi) => apu.vastaa({ virhe: `Vain ${metodi}` }, { status: 405, ...kors });

  if (polku === '/pro-tuottaja') {
    return pyynto.method === 'PUT' ? luoTuottaja(pyynto, env, kors, apu) : vain('PUT');
  }
  if (polku === '/pro-lista') {
    return pyynto.method === 'GET' ? proLista(env, kors, apu) : vain('GET');
  }
  if (polku === '/pro-hyvaksy') {
    return pyynto.method === 'PUT' ? hyvaksy(pyynto, env, kors, apu) : vain('PUT');
  }
  if (polku.startsWith('/pro-kuva/')) {
    if (pyynto.method !== 'GET') return vain('GET');
    return omistajanKuva(env, decodeURIComponent(polku.slice('/pro-kuva/'.length)), kors, apu);
  }
  if (polku === '/pro-tarkista') {
    return pyynto.method === 'POST' ? tarkista(pyynto, env, kors, apu) : vain('POST');
  }
  if (polku === '/pro-profiili') {
    return pyynto.method === 'POST' ? profiili(pyynto, env, kors, apu) : vain('POST');
  }
  if (polku.startsWith('/tekija/')) {
    if (pyynto.method !== 'GET') return vain('GET');
    return tekijaSivu(env, decodeURIComponent(polku.slice('/tekija/'.length)), kors, apu);
  }
  return apu.vastaa({ virhe: 'Tuntematon reitti' }, { status: 404, ...kors });
}
