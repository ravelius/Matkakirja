/*
 * PÖLLÖN VALMISKYSYMYKSET (omistajan tilaus 18.8.2026, vaihe 1).
 *
 * Käsin kirjoitetut avauskysymykset pöllön chat-paneelin alareunaan:
 * ne näkyvät VAIN keskustelun alussa, ja ensimmäisen oman kysymyksen
 * jälkeen palataan pöllön dynaamisiin jatkokysymyksiin (js/pollo.js).
 *
 * MUOTO. Avain on kaupunki-id (sama kuin laudan cities-listassa) ja
 * konteksti:
 *
 *   'laatta' — kaupunkilaatta kartalla, pelaaja seisoo kaupungissa
 *   'lehti'  — kaupungin oma lehti on auki
 *
 * Jokaisessa tilanteessa on täsmälleen 5 kysymystä. Säännöt:
 *
 *   - suomeksi, pelaajan äänellä, enintään 70 merkkiä
 *   - aiheet pelin omasta aineistosta (kulttuurinostot, nähtävyysjutut,
 *     maatiedot) tai yleistiedosta, jotta pöllöllä on mistä vastata
 *   - EI visavastauksia paljastavia eikä juonispoilereita (Raamatun
 *     pöllölinjaus: pöllö on tiedon hahmo, ei tarinan)
 *
 * PILOTTIERÄ: Firenze, Tampere, Kairo, Tokio, Pariisi, Helsinki.
 * LOPUT KAUPUNGIT TÄYTETÄÄN SARJATYÖNÄ SAMALLA KAAVALLA: lisää
 * kaupungille oma lohko (laatta + lehti, 5 + 5 kysymystä) — mitään
 * muuta ei tarvitse muuttaa. Kaupunki, jolla ei ole lohkoa, ei näytä
 * pelissä mitään (ei tyhjää laatikkoa).
 *
 * VAIHE 2 (työn alla erikseen): kysymyslista voidaan myöhemmin hakea
 * palvelimelta ja generoida uudelleen. Siksi js/pollo.js kutsuu VAIN
 * alla olevaa haeValmiskysymykset-funktiota — kun toteutus vaihtuu,
 * kutsujaan ei kosketa.
 */

export const POLLO_VALMISKYSYMYKSET = {
  firenze: {
    laatta: [
      'Miksi Ponte Vecchion päällä on taloja?',
      'Mikä teki Medici-suvusta niin mahtavan?',
      'Kuinka kauan Duomon kupolia rakennettiin?',
      'Mikä renessanssi oli, ja miksi se alkoi juuri Firenzestä?',
      'Millainen raha floriini oli?',
    ],
    lehti: [
      'Kuka suunnitteli Duomon kupolin, ja miten se pysyy pystyssä?',
      'Mitä Uffizissa oli ennen taidemuseota?',
      'Miksi Michelangelon David on niin kuuluisa?',
      'Mikä on Vasarin käytävä?',
      'Miksi Ponte Vecchiolla myydään kultaa?',
    ],
  },

  tampere: {
    laatta: [
      'Miksi Tampere syntyi juuri kosken partaalle?',
      'Kuka oli James Finlayson?',
      'Miksi Tamperetta kutsutaan Suomen Manchesteriksi?',
      'Kuinka korkea Näsinneula on?',
      'Mitä Tampereen tehtaissa valmistettiin 1800-luvulla?',
    ],
    lehti: [
      'Missä Suomen ensimmäinen sähkövalo syttyi?',
      'Millaista oli asua Amurin työläiskorttelissa?',
      'Keitä Hämeensillan patsaat esittävät?',
      'Miksi mustamakkaraa syödään puolukkahillon kanssa?',
      'Paljonko Tammerkoski putoaa, ja mihin sen voima käytettiin?',
    ],
  },

  kairo: {
    laatta: [
      'Kuinka vanhoja Gizan pyramidit ovat?',
      'Miksi Niili oli Egyptille niin tärkeä?',
      'Mitä Khan el-Khalilissa myytiin 1300-luvulla?',
      'Miten Kairosta tuli islamilaisen maailman keskus?',
      'Kuka oli Saladin, ja miksi hän rakensi linnoituksen?',
    ],
    lehti: [
      'Mitä Tutankhamonin haudasta löytyi?',
      'Miksi al-Azharia sanotaan maailman vanhimmaksi yliopistoksi?',
      'Kuka oli Umm Kulthum?',
      'Mikä on Bab Zuweila, ja mihin sitä käytettiin?',
      'Miten hieroglyfit opittiin lukemaan?',
    ],
  },

  tokio: {
    laatta: [
      'Miksi Tokiota kutsuttiin ennen Edoksi?',
      'Miten shogunit hallitsivat Japania?',
      'Miksi Japani sulkeutui ulkomaailmalta yli 200 vuodeksi?',
      'Miten Tokio selvisi suurista tulipaloistaan?',
      'Kuinka monta ihmistä Tokion seudulla asuu?',
    ],
    lehti: [
      'Mikä on Sensō-jin temppelin tarina?',
      'Miksi Kaminarimon-portilla riippuu jättilyhty?',
      'Mitä Uenon puistossa voi nähdä?',
      'Miksi japanilaisravintolan ikkunassa on muoviruokaa?',
      'Miten teeseremonia etenee?',
    ],
  },

  pariisi: {
    laatta: [
      'Miksi Eiffel-torni rakennettiin?',
      'Miksi Pariisia sanotaan valojen kaupungiksi?',
      'Mitä Ranskan suuressa vallankumouksessa tapahtui?',
      'Kuka rakennutti Pariisin leveät bulevardit?',
      'Mikä Louvre oli ennen museota?',
    ],
    lehti: [
      'Keiden nimet on kullattu Eiffel-tornin kylkeen?',
      'Kuka oli Édith Piaf?',
      'Miksi Mona Lisa on juuri Louvressa?',
      'Mitä Notre-Damen palossa vuonna 2019 menetettiin?',
      'Kenet on haudattu Panthéoniin?',
    ],
  },

  helsinki: {
    laatta: [
      'Miksi Helsinki siirrettiin nykyiselle paikalleen?',
      'Miksi Suomenlinna rakennettiin?',
      'Milloin Helsingistä tuli Suomen pääkaupunki, ja miksi?',
      'Kuka suunnitteli Helsingin empirekeskustan?',
      'Mitä Silakkamarkkinoilla myydään?',
    ],
    lehti: [
      'Miten Temppeliaukion kirkko louhittiin kallioon?',
      'Miksi Uspenskin katedraali näyttää venäläiseltä?',
      'Keitä rautatieaseman kivimiehet ovat?',
      'Miksi Helsinki kelpasi elokuviin Neuvostoliitoksi?',
      'Miksi Suomenlinnan majakka vilkuttaa H-kirjainta?',
    ],
  },
  lontoo: {
    laatta: [
      'Miksi Lontoo syntyi juuri Thamesin mutkaan?',
      'Mikä Big Ben oikeastaan on?',
      'Miksi Tower Bridge aukeaa keskeltä?',
      'Mitä Lontoon suuressa palossa 1666 tapahtui?',
      'Kenen muistoksi Trafalgar Squaren pylväs pystytettiin?',
    ],
    lehti: [
      'Miksi venetsialainen Canaletto maalasi Lontoota?',
      'Millainen paikka parvekekäytävällinen majatalo oli?',
      'Miksi Abbey Roadin suojatietä jonotetaan?',
      'Miksi Leake Streetin tunnelissa saa maalata seiniin?',
      'Mikä on Trafalgar Squaren neljäs jalusta?',
    ],
  },

  istanbul: {
    laatta: [
      'Miksi Istanbul on kahdella mantereella?',
      'Miksi kaupungin nimi vaihtui Konstantinopolista?',
      'Mikä Bosporinsalmi on?',
      'Miksi Istanbulin kaduilla on niin paljon kissoja?',
      'Mitä Suuressa basaarissa myydään?',
    ],
    lehti: [
      'Miten Hagia Sofia on muuttunut vuosisatojen aikana?',
      'Miksi Yerebatanissa on Medusan kasvot pylvään alla?',
      'Mikä mehter-soittokunta oli?',
      'Mihin Valensin vesijohtoa käytettiin?',
      'Miten Topkapın palatsissa elettiin?',
    ],
  },

  dublin: {
    laatta: [
      'Miksi Dublinia sanotaan Joycen kaupungiksi?',
      'Mitä Bloomsday-päivänä juhlitaan?',
      'Mikä Book of Kells on?',
      'Miksi Guinness on juuri Dublinista?',
      'Mikä hurling on lajina?',
    ],
    lehti: [
      'Kuka James Joyce oli?',
      'Mitä coddle-padassa on?',
      'Miksi hurlingin pelaajat eivät saa palkkaa?',
      'Kuka William Rowan Hamilton oli?',
      'Miten Schrödingerin luento liittyy dna:han?',
    ],
  },

  edinburgh: {
    laatta: [
      'Miksi Edinburghin linna seisoo kalliolla?',
      'Mikä Royal Mile on?',
      'Miksi kaupungissa on Vanha ja Uusi kaupunki?',
      'Mitä haggis on?',
      'Mitä tartaanin ruudut kertovat?',
    ],
    lehti: [
      'Kuinka suuri Fringe-festivaali on nykyään?',
      'Miten Dolly-lammas syntyi?',
      'Miten kloroformin nukuttava vaikutus löydettiin?',
      'Miksi linnan kaivo ehtyi piiritysten aikana?',
      'Miksi Edinburghia kutsutaan Auld Reekieksi?',
    ],
  },

  marseille: {
    laatta: [
      'Miksi kreikkalaiset perustivat kaupungin juuri tänne?',
      'Kuinka vanha Marseille on?',
      'Mikä Vanhasatama on kaupungille ollut?',
      'Miksi Notre-Dame de la Garde seisoo mäen päällä?',
      'Mikä Ifin linnasaari on?',
    ],
    lehti: [
      'Mitä bouillabaisse-keitossa on?',
      'Mistä Massalian hopearahat kertovat?',
      'Kuka Monte Criston kreivi oli?',
      'Miksi navette-keksi on veneen muotoinen?',
      'Mikä MuCEM-museo on?',
    ],
  },

  lissabon: {
    laatta: [
      'Mitä Lissabonissa tapahtui vuonna 1755?',
      'Miksi kaupunki rakennettiin uudelleen puuhäkkien varaan?',
      'Mikä Belémin torni on?',
      'Miksi Lissabonissa on niin paljon mäkiä?',
      'Mikä fado on?',
    ],
    lehti: [
      'Miksi Belémin tornin kulmassa on sarvikuono?',
      'Miten azulejot pitävät talon viileänä?',
      'Mistä pastel de nata on peräisin?',
      'Miksi sardiineja grillataan kadulla kesäkuussa?',
      'Miksi karmeliittikirkon kattoa ei rakennettu takaisin?',
    ],
  },

  madrid: {
    laatta: [
      'Miksi Madridista tehtiin Espanjan pääkaupunki?',
      'Kuinka korkealla Madrid sijaitsee?',
      'Mikä Puerta del Sol on?',
      'Miksi madridilaiset valvovat niin myöhään?',
      'Mitä tapas tarkoittaa?',
    ],
    lehti: [
      'Kuka Francisco Goya oli?',
      'Mitä Pradon kokoelmassa on?',
      'Miksi Gran Vían tieltä purettiin 312 taloa?',
      'Mitä kuninkaiden vanhalle Alcázarille tapahtui?',
      'Miksi Cibeleen lähteellä juhlitaan mestaruuksia?',
    ],
  },

  barcelona: {
    laatta: [
      'Miksi Barcelonan kortteleista on leikattu kulmat pois?',
      'Mikä Ramblas-katu on?',
      'Kuka Antoni Gaudí oli?',
      'Miksi Sagrada Família on yhä kesken?',
      'Mitä kieltä Kataloniassa puhutaan?',
    ],
    lehti: [
      'Mitä castellin nimi 4 de 9 amb folre tarkoittaa?',
      'Miten sardanaa tanssitaan?',
      'Miksi Casa Batllóa sanotaan luutaloksi?',
      'Miksi Musiikkipalatsissa ei sytytetä valoja?',
      'Kuka Ildefons Cerdà oli?',
    ],
  },

  granada: {
    laatta: [
      'Miksi Granadassa saa yhä tapaksen juoman mukana?',
      'Mitä Granadassa tapahtui vuonna 1492?',
      'Miksi Sierra Nevadalla voi hiihtää keväällä?',
      'Mikä Albaicín on?',
      'Kuinka kauan maurit hallitsivat Granadaa?',
    ],
    lehti: [
      'Miksi Alhambran arabiankieliset kirjoitukset säilyivät?',
      'Kuka Boabdil oli?',
      'Mikä zambra on?',
      'Kuka Manuel de Falla oli?',
      'Mikä Generalife on?',
    ],
  },

  amsterdam: {
    laatta: [
      'Miksi Amsterdam rakennettiin kanavien varaan?',
      'Miksi talot nojaavat eteenpäin kadulle?',
      'Kuinka moni amsterdamilainen liikkuu pyörällä?',
      'Mikä Anne Frankin talo on?',
      'Miksi Alankomaissa on maata merenpinnan alapuolella?',
    ],
    lehti: [
      'Miksi Amsterdamin talot seisovat puupaalujen päällä?',
      'Mihin julkisivun nostopuuta käytetään?',
      'Mikä Poezenboot eli kissalaiva on?',
      'Miksi Rembrandtin Yövartiosta sahattiin paloja pois?',
      'Kuka Johannes Vermeer oli?',
    ],
  },

  berliini: {
    laatta: [
      'Miksi Berliini jaettiin kahtia?',
      'Milloin Berliinin muuri murtui?',
      'Mikä Brandenburgin portti on?',
      'Miksi Berliini rakennettiin suolle?',
      'Mikä Checkpoint Charlie oli?',
    ],
    lehti: [
      'Miksi Vilhelmin muistokirkko jätettiin raunioksi?',
      'Kuka Marlene Dietrich oli?',
      'Miksi tv-tornin pallosta heijastuu risti?',
      'Mitä maailmankello Alexanderplatzilla näyttää?',
      'Mitä Gaertnerin maalauksissa näkyy vanhasta Berliinistä?',
    ],
  },

  praha: {
    laatta: [
      'Miksi Prahaa sanotaan sadan tornin kaupungiksi?',
      'Kuka Kaarle IV oli?',
      'Mikä Kaarlensilta on?',
      'Mitä astronominen kello näyttää?',
      'Mikä Prahan linna on?',
    ],
    lehti: [
      'Kuka Golem on tarinan mukaan?',
      'Miksi Vanhauusi synagoga on niin merkittävä?',
      'Mitä Má vlast -sarja kuvaa?',
      'Kuka Antonín Dvořák oli?',
      'Miksi apostolit kulkevat kellon luukuissa?',
    ],
  },

  wien: {
    laatta: [
      'Miksi Wienistä tuli musiikin pääkaupunki?',
      'Mikä Hofburg on?',
      'Kuka keisarinna Sisi oli?',
      'Mikä Stephansdom on?',
      'Miksi wieniläiset istuvat kahviloissa tuntikausia?',
    ],
    lehti: [
      'Miksi Praterin ratas kulkee kävelyä hitaammin?',
      'Miksi keisari söi aamiaista eläintarhan keskellä?',
      'Miksi lipizzanhevoset syntyvät tummina?',
      'Kuka Johann Strauss nuorempi oli?',
      'Mihin teatteriin Taikahuilu kirjoitettiin?',
    ],
  },

  budapest: {
    laatta: [
      'Milloin Budasta ja Pestistä tuli yksi kaupunki?',
      'Miksi Budapestissa on niin paljon kylpylöitä?',
      'Mikä Ketjusilta on?',
      'Mitä kieltä Unkarissa puhutaan?',
      'Mikä Kalastajanlinnake on?',
    ],
    lehti: [
      'Miksi Széchenyin altaissa pelataan shakkia?',
      'Kuka keksi Rubikin kuution?',
      'Miksi Anonymuksen patsaalla ei ole kasvoja?',
      'Mikä cimbalom on soittimena?',
      'Mitä tanssitalossa tehdään?',
    ],
  },

  varsova: {
    laatta: [
      'Miten Varsova koottiin uudelleen raunioista?',
      'Kuka Fryderyk Chopin oli?',
      'Mikä Vanhankaupungin tori on?',
      'Mikä Kulttuuri- ja tiedepalatsi on?',
      'Kuinka vanha Varsova on kaupunkina?',
    ],
    lehti: [
      'Miksi linnan kello käynnistettiin vanhasta minuutista?',
      'Mikä maitobaari on?',
      'Kuka Maria Skłodowska oli?',
      'Mikä oli salainen lentävä yliopisto?',
      'Miksi Zamenhof keksi esperanton?',
    ],
  },

  krakova: {
    laatta: [
      'Miksi Krakova oli ennen Puolan pääkaupunki?',
      'Mikä Wawelin linna on?',
      'Mistä Wawelin lohikäärmeen tarina kertoo?',
      'Mikä Sukiennice eli kauppahalli on?',
      'Kuinka vanha Krakovan yliopisto on?',
    ],
    lehti: [
      'Mistä hejnał-torvisoitto kuullaan joka päivä?',
      'Miten obwarzanek-rinkeli valmistetaan?',
      'Mikä szopka on?',
      'Mikä Kazimierz on kaupunginosana?',
      'Kuka opiskeli Collegium Maiuksessa?',
    ],
  },

  alpit: {
    laatta: [
      'Miten Alpit syntyivät?',
      'Kuinka korkea Mont Blanc on?',
      'Miksi alppitalojen katot ovat leveitä?',
      'Mikä lumivyöry on ja miten se syntyy?',
      'Miten vuoristosolat yhdistivät Euroopan?',
    ],
    lehti: [
      'Miksi alppitorvi kantaa laaksosta toiseen?',
      'Miksi fondue piti keksiä kansallisruoaksi?',
      'Miten lumivyöryesteet toimivat?',
      'Miksi alppimurmeli nukkuu puolet vuodesta?',
      'Miksi partakorppikotka syö luita?',
    ],
  },

  venetsia: {
    laatta: [
      'Miksi Venetsia rakennettiin keskelle laguunia?',
      'Mikä Canal Grande on?',
      'Miten gondolilla liikutaan?',
      'Mikä dogen palatsi oli?',
      'Miksi Venetsia vajoaa?',
    ],
    lehti: [
      'Miksi kaupungin talot eivät lahoa mudassa?',
      'Mikä acqua alta on?',
      'Miksi lasinpuhaltajat siirrettiin Muranoon?',
      'Miksi gondoli on tahallaan vino?',
      'Mikä dogen juhlalaiva Bucintoro oli?',
    ],
  },

  rooma: {
    laatta: [
      'Kuinka vanha Rooma on kaupunkina?',
      'Mikä Colosseum oli aikanaan?',
      'Mikä Pantheonin kupolissa on erikoista?',
      'Miksi Vatikaani on oma valtionsa?',
      'Mikä Forum Romanum oli?',
    ],
    lehti: [
      'Mitä Colosseumin lattian alla oli?',
      'Miksi Trevin suihkulähteeseen heitetään kolikko?',
      'Miksi Berninin norsu kantaa obeliskia?',
      'Mikä nasone on?',
      'Mihin keisarien kylpylöitä käytettiin?',
    ],
  },

  sisilia: {
    laatta: [
      'Miksi Sisiliassa on niin monta valloittajan jälkeä?',
      'Mikä Etna on?',
      'Mikä opera dei pupi on?',
      'Miksi Sisilia oli tärkeä kauppareiteillä?',
      'Mitä kieltä Sisiliassa puhutaan?',
    ],
    lehti: [
      'Miksi cannolo täytetään vasta tilauksesta?',
      'Kuinka vanha Palermon Ballarò-tori on?',
      'Miksi Concordian temppeli säilyi ehjänä?',
      'Mitä Piazza Armerinan mosaiikeissa näkyy?',
      'Miten Syrakusan teatteri rakennettiin?',
    ],
  },

  ateena: {
    laatta: [
      'Miksi Akropolis rakennettiin juuri tuolle kalliolle?',
      'Mitä antiikin agoralla tehtiin päivisin?',
      'Miksi Parthenon on nykyään raunio?',
      'Milloin Ateenasta tuli Kreikan pääkaupunki?',
      'Kuka jumalatar Athena oli kreikkalaisille?',
    ],
    lehti: [
      'Miksi yhden karyatidin jalusta on jätetty tyhjäksi?',
      'Kuka voitti ensimmäisen olympiamaratonin vuonna 1896?',
      'Miksi evzonien hameeseen on laskostettu 400 laskosta?',
      'Miten Akropoliin marmoripatsaat puhdistettiin noesta?',
      'Mikä Pireus on, ja miksi se on oma kuntansa?',
    ],
  },

  kreeta: {
    laatta: [
      'Keitä minolaiset olivat?',
      'Mikä Minotauroksen taru oikeastaan kertoo?',
      'Miksi Kreetalla kasvaa niin valtavasti oliivipuita?',
      'Miten Kreetalle päästään Kreikan mantereelta?',
      'Miksi saarella on niin korkeita vuoria?',
    ],
    lehti: [
      'Mitä härkähyppyfreskossa oikein tapahtuu?',
      'Miksi kreetalaista lyyraa pidetään polvella?',
      'Mihin Lassithin tuulimyllyjä käytettiin?',
      'Mitä Idan luolasta on löydetty kaivauksissa?',
      'Miksi Samarian rotko kävellään aina alamäkeen?',
    ],
  },

  dubrovnik: {
    laatta: [
      'Miksi Dubrovnikin ympärillä on noin paksut muurit?',
      'Miksi kaupunkia kutsuttiin ennen Ragusaksi?',
      'Miksi vanhankaupungin katot ovat kaikki samanvärisiä?',
      'Kuinka vanha Dubrovnikin vanhakaupunki on?',
      'Miksi Adrianmeren vesi on niin kirkasta?',
    ],
    lehti: [
      'Mistä sana karanteeni on peräisin?',
      'Miten klapa-laulu esitetään?',
      'Miksi Stoniin rakennettiin viiden kilometrin muuri?',
      'Kuinka vanha fransiskaaniluostarin apteekki on?',
      'Mistä kaupungin juomavesi tuotiin 1400-luvulla?',
    ],
  },

  sarajevo: {
    laatta: [
      'Miksi Sarajevo rakennettiin kapeaan jokilaaksoon?',
      'Miksi kaupungissa on itämainen ja wieniläinen puoli?',
      'Mitä Baščaršijan basaarissa myydään?',
      'Miksi Sarajevossa on monen eri uskonnon rakennuksia?',
      'Miksi Latinalaissilta tunnetaan kaikkialla maailmassa?',
    ],
    lehti: [
      'Millainen soitin saz on?',
      'Miten Sarajevon haggada päätyi Espanjasta Bosniaan?',
      'Kuka oli Nada Mamula?',
      'Miksi Trebević-vuorelle valettiin betoninen bobirata?',
      'Kuka suomalainen hiihti Sarajevossa kolme kultaa?',
    ],
  },

  sofia: {
    laatta: [
      'Miksi Sofian vaakunassa lukee kasvaa mutta ei vanhene?',
      'Mikä vuori kohoaa aivan Sofian eteläpuolella?',
      'Kuinka vanha kaupunki Sofia on?',
      'Mistä Sofia sai nimensä?',
      'Millaista ruokaa Bulgariassa syödään arkena?',
    ],
    lehti: [
      'Mitä metrotyömaalta paljastui vuosina 2010–2012?',
      'Miksi keisari Konstantinus piti Serdicasta niin paljon?',
      'Miten gaida-säkkipilliä soitetaan?',
      'Miksi Sofian kadunvarsihanoista tulee lämmintä vettä?',
      'Mitä uudenvuoden banitsan sisään kätketään?',
    ],
  },

  bukarest: {
    laatta: [
      'Miksi Bukarestia sanottiin aikoinaan Idän Pariisiksi?',
      'Mistä romanian kieli on peräisin?',
      'Kuinka suuri kaupunki Bukarest on?',
      'Miksi Parlamenttipalatsi ylipäätään rakennettiin?',
      'Millaista kansanmusiikkia Romaniassa soitetaan?',
    ],
    lehti: [
      'Miten kokonainen kirkko siirrettiin uuteen paikkaan?',
      'Kuka oli insinööri Eugeniu Iordăchescu?',
      'Miksi mici-makkaroissa ei ole lainkaan kuorta?',
      'Kuka keksi museoiden dioraamat?',
      'Miten Aurel Vlaicun lentokonetta ohjattiin?',
    ],
  },

  kiova: {
    laatta: [
      'Kuinka vanha kaupunki Kiova on?',
      'Mikä joki Dnepr on?',
      'Miksi Kiovan kirkoissa on kultaisia kupoleita?',
      'Mitä Kiovan luolaluostarissa on?',
      'Millaista ruokaa Ukrainassa syödään arkena?',
    ],
    lehti: [
      'Mitä Pyhän Sofian katedraalin seiniin on raapustettu?',
      'Keitä kobzarit olivat?',
      'Millainen soitin bandura on?',
      'Kuka sovitti Štšedrykin kuorolauluksi?',
      'Kuka oli Jaroslav Viisas?',
    ],
  },

  odessa: {
    laatta: [
      'Miksi Odessa perustettiin juuri Mustanmeren rannalle?',
      'Kuinka vanha kaupunki Odessa on?',
      'Mikä Potemkinin portaikko on?',
      'Miksi Odessaa sanotaan huumorin kaupungiksi?',
      'Millainen meri Mustameri on?',
    ],
    lehti: [
      'Kuka José de Ribas oli?',
      'Miten oopperatalon salia viilennettiin helteellä?',
      'Miksi Privozin torilla tingitään aina?',
      'Milloin Humorina-juhlaa vietetään?',
      'Kuinka syvälle Odessan maanalaiset käytävät ulottuvat?',
    ],
  },

  moskova: {
    laatta: [
      'Miksi Punaisella torilla on noin värikäs kirkko?',
      'Mikä Kreml oikeastaan on?',
      'Kuinka vanha kaupunki Moskova on?',
      'Miksi Moskovan metro rakennettiin niin syvälle?',
      'Millainen soitin balalaikka on?',
    ],
    lehti: [
      'Miksi maailman suurin kello ei ole koskaan soinut?',
      'Mitä sana Bolshoi tarkoittaa?',
      'Mitä Kristus Vapahtajan katedraalin paikalla oli ennen?',
      'Kuka suunnitteli Majakovskajan metroaseman?',
      'Miksi laskiaisen blini muistuttaa aurinkoa?',
    ],
  },

  pietari: {
    laatta: [
      'Miksi Pietari rakennettiin keskelle soista suistoa?',
      'Kuka Pietari Suuri oli?',
      'Miksi kaupunki on vaihtanut nimeään kolmesti?',
      'Mitä valkeat yöt tarkoittavat?',
      'Mikä Eremitaaši on?',
    ],
    lehti: [
      'Miksi kaupunki nimettiin apostoli Pietarin mukaan?',
      'Miksi aateliset käskettiin muuttamaan Moskovasta tänne?',
      'Kuka sävelsi seitsemännen sinfonian Leningradissa?',
      'Miksi kevään tulo haistetaan Pietarin toreilla?',
      'Millainen kala kuore on?',
    ],
  },

  tallinna: {
    laatta: [
      'Miksi Tallinnan vanhakaupunki on säilynyt näin ehjänä?',
      'Mikä hansakaupunki oli?',
      'Miksi Toompea ja alakaupunki olivat eri kaupunkeja?',
      'Kuinka lähellä Helsinkiä Tallinna on?',
      'Mitä yhteistä viron ja suomen kielellä on?',
    ],
    lehti: [
      'Kuka Vana Toomas on?',
      'Mitä laulava vallankumous tarkoitti?',
      'Kuinka usein Viron laulujuhlia pidetään?',
      'Miksi Lyhyen jalan tornia sanottiin Epäluulon torniksi?',
      'Miksi salama iskee yhä uudestaan Olevisten torniin?',
    ],
  },

  riika: {
    laatta: [
      'Miksi Riika perustettiin juuri Väinäjoen suulle?',
      'Miksi Riiassa on niin paljon jugend-taloja?',
      'Kuinka suuri kaupunki Riika on?',
      'Millaista kieltä latvia on?',
      'Millainen juhla Latvian laulujuhla on?',
    ],
    lehti: [
      'Mikä daina on?',
      'Miksi Krišjānis Barons rakensi lapuille oman kaapin?',
      'Mitä sklandrausis-piirakan sisällä on?',
      'Keitä Mustapäiden veljeskuntaan kuului?',
      'Kuinka vanhoja Riian Kolme veljestä ovat?',
    ],
  },

  vilna: {
    laatta: [
      'Miksi Vilna kasvoi kahden joen yhtymäkohtaan?',
      'Kuinka monta kirkkoa Vilnassa on?',
      'Miksi liettuaa sanotaan hyvin vanhaksi kieleksi?',
      'Mikä Užupis on?',
      'Millaista ruokaa Liettuassa syödään kesällä?',
    ],
    lehti: [
      'Miltä sutartinė kuulostaa?',
      'Miksi šaltibarščiai on kirkkaanpinkki?',
      'Keitä kirjankantajat eli knygnešiai olivat?',
      'Kuinka vanha Vilnan yliopisto on?',
      'Miksi tähtitornista ei enää katsella tähtiä?',
    ],
  },

  tukholma: {
    laatta: [
      'Kuinka monelle saarelle Tukholma on rakennettu?',
      'Mikä Gamla stan on?',
      'Miksi Tukholman saaristossa on niin monta saarta?',
      'Kuka jakaa Nobel-palkinnot Tukholmassa?',
      'Miksi Tukholmaa sanotaan Pohjolan Venetsiaksi?',
    ],
    lehti: [
      'Miksi sotalaiva Vasa upposi heti neitsytmatkallaan?',
      'Miten Vasa säilyi 333 vuotta pohjamudassa?',
      'Kuka oli Elias Martin?',
      'Miksi keskellä Tukholmaa tarvitaan sulku?',
      'Kuinka kapea Mårten Trotzigs gränd on?',
    ],
  },

  oslo: {
    laatta: [
      'Miksi Oslo rakennettiin vuonon perukkaan?',
      'Milloin kaupunki sai takaisin nimen Oslo?',
      'Keitä viikingit olivat?',
      'Miksi Norjan rannikolla on niin paljon vuonoja?',
      'Kuka jakaa Nobelin rauhanpalkinnon?',
    ],
    lehti: [
      'Kuka sävelsi Vuorenkuninkaan luolassa -kappaleen?',
      'Miten ruskeaa juustoa eli brunostia valmistetaan?',
      'Mitä Osebergin hautakummusta löytyi?',
      'Miten Kon-Tiki-lautta rakennettiin?',
      'Kuinka korkea Frognerin Monoliitti on?',
    ],
  },

  kobenhavn: {
    laatta: [
      'Miksi Kööpenhamina rakennettiin salmen rannalle?',
      'Mitä kaupungin nimi tarkoittaa?',
      'Kuka H. C. Andersen oli?',
      'Mitä tanskalaiset tarkoittavat sanalla hygge?',
      'Missä pieni merenneito istuu?',
    ],
    lehti: [
      'Missä järjestyksessä smørrebrød syödään?',
      'Miksi Nyhavnin talot on maalattu kirkkaanvärisiksi?',
      'Miten Andersen päätyi kaupunkiin neljätoistavuotiaana?',
      'Kuka oli säveltäjä Carl Nielsen?',
      'Milloin Tivolin huvipuisto avattiin?',
    ],
  },

  lappi: {
    laatta: [
      'Mikä kaamos on?',
      'Miksi revontulet syttyvät taivaalle?',
      'Keitä saamelaiset ovat?',
      'Miksi keskiyön aurinko ei laske kesällä lainkaan?',
      'Miten porot löytävät ruokaa lumen alta?',
    ],
    lehti: [
      'Miten joiku eroaa tavallisesta laulusta?',
      'Miksi käristyksen liha höylätään jäätyneenä?',
      'Mikä kielipesä on?',
      'Mikä ahkio on?',
      'Miten turvekammi rakennettiin?',
    ],
  },

  tromssa: {
    laatta: [
      'Missä napapiiri kulkee?',
      'Miksi Tromssassa on lämpimämpää kuin yhtä pohjoisessa?',
      'Milloin Tromssassa voi nähdä revontulia?',
      'Kuinka pohjoisessa Tromssa oikein sijaitsee?',
      'Millaista on elää kaksi kuukautta ilman aurinkoa?',
    ],
    lehti: [
      'Millainen kala skrei on?',
      'Miten kuivakala tehdään ulkotelineillä?',
      'Kuka oli Kristian Birkeland?',
      'Mitä maailman pohjoisimmassa yliopistossa tutkitaan?',
      'Miksi Tromssasta tuli syntikkamusiikin kaupunki?',
    ],
  },

  islanti: {
    laatta: [
      'Miksi Islannissa on niin paljon tulivuoria?',
      'Mistä sana geysir on saanut alkunsa?',
      'Miten islantilaiset lämmittävät talonsa?',
      'Miksi saarella ei kasva juuri metsää?',
      'Keitä ensimmäiset islantilaiset olivat?',
    ],
    lehti: [
      'Mitä Alþingi tarkoittaa?',
      'Miksi islantilainen ymmärtää 1200-luvun saagoja?',
      'Mikä jólabókaflóð on?',
      'Miksi vanhat käsikirjoitukset olivat Tanskassa?',
      'Kuka oli Halldór Laxness?',
    ],
  },

  izmir: {
    laatta: [
      'Miksi İzmirin rinteeseen rakennettiin hissitorni?',
      'Mikä Kadifekale on, ja kuka rakensi sen muurit?',
      'Miten İzmirissä mennään lahden yli töihin?',
      'Mitä İzmirin Kordonilla tehdään iltaisin?',
      'Kuinka vanha kaupunki İzmir oikeastaan on?',
    ],
    lehti: [
      'Mistä boyoz tuli İzmiriin?',
      'Miksi sämpylää sanotaan kyyhkyseksi?',
      'Miten Kültürpark sai alkunsa Moskovan-matkasta?',
      'Montako lauttavuoroa İzmirissä ajetaan päivässä?',
      'Mitä antiikin agorasta on jäljellä keskustassa?',
    ],
  },

  ankara: {
    laatta: [
      'Miksi Ankaran linna seisoo yhä kaupungin keskellä?',
      'Mikä Atakule on, ja mitä sen huipulla tapahtuu?',
      'Mitä Anatolian sivilisaatioiden museossa on esillä?',
      'Miten Gençlik Parkı syntyi suon paikalle?',
      'Kuka oli Hacı Bayram Veli?',
    ],
    lehti: [
      'Mitä Ankara tava on?',
      'Mitä Çıkrıkçılar Yokuşun puodeissa myydään?',
      'Milloin Ankaran metro avattiin?',
      'Mitä Augustuksen temppelin seinään on kaiverrettu?',
      'Kuinka vanha linnanportin kellotorni on?',
    ],
  },

  kapadokia: {
    laatta: [
      'Mikä tulivuori kerrosti Kappadokian tuhkan?',
      'Miksi Avanosin savi on punaista?',
      'Millaista on asua kallioon kaivetussa talossa?',
      'Mikä Nevşehir oli ennen kaupungiksi kasvamista?',
      'Miten kyyhkyslakat liittyvät alueen peltoihin?',
    ],
    lehti: [
      'Miten Kaymaklın kivioven sai kiinni?',
      'Mitä Göremen kalliokirkoissa on maalattuna?',
      'Miksi osa Göremen kirkoista on halki?',
      'Mikä Sultanhan on?',
      'Miksi kyyhkysten lantaa sekoitettiin maaleihin?',
    ],
  },

  nikosia: {
    laatta: [
      'Miksi Nikosia on Kyproksen rahan kaupunki?',
      'Mikä Büyük Han on ollut aikojen kuluessa?',
      'Miksi Nikosiassa on niin vähän puita?',
      'Kuka oli dragomaani Hadjigeorgakis Kornesios?',
      'Mitä Kyproksen museossa on esillä?',
    ],
    lehti: [
      'Mitä Bedestenin holvien alta on löytynyt?',
      'Millainen kortteli Laiki Geitonia on?',
      'Miksi Selimiye näyttää goottilaiselta kirkolta?',
      'Mitä Kyproksen postimuseossa säilytetään?',
      'Miten Omeryen hamamissa kylvetään?',
    ],
  },

  halab: {
    laatta: [
      'Mitä Aleppon linnoituksen muurien sisällä on?',
      'Miksi vanhankaupungin korttelit pärjäsivät omillaan?',
      'Mitä Aleppon vanhallekaupungille on tapahtunut?',
      'Miksi Bab al-Farajin kellotorni muistuttaa minareettia?',
      'Kuka rakennutti al-Firdawsin madrasan?',
    ],
    lehti: [
      'Miten Aleppon pippuri kuivataan?',
      'Mistä muhammara survotaan?',
      'Miksi kebab karaz värjää lautasen purppuraksi?',
      'Mitä al-Halawiyyan koulun pylväille tapahtui?',
      'Miten katetun basaarin korjaustyö etenee?',
    ],
  },

  damaskos: {
    laatta: [
      'Miksi damaskoslainen talo kääntää selkänsä kadulle?',
      'Mikä Azm-palatsi on, ja kuka sen rakennutti?',
      'Mihin Hidžaz-asemalta lähdettiin?',
      'Kuinka vanha Umaijadien moskeija on?',
      'Mitä Damaskoksen linnoituksesta on jäljellä?',
    ],
    lehti: [
      'Mitä Tekkiye Süleymaniyen pihalla tehtiin?',
      'Mikä qamar al-din on?',
      'Kuinka kauan Nur al-Dinin kylpylä on lämmennyt?',
      'Missä järjestyksessä hammamin huoneet kuljetaan?',
      'Kuka suunnitteli Hidžaz-aseman rakennuksen?',
    ],
  },

  jerusalem: {
    laatta: [
      'Miksi Jerusalem rakennettiin juuri tälle kukkulalle?',
      'Kuka rakennutti vanhankaupungin nykyiset muurit?',
      'Kuinka monta porttia muurissa on käytössä?',
      'Miksi Öljymäen rinne on täynnä hautoja?',
      'Mikä oli ensimmäinen kortteli muurien ulkopuolella?',
    ],
    lehti: [
      'Mistä Jerusalem sai vetensä ennen putkia?',
      'Miten Salomon altailta johdettiin vesi kaupunkiin?',
      'Miksi talon alle louhittiin vesisäiliö?',
      'Mitä varten Montefioren tuulimylly rakennettiin?',
      'Mikä Siiloan allas on?',
    ],
  },

  petra: {
    laatta: [
      'Keitä nabatealaiset oikeastaan olivat?',
      'Miksi Aarrekammion uurnassa on luodinjälkiä?',
      'Kuinka moni ihminen Petrassa asui parhaimmillaan?',
      'Miten Petra unohtui lännen kartoilta?',
      'Mihin Petran teatteri louhittiin?',
    ],
    lehti: [
      'Mitä Suuresta temppelistä on kaivettu esiin?',
      'Miten tulipalo säilytti kirkon kirjaston?',
      'Mikä Pieni Petra oli?',
      'Mitä Ad Deir on?',
      'Kuka piirsi Petran vuonna 1839?',
    ],
  },

  siinai: {
    laatta: [
      'Kuinka kauan Siinain luostari on toiminut?',
      'Mitä luostarin kirjastossa säilytetään?',
      'Montako askelmaa katumuksen portaissa on?',
      'Miksi Siinain etelän kalliot ovat punaisia?',
      'Miten Suezin kanava muutti Siinain aseman?',
    ],
    lehti: [
      'Mikä Codex Sinaiticus on?',
      'Mitä Serabit el-Khadimin kaivoksilta löytyi?',
      'Miksi keisarikalan kuviot ovat niin näyttäviä?',
      'Missä aavikko ja koralliriutta kohtaavat?',
      'Mistä Värikanjonin pohjan hiekka on tullut?',
    ],
  },

  luxor: {
    laatta: [
      'Miksi Luxorin temppelin päällä seisoo moskeija?',
      'Kuinka pitkä sfinksikuja on?',
      'Miten Luxorissa ylitetään joki?',
      'Miksi Luxorin kaduilla ajetaan hevosvaunuilla?',
      'Mitä Luxorin museossa on esillä?',
    ],
    lehti: [
      'Mitä varten Karnakin pyhä järvi oli?',
      'Kuka asui Winter Palace -hotellissa?',
      'Mistä hevosvaunun malli victoria sai nimensä?',
      'Minne Luxorin toinen obeliski vietiin?',
      'Kuinka suuri Karnakin pylvässali on?',
    ],
  },

  medina: {
    laatta: [
      'Miksi Medina syntyi juuri tähän keitaaseen?',
      'Millä nimellä Medina tunnettiin ennen?',
      'Mihin vanhan kaupungin muurit katosivat?',
      'Miten Medinan pellot kasteltiin?',
      'Mikä Hidžaz-rata oli?',
    ],
    lehti: [
      'Milloin juna saapui Medinaan ensimmäisen kerran?',
      'Miksi Hidžaz-rata jäi lopulta käyttämättä?',
      'Millainen rakennus Quba-moskeija on?',
      'Mikä Anbariyan moskeija on?',
      'Mikä Quban kylä oli ennen kaupungin kasvua?',
    ],
  },

  mekka: {
    laatta: [
      'Miksi Mekan laaksossa tulvii rankkasateella?',
      'Kuinka syvä Zamzamin kaivo on?',
      'Millaisten vuorten välissä Mekka sijaitsee?',
      'Miten pyhiinvaellus on muovannut kaupunkia?',
      'Mikä Jabal al-Nour on?',
    ],
    lehti: [
      'Kuka oli šeikki Ibrahim?',
      'Miten Richard Burton pääsi Mekkaan vuonna 1853?',
      'Mikä kiswa on, ja missä se valmistettiin?',
      'Milloin Mekkaan tuli ensimmäinen kirjapaino?',
      'Mitä Mekan kirjastossa säilytetään?',
    ],
  },

  riad: {
    laatta: [
      'Miksi Riadin savimuuri purettiin vuonna 1950?',
      'Mikä Masmakin linnoitus on?',
      'Miten Kingdom Centren yläosan kaari on tehty?',
      'Mitä Al Faisaliahin lasipallon sisällä on?',
      'Mitä Saudi-Arabian kansallismuseossa on esillä?',
    ],
    lehti: [
      'Miten Riadin metro kulkee ilman kuljettajaa?',
      'Kuka suunnitteli KAFD-aseman?',
      'Mistä mashrabiya-ristikko on saanut kuvionsa?',
      'Millainen on Qasr al-Hukmin aseman katos?',
      'Mikä Punainen palatsi on?',
    ],
  },

  rubalkhali: {
    laatta: [
      'Kuinka suuri Tyhjä neljännes oikeastaan on?',
      'Kuka ylitti hiekkameren ensimmäisenä 1931?',
      'Miksi tämän aavikon dyynit eivät vaella?',
      'Mikä Wabarin kraatteri on?',
      'Miten aavikon yli matkustettiin ennen autoja?',
    ],
    lehti: [
      'Mikä Shisrin kaivo oli?',
      'Miksi Shisriä sanotaan hiekkojen Atlantikseksi?',
      'Miten arabianoryks palasi luontoon?',
      'Mitä Uruq Bani Maaridin alueella suojellaan?',
      'Montako uutta kasvia aavikolta löytyi 2006?',
    ],
  },

  sana: {
    laatta: [
      'Miten Sanan talojen julkisivut on koristeltu?',
      'Mitä mafraj tarkoittaa?',
      'Kuinka korkealla Sana sijaitsee?',
      'Mikä Bab al-Yaman on?',
      'Montako moskeijaa vanhassakaupungissa on?',
    ],
    lehti: [
      'Mikä aqd mulawwan on?',
      'Miten sama vesi käytetään korttelissa kahdesti?',
      'Miksi suolatorilla myydään kaikkea muutakin?',
      'Mitä magyal tarkoittaa?',
      'Kuinka vanha Sanan suuri moskeija on?',
    ],
  },

  aden: {
    laatta: [
      'Kuinka vähän Adenissa sataa vuodessa?',
      'Mihin Adenin kallioaltaat rakennettiin?',
      'Milloin Adenista tuli vapaasatama?',
      'Mikä Steamer Point oli?',
      'Mitä Adenin kansallismuseossa on esillä?',
    ],
    lehti: [
      'Miten kallioaltaista tehtiin vedenpitäviä?',
      'Miksi kahvikauppa siirtyi Mokhasta Adeniin?',
      'Kuka oli Abu Bakr al-Aydarus?',
      'Miksi Adenin kellotornia sanotaan Big Beniksi?',
      'Mitä postia Steamer Pointissa vaihdettiin?',
    ],
  },

  salalah: {
    laatta: [
      'Mikä keskiaikainen Zafar oli?',
      'Mitä kieltä Dhofarin vuorilla puhutaan?',
      'Kävikö Marco Polo todella tällä rannalla?',
      'Mitä Al-Baleedin puistossa on kaivettu esiin?',
      'Mikä Al-Husnin palatsi on?',
    ],
    lehti: [
      'Miten suitsukejyvät lajitellaan?',
      'Miksi suitsukepuu kasvattaa juuripullistuman?',
      'Minne suitsukereitti vei mereltä?',
      'Mitä suitsukemuseon saleissa kerrotaan?',
      'Miksi shehrin kieltä ei kirjoiteta?',
    ],
  },

  masqat: {
    laatta: [
      'Miksi Masqatin tunnetuimmat rakennukset ovat nuoria?',
      'Millä oopperalla Masqatin oopperatalo avattiin?',
      'Kuinka suuri suurmoskeijan matto on?',
      'Mitä Omanin kansallismuseossa on erityistä?',
      'Mikä Bait Al Zubair on?',
    ],
    lehti: [
      'Mikä dallah on?',
      'Miten lubania poltetaan mabkharassa?',
      'Miksi omanilaisessa dishdashassa ei ole kaulusta?',
      'Mistä omanilaisen miehen juhlapuku koostuu?',
      'Miten kahwa maustetaan?',
    ],
  },

  dubai: {
    laatta: [
      'Miksi Deiran kultatorilla koru punnitaan?',
      'Mitä abra-veneet ovat?',
      'Millaisia taloja Bastakian kaupunginosassa on?',
      'Mikä Al Fahidin linnoitus on?',
      'Miten Dubain metro kulkee ilman kuljettajaa?',
    ],
    lehti: [
      'Miksi Burj Khalifan huipulla paastotaan pidempään?',
      'Miten Palm Jumeirah rakennettiin merelle?',
      'Miten merivedestä tehdään juomavettä?',
      'Mitä lontoolainen lehti kertoi helmenpyynnistä?',
      'Mikä Al Ahmadiyan koulu oli?',
    ],
  },

  doha: {
    laatta: [
      'Mikä Souq Waqif on?',
      'Miksi Dohan metroasemat näyttävät erilaisilta?',
      'Kuka suunnitteli Qatarin kansalliskirjaston?',
      'Mikä Msheireb on?',
      'Mitä Al Koot -linnake vartioi?',
    ],
    lehti: [
      'Mitä madžbus on?',
      'Miksi hamour vaihtaa sukupuolta?',
      'Mitä garangao-iltana tehdään?',
      'Kuinka suuri Kataran amfiteatteri on?',
      'Miten qatarilainen ateria tuodaan pöytään?',
    ],
  },

  kuwait: {
    laatta: [
      'Miksi Al-Hashemi-II:ta ei ole laskettu vesille?',
      'Kuka suunnitteli Kuwaitin parlamenttitalon?',
      'Mikä Mubarakiyan tori on?',
      'Mitä Sadu House kertoo beduiinikudonnasta?',
      'Mikä Seifin palatsi on?',
    ],
    lehti: [
      'Miksi Tareq Rajab -museo on maan alla?',
      'Miten The Avenuesiin on tehty katuja sisälle?',
      'Kuinka kuuma Kuwaitissa on heinäkuussa?',
      'Miksi tammikuun aamut alkavat sumusta?',
      'Mitä Tieteen keskuksen akvaariossa ui?',
    ],
  },

  bagdad: {
    laatta: [
      'Mikä Bab al-Wastani on?',
      'Kenen hauta Zumurrud Khatunin kartio on?',
      'Mitä Mustansiriya-koulussa opetettiin?',
      'Mikä Mutanabbin katu on?',
      'Mitä Vapauden monumentti esittää?',
    ],
    lehti: [
      'Miksi al-Rashid-kadulla on pylväskäytäviä?',
      'Keitä al-Zahawin kahvilassa kävi?',
      'Mikä Khan Mirjan oli?',
      'Montako kahvilaa Bagdadissa aikanaan oli?',
      'Mitä Bagdadin museossa on esillä?',
    ],
  },

  mosul: {
    laatta: [
      'Mitä Mosulin arabiankielinen nimi tarkoittaa?',
      'Kuka oli Badr al-Din Lulu?',
      'Mikä Mosulin marmori oikeastaan on?',
      'Mitä Mosulille on tapahtunut viime vuosikymmeninä?',
      'Miksi Hadba-minareetti oli vino?',
    ],
    lehti: [
      'Miten messinkiin tehtiin upotekuvioita?',
      'Mikä kahdeksankulmiomerkki esineissä oli?',
      'Miten mosulilainen tekniikka levisi länteen?',
      'Mikä Qara Saray eli Musta palatsi oli?',
      'Millaisia seinälaattoja assyrialaispalatseissa oli?',
    ],
  },

  tabriz: {
    laatta: [
      'Mikä Maqbarat-o-shoara on?',
      'Miksi El Golin allas näyttää kelluvan?',
      'Kuinka korkealla Tabriz sijaitsee?',
      'Mikä Sininen moskeija on?',
      'Mitä Perustuslakitalossa tapahtui?',
    ],
    lehti: [
      'Montako runoilijaa Surkhabiin on haudattu?',
      'Mikä Amir Nezamin talo on nykyään?',
      'Kuinka usein Tabrizissa sataa lunta?',
      'Miksi Eynalin rinteille istutettiin metsä?',
      'Mitä Azerbaidžanin museossa on esillä?',
    ],
  },

  teheran: {
    laatta: [
      'Mikä Golestanin palatsi on?',
      'Mikä takyeh-talo oli?',
      'Miksi Kaupunginteatteri on pyöreä?',
      'Mitä Dar al-Fonunissa opetettiin?',
      'Mikä Toopkhanen aukio on?',
    ],
    lehti: [
      'Kuinka moni mahtui Takyeh Dowlatiin?',
      'Mitä Malekin kirjastossa säilytetään?',
      'Miten chelow kabab tarjoillaan?',
      'Miten abgusht syödään kahdessa vaiheessa?',
      'Mikä Masoudiehin talo on?',
    ],
  },

  isfahan: {
    laatta: [
      'Mitä Isfahanin kyyhkystorneissa kasvatettiin?',
      'Miksi Monar Jonbanin minareetit heiluvat yhdessä?',
      'Mikä Atashgahin kukkula on?',
      'Mikä Ali Qapu on?',
      'Mitä Isfahanin basaarissa myydään?',
    ],
    lehti: [
      'Miksi Uusi Julfa perustettiin joen eteläpuolelle?',
      'Miten laajalle Julfan kauppaverkosto ulottui?',
      'Millainen Vankin katedraali on sisältä?',
      'Kuka oli kelloseppä Jacques Rousseau?',
      'Mikä Chahar Baghin koulu on?',
    ],
  },

  persepolis: {
    laatta: [
      'Montako kuningasta terassia rakennutti?',
      'Mitä Kaikkien kansojen portilla tapahtui?',
      'Miten kulkueen kansat erotettiin toisistaan?',
      'Kuinka korkeita portin kivipylväät ovat?',
      'Minne Persepoliksen kivilöytöjä on hajaantunut?',
    ],
    lehti: [
      'Mitä Persepoliksen savitauluihin on kirjattu?',
      'Miksi tulipalo jätti kiven pystyyn?',
      'Kuka tunnisti rauniot uudelleen 1621?',
      'Mikä Apadana on?',
      'Mitä Aarrekammiosta on kaivettu esiin?',
    ],
  },

  tripoli: {
    laatta: [
      'Mitä nimi Tripoli oikeastaan tarkoittaa?',
      'Miksi vanhankaupungin kadut ovat roomalaisessa kaavassa?',
      'Mikä Marcus Aureliuksen riemukaari on?',
      'Mikä Punainen linna on?',
      'Mitä Tripolin kujilla taotaan yhä käsin?',
    ],
    lehti: [
      'Miten karavaani leiriytyi keskipäivällä?',
      'Miksi Ghadamesin kadut kulkevat talojen alla?',
      'Keitä Tripolin kaapparit olivat?',
      'Miksi fregatti Philadelphia poltettiin satamassa?',
      'Mikä an-Naqan moskeija on?',
    ],
  },

  jekaterinburg: {
    laatta: [
      'Miksi kaupunki rakennettiin padon ympärille?',
      'Miksi vanha rupla oli neliskulmainen kuparilaatta?',
      'Kuka oli Vasili Tatištšev?',
      'Mitä malakiitti on, ja mihin sitä käytettiin?',
      'Miksi Jekaterinburgia sanottiin ikkunaksi Aasiaan?',
    ],
    lehti: [
      'Kuinka vanha Šigirin suosta löytynyt puuveistos on?',
      'Mistä Bažovin Malakiittilipas kertoo?',
      'Mikä uusi alkuaine löytyi Uralin kultakaivoksen kivestä?',
      'Miksi Jekaterinburg oli Venäjän ainoa vuorikaupunki?',
      'Millainen talo on Kharitonovin kartano?',
    ],
  },

  astana: {
    laatta: [
      'Mikä Bajterek on, ja mitä sen kultainen muna tarkoittaa?',
      'Kuinka suuri Khan Shatyrin teltta on?',
      'Mitä nimi Aqmola tarkoittaa?',
      'Miksi kaupunki on vaihtanut nimeään kuusi kertaa?',
      'Kuinka kylmä Astanan talvi on?',
    ],
    lehti: [
      'Kuka suunnitteli uuden pääkaupungin kaavan?',
      'Mikä oli Bozok, joka oli täällä ennen kaupunkia?',
      'Mitä uudisviljelyskampanja teki Akmolinskille?',
      'Millainen rakennus Rauhan ja sovinnon pyramidi on?',
      'Mitä Akordan katolla oleva kuvio esittää?',
    ],
  },

  novosibirsk: {
    laatta: [
      'Mitä talonpoikien sanonta joki on putkessa tarkoitti?',
      'Kuinka suuri Novosibirskin oopperatalo on?',
      'Kuka on viulisti Vadim Repin?',
      'Miksi kaupungin nimi oli ennen Novonikolajevsk?',
      'Kuinka nopeasti kaupungista kasvoi miljoonakaupunki?',
    ],
    lehti: [
      'Miksi aseman nimi oli pitkään pelkkä Ob?',
      'Millainen oli Obin ensimmäinen rautatiesilta?',
      'Kuka arkkitehti piirsi kaupungin komeimmat talot?',
      'Miksi Aleksanteri Nevskin katedraali on punatiiltä?',
      'Mikä on Satohuoneiston talo?',
    ],
  },

  irkutsk: {
    laatta: [
      'Miksi Irkutskia sanottiin Siperian Pariisiksi?',
      'Mitä Kjahtan rajakaupan kautta tuotiin Kiinasta?',
      'Kuka oli ruhtinas Volkonski, ja miksi hän päätyi tänne?',
      'Mitä vuoden 1879 tulipaloissa tuhoutui?',
      'Miksi Irkutskin puutalot ovat niin koristeellisia?',
    ],
    lehti: [
      'Mistä laulu Loistava meri, pyhä Baikal kertoo?',
      'Millainen kala golomjanka on?',
      'Mitä Siperian barokki tarkoittaa?',
      'Miksi jäänmurtaja Angara tilattiin Englannista?',
      'Mitä 130. korttelissa on nähtävää?',
    ],
  },

  jakutsk: {
    laatta: [
      'Kuka perusti Jakutskin, ja milloin?',
      'Miksi linnoitus siirrettiin joen toiselle rannalle?',
      'Mikä soitin khomus on?',
      'Millainen joki Lena on?',
      'Kuka oli Kate Marsden?',
    ],
    lehti: [
      'Miksi kauppias Šergin kaivatti kuiluaan yhdeksän vuotta?',
      'Mitä Jakutskin mammuttimuseossa on?',
      'Miten Lenan pilarit ovat syntyneet?',
      'Miksi Jakutskissa on peräti neljä teatteria?',
      'Kuka oli kirjailija Platon Ojunski?',
    ],
  },

  magadan: {
    laatta: [
      'Miksi Nagajevanlahti valittiin sataman paikaksi?',
      'Miten kaupunki sai alkunsa vuonna 1929?',
      'Miksi Magadaniin ei tule rautatietä?',
      'Kuka oli laulaja Vadim Kozin?',
      'Ketä Surun maski -muistomerkki muistaa?',
    ],
    lehti: [
      'Miksi kaupungin yleinen sauna on suojeltu rakennus?',
      'Mitä lyhenne SVZ tarkoittaa?',
      'Kuinka paljon lintuja Jamskin saarilla pesii?',
      'Miksi kyttyrälohelle kasvaa selkään kyttyrä?',
      'Kuinka suuri lintu kuningasmerikotka on?',
    ],
  },

  kamtsatka: {
    laatta: [
      'Mistä Petropavlovsk sai nimensä?',
      'Kuka oli Stepan Krašeninnikov?',
      'Keitä itelmeenit ovat?',
      'Mitä jukola tarkoittaa?',
      'Kuinka pitkä Kamtšatkan niemimaa on?',
    ],
    lehti: [
      'Miksi korppi Kutkhia moitittiin liiasta ahkeruudesta?',
      'Kuinka korkea Kljutševskaja sopka on?',
      'Mitkä ovat Petropavlovskin kotitulivuoret?',
      'Miten Gejsirien laakso löydettiin?',
      'Miksi juuri täällä maankuori liikkuu niin paljon?',
    ],
  },

  sahalin: {
    laatta: [
      'Kuinka pitkä ja kapea saari Sahalin on?',
      'Miksi kartanpiirtäjät epäilivät Sahalinia niemeksi?',
      'Miten saarella kala säilöttiin ilman suolaa?',
      'Millainen talo oli ryv-kuoppatalo?',
      'Kuka oli Bronisław Piłsudski?',
    ],
    lehti: [
      'Miksi Anton Tšehov matkusti Sahalinille?',
      'Mitä Tšehov kirjasi kymmeneentuhanteen korttiinsa?',
      'Miksi saarelle perustettiin pakkotyösiirtola?',
      'Mitä vuoden 1875 sopimuksessa vaihdettiin?',
      'Millaista työtä saaren vangit tekivät?',
    ],
  },

  vladivostok: {
    laatta: [
      'Miksi lahti sai nimen Kultainen sarvi?',
      'Kuka oli Nikolai Muravjov-Amurski?',
      'Miksi Vladivostokissa on funikulaari?',
      'Millainen metsä Ussurin taiga on?',
      'Kuka oli täällä syntynyt näyttelijä Yul Brynner?',
    ],
    lehti: [
      'Kuinka suuri amurintiikeri on?',
      'Kuka oli opas Dersu Uzala?',
      'Miksi kaupungin ympärille rakennettiin merilinnoitus?',
      'Mikä oli kauppahuone Kunst & Albers?',
      'Miksi Pokrovskin puisto oli ennen hautausmaa?',
    ],
  },

  ulanbator: {
    laatta: [
      'Miksi kaupungin nimi on vaihtunut viisi kertaa?',
      'Miten luostarikaupunki vaelsi paikasta toiseen?',
      'Mikä Naadam-juhla on?',
      'Kuka oli Bogd Khan?',
      'Miksi Ulan Bator on maailman kylmin pääkaupunki?',
    ],
    lehti: [
      'Miksi jurtta-alueet kasvoivat 1990-luvun jälkeen?',
      'Millainen luostari Gandantegchinlen on?',
      'Mitä teekaravaanit kuljettivat Urgan kautta?',
      'Kuka oli Zanabazar?',
      'Mihin Choijin Laman temppeliä käytettiin?',
    ],
  },

  peking: {
    laatta: [
      'Kuinka monta huonetta keisarin palatsissa oikeasti on?',
      'Miksi Peking-ankka paistetaan riippu-uunissa?',
      'Mitä nimi Beijing tarkoittaa?',
      'Miksi kaupungilla on ollut viisi eri nimeä?',
      'Miten Peking-ooppera sai alkunsa?',
    ],
    lehti: [
      'Miksi Taivaan temppelissä toistuu luku yhdeksän?',
      'Mitä Vanhalle kesäpalatsille tapahtui vuonna 1860?',
      'Miksi Jingshanin kukkula on kasattu käsivoimin?',
      'Mihin rumpu- ja kellotornia käytettiin?',
      'Miksi Yonghe-temppelin katot ovat keltaiset?',
    ],
  },

  soul: {
    laatta: [
      'Kuinka pitkä Soulin vanha kaupunginmuuri oli?',
      'Mitä Namdaemunin portille tapahtui vuonna 2008?',
      'Millainen talo hanok on?',
      'Miten palatsin vartionvaihto esitetään?',
      'Mikä jjimjilbang on?',
    ],
    lehti: [
      'Kuka rakennutti Bukchonin hanok-korttelin?',
      'Miksi kuninkaat viihtyivät Changdeokgungissa paremmin?',
      'Mikä Jongmyon esi-isien pyhäkkö on?',
      'Miksi Bosingakin kelloa lyötiin 33 kertaa?',
      'Mikä on pojangmacha eli katettu vaunu?',
    ],
  },

  kioto: {
    laatta: [
      'Miksi Kioto säästyi toisen maailmansodan pommituksilta?',
      'Mitä eroa on geikolla ja maikolla?',
      'Mikä Ōnin-sota oli?',
      'Mitä kaupungille tapahtui, kun keisari muutti 1869?',
      'Miksi Kioton kadut kulkevat suorassa ruudukossa?',
    ],
    lehti: [
      'Miksi Kultainen paviljonki on kolmea eri rakennustapaa?',
      'Miksi Hopeista paviljonkia ei koskaan hopeoitu?',
      'Millainen on Kiyomizu-deran puinen lava?',
      'Kuinka monta Kannon-patsasta Sanjūsangen-dōssa on?',
      'Miksi Fushimi Inarilla on tuhansia punaisia portteja?',
    ],
  },

  xian: {
    laatta: [
      'Miksi kaupungin nimi oli ennen Chang’an?',
      'Miksi Kellotornia siirrettiin kilometrin verran?',
      'Miksi Rumpitorni ja Kellotorni ovat pari?',
      'Miksi kaupungin suuressa moskeijassa ei ole minareettia?',
      'Miksi Xi’an oli niin monen dynastian pääkaupunki?',
    ],
    lehti: [
      'Kuinka suuri Weiyangin palatsi oli?',
      'Millainen ruudukkokaupunki Tang-ajan Chang’an oli?',
      'Kuka oli munkki Xuanzang?',
      'Miksi Suuri villihanhipagoda rakennettiin?',
      'Mikä Steelametsän museo on?',
    ],
  },

  shanghai: {
    laatta: [
      'Millainen talo shikumen on?',
      'Millaista elämää lilong-kujakorttelissa vietetään?',
      'Millainen kieli shanghain murre on?',
      'Mitä Shanghaissa syödään aamiaiseksi?',
      'Milloin Shanghai avattiin ulkomaankaupalle?',
    ],
    lehti: [
      'Kuka rakennutti Yun puutarhan ja kenelle?',
      'Mistä Hienohko jadekivi on peräisin?',
      'Miksi Waibaidun sillan ylityksestä piti maksaa?',
      'Mitä puiston avioliittotorilla tehdään?',
      'Miksi Dajingin pavilonki on ainoa muurin jäänne?',
    ],
  },

  taipei: {
    laatta: [
      'Miten teekauppa kasvatti kylistä kaupungin?',
      'Keitä Ketagalan-kansa oli?',
      'Miksi kaupunginmuuri ei aluksi pysynyt pystyssä?',
      'Mitä Beitoun kuumissa lähteissä tehdään?',
      'Mitä Dihua-kadulla myytiin 1800-luvulla?',
    ],
    lehti: [
      'Miksi kaupunkia kutsuttiin aikanaan Taihokuksi?',
      'Millainen rakennus Punainen talo alun perin oli?',
      'Kuinka kauan palatsimuseon kokoelma oli matkalla?',
      'Miksi Lungshan-temppeli on rakennettu monta kertaa?',
      'Mikä Bopiliaon vanha kortteli on?',
    ],
  },

  hongkong: {
    laatta: [
      'Miksi Hongkongissa rakennetaan niin korkealle?',
      'Milloin kaksikerroksiset raitiovaunut tulivat kaduille?',
      'Millainen vene sampaani on?',
      'Miksi Victoria-satama on niin hyvä satama?',
      'Mitä Victoria Peakilla on nähtävää?',
    ],
    lehti: [
      'Miksi Hongkong syntyi kolmessa eri osassa?',
      'Kuka löysi ruttobakteerin Hongkongissa vuonna 1894?',
      'Kenelle Man Mo -temppeli on omistettu?',
      'Miksi Tsim Sha Tsuin kellotorni seisoo yksinään?',
      'Millainen talo on parvekkeellinen tong lau?',
    ],
  },

  kanton: {
    laatta: [
      'Mitä kolmetoista faktoriaa olivat?',
      'Miksi suuret purjelaivat ankkuroivat Whampoaan?',
      'Miltä 1800-luvun Kanton näytti kattojen yli?',
      'Mikä Cohong-kilta oli?',
      'Miksi kaupunkia sanotaan kukkien kaupungiksi?',
    ],
    lehti: [
      'Mitä Kantonista lastattiin laivoihin länteen vietäväksi?',
      'Kuka oli hong-kauppias Wu Bingjian?',
      'Miksi Shamianin särkästä tehtiin saari?',
      'Millainen rakennus Chenin suvun sali on?',
      'Miksi Zhenhai-torni rakennettiin juuri kukkulalle?',
    ],
  },

  manila: {
    laatta: [
      'Mikä Manilan galleonikauppa oli?',
      'Miksi Intramuros ympäröitiin kivimuurilla?',
      'Mikä Binondon kortteli on?',
      'Millainen paikka Maynila oli ennen espanjalaisia?',
      'Mikä Rizal-puisto on?',
    ],
    lehti: [
      'Miksi San Agustinin kirkko on yhä pystyssä?',
      'Mitä maanjäristysbarokki tarkoittaa?',
      'Miksi Manilan katedraali rakennettiin kahdeksan kertaa?',
      'Mistä Escolta-katu sai nimensä?',
      'Millainen linnoitus Fort Santiago on?',
    ],
  },

  hanoi: {
    laatta: [
      'Mitä nimi Thăng Long tarkoittaa?',
      'Miksi Vanhassakaupungissa puhutaan 36 kadusta?',
      'Mistä Hoàn Kiếm -järvi sai nimensä?',
      'Mitä sana hàng kadunnimissä tarkoittaa?',
      'Miksi kaupunki on vaihtanut nimeä niin monta kertaa?',
    ],
    lehti: [
      'Mitä kivikilpikonnien selässä oleviin steeloihin kaiverrettiin?',
      'Miksi Yhden pilarin pagodi rakennettiin lammelle?',
      'Kuka oli kenraali Gao Pian?',
      'Kuinka pitkä Long Biênin silta on?',
      'Mikä Ô Quan Chưởng -portti on?',
    ],
  },

  bangkok: {
    laatta: [
      'Miksi Bangkokia sanottiin idän Venetsiaksi?',
      'Miksi moni Bangkokin kanava täytettiin kaduiksi?',
      'Kuka oli kuningas Chulalongkorn?',
      'Miten Siam säilyi itsenäisenä siirtomaavallan aikana?',
      'Miksi katukeittiöt ovat Bangkokissa niin tavallisia?',
    ],
    lehti: [
      'Miksi Rama I siirsi pääkaupungin joen itärannalle?',
      'Miten orjuus lakkautettiin Siamissa?',
      'Mistä Wat Arunin posliinikoristeet ovat peräisin?',
      'Mikä Sao Ching Cha eli jättiläiskeinu oli?',
      'Miksi Wat Phossa opetetaan hierontaa?',
    ],
  },

  yangon: {
    laatta: [
      'Miksi Yangonin keskustassa on numeroituja katuja?',
      'Kuinka korkea Shwedagon-pagodi on?',
      'Millainen kaupunki Yangon oli ennen brittejä?',
      'Miksi Yangon kasvoi juuri joen suistoon?',
      'Miksi pagodeja peitetään kultalehdellä?',
    ],
    lehti: [
      'Ketkä perustivat Dagonin kylän Shwedagonin juurelle?',
      'Miksi britit pitivät Shwedagonia linnoituksenaan?',
      'Miten Shwedagonin suuri kello nostettiin joesta?',
      'Miksi Botataung-pagodi on sisältä ontto?',
      'Ketkä veljekset omistivat Strand-hotellin?',
    ],
  },

  mandalay: {
    laatta: [
      'Miksi Mandalay rakennettiin täsmällisen neliön muotoon?',
      'Mitä profetia lupasi Mandalay-kukkulan juurelle?',
      'Kuinka leveä palatsin vallihauta on?',
      'Miksi kaupunki sai nimensä kukkulalta?',
      'Millaista elämä burmalaisessa luostarissa on?',
    ],
    lehti: [
      'Mikä on maailman suurin kirja, ja missä se on?',
      'Miksi Mindon lähetti oppilaita Eurooppaan?',
      'Kuka rakennutti U Bein -sillan ja milloin?',
      'Miksi Shwenandaw-luostari siirrettiin palatsista pois?',
      'Mistä Mahamuni-temppelin Buddha-kuva tuotiin?',
    ],
  },

  singapore: {
    laatta: [
      'Kuka oli Stamford Raffles?',
      'Miksi Singaporen satamassa ei peritty tullia?',
      'Miten saaren väkiluku kasvoi tuhannesta 1800-luvulla?',
      'Miksi kaupunki jaettiin kansanryhmien kortteleihin?',
      'Mitä kieliä Singaporessa puhutaan?',
    ],
    lehti: [
      'Mikä oli Jackson-suunnitelma?',
      'Kuka oli Naraina Pillai?',
      'Miksi Cavenagh-silta jäi liian matalaksi?',
      'Millainen paikka Boat Quay oli 1860-luvulla?',
      'Mistä Merlion-hahmo on peräisin?',
    ],
  },

  sumatra: {
    laatta: [
      'Kuinka suuri saari Sumatra on?',
      'Miksi Sumatralla on niin paljon tulivuoria?',
      'Mikä oli Acehin sulttaanikunta?',
      'Miksi pippuri teki Sumatrasta rikkaan?',
      'Miksi Sumatralla tuntuu usein maanjäristyksiä?',
    ],
    lehti: [
      'Kuinka kauas Krakataun räjähdys kuului vuonna 1883?',
      'Miksi Toba-järvi on oikeastaan romahtanut kuoppa?',
      'Miten sumatrantiikeri eroaa muista tiikereistä?',
      'Mikä on titaanivehka eli maailman suurin kukinto?',
      'Kuinka paljon Sumatran sademetsää on hävinnyt?',
    ],
  },

  borneo: {
    laatta: [
      'Keitä olivat Borneon valkoiset radžat?',
      'Ketkä ovat dajakit?',
      'Mistä Borneo sai nimensä?',
      'Mitä Borneolta vietiin kauppatavarana vanhastaan?',
      'Miksi päiväntasaaja tekee Borneosta niin sateisen?',
    ],
    lehti: [
      'Mitä Alfred Russel Wallace teki Sarawakissa?',
      'Miksi sademetsää sanotaan dinosaurusten ikäiseksi?',
      'Miten liitävä sammakko liikkuu puiden välillä?',
      'Miksi Kinabalun huipulla kasvaa omia lajejaan?',
      'Kuinka suuri borneonoranki on?',
    ],
  },

  jakarta: {
    laatta: [
      'Miksi Jakarta on vaihtanut nimeä neljästi?',
      'Millainen kaupunki Batavia oli?',
      'Mikä oli VOC eli Hollannin Itä-Intian kauppakomppania?',
      'Mitä Kota Tua eli vanhakaupunki on?',
      'Miksi hollantilaiset kaivoivat Bataviaan kanavia?',
    ],
    lehti: [
      'Mitä Fatahillah-aukion vanha kaupungintalo oli?',
      'Kuka rakennutti Toko Merahin punaisen talon?',
      'Millaisia laivoja Sunda Kelapaan saapuu yhä?',
      'Miksi Kota Intanin nostosilta rakennettiin?',
      'Mikä on Monas, ja miksi se pystytettiin?',
    ],
  },

  lhasa: {
    laatta: [
      'Kuka rakennutti Potalan, ja miksi?',
      'Miksi Jokhangin ympäri kuljetaan myötäpäivään?',
      'Miten kaupungissa hengittää näin korkealla?',
      'Millaista oli munkkiyliopiston opiskelu?',
      'Miksi Lhasa oli 1800-luvulla suljettu kaupunki?',
    ],
    lehti: [
      'Kuka oli Songtsen Gampo?',
      'Miksi Norbulingkaa sanotaan Jalokivipuistoksi?',
      'Ketkä olivat pyhiinvaeltajiksi pukeutuneet mittamiehet?',
      'Mitä Sera-luostarin väittelyharjoituksissa tehdään?',
      'Millainen paikka Ramoche-temppeli on?',
    ],
  },

  kathmandu: {
    laatta: [
      'Mistä Kathmandu sai nimensä?',
      'Ketkä ovat newarit?',
      'Miksi Nepal oli pitkään suljettu ulkomaalaisilta?',
      'Miksi laakson taloissa on veistettyjä puuikkunoita?',
      'Miksi laaksossa on kolme Durbar-aukiota?',
    ],
    lehti: [
      'Miksi laakson uskotaan olleen ennen järvi?',
      'Ketkä olivat Rana-suvun pääministerit?',
      'Miksi Swayambhunathin stupassa on silmät?',
      'Mikä on Rani Pokhari eli Kuningattaren allas?',
      'Kuinka korkea Dharahara-torni on?',
    ],
  },

  delhi: {
    laatta: [
      'Miksi Delhi on rakennettu seitsemän kertaa?',
      'Kuka oli Shah Jahan?',
      'Mitä Chandni Chowkilla myydään?',
      'Miksi linnoitusta sanotaan Punaiseksi linnoitukseksi?',
      'Millainen valtakunta Mughal-valtakunta oli?',
    ],
    lehti: [
      'Kuka suunnitteli Chandni Chowkin kauppakadun?',
      'Mitä Jama Masjidin vanha nimi tarkoittaa?',
      'Kuka rakennutti Humayunin mausoleumin?',
      'Miten rautatie muutti Delhiä 1800-luvulla?',
      'Kuka oli Mughal-valtakunnan viimeinen keisari?',
    ],
  },

  kolkata: {
    laatta: [
      'Miksi Kolkatasta tuli juutin ja teen satama?',
      'Mikä Itä-Intian kauppakomppania oli?',
      'Miksi pääkaupunki siirrettiin Delhiin?',
      'Millaista bengalilainen ruoka on?',
      'Ketkä olivat babut?',
    ],
    lehti: [
      'Millainen oli Hooghlyn kelluva ponttonisilta?',
      'Miksi College Streetillä myydään kirjoja kadulla?',
      'Kuka rakennutti Marble Palacen?',
      'Mitä varten Writers’ Building rakennettiin?',
      'Miksi Victoria Memorial pystytettiin?',
    ],
  },

  varanasi: {
    laatta: [
      'Mikä ghat on, ja mihin niitä käytetään?',
      'Miksi pyhiinvaeltajat kylpevät Gangesissa?',
      'Mitä Banarasi-sari tarkoittaa?',
      'Miksi kaupunkia sanotaan valon kaupungiksi?',
      'Kuinka vanha kaupunki Varanasi on?',
    ],
    lehti: [
      'Mitä moksa merkitsee hindulaisessa perinteessä?',
      'Miksi Man Mandirin katolle rakennettiin tähtitorni?',
      'Miten Banarasi-brokadi kudotaan?',
      'Kuka rakennutti Ramnagarin linnoituksen?',
      'Mitä Mark Twain kirjoitti Benaresista?',
    ],
  },

  mumbai: {
    laatta: [
      'Miten seitsemästä saaresta tuli yksi niemi?',
      'Miksi Bombay rikastui puuvillasta?',
      'Milloin nimi vaihtui Bombaysta Mumbaiksi?',
      'Mistä nimi Mumbai tulee?',
      'Millaista goottilaista arkkitehtuuria kaupungissa on?',
    ],
    lehti: [
      'Mistä Intian ensimmäinen matkustajajuna lähti?',
      'Miksi Gateway of Indialle ei rakennettu tietä?',
      'Kuka oli David Sassoon?',
      'Kuinka korkea Rajabain kellotorni on?',
      'Kuka lahjoitti Crawford Marketin kaupungille?',
    ],
  },

  chennai: {
    laatta: [
      'Miksi Fort St. George rakennettiin juuri tähän?',
      'Miten Madrasista tuli Chennai?',
      'Kuinka pitkä Marina Beachin ranta on?',
      'Millaista tamililainen temppeliarkkitehtuuri on?',
      'Miksi Madrasilla ei ollut luonnonsatamaa?',
    ],
    lehti: [
      'Kuka oli Francis Day?',
      'Miksi Marina-rannasta tuli niin leveä?',
      'Milloin Etelä-Intian ensimmäinen rautatie avattiin?',
      'Kuka oli Elihu Yale?',
      'Kuinka vanha Kapaleeshwararin temppeli on?',
    ],
  },

  colombo: {
    laatta: [
      'Miksi kaneli oli Colombolle niin tärkeä?',
      'Ketkä kolme eurooppalaisvaltaa hallitsivat Colomboa?',
      'Milloin linnoituksen muurit purettiin?',
      'Mikä Galle Face on?',
      'Millaista sri lankalainen ruoka on?',
    ],
    lehti: [
      'Kuka istutti saaren ensimmäiset teepensaat?',
      'Miksi Beira-järvi kaivettiin?',
      'Miksi Fortin kellotorni odotti varastossa 43 vuotta?',
      'Millainen rakennus Wolvendaalin kirkko on?',
      'Miksi Punaista moskeijaa sanotaan punaiseksi?',
    ],
  },

  karachi: {
    laatta: [
      'Miksi Karachin satama kasvoi niin nopeasti?',
      'Millaisia kaupunginosia Karachissa on?',
      'Mikä Saddar on?',
      'Miksi vehnä kulki Karachin kautta maailmalle?',
      'Millaista arkkitehtuuria siirtomaakortteleissa on?',
    ],
    lehti: [
      'Mitä varten Frere Hall alun perin rakennettiin?',
      'Kuka oli sir William Merewether?',
      'Miksi Empress Market sai keisarinnan nimen?',
      'Kuka syntyi Wazir Mansionin talossa?',
      'Milloin Karachin ensimmäinen rautatie valmistui?',
    ],
  },

  kabul: {
    laatta: [
      'Kuka oli Babur, ja miksi hän rakasti Kabulia?',
      'Millaisia basaareja vanhassakaupungissa on?',
      'Mikä Bala Hissar on?',
      'Miksi Kabulia sanottiin Hindustanin portiksi?',
      'Millaista ruokaa Kabulin basaareissa myydään?',
    ],
    lehti: [
      'Millainen katettu basaari Char Chatta oli?',
      'Miksi Baburin puutarhat rakennettiin rinteeseen?',
      'Kuka oli Timur Shah Durrani?',
      'Mitä Afganistanin kansallismuseon kokoelmassa oli?',
      'Mikä on Ka Faroshin lintutori?',
    ],
  },

  samarkand: {
    laatta: [
      'Miksi Samarkandin rakennukset ovat sinisiä?',
      'Mikä medrese on?',
      'Miten Silkkitien karavaanit kulkivat?',
      'Kuinka vanha kaupunki Samarkand on?',
      'Millaista uzbekkiruokaa täällä syödään?',
    ],
    lehti: [
      'Kenelle Gur-e-Amir alun perin rakennettiin?',
      'Miksi Bibi-Khanymin moskeija oli liian suuri?',
      'Mikä on Shah-i-Zindan hautakuja?',
      'Mitä Afrasiyabin rauniokummun alta on löytynyt?',
      'Miksi Samarkandissa oli pitkä hiljainen kausi?',
    ],
  },

  kashgar: {
    laatta: [
      'Millainen keidaskaupunki Kašgar on?',
      'Miksi vanhakaupunki on rakennettu savitiilestä?',
      'Kuinka suuri Id Kahin moskeija on?',
      'Millaista uiguurilainen ruoka on?',
      'Miksi Silkkitien haarat kohtasivat juuri täällä?',
    ],
    lehti: [
      'Kuka oli Afaq Khoja?',
      'Mikä Chini-Bagh oli?',
      'Ketkä Macartneyt asuivat Kašgarissa?',
      'Kuka oli Yusuf Khass Hajib?',
      'Miksi Mannerheim tuli Kašgariin vuonna 1906?',
    ],
  },
};

/**
 * Valmiskysymykset yhteen tilanteeseen.
 *
 * TÄMÄ ON AINOA OVI PAKKAAN: js/pollo.js kutsuu vain tätä, joten
 * vaiheessa 2 sisällön voi vaihtaa palvelimelta haettuun (tai
 * uudelleengeneroituun) muuttamatta kutsujaa.
 *
 * @param {string} kaupunkiId laudan kaupunki-id (esim. 'firenze')
 * @param {'laatta'|'lehti'} konteksti missä pelaaja on
 * @returns {string[]} kysymykset, tai tyhjä lista jos niitä ei ole
 */
export function haeValmiskysymykset(kaupunkiId, konteksti) {
  const lista = POLLO_VALMISKYSYMYKSET[kaupunkiId]?.[konteksti];
  return Array.isArray(lista) ? lista : [];
}
