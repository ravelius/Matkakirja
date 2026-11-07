# Lavastajan luovutus 7.11.2026 18.36: riittää yksin (korvaa -1723)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/palkki. Loki: muuri/KORJAUS.md, loppu. Raportti: A/raportti-saanto2.md. Python numpyllä ja scipyllä: /opt/homebrew/bin/python3 (ei -I).

## Omistajan päätös ja PT:n käsky (voimassa)
Omistaja 16.26: yleisillä säännöillä, ei paikkoja; testikuvat eri paikoista ennen julkaisua, näytetään hänelle. EI junaan, ei iPad-ajoa, juurta ei Pelikoodarille (local_91a1bc27-6870-46aa-9886-66fd33b68880) ennen kuvia. Koko taustan uudelleenpolttoa EI. Puulattia: ei muutosta, KK kysyy testikuvista. Turkoosi ja harmaa taso: ei työtä ilman sanaa. iPad vain PT:n sanalla. Kuvat PT:lle, PT katsoo täysikoossa, KK näyttää omistajalle.

## Tila
koejuuri-saanto2 (tee_saanto2.py) ajettu ja katsottu; raportti PT:lle 18.36, viesti oli jonossa. ODOTTAA PT:N SANAA: korjataanko t-IK-aukon kapea oja ennen KK:ta vai näytetäänkö nyt. Älä tee uutta ajoa ennen sanaa.
Mitatut syyt: korotettu lähdelattia (y 0,55), lähde muurin takana, sokkelin jalka pohja.glb:ssä (reunakivi leivottu eteen). Säde: sade3.py <json> [paketit pilkulla]; säteeseen kaikki paketit, muuten pohja jää pois.
Parit: parit-s2b/ (t- ja v-kuvat), parit-saanto2/ (muut; sen t-parien perus on aloitusruutu, älä käytä). Rajaukset r-s2-viat.png, r-s2-lisa.png.
Mittari saanto -> saanto2: aukko 0 -> 1, materiaali 198 -> 184, tumma 611 -> 530, vaalea 381 -> 325.

## Seuraava askel
1. Sanan mukaan: oja: mittaa säteellä (t-IK-aukko, kamera sk-saanto2.txt); 5 152 varalähteen palaa saanto2-vara.json. Kapean välin täyttö yleisellä säännöllä.
2. Juuri PK:lle vasta PT:n sanalla; rivi kulkukartasta (2 833 m2, vaikutus mittaamatta).
Avoinna: materiaali 184 ei ratkaistu loppuun; rako0 outo; lisa7:n pieni viiva; lod1-2 ennallaan, siirtymää ei kuvattu; osasarjan oma sokkeli ei maalattu.

## Levy
18,9 Gt vapautettu 18.0x: vanhat koejuuret ja kuvat T7:lle linkein (lista A/siirto-20261107.log); perus-ajon latausraja ylittyi siirtojen aikaan, mitoita oleta ja odota-maailma 900 (sk-s2b*.txt). Jäi: koejuuret saanto, saanto2, v115perus, palkki, palkki5, k-tarkastelu; worktreet proto-lavastaja-esto-kivisivu ja -havainne (likainen).

## Edellisestä voimassa
0c3232522 junassa. Lokihaarat seina4-loki, seina5-instanssi eivät junaan. v127 ja v115pala eivät vientiin ilman PT:n sanaa.

## Lisäys 18.40 (korvaa kohdan "ODOTTAA PT:N SANAA")
PT 18.4x: näytetään nyt viat mukana, PT vie KK:lle. Ei ajoa, vientiä eikä juurta PK:lle ennen PT:n sanaa. Oja ja rako0 mitattu: KORJAUS.md, kohta 18.40; ehdotus lähetetty PT:lle. Seuraava: PT:n ja omistajan sana.

## Lisäys 18.49: TÄMÄ OHITTAA EDELLISET "SEURAAVA"-KOHDAT
PT 18.4x käskyt, kaikki voimassa: koe koejuuri-saanto3 = saanto2 + yleisellä säännöllä (1) oja: täyttö <= 1,3 m:n väliin korotetun pinnan korkeudelle, (2) jäävät korotetut laatat (t-IK-tumma, t-LK-materiaali), (3) rako0. Ei paikkakorjausta, ei vientiä, ei iPadia, ei juurta PK:lle. Mittaa ensin, kuinka monta samaa tyyppiä ja mikä erottaa ne tarkoituksellisesta reunuksesta. Käy kaikki t-parit täysikoossa ja nimeä jäävät korotetut pinnat.
Mac-ajo JU:lla, sha 61afeb7f2, latausrajat 900 (mallina tee_sk_saanto2b.py, aja-s2b.zsh; kamerat tee_sk_saanto2.py:n kamera()): t-IK-aukko, v-LP-materiaali, vähintään 8 muuta eri ruutua ojatyypin listalta (myös rajatapaus 1,2-1,4 m), t-IK-tumma, rako0 samasta kulmasta, verrokit pelia, lisa3, lisa7; perus | saanto3. Mittari: aukko, materiaali, jäljellä olevat ojat, uudet kerrokset. Tarkista, ettei täyttö peitä ovea eikä sulje kulkuväylää. Kuvat katsottuna PT:lle. JU tietää, että ajopyyntö tulee; PK:n siirto saa mennä edelle.

TILA:
- A/tee_saanto3.py tehty ja ajettu, koejuuri-saanto3 olemassa, mutta vain OJA, EI ajettu pelissä. 100 väliä, 54 m2, 4 148 kolmiota, 15 tiedostoa; pois: 27 kulun katkaisevaa (vain väli >= 0,8 m), 28 alle 2 ruudun; oven takia 0 (oven tunnistus materiaalin nimestä: tarkista toimiiko). Lista A/saanto3-valit.json (kompit, katkaisisi, raja). t-IK ja v-LP-mat täytössä. Esto: täytöstä 1 278 ruutua kuljettavalla, 80 estetyllä; kulkukartta ei muutu, joten jalat voivat vajota täyttöön: kerro PT:lle.
- Laattamittaus A/mittaa_jaanteet.py, A/jaanteet.json: jäävät V4_kivireunus-kappaleet 1 649 kpl, 19 190 m2, 1 507 alle 0,8 m seinästä; koon mukaan pit <= 3 m: 806 kpl, 88 m2. Säde: t-IK-tumman ja t-LK-materiaalin laatat ovat V4_kivireunus y 0,08 (pisteet 250,56 5,75 ja -290,9 106,6); kappaletta ei tunnistettu keskipisteellä, hae kolmion osumalla. Erotussääntöä EI vielä ole.
- Rako0: vanha sokkelilaatikko V4_kujakivi_sokkeli x -317,5 z 2,35-3,19 y 0-1,3, valo A 5 (KORJAUS.md).
- Kuvaparien läpikäynti: ali-agentti (Opus) kirjoittaa A/korotetut-kuvista.json. Jos tiedostoa ei ole tai se ei läpäise json.loads:ia, nollaus keskeytti sen: tee uudelleen ali-agentilla (vain Opus tai Sonnet): 21 t-paria + v-LP-materiaali, v-LP-tumma, palat täysikoossa; perus kuvat-s2b-perus, jälkeen kuvat-saanto2 ja v-kuvat kuvat-s2b.
SEURAAVA: 1) lue korotetut-kuvista.json, kolmio-osumat pisteille sade3.py:llä, 2) erotussääntö (rivi PT:lle: montako, mikä erottaa), 3) lisää laatat ja rako0 tee_saanto3.py:hen, 4) kamerat, ajopyyntö JU:lle, 5) kuvat katsottuna PT:lle.
Huom: t-kuvien pari on parit-s2b/. Tee commitit tämän haaran kautta worktreellä: checkout on koti-haarassa, jossa tätä tiedostoa ei ole.
