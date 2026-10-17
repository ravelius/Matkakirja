# Todistusajo: testi192-nyk-ipad 43ed5539

**testi192-nyk-ipad 43ed5539: OK**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-testi192-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-testi192-nyk-ipad-20261014-2356`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 43ed5539 = 43ed5539
- **OK** haaran 43ed5539 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4141 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/1, karkeita 0, lataus 4 %) |
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
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 100.28 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 48.04): xcodebuild | kuormitus 48.04 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
