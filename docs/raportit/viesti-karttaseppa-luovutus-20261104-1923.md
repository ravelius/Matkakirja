# Karttaseppä: luovutus 4.11.2026 klo 19.23 (KS)
Syy: konteksti 25 % (7.37). Korvaa aiemmat 4.11. luovutukset, paitsi luvut 2–5 ja Opit luovutuksesta -1834 (haara karttaseppa/luovutus-20261104-1834), jotka pätevät yhä: lue ne. Python: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. A = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104. Worktree /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nd-puut-219, varmuuskopio natiivi-backup.

## Omistaja ja KK
- **Omistaja 19.01:** kirkko 92c47e215 näytti hyvältä, **tornien kallistumaa EI korjata.** Vene taivaalla ja puupari jatkuvat. Harmaa laikku on VS:llä.
- **Omistaja 19.03 (PT):** Louvre ja Sainte-Chapelle samalla valolla kuin kirkko ja mallin omilla väreillä; muut 3D-merkit pysyvät ruskeina (oma kortti myöhemmin). Koskee osia A–C.
- **KK 19.1x:** pari 834376445 hyväksytty kokeeseen omistajan valtuutuksella: väri ja hajautus kelpaavat, sisäpihat sallitaan tässä. Seuraavaksi nd20d ja iPad-ajo puilla ja mitatulla korkeudella. **Kuvat ensin KK:lle.**

## ENSIN: odottaa JU:ta, 8be6819db
Pyydetty JU:lta 19.22: Mac lokit/julkaisija-nd-puut-8be6819db (sk-nd-puut.txt) ja sitten iPad lokit/julkaisija-nd-ipad-8be6819db (sk-nd-ipad.txt). Kumpaakaan ei ole vielä ajettu. JU sanoi aiemmin, että iPad tulee muistiparin jälkeen. Tarkista, ettei se aja vanhaa sha:ta 81ce72a05.
Kun kuvat tulevat, katso:
1. **s-270: vene ja vana.** Rajaus x 1450–2050, y 120–640 (Macin 2752×2064). Veneen pitää hävitä usvaan samassa kohdassa kuin kartan. Vertaa lokit/julkaisija-nd-puut-81ce72a05/s-270-puut.png.
2. **Muut animaatiot:** linnut (k-0012, s-180) ja pallo eivät saa hävitä lähellä. Sama _Usva on niilläkin, koska ne ovat litteitä kuvia maan tasossa.
3. **Kukkiva puu k-0012:ssa** (nd20d): Macilla 81ce72a05 selvästi vaimeampi, mutta hieman harmaa. Arvio yhdestä rajauksesta, KK:lle kerrottu.
4. **k-013:n kova raja (KK:n pyyntö):** Macilla 56 % korkeudesta 834376445:ssä ja 67d4783c7:ssä; iPad 92c47e215:ssä ei rajaa. Oletus, ei todistettu: Mac ajaa Screen 640×480, ja Cesium valitsee laatat kameran pikselikorkeudesta (LiikeLaatatPaatos.cs:n kommentti). 92c47e215 → 834376445 ei muuta laattakoodia. **iPad-ajon k-013 ratkaisee:** ei rajaa = Macin vika; raja = rungon vika, selvitä. Kerro tulos KK:lle kuvien mukana. Pientä mittausta: A:n ulkopuolella scratchpad-skripti, rivien keskiarvojen hyppy; helppo kirjoittaa uudelleen.
5. **Mittakaava:** aja A/nd21-liitos/mittakaavat.py iPadin y-0012:sta (polku L vaihdettava). Odotus noin 0,99.

## Veneen vika
Kartan veneet piirtää PiirrosKerros.Animaatiot.cs PiirraKuvaM, varjostin Matkakirja/PiirrosKerros (ZTest Always, ei sumua). 81ce72a05 korjasi ElavaKohde/ElavaVana/Savu-varjostimet, jotka eivät piirrä kartan veneitä; Mac-ajossa vene oli ennallaan. Kumottu bf2bd34b8. **8be6819db:** _Usva-ominaisuus, UsvaNakyvyys kärjen ruudun korkeudesta, oletus 0 (laatat ja tähdet ennallaan); päällä UusiAnimaatioPalassa ja parvien p.mat:ssa. Koe, ei junaan. Omistajan kuvaan vietävä korjaus pitää myöhemmin poimia omana muutoksenaan.

## Haarassa
eb0d74ad1 nd20d (aa2672f4b, SHA256 OK, muoto ennallaan, kukat 253/226/170 → 204/183/148); 5128f0354 mitattu korkeus 90 m ja syvyyssiirto 60 m; 834376445 puiden sävy ja 16 puuta. 92c47e215 on haaran esi-isä.
81ce72a05-kuvat: 18/18, kaikki parit laskettu, poikkeus lokissa on Unityn Search-indeksi, ei meidän.

## Jono tämän jälkeen (PT 18.3x)
Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-lisaa-nahtavyyksia.md, osat A, B, C tässä järjestyksessä: A NotreDameKoe yleiseksi (muisti ja lataus kohteittain), B Louvre, C Sainte-Chapelle (pohja jatkuu ND:n palasta). Kuvat ennen Tripoa KK:lle. Ei junaan. iPad (D) JU:lta. Eiffel oma kortti. Kaksi epäonnistunutta ottoa → omistajalle ennen kolmatta.

## Vahti
Monitor kuolee nollauksessa: käynnistä uudelleen: fetch origin claude/postilaatikko 60 s välein (/Users/Shared/Claude/wt/karttaseppa-postilaatikko), käsitelty aa2672f4b asti, sekä Macin loki.txt ja iPad-kansio.

## Opit
- Varmista, mikä piirtää kohteen, ennen korjausta: lokin Ruutusyy-rivit (PiirrosKerros.VenePiirto) kertoivat piirtäjän, tiedostojen nimet eivät.
- Pari ennen ja jälkeen samasta rajauksesta paljastaa heti, ettei korjaus vaikuttanut.
