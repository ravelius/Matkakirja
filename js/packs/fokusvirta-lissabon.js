/*
 * LISSABONIN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-tukholma.js:lle ja
 * -helsinki.js:lle: samat kentät, sama järjestys, sama moottori
 * (js/fokusvirta.js). AALTO 4A.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026): matkakirjan paikkarivi ja
 * teksti, Livian kuplateksti ja aarremerkinnän teksti ovat SANATARKASTI
 * hänen kirjoittamiaan — niitä ei ole lyhennetty, sanajärjestystä ei ole
 * muutettu eikä yhtään sanaa vaihdettu. Luenta on sama teksti
 * tunnetagein.
 *
 * ISO AARRE: kuninkaan kirjaston nide (aarremerkintä). Sama pari on
 * kirjattu maan paikallisaarteisiin (js/packs/paikallisaarteet.js, PRT:
 * pieni "Rasia pastel de nata -leivoksia", iso "Kuninkaan kirjaston
 * nide"), jotta löytökortissa lukee sama nimi kuin merkinnässä.
 *
 * FAKTAPOHJA. Lissabonille EI ollut valmista faktapohjaa, joten täyt,
 * oppitunti, lehtitehtävät ja täkynostot on rakennettu kahdesta
 * lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Portugalin maalehden nostot
 *      (js/packs/maa-kategoriat.js, PRT/kasityo, PRT/luonto,
 *      PRT/musiikki, PRT/urheilu) ja Lissabonin kaupunkilehden omat
 *      nostot (js/packs/kulttuuri-kategoriat.js, lissabon). Nämä on jo
 *      kertaalleen tarkistettu ja hyväksytty peliin — myös niiden
 *      KUVAT, jotka tämä paketti lainaa sellaisinaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei ole,
 *      on haettu Wikipedian rajapinnasta 29.8.2026 ja katsottu KAHDESTA
 *      riippumattomasta lähteestä. Ne on nimetty kunkin kohdan omassa
 *      kommentissa. Mitään ei ole päätelty eikä pyöristetty.
 *
 * KOLME UUTTA COMMONS-KUVAA. Kolme kuvaa ei ole pelidatassa ennestään
 * (oppitunnin vuoden 1755 kuparipiirros, kirjastotäyn Rio-valokuva ja
 * Coimbran täkynoston sisäkuva). Kaikkien lisenssi, tekijä, koko ja
 * kuvaus on haettu Commonsin rajapinnasta 29.8.2026 ja kuvat on katsottu
 * silmin; ne on merkitty kunkin kohdan kommenttiin sanalla UUSI KUVA,
 * koska ne tarvitsevat vielä R2-peilauksen.
 *
 * PÄÄLLEKKÄISYYS ON TIETOINEN JA RAJATTU. Kaikki kolme täkyä ovat
 * PORTUGALIN maalehden puolelta (kuninkaan kirjasto on kokonaan uutta
 * aineistoa, katukivet PRT/kasityo, Severa PRT/musiikki). Lehden
 * NIMETYT tehtävät sen sijaan ovat kaupunkilehden omaa aineistoa, kuten
 * kuuluukin: pelaaja lukee vastauksen samasta lehdestä.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026, aallon 3 linjaus) ─────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, lissabon/avauskuvat).
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── KOHDENOSTOJA EI OLE ─────────────────────────────────────────────
 *
 * `kohteet`-kenttä jää pois, koska Portugalilla ei ole kohdenostojen
 * poolia (js/packs/fokuskohteet-prt.js puuttuu) eikä tämä paketti saa
 * luoda sitä — työn rajaus on yksi tiedosto. Sama ratkaisu kuin
 * aallossa 3 (Tukholma, Helsinki, Tallinna, København).
 *
 * ── EI VIELÄ KYTKETTY ──────────────────────────────────────────────
 *
 * Tämä tiedosto EI ole vielä käytössä: js/packs/fokusvirrat.js ei tuo
 * sitä eikä sen taulussa ole riviä `lissabon`. Kytkentä on kaksi riviä
 * (import + taulun rivi), ja se tehdään erikseen — tämän työn rajaus oli
 * yksi tiedosto, eikä rinnakkain julkaisevien sessioiden yhteiseen
 * rekisteriin kosketa ilman koordinointia.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luenta on generoitu 29.8.2026 (tools/generoi-luennat.mjs, lähteenä
 * tämän lohkon oma `matkakirja.luenta`) ja `matkakirja.aanite`
 * osoittaa siihen: assets/audio/puhe-fokus-matkakirja-lissabon.mp3.
 * Teksti ja luenta ovat sanasta sanaan samat, joten tekstin muutos
 * vaatii uuden generoinnin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Leivoskysymys on Lissabonin lehden sivun 2
 * ("Ruoka") oman noston "Pastel de nata on luostarin resepti" tekstiä ja
 * sarvikuonokysymys sivun 1 ("Lissabon") oman noston "Tornin kulmassa on
 * sarvikuono" tekstiä (js/packs/kulttuuri-kategoriat.js). Uusia
 * faktaväitteitä ei ole kummassakaan.
 *
 * SIVUN OMA TEHTÄVÄ VÄISTYY. Ruoka-osiolla on oma `tehtava` (Antoniuksen
 * päivä); js/fokustehtavat.js korvaa sen nimetyllä tehtävällä, jotta
 * sivulla on Raamatun vaatima yksi minitehtävä eikä kahta. Antoniuksen
 * kysymys ei siis katoa aineistosta, se vain ei piirry tälle sivulle
 * kevyessä kulussa.
 *
 * MIKSI EI AZULEJOKYSYMYSTÄ KUMPAANKAAN: kaupungin kulttuurivisa
 * (js/packs/europe-kulttuuri.js, lissabon) kysyy jo azulejon nimen
 * alkuperää, ja js/fokustehtavat.js pukee sen sivun 1 AARTEEN AVAUS
 * -laatikoksi ilman omaa riviään täällä. Kolmatta laattakysymystä ei
 * tarvita.
 */
const PASTEL_VISA = {
  kysymys: 'Miten Jerónimosin luostarin munkkien leivosresepti päätyi '
    + 'kauppapuodille?',
  vaihtoehdot: [
    'Luostarit suljettiin, ja resepti siirtyi naapuriin',
    'Munkit myivät sen huutokaupassa kaupungin torilla',
    'Kuningas määräsi reseptin annettavaksi kaikille leipureille',
  ],
  oikea: 0,
  fakta: 'Pastéis de Belém on myynyt leivosta vuodesta 1837, ja kahvila '
    + 'kertoo paistavansa niitä yli 20 000 päivässä. Vain siellä tehdyt '
    + 'saa nimittää pastéis de belém — muualla ne ovat pastel de nata.',
};

/*
 * SARVIKUONO on tämän laudan ainoa eläintäky, ja se on tarkoituksella
 * lehden puolella: kaupunkilehden nosto kertoo tarinan, ja tämä kysymys
 * palkitsee sen lukeneen. Väärä vaihtoehto ei saa olla puolitosi, joten
 * Dürerin puupiirros EI ole vaihtoehtona — kuvanveistäjän ja Dürerin
 * työt syntyivät samoihin aikoihin, ja tietävä pelaaja voisi valita sen
 * perustellusti.
 */
const SARVIKUONO_VISA = {
  kysymys: 'Belémin tornin kulmassa on kiveen hakattu sarvikuono. Mistä '
    + 'kuvanveistäjä sai mallinsa?',
  vaihtoehdot: [
    'Intiasta tuodusta elävästä eläimestä',
    'Kuninkaan norsunluukokoelman veistoksesta',
    'Vanhan merikartan reunakoristeesta',
  ],
  oikea: 0,
  fakta: 'Sarvikuono saapui Lissaboniin 20. toukokuuta 1515. Manuel I '
    + 'lähetti sen lahjaksi paaville, mutta laiva haaksirikkoutui Italian '
    + 'rannikolla. Veistosta pidetään ensimmäisenä sarvikuonoveistoksena '
    + 'Länsi-Euroopan taiteessa.',
};

export const FOKUSVIRTA_LISSABON = {
  kaupunki: 'lissabon',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * PAIKKARIVI ON KAANONIA SELLAISENAAN. Aallon 3 kaupungeissa
     * paikkariviin on kirjoitettu jatkoksi sään tai tunnelman lause,
     * mutta siellä rivi oli kirjoittajan omaa; tässä aallossa Fable on
     * antanut paikkarivin osana kaanonia, joten siihen ei lisätä mitään.
     */
    paikkarivi: 'Lissabon, lokakuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Tämä kaupunki tuntee maan vihan: sata vuotta sitten se kaatui '
      + 'järistykseen, paloi ja hukkui samana aamuna, ja rakennettiin '
      + 'uusiksi suoriin kortteleihin kuin ruutupaperille. Belémin torni '
      + 'seisoo joessa kuin norsunluinen shakkinappula. Räätälin ikkunassa '
      + 'näin kaakeleita, sinivalkoisia, joilla täällä verhotaan kokonaiset '
      + 'talonseinät — köyhän miehen freskot, sanoi isäntäni, mutta minusta '
      + 'ne ovat kauniimpia kuin moni palatsi.',
    /*
     * LUENTA = RUUTUTEKSTI SANASTA SANAAN, vain tunnetagit lisätty
     * (docs/moduulit/tarinakaari.md, luku 7). Neljä tagia, alku ja loppu
     * eri sävyssä.
     */
    luenta: '[curious] Tämä kaupunki tuntee maan vihan: sata vuotta sitten '
      + 'se kaatui järistykseen, paloi ja hukkui samana aamuna, ja '
      + 'rakennettiin uusiksi suoriin kortteleihin kuin ruutupaperille. '
      + '[softly] Belémin torni seisoo joessa kuin norsunluinen '
      + 'shakkinappula. [curious] Räätälin ikkunassa näin kaakeleita, '
      + 'sinivalkoisia, joilla täällä verhotaan kokonaiset talonseinät — '
      + 'köyhän miehen freskot, sanoi isäntäni, [warmly] mutta minusta ne '
      + 'ovat kauniimpia kuin moni palatsi.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-lissabon.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * KAANONTEKSTI ON JAETTU KAHTEEN KENTTÄÄN, EI MUUTETTU.
     *
     * Livian puheenvuoro on kortilla kahdessa kentässä: `maadoitus`
     * vastaa isoisän merkintään ja piirtyy kuplan ensimmäiseksi
     * kappaleeksi, `teksti` jatkaa siitä ja kääntää katseen herokuvaan
     * (js/fokusvirta.js piirraPollo). Fablen kaanonteksti tekee
     * molemmat yhtenä puheenvuorona, ja tests/fokusvirta.test.mjs
     * vaatii jokaiselta fokuskaupungilta oman maadoituksen, joten
     * teksti on integroinnissa jaettu VIRKKEEN RAJAA pitkin
     * (Edinburghin kaava): ensimmäinen virke on merkinnän kaakelit,
     * loput järistys ja "Torni odottaa joessa" eli herokuvan osoitus.
     * Yhtäkään sanaa, välimerkkiä tai järjestystä ei ole muutettu —
     * peräkkäin luettuna teksti on sanasta sanaan kaanonteksti.
     */
    maadoitus: 'Lissabonissa ne kaakelit ovat edelleen joka seinällä, ja '
      + 'niitä varastetaan nykyään seiniltä niin että osa kaduista on '
      + 'aidattu..',
    teksti: 'Se järistys, josta isoisäsi kirjoitti, muutti muuten koko '
      + 'Euroopan ajattelua — sen jälkeen alettiin ensimmäistä kertaa '
      + 'tutkia, miksi maa järisee, eikä vain ketä sillä rangaistiin. '
      + 'Torni odottaa joessa.',
    /*
     * HEROKUVA on kaupunkilehden avauskarusellin generoitu hero
     * (js/packs/kulttuuri-kategoriat.js, lissabon/avauskuvat) ja selite
     * on sen oma, jo hyväksytty teksti. Juuri Belémin torni, koska
     * kuplan viimeinen lause osoittaa siihen.
     */
    kuva: {
      ampari: 'herokoe/hero-lissabon-aamu.png',
      selite: 'Belémin torni valmistui 1519 vartioimaan Tejon suuta: '
        + 'nelikerroksinen torni nousee 30 metriin, ja sen bastionin '
        + 'ampuma-aukoista mahtui tulittamaan seitsemäntoista tykkiä.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: aarremerkintä kertoo kirjastosta, joka pakeni
       * laivalla eikä palannut. Pelin oma paikallisaarre-fakta
       * (js/packs/paikallisaarteet.js, PRT) taas kertoo kirjastosta, joka
       * paloi vuonna 1755. Molemmat ovat totta, ja tämä täky on se silta:
       * kirjastoja oli kaksi, ja jälkimmäinen lähti merille.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - pt-Wikipedia "Biblioteca Nacional do Brasil", osiot
       *     "Primórdios" ja "Império do Brasil": 1.11.1755 järistys ja sen
       *     tulipalo tuhosivat Real Bibliotecan rakennuksen; José I ja
       *     markiisi de Pombal keräsivät säilyneen ja järjestivät Ajudan
       *     palatsiin uuden kirjaston, jossa oli vuonna 1807 noin
       *     kuusikymmentätuhatta kappaletta — kirjoja, käsikirjoituksia,
       *     inkunaabeleita, piirroksia, karttoja, rahoja ja mitaleita;
       *     juuri tämä kokoelma vietiin Brasiliaan kuninkaallisen perheen
       *     lähdön jälkeen; kokoelma tuotiin kolmessa erässä, ensimmäinen
       *     1810 ja kaksi seuraavaa 1811; se sijoitettiin aluksi Carmon
       *     kolmannen sääntökunnan sairaalan yläkerran saleihin
       *     (27.7.1810 annettu määräys); virallinen perustamispäivä on
       *     29.10.1810; kirjasto jäi Brasiliaan, kun João VI palasi
       *     Lissaboniin 1821, ja siitä tuli itsenäistymisen jälkeen
       *     Brasilian omaisuutta 29.8.1825 solmitun sopimuksen
       *     lisäsopimuksella; kuninkaalliselle perheelle maksettiin
       *     Brasiliaan jääneestä omaisuudesta kaksi miljoonaa puntaa,
       *     josta kahdeksansataa conto de réisiä kohdistettiin
       *     kuninkaallisen kirjaston maksuksi.
       *   - en-Wikipedia "National Library of Brazil", osiot "History",
       *     "Expansion" ja "Transfer of sovereignty": samat vuosiluvut,
       *     sama 60 000 kirjan luku, sama kolmen erän kuljetus, sama
       *     29.10.1810 ja sama vuoden 1825 lisäsopimus ja sen
       *     kahdeksansataa contoa.
       *   - en-Wikipedia "Transfer of the Portuguese court to Brazil",
       *     johdanto: hovi lähti Lissabonista 27.11.1807 ja laivat
       *     pääsivät liikkeelle sään takia vasta 29.11.; väkeä oli lähes
       *     kymmenentuhatta; Napoleonin joukot marssivat Portugaliin
       *     1.12.1807.
       *
       * SPOILERITARKISTUS: täky EI kerro, mitä aarremerkinnässä lukee
       * eikä missä yksittäinen nide on. Se kertoo, miksi sellainen kysymys
       * on ylipäätään mielekäs.
       */
      id: 'kirjasto',
      nappi: 'Kirjasto, joka lähti laivalla eikä palannut',
      otsikko: 'Kuninkaan kirjasto',
      teksti: 'Lissabonilla oli kerran yksi Euroopan tärkeimmistä '
        + 'kirjastoista, ja se paloi. Pyhäinpäivänä 1755 järistys kaatoi '
        + 'talon ja tuli vei loput. Kuningas José I ja hänen ministerinsä '
        + 'markiisi de Pombal keräsivät sen, mikä oli jäänyt jäljelle, ja '
        + 'rakensivat Ajudan palatsiin uuden kirjaston. Vuoteen 1807 '
        + 'mennessä siinä oli noin kuusikymmentätuhatta kappaletta: '
        + 'kirjoja, käsikirjoituksia, karttoja, piirroksia, rahoja ja '
        + 'mitaleita. Sitten tuli sota. Marraskuun 27. päivänä 1807 koko '
        + 'hovi — lähes kymmenentuhatta ihmistä — nousi laivoihin ja '
        + 'purjehti Brasiliaan; Napoleonin joukot ylittivät rajan neljä '
        + 'päivää myöhemmin. Kirjasto ei ehtinyt samaan laivaan. Se tuotiin '
        + 'perässä kolmessa erässä, ensimmäinen vuonna 1810 ja kaksi '
        + 'seuraavaa 1811, ja se sijoitettiin Rio de Janeirossa ensin erään '
        + 'sairaalan yläkerran saleihin. Ja tässä on se kohta, joka '
        + 'isoisääsi kiinnostaisi: kun kuningas João VI palasi Lissaboniin '
        + 'vuonna 1821, kirjasto ei palannut hänen mukanaan. Se jäi. '
        + 'Neljä vuotta myöhemmin siitä tehtiin kauppa — ja kokoelmasta '
        + 'tuli toisen maan kansalliskirjasto.',
      /*
       * UUSI KUVA (ei pelidatassa; tarvitsee R2-peilauksen). Commons
       * 29.8.2026: 1513×997, public domain, tekijä tuntematon, julkaistu
       * 1920, kuvaus "Photograph of the Biblioteca Nacional do Brasil,
       * Rio de Janeiro"; Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * mustavalkoinen katunäkymä kirjastorakennuksesta, ei
       * tunnistettavia ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: täyn viimeinen lause sanoo, että kokoelma
       * on nyt toisen maan kansalliskirjasto. Kuva näyttää sen talon —
       * eli sen väärän mantereen, jolla niteet ovat.
       */
      kuva: {
        tiedosto: 'Americana 1920 Libraries - Bibliotheca Nacional Rio de Janeiro.jpg',
        selite: 'Brasilian kansalliskirjasto Rio de Janeirossa. Sen '
          + 'perustan muodostaa Portugalin kuninkaallinen kirjasto, joka '
          + 'tuotiin Atlantin yli vuosina 1810 ja 1811.',
        lahde: 'Tuntematon kuvaaja, julkaistu 1920, Wikimedia Commons '
          + '(public domain)',
      },
      /*
       * OIKEA VASTAUS EI OLE PISIN: ensimmäinen ja toinen vaihtoehto ovat
       * käytännössä saman mittaiset (docs/moduulit/tarinakaari.md, luku 6,
       * sääntö 2).
       */
      visa: {
        kysymys: 'Miksi kuninkaan kirjasto ei koskaan palannut '
          + 'Lissaboniin?',
        vaihtoehdot: [
          'Portugali myi sen Brasilialle vuoden 1825 sopimuksessa',
          'Laiva, jolla se olisi palannut, upposi matkalla kotiin',
          'Britannian laivasto takavarikoi sen Rion satamassa',
        ],
        oikea: 0,
        fakta: 'Kokoelmasta tuli Brasilian omaisuutta vuoden 1825 '
          + 'sopimuksen lisäsopimuksella. Kuninkaalliselle perheelle '
          + 'maksettiin Brasiliaan jääneestä omaisuudesta kaksi miljoonaa '
          + 'puntaa, ja siitä summasta kahdeksansataa contoa kohdistettiin '
          + 'nimenomaan kirjaston maksuksi.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisän merkintä ihmettelee kaupunkia, joka
       * rakennettiin uusiksi "suoriin kortteleihin kuin ruutupaperille".
       * Tämä on sama kaupunki katutasolta katsottuna — ja sen suora
       * ruudukko sai päälleen kuvion, joka ei ole suora lainkaan.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, PRT/kasityo, nosto "Katukivet
       * ladotaan aalloiksi" (jo hyväksyttyä pelidataa) — mustaa
       * basalttia ja valkoista kalkkikiveä, ladotaan käsin hiekkaan ja
       * kopautetaan vasaralla, aaltokuvio Lissabonin isolle aukiolle
       * vuonna 1848, sama aalto myöhemmin Rio de Janeiron rantakadulle,
       * taitava latoja saa päivässä muutaman neliömetrin.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Portuguese pavement", osio "History":
       *     nykymuodossaan kiveystä käytettiin Lissabonissa ensi kerran
       *     1840–1846 São Jorgen linnan korjaustöissä, joita johti
       *     kenraali ja insinööri Eusebio Pinheiro Furtado; linnan pihat
       *     saivat mustavalkoisen siksak-kuvion, jota pidettiin aikaansa
       *     nähden epätavallisena; vuonna 1848 sama mies sai
       *     tehtäväkseen Rossion aukion uusimisen ja latoi siihen
       *     aaltokuvion kunnianosoituksena merelle, jonka portugalilaiset
       *     merenkulkijat ylittivät; siitä lähtien kiveys levisi
       *     Lissabonin ja koko Portugalin kaduille, ja aiheet kiersivät
       *     merta ja löytöretkiä; Espanjaan tapa levisi 1800-luvun
       *     lopulla, Barcelonaan 1896; Brasiliaan vasta 1901, ensin
       *     Manausiin, ja Rio de Janeirossa pormestari Francisco Pereira
       *     Passos ajoi sen Avenida Rio Brancolle tuottaen Portugalista
       *     latojat, kuviot ja jopa kivet.
       *   - pelin oma, jo hyväksytty nosto (yllä), joka nimeää saman
       *     vuoden 1848, saman aallon ja saman leviämisen Rioon.
       */
      id: 'calcada',
      nappi: 'Aalto, joka ladottiin kadun pintaan',
      otsikko: 'Calçada portuguesa',
      teksti: 'Katso alas. Lissabonin jalkakäytävät eivät ole asfalttia '
        + 'vaan pieniä kivinuppeja, jotka on ladottu käsin hiekkaan ja '
        + 'kopautettu paikoilleen vasaralla. Kiviä on kahta lajia: mustaa '
        + 'basalttia ja valkoista kalkkikiveä, ja niistä syntyy kuvio. Tapa '
        + 'alkoi työmaalta, jota kukaan ei tullut katsomaan: vuosina '
        + '1840–1846 kenraali ja insinööri Eusebio Pinheiro Furtado johti '
        + 'São Jorgen linnan korjausta ja latoi linnan pihoihin '
        + 'mustavalkoisen siksakin, jota pidettiin aikaansa nähden '
        + 'kummallisena. Vuonna 1848 hän sai isomman tehtävän — Rossion '
        + 'aukion — ja latoi siihen aallon. Se oli kunnianosoitus merelle, '
        + 'jonka portugalilaiset olivat ylittäneet. Siitä kuvio lähti '
        + 'leviämään pitkin kaupunkia ja koko maata, ja aiheet kiersivät '
        + 'yhä merta: laivoja, ankkureita, kompassiruusuja. Työ on hidasta. '
        + 'Taitava latoja saa päivässä valmiiksi muutaman neliömetrin, ja '
        + 'jokainen kivi on kopautettu erikseen. Sinä kävelet sen yli '
        + 'katsomatta kertaakaan alas.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto PRT/kasityo,
       * js/packs/maa-kategoriat.js) — siis jo kertaalleen tarkistettu ja
       * hyväksytty. Commons 29.8.2026: 2568×1927, CC BY-SA 3.0, Roede,
       * kuvaus "Pavement of Praça de D. Pedro IV in Lisbon (Calçada
       * portuguesa) of black basalt and white limestone" — eli täsmälleen
       * Rossion aukio, josta teksti kertoo. Restrictions tyhjä.
       */
      kuva: {
        tiedosto: 'Calçada da Praça do Rossio.jpg',
        selite: 'Rossion aukion aaltokuvio on ladottu mustasta basaltista '
          + 'ja valkoisesta kalkkikivestä.',
        lahde: 'Roede, Wikimedia Commons (CC BY-SA 3.0)',
      },
      /* Oikea vastaus on tässä LYHIN vaihtoehto — pituusjakauma vaihtelee
       * täkyjen välillä tarkoituksella. */
      visa: {
        kysymys: 'Mitä Rossion aukion kiveykseen ladottiin vuonna 1848?',
        vaihtoehdot: [
          'Aaltokuvio',
          'Kaupungin vaakuna',
          'Kartta Portugalin merireiteistä',
        ],
        oikea: 0,
        fakta: 'Kuvion latoi insinööri Eusebio Pinheiro Furtado, joka oli '
          + 'harjoitellut lajia São Jorgen linnan pihoilla 1840-luvulla. '
          + 'Sama aalto ladottiin myöhemmin myös Rio de Janeirossa — '
          + 'latojat, kuviot ja kivet tuotiin sinne Portugalista.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisä kirjoittaa kaupungista, joka rakennettiin
       * uusiksi, ja kaakeleista, jotka ovat "köyhän miehen freskot". Tämä
       * on saman kaupungin köyhä puoli äänenä: laulu, joka syntyi näillä
       * kujilla eikä missään salissa. Se on myös laudan HENGÄHDYS —
       * kirjastotäky on arvoitus ja kivitäky käsityö, tämä on ihminen.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, PRT/musiikki, nostot "Fado —
       * laulu, jossa on saudade" ja "Severan kotikadulle ladottiin
       * kitara" (jo hyväksyttyä pelidataa) — yksi laulaja, klassinen
       * kitara ja portugalilainen kitara, jossa on kaksitoista kieltä
       * kuutena parina; aiheena saudade; Unesco 2011; Maria Severa
       * Onofriana syntyi 1820, lauloi Mourarian kortteleissa, sairastui
       * tuberkuloosiin ja kuoli 30.11.1846 26-vuotiaana Rua do Capelãon
       * varrella, haudattiin yhteishautaan ilman arkkua; 85 vuotta
       * myöhemmin hänestä tehtiin Portugalin ensimmäinen äänielokuva.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Maria Severa Onofriana", johdanto ja osiot
       *     "Biography" ja "In popular culture": syntyi 26.7.1820
       *     Lissabonin Madragoan kaupunginosassa; isä oli
       *     cigano-taustainen, äiti piti kapakkaa ja tunnettiin
       *     lisänimellä A Barbuda; Severa lauloi kapakoissa ja soitti itse
       *     portugalilaista kitaraa; hänet haudattiin yhteishautaan Alto
       *     de São Joãon hautausmaalle; Júlio Dantasin romaanista tehtiin
       *     näytelmä, joka nousi lavalle 1901, ja vuonna 1931 ohjaaja
       *     Leitão de Barros teki siitä A Severan, ensimmäisen
       *     portugalilaisen äänielokuvan.
       *   - pelin oma, jo hyväksytty nosto (yllä), joka nimeää saman
       *     syntymävuoden, saman kuolinpäivän ja saman iän.
       *
       * MITÄ EI KERROTA: Severan ammattia koskevat aikalaisluonnehdinnat
       * jätetään pois. Ne eivät kuulu tähän korttiin, ja piikki osoittaa
       * tässä pelissä Foggiin — ei koskaan paikalliseen ihmiseen.
       */
      id: 'severa',
      nappi: 'Laulaja, joka haudattiin ilman arkkua',
      otsikko: 'Maria Severa',
      teksti: 'Fado on Lissabonin oma laulu, eikä se ole syntynyt '
        + 'juhlasalissa. Kokoonpano on yhä sama kuin alussa: yksi laulaja, '
        + 'klassinen kitara ja portugalilainen kitara, jossa on kaksitoista '
        + 'kieltä kuutena parina. Aiheena on useimmiten saudade — kaipaus '
        + 'jotakin kohti, mitä ei enää ole. Ensimmäinen, joka nousi tällä '
        + 'laululla koko kaupungin puheenaiheeksi, oli Maria Severa '
        + 'Onofriana. Hän syntyi Madragoassa 26. heinäkuuta 1820, äitinsä '
        + 'kapakan lapsena, ja lauloi Mourarian kujilla säestäen itseään '
        + 'portugalilaisella kitaralla. Hän sairastui tuberkuloosiin ja '
        + 'kuoli 26-vuotiaana 30. marraskuuta 1846 Rua do Capelãon '
        + 'varrella. Rahaa ei ollut: hänet haudattiin yhteishautaan ilman '
        + 'arkkua. Sitten tapahtui se, mikä köyhille laulajille joskus '
        + 'tapahtuu liian myöhään. Hänestä kirjoitettiin romaani, siitä '
        + 'tehtiin näytelmä, joka nousi lavalle 1901 — ja vuonna 1931 '
        + 'näytelmästä tehtiin elokuva, joka oli ensimmäinen '
        + 'portugalilainen elokuva äänen kanssa. Kahdeksankymmentäviisi '
        + 'vuotta hautajaisten jälkeen koko maa kuuli hänen nimensä '
        + 'kaiuttimista.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto PRT/musiikki,
       * js/packs/maa-kategoriat.js). Commons 29.8.2026: 338×484, public
       * domain, tekijä Francisco Augusto Metrass, kuvaus "The Fado-singer
       * Maria Severa (1820-1846)"; Restrictions tyhjä. Kuva on pieni,
       * mutta se on aikalaismuotokuva eikä sitä korvata uudemmalla.
       * SILMÄTARKISTUS: pystymuotoinen muotokuva laulajasta.
       */
      kuva: {
        tiedosto: 'Maria Severa - Fado-Sängerin.jpg',
        selite: 'Maria Severa (1820–1846) oli ensimmäinen maineeseen '
          + 'noussut fadolaulaja, ja hänestä tuli kuolemansa jälkeen lähes '
          + 'myyttinen hahmo.',
        lahde: 'Francisco Augusto Metrass, Wikimedia Commons (public domain)',
      },
      /*
       * Oikea vastaus on tässä KESKIMMÄINEN pituudeltaan (36 / 34 / 31
       * merkkiä). Väärät eivät ole puolitosia: Severalle EI ole tehty
       * oopperaa eikä balettia. Muistolaatta- tai patsasvaihtoehtoa ei
       * käytetä, koska hänen kotikatunsa kiveykseen on oikeasti ladottu
       * kitaran kuva — sellainen vaihtoehto olisi puolitosi.
       */
      visa: {
        kysymys: 'Mitä Maria Severan tarinasta tehtiin 85 vuotta hänen '
          + 'kuolemansa jälkeen?',
        vaihtoehdot: [
          'Portugalin ensimmäinen äänielokuva',
          'Ooppera, joka esitettiin kuninkaalle',
          'Balettiteos kaupunginteatteriin',
        ],
        oikea: 0,
        fakta: 'Elokuvan A Severa ohjasi Leitão de Barros vuonna 1931. '
          + 'Sitä ennen tarinasta oli tehty romaani ja siitä näytelmä, '
          + 'joka nousi lavalle vuonna 1901. Fado itse otettiin Unescon '
          + 'ihmiskunnan kulttuuriperinnön luetteloon vuonna 2011.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa isoisän merkinnän ja LUNASTAA Livian kuplan lupauksen:
   * kupla sanoo, että järistyksen jälkeen alettiin ensimmäistä kertaa
   * tutkia, miksi maa järisee. Oppitunti kertoo, MITEN se tehtiin.
   * Kaupunkilehden oma nosto ("Kaupunki kaatui pyhäinpäivänä 1755")
   * kertoo tapahtuman — tämä ei kertaa sitä, vaan jatkaa siitä eteenpäin.
   *
   * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta lähteestä):
   *   - en-Wikipedia "1755 Lisbon earthquake", johdanto ja osio
   *     "Development of seismology": järistys lauantaiaamuna 1.11.1755
   *     noin kello 9.40, pyhäinpäivä; magnitudiarvio 7,7 tai enemmän;
   *     keskus Atlantilla noin 200 km Pyhän Vincentin niemen länsi-
   *     lounaispuolella ja noin 290 km Lissabonista lounaaseen; kuolleita
   *     Lissabonissa arviolta 30 000–40 000; ensimmäisenä laajalta
   *     alueelta tieteellisesti tutkittuna järistyksenä se johti modernin
   *     seismologian syntyyn; pääministeri määräsi kerättäväksi
   *     tosiasiatietoa ja lähetti kyselyn maan kaikkiin seurakuntiin;
   *     kysymyksiin kuuluivat muun muassa milloin järistys alkoi ja
   *     kuinka kauan se kesti, tuntuiko tärähdys voimakkaampana jostakin
   *     suunnasta ja kaatuivatko rakennukset enemmän yhteen suuntaan,
   *     kuinka moni kuoli, nousiko vai laskiko meri ensin ja kuinka monta
   *     kämmenmittaa se nousi tavallisen yli, ja jos syttyi tulipalo,
   *     kuinka kauan se kesti; pappien vastaukset ovat yhä Torre do
   *     Tombon kansallisarkistossa, ja niiden avulla nykytutkijat
   *     pystyvät rekonstruoimaan tapahtuman; koska Pombal oli
   *     ensimmäinen, joka yritti laajaa objektiivista järistystutkimusta,
   *     häntä pidetään modernin seismologian edelläkävijänä.
   *   - pt-Wikipedia "Sismo de Lisboa de 1755", johdanto ja
   *     kyselyä käsittelevä jakso: sama kysely kaikkiin seurakuntiin,
   *     kysymyslistassa muun muassa kuinka kauan maa tärisi, kuinka
   *     voimakkaasti, mitä vahinkoja syntyi, kuinka moni kuoli,
   *     havaittiinko ennen järistystä outoja merkkejä, käyttäytyivätkö
   *     eläimet oudosti ja mitä kaivoissa tapahtui; vastaukset ovat yhä
   *     Torre do Tombossa; sama arvio Pombalista sismologian
   *     edelläkävijänä.
   *
   * IKÄSOPIVUUS (13+): tuhoa ei kuvata yksityiskohtaisesti eikä
   * uhriluvuilla mässäillä. Luku on kerrottu kerran, koska se on syy
   * siihen, miksi kysely ylipäätään lähetettiin.
   */
  oppitunti: {
    otsikko: 'Kysely, josta tuli tiede',
    teksti: 'Kun kaupunki oli kaatunut, tehtiin jotakin, mitä ei ollut ennen '
      + 'tehty. Pääministeri, markiisi de Pombal, lähetti kyselyn maan '
      + 'jokaiseen seurakuntaan ja pyysi papeilta vastauksia samoihin '
      + 'kysymyksiin. Milloin järistys alkoi ja kuinka kauan se kesti? '
      + 'Tuntuiko tärähdys voimakkaampana jostakin suunnasta, ja '
      + 'kaatuivatko rakennukset enemmän yhteen suuntaan kuin toiseen? '
      + 'Nousiko vai laskiko meri ensin, ja kuinka monta kämmenmittaa se '
      + 'nousi tavallisen yli? Näkyikö ennen järistystä outoja merkkejä? '
      + 'Käyttäytyivätkö eläimet oudosti? Mitä kaivoissa tapahtui? '
      + 'Huomaa, mitä listalta puuttuu: ei kysytä, kenen synnistä tämä '
      + 'seurasi. Kysytään kellonaikoja, suuntia ja kämmenmittoja. '
      + 'Vastaukset tulivat, ja ne ovat yhä tallessa Torre do Tombon '
      + 'kansallisarkistossa — niin tarkkoina, että nykytutkijat pystyvät '
      + 'niiden avulla rekonstruoimaan sen aamun: mihin aikaan aalto tuli, '
      + 'kuinka pitkälle se nousi ja mistä suunnasta maa liikkui. Arviot '
      + 'antavat järistykselle magnitudiksi 7,7 tai enemmän, ja keskus oli '
      + 'Atlantilla noin kaksisataa kilometriä Pyhän Vincentin niemestä '
      + 'länsilounaaseen. Lissabonissa kuoli arviolta kolmestakymmenestä '
      + 'neljäänkymmeneen tuhatta ihmistä. Pombal ei ollut tiedemies eikä '
      + 'hänellä ollut mittalaitteita, mutta hän kysyi koko maalta samat '
      + 'kysymykset samaan aikaan — ja juuri sitä nykyään sanotaan '
      + 'aineistonkeruuksi. Siksi häntä pidetään seismologian '
      + 'edelläkävijänä, ja siksi tämä kaupunki on se paikka, jossa maan '
      + 'järinä lakkasi olemasta rangaistus ja muuttui ilmiöksi, jota '
      + 'saa tutkia.',
    /*
     * UUSI KUVA (ei pelidatassa; tarvitsee R2-peilauksen). Commons
     * 29.8.2026: 998×593, public domain, tekijä tuntematon, päiväys 1755,
     * kuvaus "Lisbon, Portugal, during the great earthquake of 1 November
     * 1755. This copper engraving, made that year, shows the city in
     * ruins and in flames. Tsunamis rush upon the shore, destroying the
     * wharfs." Restrictions tyhjä. SILMÄTARKISTUS tehty: aikalaispiirros,
     * jossa kaupunki palaa ja aallot kaatavat laivoja; ei yksittäisiä
     * tunnistettavia ihmisiä, ei väkivaltakuvastoa.
     *
     * MIKSI JUURI TÄMÄ KUVA: se on samana vuonna tehty kuparipiirros eli
     * itsekin aikalaisdokumentti — samaa lajia kuin ne pappien
     * vastauslomakkeet, joista oppitunti kertoo. Kaupunkilehden oma
     * järistysnosto käyttää eri kuvaa (Karmeliittikirkon rauniot), joten
     * sama kuva ei toistu pelaajalle kahdesti.
     */
    kuva: {
      tiedosto: '1755 Lisbon earthquake.jpg',
      selite: 'Samana vuonna 1755 tehty kuparipiirros näyttää palavan '
        + 'kaupungin ja hyökyaallon, joka kaataa laivat Tejolla.',
      lahde: 'Tuntematon tekijä 1755, Wikimedia Commons (public domain)',
    },
  },

  /* FABLE KATSELMOI: kohtaamisluonnos */

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * TÄMÄ TEKSTI ON EHDOTUS, EI KAANONIA. Kohtaamiset ovat tarinatekstiä
   * ja siten päätoimittajan aluetta (docs/moduulit/tarinakaari.md,
   * luku 9: Opus ei koske tarinateksteihin). Luonnos on tässä siksi, että
   * paketti olisi kokonainen ja arvioitavissa yhtenä kappaleena — Fable
   * joko hyväksyy sen, muokkaa sen tai korvaa sen kokonaan, eikä mitään
   * muuta tässä tiedostossa tarvitse silloin koskea.
   *
   * HAHMO JA KYSYMYS OVAT VALMIINA JA NE ON OTETTU SELLAISINAAN
   * tarinakaaren paketista (js/tyohuone-kehitys-data.js KAARI_PAKETIT,
   * id 'lissabon'): laattamestari Inês polttaa sinivalkoisia
   * azulejo-laattoja samassa uunissa kuin sukunsa kolmesataa vuotta, ja
   * hänen kysymyksensä koskee sanan azulejo alkuperää. Tämä kortti EI
   * kertaa Inêsin repliikkiä eikä paljasta vastausta — se vain esittelee
   * hänet ja kertoo, mitä hän odottaa.
   *
   * VARALLISUUSSÄÄNTÖ TARKISTETTU: isoisä ei maksanut mitään eikä
   * käskenyt sukua odottamaan. Odotuksen syy on suvun oma ja se on
   * ammattiylpeys: keskeneräistä työtä ei tässä pajassa hävitetä. Sama
   * syy lukee jo kaaren omassa repliikissä, joten tämä kortti ei keksi
   * uutta syytä sen rinnalle.
   *
   * EI KUVAA (aallon 4 linjaus): kohtaamiskortti on ihmisen ääni, ja kuvat
   * kuuluvat kaupunkilehteen ja täkyihin.
   *
   * HUOMIO PÄÄTOIMITTAJALLE — PÄÄLLEKKÄISYYS, JOTA EN VOI KORJATA TÄSTÄ
   * TIEDOSTOSTA: Inêsin kysymys (azulejon nimen alkuperä) on sanasta
   * sanaan sama aihe kuin Lissabonin kulttuurivisa
   * (js/packs/europe-kulttuuri.js), jonka js/fokustehtavat.js pukee lehden
   * sivun 1 AARTEEN AVAUS -tehtäväksi. Kevyessä kulussa pelaaja siis
   * vastaa samaan kysymykseen kahdesti, ja ensimmäinen kerta antaa
   * jälkimmäisen ilmaiseksi. Korjaus vaatisi kosketuksen joko
   * kulttuurivisaan tai kaaripakettiin — kumpikaan ei ole tämän työn
   * rajauksessa, joten se on kirjattu tähän.
   */
  kohtaaminen: {
    hahmo: 'Laattamestari Inês',
    nappi: 'Tapaa laattamestari',
    teksti: 'Inês tekee työtä, jossa virhe näkyy vasta kolmen päivän '
      + 'kuluttua: väri menee uuniin harmaana ja tulee ulos sinisenä, ja '
      + 'vasta silloin selviää, osuiko käsi oikeaan. Sukunsa paja on '
      + 'polttanut samassa uunissa kolmesataa vuotta, ja hän on oppinut '
      + 'lukemaan liekin väriä niin kuin toiset lukevat kelloa. Vieraita '
      + 'hän katsoo kärsivällisesti mutta ei kohteliaisuuttaan: pajassa on '
      + 'yksi laatta, jota ei ole koskaan poltettu loppuun, ja ennen kuin '
      + 'Inês kertoo miksi, hän haluaa tietää, ymmärtääkö vieras yhtään '
      + 'mitään siitä, mitä näillä seinillä on.',
    /*
     * VIHJELINKIN OSIO: Lissabonin lehdessä on kaksi osiota
     * (js/packs/kulttuuri-kategoriat.js): 'kaupunki' ("Lissabon") ja
     * 'ruoka' ("Ruoka"). Inêsin kysymys koskee azulejoa, ja lähin tuki
     * sille on Lissabon-osiossa — nosto "Azulejot pitävät talon viileänä"
     * kertoo, mistä sana tulee. Rivi kertoo suunnan, ei vastausta.
     */
    vihjeOsio: 'kaupunki',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: AZULEJOMUSEO (Madre de Deusin luostari). Inês on
   * laattamestari, ja kaupungin laattojen oma talo on kansallinen
   * azulejomuseo entisessä Madre de Deusin luostarissa Tejon rannalla
   * itään keskustasta. Paikka on kaupungin oma eikä keksitty, ja se on
   * juuri se osoite, jossa laattoja säilytetään ja tutkitaan.
   *
   * 38,72466944 N / −9,11411111 E — pt-Wikipedia "Museu Nacional do
   * Azulejo", prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava
   * ja samat vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((−9,11411111 − (−175)) mod 360) × (12000/360)
   *                     = 165,88588889 × 33,3333… = 5529,5
   *                   y = (millerY(76) − millerY(38,72466944)) × 12000/2π
   *                     = 1852,7
   *   europe          x = (−9,11411111 + 11) × 19,2 = 36,2
   *                   y = (72 − 38,72466944) × 26,3 = 875,1
   *
   * KAAVA ON TARKISTETTU TUNNETULLA ARVOLLA: samalla laskennalla
   * Tukholman Skeppsbron antaa 6435,8 / 959,2 ja 558,2 / 333,4 eli
   * täsmälleen ne luvut, jotka lukevat js/packs/fokusvirta-tukholma.js:ssä.
   *
   * TARKISTUS LAATTAA VASTEN: Lissabonin laatta on Euroopan laudalla
   * 36 / 875 ja maailmankartalla 5529,2 / 1852,5 (js/packs/europe.js ja
   * js/packs/maailmankartta.js). Museo on siis käytännössä laatan päällä
   * — niin pitääkin, sillä matka keskustasta on muutama kilometri ja
   * laudan yksikkö on maailmankartalla noin kolme kilometriä. Piirtopuoli
   * hoitaa erotuksen itse: alle 14 yksikön päässä laatasta piste
   * siirretään koilliseen (js/fokuspiste.js PISTE_ERO_MIN).
   */
  kohtaamispiste: {
    nimi: 'Azulejomuseon paja',
    laudat: {
      maailmankartta: { x: 5529.5, y: 1852.7 },
      europe: { x: 36.2, y: 875.1 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Lissabonin sivupino (js/lehti.js
   * rakennaSivut): 0 = etusivu, 1 = kaupunkisivu "Lissabon", 2 = Ruoka,
   * 3 = Menovinkit (Portugalin maalehdestä).
   *
   * Sivun 1 kysymys on Lissabonin kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   *
   * AARTEEN AVAUKSEN vastaus lukee samalla sivulla (leivosnosto on sivun
   * 2 omaa aineistoa), kuten js/fokustehtavat.js olettaa. JULISTEEN
   * vastaus on sivulla 1 — sama ratkaisu kuin Tukholmassa ja Ateenassa,
   * joissa julistetehtävän lähde on niin ikään kaupunkisivun nosto.
   *
   * JULISTEELLE EI ANNETA OMAA AVAINTA: js/packs/julisteet.js tuntee
   * Lissabonista vain kaupungin yleisjulisteen ('lissabon'), joten
   * `juliste`-kenttä jätetään pois ja palkinnoksi tulee se.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: PASTEL_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: SARVIKUONO_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Portugali) ----------
   *
   * UUSI POOLI, EI SIIRTO. Portugali ei ole js/fokusnosto.js:n NOSTO_MAAT
   * -taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia, joten uusi maa ei vaadi riviä
   * moottoriin — pooli syntyy tästä kentästä.
   *
   * NELJÄ NOSTOA. Portugali on pelin aineistossa keskitasoa rikkaampi
   * maa (maalehdessä viisi aihesivua), joten pooli on aallon 3 yhtä
   * nostoa isompi. Kohteet on valittu niin, että ne osuvat kartalla eri
   * puolille maata eivätkä kasaannu Lissabonin laatan päälle: Coimbra
   * keskellä, Porto pohjoisessa, Nazaré rannikolla ja Algarve etelässä.
   * Kaikkien etäisyys Lissabonin laatasta ja toisistaan on Euroopan
   * laudalla yli 19 yksikköä.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI: Livia huomauttaa tuikkivista
   * pisteistä kerran, ja huomio osuu poolin ensimmäiseen katsomattomaan.
   * Kärjeksi on valittu Coimbran kirjasto, koska se on saman langan
   * päässä kuin ISO AARRE: aarremerkintä puhuu niteestä väärässä
   * hyllyssä, ja tämä nosto kertoo kirjastosta, joka pitää niteensä
   * elävien vartijoiden turvin. Aarteen paikkaa se ei kerro.
   *
   * KAIKKI KOORDINAATIT on haettu Wikipedian prop=coordinates
   * -rajapinnasta 29.8.2026 ja muunnettu samalla kaavalla ja samoilla
   * vakioilla kuin kohtaamispiste yllä (kaava tarkistettu Tukholman
   * tunnetuilla luvuilla).
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä). Tämä on myös laudan
       * ELÄINJUTTU (Raamatun linjaus: täkyihin myös eläinjuttuja).
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Biblioteca Joanina", johdanto sekä osiot
       *     "History", "Architecture", "Book preservation" ja "Bats":
       *     barokkikirjasto Coimbran yliopiston sydämessä; nimetty
       *     perustajansa kuningas João V:n mukaan; rakentaminen alkoi 1717
       *     ja valmistui 1728; ensimmäiset kirjat saatiin 1750; kirjastoa
       *     pidetään kansallismonumenttina; ulkoseinät ovat noin 2,11
       *     metriä paksut ja tiikkinen ovi pitää lämpötilan vakaana
       *     18–20 asteessa ja kosteuden noin 60 prosentissa; hyllyt on
       *     tehty tammesta, jonka haju karkottaa paperia syöviä hyönteisiä;
       *     kirjasto on toinen maailman kahdesta, joiden kirjoja suojaa
       *     hyönteisiltä talon sisällä asuva lepakkoyhdyskunta (toinen on
       *     Mafran palatsin kirjasto); lepakot syövät yöllä ilmaantuvat
       *     hyönteiset, työntekijät peittävät pöydät yöksi
       *     nahkasuojuksilla, ja aamulla kirjasto siivotaan lepakonlannasta.
       *   - en-Wikipedia "Palace of Mafra", osio "Library": Mafran
       *     rokokookirjasto on 88 metriä pitkä, 9,5 metriä leveä ja 13
       *     metriä korkea ja siinä on yli 36 000 nahkakantista nidettä;
       *     kirjasto tunnetaan siitä, että se antaa kodin lepakoille,
       *     jotka suojaavat kirjoja hyönteistuholta; yhdyskunnassa on
       *     korvayökköjä ja etelänlepakoita.
       */
      id: 'joanina',
      nimio: 'Lepakkokirjasto',
      otsikko: 'Kirjaston pöydät peitetään joka ilta nahalla — ja aamulla '
        + 'lattialta lakaistaan se, mikä yöllä tapahtui',
      lunastus: [
        'Coimbran yliopiston barokkikirjasto on rakennettu kirjoja varten '
          + 'niin perusteellisesti, että se toimii kuin holvi. Kuningas '
          + 'João V:n mukaan nimetyn Joanina-kirjaston rakentaminen alkoi '
          + '1717 ja valmistui 1728, ja ensimmäiset kirjat kannettiin '
          + 'sisään 1750. Ulkoseinät ovat noin kaksi ja puoli metriä '
          + 'paksut, sisäänkäynnin ovi on tiikkiä, ja niiden ansiosta '
          + 'lämpötila pysyy ympäri vuoden 18 ja 20 asteen välillä ja '
          + 'kosteus noin kuudessakymmenessä prosentissa. Hyllyt on tehty '
          + 'tammesta, koska tammi on tiivistä eikä hyönteinen pääse '
          + 'siihen — ja koska se haisee niistä pahalta.',
        'Mutta paperia syöviä hyönteisiä vastaan ei riitä paksu seinä. '
          + 'Siksi kirjastossa asuu lepakoita. Ne nukkuvat päivät hyllyjen '
          + 'takana ja lähtevät öisin liikkeelle, ja mitä ikinä ilmaan on '
          + 'noussut, se syödään. Järjestelmä maksaa yhden vaivan: joka '
          + 'ilta henkilökunta peittää pöydät nahkasuojuksilla, ja joka '
          + 'aamu lattialta siivotaan lepakonlanta pois. Tällaisia '
          + 'kirjastoja on maailmassa kaksi, ja molemmat ovat Portugalissa '
          + '— toinen on Mafran palatsin 88 metriä pitkä kirjastosali, '
          + 'jossa on yli 36 000 nahkakantista nidettä ja jonka '
          + 'lepakkoyhdyskunnassa on korvayökköjä ja etelänlepakoita. '
          + 'Kirjat ovat säilyneet kolmesataa vuotta, koska niitä vartioi '
          + 'jokin, joka ei osaa lukea.',
      ],
      lahde: 'en-Wikipedia "Biblioteca Joanina", johdanto sekä osiot '
        + '"Book preservation" ja "Bats"; en-Wikipedia "Palace of Mafra", '
        + 'osio "Library". Tarkistettu 29.8.2026.',
      /*
       * UUSI KUVA (ei pelidatassa; tarvitsee R2-peilauksen). Commons
       * 29.8.2026: 1377×1835, CC BY-SA 4.0, Manuelvbotelho; Restrictions
       * tyhjä. SILMÄTARKISTUS tehty: kirjastosali, kullatut hyllyt kahdessa
       * kerroksessa, keskellä João V:n muotokuva; ei ihmisiä kuvassa.
       */
      kuva: {
        tiedosto: 'Biblioteca Joanina Universidade de Coimbra IMG 0664.JPG',
        selite: 'Joanina-kirjaston sali Coimbran yliopistossa: kullatut '
          + 'tammihyllyt kahdessa kerroksessa ja keskellä perustajan, '
          + 'kuningas João V:n, muotokuva.',
        lahde: 'Manuelvbotelho, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi kirjastossa asuu lepakoita?',
        'Mitä pöydille tehdään joka ilta?',
        'Missä on maailman toinen lepakkokirjasto?',
      ],
      /*
       * 40,20277778 N / −8,41388889 E — en-Wikipedia "Coimbra",
       * prop=coordinates (haettu 29.8.2026). Sama kaava kuin
       * kohtaamispisteellä yllä.
       */
      paikka: {
        nimi: 'Coimbra',
        laudat: {
          maailmankartta: { x: 5552.9, y: 1794.9 },
          europe: { x: 49.7, y: 836.3 },
        },
      },
    },
    {
      /*
       * FAKTAT: js/packs/maa-kategoriat.js, PRT/urheilu, nosto "Aalto,
       * jonka pohja on kuilu" (jo hyväksyttyä pelidataa) — merenalainen
       * kanjoni rannan edessä, satoja kilometrejä pitkä ja kilometrejä
       * syvä, ohjaa maininkia kapenevaan uomaan, aalto voi nousta yli
       * kahdenkymmenen metrin, surffaaja hinataan aaltoon vesijetillä.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Nazaré Canyon", johdanto sekä osiot "Sections",
       *     "Dynamics" ja "Surfing": Euroopan suurin merenalainen kanjoni,
       *     syvyys noin 5 000 metriä ja pituus noin 230 kilometriä; kanjoni
       *     alkaa noin kilometrin päästä rannasta; syvimmillään 4 970
       *     metrissä, 211 kilometrin päässä niemestä, se yhtyy Iberian
       *     syvänmerentasankoon; kanjoni toimii aaltojen polarisoijana,
       *     eli maininki etenee ruhjeen yllä huomattavasti nopeammin ja
       *     saapuu rantaan menettämättä juuri lainkaan energiaansa, minkä
       *     takia Praia do Nortessa on jatkuvasti selvästi suurempia
       *     aaltoja kuin muualla Portugalin rannikolla; marraskuussa 2011
       *     havaijilainen Garrett McNamara surffasi paikalla 24 metrin
       *     aallon aallonpohjasta harjalle mitattuna.
       *   - pelin oma, jo hyväksytty nosto (yllä), joka kertoo saman
       *     mekanismin ja saman aaltokorkeuden luokan.
       */
      id: 'nazare',
      nimio: 'Nazarén aalto',
      otsikko: 'Yhden kylän edustalla aallot ovat kaksi kertaa isompia kuin '
        + 'naapurirannalla — syy on kilometrien syvyydessä',
      lunastus: [
        'Nazarén kalastajakylän pohjoisen rannan edessä avautuu merenalainen '
          + 'kanjoni, joka on Euroopan suurin: noin 230 kilometriä pitkä ja '
          + 'syvimmillään lähes viisi kilometriä. Se alkaa noin kilometrin '
          + 'päässä rannasta ja päättyy 211 kilometrin päässä Iberian '
          + 'syvänmerentasankoon. Tavallisella rannalla matala pohja '
          + 'jarruttaa maininkia kauan ennen rantaviivaa ja syö siitä '
          + 'energian. Täällä ei jarruta mikään.',
        'Kanjoni toimii kuin suppilo. Syvässä uomassa aalto etenee '
          + 'huomattavasti nopeammin kuin sen vieressä matalikolla, ja kun '
          + 'syvä vesi loppuu äkisti rannan edessä, kaikki se energia on '
          + 'pakko purkaa jonnekin — ylöspäin. Siksi Praia do Nortessa on '
          + 'jatkuvasti selvästi suurempia aaltoja kuin muualla Portugalin '
          + 'rannikolla, ja siksi aallot voivat nousta yli kahdenkymmenen '
          + 'metrin. Marraskuussa 2011 havaijilainen Garrett McNamara '
          + 'surffasi täällä aallon, joka mitattiin aallonpohjasta harjalle '
          + '24 metriksi. Aaltoon ei paukuteta omin voimin: surffaaja '
          + 'hinataan siihen vesijetillä, koska muuten ei ehdi.',
      ],
      lahde: 'en-Wikipedia "Nazaré Canyon", johdanto sekä osiot "Dynamics" '
        + 'ja "Surfing"; pelin oma nosto "Aalto, jonka pohja on kuilu" '
        + '(js/packs/maa-kategoriat.js, PRT/urheilu). Tarkistettu 29.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto PRT/urheilu).
       * Commons 29.8.2026: 2000×1074, CC BY-SA 4.0, Alohamansurfer,
       * kuvaus "Russian surfer Sergey Mysovskiy surfing big wave in
       * Nazare Portugal"; Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * surffaaja ison aallon rinteessä kaukaisena hahmona, julkinen
       * urheilusuoritus.
       */
      kuva: {
        tiedosto: 'Mysovskiy Sergey surfing Nazare.jpg',
        selite: 'Nazarén Praia do Norten aallot nousevat merenalaisen '
          + 'kanjonin päällä korkeammiksi kuin missään muualla Portugalin '
          + 'rannikolla.',
        lahde: 'Alohamansurfer, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi juuri tässä kohdassa rannikkoa?',
        'Kuinka korkealle aalto voi nousta?',
        'Miten surffaaja pääsee liikkeelle?',
      ],
      /*
       * 39,60111111 N / −9,07055556 E — en-Wikipedia "Nazaré, Portugal",
       * prop=coordinates (haettu 29.8.2026).
       */
      paikka: {
        nimi: 'Nazaré',
        laudat: {
          maailmankartta: { x: 5531.0, y: 1818.5 },
          europe: { x: 37.0, y: 852.1 },
        },
      },
    },
    {
      /*
       * MIKSI TÄMÄ NOSTO: isoisä kirjoittaa kaakeleista, että ne ovat
       * "köyhän miehen freskot" ja kauniimpia kuin moni palatsi. Tämä on
       * sen väitteen äärimmäinen tapaus — ei palatsi eikä kirkko vaan
       * rautatieaseman odotushalli.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, PRT/kasityo, nosto
       * "Asemahalli laatoista" (jo hyväksyttyä pelidataa) — Porton
       * päärautatieaseman odotushalli, noin kaksikymmentätuhatta
       * sinivalkoista laattaa, suuret kuvakentät maan historiasta ja
       * maaseudun töistä, maalari Jorge Colaço, työ vei yksitoista vuotta,
       * halli valmistui 1916, asema rakennettiin vanhan luostarin paikalle
       * ja sai siitä nimensä, sininen väri tulee kobolttioksidista.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "São Bento railway station", johdanto ja osio
       *     "Vestibule and historic tile images": rakentaminen alkoi 1904
       *     arkkitehti José Marques da Silvan piirustusten mukaan;
       *     laattoja on noin kaksikymmentätuhatta ja ne peittävät 551
       *     neliömetriä; ne ovat vuosilta 1905–1916; Colaço asetti
       *     ensimmäiset laatat 13. elokuuta 1905; laatat valmistettiin
       *     Sacavémin tehtaalla; asema sijaitsee Porton historiallisessa
       *     keskustassa, joka on Unescon maailmanperintökohde ja
       *     Portugalin kansallismonumentti.
       *   - pelin oma, jo hyväksytty nosto (yllä), joka nimeää saman
       *     laattamäärän, saman maalarin, saman yksitoista vuotta ja saman
       *     valmistumisvuoden 1916.
       */
      id: 'saobento',
      nimio: 'Laattahalli',
      otsikko: 'Portossa on odotushalli, jonka seinillä on kaksikymmentä'
        + 'tuhatta laattaa — ja yksi mies maalasi ne kaikki',
      lunastus: [
        'Porton päärautatieasema rakennettiin vanhan luostarin paikalle ja '
          + 'sai siltä nimensä. Rakennustyö alkoi vuonna 1904 arkkitehti '
          + 'José Marques da Silvan piirustusten mukaan, ja tavallisesti '
          + 'siihen kohtaan tulisi kertoa aikatauluista ja laiturien '
          + 'määrästä. Tässä asemassa kiinnostavaa on kuitenkin seinä. '
          + 'Odotushallin pinnat on päällystetty noin '
          + 'kahdellakymmenellätuhannella azulejo-laatalla, jotka peittävät '
          + '551 neliömetriä, ja ne muodostavat suuria kuvakenttiä: maan '
          + 'historian tapahtumia ja maaseudun töitä, ihmisiä pelloilla ja '
          + 'markkinoilla.',
        'Kuvat maalasi Jorge Colaço, ja hän asetti ensimmäiset laatat '
          + 'paikoilleen 13. elokuuta 1905. Työ kesti yksitoista vuotta, ja '
          + 'halli valmistui 1916. Laatat itse tehtiin Sacavémin tehtaalla, '
          + 'ja niiden sininen tulee kobolttioksidista, joka kestää polton '
          + 'kirkkaana — juuri siksi väri on sama nyt kuin sata vuotta '
          + 'sitten. Asema on yhä käytössä, ja se seisoo Porton '
          + 'historiallisessa keskustassa, joka kuuluu Unescon '
          + 'maailmanperintöluetteloon. Ihmiset odottavat siellä junaa '
          + 'katsomatta ylös.',
      ],
      lahde: 'en-Wikipedia "São Bento railway station", johdanto ja osio '
        + '"Vestibule and historic tile images"; pelin oma nosto '
        + '"Asemahalli laatoista" (js/packs/maa-kategoriat.js, '
        + 'PRT/kasityo). Tarkistettu 29.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto PRT/kasityo).
       * Commons 29.8.2026: 6048×4032, CC BY 4.0, Michael Gaylard from
       * Horsham, UK; Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * odotushallin laattaseinät, ihmiset kaukaisina hahmoina.
       */
      kuva: {
        tiedosto: 'Exploring the Azulejo-Adorned Grand Hall of São Bento Station (55248917165).jpg',
        selite: 'São Benton aseman odotushallin seinillä on noin 20 000 '
          + 'azulejo-laattaa, jotka peittävät 551 neliömetriä.',
        lahde: 'Michael Gaylard, Wikimedia Commons (CC BY 4.0)',
      },
      kysymykset: [
        'Kuinka kauan laattojen maalaaminen kesti?',
        'Mitä kuvat esittävät?',
        'Miksi sininen väri ei ole haalistunut?',
      ],
      /*
       * 41,14555556 N / −8,61033333 E — en-Wikipedia "São Bento railway
       * station", prop=coordinates (haettu 29.8.2026).
       */
      paikka: {
        nimi: 'Porto',
        laudat: {
          maailmankartta: { x: 5546.3, y: 1757.6 },
          europe: { x: 45.9, y: 811.5 },
        },
      },
    },
    {
      /*
       * MIKSI TÄMÄ NOSTO: koko kaupunki kaatui ja nousi uudestaan. Tämä on
       * saman maan puu, joka tekee saman joka yhdeksäs vuosi — sen kuori
       * viedään pois eikä se kuole.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, PRT/luonto, nosto "Puu, jonka
       * kuori otetaan mutta joka jää pystyyn" (jo hyväksyttyä pelidataa) —
       * kuori irrotetaan kirveellä käsin eikä koneella, koska rungon alla
       * oleva kerros ei saa vaurioitua; ensimmäinen kuorinta noin 25
       * vuoden iässä ja sen jälkeen aina yhdeksän vuoden välein; runkoon
       * maalataan numero, joka kertoo kuorintavuoden; sama puu voi antaa
       * kuorta parinsadan vuoden ajan; maassa on maailman suurimmat
       * korkkitammimetsät ja niistä tulee noin puolet koko maailman
       * korkista.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Quercus suber", johdanto sekä osiot
       *     "Distribution and habitat" ja kuorintaa käsittelevä jakso: puu
       *     on ikivihreä tammi ja voi elää jopa kaksisataa vuotta;
       *     kuorinta tapahtuu yhdeksän–kahdentoista vuoden välein, kun
       *     kerroksen paksuus on 2,7–4 senttiä; yksi puu ehditään kuoria
       *     kaikkiaan viidestä seitsemääntoista kertaan; Portugalissa
       *     luontaisia ja istutettuja metsiköitä on 750 000 hehtaaria;
       *     korkkitammimetsät ovat koti suurelle joukolle eläin- ja
       *     kasvilajeja, ja korkin korvautuminen muilla materiaaleilla
       *     uhkaa niitä — sitä kautta myös iberianilvestä ja
       *     keisarikotkaa.
       *   - pelin oma, jo hyväksytty nosto (yllä), joka nimeää saman
       *     yhdeksän vuoden välin, saman 25 vuoden ensikuorinnan ja saman
       *     osuuden maailman korkista.
       */
      id: 'korkkitammi',
      nimio: 'Korkkitammi',
      otsikko: 'Puulta viedään kuori kirveellä, ja se jää pystyyn — sata '
        + 'vuotta myöhemmin sille tehdään sama uudestaan',
      lunastus: [
        'Korkkitammen paksu kaarna voidaan irrottaa ilman että puu kuolee, '
          + 'mutta vain jos sen tekee ihminen kirveellä. Konetta ei käytetä, '
          + 'koska kaarnan alla oleva ohut kerros ei saa vaurioitua — siitä '
          + 'kasvaa seuraava kuori. Ensimmäisen kerran puu kuoritaan noin '
          + '25-vuotiaana, ja sen jälkeen aina yhdeksän vuoden välein, kun '
          + 'kerros on ehtinyt kolmisen senttiä paksuksi. Runkoon maalataan '
          + 'numero, joka kertoo kuorintavuoden, ja sen näkee kaukaa: '
          + 'metsässä puut kantavat vuosilukuaan kylkeensä maalattuna.',
        'Yksi puu ehditään kuoria elämänsä aikana viidestä '
          + 'seitsemääntoista kertaan, ja se voi elää kaksisataa vuotta. '
          + 'Portugalissa korkkitammimetsiä on 750 000 hehtaaria — maailman '
          + 'suurimmat — ja niistä tulee noin puolet koko maailman '
          + 'korkista. Metsä ei ole vain puita: se on harvaa, valoisaa '
          + 'laidunmetsää, jossa elää suuri joukko lajeja, ja jos korkin '
          + 'kysyntä katoaa, katoaa myös syy pitää metsä pystyssä. Sitä '
          + 'kautta viinipullon tulppa liittyy iberianilveksen ja '
          + 'keisarikotkan kohtaloon — mikä on omituinen ajatus '
          + 'korkkiruuvin ääressä.',
      ],
      lahde: 'en-Wikipedia "Quercus suber", johdanto sekä osiot '
        + '"Distribution and habitat" ja kuorinta; pelin oma nosto "Puu, '
        + 'jonka kuori otetaan mutta joka jää pystyyn" '
        + '(js/packs/maa-kategoriat.js, PRT/luonto). Tarkistettu 29.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto PRT/luonto).
       * Commons 29.8.2026: 4608×3456, CC BY-SA 4.0, Kolforn; kuvaus
       * "A stack of harvested cork next to the EM510 road near the village
       * of Foz do Ribeiro near São Bartolomeu de Messines, Silves,
       * Algarve, Portugal"; Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * pino irrotettua korkkikuorta tienvarressa, ei ihmisiä.
       *
       * KARTTAPISTE ON SAMA PAIKKA KUIN KUVASSA: kuva on otettu São
       * Bartolomeu de Messinesin kylän liepeiltä Algarvessa, ja piste
       * osoittaa sinne. Nosto ei siis lupaa yhtä paikkaa ja näytä toista.
       */
      kuva: {
        tiedosto: '09-06-2017 Harvested cork, Foz do Ribeiro, São Bartolomeu de Messines (1).JPG',
        selite: 'Irrotettua korkkikuorta pinossa Algarvessa. Kuori '
          + 'irrotetaan käsin kirveellä, jottei rungon alla oleva kerros '
          + 'vaurioidu.',
        lahde: 'Kolforn, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi kuori irrotetaan käsin?',
        'Mitä runkoon maalattu numero tarkoittaa?',
        'Mitä metsälle tapahtuu, jos korkkia ei osteta?',
      ],
      /*
       * 37,25778 N / −8,29056 E — en-Wikipedia "São Bartolomeu de
       * Messines", prop=coordinates (haettu 29.8.2026).
       */
      paikka: {
        nimi: 'São Bartolomeu de Messines',
        laudat: {
          maailmankartta: { x: 5557.0, y: 1909.4 },
          europe: { x: 52.0, y: 913.7 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. Iso
   * aarre: kuninkaan kirjaston nide. Merkintä aukeaa, kun aarre löytyy
   * (js/fokusvirta.js fokusvirtaAarremerkinta).
   *
   * MUOTO ON OLIO EIKÄ MERKKIJONO (v1301: jokainen kaupunki kirjoittaa
   * `{ teksti }`).
   */
  aarremerkinta: {
    teksti: 'Kirjastonhoitaja kertoi kuninkaan kirjastosta, joka pakeni '
      + 'laivalla valtameren yli keisarin sotia — kymmeniätuhansia niteitä '
      + 'heiluvissa arkuissa. Kaikki eivät koskaan palanneet. Yksi nide on '
      + 'hänen mukaansa yhä väärällä mantereella, väärässä hyllyssä, '
      + 'oikeiden kansien takana. Kirja on helpoin aarre piilottaa: se '
      + 'katoaa toisten kirjojen sekaan.',
  },
};
