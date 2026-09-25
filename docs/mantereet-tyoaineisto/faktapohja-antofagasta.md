# Antofagasta — faktakoostaja, uusi kaupunkilehti

Lauta-id `southamerica`, kaupunki-id `antofagasta`, maa CHL,
en-Wikipedia "Antofagasta". Kaikki tiedot haettu Wikipedian
raakatekstistä (`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`,
uusinnat kasvavalla viiveellä, User-Agent `Matkakirja/1.0
(https://github.com/ravelius/Matkakirja)`) **7.9.2026**. Malli ja mitat
luettu tiedostoista `tools/parvi/kaupunkilehti-ohje.md`,
`tools/parvi/kohdekartta-ohje.md`, `docs/aasia-tyoaineisto/
lehtityo-resepti.md`, `docs/moduulit/kaupunkilehti.md` ja
`docs/mantereet-tyoaineisto/spec-mantereet.md`. Mallilehdet: **Lagos ja
Sansibar (v1670)**; es-Wikipedian nimeämiskäytäntö **Guatemala Citystä**
(samasta parvierästä).

## 0. Kielivalinta — ES-WIKIPEDIA NIMETÄÄN LÄHTEENÄ

Antofagastan historiallisesta keskustasta on englanninkielisessä
Wikipediassa **kaksi artikkelia** (`list=geosearch`, −23,6509 /
−70,3975, säde 4 km: katedraali ja jesuiittakoulu; loput osumat ovat
hallinnollisia tai yliopistoja). Espanjankielinen sama haku palauttaa
**neljäkymmentäneljä**. Siksi kohdekartan nähtävyysjuttujen lähde on
katedraalia lukuun ottamatta **es-Wikipedia ja se sanotaan
lähderivillä** — ennakkotapaus `js/packs/nahtavyysjutut.js`,
`guatemala` (7.9.2026).

Luetut lähdeartikkelit **en-Wikipedia (7.9.2026)**: "Antofagasta",
"Antofagasta Region", "Antofagasta Province", "La Portada",
"Camanchaca", "Ruinas de Huanchaca", "Ferrocarril de Antofagasta a
Bolivia", "Salta–Antofagasta railway", "Mejillones Peninsula",
"St. Joseph's Cathedral, Antofagasta", "Tropic of Capricorn",
"War of the Pacific" (vain rajaukseen).

Luetut lähdeartikkelit **es-Wikipedia (7.9.2026)**: "Antofagasta",
"Barrio Histórico de Antofagasta", "Muelle Salitrero Compañía Melbourne
Clark", "Muelle Miraflores", "Museo de Antofagasta", "Plaza Colón
(Antofagasta)", "Teatro Municipal de Antofagasta", "Catedral de
Antofagasta", "Casa Gibbs", "Casa Giménez", "Casa Abaroa", "Casa de la
Cultura Andrés Sabella", "Edificio del Banco Mercantil de Bolivia",
"Estación del Ferrocarril de Antofagasta a Bolivia", "Ruinas de
Huanchaca", "Monumento natural La Portada", "Torre Icono
(Antofagasta)", "Parque Croacia", "Faro Molo de Abrigo de Antofagasta".

## 1. Rajaus tälle lehdelle

**Chilen maalehti (`js/packs/maa-kategoriat.js`, CHL) on tehty ja sen
aiheita EI toisteta.** Maalehti kertoo: mapuchen raja, itsenäisyys,
saksalaissiirtolaiset, **"Kaupunki, jonka keksintö tappoi"**;
Pääsiäissaari, Juan Fernández, Chiloén kirkot, jaganit; **Atacaman
kuivuus**, Valdivian järistys, jääkenttä, alerce; carménère, curanto,
humitas, merkén; cueca ja zamacueca, Violeta Parra, sikuris-huilut,
guitarrón chileno. Karttanostot (`js/packs/maastokohteet-chl.js`: Ojos
del Salado, Chiloé, Tyynimeri, **Atacama**, **Chuquicamata**,
**Humberstone**, Chinchorron muumiot, Sewell, **Paranalin
observatorio**, Isla Negra, Valdivian maanjäristys) sekä
`js/packs/skandaalit.js` (CHL) ja `js/packs/elaintakyt.js` (CHL,
guanako) on luettu — yksikään ei ole tämän lehden aihe.

**Neljä kiellettyä aihetta nostoiksi:** Atacaman kuivuus yleisenä
aavikkoaiheena, Chuquicamatan kuparilouhos, Humberstonen
salpietari-autiokaupunki ja Paranalin observatorio. Kaikki neljä ovat
karttanostoja. Lehden vastaava aihe on tarkoituksella **kaupungin
oma**: Antofagastan oma sademäärä (alle 0,1 mm vuodessa),
camanchaca-sumu ja sumuverkot, salpietarin **kaupunkihistoria**
(yhtiöt, laituri, rata) ja **hopeasulatto Huanchaca**.

Kaupungin visa (`js/packs/southamerica-questions.js`, `antofagasta`)
kysyy: Atacama, salpietari, miksi ei sada, kupari, observatoriot.
**Minitehtävä ei saa kysyä yhtään näistä viidestä**, ja vastausten on
löydyttävä lehden teksteistä — ne ovat teemasivun nostoissa ja
matkaoppaan jaksoissa.

## 2. Olemassa olevat lohkot

- `js/packs/southamerica-saapumiset.js` (`antofagasta`): **valmis, ei
  kosketa**.
- `js/packs/southamerica-valokuvat.js` (`antofagasta`): vanha puoli
  `Una calle de Antofagasta (1912).jpg` (1912, PD, Nevin O. Winter) ja
  uusi `A main street in Antofagasta (pzidar paranal lv-1).jpg` (2011,
  P. Zidar/ESO, CC BY 4.0) — **ennen–nyt-pari otetaan tästä**. Lisäkuvat
  `"Caleta de Pescadores" in Antofagasta (pzidar paranal lv-2).jpg`,
  `Antofagasta - Terminal Pesquero (5203547755).jpg` ja `Vista desde el
  Monumento Natural La Portada, Antofagasta.jpg` ovat varattuja.
- `js/packs/southamerica-artikkelit.js`: **ei merkintää** → kirjoitetaan
  `intro` ja kolmikappaleinen `teksti`. Avain **`Antofagasta`**
  (`js/packs/maailmankartta.js`: `"wiki":"Antofagasta"`).
- `js/packs/kulttuuri-kategoriat.js`: **ei merkintää** → uusi lehti.

## 3. 1873-KEHYS

Isoisän matkavuonna Antofagasta oli **Bolivian satamakaupunki**, viisi
vuotta vanha, ja juuri vuonna 1873 tehtiin ne kaksi sopimusta, joista
kuuden vuoden päästä syttyi sota:

- **27. marraskuuta 1873** chileläinen kaivosyhtiö *Compañía de
  Salitres y Ferrocarril de Antofagasta* (CSFA) allekirjoitti Bolivian
  hallituksen kanssa sopimuksen, joka vapautti mineraalin
  hyödyntämisen veroista **viideksitoista vuodeksi**. **Bolivian
  kongressi ei ratifioinut sopimusta**, koska se analysoi samaan aikaan
  neuvotteluja Chilen kanssa. (en "Antofagasta", History → War of the
  Pacific; es "Antofagasta", Época boliviana)
- **Samana vuonna 1873 Bolivia allekirjoitti Perun kanssa salaisen
  puolustusliiton**, joka kielsi Boliviaa tekemästä rajasopimusta
  Chilen kanssa kysymättä Perulta. (en ja es, samat osiot)
- **Vuonna 1873 perustettiin Empresa Huanchaca de Bolivia** viemään
  eteenpäin Mariano Ramírezin töitä; pääoman puutteessa käännyttiin
  chileläisten sijoittajien puoleen, ja syntyi *Compañía Huanchaca de
  Bolivia* kuuden miljoonan bolivianon pääomalla. Ensimmäisenä vuonna
  se jakoi miljoonan bolivianon osingon. (es "Ruinas de Huanchaca")
- **Vuonna 1873** Cobijan prefektin vierailun vuoksi kunnanhallitus
  antoi vangeille tehtäväksi poistaa kalliokohoumat Plaza Colónin
  pinnalta ja tasoittaa aukio. (es "Plaza Colón (Antofagasta)")

## 4. Väitteet nostoittain

### A1 — Kaupunki ilman perustamiskirjaa (kansisivu)
- **Antofagastalla ei ole perustamiskirjaa** kaupunkina; asutuksen
  arvioidaan alkaneen 1866. (es "Antofagasta", Época boliviana:
  *"La ciudad de Antofagasta carece de acta de fundación."*)
- **Juan "Chango" López**, copiapólainen malminetsijä, asettui
  Peña Blancan alueelle (nyk. La Chimba) ja aloitti vaatimattoman
  louhinnan. Vesi haettiin **Morro Morenon lähteistä 25 kilometrin
  päästä pohjoisesta**. Chilessä häntä pidetään kaupungin ensimmäisenä
  asukkaana. (es "Antofagasta", Época boliviana ja Perfil urbanístico)
- **18. syyskuuta 1866** José Santos Ossa ja Francisco Puelma saivat
  Bolivian hallitukselta salpietarimaiden käyttöoikeuden; chileläiset
  löysivät rikkaat salpietariesiintymät **Salar del Carmenista**
  nykyisen Antofagastan itäpuolelta ja sopivat perustavansa yhtiön
  *Sociedad Exploradora del Desierto de Atacama*. Yhtiön perustamisen
  jälkeen **marraskuussa 1866** alkoi asettua väkeä paikkaan, jota
  kutsuttiin nimellä **La Chimba**. (en "Antofagasta", Early settlers;
  es "Antofagasta", Época boliviana)
- **13. elokuuta 1868 maanjäristyksen** jälkeen La Chimba oli
  tunnustettava laillisesti kaivosasutukseksi, ja **27. elokuuta 1868**
  Bolivian presidentti Mariano Melgarejo käski Litoralin departementin
  prefektin perustaa sen virallisesti. **22. lokakuuta 1868** asutus ja
  satama perustettiin virallisesti nimellä **La Chimba**; kaupunki
  nimettiin myöhemmin uudelleen Antofagastaksi. (es "Antofagasta",
  Época boliviana)
- **José Santos Prada piirsi ensimmäisen virallisen asemakaavan
  14. syyskuuta 1869**: siihen rajattiin Melbourne Clark -yhtiön maat,
  **seitsemäntoista korttelia ja yksi pääaukio**. (sama)

### A2 — Nimi, josta ei ole päästy sopuun (kansisivu)
- Yksimielisyyttä ei ole. Todennäköisesti **eteläistä cacán-kieltä**:
  *anto* (tai *hattun*, 'suuri'), *faya* (tai *haya*, 'suolatasanko') ja
  *gasta* ('kylä') → "suuren suolatasangon kylä". Voi olla myös
  **ketšuaa**: *anta* ('kupari') ja *pakay* ('kätkeä') → "kuparin
  kätkö". Kolmas teoria yhdistää nimen muotoon *Antofagasti*, "auringon
  portti", jolla **chango-kansa kutsui nykyistä La Portadaa**.
  (es "Antofagasta", Toponimia)
- Kerrotaan myös, että nimi tulee Bolivian presidentin **Mariano
  Melgarejon** päätöksestä: hän nimesi kaupungin noin vuonna 1870
  uudelleen omistamansa **Antofagasta de la Sierra** -tilan mukaan
  Catamarcassa. (es "Antofagasta", Toponimia) en-Wikipedian koko
  etymologiaosio on tämä yksi lause: *"The name of Antofagasta is
  'presumably' derived from the name of Antofagasta de la Sierra in
  Catamarca Province, Argentina."* (en "Antofagasta", Etymology)
- Antofagastan lempinimi Chilessä on **Perla del Norte**, pohjoisen
  helmi; lyhennys on **Antofa**. (es "Antofagasta", Toponimia)

### A3 — Vuosi 1873 (kansisivu)
Lähteet kohdassa 3. Lisäksi:
- Bolivian hallitus nimesi Antofagastan **Puerto Mayoriksi** avoimeksi
  koko maailman kaupalle. **Päivämäärä on ristiriitainen**: en sanoo
  8.5.1872, es 8.5.1871 (ks. tarkistuksen kohta A).
- **25. tammikuuta 1872** perustettiin Antofagastan kunta Mejillonesin
  departementin alaprefektin Manuel Buitragon johtamassa
  kokouksessa; kunnanhallitukseen tuli **kaksi saksalaista, yksi
  englantilainen ja kuusi chileläistä**. (es "Antofagasta", Época
  boliviana)

### A4 — Kaupunki vaihtoi maata (kansisivu)
- Alue oli Chilen ja Bolivian kiistan kohteena **vuoden 1866
  rajasopimukseen** asti. Vuonna **1874** Chile ja Bolivia
  allekirjoittivat uuden rajasopimuksen, joka korvasi vuoden 1866
  sopimuksen; yksi kohta oli, **ettei chileläisille henkilöille,
  teollisuudelle ja pääomalle aseteta uusia veroja 25 vuoteen**.
  (en "Antofagasta", War of the Pacific)
- **Bolivian lukutapa:** salpietariyhtiön sopimus oli kesken, joten
  kongressi päätti sopimuksen hyväksyäkseen periä **kymmenen sentin
  veron** vietyä salpietarikvintaalia kohti; tämä ei rikkonut vuoden
  1874 sopimusta, koska sopimus ei ollut silloin vielä voimassa.
  **Chilen lukutapa:** kymmenen sentin vero rikkoi vuoden 1874
  sopimusta. Bolivia keskeytti veron Chilen hallitukselle osoitettuna
  kohteliaisuutena, mutta Chilen ulkoministerin nootin jälkeen se
  otettiin uudelleen käyttöön, minkä jälkeen yhtiön sopimus mitätöitiin
  ja omaisuus määrättiin huutokaupattavaksi. (en ja es, samat osiot —
  **molemmat lukutavat kerrotaan, ei valita puolta**)
- **14. helmikuuta 1879** everstin **Emilio Sotomayorin** johtamat
  chileläiset joukot ottivat Antofagastan haltuunsa estääkseen
  huutokaupan; samalla Chilen hallitus julisti vuoden 1874 sopimuksen
  mitätöidyksi. Tästä alkoi **Tyynenmeren sota (1879–1883)**.
  Bolivian prefekti Severino Zapata esitti vastalauseen ja pakeni Perun
  konsulaattiin. (en ja es)
- Sodan jälkeen tehtiin **vuoden 1884 välirauhansopimus**: Loa-joen ja
  23. leveyspiirin välinen alue jäi Chilen hallintoon ja Bolivia sai
  käyttää Arican ja Antofagastan satamia. **20. lokakuuta 1904**
  allekirjoitettu ja **21. maaliskuuta 1905** voimaan saatettu
  *Rauhan ja ystävyyden sopimus* määritti rajat lopullisesti:
  Antofagastan alue jäi Chilelle, ja Chile sitoutui rakentamaan omalla
  kustannuksellaan **Arican ja La Pazin ylängön välisen rautatien**,
  maksamaan **300 000 puntaa käteisenä** ja myöntämään Bolivialle
  **ikuisen vapaan kauttakulun** alueensa ja satamiensa läpi.
  (en "Antofagasta", 20th century; es "Antofagasta", Guerra del
  Pacífico)
- **14. helmikuuta vietetään yhä Antofagastan päivää.** Juhla
  sekoitetaan toisinaan kaupungin oletettuun perustamispäivään.
  (es "Antofagasta", Festividades)
- **Sävylinjaus:** sota kerrotaan tapahtumina ja sopimuksina, ei
  taisteluina; nykyistä merikiistaa ei käsitellä (spec-mantereet.md ja
  reseptin "ei nykypolitiikkaa").

### A5 — Huanchacan hopeasulatto (kansisivu)
- Ruinas de Huanchaca (ketšuaksi *puente de las penas*, "murheiden
  silta") on **Compañía Minera de Huanchaca de Bolivian** *Playa
  Blancan teollisuuslaitoksen* perustusten jäänne; yhtiöllä oli
  bolivialaisia, chileläisiä ja englantilaisia intressejä ja se omisti
  **Pulacayon ja Oruron hopeakaivokset**, joista malmi tuotiin
  Antofagastaan. (es "Ruinas de Huanchaca")
- Rakentaminen alkoi **1888** sen jälkeen, kun Huanchaca-yhtiö ja CSFA
  sopivat malmin kuljetuksesta (neuvottelijoina chileläinen Melchor de
  Concha y Toro ja bolivialainen Aniceto Arce). **Huhtikuussa 1889**
  Arturo Wendt ja A. Gmehling luovuttivat piirustukset. Työt
  viivästyivät koneiden valmistuksen takia ja maksoivat **6 500 000**,
  vaikka alun arvio oli miljoona. Laitos vihittiin **1892** ja aloitti
  toiminnan **26. helmikuuta 1893**: hopeamalmin amalgamointi ja
  puhdistus, **200 tonnia materiaalia päivässä** ja **3,85 tonnia
  hopeaa kuukaudessa**. Yhtiö työllisti **yli 1 200** ihmistä. (sama)
- Toiminta loppui **1902** hopean maailmanmarkkinahinnan epävakauden ja
  vanhentuneen tekniikan takia; lisäksi **Pulacayon kaivos tulvi**
  eikä sitä saatu käyttöön. (es; en "Ruinas de Huanchaca" sanoo saman)
- Rakennusvuonna se oli **Etelä-Amerikan uudenaikaisin jalostamo**:
  omat voimalaitos ja konepaja, ja kaupunginosan valaistuksen tuotti
  yhtiön oma kaasutehdas. Jäljellä on **punertavasta andesiitista**
  muurattuja paksuja seiniä. (es)
- **Konesali muutettiin sotilaskappeliksi** Nuestra Señora del Carmen,
  joka vihittiin **30. marraskuuta 1942**. Suurin osa siirtyi **1964**
  Universidad del Nortelle (nyk. Universidad Católica del Norte).
  **Kansallinen historiallinen monumentti 7. tammikuuta 1974.** (es)
- Rauniolle rakennettiin **Parque Cultural Huanchaca** ja **Museo del
  Desierto de Atacama**; **vuodesta 1993** rauniolla on pidetty
  vuosittainen joulukonsertti, jonka esittävät **kroatialainen kuoro
  Jadran ja Antofagastan sinfoniaorkesteri**. (es)

### B1–B5 — Teemasivu "Sumu ja aavikko" (id `luonto`)
- Ilmasto on **kylmä aavikkoilmasto (Köppen BWk)**, runsaasti
  auringonpaistetta ja voimakas meren vaikutus. Kuivuutta ja vesipulaa
  säätelee **Humboldtin virta**, ja siihen liittyy suuri kosteus ja
  aamusumu nimeltä **camanchaca**. Etelän ja lounaan tuulet tulevat
  **Tyynenmeren korkeapaineesta**. (en "Antofagasta", Climate)
- **Keskilämpötila 16,8 °C.** Lämpimimmän kuukauden tammikuun
  keskimääräinen alin on **17,5 °C** ja ylin **23,2 °C**; kylmimmän
  kuukauden heinäkuun alin **11,8 °C** ja ylin **16,5 °C**. Korkein
  mitattu **30,0 °C** (tammikuu 1998), matalin **3,0 °C** (syyskuu
  1978). (sama)
- Rannikon keskimääräinen vuosisade on **3,4 mm** (1970–2000), mutta
  **itse Antofagastan kaupunki saa alle 0,1 millimetriä vuodessa, mikä
  on ennätys maailman kuivimpana kaupunkina**. Harvinaiset rankkasateet
  yhdessä maastonmuodon kanssa altistavat kaupungin mutavirroille:
  **vuosina 1916–1999 tulvia tai maanvyöryjä sattui seitsemän kertaa**
  (1925, 1930, kahdesti 1940, 1982, 1987 ja 1991), joista pahimmat
  1940 ja 1991. (sama)
- **Camanchaca** on merellinen stratocumulus-pilvivyöhyke, joka syntyy
  Chilen rannikolla ja liikkuu sisämaahan; se on tiheä sumu, **joka ei
  tuota sadetta**. Pisarat ovat **1–40 mikrometriä**, liian pieniä
  muodostamaan sadepisaroita. Perussa vastaavaa sumua sanotaan
  *garúaksi*, Angolassa *cacimboksi*. **Vuonna 1985** tutkijat
  kehittivät polyolefiiniverkosta sumunkeruujärjestelmän; Camanchacas-
  hanke asensi harjanteelle **50 suurta verkkoa**, jotka keräävät noin
  **2 % sumun vedestä**. **Vuonna 2005** asennettiin 3 neliömetrin
  paneeleita, jotka tuottivat **5 litraa neliömetriltä päivässä**.
  (en "Camanchaca")
- **Morro Morenon kansallispuisto** on kaupungin edustalla lähellä
  Juan Lópezin uimarantaa; se on **yksi maan kuudesta sumukeitaasta**,
  korkeus **1 100 metriä**, ja se on usein pilvien peitossa. (es
  "Antofagasta", Turismo)
- **La Portada** ("portti") on luonnon kaari rannikolla **18 kilometriä
  Antofagastasta pohjoiseen**, yksi Chilen viidestätoista
  luonnonmuistomerkistä. Suojelualue on **31,27 hehtaaria**. Kaari on
  **43 m korkea, 23 m leveä ja 70 m pitkä**; jalusta on mustaa
  andesiittia, sen ympärillä merisedimenttikiviä, kellastuvaa
  hiekkakivikerros ja kuorifossiileja **35–2 miljoonan vuoden takaa**.
  Ympärillä on merieroosion muovaamia rantajyrkänteitä, korkeimmillaan
  **52 metriä**. Luonnonmuistomerkiksi **5. lokakuuta 1990**
  (maatalousministeriön asetus 51). Kohde oli **suljettuna 2003–2008**
  jyrkänteen sortuman takia. **Vuodesta 2010 pääsy rannalle on
  kielletty** kasviston ja eläimistön suojelemiseksi. Lintuja:
  perunsuula, inkatiira, guanokormorantti, etelänharmaalokki,
  harmaalokkilaji *Larus modestus*, Belcherinlokki ja pelikaaneja;
  toisinaan eteläkarvahylje ja delfiini. (en "La Portada")
- **Kääntöpiirin muistomerkki** (Hito al Trópico de Capricornio)
  avattiin **21. joulukuuta 2000**; arkkitehti **Eleonora Roman**
  suunnitteli sen osoittamaan **Kauriin kääntöpiirin** tarkan
  sijainnin ja toimimaan **aurinkokalenterina**. Kääntöpiiri kulkee
  kaupungin pohjoispuolelta
  taajaman ulkopuolelta, lentoaseman kohdalta. (en "Antofagasta",
  Geography; es "Antofagasta", Turismo)
- **Kaupungin kosteikot**: kasvillisuutta on vähän, mutta kaupungissa
  on sarja **kaupunkikosteikkoja**, joissa elää tai käy kotoperäisiä
  matelijoita, niveljalkaisia, sirrejä (*Calidris*) ja nisäkkäistä
  **kulpeokettu**. Kosteikkoja uhkaavat roskat, kulkukoirat, veden
  otto, vajojen rakentaminen ja vesiuomien kääntäminen. Tammikuussa
  2024 kunta suunnitteli niiden julistamista virallisiksi
  kaupunkikosteikoiksi kosteikkolain nojalla. (en "Antofagasta",
  Geography)
- **Rannikko on kallioinen ja jyrkkä, eikä luonnonrantoja ole** —
  suurin osa uimarannoista on tehtyjä. Luonnonrannat alkavat vasta
  kaupungin pohjoispuolelta: La Portada, Las Losetas ja La Rinconada.
  (en "Antofagasta", Hydrology)

## 5. Kohdekartan kahdeksan kohdetta

Rajaus `js/packs/maakartat.js`, `KAUPUNKIKARTAT.antofagasta`:
pohjoinen −23,6415, etelä −23,6520, länsi −70,4060, itä −70,3925
(noin 1,4 × 1,2 km). Koordinaatit es-Wikipedian `list=geosearch`- ja
`prop=coordinates`-rajapinnasta 7.9.2026. Numerointi pohjoisesta
etelään.

1. **Salpietarilaituri** (Muelle Salitrero Compañía Melbourne Clark)
   −23,6435 / −70,3977 (laiturin alkupää rannalla; es-Wikipedian
   koordinaatti −23,64306 / −70,39833 osoittaa ulkopäähän ja on
   vedessä — ks. tarkistuksen kohta H)
2. **Antofagastan museo** (vanha tullitalo) −23,64416667 / −70,39777778
3. **Bolivian kauppapankin talo** −23,64502 / −70,397358
4. **Colónin aukio** −23,64611111 / −70,39777778
5. **Gibbsin talo** −23,64611111 / −70,40055556
6. **Kaupunginteatteri** −23,64654167 / −70,39658333
7. **Antofagastan katedraali** −23,64716667 / −70,39738889
8. **Giménezin talo** −23,650041 / −70,396650

**Kohteet eivät toista lehden juttuja:** lehti kertoo kaupungin
synnystä, nimestä, vuodesta 1873, maan vaihdosta ja Huanchacasta sekä
teemasivulla sumusta ja aavikosta; kartta kertoo kunkin rakennuksen
oman historian. Erityisesti: **vuoden 1879 maihinnousu on noston A4
aihe, joten laiturin juttu kertoo laiturin rakenteen ja vaiheet**, ja
Huanchaca on noston A5 aihe, joten sen rauniot (4,5 km etelässä) eivät
ole kartalla.

### Kohteiden lähdetiedot

1. **Muelle Salitrero Compañía Melbourne Clark** (es), tunnetaan
   nimellä *Muelle Histórico*. Melbourne Clark -yhtiö aloitti
   rakentamisen **1872** ensimmäiseksi salpietarin lastauslaituriksi;
   **vihittiin 1880**. Lastaus tehtiin pienveneillä, koska laituri ei
   ollut tarkoitettu suurille aluksille; kasvava tarve teki siitä myös
   matkustajalaiturin. **1885** se siirtyi Bolivian Huanchaca-yhtiölle
   ja nimeksi tuli *CSFA:n virallinen laituri*; **1888** se siirtyi
   *The Antofagasta (Chili) & Bolivia Railway Companylle*. **1962**
   CORFO, 1972 Astilleros Hydrotherm. **Kansallinen historiallinen
   monumentti 12. heinäkuuta 1978** (asetus 980). Mitat **198 × 15,8
   metriä**, korkeus 2,63 m merenpinnasta; rakennettu **teräskiskoista
   sekä oregoninmännystä ja amerikanvalkotammesta**, sidottu betonilla.
   Vuoden 2002 tutkimus: **95 % teräskiskoista syöpyneitä**, kansi
   50-prosenttisesti rappeutunut. Sortumavaaran takia laituri
   **suljettiin 28. joulukuuta 2000**. Kunnostus alkoi **toukokuussa
   2013** ja **2 036 neliömetrin** kävelypaikka vihittiin **21.
   toukokuuta 2015**. Yhdessä **Muelle Miraflores** -laiturin (1881,
   Nitrate Agencies, nykyään purjehdusseuran) kanssa se on ainoa
   Antofagastaan jäänyt salpietariajan laituri.
2. **Museo de Antofagasta** (es): näyttely on **entisessä
   tullitalossa**, jonka valparaísolainen Wetmare & Cía. suunnitteli ja
   rakensi **1867** 3 000 pesolla. **1869** rakennus kuljetettiin meritse
   **Mejillonesiin** ja pystytettiin siellä Chilen intendentuuriksi
   vuoden 1866 rajasopimuksen nojalla. Se palveli siellä **1869–1888**,
   kunnes Chilen valtio siirsi sen Antofagastaan **1885 palaneen
   Bolivian tullitalon** paikalle. Tullina se toimi **vuoteen 1966**.
   **Kansallinen historiallinen monumentti 20. lokakuuta 1972.**
   Museo perustettiin Universidad del Nortelle **1964** ja avattiin
   nykymuodossaan **14. joulukuuta 1984**. Rakennus on kaksikerroksinen
   U-pohjainen oregoninmäntytalo, jossa on avoin etukäytävä ja
   kaksihaarainen ulkoportaikko; **tähystystorni purettiin 1940**
   huonokuntoisena. Kokoelmassa on noin **10 000 esinettä**, ja museossa
   on **kaksitoista salia** ja auditorio. Laboratoriot ja kokoelmavarasto
   ovat entisessä **Gobernación Marítimassa** (1910, monumentti
   12.9.1978).
3. **Edificio del Banco Mercantil de Bolivia** (es): **viktoriaaninen**
   rakennus historiallisessa korttelissa, rakennettu **1913**
   bolivialaisen kaivosyrittäjän **Simón I. Patiñon** — aikanaan
   "tinakuninkaan" — varoilla suojaamaan Bolivian yrittäjien pääomaa
   Tyynenmeren rannalla. Myöhemmin osa Hotel Belmontia, sitten vuosia
   suljettuna. **Monumentti 1991.** Vuodesta 2003 rikostutkintapoliisin
   käytössä; entisöinti valmistui **2007** (1 070,35 m² alkuperäistä ja
   1 797,24 m² uutta). Julkisivussa on räystäslistojen ja pilasterien
   vuorottelu, ikkunoiden symmetria ja **kaksikerroksinen erkkeri**;
   **kaksi kupolia kummassakin kulmassa**. Kupolien linjaus on
   merenkulullinen: ne osoittivat aikanaan merenkulkijoille turvallisen
   suunnan matalikon ja rantatyrskyn ohi yhdessä Cerro El Anclan kanssa.
4. **Plaza Colón** (es): kaupungin pääaukio, kortteli keskustassa
   muutaman korttelin päässä rannasta. **Vuoden 1869 asemakaavassa**
   paikka oli jo merkitty aukioksi; silloin se oli vain joutomaata,
   jossa kohosi kalliokohoumia, ja sitä reunustivat seurakuntakirkko,
   poliisikasarmi vankiloineen ja kunnan koulu. **Vuonna 1873**
   Cobijan prefektin vierailun vuoksi kunnanhallitus pani vangit
   poistamaan kalliot ja tasoittamaan maan; naapureiden avustuksilla
   syntyi keskuspuutarha, jota kasteltiin **1874** asennetulla pumpulla.
   **1875** Valparaíson intendentti **Francisco Echaurren** lahjoitti
   35 puuta ja suihkulähteen; 1870-luvulla aukion ympärille tuli aita
   ja neljä pyöröporttia estämään eläimiä. **27. elokuuta 1880**
   kuvernööri Luis García Reyes muutti nimen **Plaza Emilio
   Sotomayoriksi**, ja nimi palautettiin **12. lokakuuta 1892**
   Amerikan löytämisen neljännellä satavuotisjuhlalla.
   **Kolme muistomerkkiä ovat kaikki ulkomaisten siirtokuntien
   lahjoja Chilen tasavallan satavuotisjuhlaan:**
   - **Torre Reloj**, brittiläisen siirtokunnan lahja, vihittiin
     **17. syyskuuta 1911** ja julistettiin kansalliseksi
     historialliseksi monumentiksi **18. huhtikuuta 1986**. Kellon osat
     kokosi **Raymundo Allende**, FCAB-rautatieyhtiön työntekijä.
     Vaikka tornia pidetään kansanomaisesti **Big Benin jäljennöksenä,
     yhtäläisyys on vain äänessä**. Materiaalia saapui alun perin
     paljon korkeampaan torniin, mutta **ajan lait kielsivät mitään
     rakennusta ylittämästä kaupungin katedraalia**, joten ylijäänyt
     aines käytettiin rakennukseen, jossa nykyään toimii
     rikostutkintapoliisi Washington-kadulla.
   - **Kiosco de Retreta**, kroatialaisen siirtokunnan lahja, vihittiin
     **26. maaliskuuta 1911**, monumentti **30. elokuuta 1995**. Kioskin
     kyljessä on muistolaatta **José Papicille**.
   - **Estatua a España y América**, espanjalaisen siirtokunnan lahja;
     Enrique Granada ja Zacarías Gómez saivat tehtäväkseen pystyttää
     sen ja valitsivat arkkitehdiksi **Jaime Pedrenyn**. Ylhäällä on
     kaksi naishahmoa, Espanja ja Amerikka; kokonaisuutta täydentävät
     **kondori Chilen vaakunan kanssa ja leijona Espanjan vaakunan
     kanssa**.
   - Aukion ympärillä: lounaassa kävelykatu Arturo Prat, kaakossa
     General José de San Martín, koillisessa Antonio José de Sucre ja
     luoteessa George Washington. Prat-kadulla on aluehallinnon talo
     (1963), Sucrella kaupunginteatteri, Washingtonilla aluekirjasto ja
     San Martínilla katedraali. Aukio suljettiin syyskuussa 1994
     kunnostusta varten ja luovutettiin takaisin **29. huhtikuuta
     1996**; neljä suihkualtaita rakennettiin neljään ilmansuuntaan,
     ja varjoa varten istutettiin **bougainvilleoita ja muita
     köynnöksiä**.
5. **Casa Gibbs** (es): **eklektinen rakennus**, jonka nimi tulee
   englantilaisesta **William Gibbs & Co.** -yhtiöstä. Vuonna 1868 José
   Santos Ossa ja Francisco Puelma neuvottelivat puolet
   salpietarialueistaan brittiläiselle yhtiölle; **siirto tehtiin
   1. maaliskuuta 1869 Valparaísossa**. **19. maaliskuuta 1869**
   perustettiin *Melbourne Clark & Co.*, jonka osakkaita olivat
   Puelma, Ossa, George Smith, Melbourne Clark, Agustín Edwards ja
   William Gibbs; **5. syyskuuta 1869** yhtiö sai Bolivialta
   viidentoista vuoden jatkon. **Vuonna 1872** se hankki oikeuden
   rakentaa rautatien Antofagastasta Salinasiin ja muuttui **Compañía
   de Salitres y Ferrocarril de Antofagastaksi**. Itse talo
   rakennettiin **1915**, eikä sen rakentamisesta tiedetä enempää.
   Talo on Manuel Baquedano 108:ssa Balmaceda-kadun ja FCAB:n radan
   välissä, ja sitä ympäröi **Plaza del Salitre** eli salpietariaukio,
   jolla on Caterina Osorion ja Mario Calderónin veistos *El Aguador*
   ("vedenkantaja"). Viereen valmistui **29. elokuuta 2008** taiteilija
   **Luis Núñezin** muraali "rautatieasema ja Antofagastan historian
   merkkihenkilöt", jossa esiintyvät muun muassa Lenka Franulic, Chela
   Lira, Antonio Rendic, Andrés Sabella ja José Santos Ossa.
6. **Teatro Municipal de Antofagasta** (es): Plaza Colónin
   koilliskulmassa. Suunnitelma voitti kansallisen kilpailun
   **31. tammikuuta 1963** (arkkitehdit Vicente Bruna, Iván Godoy,
   Alberto Sartori, Sergio Seguel ja Germán Wijnant), ja alkuperäinen
   ohjelma oli paljon suurempi: **1 500 hengen teatteri, 500 hengen
   kamariteatteri**, kaupungintalo, kirjasto ja taidesali 12 000
   neliömetrin tontilla. Työt alkoivat **1966**, keskeytyivät varojen
   puutteessa 1970-luvun alussa ja käynnistyivät uudelleen **1975**.
   Teatteri vihittiin **11. syyskuuta 1981** vain osittain
   rakennettuna: kaksi suorakaiteista rakennetta ja niiden välissä
   puolikovera keskusosa, kaikki teräsbetonia; ulkoreunoja kiertävät
   **L:n muotoiset parvekkeet**. Ensimmäiset **899 istuinta hankittiin
   yleisellä keräyksellä**, jonka pani alulle sanomalehti *El Mercurio
   de Antofagasta*. Salissa on nykyään **867 paikkaa** (permanto 560,
   parvi 307). Talossa on vuodesta 1976 yleinen kirjasto n:o 120 **Isaac
   Arce Ramírez** ja lehtiarkisto. Teatteri on **Antofagastan
   sinfoniaorkesterin** koti; orkesteri perustettiin **2. marraskuuta
   1962** Rafael Ramosin johdolla. Yläosassa on **Luis Núñez San
   Martínin ja neljän avustajan muraali**, joka esittää seudun
   alkuperäiskansojen kasvoja sekä salpietarin nousun ja tuhon;
   **yli 1 200 neliömetriä**, viisi kuukautta työtä, vihittiin
   **24. huhtikuuta 2014**. Vuonna 2013 teatterissa kävi yli 70 000
   ihmistä 150 tilaisuudessa.
7. **Catedral de Antofagasta** (es + en "St. Joseph's Cathedral,
   Antofagasta"): **uusgoottilainen**, Plaza Colónin laidalla San
   Martín -kadun puolella; omistettu **Pyhälle Joosefille**.
   Ensimmäinen versio **1872** oli karkeista laakeripuulaudoista, ja
   kellotapulina oli **neljästä viiteen metriä korkea tolppa, jossa
   riippui kaksi pientä kelloa ja teräskolmio**; se paloi **joulukuussa
   1880**. Tilalle tuli puinen, puolikupolikattoinen rakennus, josta
   nousi korkea torni; koristeellisempi malli korvasi sen 1880-luvun
   loppupuoliskolla ja **paloi 15. marraskuuta 1906**. Peruskivi
   laskettiin **täsmälleen vuosi palon jälkeen, 15. marraskuuta 1907**.
   Nykyisen työn teki arkkitehti **Emilio Doyère**; symbolinen vihkiäinen
   oli **1914** ja rakennus valmistui **17. syyskuuta 1917**.
   **31. heinäkuuta 1995 maanjäristyksen** takia rakennus kunnostettiin
   perusteellisesti vuosina **1998–1999**. Sisällä ovat **lasimaalaukset
   ja alttari**.
8. **Casa Giménez** (es): **uusmauriainen** (neomudéjar) rakennus,
   jonka piirsi sevillalainen arkkitehti **José Espiau y Muñoz** ja
   rakensi katalonialainen **Jaime Pedreny**. Espanjalaiset kauppiaat
   Ismael Giménez ja Enrique Longueira avasivat **1915** yhdessä
   tekstiilikaupan *La Camelia*; yhtiön purkauduttua Giménez päätti
   rakentaa uuden liikkeen Matta- ja Baquedano-katujen kulmaan. Giménez
   ja hänen vaimonsa María del Valle matkustivat Sevillaan, jossa
   Giménez tutustui Espiau y Muñozin **Ciudad de Londres**
   -rakennukseen ja päätti perustaa oman talonsa sen malliin; hän
   tilasi piirustukset ja toi mukanaan rakennusmateriaaleja. **Casa
   Giménez on todennäköisesti sevillalaisarkkitehdin ainoa työ
   Latinalaisessa Amerikassa**, ja vuoden 1984 näyttelyluettelossa se
   oli merkitty kadonneeksi teokseksi. Työt alkoivat **19. toukokuuta
   1923**, ja *Almacenes Giménez* avattiin **joulukuussa 1924**.
   Materiaaleina **ruotsalaista sementtiä, sevillalaisia kuvioituja
   laattoja, taottuja ristikoita ja ritilöitä, eurooppalaista lasia ja
   chileläistä puuta**; se oli **Pohjois-Chilen ensimmäinen rakennus,
   jossa oli hissi**. Avajaisissa neljä viidestä kerroksesta oli
   liikekäytössä ja viides perheen asuntona; viidennen kerroksen
   seinillä on iquiquelaisen **Sixto Rojas Acostan** muraaleja
   sevillalaisista maisemista. Salpietarikauden loppu ja lama veivät
   kaupan konkurssiin, mutta se avattiin uudelleen; toiminta loppui
   1980-luvulla. **Kaupunkiperintökohde (ICH) 17. heinäkuuta 2002.**

## 6. Matkaoppaan aineisto

- Väkiluku **401 096** (vuoden 2024 laskenta), **Chilen viidenneksi
  suurin kaupunki**; noin **1 100 km Santiagosta pohjoiseen**.
  Kaupungin keskikorkeus **40 m**, ja kunta on pinta-alaltaan
  **30 718,1 km²** eli Chilen kolmanneksi suurin. (en "Antofagasta")
- Maahanmuuttajia **19,1 %** väestöstä (2024), näistä 18,8 %
  Etelä-Amerikasta. (sama)
- Talous nojaa **kuparin** ja ei-metallisten mineraalien (nitraatti,
  jodi) kaivostoimintaan; alue tuottaa **54 % Chilen kuparista**.
  2010-luvulta alkaen kaupunki on myös **litiumin** solmukohta: Chilellä
  on maailman suurimmat litiumvarat ja se oli 2024 toiseksi suurin
  tuottaja Australian jälkeen. Antofagastan satama välittää **2,0 %
  Chilen ulkomaankaupan vuosittaisesta tonnimäärästä** (2024).
  Antofagastassa on **Chilen korkein bruttokansantuote asukasta kohti**
  (2012, 37 000 dollaria). (en "Antofagasta", Economy)
- **FCAB** (Ferrocarril de Antofagasta a Bolivia) perustettiin **1888**
  salpietarikauden nousun aikana; **1930** sen osti Antofagasta PLC.
  Toisin kuin muut aikansa kaivosradat, FCAB **selvisi luonnonnitraatin
  romahduksesta**; verkkoa on **900 kilometriä**, raideleveys 1 000 mm,
  ja se on yhteydessä Bolivian, Ferronorin ja Argentiinan Belgrano-radan
  verkkoihin (**Salta–Antofagasta-rata**). (en "Antofagasta", Railways)
  *Rata mainitaan vain matkaoppaassa — karttanosto omistaa aiheen.*
- Julkinen liikenne on **TransAntofagasta**: kolmetoista alle
  kolmenkymmenen hengen pikkubussilinjaa; järjestelmä alkoi virallisesti
  **28. marraskuuta 2005**. Reitit päättyvät Caleta Colosoon kaupungin
  eteläkärjessä, ja kesällä ne jatkuvat Juan Lópezin uimarannalle asti.
  Kevyempi liikenne on **mustia sedan-takseja kiinteillä reiteillä**.
  (sama)
- Kaupunki on kapea ja pitkä, joten liikenne keskittyy pääväylille;
  ainoa pohjois–eteläsuunnassa läpi kulkeva on rantatie **Avenida
  Costanera**, joka koostuu peräkkäisistä nimistä (Jaime Guzmán,
  Ejército, República de Croacia, Grecia, Balmaceda, Aníbal Pinto,
  7º de Línea, Edmundo Pérez Zujovic). (sama)
- Lentoasema on **Andrés Sabella Gálvez** Cerro Morenossa kaupungin
  pohjoispuolella. (sama)
- Yliopistot: **Universidad Católica del Norte** (perustettu 1956) ja
  **Universidad de Antofagasta**. Kaupunki on yksi Chilen kolmen
  ympäristötuomioistuimen istuinpaikoista. (sama)
- **Kesäöiset uinnit**: voimakkaan auringonsäteilyn takia keinorannoilla
  on yleistynyt tapa uida keskiyön yli; **20. helmikuuta 2010**
  El Trocaderon rannalla ui yli 5 000 ihmistä. (es "Antofagasta",
  Turismo)
- **Kroatialainen jälki** näkyy kaupungissa: Avenida República de
  Croacia, Parque Croacia rantatiellä (noin **500 metriä pitkä**,
  uudelleen avattu 2017), kroatialainen kuoro Jadran ja Plaza Colónin
  kioski. Ystävyyskaupunkeja ovat muun muassa **Split** Kroatiassa ja
  **Volos** Kreikassa. (es "Parque Croacia"; en "Antofagasta",
  Twin towns)
- **Mano del Desierto** -veistos on **75 km etelään**; tekijä
  chileläinen kuvanveistäjä **Mario Irarrázabal**. (es "Antofagasta",
  Turismo)
- **Reserva Nacional La Chimba** on noin **10 km koilliseen**,
  **2 583 hehtaaria**, kansallinen suojelualue **13. heinäkuuta 1988**.
  (sama)

## 7. Mitä EI kerrota

- Ei nykypolitiikkaa: Bolivian nykyistä merivaatimusta, vuoden 2019
  levottomuuksia, katedraalin julkisivun tuhotöitä eikä
  vaaliasetelmia.
- Ei väkivallan yksityiskohtia: vuoden 1906 Plaza Colónin
  työtaistelun uhrilukua ei kerrota, eikä Huanchaca-kadun
  rikostapauksia (1969, 1978) käsitellä lainkaan.
- Ei diktatuurin aikaisia muistopaikkoja (Providencia, muistomerkki).
- Ei Atacamaa, Chuquicamataa, Humberstonea eikä Paranalia nostoiksi.
