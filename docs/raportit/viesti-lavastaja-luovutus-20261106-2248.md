# Lavastajan luovutus 6.11.2026 22.48 — LUE KOKONAAN, riittää yksin (korvaa -2241)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu: kaikki syyt ja mitat. EI LEVYT8:AA, LEIVONTAA, KARTTAA, VIENTIÄ eikä muita paloja ilman PT:n sanaa.

## TEE ENSIN: PT:n sana (sanatarkasti)
PT, omistajan sana kuvasta rajaus-jaannos3-237-112 (levyt7b): "vaalea viiva johtuu samasta tekstuurin puutteesta". Uusi tulkintani: viiva on pitkä pystysuora vaalea beige juova kuvan keskellä vasemmalla (px noin x 400, y 410–1076), matalan reunakiven sivu tasaisena värinä, ilman kivikuvaa. Sama juova näkyy molemmissa kuvissa ja arkki-1:n rivillä 2 vasemmalla, joten se ei johdu leivonnasta.
Mittaa TÄMÄ kivi, ei vain B:n jalusta: sivupinnan materiaali, UV:t, onko pinta olemassa, ja kuva suoraan sivulta. Sopiiko sama selitys B:n vaaleaan kohtaan, ja koskeeko tämä muita samanlaisia reunakiviä? Korjaa koejuureen ja näytä pari, ei leivontaa. Kiila ja raita erikseen kuva-ajolla. Rivi minulle.

Aloituspiste: juovan todennäköinen pinta palassa 3-1: V4_kivireunus, (258,53; 0,21; -111,65), (241,38; 0,24; -112,06), (241,38; -0,06; -112,06), 2,57 m2 (mittaa15.py; samassa paikassa uudessa listassa marmori). UV0 mittaamatta tälle kivelle: mittaa21.py mallina. Vertaa: B:n jalustan etusivulla UV u 1,04 / 3,9 m, venymä 3,75, sivu 1:1. Muiden kivien laskenta: UV0-venymä kaikille V4_kivireunus-sivuille; vain laskenta ensin, korjaus PT:n rajauksen mukaan. Pelin varjostin: JuoksuLattia.shader (pelikoodi ei kuulu tälle roolille).

## Avoimet ajot JU:lla (kuittaa tälle sessiolle)
- aja-levyt7v.zsh -> kuvat-levyt7v: koejuuri-levyt7v (tee_levyt7v.py, 1-3 ja 3-1 valokartta tasainen), B-koko2 ja jäännös 3, heijastus päällä ja pois. Tila 1 = kuvat-levyt7b; tila 3 = jakokuva 7b / 7v (pelissä ei pelkän valokartan näyttöä; kerro PT:lle). Kiila tai raita vain jakokuvassa = valokartta/UV (tutki saaret ja tumma 2,86 m2:n kolmio). Laikku tilassa 2 = pelin puoli. Rivi PT:lle viasta kerrallaan: selitys tai "ei erotu"; rajaukset täysikoossa.
- aja-levyt7s.zsh -> kuvat-levyt7s: B:n jalusta suoraan oikealta ja takaa, leivottu levyt7. Jos kamerat osuvat väärin, kerro se.

## Tila
koejuuri-levyt7 (katot-v125/) = levyt6 + tee_levyt7.py; palat 1-3 ja 3-1 koeleivottu (leipomaton A/levyt7-leipomaton), 2-1 hitsattu, leipomaton. Parit A/kuvat-pari-levyt7b.
Ratkesi leivonnalla: B:n tumma yläpinta, 20 pisteen viiva, heikot kolmiot, A-etelän kaista. Auki: jäännös 3:n kiila ja raita, B:n laikku, omistajan vaalea viiva, pienet tummat pisteviivat.
Mitattu: vanha pinta ei palannut (mittaa16), mittapisteissä vain lattia (mittaa20), laikku ei näy valokartassa (mittaa19). B:n sivut: kivireunus, UV jatkuva, oikea ja takasivu kamerasta poispäin; omistajan selitys ei sopinut B:hen PT:lle lähetetyn rivin mukaan, mutta takasivua ei voitu sulkea pois. Omistajan selitystä ei ole vielä mitattu jäännös 3:n kivestä.
Muuta: jäännös 3:n kamerasovitus ei osunut; sovita kulmista (mittaa12.py). Pelikoodi-työpuu: /Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu, sha 35140432d ajoissa. zsh: käytä ${C}:refs, ei $C:refs. PK:n kävely uudella kartalla tekemättä ennen vientiä.
numpy/scipy: /opt/homebrew/bin/python3 ilman -I:tä.
