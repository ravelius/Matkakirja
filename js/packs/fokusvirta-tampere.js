/*
 * TAMPEREEN FOKUSVIRTA — annostelun sisältö dataksi. AALTO 4B.
 *
 * Sisartiedosto js/packs/fokusvirta-helsinki.js:lle (sama maa, aalto 3)
 * ja js/packs/fokusvirta-sevilla.js:lle (aalto 4A): samat kentät, sama
 * järjestys, sama moottori (js/fokusvirta.js). Uusi kaupunki on yksi
 * tiedosto ja yksi rivi rekisterissä (js/packs/fokusvirrat.js) — TÄMÄ
 * PAKETTI EI KIRJOITA SITÄ RIVIÄ eikä koske sw.js:ään, savukkeisiin tai
 * mihinkään muuhun tiedostoon: aallon 4B kaupungit kokoaa
 * integrointiagentti yhtenä nostona.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026, aallon 4B kaanonpaperi, osio
 * TAMPERE). NELJÄ KENTTÄÄ ON SANATARKASTI HÄNEN: matkakirja.paikkarivi,
 * matkakirja.teksti, pollo.teksti ja aarremerkinta.teksti. Niitä ei ole
 * lyhennetty, pilkkuakaan siirretty eikä sanajärjestystä muutettu.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * KAANONKORJAUS AALLON 4B INTEGROINNISSA (Fable 29.8.2026). Haaran
 * teksti sanoi lisänimen ääneen kahdesti — merkinnässä *"Tämä on
 * pohjolan Manchester, sanoi isäntäni ylpeänä"* ja Livialla *"Pohjolan
 * Manchester on edelleen Tampereen lempinimi"* — ja antoi siten
 * laattakysymyksen tampere[4] vastauksen ennen kysymystä. Fablen
 * korjatut virkkeet jättävät lisänimen sanomatta: merkinnässä
 * *"Isäntäni vertasi kaupunkiaan ylpeänä Manchesteriin"* ja Livialla
 * *"Se isäntäväen vertaus jäi elämään lempinimenä, jonka kuulet kohta
 * itsekin"*. Molemmat on vaihdettu sanatarkasti, merkintä myös
 * `matkakirja.luenta`-kenttään.
 *
 * ISO AARRE: Ivalojoen kultahippu (aarremerkintä). Sama pari on
 * kirjattu maan paikallisaarteisiin (js/packs/paikallisaarteet.js, FIN:
 * *"Ivalojoen kultahippu"*), jotta löytökortissa lukee sama nimi kuin
 * merkinnässä. Helsingin merkintä kertoo saman kullan LAIVALTA kuultuna
 * ja tämä TUKKILAISELTA — kaksi kuulopuhetta samasta joesta, ei
 * toisintoa.
 *
 * FAKTAPOHJA. Aallon 4B maille ei ole takynostot-työaineistoa, joten
 * sisältö nojaa kolmeen lähteeseen ja vain niihin:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Tampereen kaupunkilehden nostot ja
 *      minitehtävä (js/packs/kulttuuri-kategoriat.js, kohta `tampere`),
 *      kaupungin juliste (js/packs/julisteet.js, `tampere`) ja laudan
 *      omat kysymykset (js/packs/europe-questions.js, `tampere`). Nämä
 *      on jo kertaalleen tarkistettu ja hyväksytty peliin.
 *   2. LAUDAN OMA GEOMETRIA. Kohtaamispisteen laskenta ja Tampereen
 *      laatan tietoinen siirto (js/packs/europe.js, laatan yllä oleva
 *      kommentti) — ks. KEVYT KULKU alempana.
 *   3. TARKISTETUT LISÄTIEDOT. Kaikki muu on haettu 29.8.2026
 *      Wikipedian rajapinnasta (action=query&prop=extracts, redirects=1,
 *      NODE_USE_ENV_PROXY=1) artikkeli ja osio kerrallaan, ja jokaisen
 *      kohdan oma kommentti nimeää artikkelin. Mitään ei ole päätelty,
 *      pyöristetty eikä muistettu.
 *
 * PÄÄLLEKKÄISYYS KAUPUNKILEHDEN KANSSA ON RAJATTU TIETOISESTI. Pelaaja
 * lukee saman käynnin aikana lehden sivut, joten täkyjen aiheet on
 * valittu niin, ettei yksikään toista lehden kahdentoista noston
 * aihetta: kosken SYNTY (lehti kertoo vain putouskorkeuden), tehtaan
 * OMA SEURAKUNTA (lehti kertoo tehtaan, ei kirkkoa) ja tuomiokirkon
 * FRESKOT (lehti nimeää vain kirkon arkkitehdin ja rakennusvuodet).
 * Ainoa tietoinen kosketus on Livian maadoituksessa (1882) — ks. sen
 * oma perustelu alempana.
 *
 * ── VIISI OMISTAJAN LINJAUSTA, JOTKA MUOVAAVAT TÄMÄN TIEDOSTON ─────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois
 *      kokonaan: kuvat kuuluvat kaupunkilehteen. Kortti piirtyy ilman
 *      kuvaa (js/ui.js naytaFactValokuva saa nullin).
 *   2. PÖLLÖN KUVA ON KAUPUNKILEHDEN HEROKUVA. `pollo.kuva` osoittaa
 *      KULTTUURI_KATEGORIAT-karusellin omaan generoituun heroon
 *      (tampere/avauskuvat), ei uuteen Commons-kuvaan.
 *   3. VALINTA-ASKELTA EI OLE. `valinta`-kenttää ei kirjoiteta; moottori
 *      lukee kentän varovasti (`data.valinta?.…`), joten portin mitta on
 *      oletus (yksi täky) ja kuplan otsikko moottorin oma.
 *   4. KOHTAAMISKORTTI RAKENNETAAN ILMAN KUVAA. Kohtaamisessa on siis
 *      vain hahmo, nappi, varmistus, vihjeOsio ja teksti.
 *   5. EI TÄKYNOSTOJA (tämän tehtävän rajaus). Suomen pooli on
 *      HELSINGIN paketin oma `takynostot`-kenttä (Oulun terva), eikä
 *      FIN ole js/fokusnosto.js:n NOSTO_MAAT-taulussa. Koska
 *      nostoMaanPooli lukee kaupungin oman kentän ja sen jälkeen maan
 *      poolin, Tampereella ei näy yhtään täkynostoa — se on tarkoitus,
 *      ei puute. Jos Suomelle joskus halutaan yhteinen pooli, ratkaisu
 *      on yksi rivi js/fokusnosto.js:ssä eikä tässä tiedostossa.
 *
 * ── MINIVISAN SÄÄNTÖ (POIKKEUS TALON TAPAAN) ───────────────────────
 *
 * Vastaus löytyy syvennystekstistä, mutta kysymyksen sanamuoto ei
 * toistu siinä sellaisenaan. Aiemmissa paketeissa oikea vaihtoehto on
 * ollut aina indeksi 0; TÄSSÄ PAKETISSA OIKEAN PAIKKA VAIHTELEE
 * (koski → 1, finlayson → 2, kaarme → 0) tilauksen mukaisesti.
 * Moottori lukee indeksin datasta (`i === visa.oikea`,
 * js/fokusvirta.js), joten vaihtelu ei vaadi koodimuutosta. Lisäksi
 * oikea EI ole pisin vaihtoehto yhdessäkään tämän tiedoston visassa —
 * se on tarinakaaren mittausvaatimus (docs/moduulit/tarinakaari.md,
 * luku 6 kohta 2), ja se on tarkistettu käsin.
 *
 * ── LAATTAKYSYMYSTÄ EI SPOILATA ────────────────────────────────────
 *
 * Tampereen laattakysymykset ovat js/packs/europe-questions.js:n
 * `tampere`-lohkon viisi: kaupungin kaksi järveä, kaupunkioikeuksien
 * antaja 1779, Näsinneula, Suomen vanhin yhä toimiva yleinen sauna ja
 * lisänimi Pohjolan Manchester. Kaupungilla EI ole tarinakaaren
 * pakettia (js/tyohuone-kehitys-data.js KAARI_PAKETIT), joten
 * kohtaamisen takana on juuri tuo laattakysymys.
 *
 * VIIDES (lisänimi) oli haaran teksteissä paljastettuna; Fablen
 * kaanonkorjaus poisti paljastuksen ja jätti tilalle vihjeen (ks.
 * tiedoston alku). Sana "Manchester" on korjatussakin merkinnässä
 * vertauksena, joten kysymys on pohjustettu muttei vastattu.
 *
 * Oppitunti pohjustaa niistä TOISEN (kaupunkioikeudet 1779) — se on
 * ainoa viidestä, jota kaupunkilehti ei käsittele lainkaan. Visasääntö
 * täyttyy: vastaus on tekstissä, mutta kysymyksen sanamuoto ei toistu
 * siinä sellaisenaan.
 *
 * HUOMIO FABLELLE — LISÄNIMIKYSYMYS ON JO KAANONISSA. Laattakysymys
 * *"Millä lisänimellä Tamperetta kutsuttiin tehdaskaupunkina
 * 1800-luvulla?"* saa vastauksensa sekä isoisän merkinnästä että Livian
 * repliikistä, jotka molemmat ovat sanatarkkaa kaanonia ja piirtyvät
 * ennen kohtaamista. Tämä paketti ei korjaa kumpaakaan eikä koske
 * kysymykseen; ero on kirjattu tähän ja raporttiin.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta 29.8.2026
 * (olemassaolo, koko, lisenssi, tekijä, kuvaus, Restrictions) — ei
 * arvattuja nimiä. Kaikki ovat PD tai CC, ja tekijä on `lahde`-rivillä,
 * koska CC vaatii maininnan. JOKAINEN on lisäksi katsottu silmin 960
 * pikselin esikatseluna: yhdessäkään ei ole tunnistettavia eläviä
 * ihmisiä.
 *
 * LOISTOAIKAKUVIA EI OLE. Aallon 1 malli (pääkuvaksi repon oma
 * generoitu havainnekuva, entinen kuva `valokuva`-kenttään) vaatisi
 * generointiajon, jota tälle aallolle ei ole tehty. Sama ratkaisu kuin
 * Sevillassa: yksi kuva per kortti, `tiedosto`-kenttä.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luenta on generoitu 30.8.2026 (tools/generoi-luennat.mjs, lähteenä
 * tämän lohkon oma `matkakirja.luenta`) ja `matkakirja.aanite`
 * osoittaa siihen: assets/audio/puhe-fokus-matkakirja-tampere.mp3.
 * Teksti ja luenta ovat sanasta sanaan samat, joten tekstin muutos
 * vaatii uuden generoinnin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * Kysymykset ovat vakioina samasta syystä kuin Sofiassa, Madridissa ja
 * Sevillassa: lista tiedoston lopussa lukee ne muuttujista, jolloin uusi
 * käyttö ei koskaan johda kahteen erilleen ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Amurikysymys on Tampereen lehden sivun 2
 * ("Historia") oman noston "Kortteli, jossa asuttiin neljä perhettä
 * huoneessa" tekstiä ja siltakysymys sivun 1 ("Tampere") oman noston
 * "Neljä patsasta sillan kaiteella" tekstiä (js/packs/
 * kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI SÄHKÖVALOKYSYMYSTÄ, vaikka se on juuri historiasivun oma
 * minitehtävä: nimetty tehtävä VÄISTÄÄ sivun oman tehtävän
 * (js/fokustehtavat.js), joten sivun 2 kysymys vaihtuu tähän — ja
 * samalla sivulla oleva nosto "Valo syttyi kutomosalissa" kertoo
 * sähkövalon jo itse. Lisäksi Livian maadoitus nimeää vuoden 1882 ennen
 * lehteä, joten sähkövalovisa mittaisi enää lähimuistia (tarinakaari,
 * luku 6 kohta 6). Amuri on saman sivun toinen nosto eikä ole
 * kummankaan tiellä.
 *
 * MIKSI EI KOSKIKYSYMYSTÄ: sivun 1 AARTEEN AVAUS -laatikon täyttää jo
 * Tampereen kulttuurivisa (js/packs/europe-kulttuuri.js), joka kysyy
 * järvien kahdeksantoista metrin korkeuseroa. Sama aihe kahdesti olisi
 * sama kysymys kahdesti.
 */
const AMURI_VISA = {
  kysymys: 'Amurin työläiskorttelit purettiin Tampereelta lähes '
    + 'kokonaan 1970-luvulla, mutta yksi kortteli jäi pystyyn. Miksi?',
  vaihtoehdot: [
    'Siitä tehtiin museo',
    'Se oli rakennettu kivestä eikä puusta kuten muut',
    'Sen talot olivat niin uusia, ettei purkaminen kannattanut',
  ],
  oikea: 0,
  fakta: 'Museokorttelissa on viisi asuintaloa ja neljä piharakennusta, '
    + 'joiden huoneet on sisustettu vuosien 1882 ja 1973 väliltä. Amuri '
    + 'rakennettiin 1860-luvulta alkaen, ja yhtä huonetta jakoi '
    + 'tavallisesti useampi perhe.',
};

/*
 * NIMI ON HAMEENSILTA_VISA EIKA SILTA_VISA: yhden tiedoston niputus
 * (tools/build-standalone.mjs) latoo kaikki moduulit samaan
 * nakyvyysalueeseen, ja js/packs/fokusvirta-praha.js:ssa on jo oma
 * `SILTA_VISA` (Kaarlensilta). Kaksi samannimista const-maaritysta
 * kaatoi dist-nipun kokonaan ("Identifier 'SILTA_VISA' has already
 * been declared") — havaittu aallon 4B integroinnissa savukkeella
 * tools/savukkeet/savuke-dist.mjs. Visan sisalto ei muutu.
 */
const HAMEENSILTA_VISA = {
  kysymys: 'Hämeensillan kaiteilla seisoo neljä Wäinö Aaltosen '
    + 'pronssiveistosta vuodelta 1929. Mitä ne esittävät?',
  vaihtoehdot: [
    'Kaupungin neljää perustajaa, jotka allekirjoittivat perustamiskirjan',
    'Seudun neljää elinkeinoa',
    'Vuodenaikoja, koska tehtaissa tehtiin työtä ympäri vuoden',
  ],
  oikea: 1,
  fakta: 'Patsaat ovat metsästäjä, erämies, kauppias ja verontuoja, ja '
    + 'ne kuuluvat 1920-luvun klassismin tunnetuimpiin töihin Suomessa. '
    + 'Silta uusittiin 2019 vanhan kivisillan näköisenä, ja patsaat '
    + 'nostettiin takaisin kaiteille.',
};

export const FOKUSVIRTA_TAMPERE = {
  kaupunki: 'tampere',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ei omaa säälisäystä. */
    paikkarivi: 'Tampere, elokuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Kahden järven välissä kohisee koski, ja kosken partaalla '
      + 'seisoo tehdas toisensa vieressä — puuvillaa, paperia, rautaa. '
      + 'Isäntäni vertasi kaupunkiaan ylpeänä Manchesteriin, ja piiput '
      + 'tosiaan savuavat samaan tapaan. Tehtaansaleissa on enemmän naisia kuin '
      + 'miehiä, ja lauantaina koko kaupunki kävelee koskenrantaa pitkin '
      + 'parhaissaan. Vesi tekee täällä työn, jonka muualla tekee hiili — '
      + 'ja vesi ei lopu.',
    /*
     * Luenta on sama teksti tunnetagein — sanat eivät muutu (Raamattu:
     * ruututeksti = luentateksti sanasta sanaan). Neljä tagia, alku ja
     * loppu eri sävyssä. Suuraakkosia ei tekstissä ole, joten
     * kirjoitusasun sovituksia ei tarvita.
     */
    luenta: '[curious] Kahden järven välissä kohisee koski, ja kosken '
      + 'partaalla seisoo tehdas toisensa vieressä — puuvillaa, paperia, '
      + 'rautaa. [excited] Isäntäni vertasi kaupunkiaan ylpeänä '
      + 'Manchesteriin, ja piiput tosiaan savuavat samaan tapaan. Tehtaansaleissa on '
      + 'enemmän naisia kuin miehiä, ja lauantaina koko kaupunki kävelee '
      + 'koskenrantaa pitkin parhaissaan. [softly] Vesi tekee täällä '
      + 'työn, jonka muualla tekee hiili — [whispers] ja vesi ei lopu.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-tampere.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS (Raamattu, "LIVIA AIKASIIRTYMÄN VÄLITTÄJÄNÄ —
     * PARIPERIAATE"). Piirtyy kuplan ENSIMMÄISEKSI kappaleeksi, heti
     * isoisän merkinnän perään (js/fokusvirta.js piirraPollo);
     * kanoninen `teksti` seuraa sen jälkeen.
     *
     * PARIN VALINTA: merkintä ei ole synkkä vaan tarkka, ja se päättyy
     * väitteeseen ("vesi ei lopu"). Livia asettuu väitteen puolelle ja
     * lisää siihen sen, mitä isoisä ei voinut nähdä. ISOISÄ OSOITTAUTUU
     * OIKEAKSI — sääntö, joka estää hahmoa muuttumasta
     * besserwisseriksi.
     *
     * MIKSI VESI EIKÄ TEHTAAT: kanoninen `teksti` alempana käsittelee jo
     * tehtaat, piiput ja kävelyn, joten maadoitus vastaa siihen
     * lauseeseen, jota se ei koske.
     *
     * FAKTAKURI: kaksi väitettä. (1) Tammerkoskessa toimii neljä
     * vesivoimalaa, vanhin Tampellan vuodelta 1916 (fi-Wikipedia
     * "Tammerkoski", osio Voimalaitokset; tukena pelin oma jo hyväksytty
     * nosto "Koski, joka putoaa kahdeksantoista metriä", jonka mukaan
     * sama vesi tuotti myöhemmin kaupungin sähkön). (2) Finlaysonin
     * kutomosaliin sytytettiin sähkövalot maaliskuussa 1882 ja ne olivat
     * ensimmäiset koko Pohjolassa — tämä on PELIN OMAA jo hyväksyttyä
     * aineistoa kahdessa paikassa (js/packs/kulttuuri-kategoriat.js,
     * nosto "Valo syttyi kutomosalissa", ja js/packs/julisteet.js,
     * `tampere`, jonka kommentti tarkentaa omistajan faktakysymyksen
     * jälkeen 23.8.2026: ensimmäisyys koskee HEHKULAMPPUvalaistusta,
     * koska Pietarissa oli jo 1879–80 kaarilamppuvaloa). Maadoitus
     * sanoo siksi hehkulamput eikä yleistä "sähkövaloa".
     *
     * AIKASUHDE SANOTAAN ÄÄNEEN: 1882 on yhdeksän vuotta isoisän käynnin
     * JÄLKEEN, eli hän ei voinut sitä nähdä.
     *
     * PUHEKIELIPASSI (Raamattu, "LIVIAN PUHEKIELI", sääntö 1 PAINOPISTE
     * REUNOILLA): lyhentymät vain reunoilla ("Kato", "mut"), keskellä
     * sanat auki; pronominit kokonaisina; ei huutomerkkejä.
     */
    maadoitus: 'Kato, siinä isoisäsi oli oikeassa: vesi ei loppunut. '
      + 'Samassa koskessa pyörii yhä neljä vesivoimalaa, ja vanhin '
      + 'niistä aloitti vuonna 1916 — koski tekee edelleen sähköä '
      + 'keskellä kaupunkia. Yhdeksän vuotta hänen käyntinsä jälkeen '
      + 'sama vesi sytytti Finlaysonin kutomosaliin hehkulamput, '
      + 'ensimmäiset koko Pohjolassa. Piiput hän ehti nähdä, mut sitä '
      + 'valoa ei.',
    /*
     * KAANON (Fable) — Livian nykypäivän huomio sellaisenaan.
     *
     * HUOM KUVAN JA TEKSTIN SUHTEESTA. Repliikki nimeää tehtaat, jotka
     * ovat nykyään museoita, teattereita ja panimoita, ja kosken.
     * Kaupunkilehden avauskarusellin heroista yksikään ei ole koski tai
     * tehdassali (Näsilinna, kirjasto Metso, Vanha kirkko, Näsinneula),
     * ja omistajan linjaus sanoo, että pöllön kuva on LEHDEN hero.
     * Kuvaksi on siksi otettu karusellin ENSIMMÄINEN hero, joka on myös
     * lähimpänä repliikin aihetta: Näsilinna on se palatsi, jonka
     * tehtaan omistajasuku rakensi itselleen kosken rahoilla — tehdas
     * toisesta päästä katsottuna. Ero on kirjattu raporttiin; jos
     * koski- tai tehdashero generoidaan myöhemmin, vaihto on tässä
     * yhden rivin työ.
     */
    teksti: 'Se isäntäväen vertaus jäi elämään lempinimenä, jonka kuulet '
      + 'kohta itsekin — tehtaat vaan ovat nykyään museoita, teattereita '
      + 'ja panimoita.. piiput seisovat mut eivät savua. Koski kohisee keskellä '
      + 'kaupunkia ihan niin kuin isoisäsi aikaan, ja sen rannalla '
      + 'kävellään edelleen. Suomi oli hänen käydessään '
      + 'suuriruhtinaskunta, keisarin oma. Katsotaan merkinnät.',
    kuva: {
      ampari: 'herokoe/hero-tampere-aamu.jpg',
      /* Selite on lehden oman avauskuvan selite lyhennettynä yhdeksi
       * virkkeeksi; yksikään luku eikä nimi muutu. */
      selite: 'Tampereen Näsilinna valmistui 1898 Karl August Wreden '
        + 'suunnittelemaksi uusbarokkipalatsiksi tehtailijasuvun '
        + 'jäsenelle Peter von Nottbeckille, joka antoi sille nimen '
        + 'Milavida.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * LUONTOTÄKY. MIKSI TÄMÄ TÄKY: merkintä alkaa kahdesta järvestä ja
       * niiden välisestä koskesta ja päättyy siihen, että vesi tekee
       * työn. Tämä kertoo, mistä se työntekijä tuli — ja että se on
       * kaupunkia vanhempi mutta ei kovin paljon.
       *
       * FAKTAT (fi-Wikipedia "Tammerkoski", osio Historiaa, sekä
       * fi-Wikipedia "Tampere", osiot Vesistöt ja Historia; haettu
       * 29.8.2026):
       *   - Näsijärven ja Pyhäjärven pintojen ero on 18 metriä ja vesi
       *     virtaa Näsijärvestä etelään Pyhäjärveen;
       *   - alkujaan muinais-Näsijärven vedet virtasivat POHJOISEEN ja
       *     laskivat nykyisen Lapuanjoen latvavesien kautta
       *     Pohjanlahteen;
       *   - jääkauden jälkeinen maankohoaminen muutti virtaukset:
       *     etelässä vesi nousi, syntyi puro, joka söi hiekkaiseen
       *     maaperään uran, ja urasta kasvoi Tammerkoski; Näsijärven
       *     pinta aleni, kunnes virtaus pohjoiseen laskujokeen tyrehtyi
       *     ja vanhasta uomasta jäi vain merkkejä;
       *   - purkukohdan lähellä on kallio lähellä maanpintaa, ja siihen
       *     loppui uoman syveneminen — ilman kalliota Näsijärven vedet
       *     olisivat voineet huveta lähes olemattomiin;
       *   - maankohoaminen jatkuu, Tampereella nykyisin noin viisi
       *     millimetriä vuodessa;
       *   - kosken iästä on kaksi lukua: "noin 7 500 vuotta sitten"
       *     (Tammerkoski) ja "noin 5 400 – 6 900 vuotta sitten"
       *     (Tampere, osio Vesistöt), joka lisää senkin, että koski
       *     muodostui Pyynikinharjun matalimpaan kohtaan. MOLEMMAT
       *     LUVUT KERROTAAN, koska niitä ei voi sovittaa yhteen eikä
       *     kumpaakaan saa esittää ainoana totuutena.
       */
      id: 'koski',
      nappi: 'Järvi, joka laski ennen toiseen suuntaan',
      otsikko: 'Koski, joka söi itsensä hiekkaan',
      teksti: 'Isoisäsi kirjoitti, että vesi tekee täällä työn. Vesi teki '
        + 'myös kosken. Muinaisen Näsijärven vedet eivät alun perin '
        + 'laskeneet etelään vaan pohjoiseen: ne kulkivat nykyisen '
        + 'Lapuanjoen latvavesien kautta Pohjanlahteen. Sitten maa alkoi '
        + 'jääkauden jälkeen kohota, eikä se kohonnut kaikkialta yhtä '
        + 'nopeasti. Etelässä vesi nousi ja nousi, kunnes Pyynikinharjun '
        + 'matalimpaan kohtaan syntyi puro. Puro söi hiekkaiseen '
        + 'maaperään uran, ura syveni koskeksi, ja Näsijärven pinta '
        + 'laski niin paljon, että vanha pohjoinen laskujoki kuivui — '
        + 'siitä on maastossa yhä joitakin merkkejä. Suunta oli '
        + 'kääntynyt. Syvenemisen pysäytti purkukohdan lähellä oleva '
        + 'kallio, joka ei antanut periksi; ilman sitä Näsijärven vedet '
        + 'olisivat voineet huveta lähes olemattomiin. Jäljelle jäi '
        + 'kahdeksantoista metrin pudotus keskelle kaupunkia. Kosken '
        + 'iästä on kaksi arviota, noin 5 400–6 900 ja noin 7 500 '
        + 'vuotta, eli kaupunki on kosken rinnalla eilinen. Ja maa nousee '
        + 'yhä: Tampereella noin viisi millimetriä vuodessa. Isoisäsi '
        + 'olisi mitannut sen ja kirjannut lukeman ylös.',
      /*
       * Commons 29.8.2026: 1654×1209, public domain, Magnus von Wright,
       * päiväys 1861, Kansallisgallerian kokoelma (A I 36:2),
       * Restrictions tyhjä. SILMÄTARKISTUS tehty: akvarelli, jossa
       * koski, tehdasrakennuksia ja savuava piippu; etualalla ranta ja
       * vajoja, ei tunnistettavia ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on kosken aikalaiskuva kahdentoista
       * vuoden päästä isoisän käynnistä taaksepäin — sama näkymä, jonka
       * merkintä kuvailee, ja kartanpiirtäjän pojanpojalle piirretty
       * kuva sopii paremmin kuin nykyvalokuva.
       */
      kuva: {
        tiedosto: 'Magnus von Wright - Tammerkoski - A I 36-2 - Finnish National Gallery.jpg',
        selite: 'Tammerkosken partaalla seisoi tehtaita ja savuavia '
          + 'piippuja jo vuonna 1861, kaksitoista vuotta ennen isoisän '
          + 'käyntiä.',
        lahde: 'Magnus von Wright 1861, Kansallisgalleria / Wikimedia '
          + 'Commons (public domain)',
      },
      visa: {
        kysymys: 'Mihin muinaisen Näsijärven vedet laskivat ennen kuin '
          + 'Tammerkoski syntyi?',
        vaihtoehdot: [
          'Etelään Pyhäjärveen, kuten nytkin',
          'Pohjanlahteen',
          'Ei mihinkään, sillä järvi oli umpinainen allas',
        ],
        oikea: 1,
        fakta: 'Kosken syvenemisen pysäytti purkukohdan lähellä oleva '
          + 'kallio — ilman sitä Näsijärven vedet olisivat voineet huveta '
          + 'lähes olemattomiin. Maa kohoaa Tampereella yhä noin viisi '
          + 'millimetriä vuodessa.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän tarkin havainto on ovelta katsottu —
       * "tehtaansaleissa on enemmän naisia kuin miehiä". Tämä kertoo,
       * millainen maailma niiden ovien takana oli: ei työpaikka vaan
       * kokonainen laitos, jolla oli oma seurakunta ja oma pappi.
       *
       * FAKTAT (fi-Wikipedia "Finlaysonin tehdasalue", johdanto ja osio
       * Kuusvooninkinen; fi-Wikipedia "Tampere", osio Teollistuminen;
       * fi-Wikipedia "Finlaysonin kirkko", johdanto ja osiot Historia ja
       * Arkkitehtuuri; haettu 29.8.2026):
       *   - skotlantilainen James Finlayson perusti tehtaan 1820
       *     Tammerkosken yläjuoksulle; alkuperäinen tarkoitus oli
       *     valmistaa kehruukoneita, mutta koneet eivät menneet kaupaksi
       *     ja tehdas siirtyi puuvillan kehräämiseen;
       *   - Finlayson myi tehtaan 1836 pietarilaisille liikemiehille
       *     Carl Samuel Nottbeckille ja Georg Adolf Rauchille, ja siitä
       *     alkoi kasvu;
       *   - alueen vanhin rakennus on Kuusvooninkinen (TR 1), joka
       *     valmistui 1837; nimi tulee kuudesta kerroksesta (ruots. sex
       *     våningar); se on Suomen ensimmäinen moderni tehdasrakennus,
       *     koska kantava rakenne on väliseinien sijaan valurautapylväät,
       *     jotka valmisti Fiskarsin valimo; kehruu alkoi 1838 ja kudonta
       *     1839; vuonna 1892 taloon tuli automaattinen
       *     palonsammutusjärjestelmä, ja porrastornia korotettiin, jotta
       *     vesisäiliö saatiin tarvittavalle korkeudelle;
       *   - puuvillatehdas työllisti 1850-luvulla jo 2 000 ihmistä, ja
       *     vuonna 1856 koko kaupungissa oli 4 000 asukasta;
       *   - tehtaan työntekijät muodostivat oman seurakuntansa vuosina
       *     1846–1860, ja tehtaalla oli oma pappi eli tehtaansaarnaaja
       *     1846–1880;
       *   - Finlaysonin kirkko valmistui 1879 rukoushuoneeksi, sen
       *     rakennutti tehtaan johtaja Wilhelm von Nottbeck ja suunnitteli
       *     kaupunginarkkitehti F. L. Calonius; vuoden ensimmäinen
       *     työpäivä aloitettiin siellä jumalanpalveluksella 1970-luvulle
       *     asti; tehdas luovutti kirkon seurakuntayhtymälle 1981
       *     ehdolla, että sitä kutsutaan jatkossakin Finlaysonin
       *     kirkoksi.
       *
       * PELIN OMA AINEISTO tukee työväen koostumusta: kaupunkilehden jo
       * hyväksytty nosto "Skotlantilainen, joka osti kosken" sanoo
       * tehtaan työllistäneen tuhansia, enimmäkseen naisia ja lapsia.
       *
       * MITÄ EI KERROTA: vuoden 1918 taistelut. 13+ sallii vaaran, mutta
       * tämä täky on työn ja tavan tarina, eikä laudalle kirjoiteta
       * sotasisältöä.
       */
      id: 'finlayson',
      nappi: 'Tehdas, jolla oli oma pappi',
      otsikko: 'Puuvillatehdas, joka oli oma kaupunkinsa',
      teksti: 'Skotlantilainen James Finlayson perusti kosken '
        + 'yläjuoksulle vuonna 1820 konepajan, jonka oli tarkoitus '
        + 'valmistaa kehruukoneita. Koneet eivät menneet kaupaksi, joten '
        + 'tehdas alkoi kehrätä itse. Finlayson myi laitoksensa 1836 '
        + 'kahdelle pietarilaiselle liikemiehelle, Carl Samuel '
        + 'Nottbeckille ja Georg Adolf Rauchille, ja vasta siitä kasvu '
        + 'alkoi. Vuonna 1837 valmistui talo, jota kaupunki kutsuu yhä '
        + 'Kuusvooninkiseksi: nimi tulee ruotsin sanoista sex våningar, '
        + 'kuusi kerrosta. Puutalojen keskellä se oli pilvenpiirtäjä. Se '
        + 'on myös Suomen ensimmäinen moderni tehdasrakennus, koska sen '
        + 'välipohjia eivät kannata väliseinät vaan valurautapylväät, '
        + 'jotka valettiin Fiskarsissa. Kehruu alkoi 1838, kudonta 1839. '
        + 'Ja sitten mittasuhteet: 1850-luvulla tehdas työllisti kaksi '
        + 'tuhatta ihmistä, ja koko kaupungissa oli vuonna 1856 neljä '
        + 'tuhatta asukasta. Työväestä suurin osa oli naisia ja lapsia — '
        + 'juuri se, minkä isoisäsi huomasi salien ovelta. Tehdas ei '
        + 'ollutkaan vain työpaikka. Sen väki muodosti oman seurakuntansa '
        + 'vuosina 1846–1860, ja tehtaalla oli oma pappi, tehtaansaarnaaja, '
        + 'vuoteen 1880 asti. Kuusi vuotta isoisäsi käynnin jälkeen '
        + 'tehtaan johtaja Wilhelm von Nottbeck rakennutti työväelleen '
        + 'punatiilisen kirkon, ja siellä aloitettiin vuoden ensimmäinen '
        + 'työpäivä jumalanpalveluksella aina 1970-luvulle asti. Kirkko '
        + 'annettiin seurakunnalle 1981 — yhdellä ehdolla: nimi pysyy.',
      /*
       * Commons 29.8.2026: 2272×1704, CC BY 2.0, tekijä Museokeskus
       * Vapriikki, kuvaaja Heli Haavisto, kuvattu 21.2.2013,
       * Restrictions tyhjä. SILMÄTARKISTUS tehty: punatiilinen
       * uusgoottilainen kirkko lumessa, ei ihmisiä.
       *
       * SAMA LÄHDE KUIN LEHDESSÄ: kaupunkilehden Plevna-kuva on saman
       * Vapriikin kokoelmasta, joten lisenssikäytäntö on jo talossa
       * tarkistettu.
       */
      kuva: {
        tiedosto: 'Finlaysonin kirkko Heli Haavisto (16556986992).jpg',
        selite: 'Finlaysonin puuvillatehtaan oma kirkko valmistui 1879, '
          + 'ja tehdas luovutti sen seurakunnalle 1981 ehdolla, että nimi '
          + 'säilyy.',
        lahde: 'Museokeskus Vapriikki, kuva Heli Haavisto, Wikimedia '
          + 'Commons (CC BY 2.0)',
      },
      visa: {
        kysymys: 'Mistä Finlaysonin vanhin tehdasrakennus sai '
          + 'kutsumanimensä Kuusvooninkinen?',
        vaihtoehdot: [
          'Rakennuksessa oli kuusi höyrykonetta',
          'Sen rakentamiseen meni kuusi vuotta',
          'Siinä on kuusi kerrosta',
        ],
        oikea: 2,
        fakta: 'Talo valmistui 1837, ja se on Suomen ensimmäinen moderni '
          + 'tehdasrakennus: välipohjia kannattavat väliseinien sijaan '
          + 'valurautapylväät, jotka valettiin Fiskarsin valimossa.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja) — tosin
       * eläin on tässä maalattu, ja juuri siitä syntyi riita.
       *
       * MIKSI TÄMÄ TÄKY: merkintä on tehdaskaupungista, jossa
       * lauantaisin kävellään parhaissa vaatteissa. Tämä kertoo, mitä
       * sama kaupunki rakensi itselleen kolmekymmentä vuotta myöhemmin
       * tehtaiden rahoilla — ja kuinka huonosti se otettiin vastaan.
       *
       * FAKTAT (fi-Wikipedia "Tampereen tuomiokirkko", johdanto ja osio
       * Maalaukset; haettu 29.8.2026):
       *   - kirkko rakennettiin 1902–1907 ja tunnettiin Johanneksen
       *     kirkkona, kunnes siitä tuli 1923 Tampereen hiippakunnan
       *     tuomiokirkko; arkkitehti oli Lars Sonck, materiaali
       *     Uudenkaupungin harmaa graniitti;
       *   - kirkkosalin freskot maalasi Hugo Simberg: alttarin kahta
       *     puolta Haavoittunut enkeli ja Kuoleman puutarha, lehterin
       *     kaidetta pitkin Köynnöksenkantajat, jossa kaksitoista
       *     alastonta pikkupoikaa kannattelee ruusuköynnöstä ja
       *     symboloi Jeesuksen opetuslapsia;
       *   - pääholvin kattoon on maalattu kiemurteleva paratiisikäärme,
       *     jonka suussa on hyvän ja pahan tiedon omena;
       *   - suuren alttaritaulun Ylösnousemus ja kuorin ikkunasommitelman
       *     teki Magnus Enckell;
       *   - maalaukset herättivät aikalaisissa äänekästä paheksuntaa:
       *     Kuoleman puutarhan luurangot ja alastomat köynnöksenkantajat
       *     olivat monien mielestä kirkkoon sopimattomia, puhumattakaan
       *     käärmeestä kirkkosalin kunniapaikalla; vielä toisen
       *     maailmansodan jälkeen piispantarkastuksessa vaadittiin
       *     "loukkaavien" ja "sopimattomien" freskojen poistamista;
       *   - nykyään Simbergin ja Enckellin maalauksia pidetään
       *     suomalaisen symbolismin mestariteoksina.
       *
       * IKÄSOPIVUUS (13+): alastomat maalatut hahmot mainitaan siksi,
       * että ne ovat puolet paheksunnan syystä — asia kerrotaan
       * taidehistoriallisena tosiasiana ja yhdellä sivulauseella.
       */
      id: 'kaarme',
      nappi: 'Käärme kirkon katossa',
      otsikko: 'Fresko, jota vaadittiin poistettavaksi',
      teksti: 'Isoisäsi ei nähnyt tätä kirkkoa: se rakennettiin vasta '
        + 'vuosina 1902–1907, kun tehdaskaupungilla oli varaa rakentaa '
        + 'itselleen jotain muuta kuin tehdas. Lars Sonck piirsi sen '
        + 'Uudenkaupungin harmaasta graniitista, ja maalaustyöhön '
        + 'kutsuttiin Hugo Simberg. Alttarin kahta puolta hän maalasi '
        + 'Haavoittuneen enkelin ja Kuoleman puutarhan. Lehterin kaidetta '
        + 'pitkin kiertää Köynnöksenkantajat, jossa kaksitoista alastonta '
        + 'pikkupoikaa kannattelee ruusuköynnöstä. Ja aivan kirkkosalin '
        + 'kunniapaikalle, pääholvin kattoon, hän maalasi kiemurtelevan '
        + 'paratiisikäärmeen, jolla on suussaan hyvän ja pahan tiedon '
        + 'omena. Vastaanotto oli äänekäs. Luurangot ja alastomat pojat '
        + 'olivat monien mielestä kirkkoon kuulumattomia, ja käärme '
        + 'kaikkein pahiten. Riita ei myöskään kuollut nopeasti: vielä '
        + 'toisen maailmansodan jälkeen piispantarkastuksessa vaadittiin, '
        + 'että loukkaavat ja sopimattomat freskot poistetaan. Niitä ei '
        + 'poistettu. Nykyään ne ovat suomalaisen symbolismin '
        + 'mestariteoksia, ja käärme katsoo alas kirkkosaliin siipien '
        + 'keskeltä kuin mitään ei olisi tapahtunut.',
      /*
       * Commons 29.8.2026: 4272×2848, public domain (tekijä Hugo Simberg,
       * kuollut 1917; kuvaus "Snake fresco by Hugo Simberg in Tampere
       * Cathedral", valokuva 15.12.2009), Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: holvin keskiö, punainen kenttä ja käärme,
       * ympärillä maalattuja siipiä; ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Kattofresko Tampereen tuomiokirkko.jpg',
        selite: 'Tampereen tuomiokirkon pääholvin keskellä kiemurtelee '
          + 'paratiisikäärme, jonka suussa on hyvän ja pahan tiedon '
          + 'omena.',
        lahde: 'Hugo Simberg, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Millä perusteella tuomiokirkon freskoja vaadittiin '
          + 'poistettaviksi vielä toisen maailmansodan jälkeen?',
        vaihtoehdot: [
          'Niitä pidettiin kirkkoon sopimattomina',
          'Ne oli maalattu väärän pyhimyksen kunniaksi',
          'Niiden väriaineiden pelättiin vahingoittavan holvin rappausta',
        ],
        oikea: 0,
        fakta: 'Paheksuntaa herättivät Kuoleman puutarhan luurangot, '
          + 'alastomat köynnöksenkantajat ja ennen kaikkea käärme '
          + 'kirkkosalin kunniapaikalla. Samat maalaukset ovat nykyään '
          + 'suomalaisen symbolismin mestariteoksia.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   *
   * Pohjustaa laattakysymyksen js/packs/europe-questions.js, tampere[1]:
   * *"Kuka antoi Tampereelle kaupunkioikeudet vuonna 1779?"* → Ruotsin
   * kuningas Kustaa III. Visasääntö täyttyy: vastaus löytyy tekstistä,
   * mutta kysymyksen sanamuoto ei toistu siinä sellaisenaan — teksti ei
   * puhu kaupunkioikeuksien antamisesta vaan siitä, mitä kuningas
   * allekirjoitti ja missä.
   *
   * MIKSI JUURI TÄMÄ VIIDESTÄ: kaupunkilehti ei käsittele kaupungin
   * perustamista lainkaan (lehden historiasivu alkaa vuodesta 1820), kun
   * taas järvet, Näsinneula ja Pispalan sauna ovat lehdessä ja lisänimi
   * on jo kaanontekstissä. Tämä on ainoa viidestä, jonka pohjustus ei
   * ole lehden toisinto.
   *
   * FAKTAT (fi-Wikipedia "Tampere", osiot "Varhaishistoria kaupungin
   * perustamiseen" ja "Teollistuminen", sekä fi-Wikipedia "Tammerkoski",
   * osio Historiaa; haettu 29.8.2026):
   *   - Erik Edner ehdotti valtiopäivillä 1771–1772 kaupungin
   *     perustamista Tammerkoskelle;
   *   - Kustaa III matkasi Suomeen 1775 ja allekirjoitti Ruotsissa
   *     Gripsholmin linnassa Tammerkosken kaupungin perustamiskirjan
   *     1.10.1779;
   *   - kaupunki sijaitsi syrjäisellä takamaalla ja sen asukkaat olivat
   *     maanviljelijöitä; koski virtasi vielä lähes vapaana, mutta
   *     kuningas uskoi sen tuovan menestystä ja kruunulle verotuloja;
   *   - kaupungille annettiin vapaakaupungin oikeudet: kuka tahansa sai
   *     muuttaa sinne ja toimia haluamassaan ammatissa, mutta maata ei
   *     saanut viljellä, joten toimeentulo oli haettava kaupasta ja
   *     käsityöstä — tehtaita ei vielä ollut;
   *   - vaikka yrittäminen oli vapaata ja tullietuja oli, teollistuminen
   *     oli hidasta: vuonna 1809 asukkaita oli edelleen alle tuhat;
   *   - James Finlayson perusti tehtaansa 1820; väkiluku kasvoi vuosien
   *     1870 ja 1900 välillä 7 000:sta 36 000:een;
   *   - Tammerkoski oli vuosina 1775–1870 rajana Hämeen läänin ja Turun
   *     ja Porin läänin välillä, ja kaupunki perustettiin alkujaan vain
   *     kosken länsirannalle; itäpuoli liitettiin siihen 1876.
   *
   * TÄMÄ VIIMEINEN ON ISOISÄN OMA YKSITYISKOHTA: hänen käydessään 1873
   * kaupunki oli virallisesti vain kosken toisella puolella, vaikka
   * tehtaita oli molemmilla rannoilla.
   */
  oppitunti: {
    otsikko: 'Kaupunki, joka perustettiin paperilla',
    teksti: 'Tampere ei kasvanut kylästä kaupungiksi vaan säädettiin '
      + 'sellaiseksi. Valtiopäivillä 1771–1772 Erik Edner ehdotti, että '
      + 'Tammerkoskelle perustettaisiin kaupunki. Kustaa III kävi Suomessa '
      + '1775, ja neljä vuotta myöhemmin, 1. lokakuuta 1779, hän '
      + 'allekirjoitti perustamiskirjan Gripsholmin linnassa Ruotsin '
      + 'puolella — kaupunki syntyi siis kaukana omalta paikaltaan, '
      + 'kynänvedolla. Paikka oli syrjäinen takamaa, sen asukkaat '
      + 'maanviljelijöitä ja koski vielä lähes vapaa, mutta kuningas '
      + 'uskoi, että vesi elättäisi kaupungin ja kaupunki tuottaisi '
      + 'kruunulle veroja. Ehdot olivat epätavalliset. Kuka tahansa sai '
      + 'muuttaa tänne ja ryhtyä mihin ammattiin halusi, mutta maata ei '
      + 'kaupungissa saanut viljellä: elanto oli haettava kaupasta ja '
      + 'käsityöstä. Tehtaita ei ollut, eikä niitä tullut vielä pitkään '
      + 'aikaan. Vapaudesta ja tullieduista huolimatta väkeä oli vuonna '
      + '1809 yhä alle tuhat. Sitten koski teki sen, mitä paperi oli '
      + 'luvannut: Finlayson aloitti 1820, ja vuosien 1870 ja 1900 '
      + 'välillä asukasluku nousi seitsemästä tuhannesta '
      + 'kolmeenkymmeneenkuuteen tuhanteen. Isoisäsi käveli täällä '
      + 'keskellä tuota kasvua. Yhden asian hän tuskin tiesi: kaupunki, '
      + 'jota hän katseli, oli virallisesti vain kosken länsipuolella. '
      + 'Itäranta tehtaineen liitettiin siihen vasta 1876, kolme vuotta '
      + 'hänen käyntinsä jälkeen.',
    /*
     * Commons 29.8.2026: 6750×6949, public domain, tekijä "The Russian
     * Ministry of War Topographic Department", päiväys 1870–1917,
     * digitointi ja jako Kansallisarkisto, Restrictions tyhjä.
     * SILMÄTARKISTUS tehty 960 pikselillä: karttalehti, jonka
     * vasemmassa laidassa kaupunki kahden järven välissä keltaisena
     * ruutukaava-alueena nimellä Таммерфорсъ; ei ihmisiä.
     *
     * PÄIVÄYSTARKKUUS: Senaatin kartasto on sarjana vuosilta 1870–1917,
     * mutta TÄMÄN lehden alareunassa lukee "1912 vuoden mittaus". Selite
     * sanoo siksi vain, mitä kartta on, eikä väitä sen olevan isoisän
     * matkavuodelta.
     *
     * MIKSI JUURI TÄMÄ KUVA: oppitunti kertoo kaupungista, joka syntyi
     * paperilla, ja kuva on paperia — ja se on lisäksi keisarikunnan
     * topografien piirtämä, mikä lunastaa Livian kanonisen lauseen
     * suuriruhtinaskunnasta.
     */
    kuva: {
      tiedosto: 'Senate Atlas, 1870–1907. Sheet XIX-XX 24-25 Tampere.jpg',
      selite: 'Venäjän sotaministeriön topografit kartoittivat Tampereen '
        + 'seudun Senaatin kartastoon, jossa kaupunki on kahden järven '
        + 'välissä nimellä Таммерфорсъ.',
      lahde: 'Venäjän sotaministeriön topografiosasto, Kansallisarkisto / '
        + 'Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * Tampereella ei ole tarinakaaren pakettia (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT) eikä riviä js/packs/kohtaamiset.js:ssä, joten tälle
   * kaupungille ei ole valmista hahmoa: alla oleva Vieno on EHDOTUS, ei
   * kaanonia. Kortti on esittely; VARSINAINEN KYSYMYS on ennallaan
   * laattamekaniikassa (game.actionQuiz lukee js/packs/
   * europe-questions.js, tampere), eikä tämä paketti kosketa sitä.
   *
   * KUVAA EI OLE (omistajan linjaus): kohtaamiskortti rakennetaan ilman
   * kuvaa, joten kentät ovat hahmo, nappi, varmistus, vihjeOsio ja
   * teksti.
   *
   * KAAVA (tilaus): suvun jatkumo + epäusko + portinvartijakysymys.
   *
   * MIKSI KONEENHOITAJA JA MIKSI KOSKI: koko merkintä on kosken varassa
   * ("vesi tekee täällä työn"), ja kosken neljä vesivoimalaa ovat yhä
   * käytössä — kolme niistä kaupungin omia. Vartija on siis se ihminen,
   * joka on paikalla samasta syystä kuin tehtaatkin aikoinaan.
   *
   * ÄÄNIPROFIILI (tarinakaari, luku 3): Vieno on niitä, jotka EIVÄT usko
   * sukunsa tarinaa mutta jatkavat sitä silti. Se on erän epäuskoinen
   * ääni.
   *
   * ODOTUKSEN SYY ON SUVUN OMA (varallisuussääntö, tarkistettu virke
   * virkkeeltä): isoisä ei maksa mitään, ei tilaa mitään eikä käske
   * ketään — hän vain seisoi sillalla ja laski piiput, ja suvun oma
   * ammattitaikausko teki lukemasta perinnön. Piippujen luku
   * viisitoista on pelin omaa jo hyväksyttyä aineistoa (js/packs/
   * europe-questions.js, kulttuurinostot, isoisän ääni: *"Savupiippuja
   * lasken viisitoista."*), joten kaiku on pelin sisäinen eikä uusi
   * faktaväite.
   *
   * VIHJELINKIN OSIO: tunnus on kaupunkilehden osion id (js/packs/
   * kulttuuri-kategoriat.js, tampere): 'kaupunki' tai 'historia'.
   * Laattakysymyksistä neljä viidestä (järvet, Näsinneula, Pispalan
   * sauna, lisänimi) saa tukensa kaupunkisivulta, joten linkki vie
   * sinne.
   */
  kohtaaminen: {
    hahmo: 'Koneenhoitaja Vieno',
    nappi: 'Tapaa koneenhoitaja',
    varmistus: 'Haluatko varmasti tavata Vienon juuri nyt?',
    vihjeOsio: 'kaupunki',
    teksti: 'Vieno pitää huolta turbiinista, joka pyörii kosken sisällä '
      + 'saman veden voimalla kuin tehtaiden vesipyörät ennen sitä. '
      + 'Suvussa on seisty tämän kosken äärellä kutomosalista alkaen, ja '
      + 'perintönä on kulkenut tapa: ennen kuin mittari luetaan, '
      + 'kuunnellaan koski — sillä kuuluu, paljonko vettä tulee. Vieno '
      + 'sanoo suoraan pitävänsä koko tapaa taikauskona ja tekevänsä sen '
      + 'silti joka aamu, koska hänen isoäitinsä teki niin. Suvussa '
      + 'kerrotaan myös vieraasta herrasta, joka seisoi kerran sillalla ja '
      + 'laski savupiiput ääneen — viisitoista, hän sai — ja kirjoitti '
      + 'luvun kirjaan. Vieno ei usko siitä sanaakaan. Ennen kuin hän '
      + 'avaa turbiinihallin oven, hän haluaa tietää, tunteeko tulija '
      + 'tämän kaupungin muutenkin kuin piipuista.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin Helsingillä ja Sevillalla.
   */

  /*
   * KOHTAAMISPAIKKA: TAMMERKOSKI.
   *
   * 61,5 N / 23,76305556 E — fi-Wikipedia "Tammerkoski",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU (kaava tarkistettu Helsingin paketin lukuja vasten: samalla
   * koodilla Helsinki 6666,2 / 918,4 ja Oulu 6682,2 / 665,3 — täsmälleen
   * ne luvut, jotka js/packs/fokusvirta-helsinki.js:ssä on):
   *   maailmankartta  x = ((23,76305556 − (−175)) mod 360) × (12000/360)
   *                     = 6625,4
   *                   y = (millerY(76) − millerY(61,5)) × 12000/2π
   *                     = 850,1
   *   europe (raaka)  x = (23,76305556 + 11) × 19,2 = 667,5
   *                   y = (72 − 61,5) × 26,3 = 276,2
   *
   * MAAILMANKARTTA OSUU LAATTAAN PILKULLEEN. Tampereen laatta on
   * js/packs/maailmankartta.js:ssä 6625,4 / 850,2 eli täsmälleen tässä
   * lasketussa pisteessä: sekin on laskettu kosken koordinaateista.
   * Piste jää siis laatan alle, ja js/fokuspiste.js siirtää PIIRRETYN
   * merkin koilliseen (PISTE_ERO_MIN), kuten Ateenassa, Sofiassa ja
   * Roomassa.
   *
   * EUROOPAN LAUDALLA PISTETTÄ ON SIIRRETTY — JA SYY ON LAUDAN OMA.
   * Tampereen laatta EI ole Euroopan laudalla oikeassa paikassaan, eikä
   * se ole virhe: js/packs/europe.js:n oma kommentti laatan yllä kertoo,
   * että tosipaikassaan (667, 276) Tampereen aarrelaatta istuisi suoraan
   * Helsingin pallon päällä, koska laudan minCityDistance on 60 pikseliä
   * ja laatta piirtyy kohtaan (x+22, y+18). Kaupunki on siksi siirretty
   * Helsinki–Tampere-suuntaa pitkin pohjoiseen pisteeseen 657 / 245.
   *
   * Koska siirto on laudan tietoinen sopimus eikä maaston tosiasia,
   * kohtaamispisteeseen on tehty SAMA siirto samansuuruisena:
   *   Δx = 657 − (23,76083333 + 11) × 19,2 = −10,4
   *   Δy = 245 − (72 − 61,49805556) × 26,3 = −31,2
   *   europe x = 667,5 − 10,4 = 657,1
   *   europe y = 276,2 − 31,2 = 245,0
   * Näin piste on kosken kohdalla SUHTEESSA LAATTAAN, aivan kuten
   * maailmankartalla — ja siirto tulee ainoastaan siitä samasta
   * kommentista, jolla laatta itse siirrettiin. Jos integroija haluaa
   * mieluummin raa'an maastopisteen, se on 667,5 / 276,2; silloin piste
   * jää 33 yksikön päähän laatasta eli PISTE_ERO_MIN-rajan (14)
   * ulkopuolelle, jolloin peli ei siirrä sitä ja vihreä piste näyttäisi
   * Keuruun suunnalla olevalta erilliseltä kohteelta.
   */
  kohtaamispiste: {
    nimi: 'Tammerkoski',
    laudat: {
      maailmankartta: { x: 6625.4, y: 850.1 },
      europe: { x: 657.1, y: 245.0 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Tampereen sivupino (js/lehti.js
   * rakennaSivut): 0 = etusivu, 1 = kaupunkisivu "Tampere",
   * 2 = Historia, 3 = Menovinkit (Suomen maapaketista, js/packs/
   * maa-kategoriat.js FIN). Sama pino kuin Helsingillä.
   *
   * Sivun 1 kysymys on Tampereen kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   *
   * JULISTE ON OLEMASSA: js/packs/julisteet.js:ssä on `tampere`-rivi
   * (tuotanto/tuot-tampere.png, "Tampere 1882"), joten sivun 3 palkinto
   * lunastuu oikeasti eikä jää pelkäksi rahaksi.
   */
  lehtitehtavat: [
    {
      id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: AMURI_VISA,
    },
    {
      id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: HAMEENSILTA_VISA,
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. Iso
   * aarre: Ivalojoen kultahippu. Merkintä aukeaa, kun aarre löytyy
   * (js/fokusvirta.js fokusvirtaAarremerkinta), samaan matkakirja-
   * korttiin kuin saapumismerkintä.
   */
  aarremerkinta: {
    teksti: 'Tukkilainen kertoi kullasta, jota huuhdotaan Lapin joesta '
      + 'niin kaukana pohjoisessa, että sinne kävellään viikko '
      + 'viimeisestä talosta. Hallitus rakensi sinne kruununstationin ja '
      + 'miehet elävät maakuopissa. Suurin hippu painoi hänen mukaansa '
      + 'enemmän kuin kirkonkirja — ja joku sen kokoinen on hänen '
      + 'mukaansa vielä löytämättä.',
  },
};
