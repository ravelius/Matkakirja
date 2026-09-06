/*
 * IHMISEN MATKA VÄRIVIRTOINA — PALLON PIIRTO (docs/moduulit/
 * ihmisen-matka-virrat.md luvut 5.3, 6 ja 11; Raamattu: IHMISEN MATKA ON
 * VARIVIRTOJA, EI PISTEITA, omistaja 6.9.2026).
 *
 * Aikajanamoottori (js/aikajana.js) kutsuu tätä pallolla, kun kaarella on
 * `virrat`-kenttä: luoVirrat({ ajo, lauta, kaari, osa }) rakentaa
 *
 *   1. VÄRIKENTÄN pallon pinnalle YHTENÄ tekstuurina: 1440 × 720 -kangas
 *      (kaksi pikseliä per puolen asteen ruutu, PIIRTOKERROIN), joka
 *      pannaan pallolle samalla kalvomekanismilla kuin topografialinssin
 *      kuva (js/pallolauta/linssit.js kalvo) — ei tuhansia meshejä,
 *      toimii puhelimella. Kangas maalataan uudelleen enintään ~12 kertaa
 *      sekunnissa ja vain kun kello on edennyt; hitaalla laitteella väli
 *      venyy maalauksen keston mukaan (kolme maalausta per sekunti
 *      vähintään).
 *   2. KAMERAN, joka seuraa aktiivisimman virran rintamaa pehmeästi
 *      (luku 6): painopiste 3D-vektoreiden summana, korkeus hajonnasta,
 *      eksponentiaalinen liuku joka kehyksellä. Pelaajan sormi tai
 *      rulla pallolla keskeyttää seuraamisen KESKEYTYS_MS:ksi.
 *   3. PYSÄKKIKUVAT: kuvapysäkin havainnekuva poksahtaa pienenä
 *      kehyksenä lampun viereen ja kutistuu seuraavan syttyessä.
 *      Kamera kehystää kärjen ja pysäkin yhdessä kuudeksi sekunniksi,
 *      joten poksahdus näkyy aina ruudulla — reunan nuolta ei enää
 *      tarvita eikä ole. Hiljainen pysäkki (V4:n `hiljainen`) saa
 *      pienen pisteen: löytöpaikat ovat todisteita, eivät reitti.
 *
 * LASKENTA TYÖSÄIKEESSÄ (hionta 6.9.2026): saapumisajat ja kalvon
 * tarkennus lasketaan Web Workerissa (js/aikajana-virrat-tyo.js) heti
 * linssin auetessa; pääsäie ei jäädy avausjaksossa. Jos Worker ei
 * käynnisty (yhden tiedoston versio, file://, vanha selain), sama
 * laskenta ajetaan pääsäikeessä setTimeout-paloissa kuten prototyypissä.
 * Moottori odottaa `valmis`-lupausta Käynnistä-napissa, jottei kello
 * lähde ennen kuin Afrikka on värissä.
 *
 * RUUTUREUNAT POIS (hionta 6.9.2026): kalvo piirretään kaksinkertaisella
 * resoluutiolla ja jokainen pikseli saa saapumisajan, peiton ja värin
 * neljän lähimmän ruudun bilineaarisena sekoituksena
 * (js/aikajana-virrat-laskenta.js tarkennaKentat). Rintama, rannikko ja
 * alueiden rajat ovat pehmeitä käyriä; kerrokset (virta, retki, vanha
 * väestö, meri) yhdistetään peittävyyden mukaan päällekkäin.
 *
 * REDUCED MOTION (päätös 10): kamera ei seuraa, värit päivittyvät
 * askelittain (ei pehmeää nousua, harvempi päivitys), kehykset ilman
 * animaatiota (css).
 */

import {
  puraMaamaski, puraPeitto, laskeKentatVaiheittain, tarkennaKentat, virranVari, johdaVanat,
  rintamanLeveys, NOUSUN_MIN_V, NOUSUN_OSUUS, RUUDUKON_LEVEYS, RUUDUKON_KORKEUS, KM_ASTEELLA,
} from './aikajana-virrat-laskenta.js';
import { luoVanat, VANAN_ENNAKKO } from './aikajana-vanat.js';

/** Kankaan päivitysväli (ms): ~12 Hz riittää silmälle. */
export const VIRTOJEN_PAIVITYS_MS = 80;
/** Reduced motion: askelittain, puolen sekunnin välein. */
export const VIRTOJEN_ASKEL_MS = 500;
/** Hidas laite: päivitysväli vähintään tämä kerroin × maalauksen kesto. */
export const PAIVITYSVALIN_KERROIN = 3;
/** Kameran painopisteen laskentaväli (ms). */
export const KAMERAN_LASKENTA_MS = 250;
/*
 * Kameran liu'un aikavakiot (s): sijainti ja korkeus. Pehmeämmät kuin
 * kalvon aikaan (1,5 / 2,5), koska kohde on nyt vanan KÄRKI ja liikkuu
 * itse (docs/moduulit/ihmisen-matka-vanat.md luku 3.2).
 */
export const KAMERAN_TAU_SIJAINTI = 2.5;
export const KAMERAN_TAU_KORKEUS = 3.5;
/*
 * KORKEUSSÄÄNTÖ — KÄRKI KARKAA, KAMERA NOUSEE. Näkyvä leveys on
 * W = clamp(W0 + kerroin × d, min, max), missä d on kameran nykyisen
 * paikan ja kohteen kulmaetäisyys. Pyrähdyksessä (Arabia → Altai
 * 2 000 vuodessa, Alaska → Chile 2 600 vuodessa) d kasvaa ennen kuin
 * liuku ehtii perässä, joten kamera nousee eikä kärki karkaa kuvasta;
 * odotuksessa (Bab-el-Mandeb 184 → 78 ka) d → 0 ja kamera laskeutuu
 * hitaasti takaisin lähikuvaan. Mitattu kärjen kulku: luku 3.1.
 */
export const KAMERAN_LEVEYS_MIN_AST = 30;
export const KAMERAN_LEVEYS_MAX_AST = 110;
export const KAMERAN_ETAISYYSKERROIN = 2.2;
/*
 * KAMERA EI PANOROI TÄTÄ NOPEAMMIN (astetta sekunnissa). Amerikkojen
 * rannikkopyrähdys siirtää kärkeä 9 000 km ruutusekunnissa (luku 3.1),
 * ja pelkkä eksponentiaalinen liuku heittäisi kameraa 24°/s — se
 * näyttäisi hypyltä. Katto on turvallinen, koska korkeussääntö kasvattaa
 * leveyttä juuri silloin kun kamera jää jälkeen: kohde on kuvassa aina,
 * kun W ≥ 2 d, ja W = 30 + 2,2 d täyttää sen kaikilla d.
 */
export const KAMERAN_SUURIN_SIIRTO_AST = 12;
/** Kuvapysäkin kehystys: kärki ja pysäkki samaan kuvaan, vara asteina. */
export const KUVAPYSAKIN_VARA_AST = 12;
/** Kuvapysäkin kehystys kestää tämän syttymisestä (ms). */
export const KUVAPYSAKIN_KEHYSTYS_MS = 6000;
/**
 * LOPPU: kamera perääntyy koko pallon näkymään. Keskipiste on
 * omistajan avoin kysymys (suunnitelman 8.1); tässä on ehdotus, jonka
 * omistaja vahvistaa kuvista — Aasia ja Australia keskellä, jolloin
 * Aotearoa, Beringia ja Madagaskarin nauha näkyvät.
 */
export const LOPUN_KESKIPISTE = { lat: 0, lng: 100 };
export const LOPUN_PERAYTYMINEN_MS = 8000;
/** Koko laudan leveys (js/pallolauta/kamera.js PALLOLAUDAN_LEVEYS). */
const LAUDAN_LEVEYS = 12000;
/** Pelaajan ele keskeyttää seuraamisen tämän ajan (ms). */
export const KESKEYTYS_MS = 8000;
/** Kalvon pikseleitä per ruutu sivullaan (2 → 1440 × 720). */
export const PIIRTOKERROIN = 2;
/** Työsäikeen moduuli suhteessa sivun juureen (sw.js SHELL kantaa sen). */
export const TYOSAIKEEN_POLKU = 'js/aikajana-virrat-tyo.js';
/** Kuvakehyksen leveys pikseleinä (css .aikajana-virta-kuva). */
export const KUVAKEHYKSEN_LEVEYS = 72;

/* ------------------------------------------------------------ kamera */

/** Kahden pisteen kulmaetäisyys asteina (isoympyrä). */
export function kulmaEtaisyys(a, b) {
  if (!a || !b) return 0;
  const RAD = Math.PI / 180;
  const f1 = a.lat * RAD;
  const f2 = b.lat * RAD;
  const dl = ((b.lng ?? b.lon) - (a.lng ?? a.lon)) * RAD;
  const kosini = Math.sin(f1) * Math.sin(f2) + Math.cos(f1) * Math.cos(f2) * Math.cos(dl);
  return Math.acos(Math.max(-1, Math.min(1, kosini))) / RAD;
}

/** Kahden pisteen puoliväli pallolla (lyhintä kaarta pitkin). */
function puolivali(a, b) {
  let dLng = b.lng - a.lng;
  while (dLng > 180) dLng -= 360;
  while (dLng < -180) dLng += 360;
  let lng = a.lng + dLng / 2;
  while (lng > 180) lng -= 360;
  while (lng < -180) lng += 360;
  return { lat: (a.lat + b.lat) / 2, lng };
}

const helpotus = (t) => {
  const x = Math.max(0, Math.min(1, t));
  return x < 0.5 ? 2 * x * x : 1 - ((-2 * x + 2) ** 2) / 2;
};

/**
 * KAMERAN KOHDE (docs/moduulit/ihmisen-matka-vanat.md luku 3.2).
 * Puhdas funktio: sama sääntö pelissä ja testissä.
 *
 * @param karki      vanan kärki { lat, lng } (ennakko jo mukana)
 * @param pov        kameran nykyinen paikka { lat, lng }
 * @param kuvapysakki kehystettävä pysäkki { lat, lng } tai null
 * @param lopunOsuus  0…1: peräytyminen koko pallon näkymään (1 = perillä)
 * @param kuvasuhde   kotelon leveys / korkeus (pystyruudulla < 1)
 * @returns { lat, lng, leveys } — leveys lautayksikköinä
 */
export function kameranKohde({
  karki = null, pov = null, kuvapysakki = null, lopunOsuus = 0, kuvasuhde = 1,
} = {}) {
  const kavennus = Math.min(1, kuvasuhde || 1);
  const lautayksikkoa = (asteet) => asteet * (LAUDAN_LEVEYS / 360) * kavennus;
  /*
   * LOPPU: kohde siirtyy lopun keskipisteeseen ja leveys kasvaa koko
   * laudan mittaan pehmeästi (ease-in-out) — ruusunväriset nauhat
   * piirtyvät Tyynellemerelle tässä näkymässä.
   */
  if (lopunOsuus > 0) {
    const t = helpotus(lopunOsuus);
    const alku = karki ?? pov ?? LOPUN_KESKIPISTE;
    let dLng = LOPUN_KESKIPISTE.lng - alku.lng;
    while (dLng > 180) dLng -= 360;
    while (dLng < -180) dLng += 360;
    let lng = alku.lng + dLng * t;
    while (lng > 180) lng -= 360;
    while (lng < -180) lng += 360;
    const leveysAst = KAMERAN_LEVEYS_MAX_AST + (360 - KAMERAN_LEVEYS_MAX_AST) * t;
    return {
      lat: alku.lat + (LOPUN_KESKIPISTE.lat - alku.lat) * t,
      lng,
      leveys: Math.min(LAUDAN_LEVEYS, lautayksikkoa(leveysAst)),
    };
  }
  if (!karki) return null;
  /*
   * KUVAPYSÄKIN KEHYSTYS: kärki ja pysäkki samaan kuvaan. Al Wusta on
   * kärjestä 1 745 km (≈ 16°) ja Monte Verde 2 839 km — ilman tätä
   * kuvakehys poksahtaisi ruudun ulkopuolella eikä nuolta enää ole.
   */
  if (kuvapysakki && Number.isFinite(kuvapysakki.lat)) {
    const etaisyys = kulmaEtaisyys(karki, kuvapysakki);
    const kohde = puolivali(karki, kuvapysakki);
    const asteet = Math.max(
      KAMERAN_LEVEYS_MIN_AST,
      Math.min(KAMERAN_LEVEYS_MAX_AST, KAMERAN_ETAISYYSKERROIN * etaisyys + KUVAPYSAKIN_VARA_AST),
    );
    return { lat: kohde.lat, lng: kohde.lng, leveys: lautayksikkoa(asteet) };
  }
  const d = pov ? kulmaEtaisyys(pov, karki) : 0;
  const asteet = Math.max(
    KAMERAN_LEVEYS_MIN_AST,
    Math.min(KAMERAN_LEVEYS_MAX_AST, KAMERAN_LEVEYS_MIN_AST + KAMERAN_ETAISYYSKERROIN * d),
  );
  return { lat: karki.lat, lng: karki.lng, leveys: lautayksikkoa(asteet) };
}

/**
 * Virrat pallolle. Palauttaa kahvan, jota moottori kutsuu:
 *   ohjaaKameraa()      tosi, kun kamera on virtojen käsissä
 *   sytyta(i, t, g)     pysäkki syttyi: kuvakehys lampun elementtiin g
 *   siirry(i)           selailu: kehykset pysäkkiin i asti
 *   pura()              kaikki pois (kalvon purkaa laudan osan purku)
 *   valmis              lupaus: laskenta valmis ja ensimmäinen maalaus tehty
 */
export function luoVirrat({ ajo, lauta, kaari, osa = 'aikajana' }) {
  const aineisto = kaari.virrat;
  const reduced = Boolean(ajo.reducedMotion);
  /*
   * VANAT OVAT OLETUS (omistaja 6.9.2026, Raamattu "VIRRAT VANOINA").
   * Kehyksittäin maalattava kalvo jää perääntymistieksi lipun
   * `?virrat=kalvo` taakse, kunnes omistaja on hyväksynyt vanat.
   */
  const kalvotila = new URLSearchParams(globalThis.location?.search ?? '').get('virrat') === 'kalvo';
  const vanatKaytossa = !kalvotila && Boolean(aineisto.vanat);
  const W = aineisto.maamaski?.leveys ?? RUUDUKON_LEVEYS;
  const H = aineisto.maamaski?.korkeus ?? RUUDUKON_KORKEUS;
  const kerroin = aineisto.piirtokerroin ?? PIIRTOKERROIN;
  const peitto = aineisto.peitto ?? { vanha: 0.75, rintama: 0.95, meri: 0.42 };

  /* ---------------------------------------------------------- kangas */
  const kangas = document.createElement('canvas');
  kangas.width = W * kerroin;
  kangas.height = H * kerroin;
  const ctx = kangas.getContext('2d', { willReadFrequently: true });
  const kuva = ctx?.createImageData(W * kerroin, H * kerroin) ?? null;
  const tila = {
    /** Ruudukon kentät kameralle (aika, virta). */
    kentat: null,
    /** Kalvon tarkennetut pikselit (tarkennaKentat). */
    tarkka: null,
    kalvo: null,
    kehys: 0,
    viimePaivitys: 0,
    viimeNyt: -1,
    viimeKamera: 0,
    purettu: false,
    tyo: null,
    tyosaie: null,
    // Kamera: kohde (vanan kärki) ja liukuva näkymä.
    kohde: null,
    pov: null,
    keskeytettyAsti: 0,
    // Kehykset ja hiljaisten pysäkkien pisteet.
    kehykset: new Map(),
    pisteet: new Map(),
    nykyinen: -1,
    ajastin: 0,
    // Vanat (js/aikajana-vanat.js) ja kerran maalatut kalvot.
    vanat: null,
    kalvot: [],
    maalauksia: 0,
    kuvapysakkiAsti: 0,
    kuvapysakki: null,
    lopunAlku: 0,
  };
  /*
   * Virtojen sävyt hetkellä nyt: [virta][vanha r,g,b, rintama r,g,b].
   * Lasketaan kerran kehyksessä (Amerikkojen liuku kellon mukaan), ei
   * pikseleittäin — 270 000 pikseliä × heksan jäsennys olisi turhaa työtä.
   */
  const savyt = aineisto.virrat.map(() => new Float32Array(6));
  const retkiSavy = new Float32Array(6);
  const harmaa = aineisto.vanha?.vari?.rgb ?? [128, 122, 118];

  /* --------------------------------------------------------- laskenta */

  let ilmoitaValmis = null;
  /** Lupaus: kentät laskettu ja kalvo maalattu ensimmäisen kerran. */
  const valmis = new Promise((ok) => { ilmoitaValmis = ok; });

  const valmistele = (kentat, tarkka, lisa = {}) => {
    if (tila.purettu) return;
    tila.kentat = kentat;
    tila.tarkka = tarkka;
    tila.viimeNyt = -1;
    if (vanatKaytossa) {
      // Vanat pallolle ja kaksi kerran maalattua kalvoa (vanha väestö,
      // varhaiset retket); kellon mukana muuttuu vain peitto.
      teeVanat(lisa.vanat ?? [], lisa.kotipesat ?? []);
      maalaaKerran(lisa.vanha ?? kentat.vanha ?? null, lisa.retki ?? kentat.retki ?? null);
      /*
       * VALMIS VASTA KUN VANAT ON RAKENNETTU: moottorin Käynnistä
       * odottaa tätä lupausta, eikä kello saa lähteä ennen kuin
       * ensimmäinen vana on pallolla (vanamoduuli hakee Line2-luokat
       * elävästä polusta, mikä kestää muutaman kehyksen).
       */
      const aloita = () => {
        if (tila.purettu) return;
        paivitaKalvojenPeitto(lukema());
        tila.vanat?.paivita(lukema());
        ilmoitaValmis?.();
        ilmoitaValmis = null;
      };
      const odotus = tila.vanat?.valmis;
      if (odotus?.then) odotus.then(aloita, aloita);
      else aloita();
      return;
    }
    // Ensimmäinen maalaus heti, ettei Käynnistä paljasta väritöntä palloa.
    maalaa(lukema());
    ilmoitaValmis?.();
    ilmoitaValmis = null;
  };

  /**
   * Pääsäikeen varapolku: kentät setTimeout-paloissa virta kerrallaan
   * (avausjakson kirjoituskone ja nappi pysyvät sulavina), tarkennus
   * perään yhtenä palana.
   */
  const laskePaasaikeessa = () => {
    tila.tyo = 'paasaie';
    const maa = puraMaamaski(aineisto.maamaski.juoksut, W * H);
    const peittoMaski = puraPeitto(aineisto.maamaski.peitot, W * H);
    const vaiheet = laskeKentatVaiheittain(
      { virrat: aineisto.virrat, retki: aineisto.retki ?? null, vanha: aineisto.vanha ?? null },
      { maa, leveys: W, korkeus: H },
    );
    const askel = () => {
      if (tila.purettu) return;
      const { value, done } = vaiheet.next();
      if (done) return;
      if (value?.kentat) {
        tila.ajastin = setTimeout(() => {
          if (tila.purettu) return;
          if (vanatKaytossa) {
            const { vanat, kotipesat } = johdaVanat(value.kentat, aineisto.vanat, {
              maa, leveys: W, korkeus: H, pysakit: aineisto.pysakit ?? null,
            });
            valmistele(value.kentat, null, { vanat, kotipesat });
            return;
          }
          const tarkka = tarkennaKentat(value.kentat, { maa, peitto: peittoMaski, leveys: W, korkeus: H, kerroin });
          valmistele(value.kentat, tarkka);
        }, 0);
        return;
      }
      tila.ajastin = setTimeout(askel, 0);
    };
    tila.ajastin = setTimeout(askel, 0);
  };

  /**
   * Työsäie: moduuli-Worker sivun juuresta. Käynnistymisvirhe (tiedosto
   * puuttuu yhden tiedoston versiosta, file://, ei tukea) putoaa
   * pääsäikeen polkuun; laskennan oma virhe samoin.
   */
  const laske = () => {
    if (typeof Worker === 'undefined' || typeof document === 'undefined') { laskePaasaikeessa(); return; }
    let tyosaie = null;
    try {
      tyosaie = new Worker(new URL(TYOSAIKEEN_POLKU, document.baseURI), { type: 'module' });
    } catch {
      laskePaasaikeessa();
      return;
    }
    tila.tyo = 'tyosaie';
    tila.tyosaie = tyosaie;
    let ratkaistu = false;
    const varapolku = (syy) => {
      if (ratkaistu || tila.purettu) return;
      ratkaistu = true;
      console.warn(`Virtojen työsäie ei toiminut (${syy}); laskenta pääsäikeessä.`);
      tyosaie.terminate();
      tila.tyosaie = null;
      laskePaasaikeessa();
    };
    tyosaie.addEventListener('error', (e) => varapolku(e.message ?? 'error'));
    tyosaie.addEventListener('messageerror', () => varapolku('messageerror'));
    tyosaie.addEventListener('message', (viesti) => {
      if (ratkaistu || tila.purettu) return;
      const { kentat, tarkka, vanat, kotipesat, vanha, retki, virhe } = viesti.data ?? {};
      const puuttuu = vanatKaytossa ? !vanat?.length : !tarkka;
      if (virhe || !kentat || puuttuu) { varapolku(virhe ?? 'tyhjä vastaus'); return; }
      ratkaistu = true;
      tyosaie.terminate();
      tila.tyosaie = null;
      valmistele(kentat, tarkka, { vanat, kotipesat, vanha, retki });
    });
    tyosaie.postMessage({
      aineisto: {
        virrat: aineisto.virrat,
        retki: aineisto.retki ?? null,
        vanha: aineisto.vanha ?? null,
        maamaski: aineisto.maamaski,
        vanat: vanatKaytossa ? aineisto.vanat : null,
        pysakit: aineisto.pysakit ?? null,
      },
      kerroin,
      // Kalvon tarkennus on kallis (150–300 ms, 4 Mt) — vain perääntymistiellä.
      kalvo: !vanatKaytossa,
    });
  };

  /* ------------------------------------------------------------ piirto */

  /** Kellon lukema vuosina sitten. */
  const lukema = () => Math.max(0, ajo.asteikko.lukema(Math.max(0, ajo.tila.vuosi)));

  const paivitaSavyt = (nyt) => {
    aineisto.virrat.forEach((v, k) => {
      const c = virranVari(v.vari, nyt);
      savyt[k].set(c.vanha, 0);
      savyt[k].set(c.rintama, 3);
    });
    if (aineisto.retki) {
      const c = virranVari(aineisto.retki.vari, 0);
      retkiSavy.set(c.vanha, 0);
      retkiSavy.set(c.rintama, 3);
    }
  };

  /* ------------------------------------------- kalvot kerran maalattuina */

  /*
   * VANHA VÄESTÖ JA VARHAISET RETKET MAALATAAN KERRAN (suunnitelman
   * 2.3–2.4). Ne eivät ole vanoja vaan alueita, jotka syttyvät ja
   * sammuvat kokonaisuutena: harmaa väistyy 46 → 40 ka ja retken
   * läikkä sammuu 78 → 70 ka. Kehyksittäin maalattava 1440 × 720
   * -kangas (3–70 ms per kehys) jää siis kokonaan pois esityksestä —
   * kellon mukana muuttuu vain materiaalin peitto.
   */
  const teeKalvo = (piirra, peittavyys) => {
    const oma = document.createElement('canvas');
    oma.width = W;
    oma.height = H;
    const oktx = oma.getContext('2d');
    if (!oktx) return null;
    const kuvadata = oktx.createImageData(W, H);
    piirra(kuvadata.data);
    oktx.putImageData(kuvadata, 0, 0);
    tila.maalauksia += 1;
    const nimi = `${osa}-${peittavyys.nimi}`;
    const kahva = lauta.linssit?.kalvo?.(nimi, { kuva: oma, peittavyys: peittavyys.alku });
    if (!kahva) return null;
    const kerros = { nimi, kangas: oma, kahva, materiaali: null, peitto: peittavyys.alku };
    tila.kalvot.push(kerros);
    return kerros;
  };

  /**
   * Kalvon materiaali näyttämöltä (kangas tunnistaa sen). Kalvo
   * rakentuu asynkronisesti, joten haku toistetaan kunnes se löytyy;
   * peitto kirjoitetaan suoraan materiaaliin eikä kangasta maalata
   * uudelleen.
   */
  const kalvonMateriaali = (kerros) => {
    if (kerros.materiaali) return kerros.materiaali;
    let osuma = null;
    lauta.pallo?.scene?.()?.traverse?.((o) => {
      if (osuma || !o.isMesh) return;
      const m = o.material;
      if (m?.map?.image === kerros.kangas) osuma = m;
    });
    kerros.materiaali = osuma;
    return osuma;
  };

  const maalaaKerran = (vanhaMaski, retkiKentta) => {
    const vanhaAsetus = aineisto.vanha;
    const retkiAsetus = aineisto.retki;
    if (vanhaMaski && vanhaAsetus) {
      const vari = vanhaAsetus.vari?.rgb ?? harmaa;
      tila.vanhaKalvo = teeKalvo((data) => {
        for (let i = 0; i < vanhaMaski.length; i += 1) {
          const w = vanhaMaski[i];
          if (!(w > 0)) continue;
          const p = i * 4;
          data[p] = vari[0];
          data[p + 1] = vari[1];
          data[p + 2] = vari[2];
          data[p + 3] = Math.round(255 * Math.min(1, w));
        }
      }, { nimi: 'vanha', alku: 0 });
    }
    if (retkiKentta && retkiAsetus) {
      const c = virranVari(retkiAsetus.vari, 0);
      tila.retkiKalvo = teeKalvo((data) => {
        for (let i = 0; i < retkiKentta.length; i += 1) {
          if (!(retkiKentta[i] > 0)) continue;
          const p = i * 4;
          data[p] = c.vanha[0];
          data[p + 1] = c.vanha[1];
          data[p + 2] = c.vanha[2];
          data[p + 3] = 255;
        }
      }, { nimi: 'retki', alku: 0 });
    }
  };

  /** Vanhan väestön peitto kellon mukaan: näkyy 300–40 ka, häipyy 46 → 40 ka. */
  const vanhanPeitto = (nyt) => {
    const v = aineisto.vanha;
    if (!v) return 0;
    const [n0, n1] = v.nakyy ?? [300000, 40000];
    if (!(nyt <= n0 && nyt > n1)) return 0;
    const [h0, h1] = v.haipyy ?? [46000, 40000];
    const haipy = nyt >= h0 ? 1 : Math.max(0, (nyt - h1) / (h0 - h1));
    return (v.vari?.peitto ?? 0.34) * haipy;
  };

  /**
   * Retken peitto: läikkä syttyy lähteidensä aikaan ja sammuu
   * `sammuu`-välillä. Kerran maalattu kangas ei kasva, joten kasvu
   * näytetään peiton nousuna (125 → 95 ka).
   */
  const retkenPeitto = (nyt) => {
    const r = aineisto.retki;
    if (!r) return 0;
    const ajat = (r.lahteet ?? []).map((l) => l.aika).filter((a) => a > 0);
    const alku = ajat.length ? Math.max(...ajat) : 125000;
    const taysi = ajat.length ? Math.min(...ajat) : 95000;
    const [s0, s1] = r.sammuu ?? [78000, 70000];
    if (nyt > alku || nyt <= s1) return 0;
    const nousu = nyt >= taysi ? Math.max(0, (alku - nyt) / Math.max(1, alku - taysi)) : 1;
    const haipy = nyt >= s0 ? 1 : Math.max(0, (nyt - s1) / (s0 - s1));
    return (r.peitto ?? 0.6) * Math.min(nousu, haipy);
  };

  const paivitaKalvojenPeitto = (nyt) => {
    for (const kerros of tila.kalvot) {
      const kohde = kerros.nimi.endsWith('vanha') ? vanhanPeitto(nyt) : retkenPeitto(nyt);
      /*
       * PEITTO KIRJOITETAAN JOKA PÄIVITYKSELLÄ, ei vain sen
       * muuttuessa: kalvokerros ajaa oman sisääntulohäiveensä
       * (linssit.js haivyta) asynkronisesti ja kirjoittaa opacityn
       * yli. Yhden liukuluvun kirjoitus 12 Hz on ilmaista, ja näin
       * häive ja kello eivät voi jäädä eri mielisiksi (vanhan väestön
       * harmaa jäi muuten kokonaan näkymättömiin — mitattu selaimessa
       * 6.9.2026).
       */
      const m = kalvonMateriaali(kerros);
      if (!m) continue;
      kerros.peitto = kohde;
      if (Math.abs(m.opacity - kohde) < 0.001 && m.visible === kohde > 0.002) continue;
      m.opacity = kohde;
      m.transparent = true;
      m.visible = kohde > 0.002;
      lauta.heraa?.();
    }
  };

  /* -------------------------------------------------------------- vanat */

  const teeVanat = (vanat, kotipesat) => {
    if (!vanat?.length || tila.vanat) return;
    tila.vanat = luoVanat({
      pallo: lauta.pallo,
      kotelo,
      reitit: lauta.reitit,
      vanat,
      kotipesat,
      virrat: aineisto.virrat,
      reduced,
    });
  };

  /**
   * Koko kangas hetkelle `nyt`. Läpikäynti vain aktiivisten pikselien
   * listaa (n. 270 000), muu jää läpinäkyväksi. Kerrokset yhdistetään
   * PÄÄLLEKKÄIN peittävyyden mukaan (premultiplied over): virran väri
   * päällimmäisenä, sitten sammuva retki, vanha väestö ja nauhan meri.
   * Rannikolla ja alueiden rajoilla jokaisella kerroksella on osittainen
   * paino, ja yhdistäminen antaa pehmeän reunan.
   */
  const maalaa = (nyt) => {
    if (!kuva || !tila.tarkka) return;
    const {
      indeksi, aika, paino, virta, virta2, sekoitus, meri, meriPaino, meriVirta, retki, retkiPaino, vanha,
    } = tila.tarkka;
    const data = kuva.data;
    data.fill(0);
    paivitaSavyt(nyt);
    const askelittain = reduced;
    const retkiAsetus = aineisto.retki;
    const vanhaAsetus = aineisto.vanha;
    const retkiNakyy = Boolean(retki && retkiAsetus && nyt > retkiAsetus.sammuu[1]);
    const vanhaNakyy = Boolean(vanha && vanhaAsetus && nyt > vanhaAsetus.nakyy[1] && nyt <= vanhaAsetus.nakyy[0]);
    let retkiHaipy = 0;
    if (retkiNakyy) {
      const [s0, s1] = retkiAsetus.sammuu;
      retkiHaipy = nyt >= s0 ? 1 : (nyt - s1) / (s0 - s1);
    }
    let vanhaHaipy = 0;
    if (vanhaNakyy) {
      const [h0, h1] = vanhaAsetus.haipyy;
      vanhaHaipy = nyt >= h0 ? 1 : (nyt - h1) / (h0 - h1);
    }
    const retkiPeitto = retkiAsetus?.peitto ?? 0.6;
    const vanhaPeitto = vanhaAsetus?.vari?.peitto ?? 0.34;
    const peittoVanha = peitto.vanha;
    const peittoEro = peitto.rintama - peitto.vanha;
    const peittoMeri = peitto.meri;
    /*
     * Pikselin tila ilman oliota: sama kaava kuin ruudunTila
     * (js/aikajana-virrat-laskenta.js, testattu siellä), mutta 270 000
     * pikseliä kehyksessä ei saa varata 270 000 oliota. Tulos jää
     * muuttujiin tW (paino) ja tP (peitto).
     */
    const leveys = rintamanLeveys(nyt);
    const nousu = Math.max(NOUSUN_MIN_V, NOUSUN_OSUUS * nyt);
    let tW = 0;
    let tP = 0;
    const tilaan = (a) => {
      if (!(a > 0)) { tW = 0; tP = 0; return; }
      const ika = a - nyt;
      if (ika < 0) {
        tW = 1;
        if (askelittain) { tP = 0; return; }
        const x = 1 + ika / nousu;
        tP = x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x);
        return;
      }
      tP = 1;
      tW = Math.max(0, 1 - ika / leveys);
    };
    for (let k = 0; k < indeksi.length; k += 1) {
      let A = 0;
      let R = 0;
      let G = 0;
      let B = 0;
      // 1. Virran väri.
      const pw = paino[k];
      if (pw) {
        tilaan(aika[k]);
        if (tP > 0) {
          const a = (peittoVanha + peittoEro * tW) * tP * (pw / 255);
          const s1 = savyt[virta[k]];
          let r = s1[0] + (s1[3] - s1[0]) * tW;
          let g = s1[1] + (s1[4] - s1[1]) * tW;
          let b = s1[2] + (s1[5] - s1[2]) * tW;
          const sk = sekoitus[k];
          if (sk) {
            // Alueiden raja: toisen virran sävy sekoittuu painonsa verran.
            const s2 = savyt[virta2[k]];
            const f = sk / 255;
            r += (s2[0] + (s2[3] - s2[0]) * tW - r) * f;
            g += (s2[1] + (s2[4] - s2[1]) * tW - g) * f;
            b += (s2[2] + (s2[5] - s2[2]) * tW - b) * f;
          }
          R = r * a;
          G = g * a;
          B = b * a;
          A = a;
        }
      }
      // 2. Sammuva retki (Skhul, Al Wusta).
      if (retkiNakyy && A < 1 && retkiPaino[k]) {
        tilaan(retki[k]);
        if (tP > 0) {
          const a = retkiPeitto * tP * retkiHaipy * (retkiPaino[k] / 255) * (1 - A);
          R += (retkiSavy[0] + (retkiSavy[3] - retkiSavy[0]) * tW) * a;
          G += (retkiSavy[1] + (retkiSavy[4] - retkiSavy[1]) * tW) * a;
          B += (retkiSavy[2] + (retkiSavy[5] - retkiSavy[2]) * tW) * a;
          A += a;
        }
      }
      // 3. Vanha väestö harmaana.
      if (vanhaNakyy && A < 1 && vanha[k]) {
        const a = vanhaPeitto * vanhaHaipy * (vanha[k] / 255) * (1 - A);
        R += harmaa[0] * a;
        G += harmaa[1] * a;
        B += harmaa[2] * a;
        A += a;
      }
      // 4. Nauhan meri.
      const mp = meriPaino[k];
      if (mp && A < 1) {
        tilaan(meri[k]);
        if (tP > 0) {
          const a = peittoMeri * tP * (mp / 255) * (1 - A);
          const s = savyt[meriVirta[k]];
          R += (s[0] + (s[3] - s[0]) * tW) * a;
          G += (s[1] + (s[4] - s[1]) * tW) * a;
          B += (s[2] + (s[5] - s[2]) * tW) * a;
          A += a;
        }
      }
      if (!(A > 0)) continue;
      const p = indeksi[k] * 4;
      data[p] = R / A;
      data[p + 1] = G / A;
      data[p + 2] = B / A;
      data[p + 3] = A * 255;
    }
    ctx.putImageData(kuva, 0, 0);
    if (!tila.kalvo) {
      // Kalvo vasta ensimmäisen maalauksen jälkeen: tyhjä kangas ei
      // sytyttäisi tekstuuria eikä häivytystä.
      tila.kalvo = lauta.linssit.kalvo(osa, { kuva: kangas, peittavyys: 1 });
    } else {
      tila.kalvo.paivita?.();
    }
  };

  /* ------------------------------------------------------------ kamera */

  const kamera = () => ajo.kamera?.() ?? lauta.kamera ?? null;

  /**
   * Onko seuraaminen päällä juuri nyt (moottori kysyy ennen omaa
   * ajoaan). VANOILLA MYÖS LOPUSSA: kamera perääntyy koko pallon
   * näkymään omalla säännöllään, eikä moottorin `sovitaKaareen` saa
   * ajaa sen päälle (js/aikajana.js lopeta).
   */
  const ohjaaKameraa = () => !reduced && !tila.purettu && Boolean(tila.kentat)
    && ajo.tila.i >= 0 && (vanatKaytossa || !ajo.loppu) && performance.now() >= tila.keskeytettyAsti;

  const kuvasuhde = () => (kotelo?.clientWidth && kotelo?.clientHeight
    ? kotelo.clientWidth / kotelo.clientHeight : 1);

  /**
   * Uusi kohde: SELKÄRANGAN KÄRKI (luku 3.2). Kamera on aina yhdellä
   * polulla eikä hyppää — vain kohde lasketaan toisin kuin kalvon
   * aikaan, jolloin sitä veti rintamien painopiste.
   */
  const paivitaKohde = (nyt) => {
    const karki = tila.vanat?.karki(nyt, { ennakko: VANAN_ENNAKKO }) ?? null;
    // Loppu: kärki on perillä ja kello on ajanut kaaren läpi.
    const lopunOsuus = tila.lopunAlku
      ? Math.min(1, (performance.now() - tila.lopunAlku) / LOPUN_PERAYTYMINEN_MS)
      : 0;
    const kohde = kameranKohde({
      karki,
      pov: tila.pov,
      kuvapysakki: performance.now() < tila.kuvapysakkiAsti ? tila.kuvapysakki : null,
      lopunOsuus,
      kuvasuhde: kuvasuhde(),
    });
    if (kohde) tila.kohde = kohde;
  };

  /** Kameran liuku kohdetta kohti: pov += (kohde − pov)·(1 − e^(−dt/τ)). */
  const liuutaKamera = (dt) => {
    const k = kamera();
    if (!k?.ajaKamera || !tila.kohde) return;
    if (!tila.pov) {
      const nyt = lauta.pallo?.pointOfView?.();
      const alue = k.nakyvaAlue?.();
      if (!nyt) return;
      tila.pov = { lat: nyt.lat, lng: nyt.lng, leveys: alue?.w ?? tila.kohde.leveys };
    }
    const h = 1 - Math.exp(-dt / KAMERAN_TAU_KORKEUS);
    let s = 1 - Math.exp(-dt / KAMERAN_TAU_SIJAINTI);
    let dLng = tila.kohde.lng - tila.pov.lng;
    while (dLng > 180) dLng -= 360;
    while (dLng < -180) dLng += 360;
    /*
     * Panorointikatto: pyrähdyksessä kamera jää jälkeen ja leveys
     * kasvaa. Katto mitataan siitä kaaresta, jonka askel TODELLA
     * kulkee (lat/lng-liuku ei kulje isoympyrää pitkin), jotta raja
     * pitää myös suurilla leveysasteilla.
     */
    const katto = KAMERAN_SUURIN_SIIRTO_AST * dt;
    const askel = (osuus) => ({
      lat: tila.pov.lat + (tila.kohde.lat - tila.pov.lat) * osuus,
      lng: tila.pov.lng + dLng * osuus,
    });
    const kuljettu = kulmaEtaisyys(tila.pov, askel(s));
    if (kuljettu > katto && kuljettu > 0) s *= katto / kuljettu;
    tila.pov.lat += (tila.kohde.lat - tila.pov.lat) * s;
    tila.pov.lng += dLng * s;
    while (tila.pov.lng > 180) tila.pov.lng -= 360;
    while (tila.pov.lng < -180) tila.pov.lng += 360;
    // Korkeus logaritmisesti, kuten laudan oma ajo.
    tila.pov.leveys = Math.exp(Math.log(tila.pov.leveys) + (Math.log(tila.kohde.leveys) - Math.log(tila.pov.leveys)) * h);
    k.ajaKamera({ lat: tila.pov.lat, lng: tila.pov.lng, leveys: tila.pov.leveys }, { kesto: 0 });
  };

  /** Pelaajan ele pallolla keskeyttää seuraamisen hetkeksi. */
  const keskeyta = () => {
    tila.keskeytettyAsti = performance.now() + KESKEYTYS_MS;
    // Jatkettaessa liuku lähtee siitä, mihin pelaaja jätti näkymän.
    tila.pov = null;
  };
  const kotelo = lauta.kotelo ?? null;
  const eleet = ['pointerdown', 'wheel', 'touchstart'];
  if (kotelo) for (const laji of eleet) kotelo.addEventListener(laji, keskeyta, { passive: true });

  /* ------------------------------------------------------- kuvakehykset */

  /** Kehys pysäkille i lampun elementtiin. */
  const teeKehys = (i, t, g) => {
    if (!g || tila.kehykset.has(i)) return;
    const osoite = t?.ilmio?.osoite ?? t?.kuva?.osoite ?? null;
    if (!osoite) return;
    const kehys = document.createElement('div');
    kehys.className = 'aikajana-virta-kuva';
    kehys.setAttribute('aria-hidden', 'true');
    const img = document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    img.src = osoite;
    kehys.appendChild(img);
    g.appendChild(kehys);
    tila.kehykset.set(i, kehys);
    // Poksahdus seuraavassa kehyksessä, jotta siirtymä lähtee nollasta.
    if (reduced) kehys.classList.add('esilla');
    else requestAnimationFrame(() => kehys.classList.add('esilla'));
  };

  /** Kehysten koot: nykyinen täysi, menneet pienet, tulevat piilossa. */
  const asetteleKehykset = (nykyinen) => {
    // Selailussa (siirry) menneet pysäkit eivät ole syttyneet kellosta:
    // niiden kehykset tehdään tässä moottorin lampuista.
    for (let k = 0; k <= nykyinen; k += 1) {
      const t = ajo.tapahtumat[k];
      if (t?.hiljainen) { teePiste(k, ajo.valot?.[k]?.g ?? null); continue; }
      if (!tila.kehykset.has(k)) teeKehys(k, t, ajo.valot?.[k]?.g ?? null);
    }
    for (const [k, kehys] of tila.kehykset) {
      kehys.classList.toggle('pieni', k < nykyinen);
      kehys.classList.toggle('esilla', k <= nykyinen);
    }
    tila.nykyinen = nykyinen;
  };

  /**
   * HILJAISEN PYSÄKIN PISTE. Kuusi kuvapysäkkiä poksahtaa kehyksenä;
   * loput neljätoista ovat todisteita, jotka merkitään pienenä
   * pisteenä kellon ohittaessa ne — ja pisteet jäävät lopun koko
   * pallon näkymään (suunnitelman luku 4). Lippu tulee linssiltä
   * (V4); ilman sitä jokainen pysäkki poksahtaa kuten ennen.
   */
  const teePiste = (i, g) => {
    if (!g || tila.pisteet.has(i)) return;
    const piste = document.createElement('div');
    piste.className = 'aikajana-virta-piste';
    piste.setAttribute('aria-hidden', 'true');
    g.appendChild(piste);
    tila.pisteet.set(i, piste);
    if (reduced) piste.classList.add('esilla');
    else requestAnimationFrame(() => piste.classList.add('esilla'));
  };

  const sytyta = (i, t, g) => {
    if (t?.hiljainen) { teePiste(i, g); return; }
    teeKehys(i, t, g);
    asetteleKehykset(i);
    /*
     * KUVAPYSÄKIN KEHYSTYS: kärki ja pysäkki samaan kuvaan kuudeksi
     * sekunniksi, jotta poksahdus näkyy aina ruudulla (nuolta ei enää
     * ole). Al Wusta on kärjestä 1 745 km ja Monte Verde 2 839 km.
     */
    if (vanatKaytossa && Number.isFinite(t?.lat) && Number.isFinite(t?.lon)) {
      tila.kuvapysakki = { lat: t.lat, lng: t.lon };
      tila.kuvapysakkiAsti = performance.now() + KUVAPYSAKIN_KEHYSTYS_MS;
    }
  };

  const siirry = (i) => {
    // Selailu on pelaajan oma ele: kamera saa käydä pysäkillä.
    keskeyta();
    asetteleKehykset(i);
  };

  /* ------------------------------------------------------------ silmukka */

  const silmukka = (nyt) => {
    if (tila.purettu || ajo.ui?.dead) return;
    tila.kehys = requestAnimationFrame(silmukka);
    if (!(vanatKaytossa ? tila.kentat : tila.tarkka)) return;
    // Kehysväli sekunteina; katto sekunti, jottei paluu taustalta hyppää.
    const dt = Math.min(1, Math.max(0, (nyt - (tila.viimeKehys || nyt)) / 1000));
    tila.viimeKehys = nyt;
    const vuosia = lukema();
    // Hidas laite: väli venyy maalauksen keston mukaan, jottei
    // maalaus syö koko kehysaikaa (mitattu kontin ohjelmisto-WebGL:llä).
    const vali = reduced
      ? VIRTOJEN_ASKEL_MS
      : Math.max(VIRTOJEN_PAIVITYS_MS, PAIVITYSVALIN_KERROIN * (tila.maalausMs ?? 0));
    if (nyt - tila.viimePaivitys >= vali && (vuosia !== tila.viimeNyt)) {
      tila.viimePaivitys = nyt;
      tila.viimeNyt = vuosia;
      if (vanatKaytossa) {
        // Vanan kasvu ja kärkivärit; kalvoista muuttuu vain peitto.
        tila.vanat?.paivita(vuosia);
        paivitaKalvojenPeitto(vuosia);
      } else {
        const alku = performance.now();
        maalaa(vuosia);
        tila.maalausMs = performance.now() - alku;
      }
    }
    /*
     * LOPUN PERÄYTYMINEN alkaa, kun kello on ajanut kaaren läpi
     * (moottori on loppusanoissa): kohde siirtyy lopun keskipisteeseen
     * ja leveys kasvaa koko laudan mittaan kahdeksassa sekunnissa.
     */
    if (vanatKaytossa && ajo.loppu && !tila.lopunAlku) tila.lopunAlku = nyt;
    if (ohjaaKameraa()) {
      if (nyt - tila.viimeKamera >= KAMERAN_LASKENTA_MS) {
        tila.viimeKamera = nyt;
        paivitaKohde(vuosia);
      }
      liuutaKamera(dt);
    }
  };

  const pura = () => {
    tila.purettu = true;
    cancelAnimationFrame(tila.kehys);
    clearTimeout(tila.ajastin);
    tila.tyosaie?.terminate();
    tila.tyosaie = null;
    if (kotelo) for (const laji of eleet) kotelo.removeEventListener(laji, keskeyta);
    tila.vanat?.pura();
    tila.vanat = null;
    // Kerran maalatut kalvot ovat omia osiaan: ne puretaan tässä.
    for (const kerros of tila.kalvot) kerros.kahva?.pura?.();
    tila.kalvot = [];
    for (const kehys of tila.kehykset.values()) kehys.remove();
    tila.kehykset.clear();
    for (const piste of tila.pisteet.values()) piste.remove();
    tila.pisteet.clear();
    // Kalvo on laudan osan kerros: moottorin `linssit.pura(PALLON_OSA)`
    // vie sen samalla kuin merkit — täältä sitä ei pureta, jottei osan
    // purku veisi lamppuja kesken siirtymän.
    tila.kalvo = null;
    tila.kentat = null;
    tila.tarkka = null;
    // Purettu kesken laskennan: odottaja ei saa jäädä roikkumaan.
    ilmoitaValmis?.();
    ilmoitaValmis = null;
  };

  laske();
  tila.kehys = requestAnimationFrame(silmukka);

  return {
    ohjaaKameraa,
    sytyta,
    siirry,
    pura,
    valmis,
    /** Seuraaminen heti takaisin (savukkeet ja kuvakaappaukset). */
    jatkaSeuranta: () => { tila.keskeytettyAsti = 0; tila.pov = null; },
    /** Mittareita savukkeille: onko kenttä laskettu, kangas ja kohde. */
    tila: () => ({
      valmis: Boolean(vanatKaytossa ? tila.kentat : tila.tarkka),
      aktiivisia: tila.tarkka?.indeksi.length ?? 0,
      kalvo: Boolean(tila.kalvo),
      kohde: tila.kohde,
      kehyksia: tila.kehykset.size,
      /** Vanamoduulin mittarit ja kerran maalatut kalvot (savuke). */
      vanoja: tila.vanat?.tila().vanoja ?? 0,
      karki: tila.vanat?.karki(tila.viimeNyt) ?? null,
      kalvoja: tila.kalvot.length,
      maalattuKerran: tila.maalauksia,
      kameranLeveys: tila.pov?.leveys ?? null,
      pisteita: tila.pisteet.size,
      vanat: vanatKaytossa,
      /** Viimeisen kankaan maalauksen kesto (ms) — puhelimen mittari. */
      maalausMs: tila.maalausMs ?? null,
      /** Missä laskenta ajettiin: 'tyosaie' tai 'paasaie'. */
      tyo: tila.tyo,
      kerroin,
    }),
    kangas,
  };
}
