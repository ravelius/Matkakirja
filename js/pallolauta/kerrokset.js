import { laajennaKokeet, tallennetutKokeet } from '../piirtokoe-asetus.js';
/*
 * ABLAATIOTIKAS — `?kerrokset=<lista>` (omistajan menetelmä 21.9.2026,
 * Fable: sulavuusmittaus kerros kerrallaan; VAIN MITTAUKSEEN, ei
 * pelaajan lippu).
 *
 * Pallolauta rakennetaan portaittain, ja jokaisella portaalla mitataan
 * kehysajat panoroinnissa ja zoomissa (tools/savukkeet/mittaa-ablaatio.mjs).
 * Portaat ovat kumulatiivisia:
 *
 *   1  laatat                       pallo ja laattapyramidi
 *   2  + vektorit                   rajat, joet, rantaviiva, reitit (Line2)
 *   3  + nimet                      GL-nimiöt (kaupunkien nimet rungolla)
 *   4  + nostot, nappula            GL-nostot (ikoni + nimiö) ja pelinappula
 *                                   rungolla — nostojen CSS2D-jäänteet
 *                                   (ankkurit, liuskat, luonnokset, pisteet)
 *                                   kulkevat nostojen mukana, koska ne ovat
 *                                   saman ladonnan tulos
 *   5  + kohteet                    CSS2D: matkan kohteet (sykkivä halo)
 *                                   ja linssimerkit
 *   6  + pulu, ui, aanet            = tuotanto (kartan pieni liike ja pulu,
 *                                   yläpalkki, toimintorivi, maapaneeli,
 *                                   kartuutsi; äänet)
 *
 * Osoite: `?kerrokset=porras3` tai suoraan lista `?kerrokset=laatat,nimet`.
 * Ilman lippua kaikki kerrokset ovat päällä (tuotanto). Lippu luetaan
 * kerran osoitteesta ja muistetaan hakumerkkijonoa kohti, koska
 * `kerrosKaytossa` kysytään ladonnassa.
 *
 * Laitepalvelin (docs/laitepalvelin) välittää hakumerkkijonon
 * sellaisenaan, joten Laitetestaaja toistaa samat portaat oikealla
 * iPhonella samalla osoitteella.
 */

/** Kerrosten nimet siinä järjestyksessä, jossa tikas ne lisää. */
export const KERROKSET = ['laatat', 'vektorit', 'nimet', 'nostot', 'nappula', 'kohteet', 'pulu', 'ui', 'aanet'];

/** Porras → kerrokset (kumulatiivinen). */
export const ABLAATIOPORTAAT = {
  1: ['laatat'],
  2: ['laatat', 'vektorit'],
  3: ['laatat', 'vektorit', 'nimet'],
  4: ['laatat', 'vektorit', 'nimet', 'nostot', 'nappula'],
  5: ['laatat', 'vektorit', 'nimet', 'nostot', 'nappula', 'kohteet'],
  6: KERROKSET,
};

/**
 * Lipun arvo → käytössä olevien kerrosten joukko, tai null kun lippua
 * ei ole (kaikki päällä). Puhdas funktio (testit).
 *
 * @param {string} haku osoitteen hakumerkkijono (`?…`)
 * @returns {?Set<string>}
 */
export function kerroksetHausta(haku) {
  let arvo = null;
  try { arvo = new URLSearchParams(haku ?? '').get('kerrokset'); } catch { return null; }
  if (arvo == null || arvo === '') return null;
  const porras = /^porras(\d)$/u.exec(arvo.trim());
  if (porras) return new Set(ABLAATIOPORTAAT[Number(porras[1])] ?? KERROKSET);
  const lista = arvo.split(',').map((s) => s.trim()).filter((s) => KERROKSET.includes(s));
  // Laatat ovat aina pohja: ilman niitä ei ole lautaa.
  lista.push('laatat');
  return new Set(lista);
}

/*
 * PALJAS KARTTA (omistaja 23.9.2026 klo 09.20, js/piirtokoe-asetus.js):
 * Syötekoe-valikon tilat 5–8 ovat tikkaan kerrosjoukkoja. `dom` ei ole
 * tikkaan kerros (portaiden mittaukset eivät saa muuttua): se kertoo,
 * jäävätkö kartan päällä olevat sivun elementit näkyviin
 * (body.kerros-pois-dom, css/styles.css PALJAS KARTTA).
 */
export const PALJAAT_TILAT = Object.freeze({
  /*
   * `ui` pysyy kaikissa: sen pois kytkeminen piilottaa yläpalkin ja sen
   * mukana valikkonapin, eikä omistaja pääsisi takaisin. Näkyvyys hoidetaan
   * kerros-pois-dom-luokalla, joka jättää valikon esiin.
   */
  paljas: { kerrokset: ['laatat', 'ui'], dom: false },
  paljasnimet: { kerrokset: ['laatat', 'ui', 'nimet'], dom: false },
  paljassymbolit: { kerrokset: ['laatat', 'ui', 'nostot', 'nappula'], dom: false },
  paljasdom: { kerrokset: ['laatat', 'ui', 'kohteet', 'pulu'], dom: true },
});

/** Voimassa oleva paljas tila (avain) tai null. `?kerrokset=` voittaa. */
export function paljasTila(haku) {
  const h = haku ?? (() => { try { return globalThis.location?.search ?? ''; } catch { return ''; } })();
  if (kerroksetHausta(h)) return null;
  const kokeet = piirtokokeet(haku);
  return Object.keys(PALJAAT_TILAT).find((k) => kokeet.has(k)) ?? null;
}

let muisti = { avain: null, joukko: null };
function joukkoNyt(haku) {
  const h = haku ?? (() => { try { return globalThis.location?.search ?? ''; } catch { return ''; } })();
  // Tallennettu koe vaihtuu vain latauksen kautta, joten muisti hakua kohti riittää.
  const avain = `${haku === undefined ? 'm' : 'h'}|${h}`;
  if (muisti.avain !== avain) {
    const paljas = paljasTila(haku);
    muisti = { avain, joukko: kerroksetHausta(h) ?? (paljas ? new Set(PALJAAT_TILAT[paljas].kerrokset) : null) };
  }
  return muisti.joukko;
}

/**
 * Onko kerros käytössä. Ilman lippua aina true.
 *
 * @param {string} nimi KERROKSET-nimi
 * @param {string} [haku] hakumerkkijono (testit); oletus osoitteesta
 */
export function kerrosKaytossa(nimi, haku) {
  const joukko = joukkoNyt(haku);
  return joukko ? joukko.has(nimi) : true;
}

/** Onko ablaatiolippu päällä lainkaan (mittarit, body-luokat). */
export function ablaatioPaalla(haku) {
  return joukkoNyt(haku) !== null;
}

/**
 * Pois kytkettyjen kerrosten body-luokat `kerros-pois-<nimi>`
 * (css/styles.css ABLAATIOTIKAS): pulu, ui ja äänet ovat laudan
 * ulkopuolista käyttöliittymää, joka piilotetaan tyylillä.
 */
export function kerrostenBodyLuokat(haku) {
  const joukko = joukkoNyt(haku);
  if (!joukko) return [];
  const luokat = KERROKSET.filter((k) => !joukko.has(k)).map((k) => `kerros-pois-${k}`);
  const paljas = paljasTila(haku);
  if (paljas) {
    luokat.push('paljas-kartta');
    if (!PALJAAT_TILAT[paljas].dom) luokat.push('kerros-pois-dom');
  }
  return luokat;
}

/*
 * PIIRTOKOKEET (`?koe=a,b`, Pelikoodari 22.9.2026, VAIN MITTAUKSEEN):
 * DOM-kerrokset pallon päällä yksi kerrallaan pois, jotta zoomin
 * "piirto"-kehysten (ei laskurimuutosta) lähde löytyy laitteella.
 * Laattojen omat kokeet (aniso1, eimip, silmat40, eihaive, vientilepo)
 * lukee js/pallolaatat.js laattakerroksenKokeet samasta lipusta.
 *   eiliike   .pallolauta-liike pois (sävy, ylilentävä pulu)
 *   eiblend   sävyn mix-blend-mode: normal
 *   eikasvot  Pulun kasvot (SVG) pois, nappi jää
 *   eipollo   Pulun nappi ja kasvot pois
 *   eicss2d   CSS2D-kerros (kohteet, linssimerkit, ankkurit) pois
 */
export const PIIRTOKOKEIDEN_TYYLIT = {
  eiliike: '.pallolauta-liike{display:none!important}',
  eiblend: '.pallolauta-liike-savy{mix-blend-mode:normal!important}',
  eikasvot: '.livia-kasvot-pinta{display:none!important}',
  eipollo: '.pollo-nappi,.livia-kasvot-pinta{display:none!important}',
  eicss2d: '.pallo-kotelo .scene-container > div{display:none!important}',
};

/** Lipun `koe`-arvot joukkona (myös laattojen kokeet). Ilman lippua tyhjä. */
export function piirtokokeet(haku) {
  const h = haku ?? (() => { try { return globalThis.location?.search ?? ''; } catch { return ''; } })();
  let arvo = '';
  try { arvo = new URLSearchParams(h).get('koe') ?? ''; } catch { return new Set(); }
  const joukko = new Set(arvo.split(',').map((k) => k.trim()).filter(Boolean));
  // Ratasvalikon valinta on sama kuin lippu; ks. js/pallolaatat.js.
  if (haku === undefined) for (const lippu of tallennetutKokeet()) joukko.add(lippu);
  return laajennaKokeet(joukko);
}

/** Lisää kokeiden tyylit dokumenttiin (kerran). Palauttaa lisätyt nimet. */
export function asennaPiirtokokeet(doc = globalThis.document, haku) {
  const kokeet = piirtokokeet(haku);
  const lisatyt = [];
  if (!doc?.createElement || !kokeet.size) return lisatyt;
  for (const nimi of kokeet) {
    const css = PIIRTOKOKEIDEN_TYYLIT[nimi];
    if (!css || doc.getElementById(`piirtokoe-${nimi}`)) continue;
    const el = doc.createElement('style');
    el.id = `piirtokoe-${nimi}`;
    el.textContent = css;
    doc.head?.append(el);
    lisatyt.push(nimi);
  }
  if (lisatyt.length) doc.body?.classList.add(...lisatyt.map((n) => `piirtokoe-${n}`));
  return lisatyt;
}
