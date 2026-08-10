// Vuorikohteiden kuvakarusellit: käsin kuratoidut valokuvat kartan
// maastonimien "Lue lisää" -ikkunaan.
//
// Omistajan tilaus 10.8.2026 (kuvakaappaus Kaukasus-popupista):
// "Vuorilta on varmasti hienoja kuvia. Niitä voisi lisätä jopa
// kymmenen. Tällaisiin kohteisiin, samanlaisiin karuselliin, voi käydä
// kaikki vuorikohteet läpi samalla tavalla ja lisätä laadukkaita
// kuvia."
//
// --- miksi käsin ja miksi tässä ---
//
// Maastonimen i-nappi avaa saman ikkunan kuin kaupungit, ja se osaa
// näyttää artikkelin kuvat karusellina ilmaiseksi. Wikipedian
// artikkelin kuvasto ei kuitenkaan kelpaa vuorille: Karpaattien
// artikkelissa on kaksi karttaa ja geologinen leikkaus, Uralilla
// rajapyykki. Kartan tummin läiskä ansaitsee parempaa, joten kuvat on
// valittu käsin.
//
// Avain on maastonimen `avain` (js/packs/maasto-nimet-vuoret.js), EI
// Wikipedia-otsikko. Otsikot törmäävät: Madagaskarin ylängön artikkeli
// on "Madagaskar", ja sama otsikko on Afrikan laudan saarikohteella —
// otsikkoavain olisi antanut kaupungille vuoristogallerian.
//
// --- mistä kuvat ovat ja mitä niistä on tarkistettu ---
//
// Kaikki Wikimedia Commonsista, vain PD- ja CC-lisenssit ilman ND- ja
// NC-ehtoa. Ehdokkaat on koottu Commonsin KATEGORIASTA, joka on sidottu
// vuoristoon Wikidatan kautta (tools/hae-vuorikuvat.mjs) — ei
// nimihaulla, koska hakutuloksen otsikko ei kerro, mikä vuori kuvassa
// on.
//
// JOKAINEN KUVA ON KATSOTTU SILMÄLLÄ ennen hyväksyntää
// (tools/tee-kuvataulu.py latoo ehdokkaat 480 pikselin ruuduiksi).
// Automaattinen seula ei näe väärää vuorta, vesileimaa eikä pehmeää
// tarkennusta; niistä kaikista on tässä työssä hylätty ehdokkaita.
//
// --- kentät ---
//
// tiedosto  Commonsin tiedostonimi ilman "File:"-etuliitettä. Yhdellä
//           rivillä (julkaisusääntö), vaikka nimi olisi pitkä.
// selite    suomenkielinen kuvateksti: mitä kuvassa näkyy ja mistä.
//           Kirjoitettu Commonsin kuvauksen POHJALTA, ei käännetty
//           sellaisenaan.
// lahde     tekijä ja lisenssi pelin vakiomuodossa
//           "Tekijä, Wikimedia Commons (CC BY-SA 4.0)". Tekijä on
//           Commonsin Artist-kentästä, ei muistista — väärä
//           tekijämerkintä on lisenssirikkomus siinä missä puuttuvakin.
//
// Enintään kymmenen kuvaa kohteessa (omistajan katto). Vähempi on
// parempi kuin heikko täytekuva: kuudesta upeasta jää parempi
// muistijälki kuin kymmenestä keskinkertaisesta.

export const VUORIKUVAT = {
  himalaja: [
    {
      tiedosto: 'Sunset view of Everest.jpg',
      selite: 'Auringonlasku Mount Everestillä. Viimeinen valo osuu vain '
        + 'ylimpiin huippuihin, kun laaksot ovat jo pimeässä — Everestin '
        + 'huipun poikki kulkee Nepalin ja Kiinan raja.',
      lahde: 'Nir B. Gurung, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Aerial View of Peaks of Khumbu, Ngozumpa Glacier and Gokyo Lakes (crop).jpg',
      selite: 'Khumbun huiput ilmasta: Ngozumpa-jäätikkö kivimoreenin alla ja '
        + 'Gokyon järvet sen vieressä. Taustan jonossa ovat Everest ja Makalu, '
        + 'ja koko näkymä on Sagarmathan kansallispuistoa.',
      lahde: 'Megaurab09 / UnpetitproleX, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Annapurna Massif-IMG 5221-Pano.jpg',
      selite: 'Annapurnan vuoristo perusleiristä nähtynä: edessä Annapurna '
        + 'South ja takana Annapurna I:n eteläseinä. Ryhmässä on yksi yli '
        + 'kahdeksantuhannen metrin huippu ja kolmetoista yli seitsemän '
        + 'tuhannen.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Panorama from poonhill-2019-BJ.jpg',
      selite: 'Aamupanoraama Poon Hillistä. Vasemmalta oikealle nousevat '
        + 'Gurja, Dhaulagirin huiput, Tukche ja Nilgiri — Dhaulagiri itse '
        + 'kohoaa 8 167 metriin.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Machapuchare Himal-3797.jpg',
      selite: 'Machapuchare eli Kalanpyrstö auringonnousussa. Vuori on '
        + 'Nepalissa pyhä, eikä sen huipulle ole annettu kiipeämislupaa — se '
        + 'on yksi harvoista suurista huipuista, joilla kukaan ei ole käynyt.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Machhapuchhre or Fishtail Mountain 6,993 m (22,943 ft)- IMG 5246.jpg',
      selite: 'Machhapuchhre (6 993 m) Annapurnan perusleiristä. Nimi '
        + 'tarkoittaa kalanpyrstöä: kaksihuippuinen harja näyttää siltä '
        + 'sivusta katsottuna.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Ama Dablam, Nepal.jpg',
      selite: 'Ama Dablam luoteesta Pherichen kylän luota. Nimi tarkoittaa '
        + '"äidin kaulakorua": harjanteet ovat kädet ja rinteen riippuva '
        + 'jäätikkö se koru.',
      lahde: 'Vyacheslav Argenberg, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: '160316-031 Bridge near Tatopani.jpg',
      selite: 'Riippusilta Kali Gandakin yli Tatopanin lähellä, taustalla '
        + 'Nilgiri South (6 839 m). Kuormahevoset ovat yhä tavallinen '
        + 'kulkuneuvo siellä, minne tie ei nouse.',
      lahde: 'Faj2323, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Kagbeni Mustang-WLV-0741.jpg',
      selite: 'Kagbenin kylä Ylä-Mustangissa Kali Gandakin laaksossa. Talot '
        + 'on rakennettu kiinni toisiinsa savesta ja kivestä, koska laakson '
        + 'läpi puhaltaa päivittäin voimakas tuuli.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Everest, Himalayas.jpg',
      selite: 'Mount Everest lähikuvassa: maailman korkein vuori 8 849 '
        + 'metriin. Huipulta lähtevä lumisuihku kertoo suihkuvirtauksesta, '
        + 'joka pyyhkii harjaa suurimman osan vuodesta.',
      lahde: 'Vyacheslav Argenberg, Wikimedia Commons (CC BY 4.0)',
    },
  ],

  karakoram: [
    {
      tiedosto: 'The Mighty K2 PAkistan.jpg',
      selite: 'K2 Concordian jäätiköiden risteyksestä. Maailman toiseksi '
        + 'korkein vuori (8 611 m) on jyrkempi ja vaarallisempi kuin Everest, '
        + 'eikä sitä ole koskaan noustu talvella ilman lisähappea.',
      lahde: 'Maqsood aktar, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: "Hunza Valley, view from Eagle's Nest.jpg",
      selite: 'Hunzan laakso Gilgit-Baltistanissa Eagle\'s Nestistä nähtynä. '
        + 'Näkymässä ovat Rakaposhi, Baltitin ja Altitin linnoitukset sekä '
        + 'Hunzan ja Nagarin jokien yhtymäkohta — Silkkitien haara kulki '
        + 'tästä laaksosta.',
      lahde: 'Alllexxxis, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Aerial view of Baltoro range.jpg',
      selite: 'Baltoron jäätikkö ilmasta. Tummat juovat ovat moreenia eli '
        + 'jäätikön kuljettamaa kiviainesta, ja niiden mutkista näkee, miten '
        + 'sivujäätiköt liittyvät päävirtaan.',
      lahde: 'Tariq hameed sulemani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Biafo hisper glaciers , baltoro , pakistan.jpg',
      selite: 'Biafon ja Hisparin jäätiköt kohtaavat. Yhdessä ne muodostavat '
        + 'yli sadan kilometrin jäätie, joka on napa-alueiden ulkopuolen '
        + 'pisimpiä.',
      lahde: 'Tariq hameed sulemani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Broad Peak and K2.jpg',
      selite: 'Broad Peak ja K2 matkalla K2:n perusleiriin. Neljä '
        + 'kahdeksantuhattametristä huippua on täällä muutaman kymmenen '
        + 'kilometrin säteellä.',
      lahde: 'Sallahuddin shah, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Western Karakorams Aerial View.jpg',
      selite: 'Läntinen Karakoram ilmasta. Etualan harjanne kuuluu vielä '
        + 'Himalajaan, ja niiden välissä kulkee Indusjoen laakso — takana '
        + 'oleva jono on Rakaposhi-Haramoshin harjanne.',
      lahde: 'Moiz Ismaili, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Sunset in mountains of Pakistan.jpg',
      selite: 'Auringonlasku Paun vuorilla Skardun lähellä. Säteet lähtevät '
        + 'harjanteen takaa viuhkana, kun laakso on jo varjossa.',
      lahde: 'Muhammad Nazir Baltistani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Goma Village, Ghanche, Gilgit and Baltistan, Pakistan.JPG',
      selite: 'Ilta Goman kylässä Ghanchen piirikunnassa juuri ennen talven '
        + 'tuloa. Kylät ovat laaksonpohjissa, koska ylempänä ei kasva mitään.',
      lahde: 'Abrarwyne, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Karakoram2 K2.jpg',
      selite: 'Baltoron jäätikkö ja sen takana K2 keskellä, Broad Peak '
        + 'oikealla. Jäätikön pinta on lumen alla railoinen, ja reitti sen '
        + 'yli on merkittävä joka kevät uudelleen.',
      lahde: 'Abbas Shah1, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'The Wildlife of Karakoram.jpg',
      selite: 'Jakki jäätyneen puron yläpuolella Khunjerabin lähellä. Jakki '
        + 'on Karakoramin kuormajuhta: se kestää ohuen ilman korkeuksissa, '
        + 'joissa hevonen ei enää kulje.',
      lahde: 'Tanzeel Khan, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  hindukush: [
    {
      tiedosto: 'Tirich Mir and Falakser Peaks (Aerial).jpg',
      selite: 'Tirich Mir (vasemmalla takana), Falaksar ja Istor-o-Nal '
        + 'ilmasta. Tirich Mir on Hindukushin korkein huippu, 7 708 metriä, '
        + 'ja se näkyy selkeällä säällä Chitralin kaupunkiin asti.',
      lahde: 'Khankayani512, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Hindukush Mountains near Chitral.jpg',
      selite: 'Hindukush Bumburetin laaksosta Chitralin piirikunnassa. '
        + 'Laakso on yksi kolmesta Kalash-laaksosta, joissa asuu oma '
        + 'kansansa omine tapoineen.',
      lahde: 'Zeeshan-ul-hassan Usmani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'NO-NB BLDSA GM2b101n.jpg',
      selite: 'Näkymä Dorahin solasta alas Chitralin puolelle vuonna 1929. '
        + 'Sola on 4 400 metrissä, ja se oli pitkään yksi harvoista '
        + 'kulkukelpoisista teistä Afganistanin ja Brittiläisen Intian '
        + 'välillä.',
      lahde: 'Georg Morgenstierne, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Hindukush Mountains Range.jpg',
      selite: 'Lumen täyttämä kattilalaakso Hindukushissa. Rinteiden juovat '
        + 'ovat lumivyöryjen uria: ne pysyvät puuttomina, koska vyöry '
        + 'toistuu joka talvi samassa kohdassa.',
      lahde: 'Zeeshan-ul-hassan Usmani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Buildings in Panjshir Province, Afghanistan.JPG',
      selite: 'Taloryhmä kalliolla joen toisella puolella Panjshirin '
        + 'laaksossa Afganistanissa. Laakso on Hindukushin sisällä oleva '
        + 'käytävä, jonne pääsee käytännössä vain yhtä kapeaa solaa pitkin.',
      lahde: 'Teddy Wade, U.S. Army, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Kiss Of Peaks.jpg',
      selite: 'Kohta, jossa kolme suurta vuoristoa kohtaa Gilgit-'
        + 'Baltistanissa: oikealla Himalaja, keskellä Karakoram ja '
        + 'vasemmalla Hindukush.',
      lahde: 'Drroomanulhaq, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Branches of the Kunar River meet in Kunar Province.jpg',
      selite: 'Kunarjoen haarat yhtyvät helikopterista nähtynä. Joki tuo '
        + 'Hindukushin sulamisvedet alas Kabuljokeen ja edelleen Indukseen.',
      lahde: 'Teddy Wade, U.S. Army, Wikimedia Commons (PD)',
    },
  ],

  pamir: [
    {
      tiedosto: 'Lake Karakul.jpg',
      selite: 'Karakul-järvi kaakosta nähtynä Vuoristo-Badahšanissa. Järvi '
        + 'on syntynyt meteoriitin törmäyskuoppaan lähes 4 000 metrin '
        + 'korkeuteen, ja sen vesi on suolaista.',
      lahde: 'Benoît Vicart, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Ak-Baital Pass.jpg',
      selite: 'Ak-Baitalin sola (4 655 m) Pamirin valtatiellä. Se on koko '
        + 'entisen Neuvostoliiton korkein autotie, ja kyltti kertoo '
        + 'korkeuden metreinä.',
      lahde: 'Benoît Vicart, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Timeless..... (21534381075).jpg',
      selite: 'Aamuaurinko osuu rotkon seinään Pamirin solmun reunalla. '
        + 'Joki on leikannut uomansa suoraan kallioon, eikä laaksoon mahdu '
        + 'muuta kuin vesi.',
      lahde: 'lensnmatter, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Cheval Sarhad-e Broghil.jpg',
      selite: 'Hevonen laitumella Sarhad-e Broghilissa Wakhanin käytävässä '
        + 'Afganistanissa. Käytävä on kapea kaistale, joka erotti aikoinaan '
        + 'Venäjän ja Brittiläisen Intian toisistaan.',
      lahde: 'Benoît Vicart, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Jizew valley river and bridge.jpg',
      selite: 'Riippusilta joen yli Jizewin laaksossa Tadžikistanissa. '
        + 'Laaksoon ei tule tietä, joten kylään kuljetaan polkua pitkin ja '
        + 'tavarat kannetaan.',
      lahde: 'Vicartb, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Pamir001.JPG',
      selite: 'Pamirin lumihuiput vihreän ylängön takana. Ylätasanko on '
        + 'itsessään yli 3 500 metrissä, joten huiput näyttävät matalammilta '
        + 'kuin ovat.',
      lahde: 'BorisMir, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Panj river landscape.jpg',
      selite: 'Panjjoen laakso Pamirin valtatien varrella. Joki on '
        + 'Tadžikistanin ja Afganistanin raja, ja molemmilla rannoilla '
        + 'kulkee oma polkunsa.',
      lahde: 'Benoît Vicart, Wikimedia Commons (CC0)',
    },
  ],

  tienshan: [
    {
      tiedosto: 'Tian Shan in Kyrgyzstan 02.jpg',
      selite: 'Karjaa Tienšanin laitumilla Karakolin lähellä Kirgisiassa. '
        + 'Takana nousevat lumihuiput: laidun on syksyllä kuivaa ruskeaa, '
        + 'vaikka jää alkaa muutaman kilometrin päästä.',
      lahde: 'Bgag, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Bayanbulak grassland.jpg',
      selite: 'Bayanbulakin aro Tienšanin sisällä. Joki mutkittelee '
        + 'tasangolla niin loivasti, että se kääntyy silmukoille — vuoret '
        + 'pidättävät veden ylängölle sen sijaan että päästäisivät sen alas.',
      lahde: 'Srr, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Panorama of the Too Ashuu Pass, Kyrgyz Alatau, Kyrgyzstan 02.jpg',
      selite: 'Too-Ašuun sola Kirgisian Alataussa. Solan yli kulkee '
        + 'Biškekin ja Oshin välinen tie, ja lumi säilyy varjopuolella '
        + 'pitkälle kesään.',
      lahde: 'Vilya Shoni, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Kol-Tor flowers 22.jpg',
      selite: 'Kol-Torin järvi 2 733 metrin korkeudessa. Vesi saa värinsä '
        + 'jäätikön hiomasta kivijauheesta, joka jää veteen leijumaan.',
      lahde: 'Guliaim Aiylchy, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Glacier - panoramio - Michael Karavanov.jpg',
      selite: 'Jäätikkö Tienšanissa. Vuoristossa on tuhansia jäätiköitä, ja '
        + 'niiden sulamisvesi on Keski-Aasian kuivien tasankojen tärkein '
        + 'vesivarasto.',
      lahde: 'Michael Karavanov, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Работа гляциологов на леднике Абрамова (Тянь-Шань) - 1.jpg',
      selite: 'Jäätikkötutkijoita Abramovin jäätiköllä vuonna 1976. Tuuli on '
        + 'kasannut lumesta terävän harjanteen, jonka reunalla mies seisoo '
        + 'mittaamassa.',
      lahde: 'Aleksei Aleksandrovitš Vasiljev, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Teil des zentralen Tian-Schan.jpg',
      selite: 'Keskisen Tienšanin panoraama Gottfried Merzbacherin '
        + 'tutkimusretken julkaisusta. Piirros on tehty juuri niiltä '
        + 'vuosilta, jolloin eurooppalaiset kartoittivat vuoristoa '
        + 'ensimmäisen kerran.',
      lahde: 'Gottfried Merzbacher, Wikimedia Commons (PD)',
    },
  ],

  ural: [
    {
      tiedosto: 'Приполярный Урал, оз. Падежа-ты, вид с хребта Юаснырд.jpg',
      selite: 'Padeža-ty-järvi Napapiirin Uralilla Juasnyrdin harjanteelta '
        + 'nähtynä. Kesäkuussakin rinteillä on lumilaikkuja, ja järvien '
        + 'ympärillä on pelkkää tundraa.',
      lahde: 'RDA-Inta, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Отроги горы Тельпосиз на Северном Урале, национальный парк "Югыд ва".jpg',
      selite: 'Telposizin rinteet Pohjois-Uralilla Jugyd va -kansallispuistossa. '
        + 'Puisto on Euroopan laajin koskematon metsäalue.',
      lahde: 'Natalia Beshkareva, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Гора Большой Нургуш.jpg',
      selite: 'Suuri Nurgušin vuori Zjuratkulin kansallispuistossa Etelä-'
        + 'Uralilla. Laki on puurajan yläpuolella kivikkoa, vaikka vuori on '
        + 'vain runsaan kilometrin korkuinen.',
      lahde: 'Ljvty, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Нургуш со склонов Зюраткуля - panoramio.jpg',
      selite: 'Nurguš Zjuratkulin rinteiltä. Uralin selänteet ovat kuluneet '
        + 'matalaksi: vuoristo on yksi maailman vanhimmista, ja sen huiput '
        + 'ovat pyöreitä eivätkä teräviä.',
      lahde: 'Quarkgluonplasma, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Russia (28686712760).jpg',
      selite: 'Ilta Uralin selänteiden yllä. Vuorijono on Euroopan ja Aasian '
        + 'raja, ja sen yli päästään monesta kohdasta ilman solaa — juuri '
        + 'siksi se ei ole koskaan pysäyttänyt liikennettä kuten Alpit.',
      lahde: 'Pavel Marianov, Wikimedia Commons (CC BY 2.0)',
    },
  ],

  zagros: [
    {
      tiedosto: 'اورامان.jpg',
      selite: 'Hawramanin kylä Zagrosin rinteessä Iranin Kurdistanissa. '
        + 'Talot on porrastettu niin, että alemman katto on ylemmän piha — '
        + 'jyrkässä rinteessä ei ole muuta tasaista maata.',
      lahde: 'Salar.arkan, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'RAI 40-12 Sepid Dasht 1.jpg',
      selite: 'Paikallisjuna Zagrosin rotkossa Sepid Dashtin kohdalla. '
        + 'Iranin poikittaisrautatie kiipeää vuoriston yli sadoilla silloilla '
        + 'ja tunneleilla — se oli 1930-luvun suurimpia rakennushankkeita.',
      lahde: 'Kabelleger / David Gubler, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Oshtoran kuhj.jpg',
      selite: 'Oshtorankuhin jyrkät seinämät Lorestanin maakunnassa. '
        + 'Zagrosin poimuvuoret ovat syntyneet Arabian ja Euraasian '
        + 'mannerlaattojen törmäyksessä, ja kerrokset näkyvät rinteissä '
        + 'raitoina.',
      lahde: 'ninara, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Gezicht op de rivier de Daliki en bergen in Perzië Daliki rivier Shiraz-Buchire (titel op object), RP-F-F01048-T.jpg',
      selite: 'Dalakijoki ja Zagrosin vuoret 1880-luvulla otetussa vedoksessa. '
        + 'Kuva on matka-albumista Shirazin ja Bushehrin väliseltä '
        + 'karavaanitieltä — juuri sitä reittiä isoisän aikalaiset kulkivat '
        + 'Persian halki.',
      lahde: 'Rijksmuseum, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'ETH-BIB-Gebirge vor Chorrenabad-Persienflug 1924-1925-LBS MH02-02-0064-AL-FL.tif',
      selite: 'Lorestanin vuoristo neljän kilometrin korkeudesta vuonna 1925. '
        + 'Kuva on Walter Mittelholzerin Persian-lennolta, yhdeltä '
        + 'ensimmäisistä kerroista kun vuoristo nähtiin ylhäältä.',
      lahde: 'Walter Mittelholzer, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Butin&Chema.jpg',
      selite: 'Butinin ja Pendron huiput Misakin vuorelta nähtynä. Zagrosin '
        + 'pohjoisosassa lumi pysyy huipuilla pitkälle kevääseen, vaikka '
        + 'laaksoissa on jo lämmintä.',
      lahde: 'Khoshhat, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  kaukasus: [
    {
      tiedosto: 'Селение Ний.jpg',
      selite: 'Niyn kylän vainah-tornit Ingušiassa. Tornit olivat yhtä aikaa '
        + 'asuntoja ja linnoituksia, ja samaa rakennustapaa on kaikkialla '
        + 'Ingušiassa ja Tšetšeniassa. Taustan huiput ovat pilven peitossa.',
      lahde: 'Altushkin, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'View of Stepantsminda.jpg',
      selite: 'Stepantsminda Kvemi Mtan rinteeltä 2 170 metristä nähtynä. '
        + 'Vasemmalla kohoaa Khuro (4 071 m) ja takana Šanin valkoinen '
        + 'huippu (4 451 m).',
      lahde: 'WaltDisno, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Утро в горах Кавказа.jpg',
      selite: 'Aamu Kaukasuksen vuorilla: aurinko osuu ensin ylärinteiden '
        + 'niittyihin, kun laakson pohja on vielä varjossa.',
      lahde: 'Ilja Bunin, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Тебердинский заповедник. Вид на ледник и перевал Птыш.jpg',
      selite: 'Teberdan luonnonsuojelualue Luoteis-Kaukasuksella: jäätikkö ja '
        + 'Ptyšin sola syyskuussa, kun rinteiden lehtipuut ovat jo ruskassa.',
      lahde: 'Aleksandr Baidukov, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Mountains near Karadla.jpg',
      selite: 'Kevätaurinko Karadlan yllä: lumiset huiput nousevat metsäisen '
        + 'laakson yläpuolelle, ja kevään sulamisvedet ovat vielä matkalla '
        + 'alas.',
      lahde: 'M. S. Gorbunova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Qalayxudat, Guba.jpg',
      selite: 'Vuoristotie Qalayxudatin kylälle Quban seudulla '
        + 'Azerbaidžanissa. Talvella tie on ainoa yhteys kylään, ja se kulkee '
        + 'lumihuippujen juurella.',
      lahde: 'Judaideep, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Balakən District Nature - View of the Greater Caucasus Mountains.jpg',
      selite: 'Suur-Kaukasuksen vihreitä selänteitä Balakənin piirikunnassa '
        + 'Luoteis-Azerbaidžanissa. Metsäraja jää alas, ja ylin vyöhyke on '
        + 'pelkkää laidunniittyä.',
      lahde: 'Golden, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Balakən District Nature - River Cutting through the Greater Caucasus Mountains.jpg',
      selite: 'Vuoristopuro on leikannut uoman Suur-Kaukasuksen laaksoon '
        + 'Balakənin piirikunnassa. Kuva on kesäkuulta, ja laakson pohjalla on '
        + 'yhä lunta.',
      lahde: 'Golden, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Mt Turklitau. Border between Levashinsky and Gunibsky District.jpg',
      selite: 'Turklitau-vuoren itäsivu Dagestanissa. Eteläinen rinne on '
        + 'lähes kasviton, ja vuori jatkuu paljon pidemmälle kuin kuvaan '
        + 'mahtuu.',
      lahde: 'M. S. Gorbunova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Mountains near Karadla 2.jpg',
      selite: 'Vuoristotie kiertää rinnettä Karadlan lähellä. Vastapäätä '
        + 'nousee lumihuippu, ja tien ja huipun välissä on koko laakso.',
      lahde: 'M. S. Gorbunova, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],
};

/**
 * Kohteen kuvat maastonimen avaimella, tai null jos kohdetta ei ole
 * vielä kuratoitu.
 *
 * Null eikä tyhjä taulukko: kutsuja erottaa "ei kuratoitu" (näytä
 * Wikipedian oma kuvasto) ja "kuratoitu tyhjäksi" toisistaan.
 */
export function vuorikuvat(avain) {
  const kuvat = VUORIKUVAT[avain];
  return kuvat?.length ? kuvat : null;
}
