# Karttaseppä → Codex: Notre-Dame 0,5 m/px G-tyylissä, koepala (2 kuvaa; 1.11.2026)

**PT 13.2x, omistaja 13.21:** lähimmällä zoomilla verrataan kolmea: G-kuvan Notre-Dame, G 2×2 (~1 m/px) ja 0,5 m/px
G-tyylissä. Tämä tilaus on kolmas: **G 2×2:n Notre-Dame-alue kaksinkertaisena, sama piirros tarkempana.**
Vanha 0,5 m/px -piirros (pariisi-05m) ei ole G:n mukainen, eikä sitä käytetä tässä.

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-nd-05m-koepala-20261101/`, SHA256SUMS)
- `ohje-nd-05m-ylä.png` ja `ohje-nd-05m-ala.png` (1536 × 1024): hyväksytyn G 2×2:n (fad33f1bd, sävytetty) rajaukset
  suurennettuina ×2. Koottu G 2×2 -kangas: ylä x 1738–2506, y 515–1027; ala x 1738–2506, y 872–1384.
  Palat ovat päällekkäin, ja **limitys on 310 px** (ylän alaosa y 714–1024 = alan yläosa y 0–310).
  Liioiteltu kirkko (tornit, torni ja kuori) on niin iso, että kokonaisena se vaatii kaksi palaa.
- `asettelu-nd-05m.png`: palat G 2×2:ssa (punainen ylä, sininen ala, musta = kirkko).
- `G-referenssi-owner-style-G-confirmed.jpg`: tyylin malli.

## Mitä piirretään
- **Sama piirros kuin ohjeessa, mutta tarkempana:** kirkon muoto, koko, paikka, tornit, ruusuikkuna, torni, kuori ja
  tukikaaret pysyvät G 2×2:n mukaisina pikselilleen (sama liioittelu, Notre-Dame noin 1 150 px leveä). Myös Seine,
  sillat, puut, laivat ja talot pysyvät paikallaan. Tarkkuus nousee: kiven saumat, ikkunoiden lasit ja ristikot,
  veistokset portaaleissa, katon liuskeet, lehvästö ja ihmiset terävinä. Ei sumeutta eikä pelkkää suurennusta.
- Värit ja sävy G 2×2:n mukaan (sävytetty). Ei uusia kohteita eikä tekstejä. Pois lentokoneet ja linnut.
- **Limitys:** piirrä ylä ensin ja käytä sen alaosaa (310 px) alan yläosana. Palat kootaan ristihäivyttäen.

## Toimitus
`proto-3d/_tyo/codex/pariisi-nd-05m/pariisi-nd-05m-ylä.png` ja `-ala.png` (1536 × 1024 RGB) sekä postiviesti
`posti/codex-karttaseppa-pariisi-nd-05m-koepala-<pvm>.md`, jossa on SHA256. Teen kolmikon pelin kameralla
(G-kuva | G 2×2 | 0,5 m/px) PT:lle. **Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (2 kuvaa). Karttatiedot © OpenStreetMap contributors.
