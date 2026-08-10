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

  alpit: [
    {
      tiedosto: 'Tofana di Rozes parete sud Dolomiti Ampezzo.jpg',
      selite: 'Tofana di Rozesin eteläseinä Ampezzon Dolomiiteilla. Dolomiitit '
        + 'ovat muinaisen korallimeren kalkkikiveä, joka on kohonnut '
        + 'pystyseiniksi kilometrien korkeuteen.',
      lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Tofana di Rozes 5.jpg',
      selite: 'Panoraama Averaulta: Tofana di Rozes, Cinque Torrin tornit ja '
        + 'Nuvolau. Cinque Torri oli ensimmäisessä maailmansodassa rintamalinja, '
        + 'ja kallioissa on yhä juoksuhautoja.',
      lahde: 'kallerna, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Lac de Roy 10.jpg',
      selite: 'Lac de Roy Haute-Savoiessa. Alppien pikkujärvet ovat jääkauden '
        + 'jättämiä kuoppia, joihin sulamisvesi jää seisomaan.',
      lahde: 'Krzysztof Golik, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Steinbock 14962940265.jpg',
      selite: 'Alppikauris Hohe Tauernin kansallispuistossa Itävallassa. Laji '
        + 'oli 1800-luvulla metsästetty lähes sukupuuttoon: jäljellä oli '
        + 'muutama sata eläintä, joista kaikki nykyiset polveutuvat.',
      lahde: 'Bernd Thaller, Wikimedia Commons (CC BY-SA 3.0 AT)',
    },
    {
      tiedosto: 'Lac de Montriond 06.jpg',
      selite: 'Montriond-järvi aamun tyynessä, taustalla Roc d\'Enfer. Järvi '
        + 'syntyi maanvyörymästä, joka tukki laakson.',
      lahde: 'Krzysztof Golik, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Cappella Passo Falzarego Sass Stria.jpg',
      selite: 'Kappeli Falzaregon solassa ja sen takana Sass de Strian huippu. '
        + 'Alppien soliin on rakennettu kappeleita niille, jotka lähtivät '
        + 'ylitykseen tietämättä, pääsevätkö perille.',
      lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Overview of Les Menuires and the Belleville valley.jpg',
      selite: 'Belleville-laakso ja Les Menuires\'n hiihtokaupunki talvella. '
        + 'Alpeilla vuoristo ei tyhjene talveksi vaan täyttyy — matkailu on '
        + 'kääntänyt vuodenajat päinvastoin kuin muualla vuoristossa.',
      lahde: 'DimiTalen, Wikimedia Commons (CC0)',
    },
    {
      tiedosto: 'Bad Hindelang panorama view from south.jpg',
      selite: 'Ostrachin laakso Bad Hindelangin kohdalla Baijerin Alpeilla. '
        + 'Laaksonpohja on niittyä ja kylää, rinteet metsää — jako on sama '
        + 'kaikkialla Alpeilla.',
      lahde: 'Jürgen Matern, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Averau Forcella Averau Croda Negra.jpg',
      selite: 'Croda Negra, Lagazuoi ja Falzaregon sola Averaun solasta '
        + 'nähtynä. Hiihtoladut kulkevat samoja reittejä, joita pitkin karja '
        + 'nousi kesälaitumille.',
      lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: "Pointe de Nyon & Pointe d'Angolon (12).jpg",
      selite: 'Pointe de Nyon (2 019 m) ja Pointe d\'Angolon (2 090 m) '
        + 'Morzinen kunnassa. Polku kiertää rinnettä vinosti, koska suoraan '
        + 'ylös ei pääse kuormaa kantaen.',
      lahde: 'Krzysztof Golik, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  karpaatit: [
    {
      tiedosto: 'Скелі Свидовець.jpg',
      selite: 'Blyznytsjan kalliot Svydovetsin ylängöllä Ukrainan '
        + 'Karpaateilla. Harjanteen laki on puutonta niittyä, jota on '
        + 'laidunnettu kesäisin vuosisatoja.',
      lahde: 'Nata Mostova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Полонина Пожижевська.jpg',
      selite: 'Pozjyzjevskan tunturiniitty Tšornohoran harjanteella. '
        + 'Karpaateilla tällaista laidunta kutsutaan polonynaksi, ja '
        + 'paimenet nousevat sinne karjan kanssa juhannuksen tienoilla.',
      lahde: 'Nata Mostova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Брескул.jpg',
      selite: 'Breskulin huippu Tšornohoran harjanteella talven jäljiltä. '
        + 'Karpaatit ovat matalammat kuin Alpit, mutta yhtenäinen kaari '
        + 'ulottuu Wienistä Romanian halki lähes 1 500 kilometriä.',
      lahde: 'Nata Mostova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Будинок в горах.jpg',
      selite: 'Yksinäinen talo vuoristoniityllä usvan noustessa metsästä. '
        + 'Karpaattien kylät ovat hajallaan rinteillä, koska laaksonpohja on '
        + 'kapea eikä sinne mahdu peltoa kaikille.',
      lahde: 'Anatolij Volkov, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  skandit: [
    {
      tiedosto: 'View from a ridge between Segla and Hesten, Senja, Norway, 2014 August.jpg',
      selite: 'Näkymä Seglan ja Hestenin väliseltä harjanteelta Senjassa. '
        + 'Vasemmalla on Øyfjorden, oikealla Mefjorden — Skandien luoteisreuna '
        + 'putoaa mereen jyrkkänä eikä jätä rannikkotasankoa lainkaan.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Isterdalen from above Stigfossen, Rauma, Møre og Romsdal, Norway, 2025 May.jpg',
      selite: 'Isterdalen ja Trollstigenin mutkat Stigfossenin yläpuolelta. '
        + 'Tie nousee laakson päästä yhdellätoista neulansilmämutkalla, ja se '
        + 'on auki vain kesäkuukaudet.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Geirangerfjord from Ørnesvingen, 2013 June.jpg',
      selite: 'Geirangervuono Ørnesvingenistä nähtynä. Vuono on jääkauden '
        + 'kaivertama laakso, jonka meri valtasi jään sulettua — pohja on '
        + 'paikoin syvemmällä kuin sen suulla.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'View to Romsdalen from Litlefjellet, 2013 June.jpg',
      selite: 'Romsdalen Litlefjelletin harjanteelta. Laakson seinämät ovat '
        + 'Euroopan korkeimpia pystysuoria kalliopintoja, ja pohjalla '
        + 'mutkittelee Rauma-joki.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'From Tennfjorden towards Raftsundet, Hinnøya, Norway, 2015 September - 4.jpg',
      selite: 'Tennfjorden ja sen takana Austvågøyan vuoret, joukossa '
        + 'Trolltindanin ryhmä. Vuonojen välissä liikutaan yhä veneellä, '
        + 'koska maitse kierto olisi kymmeniä kilometrejä.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Djupfjorden, 2010 09.jpg',
      selite: 'Djupfjorden Moskenesøyalla Lofooteilla syyskuussa. Tyyni vesi '
        + 'ja jyrkät huiput ovat Lofoottien tavallinen näkymä: saaret ovat '
        + 'käytännössä merestä nousevia vuoria.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Mountain massif of Fjølhaugen at Knutevika in Senja, Troms, Norway, 2015 September.jpg',
      selite: 'Fjølhaugenin vuorimassiivi Senjassa syksyn väreissä. Oikealla '
        + 'oleva lahti Knutevika kuuluu Mefjordeniin.',
      lahde: 'Simo Räsänen, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Torkilstöten Panorama Jule 2013.jpg',
      selite: 'Helags (vasemmalla) ja Sylarna Torkilstötenistä nähtynä '
        + 'Ruotsin puolella. Helagsilla on Skandien eteläisin jäätikkö, ja '
        + 'sen ympärillä on pelkkää tunturikangasta.',
      lahde: 'Arild Vågen, Wikimedia Commons (CC BY-SA 3.0)',
    },
  ],

  taurusvuoret: [
    {
      tiedosto: 'J22 319 D696, Taurusquerung.jpg',
      selite: 'Tie kiertää Taurusvuorten yli maaliskuisessa lumessa. Vuoristo '
        + 'erottaa Anatolian ylängön Välimeren rannikosta, ja sen solat ovat '
        + 'olleet armeijoiden ja kauppiaiden tie tuhansia vuosia.',
      lahde: 'Falk2, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Taurus mountains - Toros Dağları 06.jpg',
      selite: 'Taurusvuorten lumihuiput tummien kukkuloiden takana. Kevään '
        + 'sulamisvedet katoavat kalkkikiveen ja purkautuvat alempaa '
        + 'lähteinä — vuoristo on täynnä luolia.',
      lahde: 'Zeynel Cebeci, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Taurus mountains - Toros Dağları 07.jpg',
      selite: 'Laaja laakso Taurusvuorten juurella. Ylängöllä on laidunnettu '
        + 'kesäisin vuosisatoja: karja nousee lumen sulettua ja laskeutuu '
        + 'takaisin syksyllä.',
      lahde: 'Zeynel Cebeci, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Taurus mountains - Toros Dağları 04.jpg',
      selite: 'Lumiraja Taurusvuorilla huhtikuussa. Alarinteillä on jo '
        + 'kevät, kun harjanne on yhä valkoinen.',
      lahde: 'Zeynel Cebeci, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Taurus mountains - Toros Dağları 13.jpg',
      selite: 'Punamultainen rinne ja sen takana Taurusvuorten lumipeitteinen '
        + 'harja. Maa on täällä ohutta, ja kivi tulee esiin heti pintakerroksen '
        + 'alta.',
      lahde: 'Zeynel Cebeci, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  verhojansk: [
    {
      tiedosto: 'Verkhoyansk Range, Republic of Sakha (Yakutia), Russia - 2019.jpg',
      selite: 'Verhojanskin vuoristo helmikuussa ilmasta nähtynä. Aurinko käy '
        + 'talvella niin matalalla, että se värjää harjanteet punaisiksi '
        + 'keskellä päivää.',
      lahde: 'Ilja Varlamov, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Verkhoyansk Range, Republic of Sakha (Yakutia), Russia - 2-2019.jpg',
      selite: 'Kultainen valo Verhojanskin harjanteilla. Jonon takana on '
        + 'Ojmjakonin laakso, maailman kylmin asuttu paikka — pakkanen on '
        + 'käynyt alle 67 asteessa.',
      lahde: 'Ilja Varlamov, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Verkhoyansk Range, Republic of Sakha, Russia - 2019.jpg',
      selite: 'Verhojanskin jono jatkuu horisonttiin asti. Vuoristo kaartaa '
        + 'yli tuhat kilometriä Lenan suulta etelään eikä sen läpi kulje '
        + 'yhtään ympärivuotista tietä.',
      lahde: 'Ilja Varlamov, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Yakutia - DSC 6072.jpg',
      selite: 'Lumen peittämiä selänteitä Jakutiassa. Lunta on vähän — '
        + 'sisämaassa sataa niukasti — mutta se ei sula puoleen vuoteen.',
      lahde: 'Ilja Varlamov, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Yakutia - DSC 6186.jpg',
      selite: 'Iltavalo Verhojanskin harjanteilla. Rinteet ovat puuttomia: '
        + 'ikirouta ei päästä juuria syvälle, ja metsä loppuu jo matalalla.',
      lahde: 'Ilja Varlamov, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Yakutia - DSC 6035.jpg',
      selite: 'Yksinäinen kukkula pakkasusvassa. Kylmä ilma valuu laaksoihin '
        + 'ja jää sinne, joten laaksonpohja on kylmempi kuin rinteen laki.',
      lahde: 'Ilja Varlamov, Wikimedia Commons (CC BY-SA 3.0)',
    },
  ],

  'lansi-ghatit': [
    {
      tiedosto: 'A beautiful scenic view of the western ghats during golden hour.jpg',
      selite: 'Länsi-Ghatit sinisinä kerroksina aamu-usvan yllä. Vuoristo '
        + 'pysäyttää lounaismonsuunin, ja sen länsirinteille sataa moninkertaisesti '
        + 'enemmän kuin sisämaahan.',
      lahde: 'Sreerag Santhosh, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Landscapes of Western Ghats from Mullayyanagiri Betta.jpg',
      selite: 'Metsäisiä kukkuloita Mullayanagirin huipulta. Länsi-Ghatit on '
        + 'yksi maailman kahdeksasta kuumimmasta monimuotoisuuskeskuksesta: '
        + 'sen lajeista suuri osa ei elä missään muualla.',
      lahde: 'iMahesh, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Jog Falls Karnataka India.jpg',
      selite: 'Jogin putoukset Karnatakassa. Sharavathi-joki putoaa Ghattien '
        + 'reunalta neljänä haarana yli kahdensadan metrin syvyyteen — '
        + 'täysillään vain monsuunin aikaan.',
      lahde: 'Naveen R Gowda, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Bhuibawada Ghat Hill.jpg',
      selite: 'Bhuibawadan ghattikukkula Maharashtrassa. Ghatit ovat '
        + 'jyrkkäreunainen porras: ylhäällä on tasankoa, alhaalla '
        + 'rannikkokaistale, ja väliin jää lähes pystysuora rinne.',
      lahde: 'Contributers2020, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Beauty of western ghats.jpg',
      selite: 'Vihreä ylätasanko Länsi-Ghateilla sadekauden jälkeen. Ruoho '
        + 'kasvaa kalliopinnan päälle ohuen maakerroksen varassa.',
      lahde: 'Sundaram Perumal, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  'japanin-alpit': [
    {
      tiedosto: 'Hida Mountains Panorama (53622323610).jpg',
      selite: 'Hidan vuoret eli Pohjoiset Japanin Alpit talvella. Etualan '
        + 'kuuset ovat huurteessa, ja harjanteen takana on yli kolmen '
        + 'kilometrin korkuisia huippuja.',
      lahde: 'Raita Futo, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Lake Kurobe01s4592.jpg',
      selite: 'Kurobejärvi lumiseinien keskellä. Järvi on Japanin korkeimman '
        + 'padon takana, ja sen ympäri kulkeva vuoristoreitti aukeaa vasta '
        + 'kun lumi on aurattu käytäviksi.',
      lahde: '663highland, Wikimedia Commons (CC BY 2.5)',
    },
    {
      tiedosto: 'Morning in the Japanese Alps (51832001344).jpg',
      selite: 'Aamu Japanin Alpeilla: harjanne nousee sumumeren yläpuolelle. '
        + 'Nimen antoivat 1800-luvun lopulla brittiläiset insinöörit, joiden '
        + 'mielestä vuoret muistuttivat Alppeja.',
      lahde: 'Raita Futo, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Autumn in Japan Alps (52489399522).jpg',
      selite: 'Syksyn punaista pensaikkoa Japanin Alpeilla. Ruska nousee '
        + 'vuorilla ensin ja laskeutuu sitten viikko viikolta alemmas.',
      lahde: 'Raita Futo, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Morning in the Japanese Alps (51831767043).jpg',
      selite: 'Terävä harjanne aamuvalossa. Japanin Alpit ovat nuoret ja '
        + 'jyrkät, ja jääkauden jäätiköt ovat kaivertaneet niihin '
        + 'kattilalaaksoja.',
      lahde: 'Raita Futo, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Autumn in Japan alps (52460317999).jpg',
      selite: 'Syksyinen tunturikangas pilven reunalla. Puuraja jää Japanin '
        + 'Alpeilla noin 2 500 metriin, ja sen yläpuolella kasvaa vain '
        + 'matalaa varpua.',
      lahde: 'Raita Futo, Wikimedia Commons (CC BY 2.0)',
    },
    {
      tiedosto: 'Koumi-line Series110.jpg',
      selite: 'Koumin radan juna vuoristoniityn laidalla. Rata on Japanin '
        + 'korkeimmalle nouseva tavallinen rautatie, ja se kiertää Alppien '
        + 'itäpuolta.',
      lahde: 'MaedaAkihiko, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  'tiibetin-ylatasanko': [
    {
      tiedosto: 'Tibet, panorámicas (1999) 05.jpg',
      selite: 'Tiibetin ylätasanko Lalungin solassa. Teltta ja sen ympärillä '
        + 'laiduntavat jakit ovat koko näkymän ainoa merkki ihmisestä — '
        + 'ylätasanko on lähes puuton ja lähes tyhjä.',
      lahde: 'LBM1948, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Tibet, panorámicas (1999) 03.jpg',
      selite: 'Yamdrokjärvi, yksi Tiibetin kolmesta pyhästä järvestä. Vesi on '
        + 'suolaista eikä laske mihinkään jokeen: ylätasangolla sade jää '
        + 'altaisiin ja haihtuu.',
      lahde: 'LBM1948, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Tibet, panorámicas (1999) 04.jpg',
      selite: 'Nyenchen Kangsan jäätikkö Karon solasta nähtynä. Ylätasangon '
        + 'jäätiköt ruokkivat Aasian suuria jokia — Induksen, Mekongin ja '
        + 'Jangtsen latvat ovat kaikki täällä.',
      lahde: 'LBM1948, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Landscape of Tibet1.jpg',
      selite: 'Vihreä laakso ylätasangolla kesällä. Ruoho kasvaa vain '
        + 'muutaman viikon, ja koko paimentolaisten vuosi on rakennettu sen '
        + 'ympärille.',
      lahde: 'Antoine Taveneaux, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Nagarze, Shannan, Tibet, China - panoramio (10).jpg',
      selite: 'Kiviröykkiö järven rannassa Nagarzessa. Matkalainen lisää '
        + 'kiven kulkiessaan ohi — tapa on ylätasangolla vanha ja yhä '
        + 'elävä.',
      lahde: 'Chen Zhi, Wikimedia Commons (CC BY 3.0)',
    },
    {
      tiedosto: 'Baxoi, Qamdo, Tibet, China - panoramio (1).jpg',
      selite: 'Serpentiinitie kiemurtelee laaksoon Baxoissa Itä-Tiibetissä. '
        + 'Ylätasangon reunalla korkeusero laaksonpohjaan on kilometrejä, '
        + 'joten tie ei voi laskeutua suoraan.',
      lahde: 'christiali, Wikimedia Commons (CC BY 3.0)',
    },
  ],

  kunlun: [
    {
      tiedosto: '格尔木 青藏铁路与玉珠峰雪山 01.jpg',
      selite: 'Kameleita Yuzhu-huipun edustalla Golmudin lähellä. Kunlun on '
        + 'Taklamakanin autiomaan eteläreuna, ja Silkkitien eteläinen haara '
        + 'kulki juuri näiden vuorten juurta.',
      lahde: 'Liuxingy, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: '格尔木 青藏铁路与玉珠峰雪山 02.jpg',
      selite: 'Yuzhu-huipun jäätiköt ja niiden alla kulkeva Qinghai–Tiibet-'
        + 'rautatie. Rata nousee yli 5 000 metriin, ja se on rakennettu '
        + 'ikiroudan päälle.',
      lahde: 'Liuxingy, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: '格尔木 在小干沟桥之南的青藏公路上望向两侧昆仑山 02.jpg',
      selite: 'Kunlunin kuluneet rinteet Qinghai–Tiibet-tien varrella. Sade '
        + 'on täällä harvinaista, joten rinteitä muokkaa tuuli ja lumen '
        + 'sulaminen — ei virtaava vesi.',
      lahde: 'Liuxingy, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: '治多 在青藏公路沿线可可西里遥望昆仑山雪山 07.jpg',
      selite: 'Kunlunin lumihuiput Hoh Xilin autiotasangon takaa. Väli on '
        + 'kymmeniä kilometrejä tyhjää ylänköä, ja siksi vuoret näyttävät '
        + 'matalilta.',
      lahde: 'Liuxingy, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: '格尔木 在青藏公路纳赤台至五十三道班间望向昆仑山.jpg',
      selite: 'Kunlun Qinghai–Tiibet-tieltä Nachitain ja 53. tienhoitoaseman '
        + 'väliltä. Tie nousee vuoriston yli Golmudista Lhasaan.',
      lahde: 'Liuxingy, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  elburz: [
    {
      tiedosto: 'CH-NB - Persien, Elburs-Gebirge (Elburz)- Landschaft - Annemarie Schwarzenbach - SLA-Schwarzenbach-A-5-06-150.jpg',
      selite: 'Lumen peittämä Damavand 1930-luvulla. Iranin korkein huippu '
        + '(5 610 m) on tulivuori, ja se näkyy selkeällä säällä Teheraniin '
        + 'asti.',
      lahde: 'Annemarie Schwarzenbach, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'CH-NB - Persien, Elburs-Gebirge (Elburz)- Strassenszene - Annemarie Schwarzenbach - SLA-Schwarzenbach-A-5-04-041.jpg',
      selite: 'Kuormatut aasit ja niiden ajaja vuoristotiellä 1930-luvun '
        + 'alussa, taustalla auto. Kuva on juuri siitä hetkestä, kun '
        + 'moottoriajoneuvot tulivat karavaanien rinnalle.',
      lahde: 'Annemarie Schwarzenbach, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'CH-NB - Persien, Elburs-Gebirge (Elburz)- Reiten - Annemarie Schwarzenbach - SLA-Schwarzenbach-A-5-06-193.jpg',
      selite: 'Ratsastajia Elburzin rinteillä vuonna 1935. Ennen teitä '
        + 'vuoriston yli kuljettiin hevosella, ja matka Kaspianmeren '
        + 'rannalta Teheraniin kesti päiviä.',
      lahde: 'Annemarie Schwarzenbach, Wikimedia Commons (PD)',
    },
    {
      tiedosto: 'Baladeh View - panoramio.jpg',
      selite: 'Elburzin lumiharjanne Baladehin yllä. Vuoristo on kapea muuri '
        + 'Kaspianmeren ja Iranin ylängön välissä, ja se erottaa kaksi '
        + 'täysin erilaista ilmastoa.',
      lahde: 'Alireza Javaheri, Wikimedia Commons (CC BY 3.0)',
    },
    {
      tiedosto: 'Mazandaran - Baladeh View from Zarde Kamar - panoramio.jpg',
      selite: 'Baladehin kylä laakson pohjalla Zarde Kamarilta nähtynä. '
        + 'Asutus on siellä, missä laakso levenee sen verran että peltoja '
        + 'mahtuu.',
      lahde: 'Alireza Javaheri, Wikimedia Commons (CC BY 3.0)',
    },
    {
      tiedosto: 'Mazandaran - Royan - Galandroud - panoramio.jpg',
      selite: 'Syksyn värit Hyrkanian metsässä Elburzin pohjoisrinteellä. '
        + 'Kaspianmeren puoli saa sateet, ja siksi täällä kasvaa lehtimetsää '
        + 'siinä missä etelärinne on aavikkoa.',
      lahde: 'Alireza Javaheri, Wikimedia Commons (CC BY 3.0)',
    },
    {
      tiedosto: 'Baladeh - Royan road - Bimak - panoramio.jpg',
      selite: 'Baladehin ja Royanin välinen tie kiertää laaksoa Bimakin '
        + 'kohdalla. Tämä on yksi harvoista teistä, jotka ylittävät Elburzin '
        + 'Kaspianmeren rannalle.',
      lahde: 'Alireza Javaheri, Wikimedia Commons (CC BY 3.0)',
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
