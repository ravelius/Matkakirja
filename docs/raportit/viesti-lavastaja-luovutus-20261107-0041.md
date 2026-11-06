# Lavastajan luovutus 7.11.2026 00.41 — LUE KOKONAAN, riittää yksin (korvaa -2355)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. EI LEIVONTAA, KARTTAA, VIENTIÄ eikä muita paloja ilman PT:n sanaa. Työ kuuluu juoksupeliin.

Yön sääntö (omistaja 23.07): vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa -> kokeen osa pois tai edellinen toimiva tilalle, rivi KK:lle ja seuraavaan työhön.

## Tehty: PT:n sivuhuomiot ja kolo (ajo 7n, JU L1 00.37, kuvat A/kuvat-levyt7n). PT ja KK saivat rivit 00.40.
- Pienkivikaista: korjattu koejuuri-levyt7n (tee_levyt7n.py, vain 0-1 lod0, 7k:n päälle). Pari A/kuvat-levyt7n/pari-peli-0-2-kauempaa.png (7m|7n). Heikko valoero jäljellä, leipomaton. PT:n kuittaus puuttuu; ei vientiä.
- Ristiviiva: lehvästökortti syrjittäin, todistettu (puut pois -> poissa; sivukamera). Ei lod0:lla, suositus KK:lla.
- Valkoinen raita: suunniteltu osasarjan reunakivi, ei vika, suositus KK:lla.
- Kolo: 12-17 cm rako, x -228,54..-228,37 kohdassa z -258, esto.bin vapaa, massassa 0. Ei korjattu.
- Koko muuria EI saa sanoa korjatuksi: 1-1:n kivisivu ei näy kuvissa.

## TEE ENSIN: PT 00.4x (sanatarkasti)
"Pari 7m|7n katsottu kokonaisena, pienkivikaista poissa; 7n kuitattu kokeena, ei vientiä. Korjaus muutti muutakin kuin kaistan: oikean terassin reunakivi näkyy nyt pidemmältä ja päättyy avoimeen päätyyn keskelle lattiaa (parin oikealla noin 1680; 405), jota 7m:ssä ei näkynyt. Älä kirjaa kulmaa ehjäksi, ennen kuin olet mitannut, onko pääty pelin muu osa vai paljastuiko se korjauksesta. Ei toimi = kolmio takaisin ja rivi KK:lle. Seuraava LAV tekee yhdellä ajolla, enintään 2 yritystä: (1) tuo pääty täysikoossa, (2) 1-1:n kivisivu näkyviin yläviistosta z -261,5..-256,5; jos sivua ei saa näkyviin kahdella yrityksellä, kirjaa '1-1 kuvaamatta' ja muuri jää korjaamatta-sanalle. Vuoro JU:lta; koejuuri 7n, ei leivontaa, karttaa, vientiä eikä kolon korjausta."
Lähtökohdat: pari on kahden kuvan rinnakkain (oikea puoli 7n), mittaa ensin kuvasta kuvat-levyt7n/peli-0-2-kauempaa.png; kamera -367 3 -22 30 15 80. Osoitteen "parin oikealla" koordinaatistoa ei ole varmistettu. Kolo-kuvien kamerat eivät näyttäneet 1-1:n sivua: kolo-paasta (-228,9 2 -262 3 30 80) on liian lähellä, kolo-sivulta (-230,5 2,2 -259 90 40 50) seinä x -229,2 peittää. Tee uusi aja-levyt7x.zsh aja-levyt7n.zsh:n mallilla, juuri 7n.
Rivi KK:lle aamun koontiin lähetetty (risti, raita, kolo, sivulöydökset, lod1/2). Lod1/2 ennallaan: kaista voi palata kauempaa.

## Avoinna (ei ilman PT:n sanaa)
Sivulöydökset: irtolaatta tausta 3-1 (259; -80,9), kivijalan kansi venynyt peli-A:n seinässä, sahalaita ulkomuurin kivijalassa kaista-lahella-kuvassa (syy mittaamatta). Vanhat: laikku B, kiila ja raita (valokartta), PK:n kävely uudella kartalla ennen vientiä.

## Työkalut
A/maailma-7k.npz + maailma-7k.json (pelin ladonta) ja osasarja-v8-z.npy: säteet mittaa38.py. VARO: pelkkä tausta-lod0 ei riitä, osasarjassa on kujaseinät. Suodata kolmion rajoilla, ei keskipisteellä. Osasarjan z on käännetty, joten sen normaalit näkyvät väärin päin. Pikseliä vastaava säde: sade() mittaa38:ssa; kuva 2000 px:n koordinaateissa. Ajo: A/aja-levyt7n.zsh, sha 35140432d, vuoro JU:lta. numpy/scipy: /opt/homebrew/bin/python3 ilman -I:tä.
