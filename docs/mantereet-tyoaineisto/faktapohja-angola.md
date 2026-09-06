# Angola-maalehti (ISO-3: AGO) — lyhyt faktapohja

*Koonnut Opus-lehtiagentti 6.9.2026. Kaikki faktat haettu samana päivänä
en-Wikipedian raakatekstistä (`api.php?action=query&prop=extracts&
explaintext=1`, `NODE_USE_ENV_PROXY=1`). Lyhyt faktapohja: vain ne luvut,
päiväykset ja nimet, jotka päätyivät `js/packs/maa-kategoriat.js`:n
AGO-lohkoon, sekä ristiriidat. Rakenteen sitova lähde
docs/moduulit/maalehti.md.*

Aiheet (5 × 4 nostoa): **Historia, Luonto, Ruoka, Musiikki, Kuvataide.**
Minitehtävä on Ruoka-sivulla.

**Rajaus.** Angolassa ei ole yhtään kaupunkilehteä (laudalla on kaupunki
`angola`, mutta `KULTTUURI_KATEGORIAT`-lohkoa sillä ei ole), joten
päällekkäisyyttä kaupunkitasolle ei ole. Karttanostot rajaavat sen sijaan
paljon: `js/packs/maastokohteet-ago.js` kattaa Morro de Mocon, Atlantin,
Cuanzan, M’banza-Kongon, São Miguelin linnoituksen, Kalandulan putoukset,
Quiçaman ja Ionan kansallispuistot, Moçâmedesin, Benguelan radan ja Cuito
Cuanavalen; `js/packs/skandaalit.js` Baixa do Cassangen lakon 1961 ja
Nevinsonin orjatiematkan 1904–1906; `js/packs/elaintakyt.js`
jättiläisseeprantiloopin. **Maalehti ei koske yhteenkään näistä** — siksi
historia-osiossa ei ole Kongon kuningaskuntaa, Luandan linnoitusta,
Benguelan rataa eikä 1900-luvun sotia, luonto-osiossa ei ole
kansallispuistoja eikä Kalandulaa, ja Moçâmedes esiintyy vain
etäisyysmittana Tundavalan ja Tchitundu-Hulun kohdalla. Sisällissota
mainitaan vain kahdesti ja vain siltä osin kuin se selittää Dundon museon
kokoelman kohtalon ja kuduron synnyn ajankohdan; nykypolitiikkaa ei ole
lainkaan.

## 1. Historia

- **Ngola-arvonimi ja Ndongo** (en-Wikipedia "Angola", osio "Etymology";
  "Kingdom of Ndongo", johdanto sekä osiot "Political structure" ja
  "Rise of Ndongo"): nimi Angola tulee portugalilaisesta nimestä *Reino
  de Angola*, joka esiintyy jo **Paulo Dias de Novaisin vuoden 1571
  valtakirjassa**; portugalilaiset johtivat sen arvonimestä **ngola**,
  jota Ndongon ja Matamban kuninkaat kantoivat. Ndongo oli ylängöllä
  **Kwanzan ja Lucalan jokien välissä** ja nimellisesti Kongon
  kuningaskunnan vasalli; **"Angola" oli Kongon kuninkaan arvonimien
  joukossa jo 1535**. Suullisen perinteen mukaan — kerännyt jesuiitta
  **Baltasar Barreira** — perustaja oli **Ngola Kiluanje (Ngola Inene)**,
  Kongosta tullut kimbundunkielisen ryhmän päällikkö. Pääkaupunki
  **kabasa** oli **Caculo Cabaça** lähellä nykyistä N’dalatandoa, ja sen
  tiheimmässä korttelissa asui **jopa 50 000 ihmistä**. Alueita hallitsivat
  **sobat**, jotka hallinnoivat **murinda**-alueita ja maksoivat veroa.
  Tärkein virka oli **tendala**, pääneuvonantaja, joka sai hallita
  kuninkaan poissa ollessa ja joka valittiin yleensä **kijiko**-luokan
  entisistä vangeista; sotapäällikkö oli **ngolambole**. Hovin
  virkamiehiä sanottiin **makotoiksi**, "maan herroiksi": **mwene lumbo**
  hoiti palatsin, **mwene kudya** ruoka- ja rahaverot, **mwene miste**
  uskonnon ja **mwene ndongo** oli suurpappi.
- **Njinga** (en-Wikipedia "Nzinga of Ndongo and Matamba", johdanto sekä
  osiot "Early life" ja "Nzinga's Embassy"): **n. 1583 – 17.12.1663**, Ndongon
  kuningatar **1624–1663** ja Matamban **1631–1663**. Nimi tulee
  kimbundun verbistä **kujinga**, kiertää tai kääntää: napanuora oli
  syntyessä kaulan ympärillä. Sai sotilaskoulutuksen ja harjaantui
  **taistelukirveeseen**, ndongolaisten soturien perinteiseen aseeseen;
  portugalilaiset lähetyssaarnaajat opettivat hänet lukemaan ja
  kirjoittamaan portugalia. **1622** hän neuvotteli Luandassa
  suurlähettiläänä: portugalilaisille oli tuoleja, hänelle vain matto,
  jolloin **hänen saattajansa asettui itse tuoliksi**, ja Njinga puhui
  kuvernöörille kasvotusten. Hän kieltäytyi verosta — **vain
  valloitetut maksavat veroa** — ja antoi kastaa itsensä Luandassa
  nimellä **Dona Ana de Sousa**; kummeina kuvernöörin puoliso **Ana da
  Silva** ja kuvernööri **João Correia de Sousa**. Palasi Kabasaan
  voittajana loppuvuonna **1622**. Portugali julisti sodan **1626**, ja
  **1628** mennessä armeija oli murrettu ja Njinga pakosalla; hän
  liittoutui imbangala-päällikkö **Kasanjen** kanssa ja valloitti
  **Matamban 1631–1635**. **1641** hän liittoutui Luandan vallanneen
  **Hollannin Länsi-Intian komppanian** kanssa ja sai **1641–1644**
  takaisin suuren osan Ndongoa, mutta **Massanganon linnoitusta** ei
  vallattu. **1648** portugalilaiset ottivat Luandan takaisin,
  hollantilaiset lähtivät, ja **rauhansopimus solmittiin 1656**.
- **Nzimbu-simpukkaraha** (en-Wikipedia "Shell money", osio "Africa"):
  **Olivella nana** -kotilon (sparkling dwarf olive sea snail) kuoria
  poimittiin **Luandan saarelta** Kongon kuningaskunnan rahaksi; nimi oli
  **nzimbu** tai **zimbo**, ja niitä kuljetettiin pohjoiseen asti
  **Beninin kuningaskuntaan**. **Benguelassa** rahana käytettiin
  **Achatina monetaria** -maakotilon kuorta, joka leikattiin renkaaksi
  keskeltä auki. Koska nzimbun ja kaurisimpukan arvo oli Afrikassa paljon
  suurempi kuin siellä, mistä eurooppalaiset kauppiaat hankkivat ne,
  kauppa oli erittäin tuottoisaa — **voittojen sanotaan yltäneen
  500 prosenttiin** — ja tuonnin kasvaessa **inflaatio söi paikallisia
  talouksia**. *(en-Wikipedia "Angola", osio "History", lisää että
  Kongolla ei ollut kansainvälistä valuuttaa; orjakauppaa koskeva osa on
  jätetty pois, koska se on skandaalikorttien aihe.)*
- **Pungo Andongon mustat kalliot** (en-Wikipedia "Black Rocks at Pungo
  Andongo", koko artikkeli): miljoonia vuosia vanhoja yksittäiskallioita,
  jotka jakautuvat **läntiseen, eteläiseen, pohjoiseen ja
  kaakkoiseen** ryhmään ja ovat **Cacuson ylätasangon** jatke. Tunnetuin
  on läntinen ryhmä **Cacuson kunnassa Malanjen maakunnassa**. Perimätiedon
  mukaan kallioon hakatut **jalanjäljet ovat Ana de Sousa Gingan**, Ndongon
  ja Matamban hallitsijan. Pungo-Andongon kylä on läntisen ryhmän
  keskellä, ja se oli **Ndongon kuningaskunnan viimeinen pääkaupunki**.
  **1671** portugalilaiset piirittivät ja valtasivat kaupungin, orjuuttivat
  suuren osan asukkaista ja **hävittivät kuningaskunnan**; voiton jälkeen
  rakennetun **Pungo-Andongon linnoituksen rauniot** ovat yhä kylässä.

## 2. Luonto

- **Welwitschia** (en-Wikipedia "Welwitschia", johdanto sekä osiot
  "Taxonomy", "Description" ja "Distribution and habitat"): suvussa on
  vain yksi laji, **Welwitschia mirabilis**. Itävaltalainen **Friedrich
  Welwitsch** dokumentoi sen **Angolassa 1859** ja kirjoitti: *"En voinut
  muuta kuin polvistua [...] ja tuijottaa sitä, puoliksi peläten että
  kosketus paljastaisi sen mielikuvituksen tuotteeksi."* Welwitsch
  ehdotti suvun nimeksi **Tumboa** paikallisen nimen **N’tumbo** mukaan,
  mutta **Joseph Dalton Hooker** pyysi luvan nimetä suvun hänen mukaansa.
  Kasvilla on **kaksi pysyvää lehteä**, jotka kasvavat koko sen eliniän ja
  voivat yltää **neljään metriin**; lehtien kärjet repeytyvät nauhoiksi.
  Kruunu levenee **jopa metrin** halkaisijaltaan, suurin mitattu yksilö on
  **2,77 m halkaisijaltaan ja 8,7 m ympärysmitaltaan**, mutta kasvi on
  maan päällä korkeintaan **1,5 metriä**. Vanhimmat ovat ehkä **2 000
  vuotta**. Laji on **Namibin kotoperäinen**, levinneisyys yli **1 000 km
  Angolan ja Namibian rannikkoa** leveysasteiden **14 ja 24 eteläisen**
  välillä; rannikolla ei sada käytännössä lainkaan ja jyrkänteen alapuolella
  alle **100 mm** vuodessa, joten kasvi elää pohjavedestä ja sumusta.
  Afrikaansiksi **tweeblaarkanniedood**, "kaksi lehteä, ei voi kuolla";
  hereroksi **onyanga**.
- **Angolan ylängön vesitorni** (en-Wikipedia "Okavango River", johdanto
  sekä osiot "Flow" ja "Flood"): joki on Angolassa **Cubango**,
  Namibiassa **Kavango** ja Botswanassa **Okavango**; pituutta **1 600
  km**, alku **1 300 metrissä Angolan hiekkaisilla ylängöillä**, eikä
  sillä ole laskua mereen — vesi päättyy **Okavangon suistoon**
  Kalaharissa. Päähaara on **Cuito**. **2015** National Geographic
  käynnisti **Okavango Wilderness Projectin**, ja **2023** julkaistut
  tulokset paikansivat alkulähteen: **paksu turvemaa Angolan ylängöllä**,
  nimeltään **Angola Highlands Water Tower** eli luchazin kielellä
  **Lisima Lya Mwono, "elämän lähde"**. Turve on paikoin **yli 12 jalkaa**
  syvää, sen arvioidaan pidättävän **423 km³ vettä** ja tuottavan **yli
  95 % koko altaan vedestä**. **2026** siitä tuli **Angolan ensimmäinen
  Ramsarin kosteikko**. Angolaan sataa joka sadekaudella **kolme kertaa
  enemmän kuin Botswanaan**; tammikuun sateet kulkevat **kuukauden**
  ensimmäiset 1 000 km ja **neljä kuukautta** suiston viimeiset 250 km,
  joten tulva on suurimmillaan **kesä–elokuussa**, keskellä Botswanan
  kuivaa talvea, ja suisto **kolminkertaistuu**.
- **Tundavalan halkeama** (en-Wikipedia "Tundavala Gap", johdanto,
  "Etymology" ja "Geography"): kanjoni **Serra da Leban** jyrkänteessä
  lähellä **Lubangoa Huílan maakunnassa**. Jyrkänne on **Humpatan
  ylätasangon** länsiraja, osa **eteläisen Afrikan suurta jyrkännettä**,
  ja luonnollinen raja Huílan ja Namiben maakuntien välillä. Reuna on yli
  **2 200 metrissä** ja tasanko sen juurella noin **1 000 metriä
  alempana**; näköalapaikka on **18 km Lubangosta** ja siitä näkyy
  **10 000 km²** Moçâmedesin suuntaan. Angolan hallitus julisti halkeaman
  **kulttuurimaisemaksi 21.8.2012**, ja se on yksi **Angolan seitsemästä
  luonnonihmeestä**. Nimi tulee nyanekan sanasta **Ntandavala**, jolla on
  useita merkityksiä: 'kiinni ollut ja venytetty', 'auki oleva', 'aukko'
  tai 'kahden reunan väliin jäänyt tila'. Lubangon **Tundavalan
  kansallisstadion** on nimetty sen mukaan.
- **Tigres-saari** (en-Wikipedia "Tigres Island", johdanto ja "History"):
  **Angolan suurin saari, 98 km²**, Namiben maakunnassa. Se oli ennen
  **niemimaa** Tigresin salmessa, **Península dos Tigres**, ja sillä oli
  vakiintunut kalastajakylä **São Martinho dos Tigres**. **14.3.1962**
  meri mursi kannaksen läpi ja **vesijohto katkesi**: Tigres muuttui
  saareksi yhdessä yössä eikä sillä ollut enää juomavettä. Myöhemmin sekä
  saari että **Kunene-joen suulla ollut pumppuasema** hylättiin, ja niistä
  tuli aavekaupunkeja, joita **aavikko ottaa vähitellen takaisin**.

## 3. Ruoka

- **Funge ja pirão** (en-Wikipedia "Angolan cuisine", osiot "Ingredients"
  ja "Dishes"; "Funge", johdanto): **funge de bombo** on
  **maniokkijauhosta** keitetty puuro, **hyytelömäinen ja harmaa**, ja se
  on tavallisempi **Pohjois-Angolassa**; **pirão** on **maissijauhosta**,
  **keltainen** ja polentan kaltainen, ja se on tavallisempi
  **etelässä**. Jauhoa sanotaan kummassakin tapauksessa **fubaksi**, ja
  samasta jauhosta tehdään Brasilian **angu**. Molempia kuvataan
  **mauttomiksi mutta täyttäviksi**, ja ne syödään kastikkeiden tai
  tulisen **gindungon** kanssa — chiliä, valkosipulia, sipulia ja joskus
  brandyä. Fungea syödään **sormin**: pieni pallo kastetaan pataan.
  Brasiliassa maniokkijauhosta ja kalaliemestä tehtyä versiota sanotaan
  **pirãoksi**.
- **Moamba de galinha** (en-Wikipedia "Angolan cuisine", osio "Dishes";
  "Moambe chicken"): kanaa **palmuhedelmätahnassa**, mukana **okraa,
  valkosipulia ja punaista palmuöljyä**; tarjotaan riisin ja fungen
  kanssa. **Sekä fungea että moamba de galinhaa on pidetty
  kansallisruokana.** Muunnos **moamba de ginguba** korvaa palmutahnan
  **maapähkinäkastikkeella**.
- **Calulu** (en-Wikipedia "Calulu", osiot "Origin" ja "Fish calulu"):
  Angolassa **bakongot** antoivat nimen calulu sille ruoka-annokselle,
  jonka naiset panivat aterian päätteeksi sivuun aviomiehilleen — monet
  kielentutkijat pitävät tätä sanan alkuperänä. Toiset johtavat sanan
  arawakista, josta se olisi tullut eurooppalaisiin kieliin
  eteläamerikkalaisen espanjan kautta. Sukulaisruokia ovat Jamaikan
  **callaloo** ja Brasilian **caruru**. Kala-calulu tehdään
  **kuivatusta ja tuoreesta kalasta**, joita ladotaan **vuorotellen
  kerroksiksi** tomaatin, valkosipulin, okran, bataatin, pinaatin,
  kesäkurpitsan ja palmuöljyn kanssa; tarjoillaan fungen ja
  palmuöljypapujen kanssa.
- **Makea pää ja juomat** (en-Wikipedia "Angolan cuisine", osiot
  "Dishes" ja "Beverages"): **cocada amarela** on **keltainen
  kookosvanukas** — sokeria, kookosraastetta, munankeltuaisia ja jauhettua
  kanelia — ja jälkiruoka sekä Angolassa että Mosambikissa; se on aivan eri
  asia kuin Brasilian cocada. **Mukua** on **baobabin kuivattu hedelmä**,
  josta tehdään usein jäätelöä. **Kissangua** on Etelä-Angolan
  **alkoholiton maissijauhojuoma**, jota on käytetty parannusrituaaleissa.
  Muita makeita ovat **doce de ginguba** (maapähkinäkarkki),
  **pé-de-moleque** (maapähkinä-karamellikarkki) ja **ngonguenha**
  (paahdettua maniokkijauhoa, sokeria ja maitoa).

**Minitehtävä** (Ruoka-sivu): *Mistä eteläisessä Angolassa tavallisempi
pirão-puuro keitetään?* → **maissijauhosta** (oikea indeksi 3).

## 4. Musiikki

- **Mbulumbumba ja berimbau** (en-Wikipedia "Berimbau", johdanto ja osio
  "History"): berimbau on **angolalainen soittojousi**, jota käytetään
  yleisesti Brasiliassa; nimi on lainattu **kimbundun sanasta
  mbirimbau**. Soittimessa on **yksi kieli**, **kalebassikaikupohja**, ja
  sitä soitetaan **kepillä ja kolikolla tai kivellä**. Musikologi
  **Gerhard Kubik**: berimbau ja **lounaisangolalainen mbulumbumba** ovat
  "identtiset rakenteeltaan ja soittotavaltaan, samoin virityksessä ja
  monessa peruskuviossa". **Yksikään alkuperäisamerikkalainen tai
  eurooppalainen kansa ei käytä soittojousta.** Muitakin bantusanoja
  kulkeutui Brasilian portugaliin: **urucungo**, **madimba lungungu**.
  **1859** ranskalainen toimittaja **Charles Ribeyrolles** kuvasi
  urucungoa Rio de Janeiron seudun viljelmällä. Berimbau ilmestyi
  capoeiran säestykseen **1900-luvun alussa Bahiassa** ja syrjäytti
  vähitellen rummun lajin keskeisenä soittimena.
- **Ngola Ritmos ja semba** (en-Wikipedia "Ngola Ritmos", johdanto,
  "Musical career" ja "Political involvement"; "Semba", johdanto ja
  "Characteristics"): yhtye perustettiin **1947** Manuel dos Passosin
  kotona; jäseninä **Domingos Van-Dúnem, Mário da Silva Araújo, Francisco
  Machado, Liceu Vieira Dias ja Nino Ndongo**, aiemmin ryhmä nimeltä *Os
  Sambas*. He lauloivat **kimbunduksi** levittääkseen kulttuurista ja
  poliittista tietoisuutta Luandassa siirtomaa-aikana; Liceu soitti
  kitaraa, muut rumpuja ja **akasiakepeistä** tehtyjä helistimiä.
  **Massemba**, pariskuntien tanssima umbigada-tanssi, on sanan **semba**
  monikko, ja juuri Liceun, José Marian ja Nino Ndongon kitaravirtuositeetti
  teki massembasta **semban**. Semba tarkoittaa **"navan kosketusta"**.
  Aiheet ovat arkea ja varoittavia tarinoita, **nokkelasti** laulettuina, ja
  sembaa soitetaan sekä **hautajaisissa että juhlissa**. Liceu oli myös
  itsenäisyysliikkeen perustajajäseniä; hänet ja **Amadeu Amorim**
  pidätettiin **1959** ja karkotettiin **Tarrafalin vankilaan Kap
  Verdelle**, ja hän palasi vasta **kymmenen vuoden** kuluttua. Yhtye jatkoi
  **1960-luvun loppuun**; tunnetuimpia kappaleita ovat **Muxima, Mbiri
  Mbiri, Kolonial ja Palamé**, mutta alkuperäisiä levytyksiä on hyvin vähän.
- **Bonga** (en-Wikipedia "Bonga (musician)", osiot "Youth and athletic
  career", "Colonial period" ja "Awards"; "Semba", osio "Semba in modern
  music"): **José Adelino Barceló de Carvalho**, synt. **5.9.1942 Bengon
  maakunnassa**. Aloitti laulamisen **15-vuotiaana**, lähti Angolasta
  **23-vuotiaana** yleisurheilijaksi **Sport Lisboa e Benficaan** ja
  nousi **Portugalin 400 metrin ennätysmieheksi**. Urheilijan asema antoi
  hänelle harvinaisen liikkumavapauden, jota hän käytti nimellä **Bonga
  Kuenda** viedäkseen viestejä maanpaossa olevien ja kotimaahan jääneiden
  välillä. Kun turvallisuuspoliisi tajusi Bonga Kuendan ja Barceló de
  Carvalhon olevan sama mies, hänen oli paettava **Rotterdamiin**, missä
  hän levytti **1972 ensilevynsä Angola 72**; sen kappale **"Mona Ki Ngi
  Xica"** päätyi **Cédric Klapischin elokuvaan 1996**. Levyn sanoista
  annettiin Angolassa **pidätysmääräys**, ja Bonga kierteli Saksan,
  Belgian ja Ranskan välillä **vuoteen 1975**. Hän luopui urheilusta
  **1972**, on julkaissut **yli 30 levyä** portugaliksi ja kimbunduksi ja
  sai **10.12.2014** Ranskan **taiteiden ja kirjallisuuden ritarikunnan**
  arvon. Semba-artikkelin mukaan hän on **kiistatta menestynein
  angolalainen semban maailmalle tunnetuksi tehnyt artisti**.
- **Kuduro** (en-Wikipedia "Kuduro", johdanto sekä osiot "Origins",
  "Terminology", "Technology", "Generations of kuduro" ja "Popularity"):
  syntyi **Luandassa 1980-luvun lopulla**, kun tuottajat sekoittivat
  afrikkalaista lyömäsoitinta karibialaiseen **soca**- ja **zouk
  béton** -musiikkiin sekä eurooppalaiseen houseen ja technoon; tyyliä
  sanottiin ensin **batidaksi**, "biitiksi". Nimi viittaa liikkeeseen,
  jossa tanssijan **takapuoli näyttää kovalta** (*cu duro*), mutta se
  kääntyy myös "kovina aikoina" tai "kovassa paikassa", kun **ku** on
  kimbundun paikan pääte. **Tony Amado** kertoo keksineensä tanssin —
  joka syntyi ennen musiikkia — nähtyään **Jean-Claude Van Dammen**
  elokuvassa **Kickboxer (1989)** tanssimassa humalassa baarissa oudon
  kulmikkaasti. Ensimmäiset tuottajat tekivät kappaleensa Euroopasta
  tuoduilla **sekvensseri-sämpleri-työasemilla**, joiden **pieni muisti**
  selittää lyhyet luupit; **2000-luvun alussa** tietokoneet yleistyivät ja
  tuotanto siirtyi **Fruity Loops** -ohjelmaan, ja koska ohjelma oli
  helposti kopioitavissa, kuduro **demokratisoitui** ja levisi
  **musseque**-kaupunginosiin. **2003** FL Studio salli moniraitaäänityksen
  ja laulun tallentamisen kotona. Ensimmäisen sukupolven tempo oli **128–135
  iskua minuutissa**, toisen **140**. Portugalilais-angolalainen **Buraka
  Som Sistema** vei kuduron maailmalle hittikappaleella **"Yah!"**; nimi
  tulee Lissabonin esikaupungista **Buracasta**. **Coréon Dú** perusti
  festivaalin **I Love Kuduro 2011**, ja Luandan ensimmäiseen
  tapahtumaan **tammikuussa 2012** tuli **yli 14 000 ihmistä**.

## 5. Kuvataide

- **Tchitundu-Hulu** (en-Wikipedia "Tchitundu-Hulu", johdanto sekä osiot
  "History", "Description", "Tchitundu-Hulu Mumule", "Tchitundu-Hulu
  Mucai" ja "Analysis"): neljän kalliotaidekohteen ryhmä **Virein
  kunnassa Namiben maakunnassa**, Angolan vanhimpia maalauksia ja
  kalliopiirroksia. **37 km Vireistä lounaaseen ja 150 km Moçâmedesistä
  etelään**, kuivalla puoliaavikkotasangolla **inselbergien** ympärillä.
  Kohteet **Tchitundu-Hulu Mumule, Tchitundu-Hulu Mucai, Pedra das Zebras
  ja Pedra da Lagoa** ovat kaikki **kilometrin** säteellä toisistaan.
  Nimi *tchitundu hulu* tulkitaan **"taivaan kukkulaksi", "sielujen
  kukkulaksi" tai "pyhäksi kukkulaksi"**; **1973** Santos Júnior lisäsi
  isommalle kohteelle nimen **mumule** ("mies") ja pienemmälle **mucai**
  ("nainen"). Mumule peittää **726 metriä korkean** inselbergin rinteet,
  ja huipun kalliosuojassa on **yli 180 maalausta**, enimmäkseen
  **punaisella ja valkoisella**; Santos Júnior kuvasi käynneillään
  **1970 ja 1972** neljä antilooppia, kaksi käärmettä ja sakaalin.
  Mucain kalliosuoja on **6,7 m korkea, 11,4 m pitkä ja 11,3 m syvä**.
  Piirrokset ovat pääosin **geometrisia** — samankeskisiä ympyröitä ja
  viivoja — ja ne on tehty **kiveä lävistämällä tai hiomalla**. Kohteella
  kävi ensimmäisenä **José Camarate França 1952**, ja **Henri Breuil**
  julkaisi tutkimuksensa **1964**. **Iänmääritys on ristiriitainen:
  kaivausaineiston radiohiiliajoitus viittaa 1. vuosituhanteen eaa., mutta
  samasta kohteesta otetut pigmenttinäytteet 1. vuosituhannen jaa.
  ensimmäisiin vuosisatoihin.** Kohdetta on ehdotettu maailmanperintöön
  **9.5.2017**.
- **Lusona** (en-Wikipedia "Lusona", johdanto sekä osiot "Origins",
  "Post-16th century", "Usage", "Mathematical properties", "Geometric
  algorithms" ja "Chaining rules and theorems"): **sona**-piirrosten
  (yksikkö **lusona**) perinne tunnetaan **Itä-Angolassa,
  Luoteis-Sambiassa ja rajan takana Kongossa**, ja sitä harjoittavat
  etenkin **chokwet ja luchazit**. Kuviot ovat **muistin apuvälineitä**:
  niihin on sidottu sananlaskuja, satuja, pelejä, arvoituksia ja
  eläimiä. Etnologi **Gerhard Kubikin** mukaan perinne on vanha ja
  esikolonialistinen, koska eri tutkijat keräsivät samat kuviot
  **sukupolvien ajan erossa olleilta kansoilta**. Ylä-Sambesin ja
  **Citundu-Hulun** kalliopiirroksissa on **rakenteellisia yhtäläisyyksiä**
  — ne ajoittuvat **600-luvun ja ensimmäisen vuosisadan eaa. väliin** —
  mutta **suoraa näyttöä yhteydestä ei ole**. Yksi
  yksinkertaisimmista kuvioista, **katuva vufwati**, näkyy
  kauppatavaroissa, joita italialainen lähetyssaarnaaja **Antonio Cavazzi
  de Montecuccolo** maalasi akvarelleihinsa Matamban ja Ndongon
  kuningaskunnista. Piirtäjä **siivoaa ja tasoittaa maan**, painaa siihen
  **tasavälisen pisteverkon** ja vetää pisteiden väliin **yhden
  yhtenäisen viivan**; pisteet ovat puita, ihmisiä tai eläimiä, viiva on
  polku, joki, aita, muuri tai ruumiin ääriviiva. **80 % kuvioista on
  symmetrisiä ja 60 % yhdellä viivalla piirrettyjä.** **Paulus Gerdes**
  tunnisti **kuusi rakennusalgoritmia**, joista tavallisin on
  **"punottu matto"**. Tutkimusten mukaan piirtäjät tunsivat ketjutus- ja
  poistosääntöjä ja tiesivät, miksi ne pätevät; ilmeisesti he tiesivät
  myös, että **suhteellisilta sivumitoiltaan jaottomat suorakaiteet
  tuottavat yhden viivan kuvion** — dokumentoiduista kuvioista löytyy
  **75 % kolmestakymmenestä pienimmästä tällaisesta suorakaiteesta**.
  Perinne oli **salainen ja katoamassa**, kun sitä alettiin kirjata.
- **Pwo-naamio** (en-Wikipedia "Angolan art", osiot "Chokwe sculpture" ja
  "Other traditions"): **chokwe-veistotaide on Keski-Afrikan
  kerätyimpiä**. Tunnusomaisia muotoja ovat **pwo-naamio**, jota
  käytetään **naiseuteen ja hedelmällisyyteen** liittyvissä
  naamiaistansseissa, istuvat ja seisovat **esi-isähahmot**,
  **päällikönistuimet**, jotka on mukailtu varhaisista portugalilaisista
  huonekaluista ja veistetty täyteen chokwe-elämän kohtauksia, sekä
  käyttöesineet kuten **nuuska-astiat**. Materiaaleina **puu, raffia,
  kupari ja messinki, helmet ja luonnonpigmentit**. Perinne laajeni
  **1800-luvulla**, kun chokwet vaurastuivat metsästyksellä ja
  **norsunluukaupalla** sen jälkeen, kun Portugali **kielsi orjakaupan
  Angolassa 1830-luvulla**. Pohjois-Angolan kongolaisalueille ovat
  ominaisia **nkisi-voimahahmot**.
- **Chibinda Ilunga ja Dundon museo** (en-Wikipedia "Angolan art", osiot
  "Chokwe sculpture", "Colonial period" ja "Institutions"; "Tshibinda
  Ilunga", osiot "Rulership of the Lunda" ja "Death and Decline"):
  chokwe-veistosten aiheita ovat **Lundan hoviperinteen hahmot**, etenkin
  kulttuurisankari **Chibinda Ilunga**. Perimätiedon mukaan hän oli
  **luba-ruhtinas**, joka nai lundahallitsijan tyttären **Lueji
  A’Nkonden**; isä oli antanut tyttärelleen **rukan-valtarannerenkaan**
  poikiensa sijaan, ja veljet lähtivät maanpakoon. Chibinda toi mukanaan
  **luba-metsästystekniikat ja hallintotavat**, ja kun Lueji sairastui,
  hän luovutti rukanin miehelleen. Chokwe-veistoksissa Chibinda on
  tunnistettavissa **komeasta hiuslaitteesta**, **lääkesarvesta** ja
  **sauvasta**. **Dundon museo** Lunda Norten maakunnassa, jonka perusti
  timanttiyhtiö **Diamang**, kokosi yhden tärkeimmistä chokwe-naamioiden
  ja -veistosten kokoelmista sekä **1880-luvulta alkavia valokuvia** ja
  musiikkiäänitteitä; belgialainen taidehistorioitsija **Marie-Louise
  Bastin (1918–2000)** dokumentoi kokoelman, ja hänen julkaisunsa ovat yhä
  chokwe-tyylien perusteos. **Monet teokset katosivat museosta
  sisällissodan 1975–2002 aikana, ja osa on sittemmin jäljitetty ja
  palautettu.** Palautuksia on rahoittanut **Sindika Dokolon säätiö**.

*(Kuvataide-osion johdannossa mainitaan, että Angolan ensimmäinen oma
paviljonki Venetsian biennaalissa voitti Kultaisen leijonan **2013** —
en-Wikipedia "Angolan art", osio "Contemporary art": valokuvaaja **Edson
Chagas**, teos **Found Not Taken**, kuraattorit **Paula Nascimento,
Stefano Rabolli Pansera ja Jorge Gumbe**, ensimmäinen kerta, kun palkinto
meni afrikkalaiselle paviljongille.)*

## Uutislähde

**Correio da Kianda** (correiokianda.info), portugali. Testattu 6.9.2026:
syötteessä yksitoista juttua, tuorein samalta päivältä; artikkelisivun
ainoasta `<article>`-lohkosta jäsentyy **18 yli 60 merkin kappaletta** ja
`og:image` löytyy. Syöte vastaa suoraan 200:lla eikä ohjaa muualle, ja
sekä syöte että artikkelit ovat samalla isäntänimellä.

Hylätyt: **Jornal de Angola** (jornaldeangola.ao — Angular-sovellus, joka
palauttaa jokaiselle polulle saman HTML-rungon, ei RSS:ää), **ANGOP**
(angop.ao — /feed/ antaa HTML:ää, /rss/ vastaa 503:lla), **Novo Jornal**
(/feed/ → 302 → /feed.html → 302 → /404.html), **O País** (opais.co.ao —
301 ja yhteys katkeaa), **Angola24Horas**, **Club-K** ja **Platina Line**
(403, botti-esto), **Ver Angola** (verangola.net/va/pt/rss palauttaa
HTML-sivun), **Rede Angola** (syöte aukeaa ja antaa kaksitoista juttua,
mutta tuorein on toukokuulta 2017 — sivusto on nukkunut vuosia),
**Mercado** (mercado.co.ao — syöte aukeaa ja on tuore, mutta
artikkelisivulla ei ole `<article>`-elementtiä eikä
`[itemprop="articleBody"]`-merkintää) ja **Folha 8** (jornalf8.net —
molemmat testit menisivät läpi, mutta lehti on kärkevä
oppositiojulkaisu, jonka otsikot ovat nykypoliittisia kannanottoja; peli
näyttää otsikot sellaisinaan, joten M3:n linja sulkee sen pois).

## Kuvat

13 nostoa 20:stä sai kuvan Commonsista (lisenssi ja tekijä
extmetadatasta, leveys ≥ 1200 px, jokainen katsottu silmin 480 px:n
pikkukuvana).

**Seitsemän nostoa jäi kuvattomaksi** — nzimbu-simpukkaraha, Tigres-saari,
Ngola Ritmos, Bonga, kuduro, Tchitundu-Hulu ja lusona: Commonsissa ei ole
näistä yhtään kelvollista tiedostoa. Ne on lueteltu maalehtierän
raportissa kuvaputkelle.

**Hylätyt kuvat.** Cavazzin *Istorica Descrittione* -teoksen kuparipiirrokset
(PD, kaivertaja Federico Agnelli) ovat 1600-luvun eurooppalaisia
näkemyksiä afrikkalaisista, ja niiden esitystapa on karikatyyrinen —
Perustuslain 3. pilari sulkee ne pois. `Queen Nzinga 1657.png` ja
`Recueil. Portraits de la reine de Matamba Anna Zingha` ovat PD, mutta
extmetadatan Artist-kenttä on tyhjä (tekijä tuntematon).
`Lusona 1–7.jpg` ovat PD mutta tekijältään "Unknown author".
`Kuduro Tarian.JPG` (CC0) esittää italialaista suihkulähdettä, ei kuduroa.
`Le pavillon national de lAngola (Biennale darchitecture, Venise)` on
vuoden 2012 **arkkitehtuuri**biennaalista, ei vuoden 2013 taidebiennaalin
palkitusta paviljongista. `Kizomba dancers by Debarshi Ray` -sarjassa on
tunnistettavat kasvot eurooppalaisella tanssilattialla.
`Cervejacuca.jpg` on kaupallinen olutpullo etiketteineen.
`Fuba e fumbua.jpg` ja `Funge.jpg` ovat aiheeltaan oikeita mutta
sisällöltään puoliksi syötyjä annoksia käytettyine ruokailuvälineineen.
`Ilha de Luanda 02.JPG` on nykyaikainen rantakatu, joka ei kerro
simpukkarahasta mitään. `Admiralty Chart No 1806 ... 1880` on kaunis
merikartta, mutta ei ollut varmistettavissa, että Great Fish Bay on sama
kuin Baía dos Tigres, joten kuvatekstiä ei voinut kirjoittaa.

**Tunnistettavat kasvot.** Ainoa kuva, jossa on ihmishahmo, on Luandan
Njinga-patsas — hahmo ON jutun aihe, sama linja kuin Kenian lehden
Kipchoge-kuvassa.
