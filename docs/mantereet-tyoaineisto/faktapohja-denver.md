# Denver — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `denver`, en-Wikipedia "Denver".
Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, uusinnat kasvavalla viiveellä) ja
laajennusrajapinnasta (`action=query&prop=extracts`) **6.9.2026**.
Malli ja mitat luettu tiedostoista `docs/aasia-tyoaineisto/
lehtityo-resepti.md` (SITOVA), `docs/moduulit/kaupunkilehti.md`,
`docs/mantereet-tyoaineisto/spec-mantereet.md` ja
`docs/tyolista-opukselle.md` (paketti O9, ETUSIVUKUVAN KAAVA,
kustannussääntö). Esikuvana `faktapohja-chicago.md`.

Luetut lähdeartikkelit (en-Wikipedia, 6.9.2026): **"Denver"**,
**"History of Denver"**, **"Kansas Pacific Railway"**,
**"Pike's Peak gold rush"**, **"Red Rocks Amphitheatre"**,
**"Colorado State Capitol"**, **"Denver Union Station"**,
"Denver Art Museum", "Denver Botanic Gardens", "Molly Brown House",
"Brown Palace Hotel (Denver)", "Coors Field", "Daniels & Fisher
Tower", "Denver Performing Arts Complex", "Cathedral Basilica of the
Immaculate Conception (Denver)", "Larimer Square", "Confluence Park",
"Front Range", "Cheyenne", "Arapaho".

Kaupungin visa on tarkistettu tiedostosta
`js/packs/northamerica-questions.js` (kohta `denver`, viisi
kysymystä: mailin korkeus, Kalliovuoret, Coloradon pääkaupunki,
korkeusharjoittelu ja hapen osapaine, vuoden 1858 kultaryntäys).
Kaikki viisi aihetta esiintyvät tässä faktapohjassa, koska ne ovat
kaupungin ydintarinaa — resepti vaatii, että visan vastaus löytyy
lehden teksteistä. **Minitehtävä ei siis saa kysyä yhtään näistä
viidestä.** Ehdotus osiossa 7.

Olemassa olevat `js/packs/northamerica-valokuvat.js`:n ja
`js/packs/northamerica-saapumiset.js`:n denver-lohkot on luettu
ristiriitojen varalta: saapumisteksti puhuu mailin korkeudesta,
preerian ja Kalliovuorten saumasta sekä kullankaivajien leiristä, ja
valokuvataulussa on jo tarkistettu ennen–nyt-pari (Tervetuloakaari ja
Union Depot noin 1908 / sama asema 2022). Ristiriitoja ei ole.

**1873-KEHYS (omistajan tilaus 6.9.2026):** Denver oli isoisän
matkavuonna kultaryntäyksen jälkeinen **rautatiekaupunki**. Kulta oli
tuonut ihmiset 1858–59, mutta mannertenvälinen rata vedettiin
Cheyennen kautta sata mailia pohjoisempaa; kaupunki pelasti itsensä
rakentamalla omat radat. Denver Pacific saapui Cheyennestä 24.6.1870
ja Kansas Pacific idästä elokuussa 1870. Vuonna 1873 Denver oli siis
kolme vuotta vanha rautatiesolmu, jonne rata toi arviolta **sata uutta
asukasta päivässä**. Colorado oli yhä territorio (osavaltio vasta
1.8.1876), eikä osavaltiotaloa vielä ollut — se avattiin marraskuussa
1894. Kirjoittaja EI saa sijoittaa mailin merkkiä portaisiin isoisän
aikaan.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Denver"

**Johdanto (ehdotus, n. 210 merkkiä):**

> Denver on preerian ja Kalliovuorten saumassa tasan mailin
> korkeudessa. Kulta toi tänne telttakylän 1858, mutta kaupungin
> pelasti rautatie: isoisän matkavuonna 1873 rata oli kolme vuotta
> vanha ja toi sata uutta asukasta päivässä.

### Sivu B — teemasivu, ehdotettu id `luonto`, nimi "Vuoret ja ohut ilma"

**Perustelu valinnalle:** `luonto` on vakioaihe `AIHE_IKONIT`-listalla
(js/ui-apurit.js), eikä uusia sivu-id:itä tehdä. Aihe kantaa oman
sivunsa: Front Rangen mannerjakaja, kaupungin korkeusero 5 130–5 690
jalkaa, ohuen ilman fysiologia ja arkivaikutukset, Red Rocksin
hiekkakivimuodostelmat ja puolikuivan mannerilmaston sääkäänteet ovat
viisi eri asiaa, eivätkä ne mahdu kaupunkisivun neljään nostoon.
Laudan `ambience` on denverillä `vuoristo` (js/packs/northamerica.js),
joten sivu istuu myös pelin omaan kehykseen.

**Johdanto (ehdotus, n. 200 merkkiä):**

> Kaupungin länsipuolella nousee seinä, jonka takaa vedet virtaavat
> toiselle valtamerelle. Korkeus näkyy Denverissä kaikessa: ilmassa,
> auringossa, leivontaohjeissa ja siinä, kuinka pitkälle pallo
> lentää.

---

## 2. Kahdeksan nostoehdotusta (4 + 4)

Mitat: teksti 440–660 merkkiä, nostoja 4 per sivu (resepti).

### Sivu `kaupunki` — 4 nostoa

**K1. Maa ennen kaupunkia — tšeijennit ja arapahot**

- Denverin seutua asuttivat useat alkuperäiskansat: apassit, utet,
  tšeijennit, comanchet ja arapahot. — "Denver" (History)
- Vuoden 1851 Fort Laramien sopimuksessa Yhdysvallat määritteli
  yksipuolisesti tšeijennien ja arapahojen alueen ulottuvan North
  Platte -joelta (nyk. Wyoming ja Nebraska) etelään Arkansas-joelle
  (nyk. Colorado ja Kansas). Määritelmä kattaa nimenomaan nykyisen
  Denverin metropolialueen. — "Denver" (History)
- Marraskuussa 1858 löydetty kulta toi ryntäyksen ja valkoisen
  siirtolaisuuden tulvan tšeijennien ja arapahojen maiden yli. —
  "Denver" (History)
- 18.2.1861 kuusi eteläisten tšeijennien päällikköä ja neljä arapahojen
  päällikköä allekirjoittivat Fort Wisen sopimuksen Bent's New
  Fortissa. Siinä luovutettiin yli 90 prosenttia Fort Laramien
  sopimuksen määrittelemistä maista, myös nykyisen Denverin alue. —
  "Denver" (History)
- Osa tšeijenneistä vastusti sopimusta: sen oli allekirjoittanut
  pieni vähemmistö päälliköistä ilman muun kansan suostumusta,
  allekirjoittajat eivät olleet ymmärtäneet allekirjoittamaansa ja
  heitä oli lahjottu suurella lahjajaolla. — "Denver" (History)
- Erimielisyys johti vuosien 1864–65 Coloradon sotaan, jonka aikana
  tapahtui Sand Creekin verilöyly, ja Medicine Lodgen sopimus
  (1867) siirsi tšeijennit ja arapahot pois perinteiseltä alueeltaan.
  — "Denver" (History)
- **Nykypäivä (pilari 1, spec-mantereet.md linjaus 1):** arapahoja on
  nykyisin kolmessa tunnustetussa yhteisössä — Northern Arapaho Tribe
  (Wind Riverin reservaatti, Wyoming) sekä Cheyenne and Arapaho
  Tribes (Oklahoma). — "Arapaho" (johdanto)
- Tšeijennit ovat nykyisin kaksi liittovaltion tunnustamaa kansaa:
  Northern Cheyenne Tribe (Montana) ja Cheyenne and Arapaho Tribes
  (Oklahoma). — "Cheyenne" (johdanto)
- **KIRJOITUSOHJE:** verilöyly kerrotaan tapahtumana neutraalisti ja
  lyhyesti, ilman yksityiskohtia (pilari 4 + spec-mantereet.md
  linjaus 1 ja 2). Sopimuksen kiista kerrotaan lähteen omalla
  sanamuodolla. Kansat kuvataan elävinä, ei kadonneina.

**K2. Vuosi 1858: kaksi kilpailevaa telttakylää joen mutkassa**

- Kesällä 1858 Pikes Peakin kultaryntäyksen aikaan joukko
  kullanetsijöitä Lawrencesta (Kansas) perusti Montana Cityn
  kaivoskylän South Platte -joen rannalle. Se oli ensimmäinen
  historiallinen asutus nykyisen Denverin alueella, mutta hiipui
  nopeasti ja hylättiin kesään 1859 mennessä Aurarian ja St. Charles
  Cityn hyväksi. — "Denver" (History)
- 22.11.1858 kenraali William Larimer ja kapteeni Jonathan Cox,
  molemmat maakeinottelijoita itäisestä Kansas Territorystä, asettivat
  poppelipölkkyjä merkitäkseen valtauksen kukkulalle South Platten ja
  Cherry Creekin yhtymäkohdan yläpuolella — puron toiselle puolen
  Auraria-kaivoskylästä ja olemassa olleen St. Charlesin tontille. —
  "Denver" (History)
- Larimer nimesi paikan Denver Cityksi mielistelläkseen Kansasin
  territoriokuvernööri James W. Denveriä. Hän toivoi nimen auttavan
  kaupunkia Arapahoe Countyn pääpaikaksi — mutta kuvernööri oli hänen
  tietämättään jo eronnut. — "Denver" (History)
- Ensimmäisten kaupunkien paikalla on nykyään Confluence Park
  keskustan liepeillä. — "Denver" (History)
- Denver City oli rajaseudun kaupunki, jonka talous perustui
  kaivosmiesten palvelemiseen: uhkapeli, saluunat, karja ja
  tavarakauppa. Alkuvuosina tontteja vaihdettiin varusteisiin tai
  pelattiin pois. — "Denver" (History)
- **Ristiriita kirjoitettava auki tai vältettävä:** artikkelin
  leipäteksti antaa perustamispäiväksi 22.11.1858, mutta artikkelin
  oma tietolaatikkohuomautus sanoo tietolaatikon ilmoittavan
  17.11.1858 (`{{contradictory inline}}`). Käytä ilmaisua "marraskuussa
  1858" tai kerro ero.

**K3. 1873: kaupunki, jonka rata pelasti**

- 1860-luvun lopulla päätös vetää maan ensimmäinen mannertenvälinen
  rata Cheyennen kautta Denverin sijaan uhkasi nuoren kaupungin
  menestystä: rata kulki 100 mailin (160 km) päässä. — "Denver"
  (History)
- Kaupunkilaiset keräsivät rahaa oman radan rakentamiseksi;
  territoriokuvernööri John Evans, David Moffat ja Walter Cheesman
  johtivat hanketta, ja kolmessa päivässä kerättiin 300 000 dollaria.
  Keräys kuitenkin pysähtyi ennen tavoitetta. — "Denver" (History)
- Denver Pacific Railway and Telegraph Company perustettiin 19.11.1867.
  Kongressilta saatiin 900 000 eekkerin maalahjoitus ehdolla, että
  yhtiö rakentaa yhteyden Wyomingin Union Pacific -linjalta silloin
  vasta Keski-Kansasiin ulottuneelle Kansas Pacific -linjalle. —
  "History of Denver"
- Rakennustyöt alkoivat 18.5.1868 ja kestivät noin kaksi vuotta.
  **Ensimmäinen juna Cheyennestä saapui Denveriin 24.6.1870.** —
  "History of Denver"
- **Kaksi kuukautta myöhemmin, elokuussa 1870, Kansas Pacific sai
  linjansa valmiiksi Denveriin ja ensimmäinen juna saapui Kansasista.**
  — "History of Denver"
- Kansas Pacificin kaksi rakennusryhmää kohtasivat Coloradon itäisellä
  tasangolla **15.8.1870** Comanche Crossingissa, joka nimettiin
  uudelleen Strasburgiksi yhtiön insinöörin mukaan. Kansas Pacificin ja
  Denver Pacificin linjat risteivät "Jersey Junctionissa" noin kolmen
  mailin päässä keskustasta pohjoiseen. — "Kansas Pacific Railway"
- Strasburgin kiskojen yhdistäminen 15.8.1870 merkitsi tosiasiassa
  yhtenäisen rannikolta rannikolle ulottuvan rataverkon valmistumista:
  Utahin kultapiikkitapahtuma edellisenä vuonna oli yhdistänyt Union
  Pacificin ja Central Pacificin, mutta vuoteen 1872 asti matkustajien
  oli noustava junasta Council Bluffsin ja Omahan välillä ja ylitettävä
  Missouri-joki veneellä. — "Kansas Pacific Railway"
- 1870-luvulla rautatien arvioidaan tuoneen Denveriin **sata uutta
  asukasta päivässä**. Väkiluku nousi 4 759:stä (1870) yli 35 000:een
  (1880). Ensimmäisenä toimintakuukautenaan rata toi 1 067 kävijää ja
  13 000 000 naulaa rahtia. — "History of Denver"
- **HUOM ristiriita:** "Denver"-artikkeli sanoo Denver Pacificin
  valmistumisen 24.6.1870 avanneen "uuden vaurauden aikakauden";
  "Kansas Pacific Railway" -artikkeli painottaa, että vasta
  15.8.1870 syntyi todellinen rannikolta rannikolle -verkko. Molemmat
  pitävät paikkansa eri asioista — kirjoita kumpikin päivä auki.

**K4. Mailin korkeus ja portaiden merkki**

- Denverin lempinimi on "Mile High City": kaupungin virallinen korkeus
  on tasan yksi maili merenpinnan yläpuolella, ja korkeus määritellään
  osavaltiotalon portailla olevan kiintopisteen mukaan. Koko kaupungin
  korkeus vaihtelee 5 130 ja 5 690 jalan välillä (1 564–1 734 m). —
  "Denver" (Geography)
- Tietolaatikon virallinen korkeus on 5 280 jalkaa (1 609,3 m). —
  "Denver" (infobox)
- Osavaltiotalo on osoitteessa 200 East Colfax Avenue. Elijah E.
  Myersin suunnittelema rakennus tehtiin 1890-luvulla Coloradon
  valkoisesta graniitista ja avattiin käyttöön **marraskuussa 1894**;
  osavaltion edustajakokous kokoontui siellä ensi kerran tammikuussa
  1895. — "Colorado State Capitol"
- **HUOM 1873-kehykselle:** osavaltiotaloa EI ollut isoisän
  matkavuonna. Colorado hyväksyttiin unioniin 1.8.1876, ja Denver
  vahvistettiin pysyväksi osavaltion pääkaupungiksi vuoden 1881
  kansanäänestyksellä. Denver oli ollut territorion pääkaupunki
  9.12.1867 alkaen. — "Denver" (History)
- Denver on Yhdysvaltain ainoa osavaltion pääkaupunki, joka on
  yhdistetty kaupunki-kunta (consolidated city-county). Kaupunki ja
  kunta syntyivät 1.12.1902. — "Denver" (Geography, History)
- Denver tunnetaan historiallisesti myös nimillä *Queen City of the
  Plains* ja *Queen City of the West* — syynä on sen asema Coloradon
  itäisten ylätasankojen maatalouden keskuksena. — "Denver" (History)

### Teemasivu `luonto` — 4 nostoa

**L1. Seinä lännessä: Front Range ja mannerjakaja**

- Denver on Front Rangen kaupunkikäytävän keskellä, Kalliovuorten
  ja idän ylätasankojen välissä. Keskustan liikekortteli on noin
  12 mailin (19 km) päässä Kalliovuorten juurelta. Maasto on keskellä
  tasankoa ja kumpuilee pohjoisessa, lännessä ja etelässä. —
  "Denver" (Geography)
- Front Range on Kalliovuorten itäisin jono. Se ulottuu Wyomingin
  eteläosista Coloradon keskiosiin. — "Front Range"
- Kalliovuoret muodostavat mannerjakajan; kaupungin panoraamassa
  näkyy lumihuippuinen Mount Blue Sky (entinen Mount Evans). —
  "Denver" (Geography, kuvateksti)
- **KIRJOITUSOHJE:** mannerjakajan vedenjaon suunta (länteen
  Tyynellemerelle, itään Atlantille) on visan vastaus
  (northamerica-questions.js) — se on kirjoitettava tähän nostoon,
  jotta pelaaja löytää sen lehdestä.

**L2. Ohut ilma näkyy kaikessa**

- Denverin ilmasto on viileä puolikuiva (Köppen BSk, Trewartha BSao),
  kosteus on yleisesti matala ja aurinkoa on noin **3 100 tuntia
  vuodessa**. — "Denver" (Climate)
- Korkean sijainnin ja kuivuuden takia vuorokauden lämpötilavaihtelu
  on suuri läpi vuoden. — "Denver" (Climate)
- Kaupungin virallinen sääasema on Denverin kansainvälisellä
  lentokentällä, noin 20 mailin (32 km) päässä keskustasta. Vuoden
  2019 analyysin mukaan lentokentän keskilämpötila 50,2 °F (10,1 °C)
  oli merkittävästi viileämpi kuin keskustan 53,0 °F (11,7 °C), ja
  mittauspaikasta on kiistelty. — "Denver" (Climate)
- **KIRJOITUSOHJE:** visan neljäs kysymys koskee korkeusharjoittelua
  ja hapen osapainetta. en-Wikipedian "Denver"-artikkeli EI sisällä
  korkeusharjoittelun fysiologiaa, joten sitä EI saa esittää
  Wikipedia-katteisena. Kirjoita nosto siitä, mitä lähde sanoo
  (aurinkotunnit, lämpötilavaihtelu, mittauspaikan kiista, korkeuden
  vaihteluväli) ja jätä happifysiologia visan omaksi faktaksi
  (`fact`-kenttä vastaa siitä jo nyt). Ks. osio 7, kohta 3.

**L3. Red Rocks: 290 miljoonaa vuotta vanha näyttämö**

- Red Rocks Amphitheatre on avotaivasamfiteatteri lähellä Morrisonia,
  noin 10 mailin (16 km) päässä Denveristä lounaaseen. Denverin
  kaupunki omistaa ja ylläpitää sen. — "Red Rocks Amphitheatre"
- Paikan tunnistaa kahdesta massiivisesta monoliitista, joiden nimet
  ovat "Ship Rock" ja "Creation Rock", sekä pienemmästä "Stage
  Rockista"; ne reunustavat 9 525 hengen katsomoa ja muodostavat
  amfiteatterin luonnostaan. — "Red Rocks Amphitheatre"
- Muodostumat syntyivät miljoonia vuosia sitten osana Fountain-
  muodostumaa ja kohosivat ja kallistuivat Laramide-orogenian aikana
  — samassa mullistuksessa kuin läheiset Garden of the Gods ja
  Flatirons. Punertava väri johtuu hapettuneista mineraaleista. —
  "Red Rocks Amphitheatre"
- Aluetta käyttivät todennäköisesti utet; Stephen Longin armeijan
  retkikunta "löysi uudelleen" paikan 1820. — "Red Rocks Amphitheatre"
- Denverin kaupunki osti alueen John Brisben Walkerilta 1927 hintaan
  54 133 dollaria. Amfiteatterin rakentaminen alkoi 1936 arkkitehti
  Burnham F. Hoytin ja Stanley E. Morsen suunnitelmilla sekä CCC:n ja
  WPA:n työvoimalla, ja se vihittiin **15.6.1941** Helen Jepsonin
  esiintymisellä. — "Red Rocks Amphitheatre"
- Denver on hankkinut vuoristopuistoja 1910-luvulta alkaen, yhteensä
  noin 14 000 eekkeriä (5 670 ha), ja Red Rocks Park on niistä
  tunnetuin. — "Denver" (Parks and recreation)

**L4. Puistot, jotka kasteltiin joesta**

- Denverissä oli vuoden 2006 tietojen mukaan yli 200 puistoa,
  pienistä taskupuistoista 314 eekkerin (127 ha) City Parkiin, sekä
  29 liikuntakeskusta. — "Denver" (Parks and recreation)
- Suuri osa puistoista hankittiin osavaltion mailta 1800-luvun lopulla
  ja 1900-luvun alussa City Beautiful -liikkeen aikaan. Pormestari
  Robert Speer (1904–12 ja 1916–18) laajensi ja kaunisti puistoja.
  Kaupungin ensimmäinen maisema-arkkitehti oli Reinhard Schuetze, joka
  suunnitteli mm. Washington Parkin, Cheesman Parkin ja City Parkin. —
  "Denver" (Parks and recreation)
- Speer käytti myös Frederick Law Olmsted Jr:ää ja Saco Rienk
  DeBoeria puistojen, puistokatujen ja katunurmien suunnitteluun. —
  "Denver" (Parks and recreation)
- **Kaikki nämä puistot kasteltiin kaupungin ojaa (city ditch) pitkin
  johdetulla South Platte -joen vedellä.** — "Denver" (Parks and
  recreation)
- Denverin kasvitieteellinen puutarha Cheesman Parkin naapurissa
  esittelee puolikuivan Denverin altaan mikroilmastojen
  monimuotoisuutta. — "Denver" (Parks and recreation)
- Vuodesta 1974 Denver ja naapurikunnat ovat kunnostaneet South
  Platte -jokea virkistyskäyttöön; South Platte River Greenway kulkee
  35 mailia (56 km) pohjoiseen Adams Countyyn ja on saanut mm.
  Rudy Bruner Award for Urban Excellence -hopeamitalin 2001. —
  "Denver" (Parks and recreation)
- Vuoden 2022 Park Score -vertailussa Denverin puistojärjestelmä oli
  18. paras 50 väkirikkaimman yhdysvaltalaiskaupungin joukossa; 89
  prosenttia denveriläisistä asuu kymmenen minuutin kävelymatkan
  päässä puistosta. — "Denver" (Parks and recreation)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Matkaopas on NYKYTIETOA (resepti, linjaustarkennus 20.8.2026):
kuvat tuoreita, etusivukuva maltillinen pysty (w/h 0,60–0,85).

**J1. Perille ja liikkeelle.** Denverin kansainvälinen lentokenttä on
kaupungin virallinen sääasemapaikka noin 20 mailin (32 km) päässä
keskustasta. Kaukojunat: Amtrakin *California Zephyr* ja *Winter
Park Express* käyttävät Union Stationia. Vuonna 2015 metropolialueella
avautui uusi lähijunaverkko (25 kV 60 Hz). Keskustan 16th Street Mall
on mailin mittainen jalankulkukatu, jolla kulkee maksuton bussi
päästä päähän. — "Denver" (Transportation, History), "16th Street
Mall", `northamerica-valokuvat.js`

**J2. Museokortteli Civic Centerin kupeessa.** Denver Art Museumissa
on Daniel Libeskindin suunnittelema siipi; Denverin esittävän taiteen
keskus on maan toiseksi suurin Lincoln Centerin jälkeen. Kaupunki osti
abstraktin ekspressionistin Clyfford Stillin jäämistön 2004 ja
rakensi sille museon Denver Art Museumin viereen. Osavaltion
historian museo History Colorado Center avattiin huhtikuussa 2012, ja
sen naapureita ovat Byers-Evans House Museum ja Molly Brown House. —
"Denver" (Culture)

**J3. Vuorille päiväretkelle.** Red Rocks Park on Denverin oma
vuoristopuisto 16 kilometrin päässä lounaassa; kaupunki omistaa
lisäksi Winter Parkin hiihtokeskuksen vuoren 67 mailin (108 km)
päässä lännessä. Kaupungin vuoristopuistoja on noin 14 000 eekkeriä.
Denverillä on maine hyvin ulkoilmapainotteisena kaupunkina:
viikonloput vietetään vuorilla — talvella hiihtäen, kesällä vaeltaen,
kiiveten, melomassa ja telttaillen. — "Denver" (Parks and recreation,
Culture), "Red Rocks Amphitheatre"

**J4. Mitä täällä syödään.** Denver tunnetaan uusmeksikolaisesta
keittiöstä ja chilistä: vihreä ja punainen chilikastike, Colorado-
burrito, Denver-munakas, aamiaisburrito, empanadat, chiles rellenos
ja tamalet. Muita kaupungin ruokia ovat Rocky Mountain -osterit,
sateenkaarirautu ja Denver-voileipä. Denverissä ja naapurikunnissa on
runsaasti panimoita, ja kaupunki isännöi vuosittain Great American
Beer Festivalia. Kaupungissa on yksi maan suurimmista
meksikolaisamerikkalaisista väestöistä ja neljä suurta juhlaa, joista
Cinco de Mayo kerää yli 500 000 kävijää. — "Denver" (Culture)

**J5. Milloin kannattaa tulla.** Ilmasto on viileä puolikuiva, neljä
selvää vuodenaikaa, ja suurin osa sateesta tulee huhtikuun ja
elokuun välillä. Heinäkuu on lämpimin: keskimääräinen ylin 89,9 °F
(32,2 °C); vähintään 90 °F saavutetaan 38 päivänä vuodessa.
Joulukuu on kylmin, keskimääräinen ylin 44 °F (6,7 °C). Talvella
vuorottelevat lumijaksot ja chinook-tuulen leudot jaksot. Lunta
kertyy keskimäärin 53,5 tuumaa (136 cm) jaksolla 1981–2010, ja
mitattavan lumen tavallinen ikkuna on 17. lokakuuta – 27. huhtikuuta.
Ennätykset −29 °F (−33,9 °C) 9.1.1875 ja 105 °F (40,6 °C)
28.6.2018. Denver on rakeille altis: kymmenen kalleimman
yhdysvaltalaisen raekuuron joukossa on kolme Denverin myrskyä
(11.7.1990, 20.7.2009, 8.5.2017). — "Denver" (Climate)

**SÄÄRIVIÄ EI TULE.** `tools/hae-saanormaalit.mjs` täydentää vain
olemassa olevia `saatiedot.js`-rivejä, ja Open-Meteon arkisto vastasi
6.9.2026 suoraan pyyntöön **429 "Daily API request limit exceeded"**.
Lukuja ei keksitä (Samarkand-malli v965): `js/packs/saatiedot.js` jää
koskematta, lehti näkyy ilman säätä, ja oppaan sääjakso nojaa
en-Wikipedian Climate-osioon ja sanoo sen ääneen.

---

## 4. Kahdeksan kohdekartan kohdetta

Koordinaatit haettu en-Wikipedian rajapinnasta
(`action=query&prop=coordinates&redirects=1`) 6.9.2026. Etäisyydet
ovat omia laskelmiani koordinaattieroista (asteet × 111,32 km,
pituusasteille kerroin cos(39,74°) ≈ 0,769).

| # | Nimi suomeksi | Koordinaatit | Lähdeartikkeli |
|---|---|---|---|
| 1 | Coors Field | 39,75611°N 104,99417°W | "Coors Field" |
| 2 | Daniels & Fisherin torni | 39,74833°N 104,99528°W | "Daniels & Fisher Tower" |
| 3 | Esittävän taiteen keskus | 39,74444°N 104,99750°W | "Denver Performing Arts Complex" |
| 4 | Brown Palace -hotelli | 39,74417°N 104,98722°W | "Brown Palace Hotel (Denver)" |
| 5 | Katedraalibasilika | 39,74028°N 104,98194°W | "Cathedral Basilica of the Immaculate Conception (Denver)" |
| 6 | Denverin taidemuseo | 39,73719°N 104,98935°W | "Denver Art Museum" |
| 7 | Molly Brownin talo | 39,73750°N 104,98072°W | "Molly Brown House" |
| 8 | Kasvitieteellinen puutarha | 39,73250°N 104,96083°W | "Denver Botanic Gardens" |

**Pienin väli on 471 metriä** (Daniels & Fisherin torni – esittävän
taiteen keskus). Kaikki muut parit ovat yli 600 metrin päässä
toisistaan, joten 200 metrin sääntö ei pudota yhtään kohdetta.

**Rajausehdotus:** pohjoinen 39,7600, etelä 39,7280, länsi −105,0030,
itä −104,9550 → noin **3,6 × 4,1 km**.

**PUDOTETUT KOHTEET JA PERUSTELUT (kohdekartta ei toista lehden
juttuja — New Yorkin sääntö):**

- *Osavaltiotalo* (39,73923 / −104,98487): mailin merkki portaissa on
  noston K4 aihe.
- *Union Station* (koordinaatteja ei rajapinnasta): rautatien tulo on
  noston K3 aihe, ja asema on jo etusivun ennen–nyt-parissa.
- *Confluence Park* (39,752997 / −105,011766): kaupungin
  syntypaikka on noston K2 aihe.
- *Larimer Square* (39,74889 / −104,99861): sama aihe kuin K2
  (Larimerin valtaus ja vanhin katu) ja vain 373 metriä Daniels &
  Fisherin tornista.
- *Denverin luonnontieteen museo* (City Park): 4,5 km itään, venyttäisi
  rajauksen kahdeksaan kilometriin.
- *Denver Public Library* (39,737313 / −104,988246) ja *Byers–Evans
  House* (39,73722 / −104,98944): 190 ja 137 metriä taidemuseosta —
  alle 200 metrin säännön.
- *Denver Civic Center* (39,73944 / −104,98889): 251 metriä
  taidemuseosta, mutta aiheena sama museokortteli — jää oppaan
  jaksoon J2.
- *Red Rocks*: 16 km lounaaseen ja teemasivun noston L3 aihe.

---

## 5. Säätiedot

- **Keskustan koordinaatit:** 39,7400°N, 104,9900°W (tietolaatikko
  39°44′24″N 104°59′24″W). — "Denver" (infobox)
- **Köppen-luokka:** BSk, viileä puolikuiva. — "Denver" (Climate)
- **Aurinkotunnit:** noin 3 100 tuntia vuodessa. — "Denver" (Climate)
- **Kuukausinormaalit (Denver Water Department, 5 225 jalkaa,
  1991–2020), ylin päivälämpö °F:** tammi 48,5 · helmi 49,0 · maalis
  57,9 (loput normaalit ovat artikkelin weatherbox-mallineessa). —
  "Denver" (Climate, weather box)
- **Ilmastokaavio (climate chart, imperial, alin/ylin °F ja sade
  tuumina):** tammi 19/45/0,4 · helmi 20/46/0,4 · maalis 28/56/0,9 ·
  huhti 34/62/1,7 · touko 44/71/2,2 · kesä 53/83/1,9 · heinä 60/90/2,1
  · elo 58/88/1,6 · syys 50/80/1,4 · loka 37/65/1,0 · marras 26/53/0,6
  · joulu 18/44/0,4. — "Denver" (Climate, climate chart)
- **HUOM:** nämä eivät ole sama asia kuin `saatiedot.js`-rivin
  vaatimat ERA5 1991–2020 -normaalit celsiuksina. Riviä ei tehdä
  (429, ks. osio 3).

---

## 6. Kuva-aiheet ja Commons-kategoriavinkit

Erityishuomio: Denverin keskustan katukuvissa on paljon ihmisiä ja
liikennettä — kansikuvien on oltava LAAJOJA YLEISKUVIA (omistajan
linjaus 21.8.2026), ei yksityiskohtia eikä sisäkuvia. Vuoret ovat
kaupungin tunnusmerkki, joten siluetti vuorten edessä on paras
kansikuva-aihe.

**Kansikuvat (3), ehdotus:**
1. Keskustan siluetti lumihuippuisten Kalliovuorten edessä.
2. Kaupunki ylhäältä tai puistosta, vuoristo taustalla.
3. Union Stationin tai LoDo-korttelin laaja yleisnäkymä.

**Avauskuvat (3), ehdotus:**
1. Civic Centerin ja osavaltiotalon kupolin näkymä.
2. Red Rocksin monoliitit ja amfiteatteri ylhäältä.
3. City Parkin panoraama, jossa Mount Blue Sky näkyy siluetin takana.

**Ennen ja nyt:** valmis, tarkistettu pari on jo
`js/packs/northamerica-valokuvat.js`:n denver-lohkossa —
`Welcome Arch and Union Depot, Denver, Colo..jpg` (noin 1908,
Library of Congress) ja `Denver Union Station - June 2022 - Sarah
Stierch 01.jpg`. Sama asema molemmissa. Lisenssi ja tekijä on silti
tarkistettava uudelleen Commonsin extmetadatasta lehden lähderiviä
varten (muoto `Tekijä, Wikimedia Commons (LISENSSI)`).

**Commons-kategoriat kuvahakuun:**
- `Category:Denver, Colorado` ja `Category:Views of Denver`
- `Category:Skyline of Denver`
- `Category:Colorado State Capitol`
- `Category:Denver Union Station`
- `Category:Red Rocks Amphitheatre` ja `Category:Red Rocks Park`
- `Category:Denver Botanic Gardens`
- `Category:Denver Art Museum`
- `Category:Molly Brown House`
- `Category:Brown Palace Hotel`
- `Category:Coors Field`
- `Category:Daniels and Fisher Tower`
- `Category:Cathedral Basilica of the Immaculate Conception (Denver)`
- `Category:History of Denver, Colorado` (1800-luvun vedokset)
- `Category:Front Range` ja `Category:Mount Blue Sky`

**MINIATYYRIT:** kohdekartan kahdeksan kohdetta tarvitsevat
akvarelliminiatyyrit. Kirjoittaja EI generoi niitä (kustannussääntö,
yhteiset säännöt kohta 5) vaan listaa ne raporttiin.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Perustamispäivä 22.11. vai 17.11.1858.** "Denver"-artikkelin
   leipäteksti sanoo 22.11.1858 ja kantaa itse
   `{{contradictory inline}}`-merkinnän, jonka mukaan tietolaatikko
   sanoo 17.11.1858. **Ratkaisu:** kirjoita "marraskuussa 1858".
2. **Rautatien "pelastus" — kaksi päivämäärää.** Denver Pacific
   24.6.1870 (Cheyenne) ja Kansas Pacific elokuu 1870 (Kansas;
   kiskojen yhdistäminen Strasburgissa 15.8.1870). Omistajan
   1873-kehyksessä mainitaan Kansas Pacific 1870 — se pitää
   paikkansa, mutta Denver Pacific oli ensin. **Ratkaisu:** kerro
   molemmat.
3. **Korkeusharjoittelu ja hapen osapaine EI OLE lähteessä.**
   Visan kysymys 4 nojaa fysiologiaan, jota en-Wikipedian
   "Denver"-artikkelissa ei ole. Kirjoittaja ei saa esittää sitä
   Wikipedia-katteisena eikä keksiä lähdettä. Visan oma `fact`-kenttä
   selittää asian pelaajalle jo nyt.
4. **Sand Creek 1864.** Kerrotaan tapahtumana yhdellä neutraalilla
   virkkeellä ilman yksityiskohtia (pilari 4, spec-mantereet.md
   linjaus 1 ja P-Amerikka-linjaus). Ei uhrilukukiistaa, ei
   osapuolikehystä, ei kuvia.
5. **Rocky Flats, Ku Klux Klan, Soapy Smithin korruptio, vuoden 1972
   olympiapäätös ja nykypolitiikka JÄTETÄÄN POIS.** Ne ovat
   artikkelissa, mutta eivät kuulu lehden linjaan (ei
   nykypolitiikkaa, ei nykyrikollisuutta).
6. **Osavaltiotalon kultakupoli.** `northamerica-valokuvat.js`:n
   denver-lohko sanoo kupolin olevan päällystetty aidolla
   lehtikullalla muistona kultaryntäyksestä. en-Wikipedian
   "Colorado State Capitol" -artikkelin haettu osuus EI vahvista
   tätä. **Ratkaisu:** älä toista väitettä lehdessä ilman uutta
   lähdetarkistusta.
7. **Minitehtäväehdotus (ei osu visaan):** *"Mistä Red Rocksin
   kallioiden punainen väri johtuu?"* — vastaus "hapettuneista
   mineraaleista", ja se löytyy samalta sivulta nostosta L3. Visa ei
   kysy Red Rocksista mitään.
8. **Kuvateksti on yksi virke** (omistajan tarkennus 20.8.2026), ja
   ARTIKKELIT-intro on 7–10 virkettä (700–1 100 merkkiä).
   `js/packs/northamerica-artikkelit.js` tarvitsee avaimen `Denver`
   (kaupungin wiki-nimi js/packs/northamerica.js:ssä).
