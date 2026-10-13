# Pallokierros Kööpenhamina: ohjaajan suunnitelma

Linjaus: LIIKKUVAT KOHTAUKSET TEHDÄÄN KUIN ELOKUVA (omistaja 9.10.2026) ja KAHDENLAISET KUVAT ESITTELYISSÄ. Laatija: Sisältökirjuri 13.10.2026 (PT:n tilaus: Kööpenhaminan esittely-v2 Lontoon ja Prahan mallilla). Suunnitelma ja sisältö; ääntä ei ole generoitu (omistajan lupa tarvitaan), toteutus LS1, äänet Äänittäjä. Mallina `suunnitelma-lontoo.md` ja `suunnitelma-praha.md`. Koneluettava sisältö: `koopenhamina-kerronta-20261013.json`; faktaliite: `koopenhamina-faktat-20261013.md`; mallidata (esittely-v2-muoto): `proto-3d/_tyo/sisaltokirjuri/koopenhamina-kippi/pallokierros-v2-koopenhamina.json`. Tunnus datassa `koopenhamina`, pelissä `kobenhavn`.

Kierros: 8 pysähdystä, noin 5,2 km, arviolta 6 min. Kertoja kuten Pariisissa, Lontoossa ja Prahassa (William, 3–5 virkettä, kappale alkaa paikan nimellä, vuosiluvut numeroina). **Isoisän 1873-merkintä (Kööpenhamina, kesäkuu 1873, Tivolin teatteri) kuuluu pysäkille 8**; kappale toistaa vain sen, mitä merkinnässä lukee.

**Karttaseppä (KS) määrittää** katse_kaari, silma_m ja katse_suunta; tämä suunnitelma ei keksi niitä. Silmäkorkeuksista on annettu vain liikesäännön (3b) laskukaava ja H, jos H on luotettava.

## 1. Mitä katsojan pitää muistaa

1. **Kööpenhamina on veden ehdoilla rakennettu kauppasatama: Själlannin ja Amagerin välissä kulkee sisäsatama, kanavat ja vanhat vallihaudat kuuluvat kaupunkiin, ja nimikin tarkoittaa kauppiaiden satamaa.**
2. **Kööpenhamina on kuninkaiden kaupunki: Kristian neljäs rakensi Rosenborgin ja Rundetårnin ja aloitti Christianshavnin, Fredrik viides Frederiksstadenin kaupunginosan, ja vallan keskus Christiansborg seisoo yhä saarella, jolle piispa Absalon rakensi linnansa vuonna 1167.**
3. **Kööpenhaminassa sadut ovat paikoissa: Gefjonin taru kertoo Själlannin synnyn, Andersen asui Nyhavnissa ja sai Tivolista aiheen satuunsa, ja Tivoli avattiin jo vuonna 1843.**

Kierroksen tehtävä on jättää kaupungista muistikuva, ei luetella kohteita: sisäsatama näkyy avauksessa ja jokaisessa yläkuvassa (Christianshavn, Nyhavn, Slotsholmen), kuninkaiden kaupunki kulkee läpi (Kristian IV: Christianshavn, Rosenborg, Rundetårn; Fredrik V: Amalienborg), ja sadut sulkevat kierroksen Tivolissa, jossa isoisän merkintä on.

## 2. Reitti ja metrokartta (8 asemaa)

Järjestys on lyhin kierros 8 valitun kohteen kesken (kaikki 40 320 järjestystä laskettu haversinella; lyhin on 5 239 m, ja sama reitti toiseen suuntaan on yhtä lyhyt). Valittu suunta: Christianshavn (Amagerin puoli, tekosaaret ja kanavat) → satama, kuninkaat, valta → Tivoli, koska tarina etenee vedestä kuninkaisiin ja satuihin. `OpasReitti.Lyhin` voi järjestää toisin.

| Nro | Asema (metrokartan nimi) | Q | Siirtymä edelliseltä | Kerronta |
|---|---|---|---|---|
| 1 | Vapahtajan kirkko ja Christianshavn | Q29157 / Q861363 | avauksesta suora lasku (≥ 24 s) | 72 sanaa, ~50 s |
| 2 | Nyhavn | Q943946 | 850 m, lento 23,4 s | 64 sanaa, ~45 s |
| 3 | Amalienborg ja Marmorikirkko | Q211053 / Q1321231 | 483 m, lento 23,4 s | 65 sanaa, ~46 s |
| 4 | Kastellet ja Gefion-suihkulähde | Q221812 / Q952817 | 790 m, lento 23,4 s | 70 sanaa, ~49 s |
| 5 | Rosenborgin linna | Q206101 | 1 190 m, lento 23,4 s | 45 sanaa, ~32 s |
| 6 | Rundetårn | Q1140534 | 521 m, lento 23,4 s | 61 sanaa, ~43 s |
| 7 | Christiansborgin linna | Q940733 | 630 m, lento 23,4 s | 56 sanaa, ~39 s |
| 8 | Tivoli | Q110289 | 775 m, lento 23,4 s | 66 sanaa, ~46 s |

- **Asemien napautus** (omistajan 10.10. korjaus): kaikki asemat napautettavia (≥ 44 pt), seliteteksti koko kohteen ajan.
- **Ei nopeaa lentoa:** pisin väli on Kastellet ja Gefion-suihkulähde → Rosenborgin linna (1 190 m), eikä mikään väli yllä 3 km:iin, joten liikesääntö (enintään yksi nopea lento) ei vaadi tehokeinoa. Jos LS1 haluaa yhden, ainoa järkevä on Kastellet ja Gefion-suihkulähde → Rosenborgin linna.
- **Lyhyin väli:** Nyhavn → Amalienborg ja Marmorikirkko (483 m); kaikki 7 väliä ovat ≥ 483 m eli lentoja (LiukuMaxM 450 m); lyhin 483 m on lähellä rajaa, ja LS1 voi korvata sen ja 521 m:n välin liu'ulla.
- **Koordinaatit:** KAUPUNKIKARTAT.kobenhavn (js/packs/maakartat.js); kaikki 8 pysäkkiä ovat kaupunkikartan kohteita. Gefion-suihkulähde on noin 320–360 m Kastelletista kaakkoon: yksi pysäkki, kaksi Q:ta.
- **Satama ja saaret (maantiede):** avaus (Själland, Amager, sisäsatama), pysäkki 1 (Christianshavnin tekosaaret ja kanavat), pysäkki 4 (Gefjonin taru Själlannin synnystä), pysäkki 7 (Slotsholmen saarena), loppu (Tivolin vallihauta, kolme tekojärveä).

## 3. Kohtauslista (alku- ja lopputilat)

Arvot liikesäännöistä: avausnäkymä 1 100 m / 50°, tavallinen lento 23,4 s, kaari kestää pysähdyksen, esittelykorkeus 0,5–0,7 × H (matalilla kattojen + 10 m), kallistus 64° rakennus / 72° aukio, katu ja alue. Ajat ovat kerronnan arvio (0,70 s/sana). **Silmä- ja katsearvot ovat vain kaava; KS lukitsee.**

| Nro | Kohtaus | Alkutila | Lopputila | Syy olla olemassa | Kerronta |
|---|---|---|---|---|---|
| 1 | Siirtoruutu | tumma latausruutu | avausnäkymä auki | laatat latautuvat piilossa | ei puhetta |
| 2 | Avaus | avausnäkymä 1 100 m / 50°, Christianshavn alakolmanneksessa, sisäsatama ja Själlannin ranta kuvassa | sama, kiertynyt 14° ja 15 % lähempänä | muistettava 1: saaret ja satama | avaus 3 virkettä, ~25 s |
| 3 | Lento → Vapahtajan kirkko ja Christianshavn | avausnäkymä | torni, kallistus 64°, silmä 0,5–0,7 × H (H 90 m: 45–63 m), KS lukitsee | suora lasku ≥ 24 s | pysäkin 1 alku |
| 4 | Pysähdys 1: Vapahtajan kirkko ja Christianshavn | saapuu levosta | kaari ≤ 80° kohti pysäkkiä 2 | muistettava 1 | pysäkki 1, ~50 s; silmä 0,5–0,7 × H (H 90 m: 45–63 m), KS lukitsee |
| 5 | Laskeutuminen: Vapahtajan kirkko ja Christianshavn | pysähdyksen alku | silmä 0,5–0,7 × H (H 90 m: 45–63 m), KS lukitsee, katse pääkohteeseen | omistaja TF 169: matala katse pääkohteeseen | pysäkki 1 virkkeet 1–2 |
| 6 | Lento → Nyhavn | edellisen kehys | Nyhavn, kallistus 72°, silmä kattojen + 10 m (KS lukitsee) | 850 m, 23,4 s | pysäkin 2 alku |
| 7 | Pysähdys 2: Nyhavn | saapuu levosta | kaari ≤ 80° kohti pysäkkiä 3 | muistettava 1 ja 3 | pysäkki 2, ~45 s; silmä kattojen + 10 m (KS lukitsee) |
| 8 | Lento → Amalienborg ja Marmorikirkko | edellisen kehys | Amalienborg ja Marmorikirkko, kallistus 64°, silmä kattojen + 10 m (KS lukitsee) | 483 m, 23,4 s (lyhyt: LS1 voi korvata 10–12 s liu'ulla) | pysäkin 3 alku |
| 9 | Pysähdys 3: Amalienborg ja Marmorikirkko | saapuu levosta | kaari ≤ 80° kohti pysäkkiä 4 | muistettava 2 | pysäkki 3, ~46 s; silmä kattojen + 10 m (KS lukitsee) |
| 10 | Lento → Kastellet ja Gefion-suihkulähde | edellisen kehys | Kastellet ja Gefion-suihkulähde, kallistus 72°, silmä kattojen + 10 m (KS lukitsee) | 790 m, 23,4 s | pysäkin 4 alku |
| 11 | Pysähdys 4: Kastellet ja Gefion-suihkulähde | saapuu levosta | kaari ≤ 80° kohti pysäkkiä 5 | muistettava 1 ja 3 | pysäkki 4, ~49 s; silmä kattojen + 10 m (KS lukitsee) |
| 12 | Lento → Rosenborgin linna | edellisen kehys | Rosenborgin linna, kallistus 64°, silmä kattojen + 10 m (KS lukitsee) | 1 190 m, 23,4 s | pysäkin 5 alku |
| 13 | Pysähdys 5: Rosenborgin linna | saapuu levosta | kaari ≤ 80° kohti pysäkkiä 6 | muistettava 2 | pysäkki 5, ~32 s; silmä kattojen + 10 m (KS lukitsee) |
| 14 | Lento → Rundetårn | edellisen kehys | Rundetårn, kallistus 64°, silmä 0,5–0,7 × H (H 34,8 m: 17–24 m, alaraja kattojen + 10 m), KS lukitsee | 521 m, 23,4 s (lyhyt: LS1 voi korvata 10–12 s liu'ulla) | pysäkin 6 alku |
| 15 | Pysähdys 6: Rundetårn | saapuu levosta | kaari ≤ 80° kohti pysäkkiä 7 | muistettava 2 | pysäkki 6, ~43 s; silmä 0,5–0,7 × H (H 34,8 m: 17–24 m, alaraja kattojen + 10 m), KS lukitsee |
| 16 | Laskeutuminen: Rundetårn | pysähdyksen alku | silmä 0,5–0,7 × H (H 34,8 m: 17–24 m, alaraja kattojen + 10 m), KS lukitsee, katse pääkohteeseen | omistaja TF 169: matala katse pääkohteeseen | pysäkki 6 virkkeet 1–2 |
| 17 | Lento → Christiansborgin linna | edellisen kehys | Christiansborgin linna, kallistus 64°, silmä kattojen + 10 m (KS lukitsee) | 630 m, 23,4 s | pysäkin 7 alku |
| 18 | Pysähdys 7: Christiansborgin linna | saapuu levosta | kaari ≤ 80° kohti pysäkkiä 8 | muistettava 2 | pysäkki 7, ~39 s; silmä kattojen + 10 m (KS lukitsee) |
| 19 | Lento → Tivoli | edellisen kehys | Tivoli, kallistus 72°, silmä kattojen + 10 m (KS lukitsee) | 775 m, 23,4 s | pysäkin 8 alku |
| 20 | Pysähdys 8: Tivoli | saapuu levosta | kehys leijuu | muistettava 3 | pysäkki 8, ~46 s; silmä kattojen + 10 m (KS lukitsee) |
| 21 | Loppu | Tivolin kehys | nousu hitaasti yläkuvaan luoteeseen katsoen, keskusta ja kolme tekojärveä kuvassa | puuttuva lopetus | loppulause ~20 s |

Kierroksen kesto arviolta 6,6 min: kerronta 350 s + avaus 25 s + loppu 20 s, lennot päällekkäin kerronnan kanssa, lisäksi laattaodotukset. Kohteen ensimmäinen virke päättyy saapumishetkellä ±1 s; pysähdys kestää koko kerronnan ja kaari koko pysähdyksen.

## 4. Kertojan käsikirjoitus

**Avaus** (3 virkettä): Tervetuloa Kööpenhaminaan. Ylhäältä kaupunki on matala kattojen ja tornien kenttä Själlannin saaren itärannalla, ja sisäsatama erottaa sen keskustan Amagerin saaren Christianshavnista. Kierros alkaa Christianshavnin kirkontornista, josta avautuu näkymä sataman, kanavien ja koko vanhan kaupungin yli.

**Pysäkki 1: Vapahtajan kirkko ja Christianshavn** (72 sanaa)
Vapahtajan kirkon kierretorni kohoaa Christianshavnin yllä, kaupunginosassa, jonka Kristian neljäs alkoi rakentaa 1600-luvun alussa tekosaarille Själlannin ja Amagerin väliin. Kaupunginosa suunniteltiin hollantilaisten kanavakaupunkien mallin mukaan, ja kanavat hallitsevat sitä yhä, vaikka sisäsatama erottaa sen muusta keskustasta. Tornin huipun suunnitteli Lauritz de Thurah, se valmistui vuonna 1752, ja kierteen esikuvana oli Rooman Sant'Ivon kirkon lyhty. Torni on 90 metriä korkea, ja sen huipulle johtaa noin 400 porrasta, joista viimeiset 150 kiertävät tornia ulkopuolella.

**Pysäkki 2: Nyhavn** (64 sanaa)
Nyhavn on kapea satamakanava, jonka kuningas Kristian viides kaivatti 1670-luvulla Kongens Nytorvilta satamaan, jotta laivat pääsivät purkamaan lastinsa keskelle kaupunkia. Vanhin yhä seisova talo, numero 9, on vuodelta 1681. Pitkään kanavan varsi oli merimiesten, oluen ja huonomaineisen yöelämän aluetta. Hans Christian Andersen asui talossa numero 20 vuodesta 1834 vuoteen 1838, ja hänen ensimmäiset satunsa ilmestyivät sinä aikana. Kaikkiaan hän asui kolmessa kanavan varren talossa.

**Pysäkki 3: Amalienborg ja Marmorikirkko** (65 sanaa)
Amalienborg näkyy ylhäältä neljänä samanlaisena palatsina, jotka ympäröivät kahdeksankulmaista aukiota. Palatsit rakennettiin 1700-luvun puolivälissä neljälle aatelissuvulle, ja kuninkaallinen perhe asettui sinne vuonna 1794, kun Christiansborg paloi. Aukion keskellä seisoo kuningas Fredrik viidennen ratsastajapatsas, ja aukion akseli osoittaa länteen Marmorikirkolle, jonka kupolin halkaisija on 31 metriä. Kirkon peruskivi laskettiin vuonna 1749, mutta rakennus seisoi yli sata vuotta keskeneräisenä rauniona, ja se vihittiin käyttöön vasta vuonna 1894.

**Pysäkki 4: Kastellet ja Gefion-suihkulähde** (70 sanaa)
Kastellet näkyy ylhäältä viisikulmaisena tähtenä, jonka kulmissa ovat bastionit ja jota kiertävät vesihaudat. Linnoitus rakennettiin 1660-luvulla kuningas Fredrik kolmannen aikana, ja hollantilainen insinööri Henrik Rüse oli mukana sen suunnittelussa. Se on yhä sotilasaluetta, mutta samalla yleinen puisto. Aivan vieressä on Gefion-suihkulähde, jossa jumalatar Gefjon ajaa neljää härkää, jotka ovat hänen poikiaan. Tarun mukaan hän kynti niillä yhdessä yössä Ruotsista irti Själlannin saaren, jolla Kööpenhamina sijaitsee, ja suihkulähde paljastettiin vuonna 1908.

**Pysäkki 5: Rosenborgin linna** (45 sanaa)
Rosenborgin linna on kuningas Kristian neljännen punatiilinen hollantilaistyylinen renessanssilinna, jonka rakentaminen alkoi vuonna 1606 puutarhan huvilana. Linnaa ympäröivä Kuninkaan puutarha on kaupungin vanhimpia puistoja. Linnan alla olevassa aarrekammiossa säilytetään Tanskan kruununjalokiviä ja kruununinsignioita. Kristian neljäs kuoli linnassa vuonna 1648. Linnan vieressä on kuninkaallisen henkivartiokaartin kasarmi.

**Pysäkki 6: Rundetårn** (64 sanaa)
Rundetårn eli Pyöreä torni kohoaa vanhassa keskustassa, ja kuningas Kristian neljäs rakennutti sen vuodesta 1637 vuoteen 1642. Se kuului Trinitatis-kokonaisuuteen, johon tuli opiskelijoiden kirkko, yliopiston kirjasto ja tähtitorni. Huipulle ei johda portaita vaan yli seitsemän kierroksen ramppi, jota pitkin hevoset ja vaunut saattoivat kuljettaa kirjoja ja raskaita mittalaitteita. Rampin kerrotaan palvelleen tsaari Pietari Suurta, joka ratsasti sen ylös hevosella vuonna 1716.

**Pysäkki 7: Christiansborgin linna** (56 sanaa)
Christiansborgin linna hallitsee Slotsholmenin saarta, jota sisäsatama ja kanavat kiertävät. Saarelle piispa Absalon rakensi linnan vuonna 1167, ja sen rauniot ovat nykyisen palatsin alla. Kaksi aiempaa Christiansborgia tuhoutui tulipalossa vuosina 1794 ja 1884, ja nykyinen, kolmas, valmistui vuonna 1928 Thorvald Jørgensenin suunnitelmien mukaan. Palatsissa kokoontuu Tanskan parlamentti, ja siellä toimivat myös korkein oikeus ja pääministerin virasto.

**Pysäkki 8: Tivoli** (67 sanaa)
Tivoli avattiin 15. elokuuta 1843 kaupungin linnoitusten ulkopuolelle, ja puiston järvi on jäänne vanhasta vallihaudasta. Perustaja Georg Carstensen sai tarun mukaan kuninkaan luvan sanomalla, ettei huvitteleva kansa ajattele politiikkaa. Hans Christian Andersen vieraili puistossa vuonna 1843 ja sai siitä aiheen satuunsa Satakieli. Isoisäsi istui kesäkuussa 1873 Tivolin teatterissa ja katsoi, kuinka palvelija piilotti paistin isännältään, eikä sanaakaan lausuttu, ja hänen vieressään tanskalainen poika nauroi samoissa kohdissa.

**Loppu**: Kierros päättyy Tivoliin vanhan vallihaudan rannalle, ja kaupungin länsilaitaa kiertää kolmen tekojärven jono, joka oli ennen osa sen puolustusta. Satoja kilometrejä pyöräteitä halkoo kaupunkia, jonka nimi tarkoittaa kauppiaiden satamaa.

## 5. Pysäkkien tekijänoikeus- ja suojatarkastus

PT:n sääntö (13.10.2026): kohde pois, jos suunnittelija tai taiteilija on elossa tai kuollut vuonna 1956 tai myöhemmin; Tanskan FoP kattaa rakennukset mutta ei veistoksia (suojatarkastus-euroopan-kaupungit-20261011.md). Jokainen pysäkki ja kappaleessa mainittu teos tarkistettu:

| Pysäkki | Rakennus tai teos ja tekijä (k.) | Suoja |
|---|---|---|
| 1 Vapahtajan kirkko, Christianshavn | kirkko Lambert van Haven (1600-luvun loppu), huippu Lauritz de Thurah (k. 1700-luvulla, 1752); Christianshavn 1600-luvun kaupunkisuunnitelma | vapaa |
| 2 Nyhavn | kanava 1670-luvulta, talot 1600–1700-luvuilta, ei yksittäistä tekijää; Muistoankkuri (1951) ja Inderhavnsbroen (2016) jätetty kuvan ulkopuolelle | vapaa (pääaihe) |
| 3 Amalienborg ja Marmorikirkko | palatsit Nicolai Eigtved (k. 1754), ratsastajapatsas J.-F.-J. Saly (k. 1776), kolonnadi C. F. Harsdorff (k. 1799), Marmorikirkko Meldahl (k. 1908), Jardin (k. 1799) (Karttasepän suojatarkastus 13.10.); Amaliehaven (1983, Pomodoro) ja Opera jätetty kuvan ulkopuolelle | vapaa |
| 4 Kastellet ja Gefion-suihkulähde | linnoitus 1660-luku (Rüse); Gefion Anders Bundgaard (1864–1937, Lex), paljastettu 1908; PIENI MERENNEITO ei mukana | vapaa (Bundgaardin suoja päättyi 2007) |
| 5 Rosenborgin linna | Kristian IV:n linna, Hans van Steenwinckel nuorempi ja Bertel Lange (1600-luku) | vapaa |
| 6 Rundetårn | Hans van Steenwinckel nuorempi (kuoli ennen valmistumista 1642) | vapaa |
| 7 Christiansborgin linna | Thorvald Jørgensen (1867–1946), valmistunut 1928; Absalonin linna 1167 | vapaa (suoja päättyi 2016) |
| 8 Tivoli | puisto 1843 (Georg Carstensen k. 1857); Pantomiiniteatteri (1874, Vilhelm Dahlerup k. 1907) ei kappaleessa; ei suojattuja teoksia pääaiheena | vapaa |

### Poistetut ja rajatut kohteet syineen

| Kohde | Syy |
|---|---|
| Pieni merenneito | Edvard Eriksen k. 1959, suoja voimassa 2029 asti; Tanskan FoP ei kata veistoksia (PT 13.10.). Pois kuvasta, kerronnasta ja reitiltä; Kastellet–Gefion-kehys ei käänny Langelinielle. |
| Oopperatalo (Holmen) | Henning Larsen (k. 2013), suojassa. Ei mainita akselilla, ei kuvaa Vapahtajan kirkon tornista itään. |
| Musta Timantti (Kuninkaallinen kirjasto) | Schmidt Hammer Lassen (1999), suunnittelijat elossa; Slotsholmenin rannalla, pois Christiansborg-kehyksestä. |
| Superkilen, Cykelslangen, 8-talo | BIG / Topotek1 / Superflex, Dissing+Weitling: elävät tekijät. Pyöräily on mukana vain sanana, ei Cykelslangenina. |
| Tivolin moderni taide, konserttisali (1956), suihkulähteet | tekijät elossa tai k. 1956 tai myöhemmin tai epäselvät. Kappale 8 ei kuvaa niitä. |
| Rutschebanen (1914) | rakentaja Valdemar Lebech, kuolinvuosi tuntematon; ei mukana vaikka lähteet olisivat riittäneet. |
| Rådhuspladsen ja Kongens Nytorv | Karttasepän kippi-ehdotuksen kohteita; ei valittu (Rådhus itse: Martin Nyrop k. 1921, vapaa), koska aukion ympäristö on täynnä 1900-luvun suojattuja rakenteita (Industriens Hus 1979, metroasemat, H. C. Andersenin patsas 1961, neonmainokset). Nytorvin patsaan kopio: Utzon-Frank k. 1955, vapaa vasta 1.1.2026. |
| Børsen | paloi huhtikuussa 2024, jälleenrakennuksessa; ei näytettävää ylhäältä. |
| Amaliehaven, Inderhavnsbroen, Skuespilhuset | Pomodoro (k. 2025), 2016 silta, Lundgaard & Tranberg 2008: kuvan ulkopuolelle. |
| Christiania | seinämaalaukset elävien tekijöiden: kuvan ulkopuolelle. |
| Disneyn vierailu 1951, 'Euroopan vanhin tähtitorni' (Rundetårn) -väite | väitteet jätetty pois (ks. faktaliite). |

## 6. Kuvat

Tarinakuvia ja lisäkuvia ei ole tässä erässä valittu. Tarvitaan erillinen Commons-kierros (vain PD / CC0 / CC BY, tarkistus API:lla ja silmin). Varoitukset kuvanvalitsijalle: Tanskan FoP kattaa vain rakennukset, joten veistos (Gefion, Fredrik V, Pieni merenneito) ei saa olla kuvan pääaihe ennen kuin tekijän suoja on tarkistettu (Gefion ja Saly vapaita); älä käytä merenneitokuvia; Tivolin kuvissa ei suihkulähteitä tai moderneja installaatioita.

## 7. Faktat ja laatu

Jokainen väite kahdesta lähteestä (Wikipedia + Lex tai kohteen oma tai matkasivusto), luettu itse 13.10.2026; liite `koopenhamina-faktat-20261013.md`. Ristiriitaiset jätetty pois: Tornien ja linnojen rakennusvuodet (Rosenborg 1606–1634 vs 1624), Christiansborgin tornin korkeus (106 vs 85 m), Frederiksstadenin perustamisvuosi (1748/1749), ratsastajapatsaan pystytys (1768/1771), Christianshavnin perustamisvuosi, Rundetårnin 'Euroopan vanhin toimiva tähtitorni'. Yhden lähteen tai matkaoppaan varaan jäävät: Vapahtajan kirkon portaat (400/150, Wikipedia + Storyhunt), Andersenin asuminen Nyhavn 20:ssä (Wikipedia + routesnorth), Pietari Suuren ratsastus 1716 (Wikipedia + Storyhunt, 'kerrotaan'), Tivolin 'ei politiikkaa' -tarina (Wikipedia + CSM, 'tarun mukaan'). Isoisän merkintä on kaanon.

## 8. Toteutus ja avoimet kysymykset

1. **Karttaseppä:** katse_kaari, silma_m, katse_suunta kullekin pysäkille (Rosenborg ja Christiansborg ovat matalia: kattojen + 10 m); Gefion–Kastellet-kehys ilman Pientä merenneitoa.
2. **LS1:** kohtaukset, metrokartta (8 asemaa), kuvien ajoitus virkkeittäin; lauseajat Äänittäjän tallenteesta.
3. **Äänittäjä:** 10 kappaletta (noin 566 sanaa), sama ääni kuin Pariisi/Lontoo/Praha; vasta omistajan luvalla.
4. **PT päättää:** (a) reitin suunta (Christianshavn → Tivoli vai päinvastoin, sama pituus); (b) Rosenborgin kappale on lyhin (~25 s): sopiiko; (c) Rådhuspladsen ja Nytorv jäivät pois Karttasepän ehdotuksista; (d) Disney, Rutschebanen ja tähtitorni-väite poissa; (e) kuvakierros.
