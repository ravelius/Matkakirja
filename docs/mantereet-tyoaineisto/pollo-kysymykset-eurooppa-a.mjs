/*
 * PÖLLÖN VALMISKYSYMYKSET — EUROOPPA, ERÄ A (20 kaupunkia).
 *
 * Työaineistofragmentti: Fable kokoaa nämä lohkot pakettiin
 * js/packs/pollo-kysymykset.js. Muoto ja säännöt ovat paketin
 * alkukommentista ja Raamatun Viisas Pöllö -osiosta:
 *
 *   - konteksti 'laatta' = pelaaja seisoo kaupungissa kartalla
 *     (yleisempiä, uteliaisuutta herättäviä kysymyksiä)
 *   - konteksti 'lehti'  = kaupungin lehti on auki
 *     (syventäviä, lehden omasta sisällöstä)
 *   - täsmälleen 5 + 5 kysymystä, suomeksi, pelaajan äänellä,
 *     enintään 70 merkkiä, päättyy kysymysmerkkiin
 *
 * Aiheet on poimittu pelin omasta aineistosta: kaupungin lohko
 * js/packs/kulttuuri-kategoriat.js:stä (johdannot, nostot, avauskuvat)
 * ja js/packs/nahtavyysjutut.js:stä. Jokainen kaupungin kulttuurivisan
 * kysymys (js/packs/europe-kulttuuri.js EUROPE_KULTTUURI[id].kysymys)
 * on käyty läpi, eikä yksikään alla oleva kysymys kysy tai paljasta
 * samaa asiaa. Juonispoilereita (aarteet, kohtaamiset) ei ole.
 */

export const LOHKO = {
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
};
