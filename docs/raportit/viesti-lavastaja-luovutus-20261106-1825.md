# Lavastajan luovutus 6.11.2026 18.25 (tilinvaihto) — LUE TÄMÄ KOKONAAN, riittää yksin

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. EI VIENTIÄ.

## Mistä on kyse
Kielletyn kaupungin taustapaloissa on reikiä ja vanhan korkeuden lattialevyjä. Täytteet: koejuuri-levyt2 (185 reikää). Jäänteet: koejuuri-levyt3 = levyt2 ilman vanhoja levyjä. Juuri: proto-3d/_tyo/linnanrakentaja/katot-v125/koejuuri-levyt3.

## Leivonta, tila 18.24
- JU ajaa koejuuri-levyt3:n: 18/20 palaa lod0 valmiina, Blender käynnissä, irrotettu ajo. Loki T/lav-leivonta-levyt3.log.
- Pala kk-tausta-1-2 EI leivottu: kaatui, koska katto-longzongmen on oma verkkonsa ja leivo_valo.py hyväksyy yhden. Korjaus A/leivo_levyt3_1-2.zsh (0531d1c4e): katto takaisin ennen leivontaa, samat 1 041 kolmiota erilleen sen jälkeen. Takaisin + erota testattu kopiolla 1041/1041, itse leivontaa ei.
- JU:n järjestys: loput palat, sitten leivo_levyt3_1-2.zsh, sitten zsh A/aja-levyt3c.zsh 1 35140432d (5 kuvaa: r--265, j-2-3, j-0-4, j-1-1, r-321; kansio A/kuvat-levyt3c). Pyyntö on JU:lla, tarkista tilinvaihdon jälkeen, että se siirtyi JU:n seuraajalle.

## Seuraajan järjestys
1. Katso kuvat-levyt3c täysikoossa, vertaa A/kuvat-levyt3b:hen. Katosivatko tummat terävät kolmiot (uskomus: leipomaton valo, ei todistettu) ja ohut tumma viiva r--265:ssä vanhan reunan kohdalla (syy auki)?
2. Kun leivonta on katsottu, pyydä kävely- ja törmäystarkistus suoraan PK:lta (renkaat ensin; PT:n sana). Kerro: lattia laski 0,3-0,7 m, kaikki 20 palaa kk-tausta-0-0...3-4, kolmiot A/jaanteet.json ja sääntö A/tee_levyt3.py.
3. Tulos PT:lle: rivi ja kuvapari send_messagella (Raamattu 7.25), ei omaan ikkunaan.

## Vientiehdot (PT)
Vienti vasta, kun tummat kolmiot, ohut viiva r--265:ssä ja kävely on katsottu. Tämän lisäksi aiempi KK:n vientiehto: muuri/KORJAUS.md, ja viiden pisteen ehto on auki (p--133p4 kamera seinässä, katkoviivat).

## Mitä on todistettu
- Kaista = 42 cm:n askel: y 0 -reuna ja vanhan y 0,42 -levyn reuna samalla viivalla, ei pystypintaa. Laskettu sijainti osuu kuvaan.
- Sääntö (A/tee_levyt3.py): V4_lattia, y 0,3-0,7, ala >= 0,5 m2, >= 50 % näytteistä uudessa listassa (kielletty-rakennukset/koe-sisapiste/ulos) alempana. Poisto 602 kolmiota / 7 907 m2, lisäys 2 458 / 7 929 m2. Samalla korkeudella pysyvä marmori jää lattiaksi, muuten sokkeli on kuvioton sininen.
- Kuvat-levyt3b (leipomaton): kaista, lävistäjä ja sininen poissa, sokkeli laatoitettu. Pari PT:lle: kuvat-levyt2b ja kuvat-levyt3b, r--265--248.png.
- ArgumentOutOfRangeException: Unityn QuickSearch editorin käynnistyksessä, ei pelin koodia, ei vaikuta kuviin. 404: samat 4 tiedostoa kaikissa ajoissa.

## Auki
- Mitä kaistan läpi näkyi: ainoa osuma on 0-1:n lod1/lod2 y 0, sokkelo-pinnat tarkistamatta. Ei enää tarpeen, jos kaista pysyy poissa.
- Sääntö ei kata: kiilat j-2-3:n yläosassa, jäänteet y 0,08-0,3 ja y > 0,7, marmori (j-1-0 sokkelialusta), kivireunus. Yhteensä mitattu 2 223 kolmiota / 15 100 m2, ero uuteen listaan, ei todistus viasta.
- V4_stone 215 ja V4_sokkeli_kansi 82 palaa muuttuivat lattiaksi, koska materiaalia ei ole palassa. j-0-4:ssä näytti ympäristöltä, muualla ei katsottu.
- 53 kolmiota / 622 m2: uudessakin tyhjä (mm. y 4,1 (135,4; 342)). Ratkaisematta.
- r--109, p--95, r--380: eivät kuulu tähän korjaukseen. S--185p9 ja s--81p1 seuraavaan listaan koodilla b0f94ac0a, kansio VS:lle (PT).

## Opetukset
- Vertaa pisteen omaa korkeutta, ei kolmion keskiarvoa: kalteva pinta näyttää jäänteeltä.
- UV-tiheys ei kerro laattakokoa kuvassa.
- Kaikki palat -glob poimii symlinkit, ja `cp` niiden läpi kirjoittaisi vientipakettiin. Tarkista -L.
- Palan 1-2 leivonnassa katto ensin takaisin (muuri/yleinen/katto_takaisin.py).
- Työkansion haara voi vaihtua alta: tarkista `git branch --show-current` ennen committia. Tämä tiedosto on vain haaralla lavastaja/luovutus-20261106-1305.
