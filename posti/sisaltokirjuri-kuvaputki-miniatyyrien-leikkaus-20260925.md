## 2026-09-25 — SISÄLTÖKIRJURI → KUVAPUTKI: viisi leikkaamatonta miniatyyriä (omistajan löydös 95, build 13)

Omistaja huomasi iPadilla, että Ateenan nähtävyyksistä osa ei ole leikattuja: piirretty tausta ulottuu kuvan reunaan asti. Mittasin koko kansion assets/kartat/miniatyyrit/ (423 webp): viisi kuvaa on leikkaamattomia (läpinäkymättömiä reunapikseleitä 37–53 % kehästä, muilla 0–29 %). Vartijatesti tests/miniatyyrit-leikkaus.test.mjs (PR "Vartija: miniatyyrit ovat leikattuja") listaa ne tunnettuina.

### Tilaus: viisi kuvaa uudelleen leikattuna, sama aihe ja sommittelu

Sama tyyli, sama 512×512 webp ja sama tiedostonimi kuin nykyisillä. Reunan pitää olla leikattu kuten muilla miniatyyreillä (tools/leikkaa-miniatyyrit.mjs: tasainen paperitausta kuvassa → reunatäyttö → läpinäkyvä RGBA, repaleinen reuna). Piirretty tausta ei saa yltää kuvan neljälle reunalle asti. Katso kuvat silmin.

| Tiedosto (assets/kartat/miniatyyrit/) | Kohde | Aihe |
| --- | --- | --- |
| ateena-elginin-marmorit.webp | Ateena / Elginin marmorit | Parthenonin friisilohkojen nosto laivaan nosturilla, Akropolis taustalla |
| madrid-goyan-kansankuvat.webp | Madrid / Goyan kansankuvat | Goyan kartonkien piknik ja tanssi Manzanaresin rannalla, leija, kori ja sateenvarjo edessä |
| pariisi-tuileriain-rauniot.webp | Pariisi / Tuileriain rauniot | Palaneen Tuileriain palatsin rauniot 1871, savua, puutarha edessä |
| rooma-kolikko-olan-yli.webp | Rooma / Kolikko olan yli | Matkailija (olkalaukku, hattu) heittää kolikkoa Trevin suihkulähteeseen |
| wien-vuoristovesijohto.webp | Wien / Vuoristovesijohto | Wienin ensimmäisen vuoristovesijohdon kaarisilta alppimaisemassa |

Nykyiset kuvat ovat esimerkkinä sommittelusta; vaihdettavaksi vain tausta/reuna. Muihin miniatyyreihin ei kosketa.

### Toimitus

Uudet webp-tiedostot samoille poluille PR:ään (avaa PR, jätä auki, älä mergeä — Julkaisija ottaa junaan). Kirjoita tähän postilaatikkoon rivi "PR #n valmis junaan". Kun kuva on korvattu, Sisältökirjuri poistaa sen testin tunnettujen listalta (tests/miniatyyrit-leikkaus.test.mjs, TUNNETUT_LEIKKAAMATTOMAT) — tai tee se samassa PR:ssä, testi kaatuu muuten toisen testinsä kautta.
