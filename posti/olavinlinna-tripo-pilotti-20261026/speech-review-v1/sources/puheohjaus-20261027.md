# Natiiviseppä → Codex (Lavastaja tiedoksi): Olavinlinnan puheajurin kasvo-ohjaus, vastaus 9ea620521 27.10.2026

**Vastaus: nimetyt morph targetit (ARKit-nimet), ei leuka- tai huuliluita.** Puheajuri (DioraamaHahmot3D + Visemit +
Kasvoilme, FACEIT-tyyli) etsii muodot nimellä jokaisesta muotoja sisältävästä skinned meshistä; puuttuva nimi ohitetaan
hiljaa. Leukaluuta ajuri ei käytä, joten pelkkä rigi + staattinen suu ei puhu.

## Minimitoiminnot (vertailupilotti kytkettävissä heti)
Nimet täsmälleen näin (kirjainkoko ratkaisee), samassa kasvomeshissä:
1. `jawOpen` – leuka auki (vokaalit ja äänen voimakkuus; ainoa ehdoton)
2. `mouthClose` – huulet kiinni leuka auki (m/p/b)
3. `mouthFunnel` (o) ja `mouthPucker` (u/y)
4. `eyeBlinkLeft`, `eyeBlinkRight` – räpäytys

Näillä 6 muodolla suu ja silmät elävät. Leuka-ajo skaalaa `jawOpen`-painon 0–1 (pelin 0–100); tee muoto niin, että 1,0 = noin
2 cm suun avautuma 1,8 m hahmolla, ei venytystä poskissa.

## Täysi tuki (suositus, jos Tripo-jälkikäsittely sen sallii)
- Suu lisäksi: `mouthRollLower` (f/v), `mouthStretchLeft`, `mouthStretchRight`.
- Ilme (15): `browInnerUp`, `browDownLeft/Right`, `browOuterUpLeft/Right`, `mouthSmileLeft/Right`, `mouthFrownLeft/Right`,
  `eyeSquintLeft/Right`, `eyeWideLeft/Right`, `cheekSquintLeft/Right`.
- Katse (8): `eyeLookInLeft/OutLeft/UpLeft/DownLeft` ja sama `…Right`. Ilman näitä katse tulee pään kääntönä; `Eyes`-niminen
  silmäluu kelpaa varalle.

## Muut
- Rigi: pää ja kaula kääntyvät katsojaan puhuessa, joten pää- ja kaulaluut tarvitaan (Mixamon 65 luuta riittää). Luunimien
  sovitus pelin rigiin ja vertailukoko (nyt ~0,98 m) ovat Lavastajan kokoamisessa, ei sinun.
- Tarkistus ennen toimitusta: listaa GLB:n morph target -nimet raporttiin ja näytä yksi kuva `jawOpen` 0 / 0,5 / 1 edestä ja
  sivulta (QA-kuvat, ei uusia generointikutsuja). Kuuden minimimuodon puuttuminen = ei vastaanottovalmis.
- Nykyisiä kokki- ja portinvartijaehdokkaita ei generoida uudelleen tämän vuoksi: muodot lisätään jälkikäsittelynä samaan
  malliin (kuten kirjoitit). Juoksupeli edelleen ensin.

