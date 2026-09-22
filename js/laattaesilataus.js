/*
 * ======== PYRAMIDIN LAATTOJEN ESILATAUS LEVOSSA (erä E1) ===========
 *
 * OMISTAJA 22.9.2026 (Fablen välittämänä): *"Esilataus levossa
 * lähialueelle: kun kamera on levossa, lataa taustalla seuraavan tason
 * laatat näkymän alueelta + 50 % marginaali service workerin
 * välimuistiin — ei GPU-muistiin — ja maahan saapuessa koko kohdemaan
 * z6–z8-laatat matalalla prioriteetilla; zoomatessa laatat tulevat
 * silloin levyltä, ei verkosta."* Suunnitelma: docs/raportit/esilataus-
 * suunnitelma-20260922.md (Pelikoodari), prioriteetti 1 = laatat.
 *
 * MIKSI VÄLIMUISTIIN EIKÄ MUISTIIN. Laattakerroksen (js/pallolaatat.js)
 * zoomiennakko tilaa seuraavan tason laatat GPU-muistiin, mutta sitä
 * rajoittaa tavukatto (LAATTAKATTO_ZOOMIENNAKKO 16) ja pelin oma putki
 * (mitattu 22.9.: 2 tekstuuria/kehys). Cache API ei maksa muistia eikä
 * kehyksiä: palvelutyöntekijä noutaa taustalla, ja kun laatta oikeasti
 * tarvitaan, pelin oma fetch löytää sen korista (sw.js laattaPeilista,
 * pyramidin polku 22.9. alkaen) — puhelimen verkolla TTFB 50–150 ms
 * laattaa kohti jää pois.
 *
 * MITÄ LÄHETETÄÄN. Osoitteet ovat samat kuin laattakerroksen omat
 * (pyramidinLaattaUrl jokaiselle kerrostasolle, jolla laatta on
 * olemassa: pohja, viivat, ranta, nimiöt, nostot), joten korin osuma on
 * täsmälleen se pyyntö, jonka kerros tekee. Lähetys menee sw.js:n
 * `esilataa-pallolaatat`-viestillä — samalla, jolla pallon slippy-laatat
 * ja lentoreitti esiladataan (js/pallo.js) — erissä (ESILATAUS_ERA
 * osoitetta), ja seuraava erä lähtee vasta seuraavalla lepopäivityksellä:
 * liike keskeyttää lähetykset itsestään, eikä pyyntöjä kerry. Sama osoite
 * lähetetään istunnossa vain kerran (Set).
 *
 * KAKSI LÄHDETTÄ, YKSI JONO: 1) näkymän ympäriltä taso z+1, laatikko
 * = näkyvä alue × LIIKEVARA keskipisteen ympärillä (ensin); 2) kohdemaa
 * z6–z8 (maan laatikko asteina, lauta.js antaa maanvaihdossa) perään.
 * Mitattu Ranska: 256 pohjalaattaa, kaikki kerrokset 16,2 Mt (z8 10,3).
 */

/** Lepo ennen esilatausta (ms): sormi irti ja kamera paikallaan. */
export const ESILATAUS_LEPO_MS = 300;
/** Näkymän laatikon kerroin (1,5 = 50 %:n marginaali joka suuntaan). */
export const ESILATAUS_LIIKEVARA = 1.5;
/** Osoitteita yhdessä viestissä. */
export const ESILATAUS_ERA = 20;
/** Erien väli levossa (ms). */
export const ESILATAUS_ERAVALI_MS = 250;
/** Kohdemaan tasot. */
export const ESILATAUS_MAATASOT = [6, 7, 8];
/** Kytkin: `?esilataus=0` pois (savukkeiden vertailu). */
export function esilatausPaalla(ikkuna = globalThis) {
  try {
    return new URLSearchParams(ikkuna.location?.search ?? '').get('esilataus') !== '0';
  } catch { return true; }
}

/** Laatikko keskipisteen ympärille kerrottuna; lat rajataan. */
export function laajennaLaatikko(alue, kerroin, latMin = -90, latMax = 90) {
  const kx = (alue.lon0 + alue.lon1) / 2; const ky = (alue.lat0 + alue.lat1) / 2;
  const kw = ((alue.lon1 - alue.lon0) * kerroin) / 2; const kh = ((alue.lat1 - alue.lat0) * kerroin) / 2;
  return {
    lon0: kx - kw, lon1: kx + kw, lat0: Math.max(latMin, ky - kh), lat1: Math.min(latMax, ky + kh),
  };
}

/**
 * Laattojen osoitteet alueelle yhdellä tasolla: jokainen laatta × jokainen
 * kerrostaso, jolla laatta on olemassa. Puhdas: laatat ja kerrokset
 * annetaan funktioina (laattakerros antaa omansa, testit omansa).
 *
 * @param {object} p
 * @param {Array<{sarake:number, rivi:number}>} p.laatat
 * @param {object[]} p.kerrostasot pyramidinKerrostasot(z) suodatettuna
 * @param {(k:object, s:number, r:number) => boolean} p.olemassa
 * @param {(k:object, s:number, r:number) => string} p.osoite
 */
export function laattojenOsoitteet({ laatat, kerrostasot, olemassa, osoite }) {
  const ulos = [];
  for (const l of laatat ?? []) {
    for (const k of kerrostasot ?? []) {
      if (olemassa(k, l.sarake, l.rivi)) ulos.push(osoite(k, l.sarake, l.rivi));
    }
  }
  return ulos;
}

/**
 * Esilatausjono: kerää osoitteita kahdesta lähteestä, karsii jo
 * lähetetyt ja antaa eriä lepopäivityksissä. `laheta(osoitteet)` on
 * viesti palvelutyöntekijälle (js/pallo.js lahetaLaattaesilataus).
 */
export function luoEsilatausjono({ laheta, era = ESILATAUS_ERA, eravali = ESILATAUS_ERAVALI_MS, nyt = () => Date.now() }) {
  const lahetetyt = new Set();
  const jono = [];
  let viimeLahetys = -Infinity;
  const mittarit = { jonossa: 0, lahetetty: 0, eria: 0, maa: null, maaOsoitteita: 0 };
  const lisaa = (osoitteet, eteen = false) => {
    const uudet = [];
    for (const u of osoitteet) {
      if (!u || lahetetyt.has(u) || jono.includes(u)) continue;
      uudet.push(u);
    }
    if (eteen) jono.unshift(...uudet); else jono.push(...uudet);
    mittarit.jonossa = jono.length;
    return uudet.length;
  };
  return {
    /** Näkymän z+1 -laatat jonon KÄRKEEN (tarvitaan ennen maata). */
    nakyma: (osoitteet) => lisaa(osoitteet, true),
    /** Kohdemaan laatat jonon perään. */
    maa: (iso, osoitteet) => {
      mittarit.maa = iso;
      mittarit.maaOsoitteita = lisaa(osoitteet, false);
      return mittarit.maaOsoitteita;
    },
    /** Lähettää yhden erän, jos lepo sallii ja edellisestä on eräväli. Palauttaa lähetetyn määrän. */
    askel: (levossa) => {
      if (!levossa || !jono.length) return 0;
      const t = nyt();
      if (t - viimeLahetys < eravali) return 0;
      const osoitteet = jono.splice(0, era);
      for (const u of osoitteet) lahetetyt.add(u);
      viimeLahetys = t;
      mittarit.jonossa = jono.length;
      mittarit.lahetetty += osoitteet.length;
      mittarit.eria += 1;
      try { laheta(osoitteet); } catch { /* työntekijää ei ole */ }
      return osoitteet.length;
    },
    onLahetetty: (u) => lahetetyt.has(u),
    tyhjenna: () => { jono.length = 0; mittarit.jonossa = 0; },
    mittarit: () => ({ ...mittarit }),
  };
}

/**
 * Kohdemaan laatikko asteina renkaista ([lon, lat] -pisteet, js/
 * maanaariviivat.js pallonKorostusRenkaat): suurin rengas ja ne renkaat,
 * joiden keskipiste on enintään `sade` astetta sen keskipisteestä.
 * Ranskalla mukaan tulevat manner ja Korsika, eivät Guyane ja Réunion —
 * merentakaisten alueiden laatat eivät kuulu saapumisen esilataukseen.
 * Palauttaa null, jos renkaita ei ole.
 */
export function maanLaatikko(renkaat, sade = 12) {
  const laatikot = [];
  for (const r of renkaat ?? []) {
    if (!Array.isArray(r) || r.length < 3) continue;
    let lon0 = Infinity; let lat0 = Infinity; let lon1 = -Infinity; let lat1 = -Infinity;
    for (const [lon, lat] of r) {
      if (lon < lon0) lon0 = lon; if (lon > lon1) lon1 = lon;
      if (lat < lat0) lat0 = lat; if (lat > lat1) lat1 = lat;
    }
    if (!(lon1 > lon0) || !(lat1 > lat0)) continue;
    laatikot.push({ lon0, lat0, lon1, lat1, ala: (lon1 - lon0) * (lat1 - lat0), kx: (lon0 + lon1) / 2, ky: (lat0 + lat1) / 2 });
  }
  if (!laatikot.length) return null;
  laatikot.sort((a, b) => b.ala - a.ala);
  const paa = laatikot[0];
  const ulos = { lon0: paa.lon0, lat0: paa.lat0, lon1: paa.lon1, lat1: paa.lat1 };
  for (const l of laatikot.slice(1)) {
    if (Math.hypot(l.kx - paa.kx, l.ky - paa.ky) > sade) continue;
    ulos.lon0 = Math.min(ulos.lon0, l.lon0); ulos.lat0 = Math.min(ulos.lat0, l.lat0);
    ulos.lon1 = Math.max(ulos.lon1, l.lon1); ulos.lat1 = Math.max(ulos.lat1, l.lat1);
  }
  return ulos;
}
