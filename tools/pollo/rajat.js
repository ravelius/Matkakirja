/*
 * Viisaan Pöllön välityspalvelimen puhtaat apufunktiot.
 *
 * Nämä on eroteltu worker.js:stä siksi, että ne voi testata ilman
 * verkkoa ja ilman Cloudflaren ajoympäristöä (tests/pollo.test.mjs).
 * Täällä ei ole yhtään fetchiä, yhtään globaalia tilaa eikä yhtään
 * salaisuutta — pelkkää laskentaa syötteestä tulokseen.
 */

/** Oletusrajat. Kumpikin ylikirjoitetaan workerin ympäristömuuttujalla. */
export const PAIVARAJA_OLETUS = 30;
export const KUUKAUSIRAJA_OLETUS = 1500;

/** Kontekstipaketin katto merkkeinä (sama luku kuin pelin puolella). */
export const KONTEKSTIN_KATTO = 5000;

/** Kysymyksen ja keskusteluhistorian katot. */
export const KYSYMYKSEN_KATTO = 500;
export const HISTORIAN_KATTO = 6;

/**
 * Pieni ei-kryptografinen tiiviste (FNV-1a, 32 bittiä).
 *
 * Käyttörajat lasketaan asiakkaan IP-osoitteesta, mutta raakaa
 * IP-osoitetta ei haluta säilöä eikä lokittaa. Tiiviste riittää
 * laskuriavaimeksi: se on vakaa saman vierailijan yli vuorokauden ajan
 * mutta ei palauta osoitetta takaisin.
 */
export function tiiviste(teksti) {
  let h = 0x811c9dc5;
  for (let i = 0; i < teksti.length; i += 1) {
    h ^= teksti.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

/** Päivälaskurin avain. Vuorokausi vaihtuu UTC-keskiyöllä. */
export function paivaAvain(ip, nyt = new Date()) {
  return `pollo:p:${nyt.toISOString().slice(0, 10)}:${tiiviste(String(ip ?? 'tuntematon'))}`;
}

/** Kuukausibudjetin avain. Kuukausi vaihtuu UTC-kuukauden vaihtuessa. */
export function kuukausiAvain(nyt = new Date()) {
  return `pollo:k:${nyt.toISOString().slice(0, 7)}`;
}

/**
 * Käyttörajojen tarkistus.
 *
 * Palauttaa aina saman muotoisen olion, jotta workerin ei tarvitse
 * päätellä virheviestiä itse. Viestit ovat suomeksi ja pelaajalle
 * ymmärrettäviä — ne näkyvät sellaisinaan chat-paneelissa.
 */
export function tarkistaRajat({
  paiva = 0,
  kuukausi = 0,
  paivaraja = PAIVARAJA_OLETUS,
  kuukausiraja = KUUKAUSIRAJA_OLETUS,
} = {}) {
  if (kuukausiraja > 0 && kuukausi >= kuukausiraja) {
    return {
      ok: false,
      syy: 'kuukausiraja',
      viesti: 'Pöllö on käyttänyt tämän kuukauden puheajan. '
        + 'Se palaa ensi kuun alussa.',
    };
  }
  if (paivaraja > 0 && paiva >= paivaraja) {
    return {
      ok: false,
      syy: 'paivaraja',
      viesti: 'Pöllö on vastannut sinulle jo monta kertaa tänään. '
        + 'Jutellaan huomenna lisää.',
    };
  }
  return { ok: true, syy: null, viesti: null };
}

/**
 * Onko pyynnön origin sallittu?
 *
 * Lista tulee ympäristömuuttujasta. Tyhjä lista tarkoittaa, ettei
 * mitään origineja ole vielä asetettu — silloin ei päästetä ketään
 * läpi, jotta puolivalmis asetus ei jää auki koko internetille.
 * Tähti (*) sallii kaikki; se on tarkoitettu vain paikalliseen
 * testaukseen ja OHJE.md varoittaa siitä.
 */
export function sallittuOrigin(origin, lista = []) {
  if (!lista.length) return false;
  if (lista.includes('*')) return true;
  if (!origin) return false;
  return lista.includes(origin.replace(/\/+$/, ''));
}

/** Pilkulla erotetun ympäristömuuttujan luku listaksi. */
export function lueLista(arvo) {
  return String(arvo ?? '')
    .split(',')
    .map((osa) => osa.trim().replace(/\/+$/, ''))
    .filter(Boolean);
}

/** Kokonaisluku ympäristömuuttujasta, oletus jos arvo puuttuu tai on roskaa. */
export function lueLuku(arvo, oletus) {
  const n = Number.parseInt(String(arvo ?? ''), 10);
  return Number.isFinite(n) && n >= 0 ? n : oletus;
}

/**
 * Siivoaa asiakkaalta tulleen tekstin: leikkaa pituuden ja poistaa
 * ohjausmerkit. Palvelin ei luota asiakkaaseen, vaikka pelin oma koodi
 * leikkaakin paketin jo omalla puolellaan.
 */
export function siivoaTeksti(teksti, katto = KONTEKSTIN_KATTO) {
  const puhdas = String(teksti ?? '')
    // Ohjausmerkit pois; rivinvaihdot ja sarkaimet saavat jäädä.
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, ' ')
    .trim();
  return puhdas.length > katto ? `${puhdas.slice(0, katto - 1)}…` : puhdas;
}

/**
 * Keskusteluhistorian siivous: vain tunnetut roolit, rajattu määrä ja
 * rajattu pituus. Viimeiset viestit ovat tärkeimmät, joten ylimäärä
 * leikataan alusta.
 */
export function siivoaHistoria(historia, maara = HISTORIAN_KATTO) {
  if (!Array.isArray(historia)) return [];
  return historia
    .filter((v) => v && (v.rooli === 'kayttaja' || v.rooli === 'pollo'))
    .slice(-maara)
    .map((v) => ({ rooli: v.rooli, teksti: siivoaTeksti(v.teksti, KYSYMYKSEN_KATTO * 4) }))
    .filter((v) => v.teksti);
}

/**
 * Mallin vastauksesta kysymysehdotuksiksi.
 *
 * Malli ohjeistetaan kirjoittamaan yksi kysymys riville, mutta pieni
 * malli lisää silti toisinaan numeroinnin, ranskalaiset viivat tai
 * johdantorivin. Tämä siivoaa ne pois ja hylkää rivit, jotka eivät ole
 * kysymyksiä.
 */
export function poimiEhdotukset(teksti, maara = 3) {
  return String(teksti ?? '')
    .split('\n')
    .map((rivi) => rivi.trim().replace(/^[-*•\d.)\s]+/, '').trim())
    .filter((rivi) => rivi.length > 6 && rivi.length <= 120 && rivi.includes('?'))
    .slice(0, maara);
}
