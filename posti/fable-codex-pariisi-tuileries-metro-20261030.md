# PT → Codex: Pariisin kartan kaksi nähtävyyspiirrosta samaan tyyliin (30.10.2026 klo 21.5x)

Omistajan pyyntö 21.42 ja kortin vastaus 21.45 (KK): kaksi Pariisin kartan kohdetta on väärää tyyliä ja korjataan.
Kuva omistajalta: docs/raportit/kaappaukset/omistaja-20261030/2142-pariisi-vaara-tyyli-rajaus.png (mainissa).

## Tilaus (2 kuvaa, 1 otto kumpaakin; pysyvä lupa Codexin kuville)
1. **Tuileries-palatsi** (ennen 1871 paloa, Louvren länsipää) → UUSI tiedosto `assets/kartat/miniatyyrit/pariisi-tuileries.webp`.
   Nykyinen `assets/kartat/ihmeet/ihme-tuileries.webp` on kehystetty maalaus taustoineen (ihmekortin kuva) – sitä EI muuteta.
2. **Metron sisäänkäynti** (Guimardin lasikattoinen édicule, Abbesses/Montmartre; Guimard k. 1942 → vapaa)
   → korvaa `assets/kartat/miniatyyrit/pariisi-metron-sisaankaynti.webp` (nyt 512 px, liian värikäs ja eri tyyliä).

## Tyyli (sitova)
- Sama käsin piirretty karttanähtävyystyyli kuin muut Pariisin miniatyyrit: mallit `miniatyyrit/pariisi-louvre.webp` (pyramidi – omistaja: oikea tyyli),
  `pariisi-eiffel-torni.webp`, `pariisi-concorden-aukio.webp`.
- Ilman kehystä ja taustaa: läpinäkyvä alfa, 1024 × 1024 webp, kohde keskellä, sama kuvakulma ja valon suunta kuin malleissa.
- Ei savua, ei maisemaa, ei taivasta; vain rakennus (Tuileriesiin enintään kapea puutarhan reuna).

## Palautus
- Kuvat haaraan + `posti/karttaseppa-codex-pariisi-tuileries-metro-<pvm>.md` (SHA256, mallit joihin vertasit). Karttaseppä kytkee kartalle.
