# Honiara — faktakoostaja, uusi kaupunkilehti (Oseanian lauta)

Lauta-id `oceania`, kaupunki-id `honiara`, maa SLB (Salomonsaaret),
en-Wikipedia "Honiara" ellei toisin mainita. Kaikki tiedot haettu
en-Wikipediasta **6.9.2026** (`action=raw`, `NODE_USE_ENV_PROXY=1`).
Jokainen haettu otsikko tarkistettu #REDIRECT-rivin varalta —
**"Solomon Islands Pijin" on ohjaus**, oikea artikkeli on "Pijin";
**"Mataniko River" on ohjaus**, oikea artikkeli on "Matanikau River";
**"Jacob Vouza" on ohjaus**, oikea artikkeli on "Jacob C. Vouza".
Commons-rajapinta vastasi kahdesti "You are making too many
requests"; odotin kolmekymmentä sekuntia ja yritin uudelleen
resepti-ohjeen mukaisesti.

Luetut artikkelit: "Honiara", "Guadalcanal", "Solomon Islands",
"Guadalcanal campaign", "Blackbirding", "Point Cruz", "Honiara
Central Market", "Solomon Islands National Museum", "Solomon Islands
Parliament Building", "Guadalcanal American Memorial", "Cathedral
Church of St Barnabas, Honiara", "Holy Cross Cathedral, Honiara",
"Red House (Solomon Islands)", "Lawson Tama Stadium", "National
Archives of Solomon Islands", "Matanikau River", "Ironbottom Sound",
"Vilu Military Museum", "Pijin", "Honiara International Airport".

Luin ennen työtä `js/tyohuone-raamattu.js` (Perustuslaki),
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/moduulit/kaupunkilehti.md`, `docs/tyolista-opukselle.md`
(O9, ETUSIVUKUVAN KAAVA, kustannussääntö) ja
`docs/mantereet-tyoaineisto/spec-mantereet.md` (Oseania-osio).
Mallina `faktapohja-suva.md` ja `faktapohja-cairns.md`. Luin myös
`js/packs/oceania-questions.js`-kohdan `honiara` (viisi kysymystä:
maa/Salomonsaaret, Guadalcanal toisen maailmansodan taistelupaikkana,
satojen saarten valtio, simpukkaraha, merenpinnan nousu) sekä
`OCEANIA_FACTS.honiara`-rivin — ks. osio 8.

**Tehtävän erityispiirre:** En kirjoittanut lehtitekstejä enkä
ladannut kuvia — tämä on raaka-ainetta kirjoittajalle ja
riippumattomalle tarkistajalle.

## Sisältölinjaus (tehtävänanto + spec-mantereet.md + Raamattu)

- **Toisen maailmansodan taistelut Guadalcanalilla ovat
  perushistoriaa** (spec-mantereet.md, Oseania-kohta: "toisen
  maailmansodan taistelut (Guadalcanal) ovat perushistoriaa").
  Ne kerrotaan tapahtumina, päivämäärinä ja seurauksina — EI
  taistelukuvauksina, EI uhrien yksityiskohtina, EI sankarikehyksenä
  kummallekaan osapuolelle (pilari 4). Uhriluvut mainitaan vain
  siltä osin kuin ne selittävät muistomerkkejä, ja lähteiden
  ristiriita kirjoitetaan auki (osio 7, huomio 4).
- **Blackbirding kerrotaan suoraan mutta ilman julmuuksien
  yksityiskohtia.** Lähdeaineisto (artikkeli "Blackbirding") sisältää
  raakoja kuvauksia kohtelusta viljelmillä; niitä EI toisteta.
  Kerrotaan järjestelmä, luvut, vastarinta ja lainsäädäntö.
- **Salomonsaarelaiset ovat elävä nykykansa**, eivät sodan kulissi:
  tori, kieli ja kaupunki ovat asukkaiden omia. Paikan oma nimi
  (*naho-ni-ara*) tulee ennen siirtomaanimiä (pilari 1).
- **EI NYKYPOLITIIKKAA EIKÄ ETNISIÄ LEVOTTOMUUKSIA.** Vuosien
  1998–2003 jännitteet, vuoden 2006 mellakat ja vuoden 2021
  levottomuudet JÄTETÄÄN KOKONAAN POIS, vaikka en-Wikipedian
  Honiara-artikkeli käsittelee niitä laajasti (sama peruste kuin
  Suvan vallankaappauksissa, faktapohja-suva.md osio 7 huomio 6).
  Tämä koskee myös kansallismuseon ryöstelyä 1999–2003 ja
  Chinatownin tuhoa 2006.
- **1873-KEHYS:** vuonna 1873 Honiaraa ei ollut olemassa
  missään muodossa. Guadalcanalilla oli kyliä, valaanpyytäjiä,
  lähetyssaarnaajia ja työvoimaa hakevia aluksia; Britannian
  protektoraatti julistettiin vasta 1893 ja Honiara perustettiin
  vasta toisen maailmansodan jälkeen. Kaupungin ikä on siis
  KAHDEKSANKYMMENTÄ VUOTTA, ja se on lehden oma kärki.

---

## 1. Sivuehdotukset

Kaksi sivua kuten Dunedinissa ja Cairnsissa: kansisivu `kaupunki` ja
yksi teemasivu. Aineisto kantaisi kolmannenkin (luonto: Guadalcanalin
sademetsä, Popomanaseu 2 335 m, endeemiset linnut), mutta se on
saaren eikä kaupungin aineistoa ja kuuluu SLB:n maalehteen, jota
tekee rinnakkainen agentti.

### Sivu A — id `kaupunki`, nimi "Honiara"

**Johdanto (n. 200 merkkiä), ehdotus:**

> Honiara on Tyynenmeren nuorimpia pääkaupunkeja: vuonna 1873
> paikalla oli rantakyliä ja kookospalmuja, ja kaupunki nousi vasta
> sen jälkeen, kun sota jätti tänne lentokentän, tiet ja laiturit.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Rautapohjan meri"

**Perustelu:** Guadalcanalin nimi, vuoden 1942–1943 taistelut ja
niiden jättämä perintö (hylyt, muistomerkit, lentokenttä, koko
kaupunki) muodostavat yhden tiiviin kaaren, joka selittää miksi
kaupunki on juuri tässä. Vakioaihe `historia` kantaa sen.

**Johdanto (n. 200 merkkiä), ehdotus:**

> Guadalcanalin ja Tulagin välinen salmi sai lempinimensä siitä,
> mitä sen pohjalla on. Kuuden kuukauden taistelu yhdestä
> lentokentästä jätti jälkeensä hylkyjä, muistomerkkejä — ja
> pääkaupungin.

---

## 2. Kahdeksan nostoehdotusta (4 × 2 sivua)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Vuonna 1873 kaupunkia ei ollut"**

Faktat ja lähteet:

- Honiara oli virallisesti Britannian Salomonsaarten protektoraatin
  pääkaupunki vasta 1952; hallintorakennukset avattiin tammikuun
  alusta 1952. ("Honiara", Modern development.)
- Britannian Salomonsaarten protektoraatti julistettiin 1893; ennen
  sitä saarilla ei ollut siirtomaahallintoa. Saksa perusti
  protektoraatin pohjoisille Salomonsaarille 1884/1886.
  ("Guadalcanal", Early history; "Solomon Islands", Establishment of
  colonial rule.)
- Ensimmäiset säännölliset ulkomaiset vierailijat olivat
  valaanpyyntialuksia Britanniasta, Yhdysvalloista ja Australiasta.
  Eurooppalaisia uudisasukkaita, valaanpyytäjiä ja lähetyssaarnaajia
  alkoi saapua 1700- ja 1800-luvuilla. ("Solomon Islands", Arrival of
  Europeans; "Guadalcanal", Early history.)
- **Blackbirding:** 1840-luvulta alkaen ja 1860-luvulla kiihtyen
  saarelaisia värvättiin — usein kaapattiin — työvoimaksi Australian,
  Fidžin ja Samoan siirtomaihin. ("Solomon Islands", Arrival of
  Europeans.) Guadalcanal-artikkeli sanoo tarkemmin: 1860-luvulta
  alkaen noin **60 000** ihmistä eri puolilta Salomonsaaria
  sopimuskirjattiin ja lähetettiin Australiaan tai Fidžille
  viljelmille, ja järjestelmä jatkui 1890-luvulle.
- Anglikaaninen Melanesian-lähetys perustettiin **1849**, perustajana
  Uuden-Seelannin piispa George Selwyn. ("Honiara", Religion.)
- Vastarinta: työvoima-alukset torjuttiin monilta saarilta, ja
  värvääjät tekeytyivät toisinaan lähetyssaarnaajien laivoiksi.
  Tämä johti väkivaltaan lähetyssaarnaajia kohtaan: **piispa John
  Coleridge Patteson surmattiin 1871 Nukapussa**, muutama päivä sen
  jälkeen kun *Margaret Chessel* -aluksen miehistö oli
  lähetyssaarnaajiksi tekeytyneenä surmannut yhden ja siepannut viisi
  paikallista. ("Blackbirding", Resistance.)
- Britannia sääti **Pacific Islanders Protection Act 1872**
  -lain hallitakseen pakottavaa työvoimanvärväystä Tyynellämerellä;
  sitä täydennettiin vuoden 1875 lailla. Lähestymistapa ei
  onnistunut värväyksen tukahduttamisessa. ("Blackbirding".)
- 1873 on siis tarkalleen se vuosi, jolloin ensimmäinen laki oli
  juuri säädetty mutta mitään ei ollut vielä muuttunut.

**Nosto K2 — "Nimi tarkoittaa tuulen suuntaa"**

- Nimi Honiara tulee sanoista *nagho ni ara*, joka kääntyy
  suunnilleen "itätuulen paikka" tai "kaakkoistuulta päin" yhdessä
  Guadalcanalin kielistä. ("Honiara", History.)
- Point Cruzin oma nimi ghari-kielellä on *naho-ni-ara*, käännös
  "kohti itä- ja kaakkoispasaatituulia". ("Point Cruz",
  Nomenclature.) → Kaupungin nimi on siis niemen nimi.
  HUOM. kirjoitusasu- ja käännösero, ks. osio 7 huomio 1.
- Honiara on Guadalcanalin luoteisrannikolla; kaupungissa on
  Point Cruzin satama, ja **Matanikaujoki virtaa kaupungin läpi**
  Chinatownin ohi. ("Honiara", Geography and climate.)
- Kaupunki kiertyy **Kukum Highwayn** ympärille, joka yhdistää sen
  Honiaran kansainväliseen lentokenttään noin **11 kilometriä**
  itään Lungajoen toisella puolen. Keskustan länsipuolella ovat
  White Riverin ja Tanaghain esikaupungit. (Sama.)
- Pääkaupunkiseudun alue julistettiin **1983** pääkaupunkiterritorioksi
  (22 km², provinssin kaltainen itsehallinto), mutta kaupunki säilyi
  myös Guadalcanalin provinssin pääkaupunkina. ("Honiara", johdanto.)
- Väkiluku 2019: kaupunki 129 569, metropolialue 169 721. Noin
  **puolet asukkaista on alle 30-vuotiaita**. Honiara on maan
  nopeimmin kasvava väestökeskus. ("Honiara", Population.)

**Nosto K3 — "Tori, jonne kala tuodaan veneellä"**

- Honiara Central Market ("Central Market") on maan suurin tuore-
  ja kalatori ja hallitsee maan sisäistä kauppaa; se on tehnyt niin
  pian **1950-luvun** perustamisestaan lähtien. ("Honiara Central
  Market".)
- Torilla on **oma rantaviivansa Ironbottom Soundiin** ja
  venerampi, jotta kalastajat saavat saaliinsa suoraan veneestä
  torille; ramppia pidetään merkittävänä symbolina siitä, kuinka
  paljon salomonsaarelaiset arvostavat kalan tuoreutta. (Sama.)
- Tori on kaupungin halvimman ruoan paikka. Osa naisista muuttaa
  Honiaraan tilapäisesti myydäkseen tuotteitaan torilla. Toria
  pidetään Salomonsaarten eri kansanryhmien kohtaamispaikkana, ja
  tavaraa tuodaan sinne koko maasta. (Sama.)
- Vuonna 2014 myyjiä oli noin **tuhat**, ja heistä arviolta
  **80 prosenttia oli naisia**. Miehet auttavat purkamisessa ja
  kojujen pystytyksessä. (Sama.)
- Tori on toinen Honiaran kaupunginvaltuuston omistamista ja
  ylläpitämistä toreista (toinen on Kukumin tori). Vuonna 2006
  valtuusto varasi osan torin tilasta kukkien ja ruukkukasvien
  ympärivuotiselle myynnille. (Sama.)
- Tori on **Mendana Avenuen** varrella, joka on Honiaran pääkatu.
  ("Honiara", Economy.)

**Nosto K4 — "Kieli, joka syntyi viljelmillä ja palasi kotiin"**

- Honiaraan vaikutti kreolisaatio. **1960-luvulla pijinistä tuli
  kaupungin pääkieli** ja kokonaisen nuorten kaupunkilaisaikuisten ja
  lasten sukupolven äidinkieli. Honiaran kautta kieli levisi ja on
  sittemmin tullut saarten pääkieleksi. ("Honiara", Modern
  development.)
- Pijin on Salomonsaarten englantipohjainen kreolikieli. Sen juuret
  ovat samassa viljelmäpidginissä kuin Vanuatun bislaman ja
  Papua-Uuden-Guinean tok pisinin: kieli syntyi, kun tuhannet
  Tyynenmeren saarelaiset työskentelivät Queenslandin ja Fidžin
  viljelmillä blackbirding-kaudella 1870–1880-luvuilla. ("Pijin";
  "Bislama", History.)
- Bellonan saarelaisten (bellonese) väestö kasvoi Honiarassa
  merkittävästi: he rakensivat pysyviä ja puolipysyviä taloja
  erityisesti White Riverin varrelle. ("Honiara", Modern
  development.)
- Matanikaujoen suun itäpuolella on **Lord Howe Settlement**, suuri
  polynesialaisyhteisö Ontong Javan atollilta. ("Honiara",
  Landmarks.)
- Vuonna 1979 Honiara oli väkiluvultaan yhä pieni kaupunki
  pääkaupungiksi: 18 346 asukasta, joista 10 870 miehiä ja 7 476
  naisia. ("Honiara", Modern development.)

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Nimi, joka lupasi kultaa"**

- Espanjalainen **Álvaro de Mendaña de Neira** purjehti Perusta ja
  oli ensimmäinen eurooppalainen, joka näki saaret **1568**.
  ("Solomon Islands", Arrival of Europeans; "Guadalcanal", Early
  history.)
- Mendaña ei nimennyt saaristoa; muut alkoivat kutsua sitä nimellä
  *Islas Salomón*, kun matkakertomukset sekoitettiin optimistisesti
  tarinoihin rikkaasta raamatullisesta **kuningas Salomonista** ja
  uskottiin saarten olevan Raamatun **Ofir**. ("Solomon Islands",
  Name.)
- Guadalcanal sai nimensä Mendañan alaisen **Pedro de Ortega
  Valencian** kotikylästä Guadalcanalista Sevillan provinssissa
  Andalusiassa. Löydön jälkeisinä vuosina saarta kutsuttiin muodoissa
  Guadarcana, Guarcana, Guadalcana ja Guadalcanar, mikä heijasteli
  andalusianespanjan eri ääntämyksiä. **1932 britit vahvistivat
  muodon Guadalcanal** andalusialaisen kaupungin mukaan.
  ("Guadalcanal", Early history.)
- Saaren oma nimi on **Isatabu**. ("Guadalcanal", infobox:
  native_name, pis = Pijin.)
- Guadalcanalilla on asuttu arkeologisten löytöjen mukaan ainakin
  4500–2500 eaa. (Poha Cave ja Vatuluma Posovi), ja
  austronesialainen **lapita-kulttuuri** saapui noin 1200–800 eaa.
  ("Guadalcanal", Early history.)
- Saari on Salomonsaarten suurin pinta-alaltaan (5 358 km²
  infoboxissa, 5 302 km² leipätekstissä — ks. osio 7 huomio 2) ja
  korkein huippu Mount Popomanaseu 2 335 m.

**Nosto H2 — "Lentokenttä, jonka takia sodittiin"**

- Japanilaiset saapuivat Guadalcanalille **toukokuussa 1942**.
  Kun amerikkalainen tiedustelulento havaitsi japanilaisen
  lentokentän rakentamisen **Lunga Pointissa** saaren
  pohjoisrannikolla, tilanne muuttui kriittiseksi: kenttä uhkasi
  Australian ja Yhdysvaltain välisiä yhteyksiä. ("Guadalcanal",
  Second World War.)
- **7. elokuuta 1942** Yhdysvallat teki sodan ensimmäisen
  maihinnousunsa Guadalcanalille. 1. merijalkaväkidivisioona valtasi
  lentokentän vähällä vaivalla, mutta sen pitäminen seuraavat kuusi
  kuukautta oli koko Tyynenmeren sotanäyttämön kiivaimpia
  kamppailuja. (Sama.)
- Laivaston **Seabee**-rakennusjoukot viimeistelivät japanilaisten
  aloittaman kentän, ja se nimettiin **Henderson Fieldiksi**
  Midwayn taistelussa kaatuneen merijalkaväen lentäjän mukaan.
  Kentältä lentäneistä eri aselajien koneista tuli **Cactus Air
  Force**. (Sama.)
- Öisin japanilaiset laivastovoimat pystyivät usein tulittamaan
  kenttää ja tuomaan joukkoja ja tarvikkeita ennen aamua; nopeiden
  hävittäjien avulla tehdystä huoltoliikenteestä tuli **Tokyo
  Express**. (Sama.)
- Nykyinen **Honiaran kansainvälinen lentokenttä on entinen
  Henderson Field**, noin kahdeksan kilometriä Honiarasta itään
  ("Guadalcanal", Postwar years) — Honiara-artikkeli sanoo
  yhdestätoista kilometristä (ks. osio 7 huomio 3). Kenttä avattiin
  uudelleen **1969** maan suurimpana lentoasemana. ("Honiara",
  Transport.)
- Toissijainen lentokenttä "Fighter Two" on nykyään paikallinen
  golfkenttä. ("Guadalcanal", Postwar years.)

**Nosto H3 — "Rautapohjan meri"**

- Salomonsaarten ympäristön meritaisteluissa upposi niin monta
  laivaa molemmilta puolilta, että läheisiä vesiä alettiin kutsua
  nimellä **Ironbottom Sound**. ("Guadalcanal", Second World War.)
- Ironbottom Sound on Guadalcanalin ja Tulagin (Nggela-saaret)
  välinen vesialue. ("Ironbottom Sound".)
- Cape Esperancen meritaistelu käytiin **11.10.1942**
  Guadalcanalin luoteisrannikon edustalla; marraskuun alun
  monipäiväinen **Naval Battle of Guadalcanal** oli kampanjan
  käännekohta. ("Guadalcanal", Second World War.)
- Japanilaiset joukot evakuoitiin **Cape Esperancesta helmikuussa
  1943**, ja amerikkalaiset julistivat saaren turvatuksi
  **9.2.1943**. Kampanja oli sodan käännekohta, koska se pysäytti
  japanilaisen laajenemisen. (Sama.)
- Sodan jälkeen amerikkalaiset ja japanilaiset ryhmät ovat
  toistuvasti käyneet saarella etsimässä kadonneiden sotilaiden
  jäänteitä. **Noin 7 000 japanilaissotilaan ruumiit ovat yhä
  kateissa saarella**, ja luita on kaivettu esiin vielä 2010-luvulla.
  (Sama.)
- **Guadalcanal American Memorial** vihittiin **7.8.1992**, Red
  Beachin maihinnousun 50-vuotispäivänä. Se on Skyway Drivella
  kukkulalla (ensimmäinen amerikkalaisten valtaama kukkula), josta
  on näkymä Mount Austenille ja Ironbottom Soundille. Muistomerkin
  neljä sivua osoittavat neljään suuntaan, joissa taisteltiin, ja
  marmoritauluissa on viiden taistelun kuvaukset ja menetettyjen
  laivojen nimet. ("Guadalcanal American Memorial".)
- **Solomons Peace Memorial Park** on japanilaisten sotaveteraanien
  rakentama muistopuisto kaikille sodassa kuolleille, noin
  **3,5 kilometriä** rannikkotietä pitkin. ("Honiara", War memorial
  and peace park.) Toinen japanilaisten pystyttämä muistomerkki on
  Mount Austenilla. ("Guadalcanal American Memorial".)
- **Vilu Military Museum** (Vilu War Museum) on ulkoilmamuseo noin
  **25 kilometriä** Honiarasta länteen. Sen perusti **Fred Kona
  1975**; kokoelmassa on amerikkalaisten ja japanilaisten koneiden
  ja kaluston jäänteitä sekä muistomerkkejä amerikkalaisille,
  australialaisille, fidžiläisille, uusiseelantilaisille ja
  japanilaisille kaatuneille. ("Vilu Military Museum";
  "Guadalcanal", Vilu War Museum.)

**Nosto H4 — "Kaupunki tukikohdan päälle"**

- Heti toisen maailmansodan jälkeen Britannian Salomonsaarten
  protektoraatin pääkaupunki siirrettiin **Tulagista** (Floridan
  saaret, nykyiset Nggela-saaret) **Honiaraan** Guadalcanalille.
  ("Guadalcanal", Postwar years.)
- Honiarasta tuli virallisesti protektoraatin pääkaupunki **1952**.
  Britannian hallituksen päätöksen sanelivat sodan aikana
  amerikkalaisten hyvin kehittämät infrastruktuurit.
  Hallintorakennuksia avattiin Honiarassa tammikuun alusta 1952.
  ("Honiara", Modern development.)
- Vuonna 1952 Tyynenmeren länsiosan ylikomissaari siirtyi Fidžiltä
  Honiaraan, ja virka yhdistettiin protektoraatin kuvernöörin
  virkaan. ("Guadalcanal", Postwar years.)
- Kaupunki kasvoi pääkaupungiksi tulon jälkeen: sille meni
  **kaksi kolmasosaa** maan taloudelliseen kehitykseen 1960- ja
  1970-luvuilla myönnetyistä varoista, vaikka vain noin viisi
  prosenttia salomonsaarelaisista asui siellä. ("Honiara",
  Modern development / Economy.)
- **Heinäkuussa 1978** Honiarasta tuli itsenäisten Salomonsaarten
  pääkaupunki. ("Honiara", Modern development.)
- **Salomonsaarten parlamenttitalo** Hibiscus Avenuen yläpuolisella
  kukkulalla rakennettiin Yhdysvaltain hallituksen 5 miljoonan
  dollarin lahjana. Ensimmäinen istunto pidettiin **marraskuussa
  1993**. Katto on abstrakti versio kahdesta paikallisesta
  kattotyylistä: kartiomainen muoto tulee Temotun kattoperinteestä
  ja katon epätavallinen harja on ominainen Guadalcanalin
  perinteisille katoille. Katon halkaisija on **37,1 metriä** ja
  korkeus lakipisteessä **13 metriä**, ja siinä on seitsemän
  pääelementtiä maan seitsemän provinssin symbolina. Arkkitehti
  Michael J. Batchelorin mukaan hallitus pyysi rakennusta, joka
  "olisi olennaisesti salomonsaarelainen tyyliltään, ei päälle
  asetettua arkkitehtuuria". ("Solomon Islands Parliament
  Building".) Rakennus tehtiin Guadalcanalin taisteluissa
  kuolleiden 450 yhdysvaltalaissotilaan ja 1 200 merijalkaväen
  sotilaan muistoksi; sen rakensi alun perin japanilainen yritys.
  ("Honiara", National Parliament and Government House.)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

**Jakso 1 — "Perille ja liikkeelle"**
- Honiaran kansainvälinen lentokenttä (entinen Henderson Field) noin
  11 km itään Kukum Highwayta pitkin; avattiin uudelleen 1969 maan
  suurimpana lentoasemana ja sitä on parannettu ottamaan vastaan
  isoja koneita. Valtion omistama **Solomon Airlines** toimii
  Honiarasta. ("Honiara", Transport.)
- **Point Cruzin satama** on maan pääsaapumissatama; se pystyy
  käsittelemään 20 jalan kontteja. Honiaran satamassa on
  ankkuripaikkoja sekä kotimaisille että kansainvälisille laivoille.
  ("Honiara", Transport / Economy.)
- **26 tunnin venematkaa Gizoon** sanotaan yhdeksi Tyynenmeren
  kauneimmista. ("Honiara", Transport.)
- Solomon Islands Visitors Bureau on pääkadulla Mendana Avenuella,
  purjehdusseuran ja Solomon Kitano Mendana -hotellin välissä; sen
  virkailijat voivat radioida etukäteen vieraiden saapumisesta
  syrjäisempien alueiden majataloihin. ("Honiara", Economy.)

**Jakso 2 — "Kaupunki rannan ja rinteen välissä"**
- Sijainti Guadalcanalin luoteisrannikolla, Matanikaujoki läpi
  kaupungin, Kukum Highway selkärankana, White River ja Tanaghai
  lännessä. ("Honiara", Geography and climate.)
- Chinatown korkeine kuisteineen; sitä on sanottu "aasialaiseksi
  villiksi lännleksi" (lähteen sanamuoto: *"Asian Wild West"*).
  ("Honiara", Landmarks.) — HUOM: sanamuoto on lähteen oma sitaatti;
  jos sitä käytetään, se merkitään sitaatiksi.
- Lord Howe Settlement Matanikaun suun itäpuolella; rannan matalassa
  vedessä näkyy **23.10.1942 tuhotun japanilaisen laivan hylky**.
  ("Honiara", Landmarks.)
- Honiara Children's Park itärannikolla on kaupungin ainoa lasten
  virkistysalue, koska muut alueet ovat yksityisomistuksessa; puistoa
  uhkaa rantaeroosio, jota on mitattu vanhan ja syöpyneen
  rantaviivan väliltä **6–8 metriä**. (Sama.)

**Jakso 3 — "Arjen ilmiö: tori ja sen venerampi"** (KUVA)
- Central Market, ks. nosto K3. Oppaassa painotus arkeen: mitä
  torilla myydään, kuka myy, mihin aikaan kannattaa tulla.
- Kukumin tori on toinen valtuuston tori. ("Honiara Central Market",
  Management.)
- Seitsemännen päivän adventistien tori (SDA Market) on kolmas
  tunnettu tori (Commons-kategoria "Markets in Honiara"; sitä EI
  mainita Wikipedian tekstissä, joten sitä ei käytetä väitteenä).

**Jakso 4 — "Historian käännekohta: kuusi kuukautta yhdestä
kentästä"** (voi olla kuvaton)
- Tiivistelmä nostoista H2 ja H3 oppaan mitassa: mitä matkailija
  näkee tänään (muistomerkit, museo, hylyt) ja mistä se johtuu.
- **Kansallismuseo** on Mendana-hotellia vastapäätä; kokoelmissa
  arkeologiaa, rahoja, aseita, kieliä, koruja, perinnemusiikkia ja
  -tanssia, maatalousvälineitä sekä kalastusvälineitä. Museon
  kulttuurikeskuksessa on **kahdeksan perinteistä taloa vuodelta
  1981** maan yhdeksästä provinssista. Museo isännöi ensimmäisen
  melanesialaisen taide- ja käsityöfestivaalin **1998**. Museon ja
  poliisiaseman välissä on esillä japanilainen **155 mm haupitsi,
  lempinimeltään "Pistol Pete"**, jolla tulitettiin Henderson
  Fieldiä. ("Honiara", Museums.)
- Kansallismuseo avattiin virallisesti **kesäkuussa 1969**, ja
  **1972** siitä tuli valtion laitos. ("Solomon Islands National
  Museum".) Point Cruz -artikkeli sanoo nykyisen museon avatun
  **12.11.1999** — ks. osio 7 huomio 5.
- Taidegalleria ja ulkoilmateatteri rakennettiin **2012**.
  ("Point Cruz", Art Gallery.) Solomon Islands Artists Association
  perustettiin 1991, ja siinä on yli 200 taiteilijajäsentä.
- Taidegallerian **kasvitieteellinen puutarha** on suosittu
  iltapäiväkävelyihin: orkideoita ja pensaita, herbaario, lumpeikko,
  kävelytiet ja **Watapamu-kylä**, joka esittää saarten tyypillistä
  kylää ja on nimetty läheisen vesipumpun mukaan. ("Honiara",
  Museums.)

**Jakso 5 — "Milloin kannattaa tulla"** (KUVA)
- Ilmasto on trooppinen sademetsäilmasto (Köppen **Af**), päivän
  keskilämpötila noin **28 °C**. Honiara on sateisempi
  **marraskuun ja huhtikuun välillä**. Vuosisade on noin
  **2 000 mm**, mikä on vähemmän kuin Salomonsaarten keskiarvo
  (noin 3 000 mm). Honiara on monsuunien vaikutuspiirissä.
  ("Honiara", Geography and climate.)
- **1.2.2010 Honiarassa mitattiin 36,1 °C**, joka on Salomonsaarten
  korkein koskaan mitattu lämpötila. (Sama.)
- Sääruudut, ks. osio 6.

**Matkailijalle-kainalo (parasta / hyvä tietää)**
- Parasta: Central Market; kansallismuseo ja kulttuurikeskus;
  Guadalcanal American Memorial (näköala); parlamenttitalon
  kartiokatto; Vilu Military Museum (25 km länteen).
- Hyvä tietää: sadekausi marras–huhtikuussa; hylyt ja
  räjähtämätön sotamateriaali (museon rakennustöissä 1991 kaivettiin
  esiin kolmekymmentä räjähtämätöntä japanilaista 75 mm:n ammusta ja
  useita amerikkalaisia ammuksia; museo esitteli 2015 valokuvanäyttelyn
  yhä maastossa olevista räjähtämättömistä ammuksista — "Point Cruz",
  National Museum); torin merivettä ei saa käyttää tuotteiden pesuun,
  koska se on saastunutta (kaupunginvaltuuston oma ohje, "Honiara
  Central Market"); ei hiekkarantoja keskustassa vaan satama ja
  rantatie.

---

## 4. Kohdekartan kohteet + vertailupiste

**Vertailupiste (kartan ydin):** Point Cruzin niemi ja sen itäpuolinen
Mendana Avenue. Perustelu: kaupunki kasvoi sataman ja pääkadun
varteen, ja kaikki hallinto- ja kulttuurikohteet ovat kilometrin
säteellä siitä. Wikipedian Honiara-piste (9°25′55″S 159°57′20″E =
−9,43194, 159,95556) osuu tälle alueelle, joten spec-mantereet.md:n
kohta 4 (historiallinen ydin, ei hallinnollinen piste) ei vaadi
siirtoa.

**Koordinaatit en-Wikipedian geosearch-rajapinnasta 6.9.2026.**
Etäisyydet mitattu; 200 metrin sääntö (Petran, Mekan ja Cairnsin
oppi) sovellettu.

| # | Kohde | lat | lon | huom |
| --- | --- | --- | --- | --- |
| 1 | Solomon Islands National Museum | −9.431111 | 159.954167 | |
| 2 | Point Cruz | −9.433333 | 159.950000 | pyöristetty minuutin tarkkuuteen |
| 3 | Solomon Islands Parliament Building | −9.433611 | 159.955833 | |
| 4 | Red House | −9.434444 | 159.957778 | |
| 5 | Holy Cross Cathedral | −9.436252 | 159.963472 | |
| 6 | Lawson Tama Stadium | −9.436667 | 159.971389 | |
| 7 | Guadalcanal American Memorial | −9.442609 | 159.957515 | |

**Mitatut lähimmät välit:** museo–parlamentti 333 m,
parlamentti–Red House 233 m, Point Cruz–museo 521 m,
Red House–Holy Cross 657 m, Holy Cross–Lawson Tama 535 m,
Red House–muistomerkki 908 m. Kaikki yli 200 metriä.

**HYLÄTYT kohteet ja syyt:**
- **Honiara Central Market** (−9.431944, 159.955556): 179 m museosta
  ja 127 m keskuspankista — numeroympyrät menisivät päällekkäin.
  Lisäksi tori on kaupunkilehden oman noston (K3) aihe. Pois.
- **Central Bank of Solomon Islands** (−9.430833, 159.955278):
  126 m museosta. Pois.
- **National Archives of Solomon Islands** (−9.432454, 159.954035):
  150 m museosta. Pois.
- **Solomon Islands National University / Woodford International
  School / University of the South Pacific Solomon Islands**: kaikki
  jakavat täsmälleen saman koordinaatin −9.435092, 159.951239 kuin
  artikkelit "British Solomon Islands", "Matanikau Offensive" ja
  "Carlson's patrol". Se on selvästi yleinen Honiara-varakoordinaatti
  eikä oikea sijainti. EI KARTALLE. (Ks. osio 7 huomio 6.)
- **Matanikau River** (−9.434722, 159.966944): piste on joessa, ja
  `tools/tarkista-karttapisteet.mjs` hylkää vesipisteet (sillat ja
  majakat ovat poikkeus). Pois; joki mainitaan oppaassa.
- **Honiara International Airport**: 11 km itään, kartan ulkopuolella.
- **Vilu Military Museum** (9°19′8,5″S 159°47′36″E): 25 km länteen,
  kartan ulkopuolella. Oppaassa.
- **St Barnabasin anglikaaninen katedraali**: en-Wikipedian
  artikkelissa ei ole koordinaattia eikä se osunut geosearchiin.
  Pois kartalta; mainitaan lehdessä.

**Rajausehdotus** (tools/piirra-kaupunkikartta.mjs):
`{ pohjoinen: -9.4270, etela: -9.4470, lansi: 159.9460, ita: 159.9760 }`
eli noin 2,2 × 3,3 km. `meri: true` (Ironbottom Sound on OSM:ssä
rantaviivaa).

---

## 5. Kuva-aiheet (Commons-kategoriat)

Kategoriat tarkistettu Commonsin rajapinnasta 6.9.2026. **Honiaran
kuvapooli on ohut** — pääkategoriassa on 49 tiedostoa ja parhaissa
alikategorioissa muutama kymmenen.

| Kategoria | tiedostoja | ≥1200 px | mihin |
| --- | --- | --- | --- |
| Category:Honiara | 49 | ~40 | yleiskuvat, katu |
| Category:Views of Honiara | 25 | 21 | kansikuvat, avauskuvat |
| Category:Buildings in Honiara | 37 | 34 | museo, tori, valtuusto |
| Category:Markets in Honiara | 18 | 18 | tori |
| Category:History of Guadalcanal | 23 | 19 | 1940-luvun PD-kuvat |
| Category:Ironbottom Sound | 5 | 4 | 1942–44 PD-kuvat |
| Category:Guadalcanal American Memorial | 16 | 14 | muistomerkki |
| Category:Holy Cross Cathedral (Honiara) | 16 | 16 | katedraali |
| Category:Lawson Tama Stadium | 4 | 3 | stadion |
| Category:Sports in Honiara | 15 | 14 | Lord Howe -kentän arki |
| Category:Suburbs of Honiara | 4 | 4 | rinteet |
| Category:Solomon Islands National Museum | 0 | 0 | TYHJÄ |

**ENNEN–NYT-PARI: Honiaralla ei ole 1800-luvun kuvaa, koska
kaupunkia ei ollut.** Varhaisin kuvamateriaali seudulta on
1940-luvun sota-ajan PD-aineistoa (US Navy, Signal Corps,
US Army Air Forces). Poikkeus: Category:History of Guadalcanal
sisältää kolme Auckland Museumin PD-litografiaa vuodelta 1851
(*Wanderer's Bay, Guadalcanal*, John Websterin ja George French
Angasin mukaan) — ne ovat isoisän aikaa lähinnä olevaa aineistoa
mutta esittävät väkivaltaista kohtausta ("The Attack 15th Oct
1851"), joten ne EIVÄT sovi peliin (pilari 4). **Suositus
kirjoittajalle: ennen–nyt-parin vanha kuva on 1940-luvulta ja
kuvateksti sanoo ääneen, ettei kaupunkia ollut ennen sitä.**

**Etusivukuvan (matkailijalle) kaava:** Honiaran oma erikoisuus on
joko parlamenttitalon kartiokatto (paikallisista kattotyyleistä
johdettu, ei voisi olla mistään muualta) tai Guadalcanal American
Memorialin pyloni. Kumpikin tarvitsee pystykuvan; kategoriat
tarkistettava kirjoitusvaiheessa.

---

## 6. Säätiedot

**Open-Meteon arkisto vastasi 6.9.2026 pyyntöön
`{"reason":"Daily API request limit exceeded"}` (HTTP 429).**
Säärivi (`js/packs/saatiedot.js`) JÄTETÄÄN SIKSI POIS
Samarkand-mallin (v965) ja Suvan mukaisesti; oppaan sääjakso
kirjoitetaan en-Wikipedian sääruutujen varaan ja se sanotaan ääneen.

**Honiara-artikkelissa on KAKSI sääruutua, ja ne eroavat
merkittävästi.** Ero on kirjoitettava auki (osio 7 huomio 7).

Ruutu 1 — **Honiara International Airport (1991–2020), NOAA**:
- vuoden keskilämpö 27,2 °C; ylimmät 31,2–31,7 °C, alimmat
  22,0–23,5 °C
- vuosisade **1 967,8 mm**, sadepäiviä (≥1 mm) **130**
- kuukausisateet: tammi 239,0 · helmi 290,4 · maalis 285,0 ·
  huhti 190,1 · touko 111,6 · kesä 85,6 · heinä 100,3 · elo 95,4 ·
  syys 90,1 · loka 117,7 · marras 145,3 · joulu 210,5
- ennätyskorkein 37,4 °C (helmikuu), ennätysmatalin 15,9 °C (elokuu)

Ruutu 2 — **"Honiara"** (lähde ei näy raakatekstin katkelmassa):
- vuoden keskilämpö 26,5 °C
- vuosisade **2 177 mm**, sadepäiviä (≥0,1 mm) **197**
- kuukausisateet: tammi 277 · helmi 287 · maalis 362 · huhti 214 ·
  touko 141 · kesä 97 · heinä 100 · elo 92 · syys 95 · loka 154 ·
  marras 141 · joulu 217
- ilmankosteus 80–81 %

**Suositus:** käytä ruutua 1 (nimetty mittausasema ja nimetty
normaalikausi) ja kerro erosta yhdellä virkkeellä. Molemmat ruudut
ja artikkelin leipäteksti ("noin 2 000 mm") ovat samaa
suuruusluokkaa; sadepäivien ero (130 vs. 197) johtuu eri
kynnysarvosta (1 mm vs. 0,1 mm) eikä ole ristiriita.

Koordinaatit mahdollista tulevaa säärivilä varten:
lat −9.4319, lon 159.9556 (kaupunki); lentokenttä on 11 km itään.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Nimen etymologia kahdessa muodossa.** "Honiara" sanoo
   *nagho ni ara*, "itätuulen paikka" tai "kaakkoistuulta päin",
   "yhdessä Guadalcanalin kielistä". "Point Cruz" sanoo
   *naho-ni-ara*, ghari-kieltä, "kohti itä- ja kaakkoispasaatituulia".
   → Kirjoita kirjoitusasu Honiara-artikkelin mukaan (*nagho ni ara*)
   ja mainitse ghari-kieli Point Cruz -artikkelin mukaan; älä väitä
   kumpaakaan käännöstä ainoaksi.
2. **Guadalcanalin pinta-ala.** Infobox 5 358 km², leipäteksti
   5 302 km². → Käytä pyöristystä "runsaat viisi tuhatta
   neliökilometriä" tai kirjoita ero auki.
3. **Lentokentän etäisyys.** "Honiara" sanoo noin 11 km itään
   (kahdessa kohdassa), "Guadalcanal" sanoo noin 8 km itään.
   → Käytä Honiara-artikkelin lukua (kaupungin oma artikkeli) ja
   sano "runsaat kymmenen kilometriä".
4. **Uhriluvut ovat lähteissä ristiriitaisia.** "Guadalcanal
   American Memorial" antaa useita eri lukuja samasta kampanjasta
   (mm. "as many as 35,000 American and Japanese men", "American dead
   were one tenth of the total 50,000 deaths"), ja
   parlamenttirakennuksen kohdalla puhutaan 450 sotilaasta ja
   1 200 merijalkaväen sotilaasta. → ÄLÄ VALITSE YHTÄ
   KOKONAISUHRILUKUA. Parlamenttitalon 450 + 1 200 saa käyttää,
   koska se on rakennuksen oma perustelu ja kerrotaan sellaisena.
   Muut luvut jätetään pois (pilari 4: ei uhriluvuilla mässäilyä).
5. **Kansallismuseon avaamisvuosi.** "Solomon Islands National
   Museum": virallisesti avattu kesäkuussa 1969. "Point Cruz":
   "nykyinen kansallismuseo ... avattiin virallisesti 12.11.1999".
   → Kyse on eri asioista (laitos vs. nykyinen rakennus).
   Kirjoita molemmat tai vain 1969.
6. **Geosearchin varakoordinaatit.** Seitsemän eri artikkelia
   (Solomon Islands National University, Honiara Solomon Islands
   College of Higher Education, University of the South Pacific
   Solomon Islands, Woodford International School, British Solomon
   Islands, Matanikau Offensive, Carlson's patrol) palautti
   TÄSMÄLLEEN saman koordinaatin −9.435092, 159.951239. Se ei ole
   näiden kohteiden todellinen sijainti. Samoin kuusi artikkelia
   (Honiara, Honiara Central Market, US Naval Base Solomons, Radio
   Happy Isles, Cruz, Kola'a) jakaa kaupungin oman pisteen
   −9.431944, 159.955556. → Kartalle vain kohteet, joilla on oma
   koordinaatti.
7. **Kaksi sääruutua**, ks. osio 6.
8. **Parlamenttitalon valmistumisvuosi.** Leipäteksti sanoo
   ensimmäisen istunnon marraskuussa 1993; "Honiara" sanoo
   "inaugurated in 1993"; artikkelin luokka on "Government buildings
   completed in 1994". → Käytä muotoa "ensimmäinen istunto
   marraskuussa 1993".
9. **Kulttuurikeskuksen talot.** "Honiara": kahdeksan perinteistä
   taloa vuodelta 1981 maan **yhdeksästä** provinssista. Luvut
   eivät täsmää keskenään mutta ovat lähteen omat. → Kerro
   molemmat luvut sellaisenaan tai käytä vain "perinteisiä taloja
   vuodelta 1981".
10. **Chinatownin luonnehdinta** ("Asian Wild West") on lähteen
    oma sitaatti eikä Wikipedian oma väite ("is said to look
    like"). → Käytä vain sitaattina tai jätä pois.
11. **Honiaran perustamisvuosi.** Pelin nykyinen valokuvataulu
    (js/packs/oceania-valokuvat.js, honiara) sanoo: "kaupunki
    perustettiin 1945 amerikkalaisten jättämän tukikohdan paikalle
    ja siitä tuli pääkaupunki 1952". en-Wikipedia EI anna
    perustamisvuotta 1945 — se sanoo vain, että pääkaupunki
    siirrettiin Tulagista heti sodan jälkeen ja että Honiarasta
    tuli virallisesti pääkaupunki 1952. → Lehdessä EI väitetä
    vuotta 1945. Valokuvataulua ei muuteta (ei tämän tehtävän
    piirissä), mutta ristiriita kirjataan tähän.
12. **"Pistol Pete"** on lähteen mukaan 155 mm japanilainen
    haupitsi museon ja poliisiaseman välissä. Nimi on
    amerikkalaisten sotilaiden antama lempinimi. Käytä sitaattina.

---

## 8. Päällekkäisyyksien välttäminen

**Laudan visa (`js/packs/oceania-questions.js`, avain `honiara`)
kysyy:** (1) minkä maan pääkaupunki Honiara on, (2) mikä saari oli
toisen maailmansodan tunnettu taistelupaikka, (3) millainen valtio
Salomonsaaret on, (4) mitä on käytetty valuuttana rahan ohella
(simpukkaraha), (5) mikä uhkaa matalia Tyynenmeren saaria
(merenpinnan nousu).

→ Visan vastaukset LÖYTYVÄT lehdestä (Guadalcanal, Salomonsaaret,
saarivaltio), kuten sääntö vaatii. **Minitehtävä EI SAA kysyä
mitään näistä.** Ehdotus minitehtäväksi: parlamenttitalon katon
seitsemän pääelementtiä = seitsemän provinssia, tai Honiaran nimen
merkitys (tuulen suunta), tai vuosi 1952. Vastaus on löydyttävä
SAMALTA sivulta.

**`OCEANIA_FACTS.honiara`** kertoo jo: Honiara on Guadalcanalilla;
1942–43 taisteltiin; Ironbottom Sound; simpukkanauhat kauppana.
→ Lehti saa käsitellä samat aiheet syvemmin, mutta simpukkarahaa
EI kannata nostaa omaksi nostoksi (se on jo faktarivillä ja visassa).

**Saapumisteksti (`js/packs/oceania-saapumiset.js`, honiara) on jo
olemassa** ja kertoo Rautapohjasta ja hylyistä. → Lehden nosto H3
saa kertoa saman ilmiön mutta eri sisällöllä (muistomerkit,
päivämäärät, evakuointi) — EI toista hylkysukellusta samoin sanoin.

**Valokuvataulu (`js/packs/oceania-valokuvat.js`, honiara) käyttää
jo näitä tiedostoja:**
`Army and Marines on KuKum Beach, Guadalcanal, circa 1942.jpg`,
`Honiara Central Market.jpg`,
`A man selling fish at Honiara’s central market. (10662316344).jpg`,
`Honiara Mendana Avenue.jpg`,
`Honiara panorama.jpg`.
→ Lehti EI saa käyttää näitä samoja tiedostoja.

**Nähtävyysjutut eivät saa toistaa lehden nostoja.** Lehden nostot
ovat: 1873 ja blackbirding, nimi ja maantiede, tori, pijin, Mendaña
ja nimi, Henderson Field, Rautapohja ja muistomerkit, kaupungin
synty 1952. → Kartan seitsemästä kohteesta muistomerkki ja
parlamentti ovat lehden nostojen aiheita; niiden juttujen on
kerrottava ERI ASIA (muistomerkki: rakenne, taulut, vuosipäivä;
parlamentti: arkkitehtuuri, katto, mitat) — sama ratkaisu kuin
Suvassa.
