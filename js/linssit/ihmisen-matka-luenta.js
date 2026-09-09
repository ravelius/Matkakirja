/*
 * IHMISEN MATKA — KERTOJAN LUENTA (putki tai jakso kerrallaan).
 *
 * Raamattu "IHMISEN MATKA: KERTOJA LUKEE KOKO KERTOMUKSEN PUTKEEN, PULU
 * PUHUU HILJEMPAA KERTOJAN PAALLE" (omistaja 9.9.2026 klo 15.00,
 * sanatarkasti: *"siinä koko tekstin luenta saisi mennä putkeen ilman
 * että sitä katkotaan välillä"*) ja sitä edeltävä "IHMISEN MATKA:
 * ETELA-AFRIKKA VAIN KERRAN, SELKEAT LAUSEET, YKSI YHTENAINEN LUENTA"
 * (omistaja 8.9.2026: *"nyt jokainen kohtaus on generoitu erillisenä
 * kohtana, niin kertojan äänensävy hyppii liikaa"*).
 *
 * KAKSI TILAA, SAMA RAJAPINTA. Esityksen ohjaaja
 * (js/linssit/ihmisen-matka-esitys.js) kutsuu tästä vain `aloita`-
 * funktiota eikä tiedä kumpi tila on käytössä:
 *
 *   1. PUTKI (manifesti sanoo `yhtena: true`). Koko kertomus on yhtenä
 *      äänitteenä ämpärissä (`tiedosto`), ja se soitetaan KERRAN ALUSTA
 *      LOPPUUN: yksi `play()`, ei kelausta jaksojen alkuun, ei
 *      pysäytystä jakson loppuun eikä taukoa väliin. Jaksojen VAIHDOT
 *      luetaan soittimen `currentTime`:stä ja manifestin `alku`-
 *      aikaleimoista (vahdiRajaa: timeupdate + ajastin,
 *      RAJAN_TARKKUUS_MS), joten kartta, kello ja kuvat seuraavat
 *      ääntä eivätkä toisin päin. Tiedostossa jaksojen VÄLISSÄ olevat
 *      hiljaisuudet kuuluvat luontevasti läpi, koska jakson kesto
 *      esitykselle on SEURAAVAN JAKSON ALKU miinus tämän alku
 *      (viimeisellä `loppu`) — ks. `paattyy` ja `kesto` alla.
 *      Manifesti kertoo myös, millä mallilla ääni syntyi (`malli`,
 *      oletus eleven_v3 tageineen) ja mistä aikaleimat tulivat
 *      (`aikaleimalahde`: 'forced-alignment' tai varareitti
 *      'with-timestamps').
 *   2. JAKSO KERRALLAAN (ei manifestia tai `yhtena: false`). Entinen
 *      käytös: oma mp3 per jakso, nimi js/linssipuhe.js
 *      kertomuksenRungosta, kesto äänitteen metatiedoista. Tämä on yhä
 *      voimassa, jottei vanha ämpärin sisältö lakkaa toimimasta.
 *
 * KAKSI KESTOA, KOSKA PULU PUHUU PÄÄLLE. Putkessa jakso antaa
 * kutsujalle kaksi lukua: `kesto` (seuraavan jakson alkuun — kello,
 * kamera ja jakson vaihto) ja `puhe` (tämän jakson viimeinen ääni,
 * `loppu` − `alku`). Pulun välihuomio ajoitetaan `puhe`-lukuun, jolloin
 * se osuu kappaleiden väliseen hengähdykseen ja kuuluu kertojan päälle
 * vain hännästään — kertoja ei pysähdy sen tieltä.
 *
 * AIKALEIMAT ESITYKSELLE. Manifestin jaksorivillä ovat lauseiden ja
 * sanojen alkuhetket (ms tiedoston alusta). Tämä moduuli antaa ne
 * jaksolle SUHTEESSA JAKSON ALKUUN kenttään
 *
 *   jakso.aikaleimat = { lauseet: [ms…], sanat: [ms…], sanatiedot: [{ sana, alku }…] }
 *
 * jotta avausta ja tekstin rytmitystä rakentava koodi voi lukea ne
 * suoraan (0 = jakson ensimmäinen ääni). Ilman aikaleimoja kenttää ei
 * ole lainkaan — lukija käyttää `jakso.aikaleimat?.lauseet`-muotoa.
 *
 * ÄÄNIKELLO ON PUTKEN KELLO. `kulunut()` antaa ohjaajalle jakson
 * kuluneen ajan SOITTIMESTA (currentTime − jakson alku), ja `hetki()`
 * saman koko kertomuksen alusta. Tauko pysäyttää sen itsestään, koska
 * pysäytetty soitin ei etene. Jos ääntä ei ole (mykistys, kertojatila
 * 'ei', puuttuva tiedosto, torjuttu play), kumpikin antaa `null` ja
 * ohjaaja kulkee seinäkellolla kuten ennenkin.
 */

import { kertomuksenRunko, pysaytaLinssiluenta, soitaLinssiluenta } from '../linssipuhe.js';

/** Manifestin tiedostonimi kaaren puhekansiossa (sama kuin työkalulla). */
export const KERTOMUS_MANIFESTI = 'kertomus-manifesti.json';

/**
 * Jaksorajan vahti tarkistaa hetken myös ajastimella: `timeupdate`
 * saapuu selaimissa noin neljästi sekunnissa, ja pelkän sen varassa
 * jakso vaihtuisi neljänneksen sekunnin myöhässä — kello ja kamera
 * jäisivät kuuluvasti kertojasta jälkeen.
 */
export const RAJAN_TARKKUUS_MS = 60;

/**
 * MANIFESTIN JAKSOT HAKURAKENTEEKSI. Puhdas funktio: sama pelissä ja
 * testissä. Palauttaa Mapin tunnus →
 * { alku, loppu, paattyy, kesto, lauseet, sanat }, jossa ajat ovat
 * millisekunteja tiedoston alusta:
 *
 *   alku    jakson ensimmäinen ääni
 *   loppu   jakson viimeinen ääni (kappaleen loppu + JAKSON_HANTA_MS)
 *   paattyy SEURAAVAN jakson alku — viimeisellä `loppu`
 *   kesto   paattyy − alku, eli jakson mitta ESITYKSELLE
 *
 * Ero `loppu`- ja `paattyy`-kenttien välillä on juuri se hiljaisuus,
 * joka tiedostossa on kappaleiden välissä. Putkessa sitä ei leikata
 * pois vaan se kuuluu läpi: kello ja kamera jakavat matkansa koko
 * `kesto`-välille, ja pulu puhuu `loppu`-hetkellä siihen rakoon.
 *
 * Kelvoton rivi (puuttuva tunnus tai väli, jonka pituus ei ole
 * positiivinen) jätetään pois — hajonnut manifesti ei saa vaientaa koko
 * kertomusta, vaan ne jaksot putoavat jakso kerrallaan -tilaan.
 *
 * @param {object} manifesti kertomus-manifesti.json
 * @returns {Map<string, {alku:number, loppu:number, paattyy:number, kesto:number, lauseet:number[], sanat:object[]}>}
 */
export function jaksojenAikaleimat(manifesti) {
  const kartta = new Map();
  if (!manifesti?.yhtena) return kartta;
  const rivit = [];
  for (const rivi of manifesti.jaksot ?? []) {
    const tunnus = typeof rivi?.tunnus === 'string' ? rivi.tunnus : null;
    const alku = Number(rivi?.alku);
    const loppu = Number(rivi?.loppu);
    if (!tunnus || !Number.isFinite(alku) || !Number.isFinite(loppu) || loppu <= alku) continue;
    rivit.push({
      tunnus,
      alku,
      loppu,
      lauseet: (rivi.lauseet ?? []).map(Number).filter(Number.isFinite),
      sanat: (rivi.sanat ?? []).filter((s) => s && Number.isFinite(Number(s.alku)))
        .map((s) => ({ sana: String(s.sana ?? ''), alku: Number(s.alku) })),
    });
  }
  rivit.forEach((rivi, i) => {
    const seuraava = Number(rivit[i + 1]?.alku);
    const paattyy = Number.isFinite(seuraava) && seuraava > rivi.alku ? seuraava : rivi.loppu;
    kartta.set(rivi.tunnus, {
      ...rivi, paattyy, kesto: Math.round(paattyy - rivi.alku),
    });
  });
  return kartta;
}

/**
 * Jakson aikaleimat SUHTEESSA JAKSON ALKUUN (ks. otsikko). Puhdas
 * funktio; negatiiviset (mittausvirhe) leikataan nollaan.
 *
 * MUOTO ON AVAUKSEN KOUKUN MUOTO (js/linssit/ihmisen-matka-esitys.js
 * lauseidenHetket / sananHetki): `lauseet` ja `sanat` ovat PELKKIÄ
 * ms-lukuja, yksi per lause ja yksi per sana. Sanojen nimet jäävät
 * rinnalle kenttään `sanatiedot`, jos joku haluaa tarkistaa kohdistuksen.
 *
 * @param {{alku:number, lauseet:number[], sanat:object[]}} rivi
 * @returns {{lauseet:number[], sanat:number[], sanatiedot:Array<{sana:string, alku:number}>}}
 */
export function jaksonAikaleimat(rivi) {
  const nollaan = (ms) => Math.max(0, Math.round(ms - rivi.alku));
  const sanatiedot = rivi.sanat.map((s) => ({ sana: s.sana, alku: nollaan(s.alku) }));
  return {
    lauseet: rivi.lauseet.map(nollaan),
    sanat: sanatiedot.map((s) => s.alku),
    sanatiedot,
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
 * @returns {{aloita:Function, valmis:Promise, yhtena:Function, kulunut:Function, hetki:Function, pura:Function}}
 */
export function luoKertomusluenta({ ajo, etuliite = null, hae = null } = {}) {
  const tila = {
    leimat: new Map(),
    runko: null,
    vahti: null,
    ajastin: 0,
    vuoro: 0,
    /** Putken yksi ainoa soitin (null = ei ääntä tai se hajosi). */
    soitin: null,
    /** Jakso, jota putki juuri soittaa (äänikellon nollakohta). */
    nykyinen: null,
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

  /** Rajavahti pois: seuraava jakso saa oman vahtinsa samasta soittimesta. */
  const irrotaVahti = () => {
    if (tila.vahti) {
      tila.vahti.aani.removeEventListener('timeupdate', tila.vahti.kuuntelija);
      tila.vahti = null;
    }
    clearInterval(tila.ajastin);
    tila.ajastin = 0;
  };

  /** Putken soittimen kohta millisekunteina, tai null jos ääntä ei ole. */
  const soittimenMs = () => {
    const aani = tila.soitin;
    if (!aani) return null;
    const ms = Number(aani.currentTime) * 1000;
    return Number.isFinite(ms) ? ms : null;
  };

  /**
   * PUTKI KÄYNTIIN — KERRAN. Soitin luodaan js/linssipuhe.js:n
   * soitaLinssiluennalla (kertojan kytkin, radion väistö, taustan
   * vaimennus ja kirjanpito ovat siellä), ja sen `valmistele`-koukku
   * asettaa `currentTime`:n heti soittimen synnyttyä — HTML-määritelmän
   * mukaan se on tällöin toiston OLETUSALOITUSKOHTA, joten ääni lähtee
   * oikeasta kohdasta myös ennen metatietoja.
   *
   * TÄTÄ KUTSUTAAN VAIN HYPPYÄ KOHTI: esityksen alussa, muistista
   * jatkettaessa ja aikaselaimen valinnasta. Jaksojen vaihtuessa
   * soitinta ei kosketa lainkaan (ks. putkenJakso).
   *
   * HAJONNUT SOITIN UNOHDETAAN. Puuttuva tiedosto tai torjuttu play
   * lähettää 'error'-tapahtuman (js/linssipuhe.js), ja silloin äänikello
   * jäisi ikuisesti nollaan — ohjaaja ei saisi kertomusta eteenpäin.
   * Soitin unohdetaan siksi tässä, jolloin `kulunut()` antaa null ja
   * ohjaaja palaa seinäkelloon.
   */
  const soitaPutki = (alkuMs, { onAani }) => {
    const alkuS = Math.max(0, alkuMs) / 1000;
    const kelaa = (aani) => {
      try { aani.currentTime = alkuS; } catch { /* kelaamaton soitin */ }
    };
    const aani = soitaLinssiluenta(ajo.ui, null, {
      runko: tila.runko, juuri, viive: 0, valmistele: kelaa,
    });
    tila.soitin = aani;
    if (!aani) return null;
    onAani?.(aani);
    // Varmistus: jos selain ei ottanut kelausta vastaan ennen
    // metatietoja, se tehdään heti kun kesto tiedetään.
    aani.addEventListener('loadedmetadata', () => {
      if (Math.abs(aani.currentTime - alkuS) > 0.5) kelaa(aani);
    }, { once: true });
    aani.addEventListener('error', () => {
      if (tila.soitin === aani) tila.soitin = null;
    });
    return aani;
  };

  /**
   * JAKSON RAJA SOITTIMEN KELLOSTA. Kun `currentTime` saavuttaa jakson
   * `paattyy`-hetken (tai äänite loppuu kesken), kutsutaan `onRaja` —
   * ohjaaja siirtyy seuraavaan jaksoon. Ääntä EI pysäytetä eikä kelata:
   * kertoja jatkaa lukemistaan seuraavan jakson puolella samaan tapaan
   * kuin lukija kääntää sivua kesken kappaleen.
   */
  const vahdiRajaa = (rivi, onRaja) => {
    irrotaVahti();
    const aani = tila.soitin;
    if (!aani || typeof onRaja !== 'function') return;
    const rajaS = rivi.paattyy / 1000;
    const laukaise = () => {
      if (tila.purettu || tila.soitin !== aani) return;
      if (!aani.ended && aani.currentTime + RAJAN_TARKKUUS_MS / 1000 < rajaS) return;
      irrotaVahti();
      onRaja();
    };
    tila.vahti = { aani, kuuntelija: laukaise };
    aani.addEventListener('timeupdate', laukaise);
    tila.ajastin = setInterval(laukaise, RAJAN_TARKKUUS_MS);
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

  /** Putken jakso: aikaleimat, kestot ja rajavahti — ääntä ei katkota. */
  const putkenJakso = (jakso, rivi, {
    alkukohta, onKesto, onAani, onRaja, hyppy,
  }) => {
    // eslint-disable-next-line no-param-reassign
    jakso.aikaleimat = jaksonAikaleimat(rivi);
    tila.nykyinen = rivi;
    onKesto?.(rivi.kesto, { puhe: Math.round(rivi.loppu - rivi.alku) });
    /*
     * JATKUUKO PUTKI VAI ONKO TÄMÄ HYPPY? Luonnollisessa vaihdossa
     * soitin on jo tämän jakson välillä (raja laukesi hetki sitten),
     * eikä siihen kosketa. Muutoin — esityksen alku, muistista jatko,
     * aikaselaimen valinta — kertoja aloitetaan tästä kohdasta.
     */
    const ms = soittimenMs();
    const jatkuu = ms !== null && !hyppy && !(alkukohta > 0)
      && ms + RAJAN_TARKKUUS_MS >= rivi.alku && ms < rivi.paattyy;
    if (!jatkuu) soitaPutki(rivi.alku + Math.max(0, alkukohta), { onAani });
    vahdiRajaa(rivi, onRaja);
    return tila.soitin;
  };

  return {
    /** Manifestin lupaus (testit ja savuke odottavat tätä). */
    valmis,
    /** Onko putkitila käytössä. */
    yhtena: () => Boolean(tila.runko && tila.leimat.size),
    /** Jakson aikaleimat tiedoston alusta (null, jos ei ole). */
    leimat: (tunnus) => tila.leimat.get(tunnus) ?? null,
    /** Putken kohta koko kertomuksen alusta (ms) tai null. */
    hetki: () => soittimenMs(),
    /**
     * ÄÄNIKELLO: jakson kulunut aika soittimesta (ms) tai null, jos
     * ääntä ei ole. Ohjaaja käyttää tätä seinäkellon sijasta, jolloin
     * kello, kamera, kuvat ja tekstin rytmi seuraavat kertojaa.
     */
    kulunut: () => {
      const ms = soittimenMs();
      if (ms === null || !tila.nykyinen) return null;
      return Math.max(0, ms - tila.nykyinen.alku);
    },

    /**
     * Aloita jakson luenta.
     *
     * @param {object} jakso kaanonin jakso
     * @param {object} [asetukset]
     * @param {number} [asetukset.alkukohta] ms jakson alusta (muistista jatko)
     * @param {Function} [asetukset.onKesto] kutsutaan, kun jakson kesto
     *   tiedetään: (kesto, { puhe }) — kesto seuraavan jakson alkuun,
     *   puhe tämän jakson viimeiseen ääneen (putkessa eri luvut)
     * @param {Function} [asetukset.onAani] soitin kutsujan kirjanpitoon
     * @param {Function} [asetukset.ajankohtainen] onko tämä jakso yhä menossa
     * @param {Function} [asetukset.voiSoida] saako ääni lähteä (tauko)
     * @param {Function} [asetukset.onRaja] putkessa: jakson raja tuli
     * @param {boolean} [asetukset.hyppy] pelaajan hyppy (aikaselain,
     *   muisti): putkessa kertoja aloitetaan jakson alusta, vaikka
     *   soitin olisi jo sen välillä
     * @returns {object|null} soitin, tai null jos se syntyy vasta manifestin jälkeen
     */
    aloita(jakso, {
      alkukohta = 0, onKesto = null, onAani = null, ajankohtainen = null, voiSoida = null,
      onRaja = null, hyppy = false,
    } = {}) {
      if (tila.purettu || !jakso) return null;
      tila.vuoro += 1;
      const vuoro = tila.vuoro;
      const kaynnissa = () => !tila.purettu && vuoro === tila.vuoro
        && ajankohtainen?.() !== false;

      const rivi = tila.leimat.get(jakso.id);
      if (tila.runko && rivi) {
        return putkenJakso(jakso, rivi, {
          alkukohta, onKesto, onAani, onRaja, hyppy,
        });
      }
      irrotaVahti();
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
          soitin = putkenJakso(jakso, uusi, {
            alkukohta, onKesto, onAani, onRaja, hyppy,
          });
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
      tila.nykyinen = null;
      // Putki soi koko kertomuksen: sitä ei saa jättää soimaan linssin
      // sulkeuduttua. Jakso kerrallaan -tilassa sama kutsu on turva,
      // joka ei tee mitään ylimääräistä (soitin on jo vaihtunut).
      if (tila.soitin) pysaytaLinssiluenta(ajo?.ui);
      tila.soitin = null;
    },
  };
}
