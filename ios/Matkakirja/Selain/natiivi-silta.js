/*
 * window.matkakirjaNatiivi — pelin silta iOS-kuoreen.
 *
 * Tämä tiedosto EI ole osa peliä vaan iOS-kuorta: kuori ruiskuttaa sen
 * sivulle ennen pelin omia skriptejä. Selaimessa (Safari, Chrome, työpöytä)
 * window.matkakirjaNatiivi puuttuu kokonaan, joten pelin koodi kysyy aina:
 *
 *     const natiivi = window.matkakirjaNatiivi;
 *     if (natiivi?.onkoNatiivi && natiivi.ominaisuudet.luenta) { ... }
 *
 * Kaikki komennot palauttavat lupauksen (Promise). Lupaus hylätään
 * Error-oliolla, jonka viesti on suomeksi ja näytettävissä sellaisenaan.
 *
 * RAJAPINTA
 *
 *   onkoNatiivi      true (olio on olemassa vain kuoressa)
 *   alusta           'ios'
 *   versio           sillan versio, esim. '1.0.0'
 *   kuorenVersio     sovelluksen versionumero (ei pelin versio)
 *   jarjestelma      iOS-versio, esim. '18.2'
 *   ominaisuudet     { luenta, sanelu, luennanKorostus, aktivoitumisviesti }
 *   tiedot()         -> Promise<ominaisuudet tuoreena>
 *
 *   luenta.puhu(teksti, kieli?, asetukset?)
 *       asetukset: { nopeus?: number (1.0 = normaali), korkeus?: number
 *                    (0.5–2.0), aani?: string (tunnus luenta.aanet:ista) }
 *       -> Promise<{ tunnus, tila: 'valmis' | 'keskeytetty' }>
 *          Lupaus ratkeaa VASTA kun puhe on loppunut.
 *   luenta.pysayta()            -> Promise<{ tila: 'pysaytetty' }>
 *   luenta.aanet(kieli?)        -> Promise<{ aanet: [{ tunnus, nimi, kieli,
 *                                  laatu: 'perus'|'parannettu'|'huippu' }] }>
 *   luenta.puhuuko()            -> Promise<{ puhuu: boolean }>
 *
 *   sanelu.luvat()              -> Promise<{ mikrofoni, puheentunnistus, kunnossa }>
 *                                  Kysyy luvat; näytä mikrofoninappi vasta jos kunnossa.
 *   sanelu.aloita(asetukset?)   asetukset: { kieli?: 'fi-FI',
 *                                            laitteessa?: boolean }
 *       -> Promise<{ tila: 'kuuntelee', kieli, laitteessa }>
 *   sanelu.lopeta()             -> Promise<{ tila: 'lopetettu'|'ei-kaynnissa', teksti }>
 *   sanelu.kuunteleeko()        -> Promise<{ kuuntelee: boolean }>
 *
 *   kuuntele(laji, kuulija)     -> function, joka poistaa kuulijan
 *   alaKuuntele(laji, kuulija)
 *
 * TAPAHTUMAT (laji → kentät)
 *   'luenta-alkoi'      { tunnus, aani, kieli }
 *   'luenta-alue'       { tunnus, alku, pituus }   luettava kohta, UTF-16-indeksit
 *   'luenta-loppui'     { tunnus, tila }
 *   'sanelu-alkoi'      { kieli, laitteessa }
 *   'sanelu-osittainen' { teksti }                 tulee useita kertoja
 *   'sanelu-valmis'     { teksti }                 viimeistelty tulos
 *   'sanelu-keskeytyi'  { teksti }                 sovellus meni taustalle
 *   'sanelu-virhe'      { syy, viesti }
 *   'aktivoitui'        { }                        sovellus palasi etualalle
 *   'taustalle'         { }
 *   '*'                 kaikki tapahtumat
 *
 * Tapahtumat lähtevät myös tavallisena DOM-tapahtumana:
 *   window.addEventListener('matkakirja-natiivi', (e) => e.detail.laji)
 *
 * PÄIVITYSTARKISTUS
 *   Kun sovellus palaa etualalle, kuori lähettää sivulle tapahtuman
 *   'matkakirja-tarkista-paivitys' ja pyytää palvelutyöntekijää
 *   tarkistamaan uuden version. Peli päättää itse, mitä tekee.
 */
(function () {
  'use strict';

  if (window.matkakirjaNatiivi) { return; }

  var tiedot = window.__matkakirjaNatiiviTiedot || {};
  try { delete window.__matkakirjaNatiiviTiedot; } catch (virhe) { /* ei väliä */ }

  var kanava = (window.webkit
    && window.webkit.messageHandlers
    && window.webkit.messageHandlers.matkakirjaNatiivi) || null;

  var kuulijat = Object.create(null);

  function kutsu(komento, data) {
    if (!kanava) {
      return Promise.reject(new Error('Natiivisiltaa ei ole käytettävissä'));
    }
    try {
      return Promise.resolve(kanava.postMessage({ komento: komento, data: data || {} }));
    } catch (virhe) {
      return Promise.reject(virhe);
    }
  }

  function kuuntele(laji, kuulija) {
    if (typeof kuulija !== 'function') { return function () {}; }
    if (!kuulijat[laji]) { kuulijat[laji] = []; }
    kuulijat[laji].push(kuulija);
    return function poista() { alaKuuntele(laji, kuulija); };
  }

  function alaKuuntele(laji, kuulija) {
    var lista = kuulijat[laji];
    if (!lista) { return; }
    var kohta = lista.indexOf(kuulija);
    if (kohta >= 0) { lista.splice(kohta, 1); }
  }

  function tapahtuma(viesti) {
    var tieto = viesti || {};
    var laji = tieto.laji || '';
    var lista = (kuulijat[laji] || []).concat(kuulijat['*'] || []);
    for (var i = 0; i < lista.length; i += 1) {
      try {
        lista[i](tieto);
      } catch (virhe) {
        // Yksi rikkinäinen kuulija ei saa katkaista muita.
        if (window.console && console.error) { console.error('matkakirjaNatiivi', virhe); }
      }
    }
    try {
      window.dispatchEvent(new CustomEvent('matkakirja-natiivi', { detail: tieto }));
    } catch (virhe) { /* vanha selainmoottori */ }
  }

  var luenta = {
    puhu: function (teksti, kieli, asetukset) {
      var lisa = asetukset || {};
      return kutsu('luenta.puhu', {
        teksti: teksti === null || teksti === undefined ? '' : String(teksti),
        kieli: kieli || 'fi-FI',
        nopeus: typeof lisa.nopeus === 'number' ? lisa.nopeus : null,
        korkeus: typeof lisa.korkeus === 'number' ? lisa.korkeus : null,
        aani: lisa.aani || null
      });
    },
    pysayta: function () { return kutsu('luenta.pysayta'); },
    aanet: function (kieli) { return kutsu('luenta.aanet', { kieli: kieli || null }); },
    puhuuko: function () { return kutsu('luenta.puhuuko'); }
  };

  var sanelu = {
    luvat: function () { return kutsu('sanelu.luvat'); },
    aloita: function (asetukset) {
      var lisa = asetukset || {};
      return kutsu('sanelu.aloita', {
        kieli: lisa.kieli || 'fi-FI',
        laitteessa: typeof lisa.laitteessa === 'boolean' ? lisa.laitteessa : null
      });
    },
    lopeta: function () { return kutsu('sanelu.lopeta'); },
    kuunteleeko: function () { return kutsu('sanelu.kuunteleeko'); }
  };

  window.matkakirjaNatiivi = {
    onkoNatiivi: true,
    alusta: tiedot.alusta || 'ios',
    versio: tiedot.versio || '0',
    kuorenVersio: tiedot.kuorenVersio || '',
    jarjestelma: tiedot.jarjestelma || '',
    ominaisuudet: tiedot.ominaisuudet || { luenta: false, sanelu: false },

    tiedot: function () { return kutsu('tiedot'); },

    luenta: luenta,
    sanelu: sanelu,

    // Oikopolut yleisimpiin: matkakirjaNatiivi.puhu('teksti')
    puhu: luenta.puhu,
    pysayta: luenta.pysayta,

    kuuntele: kuuntele,
    alaKuuntele: alaKuuntele,

    // Kuori kutsuu tätä. Peli ei kutsu.
    _tapahtuma: tapahtuma
  };
}());
