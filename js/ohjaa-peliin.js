/*
 * OHJAA PELIIN (17.11.2026): yhteensopivuusskripti etusivulle.
 *
 * Peli asuu osoitteessa pelaa.html; etusivu index.html on (tai tulee olemaan) pelin esittely. Ne, joilla
 * peli jo on, ohjataan suoraan pelaa.html:ään, jotta vanhat kuvakkeet, linkit ja kuoret eivät avaa esittelyä:
 *   - kotinäytön sovellus: (display-mode: standalone) tai iOS:n navigator.standalone
 *   - selaimessa on tallennus: localStorage 'matkakirja-save-v1'
 *   - osoitteessa on pelin parametri (esim. natiivin lehtinäkymä ?lehti=, ?lauta=, ?dev=) tai hash #esittely
 *   - sivu on iOS-kuoressa (window.webkit.messageHandlers.matkakirja)
 * Uusi kävijä näkee etusivun. ?esittely ohittaa ohjauksen (näkee esittelyn, vaikka laitteella on tallennus).
 *
 * KLASSINEN SKRIPTI, EI ES-MODUULI: sen pitää ajaa ennen kaikkea muuta (moduulit lykätään). Etusivu upottaa
 * sen <head>:n alkuun joko src:llä (<script src="js/ohjaa-peliin.js"></script>, ei async/defer) tai
 * inlinenä. Ei riippuvuuksia, ei nuolifunktioita tms. vaatimuksia vanhoille selaimille.
 *
 * Päätöslogiikka on funktiona window.MatkakirjaOhjaus.ohjauksenSyy(ymparisto), jotta testi
 * (tests/ohjaa-peliin.test.mjs) voi ajaa sen mock-ympäristöllä ilman selainta.
 */
(function (juuri) {
  'use strict';

  var PELI = 'pelaa.html';
  var TALLENNUS = 'matkakirja-save-v1';

  /*
   * Pelin tuotannolliset ja kehittäjän osoiteparametrit (lista js/:n lukemista parametreista; kaikkia ~100
   * koevipua ei luetella, vain ne, joita käytetään jaetuissa linkeissä tai natiivista).
   */
  var PELIN_PARAMETRIT = [
    'lehti', // natiivin lehtinäkymä (js/lehtikuori.js; tools/vienti/web-riippuvuudet.mjs)
    'lauta', // katselutila (js/main.js)
    'dev', // kehittäjän pikatie (js/kehittaja-pikatie.js)
    'koe', // piirtokokeet (js/piirtokoe-asetus.js)
    'kortti', // korttivalinta (js/main.js)
    'omistaja', // omistajan laite (js/kaynti.js)
    'paivitys', // päivitä-napin välimuistin ohitus (js/main.js)
    'turvatila', // turvatila (js/main.js)
    'esilataus', // laattaesilataus (js/laattaesilataus.js)
    'valikko', // pilleripaneeli (js/pilleri-paneeli.js)
    'etusivupallo', // etusivun pallo (js/ui-apurit.js)
  ];
  var ESITTELY_HASH = '#esittely';
  var OHITUS = 'esittely';

  function parametrit(search) {
    var tulos = {};
    var s = typeof search === 'string' ? search.replace(/^\?/, '') : '';
    if (!s) return tulos;
    var osat = s.split('&');
    for (var i = 0; i < osat.length; i++) {
      if (!osat[i]) continue;
      var nimi = osat[i].split('=')[0];
      try { nimi = decodeURIComponent(nimi.replace(/\+/g, ' ')); } catch (e) { /* jätetään raakana */ }
      tulos[nimi] = true;
    }
    return tulos;
  }

  /**
   * Miksi sivu ohjataan peliin: 'pelisivu' (jo pelissä: ei ohjata), 'ohitus', 'kuori', 'asennettu',
   * 'parametri', 'esittely-hash', 'tallennus' tai '' (ei ohjata). Vain 'kuori', 'asennettu', 'parametri',
   * 'esittely-hash' ja 'tallennus' ohjaavat (ks. pitaakoOhjata).
   */
  function ohjauksenSyy(w) {
    if (!w || !w.location) return '';
    var loc = w.location;
    var polku = String(loc.pathname || '');
    if (/(^|\/)pelaa\.html$/i.test(polku)) return 'pelisivu';
    var haku = parametrit(String(loc.search || ''));
    if (haku[OHITUS]) return 'ohitus';
    try {
      if (w.webkit && w.webkit.messageHandlers && w.webkit.messageHandlers.matkakirja) return 'kuori';
    } catch (e) { /* ei kuorta */ }
    try {
      if (w.navigator && w.navigator.standalone === true) return 'asennettu';
      if (typeof w.matchMedia === 'function' && w.matchMedia('(display-mode: standalone)').matches) return 'asennettu';
    } catch (e) { /* ei tietoa */ }
    for (var i = 0; i < PELIN_PARAMETRIT.length; i++) {
      if (haku[PELIN_PARAMETRIT[i]]) return 'parametri';
    }
    if (String(loc.hash || '').toLowerCase() === ESITTELY_HASH) return 'esittely-hash';
    try {
      if (w.localStorage && w.localStorage.getItem(TALLENNUS) != null) return 'tallennus';
    } catch (e) { /* tallennus estetty (yksityinen tila tms.) */ }
    return '';
  }

  function pitaakoOhjata(w) {
    var syy = ohjauksenSyy(w);
    return syy !== '' && syy !== 'pelisivu' && syy !== 'ohitus';
  }

  /** Pelin osoite samassa kansiossa, kysely ja hash mukana. */
  function pelinOsoite(w) {
    var loc = (w && w.location) || {};
    return PELI + String(loc.search || '') + String(loc.hash || '');
  }

  /** Ohjaa, jos pitää; palauttaa syyn tai ''. */
  function ohjaaPeliin(w) {
    if (!pitaakoOhjata(w)) return '';
    var syy = ohjauksenSyy(w);
    w.location.replace(pelinOsoite(w));
    return syy;
  }

  var api = {
    PELI: PELI,
    TALLENNUS: TALLENNUS,
    PELIN_PARAMETRIT: PELIN_PARAMETRIT.slice(),
    ohjauksenSyy: ohjauksenSyy,
    pitaakoOhjata: pitaakoOhjata,
    pelinOsoite: pelinOsoite,
    ohjaaPeliin: ohjaaPeliin,
  };
  juuri.MatkakirjaOhjaus = api;
  if (juuri.location && juuri.document) ohjaaPeliin(juuri);
})(typeof window !== 'undefined' ? window : this);
