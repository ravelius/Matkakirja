# Lavastajan luovutus 5.11.2026 2105 — LUE TÄMÄ, sitten muuri/KORJAUS.md loppu

Korvaa -2100:n, jossa on kaksi väärää väitettä (alla). Ei vientejä, ei ajoa käynnissä. L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen/lattiakoe. Mac-ajot JU:n vuorolla (runko 980bb115c). Älä ota nimeä koejuuri-lattia24: vanha arkistolinkki T7:lle.

## PT:n käsky 21.0x (sitova)
Lupa 24c:hen ja YHTEEN ajoon: itä z 662, z 630, askel; enintään 5 kuvaa, ei vientiä. Ajo vasta, kun koko vyöhykkeen automaattinen tarkistus on puhdas (aukot, karkea tarkan päällä, korkeusaskeleet raja-arvoin, ilma jalkojen alla); tulos liitetään kuvien tulokseen. Tarkistus ajetaan myös lattia23:lle ja 24b:lle. Jos ajon jälkeen jää näkyvä vika: ei viidettä paikkausta omalla päätöksellä, rivi PT:lle.
Kuittausraja: sauma näkyy peittämättä molemmin puolin, z 550:n askel enintään 4 cm, z 630:ssä ei sahaviivaa, katkoja eikä karkeaa tarkan päällä.

## Tila: 24c rakennettu, tarkistus EI puhdas, ei ajettu
Tulokset: L/tark24-tulos-24c.txt ja L/tark24-tulos.txt (21, 23, 24b; 24c-osa siinä on rikkinäisestä rakennuksesta, älä käytä). Koodi L/tark24.py (raja: askel >2 cm ruudussa 0,1 m, jyrkin luonnollinen rinne 1,75 cm; ilma >12 cm), L/tee24c.py.
Tarkistus löytää viat: z 630:n vika-alue länsi 23: 1848 → 24b/24c: 0. Repeämä itä x 475 suurin: 23 ja 24b 0,627 → 24c 0,244.

Jäljellä 24c:ssä (askel >2 cm, suurin):
- Itä: SISUS 37 (0,023), RAJA x 475 88 (0,244), RAJA x 500 245 (0,060), z 675–705 149 (0,045; sama kuin 21). Ilma: vain lattia21:n vanhat.
- Länsi: SISUS 345 (0,163), RAJA z 675 77 (0,163), RAJA z -500 48 (0,048), RAJA x 500 905 (0,045). Karkea päällä vain x>500 (ei vyöhyke). Ilma: vain vanhat.
Aukot x<475 (5702, 13052) ja x 475:n raja (8, 141) samat kuin lattia21:ssä: taustan puolta, ei uutta; selvitä lyhyesti, onko niissä oikea aukko vai muu pinta.

## Seuraava
1. Selvitä paikat: länsi SISUS 345 ja z 675/-500 (näyttää jääneen tarkkaa, jota sääntö ei poista: kolmio z-rajan yli tai ei-ruudukkokarkea) ja itä x 475 0,244 (uuden pisteen (475; 679) lähellä tai muualla). Tulosta >2 cm -solujen rypäät.
2. x ±500:n raja ja x>500 eivät voi mennä nollaan ilman että tarkat palat käsitellään vyöhykkeen ulkopuolella (koko renkaalla 532 667 m², mediaani 4 cm). Sama koskee z 675–705:tä. Ehdotettu raja PT:lle: ei huonompi kuin lattia21; PT ei ole vielä hyväksynyt tätä. Kysy riviä, jos tarkistus jää tähän.
3. Kun puhdas: aja kopiosta L/aja24b.zsh + L/sk24b-koe.txt, poista juuren vaihto ja vertailu, 3 kuvaa (itä z 662, länsi z 630, askel z 556), juuri koejuuri-lattia24c, kansio kuvat24c-koe. Pyyntö JU:lle (local_b4a7e82a-2522-437f-84ff-813401120931; tarkista osoitekirjasta).

## Korjatut väärät väitteet
- "Viat tulivat lattia23:sta" (-2100, PT:lle 20.59): PERUTTU, PT:lle kerrottu 21.01. vertailu21-kuva on sama verkko kuin 24b (L/vertailu24b.py); juuren vaihto ajon aikana EI lataa verkkoa uudelleen, loki näyttää vain asetuksen. Lattia21:n ulkonäköä z 630:ssa ei tiedetä; vertailu vaatii oman ajon.
- "Repeämä on 24b:n poistosäännön virhe" (-2100, PT:lle 20.59): VÄÄRIN, PT:lle kerrottava (rivi lähti tämän luovutuksen mukana). Syy on tee23: piste (475; 675) y 0,63 → 0 kallisti z 675–700:n karkeat irti taustasta. Repeämä on jo lattia23:ssa (0,627), kuvaa ei otettu.

## Muuta
- Lattia24c: pohja lattia23; 300 tarkkaa pois (vain kokonaan z -500…675:n sisällä, alla ruudukkokarkea), uusi piste (475; 679; 0,64) karkeaan, jalat 34 pistettä alas lattia21:n ilmaan (suurin 0,169).
- Kamera-arvio kuvasta maailmaan: L/viiva24b.py. Python: /opt/homebrew/bin/python3 ilman -I.
- ND odottaa juoksupelin pintojen ja räystäiden jälkeen (PT 20.11).

## Jonossa, ei aloitettu (KORJAUS.md; LAV ei ole tarkistanut)
PK: konsoli, räystään alapinta, marmoriterassin nollatekselit; muurien ja porttien kiertosuunta + V4_gold-räystäs (KK: yksi yleinen korjaus generaattoriin, ei omaa ajoa, ei junaan); lähikoristeiden mitat h-zhongyoumen ja h-zhongzuomen; valkoinen viiva (13; -407) ja pystysauma; (-87,5; 302,5). S-rengas-itän harmaa vino levy. Vaakalevyt ilmassa x -420, pysty harmaa levy ja sälö x -60, puita ilman tyveä x 136 ja x 300.

## Lisäys 21.06: PT:n käsky (sitova)
Ei omaa lattia21-vertailuajoa. 24c:n kuvat lasketaan vain, jos todistetaan lokista tai verkon tunnisteesta, että ne ovat 24c:n verkosta. Selvitä koodista, miksi juuren vaihto ei ladannut verkkoa (ei vielä katsottu; unity.logissa toinen `palatsi mallit` + `v4 7` eivät tuota uutta "ulkorengas 24 palaa" -riviä).
Todiste 24b:lle kuvat24b-koe/unity.log: rivi 2587 juuri 24b, rivi 3674 ainoa renkaan lataus ("ladattu 588 glb:tä"), rivi 4948 kuva z 630; lisäksi ero lattia23:n kuvaan 24 % lattian pikseleistä. Se on päättely lokin järjestyksestä, ei verkon tunniste. Ajoon 24c: yksi juuri per ajo, ja sama lokiketju tuloksessa; tunniste (tiedoston sha tai lokiin verkon kolmiomäärä) olisi vahvempi, jos koodi antaa sen ilman muutosta.
Lattia21 mallista (tark24-tulos.txt): z 630:n vika-alue länsi 1848 kohtaa, sama luku kuin lattia23:ssa; karkea tarkan päällä vyöhykkeellä 21: 0, 23: 1337. Eli tark24:n askelluku ei erota 21:tä ja 23:a tällä alueella. Lattia21:n ulkonäkö z 630:ssa on yhä kuvaamatta.
