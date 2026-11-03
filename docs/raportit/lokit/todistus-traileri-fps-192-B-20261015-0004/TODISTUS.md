# Todistusajo: traileri-fps-192-B fc18e65d

**traileri-fps-192-B fc18e65d: PUUTE — 2: 1. kuva liukuu sisään: ei lokiriviä; 2: 1. kuva sisään (lämmin ajo): ei lokiriviä**

Laite iphone `D61642C8-78D9-4A5C-A731-1A16D739EF66`, skenaario `traileri-fps-192.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-traileri-fps-192-B-20261015-0004`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt fc18e65d = fc18e65d
- **OK** haaran 9f813c97c sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: mykistys päällä ennen trailereita` | OK: peli-komento: 45.47 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: 1. kuva liukuu sisään` | PUUTE: ei riviä 20 s:ssa |
| `oletus: 2. kuva liukuu sisään` | OK: ui saapuminen: traileri kuva 2 sisään 59,681 (trailerin alusta 2,92 s) |
| `oletus: 3. kuva liukuu sisään` | OK: ui saapuminen: traileri kuva 3 sisään 62,181 (trailerin alusta 5,42 s) |
| `oletus: traileri päättyi` | OK: ui saapuminen: traileri päättyi 65,497 (8,73 s) |
| `oletus: valmis-kutsu tuli` | OK: ui-komento: traileri valmis: pariisi |
| `oletus: 1. kuva sisään (lämmin ajo)` | PUUTE: ei riviä 20 s:ssa |
| `oletus: 3. kuva sisään (lämmin ajo)` | OK: ui saapuminen: traileri kuva 3 sisään 97,297 (trailerin alusta 5,03 s) |
| `oletus: traileri päättyi (lämmin ajo)` | OK: ui saapuminen: traileri päättyi 100,598 (8,33 s) |
| `oletus: valmis-kutsu tuli (lämmin ajo)` | OK: ui-komento: traileri valmis: pariisi |

- **PUUTE** 1. kuva liukuu sisään: ei lokiriviä
- **PUUTE** 1. kuva sisään (lämmin ajo): ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [t0-kartta.png](kuvat/t0-kartta.png): Kartta ennen traileria (lepotila) (2064×2752 px, pysty)
- **OK** [t1-kuva1.png](kuvat/t1-kuva1.png): Traileri: 1. kuva (kylmä ajo) (2064×2752 px, pysty)
- **OK** [t2-kuva2.png](kuvat/t2-kuva2.png): Traileri: 2. kuva (kylmä ajo) (2064×2752 px, pysty)
- **OK** [t3-jalkeen.png](kuvat/t3-jalkeen.png): Kartta trailerin jälkeen (2064×2752 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 40.43 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 292.88): Unity -batchmode | kuormitus 292.88 > 16 ydintä

## 8. Ei testattu
- **EI** trailerin ääni ja puhe (ui traileri ajaa ilman puhetta); fps-rivi "traileri ruutuja" on vain korjatussa versiossa, vanhassa vertailu videosta
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
