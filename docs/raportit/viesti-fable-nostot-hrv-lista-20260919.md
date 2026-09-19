# Viesti Fablelle: Kroatian hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-hrv`
(pohja origin/main ec319360, v1962). **26 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu. Vaiheessa 2 mukaan tulevat myös rahavisat (~10 noston kenttä `visa`).

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli taulukossa. Yhtään lukua ei ole arvattu. Mali Lošinjin ja Sinjin koordinaatit ovat kaupunkiartikkeleista.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs` `laudat`, `osuuLehteen('HRV')`): **26/26 osuu Kroatian fokuslehteen.** **Karkean renkaan ulkopuolella 9 rannikko- ja saarikohdetta** (rengas on yksinkertaistettu; luvut lautayksikköä renkaan reunasta): Rovinj 0,2, Neretva 0,1, Omiš 1,0, Trogir 1,1, Pag 5,0, Krk 6,0, Kornati 7,5, Lastovo 12,4, Mali Lošinj 15,7 ja Vis 20,2 (10 kpl; muut 16 sisällä). Saaret ovat kaikki lehdellä (`osuuLehteen` true).
- **Pelikaupunki: Dubrovnik** (`cityCountry`; ainoa HRV-kaupunki). Lähin ehdotus Neretva 26,9 (raja 7), joten yksikään ei ole kaupungin kohdalla. Dubrovnikin merkki on hyvin lähellä oikeaa paikkaa (nykyiset Dubrovnik-nostot eivät ole poikkeamia).
- **Kroatiassa on jo 25 nostoa** (`nostojenKarttapaikat()`): Zagreb, Split, Rijeka, Zadar, Osijek, Dinara, Sveti Jure, Vaganski vrh, Risnjak, Vojak, Adrianmeri, Sava, Drava, Hvar, Korčula, Mljet, Plitvicen järvet, Pulan areena, Stonin muurit, Dubrovnikin syvennykset (tornit, Lokrum, Sponza) sekä kolme skandaalia (Rijekan krpica 1868, Pacta conventa -väärennös, Zrinski–Frankopan-salaliitto).
  Siksi pyytämäsi **Plitvice, Split (Diocletianuksen palatsi on Splitin nostossa), Pula (amfiteatteri), Hvar, Korčula, Zadar, Osijek ja Dubrovnik ovat jo pelissä eivätkä ole listalla**. Paklenica (2,8 Vaganski vrhistä), Brijuni (3,3 Pulan areenasta) ja Velebit (Vaganski vrh on sen huippu) pudotettu liian lähellä olevina.
- **Lähimmät nykyisiin (lautayksikköä)**: **Trogir – Split 6,3 (alle rajan 7)**, Kopački rit – Osijek 7,3, Kornati – Pacta conventa 7,6 (skandaalimerkki), Lastovo – Korčula 8,3, Omiš – Split 8,6, Samobor – Zagreb 8,7; muut ≥ 10. Nostot keskenään ≥ 9,0 (pienin Lonjsko polje – Sisak 9,2 ja Motovun – Poreč-rivi poistettu).
- **Pudotettu liian lähellä olevana** (< 7 nykyisiin tai < 8,7 keskenään): Šibenik (3,9 Krkasta; Krka valittu), Krapina (4,9 Trakošćanista; Trakošćan valittu), Poreč (6,0 Rovinjista), Telašćica (7,4 Kornatista), Cres (7,8 Krkistä), Paklenica, Brijuni, Opatija (3,8 Vojakista), Nin (5,0 Zadarista), Klis (3,5 Splitistä), Makarska (1,4 Sveti Jurelta), Zlatni Rat (3,8 Hvarista), Zrmanja (6,6), Hum (5,5), Medvednica (4,3 Zagrebista), Cavtat (Dubrovnikin kohdalla).
- Ei suuria kaupunkeja: Zagreb, Split, Rijeka, Zadar, Osijek ja Dubrovnik ovat jo pelissä; kohteina vain pienempiä kaupunkeja, linnoja, luontokohteita ja saaria.
- Tyypit ovat pelin oman `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / saari / jarvi / meri / joki; muut historia, kulttuuri, ruoka, kauppa, tekniikka, merenkulku).
- **1873-näkökulma**: Kroatia-Slavonia on Unkarin kruunun alla (Nagodba 1868, ban Ivan Mažuranić 1873–80), Dalmatia ja Istria Itävallan puolella; Sotilasraja (Karlovac, Slavonski Brod) on vielä Habsburgien hallinnassa (lakkautus 1881); Đakovon katedraali on Strossmayerin rakennettavana (1866–82); Rijekan saaristokaupungit ja Lošinj eivät ole vielä kylpyläkohteita. Nappi-alaotsikot kertovat kohteen 1873.
- Lähdesääntö: artikkelien johdanto-osat on luettu ja avainväitteet tarkistettu koko artikkeleista. Vaiheessa 2 kirjoitan tekstit vain artikkelin tukemista väitteistä ja kirjaan poikkeamat.

## Lista

### Luonto (12)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-krka | Krka | joki | 43,8019 / 15,9728 | Krka National Park | Krka-joen kansallispuisto: Skradinski buk ja Roški slap -putoukset, kanjoni. |
| 2 | hahmotelma-kornati | Kornati | saari | 43,7833 / 15,3333 | Kornati | Yli 100 saaren saaristo Dalmatian edustalla. Renkaan ulkopuolella 7,5. |
| 3 | hahmotelma-lonjsko-polje | Lonjsko polje | jarvi | 45,42 / 16,64 | Lonjsko Polje | Save-joen tulvakosteikko, Euroopan suurimpia; kyläarkkitehtuuri ja kyyhkyset. |
| 4 | hahmotelma-kopacki-rit | Kopački rit | jarvi | 45,6308 / 18,8919 | Kopački Rit | Tonavan ja Dravan tulvaluonto Osijekin lähellä; Euroopan suurimpia kosteikkoja. |
| 5 | hahmotelma-krk | Krk | saari | 45,0667 / 14,6 | Krk | Adrianmeren suurimpia saaria (silta mantereelle), Baškan tabletti. Renkaan ulkopuolella 6,0. |
| 6 | hahmotelma-vis | Vis | saari | 43,0425 / 16,1525 | Vis (island) | Kaukaisin asuttu Dalmatian saari; Lissan meritaistelu 1866 (Itävalta–Italia). Renkaan ulkopuolella 20,2. |
| 7 | hahmotelma-pag | Pag | saari | 44,4833 / 14,9667 | Pag (island) | Karu kalkkikivisaari, suolatuotanto ja Paški sir; silta mantereelle. Renkaan ulkopuolella 5,0. |
| 8 | hahmotelma-lastovo | Lastovo | saari | 42,75 / 16,8667 | Lastovo | Syrjäinen saari, luonnonpuisto; Korčulan eteläpuolella. Renkaan ulkopuolella 12,4. |
| 9 | hahmotelma-mali-losinj | Lošinj | saari | 44,5333 / 14,4667 | Mali Lošinj | Kvarnerin saari, purjelaivojen ja merenkulun kaupunki; Apoxyomenos-veistos löydettiin 1999. Renkaan ulkopuolella 15,7. |
| 10 | hahmotelma-neretva | Neretvan suisto | joki | 43,0197 / 17,445 | Neretva | Dalmatian suurin joki ja hedelmällinen suisto. Renkaan ulkopuolella 0,1. |
| 11 | hahmotelma-omis | Omiš ja Cetina | joki | 43,4333 / 16,6833 | Omiš | Cetina-joen kanjonisuu; Omišin merirosvot keskiajalla. Renkaan ulkopuolella 1,0. |
| 12 | hahmotelma-motovun | Motovun | historia | 45,3333 / 13,8333 | Motovun | Istrian kukkulakaupunki, venetsialainen linnoitus. |

### Historia ja merenkulku (10)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 13 | hahmotelma-trogir | Trogir | historia | 43,5169 / 16,2514 | Trogir | Unescon vanhakaupunki saarella, romaaninen katedraali. **Split 6,3 (alle 7).** Renkaan ulkopuolella 1,1. |
| 14 | hahmotelma-rovinj | Rovinj | historia | 45,0833 / 13,6333 | Rovinj | Istrian kalastajakaupunki, Pyhän Euphemian kirkko. Renkaan ulkopuolella 0,2. |
| 15 | hahmotelma-vukovar | Vukovar | historia | 45,3444 / 19,0025 | Vukovar | Tonavan satama, Eltzin kartano; 1990-luvun piiritys kerrotaan asiallisesti ilman sotakuvia. |
| 16 | hahmotelma-varazdin | Varaždin | historia | 46,3081 / 16,3378 | Varaždin | Barokkikaupunki, Kroatian pääkaupunki 1767–1776 (1776 palo). |
| 17 | hahmotelma-trakoscan | Trakošćan | historia | 46,2582 / 15,9470 | Trakošćan Castle | Zagorjen linna, uusgoottilainen restaurointi 1800-luvulla. |
| 18 | hahmotelma-karlovac | Karlovac | historia | 45,4833 / 15,55 | Karlovac | Tähtimuotoinen linnoituskaupunki (1579), Sotilasrajan kaupunki 1873. |
| 19 | hahmotelma-slavonski-brod | Slavonski Brod | historia | 45,1667 / 18,0167 | Slavonski Brod | Savan rajalinnoitus (1700-luku), Sotilasrajan kaupunki 1873. |
| 20 | hahmotelma-sisak | Sisak | historia | 45,4872 / 16,3761 | Sisak | Kupan ja Savan yhtymäkohta; Sisakin taistelu 1593 ja roomalainen Siscia. |
| 21 | hahmotelma-ilok | Ilok | ruoka | 45,2219 / 19,3753 | Ilok | Kroatian itäisin kaupunki Tonavalla; Odescalchin linna ja viinikellarit. |
| 22 | hahmotelma-djakovo | Đakovo | kulttuuri | 45,31 / 18,41 | Đakovo | Lipizzan-hevosten ori- ja Strossmayerin katedraali (rakenteilla 1866–82). |

### Kulttuuri (4)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 23 | hahmotelma-samobor | Samobor | kulttuuri | 45,8 / 15,7167 | Samobor | Karnevaalit, Samoborin kremšnita ja sinappi; vanha kaupunki Zagrebin länsipuolella. |
| 24 | hahmotelma-kumrovec | Kumrovec | kulttuuri | 46,0856 / 15,6778 | Kumrovec | Zagorjen etnografinen kylä (Old Village Museum); syntymäpaikka Josip Broz Tito (1892, vasta 1892). |
| 25 | hahmotelma-sinj | Sinj | kulttuuri | 43,7025 / 16,6381 | Sinj | Sinjska alka -ritariturnaus (vuodesta 1715), Cetinan kenttä. |
| 26 | hahmotelma-durdevac | Đurđevac | kulttuuri | 46,0273 / 17,0672 | Đurđevac | Picokijada-festivaali ja kukko-legenda; Đurđevacin vanha linna. |

## Huomiot Fablelle

1. **Herkät kohteet (13+)**: Vukovar (1991 piiritys) asiallisesti ja ilman uhri- tai sotakuvia, kuvina vain rakennuksia ja maisemaa. Kumrovec (Tito) kerrotaan asiallisesti kylänä, joka on museo.
2. **Renkaan ulkopuolella 10 kohdetta** (10 saari- ja rannikkokohdetta); koordinaatit ovat Wikipedian todelliset.
3. **Alle 7:n pari**: Trogir – Split 6,3 (vain tämä; muut ≥ 7,3). Voin pudottaa Trogirin, jos haluat.
4. **Fablen mainitsemista pudotettu**: Šibenik (Krka), Paklenica, Brijuni, Velebit (liian lähellä); Split, Pula, Plitvice, Hvar, Korčula, Zadar, Osijek, Dubrovnik ovat jo pelissä.
5. **Kuvariskit**: Lastovo, Ilok ja Đurđevac; varasuunnitelma Šibenikin katedraali tai Poreč (Euphrasian basilika), jos kaksi kelvollista kuvaa ei löydy.
6. **Rahavisat**: vaiheessa 2 ~10 visaa (eri tyyppejä, 4 vaihtoehtoa, vastaus noston tekstistä).
