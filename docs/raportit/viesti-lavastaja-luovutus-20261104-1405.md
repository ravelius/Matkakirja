# Lavastajan luovutus 4.11.2026 klo 14.05 — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: 55340c24a:docs/raportit/viesti-lavastaja-luovutus-20261104-1335.md (työkalut, PT:n linja) voimassa, tämä korvaa sen avoimet kohdat. M = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri, Y = M/yleinen. Python: /opt/homebrew/bin/python3. Kaikki tausta muuri/KORJAUS.md:n lopussa ja Y:n skripteissä.

## KK:n tilaus 13.38 (sitova, omistajan linja 11.09 ja 11.22)
Yleiset korjaukset uuteen kansioon, vanhaan ei kosketa, ei paikkakorjauksia. Ei vientiä, junaa eikä iPadia ilman KK:n sanaa. Tulos KK:lle: mitä muuttui, montako saumaa, kuvat ilman tekstikaistaa. Jos sauma tai hyväksytty kohta rikkoutuu, pysähdy ja kerro ennen jatkoa. Väliaikatieto meni KK:lle 13.59 (jonossa), siinä mukana korjaus parien kokoon.

## Tila nyt
Juuri: katot-v125/koejuuri-yleinen. Muutettu: 8 palaa lod0–2 (sovita.py: 24 ryhmää, 3 910 m²; 20 pois, koska alla on aukio; 4 alas + 1,5 cm). g-jalusta-etu pois rakennukset.jsonista, g-jalusta = koeleivonta C.
Koe- ja mittaustulokset: terassin syy todistettu (terassi/mittaa.py). V-viiva on leivottu varjo (varjo.py). Laskennallinen saumahaku 0 uutta (saumat.py, iteroi.py; 3 ryhmää jäi sauman takia). Varjon alueella leivonta6:sta enintään v-ulkomuuri-075 ja t-portti-zhongzuomen (vaikutus.py, karkea rajaus): leivonta6 ei mene hukkaan, näitä ei leivottu uudelleen.
Rajat: parihaku vain vaakapinnat. Saumahaku on raster 0,25 m, ei todiste. Esto ei uudistettu. Lod1/2:ssa reunuksia ei osunut sääntöön (0): katso kuvista.

## Seuraava askel
JU ajaa: 1) Y/leivo-tausta.zsh (9 palaa, alkoi 13.59, loki Y/leivottu/, korvaa lod0:t koejuuri-yleisessä) 2) Y/sk-ennen.txt ja sk-jalkeen.txt, kuvat Y/kuvat/ (yl-<kohta>-ennen/-jalkeen: alku, taihemen, arkki x 6, terassi, h01–h07 + h03b). Kamerat tee-sk.py; arkin kamerat johdettu poimi.py:n CAM-arvoista, tarkista että ne osuvat. Juoksun alku ja Taihemen arvioitu aukot-v6-v11.jpg:stä.
Kun kuvat tulevat: katso täysikoisina parit (ensin alku ja taihemen, sitten havainne). Kirjoita tulos KK:lle. Koneellinen sauma lisäksi kuvista, ei vain laskennasta.
Odottaa KK:ta: laajempi kolmiotaso (kolmiot.py: 47 % listasta, 17,6 km uutta reunusta). Suositus annettu: päätös kuvien jälkeen. Älä aloita ilman sanaa. Arkin (-110, 30) ei korjaudu tässä, koska laatalla on taloja.

## Ovi (omistaja 12.48, ei junaan)
Kuvat v2 (#2026, 5d8a07662) katsottu, Codexille kuitattu 02d0910a4, KK:lle viety 14.0x (jonossa). Huomiot: oikean lehden rengas saranan puolella kahdessa kuvassa, ristikkoa ei peilattu. Tripo vasta KK:n sanalla: tilaus kuten 55340c24a:n luovutuksen "Avoinna 1" (malli posti/ 006ff6d7d), lisäksi rengas vapaaseen reunaan ja lehdet peilaten. Kuvat _tyo/codex/juoksupeli-ovi-20261104/_review-v2/.

## Muuta
Levy 36 Gt vapaana (96 %). Levyä vievät, poistettavissa myöhemmin omasta kansiosta: M/irto/kohtaus.npz (643 Mt; Y:n skriptit käyttävät sitä), komp.npz. Y/terassi/A, B, rk-ilman-*: koeaineistoa. Muu jono seis KK:n suunnitelmaan asti.
