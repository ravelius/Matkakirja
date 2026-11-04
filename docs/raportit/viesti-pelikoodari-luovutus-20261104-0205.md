# Pelikoodari: luovutus 4.11.2026 klo 02.05 – kameran nollaus 0d688683a, koko sarja JU:lla

Edellinen: -20261104-0142 (af151770c), voimassa ellei alla toisin. Syy: pehmeä raja 25 % (7.37). Ei omia taustaketjuja. Kuvat PT:lle, PT vie KK:lle. Tulokset: proto-3d/lokit/pk-muistipiikki-219/TULOS.md.

## Muisti ja kamera (PT 02.0x, sitova järjestys)
- **Vuotokorjaus 2cce14eb2 todistettu laitteella:** 40 x uudestaan 3749 Mt, sali 3696 ja 3764 Mt. Verkot tasan. PT: ei riitä junaan, koska k2:ssa ei ole sisäkuvaa (KK:n ehto kaksi sisämittausta).
- **Kameran nollaus 0d688683a** (pelikoodari/muistipiikki-219, wt/proto-pelikoodari-muisti; 2cce:n päällä): NollaaKameranTila ja NollaaKameranSali, alkutila kuin ensimmäisessä juoksussa. Unity 0 virhettä, 794/794; EI AJETTU, korjaantumista ei ole todistettu.
- **JU:lla:**
  1. Mac: `_tyo/pelikoodari/kamera-219/aja.zsh 1` (0d688683a). Osa A pelaajan taso, osa B sali, kuvat a*/b*-1s ja -4s samaan kansioon, loki kamera-*.txt (kameraväli: massassa, katon alla). Katso kuvat: onko kamera rakenteessa, ja onko pelaajan reitillä vikaa (PT 01.32 kysyi). Tulos PT:lle.
  2. Pariisin iPad-ajon jälkeen, iso iPad: `mittaa-sali.zsh 0d688683a 1` ja `2` (kuva nyt 2 s:n päästä) ja `mittaa-uudestaan.zsh 0d688683a 1`. Katso sali-sisa-*: kummassakin kierroksessa pitää olla kuva salin sisältä.
  3. **Release: JU EI aloita ilman PK:n riviä.** Anna rivi, kun kuvat on katsottu. Yksi Release, lopullisella shalla. JU selvittää, ottaako Release ui-komennot ja mikä bundle-id; jos ei, muokkaa skriptit (ID on kovakoodattu kehitys).
- **Jos kamera ei korjaannu pienellä muutoksella:** rivi PT:lle ja Release 2cce14eb2:lla (PT 02.0x).
- Sitten vasta juna. TF 217 -rivi on jo PT:llä.
- 40 x -ajon muisti-tarkka.log oli tyhjä (syy ei selvillä). Tarkista uudesta ajosta; sali-ajoissa loki toimi.

## Havainto, ei korjattu
Joka uudestaan-komennon jälkeen noin 2 s pelkkä taivas (6/6, lokit 2cce; JuoksuV4Maailma SisaltoValmis, cullingMask 0). Selittää vaaleat kuvat ja todennäköisesti v7:n videon alun. PT tietää; ei tehtävää ennen kantaa.

## Palvelijat
- **v9b** katsottu (vesi-090, -160; rajaus palvelijat-v9/lahikuva-lammikko-vesi-160.jpg): lätäkkö erottuu juoksuvauhdissa, ei tummaa reikää, ämpärit sivussa. Huomiot: keskusta vaalean siniviolettia, lähellä enemmän maali kuin vesi (KK:n 00.13 pyyntö, ei muutettu); kenkien reuna rosoinen; ämpärin sisus umpimusta, sanka litteä; ruskea pallo aukiolla vesi-090:ssa, lähes ilman varjoa (v7:n pallo? ei varmistettu).
- **v9c** 691988976 / 18d2a3487 L1:llä JU:lla (palvelijat-v9/v9c/). Katso sirpaleet ja maljakko.
- **Sitten PT:lle yhdellä viestillä:** v9c:n maljakko + sirpaleet + v9b:n lätäkkö ja huomiot yllä. Sirpaleiden muodot koodista, koska Codexin palat samanlaiset. KK:n 01.06 ei ole hyväksyntä. PT:lle ei ole vielä lähetetty näitä.

## Muut
Ennallaan: -0142 "Muut" ja "Tarkista"-rivi (Cull Back, ruudukkokuvio malja2-120). Otsikko 6aed10e25, palvelijatar v2, Vesi-219: JU:n vuoroilla. Komento: Peli-testit/unity-tarkistus.sh (sh), Peli-testit/kaanna.sh (bash).
