# Pallokierros: liikesäännöt luokittain

Linjaus: LIIKKUVAT KOHTAUKSET TEHDÄÄN KUIN ELOKUVA (omistaja 9.10.2026), kohta 2. Kamera on hidas ja lähes huomaamaton. Kiihdytys ja jarrutus ovat pehmeitä. Äkkikäännöksiä ei ole. Kova kiihdytys on sallittu vain harkittuna tehokeinona. Korostukset, kuvat ja käyttöliittymä noudattavat linjausta KAIKKI LIIKE ANIMOIDAAN PEHMEASTI (200–400 ms, ease-in-out, ei hyppyjä).

Koodipaikat ovat polussa `proto: Assets/Matkakirja/Linssit/` haarassa `linssiseppa/kierros-170` (5e71527ff, 9.10. 08.40). Lyhenteet:
- **OS** = `Ydin/Kierros/OpasSilmukka.cs`
- **OK** = `Ydin/Kierros/OpasKuvaus.cs`
- **SOV** = `Unity/OpasSovitin.cs`

"Tavoite" on ehdotus. Arvot lukitsee Linssiseppä, Päätoimittaja hyväksyy, ja kuva-arkki todentaa ne.

Mittayksiköt:
- **kulku** = katsepisteen nopeus maassa (m/s)
- **silmä** = kameran nopeus (m/s)
- **kuvan nopeus** = silmän nopeus / katse-etäisyys (rad/s). 0,1 rad/s ≈ 6°/s; tämä kuvaa parhaiten, miten nopealta liike näyttää.
- **kääntö** = suuntiman muutos (°/s)

## 0. Mitattu nykytila (telemetria simulaattorista)

| Ajo (loki) | Build | Siirtymä | Matka | Kesto | Kulku huippu | Silmä huippu | Kuvan nopeus huippu | Kääntö huippu | Kiihdytys / jarrutus 10→90 % |
|---|---|---|---|---|---|---|---|---|---|
| todistus-yo170-pariisi-20261009-0733 | 170 (0ae25418) | avausnäkymä 5 km → Tuileries (kartan kautta) | 1 840 m | 18,0 s | 389 m/s | **913 m/s** | 0,33 rad/s | 3,6 °/s | 3,1 / 4,6 s |
| todistus-yo170-tukholma-20261009-0735 | 170 (0ae25418) | avausnäkymä → kuninkaanlinna (kartan kautta) | 379 m | 18,0 s | 131 m/s | 36 m/s | 0,007 rad/s | 3,7 °/s | 3,2 / 3,0 s |
| todistus-j165-video-20261008-0951 | 165 (vanha profiili: 13 s, rampit 6,5 s) | Notre-Dame → Concorde | 2 518 m | 13,0 s | 534 m/s | 693 m/s | 1,15 rad/s | 8,6 °/s | 3,1 / 3,9 s |
| sama | 165 | Concorde → Champs-Élysées | 1 076 m | 13,0 s | 228 m/s | 325 m/s | 0,74 rad/s | 8,6 °/s | 3,2 / 3,7 s |
| sama | 165 | Champs-Élysées → Riemukaari | 1 043 m | 13,0 s | 221 m/s | 367 m/s | **1,46 rad/s** | 8,6 °/s | 3,1 / 3,9 s |
| sama | 165 | Riemukaari → Eiffel-torni | 1 722 m | 13,0 s | 365 m/s | 608 m/s | 1,19 rad/s | 8,6 °/s | 2,9 / 4,0 s |
| sama | 165 | Eiffel-torni → Orsay | 2 352 m | 13,0 s | 499 m/s | 668 m/s | 0,67 rad/s | 8,6 °/s | 3,1 / 3,9 s |
| sama | 165 | Orsay → Louvre | 692 m | 13,0 s | 147 m/s | 299 m/s | 0,73 rad/s | 8,6 °/s | 3,1 / 3,9 s |
| todistus-kysy166c-20261008-1758 | 166 | Notre-Dame → Concorde | 2 518 m | 13,0 s | – | – | 1,32 rad/s | 9,1 °/s | – |

Huomioita mittauksista:
- Täyttä kierrosta nykyisillä arvoilla (rampit 9 s, rauhallinen kerroin 1,3, ZoomRho 0,3) ei ole ajettu simulaattorissa. Junan 170 ajoista on vain ensimmäinen lento kartan kautta.
- Siksi kohtauslistojen lentojen kestot on laskettu koodista (ks. kohtauslistojen lähde-osio).
- Lentomittarin "suurin kiihtyvyys" lokissa (esim. Tuileries 306,8 m/s², Concorde 717 m/s²) mittaa myös zoomausta. Se ei ole kameran todellinen kiihtyvyys maassa, eikä sitä käytetä tavoitteena.

## 1. Kamera: lento kohteelta toiselle

| Sääntö | Nykyarvo | Koodipaikka | Tavoite | Ero |
|---|---|---|---|---|
| Lennon perusta | 3,0 + 2,2·√km s (alle 10 km) × pallokerroin 1,6 (alle 0,5 km) … 1,15 (yli 3 km) | OS:497, OS:527–533 | säilyy perustana | – |
| Lyhimmän lennon kesto | 2 × ramppi = 18 s, rauhallisena × 1,3 = **23,4 s** (myös 94–146 m:n hypyt) | OS:503, OS:931, OS:1645 | alle 300 m: ei lentoa vaan kaari pysähdyksellä (kohta 3), tai liuku 10–12 s | suuri: 100 m:n hyppy 23 s on tyhjä siirtymä |
| Rauhallinen kerroin | × 1,3 kaikkiin paitsi kahteen pisimpään (yli 1,2 km) | OS:930–931, OS:949, OS:1644–1645 | säilyy | – |
| Nopeat lennot | 2 pisintä väliä yli 1,2 km, kesto 18 s | OS:930, OS:949 | **enintään 1 per kaupunki**, valitaan käsikirjoituksessa (syy kirjattu), ei automaattisesti pisimmistä | Pariisissa nyt 2 (Concorde → Eiffel 0,77 rad/s, Champs → Sacré-Cœur 1,14 rad/s, arvio) |
| Kiihdytys ja jarrutus | smootherstep-rampit, kumpikin vähintään 9 s (10→90 % noin 3 s) | OS:493–504, OK:519–532 | säilyy (≥ 3 s 10→90 %) | mitattu 3,0–4,7 s, kunnossa |
| Huippunopeus | ei omaa rajaa, seuraa kestosta. Arvio: tavallinen 0,1–0,5 rad/s, nopea 0,56–1,14 rad/s | OK:296–326 (ZoomPolku OK:347) | **tavallinen ≤ 0,25 rad/s**, tehokeino ≤ 0,6 rad/s | Tukholma: tavallinen jo ≤ 0,21, nopea Skansen → Katarina 0,56. Pariisi: Notre-Dame → Louvre 0,39, Eiffel → Riemukaari 0,49, nopeat 0,77 ja 1,14 |
| Lentokorkeus (kaari) | van Wijk–Nuij-polku, ZoomRho 0,3 (matala, lähes ilman nousua) | OK:295 | säilyy, nousu vain esteen tai yleiskuvan syystä | – |
| Sumennusten ohitus | nosto 500 m:iin, kun reitti kulkee alle 250 m:n päästä Googlen sumennuksesta | OK:368–377, OK:386–412 | säilyy | – |
| Kääntö lennolla | enintään 10 °/s (tulosuunnan raja, jakaja 5,5) | OS:507, OS:513–521 | **≤ 5 °/s**, kääntö vain lennon keskiosassa | mitattu 3,6–3,7 °/s (junan 170 ensimmäiset lennot), 8,6–9,1 °/s (165/166) |
| Panorointi lennolla | kamera kääntyy silmän ympäri enintään 20° (sin²-kumpu) ja palaa, suunta vaihtuu joka lennolla, vain yli 8 s:n lennoilla | OS:325, OS:1228–1232, OS:1648 | 10° tai vain pitkillä lennoilla, sama suunta kuin lennon kaari, ei vuorottelua | vuorotteleva suunta näyttää heilumiselta |
| Kaari lennon lopussa | tulokehys kiertyy enintään 45° viimeisillä 12 s:lla, enintään 4 °/s, varoalue 60° | OS:335, OS:339–376 | säilyy, jatkuu pysähdyksen kaarena samaan suuntaan | – |
| Avauksen suora lasku | avausnäkymästä (1 100 m / 50°) 1. kohteeseen vähintään 24 s, yksi S-käyrä | OS:323, OS:404–409, OK:467–479, SOV:589 | säilyy | – |
| Lasku korkealta | kartan kautta (ei kierrosta): tavallinen profiili, 5 km:n yläkuvasta 1 840 m:n kohteeseen 18 s; kierroksella yli 2 000 m:stä vähintään 18 s | OS:503, OS:1643–1645, OS:315, OS:732 | **vähintään 30 s** tai välietappi 1 100 m:ssä | mitattu silmä 913 m/s ja lasku 658 m/s (Tuileries) = kierroksen rajuin liike |
| Kaukosiirto | yli 30 km: ei lentoa, latausruutu | OS:614 | säilyy | – |
| Paluu vapaasta lennosta | vähintään 6 s, pallon S-käyrät | OS:877, OS:860–875 | säilyy | – |

## 2. Kamera: saapuminen

| Sääntö | Nykyarvo | Koodipaikka | Tavoite | Ero |
|---|---|---|---|---|
| Lennon kaari valmis ennen saapumista | 96 % lennosta, nopeus 0 saapuessa | OS:337, OS:362–364 | säilyy | – |
| Pysähdyksen kaari kiihtyy | S-käyrä 3 s | OK:201 (KaariAlkuS) | säilyy | – |
| Korjatun kehyksen liuku | 1,0 s (avauksessa 3 s tai lennon loppuun asti) | OS:305, OS:315, OS:1217–1219 | säilyy | – |
| Saapuminen odottaa laattoja | pallossa ei odota (muuten enintään 4 s) | OS:198, OS:1241 | säilyy | – |
| Korostus syttyy | 1,0 s:n häivytys saapumisesta | OS:220, OS:1144–1146 | säilyy | – |

## 3. Kamera: kiertely ja kehystys pysähdyksellä

| Sääntö | Nykyarvo | Koodipaikka | Tavoite | Ero |
|---|---|---|---|---|
| Kehyksen kallistus | katu 66°, rakennus 58°, alue 58°, pallossa + 6° (matalampi) | OK:23, OK:33, OK:88 | säilyy | – |
| Kehyksen etäisyys | katu 110–350 m, rakennus 100–600 m, alue 160–350 m, aukio ≤ 220 m | OK:31, OK:33, OK:76 | säilyy | – |
| Sivukulma | katse 25° tulosuunnasta sivuun | OK:32 | säilyy | – |
| Kohdekaari (kierto kohteen ympäri) | silmän nopeus enintään 10 m/s, enintään 5 °/s, kokonaiskierto enintään 80° (lennon kaari mukaan lukien), hidastuu viimeisillä 8°:lla | OK:201, OS:335, OS:1476–1484 | **kaaren kesto = pysähdyksen kesto**: nopeus 45–80° / pysähdyksen kesto, enintään 3 °/s | lyhyillä pysähdyksillä (5–10 s) kaari jää kesken. Pitkillä (35–55 s) kaari loppuu noin 20–30 s:ssa ja pallo leijuu |
| Spiraali (lasku kierron aikana) | korkeus −35 %, aikavakio ≥ 14 s, enintään 2,5 m/s | OK:201, OS:1487–1490 | säilyy, aikavakio pysähdyksen kestosta | pitkillä pysähdyksillä lasku valmis noin 21 s:ssa |
| Leijunta kaaren päässä | sallittu (omistaja 8.10. 18.4x) | OS:1482 | **enintään 3 s** kerronnan aikana | nykyisin 10–30 s (Stortorget arviolta lähes 55 s) |
| Jarrutus ennen lähtöä | 2,0 s (pelaajan valinnassa 1,0 s) | OS:1444, OS:1553–1554 | säilyy | – |
| Avausnäkymän kierto | 14° ja lähestyminen 15 % 16 sekunnissa, sitten paikallaan | OS:1510, OS:1496–1505 | **kesto = avauksen kesto** (Tukholma 31 s, Pariisi 19 s, + opastus 12,5 s) | Tukholma: 15–30 s paikallaan avauksen lopussa |

## 3b. ESITTELYKORKEUS: rakennuksen puolivälin korkeudelta (sitova, omistaja TF 169, PT 9.10.2026)

Omistaja sanatarkasti: "rakennukset ovat kuitenkin kolmiulotteisia, ja liian korkealta katsottuna ne eivät näytä juuri miltään verrattuna siihen, että ollaan noin rakennuksen puolivälin korkeudella tai hieman yläpuolella".

**Sääntö:**
1. Kohteen esittelyssä pallo laskeutuu korkeudelle, joka on rakennuksen puolivälin ja hieman sen yläpuolen välissä. Silmän korkeus maasta on 0,5–0,7 × H, missä H on kohteen korkeus.
2. Pariisin alussa pallo laskeutuu koko ajan alemmas Notre-Damen esittelyn aikana.
3. Concorden aukiolla pallo menee alemmas, obeliskin tasolle.
4. H tulee omasta aineistosta:
   - ensin Karttasepän jalanjäljet (`proto-3d/_tyo/karttaseppa/jalanjaljet-20261009/jalanjaljet-<kaupunki>.json`, `korkeus_m`, OSM, ODbL)
   - jos niissä ei ole korkeutta, oma korkeuskenttä (OmaKorkeus, DSM) jalanjäljen sisältä miinus maa
   - ei koskaan Googlen laatoista (Map Tiles -ehdot C4)

**Nykytila koodissa:**
- **Kehys.** OK:63–99 (Kehysta) laskee etäisyyden kohteen koosta ja korkeudesta. Kallistus on rakennuksella 58° + 6° (pallo) = 64° pystysuorasta. Katsepiste on 0,45 × H − 0,06 × etäisyys (OK:82, OK:93). Korkealle kohteelle (H ≥ 60 m) etäisyyttä kasvatetaan, kunnes koko kohde mahtuu kuvaan (OK:92, OK:535–555).
- **Kattoraja.** OS:1657–1658 / `OpasOhjaus.Rajoita` (OpasOhjaus.cs:75–86) pitää kameran vähintään 55 m maan yläpuolella (KattoYlaM, OpasOhjaus.cs:20). Kallistus on enintään 78°.
- **Spiraali.** Pysähdyksellä spiraali laskee silmää 35 % (SpiraaliLasku, OK:201), mutta ei alle 60 m katsepisteen yläpuolelle (SpiraaliMinKorkeusM, OK:201) eikä alle kattorajan + 5 m (OK:183–185).
- **Korkeuden lähde.** Pelissä H = max(workerin `korkeus_m`, oman pintamallin keskipiste − kehän mediaani) (SOV:2681–2701, OK:579–589). Jalanjälkien `korkeus_m`:ää ei käytetä kehykseen. Se on käytössä vain muotokorostuksessa (`Unity/KohdeKorostus.cs`).

**Seuraus:** silmä on nyt 55–400 m kohteen maan yläpuolella. Matalimmillaan se on kattorajan 55 m. Matalilla rakennuksilla (Louvre 16 m, Ritarihuone 26 m) tämä on 3–14 × H. Taulukko on laskettu Kehysta + Rajoita + Spiraali -funktioista, ja H on jalanjäljistä.

| Kohde | H (jalanjäljet) | Silmä maasta saapuessa nyt | Spiraalin jälkeen nyt | Tavoite 0,5–0,7 × H |
|---|---|---|---|---|
| Notre-Dame | 96 m | 117 m | 92 m | **48–67 m**, laskeutuu koko esittelyn ajan |
| Louvre | 16 m | 221 m | 135 m | 8–11 m → alaraja (ks. alla) |
| Orsay | 35 m | 97 m | 64 m | 18–24 m → alaraja |
| Concorden aukio | – (aukio; obeliski noin 23 m + jalusta, mitattava omasta korkeuskentästä) | 57 m | 57 m | **obeliskin taso noin 15–25 m** |
| Eiffel-torni | 330 m | 403 m | 268 m | 165–231 m |
| Riemukaari | 50 m | 61 m | 61 m | 25–35 m |
| Champs-Élysées | – (katu) | 88 m | 60 m | kattojen yläpuolelle (ks. alla) |
| Sacré-Cœur | 84 m | 102 m | 88 m | 42–59 m |
| Tukholman kuninkaanlinna | 39 m | 115 m | 76 m | 20–27 m → alaraja |
| Suurkirkko | 63 m | 77 m | 77 m | 32–44 m |
| Gamla stan / Stortorget | – (alue / aukio) | 130 / 55 m | 79 / 55 m | kattojen yläpuolelle |
| Ritarihuone | 26 m | 55 m | 55 m | 13–18 m → alaraja |
| Riddarholmenin kirkko | 87 m | 106 m | 89 m | 44–61 m |
| Tukholman kaupungintalo | 106 m | 129 m | 96 m | 53–74 m |
| Valtiopäivätalo | 35 m | 75 m | 66 m | 18–24 m → alaraja |
| Kungsträdgården, Skeppsholmen, Skansen | – (alue) | 130 m | 79 m | kattojen yläpuolelle |
| Kansallismuseo | 33,5 m | 62 m | 62 m | 17–23 m → alaraja |
| Vasa-museo | 41 m | 69 m | 69 m | 20–29 m → alaraja |
| Katarinan kirkko | 64,5 m | 78 m | 78 m | 32–45 m |

**Ehdotetut tavoitearvot ja muutoskohdat** (Linssiseppä päättää ja todentaa kuva-arkilla):

| Kohta | Nyt | Ehdotus |
|---|---|---|
| Silmän tavoitekorkeus pysähdyksen lopussa | spiraali −35 %, vähintään 60 m katsepisteen yllä | 0,5–0,7 × H maasta. Spiraali laskee sinne koko pysähdyksen ajan (q = kerronnan osuus), ei aikavakion mukaan |
| Saapumiskorkeus | kehyksestä (64°) | enintään 1,0–1,2 × H, jotta spiraalilla on matkaa alas mutta pudotus ei näytä syöksyltä |
| Alaraja (matalat rakennukset ja alueet) | kattoraja 55 m maasta (OpasOhjaus.cs:20), spiraali 60 m katsepisteen yllä (OK:201) | **ympäröivien kattojen korkeus + 10 m** omasta pintamallista kehän näytteistä (OK:563–575 KehaPiste, OmaKorkeus). Kuitenkin vähintään 20 m maasta. Kiinteä 55 m pois pallon esittelystä. Pelaajan ohjaus pitää oman rajansa |
| Kallistus | enintään 78° | enintään 85°, jotta katse on lähes vaakasuora puolivälin korkeudelta. Vaakaetäisyys pysyy, ja korkea kohde mahtuu yhä kuvaan (KorkeaEtaisyys lasketaan uudella kallistuksella) |
| Katsepiste | 0,45 × H − 0,06 × etäisyys | säilyy (kohteen puoliväli, kohde hieman keskikohdan yllä) |
| Korkeuden lähde | worker `korkeus_m` tai DSM-keskipiste | jalanjälkien `korkeus_m` ensin, sitten oma DSM jalanjäljen sisältä (90. persentiili) miinus maa |
| Notre-Dame (Pariisin alku) | suora lasku 1 100 m → 117 m, spiraali → 92 m | laskeutuminen jatkuu katkeamatta: suora lasku → noin 100 m saapuessa → 55–60 m kerronnan lopussa (oma kohtaus, kohtauslista-pariisi.md) |
| Concorden aukio | 57 m (kattoraja) | laskeutuminen obeliskin tasolle noin 20 m maasta (alaraja aukiolla: ei kattoja lähellä). Oma kohtaus, kohtauslista-pariisi.md |
| Lentokorkeus kohteiden välillä | ZoomRho 0,3 (OK:295) | säilyy. Nousu tapahtuu lennon alussa matalalta esittelykorkeudelta, joten lähtö on pehmeä S-käyrä myös pystysuunnassa (Kaari, OK:445–452) |

## 4. Kamera: katse ylös/alas ja pelaajan ohjaus

| Sääntö | Nykyarvo | Koodipaikka | Tavoite | Ero |
|---|---|---|---|---|
| Katse ylös korista | enintään 45° horisontin yläpuolelle, paluu kriittisesti vaimennetulla jousella (ω 6: lähes perillä 0,8 s, nollassa 1,5 s) | `Ydin/Kierros/KoriKatse.cs`:11 | säilyy (ei ylitystä, paluu ≤ 1,5 s) | – |
| Tappiohjaus pysähdyksellä | kierto 22 °/s, kallistus 12 °/s, etäisyys 0,4 log/s, syöte 0,3 s, hiipuma 0,45 s, paluu 1,5 s | `Ydin/Kierros/OpasOhjaus.cs`:18–20 | säilyy (pelaajan liike) | – |
| Lähtö odottaa ohjauksen jälkeen | 4 s | OS:1454 | säilyy | – |

## 5. Kamera: vapaa lento (pelaajan ohjaama)

Linjaus koskee automaattista kameraa. Vapaa lento on pelaajan liikettä, ja siinä tarkistetaan vain pehmeys.

| Sääntö | Nykyarvo | Koodipaikka | Tavoite |
|---|---|---|---|
| Kääntö | 36 °/s, syöte 0,35 s, hiipuma 0,5 s | `Ydin/Kierros/OpasVapaaLento.cs`:24 | säilyy |
| Nopeusvipu | 0,25–3 ×, vähintään 6,5 m/s | `Ydin/Kierros/OpasVapaaLento.cs`:23–25 | säilyy |
| Paluu kierrokselle | vähintään 6 s pehmeä lento | OS:877 | säilyy |

## 6. Kori (overlay)

| Sääntö | Nykyarvo | Koodipaikka | Tavoite |
|---|---|---|---|
| Keinunta | 1,8° / 5,5 s + 0,7° / 8,3 s | `Ydin/Kierros/KoriLiike.cs`:18 | säilyy |
| Vastaliike kiihdytyksessä | enintään 5,5°, jakso 3 s, vaimennus 0,26, köydet 0,55 s viiveellä | `Ydin/Kierros/KoriLiike.cs`:19–21 | säilyy. Vastaliike on hyvä merkki kiihdytyksestä, kun kiihdytys on pehmeä |

## 7. Korostukset

| Sääntö | Nykyarvo | Koodipaikka | Tavoite | Ero |
|---|---|---|---|---|
| Kohteen korostus (silmukka) | syttyy 1,0 s, sammuu 1,0 s (pelaajan valinnassa 0,4 s), sammuu ennen lentoa | OS:220–224, OS:1144–1146 | säilyy (maailmassa oleva valo, ei käyttöliittymä) | – |
| Rengas ja muotokorostus | sisään 0,9 s, pois 0,5 s, hengitys 3,2 s ± 12 %, hehku 2,5 s → 45 % 1,5 s:ssa, peitto 0,55 | `Unity/OpasKorostusKuva.cs`:28–30, `Unity/KohdeKorostus.cs`:80–83 | säilyy | – |

## 8. Kuvat ja käyttöliittymä

| Sääntö | Nykyarvo | Koodipaikka | Tavoite | Ero |
|---|---|---|---|---|
| Yksityiskohtakortti | sisään 0,6 s, pois 0,8 s, kääntö 14° | `Unity/YksityiskohtaKortti.cs`:23, `Ydin/Kierros/KorttiAsettelu.cs`:18 | **200–400 ms** (KAIKKI LIIKE ANIMOIDAAN PEHMEASTI), tai Päätoimittajan poikkeus kirjattuna | 0,6 / 0,8 s on yli linjan |
| Kortin näyttöaika | 7 s, väli vähintään 5 s, ankkurisanan kohdalla (sana-ajat) | `Ydin/Kierros/OpasYksityiskohdat.cs`:18 | säilyy, ja kortti ei aukea lennon nopeimmassa vaiheessa | – |
| Nimilappu | kierroksella pois (korostus riittää) | SOV:261–263 | säilyy | – |

## 9. Kertoja ja sen ajoitus kameraan nähden

| Sääntö | Nykyarvo | Koodipaikka | Tavoite | Ero |
|---|---|---|---|---|
| Kohteen kerronnan alku | lähdöstä 2,5 s (max(5, kesto − 2,5) ennen saapumista) | OS:176–188, OS:1237 | **1. lause päättyy saapumishetkellä ± 1 s** (lauseajoista: alku = saapuminen − lauseen 1 loppu) | nyt saapuminen osuu viimeiseen lauseeseen, ja 15–21 s kerronnasta kuuluu ennen kuin kohde on kuvassa |
| Tauko kerronnan jälkeen | 1,0 s, sitten korostus pois ja jarrutus 2,0 s | OS:1115, OS:1166–1171, OS:1444 | säilyy | – |
| Hiljaisuus kerrontojen välissä | noin 5,5 s (1 + 2 + 2,5), laattaodotuksen kanssa enintään 10,5 s | OS:206, OS:1564 | **≤ 1,5 s** (omistaja 9.10.: "liikaa taukoja") | +4–9 s |
| Siltalause | joka 4. lento, enintään 3 / ryhmä, kerronta 0,25 s lauseen jälkeen | `Ydin/Kierros/OpasSiltalauseet.cs`:222, SOV:2190–2199 | säilyy, ajoitetaan lennon alkuun | – |
| Historiaosio | joka 2. lento ilman siltalausetta, lento ≥ 12 s, kerronta 0,8 s osion jälkeen, odotus enintään 60 s | `Ydin/Kierros/OpasHistoria.cs`:14–15, SOV:2195, SOV:2206, SOV:2272–2286 | **osio vain lennolle, jonka kesto ≥ osion kesto − 5 s**, tai osio jaetaan lauseittain | osio 28–46 s ja lento 23,4 s → kohde odottaa omaa kerrontaansa 10–18 s |
| Lasku-lause | 4,5 s ennen kerrontaa, jos lähdössä ei soinut lausetta | SOV:2180–2188 | säilyy | – |
| Avauksen jälkeinen lepo | 2,5 s | SOV:1072 | säilyy | – |
| Siirron jälkeinen tauko | 2,3 s ennen kertojaa | OS:743 | säilyy | – |
| Sana-ajat | saatavilla: kohteen `aani_ajat` (worker), avauksen `.ajat.json` ja Pelikoodarin `lentokerronta-ajat.json` (lauseittain) | OS:20–22, SOV:1129–1130 | kameran ajoitus lauseajoista (kohta 1. lause) | nyt ajat ohjaavat vain yksityiskohtakortteja, eivät kameraa |
