// Matkakirjan saapumistekstit (kaikki Afrikan kaupungit) — lopullinen
// tyyli omistajan A/B-vertailun jälkeen (30.7.): nuoren Foggin osuus
// on tiivis (huudahdus + pari lausetta) ja siinä on selvää tunne-
// ilmaisua, joka ohjaa myös lukijan ääntä. Kaupunkien välillä on
// tarkoituksella vaihtelua: riemua, hiljaista kunnioitusta, pelonsekaista
// ihailua, naurua ja vakavuutta — kaikki eivät ala samalla tavalla.
//
//  - `kuvaus` on nuoren Foggin tuore fiilis paikasta. Ensimmäinen lause
//    näkyy lihavoituna ja lukija lukee koko merkinnän ääneen tunteella.
//  - `nosto` päättää merkinnän isoisän kirjan lainaukseen niin, että
//    lähde käy ilmi tekstistä itsestään — erillistä otsikkoa ei ole.
//
// Teksti ei vaihdu kaupungissa olon aikana. Luennat on generoitu
// ElevenLabsilla (Viisas Kertoja, eleven_v3, tunnetagit) tiedostoihin
// assets/audio/puhe-africa-saapuminen-<kaupunki>.mp3.
export const AFRICA_SAAPUMISET = {
  tanger: {
    kuvaus: 'Voi että — Tanger! Laiva kääntyi lahteen ja minä unohdin '
      + 'hengittää: valkoiset talot kiipeävät rinnettä kuin katsomo, ja '
      + 'satamasta nousee sellainen elämän pauhu, että nauroin ääneen '
      + 'ihan itsekseni. Kahden meren ja kahden mantereen portti avautui '
      + 'juuri minulle!',
    nosto: 'Isoisän kirjassa on tästä satamasta vain yksi lause: "Täältä '
      + 'Afrikka alkaa, ja täällä sitä on turha yrittää ymmärtää '
      + 'kiireellä." Nyt vasta tajuan, mitä ukko tarkoitti.',
  },
  /*
   * Kairo uusittiin dekkariksi 7.8.2026 (docs/isoisan-raamattu.md,
   * lyhyet mitat) — lehtikaupungeista viimeinen. E. G:n käyntikortti
   * esitellään vain täällä; luenta generoidaan samalla työkalulla
   * kuin Euroopan merkinnät (tools/generoi-luennat.mjs).
   */
  kairo: {
    kuvaus: 'Pyramidien juurella opas ojensi minulle käyntikortin: '
      + '"Eräs herra jätti tämän. Sanoi, että te tulette kyllä." '
      + 'Kortissa oli vain kaksi kirjainta: E. G.',
    nosto: 'Isoisä kirjoitti: "Basaarissa minua seurattiin kolmen '
      + 'kujan verran. Join teeni loppuun silti." Minä join omani '
      + 'nopeammin.',
    luenta: '[curious] Pyramidien juurella opas ojensi minulle '
      + 'käyntikortin: "Eräs herra jätti tämän. Sanoi, että te '
      + 'tulette kyllä." [whispers] Kortissa oli vain kaksi '
      + 'kirjainta: E. G. [softly] Isoisä kirjoitti: "Basaarissa '
      + 'minua seurattiin kolmen kujan verran. Join teeni loppuun '
      + 'silti." [warmly] Minä join omani nopeammin.',
  },
  karthago: {
    kuvaus: 'Kävelin raunioille auringonlaskussa, ja meri välkkyi joka '
      + 'suunnassa — Karthago! Astuin kivien yli, jotka olivat nähneet '
      + 'Hannibalin norsut, ja jossain alla lepäävät vanhat satama-altaat. '
      + 'Istuin pylvään juurelle enkä sanonut pitkään aikaan mitään.',
    nosto: 'Isoisä kirjoitti: "Kaksi suurvaltaa rakensi tänne '
      + 'päällekkäin, ja meri muistaa molemmat." Laskin sormeni kiveen ja '
      + 'yritin tuntea, kumman aikaa se oli.',
  },
  tshadjarvi: {
    kuvaus: 'Vesi! Päivien savannitaipaleen jälkeen edessä kimmelsi '
      + 'järvi, niin matala ja laaja, ettei rantaa ja vettä erottanut '
      + 'toisistaan. Kalastaja työnsi kaislaveneensä vesille ja vilkutti — '
      + 'vilkutin takaisin kuin vanhalle tutulle.',
    nosto: 'Isoisän kirjassa lukee: "Neljän maan kalastajat jakavat '
      + 'tämän veden, eikä kukaan heistä kanna karttaa." Katselin veneitä '
      + 'ja ymmärsin: järvellä rajat ovat vain rannalla.',
  },
  viktorianputoukset: {
    kuvaus: 'Kuulin sen ennen kuin näin mitään — jylinä kulki maan läpi '
      + 'suoraan rintaan, ja sitten sumu nousi puiden yli kuin savu! '
      + 'Seisoin rotkon reunalla läpimärkänä ja nauroin, koska mitään '
      + 'muuta ei voinut tehdä. Mosi-oa-Tunya, jylisevä savu — nimi on '
      + 'täsmälleen oikea.',
    nosto: 'Isoisä kirjoitti tästä paikasta vain kolme sanaa: "Ei sanoja. '
      + 'Tulkaa." Nyt tiedän, miksi hän ei edes yrittänyt.',
  },
  nairobi: {
    kuvaus: 'Ylängön ilma oli niin kirkasta, että henkeä veti syvempään '
      + 'ihan huomaamattaan — ja sitten näin kirahvit kaupungin rajalla! '
      + 'Rautatien kaupunki kasvaa vauhtia, jota kukaan ei ehdi mitata, '
      + 'ja silti savanni alkaa siitä, mihin katu loppuu.',
    nosto: 'Isoisän kirjassa lukee: "Nairobi on leiri, joka päätti jäädä." '
      + 'Hän tuli junalla; minä katselin sen kiskoja ja mietin, kuinka '
      + 'leiristä tuli kaupunki yhden eliniän aikana.',
  },
  sthelena: {
    kuvaus: 'Viikko pelkkää merta — ja sitten aallokosta nousi kallio, '
      + 'yksin keskellä kaikkea! Vene laskettiin maihin köysien varassa '
      + 'aallokon tahtiin, ja polvet tutisivat, kun jalka osui viimein '
      + 'kiveen. Saari tuoksui sateelta ja ruoholta keskellä valtamerta.',
    nosto: 'Isoisä kirjoitti: "Täällä keisari oppi, että maailman voi '
      + 'omistaa ja silti menettää horisontin." Kävelin Longwoodin '
      + 'ylängölle ja katsoin merelle — horisonttia riitti joka suuntaan, '
      + 'eikä yhtään laivaa näkynyt.',
  },
  marrakech: {
    kuvaus: 'Marrakech hehkui vastaan jo kaukaa — kokonainen kaupunki '
      + 'punaista savea! Torilta kuului rumpuja ja sadan kojun melu, ja '
      + 'Atlasvuorten lumihuiput kimmelsivät basaarin kattojen yllä. '
      + 'Seisoin keskellä Jemaa el-Fnaa ja pyörähdin ympäri kuin lapsi.',
    nosto: 'Isoisä kirjoitti kirjaansa: "Tarinankertojan piirissä unohdin '
      + 'laskea aikaa; hyvä kertoja lopettaa aina kesken." Istuin samaan '
      + 'piiriin, enkä ymmärtänyt sanaakaan — ja jäin silti kuuntelemaan '
      + 'loppuun asti.',
  },
  lagos: {
    kuvaus: 'Mikä pauhu! Lagos ei kävele vaan juoksee: laguunin sillat '
      + 'täynnä väkeä, torit täynnä musiikkia, ja joka kulmalta joku '
      + 'nauraa tai huutaa tai myy jotain. Vene vei minut saarelta '
      + 'toiselle, ja kaupunki vain jatkui ja jatkui.',
    nosto: 'Isoisän kirjassa lukee: "Lagosin satamassa laskin kanootteja, '
      + 'kunnes väsyin — kauppa ei lopu, se vain vaihtaa venettä." Laskin '
      + 'minäkin, ja väsyin minäkin.',
  },
  tripoli: {
    kuvaus: 'En ollut uskoa silmiäni: Tripoli makaa kalliolla kuin laivan '
      + 'keula, ja muurit hohtavat auringossa niin valkoisina, että '
      + 'jouduin siristämään silmiäni ja hymyilemään samaan aikaan. Kun '
      + 'karavaanin kellot kilahtivat muurien takana, sydämeni hypähti — '
      + 'tuolta se alkaa, pitkä matka!',
    nosto: 'Isoisä kirjoitti nähneensä täällä, kuinka aavikon karavaanit '
      + 'purkavat lastinsa suoraan laivoihin — "kaksi maailmaa kättelee '
      + 'laiturilla", hän merkitsi. Katselin laiturille, ja siellä se '
      + 'kädenpuristus yhä oli.',
  },
  murzuk: {
    kuvaus: 'Viimeinen harju ylitettiin auringonlaskussa, ja siinä se oli: '
      + 'Murzuk, kourallinen savitaloja hiekkameren laidalla. Hiljaisuus '
      + 'oli niin täydellinen, että kuulin oman sykkeeni — pelkäsin ja '
      + 'ihailin yhtä aikaa, enkä hävennyt kumpaakaan.',
    nosto: 'Isoisän kirjassa lukee: "Oppaani tietää tien ilman karttaa; '
      + 'minulla on kartta, enkä tiedä tietä." Ymmärrän lauseen nyt '
      + 'paremmin kuin kotona ymmärsin.',
  },
  alkufra: {
    kuvaus: 'Päiväkausia pelkkää hiekkaa — ja sitten tyhjyyden keskeltä '
      + 'nousi vihreä saareke: palmuja, varjoa, veden tuoksu! Hieroin '
      + 'silmiäni kuin unesta herännyt, ja vesi maistui paremmalta kuin '
      + 'mikään juoma Lontoossa ikinä.',
    nosto: 'Isoisä merkitsi keitaasta: "Se ilmestyy hiekan keskelle kuin '
      + 'virhe kartassa. Veden määrän tietävät vain ne, jotka ovat asuneet '
      + 'täällä sukupolvia." Virhe kartassa — ja silti ainoa tosi paikka '
      + 'päivien matkalla.',
  },
  sahara: {
    kuvaus: 'Päivällä valo löi kuin vasara, mutta illalla taivas syttyi '
      + 'niin täyteen tähtiä, että minun oli pakko istua alas. Istuin '
      + 'hiekalle sanattomana, ja opas kaatoi kolmannen lasillisen teetä '
      + 'ja hymyili kartalleni.',
    nosto: 'Isoisä kirjoitti palelleensa yöllä kahden peiton alla ja '
      + 'ihmetelleensä kallioon piirrettyjä karjalaumoja: "Joku on siis '
      + 'paimentanut lehmiä siellä, missä minä en löydä vettä." Sama '
      + 'ihmetys valtasi minutkin.',
  },
  ahaggar: {
    kuvaus: 'Kiipesimme kylmässä pimeässä, ja sitten valo tuli: Ahaggarin '
      + 'mustat kivitornit nousivat hiekasta yksi kerrallaan kuin '
      + 'uponneen linnan huiput. Henkeni salpautui — keskellä maailman '
      + 'suurinta aavikkoa minä seison vuoristossa ja palelen.',
    nosto: 'Isoisän sivulla lukee: "Tuaregit tuntevat nämä polut nimeltä; '
      + 'me nimesimme ne uudelleen ja luulimme sitä löytämiseksi." Se on '
      + 'rehellisin lause, jonka ukko koskaan kirjoitti.',
  },
  timbuktu: {
    kuvaus: 'Timbuktu — kaupunki, jonka nimellä klubilla tarkoitetaan '
      + 'paikkaa, jota ei ole! Ja kuitenkin kävelen sen hiekkakatuja, ja '
      + 'kirjastoissa lepää käsikirjoituksia tähdistä ja laista — häpesin '
      + 'hetken sitä, mitä olin uskonut, ja ihastuin sitten kahta '
      + 'kauheammin.',
    nosto: 'Isoisä kirjoitti täältä: "Enemmän kirjoja kuin monessa '
      + 'englantilaisessa pikkukaupungissa." Lauseen perään hän oli '
      + 'piirtänyt huutomerkin — ukolla ei ollut tapana tuhlata niitä.',
  },
  gao: {
    kuvaus: 'Tulin aavikon puolelta, ja joki tuli vastaan varoittamatta: '
      + 'Niger, leveä ja hidas, ja vastarannalla hehkuu vaaleanpunainen '
      + 'dyyni! Seisoin rannassa ja tajusin katselevani valtakunnan '
      + 'valtatietä — täältä hallittiin aikoinaan puolta Länsi-Afrikkaa.',
    nosto: 'Isoisän kirjassa lukee: "Joen rannalla oli valtakunnan '
      + 'pääkaupunki silloin, kun Englannissa riideltiin ruusuista. '
      + 'Savea kannattaa siis olla kunnioittavampi kuin olen ollut." '
      + 'Katselin Askian hautaa ja nyökkäsin ukolle.',
  },
  dakar: {
    kuvaus: 'Dakarissa Atlantti on joka puolella: tuuli maistuu suolalta, '
      + 'rantabulevardi vilisee elämää, ja aallot lyövät mantereen '
      + 'läntisimpään kärkeen. Goréen saarella hiljenin — sen kauniiden '
      + 'talojen takana on ovi, joka avautuu suoraan merelle.',
    nosto: 'Isoisä kirjoitti täällä lauseen, jota luen yhä uudelleen: '
      + '"Sen laivauksen järjesti minun maanosani, ei tämä." Hän ei '
      + 'selitellyt, eikä selittele nytkään.',
  },
  sierraleone: {
    kuvaus: 'Kun laiva kaartoi lahteen, ymmärsin portugalilaisia: nämä '
      + 'vuoret nousevat merestä kuin leijonat! Satamassa kannettiin, '
      + 'huudettiin ja naurettiin, ja kaupungin nimi kulki mielessäni '
      + 'koko päivän — vapaudenkaupunki.',
    nosto: 'Isoisän kirjassa on tästä satamasta tarkka lause: "Nimi on '
      + 'annettu siksi, että vapaus oli ensin otettu pois." Sitä ei '
      + 'sanota juhlapuheissa, hän lisäsi — mutta hän kirjoitti sen.',
  },
  kappalmas: {
    kuvaus: 'Viikkokausia etelään — ja yhtäkkiä keula osoittaa itään! '
      + 'Kap Palmasin palmut kaartuvat rannalla niin taajaan, että ne '
      + 'näkyvät kannelle asti, kuin manner heiluttaisi vihreää lippua '
      + 'käännöksen merkiksi.',
    nosto: 'Isoisä merkitsi tähän kohtaan: "Purjehtija tietää sijaintinsa '
      + 'puista; minä tarvitsin siihen sekstantin ja kaksi tuntia." '
      + 'Minä tarvitsin peräti kartan, jossa kulma on valmiiksi piirretty.',
  },
  kumasi: {
    kuvaus: 'Kumasi aukeaa kuin tori, jolla ei ole reunoja: kankaita, '
      + 'kultaa, tomaatteja ja puheensorinaa kuin mehiläispesässä. '
      + 'Eksyin neljästi ja nauroin joka kerralla — kuningaskunnan '
      + 'pääkaupunki nöyryyttää vieraansa iloisesti.',
    nosto: 'Isoisä kirjoitti Ashantin hovista: "Järjestetty tarkemmin '
      + 'kuin meidän. Kuninkaan istuinta ei lasketa maahan eikä kukaan '
      + 'istu sillä." Perään hän lisäsi kuivasti: "Makuasia." Ukossa '
      + 'oli huumorintajua, kun tarkkaan lukee.',
  },
  orjarannikko: {
    kuvaus: 'Ouidahissa hiekkatie kulkee kaupungilta rannalle, ja mitä '
      + 'pidemmälle kävelin, sitä hiljaisemmaksi tulin. Tien päässä on '
      + 'vain meri ja portti, jonka läpi näkyy pelkkää vettä — seisoin '
      + 'kauan paikallani, koska sanoja ei ollut.',
    nosto: 'Isoisän kirjassa on tästä rannikosta ankarin lause, jonka hän '
      + 'kirjoitti: "Nimi ei kerro alueesta mitään; se kertoo meistä '
      + 'kaiken." Hän ei piirtänyt nimeä uudelleen — eikä piirrä tämä '
      + 'kartta minunkaan kädessäni.',
  },
  kano: {
    kuvaus: 'Kano ilmestyi harmattanin pölyn takaa vähitellen, kuin '
      + 'valokuva kehittyisi: ensin savimuurit, sitten portit, sitten '
      + 'kokonainen kaupunki auringossa kuivatusta savesta. Värjäämöiden '
      + 'indigo jäi käsiini päiväkausiksi — kannan sitä ylpeänä!',
    nosto: 'Isoisä kirjoitti: "Värjäämöt ovat toimineet kauemmin kuin '
      + 'yksikään tuntemani englantilainen tehdas." Hänenkin kätensä '
      + 'olivat viikon siniset. Suku ei kehity.',
  },
  kamerun: {
    kuvaus: 'Kamerunvuori nousee suoraan merestä pilviin, ja sen '
      + 'rinteillä sade ei ole säätila vaan olotila. Sateenvarjoni '
      + 'kääntyi nurin ensimmäisessä puuskassa, ja minä luovuin siitä '
      + 'nauraen — täällä kastutaan arvokkaasti.',
    nosto: 'Isoisän kirjassa lukee: "Sateenvarjoni kesti kaksi minuuttia. '
      + 'Vuori on ollut tässä kauemmin." Minun varjoni kesti yhden. '
      + 'Kehitys kulkee suvussa taaksepäin.',
  },
  kongo: {
    kuvaus: 'Kongo ei ole joki vaan liikkuva sisämeri, ja metsä sen '
      + 'ympärillä ei ole hetkeäkään hiljaa: se sirisee, kopisee ja '
      + 'huutaa kerroksittain. Ylävirrasta kantautuu koskien jylinä — '
      + 'vesi kuuluu ennen kuin näkyy, ja minua värisytti ihanasti.',
    nosto: 'Isoisän kartassa tässä kohdassa luki "tuntematon". Hän lisäsi '
      + 'perään: "Tuntematon meille, ei niille jotka siellä asuvat." Se '
      + 'yksi lause on koko kirjan arvoinen.',
  },
  angola: {
    kuvaus: 'Luandan lahti kaartuu kuin sirppi, ja satamassa purjeet ja '
      + 'höyrypiiput seisovat rinnakkain kuin kaksi aikakautta samassa '
      + 'kuvassa. Astuin mereen ja hätkähdin ääneen — vesi on kylmää '
      + 'keskellä tropiikkia!',
    nosto: 'Isoisä kirjoitti satamasta lauseen, joka ei kaipaa jatkoa: '
      + '"Laivat lähtivät Brasiliaan kolmensadan vuoden ajan, ja lastina '
      + 'oli ihmisiä. Muusta ei kannata kiittää ketään." Kylmä vesi '
      + 'tuntui sen jälkeen oikealta.',
  },
  namib: {
    kuvaus: 'Aamulla dyynit nousivat sumusta kuin oranssit vuoret unesta, '
      + 'ja minä kiipesin harjalle henki salpautuen — joka askeleesta '
      + 'puolet valui takaisin. Ylhäältä näkyi vain lisää hiekkaa, '
      + 'kauniina niin kauas kuin silmä kantoi.',
    nosto: 'Isoisä kirjoitti rannan hylyistä: "Jokainen niistä oli jonkun '
      + 'kapteenin varma laskelma. Pidän tämän sivun mielessäni, ennen '
      + 'kuin taas sanon olevani varma." Luin lauseen dyynin harjalla '
      + 'kahdesti.',
  },
  kapkaupunki: {
    kuvaus: 'Pöytävuori näkyi merelle tuntikausia ennen satamaa: tasainen '
      + 'kuin veistetty, ja pilvi valui sen laen yli hitaana '
      + 'vesiputouksena. Seisoin kannella hattu kourassa — täällä kaksi '
      + 'valtamerta kohtaa, ja minä seison niiden saumalla!',
    nosto: 'Isoisän kirjassa lukee: "Täydennämme vesitynnyrit vuoren '
      + 'juurella, kuten kaikki Intiaan menevät ovat tehneet. Kaksi '
      + 'valtamerta kohtaa tässä, eikä kumpikaan kysy meiltä lupaa." '
      + 'Ne eivät kysyneet minultakaan.',
  },
  kimberley: {
    kuvaus: 'Kimberleyssä kävelin suoraan maailman reunalle: Iso reikä '
      + 'aukeaa keskellä kaupunkia, puoli kilometriä leveä ja kokonaan '
      + 'lapioilla kaivettu. Huimasi, enkä tiennyt johtuiko se '
      + 'syvyydestä vai ajatuksesta.',
    nosto: 'Isoisä kirjoitti kuopan reunalta: "Voiton laskee joku, joka '
      + 'ei ole koskaan seisonut reunalla. Kivet lähetetään Lontooseen." '
      + 'Hän ei kirjoittanut, mitä reunalla seisominen maksoi. Sen näkee '
      + 'täällä yhä.',
  },
  mosambik: {
    kuvaus: 'Saari lepää salmessa kuin ankkuroitu laiva, ja lautturi '
      + 'lauloi koko ylityksen. Vesi oli niin kirkasta, että kalat '
      + 'näkyivät veneeseen asti — nauroin ja osoittelin kuin koulupoika.',
    nosto: 'Isoisä merkitsi: "Riutta on niin kirkas, että näen kalat '
      + 'kannelta." Se on hänen kirjansa iloisin lause, ja se pitää '
      + 'yhä paikkansa.',
  },
  madagaskar: {
    kuvaus: 'Madagaskar ei ole Afrikkaa eikä Aasiaa — se on oma '
      + 'maailmansa, ja maisema vaihtui päivässä kolmesti: sademetsä, '
      + 'punaiset kukkulat, riisiterassit. Metsässä minua katselivat '
      + 'takaisin silmäparit, joita ei näe missään muualla maapallolla.',
    nosto: 'Isoisä päätteli kielestä väärin ja myönsi sen kirjassaan: '
      + '"He purjehtivat tänne idästä." Ukko osasi olla väärässä '
      + 'ääneen — taito, jota opettelen edelleen.',
  },
  sansibar: {
    kuvaus: 'Sansibar tuoksui ennen kuin näkyi: neilikka kantoi merelle '
      + 'asti, ja sitten valkoinen kivikaupunki nousi aalloista! Kujilla '
      + 'pysähdyin joka toisen veistetyn oven eteen enkä lakannut '
      + 'katselemasta.',
    nosto: 'Isoisän kirjassa lukee: "Tyyleissä näkyy Oman, Intia ja '
      + 'swahilirannikko — ei Eurooppa." Hän alleviivasi viimeiset '
      + 'kaksi sanaa. Ymmärrän täällä miksi.',
  },
  kilimandzaro: {
    kuvaus: 'Pilvet raottuivat illalla, ja siinä se hohti: lumihuippu '
      + 'keskellä Afrikkaa, lähes päiväntasaajalla. Katselin sitä kunnes '
      + 'niska puutui, enkä olisi lakannut sittenkään.',
    nosto: 'Isoisä kirjoitti Lontooseen lumesta ja sai vastauksen neljän '
      + 'kuukauden päästä: "Ei liene mahdollista." Kirjaansa hän merkitsi: '
      + '"Lumi ei tiettävästi ole lukenut kirjettä." Se ei ole '
      + 'vieläkään.',
  },
  viktoria: {
    kuvaus: 'Sanoivat järveksi, mutta silmä sanoo mereksi: Viktoria '
      + 'Nyanza jatkuu horisonttiin asti, eikä toista rantaa näy '
      + 'mistään. Illalla kalastajaveneet lähtivät vesille lyhtyineen '
      + 'kuin tähdet — ja tästä altaasta lähtee liikkeelle itse Niili!',
    nosto: 'Isoisä merkitsi rannalta: "Nimen antoi maanmieheni '
      + 'kuningattaren mukaan, vaikka rannoilla oli ollut nimiä jo '
      + 'pitkään." Kirjoitan tähän molemmat, kuten hänkin teki: '
      + 'Viktoria — ja Nyanza, järvi.',
  },
  tanganjika: {
    kuvaus: 'Tanganjika on kapea ja loputon: vuoret laskeutuvat veteen '
      + 'molemmin puolin, ja vesi on niin kirkasta, että veneen varjo '
      + 'kulki pohjassa syvällä allamme. Kalat välkkyivät värejä, joita '
      + 'en ole nähnyt missään kirjassa — huudahdin ääneen ainakin '
      + 'kolmesti.',
    nosto: 'Isoisä kirjoitti: "Täällä kaksi maanmiestäni tapasi toisensa '
      + 'ja kutsui sitä löytöretkeksi." Ukko valitsi sanansa tarkasti — '
      + 'järvi oli löydetty kauan ennen heitä.',
  },
  bahrelghazal: {
    kuvaus: 'Täällä joki lakkaa olemasta joki: Bahr el Ghazal hajoaa '
      + 'ruohikkoon, ja vene kulkee käytävissä, joiden seinät ovat '
      + 'kaislaa miestä korkeammalta. Kun kenkänokka nousi siivilleen '
      + 'aivan vierestä, sydämeni jätti lyönnin väliin.',
    nosto: 'Isoisän kirjassa lukee: "Karttani sanoi tässä olevan joki." '
      + 'Lauseen kuivuus on ukon mittapuullakin ansiokas. Minun karttani '
      + 'sanoo samaa, ja olemme molemmat yhtä väärässä.',
  },
  darfur: {
    kuvaus: 'Puoliaavikon keskeltä nousee vuori, joka tekee oman säänsä: '
      + 'Jebel Marran rinteillä tuoksuivat appelsiinipuut, kun alhaalla '
      + 'pöly peitti jäljet. Ihmettelin ääneen, ja opas nyökkäsi kuin '
      + 'itsestäänselvyydelle.',
    nosto: 'Isoisä piti tämän alueen nimestä: "Furien maa — eli sen, '
      + 'kenen maa se on. Harvinaisen selkeä nimi kartalla." Toivoin '
      + 'hänen kanssaan, että selkeys tarttuisi muihinkin karttoihin.',
  },
  suakin: {
    kuvaus: 'Suakin hehkui iltavalossa vaaleanpunaisena kuin simpukan '
      + 'sisus — kokonainen kaupunki merestä nostettua korallia! Istuin '
      + 'kauppiastalon portailla ja kuuntelin satamaa, joka on nähnyt '
      + 'tuhat vuotta laivoja.',
    nosto: 'Isoisä kirjoitti korallitaloista: "Kekseliäämpää kuin mikään '
      + 'Lontoon uudisrakennus." Meri antaa täällä rakennuskivetkin — '
      + 'ukko arvosti sellaista taloudenpitoa.',
  },
  addisabeba: {
    kuvaus: 'Addis Abebaan noustaan kirjaimellisesti: hengästyin '
      + 'portaissa kuin vanhus, kunnes muistin seisovani lähes kahden ja '
      + 'puolen kilometrin korkeudessa. Ilma on viileää ja kirkasta, '
      + 'eukalyptus tuoksuu — ja kahviseremonian tunti meni kuin '
      + 'siivillä.',
    nosto: 'Isoisä kirjoitti keisarikunnasta, joka säilytti '
      + 'itsenäisyytensä: "Se hämmentää klubissani suuresti; minua se '
      + 'ei enää hämmennä." Minua ei hämmentänyt hetkeäkään.',
  },
  rashafun: {
    kuvaus: 'Niemen kärjessä tuuli otti vastaan kuin vanha tuttu: tämä '
      + 'on mantereen itäisin kohta, ja seuraava ranta idässä on Intia! '
      + 'Hiekassa kimalsi ruukunsirpale, jonka joku kauppias pudotti '
      + 'ehkä kaksituhatta vuotta sitten.',
    nosto: 'Isoisä merkitsi: "Purjelaiva pääsee Intiaan ja takaisin saman '
      + 'vuoden aikana — tämän tiesivät täällä kaikki ennen kuin '
      + 'höyrykone keksittiin." Seisoin kärjessä ja annoin saman tuulen '
      + 'kääntää lehteä.',
  },
};
