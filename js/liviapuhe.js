/*
 * LIVIAN ÄÄNI — pulu puhuu kuplansa ääneen.
 *
 * Omistajan tilaus 6.9.2026 aamupäivä, sanatarkasti: *"Pululle täytyy
 * etsiä eleveniltä oma ääni joka vähän käheä ja nopea puhumaan.
 * Generoidaan kaikki valmiiksi kirjoitetut repliikit puheeksi."* ja
 * *"Tehdään pulusta hyvin vokaalinen ja elävä vastakohta kertojan
 * monotoonisuuteen."*
 *
 * Kertoja (Viisas Kertoja, js/luenta.js ja js/linssipuhe.js) lukee
 * isoisän tekstit tasaisella äänellä. Livia on sen vastakohta: oma
 * käheä ääni, nopea tempo ja runsaat elävöitystagit. Äänitteet
 * generoidaan tools/generoi-pulu.mjs -työkalulla ja ne asuvat
 * ämpärissä (LIVIAN_AANIJUURI) — repossa niitä ei ole.
 *
 * ── TIEDOSTONIMI ON KYTKENTÄ ───────────────────────────────────────
 *
 * Nimi EI ole kutsujan muistin varassa vaan johdetaan lähteestä ja
 * järjestysnumerosta (livianAaniNimi) — samalla funktiolla pelissä ja
 * generointityökalussa, tasan kuten linssiluennoilla (js/
 * linssipuhe.js luennanRunko). Jos nimet eriytyisivät, ajo maksaisi
 * tiedostosta, jota peli ei koskaan hae, eikä mikään kaatuisi:
 * puuttuva luenta on hiljainen.
 *
 * Lähteitä on kaksi lajia. Kolme ensimmäistä ovat js/livia.js:n
 * repliikkiryhmiä:
 *   avaus          LIVIAN_AVAUS, viisi kuplaa aloitusvalinnassa
 *   paljastus      livianPaljastus(), kaksi kuplaa ensisaapumisessa
 *   mannerivihje   MANNERIVIHJE, yksi kupla
 *
 * ── KAUPUNKIKOHTAISET LÄHTEET (Ateena ja Sofia ensin) ──────────────
 *
 * Raamattu, PULUN ÄÄNI VAIN ATEENA JA SOFIA ENSIN: pulun puhe soi
 * aluksi vain kahdessa kaupungissa, jotta ääni ehditään kuunnella ja
 * hyväksyä ennen kuin koko pelin repliikistö ajetaan läpi. Lähteen
 * nimi on KAUPUNGIN TUNNUS (city.id) ja indeksi tulee kenttien
 * järjestyksestä (LIVIAN_KAUPUNKILAHTEET) — ei siis kutsupaikan
 * muistista. Tekstit asuvat pakkauksissa (js/packs/fokusvirta-
 * ateena.js, js/packs/fokusvirta-sofia.js) eikä niitä kopioida
 * tänne: peli ja työkalu lukevat saman kentän.
 *
 * Muut kaupungit ovat hiljaisia täsmälleen kuten ennen — tuntematon
 * lähde ei saa nimeä (livianAaniNimi palauttaa null).
 *
 * ── KAIKU SAAPUMISREPLIIKEISSÄ ─────────────────────────────────────
 *
 * Omistaja 6.9.2026, sanatarkasti: *"Voidaan käyttää myös pulun
 * ääneen efektejä (kaiku alussa kun tulee ja aloittaa jo huutelemaan
 * viestiä ennenkuin on edes ehtinyt kokonaan perille). Kaiku voidaan
 * sitten feidata pois kun pulu 'perillä' ja nostaa äänitasoa
 * hieman."*
 *
 * Kaiku on LEIVOTTU ÄÄNITTEESEEN (ffmpeg, tools/generoi-pulu.mjs),
 * ei tehty pelissä Web Audiolla. Kaksi syytä: (1) pelin kuplaäänet
 * soitetaan tavallisella <audio>-elementillä, joten Web Audio -kaiku
 * vaatisi koko soittotien vaihtamisen AudioContextiin vain kahden
 * repliikin takia; (2) leivottu versio kuullaan ja hyväksytään
 * kerran ajossa, eikä se voi kuulostaa eri laitteilla eri tavalta.
 * Kaikuversiolla on oma tiedostonsa (`-kaiku`), joten kuiva versio
 * jää talteen vertailua varten.
 *
 * SAAPUMISREPLIIKKI on se kupla, jossa Livia tulee paikalle: avauksen
 * ensimmäinen (hän lennähtää mukaan, js/livia.js naytaRepliikki
 * lennahda) ja paljastuksen ensimmäinen ("Kaak. Sähke pöllöltä." —
 * hän saapuu sähkeen kanssa). Muut repliikit sanotaan perillä
 * normaalilla tasolla.
 *
 * KAUPUNKIREPLIIKEISTÄ VAIN YKSI SAAPUU: Sofian `paluu`. Se on ainoa
 * kohta, jossa Livia oikeasti LENTÄÄ TAKAISIN — hän on käynyt pöllön
 * luona (`odotus`: *"Livia on matkalla"*) ja aloittaa raporttinsa
 * *"Perillä oltiin"* jo ilmasta. Kaiku kertoo saman kuin avauksessa ja
 * paljastuksessa: puhe alkaa kaukaa ja laskeutuu ruutuun. Maadoitus,
 * johdanto, vinkki, linkkiSaate, oikein ja odotus sanotaan kaikki
 * pelaajan vieressä — pulu on jo paikalla, eikä kaiulla olisi mitään
 * kerrottavaa. Se olisi pelkkä efekti efektin vuoksi.
 *
 * ── LUENTA SEURAA KUPLIA ───────────────────────────────────────────
 *
 * Omistaja 6.9.2026: *"Kaiuttimen kuvake kuplassa ei ole tarpeen;
 * luenta seuraa kuplia."* Kuplien rytmi (js/livia.js lukuaika) ohjaa
 * siis ääntä eikä toisin päin: kun seuraava kupla tulee, edellinen
 * äänite häivytetään pois. Siksi repliikkien PITUUS on äänitteen
 * pituus — liian pitkä repliikki katkeaa kesken (ks. lyhennysehdotukset
 * raportissa ja tools/generoi-pulu.mjs:n kuivassa ajossa, joka
 * tulostaa jokaisen repliikin arvioidun keston).
 *
 * Kytkin on sama kuin kertojalla (js/luenta.js luentaKytkinPaalla):
 * mykistetty peli on mykistetty myös pulun osalta. Puuttuva tiedosto
 * on hiljainen — kupla toimii ilman ääntä täsmälleen kuten ennen.
 */

import { puheVoima } from './aani-ehdokkaat.js';
import { luentaKytkinPaalla, merkitsePuhuja, vapautaPuhuja } from './luenta.js';
import { AANI_JUURI } from './media.js';

/**
 * Livian äänitteiden kansio ämpärissä.
 *
 * Sama polku kirjoitetaan tools/generoi-pulu.mjs:n vientiin; peli
 * hakee tasan sen, joten äänet kuuluvat heti ajon jälkeen ilman
 * julkaisua (kuten linssiluennat).
 */
export const LIVIAN_AANIJUURI = `${AANI_JUURI}aanet/pulu/`;

/**
 * KAUPUNKIKOHTAISET LÄHTEET: kaupungin tunnus → äänitetyt kentät
 * siinä järjestyksessä, jossa ne saavat tiedostonumeronsa.
 *
 * Kenttien nimet ovat pakkausten omia (js/packs/fokusvirta-<id>.js):
 * `maadoitus` on `pollo.maadoitus` ja loput sähketehtävän vaiheita
 * (`sahketehtava.johdanto` jne., js/fokusvirta.js). Järjestystä EI saa
 * muuttaa jälkikäteen — numero on tiedostonimessä, ja uudelleen
 * numerointi tarkoittaisi koko kaupungin uudelleengenerointia. Uusi
 * kenttä lisätään listan LOPPUUN.
 *
 * Raamattu (PULUN ÄÄNI VAIN ATEENA JA SOFIA ENSIN): muita kaupunkeja
 * ei lisätä tähän ennen kuin ääni on kuunneltu ja hyväksytty.
 */
export const LIVIAN_KAUPUNKILAHTEET = {
  ateena: ['maadoitus'],
  sofia: ['maadoitus', 'johdanto', 'vinkki', 'linkkiSaate', 'oikein', 'odotus', 'paluu'],
};

/** Repliikkilähteet siinä nimeämisjärjestyksessä, jota työkalu käyttää. */
export const LIVIAN_AANILAHTEET = [
  'avaus', 'paljastus', 'mannerivihje',
  ...Object.keys(LIVIAN_KAUPUNKILAHTEET),
];

/**
 * Saapumisrepliikit lähteittäin: indeksit, joissa Livia tulee paikalle
 * ja saa kaikuversion (ks. KAIKU SAAPUMISREPLIIKEISSÄ yllä).
 *
 * Sofian `paluu` haetaan kenttälistasta eikä kirjoiteta numerona:
 * numero on nimeämisen tulos, ei erikseen ylläpidettävä vakio.
 */
export const LIVIAN_SAAPUMISREPLIIKIT = {
  avaus: [0],
  paljastus: [0],
  sofia: [LIVIAN_KAUPUNKILAHTEET.sofia.indexOf('paluu')],
};

/**
 * Kaupunkirepliikin järjestysnumero kentän nimestä.
 *
 * Tämä on se kohta, jossa kutsupaikka sanoo "Sofian vinkki" eikä
 * "lähde sofia, indeksi 2": kutsupaikan ei kuulu tietää numeroita.
 *
 * @param {string} kaupunkiId kaupungin tunnus (city.id)
 * @param {string} kentta pakkauksen kentän nimi
 * @returns {number|null} indeksi tai null, jos kaupunkia tai kenttää
 *   ei ole äänitetty.
 */
export function livianKaupunkiIndeksi(kaupunkiId, kentta) {
  const kentat = LIVIAN_KAUPUNKILAHTEET[kaupunkiId] ?? [];
  const indeksi = kentat.indexOf(kentta);
  return indeksi < 0 ? null : indeksi;
}

/** Onko tälle kaupungin repliikille olemassa äänite? */
export function livianKaupunkiAanitetty(kaupunkiId, kentta) {
  return livianKaupunkiIndeksi(kaupunkiId, kentta) !== null;
}

/**
 * ÄÄNITETTY PALJASTUSVARIANTTI. Paljastuksen teksti ladotaan maasta ja
 * kaupungista (js/livia.js livianPaljastus), joten äänite on olemassa
 * vain sille variantille, joka on generoitu. Aloitusreitti on
 * kaanonissa Ateena ("Ateenasta se alkaa", LIVIAN_AVAUS), ja
 * paljastus tulee vain ENSIMMÄISELLÄ saapumisella koskaan — muualla
 * kupla toimii ilman ääntä.
 *
 * Jos aloitusreittejä tulee lisää, tähän lisätään variantit ja
 * työkalu generoi niille omat tiedostonsa (nimeen tulee maan tunnus).
 */
export const LIVIAN_AANITETTY_PALJASTUS = { maahan: 'Kreikkaan', paikassa: 'Ateenassa' };

/** Häivytys, kun seuraava kupla katkaisee edellisen repliikin. */
export const LIVIAN_HAIVYTYS_MS = 160;

/** Onko tämä repliikki se, jossa Livia saapuu (kaikuversio)? */
export function livianSaapumisrepliikki(lahde, indeksi) {
  return (LIVIAN_SAAPUMISREPLIIKIT[lahde] ?? []).includes(indeksi);
}

/**
 * Repliikin tiedostonimi ämpärissä.
 *
 * PUHDAS FUNKTIO — sama pelissä ja työkalussa. `kaiku` valitsee
 * saapumisversion; ilman lippua nimi on kuiva perusversio.
 * Palauttaa null, jos lähde tai indeksi ei kelpaa.
 */
export function livianAaniNimi(lahde, indeksi, { kaiku = false } = {}) {
  if (!LIVIAN_AANILAHTEET.includes(lahde)) return null;
  if (!Number.isInteger(indeksi) || indeksi < 0) return null;
  return `livia-${lahde}-${indeksi + 1}${kaiku ? '-kaiku' : ''}.mp3`;
}

/**
 * Se tiedosto, jonka PELI soittaa: saapumisrepliikissä kaikuversio,
 * muualla kuiva. Null, jos repliikkiä ei ole olemassa.
 */
export function livianSoitettava(lahde, indeksi) {
  return livianAaniNimi(lahde, indeksi, { kaiku: livianSaapumisrepliikki(lahde, indeksi) });
}

/** Repliikin koko osoite ämpärissä. */
export function livianAaniOsoite(lahde, indeksi, juuri = LIVIAN_AANIJUURI) {
  const nimi = livianSoitettava(lahde, indeksi);
  return nimi ? `${juuri}${nimi}` : null;
}

/**
 * KAIKKI ÄÄNITETTÄVÄT REPLIIKIT yhtenä listana — työkalun syöte ja
 * manifestin runko.
 *
 * Tekstit tulevat kutsujalta (js/livia.js on kaanonin omistaja), nimet
 * tästä moduulista: näin peli ja työkalu eivät voi eriytyä.
 *
 * @param {object} lahteet { avaus: string[], paljastus: string[],
 *   mannerivihje: string[] }
 * @returns {Array<{avain:string, lahde:string, indeksi:number,
 *   teksti:string, nimi:string, kaikuNimi:string|null, saapuu:boolean,
 *   merkit:number}>}
 */
export function livianAanitykset(lahteet = {}) {
  const rivit = [];
  for (const lahde of LIVIAN_AANILAHTEET) {
    const tekstit = Array.isArray(lahteet[lahde]) ? lahteet[lahde] : [];
    tekstit.forEach((raaka, indeksi) => {
      const teksti = String(raaka ?? '').trim();
      if (!teksti) return;
      const saapuu = livianSaapumisrepliikki(lahde, indeksi);
      rivit.push({
        avain: `${lahde}-${indeksi + 1}`,
        lahde,
        indeksi,
        teksti,
        merkit: teksti.length,
        nimi: livianAaniNimi(lahde, indeksi),
        kaikuNimi: saapuu ? livianAaniNimi(lahde, indeksi, { kaiku: true }) : null,
        saapuu,
      });
    });
  }
  return rivit;
}

/**
 * Pysäyttää soivan repliikin ja vapauttaa taustan väistön.
 *
 * Häivytys on lyhyt tarkoituksella: kupla vaihtuu, ja kova katkaisu
 * kesken sanan kuulostaisi virheeltä. Turvallista kutsua monta kertaa.
 */
export function pysaytaLivianAani(ui, { haivyta = true } = {}) {
  if (!ui) return false;
  if (ui.liviaAaniAjastin) {
    clearInterval(ui.liviaAaniAjastin);
    ui.liviaAaniAjastin = null;
  }
  const audio = ui.liviaAani;
  ui.liviaAani = null;
  if (!audio) return false;
  const lopeta = () => {
    try {
      audio.pause();
      audio.removeAttribute('src');
    } catch {
      /* soitin oli jo purettu */
    }
    // Pysäytetty äänite ei laukaise 'ended'- eikä 'error'-tapahtumaa,
    // joten puhujan rooli vapautetaan käsin (sama sopimus kuin
    // js/linssipuhe.js pysaytaLinssiluenta).
    ui.luennat?.delete(audio);
    vapautaPuhuja(ui, audio);
  };
  if (!haivyta || !(audio.volume > 0)) {
    lopeta();
    return true;
  }
  const askel = audio.volume / 4;
  const kello = setInterval(() => {
    const jaljella = audio.volume - askel;
    if (jaljella > 0.01) {
      audio.volume = jaljella;
      return;
    }
    clearInterval(kello);
    lopeta();
  }, LIVIAN_HAIVYTYS_MS / 4);
  return true;
}

/**
 * Soittaa yhden Livian repliikin. Kutsutaan kuplan ilmestyessä
 * (js/livia.js) — kupla on aina ensin, ääni seuraa sitä.
 *
 * Edellinen repliikki häivytetään pois: kaksi Livian ääntä
 * päällekkäin olisi pahempi kuin katkennut lause.
 *
 * @param {object} ui pelin käyttöliittymä
 * @param {string} lahde 'avaus' | 'paljastus' | 'mannerivihje' tai
 *   kaupungin tunnus (LIVIAN_KAUPUNKILAHTEET)
 * @param {number} indeksi repliikin järjestysnumero lähteessä (0-alkuinen)
 * @param {object} [asetukset]
 * @param {string} [asetukset.maahan] paljastuksen maa-muoto (ks.
 *   LIVIAN_AANITETTY_PALJASTUS): muu kuin äänitetty variantti jää
 *   hiljaiseksi.
 * @param {string} [asetukset.paikassa] paljastuksen paikka-muoto
 * @returns {HTMLAudioElement|null} soittimen kahva tai null
 */
export function soitaLivianAani(ui, lahde, indeksi, { maahan = '', paikassa = '' } = {}) {
  pysaytaLivianAani(ui);
  if (!ui || ui.dead || typeof Audio === 'undefined') return null;
  // Sama kytkin kuin kertojalla: mykistetty peli on mykistetty myös
  // pulun osalta.
  if (!luentaKytkinPaalla()) return null;
  // Radiotilassa ei kaksi ääntä päällekkäin (sama ehto kuin
  // matkakirja- ja linssiluennalla).
  if (ui.radioModuuli && !ui.radioModuuli.luentaSallittu()) return null;
  if (lahde === 'paljastus'
    && (maahan !== LIVIAN_AANITETTY_PALJASTUS.maahan
      || paikassa !== LIVIAN_AANITETTY_PALJASTUS.paikassa)) {
    // Muu maa kuin äänitetty: kupla puhuu, äänite vaikenee.
    return null;
  }
  const url = livianAaniOsoite(lahde, indeksi);
  if (!url) return null;

  const audio = new Audio(url);
  audio.preload = 'auto';
  audio.volume = puheVoima();
  ui.liviaAani = audio;
  // Kirjanpito kaikkiin luentoihin: taustalle menevä peli hiljentää
  // myös tämän (js/luenta.js taustaHiljennaLuennat).
  (ui.luennat ??= new Set()).add(audio);
  // Tausta väistyy puheen ajaksi. Merkintä ennen soittoa, jotta se
  // pariutuu vapautuksen kanssa myös silloin kun soitto ei käynnisty.
  merkitsePuhuja(ui, audio);
  const vapaaksi = () => {
    ui.luennat?.delete(audio);
    if (ui.liviaAani === audio) ui.liviaAani = null;
  };
  audio.addEventListener('ended', vapaaksi);
  audio.addEventListener('error', vapaaksi);
  audio.play().then(() => {
    // play() on asynkroninen: jos repliikki ehti vaihtua, myöhässä
    // herännyt ääni pysäytetään heti.
    if (ui.liviaAani !== audio) audio.pause();
  }).catch(() => {
    /*
     * Puuttuva tiedosto tai eleeseen sitomaton soitto: hiljaisuus, ei
     * virhettä — eikä peiliPetti-kutsua (js/linssipuhe.js:n oppi:
     * puuttuva puhe ei saa katkaista koko pelin äänipeiliä).
     */
    audio.dispatchEvent(new Event('error'));
  });
  return audio;
}

/**
 * KAUPUNKIREPLIIKIN ÄÄNI KENTÄN NIMELLÄ (js/fokusvirta.js).
 *
 * Kutsupaikka sanoo kaupungin ja kentän — "sofia, paluu" — eikä
 * numeroa: numeron omistaa LIVIAN_KAUPUNKILAHTEET. Kaupunki, jota ei
 * ole äänitetty, on hiljainen ilman että kutsupaikan tarvitsee tietää
 * siitä mitään (Raamattu: PULUN ÄÄNI VAIN ATEENA JA SOFIA ENSIN).
 *
 * @param {object} ui pelin käyttöliittymä
 * @param {string} kaupunkiId kaupungin tunnus (city.id)
 * @param {string} kentta pakkauksen kentän nimi
 * @returns {HTMLAudioElement|null} soittimen kahva tai null
 */
export function soitaLivianKaupunkiAani(ui, kaupunkiId, kentta) {
  const indeksi = livianKaupunkiIndeksi(kaupunkiId, kentta);
  if (indeksi === null) return null;
  return soitaLivianAani(ui, kaupunkiId, indeksi);
}
