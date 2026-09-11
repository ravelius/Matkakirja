import { ilmoitaLivianTilanne } from './livia-tilanteet.js';
import { aaniUrl, haeAani } from './media.js';
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
 * EIKÄ ARVATA MUUTAKAAN. Aikaleimatiedosto kelpaa vain, jos se on
 * sidottu juuri siihen äänitteeseen ja juuri siihen tekstiin, joka
 * pelissä soi (tarkistaAikaleimat alla): väärään mp3:een kohdistetut
 * ajat ovat pahempi vika kuin puuttuvat ajat, koska ne kuulostavat
 * toimivilta mutta osuvat viereiseen lauseeseen.
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
 * Aikaleimatiedoston muoto. Versio 2 lisäsi äänisidonnan (tekstin ja
 * äänitteen SHA-256) — versio 1 ei kelpaa enää, koska se ei kerro,
 * mihin äänitteeseen ajat on kohdistettu.
 */
export const AIKALEIMOJEN_VERSIO = 2;

/**
 * LUONNOLLINEN LOPPU (sopimus tekstisession kanssa, 11.9.2026).
 *
 * Merkinnän viimeinen reaktio osuu usein viimeiseen sanaan, ja
 * äänitteen häntä loppuu siihen paikkaan. Luenta ehtii loppua ennen
 * kuin viimeinen `timeupdate` osuu hetkeen — ja ilman tätä varaa
 * loppuvitsi jäisi ampumatta juuri siinä kohdassa, johon se on
 * kirjoitettu. Puoli sekuntia riittää MOLEMPIIN SUUNTIIN: sitä pidempi
 * varaa alkaisi ampua reaktioita, joita luennassa ei enää kuultu.
 * Lopussa ammutaan enintään YKSI reaktio (paatos alla) — vanhoja
 * ampumatta jääneitä ei pureta ryöppynä viimeiseen hetkeen.
 *
 * Jälkireaktio merkitään tapahtumaan (`jalkireaktio: true`), jotta
 * sovitin saa antaa sen valmistua äänitteen jo loputtua. Manuaalinen
 * pysäytys, kelaus ja kaupungin vaihto katkaisevat eleen entiseen
 * tapaan (`reactionEnd`).
 */
export const LOPPUVARA_MS = 500;

/**
 * LUENNAN LUONNOLLINEN LOPPU EI OLE `ended` (selainkoe 11.9.2026).
 *
 * js/luenta.js pehmeaLoppu vaimentaa viimeisen hetken ja kutsuu
 * `audio.pause()` 25 ms ennen tiedoston reunaa, jottei pysäytys
 * napsahda. Soitin ei siis koskaan lähetä `ended`-tapahtumaa
 * matkakirjaluennasta: peli lähettää pausen ja `ended` jää epätodeksi,
 * eikä viimeiseen sanaan kirjoitettu loppureaktio ampuisi ikinä.
 *
 * Siksi pehmeaLoppu lähettää TÄSTÄ JA VAIN TÄSTÄ polusta oman
 * tapahtumansa juuri ennen pausea. Manuaalinen pysäytys, häivytys,
 * kelaus ja virhe eivät sitä lähetä — ne ovat keskeytyksiä, eivät
 * loppuja. Nimi on täällä vakiona, jotta luenta.js ja moottori eivät
 * voi eriytyä kirjoitusasusta.
 *
 * Tekstisession seuraaLivianKuuntelua lähettää samasta tapahtumasta
 * `narrationEnd { tunnus, luonnollinenLoppu: true }` (#2227).
 */
export const LUENNAN_LOPPU_TAPAHTUMA = 'matkakirja:luenta-loppu';

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
 * SHA-256 heksana, yhdellä apurilla koko moduulille. (Nimi ei ole
 * sha256Hex, koska yhden tiedoston julkaisu niputtaa kaikki moduulit
 * samaan tiedostoon eikä js/main.js:n samanniminen apuri saa jäädä
 * tämän alle — tools/tarkista-niputus.mjs vartioi sitä.)
 *
 * Selaimessa ja Node 22:ssa sama rajapinta (`crypto.subtle`), joten
 * työkalu ja peli laskevat saman summan samasta tavuista. Ilman
 * `crypto.subtle`-rajapintaa palautuu null, ja kutsuja tulkitsee sen
 * samoin kuin puuttuvat aikaleimat: hiljaisuus, ei arvausta.
 */
export async function laskeSha256(data) {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) return null;
  const puskuri = await subtle.digest('SHA-256', data);
  return [...new Uint8Array(puskuri)].map((t) => t.toString(16).padStart(2, '0')).join('');
}

/** Tekstin SHA-256 heksana (UTF-8). */
export async function tekstinSha256(teksti) {
  return laskeSha256(new TextEncoder().encode(String(teksti ?? '')));
}

/**
 * AIKALEIMATIEDOSTON TARKISTUS — sama sääntö pelissä ja työkalussa.
 *
 * Puhdas funktio: sisään tiedoston sisältö, odotettu teksti ja (jos
 * tiedossa) soivan äänitteen tunnusluvut, ulos { ok, syy }. Ei
 * verkkoa, ei tiedostoja, ei konsolia — kutsuja päättää, mitä
 * hylkäyksestä seuraa.
 *
 * MIKSI NÄIN TIUKKA: kohdistus on sidottu yhteen mp3-tiedostoon ja
 * yhteen tekstiin. Jos kumpi tahansa vaihtuu (luenta äänitetään
 * uusiksi, teksti korjataan), vanhat ajat osuvat viereisiin sanoihin.
 * Se ei näy mistään lokista — se kuuluu vain siitä, että pulu nauraa
 * väärässä kohdassa. Siksi tiedosto kantaa mukanaan tekstin ja
 * äänitteen SHA-256-summat, ja peli vertaa niitä siihen, mitä se juuri
 * aikoo soittaa.
 *
 * @param {object} data aikaleimatiedoston sisältö
 * @param {{teksti:string, aani?:{tavut:number, sha256:string}}} odotus
 * @returns {Promise<{ok:boolean, syy?:string}>}
 */
export async function tarkistaAikaleimat(data, { teksti, aani = null } = {}) {
  const hylkaa = (syy) => ({ ok: false, syy });
  if (!data || typeof data !== 'object') return hylkaa('tiedosto ei ole olio');
  if (data.versio !== AIKALEIMOJEN_VERSIO) {
    return hylkaa(`versio ${data.versio} ei ole ${AIKALEIMOJEN_VERSIO}`);
  }
  const odotettu = String(teksti ?? '');
  if (!odotettu) return hylkaa('odotettua tekstiä ei annettu');
  // Merkilleen sama teksti: yksikin korjattu pilkku siirtää sanarajat.
  if (data.teksti !== odotettu) return hylkaa('teksti ei ole sama kuin pakissa');
  const sha = await tekstinSha256(odotettu);
  if (!sha) return hylkaa('SHA-256 ei ole käytettävissä');
  if (data.tekstiSha256 !== sha) return hylkaa('tekstiSha256 ei vastaa tekstiä');

  const sanat = data.sanat;
  if (!Array.isArray(sanat) || !sanat.length) return hylkaa('sanat puuttuvat');
  let edellinen = null;
  for (let i = 0; i < sanat.length; i += 1) {
    const s = sanat[i];
    if (!s || typeof s.sana !== 'string' || !s.sana) return hylkaa(`sana ${i} ei ole merkkijono`);
    if (!Number.isInteger(s.alku) || !Number.isInteger(s.loppu)) {
      return hylkaa(`sanan ${i} aika ei ole kokonaisluku`);
    }
    if (s.alku < 0 || s.loppu < s.alku) return hylkaa(`sanan ${i} aika on kelvoton`);
    /*
     * EI RISTIIN MENOA. Kohdistus palauttaa sanat siinä järjestyksessä,
     * jossa ne puhutaan; jos seuraava sana alkaa tai loppuu ennen
     * edellistä, tiedosto on sekaisin eikä yhteenkään hetkeen voi
     * luottaa.
     */
    if (edellinen && (s.alku < edellinen.alku || s.loppu < edellinen.loppu)) {
      return hylkaa(`sanat eivät ole kasvavassa järjestyksessä (${i})`);
    }
    edellinen = s;
  }
  if (!Number.isInteger(data.kesto) || data.kesto < edellinen.loppu) {
    return hylkaa('kesto puuttuu tai on lyhyempi kuin viimeinen sana');
  }
  if (!Array.isArray(data.lauseet)) return hylkaa('lauseet ei ole taulukko');
  // Tiedoston sanojen on oltava TEKSTIN sanat: ankkurit kirjoitetaan
  // tekstiä vasten, ja eri sanalista tarkoittaisi eri luentaa.
  const odotetut = ankkurinSanat(odotettu);
  const omat = sanat.map((s) => normalisoiSana(s.sana));
  if (odotetut.length !== omat.length || odotetut.some((w, i) => w !== omat[i])) {
    return hylkaa('sanat eivät vastaa tekstin sanoja');
  }

  const a = data.aani;
  if (!a || typeof a !== 'object') return hylkaa('aani-kenttä puuttuu');
  if (typeof a.nimi !== 'string' || !a.nimi.endsWith('.mp3')) return hylkaa('aani.nimi puuttuu');
  if (!Number.isInteger(a.versio) || a.versio < 0) return hylkaa('aani.versio ei ole kokonaisluku');
  if (!Number.isInteger(a.tavut) || a.tavut <= 0) return hylkaa('aani.tavut ei ole positiivinen');
  if (typeof a.sha256 !== 'string' || !/^[0-9a-f]{64}$/.test(a.sha256)) {
    return hylkaa('aani.sha256 ei ole 64 heksamerkkiä');
  }
  if (aani) {
    if (aani.tavut !== a.tavut) return hylkaa(`äänitteen koko ${aani.tavut} ≠ ${a.tavut}`);
    if (aani.sha256 !== a.sha256) return hylkaa('äänitteen SHA-256 ei täsmää aikaleimoihin');
  }
  return { ok: true };
}

/**
 * AIKALEIMATIEDOSTO VERKOSTA, kerran per osoite — ja sidottuna siihen
 * äänitteeseen, joka juuri soi.
 *
 * Puuttuva tiedosto (404) EI OLE VIRHE: kaupungit saavat aikaleimansa
 * erissä, ja ilman niitä luenta soi ennallaan. Sama koskee hylättyä
 * tiedostoa: pelaajalle ei näytetä mitään eikä konsoliin kirjoiteta
 * muuta kuin kehittäjän varoitus.
 *
 * ÄÄNISIDONTA hakee äänitteen samaa reittiä kuin soitto (js/media.js
 * haeAani, peili ensin) ja laskee siitä SHA-256:n. Selain on juuri
 * ladannut saman tiedoston soittimeen, joten pyyntö osuu HTTP-
 * välimuistiin eikä maksa toista latausta.
 *
 * @returns {Promise<?object>} tarkistettu aikaleimatiedosto tai null
 */
export async function lataaLuentareaktiot(kaupunkiId, url, { teksti = null } = {}) {
  const osoite = aikaleimojenOsoite(url);
  if (!osoite) return null;
  if (aikaleimaVarasto.has(osoite)) return aikaleimaVarasto.get(osoite);
  const lupaus = (async () => {
    try {
      const vastaus = await fetch(osoite);
      if (!vastaus.ok) return null;
      const data = await vastaus.json();
      const aaniVastaus = await haeAani(url);
      if (!aaniVastaus?.ok) return { syy: 'äänitettä ei saatu sidontaa varten' };
      const tavut = new Uint8Array(await aaniVastaus.arrayBuffer());
      const sha256 = await laskeSha256(tavut);
      if (!sha256) return { syy: 'SHA-256 ei ole käytettävissä' };
      const tulos = await tarkistaAikaleimat(data, {
        teksti, aani: { tavut: tavut.byteLength, sha256 },
      });
      return tulos.ok ? data : { syy: tulos.syy };
    } catch (virhe) {
      // Verkko poikki tai virheellinen JSON: luenta soi ilman reaktioita.
      return { syy: `lataus ei onnistunut (${virhe?.message ?? virhe})` };
    }
  })().then((tulos) => {
    // Hylkäyksen syy kerrotaan kerran, kehittäjän koneella.
    if (tulos && tulos.syy) {
      if (kehitystila()) console.warn(`luentareaktiot: aikaleimat hylätty (${kaupunkiId}): ${tulos.syy}`);
      return null;
    }
    return tulos;
  });
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

/** Ankkurin sanajonon kaikki alkukohdat sanalistassa. */
function ankkurinPaikat(avaimet, haku) {
  const paikat = [];
  for (let i = 0; i + haku.length <= avaimet.length; i += 1) {
    let osuu = true;
    for (let j = 0; j < haku.length; j += 1) {
      if (avaimet[i + j] !== haku[j]) { osuu = false; break; }
    }
    if (osuu) paikat.push(i);
  }
  return paikat;
}

/** Montako kertaa ankkuri osuu sanalistaan (vrt. tools/kohdista-luennat.mjs). */
export function laskeAnkkurinOsumat(sanat, ankkuri) {
  const haku = ankkurinSanat(ankkuri);
  if (!haku.length) return 0;
  return ankkurinPaikat(Array.isArray(sanat) ? sanat : [], haku).length;
}

/**
 * ANKKURIT HETKIKSI. Puhdas funktio: sisällön reaktiorivit ja
 * aikaleimatiedosto sisään, ammuttavat hetket ulos.
 *
 * Hetki on ankkurin VIIMEISEN sanan loppu + `siirtyma` (ms).
 *
 * MOOTTORI EI ARVAA MITÄÄN (11.9.2026). Rivi jätetään pois aina, kun
 * jokin on epäselvää, koska väärään sanaan osuva reaktio on huonompi
 * kuin hiljaisuus:
 *   - ankkuria ei löydy sanasta sanaan TAI se löytyy useammin kuin
 *     kerran (kumpi osuma olisi oikea? — sisällön on tarkennettava
 *     ankkuria)
 *   - ankkurin viimeiseltä sanalta puuttuu `loppu` (ei kurkoteta
 *     seuraavan sanan alkuun: vajaa tiedosto ei ansaitse arvausta)
 *   - reaktion tunnus puuttuu tai toistuu listassa (toistuvasta
 *     hylätään MOLEMMAT: sovitin tunnistaa eleen tunnuksesta)
 *   - `siirtyma` ei ole kokonaisluku tai hetki jää nollan ja keston
 *     (+ LOPPUVARA_MS) ulkopuolelle
 *   - `voimakkuus` ei ole luvulla 0 < v ≤ 1 — EI enää rajata, koska
 *     rajaaminen peitti sisällön kirjoitusvirheen
 *
 * @param {Array<object>} reaktiot pakin matkakirja.reaktiot
 * @param {object} aikaleimat lataaLuentareaktiot-tiedosto
 * @returns {Array<{id:string, hetki:number, tarkoitus:string, voimakkuus:number}>}
 */
export function ratkaiseAnkkurit(reaktiot, aikaleimat) {
  const sanat = Array.isArray(aikaleimat?.sanat) ? aikaleimat.sanat : [];
  if (!Array.isArray(reaktiot) || !sanat.length) return [];
  const avaimet = sanat.map((s) => normalisoiSana(s.sana));
  const katto = Number.isInteger(aikaleimat?.kesto)
    ? aikaleimat.kesto + LOPPUVARA_MS : Infinity;
  const kertoja = new Map();
  for (const reaktio of reaktiot) {
    const id = String(reaktio?.id ?? '');
    kertoja.set(id, (kertoja.get(id) ?? 0) + 1);
  }
  const lista = [];
  const hylkaa = (id, syy) => {
    if (kehitystila()) console.warn(`luentareaktiot: reaktio ${id || '(nimetön)'} hylätty — ${syy}`);
  };
  for (const reaktio of reaktiot) {
    const id = String(reaktio?.id ?? '');
    const haku = ankkurinSanat(reaktio?.ankkuri);
    const tarkoitus = String(reaktio?.tarkoitus ?? '');
    if (!id) { hylkaa(id, 'tunnus puuttuu'); continue; }
    if (kertoja.get(id) > 1) { hylkaa(id, 'tunnus toistuu listassa'); continue; }
    if (!haku.length || !REAKTION_TARKOITUKSET.includes(tarkoitus)) {
      hylkaa(id, 'ankkuri tyhjä tai tarkoitus tuntematon');
      continue;
    }
    const paikat = ankkurinPaikat(avaimet, haku);
    if (paikat.length !== 1) {
      hylkaa(id, paikat.length ? `ankkuri "${reaktio?.ankkuri}" osuu ${paikat.length} kertaa`
        : `ankkuria "${reaktio?.ankkuri}" ei löydy`);
      continue;
    }
    const viimeinen = sanat[paikat[0] + haku.length - 1];
    if (!Number.isFinite(viimeinen?.loppu)) { hylkaa(id, 'ankkurin viimeiseltä sanalta puuttuu loppu'); continue; }
    const siirtyma = reaktio?.siirtyma ?? 0;
    if (!Number.isInteger(siirtyma)) { hylkaa(id, 'siirtymä ei ole kokonaisluku'); continue; }
    const voimakkuus = reaktio?.voimakkuus;
    if (!Number.isFinite(voimakkuus) || voimakkuus <= 0 || voimakkuus > 1) {
      hylkaa(id, 'voimakkuus ei ole välillä 0 < v ≤ 1');
      continue;
    }
    const hetki = Math.round(viimeinen.loppu + siirtyma);
    if (hetki < 0 || hetki > katto) { hylkaa(id, `hetki ${hetki} ms on äänitteen ulkopuolella`); continue; }
    lista.push({ id, hetki, tarkoitus, voimakkuus });
  }
  return lista.sort((a, b) => a.hetki - b.hetki);
}

/**
 * AJOITUSMOOTTORI. Kuuntelee soitinta ja ampuu kunkin reaktion kerran,
 * omalla hetkellään.
 *
 * Säännöt (docs/pulu-reaktiot.md): tauko ei ammu; tauolla tai
 * puskuroinnissa ohitettu hetki ei purkaudu jälkikäteen, vaan soiton
 * jatkuessa tila SOVITETAAN nykyhetkeen; kelaus eteenpäin ei ammu
 * väliin jääneitä; kelaus taaksepäin palauttaa ohitetut ammuttaviksi;
 * soittimen tyhjennys, virhe tai kaupungin vaihto purkaa kytkennän.
 *
 * TAPAHTUMASOPIMUS SOVITTIMEN KANSSA (js/livia-eleet.js):
 *   reaction    { lahde:'matkakirja', tunnus:<reaktion id>, tarkoitus,
 *                 voimakkuus, kaupunki, jalkireaktio, luentaTunnus:<audio> }
 *   reactionEnd { lahde:'matkakirja', luentaTunnus:<audio>, kaupunki }
 * `luentaTunnus` on SAMA Audio-olio, jonka seuraaLivianKuuntelua antaa
 * narration-tapahtuman tunnukseksi — siitä sovitin tietää, mihin
 * luentakertaan reaktio kuuluu. `tunnus` on reaktion oma tunniste.
 *
 * @param {HTMLAudioElement|EventTarget} audio soiva luenta
 * @param {Array<object>} lista ratkaiseAnkkurit-tulos
 * @param {{kaupunki?:string, voimassa?:function():boolean, soiva?:boolean,
 *   kuollut?:function():void}} [asetukset] `soiva` kertoo todennetun
 *   soittotilan kytkentähetkellä (ks. kytkeMatkakirjanReaktiot);
 *   `kuollut` kutsutaan kerran, kun moottori purkaa itsensä.
 * @returns {function():void} purku
 */
export function kytkeLuentareaktiot(audio, lista, {
  kaupunki = null, voimassa = () => true, soiva: alkutila = false, kuollut = null,
} = {}) {
  if (!audio?.addEventListener || !Array.isArray(lista) || !lista.length) return () => {};
  const rivit = [...lista].sort((a, b) => a.hetki - b.hetki);
  const ammuttu = new Array(rivit.length).fill(false);
  let elossa = true;
  let edellinen = null;
  /*
   * SOIVA-TILA ON OMA, EI PÄÄTELTY. Vain `playing` kertoo, että ääni
   * oikeasti etenee; pause, puskurointi ja virhe katkaisevat sen.
   * Pelkkä `audio.paused` ei riitä: puskuroiva soitin ei ole pausella,
   * mutta kello seisoo silti.
   */
  let soiva = alkutila === true;
  /*
   * ELE ON KÄYNNISSÄ, kunnes sovittimelle on kerrottu sen loppuneen.
   * Tyhjiä reactionEnd-viestejä ei lähetetä joka tauolla — sovitin
   * tulkitsisi ne turhiksi paluiksi perusasentoon.
   */
  let reaktioKaynnissa = false;

  const nyt = () => Math.round((Number(audio.currentTime) || 0) * 1000);

  /* Kelaus ja tauolta paluu: mitään ei ammuta, vaan tila sovitetaan. */
  const sovita = (t) => {
    for (let i = 0; i < rivit.length; i += 1) ammuttu[i] = rivit[i].hetki <= t;
  };

  const paataReaktio = () => {
    if (!reaktioKaynnissa) return;
    reaktioKaynnissa = false;
    ilmoitaLivianTilanne('reactionEnd', { lahde: 'matkakirja', luentaTunnus: audio, kaupunki });
  };

  const ammu = (i, jalkireaktio) => {
    ammuttu[i] = true;
    reaktioKaynnissa = true;
    ilmoitaLivianTilanne('reaction', {
      lahde: 'matkakirja',
      tunnus: rivit[i].id,
      tarkoitus: rivit[i].tarkoitus,
      voimakkuus: rivit[i].voimakkuus,
      kaupunki,
      jalkireaktio,
      /* Sama olio kuin narration-tapahtuman tunnus: yksi luentakerta. */
      luentaTunnus: audio,
    });
  };

  const reagoi = () => {
    if (!elossa) return;
    // Luenta on vaihtunut tai pysäytetty toisaalla: ele pois ja kytkentä auki.
    if (!voimassa()) { sisainenPurku(); return; }
    // Tauko ja puskurointi eivät ammu: pysähtynyt kello ei etene.
    if (!soiva || audio.paused || audio.ended) { edellinen = nyt(); return; }
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
      ammu(i, false);
    }
  };

  /*
   * SOITTO JATKUU: tila sovitetaan nykyhetkeen AMPUMATTA MITÄÄN.
   *
   * Tauolla tai puskuroinnissa ohi mennyt hetki on kuultu ilman
   * reaktiota, eikä se saa purkautua jälkikäteen kerralla — pulu
   * nauraisi kohdalle, joka on jo mennyt.
   */
  const alkoi = () => {
    if (!elossa) return;
    if (!voimassa()) { sisainenPurku(); return; }
    soiva = true;
    const t = nyt();
    sovita(t);
    edellinen = t;
  };

  /*
   * SEEKING NOLLAA VERTAILUKOHDAN. Kelauksen jälkeen ensimmäinen
   * timeupdate kulkee hyppyhaaran kautta ja sovittaa tilan uuteen
   * kohtaan ampumatta mitään. Ele katkaistaan ENNEN kelausta: pelaaja
   * on jo siirtynyt pois siitä kohdasta, johon reaktio kuului.
   */
  const kelaus = () => { paataReaktio(); edellinen = null; };
  /*
   * TAUKO JA PUSKUROINTI KATKAISEVAT ELEEN SAMALLA TAVALLA (selainkoe
   * 11.9.2026). Aiemmin waiting/stalled jätti eleen päälle "lyhyenä
   * notkahduksena", mutta tekstisession seuraaLivianKuuntelua lähettää
   * niissä narrationEndin ja sovitin katkaisee eleen joka tapauksessa.
   * Yhteinen turvallinen katkaisu on selvempi kuin jono, joka jäisi
   * odottamaan pausea, joka ei ehkä koskaan tule.
   */
  const tauko = () => { soiva = false; paataReaktio(); edellinen = nyt(); };
  const virhe = () => { soiva = false; sisainenPurku(); };

  /*
   * LUENNAN LUONNOLLINEN LOPPU — sama käsittely `ended`-tapahtumalle ja
   * pehmeaLopun lähettämälle LUENNAN_LOPPU_TAPAHTUMAlle (vain toinen
   * niistä tulee, ja irrotaKuuntelijat estää kaksoiskäsittelyn).
   *
   * AMMUTAAN TASAN YKSI. Vanha versio ampui ryöppynä kaikki ampumatta
   * jääneet (myös yhdeksän sekuntia vanhan) — loppuvara on tarkoitettu
   * viimeiselle, juuri ja juuri myöhästyneelle reaktiolle, joten
   * ehtona on ±LOPPUVARA_MS nykyhetkestä ja osumista otetaan viimeisin.
   *
   * KUUNTELIJAT IRTI ENSIN: luonnollista loppua seuraa aina soittimen
   * automaattinen `pause`, eikä se saa lähettää reactionEndiä kesken
   * jälkireaktion. reaktioKaynnissa-tilaa EI nollata — jos ele on
   * käynnissä, myöhempi purkukutsu (stopDiaryVoice, haivytaLuenta,
   * kaupungin vaihto) katkaisee sen kuten ennenkin.
   */
  const paatos = () => {
    if (!elossa) return;
    irrotaKuuntelijat();
    // Luenta on jo vaihtunut toisaalla: ele pois eikä mitään ammuta.
    if (!voimassa()) { paataReaktio(); ilmoitaKuollut(); return; }
    const t = nyt();
    for (let i = rivit.length - 1; i >= 0; i -= 1) {
      if (ammuttu[i]) continue;
      if (rivit[i].hetki < t - LOPPUVARA_MS || rivit[i].hetki > t + LOPPUVARA_MS) continue;
      ammu(i, true);
      break;
    }
    ilmoitaKuollut();
  };

  const tapahtumat = {
    playing: alkoi,
    timeupdate: reagoi,
    seeking: kelaus,
    seeked: kelaus,
    pause: tauko,
    waiting: tauko,
    stalled: tauko,
    error: virhe,
    ended: paatos,
    [LUENNAN_LOPPU_TAPAHTUMA]: paatos,
    emptied: () => sisainenPurku(),
  };

  /*
   * KAKSI ERI ASIAA, EI YHTÄ. "Kuuntelijat irti" tapahtuu kerran, kun
   * moottori lakkaa seuraamasta soitinta; "reactionEnd jos käynnissä"
   * tapahtuu aina, kun joku pyytää purkua. Luonnollisesti päättynyt
   * luenta on jo irrottanut kuuntelijansa, mutta sen jälkireaktio on
   * yhä päällä — ja sen katkaisu on nimenomaan purkukutsun tehtävä.
   */
  function irrotaKuuntelijat() {
    if (!elossa) return;
    elossa = false;
    for (const [nimi, f] of Object.entries(tapahtumat)) audio.removeEventListener(nimi, f);
  }

  /* Kutsujalle (js/luenta.js reaktiotValmis) kerrotaan kerran. */
  let kuollutIlmoitettu = false;
  function ilmoitaKuollut() {
    if (kuollutIlmoitettu) return;
    kuollutIlmoitettu = true;
    if (typeof kuollut === 'function') kuollut();
  }

  /* Moottorin oma purku: virhe, tyhjennys tai vanhentunut kytkentä. */
  function sisainenPurku() {
    if (!elossa) return;
    irrotaKuuntelijat();
    paataReaktio();
    ilmoitaKuollut();
  }

  /* Kutsujan purku: toimii myös luonnollisesti päättyneelle luennalle. */
  function purku() {
    irrotaKuuntelijat();
    paataReaktio();
  }

  for (const [nimi, f] of Object.entries(tapahtumat)) audio.addEventListener(nimi, f);
  /*
   * SOITIN SOI JO KYTKETTÄESSÄ (kilpailun korjaus, ks.
   * kytkeMatkakirjanReaktiot): uutta `playing`-tapahtumaa ei enää tule,
   * joten tila sovitetaan nykyhetkeen heti — ampumatta mitään, koska
   * latauksen aikana ohi menneet hetket on jo kuultu ilman reaktiota.
   */
  if (soiva) {
    const t = nyt();
    sovita(t);
    edellinen = t;
  }
  return purku;
}

/**
 * KYTKENTÄ MATKAKIRJALUENTAAN (js/luenta.js playDiaryVoice).
 *
 * Kaupunki tunnistetaan äänitteen nimestä, reaktiot ja odotettu teksti
 * luetaan pakista ja aikaleimat ämpäristä. Ilman reaktioita tai ilman
 * hyväksyttyjä aikaleimoja ei tehdä mitään — myöskään verkkopyyntöä ei
 * lähetetä, jos pakissa ei ole yhtään reaktiota.
 *
 * KYTKENNÄN KILPAILU (selainkoe 11.9.2026). Aikaleimojen lataus ja
 * äänisidonnan SHA-256 kestävät satoja millisekunteja; sinä aikana
 * soitin on jo lähettänyt `playing`-tapahtumansa. Moottori jäi siis
 * odottamaan `playing`iä, jota ei enää tullut, eikä ampunut yhtään
 * reaktiota (koe 1500 ms viiveellä: 0/6). Siksi soittimen tilaa
 * TARKKAILLAAN JO ENNEN AWAITIA kevyellä esikuuntelijalla, ja moottori
 * saa todennetun tilan mukaansa. Pelkkä `!audio.paused` ei kelpaisi:
 * puskuroiva soitin ei ole tauolla, mutta kello seisoo silti.
 *
 * @param {HTMLAudioElement} audio soiva luenta
 * @param {string} url äänitteen polku (assets/audio/…)
 * @param {{voimassa?:function():boolean, kuollut?:function():void}} [asetukset]
 * @returns {Promise<?function():void>} purku tai null
 */
export async function kytkeMatkakirjanReaktiot(audio, url, { voimassa = () => true, kuollut = null } = {}) {
  const kaupunki = kaupunkiOsoitteesta(url);
  if (!kaupunki) return null;
  const merkinta = FOKUSVIRRAT[kaupunki]?.matkakirja;
  const reaktiot = merkinta?.reaktiot;
  if (!Array.isArray(reaktiot) || !reaktiot.length) return null;

  /*
   * ESIKUUNTELIJA. Kirjaa vain viimeisimmän todellisen tilan — ei ammu
   * eikä muista historiaa. `kuollut` tarkoittaa, ettei tähän luentaan
   * kannata enää kytkeytyä lainkaan.
   */
  const tila = { soiva: false, kuollut: false };
  const esi = {
    playing: () => { tila.soiva = true; },
    pause: () => { tila.soiva = false; },
    waiting: () => { tila.soiva = false; },
    stalled: () => { tila.soiva = false; },
    error: () => { tila.soiva = false; },
    ended: () => { tila.soiva = false; tila.kuollut = true; },
    emptied: () => { tila.soiva = false; tila.kuollut = true; },
    // Luenta ehti loppua luonnollisesti jo latauksen aikana: sen
    // jälkireaktio olisi myöhässä koko äänitteen verran.
    [LUENNAN_LOPPU_TAPAHTUMA]: () => { tila.soiva = false; tila.kuollut = true; },
  };
  for (const [nimi, f] of Object.entries(esi)) audio.addEventListener?.(nimi, f);
  const irrotaEsi = () => {
    for (const [nimi, f] of Object.entries(esi)) audio.removeEventListener?.(nimi, f);
  };

  try {
    const aikaleimat = await lataaLuentareaktiot(kaupunki, url, { teksti: merkinta?.teksti });
    // Luenta on voinut vaihtua tai loppua latauksen aikana.
    if (!aikaleimat || !voimassa() || tila.kuollut || audio.ended) return null;
    const rivit = ratkaiseAnkkurit(reaktiot, aikaleimat);
    if (!rivit.length) return null;
    return kytkeLuentareaktiot(audio, rivit, {
      kaupunki, voimassa, soiva: tila.soiva, kuollut,
    });
  } finally {
    // Esikuuntelija irtoaa aina — myös null-paluussa ja virheessä.
    irrotaEsi();
  }
}
