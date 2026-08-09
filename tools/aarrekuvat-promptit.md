# Aarrekuvien AI-generointi — promptit ja putki

Omistajan päätös 9.8.2026: Commons-valokuvat eivät toimi
paljastuskortissa sellaisinaan (kirjava tyyli ja tausta). Aarteet
generoidaan AI:lla yhtenäiseen tyyliin; Commons-kuvat toimivat
POHJAKUVINA (referenssi esineen muodolle) siellä missä esine on
tunnistettava yksilö (esim. Kristian IV:n kruunu).

## Suositeltu API ja malli

- **Ensisijainen: OpenAI `gpt-image-1`** (`images.generate` /
  `images.edit`). Vahvin referenssikuvatuki: pohjakuva annetaan
  `images.edit`-kutsussa ja tyyliprompti ohjaa lopputuloksen.
- **Vaihtoehto: Google Imagen 3** (Gemini API `imagen-3.0-generate-002`).
  Erinomainen laatu tekstipromptista, mutta referenssikuvatuki
  rajallisempi — sopii jos generoidaan puhtaasti kuvauksesta.
- Käytännössä useimmat aarteet syntyvät parhaiten PELKÄSTÄ
  tekstipromptista (ei lisenssikysymyksiä eikä pohjakuvan
  sommittelurajoitteita); pohjakuvaa käytetään vain tunnistettaville
  yksilöesineille. HUOM lisenssi: CC BY-SA -pohjakuvien johdannaisiin
  liittyy share-alike-epävarmuus — PD/CC0-pohjat ovat turvallisia,
  tekstipromptit täysin ongelmattomia.

## Yhtenäinen tyyli (liitetään jokaisen promptin alkuun)

> Vintage children's adventure book illustration of [ESINE],
> painted in warm gouache with fine ink outlines. The object sits
> centered on aged parchment paper background with soft vignette
> edges, lit warmly from the upper left like candlelight. Rich
> detail on the object, plain background, no text, no people,
> no borders. Square 1:1. Muted antique palette with one strong
> accent color from the object itself.

Sävy: sama kuin pelin arkkien paperitausta (#f7f5f0 → kellertävä
pergamentti), jotta kortti istuu paljastusruutuun.

## Esinepromptit ([ESINE]-kohtaan; suluissa pohjakuva jos käytetään)

### Eurooppa
1. Kruununjalokivi — "a magnificent royal crown of gold with pearls,
   rubies and enamel figures" (pohja: Crown of King Christian IV of
   Denmark.jpg — CC BY-SA, käytä vain jos share-alike hyväksytään;
   muuten pelkkä prompti)
2. Ritarin hopeamiekka — "a knight's medieval longsword with silver
   pommel and worn leather-wrapped grip, lying diagonally"
3. Meripihka — "a cluster of glowing baltic amber pieces, one with a
   tiny ancient insect trapped inside, sunlight passing through"

### Afrikka
4. Kimberleyn timantti — "a large rough uncut diamond crystal,
   glassy and angular, resting on dark stone"
5. Kultahippu — "a heavy natural gold nugget with pitted surface,
   gleaming"
6. Kaurikotilo — "a small pile of glossy cowrie shells, once used as
   money, spotted and banded patterns"

### Lähi-itä
7. Messinkilamppu — "an ornate antique brass oil lamp with curved
   spout and looped handle, like from an old tale"
8. Suitsukepihka — "translucent golden frankincense resin chunks in
   a small brass bowl, faint smoke wisp"
9. Sahramipussi — "a small linen pouch spilling deep red saffron
   threads"

### Aasia
10. Sukeltajan helmi — "a single large lustrous white pearl on a
    dark oyster shell"
11. Silkkikäärö — "a rolled bolt of imperial yellow silk with woven
    dragon pattern, partly unrolled"
12. Posliinikuppi — "a delicate blue-and-white Chinese porcelain
    cup with painted figures"

### Pohjois-Amerikka
13. Kultaryntäyksen hippu — "a gold nugget beside a battered tin
    pan with river sand"
14. Turkoosi — "a raw turquoise stone with golden-brown matrix
    veins"
15. Kaakaopavut — "a burlap sack spilling brown cacao beans"

### Etelä-Amerikka
16. Inkojen kultafiguuri — "a small pre-Columbian gold votive
    figurine with headdress, hammered gold" (pohja: BOG 03 2018
    Tunjos Muiscas -kuva vain muototueksi, CC BY-SA -varauma)
17. Kolumbian smaragdi — "a vivid green emerald crystal embedded in
    white host rock"
18. Potosín hopeakolikko — "an irregular hand-struck Spanish
    colonial silver coin with cross and shield"

### Oseania
19. Opaali — "a precious opal with rainbow fire flashing across its
    surface, in rough sandstone"
20. Paua-simpukkakoru — "a polished paua abalone shell shimmering
    blue-green"
21. Simpukkarahanauha — "long strings of tiny white shell beads
    coiled like rope, Pacific island shell money"

### Pääaarteet (jos omistaja haluaa myös nämä)
22. Meripihkahuoneen aarre — "a glowing amber panel with carved
    baroque ornaments, candlelit"
23. Suuren Zimbabwen kivilintu — "a soapstone bird statue on a
    stone column"
24. Sheban kuningattaren aarre — "an overflowing bronze chest of
    gold jewelry and incense"
25. Keisarin jadesinetti — "a carved green jade imperial seal with
    dragon handle"
26. Montezuman aarre — "a turquoise-and-gold Aztec ornament"
27. El Doradon aarre — "a golden raft with tiny figures, Muisca
    style"
28. Eteläristin helmi — "a giant black pearl with starlight sheen"
29. Magellanin kompassi (maailma) — "an antique brass compass with
    wind rose"
30. Sulttaanin timantti (Istanbul) — "an enormous teardrop diamond
    in a gold spoon-shaped mount"
31. Lapin kulta (Suomi) — "gold flakes in a wooden panning dish
    with cold river water"

## Putki (valmiina ajettavaksi kun avain tulee)

1. `AARRE_API_KEY=... node tools/generoi-aarrekuvat.mjs` (skripti
   kirjoitetaan avaimen tyypin mukaan — OpenAI tai Google).
2. Ulos: `assets/aarteet/aarre-<tunnus>.png`, 1024×1024, ~200-400 kt.
3. Silmätarkistus jokaiselle (sama laatupassi kuin valokuville).
4. Pakettien `kuva`-kentät osoitetaan paikallisiin tiedostoihin
   (`assets/aarteet/...`), jolloin peili/Commons-riippuvuus poistuu
   ja esilatauskin kevenee.
5. Commons-valokuvat jäävät `kuvaLahde`-historiaan kunnes vaihto on
   hyväksytty; sen jälkeen kentät siivotaan.

Avainta EI koskaan repoon eikä lokiin (sama sääntö kuin ElevenLabs).
