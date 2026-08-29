/*
 * KÖÖPENHAMINAN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-lontoo.js:lle ja
 * -tukholma.js:lle: samat kentät, sama järjestys, sama moottori
 * (js/fokusvirta.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026): matkakirjan teksti ja
 * aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamansa — niitä
 * ei ole lyhennetty eikä sanajärjestystä muutettu. Luenta on sama
 * teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Gallehusin kultasarvet, varastettu ja sulatettu 1802
 * (aarremerkintä).
 *
 * FAKTAPOHJA. Aallon 3 maille EI ole takynostot-työaineistoa, joten
 * täyt, oppitunti, lehtitehtävät ja täkynosto on rakennettu kahdesta
 * lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Tanskan maalehden nostot
 *      (js/packs/maa-kategoriat.js, DNK/historia ja DNK/keksinnot) ja
 *      Kööpenhaminan kaupunkilehden omat nostot (js/packs/
 *      kulttuuri-kategoriat.js, kobenhavn). Nämä on jo kertaalleen
 *      tarkistettu ja hyväksytty peliin — myös niiden KUVAT, jotka
 *      tämä paketti lainaa sellaisinaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei ole,
 *      on haettu Wikipedian rajapinnasta 29.8.2026 ja katsottu KAHDESTA
 *      riippumattomasta lähteestä. Ne on nimetty kunkin kohdan omassa
 *      kommentissa. Mitään ei ole päätelty eikä pyöristetty.
 *
 * PÄÄLLEKKÄISYYS ON TIETOINEN JA RAJATTU. Tivolitäky nostaa saman
 * aiheen kuin kaupunkilehden Sadut-sivu, koska juuri Tivoli on isoisän
 * merkinnän aihe — mutta täky kertoo sen SYYN, jota lehdessä ei ole:
 * miksi puisto ylipäätään sai luvan. Jelling ja Lego ovat maalehden
 * puolelta, eikä kummallakaan ole vastinetta kaupunkilehdessä.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, kobenhavn/avauskuvat).
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luentaa EI ole vielä generoitu, joten `matkakirja.aanite` puuttuu.
 * Teksti ja luenta ovat sanasta sanaan samat, joten luennan voi ajaa
 * suoraan (generoi-luennat-tyonkulku) ilman että tekstiin kosketaan.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Nyhavn-kysymys on Kööpenhaminan lehden sivun 2
 * ("Sadut") oman noston "Satamakatu, jonka varrella satuja kirjoitettiin"
 * tekstiä ja smørrebrød-kysymys sivun 1 ("Kööpenhamina") oman noston
 * "Voileipä syödään haarukalla" tekstiä (js/packs/kulttuuri-kategoriat.js).
 * Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI SATUKYSYMYSTÄ: kaupungin laattakysymys kysyy, mikä saduista on
 * Andersenin (js/tyohuone-kehitys-data.js KAARI_PAKETIT, kobenhavn). Jos
 * lehden aarteen avaava tehtävä kysyisi samasta, kysymys olisi ratkaistu
 * ennen kuin Karen on tavattu.
 */
const NYHAVN_VISA = {
  kysymys: 'Miksi Nyhavnin kanava kaivettiin 1670-luvulla keskelle '
    + 'Kööpenhaminaa?',
  vaihtoehdot: [
    'Jotta laivat pääsisivät purkamaan lastinsa keskelle kaupunkia',
    'Jotta kaupungille saataisiin juomavettä',
    'Jotta kuningas pääsisi veneellä linnastaan teatteriin',
  ],
  oikea: 0,
  fakta: 'Kadun varsi oli pitkään merimiesten kapakoiden ja halpojen '
    + 'vuokrahuoneiden aluetta. Nykyään talot on maalattu kirkkaanvärisiksi '
    + 'ja kanavassa on vanhoja puulaivoja.',
};

const SMORREBROD_VISA = {
  kysymys: 'Missä järjestyksessä smørrebrød syödään, jos tapaa noudatetaan?',
  vaihtoehdot: [
    'Ensin kala, sitten liha, viimeisenä juusto',
    'Ensin juusto, sitten liha, viimeisenä kala',
    'Järjestyksellä ei ole väliä, kunhan käyttää haarukkaa',
  ],
  oikea: 0,
  fakta: 'Smørrebrød on avoin voileipä tummalla ruisleivällä, ja se syödään '
    + 'veitsellä ja haarukalla. Vanhoissa lounasravintoloissa listalla voi '
    + 'olla yli kaksikymmentä eri leipää, ja jokaisella on oma nimensä ja '
    + 'vakiintunut kuormansa.',
};

export const FOKUSVIRTA_KOBENHAVN = {
  kaupunki: 'kobenhavn',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * Paikkarivi on kirjoittajan oma. Vuodenaika seuraa merkinnän omaa
     * havaintoa: illat huvipuistossa tarkoittavat kesäkautta, ja Tivoli
     * on ollut kesäpuisto avaamisestaan asti (en-Wikipedia "Tivoli
     * Gardens"; ks. täky).
     */
    paikkarivi: 'Kööpenhamina, kesällä 1873. Illat ovat valoisat kello '
      + 'yhteentoista, ja koko kaupunki on ulkona.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Tanska menetti sodassa kolmanneksen maastaan, ja silti täällä '
      + 'käydään illat huvipuistossa. Kävelin Tivolin portista sisään ja '
      + 'ymmärsin: tämä kansa päätti surra valot päällä.',
    luenta: '[curious] Tanska menetti sodassa kolmanneksen maastaan, ja '
      + 'silti täällä käydään illat huvipuistossa. [softly] Kävelin Tivolin '
      + 'portista sisään ja ymmärsin: [whispers] tämä kansa päätti surra '
      + 'valot päällä.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS — VÄLITTÄJÄOTE (Raamattu, "LIVIA AIKASIIRTYMÄN
     * VÄLITTÄJÄNÄ — PARIPERIAATE"). Merkintä koskee sotatappiota ja
     * surua, joten pariperiaate kieltää naljailun: Livia avaa
     * historiakontekstin ja antaa isoisän havainnon seistä.
     *
     * FAKTAKURI: kolme väitettä, kaikki tarkistettavia. (1) Tanska
     * menetti Slesvigin vuonna 1864 (päätoimittajan historia-ankkuri
     * tähän erään). (2) Tivoli avattiin 1843 — siis kaksikymmentäyksi
     * vuotta ENNEN tappiota (pelidata: js/packs/kulttuuri-kategoriat.js,
     * kobenhavn/sadut, "Huvipuisto avattiin vuonna 1843"; sama päivämäärä
     * 15.8.1843 en-Wikipedian "Tivoli Gardens" -artikkelissa).
     * (3) Isoisän käynnistä on yli sataviisikymmentä vuotta.
     *
     * PUHEKIELIPASSI: lyhentymät vain reunoilla ("Kuule", "mut"),
     * keskellä sanat auki; pronominit kokonaisina; ei huutomerkkejä.
     */
    maadoitus: 'Kuule, tuo on kyllä tarkka havainto, ja siihen kannattaa '
      + 'lisätä yksi luku. Se sota, jossa maa kutistui, käytiin vuonna '
      + '1864 — ja se huvipuisto oli avattu jo 1843, kaksikymmentäyksi '
      + 'vuotta ennen tappiota. Valot olivat siis päällä ensin, ja niitä '
      + 'ei vain sammutettu. Isoisäsi käynnistä on yli sataviisikymmentä '
      + 'vuotta, eikä niitä ole sammutettu vieläkään. Mä pidän tästä '
      + 'kaupungista, ja mä pidän tästä leivonnaisesta, jota täällä '
      + 'sanotaan wienerleiväksi vaikka se ei ole Wienistä.',
    /*
     * Huomio viittaa herokuvan kohteeseen (Nyhavn). Faktat ovat lehden
     * oman avauskuvan selitteestä (js/packs/kulttuuri-kategoriat.js,
     * kobenhavn/avauskuvat): kanava kaivettiin 1670-luvulla, jotta laivat
     * pääsisivät purkamaan lastinsa keskelle kaupunkia. Andersenin talot
     * ovat saman lehden Sadut-sivun nostosta.
     */
    teksti: 'Katso ensin tonne kanavan varteen. Nyhavn kaivettiin '
      + '1670-luvulla nimenomaan sitä varten, että laiva pääsisi '
      + 'purkamaan lastinsa keskelle kaupunkia — se ei ole maisema vaan '
      + 'työkalu. Ja niissä samoissa taloissa asui mies, joka kirjoitti '
      + 'satuja: kolmessa eri talossa, yhteensä toistakymmentä vuotta. '
      + 'Kirjeenkantajan näkökulmasta tämä on maailman kätevin katu, '
      + 'koska kaikki asuvat samalla puolella vettä.',
    kuva: {
      ampari: 'herokoe/hero-kobenhavn-nyhavn.jpg',
      selite: 'Nyhavn kaivettiin 1670-luvulla kanavaksi, jotta laivat '
        + 'pääsisivät purkamaan lastinsa keskelle kaupunkia.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: se on isoisän merkinnän oma aihe — mutta
       * merkintä kysyy "miksi", ja vastaus on tässä. Puisto sai luvan
       * juuri siksi, että huvittelu vie ajatukset muualta.
       *
       * FAKTAT: js/packs/kulttuuri-kategoriat.js, kobenhavn/sadut, nosto
       * "Huvipuisto avattiin vuonna 1843" (jo hyväksyttyä pelidataa) —
       * elokuu 1843, vanhan vallihaudan vieressä, Andersen kävi
       * ensimmäisenä kesänä, kiinalaistyyliset rakennukset, Rutschebanen
       * 1914 jarrumiehineen, Walt Disneyn käynti.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Tivoli Gardens" (johdanto ja osio "History"):
       *     puisto avattiin 15.8.1843 ja on maailman toiseksi vanhin yhä
       *     toimiva huvipuisto Klampenborgin Dyrehavsbakkenin jälkeen;
       *     perustaja Georg Carstensen (1812–1857) sai kuningas Christian
       *     VIII:lta viiden vuoden luvan sanomalla, että kun kansa
       *     huvittelee, se ei ajattele politiikkaa; alue oli noin 61 000
       *     neliömetriä linnoituksen glasista Vesterportin ulkopuolella
       *     vuosivuokraa vastaan, ja 1850-luvulle asti puisto oli
       *     kaupungin ULKOPUOLELLA; illalla puutarhaa valaisivat
       *     värilliset lamput ja ilotulitus heijastui puiston järvestä,
       *     joka on vanhan vallihaudan jäänne; säveltäjä Hans Christian
       *     Lumbye (1810–1874) johti puiston musiikkia 1843–1872 ja häntä
       *     sanottiin Pohjolan Straussiksi.
       *   - Tivolin oma historiatieto, luettuna Commonsin imageinfosta
       *     alla olevan kuvan kuvauksesta: sama avaamisvuosi ja sama
       *     sijainti vanhan vallihaudan vieressä.
       *
       * MITÄ EI KERROTA FAKTANA: että Carstensenin lause olisi
       * sanatarkasti hänen. Lähde esittää sen lainauksena hänen
       * perustelustaan, joten se kerrotaan perusteluna eikä sitaattina.
       */
      id: 'tivoli',
      nappi: 'Miksi kuningas antoi luvan huvipuistolle',
      otsikko: 'Tivolin portti',
      teksti: 'Isoisäsi käveli portista sisään ja teki päätelmän. Tässä on '
        + 'se, mitä hän ei voinut portilta nähdä. Tivoli avattiin 15. '
        + 'elokuuta 1843, ja luvan siihen antoi kuningas Christian VIII — '
        + 'viideksi vuodeksi kerrallaan. Perustaja Georg Carstensen sai '
        + 'luvan perustelemalla asian suoraan: kun kansa huvittelee, se ei '
        + 'ajattele politiikkaa. Puisto rakennettiin kaupungin '
        + 'linnoitusvallin ulkopuolelle, noin kuudenkymmenenyhden tuhannen '
        + 'neliömetrin alalle, ja vuokraa maksettiin vuosittain. '
        + '1850-luvulle asti Tivoli oli siis kaupungin ULKOPUOLELLA, ja '
        + 'sinne mentiin Vesterportin eli länsiportin kautta. Puiston järvi '
        + 'ei ole koriste vaan jäänne: se on vanhaa vallihautaa, ja '
        + 'ilotulitukset heijastuivat siitä. Pimeän tultua puutarha '
        + 'valaistiin värillisillä lampuilla — juuri ne valot, jotka '
        + 'isoisäsi näki. Musiikista vastasi kolmenkymmenen vuoden ajan '
        + 'Hans Christian Lumbye, jota sanottiin Pohjolan Straussiksi. '
        + 'Puisto on maailman toiseksi vanhin yhä toimiva huvipuisto; '
        + 'vanhin on Dyrehavsbakken, joka on samassa maassa muutaman '
        + 'kilometrin päässä.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto kobenhavn/sadut,
       * js/packs/kulttuuri-kategoriat.js). Commons 29.8.2026: CC BY-SA
       * 4.0, Leif Jørgensen. SILMÄTARKISTUS tehty: puiston järvi ja
       * valot illalla, ei tunnistettavia kasvoja.
       */
      kuva: {
        tiedosto: 'Tivoli at night - Tivoli Søen.JPG',
        selite: 'Tivoli avattiin elokuussa 1843 kaupungin vanhan '
          + 'vallihaudan viereen.',
        lahde: 'Leif Jørgensen, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Millä perusteella Tivolin perustaja sai kuninkaalta luvan '
          + 'huvipuistolle?',
        vaihtoehdot: [
          'Huvitteleva kansa ei ajattele politiikkaa',
          'Puisto maksaisi linnoituksen korjaukset',
          'Kuningas halusi paikan, jossa laulaa kuorossa',
        ],
        oikea: 0,
        fakta: 'Lupa annettiin viideksi vuodeksi kerrallaan, ja puisto '
          + 'rakennettiin kaupungin vallien ulkopuolelle. Puiston järvi on '
          + 'vanhan vallihaudan jäänne.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: aarremerkintä kertoo esineestä, joka on olemassa
       * enää muistina. Tämä on saman maan vastakohta — esine, joka on
       * pysynyt tuhat vuotta paikallaan ja jonka ainoa tehtävä on olla
       * muisti.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, DNK/historia, nosto "Kivi,
       * jossa maan nimi lukee ensimmäisen kerran" (jo hyväksyttyä
       * pelidataa) — Harald Sinihammas noin 965, Tanska ja Norja,
       * kristinusko, maan syntytodistus, Bluetooth.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Jelling stones" (johdanto ja osiot
       *     "Significance", "Recent history"): kiviä on kaksi, vanhemman
       *     pystytti kuningas Gorm Vanha vaimonsa Thyran muistoksi ja
       *     suuremman hänen poikansa Harald Sinihammas vanhempiensa
       *     muistoksi; kivet, hautakummut ja pieni kirkko otettiin Unescon
       *     maailmanperintöluetteloon 1994; ison kiven nimitys "Tanskan
       *     kastetodistus" on taidehistorioitsija Rudolf Broby-Johansenin
       *     1930-luvulla keksimä; Bluetooth-nimi syntyi 1997 kuvasta,
       *     joka esitti tätä kiveä; kivet olivat tuhat vuotta ulkona,
       *     alkoivat halkeilla, ja niiden ympärille rakennettiin
       *     lasikotelot, jotka pitävät lämpötilan ja kosteuden vakiona.
       *   - Kansallismuseon (Nationalmuseet) esinetieto, luettuna
       *     Commonsin imageinfosta alla olevan kuvan kuvauksesta: samat
       *     kaksi kiveä samassa paikassa.
       */
      id: 'jelling',
      nappi: 'Kivi, joka on maan kastetodistus',
      otsikko: 'Jellingin kivet',
      teksti: 'Jellingin kylässä seisoo kaksi riimukiveä. Vanhemman '
        + 'pystytti kuningas Gorm Vanha vaimonsa Thyran muistoksi, ja '
        + 'suuremman hänen poikansa Harald Sinihammas noin vuonna 965 — '
        + 'omien vanhempiensa muistoksi, ja samalla kertoakseen, että hän '
        + 'voitti koko Tanskan ja Norjan ja teki tanskalaisista '
        + 'kristittyjä. Sana Tanska esiintyy siinä ensimmäisen kerran maan '
        + 'omalla kielellä, ja siksi kiveä sanotaan maan syntytodistukseksi '
        + '— tai kastetodistukseksi, kuten taidehistorioitsija Rudolf '
        + 'Broby-Johansen sen 1930-luvulla nimesi. Kivet, hautakummut ja '
        + 'niiden vieressä seisova pieni kirkko otettiin Unescon '
        + 'maailmanperintöluetteloon vuonna 1994. Tuhat vuotta ulkona '
        + 'näkyy: kivet alkoivat halkeilla, ja nykyään ne seisovat '
        + 'lasikoteloissa, jotka pitävät lämpötilan ja kosteuden vakiona. '
        + 'Ja sitten se outo jälkimaine. Vuonna 1997 kuva juuri tästä '
        + 'kivestä antoi nimen langattomalle yhteydelle: Bluetooth on '
        + 'Harald Sinihammas, koska hän yhdisti heimoja kuten yhteys '
        + 'yhdistää laitteita.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto DNK/historia).
       * Commons 29.8.2026: CC BY-SA 3.0, Ajepbah. SILMÄTARKISTUS tehty:
       * kaksi riimukiveä nurmella, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Jelling rune stones.1.ajb.jpg',
        selite: 'Vanhemman Jellingin kiven pystytti kuningas Gorm Vanha '
          + 'vaimonsa Thyran muistoksi, ja suuremman hänen poikansa Harald '
          + 'Sinihammas vanhempiensa muistoksi.',
        lahde: 'Ajepbah, Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Miksi Jellingin isoa riimukiveä sanotaan Tanskan '
          + 'syntytodistukseksi?',
        vaihtoehdot: [
          'Siinä lukee maan nimi ensimmäisen kerran maan omalla kielellä',
          'Se on maan vanhin kirjoitettu laki',
          'Siihen on hakattu maan ensimmäinen kartta',
        ],
        oikea: 0,
        fakta: 'Kivet otettiin Unescon maailmanperintöluetteloon vuonna '
          + '1994, ja ne seisovat nykyään lasikoteloissa. Langaton '
          + 'Bluetooth-yhteys on nimetty kiven pystyttäneen kuninkaan '
          + 'mukaan.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän ydin on, että jotain kestää. Tämä on
       * saman ajatuksen kevyt pää — esine, joka on pysynyt mitoiltaan
       * samana niin kauan, että vuoden 1958 kappale sopii tänään ostettuun.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, DNK/keksinnot, nosto "Palikka,
       * joka sopii yhä vanhoihin" (jo hyväksyttyä pelidataa) — Ole Kirk
       * Christiansen, Billund, 1930-luvun pulavuodet, nimi leg godt,
       * muovipalikka patentoitiin 1958, sisäputket, mitat samat, kuudesta
       * kahdeksan nystyn palikasta yli 900 miljoonaa yhdistelmää.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Lego" (johdanto ja osio yhtiön historiasta):
       *     nykyisen palikan patentti jätettiin 28. tammikuuta 1958;
       *     palikat valmistetaan ABS-muovista; yhtiön nimi tulee tanskan
       *     sanoista leg godt.
       *   - Commonsin imageinfo alla olevan kuvan kuvauksesta: palikat
       *     valmistetaan ABS-muovista Billundissa ja ne on suunniteltu
       *     liitettäviksi toisiinsa lukemattomilla tavoilla.
       */
      id: 'lego',
      nappi: 'Palikka, joka ei ole muuttunut millimetriäkään',
      otsikko: 'Kaksi nystyä kertaa neljä',
      teksti: 'Puuseppä Ole Kirk Christiansen alkoi 1930-luvun pulavuosina '
        + 'tehdä puisia leluja Billundin kylässä. Nimeksi tuli Lego '
        + 'kahdesta tanskan sanasta: leg godt, leiki hyvin. Nykyinen '
        + 'muovipalikka patentoitiin vuonna 1958, ja sen salaisuus ei ole '
        + 'nystyissä vaan siinä, mitä palikan sisällä on: putket, jotka '
        + 'puristavat päällekkäin painetut osat kiinni juuri sopivalla '
        + 'voimalla — tarpeeksi lujasti pysyäkseen, tarpeeksi löysästi '
        + 'irrotakseen. Mitat ovat pysyneet siitä asti samoina, joten '
        + 'vuonna 1958 tehty palikka sopii tänään ostettuun. Palikat '
        + 'valmistetaan ABS-muovista, ja tarkkuus on niin suuri, että '
        + 'vain muutama miljoonasta hylätään. Ja tässä on se luku, joka '
        + 'kannattaa lukea kahdesti: kuudesta samanlaisesta kahdeksan '
        + 'nystyn palikasta saa yli yhdeksänsataa miljoonaa erilaista '
        + 'yhdistelmää.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto DNK/keksinnot).
       * Commons 29.8.2026: CC0, Ziongarage. SILMÄTARKISTUS tehty:
       * yksittäinen palikka valkoisella pohjalla, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Lego 2x4 brick.jpg',
        selite: 'Lego-palikat valmistetaan ABS-muovista Billundissa, ja ne '
          + 'on suunniteltu liitettäviksi toisiinsa lukemattomilla '
          + 'tavoilla.',
        lahde: 'Ziongarage, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Mikä palikan sisällä pitää osat kiinni toisissaan?',
        vaihtoehdot: [
          'Putket, jotka puristavat nystyjä juuri sopivalla voimalla',
          'Ohut liimakerros nystyjen päällä',
          'Pienet magneetit palikan kulmissa',
        ],
        oikea: 0,
        fakta: 'Mitat ovat pysyneet samoina vuoden 1958 patentista asti, '
          + 'joten silloin tehty palikka sopii tänään ostettuun. Kuudesta '
          + 'samanlaisesta kahdeksan nystyn palikasta saa yli 900 miljoonaa '
          + 'erilaista yhdistelmää.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa kohtaamisen laattakysymyksen (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT, kobenhavn): mikä saduista on Andersenin. Visasääntö
   * täyttyy — vastaus on tekstissä, mutta kysymyksen sanamuoto ei toistu
   * siinä sellaisenaan.
   *
   * FAKTAT: js/packs/kulttuuri-kategoriat.js, kobenhavn/sadut, nostot
   * "Poika tuli kaupunkiin yksin" ja "Satamakatu, jonka varrella satuja
   * kirjoitettiin" (jo hyväksyttyä pelidataa) — syntymä Odensessa 1805,
   * suutarin perhe, neljätoistavuotiaana yksin Kööpenhaminaan, ääni
   * murtui, Jonas Collin järjesti koulupaikan, ensimmäinen satuvihko
   * 1835, käännökset yli sadalle kielelle, Nyhavnin talot ja numero 20.
   *
   * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
   * riippumattomasta lähteestä):
   *   - en-Wikipedia "Hans Christian Andersen" (johdanto ja osiot
   *     nuoruudesta ja saduista): syntymäpäivä 2.4.1805, kuolinpäivä
   *     4.8.1875; hän lähti Kööpenhaminaan syyskuussa 1819; satuja
   *     ilmestyi vihkoina 1835 alkaen, ja tunnetuimpia ovat muun muassa
   *     Pieni merenneito, Ruma ankanpoikanen, Keisarin uudet vaatteet ja
   *     Lumikuningatar.
   *   - js/packs/maa-kategoriat.js, DNK — pelin oma, jo hyväksytty
   *     kuvateksti: Andersen kirjoitti yhdeksään niteeseen 156 satua,
   *     jotka on käännetty yli 125 kielelle.
   *
   * IKÄSOPIVUUS (13+): köyhyys ja epäonnistumiset kerrotaan tosiasioina
   * eikä sääliteltyinä, koska ne ovat se syy, jonka takia sadut ovat
   * sellaisia kuin ovat.
   */
  oppitunti: {
    otsikko: 'Poika, joka epäonnistui kolmessa ammatissa',
    teksti: 'Kaupungissa, jossa illat vietetään valojen alla, asui mies, '
      + 'joka kirjoitti pimeästä. Hans Christian Andersen syntyi Odensessa '
      + 'suutarin perheeseen vuonna 1805 ja lähti neljätoistavuotiaana '
      + 'yksin Kööpenhaminaan aikoen kuninkaalliseen teatteriin laulajaksi. '
      + 'Ääni murtui, eikä tanssijasta tai näyttelijästäkään tullut '
      + 'mitään — kolme ammattia, kolme epäonnistumista, ennen kuin hän '
      + 'oli täysi-ikäinen. Virkamies Jonas Collin järjesti pojalle '
      + 'koulupaikan, ja koulussa Andersen istui monta vuotta itseään '
      + 'paljon nuorempien kanssa. Ensimmäinen ohut satuvihko ilmestyi '
      + 'vuonna 1835, ja niitä tuli lopulta yhdeksän nidettä ja '
      + 'sataviisikymmentäkuusi satua. Niissä on merenneito, joka '
      + 'ei saa sitä mitä haluaa; ankanpoikanen, jota pidetään rumana; ja '
      + 'keisari, jonka uudet vaatteet ovat olemattomat, ja jonka koko '
      + 'hovi kehuu niitä. Sadut on käännetty yli sadalle kielelle. '
      + 'Kööpenhaminassa Andersen asui Nyhavnin varrella kolmessa eri '
      + 'talossa yhteensä toistakymmentä vuotta, ja numerossa 20 hän '
      + 'kirjoitti ensimmäiset satunsa. Isoisäsi käynnin aikaan hän oli yhä '
      + 'elossa ja kaupungin tunnetuin ihminen; hän kuoli kaksi vuotta '
      + 'myöhemmin.',
    /*
     * Kuva on pelin omasta aineistosta (sama tiedosto kobenhavn/sadut).
     * Commons 29.8.2026: public domain, Thora Hallager, kuvattu 1869 —
     * neljä vuotta ennen isoisän käyntiä. SILMÄTARKISTUS tehty:
     * aikalaisvalokuva Andersenista, historiallinen henkilö.
     */
    kuva: {
      tiedosto: 'Hans Christian Andersen by Thora Hallager 1869.jpg',
      selite: 'Hans Christian Andersen vuonna 1869 otetussa valokuvassa, '
        + 'neljä vuotta ennen isoisän käyntiä. Hän syntyi Odensessa '
        + 'suutarin perheeseen vuonna 1805.',
      lahde: 'Thora Hallager, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   * Hahmo, kohtaamiskuva ja kysymys ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id 'kobenhavn'):
   * sadunkertoja Karen kertoo satuja Nyhavnin laiturilla samalta
   * puiselta arkulta, jolta hänen isoisänsä ne kertoi. Tämä kortti ei
   * kertaa Karenin repliikkiä eikä paljasta vastausta.
   *
   * KÖÖPENHAMINAN VANHA KOHTAAMINEN JÄÄ ENNALLEEN (js/packs/
   * kohtaamiset.js): sama Karen kahdella pinnalla, ei kahta lupausta
   * samasta ovesta.
   */
  kohtaaminen: {
    hahmo: 'Sadunkertoja Karen',
    nappi: 'Tapaa sadunkertoja',
    teksti: 'Karen kertoo satuja laiturilla samalta puiselta arkulta, '
      + 'jolta hänen isoisänsä ne kertoi. Hän ei lue kirjasta eikä katso '
      + 'muistiinpanoja: sadut ovat menneet suvussa suusta suuhun niin '
      + 'kauan, että hän tietää missä kohtaa kuulijat vetävät henkeä. '
      + 'Arkun hän avaa harvoin. Ennen kuin hän tekee sen, hän haluaa '
      + 'tietää, tunnistaako vieras sen, mikä täällä kirjoitettiin.',
    vihjeOsio: 'sadut',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: NYHAVNIN LAITURI. Kaaren teksti asettaa Karenin
   * juuri sinne, ja pelin oma Kööpenhamina-aineisto osoittaa saman
   * paikan (js/packs/kulttuuri-kategoriat.js, kobenhavn/sadut,
   * "Satamakatu, jonka varrella satuja kirjoitettiin").
   *
   * 55,67990556 N / 12,59028889 E — da-Wikipedia "Nyhavn",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((12,59028889 − (−175)) mod 360) × (12000/360)
   *                     = 187,59028889 × 33,3333… = 6253,0
   *                   y = (millerY(76) − millerY(55,67990556)) × 12000/2π
   *                     = 1134,1
   *   europe          x = (12,59028889 + 11) × 19,2 = 452,9
   *                   y = (72 − 55,67990556) × 26,3 = 429,2
   *
   * TARKISTUS LAATTAA VASTEN: Kööpenhaminan laatta on Euroopan laudalla
   * 452 / 429 ja maailmankartalla 6251,4 / 1133,7, eli piste osuu
   * käytännössä laatan päälle — niin pitääkin, Nyhavn on keskustassa.
   * Piirtopuoli siirtää pisteen koilliseen (js/fokuspiste.js
   * PISTE_ERO_MIN), jottei se peitä laattaa.
   */
  kohtaamispiste: {
    nimi: 'Nyhavnin laituri',
    laudat: {
      maailmankartta: { x: 6253.0, y: 1134.1 },
      europe: { x: 452.9, y: 429.2 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Kööpenhaminan sivupino
   * (js/lehti.js rakennaSivut): 0 = etusivu, 1 = kaupunkisivu
   * "Kööpenhamina", 2 = Sadut, 3 = Menovinkit.
   *
   * Sivun 1 kysymys on Kööpenhaminan kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: NYHAVN_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: SMORREBROD_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Tanska) ----------
   *
   * UUSI POOLI, EI SIIRTO. Tanska ei ole js/fokusnosto.js:n NOSTO_MAAT
   * -taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia.
   *
   * MIKSI TRELLEBORG: aarremerkintä kertoo esineestä, jonka mitat on
   * tallella vain jäljennöksinä. Tämä on saman maan vastakohta — rakennus,
   * jonka mitat ovat maassa niin tarkkoina, että niistä voi lukea, kuka
   * sen suunnitteli. Kohde on myös oikea paikka kartalla (Slagelse).
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki).
       *
       * FAKTAT: js/packs/maa-kategoriat.js, DNK/historia, nosto
       * "Linnoitus, joka on täydellinen ympyrä" (jo hyväksyttyä
       * pelidataa) — rakennettu noin 980, tarkka ympyrä, kaksi
       * risteävää tietä, neljä taloryhmää joissa kussakin neljä pitkää
       * taloa, useita samanmittaisia linnoituksia, Unesco 2023.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Trelleborg (Slagelse)" (johdanto ja osiot
       *     rakenteesta ja ajoituksesta): linnoitus on Sjællandin
       *     Slagelsen lähellä, se ajoitetaan puun vuosirenkaiden avulla
       *     noin vuoteen 980, ja se yhdistetään kuningas Harald
       *     Sinihampaaseen; sisäpiha on ympyrä, jonka halkaisija on noin
       *     136 metriä; vallin läpi kulkee neljä porttia neljään
       *     ilmansuuntaan ja kaksi tietä risteää keskellä; sisällä oli
       *     neljä neliötä, joissa kussakin neljä pitkää taloa eli
       *     kuusitoista taloa yhteensä.
       *   - Commonsin imageinfo alla olevan kuvan kuvauksesta, joka
       *     toistaa saman: Trelleborg on yksi seitsemästä tunnetusta
       *     viikinkiaikaisesta rengaslinnoituksesta ja sen rakennutti
       *     Harald Sinihammas vuonna 980.
       */
      id: 'trelleborg',
      nimio: 'Trelleborg',
      otsikko: 'Tuhat vuotta vanha linnoitus on niin tarkka ympyrä, että '
        + 'sen mitat kertovat suunnittelijan',
      lunastus: [
        'Sjællandin Slagelsen lähellä on maastossa rengas, joka näyttää '
          + 'ilmasta katsottuna piirretyltä. Trelleborgin linnoitus '
          + 'rakennettiin noin vuonna 980, ja sen valli kiertää sisäpihan, '
          + 'jonka halkaisija on noin satakolmekymmentäkuusi metriä. '
          + 'Vallin läpi kulkee neljä porttia neljään ilmansuuntaan, ja '
          + 'kaksi tietä risteää keskellä kuin kellotaulun viisarit. '
          + 'Sisällä oli neljä neliötä, joissa kussakin neljä pitkää '
          + 'taloa — kuusitoista taloa, kaikki samanmittaisia.',
        'Tarkkuus on se, mikä tekee paikasta kiinnostavan. Samalla mitalla '
          + 'rakennettiin useita linnoituksia eri puolille maata, ja ne '
          + 'ovat niin samanlaisia, että ne on selvästi suunniteltu '
          + 'yhdessä paikassa ja mitattu maastoon tarkasti. Se tarkoittaa, '
          + 'että joku käski, joku mittasi ja joku maksoi — ja että '
          + 'valtakunta oli olemassa jo ennen kuin siitä kirjoitettiin. '
          + 'Rakennusvuosi saatiin puun vuosirenkaista, ja se osuu saman '
          + 'kuninkaan aikaan, joka pystytti Jellingin ison kiven. Unesco '
          + 'otti linnoitukset maailmanperintöluetteloon vuonna 2023.',
      ],
      lahde: 'en-Wikipedia "Trelleborg (Slagelse)", johdanto sekä osiot '
        + 'rakenteesta ja ajoituksesta; tarkistettu 29.8.2026.',
      /*
       * PÄÄKUVAKSI LOISTOAIKA (29.8.2026, sama malli kuin Sofian
       * areenalla ja v1307/v1312:n nostoilla): repon oma generoitu
       * havainnekuva, jolla ei ole Commons-nimeä eikä varareittiä,
       * joten kenttä on `osoite` eikä `tiedosto` (js/fokusnosto.js
       * asetaNostonKuva).
       *
       * Kuva näyttää saman rengasvallin asuttuna: neljä pihaa,
       * kuusitoista pitkää taloa ja mittaan tehty portti — se mistä
       * nykyisessä ilmakuvassa on jäljellä vain nurmivalli.
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-trelleborg-loistoaika.webp',
        selite: 'Trelleborg asuttuna: neljä pihaa, kuusitoista pitkää taloa '
          + 'täsmälleen samassa mitassa ja portti jokaiseen ilmansuuntaan.',
        lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa',
      },
      /*
       * KAKKOSKUVA tekstin alle on entinen ainoa kuva — pelin omasta
       * aineistosta (sama tiedosto DNK/historia). Tiedosto, selite ja
       * lähde ennallaan. Commons 29.8.2026: CC BY-SA 3.0, Thue C.
       * Leibrandt. SILMÄTARKISTUS tehty: ilmakuva rengasvallista, ei
       * ihmisiä.
       */
      valokuva: {
        tiedosto: 'Trelleborg airphoto.JPG',
        selite: 'Trelleborg on yksi seitsemästä tunnetusta '
          + 'viikinkiaikaisesta rengaslinnoituksesta, ja sen rakennutti '
          + 'kuningas Harald Sinihammas vuonna 980.',
        lahde: 'Thue C. Leibrandt, Wikimedia Commons (CC BY-SA 3.0)',
      },
      kysymykset: [
        'Miten linnoituksen rakennusvuosi saatiin selville?',
        'Miksi samanlaisia linnoituksia rakennettiin useita?',
        'Kuka oli Harald Sinihammas?',
      ],
      /*
       * 55,39416667 N / 11,26527778 E — en-Wikipedia "Trelleborg
       * (Slagelse)", prop=coordinates (haettu 29.8.2026). Sama kaava kuin
       * kohtaamispisteellä yllä.
       */
      paikka: {
        nimi: 'Trelleborg',
        laudat: {
          maailmankartta: { x: 6208.8, y: 1147.5 },
          europe: { x: 427.5, y: 436.7 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Gallehusin
   * kultasarvet, jotka varastettiin ja sulatettiin 1802. Merkintä
   * aukeaa, kun aarre löytyy (js/fokusvirta.js fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Kultaseppä näytti minulle sarvien jäljennökset ja sanoi, että '
      + 'varas sulatti alkuperäiset rahaksi 1802. Merkitsin luetteloon: tämä '
      + 'aarre on olemassa enää muistina — ja siksi sitä ei voi enää '
      + 'varastaa.',
  },
};
