/*
 * PÖLLÖN VALMISKYSYMYKSET — Eurooppa, erä B (19 kaupunkia).
 *
 * Työaineisto: valmis siirrettäväksi sellaisenaan pakkaan
 * js/packs/pollo-kysymykset.js (POLLO_VALMISKYSYMYKSET). Muoto ja taso
 * on otettu pilottikaupungeista (firenze, pariisi, helsinki).
 *
 * Säännöt, joiden mukaan nämä on kirjoitettu (Raamattu, Viisas Pöllö →
 * VALMISKYSYMYKSET):
 *   - täsmälleen 5 kysymystä kumpaankin tilanteeseen ('laatta' ja 'lehti')
 *   - suomeksi, pelaajan äänellä, enintään 70 merkkiä
 *   - aiheet pelin omasta aineistosta (js/packs/kulttuuri-kategoriat.js,
 *     js/packs/nahtavyysjutut.js)
 *   - 'laatta' = yleisempi, uteliaisuutta herättävä; 'lehti' = syventävä,
 *     lehden omasta sisällöstä
 *   - EI visavastauksia: jokainen kysymys on tarkistettu kaupungin
 *     EUROPE_KULTTUURI[id].kysymys-kenttää ja kategorioiden tehtava-
 *     kenttiä vasten, eikä paljasta tai kysy samaa
 *   - EI juonispoilereita: pöllö on tiedon hahmo, ei tarinan
 *
 * HERKÄT KAUPUNGIT (Raamattu, Rajaukset ja turvalinjat): kiova, moskova,
 * pietari ja sarajevo on kirjoitettu ilman nykysotaa ja nykypolitiikkaa —
 * kulttuuri ja historia kantavat. Sarajevon vuoden 1914 laukaukset ja
 * Leningradin sinfonia ovat perushistoriaa, ja ne on muotoiltu
 * neutraalisti tapahtumina, ei osapuolina.
 */

export const LOHKO = {
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
};
