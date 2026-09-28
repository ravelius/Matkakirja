# Merge-pyyntö: natiivi-ui/liuska-48 397b37f (masterin bcc46ef päällä), Natiivi-UI 25.9.2026 — LÖYDÖS 48

Testit: unity-tarkistus 0 virhettä, uss ok. Testikäännös b12k (6fff2e3, FB234D08, yhdessä tyyppikuvakkeen,
intro-palstojen ja juliste-url:n kanssa).

## Malli (web)
Kaupunkiliuska js/pallolauta/nostot.js. Mitat: web-liuska-mitat.txt ja web-liuska-auki/ennen-*.png. Liuska on 15 px
merkin oikealla ja pystysuunnassa merkin kohdalla. Rivit: kaupunki, Nähtävyydet, Turistiopas, hiusviiva ja kategoriat
värillisin pistein. Liberation Serif kursiivi 13 px, riviväli 18,85 ja paperipohja neljänä kerroksena.

## Toteutus
- KaupunkiKortti.cs kirjoitettu uudelleen liuskaksi. Uusi Kirjasin.Atlas: LiberationSerif-Italic.ttf (OFL, lisenssi
  mukana) kansiossa UI/Resources/Fontit.
- Pieni herokuva jää (omistajan hyväksymä poikkeama 25.9.).
- **.metat** (TTF ja OFL) syntyvät editorissa, tai ne saa käännöspalvelun kansiosta
  20260925-003458-…-metat.

## Todennus b12k (iPhone, oikea kosketus mcp tap)
- Marseillen merkin napautus avaa liuskan: Marseille, Nähtävyydet, Turistiopas sekä Historia (1),
  Kulttuuri ja ruoka (1) ja Kauppa ja tekniikka (1) väripalloineen.
- Kun tila riittää, liuska on merkin oikealla (Karthago). Kun ei riitä, se kääntyy vasemmalle: Marseille oli
  ruudun keskellä x = 196, ja liuska on noin 190 pt leveä.
- Ohi-napautus sulkee liuskan tai vaihtaa sen toisen kaupungin liuskaksi. Pulu ei hyppinyt.
- Kuvapari kuvapari-b12k-liuska-iphone.jpg (web Pariisi | natiivi Marseille).

## Riippuvuus
Kamera zoomaa vielä ulos Eurooppaan, koska webin 0,42 s:n ajo kohtaan (W/4, H/2) ilman zoomia on vasta
natiiviseppa/panoroi-haarassa (ce394ea). Pelikoodari kytkee sen AvaaKorttiin. Kytkennän jälkeen kaupunki on x ≈ 100,
ja liuska mahtuu oikealle kuten webissä.
