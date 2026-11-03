# Todistusajo: kokosivu-jalkeen 8b75e386

**kokosivu-jalkeen 8b75e386: PUUTE — 2: Valitse näyttely peittää (3D pois): ei lokiriviä; 2: taidehallin ☰ peittää: ei lokiriviä; 2: ☰ kiinni: 3D takaisin: ei lokiriviä**

Laite ipad `D61642C8-78D9-4A5C-A731-1A16D739EF66`, skenaario `sk-kokosivu.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-kokosivu-jalkeen-20261101-0230`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 8b75e386 = 8b75e386b
- **OK** haaran 8b75e386b sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `tap-teksti Astu sisään → tap 79.0 688.2` | lähetetty |
| `oletus: Valitse näyttely peittää (3D pois)` | PUUTE: ei riviä 40 s:ssa |
| `tap-teksti Louvren klassikot → tap 729.1 945.0` | lähetetty |
| `tap-teksti Louvren klassikot → tap 729.1 945.0` | lähetetty |
| `oletus: näyttely valittu: sivu pois, 3D takaisin` | OK: ruutu: koko ruudun sivu pois → 3D takaisin |
| `tap-teksti Valikko → tap 994.0 1346.0` | lähetetty |
| `oletus: taidehallin ☰ peittää` | PUUTE: ei riviä 15 s:ssa |
| `tap-teksti Valikko → tap 994.0 1346.0` | lähetetty |
| `oletus: ☰ kiinni: 3D takaisin` | PUUTE: ei riviä 15 s:ssa |
| `oletus: oppaan aloitus peittää` | OK: ruutu: koko ruudun sivu peittää → 3D-kamerat pois, Cesium seis |
| `oletus: kaupunki valittu: aloitus pois, 3D takaisin` | OK: ruutu: koko ruudun sivu pois → 3D takaisin |

- **PUUTE** Valitse näyttely peittää (3D pois): ei lokiriviä
- **PUUTE** taidehallin ☰ peittää: ei lokiriviä
- **PUUTE** ☰ kiinni: 3D takaisin: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [S1-valitse-nayttely.png](kuvat/S1-valitse-nayttely.png): Valitse näyttely koko ruutuna (2752×2064 px, vaaka)
- **OK** [S1b-sali.png](kuvat/S1b-sali.png): Näyttely valittu: sali näkyy (2752×2064 px, vaaka)
- **OK** [S2-hallin-valikko.png](kuvat/S2-hallin-valikko.png): Taidehallin ☰ koko ruutuna (2752×2064 px, vaaka)
- **OK** [S2b-sali.png](kuvat/S2b-sali.png): Valikko kiinni: sali näkyy (2752×2064 px, vaaka)
- **OK** [S3-opas-aloitus.png](kuvat/S3-opas-aloitus.png): Oppaan aloitus koko ruutuna (2752×2064 px, vaaka)
- **OK** [S3b-siirto.png](kuvat/S3b-siirto.png): Aloitus kiinni: kartta/siirto näkyy (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 89.23 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 19.18): kuormitus 19.18 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
