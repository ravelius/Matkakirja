# TF 1.0.27b -juna juna/b13 52ea3d10 (käännös d7705537), 27.9.2026 ~01.4x

Fablen painopiste: liioiteltu perspektiivi (lippu + symbolimallit) ja 177 testikomennolla. Käännös
jo asennettu simulaattoreihin Natiivisepän toimesta 01.32, ei reinstallia. iPhone yksin,
console-pty-kaappauksella.

## Tulokset

- **0 poikkeusta koko session ajan: PASS.**
- **Ylhäältä-perspektiivi (symbolimallit, löydös 175 jatko): PASS.** `symbolit ylhaalta 3d` +
  `symbolit perspektiivi 55` + pystysuora kamera (kallista 0) Kreikassa: majakka näkyy selvänä
  3D-mallina (varjo, syvyys, rakenne) myös suoraan ylhäältä — ei enää litteä 2D-symboli kuten
  1.0.26:ssa. Ranskan tarkkaa vertailukohtaa (samat arkkityypit kuin aiemmilla kierroksilla) ei
  löytynyt tällä session-kierroksella uudestaan (arkkityyppien sijainti/näkyvyys vaikuttaa olevan
  pelisession/löytötilan mukaan vaihtelevaa), käytin luotettavaa Kreikan sijaintia sen sijaan.
- **Lipun perspektiivi: PASS.** `lipputanko koe` + Ateena suoraan ylhäältä (37.98, 23.73, kallista
  0): lippu näkyy pienenä (keltainen piste + kapea sininen liuska) — lähes näkymätön kriteeri
  täyttyy. Siirrettäessä kamera hieman pois keskeltä (37.55, 23.73) lippu suurenee ja tanko/kangas
  tulevat selvästi näkyviin. Ääripään (aivan ruudun reunan) säteittäistä kallistusta ei saatu
  eristettyä täysin puhtaasti tällä kierroksella — ei kuitenkaan poikkeamaa ydinkriteerissä.
- **177 (testikomennolla, kortti sulkeutuu): PASS.** Avasin nostokortin
  (`ui nosto skandaali:shakkiturkkilainen`), sitten `uusi-peli 1 pariisi` peli-komento.txt:llä
  (ei UI-nappia): kortti sulkeutui, uusi peli alkoi puhtaasti Pariisiin — sama tulos konsolilla
  kuin oikealla pelitoiminnolla.

## Yhteenveto
4/4 painopistekohtaa PASS (0 poikkeusta, ylhäältä-perspektiivi, lipun perspektiivi ydinkriteeriltä,
177 testikomennolla). Simulaattori sammutettu turvallisesti.
