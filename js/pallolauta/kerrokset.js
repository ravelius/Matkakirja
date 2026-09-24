import { laajennaKokeet, paljaanKerroksetJoukosta, tallennetutKokeet } from '../piirtokoe-asetus.js';
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
 * PALJAS KARTTA (omistaja 23.9.2026 klo 09.20 ja 09.25, js/piirtokoe-asetus.js
 * PALJAAN_KERROKSET): pohjana laatat ja `ui` — `ui`:n pois kytkeminen
 * piilottaisi yläpalkin ja sen mukana valikkonapin, eikä omistaja pääsisi
 * takaisin; näkyvyys hoidetaan body.kerros-pois-dom-luokalla. Kerroskytkimet
 * (`kerros-<avain>`) tuovat tikkaan kerroksia takaisin. `liike` (kartan
 * pieni liike) on paljaassa oma ryhmänsä; tikkaalla se kulkee pulun mukana.
 */
export const PALJAAN_POHJA = Object.freeze(['laatat', 'ui']);

/** Voimassa oleva paljas tila ('paljas') tai null. `?kerrokset=` voittaa. */
export function paljasTila(haku) {
  const h = haku ?? (() => { try { return globalThis.location?.search ?? ''; } catch { return ''; } })();
  if (kerroksetHausta(h)) return null;
  return piirtokokeet(haku).has('paljas') ? 'paljas' : null;
}

/** Paljaan kartan kerrosjoukko ja DOM-tieto hakua kohti (null, jos ei paljasta). */
export function paljaanKerrokset(haku) {
  if (!paljasTila(haku)) return null;
  const ryhmat = paljaanKerroksetJoukosta(piirtokokeet(haku));
  return {
    kerrokset: new Set([...PALJAAN_POHJA, ...ryhmat.flatMap((k) => k.tikas)]),
    dom: ryhmat.some((k) => k.avain === 'dom'),
    ryhmat: ryhmat.map((k) => k.avain),
  };
}

let muisti = { avain: null, joukko: null, paljas: null };
function joukkoNyt(haku) {
  const h = haku ?? (() => { try { return globalThis.location?.search ?? ''; } catch { return ''; } })();
  // Tallennettu koe vaihtuu vain latauksen kautta, joten muisti hakua kohti riittää.
  const avain = `${haku === undefined ? 'm' : 'h'}|${h}`;
  if (muisti.avain !== avain) {
    const paljas = paljaanKerrokset(haku);
    muisti = { avain, joukko: kerroksetHausta(h) ?? paljas?.kerrokset ?? null, paljas };
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
  if (!joukko) return true;
  // Pieni liike: paljaassa oma ryhmänsä, tikkaalla pulun mukana (portaat ennallaan).
  if (nimi === 'liike' && !muisti.paljas) return joukko.has('pulu');
  return joukko.has(nimi);
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
  if (!kerrosKaytossa('liike', haku)) luokat.push('kerros-pois-liike');
  const paljas = paljaanKerrokset(haku);
  if (paljas) {
    luokat.push('paljas-kartta');
    if (!paljas.dom) luokat.push('kerros-pois-dom');
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
