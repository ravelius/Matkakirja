# Lavastajan luovutus 4.11.2026 — LUE TÄMÄ, ÄLÄ VANHOJA

Korvaa -1915:n kohdat 1 ja 2. Yhä auki -1915:stä: kohta 3 (uusi muuriosa tummempi) ja kaide, sekä -1831:n terassi-v1b ja -1722:n portaat ja 弘义阁-palkki. Y = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen. Mittaukset: muuri/KORJAUS.md loppu. Ei vientejä.

## 1. Kk2r: EI KELPAA nyt, tumma aukio (uusi, syy auki)
Pari ajettu d9cde0f50:llä: Y/kk2r/kuvat/kk2r ja /verrokki (23 kuvaa; lokit/esikatselu-20261104-194147 ja -195149). Katsottu vain neljä paria pienennettynä: tk-terassi, tk-arkki-m15yla, tk-kaide-lahi, tk-arkki-m15ala: kk2r:ssä aukiolla iso tumma alue portaisin reunoin, verrokissa ei. Loput 19 katsomatta, vyöt katsomatta. Huom: tk-terassi näyttää d9cde0f50:llä eri paikan kuin aiempi kk2-kuva (Y/kk2/kuvat, 15d7274ad), joten vanhat kk2-kuvat eivät ole vertailukelpoisia. Numeroero parittain: tk-terassi 89,5, m15yla 58, kaide-lahi 56, lod1 57, kaide-kauko 15,7, muut alle 9.
Havaittu: Y/kk2r/leivottu/kk-tausta-aukio-1-1-lod0-valo-rgbm.png: atlaksessa tumma portainen möhkäle. Aukio-1-1 ei kuulu rako_valon 7 palaan, joten sillä on uusi valo koko alalta. Syy EI tiedossa; yhteyttä kuvan aukioon ei todistettu. Säteet aurinkoon (scratchpad, 40 pistettä) eivät nimenneet varjostajaa; testi ei kattanut rakennuksia eikä avoimia, ja tumman maskin pisteet olivat kohinaisia. Kk2:n leivonnasta (leivo-tausta.zsh, juuri koejuuri-yleinen) tarkistettu vain: avoimet-v56, tausta v124; kk2r: avoimet-v52, rakennukset-v126, muurikate-v38, tausta v115. Selvitä seuraavaksi: mikä ero tummentaa. Ei KK:lle ennen kuin tämä on ratkaistu; PT:lle kerrottu.

## 2. Palat
Syy: viedyssä v124:ssä palat ovat; koejuurien "v124" oli ajettu katot-v125/kansi_pois.py:llä. Kohdemuutos on kansi_pois.py yksin. Juuri koejuuri-rungolle-kansi (Y/palat/kansi). Pari d9cde0f50:llä katsottu: isot palat poissa (lokit -193814 kansi, -194014 verrokki).
AUKI: vasemman hallin friisi kansi-kuvassa rikki, verrokissa ehjä; v115-kuvassa -185852 myös ilman friisiä. Kansi muuttaa kk-tausta-3-1:ssä vain V4_gold-määrää (4598 → 2587), joten ei selity poistetulla geometrialla, mutta EI todistettu. JU:lta tilattu toisto aja.zsh (viesti jonossa): katso, vaihtuuko friisi ajosta toiseen. Kansi kk2r:ään vasta tämän ja kohdan 1 jälkeen (PT).

## 3. PT:n tilaus: kultakolmio ja turkoosit irtopinnat pois, omana muutoksenaan kansi-parin jälkeen
Tekemättä. Kolmio ja esimerkkipinnat: KORJAUS.md. Ensin kuvasta varmistus, ettei V4_teal-poisto vie oikeita räystäskoristeita; epäselvät jätetään ja kerrotaan PT:lle. Kk2r:ään vasta kuvien jälkeen. tunnista.py nimeää kuvan pikselin kolmion (testikamera: 262 0 -161 -2.03 3 6 0 60 170).

Rivi työlistalle ja junaan: PT.

Friisi, toisto (lokit -201007 kansi, -201220 verrokki; ensimmäinen -193814, -194014): molemmissa friisi yhtä lailla punaisen peitossa. Sama verrokkijuuri: friisi ehjä 19.41, peitossa 20.13. Friisi vaihtuu ajosta toiseen, ei tule kansi_pois.py:stä. Vaihtelun syy auki. Kaksi kierrosta, vain vasemman hallin rajaus katsottu.
