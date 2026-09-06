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
 *   3. PYSÄKKIKUVAT: syttyvän pysäkin havainnekuva poksahtaa pienenä
 *      kehyksenä lampun viereen ja kutistuu seuraavan syttyessä
 *      (päätös 4). Ruudun ulkopuolella olevalle pysäkille reunaan tulee
 *      pieni nuoli — kamera ei lähde sen perään.
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
  puraMaamaski, puraPeitto, laskeKentatVaiheittain, tarkennaKentat, virranVari, rintamienPainopisteet,
  rintamanLeveys, kameranLeveysAsteina, NOUSUN_MIN_V, NOUSUN_OSUUS, RUUDUKON_LEVEYS, RUUDUKON_KORKEUS,
} from './aikajana-virrat-laskenta.js';

/** Kankaan päivitysväli (ms): ~12 Hz riittää silmälle. */
export const VIRTOJEN_PAIVITYS_MS = 80;
/** Reduced motion: askelittain, puolen sekunnin välein. */
export const VIRTOJEN_ASKEL_MS = 500;
/** Hidas laite: päivitysväli vähintään tämä kerroin × maalauksen kesto. */
export const PAIVITYSVALIN_KERROIN = 3;
/** Kameran painopisteen laskentaväli (ms). */
export const KAMERAN_LASKENTA_MS = 250;
/** Kameran liu'un aikavakiot (s): sijainti ja korkeus (luku 6). */
export const KAMERAN_TAU_SIJAINTI = 1.5;
export const KAMERAN_TAU_KORKEUS = 2.5;
/** Pelaajan ele keskeyttää seuraamisen tämän ajan (ms). */
export const KESKEYTYS_MS = 8000;
/** Kalvon pikseleitä per ruutu sivullaan (2 → 1440 × 720). */
export const PIIRTOKERROIN = 2;
/** Työsäikeen moduuli suhteessa sivun juureen (sw.js SHELL kantaa sen). */
export const TYOSAIKEEN_POLKU = 'js/aikajana-virrat-tyo.js';
/** Lautayksikköä astetta kohti (js/aikajana.js LAUTAYKSIKKOA_ASTEELLA). */
const LAUTAYKSIKKOA_ASTEELLA = 12000 / 360;
/** Virran painon tasoitus (0–1): uusi mittaus painaa tämän verran. */
const PAINON_TASOITUS = 0.25;
/** Kuvakehyksen leveys pikseleinä (css .aikajana-virta-kuva). */
export const KUVAKEHYKSEN_LEVEYS = 72;

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
    // Kamera: seurattava virta, kohde ja liukuva näkymä.
    painot: new Map(),
    kohde: null,
    pov: null,
    keskeytettyAsti: 0,
    // Kehykset pysäkeittäin ja nuoli.
    kehykset: new Map(),
    nykyinen: -1,
    nuoli: null,
    ajastin: 0,
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

  const valmistele = (kentat, tarkka) => {
    if (tila.purettu) return;
    tila.kentat = kentat;
    tila.tarkka = tarkka;
    tila.viimeNyt = -1;
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
      const { kentat, tarkka, virhe } = viesti.data ?? {};
      if (virhe || !kentat || !tarkka) { varapolku(virhe ?? 'tyhjä vastaus'); return; }
      ratkaistu = true;
      tyosaie.terminate();
      tila.tyosaie = null;
      valmistele(kentat, tarkka);
    });
    tyosaie.postMessage({
      aineisto: {
        virrat: aineisto.virrat, retki: aineisto.retki ?? null, vanha: aineisto.vanha ?? null, maamaski: aineisto.maamaski,
      },
      kerroin,
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

  /** Onko seuraaminen päällä juuri nyt (moottori kysyy ennen omaa ajoaan). */
  const ohjaaKameraa = () => !reduced && !tila.purettu && Boolean(tila.kentat)
    && ajo.tila.i >= 0 && !ajo.loppu && performance.now() >= tila.keskeytettyAsti;

  /** Uusi kohde painopisteistä: aktiivisin virta tasoitetulla painolla. */
  const paivitaKohde = (nyt) => {
    const pisteet = rintamienPainopisteet(tila.kentat, nyt, { leveys: W, korkeus: H });
    const nahdyt = new Set();
    for (const p of pisteet) {
      nahdyt.add(p.virta);
      const vanha = tila.painot.get(p.virta) ?? 0;
      tila.painot.set(p.virta, vanha + (p.paino - vanha) * PAINON_TASOITUS);
    }
    for (const [v, paino] of tila.painot) {
      if (!nahdyt.has(v)) tila.painot.set(v, paino * (1 - PAINON_TASOITUS));
    }
    let paras = null;
    let parasPaino = 0;
    for (const p of pisteet) {
      const paino = tila.painot.get(p.virta) ?? 0;
      if (paino > parasPaino) { parasPaino = paino; paras = p; }
    }
    if (!paras) return;
    /*
     * Näkyvä leveys on ruudun LEVEYS lautayksikköinä. Pystyruudulla
     * (puhelin) sama mitta veisi kameran kattoon asti, joten leveys
     * skaalataan kuvasuhteella: rintama mahtuu ruudun korkeuteen.
     */
    const kuvasuhde = kotelo?.clientWidth && kotelo?.clientHeight ? kotelo.clientWidth / kotelo.clientHeight : 1;
    tila.kohde = {
      lat: paras.lat,
      lng: paras.lon,
      leveys: kameranLeveysAsteina(paras.hajonta) * LAUTAYKSIKKOA_ASTEELLA * Math.min(1, kuvasuhde),
    };
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
    const s = 1 - Math.exp(-dt / KAMERAN_TAU_SIJAINTI);
    const h = 1 - Math.exp(-dt / KAMERAN_TAU_KORKEUS);
    let dLng = tila.kohde.lng - tila.pov.lng;
    while (dLng > 180) dLng -= 360;
    while (dLng < -180) dLng += 360;
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
      if (!tila.kehykset.has(k)) teeKehys(k, ajo.tapahtumat[k], ajo.valot?.[k]?.g ?? null);
    }
    for (const [k, kehys] of tila.kehykset) {
      kehys.classList.toggle('pieni', k < nykyinen);
      kehys.classList.toggle('esilla', k <= nykyinen);
    }
    tila.nykyinen = nykyinen;
  };

  const sytyta = (i, t, g) => {
    teeKehys(i, t, g);
    asetteleKehykset(i);
  };

  const siirry = (i) => {
    // Selailu on pelaajan oma ele: kamera saa käydä pysäkillä.
    keskeyta();
    asetteleKehykset(i);
  };

  /* -------------------------------------------------------------- nuoli */

  /*
   * Nuoli asuu PALLON KOTELOSSA, ei linssin juuressa (hionta 6.9.2026):
   * kotelo on linssin ajaksi oma pinontayhteytensä linssin elementtien
   * alla (css/aikajana.css isolation), joten nuoli jää kellon, korttien
   * ja paneelin alle kuten lamput ja kehykset. Paikka lasketaan kotelon
   * mitoista, jotka ovat samat kuin ennen.
   */
  const nuoli = document.createElement('div');
  nuoli.className = 'aikajana-virta-nuoli';
  nuoli.hidden = true;
  nuoli.setAttribute('aria-hidden', 'true');
  (kotelo ?? ajo.juuri)?.appendChild(nuoli);
  tila.nuoli = nuoli;

  /** Nuoli reunaan, jos nykyinen pysäkki on ruudun ulkopuolella (edessä). */
  const paivitaNuoli = () => {
    const i = tila.nykyinen;
    const t = i >= 0 ? ajo.tapahtumat[i] : null;
    if (!t || !kotelo || !Number.isFinite(t.lat) || !Number.isFinite(t.lon)) { nuoli.hidden = true; return; }
    const leveys = kotelo.clientWidth;
    const korkeus = kotelo.clientHeight;
    // Suuri vara: null vain pallon takana olevalle.
    const p = lauta.ruudulla?.(t.lat, t.lon, 1e6) ?? null;
    if (!p || (p.x >= 0 && p.y >= 0 && p.x <= leveys && p.y <= korkeus)) { nuoli.hidden = true; return; }
    const cx = leveys / 2;
    const cy = korkeus / 2;
    const dx = p.x - cx;
    const dy = p.y - cy;
    const vara = 26;
    const kerroinR = Math.min((cx - vara) / Math.abs(dx || 1e-6), (cy - vara) / Math.abs(dy || 1e-6));
    const x = cx + dx * kerroinR;
    const y = cy + dy * kerroinR;
    const kulma = Math.atan2(dy, dx) * (180 / Math.PI);
    nuoli.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px) rotate(${Math.round(kulma)}deg)`;
    nuoli.hidden = false;
  };

  /* ------------------------------------------------------------ silmukka */

  const silmukka = (nyt) => {
    if (tila.purettu || ajo.ui?.dead) return;
    tila.kehys = requestAnimationFrame(silmukka);
    if (!tila.tarkka) return;
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
      const alku = performance.now();
      maalaa(vuosia);
      tila.maalausMs = performance.now() - alku;
    }
    if (ohjaaKameraa()) {
      if (nyt - tila.viimeKamera >= KAMERAN_LASKENTA_MS) {
        tila.viimeKamera = nyt;
        paivitaKohde(vuosia);
      }
      liuutaKamera(dt);
    }
    if (nyt - tila.viimeNuoli >= 100 || !tila.viimeNuoli) {
      tila.viimeNuoli = nyt;
      paivitaNuoli();
    }
  };

  const pura = () => {
    tila.purettu = true;
    cancelAnimationFrame(tila.kehys);
    clearTimeout(tila.ajastin);
    tila.tyosaie?.terminate();
    tila.tyosaie = null;
    if (kotelo) for (const laji of eleet) kotelo.removeEventListener(laji, keskeyta);
    nuoli.remove();
    for (const kehys of tila.kehykset.values()) kehys.remove();
    tila.kehykset.clear();
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
  tila.viimeNuoli = 0;
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
      valmis: Boolean(tila.tarkka),
      aktiivisia: tila.tarkka?.indeksi.length ?? 0,
      kalvo: Boolean(tila.kalvo),
      kohde: tila.kohde,
      kehyksia: tila.kehykset.size,
      nuoli: !nuoli.hidden,
      /** Viimeisen kankaan maalauksen kesto (ms) — puhelimen mittari. */
      maalausMs: tila.maalausMs ?? null,
      /** Missä laskenta ajettiin: 'tyosaie' tai 'paasaie'. */
      tyo: tila.tyo,
      kerroin,
    }),
    kangas,
  };
}
