# Taihedianin halli: osat Codexin yhteistilaukseen (Natiivi-UI 29.10.2026, juna 215)

KORJAUS 21.2x: kohtia 4, 6 ja 7 EI tilata, koska ne ovat jo Codexin juoksupinnat-v1:ssä (1069 päättötiilirivi, 1067 palkkimaalaus + 1068 kannatinrivi, 1070 ristikko-pariovi) ja VS upottaa niitä (hallit_pinnat.py). Tilattavat: 1, 2, 3 (vain jos VS:llä ei ole kullankeltaista katetta), 5 ja 8.

Lähde: KK:n erolista aukio 03/03b kohdat 1, 2 ja 5 (/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/erolista-aukio-03-03b-20261029.md).
Havainnekuva: /Users/Shared/Claude/proto-3d/lokit/havainne-editori-20261029-203346/03/havainne.png (1448 × 1086; sama kuva 03b:ssä).
Rajaukset alla ovat havainnekuvan pikseleitä (x0, y0, x1, y1). Suurennetut rajauskuvat samassa kansiossa (n-*.png, 6×).
Mitat ja paikat pysyvät mallin todellisina (omistaja 20.10. klo 07.30); Codex tekee vain pinnat ja koristeet. Pinnat 2D-maalauksena
(omistaja 27.10. klo 21.51), tasainen valo ilman maalattuja varjoja (27.10. klo 10.56).

## Ainutlaatuiset koristeet (3D, Codex/Tripo)
1. CHIWEN, Taihedianin pääharjan päätekoriste (1-chiwen.png, rajaus 582,46,618,82): kullankeltainen lasitiili, lohikäärmekala avoin
   suu harjaa kohti, pyrstö kiertyy ylös ja ulospäin, miekan kahva selässä. Korkeus todellisuudessa noin 3,4 m (Taihedian). Jos
   nykyinen #928 käy, vain pinta ja mittasuhde havainnekuvan mukaan.
2. HARJAELÄINRIVI, Taihedianin kulmaharjat (2-harjaelaimet-yla.png 512,104,550,128 ja 3-harjaelaimet-ala.png 484,146,524,168):
   Taihedianin täysi rivi 10 eläintä + feeniksillä ratsastava kuolematon kärjessä ja pääty-chiwen (chuishou) takana, kullankeltainen
   lasitiili. Kahdeksan kulmaa (yläkatto 4, alakatto 4). Nykyinen #929 on 5–7 eläimen rivi: tarvitaan 10 + 1.

## Pinnat (2D, Codex; yksi jaettu materiaali per pintalaji, osasarjan kohta 3)
3. KULLANKELTAINEN LASITIILIKATE (4-lasitiilikate.png 590,78,740,128): kouru- ja kupera tiili vuorotellen, kupera rivi selvästi
   erottuva kohoumana, väri kullankeltainen (ei oranssi), kevyt lasitteen kiilto ilman maalattua valoa. Toistuva laatta.
4. RÄYSTÄÄN PÄÄTYTIILET (5-raystas-paatytiilet.png 560,118,740,134): pyöreät lohikäärmekuvioiset päätytiilet (wadang) ja kolmiomaiset
   tippatiilet (dishui) vuorotellen räystäslinjalla, kullankeltainen. Toistuva nauha.
5. PÄÄHARJAN PINTA: keltainen lasitiiliharja kohokuviolla (näkyy 1-chiwen.png:n alaosassa), toistuva nauha.
6. PALKKIMAALAUS HEXI CAIHUA (6-palkkimaalaus-ala.png 518,170,948,196 ja 7-palkkimaalaus-yla.png 540,128,740,150): sinivihreä pohja,
   kultaiset lohikäärmeet ja kultaiset ääriviivat, pylväsvälin mittainen kuvio, keskellä pitkä kenttä ja päissä W-muotoiset
   rajat (hexi). Kaksi palkkia päällekkäin (iso ja pieni otsapalkki) + kannatinvyön (dougong) sinivihreä-kultainen nauha niiden yllä.
7. PUNAINEN RISTIKKO-OVI (8-ristikko-ovi.png 558,196,596,232): neljän lehden ovisarja yhteen pylväsväliin, yläosa kultaisin
   ääriviivoin rajattu ristikkokenttä (sanjiao liuhua, kolmioristikko), alaosa umpipaneeli kultaisin kulmahelmin, punainen lakka.
   Läpinäkyvyyttä ei tarvita (2D-pinta). Toistuu jokaisessa pylväsvälissä.
8. KESKIOVI (9-keskiovi-kulta.png 714,196,750,234): sama ovisarja kultaisin koristein (keskijänne), kullattu ristikko ja alapaneelit.

## Ei tilata (osasarjasta tai olemassa)
- Terassin marmorikaiteen pylväs ja johde, kivijalka, reunakivi: Lavastajan osasarja (PT 29.10. 21.1x).
- Punainen seinä ja pylväät: VS:n rappaus (V4_red) sellaisenaan.
