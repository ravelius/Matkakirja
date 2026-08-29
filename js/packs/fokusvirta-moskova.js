/*
 * MOSKOVAN FOKUSVIRTA — annostelun sisältö dataksi. AALTO 4C.
 *
 * Sisartiedosto js/packs/fokusvirta-sevilla.js:lle ja js/packs/
 * fokusvirta-tukholma.js:lle: samat kentät, sama järjestys, sama moottori
 * (js/fokusvirta.js). Uusi kaupunki on yksi tiedosto ja yksi rivi
 * rekisterissä (js/packs/fokusvirrat.js) — TÄMÄ PAKETTI EI KIRJOITA SITÄ
 * RIVIÄ eikä koske sw.js:ään, savukkeisiin tai mihinkään muuhun
 * tiedostoon: aallon 4C kaupungit kokoaa integrointiagentti yhtenä
 * nostona.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 30.8.2026, aallon 4C kaanonpaperi).
 * NELJÄ KENTTÄÄ ON SANATARKASTI HÄNEN: matkakirja.paikkarivi,
 * matkakirja.teksti, pollo.teksti ja aarremerkinta.teksti. Niitä ei ole
 * lyhennetty, pilkkuakaan siirretty eikä sanajärjestystä muutettu.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: tsaarin kadonnut pääsiäismuna (aallon 4C aarrepari RUS).
 *
 * ANAKRONISMIVAARA, JOKA OHJAA KOKO TIEDOSTOA. Fabergén pääsiäismunat
 * alkoivat vasta 1885, eli kaksitoista vuotta isoisän käynnin jälkeen.
 * Yksikään 1873-teksti ei siis saa tuntea munia: kaanoninen
 * aarremerkintä puhuu hovin kultaseppien lahjoista YLEISESTI, eikä tämä
 * paketti lisää siihen sanaakaan. Munat saa nimetä vain nykyajassa
 * (Livian puhe, täkyjen ja oppitunnin nykyaikaosuudet) — ja tässä
 * tiedostossa niitä ei tarvita kertaakaan, koska yksikään täky ei
 * käsittele hovin kultaseppiä.
 *
 * FAKTAPOHJA. Kaupunkilehti on jo pelissä (js/packs/
 * kulttuuri-kategoriat.js, kohta `moskova`), ja Venäjällä on oma
 * maapakettinsa (js/packs/maa-kategoriat.js, RUS). Aallon 4C maille EI
 * ole takynostot-työaineistoa, joten tämän paketin sisältö nojaa kahteen
 * lähteeseen ja vain niihin:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Moskovan kaupunkilehden omat nostot
 *      (Tsaarin kello, Bolshoi, Kristus Vapahtajan katedraali,
 *      Majakovskajan asema, Maslenitsa) — nämä on jo kertaalleen
 *      tarkistettu ja hyväksytty peliin, ja molemmat lehtitehtävän visat
 *      on koottu niistä ilman yhtään uutta faktaväitettä.
 *   2. TARKISTETUT LISÄTIEDOT. Kaikki muu on haettu 30.8.2026 Wikipedian
 *      rajapinnasta (action=query&prop=extracts, redirects=1,
 *      NODE_USE_ENV_PROXY=1) artikkeli kerrallaan, ja jokainen väite on
 *      katsottu KAHDESTA riippumattomasta artikkelista. Kunkin kohdan
 *      oma kommentti nimeää molemmat. Mitään ei ole päätelty,
 *      pyöristetty eikä muistettu.
 *
 * ── OMISTAJAN LINJAUKSET, JOTKA MUOVAAVAT TÄMÄN TIEDOSTON ──────────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois
 *      kokonaan: kuvat kuuluvat kaupunkilehteen.
 *   2. ÄÄNITETTÄ EI OLE VIELÄ. `matkakirja.aanite` puuttuu, koska tämän
 *      aallon luentoja ei ole generoitu. `luenta` on kirjoitettu valmiiksi
 *      samoin sanoin, joten generointi on myöhemmin yksi ajo eikä uusi
 *      kirjoitustyö.
 *   3. PÖLLÖN KUVA ON KAUPUNKILEHDEN HEROKUVA. `pollo.kuva` osoittaa
 *      KULTTUURI_KATEGORIAT-karusellin omaan generoituun heroon
 *      (moskova/avauskuvat), ei uuteen Commons-kuvaan.
 *   4. VALINTA-ASKELTA EI OLE. `valinta`-kenttää ei kirjoiteta.
 *   5. KOHTAAMISKORTTI RAKENNETAAN ILMAN KUVAA.
 *   6. TÄKYNOSTOJA EI OLE TÄSSÄ KAUPUNGISSA. Venäjän pooli kirjoitetaan
 *      tässä aallossa PIETARIN pakettiin, ja js/fokusnosto.js
 *      nostoMaanPooli lukee kaupungin oman kentän ennen maapoolia — jos
 *      Moskovalle kirjoitettaisiin oma `takynostot`, se ohittaisi
 *      Pietarin poolin eikä maalla olisi yhtä yhteistä pooliaan. Kenttä
 *      on siis tarkoituksella poissa.
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Sama kuin Ateenassa, Sofiassa, Madridissa ja Sevillassa: vastaus
 * löytyy syvennystekstistä, mutta kysymyksen sanamuoto ei toistu siinä
 * sellaisenaan. Oikea vaihtoehto on aina indeksi 0 (talon tapa, koko
 * rekisteri kirjoittaa niin, eikä moottori sekoita vaihtoehtoja) — mutta
 * oikea EI ole pisin vaihtoehto yhdessäkään tämän tiedoston viidestä
 * visasta. Se on tarinakaaren mittausvaatimus (docs/moduulit/
 * tarinakaari.md, luku 6 kohta 2), ja pituudet on laskettu käsin.
 *
 * ── MITÄ EI SPOILATA — MOSKOVASSA TÄMÄ ON POIKKEUKSELLISEN TIUKKA ──
 *
 * Kolme eri kysymyspintaa osuu tähän kaupunkiin, ja kaikki kolme on
 * kierretty (Isfahan-sääntö, tarinakaari luku 4: spoileritarkistus koskee
 * kaikkia ennen visaa näkyviä kenttiä):
 *
 *   1. AARREKYSYMYS ON TARINAKAAREN PAKETISSA, EI LAATASSA. Moskovalla
 *      ON kaaripaketti (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id
 *      'moskova'): kellonvalajan jälkeläinen Vera, ja kysymys on se,
 *      miten Tsaarinkello sai kylkeensä lohkeaman. Vastaus lukee
 *      kaupunkilehden sivulla 1 (nosto "Suurin kello ei ole koskaan
 *      soinut"), ja juuri sinne kohtaamisen vihjelinkki osoittaa. Siksi
 *      YKSIKÄÄN tämän tiedoston täky, oppitunti tai lehtitehtävä EI
 *      mainitse Tsaarinkelloa eikä tulipaloa: oppitunti kertoo tornin
 *      KELLOSTA, ei kellosta joka ei soinut, ja se pysähtyy tarkoituksella
 *      ennen sitä rajaa.
 *   2. LAATTAKYSYMYKSET (js/packs/europe-questions.js, `moskova`) ovat
 *      Kreml linnoituksena, metron koristellut asemat, Volga Euroopan
 *      pisimpänä jokena, yliopiston päärakennus vuodelta 1953 ja GUM
 *      tavaratalona. Yhtäkään näistä viidestä ei käsitellä tässä
 *      tiedostossa.
 *   3. KAUPUNKILEHDEN KULTTUURIVISA (js/packs/europe-kulttuuri.js,
 *      `moskova`) kysyy Majakovskajan katon 34 mosaiikista. Aihetta ei
 *      kosketa kumpikaan lehtitehtävä eikä yksikään täky.
 *
 * LISÄKSI KAANONPAPERIN OMA KIELTOLISTA: krasnyi-sanan merkitystä EI
 * selitetä missään. Sana ei esiinny tässä tiedostossa lainkaan.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta 30.8.2026
 * (olemassaolo, koko, lisenssi, tekijä, päiväys, kuvaus, Restrictions) —
 * ei arvattuja nimiä. Kaikki ovat PD tai CC BY-SA, ja tekijä on
 * `lahde`-rivillä, koska CC BY-SA vaatii maininnan. JOKAINEN on lisäksi
 * katsottu silmin 800–960 pikselin esikatseluna, ja jokaisen kohdalla on
 * kirjattu, mitä kuvassa näkyy. Yhdessäkään ei ole tunnistettavia eläviä
 * ihmisiä.
 *
 * YKSI EHDOKAS HYLÄTTIIN SILMÄTARKISTUKSESSA. Kyahtan gostinyi dvor
 * ("Бурятия. Кяхта. Гостиный двор.jpg", CC BY-SA 4.0) olisi ollut
 * teetäyn nykykuva, mutta esikatselussa etualalla on Lenin-patsas ja
 * rapistunut pylväikkö. Kuva olisi kertonut aivan muuta kuin teksti, ja
 * tilalle otettiin saman paikan aikalaiskaiverrus vuodelta 1783.
 *
 * LOISTOAIKAKUVIA EI OLE. Aallon 1 malli (pääkuvaksi repon oma generoitu
 * havainnekuva, entinen kuva `valokuva`-kenttään) vaatisi generointiajon,
 * jota tälle aallolle ei ole tehty. Sama ratkaisu kuin Sevillassa: yksi
 * kuva per kortti, `tiedosto`-kenttä.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * Kysymykset ovat vakioina samasta syystä kuin Sofiassa, Madridissa ja
 * Sevillassa: lista tiedoston lopussa lukee ne muuttujista, jolloin uusi
 * käyttö ei koskaan johda kahteen erilleen ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Maslenitsa-kysymys on Moskovan lehden sivun 2
 * ("Arki ja tavat") oman noston "Laskiaisviikolla syödään aurinkoja"
 * tekstiä ja allaskysymys sivun 1 ("Moskova") oman noston "Kirkko,
 * uimahalli ja taas kirkko" tekstiä (js/packs/kulttuuri-kategoriat.js).
 * Uusia faktaväitteitä ei ole kummassakaan.
 */

/*
 * AARTEEN AVAUS, SIVU 2.
 *
 * Sivulla on jo lehden OMA minitehtävä (Maslenitsa-viikon olkinukke), ja
 * nimetty tehtävä väistää sen (js/fokustehtavat.js: *"Sivun oma tehtävä
 * väistyy nimetyn tieltä"*). Sama ratkaisu kuin Sofiassa, jonka
 * arkisivulla on niin ikään oma tehtävä. Kysymys on tarkoituksella ERI
 * kohdasta samaa nostoa kuin sivun oma tehtävä: nukke jää sivun tekstiin
 * palkinnoksi lukijalle, ja tehtävä kysyy viikon viimeisestä päivästä.
 */
const MASLENITSA_VISA = {
  kysymys: 'Maslenitsa-viikko päättyy sunnuntaihin, jolla on Venäjällä '
    + 'oma vakiintunut tapansa. Mitä sinä päivänä tehdään?',
  vaihtoehdot: [
    'Pyydetään anteeksi',
    'Paastotaan koko päivä hiljaisuudessa',
    'Käydään kylvyssä ennen auringonlaskua',
  ],
  oikea: 0,
  fakta: 'Maslenitsa on viikon mittainen juhla ennen ortodoksisen kirkon '
    + 'suurta paastoa, ja sen ruoka on blini: ohut lettu, joka esittää '
    + 'aurinkoa. Teevesi keitetään samovaarissa.',
};

/*
 * JULISTE, SIVU 3 (Menovinkit, Venäjän maapaketista).
 *
 * Kysymys tulee sivulta 1, kuten Tukholmassa ja Sevillassa: JULISTE-sivu
 * on maan Menovinkit-sivu, jolla ei ole omaa kaupunkinostoa, joten
 * tehtävä kysyy kaupunkilehden omasta jutusta. Vastaus lukee siis siinä
 * lehdessä, jonka pelaaja on jo saanut käteensä.
 */
const ALLAS_VISA = {
  kysymys: 'Kristus Vapahtajan katedraalin paikalle jäi 1930-luvulla iso '
    + 'perustuskuoppa, kun sille suunniteltua tornia ei saatu pystyyn. '
    + 'Mitä kuoppaan lopulta tehtiin?',
  vaihtoehdot: [
    'Lämmitetty ulkouima-allas',
    'Maanalainen pysäköintihalli',
    'Kaupunginpuisto suihkulähteineen',
  ],
  oikea: 0,
  fakta: 'Altaan vesiympyrän halkaisija oli 130 metriä, ja vesi '
    + 'lämmitettiin, joten siellä uitiin pakkasellakin. Allas suljettiin '
    + '1994, ja kirkko rakennettiin samalle paikalle uudelleen.',
};

export const FOKUSVIRTA_MOSKOVA = {
  kaupunki: 'moskova',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ei omaa säälisäystä. */
    paikkarivi: 'Moskova, heinäkuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Kaupunki on rakennettu renkaiksi kuin puun vuosilustot, ja '
      + 'sen sydämessä linnoituksen muurit sulkevat sisäänsä kirkkoja '
      + 'kuin lippaan. Kelloja on niin monta, että kun ne soivat yhtä '
      + 'aikaa, kauppias lopettaa tinkimisen ja odottaa. Söin '
      + 'kauppiastalossa päivällisen, joka kesti neljä tuntia ja jossa '
      + 'teetä juotiin samovaarista kuin vettä lähteestä. Täällä '
      + 'sanotaan: Pietari on Venäjän pää, mutta Moskova on sen sydän.',
    /*
     * Luenta on sama teksti tunnetagein — sanat eivät muutu (Raamattu:
     * ruututeksti = luentateksti sanasta sanaan). Neljä tagia, alku ja
     * loppu eri sävyssä.
     *
     * ÄÄNITETTÄ EI OLE VIELÄ: `aanite`-kenttää ei kirjoiteta ennen kuin
     * luenta on generoitu (ks. omistajan linjaus 2 tiedoston alussa).
     */
    luenta: '[curious] Kaupunki on rakennettu renkaiksi kuin puun '
      + 'vuosilustot, ja sen sydämessä linnoituksen muurit sulkevat '
      + 'sisäänsä kirkkoja kuin lippaan. [excited] Kelloja on niin monta, '
      + 'että kun ne soivat yhtä aikaa, kauppias lopettaa tinkimisen ja '
      + 'odottaa. [warmly] Söin kauppiastalossa päivällisen, joka kesti '
      + 'neljä tuntia ja jossa teetä juotiin samovaarista kuin vettä '
      + 'lähteestä. [whispers] Täällä sanotaan: Pietari on Venäjän pää, '
      + 'mutta Moskova on sen sydän.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS (Raamattu, "LIVIA AIKASIIRTYMÄN VÄLITTÄJÄNÄ").
     * Piirtyy kuplan ENSIMMÄISEKSI kappaleeksi, heti isoisän merkinnän
     * perään (js/fokusvirta.js piirraPollo); kanoninen `teksti` seuraa
     * sen jälkeen.
     *
     * PUHEKIELIPASSI (Raamattu, "LIVIAN PUHEKIELI", sääntö 1 PAINOPISTE
     * REUNOILLA): lyhentymät ovat vain alussa ("Kääk") ja lopussa
     * ("mut"), keskellä sanat ovat auki; pronominit kokonaisina; ei
     * huutomerkkejä.
     *
     * MIKSI KAUPPIAS EIKÄ KELLOT TAI SAMOVAARI: kanoninen `teksti`
     * kuittaa jo kellot, samovaarit, pääkaupungin ja rengasrakenteen.
     * Maadoituksen on siis tartuttava siihen isoisän lauseeseen, jota
     * kaanon ei kosketa — neljän tunnin päivälliseen kauppiastalossa —
     * eikä toistettava mitään, mikä lukee kaksi riviä alempana.
     *
     * FAKTAKURI: neljä väitettä, kaikki kahdesta lähteestä (ru-Wikipedia
     * "Государственная Третьяковская галерея", osio "Становление
     * галереи", ja en-Wikipedia "Pavel Tretyakov", osiot "Career in
     * business" ja "Collecting art"; haettu 30.8.2026).
     *   (1) Pavel Tretjakov oli kauppiassukua ("небогатого купеческого
     *       рода") ja Moskovan kauppiaspankin perustajia.
     *   (2) Galleria lasketaan alkaneeksi vuodesta 1856, jolloin hän
     *       osti kaksi venäläisen nykytaiteilijan työtä.
     *   (3) Kokoelma avattiin yleisölle 1867 — kuusi vuotta ennen isoisän
     *       käyntiä.
     *   (4) Vuonna 1892 hän luovutti kokoelman Moskovan omistukseen;
     *       en-artikkeli lisää, että hän halusi tehdä sen mahdollisimman
     *       huomaamattomasti eikä pitänyt kiitoksista.
     */
    maadoitus: 'Kääk. Se neljän tunnin päivällinen ei ollut pelkkää '
      + 'syömistä — sellaisissa taloissa istui väkeä, joka teki rahansa '
      + 'kankaalla ja pellavalla ja käytti ne sitten johonkin ihan '
      + 'muuhun. Yksi heistä, Pavel Tretjakov, oli ostellut tauluja '
      + 'vuodesta 1856 ja avannut kokoelmansa yleisölle jo 1867, eli '
      + 'kuusi vuotta ennen isoisäsi käyntiä. Vuonna 1892 hän antoi koko '
      + 'kokoelman kaupungille ja yritti tehdä senkin mahdollisimman '
      + 'huomaamattomasti, koska kiitosten kuunteleminen oli hänestä '
      + 'kiusallista. Mut kaupunki sai museon, ja se on siellä yhä.',
    /*
     * KAANON (Fable) — Livian nykypäivän huomio sellaisenaan.
     *
     * KUVAN JA TEKSTIN SUHDE OSUU TÄSSÄ KOHDALLEEN. Repliikki päättyy
     * kehotukseen "Muurien luo sitten", ja lehden avauskarusellin toinen
     * generoitu hero on juuri Kremlin muuri (js/packs/
     * kulttuuri-kategoriat.js, moskova/avauskuvat) — omistajan linjaus
     * sanoo, että pöllön kuva on LEHDEN hero, eikä tässä tarvinnut
     * valita karusellin ensimmäistä, koska toinen vastaa repliikkiä
     * sanasta sanaan.
     */
    teksti: 'Se pää ja sydän -sanonta piti pintansa: puoli vuosisataa '
      + 'isoisäsi käynnin jälkeen pääkaupunki muutti takaisin Moskovaan, '
      + 'ja sydän sai pään tehtävät.. Kellot soivat edelleen, samovaarit '
      + 'höyryävät edelleen, ja se rengasrakenne näkyy nykyään '
      + 'metrokartassa asti. Muurien luo sitten.',
    kuva: {
      ampari: 'herokoe/hero-moskova-keskipaiva.png',
      /*
       * Selite on lehden oman avauskuvan selite sellaisenaan; yksikään
       * luku ei muutu.
       */
      selite: 'Kremlin punatiiliset muurit rakensivat italialaiset '
        + 'mestarit 1400-luvun lopulla, ja niiden sisällä on ollut '
        + 'vallan keskus yli viisisataa vuotta.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnässä teetä juodaan samovaarista kuin
       * vettä lähteestä. Tämä kertoo, mistä se vesi tuli — ja että
       * isoisä joi sitä juuri sinä vuosikymmenenä, jona reitti oli
       * katoamassa.
       *
       * FAKTAT (en-Wikipedia "Russian tea culture", osiot "History" ja
       * "Varieties", sekä en-Wikipedia "Kyakhta", osiot "History" ja
       * "Geography"; haettu 30.8.2026):
       *   - Kyahta perustettiin 1727 Kyahtan sopimuksen jälkeen Venäjän
       *     ja Qing-Kiinan rajakauppapaikaksi; perustaja oli serbi Sava
       *     Vladislavich, ja mantshut rakensivat Maimaitshengin heti
       *     rajan toiselle puolelle;
       *   - vuoden 1762 jälkeen kauppa oli pääosin vaihtokauppaa
       *     Kyahtan ja Maimaitshengin välillä: venäläiset myivät
       *     turkiksia, kankaita, vuotia ja karjaa, kiinalaiset silkkiä,
       *     puuvillaa, teetä, posliinia, riisiä ja mausteita;
       *   - kaupunki sai kaupunkioikeudet 1805 ja rakennutti teepörssin
       *     1842, mutta se ei koskaan näyttänyt siltä rikkaudelta, joka
       *     sen läpi kulki;
       *   - Kyahtan teekaupan huippuvuosi oli 1824 ja karavaanien
       *     huippuvuosi 1860; sen jälkeen kauppa hiipui, kun koko
       *     Venäjän ja Kiinan raja avattiin 1860 ja rautatiet kiersivät
       *     kaupungin;
       *   - matka kesti tavallisesti kuudestatoista kahdeksaantoista
       *     kuukauteen, ja tee sai savuisen makunsa karavaanin
       *     nuotioista — siitä nimi "Russian Caravan";
       *   - Siperian radan ensimmäinen osuus valmistui 1880 ja lyhensi
       *     teen matkan kuudestatoista kuukaudesta seitsemään viikkoon;
       *     hevosvetoinen teekuljetus päättyi 1905 ja karavaanit 1925.
       *
       * MITÄ EI KERROTA: oopiumikaupasta ja rajakiistoista ei ole tässä
       * riviäkään. Täky on kauppareitti- ja makutarina.
       */
      id: 'karavaanitee',
      nappi: 'Tee, joka matkusti puolitoista vuotta',
      otsikko: 'Karavaanitee ja Kyahtan raja',
      teksti: 'Se samovaarin tee oli matkustanut kauemmin kuin isoisäsi. '
        + 'Venäjän tee tuli Kiinasta maitse, ja koko kauppa kulki yhden '
        + 'ainoan pisteen läpi: Kyahtan, joka perustettiin 1727 aivan '
        + 'rajalle. Kiinan puolelle rakennettiin heti oma kauppakylänsä '
        + 'Maimaitsheng, ja kaksi kaupunkia seisoivat nokakkain '
        + 'muurirajan yli. Vuoden 1762 jälkeen siellä ei juuri käytetty '
        + 'rahaa vaan vaihdettiin tavaraa tavaraan: venäläiset toivat '
        + 'turkiksia, kankaita ja vuotia, kiinalaiset silkkiä, '
        + 'puuvillaa, posliinia ja teetä. Matka kesti tavallisesti '
        + 'kuudestatoista kahdeksaantoista kuukauteen, ja juuri siitä '
        + 'syntyi maku: tee nukkui yönsä karavaanin nuotioiden vieressä '
        + 'ja imi savun itseensä. Sitä sekoitusta myydään nykyäänkin '
        + 'nimellä Russian Caravan, vaikka savu saadaan siihen nykyään '
        + 'muilla keinoin. Isoisäsi joi tätä teetä juuri '
        + 'oikeaan aikaan. Karavaanien huippuvuosi oli 1860, ja kun '
        + 'Siperian radan ensimmäinen osuus valmistui 1880, sama matka '
        + 'lyheni kuudestatoista kuukaudesta seitsemään viikkoon. '
        + 'Hevosvetoinen teekuljetus loppui 1905, karavaanit 1925 — ja '
        + 'Kyahta, joka oli aikoinaan rakennuttanut oman teepörssinsä, '
        + 'jäi paikaksi, jonka läpi ei enää kulje mitään.',
      /*
       * Commons 30.8.2026: 1680×1120, public domain, Nicolas Louis de
       * Lespinasse, päiväys 1783, kuvaus "Кяхта (Histoire physique,
       * morale, civile et politique de la Russie ancienne et moderne
       * Николя Габриэля Леклерка. Париж. 1783 год". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: käsin väritetty kaiverrus, jossa kaksi
       * muurattua kauppakaupunkia vastakkain laakson pohjalla, vuoret
       * takana ja etualalla muutama pienenpieni ajan kulkijahahmo
       * kaiverruksen mittakaavassa — ei tunnistettavia ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se näyttää yhdellä silmäyksellä sen, minkä
       * teksti joutuu selittämään — kaksi kaupunkia nokakkain rajan yli.
       * Ks. myös tiedoston alun HYLÄTTY EHDOKAS.
       */
      kuva: {
        tiedosto: 'Кяхта 1783 год.jpg',
        selite: 'Kyahta ja sen kiinalainen naapurikaupunki Maimaitsheng '
          + 'vuoden 1783 kaiverruksessa: kaksi muurattua kauppapaikkaa '
          + 'vastakkain rajan yli, ja koko Venäjän tee kulki niiden '
          + 'välistä.',
        lahde: 'Nicolas Louis de Lespinasse 1783, Wikimedia Commons '
          + '(public domain)',
      },
      visa: {
        kysymys: 'Mistä karavaaniteen savuinen maku oli peräisin?',
        vaihtoehdot: [
          'Yöpymisistä nuotioiden vieressä',
          'Kiinalaiset kuivasivat lehdet savustamossa ennen lähtöä',
          'Tiiliksi puristettu tee paahdettiin matkan alussa',
        ],
        oikea: 0,
        fakta: 'Matka Kiinasta kesti kuudestatoista kahdeksaantoista '
          + 'kuukauteen. Siperian radan ensimmäinen osuus valmistui 1880 '
          + 'ja lyhensi sen kuudestatoista kuukaudesta seitsemään '
          + 'viikkoon.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       *
       * MIKSI TÄMÄ TÄKY: isoisä laski kaupungin renkaita ja kelloja
       * mutta ei käynyt katsomassa ainoaa paikkaa, jossa kaupunki oli
       * pannut näytteille jotain muuta kuin itsensä. Eläintarha oli
       * hänen käydessään yhdeksän vuoden ikäinen.
       *
       * FAKTAT (ru-Wikipedia "Московский зоопарк", osio "История", ja
       * en-Wikipedia "Moscow Zoo", osio "History"; haettu 30.8.2026):
       *   - ajatus esitettiin maaliskuussa 1857, kun eläinten ja
       *     kasvien akklimatisointikomitean jäsen A. P. Bogdanov piti
       *     esitelmän eläintieteellisen puutarhan perustamisesta;
       *   - komiteassa oli 1862 yli 700 jäsentä, ja rahaa kerättiin
       *     viiden ruplan vuosimaksulla;
       *   - maa saatiin 1863 Presnjan lammikoiden alueelta, ja
       *     tammikuussa 1864 komitea nimettiin Keisarilliseksi
       *     venäläiseksi akklimatisointiseuraksi;
       *   - eläintarha avattiin juhlallisesti 31. tammikuuta 1864;
       *   - alussa oli seitsemän rakennusta ja näytteillä 57
       *     nisäkäslajia ja 53 lintulajia, yhteensä noin kolmesataa
       *     eläintä, enimmäkseen lahjoitettuja — joukossa tiikereitä,
       *     leopardeja, sarvikuono, seepra ja piikkisikoja;
       *   - pääsymaksu oli juhlapäivinä 10 kopeekkaa, muina päivinä 20
       *     ja torstaisin 50;
       *   - en-artikkeli nimeää perustajiksi Moskovan yliopiston
       *     professorit K. F. Ruljen, S. A. Usovin ja A. P. Bogdanovin
       *     ja antaa alkuluvuiksi 10 hehtaaria ja 286 eläintä;
       *   - tarhan tunnus on vuodesta 1987 manuli eli pallaksenkissa;
       *     2013–2014 tunnus vaihdettiin, ja se palautettiin 2019
       *     tarhan 155-vuotispäivänä työntekijöiden ja kävijöiden
       *     pyynnöstä — asiasta kirjoitettiin vetoomus.
       *
       * LUKUJEN ERO ON KIRJATTU EIKÄ TASOITETTU: ru sanoo "noin
       * kolmesataa", en sanoo 286. Teksti käyttää muotoa "vajaat
       * kolmesataa", joka pitää paikkansa kummankin mukaan.
       */
      id: 'elaintarha',
      nappi: 'Kissa, joka äänestettiin takaisin',
      otsikko: 'Moskovan eläintarha ja manuli',
      teksti: 'Kun isoisäsi käveli kaupungin renkaita, sen laidalla oli '
        + 'yhdeksänvuotias eläintarha, eikä sitä ollut perustanut '
        + 'keisari. Yliopiston professorit olivat puuhanneet asiaa '
        + 'vuodesta 1857, keränneet rahat viiden ruplan jäsenmaksuilla '
        + '— jäseniä oli 1862 jo yli seitsemänsataa — ja saaneet 1863 '
        + 'maata Presnjan lammikoilta. Tarha avattiin 31. tammikuuta '
        + '1864. Alussa oli seitsemän rakennusta ja vajaat kolmesataa '
        + 'eläintä, enimmäkseen lahjoitettuja: 57 nisäkäslajia, 53 '
        + 'lintulajia, joukossa tiikereitä, leopardeja, seepra ja yksi '
        + 'sarvikuono. Ja tässä on se kohta, jonka isoisäsi olisi '
        + 'kirjannut ylös, koska se on numeroita: pääsy maksoi '
        + 'juhlapäivinä kymmenen kopeekkaa, tavallisina päivinä '
        + 'kaksikymmentä ja torstaisin viisikymmentä. Halvimmalla '
        + 'pääsi sisään silloin, kun kaikilla muillakin oli vapaata. '
        + 'Nykyään tarhan tunnus on manuli, arojen paksuturkkinen '
        + 'pikkukissa, jonka ilme on pysyvästi pettynyt. Kun tunnus '
        + 'vaihdettiin remontin yhteydessä johonkin sopuisampaan, '
        + 'työntekijät ja kävijät kirjoittivat vetoomuksen, ja manuli '
        + 'palautettiin vuonna 2019 tarhan 155-vuotispäiväksi.',
      /*
       * Commons 30.8.2026: 1732×1137, public domain, tekijä tuntematon,
       * Credit "Почтовая открытка", DateTimeOriginal 1913-03-06, kuvaus
       * "Moscow Zoo entrance, 1913." Restrictions tyhjä. SILMÄTARKISTUS
       * tehty: käsin väritetty postikortti, jossa tarhan satulinnamainen
       * porttitorni lippuineen ja edessä aikalaisväkeä kaukaisina
       * hahmoina; kasvoja ei erota, eikä kuvassa ole ketään elossa
       * olevaa.
       *
       * HUOM PÄIVÄYKSESTÄ: tiedostonimi puhuu 1900-luvusta mutta
       * imageinfon päiväys ja kuvaus sanovat 1913. Selite noudattaa
       * imageinfoa.
       */
      kuva: {
        tiedosto: '1900th-MoscowZoo.jpg',
        selite: 'Moskovan eläintarhan portti vuoden 1913 postikortissa: '
          + 'tarha oli silloin puoli vuosisataa vanha ja seisoi yhä '
          + 'samalla Presnjan lammikoiden paikalla kuin avajaispäivänään '
          + '1864.',
        lahde: 'Tuntematon tekijä, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Kuka pani Moskovan eläintarhan pystyyn vuonna 1864?',
        vaihtoehdot: [
          'Yliopiston professorien seura',
          'Keisari lahjaksi kaupungille',
          'Sirkusperhe, joka lopetti kiertämisen',
        ],
        oikea: 0,
        fakta: 'Rahat kerättiin viiden ruplan jäsenmaksuilla, ja jäseniä '
          + 'oli 1862 yli seitsemänsataa. Pääsy maksoi juhlapäivinä '
          + 'kymmenen kopeekkaa mutta torstaisin viisikymmentä.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkintä on heinäkuulta 1873, ja edellisenä
       * kesänä kaupunki oli ollut täynnä konetta ja koneen katsojaa.
       * Täky ei väitä, että isoisä olisi nähnyt näyttelyn — hän tuli
       * vuotta myöhässä, ja juuri se on täyn kärki. Lisäksi
       * hevospelkoinen mies saapui kaupunkiin, joka oli vasta vuotta
       * aiemmin pannut hevoset kiskoille.
       *
       * FAKTAT (ru-Wikipedia "Политехнический музей", johdanto ja osio
       * nimistä, ja en-Wikipedia "Polytechnic Museum", johdanto ja osio
       * "History"; haettu 30.8.2026):
       *   - Moskovassa järjestettiin 1872 koko Venäjän teknillinen eli
       *     polyteknillinen näyttely Pietari Suuren syntymän
       *     kaksisataavuotispäivän kunniaksi;
       *   - näyttelyn takana oli luonnontieteen, antropologian ja
       *     etnografian harrastajien seura, joka oli perustettu 1863;
       *     puuhamiehinä olivat yliopiston professorit Grigori
       *     Shtshurovski, Anatoli Bogdanov ja August Davidov;
       *   - Moskovan kaupunginvaltuusto varasi 1871 puoli miljoonaa
       *     ruplaa museon perustamiseen, ja museon pohjaksi tulivat
       *     vuoden 1872 näyttelyn kokoelmat;
       *   - museo avattiin 12. joulukuuta 1872 vuokratiloissa
       *     Pretshistenkalla; oman talon peruskivi laskettiin 1874 ja
       *     talo vihittiin 30. toukokuuta 1877; kahden muun siiven
       *     rakentaminen venyi vuoteen 1906;
       *   - museon tehtäväksi kirjattiin, että tiedon on siirryttävä
       *     oppineen työhuoneesta kansan omaisuudeksi.
       *
       * HEVOSRAITIOTIE (ru-Wikipedia "Московский трамвай", johdanto:
       * *"линии конки действовали с 1872 года"*, ja en-Wikipedia
       * "Moscow tram", johdanto: *"Opened in 1872"*; haettu 30.8.2026).
       * TARKKUUS: molemmat lähteet antavat vain vuoden. Teksti sanoo
       * siis "samana vuonna" eikä väitä, että rata olisi rakennettu
       * näyttelyä varten — sitä yhteyttä kumpikaan lähde ei sano.
       */
      id: 'nayttely1872',
      nappi: 'Kaupunki, joka oli edellisenä kesänä täynnä koneita',
      otsikko: 'Vuoden 1872 näyttely',
      teksti: 'Isoisäsi tuli vuoden myöhässä. Kesällä 1872 Moskova oli '
        + 'ollut yhtä suurta näyttelyä: koko Venäjän teknillinen '
        + 'näyttely järjestettiin Pietari Suuren syntymän '
        + 'kaksisataavuotispäivän kunniaksi, ja sen takana oli '
        + 'luonnontieteen, antropologian ja etnografian harrastajien '
        + 'seura yliopiston professoreineen. Kaupunginvaltuusto oli '
        + 'varannut edellisenä vuonna puoli miljoonaa ruplaa siihen, '
        + 'mitä näyttelystä jäisi jäljelle. Ja jotain jäi: näyttelyn '
        + 'kokoelmista koottiin museo, joka avattiin 12. joulukuuta '
        + '1872 vuokratuissa huoneissa Pretshistenkalla. Kun isoisäsi '
        + 'käveli kaupungissa seuraavana heinäkuuna, museo oli siis '
        + 'olemassa mutta asui vielä toisen talossa; oman talonsa '
        + 'peruskivi laskettiin 1874 ja rakennus vihittiin 30. '
        + 'toukokuuta 1877. Museon tehtävä kirjoitettiin auki tavalla, '
        + 'joka olisi miellyttänyt häntä: tiedon pitää siirtyä oppineen '
        + 'työhuoneesta kansan omaisuudeksi. Samana vuonna 1872 '
        + 'kaupunkiin tuli myös ensimmäinen kiskoilla kulkeva '
        + 'joukkoliikenne, hevosten vetämä raitiovaunu. Isoisäsi, joka '
        + 'pelkää hevosia mutta ei myrskyjä, saapui siis kaupunkiin, '
        + 'jossa hevoset oli juuri pantu kulkemaan kiskoja pitkin '
        + 'aikataulun mukaan.',
      /*
       * Commons 30.8.2026: 1443×1803, public domain, tekijä tuntematon,
       * päiväys 1872, Credit "Альбом Видов. Составлен по распоряжению
       * комитета Выставки" (Типография И.Н.Кушнерева, Москва, 1872),
       * kuvaus "Russia. Moscow. Polytechnic exhibition. Main entrance
       * (from Voskresenskoe sq.), 1872." Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: seepiasävyinen albumivalokuva, jossa
       * puinen koristeellinen sisäänkäyntipaviljonki, neljä lipputankoa
       * ja tyhjä mukulakivikatu; kuvassa ei ole yhtään ihmistä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on näyttelyn oman komitean
       * teettämästä kuva-albumista, eli aikalaislähde itse näyttelystä
       * — ja se näyttää portin, jonka isoisä ohitti vuotta liian
       * myöhään.
       */
      kuva: {
        tiedosto: '(05) Москва. Политехническая выставка. Главный вход. 1872г e1t3.jpg',
        selite: 'Vuoden 1872 polyteknillisen näyttelyn pääsisäänkäynti '
          + 'näyttelykomitean omassa kuva-albumissa: puinen paviljonki '
          + 'Voskresenskin aukion puolelta.',
        lahde: 'Tuntematon tekijä 1872, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Minkä vuosipäivän kunniaksi Moskovan suuri teknillinen '
          + 'näyttely järjestettiin vuonna 1872?',
        vaihtoehdot: [
          'Pietari Suuren syntymän 200-vuotispäivän',
          'Moskovan yliopiston perustamisen satavuotispäivän',
          'Kremlin muurien nelisataavuotispäivän',
        ],
        oikea: 0,
        fakta: 'Näyttelyn kokoelmista koottiin museo, joka avattiin 12. '
          + 'joulukuuta 1872 vuokratiloissa ja sai oman talonsa vasta '
          + '1877. Samana vuonna 1872 kaupungissa aloitti myös hevosten '
          + 'vetämä raitiovaunu.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   *
   * EI POHJUSTA MITÄÄN KYSYMYSTÄ, JA SE ON HARKITTU. Muissa
   * fokuskaupungeissa oppitunti pohjustaa laattakysymyksen, mutta
   * Moskovan aarrekysymys tulee tarinakaaren paketista (Tsaarinkellon
   * lohkeama) ja sen vastaus lukee jo kaupunkilehdessä. Jos oppitunti
   * pohjustaisi sitä, se antaisi vastauksen kahdesti ennen kysymystä.
   * Oppitunti syventää siis merkinnän TOISTA lausetta — kelloja, joita
   * on niin monta, että kauppias lopettaa tinkimisen — ja pysähtyy
   * tarkoituksella siihen kelloon, joka soi. Tsaarinkelloa ei mainita
   * tässä sanallakaan.
   *
   * FAKTAT (en-Wikipedia "Kremlin clock", osiot "Early history" ja
   * "History", ja ru-Wikipedia "Спасская башня", osio "Куранты";
   * haettu 30.8.2026):
   *   - kellotaulut ovat tornin neljällä sivulla; halkaisija 6,12
   *     metriä, roomalaisten numeroiden korkeus 0,72 metriä,
   *     tuntiosoitin 2,97 ja minuuttiosoitin 3,27 metriä; kehä, numerot
   *     ja osoittimet on kullattu, ja koko rakenteen massa on 25 tonnia;
   *     koneisto on tornin kymmenennessä kerroksessa;
   *   - vanha taulu oli jaettu 17 osaan, yhtä monta kuin vuoden pisimmän
   *     päivän valoisia tunteja; taulu pyöri ja osoitin oli paikallaan,
   *     ja sen kuvana oli aurinko; kyrilliset numerot olivat noin 71
   *     senttiä (yksi arshin) korkeat, valettu messingistä ja
   *     kullattu;
   *   - 1625 skotlantilainen Christopher Galloway rakensi venäläisten
   *     mestareiden kanssa uuden kellon; sen kolmetoista kelloa valoi
   *     seppä Kiril Samoilov; kello paloi 1626 ja korjattiin;
   *   - Pietari I:n käskystä 1706 tilalle tuli Hollannista ostettu
   *     kello, joka tuotiin Amsterdamista kolmellakymmenellä kärryllä
   *     ja jossa oli tavallinen kahdentoista tunnin taulu;
   *   - 1851–1852 veljekset Nikolai ja Ivan Butenop tekivät nykyiset
   *     kellopelit ja käyttivät osia vanhasta koneistosta;
   *     restauroinnin metalliportaat, lattiat ja koneiston jalusta
   *     tehtiin arkkitehti Konstantin Thonin piirustusten mukaan;
   *   - kuudelta ja kahdeltatoista soitettiin Preobrazhenskin rykmentin
   *     marssi, kolmelta ja yhdeksältä Dmitri Bortnjanskin hymni "Kuinka
   *     kunniakas on Herramme Siionissa"; hymniksi ehdotettiin
   *     valtakunnan omaa, mutta Nikolai I kielsi sen sanoen, että
   *     kellopelit saavat soittaa mitä tahansa muuta;
   *   - 1913 kello restauroitiin Romanovien 300-vuotisjuhlaan;
   *   - vuodesta 1938 koneisto ei enää soittanut sävelmiä vaan pelkästään
   *     löi tunnit ja neljännekset; sävelmät palasivat 1996.
   *
   * IKÄSOPIVUUS (13+): kello kerrotaan koneena ja tapana, ei
   * juhlapuheena. Vuoden 1917 vauriot ja eri aikakausien sävelmävalinnat
   * on jätetty pois — ne ovat politiikkaa ja sotaa, eivät tätä tuntia.
   */
  oppitunti: {
    otsikko: 'Kello, joka ei saanut soittaa hymniä',
    teksti: 'Niistä kelloista, joita isoisäsi laski, yksi oli koko '
      + 'kaupungin tahtipuikko. Tornin neljällä sivulla on kellotaulu, '
      + 'jonka halkaisija on 6,12 metriä; roomalaiset numerot ovat '
      + '72 senttiä korkeat, tuntiosoitin lähes kolme metriä ja '
      + 'minuuttiosoitin runsaat kolme, ja koko laitos painaa 25 tonnia. '
      + 'Koneisto asuu tornin kymmenennessä kerroksessa. Alkuperäinen '
      + 'taulu oli aivan toisenlainen: se oli jaettu seitsemääntoista '
      + 'osaan, yhtä moneen kuin vuoden pisimmässä päivässä on valoisia '
      + 'tunteja, ja se pyöri itse, kun osoitin pysyi paikallaan. '
      + 'Numerot olivat kyrillisiä, messinkiä ja kullattuja, kutakuinkin '
      + 'kyynärän korkuisia. Vuonna 1625 skotlantilainen Christopher '
      + 'Galloway rakensi venäläisten mestareiden kanssa uuden kellon, '
      + 'ja sen kolmetoista kelloa valoi seppä nimeltä Kiril Samoilov. '
      + 'Pietari Suuri vaihtoi koko laitteen 1706 hollantilaiseen '
      + 'kelloon, joka tuotiin Amsterdamista kolmellakymmenellä '
      + 'kärryllä ja jossa oli tavallinen kahdentoista tunnin taulu. '
      + 'Ja tässä on se kohta, jonka isoisäsi olisi mitannut: kello, '
      + 'jonka hän kesällä 1873 kuuli, oli silloin vasta parikymmentä '
      + 'vuotta vanha. Veljekset Nikolai ja Ivan Butenop olivat tehneet '
      + 'sen 1851–1852 ja käyttäneet siihen osia vanhasta koneistosta. '
      + 'Se soitti neljä kertaa vuorokaudessa kahta sävelmää: kuudelta '
      + 'ja kahdeltatoista rykmentin marssia, kolmelta ja yhdeksältä '
      + 'säveltäjä Dmitri Bortnjanskin hengellistä hymniä. Kolmatta ei '
      + 'ollut, vaikka sitä oli ehdotettu — valtakunnan oma hymni oli '
      + 'nimenomaan kielletty, ja kieltäjä oli keisari itse: soittakoot '
      + 'kellot mitä tahansa muuta. Sävelmät vaikenivat vuodesta 1938, '
      + 'ja pitkään torni vain löi tunnit ja neljännekset. Soittamaan se '
      + 'alkoi uudelleen vasta 1996.',
    /*
     * Commons 30.8.2026: 4608×3072, CC BY-SA 4.0, Анастасия Тарасова,
     * kuvattu 16.12.2012, kuvaus "Спасская башня: Тверской, Центральный
     * округ, Москва". Restrictions tyhjä. SILMÄTARKISTUS tehty: tornin
     * yläosa harmaata taivasta vasten, kullattu kellotaulu roomalaisine
     * numeroineen ja sen yläpuolella kellot avoimessa aukossa — ei
     * ihmisiä.
     */
    kuva: {
      tiedosto: 'Спасская башня. Часы.jpg',
      selite: 'Tornin kellotaulun halkaisija on 6,12 metriä ja numerot '
        + '72 senttiä korkeat; kellot soittavat taulun yläpuolella '
        + 'olevasta aukosta.',
      lahde: 'Анастасия Тарасова, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * HAHMO ON KAANONIA, KORTTITEKSTI EI. Vera on tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id 'moskova'):
   * *"Kellonvalajan jälkeläinen Vera tuntee suuren kellon pronssin
   * jokaisen sävyn ja lohkeaman koko tarinan."* Alla oleva esittelyteksti
   * on sen sijaan EHDOTUS eikä kaanonia, ja se on kirjoitettu tähän
   * pakettiin kolmella rajoitteella:
   *
   *   1. SE EI KERTAA VERAN REPLIIKKIÄ. Kaaressa Vera puhuu itse
   *      ("Sukuni valoi kelloja…"), ja kortti, joka toistaisi saman,
   *      kertoisi tarinan kahdesti saman kaupungin sisällä
   *      (tarinakaari, luku 5).
   *   2. SE EI PALJASTA VASTAUSTA. Aarrekysymys on Tsaarinkellon
   *      lohkeaman syy, joten tässä ei puhuta tulipalosta, vedestä
   *      eikä lohkeamasta — vain siitä, että suvulla on kipeä kohta.
   *   3. VARALLISUUSSÄÄNTÖ. Isoisä ei maksa mitään, ei tilaa mitään
   *      eikä käske ketään: syy, jonka takia Vera on jäänyt pronssin
   *      ääreen, on suvun oma ammattiylpeys ja kesken jäänyt työ.
   *
   * ÄÄNIPROFIILI (tarinakaari, luku 3): Vera on niitä, jotka HÄMMÄSTYVÄT
   * ITSEKIN — hän on kuullut isoisän kysymyksen sukunsa kautta eikä ole
   * koskaan päässyt siitä yli. Erän muut äänet (puhelias, äreä,
   * epäuskoinen) ovat aallon muissa kaupungeissa.
   *
   * KUVAA EI OLE (omistajan linjaus): kentät ovat hahmo, nappi,
   * varmistus, vihjeOsio ja teksti.
   */
  kohtaaminen: {
    hahmo: 'Kellonvalajan jälkeläinen Vera',
    nappi: 'Tapaa Vera',
    varmistus: 'Haluatko varmasti tavata Veran juuri nyt?',
    /*
     * VIHJELINKIN OSIO (omistajan pelitestipalaute v1119, kohta 13):
     * rivi kertoo, MISTÄ PÄIN LEHTEÄ ratkaisu löytyy, vastausta
     * paljastamatta, ja avaa lehden siihen osioon. Tunnus on
     * kaupunkilehden osion id (js/packs/kulttuuri-kategoriat.js,
     * moskova): 'kaupunki' tai 'arki'. Aarrekysymyksen tuki on
     * kaupunkisivulla, jonka ensimmäinen nosto kertoo suuresta kellosta.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Vera kuulee pronssista sen, minkä muut näkevät vasta '
      + 'valokuvasta: hän koputtaa rystysellä, painaa kämmenen kylkeen '
      + 'ja kertoo, missä kohtaa metalli on jäähtynyt liian nopeasti. '
      + 'Suvussa valettiin kelloja niin kauan, että ammatti jäi jäljelle '
      + 'vaikka paja meni — nykyään hän hoitaa muiden valamia kelloja '
      + 'eikä ole koskaan itse valanut yhtäkään. Sukuun jäi yksi työ, '
      + 'joka ei koskaan tullut valmiiksi, ja siitä ei ole tapana puhua '
      + 'kahvipöydässä. Isoisäsi seisoi tässä samassa varjossa ja kysyi '
      + 'siitä työstä kysymyksen, jota Vera ei ole vieläkään saanut '
      + 'päästään pois — hän hämmästyy sitä itsekin. Vastauksen hän '
      + 'kuulee mielellään, mutta vasta tulijan suusta.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin Ateenalla, Sofialla, Madridilla ja
   * Sevillalla.
   */

  /*
   * KOHTAAMISPAIKKA: SUUREN KELLON JALUSTA KREMLIN PIHALLA.
   *
   * Kaaren teksti vie isoisän kellon kylkeen, ja Vera odottaa siellä.
   * Paikka on nimetty kiertäen: nimi ei sano, mikä kello on kyseessä
   * eikä mitä sille tapahtui (ks. spoilerirajoite 2 yllä).
   *
   * 55,75083 N / 37,61833 E — ru-Wikipedia "Царь-колокол",
   * prop=coordinates (haettu 30.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((37,61833 − (−175)) mod 360) × (12000/360)
   *                     = 212,61833 × 33,3333… = 7087,3
   *                   y = (millerY(76) − millerY(55,75083)) × 12000/2π
   *                     = 1130,8
   *   europe          x = (37,61833 + 11) × 19,2 = 933,5
   *                   y = (72 − 55,75083) × 26,3 = 427,4
   *
   * TARKISTUS LAATTAA VASTEN: Moskovan laatta on Euroopan laudalla
   * 934 / 427 (js/packs/europe.js) ja maailmankartalla 7088,2 / 1130,2
   * (js/packs/maailmankartta.js), eli piste osuu käytännössä laatan
   * päälle. Niin pitääkin — linnoitus on kaupungin keskellä. Piirtopuoli
   * hoitaa erotuksen itse: alle 14 yksikön päässä laatasta piste
   * siirretään koilliseen (js/fokuspiste.js PISTE_ERO_MIN), kuten
   * Tukholmassa.
   */
  kohtaamispiste: {
    nimi: 'Suuren kellon jalusta',
    laudat: {
      maailmankartta: { x: 7087.3, y: 1130.8 },
      europe: { x: 933.5, y: 427.4 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Moskovan sivupino (js/lehti.js
   * rakennaSivut) on Sofian mittainen, koska kaupungilla on kaksi
   * kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Moskova", 2 = Arki ja tavat, 3 = Menovinkit
   * (Venäjän maapaketista, js/packs/maa-kategoriat.js RUS).
   *
   * Sivun 1 kysymys on Moskovan kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä. Siksi nimetyt
   * tehtävät ovat sivuilla 2 ja 3, kuten Sofiassa ja Tukholmassa.
   *
   * JULISTE ON OLEMASSA: js/packs/julisteet.js:ssä on `moskova`-rivi
   * (tuotanto/tuot-moskova.png), joten sivun 3 tehtävä lunastaa
   * lupauksensa heti eikä jää pelkäksi rahapalkkioksi.
   */
  lehtitehtavat: [
    {
      id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: MASLENITSA_VISA,
    },
    {
      id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: ALLAS_VISA,
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. Iso
   * aarre: tsaarin kadonnut pääsiäismuna. Merkintä on kirjoitettu niin,
   * ettei se tunne munia lainkaan (ks. ANAKRONISMIVAARA tiedoston
   * alussa): vuonna 1873 isoisä voi kuulla vain hovin kultasepistä ja
   * luetteloista. Merkintä aukeaa, kun aarre löytyy (js/fokusvirta.js
   * fokusvirtaAarremerkinta), samaan matkakirjakorttiin kuin
   * saapumismerkintä.
   */
  aarremerkinta: {
    teksti: 'Kauppias kuiskasi teen ääressä, että hovin kultasepiltä '
      + 'tilataan lahjoja, joita ei koskaan näytetä kansalle — keisarin '
      + 'perheen omia saleja varten. Sellainen esine elää vain '
      + 'luetteloissa, hän sanoi, ja kun luettelo palaa tai valtakunta '
      + 'kaatuu, esine katoaa kuin sitä ei olisi ollutkaan. Silloin sen '
      + 'löytää se, joka uskoo luetteloa eikä virallista totuutta.',
  },
};
