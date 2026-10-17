# Todistusajo: testi192-uusi-ipad 04123f7d

**testi192-uusi-ipad 04123f7d: OK**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-testi192-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-testi192-uusi-ipad-20261015-0001`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 04123f7d = 04123f7d
- **OK** haaran 04123f7d sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4047 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/92, karkeita 0, lataus 100 %) |
| `oletus: T pallo telineeseen 5 s:n päästä` | OK: iss: pienoispallo telineeseen |
| `tap 600 330` | lähetetty |

- **OK** 1 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [t1-teline.png](kuvat/t1-teline.png): 1 Cupola: pallo telineessä, ohjaamo iso (2420×1668 px, vaaka)
- **OK** [t2-ikkuna.png](kuvat/t2-ikkuna.png): 2 ikkunan napautus (UUSI: ohjaamo pysyy isona) (2420×1668 px, vaaka)
- **OK** [t3-taulu.png](kuvat/t3-taulu.png): 3 Pulun taulu (UUSI: taulu päällimmäisenä, pallo sen takana; teline yksivärinen 60 %) (2420×1668 px, vaaka)
- **OK** [t4-chat.png](kuvat/t4-chat.png): 4 Kysy Pululta (UUSI: näppäimistö- ja mikrofoninappi paneelin sisällä, pallo ei chatin päällä) (2420×1668 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 83.29 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 537.94): Unity -batchmode | kuormitus 537.94 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
