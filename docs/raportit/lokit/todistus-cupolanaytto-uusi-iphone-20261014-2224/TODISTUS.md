# Todistusajo: cupolanaytto-uusi-iphone 43ed5539

**cupolanaytto-uusi-iphone 43ed5539: PUUTE — 2: elementtiä 'mk-issohjaamo__lcd' ei ui-puussa; 2: N näytön napautus avaa kohdelistan: ei lokiriviä; 2: elementtiä 'mk-linssivalikko__kytkin' ei ui-puussa**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-cupolanaytto-iphone.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-cupolanaytto-uusi-iphone-20261014-2224`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 43ed5539 = 43ed5539
- **OK** haaran 43ed5539 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4070 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/72, karkeita 0, lataus 89 %) |
| `tap-kohta 0.5 0.5 mk-issohjaamo__lcd` | EI LÖYDY ui-puusta |
| `oletus: N näytön napautus avaa kohdelistan` | PUUTE: ei riviä 3 s:ssa |
| `tap-kohta 0.5 0.5 mk-linssivalikko__kytkin` | EI LÖYDY ui-puusta |
| `oletus: N valinnan napautus avaa vaihtoehdot` | PUUTE: ei riviä 3 s:ssa |

- **PUUTE** elementtiä 'mk-issohjaamo__lcd' ei ui-puussa
- **PUUTE** N näytön napautus avaa kohdelistan: ei lokiriviä
- **PUUTE** elementtiä 'mk-linssivalikko__kytkin' ei ui-puussa
- **PUUTE** N valinnan napautus avaa vaihtoehdot: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [n1-kohdelista.png](kuvat/n1-kohdelista.png): 1 näytön napautus: kohdelista, ylärivillä valittu vuorokaudenaika, vuodenaika ja LIVE (1206×2622 px, pysty)
- **OK** [n2-vaihtoehdot.png](kuvat/n2-vaihtoehdot.png): 2 vuorokaudenaika napautettu: vaihtoehdot ylärivin alle (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 73.16 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 14.10): xcodebuild 

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
