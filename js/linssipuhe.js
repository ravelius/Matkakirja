/*
 * LINSSIN LUENTA — kertoja lukee jokaisen keksinnön ääneen.
 *
 * Omistajan tilaus 4.9.2026, sanatarkasti: *"Generoi selostajan
 * äänellä jokaiseen kohtaan vuosiluku, keksijän nimi ja keksintö, eli
 * se tulisi aina Keksinnön vaihtoessa lukijan äänellä."* Saman päivän
 * aamuna kertoja sai kaksi pidempää vuoroa: avausjakson esittelyn ja
 * merkkipaalun välinäytöksen (ks. KAAREN OMAT PUHEET alempana).
 *
 * Luenta on VALMIS ÄÄNITE, ei selaimen puhesyntetisaattori: sama
 * "Viisas Kertoja" kuin matkakirjaluennoissa (tools/
 * generoi-linssiluennat.mjs, ElevenLabs eleven_v3). Tiedostot asuvat
 * ämpärissä muotokuvien vieressä — ks. luennanRunko alla.
 *
 * ── RUNKOSÄÄNTÖ ON KYTKENTÄ ────────────────────────────────────────
 *
 * Tiedostonimi EI ole kutsujan muistin varassa: `luennanRunko(t)`
 * johtaa sen samasta datasta, josta työkalu johtaa kohdetiedoston.
 * Runko on MUOTOKUVAN RUNKO (`kuva.osoite`-tiedostonimi ilman
 * päätettä), koska se on jo valmiiksi yksikäsitteinen — vuosi ei ole:
 * kaaressa on kolme vuoden 1895 pysäkkiä (Marconi, Röntgen,
 * Lumière-veljekset). MERKKIPAALU (1873) on poikkeus: sen runko
 * ladotaan aina vuodesta ja otsikosta, myös silloin kun paalu saa oman
 * muotokuvan — muuten kuvan saapuminen nimeäisi jo generoidun luennan
 * uudelleen ja peli olisi siinä kohtaa hiljainen.
 *
 * KAAREN OMILLA PUHEILLA on omat runkonsa (`esittely`,
 * `valinaytos-<vuosi>`, ks. kaarenPuheet alempana): ne eivät ole
 * pysäkkejä vaan avausjakson ja välinäytöksen pidempiä tekstejä.
 *
 * Sama funktio ajetaan pelissä ja työkalussa. Jos nimi ja kenttä
 * eriytyisivät, ajo maksaisi tiedostosta, jota peli ei koskaan hae —
 * eikä mikään kaatuisi, koska puuttuva luenta on hiljainen.
 *
 * ── MIKSI OMA SOITIN EIKÄ playDiaryVoice ───────────────────────────
 *
 * Luennan koneisto (js/luenta.js) on sama — kertojan kytkin, puheen
 * voimakkuus ja taustan väistö tulevat sieltä samoina apureina —
 * mutta playDiaryVoice on kirjoitettu REPON assets/audio-polkuja
 * varten: se yrittää peilin pettäessä varareittiä ja kutsuu
 * peiliPetti('aanet'). Linssiluenta on suoraan ämpärissä eikä sillä
 * ole repokopiota, joten puuttuva tiedosto (404) kaataisi äänipeilin
 * katkaisijan koko istunnoksi. Puuttuva luenta saa olla hiljainen,
 * ei koko pelin äänien varareitti.
 *
 * ── TAUSTAN VÄISTÖ ─────────────────────────────────────────────────
 *
 * `merkitsePuhuja` (js/luenta.js) tekee kaiken: se nostaa
 * js/ambience-stream.js:n puhujalaskurin (puheAlkoi), jolloin
 * ambienssi väistyy — ja koska väistö menee myös ulkoisille
 * väistäjille, LINSSIN OMA RAITA hiljenee samalla
 * (js/siirtymamusiikki.js lajinVaisto: linssiryhmän raita seuraa
 * väistön POHJAKERROINTA, eli sivuuttaa vain oman hiljennyksensä,
 * ei puheen väistöä). Vapautus tulee 'ended'- ja 'error'-tapahtumista
 * kerran ja vain kerran; pysäytetty äänite ei laukaise kumpaakaan,
 * joten pysaytaLinssiluenta vapauttaa puhujan itse.
 */

import { puheVoima } from './aani-ehdokkaat.js';
import { luentaKytkinPaalla, merkitsePuhuja, vapautaPuhuja } from './luenta.js';
import { KEKSINTO_KUVAJUURI } from './linssit/keksinnot.js';

/**
 * Luentojen kansio ämpärissä: muotokuvien sisarkansio. Sama juuri kuin
 * kuvilla, jotta osoite muuttuu yhdestä paikasta (js/linssit/
 * keksinnot.js KEKSINTO_KUVAJUURI).
 */
export const LINSSILUENTA_JUURI = `${KEKSINTO_KUVAJUURI}/puhe`;

/**
 * Kilahduksen ja luennan väli. Keksinnön kilahdus (js/aikajana.js
 * keksinnonAani) soi ensin ja saa vaieta ennen kuin kertoja aloittaa —
 * päällekkäin ne kuulostaisivat kolinalta.
 */
export const LUENNAN_VIIVE_MS = 350;

/** Tunnus tekstistä: pienaakkoset, tarkkeet pois, väliviivat väleistä. */
function tunnukseksi(teksti) {
  return String(teksti ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Pysäkin luennan tiedostorunko ilman päätettä.
 *
 * PUHDAS FUNKTIO — sama sekä pelissä että generointityökalussa
 * (tools/generoi-linssiluennat.mjs). Palauttaa null, jos pysäkistä ei
 * saa yksikäsitteistä nimeä.
 */
export function luennanRunko(t) {
  /*
   * MERKKIPAALU EI OTA RUNKOAAN KUVASTA, vaikka sillä olisi sellainen.
   * Paalun kortille on tulossa isoisän oma studiomuotokuva
   * (js/linssit/keksinnot.js), eikä se saa nimetä jo generoitua
   * luentaa uudelleen: paalun runko on aina vuosi ja otsikko.
   */
  if (!t?.paalu) {
    const osoite = t?.kuva?.osoite;
    if (typeof osoite === 'string' && osoite) {
      const nimi = osoite.split(/[?#]/)[0].split('/').pop() ?? '';
      const runko = nimi.replace(/\.[a-z0-9]+$/i, '');
      if (runko) return runko;
    }
  }
  // Kuvaton pysäkki (merkkipaalu): vuosi ja otsikko.
  if (!Number.isFinite(t?.vuosi) || !t?.otsikko) return null;
  const hanta = tunnukseksi(t.otsikko);
  return hanta ? `${t.vuosi}-${hanta}` : null;
}

/*
 * ── KAAREN OMAT PUHEET ─────────────────────────────────────────────
 *
 * Pysäkkiluentojen lisäksi kaarella on kaksi omaa puhetta, ja
 * kummankin teksti on DATASSA eikä koodissa:
 *
 *   ESITTELY     avausjakson laatikon selite (linssin
 *                `aikajana.esittely.teksti`), luetaan kun musta ruutu
 *                on noussut ja laatikko on esillä — Käynnistä-nappi
 *                katkaisee sen (js/aikajana.js avaaAvausjakso).
 *   VÄLINÄYTÖS   merkkipaalun pidempi kertojanteksti
 *                (`tapahtuma.valinaytos.kertoja`), luetaan kun kello
 *                pysähtyy paaluun ja laatikko nousee kartan keskelle.
 *
 * SAMA RUNKOSÄÄNTÖ KUIN PYSÄKEILLÄ: nimi johdetaan datasta, jotta peli
 * ja generointityökalu (tools/generoi-linssiluennat.mjs) osuvat samaan
 * tiedostoon ilman erillistä nimilistaa.
 */

/** Avausjakson esittelyn runko: kaarella on niitä yksi. */
export const ESITTELYN_RUNKO = 'esittely';

/** Välinäytöksen runko, esim. `valinaytos-1873`. Null ilman välinäytöstä. */
export function valinaytoksenRunko(t) {
  if (!t?.valinaytos?.kertoja || !Number.isFinite(t?.vuosi)) return null;
  return `valinaytos-${t.vuosi}`;
}

/**
 * KAAREN OMAT PUHEET yhtenä listana: sama funktio pelissä ja
 * työkalussa. `avain` on komentorivin valitsin (--pysakit esittely).
 *
 * @param {object} kaari linssin `aikajana`-lohko
 * @returns {Array<{avain:string, runko:string, nimi:string, teksti:string}>}
 */
export function kaarenPuheet(kaari) {
  const puheet = [];
  const esittely = String(kaari?.esittely?.teksti ?? '').trim();
  if (esittely) {
    puheet.push({
      avain: 'esittely', runko: ESITTELYN_RUNKO, nimi: `${ESITTELYN_RUNKO}.mp3`, teksti: esittely,
    });
  }
  for (const t of kaari?.tapahtumat ?? []) {
    const runko = valinaytoksenRunko(t);
    const teksti = String(t?.valinaytos?.kertoja ?? '').trim();
    if (runko && teksti) {
      puheet.push({
        avain: 'valinaytos', runko, nimi: `${runko}.mp3`, teksti,
      });
    }
  }
  return puheet;
}

/** Kaaren puheiden valitsimet komentorivillä (--pysakit esittely). */
export const KAAREN_AVAIMET = ['esittely', 'valinaytos'];

/** Pysäkin luennan tiedostonimi ämpärissä. */
export function luennanTiedosto(t) {
  const runko = luennanRunko(t);
  return runko ? `${runko}.mp3` : null;
}

/**
 * Pysäkin luennan koko osoite ämpärissä.
 *
 * `juuri` on KAAREN oma luentakansio: keksinnöillä muotokuvien
 * sisarkansio (oletus), uudella aikajanalinssillä sen oma kansio
 * (linssin `aikajana.luentajuuri`). Ilman tätä toisen kaaren ajo
 * soittaisi keksintöjen luennat.
 */
export function luennanOsoite(t, juuri = LINSSILUENTA_JUURI) {
  const nimi = luennanTiedosto(t);
  return nimi ? `${juuri}/${nimi}` : null;
}

/** Luennan osat siinä järjestyksessä kuin ne luetaan. */
function luennanOsat(t) {
  if (!t) return [];
  // Merkkipaalulla ei ole keksijää — `henkilo` on siinä tapahtuman
  // kuvaus ('Isoisä lähtee matkaan'), ei nimi, eikä sitä lueta.
  const osat = t.paalu
    ? [t.vuosi, t.otsikko, t.alaotsikko]
    : [t.vuosi, t.henkilo, t.otsikko];
  return osat
    .map((osa) => String(osa ?? '').trim().replace(/[.\s]+$/, ''))
    .filter(Boolean);
}

/**
 * Luettava teksti: "<vuosi>. <henkilö>. <keksintö>."
 * Esimerkiksi "1769. James Watt. Höyrykoneen lauhdutin."
 */
export function luennanTeksti(t) {
  const osat = luennanOsat(t);
  return osat.length ? `${osat.join('. ')}.` : null;
}

/** Tauko pisteiden kohdalla (eleven_v3 tukee break-tagia). */
export const LUENNAN_TAUKO = '<break time="0.4s" />';

/*
 * VUOSILUKU SANOINA MALLILLE (omistajan havainto 4.9.2026: *"Lukija
 * muuten lukee väärin ainakin 1700-luvun vuosiluvut. Jostain sanoi
 * 1900 jotain."*). Numeroina annettu vuosi jää mallin arvattavaksi;
 * sanoina se ei voi mennä väärin. Näytöllä vuosi on yhä numeroina —
 * tämä koskee vain puhetekstiä (luennanPuhe, puheeksi).
 */
const YKSIKOT = ['', 'yksi', 'kaksi', 'kolme', 'neljä', 'viisi', 'kuusi', 'seitsemän', 'kahdeksan', 'yhdeksän'];

/** 1000–2999 suomeksi yhteen kirjoitettuna: 1769 → tuhatseitsemänsataakuusikymmentäyhdeksän. */
export function vuosiSanoina(vuosi) {
  const v = Number(vuosi);
  if (!Number.isInteger(v) || v < 1000 || v > 2999) return String(vuosi);
  const tuhannet = Math.floor(v / 1000);
  const sadat = Math.floor((v % 1000) / 100);
  const kymmenet = Math.floor((v % 100) / 10);
  const ykkoset = v % 10;
  let sanat = tuhannet === 1 ? 'tuhat' : `${YKSIKOT[tuhannet]}tuhatta`;
  if (sadat) sanat += sadat === 1 ? 'sata' : `${YKSIKOT[sadat]}sataa`;
  if (kymmenet === 1) sanat += ykkoset ? `${YKSIKOT[ykkoset]}toista` : 'kymmenen';
  else {
    if (kymmenet) sanat += `${YKSIKOT[kymmenet]}kymmentä`;
    if (ykkoset) sanat += YKSIKOT[ykkoset];
  }
  return sanat;
}

/** Vaihtaa tekstin nelinumeroiset vuosiluvut sanoiksi (välit ja ajatusviivat säilyvät). */
export function puheeksi(teksti) {
  return String(teksti ?? '').replace(/\b(1\d{3}|2\d{3})\b/g, (m) => vuosiSanoina(m));
}

/**
 * Sama teksti mallille lähetettävässä muodossa: pieni tauko jokaisen
 * pisteen kohdalle, jottei vuosi, nimi ja keksintö sula yhdeksi
 * pötköksi.
 */
export function luennanPuhe(t) {
  const osat = luennanOsat(t);
  if (!osat.length) return null;
  // Vuosi sanoina, muu sellaisenaan (ks. vuosiSanoina).
  const puhuttavat = osat.map((osa, k) => (k === 0 ? vuosiSanoina(osa) : osa));
  return `${puhuttavat.join(`. ${LUENNAN_TAUKO} `)}.`;
}

/**
 * Pysäyttää käynnissä olevan (tai vasta alkavan) linssiluennan ja
 * vapauttaa taustan väistön. Turvallista kutsua monta kertaa.
 */
export function pysaytaLinssiluenta(ui) {
  if (!ui) return false;
  if (ui.linssiluentaAjastin) {
    clearTimeout(ui.linssiluentaAjastin);
    ui.linssiluentaAjastin = null;
  }
  const audio = ui.linssiluenta;
  ui.linssiluenta = null;
  if (!audio) return false;
  try {
    audio.pause();
    audio.removeAttribute('src');
  } catch {
    /* soitin oli jo purettu */
  }
  // Pysäytetty äänite ei laukaise 'ended'- eikä 'error'-tapahtumaa,
  // joten puhujan rooli on vapautettava käsin — muuten tausta ja
  // linssin raita jäisivät pysyvästi väistöön.
  ui.luennat?.delete(audio);
  vapautaPuhuja(ui, audio);
  return true;
}

/**
 * Soittaa pysäkin luennan kertojan äänellä. Kutsutaan VAIN elävästä
 * syttymisestä (js/aikajana.js sytyta) — pysäytetyn kellon selailu
 * (siirry) ei lue ääneen, koska pelaaja selaa silloin itse.
 *
 * Puuttuva tiedosto on hiljainen: luenta voi puuttua kokonaiselta
 * kaarelta, eikä se ole virhe vaan tila.
 *
 * `runko` ohittaa pysäkin oman nimen: kaaren omat puheet (esittely,
 * välinäytös) soitetaan samalla soittimella samasta kansiosta, ja vain
 * tiedostonimi tulee muualta (ks. kaarenPuheet).
 *
 * @returns {HTMLAudioElement|null} soittimen kahva, tai null jos
 *   luentaa ei aloitettu
 */
export function soitaLinssiluenta(ui, t, {
  viive = LUENNAN_VIIVE_MS, runko = null, juuri = LINSSILUENTA_JUURI,
} = {}) {
  pysaytaLinssiluenta(ui);
  if (!ui || (!t && !runko) || typeof Audio === 'undefined') return null;
  // Kertojan kytkin on yksi ja sama koko pelissä (js/luenta.js).
  if (!luentaKytkinPaalla()) return null;
  // Radiotilassa ei kaksi ääntä päällekkäin — sama ehto kuin
  // matkakirjaluennalla.
  if (ui.radioModuuli && !ui.radioModuuli.luentaSallittu()) return null;
  const url = runko ? `${juuri}/${runko}.mp3` : luennanOsoite(t, juuri);
  if (!url) return null;

  const audio = new Audio(url);
  audio.preload = 'auto';
  audio.volume = puheVoima();
  ui.linssiluenta = audio;
  // Kirjanpito kaikkiin luentoihin: taustalle menevä peli hiljentää
  // myös tämän (js/luenta.js taustaHiljennaLuennat).
  (ui.luennat ??= new Set()).add(audio);
  // Tausta ja linssin oma raita väistyvät puheen ajaksi. Merkintä
  // ennen soittoa, jotta se pariutuu vapautuksen kanssa myös silloin
  // kun soitto ei koskaan käynnisty.
  merkitsePuhuja(ui, audio);
  const vapaaksi = () => {
    ui.luennat?.delete(audio);
    if (ui.linssiluenta === audio) ui.linssiluenta = null;
  };
  audio.addEventListener('ended', vapaaksi);
  audio.addEventListener('error', vapaaksi);

  const aloita = () => {
    ui.linssiluentaAjastin = null;
    if (ui.linssiluenta !== audio) return;
    audio.play().then(() => {
      // play() on asynkroninen: jos luenta ehti vaihtua, myöhässä
      // herännyt ääni pysäytetään heti.
      if (ui.linssiluenta !== audio) audio.pause();
    }).catch(() => {
      /*
       * Puuttuva tiedosto tai eleeseen sitomaton soitto: hiljaisuus,
       * ei virhettä. Käynnistymätön ääni ei laukaise omia
       * tapahtumiaan, joten 'error' lähetetään käsin — muuten
       * puhujan rooli ja taustan väistö jäisivät päälle.
       */
      audio.dispatchEvent(new Event('error'));
    });
  };
  if (viive > 0) ui.linssiluentaAjastin = setTimeout(aloita, viive);
  else aloita();
  return audio;
}
