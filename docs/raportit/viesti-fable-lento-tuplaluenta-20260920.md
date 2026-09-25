# Opus → Fable: lennon tuplaluenta ei toistu — mittausraportti

20.9.2026 klo 17.30. Haara `opus-local-lento-tuplasaapuminen` (pohja
origin/v1973-prep, joka sisältää koko v1977:n). **Ei tuotemuutosta** —
tämä erä on pelkkä mittaus ja sen tulos.

Omistajan havainto 14.45: lennon Berliini → Rooma jälkeen kuului kahden
kaupungin luentaäänet, ja kartta teki lentoanimaation perään toisen
liikkeen.

## Tulos: ei toistu, kahdella eri tavalla ajettuna

| ajo | lennon jälkeen soivat luennat |
|---|---|
| kehittäjäsiirrot + lento ohjelmallisesti | vain `puhe-fokus-matkakirja-rooma.mp3` |
| **pelaajan omat napit** (Liiku → Lentäen → "Rooma (300 p)") | vain `puhe-fokus-matkakirja-rooma.mp3` |

Ketju oli molemmissa omistajan oma: Bryssel → Amsterdam → Berliini →
lento Roomaan samassa istunnossa. Rooman luenta eteni 4,9 → 9,9 →
14,9 / 20,8 sekuntia, eikä Berliinin tai Amsterdamin luentaa kuulunut
missään vaiheessa. Sama tulos puhtaalla pohjalla ja korjausehdokkaan
kanssa, eli tulos ei riipu kokeilemistani muutoksista.

## VÄÄRÄ VÄLIRAPORTTI JA SEN SYY

Raportoin välillä virheellisesti, että vika toistui. Se oli **mittarini
virhe**, ja kirjaan sen tähän, ettei kukaan toista sitä.

Mittari laski `play()`-kutsuja ja poisti äänen listalta vasta
`pause`- tai `ended`-tapahtumassa. Kun äänitiedosto ei lataudu, elementti
ei lähetä kumpaakaan — joten epäonnistuneet lataukset näkyivät listalla
**ikuisesti soivina**. Tarkistus paljasti sen:

```
puhe-fokus-matkakirja-berliini.mp3   t=0.0   duration=?   ← ei latautunut
livia-rooma-3.mp3                    t=3.4 → 8.4 → 13.4 / 17.6  ← soi aidosti
```

Syy oli ajossani: matkakirjaluentojen mp3:t tulevat ämpäristä, enkä
välittänyt niitä Noden kautta (CORS), joten ne 404:ivät hiljaa. Kun
välitys lisättiin (sama `ulkohaku`-kuvio kuin
`tools/savukkeet/savuke-astro-valokuva.mjs`), oire katosi kokonaan.

**Sääntö jatkoon: ääntä mitataan `currentTime`in etenemisellä, ei
`play()`-kutsuilla, ja ämpärin tiedostot välitetään Noden kautta.**

## Mitä kulusta silti opittiin

Koodissa on aito kulku, joka ANSAITSEE silmäparin vaikkei se näy
tuotteessa: luenta lisätään `ui.luennat`-tauluun (js/luenta.js
`playDiaryVoice`), vapautetaan noin 116 ms myöhemmin `error`-tapahtumalla
ennen kuin se on alkanut, ja `viive`-ajastin käynnistää sen silti. Jos
lataus onnistuu vasta tuon jälkeen, syntyy luenta, joka ei ole
`ui.luennat`-taulussa — eikä mikään vaiennustie (`vaiennaPaikanPuhe`,
`haivytaLuenta`, `stopDiaryVoice`) tavoita sitä, koska ne kaikki käyvät
läpi juuri tuon taulun. En vienyt korjausta repoon, koska en saanut
näyttöä siitä, että tilanne syntyy oikeassa käytössä.

## Mitä jäi tekemättä

- **Vika jää iPad-Safari-epäilyksi.** Chromium ei toista sitä. Sonnet 1
  laitteella on seuraava askel.
- En kokeillut hitaassa verkossa: juuri latausviive on se, joka voisi
  laukaista yllä kuvatun kulun oikeasti.
- Kartan "toinen liike" lentoanimaation jälkeen jäi mittaamatta; keskityin
  ääneen.
