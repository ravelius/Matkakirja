/*
 * PÖLLÖN VALMISKYSYMYKSET — Lähi-idän lauta (26 kaupunkia) ja
 * Afrikan laudan Tripoli. Työaineisto, joka sulautetaan
 * js/packs/pollo-kysymykset.js:ään samassa muodossa kuin pilottierä.
 *
 * Istanbul EI ole tässä erässä (Eurooppa-erä hoitaa sen).
 *
 * Kaava (js/packs/pollo-kysymykset.js alkukommentti + Raamatun
 * VALMISKYSYMYKSET-linjaus):
 *   'laatta' — yleisempiä, pelaaja seisoo kaupungissa laudalla
 *   'lehti'  — syventäviä, kaupungin oma lehti on auki
 *   täsmälleen 5 + 5, suomeksi, pelaajan äänellä, ≤ 70 merkkiä
 *
 * Aiheet on poimittu pelin omasta aineistosta: kaupungin lohko
 * js/packs/kulttuuri-kategoriat.js:stä (johdannot ja nostot) sekä
 * js/packs/nahtavyysjutut.js:n kohteista. Päällekkäisyys on
 * tarkistettu kaupungin kulttuurivisan kysymys-kenttää (kulttuuri-
 * kategoriat.js) ja js/packs/middleeast-questions.js:n /
 * africa-questions.js:n laattavisoja vasten — yksikään kysymys ei
 * paljasta visavastausta eikä juonta.
 *
 * HERKÄT KOHTEET (Raamatun Rajaukset + VAIKEAT NYKYAIHEET):
 *   Mekka ja Medina — vain kunnioittavia kulttuuri-, arkkitehtuuri- ja
 *   pyhiinvaellushistorian kysymyksiä.
 *   Halab, Damaskos, Mosul, Sana — pääpaino historiassa ja
 *   kulttuurissa; tuhoutumisesta on kussakin enintään yksi neutraali
 *   "mitä tapahtui" -kysymys, ei osapuolikysymyksiä.
 *   Teheran, Tabriz, Isfahan — kulttuuria, ei nykypolitiikkaa.
 */

export const LOHKO = {
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
};
