# Lavastajan luovutus 5.11.2026 2100 — LUE TÄMÄ, sitten muuri/KORJAUS.md loppu

Korvaa -2035:n. Ei vientejä. L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen/lattiakoe. Vienti vasta PT:n sanalla ja PK:n vahvistuksella. Mac-ajot JU:n vuorolla (runko 980bb115c). Älä ota nimeä koejuuri-lattia24: se on vanha arkistolinkki T7:lle.

## Tila: PT:n sanaa odotetaan
PT:lle 20.59: lattia24b ei kuitattu, suositus 24c + yksi ajo. Ei omaa ajoa ennen PT:n sanaa. Jos PT:n vastaus ei tule mukana, se tulee tälle sessiolle.

PT:n kuittausraja: sauma näkyy peittämättä molemmin puolin, z 550:n askel enintään vanhat 4 cm, z 630:ssä ei sahaviivaa, katkoja eikä karkeaa tarkan päällä. Jos jokin jää, rivi PT:lle ennen seuraavaa ajoa, ja siinä kannattaako koko vyöhyke rakentaa uudelleen.

## Seuraava työ PT:n luvalla: 24c
L/tee24b.py pohjaksi. Korjattava oma virhe: poistosääntö vei z 675:n yli jatkuvan tarkan palan, joten x 475, z 675–700 repesi (z 680: sisä/ulko 0,64/0,14; lattia21 0,64/0,64). Kolmio jää, jos sillä on piste z > 675. Tarkista mallista ennen ajoa: L/kulma24b.py (juuri 24c) ja sama x ±500:n ulkopuolelle jatkuville paloille; myös se, ettei jäävän palan reuna tee uutta hyppyä z 650–675:ssä tai karkea nouse sen päälle (L/laajuus23.py). Mittaa ilma jalkojen alla (L/rako22.py osoittaa lattia22:een; ei mitattu 23:sta eikä 24b:stä).
Ajo: kopioi L/aja24b.zsh ja L/sk24b-koe.txt, jätä lattia21-vertailu pois; kuvat itä z 662, länsi z 630, askel z 556. Kuvat täysikoossa ja rajauksina, parit, rivi PT:lle ≤ 3 riviä.

## Mitä tiedetään
- Lattia24b: x ±475–500, z -500…675, 294 tarkkaa kolmiota pois, kaikkien alla karkea; jalat 14 pistettä alas. Z 630 puhdas, z 550:n askel poissa, valon mediaani z 630:ssa sama kuin 21 ja 23.
- Lattia21-vertailu z 630:ssa puhdas (loki: juuri lattia21), joten sahaviiva ja katkot tulivat lattia23:sta. Mekanismia lattia23:ssa ei selvitetty; PT:lle aiemmin mennyt "rakenne jo lattia21:ssä" oli liian vahva päätelmä. PT:lle kerrottu tulos, ei erikseen tätä sanamuotoa.
- Tarkat palat: 532 667 m² koko renkaalla, karkean päällä mediaani 4 cm, ei sivuja. Vyöhykkeen ulkopuolella ennallaan.
- Kamera-arvio kuvan ja maailman välille toimii (L/paalle23.py, L/viiva24b.py): pelaajasta 10 m taakse, 8 m ylös, kallistus 40, fov 60; virhe pelaajan kohdalla noin 25 px.
- Avoimia pieniä: länsi z 662:ssa varjossa pieni katkoviiva kuvassa noin (600, 800), ei selvitetty. PUUTE 20:57:12 odota-maailma juuren vaihdon jälkeen, vain vertailukuvaa ennen.
- Juuren vaihto ajon aikana toimii (palatsi mallit + v4 7), mutta lisää noin 3 min.
- Python: /opt/homebrew/bin/python3 ilman -I (numpy).
- ND odottaa juoksupelin pintojen ja räystäiden jälkeen (PT 20.11), älä kytke uutta maaversiota.

## Jonossa, ei aloitettu (KORJAUS.md; LAV ei ole tarkistanut)
PK: konsoli, räystään alapinta, marmoriterassin nollatekselit; muurien ja porttien kiertosuunta + V4_gold-räystäs (KK: yksi yleinen korjaus generaattoriin, ei omaa ajoa, ei junaan); lähikoristeiden mitat h-zhongyoumen ja h-zhongzuomen; valkoinen viiva (13; -407) ja pystysauma; (-87,5; 302,5). S-rengas-itän harmaa vino levy. Vaakalevyt ilmassa x -420, pysty harmaa levy ja sälö x -60, puita ilman tyveä x 136 ja x 300.
