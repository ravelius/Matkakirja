# Todistusajo: aarteet-ipad afd47c39

**aarteet-ipad afd47c39: PUUTE — 2: Kreetan vanha kartta auki: ei lokiriviä**

Laite ipad `39644E75-8BDA-4ED8-98B1-3FC864B73697`, skenaario `sk-kreeta.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-aarteet-ipad-20261015-0123`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt afd47c39 = afd47c39
- **OK** haaran 92783317f sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: Kreetan a tarjolla` | OK: peli-komento: 37.96 aarretehtava → tarjolla kreeta: kreeta:a Katso (kaupungissa 2) [Kartta] |
| `oletus: Kreetan vanha kartta auki` | PUUTE: ei riviä 15 s:ssa |

- **PUUTE** Kreetan vanha kartta auki: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [kreeta-b.png](kuvat/kreeta-b.png): Kreeta b: Hanian vanha merikartta (aarretehtävä) (2064×2752 px, pysty)
- **OK** [kreeta-a.png](kuvat/kreeta-a.png): Kreeta a: katso ja löydä -kortti (2064×2752 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.79 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 181.28): xcodebuild | kuormitus 181.28 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
