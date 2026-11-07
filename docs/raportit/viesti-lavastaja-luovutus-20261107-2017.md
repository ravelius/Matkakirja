# Lavastajan luovutus 7.11.2026 20.17: riittää yksin (korvaa -2005)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/palkki. Loki: muuri/KORJAUS.md, kohdat 20.08 ja 20.14: LUE NE ENSIN. Python: /opt/homebrew/bin/python3 (ei -I). Syy: konteksti 25 %, ei muuta.

## Voimassa
Omistaja 18.49: juuri koeversioon, kun oja, laatta ja rako korjattu; uudet kuvat hänelle ennen junaa; puulta näyttävä lattia kiveksi. PT: EI vientiä, EI iPadia, EI juurta PK:lle (local_91a1bc27) ennen PT:n sanaa. Yleiset säännöt, ei paikkoja. Kuvat PT:lle, PT katsoo täysikoossa, KK näyttää omistajalle. Turkoosi ja harmaa taso: ei työtä ilman sanaa. Tausta-1-2-lod0: ei korjausta tähän erään (raja4 on sen alueella, ei näkyvää vikaa). Lokihaarat seina4-loki, seina5-instanssi eivät junaan; v127 ja v115pala eivät vientiin. Agentit vain Opus tai Sonnet. Seuraavasta ajosta KAIKKI 40 kameraa ja vikakohdat täysikoossa ennen viestiä PT:lle (PT 20.0x).

## Tila
Juuri koejuuri-saanto4 (tee_saanto4.py, tee_saanto4b.py, tee_saanto4c.py, noin 3 min). kuvat-s4 katsottu (JU 20.10, 901e4004b, L2, PUUTE 0): EI KELPAA. Rivi lähetetty PT:lle 20.15; PT:n vastausta ei ollut luovuttaessa, se voi muuttaa suunnitelmaa. Juurta EI muutettu kuvien jälkeen, ajoa ei ole käynnissä. Raportti raportti-s4.md, rajaukset r-s4-viat.png, parit parit-s4/. Säteet: sade3.py s4-d.json / s4-e.json / s4-f.json.

## Mitattu tästä ajosta
- raja3 kolmioruudukko (x 334,8; z 53): V4_lattia y 0,002, UV1 yhdessä pisteessä per kolmio; saman neliön kolmiot A 3 ja A 23. Säde ei löydä alta muuta lattiaa. Lähde: uv_kohta per kolmio, tee_saanto4b.py (vanhat palat) ja saanto4:n täytöt. PAHIN.
- Raot: raja3-viiva ja v-LP-valkea: säde ei osu yhteenkään pintaan saanto4:ssä, perus-juuressa V4_kivireunus y 0,075. v-LP:n vaaleat laatat eivät osu säteeseen kummassakaan juuressa (kaikki juuren paketit paitsi lod1-2, jotka sade3 ohittaa): alla on pinta, jota ei ole lod0-paketeissa; ei paikannettu. Tarkistus näyttää AUKKO 0, koska 0,1 m:n rasteri ja polygonin reunaviiva peittävät raon.
- t-LK: säde lattian läpi sokkeliin y -0,86. t-IP-valkoinen: säde osui 0,03 m:n palaan, EI todista rakoa. valo1, valo3 viiva, oja3, reuna1, laatta1: ei säteitä (valo1, reuna1, valo3 kamerat vain sk-s4.txt:ssä, eivät s4-kamerat.json:ssa: valo1 300.9 1.7 460.0 -150 14 70, reuna1 309.5 1.7 139.3 -165 14 70).
- t-IP raapale: V4_lattia y 0,002 lattian y 0 päällä, kaksi kerrosta. Oja2: V4_kivireunus y 0,27 ja V4_kujakivi_sokkeli-pääty y 0,28 x -174,7, z 241,2.
- Kauko-lod2: leijuva puurivi taivaalla s4-kuvassa, ei perus-kuvassa; ei mitattu, ei välttämättä juuresta (puita ei muutettu; päätelty).
- PALARAJA eritelty: 265 m2 = perussa 116, varjo 72, epävarma 50, oikea 28. Tiedot palaraja-koejuuri-saanto4.npz, kartta palaraja-oikea.png. Luokkia ei varmistettu pelikuvista; varjo-luokka voi osua seinän juuren omiin rajoihin. Tarkistusta tarkista_s4.py muutettu, json kirjoitettu ennen korjattua tulostusvirhettä: avain MAALATTU_M2 vanhassa json:ssa, MAALATTU seuraavassa.

## Seuraava askel: tee_saanto4d.py (EI VIELÄ KOODIA, ehdotus; ajetaan 4c:n jälkeen, lod0, kaikki tausta)
1. RAOT kolmioilla: jokainen perus-juuresta poistettu ylöspäin katsova kolmio y < 0,75 kopiona y -0,02 V4_lattiana, tarkka muoto, ei ruudukkoa. Peittää raon, jää muun lattian alle.
2. Tuplat pois: y 0,002 -palat, joiden alla on oikea lattia (tarkistus saman tai naapuritiedoston lattiasta), poistetaan; maalattu lattia näkyy.
3. Jäävät palat: yksi valoarvo 2 m:n lohkoa kohden, ei kolmiota kohden; lähde: valokelpoisen lattian tekseli, jonka valo on lähimpänä mediaania 1,5 m:n säteellä.
4. Oja2-sääntö: kapea (<= 0,7 m) V4_kivireunus-kappale yläpinta y < 0,35, >= 50 % seinän vieressä, + pieni irrallinen sokkelipääty y < 0,35. Tulosta määrä ja lista ensin (--kuiva): voi osua oikeisiin askelmiin; katso kuvista.
5. Tarkistus: RAKO 1 cm:n rasterilla 10 m:n paloissa, jalanjälki = poistetut kolmiot, pois seinät; AUKKO ei näe alle 0,2 m:n rakoja.
Sitten sade3 samoihin pisteisiin, aja-s4b.zsh-tyyppinen ajo vain JU:n vuorolla, rungolla 901e4004b (perus kuvat-s4-perus käy), ÄLÄ muuta juurta ajon aikana. Valmista vasta katsotuilla kuvilla. laatta2 tumma vyö ja laatta1 V4_red y 0,07: katso uudelleen, ei ratkaistu.
