/*
 * PALLOLAUDAN NIMET — kaupunkien nimet elävinä tekstielementteinä
 * pallon päällä (vaihe 3, docs/moduulit/karttapallo.md luku 4.2 ja 7).
 *
 * OMISTAJAN VASTAUS 5.9.2026 (Raamattu, KYSYMYSKORTIT AINA, sanatarkasti):
 * *"kaupunkien nimet pallolaudalla ELAVINA tekstielementteina laattojen
 * paalla (kuten Google Earth: kuva laatoissa, nimet ja rajat elavina),
 * laatoissa lisaksi poltettuina varana"*.
 *
 * ── LADONTA ON LAUDAN OMA, RUUTUAVARUUDESSA ────────────────────────
 *
 * Tasokartan nimikerros (js/karttanimet.js) latoo nimet ruudun
 * pikseleissä — nimi on paperivakio — ja sama sääntö on tuotu tänne
 * yhtenä funktiona (ladoRuutunimet): laudan oma asettelu (la/lx/ly)
 * ensin, pelimerkin väistökehä, tavanomaiset paikat, kartografin kehä,
 * liuku. Pallolla piste on jo projisoitu ruudulle (getScreenCoords),
 * ja siitä eteenpäin kaikki on täsmälleen sama mitta kuin kartalla.
 *
 * KATTO 40 JA PISTE VAIN NIMEN KANSSA. Elementit ovat CSS2D-solmuja,
 * joiden paikan kirjasto laskee joka kehys (karttapallo.md luku 6), joten
 * nimiä on enintään NIMIEN_KATTO; ehdokkaat tulevat tärkeysjärjestyksessä
 * (pelaajan kaupunki, lähtökaupunki, lentokenttä, reittisolmun aste,
 * lähin ruudun keskipistettä), ja vähäisimmät putoavat. Pudonnut
 * kaupunki ei saa pistettäkään (omistaja 31.8.2026: *"Pelkkiä pisteitä
 * ei saa näkyä"*) — js/pallolauta/lauta.js lukee nimettyjen joukon tästä
 * ja antaa pistekerrokselle vain sen.
 *
 * LADONTA LASKETAAN VAIN KUN KAMERA PYSÄHTYY (js/pallo.js laatunoston
 * malli, LAATU_LEPOVIIVE_MS): liikkeessä nimet seuraavat pistettään
 * CSS2D:n mukana, ja vasta levossa ladonta ajetaan uudelleen. Näin
 * 261 nimen mitat eivät koskaan maksa kehystä (karttapallo.md riski 4).
 *
 * ILMESTYMINEN JA POISTUMINEN ANIMOIDAAN merkkirekisterissä
 * (js/pallolauta/merkit.js): sisään häivytys, ulos häivytys, siirto
 * pisteestä uuteen paikkaan CSS-siirtymällä (asetteleNimi).
 */

import {
  KARTTANIMI_FONTTI, karttanimienKaupungit, ladoRuutunimet,
} from '../karttanimet.js';

/** Nimiä pallolla enintään kerrallaan (karttapallo.md luku 6). */
export const NIMIEN_KATTO = 40;
/** Reunavara: nimi ladotaan, jos piste on tämän verran ruudun ulkopuolella (px). */
export const NIMEN_REUNAVARA_PX = 40;
/** Pelaajan oma kaupunki voittaa kaikki muut ehdokkaat. */
const OMAN_KAUPUNGIN_TARKEYS = 1000;

const SVG = 'http://www.w3.org/2000/svg';

/**
 * Nimen elementti: pieni svg pisteen kohdalla, sisällä siirtoryhmä ja
 * tasokartan omilla luokilla tyylittyvä teksti (.karttanimi
 * .karttanimi-kaupunki: kirjasin, muste). Osumaa ei ole — nimen
 * napautus on kaupungin napautus, ja sen ratkaisee pallon oma
 * osumatesti (js/pallolauta/lauta.js).
 */
export function nimiElementti(d) {
  const el = document.createElement('div');
  el.className = 'pallolauta-nimi';
  el.dataset.kaupunki = d.id;
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('width', '1');
  svg.setAttribute('height', '1');
  svg.setAttribute('aria-hidden', 'true');
  const g = document.createElementNS(SVG, 'g');
  g.setAttribute('class', 'pallolauta-nimi-siirto');
  const teksti = document.createElementNS(SVG, 'text');
  teksti.setAttribute('class', 'karttanimi karttanimi-kaupunki');
  teksti.style.fontFamily = KARTTANIMI_FONTTI;
  g.appendChild(teksti);
  svg.appendChild(g);
  el.appendChild(svg);
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', d.teksti);
  return el;
}

/** Nimen sisäasettelu datumin mitoista (siirtymä, koko, asu). */
export function asetteleNimi(el, d) {
  const g = el.querySelector('.pallolauta-nimi-siirto');
  const teksti = el.querySelector('text');
  if (!g || !teksti) return;
  g.style.transform = `translate(${d.dx.toFixed(2)}px, ${d.dy.toFixed(2)}px)`;
  teksti.setAttribute('font-size', String(d.koko));
  teksti.setAttribute('text-anchor', d.ank);
  if (d.tyylitys) teksti.setAttribute('font-variant', d.tyylitys);
  else teksti.removeAttribute('font-variant');
  if (d.vali) teksti.setAttribute('letter-spacing', String(d.vali));
  else teksti.removeAttribute('letter-spacing');
  if (teksti.textContent !== d.teksti) teksti.textContent = d.teksti;
}

/**
 * Nimikerros pallolle. `ruudulla(lat, lng, vara)` (js/pallolauta/lauta.js)
 * antaa pisteen kotelon pikseleinä tai null, jos piste on pallon takana
 * tai ruudun ulkopuolella; `merkit` on merkkirekisteri (osa `nimet`).
 */
export function luoNimet({
  ui, merkit, asteet, ruudulla, kotelo,
}) {
  let kaupungit = null; // [{ c, lat, lng }] laudan ladontatietue + asteet
  let nimetyt = new Set();
  let tulos = { nimia: 0, pudotettu: 0, ehdokkaita: 0 };

  const aineisto = () => {
    if (kaupungit) return kaupungit;
    kaupungit = karttanimienKaupungit(ui.game.pack).map((c) => {
      const a = asteet(c);
      return a ? { c, lat: a.lat, lng: a.lon } : null;
    }).filter(Boolean);
    return kaupungit;
  };

  /**
   * Latoo näkyvät nimet. `varaukset` ovat muun musteen laatikot
   * (elävät nostot), `pinot` pelimerkkien laatikot (nappula, kohteet),
   * kumpikin kotelon pikseleinä; `katto` on tämän ladonnan nimibudjetti.
   *
   * `vain` rajaa ehdokkaat annettuihin kaupunkeihin. Sitä käyttää
   * AVAUSLENTO (js/pallolauta/avaus.js): omistaja 3.9.2026 sanatarkasti
   * *"muiden kaupunkien kuin lontoon ja kohdekaupungin nimiä ei
   * tarvita"* — sama sääntö kuin tasokartan lentotilassa
   * (js/karttanimet.js), vain eri kerroksessa.
   */
  const lado = ({
    varaukset = [], pinot = [], katto = NIMIEN_KATTO, vain = null,
  } = {}) => {
    const w = kotelo.clientWidth;
    const h = kotelo.clientHeight;
    if (!(w > 0) || !(h > 0) || ui.dead) return tulos;
    const oma = ui.game.cityOf?.()?.id ?? null;
    const ehdokkaat = [];
    for (const k of aineisto()) {
      if (vain && !vain.has(k.c.id)) continue;
      const p = ruudulla(k.lat, k.lng, NIMEN_REUNAVARA_PX);
      if (!p) continue;
      ehdokkaat.push({
        c: k.c,
        x: p.x,
        y: p.y,
        lat: k.lat,
        lng: k.lng,
        tarkeys: k.c.tarkeys + (k.c.id === oma ? OMAN_KAUPUNGIN_TARKEYS : 0),
        etaisyys: Math.hypot(p.x - w / 2, p.y - h / 2),
      });
    }
    // Tärkein ensin; tasapelissä lähin ruudun keskipistettä, sitten nimi.
    ehdokkaat.sort((a, b) => (b.tarkeys - a.tarkeys)
      || (a.etaisyys - b.etaisyys)
      || (a.c.nimi < b.c.nimi ? -1 : 1));
    const ladottu = ladoRuutunimet(ehdokkaat, { varaukset, pinot, katto });
    const datumit = ladottu.nimiot.map((n) => {
      const e = ehdokkaat.find((k) => k.c === n.c);
      return {
        avain: `nimi:${n.c.id}`,
        laji: 'nimi',
        id: n.c.id,
        teksti: n.c.nimi,
        lat: e.lat,
        lng: e.lng,
        dx: n.dx,
        dy: n.dy,
        ank: n.ank,
        koko: n.koko,
        tyylitys: n.tyylitys,
        vali: n.vali,
        laatikko: n.r,
        elementti: nimiElementti,
        asettele: asetteleNimi,
      };
    });
    nimetyt = new Set(datumit.map((d) => d.id));
    merkit.aseta('nimet', datumit);
    tulos = { nimia: datumit.length, pudotettu: ladottu.pudotettu, ehdokkaita: ehdokkaat.length };
    return tulos;
  };

  return {
    lado,
    /** Nimettyjen kaupunkien tunnukset (piste vain nimen kanssa). */
    nimetyt: () => nimetyt,
    nimetty: (id) => nimetyt.has(id),
    /** Viimeisimmän ladonnan luvut (savukkeet). */
    tulos: () => tulos,
    unohda: () => { kaupungit = null; },
  };
}
