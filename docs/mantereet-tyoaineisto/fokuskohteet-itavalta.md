# Itävallan fokusnäkymän karttakohteet — faktapohja

Tila: luonnos, ei viety koodiin. Kaikki tiedot koottu 25.8.2026.
Sisarpaperit: docs/mantereet-tyoaineisto/fokuskohteet-italia.md ja
fokuskohteet-kreikka.md, joiden rakennetta tämä noudattaa.

Tausta (js/tyohuone-raamattu.js, osio "Fokusmoodi", kohdat
KOHDEKOROSTUS ja ETENEMINEN): pelilaattojen lisäksi fokusnäkymän
kartalla näkyy muita kaupunkeja, jokia, järviä ja vuoria; aarteen
löydyttyä niitä voi klikata, jolloin kartta korostaa juuri sen kohteen
niukalla taustalla ja avaa pienen pop-up-tietoruudun. Tämä dokumentti
on faktapohja niille pop-up-teksteille — ei lopullista pelitekstiä
eikä UI-suunnitelmaa.

## Itävallan pelilaatat — mitä kartalla JO on

js/packs/europe.js: Itävallan ainoa pelattava laatta on **Wien**
(526, 626). Laatalta on yhteydet Prahaan (2 askelta), Budapestiin
(2) ja Venetsiaan (4). Wien on myös maailmankartta-laudalla
(js/packs/maailmankartta.js, x 6379,9 / y 1467,8) ja
CITY_COUNTRY-taulukossa maakoodilla **AUT**.

Alppilaatta (`alpit`) on olemassa, mutta se on CITY_COUNTRY:n mukaan
**Sveitsissä (CHE)**, ei Itävallassa — sen ei siis pitäisi estää
itävaltalaisten vuorikohteiden ottamista mukaan. Alla olevista
kohteista **yksikään ei ole pelilaatta**.

Huomaa myös, että Wienin kaupunkilehden maakartalla
(js/packs/maakartat.js, avain `wien`) on jo seitsemän numeroitua
kohdetta (Raatihuone, Hofburg, Valtionooppera, Stephansdom,
Belvedere, Jättiratas, Schönbrunn). Ne ovat kaupungin sisäisiä
kohteita eivätkä mene päällekkäin tämän maakartan kanssa.

## Tarkistustapa

- **Koordinaatit:** en-Wikipedian MediaWiki-rajapinnasta
  (`action=query&prop=coordinates&redirects=1`), haettu 25.8.2026
  Nodella, `NODE_USE_ENV_PROXY=1`, User-Agent-otsakkeen kanssa.
  **EI yhtään koordinaattia muistista.** Kaikki 14 kohdetta antoivat
  koordinaatit ensimmäisellä yrityksellä.
- **Popup-faktat:** en- ja de-Wikipedian artikkeleista
  (`prop=extracts&explaintext=1`, johdanto ja tarvittaessa nimetty
  alaotsikko). Jokaisen kohdan alla on artikkeli JA se osio, johon
  väite nojaa. Kieli merkitty lähderiville.
- **Suomenkieliset nimet:** tarkistettu fi-Wikipediasta
  (`titles=...&redirects=1`). Kolmella kohteella ei ole
  suomenkielistä artikkelia (Krimmlin vesiputoukset, Marchegg,
  Melkin luostari löytyy nimellä *Stift Melk*), yhdellä on suomalainen
  nimimuoto (Neusiedler See → **Neusiedlerjärvi**) — merkitty
  kohteittain.
- **Kuvat:** jokaisen ehdotetun tiedoston olemassaolo, koko, lisenssi,
  tekijä ja Restrictions-kenttä on kysytty Commonsin
  `imageinfo`-rajapinnalla. Ei arvattuja tiedostonimiä. Kaikki
  ehdotetut ovat PD, CC0, CC BY tai CC BY-SA, ja kaikkien Restrictions
  on tyhjä.

---

## Kohteet

### 1. Salzburg

- **Nimi:** Salzburg (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki (Itävallan neljänneksi suurin).
- **Koordinaatit:** 47,8°N, 13,045°E — en-Wikipedia "Salzburg".
- **Popup-teksti (n. 420 merkkiä):**

  > Salzburgin nimi tulee suolasta: Salzach-jokea pitkin kuljetettiin
  > suolaproomuja, joista perittiin tulli jo 700-luvulla. Kaupunki
  > kasvoi arkkipiispojen vallan varassa, ja sen yllä seisova
  > Hohensalzburgin linnoitus vuodelta 1077 on Euroopan suurimpia
  > keskiaikaisia linnoituksia. Täällä syntyi Wolfgang Amadeus Mozart.
  > Vanhakaupunki otettiin Unescon maailmanperintöluetteloon 1996.

- **Lähde:** en-Wikipedia "Salzburg", johdanto ja osiot "Etymology" ja
  "Middle Ages" ("The fortress of Hohensalzburg, one of the largest
  medieval fortresses in Europe, dates from the 11th century";
  "Hohensalzburg Fortress... was built on the site of a Roman fort in
  1077 by Archbishop Gebhard"; "The name derives from the barges
  carrying salt on the River Salzach, which were subject to a toll in
  the 8th century"; "being the birthplace of Wolfgang Amadeus Mozart";
  "The historic centre was listed as a UNESCO World Heritage Site in
  1996").
- **Kuva:** Commons **Salzburg Altstadt Panorama 20170409 02.jpg**
  (12131×5580, CC BY-SA 4.0, Uoaei1, 2017) — näkymä Mönchsbergiltä
  linnoitukseen ja vanhaankaupunkiin. HUOM: erittäin suuri tiedosto,
  skaalaa ennen käyttöä.
- **HUOM:** Mozart on jo pelissä Wienin musiikkikategoriassa
  (Taikahuilu, kulttuuri-kategoriat.js) ja Schönbrunnin
  nähtävyysjutussa (kuusivuotias ihmelapsi). Salzburgin popupissa
  Mozart kannattaa mainita vain syntymäkaupunkina, ei toistaa
  Wien-tarinoita.

### 2. Innsbruck

- **Nimi:** Innsbruck (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki, Tirolin pääkaupunki.
- **Koordinaatit:** 47,26833°N, 11,39333°E — en-Wikipedia "Innsbruck".
- **Popup-teksti (n. 420 merkkiä):**

  > Innsbruck tarkoittaa Innin siltaa: kaupunki syntyi paikkaan, jossa
  > ylitettiin joki matkalla Brennerin solaan, Alppien helpoimpaan
  > ylityspaikkaan. Siltatulli teki siitä rikkaan. Keisari
  > Maksimilian I asui täällä 1490-luvulla ja teetti kaupungin
  > tunnuksen, Kultaisen katon. Vuorten ympäröimä kaupunki on ainoa,
  > joka on isännöinyt talviolympialaiset kahdesti, 1964 ja 1976.

- **Lähde:** en-Wikipedia "Innsbruck", johdanto ja osiot "Antiquity" ja
  "Early history" ("The name means 'bridge over the Inn'"; "at its
  junction with the Wipp Valley, which provides access to the Brenner
  Pass 30 km to the south"; "The route over the Brenner Pass was then a
  major transport and communications link between the north and the
  south of Europe, and the easiest route across the Alps... The
  revenues generated by serving as a transit station on this route
  enabled the city to flourish"; "Emperor Maximilian I, who enriched
  the city with landmark buildings like the Golden Roof"; "it hosted
  the 1964 and 1976 Winter Olympics").
- **Kuva:** Commons **Goldenes Dachl (Innsbruck).jpg** (1200×1600,
  CC BY-SA 3.0, Erbb, 2006).
- **HUOM:** "ainoa kaupunki, joka on isännöinyt talviolympialaiset
  kahdesti" on **oma päätelmäni** — lähde sanoo vain, että Innsbruck
  isännöi ne 1964 ja 1976. Turvallisin muoto: "talviolympialaiset
  kahdesti, 1964 ja 1976", ilman ainoa-väitettä.

### 3. Graz

- **Nimi:** Graz (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki (Itävallan toiseksi suurin).
- **Koordinaatit:** 47,07083°N, 15,43861°E — en-Wikipedia "Graz".
- **Popup-teksti (n. 400 merkkiä):**

  > Grazin nimi tulee slaavin sanasta gradec, "pieni linna". Kaupunki
  > oli 1300-luvulta lähtien Habsburgien sisä-Itävallan haaran
  > asuinpaikka ja samalla varustus ottomaaneja vastaan: sen
  > Schlossbergille rakennettiin linnoitus ja kaupunkiin aseita
  > säilövä maakunnan asehuone. Vanhakaupunkia pidetään yhtenä
  > Keski-Euroopan parhaiten säilyneistä, ja se on ollut Unescon
  > listalla vuodesta 1999.

- **Lähde:** en-Wikipedia "Graz", johdanto ja osio "Etymology" ("The
  name of the city, Graz... most likely derives from Slavic
  gradec/gradac 'small castle'"; "From the 14th century onward, it
  served as the residence of the Inner Austrian branch of the Habsburg
  dynasty"; "Graz also held strategic military importance as a
  stronghold against the Ottoman Empire, particularly through the
  fortifications on the Schlossberg"; "Its historic centre (Altstadt)
  is considered one of the best-preserved urban centres in Central
  Europe"; "In 1999, the historic centre of Graz was added to the
  UNESCO list of World Heritage Sites; in 2010, the designation was
  expanded to include Eggenberg Palace").
- **Kuva:** Commons **Landeszeughaus Graz 01.jpg** (3072×2304,
  CC BY-SA 3.0, Cezar Suceveanu, 2012) — maakunnan asehuone.
- **EPÄVARMA:** en-artikkelin Graz-teksti ei sano, että Landeszeughaus
  olisi maailman suurin säilynyt historiallinen asevarasto (yleinen
  väite matkaoppaissa). **ÄLÄ käytä sitä ilman erillistä tarkistusta
  artikkelista "Landeszeughaus".** Yllä oleva popup pysyy siinä, minkä
  Graz-artikkeli sanoo.
- **Pelikytkös:** Graz esiintyy myös Wienin täkyaineistossa
  (takyt-wien.md, täky 5): Nikola Tesla näki Gramme-koneen Grazin
  teknillisessä korkeakoulussa 1875.

### 4. Linz

- **Nimi:** Linz (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki (Itävallan kolmanneksi suurin), Tonavan varrella.
- **Koordinaatit:** 48,30583°N, 14,28639°E — en-Wikipedia "Linz".
- **Popup-teksti (n. 440 merkkiä):**

  > Linz alkoi roomalaisten Lentiana Tonavan mutkassa. Johannes Kepler
  > opetti täällä matematiikkaa ja löysi 15. toukokuuta 1618 kolmannen
  > planeettalakinsa. Linzistä Budweisiin kulki Manner-Euroopan toiseksi
  > vanhin yleinen rautatie — hevosvetoinen rata, joka kuljetti
  > Salzkammergutin suolaa Böömiin. Hevosliikenne lakkautettiin
  > joulukuussa 1872, ja isoisän matkavuonna 1873 tilalle valmistui
  > höyryveturirata.

- **Lähde:** en-Wikipedia "Linz", johdanto ja osio "History" ("Linz
  originated as a Roman fort named Lentia"; "Johannes Kepler spent
  several years of his life in the city teaching mathematics. On 15 May
  1618 he discovered Kepler's laws of planetary motion");
  en-Wikipedia "Budweis–Linz–Gmunden Horse-Drawn Railway", johdanto
  ("the second public railway line to be opened in mainland Europe
  (after the Saint-Étienne–Andrézieux railway). It opened in stages
  between 1827 and 1836, and principally served the transport of salt
  from the Upper Austrian Salzkammergut to Bohemia"; "By 1873, a
  replacement line between Linz and České Budějovice was built, mostly
  along another route, and allowed for a steam service. The
  horse-drawn service was closed in December 1872").
- **Kuva:** Commons **LinzHauptplatz.jpg** (4000×3000, CC BY-SA 3.0,
  Agapito, 2010) — Linzin pääaukio raitiovaunuineen.
  **SILMÄTARKISTUS:** katukuvassa on ihmisiä; tarkista, ettei ketään
  ole tunnistettavasti etualalla.
- **HUOM SANAMUOTO:** en-artikkeli sanoo Keplerin "discovered Kepler's
  laws of planetary motion" 15.5.1618. Tarkkaan ottaen kyse on
  kolmannesta laista; koska artikkeli ei erittele sitä, turvallisin
  muoto on "löysi Linzissä 15.5.1618 yhden planeettalaeistaan" tai
  jättää laki nimeämättä.
- **Pelikytkös:** suola yhdistää Linzin kohteisiin 5 (Hallstatt) ja
  14 (Bad Ischl) — sama kauppatie.

### 5. Hallstatt

- **Nimi:** Hallstatt (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kylä ja suolakaivos, Hallstätter Seen rannalla.
- **Koordinaatit:** 47,562°N, 13,649°E — en-Wikipedia "Hallstatt".
- **Popup-teksti (n. 440 merkkiä):**

  > Hallstattin suolakaivos on maailman vanhin yhä toimiva. Suolaa on
  > louhittu täällä tuhansia vuosia, alun perin sarvihakuilla, ja
  > vanhimmat suolapalat hakattiin sydämen muotoisiksi. Vuonna 1846
  > kaivosten läheltä löytyi valtava esihistoriallinen hautausmaa,
  > josta on kaivettu yli tuhat hautaa — koko rautakauden vaihe sai
  > siitä nimekseen Hallstattin kulttuuri. Kylään pääsi maantietä
  > pitkin vasta 1890.

- **Lähde:** en-Wikipedia "Hallstatt", johdanto ja osiot "History",
  "19th century" ja "Hallstatt salt mine" ("gave its name to the
  Hallstatt culture, the archaeological culture linked to Proto-Celtic
  and early Celtic people of the Early Iron Age in Europe, c. 800–450
  BC"; "In 1846 Johann Georg Ramsauer discovered a large prehistoric
  cemetery at the Salzberg mines... Eventually the excavation would
  yield 1,045 burials"; "The first road to Hallstatt was only built in
  1890, along the west shore, partially by rock blasting"; "originally
  in the shape of hearts owing to the use of antler picks"; "The
  Hallstatt salt mine is the world's oldest working salt mine").
- **Kuva:** Commons **Panoramic view of Hallstatt village and
  shoreline from lake.jpg** (5370×1492, CC BY 4.0, David Kernan, 2025).
- **IKÄSOPIVUUS:** artikkeli kertoo myös kylän luukammiosta, jossa on
  yli 1 200 maalattua pääkalloa, koska hautatilaa ei riittänyt.
  Aihe on 13+:lle mahdollinen mutta raskas ja menee lisäksi
  päällekkäin pelissä jo olevan Stephansdomin luukammion kanssa
  (europe-valokuvat.js) — **jätä popupista pois.**
- **HUOM:** artikkeli kertoo myös nykyisestä liikaturismista
  (10 000–30 000 päiväkävijää, aidat selfieitä vastaan, mielenosoitukset
  2023). Se on totta ja kiinnostavaa, mutta se ei kuulu tähän
  popupiin; jos halutaan, se on oma nostonsa.

### 6. Grossglockner

- **Nimi:** Grossglockner (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** vuori, Itävallan korkein (3 798 m).
- **Koordinaatit:** 47,07487°N, 12,69525°E — en-Wikipedia
  "Grossglockner".
- **Popup-teksti (n. 440 merkkiä):**

  > Itävallan korkein huippu on 3 798 metriä ja kaksihuippuinen:
  > Grossglockner ja sen vieressä matalampi Kleinglockner. Ensimmäinen
  > kiipeäminen oli piispan järjestämä retkikunta: elokuussa 1800
  > vuorelle lähti 62 ihmistä, ja huipulle asti pääsi lopulta vain neljä
  > opasta ja pappi, joka luki edeltä itselleen kuolinrukoukset.
  > Keisaripari Franz Joseph ja Elisabeth kävelivät vuoren juurelle
  > 1865, ja sen näköalapaikka kantaa yhä keisarin nimeä.

- **Lähde:** en-Wikipedia "Grossglockner", johdanto ja osiot "First
  ascent" ja "Development" ("at 3,798 metres above the Adriatic, the
  highest mountain in Austria"; "Together with the Kleinglockner to the
  southeast it forms a distinctive double peak"; "On 28 July 1800, 62
  people... started again into the Leitertal valley... only the four
  guides and Mathias Hautzendorfer, the local priest of the
  Rangersdorf parish, were able to cross the Obere Glocknerscharte and
  climb the Grossglockner summit. Hautzendorfer had to be persuaded to
  venture the step and administered the last rites in advance"; "both
  had visited Heiligenblut and walked to the present-day
  Franz-Josefs-Höhe viewpoint in 1865").
- **Kuva:** Commons **Grossglockner and Pasterze glacier.jpg**
  (2995×1469, CC BY-SA 3.0, Kotu, 2009) — vuori ja Pasterze-jäätikkö.
- **1873-KULMA:** vuori oli isoisän matkavuonna vasta muuttumassa
  turistikohteeksi: Julius von Payer tutki läntisen reitin 1863,
  Johann Stüdl rakennutti kiinniteitä 1864 ja Stüdlhütte-majan 1868, ja
  jo 1869 useimmat huippuretket lähtivät Kalsista. Ensimmäinen
  talvinousu tehtiin 2.1.1875. Lähde: sama artikkeli, osio
  "Development".
- **RAJAUS:** artikkelin osiossa "Incidents" on vuoden 2026
  oikeustapaus, jossa mies tuomittiin tyttöystävänsä jättämisestä
  huipulle. **EI mukaan** — kyse on elävistä ihmisistä ja tuoreesta
  henkirikoksesta.

### 7. Semmeringin rautatie

- **Nimi:** Semmeringin rautatie (fi-Wikipedia, artikkeli olemassa
  tällä nimellä).
- **Tyyppi:** rautatie / kulttuurimaisema.
- **Koordinaatit:** 47,643°N, 15,831°E — en-Wikipedia "Semmering
  Railway".
- **Popup-teksti (n. 440 merkkiä):**

  > Semmeringin rata Gloggnitzista Mürzzuschlagiin oli Euroopan
  > ensimmäinen normaaliraiteinen vuoristorata ja rakennettiin
  > 1848–1854 noin 20 000 työntekijän voimin. Neljäänkymmeneenyhteen
  > kilometriin mahtuu 460 metrin korkeusero, 14 tunnelia, 16
  > viaduktia ja yli sata kivikaarisiltaa. Veturit piti suunnitella
  > sitä varten uusiksi, samoin mittausvälineet. Isoisä olisi voinut
  > matkustaa sitä 1873; se on yhä liikenteessä.

- **Lähde:** en-Wikipedia "Semmering Railway", johdanto ja osio
  "History" ("the first mountain railway in Europe built with a
  standard gauge track. It is commonly referred to as the world's first
  true mountain railway"; "constructed between 1848 and 1854 by some
  20,000 workers under the project's designer and director Carl von
  Ghega"; "The construction features 14 tunnels (among them the 1,431 m
  summit tunnel), 16 viaducts (several two-storey) and over 100 stone
  arch bridges and 11 small iron bridges"; "Across an overall track
  length of 41 km the Semmering railway overcomes an altitude
  difference of 460 m"; "new instruments and methods of surveying had
  to be developed"; "which is in full use 160 years after its
  building").
- **Kuva:** Commons **Breitenstein - Semmeringbahn, Viadukt Kalte
  Rinne.JPG** (3810×2120, CC BY-SA 4.0, C. Stadler/Bwag, 2021) —
  Kalte Rinnen kaksikerroksinen viadukti.
- **HUOM:** en-artikkelin lainaamani osuus ei mainitse Unescon
  maailmanperintöstatusta (1998), vaikka se on yleisesti tiedossa.
  **Älä väitä sitä tästä lähteestä** ilman erillistä tarkistusta.
  Viimeinen virke ("isoisä olisi voinut matkustaa") on oma
  ajoituspäätelmäni radan valmistumisvuodesta 1854.

### 8. Wachau

- **Nimi:** Wachau (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** jokilaakso Tonavan varrella, Melkin ja Kremsin välissä.
- **Koordinaatit:** 48,36444°N, 15,43417°E — en-Wikipedia "Wachau".
- **Popup-teksti (n. 440 merkkiä):**

  > Tonavan 36 kilometrin mittainen laakso Melkin ja Kremsin välillä on
  > ollut asuttu esihistoriasta asti: sen kylistä on löytynyt kaksi
  > kuuluisaa naisfiguuria, Galgenbergin noin 32 000 ja Willendorfin
  > noin 26 000 vuoden takaa. Dürnsteinin linnassa pidettiin
  > vankina Englannin kuningas Rikard Leijonamielta, joka oli
  > loukannut Itävallan herttuaa — vapaus maksoi 35 000 kiloa hopeaa.
  > Laakso on ollut Unescon listalla vuodesta 2000.

- **Lähde:** en-Wikipedia "Wachau", johdanto ja osiot "Ancient
  history" ja "Dukedom of Babenberg" ("It is 36 kilometres in length";
  "Palaeolithic records of the valley have been identified in the form
  of 'figurines' in Galgenberg and Willendorf, stated to be 32,000
  years and 26,000 years old, respectively"; "the King of England,
  Richard the Lionheart, was imprisoned at the Kuenringerburg castle
  above the Dürnstein town because he insulted the Babenberg Duke,
  Leopold V by showing disrespect to the Austrian flag... He was
  finally released after paying a kingly ransom of 35,000 kg of
  silver"; "inscribed as 'Wachau Cultural Landscape' in the UNESCO List
  of World Heritage Sites... in December 2000").
- **Kuva:** Commons **20230502.Danube in Dürnstein.-012.jpg**
  (9248×5798, CC BY-SA 4.0, Bybbisch94 / Christian Gebhardt, 2023) —
  Tonava ja Dürnstein. HUOM: suuri tiedosto, skaalaa.
- **HUOM:** artikkeli kertoo myös legendan Blondelista, joka olisi
  löytänyt vangitun kuninkaan laulamalla — se on lähteessä nimenomaan
  merkitty myytiksi ("According to myth"). Jos se otetaan mukaan, se on
  kerrottava tarinana.

### 9. Melkin luostari

- **Nimi:** **Stift Melk** — fi-Wikipedia ohjaa haun "Melkin luostari"
  tähän artikkeliin.
- **Tyyppi:** benediktiiniluostari kalliolla Tonavan yllä.
- **Koordinaatit:** 48,22806°N, 15,33389°E — en-Wikipedia "Melk Abbey".
- **Popup-teksti (n. 430 merkkiä):**

  > Melkin luostari perustettiin 1089, kun Itävallan varhaisimman
  > hallitsijasuvun, Babenbergien, ruhtinas lahjoitti yhden linnoistaan
  > munkeille. Nykyinen barokkirakennus valmistui 1702–1736. Luostarin
  > kirjasto tunnettiin jo keskiajalla käsikirjoituskokoelmastaan, ja
  > sen maine pelasti sen: keisari Joosef II lakkautti kymmeniä
  > itävaltalaisia luostareita 1780-luvulla, mutta Melk sai jäädä.

- **Lähde:** en-Wikipedia "Melk Abbey", johdanto ja osio "History"
  ("The abbey was founded in 1089 when Leopold II, Margrave of Austria
  gave one of his castles to Benedictine monks from Lambach Abbey";
  "the monastic library soon became renowned for its extensive
  manuscript collection"; "Today's Baroque abbey was built between 1702
  and 1736 to designs by Jakob Prandtauer"; "Due to its fame and
  academic stature, the Benedictine monastery Melk managed to escape
  dissolution under Emperor Joseph II when many other Austrian abbeys
  were seized and dissolved between 1780 and 1790"; "The abbey contains
  the tomb of Saint Coloman of Stockerau and the remains of several
  members of the House of Babenberg, Austria's first ruling dynasty").
- **Kuva:** Commons **Stift Melk-02-Donau-2006-gje.jpg** (2868×852,
  CC BY-SA 4.0, Gerd Eichmann, 2006) — luostari Tonavan yllä,
  panoraamasuhde sopii leveään popupiin.
- **HUOM:** Umberto Econ *Ruusun nimi* nimeää kertojansa "Adso of
  Melk" kunnianosoituksena luostarille (lähde: sama artikkeli). Hauska
  mutta ei välttämätön; Fablen päätettävissä.
- **Pelikytkös:** Joosef II esiintyy myös Wienin täkyaineistossa
  (takyt-wien.md, täky 16, Narrenturm) — sama hallitsija, kaksi eri
  puolta.

### 10. Neusiedlerjärvi

- **Nimi:** **Neusiedlerjärvi** (fi-Wikipedia; haku "Neusiedler See"
  ohjautuu tähän). Saksaksi Neusiedler See, unkariksi Fertő tó.
- **Tyyppi:** järvi (Itävallan ja Unkarin rajalla).
- **Koordinaatit:** 47,83333°N, 16,75°E — en-Wikipedia "Lake Neusiedl".
- **Popup-teksti (n. 450 merkkiä):**

  > Keski- ja Länsi-Euroopan suurin järvi, jolla ei ole laskujokea:
  > 315 neliökilometriä vettä, jonka syvyys on enimmilläänkin vain 1,8
  > metriä. Se on kuivunut kokonaan ainakin sata kertaa. Viimeksi niin
  > kävi 1866, jolloin paikallinen Gottlieb Wenzel merkitsi
  > päiväkirjaansa kävelleensä järven pohjan yli 4. kesäkuuta
  > likaamatta saappaitaan. Pohjalle kylvettiin vehnää ja naurista.
  > Vesi alkoi palata 1871 ja oli ennallaan keväällä 1876.

- **Lähde:** en-Wikipedia "Lake Neusiedl", johdanto ja osio "Water
  level fluctuations" ("the largest endorheic lake in Central and
  Western Europe"; "The lake is saline and covers 315 km2... it is no
  more than 1.8 m deep"; "Stratigraphy shows that the lake bed has
  totally dried up at least 100 times since its formation"; "most
  recently in 1866, when the private diary of a local, Gottlieb
  Wenzel, noted that he crossed its bed on 4 June without soiling his
  boots... Parts of the lake bed were claimed for agriculture; wheat
  and turnips were being planted. However, in 1871 the lake began to
  return and by the spring of 1876 it had already reassumed its usual
  size").
- **Kuva:** Commons **Lake Neusiedl in Rust during sunset, 20220424
  1941 4889.jpg** (4561×3045, CC BY-SA 4.0, Jakub Hałun, 2022).
  Talvivaihtoehto: **Neusiedler See im Winter.jpg** (1280×960,
  CC BY-SA 4.0, Lutz Fischer-Lamprecht, 2003).
- **HUIPPUKULMA 1873:** isoisän matkavuonna järvi oli **kesken
  paluutaan** — se oli ollut kuivana 1866 ja saavutti normaalikokonsa
  vasta 1876. Tämä on koko Itävalta-aineiston paras yksittäinen
  1873-koukku Wienin ulkopuolella.
- **ELÄINPUOLI:** alueella on havaittu yli 300 lintulajia, joista noin
  150 pesii — noin 40 % Euroopan ja 80 % Itävallan lintulajeista;
  suurimpia haikaralintuyhdyskuntia (jopa 700 jalohaikaraparia) sekä
  n. 70 isotrappiparia. Nisäkkäistä mm. maaoravaa, arokärppää ja
  peltohamsteria. Sama lähde, osiot "Mammals" ja "Birds".

### 11. Hohe Tauernin kansallispuisto

- **Nimi:** **Hohe Tauern** (fi-Wikipedia; vuoristoartikkeli — omaa
  suomenkielistä kansallispuistoartikkelia ei ole).
- **Tyyppi:** kansallispuisto / vuoristo.
- **Koordinaatit:** 47,09944°N, 12,65694°E — en-Wikipedia "Hohe Tauern
  National Park".
- **Popup-teksti (n. 440 merkkiä):**

  > Alppien suurin luonnonsuojelualue ulottuu sata kilometriä Hohe
  > Tauern -vuoriston suuntaisesti ja on pinta-alaltaan noin 1 834
  > neliökilometriä. Sen ydinalueella, jossa maatalous on kokonaan
  > kielletty, ovat Grossglockner ja Grossvenediger. Puisto perustettiin
  > vaiheittain: julistus allekirjoitettiin Heiligenblutissa 1971,
  > ensimmäiset alueet suojeltiin 1981 ja viimeiset liittyivät 1992.
  > Kokonaan hävinneet partakorppikotka ja alppimurmeli on palautettu.

- **Lähde:** en-Wikipedia "Hohe Tauern National Park", johdanto ja
  osiot "History" ja "Flora and Fauna" ("It stretches for 100
  kilometres along the Hohe Tauern mountain range... With an area of
  about 1,834 square kilometres, it is by far the largest of Austria's
  seven national parks as well as the largest nature reserve in the
  Alps"; "a core zone of 1,198 square kilometres including the
  Grossglockner and Grossvenediger massifs, with complete prohibition
  of agricultural use"; "established according to a 1971 declaration
  signed by the participating states at Heiligenblut, it nevertheless
  took until 1981... The adjacent parts finally joined in 1992"; "The
  formerly extinct bearded vulture and the Alpine marmot have been
  successfully reintroduced").
- **Kuva:** Commons **Nationalpark Hohe Tauern - Gletscherweg
  Innergschlöß - 27 - Salzboden.jpg** (5298×3312, CC BY-SA 3.0,
  Haeferl, 2020).
- **ELÄINPUOLI (tarkennus toisesta lähteestä):** partakorppikotkan
  palautus alkoi **1986 Rauriser Krumltalissa** juuri tässä puistossa;
  vuoteen 2018 mennessä Itävallassa oli vapautettu 63 lintua (koko
  Alpeilla 229), ja vuoden 2024 lopussa Itävallan kanta arvioitiin
  noin 40 linnuksi. Lähde: de-Wikipedia "Bartgeier", osio
  "Wiederansiedlung in Österreich". Ks. takynostot-itavalta.md, nosto 9.

### 12. Eisriesenwelt

- **Nimi:** Eisriesenwelt (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** jääluola Werfenissä, n. 40 km Salzburgista etelään.
- **Koordinaatit:** 47,50294°N, 13,19025°E — en-Wikipedia
  "Eisriesenwelt".
- **Popup-teksti (n. 440 merkkiä):**

  > "Jättiläisten jäämaailma" on maailman suurin jääluola: yli 42
  > kilometriä käytäviä, joista vain ensimmäinen kilometri on jäässä.
  > Jää syntyy talvituulesta, joka puhaltaa sisään ja jäädyttää sulaneen
  > lumen; kesällä virtaus kääntyy ja luolasta ulos työntyvä kylmä ilma
  > estää sulamisen. Paikalliset välttivät luolaa, koska pitivät sitä
  > helvetin sisäänkäyntinä. Se "löydettiin" virallisesti vasta 1879.

- **Lähde:** en-Wikipedia "Eisriesenwelt", johdanto ja osiot "Geology"
  ja "History" ("The Eisriesenwelt (German for 'World of the Ice
  Giants') is a natural limestone and ice cave located in Werfen,
  Austria, about 40 km south of Salzburg... It is the largest ice cave
  in the world, extending more than 42 km"; "Although the cave has a
  length of 42 km, only the first kilometer... is covered in ice";
  "chilly winter winds blow into the cave and freeze the snow inside.
  In summer, a cold wind from inside the cave blows toward the
  entrance and prevents the formations from melting"; "The first
  official discovery of Eisriesenwelt was by Anton Posselt... in 1879...
  Before his discovery, the cave was known only to locals, who,
  believing that it was an entrance to Hell, refused to explore it").
- **Kuva:** Commons **Eisriesenwelt, Macizos de Tennen, Austria,
  2019-05-18, DD 58.jpg** (7857×5792, CC BY-SA 4.0, Diego Delso,
  2019). HUOM: suuri tiedosto.
- **1873-KULMA:** luola löydettiin **kuusi vuotta isoisän matkan
  jälkeen** — hän ei olisi voinut käydä siellä. Jos popup kirjoitetaan
  isoisän äänellä, sen on oltava nykyhetken ääni.

### 13. Krimmlin vesiputoukset

- **Nimi:** ei suomenkielistä artikkelia (haut "Krimmlin
  vesiputoukset" ja "Krimmler Wasserfälle" eivät löydä fi-artikkelia).
  Saksaksi **Krimmler Wasserfälle**.
- **Tyyppi:** vesiputous Hohe Tauernin kansallispuistossa.
- **Koordinaatit:** 47,19806°N, 12,17139°E — en-Wikipedia "Krimml
  Waterfalls".
- **Popup-teksti (n. 430 merkkiä):**

  > Itävallan korkein vesiputous putoaa kolmessa portaassa yhteensä
  > 380 metriä: ylin 140, keskimmäinen 100 ja alin taas 140 metriä.
  > Vesi tulee jäätiköltä, joten määrä vaihtelee valtavasti — kesä-
  > ja heinäkuussa 5,6 kuutiometriä sekunnissa, helmikuussa 0,14.
  > Suurin mitattu virtaama oli 25. elokuuta 1987: 166,7 kuutiometriä
  > sekunnissa. Putouksen sumu kasvattaa satoja sammal- ja
  > saniaislajeja.

- **Lähde:** en-Wikipedia "Krimml Waterfalls", johdanto ja osiot
  "Falls", "Flow" ja "Tourism" ("with a total height of 380 metres, are
  the highest waterfall in Austria"; "The upper stage has a drop of 140
  metres, the middle of 100 metres, and the lowest a drop of 140
  metres"; "Its volumetric flow in June and July is 5.6 cubic metres
  per second, while in February it is only 0.14... The greatest
  measured flow was on 25 August 1987, when it was 166.7 cubic metres
  per second"; "The misty spray of the waterfall creates ideal growth
  condition for hundreds of mosses, lichens and ferns. The
  surroundings are the habitat for 62 bird species").
- **Kuva:** Commons **1444 - Nationalpark Hohe Tauern - Krimmler
  Wasserfälle.JPG** (2736×3648, CC BY-SA 2.5, Andrew Bossi, 2007).
  Vaihtoehto: **Krimmler Wasserfälle 05-2007.jpg** (521×768,
  **lisenssi "Attribution"** eli pelkkä nimeämisvelvoite, Martin
  Hlauka, 2007) — pieni ja lisenssiltään poikkeava, käytä ensisijaisesti
  ensimmäistä.
- **1873-KULMA:** Itävallan alppikerho paransi tien näköalapaikalle
  1879, eli kuusi vuotta isoisän matkan jälkeen; sitä ennen ylös vei
  Ignaz von Kürsingerin raivaama polku. Lähde: sama artikkeli, osio
  "Tourism".

### 14. Bad Ischl

- **Nimi:** Bad Ischl (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kylpyläkaupunki Salzkammergutissa, Traun-joen varrella.
- **Koordinaatit:** 47,72028°N, 13,63333°E — en-Wikipedia "Bad Ischl".
- **Popup-teksti (n. 450 merkkiä):**

  > Ischl oli suolakaupunki, jonka ensimmäinen kaivos avattiin 1563.
  > Kun suolavettä alettiin 1800-luvulla pitää lääkkeenä, siitä tuli
  > muotikylpylä. Franz Joseph valitsi sen kesäasunnokseen 1849 ja
  > kihlautui täällä 19. elokuuta 1853 Baijerin Elisabethin kanssa;
  > äiti antoi pariskunnalle häälahjaksi Kaiservillan, jota keisari
  > kutsui "taivaaksi maan päällä". Samassa huvilassa hän allekirjoitti
  > 28. heinäkuuta 1914 sotajulistuksen Serbialle eikä palannut sinne
  > enää koskaan.

- **Lähde:** en-Wikipedia "Bad Ischl", johdanto ja osio "History" ("A
  first salt mine was opened in 1563"; "When in the early part of the
  19th century brine became medically popular in Continental Europe,
  Ischl soon turned into a fashionable spa resort"; "In 1849 Franz
  Karl's son, Emperor Franz Joseph I of Austria chose the town for his
  summer residence"; "On 19 August 1853 the engagement between Franz
  Joseph and Elisabeth of Bavaria (Sisi) took place at the Seeauerhaus";
  "In 1854, the Emperor's mother, Archduchess Sophie, gave him the
  Kaiservilla (Imperial Villa) as a wedding present... Franz Joseph
  described it as 'Heaven on Earth'... In the Kaiservilla on 28 July
  1914 Franz Joseph signed Austria-Hungary's declaration of war against
  the Kingdom of Serbia, signalling the start of hostilities in World
  War I. He left Bad Ischl on the following day and never returned").
- **Kuva:** Commons **Kaiservilla Bad Ischl.JPG** (2580×1720, public
  domain, Toffel, 2006).
- **1873-KULMA:** isoisän matkavuonna Bad Ischl oli hovin kesäpaikka
  ja keisariperhe oli siellä joka kesä — sama pariskunta, jonka
  Wienin näyttely 1873 kokosi (ks. takyt-wien.md, täky 17).
- **RAJAUS:** artikkeli mainitsee myös, että keisari antoi
  rakastajattarelleen Katharina Schrattille läheisen huvilan, jonne
  pääsi piilotettua polkua pitkin. Se on tosi ja lähteessä; 13+:lle
  se on kerrottavissa asiallisesti, mutta popup-tekstiin se ei mahdu.
  Ks. takynostot-itavalta.md, nosto 10.

---

## Varalla (jos kohteita tarvitaan enemmän)

### V1. Marchegg — haikarakylä

- **Nimi:** ei suomenkielistä artikkelia. Saksaksi Marchegg.
- **Koordinaatit:** 48,28333°N, 16,9°E — en-Wikipedia "Marchegg".
- **Fakta:** Marchegg tunnetaan "haikarakaupunkina". Kaupungin
  luonnonsuojelualue Untere Marchauen on samalla WWF Itävallan
  luonnonreservaatti, jossa pesii **noin 50 kattohaikaraparia — ja ne
  rakentavat pesänsä puihin**. Itävallan suurimmat haikarakannat ovat
  Burgenlandissa ja Marchfeldissä Tonavan varrella; Marchfeldissä
  haikarat ovat viime vuosikymmeninä palanneet pesimään puihin, kun
  taas Burgenlandissa, esimerkiksi Rustin kaupungissa, pesät ovat
  talojen katoilla (2008: 16 paria ja 38 poikasta). Itävallan
  ensimmäinen laskenta 1934 antoi 119–130 pesivää paria; 2021
  BirdLife Österreichin seuranta ilmoitti 420 paria.
- **Lähde:** de-Wikipedia "Marchegg", johdanto ja luettelo
  luonnonsuojelualueista ("Marchegg ist eine als Storchenstadt
  bekannte Stadtgemeinde"; "Naturschutzgebiet Untere Marchauen,
  zugleich WWF Naturreservat Marchegg des World Wide Fund for Nature
  (WWF Österreich) mit etwa 50 Weißstorch-Paaren, die auf Bäumen ihre
  Horste bauen"); de-Wikipedia "Weißstorch", osio Itävallan kannasta.
- **Kuva:** Commons **Marchegg 07.jpg** (2048×1536, CC BY-SA 3.0,
  Lure, 2009) — suoalue linnan takana, haikaroiden pesimäalue.
  Vaihtoehto: **Marchegg 2124.jpg** (2592×3888, CC BY-SA 3.0, Karl
  Gruber, 2010) — haikara Marcheggin linnalla.
  **SILMÄTARKISTUS:** elävä lintu.
- **EPÄVARMA — ÄLÄ VÄITÄ:** matkailulähteissä Marcheggia kutsutaan
  usein "Euroopan suurimmaksi puissa pesiväksi haikarayhdyskunnaksi".
  **Wikipedia EI sano tätä** — se sanoo vain "noin 50 paria, jotka
  pesivät puissa". Käytä lukua, älä superlatiivia.

### V2. Bregenz

- **Koordinaatit:** 47,505°N, 9,74917°E — en-Wikipedia "Bregenz".
  Vorarlbergin pääkaupunki Bodenjärven rannalla, Itävallan
  läntisin nurkka. **Faktapohjaa ei ole vielä kerätty** — jos kohde
  otetaan, artikkeli on haettava erikseen.

---

## Yhteenveto: kärkiehdokkaat

1. **Kohde 10 (Neusiedlerjärvi)** — paras 1873-koukku Wienin
   ulkopuolella: järvi oli isoisän matkavuonna kesken paluutaan
   kuivumisen jälkeen, ja saapasanekdootti on tarkistettu.
2. **Kohde 5 (Hallstatt)** — maailman vanhin toimiva suolakaivos,
   sydämenmuotoiset suolapalat ja koko rautakauden vaiheen nimikkokylä;
   kytkeytyy suolatiehen kohteiden 4 ja 14 kanssa.
3. **Kohde 7 (Semmeringin rautatie)** — rata oli isoisän aikaan jo
   liikenteessä ja on yhä; 20 000 työntekijää, 14 tunnelia, uusiksi
   suunnitellut veturit. Vahva insinöörikoukku.

## Mitä EI löytynyt tai jäi epävarmaksi

- Semmeringin radan Unesco-status (1998) ei ole siinä artikkelin
  osassa, jonka luin — älä väitä sitä ilman uutta tarkistusta.
- Landeszeughausin "maailman suurin" -väite (kohde 3).
- Marcheggin "Euroopan suurin puupesäyhdyskunta" -väite (V1).
- Bregenzin faktapohja (V2).
