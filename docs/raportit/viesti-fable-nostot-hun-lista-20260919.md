# Viesti Fablelle: Unkarin hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-hun`
(pohja origin/main 883f09fb, v1961). **25 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu. Vaiheessa 2 mukaan tulevat myös rahavisat (~10 noston kenttä `visa`).

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli taulukossa. Yhtään lukua ei ole arvattu.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs` `laudat`, `osuuLehteen('HUN')`): **25/25 osuu Unkarin fokuslehteen.** **Ipolytarnóc on karkean HUN-renkaan ulkopuolella (0,5 lautayksikköä)**; kaikki muut sisällä, reunalla Esztergom 0,8, Villány 1,9, Sopron 2,7, Gyula 2,9, Mohács 3,2, Fertőd 3,3.
- **Pelikaupunki: Budapest** (`cityCountry`). **HUOM: Budapestin merkki pelin laudalla (x 6492,7, y 1519,3) on noin 33 lautayksikköä kaakkoon todellisesta paikastaan** (`laudat(19,04 E, 47,50 N)` = 6468, 1497,5) — se osuu Kecskemétin todellisen sijainnin kohdalle (6489,7, 1522,4). Seuraus: **Kecskemét on vain 4,3 päässä kaupungin merkistä** (raja 7 → kaupungin kohdalla) ja pudotettu; Budapestin todellisen sijainnin ympärillä olevia kohteita (Szentendre, Gödöllő) tämä ei rajoita. Onko merkin siirto tarkoituksellinen? Kerro, jos haluat sen korjattavan.
- **Unkarissa on jo 23 nostoa** (`nostojenKarttapaikat()`): Debrecen, Szeged, Pécs, Eger, Győr (kaupunkiriveinä), Kékes, Istállós-kő, Írott-kő, Tonava, Tisza, Dráva, **Balaton, Hortobágy, Tokaj, Pannonhalma, Aggtelekin luolat, Hollókő** sekä Budapestin syvennykset ja kolme skandaalia (Kruunuvarkaus 1440, Elmyr de Hory, Seuson hopeat).
  Siksi pyytämäsi **Balaton, Tokaj, Hortobágy, Eger, Pécs, Pannonhalma, Hollókő ja Aggtelek ovat jo pelissä eivätkä ole listalla** (Szeged-paprika: Szeged on jo kaupunkirivinä, paprikakaupunki Kalocsa on listalla; puszta ja csikósit: Hortobágy on jo, Kiskunságin puszta on listalla).
  Uutta pyytämistäsi: Esztergom, Szentendre, Herend.
- **Lähimmät nykyisiin (lautayksikköä)**: **Szentendre – Tonava 3,5 (alle rajan 7)**, Mezőkövesd – Eger 7,7, Diósgyőr – Istállós-kő 8,0, Esztergom – Kruunuvarkaus 8,2, Badacsony – Balaton 8,7; muut ≥ 9,4. Nostot keskenään ≥ 8,7 (Hévíz – Sümeg 8,7 pienin).
- **Pudotettu liian lähellä olevana**: Tihany (5,2 Balatonista), Balatonfüred (5,7), Keszthely (2,0 Hévízistä), Zemplén (6,0 Sárospatakista), Székesfehérvár (6,3 Velencestä, kaupunki), Kecskemét (4,3 Budapestin merkistä), Paks (4,7 Kalocsasta), Kőszeg (4,4 Írott-kőltä), Siklós (5,3 Villányista), Zirc (6,8 Herendistä), Szilvásvárad (Istállós-kő). Visegrád on Kruunuvarkaus 1440 -noston paikka. Nagycenk pudotettu, koska artikkeli on vain 460 merkkiä eikä tue tekstiä.
- Ei suuria kaupunkeja: Budapest (pelikaupunki), Debrecen, Szeged, Miskolc, Pécs, Győr, Székesfehérvár jätetty pois. Mukana on pieniä kaupunkeja ja paikkoja, joiden merkitys on kohde: Esztergom, Sopron, Szentendre, Kalocsa, Villány, Mezőkövesd, Gyula, Sárospatak.
- Tyypit ovat pelin oman `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / saari / jarvi / meri / joki; muut historia, kulttuuri, ruoka, kauppa, tekniikka). Puszta ja fossiilikohde eivät ole omia tyyppejä: Kiskunság `kulttuuri`, Ipolytarnóc `historia` (esihistoria).
- **1873-näkökulma (Itävalta-Unkarin kaksoismonarkia vuodesta 1867)**: nappi-alaotsikoissa Unkarin kuningaskunta ja Franz Joseph tarvittaessa; Buda, Pest ja Óbuda yhdistyvät Budapestiksi 17.11.1873 (kaupungin oma asia). Maakohteet: Hévíz kylpylä, Sárospatak, Mohács 1526 ja Szigetvár 1566 (Osmanien valta), Gödöllön palatsi (Franz Joseph ja Sisi kesäasunto 1867 alkaen).
- Lähdesääntö: artikkelien johdanto-osat on luettu ja avainväitteet grep-tarkistettu koko artikkeleista. Vaiheessa 2 kirjoitan tekstit vain artikkelin tukemista väitteistä ja kirjaan poikkeamat.

## Lista

### Luonto (6)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-heviz | Hévízin järvi | jarvi | 46,7872 / 17,1931 | Lake Hévíz | Euroopan suurin uitavissa oleva lämpöjärvi, jonka vesi nousee kahdesta lähteestä 38 m syvästä luolasta. |
| 2 | hahmotelma-velence | Velencei-tó | jarvi | 47,2083 / 18,6 | Lake Velence | Unkarin kolmanneksi suurin luonnonjärvi (26 km², kolmannes ruovikkoa). |
| 3 | hahmotelma-tiszato | Tisza-tó | jarvi | 47,6 / 20,6667 | Lake Tisza | Unkarin suurin tekojärvi, Kisköre-pato 1973. |
| 4 | hahmotelma-kiskunsag | Kiskunságin puszta | kulttuuri | 46,8833 / 19,4 | Kiskunság National Park | Vuonna 1975 perustettu kansallispuisto, Unescon biosfäärialue; puszta, jossa vanhaa karjanhoitoperinnettä elvytetään vuosittaisissa tapahtumissa, ja Fülöpházan hiekkadyynit. |
| 5 | hahmotelma-badacsony | Badacsony | vuori | 46,8035 / 17,4958 | Badacsony | Balatonin pohjoisrannan basalttivuori ja viinialue, harvinaisten kasvien elinympäristö. |
| 6 | hahmotelma-gemenc | Gemenc | joki | 46,2531 / 18,8865 | Gemenc | Szekszárdin ja Bajan välinen tulvametsä, Tonavan ainoa jäljellä oleva vuorovesialue Unkarissa. |

### Historia (10)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 7 | hahmotelma-esztergom | Esztergomin basilika | historia | 47,7989 / 18,7364 | Esztergom Basilica | Unkarin suurin kirkko, arkkipiispan istuin Tonavan mutkassa. Renkaan reunalla 0,8. |
| 8 | hahmotelma-mohacs | Mohács | historia | 45,996 / 18,6799 | Mohács | 1526 ja 1687 taistelut: Osmanien vallan alku ja loppu Unkarissa. |
| 9 | hahmotelma-szigetvar | Szigetvár | historia | 46,0475 / 17,7994 | Szigetvár | Vuoden 1566 piiritys, Suleiman Suuren viimeinen sotaretki. |
| 10 | hahmotelma-sarospatak | Sárospatak | historia | 48,319 / 21,5664 | Sárospatak | Andreas II:n linna, pyhän Elisabetin syntymäpaikka; Perényin ja Dobón suvut. |
| 11 | hahmotelma-sopron | Sopron | historia | 47,6849 / 16,583 | Sopron | "Leghűségesebb város" (uskollisin kaupunki) 1921 kansanäänestyksen jälkeen. |
| 12 | hahmotelma-jak | Ják | historia | 47,1393 / 16,5824 | Ják | Unkarin parhaiten säilynyt romaaninen kirkko, benediktiiniluostarin kirkko. |
| 13 | hahmotelma-tata | Tata | historia | 47,6526 / 18,3238 | Tata, Hungary | Lackfien linna, Matthias Corvinuksen renessanssiin muutettu; kastellaani 1526. |
| 14 | hahmotelma-diosgyor | Diósgyőrin linna | historia | 48,1 / 20,6833 | Diósgyőr | Kuninkaiden ja kuningattarien suosikkiloma-asunto (Miskolcin osa). |
| 15 | hahmotelma-sumeg | Sümegin linna | historia | 46,9825 / 17,2825 | Sümeg Castle | 1200-luvulla Béla IV:n rakennuttama linna Linnanmäen huipulla, 30 km Balatonilta pohjoiseen. |
| 16 | hahmotelma-ipolytarnoc | Ipolytarnóc | historia | 48,2365 / 19,6264 | Ipolytarnóc | "Esihistoriallinen Pompeji": 17–23 miljoonaa vuotta vanhat fossiilit. Renkaan ulkopuolella 0,5. |

### Kulttuuri ja ruoka (8)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 17 | hahmotelma-szentendre | Szentendre | kulttuuri | 47,7044 / 19,0686 | Szentendre | Taiteilijoiden ja museoiden kaupunki (Unkarin ulkoilmamuseo) Tonavan rannalla. **Tonava 3,5.** |
| 18 | hahmotelma-kalocsa | Kalocsa | ruoka | 46,5335 / 18,9858 | Kalocsa | Arkkipiispan istuin, jonka asukkaat viljelevät paprikaa; kalocsalaiset koruompeleet. |
| 19 | hahmotelma-villany | Villány | ruoka | 45,8695 / 18,4556 | Villány | Punaviineistä kuuluisa kaupunki Baranyassa. Renkaan reunalla 1,9. |
| 20 | hahmotelma-fertod | Fertőd (Eszterháza) | kulttuuri | 47,6187 / 16,8814 | Fertőd | Ruhtinas Nikolaus I Esterházyn 1760-luvulla rakennuttama palatsi. |
| 21 | hahmotelma-mezokovesd | Mezőkövesd | kulttuuri | 47,8167 / 20,5833 | Mezőkövesd | Matyó-kansan kotiseutu, 1800-luvun kaupunkimaiset talot ja kansantaiteilijat. |
| 22 | hahmotelma-godollo | Gödöllön palatsi | kulttuuri | 47,6 / 19,3667 | Gödöllő | Grassalkovichien palatsi, josta tuli Franz Josefin ja Sisin kesäasunto. |
| 23 | hahmotelma-gyula | Gyula | kulttuuri | 46,65 / 21,2833 | Gyula, Hungary | Keskiaikainen linna ja lämpökylpylä Békésin maakunnassa. |
| 24 | hahmotelma-opusztaszer | Ópusztaszer | kulttuuri | 46,4895 / 20,0962 | Ópusztaszer National Heritage Park | Kansallinen perintöpuisto (1982), jossa Feszty-panoraama unkarilaisten maahantulosta (1894). |

### Kauppa (1)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 25 | hahmotelma-herend | Herendin posliini | kauppa | 47,1328 / 17,7514 | Herend Porcelain Manufactory | Vuonna 1826 perustettu maailman suurimpia posliinitehtaita, käsinmaalattu ja kullattu. |

## Huomiot Fablelle

1. **Budapestin merkki on siirretty ~33 lautayksikköä kaakkoon** (ks. yllä); tästä syystä Kecskemét ja sen ympäristö (Bugac) eivät kelpaa; Bugac 12,9 ja Kiskunságin puiston keskus 13,3 merkistä ovat silti yli 7.
2. **Tyyppejä puuttuu**: Ipolytarnóc (fossiilit) `historia`, Kiskunság (puszta) `kulttuuri` — Fable voi vaihtaa (Hortobágy on nykyisissä `vuori`).
3. **Herkät kohteet (13+)**: Mohács ja Szigetvár ovat taistelu-/piiritysaiheita (teksti asiallinen, ei verta kuvissa); ei sotaleirejä eikä 1900-luvun sotia.
4. **Kuvariskit**: Ipolytarnóc ja Gemenc voivat olla vaikeita; varasuunnitelma Tihany (abbey), Visegrád tai Zirc (Cistercian abbey), jos kaksi kelvollista kuvaa ei löydy.
5. **Rahavisat**: vaiheessa 2 ~10 visaa (joka kolmas nosto, eri tyyppejä, 4 vaihtoehtoa, vastaus noston tekstistä).
