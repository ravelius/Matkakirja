# Todistusajo: lasi192-uusi-iphone b2e0ecf4

**lasi192-uusi-iphone b2e0ecf4: OK**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-lasi192-iphone.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-lasi192-uusi-iphone-20261015-0011`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt b2e0ecf4 = b2e0ecf4
- **OK** haaran b2e0ecf4 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4530 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/0, karkeita 0, lataus 1 %) |
| `oletus: ruutuaika NYK taulu` | OK: lasi: ruutuaika nyk-taulu 33,33 ms/ruutu (150 ruutua, CPU 33,34 ms, GPU 0,57 ms); lasipohja pois, paneeleja 2 (lasilla 0); lasitausta pois, paneeleja 0, kuva 120×262 (1/8), sumennus 8 pt |
| `oletus: ruutuaika UUSI taulu` | OK: lasi: ruutuaika lasi-taulu 33,34 ms/ruutu (151 ruutua, CPU 33,33 ms, GPU 0,63 ms); lasipohja päällä, paneeleja 2 (lasilla 1); lasitausta päällä, paneeleja 1, kuva 120×262 (1/8), sumennus 8 pt |
| `oletus: ruutuaika UUSI chat` | OK: lasi: ruutuaika lasi-chat 33,34 ms/ruutu (150 ruutua, CPU 33,34 ms, GPU 0,53 ms); lasipohja päällä, paneeleja 2 (lasilla 1); lasitausta päällä, paneeleja 1, kuva 120×262 (1/8), sumennus 8 pt |
| `oletus: ruutuaika NYK chat` | OK: lasi: ruutuaika nyk-chat 33,34 ms/ruutu (150 ruutua, CPU 33,34 ms, GPU 0,52 ms); lasipohja pois, paneeleja 2 (lasilla 0); lasitausta pois, paneeleja 0, kuva 120×262 (1/8), sumennus 8 pt |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [n1-taulu.png](kuvat/n1-taulu.png): 1 NYK: Pulun taulu läpinäkyvällä pohjalla (1206×2622 px, pysty)
- **OK** [u1-taulu.png](kuvat/u1-taulu.png): 2 UUSI: Pulun taulu lasipohjalla (sumea tausta, kevyt tummennus, ohut vaalea reuna) (1206×2622 px, pysty)
- **OK** [u2-chat.png](kuvat/u2-chat.png): 3 UUSI: Pulun chat lasipohjalla (1206×2622 px, pysty)
- **OK** [n2-chat.png](kuvat/n2-chat.png): 4 NYK: Pulun chat läpinäkyvällä pohjalla (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 105.20 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 185.87): xcodebuild | kuormitus 185.87 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
