# Liberia-maalehti (ISO-3: LBR) — lyhyt faktapohja

*Koonnut Opus-lehtiagentti 6.9.2026. Kaikki faktat haettu samana päivänä
en-Wikipedian raakatekstistä (`api.php?action=query&prop=extracts&
explaintext=1`, `NODE_USE_ENV_PROXY=1`, User-Agent
`Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`). Lyhyt
faktapohja: vain ne luvut, päiväykset ja nimet, jotka päätyivät
`js/packs/maa-kategoriat.js`:n LBR-lohkoon, sekä ristiriidat. Rakenteen
sitova lähde docs/moduulit/maalehti.md.*

Aiheet (5 × 4 nostoa): **Historia, Ruoka, Kuvataide, Musiikki,
Kirjallisuus.** Minitehtävä on Historia-sivulla.

**Rajaus.** Liberiassa ei ole yhtään kaupunkilehteä (Kap Palmas on
laudalla, mutta `KULTTUURI_KATEGORIAT`-lohkoa sillä ei ole), joten
päällekkäisyyttä kaupunkitasolle ei ole. Karttanostot rajaavat sen
sijaan paljon: `js/packs/maastokohteet-lbr.js` kattaa Mount Wuteven,
Atlantin, Cavallan, Providence Islandin (vuoden 1822 asutus ja Ducorin
sopimus), Sapon kansallispuiston, Yekepan, Harperin (Marylandin
tasavalta ja maan nimen alkuperä), Robertsportin, Buchananin, Gbarngan
ja Bopolun; `js/packs/skandaalit.js` Firestonen kumisopimuksen (1926)
ja Kansainliiton Christyn raportin (1930); `js/packs/elaintakyt.js`
kääpiövirtahevon. **Maalehti ei koske yhteenkään näistä** — siksi
lehdessä ei ole luonto-aihetta lainkaan (Sapo, Wuteve ja
kääpiövirtahepo ovat jo kartalla), historia alkaa vasta vuoden 1847
julistuksesta eikä siirtokunnan perustamisesta, eikä kumi- tai
rautamalmitaloutta kerrota uudestaan. Kru-merimiehet ovat maalehden oma
aihe: kartta kertoo paikoista, lehti ihmisistä.

**Herkät aiheet.** Vuodesta 1980 alkava vallankaappaus- ja
sisällissotahistoria on jätetty pois (M3:n Myanmar-linja); sodat
mainitaan vain siltä osin kuin ne selittävät yhden nykyartistin taustan
— eikä sitäkään väkivallan kuvauksena. Nykypolitiikkaa ei ole
lainkaan. Sande-seurasta kerrotaan naamio taide-esineenä, ei
vihkimysrituaalin yksityiskohtia. Dan-kansan liberialainen liikanimi
*gio* kerrotaan siksi, että en-Wikipedia sanoo sitä halventavaksi
(bassaksi "orja"): lehti käyttää nimeä Dan.

## 1. Historia

- **Itsenäisyys ja Joseph Jenkins Roberts** (en-Wikipedia "Joseph
  Jenkins Roberts", johdanto sekä osiot "Early life", "Emigrating to
  Liberia"; en-Wikipedia "Liberia", osio "Independence"): Roberts
  syntyi **vapaana Norfolkissa Virginiassa 15.3.1809**, purjehti
  **9.2.1829 laivalla Harriet** siirtokuntaan äitinsä, viiden
  sisaruksensa, vaimonsa ja lapsensa kanssa; **vaimo ja lapsi kuolivat
  ensimmäisen vuoden aikana** (siirtolaisten kuolleisuus oli suuri).
  Kauppahuone Roberts, Colson & Company vei Yhdysvaltoihin
  **palmutuotteita, punapuuta (camwood) ja norsunluuta**. Roberts oli
  **1833 siirtokunnan ylisheriffi**, **1839 varakuvernööri** ja
  **1841 ensimmäinen afroamerikkalainen kuvernööri** edeltäjänsä
  Thomas Buchananin kuoltua. Kansanäänestyksen jälkeen **yksitoista
  edustajaa julisti Liberian itsenäiseksi 26.7.1847**; Roberts voitti
  vaalin **5.10.1847** ja vannoi valan **3.1.1848**, varapresidenttinä
  Nathaniel Brander. Presidenttinä **1848–1856 ja 1872–1876**.
  **Britannia tunnusti maan ensimmäisenä; Yhdysvallat vasta
  5.2.1862**, kun etelävaltiot olivat eronneet unionista.
- **Lippu ja sen tekijät** (en-Wikipedia "Flag of Liberia", osiot
  "History" ja "Symbolism"): siirtokunnan ensimmäinen lippu
  **9.4.1827** oli Yhdysvaltain lippu, jossa tähtien tilalla oli
  valkoinen risti. Kuvernööri Roberts pyysi **kirjeessä 10.7.1847**
  **Susannah Elizabeth Lewisiä** johtamaan **seitsemän naisen
  komiteaa**, joka suunnitteli ja ompeli lipun käsin; muut jäsenet
  olivat **Matilda Newport, Rachel Johnson, Mary Hunter, Sarah McGill
  Russwurm, Colonette Teage Ellis ja Sara Draper** — kaikki
  Yhdysvalloissa syntyneitä. Lippu hyväksyttiin **24.8.1847**, noin
  kuukausi julistuksen jälkeen, ja Lewis piti Monroviassa juhlapuheen.
  **Yksitoista raitaa = itsenäisyysjulistuksen allekirjoittajat**;
  punainen ja valkoinen = rohkeus ja siveys; **valkoinen tähti =
  Afrikan ensimmäinen itsenäinen tasavalta**, sininen neliö =
  Afrikan manner. **Lipunpäivä 24.8. säädettiin kansalliseksi
  juhlapäiväksi 24.10.1915** (presidentti Daniel Edward Howard).
  **Vuoden 2022 viidensadan dollarin seteliin** painettiin kuva
  seitsemän naisen komiteasta lippua suunnittelemassa.
- **Kru-merimiehet** (en-Wikipedia "Kru people", osiot "History" ja
  "Seafaring"): kru pidettiin orjakaupan aikana arvokkaampina
  merimiehinä kuin orjatyövoimana, ja **suullinen perinne pitää
  tiukasti kiinni siitä, ettei heitä orjuutettu**. Vapaan miehen
  aseman merkiksi he **tatuoivat otsansa ja nenänselkänsä
  indigolla**. **1790-luvulta alkaen** heitä palkattiin vapaina
  merimiehinä eurooppalaisiin laivoihin; kru-yhteisöjä syntyi
  **Sierra Leonesta Kongon suulle**. Työ neuvoteltiin merellä:
  miehistöt soutivat kanooteilla **jopa kymmenen mailin päähän**
  vastaantulevaa laivaa, ja **päämies kantoi laatikossa aiempia
  työtodistuksiaan**. Britannian laivastossa krumiehiä oli **1820-luvulta
  vuoteen 1924**; **Simon's Townin Seaforth Old Burial Groundissa on
  20–30 hautaa**, joiden kivissä lukevat laivoilla annetut nimet, mm.
  **Tom Ropeman, Bottle of Beer ja Will Cockroach**. Krumiehiä
  palkattiin myös **Ranskan Panaman kanavatyömaalle** ja
  **Liverpooliin syntyi oma Kru town**. Nimi **Kru** on englantilaistus
  kansan omasta nimestä **Klao** — ei sanasta *crew*.
- **Avoin laivarekisteri** (en-Wikipedia "Flag of convenience", osiot
  "History" ja "Current"; en-Wikipedia "Flag of Liberia", osio
  "History"): **Liberian avoin rekisteri perustettiin 1948**, ja sen
  takana oli **Edward Stettinius**, Rooseveltin sota-ajan
  ulkoministeri. Yhtiörakenteessa **25 % tuloista Liberian
  valtiolle, 10 % maan sosiaaliohjelmiin**, loput Stettiniuksen
  yhtiölle. **11.3.1949 kreikkalainen Stavros Niarchos rekisteröi
  ensimmäisen aluksen, World Peacen**. **Kahdeksassatoista vuodessa
  Liberia ohitti Britannian** maailman suurimpana rekisterinä
  (en-Wikipedian "Flag of convenience" johdanto ajoittaa ohituksen
  vuoteen **1968**). Liberian lipun alla purjehtii arviolta
  **1 700 ulkomaisessa omistuksessa olevaa alusta**, ja **2025
  Panama, Liberia ja Marshallinsaaret kattoivat noin puolet
  maailman rahtikapasiteetista (dwt)**. *(Rekisterin vaiheet
  1990-luvulta eteenpäin on jätetty pois: sotavuodet ja hallinto
  ovat nykypolitiikkaa.)*

## 2. Ruoka

- **Riisi ja liemet** (en-Wikipedia "Liberian cuisine", osiot
  "Starches", "Fruits and vegetables", "Fish and meat"): **riisi on
  perusruoka** — tarjoillaan "kuivana" ilman kastiketta (kanan,
  lihasäilykkeen tai naudan kanssa), liemen kanssa, jollof-riisinä tai
  jauhettuna leiväksi (**country breh**). Padat, joita kutsutaan
  nimellä *soup*: **palmuvoi (palm butter), maapähkinä, pippurikeitto,
  bitterleaf, potato greens** (bataatin lehdistä), **cassava leaf eli
  gbassajama** (jauhetut kassavanlehdet punaisessa palmuöljyliemessä),
  **palava sauce** (juuttilehdet) ja **torborgee**
  (afrikanmunakoisoja käyneessä palmuöljyssä, kitkerä; liitetään
  **Lofan lorma-kansaan**). **Bitterball** on pieni munakoisoa
  muistuttava vihannes. **Kala on avainproteiini**: vuoden 1997
  tutkimuksen mukaan Ylä-Guinean maissa kalan osuus eläinproteiinista
  oli **30–80 %**.
- **Kassava survottuna** (sama artikkeli, osio "Starches"): kassavan
  juuri **survotaan tärkkelysruoiksi — fufu kuivatusta, dumboy
  keitetystä juuresta**. Fufun voi tehdä myös **banaanista tai
  taarosta**. Koillisen alueellinen muunnos on **glea-gbar, arkisesti
  GB tai geebee**, joka tarjoillaan **mausteisen sekalihakeiton**
  kanssa. Myös **eddoet (taaron juuret)** ovat ruokaa.
- **Paratiisinjyvät ja Pippurirannikko** (en-Wikipedia "Grains of
  paradise", johdanto sekä osiot "Characteristics", "Ecology" ja
  "Uses"; en-Wikipedia "Liberia", osio "Early history"; en-Wikipedia
  "History of Liberia"): **Aframomum melegueta** on inkiväärikasvi ja
  kardemumman lähisukulainen; **palot 5–7 cm**, sisällä lukuisia
  **punaruskeita siemeniä**; maku **pistävä, mustapippurimainen,
  sitrusvivahteinen**. Portugalilaiset nimesivät seudun **Costa da
  Pimenta (Pippurirannikko)**, ja myöhemmin siitä tuli **Grain Coast
  (Jyvärannikko)** juuri tämän mausteen takia; portugalilaiset
  saapuivat rannikolle **1461/1462**. **Kuningas Alfonso V myönsi 1469
  Fernão Gomesille yksinoikeuden Guineanlahden kauppaan** —
  hintana **100 000 realia vuodessa ja lupaus tutkia 160 km uutta
  rannikkoa vuosittain viiden vuoden ajan**. Euroopassa jyvät olivat
  **1300–1400-luvuilla suosittu mustapippurin korvike**, ja
  **Ménagier de Paris** suositteli niitä ummehtuneelta haisevan viinin
  parantamiseen. **Kolumbuksen jälkeen nimi *malagueta* siirtyi
  chilipippurille.** Sivufakta: mausteen hedelmä on **läntisen
  alankogorillan pääravintoa (80–90 %)**.
- **Coffea liberica** (en-Wikipedia "Coffea liberica", johdanto sekä
  osiot "Description", "Characteristics", "Cultivation and use"):
  kotoisin **Länsi- ja Keski-Afrikasta (Liberiasta Ugandaan ja
  Angolaan)**; **puu jopa 20 m korkea, sato poimitaan tikkailta**;
  **pavut, marjat ja lehdet ovat kaikista kahvilajeista suurimmat** —
  Selangorissa mitatut pavut noin **12 mm**, sadan pavun paino
  **23,20–25,72 g eli lähes kaksinkertainen arabicaan verrattuna**.
  Papu on **epäsymmetrinen ja kärjestä koukkumainen**. Maussa
  **jakkihedelmää**. Espanjalaiset munkit veivät lajin **1740-luvulla
  Lipaan Filippiineille**, missä se tunnetaan nimellä **kapeng
  barako**. **1800-luvun lopun kahviruostepandemiassa liberica kesti
  pisimpään**, ja se vietiin **Jaavalle ja Länsi-Kalimantanille**
  kuolleiden arabica-puiden tilalle; **Malesiassa Johor** on
  tuotannon keskus. **Liberian oma kahvivienti kasvoi selvästi
  1800-luvun lopulla, ja kysyntä Yhdysvalloissa nousi sen jälkeen kun
  laji esiteltiin Philadelphian satavuotisnäyttelyssä 1876.**
  Osuus maailman kaupallisesta kahvista **alle 1,5 %**.

## 3. Kuvataide

- **Martha Ann Ricks ja kuningattaren peitto** (en-Wikipedia "Martha
  Ann Ricks", johdanto ja osio "Life"): syntyi **orjaksi Tennesseessä
  noin 1817**; isä **George Erskine osti perheensä vapaaksi**, ja
  perhe muutti **1830 Clay-Ashlandiin** Liberiaan American
  Colonization Societyn hankkeessa — Martha Ann oli **13-vuotias**.
  Perhe viljeli maata ja kasvatti **kalkkunoita, ankkoja ja lampaita**;
  Ricks **voitti 1858 palkinnon tekemistään silkkisukista**.
  **Kaksikymmentäviisi vuotta** hän ompeli tilkkutyötä, jonka aihe oli
  **Liberian kahvipuu**: valkealla satiinipohjalla **yli 300 vihreää
  lehteä**, punaiset marjat ja keskellä **elämänpuun runko**;
  materiaalit maksoivat **25 dollaria**. **Lähettiläs Edward Blyden
  järjesti audienssin**, kun Ricks oli **76-vuotias**, ja hän luovutti
  työn **kuningatar Victorialle Windsorin linnassa 16.7.1892**
  entisen presidentinrouvan **Jane Robertsin** seurassa; hän myös
  ruokaili kuningattaren vieraana. Ricks kuoli **1901**. **Peitto on
  kadoksissa** (tilanne 2017); valokuvia siitä on säilynyt
  maailmannäyttelyn Africana-osaston kuvista, ja **Caldwellin
  ompelijat tekivät kuosista uustulkinnan 2017**.
- **Maakuntien liput** (en-Wikipedia "Flag of Liberia", osio "County
  flags"): Liberiassa on **15 maakuntaa**, ja jokaisella on oikeus
  omaan lippuunsa; **jokaisessa on kansallislippu ylänurkassa**.
  Liput liehuvat **aluetoimistoissa ja presidentinlinnan edessä
  renkaana kansallislipun ympärillä**. Silloisten **yhdeksän
  maakunnan liput otettiin käyttöön 29.11.1965 presidentti William
  Tubmanin aikana**, jotta maakunnista tulisi mielekkäitä
  kokonaisuuksia; **suunnittelun innoittajana oli Liberian
  tilkkutyöperinne**. Liput ovat saaneet **sosiaalisessa mediassa
  osakseen laajaa pilkkaa** (etenkin River Gee), mutta
  **lipputieteilijä Steven A. Knowlton** on huomauttanut, ettei
  arvostelu ota huomioon lippujen poliittista ja kulttuurista
  asiayhteyttä eikä sitä, että ne on rakennettu kankaasta eikä
  piirretty digitaalisesti.
- **Dan-naamiot** (en-Wikipedia "Dan people", johdanto sekä osiot
  "Culture", "Art", "Men's societies", "Gor society"): Dan on
  mandekansa **Norsunluurannikon luoteisosassa ja naapurissa
  Liberiassa**, virallisesti **Yacouba**; **Liberiassa käytetty nimi
  Gio on bassaa ja tarkoittaa orjaa — sitä pidetään halventavana**.
  **Naamio (Ge tai Gle) on kansan tärkein taidemuoto**, ja veistäjät
  tekevät myös **perinteisiä puulusikoita**. Miesten seurat
  **kutsuvat naamioiden avulla metsän suojelushenget paikalle**, ja
  naamiokulkueella seurat **sovittelevat riitoja, panevat säännöt
  täytäntöön ja ojentavat väärintekijöitä**. Pojat käyvät
  vihkimyksen aikana **bon-metsäkoulun**. **Gor** ("leopardi") on
  rauhantekoon keskittyvä seura, joka liitti Dan-yhteisöt
  ensimmäistä kertaa yhteen poliittiseksi liitoksi. Uskonnossa
  **Zlan** on luojajumala ja **Zu** se voima, jota naamioinnilla
  hallitaan.
- **Sande-seuran kypäränaamio** (en-Wikipedia "Sande society", osiot
  "Unique masking traditions in Liberia", "Iconography of the
  Mende/Vai helmet mask", "Relationship between Sande and Poro
  societies"): **naiset eivät yleensä käytä naamioita Länsi-Afrikassa,
  mutta tällä alueella lukuisimmat ja tärkeimmät puunaamiot tehdään
  juuri naisten Sande-seuralle**. **Sowo** tarkoittaa sekä seuran
  henkeä että tanssijaa, jolla on **kiillotettu musta kypäränaamio ja
  mustaan rafiaan verhottu vartalo**; naamiota kutsutaan myös
  nimellä **bundu**. Se esiintyy **tyttöjen aikuistumisjuhlissa**
  mutta myös **arvovieraiden vierailuilla sekä päälliköiden
  kruunajaisissa ja hautajaisissa**. Mende-kansan mukaan hyvässä
  (*nyande*) naamiossa on **korkea otsa = viisaus, uneliaat alas
  luodut silmät = vaatimattomuus, kiiltävä musta väri = salaisuus,
  kaularenkaat = terveys ja vauraus (sekä naamion myyttinen nousu
  vedestä), linnut = viestinviejät henkien ja ihmisten välillä,
  kaurisimpukat = rikkaus**; **silmät veistetään ihmistä
  suuremmiksi, suu ja nenä pienemmiksi**. Sande ja miesten **Poro
  vuorottelevat "maan" hallinnassa kolmen ja neljän vuoden jaksoissa;
  3 + 4 = 7 on alueen pyhä luku**. Kypäränaamio **puuttuu kokonaan
  kpelleiltä, konoilta, lormalta ja manolta**. *(Vihkimysrituaalin
  yksityiskohtia ei kirjoiteta lehteen.)*

## 4. Musiikki

- **Palmuviinimusiikki ja kru-kitara** (en-Wikipedia "Palm-wine
  music", johdanto sekä osiot "Etymology", "History", "Musical style
  and structure"): tyyli kehittyi **Ghanan, Sierra Leonen, Liberian ja
  Nigerian rannikolla 1800-luvun lopulla** ja **syntyi kru-kansan
  parissa**, joka käytti **merimiesten tuomia portugalilaisia
  kitaroita** ja yhdisti paikalliset sävelmät **trinidadilaiseen
  calypsoon** — "kevyt, keinuva tyyli". **Nimi tulee palmuviinistä**,
  jota juotiin niissä ulkoilmakapakoissa, joissa varhaiset
  kitaristit soittivat. **Kahden sormen näppäilytapa** syntyi siitä,
  että kitaraa soitettiin kuin paikallista luuttua tai harppua;
  tahtilaji **synkopoitu 4/4**. **1920-luvulla eräs krumies opetti
  tyylin ghanalaiselle Kwame Asarelle (Jacob Sam)**, jonka
  **Kumasi Trio teki ensimmäiset highlife-levytyksensä Zonophonelle
  Lontoossa 1928**. Palmuviinimusiikkia pidetään **yhtenä
  Länsi-Afrikan ensimmäisistä populaarimusiikin muodoista**, ja
  **Ebenezer Calendar** teki siitä tunnetun 1950–60-luvun levytyksillä.
- **Kansallislaulu** (en-Wikipedia "All Hail, Liberia, Hail!",
  johdanto ja osio "1974 proposed change to lyrics"): sanat
  **Daniel Bashiel Warner (1815–1880)**, josta tuli **maan kolmas
  presidentti**; sävel **Olmstead Luca (1826–1869)**. Virallinen
  kansallislaulu **itsenäistymisestä 1847**. **22.7.1974** parlamentti
  valtuutti presidentin asettamaan komission tarkastelemaan
  kansallissymboleja; **presidentti William Tolbert nimitti 51
  jäsentä**, ja puheenjohtajana oli **McKinley Alfred Deshield Sr.**
  Komissio jätti raporttinsa **24.1.1978** ja esitti, että laulun sana
  **benighted** (pimeydessä elävä) vaihdettaisiin sanaan
  **undaunted** (lannistumaton). **Muutosta ei koskaan tehty**, ja
  **lippuun komissio ei ehdottanut muutoksia**.
- **Miatta Fahnbulleh** (en-Wikipedia "Miatta Fahnbulleh (singer)"):
  syntyi ja kasvoi **Monroviassa**; isä **H. Boimah Fahnbulleh Sr.**
  oli poliitikko ja diplomaatti, äiti **Mary Brownell**
  naisasianainen. **Halusi laulajaksi, mutta kotimaassa naisten
  esiintymistä julkisilla lavoilla vastustettiin**, joten hän etsi
  tilaisuuksia muualta: **lukio Sierra Leonessa, opistovuosi
  Keniassa**, ja **1968 Yhdysvaltoihin lukemaan journalismia**.
  Opiskeli **American Musical and Dramatic Academyssä**, esiintyi
  **Harlemin Apollo-teatterissa** ja työskenteli **Negro Ensemble
  Companyn** kanssa. **1973** hän lauloi presidentti **Tolbertin
  virkaanastujaisissa**, muutti takaisin **1974**, kiersi **1976
  Yhdysvallat Hugh Masekelan kanssa** ja esiintyi **1977 FESTAC 77
  -festivaalilla Lagosissa**. Asui **Englannissa 1977–1984**.
  Levyt **In Kokolioko (1979), Miatta (1979), The Message of the
  Revolution (1981), Just 4-U (1989)**. Perusti **2005 tyttöjen
  koulun OGEO**, joka jakaa **yli 180 stipendiä**. *(Poliittiset
  luottamustehtävät on jätetty pois.)*
- **Hipco** (en-Wikipedia "Hipco" ja "Music of Liberia", osio
  "Hipco"; en-Wikipedia "Takun J", johdanto ja osiot "1981–2006",
  "2007–2012"): **hipco eli 'co** on liberialainen rapin ja laulun
  laji, jonka nimen loppuosa tulee **kolokwasta**, maan
  puhekielestä. Tyyli **kehittyi 1980-luvulla**, jatkui
  1990-luvulla ja **sai nimensä vasta 2002–2003**; **suosio alkoi
  2004** ja se on **maan suosituin musiikinlaji**. Sanoitukset
  puuttuvat **yhteiskunnallisiin epäkohtiin**. **Unicef teki
  hipco-artistien kanssa 2014 ebolan torjuntakappaleita**, jotka
  soivat radiossa; **2020 seitsemän artistia levytti
  käsienpesukappaleen "Sanitize"**. **Liberia Music Awardsissa ja
  Liberian Entertainment Awardsissa on oma hipco-sarjansa.**
  **Takun J** (Jonathan Koffa, s. **14.5.1981 Monroviassa**) on lajin
  uranuurtajia; esikoisalbumi **The Time 2007**, toinen albumi
  **My Way joulukuussa 2012**; **Male Artist of the Year 2014**.

## 5. Kirjallisuus

- **Vai-tavukirjaimisto** (en-Wikipedia "Vai syllabary", johdanto sekä
  osiot "Structure of the script", "Possible link with Cherokee",
  "Historical symbols", "Unicode"): kehittäjä **Momolu Duwalu Bukele
  Jondun kylästä** nykyisessä **Grand Cape Mountin maakunnassa**;
  kirjaimisto **dokumentoitiin 1830-luvulla** (syntyi noin
  **1832–33**). Se on **N'Kon ohella Länsi-Afrikan onnistuneimpia
  omia kirjoitusjärjestelmiä** käyttäjämäärällä ja kirjallisuuden
  määrällä mitattuna. **Tavukirjoitus vasemmalta oikealle**,
  merkki = konsonantti + vokaali. **Merkit ovat yksinkertaistuneet
  sukupolvien mittaan**, ja **Liberian yliopisto täydensi 1960-luvulla**
  merkistön kattamaan kaikki kielen tavut (pisteitä ja lisäviivoja).
  Bukelen serkku **Kaali Bala Ndole Wano** kirjoitti noin **1845**
  noin **viisikymmensivuisen käsikirjoituksen**, joka tunnetaan
  nimellä **Roran kirja** (tekijänimi Rora). Tutkijat ovat
  **1960-luvulta asti pohtineet yhteyttä pohjoisamerikkalaiseen
  cherokee-tavukirjaimistoon**: **cherokee Austin Curtis** avioitui
  vaikutusvaltaiseen vai-sukuun, ja juuri **hänen talonsa seinässä
  ollut kirjoitus** kiinnitti ensimmäisenä maailman huomion vai-
  kirjoitukseen. **Unicodeen vai lisättiin huhtikuussa 2008**
  (versio 5.1, lohko U+A500–U+A63F).
- **Bai T. Moore** (en-Wikipedia "Bai T. Moore", johdanto sekä osiot
  "Life" ja "Works"): **Bai Tamia Johnson Moore, 12.10.1916 –
  10.1.1988**, syntyi **Dimehin gola-kylässä** Monrovian ja
  Tubmanburgin välisen tien varressa; opiskeli **maataloutta
  Virginia Union Universityssä** ja palasi **1941** valtion
  palvelukseen. Toimitti **Roland T. Dempsterin ja T. H. Careyn
  kanssa runoantologian Echoes from the Valley (1947)**; oma
  kokoelma **Ebony Dust (1962)**. Kuului **1962 tutkijaryhmään, joka
  yhdenmukaisti vai-kirjaimiston Liberian yliopistossa**.
  Pienoisromaani **Murder in the Cassava Patch (1968)** perustuu
  **tositapahtumiin** ja kertoo **mustasukkaisuusmurhasta**; se on
  **ollut koulujen lukemistossa julkaisustaan asti** ja teki
  Mooresta maan tunnetuimman kirjailijan. **The Money Doubler
  (1976)** kertoo huijarista, joka lupaa "afrikkalaisella tieteellä"
  kaksinkertaistaa rahat — **kaikki vuoropuhelu on liberianenglantia**.
  Kokosi **Jangaba Johnsonin kanssa kansantarinat Chips from the
  African Story Tree (1967)**. **Perusti Liberian kansallisen
  kulttuurikeskuksen**; **valtiollisiin hautajaisiin Centennial
  Memorial Pavilionissa** saapuivat **dey-, gola-, vai-, kpelle-,
  gbandi- ja gio-kansojen** kulttuuriryhmät, ja hänet haudattiin
  kotikylään Dimehiin.
- **Edward Wilmot Blyden** (en-Wikipedia "Edward Wilmot Blyden",
  johdanto sekä osiot "Early life and education", "Career",
  "Marriage, family and legacy"): syntyi **3.8.1832 Saint Thomasilla
  Tanskan Länsi-Intiassa** vapaille mustille vanhemmille. **Toukokuussa
  1850** hän matkusti Yhdysvaltoihin ilmoittautuakseen **Rutgersin
  teologiseen oppilaitokseen**, mutta **hänet evättiin ihonvärin
  takia; kaksi muuta seminaaria kieltäytyi samoin**. Hän purjehti
  **samana vuonna Liberiaan**. Aloitti **Liberia Heraldin**
  (maan ainoa sanomalehti) kirjeenvaihtajana ja oli sen
  **päätoimittaja 1855–1856**; ensimmäinen pamfletti **"A Voice From
  Bleeding Africa"**. **1861 kreikan ja latinan professori Liberia
  Collegessa**, **rehtori 1880–1884**. Toimi **Liberian lähettiläänä
  Britanniassa ja Ranskassa**. Panafrikkalaiset kirjoitukset
  vaikuttivat **Marcus Garveyyn, George Padmoreen ja Kwame
  Nkrumahiin**; **Padmore antoi tyttärelleen nimen Blyden**.
  Kuoli **7.2.1912 Freetownissa**. *(Blyden järjesti myös Martha Ann
  Ricksin audienssin kuningatar Victorian luo 1892 — ks. kohta 3.)*
- **Kolokwa ja Liberian englannit** (en-Wikipedia "Liberian English",
  johdanto sekä osiot "The sound system of English in Liberia",
  "Kru Pidgin English", "Kolokwa"; en-Wikipedia "Hipco", osio
  "History"): Liberiassa puhutaan **neljää englannin muotoa**:
  **Standard Liberian English** (opetuksen ja uutistenlukijoiden
  kieli), **Liberian Settler English** (1800-luvulla muuttaneiden
  **16 000 afroamerikkalaisen** jälkeläisten kieli), **Kru Pidgin
  English** (merimiesten ja siirtotyöläisten kieli, **sammumassa**)
  ja **Liberian Kreyol eli kolokwa**, jota puhuu valtaosa maan
  englanninpuhujista. **Nimi kolokwa tulee sanasta *colloquial*** ja
  yleistyi vasta **2000-luvulla**; kieli polveutuu **1700-luvun
  Länsi-Afrikan rannikkopidginistä** ja on saanut vaikutteita
  settler-englannista; äänteistössä näkyvät **kru-kielet, bassa,
  klao ja mande-kieli vai**. **Lauseen loppuun liitetään partikkeli
  *o***, joka korostaa asian merkitystä puhujalle ja kuulijalle tai
  oikaisee väärinkäsityksen. Washington Postin mukaan (siteerattuna
  en-Wikipedian Hipco-artikkelissa) **kolokwa on 99-prosenttisesti
  puhuttu kieli — sillä ei ole julkaistu yhtään kokonaista kirjaa**.
  **Kru Pidgin English** hiipui, kun **Britannian siirtomaakausi ja
  sen laivatyö päättyivät 1900-luvun puolivälissä**.

## Uutislähde

**Daily Observer** (liberianobserver.com), englanti. Testattu 6.9.2026:
syöte `https://www.liberianobserver.com/search/?f=rss&t=article&l=50`
palauttaa **50 juttua**, ja artikkelisivun
`[itemprop="articleBody"]`-lohkosta jäsentyy **kolme yli 60 merkin
kappaletta** sekä `og:image`. Myös **FrontPage Africa**
(`frontpageafricaonline.com/feed/`, 10 juttua, `<article>`-lohkosta 21
kappaletta ja og:image) läpäisi molemmat testit ja on käyttökelpoinen
varalähde; Daily Observer valittiin, koska se on maan vanhin ja
levikiltään suurin päivälehti ja koska sen syötteessä on viisi kertaa
enemmän juttuja. Hylätyt lähteet on lueteltu
`js/packs/uutislahteet.js`:n LBR-kommentissa.

## Ristiriidat ja huomiot

- **Rekisterin ohitusvuosi.** "Flag of convenience" -artikkelin
  johdanto sanoo Liberian ohittaneen Britannian **1968**, osio
  "History" sanoo **"kahdeksassatoista vuodessa"** (1948 + 18 = 1966).
  Lehteen on kirjoitettu vain "kahdeksassatoista vuodessa".
- **Vai-kirjaimiston synty.** Artikkeli antaa sekä
  "dokumentoitiin 1830-luvulla" että "syntyi noin 1832/33"; lehdessä
  puhutaan 1830-luvun alusta.
- **Palmuviinimusiikin alkuperä.** "Music of Liberia" -artikkeli
  esittää vahvempia väitteitä (mm. "syntyi Liberiassa 1918–1920")
  kuin "Palm-wine music", jonka mukaan tyyli kehittyi useiden maiden
  rannikolla 1800-luvun lopulla kru-kansan parissa. Lehti nojaa
  jälkimmäiseen, koska se on varovaisempi ja lähteytetympi.
- **Sowo-naamion alue.** Ikonografia on kuvattu **Mende/Vai**
  -naamiona, ja lähdeteksti puhuu Mende-kansan estetiikasta;
  liberialainen puoli on vai. Lehden teksti sanoo tämän ääneen.
- **Kuvat.** Commonsissa ei ole kelvollista kuvaa Martha Ann Ricksin
  peitosta (kaikki neljä Ricks-kuvaa alle 1200 px), vai-kirjoituksesta
  (kaikki alle 1200 px tai SVG), Blydenistä, Bai T. Mooresta,
  Miatta Fahnbullehista eikä kru-merimiehistä (vain alle 1200 px:n
  kirjaskannauksia). Nämä nostot ovat kuvattomia, ja kohteet on
  kirjattu kuvaputken tilauslistaan loppuraportissa.
