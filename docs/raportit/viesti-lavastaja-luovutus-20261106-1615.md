# Lavastajan luovutus 6.11.2026 16.15 (jäännesääntö valmis, 20 palan leivonta JU:lla) — LUE TÄMÄ KOKONAAN

Pohja: -1305 (commit 14398b0fb) ja -1345 (d1bec0160) pätevät, paitsi kohdat jotka tämä korvaa. A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. Luovutus kontekstivahdin takia (25 %). EI VIENTIÄ.

## Tulos
1. Levyt2b: leivonta poisti täytteen rajat palassa 0-1. Kaista jäi.
2. Kaista = 42 cm:n askel: y 0 -reuna ja vanhan y 0,42 -levyn reuna samalla viivalla, ei pystypintaa. Lasketut reunat osuvat kuvaan. Läpi näkyvä pinta EI todistettu: ainoa osuma tarkistetuista paketeista on kk-tausta-0-1 lod1/lod2 y 0; sokkelo-pinnat tarkistamatta.
3. `ArgumentOutOfRangeException`: Unityn QuickSearch editorin käynnistyksessä, ei pelin koodia, 43 kuvakansion lokissa. Ei vaikuta kuviin.
4. Jäänteet (A/mittaa_jaanteet.py, jaanteet.json): ensimmäinen luku 26 500 m2 oli mittausvirhe (kaltevat pinnat), korjattu luku V4_lattia 971 kolmiota / 11 500 m2. Ero uuteen listaan, ei todistus viasta.
5. Kuvat-jaanne1: j-2-3 kaista, j-0-4 lävistäjä, j-1-1 ei näkyvää vikaa, j-2-1 ei ratkaise (kamera seinää vasten), j-1-0 marmori on sokkelialusta, jätetään.
6. Sääntö A/tee_levyt3.py: V4_lattia, y 0,3-0,7, ala >= 0,5, >= 50 % näytteistä alempana. Poisto 602 kolmiota / 7 907 m2, lisäys uudesta listasta 2 458 / 7 929 m2, kaikki 20 palaa. Samalla korkeudella pysyvä marmori jää lattiaksi, muuten sokkeli on kuvioton sininen. Juuri koejuuri-levyt3.
7. Kuvat-levyt3b katsottu 3/3 täysikoossa: kaista, lävistäjä ja sininen pois, sokkeli laatoitettu. Ei vielä hyväksytty: valo leipomatta.

## JU:n jonossa (pyydetty 16.1x)
zsh A/leivo_levyt3.zsh (ei argumentteja = 20 palaa, 3 kuja-/aukiopalaa ovat symlinkkejä eikä niitä leivota) ja zsh A/aja-levyt3c.zsh 1 35140432d, kuvat A/kuvat-levyt3c (r--265, j-2-3, j-0-4, j-1-1, r-321). Skriptiä ei ole ajettu; vain syntaksi ja palojen valinta testattu.

## Seuraajan järjestys
1. Katso kuvat-levyt3c täysikoossa: katosivatko tummat terävät kolmiot ja ohut viiva r--265:ssä (vanhan reunan kohdalla, syy auki). Vertaa kuvat-levyt3b:hen.
2. Pyydä PK:lta kävely ja törmäys: lattia laski kohdissa 0,3-0,7 m. Tarkistamatta. Rivi PT:lle sanottu 16.1x.
3. Sitten tulos PT:lle: rivi ja kuvapari send_messagella (7.25). Ei omaan ikkunaan.
4. Jäljellä: kiilat j-2-3:n yläosassa (säännön ulkopuolella), y-rajan ulkopuoliset jäänteet (mm. y 0,08-0,3, y > 0,7), V4_stone 215 ja V4_sokkeli_kansi 82 palaa muuttuivat lattiaksi (j-0-4:ssä näytti ympäristöltä, muualla ei katsottu), 53 kolmiota / 622 m2 (-1345), viiden pisteen ehto (-1305).

## Opetukset
- Kolmion keskikorkeus ei kelpaa vertailuun: kalteva pinta näyttää jäänteeltä. Vertaa pisteen omaa korkeutta.
- UV-tiheys ei kerro laattakokoa kuvassa: j-0-4:ssä UV/m 1,0 näytti samalta kuin ympäristö. Älä päättele laattakokoa siitä.
- Kaikki palat -glob poimii myös symlinkit, ja `cp` niiden läpi kirjoittaisi vientipakettiin. Tarkista -L ennen kopiointia. Laske ennen kuin kerrot luvun: 23 tiedostoa, 20 palaa.
- Sanaa pyytävä rivi send_messagella, ei omaan ikkunaan (PT 14.0x).
