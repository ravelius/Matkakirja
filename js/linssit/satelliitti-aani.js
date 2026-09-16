/*
 * ══════════════════════════════════════════════════════════════════
 * ASTRONAUTIN KAMERAN OMA ÄÄNIMAAILMA — ASEMAN HUMINA JA MUSIIKKI
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJA 16.9.2026 klo 06.15 UTC, sanatarkasti: *"Generoi tälle
 * linssille oma taustaääni, mikä saisi olla avaruusaiheinen."* — ja
 * klo 07.20 UTC: *"Avaruuslinssiin voisi tehdä myös oman
 * taustamusiikin avaruusteemalla"*. Raamattu (ASTRONAUTIN KAMERA:
 * VALOKUVANAKYMA UUSIKSI 2, kohdat 8, 14 ja 17): yksi yhteinen humina
 * JA sen LISÄKSI yksi yhteinen avaruusteemainen musiikki; hampurilaisen
 * äänikytkin ohjaa molempia.
 *
 * ------------------------------------------------------------------
 * MIKSI TÄMÄ EI OLE js/siirtymamusiikki.js:N VIIDES LAJI
 * ------------------------------------------------------------------
 *
 * Siirtymä- ja linssiraidat soitetaan `<audio loop>`-elementillä. Se
 * riittää raidalle, jonka sauma osuu kohtaukseen harvoin — mutta EI
 * riitä tälle. Codexin toimittama humina (posti/codex-fable-
 * astronautin-kamera-r2-valmis-20260916.md) on 84 s pitkä ja siinä on
 * 1,5 sekunnin RISTIHÄIVYTYS luupin saumassa juuri siksi, ettei
 * katkaisukohta kuuluisi. Selaimen oma `loop` katkaisee nauhan pään
 * alkuun kuin veitsellä ja lisää dekooderin mukaan pienen tauon —
 * ristihäivytys menisi hukkaan ja sauma kuuluisi 84 sekunnin välein.
 *
 * Siksi tämä moduuli tekee sen, mitä Codex pyysi: noutaa tavut
 * kerran, purkaa ne `decodeAudioData`lla ja soittaa
 * `AudioBufferSourceNode`illa, jossa `loop = true`. Silloin kierros
 * jatkuu näytetarkasti ilman uutta latausta, uutta soitinta ja uutta
 * feidiä — ja koska soitin ei ole elementti, `ended`-tapahtumaan
 * sidottua uudelleenkäynnistystä ei ole olemassakaan.
 *
 * ------------------------------------------------------------------
 * KAKSI KERROSTA, YKSI SOITIN JA YKSI FEIDI
 * ------------------------------------------------------------------
 *
 *   humina    aseman hiljainen pohja, −30,48 LUFS, 84 s, soi aina.
 *   musiikki  avaruusteemainen raita huminan PÄÄLLE — KYTKETTY POIS
 *             (omistaja 16.9.2026 kuunneltuaan: *"Jätä musiikki pois.
 *             Pidetään pelkkä humina."*). Kerros jää koodiin vakion
 *             ASTRONAUTIN_MUSIIKKI_KAYTOSSA taakse. Puuttuva raita on
 *             joka tapauksessa normaali tila eikä virhe (sama sääntö
 *             kuin js/siirtymamusiikki.js:ssä).
 *
 * Molemmat elävät SAMASSA soittimessa: yksi `avaaAstronautinAani`
 * koko linssille. Kohteen tai kuvan vaihto ei kutsu tätä lainkaan,
 * joten kierros ei nollaudu eikä feidi ala alusta. Sisääntulofeidi on
 * vain linssiin tultaessa: humina 2 s, musiikki 3 s.
 *
 * ------------------------------------------------------------------
 * TASO TULEE SAMASTA TOTUUDESTA KUIN MUU MUSIIKKI
 * ------------------------------------------------------------------
 *
 *   • pelin äänikonteksti (js/musiikkivahvistin.js musiikkiKonteksti)
 *     — EI omaa AudioContextia: toinen konteksti kilpailisi iOS:n
 *     äänisessiosta;
 *   • musiikin oma kytkin ja säädin (js/musiikkivalitsin.js
 *     musiikkiPaalla, musiikinKerroin) — rattaan liuku kuuluu heti;
 *   • luennan, pöllön ja lukijan väistö (js/ambience-stream.js
 *     lisaaVaistaja) — ja täsmälleen samalla poikkeuksella kuin
 *     linssiraidoilla: linssin OMA hiljennys (LINSSIN_HILJENNYS) ei
 *     väistä itseään, muuten linssi vaimentaisi oman äänensä puoleen
 *     koko ajoksi;
 * LINSSILLÄ EI OLE OMAA ÄÄNIKYTKINTÄ (omistaja 16.9.2026, Raamattu
 * LISÄYS 8): humina ja musiikki noudattavat PELIN YLEISTÄ
 * musiikkiasetusta (`matkakirja-musiikki`) täsmälleen kuten siirtymä-
 * ja linssiraidat. Kytkimen muutos kuuluu heti myös kesken linssin:
 * `kuunteleMusiikkitilaa` herättää tämän moduulin, joka pysäyttää tai
 * käynnistää kerrokset. Aiempi linssikohtainen avain
 * (`matkakirja-linssiaani`) on poistettu — kaksi säädintä samalle
 * asialle oli juuri se, mistä musiikin tasovika aikanaan alkoi.
 *
 * ------------------------------------------------------------------
 * AUTOPLAY-ESTO EI OLE VIRHE
 * ------------------------------------------------------------------
 *
 * Jos äänikonteksti on `suspended` (selain odottaa elettä), soitinta ei
 * rakenneta vaan jäädään odottamaan js/musiikkivahvistin.js:n
 * `kuunteleReitityksenAvautumista`-vahtia: se herättää meidät
 * ensimmäisestä napautuksesta, kosketuksesta tai näppäimestä. Mitään ei
 * kirjoiteta konsoliin — odottaminen on normaali tila.
 */
import { kuunteleReitityksenAvautumista, musiikkiKonteksti } from '../musiikkivahvistin.js';
import {
  kuunteleMusiikinKerrointa, kuunteleMusiikkitilaa, musiikinKerroin, musiikkiPaalla,
} from '../musiikkivalitsin.js';
import { lisaaVaistaja } from '../ambience-stream.js';
import { LINSSIN_HILJENNYS } from '../siirtymamusiikki.js';

/*
 * HUMINAN VERSIOITU OSOITE (Codex 16.9.2026, kuitti
 * tools/astronaut/delivery-receipt.json). Aliasta
 * `astronautin-kamera-tausta.mp3` EI käytetä: sama nimi ehti osoittaa
 * hylättyyn tuontikokeiluun, ja välimuistissa oleva vanha tavusarja
 * soisi ristihäivytyksen sijaan leikatun sauman. Versioitu polku on
 * SHA-256:n mukainen, joten se ei voi tarkoittaa mitään muuta.
 *
 * 1 345 091 tavua · 84 s · −30,48 LUFS · 1,5 s ristihäivytys saumassa.
 */
export const ASTRONAUTIN_HUMINA = 'https://media.matkakirja.app/matkakirja/aanet/linssit/'
  + 'astronautin-kamera/20260916/'
  + '93aaf7fb15092bac80abd1d740aa2a22a0fdb761558df2273673bc263fde2f2b.mp3';

/*
 * MUSIIKIN OSOITE JÄÄ, MUTTA MUSIIKKI EI SOI (omistaja 16.9.2026,
 * kuuntelun jälkeen, sanatarkasti: *"Jätä musiikki pois. Pidetään pelkkä
 * humina. Se musiikki oli vähän outo."*).
 *
 * Raita on ämpärissä (astronautin-kamera-musiikki-lyria.mp3), ja Raamatun
 * kohta 17 tilasi sen huminan lisäksi — mutta kuultuaan sen omistaja
 * peruutti. KOODIA EI POISTETA VAAN KYTKETÄÄN POIS: kerros, osoite ja
 * koko soitinkoneisto jäävät paikalleen yhden vakion taakse, joten uuden
 * raidan kokeilu on yhden rivin muutos eikä uusi toteutus. Pois
 * kytkettynä kerrosta EI ladata lainkaan — verkkoa ei kuluteta raidalla,
 * jota ei soiteta.
 */
export const ASTRONAUTIN_MUSIIKKI = 'https://media.matkakirja.app/matkakirja/aanet/linssit/'
  + 'astronautin-kamera-musiikki-lyria.mp3';

/** Soitetaanko musiikkikerros lainkaan? EI (omistaja 16.9.2026). */
export const ASTRONAUTIN_MUSIIKKI_KAYTOSSA = false;

/*
 * KERROSTEN VOIMAT — kuulokokeen nupit, kuten kaikki pelin äänitasot.
 *
 * Linssiraitojen voima on 0,11 ja niiden masterit ovat noin
 * −14,5 dBFS. Humina on −30,48 LUFS eli noin 16 dB hiljaisempi, joten
 * sama kuultava taso vaatisi kertoimen 0,11 × 10^(16/20) ≈ 0,69.
 * Humina ei kuitenkaan ole kappale vaan pohjaväri: se saa jäädä
 * selvästi sen alle (0,45 ≈ −3,7 dB linssiraidan tasosta).
 *
 * Musiikin voima on sama 0,11 kuin muilla Lyria-linssiraidoilla. Se on
 * yhä tässä, vaikka kerros on kytketty pois: jos omistaja joskus haluaa
 * toisen raidan, taso on jo mietitty eikä sitä tarvitse arvata uudelleen.
 */
export const KERROKSET = {
  humina: { osoite: ASTRONAUTIN_HUMINA, voima: 0.45, nousuMs: 2000 },
  musiikki: { osoite: ASTRONAUTIN_MUSIIKKI, voima: 0.11, nousuMs: 3000 },
};

/** Ulosfeidi linssistä poistuttaessa ja äänikytkintä sammutettaessa. */
const LASKU_MS = 600;

/*
 * PURETUT PUSKURIT ISTUNNON AJAKSI. Linssiin voi palata monta kertaa,
 * eikä 1,3 Mt:n humina saa latautua joka kerta uudelleen.
 * Arvo on lupaus: rinnakkaiset avaukset odottavat samaa hakua.
 */
const puskurit = new Map();
/** Kerrokset, joiden lataus on pettänyt pysyvästi (404, purkuvirhe). */
const puuttuvat = new Set();

/** Voimassa oleva väistö ja sen syyt (js/ambience-stream.js). */
let vaisto = 1;
let vaistonSyyt = [];
let vaistonPohja = 1;

/** Yksi soitin koko pelille: linssi on auki kerrallaan. */
let nykyinen = null;

/**
 * Kerroksen tavoitetaso juuri nyt.
 *
 * LINSSIN OMA HILJENNYS EI VÄISTÄ ITSEÄÄN: linssi kutsuu
 * `hiljennaAmbienssi(LINSSIN_HILJENNYS)` avatessaan, ja jos tämä ääni
 * kuuntelisi sitä, se vaimentaisi itsensä puoleen koko ajoksi. Pöllö,
 * kertoja ja lukija väistävät yhä (pohja seuraa niitä) — täsmälleen
 * sama sääntö kuin js/siirtymamusiikki.js lajinVaisto.
 */
export function astronautinTaso(nimi) {
  const kerros = KERROKSET[nimi];
  if (!kerros || !musiikkiPaalla()) return 0;
  const oma = vaistonSyyt.includes(LINSSIN_HILJENNYS) ? vaistonPohja : vaisto;
  return kerros.voima * oma * musiikinKerroin();
}

/**
 * Noutaa ja purkaa kerroksen äänitavut kerran istunnossa.
 *
 * TAVALLINEN `fetch`, EI js/media.js haeAani: haeAani kirjaisi
 * puuttuvan musiikin äänipeilin viaksi (`peiliPetti('aanet')`), ja
 * kolme sellaista sulkisi peilin myös äänimaisemilta, joilla
 * varareitti oikeasti on. Tämä on pelin oma äänite ämpärissä eikä
 * peilattu tiedosto: 404 kertoo vain, ettei raitaa vielä ole.
 */
async function haePuskuri(nimi, ctx) {
  /*
   * POIS KYTKETTYÄ KERROSTA EI LADATA. `kaynnista` palaa jo ennen tätä,
   * mutta sääntö kuuluu myös tänne: lataus on moduulin ainoa verkkokutsu,
   * eikä sitä saa tehdä raidalle, jota ei soiteta.
   */
  if (nimi === 'musiikki' && !ASTRONAUTIN_MUSIIKKI_KAYTOSSA) return null;
  if (puuttuvat.has(nimi)) return null;
  if (puskurit.has(nimi)) return puskurit.get(nimi);
  const osoite = KERROKSET[nimi]?.osoite;
  if (!osoite) return null;
  const lupaus = (async () => {
    const vastaus = await fetch(osoite, { mode: 'cors' });
    if (!vastaus.ok) throw new Error('http');
    return ctx.decodeAudioData(await vastaus.arrayBuffer());
  })().catch(() => {
    /*
     * PUUTTUVA RAITA ON NORMAALI TILA. Lippu on pysyvä tälle
     * istunnolle, jottei linssiin palaaminen tuota 404-sarjaa — ja
     * lupaus poistetaan välimuistista, ettei epäonnistunut lataus jää
     * torjumaan seuraavaa istuntoa.
     */
    puuttuvat.add(nimi);
    puskurit.delete(nimi);
    return null;
  });
  puskurit.set(nimi, lupaus);
  return lupaus;
}

/**
 * ASTRONAUTIN KAMERAN ÄÄNET PÄÄLLE.
 *
 * Palauttaa kahvan heti — mikään ei jää odottamaan verkkoa:
 *
 *   `pura()`         linssistä poistuminen: ulosfeidi, pysäytys ja
 *                    solmujen irrotus.
 *   `tila()`         mittari savukkeille ja vartijoille.
 *
 * Kytkintä ei ole: pelin yleinen musiikkiasetus ohjaa molempia
 * kerroksia (ks. moduulin alku, LISÄYS 8).
 */
export function avaaAstronautinAani() {
  /* Edellinen soitin pois: linssi on auki kerrallaan. */
  nykyinen?.pura?.();

  let elossa = true;
  /** nimi → { lahde, gain, aloitettu } */
  const soivat = new Map();
  let irrotaVahti = null;

  /** Pehmeä gain-ramppi äänisäikeellä; rAF jäätyy raskaassa piirrossa. */
  const liuta = (gain, ctx, kohde, kestoMs) => {
    try {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(Math.max(0, gain.gain.value), ctx.currentTime);
      gain.gain.linearRampToValueAtTime(Math.max(0, kohde), ctx.currentTime + Math.max(1, kestoMs) / 1000);
    } catch { /* konteksti kiinni — taso jää ennalleen */ }
  };

  /** Yksi kerros pysäytetään ja sen solmut irrotetaan. */
  const lopetaKerros = (nimi, kestoMs) => {
    const soiva = soivat.get(nimi);
    if (!soiva) return;
    soivat.delete(nimi);
    const ctx = soiva.ctx;
    liuta(soiva.gain, ctx, 0, kestoMs);
    const siivoa = () => {
      try { soiva.lahde.stop(); } catch { /* jo pysäytetty */ }
      try { soiva.lahde.disconnect(); } catch { /* jo irti */ }
      try { soiva.gain.disconnect(); } catch { /* jo irti */ }
    };
    if (kestoMs <= 0) { siivoa(); return; }
    setTimeout(siivoa, kestoMs + 60);
  };

  /**
   * Kerros käyntiin, jos sitä ei jo soi. EI KOSKAAN KAHTA SOITINTA
   * SAMASTA KERROKSESTA: kohteen ja kuvan vaihto ei kutsu tätä, ja
   * vahdin herätys tarkistaa `soivat`-taulukon ennen rakentamista.
   */
  const kaynnista = async (nimi) => {
    if (!elossa || soivat.has(nimi)) return;
    if (nimi === 'musiikki' && !ASTRONAUTIN_MUSIIKKI_KAYTOSSA) return;
    if (!musiikkiPaalla()) return;
    const ctx = musiikkiKonteksti();
    if (!ctx || ctx.state !== 'running' || typeof ctx.createBufferSource !== 'function') return;
    const puskuri = await haePuskuri(nimi, ctx);
    /* Lataus kesti: linssi on voitu sulkea tai kytkin sammuttaa sillä välin. */
    if (!puskuri || !elossa || !musiikkiPaalla() || soivat.has(nimi)) return;
    try {
      const lahde = ctx.createBufferSource();
      lahde.buffer = puskuri;
      /*
       * LOOP = TRUE ON KOKO PISTE. Ristihäivytys on äänitteessä, ja
       * näytetarkka kierros säilyttää sen: 84 sekunnin raja ei katkaise
       * eikä luo uutta soitinta.
       */
      lahde.loop = true;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      lahde.connect(gain).connect(ctx.destination);
      lahde.start();
      soivat.set(nimi, { lahde, gain, ctx, aloitettu: Date.now() });
      liuta(gain, ctx, astronautinTaso(nimi), KERROKSET[nimi].nousuMs);
    } catch { /* konteksti kaatui — linssi toimii ilman ääntä */ }
  };

  /** Molemmat kerrokset käyntiin sikäli kuin ne ovat olemassa. */
  const kaynnistaKaikki = () => {
    for (const nimi of Object.keys(KERROKSET)) kaynnista(nimi);
  };

  /** Soivien kerrosten taso uudelleen (säädin, väistö, kytkin). */
  const paivitaTasot = (kestoMs = 300) => {
    for (const [nimi, soiva] of soivat) {
      liuta(soiva.gain, soiva.ctx, astronautinTaso(nimi), kestoMs);
    }
  };

  const kahva = {
    /**
     * PELIN YLEINEN MUSIIKKIKYTKIN muuttui kesken linssin (LISÄYS 8).
     * Pois → molemmat kerrokset häivytetään ja pysäytetään; päälle →
     * ne käynnistyvät takaisin omalla sisääntulofeidillään.
     */
    musiikkiKytkin() {
      if (!elossa) return;
      if (musiikkiPaalla()) kaynnistaKaikki();
      else for (const nimi of [...soivat.keys()]) lopetaKerros(nimi, LASKU_MS);
    },
    /** Musiikin säädin tai väistö muuttui: soiva taso uudestaan. */
    paivita: paivitaTasot,
    /** Mittari savukkeille ja vartijoille. */
    tila() {
      const kerrokset = {};
      for (const nimi of Object.keys(KERROKSET)) {
        const soiva = soivat.get(nimi);
        kerrokset[nimi] = {
          soi: Boolean(soiva),
          looppi: Boolean(soiva?.lahde?.loop),
          taso: soiva ? Number(soiva.gain.gain.value.toFixed(4)) : 0,
          tavoite: Number(astronautinTaso(nimi).toFixed(4)),
          puuttuu: puuttuvat.has(nimi),
          /* Kytketty pois (omistaja 16.9.2026): ei ladata eikä soiteta. */
          poissa: nimi === 'musiikki' && !ASTRONAUTIN_MUSIIKKI_KAYTOSSA,
        };
      }
      return { elossa, kytkin: musiikkiPaalla(), kerrokset };
    },
    pura() {
      if (!elossa) return;
      elossa = false;
      irrotaVahti?.();
      irrotaVahti = null;
      for (const nimi of [...soivat.keys()]) lopetaKerros(nimi, LASKU_MS);
      if (nykyinen === kahva) nykyinen = null;
    },
  };
  nykyinen = kahva;

  /*
   * AUTOPLAY-ESTO: jos konteksti nukkuu, vahti herättää meidät
   * ensimmäisestä eleestä. Vahti kutsuu takaisinkutsun heti, jos
   * konteksti on jo käynnissä — siksi erillistä ensikäynnistystä ei
   * tarvita eikä kerroksia voi syntyä kahteen kertaan.
   */
  irrotaVahti = kuunteleReitityksenAvautumista(() => {
    if (!elossa) return;
    kaynnistaKaikki();
  });
  return kahva;
}

/** Soiva astronauttilinssin ääni, jos sellainen on. Savukkeita varten. */
export function astronautinAaniTila() {
  return nykyinen?.tila?.() ?? null;
}

/*
 * VÄISTÖ JA SÄÄDIN KUUNNELLAAN MODUULIN LATAUKSESSA, kuten
 * js/siirtymamusiikki.js tekee: kerroin on silloin oikea heti
 * ensimmäisestä avauksesta eikä vasta toisesta.
 */
lisaaVaistaja((kerroin, kesto, tiedot) => {
  vaisto = kerroin;
  vaistonSyyt = tiedot?.syyt ?? [];
  vaistonPohja = tiedot?.pohja ?? kerroin;
  nykyinen?.paivita?.(kesto || 300);
});

kuunteleMusiikinKerrointa(() => nykyinen?.paivita?.(200));

/*
 * PELIN YLEINEN MUSIIKKIKYTKIN (LISÄYS 8). Sama heräte kuin
 * pohjaraidalla: kytkin pois vaientaa linssin huminan ja musiikin
 * kesken ajon, ja kytkin päälle tuo ne takaisin.
 */
kuunteleMusiikkitilaa(() => nykyinen?.musiikkiKytkin?.());
