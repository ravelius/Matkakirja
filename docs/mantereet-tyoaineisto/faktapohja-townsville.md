# Townsville — faktakoostaja, uusi kaupunkilehti

Lauta-id `oceania`, kaupunki-id `townsville`, maa AUS, en-Wikipedia
"Townsville". Kaikki tiedot haettu Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä, User-Agent `Matkakirja/1.0
(https://github.com/ravelius/Matkakirja)`) **7.9.2026**. Malli ja mitat
luettu tiedostoista `tools/parvi/kaupunkilehti-ohje.md`,
`tools/parvi/kohdekartta-ohje.md`, `docs/aasia-tyoaineisto/
lehtityo-resepti.md`, `docs/moduulit/kaupunkilehti.md` ja
`docs/mantereet-tyoaineisto/spec-mantereet.md`. Mallilehdet: **Lagos ja
Fes (v1670)** sekä samasta parvierästä **Salta ja Antofagasta**.

## 0. Kielivalinta — KAIKKI LÄHTEET OVAT ENGLANNIKSI

Toisin kuin Saltassa ja Antofagastassa, Townsvillessä ei tarvita
toista kieliversiota: `list=geosearch` en-Wikipediaan (−19,2590 /
146,8169, säde 1 600 m) palautti yli yhdeksänkymmentä osumaa, ja
jokaisella kohdekartan kahdeksalla kohteella on oma perusteellinen
englanninkielinen artikkeli. Useimmat niistä on kirjoitettu
Queensland Heritage Register -kuvausten pohjalta (artikkeleiden
lopussa malline `QHR-CC-2014-contains`), joten ne ovat poikkeuksellisen
yksityiskohtaisia rakennushistorian osalta.

Luetut lähdeartikkelit **en-Wikipedia (7.9.2026)**: "Townsville",
"James Morrill (castaway)", "Magnetic Island", "Castle Hill,
Townsville", "SS Yongala", "Charters Towers", "Eddie Mabo",
"Queensland Museum Tropics", "Perc Tucker Regional Gallery", "Queens
Gardens, Townsville", "Townsville Post Office", "Townsville Customs
House", "The Strand, Townsville", "Tobruk Memorial Baths", "Townsville
School of Arts", "St James Cathedral, Townsville", "Sacred Heart
Cathedral, Townsville", "Great Northern Hotel, Townsville",
"Townsville railway station", "Victoria Bridge, Townsville".

## 1. Rajaus tälle lehdelle

**Australian maalehti (`js/packs/maa-kategoriat.js`, AUS) on tehty ja
sen aiheita EI toisteta.** Maalehti kertoo: ensimmäinen laivasto ja
252 päivää merellä, viimeinen vankilaiva, Eurekan paalutus,
liittovaltio ja kolme raideleveyttä; viisisataa kansaa ja
viisikymmentä vuosituhatta, emu tähtien välissä, tulenhoito, Uluru;
kulta ja väkiluvun kolminkertaistuminen, kaksikymmentäkuusi lammasta
Kapkaupungista, sähkelennätin, Murray-joki; kuvasta maalattu
kenguru, vesinokkaeläin, **Iso valliriutta**, Nullarbor; damper,
swag, riisi ja tee kultakentillä, vegemite.

Karttanostot on luettu: `js/packs/maastokohteet-aus.js` (Port Arthur,
Ubirr, Parkesin radioteleskooppi, Broken Hill, Mungojärvi, Snowy
Mountains, Eurekan paalutus, Cooktown, Mount Augustus, **Iso
valliriutta**, Tasmania), `js/packs/skandaalit.js` (AUS: Batavia 1629)
ja `js/packs/elaintakyt.js` (AUS: koala). Yksikään ei ole tämän
lehden aihe.

**Cairnsin ja Darwinin kaupunkilehdet ovat valmiit, eikä niiden
aiheita toisteta.** Cairns: Gimuy ennen Cairnsia, vuoden 1873
retkikunta, vuorelle kiipeävä rautatie, Grafton Streetin
kiinalaiskaupunki; riutan ikä, korallien vaalentuminen,
Daintree, sademetsän palautus asukkailleen. Darwin: Palmerstonin
nimenvaihto, Overland Telegraph, larrakiat, neljä
uudelleenrakennusta; **vuoden 1942 pommitukset**, **hirmumyrsky
Tracy**, kiinalaiskaupunki, Burnett House; sadekausi, krokotiilit,
kasvitieteellinen puutarha, East Point; vankilasta lähtenyt näyttely,
Telstra-palkinto, katutaide, kalastajien ikkuna.

**Tästä seuraa kaksi tietoista poisjättöä.** (1) Isoa valliriuttaa ei
käsitellä lainkaan, vaikka Townsvillessä on riuttaviranomaisen
päämaja: riutta on sekä maalehden noston, karttanoston että Cairnsin
lehden aihe. (2) Toisen maailmansodan pommituksia ja hirmumyrskyjä
EI oteta noston aiheeksi, koska Darwinin lehti kertoo juuri ne kaksi
tarinaa. Townsvillen kolme japanilaista ilmahyökkäystä heinäkuussa
1942 mainitaan vain kohdekartan postitalojutussa (kellotorni
purettiin) ja hirmumyrskyt matkaoppaan Hyvä tietää -osiossa.

## 2. Perustiedot

- Sijainti: Queenslandin koillisrannikko, Cleveland Bayn rannalla;
  1 350 km Brisbanesta pohjoiseen ja 350 km Cairnsista etelään.
  ("Townsville", Geography)
- Väkiluku: 204 541 vuonna 2026 kaupungin oman ilmoituksen mukaan;
  vuoden 2021 väestönlaskennassa 179 011. Pohjois-Queenslandin ja
  koko Pohjois-Australian suurin taajama. ("Townsville", johdanto ja
  Demographics)
- Vuonna 2021 yhdeksän prosenttia asukkaista oli aboriginaali- tai
  Torresinsalmen saarelaistaustaisia, 21 180 ihmistä. ("Townsville",
  Demographics)
- Alkuperäiskansat: wulgurukaba, bindal, girrugubba, warakamai ja
  nawagi. Wulgurukabat sanovat olevansa kaupunkialueen perinteisiä
  omistajia; bindalien vaatimus hylättiin liittovaltion tuomioistuimessa
  2005. Wulgurukabat kutsuvat maataan nimellä **Gurrumbilbarra**,
  bindalit nimellä **Thul Garrie Waja**. ("Townsville", Early history)
- Talous: ainoa kaupunki maailmassa, joka jalostaa kolmea eri
  perusmetallia — sinkkiä, kuparia ja nikkeliä. Nikkelimalmi tuodaan
  Indonesiasta, Filippiineiltä ja Uudesta-Kaledoniasta. ("Townsville",
  Economy)
- Suuret laitokset: James Cook -yliopiston suurin kampus, Australian
  meritieteen instituutin päämaja, Ison valliriutan meripuiston
  viranomainen, Lavarack Barracks -varuskunta ja RAAF-tukikohta.
  ("Townsville", Economy)

## 3. Historia

### Ennen kaupunkia
- James Cook näki seudun ensimmäisellä matkallaan 1770 mutta ei
  noussut maihin; hän nimesi Cape Clevelandin, Cleveland Bayn ja
  **Magnetical Islandin**. ("Townsville", Early history)
- 1819 kapteeni Phillip Parker King ja kasvitieteilijä Allan Cunningham
  olivat ensimmäiset eurooppalaiset, joiden maihinnousu on kirjattu.
  ("Townsville", Early history)
- 1846 **James Morrill** haaksirikkoutui laivasta *Peruvian* ja eli
  seudulla bindalien parissa 17 vuotta. ("Townsville", Early history)
- 1860 George Elphinstone Dalrymple johti meritse retkikunnan
  Brisbanesta Cleveland Bayhin. Kohtaaminen päättyi laukauksiin.
  ("Townsville", Early history)

### James Morrill (oma artikkeli)
- Syntyi 20.5.1824 Heybridgessä Essexissä; isä oli myllynrakentaja.
  Lähti koulusta 13-vuotiaana merille. ("James Morrill (castaway)",
  Early life)
- Helmikuussa 1846 *Peruvian* lähti Sydneystä 130 setritukin kanssa
  kapteeni George Pitkethleyn komennossa; laivalla oli 16 miehistön
  jäsentä ja kuusi matkustajaa. Alus ajoi riutalle Minerva Shoalin
  lähellä Korallimerellä. 21 ihmistä pääsi purjelautalle.
  ("James Morrill (castaway)", Shipwreck of Peruvian)
- Lautta ajelehti 42 päivää ja saapui Cape Clevelandiin; hengissä oli
  seitsemän. Rannalla kuoli vielä kolme. ("James Morrill (castaway)",
  Shipwreck of Peruvian)
- Cape Clevelandin ja Mount Elliotin klaanit tulivat kahden viikon
  kuluttua; eloonjääneille annettiin ruokaa ja vettä ja heidät
  opetettiin keräämään ravintoa. ("James Morrill (castaway)",
  Inclusion into Aboriginal society)
- Morrill sai nimen **Karckynjib-Wombil-Mooney**, oppi kahdeksan
  biri-kielen murretta ja eli klaanin jäsenenä vuodesta toiseen.
  ("James Morrill (castaway)", Inclusion into Aboriginal society)
- 1863 Morrill siirtyi Burdekin-joelle lähestyäkseen siirtokuntalaisia.
  Hän pesi itsensä purossa, kiipesi Jarvisfieldin lammasaseman
  aidalle ja huusi: "do not shoot me, I am a British object — a
  shipwrecked sailor." ("James Morrill (castaway)", Encountering
  British colonisation)
- Ennen paluutaan hän varoitti klaaninsa siirtymään rannikolle. Klaani
  pyysi häntä kysymään, saisivatko he pitää edes suomaat Burdekinin
  pohjoispuolella. ("James Morrill (castaway)", Encountering British
  colonisation)
- Morrill tarjoutui välittäjäksi; tarjous hylättiin. Hän kuoli
  30.10.1865 Bowenissa; muistomerkki pystytettiin 1963.
  ("James Morrill (castaway)", Life in colonial British society;
  Death and legacy)
- David Malouf käytti Morrillin kokemuksia romaanissaan *Remembering
  Babylon* (1993). ("James Morrill (castaway)", Death and legacy)

### Kaupungin perustaminen
- Burdekin-joen vuotuinen tulva teki joen pohjoispuolisen sataman
  välttämättömäksi karjataloudelle. ("Townsville", Establishment)
- Woodstock Stationin **John Melton Black**, sydneyläisen liikemiehen
  **Robert Townsin** työntekijä, lähetti Andrew Ballin, Mark Watt
  Reidin ja kahdeksan alkuperäisväestön poliisin osaston etsimään
  paikkaa. Ballin joukko saapui Ross Creekille **huhtikuussa 1864** ja
  leiriytyi Melton Hillin kallioharjanteen alle, lähelle nykyistä
  tullitaloa The Strandilla. ("Townsville", Establishment)
- **RISTIRIITA:** "Townsville Customs House" sanoo, että Ball ja Reid
  pystyttivät leirin **marraskuussa 1864** lähelle Ross Creekin suuta.
  Sama artikkeli sanoo, että W. A. Rossin johtama toinen ryhmä saapui
  5. marraskuuta. Ks. tarkistus, kohta A.
- 1866 Robert Towns kävi paikalla kolme päivää — ensimmäinen ja ainoa
  käyntinsä. Hän lupasi jatkuvan rahoituksen, ja kaupunki nimettiin
  hänen mukaansa. Townsville julistettiin kunnaksi helmikuussa 1866,
  ja Black valittiin sen ensimmäiseksi pormestariksi. ("Townsville",
  Establishment)
- Cleveland Bay julistettiin **tuontisatamaksi 17.6.1865**. Queenslandin
  toimeenpaneva neuvosto käytti nimeä "Townsville" ensimmäisen kerran
  **6.9.1865** hyväksyessään tullireservin tontin. ("Townsville Customs
  House", History)
- Townsville kasvoi nopeasti Cape Riverin, Gilbertin, Ravenswoodin,
  Etheridgen ja Charters Towersin kultakenttien satamana ja
  palvelukeskuksena. ("Townsville", Establishment)
- Kultaa löydettiin Cape Riveriltä 1867 ja Ravenswoodista 1869.
  ("Townsville Customs House", History)
- Alligator Creekin teurastamo perustettiin 1879; siellä työskenteli
  jopa 1 500 ihmistä. ("Townsville", Establishment)

### Tyynenmeren saarelaistyövoima
- 8.7.1866 Robert Towns toi Townsvilleen ensimmäisen laivalastin
  Tyynenmeren saarelaisia sokeriruoko- ja puuvillapelloille. Heitä oli
  56, ja he saapuivat *Blue Bell* -aluksella Loyautén saarilta ja
  Uusilta Hebrideiltä. Townsin värvääjää Henry Ross Lewiniä vastaan
  esitettiin syytöksiä siitä, että osa saarelaisista oli siepattu.
  ("Townsville", Importation of South Sea Islander labour)

### Vuosisadan vaihde
- Väkiluku oli 4 000 vuonna 1882 ja 13 000 vuonna 1891.
  ("Townsville", Turn of the century)
- 1901 Lord Hopetoun avasi Townsvillen kaupungintalon, ja Australian
  lippu nostettiin ensimmäistä kertaa kuvernöörin seremoniassa.
  Townsvillestä tuli Brisbanen ohella kaupunki 1902. ("Townsville",
  Turn of the century)
- **1896 Japani perusti Townsvilleen ensimmäisen australialaisen
  konsulaattinsa** palvellakseen noin 4 000:ta japanilaista
  siirtotyöläistä, jotka työskentelivät sokeriruokopelloilla sekä
  kilpikonna-, troko-, merimakkara- ja helmenpyyntielinkeinoissa.
  Valkoisen Australian politiikan myötä työvoiman kysyntä väheni ja
  konsulaatti suljettiin 1908. ("Townsville", Japanese influence)

### Eddie Mabo
- Eddie ja Bonita Mabo perustivat Townsvilleen Black Community Schoolin
  1973. Eddie Mabo työskenteli James Cook -yliopistossa puutarhurina
  1967—1975. Yliopistolla hän kuuli 1974 ensimmäisen kerran, mitä
  *terra nullius* -oppi merkitsi hänen maalleen. ("Townsville",
  1960s and 1970s)
- 1981 yliopistolla pidettiin maaoikeuskonferenssi, jossa Mabo selosti
  Murray Islandin perintöjärjestelmää. Kuulijoiden joukossa ollut
  lakimies ehdotti koeoikeudenkäyntiä; perthiläinen asianajaja Greg
  McIntyre otti jutun ja värväsi Ron Castanin ja Bryan Keon-Cohenin.
  ("Townsville", 1980s)
- **3.6.1992** Australian korkein oikeus ratkaisi jutun *Mabo v
  Queensland (No 2)* Mabon hyväksi ja tunnusti alkuperäisen
  maaoikeuden ensimmäistä kertaa Australiassa. James Cook -yliopiston
  Douglasin kampuksen kirjasto on nimetty hänen mukaansa.
  ("Townsville", 1990s ja 1980s)

## 4. Maantiede ja ilmasto

- Cleveland Bay on enimmäkseen matala; **Magnetic Island** on 8 km
  rannikolta pohjoiseen. Saari, keskustan Castle Hill ja etelän Mount
  Stuart muodostavat yhden ison kvartsimonzoniittisen kivilajiprovinssin.
  ("Townsville", Geography)
- **Castle Hill** on 286 metriä merenpinnasta ja hallitsee keskustaa.
  ("Townsville", Geography) Oma artikkeli: perinnesuojeltu vaaleanpunainen
  graniittimonoliitti, alkuperäiskansan nimeltä **Cootharinga** (myös
  Cooderinga); merkitty Queenslandin perintörekisteriin 1993; Goat Track
  -polulla on 758 porrasta; huipulle vievä tie rakennettiin 1935—36
  työllisyystyönä. Vuohet syövät kasvillisuuden 1800-luvulla, ja ne
  poistettiin vasta 1930-luvulla. **"There have been at least two
  attempts to raise the height of Castle Hill so that it would qualify
  as a mountain."** ("Castle Hill, Townsville")
- Ross River virtaa kaupungin läpi; kolme patoa ja ruoppaus ovat
  tehneet siitä syvän ja vakaan. Ross River Dam on 30 km suulta.
  ("Townsville", Geography)
- Kolme kasvitieteellistä puutarhaa: Anderson Park, Queens Gardens ja
  The Palmetum. ("Townsville", Geography)
- Ilmasto on trooppinen savanni (Köppen Aw). **Talven sademäärä on
  pienempi kuin muualla Queenslandin itärannikon tropiikissa**, koska
  rannikko kääntyy tässä itä—länsisuuntaiseksi eikä kaakkoispasaati
  enää nouse rinnettä ylös. Talvikuukaudet ovat siksi sinitaivaisia:
  lämpimät päivät, viileät yöt. ("Townsville", Climate)
- Keskimääräinen vuosisade **1 095 mm** 61 sadepäivänä, josta suurin
  osa marras—huhtikuun sadekaudella. **RISTIRIITA:** artikkelin
  tietolaatikko antaa 1 134,7 mm. Ks. tarkistus, kohta B.
- Vuosivaihtelu on lähes ainutlaatuisen suuri näin sateiselle
  ilmastolle; vertailukelpoisia ovat vain muutamat Koillis-Brasilian
  kaupungit. Mittausten alettua 1871 kahdentoista kuukauden sademäärät
  ovat vaihdelleet **217,9 millimetristä** (joulukuu 1901 — marraskuu
  1902) **3 459,8 millimetriin** (helmikuu 2025 — tammikuu 2026).
  Kuivin vuosi kymmenestä saa keskimäärin puolet keskisateesta, kun
  Brisbanessa osuus on 64, Sydneyssä 68 ja Darwinissa 72 prosenttia.
  ("Townsville", Climate)
- Sademäärä vaihtelee kaupungin sisälläkin: 1 136 mm keskustassa ja
  853 mm Woodstockin lounaislähiössä. ("Townsville", Climate)
- Sateisin vuorokausi on **11.1.1998**, jolloin satoi **548,8 mm**
  pääosin kahdentoista tunnin aikana pimeän tultua. Townsvillelaiset
  kutsuvat sitä nimellä **"Night of Noah"**. ("Townsville", Climate)
- Kuukausiluvut ilmastokaaviosta (yö/päivä/sade): tammi 24,7/31,9/252,6;
  helmi 24,7/31,7/338,1; maalis 23,5/31,3/156,7; huhti 21,1/30,2/54,3;
  touko 18,0/28,2/26,3; kesä 15,3/26,2/17,1; heinä 14,0/25,7/13,9;
  elo 14,8/26,5/20,3; syys 17,9/28,4/9,9; loka 21,1/29,8/24,3;
  marras 23,1/31,1/60,6; joulu 24,5/31,9/122,2. ("Townsville", Climate)
- Hirmumyrskyt osuvat yleensä joulu—huhtikuussa: Kirrily (2024), Yasi
  (2011), Tessi (2000), Sid (1998), Joy (1990), Althea (1971), Leonta
  (1903), Sigma (1896). Helmikuun 2019 tulva vaati viisi kuolonuhria,
  vaurioitti noin 3 300 kotia ja teki noin 1 500 asuinkelvottomaksi.
  ("Townsville", Tropical cyclones and flooding; 2000–present)

## 5. Magnetic Island

- Wulgurun kielellä **Yunbenun**; 8 km Townsvillestä, 52 km²,
  vuoristoinen saari Cleveland Bayssä, käytännössä kaupungin lähiö.
  Kansallispuisto ja lintujen suojelualue on 39,5 km². ("Magnetic
  Island", johdanto)
- Cook kutsui saarta 1770 nimellä **"Magnetical Island"**, koska
  saaresta näytti lähtevän magneettinen veto, joka häiritsi hänen
  aluksensa kompassia. **"People have since explored the general area
  of Magnetic Island with various instruments to discover what might
  have caused the effect that Cook reported, but nothing has been
  discovered."** ("Magnetic Island", History)
- Saarelta haettiin hoop-mäntyä ja graniittia; graniittia käytettiin
  Townsvillen sataman maantäyttöön ja tullitalon rakentamiseen.
  ("Magnetic Island", History)
- Väkiluku 2 475 vuoden 2021 laskennassa. ("Magnetic Island")
- Hirmumyrsky Althea kulki saaren yli joulukuun lopussa 1971 ja
  vaurioitti tai tuhosi 90 % saaren taloista. ("Magnetic Island")

## 6. Kohdekartan kahdeksan kohdetta

Koordinaatit `list=geosearch`-rajapinnasta 7.9.2026 (en-Wikipedia,
keskipiste −19,2590 / 146,8169, säde 1 600 m). Numerointi pohjoisesta
etelään.

1. **Queens Gardens** −19,2531 / 146,8100 — perustettu 1870
   kaupungin pohjoisosaan, nykyään 4 ha. Alun perin osa sadan eekkerin
   kasvitieteellistä puutarhaa, joka oli omistettu trooppisten kasvien
   kokeiluun ja lisäykseen: leipäpuu, mahonki, kahvi ja mango.
   ("Townsville", Parks)
2. **Tobruk Memorial Baths** −19,2533 / 146,8198 — aloitettu 1941,
   valmistui 1950. Joulukuussa 1941 kaupunginvaltuusto päätti nimetä
   uimalan Tobrukin piirityksessä taistelleiden australialaisten
   muistoksi. Sotavuosina rakentamista vastustettiin ja
   Queenslandin hallitukselle tehtiin vetoomus työn pysäyttämiseksi;
   vetoomus hylättiin. Avattiin yleisölle 14.10.1950 ja vihittiin
   26.11.1951. Kahdeksan radan 50 metrin allas maksoi noin 60 000
   puntaa. Vuoden 1956 Melbournen ja 1960 Rooman olympialaisten
   Australian uintijoukkue harjoitteli täällä talvisin; **yhtenä yönä
   1956 uitiin kuusi maailmanennätystä ja kolmetoista Australian
   ennätystä**. Joukkueissa olivat muun muassa Dawn Fraser, Murray
   Rose ja Lorraine Crapp. ("Tobruk Memorial Baths", History)
   Paikalla on uitu ainakin 1870-luvulta; 1881 kaupunki istutti
   rantabulevardille 30 setripuuta. ("Tobruk Memorial Baths", History)
3. **Townsville Customs House** −19,2556 / 146,8219 — neljäs
   tullirakennus kaupungissa, suunnitteli **George Payne**
   Queenslandin hallituksen arkkitehtitoimistossa 1899, rakensivat
   Crawford & Cameron 1900—1902 hinnalla 26 642 puntaa. Kolonnadillinen
   romaaninen rakennus, korkeat katot ja leveät kuistit tropiikkia
   varten; brittiläisen tavan mukainen korkea "long room" yleisölle.
   Perustuksen jalusta on graniittia Magnetic Islandin Cockle Baystä;
   hiekkakiviosat luultavasti Stanwellista Rockhamptonin luota.
   Hirmumyrsky Leonta vaurioitti taloa maaliskuussa 1903: kaksi
   savupiippua putosi katon läpi. Kellari muutettiin toisen
   maailmansodan aikana pommisuojaksi. ("Townsville Customs House")
   **Vuonna 1870 tulli ja oikeusistuin toimivat ahtaassa
   kolmihuoneisessa puurakennuksessa**; 1871 taakse lisättiin kaksi
   toimistoa ja heinäkuussa 1872 rakennettiin tullivarasto.
   Maaliskuussa 1874 alitullinhoitaja esitti oikeusistuimen
   siirtämistä pois; uusi oikeustalo valmistui 1876.
4. **St James' Cathedral** −19,2555 / 146,8167 — anglikaanisen
   Pohjois-Queenslandin hiippakunnan katedraali Melton Hillin päällä,
   suunnitteli **Arthur Blacket**, rakensivat MacMahon & Cliffe.
   Peruskivi laskettiin **Viktorian kultaisena riemuvuonna
   27.6.1887**. Rahoitus loppui, Blacketin toimeksianto purettiin
   1890, ja townsvilleläinen Walter Morris Eyre vei työn loppuun.
   Hiekkakivi vaihdettiin punatiileen ja marmori ja graniitti
   betoniin. **Päätettiin rakentaa vain puolet katedraalista**;
   ensimmäinen vaihe vihittiin 27.10.1892 väliaikaisen katon alla.
   Toinen vaihe rakennettiin vasta 1959—1960. Hiippakunta perustettiin
   1878 ja sen ensimmäinen piispa George Henry Stanton saarnasi
   Townsvillessä ensimmäisen kerran 21.5.1879. ("St James Cathedral,
   Townsville")
5. **Queensland Museum Tropics** −19,2574 / 146,8221 — luonnonhistorian,
   arkeologian ja historian museo, joka hallinnoi **HMS Pandoran** ja
   **SS Yongalan** hylkypaikkoja ja säilyttää niiden esineistön.
   ("Townsville", Culture, events and festivals)
6. **Townsville Post Office** −19,2586 / 146,8183 — suunnitteli
   **John James Clark**, rakensi Dennis Kellcher 1886. Ensimmäinen
   vaihe oli kaksikerroksinen lennätinkonttori, joka maksoi lähes
   6 000 puntaa; postikonttori ja postimestarin asunto lisättiin
   1886 yli 8 000 punnalla. Kellotornin rakensi Henry L Davis & Co,
   ja kellopeli tuotiin Englannista 1889 ja asennettiin 1891.
   **Darwinin pommituksen jälkeen kellotorni purettiin 1942** ja
   koneisto varastoitiin; huomattavasti muutettu torni rakennettiin
   1963—64 hinnalla 42 135 puntaa. Talo on ollut vuodesta 2001
   panimo. Paikan näkyvyyden takia postitalon edessä pidettiin
   usein poliittisia puheita saippualaatikon päältä. ("Townsville Post
   Office")
7. **Townsville School of Arts** −19,2603 / 146,8137 — suunnittelivat
   townsvilleläiset arkkitehdit Eyre ja Munro, rakensi James Smith,
   avattiin toukokuussa 1891. Ensimmäinen komitea kokoontui
   Townsvillessä 1866, ja siinä olivat mukana kaupungin perustajat
   Robert Towns ja John Melton Black. Toiminta alkoi vuokramökissä ja
   kolmenkymmenen kirjan kokoelmalla; pysyvä talo saatiin 1877 Melton
   Hillille. Rakennuksessa oli kokous- ja luokkahuoneita alakerrassa
   ja iso kirjasto yläkerrassa; siihen liittyi 600 hengen teatteri
   *Her Majesty's*. Nellie Melba esiintyi siellä 1909, ja 1907
   siellä nähtiin Townsvillen ensimmäinen aboriginaalien
   näyttämöesitys. **Vuonna 1938 säätiön hoitajat luovuttivat
   varallisuuden kaupungille, ja siitä syntyi Australian ensimmäinen
   ilmainen lainakirjasto.** 1941 puolustusviranomaiset ottivat talon
   ja siitä tuli Tyynenmeren alueen tärkein ilmavoimien postikonttori.
   Nykyään talossa toimii Dancenorth. ("Townsville School of Arts")
8. **Great Northern Hotel** −19,2630 / 146,8147 — valmistui 1901,
   isot parvekkeet; vastapäätä vanha päärautatieasema, joka
   rakennettiin 1910—1913 ja vihittiin 24.12.1913. ("Townsville",
   Architecture; "Great Northern Hotel, Townsville")

## 7. Muut lehteen mahdollisesti tulevat tiedot

- **Townsville Saint**: kuusimetrinen tikku-ukko Castle Hillin
  pohjoisella kalliopinnalla, jonka seitsemän Townsvillen
  yliopistokollegion ensimmäisen vuoden opiskelijaa maalasivat
  **Pyhän Patrickin päivänä 17.3.1962**. Kuva selvisi useista
  poistoyrityksistä; **28.5.1993 siitä tuli osa kukkulan
  perintöarvoa**, ja 2013 kaupunki sai siihen tavaramerkkioikeuden.
  Maalarien nimet paljastettiin neljäkymmenvuotispäivänä 2002:
  Graeme Bowen, Lyall Ford, Rodney Froyland, David Greve, Peter
  Higgins, Barrie Snarski ja Robert Sothman. ("Townsville", Culture)
- Australian kamarimusiikkifestivaali järjestettiin kymmenpäiväisenä
  heinäkuussa 1991—2025. Kaupungilla on oma orkesteri Barrier Reef
  Orchestra. ("Townsville", Culture)
- Perc Tucker Regional Gallery on kaupungin taidemuseo Flinders
  Mallin itäpäässä; joka toinen syyskuu se järjestää Strand Ephemera
  -veistosnäyttelyn kahden kilometrin rantakaistaleella. ("Townsville",
  Culture)
- Museum of Underwater Art (MOUA): Jason deCaires Taylorin
  vedenalaiset veistokset, muun muassa korallikasvihuone John Brewer
  Reefillä ja *Ocean Siren* The Strandilla. ("Townsville", Culture)
- Flinders Street on vanhin katu; siellä on hyvin säilyneitä
  1800-luvun ja 1900-luvun alun rakennuksia. Tattersalls Hotel on
  vuodelta 1864, Australian Joint Stock Bank 1887—88, entinen Bank of
  New South Wales 1887 ja entinen Bank of Australasia 1905.
  ("Townsville", Architecture)
- Sacred Heart -katedraali rakennettiin 1896—1902. ("Townsville",
  Architecture)
- Townsville Grammar School on Australian mantereen vanhin
  yhteiskoulu. ("Townsville", Education)
- Ravintolat keskittyvät Palmer Streetille, Flinders Streetille ja
  The Strandille. ("Townsville", Culture)
- Liikenne: rautateiden rakentaminen alkoi 1879 ja ensimmäinen rata
  vihittiin 1880. Mount Isan rata vihittiin 1929, samoin Cairnsin ja
  Brisbanen radat. Nykyinen asema avattiin 2003. ("Townsville",
  Transport)
- Charters Towersin kulta löytyi **jouluaattona 1871** Towers
  Hillillä; löytäjä oli 12-vuotias aboriginaalipoika **Jupiter
  Mosman**, joka oli etsimässä salaman säikäyttämiä hevosia Hugh
  Mosmanin retkikunnalle. Kenttä tuotti yli 200 tonnia kultaa
  1871—1917 ja oli Australian rikkain keskipitoisuudella 34 g/t.
  Rata Charters Towersista Townsvilleen valmistui **joulukuussa
  1882**. Kaupunkia sanottiin nimellä "The World". ("Charters Towers",
  History)
- **SS *Yongala***: matkustajahöyrylaiva, rakennettu Englannissa 1903
  Adelaide Steamship Companylle. Lähti Mackaysta 23.3.1911 klo 13.40
  kohti Townsvilleä mukanaan 29 ensimmäisen luokan matkustajaa, 19
  toisen luokan matkustajaa, 72 miehistön jäsentä ja 677 tonnia
  lastia. Pian lähdön jälkeen Flat Top Islandin merkinantoasema sai
  sähkeen, joka varoitti hirmumyrskystä Townsvillen ja Mackayn
  välillä. Asema nosti liput ja lähetti langattomia viestejä, ja
  useat alukset kääntyivät takaisin — mutta *Yongala* ei nähnyt
  lippuja, **ja sille Englannista lähetetty langattoman lennättimen
  laitteisto ei ollut vielä ehtinyt Australiaan**. Viimeinen havainto
  oli Dent Islandin majakanvartijan viisi tuntia lähdön jälkeen.
  Myrsky upotti aluksen yöllä 23.—24.3.1911, eikä yksikään laivalla
  olleista **122:sta** selvinnyt. Aikalaislehdet laskivat 120 tai
  121; nykyään hyväksytty luku on vähintään 122, koska pieniä lapsia,
  palvelijoita ja vähemmistöjen jäseniä puuttui virallisilta
  listoilta. Kilpahevonen "Moonshine" löytyi rannalta, ihmisistä ei
  jälkeäkään. Queenslandin hallitus lupasi 1 000 punnan palkkion, jota
  ei koskaan lunastettu. 1943 miinanraivaaja tarttui matalikkoon 11
  mailia Cape Bowling Greenistä itään; 1947 HMAS *Lachlan* mittasi
  kaikuluotaimella noin 300 jalkaa pitkän matalikon. **1958
  paikallinen kalastaja Bill Kirkpatrick löysi hylyn** ja nosti sieltä
  kassakaapin, jossa oli vain mustaa liejua — mutta sarjanumerosta oli
  luettavissa osa: **9825W**. Vuonna 1961 Chubb Englannissa tunnisti
  numeron kassakaapiksi, jonka se toimitti Armstrong, Whitworth
  & Co:lle 1903 *Yongalan* purserin hyttiin. Hylky on 109 metriä
  pitkä, 48 meripeninkulmaa Townsvillestä kaakkoon, ja sitä suojaa
  Underwater Cultural Heritage Act 2018. ("SS Yongala")
