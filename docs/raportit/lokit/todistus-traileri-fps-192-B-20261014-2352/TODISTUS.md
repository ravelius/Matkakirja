# Todistusajo: traileri-fps-192-B fc18e65d

**traileri-fps-192-B fc18e65d: PUUTE — 2: 1. kuva liukuu sisään: ei lokiriviä; 2: 2. kuva liukuu sisään: ei lokiriviä; 2: 3. kuva liukuu sisään: ei lokiriviä**

Laite iphone `D61642C8-78D9-4A5C-A731-1A16D739EF66`, skenaario `traileri-fps-192.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-traileri-fps-192-B-20261014-2352`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt fc18e65d = fc18e65d
- **OK** haaran 9f813c97c sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: mykistys päällä ennen trailereita` | OK: peli-komento: 45.45 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: 1. kuva liukuu sisään` | PUUTE: ei riviä 20 s:ssa |
| `oletus: 2. kuva liukuu sisään` | PUUTE: ei riviä 10 s:ssa |
| `oletus: 3. kuva liukuu sisään` | PUUTE: ei riviä 10 s:ssa |
| `oletus: traileri päättyi` | PUUTE: ei riviä 20 s:ssa |
| `oletus: valmis-kutsu tuli` | PUUTE: ei riviä 10 s:ssa |
| `oletus: 1. kuva sisään (lämmin ajo)` | PUUTE: ei riviä 20 s:ssa |
| `oletus: 3. kuva sisään (lämmin ajo)` | PUUTE: ei riviä 10 s:ssa |
| `oletus: traileri päättyi (lämmin ajo)` | PUUTE: ei riviä 20 s:ssa |
| `oletus: valmis-kutsu tuli (lämmin ajo)` | PUUTE: ei riviä 10 s:ssa |

- **PUUTE** 1. kuva liukuu sisään: ei lokiriviä
- **PUUTE** 2. kuva liukuu sisään: ei lokiriviä
- **PUUTE** 3. kuva liukuu sisään: ei lokiriviä
- **PUUTE** traileri päättyi: ei lokiriviä
- **PUUTE** valmis-kutsu tuli: ei lokiriviä
- **PUUTE** 1. kuva sisään (lämmin ajo): ei lokiriviä
- **PUUTE** 3. kuva sisään (lämmin ajo): ei lokiriviä
- **PUUTE** traileri päättyi (lämmin ajo): ei lokiriviä
- **PUUTE** valmis-kutsu tuli (lämmin ajo): ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [t0-kartta.png](kuvat/t0-kartta.png): Kartta ennen traileria (lepotila) (2064×2752 px, pysty)
- **OK** [t1-kuva1.png](kuvat/t1-kuva1.png): Traileri: 1. kuva (kylmä ajo) (2064×2752 px, pysty)
- **OK** [t2-kuva2.png](kuvat/t2-kuva2.png): Traileri: 2. kuva (kylmä ajo) (2064×2752 px, pysty)
- **OK** [t3-jalkeen.png](kuvat/t3-jalkeen.png): Kartta trailerin jälkeen (2064×2752 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 39.29 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 215.80): Blender Unity -batchmode xcodebuild | kuormitus 215.80 > 16 ydintä

## 8. Ei testattu
- **EI** trailerin ääni ja puhe (ui traileri ajaa ilman puhetta); fps-rivi "traileri ruutuja" on vain korjatussa versiossa, vanhassa vertailu videosta
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
