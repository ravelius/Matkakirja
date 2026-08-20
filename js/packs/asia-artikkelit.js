// Matkakirjan omat artikkelit Aasian ja Lähi-idän kaupungeista.
//
// Omistajan päätös: "Kirjoitathan wiki artikkelit itse vielä uudestaan.
// Ovat yleensä liian pitkiä ja tyyli vaihtelee." Wikipedian teksti on
// tarkkaa mutta kirjoitettu tietosanakirjaksi, ei ääneen luettavaksi,
// ja sen pituus vaihtelee kaupungista toiseen kymmenkertaisesti.
//
// Muoto on sama kuin EUROPE_ARTIKKELIT-taulussa:
//   intro   — ETUSIVUN LEIPÄTEKSTI. Tekstiremontti 20.8.2026 (Raamattu,
//             "TEKSTIEN PAINOPISTE") vaihtoi mitan: 7–10 virkkeen
//             johdatus, ~700–1100 merkkiä, 2–3 kappaletta '\n\n'-rajalla
//             ja 1–3 maltillista **lihavointia**. Vanhat kahden lauseen
//             introt kirjoitetaan uusiksi erissä; erä R2 (20.8.2026) teki
//             Jerusalemin, Siinain, Persepoliksen ja Rub al-Khalin.
//             Renderöijä tekee kappaleet ja boldit — ei HTML:ää tänne.
//   teksti  — kolme kappaletta, yhteensä 800–1000 merkkiä. Ensimmäinen
//             kertoo missä ollaan, toinen mitä täällä on tapahtunut,
//             kolmas millaista täällä on nyt.
//
// Avaimena wiki-otsikko, sama jolla cachedSummary hakee. Tekstit on
// kirjoitettu Wikipedian pohjalta, joten lähdemaininta säilyy
// dialogissa.
//
// Ei ylisanoja eikä huutomerkkejä: nuoren herran innostus kuuluu
// saapumistekstissä, ja tämä on se rauhallinen ääni, joka kertoo
// taustan.
//
// TEKSTIREMONTTI 20.8.2026 (Raamattu, "TEKSTIEN PAINOPISTE"):
// intro EI OLE ENÄÄ kaksi lausetta vaan lehden ETUSIVUN LEIPÄTEKSTI —
// 7–10 virkkeen johdatus (~700–1100 mrk) siihen, millainen kaupunki
// on ja mikä sen merkitys ja historia. Omistajan lisäys samana
// päivänä: intro jaetaan 2–3 kappaleeseen '\n\n'-rajalla kuten
// teksti-kentässä, ja 1–3 avainkohtaa saa lihavoida **näin**.
// Remontti etenee erissä; erässä R3 uuteen asuun kirjoitettiin
// Mosul, Aleppo, Damaskos ja Luxor, erässä R4 Sanaa, Aden, Masqat
// ja Tabriz, erässä R5 Riad, Doha, Kuwait ja Salalah ja erässä R6
// Teheran ja Bagdad (saman erän Istanbul on europe-artikkelit.js:ssä
// ja Kairo africa-artikkelit.js:ssä) ja erässä R7 Tokio, Soul,
// Shanghai, Peking, Delhi ja Bangkok. Kappaleet ja boldit vaativat
// leipätekstin renderöijän — ks. erän loppuraportti.
//
// ERÄ R6 (20.8.2026) SAI HALLINNOLLISET JA VÄESTÖLUVUT en-Wikipedian
// raakateksteistä (Tehran, Baghdad; haettu 20.8.2026): Teheran on
// Iranin pääkaupunki, maan suurin kaupunki ja Teheranin maakunnan
// hallinnollinen keskus, asukkaita noin yhdeksän miljoonaa; Bagdad on
// Irakin pääkaupunki ja suurin kaupunki, asukkaita noin kahdeksan
// miljoonaa eli 22 prosenttia maan väestöstä, ja se oli osmanien
// Irakin hallintokeskus. Muu aineisto tulee kaupunkien omista, jo
// tarkistetuista lehtiteksteistä. Sisältölinjaus: Teheranista ei
// kirjoiteta vuoden 1979 jälkeisiä kiistoja eikä Bagdadista
// nykytilannetta — sota vain neutraalina historiana (1258).
//
// ERÄ R7 (20.8.2026) EI OTTANUT UUSIA LÄHTEITÄ: jokainen introväite
// tulee kaupungin omista, jo tarkistetuista lehtiteksteistä
// (kulttuuri-kategoriat.js:n nostot ja matkaoppaat,
// nahtavyysjutut.js, maakartat.js) tai kaupungin omasta
// teksti-kentästä. Sisältölinjaus: Kiinan kaupunkien introissa ei
// nykypolitiikkaa, ja Soulin introssa ei sotaa, koska lehti ei sitä
// kerro.
// ja Tabriz, erässä R5 Riad, Doha, Kuwait ja Salalah ja erässä R9b
// Jakutsk, Magadan, Kamtšatka ja Sahalin. Kappaleet ja boldit
// vaativat leipätekstin renderöijän — ks. erän loppuraportti.
// ja Tabriz, erässä R5 Riad, Doha, Kuwait ja Salalah ja erässä R9a
// Jekaterinburg, Novosibirsk, Irkutsk ja Vladivostok. Kappaleet ja
// boldit vaativat leipätekstin renderöijän — ks. erän loppuraportti.
// ERÄ R9a (20.8.2026) EI TUONUT UUSIA VÄITTEITÄ: neljän Siperian ja
// Uralin kaupungin introt on koottu kaupunkien omista, jo
// tarkistetuista lehtiteksteistä (kulttuuri-kategoriat.js: nostot,
// matkaoppaat ja niiden kappale-kentät; maakartat.js: kohdekarttojen
// esittelyt; oma teksti-kenttä). Venäjä-linjaus: ei nykysotaa eikä
// nykypolitiikkaa, ja Jekaterinburgin introssa ei ole vuoden 1918
// aihepiiriä.
//
// ERÄ R4 (20.8.2026) SAI UUDET LUVUT en-Wikipedian raakateksteistä
// (Sanaa, Aden, Muscat, Tabriz; haettu 20.8.2026): Sanaan asukasluku
// 2 545 000 (2017) ja asema yhtenä maailman korkeimmalla sijaitsevista
// pääkaupungeista, Adenin 863 000 (2017) ja etäisyys Bab el-Mandebiin
// 170 km, Masqatin kaupunkiseudun 1,72 miljoonaa (2022) ja kuusi
// wilajaa, Tabrizin 1 558 693 (laskenta 2016) sekä Urmiajärven
// etäisyys 60 km. Muu aineisto tulee kaupunkien omista, jo
// tarkistetuista lehtiteksteistä.
//
// ERÄ R9b (20.8.2026) EI TUONUT YHTÄÄN UUTTA VÄITETTÄ. Jakutskin,
// Magadanin, Kamtšatkan ja Sahalinin introt on koottu näiden neljän
// lehden omista, jo tarkistetuista teksteistä (kulttuuri-kategoriat.js:n
// johdannot, nostot ja matkailijan oppaat, nahtavyysjutut.js ja
// maakartat.js) — ei uusia lähdehakuja. Venäjä-linjaus: ei nykysotaa
// eikä nykypolitiikkaa, ja Magadanin introssa kaupungin synty
// 1930-luvulla kerrotaan neutraalina rakentamisen historiana; Kolyman
// leirit ja Surun maski pysyvät siinä laajuudessa kuin lehden oma
// nosto ne jo kertoo.
export const ASIA_ARTIKKELIT = {
  İzmir: {
    intro: 'Izmir on Turkin kolmanneksi suurin kaupunki ja sen tärkein '
      + 'satama Egeanmerellä. Vanha nimi Smyrna on kolmetuhatta vuotta '
      + 'vanha, ja paikalla on asuttu yhtäjaksoisesti kauemmin kuin '
      + 'melkein missään muualla Välimerellä.',
    teksti: 'Izmir on rakennettu syvän lahden pohjukkaan, jota vuoret '
      + 'ympäröivät kolmelta suunnalta. Lahti tekee siitä luonnollisen '
      + 'sataman: laivat pääsevät sisään suojaan, ja tavara siirtyy '
      + 'suoraan Anatolian ylängölle vievälle tielle. Kaupungissa asuu '
      + 'noin kolme miljoonaa ihmistä.'
      + '\n\n'
      + 'Antiikin Smyrna oli yksi niistä kaupungeista, jotka väittivät '
      + 'olevansa Homeroksen syntymäpaikka. Se kuului vuorollaan '
      + 'kreikkalaisille, roomalaisille, bysanttilaisille ja osmaneille, '
      + 'ja koko ajan se eli samasta asiasta: viikunoista, rusinoista, '
      + 'tupakasta ja matoista, jotka kulkivat sataman kautta '
      + 'Eurooppaan. Vuoden 1922 suuri tulipalo tuhosi kaupungin '
      + 'keskustan, ja se rakennettiin uudelleen leveine katuineen.'
      + '\n\n'
      + 'Nykyinen Izmir on Turkin länsimaisin kaupunki. Rantabulevardi '
      + 'Kordon on kilometrien mittainen kävelykatu, ja kaupungin '
      + 'tunnusruoka on simit — seesaminsiemenillä kuorrutettu rinkeli, '
      + 'jota myydään kadulla työntökärryistä aamusta iltaan.',
  },
  Ankara: {
    intro: 'Ankara on Turkin pääkaupunki ja maan toiseksi suurin '
      + 'kaupunki. Se nostettiin pääkaupungiksi vuonna 1923 osittain '
      + 'siksi, että Istanbul oli liian lähellä rajaa ja liian kaukana '
      + 'maan omasta sydämestä.',
    teksti: 'Ankara sijaitsee Anatolian ylängöllä noin 900 metrin '
      + 'korkeudessa. Ilmasto on mannerilmasto: kesät ovat kuivia ja '
      + 'kuumia, talvet kylmiä ja lumisia — hyvin toisenlaisia kuin '
      + 'rannikolla. Kaupungissa asuu yli viisi miljoonaa ihmistä.'
      + '\n\n'
      + 'Paikalla on ollut asutusta hettiläisten ajoista asti, ja '
      + 'kukkulan päällä seisova linna on osin roomalaista ja '
      + 'bysanttilaista muuria. Länsimaissa kaupunki tunnettiin '
      + 'vuosisatojen ajan nimellä Angora, ja siitä nimestä tulevat '
      + 'angoravuohi ja angorakani. Vuohen pitkästä karvasta kehrätään '
      + 'mohairia, jota vietiin täältä Eurooppaan.'
      + '\n\n'
      + 'Kun Turkin tasavalta perustettiin, Ankara oli noin '
      + 'kolmenkymmenentuhannen asukkaan kaupunki. Sadassa vuodessa '
      + 'siitä on kasvanut miljoonakaupunki, jossa ovat ministeriöt, '
      + 'suurlähetystöt ja yliopistot. Atatürkin mausoleumi Anıtkabir '
      + 'kohoaa omalla kukkulallaan keskustan yllä.',
  },
  Kappadokia: {
    intro: 'Kappadokia on Keski-Turkin alue, jonka maisema on '
      + 'muodostunut tulivuoren tuhkasta. Kivi on niin pehmeää, että '
      + 'siihen on kaiverrettu taloja, kirkkoja ja kokonaisia '
      + 'maanalaisia kaupunkeja.',
    teksti: 'Miljoonia vuosia sitten alueen tulivuoret peittivät maan '
      + 'paksuun tuhkakerrokseen, joka kovettui pehmeäksi kiveksi. '
      + 'Sade ja tuuli ovat kuluttaneet siitä kartioita, harjuja ja '
      + 'torneja. Kovempi laava suojaa niitä ylhäältä, ja siksi monen '
      + 'kartion nokassa on tumma hattu.'
      + '\n\n'
      + 'Pehmeään kiveen on kaivettu asuntoja ainakin roomalaisajoista '
      + 'asti. Varhaiset kristityt tekivät kallioihin luostareita ja '
      + 'kirkkoja, joiden seinissä on yhä bysanttilaisia maalauksia. '
      + 'Suurin maanalainen kaupunki, Derinkuyu, laskeutuu kahdeksaan '
      + 'kerrokseen, ja siellä oli tilaa tuhansille ihmisille karjoineen '
      + '— sekä ilmakuiluja, kaivoja ja pyörivistä kivistä tehdyt ovet, '
      + 'jotka voitiin sulkea sisältä päin.'
      + '\n\n'
      + 'Nykyään alue on Unescon maailmanperintökohde. Osa vanhoista '
      + 'kallioasunnoista on yhä käytössä, ja aamuisin laakson yllä '
      + 'leijuu kymmeniä kuumailmapalloja.',
  },
  Nikosia: {
    intro: 'Nikosia on Kyproksen pääkaupunki ja maailman viimeinen '
      + 'jaettu pääkaupunki. Kaupungin läpi kulkee puskurivyöhyke, jonka '
      + 'toisella puolella puhutaan kreikkaa ja toisella turkkia.',
    teksti: 'Nikosia on saaren keskellä, kaukana rannikosta, tasangolla '
      + 'jota vuoristot reunustavat pohjoisessa ja etelässä. '
      + 'Vanhaakaupunkia ympäröi venetsialaisten 1500-luvulla '
      + 'rakentama muuri, jossa on yksitoista tähtimäistä bastionia — '
      + 'ilmasta katsottuna muuri muistuttaa lumihiutaletta.'
      + '\n\n'
      + 'Kypros on ollut vuorollaan foinikialaisten, kreikkalaisten, '
      + 'roomalaisten, bysanttilaisten, ristiretkeläisten, venetsialaisten, '
      + 'osmanien ja brittien hallussa. Vuonna 1974 saari jakautui: '
      + 'pohjoisosaa hallitsee Turkin tunnustama Pohjois-Kypros, '
      + 'eteläosaa Kyproksen tasavalta, ja YK valvoo niiden välistä '
      + 'vyöhykettä. Nikosian keskustassa vyöhyke on paikoin vain '
      + 'muutaman metrin levyinen.'
      + '\n\n'
      + 'Ledran kadulla oleva ylityspaikka avattiin vuonna 2008, ja '
      + 'sen kautta voi kävellä kaupunginosasta toiseen. Molemmilla '
      + 'puolilla kadut, talot ja kahvilat ovat samannäköisiä — vain '
      + 'kyltit ja lippu vaihtuvat.',
  },
  Aleppo: {
    intro: 'Aleppo on Pohjois-Syyrian suurkaupunki ja maan väkirikkaimman '
      + 'maakunnan pääkaupunki. Se seisoo 380 metrin ylängöllä 120 '
      + 'kilometriä Välimereltä sisämaahan, ja asukkaita arvioitiin vuonna '
      + '2021 olevan runsaat kaksi miljoonaa. Kaupunki on yksi maailman '
      + 'vanhimmista yhtäjaksoisesti asutuista paikoista — samaa sanoo '
      + 'Damaskos itsestään.'
      + '\n\n'
      + 'Kaupunki on kasvanut yhden kummun ympärille: **linnoitus** seisoo '
      + 'omalla kukkulallaan, ja sen ympärille levisivät muurikaupunki ja '
      + 'kaupunginosat. Kaksi kauppatietä risteää täällä: idän tavara '
      + 'purettiin Aleppossa ja jatkoi Välimerelle, ja kauppiaiden '
      + 'majatalot eli khanit ovat siltä ajalta. Kaupunki oli 1500-luvun '
      + 'puolivälistä idän tavaran tärkein portti Eurooppaan, kunnes '
      + '**Suezin kanava** avattiin vuonna 1869 ja kauppa siirtyi '
      + 'laivoille. Vanhakaupunki on Unescon maailmanperintökohde, ja '
      + 'tunnetuin tuote on oliivi- ja laakeriöljystä keitetty saippua.'
      + '\n\n'
      + 'Vuosien 2012–2016 sota vaurioitti vanhaakaupunkia pahoin, ja '
      + 'jälleenrakennus on kesken: osa katetusta basaarista ja khaneista '
      + 'on jo kunnostettu. Lehden kuvissa näkyy sekä sotaa edeltävä että '
      + 'nykyinen Aleppo.',
    teksti: 'Aleppo on Pohjois-Syyriassa, tasangolla, jonka poikki '
      + 'kulkivat karavaanireitit idästä Välimerelle. Sijainti teki '
      + 'siitä varakkaan: karavaanit purkivat kuormansa täällä, ja '
      + 'tavara jatkoi matkaa laivalla. Kaupungin keskellä kohoaa '
      + 'linnoitus omalla kukkulallaan, ja sinne noustaan jyrkkää '
      + 'kivisiltaa pitkin.'
      + '\n\n'
      + 'Kaupunki on kuulunut vuorollaan hettiläisille, assyrialaisille, '
      + 'persialaisille, kreikkalaisille, roomalaisille, arabeille ja '
      + 'osmaneille. Nykyinen linnoitus on pääosin 1200-luvulta. '
      + 'Aleppon tunnetuin tuote on oliiviöljystä ja laakeriöljystä '
      + 'keitetty saippua, jota on tehty samalla tavalla satojen '
      + 'vuosien ajan: massa kaadetaan lattialle, leikataan palasiksi ja '
      + 'jätetään kuivumaan puoleksi vuodeksi.'
      + '\n\n'
      + 'Syyrian sota vuodesta 2012 alkaen tuhosi suuren osan '
      + 'vanhastakaupungista, myös basaarin holvikäytäviä ja '
      + 'Umaijadien moskeijan minareetin. Jälleenrakennus on käynnissä, '
      + 'ja osa basaarista on jo avattu uudelleen.',
  },
  Damaskos: {
    intro: 'Damaskos on Syyrian pääkaupunki ja suurin kaupunki, ja sitä '
      + 'pidetään maailman vanhimpana yhtäjaksoisesti asuttuna '
      + 'pääkaupunkina. Se on 680 metrin tasangolla Anti-Libanonin '
      + 'vuoriston itäisillä juurilla 80 kilometriä Välimereltä '
      + 'sisämaahan, ja suurkaupunkialueella asuu arviolta lähes kolme '
      + 'miljoonaa ihmistä. Vuoret jättävät kaupungin sadevarjoon, joten '
      + 'ilmasto on kuiva; vastapainona on Barada-joki, joka kastelee '
      + '**Ghoutan** viljelysalueen.'
      + '\n\n'
      + 'Roomalaiset kaavoittivat kaupungin ruutuun, ja vanhakaupunki on '
      + 'yhä muurien ympäröimä suorakaide, jossa on seitsemän vanhaa '
      + 'porttia. Sen keskellä on paikka, joka on ollut pyhä neljä kertaa: '
      + 'aramealainen temppeli, Jupiterin temppeli, kirkko ja moskeija. '
      + 'Suurin käänne oli vuosi 661: Damaskoksesta tuli '
      + '**umaijadikalifaatin pääkaupunki**, ja valtakunta ulottui Iberian '
      + 'niemimaalta Indus-joelle, kunnes valta siirtyi vuonna 750 '
      + 'Bagdadiin. Kaupungista ovat saaneet nimensä damasti ja '
      + 'damaskosteräs.'
      + '\n\n'
      + 'Sisällissota ulottui Damaskokseen vuonna 2012, mutta taistelut '
      + 'käytiin pääosin laitakaupungilla, ja vanhakaupunki säilyi '
      + 'ehjempänä kuin Aleppossa tai Mosulissa.',
    teksti: 'Damaskos sijaitsee Ghouta-keitaalla Anti-Libanonin vuorten '
      + 'juurella. Barada-joki tekee kuivaan maastoon vihreän läiskän, '
      + 'ja sen ansiosta paikalla on voitu asua yhtäjaksoisesti '
      + 'tuhansia vuosia. Vanhaakaupunkia ympäröi yhä muuri, jossa on '
      + 'seitsemän vanhaa porttia.'
      + '\n\n'
      + 'Kaupunki oli 600-luvulla Umaijadien kalifaatin pääkaupunki, ja '
      + 'silloin siitä hallittiin aluetta Espanjasta Intiaan. Samalta '
      + 'ajalta on Umaijadien moskeija, joka rakennettiin paikalle, '
      + 'jossa oli ollut ensin roomalainen temppeli ja sitten '
      + 'kristillinen kirkko. Damaskoksen teräs oli keskiajalla '
      + 'kuuluisaa: siitä taotuissa miekoissa oli aaltoileva kuvio, '
      + 'jonka valmistustapa on sittemmin unohtunut.'
      + '\n\n'
      + 'Vanhankaupungin kujat ovat kapeita ja katetut basaarit pitkiä. '
      + 'Al-Hamidiyan basaarin peltikaton rei\'istä lankeaa lattialle '
      + 'valopilkkuja — reiät ovat luodinjälkiä 1900-luvun alusta.',
  },
  Jerusalem: {
    intro: 'Jerusalem on vuoristokaupunki Juudean vuorilla, noin 750 metrin '
      + 'korkeudessa. Sitä ympäröi kolme laaksoa, eikä sillä ole omaa jokea: '
      + 'asutuksen paikan ratkaisi yksi lähde, Kidronin laakson kalliosta '
      + 'pulppuava **Gihon**. Vanhaakaupunkia kiertävät muurit eivät ole '
      + 'muinaiset vaan ottomaanien työtä vuosilta 1537–1541.'
      + '\n\n'
      + 'Kaupunki on pyhä kolmelle uskonnolle, ja niiden keskeisimmät paikat '
      + 'ovat alle kilometrin levyisen vanhankaupungin sisällä: Länsimuuri, '
      + 'temppelivuorella seisovat Kalliomoskeija ja al-Aqsa sekä **Pyhän '
      + 'haudan kirkko**. Historian suurin käännekohta osui antiikkiin, kun '
      + 'keisari Hadrianus perusti kaupungin uudelleen roomalaisena '
      + 'siirtokuntana vuosina 129–130 ja antoi sille nimen Aelia '
      + 'Capitolina. Jako neljään kortteliin on paljon nuorempi tapa '
      + 'hahmottaa aluetta: se juontuu 1840-luvun brittiläisistä '
      + 'sotilaskartoista.'
      + '\n\n'
      + 'Talot on rakennettu kaupungin omasta vaaleasta kalkkikivestä, ja '
      + 'louhoskuopasta muurattiin usein saman talon sadevesisäiliö. Muurien '
      + 'ulkopuolelle nousi ensimmäinen kortteli vasta 1860, eikä isoisän '
      + 'matkan aikaan tänne päässyt junalla: rata Jaffasta valmistui 1892.',
    teksti: 'Jerusalem on Juudean vuorilla noin 750 metrin korkeudessa, '
      + 'Välimeren ja Kuolleenmeren välissä. Vanhaakaupunkia ympäröi '
      + 'osmanien 1500-luvulla rakentama muuri, ja sen sisällä on neljä '
      + 'kaupunginosaa: juutalainen, kristitty, muslimien ja armenialainen.'
      + '\n\n'
      + 'Kaupunki on vallattu ja tuhottu useammin kuin melkein mikään '
      + 'muu paikka maailmassa. Juutalaisille tärkein paikka on '
      + 'Länsimuuri, ainoa jäljellä oleva osa toisen temppelin '
      + 'tukimuurista. Sen yläpuolella on Temppelivuori, jolla seisovat '
      + 'Kalliomoskeija ja al-Aqsan moskeija — islamin kolmanneksi '
      + 'pyhin paikka. Kristityille pyhin on Pyhän haudan kirkko, jonka '
      + 'avaimia on sadan vuoden ajan säilyttänyt sama muslimiperhe, '
      + 'jotta kirkkokunnat eivät riitelisi niistä.'
      + '\n\n'
      + 'Kaupungin asema on yhä kiistanalainen: sekä Israel että '
      + 'palestiinalaiset pitävät sitä pääkaupunkinaan. Vanhassakaupungissa '
      + 'kuulee samaan aikaan kirkonkellot, rukouskutsun ja shofar-torven.',
  },
  'Petra (kaupunki)': {
    intro: 'Petra on kallioon veistetty kaupunki Jordanian '
      + 'aavikkovuorilla. Sen rikkaus ei perustunut kultaan vaan '
      + 'veteen: nabatealaiset osasivat kerätä ja johtaa sadeveden '
      + 'niin, että aavikon keskellä riitti juotavaa ympäri vuoden.',
    teksti: 'Petraan tullaan kapeaa rotkoa, Siqiä, pitkin. Se on yli '
      + 'kilometrin pituinen, ja sen seinät nousevat paikoin '
      + 'kahdeksankymmeneen metriin. Rotkon päässä aukeaa al-Khazneh, '
      + 'kokonaan kallioon veistetty julkisivu, jota kutsutaan '
      + 'aarrekammioksi. Se on hauta, ei aarrekammio, mutta nimi on '
      + 'jäänyt.'
      + '\n\n'
      + 'Nabatealaiset olivat aavikon kauppiaskansa, joka rikastui '
      + 'suitsukkeen ja mausteiden karavaanireiteistä. Petra oli heidän '
      + 'pääkaupunkinsa noin 300-luvulta eaa. alkaen. Heidän '
      + 'insinöörityönsä näkyy yhä: Siqin seinään on hakattu ura, jota '
      + 'pitkin vesi johdettiin kaupunkiin, ja padot ohjasivat '
      + 'tulvavedet ohi. Rooma liitti alueen valtakuntaansa vuonna 106, '
      + 'ja kauppa siirtyi vähitellen muualle.'
      + '\n\n'
      + 'Euroopassa Petra unohtui kokonaan, kunnes sveitsiläinen '
      + 'matkailija Johann Ludwig Burckhardt pääsi sinne 1812 esiintymällä '
      + 'pyhiinvaeltajana. Nykyään Petra on Jordanian tunnetuin kohde '
      + 'ja Unescon maailmanperintökohde.',
  },
  Siinai: {
    intro: 'Siinai on kolmion muotoinen niemimaa Afrikan ja Aasian välissä: '
      + 'pohjoisreuna on Välimerellä, kärki Punaisenmeren suulla ja kyljillä '
      + 'Suezin- ja Aqabanlahti. Niemimaa kuuluu Egyptille, mutta **Suezin '
      + 'kanava** erottaa sen muusta maasta: kanava avattiin marraskuussa '
      + '1869, ja se veti rajan Afrikan ja Aasian väliin niin, että Siinai '
      + 'jäi Aasian puolelle.'
      + '\n\n'
      + 'Maasto vaihtuu kahdesti: pohjoinen on hiekka-aavikkoa, etelä '
      + 'jyrkkää punaista graniittia ja rannikko koralliriuttaa. '
      + 'Siinainvuori kohoaa 2 285 metriin, ja aivan sen vieressä on Egyptin '
      + 'korkein huippu Katariinanvuori. Kolmen uskonnon perinteen mukaan '
      + 'Mooses sai käskynsä täällä, ja vuoren juurelle rakennettiin '
      + '500-luvulla **Pyhän Katariinan luostari**, joka on toiminut siitä '
      + 'asti keskeytyksettä ja jonka käsikirjoituskokoelma on maailman '
      + 'toiseksi suurin.'
      + '\n\n'
      + 'Egyptiläiset louhivat vuoristosta turkoosia ja kuparia tuhansien '
      + 'vuosien ajan, ja samoilta Serabit el-Khadimin kallioilta löytyivät '
      + 'varhaisimmat aakkoskirjoituksen merkit. Sisämaan laaksoissa on '
      + 'keitaita, joista suurin on Wadi Feiran.',
    teksti: 'Siinai erottaa Välimeren Punaisestamerestä ja Afrikan '
      + 'Aasiasta. Pohjoisosa on hiekka-aavikkoa, eteläosa jyrkkää '
      + 'graniittivuoristoa, jonka korkein huippu Katariinanvuori nousee '
      + 'yli 2 600 metriin. Puita ei juuri ole, ja vuoret ovat '
      + 'ruosteenpunaisia ja harmaita.'
      + '\n\n'
      + 'Juutalaisuuden, kristinuskon ja islamin perinteen mukaan Mooses '
      + 'sai käskyt Siinainvuorella. Vuoren juurelle perustettiin '
      + '500-luvulla Pyhän Katariinan luostari, joka on ollut '
      + 'toiminnassa keskeytyksettä siitä asti. Sen kirjasto on '
      + 'käsikirjoitusten määrässä toiseksi suurin Vatikaanin jälkeen, '
      + 'ja sen muurien sisällä on myös moskeija — se rakennettiin '
      + 'suojaamaan luostaria.'
      + '\n\n'
      + 'Niemimaa on kuulunut Egyptille, ja se oli Israelin miehittämänä '
      + 'vuosina 1967–1982. Nykyään sen rannikolla on sukelluskohteita, '
      + 'ja Siinainvuorelle noustaan yöllä, jotta ollaan huipulla '
      + 'auringonnousun aikaan.',
  },
  Luxor: {
    intro: 'Luxor on Ylä-Egyptin kaupunki Niilin varrella, 670 kilometriä '
      + 'Kairosta etelään ja 220 kilometriä Assuanista pohjoiseen. '
      + 'Asukkaita oli vuonna 2023 noin 285 000, ja korkeutta on 89 '
      + 'metriä. Kaupunki on rakennettu antiikin Theban päälle: '
      + 'egyptiläisittäin Waset, kreikkalaisittain Thebai, ja se oli '
      + 'Egyptin pääkaupunki useiden dynastioiden aikaan.'
      + '\n\n'
      + 'Niili jakaa Luxorin kahtia, ja jako on ikivanha: itäpuolelle, '
      + 'missä aurinko nousi, rakennettiin temppelit ja asuttiin, ja '
      + 'länsipuolelle, missä se laski, haudattiin. Itärannalla ovat '
      + '**Karnakin ja Luxorin temppelit** keskellä nykyistä kaupunkia, ja '
      + 'niitä yhdisti sfinksien reunustama kuja. Länsirannalla on Theban '
      + 'nekropoli Kuninkaiden ja Kuningattarien laaksoineen; Howard '
      + 'Carter löysi sieltä **Tutankhamonin haudan** 4. marraskuuta 1922, '
      + 'ja se oli ensimmäinen kuninkaanhauta, joka löytyi pääosin '
      + 'koskemattomana.'
      + '\n\n'
      + 'Nykyään kaupunki elää matkailusta ja saa vuodessa noin viisi '
      + 'miljoonaa vierailijaa. Aamut alkavat ennen aurinkoa, kun '
      + 'kuumailmapallot nousevat länsirannan yllä, ja peltojen poikki '
      + 'kulkevat kapearaiteiset radat vievät sokeriruokoa tehtaille.',
    teksti: 'Luxor on Niilin rannalla Ylä-Egyptissä. Antiikin aikana '
      + 'kaupunki oli nimeltään Waset, kreikkalaisille Thebai, ja se '
      + 'oli Egyptin pääkaupunki useiden dynastioiden aikaan. Idässä '
      + 'auringon noustessa oli elävien puoli temppeleineen, lännessä '
      + 'auringon laskiessa kuolleiden puoli hautoineen.'
      + '\n\n'
      + 'Karnakin temppelialue on yksi maailman suurimmista '
      + 'uskonnollisista rakennuskokonaisuuksista. Sen suuressa '
      + 'pylvässalissa on 134 pylvästä, joista korkeimmat ovat noin '
      + '21 metriä. Luxorin temppeli on kolmen kilometrin päässä, ja '
      + 'niitä yhdisti sfinksien reunustama kuja. Länsirannalla on '
      + 'Kuninkaiden laakso, jossa on yli kuusikymmentä hautaa — '
      + 'tunnetuin on Tutankhamonin, jonka Howard Carter löysi vuonna '
      + '1922 lähes koskemattomana.'
      + '\n\n'
      + 'Nykyään Luxor elää matkailusta. Aamuisin länsirannan yllä '
      + 'nousee kuumailmapalloja, ja iltaisin risteilylaivat lähtevät '
      + 'jokea alas kohti Assuania.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026 (Raamatun "TEKSTIEN PAINOPISTE" ja Fablen
   * eräohje): intro EI ole enää kahden virkkeen nosto vaan lehden
   * etusivun leipäteksti — 7–10 virkettä kahdessa tai kolmessa
   * kappaleessa ('\n\n'), maltillinen **lihavointi** avainkohdissa.
   * Faktat ovat kaupungin omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot ja Matkailijan Medina;
   * maakartat.js), ei uusista lähteistä. teksti-kenttä on ennallaan.
   */
  Medina: {
    intro: 'Medina on Saudi-Arabian länsiosassa, Hidžazissa noin 250 '
      + 'kilometriä Punaisenmeren rannikolta sisämaahan. Se on keidas '
      + 'kolmen kuivan laakson yhtymäkohdassa, ja pohjaveden varassa '
      + 'siellä on kasvatettu taatelipalmuja ainakin 800-luvulta eKr. '
      + 'Silloin paikka tunnettiin nimellä **Yathrib**.'
      + '\n\n'
      + 'Vuonna 622 profeetta Muhammad siirtyi tänne Mekasta, ja '
      + 'tuosta muutosta eli hidžrasta lasketaan islamilaisen '
      + 'ajanlaskun ensimmäinen vuosi. Kaupungin nimeksi vakiintui '
      + 'al-Madina, kaupunki, ja Mekan jälkeen se on islamin toiseksi '
      + 'pyhin. Keskellä on **Profeetan moskeija**, jonka vihreän '
      + 'kupolin alla on Muhammadin hauta.'
      + '\n\n'
      + 'Vanhaa muurikaupunkia ei ole enää jäljellä: muurien paikalla '
      + 'kaartaa nyt kolme kehätietä. Osmanit hallitsivat Medinaa '
      + 'vuodesta 1517, ja 1900-luvun alussa sulttaani Abdul Hamid II '
      + 'toi sinne lennättimen, voimalaitoksen ja Hidžaz-radan: matka '
      + 'Damaskoksesta lyheni neljästäkymmenestä päivästä viiteen. '
      + 'Asukkaita on vajaat puolitoista miljoonaa ja vierailijoita '
      + 'yli seitsemän miljoonaa vuodessa. Pyhälle ytimelle ei ole '
      + 'asiaa muilla kuin muslimeilla, mutta sen ulkopuolella '
      + 'kaupunki on tavallinen.',
    teksti: 'Medina on Saudi-Arabian länsiosassa, noin 600 metrin '
      + 'korkeudessa laaksossa, jota laavakentät ympäröivät. Vettä on '
      + 'ollut riittävästi palmutarhoihin, ja kaupunki tunnettiin '
      + 'ennen taateleistaan. Sen vanha nimi oli Jathrib.'
      + '\n\n'
      + 'Kun Muhammad ja hänen seuraajansa joutuivat lähtemään Mekasta, '
      + 'Jathrib otti heidät vastaan. Muuttoa kutsutaan hidžraksi, ja '
      + 'siitä alkaa islamilainen ajanlasku — vuosi 622 on hidžran '
      + 'vuosi yksi. Kaupungin nimeksi tuli Madinat an-Nabi, profeetan '
      + 'kaupunki. Profeetan moskeija rakennettiin hänen talonsa '
      + 'paikalle, ja hänen hautansa on sen sisällä vihreän kupolin '
      + 'alla.'
      + '\n\n'
      + 'Moskeijaa on laajennettu monta kertaa, ja siihen mahtuu nyt '
      + 'satoja tuhansia rukoilijoita. Kaupungin keskustaan pääsevät '
      + 'vain muslimit. Mekan ja Medinan välillä kulkee nykyään '
      + 'suurnopeusjuna, joka taittaa matkan noin kahdessa tunnissa.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, sama linja kuin Medinassa yllä: intro on
   * nyt etusivun leipäteksti kappaleineen ja maltillisine
   * lihavointeineen. Faktat ovat Mekan omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot ja Matkailijan Mekka).
   */
  Mekka: {
    intro: 'Mekka on Länsi-Arabiassa kapean laakson pohjalla '
      + 'paljaiden vuorten välissä, seitsemänkymmentä kilometriä '
      + 'Jeddan satamasta sisämaahan. Laaksoa kutsutaan Mekan '
      + 'kuopaksi; sen muoto on ohjannut kaupungin kasvua, ja sama '
      + 'kouru kerää rankkasateiden vedet kaduille. Vettä on ollut '
      + 'niukasti: kaupunki syntyi Zamzamin kaivon ja Syyriaan '
      + 'kulkeneen karavaanireitin varaan.'
      + '\n\n'
      + 'Laakson pohjalla on **Kaaba**, runsaat kolmetoista metriä '
      + 'korkea kivinen kuutio, jota kohti jokainen moskeija '
      + 'maailmassa osoittaa; sen ympärillä on Suuri moskeija. '
      + 'Muhammad syntyi Mekassa noin vuonna 570, ja kaupunki on '
      + 'islamin pyhin. Pyhiinvaellus eli **hadž** on yksi islamin '
      + 'viidestä pilarista, ja vuonna 2019 sille tuli lähes kaksi ja '
      + 'puoli miljoonaa ihmistä.'
      + '\n\n'
      + 'Talous on aina nojannut pyhiinvaeltajiin, ja osmanien aikana '
      + 'Mekka oli veroista vapautettu ja sai valtiolta '
      + 'vuosiavustuksen. Vuonna 1872, vuosi ennen isoisän matkaa, '
      + 'Hidžaz järjestettiin vilajetiksi ja Mekasta tuli maakunnan '
      + 'keskus. '
      + 'Asukkaita on nykyään 2,4 miljoonaa, eivätkä muut kuin '
      + 'muslimit saa tulla pyhälle alueelle, jossa moskeijaa '
      + 'ympäröivät nyt hotellitornit.',
    teksti: 'Mekka on kapeassa laaksossa Länsi-Arabian vuorten välissä, '
      + 'noin 70 kilometrin päässä Punaisestamerestä. Vettä on aina '
      + 'ollut niukasti; kaupungin syntyminen juuri tähän selittyy '
      + 'Zamzamin lähteellä ja karavaanireitillä, joka kulki laakson '
      + 'kautta pohjoiseen.'
      + '\n\n'
      + 'Laakson pohjalla on Kaaba, kuutiomainen rakennus, jonka '
      + 'ympärillä on Suuri moskeija. Muhammad syntyi Mekassa noin '
      + 'vuonna 570. Pyhiinvaellus eli hadž on yksi islamin viidestä '
      + 'peruspilarista: jokaisen muslimin tulisi tehdä se kerran '
      + 'elämässään, jos terveys ja varat sallivat. Pyhiinvaellusaikaan '
      + 'kaupunkiin saapuu yli kaksi miljoonaa ihmistä muutaman päivän '
      + 'sisällä.'
      + '\n\n'
      + 'Kaupunkiin pääsevät vain muslimit; teillä on opasteet, jotka '
      + 'ohjaavat muut kiertotielle. Moskeijaa ympäröivät nykyään '
      + 'korkeat hotellitornit, joista suurin, Abraj Al Bait, on yksi '
      + 'maailman massiivisimmista rakennuksista.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R5 (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro on nyt lehden etusivun leipäteksti — 7–10 virkettä kolmessa
   * kappaleessa ('\n\n') ja kaksi maltillista **lihavointia**. Faktat
   * ovat Riadin omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot ja Matkailijan Riad; oma
   * teksti-kenttä alla), ei uusista lähteistä. teksti on ennallaan.
   */
  Riad: {
    intro: 'Riad on Saudi-Arabian pääkaupunki ja Arabian niemimaan suurin '
      + 'kaupunki: asukkaita oli vuonna 2022 seitsemän miljoonaa. Se on '
      + 'Najdin ylätasangon itäosassa noin kuudensadan metrin korkeudessa, '
      + 'ilman jokea ja ilman merenrantaa. Kaupungin läpi kulkee Wadi '
      + 'Hanifan kausiuoma, joka virtaa vasta rankkasateiden jälkeen, ja '
      + 'nimi Riad tarkoittaa puutarhoja.'
      + '\n\n'
      + 'Vanhaa Riadia kiersi 1740-luvulta savimuuri, jossa oli yhdeksän '
      + 'porttia. Naapurissa oli mahtavampi kaksonen, **Diriyah**, jonka '
      + 'hallitsijasuvun valta ulottui suureen osaan niemimaata, kunnes '
      + 'osmanien ja Egyptin joukot hävittivät kaupungin vuonna 1818. '
      + 'Asukkaat siirtyivät Riadiin, ja kun suku nousi uudelleen 1824 ja '
      + '1902, pääkaupunki oli Riad.'
      + '\n\n'
      + 'Öljyä löydettiin 1938, ja se muutti mittakaavan: 1940-luvulla '
      + 'kaupungissa asui noin viisikymmentätuhatta ihmistä. Muuri purettiin '
      + '1950, ja vuonna 1968 tilattu yleiskaava jakoi kaupungin kahden '
      + 'kertaa kahden kilometrin kortteleihin — se **ruudukko** erottuu yhä '
      + 'avaruuteen asti. Nykyinen keskusta on lasitorneja ja moottoriteitä, '
      + 'ja raunioitunut Diriyah on kunnostettu yleisölle.',
    teksti: 'Riad on Nedždin ylängöllä noin 600 metrin korkeudessa. '
      + 'Ilmasto on kuiva ja äärimmäinen: kesällä lämpötila nousee yli '
      + 'neljäänkymmeneen asteeseen ja talviyöt voivat olla lähellä '
      + 'nollaa. Sadetta tulee vähän, ja vesi tulee nykyään suurelta '
      + 'osin merivedestä suolanpoistolaitoksissa.'
      + '\n\n'
      + 'Kaupungin vanhin osa on Masmakin savitiililinnoitus. Vuonna '
      + '1902 Abdulaziz ibn Saud valtasi sen pienen joukon kanssa, ja '
      + 'siitä alkoi kehitys, joka johti Saudi-Arabian kuningaskunnan '
      + 'perustamiseen 1932. Öljyä löydettiin 1938, ja se muutti maan '
      + 'perusteellisesti: Riad oli 1940-luvulla noin '
      + 'viidenkymmenentuhannen asukkaan kaupunki, nyt siinä asuu yli '
      + 'seitsemän miljoonaa.'
      + '\n\n'
      + 'Nykyinen keskusta on lasitorneja ja moottoriteitä. Vanha '
      + 'Diriyah, suvun alkuperäinen kotipaikka kaupungin laidalla, on '
      + 'kunnostettu ja avattu yleisölle. Iltapäivän kuumuudessa kadut '
      + 'ovat tyhjiä, ja kaupunki herää vasta pimeän tultua.',
  },
  'Rub al-Khali': {
    intro: 'Rub al-Khali tarkoittaa arabiaksi tyhjää neljännestä, ja se on '
      + 'maailman suurin yhtenäinen hiekka-aavikko. Pinta-alaa on noin 650 '
      + '000 neliökilometriä eli enemmän kuin koko Ranskassa, mittaa tuhat '
      + 'kilometriä idästä länteen ja viisisataa pohjoisesta etelään. Alue '
      + 'jakautuu Saudi-Arabian, Omanin, Arabiemiirikuntien ja Jemenin '
      + 'kesken, ja sen dyynit kohoavat jopa kahteensataanviiteenkymmeneen '
      + 'metriin.'
      + '\n\n'
      + 'Nimi pitää paikkansa siinä, ettei keskellä ole kyliä, peltoja eikä '
      + 'puita: ensimmäinen aavikon poikki kulkeva maantie valmistui vasta '
      + 'syyskuussa 2021, ja **ensimmäiset dokumentoidut ylitykset** tehtiin '
      + '1930-luvulla. Aina täällä ei ole ollut kuivaa: hiekan seassa on '
      + 'muinaisten järvien pohjia, joista on kaivettu virtahevon ja '
      + 'vesipuhvelin luita.'
      + '\n\n'
      + 'Kaksituhatta vuotta sitten aavikon arvo oli siinä, mitä sen poikki '
      + 'kulki: Dhofarin suitsuke vietiin karavaaneilla kohti Välimerta. '
      + '1900-luvulla arvo löytyi hiekan alta, kun **Ghawarin öljykenttä** '
      + 'löydettiin 1948. Reunoilla asuu yhä beduiiniheimoja kameleineen, ja '
      + 'lännessä on vuonna 2023 maailmanperintöön otettu Uruq Bani '
      + 'Ma\'aridin suojelualue.',
    teksti: 'Aavikko peittää suuren osan Arabian niemimaan eteläosaa ja '
      + 'ulottuu Saudi-Arabian, Omanin, Jemenin ja Arabiemiirikuntien '
      + 'alueelle. Pinta-alaa on noin 650 000 neliökilometriä — '
      + 'enemmän kuin Ranskassa. Dyynit ovat paikoin yli 250 metrin '
      + 'korkuisia, ja hiekka on rautaoksidin värjäämää ruosteenpunaista.'
      + '\n\n'
      + 'Alue ei ole aina ollut kuiva. Aavikon alta on löytynyt '
      + 'kuivuneiden järvien pohjia ja niiden rannoilta '
      + 'kivikautisia työkaluja: vielä muutama tuhat vuotta sitten '
      + 'täällä oli vettä ja karjaa. Beduiinit ovat kulkeneet aavikon '
      + 'reunoja kameleineen, mutta sen keskiosan ylitti eurooppalaisista '
      + 'ensimmäisenä Bertram Thomas vasta vuonna 1931.'
      + '\n\n'
      + 'Nykyään aavikon alla on maailman suurimpia öljyesiintymiä, ja '
      + 'sen laidoilla kulkee huoltoteitä. Keskiosassa ei silti ole '
      + 'mitään: yöllä tähtiä näkyy enemmän kuin missään kaupungissa '
      + 'voi kuvitella.',
  },
  Sanaa: {
    intro: 'Sanaa on Jemenin pääkaupunki ja suurin kaupunki, ja se on runsaan '
      + '2 200 metrin korkeudessa vuorten rajaamalla tasangolla — yksi '
      + 'maailman korkeimmalla sijaitsevista pääkaupungeista. Idässä kohoaa '
      + 'Jabal Nuqum, lännessä Arabian niemimaan korkeimman vuoren juuret, ja '
      + 'kaupunki on siksi kasvanut vain pohjoisesta etelään. Asukkaita oli '
      + 'vuoden 2017 tilastossa noin 2,5 miljoonaa.'
      + '\n\n'
      + 'Nimi juontuu sabalaisesta sanasta masnaa, linnoitus, ja vanhin '
      + 'tunnettu maininta kaupungista on 400-luvulta eKr. **Vanhakaupunki** '
      + 'on Unescon maailmanperintökohde vuodesta 1986: savimuurin sisällä on '
      + 'yli sata moskeijaa, kaksitoista kylpylää ja 6 500 taloa, ja niiden '
      + 'joukossa Suuri moskeija, joka on perimätiedon mukaan 600-luvulta ja '
      + 'siten islamilaisen maailman vanhimpia. Osmanit valtasivat kaupungin '
      + '1547, menettivät sen 1629 ja palasivat vasta vuonna **1872**.'
      + '\n\n'
      + 'Jemenin sisällissota on kestänyt vuodesta 2014, eikä maahan '
      + 'matkustaminen ole nyt turvallista: vanhastakaupungista tuhoutui '
      + 'vuonna 2015 ilmaiskuissa historiallisia taloja, ja Unesco on '
      + 'teettänyt niiden korjauksia.',
    teksti: 'Sanaa on noin 2 250 metrin korkeudessa vuorten ympäröimässä '
      + 'laaksossa. Korkeus tekee ilmastosta viileän ja kuivan keskellä '
      + 'Arabiaa: päivät ovat lämpimiä, yöt viileitä, eikä kuumuus ole '
      + 'samanlaista kuin rannikolla.'
      + '\n\n'
      + 'Vanhankaupungin talot on muurattu poltetusta savesta ja '
      + 'kivestä, ja niiden ikkunat on kehystetty valkoisella kipsillä. '
      + 'Ylimmässä kerroksessa on usein mafraj, huone jossa istutaan '
      + 'iltaisin. Rakennustapa on satoja vuosia vanha, ja monet talot '
      + 'ovat olleet asuttuja sukupolvien ajan. Kaupunki on Unescon '
      + 'maailmanperintökohde.'
      + '\n\n'
      + 'Jemenin sota vuodesta 2014 alkaen on koetellut kaupunkia: osa '
      + 'vanhoista taloista on vaurioitunut ilmaiskuissa ja rankkasateissa, '
      + 'joilta kunnossapidon puute on jättänyt ne suojattomiksi. '
      + 'Kunnostustyötä tehdään perinteisillä menetelmillä.',
  },
  Aden: {
    intro: 'Aden on vanha satamakaupunki Arabian niemimaan etelärannikolla, '
      + 'Adeninlahden pohjoisrannalla ja 170 kilometriä Bab el-Mandebin '
      + 'salmesta itään. Kaupunki on kahdella niemellä, ja niiden väliin jää '
      + 'yksi maailman suurimmista luonnonsatamista. Vanhin kaupunginosa '
      + 'Crater on sammuneen tulivuoren pohjalla Jabal Shamsanin vuoriston '
      + 'ympäröimänä; merta on molemmin puolin, joten vuoden keskilämpötila '
      + 'pysyy 29 asteen tuntumassa. Asukkaita oli vuoden 2017 tilastossa '
      + 'noin 863 000.'
      + '\n\n'
      + 'Kreikkalaiset tunsivat paikan nimellä Eudaimon, ja se oli '
      + 'Punaisenmeren kaupan jälleenlaivauspaikka jo ennen ajanlaskun alkua. '
      + '**Britit ottivat Adenin vuonna 1839** ja julistivat sen '
      + 'vapaakauppasatamaksi 1850; kun Suezin kanava avattiin 1869, siitä '
      + 'tuli höyrylaivojen hiilenottopaikka Intian-reitille. Vuoteen 1937 '
      + 'asti Adenia hallittiin osana Brittiläistä Intiaa, ja vuosina '
      + '1967–1990 se oli **Etelä-Jemenin pääkaupunki**.'
      + '\n\n'
      + 'Jemenin sisällissota on kestänyt vuodesta 2014, eikä maahan '
      + 'matkustaminen ole nyt turvallista; Aden on ollut maaliskuusta 2015 '
      + 'alkaen maan väliaikainen pääkaupunki.',
    teksti: 'Aden on Jemenin etelärannikolla, siinä missä Punainenmeri '
      + 'kohtaa Adeninlahden. Kaupungin vanha osa Crater on '
      + 'kirjaimellisesti tulivuoren kraatterin sisällä: mustat kalliot '
      + 'nousevat ympärillä joka suunnassa, ja niiden keskellä on '
      + 'tasainen pohja.'
      + '\n\n'
      + 'Satama on ollut käytössä antiikin ajoista. Britannia valtasi '
      + 'Adenin 1839, ja kun Suezin kanava avattiin 1869, kaupungista '
      + 'tuli hiilenottopaikka höyrylaivoille matkalla Intiaan. 1950-luvulla '
      + 'se oli maailman vilkkaimpia satamia. Vesi on aina ollut '
      + 'ongelma: kallioon louhitut Tawilan vesisäiliöt keräävät '
      + 'harvinaisia sateita, ja niiden ikää ei tiedetä varmasti.'
      + '\n\n'
      + 'Aden oli Etelä-Jemenin pääkaupunki vuosina 1967–1990. Sen '
      + 'jälkeen maa yhdistyi, mutta kaupunki on ollut sodan '
      + 'keskipisteessä useaan otteeseen. Satama toimii yhä.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R5, sama linja kuin Riadissa yllä.
   * Faktat ovat Salalahin omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot ja Matkailijan Salalah;
   * maakartat.js:n karttalohko).
   *
   * NIMIASU: avain on kaupungin wiki-otsikko Salala (middleeast.js),
   * mutta pelaajalle näkyvä nimi on kaikkialla muualla Salalah —
   * kartalla, lehden kannessa ja kohdekartassa. Leipäteksti käyttää
   * siksi muotoa Salalah; vanhempi teksti-kenttä jäi ennalleen.
   */
  Salala: {
    intro: 'Salalah on Omanin eteläkärjessä Dhofarin maakunnan pääkaupunki ja '
      + 'maan kolmanneksi suurin kaupunki, runsaat '
      + 'kolmesataakolmekymmentätuhatta asukasta. Meri on etelässä, Dhofarin '
      + 'vuoret pohjoisessa ja niiden välissä rantatasanko, jolle koko '
      + 'kaupunki mahtuu. Kesäkuusta syyskuun alkuun puhaltava **khareef** '
      + 'eli kesämonsuuni peittää rannikon sumuun ja tekee vuorista vihreät '
      + '— toukokuun 335 paistetunnista jää heinäkuussa jäljelle 44.'
      + '\n\n'
      + 'Rannassa on matalia kivimuureja ja perustuksia: ne ovat '
      + 'keskiaikaista **Zafaria**, josta koko maakunta sai nimensä. '
      + 'Suitsukesataman kaduilla kulkivat Marco Polo, Ibn Battuta ja Zheng '
      + 'He, kunnes viereinen lahti kuroutui umpeen järveksi. Alue on ollut '
      + 'Unescon maailmanperintöluettelossa vuodesta 2000.'
      + '\n\n'
      + 'Vuosina 1932–1970 Salalah oli sulttaani Said bin Taimurin '
      + 'asuinpaikka ja käytännössä maan pääkaupunki, ja hänen poikansa '
      + 'Qaboos siirsi vallan tultuaan pääkaupungin Masqatiin. Satama palasi '
      + '1990-luvulla, kun viidentoista kilometrin päähän Raysutiin '
      + 'rakennettiin syväsatama. Kortteleiden välissä kasvaa kookospalmuja, '
      + 'mitä ei näe muualla Arabian niemimaalla.',
    teksti: 'Salala on Dhofarin maakunnassa, kapealla rannikkotasangolla '
      + 'vuorten ja meren välissä. Kesäkuusta syyskuuhun Intian '
      + 'valtameren monsuuni tuo alueelle sumua ja tihkusadetta. '
      + 'Ilmiötä kutsutaan nimellä khareef, ja se on ainoa laatuaan '
      + 'Arabian niemimaalla: rinteet muuttuvat niityiksi ja purot '
      + 'alkavat juosta.'
      + '\n\n'
      + 'Dhofar oli antiikin maailman tärkein suitsukkeen lähde. '
      + 'Boswellia-puun kuoreen tehdystä viillosta valuva pihka '
      + 'kuivuu kokkareiksi, joita poltettiin temppeleissä Egyptistä '
      + 'Roomaan. Suitsuke oli aikanaan hyvin arvokasta, ja sitä '
      + 'kuljetettiin kamelikaravaaneilla pohjoiseen kuukausikaupalla. '
      + 'Reitin varren paikat kuuluvat Unescon maailmanperintöluetteloon.'
      + '\n\n'
      + 'Nykyään Salalassa on Omanin toiseksi suurin satama ja laajat '
      + 'kookos- ja banaaniviljelmät. Suitsukepuita kasvaa yhä '
      + 'kivikkoisilla rinteillä, ja pihkaa myydään torilla lajiteltuna '
      + 'värin ja tuoksun mukaan.',
  },
  Masqat: {
    intro: 'Masqat on Omanin pääkaupunki maan koillisrannikolla Omaninlahden '
      + 'äärellä lähellä Hormuzinsalmea, ja **Hajar-vuorten** harjanteet '
      + 'tulevat paikoin aivan mereen asti, joten kaupunki on venynyt '
      + 'nauhaksi lahtia ja laaksoja. Kaupunkiseudulla asui vuonna 2022 noin '
      + '1,72 miljoonaa ihmistä kuudessa wilajassa, mutta vanha Masqat on yhä '
      + 'pieni, runsaan kolmenkymmenentuhannen asukkaan kaupunginosa. Talot '
      + 'ovat matalia ja valkoisia, sillä määräykset rajoittavat korkeutta.'
      + '\n\n'
      + 'Nimi tarkoittaa ankkuripaikkaa, ja satama tunnettiin idän ja lännen '
      + 'välisenä kauppapaikkana jo ensimmäisellä vuosisadalla. '
      + '**Portugalilaiset** valtasivat kaupungin vuonna 1507 ja linnoittivat '
      + 'sataman suun kahdella linnakkeella, jotka valvovat väylää yhä; '
      + 'omanilaiset ottivat sataman takaisin vuonna 1650. Myöhemmin Omanin '
      + 'sulttaanikunnan valta ulottui Sansibariin asti.'
      + '\n\n'
      + 'Kaupunki kasvoi nopeasti 1970-luvulta alkaen, ja sen '
      + 'tunnusrakennukset ovat siksi nuoria: sulttaanin seremoniallinen '
      + 'palatsi, suurmoskeija ja oopperatalo ovat viime vuosikymmeniltä. '
      + 'Mutrahin basaari sataman vieressä on sen sijaan Omanin vanhimpia ja '
      + 'yhä käytössä.',
    teksti: 'Masqat on Omaninlahden rannalla Hajar-vuorten juurella. '
      + 'Vuoret tulevat paikoin aivan mereen asti, joten kaupunki on '
      + 'venynyt pitkäksi nauhaksi rantaviivaa myöten. Talot ovat '
      + 'valkoisia ja matalia: rakennusmääräykset rajoittavat '
      + 'korkeutta, joten lasitorneja ei ole.'
      + '\n\n'
      + 'Omanilaiset merenkulkijat purjehtivat jo keskiajalla Intiaan, '
      + 'Itä-Afrikkaan ja Kiinaan asti. Heidän dhow-veneidensä lankut '
      + 'ommeltiin yhteen kookoskuidusta kierretyllä köydellä ilman '
      + 'ainuttakaan naulaa. Portugalilaiset hallitsivat satamaa '
      + '1500-luvulta 1650-luvulle, ja siltä ajalta ovat Jalalin ja '
      + 'Miranin linnakkeet. Myöhemmin Omanin sulttaanikunta ulottui '
      + 'Sansibariin asti.'
      + '\n\n'
      + 'Nykyinen Masqat on rauhallinen pääkaupunki, jossa on '
      + 'sulttaanin palatsi, suuri moskeija ja oopperatalo. Vanha '
      + 'Mutrahin basaari sataman vieressä on yhä käytössä, ja siellä '
      + 'myydään suitsuketta, hopeaa ja kankaita.',
  },
  Dubai: {
    intro: 'Dubai oli sata vuotta sitten pieni helmenkalastajien satama. '
      + 'Nyt siinä on maailman korkein rakennus — ja viiden minuutin '
      + 'venematkan päässä yhä sama vanha basaari.',
    teksti: 'Dubai on Persianlahden rannalla Arabiemiirikunnissa. '
      + 'Kaupungin halki kulkee luonnollinen merenlahti, Dubai Creek, '
      + 'jonka molemmilla rannoilla vanhat kaupunginosat ovat. Lahden '
      + 'yli kuljetaan yhä abra-veneillä, joiden matka maksaa muutaman '
      + 'kolikon.'
      + '\n\n'
      + 'Ennen öljyä Dubai eli helmenkalastuksesta ja kaupasta. '
      + 'Sukeltajat menivät pohjaan ilman happilaitteita, kivi mukanaan '
      + 'painona, ja nousivat pintaan köydestä vetämällä. Japanilaiset '
      + 'viljellyt helmet romahduttivat elinkeinon 1930-luvulla. Öljyä '
      + 'löytyi 1966, mutta sitä on Dubaissa vähän verrattuna naapureihin '
      + '— siksi kaupunki panosti satamaan, lentoasemaan ja kauppaan.'
      + '\n\n'
      + 'Burj Khalifa valmistui 2010 ja on 828 metriä korkea. '
      + 'Kaupungin asukkaista valtaosa on ulkomaalaisia, ja kaduilla '
      + 'kuulee kymmeniä kieliä. Mausteiden ja kullan basaarit lahden '
      + 'pohjoisrannalla ovat samoilla paikoillaan kuin ennenkin.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R5, sama linja kuin Riadissa yllä.
   * Faktat ovat Dohan omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: johdanto, Matkailijan Doha ja sen
   * jaksot; oma teksti-kenttä alla).
   */
  Doha: {
    intro: 'Doha on Qatarin pääkaupunki niemimaan itärannikolla, matalan lahden '
      + 'pohjukassa. Alaa on 132 neliökilometriä, asukkaita vajaat 1,2 '
      + 'miljoonaa ja korkeutta merenpinnasta kymmenen metriä. Ranta ei ole '
      + 'sellainen kuin luonto sen jätti: merestä on täytetty neljäsataa '
      + 'hehtaaria maata ja kolmekymmentä kilometriä uutta rantaviivaa, ja '
      + 'täyttömaan reunaa kiertää seitsemän kilometrin **Corniche**.'
      + '\n\n'
      + 'Sata vuotta sitten Doha oli helmenpyyntisatama. Vuonna 1907 sillä '
      + 'oli kolmesataaviisikymmentä helmivenettä ja niiden miehistöissä 6 '
      + '300 miestä, ja brittivirkamies Lorimer laski kaupungista vuonna '
      + '1908 yhdeksän korttelia ja noin kaksitoistatuhatta asukasta. '
      + 'Viljelty helmi ja 1930-luvun lama veivät elinkeinon.'
      + '\n\n'
      + 'Öljyä porattiin ensimmäisen kerran 1939, mutta tulot alkoivat '
      + 'kertyä vasta 1950- ja 1960-luvuilla, ja maakaasua löytyi 1971 '
      + '**Pohjoiskentältä**, joka on maailman suurin yksittäinen '
      + 'kaasuesiintymä. Tunnetuin Doha on siksi nuori: kulttuurikylä Katara '
      + 'avattiin 2010, kansalliskirjasto 2018 ja metro 2019. Souq Waqifin '
      + 'kujilla on silti yhä oma osastonsa metsästyshaukoille.',
    teksti: 'Doha on Qatarin niemimaan itärannikolla. Kaupunki kaartuu '
      + 'lahden ympäri, ja sen rantabulevardi Corniche on seitsemän '
      + 'kilometriä pitkä. Ilmasto on hyvin kuuma ja kostea, ja kesällä '
      + 'ulkona liikutaan vasta illalla.'
      + '\n\n'
      + 'Qatar eli helmenkalastuksesta ja kalastuksesta 1900-luvun '
      + 'alkupuolelle asti. Maakaasua löydettiin 1971 Pohjoiskentältä, '
      + 'joka on maailman suurin yksittäinen kaasuesiintymä, ja se '
      + 'muutti maan yhdessä sukupolvessa. Souq Waqif, vanha tori, on '
      + 'kunnostettu perinteiseen asuun, ja sen laidalla on oma '
      + 'osastonsa metsästyshaukoille — haukkametsästys on vanha '
      + 'beduiiniperinne, joka on yhä elossa.'
      + '\n\n'
      + 'Doha isännöi jalkapallon maailmanmestaruuskilpailuja vuonna '
      + '2022. Kaupungissa on useita museoita, joista islamilaisen '
      + 'taiteen museo seisoo omalla tekosaarellaan lahden edustalla.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R5, sama linja kuin Riadissa yllä.
   * Faktat ovat Kuwaitin omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: Matkailijan Kuwait ja sen jaksot;
   * maakartat.js:n karttalohko; oma teksti-kenttä alla). Vuoden 1990
   * miehitys ja sota jäävät introsta pois — sisältölinjaus 20.8.2026:
   * ei nykysotaa eikä nykypolitiikkaa.
   */
  'Kuwait (kaupunki)': {
    intro: 'Kuwaitin kaupunki on rakennettu Kuwaitinlahden etelärannalle, '
      + 'Persianlahden pohjoisimpaan pohjukkaan. Lahti on jokien tekemä: '
      + 'Tigriin ja Eufratin tuoma aines muodosti suiston, joka on suurin '
      + 'osa nykyisen Kuwaitin maasta. Satamaksi paikka on alueen paras, ja '
      + 'siitä kaupunki sai alkunsa. Kaupunkiseudulla asuu noin kolme '
      + 'miljoonaa ihmistä, yli seitsemänkymmentä prosenttia maan väestöstä.'
      + '\n\n'
      + '1700-luvun alussa paikalla oli kalastajakylä. Kun Basraa '
      + 'piiritettiin 1775–1779, sieltä paenneet kauppiaat toivat mukanaan '
      + 'laivanrakennuksen, ja Kuwaitista tuli Persianlahden **laivanveiston '
      + 'keskus**: puisilla dhow-aluksilla purjehdittiin Intiaan ja '
      + 'Itä-Afrikkaan, ja mestari kantoi laivan mitat päässään ilman '
      + 'piirustuksia.'
      + '\n\n'
      + 'Helmikauppa hiipui 1930-luvulla, ja matkakirjailija Freya Stark '
      + 'kuvasi kaupungin köyhtyneen. Öljy käänsi suunnan: vuonna 1952 maa '
      + 'oli Persianlahden suurin öljynviejä, ja kesäkuussa 1961 siitä tuli '
      + 'itsenäinen. Vanha savitiilikaupunki purettiin 1950- ja '
      + '1960-luvuilla ja tilalle piirrettiin uusi keskusta kehäteineen; '
      + 'tunnukseksi nousivat 1979 valmistuneet **Kuwait Towers**.',
    teksti: 'Kuwait on Persianlahden pohjoisimmassa nurkassa, siinä '
      + 'missä Eufratin ja Tigrisin suisto lähenee lahtea. Luonnollinen '
      + 'satama Kuwait Bay on alueen paras, ja siitä kaupunki sai '
      + 'alkunsa 1700-luvulla.'
      + '\n\n'
      + 'Kuwaitilaiset rakensivat puisia dhow-veneitä ja purjehtivat '
      + 'niillä Intiaan ja Itä-Afrikkaan. Suurimmat olivat '
      + 'satojen tonnien lastialuksia, ja ne tehtiin ilman piirustuksia: '
      + 'mestari kantoi mitat päässään ja opetti ne seuraavalle. Öljy '
      + 'löytyi 1938. Irak valtasi maan 1990, ja seuranneessa sodassa '
      + 'sytytettiin yli 600 öljylähdettä palamaan — viimeiset '
      + 'sammutettiin vasta kahdeksan kuukautta myöhemmin.'
      + '\n\n'
      + 'Kuwait Towers valmistui 1979. Suurimmassa pallossa on '
      + 'vesisäiliö ja ravintola, ja kaupungin ympärillä on kymmeniä '
      + 'samanlaisia sienimäisiä vesitorneja. Telakalla rakennetaan yhä '
      + 'puisia veneitä käsin.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R6 (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro on nyt lehden etusivun leipäteksti — kahdeksan virkettä
   * kolmessa kappaleessa ('\n\n') ja kaksi maltillista **lihavointia**.
   * Faktat ovat Bagdadin omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot ja Matkailijan Bagdad,
   * maakartat.js, oma teksti-kenttä alla) sekä en-Wikipedian
   * Baghdad-artikkelin hallinto- ja väestöluvuista. Sisältölinjaus:
   * sota vain neutraalina historiana (mongolit 1258), ei nykytilannetta.
   * teksti on ennallaan.
   */
  Bagdad: {
    intro: 'Bagdad on Irakin pääkaupunki ja suurin kaupunki, ja siellä asuu noin '
      + 'kahdeksan miljoonaa ihmistä eli runsas viidennes koko maan '
      + 'väestöstä. Kaupunki on Tigrisin varrella Keski-Irakissa, ja joki '
      + 'jakaa sen kahtia: itäpuoli on Rusafa ja länsipuoli Karkh.'
      + '\n\n'
      + 'Kalifi al-Mansur perusti kaupungin vuonna 762 täydellisen ympyrän '
      + 'muotoiseksi, ja siitä tuli abbasidien kalifaatin pääkaupunki. '
      + 'Silloin Bagdad oli yksi maailman suurimmista kaupungeista ja '
      + 'oppineisuuden keskus: **Viisauden talossa** käännettiin arabiaksi '
      + 'kreikkalaisia, persialaisia ja intialaisia teoksia, ja intialaiset '
      + 'numerot levisivät täältä Eurooppaan. Mongolit tuhosivat kaupungin '
      + 'vuonna 1258, ja se menetti asemansa vuosisadoiksi; myöhemmin siitä '
      + 'tuli osmanien Irakin hallintokeskus.'
      + '\n\n'
      + 'Pyöreästä kaupungista ei ole jäljellä mitään näkyvää, ja vanha '
      + 'säilynyt puoli on toisella rannalla. Koska tasangolla ei ole '
      + 'rakennuskiveä, Bagdad on rakennettu tiilestä: **Mustansiriya-koulu** '
      + '1200-luvulta, Khan Mirjanin majatalo 1350-luvulta ja kaupunginmuurin '
      + 'viimeinen portti ovat samaa ainetta. Kahvilassa tee tulee lasissa '
      + 'eikä kupissa, ja joen rannalla grillataan yhä masgoufia.',
    teksti: 'Bagdad on Tigrisin varrella Keski-Irakissa, tasangolla '
      + 'Tigrisin ja Eufratin välissä. Kaupungin perusti kalifi '
      + 'al-Mansur vuonna 762, ja alkuperäinen kaupunki oli täydellisen '
      + 'ympyrän muotoinen — sitä kutsuttiin Pyöreäksi kaupungiksi.'
      + '\n\n'
      + 'Abbasidien kalifaatin aikana Bagdad oli oppineisuuden keskus. '
      + 'Viisauden talossa toimivat matemaatikot, tähtitieteilijät ja '
      + 'lääkärit, ja siellä käännettiin arabiaksi kreikkalaisia, '
      + 'persialaisia ja intialaisia teoksia. Algebra sai nimensä '
      + 'al-Khwarizmin kirjasta, ja intialaiset numerot levisivät '
      + 'täältä Eurooppaan. Mongolit tuhosivat kaupungin vuonna 1258, '
      + 'ja se menetti asemansa.'
      + '\n\n'
      + 'Nykyään Bagdadissa asuu yli seitsemän miljoonaa ihmistä. '
      + 'Kaupunki on kärsinyt sodista ja pommituksista, mutta joen '
      + 'rannalla grillataan yhä masgoufia: joesta pyydetty kala '
      + 'halkaistaan, pystytetään avotulen viereen ja paistetaan '
      + 'hitaasti hiillokseen.',
  },
  Mosul: {
    intro: 'Mosul on Irakin toiseksi suurin kaupunki ja Niniven maakunnan '
      + 'pääkaupunki. Se kasvoi Tigriin ylityspaikkaan Ylä-Mesopotamiassa '
      + '223 metrin korkeuteen, ja arabiankielinen nimi al-Mawsil '
      + 'tarkoittaa liitoskohtaa. Asukkaita on kaupunkiseudulla noin 1,8 '
      + 'miljoonaa (2023), ja väestö on vanhastaan monimuotoinen: arabeja, '
      + 'kurdeja, turkmeeneja, assyrialaisia ja jesidejä. Joki jakaa '
      + 'kaupungin kahtia: länsirannalla on ennen autoja syntynyt '
      + 'kujaverkko, itärannalla leveät kadut.'
      + '\n\n'
      + 'Itärannalla ovat **Niniven kummut**. Sanherib teki Ninivestä '
      + 'Assyrian pääkaupungin noin vuonna 700 eaa., ja siitä tuli aikansa '
      + 'suurin kaupunki. Ninive kukistui 612 eaa. ja unohtui niin '
      + 'tarkkaan, että paikka tunnistettiin vasta 1840-luvulla. '
      + 'Tasangolle sataa sen verran, että viljaa kasvaa ilman kastelua, '
      + 'ja keskiajalta kaupunki tunnetaan ohuesta puuvillakankaasta ja '
      + 'hopeaupotteisesta messingistä.'
      + '\n\n'
      + 'Vuosien 2014–2017 sotatoimissa vanhakaupunki vaurioitui pahoin, '
      + 'ja **jälleenrakennus** etenee kortteli kerrallaan: al-Nurin '
      + 'moskeija minareetteineen vihittiin uudelleen syyskuussa 2025. '
      + 'Lehdessä on siksi sekä sotaa edeltäviä että tuoreita kuvia.',
    teksti: 'Mosul on Irakin toiseksi suurin kaupunki. Se sijaitsee '
      + 'hedelmällisellä tasangolla, jossa sataa enemmän kuin etelässä '
      + '— täällä viljaa voi kasvattaa ilman kastelua. Kaupungin '
      + 'väestö on ollut monimuotoinen: arabeja, kurdeja, turkmeeneja, '
      + 'assyrialaisia ja jesidejä.'
      + '\n\n'
      + 'Ninive oli Assyrian valtakunnan pääkaupunki 700-luvulla eaa. '
      + 'Sennakeribin aikana siellä asui arviolta yli sata tuhatta '
      + 'ihmistä. Babylonialaisten ja meedialaisten liittouma tuhosi '
      + 'kaupungin vuonna 612 eaa., ja sen paikka unohtui, kunnes '
      + 'arkeologit kaivoivat sen esiin 1840-luvulla. Sieltä löytyi '
      + 'myös Assurbanipalin kirjasto: kymmeniätuhansia savitauluja, '
      + 'joiden joukossa on Gilgamesh-eepoksen vanhin säilynyt versio.'
      + '\n\n'
      + 'Vuosina 2014–2017 kaupunki oli Isisin hallussa, ja '
      + 'vanhastakaupungista tuhoutui suuri osa — myös al-Nurin '
      + 'moskeijan kalteva minareetti, kaupungin tunnusmerkki. '
      + 'Jälleenrakennus on käynnissä, ja minareettia pystytetään '
      + 'uudelleen alkuperäisistä tiilistä.',
  },
  Tabriz: {
    intro: 'Tabriz on Iranin kuudenneksi suurin kaupunki ja Itä-Azerbaidžanin '
      + 'maakunnan pääkaupunki. Se on Quru-joen laaksossa '
      + 'tulivuorenharjanteiden välissä — etelässä Sahand, pohjoisessa Eynali '
      + '— ja laakso laskee lännessä Urmiajärvelle 60 kilometrin päässä. '
      + 'Vuoden 2016 laskennassa kaupungissa oli 1 558 693 asukasta ja '
      + 'laajemmalla seudulla yli 1,7 miljoonaa. Kadulla ja kaupassa puhutaan '
      + 'iranilaista azeria, ja persia opitaan koulussa.'
      + '\n\n'
      + 'Keskusta on käytännössä yksi rakennus: **maailman suurin katettu '
      + 'basaari**, jonka tiiliholvisia kujia pitkin kuljetaan paikasta '
      + 'toiseen ja joka on Unescon maailmanperintökohde vuodesta 2010. '
      + 'Kaupunki oli silkkitien pohjoisen haaran etappi, ja sekä Marco Polo '
      + 'että Ibn Battuta mainitsivat basaarin. Käsin solmittu '
      + '**tabrizilainen matto** on yhä kaupungin tunnetuin tuote.'
      + '\n\n'
      + 'Vanhaa rakennuskantaa on silti vähän, sillä seutu on '
      + 'maanjäristysaluetta ja kaupunki on rakennettu uudelleen useaan '
      + 'otteeseen; säilyneet muistomerkit ovat enimmäkseen ajoilta, joina '
      + 'Tabriz oli pääkaupunki — ilkhaanien vuodesta 1265, Qara Qoyunlun ja '
      + 'Aq Qoyunlun 1375–1501 ja safavidien vuoteen 1555.',
    teksti: 'Tabriz on noin 1 350 metrin korkeudessa vuorten ympäröimässä '
      + 'laaksossa Iranin Itä-Azerbaidžanissa. Kaupungin valtakieli on '
      + 'azeri, ja se on ollut vuosisatojen ajan Iranin portti '
      + 'Kaukasiaan ja Anatoliaan.'
      + '\n\n'
      + 'Silkkitien pohjoinen haara kulki Tabrizin kautta, ja siitä '
      + 'kasvoi kaupungin basaari: kilometrien mittainen tiiliholvinen '
      + 'käytävistö, jossa on omat osastonsa matoille, kullalle, '
      + 'mausteille ja kengille. Basaari on ollut käytössä satoja '
      + 'vuosia ja kuuluu Unescon maailmanperintöluetteloon. Tabriz oli '
      + 'myös Safavidien valtakunnan ensimmäinen pääkaupunki 1500-luvun '
      + 'alussa.'
      + '\n\n'
      + 'Persialainen matto on solmittu käsin, ja hyvässä matossa on '
      + 'satoja solmuja neliösenttimetriä kohti. Tabrizin matot '
      + 'tunnetaan tiheydestään ja kuvioistaan, joissa on usein '
      + 'keskusmedaljonki. Alue on tunnettu myös maanjäristyksistään, '
      + 'jotka ovat tuhonneet kaupungin useaan otteeseen.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R6 (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro on nyt lehden etusivun leipäteksti — kahdeksan virkettä
   * kolmessa kappaleessa ('\n\n') ja kaksi maltillista **lihavointia**.
   * Faktat ovat Teheranin omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot ja Matkailijan Teheran,
   * maakartat.js, oma teksti-kenttä alla) sekä en-Wikipedian
   * Tehran-artikkelin hallinto- ja väestöluvuista. Sisältölinjaus:
   * hallinnollinen nykyasema kerrotaan neutraalisti eikä vuoden 1979
   * jälkeisiin kiistoihin mennä. teksti on ennallaan.
   */
  Teheran: {
    intro: 'Teheran on Iranin pääkaupunki, maan suurin kaupunki ja Teheranin '
      + 'maakunnan hallinnollinen keskus: kaupungissa asuu noin yhdeksän '
      + 'miljoonaa ihmistä ja koko kaupunkiseudulla yli viisitoista '
      + 'miljoonaa. Se nousee **Alborz-vuorten** etelärinnettä noin 1 200 '
      + 'metrin korkeudessa, ja rinne on niin jyrkkä, että pohjoisosassa on '
      + 'useita asteita viileämpää kuin eteläosassa. Suunnistaminen on siksi '
      + 'helppoa: vuoret ovat aina pohjoisessa, ja idässä näkyy selkeällä '
      + 'säällä Damavand, Iranin korkein huippu.'
      + '\n\n'
      + 'Teheran oli pitkään vain kylä suuren Rayn kaupungin varjossa, ja '
      + 'kadžaarien Agha Mohammad Khan valitsi sen pääkaupungiksi vasta '
      + 'vuonna 1786. Vielä 1870-luvulla koko kaupunki mahtui muurien sisään: '
      + 'linnake, katettu basaari ja kolme asuinkorttelia. Kadžaariajasta '
      + 'ovat jäljellä **Golestanin palatsi**, joka kuuluu Unescon '
      + 'maailmanperintöön, ja Dar al-Fonun, Iranin ensimmäinen moderni '
      + 'korkeakoulu vuodelta 1851.'
      + '\n\n'
      + 'Vanha ydin on yhä etelässä, jossa basaarin yli kymmenen kilometriä '
      + 'katettua kujaa, palatsi ja kansallismuseo ovat kävelymatkan päässä '
      + 'toisistaan. Vapaapäivänä teheranilaiset nousevat Darbandin polkua '
      + 'puron vartta vuorille teehuoneiden ohi.',
    teksti: 'Teheran on noin 1 200 metrin korkeudessa, ja sen '
      + 'pohjoislaidalla kohoavat Alborz-vuoret. Niiden takana näkyy '
      + 'Damavand, Iranin korkein huippu, 5 610 metriä. Se on uinuva '
      + 'tulivuori ja näkyy kaupungista selkeällä säällä.'
      + '\n\n'
      + 'Teheran oli pitkään pieni kaupunki Rayn suuren kaupungin '
      + 'varjossa. Kadžaari-dynastia teki siitä pääkaupungin vuonna '
      + '1786, ja 1900-luvulla se kasvoi nopeasti. Golestanin palatsi '
      + 'on kadžaariajan tunnetuin rakennus, ja sen peilisalit ja '
      + 'kaakelipihat kuuluvat Unescon maailmanperintöön. Nykyään '
      + 'kaupunkiseudulla asuu yli viisitoista miljoonaa ihmistä.'
      + '\n\n'
      + 'Persialainen puutarha on oma taidemuotonsa: suorakaiteen '
      + 'muotoinen, muurien ympäröimä, ja sen halki kulkee vesikanava. '
      + 'Muoto ei ole vain koriste — se kertoo, että vettä on. '
      + 'Teheranin puistoissa istutaan platanien varjossa, ja '
      + 'vuorille pääsee köysiradalla suoraan kaupungista.',
  },
  Kioto: {
    teksti: 'Kioto perustettiin vuonna 794 nimellä Heian-kyō, ja se '
      + 'rakennettiin kiinalaisen Chang\'anin mallin mukaan '
      + 'suorakulmaiseksi ruudukoksi. Kaupunki oli keisarin '
      + 'pääkaupunki yli tuhat vuotta, vuoteen 1868, jolloin hovi '
      + 'muutti Tokioon. Ruutukaava näkyy kaduilla yhä.'
      + '\n\n'
      + 'Vuosisatojen varrella kaupunkiin kertyi noin kaksituhatta '
      + 'temppeliä ja pyhäkköä, joista seitsemäntoista on Unescon '
      + 'maailmanperintökohteita. Kultainen Kinkaku-ji, Fushimi '
      + 'Inarin punaiset torii-portit ja Kiyomizu-deran puinen '
      + 'terassilava kuuluvat Japanin tunnetuimpiin näkymiin. '
      + 'Nishijinin korttelissa on kudottu silkkiä sadoin vuosin, '
      + 'ja Gionin teehuoneissa elää geikojen ja maikojen perinne.'
      + '\n\n'
      + 'Toisen maailmansodan pommitukset säästivät Kioton lähes '
      + 'kokonaan, joten vanha puutalokaupunki on tallella '
      + 'harvinaisen ehjänä. Siksi kapeat kujat, machiya-talot ja '
      + 'temppelipuutarhat ovat aitoa vanhaa Japania, eivät '
      + 'jälleenrakennettua kulissia.',
    intro: 'Kioto on Japanin vanha pääkaupunki, ja se '
      + 'perustettiin kerralla: vuonna 794 keisari Kanmu siirsi '
      + 'hovin Narasta tänne ja rakennutti uuden kaupungin, '
      + '**Heian-kyōn**, kiinalaisen Chang’anin ruutukaavan mukaan. '
      + 'Kaupunki pysyi keisarien kotina yli tuhat vuotta vuoteen '
      + '1868 asti, vaikka todellinen valta oli välillä '
      + 'Kamakurassa ja Edossa. Vuonna 1869 hovi muutti Tokioon, ja '
      + 'Kioto menetti kerralla sekä hallinnollisen että '
      + 'taloudellisen asemansa — vuoden 1873 matkustaja saapui '
      + 'siis kaupunkiin, joka oli juuri jäänyt tyhjän palatsin '
      + 'ympärille.'
      + '\n\n'
      + 'Vastauksena kaupunki kaivoi Biwa-järveltä '
      + 'kanavan ja sai sen voimalla Japanin ensimmäisen '
      + 'kaupallisen sähköraitiotien. Laaksoa, jossa Kioto seisoo, '
      + 'ympäröivät vuoret kolmelta suunnalta, ja sen läpi virtaa '
      + 'kolme jokea. Uskonnollisia paikkoja on '
      + 'noin kaksituhatta: 1 600 buddhalaista temppeliä ja 400 '
      + 'shintolaista pyhäkköä. Toisen maailmansodan pommitukset '
      + 'ohittivat Kioton lähes kokonaan, joten sotaa edeltäviä '
      + 'puutaloja on yhä paljon. Nishijinin '
      + 'korttelissa kudotaan silkkiä samalla paikalla kuin '
      + '1400-luvulla, ja Gionissa geikot esiintyvät yhä '
      + 'teehuoneissa.',
  },
  Isfahan: {
    intro: 'Isfahan on Iranin kolmanneksi suurin kaupunki ja '
      + 'Isfahanin maakunnan pääkaupunki, 440 kilometriä Teheranista '
      + 'etelään. Se on kasvanut Irania halkovien pohjois–etelä- ja '
      + 'itä–länsireittien risteykseen, kuivalle ylätasangolle '
      + 'Zayandeh-joen varteen. Arabit valloittivat kaupungin vuonna '
      + '642 ja tekivät siitä al-Jibalin maakunnan pääkaupungin. '
      + 'Kukoistus kesti 800-luvulta 1700-luvulle: buyidien ja '
      + 'seldžukkien aikana kaupunki kasvoi suureksi, ja vasta '
      + 'seldžukkivallan päätyttyä noin vuonna 1200 seurasi taantuma.'
      + '\n\n'
      + 'Käänne tuli vuonna 1598, kun **Abbas Suuri** '
      + 'siirsi safavidien pääkaupungin Qazvinista tänne — toisen '
      + 'kerran kaupungin historiassa — ja rakennutti sille uuden '
      + 'keskustan. Siltä ajalta ovat puistokadut, kaakeloidut '
      + 'moskeijat, palatsit ja katetut sillat, joista kaupunki '
      + 'tunnetaan. **Naqsh-e Jahanin aukio** on maailman '
      + 'suurimpia kaupunkiaukioita ja Unescon maailmanperintökohde.'
      + '\n\n'
      + 'Maine tiivistyy persialaiseen sananlaskuun Esfahan nesf-e '
      + 'jahan ast, Isfahan on puoli maailmaa. Nimi on paljon '
      + 'vanhempi: keskipersian Spahān tarkoittaa armeijan paikkaa, ja '
      + 'Ptolemaios kirjoitti sen muodossa Aspadana.',
    teksti: 'Isfahan on Keski-Iranissa Zayanderud-joen varrella, noin '
      + '1 570 metrin korkeudessa. Joki tekee kuivaan maastoon vihreän '
      + 'kaistaleen, ja sen yli kulkee useita vanhoja siltoja, joissa '
      + 'on holvikaarien alla istumapaikkoja.'
      + '\n\n'
      + 'Shaahi Abbas Suuri teki Isfahanista Safavidien pääkaupungin '
      + 'vuonna 1598 ja rakennutti Naqsh-e Jahanin aukion. Se on yksi '
      + 'maailman suurimmista aukioista: noin 560 metriä pitkä ja 160 '
      + 'leveä. Aukion eteläpäässä on shaahin moskeija, itäpuolella '
      + 'Sheikh Lotfollahin moskeija, länsipuolella Ali Qapun palatsi ja '
      + 'pohjoisessa basaarin portti. Kaakelityö on sinistä, turkoosia '
      + 'ja keltaista, ja kupolien kuviot muuttuvat valon mukaan.'
      + '\n\n'
      + 'Aukio kuuluu Unescon maailmanperintöluetteloon. Kaupunki on '
      + 'tunnettu myös hopea- ja kuparityöstä: basaarissa kuuluu '
      + 'vasaran ääni, kun astioihin lyödään kuviot käsin.',
  },
  Persepolis: {
    intro: 'Persepolis ei ole kaupunki vaan yksi rakennusryhmä: kivinen '
      + 'terassi Rahmat-vuoren juurella Etelä-Iranin Farsissa. Nimi on '
      + 'kreikkalaisten antama ja tarkoittaa persialaisten kaupunkia; omalla '
      + 'kielellään paikka oli Pārsa, sama sana kuin koko maakunnan nimi. '
      + 'Vanhimmat jäänteet ovat vuodelta 515 eKr., ja terassin ja sen '
      + 'ensimmäiset palatsit rakennutti **Dareios I**; työtä jatkoivat '
      + 'Xerxes I sekä Artakserkses I ja III.'
      + '\n\n'
      + 'Alusta on 125 000 neliömetriä, ja se on osin muurattu tasangolle, '
      + 'osin louhittu vuoren kylkeen. Valtakuntaa ei silti johdettu täältä '
      + 'vaan Susasta, Babylonista ja Ekbatanasta: Persepolis oli '
      + 'seremoniallinen pääkaupunki. Tunnetuin osa ovat **Apadanan '
      + 'porrasreliefit**, joissa valtakunnan kansat tuovat lahjojaan kukin '
      + 'omassa asussaan, ja hallinnon arjesta kertovat savitaulut vuosilta '
      + '509–493 eKr.'
      + '\n\n'
      + 'Vuonna 330 eKr. Aleksanteri Suuren joukot valtasivat paikan, ja '
      + 'tuli tuhosi rakennusten puuosat, mutta kivi jäi pystyyn. Sen '
      + 'jälkeen katosi nimikin: raunioita kutsuttiin vuosisatoja Jamshidin '
      + 'valtaistuimeksi ja neljäksikymmeneksi minareetiksi.',
    teksti: 'Persepolis on Etelä-Iranissa Farsin maakunnassa, '
      + 'terassilla vuoren juurella. Dareios I aloitti rakentamisen '
      + 'noin vuonna 518 eaa., ja työ jatkui useiden kuninkaiden ajan. '
      + 'Terassi on noin 125 000 neliömetriä, ja sille noustaan loivia '
      + 'portaita, joita pitkin hevonenkin pääsee.'
      + '\n\n'
      + 'Apadana-palatsin portaiden reliefit ovat paikan tunnetuin '
      + 'osa. Niissä kulkee jono lähettiläitä yli kahdestakymmenestä '
      + 'kansasta: meedialaisia, egyptiläisiä, intialaisia, '
      + 'kreikkalaisia, nubialaisia. Jokainen tuo tunnusomaisen '
      + 'lahjansa — kameleita, kangasta, astioita, kirahvin. '
      + 'Kuvaohjelma ei kerskaile voitetuista taisteluista vaan '
      + 'luettelee kansat, jotka toivat lahjoja.'
      + '\n\n'
      + 'Aleksanteri Suuri valtasi ja poltti Persepoliksen vuonna 330 '
      + 'eaa. Pylväät ovat siitä asti seisseet katottomina. Paikka on '
      + 'Unescon maailmanperintökohde ja Iranin tunnetuin '
      + 'muinaisjäännös.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R9a (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro on nyt lehden ETUSIVUN LEIPÄTEKSTI — 7–10 virkettä kolmessa
   * kappaleessa ('\n\n') ja kaksi maltillista **lihavointia**. Faktat
   * ovat kaupungin omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot ja Matkailijan Jekaterinburg;
   * maakartat.js: kohdekartan esittely), ei uusista lähteistä.
   * teksti-kenttä on ennallaan. Venäjä-linjaus: vuoden 1918
   * aihepiiriä ei ole introssa.
   */
  Jekaterinburg: {
    intro: 'Jekaterinburg on Uralin pääkaupunki ja Venäjän neljänneksi '
      + 'väkirikkain kaupunki: vuoden 2021 väenlaskussa asukkaita oli '
      + '1 544 376. Se on vuoriston itärinteellä 1 667 kilometriä '
      + 'Moskovasta itään, kaksi tuntia pääkaupungin aikaa edellä. '
      + 'Uralvuoret ovat tässä matalia ja loivia, ja juuri siksi tiet ja '
      + 'radat Euroopan ja Aasian välillä vedettiin tästä; länsipuolella '
      + 'seisoo obeliski maanosien rajalla.'
      + '\n\n'
      + 'Kaupunki alkoi padosta. Vasili Tatištšev valitsi vuonna 1721 '
      + 'Iset-joen rannan, jossa oli sekä malmia että metsää, ja padon '
      + 'voimalla käyvän rautaruukin vasarapaja koeajettiin '
      + '**18. marraskuuta 1723** — siitä päivästä lasketaan kaupungin '
      + 'ikä. Nimi tuli keisarinna Katariina I:ltä, ja ruukissa alettiin '
      + '1725 lyödä kuparirahaa. Siperian valtatie avautui 1763 ja teki '
      + 'kaupungista idän ja lännen kaupan solmukohdan — ikkunan Aasiaan.'
      + '\n\n'
      + 'Uralin malmit näkyvät yhä: museoissa on korukiviä ja Kaslin '
      + 'ruukin valurautaa, ja **malakiitti** on se kivi, josta Pavel '
      + 'Bažovin tarinat kertovat. Keskustassa on kolme aikaa '
      + 'päällekkäin: klassismia, 1900-luvun alun eklektiikkaa ja '
      + '1920–1930-luvun konstruktivismia.',
    teksti: 'Jekaterinburg on Uralvuorten itärinteellä, siinä missä '
      + 'Euroopan ja Aasian raja tavallisesti vedetään. Uralvuoret '
      + 'eivät ole korkeita — enimmäkseen metsäisiä kumpuja, joiden '
      + 'korkein huippu jää alle 1 900 metrin — mutta ne ovat vanha ja '
      + 'tunnustettu raja kahden maanosan välillä.'
      + '\n\n'
      + 'Kaupunki perustettiin vuonna 1723 rautaruukin ympärille ja '
      + 'nimettiin keisarinna Katariina I:n mukaan. Uralista tuli '
      + 'Venäjän raskaan teollisuuden sydän: rautaa, kuparia ja '
      + 'myöhemmin panssarivaunuja. Vuonna 1918 kaupungissa surmattiin '
      + 'keisari Nikolai II perheineen, ja paikalle on rakennettu '
      + 'kirkko. Toisen maailmansodan aikana tänne siirrettiin tehtaita '
      + 'lännestä pois rintaman tieltä.'
      + '\n\n'
      + 'Nykyään Jekaterinburgissa asuu noin puolitoista miljoonaa '
      + 'ihmistä. Se on Siperian-radan varrella oleva solmukohta ja '
      + 'yliopistokaupunki. Rajaobeliskeja on alueella useita, ja '
      + 'tunnetuimman luona käydään ottamassa kuva jalat kahdessa '
      + 'maanosassa.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R9a: sama linjaus kuin
   * Jekaterinburgissa. Faktat ovat kaupungin omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot, Historia-sivu ja
   * Matkailijan Novosibirsk; maakartat.js).
   */
  Novosibirsk: {
    intro: 'Novosibirsk on Siperian suurin kaupunki ja Moskovan ja '
      + 'Pietarin jälkeen Venäjän kolmanneksi väkirikkain: vuoden 2021 '
      + 'väenlaskussa asukkaita oli 1 633 595. Se on Länsi-Siperian '
      + 'tasangolla Obin molemmin puolin, ja ilmasto on jyrkkä '
      + 'mannerilmasto: tammikuun keskilämpö on seitsemäntoista '
      + 'pakkasastetta, heinäkuun lähes kaksikymmentä lämpöastetta.'
      + '\n\n'
      + 'Suurten kaupunkien joukossa se on nuorin. Se syntyi **vuonna '
      + '1893 rautatiesillan työmaalle**: Transsiperian radan piti '
      + 'ylittää Ob, ja Nikolai Garin-Mihailovski valitsi kohdan, jossa '
      + 'molemmat rannat ja uoma ovat kalliota. '
      + 'Silta valmistui 1897. Nimi oli vuodesta 1895 '
      + 'Novonikolajevsk ja nykyinen vuodesta 1926; miljoona asukasta '
      + 'täyttyi 2. syyskuuta 1962, alle seitsemässäkymmenessä vuodessa '
      + 'perustamisesta.'
      + '\n\n'
      + 'Vanhaa keskustaa ei ole: ydin on 1900-luvun alun ja '
      + '1930-luvun rakentama, ja sen selkäranka on Punainen valtakatu. '
      + 'Tunnetuin talo on **oopperatalo**, Venäjän suurin, jonka kupoli '
      + 'on kuusikymmentä metriä leveä. Kaupungin eteläpuolen metsään '
      + 'perustettiin 1957 '
      + 'Akademgorodok, oma tiedekaupunkinsa, jossa asui parhaimmillaan '
      + '65 000 tutkijaa perheineen.',
    teksti: 'Novosibirsk on Länsi-Siperian tasangolla Obin varrella. '
      + 'Ilmasto on jyrkkä mannerilmasto: talvella pakkanen käy '
      + 'kolmessakymmenessä asteessa, kesällä lämpötila voi nousta '
      + 'kolmeenkymmeneen. Joki jäätyy marraskuusta huhtikuulle.'
      + '\n\n'
      + 'Kaupunki alkoi rautatiesillan rakentajien leiristä. Ensin se '
      + 'oli nimeltään Novonikolajevsk, ja vuonna 1926 nimi vaihtui '
      + 'Novosibirskiksi. Kasvu oli poikkeuksellisen nopeaa: '
      + 'miljoonan asukkaan raja ylittyi alle seitsemässäkymmenessä '
      + 'vuodessa perustamisesta. Sotavuosina tänne siirrettiin '
      + 'tehtaita ja teattereita, ja 1957 kaupungin liepeille '
      + 'perustettiin Akademgorodok, kokonainen tiedekaupunginosa '
      + 'metsään.'
      + '\n\n'
      + 'Novosibirskin oopperatalo on Venäjän suurin, ja se avattiin '
      + 'sodan aikana vuonna 1945. Kaupunki on Siperian liikenteen ja '
      + 'kaupan keskus, ja Siperian rata kulkee yhä sen läpi.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R9a: sama linjaus kuin
   * Jekaterinburgissa. Faktat ovat kaupungin omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: johdannot, nostot ja
   * Matkailijan Irkutsk; maakartat.js).
   */
  Irkutsk: {
    intro: 'Irkutsk on Itä-Siperian vanha kauppakaupunki Angaran '
      + 'mutkassa: vuoden 2010 väenlaskussa asukkaita oli 587 891. '
      + 'Kaupunki alkoi verotusasemasta: Ivan Pohabov rakensi 1652 '
      + 'talvimajan turkiskauppaa ja jasak-veroa varten, ja Jakov '
      + 'Pohabov pystytti 1661 lähelle paalulinnoituksen. '
      + 'Kaupunkioikeudet tulivat 1686.'
      + '\n\n'
      + 'Vaurauden toi kauppa. Siperian valtatie Moskovasta valmistui '
      + '1760, ja Kjahtan rajakaupan myötä Kiinan tee ja silkki tulivat '
      + 'täällä laajalti saataville; vuonna 1821 Irkutskista tuli '
      + 'Itä-Siperian kenraalikuvernöörin istuin. **Dekabristikapinan** '
      + 'jälkeen kaupunkiin karkotettiin upseereita ja aatelisia, ja '
      + 'vuosisadan loppuun mennessä joka kolmas asukas oli karkotettu — '
      + 'heidän jälkeensä jäivät koulut, kirjastot ja koristeelliset '
      + 'puutalot.'
      + '\n\n'
      + 'Heinäkuussa 1879 kaksi tulipaloa tuhosi puolet kaupungista, ja '
      + 'sen jälkeen puusta rakentaminen kiellettiin joen '
      + 'puolella: rannassa on kivitaloja ja palorajan takana puinen '
      + 'Irkutsk. Kaupunkia alettiin kutsua Siperian Pariisiksi, ja '
      + 'ensimmäinen juna saapui elokuussa 1898. Kaupungista 72 '
      + 'kilometriä ylävirtaan on **Baikal**, maailman syvin ja vanhin '
      + 'järvi.',
    teksti: 'Irkutsk on Angara-joen varrella noin 70 kilometrin päässä '
      + 'Baikaljärvestä. Kaupunki perustettiin 1661 turkiskaupan '
      + 'tukikohdaksi, ja siitä tuli Itä-Siperian hallinnollinen '
      + 'keskus. Puutaloja on säilynyt paljon, ja niiden ikkunanpielet '
      + 'on veistetty koristeellisiksi.'
      + '\n\n'
      + 'Vuoden 1825 dekabristikapinan jälkeen kapinaan osallistuneita '
      + 'aatelisia karkotettiin Irkutskiin. Osa heidän vaimoistaan '
      + 'seurasi vapaaehtoisesti, ja he toivat mukanaan kirjoja, '
      + 'soittimia ja koulun. Kaupunkia alettiin kutsua Siperian '
      + 'Pariisiksi. Baikal syntyi mannerlaattojen repeämään, se on '
      + 'yli 1 640 metriä syvä ja noin 25 miljoonaa vuotta vanha — '
      + 'maailman vanhin järvi.'
      + '\n\n'
      + 'Baikalin vesi on poikkeuksellisen kirkasta, ja järvessä elää '
      + 'satoja lajeja, joita ei ole missään muualla — muun muassa '
      + 'nerpa, maailman ainoa kokonaan makeassa vedessä elävä hylje. '
      + 'Talvella jää kantaa auton.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R9b (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro on nyt lehden etusivun leipäteksti — kahdeksan virkettä
   * kolmessa kappaleessa ('\n\n') ja kaksi maltillista **lihavointia**.
   * Faktat ovat Jakutskin omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: kaupunki- ja ikirouta-sivun johdannot,
   * nostot ja Matkailijan Jakutsk; maakartat.js), ei uusista lähteistä.
   * teksti-kenttä on ennallaan.
   */
  Jakutsk: {
    intro: 'Jakutsk on Sahan tasavallan pääkaupunki Lena-joen '
      + 'länsirannalla Tuimaadan laaksossa, noin neljäsataaviisikymmentä '
      + 'kilometriä napapiiristä etelään. Kasakkapäällikkö Pjotr Beketov '
      + 'pystytti 1632 joen vastarannalle hirsivarustuksen, ja linnoitus '
      + 'siirrettiin vuosina 1642–1643 nykyiselle paikalleen. Asukkaita oli '
      + 'vuoden 1897 väenlaskussa 6 535 ja vuoden 2021 laskennassa 355 443, '
      + 'ja heistä 59,2 prosenttia on jakuutteja.'
      + '\n\n'
      + 'Jakutsk on **maailman suurin yhtenäisen ikiroudan päälle '
      + 'rakennettu kaupunki**: talot seisovat betonipaaluilla irti maasta, '
      + 'ja vesi- ja lämpöputket kulkevat eristettyinä pukkien päällä '
      + 'katujen vieressä. Maa on jäässä runsaan kahdensadan metrin '
      + 'syvyyteen, ja vuonna 1960 perustettu ikiroutainstituutti tutkii '
      + 'jäätyneelle maalle rakentamista.'
      + '\n\n'
      + 'Vuodenaikojen ero on maailman suurimpia: kylmin mitattu lukema on '
      + '−64,4 astetta vuodelta 1891 ja kuumin +38,4 astetta vuodelta 2011. '
      + '**Siltaa Lenan yli ei ole koko tasavallassa**, joten kesällä joki '
      + 'ylitetään lautalla ja keskitalvella ajetaan jäätietä pitkin. '
      + 'Seudulta louhitaan timantteja, kultaa ja kivihiiltä.',
    teksti: 'Jakutsk on Lena-joen varrella Itä-Siperiassa, Sahan '
      + 'tasavallan pääkaupunki. Maa on jäässä satojen metrien syvyyteen '
      + 'asti, ja vain ohut pintakerros sulaa kesäksi. Ero vuodenaikojen '
      + 'välillä on maailman suurimpia: talvella mitataan yli '
      + 'viidenkymmenen asteen pakkasia, kesällä yli kolmenkymmenen '
      + 'asteen lämpöä.'
      + '\n\n'
      + 'Kaupunki perustettiin 1632 kasakkojen linnoitukseksi. '
      + 'Rakentaminen ikiroudalle vaatii oman tekniikkansa: talot '
      + 'nostetaan betonipaaluille, jotka porataan syvälle jäätyneeseen '
      + 'maahan, ja rakennuksen alle jätetään ilmarako. Ilman rakoa '
      + 'lämpö sulattaisi maan, ja talo painuisi vinoon. Putket kulkevat '
      + 'maan päällä eristettyinä samasta syystä.'
      + '\n\n'
      + 'Sahan tasavalta on Venäjän suurin hallintoalue ja sen alta '
      + 'louhitaan suuri osa maan timanteista. Ikiroudasta on löytynyt '
      + 'myös hyvin säilyneitä mammutteja. Jakutskiin ei johda '
      + 'rautatietä eikä ympärivuotista maantietä joen yli.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R9b. Intro on koottu Magadanin
   * omista jo tarkistetuista teksteistä (kulttuuri-kategoriat.js:n
   * johdanto, nosto «Sitsikaupunki kahden lahden välissä» ja
   * Matkailijan Magadan; nahtavyysjutut.js:n Nagajevanlahti;
   * maakartat.js). VENÄJÄ-LINJAUS (omistaja 20.8.2026): kaupungin
   * synty 1930-luvulla kerrotaan neutraalina rakentamisen historiana,
   * eikä intro laajenna leirihistoriaa — se käsitellään kerran
   * kansisivun Surun maski -nostossa, joka on ennallaan.
   */
  Magadan: {
    intro: 'Magadan on satamakaupunki Ohotanmeren pohjoisrannalla ja '
      + 'Magadanin alueen hallinnollinen keskus. Kaupunki istuu Staritskin '
      + 'niemimaan kannaksella kahden lahden välissä: lounaassa '
      + '**Nagajevanlahti**, jota on kutsuttu koko Ohotanmeren parhaaksi '
      + 'ankkuripaikaksi, koillisessa Gertnerinlahti. Lahti oli '
      + 'merikartoilla kauan ennen kaupunkia: amerikkalaiset '
      + 'valaanpyytäjät ankkuroivat siihen vuosina 1852–1869 ja merkitsivät '
      + 'sen Jeannette Harbouriksi.'
      + '\n\n'
      + 'Asuintalot, koulu ja sairaala alkoivat nousta rannalle kesäkuussa '
      + '1929, ja kaupunkioikeudet tulivat 14. heinäkuuta 1939. Kasvu oli '
      + 'nopeaa ja lasku on ollut pitkä: vuoden 1989 väenlaskussa asukkaita '
      + 'oli 151 652, vuoden 2024 arviossa enää 89 193.'
      + '\n\n'
      + 'Rautatietä ei ole, ja ainoa maayhteys on **Kolyman valtatie**, '
      + 'joka alkaa kaupungin pohjoislaidalta ja vie 2 032 kilometrin '
      + 'päähän Jakutiaan. Satama on Petropavlovskin jälkeen Venäjän '
      + 'koillisosan toiseksi suurin, ja se pidetään auki jäänmurtajilla, '
      + 'sillä jäätä lahdella on marraskuun lopulta kesäkuun puoliväliin. '
      + 'Elinkeinot ovat kullankaivuu ja kalastus.',
    teksti: 'Magadan on Venäjän Kaukoidässä Nagajevanlahden rannalla. '
      + 'Kaupunki on käytännössä eristyksissä: maantietä etelään ei ole, '
      + 'ja ainoa tie johtaa pohjoiseen sisämaahan. Ilmasto on kylmä ja '
      + 'sumuinen, ja meri jäätyy talveksi.'
      + '\n\n'
      + 'Kaupunki perustettiin 1929, ja se kasvoi Dalstroi-organisaation '
      + 'hallinnollisena keskuksena. Kolyman alueelta löytyi kultaa, ja '
      + 'sen louhintaan käytettiin vankityövoimaa: satojatuhansia '
      + 'ihmisiä kuljetettiin tämän sataman kautta leireille. Kolyman '
      + 'valtatietä kutsutaan luiden tieksi, koska se rakennettiin '
      + 'vankityönä ja kuolleet haudattiin usein tienpenkkaan. '
      + 'Muistomerkki Surun naamio pystytettiin 1996.'
      + '\n\n'
      + 'Nykyään Magadanissa asuu noin 90 000 ihmistä, alle puolet '
      + 'huippuvuosien määrästä. Kultaa louhitaan yhä, ja satama '
      + 'palvelee koko Kolyman aluetta.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R9b. Kamtšatka on ALUELEHTI ilman
   * kohdekarttaa, joten remontista tehtiin kohdat 1 ja 2. Intron
   * faktat ovat niemimaan omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: kaupunki- ja tulivuorisivun johdannot,
   * nostot ja Matkailijan Kamtšatka). Suljetun alueen vuodet ovat
   * neutraalia historiaa, kuten Venäjä-linjaus edellyttää.
   */
  'Kamtšatkan niemimaa': {
    intro: 'Kamtšatka on niemimaa Venäjän Kaukoidässä Ohotanmeren, '
      + 'Beringinmeren ja Tyynenmeren välissä: pituutta on noin '
      + '1 200 kilometriä ja pinta-alaa neljänneksen Suomea vähemmän. '
      + 'Niemimaa kuuluu Tyynenmeren tulirenkaaseen, jossa Tyynenmeren '
      + 'laatta painuu Euraasian laatan alle noin kahdeksan senttimetriä '
      + 'vuodessa. Tulivuoria on siksi satoja ja niistä yli kaksikymmentä '
      + 'toimivia; korkein on **Kljutševskaja sopka**, 4 750 metriä.'
      + '\n\n'
      + 'Ainoa suuri kaupunki on satamakaupunki Petropavlovsk-Kamtšatski '
      + 'Avatšanlahden rannalla. Se sai nimensä kahdesta pakettiveneestä, '
      + 'jotka tulivat lahdelle talvehtimaan syksyllä 1740. Niemimaan '
      + 'vanhinta väestöä ovat itelmeenit, joiden elämän ja kielen kirjasi '
      + 'muistiin Stepan Krašeninnikov neljän vuoden matkallaan 1737–1741.'
      + '\n\n'
      + 'Kamtšatkalle ei vie maantietä eikä rautatietä, vaan sinne tullaan '
      + 'lentäen tai laivalla, ja neuvostoaikana koko niemimaa oli suljettu '
      + 'ulkopuolisilta vuoteen 1989 ja ulkomaalaisilta vuoteen 1990. Maa '
      + 'on kuuma myös pinnan alla: kuumia lähteitä on lukemattomia, ja '
      + '**Gejsirien laakso** löytyi vasta huhtikuussa 1941 '
      + 'koiravaljakolla tehdyllä retkellä.',
    teksti: 'Kamtšatka työntyy Ohotanmeren ja Tyynenmeren väliin noin '
      + '1 250 kilometrin pituisena. Se kuuluu Tyynenmeren tuliseen '
      + 'kehään, jossa mannerlaatat painuvat toistensa alle — siksi '
      + 'tulivuoria on niin paljon. Kljutševskaja Sopka on Euraasian '
      + 'korkein toiminnassa oleva tulivuori, lähes 4 800 metriä.'
      + '\n\n'
      + 'Niemimaa oli Neuvostoliiton aikana suljettu sotilasalue, eikä '
      + 'sinne päässyt ilman lupaa. Asukkaita on vähän ja teitä vielä '
      + 'vähemmän: pääkaupunkiin Petropavlovsk-Kamtšatskiin ei johda '
      + 'maantietä muualta Venäjältä, vaan sinne pääsee vain lentäen '
      + 'tai laivalla. Geysirien laakso löydettiin vasta 1941.'
      + '\n\n'
      + 'Kamtšatkan joissa kutee valtava määrä lohta, ja sen ansiosta '
      + 'niemimaalla elää enemmän ruskeakarhuja kuin missään muualla '
      + 'Euraasiassa. Tulivuoret kuuluvat Unescon maailmanperintöön.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R9b. Sahalin on ALUELEHTI ilman
   * kohdekarttaa, joten remontista tehtiin kohdat 1 ja 2. Intron
   * faktat ovat saaren omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: kaupunki- ja historiasivun johdannot,
   * nostot ja Matkailijan Sahalin). Katorga ja Karafuto kerrotaan
   * historiallisina vaiheina ilman nykypolitiikkaa.
   */
  Sahalin: {
    intro: 'Sahalin on Venäjän suurin saari, pitkä ja kapea kaistale '
      + 'Ohotanmeressä: mittaa on 948 kilometriä pohjoisesta etelään ja '
      + 'kapeimmillaan vain 26 kilometriä. '
      + 'Mantereesta sen erottaa Tatarinsalmi, jota pitkin Gennadi '
      + 'Nevelskoi purjehti 1849 ja todisti, ettei saari olekaan '
      + 'mantereesta työntyvä niemi. Kaksi kolmasosaa saaresta on '
      + 'vuoristoa, ja etelässä La Pérousen salmen takana on Japanin '
      + 'Hokkaido.'
      + '\n\n'
      + 'Saarella on kolme alkuperäiskansaa: nivkhit pohjoisessa, uiltat '
      + 'keskiosassa ja ainut etelässä. Venäjä käytti saarta '
      + '**pakkotyösiirtolana** vuodesta 1869 vuoteen 1906, ja kirjailija '
      + 'Anton Tšehov saapui sinne kesällä 1890 ja teki oman '
      + 'väestölaskentansa noin kymmenelletuhannelle kortistokortille.'
      + '\n\n'
      + 'Vuonna 1875 Japani luopui osuudestaan Sahaliniin ja sai '
      + 'vastineeksi Kuriilit, mutta vuoden 1905 '
      + 'rauhassa saaren eteläpuolisko siirtyi Japanille **Karafuton** '
      + 'prefektuuriksi, ja koko saari tuli Neuvostoliitolle elokuussa '
      + '1945. Japanilainen kerros näkyy yhä: saaren rautatiet kulkivat '
      + 'kapealla japanilaisella raideleveydellä vuoteen 2019. Ainoa suuri '
      + 'kaupunki on Južno-Sahalinsk, entinen Toyohara.',
    teksti: 'Sahalin on noin 950 kilometriä pitkä mutta kapeimmillaan '
      + 'vain 26 kilometriä leveä. Pohjoisosa on tundraa ja '
      + 'ikiroudan aluetta, eteläosassa kasvaa havumetsää. Ero on '
      + 'suuri: pohjoispäässä on jäitä, kun eteläpäässä on jo kevät.'
      + '\n\n'
      + 'Saaresta riitelivät Venäjä ja Japani pitkään. Venäjä käytti '
      + 'sitä 1800-luvulla rangaistussiirtolana, ja kirjailija Anton '
      + 'Tšehov matkusti sinne 1890 kirjoittaakseen vankien oloista. '
      + 'Vuoden 1905 sodan jälkeen Japani sai eteläpuoliskon, jota se '
      + 'kutsui Karafutoksi, ja hallitsi sitä vuoteen 1945. Alkuperäiset '
      + 'kansat, ainut ja nivkit, jäivät valtioiden väliin.'
      + '\n\n'
      + 'Saaren edustalta on löytynyt suuria öljy- ja kaasuesiintymiä, '
      + 'ja niiden hyödyntäminen on saaren tärkein elinkeino '
      + 'kalastuksen ohella.',
  },
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R9a: sama linjaus kuin
   * Jekaterinburgissa. Faktat ovat kaupungin omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot ja Matkailijan
   * Vladivostok; maakartat.js; nahtavyysjutut.js). Suljetun kaupungin
   * vuodet 1952–1992 kerrotaan neutraalina historiana.
   */
  Vladivostok: {
    intro: 'Vladivostok on Venäjän tärkein Tyynenmeren satama ja '
      + 'Transsiperian radan itäinen pääteasema: laiturin päässä seisoo '
      + 'kilometripylväs, jossa lukee 9288. Kaupunki on '
      + 'Muravjov-Amurskin niemimaan eteläkärjessä kahden veden välissä — '
      + 'lännessä Amurinlahti, idässä Kultaisen sarven satamalahti — ja '
      + 'muuten se kiipeää kukkuloille. Se on Kaukoidän liittopiirin '
      + 'pääkaupunki.'
      + '\n\n'
      + 'Kenraalikuvernööri Nikolai Muravjov-Amurski nimesi poukaman '
      + 'vuonna 1859 Kultaiseksi sarveksi Konstantinopolin mukaan, ja '
      + 'nimeksi vakiintui **Vladivostok, idän '
      + 'hallitsija**. Sotilasosasto jätettiin rantaan kesäkuussa 1860, '
      + 'ja 1871 tänne siirrettiin Siperian laivasto-osaston '
      + 'tukikohta. Kiinalaiset olivat kutsuneet poukamaa '
      + 'merimakkaralahdeksi, ja vuosisadan alussa jopa puolet '
      + 'asukkaista oli aasialaisia.'
      + '\n\n'
      + 'Neuvostoaika käänsi oven kiinni: vuodesta 1952 vuoteen 1992 '
      + 'kaupunki oli suljettu, eikä ulkomaalaisilla ollut sinne asiaa. '
      + 'Vuonna 2012 valmistui kaksi jättisiltaa, joista **Russkin '
      + 'sillan** 1 104 metrin jänneväli on vinoköysisiltojen '
      + 'maailmanlistan kärkeä. Katukuvassa eurooppalainen kivikaupunki '
      + 'ja Aasian naapurit sekoittuvat.',
    teksti: 'Vladivostok on kukkuloilla Kultaisen sarven lahden '
      + 'ympärillä, lähellä Kiinan ja Korean rajaa. Lahti on syvä ja '
      + 'suojaisa, ja se jäätyy talvella vain lyhyeksi aikaa. '
      + 'Kaupunki perustettiin 1860, ja nimi tarkoittaa idän hallitsijaa.'
      + '\n\n'
      + 'Siperian rata valmistui kokonaisuudessaan 1916, ja se yhdisti '
      + 'Moskovan Tyyneenmereen. Matka kestää noin kuusi vuorokautta ja '
      + 'ylittää seitsemän aikavyöhykettä. Neuvostoliiton aikana '
      + 'Vladivostok oli Tyynenmeren laivaston tukikohta ja suljettu '
      + 'kaupunki: ulkomaalaiset eivät päässeet sinne vuosina 1958–1991.'
      + '\n\n'
      + 'Kaupungin ilme muistuttaa kukkuloineen ja siltoineen San '
      + 'Franciscoa. Vuonna 2012 valmistuivat Kultaisen sarven ja '
      + 'Venäjänsaaren riippusillat, joista jälkimmäisen keskijänne on '
      + 'maailman pisimpiä.',
  },
  Astana: {
    intro: 'Astana on Kazakstanin pääkaupunki, joka rakennettiin '
      + 'lähes tyhjälle arolle vuodesta 1997 alkaen. Se on maailman '
      + 'toiseksi kylmin pääkaupunki heti Ulaanbaatarin jälkeen.',
    teksti: 'Astana on Kazakstanin pohjoisosassa Ishim-joen varrella '
      + 'keskellä aroa. Ympärillä ei ole vuoria eikä metsää, joten '
      + 'tuuli käy esteettä. Talvella pakkanen laskee alle '
      + 'kolmenkymmenen asteen, kesällä lämpötila nousee yli '
      + 'kolmenkymmenen.'
      + '\n\n'
      + 'Paikalla oli aiemmin pieni kaupunki nimeltä Akmola, ja '
      + '1950-luvulla se oli uudisviljelyohjelman keskus. Vuonna 1997 '
      + 'pääkaupunki siirrettiin tänne Almatysta, joka on maan '
      + 'eteläkulmassa vuorten ja maanjäristysvyöhykkeen äärellä. '
      + 'Uuteen keskustaan rakennettiin ministeriöt, lasitornit ja '
      + 'telttamainen Khan Shatyr -kauppakeskus. Kaupungin nimi on '
      + 'vaihtunut useaan otteeseen: Akmola, Astana, Nur-Sultan ja '
      + 'vuodesta 2022 taas Astana.'
      + '\n\n'
      + 'Kaupungissa asuu nyt yli miljoona ihmistä. Sen laidalla aro '
      + 'alkaa ilman esikaupunkia: katu loppuu, ja horisontti on tyhjä.',
  },
  Samarkand: {
    intro: 'Samarkand oli Timurin valtakunnan pääkaupunki 1300-luvulla '
      + 'ja silkkitien kuuluisin kaupunki. Sen Registanin aukiota '
      + 'reunustaa kolme koulurakennusta, joiden julkisivut ovat '
      + 'kokonaan sinistä ja kultaista kaakelia.',
    teksti: 'Samarkand on Uzbekistanissa Zarafshan-joen laaksossa. '
      + 'Kaupunki on yli 2 700 vuotta vanha, ja se oli antiikin '
      + 'kreikkalaisille Marakanda. Sijainti silkkitien varrella teki '
      + 'siitä rikkaan: idästä tuli silkkiä ja paperia, lännestä '
      + 'lasia ja hopeaa.'
      + '\n\n'
      + 'Mongolit tuhosivat kaupungin 1220, mutta Timur teki siitä '
      + 'pääkaupunkinsa 1370 ja kutsui parhaat käsityöläiset '
      + 'valtakuntansa joka kolkasta rakentamaan sitä. Hänen '
      + 'pojanpoikansa Ulug Beg oli tähtitieteilijä ja rakensi '
      + 'kaupunkiin observatorion 1420-luvulla. Sen jättimäisellä '
      + 'kvadrantilla hän mitasi vuoden pituuden virheellä, joka on '
      + 'alle minuutin — sata vuotta ennen Kopernikusta.'
      + '\n\n'
      + 'Registanin aukio, Bibi-Khanymin moskeija ja Shah-i-Zindan '
      + 'hautakuja kuuluvat Unescon maailmanperintöön. Kaakelien '
      + 'sinistä sävyä kutsutaan usein Samarkandin siniseksi.',
  },
  'Kašgar': {
    intro: 'Kašgar on Kiinan läntisin kaupunki, siellä missä silkkitien '
      + 'pohjoinen ja eteläinen haara yhtyvät Taklamakanin autiomaan '
      + 'ympäri kierrettyään.',
    teksti: 'Kašgar on Xinjiangin uiguurien autonomisella alueella, '
      + 'keitaalla Taklamakanin länsireunalla. Ympärillä nousevat '
      + 'Pamir, Tien Shan ja Kunlun — kaikki yli seitsemän kilometrin '
      + 'korkeuteen. Kaupunki on lähempänä Bagdadia kuin Pekingiä.'
      + '\n\n'
      + 'Kauppapaikkana Kašgar on toiminut yli kaksituhatta vuotta. '
      + 'Autiomaata ei voinut ylittää suoraan, joten karavaanit '
      + 'kiersivät sen pohjois- tai eteläpuolelta, ja reitit kohtasivat '
      + 'täällä. Kaupunki on ollut vuorollaan Kiinan, turkkilaisten '
      + 'ruhtinaskuntien ja lyhyen aikaa itsenäisten hallitsijoiden '
      + 'käsissä, ja 1800-luvulla se oli Venäjän ja Britannian '
      + 'vakoilukilpailun näyttämö.'
      + '\n\n'
      + 'Sunnuntain karjatori on yhä käytössä: siellä myydään lampaita, '
      + 'aaseja, hevosia ja kameleita, ja kaupanteko päätetään kättä '
      + 'lyömällä. Vanhan savitiilikaupungin rakennuksia on purettu ja '
      + 'rakennettu uudelleen 2000-luvulla.',
  },
  'Ulan Bator': {
    intro: 'Ulaanbaatar on Mongolian pääkaupunki ja maailman kylmin '
      + 'pääkaupunki. Sen laidoilla asutaan yhä geriteltoissa, joiden '
      + 'savupiippu nousee keskeltä kattoa.',
    teksti: 'Ulaanbaatar on noin 1 300 metrin korkeudessa vuorten '
      + 'ympäröimässä laaksossa Tuul-joen varrella. Vuoden '
      + 'keskilämpötila jää alle nollan. Talvella laaksoon jää '
      + 'kylmää ilmaa, ja hiilen ja puun poltto tekee ilmanlaadusta '
      + 'huonon.'
      + '\n\n'
      + 'Kaupunki perustettiin 1639 buddhalaisen luostarin ympärille, ja '
      + 'se siirtyi paikasta toiseen lähes kolmekymmentä kertaa ennen '
      + 'kuin asettui nykyiselle paikalleen 1778. Nimi tarkoittaa '
      + 'punaista sankaria, ja se annettiin 1924. Mongolia on maailman '
      + 'harvimmin asuttu itsenäinen valtio: koko maassa asuu noin '
      + 'kolme ja puoli miljoonaa ihmistä, ja lähes puolet heistä '
      + 'pääkaupungissa.'
      + '\n\n'
      + 'Ger on huopa- ja puurakenteinen pyöreä teltta, joka voidaan '
      + 'purkaa ja pystyttää uudelleen tunnissa. Kaupungin laitamilla '
      + 'on kokonaisia gerkaupunginosia, joissa telttojen ympärille on '
      + 'rakennettu aidat. Aro alkaa heti kaupungin jälkeen.',
  },
  Lhasa: {
    intro: 'Lhasa on Tiibetin pääkaupunki 3 650 metrin korkeudessa. '
      + 'Potalan palatsi nousee kalliolle kolmetoista kerrosta, ja '
      + 'siinä on yli tuhat huonetta.',
    teksti: 'Lhasa on Tiibetin ylängöllä Kyi-joen laaksossa. Ilma on '
      + 'korkeudesta johtuen ohutta: happea on noin kaksi kolmasosaa '
      + 'siitä mitä merenpinnan tasolla, ja portaiden nousu '
      + 'hengästyttää tulijan. Aurinko paistaa kirkkaasti yli 3 000 '
      + 'tuntia vuodessa, ja kaupunkia kutsutaan jumalten paikaksi.'
      + '\n\n'
      + 'Kaupunki on ollut Tiibetin uskonnollinen ja hallinnollinen '
      + 'keskus 600-luvulta. Jokhangin temppeli on tiibetinbuddhalaisuuden '
      + 'pyhin paikka, ja sen ympäri kiertää Barkhorin katu, jota '
      + 'pyhiinvaeltajat kulkevat myötäpäivään. Osa etenee '
      + 'heittäytymällä koko pituudeltaan maahan joka askeleella. '
      + 'Potalan palatsi rakennettiin 1600-luvulla, ja se oli '
      + 'dalai-lamojen talvipalatsi vuoteen 1959.'
      + '\n\n'
      + 'Potala ja Jokhang kuuluvat Unescon maailmanperintöön. '
      + 'Kaupunkiin pääsee nykyään Qinghai–Tiibet-rautatietä pitkin, '
      + 'joka on maailman korkeimmalla kulkeva rata: korkein kohta on '
      + 'yli 5 000 metrissä.',
  },
  Peking: {
    intro: 'Peking on Kiinan pääkaupunki ja lähes 22 miljoonan asukkaan '
      + 'kaupunki Pohjois-Kiinan tasangon pohjoisreunalla vuorten '
      + 'suojassa. Se on kantanut monta nimeä — Ji, Yanjing, Zhongdu ja '
      + 'Dadu — kunnes Ming-dynastian Yongle-keisari antoi sille 1403 '
      + 'nimen Beijing, pohjoinen pääkaupunki. Läntinen kirjoitusasu '
      + 'Peking on peräisin jesuiitta Martino Martinin kartastosta '
      + 'vuodelta 1655.'
      + '\n\n'
      + 'Yongle-keisari rakennutti myös **Kielletyn kaupungin**, joka '
      + 'valmistui 1420 ja oli keisarien koti vuoteen 1924. Muurin ja '
      + 'vallihaudan sisällä on 8 886 huonetta, ja se on maailman suurin '
      + 'säilynyt puurakenteinen palatsikokonaisuus; nykyään se on '
      + 'Palatsimuseo. Samaan aikaan valmistui Taivaan temppeli, jossa '
      + 'keisari uhrasi vuosittain hyvän sadon puolesta.'
      + '\n\n'
      + 'Palatsin ympärille jää vanhaa kaupunkia: **hutong-kujia**, '
      + 'joiden varrella on siheyuan-pihataloja. Ming-kauden '
      + 'kaupunginmuuri purettiin 1965, ja metron ensimmäinen linja '
      + 'rakennettiin sen perustusten päälle. Kaupungin pohjoispuolella '
      + 'vuorten harjoilla kulkee Kiinan muuri, jonka lähin osuus '
      + 'Badaling rakennettiin 1504.',
    teksti: 'Peking on Pohjois-Kiinan tasangolla, vuorten suojassa '
      + 'lännessä ja pohjoisessa. Nimi tarkoittaa pohjoista '
      + 'pääkaupunkia. Kaupunkiseudulla asuu yli kaksikymmentä '
      + 'miljoonaa ihmistä.'
      + '\n\n'
      + 'Kielletty kaupunki rakennettiin 1400-luvun alussa Ming-dynastian '
      + 'aikana, ja se oli keisarien palatsi vuoteen 1912. Muurit ovat '
      + 'punaiset ja katot keltaiset — keltainen oli väri, jota vain '
      + 'keisari sai käyttää. Palatsin eteläpuolella on Tiananmenin '
      + 'aukio ja pohjoispuolella keinotekoinen kukkula, joka tehtiin '
      + 'vallihaudan kaivumaista. Kaupungin pohjoispuolella kulkee '
      + 'Kiinan muuri, jonka nykyiset osat ovat pääosin Ming-ajalta.'
      + '\n\n'
      + 'Kielletty kaupunki on nykyään Palatsimuseo ja Unescon '
      + 'maailmanperintökohde. Vanhoja hutong-kujia on säilynyt '
      + 'keskustassa: kapeita katuja, joiden varrella on matalia '
      + 'pihataloja.',
  },
  'Xi’an': {
    intro: 'Xi’an oli Kiinan pääkaupunki useiden dynastioiden aikaan ja '
      + 'silkkitien itäinen päätepiste. Sen lähellä maassa seisoo '
      + 'kahdeksantuhatta savisotilasta rivissä, jokainen eri naamalla.',
    teksti: 'Xi’an on Keski-Kiinassa Wei-joen laaksossa. Vanhalta '
      + 'nimeltään Chang’an, ikuinen rauha, se oli Han- ja '
      + 'Tang-dynastioiden pääkaupunki ja aikanaan maailman suurin '
      + 'kaupunki. Keskustaa ympäröi yhä Ming-ajan kaupunginmuuri, '
      + 'joka on lähes 14 kilometriä pitkä ja niin leveä, että sen '
      + 'päällä voi pyöräillä.'
      + '\n\n'
      + 'Silkkitie alkoi täältä. Karavaanit veivät silkkiä länteen ja '
      + 'toivat takaisin hevosia, lasia ja uskontoja: buddhalaisuus, '
      + 'islam ja nestoriaaninen kristinusko tulivat Kiinaan tätä '
      + 'reittiä. Vuonna 1974 kaivoa kaivaneet talonpojat löysivät '
      + 'ensimmäisen keisarin Qin Shi Huangin hautaa vartioivan '
      + 'terrakotta-armeijan. Sotilaita on arviolta kahdeksantuhatta, '
      + 'ja kasvot on muotoiltu jokaiselle erikseen.'
      + '\n\n'
      + 'Terrakotta-armeija kuuluu Unescon maailmanperintöön. Itse '
      + 'keisarin hautakumpua ei ole avattu. Kaupungin muslimikorttelin '
      + 'basaari ja Suuri moskeija ovat silkkitien perintöä.',
  },
  Shanghai: {
    intro: 'Shanghai on Kiinan suurin kaupunki ja maailman vilkkain '
      + 'konttisatama. Se on Jangtsen suistossa Itä-Kiinanmeren rannalla, '
      + 'ja kaupunkiseudulla asuu noin 29 miljoonaa ihmistä. Nimi '
      + 'tarkoittaa merenrantaa. Huangpu-joki jakaa kaupungin kahtia: '
      + 'länsipuoli Puxi on vanha keskusta, itäpuoli Pudong uusi.'
      + '\n\n'
      + 'Vanhinta Shanghaita on kiinalainen vanhakaupunki, jota kiersi '
      + 'vuonna 1553 merirosvoja vastaan rakennettu muuri; se purettiin '
      + '1912 ja tilalle tuli kehäkatu. Muurin sisällä on '
      + '**Yu-puutarha**, jonka rakentaminen alkoi 1559. Kaupunki '
      + 'avattiin ulkomaankaupalle 1843, ja rantakadulle eli Bundille '
      + 'nousi kauppahuoneiden ja pankkien rivi. Kortteleihin syntyi '
      + '1860-luvulta alkaen shikumen: kivikehyksinen ovi ja sen takana '
      + 'kujien varsille rakennetut rivitalot.'
      + '\n\n'
      + 'Pudongin puoli jokea oli vielä 1990 peltoa ja varastoja. Sen '
      + 'kehittäminen aloitettiin samana vuonna, ja nyt siellä seisoo '
      + '**Shanghain torni**, 632 metriä korkea ja Kiinan korkein '
      + 'rakennus.',
    teksti: 'Shanghai on Jangtsen suistossa Itä-Kiinanmeren rannalla. '
      + 'Nimi tarkoittaa merenrantaa. Kaupungin halki virtaa '
      + 'Huangpu-joki, ja sen molemmat rannat näyttävät kahdelta eri '
      + 'aikakaudelta.'
      + '\n\n'
      + 'Oopiumisotien jälkeen 1842 Shanghai avattiin ulkomaankaupalle, '
      + 'ja siihen syntyi kansainvälisiä siirtokuntia, joissa oli omat '
      + 'lakinsa ja poliisinsa. Bundin rantakatu rakennettiin niiden '
      + 'aikana: pankkeja, hotelleja ja kauppahuoneita eri maiden '
      + 'tyyleihin. Pudongin puoli joesta oli vielä 1990 peltoa ja '
      + 'telakoita; sen kehittäminen aloitettiin samana vuonna, ja '
      + 'nyt siellä on Kiinan korkeimpia rakennuksia.'
      + '\n\n'
      + 'Kaupunkiseudulla asuu noin 29 miljoonaa ihmistä. Vanhoja '
      + 'shikumen-taloja, joissa on kivinen porttikehys ja sisäpiha, '
      + 'on säilynyt korttelikaupungeissa keskustan tuntumassa.',
  },
  Hongkong: {
    intro: 'Hongkong on kaupunki kallioilla Etelä-Kiinanmeren rannalla. '
      + 'Siellä on enemmän pilvenpiirtäjiä kuin missään muualla '
      + 'maailmassa, koska rakentamiseen kelpaavaa maata on vähän.',
    teksti: 'Hongkong koostuu Hongkongin saaresta, Kowloonin '
      + 'niemimaasta ja yli kahdestasadasta pienemmästä saaresta. '
      + 'Maasta yli kolme neljäsosaa on liian jyrkkää tai suojeltua '
      + 'rakentamiseen, joten kaupunki on kasvanut ylöspäin. Satama '
      + 'on syvä ja luonnostaan suojainen.'
      + '\n\n'
      + 'Britannia sai Hongkongin saaren ensimmäisen oopiumisodan '
      + 'jälkeen 1842 ja myöhemmin Uudet alueet 99 vuoden vuokralle. '
      + 'Alue palautui Kiinalle 1997 järjestelyllä, jota kutsutaan '
      + 'yhdeksi maaksi ja kahdeksi järjestelmäksi. Victoria Peakille '
      + 'nousee vuoristorata, joka avattiin 1888 — rinne on niin '
      + 'jyrkkä, että matkustajille talot näyttävät kallistuvan.'
      + '\n\n'
      + 'Hongkong on yksi maailman suurimmista rahoituskeskuksista. '
      + 'Sen tiheimmin asutuissa kortteleissa asukastiheys on '
      + 'maailman suurimpia, ja pienten saarten kalastajakylistä osa '
      + 'on yhä ennallaan.',
  },
  Taipei: {
    intro: 'Taipei on Taiwanin pääkaupunki saaren pohjoispäässä. Sen '
      + 'yömarkkinat alkavat auringonlaskusta, ja kaupungin yllä '
      + 'kohoaa torni, joka oli valmistuessaan maailman korkein.',
    teksti: 'Taipei on altaassa vuorten ympäröimänä Tamsui-joen '
      + 'laaksossa. Ilmasto on kostea ja lämmin, ja kesällä saarelle '
      + 'iskee taifuuneja. Taiwanin selkäranka on vuoristo, jonka '
      + 'korkein huippu Yushan nousee lähes 4 000 metriin.'
      + '\n\n'
      + 'Saari oli Japanin hallussa 1895–1945, ja siltä ajalta on '
      + 'säilynyt rakennuksia ja rautateitä. Kiinan sisällissodan '
      + 'jälkeen 1949 Kiinan tasavallan hallitus siirtyi saarelle, ja '
      + 'Taipeista tuli sen pääkaupunki. Taipei 101 valmistui 2004 ja '
      + 'oli maailman korkein rakennus vuoteen 2010. Sen huipulla on '
      + '660 tonnin painoinen teräspallo, joka heiluu vastakkaiseen '
      + 'suuntaan kuin torni ja vaimentaa tuulen ja maanjäristyksen '
      + 'liikkeen.'
      + '\n\n'
      + 'Yömarkkinat ovat kaupungin oma instituutio: Shilinin ja '
      + 'Raohen kaduilla myydään satoja ruokia kojuista. Kansallinen '
      + 'palatsimuseo säilyttää suuren osan Kiinan keisarillisesta '
      + 'taidekokoelmasta.',
  },
  'Soul (kaupunki)': {
    intro: 'Soul on Etelä-Korean pääkaupunki Han-joen varrella vuorten '
      + 'ympäröimässä laaksossa. Kaupungissa asuu yli yhdeksän miljoonaa '
      + 'ihmistä ja kaupunkiseudulla noin puolet koko maan väestöstä. '
      + 'Joki jakaa kaupungin kahtia: pohjoispuoli Gangbuk on vanha Soul, '
      + 'eteläpuoli Gangnam on rakennettu pääosin 1970-luvun jälkeen.'
      + '\n\n'
      + 'Joseon-dynastia siirsi pääkaupunkinsa tänne vuonna 1394 ja '
      + 'rakensi ensimmäisenä kolme asiaa: palatsin, esi-isien pyhäkön ja '
      + 'kellotornin. Kaupunkia kiersi 18,2 kilometrin muuri, ja sen '
      + 'kahdeksasta portista eteläinen **Sungnyemun** valmistui 1398 ja '
      + 'seisoo yhä liikenteen keskellä. Suuria palatseja rakennettiin '
      + 'viisi, ja niistä ensimmäinen ja tärkein on Gyeongbokgung, jonka '
      + 'pääportin Gwanghwamunin edessä on kaupungin keskusaukio.'
      + '\n\n'
      + 'Vanha keskusta on yhä kävelymatkan mittainen: palatsien '
      + 'ympärillä ovat Bukchonin puutalokortteli, antiikkikatu Insadong '
      + 'ja vuonna 1905 perustettu Gwangjangin tori. Niiden eteläpuolella '
      + 'virtaa **Cheonggyecheon**, puro joka peitettiin betonin ja '
      + 'moottoritien alle ja kaivettiin esiin vuonna 2005.',
    teksti: 'Soul on Korean niemimaan luoteisosassa, vuorten '
      + 'ympäröimässä laaksossa. Han-joki halkaisee kaupungin, ja sen '
      + 'molemmin puolin nousee kerrostaloja. Kaupunkiseudulla asuu '
      + 'noin puolet koko maan väestöstä.'
      + '\n\n'
      + 'Soul on ollut Korean pääkaupunki 1300-luvun lopulta, ja '
      + 'siihen rakennettiin viisi kuninkaallista palatsia. Niistä '
      + 'suurin, Gyeongbokgung, poltettiin japanilaishyökkäyksessä '
      + '1590-luvulla ja rakennettiin uudelleen 1860-luvulla. Korean '
      + 'sota 1950–1953 tuhosi kaupungin lähes kokonaan, ja se '
      + 'rakennettiin uudelleen nopeasti. Korean oma kirjaimisto '
      + 'hangul luotiin 1440-luvulla kuningas Sejongin johdolla, ja '
      + 'sen merkit kuvaavat suun ja kielen asentoa äännettäessä.'
      + '\n\n'
      + 'Cheonggyecheon-puro kulki vuosikymmeniä moottoritien alla, '
      + 'kunnes tie purettiin 2005 ja puro avattiin uudelleen '
      + 'kävelyreitiksi keskellä keskustaa.',
  },
  Tokio: {
    intro: 'Tokio on Japanin pääkaupunki Honshun itärannikolla '
      + 'Tokionlahden pohjukassa, ja sen kaupunkiseudulla asuu noin 37 '
      + 'miljoonaa ihmistä, enemmän kuin millään muulla kaupunkiseudulla. '
      + 'Seutu on maanjäristysherkkää, ja rakennusmääräykset ovat '
      + 'maailman tiukimpia. Kaupunki jakautuu kymmeniin kaupunginosiin, '
      + 'jotka **Yamanote-rengasrata** sitoo yhteen kolmenkymmenen aseman '
      + 'lenkillään.'
      + '\n\n'
      + 'Kaupunki kantoi nimeä Edo ja oli vuodesta 1603 shogunien '
      + 'hallintokeskus. Keisari muutti sinne 1868, ja nimeksi tuli '
      + 'Tokio, itäinen pääkaupunki. Vuoden 1923 maanjäristys ja toisen '
      + 'maailmansodan pommitukset tuhosivat kaupungin kahdesti, ja '
      + 'kummallakin kerralla se rakennettiin uudelleen. '
      + 'Shinkansen-luotijuna aloitti liikennöinnin Tokion ja Osakan '
      + 'välillä 1964.'
      + '\n\n'
      + 'Vanhinta Tokiota on rengasradan pohjois- ja itäpuolelle jäävä '
      + 'shitamachi eli alakaupunki: Uenon puisto, maan vanhin eläintarha '
      + 'vuodelta 1882 ja Kappabashi-dōri, jonka liikkeet myyvät '
      + 'ravintoloille näyteikkunoiden muoviruokaa. Asakusassa seisoo '
      + 'kaupungin vanhin temppeli **Sensō-ji**, jonka kävijämäärä on '
      + 'suurempi kuin minkään muun pyhäkön maailmassa.',
    teksti: 'Tokio on Honshun saaren itärannikolla Tokionlahden '
      + 'pohjukassa. Kaupunkiseudulla asuu noin 37 miljoonaa ihmistä. '
      + 'Alue on maanjäristysherkkä, ja rakennusmääräykset ovat '
      + 'maailman tiukimpia.'
      + '\n\n'
      + 'Kaupunki tunnettiin nimellä Edo, ja se oli shogunien '
      + 'hallintokeskus vuodesta 1603. Keisari muutti sinne 1868, ja '
      + 'nimi vaihtui Tokioksi, itäiseksi pääkaupungiksi. Vuoden 1923 '
      + 'Kanton maanjäristys ja toisen maailmansodan pommitukset '
      + 'tuhosivat kaupungin kahdesti, ja kummallakin kerralla se '
      + 'rakennettiin uudelleen. Shinkansen-luotijuna aloitti '
      + 'liikennöinnin Tokion ja Osakan välillä vuonna 1964.'
      + '\n\n'
      + 'Kaupunki jakautuu kymmeniin kaupunginosiin, joilla kullakin '
      + 'on oma luonteensa. Meiji-pyhäkön ympärille istutettiin '
      + '1920-luvulla metsä, jonka puut tuotiin lahjoituksina koko '
      + 'maasta — se on nyt yli satatuhatta puuta keskellä kaupunkia.',
  },
  Manila: {
    intro: 'Manila on Filippiinien pääkaupunki. Sen vanhaakaupunkia '
      + 'ympäröivät espanjalaisten 1500-luvulla rakentamat muurit, ja '
      + 'kaduilla ajaa jeepney — kirkasväriseksi maalattu pikkubussi, '
      + 'jollaista ei ole muualla.',
    teksti: 'Manila on Luzonin saarella Manilanlahden rannalla. '
      + 'Kaupunkiseutu on yksi maailman tiheimmin asutuista. Ilmasto '
      + 'on trooppinen, ja kesällä alueen yli kulkee taifuuneja.'
      + '\n\n'
      + 'Espanja hallitsi Filippiinejä yli kolmesataa vuotta, ja '
      + 'Manilasta lähti vuosittain hopealaiva Acapulcoon Meksikoon. '
      + 'Reitti toimi 1565–1815 ja oli maailman ensimmäinen '
      + 'säännöllinen valtamerten yli kulkeva kauppayhteys: '
      + 'Kiinasta tuotu silkki ja posliini vaihtoivat omistajaa '
      + 'amerikkalaiseen hopeaan. Muurikaupunki Intramuros tuhoutui '
      + 'lähes täysin toisen maailmansodan taisteluissa 1945; San '
      + 'Agustínin kirkko selvisi ja on maan vanhin kivikirkko.'
      + '\n\n'
      + 'Jeepneyt tehtiin alun perin sodan jälkeen jääneistä '
      + 'amerikkalaisista jeepeistä pidentämällä niitä. Ne ovat yhä '
      + 'kaupungin tavallisin joukkoliikenneväline, ja jokainen on '
      + 'maalattu omalla tavallaan.',
  },
  Hanoi: {
    intro: 'Hanoi on Vietnamin pääkaupunki ja yli tuhat vuotta vanha. '
      + 'Sen vanhassakaupungissa on 36 katua, ja jokainen niistä oli '
      + 'aikanaan yhden ammattikunnan katu.',
    teksti: 'Hanoi on Punaisenjoen suistossa Pohjois-Vietnamissa. Nimi '
      + 'tarkoittaa jokien väliä. Kaupunki perustettiin vuonna 1010, '
      + 'kun kuningas Lý Thái Tổ siirsi pääkaupungin tänne ja antoi '
      + 'sille nimen Thăng Long, nouseva lohikäärme.'
      + '\n\n'
      + 'Vanhankaupungin katujen nimet alkavat sanalla Hàng, tavara: '
      + 'Hàng Bạc on hopeakatu, Hàng Gai silkkikatu, Hàng Tre '
      + 'bambukatu. Käsityöläiset asuivat kylittäin ja muuttivat '
      + 'kaupunkiin ammattikuntina, ja nimet ovat säilyneet, vaikka '
      + 'osa kaupasta on vaihtunut. Ranska hallitsi aluetta '
      + '1880-luvulta 1954 asti, ja siltä ajalta ovat leveät '
      + 'bulevardit ja oopperatalo.'
      + '\n\n'
      + 'Kaupungissa on miljoonia moottoripyöriä, ja liikenne kulkee '
      + 'jatkuvana virtana. Kadun yli mennään kävelemällä tasaisesti '
      + 'eteenpäin — liikenne kiertää, jos kulkija ei pysähdy.',
  },
  Bangkok: {
    intro: 'Bangkok on Thaimaan pääkaupunki ja maan selvästi suurin '
      + 'kaupunki: asukkaita on runsaat yhdeksän miljoonaa. Se on Chao '
      + 'Phraya -joen suistotasangolla, jonka keskikorkeus on vain '
      + 'puolitoista metriä merenpinnasta, ja joki laskee Siaminlahteen '
      + 'noin 25 kilometriä keskustan eteläpuolella. Thaimaalaiset '
      + 'kutsuvat kaupunkia nimellä Krung Thep Maha Nakhon; juhlallinen '
      + 'täysi nimi on 168 kirjainta pitkä ja maailman pisin paikannimi.'
      + '\n\n'
      + 'Kun vanha pääkaupunki Ayutthaya tuhoutui 1767, kuningas Taksin '
      + 'perusti uuden pääkaupungin Thonburiin joen länsirannalle. Vuonna '
      + '1782 Rama I siirsi sen itärannalle ja kaivatti kanavat, jotka '
      + 'tekivät **Rattanakosinista** keinotekoisen saaren; samana '
      + 'keväänä pystytettiin kaupunginpylväs ja aloitettiin Suurpalatsin '
      + 'rakentaminen.'
      + '\n\n'
      + 'Kaupunki eli pitkään veden varassa: kanavat eli khlongit olivat '
      + 'sen katuja, ja 1800-luvun matkustajat kutsuivat sitä idän '
      + 'Venetsiaksi. Ensimmäinen länsimaiseen tapaan rakennettu katu '
      + 'valmistui vasta 1864, ja moni kanava on sittemmin täytetty '
      + 'kaduksi. Thaimaa on **ainoa Kaakkois-Aasian maa**, jota ei '
      + 'koskaan alistettu siirtomaaksi.',
    teksti: 'Bangkok on joen suistossa lähellä Thaimaanlahtea. Maa on '
      + 'matalaa ja pehmeää, ja kaupunki vajoaa hitaasti. Joki on '
      + 'edelleen liikenneväylä: pitkähäntäveneet, lautat ja proomut '
      + 'kulkevat sitä ylös ja alas koko päivän.'
      + '\n\n'
      + 'Kaupungista tuli pääkaupunki 1782, kun kuningas Rama I siirsi '
      + 'hovin joen itärannalle. Kuninkaanpalatsi ja Smaragdi-Buddhan '
      + 'temppeli rakennettiin silloin. Bangkokia kutsuttiin idän '
      + 'Venetsiaksi, koska kanavia oli enemmän kuin katuja; suuri osa '
      + 'niistä täytettiin 1900-luvulla teiden alle. Thaimaa on ainoa '
      + 'Kaakkois-Aasian maa, joka ei ole ollut siirtomaana.'
      + '\n\n'
      + 'Kaupungin virallinen thainkielinen nimi alkaa sanoilla Krung '
      + 'Thep Mahanakhon, ja thaimaalaiset käyttävät siitä lyhennettä '
      + 'Krung Thep, enkelten kaupunki. Kanavia on säilynyt joen '
      + 'länsipuolella Thonburin puolella.',
  },
  Yangon: {
    intro: 'Yangon on Myanmarin suurin kaupunki. Sen Shwedagon-pagodi '
      + 'kohoaa lähes sata metriä ja on päällystetty oikealla kullalla '
      + '— lahjoitettuna levy kerrallaan satojen vuosien ajan.',
    teksti: 'Yangon on Yangon-joen varrella lähellä Andamaanienmerta. '
      + 'Kaupunki tunnettiin ennen nimellä Rangoon. Se oli Myanmarin '
      + 'pääkaupunki vuoteen 2006, jolloin hallinto siirrettiin '
      + 'Naypyidawiin sisämaahan.'
      + '\n\n'
      + 'Shwedagon on buddhalaisuuden pyhimpiä paikkoja ja '
      + 'perimätiedon mukaan yli kaksituhatta vuotta vanha. Sen '
      + 'kullassa ei ole kyse maalista: uskovaiset ovat lahjoittaneet '
      + 'kultalevyjä, jotka kiinnitetään pagodin pintaan, ja huipulla '
      + 'on tuhansia jalokiviä. Britannia valtasi Burman kolmessa '
      + 'sodassa 1800-luvulla, ja Rangoonista tuli siirtomaahallinnon '
      + 'keskus leveine katuineen ja tiilirakennuksineen.'
      + '\n\n'
      + 'Pagodin pihalle astutaan paljain jaloin, ja kiveys on '
      + 'auringossa lämmin. Kaupungissa on säilynyt poikkeuksellisen '
      + 'paljon siirtomaa-ajan rakennuksia, koska rakennuskanta ei '
      + 'uusiutunut vuosikymmeniin.',
  },
  Singapore: {
    intro: 'Singapore on saarivaltio, joka mahtuisi Suomeen yli '
      + 'kolmesataa kertaa. Silti sen satama on yksi maailman '
      + 'vilkkaimmista, ja maalla on neljä virallista kieltä.',
    teksti: 'Singapore on Malakan niemimaan eteläkärjessä, aivan '
      + 'päiväntasaajan tuntumassa. Pinta-alaa on noin 730 '
      + 'neliökilometriä, ja se kasvaa yhä: merta täytetään maalla. '
      + 'Ilma on lämmintä ja kosteaa ympäri vuoden, ja sadetta tulee '
      + 'joka kuukausi.'
      + '\n\n'
      + 'Britannian Stamford Raffles perusti kauppa-aseman saarelle '
      + '1819. Sijainti Malakan salmen suulla teki siitä nopeasti '
      + 'tärkeän: lähes kaikki Intian valtameren ja Etelä-Kiinanmeren '
      + 'välinen liikenne kulkee salmen kautta. Singapore itsenäistyi '
      + 'Malesiasta 1965. Virallisia kieliä ovat malaiji, mandariini, '
      + 'tamili ja englanti.'
      + '\n\n'
      + 'Saman korttelin varrelta voi löytää kiinalaisen temppelin, '
      + 'moskeijan ja hindutemppelin. Vettä on jouduttu tuomaan '
      + 'Malesiasta, ja siksi maa on rakentanut sadeveden keräyksen ja '
      + 'veden kierrätyksen, joka kattaa nyt suuren osan kulutuksesta.',
  },
  Sumatra: {
    intro: 'Sumatra on maailman kuudenneksi suurin saari. Sen '
      + 'Tobajärvi syntyi purkauksessa 74 000 vuotta sitten — se oli '
      + 'suurin tunnettu tulivuorenpurkaus kahteen miljoonaan vuoteen.',
    teksti: 'Sumatra on Indonesian länsisin suuri saari, ja '
      + 'päiväntasaaja kulkee sen poikki. Saaren länsireunaa seuraa '
      + 'Barisan-vuoristo, jossa on kymmeniä tulivuoria: Sumatra on '
      + 'siinä kohdassa, jossa Intian valtameren laatta painuu Aasian '
      + 'laatan alle.'
      + '\n\n'
      + 'Toban purkaus levitti tuhkaa Intian valtameren yli ja '
      + 'viilensi maapallon ilmastoa vuosiksi. Kraatteri täyttyi '
      + 'vedellä, ja siitä syntyi noin sata kilometriä pitkä järvi. '
      + 'Sen keskellä oleva Samosirin saari on suunnilleen Singaporen '
      + 'kokoinen. Saarella asuu useita kansoja, joista batakit '
      + 'asuvat Toban ympärillä ja acehilaiset pohjoisessa.'
      + '\n\n'
      + 'Vuoden 2004 tsunami sai alkunsa Sumatran edustan '
      + 'maanjäristyksestä ja tuhosi Acehin rannikon. Saaren '
      + 'sademetsissä elää sumatranorankeja, -tiikereitä ja '
      + '-sarvikuonoja, jotka kaikki ovat uhanalaisia.',
  },
  Borneo: {
    intro: 'Borneo on maailman kolmanneksi suurin saari, ja sen '
      + 'sademetsä on noin 140 miljoonaa vuotta vanha — huomattavasti '
      + 'vanhempi kuin Amazon. Saari on jaettu kolmen valtion kesken.',
    teksti: 'Borneo on Kaakkois-Aasiassa päiväntasaajan kohdalla. '
      + 'Saaren eteläosa kuuluu Indonesialle, pohjoisosa Malesialle, '
      + 'ja pohjoisrannikolla on pieni Brunein sulttaanikunta. '
      + 'Korkein huippu Kinabalu nousee yli 4 000 metriin.'
      + '\n\n'
      + 'Sademetsä on yksi maailman lajirikkaimmista. Puut kasvavat '
      + 'jopa seitsemänkymmenen metrin korkeuteen, ja latvusto on niin '
      + 'tiheä, että metsänpohjalle pääsee vain murto-osa valosta. '
      + 'Oranki elää luonnonvaraisena vain Borneolla ja Sumatralla. '
      + 'Saaren sisäosien jokivarsilla asuu dajakkeja, joiden '
      + 'perinteinen pitkätalo on kokonaisen kylän yhteinen asumus.'
      + '\n\n'
      + 'Metsää on hakattu ja raivattu palmuöljyviljelmiksi nopeasti, '
      + 'ja suuri osa alkuperäisestä sademetsästä on kadonnut. '
      + 'Indonesia rakentaa saarelle uutta pääkaupunkiaan Nusantaraa.',
  },
  Jakarta: {
    intro: 'Jakarta on Indonesian pääkaupunki ja Kaakkois-Aasian '
      + 'suurin kaupunki. Se on rakennettu suistoon ja vajoaa: osa '
      + 'kaupungista on jo merenpinnan alapuolella.',
    teksti: 'Jakarta on Jaavan saaren luoteisrannikolla, siinä missä '
      + 'kolmetoista jokea laskee mereen. Kaupunkiseudulla asuu yli '
      + 'kolmekymmentä miljoonaa ihmistä. Maaperä on pehmeää, ja '
      + 'pohjaveden pumppaaminen on painanut osaa kaupungista useita '
      + 'metrejä alaspäin.'
      + '\n\n'
      + 'Hollannin Itä-Intian kauppakomppania perusti paikalle '
      + 'Bataviaksi kutsutun kaupungin 1619. Hollantilaiset kaivoivat '
      + 'sinne kanavia kuten kotonaan, mutta trooppisessa ilmastossa '
      + 'seisova vesi levitti malariaa, ja kaupunkia kutsuttiin idän '
      + 'hautausmaaksi. Indonesia julistautui itsenäiseksi 1945, ja '
      + 'kaupungin nimeksi tuli Jakarta.'
      + '\n\n'
      + 'Vanhan kaupungin Kota Tuan hollantilaiset varastotalot '
      + 'seisovat yhä kanavan varrella. Vajoamisen ja tulvien takia '
      + 'hallitus on päättänyt siirtää pääkaupungin Borneolle '
      + 'rakennettavaan Nusantaraan.',
  },
  Kathmandu: {
    intro: 'Kathmandu on Nepalin pääkaupunki laaksossa Himalajan '
      + 'juurella. Maailman neljätoista yli kahdeksankilometristä '
      + 'huippua ovat kaikki samassa vuoristossa, ja osa niistä näkyy '
      + 'laaksosta selkeällä säällä.',
    teksti: 'Kathmandun laakso on noin 1 400 metrin korkeudessa, ja '
      + 'sitä ympäröivät vuoret joka suunnasta. Laakso oli aikoinaan '
      + 'järven pohja, ja siksi maaperä on hedelmällistä. Laaksossa '
      + 'on kolme vanhaa kuningaskaupunkia: Kathmandu, Patan ja '
      + 'Bhaktapur.'
      + '\n\n'
      + 'Kaupungit kilpailivat keskenään rakentamisella, ja siksi '
      + 'jokaisella on oma Durbar-aukionsa palatseineen ja '
      + 'temppeleineen. Puinen koristeveisto on nepalilaisen '
      + 'rakennustaiteen tunnusmerkki: ikkunanpuitteet ja '
      + 'kattotuolit on kaiverrettu niin tiheään, ettei sileää kohtaa '
      + 'löydy. Aukiot kuuluvat Unescon maailmanperintöön. Vuoden 2015 '
      + 'maanjäristys vaurioitti monia rakennuksia, ja niitä on '
      + 'korjattu perinteisin menetelmin.'
      + '\n\n'
      + 'Nepal ei ole koskaan ollut siirtomaana. Laakso on '
      + 'hindulaisuuden ja buddhalaisuuden kohtauspaikka, ja '
      + 'Boudhanathin stupa on yksi maailman suurimmista.',
  },
  Delhi: {
    intro: 'Delhi on Pohjois-Intiassa Yamuna-joen varrella, ja se on yksi '
      + 'maailman suurimmista kaupunkialueista. Kaupungin halki kulkee '
      + 'Delhi Ridge, Aravalli-vuoriston metsäinen jatke. Perimätieto '
      + 'laskee samalle rannalle seitsemän peräkkäistä kaupunkia, ja '
      + 'jokainen valtakunta rakensi omansa vanhojen viereen.'
      + '\n\n'
      + 'Etelässä seisoo **Qutb Minar**, punaisesta hiekkakivestä '
      + 'muurattu voittotorni, jonka rakentaminen alkoi 1199; 72,5 metriä '
      + 'korkeana se on yhä maailman korkein tiiliminareetti. Sen '
      + 'vieressä on nelisenmetrinen rautapylväs 400-luvulta, joka ei ole '
      + 'ruostunut. Mughal-keisari Shah Jahan siirsi pääkaupunkinsa '
      + 'Agrasta tänne ja rakennutti muurikaupungin Shahjahanabadin: '
      + '**Punainen linnoitus** valmistui 1648, Jama Masjid 1656 ja '
      + 'niiden väliin Chandni Chowkin kauppakatu.'
      + '\n\n'
      + 'Muurikaupunki on nykyään Vanha Delhi kujineen ja tukkutoreineen. '
      + 'Sen eteläpuolelle alettiin rakentaa New Delhiä vuoden 1911 '
      + 'jälkeen, ja Edwin Lutyensin ja Herbert Bakerin hallintokaupunki '
      + 'vihittiin 1931; se on nykyään Intian pääkaupunki.',
    teksti: 'Delhi on Pohjois-Intiassa Yamuna-joen varrella. Kaupunki '
      + 'on Intian pääkaupunkialue, ja siellä asuu yli '
      + 'kolmekymmentä miljoonaa ihmistä. Kesät ovat hyvin kuumia ja '
      + 'monsuuni tuo sateet heinä–syyskuussa.'
      + '\n\n'
      + 'Jokainen valtakunta rakensi Delhiin oman kaupunkinsa, ja '
      + 'vanhat jäivät uusien viereen. Qutb Minar on 73 metriä korkea '
      + 'tiiliminareetti 1200-luvulta, ja sen vieressä seisoo noin '
      + 'nelisenmetrinen rautapylväs 400-luvulta. Pylvään rauta on '
      + 'niin puhdasta ja siihen on muodostunut sellainen '
      + 'suojakerros, ettei se ruostu. Mogulien Shahjahanabad eli '
      + 'Vanha Delhi rakennettiin 1600-luvulla, ja britit rakensivat '
      + 'New Delhin 1910–1930-luvuilla.'
      + '\n\n'
      + 'Qutbin alue ja Humayunin mausoleumi kuuluvat Unescon '
      + 'maailmanperintöön. Vanhan Delhin Chandni Chowk on yhä yksi '
      + 'Intian vilkkaimmista kauppakaduista.',
  },
  Kalkutta: {
    intro: 'Kolkata oli Brittiläisen Intian pääkaupunki vuoteen 1911. '
      + 'Sen raitiotie aloitti liikennöinnin 1873 ja on Aasian vanhin '
      + 'yhä toiminnassa oleva.',
    teksti: 'Kolkata on Hooghly-joen varrella Bengalin suistossa. '
      + 'Kaupunki kasvoi Brittiläisen Itä-Intian kauppakomppanian '
      + 'kauppapaikasta 1690-luvulta alkaen, ja siitä tuli koko '
      + 'siirtomaan hallinnollinen keskus. Pääkaupunki siirrettiin '
      + 'Delhiin 1911.'
      + '\n\n'
      + 'Howrahin silta valmistui 1943 ja yhdistää kaupungin '
      + 'rautatieasemaan joen toisella puolella. Se on kokonaan '
      + 'niitattu — pultteja ei käytetty lainkaan — ja sen yli kulkee '
      + 'päivittäin yli sata tuhatta ajoneuvoa ja arviolta miljoona '
      + 'jalankulkijaa. Kaupunki on ollut bengalilaisen kirjallisuuden '
      + 'ja elokuvan keskus: Rabindranath Tagore sai kirjallisuuden '
      + 'Nobelin 1913, ensimmäisenä eurooppalaisten ulkopuolelta.'
      + '\n\n'
      + 'Raitiovaunut kulkevat yhä muutamalla linjalla. Kaupungin '
      + 'metro avattiin 1984 Intian ensimmäisenä.',
  },
  Mumbai: {
    intro: 'Mumbai on Intian suurin kaupunki ja sen rahoituskeskus. Se '
      + 'on rakennettu seitsemälle saarelle, jotka yhdistettiin '
      + 'yhdeksi maakielekkeeksi täyttämällä välit.',
    teksti: 'Mumbai on Intian länsirannikolla Arabianmeren äärellä. '
      + 'Portugalilaiset luovuttivat saaret Britannialle 1661 osana '
      + 'kuninkaallisia myötäjäisiä, ja britit alkoivat yhdistää '
      + 'niitä pengerryksillä. Työ kesti yli sata vuotta.'
      + '\n\n'
      + 'Chhatrapati Shivaji Maharajin rautatieasema valmistui 1888 ja '
      + 'näyttää katedraalilta; se kuuluu Unescon maailmanperintöön. '
      + 'Aseman kautta kulkee päivittäin miljoonia matkustajia. '
      + 'Kaupungin oma erikoisuus ovat dabbawalat, jotka noutavat '
      + 'lounasruokia kodeista ja toimittavat ne työpaikoille junilla '
      + 'ja polkupyörillä — merkintätapa on värikoodi, ja perille '
      + 'löytäminen onnistuu lähes aina.'
      + '\n\n'
      + 'Mumbai on myös Intian elokuvateollisuuden keskus. Sen '
      + 'väestöstä suuri osa asuu tiheästi rakennetuilla alueilla, ja '
      + 'Dharavi on yksi Aasian suurimmista slummeista — ja samalla '
      + 'vilkas käsityö- ja kierrätysalue.',
  },
  Chennai: {
    intro: 'Chennai on Etelä-Intian suurin kaupunki Koromandelin '
      + 'rannikolla. Sen Marina Beach on lähes kolmetoista kilometriä '
      + 'pitkä, mutta siellä ei uida: virta on liian kova.',
    teksti: 'Chennai on Bengalinlahden rannalla Tamil Nadun '
      + 'osavaltiossa. Kaupunki syntyi Fort St. Georgen ympärille, '
      + 'jonka Britannian Itä-Intian kauppakomppania rakensi 1644 — '
      + 'se oli yhtiön ensimmäinen linnoitus Intiassa. Kaupunki '
      + 'tunnettiin nimellä Madras vuoteen 1996.'
      + '\n\n'
      + 'Rannikolla ei ole luonnonsatamaa, ja pitkään lastit tuotiin '
      + 'maihin veneillä aallokon läpi. Keinotekoinen satama '
      + 'rakennettiin 1800-luvun lopulla. Tamil on yksi maailman '
      + 'vanhimmista yhä puhutuista kirjakielistä, ja alueen '
      + 'temppeleissä on korkeita gopuram-torneja, joiden jokainen '
      + 'porras on täynnä kivisiä ja maalattuja hahmoja.'
      + '\n\n'
      + 'Marina Beach täyttyy illalla kävelijöistä ja kojuista. '
      + 'Kaupunki on Intian autoteollisuuden keskus ja tamilinkielisen '
      + 'elokuvan koti.',
  },
  Colombo: {
    intro: 'Colombo on Sri Lankan suurin kaupunki ja sen satama on '
      + 'ollut käytössä noin kaksituhatta vuotta. Kanelia on viety '
      + 'täältä siitä asti, kun sitä alettiin kuljettaa Eurooppaan.',
    teksti: 'Colombo on saaren länsirannikolla. Satama on luonnostaan '
      + 'suojaisa, ja se on ollut arabikauppiaiden pysähdyspaikka jo '
      + 'ennen eurooppalaisten tuloa. Portugalilaiset saapuivat 1505, '
      + 'hollantilaiset 1600-luvulla ja britit 1796.'
      + '\n\n'
      + 'Kaneli on Sri Lankan vanha vientituote. Aito ceyloninkaneli '
      + 'kuoritaan puun nuorista oksista ohuina kerroksina, jotka '
      + 'kuivuessaan kääriytyvät paperinohuiksi putkiksi. Se oli '
      + 'keskiajalla erittäin arvokasta, ja hollantilaiset pitivät '
      + 'sen kaupan tiukasti hallussaan. Saari itsenäistyi 1948, ja '
      + 'nimi vaihtui Ceylonista Sri Lankaksi 1972.'
      + '\n\n'
      + 'Rannikkorata etelään kulkee paikoin aivan meren rajassa. '
      + 'Maan hallinnollinen pääkaupunki on nykyään Sri '
      + 'Jayawardenepura Kotte, Colombon esikaupunki, mutta Colombo on '
      + 'yhä maan talouden keskus.',
  },
  Karachi: {
    intro: 'Karachi oli sata vuotta sitten pieni kalastajakylä. Nyt '
      + 'siinä asuu yli kaksikymmentä miljoonaa ihmistä — enemmän kuin '
      + 'koko Skandinaviassa.',
    teksti: 'Karachi on Pakistanin etelärannikolla Arabianmeren '
      + 'äärellä, lähellä Indus-joen suistoa. Satama on maan tärkein '
      + 'ja käsittelee valtaosan sen ulkomaankaupasta. Ilmasto on '
      + 'kuiva, ja sadetta tulee vähän.'
      + '\n\n'
      + 'Britit kehittivät Karachista sataman 1840-luvulta alkaen, ja '
      + 'siitä tuli Indus-laakson vientisatama. Kun Pakistan '
      + 'itsenäistyi 1947, Karachi oli sen ensimmäinen pääkaupunki; '
      + 'hallinto siirtyi Islamabadiin 1960-luvulla. Kaupunkiin muutti '
      + 'jaon yhteydessä suuri määrä ihmisiä Intian puolelta, ja '
      + 'väkiluku moninkertaistui muutamassa vuosikymmenessä.'
      + '\n\n'
      + 'Kalatorille tuodaan aamuisin saalis suoraan puuveneistä, '
      + 'joiden keulat on maalattu kirkkain värein. Kaupunki on '
      + 'Pakistanin talouden keskus ja sen väestöltään monikielisin '
      + 'paikka.',
  },
  Kabul: {
    intro: 'Kabul on Afganistanin pääkaupunki vuorten ympäröimässä '
      + 'laaksossa 1 800 metrin korkeudessa. Sen kautta ovat kulkeneet '
      + 'kaikki, jotka ovat halunneet Intiaan.',
    teksti: 'Kabul on Kabul-joen varrella Hindukush-vuoriston eteläpuolella. '
      + 'Laaksoon johtavat solat ovat kapeita, ja niiden hallinta on '
      + 'ratkaissut, kuka pääsee läpi. Talvet ovat kylmiä ja lumisia, '
      + 'ja lumihuiput näkyvät kaupungin kaduilta.'
      + '\n\n'
      + 'Kaupunki on yli kolmetuhatta vuotta vanha. Sen kautta kulki '
      + 'silkkitien eteläinen haara, ja alueen läpi ovat marssineet '
      + 'muun muassa Aleksanteri Suuri, mongolit ja britit. '
      + 'Mogulivaltakunnan perustaja Babur teki Kabulista '
      + 'pääkaupunkinsa 1500-luvun alussa ja rakennutti sinne '
      + 'porrastetun puutarhan, jonne hänet myös haudattiin. Puutarha '
      + 'on kunnostettu ja avattu yleisölle.'
      + '\n\n'
      + 'Kaupunki on kärsinyt neljästä vuosikymmenestä sotaa. '
      + 'Kansallismuseon kokoelmista suuri osa ryöstettiin 1990-luvulla, '
      + 'mutta osa esineistä oli piilotettu ja löytyi myöhemmin '
      + 'tallelokerosta koskemattomana.',
  },
};
