/*
 * OSLON FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-bergen.js:lle (sama maa, aalto 4A)
 * ja js/packs/fokusvirta-tukholma.js:lle: samat kentät, sama järjestys,
 * sama moottori (js/fokusvirta.js). Aalto 4B, Norja.
 *
 * KAUPUNGIN NIMI. Pelissä kaupunki on Oslo, mutta isoisän vuonna 1873
 * se on Kristiania — kaanon hoitaa vaihdoksen itse: paikkarivi lukee
 * Kristiania ja Livian kupla kertoo, että vanha nimi palautettiin 1925.
 * Tämä paketti ei selitä sitä toistamiseen missään.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026, aallon 4B kaanonteksti):
 * matkakirjan paikkarivi ja teksti, Livian kuplateksti (`pollo.teksti`)
 * ja aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamansa —
 * niitä ei ole lyhennetty, yhdistetty eikä sanajärjestystä muutettu.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: viikinkien hopeakätkö (aarremerkintä). Sama pari on jo
 * maan paikallisaarteissa (js/packs/paikallisaarteet.js, NOR isoAarre
 * "Viikinkien hopeakätkö"), joten löytökortissa lukee sama nimi kuin
 * merkinnässä. Aalto 4B:n uudet aarreparit (ITA/FRA/FIN/LTU/ESP) eivät
 * koske Oslo — Norjan pari on kirjattu jo Bergenin kanssa.
 *
 * FAKTAPOHJA. Oslolla ei ole valmista työaineistoa docs/mantereet-
 * tyoaineisto/-kansiossa, joten käytössä on kaksi lähdettä ja vain ne:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Oslon kaupunkilehden sivut
 *      (js/packs/kulttuuri-kategoriat.js, oslo: 'kaupunki' ja
 *      'laivat'), kaupungin artikkeli (js/packs/europe-artikkelit.js,
 *      Oslo), laattakysymykset (js/packs/europe-questions.js, oslo),
 *      kulttuurivisa (js/packs/europe-kulttuuri.js, oslo) ja Norjan
 *      maalehti (js/packs/maa-kategoriat.js, NOR). Nämä on jo
 *      kertaalleen tarkistettu ja hyväksytty peliin.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei
 *      ole, on haettu Wikipediasta 29.8.2026 ja katsottu KAHDESTA
 *      riippumattomasta lähteestä. Ne on nimetty kunkin kohdan omassa
 *      kommentissa. Mitään ei ole päätelty eikä pyöristetty.
 *
 * PÄÄLLEKKÄISYYS ON TIETOINEN JA RAJATTU. Oslon lehti kertoo laivat
 * (Oseberg, Fram, Kon-Tiki), Griegin Peer Gyntin, ruskean juuston,
 * Vigelandin puiston, metsän ja ilmastobudjetin — eikä yksikään täky
 * koske niitä. Täyt kulkevat sen sijaan siitä, mistä isoisän merkintä
 * kirjoittaa: omista saduista, unionikysymyksestä ja illallislohesta.
 * Norjan maalehden nostoista ei ole otettu yhtäkään, koska Bergen otti
 * niistä viisi (sauvakirkko, myskihärkä, Geirangervuono, Amundsen,
 * Ekofisk) — sama maa, kaksi kaupunkia, ei samaa juttua kahdesti.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellista.
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── EI TÄKYNOSTOJA ─────────────────────────────────────────────────
 *
 * `takynostot`-kenttää EI ole. Norjan pooli on kirjoitettu Bergenin
 * pakettiin (amundsen + ekofisk), eikä sitä monisteta tänne: kaksi
 * kopiota ajautuisi erilleen ensimmäisellä korjauksella.
 *
 * HUOMIO FABLELLE — POOLI EI NÄY OSLOSSA ILMAN YHTÄ RIVIÄ. js/
 * fokusnosto.js nostoMaanPooli lukee ensin kaupungin oman
 * `takynostot`-kentän ja sitten NOSTO_MAAT-taulun. Oslolla ei ole omaa
 * kenttää eikä taulussa ole NOR-riviä, joten Oslossa ei nouse yhtään
 * täkynostoa. Korjaus on sama yhden rivin kuvio, jota Espanja,
 * Itävalta, Ranska ja Saksa käyttävät (js/fokusnosto.js, "NELJÄN MAAN
 * POOLIT"): `NOR: FOKUSVIRTA_BERGEN.takynostot`. Rivi ei kuulu tämän
 * tehtävän rajaukseen (vain tämä tiedosto), joten sitä ei ole tehty.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luenta on generoitu 30.8.2026 (tools/generoi-luennat.mjs, lähteenä
 * tämän lohkon oma `matkakirja.luenta`) ja `matkakirja.aanite`
 * osoittaa siihen: assets/audio/puhe-fokus-matkakirja-oslo.mp3.
 * Teksti ja luenta ovat sanasta sanaan samat, joten tekstin muutos
 * vaatii uuden generoinnin.
 *
 * ── KUVIEN TARKISTUS ───────────────────────────────────────────────
 *
 * LISENSSI, TEKIJÄ, KOKO JA RAJOITUKSET on luettu Commonsin
 * rajapinnan `extmetadata`-kentistä 29.8.2026 KAIKISTA viidestä
 * kuvasta. Yhtään nimeä ei ole arvattu, ja jokaisen Restrictions-kenttä
 * oli tyhjä.
 *
 * SILMÄTARKISTUS 960 px:n esikatselusta on tehty KAIKISTA viidestä, ja
 * havainto on kirjattu kunkin kuvan omaan kommenttiin. Yhdessäkään ei
 * ole tunnistettavia nykyihmisiä; ainoat ihmishahmot ovat
 * Nobel-instituutin kuvassa kaksi ohikulkijaa kadun toisella puolella,
 * niin kaukana ettei kasvoja erota.
 *
 * HYLÄTTY KUVA (kirjattu, jottei sitä yritetä uudestaan):
 * "OsloNobelinstituteCommitteeRoom.JPG" näyttäisi juuri sen pöydän,
 * jonka ääressä viisi ihmistä päättää palkinnosta, mutta kuva on otettu
 * opastetulla kierroksella ja siinä on kymmenkunta tunnistettavaa
 * nykyihmistä. Siksi oppitunnin kuvana on saman talon julkisivu.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Osebergkysymys on Oslon lehden sivun 2
 * ("Laivat") oman noston "Laiva kaivettiin ylös hautakummusta" tekstiä
 * ja Peer Gynt -kysymys sivun 1 ("Oslo") oman noston "Vuorenkuninkaan
 * luolassa" tekstiä (js/packs/kulttuuri-kategoriat.js). Uusia
 * faktaväitteitä ei ole kummassakaan.
 *
 * SIVU 3 EI OLE AIHESIVU. Oslon lehdessä on vain kaksi kaupungin omaa
 * kategoriaa, joten sivu 3 on maan yhteinen Menovinkit-sivu (js/
 * lehti.js rakennaSivut). Nimetty tehtävä toimii siellä — juuri sitä
 * varten js/fokustehtavat.js piirraSivunTehtava lakkasi vaatimasta
 * sivun omaa tehtävää — ja kysymys otetaan silloin sivulta 1, kuten
 * Tallinnassa (js/packs/fokusvirta-tallinna.js).
 *
 * KUMPIKAAN EI KYSY SIVUN OMAA TEHTÄVÄÄ. Laivat-sivun oma tehtävä
 * kysyy, miksi Framin runko tehtiin pyöreäpohjaiseksi — Osebergkysymys
 * väistää sen kokonaan.
 *
 * KUMPIKAAN EI MYÖSKÄÄN KYSY LAATTAKYSYMYSTEN EIKÄ TARINAKAAREN
 * VASTAUKSIA. Oslon laattakysymykset (js/packs/europe-questions.js)
 * koskevat Norjaa, vuonon syntyä, Nobelin rauhanpalkintoa, Thor
 * Heyerdahlin balsalauttaa ja Framia; tarinakaaren oma kysymys
 * (js/packs/tarinakaari.js, oslo) kysyy, MIKÄ säilytti kummuista
 * nostetut laivat. Siksi Osebergkysymys ei kysy säilymisen syytä vaan
 * keulan koristekierteen tekotapaa, eikä sen faktarivissä puhuta
 * savesta.
 */
const OSEBERG_VISA = {
  kysymys: 'Osebergin laivan keulassa kaartuu koristekierre. Miten se on '
    + 'tehty?',
  vaihtoehdot: [
    'Höyryttämällä ja taivuttamalla kolme ohutta lautaa yhteen',
    'Veistämällä yhdestä ainoasta puukappaleesta',
    'Kokoamalla se pienistä paloista puutapein',
  ],
  oikea: 1,
  fakta: 'Laiva rakennettiin noin vuonna 820 ja haudattiin neljätoista '
    + 'vuotta myöhemmin maakummun alle. Mukaan pantiin kaksi vainajaa ja '
    + 'koko talouden tavarat: koristeltu kärry, neljä rekeä, vuoteita ja '
    + 'kudottuja kankaita. Laiva kaivettiin esiin vuonna 1904.',
};

const PEER_GYNT_VISA = {
  kysymys: 'Griegin Vuorenkuninkaan luolassa on koko orkesterin '
    + 'kestävyyskoe. Millä keinolla se rakentuu?',
  vaihtoehdot: [
    'Kaksi eri melodiaa soi päällekkäin eri tahtilajeissa',
    'Sama sävelkulku soitetaan vuorotellen jokaisella soittimella yksin',
    'Sama lyhyt sävelkulku toistuu ja kiihtyy loppua kohti',
  ],
  oikea: 2,
  fakta: 'Henrik Ibsenin Peer Gynt sai ensi-iltansa Christianiassa 24. '
    + 'helmikuuta 1876, ja Grieg kirjoitti näytelmään 26 musiikkinumeroa. '
    + 'Loppua kohti soittajilla on työ pysyä mukana.',
};

export const FOKUSVIRTA_OSLO = {
  kaupunki: 'oslo',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan. */
    paikkarivi: 'Kristiania, heinäkuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Kaupungin nimi on Kristiania, ja se on nuori pääkaupunki '
      + 'vanhassa maassa: katuja vedetään suoriksi, yliopisto on täynnä ja '
      + 'vuonolla höyrylaiva ohittaa purjeet kuin ohimennen. Täällä '
      + 'puhutaan kansallishengestä joka toisessa lauseessa — omasta '
      + 'kielestä, omista saduista, omista vuorista. Illalla söin lohta ja '
      + 'kuuntelin ylioppilaita, jotka väittelivät siitä, kenen Norja '
      + 'oikeastaan on. Ruotsin kuninkaan, sanoi laki. Ei kauan, sanoivat '
      + 'he.',
    /*
     * LUENTA = sama teksti, vain tunnetagit lisätty (Raamattu,
     * luentaprosessi): kolme tagia, alku ja loppu eri sävyssä.
     */
    luenta: '[curious] Kaupungin nimi on Kristiania, ja se on nuori '
      + 'pääkaupunki vanhassa maassa: katuja vedetään suoriksi, yliopisto '
      + 'on täynnä ja vuonolla höyrylaiva ohittaa purjeet kuin ohimennen. '
      + '[warmly] Täällä puhutaan kansallishengestä joka toisessa '
      + 'lauseessa — omasta kielestä, omista saduista, omista vuorista. '
      + 'Illalla söin lohta ja kuuntelin ylioppilaita, jotka väittelivät '
      + 'siitä, kenen Norja oikeastaan on. [softly] Ruotsin kuninkaan, '
      + 'sanoi laki. Ei kauan, sanoivat he.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-oslo.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden avauskuva) ----- */
  pollo: {
    /*
     * LIVIAN MAADOITUS — TARKENNUSOTE (Raamattu, "LIVIA AIKASIIRTYMÄN
     * VÄLITTÄJÄNÄ — PARIPERIAATE"). Merkintä päättyy lakiin ja
     * vastaväitteeseen, joten maadoitus ei naljaile vaan tarkentaa:
     * isoisä kuuli lain oikein, mutta laki oli vain puolet asiasta.
     * Piikkiä ei osoiteta paikallisiin missään kohdassa.
     *
     * FAKTAKURI: yksi väite, kaksi lähdettä. Norjalla oli unionissa oma
     * perustuslaki, oma suurkäräjät, omat lait ja oma valtiokirstu;
     * yhteistä olivat kuningas ja ulkopolitiikka, ja ulkopolitiikka
     * päätettiin Ruotsin hallituksessa ja hoidettiin Ruotsin
     * ulkoministeriössä — en-Wikipedia "Union between Sweden and Norway"
     * (johdanto: *"separate constitutions, laws, legislatures,
     * administrations, state churches, armed forces, and currencies"*;
     * *"a common monarch and common foreign policy"*; *"Foreign policy
     * was decided in the Swedish cabinet and conducted by the Swedish
     * ministry of foreign affairs"*), ja sama asetelma no-Wikipedian
     * "Norges flagg" -artikkelin unioniosiossa, jossa lippukiista
     * kulkee juuri siitä, kumpi maa on toisen alainen. Perustuslain
     * päiväys 17.5.1814 on lisäksi pelin omassa artikkelissa
     * (js/packs/europe-artikkelit.js, Oslo). Tarkistettu 29.8.2026.
     *
     * MIKSI EI 1905: kaanonin kuplateksti kertoo itsenäistymisvuoden
     * heti perään, eikä maadoitus saa syödä sitä etukäteen.
     *
     * PUHEKIELIPASSI: lyhentymät vain reunoilla ("Mut"), keskellä sanat
     * auki; pronominit kokonaisina; ei huutomerkkejä.
     */
    maadoitus: 'Isoisäsi kuuli lain oikein, mut laki oli vain puolet '
      + 'asiasta.. Norjalla oli unionissakin oma perustuslaki vuodesta '
      + '1814, omat suurkäräjät, omat lakinsa ja oma valtiokirstunsa. '
      + 'Yhteistä olivat kuningas ja ulkopolitiikka, ja se ulkopolitiikka '
      + 'päätettiin Ruotsin hallituksessa ja hoidettiin Ruotsin '
      + 'ulkoministeriössä. Ne ylioppilaat eivät siis väitelleet tyhjästä: '
      + 'puolet vastauksesta oli heillä jo kädessä, ja he väittelivät '
      + 'toisesta puolesta.',
    /* KAANON (Fable) — kuplateksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Ylioppilaat olivat oikeassa — Norja itsenäistyi 1905, ja '
      + 'Kristiania sai takaisin vanhan nimensä Oslo 1925.. Ne omat sadut '
      + 'kerättiin juuri isoisäsi vuosikymmeninä talteen, ja niistä tuli '
      + 'tämän maan selkäranka. Vuonolla kulkee yhä laivoja, tosin nykyään '
      + 'moni niistä on museossa — tämä kaupunki säilöö laivoja niin kuin '
      + 'muut säilövät kirjoja. Aloitetaan rannasta.',
    /*
     * KUVA ON KAUPUNKILEHDEN AVAUSKARUSELLISTA (omistajan korjaus 2),
     * eikä generoitu hero vaan karusellin oma Commons-valokuva
     * (js/packs/kulttuuri-kategoriat.js, oslo/avauskuvat).
     *
     * PERUSTELU FABLELLE: kuplateksti on kaanonia eikä sitä saa muuttaa,
     * ja se päättyy sanoihin *"Aloitetaan rannasta."* Oslon neljä
     * generoitua heroa esittävät oopperataloa, Akershusia, Holmenkollenia
     * ja kuninkaanlinnaa; yksikään ei näytä rantaviivaa kokonaisuutena.
     * Sama karuselli tarjoaa ilmakuvan vuonon pohjukasta, jossa ranta,
     * saaret ja kaupunki ovat yhdessä kuvassa — teksti ja kuva puhuvat
     * silloin samasta asiasta.
     *
     * Commons 29.8.2026: 5176×3063, CC BY-SA 3.0, Chell Hill, kuvaus
     * "Aerial view of the inner Oslofjord and Oslo, with Nesodden to the
     * left", päiväys 25.10.2010. Restrictions tyhjä. SILMÄTARKISTUS tehty
     * 960 px:n esikatselusta: ilmakuva sisemmästä Oslovuonosta, saaria ja
     * niemiä vedessä, kaupunki oikealla rinteessä; ei ihmisiä.
     */
    kuva: {
      tiedosto: '2010-10-25 Oslo.jpg',
      selite: 'Oslo on rakennettu Oslovuonon pohjukkaan, ja kaupungin '
        + 'rajojen sisällä on 40 saarta ja 343 järveä.',
      lahde: 'Chell Hill, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisä kirjoitti, että täällä puhutaan omasta
       * kielestä ja omista saduista joka toisessa lauseessa. Tämä on se
       * työ, jota hän kuuli puhuttavan — ja se tehtiin lyijykynällä ja
       * muistikirjalla, ei juhlapuheilla.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Norwegian Folktales" (osiot Asbjørnsen and Moe,
       *     Publications ja Illustrators): Asbjørnsen oli opettaja ja Moe
       *     pappi, ja he olivat olleet ystäviä noin viisitoista vuotta
       *     kun ensimmäinen osa ilmestyi 1841; kokoelman suosio liittyi
       *     maan vasta saavuttamaan osittaiseen itsenäisyyteen ja
       *     1800-luvun kansallisaaltoon, ja työ vaikutti siihen
       *     kirjakieleen, josta tuli bokmål; esikuvana olivat Grimmin
       *     veljekset, jotka myös ylistivät kokoelmaa julkisesti;
       *     Asbjørnsen ja Moe sovelsivat Grimmien periaatetta eli
       *     yksinkertaista kieltä murteen sijaan mutta säilyttivät
       *     tarinoiden muodon, ja toisin kuin Grimmit he keräsivät
       *     tarinat itse kentältä; ensimmäinen vihko 1841 ilmestyi ilman
       *     nimiölehteä ja toimittajien nimiä, sitten niteet 1843 ja
       *     1844, toinen laitos 1852 ja uusi kokoelma 1871; ensimmäinen
       *     läpikuvitettu laitos oli vuoden 1879 Norske folke- og
       *     huldre-eventyr, ja myöhemmissä laitoksissa Erik Werenskiold
       *     ja Theodor Kittelsen nousivat pääkuvittajiksi — Kittelsen oli
       *     tuntematon aloittaessaan ja pääsi mukaan ystävänsä
       *     Werenskioldin suosituksesta.
       *   - no-Wikipedia "Norske Folkeeventyr" (johdanto ja osiot
       *     Asbjørnsen og Moe sekä De norske folkeminnearkivene): he
       *     tapasivat Norderhovin koulussa 1826 ja päättivät 1837 julkaista
       *     kokoelman; he kiersivät Etelä-Norjaa keräten lyijykynällä ja
       *     muistikirjalla akateemisten stipendien turvin; kirjakieli oli
       *     tuolloin lähellä tanskaa ja murteet keskenään hyvin erilaisia,
       *     ja ratkaisu oli sekoitus molempia; Moesta tuli pappi ja
       *     sittemmin piispa, Asbjørnsen jatkoi keräämistä; hän oli myös
       *     metsänhoitaja ja luonnontieteilijä; keräysmatkoja varten oli
       *     haettava apurahaa kirjallisesti ja matkan hyödystä oli
       *     jälkeenpäin tehtävä selko; aineistosta kasvoi kansallinen
       *     arkisto, joka perustettiin 1914 Kristianian yliopistoon
       *     nimellä Norsk Folkeminnesamling.
       *
       * RISTIRIITA, JOKA SANOTAAN ÄÄNEEN: uuden kokoelman vuosi on
       * molempien artikkelien leipätekstissä 1871, mutta no-Wikipedian
       * luettelo-osassa lukee samasta kirjasta 1868. Teksti käyttää
       * lukua 1871 ja sanoo vain "kaksi vuotta ennen".
       *
       * MITÄ EI KERROTA: Peer Gynt. Se on lehden sivun 1 oma nosto ja
       * tämän paketin JULISTE-tehtävän aihe, eikä sitä kerrota kahdesti.
       */
      id: 'sadut',
      nappi: 'Kaksi miestä ja muistikirja',
      otsikko: 'Asbjørnsen ja Moe',
      teksti: 'Peter Christen Asbjørnsen ja Jørgen Moe tapasivat koulussa '
        + 'vuonna 1826, päättivät 1837 julkaista kokoelman kansantarinoita '
        + 'ja kiersivät Etelä-Norjaa keräämässä niitä lyijykynällä ja '
        + 'muistikirjalla. Matkat kustannettiin akateemisilla stipendeillä: '
        + 'reitti oli perusteltava hakemuksessa etukäteen ja matkan hyöty '
        + 'selitettävä jälkikäteen. Ensimmäinen vihko ilmestyi 1841 ilman '
        + 'nimiölehteä ja ilman toimittajien nimiä, ja niteet seurasivat '
        + '1843 ja 1844. Vaikein kysymys ei ollut kerääminen vaan kieli. '
        + 'Kirjakieli oli tuolloin lähellä tanskaa, ja tarinat oli kerrottu '
        + 'murteilla, jotka poikkesivat toisistaan enemmän kuin nykyään. '
        + 'He käyttivät Grimmin veljesten periaatetta: yksinkertaista '
        + 'kieltä murteen sijaan, mutta tarinan oma muoto ennallaan. '
        + 'Grimmit kehuivat tulosta julkisesti — ja yhdessä asiassa '
        + 'norjalaiset tekivät toisin kuin esikuvansa, sillä he keräsivät '
        + 'tarinat itse kentältä. Siitä sekoituksesta tuli osa sitä '
        + 'kirjakieltä, jota nyt sanotaan bokmåliksi. Moesta tuli pappi ja '
        + 'sitten piispa; Asbjørnsen, joka oli myös metsänhoitaja ja '
        + 'luonnontieteilijä, jatkoi yksin. Uusi kokoelma ilmestyi 1871, '
        + 'kaksi vuotta ennen kuin isoisäsi kuunteli ylioppilaita. '
        + 'Ensimmäinen läpikuvitettu laitos tuli 1879, ja siitä alkoi se '
        + 'kuvasto, jonka moni tuntee tarinoita paremmin.',
      /*
       * UUSI KUVA (ei pelidatassa ennestään). Commons 29.8.2026:
       * 10031×6701, public domain, Theodor Kittelsen, päiväys 1904,
       * kokoelma Nasjonalmuseet (NG.M.00863). Restrictions tyhjä.
       * SILMÄTARKISTUS tehty 960 px:n esikatselusta: tumma lampi ja
       * lumpeenlehtiä, keskellä vedestä nousee hahmo, josta erottuvat
       * kaksi vihertävää silmää ja renkaat veden pinnalla; oikeassa
       * alanurkassa signeeraus "Th. Kittelsen 1904". Ei ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: teksti päättyy kuvastoon, jonka moni
       * tuntee tarinoita paremmin. Tämä on se kuvasto — ja sen tekijä on
       * juuri se kuvittaja, jonka teksti nimeää viimeisenä.
       */
      kuva: {
        tiedosto: 'Theodor Kittelsen - The Water Sprite - NG.M.00863 - National Museum of Art, Architecture and Design.jpg',
        selite: 'Theodor Kittelsenin Nøkken (1904) esittää veden haltijaa, '
          + 'joka tunnetaan norjalaisista kansantarinoista; Kittelsen tuli '
          + 'tunnetuksi Asbjørnsenin ja Moen satujen kuvittajana.',
        lahde: 'Theodor Kittelsen, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mitä Asbjørnsen ja Moe tekivät toisin kuin Grimmin '
          + 'veljekset?',
        vaihtoehdot: [
          'Julkaisivat tarinat murteella juuri sellaisina kuin ne kerrottiin',
          'Kirjoittivat vanhojen tarinoiden tilalle kokonaan uusia',
          'Keräsivät tarinat itse kentältä',
        ],
        oikea: 2,
        fakta: 'Keräysmatkat kuljettiin akateemisilla stipendeillä, ja '
          + 'muistiinpanovälineinä olivat lyijykynä ja muistikirja. '
          + 'Kielessä he sen sijaan seurasivat Grimmejä: yksinkertainen '
          + 'kieli murteen sijaan, tarinan muoto ennallaan. Grimmit '
          + 'kehuivat tulosta julkisesti.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkintä päättyy kysymykseen siitä, kenen Norja
       * on, ja lain ja ylioppilaiden erimielisyyteen. Tässä on sama
       * kysymys esineenä — lippu, jonka nurkassa se luki, ja joka
       * isoisän käydessä oli ollut siinä muodossa 29 vuotta.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Flag of Norway" (osio History): nykyisen lipun
       *     suunnitteli 1821 suurkäräjien jäsen Fredrik Meltzer, ja
       *     kamarit hyväksyivät sen 11. ja 16. toukokuuta; kuningas
       *     kieltäytyi allekirjoittamasta lippulakia mutta hyväksyi
       *     mallin siviilikäyttöön kuninkaallisella päätöksellä 13.
       *     heinäkuuta 1821; vuoteen 1838 asti Norjan lippua käytettiin
       *     vain pohjoisilla vesillä, koska maalla ei ollut sopimusta
       *     Pohjois-Afrikan kaappareiden kanssa ja etelässä oli
       *     purjehdittava Ruotsin tai unionin lipun suojassa; 1844
       *     molempien maiden lippujen kantoon pantiin unionimerkki,
       *     jossa yhdistyivät molempien värit, ja sitä sanottiin
       *     pilkallisesti tai leikillään sildesalateniksi, koska se
       *     muistutti sekavine väreineen molempien maiden
       *     aamiaispöydissä suosittua ruokalajia; aluksi unionilippu oli
       *     Norjassa suosittu, koska se osoitti maiden tasavertaisuuden,
       *     mutta unionin käydessä epäsuosituksi suurkäräjät poisti
       *     merkin kauppa- ja valtiolipusta 1898 — laki ei saanut
       *     kuninkaan vahvistusta mutta tuli voimaan, koska kolme
       *     peräkkäistä suurkäräjää oli hyväksynyt sen; "puhdas" lippu
       *     liehui ensi kerran 1899, ja sotalaivojen lipusta merkki
       *     poistui 9. kesäkuuta 1905; Ruotsi piti sen kaikissa
       *     lipuissaan 1. marraskuuta 1905 asti; Meltzer perusteli
       *     punaisen, valkoisen ja sinisen sillä, että ne "merkitsevät
       *     nyt vapautta", kuten Ranskan, Hollannin, Amerikan ja
       *     Englannin lipuissa.
       *   - no-Wikipedia "Norges flagg" (osiot Norges flagg av 1821,
       *     "Sildesalaten" ja niitä seuraava jakso): sama 1821, sama
       *     kuninkaan kieltäytyminen ja sama päätös 13.7.1821; erillinen
       *     kuninkaallinen päätös 17.7.1821 rajasi uuden lipun
       *     pohjoisille vesille, ja Kapp Finisterren eteläpuolella oli
       *     käytettävä vuoden 1818 yhteistä unionin kauppalippua
       *     suojana pohjoisafrikkalaisia merirosvoja vastaan, jotka
       *     saivat Ruotsilta suojelurahaa; "lipun vapautus" toteutui
       *     1838; unionimerkin toi kuningas Oscar I vuonna 1844
       *     yhteisen komitean esityksestä, ja se merkitsi maiden täyttä
       *     tasavertaisuutta; nimitys syntyi ensin Ruotsissa; puhdasta
       *     lippua ajoi Venstre, suurkäräjät hyväksyi sen 1892, 1895 ja
       *     1898, laki tuli voimaan ilman kuninkaan vahvistusta 10.
       *     joulukuuta 1898 ja käyttöön 15. joulukuuta 1899.
       *
       * MITÄ EI KERROTA, JA MIKSI:
       *   - Unionin purkautumisen kulku 1905. Kaanonin kuplateksti
       *     sanoo vuosiluvun, ja loppu on tarinakaaren asia.
       *   - Meltzerin kymmenvuotias poika, jonka no-Wikipedia mainitsee
       *     luonnoksen ensimmäisenä piirtäjänä. Vain yksi lähde, joten
       *     se jää pois.
       *   - Sotaväen liikkeet unionin viimeisenä vuonna. Peli ei kerro
       *     sotasisältöä (Raamattu); lippu riittää kertomaan saman.
       */
      id: 'unionilippu',
      nappi: 'Lippu, jonka nurkassa oli silakkasalaatti',
      otsikko: 'Unionimerkki lipun kannossa',
      teksti: 'Kun isoisäsi katsoi Kristianian satamassa norjalaisten '
        + 'laivojen lippuja, niiden kannossa eli lipputangon puoleisessa '
        + 'yläkulmassa oli pieni kirjava merkki, jossa Norjan ja Ruotsin '
        + 'värit olivat sekaisin. Nykyinen lippu oli suunniteltu jo 1821; sen teki '
        + 'suurkäräjien jäsen Fredrik Meltzer, ja hän perusteli punaista, '
        + 'valkoista ja sinistä sillä, että ne merkitsivät silloin '
        + 'vapautta — samat värit olivat Ranskan, Hollannin, Amerikan ja '
        + 'Englannin lipuissa. Kuningas kieltäytyi allekirjoittamasta '
        + 'lippulakia, mutta hyväksyi mallin siviilikäyttöön '
        + 'kuninkaallisella päätöksellä heinäkuussa 1821. Sillä lipulla sai '
        + 'kuitenkin purjehtia vain pohjoisilla vesillä: Kapp Finisterren '
        + 'eteläpuolella oli käytettävä yhteistä unionin kauppalippua, '
        + 'koska Norjalla ei ollut sopimusta Pohjois-Afrikan kaappareiden '
        + 'kanssa ja suoja tuli Ruotsin maksamana. Vasta 1838 lippu '
        + 'vapautui koko maailmaan. Kuusi vuotta myöhemmin, 1844, molempien '
        + 'maiden lippuihin pantiin yhteinen unionimerkki, joka jakoi '
        + 'värit tasan ja tarkoitti, että maat ovat samanarvoiset. Kansa '
        + 'antoi merkille nimen sildesalaten, silakkasalaatti, koska se '
        + 'muistutti väreiltään molempien maiden aamiaispöydän ruokalajia. '
        + 'Aluksi merkki oli Norjassa suosittu. Kun unioni menetti '
        + 'suosiotaan, sen menetti merkkikin, ja puhdasta lippua vaadittiin '
        + 'niin kauan, '
        + 'että kolme peräkkäistä suurkäräjää ehti hyväksyä sen. Laki tuli '
        + 'voimaan ilman kuninkaan vahvistusta joulukuussa 1898, ja '
        + 'kauppalipun kannosta merkki katosi vuoden 1899 lopussa.',
      /*
       * UUSI KUVA (ei pelidatassa ennestään). Commons 29.8.2026:
       * 1140×513, CC BY-SA 4.0, Henri-Georges Chartier (1859–1924),
       * kuvaus "SUÈDE ET NORVÈGE – Armes, drapeaux, armée … Illustrations
       * of Union coat of arms, and the flags of Sweden and Norway (with
       * the Union mark of Norway and Sweden)", päiväys 1898–1901
       * (Nouveau Larousse Illustré). Restrictions tyhjä. SILMÄTARKISTUS
       * tehty 960 px:n esikatselusta: kuusi lippua ja unionin vaakuna
       * kirjapainovärein; vasemmalla Ruotsin ja oikealla Norjan liput,
       * kummankin kannossa sama nelikenttäinen unionimerkki. Ei ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: teksti nimeää merkin paikan (kanto) ja
       * sen, että värit ovat sekaisin. Kuva näyttää täsmälleen sen — ja
       * näyttää sen molempien maiden lipuissa yhtä aikaa, mikä on koko
       * vuoden 1844 idea.
       */
      kuva: {
        tiedosto: 'LAROUSSE - H.Chartier (1859-1924) SUÈDE ET NORVÈGE Armes, drapeaux, armee (Sweden and Norway historical Coat of arms, flags 1890s) Nouveau Larousse Illustré Paris 1898-1901 Vol 07 (detail).jpg',
        selite: 'Ruotsin ja Norjan liput unionin viimeisiltä vuosilta: '
          + 'kummankin kannossa on sama unionimerkki, jossa maiden värit '
          + 'on jaettu tasan.',
        lahde: 'Henri-Georges Chartier, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Miksi Norjan omalla lipulla sai aluksi purjehtia vain '
          + 'pohjoisilla vesillä?',
        vaihtoehdot: [
          'Maalla ei ollut sopimusta Pohjois-Afrikan kaappareiden kanssa',
          'Uutta lippua oli ehditty ommella vain pohjoisen satamiin',
          'Etelän satamissa vaadittiin lippu, jossa on kuninkaan vaakuna',
        ],
        oikea: 0,
        fakta: 'Suoja etelän merillä tuli Ruotsin maksamana, joten Kapp '
          + 'Finisterren eteläpuolella purjehdittiin unionin yhteisellä '
          + 'kauppalipulla. Lippu vapautui koko maailmaan vasta 1838.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja) JA
       * ERÄN MAKU (tarinakaari, aistikierto).
       *
       * MIKSI TÄMÄ TÄKY: isoisä söi Kristianiassa illalliseksi lohta. Se
       * lohi oli pyydetty; tämän päivän lohi kasvatetaan — ja juuri se
       * ero muutti sen, mitä lohesta tehdään toisella puolella maailmaa.
       *
       * EI PÄÄLLEKKÄISYYTTÄ BERGENIN KANSSA: Bergenin oppitunti kertoo
       * keskiajan kapakalan eli kuivatun turskan kaukokaupan. Tässä on
       * toinen kala, toinen vuosisata ja toinen elinkeino; yhteistä on
       * vain sana kala.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Aquaculture of salmonids" (johdanto ja osio
       *     History/Production): kelluviin merikasseihin perustuva
       *     nykytekniikka syntyi Norjassa 1960-luvun lopulla, ja
       *     ensimmäiset lohitarhat perustettiin silloin Norjaan ja
       *     Skotlantiin; kasvatus kulkee kahdessa vaiheessa: kalat
       *     kuoriutuvat mädistä ja kasvavat maalla makean veden
       *     altaissa, ja 12–18 kuukauden ikäisinä smoltit siirretään
       *     kelluviin merikasseihin suojaisiin lahtiin tai vuonoihin,
       *     joissa niitä ruokitaan rakeisella rehulla vielä 12–24
       *     kuukautta; Norja tuottaa 33 prosenttia maailman kasvatetuista
       *     lohikaloista ja Chile 31.
       *   - no-Wikipedia "Lakseoppdrett": veljekset Karstein Oddmund ja
       *     Olav Vik aloittivat merikasvatuksen kokeilut 1955
       *     Sykkylvsfjordenissa ja laskivat vuodesta 1959 mereen
       *     puisia kelluvia kasseja, aluksi 5 × 5 ja myöhemmin 10 × 10
       *     metriä; poikanen kehittyy smoltiksi noin sadan gramman
       *     painossa noin vuoden ikäisenä, ja teuraskoko noin viisi kiloa
       *     saavutetaan noin kahdessa ja puolessa vuodessa; vuonna 2020
       *     Norja vei 1,1 miljoonaa tonnia kasvatettua lohta, arvoltaan
       *     70 miljardia kruunua.
       *   - en-Wikipedia "Sushi" (osio salmonista): luonnosta pyydetyssä
       *     lohessa on usein loisia, joten se on kypsennettävä tai
       *     suolattava; kasvatettu lohi oli loisista vapaata ja
       *     rasvaisempaa; ensimmäinen norjalainen lohi tuli Japaniin
       *     1980 mutta ostettiin grillattavaksi, ei sushiin; lohisushi
       *     yleistyi Japanissa vasta 1980-luvun lopun
       *     markkinointiyhteistyön jälkeen, jonka osapuolina olivat
       *     norjalainen Bjørn E. Olsen ja japanilainen elintarvikeyhtiö
       *     Nichirei.
       *
       * RISTIRIITA, JOKA SANOTAAN ÄÄNEEN: aloitusvuosi. no-Wikipedia
       * ajoittaa veljesten kokeilut 1950-luvulle, en-Wikipedia sanoo
       * kelluvien merikassien tekniikan syntyneen 1960-luvun lopulla.
       * Teksti kertoo molemmat eikä valitse toisen puolesta.
       *
       * MITÄ EI KERROTA: kasvatuksen ympäristökiistat (lohitäi,
       * karkulaiset, rehun raaka-aineet). Ne ovat oma aiheensa ja
       * vaatisivat oman tarkistuksensa; tässä ei oteta kantaa
       * nykypolitiikkaan.
       */
      id: 'lohi',
      nappi: 'Kala, joka muutti sushin',
      otsikko: 'Kasvatettu lohi',
      teksti: 'Isoisäsi illallislohi oli pyydetty. Nykyinen kasvatetaan, ja '
        + 'se alkoi kokeiluista: veljekset Karstein ja Olav Vik laskivat '
        + '1950-luvulta alkaen Sykkylvsfjordeniin puisia kelluvia kasseja, '
        + 'ensin viisi kertaa viisi metriä, sitten kymmenen kertaa '
        + 'kymmenen. Kelluvien merikassien tekniikka levisi maailmalle '
        + 'Norjasta 1960-luvun lopulla. Kasvatus kulkee kahdessa '
        + 'vaiheessa. Ensin kalat kuoriutuvat mädistä maalla makean veden '
        + 'altaissa ja kasvavat vuoden verran, kunnes ne muuttuvat noin '
        + 'sadan gramman smolteiksi — siinä vaiheessa villi lohi lähtisi '
        + 'joesta merelle. Sitten ne siirretään merikasseihin suojaisaan '
        + 'lahteen tai vuonoon ja ruokitaan rakeisella rehulla; viiden '
        + 'kilon teuraskokoon menee kaikkiaan noin kaksi ja puoli vuotta. '
        + 'Norjassa kasvatetaan noin kolmasosa maailman kasvatetuista '
        + 'lohikaloista, ja vuonna 2020 maasta vietiin 1,1 miljoonaa '
        + 'tonnia lohta. Yksi seuraus on kaukana Norjasta. Japanissa lohta '
        + 'ei syöty raakana, koska luonnonlohessa voi olla loisia ja se '
        + 'piti kypsentää tai suolata. Kasvatettu lohi oli loisista vapaata '
        + 'ja rasvaisempaa. Ensimmäinen norjalainen lohi saapui Japaniin '
        + '1980, mutta se ostettiin grillattavaksi. Sushiin se pääsi vasta '
        + '1980-luvun lopulla, kun norjalainen Bjørn E. Olsen ja '
        + 'japanilainen elintarvikeyhtiö Nichirei sopivat yhteistyöstä. '
        + 'Se lohinigiri, jota nykyään pidetään japanilaisena, on siis '
        + 'osittain norjalainen.',
      /*
       * UUSI KUVA (ei pelidatassa ennestään). Commons 29.8.2026:
       * 7035×4690, CC BY-SA 4.0, Diego Delso, kuvaus "Salmon floating
       * cages, Svolvær, Lofoten, Norway", päiväys 5.9.2019. Restrictions
       * tyhjä. SILMÄTARKISTUS tehty 960 px:n esikatselusta: yksi kelluva
       * merikassi verkkokatteineen vuonon pinnalla, takana kallioinen ja
       * matalakasvuinen ranta; ei ihmisiä eikä veneitä.
       *
       * MIKSI JUURI TÄMÄ KUVA: teksti selittää, miksi kassi kelluu ja
       * miksi se on suojaisassa vedessä. Kuva näyttää sen yhtenä
       * esineenä — kehä, verkko ja katos — eikä laitosta kokonaisuutena,
       * joten sanat ja kuva kertovat saman asian eri päistä.
       */
      kuva: {
        tiedosto: 'Jaulas flotantes de salmón, Svolvær, Lofoten, Noruega, 2019-09-05, DD 54.jpg',
        selite: 'Kelluva merikassi Lofooteilla Svolværin edustalla: kehä '
          + 'pysyy pinnalla, verkko roikkuu sen alla ja katos estää '
          + 'lintuja pääsemästä kaloihin.',
        lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Miksi Japanissa ei syöty lohta raakana ennen kuin '
          + 'kasvatettua lohta alkoi tulla Norjasta?',
        vaihtoehdot: [
          'Raakana syötiin vain meren pohjakaloja, ei lainkaan vaeltavia kaloja',
          'Luonnonlohessa voi olla loisia, joten se kypsennettiin',
          'Lohi oli maan omilta rannikoilta liian kallista',
        ],
        oikea: 1,
        fakta: 'Kasvatettu lohi oli loisista vapaata ja rasvaisempaa. '
          + 'Ensimmäinen norjalainen lohi tuli Japaniin 1980 ja meni '
          + 'grilliin; sushiin se pääsi vasta 1980-luvun lopun '
          + 'markkinointiyhteistyön jälkeen.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa laattakysymyksen js/packs/europe-questions.js, oslo[2]:
   * mikä Nobelin palkinnoista jaetaan Oslossa. Visasääntö täyttyy —
   * vastaus opitaan tekstistä, mutta kysymyksen sanamuoto ei toistu
   * siinä sellaisenaan.
   *
   * MIKSI JUURI TÄMÄ AIHE: merkintä päättyy ylioppilaiden väittelyyn
   * siitä, kenen Norja on. Kaksikymmentäkaksi vuotta myöhemmin
   * ruotsalainen kemisti kirjoitti testamenttiinsa, että yhden
   * palkinnon valitsevat norjalaiset — ja jätti syyn kirjoittamatta.
   * Oppitunti on siis saman kysymyksen jatko, ei uusi aihe.
   *
   * OPPITUNTI EI KERTAA LEHTEÄ VAAN SYVENTÄÄ SEN KOLME LAUSETTA. Oslon
   * artikkelin etusivunosto (js/packs/europe-artikkelit.js, Oslo) sanoo
   * jo, että rauhanpalkinnon valitsee suurkäräjien nimittämä komitea,
   * ettei Nobel kirjoittanut syytä näkyviin ja että palkinto luovutetaan
   * 10. joulukuuta kaupungintalossa. Tämä teksti kertoo sen, mitä lehti
   * ei kerro: testamentin päiväyksen, komitean koon, kolme selitystä
   * valinnalle, ensimmäisen palkinnon, ilmoituskuukauden ja sen, että
   * paikka on vaihtunut kolmesti.
   *
   * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta lähteestä):
   *   - en-Wikipedia "Nobel Peace Prize": testamentissa palkinto
   *     määrätään sille, joka on tehnyt eniten tai parhaiten työtä
   *     kansojen veljeyden, vakinaisten armeijoiden vähentämisen tai
   *     lakkauttamisen sekä rauhankongressien pitämisen ja edistämisen
   *     hyväksi, ja se määrää palkinnon jaettavaksi viisihenkisellä
   *     komitealla, jonka Norjan suurkäräjät valitsee; komitea
   *     muodostettiin Nobelin kuoltua 1896 ja ensimmäinen palkinto
   *     jaettiin 10. joulukuuta 1901 Henry Dunantille ja Frédéric
   *     Passylle; valinnasta esitetään kolme selitystä — Norjalla ei
   *     ollut samanlaista sotilasperinnettä kuin Ruotsilla, Norjan
   *     suurkäräjät oli 1800-luvun lopulla sitoutunut
   *     parlamenttienvälisen liiton työhön riitojen ratkaisemiseksi
   *     sovittelulla ja välimiesmenettelyllä, ja Norja oli Nobelin
   *     kuollessa unionissa Ruotsin kanssa eikä sillä ollut omaa
   *     ulkopolitiikkaa; komitea päätyy tulokseen tavallisesti
   *     syyskuun puolivälissä ja ilmoittaa sen lokakuun alussa;
   *     jakotilaisuus oli suurkäräjillä 1901–1904, sitten Norjan
   *     Nobel-instituutissa ja yliopiston juhlasalissa, ja vuodesta 1990
   *     Oslon kaupungintalossa.
   *   - no-Wikipedia "Nobels fredspris": testamentti on päivätty 27.
   *     marraskuuta 1895; palkinnon hoitaa Den Norske Nobelkomite;
   *     ensimmäinen palkinto 1901 Frédéric Passylle ja Henri
   *     Dunantille; Nobel kuoli 10. joulukuuta 1896, ja palkinto
   *     luovutetaan vuosittain juuri sinä päivänä; ilmoitus tulee
   *     lokakuun alussa; jakopaikkoina ovat olleet suurkäräjät
   *     1901–1904, yliopiston juhlasali ja vuodesta 1990 Oslon
   *     kaupungintalo.
   *
   * RISTIRIITA, JOKA SANOTAAN ÄÄNEEN: välivuosien jakopaikat. en
   * luettelee Nobel-instituutin 1905–1946 ja yliopiston juhlasalin
   * 1947–1989, no antaa juhlasalille vuodet 1905–1947. Teksti kertoo
   * siksi paikat mutta ei niiden vuosia; alku (suurkäräjät 1901–1904)
   * ja nykyinen (kaupungintalo vuodesta 1990) ovat molemmissa samat.
   *
   * MITÄ EI KERROTA, JA MIKSI: yksittäisiä palkinnonsaajia tai
   * palkintopäätöksiin liittyviä kiistoja ei luetella. Ne ovat
   * nykypolitiikkaa, eikä oppitunti ota siihen kantaa.
   */
  oppitunti: {
    otsikko: 'Palkinto, jonka Nobel jätti rajan taakse',
    teksti: 'Isoisäsi kuunteli Kristianiassa ylioppilaita, jotka väittelivät '
      + 'siitä, kenen Norja on. Kaksikymmentäkaksi vuotta myöhemmin, 27. '
      + 'marraskuuta 1895, ruotsalainen kemisti Alfred Nobel allekirjoitti '
      + 'testamentin, jossa hän jakoi omaisuutensa palkintoihin. Kaikki '
      + 'muut palkinnot hän uskoi ruotsalaisille laitoksille, mutta yhden '
      + 'hän määräsi viisihenkisen komitean valittavaksi — ja komitean '
      + 'valitsee Norjan suurkäräjät. Palkinto on tarkoitettu sille, joka '
      + 'on tehnyt eniten tai parhaiten työtä kansojen veljeyden, '
      + 'vakinaisten armeijoiden vähentämisen ja rauhankongressien '
      + 'hyväksi. Miksi juuri norjalaiset, sitä Nobel ei kirjoittanut '
      + 'mihinkään. Selityksiä on esitetty kolme. Norjalla ei '
      + 'ollut samanlaista sotilasperinnettä kuin Ruotsilla. Norjan '
      + 'suurkäräjät oli 1800-luvun lopulla mukana parlamenttienvälisen '
      + 'liiton työssä, jossa riitoja yritettiin ratkoa sovittelulla ja '
      + 'välimiesmenettelyllä. Ja Norja oli Nobelin kuollessa unionissa '
      + 'Ruotsin kanssa eikä hoitanut omaa ulkopolitiikkaansa, joten '
      + 'sieltä tuleva päätös näyttäisi vähemmän suurvaltapolitiikalta. '
      + 'Nobel kuoli 10. joulukuuta 1896. Komitea koottiin sen jälkeen, ja '
      + 'ensimmäinen palkinto jaettiin 10. joulukuuta 1901 kahdelle '
      + 'miehelle yhtä aikaa: Henry Dunantille, joka oli perustanut '
      + 'Punaisen Ristin, ja Frédéric Passylle, joka oli järjestänyt '
      + 'rauhankongresseja. Sama päivämäärä on pidetty siitä lähtien, '
      + 'koska se on Nobelin kuolinpäivä; saaja sen sijaan kerrotaan jo '
      + 'lokakuun alussa. Paikka on vaihtunut kolmesti. Ensimmäiset '
      + 'palkinnot luovutettiin suurkäräjillä 1901–1904, sitten Norjan '
      + 'Nobel-instituutissa ja yliopiston juhlasalissa, ja vuodesta 1990 '
      + 'kaupungintalossa. Komiteaa avustaa Norjan Nobel-instituutti, joka '
      + 'perustettiin 1. helmikuuta 1904 ja jonka johtaja toimii komitean '
      + 'sihteerinä; siellä myös kerrotaan lokakuussa, kuka palkinnon saa. '
      + 'Talo on entinen yksityishuvila vuodelta 1867 — se seisoi jo '
      + 'silloin, kun isoisäsi käveli tässä kaupungissa. Ja se kysymys, '
      + 'josta ylioppilaat väittelivät hänen kuullessaan, sai lopulta '
      + 'vastauksen, '
      + 'jota kukaan heistä ei osannut arvata: maa, joka ei hoitanut omaa '
      + 'ulkopolitiikkaansa, sai valittavakseen palkinnon, joka on '
      + 'nimenomaan ulkopolitiikkaa.',
    /*
     * INSTITUUTIN FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta
     * lähteestä):
     *   - en-Wikipedia "Norwegian Nobel Institute": perustettu 1904
     *     Kristianiaan; sijaitsee Henrik Ibsens gate 51:ssä keskustassa
     *     lähellä kuninkaanlinnaa; instituutin päätehtävä on avustaa
     *     Norjan Nobel-komiteaa palkinnonsaajan valinnassa ja järjestää
     *     palkintotilaisuus Oslossa.
     *   - no-Wikipedia "Det Norske Nobelinstitutt": perustettu 1.
     *     helmikuuta 1904 tukemaan Nobel-komiteaa; talo on entinen
     *     yksityishuvila vuodelta 1867, kunnostettu 1903–1905;
     *     instituuttia johtaa johtaja, joka toimii samalla komitean
     *     sihteerinä; voittaja kerrotaan siellä, kun taas itse
     *     jakotilaisuus on Oslon kaupungintalossa.
     *
     * KATUOSOITE JÄTETÄÄN POIS TEKSTISTÄ: Commonsin vanha kuvaus ja
     * Kansalliskirjaston aikalaiskuvat puhuvat Drammensveienista, en
     * -Wikipedia nykynimestä Henrik Ibsens gate. Nimi on vaihtunut, eikä
     * osoite ole tässä olennainen — talo yksilöityy nimellään.
     *
     * UUSI KUVA (ei pelidatassa ennestään). Commons 29.8.2026:
     * 4390×2927, CC BY-SA 3.0, Vidariv, kuvaus "The Norwegian Nobel
     * institute, Oslo, Norway in 2012", päiväys 27.8.2012. Restrictions
     * tyhjä. SILMÄTARKISTUS tehty 960 px:n esikatselusta: keltainen
     * kaksikerroksinen kaupunkitalo kadun varrella, edessä kivimuuri ja
     * pensasaita, portin pielessä rintakuva; kadun reunassa kaksi
     * ohikulkijaa niin kaukana, ettei kasvoja erota, eikä kumpikaan
     * katso kameraan.
     *
     * MIKSI JUURI TÄMÄ KUVA: oppitunnin ydin on se, että viisi ihmistä
     * päättää palkinnosta. Tämä on talo, jossa se työ tehdään ja jossa
     * saaja kerrotaan — ja rakennus itse on isoisän aikaa vanhempi.
     */
    kuva: {
      tiedosto: 'Nobellinstituttet Oslo 2012.jpg',
      selite: 'Norjan Nobel-instituutti perustettiin 1904 avustamaan '
        + 'Nobel-komiteaa, ja sen talo on entinen yksityishuvila vuodelta '
        + '1867.',
      lahde: 'Vidariv, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos. Oslolla ON jo hahmo — Talonpoika
   * Sigrid tarinakaaren paketissa (js/packs/tarinakaari.js, oslo:
   * *"viljelee peltoa, jonka laidalla laivakumpu on ollut hänen sukunsa
   * vartiossa satoja vuosia"*) — joten tämä EI ole uusi hahmo vaan sama
   * hahmo fokusvirran kortille kirjoitettuna, kuten Helsingissä (Luotsi
   * Aino), Tallinnassa (Tornimestari Kristjan) ja Kööpenhaminassa
   * (Sadunkertoja Karen). Nimi, ammatti ja sävy ovat silti
   * vaihdettavissa; kortti ei kertaa kaaren repliikkejä eikä paljasta
   * laattakysymyksen vastausta.
   *
   * PERUSTELUT LUONNOKSELLE:
   *   - KAAVA TÄYTTYY: suvun jatkumo (sama pelto, sama kumpu, polvia
   *     joita kukaan ei laske), epäusko (Sigrid pitää suvun tarinaa
   *     satuna) ja portinvartijakysymys (hän kysyy isoisän kysymyksen
   *     ennen kuin näyttää mitään).
   *   - VARALLISUUSSÄÄNTÖ PITÄÄ. Isoisä ei maksa mitään eikä käske
   *     ketään: hän nukkui kolme yötä pellon laidassa ja lupasi olla
   *     kaivamatta — tämä on kaaren oma teko, ja se on juuri sen
   *     kokoinen kuin köyhän miehen teko saa olla. Odotuksen syy on
   *     suvun oma: lupaus, joka pidettiin puolin ja toisin.
   *   - ÄÄNIPROFIILI: epäuskoinen (tarinakaari-ohjeen "sukuni tarina on
   *     minusta satua — mutta vihko on tässä"). Bergenin Solveig on
   *     saman maan toinen epäuskoinen; ero on siinä, että Solveig ei
   *     usko tarinaa mutta uskoo työtään, kun taas Sigrid ei usko
   *     kumpuun eikä silti kynnä sen yli.
   *   - EI KUVAA. Tehtävänannon rajaus (aalto 4B): kohtaamiseen ei tule
   *     kuvaa, ja kuvat kuuluvat kaupunkilehteen.
   *   - EI SPOILERIA. Teksti ei kerro, mikä kummuista nostetut laivat
   *     säilytti (tarinakaaren oma kysymys) eikä mitään Oslon viidestä
   *     laattakysymyksestä.
   *
   * VIHJEOSIO: 'laivat'. Oslon laattakysymyksistä kaksi (Fram ja
   * balsalautta) ratkeaa lehden Laivat-sivulla, ja sama sivu on lähinnä
   * myös kumpujen aihetta. Rivi kertoo mistä päin lehteä ratkaisu
   * löytyy, ei sitä mikä vastaus on.
   */
  kohtaaminen: {
    hahmo: 'Talonpoika Sigrid',
    nappi: 'Tapaa Sigrid',
    /*
     * VARMISTUSKYSYMYS (omistajan pelitestipalaute v1119). Lause on
     * datassa eikä koodissa, koska suomen genetiivi ei taivu koneellisesti
     * jokaisesta nimestä (js/fokusvirta.js varmistusLause).
     */
    varmistus: 'Haluatko varmasti tavata Sigridin juuri nyt?',
    vihjeOsio: 'laivat',
    teksti: 'Sigridin pellon keskellä maa nousee loivaksi kummuksi, ja aura '
      + 'on kiertänyt sen joka kevät niin monta polvea, ettei kukaan '
      + 'viitsi laskea. Suvun tarinaa hän pitää satuna: kumpu on kumpu, ja '
      + 'mullassa on kiviä niin kuin joka pellossa. Kiertää sen silti. '
      + 'Aitan seinähirressä on päiväys kesältä 1873 ja sen alla kysymys '
      + 'vieraalla käsialalla — mies, joka sen kirjoitti, nukkui kolme '
      + 'yötä pellon laidassa ja lupasi olla kaivamatta. Sigrid osaa '
      + 'kysymyksen ulkoa, vaikka ei usko siihen sanaakaan. Hän kysyy sen '
      + 'nyt.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: JELLHAUGEN, HALDEN. Kaari ei nimeä Sigridin
   * pitäjää, ja kaanonin aarremerkintä sanoo vain, että talonpojan
   * pitäjässä aura osui arkkuun ja että "maa on täällä vanhaa ja aurat
   * uusia". Jellhaugen on siihen tarkin oikea paikka Oslon lähellä:
   * Gjellestadin tilan pellossa sen vieressä havaittiin 2018
   * maatutkalla viikinkilaiva, joka makasi puoli metriä kyntökerroksen
   * alla ja jota kyntäminen oli kuluttanut; laiva kaivettiin esiin
   * 2020–2022, mutta itse Jellhaugen — yksi maan suurimmista kummuista
   * — seisoo yhä kaivamattomana. Sigridin kumpu on siis se, jota ei ole
   * avattu, ja naapuripellon tarina kertoo miksi lupaus on merkinnyt
   * jotakin. (en-Wikipedia "Gjellestad ship": löytö 2018 maatutkalla,
   * *"lies 50 centimetres below the topsoil due to years of plowing"*,
   * kaivaus alkoi kesäkuussa 2020 ja päättyi joulukuuhun 2022, ajoitus
   * aikaisintaan 733 jaa.; sijainti Gjellestadin tila Haldenin
   * kunnassa. Tarkistettu 29.8.2026.)
   *
   * 59,14722222 N / 11,25111111 E — no-Wikipedia "Jellhaugen",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö LEVEYS
   * 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((11,25111111 − (−175)) mod 360) × (12000/360)
   *                     = 186,25111111 × 33,3333… = 6208,4
   *                   y = millerY-erotus pohjoisreunaan 76° = 967,9
   *   europe          x = (11,25111111 + 11) × 19,2 = 427,2
   *                   y = (72 − 59,14722222) × 26,3 = 338,0
   *
   * TARKISTUS LAATTAA VASTEN: Oslon laatta on Euroopan laudalla 418 /
   * 318 (js/packs/europe.js), ja piste jää siitä 22,0 yksikköä kaakkoon
   * — yli PISTE_ERO_MINin (14, js/fokuspiste.js), joten piste piirtyy
   * omalle paikalleen eikä siirry. Niin pitääkin: Sigridin pelto ei ole
   * kaupungissa.
   *
   * HUOMIO FABLELLE: Bergenin Amundsen-täkynoston piste (Borge,
   * Fredrikstad, europe 423,2 / 335,9) on tästä vain 4,5 yksikön päässä.
   * Ne eivät osu päällekkäin tänään, koska Oslossa ei nouse yhtään
   * täkynostoa (ks. tiedoston alku), mutta jos NOR-pooli joskus
   * kytketään Osloon, kaksi merkkiä on lähekkäin. Vaihtoehtoinen paikka
   * samalle kohtaamiselle on Borren kumpupuisto Hortenissa
   * (en-Wikipedia "Borre mound cemetery", 59,3825 N / 10,45944444 E →
   * europe 412,0 / 331,8, maailmankartta 6182,0 / 956,3), joka on
   * Borgesta 11,9 yksikköä. Valinta on Fablen.
   */
  kohtaamispiste: {
    nimi: 'Jellhaugen, Halden',
    laudat: {
      maailmankartta: { x: 6208.4, y: 967.9 },
      europe: { x: 427.2, y: 338.0 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Oslon sivupino (js/lehti.js
   * rakennaSivut) syntyy kaupungin kahdesta kulttuurikategoriasta
   * (js/packs/kulttuuri-kategoriat.js, oslo): 0 = etusivu,
   * 1 = kaupunkisivu "Oslo", 2 = Laivat, 3 = Menovinkit (maan yhteinen
   * sivu, js/packs/maa-kategoriat.js NOR).
   *
   * Sivun 1 kysymys on Oslon kulttuurivisa (js/packs/europe-kulttuuri.js,
   * oslo: Frognerin puiston veistokset), jonka js/fokustehtavat.js pukee
   * samaksi AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä. Oslossa
   * aarteen voi siis avata kahdella tavalla, ja se on tarkoitus —
   * js/fokustehtavat.js aarteenAvaajat sallii sen (omistajan sääntö
   * 25.8.2026: mikä tahansa avaaja riittää). Juuri siksi kumpikaan
   * alla olevista visoista ei kysy Vigelandia.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: OSEBERG_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: PEER_GYNT_VISA },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: viikinkien
   * hopeakätkö. Merkintä aukeaa, kun aarre löytyy (js/fokusvirta.js
   * fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Talonpoika torilla kertoi, että hänen pitäjässään aura osui '
      + 'arkkuun, jossa oli hopeaa viikinkien ajalta — ja että joka '
      + 'pitäjässä on peltonsa, josta samaa tarinaa kerrotaan. Useimmat '
      + 'tarinat ovat tyhjiä. Mutta maa on täällä vanhaa ja aurat uusia, '
      + 'ja joka kevät kynnetään syvemmältä.',
  },
};
