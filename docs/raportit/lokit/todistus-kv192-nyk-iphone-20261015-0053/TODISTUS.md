# Todistusajo: kv192-nyk-iphone 2133d5c7

**kv192-nyk-iphone 2133d5c7: OK**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-kv192-iphone.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-kv192-nyk-iphone-20261015-0053`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 2133d5c7 = 2133d5c7
- **OK** haaran 2133d5c7 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 3666 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/96, karkeita 0, lataus 100 %) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [k0-lataus.png](kuvat/k0-lataus.png): 0 Cupolan latausruutu (UUSI: vain sijainnin nimi) (1206×2622 px, pysty)
- **OK** [k1-ennen.png](kuvat/k1-ennen.png): 1 Cupola ennen valintaa (nykyhetki) (1206×2622 px, pysty)
- **OK** [k2-yo.png](kuvat/k2-yo.png): 2 vuorokaudenajaksi Yö (UUSI: näkymä yöksi heti) (1206×2622 px, pysty)
- **OK** [k3-talvi.png](kuvat/k3-talvi.png): 3 lisäksi vuodenajaksi Talvi (UUSI: talvi näkyy heti) (1206×2622 px, pysty)
- **OK** [k4-loppuvalinta.png](kuvat/k4-loppuvalinta.png): 4 loppuvalinnan napit (UUSI: nappipohjan fontti ja koko) (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 71.49 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 90.14): kuormitus 90.14 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
