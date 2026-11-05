# Pelikoodari: luovutus 5.11.2026 klo 18.22 (konteksti yli 30 %): boordien väreily poistui, sininen laikku boordi-3:ssa auki

Korvaa -1752:n kohdat 0–3 ja täydentää -1744:ää, jonka muut kohdat pätevät edelleen (kohdan 3 järjestys: 2–5 yhä tekemättä). Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `f25ccb55a`, pushattu natiivi-backupiin. Ei junaan. Ei ajoa käynnissä, L2 ilmoitettu JU:lle vapaaksi 18.21.

## 0. Sääntö uutena: omistajan päätös 17.58 (Raamattu 10.5)
Jokainen Mac-ajo ratkaisee yhden kysymyksen. Pyynnössä JU:lle on rivi "mitä tämä ratkaisee" ja enintään noin 5 kuvaa; enempi perustellaan. Ei verrokkia, jos vanha kuva kelpaa. Korjaukset samaan ajoon. Ei ajoa, jos testi tai loki riittää. JU palautti 80 kuvan pyynnön, joten lista on nyt 20 kuvaa, yksi pisteeltä.

## 1. Tila
- **Lista:** `tyokalut/koekuvat-tarkastelu-20.txt`, 20 kuvaa; uusinta `tyokalut/koekuvat-tarkastelu-boordi.txt`, 7 kuvaa. Ajo: `zsh tyokalut/tarkastelu_kuvat.sh <SHA> <lista>`; `TARKASTELU_VERTAA=<kansio>` lisää vertailun yhteenvetoon. Ajomalli: `PROTO_LINJA` JU:lta, skripti tiedostossa, Bash `run_in_background`.
- **Lähtötaso** `lokit/tarkastelukuvat-c6670f9df-180215` (20 kuvaa, 216 s), **uusinta** `lokit/tarkastelukuvat-f25ccb55a-181814` (7 kuvaa, 190 s; `arkki.jpg`, `rajaukset.jpg`).
- **Syy, mitattu kolmesta taustapalasta** (`kielletty-tausta-v115`, `V4_palatsi_friisi` vs `V4_red`): sama taso alle 2 mm 38 %, alle 2 cm edessä 23 %, vähintään 2 cm edessä 36 %, seinän sisällä 2,5 %.
- **Korjaus** `f25ccb55a`: `JuoksuMaailma.shader` `Offset [_SyvyysEtu], [_SyvyysEtu]` vain Forward-passissa; `JuoksuV4Maailma.cs` `boordit`-joukko (`V4_palatsi_friisi`, `V4_palkkivyo`, `V4_teal`) → `_SyvyysEtu` −1.
- **Tulos:** boordi-1 0,074 → 0,005, boordi-2 0,062 → 0,002, sahalaidat ja viirut poissa rajauksista. havainne-02 0,0083 ja havainne-04 0,0190 ennallaan. Vain Macilla.
- **Todistus 2:** `tarkastelu piilota p-kujaportti-3` (37 pintaa): takapinta 0,010 → 0,125, väärin kierretty 0 → 0,024, tyhjä 0. KK:lle viety.
- **Todistus 1** täyttyi lähtötasossa; pisteet valittiin väreilyluvuista, nauha näkyi vasta kuvista.

## 2. Seuraavaksi: KK:n järjestys 5.11. 18.2x
Taso 1 (-1744 kohta 3) on pääasia; nämä kulkevat pieninä sen rinnalla. KK katsoi parin täysikoossa ja näytti sen omistajalle: boordi-1 ja boordi-2 korjaantuivat, nauha on kokonainen.

1. **Sininen laikku:** `boordi-3` (`rajaukset.jpg`, oikea rajaus): sininen friisilaikku räystään ruskeassa alapinnassa. Vanhaa kuvaa samasta kulmasta ei ole, joten ei tiedetä, onko se `Offset`-säännön sivuvaikutus (kaltevuuskerroin kasvaa vinossa katseessa) vai vanha vika. **SELVITETTY 18.3x: ei sivuvaikutus, `f25ccb55a` saa jäädä.** Laikku ei ole friisi vaan `Katto alapinta ruoteet` (avoimet-v52 `tyohuone.glb`, sininen maalaus Valosepän `f995d3e41`, 30.10.), joka ei kuulu `boordit`-joukkoon. Ohjelmallinen materiaalikartta ilman mitään syvyyssääntöä tuottaa laikun samaan paikkaan (`kartta2-boordi-3.png`, scratchpad `c09a3693…`), ja kartta täsmää pelikuvaan. Syy: räystään ruskea levy `V4_raystas_alapinta_varjo` ei ylety kulmiin, joten ruoteet näkyvät suoraan; (600, 500):ssa levy on 16 cm ruoteiden edessä, (100, 410):ssä levyä ei ole säteellä. Toinen laikku (1180, 680) on sama. Pieni friisipala kuvapisteessä (1085, 885) on mallin oma `V4_palatsi_friisi`. Mallin korjaus kuuluu LAV:lle; samaa levyä käyttävien muiden huoneiden kulmia ei mitattu. Huom. `glb.py` ei lue solmujen kiertoja: avoimien huoneiden mittaukseen `glb2.py`.
2. **UUSI: turkoosit laatikot ja siniset U-viivat (KK):** kujan seinistä työntyy turkooseja laatikoita, ja seinässä on ohuita sinisiä U-viivoja (boordi-1 ja boordi-2, näkyvät myös ennen korjausta, joten eivät johdu `f25ccb55a`:sta). **SELVITETTY 18.3x, sama malliosa:** taustan `V4_konsoli`-kannattimet, 0,51 × 0,22 × 0,29 m, rivit noin 3,7 m:n välein, korkeudella 4,6–4,9 m (paikoin myös noin 3,0 m). Laatikossa on 8 kolmiota: päädyt, pohja ja etu; **kansi ja takaseinä puuttuvat**. Se on upotettu seinään 2 cm ja työntyy ulos 27 cm. **Avoin kansi:** näkyy ylhäältä onttona (`boordi-1`, `boordi-2`, pintakuvassa syaani). Kameran korkeus on 2,4–9 m kujan leveyden mukaan, joten pelaaja voi nähdä tämän leveillä kujilla (laskettu vakioista, ei nähty pelistä). **U-viiva:** 2 cm:n upotus näkyy seinän takaa, kun päädyt ja pohja puhkaisevat seinän mutta kansi puuttuu. `boordi-2`:n pintakuvan mukaan vasen kaukainen seinä nähdään takapuolelta (takapinta 0,46). **Kyllä, ne tulevat seinän läpi, mutta vain 2 cm ja näkyvät vain seinän takaa.** Yleinen korjaus on mallissa (LAV): kansi kaikkiin ja upotus nollaan. LAV 18.3x: molemmat jonossa (`muuri/KORJAUS.md`) lattia17:n jälkeen, konsoli seuraavaan tausta-vientiin, räystäs seuraavaan avoimet-vientiin; versiota ei luvattu, eikä LAV ole vielä tarkistanut kumpaakaan mallista. Pelin puolella ei korjattavaa. **Auki:** `boordi-2`:ssa tiedoston seinä z = 277,35 ulottuu ainakin korkeudelle 5,78 m, mutta pelikuvassa sen yläreuna on noin 5,7 m:ssä. Ero on syytä selvittää, koska juuri sen yli nähdään seinän takapuoli.
3. **Marmorikaiteet (KK:n B):** vareily-4 0,033 ja laatta-m15 0,028; tumma viiva ja ohut raidoitus. Selvitä syy kuten boordeissa.

**Yksi ajo näille** (omistaja 17.51 ja 17.57): samat 5 pistettä (`boordi-1`, `boordi-2`, `boordi-3`, `havainne-02`, `havainne-04`) + siirretyt `muuri` (-340,1; 119,9) ja `portti` (13,19; -392), ei koko listaa. `tyokalut/koekuvat-tarkastelu-boordi.txt`: pois `todistus` ja `todistus-piilossa` (täyttyi), mukaan `muuri` ja `portti`. Kaiteiden pisteet vareily-4 ja laatta-m15 eivät kuulu näihin 7:ään: KK 18.2x: 9 kuvaa, kun kaiteiden korjaus on samassa ajossa; jos ei ole mukana, vain 7.

**Ennen muuri- ja porttipisteiden ajoa omistajalle ei sanota, että seinät ovat kunnossa.**

4. **Massassa, `SarjatPeittoon` ja sali: tason 1 osaan C** (-1320 kohta 3: liike ja kamera kartalta, pysähtyminen seinään, muuriin ja kynnykselle), koska sama kartta ohjaa pelikameraa.
   - `Massassa` lukee vain peittokarttaa, `SarjatPeittoon = false`, joten sarjamallit puuttuvat. `KameraMassassa` käyttää samaa. Tämä on poikkeuskartoituksen ehdotus 1; ei muutettu. **Varmista, puuttuuko juuri muuri** (ei varmistettu, että se on sarjamalli). Alkuperäinen `muuri` (-368,6; 120,1) on `JuoksuKierros.json`:ssa kuljettava, mutta kuvassa oli pelkkää takapintaa.
   - **Sali:** `takapinta`-pisteen sali (-163,6; 320,5) on kartassa kuljettava, vaikka keisari pysähtyy kynnykselle (omistaja 4.11. 12.48). Sama tarkistus, korjaa kartta.

**Ilmakuvan viat odottavat (KK:n C):** vaaleanpunaiset liuskat Meridiaaniportin edessä ja vallihaudan reunalla, sileä kirkkaankeltainen katto Taihedianin länsipuolella. Syy ei tiedossa. Ei ajoa tämän takia.

## 3. Katselu `fb9811afd` (`lokit/esikatselu-20261105-174557`, arkeista; ei täysikokoisina paitsi e23, e26, e27, e28)
- **Kiinniotto laukeaa** (repliikki, kehote, rimpuilu), mutta k02:ssa eunukin selkä peittää keisarin kokonaan.
- **Rikkoutumista ei nähty:** `tormaa` koskee vain väistöesteitä, tilarivillä `esteet 0/0`. Tarvitsee toisen tavan laukaista.
- **Jahtikorjaus todentamatta:** 0 `eunukki jahtiin` -riviä, vaikka eunukkeja näkyy e23, e26, e28. `r.Kartta`:n määrittelyä ei löytynyt, joten auki, jäikö jahti tapahtumatta vai onko ehto aina epätosi. Selvitä lokilla ennen uutta ajoa (10.5).
- **Ovilehdet:** e27:ssä kuva kokonaan ovilehden ja ristikon peitossa, e23:ssa ja e32:ssa noin kolmannes. Enemmän kuin -1744:n "yksi jäänne".
- e39–e42: keisari paikallaan seinää vasten (s kasvaa, paikka ei); oletettavasti -1602:n seinäodotus, ei varmistettu.

## 4. Muuta
- `tarkista.sh` palauttaa 1 liikevahdin takia: `JuoksuKulkuKamera.cs` 1 > 0 ja `JuoksuV4Maailma.cs` 3 > 0. Käännöksessä 0 virhettä. En lisännyt liikettä, ja ensimmäistä tiedostoa en muuttanut, mutta vahtia ei ajettu ilman muutoksiani: käy läpi ennen junaa.
- `tarkista.sh` muuttaa `Tyylikirja.uss`:n, `Tyylikirja.cs`:n ja `tyylikirja/tyylikirja.json`:n: generoitu sivutuote, palautin `git restore`lla.
- 7.47: luvut 2, 4, 6 ja 12 lukematta tässä sessiossa. Lue seuraavalla aloituksella (2 on 162 kt: vain fokusmoodi ja linssit).
- Kierroksen vanha `Laatat`-tieto ja `Havainne`-paikat ovat `JuoksuTarkastelu.cs`:ssä; lista on kopio niistä.

## OPIT
- Geometria mitataan ennen kuvapyyntöä: GLB:t saa ämpäristä, ja friisin väli seinään selvisi ilman ajoa. Paketin palat `kielletty-tausta-v115/tausta.json`, kolmion etäisyys `V4_red`:iin säteellä pinnan normaalin suuntaan.
- Lukeman nimeä ei oteta kuvauksesta: `takapinta` 1,00 ei tarkoittanut reikää vaan kameraa seinän takana. Katso kuva ennen tulkintaa.
- 20 pistettä tarkoitti 20 kuvaa, ei 80: pienin tulkinta omistajan sanoista ensin.
