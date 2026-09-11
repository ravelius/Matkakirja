import { ilmoitaLivianTilanne } from './livia-tilanteet.js';
import { aaniUrl } from './media.js';
import { FOKUSVIRRAT } from './packs/fokusvirrat.js';

/*
 * PULU REAGOI LUENNAN SISÄLLÄ — ajoitusmoottori.
 *
 * Raamattu: PULU REAGOI TEKSTIN SISALLA; skeema docs/pulu-reaktiot.md
 * osiossa "Luentareaktiot (tekstin sisällä)". Pulun perusasento isoisän
 * matkakirjaluennan aikana on rauhallinen yläviistokatse; sen päälle
 * tulee yksi tekstikohtaan ajoitettu reaktio ja paluu.
 *
 * KOLME OSAA, KOLME VASTUUTA:
 *   1. SISÄLTÖ (Fable) kirjoittaa pakkiin `matkakirja.reaktiot[]`:
 *      { id, ankkuri, tarkoitus, voimakkuus, siirtyma }. `ankkuri` on
 *      katkelma luentatekstistä SANASTA SANAAN.
 *   2. AIKALEIMAT (tools/kohdista-luennat.mjs) kertovat, milloin kukin
 *      sana kuuluu äänitteessä. Ne haetaan ämpäristä äänitteen vierestä.
 *   3. ELE (tekstisessio, js/livia-eleet.js) valitaan vasta täällä
 *      lähetetystä `reaction`-tapahtumasta. Sisältö ei nimeä eleitä.
 *
 * MERKKIMÄÄRÄARVIOITA EI KÄYTETÄ. Jos aikaleimatiedostoa ei ole, tämä
 * moduuli ei tee mitään — arvioitu hetki osuisi väärään sanaan ja pulu
 * nauraisi väärässä kohdassa, mikä on huonompi kuin hiljaisuus.
 *
 * KELLO ON SOITTIMEN, EI SEINÄN. Ajoitus luetaan `audio.currentTime`
 * -kellosta samaan tapaan kuin js/livia-tilanteet.js
 * `seuraaLivianKuuntelua`: tauko, puskurointi ja kelaus eivät saa jättää
 * elejonoa, eikä väliin jäänyttä reaktiota ammuta jälkikäteen.
 */

/** Sallitut tarkoitukset (docs/pulu-reaktiot.md "Luentareaktiot"). */
export const REAKTION_TARKOITUKSET = Object.freeze([
  'myotailee', 'epailee', 'torjuu', 'huvittuu', 'hammastyy', 'vakavoituu',
]);

/**
 * KELAUKSEN TUNTOMERKKI. Tavallinen `timeupdate` tulee noin neljä
 * kertaa sekunnissa, joten yli kahden sekunnin loikka eteenpäin ei ole
 * soiton etenemistä vaan hyppy. Taaksepäin mikä tahansa loikka on
 * kelausta. Näin moottori toimii myös silloin, kun soitin ei lähetä
 * `seeking`-tapahtumaa lainkaan.
 */
const HYPPY_MS = 2000;

/** Aikaleimatiedostot osoitteen mukaan; null = tiedostoa ei ole. */
const aikaleimaVarasto = new Map();

/**
 * Äänitteen aikaleimatiedoston osoite: sama tiedosto, eri pääte.
 *
 * Kyselyversio (js/media.js UUSITUT_AANET) pysyy mukana, jotta uusiksi
 * äänitetty luenta ja sen aikaleimat eivät voi jäädä eri pareiksi
 * välimuisteihin.
 */
export function aikaleimojenOsoite(aaniPolku) {
  const osoite = aaniUrl(aaniPolku);
  if (typeof osoite !== 'string' || !osoite.includes('.mp3')) return null;
  return osoite.replace('.mp3', '.aikaleimat.json');
}

/** Kaupungin tunnus matkakirjaluennan tiedostonimestä, tai null. */
export function kaupunkiOsoitteesta(polku) {
  const osuma = String(polku ?? '').match(/puhe-fokus-matkakirja-([a-z0-9-]+)\.mp3/i);
  return osuma ? osuma[1] : null;
}

/**
 * Sanan normalisointi ankkurin etsintää varten: kirjainkoko ja
 * välimerkit eivät saa ratkaista. Sama sääntö kuin työkalussa
 * (tools/kohdista-luennat.mjs normalisoiSana).
 */
export function normalisoiSana(sana) {
  return String(sana ?? '')
    .toLocaleLowerCase('fi-FI')
    .replace(/[^\p{L}\p{N}'’-]/gu, '');
}

/** Ankkurin sanat normalisoituina. */
export function ankkurinSanat(ankkuri) {
  return String(ankkuri ?? '').split(/\s+/).map(normalisoiSana).filter(Boolean);
}

/**
 * AIKALEIMATIEDOSTO VERKOSTA, kerran per osoite.
 *
 * Puuttuva tiedosto (404) EI OLE VIRHE: kaupungit saavat aikaleimansa
 * erissä, ja ilman niitä luenta soi ennallaan. Pelaajalle ei näytetä
 * mitään eikä konsoliin kirjoiteta muuta kuin kehittäjän varoitus.
 *
 * @returns {Promise<?object>} { versio, teksti, kesto, sanat, lauseet }
 */
export async function lataaLuentareaktiot(kaupunkiId, url) {
  const osoite = aikaleimojenOsoite(url);
  if (!osoite) return null;
  if (aikaleimaVarasto.has(osoite)) return aikaleimaVarasto.get(osoite);
  const lupaus = (async () => {
    try {
      const vastaus = await fetch(osoite);
      if (!vastaus.ok) return null;
      const data = await vastaus.json();
      if (!Array.isArray(data?.sanat) || !data.sanat.length) return null;
      return data;
    } catch {
      // Verkko poikki tai virheellinen JSON: luenta soi ilman reaktioita.
      return null;
    }
  })();
  /*
   * LUPAUS VÄLIMUISTIIN, EI VASTA TULOS: sama luenta voi alkaa kahdesti
   * peräkkäin (kortti auki, kortti kiinni), eikä samaa tiedostoa haeta
   * kahta kertaa. Ratkennut arvo korvaa lupauksen.
   */
  aikaleimaVarasto.set(osoite, lupaus);
  const data = await lupaus;
  aikaleimaVarasto.set(osoite, data);
  if (!data && kehitystila()) {
    console.warn(`luentareaktiot: aikaleimoja ei löydy (${kaupunkiId}) — reaktioita ei ammuta.`);
  }
  return data;
}

/**
 * Kehittäjän kone: varoitukset näkyviin vain siellä. Ilman selaimen
 * `location`-oliota (testit, palvelutyöntekijä) ollaan hiljaa — vartio
 * ankkureista on testissä, ei konsolissa.
 */
function kehitystila() {
  const isanta = globalThis.location?.hostname;
  if (typeof isanta !== 'string') return false;
  return isanta === 'localhost' || isanta === '127.0.0.1' || isanta.endsWith('.local');
}

/**
 * ANKKURIT HETKIKSI. Puhdas funktio: sisällön reaktiorivit ja
 * aikaleimatiedosto sisään, ammuttavat hetket ulos.
 *
 * Hetki on ankkurin VIIMEISEN sanan loppu + `siirtyma` (ms). Ankkuri,
 * jota ei löydy tekstistä sanasta sanaan, ohitetaan — se on sisällön
 * virhe, ei pelaajan, eikä arvattu hetki ole parempi kuin ei mitään.
 *
 * @param {Array<object>} reaktiot pakin matkakirja.reaktiot
 * @param {object} aikaleimat lataaLuentareaktiot-tiedosto
 * @returns {Array<{id:string, hetki:number, tarkoitus:string, voimakkuus:number}>}
 */
export function ratkaiseAnkkurit(reaktiot, aikaleimat) {
  const sanat = Array.isArray(aikaleimat?.sanat) ? aikaleimat.sanat : [];
  if (!Array.isArray(reaktiot) || !sanat.length) return [];
  const avaimet = sanat.map((s) => normalisoiSana(s.sana));
  const lista = [];
  for (const reaktio of reaktiot) {
    const haku = ankkurinSanat(reaktio?.ankkuri);
    const tarkoitus = String(reaktio?.tarkoitus ?? '');
    if (!haku.length || !REAKTION_TARKOITUKSET.includes(tarkoitus)) {
      if (kehitystila()) console.warn('luentareaktiot: kelvoton reaktio', reaktio?.id);
      continue;
    }
    let paikka = -1;
    for (let i = 0; paikka < 0 && i + haku.length <= avaimet.length; i += 1) {
      let osuu = true;
      for (let j = 0; j < haku.length; j += 1) {
        if (avaimet[i + j] !== haku[j]) { osuu = false; break; }
      }
      if (osuu) paikka = i;
    }
    if (paikka < 0) {
      if (kehitystila()) {
        console.warn(`luentareaktiot: ankkuria "${reaktio?.ankkuri}" ei löydy (${reaktio?.id})`);
      }
      continue;
    }
    const viimeinen = sanat[paikka + haku.length - 1];
    // Loppuaika puuttuu vain vajaasta tiedostosta; seuraava sana kelpaa.
    const loppu = Number.isFinite(viimeinen?.loppu) ? viimeinen.loppu
      : (sanat[paikka + haku.length]?.alku ?? viimeinen?.alku);
    if (!Number.isFinite(loppu)) continue;
    const siirtyma = Number(reaktio?.siirtyma);
    const voimakkuus = Number(reaktio?.voimakkuus);
    lista.push({
      id: String(reaktio?.id ?? ''),
      hetki: Math.max(0, Math.round(loppu + (Number.isFinite(siirtyma) ? siirtyma : 0))),
      tarkoitus,
      voimakkuus: Number.isFinite(voimakkuus) ? Math.max(0, Math.min(1, voimakkuus)) : 0.5,
    });
  }
  return lista.sort((a, b) => a.hetki - b.hetki);
}

/**
 * AJOITUSMOOTTORI. Kuuntelee soitinta ja ampuu kunkin reaktion kerran,
 * omalla hetkellään.
 *
 * Säännöt (docs/pulu-reaktiot.md): tauko ei ammu; kelaus eteenpäin ei
 * ammu väliin jääneitä vaan merkitsee ne ohitetuiksi; kelaus taaksepäin
 * palauttaa ohitetut ammuttaviksi; luennan loppu, soittimen tyhjennys
 * tai kaupungin vaihto purkaa kytkennän.
 *
 * @param {HTMLAudioElement|EventTarget} audio soiva luenta
 * @param {Array<object>} lista ratkaiseAnkkurit-tulos
 * @param {{kaupunki?:string}} [asetukset]
 * @returns {function():void} purku
 */
export function kytkeLuentareaktiot(audio, lista, { kaupunki = null } = {}) {
  if (!audio?.addEventListener || !Array.isArray(lista) || !lista.length) return () => {};
  const rivit = [...lista].sort((a, b) => a.hetki - b.hetki);
  const ammuttu = new Array(rivit.length).fill(false);
  let elossa = true;
  let edellinen = null;

  const nyt = () => Math.round((Number(audio.currentTime) || 0) * 1000);

  /* Kelaus: mitään ei ammuta, vaan tila sovitetaan uuteen kohtaan. */
  const sovita = (t) => {
    for (let i = 0; i < rivit.length; i += 1) ammuttu[i] = rivit[i].hetki <= t;
  };

  const reagoi = () => {
    if (!elossa) return;
    // Tauko ei ammu: pysähtynyt soitin ei etene eikä reagoi.
    if (audio.paused || audio.ended) { edellinen = nyt(); return; }
    const t = nyt();
    const hyppy = edellinen === null || t < edellinen || t - edellinen > HYPPY_MS;
    if (hyppy) {
      sovita(t);
      edellinen = t;
      return;
    }
    edellinen = t;
    for (let i = 0; i < rivit.length; i += 1) {
      if (ammuttu[i] || rivit[i].hetki > t) continue;
      ammuttu[i] = true;
      ilmoitaLivianTilanne('reaction', {
        lahde: 'matkakirja',
        tunnus: rivit[i].id,
        tarkoitus: rivit[i].tarkoitus,
        voimakkuus: rivit[i].voimakkuus,
        kaupunki,
        /* Soitin erottaa saman kaupungin kaksi luentakertaa toisistaan. */
        tunnus2: audio,
      });
    }
  };

  /*
   * SEEKING NOLLAA VERTAILUKOHDAN. Kelauksen jälkeen ensimmäinen
   * timeupdate kulkee hyppyhaaran kautta ja sovittaa tilan uuteen
   * kohtaan ampumatta mitään.
   */
  const kelaus = () => { edellinen = null; };
  const tauko = () => { edellinen = nyt(); };

  const tapahtumat = {
    playing: reagoi,
    timeupdate: reagoi,
    seeking: kelaus,
    seeked: kelaus,
    pause: tauko,
    waiting: tauko,
    stalled: tauko,
    ended: purku,
    emptied: purku,
  };

  function purku() {
    if (!elossa) return;
    elossa = false;
    for (const [nimi, f] of Object.entries(tapahtumat)) audio.removeEventListener(nimi, f);
  }

  for (const [nimi, f] of Object.entries(tapahtumat)) audio.addEventListener(nimi, f);
  return purku;
}

/**
 * KYTKENTÄ MATKAKIRJALUENTAAN (js/luenta.js playDiaryVoice).
 *
 * Kaupunki tunnistetaan äänitteen nimestä, reaktiot luetaan pakista ja
 * aikaleimat ämpäristä. Ilman reaktioita tai ilman aikaleimoja ei tehdä
 * mitään — myöskään verkkopyyntöä ei lähetetä, jos pakissa ei ole
 * yhtään reaktiota.
 *
 * @param {HTMLAudioElement} audio soiva luenta
 * @param {string} url äänitteen polku (assets/audio/…)
 * @param {{voimassa?:function():boolean}} [asetukset]
 * @returns {Promise<?function():void>} purku tai null
 */
export async function kytkeMatkakirjanReaktiot(audio, url, { voimassa = () => true } = {}) {
  const kaupunki = kaupunkiOsoitteesta(url);
  if (!kaupunki) return null;
  const reaktiot = FOKUSVIRRAT[kaupunki]?.matkakirja?.reaktiot;
  if (!Array.isArray(reaktiot) || !reaktiot.length) return null;
  const aikaleimat = await lataaLuentareaktiot(kaupunki, url);
  // Luenta on voinut vaihtua tai loppua latauksen aikana.
  if (!aikaleimat || !voimassa() || audio.ended) return null;
  return kytkeLuentareaktiot(audio, ratkaiseAnkkurit(reaktiot, aikaleimat), { kaupunki });
}
