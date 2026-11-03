# Todistusajo: pulu-kaak-192 3a2fe7fd

**pulu-kaak-192 3a2fe7fd: PUUTE — 2: Pulu-kuva näkyvissä kartalla (pysty): 0 kpl, odotettiin 1; 2: Pulu-kuva näkyvissä kartalla (vaaka): 0 kpl, odotettiin 1**

Laite ipad `D61642C8-78D9-4A5C-A731-1A16D739EF66`, skenaario `pulu-kaak-192.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-pulu-kaak-192-20261015-0144`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 3a2fe7fd = 3a2fe7fd
- **OK** haaran 41c7419ea sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: mykistys päällä ennen elettä` | OK: peli-komento: 71.07 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `määrä: Pulu-kuva näkyvissä kartalla (pysty)` | PUUTE: 0 ≠ 1 |
| `määrä: Pulu-kuva näkyvissä kartalla (vaaka)` | PUUTE: 0 ≠ 1 |

- **PUUTE** Pulu-kuva näkyvissä kartalla (pysty): 0 kpl, odotettiin 1
- **PUUTE** Pulu-kuva näkyvissä kartalla (vaaka): 0 kpl, odotettiin 1

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [k0-pysty-lepo.png](kuvat/k0-pysty-lepo.png): Pulu levossa kartalla, iPad pysty (2064×2752 px, pysty)
- **OK** [k1-pysty-kaak1.png](kuvat/k1-pysty-kaak1.png): Kääk! pysty, toisto 1 (pää suurimmillaan, ei leikkaa oikeaa reunaa) (2064×2752 px, pysty)
- **OK** [k2-pysty-kaak2.png](kuvat/k2-pysty-kaak2.png): Kääk! pysty, toisto 2 (2064×2752 px, pysty)
- **OK** [k3-pysty-kaak3.png](kuvat/k3-pysty-kaak3.png): Kääk! pysty, toisto 3 (2064×2752 px, pysty)
- **OK** [v0-vaaka-lepo.png](kuvat/v0-vaaka-lepo.png): Pulu levossa kartalla, iPad vaaka (2752×2064 px, vaaka)
- **OK** [v1-vaaka-kaak1.png](kuvat/v1-vaaka-kaak1.png): Kääk! vaaka, toisto 1 (pää suurimmillaan, ei leikkaa oikeaa reunaa) (2752×2064 px, vaaka)
- **OK** [v2-vaaka-kaak2.png](kuvat/v2-vaaka-kaak2.png): Kääk! vaaka, toisto 2 (2752×2064 px, vaaka)
- **OK** [v3-vaaka-kaak3.png](kuvat/v3-vaaka-kaak3.png): Kääk! vaaka, toisto 3 (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 65.98 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 26.71): xcodebuild | kuormitus 26.71 > 16 ydintä

## 8. Ei testattu
- **EI** osuuko still täsmälleen pään huippuun (ajoitus ±0,5 s, toistot hajauttavat); web-vertailu (UI-testit/pulu-kaak-rajaus.mjs on vain laskennallinen malli); ääni ja puhe
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
