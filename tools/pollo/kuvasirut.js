/*
 * ASTRONAUTTIEN KUVIEN SIRUT (omistaja 6.10.2026 00.1x Päätoimittajan kautta): "astronauttien kuvissa pulun chat
 * pitäisi muuttua sen mukaan mikä kuva on näytöllä. pulun pitää generoida valmiit kysymykset näkymän mukaan".
 *
 * Asiakas lähettää ehdotus- ja vastauspyynnön mukana valinnaisen `kuva`-olion (näytöllä oleva astronauttikuva:
 * tunnus + tiedot). Ehdotukset tehdään VAIN kuvan tiedoista ja tallennetaan KV:hen kuvan avaimella: ensimmäinen
 * katselu generoi, seuraavat (kenen tahansa) lukevat välimuistista. Avain on tiiviste kuvan KAIKISTA kentistä, joten
 * asiakas ei voi kirjoittaa toisen kuvan siruja eri selitteellä. Ei etukäteiseriä: generointi vain katselusta.
 */

/** Sallitut kentät (Natiivi-UI 6.10.: nimi, maa, lat, lon; AstronauttiAineisto: Selite, Havainto Teksti/Aika/...). */
export const KUVAN_KENTAT = Object.freeze(['nimi', 'maa', 'lat', 'lon', 'selite', 'teksti', 'aika', 'retkikunta', 'kuvaaja', 'kuvaustapa']);
const KENTAN_KATTO = 600;
const KENTTIEN_OTSIKOT = {
  nimi: 'Paikka', maa: 'Maa', lat: 'Leveysaste', lon: 'Pituusaste', selite: 'Selite', teksti: 'Kuvateksti', aika: 'Kuvausaika',
  retkikunta: 'Retkikunta', kuvaaja: 'Kuvaaja', kuvaustapa: 'Kuvaustapa',
};
export const KUVASIRUJEN_TTL_S = 60 * 60 * 24 * 30;

function siisti(arvo) {
  const t = String(arvo ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
  return t.length > KENTAN_KATTO ? `${t.slice(0, KENTAN_KATTO - 1)}…` : t;
}

/** Pyynnön `kuva` → { tunnus, ...kentät } tai null (ei tunnusta / väärä muoto). */
export function siivoaKuva(raaka) {
  if (!raaka || typeof raaka !== 'object') return null;
  const tunnus = String(raaka.tunnus ?? '').trim();
  if (!/^[A-Za-z0-9._:-]{1,80}$/.test(tunnus)) return null;
  const kuva = { tunnus };
  for (const k of KUVAN_KENTAT) {
    if (k === 'lat' || k === 'lon') {
      const n = Number(raaka[k]);
      if (raaka[k] != null && raaka[k] !== '' && Number.isFinite(n) && Math.abs(n) <= (k === 'lat' ? 90 : 180)) kuva[k] = Math.round(n * 1e4) / 1e4;
      continue;
    }
    const arvo = siisti(raaka[k]);
    if (arvo) kuva[k] = arvo;
  }
  return kuva;
}

/** Kuvan tiedot mallin kontekstiksi (sama teksti ehdotuksille ja vastauksille). */
export function kuvaKontekstiksi(kuva) {
  if (!kuva) return '';
  const rivit = [`Näytöllä on nyt yksi astronauttien valokuva Kansainväliseltä avaruusasemalta (kuvan tunnus ${kuva.tunnus}).`];
  for (const k of KUVAN_KENTAT) if (kuva[k] != null) rivit.push(`${KENTTIEN_OTSIKOT[k]}: ${kuva[k]}`);
  return rivit.join('\n');
}

/** Kuvan ehdotuskehote (korvaa EHDOTUSKEHOTTEEN): kolme kysymystä juuri tästä kuvasta (Natiivi-UI 6.10.: 3–4 sirua). */
export const KUVASIRUJA = 3;
export const KUVASIRUKEHOTE = `Pelaaja katsoo juuri nyt yhtä astronauttien valokuvaa Kansainväliseltä \
avaruusasemalta. Keksi kolme lyhyttä kysymystä, jotka pelaaja voisi haluta kysyä sinulta juuri tästä kuvasta: siinä \
näkyvästä paikasta, ilmiöstä tai yksityiskohdasta, tai siitä, miltä paikka näyttää avaruudesta. Nojaa alla oleviin \
kuvan tietoihin. Kysymysten pitää olla tosimaailman kysymyksiä — EI kuvan tunnuksesta, retkikunnan numerosta, pelin \
tehtävistä, pisteistä tai juonesta.

Jokainen kysymys on kokonainen, luonteva suomenkielinen kysymyslause verbin kanssa, enintään kuusi sanaa — \
ei sähkösanomaa ilman verbiä. Hyviä: "Miksi meri on turkoosi?", "Mistä kalkkipohja on syntynyt?", "Miksi aavikko on \
pimeä?", "Miksi Venetsia on laguunin keskellä?".

Kirjoita täsmälleen kolme riviä, yksi kysymys riville, ilman numerointia, ilman ranskalaisia viivoja ja ilman \
johdantoa. Jokainen kysymys päättyy kysymysmerkkiin.`;

/** KV-avain: tiiviste kuvan kaikista kentistä vakiojärjestyksessä. v2 (6.10.): kuuden sanan kokonaiset lauseet, v1:n sirut eivät palaa. */
export async function kuvaSirujenAvain(kuva) {
  const osat = [kuva.tunnus, ...KUVAN_KENTAT.map((k) => kuva[k] ?? '')];
  const h = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(osat))));
  return `pulu:kuvasirut:v2:${[...h].slice(0, 16).map((b) => b.toString(16).padStart(2, '0')).join('')}`;
}

/** Välimuistista luku: lista kysymyksiä tai null. Virhe = null (generoidaan). */
export async function lueKuvasirut(kv, avain) {
  if (!kv) return null;
  try {
    const arvo = JSON.parse((await kv.get(avain)) ?? 'null');
    return Array.isArray(arvo) && arvo.length ? arvo.filter((s) => typeof s === 'string') : null;
  } catch {
    return null;
  }
}
