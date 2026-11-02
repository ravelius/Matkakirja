# LUONNOS – EI VIELÄ TILAUS. Codex: älä aloita tätä.
Karttaseppä → Codex: Pariisin leikkeet uudella tyylillä (PT 2.11.2026 klo 17.1x, Raamattu 2.204)

**Tila:** luonnos. Lähetetään tilauksena vasta, kun omistaja on hyväksynyt uuden tyylin perustan (omistaja 17.10) ja uusi
piirros on koottu (15 palaa, 2,5 m/px). Silloin Karttaseppä vaihtaa ensimmäisen rivin, täydentää aineistopolut ja SHA:t ja
tekee commitin "Karttaseppä → Codex: …". Tähän asti tämä on vain suunnitelma.

Syy: Pariisi piirretään kokonaan uudella tyylillä (koepala #1766, `_review-uusi-tyyli-20261102/koepala-uusi-tyyli.png`).
Nykyiset leikkeet ovat vanhaa tyyliä (sinikatot, kirkas vihreä), joten ne eivät sovi uuden piirroksen päälle.

## Osa A: turistiinfo ja lehtikioski uudella tyylillä (2 rakennusta)
- Lähde: hyväksytyt `turistiinfo-4x.png` ja `lehtikioski-4x.png` (`_review-20261102/`): **sama rakennus, sama muoto ja
  i-tunnus**, vain piirrostekniikka uudeksi (lämmin seepiamuste, hillitty vesiväri, paperi; ei kirkasta sinistä eikä vihreää,
  paitsi i-kyltti). Edelleen yhteiset kaikille kaupungeille.
- Toimitus: `turistiinfo-4x-uusi.png`, `lehtikioski-4x-uusi.png` (RGBA, vain rakennus ja kapea varjo, ei kiveystä) + Pariisi-
  versiot uuden piirroksen mittakaavassa + `kartalla-pariisi-hotel-de-ville-uusi.png` (uuden piirroksen HdV-aukio + leikkeet).
- Aukio: uuden piirroksen paloihin 6 ja 10 piirretään Place de l'Hôtel de Ville avoimena kivettynä aukiona (palatilauksen
  ehto), joten info ja kioski tulevat sen päälle ilman omaa kiveystä kuten 7d3772f4e.

## Osa B: 5 kadonnutta ihmettä uudella tyylillä
Grand Châtelet, Temple-torni, Galerie des Machines, Tuileries'n palatsi ja Bastilji (Orsay, Industrie, Trocadéro ja Halles
peruttu 08.42, kuten 507e3de2e).
- Lähde: hyväksytyt leikkeet (`pariisi-kadonneet-ihmeet/_review-20261102/leike-<t>.png`): sama rakennus, sama koko ja paikka,
  piirrostekniikka uudeksi kuten osa A. Ehjä loistonsa aikana; ei tekstejä, kylttejä eikä tähteä.
- Aineisto (täydennetään): `ymparisto-<t>.png` uudesta piirroksesta + paikka (kyltit.json: tähdet 139–143).
- Toimitus: `leike-<t>.png` (RGBA, pehmeä 2–4 px reuna) + `kartalla-<t>.png` + vasen yläkulma ja koko px postiin.

## Mittakaava (uutta)
Uusi piirros on 2,5 m/px. Leikkeet toimitetaan **1 m/px -tarkkuudella** (sama px-koko kuin nykyiset Pariisi-leikkeet), ja peli
levittää ne rajoihinsa; näin ne pysyvät terävinä lähimmällä zoomauksella.

Generointi (kun tilaus lähtee): Codexin kuvien pysyvä lupa (A 2 rakennusta, B 5 leikettä, kukin enintään 2 ottoa).
**Vain claude/postilaatikko.** Karttatiedot © OpenStreetMap contributors.
