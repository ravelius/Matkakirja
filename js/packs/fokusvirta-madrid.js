/*
 * MADRIDIN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-sofia.js:lle: samat kentät, sama
 * järjestys, sama moottori (js/fokusvirta.js). Uusi kaupunki on yksi
 * tiedosto ja yksi rivi rekisterissä (js/packs/fokusvirrat.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 28.8.2026): matkakirjan teksti ja
 * aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamansa — niitä
 * ei ole lyhennetty eikä sanajärjestystä muutettu. Luenta on sama
 * teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Vigon lahden hopealasti (aarremerkintä).
 *
 * FAKTAPOHJA täyille ja oppitunnille: docs/mantereet-tyoaineisto/
 * takyt-madrid.md, jonka jokainen väite on tarkistettu Wikipedian
 * rajapinnasta artikkeli ja osio kerrallaan (täyt 1, 5, 6, 11 ja 17).
 * Syvennysteksteissä ei ole yhtään faktaa tuon raportin ulkopuolelta.
 * Oppitunti käyttää lisäksi pelin omaa, jo hyväksyttyä Madrid-aineistoa
 * (js/packs/nahtavyysjutut.js "Puerta del Sol", js/packs/
 * maa-kategoriat.js ESP-nosto rypäleistä) — se on tarkoitus, koska
 * oppitunnin tehtävä on pohjustaa laattakysymys lehden omalla
 * aineistolla.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026), JOTKA EROTTAVAT TÄMÄN
 *    TIEDOSTON SOFIAN MALLISTA ──────────────────────────────────────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois
 *      kokonaan: kuvat kuuluvat kaupunkilehteen. Kortti piirtyy ilman
 *      kuvaa (js/ui.js naytaFactValokuva saa nullin).
 *   2. PÖLLÖN KUVA ON KAUPUNKILEHDEN HEROKUVA. Kenttä `pollo.kuva`
 *      osoittaa KULTTUURI_KATEGORIAT-karusellin omaan generoituun
 *      heroon (js/packs/kulttuuri-kategoriat.js, madrid/avauskuvat) eikä
 *      uuteen Commons-kuvaan — sama kuva, jonka pelaaja näkee lehden
 *      kannessa, ja pöllön huomio viittaa siihen.
 *   3. VALINTA-ASKELTA EI OLE. `valinta`-kenttää ei kirjoiteta:
 *      pöllö ei kysy painikkeilla, mistä pelaaja haluaa kuulla.
 *      Moottori lukee kentän kaikkialla varovasti (`data.valinta?.…`),
 *      joten portin mitta on oletus (yksi täky) ja kuplan otsikko
 *      moottorin oma. Kartan täkypisteet hoitavat houkuttelun.
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Sama kuin Ateenassa ja Sofiassa: vastaus löytyy syvennystekstistä,
 * mutta kysymyksen sanamuoto ei toistu siinä sellaisenaan.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta
 * 28.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus,
 * Restrictions-kenttä) — ei arvattuja nimiä. Kaikki ovat PD, CC0 tai
 * CC BY, ja tekijä on `lahde`-rivillä, koska CC BY vaatii maininnan.
 * Ihmisiä sisältävät kuvat on katsottu silmin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * Kysymykset ovat vakioina samasta syystä kuin Sofiassa: lista
 * tiedoston lopussa lukee ne muuttujista, jolloin uusi käyttö ei
 * koskaan johda kahteen erilleen ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Cibeles-kysymys on Madridin lehden sivun 2
 * ("Urheilu") oman noston "Suihkulähde, joka vaihtoi joukkuetta"
 * tekstiä, chotis-kysymys sivun 1 ("Madrid") oman noston "Chotis
 * tanssitaan yhden laatan päällä" tekstiä (js/packs/
 * kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI KELLOKYSYMYSTÄ: Madridin laattakysymys (kohtaaminen,
 * ks. alempana) kysyy, mitä Puerta del Solin kiveyksen laatasta
 * mitataan. Jos lehden aarteen avaava tehtävä kysyisi samasta
 * aukiosta, aarrekysymys olisi ratkaistu ennen kuin Pilaria on
 * tavattu.
 */
const CIBELES_VISA = {
  kysymys: 'Madridin kaksi suurta jalkapalloseuraa juhlivat voittonsa '
    + 'eri suihkulähteillä saman puistokadun päissä. Kummalle '
    + 'lähteelle Atlético siirtyi vuonna 1991?',
  vaihtoehdot: [
    'Neptunuksen suihkulähteelle',
    'Kybelen eli Cibeleen suihkulähteelle',
    'Apollon suihkulähteelle',
  ],
  oikea: 0,
  fakta: 'Cibeleen lähteelle kiipesivät ensimmäisinä atléticolaiset jo '
    + 'vuonna 1962, koska seuran toimisto oli naapurikadulla. '
    + '1980-luvun lopulla aukio oli jo niin vahvasti Real Madridin '
    + 'paikka, että he luovuttivat sen ja siirtyivät Neptunukselle.',
};

const CHOTIS_VISA = {
  kysymys: 'Madridilaisessa chotis-tanssissa miehen liikkumavara on '
    + 'tarkkaan rajattu. Kuinka suuri se on?',
  vaihtoehdot: [
    'Yksi katukiveyksen laatta',
    'Yksi askel joka suuntaan',
    'Puolet tanssilattiasta',
  ],
  oikea: 0,
  fakta: 'Tanssi tuli Madridiin 1850 Keski-Euroopasta ja muuttui '
    + 'perillä omanlaisekseen: mies pyörii paikallaan laatallaan ja '
    + 'nainen kiertää hänen ympärillään. Säestää organillo, kadulla '
    + 'työnnettävä kampiurut.',
};

export const FOKUSVIRTA_MADRID = {
  kaupunki: 'madrid',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * Paikkarivi on kirjoittajan oma; kuukausi seuraa kaanonin
     * faktoja: tasavalta julistettiin 11.2.1873 (docs/
     * mantereet-tyoaineisto/takyt-madrid.md, 1873-ankkuri), joten
     * "tasavalta on nuori" osuu kevääseen. Sääkommentti on isoisän
     * havainto, ei mitattu väite.
     */
    paikkarivi: 'Madrid, maaliskuussa 1873. Kirkasta; ylätasangon tuuli '
      + 'kylmä.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Madrid kiehuu: tasavalta on nuori ja kahvilat täynnä '
      + 'huutoa. Minä kuuntelin ja kirjoitin. Prado oli tyhjä kuin '
      + 'kirkko arkiaamuna — seisoin Velázquezin edessä yksin, ja se '
      + 'oli matkani hiljaisin tunti.',
    /*
     * Luenta on sama teksti tunnetagein — sanat eivät muutu. Äänitettä
     * EI ole vielä generoitu (assets/audio/puhe-fokus-matkakirja-
     * madrid.mp3 puuttuu), joten `aanite`-kenttä on jätetty pois:
     * js/ui.js piilottaa kaiuttimen, kun äänitettä ei ole.
     */
    luenta: '[curious] Madrid kiehuu: tasavalta on nuori ja kahvilat '
      + 'täynnä huutoa. Minä kuuntelin ja kirjoitin. [softly] Prado oli '
      + 'tyhjä kuin kirkko arkiaamuna — [whispers] seisoin Velázquezin '
      + 'edessä yksin, ja se oli matkani hiljaisin tunti.',
  },

  /* ---------- 2. Pöllön nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS — VÄLITTÄJÄOTE (Raamattu, "LIVIA AIKASIIRTYMÄN
     * VÄLITTÄJÄNÄ"). Yksi kupla per saapuminen, isoisän merkinnän
     * perään.
     *
     * PUHEKIELIPASSI (Raamattu, "LIVIAN PUHEKIELI", sääntö 1
     * PAINOPISTE REUNOILLA): lyhentymät ovat vain alussa ("Kääk") ja
     * lopussa ("Mut"), keskellä sanat ovat auki — yhdessätoista,
     * neljä, muutaman.
     *
     * FAKTAKURI: kaksi väitettä, molemmat tarkistettavia.
     * (1) Tasavalta julistettiin 11.2.1873, joten maaliskuussa se oli
     * muutaman viikon vanha. (2) Valtionpäämiehiä vaihtui neljä
     * yhdentoista kuukauden sisään (takyt-madrid.md, täky 5; kukaan
     * heistä ei ollut virallisesti presidentti, joten sanaa ei käytetä).
     */
    maadoitus: 'Kääk. Isoisäsi kuunteli huutoa ja käveli sitten '
      + 'museoon, se on hänen tapansa. Sitten minä katson vuosilukua: '
      + 'tuo tasavalta oli maaliskuussa muutaman viikon vanha, ja sen '
      + 'johdossa ehti vaihtua yhdentoista kuukauden sisään neljä '
      + 'miestä. Ei ihme että kahviloissa huudettiin. Mut kyllä minä '
      + 'ymmärrän sitä, joka etsii yhden hiljaisen tunnin.',
    /*
     * Huomio viittaa herokuvan kohteeseen (Kuninkaanlinna). Faktat:
     * linnan valmistumisvuosi, maurilinnan palo ja yli 3 400 huonetta
     * ovat lehden oman avauskuvan selitteestä (js/packs/
     * kulttuuri-kategoriat.js), kuninkaan lähtö takyt-madrid.md:n
     * 1873-ankkurista: Amadeo I allekirjoitti 9.2., luopui 10.2. ja
     * ilmoitti Cortesille 11.2.1873.
     */
    teksti: 'Tuo palatsi tuolla oli isoisäsi vuonna ilman kuningasta: '
      + 'Amadeo luopui kruunusta helmikuussa, ja seuraavana päivänä '
      + 'julistettiin tasavalta. Talo itse valmistui 1755 palaneen '
      + 'maurilinnan paikalle, ja huoneita siinä on yli kolmetuhatta '
      + 'neljäsataa. Katso ensin tonne ylös.',
    kuva: {
      ampari: 'herokoe/hero-madrid-aamu.png',
      selite: 'Madridin kuninkaanlinna valmistui 1755 tulipalossa '
        + 'tuhoutuneen maurilinnan paikalle, ja yli 3 400 huoneellaan '
        + 'se on Länsi-Euroopan suurin kuninkaanlinna.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       * Faktat: takyt-madrid.md, täky 1 (VARMA, es-Wikipedia "Casa de
       * Fieras del Retiro"). Aineiston varaus noudatettu: EI väitetä,
       * että isoisä olisi nähnyt norsun — puistossa asui norsuja, siinä
       * kaikki. Karkumatkalle lähtenyt Pizarro on 1890-luvulta, eikä
       * sitä sekoiteta tähän.
       */
      id: 'casadefieras',
      nappi: 'Puisto, jossa asui pantteri ja kaksi hyeenaa',
      otsikko: 'Retiron villieläintarha',
      teksti: 'Retiron puistossa oli kuninkaallinen eläintarha, Casa de '
        + 'Fieras. Kaarle III käski rakentaa sen 1774, ja Wienin '
        + 'jälkeen se oli Euroopan toiseksi vanhin. Filippiinien '
        + 'varakuningas lähetti kuninkaan suosiota tavoitellakseen '
        + 'norsun, joka käveli Cádizista Madridiin — sinne se oli '
        + 'purettu laivasta. Häkkirykelmää sanottiin nimellä La '
        + 'Leonera: alakerrassa tiikereitä, pantteri, kaksi hyeenaa ja '
        + 'sakaali, yläkerrassa huoneet kuninkaalliselle perheelle. '
        + 'Muualla oli apinakioski, norsutarha, karhukuoppa ja häkkejä, '
        + 'joissa asui riikinkukkoja, laamoja ja gaselleja. Vuoden 1868 '
        + 'vallankumouksen jälkeen puisto avattiin yleisölle ja '
        + 'kaupunki otti tarhan hoitoonsa, joten isoisäsi pääsi sisään '
        + 'maksamatta hoville mitään. Eläimet muuttivat 1972 Casa de '
        + 'Campoon, ja vanhoihin eläinsuojiin avattiin 2013 '
        + 'kaupunginkirjasto — sen seinissä ovat yhä ne kalterit, '
        + 'joiden läpi pedoille heitettiin ruokaa yläkerrasta.',
      /*
       * Commons 28.8.2026: 4001×2952, public domain, Josep Lluis
       * Pellicer / Bernardo Rico, julkaistu 22.12.1879 lehdessä La
       * Ilustración Española y Americana. Restrictions tyhjä.
       * Aikalaiskuva kuudelta vuodelta isoisän matkan jälkeen.
       */
      kuva: {
        tiedosto: '1879-12-22, La Ilustración Española y Americana, Madrid.—El cercado de los llamas, en la Casa de Fieras del parque de Madrid.jpg',
        selite: 'Laamatarha Retiron eläintarhassa. Kuvalaitos on '
          + 'vuodelta 1879, kuusi vuotta isoisän käynnin jälkeen.',
        lahde: 'Josep Lluis Pellicer ja Bernardo Rico 1879, Wikimedia '
          + 'Commons (public domain)',
      },
      visa: {
        kysymys: 'Mikä toimii nykyään Retiron vanhoissa eläinsuojissa?',
        vaihtoehdot: [
          'Kaupunginkirjasto',
          'Kasvihuone',
          'Ravintola',
        ],
        oikea: 0,
        fakta: 'Eläimet muuttivat Casa de Campoon vuonna 1972. '
          + 'Kirjaston sisällä on säilytetty alkuperäisiä rakenteita, '
          + 'muun muassa ruokintakalterit.',
      },
    },
    {
      /*
       * Faktat: takyt-madrid.md, täky 17 (VARMA patsaasta, corvetasta,
       * Velázquezista, Taccasta ja hylätystä päästä). Aineiston ohje
       * noudatettu sanatarkasti: lähde sanoo Galileon neuvosta "Según
       * la tradición", joten teksti sanoo "perimätiedon mukaan" eikä
       * väitä, että Galileo laski patsaan.
       *
       * MIKSI JUURI TÄMÄ TÄKY: isoisän merkintä päättyy Velázquezin
       * eteen, ja tämä on se toinen paikka, jossa Velázquez on
       * Madridissa yhä nähtävissä — pronssina.
       */
      id: 'felipe',
      nappi: 'Hevonen, joka seisoo kahdella jalalla',
      otsikko: 'Filip IV:n ratsastajapatsas',
      teksti: 'Sinä seisoit Prado-museossa Velázquezin edessä — mutta '
        + 'hänen työtään on Madridissa myös pronssina. Plaza de '
        + 'Orienten keskellä kohoaa Filip IV:n ratsastajapatsas, ja '
        + 'kuningas halusi siihen asennon, jollaista ei ollut '
        + 'veistoksessa ennen tehty: hevonen nousee corvetaan, etujalat '
        + 'ilmassa, koko paino takajaloilla ja hienovaraisesti '
        + 'hännällä. Työ tilattiin firenzeläiseltä Pietro Taccalta, ja '
        + 'malliksi lähetettiin Madridista kaksi Velázquezin maalaamaa '
        + 'luonnosta sekä Juan Martínez Montañésin veistämä kuninkaan '
        + 'pää. Tacca teki patsasta kuusi vuotta, 1634–1640. '
        + 'Perimätiedon mukaan hän kysyi tasapaino-ongelmaan neuvoa '
        + 'Galileo Galileilta, joka ehdotti umpinaista takaosaa ja '
        + 'onttoa etuosaa. Ensimmäistä savimallia kuningas ei '
        + 'hyväksynyt: hän ei tunnistanut omia kasvojaan, ja pää '
        + 'jouduttiin teettämään uudelleen — sen teki Taccan poika.',
      /*
       * Commons 28.8.2026: 1536×2048, CC0, Zarateman, kuvattu
       * 16.11.2018. Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa
       * on vain patsas ja palatsin julkisivu, ei ohikulkijoita.
       * (Aineiston ensimmäinen ehdotus, Jose Luis Filpo Cabanan
       * kokokuva aukiosta, hylättiin juuri tästä syystä: siinä istuu
       * portailla ihminen.)
       */
      kuva: {
        tiedosto: 'Madrid - Plaza de Oriente en 2018, Monumento a Felipe IV (1).jpg',
        selite: 'Filip IV:n ratsastajapatsas Plaza de Orientella. '
          + 'Hevonen seisoo takajaloillaan corveta-asennossa.',
        lahde: 'Zarateman, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Kenen maalaamien luonnosten mukaan patsas tehtiin '
          + 'Firenzessä?',
        vaihtoehdot: [
          'Velázquezin',
          'Goyan',
          'Murillon',
        ],
        oikea: 0,
        fakta: 'Ratkaisusta tuli veistostaiteen uusi malli 1600- ja '
          + '1700-luvuiksi: sitä ennen hevosen koko painoa ei ollut '
          + 'laskettu kahden jalan varaan.',
      },
    },
    {
      /*
       * Faktat: takyt-madrid.md, täyt 5 ja 6 (molemmat VARMOJA, en-
       * Wikipedia "First Spanish Republic" ja "Nicolás Salmerón").
       * Aineiston sanamuotovaraus noudatettu: kukaan neljästä ei ollut
       * virallisesti "tasavallan presidentti", joten teksti sanoo
       * valtionpäämies ja hallituksen johtaja.
       *
       * IKÄSOPIVUUS (13+): kuolemantuomiot mainitaan, koska ne ovat
       * eronpyynnön syy, mutta mitään ei kuvata.
       */
      id: 'tasavalta',
      nappi: 'Neljä johtajaa yhdessätoista kuukaudessa',
      otsikko: 'Tasavallan vuosi',
      teksti: 'Se huuto, jonka kuulit kahviloissa, oli aiheellista. '
        + 'Tasavallan johdossa vaihtui isoisäsi matkavuonna neljä '
        + 'miestä. Estanislao Figueras kesti helmikuusta kesäkuuhun. '
        + 'Francisco Pi y Margall aloitti 11. kesäkuuta ja kesti 37 '
        + 'päivää: hän kieltäytyi tukahduttamasta etelän kapinoita '
        + 'aseilla, koska kapinalliset noudattivat hänen omaa oppiaan. '
        + 'Nicolás Salmerón aloitti 18. heinäkuuta, ja kun kenraalit '
        + 'vaativat häntä vahvistamaan karkureiden kuolemantuomiot, hän '
        + 'erosi 6. syyskuuta — hän oli oikeusministerinä itse '
        + 'poistanut kuolemanrangaistuksen, ja hänen mausoleuminsa '
        + 'seinään on kirjoitettu, että hän luopui vallasta, jottei '
        + 'allekirjoittaisi kuolemantuomiota. Emilio Castelar aloitti '
        + '7. syyskuuta ja vahvisti ne samat tuomiot. Tasavalta päättyi '
        + 'Madridissa aamuyöllä 3. tammikuuta 1874, kun kenraali '
        + 'Manuel Pavía vaati edustajia tyhjentämään talon viidessä '
        + 'minuutissa. Osa heistä hyppäsi ikkunoista, ja Pavía kysyi '
        + 'hämmästyneenä, miksi ikkunasta, kun ovesta pääsee ulos.',
      /*
       * Commons 28.8.2026: 959×1298, public domain, litografia Juan
       * Vazquez, julkaistu La Flaca -lehdessä 6.3.1873. Restrictions
       * tyhjä. Aikalaisallegoria tasavallasta, siis samasta keväästä
       * kuin isoisän merkintä.
       */
      kuva: {
        tiedosto: 'Alegoría de la Primera República Española, por Tomás Padró.jpg',
        selite: 'Aikalaisallegoria Espanjan ensimmäisen tasavallan '
          + 'julistamisesta, painettu La Flaca -lehdessä maaliskuussa '
          + '1873.',
        lahde: 'Tomás Padró ja litografi Juan Vazquez 1873, Wikimedia '
          + 'Commons (public domain)',
      },
      visa: {
        kysymys: 'Miksi Nicolás Salmerón jätti tehtävänsä syyskuussa '
          + '1873?',
        vaihtoehdot: [
          'Hän ei suostunut vahvistamaan kuolemantuomioita',
          'Hän hävisi äänestyksen Cortesissa',
          'Hän sairastui kesken toimikauden',
        ],
        oikea: 0,
        fakta: 'Seuraaja Emilio Castelar vahvisti samat tuomiot. '
          + 'Salmerón oli tasavallan neljästä johtajasta se, joka eli '
          + 'pisimpään — hän kuoli vuonna 1908.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa laattakysymyksen, joka esitetään kohtaamisessa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, madrid: *"Saman aukion
   * kiveyksessä, jolla kello lyö, on laatta, josta jotakin mitataan.
   * Mitä?"* → Espanjan maanteiden kilometrit).
   *
   * Visasääntö täyttyy: vastaus löytyy tekstistä, mutta kysymyksen
   * sanamuoto ei toistu siinä sellaisenaan — teksti ei puhu
   * "mittaamisesta" vaan siitä, mistä tiet alkavat.
   *
   * FAKTAT: kellon lahjoittaja on takyt-madrid.md:n täky 11 (VARMA
   * lahjoituksesta, maanpaosta, siivoojan työstä ja kuolinvuodesta;
   * aineiston varaus noudatettu — lapsuudenpako ja kellon syntyidea
   * ovat lähteessä huhuja, eikä niitä kerrota). Kilometri nolla,
   * kuusi valtatietä ja kahdentoista lyönnin rypäleet ovat pelin
   * omasta, jo hyväksytystä aineistosta (js/packs/nahtavyysjutut.js
   * "Puerta del Sol", js/packs/maa-kategoriat.js ESP).
   */
  oppitunti: {
    otsikko: 'Puerta del Sol — piste, josta tiet alkavat',
    teksti: 'Aukio sai nimensä 1400-luvun kaupunginmuurin portista, '
      + 'jonka koristeena oli itään käännetty nouseva aurinko. Portti '
      + 'on aikaa sitten poissa, mutta aukion kiveyksessä on '
      + 'messinkilaatta, ja siitä pisteestä on vuodesta 1857 lähtien '
      + 'laskettu Espanjan päätiet: kuusi valtatietä lähtee siitä eri '
      + 'suuntiin kuin kellotaulun viisarit. Torninkellon, jota koko '
      + 'maa katsoo uudenvuodenyönä, lahjoitti kaupungille vuonna 1866 '
      + 'José Rodríguez Losada. Hän oli paennut Espanjasta liberaalina, '
      + 'ja Lontoossa maanpakolaisten avustuskomitea hankki hänelle '
      + 'työn kellosepänliikkeen siivoojana. Roskiin heitetyistä '
      + 'koneistoista hän alkoi koota toimivia kelloja; kun mestari '
      + 'sairastui, hän hoiti liikkeen, ja mestarin kuoltua hän peri '
      + 'sen — viisi vuotta sen jälkeen kun oli lähtenyt maasta. '
      + 'Espanjan laivaston kronometrimestariksi asti hän ehti, mutta '
      + 'takaisin hän ei muuttanut: hän kuoli Lontoossa 1870, kolme '
      + 'vuotta ennen isoisäsi käyntiä. Kellon lyönneillä syödään '
      + 'nykyään kaksitoista rypälettä, yksi kutakin lyöntiä kohti.',
    /*
     * Kuva on pelin omasta kuvastosta (js/packs/europe-valokuvat.js,
     * madrid) eikä uusi tuonti: Commons 28.8.2026 2592×3888,
     * CC BY-SA 3.0, Tamorlan, Restrictions tyhjä.
     */
    kuva: {
      tiedosto: 'Puerta del Sol - Reloj.jpg',
      selite: 'Real Casa de Correosin kellotorni Puerta del Solilla. '
        + 'Kellon lahjoitti kaupungille maanpaosta palannut kelloseppä '
        + 'vuonna 1866.',
      lahde: 'Tamorlan, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   * Kaupungin hahmo, kohtaamiskuva ja laattakysymys ovat jo pelissä
   * tarinakaaren paketissa (js/tyohuone-kehitys-data.js KAARI_PAKETIT,
   * id 'madrid'): kellomestari Pilar hoitaa Puerta del Solin kelloa, ja
   * game.actionQuiz esittää hänen kysymyksensä laatalla (js/game.js
   * kaariTarina). Tämä kortti EI kosketa kysymystä eikä kertaa Pilarin
   * omaa repliikkiä — sama suhde kuin Ateenan Nikoksella ja Sofian
   * Nadialla.
   *
   * MADRIDIN VANHA KOHTAAMINEN JÄÄ ENNALLEEN. js/packs/kohtaamiset.js
   * antaa Madridille kirpputorikauppias Rosan, ja se rivi on pelin
   * vanhan polun kohtaaminen (js/visa.js: KOHTAAMISET näytetään, kun
   * kysymys ei ole kaarikysymys). Hahmoa ei ole poistettu eikä
   * muutettu: fokusmoodin kohtaaminen on kaaren oma hahmo, koska juuri
   * hän esittää aarrekysymyksen, ja kaksi hahmoa samaan kysymykseen
   * olisi kaksi lupausta samasta ovesta.
   */
  kohtaaminen: {
    hahmo: 'Kellomestari Pilar',
    nappi: 'Tapaa kellomestari',
    teksti: 'Pilar nousee tornin portaat kahdesti päivässä ja tuntee '
      + 'koneiston äänestä, mikä siinä on vialla ennen kuin mikään '
      + 'vielä näkyy. Hän on tottunut siihen, että aukiolla katsotaan '
      + 'hänen kelloaan mutta ei häntä. Matkustajaa hän ei kiirehdi: '
      + 'ennen kuin hän avaa huoltoluukun, hän haluaa tietää, onko '
      + 'vieras huomannut, mitä muuta tälle aukiolle on merkitty kuin '
      + 'aika.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin Ateenalla ja Sofialla.
   */

  /*
   * KOHTAAMISPAIKKA: PUERTA DEL SOLIN KELLOTORNI eli Real Casa de
   * Correos.
   *
   * 40,41640556 N / −3,7038 E — es-Wikipedia "Real Casa de Correos",
   * prop=coordinates (haettu 28.8.2026). Muunnos on sama kaava ja
   * samat vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/
   * piirto.js laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2
   * ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((−3,7038 − (−175)) mod 360) × (12000/360)
   *                     = 171,2962 × 33,3333… = 5709,9
   *                   y = (millerY(40,41640556) − millerY(76)) × 12000/2π
   *                     = 1786,5
   *   europe          x = (−3,7038 + 11) × 19,2 = 140,1
   *                   y = (72 − 40,41640556) × 26,3 = 830,6
   *
   * TARKISTUS MADRIDIN LAATTAA VASTEN: laatta on Euroopan laudalla
   * 140 / 831, eli piste on sen vieressä kymmenyksen päässä. Niin
   * pitääkin: Puerta del Sol on kaupungin keskipiste, ja laudan yksikkö
   * on maailmankartalla noin kolme kilometriä.
   */
  kohtaamispiste: {
    nimi: 'Puerta del Solin kellotorni',
    laudat: {
      maailmankartta: { x: 5709.9, y: 1786.5 },
      europe: { x: 140.1, y: 830.6 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Madridin sivupino (js/lehti.js
   * rakennaSivut): 0 = etusivu, 1 = kaupunkisivu "Madrid", 2 =
   * Urheilu, 3 = Kadut ja talot, 4 = Menovinkit.
   *
   * MIKSI 2 JA 4 EIKÄ 2 JA 3 (Sofian sivut). Sofian lehdessä
   * Menovinkit on sivu 3, ja nimetyt tehtävät menivät sen ja
   * aihesivun päälle. Madridin lehti on yhtä sivua pidempi, ja jos
   * juliste menisi sivulle 3, se syrjäyttäisi sivun oman tehtävän ja
   * Menovinkit jäisi kokonaan ilman kysymystä — Raamattu vaatii
   * kysymyksen jokaiselle sivulle paitsi etusivulle. Nyt jokaisella
   * sivulla on tasan yksi: 1 kulttuurivisa, 2 AARTEEN AVAUS, 3 sivun
   * oma tehtävä (Bernabéun nurmi), 4 JULISTE.
   *
   * KOLMAS AARTEEN AVAAJA EI OLE TÄSSÄ LISTASSA: sivun 1 kysymys on
   * Madridin kulttuurivisa (js/packs/europe-kulttuuri.js), jonka
   * js/fokustehtavat.js pukee samaksi AARTEEN AVAUS -laatikoksi ilman
   * omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: CIBELES_VISA },
    { id: 'juliste', sivu: 4, otsake: 'JULISTE', palkinto: 'juliste', visa: CHOTIS_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Espanja) ----------
   *
   * SIIRRETTY TÄNNE v1297:n MAAPOOLISTA (js/fokusnosto.js NOSTO_MAAT,
   * avain ESP) sanasta sanaan: otsikot, lunastukset, lähteet, kuvat,
   * kysymykset ja koordinaatit ovat bitilleen samat, vain sijainti
   * vaihtui. Pooli suosii kaupungin omaa kenttää (nostoMaanPooli), ja
   * kahta kopiota ei ole: js/fokusnosto.js lukee ESP-poolin TÄSTÄ
   * kentästä, jotta Espanjan muut kaupungit (Barcelona, Sevilla,
   * Granada) näkevät täsmälleen samat kolme täkyä kuin ennenkin.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI. Livia huomauttaa tuikkivista
   * pisteistä kerran (js/fokusnosto.js, LIVIAN HUOMAUTUS), ja huomio
   * osuu poolin ensimmäiseen katsomattomaan — siis tähän ensimmäiseen
   * riviin. Järjestys on siksi säilytetty muuttumattomana.
   *
   * Rivien omat perustelut, aineistoviitteet ja rajaukset ovat
   * kommentteina kunkin noston kohdalla, kuten maapoolissakin.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       *
       * takynostot-espanja.md, ehdokas 1 (VARMA). Aineiston kaksi
       * kieltoa noudatettu: Marían huudahdusta ei ole (sitä EI ole
       * lähteessä), eikä kahta eri lukua sekoiteta — julkaisusta
       * peruutukseen on 22 vuotta, kuolemasta peruutukseen 14, ja
       * teksti sanoo vain jälkimmäisen.
       */
      id: 'altamira',
      nimio: 'Altamiran katto',
      otsikko: 'Löytäjää naurettiin väärentäjäksi — anteeksipyyntö tuli, '
        + 'kun hän oli ollut kuolleena neljätoista vuotta',
      lunastus: [
        'Luolan löysi 1868 tiilentekijä Modesto Cubillas, mutta kukaan ei '
          + 'katsonut kattoon. Vuonna 1879 harrastelija-arkeologi Marcelino '
          + 'Sanz de Sautuola meni luolaan kahdeksanvuotiaan tyttärensä '
          + 'Marían kanssa, ja tyttö vei isänsä katsomaan seinien merkkejä. '
          + 'Isä tajusi, että ne olivat piirroksia: katossa oli lauma '
          + 'sukupuuttoon kuolleita arobiisoneja, kaksi hevosta, iso '
          + 'naaraspeura ja mahdollisesti villisika.',
        'Sautuola julkaisi löytönsä 1880 professori Juan Vilanova y Pieran '
          + 'tuella. Ranskalaiset asiantuntijat Gabriel de Mortillet ja '
          + 'Émile Cartailhac kiistivät sen jyrkästi: heidän mielestään '
          + 'esihistorialliset ihmiset eivät kyenneet abstraktiin '
          + 'ajatteluun, ja Lissabonin esihistorian kongressissa löytöä '
          + 'naurettiin ääneen. Sautuolaa syytettiin väärennöksestä, koska '
          + 'hän ei osannut selittää, miksi katossa ei ollut nokea. Vasta '
          + '1902, kun vastaavia luolamaalauksia oli löytynyt lisää, '
          + 'Cartailhac perui julkisesti artikkelissa "Mea culpa d\'un '
          + 'sceptique". Sautuola oli silloin ollut kuolleena neljätoista '
          + 'vuotta.',
      ],
      lahde: 'en-Wikipedia "Cave of Altamira", johdanto ja osio "Discovery, '
        + 'excavation, scepticism" (tarkistettu 25.8.2026 työaineistoon '
        + 'docs/mantereet-tyoaineisto/takynostot-espanja.md, ehdokas 1).',
      /*
       * Aineiston oma valinta: sama piirros, jonka takia löytäjää
       * syytettiin väärentäjäksi. Commons 25.8.2026: 1350×682, public
       * domain, Restrictions tyhjä.
       */
      valokuva: {
        tiedosto: 'Altamira-1880.jpg',
        selite: 'Kattomaalausten piirros vuoden 1880 julkaisusta — juuri se '
          + 'kuva, jonka takia löytäjää syytettiin väärentäjäksi.',
        lahde: 'Vuoden 1880 julkaisu, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi tutkijat eivät uskoneet Altamiran maalauksia aidoiksi?',
        'Mitä eläimiä Altamiran kattoon on maalattu?',
        'Miten luolamaalausten ikä nykyään selvitetään?',
      ],
      // 43,3825 N / −4,12027778 E — en-Wikipedia "Cave of Altamira"
      // (fokuskohteet-espanja.md, kohde 10).
      paikka: {
        nimi: 'Altamira',
        laudat: {
          maailmankartta: { x: 5696, y: 1667.9 },
          europe: { x: 132.1, y: 752.6 },
        },
      },
    },
    {
      /*
       * ELÄINNOSTO. takynostot-espanja.md, ehdokas 6 (VARMA).
       * Aineiston ehto noudatettu: laskentavuosi on tekstissä näkyvissä,
       * koska luku vanhenee.
       *
       * PAIKKAA EI OLE, JA SE ON TIETOINEN VALINTA. Aineisto puhuu
       * "Madridin puistoista" eikä nimeä yhtä pesäpaikkaa, eikä
       * arvattua koordinaattia kirjoiteta datalle. Ilman
       * `paikka`-kenttää piste ottaa paikakseen kaupungin ja siirtyy
       * laatan vasemmalle puolelle (nostonPaikka, js/fokusnosto-
       * symbolit.js) — juuri se varapolku, jota varten kenttä on
       * valinnainen.
       */
      id: 'munkkiaratit',
      nimio: 'Madridin papukaijat',
      otsikko: 'Madridin puistoissa asuu tuhansia villejä papukaijoja — ja '
        + 'niiden pesät kasvavat pikkuauton kokoisiksi',
      lunastus: [
        'Laji on munkkiaratti, kotoisin Etelä-Amerikasta. Espanjassa elää '
          + 'yli 80 prosenttia koko Euroopan villistä kannasta, ja '
          + 'Madridissa niitä laskettiin kesäkuussa 2015 kymmenentuhatta '
          + 'kahdeksansataa — enemmän kuin missään muualla Euroopassa. '
          + 'Barcelonassa oli samaan aikaan noin 5 000, Sevillassa 6 300 '
          + 'vuonna 2021.',
        'Munkkiaratti on ainoa papukaija, joka rakentaa oksista oikean '
          + 'pesän eikä tyydy puunkoloon. Yhdyskunta kutoo yhteen '
          + 'jättipesän, jossa jokaisella parilla on oma sisäänkäynti ja '
          + 'oma huoneisto. Pesä voi kasvaa pienen auton kokoiseksi, ja '
          + 'siihen muuttaa alivuokralaisia: kyyhkyjä, varpusia, jopa '
          + 'oravia. Espanja kielsi lajin pidon ja kaupan vuonna 2013.',
      ],
      lahde: 'en-Wikipedia "Monk parakeet", osiot pesinnästä ja '
        + 'vieraslajistatuksesta (tarkistettu 25.8.2026 työaineistoon '
        + 'docs/mantereet-tyoaineisto/takynostot-espanja.md, ehdokas 6).',
      /* Commons 25.8.2026: 6024×4016, CC BY-SA 4.0, Restrictions tyhjä. */
      valokuva: {
        tiedosto: 'Cotorra Argentina - Parque del Oeste - Madrid 03.jpg',
        selite: 'Munkkiaratti Madridin Parque del Oestessa.',
        lahde: 'Javier Perez Montes, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miten eteläamerikkalaiset papukaijat päätyivät Madridiin?',
        'Millainen on munkkiaratin yhteispesä?',
        'Mitä haittaa vieraslajista on kaupungille?',
      ],
    },
    {
      /*
       * takynostot-espanja.md, ehdokas 4 (VARMA yksityiskohdista).
       * Aineiston kaksi ohjetta noudatettu: otsikko nojaa
       * merirosvojulistukseen, joka on molemmissa lähdeartikkeleissa,
       * eikä lippukiistaan, josta artikkelit kertovat eri tarinan;
       * piirityksen uhreja ei kuvata (13+ -rajaus).
       */
      id: 'cartagenan-kantoni',
      nimio: 'Cartagenan kantoni',
      otsikko: 'Kaupunki julistautui omaksi valtioksi — ja oma hallitus '
        + 'julisti sen laivaston merirosvoiksi',
      lunastus: [
        'Kun Espanjan tasavalta ei saanut ohjia käsiinsä, Cartagena — maan '
          + 'Välimeren päälaivastotukikohta — nousi aseelliseen kapinaan '
          + '12. heinäkuuta 1873 ja julistautui itsenäiseksi kantoniksi. '
          + 'Kapinalliset saivat puolelleen sataman sota-alukset, jotka '
          + 'olivat Espanjan parhaita. Kantonin laivasto lähti keräämään '
          + 'rahaa "ulkovallalta", Almerían kaupungilta, ja kun kaupunki ei '
          + 'maksanut, se pommitettiin. Madridin hallitus julisti kantonin '
          + 'johtajan merirosvoksi ja pani hänen päästään palkkion.',
        'Fregatit Almansa ja Vitoria otettiin lopulta kiinni merirosvoina, '
          + 'mutta ei espanjalaisten toimesta: kiinniottajat olivat '
          + 'brittiläinen HMS Swiftsure ja saksalainen SMS Friedrich Karl. '
          + 'Kantoni kesti puoli vuotta, löi omaa rahaa ja otti '
          + 'loppuvaiheessa vastaan keskimäärin 1 200 kranaattia päivässä. '
          + '16. joulukuuta 1873 sen johtaja Roque Barcia kirjoitti '
          + 'Yhdysvaltain presidentille Ulysses S. Grantille ja pyysi lupaa '
          + 'nostaa Yhdysvaltain lippu, jotta pommitukset lakkaisivat. '
          + 'Lupaa ei tullut. Kaupunki antautui 12. tammikuuta 1874.',
      ],
      lahde: 'en-Wikipedia "Canton of Cartagena", osiot "Establishment", '
        + '"Expansion" ja "Defeat", sekä "First Spanish Republic" '
        + '(tarkistettu 25.8.2026 työaineistoon docs/mantereet-tyoaineisto/'
        + 'takynostot-espanja.md, ehdokas 4).',
      /* Commons 25.8.2026: 1216×928, public domain, Restrictions tyhjä. */
      valokuva: {
        tiedosto: 'Vista de la ciudad, puerto y Arsenal de Cartagena.jpg',
        selite: 'Cartagenan satama ja arsenaali vuoden 1778 kaiverruksessa. '
          + 'Juuri se arsenaali nousi kapinaan.',
        lahde: 'Juan Fernando Palomino 1778, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Mikä oli Cartagenan kantoni?',
        'Miksi Espanjassa oli vuonna 1873 useita hallituksia peräkkäin?',
        'Miten kaupunki pystyi lyömään omaa rahaa?',
      ],
      // 37,6019 N / −0,9842 E — en-Wikipedia "Cartagena, Spain"
      // (fokuskohteet-espanja.md, kohde 7).
      paikka: {
        nimi: 'Cartagena',
        laudat: {
          maailmankartta: { x: 5800.5, y: 1896.2 },
          europe: { x: 192.3, y: 904.7 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Vigon lahden
   * hopealasti. Merkintä aukeaa, kun aarre löytyy (js/fokusvirta.js
   * fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Vigossa soutumies näytti kohdan, jossa hopealaivat '
      + 'makaavat, ja pyysi viikon palkan sukelluksesta. Minulla oli '
      + 'viikko aikaa muttei uskallusta — merkitsin syvyyden ja soudin '
      + 'takaisin.',
  },
};
