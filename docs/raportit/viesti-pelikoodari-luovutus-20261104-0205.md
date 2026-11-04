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

## Lisäys 02.1x (PT 02.0x ja 02.1x; korvaa yllä olevan vaiheen 3)
- **Erillistä Releasea ei ole:** mittausreitti on jo Release-kokoonpano (laite-sha.sh). TULOS.md korjattu. App Store -käännöstä ei mitata.
- **Taivas:** selvitä kamera-219-ajosta, näkyykö 2 s:n taivas pelaajan uudelleenaloituksessa. Jos näkyy, se on vika ja korjataan samaan shaan ennen iPad-mittauksia; rivi PT:lle.
- **JU pitää iPad-sarjan** pk-0d68-laite.zsh, kunnes annan rivin; sen jälkeen lopullisella shalla (päivitä skriptin sha, jos taivaskorjaus tehdään).

## Lisäys 02.2x: palvelijat v10 (KK 02.15; korvaa "Palvelijat"-osion)
- v9b + v9c ja huomiot PT:llä ja KK:lla (v9c/HUOMIOT.md). KK: **maljakko hyväksytty**; sirpaleet hyväksytty, kun erillään ja ohuemmat (koodi riittää, ei Codexia); lätäkön muoto, koko ja näkyvyys hyväksytty, väri EI; ämpärin sisus tummaa puuta.
- **v10 65b83b74d** (pelikoodari/arkihahmot-218), kuvarunko ba669e5bb (palvelijat-kuva-218). Unity 0 virhettä, ajamatta. JU:n jonossa kamera-219:n jälkeen: `_tyo/pelikoodari/palvelijat-v10/aja.zsh`; kuvat v10/vesi ja v10/malja.
- **Katso ja tuo KK:lle PT:n kautta sama juoksukuva ja lähikuva:** lätäkkö (tavoite: sisus noin 150/185/225, reuna kivi noin 0,7×, pilviheijastus noin 218/216/225, selkeä reuna; ulkonäkö ratkaisee, mittaa sisus PNG:stä), sirpaleet ohuet ja erillään, ämpärin sisus (kiekko suuaukolla: onko suunta oikea ja näkyykö?).
- **Kengän rosoreuna:** Offset 0, -1 on arvaus, ei todennettu. Jos reuna säilyy ja syy ei ole pieni: listalle, ei estä (KK). Tarkista myös, ettei lätäkkö nyt välky kiveä vasten (z-fight), koska Offset muuttui.
- **Palvelijatar v2 (KK kohta 5):** ei lopullista mallia; JU:n kuvausjakso Pariisin jälkeen; kuva edestä ja takaa KK:lle ennen kytkentää.
- Junaan vasta korjausten jälkeen; PT päättää vuoron.

## Jatko: järjestys
1. kamera-219 (0d688683a, käynnissä L1:llä 02.18): katso kamera ja taivas, tulos PT:lle. Jos taivas näkyy pelaajan uudelleenaloituksessa: korjaa samaan shaan (huom. JuoksupeliNakyma.cs:1067 odottaa maailmaa ilman peittoa uudelleenaloituksessa; ensimmäisellä avauksella latauskuva peittää).
2. Rivi JU:lle ja lopullinen sha: iPad-sarja pk-0d68-laite.zsh on PIDOSSA, kunnes annat rivin.
3. v10-kuvat.

## Lisäys 02.3x: kamera-219 valmis, taivas on vika (TULOS.md "Kamera-219")
- **Kameran nollaus toimii:** 0/16 rakenteessa pelaajan tasolla; alku sama joka kerta. PT:llä.
- **SEURAAVAKSI: taivaskorjaus samaan shaan (PT 02.1x), 0d688683a:n päälle, wt/proto-pelikoodari-muisti.** Syy: JuoksuV4Maailma.cs cullingMask 0, kunnes SisaltoValmis; JuoksupeliNakyma.cs:1067 odottaa. Ensimmäisellä avauksella latauskuva peittää, Uudestaan-metodissa (:704) ei mitään. Mac noin 1 s, iPad noin 2 s; esinekortti näkyy taivaan päällä (a7, a8).
- **Suositus:** näytä Uudestaan-metodissa latauskuva uudelleen (sama reitti kuin avauksessa, JuoksupeliNakyma.cs:147–194 ja :1075–1092), ei maailmaa ilman esteitä (omistaja 20.10. 12.33 "mikään ei ilmesty yhtäkkiä"). Tarkista ensin: latauskuva on purettu ensimmäisen häivytyksen jälkeen (:1092), joten kuva pitää ladata uudelleen, ja gcVaihe ajaa roskienkeruun; muistihuippu kasvaa kuvan verran (mittaa). Piilota esinekortti peiton ajaksi. Kysy PT:ltä, jos muutos ei ole pieni.
- Sitten: rivi PT:lle ja lopullinen sha JU:lle (iPad-sarja pk-0d68-laite.zsh, päivitä sha; sali 1+2 kuvilla ja 40 x uudestaan).
- **Eri vika, listalla:** kamera katon palkistossa reitillä 2,85–4,12 s (b1, b8), PT:n kanta auki.

## Lisäys PT 02.27 (SITOVA; ohittaa "Eri vika, listalla")
- **Palkistovika (b1-4s, b8-4s) on junaa estävä VIKA:** palkisto täyttää ruudun, pelaaja ei näe yli sekuntiin. Korjaa samaan shaan. Selvitä myös, onko sama julkaistussa TF 217:ssä: rivi PT:lle (KK:n aamulista). Johtolanka: kamera-*.txt rivit 71–91 (massassa 1, katon alla 1, kamera 3,9 m): katso, kuuluvatko b-ajoihin. Koodi: JuoksuV4Maailma.cs "SALIN KATTO RAJAA" ja avoinSali (:1683, :2044–).
- **Latauskuva peitoksi ok**, jos ensimmäinen kuva peiton jälkeen on oikea. **Todistus 8/8 uudelleen samalla Mac-kamera-ajolla** (kamera-219, päivitä sha), ei vain 1 s:n kohdalta. Latauskuva ei saa peittää palkistovikaa.
- Tuloksen polku on proto-3d/lokit/pk-muistipiikki-219/TULOS.md (ei kamera-219-kansiossa): kerro PT:lle.
- iPad-sarja pidossa uuteen shaan asti, sitten Pariisin (etusija) jälkeen.
