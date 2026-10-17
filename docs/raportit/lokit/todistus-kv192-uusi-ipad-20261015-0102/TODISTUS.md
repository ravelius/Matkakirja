# Todistusajo: kv192-uusi-ipad 9757d025

**kv192-uusi-ipad 9757d025: OK**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-kv192-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-kv192-uusi-ipad-20261015-0102`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 9757d025 = 9757d025
- **OK** haaran 9757d025 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 3879 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/107, karkeita 0, lataus 92 %) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [k0-lataus.png](kuvat/k0-lataus.png): 0 Cupolan latausruutu (UUSI: vain sijainnin nimi) (2420×1668 px, vaaka)
- **OK** [k1-ennen.png](kuvat/k1-ennen.png): 1 Cupola ennen valintaa (nykyhetki) (2420×1668 px, vaaka)
- **OK** [k2-yo.png](kuvat/k2-yo.png): 2 vuorokaudenajaksi Yö (UUSI: näkymä yöksi heti) (2420×1668 px, vaaka)
- **OK** [k3-talvi.png](kuvat/k3-talvi.png): 3 lisäksi vuodenajaksi Talvi (UUSI: talvi näkyy heti) (2420×1668 px, vaaka)
- **OK** [k4-loppuvalinta.png](kuvat/k4-loppuvalinta.png): 4 loppuvalinnan napit (UUSI: nappipohjan fontti ja koko) (2420×1668 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 77.55 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 17.15): xcodebuild | kuormitus 17.15 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
