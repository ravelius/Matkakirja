# Viesti Fablelle: Bulgarian hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-bgr`
(pohja origin/main ec319360, v1962). **25 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu. Vaiheessa 2 mukaan tulevat myös rahavisat (~10 noston kenttä `visa`).

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli taulukossa. Yhtään lukua ei ole arvattu. Vidinin piste on Baba Vidan linnoituksen artikkelista, Ledenikan luolan piste Ledenikan artikkelista.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs` `laudat`, `osuuLehteen('BGR')`): **25/25 osuu Bulgarian fokuslehteen.** **Karkean renkaan ulkopuolella 2 rannikkokohdetta**: Sozopol 2,1 ja Kaliakra 1,4 lautayksikköä renkaan reunasta; muut 23 sisällä (reunalla Vidin 0,2, Nikopol 1,2, Balchik 0,9, Ruse 1,5, Trigrad 2,5, Svishtov 3,0).
- **Pelikaupunki: Sofia** (`cityCountry`; ainoa BGR-kaupunki). Lähin ehdotus on Vratsa/Ledenika 21,7 (raja 7), joten yksikään ei ole kaupungin kohdalla. Sofian merkki mitattu: 0,5 lautayksikköä todellisesta paikasta (ei Budapestin kaltaista siirtymää).
- **Bulgariassa on jo 26 nostoa** (`nostojenKarttapaikat()`): Plovdiv, Varna, Veliko Tarnovo, Rila, Musala, Rilan luostari, Vitosha, Balkanvuoret, Tonava, Ruusulaakso, Boyana, Jogurtti, Veliki Preslav, Madara, Srebarna, Pernik, Moskeijat, Nesebar, Belogradtsik, Sofian syvennykset (Levski, areena, pollopatsas, eläintarha), kolme skandaalia (Veda Slovena, Battenbergin ruhtinaskaappaus, kansallisteatterin vihellyskohu) sekä Areena.
  Siksi pyytämäsi **Rila (luostari), Veliko Tarnovo, Plovdiv, Nesebar, Belogradchik, Ruusulaakso (Kazanlak), Madara, Varna ovat jo pelissä eivätkä ole listalla**. Uutta pyytämistäsi: Koprivshtitsa, Shipka, Melnik, Bansko, Perperikon, Ruse.
- **Pudotettu liian lähellä olevana** (< 7 nykyisiin tai < 8,7 keskenään): **Pirin (Pirinin kansallispuisto 6,5 Banskosta, 6,9 Melnikistä; Pirin kuuluu Banskon tekstiin)**, Sedmite ezera / Seven Rila Lakes (2,8 Rilan luostarista), Kazanlak (0,0 Ruusulaaksosta), Buzludzha (4,8 Ruusulaaksosta; muistomerkki 1981), Etar (2,0 Shipkasta), Tryavna (7,3 mutta 5,5 Etarista), Dryanovo (8,4 Shipkasta), Devetashka (3,5 Balkanvuorista), Sapareva Banya (6,5 Rilan luostarista), Kovachevitsa (5,8 Skandaali Veda Slovena -merkistä), Shumen (6,1 Veliki Preslavista), Sandanski (4,4 Melnikistä), Kardzhali (4,2 Perperikonista), Rusenski Lom (5,8 Rusesta), Pomorie (5,3 Nesebarista), Silistra (6,1 Srebarnasta), Golden Sands (4,8 Varnasta), Samokov (6,3 Musalasta), Malko Tarnovo (2,7 Strandzhasta), Batak (1876 verilöyly; raskas aihe, ei ehdotettu).
- **Lähimmät nykyisiin (lautayksikköä)**: **Shipka – Ruusulaakso 6,6 (alle rajan 7; Shipka pyysit)**, Pobiti kamani – Varna 7,0, Etar poistettu; Lovech 10,6 Balkanvuorista, Bachkovo 8,9 Plovdivista, Sozopol 9,8 Nesebarista, Stara Zagora 11,0 Ruusulaaksosta, Balchik 11,8 Varnasta; muut ≥ 10,7. Nostot keskenään ≥ 10,4 (pienin Kaliakra – Balchik).
- Ei suuria kaupunkeja pelikaupungin lisäksi: Ruse ja Svishtov Tonavan satamina, Sliven, Stara Zagora ja Pleven pienempinä kohteina (Plovdiv ja Varna ovat jo pelissä).
- Tyypit ovat pelin oman `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / saari / jarvi / meri / joki; muut historia, kulttuuri, ruoka, kauppa, tekniikka, merenkulku).
- **1873-näkökulma**: Bulgaria on Osmanien vallan alla (Bulgarian ruhtinaskunta perustetaan 1878 Berliinin sopimuksella vapaussodan 1877–78 jälkeen); Bulgarian eksarkaatti perustettiin 1870; **Vasil Levski hirtettiin Sofiassa 18.2.1873** (Karlovo, Levskin syntymäkaupunki). Nappi-alaotsikot kertovat kohteen 1873 ja vihjaavat tulevaan ("vasta muutaman vuoden kuluttua": Huhtikuun kansannousu 1876 Koprivshtitsassa, Shipkan taistelut 1877, Plevenin piiritys 1877, Nikopolin valtaus 1877).
- Lähdesääntö: artikkelien johdanto-osat on luettu ja avainväitteet tarkistettu koko artikkeleista. Vaiheessa 2 kirjoitan tekstit vain artikkelin tukemista väitteistä ja kirjaan poikkeamat.

## Lista

### Luonto (9)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-bansko | Bansko ja Pirin | vuori | 41,8333 / 23,5 | Bansko | Pirinin juurella oleva kaupunki, vuoristoperinne; Pirinin kansallispuisto kerrotaan täällä. |
| 2 | hahmotelma-pobiti-kamani | Pobiti kamani | vuori | 43,2264 / 27,7067 | Pobiti Kamani | "Kivimetsä": hiekkakivipylväät Varnan lähellä. |
| 3 | hahmotelma-kaliakra | Kaliakra | meri | 43,3667 / 28,4667 | Kaliakra | Mustanmeren kalliokärki, linnoituksen jäänteet. Renkaan ulkopuolella 1,4. |
| 4 | hahmotelma-vratsa-ledenika | Ledenikan luola | vuori | 43,2044 / 23,4911 | Ledenika | Vratsan Balkanin jääluola. |
| 5 | hahmotelma-trigrad | Trigradin rotko | vuori | 41,6167 / 24,3792 | Trigrad Gorge | Rodopien rotko ja Paholaisen kurkku -luola. |
| 6 | hahmotelma-strandzha | Strandzha | vuori | 42,0125 / 27,6086 | Strandzha Nature Park | Bulgarian suurin luonnonpuisto, kaakkoiskulma. |
| 7 | hahmotelma-smolyan | Smolyan ja Rodopit | vuori | 41,5833 / 24,7 | Smolyan | Keski-Rodopien vuoristokaupunki. |
| 8 | hahmotelma-berkovitsa | Berkovitsa | vuori | 43,2333 / 23,1167 | Berkovitsa | Lounaisen Balkanin juurella oleva kaupunki. |
| 9 | hahmotelma-sozopol | Sozopol | meri | 42,4167 / 27,7 | Sozopol | Mustanmeren satamakaupunki (Apollonia, kreikkalainen siirtokunta). Renkaan ulkopuolella 2,1. |

### Historia ja merenkulku (12)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 10 | hahmotelma-koprivshtitsa | Koprivshtitsa | historia | 42,6333 / 24,35 | Koprivshtitsa | Huhtikuun kansannousun 1876 alkupaikka; 1800-luvun herätysajan talot. |
| 11 | hahmotelma-shipka | Shipkan sola | historia | 42,7667 / 25,3167 | Shipka Pass | Balkanin sola; taistelut 1877–78 (nappi: vasta muutaman vuoden kuluttua). **Ruusulaakso 6,6.** |
| 12 | hahmotelma-perperikon | Perperikon | historia | 41,7147 / 25,4653 | Perperikon | Traakialainen kalliokaupunki Rodopeilla. |
| 13 | hahmotelma-bachkovo | Bachkovon luostari | historia | 41,9422 / 24,8494 | Bachkovo Monastery | Bulgarian toiseksi suurin ortodoksiluostari (1083). |
| 14 | hahmotelma-lovech | Lovech | historia | 43,1347 / 24,7172 | Lovech | Katettu silta ja Levskin muistot. |
| 15 | hahmotelma-pleven | Pleven | historia | 43,4078 / 24,6203 | Pleven | Plevenin piiritys 1877 (nappi: vasta muutaman vuoden kuluttua). |
| 16 | hahmotelma-nikopol | Nikopol | historia | 43,7 / 24,9 | Nikopol, Bulgaria | Tonavan linnoituskaupunki; 1396 Nikopolin taistelu. |
| 17 | hahmotelma-vidin | Vidin | historia | 43,9931 / 22,8867 | Baba Vida | Baba Vidan linnoitus Tonavalla. |
| 18 | hahmotelma-stara-zagora | Stara Zagora | historia | 42,4256 / 25,6344 | Stara Zagora | Neoliittiset asuinrakennukset, 1877 tuhottu kaupunki. |
| 19 | hahmotelma-kyustendil | Kyustendil | historia | 42,2833 / 22,6833 | Kyustendil | Kuumat lähteet, roomalaiset kylpylät (Pautalia). |
| 20 | hahmotelma-ruse | Ruse | merenkulku | 43,8231 / 25,9539 | Ruse, Bulgaria | Tonavan satama; Ruse–Varna-rautatie 1866, Bulgarian ensimmäinen. |
| 21 | hahmotelma-svishtov | Svishtov | merenkulku | 43,6167 / 25,35 | Svishtov | Tonavan satama ja kaupunki. |

### Kulttuuri, ruoka ja kauppa (4)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 22 | hahmotelma-melnik | Melnik | ruoka | 41,5167 / 23,4 | Melnik, Bulgaria | Bulgarian pienin kaupunki; viini, hiekkakivipyramidit. |
| 23 | hahmotelma-karlovo | Karlovo | kulttuuri | 42,6436 / 24,8072 | Karlovo | Vasil Levskin syntymäkaupunki; Levski hirtettiin 18.2.1873. |
| 24 | hahmotelma-sliven | Sliven | kauppa | 42,6833 / 26,3333 | Sliven | Villatehdas 1834, Bulgarian ensimmäinen tehdas. |
| 25 | hahmotelma-balchik | Balchik | kulttuuri | 43,4269 / 28,1617 | Balchik | Mustanmeren kaupunki, Dionysopolis. |

## Huomiot Fablelle

1. **Herkät kohteet (13+)**: Shipka ja Pleven (1877–78 sota) kerrotaan asiallisesti, kuvina vain muistomerkit ja maisema; Stara Zagoran 1877 tuho ja Nikopolin valtaus samoin. Levskin hirttäminen 1873 mainitaan vain faktana (ei kuvaa). Batakia ei ehdoteta.
2. **Renkaan ulkopuolella kaksi rannikkokohdetta** (Sozopol, Kaliakra); koordinaatit ovat Wikipedian todelliset.
3. **Alle 7:n pari**: Shipka – Ruusulaakso 6,6 (vain tämä; muut ≥ 7,0). Voin pudottaa Shipkan, jos haluat.
4. **Pirin pudotettu** (6,5 Banskosta): Bansko-nosto kertoo Pirinistä. Jos haluat Pirinin eikä Banskoa, vaihdan.
5. **Tyypit tarkistan artikkelien mukaan** vaiheessa 2 (Melnikin viini, Slivenin tehdas, Balchik) ja kirjaan poikkeamat.
6. **Rahavisat**: vaiheessa 2 ~10 visaa (eri tyyppejä, 4 vaihtoehtoa, vastaus noston tekstistä).
