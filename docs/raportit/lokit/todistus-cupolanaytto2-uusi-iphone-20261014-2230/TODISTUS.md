# Todistusajo: cupolanaytto2-uusi-iphone 43ed5539

**cupolanaytto2-uusi-iphone 43ed5539: OK**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-cupolanaytto-iphone.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-cupolanaytto2-uusi-iphone-20261014-2230`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 43ed5539 = 43ed5539
- **OK** haaran 43ed5539 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 3811 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/62, karkeita 0, lataus 91 %) |
| `tap 147 768` | lähetetty |
| `oletus: N näytön napautus avaa kohdelistan` | OK: linssit: ohjaamon näyttö → kohdevalikko |
| `oletus: N valinnan napautus avaa vaihtoehdot` | OK: iss: kohdevalikko vaihtoehdot vrk |

- **OK** 1 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [n1-kohdelista.png](kuvat/n1-kohdelista.png): 1 näytön napautus: kohdelista, ylärivillä valittu vuorokaudenaika, vuodenaika ja LIVE (1206×2622 px, pysty)
- **OK** [n2-vaihtoehdot.png](kuvat/n2-vaihtoehdot.png): 2 vuorokaudenaika napautettu: vaihtoehdot ylärivin alle (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 77.28 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 38.19): Unity -batchmode | kuormitus 38.19 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
