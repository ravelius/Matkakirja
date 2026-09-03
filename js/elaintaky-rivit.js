/*
 * ELÄINTÄYN KARTTARIVIT JA NIMIÖN KYLKI — ILMAN PELIÄ JA ILMAN DOMia.
 *
 * Eriytetty js/elaintaky.js:stä 3.9.2026, koska kohdekerros
 * (js/fokuskohteet.js) tarvitsee täyn paikan omaan ladontaansa ja
 * eläinkerros tarvitsee kohdekerroksen ladonnan omaan kylkeensä —
 * kumpikin toiseen suuntaan olisi tuontikehä, ja yhden tiedoston
 * versiossa (tools/build-standalone.mjs) kehä on ladontajärjestyksen
 * virhe eikä varoitus. Tämä moduuli tuo vain laudan dataa ja
 * symbolikirjaston mittaa, ei kumpaakaan kerrosta.
 *
 * ── MIKSI TÄKY VÄISTÄÄ, EIVÄTKÄ NOSTOT ─────────────────────────────
 *
 * OMISTAJAN HAVAINTO 3.9.2026 (Bulgaria, 100 km:n näkymä): nostojen
 * nimiöt limittyivät. Mitattuna (tools/tarkista-nimiolimitys.mjs)
 * kahdeksan seitsemästätoista parista oli eläintäky toisen nimen
 * päällä: Pelastuskarhu + Veda Slovena, Tornjak + Travnik,
 * Karhunpennut + Moldoveanu, Rusakko + Dublinin leijona, Myskihärkä +
 * Dovrefjell, Vesikoiranpentu + Korkkitammi, Dalmatianpentu + Vaganski
 * vrh. Täky latoutui omillaan pisteeseensä nimiö aina oikealla, eikä
 * kumpikaan kerros tiennyt toisesta.
 *
 * Täky ei voi olla kohdekerroksen `lisat`-rivi: rivi menee kaupungin
 * sarakkeeseen ja siirtää erottelusiirrolla naapureitaan
 * (tools/fokuskartta/nostot.mjs, "MIKSI NÄMÄ EIVÄT OLE lisat-LISTALLA").
 * Sen sijaan täky on kohdekerroksen ladonnassa PEHMEÄ ESTE (sen
 * symbolin laatikko, js/fokuskohteet.js maanUlkoisetEsteet) ja valitsee
 * oman nimiönsä kyljen VIIMEISENÄ, maan valmiin ladonnan ympäriltä:
 * ensin kylki, joka ei osu nimiöön eikä symboliin; sitten kylki, joka
 * osuu vain symboliin; viimeisenä se kylki, jonka limitys nimiöiden
 * kanssa on pienin. Nostot eivät liiku tavuakaan, ja poltettu ja elävä
 * täky lukevat saman päätöksen samasta funktiosta.
 */
import { projisoiLaudalle } from './fokusmitat.js';
import { NOSTOSYM_NIMIO_KYLJET, nostosymNimioLaatikko } from './fokusnosto-symbolit.js';
import { ELAINTAKYT } from './packs/elaintakyt.js';

/**
 * Merkin nimiö: eläimen nimi kartan nimiötypografialla, isolla
 * alkukirjaimella kuten muutkin kartan nimet. `nimio`-kenttä on
 * datan oma karttanimi silloin, kun eläimen nimi ei mahdu nimiöön
 * (sama sopimus kuin kohteilla, js/fokuskohteet.js kohteenKarttanimi).
 */
export function elaintakyNimio(taky) {
  const nimi = taky.nimio ?? taky.elain ?? '';
  return `${nimi.charAt(0).toUpperCase()}${nimi.slice(1)}`;
}

/**
 * TÄMÄN LAUDAN ELÄINTÄYT PAIKKOINEEN, ILMAN PELIÄ JA ILMAN DOMia.
 *
 * Maa kelpaa vain jos LAUTA TUNTEE SEN (countryShapes): maalehti,
 * maapilleri ja kartuutsi lukevat maan nimen samasta taulusta, eikä
 * kartalle saa ilmestyä merkkiä maahan, jota lauta ei muuten tunne.
 * Laudan reunan ulkopuolelle jäävä piste jätetään pois — Vanjärvi on
 * Euroopan laudan itäreunan takana (js/packs/elaintakyt.js).
 *
 * LAATTAGENERAATTORI POLTTAA NÄMÄ MERKIT (tools/fokuskartta/nostot.mjs),
 * ja niiden tunnus, nimiö ja paikka on saatava samasta koodista kuin
 * pelin oma merkki — muuten poltettu kilpikonna olisi eri paikassa tai
 * eri nimellä kuin elävä. Merkin TUNNUS on `elaintaky-<ISO>`: sama
 * muoto kuin syvennyksillä ja skandaaleilla, ja se on luettelon avain,
 * jolla peli tunnistaa poltetun merkkinsä (js/laattapyramidi.js
 * nostoOnPoltettu).
 */
export function elaintakyKarttarivit(pack) {
  const map = pack?.map;
  if (!map?.countryShapes) return [];
  const tulos = [];
  for (const [iso, taky] of Object.entries(ELAINTAKYT)) {
    if (!map.countryShapes[iso]) continue;
    const piste = projisoiLaudalle(pack.id, taky.lon, taky.lat);
    if (!piste) continue;
    if (piste.x < 0 || piste.y < 0) continue;
    if (map.width > 0 && piste.x > map.width) continue;
    if (map.height > 0 && piste.y > map.height) continue;
    tulos.push({
      iso, taky, tunnus: `elaintaky-${iso}`, nimio: elaintakyNimio(taky), x: piste.x, y: piste.y,
    });
  }
  return tulos;
}

/** Laatikot laudan koordinaateissa {x1,y1,x2,y2}; kosketus ei ole limitystä. */
function elaintakyLimittyy(a, b) {
  return a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
}

/** Limityksen pinta-ala laudan yksiköissä (0 = ei limitystä). */
function elaintakyLimitysAla(a, b) {
  const w = Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1);
  const h = Math.min(a.y2, b.y2) - Math.max(a.y1, b.y1);
  return w > 0 && h > 0 ? w * h : 0;
}

/**
 * TÄYN NIMIÖN LAATIKKO laudan yksiköissä yhdelle kyljelle.
 *
 * @param {{x:number,y:number,nimio:string}} rivi  täyn karttarivi
 * @param {number} porras  lautayksikköä kirjaston yksikköä kohti —
 *   sama luku, jolla merkki piirretään (KOHDE_SYMBOLI_SKAALA × maan
 *   merkkiskaala; ks. tools/fokuskartta/nostot.mjs keraaElaintakyt)
 * @param {string} puoli  'oikea' | 'vasen' | 'yla' | 'ala'
 * @returns {?{x1:number,y1:number,x2:number,y2:number}}
 */
export function elaintakyNimioLaatikko(rivi, porras, puoli) {
  const l = nostosymNimioLaatikko(rivi.nimio, null, 'elain', puoli);
  if (!l || !(porras > 0)) return null;
  return {
    x1: rivi.x + l.x1 * porras,
    x2: rivi.x + l.x2 * porras,
    y1: rivi.y + l.y1 * porras,
    y2: rivi.y + l.y2 * porras,
  };
}

/**
 * TÄYN NIMIÖN KYLKI MAAN VALMIIN LADONNAN YMPÄRILTÄ (ks. tiedoston
 * alku). Sama funktio poltolle ja elävälle kerrokselle.
 *
 * @param {{x:number,y:number,nimio:string}} rivi
 * @param {number} porras  ks. elaintakyNimioLaatikko
 * @param {{symbolit:Array,nimiot:Array}} esteet  laatikot laudan
 *   yksiköissä {x1,y1,x2,y2} — js/fokuskohteet.js maanLadontaEsteet
 * @returns {string} kylki; 'oikea', jos nimiötä ei ole
 */
export function elaintakyNimioKylki(rivi, porras, esteet) {
  const symbolit = esteet?.symbolit ?? [];
  const nimiot = esteet?.nimiot ?? [];
  const kyljet = NOSTOSYM_NIMIO_KYLJET.map((puoli) => ({
    puoli, laatikko: elaintakyNimioLaatikko(rivi, porras, puoli),
  }));
  if (kyljet.some((k) => !k.laatikko)) return 'oikea';
  const vapaa = kyljet.find((k) => !nimiot.some((e) => elaintakyLimittyy(k.laatikko, e))
    && !symbolit.some((e) => elaintakyLimittyy(k.laatikko, e)));
  if (vapaa) return vapaa.puoli;
  const ohiNimien = kyljet.find((k) => !nimiot.some((e) => elaintakyLimittyy(k.laatikko, e)));
  if (ohiNimien) return ohiNimien.puoli;
  // Viimeinen olki: pienin limitys nimiöiden kanssa, tasapelissä
  // kokeilujärjestys — sama sääntö kuin kohdekerroksen väistössä.
  let paras = kyljet[0];
  let pienin = Infinity;
  for (const k of kyljet) {
    const ala = nimiot.reduce((summa, e) => summa + elaintakyLimitysAla(k.laatikko, e), 0);
    if (ala < pienin) { pienin = ala; paras = k; }
  }
  return paras.puoli;
}
