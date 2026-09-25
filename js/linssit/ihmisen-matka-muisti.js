/*
 * IHMISEN MATKA — LINSSI MUISTAA TILANSA (omistaja 7.9.2026 ilta,
 * Raamattu "IHMISEN MATKA: YKSI PALKKI, EI KARUSELLIA, KAIKKIIN
 * NOSTOIHIN KUVA, LINSSI MUISTAA PAIKKANSA", sanatarkasti: *"linssi
 * voisi aina muistaa sen paikan, mistä se on suljettu. Jos pelaaja avaa
 * sen sitten uudestaan, niin koko homma ei alkaisi alusta, vaan siitä,
 * mihin pelaaja jäi. Hän voisi tietenkin halutessaan käynnistää koko
 * linssin alusta."*).
 *
 * MITÄ MUISTETAAN: esityksen vaihe (kesken oleva jakso ja siitä kulunut
 * aika, tai tutkimusvaihe), pidon pohja (kuinka pitkälle vanat on jo
 * piirretty — kello käy kaanonissa kahdesti taaksepäin, ja ilman tätä
 * lukua jatko piirtäisi Amerikat tyhjiksi), kameran paikka pallolla
 * (lat, lng, korkeus), avoin kortti ja valittu virta.
 *
 * MISSÄ: localStorage, oma avain linssiä kohti (`matkakirja-linssimuisti-
 * <tunnus>`). Sama perhe kuin valitulla linssillä ja paneelin
 * asettelulla (js/ui-apurit.js LINSSI_AVAIN, js/aikajana.js
 * PANEELIN_MUISTIAVAIN): tämä on laitteen katselutila, ei pelin
 * tapahtuma, joten se ei kuulu pelitallennukseen. Uusi peli tyhjentää
 * sen muiden matkakirja-avainten mukana (js/main.js tyhjennaMuistit).
 *
 * PUHTAAT FUNKTIOT ENSIN: `kelvollinenMuisti` tarkistaa ja siistii
 * luetun tilan ilman selainta, joten sama sääntö on testattavissa
 * (tests/ihmisen-matka-tutkimus.test.mjs). Vanha tai rikkinäinen muisti
 * ei kaada mitään — se vain ohitetaan, ja linssi alkaa alusta.
 */

/** Avaimen etuliite; perään linssin tunnus. */
export const MUISTIN_ETULIITE = 'matkakirja-linssimuisti-';

/** Muodon versio: eri numero hylkää vanhat merkinnät hiljaa. */
export const MUISTIN_VERSIO = 1;

/**
 * Vanhin muisti, joka vielä jatketaan (ms). Kuukauden takainen kesken
 * jäänyt esitys ei ole "siihen mihin jäin" vaan unohtunut; silloin
 * linssi alkaa alusta kuten ensimmäisellä kerralla.
 */
export const MUISTIN_IKA_MAX_MS = 30 * 24 * 60 * 60 * 1000;

export function muistinAvain(tunnus) {
  return `${MUISTIN_ETULIITE}${tunnus}`;
}

const luku = (v) => (Number.isFinite(Number(v)) ? Number(v) : null);

/**
 * Tarkistaa ja siistii muistin.
 *
 * @param {object|null} m luettu olio
 * @param {{ jaksot?: string[], nostot?: string[], virrat?: string[], nyt?: number }} ehdot
 *   tunnetut tunnukset: tuntematon jakso, nosto tai virta pudotetaan.
 * @returns {object|null} siistitty muisti tai null, jos sitä ei voi jatkaa
 */
export function kelvollinenMuisti(m, { jaksot = null, nostot = null, virrat = null, nyt = Date.now() } = {}) {
  if (!m || typeof m !== 'object') return null;
  if (m.versio !== MUISTIN_VERSIO) return null;
  const aika = luku(m.aika);
  if (aika === null || nyt - aika > MUISTIN_IKA_MAX_MS || aika > nyt + 60000) return null;
  const vaihe = m.vaihe === 'esitys' || m.vaihe === 'tutkimus' ? m.vaihe : null;
  if (!vaihe) return null;
  const jakso = typeof m.jakso === 'string' && (!jaksot || jaksot.includes(m.jakso)) ? m.jakso : null;
  // Kesken jäänyt esitys ilman tunnettua jaksoa ei ole jatkettavissa.
  if (vaihe === 'esitys' && !jakso) return null;
  const kamera = m.kamera && Number.isFinite(Number(m.kamera.lat)) && Number.isFinite(Number(m.kamera.lng))
    && Number(m.kamera.altitude) > 0
    ? { lat: Number(m.kamera.lat), lng: Number(m.kamera.lng), altitude: Number(m.kamera.altitude) }
    : null;
  const kortti = typeof m.kortti === 'string' && (!nostot || nostot.includes(m.kortti)) ? m.kortti : null;
  const virta = typeof m.virta === 'string' && (!virrat || virrat.includes(m.virta)) ? m.virta : null;
  const kulunut = Math.max(0, luku(m.kulunut) ?? 0);
  const pitoMin = luku(m.pitoMin);
  return {
    versio: MUISTIN_VERSIO,
    vaihe,
    jakso,
    kulunut,
    pitoMin: pitoMin !== null && pitoMin >= 0 ? pitoMin : null,
    kamera,
    kortti,
    virta,
    aika,
  };
}

function varasto() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null; // yksityinen selaus tai estetty varasto
  }
}

/** Lukee ja tarkistaa linssin muistin; null, jos sitä ei ole tai se ei kelpaa. */
export function lueMuisti(tunnus, ehdot = {}) {
  const s = varasto();
  if (!s || !tunnus) return null;
  try {
    const raaka = s.getItem(muistinAvain(tunnus));
    return raaka ? kelvollinenMuisti(JSON.parse(raaka), ehdot) : null;
  } catch {
    return null;
  }
}

/** Kirjoittaa muistin; epäonnistuminen on hiljainen (yksityinen selaus). */
export function tallennaMuisti(tunnus, tila) {
  const s = varasto();
  if (!s || !tunnus || !tila) return false;
  try {
    s.setItem(muistinAvain(tunnus), JSON.stringify({ ...tila, versio: MUISTIN_VERSIO, aika: Date.now() }));
    return true;
  } catch {
    return false;
  }
}

/** Poistaa muistin ("Aloita alusta"). */
export function tyhjennaMuisti(tunnus) {
  const s = varasto();
  if (!s || !tunnus) return false;
  try {
    s.removeItem(muistinAvain(tunnus));
    return true;
  } catch {
    return false;
  }
}
