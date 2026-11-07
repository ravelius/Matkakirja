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

## Lisäys 19.3x: TÄMÄ OHITTAA KAIKKI EDELLISET "SEURAAVA"-KOHDAT (korvaa -1836)
Omistaja 18.49: "Viedään juuri koeversioon, kun oja, laatta ja rako on korjattu", uudet kuvat hänelle ennen junaa; "puulta näyttävä lattia korjataan kiveksi". EI vientiä, EI iPadia, EI juurta PK:lle (local_91a1bc27) ennen PT:n sanaa; jalkojen vajoamisen mittaa PK uudella juurella sen jälkeen.

Tehty, koodi A/tee_saanto3.py (oja, ajetaan ensin, rakentaa juuren alusta) ja A/tee_saanto3b.py (säännöt 1-3, ajetaan sen jälkeen). KORJAUS.md kohdat 18.58, 19.0x, 19.29. Molemmat ajot n. 2 min. Arkki: A/arkki-s3.py tekee parit parit-s3/ ja arkit s3-0..5.jpg (PT:n omat p-*.jpg ja r-*.jpg samassa kansiossa).
Sääntö 1 puulattia: syy kansikiven kuva 1024 x 51 venyy 20-kertaiseksi; V4_kujakivi_sokkeli_yla vaaka y < 0,13 -> V4_lattia, kaikki lodit, tausta ja ulkorengas. Toimii.
Sääntö 2 laatat: V4_kivireunus y < 0,13, >= 30 % seinän vieressä: pois, tilalle V4_lattia 0,2 m:n paloina y 0,002, valo saman tiedoston lattiasta (13 923 palaa, 880 ruutua varalähteellä). Y >= 0,13 ovat askelmia.
Sääntö 3 sokkelilaatikot: 10 kpl, rako0:n laatikkoa ei kata (ei 25 % seinää tummempi).

AJOSSA: JU ajaa aja-s3.zsh (vain saanto3, sha 61afeb7f2) kansioon kuvat-s3; ilmoitus tulee tähän sessioon. Tämä juuri sisältää jo kaksi korjausta, joita PT:n katsomissa kuvissa ei ollut: helma V4_kujakivi_sokkeliksi ja sääntö 2 paloina. PT:N KATSOMAT KUVAT OVAT nyt kuvat-s3-a (ensimmäinen ajo). Vertaa kuvat-s3 kuvat-s3-perus-kansioon. Kuvat-s3-a jää vertailuksi. Tarkista ensin, mitkä PT:n viat ovat poissa.

## PT 19.3x, TEHTÄVÄ (sanatarkasti olennainen). saanto3 ei kelpaa KK:lle.
1. raja3: valkoinen ilman tekstuuria oleva pysty laatikko, leijuva lattia-/kattopala sen yllä ja tumma viiva lattiassa; sama palikka v-LP-materiaali, t-LP-materiaali. PAHIN.
2. oja2 (r-oja2): V4_lattia nousi kiven päälle, sivut puusyisinä, reikä lattiassa, kuva näkyy läpi.
3. oja3 (r-oja3): lattia leikkaa kiven alle, alla punaisia ja sinisiä sirpaleita, kiila vasemmalla, kaista väri eri.
4. laatta2: sahalaitaiset tummat piikit ja tumma vyö. t-IP-materiaali: tumma kiila ja haamukolmio. t-LK-materiaali: pysty vaalea kaista lattiassa. t-IK-aukko (r-): tumma sahareuna juuressa.
5. puu4: puulta näyttävä kaista JÄI keskelle lattiaa. Omistajan ehto, sääntö 1 ei kata.
6. rako0: laatikko näkyy yhä ja mustat raot lattiassa; omistajan ehto. Ratkaisu tai mitattu syy.
Pieni: oja6 sininen sirpale nurkassa, lisa7 tumma viiva.
SELVITÄ: oja5 ja oja6 muurin puna s3:ssa kirkkaampi (R 141->159, 142->153), muut kamerat identtiset; kauko-lod1, lod2: rantakatu vaaleanpunaisesta harmaaksi, lod2:ssa läikittäin.
TEE: mittaa kohtien 1-3 syy säteillä, korjaa yleisellä säännöllä (ei paikkoja), tee AUTOMAATTINEN TARKISTUS kaikille muutetuille paloille, ettei tarvitse luottaa kameroihin. Oven yksi väli (179,8; 208,0): oma kuva. Sitten yksi Mac-ajo JU:lla JUNAN RUNGOLLA (juna 220 = 901e4004b; varmista PT:ltä tai taulusta, ei enää 61afeb7f2), myös perus samalla rungolla. Rivi PT:lle: sha, kuvat.

## Omat havainnot seuraavalle (mitattu vain, missä sanotaan)
- Mitattu: raja3:n valkoinen = helma V4_lattia y 0,68 (säde 335,2 / 54,2); laatta viivan syy kappaleen oma valo; t-LP ja v-LP valkoinen = helma y 0,56. Oja2:n kappale = V4_kivireunus-materiaalin helma y 0,28 (x -175,2 z 241,0), näkyy saanto3:ssa, ei saanto2:ssa. Sade: sade3.py s3-v.json + pakettilista 'kielletty-tausta-v115,kielletty-osasarja-v8,avoimet-v52,kielletty-rakennukset-v118,kielletty-muurikate-v37'.
- Päätelty, ei mitattu: täyttö oja-säännössä on 0,2 m:n porrasta seinän viistossa, ja korkeus otetaan lähimmästä korotetusta pinnasta. Sama väli voi saada usean eri kappaleen korkeuden (leijuva pala, nousu kiven päälle). Korkeat täytöt (y yli noin 0,3) näyttävät palikoilta. Harkitse: täyttö vain, kun väli on korotetun pinnan ja seinän rajaama koko pituudelta ja y <= 0,3; muuten väli jää tai korotettu pinta madalletaan. Mittaa ensin, montako välistä tämä koskee (saanto3-valit.json: kompit, y, lev).
- Lod-rantakatu: lod1-2 vaihtuivat V4_lattiaan ilman kivitekstuuria; harmaa väri johtuu todennäköisesti säännöstä 1. Läikät lod2:ssa mittaamatta. Oja5/6 muurin puna: syy mittaamatta; huomaa, että ajot olivat samat paitsi juuri, ja sääntö 3 voi vaihtaa vain sokkelia.
- Puu4: kaista on näkyvä y-tason tai toisen paketin pinta; ei mitattu. Muista lod0-kartta scratchpad-kohteen sijaan: aja säde kuvan pikselistä ja katso materiaali.
- Rako0: laatikko V4_kujakivi_sokkeli x -317,5, 0,16 m seinän edessä, ei sääntö 3:ssa. Mustat raot lattiassa osuvat V4_lattiaan saman verran perus-juuressa (säde). Kamera on y 0,35 ja 25 astetta: tarkista, näkyykö pelaajan korkeudelta ennen ratkaisua.
- Tarkistuksen pohja: jokaiselle lisätylle palalle: pinta ei yllä viereistä kiveä; ei pysty-V4_lattiaa; alla olevan säde ei läpi; valoarvo viereisen lattian mukainen; helma vain, jos alapuoli on näkyvä; aukot (ei pintaa y 0-0,7) koko muutetulla alueella.
- Ovet: mittaa_ovet.py, ovet.json; ladonnan seinät eivät ole säteissä, joten 15 väliä ilman osumaa. Ei oven materiaaleja 3 m:n sisällä.
- Mallin rajoitus: jaa tehtävä agentille vain Opus tai Sonnet; PT:n omat rajaukset r-*.jpg kannattaa katsoa ensin.
- tee_saanto3.py korjaa B:n alusta, joten aja molemmat aina järjestyksessä. tiivista poistaa käyttämättömiä kuvia ulkorenkaasta (Mt 101 -> 63); selvitä, ettei peli lue niitä nimellä.
