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
};
