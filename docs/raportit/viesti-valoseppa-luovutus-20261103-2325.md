# Valosepän luovutus 3.11.2026 klo 23.25

Syy: kontekstiraja 26 % (Raamattu 7.37), luonteva tauko: odotan JU:n k13-ajoa.
Edellinen: viesti-valoseppa-luovutus-20261103-2301.md (KK:n palautelista LISÄYS-osiossa; pysyvät työtavat -20261101-2124.md, -2220.md voimassa).
Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B = tämä kansio). Python: `$B/tulivuoret/venv/bin/python -I`.
Esikatselu vain JU:n vuorolla (JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd). Viestit PT:lle ≤ 3 riviä. SendMessage ei löydä nimiä: käytä mcp__ccd_session_mgmt__send_message id:llä.

## Tila
- **k13 = a57c0b473** (linssiseppa2/pariisi-k12, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k12, natiivi-backup, Kartta-testit 597/597, p13). Koealueen rajat. EI pelissä eikä junassa. Sisältää:
  KS:n k5 pinnaksi, pienet pihat (Z ≤ 15 PienetAlueet, Z16–17 KapeatAlueet 3 m), kadun puoleinen kerma + muste Z15:stä (ElavaVinotalot.KadunReunat).
- **k13 JU:n L2:lla a94d8e7fb:n jälkeen**: $B/pariisi-tyyli/k13/ajo.zsh, skenaario sk-k13.txt (ui sulje mukana). Ajoa ei ollut alkanut 23.25.
- **Terävyyskuva a57c0b473 isolta iPadilta** pyydetty: käännös lav-v123:n jälkeen, iPad NUI:n sauma-a2:n jälkeen, kuva VS:lle + PT:lle.
- k12 8ee595926 ja k12b f50d074a1 ajettu: tulos $B/pariisi-tyyli/k12/TULOS.md. k12 sisältää palasauman, ei kelpaa KK:lle.

## Seuraavaksi
1. k13 valmis: tee kolmen zoomin pari kuten $B/pariisi-tyyli/k10/pari/ (puolikkaat + täysi rajaus 2029:ää vasten; 2029: _tyo/codex/pariisi-nahtavyysalue-notre-dame-20261103/tyyli-2029-kortteli.jpg), k13/TULOS.md, pari PT:lle → KK.
2. Terävyyskuva KS:lle (lupasin): KS odottaa sitä ennen k5:n säätöä (katto-voima, muste).
3. Vie NS:n aukio-poisto mukaan, kun se tulee (pyyntö lähetetty 23.23, kuittausta ei näkynyt).

## KK:n lista nyt
1. Katot: k5 pelissä, mutta 640×480-kuvissa yhä ruskehtavat. Peli B/R 0,63, k5 0,73, 2029 0,65 (2029-rajauksessa myös katuja ja puistoa). Peli k5:tä lämpimämpi, syy selvittämättä.
2. L-läiskät: Z15 täytetty. HINTA: Z16–17:n isommat pihat paperilla, koska PienetAlueet teki palasaumoja. Tumma piha näillä tasoilla ratkaisematta; katso k13 ja kysy PT:ltä, riittääkö.
3. Pystysauma: NUI (sauma-a2 iPadilla). PienetAlueet ei voi olla KK:n k10-sauman syy: se ei ole d64f74a56:ssa.
4. Julkisivureuna + muste: tehty paikallisesti. EI ikkunarytmiä (KS:n nauhat, jako KS:n kanssa). Vain Z15+.
5. Kiekot: aukio-esineet todennettu (6/6 kohtaa). Poisto NS:llä.

## Epävarmat
- k13:a ei ole nähty pelissä. KadunReunat tarkistettu vain ElavaKoe-koosteista; 10 m:n kadunhaku ja nauhan 3,5 m ovat silmämääräisiä. Reunan ulkopuolinen häivytys tarkistamatta.
- Sauma-mittaus: rivit 1024/2048 ero 26–29 → 16 (mediaani 15), JPEG-koosteesta, vain Z17:n 2×2 Z14 -koealue. Z16:ta ei mitattu.
- PT:n raja 9528c1d53:n laaja.png x≈950: lon 2,285 ≈ Z12-palan 2074 länsireuna (sijainti arvioitu maamerkeistä). k12:n x≈2635 ≈ saman palan itäreuna 2,373. Tasoparia ei todistettu (lokissa ei pyyntöjä viimeisen ajon jälkeen). k13:n kamera sama kuin k12:n, joten lon 2,285 on kuvan ulkopuolella.
- JU: k12 p-laajan suorakulmaiset tasoerot koealueen ulkopuolella, ei selvitetty.

## Muuta
- Paikallinen koe: `ELAVA_KOE=<data> ELAVA_Z=17 ELAVA_PINNAT=<wt>/Assets/StreamingAssets/ElavaKoealue sh <wt>/Kartta-testit/kaanna.sh ElavaKoe`. OPPI: ELAVA_Z=15 päivittää vain Z15:n; kopioidun datan Z17-laatat jäävät vanhoiksi, ja vertailin niitä ensin virheellisesti. Data ja koosteet $B/pariisi-tyyli/k12/paikallinen/ (kokoa.py kokoaa laatat).
- ElavaMaski.Peitto on 0/1, ei 0–255: raja `!= 0`, ei `>= 128`.
- Wt:t: proto-linssiseppa2-k12b (f50d074a1, koe, ei junaan) poistettavissa, kun NS:n aukio-poisto on tehty. Koko Pariisi 135e03994 + Z11–12-massa 43df66241 pysyvät haarassa pariisi-katot KK:n hyväksyntään asti; huom. 43df66241 sisältää myös PienetAlueet-version, jolla on Z16–17:n palasauma, ja p11-pinnan: yhdistäessä ota k13:n versiot.
- Sade (5ed5f95e2) odottaa äänen laitetarkistusta; rakettivideo tauolla.

## LISÄYS 23.26: UUSI TEHTÄVÄ
PT 23.26 (ohittaa epävarma-kohdan rajasta): raja on vielä oletus. Epäily: Z12-pala 2074 tai sen Z11-emo 1037 poikkeaa naapureistaan sävyltään tai tasoltaan. Mittaa k13-ajosta ruudun värit reunan molemmin puolin ja ota palapyynnöt lokista samalta ajolta, jotta tasopari todistuu; samasta ajosta on nähtävä pohjoiskaista. Korjaa vasta, kun syy on todistettu; tulos PT:lle yhdellä rivillä. Huom: k13:n kamerassa näkyy vain itäreuna (lon 2,373), ja lokissa ei ollut pyyntöjä viimeisen ajon jälkeen aiemmissa ajoissa. k13 alkoi JU:n L2:lla 23.26.
