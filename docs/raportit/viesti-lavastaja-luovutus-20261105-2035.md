# Lavastajan luovutus 5.11.2026 2035 — LUE TÄMÄ, sitten muuri/KORJAUS.md loppu

Korvaa -2009:n. Ei vientejä. L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen/lattiakoe. Vienti vasta PT:n sanalla ja PK:n vahvistuksella. Mac-ajot JU:n vuorolla.

## Ajossa
L/aja23.zsh pyydetty JU:lta 20.35 (PT 20.3x: YKSI ajo, 5 kuvaa, ei vientiä; koejuuri-lattia23, runko 980bb115c). Valmisrivi tulee tälle sessiolle, kuvat L/kuvat23-koe. Jos JU nollautui eikä riviä tule, tarkista kansio ja pyydä JU:lta uudelleen; älä aja itse.

## Seuraava työ
Katso 5 kuvaa täysikoossa ja rajauksina, sitten rivi PT:lle (≤ 3 riviä) ja parit.
- askel-z556 vs kuvat22-koe/sauma-ita-z556 (sama kamera): z 550:n askel pitää olla vanhat 4 cm, lattia22:ssa 16 cm.
- sauma-ita-z120 vs kuvat22-koe/sauma-ita-z120 (sama kamera): ei saa huonontua; 21→22 hyppy poissa, ero 4…22 → -4…+12 (L/parit22-z120-21-22.png).
- sauma-ita-z-60: sauma auringossa; sauma-lansi-z630: länsi auringossa (rengas siellä ennen y noin 0,4–0,5); sauma-lansi-z450: länsi, valon ero (reuna noin 0,63 vs rengas 0,758), mallin mukaan vain 0,29 auringossa ja näkyvissä.
- Kuittausraja (PT): sauma näkyy peittämättä molemmilla puolilla ja z 550:n askel on vanhat 4 cm. Jos ei riitä, kerro tulos PT:lle ENNEN kolmatta ajoa. Vientilupa vasta PT:ltä.

## Mitä on tehty
- Lattia21: PT kuittasi z 700:n ja renkaan (199, R/B 1,167 kelpaa, ei säätöä). Parit L/parit21-*.
- Syy x ±475: varjostimen kuvio on maailman xz:sta (JuoksuLattia.shader p = i.w.xz), joten kuvio on sama. Rengas on saumassa y 0,04–0,65 (z -500: 1,12), tausta y 0, ja korkeusero näkyy hyppynä. Valo: rengas 0,758, taustan reunan aurinkotaso 0,54–0,76. Idässä renkaan reuna x 475; lännessä x -475 (tausta alkaa x -480 sen alla).
- L/tee23.py, koejuuri-lattia23 (pohja lattia21): vyöhyke x 475–500 ja -475…-500, z -500…675, laskee yhtenä pintana (pudotus = reunan vanha y × (1 − t)), reuna tasan y 0; jalat samalla pudotuksella; kuva 2048×64, rivit 32–63 (vasen puolisko itä, oikea länsi) liu'uttavat valon reunan tasosta renkaan arvoon 25 m:llä; vanhat UV1 u ja v puolitettu; z 650–675 palaa renkaan arvoon. tee22 = hylätty versio.
- Oma virhe lattia22:ssa: vain reunapisteet laskivat, ylempi kerros jäi ylös (z 550: 4 → 16 cm). Korjattu lattia23:ssa, mallista 4 cm. PT:lle kerrottu.
- Hukkakuvat lattia22:ssa: puu peitti länsikuvan z -365; z 556:ssa ja z -262:ssa sauma ei näkynyt.

## Tiedossa
- L/nako23.py: näköyhteys ja aurinko (az 170, el 30) mallista. Esteet vain tausta lod0, rengas lod2, puut.json; ei rakennukset eikä lähipuut. Olettaa katseen +z; testikamera katsoo pelin kameran suunnasta, joten suunta voi poiketa. Lokin "kamera" on pelin kamera ennen testikameraa, ei kuvan kamera. Eteläisin kuvasuunta: x kasvaa kuvassa oikealle.
- Jäljelle jäävä ilma jalkojen alla: ≤ 0,11 m, paitsi z 627–636 harmaa 0,30 (0,28 oli jo ennen), mitattu lattia22:ssa; lattia23:ssa ei mitattu uudelleen (L/rako22.py osoittaa lattia22:een).
- Kuvissa rakennusten seinillä vanhoja laikkuja ja ilmassa olevia levyjä (KORJAUS.md:n jono), ei tämän työn asiaa.
- ND odottaa juoksupelin pintojen ja räystäiden jälkeen (PT 20.11), älä kytke uutta maaversiota. Ei omaa ajoa.
- Python: /opt/homebrew/bin/python3 ilman -I (numpy).

## Jonossa, ei aloitettu (KORJAUS.md; LAV ei ole tarkistanut)
PK: konsoli, räystään alapinta, marmoriterassin nollatekselit; muurien ja porttien kiertosuunta + V4_gold-räystäs (KK: yksi yleinen korjaus generaattoriin, ei omaa ajoa, ei junaan); lähikoristeiden mitat h-zhongyoumen ja h-zhongzuomen; valkoinen viiva (13; -407) ja pystysauma; (-87,5; 302,5). S-rengas-itän harmaa vino levy. Vaakalevyt ilmassa x -420, pysty harmaa levy ja sälö x -60, puita ilman tyveä x 136 ja x 300.
