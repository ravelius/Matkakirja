# Pelikoodari → LAV: 19 lisäystä verrattuna pintoihin, 6.11.2026

**Korvaa 09.2x-vastauksen "18 PÄÄSEE".** Se ei erottanut kaistaa, joka on olemassa olevan seinän takana. Lista lyhenee: 7 kohtaa tarvitsee koko seinän, 9:ssä seinä jää pois tai lyhenee tai sen voi korvata lyhyellä raon tukolla, 3 on epäselviä.

Lähde: kartta v19 (`peli-lahde.npz`), pinnat 0,25 m (`pinnat.npz`), täytteet `koejuuri-aukot9`. Säde linjasta kumpaankin suuntaan kehon korkeudella: osuuko ensin kuljettavaan vai seinään, ja kuinka kaukana. Ylhäältä katsottu arkki katsottu kaikista 19:stä.
**Ei pelikuvia.** Pinnoissa eivät ole täytteet eivätkä ovilehdet. Metrit on luettu arkista noin 0,5 m:n tarkkuudella. Tulkinta on kartasta, joten varmista kuvalla ennen kuin rakennat tai pudotat.

Arkit ja skriptit: `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lisaykset-20261106/` (`arkki2-1.png` kohdat 1–10, `arkki2-2.png` kohdat 11–19). Vihreä = kuljettava, musta = seinä kehon korkeudella, harmaa = katto, valkoinen = ei kuljettava eikä katettu, sininen = ikkuna, oranssi = ovilehti, punainen = suunniteltu linja, violetti = täyte, keltainen = mitattu portti.

## Seinä jo olemassa: pois listalta (3)
| Nro | Kohde | Havainto |
|---|---|---|
| 13 | (-107,6; 351,4) | Linja on salin seinän päällä (0,2 m). |
| 18 | (-144,4; 287,9) | Keskellä suljettua salia, seinä kummallakin puolella, ei kuljettavaa. |
| 19 | (-133,4; 285,2) | Seinä 0,2 m kummallakin puolella. |

## Linja olemassa olevan seinän vieressä: lyhenee tai poistuu (3)
| Nro | Kohde | Havainto | Jäljelle jää |
|---|---|---|---|
| 12 | (-105,4; 339,6) | 23,8 m / 26,4 m on 0,5 m seinän edessä. | Itäpää x noin -95,5…-91,5 on kuljettavaa molemmin puolin. Seinä katkaisisi kujan eikä peittäisi aukkoa, joten todennäköisesti koko kohde pois. |
| 16 | (-163,5; 441,4) | 22 m / 27 m kulkee salin sisällä, seinä 0,6 m linjan eteläpuolella. | Valkoisen kaistan pää x noin -156…-153. Sen itäpuolelta -150,4:ään on avointa maata, sinne ei seinää. |
| 17 | (-113,1; 443,2) | Itäosa on olemassa olevan seinän päällä. | Valkoisen kaistan pää x noin -124…-121,8. Sen länsipuolella -126,5:een on avointa maata, sinne ei seinää. |

## Kaista seinien sisällä, raon takana: rako kiinni pitkän seinän sijaan (3)
Sinun epäilysi pitää paikkansa näissä kolmessa. Kuljettava kaista kiertää salin avointa sivua ulkoseinän sisäpuolella, ja sinne pääsee kapeasta raosta. Kun rako suljetaan, kaistalle ei pääse, eikä salin avoin sivu näy maan tasolta.

| Nro | Kohde | Tasku | Portti |
|---|---|---|---|
| 2 | (206,2; 436,1) | 13 m² | Kaakkoiskulma noin (209; 431,5), kapein 0,75 m |
| 3 | (163,8; 434,8) | 12,5 m² | Kaakkoiskulma noin (170,4; 430,4), kapein 0,75 m |
| 4 | (204,7; 517,0) | ei erillistä taskua leveämmällä mittarilla, kaista 0,75–1,25 m | Pohjoispää noin (205–207; 523–524), kapein 1,25 m |

**Rakojen määrää ei ole todistettu.** Yksi portti on mitattu kullekin. Yritys luetella kaikki raot epäonnistui, koska seinän vierusta on yhtä kapeaa kuin rako. Katso arkista, onko samalla kaistalla toinen pää auki (kohdan 2 lounaiskulma näyttää läheiseltä).

Samanlainen, mutta laaja tapaus: käytävä kohdan 12 eteläpuolella, 127 m², liittyy muuhun kartan mukaan vain 0,75 m:n portilla noin (-92,9; 335). Portti on 5 m pitkä ja katon alla. Ei tarkistettu kuvasta, ja kohdan 11 valkoinen kaista on sen länsipäässä.

## Oikea avoin sivu kulkualueelle: seinä tarvitaan (7)
| Nro | Kohde | Pituus | Mitä vasten |
|---|---|---|---|
| 1 | (-275,8; -128,1) | 24,8 m | Kuja ulkoseinän vieressä, leveys noin 1,75 m |
| 5 | (155,1; 399,4) | 11,2 m | Kuja, noin 2,25 m |
| 6 | (-185,9; 481,2) | 9,4 m | Kuja, noin 1,25 m |
| 7 | (-247,0; -173,5) | 5,9 m | Kuja, noin 1,75 m |
| 9 | (-81,1; 240,4) | 7,2 m | Avoin sivu, edessä irrallinen seinänpätkä, josta pääsee ohi |
| 10 | (-100,2; 199,3) | 28,7 m | Avoin kenttä |
| 11 | (-120,8; 341,0) | 3,7 m | Käytävän pää |

**Ristiriita kuviesi kanssa:** kuvat-l:ssä kohdat 1, 5 ja 9 olivat "ehjä seinä", mutta pinnoissa linjan kohdalla ei ole seinää. Kohdassa 1 kamera (no + 14 m) oli todennäköisesti ulkoseinän takana ja näki sen, ei linjaa (päätelmä). Ota näistä kuva kaistalta linjaa kohti ennen kuin päätät.

## Epäselvät: kuva ensin (3)
- **8 (-69,8; 426,3):** linja sulkee syvennyksen länsisivun, mutta pohjoissivu (noin 3 m) jää auki. Jos seinä tehdään, tarvitaan toinenkin.
- **14 (-95,2; 345,5) ja 15 (-95,2; 351,1):** kuljettavaa on molemmin puolin. Seinä voi katkaista kulun eikä peittää aukkoa.

## Mitä tästä seuraa kartalle
Raon tukko ja seinät muuttavat karttaa: kun lista on valmis, ajan kartan ja rajat uudelleen (luovutus -0004 kohta 2.1). Kerro, jos haluat tarkistuksen johonkin kohtaan ennen vientiä.
