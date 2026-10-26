# Todistusajo: skenkoe-05-tavli f16f7fa7

**skenkoe-05-tavli f16f7fa7: PUUTE — 2: pakotettu heitto 3–1: ei lokiriviä; 2: oikea tap pisteeseen a5 valitsi nappulan: ei lokiriviä; 2: oikea tap kohteeseen a2 siirsi nappulan (valinta tyhjeni): ei lokiriviä**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `05-tavli.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-skenkoe-05-tavli-20261006-0127`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt f16f7fa7 = f16f7fa7

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: pakotettu heitto 3–1` | PUUTE: ei riviä 6 s:ssa |
| `tap-kohta 0.570 0.781 mk-peli__lauta → tap 227.5 451.8` | lähetetty |
| `oletus: oikea tap pisteeseen a5 valitsi nappulan` | PUUTE: ei riviä 5 s:ssa |
| `tap-kohta 0.680 0.781 mk-peli__lauta → tap 269.0 451.8` | lähetetty |
| `oletus: oikea tap kohteeseen a2 siirsi nappulan (valinta tyhjeni)` | PUUTE: ei riviä 5 s:ssa |
| `tap-teksti Poistu → tap 337.3 729.4` | lähetetty |
| `ui-puu: Poistu sulki tavlin` | OK: 'Luovuta' ei näy |

- **PUUTE** pakotettu heitto 3–1: ei lokiriviä
- **PUUTE** oikea tap pisteeseen a5 valitsi nappulan: ei lokiriviä
- **PUUTE** oikea tap kohteeseen a2 siirsi nappulan (valinta tyhjeni): ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [05a-tavli-auki.png](kuvat/05a-tavli-auki.png): Tavli auki (helppo) (1206×2622 px, pysty)
- **OK** [05b-tavli-heitto.png](kuvat/05b-tavli-heitto.png): Tavli: heitto 3–1 (1206×2622 px, pysty)
- **OK** [05c-tavli-siirto.png](kuvat/05c-tavli-siirto.png): Tavli: nappula siirretty oikealla tapilla (1206×2622 px, pysty)
- **OK** [05d-tavli-suljettu.png](kuvat/05d-tavli-suljettu.png): Tavli suljettu Poistu-napista (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 29.05 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 50.77): Unity -batchmode | kuormitus 50.77 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
