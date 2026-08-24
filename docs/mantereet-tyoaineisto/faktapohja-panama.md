# Panama (Panama City) — faktakoostaja, uusi kaupunkilehti

Kaupunki-id `panama`, en-Wikipedia "Panama City" ellei toisin mainita. Kaikki
tiedot haettu en-Wikipediasta **24.8.2026** (`action=raw`; ympäristön
HTTPS-liikenne kulkee esikonfiguroidun proxyn kautta, joten erillistä
`NODE_USE_ENV_PROXY=1`-lippua ei tarvittu `curl`-hauissa). Useat haut —
sekä `action=query&prop=coordinates` että Commonsin `categoryinfo` —
osuivat toistuvasti 429-rajoitukseen ("You are making too many requests");
kasvava viive (2–75 s, resepti-ohjeen 6-yritysmalli) korjasi jokaisen
haun lopulta.

**PÄÄTOIMITTAJAN PÄÄTÖS, jota tämä faktapohja noudattaa (24.8.2026,
`docs/mantereet-tyoaineisto/spec-mantereet.md`, loppu):** Panama on YKSI
yhteinen lehti — kaupunki-id `panama` on sekä `northamerica`- että
`southamerica`-laudalla, ja sama `KULTTUURI_KATEGORIAT['panama']`-lohko
palvelee molempia automaattisesti (Borneo/Sumatra-ennakkotapaus).
Tuotantokirjanpidossa kaupunki lasketaan P-Amerikkaan. Tarkistin: molemmilla
laudoilla `map.cityCountry.panama = 'PAN'` on jo kytketty (northamerica.js
ja southamerica.js, `js/packs/northamerica-countries.js` rivi 277 ja
`js/packs/southamerica-countries.js` rivi 307) — tämä tekninen kytkentä oli
jo tehty ennen tätä faktapohjaa, en koskenut siihen. **Kulttuurivisa on
kirjoitettu VALMIIKSI vain northamerica-laudalle**
(`js/packs/northamerica-questions.js`, avain `panama`, viisi kysymystä) —
`southamerica-questions.js`:n `QUESTIONS`-objektissa ei ole `panama`-avainta
lainkaan (tarkistettu `awk`+`grep`-haulla koko tiedostosta), vain
`FACTS.panama` (saapumiskortin kolme faktaa + isoisän repliikki) on
molemmilla laudoilla identtinen. Tämä vastaa suoraan päätöstä "Panama
lasketaan P-Amerikkaan": visa asuu sillä laudalla. Ks. osio 8 siitä, miten
nostot tukevat visan viittä kysymystä toistamatta niitä sanasta sanaan.

**1873-kulma (tehtävänannon ydinvaatimus, tarkistettu useasta artikkelista):**
Panaman rautatie (Colón–Panama City, valmis 27.1.1855) on 1873-kulman ydin —
isoisän matka-aikana rata oli jo lähes kaksikymmentä vuotta vanha, vakiintunut
osa kannaksen arkea ja yhä amerikkalaisomistuksessa (ranskalaiset ostivat
enemmistöosuuden yhtiöstä vasta 1881, en-Wikipedia "Panama Canal Railway",
History-osio). **Panaman kanavaa ei 1873 ollut**: ranskalaisyritys alkaa
vasta 1881 ja epäonnistuu 1889, Yhdysvaltain kanava valmistuu 1914, ja
hallinta siirtyy Panamalle vasta 1999 — kaikki tämä on kirjoitettu tähän
faktapohjaan NIMENOMAAN tulevaisuutena/nykyosiona (teemasivu `oikotie`,
nostot O3–O4), ei 1873-ajan tapahtumana. Peli tukee tätä jo valmiiksi:
`FACTS.panama` sisältää isoisän oman repliikin ("Ranskalaiset aikovat
yrittää; toivotan onnea ja pidän suunnitelmaa liian optimistisena") —
kirjoittaja voi käyttää tätä suoraan siltana O3-nostoon.

**Kolumbian osavaltio, ei pelkkä "provinssi" (täsmennys tehtävänantoon,
ks. osio 7 kohta 1):** Vuonna 1873 Panama oli **"Estado de Panamá"** —
yksi yhdeksästä lähes täysin itsehallinnollisesta osavaltiosta liittovaltio
"Estados Unidos de Colombia" (Kolumbian Yhdysvallat, 1863–1886, 1863
perustuslaki) -nimisessä valtiossa, ei tavanomainen hallinnollinen
provinssi. Itsenäisyys tuli vasta 1903, Kolumbian irtautumisena Yhdysvaltain
tuella kanavaoikeuksien vastineeksi (en-Wikipedia "History of Panama",
Panama and Colombia / 19th century -osiot). Kirjoittaja voi käyttää
yksinkertaisempaa "osa Kolumbiaa" -kehystystä tekstissä (tehtävänannon
oma sanamuoto), mutta tarkka termi kannattaa tietää, jos joku fakteista
kaipaa täsmennystä.

**Sisältölinjaus (Raamattu + spec-mantereet.md, P-Amerikka-osio):** ei
nykysotaa eikä nykypolitiikkaa — Trump-hallinnon joulukuun 2024 kommentit
kanavan "takaisinotosta" (en-Wikipedia "Panama Canal", 21st century -osio)
on TARKOITUKSELLA jätetty kokonaan pois tästä faktapohjasta, samoin Noriegan
sotilashallinto ja Yhdysvaltain 1989 invaasio (en-Wikipedia "History of
Panama", Military dictatorship -osio) — nämä ovat 1900-luvun lopun
tapahtumia, jotka eivät kuulu 1873-henkiseen kaupunkilehteen eivätkä
"ei nykypolitiikkaa" -linjaukseen. Siirtomaahistoria (Espanjan valta,
merirosvot, orjakauppa) kerrotaan tapahtumina neutraalisti, ilman
yksityiskohtien korostusta, pilarin 4 mukaisesti.

---

## 1. Sivuehdotukset

Kolme sivua: aineisto kantaa selvästi kaksi erillistä teemaa (Panaman oma
siirtomaahistoria ja kannaksen kulkureitin kolme kerrosta — muulipolku,
rautatie, kanava), ja kolmas sivu antaa kanavan/rautatien tarinalle tilan
ilman että se tukkii kaupunkisivua.

### Sivu A — id `kaupunki`, nimi "Panama"

**Johdanto (223 merkkiä):**

> Panama syntyi 1519 kapealle satamakannakselle, jonka läpi kulki Espanjan
> koko Amerikan-omaisuus. Isoisän matka-aikaan kaupunki oli jo kerran
> poltettu ja rakennettu uudelleen, eikä sen suurin muutos ollut vielä
> edes alkanut.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Vakioaihe `historia` (AIHE_IKONIT). Panaman oma
kaupunkihistoria — Camino Real -kauppareitti, toistuvat merirosvohyökkäykset,
Casco Viejon syntyminen tuhon jäljiltä, 1700-luvun tulipalot ja lopulta
Unescon maailmanperintöstatus — on riittävän rikas ja erillinen kannaksen
kulkureitin (rautatie/kanava) tarinasta kantamaan oman sivunsa.

**Johdanto (195 merkkiä):**

> Panama poltettiin merirosvon toimesta ja rakennettiin uudelleen
> linnoitetuksi niemeksi – kahdesti yhden vuosisadan aikana kaupunki
> menetti paikkansa ja löysi sen uudelleen kolme mailia lännempää.

### Sivu C — teemasivu, ehdotettu id `oikotie`, nimi "Kannaksen oikotie"

**Perustelu valinnalle:** Ei vakioaihe (AIHE_IKONIT-listalla ei ole
sopivaa valmista aihetta) — perusteltu poikkeus samaan tapaan kuin Havannan
`linnoitukset` ja Suvan `luonto`-ratkaisut. Panaman koko maailmanhistoriallinen
merkitys on kannaksen ylitys, ja isoisän oma vuoden 1873 näkökulma (rautatie
arkea, kanava vasta huhupuhe) on juuri tämä sivu — ei kaupunkisivun eikä
historia-sivun teema, vaan oma jatkumo muulipolusta sulkukanavaan. Sivu
tarvitsee oman viivaikonin (esim. yksinkertainen laivan/sulun ääriviiva),
koska mikään AIHE_IKONIT-vakioaihe ei sovi.

**Johdanto (221 merkkiä):**

> Kannas on kapeimmillaan vain päivämatkan levyinen, ja jokainen aikakausi
> on keksinyt oman tapansa ylittää se – muulilla, junalla ja lopulta
> sululla. Isoisän ajan oikotie oli rautatie; kanava oli vielä
> ranskalaisten haave.

---

## 2. Kaksitoista nostoehdotusta (4 + 4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Kaupunki joka syntyi kalastajakylän paikalle" (531 merkkiä)**

> Espanjalainen Pedro Arias de Ávila perusti Panama Cityn 15. elokuuta 1519
> kapean satamansuun rannalle, ensimmäisenä pysyvänä eurooppalaisena
> siirtokuntana Amerikan Tyynenmeren rannikolla. Muutamassa vuodessa
> kaupungista tuli lähtöpiste Perun valloitukselle sekä kauttakulkupaikka
> Espanjaan matkaavalle kullalle ja hopealle. Vuodesta 1520 genovalaiset
> kauppiaat hallitsivat kaupungin kauppaa – etenkin orjakauppaa – Espanjan
> kruunulta saamallaan erikoisluvalla, koska Espanjalla oli Genovan
> tasavalta tärkeimpänä pankkikumppaninaan.

Faktat ja lähteet:
- Panama City perustettiin 15.8.1519 Pedro Arias de Ávilan toimesta;
  kaupunki oli ensimmäinen pysyvä eurooppalainen siirtokunta Amerikan
  Tyynenmeren rannikolla ja lähtöpiste Perun valloitusretkille sekä
  kullan/hopean kauttakulkupaikka Espanjaan. — en-Wikipedia "Panama City"
  (History) ja "Panamá Viejo" (History)
- Vuodesta 1520 genovalaiset kauppiaat hallitsivat Panaman kauppaa —
  pääasiassa orjakauppaa — Espanjan kruunun myöntämällä erikoisluvalla,
  koska Espanjalla oli Genovan tasavalta pääasiallisena
  pankkikumppaninaan. — en-Wikipedia "Panama City" (History) ja
  "Panamá Viejo" (History)
- Kaupungin virallinen nimi oli "Nuestra Señora de la Asunción de
  Panamá". — en-Wikipedia "Panama City" (infobox)

**Nosto K2 — "Yhdeksän päivän marssi joka tuhosi kaupungin" (521 merkkiä)**

> 28. tammikuuta 1671 walesilainen kaappari Henry Morgan hyökkäsi
> Panamaan 1400 miehen joukolla yhdeksän päivän marssin jälkeen viidakon
> läpi. Kaupungin miliisi kukistui ylivoiman, tykistön ja ratsuväen
> edessä, ja joko puolustajat itse tai Morganin miehet sytyttivät
> kaupungin tuleen – molemmat osapuolet väittivät jälkikäteen syytä
> toisen niskaan. Tuhannet menettivät henkensä, ja kaupunki jouduttiin
> rakentamaan uudelleen noin kahdeksan kilometrin päähän lännemmäs,
> uudelle niemelle, joka tunnetaan nykyään Casco Viejona.

Faktat ja lähteet:
- Henry Morgan (walesilainen kaappari, toimi Englannin luvalla) hyökkäsi
  Panamaan 1400 miehen joukolla 28.1.1671 yhdeksän päivän marssin jälkeen;
  kaupungin miliisi kukistui ylivoiman, tykistön ja ratsuväen edessä. —
  en-Wikipedia "Panamá Viejo" (History)
- Sekä Panaman varakuningas Don Juan Perez de Guzman että Morgan itse
  kirjoittivat jälkikäteen, että vastapuoli sytytti kaupungin palamaan;
  nykylähteet pitävät todennäköisempänä että asukkaat/puolustajat
  sytyttivät tulipalon, koska briteillä ei ollut syytä polttaa
  ryöstämätöntä kaupunkia. Morganin oma raportti mainitsi 400 espanjalaista
  uhria. — en-Wikipedia "Panamá Viejo" (History)
- Kaupunki rakennettiin uudelleen n. 5 mailin (8 km) päähän lounaaseen,
  nykyiselle Casco Viejon niemelle; uusi kaupunki perustettiin 21.1.1673.
  — en-Wikipedia "Panama City" (History) ja "Casco Viejo, Panama" (History)

**Nosto K3 — "Niemi joka opetteli virheistään" (551 merkkiä)**

> Uusi kaupunki perustettiin 21. tammikuuta 1673 täysin meren ympäröimälle
> niemelle, jota suojasi alusta asti muurien ja linnoitusten järjestelmä
> – opetus edellisen kaupungin tuhosta oli selvä. 1700-luvulla kolme
> suurta tulipaloa tuhosi osan alueesta uudelleen, ja nykyinen katukuva
> syntyi vasta 1800-luvun lopun ja 1900-luvun alun jälleenrakennuksissa,
> jotka sekoittivat uusklassismia ja afro-antillilaista arkkitehtuuria
> vanhojen siirtomaa-ajan raunioiden joukkoon. Unesco lisäsi sekä Casco
> Viejon että Panamá Viejon rauniot maailmanperintöluetteloon.

Faktat ja lähteet:
- Uusi kaupunki (Casco Antiguo/Casco Viejo, myös San Felipe) perustettiin
  21.1.1673 kokonaan meren ympäröimälle niemelle, jota suojasi alusta
  asti muurien ja linnoitusten järjestelmä. — en-Wikipedia "Casco Viejo,
  Panama" (History)
- 1700-luvulla kolme suurta tulipaloa tuhosi osia alueen alkuperäisestä
  rakenteesta; nykyinen katukuva on peräisin 1800-luvun lopulta ja
  1900-luvun ensimmäiseltä puoliskolta, jolloin uusklassista ja
  afro-antillilaista arkkitehtuuria rakennettiin siirtomaa-ajan raunioiden
  joukkoon – ratkaisu joka erottaa Casco Viejon lähes puhtaasti
  siirtomaatyylisistä vanhoistakaupungeista kuten Cartagena ja Quito. —
  en-Wikipedia "Casco Viejo, Panama" (History)
- Unesco lisäsi kohteen "Archaeological Site of Panamá Viejo and Historic
  District of Panamá" maailmanperintöluetteloon (Panamá Viejo 1997, Casco
  Viejo laajennuksena 2003). — en-Wikipedia "Panamá Viejo" (infobox,
  History) ja "Panama City" (Culture, World Heritage Sites)

**Nosto K4 — "Hattu joka ei ole koskaan käynyt Panamassa valmistumassa" (536 merkkiä)**

> Kun kultakuume ajoi kymmeniä tuhansia siirtolaisia Kalifornian halki
> 1848 alkaen, monet kulkivat sen sijaan laivalla Panaman kannaksen yli
> – ja tarvitsivat suojaa aurinkoa vastaan. Ecuadorista tuodut
> toquilla-oljesta punotut hatut lastattiin Guayaquilista laivoihin,
> jotka pysähtyivät Panamassa ennen jatkomatkaa, ja hatut saivat nimensä
> myyntipaikkansa mukaan – ei valmistusmaansa. Nimi "Panama-hattu" oli
> painetussa tekstissä jo 1828, ja vuoteen 1850 mennessä hattuja
> vietiin Yhdysvaltoihin 220 000 kappaletta vuodessa Panaman kautta.

Faktat ja lähteet:
- "Panama-hattu" on peräisin Ecuadorista (paja toquilla -oljesta punottu),
  mutta sai nimensä siitä, että hatut myytiin/lastattiin Panaman kannaksen
  kautta matkalla Aasiaan, muualle Amerikkaan ja Eurooppaan. — en-Wikipedia
  "Panama hat" (History)
- Termi "Panama hat" esiintyy painetussa tekstissä jo 1828. Manuel Alfaro
  perusti 1835 vientiin keskittyneen hattuliiketoiminnan Montecristissä,
  Ecuadorissa; liiketoiminta kukoisti Kalifornian kultaryntäyksen (1848–)
  myötä, kun kannaksen ylittäjät tarvitsivat aurinkosuojaa – vienti
  Yhdysvaltoihin kasvoi 220 000 hattuun vuodessa vuoteen 1850 mennessä. —
  en-Wikipedia "Panama hat" (History)
- Presidentti Theodore Roosevelt kuvattiin Panama-hattu päässään
  kanavatyömaalla 1906, mikä kasvatti hatun suosiota entisestään. —
  en-Wikipedia "Panama hat" (History)

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Tie jota kutsuttiin Ristien tieksi" (516 merkkiä)**

> Espanjan kruunu rahoitti jo 1519 kivetyn Camino Realin, joka yhdisti
> kannaksen kaksi rannikkoa, ja 1534 Chagres-jokea ruopattiin
> kulkukelpoisemmaksi kahden kolmasosan matkasta. Perusta louhittu
> hopea purjehdittiin Panaman kautta Espanjaan: se purettiin maihin
> Tyynenmeren puolella, kuljetettiin muulikaravaaneilla kannaksen yli
> ja lastattiin uudelleen Portobelon tai Nombre de Diosin satamissa.
> Reittiä tunnettiin myös nimellä Camino de Cruces – Ristien tie –
> lukemattomien matkan varrelle jääneiden hautojen mukaan.

Faktat ja lähteet:
- Espanjan kruunu rahoitti kivetyn tien (Camino Real) rakentamisen
  kannaksen yli jo 1519; 1534 Chagres-jokea ruopattiin, mikä helpotti
  liikennettä kahdella kolmasosalla matkasta. — en-Wikipedia "History of
  Panama" (Panama Canal -osio)
- Perusta louhittu hopea kuljetettiin laivoin Panaman länsirannikolle,
  sieltä maitse Portobeloon tai Nombre de Diosiin Karibian puolelle
  jatkokuljetusta varten. Reitti tunnettiin myös nimellä Camino de
  Cruces (Ristien tie) lukuisten matkan varrelle jääneiden hautojen
  vuoksi. — en-Wikipedia "History of Panama" (Conquest to 1799) ja
  "Panama City" (History)

**Nosto H2 — "Kun karanneet orjat ja merirosvot löysivät toisensa" (547 merkkiä)**

> 1500- ja 1600-luvuilla Panama kärsi toistuvista merirosvohyökkäyksistä,
> koska Espanjan epätäydellinen hallinta kannaksesta teki reitistä
> houkuttelevan saaliin. Francis Drake ryösti aluetta 1572–73, ja
> karanneet orjat – cimarronit – elivät omissa yhteisöissään kannaksen
> sisämaassa ja tekivät ajoittain yhteistyötä merirosvojen kanssa
> espanjalaisia vastaan. Vuonna 1582 Espanja teki cimarronien kanssa
> sopimuksen, joka takasi näille vapauden vastineeksi sotilaallisesta
> tuesta – ratkaisu, joka toi hetkellisen rauhan ennen Morganin 1671
> hyökkäystä.

Faktat ja lähteet:
- Espanjan epätäydellinen hallinta kannaksesta teki Panaman reitistä
  houkuttelevan kohteen merirosvoille (pääosin hollantilaisille ja
  englantilaisille) ja karanneille orjille (cimarroneille), jotka
  elivät omissa yhteisöissään ("palenques") kannaksen sisämaassa ja
  Tyynenmeren saarilla. Francis Drakein raidit 1572–73 ja John
  Oxenhamin ylitys Tyynellemerelle saivat apua cimarroneilta. —
  en-Wikipedia "History of Panama" (Conquest to 1799)
- Espanjan viranomaiset saivat cimarronit lopulta hallintaan liittolla,
  joka takasi näille vapauden vastineeksi sotilaallisesta tuesta (1582).
  Yksi tunnettu cimarroniyhteisö toimi päällikkö Bayanon johdolla
  1552–1558. — en-Wikipedia "History of Panama" (Conquest to 1799)

**Nosto H3 — "Kolme tulipaloa ja kaksi tyyliä samassa korttelissa" (542 merkkiä)**

> 1700-luvulla Casco Viejo koki kolme suurta tulipaloa, jotka tuhosivat
> osia sen alkuperäisestä rakenteesta ja pakottivat toistuvaan
> jälleenrakennukseen. Nykyinen ilme syntyi vasta 1800-luvun lopun ja
> 1900-luvun ensimmäisen puoliskon aikana, jolloin uusklassista ja
> afro-antillilaista arkkitehtuuria rakennettiin siirtomaa-ajan
> raunioiden ja rakennusten lomaan – ratkaisu joka erottaa Casco Viejon
> Cartagenan ja Quiton kaltaisista, lähes puhtaasti siirtomaatyylisistä
> vanhoistakaupungeista. Kansallisteatteri valmistui 1908 osana tätä
> kerrosta.

Faktat ja lähteet:
- 1700-luvulla Casco Viejo koki kolme suurta tulipaloa, jotka
  tuhosivat osia sen alkuperäisestä rakenteesta ja muuttivat
  kaupunginosan rakennetta. — en-Wikipedia "Casco Viejo, Panama"
  (History)
- Nykyinen kokoonpano on peräisin 1800-luvun lopulta ja 1900-luvun
  ensimmäiseltä puoliskolta; jälleenrakennus toi uusklassista ja
  afro-antillilaista arkkitehtuuria siirtomaa-ajan raunioiden joukkoon,
  mikä erottaa Casco Viejon puhtaammin siirtomaatyylisistä
  vanhoistakaupungeista kuten Cartagena de Indias (Kolumbia) ja Quito
  (Ecuador). — en-Wikipedia "Casco Viejo, Panama" (History)
- Casco Antiguon rakennuksista noin 800 sisältää sekoituksen karibialaista,
  tasavaltalaista, art deco -, ranskalaista ja siirtomaa-arkkitehtuuria;
  Kansallisteatteri (perustettu 1908) on yksi alueen tunnetuimmista
  rakennuksista. — en-Wikipedia "Panama City" (Culture, World Heritage
  Sites)

**Nosto H4 — "Kaksi kohdetta, yksi maailmanperintöluettelon rivi" (541 merkkiä)**

> Unesco lisäsi Panamá Viejon rauniot maailmanperintöluetteloon 1997 –
> perusteluna se on "vanhin yhtäjaksoisesti asuttu eurooppalainen
> siirtokunta Amerikan Tyynenmeren rannikolla". Vuonna 2003 listaus
> laajennettiin kattamaan myös Casco Viejo, jolloin kohteen viralliseksi
> nimeksi tuli "Panamá Viejon arkeologinen kohde ja Panaman
> historiallinen alue". Casco Viejon uhka pudota vaarassa olevien
> kohteiden listalle torjuttiin Unescon päätöksellä kesäkuussa 2012,
> kun kiistelty Cinta Costera 3 -tieprojekti rakennettiin vanhankaupungin
> ympärille.

Faktat ja lähteet:
- Unesco lisäsi Panamá Viejon maailmanperintöluetteloon 1997, perusteena
  "vanhin yhtäjaksoisesti asuttu eurooppalainen siirtokunta Amerikan
  Tyynenmeren rannikolla". — en-Wikipedia "Panamá Viejo" (History)
- 2003 listaus laajennettiin kattamaan myös Casco Viejo (Casco Antiguo);
  kohteen virallinen nimi on "Archaeological Site of Panamá Viejo and
  Historic District of Panamá". — en-Wikipedia "Panama City" (Culture,
  World Heritage Sites)
- Casco Viejon ympärille rakennettu Cinta Costera 3 -rantatieviadukti
  (valmistui 2014, presidentti Ricardo Martinellin kaudella) herätti
  protesteja pelosta, että alue menettäisi maailmanperintöstatuksensa;
  Unesco päätti 28.6.2012, ettei kohdetta lisätä vaarassa olevien
  listalle. — en-Wikipedia "Panama City" (Culture, World Heritage Sites)

### Teemasivu `oikotie` — 4 nostoa

**Nosto O1 — "Neljästä kahdeksaan päivään uurroveneellä ja muulilla" (516 merkkiä)**

> Ennen rautatietä matka Atlantilta Tyynellemerelle tehtiin intiaanien
> kaivamilla uurroveneillä Chagres-jokea pitkin ja lopuksi muulilla
> vanhoja espanjalaisia polkuja – matka kesti neljästä kahdeksaan päivään
> ja oli täynnä vaaroja. Polut olivat rapistuneet lähes viidenkymmenen
> vuoden hoitamattomuuden jäljiltä, ja sadekauden kolmen metrin
> vuosisade teki niistä ajoittain lähes kulkukelvottomia. Kalifornian
> kultaryntäys 1848 alkaen kasvatti kysyntää nopeammalle reitille
> valtavasti – ja loi markkinat sille, mitä seuraavaksi rakennettiin.

Faktat ja lähteet:
- Vuonna 1847 kannaksen ylitys Atlantilta Tyynellemerelle tehtiin
  paikallisten uurroveneillä (dugout canoe) Chagres-jokea pitkin ja
  viimeiset n. 20 mailia (32 km) muulilla vanhoja espanjalaisia polkuja
  – polut olivat rapistuneet n. 50 vuoden hoitamattomuuden jäljiltä, ja
  sadekauden n. 3 metrin vuosisade vaikeutti kulkua. Matka kesti
  neljästä kahdeksaan päivään ja altisti matkustajat trooppisille
  taudeille. — en-Wikipedia "Panama Canal Railway" (History of earlier
  isthmus crossings and plans)
- Kalifornian kultaryntäys (tammikuu 1848 alkaen) kasvatti kysyntää
  nopeammalle kannaksen ylitykselle rajusti; William H. Aspinwall
  perusti Panama Railroad Companyn hyödyntääkseen kysyntää. —
  en-Wikipedia "Panama Canal Railway" (History of earlier isthmus
  crossings and plans)

**Nosto O2 — "Rautatie joka maksoi itsensä takaisin ennen kuin se valmistui" (583 merkkiä)**

> Panama Railroad Companyn rautatie Colónista Panama Cityyn valmistui
> 27. tammikuuta 1855, kun pääinsinööri George Totten löi viimeisen
> kiskonaulan sateisessa keskiyössä – maailman ensimmäinen mannerten
> välinen rautatie. Rakennustyö vaati yli 8 miljoonaa dollaria,
> kahdeksankertaisesti alkuperäisen arvion, ja vaati 5 000–10 000
> työntekijän hengen koleran, keltakuumeen ja malarian uhreina. Isoisän
> matka-aikaan 1873 rata oli jo lähes kaksikymmentä vuotta vanha,
> vakiintunut osa kannaksen arkea – ja yhä amerikkalaisomistuksessa,
> sillä ranskalaiset ostivat enemmistöosuuden vasta 1881.

Faktat ja lähteet:
- Panama Railroadin viimeinen kisko lyötiin paikalleen 27.1.1855
  sateisena yönä pääinsinööri George M. Tottenin toimesta; seuraavana
  päivänä ensimmäinen juna kulki mereltä merelle. Rata oli maailman
  ensimmäinen mannerten välinen (transcontinental) rautatie. —
  en-Wikipedia "Panama Canal Railway" (1855 Panama Railroad,
  Construction) ja "History of Panama" (19th century)
- Rakennuskustannukset olivat lopulta yli 8 miljoonaa dollaria — n.
  kahdeksankertaiset alkuperäiseen 1 miljoonan dollarin arvioon
  nähden — ja vaativat 5 000–10 000 työntekijän hengen (kolera,
  keltakuume, malaria). — en-Wikipedia "Panama Canal Railway"
  (Construction, Financing)
- Rautatie oli valmistuessaan yksi maailman kannattavimmista; ennen
  Panaman kanavan avaamista se kuljetti enemmän rahtia pituusyksikköä
  kohden kuin mikään muu rautatie maailmassa. Ranskalainen Compagnie
  Universelle du Canal Interocéanique osti rautatieyhtiön
  enemmistöosuuden vasta 1881. — en-Wikipedia "Panama Canal Railway"
  (Construction)

**Nosto O3 — "Ranskan haave joka hukkui viidakkoon" (506 merkkiä)**

> 1881 ranskalainen Compagnie Universelle du Canal Interocéanique,
> Suezin kanavan rakentajan Ferdinand de Lessepsin johdolla, aloitti
> kaivutyöt merenpinnan tasoisen kanavan rakentamiseksi Panamaan.
> Hanke epäonnistui: keltakuume ja malaria tappoivat yli 22 000
> työntekijää, ja yhtiö meni konkurssiin 1889 sen jälkeen kun 800 000
> ranskalaisen pikkusijoittajan säästöt oli hukattu. Kaivinkoneet ja
> rautatie jäivät viidakkoon ruostumaan seuraavaksi viideksitoista
> vuodeksi, kunnes Yhdysvallat osti oikeudet 1904.

Faktat ja lähteet:
- Ferdinand de Lesseps (Suezin kanavan rakentaja) johti ranskalaista
  Compagnie Universelle du Canal Interocéaniquea; kaivutyöt Panaman
  merenpinnan tasoisen kanavan rakentamiseksi alkoivat 1.1.1881. —
  en-Wikipedia "Panama Canal" (French construction attempts,
  1881–1899)
- Kuolonuhrien määräksi 1881–1889 on arvioitu yli 22 000, joista n.
  5 000 ranskalaisia; yhtiö meni konkurssiin 1889 käytettyään n. 287
  miljoonaa dollaria, ja 800 000 pienijoittajan säästöt menetettiin. —
  en-Wikipedia "Panama Canal" (French construction attempts,
  1881–1899)
- Yhdysvallat osti ranskalaisten oikeudet ja kaluston (mukaan lukien
  Panama Railroadin) 1904 40 miljoonalla dollarilla; Yhdysvaltain
  hallinto otti muodollisesti kanavaomaisuuden haltuunsa 4.5.1904. —
  en-Wikipedia "Panama Canal" (United States acquisition, United
  States construction 1904–1914)

**Nosto O4 — "Sulku joka nostaa laivan vuoren yli" (528 merkkiä)**

> Yhdysvaltain insinöörit hylkäsivät ranskalaisten merenpintasuunnitelman
> ja rakensivat sen sijaan sulkukanavan: laivat nostetaan Gatun-tekojärven
> tasolle, noin 26 metriä merenpinnan yläpuolelle, ja lasketaan toisella
> puolella takaisin. Kanava avattiin liikenteelle 15. elokuuta 1914 – 401
> vuotta sen jälkeen kun Balboa ylitti kannaksen ensimmäisenä
> eurooppalaisena. Yhdysvallat hallitsi kanavaa vuoteen 1999 asti, jolloin
> Torrijos–Carter-sopimusten mukaisesti hallinta siirtyi kokonaan
> Panamalle uudenvuodenpäivänä keskipäivällä.

Faktat ja lähteet:
- Pääinsinööri John F. Stevens vakuutti presidentti Theodore Rooseveltin
  1906 siitä, että merenpinnan tasoinen kanava oli mahdoton toteuttaa;
  ratkaisuksi valittiin sulkukanava, joka nostaa laivat n. 87 jalan
  (n. 26,5 m) korkeuteen Gatun-tekojärvelle patoamalla Chagres-joki –
  tuolloin maailman suurin tekoallas. — en-Wikipedia "Panama Canal"
  (United States construction of the Panama canal, 1904–1914)
- Kanava valmistui 1914, 401 vuotta sen jälkeen kun Vasco Núñez de
  Balboa ylitti kannaksen ensimmäisenä eurooppalaisena (1513); kanava
  avattiin muodollisesti liikenteelle 15.8.1914 rahtilaiva SS Anconin
  kulkiessa läpi. — en-Wikipedia "Panama Canal" (United States
  construction of the Panama canal, 1904–1914)
- Torrijos–Carter-sopimukset allekirjoitettiin 7.9.1977; täysi
  panamalainen hallinta astui voimaan keskipäivällä 31.12.1999, jolloin
  Panama Canal Authority (ACP) otti kanavan hoitoonsa. — en-Wikipedia
  "Panama Canal" (US control and handover to Panama, 1914–1999)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Kaikki viisi ovat NYKYTIETOA (linjaustarkennus 20.8.2026: matkaoppaan kuvat
ja sisältö ovat tuoreita, historia kuuluu nostoihin) — tässä ne myös
kertovat kanavasta ja Biomuseosta nimenomaan nykypäivän kohteina, ei
1873-ajan tapahtumina.

**Jakso 1 — "Kolme miljoonaa vuotta yhdessä rakennuksessa" (442 merkkiä)**

Amador-aallonmurtajalla, joka on rakennettu kanavan kaivutöistä
ylijääneestä kivimurskasta, seisoo Biomuseo – arkkitehti Frank Gehryn
suunnittelema rakennus, jonka väriläiskikäs, epäsymmetrinen katto on
hänen ensimmäinen työnsä Latinalaisessa Amerikassa. Suunnittelu alkoi jo
1999, mutta museo avattiin vasta 2014. Kahdeksan galleriaa kertovat
kannaksen synnystä kolme miljoonaa vuotta sitten ja siitä, miten se
muutti koko mantereiden kasvi- ja eläinlajistoa yhdistämällä Pohjois- ja
Etelä-Amerikan.

Faktat ja lähteet:
- Biomuseo sijaitsee Amador-aallonmurtajalla (Causeway Islands) kanavan
  Tyynenmeren suulla; arkkitehti Frank Gehryn suunnittelu alkoi 1999 ja
  museo avattiin 2.10.2014 – Gehryn ensimmäinen työ Latinalaisessa
  Amerikassa. — en-Wikipedia "Biomuseo" (infobox, leipäteksti)
- Museossa on kahdeksan pysyvää galleriaa 4 000 neliömetrillä; ne
  kertovat kannaksen geologisesta synnystä ja Pohjois- ja Etelä-Amerikan
  eliölajien vaihdosta ("Worlds Collide" -galleria) sekä siitä, miten
  Tyynimeri ja Karibianmeri kehittyivät erilaisiksi kannaksen sulkeuduttua
  ("Oceans Divided" -galleria). — en-Wikipedia "Biomuseo" (The building
  and its galleries)

**Jakso 2 — "Sulkukammio kolmen metrin päästä" (380 merkkiä)**

Miraflores-sulkujen vierailukeskuksesta Panama Cityn liepeiltä näkee
valtamerialusten kulkevan sulkukammioiden läpi muutaman metrin päästä,
ja keskuksen simulaattori antaa kokeilla laivan ohjaamista sulun läpi.
Paikka on yksi harvoja, joissa isoisän aikaan vasta suunnitteilla ollut
kanava on nykyään mahdollista nähdä toiminnassa läheltä – täydellinen
vastapari rautatie-nostoille.

Faktat ja lähteet:
- Miraflores Visitors Centerissä Miraflores-sulkujen luona on museo ja
  simulaattori, jossa voi kokeilla laivan ohjaamista kanavan läpi. —
  en-Wikipedia "Panama City" (Tourism)
- Miraflores-sulut ovat kaksivaiheinen sulkurakennelma, jonka kokonaislasku
  on n. 54 jalkaa (n. 16,5 m) keskiveden aikaan; Panamax-laivat kulkevat
  niiden kautta Balboan satamaan ja edelleen Tyynellemerelle. —
  en-Wikipedia "Panama Canal" (Layout)

**Jakso 3 — "Milloin kannattaa tulla" (382 merkkiä)**

Panama Cityssä on trooppinen savanni-ilmasto, hieman kuivempi kuin
monsuuni-ilmasto: sadetta kertyy noin 1900 mm vuodessa, ja lämpötila
pysyy tasaisena ympäri vuoden noin 27 asteessa. Sadekausi kestää
toukokuusta marraskuuhun ja kuiva kausi joulukuusta huhtikuuhun, mutta
aurinko on silti usein vaimeaa, koska kaupunki sijaitsee lähellä
päiväntasaajan pilvivyöhykettä ympäri vuoden.

Faktat ja lähteet: ks. osio 5 (Säätiedot) — samat luvut, sama lähde.

**Jakso 4 — "Sademetsä joka pysyi pystyssä kanavan ansiosta" (449 merkkiä)**

Kaupungin rajojen sisällä, kanavan varrella, kasvaa yhä sademetsää –
Parque Natural Metropolitano ja Parque Nacional Soberanía tarjoavat
lintubongareille muun muassa Pipeline Roadin, yhden maailman
lajirikkaimmista retkeilyreiteistä. Metsä on säilynyt lähes koskemattomana,
koska kanava tarvitsee sitä keräämään vettä sulkujen käyttöön – harvinainen
esimerkki suurhankkeesta, joka on suojellut ympäröivää metsää sen sijaan
että olisi hävittänyt sen.

Faktat ja lähteet:
- Kanavaa ympäröivät trooppiset metsät on pidetty lähes koskemattomina,
  koska kanava tarvitsee niitä veden keräämiseen sulkujen käyttöön;
  kanava on siten harvinainen esimerkki suurhankkeesta, joka on auttanut
  suojelemaan ympäröivää metsää sen hävittämisen sijaan. — en-Wikipedia
  "Panama City" (Geography)
- Parque Natural Metropolitano ulottuu Panama Citystä kanavan varrelle;
  siellä elää mm. tapiiria, puumaa ja kaimaaneja. Parque Nacional
  Soberanía kanavan länsipuolella sisältää Summit-kasvitieteellisen
  puutarhan ja eläintarhan; alueen tunnetuin polku, Pipeline Road, on
  suosittu lintubongareiden keskuudessa. — en-Wikipedia "Panama City"
  (Geography)

**Jakso 5 — "Kahden maailman kaupunki" (384 merkkiä)**

Nykyinen Panama City on kahden maailman kaupunki: pilvenpiirtäjien
siluetti kohoaa Cinta Costera -rantatien takana samalla kun Casco
Viejon kapeat kadut ja parvekkeet säilyvät muutaman kilometrin päässä
ennallaan. San Felipen kaupunginosassa, Casco Viejon sydämessä, asuu
nykyään vain runsaat tuhat ihmistä alle puolella neliökilometrillä –
pieni asukasluku suureen maineeseen nähden.

Faktat ja lähteet:
- Panama City on ollut 1970–80-luvuilta lähtien kansainvälinen
  pankkikeskus; nykyaikainen pilvenpiirtäjäkeskusta ja Cinta Costera
  -rantatie ovat kaupungin nykyilmettä Casco Viejon rinnalla. —
  en-Wikipedia "Panama City" (History, viimeinen kappale)
- San Felipen kaupunginosassa (= Casco Viejo) asui 1 258 henkeä 0,3
  neliökilometrillä vuoden 2023 väestönlaskennassa – kaupungin pienin
  ja tiheimmin asuttu (yhdessä) corregimiento. — en-Wikipedia
  "Panama City" (Population by corregimiento, taulukko)

---

## 4. Kahdeksan kohdekartan kohdetta + vertailupiste

**Vertailupiste on Casco Viejo** (spec-mantereet.md sääntö 4: kartan
keskusta valitaan historiallisen ytimen mukaan, ei hallinnollisen
koordinaattipisteen — sama kuin San Francisco-, Havanna- ja
Suva-ennakkotapauksissa). "Panama City" -pääartikkelin oma
infobox-koordinaatti ei anna kiinteää lukuarvoa (`{{Coord|region:
PA-8_type:city|...}}` -malline ilman lat/lon-parametreja) — koordinaatit
haettiin siksi `action=query&prop=coordinates`-rajapinnasta jokaiselle
kohteelle erikseen (osui useasti 429-rajoitukseen, ratkesi 20–75 s
viiveillä). Casco Viejon oma DMS-koordinaatti (8°57′09″N 79°32′06″W)
on artikkelin infobox-kentässä valmiina; muunsin sen desimaaliksi
(8,9525°N 79,5350°W) ja käytin vertailupisteenä.

Etäisyydet ja suunnat OMIA LASKELMIANI koordinaattieroista (asteet ×
111 km, pituusasteille kerrottu cos(8,9525°) ≈ 0,9878), tarkistettu
Python-skriptillä. **HUOM laskuvirheestä, joka korjattiin ennen
julkaisua:** ensimmäinen DMS→desimaali-muunnokseni Panamá Viejolle
oli virheellinen (79°29′09″ muunnettuna väärin 79,4025:ksi oikean
79,4858:n sijaan), mikä olisi tuottanut virheellisen 15,7 km:n
etäisyyden; korjattu laskelma (7,98 km) täsmää en-Wikipedian oman
leipätekstin arvion "5 mi (n. 8 km) lounaaseen" kanssa erinomaisesti —
ei siis todellinen ristiriita lähteiden välillä, vain oma
laskuvirheeni matkan varrella.

| # | Nimi suomeksi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta Casco Viejosta |
|---|---|---|---|---|
| 1 | Casco Viejo (vertailupiste, historiallinen ydin) | 8,9525°N 79,5350°W | "Casco Viejo, Panama" | (vertailupiste) |
| 2 | Panama Canal Museum / Plaza de la Independencia | 8,9519°N 79,5347°W | "Panama Canal Museum" | ~0,07 km kaakkoon |
| 3 | Palacio de las Garzas (presidentinlinna) | 8,9540°N 79,5344°W | "Palacio de las Garzas" | ~0,18 km koilliseen |
| 4 | Ancón-kukkula (Cerro Ancón) | 8,9573°N 79,5494°W | "Ancon Hill" | ~1,67 km länteen |
| 5 | Biomuseo (Amador-aallonmurtaja) | 8,9325°N 79,5449°W | "Biomuseo" | ~2,47 km lounaaseen |
| 6 | Balboa (rautatien/kanavan Tyynenmeren pää) | 8,9500°N 79,5667°W | "Balboa, Panama" | ~3,48 km länteen |
| 7 | Panamá Viejo (rauniot, perustettu 1519) | 9,0056°N 79,4858°W | "Panamá Viejo" | ~7,98 km koilliseen |
| 8 | Miraflores Locks | 8,9968°N 79,5918°W | "Panama Canal" (Navigation-taulukko) | ~7,94 km luoteeseen |

**Rajausehdotus:** Kolme ensimmäistä kohdetta (Casco Viejo, Canal Museum,
Palacio de las Garzas) mahtuvat alle 200 metrin sisään toisistaan —
poikkeuksellisen tiivis ydin, koska koko vanhakaupunki on pieni,
kokonaan meren ympäröimä niemi. Loput viisi kohdetta (1,7–8 km) vaativat
selvästi väljemmän rajauksen kuin Havannan malli — lähempänä Suvan
kahden klusterin ratkaisua (ydin + kauempana olevat, mutta olennaiset,
kohteet). Kaikki kahdeksan mahtuvat silti n. 8 km × 8 km alueeseen.

**Kaksi selvästi kauempana olevaa kohdetta, koordinaatit talteen mutta EI
taulukossa** (liittyvät suoraan O3–O4-nostoihin, mutta liian kaukana
ydinklusterista):

- **Gatún-sulut** (O4-nosto, kanavan Atlantin-puoleinen pääty), 9,2722°N
  79,9227°W ("Panama Canal", Navigation-taulukko) — n. 55 km luoteeseen
  Casco Viejosta.
- **Colón** (O2-nosto, rautatien alkuperäinen Atlantin pääty, perustettu
  Aspinwall-nimisenä 1850), 9,3572°N 79,8986°W ("Colón, Panama") — n. 60
  km luoteeseen Casco Viejosta.

---

## 5. Säätiedot

- **Casco Viejon koordinaatit:** 8,9525°N, 79,5350°W (sama piste kuin
  kohdekartan rivi 1). Panama City -artikkelin Weather box käyttää
  asemaa Panama City/Tocumen. — en-Wikipedia "Panama City"
- **Köppen-luokka:** Aw (trooppinen savanni-ilmasto), hieman kuivempi
  kuin trooppinen monsuuni-ilmasto. — en-Wikipedia "Panama City"
  (Climate)
- **Sademäärä:** n. 1 900 mm/vuosi; sadekausi toukokuusta marraskuuhun,
  kuiva kausi joulukuusta huhtikuuhun. — en-Wikipedia "Panama City"
  (Climate)
- **Lämpötila (1991–2020 normaalit, Weather box):** vuoden keskiarvo
  27,2 °C; keskimääräinen ylin 32,1 °C, keskimääräinen alin 22,3 °C.
  Tasaisin kuukausivaihtelu koko vuoden — huhtikuu kuumin (ylin 33,4 °C
  keskimäärin), tammikuu viilein (alin 21,4 °C keskimäärin). —
  en-Wikipedia "Panama City" (Climate, Weather box)
- **Auringonpaiste:** ITCZ (Intertropical Convergence Zone) pitää
  taivaan lähes jatkuvasti osittain pilvisenä; auringonpaisteprosentti
  vaihtelee 31 %:sta (lokakuu) 70 %:iin (helmikuu). — en-Wikipedia
  "Panama City" (Climate, Weather box)
- **HUOM:** samoin kuin muissa mantereet-erän kaupungeissa, yllä olevat
  luvut ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin
  pelin `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali.
  Tarkat kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla.

---

## 6. Kuva-aiheet ja Commons-kategoriavinkit

Kategoriat tarkistettu OLEMASSA OLEVIKSI ja niiden kuvamäärät mitattu
Commonsin `action=query&prop=categoryinfo`-rajapinnalla 24.8.2026 —
pelkkä olemassaolo- ja määrätarkistus, SISÄLTÖÄ EI ole silmäilty (se on
kirjoittajan työ kuvasääntöjen mukaisesti). Commons-haku osui 429-rajoi-
tukseen useaan kertaan; odotin ja yritin uudelleen resepti-ohjeen
mukaisesti.

**KOLME ARVATTUA KATEGORIANIMEÄ EIVÄT OLLEET OLEMASSA** — täsmälleen se
sudenkuoppa, josta lehtityö-resepti erikseen varoittaa: `Category:Casco
Viejo, Panama City`, `Category:Casco Antiguo, Panama City` ja
`Category:San Felipe, Panama City` palauttivat kaikki Commonsista
"missing". Oikea nimi löytyi vasta Commonsin hakutoiminnolla
(`list=search&srnamespace=14`): **`Category:Historic District of
Panamá`** (245 tiedostoa) — Espanjan artikkelinimi "Casco Antiguo"/
"Casco Viejo" ei siis vastaa Commonsin omaa nimeämiskäytäntöä lainkaan.
Myös `Category:Panama Canal Museum`, `Category:Parque Natural
Metropolitano`, `Category:Coat of arms of Panama City` ja
`Category:Gatún Locks` palauttivat "missing" eikä niille löytynyt
korvaajaa tämän faktapohjan puitteissa — kirjoittajan on haettava nämä
erikseen tai jätettävä nosto ilman omaa kategoriaa.

**Avauskuvat (3), ehdotus:**
1. Casco Viejon kapea katu parvekkeineen, meri taustalla.
2. Panamá Viejon torniraunio (katedraalin torni) laajana yleiskuvana.
3. Miraflores-sulkujen kautta kulkeva valtamerialus.

**Kansikuvat (3), ehdotus:**
1. Panama Cityn siluetti mereltä käsin — pilvenpiirtäjät ja Casco Viejon
   matala niemi samassa kuvassa, jos sellainen löytyy (havainnollistaa
   J5-jaksoa "kahden maailman kaupunki").
2. Casco Viejon kattonäkymä tai aukio (esim. Plaza de la Independencia)
   laajana yleiskuvana.
3. Panaman kanava ilmakuvana tai laivan kannelta, laaja näkymä sulusta
   tai Gatun-järvestä.

**Commons-kategoriat kuvahakuun (ei hakusanoja, kategorioiden sisältö
pitää silti aina tarkistaa silmin lisenssisääntöjen mukaisesti):**
- `Category:Historic District of Panamá` (245 tiedostoa, 44 alakategoriaa)
  — Casco Viejon yleiskuvasto (OIKEA nimi, ks. huomautus yllä)
- `Category:Panamá Viejo` (67 tiedostoa, 48 kuvaa, 18 alakategoriaa) —
  raunioalue
- `Category:Palacio de las Garzas` (163 kuvaa) — presidentinlinna
- `Category:National Theatre of Panama` (87 tiedostoa, 85 kuvaa) —
  kansallisteatteri
- `Category:Ancon Hill` (88 kuvaa) — Ancón-kukkula, näköalapaikka
- `Category:Biomuseo` (24 tiedostoa, 23 kuvaa — niukka, Gehryn rakennus)
- `Category:Balboa, Panama` (44 tiedostoa, 34 kuvaa, 9 alakategoriaa)
- `Category:Panama Canal` (246 tiedostoa, 210 kuvaa, 34 alakategoriaa) —
  laaja yläkategoria kanavalle yleensä
- `Category:Panama Canal Railway` (72 tiedostoa, 68 kuvaa, 4 alakategoriaa)
  — rautatie, myös historiallista kuvitusta 1850-luvulta
- `Category:Panama Canal locks` (58 tiedostoa, 53 kuvaa, 5 alakategoriaa)
  — sulut yleensä
- `Category:Miraflores Locks` (609 tiedostoa, 607 kuvaa — erittäin
  runsas) — Miraflores-sulut erikseen
- `Category:Panama Canal Zone` (69 tiedostoa, 43 kuvaa, 25 alakategoriaa)
  — historiallinen hallintoalue, hyvä lähde 1900-luvun alun kuvitukselle
- `Category:Metropolitan Cathedral of Panama City` (vain 3 tiedostoa,
  0 kuvaa suoraan — kaikki 3 alakategorioissa, tarkistettava erikseen)
- `Category:People of Panama` (158 tiedostoa, 133 kuvaa, 25 alakategoriaa)
  — nykypäivän arki ja väestö

**Nosto-/jaksokuvat, aihe-ehdotuksia (ei tiedostonimiä):**
1. Vanha kaiverrus tai litografia Panama Cityn poltosta 1671 tai
   uudesta muurikaupungista 1670-luvulta — TARKISTA `Category:History of
   Panama` -tyyppinen yläkategoria tai Panamá Viejon artikkelin oma
   kuvitus (esim. "Captain Henry Morgan attacking Panama" -kuvitus
   mainittu Panama City -artikkelissa, tekijä Alexandre Exquemelin
   1686/1924-painos — tarkista lisenssi ja resoluutio erikseen).
2. Historiallinen valokuva tai juliste Panama Railroadista 1855–1861
   (esim. Wikipediassa mainitut "Panama RR Opens 1855.jpg" ja "Panama RR
   map.jpg" -tyyppiset kuvat `Category:Panama Canal Railway`-kategoriassa)
   — HAV4-tyyppisen O2-noston tueksi.
3. Ranskalaisen kanavayrityksen 1880-luvun valokuva (höyrykaivinkone,
   työmaa) — TARKISTA `Category:Panama Canal` -alakategoriat, useita
   1880-luvun kuvia todennäköisesti saatavilla.
4. Miraflores- tai Gatun-sulkujen nykyvalokuva laivan kanssa —
   `Category:Miraflores Locks` on erittäin runsas (607 kuvaa), hyvä
   lähde myös O4-nostolle.
5. Ancón-kukkulan näkymä kaupungin ylle, tai Casco Viejon ja
   pilvenpiirtäjien vastakohta samassa kuvassa (J5-jakson tueksi) —
   TARKISTA `Category:Historic District of Panamá` -alakategoriat.
6. Panama-hattu -aiheinen historiallinen valokuva (esim. Roosevelt
   kanavatyömaalla 1906) — K4-noston tueksi; TARKISTA Commons-kategoria
   erikseen, ei mitattu tässä faktapohjassa.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **"Kolumbian provinssi" on tehtävänannon yksinkertaistus — tarkka
   termi on "Estado de Panamá" liittovaltio "Estados Unidos de
   Colombia" (Kolumbian Yhdysvallat, 1863–1886) sisällä.** Panaman
   osavaltiolla oli 1858 ja 1863 perustuslakien myötä lähes täysi
   itsehallinto moniin hallinnon osa-alueisiin nähden — tämä ei ollut
   tavanomainen keskusjohtoinen "provinssi". Itsenäisyys tuli vasta
   1903. Kirjoittaja voi käyttää tehtävänannon yksinkertaisempaa
   ilmaisua leipätekstissä, mutta tarkka tausta on hyvä tietää, jos
   joku fakta kaipaa täsmennystä. — en-Wikipedia "History of Panama"
   (Panama and Colombia, 19th century)
2. **DMS→desimaali-laskuvirhe korjattu ennen julkaisua** (ks. osio 4):
   Panamá Viejon etäisyys Casco Viejosta laskettiin ensin virheellisesti
   15,7 km:ksi longitudi-asteen minuuttien väärän muunnoksen vuoksi;
   korjattu luku (7,98 km) täsmää en-Wikipedian oman "n. 5 mi (8 km)
   lounaaseen" -arvion kanssa lähes täydellisesti — ei siis todellinen
   lähdeongelma.
3. **Neljä arvattua Commons-kategorianimeä eivät olleet olemassa**
   (`Category:Casco Viejo, Panama City`, `Category:Casco Antiguo, Panama
   City`, `Category:San Felipe, Panama City`, `Category:Panama Canal
   Museum`, `Category:Parque Natural Metropolitano`, `Category:Coat of
   arms of Panama City`, `Category:Gatún Locks`) — täsmälleen se
   sudenkuoppa, josta lehtityö-resepti varoittaa. Oikea nimi Casco
   Viejolle (`Category:Historic District of Panamá`) löytyi vasta
   Commonsin hakutoiminnolla, ei suoralla arvauksella. Ks. osio 6.
4. **"Panama City" -artikkelin oma infobox-koordinaatti ei sisällä
   lukuarvoja** (`{{Coord|region:PA-8_type:city|...}}`, ei lat/lon-
   parametrejä suoraan wikitekstissä) — poikkeaa Havanna- ja
   Suva-ennakkotapauksista, joissa pääartikkelin oma piste oli suoraan
   luettavissa. Käytin siksi `action=query&prop=coordinates`-rajapinnan
   palauttamaa pistettä (8,9711°N 79,5347°W) vain viitteenä osiossa 4,
   en vertailupisteenä — se osuu n. 2 km pohjoiseen Casco Viejosta,
   lähelle Bella Vistan nykyistä liikekeskustaa, ei historialliseen
   ytimeen. Tämä vahvistaa spec-mantereet.md:n säännön 4 perusteen:
   hallinnollinen/tekninen keskipiste ei ole sama asia kuin
   historiallinen ydin.
5. **Coordinates- ja categoryinfo-rajapinnat vastasivat toistuvasti
   429:llä** ("You are making too many requests") koko haun ajan —
   tavallista lyhyemmät viiveet (2–8 s) eivät riittäneet, vasta 20–75 s
   viiveet korjasivat haun johdonmukaisesti. Tämä on syytä ottaa
   huomioon kirjoitusvaiheen kuvahauissa (yksi peräkkäinen kuvajono,
   ei rinnakkaisia hakuja, kuvasääntöjen mukaisesti).
6. **Vain en-Wikipediaa on käytetty tämän faktapohjan sisältöön**
   (artikkelit "Panama City", "Panamá Viejo", "Casco Viejo, Panama",
   "History of Panama", "Panama", "Panama Canal", "Panama Canal
   Railway", "Panama hat", "Biomuseo", "Ancon Hill" (coordinates),
   "Balboa, Panama" (coordinates), "Colón, Panama" (coordinates) sekä
   Commonsin `categoryinfo`- ja `search`-rajapinnat teknisiin
   metatietoihin). Ei ulkopuolisia hakuja.
7. **Ei nykysotaa eikä nykypolitiikkaa käsitelty.** Trump-hallinnon
   joulukuun 2024 – tammikuun 2025 kommentit kanavan "takaisinotosta"
   (en-Wikipedia "Panama Canal", 21st century -osio) on TARKOITUKSELLA
   jätetty kokonaan pois; samoin Noriegan sotilashallinto 1983–1989 ja
   Yhdysvaltain 1989 invaasio (en-Wikipedia "History of Panama",
   Military dictatorship -osio) — nämä ovat 1900-luvun lopun
   tapahtumia, jotka eivät kuulu 1873-henkiseen kaupunkilehteen.
8. **Alkuperäiskansat mainittu vain ohuesti — kirjoittajan huomioitava
   pilari 1.** En-Wikipedian "Panama" (Pre-Columbian period) mainitsee
   Cueva-kansan (kannaksen suurin alkuperäiskansa espanjalaisten
   saapuessa, puhui chocoan-kieltä) ja sen väestöromahduksen taudeista,
   mutta tarjoaa vain vähän materiaalia elävästä nykykulttuurista
   Panama Cityn omalla alueella (toisin kuin esim. Guna Yalan alueella,
   joka on maantieteellisesti kaukana kaupungista eikä siksi sovi tähän
   kaupunkilehteen). Jos kirjoittaja haluaa täyttää pilarin 1 vaatimuksen
   ("kansa kuvataan elävänä nykypäivän toimijana") vahvemmin, aihe
   vaatii erillisen haun — tässä faktapohjassa sitä ei ole tarkistettu
   tarkemmin, koska 12 nostopaikkaa täyttyivät muulla, suoremmin
   Panama Cityn omaan 1873-teemaan osuvalla aineistolla.
9. **"Panama"-nimen alkuperä on itse Wikipedian mukaan epävarma** —
   kolme kilpailevaa teoriaa (Panama-puu *Sterculia apetala*; Guna-kielen
   "bannaba", kaukana; kalastajakylän legenda "paljon kaloja") — mikään
   ei ole vahvistettu. Tämä on kiinnostava, rehellisesti auki jätettävä
   yksityiskohta, jos kirjoittaja haluaa käsitellä nimen alkuperää
   esim. ARTIKKELIT-intro-tekstissä; en käyttänyt sitä nostoissa, koska
   epävarmuus vaatisi oman lohkokommentin. — en-Wikipedia "Panama"
   (Etymology)
10. **Panama-hattu (K4-nosto) on Ecuadorista, ei Panamasta — tarkistettu
    tarkoituksella, ei virhe.** Fakta on kiinnostava juuri siksi, että
    se yllättää: hattu on nimetty myyntipaikkansa (Panaman kannas)
    mukaan, ei valmistusmaansa. Kirjoittajan kannattaa sanoa tämä
    selvästi tekstissä, ettei pelaaja luule hattua panamalaiseksi
    käsityöksi.
11. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
    tekstiksi** merkkimäärävaatimusten mukaan (johdannot 195–223 mrk,
    nostot 506–583 mrk, jaksot 380–449 mrk) ja tarkistettu koneellisesti
    Python-skriptillä.

---

## 8. Päällekkäisyyksien välttäminen

**`js/packs/northamerica-questions.js`, kohta `panama` (viisi kysymystä,
löytyy VAIN tältä laudalta — ks. Fablen päätös osiossa yllä):**

1. Mitkä kaksi valtamerta Panaman kanava yhdistää? (Atlantin ja
   Tyynenmeren, taso 1) — EI toistettu sanasta sanaan missään nostossa;
   O1-nosto mainitsee saman asian luonnollisena osana muulipolku-tarinaa
   ("matka Atlantilta Tyynellemerelle"), mikä tekee vastauksen
   löydettäväksi lehden teksteistä ilman että kysymyksen oma
   monivalintavastaus toistuu.
2. Miksi Panaman kanavassa tarvitaan sulkuja? (laivat nostetaan
   tekojärven tasolle, taso 3) — O4-nosto vastaa tähän suoraan mutta eri
   sanamuodolla ja laajemmalla kontekstilla (miksi merenpintaratkaisu
   hylättiin, kuka päätti, milloin) kuin visan lyhyt fact-kenttä.
3. Millainen maa-alue Panama on? (kapea kannas kahden mantereen
   välissä, taso 1) — mainittu kaupunki-sivun johdannossa
   ("satamakannakselle") ja O1-nostossa; ei toistettu visan tarkkaa
   sanamuotoa "kapea kannas kahden mantereen välissä".
4. Milloin Panaman kanava avattiin liikenteelle? (1914) — O4-nosto
   mainitsee päivämäärän (15.8.1914) suoraan, koska tämä on perustieto
   joka mikä tahansa kanavaa käsittelevä nosto ei voi kiertää — sama
   tilanne kuin Havannan (a)-kysymyksellä maan nimestä.
5. Kuka hallinnoi Panaman kanavaa nykyään? (Panama itse vuodesta 1999)
   — O4-nosto mainitsee 1999-luovutuksen suoraan päivämäärineen
   (31.12.1999 keskipäivällä) osana laajempaa Torrijos–Carter-sopimusten
   tarinaa, ei visan lyhyenä yksittäisfaktana.

**`FACTS.panama`-taulun rivit (kolme faktaa + isoisän repliikki,
identtinen molemmilla laudoilla):**

- "Panaman kanava avattiin 1914 ja lyhensi New Yorkin ja San Franciscon
  välimatkan noin 13 000 kilometrillä." — O4-nostoni mainitsee saman
  avausvuoden mutta EI New York–San Francisco-etäisyyslukua; eri
  painotus (miksi/miten-kysymys avausvuoden sijaan).
- "Kanavan sulut nostavat laivat 26 metrin korkeuteen Gatún-tekojärvelle
  ja laskevat ne toisella puolella takaisin merenpintaan." — O4-nostoni
  kertoo saman ydinasian (korkeus, tekojärvi, lasku toisella puolella)
  mutta kehystää sen PÄÄTÖKSENÄ (miksi Yhdysvallat hylkäsi
  merenpintaratkaisun, kuka vakuutti Rooseveltin) sen sijaan että
  toistaisi FACTS-rivin toteavan muodon suoraan — kirjoittajan kannattaa
  silti verrata sanamuotoja rinnakkain ennen julkaisua, koska ydinfakta
  on sama.
- "Panaman kannas mutkittelee niin, että kanavassa purjehditaan
  Atlantilta Tyynellemerelle luoteesta kaakkoon." — EI käytetty missään
  tämän faktapohjan nostossa tai jaksossa; aihe (kanavan yllättävä
  suunta) on jo katettu FACTS-rivillä eikä kaipaa toistoa, mutta se on
  hauska erillinen yksityiskohta, jonka kirjoittaja voi ottaa esiin
  esim. kohdekartan esittelytekstissä jos haluaa.
- Isoisän repliikki ("Kannas on kapeimmillaan päivän matka... Ranskalaiset
  aikovat yrittää; toivotan onnea ja pidän suunnitelmaa liian
  optimistisena.") — tämä on VALMIS SILTA O3-nostoon (ranskalaisyrityksen
  epäonnistuminen 1889): isoisän skeptisyys osoittautuu myöhemmin
  oikeaksi. Kirjoittaja voi viitata tähän repliikkiin suoraan O3-noston
  yhteydessä ilman että mikään toistuu sanasta sanaan, koska repliikki
  itse ei mainitse epäonnistumisen syitä tai vuosilukuja, jotka O3
  antaa.

**`southamerica-questions.js`:ssä ei ole `panama`-avainta `QUESTIONS`-
objektissa lainkaan** (tarkistettu rivit 7–2000, ei osumia) — vain
`FACTS.panama` on sama molemmilla laudoilla. Tämä tarkoittaa, että
kulttuurivisa syntyy VAIN northamerica-laudan saapumiskortilla; jos
southamerica-laudalta halutaan joskus oma erillinen visa Panamalle, se
on erillinen päätös eikä kuulu tämän faktapohjan piiriin.
