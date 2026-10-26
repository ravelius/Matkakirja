# Todistusajo: skenkoe2-05-tavli f16f7fa7

**skenkoe2-05-tavli f16f7fa7: OK**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `05-tavli.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-skenkoe2-05-tavli-20261006-0139`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt f16f7fa7 = f16f7fa7

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: pakotettu heitto 3–1` | OK: ui-komento: ui tavli heitto 3 1 → =tavli: seuraava heitto 3 1 |
| `tap-kohta 0.570 0.781 mk-peli__lauta → tap 227.5 451.8` | lähetetty |
| `oletus: oikea tap pisteeseen a5 valitsi nappulan` | OK: ui-komento: ui tavli tila → =tavli: -2,0,0,0,0,5,0,3,0,0,0,-5,5,0,0,0,-3,0,-5,0,0,0,0,2|0,0|0 vuoro 0 heitto 5 3 jäljellä 5,3 pois 0/0 | Sinun vuorosi: 5 ja 3 · valitse kohde. | Napauta omaa napp |
| `tap-kohta 0.750 0.781 mk-peli__lauta → tap 295.5 451.8` | lähetetty |
| `oletus: oikea tap kohteeseen a2 siirsi nappulan a5→a2 (3)` | OK: tavli: ääni tavli-siirto (a5→a2 (3)) |
| `tap-teksti Poistu → tap 337.3 729.4` | lähetetty |
| `ui-puu: Poistu sulki tavlin` | OK: 'Luovuta' ei näy |

- **OK** 3 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [05a-tavli-auki.png](kuvat/05a-tavli-auki.png): Tavli auki (helppo) (1206×2622 px, pysty)
- **OK** [05b-tavli-heitto.png](kuvat/05b-tavli-heitto.png): Tavli: heitto 3–1 (1206×2622 px, pysty)
- **OK** [05c-tavli-siirto.png](kuvat/05c-tavli-siirto.png): Tavli: nappula siirretty oikealla tapilla (1206×2622 px, pysty)
- **OK** [05d-tavli-suljettu.png](kuvat/05d-tavli-suljettu.png): Tavli suljettu Poistu-napista (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.91 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 58.25): kuormitus 58.25 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
