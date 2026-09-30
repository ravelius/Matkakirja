# Livian pulu — Norjan fylket, luonnos (Sisältökirjuri, 27.9.2026)

Tehtävä: 2 suomenkielistä kysymys-vastaus-paria kutakin 21 Norjan
historiallista fylkeä kohden. Aiheet valittu eri kuin pelin jo olemassa
olevat "lyhyt"-faktat (ks. tehtävänanto). Kaikki faktat tarkistettu
WebSearch-hauilla (lähteet mainittu kunkin osion lopussa).

Kopioi alla olevat lohkot suoraan pulu-datan JS-objektiin. Avaimet
kirjoitettu tarkalleen annetulla kirjoitusasulla; väli/yhdysmerkkiä
sisältävät avaimet lainausmerkeissä konsistenssin vuoksi.

---

## JS-valmiit lohkot

```js
Akershus: [
  { q: "Mistä Akershus-maakunnan nimi on peräisin?", a: "Nimi juontuu Oslossa sijaitsevasta Akershusin linnasta ja linnoituksesta, jonka rakentaminen alkoi vuonna 1299 kuningas Håkon V:n aikana. Linnoitus antoi aikanaan nimensä koko sitä ympäröivälle läänille." },
  { q: "Mikä on Raknehaugen, ja miksi se hämmentää arkeologeja?", a: "Raknehaugen Ullensakerissa on Norjan suurin muinainen maakumpu, halkaisijaltaan 77 metriä. Kaivauksissa ei ole löytynyt hautaa eikä ihmisen jäänteitä, joten se saattaa olla 500-luvun katastrofin muistomerkki, ei kuninkaan hauta." },
],

"Aust-Agder": [
  { q: "Miksi Arendalia kutsuttiin joskus \"Pohjolan Venetsiaksi\"?", a: "1700–1800-luvuilla Arendal rakennettiin useille saarille kanavien ympärille, ja se oli laivanvarustuksen ansiosta yksi Pohjois-Euroopan vauraimmista kaupungeista. Suuren tulipalon jälkeen kanavat täytettiin ja muutettiin leveiksi kaduiksi." },
  { q: "Mitä erikoista Arendalin Tyholmenin puutalokorttelissa on?", a: "Tyholmenin 1700-luvun puutalot ovat yksi parhaiten säilyneistä puutalokokonaisuuksista Pohjois-Euroopassa, ja alue palkittiin arvostetulla Europa Nostra -palkinnolla vuonna 1992." },
],

"Bouvet Island": [
  { q: "Mikä mysteeri löytyi Bouvetinsaarelta vuonna 1964?", a: "Brittiläinen laiva löysi saaren lagunista hylätyn, osittain uponneen pelastusveneen sekä tynnyrin ja airoja – kukaan ei ollut ilmoittanut haaksirikosta. Myöhemmin neuvostoasiakirjoista selvisi veneen jääneen jälkeen myrskyn keskeyttämältä valaanpyyntiretkikunnalta vuodelta 1958." },
  { q: "Milloin ja miten Bouvetinsaaresta tuli osa Norjaa?", a: "Ranskalainen löysi saaren vuonna 1739, mutta se pysyi vuosisatoja käytännössä kenenkään maana. Norja liitti sen viralliseksi alueekseen vuonna 1930, ja nykyään se on luonnonsuojelualue vailla pysyvää väestöä." },
],

Buskerud: [
  { q: "Mikä on Spiralen Drammenissa?", a: "Spiralen on vuorenläpäisevä kiertotie, joka nousee kuudessa lenkissä Bragernesåsen-vuoren laelle. Se kaivettiin alun perin 1950-luvulla graniitin louhintaa varten, ja kuningas Olav V avasi sen yleisölle vuonna 1961." },
  { q: "Miksi Spiralenista tuli suosittu nähtävyys eikä vain louhostie?", a: "Kaupungininsinööri halusi vähentää louhinnan haittoja ja ehdotti tunnelia, joka toimisi samalla matkailukohteena. Vuosina 2019–2020 tunneliin lisättiin värillinen valaistus, joka muuttuu vuorokaudenajan mukaan." },
],

Finnmark: [
  { q: "Miksi Nordkapp tuli suosituksi matkailukohteeksi juuri 1870-luvulla?", a: "Kuningas Oscar II vieraili Nordkapilla heinäkuussa 1873 ja pystytti paikalle muistokiven käyntinsä kunniaksi. Vierailu teki kalliosta tunnetun, ja pian sen jälkeen brittiläinen matkatoimisto Thomas Cook alkoi järjestää matkoja Nordkapille." },
  { q: "Onko Nordkapp oikeasti Euroopan mantereen pohjoisin piste?", a: "Ei aivan – vaikka Nordkapp on suosituin ja tunnetuin kohde, todellinen pohjoisin niemi on vieressä sijaitseva Knivskjellodden, joka työntyy mereen noin 1 450 metriä Nordkappia pohjoisemmaksi." },
],

Hedmark: [
  { q: "Miksi Hedmarkia kutsutaan Norjan hirvimaakunnaksi?", a: "Hedmarkin metsät ovat niin hirvirikkaita, että maakunnasta kaadetaan noin viidesosa koko Norjan vuosittaisesta hirvisaaliista. Alueella on yli 25 000 rekisteröityä metsästäjää." },
  { q: "Kuinka tiheä hirvikanta Hedmarkissa parhaimmillaan on?", a: "Kaakkois-Norjan metsäalueilla, erityisesti Hedmarkissa, hirvitiheys voi nousta jopa 2,5 eläimeen neliökilometrillä – yksi Euroopan suurimmista." },
],

Hordaland: [
  { q: "Mikä Trolltunga on, ja missä se sijaitsee?", a: "Trolltunga on Oddan lähellä Hordalandissa sijaitseva litteä kalliokieleke, joka työntyy noin 700 metrin korkeudessa Ringedalsvatnetin järven yllä. Siitä on tullut yksi Norjan tunnetuimmista valokuvauskohteista." },
  { q: "Kuinka suosittu Trolltunga-vaellus on nykyään?", a: "Vielä 2010-luvun alussa Trolltungalla vieraili alle 800 kävijää vuodessa, mutta vuonna 2016 luku oli jo noin 80 000. Vaellus on noin 27 kilometriä edestakaisin ja kestää yleensä 10–12 tuntia." },
],

Svalbard: [
  { q: "Mikä on Global Seed Vault, ja miksi se rakennettiin Huippuvuorille?", a: "Huippuvuorten kylmyys ja ikirouta suojaavat maailman kasvilajikkeiden siemenvarastoja kriisin varalta. Holvi louhittiin syvälle vuoreen, ja se avattiin vuonna 2008 satojen miljoonien siementen voimin." },
  { q: "Kuinka monesta maasta siemeniä on tallennettu Svalbardin holviin?", a: "Avajaisissa vuonna 2008 holviin tuotiin yli 100 miljoonaa siementä yli sadasta maasta, ja kokoelma on kasvanut siitä lähtien merkittävästi. Holvi toimii varmuuskopiona maailman siemenpankeille." },
],

"Møre og Romsdal": [
  { q: "Miksi Ålesund näyttää niin erilaiselta kuin muut Norjan rannikkokaupungit?", a: "Tuhoisa tulipalo tammikuussa 1904 tuhosi suurimman osan puukaupungista yhdessä yössä ja jätti yli 10 000 ihmistä kodittomiksi. Kaupunki rakennettiin uudelleen aikansa muotisuuntauksen, jugendtyylin, mukaisesti vain muutamassa vuodessa." },
  { q: "Mitä erikoista Ålesundin jugendarkkitehtuurissa on?", a: "Yli 50 arkkitehtia ympäri Norjaa osallistui jälleenrakennukseen, ja rakennuksiin yhdisteltiin kansainvälistä jugendtyyliä viikingiaikaisiin koristeaiheisiin, lohikäärmeisiin ja kasvikuvioihin." },
],

"Nord-Trøndelag": [
  { q: "Miksi Namsenia kutsutaan \"jokien kuningattareksi\"?", a: "Namsen on yksi maailman parhaista lohijoista, ja siellä on saatu vuosien varrella useita yli 20-kiloisia lohia. Suurin koskaan saatu yksilö painoi peräti 68 naulaa, noin 31 kiloa." },
  { q: "Millä tekniikalla Namsenin lohta perinteisesti pyydetään?", a: "Leveällä joella käytetään usein \"harling\"-menetelmää, jossa vieheitä vedetään hitaasti liikkuvan veneen perässä rannalta rannalle. Ylävirtaan uiva lohi kohtaa vieheen tällä tavalla luonnollisesti." },
],

Nordland: [
  { q: "Mikä tekee Vegan saariryhmästä UNESCOn maailmanperintökohteen?", a: "Vegan saarilla asukkaat ovat yli 1 500 vuoden ajan eläneet kalastuksella ja haahkansulan keruulla ankarissa oloissa. Kohde otettiin maailmanperintölistalle vuonna 2004 Norjan ensimmäisenä kulttuurimaisemana." },
  { q: "Millaisia ovat Vegan saarten haahkantalot?", a: "Karuille ulkoluodoille rakennettiin pieniä kivisiä pönttömäisiä taloja, joissa haahkanaaraat pesivät suojassa. Untuvaa kerättiin pesän tyhjennyttyä, ja siitä valmistettiin arvostettuja untuvapeittoja jopa kuninkaallisille asiakkaille." },
],

Oppland: [
  { q: "Mitä Lillehammerissa tapahtui helmikuussa 1994?", a: "Lillehammer isännöi talviolympialaisia 12.–27. helmikuuta 1994, ja siitä tuli pohjoisin kaupunki, joka on koskaan järjestänyt olympialaiset. Kisat levittäytyivät kymmeneen paikkaan Opplandin ja Hedmarkin alueella." },
  { q: "Mitä pysyvää hyötyä Lillehammerin olympialaisista jäi alueelle?", a: "Kisoja varten rakennettu kansainvälinen lähetyskeskus mahdollisti Storhoven korkeakoulun kasvun; opiskelijamäärä nousi noin 600:sta yli 6 000:een parissa vuosikymmenessä." },
],

Oslo: [
  { q: "Mikä tekee Vigelandin puistosta ainutlaatuisen?", a: "Frognerpuistossa sijaitseva Vigelandin puisto on maailman suurin yhden taiteilijan tekemä veistospuisto: siinä on yli 200 Gustav Vigelandin veistosta pronssista, graniitista ja raudasta. Puistoa rakennettiin pääosin vuosina 1939–1949." },
  { q: "Mitä Vigelandin veistokset kuvaavat?", a: "Veistokset esittävät ihmiselämän kiertokulkua vauvasta vanhuuteen ja kaikkia niiden väliin mahtuvia tunteita. Puisto on ilmainen, ja siellä vierailee vuosittain yli miljoona kävijää." },
],

Rogaland: [
  { q: "Miksi Stavangeria kutsutaan Norjan öljypääkaupungiksi?", a: "Joulukuussa 1969 Ekofisk-kentältä Pohjanmereltä löytyi valtava öljy- ja kaasuesiintymä, joka muutti koko Norjan talouden suunnan. Stavangeriin keskittyi nopeasti öljy-yhtiöiden pääkonttoreita ja palveluyrityksiä." },
  { q: "Kuinka suuri vaikutus Ekofiskin löydöllä oli Norjaan?", a: "Ennen löytöä Norja oli öljyn tuoja ja velkaantunut maa, mutta löydön jälkeen siitä kehittyi vuosikymmenten kuluessa yksi maailman vauraimmista valtioista valtavan öljyrahaston ansiosta." },
],

"Sogn og Fjordane": [
  { q: "Miksi Flåmin rautatietä pidetään yhtenä maailman upeimmista?", a: "Flåmsbana on yksi maailman jyrkimmistä normaaliraiteisista rautateistä: 80 % matkasta kulkee 5,5 % nousussa Myrdalin ja Flåmin välillä. Radan rakentaminen kesti vuodesta 1923 vuoteen 1940." },
  { q: "Kuinka monta tunnelia Flåmsbanan radalla on?", a: "Radalla on 20 tunnelia, ja 18 niistä louhittiin käsin ilman nykyaikaisia koneita. Rata laskee 866 metriä matkalla, joka on vain 20,2 kilometriä pitkä." },
],

"Sør-Trøndelag": [
  { q: "Mikä on Fosenin tuulipuisto, ja miksi se on kiistanalainen?", a: "Fosenin niemimaalla sijaitsee Euroopan suurin manner-tuulipuisto, mutta Norjan korkein oikeus totesi vuonna 2021 sen loukkaavan saamelaisten poronhoitajien oikeuksia. Turbiinit häiritsevät perinteisiä poronhoitoreittejä." },
  { q: "Ratkaistiinko Fosenin kiista lopulta?", a: "Vuonna 2024 hallitus ja saamelaiset pääsivät sopimukseen, jonka mukaan tuulivoimalat saavat jäädä käyntiin, mutta poronhoitokulttuurin suojaamiseksi otettiin käyttöön uusia toimenpiteitä." },
],

Telemark: [
  { q: "Miksi hiihtotekniikkaa kutsutaan \"telemarkiksi\"?", a: "Tekniikka on saanut nimensä Telemarkin maakunnasta, jossa Morgedalin kylästä kotoisin oleva Sondre Norheim kehitti 1800-luvulla vapaakantaisen siteen ja käännöstekniikan. Hän esitteli tyylinsä julkisesti Kristianiassa vuonna 1868." },
  { q: "Mikä tekee telemark-hiihdosta erilaista kuin alppihiihdosta?", a: "Telemark-siteessä vain kärki on kiinni suksessa, kantapää nousee vapaasti irti, mikä mahdollistaa polvea koukistavan käännösliikkeen. Norheimia pidetään nykyaikaisen hiihdon isänä." },
],

Troms: [
  { q: "Miksi valaita voi bongata Tromssan seudulla juuri talvella?", a: "Marraskuusta tammikuuhun miekkavalaat ja ryhävalaat kerääntyvät Skjervøyn ja Kvænangenin vesille syömään silliparvia. Ilmiö on kasvattanut suosiotaan talviristeilyjen ja retkien myötä 2010-luvulta lähtien." },
  { q: "Kuinka kaukana Skjervøy on Tromssasta?", a: "Skjervøy sijaitsee noin 250 kilometrin päässä Tromssasta, ja retket sinne yhdistävät usein bussi- tai minibussikyydin veneellä tehtävään valaidenkatseluun." },
],

"Vest-Agder": [
  { q: "Miksi Kristiansandin kaupunkisuunnitelma on niin poikkeuksellinen?", a: "Kuningas Christian IV perusti kaupungin vuonna 1641 ja määräsi sille tiukan ruudukkomuotoisen katusuunnitelman renessanssi-ihanteiden mukaan. Kadut tehtiin poikkeuksellisen leveiksi tulipalojen leviämisen estämiseksi." },
  { q: "Miksi Kvadraturen-alue on vielä nykyään tunnistettavissa?", a: "Alkuperäinen 1600-luvun ruudukko seitsemine pohjois-eteläkatuineen ja kymmenine itä-länsikatuineen on säilynyt lähes muuttumattomana yli 380 vuotta, ja se tunnetaan nykyään nimellä Kvadraturen." },
],

Vestfold: [
  { q: "Miksi Sandefjordia kutsuttiin maailman valaanpyyntipääkaupungiksi?", a: "1900-luvun alusta toisen maailmansodan jälkeiseen aikaan asti suurin osa maailman valaanpyyntilaivojen omistajista ja miehistöstä tuli Sandefjordista, mikä teki kaupungista Norjan rikkaimman." },
  { q: "Mitä Sandefjordin valaanpyyntimuseossa voi nähdä?", a: "Museo on Euroopan ainoa täysin valaisiin ja valaanpyyntiin keskittynyt museo, ja siellä roikkuu katosta 21 metriä pitkä täysikokoinen sinivalaan jäljitelmä." },
],

Østfold: [
  { q: "Mitä tapahtui Fredriksten linnoituksessa Haldenissa vuonna 1718?", a: "Ruotsin kuningas Kaarle XII kaatui piiritystä johtaessaan, kun luoti osui häneen linnoitusta tarkastaessa. Hänen kuolemansa päätti Ruotsin valloitusyritykset Norjaan." },
  { q: "Miksi Kaarle XII:n kuolemalla oli laajempi historiallinen merkitys?", a: "Tapahtuma vauhditti Ruotsin suurvalta-aseman päättymistä ja niin kutsutun vapauden ajan alkua, kun rauha solmittiin muutaman vuoden kuluttua Uudenkaupungin rauhassa." },
],
```

---

## Lähteet ja tarkistushuomiot per maakunta

- **Akershus** — Akershusin linna/linnoitus perustettu ~1299 (Håkon V), antoi nimen läänille. [Wikipedia: Aker, Norway](https://en.wikipedia.org/wiki/Aker,_Norway); [History Hit: Akershus Fortress](https://www.historyhit.com/locations/akershus-fortress/). Raknehaugen: [Wikipedia: Rakni's Mound](https://en.wikipedia.org/wiki/Rakni's_Mound); [Ancient Origins](https://www.ancient-origins.net/news-history-archaeology/raknehaugen-burial-mound-00102638).
- **Aust-Agder** — Arendal "Pohjolan Venetsia", Tyholmen, Europa Nostra 1992. [Frommer's: Arendal](https://www.frommers.com/destinations/arendal/); [CruiseBaltic: Arendal](https://www.cruisebaltic.com/destinations/norway/arendal).
- **Bouvet Island** — 1964 pelastusvenelöytö ja neuvostoselitys 1958; annektointi 1930, löytö 1739. [Historic Mysteries](https://www.historicmysteries.com/unexplained-mysteries/lifeboat-on-bouvet-island/1038/); [Mike Dash History](https://mikedashhistory.com/2011/02/13/an-abandoned-lifeboat-at-worlds-end/).
- **Buskerud** — Spiralen Drammenissa, avattu 1961, valaistus 2019–2020. [Grokipedia: Drammen Spiral](https://grokipedia.com/page/Drammen_Spiral); [Atlas Obscura](https://www.atlasobscura.com/places/drammen-spiral).
- **Finnmark** — Oscar II Nordkapilla 1873, Knivskjellodden todellinen pohjoisin piste. [Wikipedia: North Cape (Norway)](https://en.wikipedia.org/wiki/North_Cape_(Norway)); Getty-kuvan kuvateksti kuninkaan vierailusta.
- **Hedmark** — hirvitiheys ja ~20 % kansallisesta saaliista. [Wikipedia: Hedmark](https://en.wikipedia.org/wiki/Hedmark); ResearchGate-kartta hirvitiheydestä.
- **Hordaland** — Trolltunga sijainti ja kävijämäärän kasvu (800 → 80 000). [Wikipedia: Trolltunga](https://en.wikipedia.org/wiki/Trolltunga).
- **Svalbard** — Global Seed Vault avattu 26.2.2008, >100 milj. siementä >100 maasta. [Wikipedia: Svalbard Global Seed Vault](https://en.wikipedia.org/wiki/Svalbard_Global_Seed_Vault); [Britannica](https://www.britannica.com/topic/Svalbard-Global-Seed-Vault).
- **Møre og Romsdal** — Ålesundin tulipalo 23.1.1904, jälleenrakennus jugendtyyliin. [Life in Norway](https://www.lifeinnorway.net/alesund-city-fire/); [RANN: Jugendstilsenteret](https://www.artnouveau-net.eu/jugendstilsenteret-the-art-nouveau-centre/).
- **Nord-Trøndelag** — Namsen-joki, ennätys 68 lbs (~31 kg), harling-tekniikka. [Sportquest Holidays](https://www.sportquestholidays.com/tour/namsentunet-lodge-river-namsen/); [Where Wise Men Fish](http://www.wherewisemenfish.com/_Norway_Namsen_River_Salmon_Fishing).
- **Nordland** — Vegaøyan UNESCO 2004, haahkantalot. [UNESCO: Vegaøyan](https://whc.unesco.org/en/list/1143/); [Riksantikvaren](https://www.riksantikvaren.no/en/world-heritage/vegaoyan-the-vega-archipelago/).
- **Oppland** — Lillehammer 1994, IBC/Storhove-vaikutus. [Olympics.com: Lillehammer 1994 Legacy](https://www.olympics.com/ioc/legacy-lillehammer-1994); [Redalyc-artikkeli](https://www.redalyc.org/journal/6778/677873370003/html/).
- **Oslo** — Vigelandin puisto, 200+ veistosta, rakennettu 1939–1949. [Wikipedia: Frogner Park](https://en.wikipedia.org/wiki/Frogner_Park); [Vigeland Museum](https://vigeland.museum.no/en/vigelandpark).
- **Rogaland** — Ekofisk-löytö joulukuu 1969, Stavangerin öljyhistoria. [Hydro: 1969 Ekofisk](https://www.hydro.com/en/about-hydro/company-history/1946---1977/1969-ekofisk---a-christmas-surprise/); [Ekofisk industriminne](https://ekofisk.industriminne.no/en/how-oil-changed-the-stavanger-region/).
- **Sogn og Fjordane** — Flåmsbana, 5,5 % nousu, 20 tunnelia, rakennus 1923–1940. [Wikipedia: Flåm Line](https://en.wikipedia.org/wiki/Fl%C3%A5m_Line); [Thinking Nomads](https://thinkingnomads.com/norwegian-flamsbana-steepest-railway-world/).
- **Sør-Trøndelag** — Fosenin tuulipuisto, korkeimman oikeuden päätös 2021, sopu 2024. [Wikipedia: Fosen Vind Wind Farm](https://en.wikipedia.org/wiki/Fosen_Vind_Wind_Farm); [JURIST 2024](https://www.jurist.org/news/2024/03/norway-ends-dispute-with-sami-people-over-construction-of-wind-farm-on-indigenous-land/).
- **Telemark** — Sondre Norheim, Morgedal, esitys Kristianiassa 1868. [Wikipedia: Sondre Norheim](https://en.wikipedia.org/wiki/Sondre_Norheim); [Wikipedia: Telemark skiing](https://en.wikipedia.org/wiki/Telemark_skiing).
- **Troms** — Skjervøyn/Kvænangenin talvivalaat marraskuu–tammikuu, ~250 km Tromssasta. [Whalesafari: Skjervøy](https://whalesafari.no/trips-skjervoy); [Visit Tromsø](https://www.visittromso.no/whale-watching).
- **Vest-Agder** — Kristiansand perustettu 1641, Kvadraturen-ruudukko. [Kupi: history of Kristiansand](https://www.kupi.com/en-ae/explore/norway/kristiansand/history); [Wikipedia: Kvadraturen (Kristiansand)](https://en.wikipedia.org/wiki/Kvadraturen_(Kristiansand)).
- **Vestfold** — Sandefjord valaanpyyntipääkaupunki, Hvalfangstmuseet. [Wikipedia: Sandefjord Museum](https://en.wikipedia.org/wiki/Sandefjord_Museum); [Vestfoldmuseene: Whaling Museum](https://vestfoldmuseene.no/hvalfangstmuseet/en/about-us).
- **Østfold** — Fredriksten-piiritys, Kaarle XII:n kuolema 30.11./11.12.1718. [Wikipedia: Siege of Fredriksten](https://en.wikipedia.org/wiki/Siege_of_Fredriksten); [Britannica: Fredriksten Fort](https://www.britannica.com/place/Fredriksten-Fort).

---

## Luottamusarvio

**Vahvimmat / eniten varmistetut** (usealla riippumattomalla lähteellä,
täsmällisiä vuosilukuja): Bouvet Island (1964-mysteeri), Svalbard
(siemenholvi), Møre og Romsdal (Ålesundin palo), Rogaland (Ekofisk),
Sogn og Fjordane (Flåmsbana), Østfold (Fredriksten/Kaarle XII), Oppland
(Lillehammer 1994), Oslo (Vigelandin puisto), Vest-Agder (Kristiansand
1641), Vestfold (Sandefjord).

**Hyvin varmistetut, mutta hieman tuoreempia/tulkinnallisempia**:
Sør-Trøndelag (Fosen — poliittisesti herkkä aihe, mutta faktat
[korkeimman oikeuden päätös, 2024 sopu] ovat hyvin dokumentoituja ja
esitetty tässä neutraalisti); Troms (talvivalaiden bongaus — ilmiö
vaihtelee vuosittain sillin liikkeiden mukaan, mutta paikka/ajankohta on
vakiintunut viimeisen ~10 vuoden ajan); Nord-Trøndelag (Namsen-joen
68 lbs -ennätys mainittu useissa kalastusalan lähteissä, mutta ei
virallisessa ennätystilastossa — muotoiltu varovaisesti "suurin koskaan
saatu").

**Eniten harkintaa vaatineet** (ei epävarmoja faktoja, mutta aihe on
poikkeuksellinen fylkin luonteen vuoksi): Bouvet Island ja Svalbard,
koska ne ovat asumattomia/lähes asumattomia alueita eivätkä tavallisia
maakuntia — valittu "merkittävä paikka" -tyyppisiä faktoja tehtävänannon
ohjeen mukaisesti. Finnmarkin Nordkapp-fakta nojaa vuoteen 1873, joka
sattuu olemaan sama vuosi kuin pelin isoisän matkapäiväkirjassa — tämä
on tarkistettu tosiasia (Oscar II:n vierailu 2.7.1873), ei tarinallinen
lisäys, mutta kannattaa huomioida hyvänä yhteytenä pelin ajankohtaan.

Kaikki 21 maakuntaa sisältävät 2 paria (yhteensä 42 kysymys-vastaus-
paria). Ei muokattu mitään koodi- tai datatiedostoja — vain tämä
raportti kirjoitettu.
