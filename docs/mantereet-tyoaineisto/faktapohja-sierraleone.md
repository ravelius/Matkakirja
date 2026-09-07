# Sierra Leone -maalehti (ISO-3: SLE) — lyhyt faktapohja

*Koonnut Opus-lehtiagentti 6.9.2026. Kaikki faktat haettu samana päivänä
en-Wikipedian raakatekstistä (`api.php?action=query&prop=extracts&
explaintext=1`, `NODE_USE_ENV_PROXY=1`, User-Agent
`Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`). Lyhyt
faktapohja: vain ne luvut, päiväykset ja nimet, jotka päätyivät
`js/packs/maa-kategoriat.js`:n SLE-lohkoon, sekä ristiriidat. Rakenteen
sitova lähde docs/moduulit/maalehti.md.*

Aiheet (5 × 4 nostoa): **Historia, Kuvataide, Musiikki, Ruoka,
Kirjallisuus.** Minitehtävä on Kirjallisuus-sivulla.

**Rajaus.** Sierra Leonella ei ole omaa kaupunkilehteä
(`KULTTUURI_KATEGORIAT`-lohkoa ei ole), mutta laudan kaupungilla
`sierraleone` on litteät nostot `js/packs/africa-kulttuuri.js`:ssä:
**Freetownin puuvillapuu** (kuvineen, tiedosto
`Cotton Tree (Sierra Leone).jpg`), **krio-kieli** arkisena
yleiskielenä ja **riisi perusruokana**. Näitä kolmea maalehti EI
toista: puuvillapuusta ei ole omaa nostoa lainkaan, krio esiintyy vain
*kirjakielenä* (Deckerin Shakespeare-käännökset, raamatunkäännökset) ja
riisi vain *lajina ja viljelytaitona* (Oryza glaberrima, riisiranta).
Sama koskee kaupungin kysymyksiä (`africa-questions.js`: pääkaupunki,
nimen merkitys, timantit, riisi, krio) ja isoisän valokuvaparia
(`valokuvat-paikalliset.js`: Cotton Tree ennen ja nyt) — puuvillapuun
kuvaa ei käytetä toista kertaa.

Karttanostot rajaavat loput: `js/packs/maastokohteet-sle.js` kattaa
Bintumanin ja Loma-vuoret, Atlantin, Rokel-joen ja Freetownin sataman,
Tiwain saaren, Outamba-Kilimin, Golan sademetsän, Bon, Keneman,
Bumbunan padon, Bonthen ja Kabalan; `js/packs/elaintakyt.js`
länsiafrikansimpanssin; `js/packs/skandaalit.js` Lombokon orjalinnakkeen
(1849) ja Koidun kaivossopimuksen (1995). **Siksi maalehdessä ei ole
luonto-aihetta lainkaan** (kartta kattaa metsät, joet, vuoret ja
lajiston), eikä timanteista, orjalinnakkeista tai kaivoksista ole omaa
nostoa. Bunce Islandin linnake mainitaan yhdessä lauseessa
riisinostossa, koska riisirannan tarina ei ole ymmärrettävissä ilman
sitä — linnakkeesta itsestään ei kerrota, se on eri kortin aihe.

**Herkät aiheet.** Sisällissota (1991–2002) mainitaan kahdessa
kohdassa vain tapahtumana, joka keskeytti lyhtykilpailut ja ajoi
muusikon maasta; osapuolia, taisteluita tai nykypolitiikkaa ei kuvata
(M3:n Myanmar-linja). Sande-seuran naamiotaide kerrotaan taide-esineenä
ja tanssijan roolina; seuran initiaatioon liittyvää tyttöjen
ympärileikkausta ei käsitellä maalehdessä — se ei ole matkaoppaan
aihe, ja sen käsittely vaatisi terveysvalistuksen sävyn, jota lehdessä
ei ole. Vapautettujen afrikkalaisten "oppipoikajärjestelmä" kerrotaan
sellaisena kuin lähde sen kertoo, ilman kaunistelua.

**Maaintro.** `js/packs/africa-artikkelit.js` avain `Sierra Leone`:
intro pidennettiin kuuteen virkkeeseen (nimen alkuperä, Freetown 1792,
vapautetut afrikkalaiset ja krio, temnet ja mendet, Ylä-Guinean
sademetsä, protektoraatti 1896, itsenäisyys **27.4.1961 Milton Margain**
johdolla ja tasavalta **1971**, riisi ja timantit, Fourah Bay College).
Artikkeli-kenttään ei koskettu. Kansojen lukumäärässä on lähderistiriita:
"Sierra Leone" sanoo **noin 18 kansaa**, "Sierra Leonean cuisine" ja
"Music of Sierra Leone" **16**; introon ei siksi kirjoitettu lukua
lainkaan, vain suurimmat kansat (temnet **35 %**, mendet **31 %**,
"Music of Sierra Leone", osio "Traditional music").

## 1. Historia

- **Vapauden provinssi ja Freetownin perustaminen** (en-Wikipedia
  "Freetown", osiot "Province of Freedom (1787–1789)" ja "Freetown
  settlement and the Colony of Sierra Leone (1792–1808)";
  "Nova Scotian Settlers", johdanto ja osiot "Life in Nova Scotia",
  "Settler Town"): **1787** Lontoosta lähetettiin **400** vapautettua
  mustaa asukasta (Committee for the Relief of the Black Poor,
  Granville Sharp, Jonas Hanway); maa ostettiin **koya-temnejen
  alipäälliköltä kuningas Tomilta ja sijaishallitsija Naimbanalta**;
  **kuningas Jimmy poltti Granville Townin 1789**. **Thomas Peters**
  vei Nova Scotian valitukset Lontooseen 1791, **luutnantti John
  Clarkson** värväsi asukkaat, **15 laivaa lähti Halifaxista
  15.1.1792** ja saapui **26.2.–9.3.1792**; matkalla kuoli **64–65**
  ihmistä. Freetown-artikkeli sanoo maihin nousseita **1 196**,
  Nova Scotian Settlers -artikkeli **1 192** ja "noin 1 100" — lehteen
  on kirjoitettu "vajaat tuhatkaksisataa". Miehet raivasivat maata,
  kunnes tulivat **suureen puuvillapuuhun**; saarnaajat lauloivat
  **"Awake and Sing of Moses and the Lamb"**, ja **David George**
  piti Afrikan ensimmäisen kirjatun baptistijumalanpalveluksen.
  Kaupunki mitattiin **pohjoisamerikkalaiseen ruutukaavaan**, leveimpänä
  Water Street. **Harry Washington** (n. 1740–1800), George
  Washingtonin orjuudesta paennut, on artikkelin nimetyissä
  asukkaissa. Talot olivat **kivijalka + puurunko**, ja niistä tuli
  kriolaisten **bod ose** -talojen malli.
- **Jamaikan maroonit** (en-Wikipedia "Sierra Leone", osio "Jamaican
  Maroons and Liberated Africans"; "Freetown", osio "Freetown
  settlement…"; "Music of Sierra Leone", osio "Gumbe"): yhtiö kieltäytyi
  antamasta maata omistukseen, ja **1799 osa asukkaista nousi
  kapinaan**. Kruunu toi **yli 500 jamaikalaista maroonia**
  Cudjoe's Townista (Trelawny Town) **Nova Scotian kautta 1800**,
  johtajana **eversti Montague James**; maroonit auttoivat
  kukistamaan kapinan ja saivat **parhaat talot ja maat** sekä oman
  kaupunginosansa **Maroon Townin**. **1820-luvulla** he syrjäyttivät
  nova-scotialaiset siirtokunnan tärkeimpinä kauppiaina. Mukana tuli
  **gumbe**, **neliskulmainen jalallinen rumpu**, jolla Jamaikan
  marooniyhteisöt olivat välittäneet viestejä; rumpu elää yhä
  Freetownissa ja antoi nimen musiikkityylille, joka vaikutti
  **maringaan, asikoon ja milo jazziin**.
- **Vapautetut afrikkalaiset** (en-Wikipedia "Sierra Leone", osio
  "Jamaican Maroons and Liberated Africans"; "Freetown", osio "Freetown
  as a Crown Colony (1808–1961)"): **1.1.1808** kuvernööri **Thomas
  Ludlam** luovutti yhtiön oikeuskirjan, ja siirtokunnasta tuli
  **kruununsiirtomaa**; yhtiö oli hallinnut sitä 16 vuotta. Freetown
  oli **Brittiläisen Länsi-Afrikan pääkaupunki 1808–1874** ja
  laivaston orjakauppaa vastaan partioivan osaston tukikohta; kaupungissa
  toimi **kolme sekakomissiotuomioistuinta**. Laittomilta orjalaivoilta
  vapautetut tuotiin Freetowniin ja **myytiin 20 dollarin hinnalla
  oppipojiksi** asukkaille; **osaa kohdeltiin huonosti ja jotkut
  vanhat asukkaat pitivät heitä omaisuutenaan**. Vapautetut
  perustivat niemen kylät, menestyivät kauppiaina ja levittivät
  kristinuskoa Länsi-Afrikkaan. Nova-scotialaisista, marooneista ja
  vapautetuista syntyi **krio-väestö** ja **krio-kieli**.
- **Bai Bureh ja mökkivero** (en-Wikipedia "Bai Bureh", kaikki osiot):
  synt. **15.2.1840 Kassehissa Port Lokon lähellä**, isä loko-päällikkö
  ja muslimioppinut, äiti temne-kauppias Makenista; sotilaskoulutuksessa
  hän sai nimen **Kebalai, "se joka ei väsy sotaan"**. **1886** hänestä
  tuli Pohjois-Sierra Leonen päällikkö. **Mökkivero tuli voimaan
  1.1.1893**; Bai Bureh kieltäytyi maksamasta, ja kun kuvernööri
  **Frederic Cardew** lupasi **100 puntaa** hänen kiinniottamisestaan,
  Bai Bureh lupasi **500 puntaa** kuvernöörin kiinniottamisesta.
  **19.2.1898** hänen joukkonsa katkaisivat yhteydet Freetownin ja
  Port Lokon välillä. **Antautui 11.11.1898**, karkotettiin
  **Kultarannikolle** yhdessä **Kpana Lewisin** ja **Nyaguan** kanssa
  (nämä kuolivat maanpaossa), **palasi 1905** Kassehin päälliköksi ja
  **kuoli 1908**. Freetownin keskustassa on hänen patsaansa, ja hän on
  seteleissä. **Ainoa tunnettu valokuva** löytyi eBaysta **elokuussa
  2012** (Gary Schulze ja William Hart) ja tuli museoon **2013**.
  *(Artikkeli kertoo myös, että Bai Burehin joukot surmasivat
  kriolaisia kauppiaita; tämä on lehden tekstissä mainittu, koska sen
  pois jättäminen kaunistelisi tapahtumaa.)*

## 2. Kuvataide

- **Sowei-naamio** (en-Wikipedia "Masquerade in Mende culture", osiot
  "Sowei" ja "Types of maskers and masquerade"; "Art in Sierra Leone",
  osio "Sande and Poro Societies"; "Sande society", osio "Unique masking
  traditions in Liberia"): Sande-seuran seremoniat ovat **ainoat
  tilaisuudet Afrikassa, joissa naiset tavan mukaan käyttävät
  naamiota**. Naamion nimi on **sowo/sowei** mendeksi ja **anawu**
  temneksi; muoto on **kypärä**, pinta **kiiltävän musta**, kampaus
  huolellisesti punottu, silmät **alas luodut**, suu suljettu.
  Kampaus on **yhteistyön vertauskuva** (nainen tarvitsee ystävien
  avun hiustensa laittoon), täysi otsa merkitsee viisautta, kaulan
  renkaat terveyttä ja vaurautta, kaurisimpukat rikkautta.
  Naamion veistäjät ovat **yleensä miehiä**, ja taitavaa kutsutaan
  nimellä **Sowo Gande**. Naamiossa tanssiva nainen on **ndoli jowei,
  "tanssin asiantuntija"**. Naamio esiintyy myös **päälliköiden
  kruunajaisissa ja hautajaisissa**. Valkoinen savi **hojo** on
  Sande-seuran merkki ja vastakohta naamion mustalle.
- **Nomoli-kivihahmot** (en-Wikipedia "Nomoli figurine", osiot
  "Origins" ja "Characteristics"; "Art in Sierra Leone", osio "Stone and
  ivory carving"): **vuolukivestä, kalkkikivestä tai graniitista**
  veistettyjä pieniä hahmoja; **Sierra Leonen varhaisimpia
  taideteoksia**. **Portugalilaiset kirjasivat ne 1400-luvulla**;
  eurooppalaisista kuvasi ensimmäisenä lähetyssaarnaaja **George
  Thompson 1852**, joka löysi **viisi kappaletta hävitetyn kylän
  paikalta**. **Mendet ja kissit asettavat hahmot kotien lähelle ja
  viljelyksille suojaksi** hyvän terveyden ja sadon toivossa ja
  kysyvät niiltä neuvoa oraakkelina. Mendejen mukaan ne esittävät
  **seudun aiempia asukkaita**; temnet kohtelevat niitä **entisinä
  päällikköinä ja kuninkaina**. Kuraattori **Frederick Lamp** pitää
  niitä **temnejen perinteenä, joka katosi mendejen tullessa
  1600-luvulla**. Syvemmältä kaivetut ovat paremmin säilyneitä.
- **Gbini ja pilkkanaamiot** (en-Wikipedia "Masquerade in Mende
  culture", osiot "Gbini", "Hale" ja "Types of maskers and
  masquerade"): **gbini on mendejen voimakkaimpana pidetty naamio**.
  Se esiintyy **Poro-seuran initiaation päätösjuhlassa** ylipäällikön
  pojalle sekä **ylipäällikön kruunajaisissa ja hautajaisissa**.
  Asuun kuuluu **leopardinnahka** (päällikkyyden merkki) ja **litteä
  pyöreä päähine**, joka muistuttaa päällikön kruunua: **eläimennahka
  bambukehikon päälle**, koristeena **kaurisimpukat sekä mustat,
  valkoiset ja punaiset kangassuikaleet**, keskellä **pyöreä peili**.
  Naisten on pysyttävä kaukana gbinistä. Samassa naamiokalenterissa on
  myös **pellemäisiä hahmoja — gongoli (mies), gonde ja samawa
  (nainen)** — joiden esitykset ovat **huumoria, satiiria ja
  parodiaa**; ne eivät ole "oikeita" hale-naamioita.
- **Freetownin lyhtyjuhla** (en-Wikipedia "Art in Sierra Leone", osio
  "Lanterns"): alkoi **1930-luvulla** pienenä, kun liikemies **Daddy
  Maggay** näki katolisen lyhtyjuhlan **Gambiassa**; kulkueet
  kasvoivat osin siksi, että **Maggayn vaimon ruoka** (maissi ja
  couscous) keräsi väkeä. **Vuodesta 1961 vuoteen 1991** kilpailua
  järjesti **Young Men's Muslim Association (YMMA)** ramadanin
  kunniaksi. Lyhdyt tehdään **puusta, bambusta, rautalangasta,
  paperista ja riisistä** ja esittävät **maamerkkejä, eläimiä tai
  yliluonnollisia olentoja**. **Säännöllinen kilpailu päättyi 1991
  sisällissotaan**, mutta epäsäännöllisesti niitä järjestetään yhä.
  Samassa artikkelissa: **odelay-seurat** tekevät Freetownissa
  lyhtyjä ja naamioita, joissa esiintyvät **Bai Bureh ja Sengbe Pieh**.

## 3. Musiikki

- **Maringa ja Ebenezer Calendar** (en-Wikipedia "Music of Sierra
  Leone", osiot "Palm-wine" ja "Gumbe"; "Ebenezer Calendar"): Sierra
  Leonen palmuviinimusiikkia sanotaan **maringaksi**, ja sen teki
  tunnetuksi **kriolainen Ebenezer Calendar (1912–1985) ja hänen
  Maringa-yhtyeensä**, joka otti vaikutteita **karibialaisista
  tyyleistä, erityisesti trinidadilaisesta calypsosta**. Calendar
  soitti **kitaraa, trumpettia, mandoliinia ja kornettia**; hänen
  suosituin kappaleensa oli **"Double-Decker Bus"**, jonka **Decca
  tilasi kaksikerroksisen bussilinjan avaamisen mainokseksi**.
  Myöhemmin sanoitukset kääntyivät yhteiskunnallisiksi ja
  hengellisiksi. Isä oli **barbadoslainen tai jamaikalainen**, äiti
  kriolainen; ammatiltaan hän oli **puuseppä ja arkuntekijä**.
- **S. E. Rogie** (en-Wikipedia "S. E. Rogie", osio "Biography" ja
  "Legacy"): **Sooliman Ernest Rogers (1926–1994)** syntyi
  **Fonikohissa Pujehunin piirikunnassa**. **Seitsemänvuotiaana** hän
  maksoi koulunsa **halkoja myymällä**; 1940-luvulla hän muutti
  Freetowniin **räätälin oppipojaksi**, oppi kitaran asiakkailtaan ja
  piti **kiertävää räätälinliikettä päivisin ja soitti iltaisin
  ilmaiseksi**. Vaikutteina **palmuviinimusiikki** ja veljen
  gramofonilevyt: **Jimmie Rodgersin näppäilytyyli ja jodlaus**.
  Lauloi **englanniksi, krioksi, mendeksi ja temneksi**; hitit
  **"My Lovely Elizabeth"**, **"Please Go Easy with Me"**,
  **"Koneh Pehlawo"**. Muutti **1973 Yhdysvaltoihin** (otti nimen
  Rogie) ja **1988 Englantiin** DJ **Andy Kershaw'n** kutsusta.
  **Vampire Weekend** käytti **"Please Go Easy with Me" -kitarasilmukkaa
  kappaleessa "Rich Man" (2019)**; **Taj Mahalin** kerrotaan sanoneen
  oppineensa Rogielta kitaran soinnin.
- **Bubu** (en-Wikipedia "Bubu music"): **temnejen musiikkia**, alun
  perin animistisissa seremonioissa, myöhemmin **ramadanin
  kulkuemusiikkia**. Soittimina **bambupillit ja metalliputket, usein
  auton osista tehdyt**. **Ahmed Janka Nabay** oli ensimmäinen, joka
  levytti bubua ja lisäsi siihen sähkösoittimet; hänen mukaansa bubun
  sanoma on **rauha, hyvä hallinto ja naisten voimaannuttaminen**.
  Musiikki levisi **1990-luvulla sisällissodan aikana**, ja Nabay
  joutui lähtemään maasta. **2010** ilmestyi ensimmäinen kansainvälinen
  bubu-levy **BUBU KING**, ja Nabay kokosi **Brooklynissa** yhtyeen
  **Janka Nabay and the Bubu Gang**; hän kuoli **2018**.
- **Mende-laulu Georgiassa** (en-Wikipedia "Gullah", osiot "Language"
  ja "Contact with West Africa"): **Georgian rannikolla asunut
  gullah-perhe** oli säilyttänyt afrikkalaisen laulun, jonka kielitieteilijä
  **Lorenzo Turner tunnisti 1940-luvulla mendenkieliseksi**. Se on
  **todennäköisesti pisin afrikkalaisella kielellä säilynyt teksti**,
  joka on kulkenut Atlantin yli orjalaivoissa. **1990-luvulla**
  tutkijat **Joseph Opala, Cynthia Schmidt ja Taziff Koroma**
  löysivät Sierra Leonesta syrjäisen kylän, jossa laulua yhä lauletaan,
  ja totesivat sen **hautajaisvirreksi**; perheiden kohtaaminen on
  dokumenttielokuvassa **The Language You Cry In (1998)**.
  Gullah-ryhmät ovat tehneet **kolme paluumatkaa Sierra Leoneen —
  1989, 1997 ja 2005**. Gullah ja krio jakavat ilmauksia:
  **bigyai, pantap, ohltu, tif, yeys, swit**.

## 4. Ruoka

- **Riisi ja riisiranta** (en-Wikipedia "Sierra Leone", osiot
  "Agriculture" ja "Cuisine"; "Oryza glaberrima", johdanto, "Habitat"
  ja "Cultivation"; "Bunce Island", osio "Links to North America";
  "Gullah", osio "History"): maatalous työllistää **80 %** väestöstä;
  **85 % viljelijöistä kasvattaa riisiä sadekaudella**, ja kulutus on
  **76 kg henkeä kohti vuodessa**. **Oryza glaberrima eli
  afrikkalainen riisi** kesytettiin **Länsi-Afrikassa noin 3 000
  vuotta sitten**; se on **noin viidennes Länsi-Afrikan kaupallisesta
  riisistä**, kestää **kuivuutta, syvää vettä, karua maata ja
  tuholaisia** paremmin kuin aasialainen laji, ja sen jyvä on **pieni
  ja päärynämäinen, lese punertava**, maku pähkinäinen. Rannikkoa
  Senegalista Liberiaan sanottiin **riisirannaksi**: Etelä-Carolinan ja
  Georgian istutusten omistajat **maksoivat korkeamman hinnan**
  riisialueilta tuoduista orjuutetuista, koska **riisinviljely vaatii
  teknistä osaamista**, ja **Bunce Islandin linnake** oli riisirannan
  suurin brittiläinen orjalinnake. Carolinassa riisi survottiin
  **puumortteleilla** ja pohjattiin **pyöreillä viskuukoreilla**, jotka
  vastasivat länsiafrikkalaisia. *(Charlestonin sataman kirjanpidon
  mukaan lähes 40 % tuoduista tuli silti Angolasta — luku on
  Gullah-artikkelissa.)*
- **Kassavanlehdet** (en-Wikipedia "Sierra Leonean cuisine", osiot
  "Overview", "Stews" ja "Cassava leaves"): kassavanlehtiä on sanottu
  maan **kansallisruoaksi**. Nuorimmat lehdet **pestään, survotaan
  hyvin hienoksi huhmaressa ja silputaan** ennen keittämistä. Ne
  lisätään **palaver-kastikkeeseen**, jonka pohjana on **punainen
  palmuöljy** sekä sipulia, pippuria, kalaa tai lihaa ja vihanneksia;
  hienommassa versiossa palmuöljy korvataan **kookosöljyllä**.
  Muita riisin päälle tulevia kastikkeita ovat **bataatinlehdet,
  crain crain, okra ja maapähkinäpata**.
- **Poyo** (en-Wikipedia "Palm wine", johdanto, osiot "Tapping" ja
  "Africa"): palmuviini valutetaan **palmun katkaistusta kukinnosta**
  astiaan; ensimmäinen valkoinen neste on **makeaa ja alkoholitonta**,
  mutta ilman hiivat käynnistävät käymisen heti: **kahdessa tunnissa**
  syntyy **noin 4-prosenttinen** juoma, päivässä happamampi ja lopulta
  etikkaa. Sierra Leonessa juoman nimi on **poyo**, ja se tehdään
  useista palmulajeista. **Limbojen sanonnan mukaan "se joka tuo
  poyon, tuo elämän"**; poyoa tarjotaan **häissä, syntymäjuhlissa ja
  hautajaisvalvojaisissa**.
- **Gari** (en-Wikipedia "Garri", johdanto, osiot "Preparation" ja
  "Dishes"; "Sierra Leonean cuisine", osio "Overview"): kassavan
  **juuresta** tehty karkea jauho. Juuret **kuoritaan, pestään ja
  raastetaan** massaksi, joka **puristetaan huokoisessa säkissä
  1–24 tuntia**, **seulotaan ja paahdetaan pannulla** — kuumuus
  poistaa kassavan luontaiset **syanohydriinimyrkyt**, ja kuiva rae
  **säilyy pitkään**. Garia syödään **kylmään veteen liotettuna
  sokerin, hunajan, paahdettujen maapähkinöiden tai maidon kanssa**,
  ja siitä vaivataan **eba**-taikinaa kastikkeen seuraksi. Sierra
  Leonen keittiön tärkkelyksinä artikkeli luettelee **garin, acheken
  ja binchin** (silmäpavut krioksi).

## 5. Kirjallisuus

- **Fourah Bay College** (en-Wikipedia "Fourah Bay College", osiot
  "Foundation" ja "Old Fourah Bay College Building"): perustettu
  **18.2.1827** anglikaanisen lähetysseuran (CMS) kouluna kuvernööri
  **Charles MacCarthyn** tuella; **Saharan eteläpuolisen Afrikan
  ensimmäinen länsimainen yliopisto**. **Ensimmäinen opiskelija oli
  Samuel Ajayi Crowther**. Yhteys **Durhamin yliopistoon 1876–1967**.
  Siirtomaa-aikana Freetownia sanottiin koulujensa takia **"Afrikan
  Ateenaksi"**. Vanhan päärakennuksen peruskiven laski kuvernööri
  **William Fergusson 1845**, ja rakentamista valvoi **Edward Jones**,
  eteläcarolinalainen afroamerikkalainen lähetyssaarnaaja, josta tuli
  oppilaitoksen **ensimmäinen musta johtaja**. Rakennus julistettiin
  **kansallismonumentiksi 1955**, jäi käytöstä **1990** ja **paloi
  1999**. **Lati Hyde-Forster** oli ensimmäinen naispuolinen
  valmistunut, **Davidson Nicol 1966** ensimmäinen sierraleonelainen
  johtaja.
- **Lehdistö ja painokone** (en-Wikipedia "Mass media in Sierra
  Leone", johdanto ja osio "History"): **Afrikan ensimmäinen moderni
  painokone saapui Freetowniin 1794**, mutta **ranskalainen
  hyökkäysosasto tuhosi sen ennen käyttöä**. Seuraava saatiin
  toimintaan **1800**, ja se mahdollisti lehdet **Sierra Leone
  Advertiser** ja **Royal Gazette**; **The Royal Gazette and Sierra
  Leone Advertiser ilmestyi 1817–1827**. **1860-luvulla** maasta tuli
  **afrikkalaisen journalismin keskus**, jonne tuli toimittajia eri
  puolilta mannerta; **New Eran** perusti länsi-intialainen **William
  Drake**, ja **1855** perustettiin **African Interpreter and Advocate**
  (F. A. Belgrave) ja **Sierra Leone weekly** (Charles Bannerman).
  Lehdet käsittelivät **rasismia, kolonialismia ja afrikkalaisten
  oikeuksia**. Ala hiipui vuosisadan lopulla myynnin vähyyteen.
  **1934** perustettiin **Sierra Leone Broadcasting Service**,
  **Länsi-Afrikan ensimmäinen englanninkielinen radiopalvelu**.
- **Krio kirjakielenä** (en-Wikipedia "Krio language", johdanto,
  osiot "Overview" ja "Language revival"; "Thomas Decker" eli
  "Thomas Leighton Decker", kaikki osiot): kriota puhuu
  **96 prosenttia** maan väestöstä (Krio-artikkeli; **Sierra
  Leone -artikkeli sanoo 97 %** — lehteen on kirjoitettu "yli
  yhdeksänkymmentä prosenttia"), mutta sillä **ei ole virallista
  asemaa**; virallinen kieli on englanti. Sanasto tulee englannista,
  kielioppi ja vokaalit **jamaikalaisesta maroonikreolista**, ja
  afrikkalaiset sanat pääosin **akanista, jorubasta ja igbosta**;
  **pikin** ('lapsi') tulee portugalin sanasta **pequeno** ja
  **gentri** ('varallisuus') vanhasta ranskasta. **Thomas Alexander
  Leighton Decker (25.7.1916 – 7.9.1978)** oli kielimies, runoilija
  ja toimittaja, joka **väitti kriota omaksi kieleksi eikä
  murteeksi** ja oli ensimmäisiä, jotka käyttivät siitä nimeä
  **krio**. Hän **käänsi Shakespearen Julius Caesarin krioksi (1964)**
  ja teki **As You Like It -näytelmästä sovituksen "Udat de kiap
  fit" (1966)**; muita töitä **Death of Boss Coker** (1939) ja
  **Tales of the Forest** (1968). Työ oli **Daily Guardianin
  päätoimittajana** ja **African Standardissa**; **OBE** vähän ennen
  kuolemaa. **Uusi testamentti ilmestyi krioksi 1986 ja Vanha
  testamentti 2013**, ja **1990-luvulla** opetusministeriö otti krion
  osaan Freetownin alakouluja opetuskieleksi.
- **Africanus Horton** (en-Wikipedia "Africanus Horton", johdanto,
  osiot "Early life", "Politics and writings", "Later life and
  death"): **James Africanus Beale Horton (n. 1835 – n. 1883)**
  syntyi **Gloucesterin kylässä Freetownin lähellä** igbo-perheeseen,
  jonka **laivasto oli vapauttanut orjalaivasta**. Kävi **Sierra
  Leone Grammar Schoolin (1845 alkaen)** ja **Fourah Bay Collegen**,
  sai **sota-arkiston stipendin** ja opiskeli lääkäriksi **King's
  College Londonissa ja Edinburghin yliopistossa**; hänestä tuli yksi
  **ensimmäisistä mustista upseereista Britannian armeijassa**.
  Otti opiskeluaikanaan nimen **Africanus** ylpeytenä afrikkalaisesta
  taustastaan. Kirjoitti **The Political Economy of British West
  Africa (1865)** ja **West African Countries and Peoples (1868)**,
  joissa hän **kumosi eurooppalaisten rotuoppeja** ja vaati
  **itsehallintoa Länsi-Afrikan siirtomaille** — häntä on sanottu
  **modernin afrikkalaisen poliittisen ajattelun isäksi**. Vaati myös
  **lääketieteellistä korkeakoulua alueelle** (kirje sotaministeriölle
  **1861**). Perusti eläkkeellä Freetownissa pankin **Commercial Bank
  of West Africa**; **1880 mennessä yksi Afrikan varakkaimmista
  miehistä**. **Merkuriuksen kraatteri on nimetty hänen mukaansa.**

## Kuvat

Viisi nostoa sai kuvan; **viidentoista noston kuva puuttuu** ja on
kuvaputken tilauslistalla (ks. loppuraportti). Commonsissa on Sierra
Leonesta hyvin vähän ≥ 1200 px:n vapaita kuvia: haut palmuviinistä,
kassavanlehdistä, lyhtyjuhlasta, muusikoista ja Bai Burehista eivät
tuottaneet yhtään kelvollista osumaa maasta itsestään. Jokainen viidestä
kuvasta on katsottu 480 px:n thumbina Read-työkalulla ja tarkistettu
Commonsin rajapinnasta (koko, lisenssi, tekijä) 6.9.2026.

| Nosto | Tiedosto | Tekijä ja lisenssi |
| --- | --- | --- |
| Historia / Freetownin perustaminen | `Freetown Court 1984.jpg` | Brian Harrington Spier (CC BY-SA 2.0) |
| Kuvataide / sowei | `Sande Society Mask (sowei), … Chazen Museum of Art - DSC01748.JPG` | Daderot (CC0) |
| Kuvataide / nomoli | `Nomoli-British Museum (4).jpg` | John Atherton (CC BY-SA 2.0) |
| Ruoka / gari | `Cassava preparation into Gari.jpg` | Fodiebrima (CC0) |
| Kirjallisuus / Fourah Bay | `Old building of Fourah Bay College. Cline Town, Freetown, Sierra Leone.jpg` | Jared & Melanie & Huxley Ponchot (CC BY 2.0) |

Gari-kuvassa on kaksi ihmistä työn ääressä; kumpikaan ei ole
lähikuvassa eikä kasvoja voi thumbista tunnistaa, ja kuvateksti kertoo
työvaiheesta eikä väitä kuvauspaikkaa (Commonsin tiedoissa ei ole
maata).

Hylätyt: **Sjoerd Hofstran 1934–36 kokoelma** (Panguma; riisipeltoja,
gbini- ja bundu-tanssijoita) — negatiiviskannaukset, joissa on musta
filmireunus, naarmuja ja lähikuvassa tunnistettavia kyläläisiä;
**`Masque Bundu Mende-Musée de la Compagnie des Indes.jpg`** — kuvassa
näkyy museon tekstikyltti; **Nationaal Museum van Wereldculturenin
sowei-kuva** — tekijää ei ole kirjattu; **SLARIn tutkimusaseman kuvat
Rokuprista** — esittävät rakennuksia, eivät riisiä; **palmuviinin
valutuskuvat** — kaikki Nigeriasta tai Kamerunista;
**`Cotton Tree (Sierra Leone).jpg`** — jo käytössä kaupungin litteässä
nostossa.

## Uutislähde

**Sierraloaded** (sierraloaded.sl), englanti. Testattu 6.9.2026:
syötteessä `https://sierraloaded.sl/feed/` kymmenen juttua; artikkelisivun
ensimmäisestä `<article>`-lohkosta jäsentyy **15 yli 60 merkin
kappaletta** ja `og:image` löytyy. Syöte ja artikkelisivut ovat samalla
isäntänimellä. Hylätyt ja muut testatut on lueteltu
`js/packs/uutislahteet.js`:n SLE-kommentissa.
