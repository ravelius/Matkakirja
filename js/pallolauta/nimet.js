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
/*
 * ══════════════════════════════════════════════════════════════════
 * NIMIBUDJETTI ZOOMTASON MUKAAN (omistaja 12.9.2026, sanatarkasti:
 * *"Kaupunki tekstejä on liikaa näkyvillä uloimmilla zoom tasoilla
 * koska ne joutuvat panoroitaessa väistelemään toisiaan ja silloin
 * tekstit hyppivät eri paikkoihin"*)
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJAN DIAGNOOSI ON JUURISYY, EI OIRE. Kun nimiöitä on enemmän
 * kuin ruudulle mahtuu, ladonta joutuu väistämään, ja väistöpäätös
 * riippuu siitä, missä kamera sattuu olemaan — sama nimi vaihtaa
 * kylkeä panoroitaessa. Lääke ei ole tasoittaa hyppyä vaan latoa niin
 * harvaan, ettei väistöä juuri tarvita.
 *
 * MITATTU (Chromium 390 × 844 dpr 2, neljä pientä panorointiaskelta,
 * väistö = nimen kyljen tai siirron vaihtuminen; budjetti : nimiä /
 * väistöjä):
 *
 *   näkymän korkeus  ehdokkaita   6     10    14    20    30    40
 *   133,6°           139          2     4     4     5     10    14
 *    85,5°            63          1     1     2     2     2      3
 *    53,4°            21          0     0     0     1     1      1
 *    32,1°            11          0     0     0     0     0      0
 *
 * Eli ladonta on vakaa, kun nimiä on enintään noin neljätoista, ja
 * uloimmilla tasoilla vähemmän. Vanha kiinteä 40 oli lähikuvassa
 * harmiton (ehdokkaita on vain kourallinen) mutta maailmanmitassa
 * kolminkertainen siihen, mikä mahtuu.
 *
 * SÄÄNTÖ ON PORTAATON JA SAMAA MUOTOA KUIN PISTEEN KOKO: budjetti on
 * kääntäen verrannollinen näkymän korkeuteen, eli nimiä on karkeasti
 * VAKIO MÄÄRÄ KARTAN PINTA-ALAA KOHDEN. Vertailukorkeus on pelin oma
 * saapumisnäkymä (mitattu 19,8°, pyöristettynä 20°), jossa budjetti on
 * täysi 40 — siellä peliä pelataan, eikä siihen kosketa. Ulospäin:
 *
 *   32,1° → 25    53,4° → 15    85,5° →  9
 *   40,1° → 20    64,1° → 12   133,6° →  6 (lattia)
 *
 * Lattia NIMIEN_VAHIN on kuusi: koko maailman mitassa ruudulla on yhä
 * puolisen tusinaa suurinta kaupunkia, jotta kartta ei ole mykkä.
 *
 * NÄKYMÄN KORKEUS, EI LEVEYS — sama perustelu kuin nostojen porteilla
 * (js/pallolauta/nostot.js): kameran pystykulma on kiinteä, joten
 * korkeus asteina on sama luku puhelimella ja työpöydällä, kun taas
 * leveys riippuu ruudun kuvasuhteesta.
 */
/** Näkymän korkeus asteina, jossa nimibudjetti on täysi (saapumisnäkymä). */
export const NIMIBUDJETIN_KORKEUS = 20;
/** Nimiä vähintään, vaikka koko maailma olisi ruudulla. */
export const NIMIEN_VAHIN = 6;
/**
 * Nimibudjetti näkymän korkeudesta (asteina). Portaaton ja kasvava
 * sisäänpäin zoomatessa; tuntematon näkymä saa lattian.
 *
 * @param {number} korkeusAst näkymän korkeus asteina
 */
export function nimibudjetti(korkeusAst) {
  if (!(korkeusAst > 0)) return NIMIEN_VAHIN;
  const luku = Math.round(NIMIEN_KATTO * (NIMIBUDJETIN_KORKEUS / korkeusAst));
  return Math.min(NIMIEN_KATTO, Math.max(NIMIEN_VAHIN, luku));
}
/*
 * NIMI EI SAA LEIKKAUTUA RUUDUN REUNASTA (sama vikailmoitus: kuvassa
 * SHANGHAI, HONGKONG, MANILA, DARWIN ja ADELAIDE ovat puoliksi
 * ruudun ulkopuolella).
 *
 * Reunavara oli +40 px eli nimi ladottiin, vaikka kaupungin piste oli
 * neljäkymmentä pikseliä RUUDUN ULKOPUOLELLA — silloin teksti on
 * väistämättä katkaistu. Nyt pisteen on oltava ruudulla (0), ja lisäksi
 * ladottu nimi pudotetaan, jos sen laatikko ei mahdu kokonaan ruutuun
 * (ks. lado). Jälkimmäinen on se tarkka sääntö: nimi piirtyy pisteen
 * kyljelle, joten pelkkä pisteen sijainti ei kerro, mahtuuko teksti.
 */
export const NIMEN_REUNAVARA_PX = 0;
/** Kuinka monta pikseliä nimi saa ylittää ruudun reunan ennen pudotusta. */
export const NIMEN_REUNAN_SIETO_PX = 1;
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
  ui, merkit, asteet, ruudulla, kotelo, pack = null,
}) {
  let kaupungit = null; // [{ c, lat, lng }] laudan ladontatietue + asteet
  let nimetyt = new Set();
  let laatikot = [];
  let osumat = [];
  let tulos = { nimia: 0, pudotettu: 0, ehdokkaita: 0 };

  /*
   * LAUTA TULEE PALLOLTA EIKÄ PELISTÄ (aalto 3A). Aineisto ladotaan
   * kerran ja jää muistiin, ja lähtövalinnassa (pickstart) pelin lauta
   * on vielä aloitusnäytön oma — eri koordinaatistossa kuin pallo.
   * `pack` on pallon oma lauta (js/pallolauta/lauta.js), jolloin
   * välimuistiin ei voi jäädä väärän laudan pisteitä.
   */
  const aineisto = () => {
    if (kaupungit) return kaupungit;
    kaupungit = karttanimienKaupungit(pack ?? ui.game.pack).map((c) => {
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
  /*
   * `kokoKerroin` ja `pisteSade` tulevat laudalta (js/pallolauta/lauta.js
   * kohdekaupunginMitat, omistaja 8.9.2026: *"tee samoin myös
   * kohdekaupungin tekstille joka jää lähellä liian pieneksi"*).
   * Lähikuvassa nimi on suurempi ja piste leveämpi, ja ladonnan on
   * tiedettävä molemmat: sama laatikko mittaa nimen, väistön ja
   * nostolappujen sovittelun.
   */
  const lado = ({
    varaukset = [], pinot = [], katto = NIMIEN_KATTO, vain = null,
    kokoKerroin = 1, pisteSade = 0,
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
      });
    }
    /*
     * VALINTA ON KAUPUNGIN OMA, EI KAMERAN (omistaja 12.9.2026, ks.
     * NIMIBUDJETTI ZOOMTASON MUKAAN). Järjestys oli ennen `tarkeys`,
     * sitten LÄHIN RUUDUN KESKIPISTETTÄ — ja koska `tarkeys` katkaisee
     * reittiasteen kolmeen, tasapelijoukot ovat isoja ja budjetin
     * leikkaus osui juuri niihin: sama kaupunki putosi ja palasi sen
     * mukaan, mihin suuntaan karttaa liikutti. Nyt tasapelin ratkaisee
     * kaupungin oma reittiaste ja viime kädessä nimi — kummallakaan ei
     * ole mitään tekemistä kameran kanssa, joten sama näkymä antaa
     * aina saman joukon riippumatta siitä, mistä suunnasta sinne
     * tullaan.
     */
    ehdokkaat.sort((a, b) => (b.tarkeys - a.tarkeys)
      || ((b.c.aste ?? 0) - (a.c.aste ?? 0))
      || (a.c.nimi < b.c.nimi ? -1 : 1));
    const ladottu = ladoRuutunimet(ehdokkaat, {
      varaukset, pinot, katto, kokoKerroin, pisteSade, ruutu: { w, h },
    });
    /*
     * REUNASTA LEIKKAUTUVA NIMI PUDOTETAAN (ks. NIMI EI SAA LEIKKAUTUA
     * RUUDUN REUNASTA): nimi piirtyy pisteen kyljelle, joten vasta
     * ladottu laatikko kertoo, mahtuuko teksti ruutuun.
     */
    const mahtuu = (r) => !r || (r.x0 >= -NIMEN_REUNAN_SIETO_PX
      && r.y0 >= -NIMEN_REUNAN_SIETO_PX
      && r.x1 <= w + NIMEN_REUNAN_SIETO_PX
      && r.y1 <= h + NIMEN_REUNAN_SIETO_PX);
    const reunalta = ladottu.nimiot.length;
    ladottu.nimiot = ladottu.nimiot.filter((n) => mahtuu(n.r));
    ladottu.pudotettu += reunalta - ladottu.nimiot.length;
    const datumit = ladottu.nimiot.map((n) => {
      const e = ehdokkaat.find((k) => k.c === n.c);
      /*
       * NIMI ON OSA KAUPUNGIN OSUMAPINTAA (omistaja 9.9.2026,
       * sanatarkasti: *"lisäksi kaupungin nimi saisi olla myös
       * klikattavaa aluetta"*). Laatikko talletetaan PISTEEN SUHTEEN
       * (dx0…dy1), koska ladonta ajetaan vain levossa mutta nimi
       * seuraa pistettään CSS2D:n mukana: osumatesti laskee laatikon
       * napautuksen hetken ruutupisteestä (`laatikko(p)`), samalla
       * tavalla kuin noston nimilappu (js/pallolauta/nostot.js
       * `lappu(p)`).
       */
      const r = n.r ?? null;
      const suhde = r && e ? {
        dx0: r.x0 - e.x, dy0: r.y0 - e.y, dx1: r.x1 - e.x, dy1: r.y1 - e.y,
      } : null;
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
        // Osumapinta ruutupisteestä p (ks. NIMI ON OSA OSUMAPINTAA).
        osuma: suhde ? (p) => ({
          x0: p.x + suhde.dx0, y0: p.y + suhde.dy0, x1: p.x + suhde.dx1, y1: p.y + suhde.dy1,
        }) : null,
        elementti: nimiElementti,
        asettele: asetteleNimi,
      };
    });
    nimetyt = new Set(datumit.map((d) => d.id));
    laatikot = datumit.map((d) => d.laatikko).filter(Boolean);
    osumat = datumit.filter((d) => typeof d.osuma === 'function')
      .map((d) => ({
        id: d.id, lat: d.lat, lng: d.lng, laatikko: d.osuma,
      }));
    merkit.aseta('nimet', datumit);
    tulos = { nimia: datumit.length, pudotettu: ladottu.pudotettu, ehdokkaita: ehdokkaat.length };
    return tulos;
  };

  return {
    lado,
    /**
     * LUKU-API: ladottujen nimien ruutulaatikot kotelon pikseleinä.
     * Nostojen sovittelu (js/pallolauta/sovittelu.js) lukee nämä
     * KIINTEINÄ esteinä — kaupungin nimi on ensisijainen, lappu
     * väistää. Ladonta itse ei lue tätä eikä muutu tästä.
     */
    laatikot: () => laatikot,
    /**
     * OSUMA-API (omistaja 9.9.2026: *"kaupungin nimi saisi olla myös
     * klikattavaa aluetta"*): ladotut nimet osumatestiä varten,
     * `[{ id, lat, lng, laatikko(p) }]`. `laatikko(p)` antaa nimen
     * ruutulaatikon, kun kaupungin piste on ruutupisteessä `p` — sama
     * muoto kuin noston nimilapulla (js/pallolauta/nostot.js
     * `lappu(p)`), jotta molemmat kilpailevat samassa vertailussa
     * (js/pallolauta/lauta.js musteeseenOsunut).
     */
    osumat: () => osumat,
    /** Nimettyjen kaupunkien tunnukset (piste vain nimen kanssa). */
    nimetyt: () => nimetyt,
    nimetty: (id) => nimetyt.has(id),
    /** Viimeisimmän ladonnan luvut (savukkeet). */
    tulos: () => tulos,
    unohda: () => { kaupungit = null; },
  };
}
