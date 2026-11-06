# Lavastajan luovutus 6.11.2026 19.3x — LUE KOKONAAN, riittää yksin

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. EI LEIVONTAA, KARTTAA EIKÄ VIENTIÄ ilman PT:n sanaa.

## Tila
Kielletyn kaupungin taustapalojen korjaus. koejuuri-levyt3 on leivottu 20/20; kuvat-levyt3c: tummat kolmiot ja r--265:n viiva poissa. koejuuri-levyt4 (katot-v125/) = levyt3 + täyte, leipomaton, kuvat A/kuvat-levyt4 (10 kuvaa, JU, L2, 19.22). Tuloksen rivi on PT:llä, vastausta ei vielä tullut.

## levyt4
- A/tee_levyt4.py (aja): täyte uuden listan vaakapinnasta siihen, missä koko maailmassa ei ole pintaa (A/peitto.py, peitto-levyt4.json/.npz). Täyte 1 847 m2 / 2 785 kolmiota / 20 palaa.
- Marmori y <= 0,1 lattiaksi; y > 0,1 omana; ilman reunaa tai sivua jää pois (A/jata_marmori.py, jatetty-marmori-levyt4.json, 424 m2 / 66 aluetta). Raja 90 % reunasta on oma tulkinta, kerrottu PT:lle.
- Viiva r-321: mitattu rako 0->7 mm (A/tliitos.py), yksi piste oikaistu palassa 3-3, rako 0 mitattuna.
- 1 143 m2 täytteestä ei kosketa tasoa 1 (todennäköisesti suljetut sisätilat, ei todistettu), 727 m2 koskee.

## Kuvat katsottu (r-321 täysikoossa, muut 1200 px:n kopioina: täysikoossa ennen hyväksyntää)
- r-321: kaista ja viiva poissa. Tumma saha (1560-1750; 620-690, 2000 px) ennallaan, syy auki.
- levyC-lansi: näyttää jalustalta. levyA-etela: levyn sijaan vaalea pienkivikaista ja ohut viiva, samaa näköä kuin r-321:n kaista, syy mittaamatta. levyA-ita: levyä ei erota. levyB-lansi: sisätila, ei ratkaise; levyB-etela ja taytto-112-229: kamera katolla/seinässä. levyC-ita ei katsottu.
- PT:n ehto: jos levy ei näytä jalustalta, kerro, älä päätä.

## Seuraavaksi
1. Lue PT:n vastaus. 2. Uudet kamerat A (x 242-257, z -100..-81), B (x -97..-82, z 424-436), (-112; 229): lisää A/sk-levyt4.txt, aja JU:lla (aja-levyt4.zsh <vapaa linja> 35140432d). 3. Mittaa A-etela-kuvan kaista: A/mittaa2.py:n profiili tai peitto.py:n "lähellä"-luokka (772 m2 laskettiin peitetyksi +-0,5 m:ltä; voi peittää oikeita reikiä). 4. Rivi PT:lle. Leivonta ja kartta vasta PT:n sanalla.

## Kävely (PK: pelikoodari/kulkukartta/levyt3-kavely.txt)
Peli lukee lattian kartasta: vienti vaatii kartan uuden ajon. Uudella kartalla 97 % seuraa verkkoa, kulku ei katkea. 6 ovea täyttävät ehdon kartalla (A/ovet-mittaus.py; ei pelissä). Levyt A, B, C: uudessa listassa marmori y 0,5-0,9 lattian 0,0 päällä, ei jäänteitä; este syntyi, kun ympäristö laski. Levyihin ei kosketa (PT).

## Opetukset
- Rakenna koejuuri uudelleen vasta, kun JU:n ajo on ohi. Peitto: laske vesi pois ja koko maailma mukaan.
- numpy ja scipy: /opt/homebrew/bin/python3 ilman -I:tä; shapelyä ei ole.
