# Todistusajo: testi192-uusi-iphone 04123f7d

**testi192-uusi-iphone 04123f7d: OK**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-testi192-iphone.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-testi192-uusi-iphone-20261014-2353`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 04123f7d = 04123f7d
- **OK** haaran 04123f7d sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4382 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/1, karkeita 0, lataus 14 %) |
| `oletus: T pallo telineeseen 5 s:n päästä` | OK: iss: pienoispallo telineeseen |
| `tap 200 380` | lähetetty |

- **OK** 1 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [t1-teline.png](kuvat/t1-teline.png): 1 Cupola: pallo telineessä, ohjaamo iso (1206×2622 px, pysty)
- **OK** [t2-ikkuna.png](kuvat/t2-ikkuna.png): 2 ikkunan napautus (UUSI: ohjaamo pysyy isona) (1206×2622 px, pysty)
- **OK** [t3-taulu.png](kuvat/t3-taulu.png): 3 Pulun taulu (UUSI: taulu päällimmäisenä, pallo sen takana; teline yksivärinen 60 %) (1206×2622 px, pysty)
- **OK** [t4-chat.png](kuvat/t4-chat.png): 4 Kysy Pululta (UUSI: näppäimistö- ja mikrofoninappi paneelin sisällä, pallo ei chatin päällä) (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 81.03 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 198.01): Unity -batchmode xcodebuild | kuormitus 198.01 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
