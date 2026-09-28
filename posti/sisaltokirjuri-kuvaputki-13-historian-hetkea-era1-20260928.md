## 2026-09-28 — SISÄLTÖKIRJURI → KUVAPUTKI: 13 historian hetkeä, Balkan+ ja muut Euroopan kohteet

Fablen tilaus 28.9.2026 (14 kohdetta listattiin, mutta kohta 14 oli
tarkistusohje kohdalle 1 — AUT/pörssiromahdus — eikä oma sijainti;
ks. HUOM alla). Tekstit ovat valmiit tähän tilaukseen samalla kaavalla
kuin `posti/sisaltokirjuri-kuvaputki-5-historian-hetkea-euroopan-ohuimmat-20260927.md`:
kun kuvat saapuvat, kortit lisätään `js/packs/historian-hetket.js`:ään
täydellä kaavalla (ks. tiedoston oma otsikkokommentti ja
`tests/historian-hetket.test.mjs`), rooli `lahi` ensin, `kauko` toisena,
tiedostonimi `hetki-<id>-lahi-photo-v4.jpg` / `-kauko-photo-v4.jpg`.

**HUOM 1 (numerointi):** Tilauksessa oli otsikoitu "14 kohdetta", mutta
lista sisälsi vain 13 varsinaista sijaintia (1–13); kohta 14 oli
tarkistuspyyntö kohdalle 1, ei erillinen hetki. Tarkistus on tehty (ks.
HUOM 3) — tässä tilauksessa on siis 13 täydellistä hetkeä. Jos 14.
hetki oli tarkoitus olla jokin muu kohde, se pitää määritellä erikseen.

**HUOM 2 (koordinaattien tarkkuus):** Kaikki koordinaatit on tarkistettu
WebSearchilla 28.9.2026. Osa on tarkkoja rakennuskoordinaatteja
(esim. Sfatul Țării -palatsi, Latin-silta, Kalemegdan), osa arvioita,
koska tarkkaa pistettä ei ollut lähteissä:
- NLD (de Vlieter): Afsluitdijkin yleiskoordinaatti (53.0050, 5.1875) —
  Vlietermonumentin tarkkaa pistettä ei löytynyt erikseen.
- CHE (Gotthard): geometrinen keskikohta Göschenenin (46.6653, 8.5794)
  ja Airolon (46.5303, 8.6103) porttien välillä — todellinen
  läpimurtopiste maan alla ei ole tarkasti dokumentoitu julkisissa
  lähteissä.
- ALB (Vlorë): kaupungin yleiskoordinaatti — itsenäisyysmuseon
  (Ismail Qemalin talon) tarkkaa pistettä ei löytynyt erikseen.
- MKD (Kruševo): kaupungin keskustan yleiskoordinaatti.
- MNE (Rijeka Crnojevića): kylän yleiskoordinaatti — Obodin linnan
  tarkkaa rauniopistettä ei löytynyt erikseen.

**HUOM 3 (AUT/CHE/DNK-tarkistus, kuten pyydettiin):** `grep -n "iso: '"
js/packs/historian-hetket.js` osoittaa, että AUT:lla on jo kaksi hetkeä
(Beethovenin yhdeksäs sinfonia 1824, Kärntnertor; Mozartin Figaron häät
1786, Burgtheater) — kumpikaan ei liity pörssiromahdukseen, ei
päällekkäisyyttä. CHE:llä on jo yksi hetki (Einstein, Bernin
patenttitoimisto 1905) — ei päällekkäisyyttä Gotthardin kanssa. DNK:lla
on jo yksi hetki (viikinkilaiva, Roskildenvuono n. 1040) — ei
päällekkäisyyttä Christiansborgin palon kanssa. Malta-kohde on tässä
tilauksessa Pyhän Elmon linnakkeen kaatuminen 23.6.1565 — ERI hetki
kuin postilaatikon aiemmassa tilauksessa oleva Vallettan apulaivaston
saapuminen 7.9.1565 (Mellieħan lahti); ei päällekkäisyyttä.

**HUOM 4 (integroijalle, lehti-kategoriat puuttuvat):** `js/packs/
maa-kategoriat.js` ei vielä sisällä maalehteä kohteille SRB, ALB, MKD,
MNE, MDA, BLR (tarkistettu 28.9.2026), vaikka maiden ääriviivat ovat jo
`js/packs/maailmankartta.js`:ssä (VAIN EUROOPPA -linjauksen mukainen
karttatyö). Näiden kuuden hetken `lehti: { laji: 'maa', avain: '<ISO3>' }`
vaatii siis uuden maalehtikategorian lisäämisen ennen kuin
`node tools/paivita-hetkisivut.mjs` voi kirjoittaa sivun. AUT, NLD, CHE,
DNK, CYP, MLT ovat sen sijaan jo lehtikategorioissa (CYP, MLT, ja BIH
kaupunkilehtinä `nikosia`, `valletta`, `sarajevo`; AUT, NLD, CHE, DNK
maalehtinä).

---

### 1. Itävalta (AUT) — Wienin pörssikrahi 1873

```
id: 'wienin-porssikrahi-1873'
otsikko: 'Wien 1873 — kun huudot vaihtuvat hiljaisuudeksi'
nimio: 'Wienin krahi 1873'
paivays: '9.5.1873'
paikka: 'Väliaikainen pörssitalo, Schottenring, Wien'
iso: 'AUT'
lat: 48.2166, lon: 16.3648
lehti: { laji: 'kaupunki', avain: 'wien' }
```

**Teksti** (ihminen edellä, ääni-aloitus, ~133 sanaa): Joku huutaa
myyntitarjouksen, ja hetken päästä kymmenet huutavat perässä — kukaan
ei enää kuuntele ostajia, vain toisiaan. Wienin väliaikaisessa
pörssitalossa Schottenringillä on perjantai 9. toukokuuta 1873, ja
kurssit ovat pudonneet aamupäivällä niin jyrkästi, että pörssimeklari
tarraa pöydän reunaan tunteakseen edes jonkin pysyvän. Vain kahdeksan
päivää sitten keisari Franz Joseph avasi maailmannäyttelyn Praterissa,
ja koko Eurooppa oli tullut katsomaan Itävalta-Unkarin nousua —
rautatie- ja rakennusosakkeiden hinnat olivat kohonneet vuosia pelkällä
lupauksella. Nyt lupaus loppuu yhtä äkkiä kuin se alkoi: pankki
toisensa jälkeen ilmoittaa maksukyvyttömyydestä, ja poliisi joutuu
hajottamaan pörssisalin edustalle kerääntyneen väkijoukon. Krahi, jota
jälkipolvet kutsuvat nimellä "Der Krach", painaa Itävallan talouden
vuosien lamaan juuri samaan aikaan kun näyttelyvieraiden mukana
kaupunkiin leviää koleraepidemia. Seuraavien viikkojen aikana
yli kuusikymmentä pankkia ja rakennusyhtiötä ajautuu vararikkoon, ja
moni pieni säästäjä menettää elämänsä säästöt yhden ainoan aamupäivän
aikana.

**Lähikuva (rooli `lahi`)**: Pörssimeklari (1870-luvun tumma puku,
kellonvarsiketju liivissä) seisoo pörssisalin pylvään vieressä, kasvot
kalpeat, käsi puristaa rypistynyttä osaketodistusta; ympärillä
hämärästi näkyy huutavia miehiä, jotka heiluttavat papereita ilmassa.

**Kaukokuva (rooli `kauko`)**: Laaja näkymä väliaikaisen pörssitalon
salista Schottenringillä: satoja pukumiehiä tungoksessa lattialla
papereita heiluttaen, korkeat ikkunat päästävät sisään toukokuun
aamuvalon, ulkopuolella näkyy hälyytynyt väkijoukko kadulla.

**Lehtijohdanto**: Wienin pörssi romahti 9. toukokuuta 1873 vain viikko
maailmannäyttelyn avajaisten jälkeen — "Der Krach" painoi Itävallan
talouden vuosien lamaan.

**Minitehtävä**: Kysymys "Mikä avattiin Wienissä vain viikkoa ennen
pörssiromahdusta 1873?" / vaihtoehdot: Maailmannäyttely (oikea), Uusi
rautatieasema, Keisarillinen ooppera, Pörssin uusi rakennus / fakta:
Keisari Franz Joseph avasi Wienin maailmannäyttelyn Praterissa
1.5.1873; pörssi romahti kahdeksan päivää myöhemmin 9.5.1873.

---

### 2. Alankomaat (NLD) — Afsluitdijkin viimeinen aukko 1932

```
id: 'afsluitdijkin-viimeinen-aukko-1932'
otsikko: 'De Vlieter 1932 — meri lakkaa kahtia jakamasta'
nimio: 'Vlieter 1932'
paivays: '28.5.1932'
paikka: '"De Vlieter", Afsluitdijk'
iso: 'NLD'
lat: 53.0050, lon: 5.1875
lehti: { laji: 'maa', avain: 'NLD' }
```

**Teksti** (lähikuva-aloitus, ~132 sanaa): Nosturinkuljettaja pitää
kättä vivulla ja katsoo alas viimeistä kapeaa vesirakoa, joka erottaa
vielä kaksi patoa toisistaan — muutama metri kiveä ja savea, ei enää
mitään. Lauantaina 28. toukokuuta 1932 kello 13.02 kolme MUZ-yhtiön
kelluvaa nostokurkea laskee viimeisen kivilastin paikalleen "de
Vlieterin" kohdalla, ja koko Afsluitdijk, jota on rakennettu vuodesta
1927 poikki Zuiderzeen suulle, sulkeutuu. Kaikkien lähellä olevien
laivojen höyrypillit soivat yhtä aikaa, ja rannalle kokoontuneet
ihmiset huutavat, kun viimeinen aukko katoaa veden alle. Työmaalla on ollut käynnissä
kilpajuoksu ajan kanssa, sillä edellisen talven myrskyt olivat jo
kerran vaurioittaneet keskeneräistä patoa, ja insinöörit halusivat
viimeistellä sulun ennen seuraavaa myrskykautta. Hetki päättää
insinööri Cornelis Lelyn vuosikymmeniä vanhan suunnitelman: Pohjanmeren
suolainen Zuiderzee lakkaa olemasta ja muuttuu vähitellen
makeavetiseksi IJsselmeeriksi, ja Alankomaat saa 32 kilometrin
patotien, joka suojaa satojatuhansia ihmisiä tulvilta ja avaa uutta
maata pengerryksille.

**Lähikuva (rooli `lahi`)**: Nosturinkuljettaja (1930-luvun
työhaalari, lippalakki) kurottautuu kelluvan nosturin ohjaamosta
katsomaan alas kapenevaa vesirakoa, kädet ohjausvivulla, ilme
jännittynyt keskittyminen; taustalla sumeana toinen nosturi ja padon
reuna.

**Kaukokuva (rooli `kauko`)**: Laaja ilmakuvamainen näkymä
Afsluitdijkin viimeisestä aukosta: kolme kelluvaa nostokurkea keskellä
kapeaa vesiväylää, kivilasteja pinottuna kummallakin puolella, laivoja
rivissä höyrytorvet soimassa, tasainen Alankomaiden rantaviiva
horisontissa.

**Lehtijohdanto**: Afsluitdijkin viimeinen aukko suljettiin 28.
toukokuuta 1932 kello 13.02 — Zuiderzeestä tuli patojen taakse
IJsselmeeri.

**Minitehtävä**: Kysymys "Miksi Afsluitdijk rakennettiin?" /
vaihtoehdot: Suojaamaan tulvilta ja luomaan uutta maata (oikea),
Sotilaallisena linnoituksena, Rautatietä varten, Kalastussatamaksi /
fakta: Afsluitdijk sulki Zuiderzeen mereltä 1932, muutti sen
makeavetiseksi IJsselmeeriksi ja suojasi aluetta tulvilta.

---

### 3. Sveitsi (CHE) — Gotthardin läpimurto 1880

```
id: 'gotthardin-lapimurto-1880'
otsikko: 'Gotthard 1880 — valokuva kulkee kalliossa'
nimio: 'Läpimurto 1880'
paivays: '29.2.1880'
paikka: 'Gotthardin rautatietunnelin keskikohta, Göschenenin ja Airolon välissä'
iso: 'CHE'
lat: 46.5978, lon: 8.5949
lehti: { laji: 'maa', avain: 'CHE' }
```

**Teksti** (esine-aloitus, ~140 sanaa): Pieni valokuva kulkee käsistä
käsiin viimeisen kivikerroksen läpi ennen kuin kukaan ehtii sanoa
mitään. Se esittää Louis Favrea, insinööriä, joka johti Gotthardin
rautatietunnelin louhintaa vuodesta 1872, mutta joka kuoli
sydänkohtaukseen tunnelissa heinäkuussa 1879 — kahdeksan kuukautta
ennen tätä hetkeä. Sunnuntaina 29. helmikuuta 1880 pohjoisesta
Göschenenistä ja etelästä Airolosta louhitut käytävät kohtaavat vihdoin
syvällä Gotthard-massiivin sisällä, lähes 1 700 metrin kiven alla, ja
saksankielinen ja italiankielinen työryhmä puhkaisevat viimeisen ohuen
kivimuurin toistensa väliltä. Ensimmäinen kättely tapahtuu reiän läpi,
ennen kuin kukaan pääsee kokonaan toiselle puolelle. Kahdeksan vuoden
louhinnan aikana yli 200 työmiestä on kuollut onnettomuuksissa ja
työtaudeissa, mutta 15 kilometrin tunneli, Euroopan tuolloin pisin,
yhdistää pian Sveitsin pohjoisen ja eteläisen puolen ilman
vuoristosolaa. Sanomalehdet ympäri Eurooppaa julkaisevat uutisen jo
seuraavana aamuna lennättimellä, ja rautatieyhtiöt alkavat heti
suunnitella aikatauluja, joissa Milano ja Zürich ovat toisistaan vain
tuntien, ei enää päivien, matkan päässä.

**Lähikuva (rooli `lahi`)**: Kaksi pölyistä ja hikistä
louhintatyöläistä (1880-luvun kaivostyöasu, öljylamppu kypärässä)
kurottautuvat vastakkaisilta puolilta kapeaa kivimurrosta kohti
toisiaan pimeässä tunnelissa, kädet melkein koskettavat, ilme
uskomaton helpotus ja ilo; taustalla hämärästi telineitä ja
louhintavälineitä.

**Kaukokuva (rooli `kauko`)**: Laaja näkymä tunnelin sisältä pitkän
louhintakäytävän suunnasta: kapea kivikäytävä katoaa pimeyteen
molempiin suuntiin, öljylamppuja rivissä seinillä, hienoista pölyä ja
savua ilmassa valonsäteissä, kaukana pieni valopilkku josta toinen
ryhmä lähestyy.

**Lehtijohdanto**: Gotthardin rautatietunnelin pohjois- ja
eteläpuolen louhijat kohtasivat syvällä kalliossa 29. helmikuuta 1880
— insinööri Louis Favre ei elänyt näkemään sitä.

**Minitehtävä**: Kysymys "Mitä Gotthardin tunnelin läpimurrossa 1880
tapahtui insinööri Louis Favrelle?" / vaihtoehdot: Hän oli kuollut jo
vuotta aiemmin (oikea), Hän johti juhlaa paikan päällä, Hän erosi
tehtävästään, Hän muutti Italiaan / fakta: Louis Favre kuoli
sydänkohtaukseen tunnelissa heinäkuussa 1879; hänen valokuvansa kulki
läpimurtoaukosta helmikuussa 1880.

---

### 4. Tanska (DNK) — Christiansborgin palo 1884

```
id: 'christiansborgin-palo-1884'
otsikko: 'Christiansborg 1884 — savu valtaosien alla'
nimio: 'Linnanpalo 1884'
paivays: '3.10.1884'
paikka: 'Christiansborgin linna, Kööpenhamina'
iso: 'DNK'
lat: 55.6763, lon: 12.5806
lehti: { laji: 'kaupunki', avain: 'kobenhavn' }
```

**Teksti** (ohikulkeva hetki -aloitus, ~133 sanaa): Vartija pysähtyy
käytävällä ja nuuskii ilmaa — hajussa on jotain, joka ei kuulu
perjantai-iltapäivään Christiansborgin linnassa. Se on 3. lokakuuta
1884, ja savu nousee huoneesta aivan Riddersalenin, ritarisalin,
alapuolelta, missä vanha kaakeliuuni on juuri sytyttänyt jotain
palamaan. Kukaan ei vielä tiedä, että linnan seinien sisällä on
vuosikymmenten aikana syntynyt lukemattomia onttoja välitiloja, jotka
vetävät liekkiä eteenpäin kuin savupiiput. Palokunta saapuu nopeasti,
mutta tuli leviää käytävästä käytävään nopeammin kuin kukaan osaa sitä
pysäyttää. Yön aikana koko linnan päärakennus — valtiopäivien,
hallituksen ja kuninkaan asuintilojen koti — palaa lähes tyhjäksi
kuoreksi; vain 1760-luvun hoviteatteri ja ratsastushalli selviävät
liekeiltä. Tanska on menettänyt toisen Christiansborginsa vain reilut
viisikymmentä vuotta ensimmäisen palon jälkeen, ja rauniot seisovat
vuosikymmenen ennen kuin kolmas linna nousee samalle paikalle.
Kuninkaallinen kirjasto ja osa valtionarkistosta ehditään pelastaa,
mutta suuri osa taidekokoelmasta tuhoutuu liekeissä lopullisesti.

**Lähikuva (rooli `lahi`)**: Univormuinen linnanvartija (1880-luvun
tanskalainen virkapuku, lyhty kädessä) seisoo kiviholvatussa
käytävässä pysähtyneenä, pää kääntyneenä kohti savun tuoksua, ilme
hämmentynyt epäusko muuttumassa hälytykseksi; ohut savuvana näkyy
käytävän toisessa päässä.

**Kaukokuva (rooli `kauko`)**: Laaja näkymä Christiansborgin linnasta
Slotsholmenilta iltahämärässä: liekit ja savupilvet nousevat katon
läpi useasta kohdasta rakennusta, palokuntalaisia ja väkijoukkoa
kanavan rannalla, heijastus tulesta näkyy Frederiksholmin kanavan
vedessä.

**Lehtijohdanto**: Christiansborgin linna paloi lähes maan tasalle 3.
lokakuuta 1884 — vain hoviteatteri ja ratsastushalli selvisivät, ja
kolmas linna rakennettiin vasta vuosikymmenen kuluttua.

**Minitehtävä**: Kysymys "Mitkä osat Christiansborgista selvisivät
vuoden 1884 palosta?" / vaihtoehdot: Hoviteatteri ja ratsastushalli
(oikea), Koko itäsiipi, Vain kirkko, Ei mikään osa / fakta: Palo
tuhosi lähes koko linnan 3.10.1884, mutta 1760-luvun hoviteatteri ja
ratsastushalli jäivät pystyyn.

---

### 5. Serbia (SRB) — Belgradin piiritys 1456

```
id: 'belgradin-piiritys-1456'
otsikko: 'Belgrad 1456 — talonpojat murtavat piirityksen'
nimio: 'Piiritys 1456'
paivays: '21.–22.7.1456'
paikka: 'Belgradin linnoitus (Kalemegdan)'
iso: 'SRB'
lat: 44.8233, lon: 20.4503
lehti: { laji: 'maa', avain: 'SRB' }
```

**Teksti** (kysymys-aloitus, ~126 sanaa): Selviääkö hän tästä yöstä
hengissä? Talonpoika, joka on tarttunut viikatteeseen ja
tervasoihtuun eikä miekkaan, ei tiedä sitä vielä, kun hän ryntää alas
Belgradin linnoituksen muurilta kohti ottomaanien tykistöleiriä. On
heinäkuun loppu 1456, ja unkarilainen sotapäällikkö János Hunyadi on
juuri torjunut viikkoja kestäneen tykistöpommituksen, mutta varsinainen
käänne tulee yllättäen: fransiskaanimunkki Giovanni da Capistrano on
koonnut tuhansia aseistamattomia ristiretkeläisiä linnoituksen
ympärille, ja kun osa heistä hyökkää omin päin vihollisen leiriin, koko
rintama seuraa perässä hallitsemattomasti. Sulttaani Mehmed II,
valloittanut Konstantinopolin vain kolme vuotta aiemmin, haavoittuu
taistelussa ja joutuu perääntymään joukkoineen. Piiritykseen tuotu
raskas tykistö ja suuri osa osmanien leirivarusteista jäävät
kristittyjen haltuun, kun leiri vallataan yllätyshyökkäyksen jälkeen.
Belgrad pysyy
kristityn Euroopan käsissä vielä seuraavat seitsemänkymmentä vuotta, ja
voitosta kerrotaan tulleen katolisen kirkon keskipäivän kellonsoiton
perinteen taustalle useissa maissa.

**Lähikuva (rooli `lahi`)**: Aseistamaton talonpoika-ristiretkeläinen
(1450-luvun karkea vaate, viikate tai tervasoihtu kädessä) ryntää alas
kivimuurilta kohti savuista leiriä, kasvoilla sekä pelko että raivo,
muita samanlaisia hahmoja juoksee hänen vierellään; taustalla
hämärästi linnoituksen torni.

**Kaukokuva (rooli `kauko`)**: Laaja näkymä Belgradin linnoituksesta
(Kalemegdan) Sava- ja Tonava-jokien yhtymäkohdassa: savuavia tykkejä
ja telttoja ottomaanileirissä joen rannalla, muurilta virtaa alas
väkijoukko soihtuineen, iltahämärä taivas savun peitossa.

**Lehtijohdanto**: Belgradin piiritys päättyi heinäkuussa 1456
yllättävään talonpoikaisten ristiretkeläisten hyökkäykseen, joka
haavoitti sulttaani Mehmed II:n ja pysäytti osmanien etenemisen
Euroopassa vuosikymmeniksi.

**Minitehtävä**: Kysymys "Kuka johti Belgradin puolustusta 1456?" /
vaihtoehdot: János Hunyadi (oikea), Vlad Seivästäjä, Skanderbeg,
Mehmed II / fakta: Unkarilainen sotapäällikkö János Hunyadi ja munkki
Giovanni da Capistrano torjuivat Mehmed II:n piirityksen heinäkuussa
1456.

---

### 6. Bosnia ja Hertsegovina (BIH) — Franz Ferdinandin salamurha 1914

```
id: 'franz-ferdinandin-salamurha-1914'
otsikko: 'Sarajevo 1914 — auto pysähtyy väärään paikkaan'
nimio: 'Latin-silta 1914'
paivays: '28.6.1914'
paikka: 'Latin-silta, Sarajevo'
iso: 'BIH'
lat: 43.8579, lon: 18.4289
lehti: { laji: 'kaupunki', avain: 'sarajevo' }
```

**Teksti** (lähikuva-aloitus, ~133 sanaa): Kuljettaja tajuaa virheen
vasta, kun on jo kääntynyt väärään kujaan: reitti piti muuttaa
sairaalavierailun vuoksi, mutta kukaan ei ehtinyt kertoa sitä hänelle.
Se on sunnuntai 28. kesäkuuta 1914, ja arkkiherttua Franz Ferdinand
istuu avoautossa vaimonsa Sophien vierellä Sarajevossa, missä joku on
jo aiemmin samana aamuna heittänyt pommin heidän saattueensa kohti.
Kuljettaja yrittää perua autoa takaisin Latin-sillan kupeessa, mutta
moottori sammuu juuri siinä kohtaa, missä nuori Gavrilo Princip seisoo
katukahvilan edessä — yksi kuudesta salamurhaajasta, joka oli jo
luullut suunnitelman epäonnistuneen. Princip ampuu kahdesti muutaman
metrin päästä. Hän yrittää vielä nielaista syanidikapselin ja kääntää
pistoolin itseään kohti, mutta väkijoukko ehtii ensin lyödä aseen
maahan. Molemmat kuolevat tunnin sisällä. Uutinen kulkee
lennättimellä Wieniin saman päivän iltana, ja kuukauden kuluessa
Itävalta-Unkari julistaa sodan Serbialle — ketju, joka vetää mukaansa
koko Euroopan suurvallat ja käynnistää ensimmäisen maailmansodan.

**Lähikuva (rooli `lahi`)**: Univormuinen kuljettaja (1910-luvun
autonkuljettajan asu, lippalakki) kääntyy hämmentyneenä ohjauspyörän
takana huomatessaan ajaneensa väärään kujaan, avoauton takapenkillä
epätarkkana näkyy arkkiherttuapari; nuori mies katukahvilan edustalla
kääntyy katsomaan autoa yllättyneenä.

**Kaukokuva (rooli `kauko`)**: Laaja näkymä Latin-sillasta ja
Miljacka-joen rantakadusta Sarajevossa: avoauto pysähtyneenä kadun
kulmassa, katukahviloita ja pieni väkijoukko kadun varrella, silta ja
jokiranta kesäaamun valossa.

**Lehtijohdanto**: Arkkiherttua Franz Ferdinandin auto ajoi
vahingossa Latin-sillan kulmaan Sarajevossa 28. kesäkuuta 1914 —
suoraan salamurhaajan eteen, joka luuli tehtävänsä jo epäonnistuneen.

**Minitehtävä**: Kysymys "Miksi Franz Ferdinandin auto pysähtyi
Latin-sillan luona 1914?" / vaihtoehdot: Kuljettaja ajoi vahingossa
väärään kujaan (oikea), Auto hajosi teknisesti, Väkijoukko esti tien,
Se oli suunniteltu pysähdyspaikka / fakta: Reittimuutosta ei kerrottu
kuljettajalle; auto pysähtyi perääntyessään juuri Gavrilo Principin
eteen.

---

### 7. Albania (ALB) — Vlorën itsenäisyysjulistus 1912

```
id: 'vloren-itsenaisyys-1912'
otsikko: 'Vlorë 1912 — lippu, joka ommeltiin yöllä'
nimio: 'Vlorë 1912'
paivays: '28.11.1912'
paikka: 'Ismail Qemalin talo, Vlorë'
iso: 'ALB'
lat: 40.4670, lon: 19.4901
lehti: { laji: 'maa', avain: 'ALB' }
```

**Teksti** (esine-aloitus, ~131 sanaa): Neula pistää kangasta vielä
muutama tunti ennen kuin lippu nousee salkoon. Marigo Posio istuu
yönsä ompelemassa punaista kangasta ja mustaa kaksipäistä kotkaa,
koska lippu, jonka Ismail Qemali oli ensin lainannut, vaadittiin
takaisin viime hetkellä. Perjantaina 28. marraskuuta 1912 vanha
diplomaatti Qemali seisoo Vlorën satamakaupungin vaatimattomassa
talossa, joka toimii samalla sairaalana, ja lukee ääneen julistuksen:
Albania on itsenäinen, viiden vuosisadan osmanivallan jälkeen. Balkanin
sodat ovat ajaneet Ottomaanien valtakunnan ahtaalle, ja albaanijohtajat
ovat kokoontuneet Vlorëen nopeasti, ennen kuin naapurimaat ehtivät
jakaa alueen keskenään: Serbian, Montenegron ja Kreikan armeijat ovat jo
tunkeutuneet syvälle albaanien asuttamille alueille pohjoisessa ja
idässä. Talosta tulee heti hallituksen ensimmäinen
istuntopaikka, ja Qemalista maan ensimmäinen pääministeri. Suurvallat
tunnustavat itsenäisyyden vasta seuraavana vuonna Lontoon
konferenssissa, mutta lippu, joka nousi tuona iltana Vlorën ylle, on
sama malli, joka liehuu Albaniassa vielä tänäänkin.

**Lähikuva (rooli `lahi`)**: Vanhempi nainen (1910-luvun albanialainen
kaupunkilaisasu, huivi) istuu öljylampun valossa ompelemassa punaista
lippukangasta, neula ja lanka kädessä, keskittynyt ilme; taustalla
epätarkkana valmis musta kotka-kuvio kankaalla.

**Kaukokuva (rooli `kauko`)**: Laaja näkymä Vlorën satamakadusta
iltahämärässä: kaksikerroksinen talo, jonka parvekkeelta punainen
lippu juuri nousee, pieni ihmisjoukko kadulla katsomassa ylös, satama
ja laivojen mastot taustalla.

**Lehtijohdanto**: Ismail Qemali julisti Albanian itsenäiseksi Vlorën
satamatalossa 28. marraskuuta 1912 — lippu, joka nousi samana iltana,
ommeltiin viime hetkellä uudestaan.

**Minitehtävä**: Kysymys "Kuka ompeli Albanian itsenäisyyslipun
Vlorëssa 1912?" / vaihtoehdot: Marigo Posio (oikea), Ismail Qemalin
vaimo, Eqrem Vlora itse, Tuntematon ompelija Roomasta / fakta:
Alkuperäinen lainattu lippu vaadittiin takaisin, joten Marigo Posio
ompeli uuden yöllä ennen julistusta 28.11.1912.

---

### 8. Pohjois-Makedonia (MKD) — Kruševon tasavalta 1903

```
id: 'krusevon-tasavalta-1903'
otsikko: 'Kruševo 1903 — kymmenen päivän tasavalta'
nimio: 'Kruševo 1903'
paivays: '2.8.1903'
paikka: 'Kruševo'
iso: 'MKD'
lat: 41.3742, lon: 21.2458
lehti: { laji: 'maa', avain: 'MKD' }
```

**Teksti** (ääni-aloitus, ~125 sanaa): Kirkonkellot soivat kaikkialla
Kruševossa samaan aikaan, ja hetken ne peittävät alleen jokaisen muun
äänen. On Elian päivä, Ilinden, 2. elokuuta 1903, ja makedonialaiset
kapinalliset ovat juuri vallanneet pienen vuoristokaupungin
ottomaanihallinnolta. Opettaja ja kapinallisjohtaja Nikola Karev astuu
torille ja lukee ääneen manifestin, jolla kaupunki julistautuu
tasavallaksi — sekakomitea, jossa istuvat sekä slaavilaiset että
kutzovlach-aromanialaiset asukkaat, hallitsee kaupunkia yhdessä.
Kapinallisten riveissä taistelee puutteen vuoksi myös naisia ja
nuoria poikia, joille on jaettu kivääreitä ilman koulutusta. Kellojen
soidessa moni asukas ei vielä tiedä, kuinka lyhyeksi juhla
jää: kymmenen päivän kuluttua osmanijoukot palaavat tykistön kanssa, ja
Kruševo poltetaan suurelta osin maan tasalle kostoksi. Silti hetki
torilla jää elämään symbolina — ensimmäisenä kertana, kun
makedonialaiset kapinalliset hallitsivat kaupunkia omilla säännöillään
edes hetken, vuosikymmeniä ennen kuin Makedonia sai koskaan oman
valtion.

**Lähikuva (rooli `lahi`)**: Opettajapukuinen mies (1900-luvun alun
balkanilainen kaupunkilaisasu, viikset, käsissä paperiarkki) seisoo
kivisellä torilla lukemassa julistusta ääneen, ilme vakava ja
jännittynyt; ympärillä kuuntelee sekalainen joukko kaupunkilaisia, osa
aseistautuneita kapinallisia.

**Kaukokuva (rooli `kauko`)**: Laaja näkymä Kruševon vuoristokaupungin
torista ja kivikattoisista taloista rinteellä: kirkontorni taustalla,
pieni väkijoukko kokoontuneena torille, vuoristomaisema ympärillä
elokuun aamuvalossa.

**Lehtijohdanto**: Kruševon kaupunki julistautui tasavallaksi
Ilindenin kapinan aikana 2. elokuuta 1903 — se kesti vain kymmenen
päivää ennen ottomaanien vastaiskua.

**Minitehtävä**: Kysymys "Kuinka kauan Kruševon tasavalta kesti
1903?" / vaihtoehdot: Noin kymmenen päivää (oikea), Yhden vuoden,
Kolme kuukautta, Vain muutaman tunnin / fakta: Nikola Karevin johtama
Kruševon tasavalta julistettiin 2.8.1903 ja kukistettiin ottomaanien
vastahyökkäyksellä noin kymmenen päivää myöhemmin.

---

### 9. Montenegro (MNE) — Obodin kirjapaino 1494

```
id: 'obodin-kirjapaino-1494'
otsikko: 'Obod 1494 — musteen viimeinen arkki'
nimio: 'Obod 1494'
paivays: '4.1.1494'
paikka: 'Obodin kirjapaino, Rijeka Crnojevića'
iso: 'MNE'
lat: 42.3500, lon: 19.0330
lehti: { laji: 'maa', avain: 'MNE' }
```

**Teksti** (lähikuva-aloitus, ~126 sanaa): Munkki Makarijen sormet
ovat mustat musteesta, kun hän nostaa viimeisen painetun arkin
puristimesta ja tarkistaa kirjainrivit vielä kerran vasten ikkunasta
lankeavaa valoa. On 4. tammikuuta 1494, ja Obodin linnan kivitornissa
Rijeka Crnojevićan varrella, lähellä Cetinjeä, valmistuu Oktoih
prvoglasnik — ensimmäisen äänilajin oktoehos, kirkkolaulukirja.
Ruhtinas Đurađ Crnojević on hankkinut painokoneen ja kirjaimet
Venetsiasta vain vuosi aiemmin, ja Makarije on oppinut käyttämään niitä
kirkkoslaaviksi, kirjaimet valettuina käsin metallista. Paperi tuodaan laivoilla samaa
reittiä Venetsiasta kuin kirjaimetkin, sillä lähialueella ei ole
yhtään paperimyllyä. Kirja on
ensimmäinen painettu teos, jonka eteläslaavilaiset ovat koskaan
tuottaneet omalla kielialueellaan — aikaisemmin kaikki kirjat oli
kopioitava käsin munkkien luostareissa vuosikausia. Zeta, pieni
ruhtinaskunta Balkanin vuorten keskellä, ehtii painaa vain viisi kirjaa
ennen kuin osmanien paine pakottaa Crnojevićin suvun pakenemaan ja
painokone katoaa historiasta jäljettömiin.

**Lähikuva (rooli `lahi`)**: Tummapukuinen munkki (1490-luvun
ortodoksinen kaapu, musteiset sormet) nostaa juuri painettua
paperiarkkia puisesta painopuristimesta ikkunan valoon, katse
keskittyneenä riveihin; taustalla hämärästi latomispöytä ja
metallikirjaimia.

**Kaukokuva (rooli `kauko`)**: Laaja näkymä Obodin kivilinnasta Rijeka
Crnojevićan joen varrella: pieni tornirakennus jokirannalla,
ympärillä karua vuoristomaisemaa ja kapea jokilaakso, talvinen
aamuvalo.

**Lehtijohdanto**: Obodin kirjapainossa valmistui 4. tammikuuta 1494
Oktoih prvoglasnik — ensimmäinen eteläslaavien oma painettu kirja,
tehty vain viisi vuotta ennen painokoneen katoamista osmanien tieltä.

**Minitehtävä**: Kysymys "Mikä kirja valmistui Obodin painossa
4.1.1494?" / vaihtoehdot: Oktoih prvoglasnik (oikea), Raamatun
ensimmäinen käännös, Zetan lakikirja, Venetsian kauppasopimus / fakta:
Munkki Makarije painoi kirkkoslaavilaisen laulukirjan ruhtinas Đurađ
Crnojevićin hankkimalla painokoneella — ensimmäisen eteläslaavien
omalla alueella painetun kirjan.

---

### 10. Kypros (CYP) — Britannian lippu Nikosiassa 1878

```
id: 'britannian-lippu-nikosiassa-1878'
otsikko: 'Nikosia 1878 — puolikuu laskee, risti nousee'
nimio: 'Nikosia 1878'
paivays: '12.7.1878'
paikka: 'Paafoksen portin kasarmi, Nikosia'
iso: 'CYP'
lat: 35.1768, lon: 33.3573
lehti: { laji: 'kaupunki', avain: 'nikosia' }
```

**Teksti** (ohikulkeva hetki -aloitus, ~134 sanaa): Kaupustelija
pysähtyy torilla kesken huutokaupan, kun hän huomaa muiden kääntyneen
katsomaan Paafoksen portin yläpuolelle. On perjantai 12. heinäkuuta
1878, ja amiraali Lordi John Hay astuu vanhan ottomaanikasarmin pihalle
ottamaan hallinnon virallisesti vastaan mutasarrif Beşir Pashalta.
Berliinin kongressissa kesäkuussa solmittu salainen sopimus on antanut
Britannialle Kyproksen hallinnon vastineeksi tuesta Venäjää vastaan,
vaikka saari virallisesti pysyy osana Osmanien valtakuntaa. Kun
ottomaanien puolikuulippu lasketaan ja Union Jack nousee sen tilalle,
kukaan torilla ei vielä tiedä, että brittihallinto kestää saarella
lähes kahdeksankymmentä vuotta. Ensimmäinen kuvernööri saapuu vasta
myöhemmin syksyllä, ja väliaikainen hallintorakennus pystytetään
Käärmemäelle esivalmistetuista osista, jotka on kuljetettu laivalla
Englannista Egyptin ja Ceylonin kautta. Osa nikosialaisista toivoo
uuden isännän tuovan vihdoin helpotusta vuosikymmenten verotus- ja
maakiistoihin, osa pelkää vaihtavansa vain yhden vieraan hallitsijan
toiseen. Nikosian kaduilla elämä jatkuu tavallisena päivänä — vain
lippu portin yllä on vaihtunut.

**Lähikuva (rooli `lahi`)**: Kaupustelija (1870-luvun kyproslainen
kansanpuku, turbaani tai lakki) pysähtyy torikojunsa ääreen kesken
kaupankäynnin, katse suuntautuu ylös muurin suuntaan, kasvoilla
uteliaisuus; taustalla epätarkkana kasarmin muuria ja lipputankoa.

**Kaukokuva (rooli `kauko`)**: Laaja näkymä Paafoksen portista ja sitä
ympäröivästä muurista Nikosiassa: univormuisia sotilaita rivissä
kasarmin pihalla, väkijoukko kadulla katsomassa ylös lipputankoa,
kaupungin kivimuurit ja moskeijan minareetti taustalla.

**Lehtijohdanto**: Britannia otti Kyproksen hallintaansa Nikosiassa
heinäkuussa 1878 Berliinin kongressin salaisen sopimuksen nojalla —
brittihallinto kesti saarella lähes kahdeksankymmentä vuotta.

**Minitehtävä**: Kysymys "Miksi Britannia sai Kyproksen hallinnon
1878?" / vaihtoehdot: Vastineeksi tuesta Osmanien valtakunnalle
Venäjää vastaan (oikea), Sotilaallisella valloituksella, Ostamalla
saaren kullalla, Kreikan välityksellä / fakta: Berliinin kongressin
salainen sopimus kesäkuulta 1878 antoi Britannialle Kyproksen
hallinnon; virallinen vallanvaihto tapahtui Nikosiassa 12.7.1878.

---

### 11. Malta (MLT) — Pyhän Elmon linnakkeen kaatuminen 1565

```
id: 'pyhan-elmon-linnake-1565'
otsikko: 'Pyhä Elmo 1565 — viimeinen aamu muurilla'
nimio: 'Fort St Elmo 1565'
paivays: '23.6.1565'
paikka: 'Pyhän Elmon linnake, Sciberras-niemi (nyk. Valletta), Malta'
iso: 'MLT'
lat: 35.9020, lon: 14.5188
lehti: { laji: 'kaupunki', avain: 'valletta' }
```

*(HUOM: eri hetki kuin postilaatikon aiemmassa tilauksessa oleva
"Valletta 1565 — purjeet horisontissa" [apulaivaston saapuminen
7.9.1565, Mellieħan lahti] — tämä on piirityksen ALKUVAIHE, linnakkeen
kaatuminen, eri paikka ja päivämäärä samalla saarella.)*

**Teksti** (kysymys-aloitus, ~123 sanaa): Onko tänä aamuna enää mitään
puolustettavaa? Pyhän Elmon linnakkeen viimeiset puolustajat,
uupuneita ja lähes kaikki haavoittuneita, ovat taistelleet
kaksikymmentäkahdeksan päivää Mustafa Pashan tykistöä ja jatkuvia
rynnäköitä vastaan pienellä hiekkakivilinnakkeella Sciberras-niemen
kärjessä. Torstaina 23. kesäkuuta 1565 osmanijoukot murtautuvat
vihdoin sisään, ja suurmestari Jean de Vallette, joka on yöllä
lähettänyt viestejä uimarien mukana linnakkeen ja pääkaupungin Birgun
välillä, tietää jo, ettei apua ehdi tulla ajoissa. Lähes koko St Elmon
noin 1 500 hengen varuskunta kaatuu tai teloitetaan; muutama ritari
onnistuu uimaan yli sataman. Osmaanit menettävät piirityksessä
valloittaakseen pienen linnakkeen niin paljon aikaa ja väkeä —
arviolta kahdeksan päivää jokaista viikkoa vastaan, jonka Vallette oli
laskenut — että koko suuri piiritys lopulta epäonnistuu syyskuussa.
Vuosia myöhemmin uusi pääkaupunki nousee samalle niemelle ja saa
nimensä suurmestarilta: Valletta.

**Lähikuva (rooli `lahi`)**: Uupunut ritari tai jalkaväen sotilas
(1560-luvun panssaripaita, sidottuja haavoja, kypärä hukassa) seisoo
murtuneen muurinaukon edessä miekka kädessä, katse suoraan tulossa
oleviin hyökkääjiin, ilme väsynyt mutta päättäväinen; taustalla savua
ja romahtaneita kiviä.

**Kaukokuva (rooli `kauko`)**: Laaja näkymä Pyhän Elmon linnakkeesta
Sciberras-niemen kärjessä aamuvalossa: murtunut muuri ja savuavat
rauniot, osmanijoukkoja hyökkäämässä useasta suunnasta, taustalla
Marsamxettin ja Grand Harbourin vedet kummallakin puolen niemeä.

**Lehtijohdanto**: Pyhän Elmon linnake kaatui 23. kesäkuuta 1565
lähes 28 päivän puolustuksen jälkeen — tappio, joka silti kulutti
osmanijoukkoja niin paljon, että koko piiritys epäonnistui.

**Minitehtävä**: Kysymys "Mitä tapahtui Pyhän Elmon linnakkeen
puolustajille 23.6.1565?" / vaihtoehdot: Lähes kaikki kaatuivat tai
teloitettiin (oikea), Kaikki pääsivät pakoon veneillä, He antautuivat
ehdoitta, Apu saapui juuri ajoissa / fakta: St Elmon noin 1 500 hengen
varuskunnasta vain muutama selvisi uimalla; linnakkeen puolustus
kulutti osmanijoukkoja niin, että Malta pysyi ritarikunnalla.

---

### 12. Moldova (MDA) — Bessarabian liittyminen Romaniaan 1918

```
id: 'bessarabian-liittyminen-1918'
otsikko: 'Chișinău 1918 — ääni sanoo kahdeksankymmentäkuusi'
nimio: 'Chișinău 1918'
paivays: '27.3.1918'
paikka: 'Sfatul Țării -palatsi, Chișinău'
iso: 'MDA'
lat: 47.0222, lon: 28.8172
lehti: { laji: 'maa', avain: 'MDA' }
```

**Teksti** (ääni-aloitus, ~126 sanaa): "Kahdeksankymmentäkuusi
puolesta." Ääni, joka lukee ääneskirjaimet Sfatul Țăriin istuntosalissa,
ei korota sävyään, mutta sali hiljenee silti kokonaan. On 27.
maaliskuuta 1918 vanhaa kalenteria (9. huhtikuuta uutta), ja
Bessarabian kansanedustuslaitos äänestää liittymisestä Romaniaan: 86
ääntä puolesta, kolme vastaan, kolmekymmentäkuusi tyhjää. Vuosi
aiemmin Bessarabia oli julistautunut itsenäiseksi Moldovan
kansantasavallaksi Venäjän vallankumouksen kaaoksessa, mutta
saksalais-itävaltalaisten joukkojen läsnäolo ja bolševikkien uhka ovat
ajaneet edustajat etsimään turvaa naapurista. Puheenjohtaja Ion
Inculeț allekirjoittaa päätöksen ehdollisena — se vaatii maareformia,
paikallista itsehallintoa ja perusoikeuksien kunnioittamista, ehtoja
joita ei koskaan täysin lunastettu. Kolme edustajaa äänestää vastaan
avoimesti kädet pystyssä, peläten liiton hukuttavan Bessarabian oman
kielen ja hallinnon suurempaan naapuriin. Sali, jossa ääni juuri
kaikui, on
rakennettu vain kolmetoista vuotta aiemmin lukioksi; siitä tulee
hetkeksi paikka, jossa uusi raja Euroopan kartalle piirretään ilman
yhtään laukausta.

**Lähikuva (rooli `lahi`)**: Puheenjohtaja pöydän ääressä (1910-luvun
tumma puku, silmälasit) seisoo kädessään paperiarkki, josta hän on
juuri lukenut ääneskirjaimet, katse kohti hiljentynyttä salia;
ympärillä epätarkkana istuu edustajia paikoillaan jännittyneinä.

**Kaukokuva (rooli `kauko`)**: Laaja näkymä Sfatul Țării -rakennuksen
istuntosalista: puiset penkkirivit täynnä pukumiehiä, korkeat ikkunat
päästävät sisään maaliskuun valon, puhujankoroke edessä, seinillä
yksinkertaiset koristeet.

**Lehtijohdanto**: Sfatul Țării äänesti Bessarabian liittymisestä
Romaniaan Chișinăussa 27. maaliskuuta 1918 äänin 86–3 — päätös, jonka
ehdot jäivät osin lunastamatta.

**Minitehtävä**: Kysymys "Millä äänin Sfatul Țării hyväksyi
liittymisen Romaniaan 1918?" / vaihtoehdot: 86 puolesta, 3 vastaan
(oikea), Yksimielisesti, 45 puolesta ja 45 vastaan, Vain kolmen äänen
enemmistöllä / fakta: Sfatul Țării äänesti Chișinăussa 27.3.1918 (9.4.
uutta kalenteria) Bessarabian liittymisestä Romaniaan äänin 86–3, 36
pidättäytyi.

---

### 13. Valko-Venäjä (BLR) — Berezinan ylitys 1812

```
id: 'berezinan-ylitys-1812'
otsikko: 'Berezina 1812 — jäinen vesi polvien yli'
nimio: 'Berezina 1812'
paivays: '26.–28.11.1812'
paikka: 'Studziankan kahluupaikka, lähellä Borisovia'
iso: 'BLR'
lat: 54.3247, lon: 28.3544
lehti: { laji: 'maa', avain: 'BLR' }
```

**Teksti** (lähikuva-aloitus, ~120 sanaa): Pontonöörin jalat eivät enää
tunne mitään polvien alapuolella, mutta hän pysyy pystyssä jäisessä
virrassa, koska hirsipukki, jota hän kannattelee, painaa liikaa
pudotettavaksi. Kenraali Jean-Baptiste Éblé on käskenyt
insinöörijoukkonsa rakentaa kaksi puista siltaa Berezina-joen yli
Studziankan kahluupaikalla 25.–26. marraskuuta 1812, jotta Napoleonin
Venäjältä perääntyvä armeija pääsisi yli ennen kuin kolme
venäläisarmeijaa sulkee ansan. Miehet seisovat jääkylmässä vedessä
tuntikausia rakentaen paaluja ja hirsiä, ja moni heistä kuolee
kylmyyteen päivien kuluessa työn jälkeen. Kolmen päivän aikana, 26.–28.
marraskuuta, kymmeniätuhansia sotilaita ja siviilejä tunkeutuu kahdelle
kapealle sillalle, kun venäläistykistö ampuu itäistä rantaa; osa
silloista pettää, ja jäljelle jääneet poltetaan viimeisten joukkojen
ehdittyä yli, jotta venäläiset eivät pääsisi perässä. Berezinasta tulee
ranskan kielessä sanonta katastrofille — mutta ilman Éblén insinöörejä
koko armeija olisi jäänyt loukkuun.

**Lähikuva (rooli `lahi`)**: Ranskalainen pontonööri-insinööri (1812
univormun repaleet, kasvot siniset kylmästä) seisoo rintaan asti
jäisessä joessa kannatellen puista hirsipukkia paikoilleen, ilme
äärimmäisen ponnistuksen ja kivun vääristämä; taustalla epätarkkana
muita miehiä samassa vedessä.

**Kaukokuva (rooli `kauko`)**: Laaja näkymä Berezina-joesta
Studziankan kohdalla marraskuisessa hämärässä: kaksi kapeaa puusiltaa
täynnä sotilaita ja vaunuja, väkijoukkoa odottamassa molemmilla
rannoilla, savua ja tykinvälähdyksiä idän suunnalta, jäätä ajelehtimassa
vedessä.

**Lehtijohdanto**: Napoleonin armeija ylitti Berezina-joen
Studziankan kahluupaikalla 26.–28. marraskuuta 1812 kenraali Éblén
insinöörien rakentamilla silloilla — pako, josta tuli ranskan kielessä
sanonta katastrofille.

**Minitehtävä**: Kysymys "Kuka johti siltojen rakentamista Berezinan
ylityksessä 1812?" / vaihtoehdot: Kenraali Jean-Baptiste Éblé (oikea),
Napoleon itse, Marsalkka Ney, Kenraali Kutuzov / fakta: Éblén
insinöörijoukot rakensivat kaksi puusiltaa jäisessä joessa
Studziankalla, mikä pelasti suuren osan Napoleonin perääntyvästä
armeijasta.

---

### Kuvatyyli (sama kuin muissa hetkissä)

Valokuvamainen havainnekuva, ei maalausmainen tyyli (Raamattu: "KAIKKI
GENEROIDUT KUVAT MAHDOLLISIMMAN VALOKUVAMAISIA"). Ei tunnistettavia
nykyihmisiä, ei nykypolitiikkaa, ei tekstiä kuvassa. Kuvatekstit ja
lähderivit yllä ovat luonnoksia — muokkaa tarpeen mukaan kuvan
lopullista sisältöä vastaaviksi ennen PR:ää, samaan tapaan kuin
aiemmissa erissä.

### Toimitus

Kaksikymmentäkuusi tiedostoa (13 × lähi + kauko), roolinimet ja
tiedostonimet yllä. PR Julkaisijan junaan (ei mergeä itse), rivi tähän
postilaatikkoon "PR #n valmis junaan" kun toimitettu. Lisää
`js/packs/historian-hetket.js`:ään täydellä kaavalla (ks. tiedoston oma
otsikkokommentti), aja `node tools/tarkista-nostopaikat.mjs` ja korjaa
kartalla/kohdekarttasijoittelu sen mukaan. HUOM: kohdat 5, 7, 8, 9, 12,
13 (SRB, ALB, MKD, MNE, MDA, BLR) tarvitsevat ensin uuden
maalehtikategorian `js/packs/maa-kategoriat.js`:ään (ks. HUOM 4 yllä),
koska niitä ei siellä vielä ole — maiden ääriviivat ovat jo kartalla.

---

## Yhteenveto

| # | Maa | Hetken nimi | Päivämäärä |
|---|-----|-------------|------------|
| 1 | Itävalta (AUT) | Wienin pörssikrahi ("Der Krach") | 9.5.1873 |
| 2 | Alankomaat (NLD) | Afsluitdijkin viimeinen aukko suljetaan | 28.5.1932 |
| 3 | Sveitsi (CHE) | Gotthardin rautatietunnelin läpimurto | 29.2.1880 |
| 4 | Tanska (DNK) | Christiansborgin linnan tulipalo | 3.10.1884 |
| 5 | Serbia (SRB) | Belgradin piiritys päättyy | 21.–22.7.1456 |
| 6 | Bosnia ja Hertsegovina (BIH) | Franz Ferdinandin salamurha | 28.6.1914 |
| 7 | Albania (ALB) | Vlorën itsenäisyysjulistus | 28.11.1912 |
| 8 | Pohjois-Makedonia (MKD) | Kruševon tasavalta (Ilinden) | 2.8.1903 |
| 9 | Montenegro (MNE) | Obodin kirjapaino, Oktoih prvoglasnik | 4.1.1494 |
| 10 | Kypros (CYP) | Britannian lipun nosto Nikosiassa | 12.7.1878 |
| 11 | Malta (MLT) | Pyhän Elmon linnakkeen kaatuminen | 23.6.1565 |
| 12 | Moldova (MDA) | Bessarabian liittyminen Romaniaan | 27.3.1918 |
| 13 | Valko-Venäjä (BLR) | Berezinan ylitys, Studzianka | 26.–28.11.1812 |
