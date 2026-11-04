# Lavastajan luovutus 4.11.2026 klo 19.15 — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen -20261104-1831 on korvattu, paitsi sen kohdat 2 (terassi-v1b) ja 3 (kaide) sekä portaat ja 弘义阁-palkki edellisen -1722 kohdasta 3, jotka ovat auki. Y = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen. Tiedot: muuri/KORJAUS.md loppu.

## 1. Kk2 rungon taustalle (PT 19.1x, sitova järjestys)
Pilkut eivät estä kk2:ta: vanha vika, sama kuvio ulkomuurin ja terassin ajoissa, paikka vaihtuu ajosta toiseen (Y/kk2/sauma/erottelu/vertailu-*.png). Rivi työlistalle: PT.
Kohde: rungon d9cde0f50 tausta (koejuuri-rungolle, v115), ei v124. PT kertoo erikseen, jos katon palat vaativat uudemman taustan.
- 1) Arkit 1–2 katsottu: ei uutta aitoa saumaa (pieninä, 9 rajattuna).
- 2) Siirto tehty: juuri koejuuri-kk2r, Y/kk2r/siirto.py, siirto.json, tarkista.py. Leivonta + vanha valo: Y/kk2r/leivo.zsh, pyydetty JU:lta (9 palaa, noin 30 min edellisellä kerralla; ajon valmistuminen: rivi "KK2R VALMIS"). EI vielä ajettu, kun tämä kirjoitettiin.
- 3) SEURAAVAKSI ajon jälkeen: sk kuten Y/kk2/sk-kk2.txt, mutta juuri koejuuri-kk2r, ja verrokki koejuuri-rungolle samoilla kameroilla (runko d9cde0f50; verrokiksi kelpaa terassi-v1b:n ajo vain, jos kamerat täsmäävät). Katso vyöt uudelleen: vaalea harmaa vyö ja ylempi tumma vyö (puuttui ek:stä, on ea:ssa ja eb:ssä).
- 4) Koko kohteen parit verrokkia vasten PT:lle, sitten KK:lle vyöstä erikseen mainiten. Syytä ei tarvitse selvittää, jos KK hyväksyy ulkoasun.
Ei paketoitu.

## 2. Taivaan katon palat (PK)
Mitta: isot vaakasuorat V4_gold-kolmiot kk-tausta-3-1-lod0:ssa: v115 10 kpl (73 m²), v124 0. Kuva v124:llä samalta kameralta: Y/palat/aja.zsh JU:lla, kuvat Y/palat/palat-*.png. Katso myös oikean reunan pala ja turkoosit kaistat (ei mitattu). Tulos PT:lle ja PK:lle. PK: kk-tausta-3-1, x 259–275, y 8,1–8,8, z −136…−125; näkyy v115:ssä ja v94:ssä.

## 3. Rivi jonossa
Muurikorjauksen 789f3046f uusi muuriosa naapuria tummempi (lokit/esikatselu-20261104-184107/ita-etela-02.png). Valo, ei estä junaa, ei aloitettu.

## LISÄYS 19.15: kaide (PK)
PK: kk3:n puuttuva kaide = Lattia-varjostimen instansointi; e73f5790f palauttaa sen, myös LOD1-kameroilla (lokit/esikatselu-20261104-190238, 8 kuvaa, pari _tyo/pelikoodari/palat/kaidepari-e73f5790f.png). Vaalea kuvioton C2 lähellä jää, syy auki. Kk3 ei kelpaa ilman 789f3046f:n varjostinta. TEE: katso 8 kuvaa täysikoossa ennen päätöstä kk3:sta. KK:n aiempi päätös: kk3 ei lähde, yksinkertainen kaide jää ja piilotus vain siellä, missä C2 piirtyy (edellinen -1831 kohta 3); tämä tulos voi muuttaa sitä, joten kysy PT:ltä, ennen kuin kk3 otetaan takaisin.

## LISÄYS 19.16: palat
Ensimmäinen ajo pysähtyi 19.14: 15d7274ad:ssa ei ole komentoa "juoksupeli palvelijat". Rivi poistettu sk-palat.txt:stä, uusi vuoro pyydetty JU:lta (JU nollautuu, pyyntö seuraajalle). Muita sk:n rivejä tällä rungolla ei ole todennettu.
