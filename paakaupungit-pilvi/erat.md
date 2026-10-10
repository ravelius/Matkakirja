# Kevyet pääkaupungit erinä (118 kpl, 14 erää)

Lähde: `js/packs/paakaupungit.js` (PAAKAUPUNKIPISTEET, origin/main 10.10.2026) ja laudan kaupungit
(`js/packs/maailmankartta.js`). Järjestys Raamatun mukaan: Eurooppa → Kaukasus ja Lähi-itä → Afrikka →
Aasia → Amerikat → Oseania. Haara per erä `paakaupungit-<erä>-pilvi`; ohje
`PILVIOHJE-paakaupungit.md`. Erän sisällä järjestys on työjärjestys: päällekkäiset ja herkät viimeisinä,
jotta Päätoimittaja voi jättää ne pois ennen käynnistystä.

Sarakkeet: asukkaat = kevyen pisteen luku (vuosi); lähin = lähin laudan kaupunki ja etäisyys;
**≤60** = alle 60 lautayksikköä laudan kaupungista: ei mahdu pysäkiksi todelliselle paikalleen
(`minCityDistance` 60), merkitsee vain jos pääkaupungista tehdään pelikaupunki; **päällekkäin** = sama
paikka on jo pelin lehdessä (Päätoimittaja päättää, tehdäänkö oma kaupunki); **pieni** = alle
50 000 asukasta (kohdekartalle voi jäädä alle 6 kohdetta); **herkkä** = sitova sisältölinjaus.

## Koneluettava lista (tee-paakaupunki-ohje.sh lukee tämän)

```
ERÄ e01: zagreb belgrad tirana skopje podgorica chisinau minsk bratislava
ERÄ e02: bern vaduz monaco andorralavella sanmarino reykjavik
ERÄ e03: tbilisi jerevan baku amman beirut abudhabi manama ramallah
ERÄ e04: rabat alger nouakchott praia banjul bissau conakry monrovia tunis freetown
ERÄ e05: bamako ouagadougou niamey yamoussoukro accra lome portonovo abuja ndjamena yaounde
ERÄ e06: libreville ciudaddelapaz saotome bangui brazzaville kinshasa luanda kigali gitega
ERÄ e07: khartum juba asmara djibouti mogadishu kampala dodoma lilongwe lusaka
ERÄ e08: harare maputo mbabane maseru gaborone windhoek moroni portlouis victoria antananarivo
ERÄ e09: taskent biskek dusanbe asgabat islamabad thimphu dhaka
ERÄ e10: male naypyidaw vientiane phnompenh kualalumpur bandarseribegawan pjongjang srijayawardenepurakotte
ERÄ e11: washington ottawa belmopan sansalvador tegucigalpa sanjose santodomingo portauprince kingston
ERÄ e12: nassau saintjohns basseterre roseau castries kingstown bridgetown stgeorges portofspain
ERÄ e13: georgetown paramaribo brasilia lapaz santiagodechile
ERÄ e14: canberra apia nukualofa funafuti southtarawa majuro palikir yaren ngerulmud
```

## e01 — Eurooppa 1: Balkan ja Itä-Eurooppa (8)

Haara `paakaupungit-e01-pilvi` · ehdotettu lähdepakka: europe

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | zagreb | Zagreb | HRV Kroatia | 777 744 (2025) | Ljubljana 117 km | **≤60** |
| 2 | belgrad | Belgrad | SRB Serbia | 1 681 405 (2022) | Sarajevo 194 km |  |
| 3 | tirana | Tirana | ALB Albania | 598 176 (2023) | Dubrovnik 203 km |  |
| 4 | skopje | Skopje | MKD Pohjois-Makedonia | 526 502 (2021) | Sofia 174 km |  |
| 5 | podgorica | Podgorica | MNE Montenegro | 179 505 (2023) | Dubrovnik 97 km | **≤60** |
| 6 | chisinau | Chișinău (Kišinjov) | MDA Moldova | 720 128 (2024) | Odessa 157 km |  |
| 7 | minsk | Minsk | BLR Valko-Venäjä | 1 995 091 (2026) | Vilna 172 km | **herkkä**: ei nykypolitiikkaa |
| 8 | bratislava | Bratislava | SVK Slovakia | 480 902 (2025) | Wien 55 km | **≤60** |

## e02 — Eurooppa 2: Alppimaat, minivaltiot ja Islanti (7)

Haara `paakaupungit-e02-pilvi` · ehdotettu lähdepakka: europe

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | bern | Bern | CHE Sveitsi | 146 867 (2025) | Alpit 80 km | **≤60** |
| 2 | vaduz | Vaduz | LIE Liechtenstein | 6 109 (2025) | Alpit 175 km | **pieni** |
| 3 | monaco | Monaco | MCO Monaco | 38 857 (2025) | Marseille 171 km | **pieni** |
| 4 | andorralavella | Andorra la Vella | AND Andorra | 24 836 (2025) | Barcelona 135 km | **pieni** · **≤60** |
| 5 | sanmarino | San Marino | SMR San Marino | 4 158 (2025) | Firenze 97 km | **pieni** · **≤60** |
| 6 | reykjavik | Reykjavík | ISL Islanti | 139 804 (2026) | Islanti 6 km | **päällekkäin**: Islanti-aluelehti (18 mainintaa) 6 km:n päässä · **≤60** |
| 7 | vatikaanivaltio | Vatikaanivaltio | VAT Vatikaani | 882 (2024) | Rooma 3 km | **päällekkäin**: Rooman lehti ja kohdekartta (Pietarinkirkko, Vatikaanin palatsi, Sikstus 1510) · **pieni** · **≤60** |

## e03 — Kaukasus ja Lähi-itä (8)

Haara `paakaupungit-e03-pilvi` · ehdotettu lähdepakka: päätetään integroinnissa (Lähi-itä nyt middleeast-questions + asia-artikkelit)

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | tbilisi | Tbilisi | GEO Georgia | 1 369 400 (2026) | Tabriz 424 km |  |
| 2 | jerevan | Jerevan | ARM Armenia | 1 147 600 (2026) | Tabriz 280 km |  |
| 3 | baku | Baku | AZE Azerbaidžan | 2 344 900 (2024) | Tabriz 397 km |  |
| 4 | amman | Amman | JOR Jordania | 4 311 387 (2025) | Jerusalem 70 km | **≤60** |
| 5 | beirut | Beirut | LBN Libanon | 433 249 (2017) | Damaskos 83 km | **≤60** |
| 6 | abudhabi | Abu Dhabi | ARE Arabiemiirikunnat | 2 823 340 (2024) | Dubai 127 km | **≤60** |
| 7 | manama | Manama | BHR Bahrain | 548 345 (2020) | Doha 140 km | **≤60** |
| 8 | ramallah | Ramallah | PSE Palestiina | 38 998 (2017) | Jerusalem 13 km | **herkkä**: hallinnon paikka, ei kannanottoa (Raamattu) · **pieni** · **≤60** |

## e04 — Afrikka 1: Maghreb ja Atlantin rannikko (10)

Haara `paakaupungit-e04-pilvi` · ehdotettu lähdepakka: africa

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | rabat | Rabat | MAR Marokko | 515 619 (2024) | Fès 169 km |  |
| 2 | alger | Alger | DZA Algeria | 2 988 145 (2008) | Barcelona 518 km |  |
| 3 | nouakchott | Nouakchott | MRT Mauritania | 1 446 761 (2023) | Dakar 409 km |  |
| 4 | praia | Praia | CPV Kap Verde | 141 219 (2021) | Dakar 654 km |  |
| 5 | banjul | Banjul | GMB Gambia | 26 461 (2024) | Dakar 165 km | **pieni** · **≤60** |
| 6 | bissau | Bissau | GNB Guinea-Bissau | 466 716 (2025) | Dakar 372 km |  |
| 7 | conakry | Conakry | GIN Guinea | 3 407 327 (2025) | Sierra Leone 133 km | **≤60** |
| 8 | monrovia | Monrovia | LBR Liberia | 1 761 032 (2022) | Sierra Leone 345 km |  |
| 9 | tunis | Tunis | TUN Tunisia | 1 075 306 (2024) | Karthago 15 km | **päällekkäin**: Karthagon lehti 15 km:n päässä (31 mainintaa) |
| 10 | freetown | Freetown | SLE Sierra Leone | 609 174 (2021) | Sierra Leone 43 km | **päällekkäin**: pelikaupunki Sierra Leone on Freetownin lehti (55 mainintaa) · **≤60** |

## e05 — Afrikka 2: Sahel ja Guineanlahti (10)

Haara `paakaupungit-e05-pilvi` · ehdotettu lähdepakka: africa

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | bamako | Bamako | MLI Mali | 4 227 569 (2022) | Sierra Leone 695 km |  |
| 2 | ouagadougou | Ouagadougou | BFA Burkina Faso | 2 415 266 (2019) | Gao 462 km |  |
| 3 | niamey | Niamey | NER Niger | 1 492 414 (2024) | Gao 385 km |  |
| 4 | yamoussoukro | Yamoussoukro | CIV Norsunluurannikko | 340 234 (2021) | Kap Palmas 383 km |  |
| 5 | accra | Accra | GHA Ghana | 1 782 150 (2021) | Kumasi 201 km | **≤60** |
| 6 | lome | Lomé | TGO Togo | 2 188 376 (2022) | Lagos 245 km |  |
| 7 | portonovo | Porto-Novo | BEN Benin | 264 320 (2013) | Lagos 89 km |  |
| 8 | abuja | Abuja | NGA Nigeria | 1 693 400 (2022) | Kano 346 km |  |
| 9 | ndjamena | N'Djamena | TCD Tšad | 951 418 (2009) | Tšad-järvi 167 km | **≤60** |
| 10 | yaounde | Yaoundé | CMR Kamerun | 3 762 900 (2025) | Kamerun 203 km | **≤60** |

## e06 — Afrikka 3: Keski-Afrikka (9)

Haara `paakaupungit-e06-pilvi` · ehdotettu lähdepakka: africa

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | libreville | Libreville | GAB Gabon | 703 940 (2013) | Kamerun 406 km |  |
| 2 | ciudaddelapaz | Ciudad de la Paz | GNQ Päiväntasaajan Guinea | — (2026) | Kamerun 300 km | **≤60** |
| 3 | saotome | São Tomé | STP São Tomé ja Príncipe | 80 647 (2024) | Kamerun 529 km |  |
| 4 | bangui | Bangui | CAF Keski-Afrikan tasavalta | 812 407 (2021) | Kamerun 983 km |  |
| 5 | brazzaville | Brazzaville | COG Kongon tasavalta | 2 138 236 (2023) | Kongo 258 km |  |
| 6 | kinshasa | Kinshasa | COD Kongo | 14 565 700 (2020) | Kongo 262 km |  |
| 7 | luanda | Luanda | AGO Angola | 8 816 297 (2024) | Kongo 450 km |  |
| 8 | kigali | Kigali | RWA Ruanda | 1 745 555 (2022) | Viktoria Nyanza 283 km |  |
| 9 | gitega | Gitega | BDI Burundi | 198 363 (2025) | Viktoria Nyanza 432 km |  |

## e07 — Afrikka 4: Niilin maat, Afrikan sarvi ja Itä-Afrikka (9)

Haara `paakaupungit-e07-pilvi` · ehdotettu lähdepakka: africa

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | khartum | Khartum | SDN Sudan | 1 410 858 (2008) | Suakin 641 km |  |
| 2 | juba | Juba | SDS Etelä-Sudan | 690 918 (2021) | Viktoria Nyanza 540 km |  |
| 3 | asmara | Asmara | ERI Eritrea | 963 000 (2020) | Lalibela 367 km |  |
| 4 | djibouti | Djibouti | DJI Djibouti | 767 250 (2024) | Aden 245 km |  |
| 5 | mogadishu | Mogadishu | SOM Somalia | 3 289 438 (2025) | Nairobi 1015 km |  |
| 6 | kampala | Kampala | UGA Uganda | 1 797 722 (2024) | Viktoria Nyanza 99 km | **≤60** |
| 7 | dodoma | Dodoma | TZA Tansania | 846 160 (2025) | Sansibar 381 km |  |
| 8 | lilongwe | Lilongwe | MWI Malawi | 989 318 (2018) | Mosambik 759 km |  |
| 9 | lusaka | Lusaka | ZMB Sambia | 2 212 301 (2022) | Viktorian putoukset 380 km |  |

## e08 — Afrikka 5: Eteläinen Afrikka ja Intian valtameri (10)

Haara `paakaupungit-e08-pilvi` · ehdotettu lähdepakka: africa

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | harare | Harare | ZWE Zimbabwe | 1 491 754 (2022) | Viktorian putoukset 550 km |  |
| 2 | maputo | Maputo | MOZ Mosambik | 1 136 296 (2024) | Kimberley 830 km |  |
| 3 | mbabane | Mbabane | SWZ Swazimaa | 60 691 (2017) | Kimberley 683 km |  |
| 4 | maseru | Maseru | LSO Lesotho | 343 541 (2016) | Kimberley 272 km |  |
| 5 | gaborone | Gaborone | BWA Botswana | 246 325 (2022) | Kimberley 468 km |  |
| 6 | windhoek | Windhoek | NAM Namibia | 486 186 (2023) | Namib 188 km |  |
| 7 | moroni | Moroni | COM Komorit | 74 747 (2017) | Mosambik 460 km |  |
| 8 | portlouis | Port Louis | MUS Mauritius | 140 403 (2022) | Madagaskar 903 km |  |
| 9 | victoria | Victoria | SYC Seychellit | 30 145 (2022) | Ras Hafun 792 km | **pieni** |
| 10 | antananarivo | Antananarivo | MDG Madagaskar | 1 274 225 (2018) | Madagaskar 156 km | **päällekkäin**: Madagaskar-lehden kansi (Kuninkaanmäki, Hopeapalatsi, Ranavalona II) · **≤60** |

## e09 — Aasia 1: Keski- ja Etelä-Aasia (7)

Haara `paakaupungit-e09-pilvi` · ehdotettu lähdepakka: asia

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | taskent | Taškent | UZB Uzbekistan | 3 164 030 (2025) | Samarkand 268 km |  |
| 2 | biskek | Biškek | KGZ Kirgisia | 1 120 827 (2022) | Kašgar 398 km |  |
| 3 | dusanbe | Dušanbe | TJK Tadžikistan | 1 178 251 (2020) | Samarkand 197 km |  |
| 4 | asgabat | Ašgabat | TKM Turkmenistan | 1 030 063 (2022) | Teheran 671 km |  |
| 5 | islamabad | Islamabad | PAK Pakistan | 2 363 863 (2023) | Kabul 368 km |  |
| 6 | thimphu | Thimphu | BTN Bhutan | 114 551 (2017) | Lhasa 283 km |  |
| 7 | dhaka | Dhaka | BGD Bangladesh | 10 295 786 (2022) | Kolkata 244 km |  |

## e10 — Aasia 2: Intian valtameri, Kaakkois- ja Itä-Aasia (8)

Haara `paakaupungit-e10-pilvi` · ehdotettu lähdepakka: asia

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | male | Malé | MDV Malediivit | 137 238 (2022) | Colombo 765 km |  |
| 2 | naypyidaw | Naypyidaw | MMR Myanmar | 1 129 322 (2024) | Mandalay 249 km | **herkkä**: spec-asia Myanmar-linjaus (ei juntta- eikä konfliktisisältöä) |
| 3 | vientiane | Vientiane | LAO Laos | 820 940 (2015) | Hanoi 477 km |  |
| 4 | phnompenh | Phnom Penh | KHM Kambodža | 2 281 951 (2019) | Bangkok 536 km |  |
| 5 | kualalumpur | Kuala Lumpur | MYS Malesia | 1 982 112 (2020) | Singapore 311 km |  |
| 6 | bandarseribegawan | Bandar Seri Begawan | BRN Brunei | 82 437 (2021) | Borneo 635 km |  |
| 7 | pjongjang | Pjongjang | PRK Pohjois-Korea | 3 255 288 (2008) | Soul 195 km | **herkkä**: ei nykypolitiikkaa |
| 8 | srijayawardenepurakotte | Sri Jayawardenepura Kotte | LKA Sri Lanka | 96 189 (2024) | Colombo 6 km | **päällekkäin**: Colombo 6 km:n päässä · **≤60** |

## e11 — Amerikat 1: Pohjois- ja Väli-Amerikka, Suuret Antillit (9)

Haara `paakaupungit-e11-pilvi` · ehdotettu lähdepakka: northamerica

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | washington | Washington | USA Yhdysvallat | 693 645 (2025) | New York 330 km |  |
| 2 | ottawa | Ottawa | CAN Kanada | 1 017 449 (2021) | Montreal 161 km |  |
| 3 | belmopan | Belmopan | BLZ Belize | 20 754 (2022) | Guatemala 348 km | **pieni** |
| 4 | sansalvador | San Salvador | SLV El Salvador | 330 543 (2024) | Guatemala 177 km |  |
| 5 | tegucigalpa | Tegucigalpa | HND Honduras | 1 342 329 (2024) | Managua 242 km |  |
| 6 | sanjose | San José | CRI Costa Rica | 352 381 (2022) | Managua 341 km |  |
| 7 | santodomingo | Santo Domingo | DOM Dominikaaninen tasavalta | 1 029 110 (2022) | San Juan 403 km |  |
| 8 | portauprince | Port-au-Prince | HTI Haiti | 987 310 (2015) | San Juan 656 km |  |
| 9 | kingston | Kingston | JAM Jamaika | 89 186 (2022) | Havanna 816 km |  |

## e12 — Amerikat 2: Bahama ja Itäinen Karibia (9)

Haara `paakaupungit-e12-pilvi` · ehdotettu lähdepakka: northamerica

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | nassau | Nassau | BHS Bahama | 296 732 (2022) | Miami 300 km |  |
| 2 | saintjohns | Saint John's | ATG Antigua ja Barbuda | 22 219 (2011) | San Juan 476 km | **pieni** |
| 3 | basseterre | Basseterre | KNA Saint Kitts ja Nevis | 13 652 (2022) | San Juan 381 km | **pieni** |
| 4 | roseau | Roseau | DMA Dominica | 14 725 (2011) | San Juan 614 km | **pieni** |
| 5 | castries | Castries | LCA Saint Lucia | 36 431 (2022) | San Juan 738 km | **pieni** |
| 6 | kingstown | Kingstown | VCT Saint Vincent ja Grenadiinit | 10 690 (2023) | Caracas 684 km | **pieni** |
| 7 | bridgetown | Bridgetown | BRB Barbados | 77 394 (2021) | Caracas 844 km |  |
| 8 | stgeorges | St. George's | GRD Grenada | 2 681 (2022) | Caracas 587 km | **pieni** |
| 9 | portofspain | Port of Spain | TTO Trinidad ja Tobago | 37 074 (2011) | Caracas 588 km | **pieni** |

## e13 — Amerikat 3: Etelä-Amerikka (5)

Haara `paakaupungit-e13-pilvi` · ehdotettu lähdepakka: southamerica

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | georgetown | Georgetown | GUY Guyana | 125 683 (2022) | Boa Vista 524 km |  |
| 2 | paramaribo | Paramaribo | SUR Suriname | 240 924 (2012) | Cayenne 334 km |  |
| 3 | brasilia | Brasília | BRA Brasilia | 2 817 381 (2022) | Ilha do Bananal 607 km |  |
| 4 | lapaz | La Paz | BOL Bolivia | 755 732 (2024) | Titicaca 148 km | **≤60** |
| 5 | santiagodechile | Santiago de Chile | CHL Chile | 438 856 (2024) | Valparaíso 100 km | **≤60** |

## e14 — Oseania (9)

Haara `paakaupungit-e14-pilvi` · ehdotettu lähdepakka: oceania

| # | id | nimi | maa | asukkaat | lähin pelikaupunki | huomio |
|---|---|---|---|---|---|---|
| 1 | canberra | Canberra | AUS Australia | 484 630 (2025) | Sydney 248 km |  |
| 2 | apia | Apia | WSM Samoa | 35 974 (2021) | Suva 1145 km | **pieni** |
| 3 | nukualofa | Nukuʻalofa | TON Tonga | 21 185 (2021) | Suva 745 km | **pieni** |
| 4 | funafuti | Funafuti | TUV Tuvalu | 6 602 (2022) | Suva 1073 km | **pieni** |
| 5 | southtarawa | South Tarawa | KIR Kiribati | 63 439 (2020) | Honiara 1874 km |  |
| 6 | majuro | Majuro | MHL Marshallinsaaret | 23 156 (2021) | Honiara 2232 km | **pieni** |
| 7 | palikir | Palikir | FSM Mikronesia | 4 903 (2023) | Honiara 1829 km | **pieni** |
| 8 | yaren | Yaren | NRU Nauru | 803 (2021) | Honiara 1253 km | **pieni** |
| 9 | ngerulmud | Ngerulmud | PLW Palau | 318 (2020) | Sepik 1639 km | **pieni** |

## Yhteenveto

- 118 kaupunkia, 14 erää (Eurooppa 15, Kaukasus ja Lähi-itä 8, Afrikka 48, Aasia 15, Amerikat 23, Oseania 9).
- Päällekkäisiä 6 (vatikaanivaltio, freetown, antananarivo, reykjavik, tunis, srijayawardenepurakotte): jos ne jätetään kevyiksi, kaupunkeja on 112.
- Pieniä (alle 50 000 asukasta) 23; alle 60 lautayksikön päässä pelikaupungista 25.
- Eurooppa ensin: e01 on pilotti, jonka pistokokeen jälkeen jatketaan.
