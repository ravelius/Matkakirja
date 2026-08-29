/*
 * PRAHAN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-madrid.js:lle ja -wien.js:lle:
 * samat kentät, sama järjestys, sama moottori (js/fokusvirta.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 28.8.2026): matkakirjan teksti ja
 * aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamansa.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Rudolf II:n kabinetin helmi (aarremerkintä).
 *
 * SÄVEL ON KAANONISTA. docs/isoisan-raamattu.md, kaupunkijako:
 * *"Praha (arvoitus: kello joka ei näytä kiirettä)"*, ja motiivibudjetti
 * sanoo erikseen, että *"Prahan julkinen kello on eri asia — sallittu"*.
 * Merkintä alkaa siitä kellosta, ja koko paketti pitää sen: Livia
 * kommentoi kelloa, ei kiirettä.
 *
 * ── PRAHA JATKAA WIENIN PILOTTIA: ISOISÄN PULMA ────────────────────
 *
 * Raamattu, osio "Fokusmoodi" (omistaja 28.8.2026 ilta): *"PELITEHTÄVÄN
 * AIHE RATKAISEE, EI MEKANIIKKA … isoisän väittämä- ja pulmatyypit
 * kylvetään suoraan saman kaupungin merkintään, jossa merkintä väittää
 * jotain tai jättää pulman auki ja kohtaaminen lunastaa sen."*
 *
 * Merkintä jättää pulman ilmaan: *"keisari keräsi aikoinaan kaiken
 * maailman ihmeet yhteen saliin — ja sali on yhä olemassa, vaikka
 * ihmeet ovat hajallaan."* Kysymys "kuka ne hajotti" jää auki.
 * Puuttuva pala on tämän tiedoston oppitunnissa, ja kohtaamisen
 * kysymys (js/tyohuone-kehitys-data.js KAARI_PAKETIT, praha) lunastaa
 * sen. Pelaaja siis PÄÄTTELEE vastauksen kahdesta pelissä olevasta
 * tiedosta.
 *
 * ── MERKINNÄN KYYTI (anakronismi korjattu 29.8.2026) ───────────────
 *
 * Kaanonin merkintä sanoi alun perin isoisän myöhästyneen
 * raitiovaunusta, mutta Prahan ensimmäinen hevosraitiotie avattiin
 * vasta 1875 — isoisän matkavuonna 1873 sellaista ei ollut. Fable
 * korjasi kaanonin muotoon "ajurin kyydistä" ennen luennan
 * generointia. Mikään muu teksti ei nojaa kulkuneuvoon.
 *
 * FAKTAPOHJA. Aalto 2:n maille EI ole takynostot-työaineistoa, joten
 * täyt, oppitunti, lehtitehtävät ja täkynosto on rakennettu kahdesta
 * lähteestä ja vain niistä: pelin omasta kuratoidusta aineistosta
 * (js/packs/kulttuuri-kategoriat.js praha, js/packs/maa-kategoriat.js
 * CZE, js/packs/nahtavyysjutut.js praha) sekä Wikipedian rajapinnasta
 * 29.8.2026 haetuista lisätiedoista, joista jokainen on katsottu
 * KAHDESTA riippumattomasta lähteestä.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellin generoitu hero.
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ÄÄNITE PUUTTUU VIELÄ: `matkakirja.aanite` kirjoitetaan samassa
 * erässä kuin assets/audio/puhe-fokus-matkakirja-praha.mp3
 * (tools/generoi-luennat.mjs praha). Ilman kenttää js/ui.js piilottaa
 * kaiuttimen.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta
 * 29.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus,
 * Restrictions). Ihmisiä sisältävät kuvat on katsottu silmin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Dvořák-kysymys on Prahan lehden sivun 2
 * ("Musiikki") oman noston "Dvořák vei kylätanssit maailmalle" tekstiä
 * ja siltakysymys sivun 1 ("Praha") oman noston "Kaarle IV rakensi
 * sillan ja yliopiston" tekstiä (js/packs/kulttuuri-kategoriat.js).
 * Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI KELLOKYSYMYSTÄ SIVULLE 2: sivun 1 kulttuurivisa (js/packs/
 * europe-kulttuuri.js) kysyy jo Smetanan kuuroudesta, joten sivun 2
 * kysymys otetaan saman sivun toisesta nostosta. Ja miksi ei
 * kokoelmakysymystä kummallekaan: kaupungin laattakysymys on isoisän
 * pulma keisarin ihmeistä (ks. tiedoston alku), eikä sitä saa ratkaista
 * lehdessä ennen kuin Tomáš on tavattu.
 */
const DVORAK_VISA = {
  kysymys: 'Antonín Dvořák soitti prahalaisessa orkesterissa ennen kuin '
    + 'hänen sävellyksensä löydettiin. Missä kaupungissa hän myöhemmin '
    + 'johti musiikkikoulua?',
  vaihtoehdot: [
    'New Yorkissa',
    'Wienissä',
    'Pietarissa',
  ],
  oikea: 0,
  fakta: 'Siellä hän sävelsi sinfonian nimeltä Uudesta maailmasta. '
    + 'Kuuluisaksi hänet olivat tehneet Slaavilaiset tanssit, joissa soi '
    + 'böömiläisten ja määriläisten kylien tanssimusiikki '
    + 'sinfoniaorkesterille kirjoitettuna.',
};

const SILTA_VISA = {
  kysymys: 'Kaarlensillan rakentaminen aloitettiin hetkellä, jonka '
    + 'numerot luetaan samoin kumpaankin suuntaan: 1-3-5-7-9-7-5-3-1. '
    + 'Mikä vuosi se oli?',
  vaihtoehdot: [
    '1357',
    '1379',
    '1537',
  ],
  oikea: 0,
  fakta: 'Kaarle IV teki Prahasta valtakuntansa pääkaupungin. Hänen '
    + 'aikanaan kaupunki sai yliopiston, kokonaan uuden kaupunginosan ja '
    + 'kivisillan Vltavan yli — se kantaa yhä.',
};

export const FOKUSVIRTA_PRAHA = {
  kaupunki: 'praha',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * Paikkarivi on kirjoittajan oma. Kuukausi on lokakuu, jotta
     * Praha asettuu Budapestin (marraskuu) ja Lontoon (joulukuu)
     * eteen aallon 2 sisällä. Sääkommentti on isoisän havainto eikä
     * mitattu väite.
     */
    paikkarivi: 'Praha, lokakuussa 1873. Kirkasta; yön aikana '
      + 'ensimmäinen halla.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Prahassa on kello, joka näyttää auringon ja kuun paikan '
      + 'mutta ei kiirettä. Myöhästyin sen takia ajurin kyydistä enkä '
      + 'kadu. Tässä kaupungissa keisari keräsi aikoinaan kaiken '
      + 'maailman ihmeet yhteen saliin — ja sali on yhä olemassa, vaikka '
      + 'ihmeet ovat hajallaan.',
    /*
     * Luenta on sama teksti tunnetagein — sanat eivät muutu. Äänitettä
     * ei ole vielä generoitu, joten `aanite` puuttuu (ks. tiedoston
     * alku).
     */
    luenta: '[curious] Prahassa on kello, joka näyttää auringon ja kuun '
      + 'paikan mutta ei kiirettä. [laughs] Myöhästyin sen takia '
      + 'ajurin kyydistä enkä kadu. [softly] Tässä kaupungissa keisari '
      + 'keräsi aikoinaan kaiken maailman ihmeet yhteen saliin — '
      + '[whispers] ja sali on yhä olemassa, vaikka ihmeet ovat '
      + 'hajallaan.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS — PARIPERIAATE (Raamattu, "LIVIA AIKASIIRTYMÄN
     * VÄLITTÄJÄNÄ"): merkintä on kevyt arvoitus eikä synkkä, joten
     * Livia saa naljailla ja mainita herkun. Kupla EI koske keisarin
     * salia — se on kohtaamisen pulman aihe, eikä pulmaa ratkaista
     * ennen kysymystä.
     *
     * FAKTAKURI: kolme väitettä, kaikki pelin omasta, jo hyväksytystä
     * aineistosta. (1) Kellon vanhin osa on vuodelta 1410 ja se on
     * maailman vanhin yhä toimiva astronominen kello (js/packs/
     * kulttuuri-kategoriat.js, praha; js/packs/nahtavyysjutut.js,
     * "Astronominen kello"). (2) Kuunkiertoa pyörittää pelkkä
     * painovoima ja ruuvikierre, ja virhe on noin yksi päivä viidessä
     * vuodessa (sama nähtävyysjuttu). (3) Chlebíček on paksu viipale
     * vaaleaa leipää, jonka päälle ladotaan perunasalaattia, kinkkua,
     * kananmunaa ja suolakurkkua (js/packs/maa-kategoriat.js, CZE/arki).
     *
     * MERKINNÄN RAITIOVAUNUA EI KOSKETA (ks. tiedoston alku).
     *
     * PUHEKIELIPASSI: lyhentymät vain reunoilla ("Kääk", "Mut"),
     * keskellä sanat auki; pronominit kokonaisina; ei huutomerkkejä.
     */
    maadoitus: 'Kääk. Kello, joka näyttää auringon ja kuun mutta ei '
      + 'kiirettä — sellaisen kellon minä hyväksyn. Sen vanhin osa on '
      + 'vuodelta 1410, ja se on maailman vanhin yhä käyvä astronominen '
      + 'kello; kuunkiertoa pyörittää pelkkä painovoima ja ruuvikierre, '
      + 'ja se erehtyy noin päivän viidessä vuodessa. Isoisäsi jäi '
      + 'katsomaan, ja siinä hän teki oikein. Minä hain sillä välin '
      + 'torilta chlebíčekin, joka on paksu viipale leipää ja sen päällä '
      + 'perunasalaattia, kinkkua ja suolakurkkua. Mut makeaa siinä ei '
      + 'ollut grammaakaan, ja sen minä muistan.',
    /*
     * Huomio viittaa herokuvan kohteeseen (Kaarlensilta ja linna).
     * Faktat ovat lehden oman avauskuvan selitteestä (js/packs/
     * kulttuuri-kategoriat.js, praha/avauskuvat): peruskivi laskettiin
     * 1357, silta valmistui 1400-luvun alussa ja se oli Vltavan ainoa
     * kiinteä ylitys 1840-luvulle asti. Loppu osoittaa linnanmäelle ja
     * pohjustaa oppitunnin ilman että ratkaisee mitään.
     */
    teksti: 'Tuo silta on ollut paikallaan kauemmin kuin mikään muu '
      + 'joen ylitys tässä kaupungissa: peruskivi laskettiin 1357, ja '
      + 'aina 1840-luvulle asti se oli Vltavan ainoa kiinteä ylitys — '
      + 'siis myös isoisäsi ainoa. Ja tuolla ylhäällä, sillan päässä '
      + 'kohoavalla linnanmäellä, on se sali, josta hän kirjoitti. Katso '
      + 'ensin tonne ylös.',
    kuva: {
      ampari: 'herokoe/hero-praha-kaarlensilta-linna.jpg',
      selite: 'Kaarlensillan peruskivi laskettiin vuonna 1357 ja silta '
        + 'valmistui 1400-luvun alussa; se oli Vltavan ainoa kiinteä '
        + 'ylitys Prahassa aina 1840-luvulle asti.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkintä alkaa kellosta, joka näyttää
       * auringon ja kuun paikan. Sata metriä siitä kellosta, saman
       * aukion kirkossa, lepää mies, joka mittasi taivaan tarkemmin
       * kuin kukaan ennen häntä — ja teki sen samalle keisarille, jonka
       * salista merkinnän loppu puhuu.
       *
       * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta
       * lähteestä):
       *   - en-Wikipedia "Tycho Brahe" (johdanto ja osiot elämästä sekä
       *     suhteesta Kepleriin): menetti nenänsä siltaosan
       *     kaksintaistelussa serkkunsa Manderup Parsbergin kanssa
       *     joulukuussa 1566 riideltyään siitä, kumpi oli parempi
       *     matemaatikko; käytti loppuikänsä nenäproteesia, jonka
       *     sanottiin olevan hopeaa ja kultaa, mutta vuonna 2010
       *     avatusta haudasta otetun näytteen analyysi osoitti 2012 sen
       *     olleen messinkiä; kuningas Kristian IV pakotti hänet
       *     lähtemään Tanskasta 1597; Prahassa hänestä tuli keisarillinen
       *     tähtitieteilijä ja hän rakensi observatorion Benátky nad
       *     Jizerouhun; kuoli 24. lokakuuta 1601; Johannes Kepler
       *     avusti häntä vuoden ja käytti sitten hänen havaintojaan
       *     omiin planeettalakeihinsa; yhdessä he tekivät Rudolfin
       *     taulukot; Tycho on haudattu Tynin kirkkoon Vanhankaupungin
       *     torille astronomisen kellon viereen.
       *   - en-Wikipedia "Rudolf II, Holy Roman Emperor" (osio
       *     hovista): Rudolf oli Tychon ja Keplerin suojelija ja
       *     molemmat olivat hänen hovissaan; Brahe ohjasi Keplerin
       *     työskentelemään Marsin parissa, ja juuri siitä Kepler
       *     päätteli, että planeetat kiertävät aurinkoa ellipsiradalla.
       *   - js/packs/kulttuuri-kategoriat.js, praha/avauskuvat (pelin
       *     omaa tarkistettua aineistoa): Tyko Brahe haudattiin Tynin
       *     kirkon kuoriin vuonna 1601.
       */
      id: 'tycho',
      nappi: 'Mies, jonka nenä oli messinkiä',
      otsikko: 'Tycho Brahe Vanhankaupungin torilla',
      teksti: 'Sen kellon vieressä, saman torin kirkossa, lepää mies joka '
        + 'mittasi taivaan. Tanskalainen Tycho Brahe menetti '
        + 'kaksintaistelussa 1566 nenänsä siltaosan — riita oli siitä, '
        + 'kumpi hän vai serkku Manderup Parsberg oli parempi '
        + 'matemaatikko — ja käytti loppuikänsä proteesia, jonka '
        + 'sanottiin olevan hopeaa ja kultaa. Vuonna 2010 hänen hautansa '
        + 'avattiin, ja kaksi vuotta myöhemmin näyte kertoi toista: '
        + 'messinkiä. Kuningas Kristian IV pakotti hänet lähtemään '
        + 'Tanskasta 1597, ja Praha otti hänet vastaan: hänestä tuli '
        + 'keisarin tähtitieteilijä ja hän rakensi observatorion '
        + 'lähikaupunkiin. Hän ehti tehdä täällä vain neljä vuotta ja '
        + 'kuoli 1601, mutta ne neljä vuotta riittivät. Viimeisenä '
        + 'vuotenaan hän sai apulaisen, Johannes Keplerin, ja antoi '
        + 'tälle tehtäväksi Marsin radan. Keplerin oli lopulta '
        + 'myönnettävä, että havainnot sopivat vain jos planeetta kiertää '
        + 'aurinkoa soikiota pitkin — ja siitä tuli yksi luonnontieteen '
        + 'käännekohdista. Tycho itse on haudattu Tynin kirkkoon, sadan '
        + 'metrin päähän kellosta.',
      /*
       * Commons 29.8.2026: 3072×4080, CC0, käyttäjä Arpasevan, kuvattu
       * 28.5.2026, kuvaus "Tycho Brahe's Tomb in Prague's Týn Church".
       * Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on
       * hautakivireliefi kirkon pilarissa, ei ihmisiä.
       */
      kuva: {
        tiedosto: "Tycho Brahe's Tomb.jpg",
        selite: 'Tycho Brahen hautakivi Tynin kirkossa Prahan '
          + 'Vanhankaupungin torilla, muutaman askeleen päässä '
          + 'astronomisesta kellosta.',
        lahde: 'Arpasevan, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Mistä aineesta Tycho Brahen nenäproteesi lopulta '
          + 'osoittautui tehdyksi?',
        vaihtoehdot: [
          'Messingistä',
          'Hopeasta ja kullasta',
          'Vahasta',
        ],
        oikea: 0,
        fakta: 'Aikalaiset uskoivat proteesin olevan hopeaa ja kultaa. '
          + 'Vuonna 2010 avatusta haudasta otettu näyte kertoi toista '
          + 'kaksi vuotta myöhemmin.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisä mittaa. Ilmapuntari on hänen tapansa
       * katsoa maailmaa, ja Prahassa on talo, joka on tehnyt saman
       * joka päivä vuodesta 1775 — pitempään kuin yksikään suku
       * jaksaisi.
       *
       * MOTIIVIBUDJETTI SALLII TÄMÄN JUURI TÄSSÄ KAUPUNGISSA.
       * docs/isoisan-raamattu.md varaa mittausmotiivin Alpeille ja
       * sallii sille 1–2 paluuta, mutta Prahan kaari on jo kaanonissa
       * barometrikaupunki: tarinakaaren saapumisteksti
       * (js/tyohuone-kehitys-data.js, praha) päättyy siihen, että
       * pöydällä olevan kirjan reunassa on isoisän barometrin lukema ja
       * hän kirjaa omansa viereen. Täky nojaa siis kaupungin omaan
       * kaanoniin eikä avaa uutta lankaa.
       *
       * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta
       * lähteestä):
       *   - en-Wikipedia "Clementinum" (osiot "History" ja
       *     "Curiosities"): rakennusryhmän historia alkaa 1000-luvun
       *     Klemens-kappelista; keskiaikainen dominikaaniluostari
       *     vaurioitui pahoin 1420 hussilaissodissa ja muutettiin 1556
       *     jesuiittakollegioksi; 1622 jesuiitat siirsivät Kaarlen
       *     yliopiston kirjaston tänne, ja kollegio yhdistettiin
       *     yliopistoon 1654; päärakennusvaihe oli 1709–1726, jolloin
       *     valmistui barokkikirjasto; jesuiittain lakkauttamisen
       *     jälkeen 1773 keisarinna Maria Teresia teki talosta
       *     observatorion, kirjaston ja yliopiston; kansalliskirjasto
       *     perustettiin 1781 ja vuodesta 1782 taloon on toimitettu
       *     vapaakappaleet; vuonna 1791 talossa pidettiin ensimmäinen
       *     maailmannäyttely, teollisuusnäyttely Leopold II:n
       *     kruunajaisten kunniaksi; rakennusryhmä on 20 000 neliötä ja
       *     Prahan toiseksi suurin linnan jälkeen; kokoelmissa on
       *     Tycho Brahea koskevaa aineistoa; Böömin vanhin säänmittaus
       *     alkoi täällä vuonna 1775 ja jatkuu yhä.
       *   - Tšekin hydrometeorologisen laitoksen oma
       *     mittaushistoriasivu, johon artikkeli viittaa lähteenä (sama
       *     aloitusvuosi 1775 ja mittauksen katkeamattomuus).
       */
      id: 'klementinum',
      nappi: 'Talo, joka on kirjannut sään joka päivä vuodesta 1775',
      otsikko: 'Klementinumin sääkirja',
      teksti: 'Isoisäsi kirjaa ilmanpuntarin lukemat, koska hän ei luota '
        + 'muistiin. Prahassa on talo, joka on tehnyt saman kauemmin kuin '
        + 'yksikään suku. Klementinum alkoi 1000-luvun kappelista, jatkui '
        + 'dominikaaniluostarina, vaurioitui hussilaissodissa 1420 ja '
        + 'muutettiin 1556 jesuiittakollegioksi. Vuonna 1622 sinne '
        + 'siirrettiin Kaarlen yliopiston kirjasto, ja päärakennusvaihe '
        + '1709–1726 antoi talolle barokkikirjaston, jollaista harvassa '
        + 'kaupungissa on. Kun jesuiittakunta lakkautettiin 1773, '
        + 'keisarinna Maria Teresia teki rakennuksesta observatorion, '
        + 'kirjaston ja yliopiston. Kansalliskirjasto perustettiin 1781, '
        + 'ja vuodesta 1782 taloon on toimitettu vapaakappale jokaisesta '
        + 'painetusta kirjasta. Vuonna 1791 siellä pidettiin '
        + 'teollisuusnäyttely Leopold II:n kruunajaisten kunniaksi — '
        + 'ensimmäinen laatuaan maailmassa. Mutta kaikkein pisin '
        + 'yhtäjaksoinen työ on tehty tornissa: Böömin vanhin '
        + 'säänmittaus alkoi Klementinumissa vuonna 1775, ja se jatkuu '
        + 'yhä. Isoisäsi lukemat mahtuisivat siihen sarjaan yhtenä '
        + 'lokakuisena rivinä.',
      /*
       * Commons 29.8.2026: 6000×4000, CC BY-SA 4.0, Václav Jiroušek,
       * kuvattu 12.4.2024, kuvaus "Baroque Library Hall located in the
       * Clementinum complex in Prague, Czechia". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: kuvassa on kirjastosali, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Clementinum baroque library 2.jpg',
        selite: 'Klementinumin barokkikirjaston sali, joka valmistui '
          + 'vuosien 1709 ja 1726 välisessä rakennusvaiheessa.',
        lahde: 'Václav Jiroušek, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Mitä Klementinumissa on tehty katkeamatta vuodesta '
          + '1775?',
        vaihtoehdot: [
          'Mitattu ja kirjattu sää',
          'Painettu kaupungin sanomalehteä',
          'Soitettu keskipäivän kellot',
        ],
        oikea: 0,
        fakta: 'Sarja on Böömin vanhin. Sama talo sai 1781 '
          + 'kansalliskirjaston ja on ottanut vastaan vapaakappaleet '
          + 'vuodesta 1782.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       *
       * MIKSI TÄMÄ TÄKY: merkintä sanoo, että ihmeet ovat hajallaan.
       * Tämä on saman kaupungin vastakohta — laji, joka oli hajallaan
       * ja koottiin takaisin. Kytkös keisarin saliin on aito: Rudolf
       * piti linnassa myös eläintarhaa, ja Prahan eläintarha on tehnyt
       * samasta harrastuksesta tieteen.
       *
       * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta
       * lähteestä):
       *   - en-Wikipedia "Przewalski's horse" (johdanto ja osio
       *     historiasta): laji oli kerran hävinnyt luonnosta ja viimeinen
       *     havainto luonnossa oli yksinäinen ori vuonna 1969, minkä
       *     jälkeen sitä pidettiin luonnosta hävinneenä yli
       *     kolmenkymmenen vuoden ajan; toisen maailmansodan jälkeen
       *     jäljellä oli vain kaksi eläintarhakantaa, Münchenissä ja
       *     Prahassa, ja 1950-luvun lopulla koko maailman
       *     eläintarhoissa oli enää kaksitoista yksilöä; lajilla on 33
       *     kromosomiparia, kesyhevosella 32; 1990-luvulta lähtien
       *     lajia on palautettu Mongoliaan; Prahan eläintarha on
       *     kuljettanut hevosia Mongoliaan useassa erässä muun muassa
       *     Tšekin ilmavoimien kanssa.
       *   - cs-Wikipedia "Chov koně Převalského v Zoo Praha": Prahan
       *     eläintarhassa lajia on kasvatettu 1930-luvulta asti, ja
       *     vuonna 1959 eläintarhalle uskottiin lajin kansainvälisen
       *     kantakirjan pito.
       *   - Rudolfin eläintarha: en-Wikipedia "Rudolf II, Holy Roman
       *     Emperor" (osio hovista): keisari piti linnassa
       *     eksoottisten eläinten kokoelmaa, ja leijona ja tiikeri
       *     saivat kulkea linnassa vapaina.
       */
      id: 'przewalski',
      nappi: 'Hevonen, joka koottiin takaisin kahdestatoista',
      otsikko: 'Prahan hevoset',
      teksti: 'Se keisari, jonka salista isoisäsi kirjoitti, keräsi '
        + 'muutakin kuin esineitä: linnassa oli eksoottisten eläinten '
        + 'kokoelma, ja leijona ja tiikeri saivat kulkea siellä vapaina. '
        + 'Kolmesataa vuotta myöhemmin sama kaupunki teki '
        + 'eläintenkeräilystä tiedettä. Przewalskin hevonen on '
        + 'mongolialainen villihevonen, jolla on 33 kromosomiparia '
        + 'siinä missä kesyhevosella on 32 — se ei siis ole karannut '
        + 'kesyhevonen vaan oma lajinsa. Toisen maailmansodan jälkeen '
        + 'niitä oli jäljellä vain kahdessa eläintarhassa, Münchenissä ja '
        + 'Prahassa, ja 1950-luvun lopulla koko maailman eläintarhoissa '
        + 'oli enää kaksitoista yksilöä. Vuonna 1959 Prahan eläintarhalle '
        + 'uskottiin lajin kansainvälisen kantakirjan pito: kuka on '
        + 'kenenkin jälkeläinen, jotta suku ei kapenisi umpeen. Luonnosta '
        + 'laji hävisi kokonaan — viimeinen villi havainto oli yksinäinen '
        + 'ori vuonna 1969, ja yli kolmenkymmenen vuoden ajan lajia '
        + 'pidettiin luonnosta hävinneenä. Sitten se vietiin takaisin: '
        + '1990-luvulta lähtien hevosia on palautettu Mongolian aroille, '
        + 'ja Prahan eläintarha on kuljettanut niitä sinne useassa '
        + 'erässä, muun muassa Tšekin ilmavoimien koneilla.',
      /*
       * Commons 29.8.2026: 2200×1567, CC BY-SA 2.5, tšekkiläinen
       * Wikipedia-käyttäjä Packa, kuvattu 1.9.2007, kuvaus
       * "Przewalski's horses exposition in Zoo Prague". Restrictions
       * tyhjä. SILMÄTARKISTUS tehty: kuvassa on hevosia aitauksessa,
       * ei tunnistettavia ihmisiä.
       */
      kuva: {
        tiedosto: 'Przewalskis horses exposition, Zoo Prague.jpg',
        selite: 'Przewalskin hevosia Prahan eläintarhassa. Kaikki '
          + 'nykyiset yksilöt polveutuvat kourallisesta eläintarhojen '
          + 'hevosia.',
        lahde: 'Packa, Wikimedia Commons (CC BY-SA 2.5)',
      },
      visa: {
        kysymys: 'Kuinka monta Przewalskin hevosta maailman '
          + 'eläintarhoissa oli enää 1950-luvun lopulla?',
        vaihtoehdot: [
          'Kaksitoista',
          'Noin kaksisataa',
          'Noin kaksituhatta',
        ],
        oikea: 0,
        fakta: 'Prahan eläintarhalle uskottiin 1959 lajin '
          + 'kansainvälisen kantakirjan pito. Luonnosta laji hävisi '
          + 'kokonaan, ja viimeinen villi havainto oli yksinäinen ori '
          + 'vuonna 1969.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * ISOISÄN PULMAN TOINEN PALA (ks. tiedoston alku). Merkintä jättää
   * ilmaan kysymyksen siitä, kuka hajotti keisarin ihmeet; oppitunti
   * antaa vuoden ja tekijän, ja kohtaamisen kysymys lunastaa sen.
   *
   * OPPITUNTI EI OLE VASTAUSLAPPU vaan tarina, jossa vastaus on
   * sisällä: kysymyksen sanamuoto ei toistu tekstissä sellaisenaan.
   *
   * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta lähteestä):
   *   - en-Wikipedia "Rudolf II, Holy Roman Emperor" (tietolaatikko ja
   *     osiot hovista): hallitsi 12.10.1576–20.1.1612 ja siirsi
   *     Habsburgien pääkaupungin Wienistä Prahaan 1583; keräsi
   *     Euroopan laajimman kuriositeettikabinetin, joka kattoi
   *     "luonnon kolme valtakuntaa ja ihmisen työt"; kokoelma
   *     sijaitsi Prahan linnassa, jonka pohjoissiiven hän rakennutti
   *     kokoelmilleen 1587–1605; hovissa oli myös eksoottisten
   *     eläinten kokoelma.
   *   - en-Wikipedia "Battle of Prague (1648)" (johdanto ja osiot
   *     "Overview" ja "Sack of Prague"): taistelu käytiin 25.
   *     heinäkuuta – 1. marraskuuta 1648 ja se oli kolmikymmenvuotisen
   *     sodan viimeinen sotatoimi; Ruotsi lähti viimeiseen sotaretkeen
   *     Böömiin samalla kun Westfalenin rauhaa neuvoteltiin;
   *     päätulos — ja luultavasti päätarkoitus — oli ryöstää Rudolf
   *     II:n kokoelma, jonka parhaat osat vietiin proomuilla Elbeä
   *     alas ja laivattiin Ruotsiin; Hans Christoff von Königsmarckin
   *     joukot pääsivät yöllisellä yllätyshyökkäyksellä kesken
   *     rakennustöiden heikoksi jääneestä muurista koko joen
   *     länsipuolelle eli linnaan, Hradčanyyn ja Malá Stranaan; kaksi
   *     päivää myöhemmin ne yrittivät itäpuolelle mutta torjuttiin
   *     Kaarlensillalla; puolustajina oli kahdentuhannen sotilaan
   *     lisäksi porvarien miliisi ja opiskelijoiden vapaaehtoisjoukko
   *     jesuiittapappi Jiří Plachýn johdolla; hyökkäykset lopetettiin,
   *     kun tieto rauhansopimuksen allekirjoittamisesta saapui;
   *     ruotsalaiset pitivät varuskuntaa länsirannalla 30. syyskuuta
   *     1649 asti; sota oli alkanut samassa kaupungissa kolmekymmentä
   *     vuotta aiemmin.
   *   - en-Wikipedia "Vertumnus (Arcimboldo)": maalaus valmistui 1591
   *     ja annettiin Rudolf II:lle; Ruotsin armeija ryösti sen
   *     kolmikymmenvuotisen sodan jälkeen; taidehistorioitsijat
   *     kadottivat sen jäljet, ja se ilmestyi uudelleen 1845
   *     Skoklosterin linnassa Ruotsissa, jossa se yhä on.
   *
   * IKÄSOPIVUUS (13+): taistelusta kerrotaan kulku ja lopputulos,
   * ei tappioita eikä väkivaltaa.
   */
  oppitunti: {
    otsikko: 'Keisarin sali ja se, mikä siitä vietiin',
    teksti: 'Keisari oli Rudolf II, joka hallitsi vuodesta 1576 vuoteen '
      + '1612 ja siirsi Habsburgien pääkaupungin Wienistä Prahaan jo '
      + '1583. Hän keräsi Euroopan laajimman kuriositeettikabinetin, '
      + 'joka kattoi omien sanojensa mukaan luonnon kolme valtakuntaa ja '
      + 'ihmisen työt: maalauksia, kelloja, tähtitieteen kojeita, '
      + 'kivennäisiä, eksoottisia eläimiä. Kokoelmalle rakennettiin '
      + 'Prahan linnaan oma pohjoissiipi vuosina 1587–1605, ja juuri se '
      + 'sali on yhä paikallaan. Sitten tuli vuosi 1648. '
      + 'Kolmikymmenvuotinen sota oli päättymässä ja Westfalenin rauhaa '
      + 'neuvoteltiin, kun Ruotsi lähti vielä yhteen sotaretkeen '
      + 'Böömiin. Hans Christoff von Königsmarckin joukot löysivät '
      + 'kesken rakennustöiden heikoksi jääneen muurinkohdan, pääsivät '
      + 'yöllä sisään ja ottivat koko joen länsipuolen: linnan, '
      + 'Hradčanyn ja Malá Stranan. Kaksi päivää myöhemmin ne yrittivät '
      + 'joen yli itärannalle, mutta ne torjuttiin Kaarlensillalla — '
      + 'puolustajina oli kahdentuhannen sotilaan lisäksi porvarien '
      + 'miliisi ja opiskelijoiden vapaaehtoisjoukko, jota johti '
      + 'jesuiittapappi Jiří Plachý. Vanhakaupunki piti pintansa '
      + 'marraskuun alkuun asti, kunnes tieto rauhan '
      + 'allekirjoittamisesta saapui ja hyökkäykset lakkasivat. Silloin '
      + 'kokoelma oli jo pakattu: parhaat palat vietiin proomuilla Elbeä '
      + 'alas ja laivattiin Ruotsiin. Historioitsijat arvelevat, että se '
      + 'oli koko retken tarkoitus. Yksi esimerkki riittää: Giuseppe '
      + 'Arcimboldo maalasi 1591 keisarista muotokuvan, jossa kasvot on '
      + 'koottu hedelmistä ja vihanneksista. Maalaus katosi näkyvistä, '
      + 'ilmestyi 1845 Skoklosterin linnassa Ruotsissa ja on siellä yhä.',
    /*
     * Commons 29.8.2026: 11795×14623, public domain, Giuseppe
     * Arcimboldo, 1591, Skoklosters slott. Restrictions tyhjä.
     * SILMÄTARKISTUS tehty: muotokuva, jossa kasvot on koottu
     * hedelmistä.
     *
     * MIKSI JUURI TÄMÄ KUVA: se on samalla oppitunnin esimerkki ja
     * sen todiste — teos on itse osa ryöstösaalista ja yhä Ruotsissa.
     */
    kuva: {
      tiedosto: 'Vertumnus årstidernas gud målad av Giuseppe Arcimboldo 1591 - Skoklosters slott - 91503.jpg',
      selite: 'Giuseppe Arcimboldon muotokuva keisari Rudolf II:sta '
        + 'vuodelta 1591. Maalaus on nykyään Skoklosterin linnassa '
        + 'Ruotsissa.',
      lahde: 'Giuseppe Arcimboldo 1591, Wikimedia Commons (public '
        + 'domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   * Hahmo, kohtaamiskuva ja kysymys ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id 'praha'):
   * lyhdynsytyttäjä Tomáš pitää sukunsa lupauksen Kultaisella kujalla.
   * Kysymys on v1308:ssa vaihdettu ISOISÄN PULMAKSI (ks. tiedoston
   * alku) — tämä kortti ei kertaa Tomášin repliikkiä eikä paljasta
   * vastausta.
   */
  kohtaaminen: {
    hahmo: 'Lyhdynsytyttäjä Tomáš',
    nappi: 'Tapaa lyhdynsytyttäjä',
    teksti: 'Tomáš kiipeää tikkaille joka ilta samassa järjestyksessä ja '
      + 'tietää ilman kelloa, milloin on aika aloittaa. Kujan talot ovat '
      + 'niin matalia, että hän kumartaa oviaukoissa vaikka on kävellyt '
      + 'ne läpi kymmenentuhatta kertaa. Sukunsa lupauksesta hän ei puhu '
      + 'kenellekään, joka ei sitä ansaitse. Ennen kuin hän antaa '
      + 'sytyttimen vieraan käteen, hän haluaa tietää, onko tämä lukenut '
      + 'isoisänsä merkinnän loppuun asti — ja ymmärtänyt, mitä siitä '
      + 'jäi kysymättä.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: KULTAINEN KUJA. Kaaren teksti vie isoisän
   * Kultaisen kujan pieniin taloihin ja jättää sinne palavan kynttilän,
   * ja pelin oma Praha-aineisto kertoo saman kujan tarinan (js/
   * tyohuone-kehitys-data.js, praha). Paikka on linnanmäellä, siis
   * saman muurin sisällä kuin oppitunnin sali.
   *
   * 50,0922 N / 14,4039 E — en-Wikipedia "Golden Lane",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja
   * samat vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/
   * piirto.js laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2
   * ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((14,4039 − (−175)) mod 360) × (12000/360)
   *                     = 189,4039 × 33,3333… = 6313,5
   *                   y = (millerY(76) − millerY(50,0922)) × 12000/2π
   *                     = 1386,2
   *   europe          x = (14,4039 + 11) × 19,2 = 487,8
   *                   y = (72 − 50,0922) × 26,3 = 576,2
   *
   * TARKISTUS LAATTAA VASTEN: Prahan laatta on Euroopan laudalla
   * 488 / 576 ja maailmankartalla 6313,9 / 1385,9, eli piste osuu
   * käytännössä laatan päälle. Niin pitääkin — linna on kaupungin
   * keskellä, ja laudan yksikkö on maailmankartalla noin kolme
   * kilometriä.
   */
  kohtaamispiste: {
    nimi: 'Kultainen kuja',
    laudat: {
      maailmankartta: { x: 6313.5, y: 1386.2 },
      europe: { x: 487.8, y: 576.2 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Prahan sivupino (js/lehti.js
   * rakennaSivut) on Wienin mittainen, koska kaupungilla on kaksi
   * kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Praha", 2 = Musiikki, 3 = Menovinkit.
   *
   * Sivun 2 oma tehtävä (Dvořákin alttoviulu) väistyy nimetyn tieltä,
   * joten sivulla on Raamatun vaatima yksi minitehtävä eikä kahta.
   * Sivun 1 kysymys on Prahan kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: DVORAK_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: SILTA_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Tšekki) ----------
   *
   * UUSI POOLI, EI SIIRTO. Tšekki ei ole js/fokusnosto.js:n
   * NOSTO_MAAT-taulussa; js/fokusnosto.js nostoMaanPooli lukee
   * kaupungin oman `takynostot`-kentän ennen maapoolia, joten uusi maa
   * ei vaadi riviä moottoriin.
   *
   * MIKSI KARLŠTEJN: merkintä puhuu salista, johon ihmeet koottiin.
   * Karlštejn on saman maan varhaisempi versio samasta ajatuksesta —
   * kokonainen linna, joka rakennettiin yhtä huonetta varten. Nosto
   * EI kerro aarteesta mitään eikä kosketa vuotta 1648.
   *
   * MIKSI EI JÁCHYMOV: taalerin ja dollarin tarina olisi ollut
   * houkutteleva, mutta se on jo pelissä kokonaisena nostona
   * (js/packs/maa-kategoriat.js, CZE/historia, "Laakso, jonka nimi
   * kiersi maailman").
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki).
       *
       * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta
       * lähteestä):
       *   - en-Wikipedia "Karlštejn" (johdanto ja osiot sijainnista ja
       *     historiasta): goottilainen linna, jonka Kaarle IV perusti
       *     1348 säilyttämään Pyhän saksalais-roomalaisen keisarikunnan
       *     valtakunnanregaliat, Böömin kruununjalokivet, pyhäinjäännökset
       *     ja muut kuninkaalliset aarteet; sijaitsee kukkulalla
       *     Berounka-joen yllä noin 30 kilometriä Prahasta lounaaseen;
       *     rakennustöitä johti myöhempi linnanvouti Vitus Bítovilainen,
       *     ja Kaarle IV valvoi rakentamista ja sisustusta itse; työ
       *     valmistui lähes kaksikymmentä vuotta myöhemmin 1365, kun
       *     aarrekammion sydän — suuressa tornissa oleva Pyhän Ristin
       *     kappeli — vihittiin; hussilaissotien alettua
       *     valtakunnanregaliat siirrettiin 1421 pois ja vietiin Unkarin
       *     kautta Nürnbergiin; vuoden 1422 piirityksessä hyökkääjät
       *     katapultoivat muurin yli kahdentuhannen kärryllisen verran
       *     lantaa; linna avattiin yleisölle 1905.
       *   - Commonsin oma kohdekuvaus alla olevalle kuvalle (haettu
       *     imageinfo-rajapinnasta 29.8.2026): "Karlštejn is a large
       *     Gothic castle founded 1348 by Charles IV. It is located in
       *     town of Karlštejn, about 30 km southwest of Prague."
       */
      id: 'karlstejn',
      nimio: 'Karlštejn',
      otsikko: 'Keisari rakensi kokonaisen linnan yhtä huonetta varten '
        + '— ja huone valmistui viimeisenä',
      lunastus: [
        'Kolmekymmentä kilometriä Prahasta lounaaseen, kukkulalla '
          + 'Berounka-joen yllä, seisoo Karlštejn. Kaarle IV perusti sen '
          + '1348 yhtä tarkoitusta varten: siellä säilytettäisiin '
          + 'keisarikunnan valtakunnanregaliat, Böömin kruununjalokivet, '
          + 'pyhäinjäännökset ja muut kruunun aarteet. Rakennustöitä '
          + 'johti myöhempi linnanvouti Vitus Bítovilainen, mutta '
          + 'keisari valvoi rakentamista ja sisustusta itse.',
        'Työ kesti lähes kaksikymmentä vuotta, ja se katsottiin '
          + 'valmiiksi vasta 1365, kun aarrekammion sydän vihittiin: '
          + 'suuressa tornissa oleva Pyhän Ristin kappeli. Turvassa '
          + 'aarteet olivat vain kunnes maa levisi: hussilaissotien '
          + 'alettua regaliat vietiin 1421 pois ja kuljetettiin Unkarin '
          + 'kautta Nürnbergiin. Vuoden 1422 piirityksestä muistetaan '
          + 'yksityiskohta, jota linnaoppaat eivät jätä kertomatta: '
          + 'hyökkääjät heittivät katapulteilla muurin yli '
          + 'kahdentuhannen kärryllisen verran lantaa. Linna kesti sen '
          + 'ja on ollut avoinna yleisölle vuodesta 1905.',
      ],
      lahde: 'en-Wikipedia "Karlštejn", johdanto sekä osiot sijainnista '
        + 'ja historiasta (tarkistettu 29.8.2026).',
      /* Commons 29.8.2026: 5936×3920, CC BY-SA 4.0, Radomír Šalda,
       * kuvattu 9.1.2021. Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * kuvassa on linna talvimaisemassa, ei ihmisiä. */
      valokuva: {
        tiedosto: 'Karlštejn in winter.jpg',
        selite: 'Karlštejnin linna talvella. Suuri torni oikealla '
          + 'sisältää Pyhän Ristin kappelin, jota varten koko linna '
          + 'rakennettiin.',
        lahde: 'Radomír Šalda, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Mitä valtakunnanregaliat olivat?',
        'Miksi keisari rakensi aarrekammion linnan kauas kaupungista?',
        'Miten keskiaikaista linnaa piiritettiin?',
      ],
      // 49,93944444 N / 14,18805556 E — en-Wikipedia "Karlštejn",
      // prop=coordinates (haettu 29.8.2026).
      paikka: {
        nimi: 'Karlštejn',
        laudat: {
          maailmankartta: { x: 6306.3, y: 1392.8 },
          europe: { x: 483.6, y: 580.2 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Rudolf II:n
   * kabinetin helmi. Merkintä aukeaa, kun aarre löytyy
   * (js/fokusvirta.js fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Linnan vanha palvelija vannoi, että Rudolfin kabinetista jäi '
      + 'laatikko, jota ruotsalaiset eivät 1648 löytäneet. Ovi, jonka hän '
      + 'näytti, oli muurattu umpeen — koputin siihen ja kuulin ontton '
      + 'vastauksen, mutta muuria en käynyt purkamaan.',
  },
};
