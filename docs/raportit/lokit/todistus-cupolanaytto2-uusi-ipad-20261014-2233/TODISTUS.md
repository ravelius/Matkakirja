# Todistusajo: cupolanaytto2-uusi-ipad 43ed5539

**cupolanaytto2-uusi-ipad 43ed5539: PUUTE — 2: N näytön napautus avaa kohdelistan: ei lokiriviä**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-cupolanaytto-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-cupolanaytto2-uusi-ipad-20261014-2233`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 43ed5539 = 43ed5539
- **OK** haaran 43ed5539 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4135 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/93, karkeita 0, lataus 100 %) |
| `tap 526 719` | lähetetty |
| `oletus: N näytön napautus avaa kohdelistan` | PUUTE: ei riviä 3 s:ssa |
| `oletus: N valinnan napautus avaa vaihtoehdot` | OK: iss: kohdevalikko vaihtoehdot vrk |

- **PUUTE** N näytön napautus avaa kohdelistan: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [n1-kohdelista.png](kuvat/n1-kohdelista.png): 1 näytön napautus: kohdelista, ylärivillä valittu vuorokaudenaika, vuodenaika ja LIVE (2420×1668 px, vaaka)
- **OK** [n2-vaihtoehdot.png](kuvat/n2-vaihtoehdot.png): 2 vuorokaudenaika napautettu: vaihtoehdot ylärivin alle (2420×1668 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 74.30 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 20.29): xcodebuild | kuormitus 20.29 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
