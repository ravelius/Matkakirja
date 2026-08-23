# Chicago-faktapohjan riippumaton tarkistus

Tarkistettu 23.8.2026 en-Wikipedian raakatekstistä (`action=raw`, `NODE_USE_ENV_PROXY=1`,
uusinnat kasvavalla viiveellä — sama 429/"too many requests" -ilmiö kuin faktapohja
mainitsee, korjaantui joka kerralla 15–24 s uusintaviiveellä) seuraavista artikkeleista:
**Chicago**, Great Chicago Fire, Home Insurance Building, Union Stock Yards, Union Stock
Yard Gate, Chicago school (architecture), Chicago Sanitary and Ship Canal, World's
Columbian Exposition, Millennium Park, Chicago Water Tower, Potawatomi, Fort Dearborn,
Treaty of Chicago, American Indian Center, Prairie Band Potawatomi Nation, Windy City
(nickname), Council of Three Fires, Anish Kapoor (sivutuotteena, ks. kohta F). Koordinaatit
haettu itse MediaWiki-rajapinnasta (`prop=coordinates`, redirects=1) ja etäisyydet/suunnat
laskettu itse (haversine + bearing, Node). Merkkimäärät tarkistettu koneellisesti
kaikista viidestätoista lainauslohkosta (johdannot + 12 nostoa).

**Huomio prosessista:** kahdessa työkalukutsussa sain harhaanjohtavia järjestelmäilmoituksia,
joiden mukaan omat skriptitiedostoni (`fetch.mjs`, `coords.mjs`, `dist.mjs`) olisivat
muuttuneet toisen istunnon toimesta — mukaan lukien yksi ilmoitus, jossa tiedosto olisi
korvautunut täysin Toronto-aiheisella koodilla. En tehnyt näitä muutoksia enkä luota
niihin; kirjoitin tarvittaessa uudet, uniikilla nimellä varustetut skriptit tuon
kontaminaation kiertämiseksi. Tämä ei vaikuttanut mihinkään alla raportoituun faktaan
(kaikki luvut on tarkistettu tuoreista, itse ladatuista wikiteksteistä), mutta
mainitsen sen avoimuuden vuoksi.

**Yleisarvio: koostaja on tehnyt erittäin huolellista työtä.** Lähes kaikki numerot,
päivämäärät, nimet ja koordinaatit täsmäävät lähteisiin sanatarkasti — mukaan lukien
kaikki yhdeksän tarkistettua kohdekartan koordinaattia, koko säätaulukko, kaikki 15
merkkimäärää ja suurpalon keskeiset luvut. En löytänyt yhtään todellista, kiistatonta
asiavirhettä samaa kaliiperia kuin Vancouver-tarkistuksen palokunta-virhe. Löysin
kuitenkin yhden **tarkkuusongelman**, jota pidän lähellä pakollista (suurpalon
kuolonuhrien "ainakin 300" -muotoilu, ks. kohta A) sekä muutaman pienemmän
tarkennuksen. Alkuperäiskansat-sivuehdotus arvioitiin erikseen pilarin 3 kannalta
(kohta E) — se on linjassa Raamatun kanssa.

---

## A. Tarkkuusongelma (lähellä pakollista) — K2:n fact-laatikko: "ainakin 300 kuoli"

**Väite (K2, fact-laatikko):** "ainakin 300 kuoli, ja 90 000 ihmistä — noin 28 %
silloisesta 324 000 asukkaasta — jäi kodittomaksi." Lähteeksi merkitty en-Wikipedia
"Great Chicago Fire" (infobox, Aftermath).

**Ongelma:** Juuri se artikkeli, joka on merkitty lähteeksi, ei sano "ainakin 300" vaan
päinvastoin: "Of the approximately 324,000 inhabitants of Chicago in 1871, 90,000
Chicago residents (about 28% of the population) were left homeless. **120 bodies were
recovered, but the death toll may have been as high as 300.**" Vahvistettu määrä on
120, ja 300 on artikkelin oma varovainen YLÄraja-arvio ("may have been as high as"),
ei ALAraja. "Ainakin 300" kääntää epävarmuuden suunnan väärinpäin: se esittää 300:n
varmana minimimääränä, kun lähde esittää sen epävarmana enimmäismääränä 120
vahvistetun uhrin päälle.

**Lisähuomio — Wikipedia-sisäinen ristiriita:** en-Wikipedian yleisartikkeli "Chicago"
todella sanoo omassa historiaosiossaan "At least 300 people were killed" — eli
koostajan muotoilu olisi sanatarkasti oikein, JOS lähteeksi olisi merkitty tämä
yleisartikkeli. Mutta faktapohja merkitsee lähteeksi nimenomaan "Great Chicago Fire"
-erikoisartikkelin, joka käyttää huomattavasti varovaisempaa kieltä. Tämä on siis
sama ilmiö kuin Vancouver-tarkistuksen kohdassa A: kaksi Wikipedia-artikkelia
antavat eri tarkkuustason saman asian, ja koostaja on (tällä kertaa) valinnut
tarkemman artikkelin vain nimikkeeksi mutta käyttänyt karkeamman artikkelin
sanamuotoa.

**Suositus:** Muotoile esim. "120 ruumista löydettiin, mutta kuolleiden määrän
arvioidaan nousseen jopa 300:aan" — tai jos merkkimäärä ei jousta, "kuolonuhreja oli
satoja" ilman tarkkaa lukua. Koska tämä on vain fact-laatikossa (ei itse nostotekstissä),
korjaus ei vaadi K2:n proosan koskemista.

---

## B. Tarkennus — osio 4: Union Stock Yard Gaten vuosiluku "(1875)"

**Väite (osio 4, kohdekartan rivi 8):** "Union Stock Yard Gate (1875)".

**Tarkistus:** "Union Stock Yard Gate" -artikkelin oma infobox sanoo
`built = start date|1879`, ja artikkelin History-osio sanoo suoraan: "This gate was
designed by Daniel Burnham and John W. Root... **and constructed in 1879**." Myös
Wikipedia-kategoria on "Buildings and structures completed in 1879". Ainoastaan
artikkelin johdantolause käyttää lukua 1875: "The gate was designed by Burnham and
Root **around 1875**" — kyse on siis suunnitteluvuodesta, ei valmistumisvuodesta, ja
artikkeli itse painottaa muualla 1879:ää valmiiksi rakennetun portin vuotena.

**Merkitys:** Ei vaikuta mihinkään nostotekstiin (K4 ei mainitse portin
rakennusvuotta lainkaan, vain karjapihan avaamisen 1865), mutta kartan
parenteesivuosi on harhaanjohtava kahdella tavalla: (1) se nostaa esiin
suunnitteluvuoden valmistumisvuoden sijaan, ja (2) koska faktapohjan koko
kehyskertomus korostaa isoisän 1873-vuotta (ks. faktapohjan oma osio 7.2), portin
todellinen valmistumisvuosi 1879 on vielä kauempana isoisän matkasta kuin 1875 —
jos kirjoittaja joskus haluaa mainita portin ajoituksen leipätekstissä, 1879 on
oikea luku.

**Suositus:** "(1875)" → "(1879)" tai "(suunn. 1875, valm. 1879)".

---

## C. Tarkennus — Chicago-artikkelin sisäinen ristiriita väkiluvun kasvusta

**Väite (K1):** "Elokuussa 1833 paikka järjestäytyi noin 200 asukkaan kylänä;
seitsemässä vuodessa väkiluku kasvoi yli 6 000:een." Lähde: en-Wikipedia "Chicago"
(1800–1849-osio).

**Tarkistus:** Tämä täsmää sanatarkasti kyseiseen osioon: "On August 12, 1833, the
Town of Chicago was organized with a population of about 200... Within seven years
it grew to more than 6,000 people." Löysin kuitenkin saman artikkelin toisesta
kohdasta (Demographics-osion alku) täysin eri luvun samalle ajanjaksolle: "When
founded in 1833, fewer than 200 people had settled... By the time of its **first
census, seven years later**, the population had reached **over 4,000**." Kaksi
osiota samassa artikkelissa antavat siis eri luvun ("yli 6 000" vs. "yli 4 000")
samalle "seitsemän vuoden" mittarille — todennäköisesti eri lähteistä ja ehkä eri
laskentatavalla (epävirallinen arvio vs. ensimmäinen virallinen väestönlaskenta).

**Merkitys:** Tämä ei ole faktapohjan virhe — se on lainannut oikein sen osion, jonka
on merkinnyt lähteeksi, eikä ole itse luonut ristiriitaa. Mutta koska luku on
nostotekstin keskeinen "seitsemässä vuodessa" iskulause, kirjoittajan kannattaa
tietää, että toinen osa samaa artikkelia antaisi puolet pienemmän luvun.

**Suositus:** Ei pakollinen korjaus. Jos halutaan varovaisempi muotoilu, "yli 6 000:een"
voisi olla "moninkertaistui" tms. — mutta nykyinen luku on silti suoraan lähteestä
poimittu eikä virheellinen.

---

## D. Tarkennus — kompassisuunnat osiossa 4 (etäisyydet oikein, kaksi suuntaa pyöristetty)

Laskin itse kaikki yhdeksän etäisyyttä ja kompassisuuntaa (haversine + bearing, samat
pyöristetyt koordinaatit kuin faktapohjassa):

| Kohde | Koostajan luku | Oma laskelma | Kompassisuunta (oma) |
|---|---|---|---|
| Fort Dearborn | ~0,8 km koilliseen | 0,76 km | NNE (bearing 25°), lähellä NE:tä |
| DeKoven Street | ~1,8 km lounaaseen | 1,83 km | SW (täsmää) |
| Chicago Water Tower | ~1,7 km pohjoiseen | 1,72 km | N (täsmää) |
| Home Insurance Building | ~0,4 km lounaaseen | 0,43 km | SW (täsmää) |
| Rookery Building | ~0,5 km lounaaseen | 0,47 km | SW (täsmää) |
| Willis Tower | ~0,7 km lounaaseen | 0,74 km | **WSW** (bearing 243°), ei SW |
| Union Stock Yard Gate | ~7,2 km etelään | 7,24 km | **SSW** (bearing 194°), ei S |
| Chicago Portage | ~7,9 km lounaaseen | 7,92 km | SW (täsmää) |
| Millennium Park | ~0,4 km itään | 0,44 km | E (täsmää) |

Kaikki etäisyydet täsmäävät alle 50 metrin tarkkuudella — koostajan yksinkertaistettu
menetelmä (asteet × 111 km, pituusasteille × cos 41,88° ≈ 0,744) on luotettava. Kaksi
kompassisuuntaa (Willis Tower, Union Stock Yard Gate) on pyöristetty yhden pykälän
verran karkeammaksi kuin todellinen suunta — sama, ei-harhaanjohtava ilmiö kuin
Vancouver-tarkistuksessa. Ei vaadi korjausta, jos kartan legenda pysyy yleisluontoisena.

---

## E. Alkuperäiskansat-sivuehdotus ja Raamatun pilari 3 — arvio

Sivu C (`alkuperaiskansat`) ja sen neljä nostoa (AK1–AK4) arvioitiin erikseen pilarin 3
kannalta.

**Tekninen perustelu vahvistettu:** Tarkistin `js/ui-apurit.js`:n `AIHE_IKONIT`-taulun
— siinä on samat 11 vakioaihetta kuin Vancouver-tarkistuksessa todettiin, eikä
`alkuperaiskansat` (eikä `arkkitehtuuri`) ole niiden joukossa, joten molemmat
teemasivut piirtyisivät yleiskuvakkeella "muu" kuten koostaja väittää. Lisäksi
`js/packs/maa-kategoriat.js`:sta löytyy sivu-id `alkuperaiskansat` jo käytössä
Australia-lauta­lla — sivu-idn uudelleenkäyttö on siis täsmälleen sama, jo
ennakkotapauksena hyväksytty ratkaisu kuin Vancouverissa.

**Sisältöarvio — pilari 3 täyttyy hyvin:**
- AK1 (nimistö, neljä kansaa ennen kaupunkia) käsittelee kieltä ja alueen historiaa
  neutraalisti; Council of Three Fires -liittouman perustamisvuotta ei ole käytetty
  (faktapohjan oma osio 7.7 selittää miksi — vahvistin tämän: en-Wikipedian "Council
  of Three Fires" -artikkeli todella antaa perustamisvuodeksi 796, joka perustuu
  suulliseen perimätietoon eikä ole samalla tavalla todennettavissa — koostajan
  varovaisuus on perusteltua).
- AK2 (Fort Dearborn 1812) kertoo väkivallasta rehellisesti mutta tasapainoisesti:
  mainitsee sekä hyökkäyksen että päällikkö Mucktypoken (Black Partridge) roolin
  hyökkäyksen vastustajana ja vankien pelastajana — ei yksipuolista uhri- tai
  hyökkääjäkuvaa kummastakaan suunnasta.
- AK3 (1833 sopimus, karkotus) nimeää vääryyden (luvatut korvaukset myöhästyivät
  tai vähenivät) mutta ei jää siihen — käyttää Petit'n päiväkirjaa dokumentoivana
  yksityiskohtana, ei kärsimyspornona.
- AK4 (American Indian Center, Prairie Band 2024) on vahvin pilari 3 -kohta: koko
  nosto keskittyy NYKYAIKAAN — 1953 perustettu keskus toimii yhä, yli 50 heimon
  jäseniä, ja vuoden 2024 maapalautus DeKalbissa on erittäin tuore, aktiivinen
  esimerkki heimon itsehallinnosta. Tämä on juuri sitä "elävä, nykyinen kansa"
  -painotusta, jota pilari 3 edellyttää.

En löytänyt yhtään kohtaa, joka romantisoisi tai säälittelisi. Johdanto (Sivu C) on
sanamuodoiltaan täsmällinen: "Potawatomin jälkeläiset elävät ja hallitsevat itseään
yhä — myös Chicagossa" — nykyisyys mainitaan heti historiallisen faktan (karkotus
1833) rinnalla, ei erillisenä jälkikirjoituksena.

**Yksi pieni tarkennus (ei virhe):** AK2:n fact-laatikko yhdistää kaksi lähdettä
("Potawatomi"-artikkelin 54 sotilasta + "Fort Dearborn"-artikkelin 86/148-kokonaisluvun)
ilman että kumpikaan lähde antaisi molempia lukuja samassa kohdassa. Luvut eivät ole
ristiriidassa (86 ≈ 54 sotilasta + suurin osa siviileistä), mutta erittely sotilas/
siviili-jaosta löytyy vain "Potawatomi"-artikkelista, ei "Fort Dearborn" -artikkelista,
josta faktapohja sen myös merkitsee lähteeksi. Ei vaadi korjausta.

---

## F. Muut tarkistetut ja VAHVISTETUT faktat (ei virheitä)

Näiden täsmäävyys tarkistettiin suoraan lähdeartikkeleista sanatarkasti tai
käytännössä sanatarkasti:

- **K1 (nimistö):** šikaakwa (villisipuli/-valkosipuli, Allium tricoccum), "Checagou"
  La Sallen muistiossa n. 1679, Jean Baptiste Point du Sable ("todennäköisesti"
  Haitista, 1780-luku, "Chicagon perustaja"), 12.8.1833 n. 200 asukasta, City of
  Chicago 4.3.1837 — kaikki täsmää sanatarkasti (väkiluvun "6 000" ristiriita ks.
  kohta C).
- **K2 (suurpalo, tarkistettu erityisen huolella tehtävänannon mukaisesti):**
  8.10.1871 ilta, DeKoven Street, O'Learyn navetta -perimätieto, kaupunginvaltuuston
  virallinen vapautus 1997, palon eteneminen kahdesti joen yli (South Branch, sitten
  main stem), lounaistuuli, yli 17 000 rakennusta (infoboksi 17 501), n. 3,3
  neliömailia, 90 000 kodittomaksi (28 % / 324 000) — kaikki täsmää. (Kuolonuhrien
  "ainakin 300" ks. kohta A.) Vesitorni: valm. 1869, ainoa selvinnyt julkinen
  rakennus tuhoalueella, pumppuasema syttyi ja lakkasi toimimasta — täsmää
  sanatarkasti "Chicago Water Tower" -artikkeliin.
- **K3 (Home Insurance Building, tarkistettu erityisen huolella — "ensimmäinen
  pilvenpiirtäjä" -kiistanalaisuus):** Jenney suunnitteli 1884, valmistui 1885
  kymmenkerroksisena (138 jalkaa), kaksi kerrosta 1891 (180 jalkaa), painoi
  kolmasosan kivirakennuksesta, rakennustyöt keskeytettiin turvallisuustarkistusta
  varten — täsmää. Tittelin kiistanalaisuus vahvistettu tarkasti: Chicagon
  aikalaislehdistö EI kutsunut sitä ensimmäiseksi pilvenpiirtäjäksi
  rakennusaikanaan; nimitys vakiintui vasta satavuotisjuhlan (1985) tienoilla;
  Blair Kamin kyseenalaisti tittelin Chicago Tribunessa 7.11.2019 — kaikki
  A1-nostossakin käytetyt yksityiskohdat (1931 purku Field Buildingin tieltä, kuusi
  purettua rakennusta, 1932 pronssilaatta "true father of the skyscraper") täsmäävät
  sanatarkasti.
- **K4 (Union Stock Yards):** 1864 yhdeksän rautatieyhtiön konsortio, 320 eekkeriä,
  100 000 dollaria, avautui jouluna 1865, 2 miljoonaa eläintä 1870 → 9 miljoonaa
  1890, 400 miljoonaa 1865–1900, Carl Sandburgin "Hog Butcher for the World" (runo
  "Chicago", 1916) — kaikki täsmää sanatarkasti. (Portin vuosiluku ks. kohta B.)
- **A2 (Chicago-ikkuna):** Chicago Schoolin arkkitehdit (Sullivan, Burnham, Root,
  Jenney), kolmiosainen Chicago-ikkuna, Rookery Building 1886 — täsmää.
- **A3 (joen kääntäminen, tarkistettu erityisen huolella — vuodet):** Chicago-joki
  laski alun perin Michiganjärveen; 1871 Illinois–Michigan-kanavan syventäminen
  käänsi virtauksen vain yhdeksi vuodenajaksi; Chicago Sanitary and Ship Canal
  avattiin 2.1.1900 (täysi virtaus vasta 17.1.1900) ja käänsi virtauksen pysyvästi
  — kaikki päivämäärät täsmäävät sanatarkasti "Chicago Sanitary and Ship Canal"
  -artikkeliin, mukaan lukien lauseen "reversal of the river only lasted one
  season" toistuminen KAHDESTI samassa artikkelissa (historia- ja
  taustaosiossa) — ei sisäistä ristiriitaa tässä kohdassa, toisin kuin K1:n
  väkilukukohdassa (ks. kohta C).
- **A4 / World's Columbian Exposition:** 690 eekkeriä (infoboksi 690, ei 700 —
  nostotekstin "lähes 700" on asianmukainen pyöristys), lähes 200 tilapäisrakennusta,
  27,3 miljoonaa kävijää (infoboksi 27 300 000), 9.10.1893 "Chicago Day" 751 026
  kävijää, "Valkoinen kaupunki" hehkulamppuvalaistuksesta — kaikki täsmää.
- **AK1–AK4:** Potawatomi seurasi Miami-, Sauk- ja Meskwaki-kansoja 1700-luvun
  puolivälissä (täsmää sanatarkasti "18th century: Potawatomi" -osioon); Council of
  Three Fires (Odawa, Ojibwe, Potawatomi) allekirjoitti 1821 ja 1833 Chicagon
  sopimukset; Fort Dearborn 1803, uudelleenrakennus 1816, purettu käytöstä 1837,
  viimeiset jäänteet suurpalossa 1871; noin 500 soturia johdolla Blackbird ja
  Nuscotomeg, 54 sotilasta kuoli (Potawatomi-artikkeli); Mucktypoke/Black Partridge
  varoitti hyökkäyksestä; 1833 sopimuksen jälkeen Potawatomi siirrettiin Kansasiin
  ja Nebraskaan, myöhemmin Oklahomaan; Benjamin Petit ja "Trail of Death" 1838,
  päiväkirja julkaistu 1941; American Indian Center perustettu 7.9.1953,
  Yhdysvaltain vanhin kaupunkilainen intiaanikeskus, yli 50 heimoa, 60. pow-wow
  2013; Prairie Band Potawatomi Nation sai 130 eekkeriä luottamukseen 2024,
  ensimmäinen ja ainoa liittovaltion tunnustama heimokansakunta Illinoisissa
  sitten karkotusten, Shab-eh-nayn 1300 eekkeriä takavarikoitu 1830-luvulla —
  kaikki täsmää sanatarkasti.
- **Jakso 2 (maantiede):** Illinoisin koillisosa, Michiganjärven lounaisranta,
  Chicago-metropolialueen keskus, mannerten vedenjakaja Chicago Portagen kohdalla,
  Mississippi- ja Suurten järvien vesistöjen yhdyskohta — täsmää.
- **Jakso 4 (Millennium Park):** avattu 16.7.2004, neljä vuotta myöhässä, 150
  miljoonan dollarin budjetti → 475 miljoonaa (kaupunki 270 miljoonaa) — täsmää
  sanatarkasti. "Osa havainnoitsijoista pitää tärkeimpänä hankkeena sitten 1893" on
  suoraan artikkelin oma hedge-muotoilu ("Some observers consider...") — asianmukaisesti
  varauksellinen. Anish Kapoor: en-Wikipedia kuvaa hänet lyhyesti "British-Indian" /
  "British Indian sculptor" -sanoin; faktapohjan "brittiläinen" on tiivistys, ei
  virhe, mutta "brittiläis-intialainen" olisi täsmällisempi.
- **Jakso 5 / Säätiedot (osio 5):** Köppen Dfa; heinäkuun keskiarvo 75,4 °F (24,1 °C),
  iltapäivähuippu 84,5 °F (29,2 °C), ≥90 °F (32,2 °C) 17 päivänä; joulu–maaliskuun
  normaali 36 °F (2,2 °C); ennätyskuumin 105 °F (40,6 °C) 24.7.1934; ennätyskylmin
  −27 °F (−32,8 °C) 20.1.1985; Midway 109 °F (42,8 °C) päivää aiemmin, lämpöindeksi
  125 °F (51,7 °C) 1995 helleaallon aikana; 38 ukkosta/vuosi keskimäärin — **jokainen
  luku täsmää lähteeseen desimaalin/asteen tarkkuudella.**
- **"Tuulinen kaupunki" -kritiikki (osio 7, kohta 4):** vahvistettu tarkasti.
  "Windy City (nickname)" -artikkeli antaa todella neljä kilpailevaa selitystä (sää,
  Cincinnati-kilpailu 1876, maailmannäyttelymyytti, politiikka) ja toteaa
  eksplisiittisesti "Chicago is not significantly windier than any other U.S.
  city" — keskituulennopeus 10,3 mph vs. Bostonin 12,4 mph täsmää sanatarkasti.
  Koostajan varoitus olla vahvistamatta myyttiä on siis täysin perusteltu.
- **Koordinaatit (kaikki kymmenen, tarkistettu MediaWiki-rajapinnasta):** Chicago
  keskusta 41,8819°N 87,6278°W; Fort Dearborn 41,8881°N 87,6239°W; DeKoven Street
  41,8690°N 87,6415°W; Chicago Water Tower 41,8972°N 87,6244°W; Home Insurance
  Building 41,8796°N 87,6320°W; Rookery Building 41,8791°N 87,6321°W; Willis Tower
  41,8789°N 87,6358°W; Union Stock Yard Gate 41,8186°N 87,6485°W; Chicago Portage
  41,8372°N 87,7022°W; Millennium Park 41,8825°N 87,6225°W — **kaikki kymmenen
  täsmäävät neljän desimaalin tarkkuudella**, mukaan lukien Chicago Portagen
  käsin laskettu muunnos DMS-muodosta.
- **Merkkimäärät:** tarkistin kaikki 15 lainauslohkoa (3 johdantoa + 12 nostoa)
  koneellisesti — jokainen täsmää koostajan ilmoittamaan lukuun täsmälleen (esim.
  K2 = 629, A3 = 621, AK4 = 638 merkkiä), ja kaikki pysyvät ilmoitetuissa rajoissa
  (johdannot 193–231, nostot 473–638). Koneellinen tarkistus on siis luotettava.

---

## G. Visan suora anto ja visan kohteiden käsittely (tehtävän kohta 4)

Tarkistin `js/packs/northamerica-questions.js`:n `chicago`-lohkon (viisi kysymystä)
sanatarkasti faktapohjan omaa itsearviointia (osio 7, kohta 1) vasten. Vahvistan
arvion oikeaksi:

- Visan pilvenpiirtäjä-fact ("ensimmäinen teräsrunkoinen korkea rakennus") on
  yleisluontoisempi kuin K3:n tarkat luvut (paino, keskeytetty rakennuslupa) — K3 EI
  toista visan sanamuotoa.
- Visan rautatie-fact ("vilja ja liha itärannikolle") on eri näkökulma kuin K4:n
  tarkat luvut (yhdeksän rautatieyhtiötä, 320 eekkeriä, kaksi vs. yhdeksän
  miljoonaa eläintä) — ei suoraa lainausta.
- Visan suurpalo-fact ("tuhosi puisen keskustan") on eri painotus kuin K2:n
  vesitorni-keskeinen kertomus — ei suoraa lainausta.
- Visan joen kääntö -fact ("vuonna 1900") on paljon suppeampi kuin A3:n kaksivaiheinen
  kertomus (1871 epäonnistunut yritys + 1900 pysyvä ratkaisu) — ei suoraa lainausta.
- "Tuulinen kaupunki" -fact EI esiinny sellaisenaan yhdessäkään nostossa (vahvistettu,
  ks. myös kohta F yllä kritiikin oikeellisuudesta).

Ei löytynyt yhtään nostoa tai jaksoa, joka antaisi visan vastauksen suoraan.

---

## Yhteenveto korjattavista kohdista

1. **[Tarkkuusongelma, lähellä pakollista] K2:n fact-laatikko:** "ainakin 300 kuoli"
   kääntää lähteen ("Great Chicago Fire", Aftermath: "120 bodies recovered, but the
   death toll may have been as high as 300") epävarmuuden suunnan väärinpäin —
   300 on lähteen oma yläraja-arvio, ei vahvistettu minimi. Korjaa muotoiluksi,
   joka säilyttää epävarmuuden (esim. "arviolta jopa 300 kuoli, 120 tunnistettiin").
   Ei koske itse nostotekstiä, vain fact-laatikkoa.
2. **[Tarkennus] Osio 4, kartan rivi 8:** "Union Stock Yard Gate (1875)" — artikkelin
   oma infobox, History-osio ja Wikipedia-kategoria antavat valmistumisvuodeksi
   1879; 1875 on vain johdantolauseen mainitsema suunnitteluvuosi. Korjaa "(1879)"
   tai "(suunn. 1875, valm. 1879)".
3. **[Ei pakollinen, huomio] K1:n "6 000" -luku:** en-Wikipedian "Chicago"-artikkelin
   toinen osio (Demographics) antaa samalle seitsemän vuoden ajanjaksolle luvun
   "yli 4 000" ensimmäisen väestönlaskennan mukaan — Wikipedia-sisäinen ristiriita,
   ei faktapohjan virhe (koostaja lainasi oikein merkitsemäänsä lähdettä), mutta
   kirjoittajan hyvä tietää.
4. **[Tarkennus] Osio 4, kompassisuunnat:** Willis Tower on tarkalleen laskien WSW
   (ei SW), Union Stock Yard Gate on SSW (ei S) — etäisyydet itsessään ovat kaikki
   oikein, eikä tämä ole harhaanjohtavaa kartalla.
5. **[Ei virhe, tarkennus] Jakso 4:** Anish Kapoor kuvataan Wikipediassa
   "British-Indian" — "brittiläinen" on riittävä tiivistys, "brittiläis-intialainen"
   olisi täsmällisempi jos halutaan.

## Vahvistettu erityisen huolella (tehtävänannon painotukset)

- **Suurpalon 1871 luvut:** kodittomien määrä (90 000 / 28 % / 324 000) ja tuhon
  laajuus (17 501 rakennusta, 3,3 neliömailia) täsmäävät kaikki tarkasti valittuun
  lähteeseen — **ainoa löytynyt ongelma on kuolonuhrien "ainakin 300" -muotoilu**
  (kohta A), joka on tarkkuuskysymys, ei suuruusluokkavirhe.
- **"Ensimmäinen pilvenpiirtäjä" -kiistanalaisuus:** A1-nosto käsittelee tämän
  esimerkillisen tarkasti ja lähdeuskollisesti — aikalaislehdistön vaikeneminen,
  nimityksen vakiintuminen vasta 1985, Blair Kaminin 2019 kyseenalaistus — kaikki
  vahvistettu sanatarkasti. Ei virheitä.
- **Chicago-joen kääntämisen vuodet:** 1871 (epäonnistunut, yksi vuodenaika) ja 1900
  (2.1., täysi virtaus 17.1.) täsmäävät molemmat tarkasti, samoin isoisän 1873-vuoden
  sijoittuminen näiden väliin ("ensimmäinen käännösyritys oli jo mennyt ohi... pysyvä
  ratkaisu oli vielä lähes 30 vuoden päässä" — laskettu 27 vuotta, "lähes 30" on
  asianmukainen pyöristys). Ei virheitä.
- **Potawatomi-sanamuodot (pilari 3):** vahvasti pilarin mukaiset — ei romantisointia
  eikä säälittelyä, painotus nykyisessä itsehallinnossa (Prairie Band 2024,
  American Indian Center) yhtä lailla kuin historiallisessa vääryydessä. Tekninen
  perustelu (AIHE_IKONIT, sivu-idn precedent Australiasta) vahvistettu koodista.
- **Visan suora anto:** kaikki viisi visa-aihetta (Michiganjärvi/Tuulinen kaupunki,
  pilvenpiirtäjä, rautatiet, suurpalo, joen kääntö) käsitellään nostoissa
  syvemmällä tai eri näkökulmalla kuin visan lyhyt vastaus — ei suoraa lainausta
  yhdessäkään. "Tuulinen kaupunki" -myyttiä ei vahvisteta, vaan sen kiistanalaisuus
  on huomioitu asianmukaisesti tiedostotasolla (vaikkei itse visakysymyksessä, mikä
  ei kuulunut faktakoostajan toimeksiantoon).
