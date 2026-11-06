# Lavastajan luovutus 6.11.2026 13.45 (levyt-reiät: syy todistettu, täyte tehty, leivonta kesken) — LUE TÄMÄ KOKONAAN

Pohja: -1305 (commit 14398b0fb) pätee: vientiehto, PT:n sana 13.0x, Opetukset, Työkalut, kohdat 5-7. -1318:n syypäätelmä ja korjaussääntö ovat KUMOTTU, tämä korvaa ne. A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. Luovutus kontekstivahdin takia (25 %). EI VIENTIÄ.

## Tulos
1. Syy todistettu (-265; -248): solun vanha ja uusi korkeus pitävät paikkansa (v115 y 0,42 ja uusi y 0 koko solussa). `v115_korjaa.py` valitsee poistettavat ja lisättävät keskipisteen solun mukaan, ja kolmiot ovat soluja isompia: vanha lähti, uutta ei lisätty. Puuttuvista 274:stä keskipiste ei missään solussa 173, solussa lisättävä mutta ei lisätty 98, ei lisättävää 3 (A/mittaa_puuttuvat.py).
2. Peitto, 269 kolmiota, ovi3 (A/mittaa_peitto.py, peitto-levyt.json): reikä ja uudessa alempana 185 / 1 415 m2; uudessakin tyhjä 53 / 622 m2 (lähes kaikki y > 2); muu 31 / 66 m2.
3. Korjaussääntö: puuttuva uusi kolmio leikattuna poistetulla vanhalla, uuden korkeudelle ja UV0:lla. Vanhan palautus toisi poistetun levyn takaisin. Kerrottu PT:lle; PT ei ole vielä vastannut.
4. koejuuri-levy1 (yksi kohta, A/kuvat-levy1) ja koejuuri-levyt2 (185 kolmiota, 546 palaa, 1 240 m2, 13 palassa, A/tee_levyt2.py, A/kuvat-levyt2). Vain lod0, valo-UV yksi piste palaa kohden.
5. Kuvat levyt2 5/5 täysikoossa, EI HYVÄKSYTTY: r--265, r--380, r-321: vaalea pienkiveys poissa, laatat jatkuvat, mutta täyte näkyy terävinä tummina ja vaaleina kolmioina (ei leivottu). r--109 ja p--95 ennallaan: eivät kuulu tähän korjaukseen. p--95:n kiilat ovat myös v125:ssä.

## Auki, syy tuntematon
- r--265:n ja r-321:n kapeat vaaleat kaistat. Oma selitykseni (näytepisteet ohittivat) kumoutui: reunan vieressä on y 0 V4_lattia joka mitatussa pisteessä, mutta kaistan paikkaa kuvassa ei ole laskettu pikselistä. Seuraava: laske kaistan xz kamerasta ja katso sen kolmion UV0.
- 94 V4_stone-palaa meni V4_lattiaan, koska V4_stonea ei ole paloissa. Väriä ei voitu todeta: ei tiedetä, onko näissä viidessä kuvassa yhtään. `v115_korjaa.py`:ssä on materiaalikartta, jota en käyttänyt.
- y 0,42 jatkuu solun ulkopuolella täytteen vieressä: 42 cm:n reuna, ei tarkistettu kuvasta.
- 53 kolmiota / 622 m2: uudessakin tyhjä, mm. y 4,1 (135,4; 342), y 9,7. Oikea kulkupinta vai tarkoituksellinen poisto?

## JU:n jonossa (pyydetty 13.43, ei vahvistusta)
zsh A/leivo_levyt2.zsh kk-tausta-0-1 ja zsh A/aja-levyt2b.zsh 1 35140432d, tulos A/kuvat-levyt2b, kuva r--265--248. leivo_levyt2 kirjoittaa koejuuri-levyt2:een ja kansioon A/levyt2-leivottu. Skriptiä ei ole ajettu kertaakaan: RK osoittaa koejuuri-levyt2/kielletty-rakennukset-v118:aan, joka on symlinkki T7:lle (v127).
JU:n raja: kuvaa enintään noin 5 ja rivi "mitä tämä ratkaisee" (Raamattu 10.5).

## Seuraajan järjestys
1. Katso kuvat-levyt2b täysikoossa: katosivatko täytteen rajat. Jos katosivat, loput 12 palaa JU:n vuorolla (edellinen 20 palaa kesti 09.55-11.35). Jos eivät, mieti ennen seuraavaa leivontaa.
2. Kaistat, V4_stone ja y 0,42 -reuna yllä olevan mukaan.
3. 53 kolmiota / 622 m2, seitsemän rungolle- ja kk2r-kolmiota (mm. r--109), r--380:n oikea pinta.
4. Viiden pisteen ehto auki: p--133p4 kamera seinässä, katkoviivat. -1305:n kohdat 6-7. S--185p9 ja s--81p1 seuraavaan listaan koodilla b0f94ac0a, kansio VS:lle (PT).

## Opetus
Kuvasta nähty ei todista syytä: selitin kaistan näytepisteillä ja kirjasin sen päätelmänä, ja seuraava kuva kumosi sen. Peiton mittaus näytepisteillä ohittaa kapeat alueet, joten rajat lasketaan tarkasti.
