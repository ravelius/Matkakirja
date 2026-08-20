# Astana-faktapohjan riippumaton tarkistus

Tarkistettu 20.8.2026 en-Wikipedian raakatekstistä (action=raw, curl suoraan —
ei tarvinnut NODE_USE_ENV_PROXY-kiertoa, proxy toimi läpinäkyvästi) seuraavista
artikkeleista: **Astana**, Baiterek (monument), Khan Shatyr Entertainment
Center, Ishim (river), Virgin Lands campaign, Palace of Peace and
Reconciliation, Astana Opera, Nurjol Boulevard, Hazrat Sultan Mosque,
Nursultan Mosque (+ redirect "Astana Grand Mosque"), Expo 2017, **Akmola
tragedy**, Aqorda Residence (redirect kohteesta "Akorda"), National Museum of
the Republic of Kazakhstan. Lisäksi haettu museon koordinaatti Wikidatasta
(Q18405670) ja laskettu kaikki kohdekartan etäisyydet itse (haversine,
Python).

**Yleisarvio: koostaja on tehnyt huolellista työtä ja suurin osa faktoista
piti paikkansa sanasta sanaan.** Mutta juuri se kohta, jota tehtävänanto
erityisesti painotti — pääartikkelin AI-tagin vuoksi tarvittava
ristiintarkistus — paljasti yhden **vakavan** virheen (Jakso 4, sillan
sortuma) ja kaksi **selvää** sisäistä virhettä prosetekstissä, jotka eivät
näy koostajan omissa "faktat ja lähteet"-laatikoissa (eli koostaja on
laskenut/kirjannut oikean tiedon laatikkoon mutta kirjoittanut lopulliseen
suomenkieliseen tekstiin väärän luvun). Nämä on korjattava ennen julkaisua.

---

## A. VAKAVA VIRHE — Jakso 4, sillan sortuma 1959

**Väite (Jakso 4):** "2. elokuuta 1959 Jesil-joen silta romahti
Tselinogradissa, ja onnettomuudessa kuoli 143 ihmistä... poliisi... pelasti
tuolloin 40 hengen henkiä."

**Ongelma:** Tämä on suoraan pääartikkelin AI-tagatusta tekstistä eikä
koostaja avannut erillistä "Akmola tragedy" -artikkelia (hän merkitsi tämän
itse auki-jääneeksi kohdassa 7.6 — juuri oikea epäilys). Kun tarkistin
"Akmola tragedy" -artikkelin, se on RISTIRIIDASSA pääartikkelin kanssa
useassa kohdassa:

| Yksityiskohta | Pääartikkeli "Astana" (AI-tagattu) | "Akmola tragedy" (oma artikkeli, arkistolähteillä) |
|---|---|---|
| Päivämäärä | **2. elokuuta** 1959 | **14. kesäkuuta** 1959 |
| Kuolleiden määrä | **143** (esitetty faktana) | Virallisesti kirjattu vain **6** kuollutta (Neuvostoliitto salasi tiedot); silminnäkijöiden ARVIO n. **140** |
| Pelastettujen määrä | poliisi pelasti **40** ihmistä | ei mainita lukua 40 lainkaan — kertoo vain että poliisi (yhdessä vaimonsa kanssa) alkoi pelastaa hukkuvia |

"Akmola tragedy" -artikkeli viittaa mm. Neuvostoliiton syyttäjänviraston
15.6.1959 päivättyyn tiedotteeseen (siis PÄIVÄÄ sillan romahduksen jälkeen,
jos päivämäärä on 14.6.) — tämä tukee kesäkuun päivämäärää elokuun sijaan.
Tämä on juuri sitä AI-generoitua "tarkkuutta" jota huoltotagi varoittaa: 2.8.
ja 143 kuulostavat täsmällisiltä mutta ovat todennäköisesti pääartikkelin
tekoälykirjoittajan keksimiä/sekoittamia lukuja.

**Suositus:** Älä käytä Jakso 4:ää nykymuodossaan. Jos aihe halutaan
säilyttää, käytä "Akmola tragedy" -artikkelin varovaisempaa muotoilua:
päivämäärä 14. kesäkuuta 1959, virallinen kuolleiden määrä vain 6 (koska
Neuvostoliitto salasi tiedot), silminnäkijöiden arvio n. 140, äläkä käytä
lukua 40 pelastetusta, koska sille ei löydy lähdettä kummastakaan
artikkelista. Poliisin nimi Nurmuhambet Kožahmetov sen sijaan on
molemmissa artikkeleissa sama ja saa tukea myös Aftermath-osiosta (hänet
palkittiin Punaisen tähden ritarikunnalla 1961) — tämä osa on turvallinen.

---

## B. Kaksi sisäistä ristiriitaa: prosetekstin luku ≠ koostajan oma
lähdelaatikko

Nämä ovat erityisen ikäviä, koska koostaja on itse laskenut/merkinnyt oikean
tiedon "Faktat ja lähteet"-laatikkoon, mutta lopullinen suomenkielinen
nostoteksti sanoo silti eri asian.

### B1. H3-nosto: "kymmeniä tuhansia" vapaaehtoisia vs. lähteen 300 000

**Nostoteksti:** "Kymmeniätuhansia nuoria vapaaehtoisia saapui junilla
aroille peltoja kyntämään..."

**Koostajan oma lähdelaatikko (sama nosto, rivi alla):** "kesällä 1954
saapui 300 000 komsomol-vapaaehtoista. — en-Wikipedia 'Virgin Lands
campaign'"

Tarkistin "Virgin Lands campaign" -artikkelin: "During the summer of 1954,
300,000 Komsomol volunteers traveled to the Virgin Lands." 300 000 EI OLE
"kymmeniä tuhansia" (joka suomeksi tarkoittaa suuruusluokkaa 10 000–90 000)
— se on kolmesataa tuhatta, kertaluokkaa suurempi luku. **Korjaa
nostoteksti lukemaan "satoja tuhansia" tai suoraan "300 000".**

### B2. H4-nosto: Unescon palkinto "kesäkuussa" vs. lähteen 16. heinäkuuta

**Nostoteksti:** "Kesäkuussa 1999 Unesco myönsi Astanalle Rauhan kaupungin
-mitalin ja arvonimen."

**Koostajan oma lähdelaatikko (sama nosto):** "16.7.1999 Unesco myönsi
Astanalle Rauhan kaupungin -mitalin ja -arvonimen."

Pääartikkeli: "On 16 July 1999, Astana was awarded the medal and title of
the City of Peace by UNESCO." Päivämäärä on heinäkuu, ei kesäkuu.
**Korjaa "Kesäkuussa" → "Heinäkuussa".**

---

## C. Kolmas löytö: H3:n "oopperatalo" 1960-luvulla — ei lähteessä

**Nostoteksti (H3):** "1960-luvulla kaupunkiin nousi uusia kaupunginosia,
oopperatalo ja lentokenttä – ensimmäinen suuri rakennusaalto..."

**Lähde (Astana, osio "Soviet era"):** "the city received a number of new
monumental public buildings, including the Virgin Lands Palace, a Palace of
Youth, a House of Soviets, a new airport, and several sports venues."

Lähteessä EI mainita mitään oopperataloa 1960-luvulla — sen sijaan
Uudisviljelysten palatsi, Nuorison palatsi, Neuvostojen talo, uusi
lentokenttä ja urheilupaikkoja. Koostajan oma "Faktat ja lähteet"-laatikko
tämän noston alla listaa oikein juuri nämä (Uudisviljelysten palatsi,
Nuorison palatsi, lentokenttä, urheilupaikkoja) — mutta sana "oopperatalo"
on lipsahtanut nostotekstiin ilman lähdetukea. Todelliset oopperatalot
Astanassa (Rauhan ja sovinnon palatsin 1300-paikkainen oopperasali 2006, ja
Astana Opera 2010–2013) rakennettiin vasta vuosikymmeniä myöhemmin, eivät
1960-luvulla. **Poista "oopperatalo" tai korvaa se lähteen mukaisilla
rakennuksilla (esim. "Neuvostojen talo").**

---

## D. Pinta-alaristiriita (810,2 vs 722,0 km²) — vahvistettu, EI ratkeavissa

Tarkistin: infoboksi `area_total_km2 = 810.2`; leipäteksti (osio
"Topography") "The city encompasses 722.0 sqkm." Molemmat ovat oikeasti
artikkelissa, ei koostajan virhe. En löytänyt ulkopuolista tapaa ratkaista
kumpi on ajantasaisempi (kumpikaan luku ei kanna omaa viitettä). Koostajan
ratkaisu (käyttää tekstin lukua 722 km² ja mainita ristiriita avoimesti) on
järkevä keskitie — **suosittelen pitämään sen ennallaan**, mutta kirjoita
mainintaan mukaan myös vaihtoehto, että 810,2 km² voi olla ajantasaisempi
(hallinnollinen laajennus), koska infoboksi on tyypillisesti se kenttä joka
päivitetään ensin virallisten tilastojen muuttuessa.

**Uusi, samantyyppinen löytö jota koostaja ei huomannut:** Sama
infoboksi-vs-leipäteksti-ristiriita toistuu KAHDESSA muussa kohdassa:

- **Khan Shatyr, pinta-ala:** infoboksi `floor_area = {{cvt|100,000|m2}}`
  mutta leipäteksti sanoo "covering 140,000 sqm". Koostaja käytti K2-nostossa
  lukua 140 000 m² tarkistamatta infoboksin 100 000 m²:n ristiriitaa.
  Suosittelen mainitsemaan tämän ristiriidan samaan tapaan kuin
  pääkaupungin pinta-ala-asian, tai käyttämään varovaisempaa ilmausta
  ("yli 100 000 m²") jos tarkkaa lukua ei haluta lyödä lukkoon.
- **Bozok-linnoituksen ikä:** infoboksin `established_date = 8th century (as
  Bozok)` mutta History-osion leipäteksti sanoo Bozokin olleen "a large
  settlement of the 12th-14th centuries." H1-nosto käyttää 1200–1300-lukua
  (leipätekstin mukaan) mutta ei mainitse infoboksin ristiriitaista "8.
  vuosisata" -väitettä. Suosittelen joko mainitsemaan ristiriidan (kuten
  pinta-alan kohdalla) tai käyttämään varovaisempaa ilmausta ("keskiajalla"
  ilman tarkkaa vuosisataa).

---

## E. Joen patoamisvuosi: sisäinen ristiriita K4 vs. Jakso 3 (1998 vs 2008)

**K4-nosto (osio 2, oikein):** "Jokea on vuodesta 1998 padottu ja
syvennetty..." — lähdelaatikko: "en-Wikipedia 'Ishim (river)'".

**Jakso 3 (osio 3, VÄÄRIN):** "...sillä jokea on vuodesta 2008 padottu ja
syvennetty pysymään kauniina ympäri vuoden." — lähdelaatikko väittää
myös: "Jokea padottu ja syvennetty vuodesta 2008... — en-Wikipedia 'Ishim
(river)' (osio 'In Astana')".

Tarkistin "Ishim (river)" -artikkelin osion "In Astana": "**Since 1998**,
the Ishim in Astana has been actively managed, for flood management and
maintaining water level, in order to provide for recreational use and
ensure the showpiece appearance." Vuosiluku on 1998, ei 2008. Vuosi 2008
esiintyy Wikipediassa eri asiayhteydessä — pääartikkelin "River transport"
-osiossa: "**Since 2008**, navigation on the Esil River has been organized
within the city" (eli veneilyohjelma "Purjehdittava Esil" alkoi 2008, mutta
padotus/syventäminen alkoi 1998). Koostaja on ilmeisesti sekoittanut nämä
kaksi eri faktaa keskenään Jakso 3:ssa, vaikka sama koostaja kirjoitti asian
oikein K4-nostossa samasta lähteestä.

**Korjaa Jakso 3: "vuodesta 2008" → "vuodesta 1998"** (tai muotoile
uudelleen niin että mainitaan sekä padotus 1998 että purjehdusohjelma 2008,
jos molemmat halutaan mukaan).

---

## F. Muut tarkistetut ja VAHVISTETUT faktat (ei virheitä)

Seuraavat tarkistin suoraan lähdeartikkeleista ja ne täsmäävät koostajan
tekstiin sanatarkasti tai käytännössä sanatarkasti:

- Bajterek: 105 m, Nurjol-bulevardi, rakennettu 25.10.1996–30.8.2002,
  arkkitehti Akmurza Rustembekov, 22 m kultainen pallo, näköalatasanne 97 m,
  Samruk-lintu-taru. Koordinaatit 51°07′42″N 71°25′50″E — täsmää.
  Presidentin kämmenjälki/toivomusrituaali on aidosti artikkelissa ja
  koostaja jätti sen oikein pois.
- Khan Shatyr: Foster and Partners, avattu 5.7.2010, katto 90 m, huippu
  150 m, pohja 200×195 m, sisälämpötila 15–30 °C (myynti 19–24 °C),
  ulkolämpötila -35…+35 °C, yli 10 jalkapallokentän puisto+kauppakeskus+
  minigolf+sisäranta. Koordinaatit 51°07′56″N 71°24′14″E — täsmää.
  Presidentin avajaispuhe/70-vuotispäivä on aidosti artikkelissa, jätetty
  oikein pois.
- "Toiseksi kylmin pääkaupunki Ulaanbaatarin jälkeen, ennen Ottawa" —
  täsmää sanasta sanaan.
- Tammikuun keskilämpö -14,5 °C, ennätysalin -51,6 °C (1893), kesä 35 °C —
  täsmää säätaulukkoon.
- Kisho Kurokawa: huhtikuu 1998 arkkitehtikilpailu, 6.10.1998 voitto,
  "historian ja tulevaisuuden symbioosi" — täsmää sanasta sanaan (Cityscape-
  osio).
- Bozok-linnoitus 1200–1300-luku (leipätekstin mukaan, ks. kohta D
  ristiriidasta), Akmolyn perustaminen 18.6.1830, perustaja Fjodor Šubin,
  1832 kaupunkioikeudet/Akmolinsk, Kenesary-kaanin kapina 1838 — täsmää.
- Nimihistoria Aqmola→Akmolinsk(1832)→Tselinograd(1961, Hruštšov)→
  Akmola(1991)→Astana(1998)→Nur-Sultan(2019)→Astana(2022), Guinness-ennätys
  (The Economist 1.10.2022) — täsmää täysin. 2022-levottomuudet on aidosti
  artikkelissa (mainittu nimenmuutoksen yhteydessä) ja koostaja on oikein
  jättänyt sen pois nostotekstistä.
- 300 000 komsomol-vapaaehtoista kesällä 1954, kampanja alkoi 1953 — täsmää
  (mutta ks. kohta B1, itse nostoteksti ei täsmää tähän).
- 14.3.1961 Hruštšov ehdotti nimeä, 20.3.1961 Tselinograd — täsmää.
- 6.7.1994 Ylin neuvosto päätti siirron, 10.12.1997 muutto Almatysta
  Akmolaan, toukokuu 1998 nimi Astana — täsmää.
- Dubelt 1879 ehdotti Tjumen–Akmolinsk-rataa — täsmää.
- Lentokenttä n. 17 km (kaakkoon) keskustasta, Nurly Zhol -asema
  rakennettu Expo 2017:ää varten, kapasiteetti 12 000 — täsmää.
- Yli 60 bussilinjaa, yli 720 000 joukkoliikennematkustajaa päivässä —
  täsmää.
- Karaganda n. 200 km, Omsk n. 450 km: artikkelissa on `{{citation
  needed}}`-tagi tälle kohdalle, joten en käyttänyt pelkkää Wikipediaa —
  laskin itse haversine-etäisyyden kaupunkien yleisesti tunnetuista
  koordinaateista: Karaganda ~189 km, Omsk ~447 km linnuntietä. Wikipedian
  luvut (200/450 km) ovat siis geografisesti uskottavia riippumattomasta
  tarkistuksesta huolimatta lähdemerkinnän puutteesta — EI tarvitse
  muuttaa, mutta tagi kannattaisi mainita.
- Rauhan ja sovinnon palatsi: 80 asteen lämpötilavaihteluvara (-40…+40 °C),
  kolme kulmaa siltalaakereilla, yksi kiinteä — täsmää sanasta sanaan.
  Koordinaatit 51°07′23″N 71°27′49″E — täsmää.
- Esil-joki jäätyy 2. viikko marraskuuta – huhtikuun alku (Astana-artikkelin
  ilmasto-osio); poljinvenevuokraus keskustassa (Ishim-artikkeli) — täsmää.
- Säätaulukko: kaikki kuukausiarvot (keskilämpö, ääriarvot, sademäärä)
  täsmäävät `{{Weather box}}`-mallineeseen rivi riviltä. Lähdemerkintä
  "1991–2020, ääriarvot 1881–nykyhetki, pogodaiklimat.ru; auringonpaiste
  NOAA/DWD 1961–1990" täsmää artikkelin `source 1`/`source 2`-kenttiin
  täsmälleen.
- Akorda (Aqorda Residence -artikkeli, uudelleenohjaus toimii): "the
  president's place of work... it is not the president's place of
  residence" — koostajan käyttämä ilmaus "presidentin työpaikka" on
  TÄSMÄLLEEN oikea sanavalinta, ei pelkkä hyvä arvaus. Koordinaatit
  51°07′33″N 71°26′47″E — täsmää. Galleriakuva presidentti Nazarbajevista
  ja pääministeri Modista kunniavartion tarkastuksessa on aidosti
  artikkelissa — koostajan varoitus kuva-aiheista (osio 6) on perusteltu.
- Astana Opera, Nurjol Boulevard, Hazrat Sultan Mosque, Nur Alem (Expo
  2017), Nursultan Mosque -koordinaatit — kaikki täsmäävät koostajan
  taulukkoon täydelleen.
- "Astana Grand Mosque" ohjautuu artikkeliin "Nursultan Mosque" — vahvistin
  itse (`#REDIRECT [[Nursultan Mosque]]`). Moskeija nimettiin virallisesti
  presidentin mukaan "Nursultan-moskeijaksi" 4.7.2026 — täsmää koostajan
  osion 7.7 väitteeseen "heinäkuussa 2026".

---

## G. Kohdekartan etäisyydet (osio 4) — itse laskettuna

Laskin haversine-kaavalla Pythonilla samat etäisyydet keskipisteestä
(51°08′N 71°26′E) käyttäen samoja koordinaatteja kuin koostaja. Tulokset
täsmäävät koostajan omiin laskelmiin muutaman kymmenen metrin tarkkuudella
— koostajan yksinkertaistettu menetelmä (asteet × 111 km ×
cos(51,13°)≈0,627) on siis luotettava tähän käyttötarkoitukseen:

| Kohde | Koostajan luku | Oma laskelma | Kompassisuunta (oma) |
|---|---|---|---|
| Bajterek | ~0,6 km SW | 0,59 km | SSW |
| Nurjol-bulevardi | ~0,7 km S | 0,73 km | SSE |
| Akorda | ~1,2 km SE | 1,24 km | SE |
| Astana Opera | ~1,6 km W | 1,58 km | W |
| Khan Shatyr | ~2,1 km W | 2,06 km | W |
| Rauhan ja sovinnon palatsi | ~2,4 km SE | 2,40 km | ESE |
| Hazrat Sultan -moskeija | ~2,9 km E | 2,87 km | ESE |
| Nur Alem | ~4,9 km SW | 4,89 km | SSW |
| Suuri moskeija | ~6,9 km S | 6,90 km | SSW |

Etäisyydet ovat siis oikein; muutama kompassisuunta on hieman epätarkka
(esim. "S" vs. todellinen "SSE", "E" vs. "ESE") mutta ei harhaanjohtava
kartalla.

**Rajaussuosituksen tarkennus:** Laskin klustereiden A+B (kohteet 1–8)
todellisen bounding boxin koordinaattiäärivyistä: **n. 4,8 km (itä–länsi) ×
2,0 km (pohjois–etelä)**, ei "n. 4 km × 3 km" kuten koostaja kirjoitti —
alue on siis kapeampi pohjois-etelä-suunnassa ja hieman leveämpi itä-länsi-
suunnassa kuin koostaja arvioi, koska Astana Opera/Khan Shatyr (länsi) ja
Rauhan ja sovinnon palatsi/Hazrat Sultan -moskeija (itä) venyttävät aluetta
itä-länsisuunnassa. Tämä ei muuta rajaussuosituksen johtopäätöstä (Expo-
klusterin pudotus on edelleen perusteltu, koska 9–10 ovat 4,9–6,9 km päässä,
selvästi erillään 0,6–2,9 km:n pääklusterista), mutta karttapohjan tulee
olla suorakaide, ei neliö.

**Kansallismuseo (Wikidata Q18405670):** koordinaatit 51,1178°N, 71,4701°E
→ **3,09 km SE** keskipisteestä (bearing 124°). Tämä sijoittuu
Itsenäisyysaukion klusterin (B) reunalle, hieman kauemmas kuin Hazrat
Sultan -moskeija (2,9 km). Museo mahtuisi hyvin klusteriin B, jos se
halutaan mukaan — suosittelen lisäämään sen, koska koordinaatti oli
löydettävissä yhdellä Wikidata-kyselyllä eikä vaadi merkittävää
lisätyötä.

---

## H. Sisältölinjaus — vahvistettu

Kävin läpi presidenttikulttiin liittyvät kohdat systemaattisesti:

- Bajterek: kultainen kämmenjälki + toivomusrituaali on aidosti
  artikkelissa (osio "Design": "gilded hand print of the right hand of
  Nursultan Nazarbayev... A plaque invites visitors to place a hand in the
  imprint and make a wish"). Oikein jätetty pois.
- Astana Opera: "on the basis of an executive order of Nursultan
  Nazarbayev", "design has been partially made by Nursultan Nazarbayev" —
  aidosti artikkelissa. Koostaja ei käyttänyt näitä yksityiskohtia missään
  nostossa (Opera esiintyy vain kohdekartan rivinä ilman narratiivia) —
  turvallinen.
- Khan Shatyr: "unveiled by... Nursultan Nazarbayev", avattu presidentin
  70-vuotispäivänä, presidenttivierailulista avajaisissa — aidosti
  artikkelissa, oikein jätetty pois K2-nostosta.
- Akorda-artikkelin galleriakuva presidentistä ja Intian pääministeristä
  kunniavartiossa — aidosti olemassa, koostajan kuva-aihevaroitus (osio 6)
  on perusteltu ja tarpeellinen.
- Lentokentän virallinen nimi "Nursultan Nazarbayev International Airport"
  — aidosti artikkelissa, koostaja käytti kohdekartassa/jaksossa vain
  neutraalia "kansainvälinen lentokenttä" -ilmausta, ei virallista nimeä.
  Turvallinen ratkaisu.
- Nursultan-moskeija: virallinen presidentin mukaan nimeäminen 4.7.2026 —
  vahvistettu (ks. kohta F). Koostaja käytti pääasiassa neutraalia "Suuri
  moskeija" -nimeä taulukossa, mainiten virallisen nimen suluissa — hyvä
  ratkaisu.
- 2019/2022-nimenmuutokset (H2): pääartikkeli mainitsee "2022 Kazakhstan
  unrest" nimenmuutoksen yhteydessä. Koostajan nostoteksti ei mainitse
  levottomuuksia lainkaan, vain toteaa neutraalisti "nimi... palasi
  Astanaksi 2022" — linjauksen mukainen.
- Neitseellisten maiden kampanja (H3): käsitelty historiallisena Neuvosto-
  ohjelmana ilman nykypolitiikkaa — linjauksen mukainen (mutta ks. kohta B1
  ja C, samassa nostossa on kaksi faktavirhettä jotka eivät liity
  linjaukseen vaan lukuihin).

**Ei löytynyt sisältölinjausrikkomuksia.** Kaikki koostajan itse
mainitsemat "tietoisesti pois jätetyt" kohdat vahvistuivat aidoiksi
Wikipedia-sisällöiksi jotka oli syytä jättää pois.

---

## Yhteenveto korjattavista kohdista

1. **[VAKAVA] Jakso 4** — päivämäärä, kuolleiden määrä ja pelastettujen
   määrä ovat kaikki kyseenalaisia; käytä "Akmola tragedy" -artikkelin
   varovaisempia lukuja (14.6.1959, virallisesti 6 kuollutta / arvio ~140,
   ei lukua pelastetuista) tai jätä jakso kokonaan pois.
2. **[Virhe] H3-nosto:** "kymmeniä tuhansia" → pitäisi olla "300 000" /
   "satoja tuhansia" (oma lähdelaatikko on jo oikein).
3. **[Virhe] H3-nosto:** "oopperatalo" 1960-luvulla ei ole lähteessä — poista
   tai korvaa (esim. "Neuvostojen talo").
4. **[Virhe] H4-nosto:** "Kesäkuussa 1999" → "Heinäkuussa 1999" (oma
   lähdelaatikko on jo oikein, 16.7.).
5. **[Virhe] Jakso 3:** "vuodesta 2008" → "vuodesta 1998" (padotus/
   syventäminen; K4-nosto sai tämän jo oikein samasta lähteestä).
6. **[Tarkennus] Khan Shatyrin pinta-ala:** infoboksi 100 000 m² vs.
   leipäteksti 140 000 m² — ristiriita, jota ei ole mainittu (samantyyppinen
   kuin jo tiedossa oleva Astanan 810,2/722,0 km² -ristiriita).
7. **[Tarkennus] Bozok-linnoituksen ikä:** infoboksi "8. vuosisata" vs.
   leipäteksti "1200–1300-luku" — sama ristiriitakuvio, ei mainittu.
8. **[Tarkennus] Rajaussuositus:** klustereiden A+B bounding box on
   todellisuudessa n. 4,8 km × 2,0 km, ei "4 km × 3 km" — käytä
   suorakaidetta neliön sijaan kartan rajauksessa.
9. **[Lisäys, ei virhe] Kansallismuseon koordinaatit** löytyivät Wikidatasta
   (Q18405670): 51,1178°N, 71,4701°E, 3,09 km SE keskipisteestä — voidaan
   lisätä kohdekarttaan klusteriin B.

## Faktat, jotka jäivät VAIN AI-tagatun pääartikkelin varaan eikä niitä
voitu ristiintarkistaa muualta (kirjoittajan syytä harkita pudotettavaksi
tai merkittävä epävarmoiksi)

- **Väestöluku 1 622 245 (1.11.2025) ja siihen liittyvät väestö-/GDP-luvut**
  — ei käytetty nostoissa, mutta jos niitä käytetään myöhemmin, ne pitää
  tarkistaa esim. Kazakstanin tilastoviraston sivuilta (stat.gov.kz), ei
  pelkästä Wikipediasta.
- **Karaganda n. 200 km / Omsk n. 450 km** — artikkelissa `{{citation
  needed}}`-tagi. Vahvistin itse haversine-laskennalla (189/447 km) yleisesti
  tunnetuista kaupunkikoordinaateista, joten tätä EI tarvitse pudottaa, mutta
  se on hyvä esimerkki siitä että moni "faktana" esitetty luku artikkelissa
  on lähteetön.
- **LRT/kevytraideliikenteen tiedot (Astana Light Metro, avattu 16.5.2026,
  Tarlan Astana -uudelleennimeäminen 2.7.2026)** — ei käytetty koosteessa,
  mutta jos näitä käytetään myöhemmin muissa jaksoissa, huomaa että osiossa
  on ristiriitaisia/sekavia päivämääriä (mm. "16 May 2026" mainitaan tekstissä
  join edellä puhutaan vielä rakenteilla-olevasta toisesta vaiheesta) — nämä
  ovat juuri sitä tuoreinta, mahdollisesti AI-generoitua sisältöä joka
  kaipaisi ulkopuolista lähdettä (esim. Kazinform/Tengrinews suoraan).
- **"Astana is a predominantly Kazakh-speaking city... 91,2–92%"** ja
  vastaavat kielitilastot (Education-osio) — lähteinä pelkät informburo.kz/
  ca-barometer.org -linkit ilman `{{cite}}`-templaattia edes; ei käytetty
  koosteessa, hyvä niin.
- **"Astana is the leader in the CIS region on the Global Financial Centres
  Index... in 2022"** ja muut talousluvut (Economy-osio) — ei käytetty
  koosteessa, hyvä niin, mutta jos kirjoittaja haluaa laajentaa taloussisältöä
  myöhemmin, nämä on tarkistettava GFCI:n omalta sivulta.

Kaikki muu käytetty aines (arkkitehtuurin infoboksit, nimihistoria,
säätaulukko, koordinaatit, Uudisviljelysten kampanjan perusfaktat 1953–1961)
sai riippumattoman vahvistuksen erillisistä, ei-AI-tagatuista artikkeleista
eikä niitä tarvitse pudottaa.
