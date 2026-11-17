/*
 * OHJAA PELIIN (17.11.2026): etusivun (index.html = pelin esittely) ohjaus peliin pelaa.html.
 *
 * Linjaus (omistaja 17.11.2026 klo 11.34: vanhojen pelaajien varotoimia ei tarvita): etusivulta ohjataan
 * pelaa.html:ään VAIN, jos
 *   - osoitteessa on pelin parametri (esim. natiivin lehtinäkymän vanha index.html?lehti=, ?lauta=, ?dev=), tai
 *   - sivu on iOS-kuoressa (window.webkit.messageHandlers.matkakirja).
 * Ei standalone- eikä tallennustarkistusta. Pelkkä #esittely jää etusivulle (sivulla on oma #esittely-ankkuri).
 *
 * KLASSINEN SKRIPTI, EI ES-MODUULI: sen pitää ajaa ennen kaikkea muuta (moduulit lykätään). Etusivu lataa sen
 * <head>:n alussa ilman async/deferiä. Ei riippuvuuksia.
 *
 * Päätöslogiikka on funktiona window.MatkakirjaOhjaus.ohjauksenSyy(ymparisto), jotta testi
 * (tests/ohjaa-peliin.test.mjs) voi ajaa sen mock-ympäristöllä ilman selainta.
 */
(function (juuri) {
  'use strict';

  var PELI = 'pelaa.html';

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

  /** Miksi sivu ohjataan peliin: 'kuori', 'parametri' tai '' (ei ohjata; myös jo pelisivulla). */
  function ohjauksenSyy(w) {
    if (!w || !w.location) return '';
    var loc = w.location;
    if (/(^|\/)pelaa\.html$/i.test(String(loc.pathname || ''))) return '';
    try {
      if (w.webkit && w.webkit.messageHandlers && w.webkit.messageHandlers.matkakirja) return 'kuori';
    } catch (e) { /* ei kuorta */ }
    var haku = parametrit(String(loc.search || ''));
    for (var i = 0; i < PELIN_PARAMETRIT.length; i++) {
      if (haku[PELIN_PARAMETRIT[i]]) return 'parametri';
    }
    return '';
  }

  function pitaakoOhjata(w) {
    return ohjauksenSyy(w) !== '';
  }

  /** Pelin osoite samassa kansiossa, kysely ja hash mukana. */
  function pelinOsoite(w) {
    var loc = (w && w.location) || {};
    return PELI + String(loc.search || '') + String(loc.hash || '');
  }

  /** Ohjaa, jos pitää; palauttaa syyn tai ''. */
  function ohjaaPeliin(w) {
    var syy = ohjauksenSyy(w);
    if (syy) w.location.replace(pelinOsoite(w));
    return syy;
  }

  juuri.MatkakirjaOhjaus = {
    PELI: PELI,
    PELIN_PARAMETRIT: PELIN_PARAMETRIT.slice(),
    ohjauksenSyy: ohjauksenSyy,
    pitaakoOhjata: pitaakoOhjata,
    pelinOsoite: pelinOsoite,
    ohjaaPeliin: ohjaaPeliin,
  };
  if (juuri.location && juuri.document) ohjaaPeliin(juuri);
})(typeof window !== 'undefined' ? window : this);
