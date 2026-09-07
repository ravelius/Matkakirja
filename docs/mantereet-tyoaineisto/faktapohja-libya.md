# Libya-maalehti (ISO-3: LBY) — lyhyt faktapohja

*Koonnut Opus-lehtiagentti 6.9.2026. Kaikki faktat haettu samana päivänä
en-Wikipedian raakatekstistä (`api.php?action=query&prop=extracts&
explaintext=1`, `NODE_USE_ENV_PROXY=1`, User-Agent
`Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`). Lyhyt
faktapohja: vain ne luvut, päiväykset ja nimet, jotka päätyivät
`js/packs/maa-kategoriat.js`:n LBY-lohkoon, sekä ristiriidat. Rakenteen
sitova lähde docs/moduulit/maalehti.md.*

Aiheet (5 × 4 nostoa): **Historia, Luonto, Tiede, Ruoka, Musiikki.**
Minitehtävä on Luonto-sivulla.

**Rajaus.** Libyassa on yksi kaupunkilehti (Tripoli), ja karttanostoja on
paljon, joten maalehti kiertää ne kaikki:

- `js/packs/kulttuuri-kategoriat.js` tripoli: vanhakaupunki ja Oea,
  Marcus Aureliuksen riemukaari, ottomaanien kellotorni, kuparisepät,
  ammattikujat, Karamanlin ja an-Naqan moskeijat, karavaanikauppa,
  Ghadamesin katetut kadut, USS Philadelphian poltto 1804 ja
  **bazin + libyalainen tee**; `js/packs/africa-kulttuuri.js` tripoli:
  **malouf, tee ja bazin** litteinä nostoina; `js/packs/nahtavyysjutut.js`
  Tripoli: seitsemän nähtävyysjuttua (mm. Punainen linna, Darghutin
  moskeija).
- `js/packs/maastokohteet-lby.js`: Bikku Bitti, Välimeri, Iso-Syrtti,
  Sabratha, Kyrene (myös silfium ja kyreneläinen koulu), Ptolemais,
  Ghadames, Tadrart Acacus, Garama ja garamanttien foggarat, Ubarin
  hiekkameri ja Mandaran järvet; `js/packs/fokuskohteet-lby.js`:
  Leptis Magna; `js/packs/skandaalit.js`: Italian ja osmanien sota
  1911–1912 (ensimmäinen ilmapommitus) ja Omar al-Mukhtar 1931;
  `js/packs/elaintakyt.js`: saharangaselli.

**Maalehti ei koske yhteenkään näistä.** Siksi historia alkaa vasta
siitä, mistä karttakortit loppuvat (nimi, tasavalta 1918, itsenäisyys
1951, öljy 1959), ruokasivulla ei ole bazinia eikä teetä, musiikkisivulla
ei maloufia, ja luontosivu jättää väliin Bikku Bittin, hiekkameret ja
gasellin. Nykypolitiikkaa ja käynnissä olevia selkkauksia ei käsitellä
(M3:n Myanmar-linja): kaikki historia päättyy 1960-luvulle, ja
Suuren keinojoen kohdalla kerrotaan tekniikka, ei sen rakennuttajaa.

## 1. Historia

- **Nimen matka** (en-Wikipedia "Libya", osio "Etymology"; osio
  "Italian colonisation and Allied occupation (1911–1951)"): nimi
  esiintyy ensi kerran **Ramses II:n piirtokirjoituksessa** muodossa
  **rbw**, ja se tarkoitti suurta itäisten libyalaisten berberiheimojen
  liittoa Kyrenaikan ja Marmarican seudulla. **"Libun suuret päälliköt"**
  ja **40 000 miehen** armeija kävivät kuningas **Meryeyn** johdolla
  sotaa faarao **Merneptahia** vastaan hänen **viidentenä
  hallitusvuotenaan (1208 eaa.)**; tappio on kirjattu **Karnakin suureen
  piirtokirjoitukseen**. Nimen otti uudelleen käyttöön italialainen
  maantieteilijä **Federico Minutilli 1903** korvaamaan nimitystä
  osmanien Tripolitania. **Vuonna 1934 Italia yhdisti Kyrenaikan,
  Tripolitanian ja Fezzanin** ja otti yhdistetylle siirtomaalle nimen
  **Libya**, jota **antiikin kreikkalaiset olivat käyttäneet koko
  Pohjois-Afrikasta Egyptiä lukuun ottamatta**; pääkaupungiksi tuli
  Tripoli. *(Sama artikkeli kertoo, että 1912–1927 alue oli "Italian
  Pohjois-Afrikka" ja 1927–1934 kaksi erillistä siirtomaata.)*
- **Tripolitanian tasavalta** (en-Wikipedia "Tripolitanian Republic",
  johdanto sekä osiot "Independence" ja "Dissolution and
  re-establishment"; en-Wikipedia "ʽAziziya", johdanto): tasavalta
  julistettiin **syksyllä 1918** ja itsenäisyys muodollisesti
  **Pariisin rauhankonferenssissa 1919**. Pääkaupunki oli **'Aziziyan
  pikkukaupunki 40 km Tripolista etelään**, ja alue ulottui
  laajimmillaan **Nafusa-vuorilta Misrataan**. Hallitsijana oli
  **neljän miehen neuvosto** — **Sulayman al-Baruni, Ramadan Asswehly,
  Abdul Nabi Belkheir ja Ahmad Almarid** — jotka toimivat toisistaan
  riippumatta, sekä **24 päällikön neuvoa-antava neuvosto**. Se oli
  **ensimmäinen muodollisesti julistettu tasavaltalainen hallitusmuoto
  Libyassa ja koko arabimaailmassa**, mutta se ei saanut kansainvälistä
  tunnustusta. Italian **1.6.1919 julkaisema siirtomaasääntö** lupasi
  Tripolitanian asukkaille Italian kansalaisuuden, islamilaisen lain
  siviilioikeutena ja kymmenhenkisen neuvoston, josta kahdeksan
  valittaisiin vaaleilla; tasavalta purettiin **12. heinäkuuta 1919**,
  mutta kun vaaleja ei marraskuuhun mennessä ollut pidetty, se
  perustettiin uudelleen **Misratassa**. **Vuonna 1920** miehitetyn ja
  vapaan alueen edustajat kokoontuivat 'Aziziyaan kansalliskongressiin.
  *(Artikkeli sanoo pääkaupungin sijaitsevan 40 km:n päässä, ʽAziziyan
  oma artikkeli 41 km:n päässä — lehteen on kirjoitettu "noin
  neljäkymmentä kilometriä".)*
- **Kuningaskunta, jonka YK sääti** (en-Wikipedia "Libya", osio
  "Independent Kingdom (1951–1969)"; en-Wikipedia "Kingdom of Libya",
  osiot "Constitution", "Political development" ja "Development of the
  nation"): **YK:n yleiskokous päätti 21.11.1949**, että Libyan on
  tultava itsenäiseksi **ennen 1.1.1952**. **Perustuslaki laadittiin
  lokakuussa 1951 YK:n suojissa**, ja **24.12.1951** maa julistautui
  itsenäiseksi **Libyan yhdistyneenä kuningaskuntana**; **Idris I
  puhui kansalle radiosta Bengasista**. Liittovaltiossa oli **kolme
  maakuntaa**, senaatissa **kahdeksan edustajaa kustakin**, ja
  **Tripoli ja Bengasi olivat vuorotellen pääkaupunkeja kahden vuoden
  jaksoissa** Kyrenaikan ja Tripolitanian kilpailun tasaamiseksi.
  Uuden valtion vientituotteita olivat **vuodat, villa, hevoset ja
  strutsinsulat**, ja sillä oli **maailman alhaisimpia
  henkeä kohti laskettuja tuloja** ja korkeimpia lukutaidottomuuslukuja.
  **Libyan yliopisto perustettiin 1955 kuninkaan asetuksella
  Bengasiin.** **Huhtikuussa 1963** liittovaltiorakenne purettiin,
  maakuntien tilalle tuli **kymmenen lääniä**, ja saman vuoden
  **25. huhtikuuta** naiset saivat äänioikeuden.
- **Öljy** (en-Wikipedia "Kingdom of Libya", osio "Development of the
  nation"; en-Wikipedia "Economy of Libya", osiot "Macroeconomic
  trends" ja "Oil sector"): **1956** Libya myönsi kahdelle
  yhdysvaltalaiselle öljy-yhtiölle **noin 5,7 miljoonan hehtaarin**
  etsintäluvan. **Kesäkuussa 1959** **Esson** (myöhemmin Exxon)
  tutkijat varmistivat suuret esiintymät **Zaltanissa Kyrenaikassa**;
  luvanhaltijat palauttivat **puolet voitoistaan** Libyan valtiolle
  veroina. Libyan öljyn etuja olivat määrän lisäksi **raakaöljyn
  korkea laatu** ja **meriyhteys Eurooppaan**. Henkeä kohti laskettu
  BKT oli **noin 40 dollaria 1920-luvun alussa** ja **1 018 dollaria
  1967**. **Sirtin altaassa** on **noin 80 % maan todetuista
  öljyvaroista ja 90 % tuotannosta**. *(Kentän nimi kirjoitetaan
  lähteissä sekä Zaltan että Zelten; lehdessä on artikkelin muoto
  Zaltan.)*

## 2. Luonto

- **Waw an Namus** (en-Wikipedia "Waw an Namus", johdanto sekä osiot
  "Name", "Geography and geomorphology", "Lakes", "Eruptive history" ja
  "Biology"): tulivuori **itäisessä Fezzanissa** keskellä Saharaa. Nimi
  tarkoittaa **"hyttysten keidasta"** kraatterin järvien ja niiden
  ruokkimien hyttysparvien mukaan. **Kaldera on 4 km leveä ja 100 m
  syvä**, ja sen sisällä on **140 m korkea ja 1,3 km leveä
  kuonakartio**. Tumma **tefra peittää noin 300 neliökilometriä** ja
  erottuu vaaleasta aavikosta **jopa satelliittikuvissa**; pasaatit
  ovat kuljettaneet sitä **yli 100 km lounaaseen**. Kalderassa on
  **kolme pientä järveä** (yhteensä **0,3 km²**, syvimmillään
  **15–16 m**), joista osa on punaisia ja osa suolaisia ja lämpimiä;
  vesi on **pohjaveden ruokkimaa** ja isotooppien mukaan **alle
  8 000 vuotta vanhaa**. Järvien ympärillä kasvaa **jopa neljä metriä
  korkeaa ruokoa**, akasioita, taatelipalmuja ja tamariskeja, ja
  linnustoon kuuluu **lapasorsia, tavia, harmaasorsia, nokikanoja ja
  liejukanoja**. Paikka on **asumaton**, mutta sieltä on löydetty
  **vanhoja hautoja**, ja **Kufran ja Sebhan välinen karavaanireitti**
  kulkee vuoren ohi. *(Iästä on ristiriita: kalium-argon-ajoitus antaa
  200 000 ± 9 000 vuotta ja Global Volcanism Program pleistoseenin,
  mutta kuonakartio voi olla vain muutaman tuhannen vuoden ikäinen —
  lehteen on kirjoitettu ristiriita, ei valittua lukua.)*
- **Jebel Akhdar eli Vihreä vuori** (en-Wikipedia "Jebel Akhdar
  (Libya)", osiot "Geography" ja "Flora"): metsäinen ylätasanko
  **Koillis-Libyassa**, korkeimmillaan **900 m**, ja se reunustaa
  rannikkoa **noin 330 km** Bengasista Dernan itäpuolelle. Alue on
  **Libyan sateisin: noin 600 mm vuodessa**, ja se on yksi harvoista
  metsäisistä seuduista maassa, joka on **maailman vähämetsäisimpiä**.
  Metsää on **noin 3 200 km²**, ja **noin kolmasosa alkuperäisestä on
  raivattu pelloiksi**. Makia-kasvillisuudessa kasvavat
  **fenikiankataja, mastiksipistaasi, kermesrautatammi ja johanneksen-
  leipäpuu**. **Yli puolet Libyan kotoperäisistä kasvilajeista** kasvaa
  Jebel Akhdarissa, ja **seitsemän niistä ei kasva missään muualla**
  (mm. **Arbutus pavarii** ja **Cyclamen rohlfsianum**). Kreikkalaiset
  toivat seudulle maanviljelyn **noin 600 eaa.**
- **Rannikko** (en-Wikipedia "Wildlife of Libya", johdanto sekä osiot
  "Laws for regulation", "Geography", "National parks", "Birds" ja
  "Marine life"): rantaviivaa on **lähes 2 000 km**, ja maasta on
  kirjattu **87 nisäkäslajia ja 338 lintulajia**. Rannikko ja meri ovat
  **valeunikilpikonnan (Caretta caretta) pesimäaluetta**, ja **munkkihylje (Monachus monachus)** on luokiteltu
  **äärimmäisen uhanalaiseksi**. Kansallispuistoja on **seitsemän**;
  **El-Kouf perustettiin 1975** (35 000 ha, rantaviivaa 20 km) ja
  **Karabolli 1992** (8 000 ha), ja jälkimmäinen nimettiin samana
  vuonna **lintujen suojelualueeksi, jolla on sata lajia**. **Ramsarin
  sopimuksen kosteikkoja on kaksi**, Ain Elshakika ja Ain Elzarga,
  molemmat merkitty **5.4.2000**. Rannikolla nähdään **flamingoja,
  mustajalkatyllejä, kraaseja ja kattohaikaroita**.
  *(Suomenkielinen laji-nimi: Caretta caretta = valeunikilpikonna.)*
- **Ghibli eli sirokko** (en-Wikipedia "Sirocco", johdanto sekä osiot
  "Names" ja "Effects"): Saharasta puhaltava Välimeren tuuli, joka voi
  **Pohjois-Afrikassa ja Etelä-Euroopassa yltää hirmumyrskyn
  nopeuksiin**. Libyanarabiaksi se on **qibliyy**, "qiblan suunnasta
  tuleva". Tuuli **kuivattaa ja pölyttää Afrikan pohjoisrannikon**,
  nostaa myrskyjä Välimerelle ja kerää mennessään kosteutta, mistä
  syntyy Etelä-Italiassa **"veresade"** — sade, jonka punaisen värin
  tekee mukaan tarttunut hiekka. **Jopa 100 km/h** puhaltavat sirokot
  ovat tavallisimpia syksyllä ja keväällä ja **huipussaan maaliskuussa
  ja marraskuussa**. Nousuveden kanssa yhtyessään sirokko aiheuttaa
  **Venetsian laguunin acqua altan**. Pöly hankaa koneita ja tunkeutuu
  rakennuksiin.

## 3. Tiede

- **Eratosthenes** (en-Wikipedia "Eratosthenes", johdanto, osiot "Life"
  ja "Measurement of Earth's circumference"): syntyi **276 eaa.
  Kyrenessä** (nykyistä Libyaa), oli **Aglaoksen poika** ja nousi
  **Aleksandrian kirjaston pääkirjastonhoitajaksi**. Hän **loi sanat
  maantiede ja maantieteilijä**, laski ensimmäisenä **maapallon
  ympärysmitan** ja **maan akselikallistuman**, kokosi ensimmäisen
  **pituus- ja leveyspiirein varustetun maailmankartan** ja keksi
  **Eratostheneen seulan** alkulukujen etsimiseen. Ihailijat kutsuivat
  häntä **Pentathlokseksi** (moniottelija), arvostelijat
  **Beetaksi** (kakkoseksi), koska hän ei ollut ensimmäinen missään
  yksittäisessä lajissa. Ympärysmitan mittaus: **kesäpäivänseisauksen
  keskipäivänä Syenessä (nykyinen Assuan) sauva ei heittänyt varjoa,
  Aleksandriassa heitti**; **varjon kulma oli noin 7,2 astetta eli
  yksi viideskymmenesosa ympyrästä**, ja kun **ammattimaiset
  askelmittaajat (bematistai)** olivat mitanneet kaupunkien väliksi
  **5 000 stadionia**, hän kertoi luvun viidelläkymmenellä ja sai
  **250 000 stadionia**. Kuoli noin **196 eaa. Aleksandriassa
  80-vuotiaana**; hautakirjoitus valittaa, ettei **äiti Kyrene**
  saanut häntä isiensä hautoihin.
- **ʽAziziyan lämpöennätys** (en-Wikipedia "ʽAziziya", johdanto ja
  osio "Geography and climate"): **13.9.1922** kirjattiin **58,0 °C**,
  ja lukemaa pidettiin pitkään **maapallon korkeimpana mitattuna
  lämpötilana**. **13.9.2012 — päivälleen 90 vuotta myöhemmin —**
  Maailman ilmatieteen järjestö **WMO** julisti sen pätemättömäksi
  tutkinnan jälkeen. Syitä oli kolme: sääasema oli **siirretty 1919
  kukkulalinnakkeeseen mustan asfaltin päälle**, mikä selittää vuosien
  **1919–1928** kuumat lukemat; aseman **maksimilämpömittari oli
  rikkoutunut** ja korvattu **kalibroimattomalla kasvihuonemittarilla**;
  ja **11.9.1922 alkaen** kirjaajana oli **kokematon havainnoija**,
  minkä näkee käsialan vaihtumisesta ja siitä, että maksimi ja minimi
  on kirjattu **vääriin sarakkeisiin**. WMO:n mukaan havainnoija luki
  **mittarin väripylvästä väärästä päästä**, jolloin lukema oli
  **7–8 astetta liian korkea**. Maailmanennätys on nyt **56,7 °C**,
  mitattu **10.7.1913 Death Valleyssä** Kaliforniassa.
- **Fossiilinen vesi** (en-Wikipedia "Nubian Sandstone Aquifer System",
  johdanto, osiot "Characteristics"/"Geology" ja "International
  development projects"; en-Wikipedia "Great Man-Made River", osio
  "History"): Nubian hiekkakiven pohjavesialue on **maailman suurin
  tunnettu fossiilisen veden esiintymä**. Se ulottuu **runsaan kahden
  miljoonan neliökilometrin** alalle **neljän maan** — Sudanin,
  Tšadin, Libyan ja Egyptin — alle, ja siinä arvioidaan olevan
  **150 000 km³ pohjavettä**. Vesi on **sadevettä**, ja isotooppityö
  (Reika Yokochi ym.) osoittaa kaksi täydentymisjaksoa: **38 000
  vuotta sitten Välimereltä** ja **noin 361 000 vuotta sitten
  trooppiselta Atlantilta**. Nykyisin vettä ei täydennä mikään.
  **Suuri keinojoki ottaa esiintymästä noin 2,4 km³ vuodessa.**
  Vesi löytyi **1953**, kun Etelä-Libyassa etsittiin öljyä.
  **IAEA on vuodesta 2006 vetänyt neljän maan yhteistä
  Nubian-hanketta** (UNDP/GEF, Unesco) esiintymän hallitsemiseksi.
- **Suuri keinojoki** (en-Wikipedia "Great Man-Made River", johdanto,
  osiot "History" ja "Timeline"): putkiverkko, joka vie fossiilista
  pohjavettä Etelä-Libyasta rannikon kaupunkeihin — **maailman suurin
  kastelujärjestelmä**. Vesi kulkee **jopa 1 600 km** ja kattaa
  **70 % kaikesta Libyassa käytetystä makeasta vedestä**. Hankkeen
  omien tietojen mukaan verkko on **maailman suurin maanalainen
  putkisto: 2 820 km**, ja siihen kuuluu **yli 1 300 kaivoa**, joista
  useimmat ovat **yli 500 m syviä**. Vettä siirtyy **6,5 miljoonaa
  kuutiometriä vuorokaudessa** Tripoliin, Bengasiin, Sirteen ja
  muualle. **Työ alkoi 1984**; ensimmäisen vaiheen kaivuu vaati
  **85 miljoonaa kuutiometriä maansiirtoa**, ja se vihittiin
  **28.8.1991**. Toinen vaihe eli **"ensimmäinen vesi Tripoliin"**
  vihittiin **1.9.1996**. Kokonaiskustannus oli arviolta **yli
  25 miljardia dollaria**, **noin kymmenesosa vastaavan
  suolanpoistolaitoksen hinnasta**. *(Aikajanassa vesi saapui
  Tripoliin 28.8.1996, tekstiosassa vaihe vihittiin 1.9.1996 —
  lehdessä puhutaan vuodesta.)*

## 4. Ruoka

- **Asida ja rub** (en-Wikipedia "Asida", johdanto sekä osiot
  "History", "Etymology" ja "Variations/Libya"; en-Wikipedia "Libyan
  cuisine", osio "Desserts"): vehnäjauhoista kiehuvaan veteen
  sekoitettu **taikinakumpu**, jota syödään ympäri arabimaailmaa.
  Nimi tulee juuresta **ʿ-ṣ-d**, joka merkitsee **kiertämistä ja
  vaivaamista**. Vanhin tunnettu ohje on **900-luvun keittokirjassa**,
  **Ibn Sayyar al-Warraqin "Kitab al-Tabikhissa"**, jossa se on
  **taateleista ja kirkastetusta voista (samn) keitetty paksu vanukas**;
  ohje on myös **1200-luvun andalusialaisessa keittokirjassa**, ja
  **Leo Africanus** (n. 1465–1550) kirjasi version, jossa on
  **arganöljyä**. **Libyalainen asida tarjoillaan taatelisiirapin tai
  johanneksenleipäpuun siirapin (rub) kanssa** ja sulatetun voin
  ympäröimänä. Sitä syödään **Mawlidina ja idinä**, lapsen syntymän
  jälkeisessä **aqiqassa** eli seitsemäntenä päivänä pidettävässä
  hiustenleikkuujuhlassa, ja **synnyttäville naisille**.
- **Gideed, bourdeem ja shwaya** (en-Wikipedia "Libyan cuisine",
  johdanto ja osio "Meat and poultry"): **lammas ja lampaanliha ovat
  maan syödyimmät lihat**, ja **kamelia syödään etelässä**.
  **Gideed** on ikivanhalla tavalla säilöttyä lihaa: lampaan- tai
  kamelinlihapalat **suolataan, kuivataan auringossa ja säilytetään
  oliiviöljyssä**; sitä lisätään keittoihin, kuskusiin ja patoihin
  **kylminä kuukausina tai kun tuoretta lihaa ei ole**.
  **Bourdeem**issa lammas kypsyy hitaasti **maahan kaivetussa
  kuopassa, joka on vuorattu hehkuvilla hiilillä**, sipulien,
  tomaattien ja perunoiden kanssa; tapa antaa savuisen maun ja
  hajoavan mureaa lihaa ja on **idin (Eid al-Adha) ruokaa**.
  **Shwaya** tarkoittaa grillaamista — vartaassa tai pienen avogrillin
  päällä — ja sekin kuuluu erityisesti idiin. Etelässä ateriat nojaavat
  **kuivattuun lihaan, hapatettuun maitoon, ohraan ja palkokasveihin**.
- **Khobz mallah** (en-Wikipedia "Libyan cuisine", osio "Breads"):
  aavikon ja beduiinialueiden leipä, joka **paistetaan kuuman hiekan
  alla** ja tunnetaan myös nimellä **khobza jamar**. Tapa on
  yleinen arabimaiden aavikkoseuduilla ja **juontaa juurensa
  ajanlaskun ensimmäisille vuosisadoille**; Libyassa se on erityisen
  tavallinen **Sebhassa ja Sirtessä**. Tavallisin leipä muualla maassa
  on **savisessa tannour-uunissa kuivilla oliivipuun haloilla
  paistettu tannour-leipä**, ja sen rinnalla syödään **eish fino
  -patonkeja**, litteää **mafrudia**, ohutta happamatonta **raqaqia**
  ja pannulla paistettua **tawehia**.
- **Arjen ja juhlan pöytä** (en-Wikipedia "Libyan cuisine", johdanto
  sekä osiot "Ingredients", "Main dishes", "Appetizers, light dishes,
  and salads" ja "Beverages"): **shorba** on lampaan- ja
  vihanneskeitto, jossa on **minttua ja tomaattisosetta**; **bureek**
  on täytetty käännös, **ejja** perunasta, tomaatista, chilistä ja
  yrteistä tehty munakas, joka tarjoillaan **iftar-pöydässä**
  liesipannulla paistetun **ftat**-leivän kanssa, ja **fasoulia**
  papupata tomaattikastikkeessa. **Säilyketonnikala** on
  **koululounaiden perusta** ja maan saavutettavimpia proteiineja.
  Mausteina ovat **harissa** (chili, valkosipuli, kumina, juustokumina)
  ja sekoitukset **bzarr** (korianteri, kumina, valkosipuli, kurkuma,
  inkivääri, chili) ja **bokharat** (mm. pippuri, paprika, neilikka,
  muskotti, kaneli, kardemumma). **Qamar al-Din**, kuivatusta
  aprikoosimassasta sekoitettu juoma, kuuluu **ramadaniin**.

## 5. Musiikki

- **Zukra ja huda** (en-Wikipedia "Zukra", johdanto; en-Wikipedia
  "Music of Libya", johdanto): **zukra** on libyalainen säkkipilli,
  jossa on **kaksoisputki ja kaksi lehmänsarvea päissä**; se on
  **rakenteeltaan alkuperäisempi kuin tunisialainen mizwad**.
  **Etelässä ja lännessä sitä soitetaan säkin kanssa, idässä suoraan
  suulla ilman säkkiä** kaksoisklarinetin tapaan. Soitin kuuluu
  **juhliin, häihin ja hautajaisiin**. Muita soittimia ovat
  **bambuhuilu, tamburiini, oud ja darbuka**, ja **monimutkainen
  taputus** on kansanmusiikin oma soitin. Beduiinien kiertävät
  runolaulajat ovat levittäneet lauluja ympäri maata; yksi tyyleistä on
  **huda, kamelinajajan laulu, jonka rytmin sanotaan matkivan kävelevän
  kamelin askelia**. Naisten **kimeä liverrys (ululaatio)** kuuluu
  juhliin.
- **Zamzamat** (en-Wikipedia "Music of Libya", osio "Zamzamat"):
  naisten lauluperinne, joka liitetään **Tripoliin** ja jonka
  syntyhetkeksi arvioidaan **noin 1919**, jolloin sillä juhlittiin
  erään ministerin paluuta. Laulajatar **Kamila Al-Makhla ja hänen
  sokea sisarensa** säilyttivät lauluja, joita **malouf-mestarit olivat
  esittäneet muun muassa Khouja-hotellissa**. Esitys on **yksinomaan
  naisten**: kuoro laulaa **duff-kehärumpujen** säestyksellä ja
  **improvisoi säkeitä morsiamen hyveistä ja sulhasen ansioista**,
  ja **liverrys ja käsientaputus** jatkuvat, kunnes sulhasen väki
  saapuu. Perinteen tunnettuja nimiä ovat **Aisha Al-Fizika, Mama
  Nissa ja Khadija Al-Funsha**, joka tunnetaan nimellä **Warda
  Al-Libiya**; **Muhammad Al-Sayyadi** oli kuulu maqruna-soittaja.
  Miesten kokoonpanot esittävät samoissa häissä **eri ohjelmistoa**.
- **Mirskaawi ja jarr suwahli** (en-Wikipedia "Music of Libya", osiot
  "Mirskaawi" ja "Jarr Suwahli"): **mirskaawi** on itäisen Libyan
  kansanomainen laji, tutuin **Bengasissa, Al-Baydassa ja Dernassa**.
  Nimen alkuperästä on kaksi selitystä: toisten mukaan se tulee
  eteläisestä **Murzuqista** (murzuqawi), toisten — kuten
  musiikintutkija **Tariq al-Hassin** — mukaan sanasta **morisco**
  eli **al-Andalusista paenneista muslimeista**. Kappale alkaa
  **mawwal-tyylisellä laulualulla**, saa **diwan-säestyksen** ja
  päättyy vauhdikkaaseen **tabrouilaan**. **Jarr suwahli** on maan
  vanhimpia tunnettuja perinteitä: **jarr** tarkoittaa vetämistä ja
  **suwahli** rannikkolaista, ja laji syntyi Välimeren rannalla.
  Se on **rytmiltään ja sanoiltaan vapaa**, improvisoiva ja
  soitetaan **oudilla, neyllä tai zamaralla, darbukalla, bendirillä ja
  qanunilla**; 1900-luvun puolivälistä mukaan tulivat **kosketinsoitin,
  kitara, viulu ja haitari**.
- **Bengasista Kairoon** (en-Wikipedia "Music of Libya", osio "Jarr
  Suwahli"; en-Wikipedia "Ahmed Fakroun"; en-Wikipedia "Hamid Al
  Shaeri"): **Ahmed Fakroun** (s. **1953 Bengasissa**) perusti
  ensimmäisen yhtyeensä **1970** ja soitti sillä koulujen tanssiaisissa;
  **1960-luvun lopulla** hän yhdisti jarr suwahlin **rockiin** ja loi
  uuden nuorisomusiikin. Hän on **monisoittaja** — saz, mandola,
  darbuka, kitara, basso ja kosketinsoittimet — ja levytti **Lontoossa
  tuottaja Tommy Vancen kanssa**; **"Soleil Soleil" (1983–84, Pariisi)**
  ja **"Love Words" eli "Mots d'Amour" (1987)** tekivät hänestä
  tunnetun Euroopassa. **1970- ja 1980-luvulla** libyalainen "vapaa
  musiikki" levisi **Egyptiin**, jossa siitä tuli **musiqa shababiyya**,
  nuorisomusiikki. Sen veivät perille **Hamid Al Shaeri** ja **Ibrahim
  Fahmi**. Al Shaeri (s. **29.11.1961 Bengasissa**) soitti ensin
  **urkuja Libyan radion orkesterissa**, oli perustamassa **Sons of
  Africa -yhtyettä**, muutti Egyptiin ja julkaisi levyt **Ayonha
  (1983)** ja **Raheel (1984)**. Hänen tuottamassaan **"Law Lekissä"
  (1988)** yhdistyivät **rumpukone ja perinteinen libyalainen taputus**;
  levyä pidetään **al-jeel- eli el-Geel-tyylin** tunnuskappaleena.
  *(Al Shaerin artikkelin politiikkaosio on jätetty pois: lehti ei
  käsittele nykypolitiikkaa.)*

## Uutislähde

**Al Marsad** eli **صحيفة المرصد الليبية** (almarsad.co), arabia.
Testattu 6.9.2026 (`curl -A "matkakirja-uutisvalitys/1.0"`): syötteessä
`https://almarsad.co/feed/` kymmenen juttua; artikkelisivun
ensimmäisestä `<article>`-lohkosta jäsentyy kahdeksan yli 60 merkin
kappaletta ja `og:image` löytyy. Syöte ja artikkelilinkit ovat samalla
isäntänimellä ilman www-etuliitettä. Hylätyt lähteet on lueteltu
`js/packs/uutislahteet.js`:n LBY-kommentissa.

## Kuvat

Kaikki kuvat on haettu Commonsin rajapinnasta, koko ja lisenssi
tarkistettu ja jokainen katsottu 480 px:n esikatselukuvana ennen
valintaa. Hylätyt: *The Zukra.jpg* (tunnistettavat kasvot lähikuvassa
ja tunisialainen soittaja), *Sand Bread.jpg* (tunnistettavat kasvot, ei
libyalainen), *El Azizia* -kuvat (kuvaajat ja aihe viittaavat Algerian
samannimiseen paikkaan). Kuvattomiksi jääneet nostot on lueteltu
raportissa kuvaputkea varten.

Kaksi lähderiviä poikkeaa Commonsin `Artist`-kentästä tarkoituksella,
ja `node tools/tarkista-tekijat.mjs maa-kategoriat.js` nostaa ne esiin:

- *Eratosthenes, Eratosthenis Werlds Karta* — Commonsin tekijäkentässä
  lukee "Eratosthenes", vaikka kyseessä on satoja vuosia myöhempi
  ruotsinkielinen jälkipiirros. Lähderiville on kirjoitettu tiedoston
  `Credit`-kentän mukainen haltija, Eran Laorin karttakokoelma
  Israelin kansalliskirjastossa.
- *Libyan pivot irrigation …* — Commonsin tekijäkentässä on pelkkä
  Flickr-osoite; kuvan Flickr-käyttäjänimi **futureatlas.com** on
  tiedostosivun FlickreviewR-merkinnässä, ja se on kirjoitettu
  lähderiville.
