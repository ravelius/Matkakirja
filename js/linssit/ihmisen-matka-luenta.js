/*
 * IHMISEN MATKA — KERTOJAN LUENTA (yksi tiedosto tai jakso kerrallaan).
 *
 * Raamattu "IHMISEN MATKA: ETELA-AFRIKKA VAIN KERRAN, SELKEAT LAUSEET,
 * YKSI YHTENAINEN LUENTA" (omistaja 8.9.2026, sanatarkasti: *"nyt
 * jokainen kohtaus on generoitu erillisenä kohtana, niin kertojan
 * äänensävy hyppii liikaa"* ja *"muista generoida teksti yhtenä
 * pätkänä, jossa on luonnolliset lauseet ja kappaleet. mukautetaan
 * visuaalisuus sen mukaan."*).
 *
 * KAKSI TILAA, SAMA RAJAPINTA. Esityksen ohjaaja
 * (js/linssit/ihmisen-matka-esitys.js) kutsuu tästä vain `aloita`-
 * funktiota eikä tiedä kumpi tila on käytössä:
 *
 *   1. YKSI TIEDOSTO (manifesti sanoo `yhtena: true`). Koko kertomus on
 *      yhtenä äänitteenä ämpärissä (`tiedosto`), ja jokainen jakso
 *      soitetaan sen omalta väliltä: soitin kelataan jakson `alku`-
 *      kohtaan ja pysäytetään `loppu`-kohtaan. Kertojan sävy ei hyppää,
 *      koska koko luenta on generoitu yhtenä pyyntönä. Manifesti kertoo
 *      myös, millä mallilla ääni syntyi (`malli`, oletus eleven_v3
 *      tageineen) ja mistä aikaleimat tulivat (`aikaleimalahde`:
 *      'forced-alignment' tai varareitti 'with-timestamps') — peli ei
 *      tarvitse niitä, mutta ne kertovat lukijalle, mitä ämpärissä on.
 *   2. JAKSO KERRALLAAN (ei manifestia tai `yhtena: false`). Entinen
 *      käytös: oma mp3 per jakso, nimi js/linssipuhe.js
 *      kertomuksenRungosta. Tämä on yhä voimassa, jottei vanha ämpärin
 *      sisältö lakkaa toimimasta.
 *
 * AIKALEIMAT ESITYKSELLE. Manifestin jaksorivillä ovat lauseiden ja
 * sanojen alkuhetket (ms tiedoston alusta). Tämä moduuli antaa ne
 * jaksolle SUHTEESSA JAKSON ALKUUN kenttään
 *
 *   jakso.aikaleimat = { lauseet: [ms…], sanat: [{ sana, alku }…] }
 *
 * jotta avausta ja tekstin rytmitystä rakentava koodi voi lukea ne
 * suoraan (0 = jakson ensimmäinen ääni). Ilman aikaleimoja kenttää ei
 * ole lainkaan — lukija käyttää `jakso.aikaleimat?.lauseet`-muotoa.
 *
 * TAUKO JAKSOJEN VÄLIIN TEHDÄÄN PELISSÄ, EI TEKSTIIN (omistaja
 * 8.9.2026). Luettava teksti on yhtä luonnollista proosaa; jos jaksojen
 * väliin halutaan hengähdys, se syntyy siitä, että jakson kesto on
 * luennan mitta ja pulun välihuomiolle jää oma häntänsä (esityksen
 * PULUN_VARA_MS).
 */

import { kertomuksenRunko, soitaLinssiluenta } from '../linssipuhe.js';

/** Manifestin tiedostonimi kaaren puhekansiossa (sama kuin työkalulla). */
export const KERTOMUS_MANIFESTI = 'kertomus-manifesti.json';

/**
 * Soittimen loppuvahti tarkistaa lopun myös ajastimella: `timeupdate`
 * saapuu selaimissa noin neljästi sekunnissa, ja pelkän sen varassa
 * jakso vuotaisi seuraavan puolelle neljänneksen sekunnin.
 */
export const LOPUN_TARKKUUS_MS = 60;

/**
 * MANIFESTIN JAKSOT HAKURAKENTEEKSI. Puhdas funktio: sama pelissä ja
 * testissä. Palauttaa Mapin tunnus → { alku, loppu, lauseet, sanat },
 * jossa ajat ovat millisekunteja tiedoston alusta. Kelvoton rivi
 * (puuttuva tunnus tai väli, jonka pituus ei ole positiivinen) jätetään
 * pois — hajonnut manifesti ei saa vaientaa koko kertomusta, vaan ne
 * jaksot putoavat jakso kerrallaan -tilaan.
 *
 * @param {object} manifesti kertomus-manifesti.json
 * @returns {Map<string, {alku:number, loppu:number, lauseet:number[], sanat:object[]}>}
 */
export function jaksojenAikaleimat(manifesti) {
  const kartta = new Map();
  if (!manifesti?.yhtena) return kartta;
  for (const rivi of manifesti.jaksot ?? []) {
    const tunnus = typeof rivi?.tunnus === 'string' ? rivi.tunnus : null;
    const alku = Number(rivi?.alku);
    const loppu = Number(rivi?.loppu);
    if (!tunnus || !Number.isFinite(alku) || !Number.isFinite(loppu) || loppu <= alku) continue;
    kartta.set(tunnus, {
      alku,
      loppu,
      lauseet: (rivi.lauseet ?? []).map(Number).filter(Number.isFinite),
      sanat: (rivi.sanat ?? []).filter((s) => s && Number.isFinite(Number(s.alku)))
        .map((s) => ({ sana: String(s.sana ?? ''), alku: Number(s.alku) })),
    });
  }
  return kartta;
}

/**
 * Jakson aikaleimat SUHTEESSA JAKSON ALKUUN (ks. otsikko). Puhdas
 * funktio; negatiiviset (mittausvirhe) leikataan nollaan.
 *
 * @param {{alku:number, lauseet:number[], sanat:object[]}} rivi
 * @returns {{lauseet:number[], sanat:Array<{sana:string, alku:number}>}}
 */
export function jaksonAikaleimat(rivi) {
  const nollaan = (ms) => Math.max(0, Math.round(ms - rivi.alku));
  return {
    lauseet: rivi.lauseet.map(nollaan),
    sanat: rivi.sanat.map((s) => ({ sana: s.sana, alku: nollaan(s.alku) })),
  };
}

/** Tiedostonimi ilman .mp3-päätettä (soitin lisää päätteen itse). */
export function tiedostonRunko(nimi) {
  const puhdas = String(nimi ?? '').trim();
  return puhdas ? puhdas.replace(/\.mp3$/i, '') : null;
}

/**
 * KERTOJAN SOITIN YHDELLE ESITYKSELLE.
 *
 * @param {object} asetukset
 * @param {object} asetukset.ajo js/aikajana.js:n Aikajana-olio (ui, luentajuuri)
 * @param {string} [asetukset.etuliite] kaaren `kertomusRunko`
 * @param {Function} [asetukset.hae] fetch-korvike testeille
 * @returns {{aloita:Function, valmis:Promise, yhtena:Function, pura:Function}}
 */
export function luoKertomusluenta({ ajo, etuliite = null, hae = null } = {}) {
  const tila = {
    leimat: new Map(),
    runko: null,
    vahti: null,
    ajastin: 0,
    vuoro: 0,
    /** Onko manifestin haku jo tehty (onnistui tai ei). */
    haettu: false,
    purettu: false,
  };

  const noutaja = hae ?? (typeof fetch === 'function' ? fetch.bind(globalThis) : null);
  const juuri = ajo?.luentajuuri ?? '';

  /*
   * MANIFESTI HAETAAN HETI, EI VASTA ENSIMMÄISESSÄ JAKSOSSA. Ohjaaja
   * syntyy jo linssiä avattaessa ja esitys alkaa vasta Käynnistä-
   * napista, joten haku ehtii perille. Jos ei ehdi, ensimmäinen jakso
   * odottaa lupauksen ja lähtee vasta sitten (ks. aloita) — puuttuva tai
   * rikkinäinen manifesti putoaa hiljaa jakso kerrallaan -tilaan.
   */
  const valmis = (async () => {
    if (!noutaja || !juuri) return null;
    try {
      const vastaus = await noutaja(`${juuri}/${KERTOMUS_MANIFESTI}`, { cache: 'default' });
      if (!vastaus?.ok) return null;
      const manifesti = await vastaus.json();
      tila.leimat = jaksojenAikaleimat(manifesti);
      tila.runko = tila.leimat.size ? tiedostonRunko(manifesti.tiedosto) : null;
      if (!tila.runko) tila.leimat = new Map();
      return manifesti;
    } catch {
      return null;
    } finally {
      tila.haettu = true;
    }
  })();

  /** Loppuvahti pois: seuraava jakso saa oman soittimensa ja vahtinsa. */
  const irrotaVahti = () => {
    if (tila.vahti) {
      tila.vahti.aani.removeEventListener('timeupdate', tila.vahti.kuuntelija);
      tila.vahti = null;
    }
    clearInterval(tila.ajastin);
    tila.ajastin = 0;
  };

  /**
   * YKSI JAKSO YHDESTÄ TIEDOSTOSTA.
   *
   * KELAUS TEHDÄÄN ENNEN SOITTOA, EI PYSÄYTTÄMÄLLÄ. Soitin luodaan
   * js/linssipuhe.js:n soitaLinssiluennalla (kertojan kytkin, radion
   * väistö, taustan vaimennus ja kirjanpito ovat siellä), ja sen
   * `valmistele`-koukku asettaa `currentTime`:n heti soittimen
   * synnyttyä — HTML-määritelmän mukaan se on tällöin toiston
   * OLETUSALOITUSKOHTA, joten ääni lähtee jakson alusta myös ennen
   * metatietoja. Erillinen pause() ei kelpaisi: se keskeyttäisi
   * play()-lupauksen, ja soitaLinssiluenta tulkitsisi sen virheeksi ja
   * purkaisi taustan väistön kesken jakson.
   *
   * LOPPU vahditaan sekä `timeupdate`-tapahtumasta (n. 4 kertaa
   * sekunnissa) että lyhyellä ajastimella, jottei jakso vuoda
   * seuraavan puheen päälle.
   */
  const soitaSegmentti = (rivi, alkukohta, { onAani }) => {
    const alkuS = Math.max(0, rivi.alku + Math.max(0, alkukohta)) / 1000;
    const loppuS = rivi.loppu / 1000;
    const kelaa = (aani) => {
      try { aani.currentTime = alkuS; } catch { /* kelaamaton soitin */ }
    };
    const aani = soitaLinssiluenta(ajo.ui, null, {
      runko: tila.runko, juuri, viive: 0, valmistele: kelaa,
    });
    if (!aani) return null;
    onAani?.(aani);
    // Varmistus: jos selain ei ottanut kelausta vastaan ennen
    // metatietoja, se tehdään heti kun kesto tiedetään.
    aani.addEventListener('loadedmetadata', () => {
      if (Math.abs(aani.currentTime - alkuS) > 0.5) kelaa(aani);
    }, { once: true });

    const pysayta = () => {
      if (aani.currentTime + LOPUN_TARKKUUS_MS / 1000 < loppuS) return;
      aani.pause();
      irrotaVahti();
    };
    const kuuntelija = () => pysayta();
    irrotaVahti();
    tila.vahti = { aani, kuuntelija };
    aani.addEventListener('timeupdate', kuuntelija);
    tila.ajastin = setInterval(pysayta, LOPUN_TARKKUUS_MS);
    return aani;
  };

  /** Entinen käytös: oma tiedosto per jakso, kesto äänitteestä. */
  const soitaJakso = (jakso, alkukohta, { onKesto, ajankohtainen }) => {
    const runko = kertomuksenRunko(jakso, etuliite ?? undefined);
    const aani = runko
      ? soitaLinssiluenta(ajo.ui, null, { runko, juuri, viive: 0 })
      : null;
    if (!aani) return null;
    if (alkukohta > 0) {
      const kelaa = () => {
        if (ajankohtainen?.() === false) return;
        const kesto = Number(aani.duration);
        if (Number.isFinite(kesto) && kesto > 0 && alkukohta / 1000 < kesto - 0.5) {
          try { aani.currentTime = alkukohta / 1000; } catch { /* ei kelattavissa */ }
        }
      };
      aani.addEventListener('loadedmetadata', kelaa, { once: true });
      if (Number.isFinite(aani.duration) && aani.duration > 0) kelaa();
    }
    /*
     * KESTO ÄÄNITTEESTÄ HETI KUN SE TIEDETÄÄN. Varakesto on jo
     * käytössä, joten metatietojen viive ei pysäytä mitään: jakson
     * kesto vain tarkentuu kesken jakson.
     */
    const tarkenna = () => {
      if (ajankohtainen?.() === false) return;
      const kesto = Number(aani.duration);
      if (Number.isFinite(kesto) && kesto > 0) onKesto?.(Math.round(kesto * 1000));
    };
    aani.addEventListener('loadedmetadata', tarkenna, { once: true });
    tarkenna();
    return aani;
  };

  return {
    /** Manifestin lupaus (testit ja savuke odottavat tätä). */
    valmis,
    /** Onko yhden tiedoston tila käytössä. */
    yhtena: () => Boolean(tila.runko && tila.leimat.size),
    /** Jakson aikaleimat tiedoston alusta (null, jos ei ole). */
    leimat: (tunnus) => tila.leimat.get(tunnus) ?? null,

    /**
     * Aloita jakson luenta.
     *
     * @param {object} jakso kaanonin jakso
     * @param {object} [asetukset]
     * @param {number} [asetukset.alkukohta] ms jakson alusta (muistista jatko)
     * @param {Function} [asetukset.onKesto] kutsutaan, kun jakson kesto tiedetään (ms)
     * @param {Function} [asetukset.onAani] soitin kutsujan kirjanpitoon
     * @param {Function} [asetukset.ajankohtainen] onko tämä jakso yhä menossa
     * @param {Function} [asetukset.voiSoida] saako ääni lähteä (tauko)
     * @returns {object|null} soitin, tai null jos se syntyy vasta manifestin jälkeen
     */
    aloita(jakso, {
      alkukohta = 0, onKesto = null, onAani = null, ajankohtainen = null, voiSoida = null,
    } = {}) {
      if (tila.purettu || !jakso) return null;
      irrotaVahti();
      tila.vuoro += 1;
      const vuoro = tila.vuoro;
      const kaynnissa = () => !tila.purettu && vuoro === tila.vuoro
        && ajankohtainen?.() !== false;

      const rivi = tila.leimat.get(jakso.id);
      if (tila.runko && rivi) {
        // eslint-disable-next-line no-param-reassign
        jakso.aikaleimat = jaksonAikaleimat(rivi);
        onKesto?.(Math.round(rivi.loppu - rivi.alku));
        return soitaSegmentti(rivi, alkukohta, { onAani });
      }
      // Haku on jo tehty: jakso kerrallaan -tila heti, ilman odotusta.
      if (tila.haettu) return soitaJakso(jakso, alkukohta, { onKesto, ajankohtainen: kaynnissa });

      /*
       * MANIFESTIA EI OLE VIELÄ HAETTU: odota lupaus ja aloita sitten.
       * Kello käy varakestolla sillä välin, joten esitys ei jää
       * odottamaan — vain kertojan ääni lähtee hetken myöhässä. Jos
       * jakso on jo vaihtunut tai pelaaja pani tauolle, ääntä ei aloiteta.
       */
      let soitin = null;
      valmis.then(() => {
        if (!kaynnissa()) return;
        const uusi = tila.leimat.get(jakso.id);
        if (tila.runko && uusi) {
          // eslint-disable-next-line no-param-reassign
          jakso.aikaleimat = jaksonAikaleimat(uusi);
          onKesto?.(Math.round(uusi.loppu - uusi.alku));
          soitin = soitaSegmentti(uusi, alkukohta, { onAani });
          if (soitin && voiSoida?.() === false) soitin.pause();
        } else {
          soitin = soitaJakso(jakso, alkukohta, { onKesto, ajankohtainen: kaynnissa });
          if (soitin && voiSoida?.() === false) soitin.pause();
          if (soitin) onAani?.(soitin);
        }
      });
      return soitin;
    },

    pura() {
      tila.purettu = true;
      irrotaVahti();
    },
  };
}
