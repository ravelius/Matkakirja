/*
 * VILNAN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-riika.js:lle ja -tukholma.js:lle:
 * samat kentät, sama järjestys, sama moottori (js/fokusvirta.js).
 * Aalto 4B, Liettua.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026, aalto 4B): matkakirjan
 * paikkarivi ja teksti, Livian teksti ja aarremerkinnän teksti ovat
 * SANATARKASTI hänen kirjoittamansa — niitä ei ole lyhennetty,
 * täydennetty eikä sanajärjestystä muutettu. Luenta on sama teksti
 * tunnetagein; yksikään sana ei vaihdu.
 *
 * MAADOITUS ON JAETTU KAANONTEKSTISTÄ, EI KIRJOITETTU. Kaanoni antaa
 * Livialle yhden tekstin, ja Livian ääni on päätoimittajan — uusia
 * Livia-sanoja ei siis ole tässä paketissa yhtäkään. Integroinnissa
 * teksti on jaettu virkkeen rajaa pitkin kenttiin `maadoitus` ja
 * `teksti` (Edinburghin ja Riian kaava, ks. pollo-lohkon oma
 * kommentti), koska tests/fokusvirta.test.mjs vaatii jokaiselta
 * fokuskaupungilta oman maadoituksen. Peräkkäin luettuna kuplateksti
 * on sanasta sanaan sama.
 *
 * ISO AARRE: Vilnan katedraalin kätkö (js/packs/paikallisaarteet.js,
 * LTU). PIENI AARRE: šakotis-kakku (sama taulu).
 *
 * FAKTAPOHJA. Liettualle EI ole valmista takynostot-työaineistoa, joten
 * täyt, oppitunti, lehtitehtävät ja täkynostot on rakennettu kahdesta
 * lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Liettuan maalehden nostot
 *      (js/packs/maa-kategoriat.js, LTU/luonto, LTU/tavat ja
 *      LTU/menovinkit), Vilnan kaupunkilehden omat nostot ja
 *      Matkailijan Vilna -artikkeli (js/packs/kulttuuri-kategoriat.js,
 *      vilna/kaupunki ja vilna/oppi), Vilnan nähtävyysjutut
 *      (js/packs/nahtavyysjutut.js) sekä maan aarretiedot
 *      (js/packs/paikallisaarteet.js, LTU). Nämä on jo kertaalleen
 *      tarkistettu ja hyväksytty peliin — myös niiden KUVAT, jotka tämä
 *      paketti lainaa sellaisinaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei ole,
 *      on haettu Wikipedian rajapinnasta 29.8.2026 ja katsottu KAHDESTA
 *      riippumattomasta lähteestä. Ne on nimetty kunkin kohdan omassa
 *      kommentissa, samoin ne kohdat, joissa lähteet ovat eri mieltä
 *      (kiellon alkuvuosi, kätkön piilopaikan sanamuoto, ristien
 *      raivausvuodet) — mitään näistä ei ole pyöristetty yhdeksi
 *      luvuksi.
 *
 * PÄÄLLEKKÄISYYS ON TIETOINEN JA RAJATTU. Yksi täky (kirjankantajat) on
 * kaupunkilehden puolelta, koska se on kaupungin oma 1873-ankkuri:
 * painokielto oli isoisän käydessä yhdeksättä vuottaan voimassa. Kaksi
 * muuta täkyä ovat maalehdestä ja kaupunkilehden ulkopuolelta.
 * Kaupunkilehden sivun 1 oma visa (Užupisin perustuslaki, js/packs/
 * europe-kulttuuri.js) ja sivun 2 oma tehtävä (kirjankantajien reitti,
 * js/packs/kulttuuri-kategoriat.js) EIVÄT kysy samaa kuin yksikään
 * tämän paketin visa, joten sama kysymys ei tule vastaan kahdesti.
 *
 * OIKEAN VASTAUKSEN PAIKKA VAIHTELEE (docs/moduulit/tarinakaari.md,
 * luku 6 kohta 2). Tämän paketin viisi visaa antavat oikean vastauksen
 * paikoiksi 2, 0, 1, 1 ja 2 — eikä oikea ole yhdessäkään pisin
 * vaihtoehto.
 *
 * ── OMISTAJAN KOLME KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, vilna/avauskuvat).
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── KOHDENOSTOJA EI OLE ────────────────────────────────────────────
 *
 * Kohdenostot tulevat maan omasta luettelosta (esim. js/packs/
 * fokuskohteet-grc.js). Liettualle sellaista tiedostoa ei ole, eikä
 * tämä paketti luo sitä — `kohteet`-kenttä jää siis pois. Jos Fable
 * haluaa Vilnaan kohdenoston, se on oma työnsä ja oma tiedostonsa.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luenta on generoitu 30.8.2026 (tools/generoi-luennat.mjs, lähteenä
 * tämän lohkon oma `matkakirja.luenta`) ja `matkakirja.aanite`
 * osoittaa siihen: assets/audio/puhe-fokus-matkakirja-vilna.mp3.
 * Teksti ja luenta ovat sanasta sanaan samat, joten tekstin muutos
 * vaatii uuden generoinnin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Tähtitornikysymys on Vilnan lehden sivun 2
 * ("Oppi") oman noston "Tähtitorni yliopiston pihan laidalla" tekstiä
 * ja Čiurlionis-kysymys sivun 3 (Liettuan Menovinkit) oman noston
 * "Ciurlionis.eu — maalaukset ja sävellykset samalta mieheltä" ja
 * "Google Arts & Culture — Čiurlionis-museo Kaunasissa" tekstiä
 * (js/packs/kulttuuri-kategoriat.js ja js/packs/maa-kategoriat.js).
 * Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI KIRJANKANTAJIA LEHTITEHTÄVÄÄN: sivun 2 osiolla on jo oma
 * tehtävänsä, joka kysyy juuri sitä, miten liettuankieliset kirjat
 * saatiin maahan. Sama sivu ei saa kysyä samaa asiaa kahdesti, joten
 * AARTEEN AVAUS ottaa saman sivun toisen noston — tähtitornin.
 *
 * MIKSI EI UŽUPISTA: sivun 1 kysymys on Vilnan kulttuurivisa
 * (js/packs/europe-kulttuuri.js), joka kysyy juuri Užupisin
 * perustuslain lupausta koirille, ja js/fokustehtavat.js pukee sen
 * samaksi AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
 */
const TAHTITORNI_VISA = {
  kysymys: 'Vilnan yliopiston sisäpihan laidalla on tähtitorni, joka on '
    + 'Euroopan neljänneksi vanhin. Miltä vuodelta se on?',
  /*
   * VAIHTOEHDOT OVAT SAMANMITTAISET (docs/moduulit/tarinakaari.md, luku
   * 6 kohta 2). Kolme paljasta vuosilukua eivät kerro mitään
   * pituudellaan, eikä kumpikaan väärä ole puolitosi: 1579 on
   * yliopiston perustamisvuosi ja 1904 painokiellon kumoamisvuosi,
   * joten kumpikaan ei liity tähtitorniin — mutta molemmat ovat
   * lehdessä vastaan tulleita vuosia, eli uskottavia.
   */
  vaihtoehdot: [
    'Vuodelta 1579',
    'Vuodelta 1753',
    'Vuodelta 1904',
  ],
  oikea: 1,
  fakta: 'Tähtitornin sai aikaan matematiikan opettaja Tomas Žebrauskas, ja '
    + 'rahat lahjoitti aatelisnainen Elžbieta Oginskienė-Puzynina. '
    + 'Julkisivuun on kaiverrettu latinankielisiä lauseita ja eläinradan '
    + 'merkkejä.',
};

const CIURLIONIS_VISA = {
  kysymys: 'Mikalojus Konstantinas Čiurlionis (1875–1911) ehti runsaassa '
    + 'seitsemässä vuodessa tehdä kahta asiaa lähes yhtä paljon. Mitä?',
  vaihtoehdot: [
    'Veisti patsaita ja rakensi urkuja kirkkoihin',
    'Kirjoitti runoja ja näytelmiä',
    'Maalasi tauluja ja sävelsi musiikkia',
  ],
  oikea: 2,
  fakta: 'Čiurlionis maalasi yli 300 työtä ja sävelsi noin 400 teosta. '
    + 'Kaunasin museo on ainoa paikka maailmassa, jossa hänen tuotantonsa '
    + 'on koossa.',
};

export const FOKUSVIRTA_VILNA = {
  kaupunki: 'vilna',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ilman lisäystä. */
    paikkarivi: 'Vilna, kesäkuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Kaupunki on täynnä kirkkoja kuin lipas helmiä: barokkia joka '
      + 'kadunkulmassa, ja niiden välissä kapeita kujia, joilla myydään '
      + 'meripihkaa ja pyhäinkuvia. Keisarikunnan raja kulkee lännempänä, '
      + 'mutta täällä rukoillaan monella kielellä — puolaksi, liettuaksi, '
      + 'hepreaksi, venäjäksi — ja jokainen pitää kaupunkia omanaan. '
      + 'Katedraalin tornista näin metsää joka suuntaan: tämä maa on metsän '
      + 'sydämeen rakennettu.',
    /*
     * LUENTA = RUUTUTEKSTI SANASTA SANAAN (docs/moduulit/tarinakaari.md,
     * luku 7). Vain tunnetagit on lisätty: kolme tagia, alku ja loppu eri
     * sävyssä. Yksikään sana, välimerkki tai sanajärjestys ei muutu.
     */
    luenta: '[curious] Kaupunki on täynnä kirkkoja kuin lipas helmiä: '
      + 'barokkia joka kadunkulmassa, ja niiden välissä kapeita kujia, '
      + 'joilla myydään meripihkaa ja pyhäinkuvia. [warmly] Keisarikunnan '
      + 'raja kulkee lännempänä, mutta täällä rukoillaan monella kielellä — '
      + 'puolaksi, liettuaksi, hepreaksi, venäjäksi — ja jokainen pitää '
      + 'kaupunkia omanaan. [softly] Katedraalin tornista näin metsää joka '
      + 'suuntaan: tämä maa on metsän sydämeen rakennettu.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-vilna.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * KAANONTEKSTI ON JAETTU KAHTEEN KENTTÄÄN, EI MUUTETTU.
     *
     * Kaanonissa Livialla on yksi teksti, mutta kortti lukee kaksi
     * kenttää (js/fokusvirta.js piirraPollo): `maadoitus` piirtyy
     * kuplan ensimmäiseksi kappaleeksi heti isoisän merkinnän perään ja
     * `teksti` sen jälkeen. tests/fokusvirta.test.mjs vaatii lisäksi
     * jokaiselta fokuskaupungilta oman maadoituksen, joka on yli 120
     * merkkiä eikä ole sama merkkijono kuin huomio.
     *
     * JAKO KULKEE VIRKKEEN RAJAA PITKIN, JA SE ON TOINEN RAJA EIKÄ
     * ENSIMMÄINEN. Pelkkä ensimmäinen virke olisi 121 merkkiä eli tasan
     * rajan tuntumassa; kahden virkkeen maadoitus on turvallisesti yli
     * ja se on myös sisällöllisesti oikea kohta: maadoitus kuittaa
     * merkinnän molemmat havainnot (kirkot ja metsä) ja myöntää isoisän
     * olleen oikeassa, ja `teksti` kääntää katseen katedraaliin, josta
     * oppitunti jatkaa. Yhtäkään sanaa, välimerkkiä tai järjestystä ei
     * ole muutettu — peräkkäin luettuna teksti on sanasta sanaan Fablen
     * kaanonteksti.
     */
    maadoitus: 'Vilnan vanhakaupunki on nykyään maailmanperintöä juuri '
      + 'niiden kirkkojen takia, ja kieliä kuulee kaduilla edelleen monta.. '
      + 'Se metsä joka suuntaan pitää myös yhä paikkansa — Liettua on '
      + 'Euroopan metsäisimpiä maita.',
    teksti: 'Katedraali seisoo paikallaan, ja sen alla on jotain mistä '
      + 'isoisäsi ei tiennyt puoliakaan. Mennään katsomaan.',
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, vilna/avauskuvat, heroerä 31): Gediminaan torni
     * kukkulallaan ja sen alla vanhakaupunki. Juuri se vanhakaupunki,
     * josta Livian maadoitus puhuu. Selite on lehden omasta selitteestä
     * lyhentäen, ja kaikki sen luvut ovat lehden aineistoa.
     *
     * MIKSI EI KATEDRAALIHEROA: lehdessä on myös hero-vilna-aamu.jpg,
     * jossa on tuomiokirkko. Se jätetään tästä pois, koska oppitunnin
     * kuva on katedraali — kahta katedraalikuvaa peräkkäin ei anneta.
     */
    kuva: {
      ampari: 'herokoe/hero-vilna-gediminas.jpg',
      selite: 'Gediminaan torni on ainoa jäljellä oleva osa Vilnan '
        + 'ylälinnasta, ja nykyinen tiilitorni on 1400-luvun puolivälistä.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: se on tämän kaupungin oma 1873-ankkuri
       * (docs/moduulit/tarinakaari.md, luku 3). Isoisä kirjasi, että
       * täällä rukoillaan monella kielellä — ja yhtä niistä ei sinä
       * kesänä saanut painaa latinalaisin kirjaimin missään päin
       * keisarikuntaa. Kielto oli hänen käydessään yhdeksättä vuottaan
       * voimassa.
       *
       * FAKTAT: js/packs/kulttuuri-kategoriat.js, vilna/oppi, nosto
       * "Kirjat kannettiin rajan yli selässä" (jo hyväksyttyä pelidataa)
       * — kielto 1864, painatus Itä-Preussissa ja Amerikassa asti,
       * knygnešiai, yölliset metsäpolut, sakot, vankila tai karkotus
       * Siperiaan, kielto kumottiin 1904.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Knygnešys": kielto oli voimassa 1864–1904;
       *     kuvernööri Mihail Muravjov määräsi 1864, että liettuan
       *     aapiset painetaan vain kyrillisin kirjaimin; koko kauden
       *     aikana kyrillisiä liettuankielisiä kirjoja ilmestyi noin
       *     viisikymmentäviisi; Itä-Preussissa painettiin 1864–1896
       *     yli 3,5 miljoonaa kappaletta liettuankielisiä julkaisuja,
       *     niistä noin 500 000 aapista; kiellon viimeisinä vuosina
       *     rajan yli kannettiin arviolta 30 000–40 000 kirjaa vuodessa
       *     ja niistä noin kolmasosa takavarikoitiin; Jurgis Bielinis
       *     syntyi 16. maaliskuuta 1846 ja päivää vietetään
       *     kirjankantajan päivänä.
       *   - en-Wikipedia "Lithuanian press ban": kielto syntyi
       *     hallinnollisena määräyksenä 1864 ja kumottiin 24.
       *     huhtikuuta 1904; kyrillisin kirjaimin painettu liettua oli
       *     sallittua ja jopa suosittua venäläistämispolitiikassa;
       *     painaminen järjestettiin keisarikunnan ulkopuolelle
       *     pääosin Vähä-Liettuaan eli Itä-Preussiin ja
       *     Yhdysvaltoihin; historioitsija Edvardas Gudavičius on
       *     kuvannut kieltoa Liettuan käsitteen koetinkiveksi.
       *
       * KAKSI ALKUVUOTTA, JA MOLEMMAT OVAT LÄHTEISSÄ. Knygnešys-artikkeli
       * sanoo 1864, painokieltoartikkelin johdanto 1865 ja sen oma
       * historiaosa 1864. Kyse on siitä, lasketaanko alku hallinnollisesta
       * määräyksestä vai sitä seuranneesta täydestä kiellosta. Teksti
       * kertoo tämän eikä valitse toista pois.
       *
       * MITÄ EI KERROTA: en-Wikipedia mainitsee, että osa kantajista
       * ammuttiin rajalla. Se jää pois — peliin ei kirjoiteta
       * sotasisältöä eikä ihmisten julmuutta (tarinakaari, luku 2), ja
       * pelin oma nosto listaa rangaistuksiksi sakot, vankilan ja
       * karkotuksen.
       */
      id: 'knygnesiai',
      nappi: 'Kirjat, jotka kulkivat selässä yöllä',
      otsikko: 'Kirjankantajat',
      teksti: 'Isoisäsi kuuli tässä kaupungissa neljää kieltä, ja yksi '
        + 'niistä oli sinä kesänä kielletty painokoneesta. Vuonna 1864 '
        + 'keisarikunta määräsi, että liettuaa ei saa painaa latinalaisin '
        + 'kirjaimin — kyrillisin sai, ja siihen jopa kannustettiin. '
        + 'Lähteet aloittavat kiellon vuodesta 1864 tai 1865 sen mukaan, '
        + 'lasketaanko alku hallinnollisesta määräyksestä vai sitä '
        + 'seuranneesta täydestä kiellosta; sitä ei kannata pyöristää, '
        + 'koska kyse oli juuri siitä, ettei kieltoa koskaan säädetty '
        + 'laiksi. Se ei toiminut. Kirjoja alettiin painaa rajan takana '
        + 'Itä-Preussissa ja aina Amerikassa asti, ja niitä kannettiin '
        + 'takaisin. Kantajia sanottiin knygnešiai, kirjankantajat: he '
        + 'kulkivat öisin metsäpolkuja säkit selässä, ja kiinni jäänyt sai '
        + 'sakot, vankeutta tai karkotuksen Siperiaan. Määrät kertovat, '
        + 'miten laajaksi se kasvoi. Itä-Preussissa painettiin vuosina '
        + '1864–1896 yli kolme ja puoli miljoonaa kappaletta '
        + 'liettuankielisiä julkaisuja, niistä noin puoli miljoonaa '
        + 'aapisia. Kiellon viimeisinä vuosina rajan yli kannettiin '
        + 'arviolta kolmestakymmenestä neljäänkymmeneen tuhanteen kirjaa '
        + 'vuodessa, ja niistä noin kolmasosa jäi viranomaisille. '
        + 'Kyrillisin kirjaimin painettuja liettuankielisiä kirjoja '
        + 'ilmestyi koko neljänkymmenen vuoden aikana viitisenkymmentä. '
        + 'Kielto kumottiin 24. huhtikuuta 1904, ja se oli saanut aikaan '
        + 'täsmälleen päinvastaista kuin oli tarkoitettu: sen sijaan että '
        + 'kieli olisi kadonnut, sen ympärille syntyi järjestäytynyt ja '
        + 'hyvin harjoitellut vastarinta. Kirjankantajan päivää vietetään '
        + '16. maaliskuuta, kuuluisimman kantajan Jurgis Bielinisin '
        + 'syntymäpäivänä.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto vilna/oppi,
       * js/packs/kulttuuri-kategoriat.js) — siis jo kertaalleen
       * tarkistettu ja hyväksytty. Commons 29.8.2026: 1536×2048, public
       * domain, tekijä tuntematon, kuvaus "Lithuanian book carrier Kazys
       * Ūdra (1857–1937)", ajoitus "ca 1900s". Restrictions tyhjä.
       * SILMÄTARKISTUS TEHTY (960 px): yksittäisen miehen muotokuva
       * ateljeessa, ei nykyihmisiä eikä tunnistettavia sivullisia.
       */
      kuva: {
        tiedosto: 'Lithuanian book carrier Kazys Ūdra (1857–1937).jpg',
        selite: 'Kazys Ūdra (1857–1937) oli knygnešys eli kirjankantaja, '
          + 'joka kuljetti kiellettyjä liettuankielisiä kirjoja rajan yli '
          + 'selässään.',
        lahde: 'Tuntematon valokuvaaja, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mitä keisarikunta kielsi liettuan kieleltä vuonna 1864?',
        vaihtoehdot: [
          'Kielen puhumisen kokonaan',
          'Kirjojen myymisen kaikilla markkinoilla',
          'Latinalaisten kirjainten käytön',
        ],
        oikea: 2,
        fakta: 'Kyrillisin kirjaimin painaminen oli sallittua ja siihen jopa '
          + 'kannustettiin, mutta koko neljänkymmenen vuoden aikana '
          + 'kyrillisiä liettuankielisiä kirjoja ilmestyi vain '
          + 'viitisenkymmentä. Kielto kumottiin 24. huhtikuuta 1904.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän ensimmäinen virke on barokista joka
       * kadunkulmassa. Tämä on sen ääripää — kirkko, jossa koristelu ei
       * ole kullattu vaan valkoinen, ja jonka rakennuttaja jätti
       * itsestään jälkeen yhden lauseen ja hautakiven väärään paikkaan.
       * Kirkko oli isoisän käydessä jo lähes kaksisataa vuotta vanha.
       *
       * FAKTAT: js/packs/kulttuuri-kategoriat.js, vilna/avauskuvat (jo
       * hyväksyttyä pelidataa) — Antakalnisin Pyhien Pietarin ja Paavalin
       * kirkon rakennutti hetmani Michał Kazimierz Pac, ja holveissa on
       * noin kaksituhatta Giovanni Pietro Pertin veistämää stukkohahmoa.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Church of St. Peter and St. Paul, Vilnius":
       *     kirkon suunnitteli ja rakensi krakovalainen Jan Zaor;
       *     sisätilassa on noin 2000 Giovanni Pietro Pertin
       *     stukkohahmoa ja Giovanni Maria Gallin ornamentiikkaa;
       *     rahoittaja oli Liettuan suurhetmani ja Vilnan vojevodi
       *     Michał Kazimierz Pac; työt alkoivat 29. kesäkuuta 1668 ja
       *     valmistuivat 1676 Giovanni Battista Frediania johdolla;
       *     Pac ei koskaan mennyt naimisiin ja aikoi kirkosta suvun
       *     mausoleumin; oman toiveensa mukaan hänet haudattiin
       *     pääoven kynnyksen alle ja kiveen hakattiin Hic Jacet
       *     Peccator; 1700-luvun lopulla salama pudotti veistoksen,
       *     joka halkaisi kiven, ja kivi on nykyään pääoven vieressä
       *     seinällä; kirkko vihittiin 1701 ja viimeiset
       *     koristelutyöt valmistuivat 1704.
       *   - Pelin oma, jo hyväksytty avauskuvan selite (kulttuuri-
       *     kategoriat.js, vilna), joka kertoo saman rakennuttajan,
       *     saman veistäjän ja saman hahmomäärän.
       *
       * MITÄ EI KERROTA: kirkon rakentamisen sotataustaa (lähde
       * kertoo sen) ei ole tässä. Peliin ei kirjoiteta sotasisältöä
       * (tarinakaari, luku 2), eikä täky tarvitse sitä — sen aihe on
       * kaksituhatta hahmoa ja yksi hautakivi.
       */
      id: 'barokki',
      nappi: 'Kirkko, jossa on kaksituhatta valkoista hahmoa',
      otsikko: 'Antakalnisin valkoinen kirkko',
      teksti: 'Kaupungin barokkikirkoista äärimmäisin on Antakalnisissa: '
        + 'Pyhien apostolien Pietarin ja Paavalin kirkko, jonka suunnitteli '
        + 'ja rakensi krakovalainen Jan Zaor. Työt alkoivat kesäkuun 29. '
        + 'päivänä 1668 — apostolien juhlapäivänä — ja valmistuivat '
        + 'kahdeksassa vuodessa. Rahat pani Liettuan suurhetmani ja Vilnan '
        + 'vojevodi Michał Kazimierz Pac, joka haki italialaiset Giovanni '
        + 'Pietro Pertin ja Giovanni Maria Gallin tekemään sisustuksen. '
        + 'Tulos on koko Euroopassa ainutlaatuinen: holveissa ja seinillä '
        + 'on noin kaksituhatta Pertin veistämää stukkohahmoa, ja ne ovat '
        + 'valkoisia. Ei kultausta, ei väriä — pelkkää kipsiä, ja valo '
        + 'tekee lopun työstä. Kirkko vihittiin 1701 ja viimeiset '
        + 'koristelutyöt saatiin valmiiksi 1704, joten isoisäsi käveli sen '
        + 'ohi rakennuksen ollessa jo lähes kahdensadan vuoden ikäinen. '
        + 'Kannattaa katsoa myös alaspäin. Pac ei mennyt koskaan naimisiin '
        + 'ja aikoi kirkosta sukunsa mausoleumin, mutta itsensä hän '
        + 'määräsi haudattavaksi pääoven kynnyksen alle, siihen kohtaan '
        + 'jonka yli jokainen kävijä astuu. Kiveen hakattiin latinaksi '
        + 'Hic Jacet Peccator, tässä lepää syntinen. Sata vuotta myöhemmin '
        + 'salama pudotti kirkosta veistoksen, joka putosi juuri sille '
        + 'kivelle ja halkaisi sen — mistä kaupungissa riitti puhetta '
        + 'pitkäksi aikaa. Kivi on nykyään nostettu pääoven viereen '
        + 'seinälle.',
      /*
       * Commons 29.8.2026: 5679×3775, CC BY-SA 4.0, Scotch Mist, kuvattu
       * 7.6.2018, osa saman kuvaajan Vilna-sarjaa. Restrictions tyhjä.
       * SILMÄTARKISTUS TEHTY (960 px): kirkon holvikatto alaviistosta,
       * valkoista stukkoa reunasta reunaan ja keskellä yksi maalattu
       * kattopaneeli. Ei ihmisiä.
       *
       * MIKSI JUURI HOLVIKUVA: täyn koko aihe on se, mitä katon alla on.
       * Saman kuvaajan julkisivukuva (…Church 03.jpg) näyttäisi
       * tavalliselta kaksitorniselta kirkolta eikä kertoisi mitään
       * kahdestatuhannesta hahmosta.
       *
       * SELITE PUHUU STUKOSTA, EI KOKO KATOSTA. Kuvassa on keskellä
       * maalattu kattopaneeli, joka ei ole stukkohahmo; siksi selite
       * sanoo valkoisiksi nimenomaan stukkohahmot eikä kattoa.
       */
      kuva: {
        tiedosto: 'Vilnius Sts Peter et Paul Church 05.jpg',
        selite: 'Pyhien Pietarin ja Paavalin kirkon holveissa on noin '
          + 'kaksituhatta stukkohahmoa, ja ne ovat kaikki valkoisia.',
        lahde: 'Scotch Mist, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Mihin kirkon rakennuttaja Michał Kazimierz Pac määräsi '
          + 'itsensä haudattavaksi?',
        vaihtoehdot: [
          'Pääoven kynnyksen alle',
          'Kotikartanonsa kappeliin Antakalnisissa',
          'Pääalttarin taakse omaan hautakammioonsa',
        ],
        oikea: 0,
        fakta: 'Hautakiveen hakattiin latinaksi Hic Jacet Peccator, tässä '
          + 'lepää syntinen. 1700-luvun lopulla salama pudotti kirkosta '
          + 'veistoksen, joka halkaisi kiven; nykyään kivi on pääoven '
          + 'vieressä seinällä.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkintä mainitsee kujat, joilla myydään
       * meripihkaa. Isoisä kirjasi sen kauppatavarana; tämä kertoo, mitä
       * se oikeasti on. Se on myös erän ainoa kohta, jossa pelaaja saa
       * kokeiltavan tempun — ja erän kevyt loppuvitsi on siinä, että
       * maan kuuluisin meripihkapala on varastettu kahdesti.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, LTU/luonto, nostot "Kivi,
       * joka kelluu suolavedessä" (jo hyväksyttyä pelidataa) — meripihka
       * on havupuiden pihkaa, kovettunut kymmeniä miljoonia vuosia
       * sitten, myrsky heittää sitä rannalle, sisällä näkyy joskus
       * hyönteinen tai kasvinlehti, ja Palangan museossa on pala nimeltä
       * Meripihkan aurinko, joka painaa noin kolme ja puoli kiloa.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Amber": meripihka on fossiloitunutta puun
       *     pihkaa; ominaispaino 1,06–1,10, ja Itämeren sukkiniitin
       *     1,05–1,10; meripihka on vettä tiheämpää ja kelluu vain
       *     väkevässä suolaliuoksessa; Itämeren meripihka erottuu
       *     meripihkahaposta, mistä nimi sukkiniitti; sisään on
       *     joskus jäänyt eläin- tai kasviainesta.
       *   - en-Wikipedia "Palanga Amber Museum": kokoelmassa on noin
       *     28 000 palaa, joista noin 15 000:ssa on sisällä hyönteinen,
       *     hämähäkki tai kasvi, ja esillä on noin 4500; alueen
       *     meripihka syntyi Fennoskandiasta virranneiden jokien
       *     suistokerrostumissa eoseenikaudella noin 40–45 miljoonaa
       *     vuotta sitten; museossa on Euroopan kolmanneksi suurin
       *     meripihkapala "Sun Stone", 210 × 190 × 150 mm ja 3526
       *     grammaa, ja se on varastettu kahdesti; Palanga oli
       *     1700-luvun loppuun mennessä keisarikunnan
       *     meripihkateollisuuden keskus, ja ennen ensimmäistä
       *     maailmansotaa siellä käsiteltiin noin 2000 kiloa raakaa
       *     meripihkaa vuodessa.
       *
       * KAKSI NIMEÄ SAMALLE PALALLE, JA MOLEMMAT SANOTAAN. Pelin oma
       * nosto ja Commonsin kuvaus sanovat Meripihkan aurinko (Amber
       * Sun / Sun of Amber), en-Wikipedian museoartikkeli Sun Stone.
       * Paino on molemmissa sama, joten kyse on käännösnimestä eikä
       * kahdesta esineestä.
       *
       * TARKENNUS, EI RISTIRIITA: pelin oma nosto sanoo, että kevyimmät
       * palat kelluvat suolaisessa vedessä. Se pitää paikkansa
       * väkevässä suolaliuoksessa; Itämeri itse on siihen liian
       * makeaa, ja rannalle pala nousee siksi, että se on lähes veden
       * painoista ja myrsky jaksaa nostaa sen pohjasta. Teksti sanoo
       * asian tässä muodossa eikä väitä pelin omaa nostoa vääräksi.
       */
      id: 'meripihka',
      nappi: 'Kivi, joka ei ole kivi',
      otsikko: 'Meripihka',
      teksti: 'Isoisäsi näki kujilla meripihkaa ja kirjasi sen kauppatavarana. '
        + 'Se ei ole kivi. Meripihka on havupuun pihkaa, joka valui '
        + 'rungosta eoseenikaudella noin neljäkymmentäviisi miljoonaa vuotta '
        + 'sitten, kulkeutui jokien mukana suistoon ja kovettui hiekan alla '
        + 'kiven kaltaiseksi. Sisään jäi joskus hyönteinen, hämähäkki tai '
        + 'kasvinlehti, ja se näkyy edelleen kuin ikkunan takana. Itämeren '
        + 'meripihkalla on oma nimensä, sukkiniitti, koska siitä saadaan '
        + 'meripihkahappoa. Yksi tuntomerkki on kokeiltavissa vieläkin. '
        + 'Meripihkan ominaispaino on noin 1,05–1,10, eli se on hivenen '
        + 'vettä painavampaa: makeaan veteen se uppoaa, mutta väkevässä '
        + 'suolaliuoksessa se nousee pintaan, kun taas tavallinen kivi jää '
        + 'pohjaan. Sama keveys selittää sen, miksi meripihkaa etsitään '
        + 'rannalta juuri myrskyn jälkeen: aallot jaksavat nostaa sen '
        + 'pohjasta mukaansa. Palangassa on museo, jonka kokoelmassa on '
        + 'noin kaksikymmentäkahdeksantuhatta palaa ja niistä noin '
        + 'viidessätoistatuhannessa on jotain sisällä. Kuuluisin niistä on '
        + 'Meripihkan aurinko: kaksikymmentäyksi senttiä leveä ja runsaat '
        + 'kolme ja puoli kiloa painava möhkäle, Euroopan kolmanneksi '
        + 'suurin. Se on varastettu museosta kahdesti ja palautettu '
        + 'kahdesti.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto LTU/luonto,
       * js/packs/maa-kategoriat.js) — jo kertaalleen tarkistettu ja
       * hyväksytty. Commons 29.8.2026: 1024×768, CC BY-SA 2.0, Beny
       * Shlevich, kuvattu 27.7.2005, kuvauksessa mitat 210×190×150 mm ja
       * paino, sekä maininta Palangan museosta. Restrictions tyhjä.
       * SILMÄTARKISTUS TEHTY (960 px): yksittäinen meripihkamöhkäle
       * vitriinissä, ei ihmisiä.
       *
       * COMMONSIN KUVAUKSESSA ON YKSIKKÖVIRHE: siinä lukee "3,526 kg",
       * kun museon ja en-Wikipedian luku on 3526 grammaa. Selite ja
       * teksti käyttävät oikeaa lukua.
       */
      kuva: {
        tiedosto: 'Sun of Amber.jpg',
        selite: 'Palangan meripihkamuseon Meripihkan aurinko painaa 3526 '
          + 'grammaa ja on Euroopan kolmanneksi suurin meripihkapala.',
        lahde: 'Beny Shlevich, Wikimedia Commons (CC BY-SA 2.0)',
      },
      visa: {
        kysymys: 'Meripihkaa on vanhastaan koeteltu pudottamalla pala '
          + 'väkevään suolaveteen. Mitä siinä katsotaan?',
        /*
         * PISIN VAIHTOEHTO ON VÄÄRÄ (tarinakaari, luku 6 kohta 2).
         * Pituudet ovat 45 / 42 / 36 merkkiä, ja oikea on keskimmäinen.
         */
        vaihtoehdot: [
          'Puhdistuuko pinnalta hiekka ja levän jäänteet',
          'Nouseeko pala pintaan, kuten kivi ei nouse',
          'Muuttuuko väärennöksen väri sameaksi',
        ],
        oikea: 1,
        fakta: 'Meripihkan ominaispaino on noin 1,05–1,10, joten se uppoaa '
          + 'makeaan veteen mutta nousee väkevässä suolaliuoksessa. '
          + 'Palangan museon kokoelmassa on noin 28 000 palaa, ja niistä '
          + 'noin 15 000:ssa on sisällä hyönteinen, hämähäkki tai kasvi.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa kohtaamisen: kirjansitoja Rasa haluaa tietää, tunteeko
   * vieras sen, mitä tässä kaupungissa tehdään liian arvokkaalle.
   * Visasääntö täyttyy — vastaus on tekstissä, mutta kysymyksen
   * sanamuotoa ei ole kirjoitettu tähän sellaisenaan.
   *
   * OPPITUNTI KERTOO MAAN ISON AARTEEN KOKONAAN (omistajan aallon 4B
   * tilaus): Vilnan katedraalin kätkö saa tässä myös löytövuotensa.
   * AARREMERKINTÄ EI SAA SITÄ — merkintä on isoisän ääni vuodelta 1873
   * eikä hän voinut tietää, milloin seinä avataan. Ero on tarkoitettu.
   *
   * FAKTAT: js/packs/paikallisaarteet.js, LTU/isoAarre (jo hyväksyttyä
   * pelidataa) — kirkkoaarteet piiloon 1939 sodan lähestyessä, kätkö
   * löytyi 1985 korjaustöissä, neuvostoaikana löydöstä vaiettiin, ja
   * kalkit, monstranssit ja reliikkirasiat tulivat yleisön nähtäville
   * vasta itsenäistymisen jälkeen. Lisäksi js/packs/nahtavyysjutut.js
   * (Vilnan tuomiokirkko) ja js/packs/kulttuuri-kategoriat.js,
   * vilna/avauskuvat — nykyinen asu 1779–1783, sisustus 1801,
   * kellotapulin alin kerros 1200-luvun puolivälistä.
   *
   * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
   * riippumattomasta lähteestä):
   *   - en-Wikipedia "Vilnius Cathedral": paikalla on ollut kirkko
   *     1200-luvulta; Vytautaksen goottilaisen kirkon seinät ja pilarit
   *     ovat yhä pystyssä nykyisen rakennuksen sisällä; kellotapuli
   *     muurattiin 1522 Alalinnan puolustustornin päälle; kryptat ja
   *     kappelit lisättiin 1534–1557; eteläinen torni sortui 1769 ja
   *     vei kuusi ihmistä mukanaan, minkä jälkeen piispa Ignacy Jakub
   *     Massalski määräsi kirkon rakennettavaksi uudelleen; työt
   *     1779–1783 Laurynas Gucevičiuksen suunnitelmien mukaan,
   *     sisustus valmis 1801; neuvostoaikana kirkosta tehtiin varasto,
   *     messut alkoivat uudelleen 1988 ja katedraalin asema
   *     palautettiin 1989; tammikuussa 1989 katedraalin seinästä
   *     löytyivät Albertas Goštautasin jäännökset.
   *   - lt-Wikipedia "Bažnytinio paveldo muziejus": museon ekspositio
   *     rakentuu Vilnan arkkikatedraalin lobynas-aarteen ympärille;
   *     toisen maailmansodan kynnyksellä piilotetut arvoesineet
   *     löytyivät sattumalta vuonna 1985 rakennuksen korjaustöissä;
   *     esineet kirjattiin ja luovutettiin Liettuan taidemuseolle;
   *     restituutiolaki hyväksyttiin 15. helmikuuta 2005, museo
   *     perustettiin arkkipiispan dekreetillä 2005 ja ekspositio
   *     avattiin yleisölle 2009; aarretta on kartutettu 1300-luvulta
   *     lähtien ja ensimmäiset liturgiset astiat ja juhlapuvut
   *     lahjoittivat Jogaila ja Vytautas Suuri.
   *   - lt-Wikipedia "Słowo": juuri tämän vilnalaisen puolankielisen
   *     päivälehden 9. syyskuuta 1939 päivätyillä sivuilla peitettiin
   *     katedraalin holvien nišaan piilotettu aarre.
   *
   * KAKSI SANAMUOTOA PIILOPAIKALLE, EIKÄ NIITÄ SULATETA YHDEKSI. Pelin
   * oma aarretieto sanoo, että aarre muurattiin seinän onkaloon;
   * lt-Wikipedia sanoo nišan katedraalin holveissa. Kyse on saman
   * paikan kahdesta kuvauksesta — holvien seinässä oleva syvennys —
   * joten teksti sanoo sen niin, että molemmat pitävät paikkansa.
   */
  oppitunti: {
    otsikko: 'Mitä katedraalin seinä piti',
    teksti: 'Isoisäsi kiipesi katedraalin torniin katsomaan metsää. Hänen '
      + 'allaan oli rakennus, joka on koko ikänsä säilyttänyt asioita '
      + 'seinissään. Paikalla on ollut kirkko 1200-luvulta lähtien, ja '
      + 'jokainen tulipalo on jättänyt seuraavalle jotain: Vytautaksen '
      + '1400-luvun goottilaisen kirkon seinät ja pilarit ovat yhä '
      + 'pystyssä nykyisen rakennuksen sisällä, kellotapulin alin kerros on '
      + 'vanha Alalinnan puolustustorni, jonka päälle tapuli muurattiin '
      + '1522, ja kryptat kaivettiin 1534–1557. Sen ulkoasun, jonka isoisäsi '
      + 'näki, kirkko sai vasta vähän aikaisemmin: eteläinen torni sortui '
      + '1769 ja vei kuusi ihmistä mukanaan, ja piispa Ignacy Jakub '
      + 'Massalski määräsi kirkon rakennettavaksi uudelleen. Työt tehtiin '
      + '1779–1783 Laurynas Gucevičiuksen suunnitelmien mukaan ja sisustus '
      + 'valmistui 1801. Kirkolla on myös aarre, ja se on vanhempi kuin '
      + 'yksikään sen seinä: kirkon esineistöä on kartutettu 1300-luvulta '
      + 'lähtien, ja ensimmäiset liturgiset astiat ja kalliit puvut '
      + 'lahjoittivat Jogaila ja Vytautas Suuri. Syksyllä 1939, kun sota '
      + 'lähestyi, se aarre vietiin katedraalin holveihin ja suljettiin '
      + 'seinän syvennykseen. Niša peitettiin sanomalehden sivuilla, ja '
      + 'lehti oli vilnalainen Słowo, päiväys yhdeksäs syyskuuta 1939. '
      + 'Sitten se unohtui. Kirkosta tehtiin neuvostoaikana varasto, messut '
      + 'alkoivat uudelleen vasta 1988 ja katedraalin asema palautettiin '
      + '1989. Kätkö löytyi tätä ennen, vuonna 1985, ja täysin '
      + 'sattumalta — rakennuksen korjaustöissä. Löydöstä vaiettiin; '
      + 'esineet kirjattiin ja luovutettiin taidemuseolle. Kalkit, '
      + 'monstranssit ja reliikkirasiat tulivat yleisön nähtäville vasta '
      + 'itsenäistymisen jälkeen, ja niitä varten perustettiin 2005 oma '
      + 'museonsa, joka avasi ovensa 2009. Ja jotta talo ei jäisi ilman '
      + 'viimeistä sanaa: tammikuussa 1989, kun kätköstä oli kulunut neljä '
      + 'vuotta, katedraalin seinästä löytyi vielä yhden 1500-luvun '
      + 'kanslerin jäännökset. Isoisäsi kiipesi tornissa hyvin lähellä '
      + 'kaikkea tätä, eikä tiennyt siitä puoliakaan.',
    /*
     * Kuva on pelin omasta aineistosta (js/packs/nahtavyysjutut.js,
     * Vilnan tuomiokirkko) — jo kertaalleen tarkistettu ja hyväksytty.
     * Commons 29.8.2026: 728×493, public domain, Baranowski, kuvaus
     * "Vilnius Cathedral; woodcut", ajoitus noin 1871. Restrictions
     * tyhjä. SILMÄTARKISTUS TEHTY (960 px, kuva on itse pienempi):
     * puupiirros katedraalin julkisivusta, taustalla Gediminaan kukkula
     * linnanraunioineen, etualalla muutama pieni ihmishahmo — piirros,
     * ei tunnistettavia kasvoja.
     *
     * MIKSI JUURI TÄMÄ KUVA: se on ISOISÄN OMA NÄKYMÄ. Piirros on
     * ajoitettu noin vuoteen 1871, eli kaksi vuotta ennen hänen
     * käyntiään, ja siinä näkyy sama uusklassinen julkisivu ja katolla
     * vielä ne kolme kivipatsasta, jotka purettiin 1950 ja palasivat
     * paikoilleen 1997. Valokuvaa tältä ajalta ei Commonsissa ole.
     *
     * SELITE SANOO, ETTÄ KYSE ON PIIRROKSESTA. Kuva on puupiirros eikä
     * valokuva, ja se on kortissa oppitunnin ainoa kuva — jos selite
     * vaikenisi siitä, kortti näyttäisi tarjoavan valokuvaa
     * 1870-luvulta.
     *
     * KUVA ON PIENI (728×493). Se on tämän rakennuksen paras
     * aikalaiskuva Commonsissa; jos kortti tarvitsee ison kuvan,
     * vaihtoehto on nykyvalokuva 'Vilnius (Wilno) - cathedral.jpg'
     * (CC BY-SA 3.0, Pudelek), joka on myös jo pelidatassa — mutta se
     * näyttää talon nykykunnossa eikä isoisän silmin.
     */
    kuva: {
      tiedosto: 'Vilnius Cathedral in the 19th c.jpg',
      selite: 'Puupiirros Vilnan katedraalista noin vuodelta 1871: katolla '
        + 'seisovat vielä ne kolme kivipatsasta, jotka purettiin 1950 ja '
        + 'palasivat paikoilleen vasta 1997.',
      lahde: 'Baranowski, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * Vilnalla on pelin vanhassa polussa saapumisteksti mutta ei
   * kohtaamista (js/packs/kohtaamiset.js ei tunne kaupunkia), joten
   * tässä ei ole mitään toistettavaa eikä mitään rikottavaa — ja siksi
   * tämä on EHDOTUS eikä vientiä. Hahmo, sävy ja lupaus ovat
   * kirjoitettavissa yli; kortti on tässä muodossa, jotta se voidaan
   * lukea sellaisena kuin pelaaja sen näkisi. VARSINAINEN KYSYMYS ei ole
   * tässä eikä kuulu tähän tiedostoon: se on laattamekaniikan puolella.
   *
   * KUVAA EI OLE (ohjeen mukaisesti). Moottori piirtää kohtaamiskortin
   * ilman kuvaa aivan kuten Tallinnassa, Tukholmassa ja Riiassa.
   *
   * MITÄ LUONNOS YRITTÄÄ (docs/moduulit/tarinakaari.md, luku 3 ja 5):
   *   - ÄÄNIPROFIILI on EPÄUSKOINEN — Rasa pitää sukunsa tarinaa
   *     satuna, mutta kirja on hänen kädessään.
   *   - VARALLISUUSSÄÄNTÖ: isoisä ei maksanut mitään eikä käskenyt
   *     ketään. Hän piirsi yhden kartan kiitokseksi yösijasta
   *     (tarinakaari, luku 2: "kartta kiitokseksi yösijasta"). Suvun
   *     oma syy kirjan säilyttämiseen on ammattiylpeys — sitomo on
   *     korjannut saman kirjan selän sukupolvi toisensa jälkeen —
   *     ei Foggin toivomus.
   *   - LUPAUS, JONKA AARRETEKSTIN ON LUNASTETTAVA: kirja avataan
   *     siltä aukeamalta, jossa on vieras käsiala.
   *   - EI SPOILERIA: kortti ei mainitse katedraalia, kätköä eikä
   *     vuotta 1939, vaikka oppitunti on juuri niistä.
   */
  kohtaaminen: {
    hahmo: 'Kirjansitoja Rasa',
    nappi: 'Tapaa kirjansitoja',
    varmistus: 'Haluatko varmasti tavata Rasan juuri nyt?',
    /*
     * VIHJELINKIN OSIO: kaupunkilehden osion id (js/packs/
     * kulttuuri-kategoriat.js). Vilnan lehdessä on kaksi osiota,
     * 'kaupunki' ("Vilna") ja 'oppi'. Rasan kysymys koskee sitä, mitä
     * tässä kaupungissa tehdään liian arvokkaalle, ja lähin tuki sille
     * on Oppi-osiossa: sen kirjankantajajuttu kertoo, mitä tehtiin
     * kielletylle kirjalle, ja yliopistojuttu siitä, mitä holvikäytävien
     * taakse on aikojen kuluessa jäänyt. Vastausta ne eivät anna, vaan
     * nyökkäävät suuntaan.
     */
    vihjeOsio: 'oppi',
    teksti: 'Rasan sitomo on vanhassakaupungissa kahden portin välissä, ja '
      + 'pöydällä on puristin, joka on vanhempi kuin talo. Suvussa on '
      + 'säilynyt yksi pieni rukouskirja, jonka selkä on paksumpi kuin '
      + 'sivunippu: sama sitomo on avannut ja ommellut sen uudelleen niin '
      + 'monta kertaa, että jokainen sukupolvi on jättänyt siihen oman '
      + 'kerroksensa lankaa. Rasa sanoo suoraan pitävänsä sukunsa tarinaa '
      + 'satuna — esi-isän kerrotaan kantaneen kirjoja öisin metsäpolkuja '
      + 'pitkin, mutta tarinassa ei ole nimeä eikä vuotta, vain kirja. '
      + 'Etulehdellä on silti vieras käsiala: joku ulkomaalainen on '
      + 'piirtänyt siihen kartan kaupungista joen kahlaamolle, mittakaava '
      + 'mukana, ja kirjannut alle kiitoksen yösijasta. Kirjan Rasa kyllä '
      + 'ottaa esiin. Mutta ei ennen kuin vieras osoittaa tietävänsä, mitä '
      + 'tässä kaupungissa on tapana tehdä sille, mikä on liian arvokasta '
      + 'menetettäväksi.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: VILNAN VANHAKAUPUNKI. Rasan sitomo on siellä, ja
   * kaupunkilehden molemmat osiot osoittavat saman alueen.
   *
   * KOORDINAATIT LUETAAN LAUDALTA EIKÄ PROJEKTIOSTA — SAMA PERUSTELTU
   * POIKKEUS KUIN TALLINNASSA JA RIIASSA. Vilnan katedraaliaukion
   * todellinen paikka on 54,68583333 N / 25,28777778 E, joka Euroopan
   * laudan kaavalla (x = (lon + 11) × 19,2, y = (72 − lat) × 26,3)
   * osuisi pisteeseen 696,7 / 455,4 ja maailmankartalla (Millerin
   * lieriö, LEVEYS 12000 / LON0 −175 / POHJOINEN 76) pisteeseen
   * 6676,3 / 1180,3. Vilnan LAATTA on kuitenkin Euroopan laudalla
   * kohdassa 703 / 470 (js/packs/europe.js) ja maailmankartalla
   * 6687,2 / 1205,9 (js/packs/maailmankartta.js), koska Baltian
   * kaupungit on siirretty laudan vähimmäisetäisyyden takia.
   *
   * Projektiopiste veisi vihreän pisteen noin 16 yksikköä laatasta
   * lounaaseen — juuri ja juuri yli PISTE_ERO_MINin, eli piirto ei edes
   * siirtäisi sitä, ja piste jäisi keskelle tyhjää kaupungin
   * lounaispuolelle. Piste ottaa siksi kaupungin laattapaikan, ja
   * piirtopuoli siirtää sen koilliseen laatan vierestä (js/fokuspiste.js
   * PISTE_ERO_MIN). Vanhakaupunki on kaupungin keskellä, joten
   * laattapaikka on tässä nimenomaan oikeampi kuin tarkka koordinaatti.
   */
  kohtaamispiste: {
    nimi: 'Vanhankaupungin kirjansitomo',
    laudat: {
      maailmankartta: { x: 6687.2, y: 1205.9 },
      europe: { x: 703, y: 470 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Vilnan sivupino (js/lehti.js
   * rakennaSivut) on Riian mittainen, koska kaupungilla on kaksi
   * kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Vilna", 2 = Oppi, 3 = Menovinkit.
   *
   * Sivun 1 kysymys on Vilnan kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: TAHTITORNI_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: CIURLIONIS_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Liettua) ----------
   *
   * UUSI POOLI, EI SIIRTO. Liettua ei ole js/fokusnosto.js:n NOSTO_MAAT
   * -taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia, joten uusi maa ei vaadi riviä
   * moottoriin — pooli syntyy tästä kentästä.
   *
   * KOLME NOSTOA, JOTTA POOLI VOI VUOROTELLA (omistajan pelitestipalaute
   * v1234: luetun täyn tilalle pitää syttyä uusi). Ensimmäinen on maan
   * KUPLATÄKY eli poolin kärki.
   *
   * KAIKKI KOLME PISTETTÄ OVAT TODELLISESSA PROJEKTIOSSAAN, kuten Viron
   * Kaali-nosto (js/packs/fokusvirta-tallinna.js) ja Latvian molemmat
   * nostot (js/packs/fokusvirta-riika.js). Suunnat ovat toisiinsa
   * nähden oikein: Kuršių nerija piirtyy laatasta länteen meren
   * rannalle, Kryžių kalnas luoteeseen ja Trakai aivan laatan
   * länsipuolelle.
   *
   * KAKSI ETÄISYYTTÄ, JOTKA ON MITATTU JA JOTKA KANNATTAA TIETÄÄ:
   *   - TRAKAI jää Vilnan laatasta 19,0 yksikön päähän. Se on yli
   *     PISTE_ERO_MINin (14), joten merkki piirtyy omalle paikalleen
   *     eikä sitä siirretä — ja niin kuuluukin, sillä Trakai on
   *     oikeasti runsaan kahdenkymmenen kilometrin päässä kaupungista.
   *   - KRYŽIŲ KALNAS jää Riian laatasta 18,7 yksikön päähän. Se on
   *     laudan lähin vieras laatta tälle nostolle, ja etäisyys on
   *     pienempi kuin Latvian nostoilla (yli 30). Merkit erottuvat yhä
   *     toisistaan, mutta jos Fable haluaa nostojen väljentämistä,
   *     tämä on se piste, joka kannattaa katsoa ensin.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki).
       *
       * MIKSI KURŠIŲ NERIJA: isoisän merkintä päättyy metsään joka
       * suuntaan. Tämä on maan toinen ääripää — paikka, jossa metsä
       * hakattiin pois ja hiekka lähti liikkeelle, ja jossa nykyinen
       * metsä on istutettu käsin. Kohde on myös oikea paikka kartalla
       * (Parnidžio kopa Nidan eteläpuolella).
       *
       * FAKTAT: js/packs/maa-kategoriat.js, LTU/luonto, nosto "Dyyni
       * vaeltaa ja hautaa kylän" (jo hyväksyttyä pelidataa) — lähes
       * sadan kilometrin hiekkaniemi, kapeimmillaan muutaman sadan
       * metrin levyinen, metsät hakattiin 1600- ja 1700-luvuilla,
       * dyynit hautasivat kyliä, vaellus pysäytettiin istuttamalla
       * mäntyä ja rantakauraa sata vuotta kestäneellä työllä, Unesco
       * 2000.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Curonian Spit": niemi on 98 kilometriä pitkä
       *     ja erottaa Kuurinlahden Itämerestä; leveys vaihtelee 400
       *     metristä (Venäjän puolella) 3800 metriin (Nidan
       *     pohjoispuolella); pohjoinen 52 kilometrin osuus on
       *     Liettuassa, loput Kaliningradin alueella; niemi syntyi noin
       *     kolmannella vuosituhannella eaa. jäätikön moreenin päälle;
       *     metsien häviäminen laidunnuksen, hakkuiden ja
       *     veneenrakennuksen takia päästi dyynit liikkeelle ja ne
       *     hautasivat kokonaisia kyliä; Preussin hallitus aloitti
       *     laajat uudelleenistutukset 1825; 1800-luvun lopulta lähtien
       *     Nidan dyynimaisema veti Königsbergin taideakatemian
       *     maalareita ja synnytti taiteilijasiirtokunnan, jonka
       *     varhaisia vieraita oli Lovis Corinth 1890; Rossittenin
       *     lintuasema toimi niemellä 1901–1946, koska niemi on
       *     muuttolintujen väylä; geologisesti niemi on ohimenevä
       *     rantamuoto, ja lahti täyttyy aikanaan sedimentistä uudeksi
       *     maaksi.
       *   - Pelin oma, jo hyväksytty nosto ja sen selite (maa-
       *     kategoriat.js, LTU/luonto), jotka kertovat saman pituuden,
       *     saman kapeuden, saman dyynien vaelluksen ja saman
       *     istutustyön.
       *
       * UNESCON VUOSI ON PELIN OMASTA AINEISTOSTA. en-Wikipedian
       * johdanto sanoo vain, että niemi on maailmanperintökohde;
       * vuosiluku 2000 on pelin omassa, jo hyväksytyssä nostossa ja
       * sen selitteessä. Teksti käyttää sitä eikä lisää siihen mitään.
       *
       * MITÄ EI KERROTA: lähde nimeää yhden veneenrakennusurakan
       * taistelun mukaan. Sotasisältöä ei kirjoiteta (tarinakaari,
       * luku 2), joten teksti puhuu veneenrakennuksesta ilman sitä.
       */
      id: 'kursiu-nerija',
      // Kartan nimiö: lyhyt pelaajateksti pisteen kylkeen.
      nimio: 'Kuršių nerija',
      otsikko: 'Hiekkaniemi, jonka dyynit vaelsivat kylien yli — ja jonka '
        + 'metsä on istutettu käsin',
      lunastus: [
        'Yhdeksänkymmentäkahdeksan kilometriä pitkä hiekkaniemi erottaa '
          + 'Kuurinlahden Itämerestä. Se on kapeimmillaan neljäsataa metriä '
          + 'ja leveimmillään Nidan pohjoispuolella lähes neljä kilometriä, '
          + 'ja se syntyi noin kolmannella vuosituhannella ennen ajanlaskua '
          + 'jäätikön jättämän moreeniharjanteen päälle, kun tuuli ja '
          + 'virtaukset kasasivat sen päälle hiekkaa. Pohjoinen '
          + 'viidenkymmenenkahden kilometrin osuus on Liettuaa ja loput '
          + 'Venäjää; maailmanperintökohde on molempien yhteinen, ja se '
          + 'otettiin luetteloon vuonna 2000.',
        'Niemen tarina on kuitenkin ihmisen tekemä. Kun metsät hävisivät '
          + '1600- ja 1700-luvuilla laidunnuksen, hakkuiden ja '
          + 'veneenrakennuksen takia, tuuli pääsi käsiksi hiekkaan: dyynit '
          + 'lähtivät liikkeelle ja hautasivat alleen kokonaisia kyliä. '
          + 'Preussin hallitus aloitti laajat istutukset vuonna 1825, ja '
          + 'sata vuotta mäntyä ja rantakauraa pysäytti vaelluksen — se '
          + 'metsä, joka niemellä nyt kasvaa, on siis istutettu. Isoisäsi '
          + 'käydessä työ oli puolivälissä ja dyynit vielä maan '
          + 'kuuluisuus: parikymmentä vuotta myöhemmin Nidaan asettui '
          + 'maalareita Königsbergin taideakatemiasta juuri sen maiseman '
          + 'takia, ja niemelle perustettiin 1901 lintuasema, koska '
          + 'muuttolinnut kulkevat sitä pitkin. Ja koko ajan tämä on '
          + 'geologisesti ohimenevä muoto: lahti täyttyy aikanaan '
          + 'sedimentistä, ja niemestä tulee osa mannerta.',
      ],
      lahde: 'en-Wikipedia "Curonian Spit"; Unescon vuosi ja istutustyön '
        + 'kuvaus pelin omasta LTU-maalehdestä; tarkistettu 29.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto LTU/luonto,
       * js/packs/maa-kategoriat.js) — jo kertaalleen tarkistettu ja
       * hyväksytty. Commons 29.8.2026: 3035×2270, CC BY-SA 4.0, Hartmut
       * Schmidt Heidelberg, kuvaus "Dune slope with view over the lagoon
       * at Curonian Spit, LT", kuvattu 1.9.2011. Restrictions tyhjä.
       * SILMÄTARKISTUS TEHTY (960 px): dyynin rinne ja lahti sen takana,
       * ei tunnistettavia ihmisiä.
       *
       * LOISTOAIKAKUVAA EI VIELÄ OLE (sama huomautus kuin Riiassa ja
       * Tukholmassa): vaeltava dyyni kylän päällä on vasta
       * promptinipussa, joten pääkuvaksi jää valokuva.
       */
      kuva: {
        tiedosto: 'Dune slope with view over the lagoon at Curonian Spit, Lithuania.jpg',
        selite: 'Kuršių nerija on 98 kilometrin pituinen dyynikannas, joka '
          + 'erottaa Kuurinlahden Itämerestä ja kuuluu Unescon '
          + 'maailmanperintöön.',
        lahde: 'Hartmut Schmidt Heidelberg, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miten hiekkadyyni voi vaeltaa?',
        'Miksi metsän kaataminen liikutti hiekkaa?',
        'Voiko maanmuodon säilyttää istuttamalla?',
      ],
      /*
       * 55,2949336 N / 20,9906353 E — en-Wikipedia "Parnidis Dune",
       * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja
       * samat vakiot kuin fokuskohteilla: maailmankartalla Millerin
       * lieriö LEVEYS 12000 / LON0 −175 / POHJOINEN 76
       * (tools/fokuskartta/piirto.js laudanProjektio), Euroopan laudalla
       * x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3. Kaava on
       * tarkistettu ajamalla sillä Riian pakettien molemmat nostot: se
       * antaa niille täsmälleen samat luvut, jotka niissä lukevat.
       */
      paikka: {
        nimi: 'Parnidžio kopa',
        laudat: {
          maailmankartta: { x: 6533.0, y: 1152.1 },
          europe: { x: 614.2, y: 439.3 },
        },
      },
    },
    {
      /*
       * MIKSI KRYŽIŲ KALNAS: isoisä kirjasi kujilla myytävät
       * pyhäinkuvat. Tämä on saman tavan toinen pää — paikka, jonne
       * pyhäinkuva viedään eikä osteta, ja jonne kuka tahansa saa yhä
       * tuoda omansa. Se on myös laudan hengähdyskohta: ei kilpajuoksua,
       * ei kätköä.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, LTU/tavat, nosto "Kukkula,
       * jolle jokainen tuo ristin" (jo hyväksyttyä pelidataa) — ristejä
       * alettiin viedä 1800-luvun kapinoiden jälkeen kaatuneiden
       * muistoksi, viranomaiset raivasivat kukkulan puskutraktoreilla
       * kolme kertaa vuosina 1961, 1973 ja 1975, ihmiset toivat ristit
       * takaisin öisin, nyt niitä on yli satatuhatta ja kuka tahansa saa
       * tuoda omansa.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Hill of Crosses": paikka on noin 12 kilometriä
       *     Šiauliaista pohjoiseen entisellä Jurgaičiain eli Domantain
       *     linnavuorella; ensimmäisten ristien uskotaan tulleen vuoden
       *     1831 kapinan jälkeen, kun omaiset eivät löytäneet
       *     kaatuneiden ruumiita ja pystyttivät symbolisia ristejä;
       *     kukkulalle on tuotu ristien lisäksi Neitsyt Marian
       *     patsaita, puuveistoksia ja tuhansia pieniä
       *     rukousnauhoja; arviot ristien määrästä ovat noin 55 000
       *     vuonna 1990 ja noin 100 000 vuonna 2006; neuvostoaikana
       *     paikka puskuroitiin kolmesti, teitä suljettiin ja
       *     kukkulaa vartioitiin, mutta ristejä tuotiin öisin
       *     takaisin; Unesco on ottanut liettualaisen
       *     ristinveiston aineettoman perinnön luetteloihin; touko-
       *     kuussa 2013 Šiauliain aluehallinto antoi säännöt, joiden
       *     mukaan alle kolmimetrisen puuristin saa pystyttää ilman
       *     lupaa.
       *   - Pelin oma, jo hyväksytty nosto ja sen selite (maa-
       *     kategoriat.js, LTU/tavat), jotka kertovat saman alkuperän,
       *     saman kolme kertaa toistuneen raivauksen ja saman yli
       *     satatuhannen ristin.
       *
       * RAIVAUSVUODET OVAT PELIN OMASTA AINEISTOSTA. en-Wikipedia sanoo
       * kolme kertaa muttei nimeä vuosia; pelin oma nosto nimeää 1961,
       * 1973 ja 1975. Teksti kertoo molemmat tiedot siinä muodossa
       * kuin ne lähteissä ovat eikä lisää niihin mitään.
       */
      id: 'kryziu-kalnas',
      nimio: 'Kryžių kalnas',
      otsikko: 'Kukkula, jolta ristit ajettiin pois kolmesti — ja jolle ne '
        + 'palasivat joka kerta yöllä',
      lunastus: [
        'Noin kaksitoista kilometriä Šiauliaista pohjoiseen on matala '
          + 'kukkula, joka oli aikanaan linnavuori. Ensimmäisten ristien '
          + 'uskotaan tulleen sinne vuoden 1831 jälkeen: omaiset eivät '
          + 'löytäneet kaatuneitaan eivätkä voineet haudata heitä, joten he '
          + 'pystyttivät kukkulalle symbolisen ristin sen sijaan. Tapa jäi. '
          + 'Kukkulalle on sittemmin tuotu ristien lisäksi Neitsyt Marian '
          + 'patsaita, puuveistoksia ja tuhansia pieniä rukousnauhoja, ja '
          + 'tarkkaa lukua ei ole kenelläkään: arviot ovat noin '
          + 'viisikymmentäviisituhatta ristiä vuonna 1990 ja noin '
          + 'satatuhatta vuonna 2006.',
        'Neuvostoaikana kukkula raivattiin puskutraktoreilla kolme kertaa — '
          + 'pelin oma maalehti nimeää vuodet 1961, 1973 ja 1975, ja '
          + 'kansainväliset lähteet vahvistavat kerrat mutta eivät '
          + 'vuosilukuja. Teitä suljettiin ja kukkulaa vartioitiin. Joka '
          + 'kerta ristit ilmestyivät takaisin öiden aikana, ja siihen '
          + 'lopulta tyydyttiin. Liettualainen ristinveisto on nykyään '
          + 'Unescon aineettoman kulttuuriperinnön luetteloissa, ja vuodesta '
          + '2013 kukkulalla on omat sääntönsä: alle kolmimetrisen '
          + 'puuristin saa pystyttää kuka tahansa ilman lupaa. Se on '
          + 'harvinainen muistomerkki — sellainen, joka ei ole valmis, '
          + 'koska sitä tehdään koko ajan lisää.',
      ],
      lahde: 'en-Wikipedia "Hill of Crosses"; raivausvuodet pelin omasta '
        + 'LTU-maalehdestä; tarkistettu 29.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto LTU/tavat,
       * js/packs/maa-kategoriat.js) — jo kertaalleen tarkistettu ja
       * hyväksytty. Commons 29.8.2026: 7999×4849, CC BY-SA 3.0, Diliff,
       * kuvaus "The Hill of Crosses near Siauliai, Lithuania", kuvattu
       * 15.9.2014. Restrictions tyhjä. SILMÄTARKISTUS TEHTY (960 px):
       * ristikenttä polun molemmin puolin, ei tunnistettavia kasvoja.
       */
      kuva: {
        tiedosto: 'Hill of Crosses 1, Siauliai, Lithuania.JPG',
        selite: 'Ristien kukkulalla arvioitiin olevan noin 55 000 ristiä '
          + 'vuonna 1990 ja noin 100 000 vuonna 2006, eikä tarkkaa lukua ole '
          + 'kenelläkään.',
        lahde: 'Diliff, Wikimedia Commons (CC BY-SA 3.0)',
      },
      kysymykset: [
        'Miksi kukkulalle vietiin ristejä eikä hautakiviä?',
        'Miten muistomerkki voi kasvaa ilman ketään, joka rakentaa sitä?',
        'Kuinka monta ristiä kukkulalle mahtuu?',
      ],
      /*
       * 56,01527778 N / 23,41666667 E — en-Wikipedia "Hill of Crosses",
       * prop=coordinates (haettu 29.8.2026). Sama kaava kuin edellä.
       */
      paikka: {
        nimi: 'Kryžių kalnas',
        laudat: {
          maailmankartta: { x: 6613.9, y: 1118.4 },
          europe: { x: 660.8, y: 420.4 },
        },
      },
    },
    {
      /*
       * MIKSI TRAKAI: kaksi ensimmäistä nostoa vievät kauas rannikolle
       * ja pohjoiseen. Tämä on kaupungin naapurissa, ja se kertoo sen,
       * mitä Vilna oli ennen kuin se oli Vilna — sekä sen, että
       * rauniosta voi tulla uudelleen rakennus. Kohde on myös maalehden
       * Menovinkit-sivun oma kohde, joten pelaaja tunnistaa sen.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, LTU/menovinkit, kohde
       * "Trakų istorijos muziejus — 3D-esineet käännettävinä" (jo
       * hyväksyttyä pelidataa) — Trakain vesilinnan museo on skannannut
       * kokoelmaesineitään kolmiulotteisiksi ja niitä voi pyörittää
       * ruudulla ja katsoa myös alapuolelta; linnan rakensivat Kęstutis
       * 1300-luvulla ja hänen poikansa Vytautas Suuri, joka kuoli
       * linnassa 1430.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Trakai Island Castle": linna on Galvė-järven
       *     saarella; kivilinnan rakentaminen alkoi 1300-luvulla
       *     suuriruhtinas Kęstutisin käskystä, ja hän siirsi saarelle
       *     sekä asuinpaikkansa että aarrekammionsa; rakennustyön
       *     toinen vaihe päättyi 1409 Vytautas Suuren aikana ja on
       *     linnan historian merkittävin; eteläpuolelle nousi
       *     kuusikerroksinen, 35 metriä korkea päätorni, ja ruhtinaan
       *     sali oli noin 10 × 21 metriä; pääasiallinen
       *     rakennusmateriaali oli punainen goottilainen tiili, ja
       *     linnassa oli lasitettuja kattotiiliä ja lasimaalauksia;
       *     muurit paksuunnettiin myöhemmin 2,5 metriin; Galvė-järven
       *     pinta oli tuolloin useita metrejä nykyistä korkeammalla, ja
       *     palatsi erotettiin linnasta vallihaudalla, joka oli juuri
       *     niin leveä että pieni vene mahtui kulkemaan; linna
       *     rakennettiin uudelleen 1950- ja 1960-luvuilla
       *     liettualaisesta aloitteesta ja neuvostoviranomaisten
       *     vastustuksesta huolimatta, ja Trakain historian museo
       *     perustettiin jälleenrakennuksen jälkeen.
       *   - Pelin oma, jo hyväksytty menovinkkikohde ja sen selite
       *     (maa-kategoriat.js, LTU/menovinkit), jotka kertovat samat
       *     rakentajat, saman kuolinvuoden ja saman museon.
       *
       * MITÄ EI KERROTA: linnan piirityksiä ja valtataisteluita.
       * Sotasisältöä ei kirjoiteta (tarinakaari, luku 2), ja nosto
       * pärjää ilman: sen aihe on tiili, vesi ja jälleenrakennus.
       */
      id: 'trakai',
      nimio: 'Trakai',
      otsikko: 'Saarilinna punaisesta tiilestä — raunio, joka koottiin '
        + 'takaisin viisisataa vuotta myöhemmin',
      lunastus: [
        'Runsaan kahdenkymmenen kilometrin päässä Vilnasta on järvi, jonka '
          + 'saarella seisoo linna. Kivilinnan rakentaminen alkoi '
          + '1300-luvulla suuriruhtinas Kęstutisin käskystä, ja hän siirsi '
          + 'saarelle sekä asuinpaikkansa että aarrekammionsa — järvi oli '
          + 'muuri, jota ei tarvinnut muurata. Merkittävin rakennusvaihe '
          + 'päättyi 1409 hänen poikansa Vytautas Suuren aikana, ja siitä '
          + 'linna sai nykyisen hahmonsa: kuusikerroksisen, '
          + 'kolmenkymmenenviiden metrin korkuisen päätornin ja ruhtinaan '
          + 'salin, joka oli noin kymmenen metriä leveä ja '
          + 'kaksikymmentäyksi pitkä. Vytautas kuoli tässä linnassa vuonna '
          + '1430. Rakennusaine oli punainen goottilainen tiili, katolla '
          + 'oli lasitettuja tiiliä ja ikkunoissa lasimaalauksia, ja '
          + 'muurit paksuunnettiin myöhemmin kahteen ja puoleen metriin. '
          + 'Järven pinta oli silloin useita metrejä nykyistä korkeammalla, '
          + 'ja palatsi erotettiin muusta linnasta vallihaudalla, joka oli '
          + 'juuri niin leveä että pieni vene mahtui kulkemaan sen läpi.',
        'Isoisäsi aikaan linna oli raunio, eikä hänen matkakirjaansa siitä '
          + 'tullut riviäkään. Se ei jäänyt raunioksi. Linna rakennettiin '
          + 'uudelleen 1950- ja 1960-luvuilla liettualaisesta aloitteesta ja '
          + 'neuvostoviranomaisten vastustuksesta huolimatta, ja '
          + 'jälleenrakennuksen jälkeen siihen perustettiin Trakain '
          + 'historian museo. Museo on sittemmin skannannut kokoelmaansa '
          + 'kolmiulotteisiksi malleiksi: esineitä voi pyörittää ruudulla ja '
          + 'katsoa myös alapuolelta, mikä vitriinissä ei onnistu koskaan. '
          + 'Sama talo siis koottiin ensin kivestä uudelleen ja sitten '
          + 'vielä kerran numeroina.',
      ],
      lahde: 'en-Wikipedia "Trakai Island Castle"; museon 3D-kokoelma pelin '
        + 'omasta LTU-maalehdestä; tarkistettu 29.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto LTU/menovinkit,
       * js/packs/maa-kategoriat.js) — jo kertaalleen tarkistettu ja
       * hyväksytty. Commons 29.8.2026: 3264×1832, CC BY 2.0, Leszek
       * Kozlowski, kuvaus "Front facade of the Trakai Island Castle in
       * 2009", kuvattu 3.7.2009. Restrictions tyhjä. SILMÄTARKISTUS
       * TEHTY (960 px): linnan julkisivu järven yli, ei tunnistettavia
       * kasvoja.
       */
      kuva: {
        tiedosto: 'Front facade of the Trakai Island Castle, 2009.jpg',
        selite: 'Trakain saarilinnan rakensivat Kęstutis 1300-luvulla ja '
          + 'hänen poikansa Vytautas Suuri, joka kuoli linnassa 1430.',
        lahde: 'Leszek Kozlowski, Wikimedia Commons (CC BY 2.0)',
      },
      kysymykset: [
        'Miksi linna rakennettiin saarelle eikä rannalle?',
        'Onko uudelleen rakennettu linna sama linna?',
        'Miksi museo skannaa esineensä kolmiulotteisiksi?',
      ],
      /*
       * 54,6525 N / 24,93305556 E — en-Wikipedia "Trakai Island
       * Castle", prop=coordinates (haettu 29.8.2026). Sama kaava kuin
       * edellä.
       */
      paikka: {
        nimi: 'Trakų salos pilis',
        laudat: {
          maailmankartta: { x: 6664.4, y: 1181.9 },
          europe: { x: 689.9, y: 456.2 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Vilnan katedraalin
   * kätkö (js/packs/paikallisaarteet.js, LTU). Merkintä aukeaa, kun
   * aarre löytyy (js/fokusvirta.js fokusvirtaAarremerkinta).
   *
   * MERKINTÄ EI PALJASTA LÖYTÖVUOTTA, JA SE ON TARKOITUS. Isoisä
   * kirjoittaa vuonna 1873 eikä voi tietää vuodesta 1985; oppitunti
   * kertoo koko tarinan, merkintä jättää sen auki.
   */
  aarremerkinta: {
    teksti: 'Suntio kertoi äänellä, joka oli puoliksi kuiskaus: kun sota tai '
      + 'tuli uhkaa, katedraalin holveihin kätketään mitä kallisarvoisinta '
      + 'on, ja aina ei muisteta hakea kaikkea takaisin. Kirkon kivet '
      + 'pitävät salaisuutensa kauemmin kuin ihmiset elävät. Joskus vielä '
      + 'joku avaa väärän seinän oikeasta kohdasta.',
  },
};
