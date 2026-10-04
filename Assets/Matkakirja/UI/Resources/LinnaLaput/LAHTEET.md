# Olavinlinnan selittävien lappujen taustat v1 (Linnanrakentaja 4.10.2026)

Omistajan toive 20.4x (Päätoimittaja): huonekortti ja nimilaput keskiaikaisemmiksi, linna vaakanäkymässä.
Siirtoseppä kytkee kehittäjäkytkimen taakse. Kolme tyyliä:
- A: pergamentti, repaleiset reunat, sinettivaha (a/sinetti.png 32 × 32 pt)
- B: tumma tammilauta, kultaraja ja rautanupit. Teksti kultaisena pelissä.
- C: käsikirjoituksen sivu, kermavellumi, punainen kaksoiskehys. c/initiaali.png on 28 × 28 pt:n kehys ilman kirjainta.

## Kuvat (oma tuotanto, CC0)
- Blender 5 Cycles, menettelylliset materiaalit (kohina- ja aaltotekstuurit), ylhäältä ortokameralla, 1 yksikkö = 100 pt, @3x.
- Sinetin leima on piirretty itse PIL:llä (lahde/leima.png): kolmitorninen linna, rengas ja teksti "OLAVINLINNA ✠ OLOFSBORG".
- Ei kolmansien osapuolten kuvia.
- Koot: kortti 300 × 150 pt (900 × 450 px), 9-slice 72 px joka reunalta (24 pt). Nimilappu 90 × 22 pt (270 × 66 px), 3-slice 24 px (8 pt) päistä.
- Alfa ≥ 240 → 255 (tarkistettu: 0 pikseliä välillä 240–254).
- Toisto: lahde/laput.py (blender -b --python laput.py -- ulos.png A|B|C leveys_pt korkeus_pt kortti|lappu|sinetti|initiaali), sitten lahde/jalki.py <kansio>.

## Fontit (SIL Open Font License 1.1, fontit/OFL.txt)
- GrenzeGotisch-SemiBold.ttf: Grenze Gotisch, The Grenze Gotisch Project Authors / Omnibus-Type. Käytetään otsikoihin ja C:n initiaaliin.
  Lähde: https://github.com/Omnibus-Type/Grenze-Gotisch (fonts/ttf, staattinen SemiBold, koska Unity ei välttämättä tue muuttuvan fontin akseleita).
  Valittu 4.10. Päätoimittajan pyynnöstä, koska UnifrakturMaguntian iso K luettiin R:ksi. Vertailu: fonttivertailu.png.
- UnifrakturMaguntia-Book.ttf: UnifrakturMaguntia, J. Ruggaber. Ei enää käytössä (K ≈ R), jätetty kansioon varalle.
- IMFellEnglish-Regular.ttf ja IMFellEnglish-Italic.ttf: IM FELL English, Igino Marini (leipäteksti)
- Lähde: https://github.com/google/fonts (ofl/unifrakturmaguntia/UnifrakturMaguntia-Book.ttf, ofl/imfellenglish/IMFeENrm28P.ttf ja IMFeENit28P.ttf), haettu 4.10.2026.
- IM FELL -tiedostot on nimetty uudelleen, mutta fontin sisäinen nimi on ennallaan. OFL sallii tiedostonimen muutoksen, koska fontin nimeä (Reserved Font Name) ei ole muutettu.
- Suomen merkit (ÄÖÅäöå, –, ”, ’) löytyvät kaikista kolmesta.

## mitat.json
slice (px @3x) ja sisennys (pt, [vasen, ylä, oikea, ala]) tyyleittäin, tekstin, otsikon, kapiteelin, nimilapun ja osoitinviivan
värit sekä C:n initiaalikirjaimen väri. tarkistus-kooste.png: kortit 220 × 110 ja 350 × 180 pt, nimilaput 60 ja 110 pt
venytettyinä esimerkkiteksteineen (ei peliin).
