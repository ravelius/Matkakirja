# Savukierros: juna/b13, iPad Pro 13" M5 (25.9.2026, 12.5x–13.0x)

Build: juna/b13 @ c168c2e4 (käännösvahti asensi 12:37; uudempi kuin
vaadittu d76c9669). Laite 3B4CDACB (1032×1376 pt), pysty ja vaaka.
Jatkaa iPhone-kierrosta `savukierros-b13-20260925.md`.

## Kosketustyökalu toimii nyt

`mcp__Claude_Code_iOS_Simulator__control`: `attach` + `tap` toimi. Äänipainike
muutti tekstin "Laita äänet päälle" → "Äänet päällä" (kuvaero ennen/jälkeen
varmistettu), nostolista (kuvake oikeassa yläkulmassa) aukesi ja sulkeutui
napautuksella, radion × sulki linssin. Aiempi "ei vaikuta mihinkään" -vika ei
toistunut. `inspect` ei ollut käytettävissä (vastasi "not available right now"),
koordinaatit laskettiin kuvista.

## PASS

1. **Saapuminen + kartta** (`uusi-peli 1 pariisi`, `odota-tila Kartta`): Ranska,
   reliefi, maakuntanimet, intro-kortti ja postikortti asettuvat siististi. Kuva 1.
2. **Äänet mittarilla:** `puhe paalle` + `luento intro` → `puhe.soi=true`,
   `puhe.aika` 1,9 → 2,9 → 6,0 s (todellinen currentTime-eteneminen,
   `virhe: null`). `puhe pois` → soi=false, aika=0.
3. **Kaupunkikortti:** `kortti bryssel` → kuva, Nähtävyydet/Turistiopas,
   Kulttuuri ja ruoka (1), Historia (1). Kuva 2.
4. **Kierto:** `ui kierto vaaka` / `pysty` — sisältö asettuu uudelleen oikein
   (ylätunniste siirtyy sivuun, kortti ja kartta mukana). HUOM: `simctl io
   screenshot` palauttaa vaakatilassa 90° kiertyneen kuvan; se on
   kuvausartefakti, ei pelin vika. Kuva 3.
5. **Radio, `linssi radio` -reitti:** `auki: radio`, `radio taajuus 0.3` →
   Viritys/Lukittuu → Soi, DZA "Algérie Chaine 1 / Sahara · Algeria", VU 0,33,
   rms 0,0064, moottori käy, reitti Speaker, alivuotoja 0. Kamera lentää
   Saharaan, mastot ja lukitusrengas näkyvät. Kuva 5.
6. **Radion sulku × -napilla (aito kosketus):** `auki: ei mitään`, lokiin
   `kamera-ajo → (46,61, 2,35, 1389088 m)` — kamera palaa Ranskaan ja kartta
   piirtyy normaalisti. Kuva 8.

## Löydökset

1. **Radion kaksi avausreittiä eri tilassa — TOISTUU c168c2e4:llä (iPad).**
   `ui linssi radio` näyttää radiopaneelin (VU, näyttö, viritinliuska, kuva 4),
   mutta heti perään `radio tila` vastaa "radio: linssi ei ole auki". Sama kuin
   iPhone-kierroksella 93ab72f1:llä, ei korjaantunut. Ei tiedetä onko käyttäjälle
   näkyvä vika (aito reitti on kosketus, ks. alla) vai vain testikomennon reitti.
   Ohjaus: Natiivi-UI/Pelikoodari.
2. **Kamera ei palaa Ranskaan `linssi pois` -komennolla.** Radion sulkeminen
   tekstikomennolla `linssi pois` jättää kameran Saharan ylle (kaikki näkyvä on
   tasaista aavikkoa, kuva 7) yli 40 sekunniksi; kortti sanoo yhä "Pariisi" ja
   kulmassa "RANSKA". Sama mikä iPhone-kierroksen "tyhjä näkymä radion
   sulkeuduttua". × -napilla kamera palaa (PASS 6), joten vika on todennäköisesti
   vain tekstikomentopolussa (`linssi pois` ei aja paluuliikettä) — todennäköisesti
   ei pelaajan polku, mutta testeissä sudenkuoppa: käytä × -nappia tai
   `uusi-peli`-nollausta.
3. **Genetiivipäätevika POI-nimissä toistuu iPadilla** (kuvat 1, 2, 4, 5):
   "Rouenin.", "Amiensin.", "Chartresin.", "Versaillesin.", "Montgolfierin.",
   "Carcassonnen.", "Le Mansin 24.", "Nancy, Place.", "Saint-Cloud'n.",
   "Beaunen Hôtel-Dieu", "Pic du Midi de.", "Vuorovesi 2015". Ei muutosta
   c168c2e4:ssä.
4. **Radiopaneeli peittää maan nimikyltin** (kuvat 4, 5): paneeli
   (x≈285–1215 pt) leikkaa "RANSKA / France · tasavalta v. 1873" -kyltin oikean
   reunan. Ulkoasuhuomio, ei toiminnallinen.

## Ei tehty

- Korttien/sähkeen/lentokierros ei kuulunut tähän kierrokseen (aloitusviestin
  kohta 2 vaati vain iPad-toistoa iPhonen kohtiin 1–5).

## Kuvat

`docs/raportit/kaappaukset/savukierros-b13-ipad-20260925/` (jpg, 1100 px)
1-saapuminen, 2-kaupunkikortti, 3-vaaka-simctl-kiertynyt, 4-radio-ui-reitti,
5-radio-linssi-reitti, 6-nostolista-kosketus, 7-kamera-saharassa-linssi-pois,
8-kamera-palaa-x-napilla.

iPad 3B4CDACB sammutettu kierroksen jälkeen.
