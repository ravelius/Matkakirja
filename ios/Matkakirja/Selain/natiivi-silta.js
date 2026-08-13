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
 * Ominaisuuslista voi kasvaa kuoren päivitysten myötä, ja vanha kuori voi
 * jäädä puhelimeen pitkäksi aikaa. Siksi puuttuva ominaisuus luetaan aina
 * epätodeksi eikä oletuksena todeksi.
 *
 * Kaikki komennot palauttavat lupauksen (Promise). Lupaus hylätään
 * Error-oliolla, jonka viesti on suomeksi ja näytettävissä sellaisenaan.
 * Hylkäys on varattu oikeille virheille (väärä parametri, liian suuri
 * tallennus). Puuttuva lupa, kirjautumaton pelaaja tai tukematon laite
 * ratkeaa onnistuneena lupauksena, jonka `tila` kertoo mitä tapahtui.
 *
 * RAJAPINTA
 *
 *   onkoNatiivi      true (olio on olemassa vain kuoressa)
 *   alusta           'ios'
 *   versio           sillan versio, esim. '1.1.0'
 *   kuorenVersio     sovelluksen versionumero (ei pelin versio)
 *   jarjestelma      iOS-versio, esim. '18.2'
 *   ominaisuudet     { luenta, sanelu, luennanKorostus, aktivoitumisviesti,
 *                      talle, talleSynkka, haptiikka, jako, pelikeskus,
 *                      widget, ilmoitukset, aikeet }
 *   tiedot()         -> Promise<ominaisuudet tuoreena>
 *
 * --- Luenta (teksti puheeksi) ---
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
 * --- Sanelu (puhe tekstiksi) ---
 *
 *   sanelu.luvat()              -> Promise<{ mikrofoni, puheentunnistus, kunnossa }>
 *                                  Kysyy luvat; näytä mikrofoninappi vasta jos kunnossa.
 *   sanelu.aloita(asetukset?)   asetukset: { kieli?: 'fi-FI',
 *                                            laitteessa?: boolean }
 *       -> Promise<{ tila: 'kuuntelee', kieli, laitteessa }>
 *   sanelu.lopeta()             -> Promise<{ tila: 'lopetettu'|'ei-kaynnissa', teksti }>
 *   sanelu.kuunteleeko()        -> Promise<{ kuuntelee: boolean }>
 *
 * --- Tallennussynkka (iCloudin avain–arvo-varasto) ---
 *
 * Silta VÄLITTÄÄ vain. Se ei yhdistä tallennuksia eikä valitse voittajaa:
 * jokaisen arvon mukana kulkee aikaleima, ja peli päättää itse kumpi
 * voittaa (sääntö: uusin aikaleima voittaa). Arvo on aina merkkijono —
 * peli sarjallistaa tallennuksensa itse (JSON.stringify).
 *
 * Koko varasto on iCloudissa 1 Mt; silta hylkää yli 900 kt:n arvon.
 *
 *   talle.vie(avain, arvo, aika?)
 *       aika: millisekunteja epookista; oletus = nyt.
 *       -> Promise<{ avain, aika, tavuja, pilvi }>
 *   talle.tuo(avain)
 *       -> Promise<{ avain, loytyi, arvo: string|null, aika, pilvi }>
 *          loytyi=false EI ole virhe: uusi laite on tyhjä.
 *   talle.poista(avain)         -> Promise<{ avain, tila: 'poistettu' }>
 *   talle.avaimet()             -> Promise<{ avaimet: [{ avain, aika, tavuja }], pilvi }>
 *
 *   `pilvi` kertoo, onko laitteessa iCloud-tili. Ilman sitä varasto toimii
 *   yhä, mutta vain paikallisesti — tallennus ei siirry toiseen laitteeseen.
 *
 * --- Haptiikka ---
 *
 *   haptiikka.nayta(laji)       laji: 'kevyt' | 'keskitaso' | 'onnistui' | 'juhla'
 *       -> Promise<{ tila: 'ok'|'ohitettu', laji }>
 *          Ei jonoa, ei virhettä. Laite jossa ei ole haptiikkaa vastaa 'ok'
 *          eikä tee mitään; tuntematon laji vastaa 'ohitettu'.
 *
 * --- Jako ---
 *
 *   jaa.teksti(teksti)          -> Promise<{ tila: 'jaettu'|'peruttu', kohde }>
 *   jaa.kuva(dataUrl, teksti?)  dataUrl: 'data:image/png;base64,…'
 *                                  (esimerkiksi canvas.toDataURL())
 *       -> Promise<{ tila: 'jaettu'|'peruttu', kohde }>
 *          Lupaus ratkeaa vasta kun pelaaja sulkee jakoikkunan.
 *
 * --- Game Center ---
 *
 * Saavutustunnukset ovat vapaita merkkijonoja, mutta niiden on oltava
 * luotuina App Store Connectissa samoilla tunnuksilla — muuten vastaus on
 * 'hylatty'. Ks. ios/OHJE.md.
 *
 *   pelikeskus.kirjaudu()       -> Promise<{ kirjautunut, nimi, tunnus, syy }>
 *                                  Hiljainen epäonnistuminen: kirjautunut=false
 *                                  ei ole virhe eikä sitä pidä näyttää pelaajalle.
 *   pelikeskus.saavutus(tunnus, osuus?)
 *       osuus: 0–100, oletus 100.
 *       -> Promise<{ tila: 'kirjattu'|'ei-kirjautunut'|'hylatty', tunnus, osuus, syy? }>
 *   pelikeskus.nayta()          -> Promise<{ tila: 'avattu'|'ei-kirjautunut'|'ei-tilaa' }>
 *
 * --- Widget-data (kotinäyttö ja Siri) ---
 *
 * Widget näyttää tasan sen mitä tänne kirjoitetaan. Se ei lue peliä eikä
 * laske mitään. Kentät ovat valmiiksi näytettävässä muodossa: kuori ei
 * muotoile rahaa eikä taivuta kaupunginnimiä.
 *
 *   widget.paivita({ kaupunki, maa?, paiva, raha? })
 *       raha esimerkiksi '£1 200'. paiva on kokonaisluku.
 *       -> Promise<{ tila: 'paivitetty', ryhma }>
 *   widget.tyhjenna()           -> Promise<{ tila: 'tyhjennetty' }>
 *                                  Widget palaa "Matka ei ole alkanut" -asuun.
 *   widget.lue()                -> Promise<{ asetettu, kaupunki, maa, paiva, raha, paivitetty }>
 *
 *   Sama data vastaa Siri-kysymykseen "Missä olen Matkakirjassa".
 *
 * --- Push-ilmoitukset (VAIN rekisteröinti) ---
 *
 * Kuoressa on vain kuuntelupää: lupa ja laitetunnus. Lähetysputkea EI ole
 * eikä sitä rakenneta kuoreen — se on oma projektinsa (ios/OHJE.md).
 * Ennen kuin lähetyspää on olemassa, tästä ei tule yhtään ilmoitusta.
 *
 *   ilmoitukset.pyydaLupa()     -> Promise<{ lupa: boolean, token, syy }>
 *       Kysyy luvan kerran. Tunnus ei ole valmis heti — se saapuu
 *       tapahtumana 'ilmoitukset-token'.
 *   ilmoitukset.tila()          -> Promise<{ tila: 'kysymatta'|'sallittu'|'kielletty'|
 *                                            'hiljainen'|'tilapainen', token, rekisteroity }>
 *
 * --- Kuulijat ---
 *
 *   kuuntele(laji, kuulija)     -> function, joka poistaa kuulijan
 *   alaKuuntele(laji, kuulija)
 *
 * TAPAHTUMAT (laji → kentät)
 *   'luenta-alkoi'          { tunnus, aani, kieli }
 *   'luenta-alue'           { tunnus, alku, pituus }   luettava kohta, UTF-16-indeksit
 *   'luenta-loppui'         { tunnus, tila }
 *   'sanelu-alkoi'          { kieli, laitteessa }
 *   'sanelu-osittainen'     { teksti }                 tulee useita kertoja
 *   'sanelu-valmis'         { teksti }                 viimeistelty tulos
 *   'sanelu-keskeytyi'      { teksti }                 sovellus meni taustalle
 *   'sanelu-virhe'          { syy, viesti }
 *   'talle-muuttui'         { syy, muutokset: [{ avain, aika, poistettu }] }
 *                           iCloudista tuli uudempi arvo. ARVOA EI OLE MUKANA:
 *                           peli hakee sen talle.tuo(avain):lla ja päättää
 *                           sitten, korvaako se paikallisen tallennuksen.
 *                           syy: 'palvelin'|'ensisynkka'|'kiintio'|'tili'
 *   'pelikeskus-tila'       { kirjautunut, nimi, tunnus, syy }
 *   'pelikeskus-suljettiin' { }                        Game Centerin ruutu meni kiinni
 *   'ilmoitukset-token'     { token }                  APNs-laitetunnus heksana
 *   'ilmoitukset-virhe'     { syy, viesti }
 *   'aktivoitui'            { }                        sovellus palasi etualalle
 *   'taustalle'             { }
 *   '*'                     kaikki tapahtumat
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

  /** Merkkijonoksi ilman että null ja undefined muuttuvat sanoiksi. */
  function teksti(arvo) {
    return arvo === null || arvo === undefined ? '' : String(arvo);
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
    puhu: function (teksti_, kieli, asetukset) {
      var lisa = asetukset || {};
      return kutsu('luenta.puhu', {
        teksti: teksti(teksti_),
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

  var talle = {
    // Arvo on aina merkkijono. Olio sarjallistetaan tässä, jotta pelin
    // koodissa ei tarvitse muistaa JSON.stringifyä joka kerta — mutta
    // sarjallistus on silti pelin oma valinta, koska sen jälkeen sillan
    // ei tarvitse tietää tallennusmuodosta mitään.
    vie: function (avain, arvo, aika) {
      var runko = typeof arvo === 'string' ? arvo : JSON.stringify(arvo);
      return kutsu('talle.vie', {
        avain: teksti(avain),
        arvo: runko === undefined ? '' : runko,
        aika: typeof aika === 'number' ? aika : null
      });
    },
    tuo: function (avain) { return kutsu('talle.tuo', { avain: teksti(avain) }); },
    poista: function (avain) { return kutsu('talle.poista', { avain: teksti(avain) }); },
    avaimet: function () { return kutsu('talle.avaimet'); }
  };

  var haptiikka = {
    nayta: function (laji) { return kutsu('haptiikka.nayta', { laji: teksti(laji) || 'kevyt' }); }
  };

  var jaa = {
    teksti: function (sisalto) { return kutsu('jaa.teksti', { teksti: teksti(sisalto) }); },
    kuva: function (dataUrl, saate) {
      return kutsu('jaa.kuva', {
        kuva: teksti(dataUrl),
        teksti: saate === null || saate === undefined ? null : String(saate)
      });
    }
  };

  var pelikeskus = {
    kirjaudu: function () { return kutsu('pelikeskus.kirjaudu'); },
    saavutus: function (tunnus, osuus) {
      return kutsu('pelikeskus.saavutus', {
        tunnus: teksti(tunnus),
        osuus: typeof osuus === 'number' ? osuus : null
      });
    },
    nayta: function () { return kutsu('pelikeskus.nayta'); }
  };

  var widget = {
    // Kelpaa sekä olio että JSON-merkkijono: pelin puolella tila voi olla
    // valmiiksi sarjallistettuna, eikä sitä pidä joutua purkamaan tätä varten.
    paivita: function (tila) {
      var runko = tila;
      if (typeof runko === 'string') {
        try { runko = JSON.parse(runko); } catch (virhe) { runko = null; }
      }
      if (!runko || typeof runko !== 'object') {
        return Promise.reject(new Error('widget.paivita vaatii olion tai JSON-merkkijonon'));
      }
      return kutsu('widget.paivita', {
        tila: {
          kaupunki: teksti(runko.kaupunki),
          maa: teksti(runko.maa),
          paiva: typeof runko.paiva === 'number' ? runko.paiva : parseInt(runko.paiva, 10) || 0,
          raha: teksti(runko.raha)
        }
      });
    },
    tyhjenna: function () { return kutsu('widget.tyhjenna'); },
    lue: function () { return kutsu('widget.lue'); }
  };

  var ilmoitukset = {
    pyydaLupa: function () { return kutsu('ilmoitukset.pyydaLupa'); },
    tila: function () { return kutsu('ilmoitukset.tila'); }
  };

  // Puuttuva ominaisuus on aina epätosi: vanha kuori ei tunne uusia avaimia,
  // eikä peli saa olettaa niitä olemassa oleviksi.
  var ominaisuudet = tiedot.ominaisuudet || {};
  var oletukset = ['luenta', 'sanelu', 'luennanKorostus', 'aktivoitumisviesti',
                   'talle', 'talleSynkka', 'haptiikka', 'jako', 'pelikeskus',
                   'widget', 'ilmoitukset', 'aikeet'];
  for (var j = 0; j < oletukset.length; j += 1) {
    if (typeof ominaisuudet[oletukset[j]] !== 'boolean') {
      ominaisuudet[oletukset[j]] = false;
    }
  }

  window.matkakirjaNatiivi = {
    onkoNatiivi: true,
    alusta: tiedot.alusta || 'ios',
    versio: tiedot.versio || '0',
    kuorenVersio: tiedot.kuorenVersio || '',
    jarjestelma: tiedot.jarjestelma || '',
    ominaisuudet: ominaisuudet,

    tiedot: function () { return kutsu('tiedot'); },

    luenta: luenta,
    sanelu: sanelu,
    talle: talle,
    haptiikka: haptiikka,
    jaa: jaa,
    pelikeskus: pelikeskus,
    widget: widget,
    ilmoitukset: ilmoitukset,

    // Oikopolut yleisimpiin: matkakirjaNatiivi.puhu('teksti')
    puhu: luenta.puhu,
    pysayta: luenta.pysayta,
    tarise: haptiikka.nayta,

    kuuntele: kuuntele,
    alaKuuntele: alaKuuntele,

    // Kuori kutsuu tätä. Peli ei kutsu.
    _tapahtuma: tapahtuma
  };
}());
