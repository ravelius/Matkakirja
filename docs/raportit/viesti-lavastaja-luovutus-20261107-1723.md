# Lavastajan luovutus 7.11.2026 17.23: riittää yksin (korvaa -1601)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/palkki. Loki: muuri/KORJAUS.md, loppu. Python numpyllä ja scipyllä: /opt/homebrew/bin/python3.

## Omistajan päätös ja PT:n käsky
Omistaja 16.26 (kortti palkki5, kuva r5-lisa7-0): korjataan yleisillä säännöillä, ei paikkoja; testikuvat eri paikoista ennen julkaisua, näytetään hänelle. Palkki5 EI junaan, ei iPad-ajoa, juurta ei Pelikoodarille (local_91a1bc27-6870-46aa-9886-66fd33b68880) ennen kuvia. Kahden yrityksen raja korvautui. Koko taustan uudelleenpolttoa EI tehdä. Puulattia (sokkeli_yla y=0, 163 877 m2, sama v94-v125, ei ketjusta): ei muutosta, KK kysyy omistajalta testikuvista. Turkoosi katto ja harmaa taso: ei työtä ilman sanaa. iPad vain PT:n sanalla. Kuvat PT:lle, PT katsoo täysikoossa, KK näyttää omistajalle.

## Tila
koejuuri-saanto (tee_saanto.py): täyttö aina muurin kylkeen, materiaali lähimmästä lattiasta >= 0,25 m, valo samalta materiaalilta >= 1 m; 0,4 m vyön valokartan tekselit samasta. Mittari mittaa_saanto.py (JUURI, ULOS ympäristömuuttujina). Ajo aja-saanto.zsh <linja> 61afeb7f2, kuvat-saanto ja kuvat-saanto-perus, 44 + 44, JU:lla. Kamerat tee_sk_saanto.py.
Lisa2, 3, 4, 5, 7 korjautuivat. EI KELPAA vielä: uudet viat, KORJAUS.md:n viimeinen kohta:
1. pelia: tumma laattakaista juuressa (peliasento, pahin). 2. lisa0: sahahampaat. 3. t-LP-tumma: sokkelin alaosa tumma, sokkelin valokartta ei maalattu. 4. t-LP-materiaali: sirpaleet kapeassa välissä.
Syyt 1, 2, 4 mittaamatta. Epäily 1:lle ja 2:lle, ei todistettu: täytön kolmiokohtainen valolähde tai vain osalle kärjistä osuva UV1-varasääntö (|w-us| < 0,01), tai lähde osuu varjoon.

## Seuraava askel
1. Mittaa pelian kaista: säde kuvapisteestä (palkki/sade2.py <px.json>, malli sade2-px.json: kamera x y z yaw pitch fov -> kolmio, UV1, valokartan arvo). Sama lisa0.
2. Korjaa yleisenä: täytön valo tasaiseksi, sokkelin alaosa säännön piiriin (kirjaa päätös), sirpaleet. Ei paikkakorjauksia.
3. Valitse uudelleen seinää tuijottavat kamerat (ainakin t-IK-tumma, t-IP-vaalea, t-LE-aukko, t-LE-vaalea, t-LP-vaalea): kameran ja kohdan välille vapaa näkyvyys seiniin nähden, ei vain lattiaa.
4. Uusi ajo JU:lla, parit, täysikoon rajaukset; ratkaise materiaali 119 -> 198 kuvista ennen KK:ta. Vertaa pelia, paaty-lahi, rako0 hyväksyttyihin: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/kivisivu/kuvat-kivisivu5 (malli eri, koejuuri-kivisivu2). Lisa4:n kolmiot täysikoossa erikseen.
5. Raporttiin PT:n vaatimat: 22 + lisa2, 3, 4, 7, kivikuvat, lod1-2 ja kaukokuvat, koko Mt, uudet väärät osumat kuvista. Sitten PT:n sanalla juuri PK:lle, ja rivi kulkukartasta (jo lähetetty: 2 833 m2, vaikutus mittaamatta).

## Edellisestä voimassa
0c3232522 junassa. Lokihaarat seina4-loki, seina5-instanssi eivät junaan. v127 ja v115pala eivät vientiin ilman PT:n sanaa. Levy: minulla ei luovutus- eikä postilaatikko-worktreeitä (0 Gi ilmoitettu); proto-lavastaja-esto-kivisivu, -havainne, -havainne-v118 jätetty, haarat pushaamatta.
