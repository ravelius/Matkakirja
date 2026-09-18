/*
 * NOSTOJEN KIINTEÄT KARTTA-ANKKURIT (omistaja 17.9.2026 klo 20.35
 * Suomen aikaa, Raamattu KARTTAUUDISTUKSEN PAATOKSET 32 kohdat 1, 2 ja
 * 5; kolme iPhone-kuvaa Pariisista v1933, sanatarkasti: *"Osa
 * kohteista liikkuu zoomatessa, ei saisi. Kohteet ovat liian lähekkäin
 * toisiaan. … Yksikään teksti ei saa mennä toisen päälle. Kohteita voi
 * siirtää vapaasti tarpeen mukaan. Visuaalinen selkeys tärkeämpi kuin
 * oikea sijoittelu kartalla."*)
 * ══════════════════════════════════════════════════════════════════
 *
 * MIKSI MERKIT LIIKKUIVAT. Merkin oma paikka (lat/lng) ei ole koskaan
 * liikkunut — liikkui kaikki muu, mikä ruudulla sen paikan määrää:
 *
 *   a) NIMIÖN VÄISTÖ ON ZOOMIN FUNKTIO. `sovitteleLaput`
 *      (js/pallolauta/sovittelu.js) siirtää nimiön ruutupikseleinä
 *      (SOVITTELUN_SIIRTO_PX 6) ja vaihtaa sen kylkeä sen mukaan,
 *      mitä juuri sillä zoomilla on tiellä. Sama nosto sai eri
 *      kyljen ja eri siirron joka zoomiportaassa — pelaajan silmissä
 *      *Kaulanauhajuttu* ja *Braillen pisteet* vaihtoivat paikkaa.
 *   b) AIHENOSTON PAIKKA ON JÄSENTENSÄ KESKIARVO, ja jäsenyys
 *      laskettiin ruutumitoilla (js/pallolauta/aihemerkit.js
 *      RYHMITYKSEN_ETAISYYS_PX 44 px, laatikoiden limitys). Kun
 *      kamera zoomasi, kaupungin ulkopuoliset rykelmät hajosivat ja
 *      syntyivät uudelleen, ja aihemerkin keskipiste hyppäsi.
 *   c) NIMIÖN MITTA KASVOI KARTAN MUKANA (PAATOKSET 14), joten myös
 *      laatikot — ja niiden myötä ryhmitys ja väistö — olivat eri
 *      kokoisia joka zoomilla.
 *
 * RATKAISU on tässä tiedostossa kolmessa osassa:
 *
 *   1) SAAPUMISKEHYS. Kaikki ladonnan mitat lasketaan kehyksessä,
 *      jossa kamera on uloimmassa sallitussa asennossaan: ruutupiste
 *      × `uloinOsuus`. Kartan mittakaava on täsmälleen kääntäen
 *      verrannollinen tähän lukuun (mitattu 16.9.2026: 2,12 px/yks ×
 *      osuus = vakio), joten saapumiskehyksen etäisyydet ovat
 *      MAANTIETEELLISIÄ eivätkä kameran. Ryhmitys ja levitys tehdään
 *      siinä kehyksessä, jolloin kumpikaan ei enää riipu zoomista.
 *   2) LEVITYS. Merkkejä työnnetään erilleen, kunnes jokaisen
 *      laatikon (symboli + nimiö) välissä on ANKKURIN_VALJYYS_PX ja
 *      kiinteät esteet (poltettu muste, kaupunkimerkit, pelinappula)
 *      ovat vapaana. Omistajan sanoin *"Levitä merkit laajemmalle
 *      alueelle"*: siirto on vapaa, maantieteellinen tarkkuus ei ole
 *      vaatimus.
 *   3) ANKKURI. Levityksen tulos käännetään takaisin asteiksi ja
 *      TALLETETAAN muistiin kaupungin nostojoukon avaimella. Zoomi ei
 *      lado uudelleen: sama nosto on samassa lat/lng-pisteessä
 *      kaikilla zoomeilla, ja zoomi vain skaalaa ruutupaikan.
 *      Uudelleen lasketaan vain, kun joukko tai ruutukoko vaihtuu —
 *      ei tallennukseen, koska ankkuri on näkymän eikä pelin tila.
 *
 * MITTA EI OLE TÄSSÄ TIEDOSTOSSA: laatikot tulevat kutsujalta samasta
 * kaavasta, jolla ne piirretään (`nostonLaatikko`, `aihemerkinLaatikko`),
 * jotta levitys mittaa sitä, mikä ruudulla on.
 */

/** Pienin tyhjä väli kahden laatikon välissä saapumiskehyksessä (px). */
export const ANKKURIN_VALJYYS_PX = 7;
/**
 * Suurin siirto omasta paikasta (px saapumiskehyksessä). Pariisin
 * rykelmä on saapumisnäkymässä n. 27 × 135 px, ja 21 nostoa vaatii
 * väljästi ladottuna reilusti enemmän tilaa; katto pitää levityksen
 * silti kaupungin ympäristössä eikä naapurimaassa.
 */
export const ANKKURIN_SIIRTOKATTO_PX = 260;
/** Levityksen kierrokset: kahdenkymmenen merkin rykelmä asettuu n. 40:ssä. */
export const ANKKURIN_KIERROKSET = 80;

/**
 * LEVITYKSEN VASTAKOE: `?nostoankkurit=0` palauttaa vanhan ladonnan
 * (paikka suoraan datasta, väistö joka zoomilla uudelleen), jolloin
 * limitys palaa näkyviin. Lippu luetaan joka ladonnassa osoitteesta —
 * sama tapa kuin `?aihemerkit=0`.
 */
export function nostoankkuritSallittu() {
  try {
    const arvo = new URLSearchParams(globalThis.location?.search ?? '').get('nostoankkurit');
    return !/^(0|ei|off)$/.test(arvo ?? '');
  } catch { return true; }
}

/**
 * KARTAN MITAN VASTAKOE: `?nostokoko=0` palauttaa ruutuvakion (kerroin
 * 1), jolloin nostot ovat saman kokoisia joka zoomilla.
 *
 * VIPU KÄÄNNETTIIN 18.9.2026 (Fablen päätös, Raamattu KARTTAUUDISTUKSEN
 * PAATOKSET 34 kohta 15 TILA): elävä nosto skaalautuu kartan mukana
 * kuten laattaan poltettu muste, joten kartan mitta on NORMAALI polku
 * ja yksi koko on vastakoe. Ennen tätä lippu oli toisin päin
 * (`yksiKokoSallittu`, PAATOKSET 32 kohta 4).
 */
export function kartanMittaSallittu() {
  try {
    const arvo = new URLSearchParams(globalThis.location?.search ?? '').get('nostokoko');
    return !/^(0|ei|off)$/.test(arvo ?? '');
  } catch { return true; }
}

const limittyy = (a, b, vara) => a.x0 - vara < b.x1 && b.x0 - vara < a.x1
  && a.y0 - vara < b.y1 && b.y0 - vara < a.y1;

const siirra = (laatikko, dx, dy) => ({
  x0: laatikko.x0 + dx, y0: laatikko.y0 + dy, x1: laatikko.x1 + dx, y1: laatikko.y1 + dy,
});

/**
 * Levittää merkit erilleen saapumiskehyksessä.
 *
 * Jokainen merkki saa laatikkonsa kutsujalta (symboli + nimiö omassa
 * paikassaan). Limittyvät parit työnnetään erilleen sitä akselia
 * pitkin, jolla limitys on pienin — se on lyhin tie ulos ja pitää
 * ladonnan lähellä alkuperäistä. Kiinteä este ei väisty, joten koko
 * siirto menee liikkuvalle.
 *
 * @param {Array<{avain:string, x:number, y:number, laatikko:object}>} merkit
 * @param {Array<object>} esteet  kiinteät laatikot (poltettu muste, nappula…)
 * @param {object} [asetus]
 * @returns {Map<string, {dx:number, dy:number}>} siirto saapumiskehyksen px
 */
export function levitaMerkit(merkit, esteet = [], {
  vara = ANKKURIN_VALJYYS_PX,
  kierrokset = ANKKURIN_KIERROKSET,
  katto = ANKKURIN_SIIRTOKATTO_PX,
} = {}) {
  const n = merkit.length;
  const dxs = new Array(n).fill(0);
  const dys = new Array(n).fill(0);
  const kelpo = (r) => r && Number.isFinite(r.x0) && Number.isFinite(r.y1);
  const laatikot = merkit.map((m) => m.laatikko);
  const kiinteat = esteet.filter(kelpo);
  for (let k = 0; k < kierrokset; k += 1) {
    let liikkui = false;
    for (let i = 0; i < n; i += 1) {
      if (!kelpo(laatikot[i])) continue;
      const a = siirra(laatikot[i], dxs[i], dys[i]);
      for (let j = i + 1; j < n; j += 1) {
        if (!kelpo(laatikot[j])) continue;
        const b = siirra(laatikot[j], dxs[j], dys[j]);
        if (!limittyy(a, b, vara)) continue;
        const ox = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0) + vara;
        const oy = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0) + vara;
        const keskiA = { x: (a.x0 + a.x1) / 2, y: (a.y0 + a.y1) / 2 };
        const keskiB = { x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2 };
        if (ox <= oy) {
          const suunta = keskiA.x <= keskiB.x ? -1 : 1;
          dxs[i] += (suunta * ox) / 2;
          dxs[j] -= (suunta * ox) / 2;
        } else {
          const suunta = keskiA.y <= keskiB.y ? -1 : 1;
          dys[i] += (suunta * oy) / 2;
          dys[j] -= (suunta * oy) / 2;
        }
        liikkui = true;
        break;
      }
    }
    for (let i = 0; i < n; i += 1) {
      if (!kelpo(laatikot[i])) continue;
      const a = siirra(laatikot[i], dxs[i], dys[i]);
      for (const e of kiinteat) {
        if (!limittyy(a, e, vara)) continue;
        const ox = Math.min(a.x1, e.x1) - Math.max(a.x0, e.x0) + vara;
        const oy = Math.min(a.y1, e.y1) - Math.max(a.y0, e.y0) + vara;
        const keskiA = { x: (a.x0 + a.x1) / 2, y: (a.y0 + a.y1) / 2 };
        const keskiE = { x: (e.x0 + e.x1) / 2, y: (e.y0 + e.y1) / 2 };
        if (ox <= oy) dxs[i] += (keskiA.x <= keskiE.x ? -1 : 1) * ox;
        else dys[i] += (keskiA.y <= keskiE.y ? -1 : 1) * oy;
        liikkui = true;
        break;
      }
    }
    // Siirtokatto: levitys saa hakea tilaa, muttei karata maasta.
    for (let i = 0; i < n; i += 1) {
      const pituus = Math.hypot(dxs[i], dys[i]);
      if (pituus > katto) {
        dxs[i] = (dxs[i] / pituus) * katto;
        dys[i] = (dys[i] / pituus) * katto;
      }
    }
    if (!liikkui) break;
  }
  const tulos = new Map();
  for (let i = 0; i < n; i += 1) tulos.set(merkit[i].avain, { dx: dxs[i], dy: dys[i] });
  return tulos;
}

/**
 * ANKKURIVARASTO: kaupungin (tai näkymän) nostojoukon ankkurit
 * muistissa. Avain kantaa joukon ja ruutukoon, joten ankkurit
 * lasketaan uudelleen VAIN kun joukko tai ruutu vaihtuu — ei
 * zoomissa eikä panoroinnissa (PAATOKSET 32 kohta 1).
 */
export function luoAnkkurivarasto() {
  let avain = null;
  const ankkurit = new Map();
  return {
    /**
     * VARASTON TUNNUS ON RUUTU, EI NÄKYMÄ. Merkkijoukko kutistuu ja
     * kasvaa kameran mukana (merkkiportti pudottaa kaukaiset), joten
     * joukko avaimena olisi tarkoittanut uutta ladontaa joka zoomissa
     * — täsmälleen se, mitä PAATOKSET 32 kohta 1 kieltää. Ruutukoon
     * vaihtuessa mitat ovat toiset ja ankkurit lasketaan uudelleen.
     */
    tunnus(_avaimet, ruutu) {
      return `${Math.round(ruutu?.leveys ?? 0)}x${Math.round(ruutu?.korkeus ?? 0)}`;
    },
    /** Uutta ladontaa ei tarvita, jos joka merkillä on jo ankkuri. */
    tuore(tunnus, avaimet) {
      if (avain !== tunnus) return false;
      for (const a of avaimet) if (!ankkurit.has(a)) return false;
      return true;
    },
    /** Uudet ankkurit varastoon; ruudun vaihtuessa vanhat unohtuvat. */
    aseta(tunnus, uudet) {
      if (avain !== tunnus) { ankkurit.clear(); avain = tunnus; }
      for (const [k, v] of uudet) ankkurit.set(k, v);
    },
    lue(merkkiAvain) { return ankkurit.get(merkkiAvain) ?? null; },
    get koko() { return ankkurit.size; },
    tyhjenna() { avain = null; ankkurit.clear(); },
  };
}

/**
 * Paikallinen lineaarikuvaus asteista ruutupikseleiksi merkin
 * ympäristössä: kaksi äärellistä erotusta riittää, koska levitys
 * liikkuu korkeintaan muutaman sadan pikselin päähän.
 *
 * @returns {?function({dx:number,dy:number}): {lat:number, lng:number}}
 */
export function pikseleistaAsteiksi(ruudulla, lat, lng, askel = 0.05) {
  const p0 = ruudulla(lat, lng);
  const pLat = ruudulla(lat + askel, lng);
  const pLng = ruudulla(lat, lng + askel);
  if (!p0 || !pLat || !pLng) return null;
  const a = (pLat.x - p0.x) / askel;
  const b = (pLng.x - p0.x) / askel;
  const c = (pLat.y - p0.y) / askel;
  const d = (pLng.y - p0.y) / askel;
  const det = a * d - b * c;
  if (!Number.isFinite(det) || Math.abs(det) < 1e-9) return null;
  return ({ dx, dy }) => ({
    lat: lat + (d * dx - b * dy) / det,
    lng: lng + (a * dy - c * dx) / det,
  });
}
