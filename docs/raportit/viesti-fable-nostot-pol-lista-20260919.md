# Viesti Fablelle: Puolan hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-pol`
(pohja origin/main bc0996c4, v1960). **27 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu. Vaiheessa 2 mukaan tulevat myös rahavisat (~10 noston kenttä `visa`).

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli taulukossa. Yhtään lukua ei ole arvattu.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs` `laudat`, `osuuLehteen('POL')`): **27/27 osuu Puolan fokuslehteen.**
- **Pelikaupungit: Varsova ja Krakova** (`cityCountry`). Gdańsk, Poznań, Wrocław, Łódź ym. eivät ole pelikaupunkeja. Lähin ehdotus Varsovaan on Łowicz (37,0), Krakovaan Kalwaria Zebrzydowska (12,0);
  raja `KAUPUNGIN_KOHDALLA_SADE` on 7, joten yksikään ei ole kaupungin kohdalla. (Ojców pudotettu: 7,3 Krakovasta.)
- **Puolassa on jo 25 nostoa** (`nostojenKarttapaikat()`): Rysy, Śnieżka, Itämeri, Veiksel, Odra, **Malborkin linna, Jasna Góra (= Częstochowa), Wieliczka, Toruń (piparkakut), Wrocław, Gniezno,
  Zamość, Westerplatte, Elblągin kanava, Krzemionki, Auschwitz-Birkenau** sekä Krakovan ja Varsovan syvennykset ja kolme skandaalia (Szczerbiec, Wałbrzychin kultajuna, Prokoszin kronikka).
  Siksi **Wieliczka, Malbork, Częstochowa ja Toruń eivät ole listalla** (jo mukana), eikä Gdańskia (ei pelikaupunki, mutta Westerplatte 0 ja Gdańsk suurkaupunki). Leirit jätetty pois ohjeen mukaan.
  Lähin ehdotus nykyiseen: **Zakopane – Rysy 6,9 (alle rajan 7; Tatra-kulttuuri, jonka pyysit; Fable voi hyväksyä kuten Kinderdijkin 6,1)**, Pszczyna – Auschwitz 8,0, Ciechocinek – Veiksel 8,3;
  muut ≥ 11,7.
- Ehdotukset ovat keskenään ≥ 15 lautayksikön päässä toisistaan (pienin Zakopane – Dunajecin rotko 16,7), joten nimiölimityksen riski on pieni.
- Ei suuria kaupunkeja: Varsova, Krakova, Gdańsk, Poznań, Wrocław, Katowice, Lublin, Szczecin, Bydgoszcz jätetty pois. Mukana on pieniä kaupunkeja ja paikkoja, joiden merkitys on kohde:
  Łódź (tekstiiliteollisuus 1870-luvulla; suurkaupunki, mutta pyysit), Legnica (Liegnitzin taistelu 1241), Sandomierz.
- Tyypit ovat pelin oman `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / saari / jarvi / meri / joki; muut historia, kulttuuri, ruoka, kauppa, tekniikka). Metsälle ja fenille ei ole omaa tyyppiä:
  Białowieża `kulttuuri`, Biebrza `joki`.
- **1873-näkökulma (Puolan jaot)**: nappi-alaotsikoissa mainitaan tarvittaessa hallitsija 1873: Venäjän keisarikunta (Łódź, Łowicz, Kazimierz Dolny, Sandomierz, Ciechocinek, Białowieża, Biebrza),
  Preussi/Saksan keisarikunta (Grunwald eli Tannenberg, Frombork, Legnica, Bolesławiec, Tarnowskie Góry, Pszczyna, Kórnik, Kartuzy, Wolin, Słowiński, Biskupin, Szczeliniec) ja Itävalta-Unkari/Galicia
  (Zakopane, Żywiec, Kalwaria Zebrzydowska, Bochnia, Łańcut, Tarnica, Dunajecin rotko). Valtiollista Puolaa ei ole, mutta kansakunta elää.
- Lähdesääntö: artikkelien johdanto-osat on luettu ja avainväitteet grep-tarkistettu koko artikkelista. Zalipie (maalatut talot; artikkeli vain 165 merkkiä) ja Kruszwica (hiirentorni; artikkeli ei mainitse) pudotettiin,
  Świdnican rauhankirkot (6,0 Wałbrzychin kultajunasta ja artikkelin koordinaatit puuttuvat) pudotettiin. Vaiheessa 2 kirjoitan tekstit vain artikkelin tukemista väitteistä ja kirjaan poikkeamat.

## Lista

### Luonto (8)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-bialowieza | Białowieżan metsä | kulttuuri | 52,75 / 23,95 | Białowieża Forest | Euroopan viimeisiä alkumetsiä ja yli 800 visentin koti; Unescon perintö. **Renkaan ulkopuolella 2,7.** |
| 2 | hahmotelma-biebrza | Biebrzan suot | joki | 53,4666 / 22,6613 | Biebrza National Park | Puolan suurin kansallispuisto, laajat luonnontilaiset suot, hirvet ja majavat. |
| 3 | hahmotelma-sniardwy | Śniardwy | jarvi | 53,7667 / 21,75 | Śniardwy | Puolan suurin järvi Masurian järviylängöllä. |
| 4 | hahmotelma-slowinski | Słowińskin dyynit | meri | 54,7033 / 17,3069 | Slovincian National Park | Itämeren liikkuvat hiekkadyynit Łeban lähellä; Unescon biosfäärialue (1977). Renkaan reunalla 0,5. |
| 5 | hahmotelma-wolin | Wolin | saari | 53,9333 / 14,45 | Wolin National Park | Itämeren saaren kansallispuisto: Gosańin ja Kawczan jyrkänteet ja visenttitarha. |
| 6 | hahmotelma-tarnica | Tarnica | vuori | 49,0694 / 22,7381 | Tarnica | Bieszczadyn korkein huippu Puolan kaakkoisnurkassa. Renkaan reunalla 1,1. |
| 7 | hahmotelma-dunajec-gorge | Dunajecin rotko | joki | 49,4133 / 20,4293 | Dunajec River Gorge | Pieninien vuorten läpi kulkeva rotko Puolan ja Slovakian rajalla. Renkaan reunalla 1,5. |
| 8 | hahmotelma-szczeliniec | Szczeliniec Wielki | vuori | 50,4839 / 16,3439 | Szczeliniec Wielki | Pöytävuorten korkein huippu Sudeeteilla, hiekkakivimuodostelmia. Renkaan reunalla 1,6. |

### Historia (6)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 9 | hahmotelma-grunwald | Grunwaldin taistelu | historia | 53,4861 / 20,1247 | Battle of Grunwald | 15.7.1410: Puolan ja Liettuan liittoutuneet löivät Saksalaisen ritarikunnan (Tannenberg 1873: Itä-Preussi). |
| 10 | hahmotelma-frombork | Frombork | historia | 54,35 / 19,6833 | Frombork | Kopernikuksen kotikaupunki ja tuomiokirkko Veikselinlahdella (1500-luvun alku). |
| 11 | hahmotelma-biskupin | Biskupin | historia | 52,7883 / 17,7444 | Biskupin | Pronssikauden lopun linnoitettu asutus (Lusatian kulttuuri, 700-luku eaa.), rekonstruoitu. |
| 12 | hahmotelma-legnica | Legnican taistelu | historia | 51,1453 / 16,2228 | Battle of Legnica | 1241: mongolien voitto Slesian Henrik II:sta; rajakohta Eurooppaan. |
| 13 | hahmotelma-kalwaria | Kalwaria Zebrzydowska | historia | 49,8667 / 19,6833 | Kalwaria Zebrzydowska | Pyhiinvaellus- ja luostarikompleksi, Kristuksen kärsimystien jäljennös; Unescon perintö. |
| 14 | hahmotelma-sandomierz | Sandomierz | historia | 50,6833 / 21,75 | Sandomierz | Vanhakaupunki Veikselin rannalla; mongolien hyökkäykset 1200-luvulla; kansallismonumentti 2017. |

### Kulttuuri ja ruoka (9)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 15 | hahmotelma-zakopane | Zakopane | kulttuuri | 49,3 / 19,95 | Zakopane | Tatran juurella, gorali-kulttuurin keskus ja Puolan "talvipääkaupunki". **Rysy 6,9.** |
| 16 | hahmotelma-kazimierz | Kazimierz Dolny | kulttuuri | 51,3222 / 21,9475 | Kazimierz Dolny | Veikselin rannan pikkukaupunki, 1500-luvun viljakaupan kulta-aika. |
| 17 | hahmotelma-zywiec | Żywiec | ruoka | 49,6892 / 19,2058 | Żywiec | Habsburgien Żywiecin panimo (perustettu 1852). |
| 18 | hahmotelma-kartuzy | Kartuzy | kulttuuri | 54,3333 / 18,2 | Kartuzy | Kašubian kulttuurin keskus, kartusiaaniluostari (n. 1380). |
| 19 | hahmotelma-lowicz | Łowicz | kulttuuri | 52,1 / 19,9333 | Łowicz | Primaksen (arkkipiispan) residenssi; kansanperinteestä tunnettu kaupunki. |
| 20 | hahmotelma-ciechocinek | Ciechocinek | kulttuuri | 52,8833 / 18,7833 | Ciechocinek | Kylpyläkaupunki, maailman pisimmät suolavesitornit (graduation towers). |
| 21 | hahmotelma-kornik | Kórnikin linna | kulttuuri | 52,2439 / 17,0906 | Kórnik Castle | Linna ja arboretum Wielkopolskassa (Działyńskien suku). |
| 22 | hahmotelma-lancut | Łańcutin linna | kulttuuri | 50,0685 / 22,2346 | Łańcut Castle | Lubomirskien ja Potockien suvun linnakompleksi puistoineen. |
| 23 | hahmotelma-pszczyna | Pszczynan linna | kulttuuri | 49,978 / 18,9403 | Pszczyna Castle | Slesian linna, 1200-luvun goottilainen ja 1600-luvun renessanssi. |

### Tekniikka ja kauppa (4)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 24 | hahmotelma-lodz | Łódź | kauppa | 51,7769 / 19,4547 | Łódź | Kaupunki, jonka tekstiiliteollisuus kasvaa 1850-luvulta (1873: Venäjän Puolan "Manchester"). |
| 25 | hahmotelma-bochnia | Bochnian suolakaivos | tekniikka | 49,9692 / 20,4175 | Bochnia Salt Mine | 1248 perustettu, yksi maailman vanhimmista suolakaivoksista (Wieliczkan sisarkaivos). |
| 26 | hahmotelma-tarnowskie-gory | Tarnowskie Górin hopeakaivos | tekniikka | 50,4444 / 18,8583 | Tarnowskie Góry | Historiallinen hopeakaivos, Unescon perintö; nimi tulee sanasta "kaivos". |
| 27 | hahmotelma-boleslawiec | Bolesławiec | kauppa | 51,2667 / 15,5667 | Bolesławiec | Vanhakaupunki, tunnettu pitkästä keramiikkaperinteestään. |

## Huomiot Fablelle

1. **Renkaan ulkopuolella Białowieża (2,7)**; renkaan reunalla Słowiński 0,5, Tarnica 1,1, Dunajecin rotko 1,5, Szczeliniec 1,6, Wolin 2,9. Muut renkaan sisällä (etäisyyksiä: Frombork 5,1, Zakopane 4,6, Żywiec 6,8).
2. **Zakopane – Rysy 6,9** on ainoa alle 7:n pari. Vaihtoehto: pudota Zakopane ja ota tilalle Nowy Sącz tai Wadowice; sano, jos haluat.
3. **Herkät kohteet**: ei sotaleirejä; Grunwald ja Legnica ovat keskiajan taisteluja ilman verta kuvissa (tekstissä asiallinen); Kalwaria on uskonnollinen pyhiinvaelluskohde.
4. **Kuvariskit**: Biebrzan suot ja Bolesławiecin keramiikka voivat olla vaikeita; varasuunnitelma Wadowice tai Nowy Sącz (kulttuuri), Kalisz (historia), Lidzbark Warmiński (linna), jos kaksi kelvollista kuvaa ei löydy.
5. **Rahavisat**: vaiheessa 2 kirjoitan ~10 visaa (joka kolmas nosto, eri tyyppejä, 4 vaihtoehtoa, vastaus noston tekstistä).
