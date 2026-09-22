# Vesiviivat laudan yksiköihin (omistaja 22.9.2026 klo 15.55)

Omistaja: vesiviivoitus säilyy, mutta se on saatava toimimaan tasoissa.
Päätetty työnjako: viivojen **väli, kasvu ja huojunta laudan yksiköihin**,
**paksuus ja voima paperipikseleihin**, ja **alle ~3 px:n viivavälillä joka
toinen viiva pois**. Paperin hieno rae siirtyy poltosta peliin
ruutuavaruuden kerroksena (Pelikoodari); isot laikut laudan yksiköihin.

Tämä dokumentti kattaa ensimmäisen osan: vesiviivat.

## Muutos (tools/patina.mjs)

Patinassa oli ennestään kaksi mittaluokkaa: paperin omat efektit saivat
vain faasisiirron (`faasiX/faasiY`), ikääntymisen laikku koko muunnoksen
laudalta (`maailmaX/maailmaY`). Vesiviivoitus oli kolmatta lajia, jota jako
ei tuntenut: **viivan leveys on paperin mitta, mutta viivan paikka on
maailman mitta.** Paperivakiona (`paperiS: 1`) viivasto oli joka tasolla eri
kohdassa merta.

- Uusi `vvSkaala` = pikseliä `VIITE_PX`-yksikköä kohti tällä tasolla.
  Sillä kerrotaan `aloitus`, `vali`, `kasvu` ja `huojunta`.
- Huojunnan ja roson koordinaatit luetaan `maailmaX/maailmaY`:stä, joten
  sama maailmankohta saa saman mutkan joka tasolla.
- `paksuus` ja `voima` jäävät `sp`:hen: viiva on ruudulla yhtä paksu ja
  yhtä tumma joka tasolla.
- Harvennus `VV_VAHIN_VALI_PX = 3`: askel on 1, 2, 4 … sen mukaan, paljonko
  paikallinen viivaväli alittaa kolme pikseliä, ja ehto on `k % askel === 0`.
  Koska harvennus on viivan INDEKSISTÄ eikä paikasta, karkean tason viivat
  osuvat tarkan tason viivojen päälle — ristihäivytyksessä ne vahvistavat
  toisiaan sen sijaan että sotkisivat.

Ilman `maailma`-bbox:ia (yksittäinen koekuva) kaikki palautuu vanhaan.
`npm test` 3913/0.

## Vedokset

`docs/raportit/kuvat/vesiviivat-ennen-jalkeen-z5-z8-20260922.jpg` — sama
maa-ala Lioninlahdella z5, z6, z7, z8 (vasemmalta oikealle); ylärivi vanha,
alarivi uusi. Vanhassa viivasto on joka tasolla eri kohdassa ja eri
määräisenä; uudessa sama vyö seuraa rantaa kaikilla tasoilla ja karkeilla
tasoilla viivoja on harvempi, ei tummempi.
`…-avomeri-…jpg` — sama avomerellä (Sardinian pohjoispuoli).

## MITÄ TÄMÄ EI VIELÄ KORJAA

Tasojen välinen korkeataajuinen korrelaatio EI parantunut tästä:

| | ennen | jälkeen |
| --- | --- | --- |
| matalataajuus (meren sävy) z5↔z6 | 0,961 | 0,973 |
| korkeataajuus (rae, kuitu, viivat) z5↔z6 | 0,136 | **0,125** |

Syy on odotettu ja tärkeä: **korkeataajuisesta energiasta valtaosa on
paperin raetta, ei vesiviivoja** — viivat ovat pieni osa pikseleistä.
Meren "lika" zoomatessa korjautuu siis vasta, kun hieno rae siirtyy pois
poltosta ruutuavaruuteen (omistajan valinta b, Pelikoodari) ja isot laikut
laudan yksiköihin. Tämä erä korjaa sen, minkä omistaja näkee viivoissa:
viivat ovat samassa paikassa tasosta toiseen.

Mittaus toistuu: vedokset z5 ja z6 samasta alueesta, z5-laatan 20/9
neljännes (256..512, 256..512) skaalataan 512:een ja verrataan z6-laattaan
41/19; kuvat jaetaan 9 × 9 keskiarvolla matala- ja korkeataajuiseen osaan.
