/*
 * NIMETÖN KÄVIJÄLASKURI (omistaja 30.9.2026 Päätoimittajan kautta: "nähdä,
 * milloin joku muu kuin omistaja käyttää peliä").
 *
 * Peli (web ja iOS) lähettää kerran istunnossa tehtävän 'kaynti' (tapahtuma
 * 'avaus'), ja apurahan kortin avaus sekä esittelylinssit omina
 * tapahtumina. Laskuri tallentaa päivän eri kävijät tiivisteenä
 * SHA-256(IP + päivän suola): suola arvotaan päivittäin KV:hen ja vanhenee
 * kahdessa vuorokaudessa, jolloin tiivistettä ei voi enää palauttaa
 * osoitteeksi eikä yhdistää eri päiviin. Raakaa IP-osoitetta ei tallenneta
 * mihinkään eikä kirjoiteta lokiin.
 *
 * Omistajan laitteet (pelin merkki omistaja: true tai kehittäjäkoodi)
 * ohitetaan kokonaan: ei lukua, ei kirjoitusta.
 *
 * KV-SÄÄSTÖ (ilmaistaso 1 000 kirjoitusta/vrk, Pöllö käyttää jo ~550):
 * päivän kaikki kävijät ovat YHDESSÄ avaimessa (kaynti:<pvm>), joten uusi
 * kävijä tai uusi tapahtuma = 1 kirjoitus, toistuva ping = 0 kirjoitusta.
 * Lisäksi suola = 1 kirjoitus vuorokaudessa. Samanaikaiset kirjoitukset
 * voivat harvoin hukata yhden kävijän; se riittää tähän tarkoitukseen.
 *
 * LASKURI EI KOSKAAN KAADA PYYNTÖÄ: kaikki KV-virheet niellään ja pyyntö
 * vastaa silti 200 (sama periaate kuin Pöllön muissa laskureissa).
 *
 * Luku (tehtävä 'kaynnit', vain kehittäjäkoodilla): päivittäiset
 * ulkopuoliset kävijät maittain ja alustoittain, apurahakortin avaukset ja
 * esittelylinssit. Postivahti lukee tämän kierroksellaan.
 */

export const ALUSTAT = Object.freeze(['web', 'ios']);
export const TAPAHTUMAT = Object.freeze(['avaus', 'apuraha', 'esittelylinssit']);
const PAIVAN_ELINAIKA_S = 60 * 60 * 24 * 90;
const SUOLAN_ELINAIKA_S = 60 * 60 * 48;
const LUKU_PAIVIA_MAX = 60;

const muisti = new Map();

/** Testeille: muistivarasto tyhjäksi. */
export function nollaaKaynnit() { muisti.clear(); }

export function pvm(nyt = new Date()) { return nyt.toISOString().slice(0, 10); }

async function kvLue(kv, avain) {
  if (kv) {
    try { return await kv.get(avain); } catch (virhe) {
      console.log(`pollo kaynnit: luku epäonnistui (${avain}): ${virhe?.message ?? virhe}`);
      return null;
    }
  }
  return muisti.get(avain) ?? null;
}

async function kvKirjoita(kv, avain, arvo, elinaikaS) {
  if (kv) {
    try { await kv.put(avain, arvo, { expirationTtl: elinaikaS }); return true; } catch (virhe) {
      console.log(`pollo kaynnit: kirjoitus epäonnistui (${avain}): ${virhe?.message ?? virhe}`);
      return false;
    }
  }
  muisti.set(avain, arvo);
  return true;
}

async function paivanSuola(kv, paiva) {
  const avain = `kaynti:suola:${paiva}`;
  const olemassa = await kvLue(kv, avain);
  if (olemassa) return olemassa;
  const tavut = crypto.getRandomValues(new Uint8Array(16));
  const suola = [...tavut].map((b) => b.toString(16).padStart(2, '0')).join('');
  await kvKirjoita(kv, avain, suola, SUOLAN_ELINAIKA_S);
  return suola;
}

/** SHA-256(IP + suola), 16 heksamerkkiä. */
export async function kavijaTiiviste(ip, suola) {
  const data = new TextEncoder().encode(`${ip ?? 'tuntematon'}|${suola}`);
  const h = new Uint8Array(await crypto.subtle.digest('SHA-256', data));
  return [...h.slice(0, 8)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function lueDoc(teksti) {
  try {
    const d = teksti ? JSON.parse(teksti) : null;
    return d && typeof d === 'object' && d.kavijat ? d : { kavijat: {} };
  } catch { return { kavijat: {} }; }
}

/**
 * Kirjaa käynnin. Palauttaa { laskettu, uusi } — ei heitä koskaan.
 * @param {{ kv?: any, ip?: string, maa?: string, runko: any, omistaja?: boolean, nyt?: Date }} a
 */
export async function kirjaaKaynti({ kv = null, ip, maa, runko, omistaja = false, nyt = new Date() }) {
  try {
    if (omistaja || runko?.omistaja === true) return { laskettu: false, syy: 'omistaja' };
    const alusta = ALUSTAT.includes(runko?.alusta) ? runko.alusta : null;
    const tapahtuma = TAPAHTUMAT.includes(runko?.tapahtuma) ? runko.tapahtuma : 'avaus';
    if (!alusta) return { laskettu: false, syy: 'alusta' };
    const versio = String(runko?.versio ?? '').slice(0, 24);
    const paiva = pvm(nyt);
    const suola = await paivanSuola(kv, paiva);
    const h = await kavijaTiiviste(ip, suola);
    const avain = `kaynti:${paiva}`;
    const doc = lueDoc(await kvLue(kv, avain));
    const k = doc.kavijat[h];
    let muuttui = false;
    if (!k) {
      doc.kavijat[h] = { m: /^[A-Z]{2}$/.test(maa ?? '') ? maa : '??', a: alusta, v: versio, t: nyt.toISOString().slice(11, 16) };
      muuttui = true;
    }
    const kavija = doc.kavijat[h];
    if (tapahtuma !== 'avaus' && !kavija[tapahtuma]) { kavija[tapahtuma] = 1; muuttui = true; }
    if (muuttui) await kvKirjoita(kv, avain, JSON.stringify(doc), PAIVAN_ELINAIKA_S);
    return { laskettu: true, uusi: !k };
  } catch (virhe) {
    console.log(`pollo kaynnit: kirjaus ohitettiin: ${virhe?.message ?? virhe}`);
    return { laskettu: false, syy: 'virhe' };
  }
}

/** Yhden päivän yhteenveto (ei tiivisteitä ulos). */
export function yhteenveto(paiva, doc) {
  const maat = {};
  const alustat = {};
  let apuraha = 0;
  let esittelylinssit = 0;
  let eka = null;
  for (const k of Object.values(doc?.kavijat ?? {})) {
    maat[k.m] = (maat[k.m] ?? 0) + 1;
    alustat[k.a] = (alustat[k.a] ?? 0) + 1;
    if (k.apuraha) apuraha += 1;
    if (k.esittelylinssit) esittelylinssit += 1;
    if (k.t && (!eka || k.t < eka)) eka = k.t;
  }
  return { pvm: paiva, kavijoita: Object.keys(doc?.kavijat ?? {}).length, maat, alustat, apuraha, esittelylinssit, ensimmainen: eka };
}

/** Viimeisten `paivia` päivän yhteenvedot, uusin ensin. */
export async function lueKaynnit({ kv = null, paivia = 14, nyt = new Date() }) {
  const n = Math.max(1, Math.min(LUKU_PAIVIA_MAX, Number.parseInt(paivia, 10) || 14));
  const ulos = [];
  for (let i = 0; i < n; i += 1) {
    const paiva = pvm(new Date(nyt.getTime() - i * 86400000));
    ulos.push(yhteenveto(paiva, lueDoc(await kvLue(kv, `kaynti:${paiva}`))));
  }
  return ulos;
}
