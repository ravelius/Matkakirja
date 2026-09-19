# Viesti Fablelle: Slovakian hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-svk`
(pohja origin/main 7c23d6d2, v1963). **27 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu. Vaiheessa 2 mukaan tulevat myös rahavisat (~10 noston kenttä `visa`).

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli taulukossa. Yhtään lukua ei ole arvattu. Ochtinská-piste on luolan omasta artikkelista, Stará Ľubovňa ja Zemplínska šírava omista artikkeleistaan.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs` `laudat`, `osuuLehteen('SVK')`): **27/27 osuu Slovakian fokuslehteen.** **Karkean renkaan ulkopuolella vain Skalica 0,2**; reunalla sisäpuolella Poloniny 2,4, Bratislava 2,7, Stará Ľubovňa 2,8 (rengas on yksinkertaistettu; koordinaatit ovat Wikipedian todelliset).
- **Slovakiassa EI ole pelikaupunkia** (`cityCountry` SVK tyhjä) eikä yhtään nykyistä SVK-nostoa (`nostojenKarttapaikat()`), joten kaupunkikohteet (Bratislava, Košice, Trenčín, Nitra, Trnava) ovat sallittuja, eikä kaupungin kohdalla -ongelmaa ole. Nostot keskenään ≥ 7,8 (pienin Bojnice – Čičmany ja Trnava – Smolenice 7,8; sitten Kremnica – Zvolen 8,8).
- **Naapurimaiden nostot rajan takana** (`nostojenKarttapaikat()`, eri ISO): **Tatranská Lomnica – POL Rysy 6,5 (alle 7)**, Bratislava – AUT Carnuntum 8,4, Stará Ľubovňa – POL Dunajec-rotko 9,5, Poloniny – POL Tarnica 10,5, Ochtinská – HUN Aggtelek 11,1; muut ≥ 14.
- **Pudotettu liian lähellä olevana**: **Štrbské Pleso (2,8 POL Rysystä, joten Vysoké Tatry -nosto on Tatranská Lomnica, Lomnický štít -näkymä)**, Gerlachovský štít (3,0 Štrbské Plesosta), Devín (4,7 Carnuntumista; Bratislava tilalle), Červený Kláštor (0,7 POL Dunajec-rotkosta), Slovenský kras (5,3 HUN Aggtelekista; Ochtinská tilalle), Slovenský raj (4,5 Dobšinskásta; Dobšinská valittu 1870-nappin vuoksi), Levoča (6,0 Spišistä; Levoča kerrotaan Spišin tekstissä, UNESCO-kokonaisuus), Kežmarok (5,1 Tatranská Lomnicasta), Poprad (5,4 Kežmarokista), Domica (5,8 Slovenský krasista), Oravská Lesná (6,6 Terchovásta), Čachtice (6,6 Piešťanysta), Trenčianske Teplice ja Rajecké Teplice (4,5), Liptovská Mara (3,8), Banská Bystrica (7,0 Zvolenista), Prešov, Žilina, Modra (lähellä muita, kiinnostavuudeltaan heikompia).
- Tyypit ovat pelin oman `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / saari / jarvi / meri / joki; muut historia, kulttuuri, ruoka, kauppa, tekniikka, merenkulku).
- **1873-näkökulma**: Ylä-Unkari (Felvidék) Unkarin kruunun alla (Nagodba 1868, dualismi 1867); Bratislava on Pozsony/Pressburg (Unkarin kruunajaiskaupunki 1563–1830); Košice on Kassa; Slovakialaisten kansallinen liike (Matica slovenská toimii Martinissa, suljetaan 1875); Tatrojen matkailu alkaa 1870-luvulla (Tatranská Lomnica); Dobšinská jääluola löydettiin 1870 ja avattiin yleisölle 1871; Kremnicassa toimii yhä Unkarin kuninkaallinen rahapaja; Banská Štiavnican akatemia 1762 (nyt kuninkaallinen kaivos- ja metsäakatemia). Nappi-alaotsikot kertovat kohteen 1873. Slovakian tuleva valtio (1918) ei ole 1873:ssa: nimeä Slovakia käytetään vain maan nimenä.
- Lähdesääntö: artikkelien johdanto-osat on luettu ja avainväitteet tarkistetaan koko artikkeleista. Vaiheessa 2 kirjoitan tekstit vain artikkelin tukemista väitteistä ja kirjaan poikkeamat.

## Lista

### Luonto (5)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-tatranska-lomnica | Tatranská Lomnica | vuori | 49,1667 / 20,2833 | Tatranská Lomnica | Vysoké Tatry: Lomnický štít, matkailun kylpyläkylä (1870-luku). **POL Rysy 6,5.** |
| 2 | hahmotelma-dobsinska-jaaluola | Dobšinská jääluola | vuori | 48,8719 / 20,2947 | Dobšiná Ice Cave | Jääluola, löydetty 1870; Unesco. |
| 3 | hahmotelma-ochtinska | Ochtinská aragoniittiluola | vuori | 48,6636 / 20,3057 | Ochtinská Aragonite Cave | Slovak Karstin Unesco-kohde. |
| 4 | hahmotelma-poloniny | Poloniny | vuori | 49,045 / 22,425 | Poloniny National Park | Karpaattien alkumetsät ja puukirkot idässä. |
| 5 | hahmotelma-zemplinska-sirava | Zemplínska šírava | jarvi | 48,7833 / 22,0367 | Zemplínska šírava | Itä-Slovakian tekojärvi (1960-luku). |

### Historia ja tekniikka (14)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 6 | hahmotelma-spis | Spišin linna | historia | 49,0006 / 20,7683 | Spiš Castle | Keski-Euroopan suurimpia linnakomplekseja; Levoča ja Spiš yhdessä (Unesco). |
| 7 | hahmotelma-banska-stiavnica | Banská Štiavnica | tekniikka | 48,4581 / 18,8964 | Banská Štiavnica | Kaivoskaupunki, kaivos- ja metsäakatemia (1762). |
| 8 | hahmotelma-kremnica | Kremnica | kauppa | 48,7 / 18,92 | Kremnica | Kultakaivoskaupunki ja rahapaja (1328–). |
| 9 | hahmotelma-bojnice | Bojnice | historia | 48,78 / 18,5778 | Bojnice Castle | Romanttinen linna (Pálffy). |
| 10 | hahmotelma-orava | Oravan linna | historia | 49,2617 / 19,3581 | Orava Castle | Kalliolle rakennettu linna Orava-joen yllä. |
| 11 | hahmotelma-trencin | Trenčín | historia | 48,8919 / 18,0367 | Trenčín | Linna ja roomalainen kirjoitus (179, Laugaricio). |
| 12 | hahmotelma-bratislava | Bratislava (Pozsony) | historia | 48,1439 / 17,1097 | Bratislava | Pressburg: Unkarin kruunajaiskaupunki 1563–1830. **AUT Carnuntum 8,4.** |
| 13 | hahmotelma-kosice | Košice (Kassa) | historia | 48,7167 / 21,25 | Košice | Pyhän Elisabetin tuomiokirkko, Unkarin kaupunki. |
| 14 | hahmotelma-bardejov | Bardejov | historia | 49,2933 / 21,2761 | Bardejov | Keskiaikainen kauppakaupunki (Unesco). |
| 15 | hahmotelma-nitra | Nitra | historia | 48,3069 / 18,0864 | Nitra | Vanhimpia slovakialaisia kaupunkeja, linna ja piispankirkko. |
| 16 | hahmotelma-trnava | Trnava | historia | 48,3775 / 17,5883 | Trnava | Pienen Rooman lempinimi; yliopisto 1635. |
| 17 | hahmotelma-zvolen | Zvolen | historia | 48,5731 / 19,1273 | Zvolen Castle | Kuninkaallinen linna. |
| 18 | hahmotelma-smolenice | Smolenice | historia | 48,5136 / 17,4322 | Smolenice Castle | Pienten Karpaattien linna, uusgoottilainen jälleenrakennus. |
| 19 | hahmotelma-stara-lubovna | Stará Ľubovňa | historia | 49,31 / 20,68 | Stará Ľubovňa | Linna Puolan rajalla; Spiš-panttikaupungit (1412). |

### Kulttuuri ja ruoka (8)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 20 | hahmotelma-vlkolinec | Vlkolínec | kulttuuri | 49,0417 / 19,275 | Vlkolínec | Puutalokylä (Unesco). |
| 21 | hahmotelma-cicmany | Čičmany | kulttuuri | 48,955 / 18,5162 | Čičmany | Koristemaalatut puutalot. |
| 22 | hahmotelma-terchova | Terchová | kulttuuri | 49,27 / 19,03 | Terchová | Juraj Jánošíkin kotikylä (Malá Fatra). |
| 23 | hahmotelma-liptovsky-mikulas | Liptovský Mikuláš | kulttuuri | 49,08 / 19,6 | Liptovský Mikuláš | Liptovin keskus; Jánošíkin oikeudenkäynti 1713. |
| 24 | hahmotelma-piestany | Piešťany | kulttuuri | 48,58 / 17,83 | Piešťany | Kylpyläkaupunki, lämpölähteet. |
| 25 | hahmotelma-skalica | Skalica | ruoka | 48,84 / 17,23 | Skalica | Trdelník, Rotunda ja viinialue. Renkaan ulkopuolella 0,2. |
| 26 | hahmotelma-topolcianky | Topoľčianky | historia | 48,42 / 18,42 | Topoľčianky | Kartano ja hevostila. |
| 27 | hahmotelma-martin | Martin | kulttuuri | 49,065 / 18,9219 | Martin, Slovakia | Slovakialaisen kansallisen liikkeen keskus; Matica slovenská (1863). |

## Huomiot Fablelle

1. **Ei nykyisiä SVK-nostoja eikä pelikaupunkia**: siksi 27 ehdotusta ja mukana suurempia kaupunkeja (Bratislava, Košice, Trenčín, Nitra, Trnava). Voin karsia listaa 25:een, jos haluat (pudotettaisiin Zemplínska šírava ja Topoľčianky).
2. **Vysoké Tatry**: Štrbské Pleso pudotettu (2,8 POL Rysystä), tilalle Tatranská Lomnica (6,5 Rysystä; Lomnický štít -näkymä). Jos haluat Štrbské Plesoa, se olisi käytännössä Rysyn päällä.
3. **Levoča** ei ole erillisenä (6,0 Spišistä): teksti Spišin linnasta kertoo Unescon Levoča–Spiš-kokonaisuuden.
4. **Slovenský raj pudotettu** (4,5 Dobšinskásta): Dobšinská kattaa Slovenský rajin (Dobšinská jääluola on osa Slovak Paradise -kansallispuistoa). Vaihdan halutessasi.
5. **Herkät kohteet (13+)**: Bardejov, Košice ja Bratislava tavallisia historiakohteita; Jánošík (Terchová, Liptovský Mikuláš) legendana ilman väkivaltakuvia; 1944-kansannousu (Banská Bystrica) jätetty pois.
6. **Rahavisat**: vaiheessa 2 ~10 visaa (eri tyyppejä, 4 vaihtoehtoa, vastaus noston tekstistä).
7. **Rekisteröinti** (vaihe 2): import/lohko liitetään hahmotelma-dnk-rivien jälkeen (v1963-pohja), joten IRL/HRV/BGR-haarojen kanssa konfliktit ovat pieniä.
