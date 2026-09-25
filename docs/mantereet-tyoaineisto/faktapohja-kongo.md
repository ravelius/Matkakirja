# Kongo-maalehti (ISO-3: COD) — lyhyt faktapohja

*Koonnut Opus-lehtiagentti 6.9.2026. Kaikki faktat haettu samana päivänä
en-Wikipedian raakatekstistä (`api.php?action=query&prop=extracts&
explaintext=1`, `NODE_USE_ENV_PROXY=1`, User-Agent
`Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`). Lyhyt
faktapohja: vain ne luvut, päiväykset ja nimet, jotka päätyivät
`js/packs/maa-kategoriat.js`:n COD-lohkoon, sekä ristiriidat. Rakenteen
sitova lähde docs/moduulit/maalehti.md.*

Aiheet (5 × 4 nostoa): **Historia, Luonto, Ruoka, Kuvataide, Musiikki.**
Minitehtävä on Luonto-sivulla (okapin sukulaisuus).

**Rajaus.** Kongossa ei ole yhtään kaupunkilehteä: laudan kaupungeilla
kongo ja tanganjika ei ole `KULTTUURI_KATEGORIAT`-lohkoa, joten
päällekkäisyyttä kaupunkitasolle ei ole. Karttanostot rajaavat sen
sijaan paljon: `js/packs/maastokohteet-cod.js` kattaa Mount Stanleyn,
Tanganjikajärven, Kongojoen, Ingan padot, Boyoman putoukset sekä
Virungan, Kahuzi-Biégan, Salongan, Garamban ja Upemban puistot ja
Lubumbashin kaivokset; `js/packs/elaintakyt.js` bonobon;
`js/packs/skandaalit.js` Casementin raportin (1904, kumivero) ja
Shinkolobwen kaivoksen. **Maalehti ei koske yhteenkään näistä** — siksi
luonto-osiossa ei ole yhtään kansallispuistoa eikä Kongojokea omana
aiheenaan (turvenosto kertoo altaan suoalueesta, ei joesta),
historiassa ei ole siirtomaakauden kumiveroa eikä kaivoksia, ja metsän
eläimiä edustavat bonobon sijasta okapi ja kongonriikinkukko.

**Herkät aiheet.** Nykypolitiikka ja käynnissä olevat selkkaukset on
jätetty kokonaan pois (M3:n Myanmar-linja): maan nimenmuutokset
1971/1997, Mobutun kausi ja idän levottomuudet eivät esiinny missään
nostossa. Orjakauppa mainitaan vain siltä osin kuin Afonso I:n oma
kirje 1526 sitä käsittelee. Maniokin syanogeeniset yhdisteet kerrotaan
valmistustapana (liotus ja käyminen), ei terveysvaroituksena — samoin
Kivujärven kaasu kerrotaan geologiana ja sähköntuotantona.

## 1. Historia

- **Ishangon luu** (en-Wikipedia "Ishango bone", johdanto sekä osiot
  "Archaeological discovery", "Dating" ja "Interpretations"):
  **Jean de Heinzelin de Braucourt** löysi luun **1950** Ishangosta
  **Semliki-joen** varrelta (Edwardjärvi laskee Semlikiin) kivityökalujen
  ja ihmisluiden seasta; luu on **"kynän kokoinen"**, **noin 10 cm**,
  tummanruskea, ja sen toiseen päähän on kiinnitetty **terävä
  kvartsinpala**. **168 lovea kolmessa rivissä** (M = milieu, G = gauche,
  D = droite). Tulkintoja: tukkimiehen kirjanpito, **12-kantainen**
  laskuväline (Huylebrouck & Pletser), **kuukalenteri** (Marshack),
  alkulukutaulukko (kiistelty). Kuvattu **"ihmiskunnan vanhimmaksi
  matemaattiseksi välineeksi"**, vaikka Wolf Bone (26 000 v.) ja
  Lebombon luu (42 000 v.) ovat vanhempia. Ajoitus **kiistelty**:
  ensin 9 000–6 500 eaa., myöhemmin jopa 44 000 v.; **nykyarvio noin
  20 000 vuotta**, ja hiili-isotooppisuhteen sotki lähistön
  **tulivuoritoiminta**. Samasta kerroksesta löytyi **toinen luu**, jonka
  merkeissä ei ole matemaattista säännönmukaisuutta. Säilytetään
  **Belgian kuninkaallisessa luonnontieteiden instituutissa**
  Brysselissä.
- **Kongon kuningaskunta ja Afonso I** (en-Wikipedia "Kingdom of
  Kongo", osiot "Contact with Portugal and Christianisation", "Reign of
  Afonso I", "Expansion of the slave trade"; myös "Afonso I of Kongo"):
  **Diogo Cão** saapui **1483** ja vei hovimiehiä Portugaliin; he
  opiskelivat siellä lähes neljä vuotta lukemista, kirjoittamista ja
  kristinuskoa. **Nzinga a Nkuwu kastettiin 1491** nimellä **João I**.
  **Afonso I** hallitsi **vuodesta 1509**; koululaitoksen opettajat
  (*mestres*, kikongoksi *alongi a aleke*) värvättiin **aatelistosta**.
  Kikongonkieliset käännökset: **nkanda ukisi** (pyhä kirja = Raamattu),
  **nzo a ukisi** (pyhä talo = kirkko). Poika **Henrique** nimitettiin
  **piispaksi 1518**. **Vuonna 1526** Afonso valitti kirjeessä
  **João III:lle**, että portugalilaiset kauppiaat rikkoivat kaupan
  monopolisääntöjä ja että vapaita kongolaisia siepattiin orjiksi
  vastoin kuningaskunnan lakia; hän perusti lautakunnan valvomaan
  kaupan laillisuutta. Pääkaupunki **M'banza-Kongo**, jota
  portugalilaiset matkaajat vertasivat **1491 Évoran kokoiseksi**;
  nimi vaihtui **São Salvadoriksi** Álvaro I:n aikana.
  *(Kuningaskunnan ydinalue oli nykyisen Pohjois-Angolan ja
  Länsi-Kongon puolella — lehti sanoo "joen suulla".)*
- **Luban valtakunta ja lukasa** (en-Wikipedia "Lukasa (Luba)", koko
  artikkeli; taustaksi "Luba Empire", osio "Government"):
  **Mbudye-seura** vartioi valtakunnan historiaa, eikä kukaan voinut
  saada virkaa pääsemättä sen jäseneksi; hallitsijalla oli seuran
  korkein arvo. **Lukasa** on **20–25 cm pitkä ja noin 13 cm leveä**
  tiimalasin muotoinen puulauta, joka on peitetty **helmillä,
  simpukoilla ja metallilla** tai kaiverruksin. Hovihistorioitsijat
  **bana balute** ("muistin miehet") kuljettivat sormia pinnalla ja
  lukivat **kuningasluettelot, muuttoreitit, protokollan ja Luban
  eepoksen** (Mbidi Kiluwe ja Kalala Ilunga). **Punainen helmi =
  Nkongolo Mwamba**, sininen ("musta") = **Mbidi Kiluwe**. Vain seuran
  ylimmät osaavat tulkita laudan. Kolme lajia: **lwa nkunda**
  (kyyhkynen), **lwa kabemba** (haukka) ja **lwa kitenta**
  (hallitsijan oma, pyhää kuninkuutta koskeva) — **kolmatta lajia ei ole
  säilynyt yhtään kappaletta**. Luban hallintomalli levisi Lundan
  valtakuntaan.
- **Lingala** (en-Wikipedia "Lingala", osiot "History" ja "Name"):
  ennen **1880** joen kauppakieli oli **bobangi**, jota puhuttiin
  **Stanley Poolin ja Ubangi-joen suun** välillä. Eurooppalaiset ja
  heidän afrikkalaiset sotilaansa oppivat sen puutteellisesti, ja
  syntyi uudelleenjärjestynyt muoto ("joen kieli", "kauppakieli").
  **1884** se otettiin käyttöön **Bangalan asemalla** ja sai nimen
  **bangala**. **1901–02** CICM-lähetyssaarnaaja **Égide De Boeck**
  ryhtyi "puhdistamaan" ja laajentamaan kieltä ja esitti nimeä
  **lingala**; koillisessa nimi bangala jäi käyttöön. Puhujia
  **20 miljoonaa äidinkielenään ja noin 20 miljoonaa toisena kielenä**.
  Levisi armeijan komentokielenä ja **soukous-musiikin** mukana.
  Ranskalaislaina: **momí** ("ma mie") = tyttöystävä, **kelási** = koulu.

## 2. Luonto

- **Okapi** (en-Wikipedia "Okapi", johdanto sekä osiot "Etymology and
  taxonomy" ja "Description"): **endeeminen Kongon demokraattisen
  tasavallan koillisosaan**. Euroopassa puhuttiin **afrikkalaisesta
  yksisarvisesta**; **Stanley** mainitsi **1887** matkakirjassaan aasin
  nimeltä **atti**. **Harry Johnston** odotti metsähevosta, mutta jäljet
  olivat **sorkkaeläimen**; hän ei nähnyt elävää eläintä vaan sai
  **raidallista nahkaa ja kallon**, jonka perusteella laji tunnistettiin
  **1901 kirahvin sukulaiseksi**. **Sclater** nimesi sen ensin
  *Equus johnstoni*, **Ray Lankester** siirsi sen omaan sukuunsa
  *Okapia*. Nimi tulee mbuban sanasta **okapi** tai lesen **o'api**.
  **Säkäkorkeus 1,5 m**, ruumiin pituus **2,5 m**, paino **200–350 kg**;
  raidat ovat **suojaväri tiheässä kasvillisuudessa**; koiraalla
  **alle 15 cm:n ossikonit**, naaraalla ei. Kirahvin ja okapin yhteinen
  esi-isä eli **noin 11,5 miljoonaa vuotta sitten** (geenitutkimus 2016);
  ne ovat **kirahvieläinten heimon ainoat elossa olevat lajit**.
  *(Artikkelin mukaan Johnston tapasi kongolaisia, jotka näytösyrittäjä
  oli vienyt Eurooppaan, ja lupasi palauttaa heidät kotiin — tämä on
  jätetty pois lehden nostosta.)*
- **Kongonriikinkukko** (en-Wikipedia "Congo peafowl", osiot "History",
  "Description", "Distribution and habitat", "Conservation"):
  **James P. Chapin** etsi okapia ja huomasi **päähineissä pitkiä
  punaruskeita höyheniä**, joita ei voinut yhdistää mihinkään tunnettuun
  lajiin. **1934** hän näki **Tervurenin museossa** kaksi täytettyä
  lintua, joiden kyltissä luki **"Indian peacock"** — samaa lajia.
  **1955** hän sai käsiinsä **seitsemän yksilöä**. **Afropavo-suvun ainoa
  laji** ja **maan kansallislintu**; koiras **64–70 cm**, syvänsininen
  metallinvihrein ja violetein vivahtein, **paljas punainen kaulan iho**,
  **14 pyrstösulkaa**, päälaella **valkoisia karvamaisia höyheniä**;
  naaras **60–63 cm**, kastanjanruskea. Koiras levittää **pyrstösulkansa**,
  kun muut riikinkukot levittävät **pyrstön peitinsulkia**. Villi kanta
  arvioitiin **2013** kokoon **2 500–9 000 aikuista**; IUCN: silmälläpidettävä.
- **Kivujärvi** (en-Wikipedia "Lake Kivu", johdanto sekä osiot
  "Geography", "Limnic eruptions" ja "Methane extraction"): laskee
  **Ruzizi-jokea etelään Tanganjikajärveen**; ennen se laski
  **pohjoiseen Niilin suuntaan**, kunnes **13 000–9 000 vuotta sitten**
  tulivuoritoiminta (Virungat) nosti vuoret Kivun ja Edwardjärven väliin.
  Pinta-ala **noin 2 700 km²** (Afrikan **kahdeksanneksi suurin**),
  pinta **1 460 m** merenpinnasta, **suurin syvyys 475 m**, keskisyvyys
  **220 m**. **Idjwi** on **maailman kymmenenneksi suurin järvisaari**.
  Kivu on **Nyosin ja Monounin ohella yksi kolmesta järvestä**, joissa
  tapahtuu limnisiä purkauksia. Pohjassa **noin 65 km³ metaania** ja
  **256 km³ hiilidioksidia**; metaanin tuottavat **mikrobit** tulivuorten
  hiilidioksidista. Kaasua otettiin **vuoteen 2004 asti pienessä
  mitassa** Bralirwan panimon kattiloihin; **KivuWatt** tuotti **26 MW
  vuonna 2016**.
- **Cuvette Centralen turve** (en-Wikipedia "Cuvette Centrale", osiot
  "Description" ja "Climate change"): tasainen suo- ja metsäalue Kongon
  altaan keskellä, jonka pohja on entinen **plioseenikauden järvi**;
  hitaita sivujokia **Lopori, Maringa, Ikelemba, Tshuapa, Lomela ja
  Lokoro**; sadetta **noin 2 000 mm** vuodessa. **2017** havaittiin, että
  **40 % kosteikoista** on turpeen päällä ja turpeessa on **noin 30
  petagrammaa (miljardia tonnia) hiiltä** = **28 % maailman trooppisesta
  turvehiilestä**. Turvealue on **4 % Kongon altaan pinta-alasta**, mutta
  sen hiili vastaa **lopun 96 prosentin kaikkia puita**. **2022** sama
  tutkimusryhmä tarkensi alan **145 500 → 167 600 km²** ja paksuuden
  **2 m → 1,7 m**. **Brazzavillen julistus maaliskuussa 2018**: Kongon
  demokraattinen tasavalta, Kongon tasavalta ja Indonesia.

## 3. Ruoka

- **Maniokki, kwanga ja fufu** (en-Wikipedia "Cassava", johdanto sekä
  osiot "History", "Toxicity" ja "Food use"; "Congolese cuisine",
  johdanto ja "Common Congolese dishes"): maniokki on kotoisin
  **Etelä-Amerikasta**, ja **portugalilaiset kauppiaat toivat sen
  Brasiliasta Afrikkaan 1500-luvulla**. **Tropiikin kolmanneksi tärkein
  hiilihydraatin lähde** riisin ja maissin jälkeen; kestää kuivuutta ja
  köyhää maata. Juuressa **linamariinia ja lotaustraliinia**; makeissa
  lajikkeissa jopa **20 mg/kg**, karvaissa **jopa 1 000 mg/kg**.
  Perinteinen käsittely: kuoriminen, raastaminen ja **liotus 48–72 h**,
  jolloin spontaani käyminen poistaa **85–99 %**. **Kwanga eli
  chikwangue** on käytetystä maniokista tehty leipä, joka **säilytetään
  banaaninlehdessä** ja jota valmistetaan kaupallisesti koko maassa.
  **Fufu**: jauhoista keitetty tahna, josta pyöritetään pallo ja johon
  painetaan **peukalolla kuoppa** kastiketta varten.
- **Pondu** (en-Wikipedia "Congolese cuisine", osiot "Common Congolese
  dishes" ja "List of Congolese foods"): **sombe eli pondu** on
  keitetyistä, survotuista ja haudutetuista **maniokin lehdistä** tehty
  muhennos. Muita vihanneksia **okra (dongo-dongo)** ja **karvaslehti**.
  **Sienet ovat luba-alueella arvostettuja** ja korvaavat lihaa, kun
  lihaa ei ole. **Suurin osa aterioista syödään ilman lihaa hinnan
  takia**; **vuohi on yleisimmin syöty liha**; kalaa saadaan joesta,
  sivujoista ja järvistä. **Pilipili** on hyvin tulinen paprika, jota
  tarjotaan lähes kaiken kanssa.
- **Poulet à la moambe** (en-Wikipedia "Moambe chicken", koko
  artikkeli): **moambe** on öljypalmun (Elaeis guineensis) hedelmien
  **hedelmälihasta** puristettua palmuvoita. Kana haudutetaan
  palmuvoissa ja pinaatissa, maustetaan **pilipilillä**, ja seurana on
  **bataattia, sipulia, kovaksi keitettyjä kananmunia**, riisiä tai
  maniokkitahnaa; kanan voi korvata ankalla tai kalalla.
  **Kansallisruoka** Kongon demokraattisessa tasavallassa, Kongon
  tasavallassa, **Gabonissa** (*poulet nyembwe*) ja **Angolassa**
  (*moamba de galinha*). **Nsusu** = kana kikongoksi; Kongon
  tasavallassa maapähkinäversio on **muamba nsusu**.
- **Liboke ja ngandat** (en-Wikipedia "Congolese cuisine", osiot
  "Nganda restaurants" ja "List of Congolese foods"): **liboke ya
  mbisi** (kala, useimmiten monni), **liboke ya ngulu** (sianliha) ja
  **liboke ya mbika** (kurpitsansiemenvanukas) höyrytetään
  **banaaninlehden sisällä**; toreilla myydään valmiita, syötäväksi
  sellaisenaan. Kinshasan **ngandat** ovat baarin ja ravintolan
  välimuotoja, **usein naimattomien naisten omistamia**, ja kukin
  tarjoaa yhden seudun ruokaa: **jokivarren nganda** paistettua kalaa ja
  keitettyä banaania ylävirran tapaan, **kongolainen nganda** kalaa
  vihanneskastikkeessa ja kwangaa, **kasailainen nganda** vuohta ja
  riisiä.

## 4. Kuvataide

- **Ndop** (en-Wikipedia "Ndop (Kuba)", koko artikkeli; taustaksi "Kuba
  Kingdom", osio "Kuba art"): **kuningas Misha mi-Shyaang a-Mbul** otti
  ndop-veistokset käyttöön **1700-luvun alun jälkeen**; tutkijat
  ajoittavat muotokuvapatsaiden perinteen **1700-luvun loppupuolelle**.
  Korkeus **48–55 cm**, kovaa puuta, **voideltu palmuöljyllä**
  hyönteisiä vastaan — syy siihen, että kappaleita on säilynyt.
  Hallitsija istuu **jalat ristissä** (harvinaista afrikkalaisessa
  veistotaiteessa) ja pitää vasemmassa kädessään **ikul-rauhanveistä**.
  Patsas ei ole yhdennäköisyyskuva vaan ihannekuva; **jalustan ibol** on
  hallitsijan oma tunnus. Uskottiin, että patsaassa on **kuninkaan
  kaksoisolento**: kuninkaan haava ilmestyisi patsaaseen. Säilytettiin
  **naisten puolella** ja tuotiin synnyttäjän viereen. **Vain yksi
  patsas kutakin kuningasta kohti**. **Britannian museossa kolme**
  kappaletta (kerännyt **Emil Torday**), joista yksi on **1700-luvulta**
  ja Saharan eteläpuolisen Afrikan vanhimpia säilyneitä puuveistoksia.
- **Kuban raffiakankaat** (en-Wikipedia "Kuba textiles", osiot "Raffia
  cloth", "The embroidery", "Twool", "Women's ceremonial overskirts" ja
  "Pattern and repetition"): **miehet** kasvattavat raffiapalmun ja
  kutovat kankaan **kaltevilla yksiniisisillä kangaspuilla**; ruudun koko
  **noin 26 × 28 tuumaa** (≈ 66 × 71 cm), yhteen menee **2–3 tuntia**.
  **Naiset** ompelevat kuviot; **leikkonukkatekniikassa** lyhyet
  raffiasäikeet pujotetaan kankaan läpi ja leikataan poikki, jolloin
  pinta on **samettimainen**. **Twool (tukula)** on punapuun sydänpuusta
  jauhettu punainen väri, jota sekoitetaan myös palmuöljyyn
  ihovoiteeksi. **Juhlahame** kootaan monen ompelijan ruuduista, yksi
  ruutu voi viedä **kuukausia tai vuosia**, ja valmis hame on
  **noin 25 jalkaa (≈ 7,6 m)**. Matemaatikko **Donald Crowe**: niistä
  **17 tavasta**, joilla kuvio voi toistua tasossa, Kuban tekijät ovat
  käyttäneet **12**; tyylille on ominaista **odotetun rivin
  katkaiseminen**.
- **Chéri Samba** (en-Wikipedia "Chéri Samba", osiot "Early life",
  "Biography"): synt. **30.12.1956 Kinto M'Vuilassa**, kymmenlapsisen
  perheen vanhin poika; isä **seppä**, äiti **maanviljelijä**. Lähti
  **16-vuotiaana 1972** Kinshasaan **kylttimaalariksi** ja tapasi siellä
  **Mokén ja Bodon**; ryhmästä tuli maan tunnetuin populaarimaalauksen
  koulukunta. **Oma ateljee 1975**, samaan aikaan kuvittajana
  viihdelehdessä **Bilenge Info**. Sarjakuvasta hän otti **puhekuplat**:
  maalauksissa on tekstiä **ranskaksi ja lingalaksi**, ja hän maalaa
  usein **itsensä keskelle kuvaa**; varhaiset työt tehtiin
  **säkkikankaalle**. Läpimurto **1989** Pariisin Pompidou-keskuksen
  näyttelyssä **Les Magiciens de la Terre**; **Venetsian biennaali
  2007**. Teoksia mm. **Pompidoun ja MoMA:n** kokoelmissa.
- **Bodys Isek Kingelez** (en-Wikipedia "Bodys Isek Kingelez", osiot
  "Biography", "Work", "Exhibitions"): **1948–14.3.2015**, synt.
  **Kimbembele-Ihungassa**, yhdeksän sisaruksen vanhin; muutti
  Kinshasaan **1970** ja työskenteli **kansallismuseossa naamioiden
  entisöijänä vuoteen 1985**. Kutsui teoksiaan nimellä **extrêmes
  maquettes**; materiaalina **pahvi, paperi, teippi ja muovi**; malleja
  **yli 300**. **Vuodesta 1992** kokonaisia kaupunkeja katuineen,
  puistoineen ja stadioneineen; **ensimmäinen kaupunki nimettiin
  kotikylän mukaan**. Tunnetut työt **Ville Fantôme (1996)**,
  **Kin 3ème millénaire (1997)**, **La Ville du Futur (2000)**.
  Osallistui **Les Magiciens de la Terre** -näyttelyyn 1989; **ei
  koskaan taidekauppiasta**; **MoMA:n retrospektiivi "City Dreams"
  2018**.

## 5. Musiikki

- **Kongolainen rumba** (en-Wikipedia "Congolese rumba", johdanto sekä
  osiot "Tempo and instrumental composition" ja "Guitars"): juuri on
  **maringa**, bakongojen paritanssimusiikki **Loangon kuningaskunnan**
  alueelta. Alkusoittimet **likembe**, metallitangolla lyöty **pullo** ja
  kehärumpu **patenge**; **1920-luvulla** maringa-yhtyeet vaihtoivat
  likemben **haitariin ja akustiseen kitaraan**. **1940–50-luvulla**
  maahan tuodut **kuubalaiset son-levyt** (Sexteto Habanero, Trio
  Matamoros, Los Guaracheros de Oriente) oli merkitty **väärin
  rumbaksi**, ja nimi jäi. Kitaroita on kolme: **solo, mi-solo ja
  rytmi**; **sebene** on kappaleen loppupuolen nopea soitinjakso, jossa
  kitarat vastaavat toisilleen ja **atalaku**-huutajat vetävät yleisöä;
  **libanga** tarkoittaa tapaa huutaa vieraiden nimiä. Soukous
  **1960–70-luvulla**, ndombolo **1990-luvun lopulla**. **Unesco otti
  kongolaisen rumban aineettoman kulttuuriperinnön luetteloon
  joulukuussa 2021.**
- **Franco Luambo** (en-Wikipedia "Franco Luambo", johdanto sekä osiot
  "Life and career", "1953: Watam" ja "Musical style"): **6.7.1938
  Sona-Bata – 12.10.1989**. Isä **Yvon Emongo** oli rautatietyöläinen;
  isän kuoltua **1949 Luambo oli 11-vuotias** ja koulunkäynti loppui
  varojen puutteeseen. Äiti **Hélène Mbonga Makiese** myi **munkkeja
  Ngiri-Ngirin torilla**. Poika sai paikan **levyjen pakkaajana
  Ngoma-yhtiöllä** ja opetteli **kitaraa salaa** muusikoiden lähdettyä.
  **1953** koekuuntelu **Henri Bowanelle**, sopimus **Basile
  Papadimitrioun** Loningisaan ja lahjaksi kitara **Libaku ya nguma**
  ("boan pää"), joka oli **yhtä iso kuin 15-vuotias soittaja**.
  **OK Jazz perustettiin 1956**, nimi vaihtui **TPOK Jazziksi 1971**;
  tunnuslause **"On entre O.K., on sort K.O."**. Luambo **siirsi
  sebenen kappaleen loppuun** ja soitti sen **peukalolla ja
  etusormella** plektran sijaan. **Rolling Stone 2023: sija 71**
  listalla "250 Greatest Guitarists of All Time".
  *(Artikkelin poliittinen osuus — Mobutu-suhde, vankeustuomio 1978 ja
  sairauden ympärillä käyty julkinen kiista — on jätetty lehden
  ulkopuolelle.)*
- **Indépendance Cha Cha** (en-Wikipedia "Indépendance Cha Cha", osiot
  "Background", "Composition and recording", "Lyrics", "Reception"):
  **Joseph Kabasele (Le Grand Kallé)** ja **L'African Jazz** kutsuttiin
  **Brysselin pyöreän pöydän** neuvotteluihin **1960** viihdyttämään
  valtuuskuntaa; mukaan lähtivät **Nico Kasanda, Déchaud Mwamba, Roger
  Izeidi** ja kilpailevasta OK Jazzista **Vicky Longomba** ja **Armando
  Brazzos** sekä kongarumpali **Pierre Yatula**. Laulu kirjoitettiin
  **20.1.1960** ja esitettiin ensi kerran **Hotel Plazassa 1.2.1960**;
  Longomba lauloi, Kasanda soitti kitaraa. Sanoissa luetellaan
  **puolueiden lyhenteet** (ABAKO, CONAKAT, MNC, PSA...) ja **johtajien
  sukunimet**, ja kertosäe **antaa itsenäisyyden kongolaisille
  itselleen**. **His Master's Voice ei ollut kiinnostunut nauhoista**,
  ja levyn julkaisi **Fonior**. Kieli **lingala ranskalaislainoineen**;
  soi **Radio Congo Belgestä** yli mantereen ja on kuvattu
  **"ensimmäiseksi panafrikkalaiseksi hitiksi"**. **Ruandan
  itsenäistyessä 1.7.1962** nuorisojoukko marssi Kigalissa laulaen sitä.
- **La Sape ja Papa Wemba** (en-Wikipedia "La Sape", johdanto ja osio
  "Language and terminology"; "Papa Wemba", johdanto): **SAPE = Société
  des Ambianceurs et des Personnes Élégantes**; jäsen on **sapeur** tai
  **sapeuse**. Liikkeellä on **kymmenen käskyä**, oma sanasto
  (**sapologie, griffologie, vestimentologie**), **danse des griffes**
  (merkkien tanssi) ja **diattance** (kävelytyyli). Kolme
  syntytarinaa: **Kongon kuningaskunnan hovi**, joka omaksui
  portugalilaista pukeutumista **1500-luvulla**; **Camille Diata**
  1930-luvun Brazzavillessä; siirtolaiset Pariisissa (**Christian
  Loubaki**). **Papa Wemba** (14.6.1949 – 24.4.2016) oli **Zaïko Langa
  Langan perustajajäsen** ja perusti **Viva La Musican 1977**; hänen
  ansiokseen luetaan **La Sapen elpyminen Kinshasassa 1970-luvulla**.
  Hän kuoli lavalla **Abidjanissa**.

## Maaintro

`js/packs/africa-artikkelit.js`, avain `'Kongon demokraattinen
tasavalta'`: intro pidennettiin kuuteen virkkeeseen (maalehden
maaosasto nojaa siihen yksin). Luvut en-Wikipedian artikkelista
"Democratic Republic of the Congo", johdanto ja osio "Etymology":
**pinta-alaltaan Afrikan toiseksi ja maailman yhdenneksitoista suurin**,
**noin 124 miljoonaa asukasta**, **maailman väkirikkain ranskankielinen
maa**, **yli 200 kotikieltä**, joista **lingala** on laajimmalle
levinnyt; pääkaupunki **Kinshasa**; **Zaire** tulee kikongon
ilmauksesta **nzadi o nzere**, "joki joka nielee jokia".

## Uutislähde

**Radio Okapi** (www.radiookapi.net), ranska. Testattu 6.9.2026: syöte
`https://www.radiookapi.net/feed` antaa **viisikymmentä juttua**, ja
artikkelisivun ainoasta `<article>`-lohkosta jäsentyy **kahdeksan yli 60
merkin kappaletta** sekä `og:image`. Asema on YK:n Kongon-operaation ja
Fondation Hirondellen yhteistyö ja maan laajimmalle kuuluva radio.
Hylätyt lähteet on lueteltu `js/packs/uutislahteet.js`:n
COD-kommentissa: **Actualite.cd** (syöte toimii, mutta artikkelisivun
`<article>` sisältää vain otsikon), **7sur7.cd** ja **Mediacongo** (ei
toimivaa RSS-osoitetta), **Politico.cd** (301). Zoom Eco ja La Prunelle
RDC läpäisivät syötetestin mutta ovat selvästi pienempiä julkaisuja.

## Kuvat

16 nostokuvaa Commonsista, lisenssi ja tekijä `extmetadata`-kentistä,
leveys ≥ 1200 px, jokainen katsottu 480 px:n esikatselukuvana.
**Neljä nostoa jäi kuvattomaksi:** lingala, Chéri Samba, Bodys Isek
Kingelez ja Indépendance Cha Cha. **Hylätyt:** "Man's status cloth,
Shoowa people ... HMA" (kollaasi), "Os d'Hishango ©dada2009"
(vesileima), "François Luambo ... se produisant au Zaïre" (elokuvan
still-kuva, jonka public domain -merkintä nojaa pelkkään lataajan
ilmoitukseen) ja "Kwanga-chikwangue" (kadulla istuva myyjä; tilalle
valittiin sama aihe ilman ihmisiä).
