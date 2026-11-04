# Valosepän luovutus 4.11.2026 klo 17.32

Syy: konteksti yli 33 % (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-1649.md (myös LISÄYS 1, KK:n sana 16.4x). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Tulokset: _tyo/linssiseppa2/pariisi-tyyli/porras/TULOS.md (lopussa uudet osiot). Wt k30 on nyt haarassa linssiseppa2/nd-valo.

## 1. ND-VALO: JU:lla v4 c2b0d96c5 (linssiseppa2/nd-valo, natiivi-backup; vain varjostin), sk-nd-valo-v3.txt
Kuvat: v1 esikatselu-20261104-164822 (tumma, oranssi), v3 d5d781c83 esikatselu-20261104-171846 (muoto hyvä, vaalea, mutta pinkki). V2:n kallistetut jäivät Ranskan näkymään, älä käytä; syy: ensimmäinen aja häviää, siksi v3-skripti ajaa kahdesti. Pelkkä s-090 katsottu täysikoossa v3:sta; muita neljää ei.
Mitat s-090 (nd-valo/varit.py, vaihda L-polku; kirkon rajaus, ei maisemaa): omistaja valo 246,225,185, keski 180,147,102, varjo 101,88,58. v3 221,188,152 / 171,141,112 / 79,61,45. Parikuva parit/s-090-v3-kirkko.png (nykyinen | v3 | omistaja, työkuva, ei KK:lle sellaisenaan).
V4 muutti: _Savy 1.75, 1.85, 1.6, _Haalistus 0.2, aurinko 1, 0.95, 0.82 × 2.9. Arvio laskemalla, ei kuvaa.
Kun kuvat tulevat: katso kaikki 5 täysikoossa, parit.py <kansio> v4 (rajaus erokuvasta on liian väljä: tee kirkko kokonaan -rajaus itse, sama molemmille, ei selitekaistaa). Kelpaa, kun vaalea kuten omistajan kuva, kolme tasoa joka suunnasta, kirkas pää ei pala, kirkko ei irtoa kartasta. Näyttö suoraan KK:lle, sha PT:lle. Kerro: nykyinen on 7fcf0bf76:sta, uusi 602eee8d1:n päältä; muut 3D-merkit jäävät ruskeiksi (omistaja 17.10.).
Havainnot, ei selvitetty: oikean tornin aukossa musta rako (x noin 740, y noin 300 parikuvassa; nykyisessä samassa kohdassa vaalea rako, geometria?). Y-0012:ssa v2:n nave harmaanvihreä ja kirjava, katottu vain puolikoossa. Lokissa POIKKEUS ArgumentOutOfRangeException joka ajossa heti "ui sulje":n jälkeen (JU tietää), kuvat tulivat.

## 2. Z10 JA PORRASTUS: linssiseppa2/striimi-porras (natiivi-backup)
Commitit: 6e5af3d97 Z10 Euroopassa, f1e2d428d joet, 0b9bf1baf Välimeri, 686ce55f6 kohinapikseli, 3a4f77b82 maski + verkko (607/607). e18. Unity ja laite EI ajettu; kaikki kuvat Macin väritysfunktiosta.
LÖYDÖS (KK:lla ja PT:llä): x 534 ja x 2133 ovat Pariisin Z10-listan reunat, ei geometriaruudukko. Lista ulkona peli tekee Z10:n Z9:stä, vaikka media sisältää Z10:n. Ei selity: y 325, 1689, 1863, x 50, 1041, 1889, 2116; y=52 ei näkynyt. Helsingin 0,0879° ei selity tällä.
KK 17.1x (sana): "Kyllä, tee koe, jossa peli hakee Z10:n listan ulkopuolelta ja palaa Z9:ään. Offline ei saa hajota, eikä peli saa hakea turhaan merta. Mittaa verkkohaut, lataus ja muisti iPadilta. Ei vientiä mediaan. Selittämättömät reunat ja sk-lataus-h pysyvät auki, joten raportoi myös ne."
Tehty: maski ja verkkotarkistus 3a4f77b82 (otos: 8 / 383 maskin hauista 404). KK:n viesti 17.2x kertoi vielä, ettei tätä ole tehty: kerro 3a4f77b82 KK:lle.
SEURAAVAKSI:
a. sk-lataus-h valmis: proto-3d/lokit/julkaisija-lataus-h-484adb22f (h-z13 45/180/420, l-z13 45/180, konsoli.txt). EI katsottu. Katso täysikoossa, kuvatasot "palvelin haku" -riveistä, rivi PT:lle ja KK:lle: lopputila vai latautuu. KK kohta 5.
b. Tee iPad-skripti (sk-porras-h peruttu): KK:n lista h-z13, l-z13, p-z10, tasot 8,6, 9,5, 10,4 varjo / pois kulmilla 0°, 19°, 21°, koko kuvat täysikoossa, ruudukkomitta, muisti; plus NS:n k-z12 ja Helsinki 0° ja 45° (kamerat luovutuksen -1649 LISÄYS 1, lue _tyo/natiiviseppa/striimi-sauma/tulos.md loppu ensin); plus verkkohaut ja lataus (KK 17.1x). Runko: PT:n mukaan maakuntarajat 35b6ee8b4 menee koerunkoon, ota huomioon: sovi JU:n kanssa, mikä runko. Lopuksi yksi suositus: varjo vai pois.
c. PT 17.1x: maakuntarajojen laatan reunan pykälä ja z12-sumeus kuuluvat porrastukseen (_tyo/natiiviseppa/maakuntarajat/tulos.md loppu, ipad-rajaukset/s-z12-reuna.png).
d. Rinnevarjon terävyys z10 | z11 | z12 ennallaan (Alpit selvin, alueet/j12-z10-z11.png); epäily PoistaKarkeaRanta + peitto, ei mitattu. KK:n kohta 1 ei ole tältä osin valmis.
e. Offline: ei testattu laitteella. Wifi ilman internetiä: viive mittaamatta. Offline-tilassa Z9:stä piirretty e18-pala jää levylle, ei korjattu.
Muut avoimet: Lontoon z10-vesialtaat leveämpiä; Marnen leveä laikku kaistalla x noin 1510; z ≤ 9, muisti ja piirtoaika ajamatta; z11-joet viivoja, z12 alueita.
Kuvat KK:lla: kaista-ennen-j12-z10-12.png, alueet/j12-z10-z11.png, helsinki-ennen-j12.png.

## 3. VERKKOHAUT
PT 17.2x: alueet/data saa käyttää Mac-vertailuun, ei poistoa. Virhe (toinen kerta tänään): robots ja haku samassa komennossa. Jatkossa robots ja käyttöehdot erikseen ennen hakua. Uudet alueet vain, jos ne muuttavat johtopäätöstä. OpenFreeMapin ehtoja ei ole luettu. Media: robots.txt:ssä ei sääntöjä (vain kommentit).

## Jäljellä edellisistä
JU:n ui-kerros-ajo uudelleen ja 15/16-vastaus KK:lle (luovutus -1530). Vesi 5c870d62a Mac: kuvat katsomatta, rivi PT:lle kesken. sk-rajat-tasot JU:lla sk-lataus-h:n jälkeen.
