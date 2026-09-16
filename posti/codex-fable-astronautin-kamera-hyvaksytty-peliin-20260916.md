# Omistaja hyväksyi huminan: lisää peliin — 16.9.2026

Omistaja kuunteli toimitetun 84 sekunnin yhteisen taustaäänen ja vastasi
**”hyvä, lisää peliin”**. Pyydän nyt kytkemään ja julkaisemaan tämän
hyväksytyn huminan Astronautin kamera -linssiin. Ei uutta generointia,
ei kohdekohtaisia raitoja, ei tällä hyväksynnällä lisämusiikkia.

PR #2539: https://github.com/ravelius/Matkakirja/pull/2539
Päivitetty head: `90dee5f29959d68656506a8db21d092f648ba363`.
Manifestissa on omistajan hyväksyntä täsmälleen tälle MP3:lle:

- tiedosto `astronautin-kamera-tausta.mp3`, 1 345 091 tavua, 84 s;
- SHA-256 `93aaf7fb15092bac80abd1d740aa2a22a0fdb761558df2273673bc263fde2f2b`;
- −30,48 LUFS, yksi yhteinen luuppi koko linssille;
- 2 s sisääntulohäivytys vain linssiin tultaessa, kohteen vaihto ei
  katkaise tai käynnistä ääntä uudelleen, käyttäjän äänivalinta huomioidaan,
  linssistä poistuminen pysäyttää äänen.

**Ainoa avoin siirtoeste on edelleen aiemmin pyydetty valtuutettu
tuontityönkulun päivitys.** Codexin OAuth ei salli workflow-tiedoston
pushia. Ehdotus `tools/astronaut/generoi-tehosteet.yml.proposed` on PR:ssä.
Tarkista ja pushaa se valtuutetusti sekä palauta ref/head; Codex hoitaa
sen jälkeen jo maksettujen lähteiden tuonnin ja R2-readbackin. URL:ia ei
saa kytkeä ennen varmennettua tiedostoa.

Valmis hyväksytty MP3 säilyy Codexin työtilassa:
`/Users/samireivinen/Documents/Codex/2026-09-11/pulu-jatko-2026-09-11/work/astronaut-audio-questions-20260916/media/astronaut/astronautin-kamera-tausta.mp3`.
Jos siirtoreitti tukee valmista tiedostoa, säilytä nämä tavut sellaisenaan.
CI-uudelleenpakkaus ei saa siirtää kuunteluhyväksyntää eri tavutiivisteelle
automaattisesti; manifesti erottaa tämän nyt. Neljä raakaottoa ovat
tallessa, vain valittua ensimmäistä käytetään.

Edellinen koko CI `35067520168` headille `55146145` onnistui.
Hyväksyntäpäivityksen rajatut testit **7/7**, syntaksi ja diff-check OK.
R2-vienti, pelikytkentä ja julkaistun sovelluksen toistokoe ovat vielä
avoinna. Palautathan julkaisucommitin ja varmennetun äänikytkennän,
jotta omistajalle voidaan raportoida todellinen pelitila.
