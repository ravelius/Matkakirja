# Lavastajan luovutus 7.11.2026 22.14: riittää yksin (korvaa -2052)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/palkki. Loki: muuri/KORJAUS.md, kohdat 21.0x-22.1x. Python: /opt/homebrew/bin/python3. Syy: konteksti 30 %.

## Voimassa
Omistaja 20.55 (PT): saanto4e sisäiseen koeversioon sellaisena; viat avoimiksi (A/AVOIMET-s4e.md, 29 riviä). EI KORJAUKSIA avoimiin; uusi yhtenäinen lattia vain omistajan sanalla. Viimeinen iPad-ajo tälle koeversiolle on s4e-ipad3 (PT). Agentit vain Opus tai Sonnet.

## Tila
Viety JU 21.09: juoksupeli-kk-lavastaja-saanto4e-vienti-20261107 (ec728ab2659a; tausta-v128, osasarja-v15, ulkorengas-v15, muurikate-v39/v40) ja juoksupeli-palatsi-esto-v40-vienti-20261107 (8e308a2b21e1). PK:n runko 10e9b6c4a (vakiot + kulkukartta), ei junassa ilman PT:n sanaa. Juuri katot-v125/juuri-saanto4e-vienti.
Ajot, raportti A/raportti-s4e-ipad.md: s4e-ipad vahti pois huippu 4755 Mt, vapaa 367, 11,3 s kehys latauskuvan aikana (257 s); s4e-ipad2 vahti päällä 0/16 kuvaa, testivahti pysäytti komennot latauksessa 4120 Mt, huippu 4652, vapaa 467, botti maaliin 1693 m (loppukortti, ei jumi), 11,3 s ei toistunut.

## Seuraava: odota JU:n rivi s4e-ipad3
JU jonossa viimeisenä, vuoro yöllä, ei edelle. Kansio lokit/linnanrakentaja-s4e-ipad3, skenaario A/sk-s4e-ipad2.txt (A/sk_s4e_ipad2.py), 10e9b6c4a, vahti pois, 23 kuvaa: v40a-d, tayt-oja2, tayt-raja3, tayt-lisa3 (-a, -b botti; -c keisari ja kamera paikalla), pelia, raja-x.
Kun JU kuittaa:
1. Katso kuvat. Lokin aika ja md5 (ei vanhoja). Pelia ja raja-x parina A/kuvat ... edellisen kanssa lokit/linnanrakentaja-s4e-ipad.
2. Paikka-rivit: grep "juoksupeli: paikka" muisti-tarkka.logista. Palauttaa Puyi pohja (x; z), s, aika. Vertaa kohteisiin rivillä 3; kerro, kävikö botti alueella. "maali" ja "loppukortti" lokissa = juoksu päättyi, ei jumi.
3. Kohteet pohjan kehyksessä: v40a -79,4 352,0; v40b -58,9 352,3; v40c -74,8 247,3; v40d 47,7 360,0; täytöt -176,3 243,7; 336,3 57,6; -329,9 170,2. Muunnos estosta (verkon kehys) laskettu, kierto -2,167° A:n ympäri, EI varmistettu pelissä. "palatsi alku" + "uudestaan" iPadilla kokeilematta; lähtö on lähin solmu. Jos ei osu, ne jäävät avoimiksi (PT).
4. Kehykset yli 1000 ms, 11,3 s merkitään AUKI. Kulkukuvat vain, kun peli käynnissä.
5. Tulos PT:lle (local_5df52e10) enintään 3 riviä + polku raporttiin: kuvat, kulku, muisti (4755, 4652 ja uusi), 11,3 s auki. PT vie KK:lle. Lisää AVOIMET-s4e.md:hen, mitä jäi todistamatta.
Muuta ei ole jonossa. Jos ajo ei tule, ei omaa uusintaa: rivi PT:lle.
