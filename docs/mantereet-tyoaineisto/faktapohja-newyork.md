# New York — faktakoostaja, uusi kaupunkilehti (P-Amerikan lauta, pilottikaupunki)

Lauta-id `northamerica`, kaupunki-id `newyork`, en-Wikipedia "New York City" (ellei
toisin mainita). Kaikki tiedot haettu en-Wikipediasta **22.8.2026** (`action=raw` +
`prop=coordinates`-API, uusinnat kasvavalla viiveellä 429-vastauksiin), ellei
toisin merkitty. Malli ja mitat luettu tiedostoista `docs/aasia-tyoaineisto/
lehtityo-resepti.md` (SITOVA), `docs/moduulit/kaupunkilehti.md` sekä esimerkkinä
Manilan parista (`docs/aasia-tyoaineisto/faktapohja-manila.md` +
`tarkistus-manila.md`). Raamatun linjaukset: js/tyohuone-raamattu.js osiot
Perustuslaki, Kuvat ja lähteet, Kaupungit.

**Tehtävän erityispiirre:** New York on Pohjois-Amerikan laudan PILOTTIKAUPUNKI —
ensimmäinen mantereen kaupunkilehti. Tämä koonti painottaa vahvasti isoisän
matkavuotta 1873, koska se osuu poikkeuksellisen tarkasti moneen dokumentoituun
käännekohtaan (ks. osio 7, huomio 1: viisi eri tapahtumaa on aikalaislähteiden
mukaan päivätty juuri vuoteen 1873). En kirjoittanut lehtitekstejä, en ladannut
kuvia enkä koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta
kirjoittajalle ja tarkistajalle.

**Sisältölinjaus:** ei nykysotaa, ei nykypolitiikkaa. Draft-riots 1863
-tapahtuma on jätetty POIS ehdokaslistalta kokonaan (ei nostoa eikä jaksoa) —
sen ydinsisältö on rodullista väkivaltaa (lynkkauksia, orpokodin polttaminen),
eikä sitä saa kaunistella eikä esittää mainintatasoakaan pintaa syvemmältä
ikäsopivuuslinjauksen alla. Jos kirjoittaja silti haluaa mainita sen
neutraalina yleismainintana ("sisällissodan aikana kaupungissa oli myös
levottomuuksia"), se on kirjoittajan oma harkinta — en tuo sitä nostoihin.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "New York"

**Johdanto (271 merkkiä):**

> Manhattanin, Brooklynin, Queensin, Bronxin ja Staten Islandin saaristokaupunki
> Hudsonjoen suulla. Hollantilaiset perustivat sen New Amsterdamiksi
> 1620-luvulla; englantilaiset nimesivät sen uudelleen 1664. Isoisän saapuessa
> 1873 se oli jo höyrylaivakauden vilkkain satama.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** New Yorkin parhaiten dokumentoitu ja samalla
1873-vuoteen tiiveimmin kytkeytyvä aines on juuri kaupungin muodonmuutosten
historia — hollantilaisesta kauppa-asemasta englantilaiseksi siirtokunnaksi ja
edelleen maailman rahoituskeskukseksi. Muut vakioaiheet eivät nouse yhtä
vahvoina TÄSSÄ vaiheessa: kuvataide ja musiikki kytkeytyvät enemmän 1900-luvun
alkuun (Harlem Renaissance, joka on kronologisesti kaukana isoisän vuodesta),
ruoka on vahva aihe mutta sopisi paremmin omaksi nostoksi tai myöhemmäksi
teemasivuksi, ja luonto/tiede eivät erotu yhtä terävästi. `historia` kantaa
koko sivun ja saa kaikki viisi 1873-käännekohtaa saman katon alle: Brooklynin
sillan tornit, Central Parkin keskeneräisyys ja Bethesda-suihkulähde, Grand
Central Depot ja syksyn 1873 pörssiromahdus.

**Johdanto (269 merkkiä):**

> Kaupunki vaihtoi omistajaa, nimeä ja mittakaavaa parissasadassa vuodessa:
> hollantilaisten kauppa-asemasta maailman rahoituskeskukseksi. Vuosi 1873
> osui murroskohtaan — Brooklynin silta nousi hitaasti taivaalle, Central Park
> oli vielä kesken, ja pörssi romahti syksyllä.

---

## 2. Kahdeksan nostoehdotusta (4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Saari ostettiin kuudellakymmenellä guldenilla" (555 merkkiä)**

> Hollantilaiset perustivat kauppa-aseman Manhattanin eteläkärkeen 1620-luvun
> puolivälissä, ja Uuden Alankomaiden johtaja Peter Minuit osti koko saaren
> alkuperäisiltä asukkailta 1626 kuudestakymmenestä guldenista — nykyrahassa
> arviolta 900 dollaria. Laajalti kerrottu tarina väittää hinnaksi 24 dollarin
> arvosta lasihelmiä, mutta kauppakirjeen alkuperäinen teksti puhuu vain
> guldeneista, ja helmilegenda on todistettavasti myöhempi keksintö.
> Siirtokunta sai kaupunginoikeudet nimellä New Amsterdam vasta 1653, lähes
> kolme vuosikymmentä perustamisen jälkeen.

Faktat ja lähteet:
- Peter Minuit osti Manhattanin saaren canarsie-lenapeilta 1626 kuudestakymmenestä
  guldenista (arviolta 900 dollaria vuoden 2018 rahassa). — en-Wikipedia
  "New York City", osio "Dutch rule"
- Yleisesti kerrottu tarina 24 dollarin lasihelmistä on osoitettu vääräksi;
  aikalaisen Pieter Schaghenin kirje mainitsee vain guldenit. — en-Wikipedia
  "New York City", osio "Dutch rule"
- Siirtokunta sai kaupunginoikeudet nimellä New Amsterdam 1653 (samana vuonna
  rakennettiin myös eteläraja-paalutus, ks. Jakso 4). — en-Wikipedia "New York
  City", johdanto-osio

**Nosto K2 — "Silta joka nousi hänen silmiensä edessä" (613 merkkiä)**

> Isoisän saapuessa 1873 Brooklynin silta oli vielä pelkkiä torneja: kesäkuussa
> Brooklynin puoleinen torni kohosi 164 jalkaa ja Manhattanin puoleinen 88
> jalkaa vedenpinnasta, eikä yhtään vaijeria ollut vielä pingotettu.
> Pääsuunnittelija John Roebling kuoli jäykkäkouristukseen jo 1869 saatuaan
> jalkansa murskaan lautalla; poikansa Washington jatkoi työtä mutta
> halvaantui itsekin kaisonityön sukeltajantautiin. Washingtonin vaimo Emily
> Warren Roebling opetteli insinööritiedettä ja johti työmaata miehensä
> puolesta seuraavat yksitoista vuotta. Silta valmistui vasta 1883 — kymmenen
> vuotta isoisän vierailun jälkeen.

Faktat ja lähteet:
- Kesäkuuhun 1873 mennessä Brooklynin puoleinen torni oli 164 jalkaa ja
  Manhattanin puoleinen 88 jalkaa keskiveden yläpuolella; kaapelien kehruu
  alkoi vasta elokuussa 1876. — en-Wikipedia "Brooklyn Bridge", osiot
  "Towers" ja "Cables"
- John A. Roebling kuoli tetanukseen heinäkuussa 1869 saatuaan jalkansa
  murskaan lautan ja laiturin väliin kesäkuussa 1869; poikansa Washington
  Roebling otti pääinsinöörin paikan. — en-Wikipedia "Brooklyn Bridge", osio
  "Planning"
- Washington Roebling halvaantui kaisonitaudista (decompression sickness) pian
  Brooklynin tornin perustustöiden jälkeen ja johti loppurakennustyötä
  asunnostaan käsin; vaimo Emily Warren Roebling opetteli matematiikkaa,
  kaapelilaskelmia ja rakennustekniikkaa ja valvoi työmaata 11 vuoden ajan. —
  en-Wikipedia "Brooklyn Bridge", osio "Caissons"
- Silta avattiin liikenteelle 24.5.1883. — en-Wikipedia "Brooklyn Bridge",
  osio "Opening"

**Nosto K3 — "Central Puisto oli vielä kesken" (584 merkkiä)**

> Central Park ei ollut isoisän aikaan valmis: puisto avautui vaiheittain 1858
> alkaen, ja viralliseksi se julistettiin vasta 1876. Juuri vuonna 1873
> puiston sydämeen, Bethesda-terassille, paljastettiin pronssinen
> suihkulähdepatsas Angel of the Waters — kuvanveistäjä Emma Stebbinsin teos,
> ensimmäinen New Yorkin kaupungin tilaama julkinen taideteos, jonka teki
> nainen. Enkeli siunaa vettä muistona Croton-vesijohdosta, joka toi
> kaupunkiin ensimmäistä kertaa puhdasta juomavettä 1842. Rakentamiseen kului
> enemmän ruutia kuin Gettysburgin taisteluun, ja työmaalla kuoli viisi
> työntekijää.

Faktat ja lähteet:
- Central Parkia rakennettiin vaiheittain 1857 alkaen; puisto ei ollut
  virallisesti valmis ennen vuotta 1876. — en-Wikipedia "Central Park", osio
  "1870–1876: completion"
- Bethesda-suihkulähteen patsas "Angel of the Waters" suunniteltiin 1868 ja
  paljastettiin 1873; sen teki Emma Stebbins, ensimmäinen nainen, joka sai
  New Yorkin kaupungilta tilauksen julkiseen taideteokseen. — en-Wikipedia
  "Bethesda Terrace and Fountain", osiot "Construction" ja "Bethesda Fountain"
- Patsas viittaa Croton-vesijohtoon, joka toi New Yorkiin ensimmäisen puhtaan
  vesihuollon 1842 samalla paikalla, jolle Central Park myöhemmin
  rakennettiin. — en-Wikipedia "Bethesda Terrace and Fountain", osio "Bethesda
  Fountain"
- Puiston rakentamiseen käytettiin enemmän ruutia kuin Gettysburgin
  taisteluun, ja työmaalla kuoli viisi työntekijää tarkoista
  turvatoimista huolimatta. — en-Wikipedia "Central Park", osio
  "Construction"

**Nosto K4 — "Portti ennen Vapaudenpatsasta" (537 merkkiä)**

> Ennen Vapaudenpatsasta ja Ellis Islandia New Yorkin porttina toimi Castle
> Garden, vanha linnake Manhattanin kärjessä: sitä käytettiin maahantulijoiden
> rekisteröintiin 1855–1890, ja sen läpi kulki lopulta noin kahdeksan
> miljoonaa siirtolaista. Saksalaiset ja jiddishinkieliset juutalaiset
> ääntivät nimen Kesselgarteniksi, ja sanasta tuli yleisnimitys kaoottiselle,
> kielten sekamelskaiselle paikalle. Kesällä 1873 kaupunki, osavaltio ja
> liittovaltio riitelivät yhä siitä, kuka laitoksen oikeastaan omisti — riita
> jatkui koko vuosikymmenen.

Faktat ja lähteet:
- Castle Garden (nyk. Castle Clinton) toimi Yhdysvaltain ensimmäisenä
  maahantulon rekisteröintikeskuksena 1855–1890; sen kautta kulki 7,5–8
  miljoonaa siirtolaista. — en-Wikipedia "Castle Clinton", osio "Immigrant
  landing and registration depot"
- Saksalaiset ja jiddishinkieliset siirtolaiset ääntivät nimen "Kesselgarten",
  josta tuli yleiskielinen ilmaus sekavalle, monikieliselle paikalle. —
  en-Wikipedia "Castle Clinton", osio "Immigrant landing and registration
  depot"
- Kaupungin, osavaltion ja liittovaltion omistajuuskiista Castle Gardenista
  jatkui koko 1870-luvun; The New York Times uutisoi riidasta nimenomaan
  5.7.1873. — en-Wikipedia "Castle Clinton", osio "1850s and 1860s" (viittaa
  New York Timesin 5.7.1873 artikkeliin "The Emigrant Landing Depot.;
  Disputed Title to Castle Garden")

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Joki jonka löysi englantilainen hollantilaisten palkkalistalla"
(655 merkkiä)**

> Englantilainen Henry Hudson purjehti 1609 Alankomaiden Itä-Intian
> kauppakomppanian palveluksessa etsien luoteisväylää Aasiaan — ja löysi sen
> sijaan joen, joka myöhemmin sai hänen nimensä. Pysyvä eurooppalainen asutus
> syntyi vasta 1624, kun hollantilaiset perustivat turkiskauppa-aseman
> Governors Islandille; seuraavana vuonna alkoi Fort Amsterdamin rakentaminen
> nykyisen Manhattanin kärkeen. Siirtokunta on Yhdysvaltain mantereen
> kahdestoista vanhin yhtäjaksoisesti asuttu eurooppalaisasutus. Kuvernööri
> Peter Stuyvesant kasvatti siirtokunnan väkiluvun 1647–1664 kahdesta
> tuhannesta kahdeksaan tuhanteen, mutta hallitsi tiukalla ja epäsuositulla
> otteella.

Faktat ja lähteet:
- Henry Hudson purjehti 1609 Hollannin Itä-Intian kauppakomppanian palveluksessa
  etsien luoteisväylää Aasiaan ja löysi Hudsonjoen. — en-Wikipedia "New York
  City", osio "Early history"
- Pysyvä eurooppalainen asutus perustettiin 1624 Governors Islandille
  (turkiskauppa-asema) — Yhdysvaltain mantereen kahdestoista vanhin
  yhtäjaksoisesti asuttu eurooppalaisasutus; Fort Amsterdamin rakentaminen
  Manhattanin kärkeen alkoi 1625. — en-Wikipedia "New York City", osio "Dutch
  rule"
- Peter Stuyvesantin kaudella (1647 alkaen) New Netherlandin väkiluku kasvoi
  2 000:sta 8 000:een; Stuyvesant sääntelysi alkoholikauppaa ja rajoitti muita
  uskontokuntia kuin hollantilaista reformoitua kirkkoa. — en-Wikipedia "New
  York City", osio "Dutch rule"

**Nosto H2 — "Kaksi kirjainta jotka vaihtoivat kaupungin nimen" (504 merkkiä)**

> Englanti valtasi New Amsterdamin taistelutta 1664 ja nimesi sen New
> Yorkiksi kuningas Kaarle II:n veljen, Yorkin herttuan, kunniaksi.
> Hollantilaiset saivat kaupungin hetkeksi takaisin 1673 ja kutsuivat sitä
> New Orangeksi, mutta seuraavana vuonna solmittu rauhansopimus palautti sen
> lopullisesti Englannille — ja nimi New York vakiintui pysyväksi 1674.
> Kaupunki toimi myös nuoren Yhdysvaltain ensimmäisenä pääkaupunkina
> 1785–1790, ennen kuin hallitus siirtyi ensin Philadelphiaan ja lopulta
> Washingtoniin.

Faktat ja lähteet:
- Englanti valtasi New Amsterdamin 1664 ja nimesi sen New Yorkiksi Yorkin
  herttuan (myöhemmin Jaakko II) kunniaksi; nimi vakiintui pysyvästi 1674 sen
  jälkeen, kun hollantilaisten väliaikainen 1673 valtaus päättyi
  rauhansopimukseen. — en-Wikipedia "New York City", osiot "Etymology" ja
  johdanto
- New York toimi Yhdysvaltain kansallisena pääkaupunkina 1785–1790. —
  en-Wikipedia "New York City", johdanto-osio

**Nosto H3 — "Rautatiekausi saapuu 42. kadulle" (540 merkkiä)**

> Rautatieruhtinas Cornelius Vanderbilt yhdisti kolme erillistä rautatietä
> yhteen asemaan: Grand Central Depot rakennettiin 42. kadulle 1869–1871, ja
> se oli valmistuessaan maailman suurin rautatieasema, kaksitoista raidetta
> ja tilaa 150 vaunulle kerrallaan. Rakennuspaikka oli tuolloin vielä
> kaupungin laitamilla — sijoittajatkin varoittelivat rakentamasta niin
> syrjäiseen paikkaan. Kun isoisä matkusti kaupungissa 1873, asema oli vasta
> kaksi vuotta vanha; nykyinen Grand Central Terminal rakennettiin samalle
> paikalle myöhemmin, vuonna 1913.

Faktat ja lähteet:
- Grand Central Depot rakennettiin 42. kadulle syyskuusta 1869 lokakuuhun
  1871; kolme rautatietä (Harlem, New Haven, New York Central & Hudson
  River) siirtyivät asemalle porrastetusti lokakuu–marraskuu 1871. —
  en-Wikipedia "History of Grand Central Terminal", osio "Grand Central
  Depot"
- Asema oli valmistuessaan maailman suurin rautatieasema, noin 200 jalkaa
  leveä ja 530 jalkaa pitkä junahalli, 12 raidetta ja tilaa 150 vaunulle
  kerrallaan; rakennuspaikka oli tuolloin kaupungin kehittymättömillä
  laitamilla. — en-Wikipedia "History of Grand Central Terminal", osio
  "Grand Central Depot"
- Nykyinen Grand Central Terminal rakennettiin samalle tontille myöhemmin
  (yleisesti tunnettu valmistumisvuosi 1913 — tarkistettava tarkemmin, ks.
  osio 7 huomio 3). — en-Wikipedia "History of Grand Central Terminal"

**Nosto H4 — "Syksy jolloin raha loppui" (587 merkkiä)**

> Syyskuun 18. päivänä 1873 pankkitalo Jay Cooke & Co teki konkurssin
> epäonnistuneen rautatierahoituksen vuoksi, ja New Yorkin pörssi sulki
> ovensa kymmeneksi päiväksi — ensimmäistä kertaa historiassaan. Paniikki
> levisi koko maahan: rakennustyö pysähtyi, palkkoja leikattiin ja New
> Yorkissa joka neljäs työntekijä jäi työttömäksi. Talouslama kesti
> vuosikymmenen loppuun asti ja tunnetaan Yhdysvalloissa nimellä Long
> Depression. Isoisän matkavuosi 1873 osui siis täsmälleen samaan syksyyn,
> jolloin kaupungin rahamaailma romahti — vaikka emme tiedä, oliko hän
> kaupungissa juuri sinä viikkona.

Faktat ja lähteet:
- Jay Cooke & Co teki konkurssin 18.9.1873 epäonnistuneen Northern Pacific
  Railway -rahoituksen vuoksi; New Yorkin pörssi (NYSE) sulki ovensa
  kymmeneksi päiväksi 20.9.1873 alkaen — ensimmäistä kertaa historiassaan. —
  en-Wikipedia "Panic of 1873", osiot "Jay Cooke & Company fails" ja
  "Effects"
- Paniikin vaikutukset näkyivät New Yorkissa nopeimmin: neljännes kaupungin
  työntekijöistä jäi työttömäksi. Talouslama tunnetaan Yhdysvalloissa nimellä
  "Long Depression" ja kesti 1870-luvun loppuun. — en-Wikipedia "Panic of
  1873", osio "Effects"
- **Huom (oma päättely, ei suoraan lähteestä):** en löytänyt tarkkaa
  päivämäärää isoisän New Yorkin-vierailulle — kaari ei ole vielä
  kirjoitettu tälle laudalle (Raamattu, "Kaupungit": "UUSIIN KAUPUNKEIHIN JA
  MAIHIN EI VIELÄ TARINAKAARTA"). Fable päättää myöhemmin, osuuko vierailu
  samaan syksyyn.

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Rakenne noudattaa Manilan/Medinan `matkailijalle.artikkeli.jaksot`-mallia.
Faktat on valittu niin, etteivät ne toista osion 2 nostoja — erityisesti
Wall Streetin ja Little Italyn tarinat ovat TÄSSÄ ensimmäistä kertaa, eivät
nostoissa.

**Jakso 1 — "Perille ja liikkeelle"**

New York kohoaa saarilta Hudsonjoen suulla, siellä missä joki avautuu
luonnostaan suojaisaksi satamaksi ja edelleen Atlantille — sijainti, joka
teki kaupungista merkittävän kauppasataman jo varhain. Vuosisatoja se oli
ennen kaikkea satama: ensin hollantilaisten kauppa-asema, sitten
höyrylaivojen ja siirtolaisten portti Eurooppaan ja takaisin. Viisi
kaupunginosaa — Manhattan, Brooklyn, Queens, Bronx ja Staten Island —
yhdistyivät yhdeksi kaupungiksi vasta 1898.

Faktat ja lähteet:
- New York sijaitsee Hudsonjoen suulla, joka avautuu luontaisesti suojaiseen
  satamaan ja edelleen Atlantille; sijainti on tehnyt kaupungista merkittävän
  kauppasataman. — en-Wikipedia "New York City", osio "Geography"
- Nykyinen New Yorkin kaupunki syntyi viiden kaupunginosan (Manhattan,
  Brooklyn, Bronxin osat, Richmond eli Staten Island, Queensin läntinen osa)
  yhdistyessä 1898. — en-Wikipedia "New York City", osio "Late 19th and early
  20th century"

**Jakso 2 — Alueen rakenne**

Manhattan on saarista pienin mutta tunnetuin: viime jääkauden muovaama
kallioperä jäi lähelle pintaa, ja se antoi vakaan perustan saaren
pilvenpiirtäjille. Brooklyn ja Queens ovat Long Islandin läntinen kärki,
Bronx ainoa kaupunginosa, joka on kiinni Yhdysvaltain mantereessa, ja Staten
Islandille pääsee Manhattanilta ainoastaan ilmaisella lautalla tai
Brooklynista Verrazzano-Narrows-sillan yli.

Faktat ja lähteet:
- Wisconsinin jääkauden (75 000–11 000 vuotta sitten) jäljiltä kallioperä jäi
  Manhattanilla suhteellisen lähelle pintaa, mikä on antanut vakaan perustan
  useimmille saaren pilvenpiirtäjille. — en-Wikipedia "New York City", osio
  "Geography"
- Brooklyn ja Queens sijaitsevat Long Islandin läntisellä kärjellä; Bronx on
  ainoa kaupunginosa, joka on pääosin kiinni Yhdysvaltain mantereessa. —
  en-Wikipedia "New York City", osio "Boroughs"
- Staten Island yhdistyy Brooklyniin Verrazzano–Narrows-sillalla ja
  Manhattaniin maksuttomalla Staten Island Ferryllä. — en-Wikipedia "New York
  City", osio "Boroughs"

**Jakso 3 — Arjen ilmiö: kortteli joka vaihtoi kieltä**

Mulberry Streetin kortteli Manhattanin alaosassa oli 1880-luvulta lähtien New
Yorkin italialaissiirtolaisten sydän — huippuvuonna 1910 alueella asui lähes
10 000 italialaista, ja neljästoista kaupunginosa oli yli 90-prosenttisesti
italialaissyntyisten asuttama. Katu oli aiemmin osa Mulberry Bendiä,
pahamaineista Five Pointsin slummia, jonka toimittaja Jacob Riis kutsui New
Yorkin slummien "inhoittavaksi ytimeksi". Toisen maailmansodan jälkeen moni
italialaisperhe muutti esikaupunkeihin, ja korttelin eteläpuolelta
laajentunut Chinatown otti tilaa Little Italylta — sama katu on nykyään
molempien historian risteyskohta.

Faktat ja lähteet:
- Massiivinen italialaissiirtolaisuus 1880-luvulta johti italialaisten
  keskittymiseen Manhattanin alaosaan; alueen huippuvuonna 1910 siellä asui
  lähes 10 000 italialaista, ja neljästoista kaupunginosa oli yli 90 % Italian
  syntyperää. — en-Wikipedia "Little Italy, Manhattan", ei numeroitua osiota
  (leipäteksti Minuit-purchase-osion jälkeen)
- Mulberry Bend, Little Italyn eteläosa, oli osa pahamaineista Five Pointsin
  slummia; toimittaja Jacob Riis kutsui sitä "New Yorkin slummien inhoittavaksi
  ytimeksi". — en-Wikipedia "Little Italy, Manhattan"
- Toisen maailmansodan jälkeen moni Lower East Siden asukas muutti
  Brooklyniin, Staten Islandille ja esikaupunkeihin; Chinatown laajeni
  Little Italyn suuntaan 1965 maahanmuuttolain jälkeen. — en-Wikipedia
  "Little Italy, Manhattan"
- **Kuvasynergia:** tämä jakso tukeutuu faktoiltaan samaan aiheeseen kuin
  peliin jo tarkistettu ennen–nyt-kuvapari (ks. osio 6.4) — Mulberry Street
  n. 1900 ja nykyään, jo `js/packs/northamerica-valokuvat.js`:ssä.

**Jakso 4 — Historian käännekohta: muuri joka antoi kadulle nimen**

New Amsterdamin eteläraja kulki paikassa, jota hollantilaiset kutsuivat vain
muuriksi: vuonna 1653 rakennettu noin neljän metrin puinen paalutus suojasi
siirtokuntaa alkuperäisväestön ja englantilaisten hyökkäyksiltä. Muuri
purettiin jo 1699, mutta sen paikalle jäänyt katu säilytti nimensä — Wall
Street. Isoisän vierailun aikaan kadusta oli jo tullut Yhdysvaltain
rahoituselämän sydän, vaikka itse muurista ei ollut jäljellä kiveäkään.

Faktat ja lähteet:
- New Amsterdamin siirtokunta ulottui Manhattanin eteläkärjestä nykyiselle
  Wall Streetille asti, jonne rakennettiin 1653 kaksitoista jalkaa (n. 3,7 m)
  korkea puinen paalutus suojaksi alkuperäisväestön ja englantilaisten
  hyökkäyksiä vastaan. — en-Wikipedia "New York City", osio "Dutch rule"
- Kadun nimi Wall Street periytyy tästä paalutuksesta; muuri purettiin 1699
  englantilaishallinnon aikana (yleistieto, ei suoraan tarkistettu tästä
  koosteesta luetusta raakatekstistä — **tarkistettava erikseen**, ks. osio
  7 huomio 4).

**Jakso 5 — Milloin kannattaa tulla**

New Yorkissa on lauhkea mannerilmasto neljine selkeine vuodenaikoineen
(Köppenin luokitus Cfa): kesät ovat kuumia ja kosteita, talvet kylmiä, mutta
Atlantin ja Appalakkien suoja pitää lämpötilan leudompana kuin sisämaan
kaupungeissa samalla leveysasteella. Sadetta tulee melko tasaisesti läpi
vuoden. Virallinen sääasema sijaitsi 1869–1919 Central Parkin Arsenaalissa
Viidennellä Avenuella — siis jo isoisän vierailun aikaan — ennen kuin se
siirrettiin nykyiselle paikalleen Belvedere-linnaan.

Faktat ja lähteet (en-Wikipedia "New York City", osio "Climate"):
- Köppenin ilmastoluokka Cfa (lauhkea, kostea mannerilmasto/"humid
  subtropical"); New York on pohjoisin suuri kaupunki Pohjois-Amerikan
  mantereella tässä luokassa.
- Tammikuun (kylmin kuukausi) vuorokauden keskilämpötila n. 0,7 °C
  (33,3 °F); heinäkuun (lämpimin) n. 25,3 °C (77,5 °F).
- Sadetta n. 1 260 mm (49,5 tuumaa) vuodessa, melko tasaisesti jakautuneena.
- Central Parkin viralliset säähavainnot on tehty 1869–1919 Arsenaalissa
  Viidennellä Avenuella ja 64. kadulla, sen jälkeen Belvedere-linnassa —
  havaintosarja ulottuu siis vuoteen 1869 asti, ennen isoisän matkaa.

---

## 4. Yhdeksän kohdekartan kohdetta

Koordinaatit MediaWiki-APIn `action=query&prop=coordinates`-kutsulla (haettu
22.8.2026), paitsi New York Cityn oma piste, joka haettiin samalla tavalla
`redirects=1`-parametrilla. Etäisyydet ja suunnat laskettu koneellisesti
haversine-kaavalla Python-skriptillä (ei käsin, toisin kuin Manilan
ensimmäisessä versiossa — ks. Manilan tarkistusraportin löydös Fort
Santiagosta).

| # | Nimi | Koordinaatit | Lähdeartikkeli | Etäisyys keskustasta | Suunta |
|---|---|---|---|---|---|
| 1 | New York, Wikipedian kaupunkipiste | 40,7128°N 74,0061°L | "New York City" (API) | (vertailupiste) | — |
| 2 | Trinity Church (Wall Street) | 40,70806°N 74,01222°L | "Trinity Church (Manhattan)" (API) | 0,74 km | LO |
| 3 | Federal Hall | 40,70722°N 74,01028°L | "Federal Hall" (API) | 0,71 km | LO |
| 4 | Castle Clinton (Castle Garden) | 40,7035°N 74,0168°L | "Castle Clinton" (API) | 1,37 km | LO |
| 5 | South Street Seaport | 40,70611°N 74,00333°L | "South Street Seaport" (API) | 0,78 km | E |
| 6 | Brooklyn Bridge | 40,7057°N 73,9964°L | "Brooklyn Bridge" (API) | 1,14 km | KA |
| 7 | Statue of Liberty National Monument | 40,69417°N 74,04306°L | "Statue of Liberty National Monument" (API) | 3,74 km | LO |
| 8 | Grand Central Terminal | 40,7528°N 73,9772°L | "Grand Central Terminal" (API) | 5,07 km | KO |
| 9 | Central Park (piste) | 40,78222°N 73,96528°L | "Central Park" (API) | 8,45 km | KO |

(P = pohjoinen, KO = koillinen, I = itä, KA = kaakko, E = etelä, LO = lounas,
L = länsi, LU = luode.)

**Rajausehdotus:** New Yorkin kohteet jakautuvat SELVÄSTI KAHTEEN
maantieteelliseen ryppääseen, toisin kuin Manilassa. Ensimmäinen (kohteet
2–6) on Lower Manhattanin 1873-kauden ydin, kaikki alle 1,5 km
vertailupisteestä — Trinity Church, Federal Hall ja Castle Clinton ovat
kaikki alle kilometrin päässä toisistaankin. Toinen ryppäänä ovat Grand
Central (5,1 km) ja Central Park (8,5 km), jotka olivat isoisän aikaan vielä
kaupungin POHJOISLAITAA (ks. Nosto H3: Grand Centralin sijoituspaikkaa
pidettiin 1869 liian syrjäisenä). Näiden kahden ryppään väliin jää
huomattava tyhjä alue (Midtown, joka 1873 oli vasta rakentumassa).
Suosittelen joko (a) laajaa n. 9 km rajausta, joka näyttää koko
1873-kaupungin kasvusuunnan pohjoiseen, tai (b) kahta erillistä
kohdekarttaa/karttanäkymää, jos moduuli tukee sitä — **tämä on
kartantekijän päätös, ei tässä ratkaistavissa**. Statue of Liberty (kohde 7)
on mukana TIETOISESTI anakronismina: patsasta ei ollut vielä olemassa 1873
(ks. osio 7, huomio 2) — jos kartta rajataan "mitä isoisä näki", tämä kohde
kannattaa ehkä jättää pois tai merkitä selvästi myöhemmäksi.

---

## 5. Säätiedot

- **Keskustan koordinaatit:** 40,7128°N, 74,0061°L — Wikipedian "New York
  City" -artikkelin infobox-koordinaatti, haettu Wikidatan kautta MediaWiki
  APIlla (raakateksti käyttää `{{Coord|region:US-NY_type:city}}`-mallinetta
  ilman suoria lukuja). — en-Wikipedia "New York City"
- **ERA5-normaalit puuttuvat tästä koosteesta:** en ajanut
  `tools/hae-saanormaalit.mjs`-työkalua (rajauksen mukaan en koske
  js/packs-tiedostoihin, ja työkalu kirjoittaa suoraan
  `js/packs/saatiedot.js`:ään). Kirjoittajan/Fablen kannattaa ajaa
  `node tools/hae-saanormaalit.mjs --vain newyork` ennen lehden viimeistelyä
  Manilan mallin mukaisesti.
- **NOAA:n 1991–2020-normaalit (varalähde, jos Open-Meteo antaa 429:n
  Samarkand-mallin mukaisesti):** en-Wikipedian "New York City" -artikkelin
  säälaatikko "New York City weatherbox" antaa kuukausikeskiarvot NOAA:n
  Central Park (Belvedere Castle) -asemalta, normaalikausi 1991–2020,
  ennätykset vuodesta 1869 (ks. osio 3, Jakso 5). Nämä EIVÄT ole pelin oman
  ERA5-työkalun lukuja, mutta kelpaavat samaan tapaan kuin Manilassa
  PAGASA-data.
- **Sanallinen vuodenkierto (varovainen, ei-numeerinen kuvaus, perustuu
  Wikipedian ilmasto-osioon):** New Yorkissa on neljä selkeää vuodenaikaa;
  kesät ovat kuumia ja kosteita, talvet kylmiä mutta Atlantin ja Appalakkien
  suojan ansiosta leudompia kuin sisämaassa samalla leveysasteella. Sade
  jakautuu melko tasaisesti ympäri vuoden ilman selvää kuivaa tai sadekautta.

---

## 6. Kuva-aiheet

Erityishuomio: **ei tunnistettavia ihmisiä missään kuvassa** (kaukaiset
pisteet ja selin olevat kelpaavat). New Yorkilla ei ole tuhoutunutta
kaupunkia -linjauksen tarvetta — tuhoa ei tarvitse selittää.

### 6.1 Avauskuvat (3)

1. Brooklynin sillan arkkitehtuuri lähikuvassa (kaapelit, kivitornit), ei
   ihmisiä — teemasivun `historia` avaus, koska silta on koko sivun vahvin
   1873-ankkuri.
2. Bethesda-terassin Angel of the Waters -patsas lähikuvassa.
3. Castle Clintonin (Castle Garden) linnoitusarkkitehtuuri ulkoa kuvattuna.

### 6.2 Kansikuvaehdokkaiden KATEGORIALISTAUS — 3 laajaa yleiskuvaa

Raamatun KANSIKARUSELLI-linjauksen (21.8.2026) mukaisesti: kolme LAAJAA
yleiskuvaa kaupungin ERI puolilta, ei yhtään yksityiskohtaa, sisäkuvaa,
reliefiä, ruokaa tai esinettä. Alla Commons-KATEGORIAT haku­lähtökohdaksi
— EI valittuja tiedostoja, kirjoittaja tekee lopullisen valinnan ja
silmätarkistuksen:

1. **Siluetti kaukaa:** `Category:Manhattan skylines` tai
   `Category:Lower Manhattan skylines from Brooklyn Bridge Park` — Manhattanin
   pilvenpiirtäjäsiluetti veden yli kuvattuna.
2. **Ranta/satama:** `Category:New York Harbor` tai `Category:Panoramas of
   Manhattan, New York City` — laaja näkymä satamasta tai rannasta, esim.
   Lower Manhattan lahden suunnasta.
3. **Maamerkki ympäristössään:** `Category:Aerial photographs of Manhattan,
   New York City` tai `Category:Views of Manhattan, New York City from
   above` — ilmakuva, jossa esim. Central Park tai Brooklynin silta näkyy
   osana ympäröivää kaupunkia, ei irrallisena yksityiskohtana.

Näistä kannattaa hakea myös 1800-luvun PD-vaihtoehtoja (litografioita,
panoraamoja) samaan tapaan kuin Manilan galleonikuvituksessa, jos
nykykuvat eivät riitä laajuudeltaan — esim. Currier & Ives -kuvitukset
sillasta rakenteilla (ks. Brooklyn Bridge -artikkelin kuvat "The great East
River bridge... LCCN2001704255" ja "Manhattan 1876.jpg", molemmat PD/LoC).

### 6.3 Nosto-/jaksokuvat (8)

1. Brooklynin sillan tornit rakenteilla (historiallinen kuva/litografia,
   esim. "Manhattan 1876.jpg", joka näyttää sillan kesken — PD, Library of
   Congress -peräisin, tarkistettava Commonsista).
2. Bethesda-suihkulähteen Angel of the Waters -patsas kokonaisuudessaan.
3. Central Parkin varhainen kartta tai piirros 1858–1873 -ajalta (Greensward
   Plan -aiheinen PD-kuvitus).
4. Castle Gardenin/Castle Clintonin ilmakuva tai laaja ulkonäkymä n.
   1880-luvulta (esim. "Castle Garden aerial view ca1880.jpg", PD).
5. Grand Central Depotin (1871) historiallinen kuva — Commonsissa tiedosto
   "Grand Central Depot (NYPL b13476047-421000).jpg", NYPL-kokoelma, PD.
6. Mulberry Streetin katunäkymä n. 1900 — tämä on JO peliin tarkistettu
   valokuva (ks. 6.4), ei tarvitse uutta hakua.
7. Wall Streetin varhainen näkymä tai kartta (esim. Castello Plan 1660 tai
   1800-luvun Wall Street -litografia).
8. Trinity Churchin tai Federal Hallin julkisivu — molemmat olivat jo
   pystyssä 1873. Trinity Churchin nykyinen (kolmas) kirkkorakennus
   valmistui ja vihittiin 1.5.1846, ja sen 279 jalan torni oli New Yorkin
   korkein rakennus aina vuoteen 1890 asti — isoisän vierailun aikaan
   kaupungin siluetin hallitsija. — en-Wikipedia "Trinity Church
   (Manhattan)"; torninkorkeus vahvistettu myös en-Wikipedia "Brooklyn
   Bridge", osio "Towers"

### 6.4 Ennen ja nyt -kuvaparin ehdokkaat

**TÄRKEÄ LÖYDÖS: New Yorkilla on jo valmis, PELIIN TARKISTETTU ennen–nyt-pari**
tiedostossa `js/packs/northamerica-valokuvat.js` (rivit n. 1010–1053, avain
`newyork`). Kaupunkilehti.md:n ohjeen mukaisesti ("Useimmilla kuvat tulivat
matkakirjan valokuvatauluista... silloin tiedostonimi, vuosi ja lähderivi
kopioidaan sellaisenaan ja vain selite kirjoitetaan uudestaan yhdeksi
virkkeeksi") tämä pari on todennäköisesti se, joka kannattaa siirtää
`ennenNyt`-kenttään sellaisenaan:

- **Vanha:** `NYC Mulberry Street 3g04637u.jpg`, vuosi "noin 1900", lähde
  Library of Congress (PD). Nykyinen selite (valokuvatauluista, moni virke)
  kertoo Mulberry Streetin toriaidasta ja italialaissiirtolaisyhteisöstä.
- **Uusi:** `Little Italy, Mulberry Street, Manhattan, New York
  (7237377196).jpg`, lähde Ken Lund, Commons (CC BY-SA 2.0). Nykyinen
  selite kertoo saman kadun nykytilasta (ravintolat, kutistunut
  italiankielinen kortteli).
- **Toimenpide kirjoittajalle:** kopioi tiedostonimet, vuosi ja lähderivit
  SELLAISENAAN `ennenNyt: [ vanha, uusi ]` -kenttään ja kirjoita KUMPAANKIN
  YKSI virke uudeksi seliteeksi (nykyiset selitteet ovat useamman virkkeen
  mittaisia, koska ne on kirjoitettu valokuvataulun sääntöjen mukaan, eivät
  kaupunkilehden yksivirke-linjauksen mukaan). Tarkista myös, tarvitseeko
  vanha kuva harmaasävyn (raja vuosi 1960 — "noin 1900" alittaa rajan
  selvästi).
- Vaihtoehtoiset ennenNyt-parit (JOS Mulberry Street osoittautuu
  tarpeelliseksi säästää nostoon eikä ennenNyt-kenttään): en löytänyt
  yhtä hyvin dokumentoitua vaihtoehtoa Brooklynin sillasta (rakenteilla
  1870-luvulla / nykyään) — tämä olisi PARAS teemakuva 1873-kulman
  kannalta, ja kannattaa hakea erikseen Commonsista, jos Mulberry Street
  käytetään mieluummin toisaalla.

### 6.5 Kuvien lähdehuomio

En hakenut, katsonut enkä valinnut yksittäisiä Commons-tiedostoja tässä
koosteessa (rajauksen mukaisesti) — yllä on vain kategoria- ja
aihetasoisia ehdotuksia sekä yksi jo olemassa oleva, peliin tarkistettu
pari. Kirjoittaja tekee varsinaisen kuvahaun, silmätarkistuksen ja
lisenssivarmistuksen lehtityö-reseptin kuvasääntöjen mukaisesti.

---

## 7. Vanhan äänitteen ehdokkaat (PD, n. 1900–1925)

Etsin Commonsista ja archive.orgista (National Jukebox / George Blood 78 rpm
-kokoelma) New Yorkiin liittyvää PD-äänitettä `js/packs/vanhat-aanet.js`:n
mallin mukaisesti (kaupunki-id `newyork`; tiedostoa ei ladata repoon, vain
osoite Commonsiin/archive.orgiin).

**Ehdokas 1 (VAHVIN): "The Sidewalks of New York" (1920), Royal Waikiki
Hawaiian Orchestra**
- Archive.org-tunniste:
  `78_the-sidewalks-of-new-york_royal-waikiki-hawaiian-orchestra-h-j-clarke-lawlor-blak_gbia0298045a`
  (kokoelma `georgeblood`, Internet Archiven ja Bostonin kirjaston 78 rpm
  -digitointiprojekti).
- Levytysvuosi 1920, julkaisija Actuelle-levymerkki. Kappaleen kirjoittivat
  Lawlor ja Blake alun perin 1894 — se on New Yorkin tunnetuin
  katukulttuuria kuvaava vanha laulu ("East Side, West Side, all around the
  town").
- **Lisenssihuomio (TARKISTETTAVA ennen käyttöä):** metadata ei sisällä
  eksplisiittistä `licenseurl`-kenttää. Pre-1923-äänitteet tulivat
  julkisiksi Yhdysvalloissa 1.1.2022 Music Modernization Act -lain
  siirtymäsäännön nojalla (yleistieto, ei tässä erikseen varmistettu
  Commonsin extmetadata-rajapinnasta, koska tiedosto ei ole Commonsissa
  vaan archive.orgissa) — kirjoittajan on vahvistettava PD-status ennen
  käyttöä samaan tapaan kuin muillekin äänitteille.
- B-puolen kappale samalla levyllä: "On the Banks of the Wabash, Far Away"
  (ei New York -aiheinen, ei tarvita).

**Ehdokas 2 (HYLÄTTY): "Give My Regards to Broadway", George M. Cohan
(1904)**
- Commons-tiedosto `File:George M. Cohan - Give My Regards To Broadway
  (1904).ogg` löytyi hausta, ja aihe (Broadway/New York) sopisi täydellisesti.
  **EI KELPAA sellaisenaan:** Commonsin extmetadata paljastaa, että
  tiedosto on käyttäjän Gnissah "oma teos" (Own work), ladattu 2026 — eli
  MODERNI uusintaesitys 1904 nuottien pohjalta, ei aikalaisäänite. Tämä ei
  täytä toimeksiannon "n. 1900–1925 PD-tallenne" -vaatimusta, koska kyse ei
  ole historiallisesta äänitteestä.
- Alkuperäinen kappale on kuitenkin niin vahvasti New Yorkiin liittyvä
  ("Give my regards to Broadway, remember me to Herald Square"), että
  kirjoittajan kannattaa etsiä ERIKSEEN genuiini 1900-luvun alun
  levytys — en löytänyt sellaista käytettävissä olleella hakuajalla.

**Muut haut, joilla ei löytynyt kelpaavaa osumaa:** "Bowery"-aiheiset
laulut (vain nuottikuvia/kansia, ei äänitteitä), suoraan "Brooklyn
Bridge" -aiheiset äänitteet, "Yankee Doodle Boy" (1916/1910-versiot
löytyivät mutta eivät ole erityisesti New York -aiheisia vaan
yleisamerikkalaisia isänmaallisia lauluja).

**Suositus kirjoittajalle:** käytä Ehdokas 1:tä ("The Sidewalks of New
York", 1920) mutta VARMISTA PD-status uudestaan ennen linkitystä, ja jos
aikaa on, tee lisähaku Library of Congressin National Jukeboxista
suoraan (loc.gov/jukebox) — se on georgeblood-kokoelman alkuperäinen
lähde ja saattaa antaa selkeämmän lisenssimerkinnän kuin archive.orgin
peilikopio.

---

## 8. Ristiriidat, epävarmuudet ja ei-Wikipedia-lähteet

1. **Viisi tapahtumaa osuu poikkeuksellisen tarkasti vuoteen 1873** — tämä
   EI ole sattumaa vaan syy koko teemasivun `historia`-valinnalle: Brooklynin
   sillan tornien korkeudet mitattiin kesäkuussa 1873 (K2/H2-lähde: New York
   Times/New York Daily Herald 3.6.1873), Bethesda-suihkulähde paljastettiin
   kesäkuussa 1873 (K3-lähde: New York Times 1.6.1873), Castle Gardenin
   omistajuuskiistasta uutisoitiin heinäkuussa 1873 (K4-lähde: New York Times
   5.7.1873), ja Jay Cooke & Co:n konkurssi + pörssin sulkeutuminen tapahtui
   syyskuussa 1873 (H4). Nämä neljä päivämäärää (kesä–syyskuu 1873) ovat
   KAIKKI peräkkäisiä kuukausia samana vuonna — jos isoisän matkapäiväkirjan
   New Yorkin-kohtaus halutaan ajoittaa tarkasti, kaikki neljä tapahtumaa
   olisivat teoriassa samanaikaisia hänen matkallaan. **Tämä on huomionarvoinen
   löydös Fablelle/kaaren kirjoittajalle**, ei omaa päätöstäni.

2. **Vapaudenpatsas ja Ellis Island EIVÄT olleet olemassa 1873** —
   tärkeä anakronismivaroitus. Vapaudenpatsaan nimi ja hanke julkistettiin
   vasta syyskuussa 1875; käsi ja soihtu näytettiin ensin Philadelphian
   Centennial-näyttelyssä 1876, koko patsas koottiin New Yorkin satamaan
   vasta 1886. Ellis Island avattiin siirtolaisasemana vasta 1892 (Castle
   Garden oli sitä ennen ainoa asema, ks. K4). Jos peli tai kaari joskus
   näyttää isoisän katsovan Vapaudenpatsasta satamassa 1873, se on
   anakronismi — hän näki VAIN Castle Gardenin. — en-Wikipedia "Statue of
   Liberty", osio "Announcement and early work"; en-Wikipedia "Ellis
   Island"; en-Wikipedia "Castle Clinton"

3. **Grand Central Terminalin (nykyinen rakennus) valmistumisvuosi 1913**
   mainitaan Nostossa H3 yleistietona — luin sen "History of Grand Central
   Terminal" -artikkelin otsikkotasolta ja rakenteesta mutta en ehtinyt
   lukea koko 219 kt:n raakatekstiä kattavasti läpi tämän koosteen aikana.
   **Tarkistettava erikseen** ennen julkaisua samaan tapaan kuin Manilan
   San Agustin -huomautus.

4. **Wall Streetin muurin purkuvuosi (1699)** on yleistietoa, jota en
   löytänyt suoraan lukemastani "New York City" -artikkelin raakatekstin
   osasta (artikkeli mainitsee muurin RAKENTAMISEN 1653 mutta ei sen
   PURKAMISTA samassa kohdassa). **Tarkistettava erikseen** ennen käyttöä,
   esim. artikkelista "Wall Street" tai "Wall Street (fortification)".

5. **Filippiinien-tyylistä koordinaattien kaksoiskäyttöä ei tässä
   tapauksessa esiinny** (toisin kuin Manilassa Manilan katedraali/
   Intramuros) — kaikki yhdeksän kohdekartan pistettä saivat toisistaan
   eroavat koordinaatit MediaWiki-APIsta.

6. **Etäisyydet ja suunnat osiossa 4 on laskettu koneellisesti**
   (Python-skripti, haversine-kaava pallogeometrialla, R=6371 km), EI käsin
   kuten Manilan ensimmäisessä versiossa, jossa Fort Santiagon etäisyys oli
   virheellinen. Laskentatapa on kirjattu osion 4 alkuun.

7. **Panic of 1873 -osion faktat ovat Yhdysvaltain LAAJUISIA**, ei
   pelkästään New Yorkin — käytin vain niitä lauseita, jotka nimenomaisesti
   koskevat New Yorkia (pörssin sulkeminen, 25 % työttömyys kaupungissa).
   Koko kansallisen laman laajempaa kuvausta (rautateiden konkurssit,
   rautatielakko 1877 jne.) ei ole tuotu tähän koosteeseen, koska se
   laajentaisi aiheen New Yorkin ulkopuolelle.

8. **Vanhan äänitteen lisenssi (osio 7) on VAHVISTAMATTA** — archive.orgin
   metadata ei anna eksplisiittistä lisenssikenttää tälle tallenteelle,
   toisin kuin Commonsin extmetadata yleensä. Kirjoittajan on
   varmistettava PD-status uudestaan ennen linkittämistä peliin.

9. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
   tekstiksi** merkkimäärätavoitteiden mukaan, ja merkkimäärät on laskettu
   KONEELLISESTI Python-skriptillä (`len()`), toisin kuin Manilassa, jossa
   luvut olivat käsin arvioituja. Nostot K1–K4, H1–H4 ovat kaikki
   440–660 merkin sisällä (kaupunkilehti.md:n mitta); tarkat luvut lukevat
   otsikoissa. Johdannot (271 ja 269 merkkiä) ovat hieman Manilan
   esimerkkiä (218–229 merkkiä) pidempiä, koska Raamatun 20.8.2026-linjaus
   ("TEKSTIEN PAINOPISTE") kumosi vanhan 154–232 merkin normin sivun
   johdannolle eikä anna tilalle tarkkaa lukua — vain "1–2 virkettä,
   lyhyt". Kirjoittaja voi tiivistää edelleen tarpeen mukaan.

10. **Draft Riots 1863 jätettiin tarkoituksella kokonaan pois** (ks.
    dokumentin alun sisältölinjaus-huomautus) — tämä poikkeaa Manilan
    tavasta tuoda arka aihe mukaan "maininnan tasolla", koska New Yorkin
    tapauksessa itse ydintapahtuma (rotuun perustuva joukkoväkivalta) ei
    kestä samanlaista lyhennystä kuin Manilan sotatuho-maininta. Jos
    Fable tai kirjoittaja haluaa silti käsitellä aihetta, se vaatii oman,
    erikseen harkitun sisältöpäätöksen — en ole tehnyt sitä puolesta.
