// Matkakirjan omat artikkelit Etelä-Amerikan kaupungeista.
//
// Tiedosto perustettiin 23.8.2026 Rio de Janeiron kaupunkilehden
// yhteydessä (E-Amerikan laudan pilottikaupunki ja laudan
// lähtökaupunki). Malli on northamerica-artikkelit.js, ja rakenne on
// täsmälleen sama:
//
//   intro   — lehden ETUSIVUN LEIPÄTEKSTI (Raamattu, "TEKSTIEN
//             PAINOPISTE" 20.8.2026): 7–10 virkkeen johdatus siihen,
//             millainen kaupunki on ja mikä sen merkitys ja historia
//             ovat. Noin 700–1100 merkkiä, 2–3 kappaletta '\n\n'-rajalla
//             ja 1–3 maltillista **lihavointia**. Renderöijä tekee
//             kappaleet ja boldit — ei HTML:ää tänne.
//   teksti  — kolme kappaletta, yhteensä 600–1100 merkkiä. Ensimmäinen
//             kertoo missä ollaan, toinen mitä täällä on tapahtunut,
//             kolmas millaista täällä on nyt. Tämä on Lue lisää
//             -dialogin teksti.
//
// Avaimena on wiki-otsikko, sama jolla cachedSummary hakee — Rion
// kohdalla js/packs/southamerica.js antaa sekä wiki-nimeksi että
// näyttönimeksi 'Rio de Janeiro', joten avain on 'Rio de Janeiro'.
// Taulu yhdistetään muiden lautojen tauluihin js/sisaltotaulut.js:ssä.
//
// Ei ylisanoja eikä huutomerkkejä: nuoren herran innostus kuuluu
// saapumistekstissä, ja tämä on se rauhallinen ääni, joka kertoo
// taustan.
//
// RIO DE JANEIRO (23.8.2026): jokainen väite tulee samasta erästä kuin
// lehden tekstit (js/packs/kulttuuri-kategoriat.js, avain rio), ja ne
// on tarkistettu en-Wikipedian raakateksteistä 23.8.2026 — uusia
// lähdehakuja ei tarvittu. Sisältölinjaus on spec-mantereet.md:n
// E-Amerikka-osio: siirtomaahistoria ja orjuus kerrotaan tapahtumina
// neutraalisti ja kaunistelematta, ei nykypolitiikkaa eikä
// nykyrikollisuutta. Vuoden 1873 kulma on introssa mukana, koska se on
// koko lehden kantava aihe: isoisän vierailun aikaan Rio oli
// keisarikunnan pääkaupunki ja orjuus oli yhä laillista.
export const SOUTHAMERICA_ARTIKKELIT = {
  'Rio de Janeiro': {
    intro: 'Rio de Janeiro on São Paulon jälkeen Brasilian toiseksi suurin '
      + 'kaupunki, ja se on ahtautunut kapeille rannoille Guanabaran lahden '
      + 'suulla, jyrkkien graniittikukkuloiden ja meren väliin. Nimi '
      + 'tarkoittaa tammikuun jokea: portugalilaiset purjehtivat lahdelle '
      + '1. tammikuuta 1502 ja luulivat sitä joen suuksi.'
      + '\n\n'
      + 'Estácio de Sá perusti kaupungin 1. maaliskuuta 1565, ja siitä '
      + 'tuli 1763 siirtomaan pääkaupunki. **Vuonna 1808 koko Portugalin '
      + 'hovi pakeni Napoleonia Rioon — ainoa kerta uuden ajan '
      + 'historiassa, kun siirtomaita hallinneen maan pääkaupunki muutti '
      + 'omaan siirtomaahansa.** Itsenäistymisen 1822 jälkeen kaupunki '
      + 'jatkoi keisarikunnan pääkaupunkina, ja pääkaupunkina se pysyi '
      + 'vuoteen 1960.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 Rio oli keisari Pedro II:n pääkaupunki '
      + 'ja kahvitalouden sydän. **Orjuus oli yhä laillista:** vuoden 1871 '
      + 'vapaan kohdun laki oli vapauttanut orjuutettujen naisten uudet '
      + 'lapset, mutta yli miljoona ihmistä oli edelleen orjia, ja '
      + 'Brasilia lakkautti orjuuden viimeisenä maana Amerikassa vasta '
      + '1888. Corcovadon huipulla ei ollut patsasta eikä Sokerileivälle '
      + 'noussut köysirataa.',
    teksti: 'Rio de Janeiro on Brasilian kaakkoisrannikolla Guanabaran '
      + 'lahden suulla. Kaupunki on rakennettu kapeille rannoille '
      + 'graniittikukkuloiden väliin, ja sen keskellä kasvaa Tijucan '
      + 'sademetsä — maailman toiseksi suurin kaupungin ympäröimä metsä, '
      + 'joka on kokonaan uudelleen istutettua.'
      + '\n\n'
      + 'Kaupunki perustettiin 1565 puolustamaan lahtea ranskalaisilta. '
      + 'Sen satama oli 1800-luvun alussa koko Amerikan vilkkain '
      + 'orjakauppapaikka: Valongon laiturille nousi 1811–1831 arviolta '
      + 'puolesta miljoonasta miljoonaan orjuutettua afrikkalaista. Rio '
      + 'oli Brasilian pääkaupunki 1763–1960, ensin siirtomaan, sitten '
      + 'Portugalin valtakunnan, keisarikunnan ja lopulta tasavallan.'
      + '\n\n'
      + 'Nykyään kaupungissa asuu kuusi miljoonaa ihmistä ja sen '
      + 'metropolialueella kolmetoista miljoonaa. Vuorten ja meren väliin '
      + 'jäävä kaupunkimaisema on ollut Unescon maailmanperintökohde '
      + '2012 lähtien, ja Valongon laituri omana kohteenaan 2017 lähtien.',
  },
  /*
   * Buenos Airesin lohko liitettiin fragmentista (docs/mantereet-
   * tyoaineisto/buenosaires-intro-fragmentti.js) 23.8.2026 — kaksi
   * kirjoittajaa tyoskenteli rinnakkain ja Rion agentti loi tiedoston.
   */
  'Buenos Aires': {
    intro: 'Buenos Aires on Argentiinan pääkaupunki ja Etelä-Amerikan '
      + 'suurimpia satamakaupunkeja. Se on rakennettu tasaiselle pampalle '
      + 'Río de la Platan lounaisrannalle, siihen kohtaan, jossa joki '
      + 'avautuu maailman leveimmäksi jokisuuksi — vastarantaa Uruguayssa '
      + 'ei näe. Nimi tarkoittaa hyviä tuulia ja tulee merenkulkijoiden '
      + 'suojeluspyhimykseltä.'
      + '\n\n'
      + 'Kaupunki perustettiin kahdesti. Pedro de Mendoza pystytti '
      + 'siirtokunnan 2. helmikuuta 1536, mutta se hylättiin 1540-luvun '
      + 'alussa, ja **pysyvän kaupungin perusti Juan de Garay 11. '
      + 'kesäkuuta 1580**. Siirtomaa-ajan pikkukaupungista tuli 1800-luvulla '
      + 'eurooppalaisen siirtolaisuuden porttikaupunki: vuoden 1869 '
      + 'väestönlaskennassa puolet asukkaista oli äskettäin maahan '
      + 'tulleita siirtolaisia.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 kaupunki toipui yhä kahden vuoden '
      + 'takaisesta keltakuume-epidemiasta. Presidentti Domingo Faustino '
      + 'Sarmiento tilasi juuri sinä vuonna Plaza de Mayon laidalle uuden '
      + 'postitalon ja selvisi elokuussa murhayrityksestä. **Tangoa isoisä '
      + 'ei voinut kuulla: tanssi syntyi vasta 1880-luvulla** — '
      + 'satamakortteleissa soivat vasta sen ainekset.',
    teksti: 'Buenos Aires on Argentiinan pääkaupunki Río de la Platan '
      + 'lounaisrannalla. Maasto on tasaista pampaa ilman luonnollisia '
      + 'rajoja, ja osa nykyisestä rannasta — satama, Puerto Madero ja '
      + 'uudet puistot — on täytemaata. Kaupunki jakautuu nykyään 48 '
      + 'viralliseen barrioon eli kaupunginosaan.'
      + '\n\n'
      + 'Espanjalaiset perustivat paikan kahdesti, 1536 ja pysyvästi 1580. '
      + 'Karjatuotteet — villa, vuodat ja nahka — olivat maan pääasiallinen '
      + 'tulonlähde vielä 1870-luvulla, ja ne varastoitiin satamakortteleiden '
      + 'aitoissa ennen laivausta Eurooppaan. Vuoden 1871 keltakuume-epidemia '
      + 'muutti kaupungin kartan: varakkaat muuttivat San Telmosta '
      + 'pohjoisemmas, kaupunki perusti La Chacaritan hautausmaan ja '
      + 'rakensi ensimmäiset vesijohdot ja viemärit.'
      + '\n\n'
      + 'Asukkaita kutsutaan porteñoiksi, satamalaisiksi, ja heidän '
      + 'määränsä kolminkertaistui vuosien 1887 ja 1915 välillä '
      + 'puolesta miljoonasta puoleentoista miljoonaan. Tango, joka '
      + 'syntyi vasta isoisän vierailun jälkeen, on nyt kaupungin '
      + 'tunnetuin vientituote.',
  },
  /* Brasilian maaintro liitetty fragmentista 23.8.2026 (ks. docs/
   * mantereet-tyoaineisto/brasilia-intro-fragmentti.js). */
  Brasilia: {
    intro: 'Vuonna 1873 Brasilia on Amerikan mantereen ainoa keisarikunta '
      + '— monarkia keskellä tasavaltoja, ja sitä hallitsee tiedettä ja '
      + 'valokuvausta harrastava Pedro II. Maa on juuri selvinnyt '
      + 'mantereen verisimmästä sodasta, ja orjuuteen on tullut '
      + 'ensimmäinen särö: orjuutetuille äideille syntyvät lapset on '
      + 'julistettu vapaiksi, vaikka täysi lakkautus tulee vasta '
      + 'viidentoista vuoden päästä. Kahvi on tehnyt maasta maailman '
      + 'suurimman tuottajan ja Rio de Janeirosta vauraan satamakaupungin, '
      + 'jonka kaduilla soi juuri syntynyt musiikkilaji choro. '
      + 'Pohjoisessa aukeaa Amazon, maailman suurin sademetsä, jota '
      + 'alkuperäiskansat ovat muokanneet vuosituhansien ajan ja jonka '
      + 'kumipuut ovat vasta houkuttelemassa maailman huomiota. Etelässä '
      + 'gaúchot ratsastavat pampan aroilla karjan perässä ja paahtavat '
      + 'lihansa hiilloksen yllä. Kaikki tämä mahtuu maahan, joka on '
      + 'ollut itsenäinen vasta 51 vuotta ja jonka pohjoiskärjen ja '
      + 'eteläkärjen välillä on lähes neljäkymmentä leveysastetta.',
  },
  /* Argentiinan maaintro liitetty fragmentista 23.8.2026. */
  Argentiina: {
    intro: 'Vuonna 1873 Argentiina on nuori tasavalta täydessä '
      + 'murroksessa: presidentti Domingo Faustino Sarmiento rakentaa '
      + 'satoja kouluja samalla kun loputon pampa muuttuu gauchojen '
      + 'maasta karjatilojen ja uudisasukkaiden Argentiinaksi. Verinen '
      + 'sota Paraguayta vastaan on juuri päättynyt, ja laivalastillinen '
      + 'toisensa jälkeen tuo Italiasta ja Espanjasta uusia asukkaita '
      + 'maahan, joka on vielä lähes tyhjä. Kaukana etelässä leviää '
      + 'Patagonian tuulinen aromaisto, ja pohjoisessa viidakko kätkee '
      + 'Iguazún putoukset, joita tuskin kukaan eurooppalainen on vielä '
      + 'nähnyt. Buenos Airesin kaduilla soi afrikkalaisperäinen '
      + 'candombe ja pampalla milonga — ainekset, joista syntyy '
      + 'parikymmentä vuotta myöhemmin tango. **Isoisän matkapäiväkirja '
      + 'saapuu Argentiinaan juuri sillä hetkellä, jolloin gauchon '
      + 'aikakausi on päättymässä ja uusi kansakunta vasta '
      + 'syntymässä.**',
    artikkeli: 'Argentiina on Etelä-Amerikan eteläkärjen suuri maa, '
      + 'joka venyy pohjoisesta etelään lähes 3 700 kilometriä. Sen '
      + 'länsirajaa reunustavat Andit, joiden korkein huippu Aconcagua '
      + 'on koko Amerikan korkein vuori. Idässä ja keskellä maata '
      + 'aukeaa pampa, yli miljoonan neliökilometrin ruohotasanko, ja '
      + 'etelässä Patagonian tuulinen aro.'
      + '\n\n== Historiaa lyhyesti ==\n'
      + 'Ennen espanjalaisia alueella asui kymmeniä kansoja: pohjoisessa '
      + 'guaranít, etelässä mapuchet ja tehuelchet. Espanjan '
      + 'siirtomaavalta ei koskaan ulottunut koko maahan, ja pampan ja '
      + 'Patagonian raja pysyi auki pitkälle 1800-luvulle. Argentiina '
      + 'julistautui itsenäiseksi 1816, ja vuoden 1853 perustuslaki '
      + 'avasi ovet eurooppalaiselle siirtolaisuudelle. Vuosisadan '
      + 'lopulla maahan saapui miljoonia italialaisia ja espanjalaisia, '
      + 'jotka muuttivat kielen, ruoan ja kaupunkien ilmeen.'
      + '\n\n== Elämää ==\n'
      + 'Argentiinalainen arki on mate-kupin ympärillä: kalebassi ja '
      + 'bombilla-pilli kiertävät seurueessa kädestä käteen. '
      + 'Viikonloppuisin sytytetään asado, ja pöytään kannetaan '
      + 'empanadoja, joista jokaisella maakunnalla on oma versionsa. '
      + 'Buenos Airesissa soi tango, luoteessa Saltan seudulla Andien '
      + 'folklore, ja Mendozan viinitarhoissa kasvaa malbec — rypäle, '
      + 'joka tuotiin Ranskasta vuonna 1853 ja josta tuli maan '
      + 'tunnusmerkki.',
  },
  /*
   * SÃO PAULO (23.8.2026). Väitteet ovat samasta erästä kuin lehden
   * tekstit (js/packs/kulttuuri-kategoriat.js, avain saopaulo), ja ne
   * on tarkistettu en-Wikipedian raakateksteistä samana päivänä.
   * Avain on wiki-otsikko 'São Paulo', sama jonka js/packs/
   * southamerica.js antaa kaupungille sekä wiki- että näyttönimeksi.
   * Vuoden 1873 kulma on introssa mukana, koska koko lehti seisoo sen
   * varassa: isoisän matkavuonna kaupungissa oli reilut 31 000
   * asukasta ja rautatie oli ollut käytössä kuusi vuotta.
   */
  'São Paulo': {
    intro: 'São Paulo on Brasilian ja koko Etelä-Amerikan suurin kaupunki, '
      + 'ja se seisoo 760 metrin korkeudessa Piratiningan ylängöllä. Meren '
      + 'ja ylängön välissä on Serra do Marin lähes 800 metrin '
      + 'rannikkojyrkänne. Nimi tulee jesuiittojen '
      + 'koulusta, jonka kaksitoista pappia perusti kukkulalle kahden joen '
      + 'väliin 25. tammikuuta 1554 — apostoli Paavalin kääntymyksen '
      + 'juhlapäivänä.'
      + '\n\n'
      + 'Kaksi ensimmäistä vuosisataa São Paulo oli köyhä sisämaakylä, '
      + 'josta lähti retkikuntia kullan ja orjuutettavien perään. '
      + '**Käänteen teki rautatie: brittiläinen São Paulo Railway avasi '
      + '1867 radan ylängöltä Santosin satamaan, ja ylängön kahvi pääsi '
      + 'maailmanmarkkinoille.** Puolessa vuosisadassa kaupunki kasvoi '
      + 'kolmestakymmenestätuhannesta yli kahteensataantuhanteen '
      + 'asukkaaseen, ja kasvun maksoivat kahvirahat ja Euroopasta, '
      + 'Lähi-idästä ja Japanista tulleet siirtolaiset.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 mitään tästä ei vielä näkynyt. '
      + '**Kaupungissa oli reilut 31 000 asukasta, torilla seisoi 1760-luvun '
      + 'barokkikirkko ja Luzin asema oli matala yksikerroksinen talo.** '
      + 'Avenida Paulistaa ei ollut, eikä yhtään pilvenpiirtäjää.',
    teksti: 'São Paulo on Kaakkois-Brasiliassa Piratiningan ylängöllä, ja '
      + 'sen halki kulkevat Tietê- ja Pinheiros-joet. Etelänkääntöpiiri '
      + 'menee kaupungin pohjoispuolelta, mutta korkeus tekee ilmastosta '
      + 'leudomman kuin leveysasteelta voisi odottaa: kesäpäivät ovat '
      + 'keskimäärin 28 ja talvipäivät 22 asteen tienoilla.'
      + '\n\n'
      + 'Jesuiitat perustivat kylän 1554, ja kaupunkioikeudet se sai vasta '
      + '1711. Rautatie Santosiin avattiin 1867, ja sen jälkeen kahvin '
      + 'vientitulot rakensivat kaupungin uudestaan: väkiluku nousi vuoden '
      + '1872 laskennan 31 385:stä 239 820:een vuosisadan vaihteessa ja '
      + 'ylitti miljoonan 1928. Ensimmäinen pilvenpiirtäjä Martinelli '
      + 'valmistui 1929.'
      + '\n\n'
      + 'Nykyään kaupungissa asuu lähes 12 miljoonaa ja metropolialueella '
      + '21,5 miljoonaa ihmistä. Kaupunkilaisia kutsutaan paulistanoiksi, '
      + 'ja heissä on maailman suurimmat italialais-, arabi- ja '
      + 'japanilaisyhteisöt kotimaidensa ulkopuolella — Bixigan, Bom '
      + 'Retiron ja Liberdaden kaupunginosat ovat yhä niiden osoite.',
  },
  /*
   * LIMA (23.8.2026). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain lima): jokainen väite on
   * luettu en-Wikipedian raakateksteistä 23.8.2026, ja lähdeaineistona
   * ovat docs/mantereet-tyoaineisto/faktapohja-lima.md ja sen
   * riippumaton tarkistus (tarkistus-lima.md), joka voittaa
   * ristiriidassa. Väkiluku on Lima-artikkelin infoboxin
   * population_metro (11 445 928, vuoden 2025 väestönlasku).
   * Sisältölinjaus on spec-mantereet.md:n E-Amerikka-osio:
   * siirtomaa-aika kerrotaan neutraalina historiana, esi-inkakulttuurit
   * omana korkeakulttuurinaan ja kiinalaisten sopimustyöläisten tulo
   * suoraan mutta hillitysti. Vuoden 1873 kulma on introssa mukana,
   * koska se kantaa koko lehden: guanotalous, purettu kaupunginmuuri ja
   * käynnissä ollut Andien radan työmaa osuvat kaikki isoisän
   * matkavuoteen.
   */
  Lima: {
  intro: 'Lima on Perun pääkaupunki ja yksi Etelä-Amerikan suurimmista '
    + 'kaupungeista. Se on rakennettu Tyynenmeren rannalle aavikkoon, '
    + 'Rímac-joen laaksoon, ja se on Karachin ja Kairon jälkeen maailman '
    + 'kolmanneksi suurin aavikkokaupunki. **Sadetta täällä ei käytännössä '
    + 'tule:** kylmä Humboldtin merivirta jäähdyttää ilman niin, että '
    + 'kosteus jää harmaaksi sumuksi, garúaksi, eikä tiivisty sateeksi.'
    + '\n\n'
    + 'Laaksossa oli kaupunkeja ja pyhäkköjä kauan ennen espanjalaisia: '
    + 'Ichman herruus, Liman kulttuuri ja Pachacamacin '
    + 'pyhiinvaelluskohde. Francisco Pizarro mittasi ruutukaavan tammikuussa '
    + '1535 ja antoi kaupungille nimen Ciudad de los Reyes. Vuoden 1746 '
    + 'maanjäristys kaatoi lähes koko kaupungin, ja nykyinen vanhakaupunki '
    + 'parvekkeineen on suureksi osaksi sen jälkeistä jälleenrakennusta.'
    + '\n\n'
    + 'Isoisän matkavuonna 1873 Lima oli keskellä kolmea murrosta. '
    + '**Rannikkosaarten guano oli tehnyt valtiosta rikkaan**, sen rahoilla '
    + 'oli rakennettu keskustori, sairaalat ja vankila, ja kaupungin '
    + 'muuri oli purettu vuotta aiemmin. Andien rautatietä '
    + 'louhittiin samaan aikaan Rímacin rotkossa, ja työmailla oli '
    + 'kiinalaisia sopimustyöläisiä.',
  teksti: 'Lima on Perun länsirannikolla, Tyynenmeren ja Andien välissä. '
    + 'Metropolialue kattaa yli 2670 neliökilometriä ja nousee rannalta '
    + 'laaksoja ja rinteitä pitkin jopa 1550 metrin korkeuteen. Rímac-joki '
    + 'tuo Andeilta juomaveden ja vesivoiman, ja etelässä kaupunki päättyy '
    + 'jyrkkiin hiekkakallioihin, joiden juurella kulkee rantatie.'
    + '\n\n'
    + 'Kaupunki perustettiin 1535, ja siitä tuli siirtomaahallinnon '
    + 'tärkein paikka Etelä-Amerikassa. Merirosvojen varalta sen ympärille '
    + 'rakennettiin 1684–1687 muuri, joka purettiin 1872 kasvun tieltä. '
    + '1800-luvun puolivälissä guanon vienti rahoitti julkiset rakennukset '
    + 'ja rautatiet; radasta Limasta Andeille tuli maailman toiseksi '
    + 'korkein, ja sen huipputunneli on 4783 metrissä.'
    + '\n\n'
    + 'Nykyään Liman metropolialueella asuu yli yksitoista miljoonaa '
    + 'ihmistä, ja se on Etelä-Amerikan toiseksi väkirikkain kaupunki. '
    + 'Kaupunkia kutsutaan Amerikan gastronomiseksi '
    + 'pääkaupungiksi: ceviche on maan kansallisruoka, chifa on '
    + 'kiinalaisten siirtolaisten perintöä, ja kaksi limalaista '
    + 'ravintolaa on valittu 2020-luvulla maailman parhaaksi.',
},
  /*
   * QUITO (23.8.2026). Avain on wiki-otsikko 'Quito', jonka
   * js/packs/southamerica.js antaa kaupungille sekä wiki- että
   * näyttönimeksi. Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain quito): jokainen väite on
   * luettu en-Wikipedian raakatekstistä 23.8.2026, ja lähdeaineistona
   * ovat docs/mantereet-tyoaineisto/faktapohja-quito.md ja sen
   * riippumaton tarkistus (tarkistus-quito.md), joka voittaa
   * ristiriidassa. Perustajan nimi kirjoitetaan Belalcázar, koska
   * henkilön oma en-Wikipedia-artikkeli on "Sebastián de Belalcázar"
   * ja Benalcázar on pelkkä uudelleenohjaus. Väkiluvut ovat
   * "Quito"-artikkelin infoboxista (population_total 1 763 275,
   * population_metro 2 889 703). Korkeus 2 850 m on infoboxin luku;
   * saman artikkelin Geography-osio sanoo 2 820 m, ja ero on kirjattu
   * lehden lohkokommenttiin. Vuoden 1873 kulma kantaa koko lehden:
   * isoisän matkavuonna avattiin Quiton observatorio ja Cotopaxin
   * huipulle noustiin toisen kerran.
   */
  Quito: {
    intro: 'Quito on rakennettu kapealle ylätasangolle Andien rinteille, '
      + 'aivan päiväntasaajan tuntumaan, noin 2 850 metrin korkeuteen. '
      + 'Kaupunki on vain viisi kilometriä leveä mutta neljäkymmentä '
      + 'kilometriä pitkä, koska vuoret rajaavat sitä molemmin '
      + 'puolin. Länsilaidalla kohoaa Pichincha-tulivuori, idässä laakson '
      + 'takana Cotopaxi, Antisana ja Cayambe.'
      + '\n\n'
      + 'Seudun alkuperäisväestöä oli quitu-kansa, ja 1400-luvun lopulla '
      + 'inkat liittivät alueen valtakuntaansa. **Espanjalaiset perustivat '
      + 'nykyisen kaupungin uudelleen 6. joulukuuta 1534**, ja seuraavan '
      + 'vuosisadan aikana vanhaankaupunkiin nousi noin kaksikymmentä '
      + 'kirkkoa ja luostaria. Niistä syntyi Amerikan mantereen parhaiten '
      + 'säilynyt historiallinen keskusta, joka pääsi 1978 Krakovan kanssa '
      + 'ensimmäisten joukossa Unescon listalle.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 Quito oli presidentti Gabriel García '
      + 'Morenon hallitsema pääkaupunki. **Samana vuonna avattiin kaupungin '
      + 'oma tähtitieteellinen observatorio** La Alameda -puistoon, ja '
      + 'Cotopaxin huipulle noustiin vasta toista kertaa. Katukuva oli yhä '
      + 'siirtomaa-ajan, eikä El Panecillon kukkulalla ollut vielä patsasta.',
    teksti: 'Quito on Ecuadorin pohjoisilla ylängöillä, Guayllabamba-joen '
      + 'valuma-alueella, Pichincha-tulivuoren itärinteillä. Laaksoa '
      + 'reunustavat molemmin puolin tulivuoret, joista osa on lumihuippuisia '
      + 'ja näkyy kirkkaalla säällä kaupunkiin. Päiväntasaaja kulkee '
      + 'metropolialueen pohjoisosan halki San Antonion pitäjässä.'
      + '\n\n'
      + 'Espanjalaiset perustivat kaupungin nykyiselle paikalleen 1534 '
      + 'Sebastián de Belalcázarin johdolla. Vuonna 1809 alkanut '
      + 'itsenäisyysliike kukistettiin, mutta 24. toukokuuta 1822 Antonio '
      + 'José de Sucre voitti Pichinchan taistelun tulivuoren rinteillä ja '
      + 'ratkaisi asian. Tasavallan aikana kaupunki sai omat laitoksensa: '
      + 'observatorio avattiin 1873 ja on yksi Etelä-Amerikan vanhimmista.'
      + '\n\n'
      + 'Nykyään kaupungissa asuu vajaat 1,8 miljoonaa ja metropolialueella '
      + 'noin 2,9 miljoonaa ihmistä. Vanhaakaupunkia on kunnostettu '
      + 'järjestelmällisesti vuodesta 2002, ja 320 hehtaarin alueella on '
      + 'noin 130 monumentaalirakennusta. Uusi lentoasema avattiin 2013 '
      + 'kaupungin ulkopuolelle, ja köysirata vie keskustasta Pichinchan '
      + 'rinteelle noin 4 100 metriin.',
  },
  /*
   * MONTEVIDEO (24.8.2026). Avain on wiki-otsikko 'Montevideo', jonka
   * js/packs/southamerica.js antaa kaupungille sekä wiki- että
   * näyttönimeksi. Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain montevideo): jokainen väite
   * tulee samasta lähdeaineistosta eli
   * docs/mantereet-tyoaineisto/faktapohja-montevideo.md:stä ja sen
   * riippumattomasta tarkistuksesta (tarkistus-montevideo.md), joka
   * voittaa ristiriidassa. Piirityksen kesto kerrotaan tässä
   * vuosilukuvälinä 1843–1851, koska "Montevideo"-artikkeli lainaa juuri
   * sen; lehden historia-sivu selittää, miksi toinen artikkeli päätyy
   * yli yhdeksään vuoteen (saarto alkoi joulukuussa 1842 ja purkautui
   * helmikuussa 1852). Perustamisvuotta ei valita yhdeksi, koska
   * perustamisasiakirjaa ei ole. Vuoden 1873 kulma kantaa koko lehden:
   * isoisän matkavuonna Montevideo oli juuri saanut lennättimen,
   * hevosraitiotien, satamatorin ja ensimmäisen rautatiensä.
   */
  Montevideo: {
    intro: 'Montevideo on Uruguayn pääkaupunki. '
      + 'Se on rakennettu Río de la Platan pohjoisrannalle niemelle, jonka '
      + 'toisella puolella on suojaisa lahti ja toisella avoin suistovesi. '
      + 'Portugalilaiset pystyttivät niemelle varustuksen marraskuussa 1723, '
      + 'mutta espanjalaiset karkottivat heidät jo tammikuussa 1724 ja '
      + 'aloittivat asuttamisen.'
      + '\n\n'
      + 'Muurien sisään syntyi siirtomaakaupunki, josta tuli Espanjan '
      + 'Etelä-Atlantin laivastotukikohta ja Buenos Airesin kilpailija. '
      + '**Vuosina 1843–1851 kaupunki kesti piirityksen**, jonka aikana sen '
      + 'puolustus lepäsi vapautettujen orjien joukko-osaston ja Euroopasta '
      + 'tulleiden pakolaisten varassa. Sodan jälkeen kasvu oli nopeaa: '
      + 'kaasukatuvalot 1853, Teatro Solís 1856, lennätinkaapeli Buenos '
      + 'Airesiin 1866, hevosraitiotie ja Mercado del Puerto 1868, '
      + 'ensimmäinen rautatie 1869.'
      + '\n\n'
      + '**Isoisän matkavuonna 1873** kaupunki oli siis juuri saanut '
      + 'nykyaikaiset yhteytensä ja oli Etelä-Amerikan vakiintuneimpia '
      + 'satamakaupunkeja. Nykyään sama niemi jatkuu kymmenien kilometrien '
      + 'rantabulevardiksi itään, ja kaupungin katukuvassa elää candombe, '
      + 'afrouruguaylaisten kortteleiden rumpuperinne.',
    teksti: 'Montevideo sijaitsee Río de la Platan pohjoisrannalla, siinä '
      + 'kohdassa jossa suisto alkaa avautua Atlantiksi. Vanhakaupunki on '
      + 'niemellä sataman ja lahden suojassa, ja lahden toisella puolella '
      + 'kohoaa Cerron kukkula. Vastarantaa ei näy: suistoa on suulla '
      + 'leveyttä noin 220 kilometriä.'
      + '\n\n'
      + 'Kaupunki perustettiin 1720-luvulla portugalilaisten ja '
      + 'espanjalaisten kiistan seurauksena, ja 1776 siitä tuli Espanjan '
      + 'Etelä-Atlantin laivastotukikohta. Britit pitivät kaupunkia hallussaan '
      + 'seitsemän kuukautta vuonna 1807. Guerra Granden aikana Montevideo '
      + 'kesti pitkän piirityksen, jonka aikana molemmat osapuolet '
      + 'lakkauttivat orjuuden vahvistaakseen joukkojaan.'
      + '\n\n'
      + 'Nykyinen Montevideo on satama-, hallinto- ja kulttuurikaupunki, jonka '
      + 'rantabulevardi rambla seuraa rantaviivaa laidasta laitaan. Estadio '
      + 'Centenario, jalkapallon ensimmäisten maailmanmestaruuskisojen '
      + 'päänäyttämö vuodelta 1930, on yhä maajoukkueen kotikenttä. Helmikuun '
      + 'karnevaali on vuoden suurin juhla, ja sen näkyvin osa on candombe-'
      + 'rumpuryhmien llamadas-kulkue.',
  },
  /*
   * BOGOTÁ (24.8.2026). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain bogota). Lähdeaineistona
   * ovat docs/mantereet-tyoaineisto/faktapohja-bogota.md ja sen
   * RIIPPUMATON TARKISTUS docs/mantereet-tyoaineisto/tarkistus-bogota.md,
   * joka voittaa ristiriidassa; lisäksi jokainen väite on luettu itse
   * en-Wikipedian raakatekstistä ("Bogotá", "Plaza de Bolívar",
   * "National Museum of Colombia", "TransMilenio", "Ciclovía").
   * Avain on wiki-otsikko 'Bogotá', sama jonka js/packs/southamerica.js
   * antaa kaupungille sekä wiki- että näyttönimeksi.
   * Väkiluvut ovat "Bogotá"-artikkelin infoboxista (population_total
   * 8 034 649 vuodelta 2022, population_metro 11 658 211). Korkeus
   * 2 640 m on infoboxin ja Geography-osion yhtenevä luku; johdannon
   * "kolmanneksi korkein pääkaupunki" on artikkelin johdannosta ja
   * "suurin kaupunki omalla korkeudellaan" Geography-osiosta — nämä
   * eivät ole ristiriidassa, koska La Paz ja Quito ovat korkeammalla
   * mutta pienempiä. Vuoden 1873 kulma kantaa koko lehden: isoisän
   * matka-aikaan Kansallismuseon nykyinen rakennus (Panóptico-vankila)
   * oli juuri valmistunut ja kaupunki eli vielä eristyksissä.
   * Sisältölinjaus on spec-mantereet.md:n E-Amerikka-osio: ei
   * nykypolitiikkaa, ei huumekauppaa, ei väkivaltaa.
   */
  'Bogotá': {
    intro: 'Bogotá on Kolumbian pääkaupunki ja maan suurin kaupunki. Se '
      + 'makaa Andien Itäisen Kordilleerin ylätasangolla keskimäärin '
      + '2 640 metrin korkeudessa ja on maailman kolmanneksi korkein '
      + 'pääkaupunki. Yhtään kaupunkia, joka olisi samalla sekä '
      + 'korkeammalla että väkirikkaampi, ei ole. Idässä kaupunkia '
      + 'rajaavat jyrkät Itäkukkulat, joiden harjalla kohoavat '
      + 'Monserrate ja Guadalupe.'
      + '\n\n'
      + 'Ylätasanko oli muiscojen maata, ja espanjalaisten saapuessa '
      + 'täällä arvioidaan asuneen puoli miljoonaa ihmistä. **Gonzalo '
      + 'Jiménez de Quesada leiriytyi paikalle elokuussa 1538, mutta '
      + 'virallinen perustaminen tehtiin vasta huhtikuussa 1539.** '
      + 'Kaupunki kantoi nimeä Santa Fé lähes kolmesataa vuotta, kunnes '
      + 'Simón Bolívar kastoi sen 1819 uudelleen Bogotáksi muiscojen '
      + 'kunniaksi.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 Bogotá oli yhä pieni ja eristynyt '
      + 'vuoristopääkaupunki. **Kunnollinen yhteys Magdalena-joelle ja '
      + 'sieltä Karibialle syntyi vasta vuosisadan lopulla**, ja '
      + 'väkiluku jäi kauas sadastatuhannesta. Kansallismuseon nykyinen '
      + 'rakennus oli valmistunut vuotta aiemmin – vankilaksi.',
    teksti: 'Bogotá on Kolumbian keskiosassa, Andien Itäisen Kordilleerin '
      + 'ylätasangolla eli Bogotán savannilla. Kaupunki peittää 1 587 '
      + 'neliökilometriä ja jakautuu kahteenkymmeneen kaupunginosaan. '
      + 'Idässä nousevat Itäkukkulat, etelässä leviää maailman laajin '
      + 'yhtenäinen páramo-ylänkö Sumapaz, ja Bogotá-joki halkoo '
      + 'tasankoa koillisesta lounaaseen.'
      + '\n\n'
      + 'Espanjalaiset perustivat kaupungin muiscojen maille 1538–1539, '
      + 'ja vuoden 1717 jälkeen siitä tuli Uuden Granadan '
      + 'varakuninkuuden pääkaupunki. Tasavallan aikana kaupunki sai '
      + 'omat laitoksensa: Kansallismuseo perustettiin 1823, katedraali '
      + 'valmistui samana vuonna ja Bolívarin patsas pystytettiin 1846. '
      + 'Kasvu kiihtyi vasta 1870-luvulta lähtien: vuonna 1793 lasketut '
      + '20 000 asukasta olivat 1912 kasvaneet noin 117 000:een.'
      + '\n\n'
      + 'Nykyään kaupungissa asuu noin kahdeksan miljoonaa ja '
      + 'metropolialueella lähes kaksitoista miljoonaa ihmistä. '
      + 'Joukkoliikenne nojaa vuonna 2000 avattuun '
      + 'TransMilenio-pikabussijärjestelmään, jossa on 143 asemaa. '
      + 'Sunnuntaisin yli 120 kilometriä katuja suljetaan autoilta '
      + 'pyöräilijöille ja kävelijöille, ja lentoasema kantaa El '
      + 'Doradon legendan nimeä.',
  },
  /*
   * VALPARAÍSO (24.8.2026). Avain on wiki-otsikko 'Valparaíso', jonka
   * js/packs/southamerica.js antaa kaupungille sekä wiki- että
   * näyttönimeksi (rivi 149). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain valparaiso): jokainen väite
   * on luettu en-Wikipedian raakatekstistä 24.8.2026, ja lähdeaineistona
   * ovat docs/mantereet-tyoaineisto/faktapohja-valparaiso.md ja sen
   * riippumaton tarkistus (tarkistus-valparaiso.md), joka voittaa
   * ristiriidassa. Väkiluku 284 938 on "Valparaíso"-artikkelin
   * infoboxista ja vuoden 2024 väestölaskennasta; etäisyys Santiagoon
   * (~120 km maanteitse) ja Suur-Valparaíson asema maan toiseksi
   * väkirikkaimpana kaupunkiseutuna ovat saman artikkelin johdannosta.
   *
   * VUODEN 1873 KULMA ON KIRJOITETTU AUKI KAHTEEN SUUNTAAN: isoisän
   * matkavuonna kaupungissa oli jo lennätin (1852, Latinalaisen Amerikan
   * ensimmäinen), 700 kaasulyhtyä (1856) ja hevosvetoiset raitiovaunut
   * (1861), ja samana vuonna 27.2.1873 avattiin maan ensimmäinen yleinen
   * kirjasto ("Santiago Severín Library"). Sen sijaan kaupungin
   * tunnusmerkkejä, kiskoilla kiipeäviä ascensoreita, EI vielä ollut:
   * ensimmäinen avattiin 1.12.1883. Tämä sanotaan introssa suoraan,
   * koska faktapohja ja tarkistus varoittavat juuri tästä ajoitusvirheestä
   * — sama virhe korjattiin tässä erässä myös isoisän repliikistä
   * js/packs/southamerica-questions.js:ssä.
   */
  'Valparaíso': {
    intro: 'Valparaíso on Chilen rannikolla noin 120 kilometriä Santiagosta '
      + 'luoteeseen, kymmenien jyrkkien kukkuloiden rinteillä Tyynenmeren '
      + 'rannalla. Kapea tasainen alakaupunki eli plan mahtuu sataman ja '
      + 'rinteiden väliin; kaikki muu kiipeää ylöspäin portaita ja '
      + 'kiskoilla kulkevia hissejä pitkin. Asukkaita on runsaat 280 000.'
      + '\n\n'
      + 'Kun espanjalaiset saapuivat 1536, lahden rannalla asui '
      + 'picunche-kansaa ja kylän nimi oli Alimapu. **Purjelaivojen aikaan '
      + 'Valparaísosta tuli Kap Hornin kiertäjien tärkein pysähdyspaikka**, '
      + 'ja siirtolaiset perustivat tänne Latinalaisen Amerikan vanhimman '
      + 'pörssin ja maailman vanhimman yhä ilmestyvän espanjankielisen '
      + 'sanomalehden. Panaman kanava vei 1914 satamalta suuren osan '
      + 'merkityksestä, mutta vanhakaupunki pääsi 2003 Unescon '
      + 'suojelukseen.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 kaupunki oli jo moderni: lennätin oli '
      + 'kulkenut Santiagoon parikymmentä vuotta, kaduilla paloi 700 '
      + 'kaasulyhtyä ja hevoset vetivät raitiovaunuja. **Samana vuonna '
      + 'avattiin maan ensimmäinen yleinen kirjasto.** Kukkuloiden '
      + 'tunnusmerkkiä, kiskoilla kiipeäviä hissejä, ei vielä ollut: '
      + 'ensimmäinen aloitti vasta 1883.',
    teksti: 'Valparaíso on Chilen keskiosan rannikolla, Tyynellemerelle '
      + 'avautuvan lahden ympärillä. Kaupunki on kahdessa kerroksessa: '
      + 'alhaalla kapea plan aukioineen ja satamineen, ylhäällä kymmeniä '
      + 'cerroja eli kukkuloita, joilla ihmiset asuvat. Vanhimmat kukkulat '
      + 'ovat Cerro Alegre ja Cerro Concepción.'
      + '\n\n'
      + 'Espanjalaiset saapuivat 1536, mutta pitkään paikka pysyi pienenä '
      + 'kylänä, jota englantilaiset kaapparit kävivät ryöstämässä. '
      + 'Itsenäistymisen jälkeen satama avautui maailmankaupalle, ja 1848 '
      + 'alkanut Kalifornian kultaryntäys teki siitä välttämättömän '
      + 'pysähdyspaikan. Vuoden 1906 maanjäristys vaurioitti suurta osaa '
      + 'keskustasta; jälleenrakennuksessa katuja levennettiin ja purot '
      + 'katettiin bulevardeiksi.'
      + '\n\n'
      + 'Nykyään satama välittää noin kymmenen miljoonaa tonnia rahtia '
      + 'vuodessa – kontteja, kuparia ja hedelmiä – ja ottaa vastaan '
      + 'risteilyaluksia kesäkaudella. Vanhaakaupunkia on kunnostettu '
      + '1990-luvun puolivälissä syntyneen säilytysliikkeen jälkeen, ja '
      + 'portaat ja kujat ovat täynnä muraaleja. Laivaston päämaja on '
      + 'toiminut kaupungissa vuodesta 1817 ja kansalliskongressi vuodesta '
      + '1990.',
  },
  /*
   * MANAUS (24.8.2026). Avain on 'Manaus (kaupunki)', koska
   * js/packs/southamerica.js (rivi 116) antaa kaupungille wiki-nimeksi
   * fi-Wikipedian täsmennetyn otsikon — ui.js hakee introa juuri
   * kentällä `city.wiki ?? city.name`. Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain manaus): väitteet on luettu
   * en-Wikipedian raakateksteistä 24.8.2026, lähdeaineistona
   * docs/mantereet-tyoaineisto/faktapohja-manaus.md ja sen riippumaton
   * tarkistus tarkistus-manaus.md, joka voittaa ristiriidassa.
   *
   * ETÄISYYS MERESTÄ ON TÄSSÄ 1 500 KM. Tarkistuksen pakollinen korjaus
   * 2: "Amazonas (Brazilian state)" sanoo "1,500 km upstream from the
   * Atlantic Ocean". Pelissä oli sekä oikea luku (paikkatietoteksti)
   * että väärä tuhat kilometriä (visan Q4-fakta,
   * js/packs/southamerica-questions.js) — tämä intro käyttää oikeaa.
   *
   * VUODEN 1873 KULMA: isoisän matkavuonna kaupungissa ei ollut vielä
   * mitään siitä, mistä se tunnetaan. Kumibuumi ajoitetaan vasta
   * vuosiin 1879–1912, katedraali avattiin 1878 ja oopperataloa ei
   * ollut ehdotettukaan ennen vuotta 1881. Koillisen suuri kuivuus
   * (Grande Seca) EI ole 1873-ankkuri: se oli 1877–1878, ja
   * faktapohjan virheellinen "samaan aikaan" on korjattu sekä täällä
   * että lehden nostossa K3.
   */
  'Manaus (kaupunki)': {
    intro: 'Manaus on Amazonasin osavaltion pääkaupunki ja Brasilian '
      + 'pohjoisosan suurin kaupunki: kaksi miljoonaa asukasta keskellä '
      + 'sademetsää, Rio Negron ja Amazonin yhtymäkohdassa. **Amazon on '
      + 'täällä yhä niin syvä, että valtamerialus voi nousta jokea pitkin '
      + '1 500 kilometriä Atlantilta sisämaahan.** Käyttökelpoista '
      + 'maantietä muuhun Brasiliaan ei ole, joten liikenne kulkee '
      + 'ilmassa ja vedessä.'
      + '\n\n'
      + 'Portugalilaiset rakensivat paikalle linnoituksen 1669, ja '
      + 'manaó-, baré-, baniwa- ja passé-kansat auttoivat työssä. '
      + 'Nykyisen nimensä kaupunki sai vasta 1856 manaó-kansan mukaan. '
      + 'Sen tunnetuin jakso on kumibuumi 1879–1912, joka rakensi '
      + 'keskustaan oopperatalon, tullitalon ja kelluvan sataman ja toi '
      + 'kaduille sähkövalot ennen monia Euroopan kaupunkeja.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 mitään tästä ei vielä ollut. **Manaus '
      + 'oli pieni jokisatama, jonka katedraali oli yhä rakenteilla ja '
      + 'jonka väkiluku oli murto-osa vuosisadan lopun 70 000:sta.** '
      + 'Kumin jälkeen kaupunki vaipui vuosikymmeniksi hiljaisuuteen, '
      + 'kunnes vuonna 1967 perustettu vapaakauppa-alue teki siitä '
      + 'elektroniikkateollisuuden keskuksen.',
    teksti: 'Manaus on Brasilian luoteisosassa, Rio Negron ja Solimõesin '
      + 'yhtymäkohdan tuntumassa keskellä Amazonin sademetsää. Kaupungin '
      + 'alapuolella tumma ja savenvärinen joki kulkevat kilometrien '
      + 'matkan sekoittumatta – ilmiön nimi on Encontro das Águas. '
      + 'Historiallinen keskusta on tiivis ja kävelymatkan kokoinen, '
      + 'mutta kaupunki itse levittäytyy laajalle.'
      + '\n\n'
      + 'Vuoden 1669 linnoitus korotettiin kyläksi 1832 ja kaupungiksi '
      + '1848. Kumibuumi teki 1800-luvun lopulla Manausista Amazonin '
      + 'rikkaimman kaupungin: oopperatalo vihittiin 1896, tullitalo '
      + 'nousi englantilaisen yhtiön käsissä 1900-luvun alussa, ja '
      + 'satamaan rakennettiin kelluvat laiturit. Kun kumipuun siemenet '
      + 'päätyivät Aasian '
      + 'viljelmille, buumi loppui yhtä äkkiä kuin oli alkanutkin.'
      + '\n\n'
      + 'Nykyään Manausissa asuu lähes puolet osavaltion väestöstä, ja '
      + 'talous nojaa vuoden 1967 vapaakauppa-alueeseen: '
      + 'teollisuusalueella kootaan elektroniikkaa, ja lentoasema on '
      + 'rahtimäärältään Brasilian kolmanneksi suurin. Matkailija saapuu '
      + 'lentäen tai jokilaivalla ja lähtee retkille vedelle: vesien '
      + 'kohtaamiseen, jokisaaristoon tai rannalle, joka on olemassa vain '
      + 'elo-marraskuussa.',
  },
  /*
   * CARACAS (24.8.2026). Avain on wiki-otsikko 'Caracas', jonka
   * js/packs/southamerica.js antaa kaupungille sekä wiki- että
   * näyttönimeksi (rivi 109). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain caracas): lähdeaineistona
   * docs/mantereet-tyoaineisto/faktapohja-caracas.md ja sen riippumaton
   * tarkistus (tarkistus-caracas.md, haettu committista 5e31d2cf), joka
   * voittaa ristiriidassa, ja jokainen väite on luettu uudestaan
   * en-Wikipedian raakatekstistä 24.8.2026.
   *
   * ETÄISYYS MERELLE on tässä 15 km, ei "reilu kymmenen": tarkistuksen
   * pakollinen korjaus 1. "Caracas"-artikkelin johdanto sanoo "separated
   * from the Caribbean coast by a roughly 15 km expanse of El Ávila
   * National Park". Korkeusluvut (870–1 043 m, ydin n. 900 m) ovat
   * saman artikkelin Geography-osiosta, ja ne kerrotaan tässä omassa
   * yhteydessään — eivät visan kysymyksen 1 fakta-kentän sanamuodossa,
   * jossa 900 metriä ja meren etäisyys ovat samassa virkkeessä.
   *
   * VUODEN 1873 KULMA: matkavuosi osuu Antonio Guzmán Blancon
   * ENSIMMÄISELLE, seitsenvuotiselle kaudelle (27.4.1870–27.2.1877,
   * infoboksi term_start2/term_end2). Bolívarin ratsastajapatsasta ei
   * vielä ollut — se paljastettiin 7.11.1874 — ja tämä sanotaan
   * introssa suoraan, koska se on lehden historia-sivun ankkuri.
   * Nykypolitiikka, talouskriisi ja väkivalta on jätetty kokonaan pois
   * (tilauksen tiukin rajaus); Bolívar on historiallinen henkilö.
   */
  Caracas: {
    intro: 'Caracas on Venezuelan pääkaupunki ja maan suurin kaupunki. Se on '
      + 'ahtautunut kapeaan laaksoon rannikkovuoriston sisään, 870 ja '
      + '1 043 metrin välille; historiallinen keskusta on noin 900 '
      + 'metrissä. Karibianmeri on vain viidentoista kilometrin '
      + 'päässä, mutta väliin nousee lähes 2 200 metriä korkea vuorimuuri, '
      + 'jota kaupunkilaiset kutsuvat Ávilaksi ja kaupungin keuhkoiksi.'
      + '\n\n'
      + 'Diego de Losada perusti kaupungin nimellä Santiago de León de '
      + 'Caracas heinäkuussa 1567, kun päällikkö Guaicaipuron vastarinta '
      + 'oli pitänyt espanjalaiset poissa laaksosta vuosia. **Täällä '
      + 'syntyi 1783 Simón Bolívar**, joka johti itsenäistymissodat '
      + 'Espanjaa vastaan. Vuoden 1812 maanjäristys tuhosi kaupungin '
      + 'lähes kokonaan, ja 1900-luvun öljyvuosina se kasvoi laakson '
      + 'täydeltä ja levisi rinteille.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 Caracas oli työmaa: presidentti Antonio '
      + 'Guzmán Blancon ensimmäisellä kaudella pääaukiosta tehtiin '
      + 'ranskalaistyylinen puisto, kongressipalatsin rakentaminen alkoi '
      + 'ja kansallinen hautaholvi perustettiin. **Bolívarin '
      + 'ratsastajapatsasta ei vielä ollut** – se paljastettiin aukiolla '
      + 'vasta marraskuussa 1874.',
    teksti: 'Caracas on Venezuelan pohjoisosassa, rannikkovuoriston sisään '
      + 'jäävässä laaksossa. Kaupungin halki virtaa Guaire-joki lännestä '
      + 'itään, ja pohjoisreunaa vartioi Ávila eli Waraira Repano, jonka '
      + 'korkein huippu kohoaa 2 765 metriin. Asukkaita on yli kolme '
      + 'miljoonaa ja koko kaupunkiseudulla yli viisi miljoonaa.'
      + '\n\n'
      + 'Espanjalaiset perustivat kaupungin 1567. Kiirastorstaina 1812 '
      + 'maanjäristys tuhosi kaupungin niin laajalti, että uuden '
      + 'pääkaupungin perustamista ehdotettiin. Itsenäistymisen jälkeen '
      + 'kaupunki sai '
      + 'nykyilmeensä ytimen 1870-luvulla, kun Guzmán Blanco rakennutti '
      + 'Capitolion, Panteón Nacionalin ja uuden pääaukion. Öljyn '
      + 'löytyminen 1900-luvun alussa teki siitä miljoonakaupungin.'
      + '\n\n'
      + 'Nykyään kaupungissa kulkee 1983 avattu metro, ja vuoren harjalle '
      + 'nousee köysirata, joka avattiin 1955 ja kunnostettiin 2000-luvun '
      + 'alussa. Kaakossa on Carlos Raúl Villanuevan suunnittelema Ciudad '
      + 'Universitaria, Unescon maailmanperintökohde vuodesta 2000. '
      + 'Musiikinopetusohjelma El Sistema ja siitä noussut Simón Bolívar '
      + '-sinfoniaorkesteri toimivat kaupungissa, ja arkiruoka on arepa.',
  },
  /*
   * SALVADOR (24.8.2026). Avain on laudan wiki-nimi
   * js/packs/southamerica.js:ssä eli 'Salvador (Brasilia)' — pelkkä
   * "Salvador" on suomeksi täsmennyssivu, josta ei saa tiivistelmää.
   * Jokainen väite tulee samasta erästä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain salvador), ja ne on
   * tarkistettu en-Wikipedian raakateksteistä 24.8.2026: "Salvador,
   * Bahia", "Slavery in Brazil", "Candomblé", "Elevador Lacerda",
   * "Historic Center of Salvador", "Timeline of Salvador, Bahia".
   * Sisältölinjaus on spec-mantereet.md:n E-Amerikka-osio ja Raamatun
   * pilarit 3 ja 4: orjakauppa kerrotaan tapahtumina, vuosilukuina ja
   * lukuina, kaunistelematta ja dramatisoimatta, ja afrobrasilialainen
   * kulttuuri elävänä nykykulttuurina. Vuoden 1873 kulma on introssa,
   * koska se on koko lehden kantava aihe: isoisän matkavuonna
   * Salvadoriin valmistui Brasilian ensimmäinen hissi ja orjuus oli
   * yhä laillista.
   */
  'Salvador (Brasilia)': {
    intro: 'Salvador on Bahian osavaltion pääkaupunki Brasilian '
      + 'koillisrannikolla, niemellä joka erottaa Kaikkien pyhien lahden '
      + 'Atlantista. Kaupunki on kahdessa kerroksessa: noin 85 metrin '
      + 'jyrkänteen päällä on Cidade Alta kirkkoineen ja hallintoineen, '
      + 'alhaalla lahden rannassa Cidade Baixa satamineen. Asukkaita on '
      + 'noin 2,4 miljoonaa.'
      + '\n\n'
      + '**Tomé de Sousa perusti kaupungin 1549, ja se oli Portugalin '
      + 'Brasilian ensimmäinen pääkaupunki vuoteen 1763.** Sokeri ja '
      + 'tupakka tekivät satamasta rikkaan, ja samasta satamasta tuli maan '
      + 'suurin orjien tuontisatama: Brasiliaan tuotiin noin neljä '
      + 'miljoonaa orjuutettua afrikkalaista, suurin osa heistä '
      + 'Bahiaan. Siitä juontuu kaupungin nykyinen kulttuuri, jossa '
      + 'candomblé, capoeira ja bahialainen keittiö ovat tavallista arkea. '
      + 'Vanha keskusta Pelourinho on Unescon maailmanperintökohde.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 kaupungissa asui 129 109 ihmistä ja '
      + 'orjuus oli yhä laillista – Brasilia lakkautti sen viimeisenä '
      + 'Amerikan mantereen maista 1888. **Samana vuonna valmistui '
      + 'Brasilian ensimmäinen hissi, Elevador Lacerda**, joka yhdistää '
      + 'kaupungin kaksi kerrosta ja kulkee yhä.',
    teksti: 'Salvador on Brasilian koillisrannikolla, Bahian osavaltion '
      + 'pääkaupunki. Se seisoo kapealla niemellä, joka erottaa Kaikkien '
      + 'pyhien lahden – maan suurimman lahden – Atlantista. Kaupunki on '
      + 'kahdessa tasossa, ja tasojen väliä kulkee Lacerdan hissi.'
      + '\n\n'
      + 'Portugalilaiset perustivat kaupungin 1549 siirtomaansa '
      + 'pääkaupungiksi, ja täällä toimi myös Brasilian ensimmäinen '
      + 'hiippakunta. Sokeriruoko ja tupakka tekivät siitä varakkaan, ja '
      + 'satama oli maan suurin orjien tuontisatama. Hallinto siirtyi '
      + 'Rio de Janeiroon 1763, orjakauppa kiellettiin 1850 ja orjuus '
      + 'lakkautettiin 1888.'
      + '\n\n'
      + 'Nykyään Salvador on afrobrasilialaisen kulttuurin keskus. '
      + 'Candomblén temppeleitä on kaupungissa yli tuhat, capoeira-ringit '
      + 'kokoontuvat kaduilla ja kouluissa, ja Bahian karnevaali on '
      + 'Guinnessin ennätyskirjan mukaan maailman suurin katujuhla. '
      + 'Pelourinhon värikkäitä kortteleita on kunnostettu 1990-luvulta '
      + 'alkaen, ja entisöityjä rakennuksia on yli 800.',
  },
};
