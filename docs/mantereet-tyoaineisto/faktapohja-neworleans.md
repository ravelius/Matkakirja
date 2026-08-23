# New Orleans — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `neworleans`, en-Wikipedia "New Orleans".
Kaikki tiedot haettu en-Wikipediasta 23.8.2026 (action=raw, uusinnat 4–8 krt
kasvavalla viiveellä — sekä sisältö- että coordinates-rajapinta antoivat
väliin 429-vastauksia, uusintayritys korjasi joka kerran), redirectit
seurattu ("New Orleans Mardi Gras" → "Mardi Gras in New Orleans",
"New Orleans jazz" → "New Orleans Jazz" [tyhjä ohjaussivu, ei omaa
artikkelia] ja "Steamboats of the Mississippi River" →
"Steamboats of the Mississippi"). Malli ja mitat luettu tiedostoista
`docs/aasia-tyoaineisto/lehtityo-resepti.md`, `docs/moduulit/
kaupunkilehti.md` sekä esimerkkinä `docs/mantereet-tyoaineisto/
faktapohja-vancouver.md`. Kaupungin visa on tarkistettu tiedostosta
`js/packs/northamerica-questions.js` (kohta `neworleans`, neljä
kysymystä: jazzin synty, Louisianan kauppa 1803, Mississippi-joki,
Mardi Gras) — kaikkien neljän visa-aiheen vastaukset löytyvät tämän
faktapohjan teksteistä (ks. osio 7, kohta 1), mutta jokaisessa
kohdassa on käytetty tarkempia lukuja tai eri näkökulmaa kuin visan
lyhyt vastaus.

Sisältölinjaus (spec-mantereet.md ja Raamattu, pilari 3): orjuus ja
orjakauppa kerrotaan tapahtumana toteavasti, lukuja ja seurauksia
mainiten mutta ilman julmuuksien yksityiskohtia. Afrikkalais-
amerikkalainen kulttuuri — jazz, Congo Square, Mardi Gras Indianit —
kuvataan elävänä nykykulttuurina, ei kuriositeettina: siksi omalle
teemasivulleen `musiikki`, jossa jokainen nosto päättyy siihen mitä
perinteestä on tallella ja käytössä tänään (rumpupiiri joka sunnuntai,
puvut jotka ommellaan joka vuosi uudestaan, karnevaali joka tuo yhä
1,4 miljoonaa vierailijaa). Hurrikaani Katrina (2005) kerrotaan
tapahtumana faktoin ja lukuina, jälleenrakennus nykytilana — ei
kärsimyskuvauksena. Kaksi 2020-luvun uutistapahtumaa (marraskuun 2025
arkkihiippakunnan konkurssi, tammikuun 2025 Bourbon Streetin
kuorma-autoisku) on TIETOISESTI JÄTETTY POIS: ensimmäinen ei liity
pelin aikakauteen tai tarinaan, jälkimmäinen on nykyrikollisuutta/
terrorismia, joka on pelissä kiellettyä sisältöä (ks. osio 7,
kohta 8).

Painotus on 1873-henkisessä aineistossa siinä missä se on vahvaa:
Ranskan Kortteli syntyi suurelta osin espanjalaiskaudella (1790-luku),
höyrylaiva "New Orleans" avasi joen kauppaliikenteen 1812, Louisianan
kauppa 1803 on kaupungin perustavin käännekohta, ja Congo Squaren
sunnuntaikokoontumiset olivat isoisän vuosikymmenellä yhä käynnissä
(ne hiipuivat vasta 1860-luvun tienoilla). Jazz itse syntyi vasta
1900-luvun alussa eli reilu sukupolvi isoisän matkan jälkeen — tämä on
kerrottu auki eikä peitelty (ks. osio 7, kohta 2).

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "New Orleans"

**Johdanto (201 merkkiä):**

> Ranskalaiset perustivat kaupungin 1718 Mississippin suureen mutkaan.
> Napoleon myi sen Yhdysvalloille 1803. Puolet kaupungista on nykyään
> merenpinnan alapuolella – padot ja pumput pitävät joen loitolla.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** New Orleansin aineisto kantaa suoraan
kaupunkisivun neljä nostoa syvemmälle: Ranskan Kortteli rakennettiin
espanjalaisittain kahden suurpalon jäljiltä, ensimmäinen Mississippi-
joella koskaan liikennöinyt höyrylaiva kantoi kaupungin nimeä, ja
kaupunki oli samaan aikaan sekä maan suurin vapaiden värillisten
yhteisö että maan suurin orjamarkkina — jälkimmäinen kerrotaan
suoraan mutta ilman julmuuksien yksityiskohtia, seuraten pilarin 3
linjaa ja spec-mantereet.md:n USA-kohtaa ("orjuus ja sisällissota ovat
perushistoriaa — kerrotaan suoraan, ilman osapuolinostalgiaa").

**Johdanto (200 merkkiä):**

> Espanjalaiset rakensivat Ranskan Korttelin uudelleen tulipalon
> jäljiltä, höyrylaiva avasi joen kaupalle kahteen suuntaan, ja
> vapaiden värillisten yhteisö kasvoi maan suurimmaksi orjuuden
> aikakaudella.

### Sivu C — teemasivu, ehdotettu id `musiikki`, nimi "Musiikki"

**Perustelu valinnalle:** Tehtävänannon mukaisesti musiikki on New
Orleansin vahvin yksittäinen aihe, ja se ansaitsee oman sivunsa
`historia`-sivun rinnalle sen sijaan että jazz, Congo Square ja Mardi
Gras Indianit jäisivät historian sivujuoneiksi. `musiikki` on
vakioaihe (`AIHE_IKONIT`-listalla), joten kuvake tulee automaattisesti
ilman koodimuutosta. Kaikki neljä nostoa on kirjoitettu elävästä
nykykulttuurista käsin — jokaisessa kerrotaan mitä perinteestä on
käytössä ja nähtävissä tänään, ei vain mitä se oli 1800-luvulla.

**Johdanto (214 merkkiä):**

> Congo Squarella soineet rummut, Storyvillen krouvit ja Mardi Gras
> Indianien vuosikymmenten pukuperinne tekivät New Orleansista jazzin
> syntykaupungin – ei museoesineenä vaan joka viikonloppu soivana
> nykykulttuurina.

---

## 2. Kaksitoista nostoehdotusta (4 + 4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto NO1 — "Kaupunki joka näyttää kartalla puolikuulta" (496 merkkiä)**

> Ranskalainen Mississippi-yhtiö perusti 1718 Jean-Baptiste Le Moyne de
> Bienvillen johdolla kaupungin joen suureen mutkaan, chitimacha-kansan
> perinteisesti asuttamalle maalle. Paikka nimettiin "La
> Nouvelle-Orléans" silloisen Ranskan holhoojaruhtinaan, herttua
> Philippe II d'Orléansin mukaan. Kaupungin lempinimi "Crescent City"
> viittaa samaan jokimutkaan, jonka ympärille ja läpi kaupunki
> rakentui – Mississippi kiertää täällä niin jyrkästi, että kartalla
> kaupunki näyttää puolikuulta joen sylissä.

Faktat ja lähteet:
- Mississippi Company perusti kaupungin keväällä 1718
  Jean-Baptiste Le Moyne de Bienvillen johdolla maalle, jota
  perinteisesti asutti chitimacha-kansa. — en-Wikipedia "New Orleans"
  (History)
- Kaupunki nimettiin Philippe II, Duke of Orléansin mukaan, joka
  toimi Ranskan kuninkaan Ludvig XV:n holhoojana 1715–1723. —
  en-Wikipedia "New Orleans" (Etymology and nicknames)
- Lempinimi "Crescent City" viittaa alemman Mississippin uomaan, joka
  kiertää kaupungin ympäri ja läpi. — en-Wikipedia "New Orleans"
  (Etymology and nicknames)

**Nosto NO2 — "Kauppa joka kaksinkertaisti maan" (528 merkkiä)**

> Vuoden 1800 salaisella sopimuksella Ranska sai Louisianan takaisin
> Espanjalta, mutta Napoleon myi koko alueen Yhdysvalloille jo 1803
> rahoittaakseen sotiaan Euroopassa. Presidentti Jefferson halusi
> ennen kaikkea hallintaansa New Orleansin sataman. Kauppahinta oli 15
> miljoonaa dollaria noin 828 000 neliömailista maata – alle 18
> dollaria neliömaililta – ja se kaksinkertaisti Yhdysvaltain
> pinta-alan yhdellä allekirjoituksella. Vallanvaihtoseremonia
> pidettiin Place d'Armesilla, nykyisellä Jackson Squarella, 20.
> joulukuuta 1803.

Faktat ja lähteet:
- Third Treaty of San Ildefonso (1800) palautti Louisianan Ranskan
  hallintaan; Napoleon myi sen Yhdysvalloille 1803 osittain
  rahoittaakseen sotaa Euroopassa. — en-Wikipedia "Louisiana Purchase"
- Jefferson tavoitteli erityisesti New Orleansin sataman hallintaa;
  kauppahinta oli 15 miljoonaa dollaria noin 828 000 neliömailista
  (n. 18 dollaria/neliömaili), ja se kaksinkertaisti Yhdysvaltain
  pinta-alan. — en-Wikipedia "Louisiana Purchase"
- Vallanvaihtoseremonia pidettiin Place d'Armesilla (nyk. Jackson
  Square) 20.12.1803. — en-Wikipedia "New Orleans" (kuvateksti,
  United States territorial era)

**Nosto NO3 — "Puolet kaupungista meren alapuolella" (518 merkkiä)**

> Kaupunki syntyi joen luonnollisille penkereille, mutta laajeni
> myöhemmin entisille suo- ja marskimaille pumppujärjestelmän
> ansiosta. Nykyään noin puolet New Orleansista on merenpinnan
> tasolla tai sen alapuolella, korkeimmillaan noin kuusi metriä meren
> yläpuolella joen penkereellä Uptownissa ja alimmillaan yli kaksi
> metriä sen alapuolella kaupungin itäosissa. Maaperä myös painuu
> hitaasti kasaan, kun luonnollinen tulvavesi ei enää tuo jokea
> pitkin uutta lietettä korvaamaan häviävää maata – pengerrykset
> estävät sen.

Faktat ja lähteet:
- Kaupunki syntyi joen luonnollisille penkereille; A. Baldwin Woodin
  suunnittelema pumppujärjestelmä mahdollisti laajenemisen entisille
  suo- ja marskimaille. — en-Wikipedia "New Orleans" (20th century)
- Nykyään noin puolet kaupungista on merenpinnan tasolla tai sen
  alapuolella, keskikorkeus 1–2 jalkaa (n. 0,3–0,6 m) sen alapuolella;
  korkeimmillaan n. 20 jalkaa (6,1 m) meren yläpuolella Uptownin
  joenpenkereellä, alimmillaan n. 7 jalkaa (2,1 m) sen alapuolella
  Itä-New Orleansissa. — en-Wikipedia "New Orleans" (Elevation)
- ASCE-raportin mukaan penkereet estävät joen tulva-ajan
  lietteenkulkeutumisen, joka aiemmin korvasi luonnollisesti häviävää
  maata; tästä seuraa maaperän painumista. **EPÄVARMA/RISTIRIITA:**
  tulkinta subsidenssin suuruudesta ja syistä vaihtelee lähteittäin —
  ks. osio 7, kohta 3. — en-Wikipedia "New Orleans" (Elevation)

**Nosto NO4 — "Kaupunki jonka penkereet pettivät" (585 merkkiä)**

> 29. elokuuta 2005 liittovaltion penkereet pettivät hurrikaani
> Katrinan aikana yli 50 kohdasta, ja noin 80 prosenttia kaupungista
> jäi veden alle – insinööri Raymond B. Seed kutsui sitä maailman
> pahimmaksi tekniseksi katastrofiksi Tšernobylin jälkeen.
> Louisianassa kuoli yli 1500 ihmistä, useimmat New Orleansissa.
> Kaupunki oli osittain autioitunut kuukausia, ja väkiluku oli
> kesällä 2007 noin 60 prosenttia entisestä. Kymmenen vuotta myöhemmin
> väkiluku oli palautunut 80 prosenttiin vuoden 2000 tasosta – Mardi
> Gras'ta ja Jazz & Heritage -festivaalia ei peruttu koskaan, ei
> silloinkaan.

Faktat ja lähteet:
- Penkereet pettivät 29.8.2005 yli 50 kohdasta (mm. 17th Street
  Canal, London Avenue Canal, Industrial Canal); insinööri Raymond
  B. Seed kutsui sitä "maailman pahimmaksi tekniseksi katastrofiksi
  Tšernobylin jälkeen"; n. 80 % kaupungista jäi veden alle. —
  en-Wikipedia "New Orleans" (21st century), "Hurricane Katrina"
  (New Orleans)
- Louisianassa kuoli yli 1500 ihmistä, useimmat New Orleansissa. —
  en-Wikipedia "New Orleans" (21st century)
- Väkiluku oli n. 60 % pre-Katrina-tasosta kesällä 2007 ja 80 %
  vuoden 2000 väestönlaskennan tasosta kymmenen vuotta myöhemmin. —
  en-Wikipedia "New Orleans" (21st century)
- Mardi Gras'ta, Voodoo Experiencea ja Jazz & Heritage -festivaalia
  ei koskaan siirretty tai peruttu, ei Katrinan jälkeenkään. —
  en-Wikipedia "New Orleans" (21st century)

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Ranskalainen nimi, espanjalainen tiili" (573 merkkiä)**

> Ranskan aikakauden puiset rakennukset paloivat suurelta osin
> kahdessa suurpalossa, 1788 ja 1794 – niistä jälkimmäisen jälkeen
> Espanjan hallinto määräsi uudet palomääräykset, jotka kielsivät
> puujulkisivut. Nykyinen Ranskan Kortteli on siksi suurelta osin
> espanjalaisajan tiili- ja stukkorakentamista, vaikka aluetta yhä
> kutsutaan ranskalaisittain Vieux Carréksi. Koristeelliset
> valurautaparvekkeet, jotka nykyään tunnistetaan koko kaupungin
> symboliksi, yleistyivät vasta 1850-luvulta alkaen, kun Jackson
> Squarea reunustavat Pontalba-talot valmistuivat 1851 ja loivat
> muodin.

Faktat ja lähteet:
- Great New Orleans Fire 1788 ja toinen tulipalo 1794 tuhosivat 80 %
  kaupungin rakennuksista; Espanjan hallinto määräsi uudet
  palomääräykset, jotka kielsivät puiset julkisivut. — en-Wikipedia
  "French Quarter" (History)
- Lähes koko säilynyt 1700-luvun arkkitehtuuri Vieux Carréssa
  (French Quarter) on peräisin Espanjan-kaudelta, poikkeuksena Old
  Ursuline Convent. — en-Wikipedia "New Orleans" (French–Spanish
  colonial era)
- Ensimmäiset kaksikerroksiset valurautaparvekkeet valmistuivat
  Pontalba-taloihin Jackson Squarella 1849–1851 ja loivat mallin,
  jota muut alkoivat seurata. — en-Wikipedia "French Quarter"
  (History)

**Nosto H2 — "Höyrylaiva joka selvisi maanjäristyksestä" (581 merkkiä)**

> Höyrylaiva nimeltä "New Orleans" – ensimmäinen koskaan
> Mississippillä liikennöinyt höyrylaiva – lähti Pittsburghista
> lokakuussa 1811 kohti samannimistä kaupunkia. Matka kesti läpi
> Ohio- ja Mississippi-joen, ja joulukuussa laiva selvisi
> vahingoittumattomana historian voimakkaimpiin kuuluneesta New
> Madridin maanjäristyssarjasta joen pehmeän veden suojassa. Laiva
> saapui New Orleansiin 10. tammikuuta 1812 ja aloitti pian
> säännölliset reitit Natcheziin. Se avasi joen kaupalle molempiin
> suuntiin ensimmäistä kertaa – aiemmin ylävirtaan pääsi vain
> soutamalla tai hinaamalla rannalta.

Faktat ja lähteet:
- Höyrylaiva "New Orleans" oli ensimmäinen Mississippillä
  liikennöinyt höyrylaiva; se lähti Pittsburghista 20.10.1811. —
  en-Wikipedia "New Orleans (steamboat)" (Maiden voyage);
  "Steamboats of the Mississippi" (Golden age of steamboats)
- Joulukuussa 1811 alkoi New Madridin maanjäristyssarja (mm.
  16.12.1811, arvioitu voimakkuus 7,5 momenttimagnitudia) – yksi
  Pohjois-Amerikan voimakkaimmista koskaan mitatuista; laiva selvisi
  vahingoittumattomana joen veden vaimentaessa tärinän. —
  en-Wikipedia "New Orleans (steamboat)" (Maiden voyage)
- Laiva saapui New Orleansiin 10.1.1812 ja aloitti säännölliset
  reitit New Orleansin ja Natchezin väillä; matka avasi joen
  kaksisuuntaiselle kaupalliselle liikenteelle. — en-Wikipedia
  "New Orleans (steamboat)" (Maiden voyage, Impact)

**Nosto H3 — "Vapaiden kaupunki, orjuuden pääkaupunki" (581 merkkiä)**

> New Orleans oli jo 1800-luvun alussa maan suurin vapaiden
> värillisten (gens de couleur libres) yhteisö – usein koulutettuja,
> keskiluokkaisia omaisuudenomistajia. Samaan aikaan kaupunki oli
> maan suurin orjamarkkina erityisesti sen jälkeen, kun kansainvälinen
> orjakauppa kiellettiin 1808: kotimainen orjakauppa kasvoi
> voimakkaasti, ja kaksi kolmasosaa yli miljoonasta orjuutetusta
> ihmisestä siirrettiin pakolla syvemmälle etelään. Vuoteen 1840
> mennessä New Orleans oli maan rikkain ja kolmanneksi väkirikkain
> kaupunki – vauraus ja orjuuden talous kulkivat samaan aikaan käsi
> kädessä.

Faktat ja lähteet:
- New Orleansissa oli maan suurin ja vaurain vapaiden värillisten
  yhteisö; monet olivat koulutettuja, keskiluokkaisia
  omaisuudenomistajia. — en-Wikipedia "New Orleans" (Battle of New
  Orleans and antebellum period)
- Kaupunki oli maan suurin orjamarkkina erityisesti kansainvälisen
  orjakaupan kiellon (1808) jälkeen; kotimainen orjakauppa kasvoi, ja
  kaksi kolmasosaa yli miljoonasta orjuutetusta ihmisestä siirrettiin
  pakolla syvempään etelään New Orleansin kautta. — en-Wikipedia
  "New Orleans" (Battle of New Orleans and antebellum period)
- Vuoteen 1840 mennessä New Orleans oli maan rikkain ja
  kolmanneksi väkirikkain kaupunki. — en-Wikipedia "New Orleans"
  (Battle of New Orleans and antebellum period)

**Nosto H4 — "Ensimmäinen kuvernööri jonka juuret olivat Afrikassa" (595 merkkiä)**

> Sisällissodan jälkeisenä jälleenrakennuskautena Louisiana otettiin
> takaisin unioniin 1868 uudella perustuslailla, joka takasi yleisen
> äänioikeuden miehille rodusta riippumatta ja perusti integroidun
> julkisen koulujärjestelmän. P.B.S. Pinchback toimi lyhyesti
> Louisianan republikaanikuvernöörinä 1872 – ensimmäisenä
> afrikkalaista syntyperää olevana kuvernöörinä Yhdysvaltain
> historiassa. New Orleansin integroitu koulujärjestelmä säilyi tämän
> kauden ajan. Vuoden 1892 rotujen välinen ammattiliittolakko New
> Orleansissa sulki kaupungin viideksi päiväksi ja saavutti
> suurimman osan vaatimuksistaan.

Faktat ja lähteet:
- Louisiana otettiin takaisin unioniin 1868 uudella perustuslailla,
  joka takasi yleisen äänioikeuden miehille rodusta riippumatta,
  yleisen julkisen koulutuksen ja sekä mustia että valkoisia
  virkamiehiä. — en-Wikipedia "New Orleans" (Civil War–Reconstruction
  era)
- P.B.S. Pinchback toimi lyhyesti Louisianan republikaanisena
  kuvernöörinä 1872, ensimmäisenä afrikkalaista syntyperää olevana
  kuvernöörinä Yhdysvaltain historiassa; New Orleansin integroitu
  julkinen koulujärjestelmä säilyi tänä aikana. — en-Wikipedia
  "New Orleans" (Civil War–Reconstruction era)
- Vuoden 1892 rotujen välinen yleislakko New Orleansissa kesti
  8.–12.11. ja saavutti suurimman osan vaatimuksistaan. —
  en-Wikipedia "New Orleans" (Civil War–Reconstruction era)

### Teemasivu `musiikki` — 4 nostoa

**Nosto M1 — "Aukio joka ei koskaan vaiennut kokonaan" (631 merkkiä)**

> Ranskan ja Espanjan siirtomaa-aikana orjuutetuille annettiin
> sunnuntaisin vapaapäivä, ja he kokoontuivat kaupungin laidalla
> sijainneelle aukiolle soittamaan, tanssimaan ja käymään kauppaa –
> 1817 kaupunki rajasi kokoontumiset virallisesti yhteen paikkaan,
> josta tuli Congo Square. Vierailijat kuvasivat 1800-luvulla satojen
> ihmisten bamboula- ja calinda-tansseja afrikkalaisin rytmein ja
> soittimin. Aukio nimettiin 1893 uudelleen konfederaatiokenraalin
> mukaan, mutta kaupunginvaltuusto palautti historiallisen nimen
> Congo Square 2011. Joka sunnuntai siellä yhä kokoonnutaan
> rumpupiiriin – perinne joka ei koskaan katkennut kokonaan.

Faktat ja lähteet:
- Code Noir (1724) antoi orjuutetuille sunnuntait vapaaksi; 1817
  kaupunki rajasi kaikki orjuutettujen kokoontumiset yhteen
  paikkaan, josta tuli Congo Square. — en-Wikipedia "Congo Square"
  (History)
- Arkkitehti Benjamin Latrobe kuvasi 1819 päiväkirjassaan 500–600
  orjuutetun ihmisen tanssivan aukiolla afrikkalaisin rytmein,
  soittimin (rummut, kalebassit, banjomaiset soittimet) ja pukein. —
  en-Wikipedia "Congo Square" (History)
- Aukio nimettiin 1893 uudelleen "Beauregard Squareksi" konfederaatio-
  kenraali P.G.T. Beauregardin mukaan, osana yritystä hillitä
  kokoontumisia; kaupunginvaltuusto palautti nimen Congo Square
  2011. — en-Wikipedia "Congo Square" (Formal venue)
- Congo Square Preservation Society jatkaa perinnettä joka sunnuntai
  rumpupiirein ja tanssein. — en-Wikipedia "Congo Square" (Today)

**Nosto M2 — "Kaupunki jossa jazz oppi kävelemään" (554 merkkiä)**

> Jazz syntyi 1900-luvun alun New Orleansissa afrikkalaisamerikkalaisten
> yhteisöjen musiikista: hautajaissaattueiden puhallinorkestereista,
> kirkkomusiikista ja Congo Squaren rytmiperinnöstä sulautuivat yhteen.
> Kornetisti Buddy Bolden soitti kaupungissa 1895–1906 ja loi "big
> fourin", ensimmäisen synkopoidun rumpukuvion. Pianisti Jelly Roll
> Morton aloitti uransa Storyvillen tanssisaleissa. Louis Armstrong
> syntyi New Orleansissa 1901, kasvoi köyhissä oloissa ja aloitti
> soittouransa nuorena – hänestä tuli myöhemmin jazzin kansainvälisesti
> tunnetuin nimi.

Faktat ja lähteet:
- Jazz syntyi New Orleansin afrikkalaisamerikkalaisten yhteisöjen
  musiikista: hautajaissaattueiden puhallinorkesterit, kirkkomusiikki
  ja Congo Squaren rytmiperintö sulautuivat yhteen. — en-Wikipedia
  "Jazz" (New Orleans origins)
- Buddy Bolden soitti New Orleansissa 1895–1906; hänen yhtyeensä
  luoma "big four" oli ensimmäinen synkopoitu rumpukuvio, joka
  poikkesi tasajakoisesta marssirytmistä. — en-Wikipedia "Jazz"
  (Syncopation)
- Jelly Roll Morton aloitti pianistiuransa Storyvillessä; monet
  varhaiset jazzmuusikot, mm. Buddy Bolden, saivat töitä Storyvillen
  baareissa ja bordelleissa. — en-Wikipedia "Jazz" (New Orleans
  origins); "Storyville, New Orleans" (Music)
- Louis Armstrong syntyi New Orleansissa 4.8.1901 (syntymäaika
  kiistanalainen, ks. osio 7) köyhään perheeseen ja aloitti
  cornet-uransa nuorena kaupungissa ennen siirtymistään Chicagoon. —
  en-Wikipedia "Louis Armstrong" (Early life)

**Nosto M3 — "Puku joka ommellaan uudestaan joka vuosi" (612 merkkiä)**

> Mardi Gras Indianit ovat afrikkalaisamerikkalaisia kaupunginosa-
> yhteisöjä, jotka pukeutuvat karnevaaliin itse käsin ompelemiinsa,
> tuhansia dollareita materiaaleihin maksaviin helmi- ja
> sulkapukuihin – perinne juontaa ainakin 1880-luvulle, jolloin
> Becate Batiste perusti "heimon" nimeltä Creole Wild West. Puvun
> suunnittelu ja ompelu kestää tavallisesti kuudesta yhdeksään
> kuukautta, ja se aloitetaan uudelleen joka vuosi edellisen jälkeen.
> Perinne kietoo yhteen karanneiden orjien ja alkuperäiskansojen
> historiaa symboliseen muotoon, ja se elää yhä vahvana joka vuoden
> karnevaalissa ja "Super Sunday" -paraatissa.

Faktat ja lähteet:
- Becate Batiste, kreoli jolla oli afrikkalaisia, ranskalaisia ja
  choctaw-juuria, perusti 1880-luvulla "heimon" nimeltä Creole Wild
  West Seventh Wardissa; muut alkoivat perustaa omia heimojaan. —
  en-Wikipedia "Mardi Gras Indians" (Exclusion and subversion)
- Puvut maksavat materiaaleina tuhansia dollareita (esimerkki:
  n. 5000 dollaria/vuosi) ja niiden suunnittelu ja valmistus kestää
  6–9 kuukautta; ne ommellaan käsin ja aloitetaan uudestaan joka
  vuosi. — en-Wikipedia "Mardi Gras Indians" (Suits)
- Perinne juontuu karanneiden orjuutettujen ja alkuperäiskansojen
  välisistä liittoutumista ja avunannosta 1700–1800-luvulla; puvuissa
  yhdistyvät afrikkalaiset ja alkuperäiskansojen visuaaliset
  vaikutteet. — en-Wikipedia "Mardi Gras Indians" (Black–Indigenous
  alliances, Cultural designs)

**Nosto M4 — "Karnevaali jonka värit valittiin suurruhtinaalle" (632 merkkiä)**

> Ensimmäinen tunnettu Mardi Gras -juhla Louisianassa pidettiin jo
> 1699 Mississippin suulla, mutta järjestäytynyt katukarnevaali syntyi
> New Orleansissa vasta 1857, kun Mystick Krewe of Comus järjesti
> ensimmäisen soihtukulkueensa. Rex-kulkueen perusti 1872 venäläisen
> suurruhtinaan vierailua varten, ja sen silloin valitsemat värit –
> violetti, vihreä ja kulta – ovat yhä koko karnevaalin tunnusvärit.
> Kulkueiden vaunuja rakentavat "krewe"-yhdistykset ympäri vuoden, ja
> katsojille heitetään helminauhoja sekä Zulu-seuran kultamaalattuja
> kookospähkinöitä. Karnevaali huipentuu paastoa edeltävään tiistaihin
> ja päättyy tuhkakeskiviikkoon.

Faktat ja lähteet:
- Ensimmäinen tunnettu Mardi Gras -juhla Louisianassa pidettiin
  2.3.1699 Mississippin suulla, nyk. Plaquemines Parishissa. —
  en-Wikipedia "Mardi Gras in New Orleans" (Early history)
- Mystick Krewe of Comus perustettiin 1856 ja järjesti ensimmäisen
  soihtukulkueensa 1857, ensimmäisenä järjestäytyneenä
  Mardi Gras -kruununa (krewenä) kaupungissa. — en-Wikipedia
  "Mardi Gras in New Orleans" (Early history)
- Rex perustettiin 1872 vieraillutta venäläistä suurruhtinas Aleksei
  Aleksandrovitšia varten; sen valitsemat värit violetti, vihreä ja
  kulta ovat yhä karnevaalin tunnusvärit. — en-Wikipedia "Mardi Gras
  in New Orleans" (Traditional colors, Rex)
- Zulu Social Aid & Pleasure Clubin kultamaalatut kookospähkinät
  ovat yksi karnevaalin haetuimmista "throw"-esineistä; Mardi Gras
  -päivä on liikkuva, helmikuun 3. ja maaliskuun 9. päivän välillä
  pääsiäisen mukaan, ja huipentuu tuhkakeskiviikkoon. — en-Wikipedia
  "Mardi Gras in New Orleans" (New Orleans Zulu, Mardi Gras Day)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja.

**Jakso 1 — "Perille ja liikkeelle"**

Kaupungin ainoa historiallinen raitiovaunulinja, St. Charles
Streetcar, on kulkenut samaa reittiä vuodesta 1835 – Yhdysvaltain
vanhin yhtäjaksoisesti toiminut raitiotielinja, jonka puiset vaunut on
nimetty kansallisiksi maamerkeiksi. Lauttaliikenne joen yli on ollut
käynnissä keskeytyksettä vuodesta 1827.

Faktat ja lähteet:
- St. Charles Streetcar Line on Yhdysvaltain vanhin yhtäjaksoisesti
  toiminut raitiovaunulinja; se aloitti paikallisliikenteenä 1835
  Carrolltonin ja keskustan välillä. — en-Wikipedia "New Orleans"
  (Streetcars)
- Lauttaliikenne on ollut käynnissä keskeytyksettä vuodesta 1827. —
  en-Wikipedia "New Orleans" (Ferries)

**Jakso 2 — Arjen ilmiö: ruokakulttuuri**

Café du Monde on paistanut beignet-munkkejaan ja tarjoillut
sikuriaromista café au laitia vuodesta 1862. Po'boy-voileipä ja
gumbo-pata ovat ranskalaisen, espanjalaisen, afrikkalaisen ja
karibialaisen keittiön risteytyksiä. Louis Armstrong allekirjoitti
kirjeensä usein sanoilla "Red beans and ricely yours" – maanantain
riisi-papuruoan mukaan.

Faktat ja lähteet:
- Café du Monde, avoinna vuodesta 1862, tunnetaan beignet-
  munkeistaan ja sikurilla maustetusta café au laitista. —
  en-Wikipedia "New Orleans" (Dialect, kuvateksti); "French Quarter"
  (Jackson Square)
- New Orleansin keittiö yhdistää ranskalaisia, espanjalaisia,
  italialaisia, afrikkalaisia ja alkuperäiskansojen vaikutteita
  (po'boy, gumbo, jambalaya, étouffée); Louis Armstrong allekirjoitti
  kirjeensä usein "Red beans and ricely yours" viitaten maanantain
  riisi-papuruokaan. — en-Wikipedia "New Orleans" (Cuisine)

**Jakso 3 — Kaupunginosat tänään**

Ranskan Kortteli on turisteille tutuin, mutta kaupunki on muutakin:
Garden District puutarhoineen ja pylväskuisteineen syntyi 1800-luvun
amerikkalaiskaupungin vaurauden ympärille, ja Tremé Congo Squaren
kupeessa tunnetaan Yhdysvaltain vanhimpana vapaiden mustien
kaupunginosana.

Faktat ja lähteet:
- Kaupunki jakautuu historiallisesti "downtowniin" (mm. French
  Quarter, Tremé) ja "uptowniin" (mm. Garden District) Canal Streetin
  molemmin puolin. — en-Wikipedia "New Orleans" (Cityscape)
- Tremé on Congo Squaren vieressä ja tunnetaan Yhdysvaltain vanhimpana
  vapaiden mustien kaupunginosana; siellä afroamerikkalaiset
  omistivat 1700–1800-luvuilla noin 80 % kiinteistöistä. —
  en-Wikipedia "Mardi Gras Indians" (Hurricane Katrina)

**Jakso 4 — Historian käännekohta: jälleenrakennus nykytilana**

Vuosikymmen Katrinan jälkeen kaupungin väkiluku oli palautunut
neljään viidesosaan entisestä. Suuret kokoukset ja jalkapallo-ottelut
palasivat, ja kaupunki isännöi vuoden 2013 Super Bowlia samassa
Superdomessa, joka toimi hurrikaanin aikana suojana tuhansille
asukkaille.

Faktat ja lähteet: ks. osio 2, Nosto NO4 (väestön palautuminen); lisäksi:
- Kaupunki isännöi Super Bowl XLVII:ää (helmikuu 2013)
  Superdomessa, samassa areenassa joka toimi "viimeisen turvan
  suojana" Katrinan aikana. — en-Wikipedia "New Orleans" (21st
  century)

**Jakso 5 — Milloin kannattaa tulla**

New Orleansin ilmasto on lauhkean kostea (Köppen: Cfa): talvet ovat
lyhyitä ja leutoja, kesät kuumia ja kosteita. Lunta sataa harvoin –
mutta tammikuussa 2025 kaupunki yllättyi 20–25 senttimetrin lumesta,
harvinaisimmasta lumimyrskystä vuosikymmeniin.

Faktat ja lähteet: ks. osio 5 (Säätiedot) — samat luvut, samat
lähteet.

---

## 4. Yhdeksän kohdekartan kohdetta

Koordinaatit haettu en-Wikipedian MediaWiki-rajapinnasta
(`action=query&prop=coordinates`, redirects=1) 23.8.2026 (rajapinta
vastasi toistuvasti 429:llä, uusintayritys 1–3 s kasvavalla viiveellä
korjasi joka kerran). Etäisyydet ovat OMIA LASKELMIANI
koordinaattieroista (asteet × 111 km, pituusasteille kerrottu
cos(29,96°) ≈ 0,8666), tarkistettu Node-skriptillä.

**Kartan keskipiste on TIETOISESTI Jackson Square/Ranskan Kortteli**
(29,9575°N 90,06306°W), ei Wikipedian infobox-koordinaatti
(29,9761°N 90,0783°W, n. 2,5 km luoteeseen, lähellä Lake Pontchartrainin
suuntaa) — sama periaate kuin San Franciscon ennakkotapauksessa
spec-mantereet.md:ssä ("kohdekartan keskusta valitaan historiallisen
ytimen mukaan, ei hallinnollisen koordinaattipisteen"). New Orleansin
koko 1873-tarina tapahtuu Ranskan Kortteliin ja sen välittömään
läheisyyteen ankkuroituneena.

| # | Nimi suomeksi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta keskipisteestä (oma laskelma) |
|---|---|---|---|---|
| 1 | Jackson Square (Place d'Armes) — keskipiste | 29,9575°N 90,06306°W | "Jackson Square (New Orleans)" | (keskipiste) |
| 2 | St. Louis -katedraali | 29,95778°N 90,06361°W | "St. Louis Cathedral (New Orleans)" | ~0,06 km luoteeseen |
| 3 | Ranskan Kortteli / Bourbon Street (alueen yleiskoordinaatti) | 29,95861°N 90,065°W | "French Quarter" | ~0,22 km luoteeseen |
| 4 | Congo Square / Louis Armstrong Park | 29,96083°N 90,06833°W | "Congo Square" | ~0,63 km luoteeseen |
| 5 | Preservation Hall | 29,9583°N 90,0654°W | "Preservation Hall" | ~0,24 km länteen |
| 6 | Storyville (historiallinen alue, Basin St) | 29,95908°N 90,07381°W | "Storyville, New Orleans" | ~1,05 km länteen |
| 7 | Garden District | 29,92778°N 90,08472°W | "Garden District, New Orleans" | ~3,90 km lounaaseen |
| 8 | Caesars Superdome (ent. Louisiana Superdome) | 29,95083°N 90,08111°W | "Caesars Superdome" (redirect: "Mercedes-Benz Superdome") | ~1,89 km lounaaseen |
| 9 | Lower Ninth Ward | 29,97028°N 90,01278°W | "Lower Ninth Ward" | ~5,04 km itään |

**Rajausehdotus:** Kahdeksan ensimmäistä kohdetta mahtuvat n. 2 km ×
2 km alueeseen Ranskan Kortteliin ja sen välittömään läheisyyteen
Garden Districtiä lukuun ottamatta (n. 3,9 km lounaaseen). Lower Ninth
Ward (n. 5 km itään) on kauimpana, mutta se on olennainen Katrina-
noston (NO4) kannalta eikä sitä pidä jättää kartalta pois vain
tiiviyden vuoksi — sama periaate kuin Vancouver-mallin
Musqueam-kohteella.

---

## 5. Säätiedot

- **Keskustan koordinaatit:** 29,9575°N, 90,06306°W (Jackson Square,
  ks. osio 4:n perustelu). — en-Wikipedia "Jackson Square (New
  Orleans)"
- **Köppen-luokka:** Cfa (lauhkean kostea ilmasto), lyhyet leudot
  talvet, kuumat kosteat kesät. — en-Wikipedia "New Orleans"
  (Climate)
- **Lämpötila:** kuukausikeskiarvo tammikuussa n. 12,4 °C (54,3 °F),
  elokuussa n. 28,9 °C (84 °F). — en-Wikipedia "New Orleans" (Climate)
- **Ennätykset:** korkein virallisesti mitattu 40,6 °C (105 °F,
  27.8.2023 lentokentällä), alin −11,7 °C (11 °F, 23.12.1989). —
  en-Wikipedia "New Orleans" (Climate)
- **Sademäärä:** keskimäärin n. 1588 mm (62,5 tuumaa) vuodessa; kesä
  on sateisin, lokakuu kuivin. — en-Wikipedia "New Orleans" (Climate)
- **Lumi:** harvinaista, mutta ei tuntematonta — Uudenvuoden 1963
  lumimyrsky toi 11 cm, joulukuun 1989 kylmäaalto 2,5–5 cm, ja
  21.1.2025 kaupunki sai poikkeuksellisen 20–25 cm (8–10 tuumaa)
  lumen, viimeisimmän merkittävän lumisateen. — en-Wikipedia
  "New Orleans" (Climate)
- **HUOM:** samoin kuin muissa erän kaupungeissa, yllä olevat luvut
  ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin pelin
  `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali. Tarkat
  kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla.

---

## 6. Kuva-aiheet ja Commons-kategoriavinkit

Erityishuomio: Bourbon Streetin ja Ranskan Kortteliin katukuvat ovat
usein täynnä juhlivia ihmisiä ja alkoholimainontaa — valitse kuvakulma
joka näyttää arkkitehtuurin tai tapahtuman, ei humalaista yleisöä eikä
tunnistettavia kasvoja. Congo Square-, Mardi Gras Indian- ja jazz-
aiheisissa kuvissa vältä kaikkea mikä esittää afrikkalaisamerikkalaisen
kulttuurin vain historiallisena kuriositeettina (pelkkiä 1800-luvun
piirroksia tai mustavalkokuvia) — tasapainota nykyisillä kuvilla
Congo Squaren sunnuntaikokoontumisista, Mardi Gras Indianien puvuista
tai jazzmuusikoista soittamassa tänään. Storyville-aiheessa käytä VAIN
arkkitehtuuri-, kartta- tai muusikkokuvia — EI Bellocq-valokuvia
bordellien työntekijöistä (kuvat ovat historiallisesti merkittäviä,
mutta eivät sovi tämän pelin sävyyn).

**Avauskuvat (3), ehdotus:**
1. Ranskan Kortteli valurautaparvekkeineen (esim. Royal Street tai
   Dumaine Street).
2. St. Louis -katedraali Jackson Squaren laidalta.
3. Mississippi-joki kaupungin kohdalla, mieluiten laivaliikenteellä.

**Kansikuvat (3), ehdotus:**
1. Kaupungin siluetti joelta tai Crescent City Connection -sillalta.
2. Jackson Square kokonaisuudessaan (katedraali, Pontalba-talot,
   patsas).
3. Mardi Gras -kulkue tai jazz-muusikot kadulla — elävää nykykulttuuria.

**Commons-kategoriat kuvahakuun (ei hakusanoja, kategorioiden
sisältö pitää silti aina tarkistaa silmin lisenssisääntöjen
mukaisesti):**
- `Category:French Quarter` — Ranskan Kortteli, arkkitehtuuri,
  katukuvat
- `Category:Jackson Square` — Jackson Square, katedraali,
  Pontalba-talot
- `Category:St. Louis Cathedral (New Orleans)` — katedraali sisältä
  ja ulkoa
- `Category:History of New Orleans` — yleinen historiallinen
  aineisto, laaja yläkategoria
- `Category:Congo Square` — Congo Square, nykyiset kokoontumiset
- `Category:Mardi Gras Indians` — puvut, paraatit, nykyiset heimot
- `Category:Mardi Gras in New Orleans` — karnevaali, kulkueet, throwt
- `Category:Jazz in New Orleans` (HUOM: tarkista tarkka
  kategorianimi kirjoitushetkellä — vaihtoehto `Category:Music of
  New Orleans` tai `Category:Louis Armstrong`)
- `Category:Hurricane Katrina` ja `Category:Effects of Hurricane
  Katrina in New Orleans` — tulva-aineisto (harkiten, ks.
  kuvasäännöt-osio "tuhoutuneen kaupungin nykykuvat")
- `Category:Lower Ninth Ward` — jälleenrakennus, nykyiset talot
- `Category:Steamboats in Louisiana` — höyrylaivakuvasto (nykyinen
  Natchez-höyrylaiva tai historiallinen aineisto)

**Nosto-/jaksokuvat, aihe-ehdotuksia (ei tiedostonimiä):**
1. Historiallinen litografia tai kartta Ranskan Kortteliin
   1800-luvun alusta (espanjalaiskauden arkkitehtuuri).
2. Höyrylaiva Mississippillä 1800-luvulta (litografia tai
   maalaus — alkuperäisestä "New Orleans" -laivasta ei tiettävästi
   ole säilynyttä kuvaa, ks. osio 7 kohta 5).
3. Congo Square -aiheinen historiallinen kuva (esim. E. W. Kemblen
   1886 kuvitus tanssista) TAI nykyinen sunnuntaikokoontuminen.
4. Mardi Gras Indianin puku läheltä kuvattuna, helmityö näkyvissä.
5. Jazz-muusikko tai -yhtye soittamassa kadulla tai klubilla
   (esim. Preservation Hall).
6. Rex- tai muun krewen kulkue, violetti-vihreä-kulta-värimaailma
   näkyvissä.
7. Lower Ninth Ward tänään — jälleenrakennettuja taloja, kerrottava
   kuvatekstissä mistä nykyilme johtuu (LINJAUSMUUTOS 20.8.2026).
8. Nykyinen Mississippi-satama konttilaivoineen tai -aluksineen.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Kaikki neljä visa-aihetta löytyvät faktapohjan teksteistä, mutta
   ei suoraan visan sanamuodolla.** Visa kysyy (a) jazzin syntyä
   1900-luvun alussa afroamerikkalaisesta musiikista + Armstrong
   syntyi 1901 (M2 käsittelee tätä tarkemmilla nimillä: Bolden,
   Morton, Congo Square -juuret), (b) Louisianan kauppaa Ranskalta
   1803 (NO2 antaa tarkat luvut: 15 milj. dollaria, 828 000
   neliömailia, päivämäärän), (c) Mississippi-jokea kaupungin
   sijaintina (NO1 + NO3 käsittelevät jokimutkaa ja penkereitä eri
   sanoin kuin visan "joen suulla... merenpinnan alapuolella"), (d)
   Mardi Gras'ta helmi-maaliskuun karnevaalina (M4 antaa historian ja
   tarkat yksityiskohdat sen sijaan että toistaisi "kulkueiden
   vaunuja rakentavat yhdistykset ympäri vuoden" -lauseen sellaisenaan
   — tosin lähellä samaa sisältöä, kirjoittajan kannattaa varmistaa
   sanamuoto ei täsmää visan fact-kenttään).
2. **Jazz syntyi vasta 1900-luvun alussa, reilu sukupolvi isoisän
   1873-matkan jälkeen.** Tämä on kerrottu auki johdannoissa eikä
   peitelty: musiikkisivun johdanto puhuu tarkoituksella "jazzin
   syntykaupungista" ilman vuosilukua, ja itse jazzin synty-nosto
   (M2) sanoo suoraan "1900-luvun alun". Congo Square, Storyvillen
   edeltäjät ja New Orleansin höyrylaivakulttuuri sen sijaan OVAT
   1873-aikaista aineistoa, ja niitä on painotettu H- ja
   kaupunki-sivun nostoissa.
3. **New Orleansin maaperän painuminen (subsidenssi) on tieteellisesti
   kiistanalainen** en-Wikipedian oman artikkelin mukaan: 2006 Geology-
   lehden tutkimus väitti, että syvä perusta on ollut vakaa 8000
   vuotta, kun taas ASCE:n raportti ja NASA:n 2016 tutkimus toteavat
   kaupungin painuvan vaihtelevalla mutta havaittavalla nopeudella.
   NO3-nosto on kirjoitettu ASCE-näkökulman mukaan (yleisin ja
   NASA-tutkimuksen tukema) ja ristiriita on merkitty EPÄVARMAKSI
   nostossa itsessään.
4. **Rex-krewen perustamisvuoden ja ensimmäisen kulkueen ero.**
   Mystick Krewe of Comus perustettiin 1856, mutta järjesti
   ensimmäisen kulkueensa vasta 1857 — M4-nosto erottaa nämä kaksi
   vuotta toisistaan eksplisiittisesti välttääkseen sekaannuksen.
5. **Alkuperäisestä höyrylaiva "New Orleansista" ei löytynyt
   tiettävästi säilynyttä aikalaiskuvaa** — Wikipedia-artikkelin
   kuva on 1856 kaiverrus, joka kuvaa laivan virheellisesti
   perämelalla varustettuna, vaikka todisteet viittaavat sivumela-
   alukseen (kerrottu kuvatekstissä alkuperäisessä artikkelissa).
   Kuvavalinnassa kannattaa käyttää yleisempää 1800-luvun
   höyrylaivakuvaa tai selittää kaiverruksen epätarkkuus
   kuvatekstissä, jos juuri tätä kuvaa käytetään.
6. **Louis Armstrongin syntymäaika on kiistanalainen.** Hän itse
   väitti usein syntyneensä 4.7.1900, mutta kirkonkirjat viittaavat
   4.8.1901 — jälkimmäinen on nykyisin yleisemmin hyväksytty ja
   sitä käytetään M2-nostossa; molemmat päivämäärät mainitaan
   Wikipediassa. — en-Wikipedia "Louis Armstrong" (Early life)
7. **"Jazz in New Orleans" -tyyppistä tarkkaa Commons-kategoriaa ei
   varmistettu olemassa olevaksi** tätä faktapohjaa kirjoitettaessa
   (ei tehty erillistä Commons-kategoriahakua, ks. kohta 9) — kirjoit-
   tajan kannattaa tarkistaa tarkka kategorianimi ennen kuvahakua.
8. **Kaksi 2020-luvun tapahtumaa jätetty tarkoituksella pois:**
   marraskuun 2025 Roomalaiskatolisen arkkihiippakunnan konkurssi
   (liittyy hyväksikäyttöoikeudenkäynteihin, ei kuulu pelin sävyyn
   eikä aikakauteen) ja tammikuun 2025 Bourbon Streetin
   kuorma-autoisku (nykyrikollisuutta/terrorismia, kielletty aihe
   Raamatun ja spec-mantereet.md:n linjausten mukaan: "ei
   nykysotaa eikä nykypolitiikkaa", "ei nykyrikollisuutta"). Joulukuun
   2025 kansalliskaartin partiointi samasta syystä jätetty pois.
9. **Vain en-Wikipediaa ja sen MediaWiki-rajapintaa on käytetty**
   tämän faktapohjan sisältöön; Commons-kategorioiden olemassaoloa ei
   ole erikseen varmistettu kategoriahaulla (Vancouver-mallista
   poiketen), joten kirjoittajan tulee tarkistaa jokainen
   Commons-kategoria kirjoitushetkellä ennen käyttöä.
10. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
    tekstiksi** merkkimäärävaatimusten mukaan (johdannot 200–214,
    nostot 496–632) ja tarkistettu koneellisesti Node-skriptillä.
