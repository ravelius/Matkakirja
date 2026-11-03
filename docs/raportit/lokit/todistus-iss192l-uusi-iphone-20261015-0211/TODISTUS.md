# Todistusajo: iss192l-uusi-iphone d8f579e2

**iss192l-uusi-iphone d8f579e2: OK**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-iss192l-iphone.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-iss192l-uusi-iphone-20261015-0211`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt d8f579e2 = d8f579e2
- **OK** haaran d8f579e2 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4051 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/58, karkeita 0, lataus 81 %) |
| `tap 200 380` | lähetetty |
| `tap 200 380` | lähetetty |
| `tap-kohta 0.5 0.5 mk-issohjaamo__mini → tap 201.0 814.0` | lähetetty |

- **OK** 3 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [a0-iso.png](kuvat/a0-iso.png): 1 Cupola: ohjaamo iso (1206×2622 px, pysty)
- **OK** [a1-pieni.png](kuvat/a1-pieni.png): 2 lasin napautus: ohjaamo mininäytöksi (1206×2622 px, pysty)
- **OK** [a2-pysyy.png](kuvat/a2-pysyy.png): 3 toinen lasin napautus: pysyy pienenä (1206×2622 px, pysty)
- **OK** [a3-palautuu.png](kuvat/a3-palautuu.png): 3b mininäytön napautus: iso ohjaamo palaa (1206×2622 px, pysty)
- **OK** [c1-kolme.png](kuvat/c1-kolme.png): 4 loppuvalinta: Toinen paikka / Miten kamera toimii / Ohjaa itse (1206×2622 px, pysty)
- **OK** [l1-taulu-nyk.png](kuvat/l1-taulu-nyk.png): 5 NYK taulu (1206×2622 px, pysty)
- **OK** [l2-taulu-uusi.png](kuvat/l2-taulu-uusi.png): 6 UUSI taulu: täsmälleen chatin lasi, vihreä reuna (1206×2622 px, pysty)
- **OK** [l3-chat.png](kuvat/l3-chat.png): 7 chat (hyväksytty) vertailuksi (1206×2622 px, pysty)
- **OK** [b0-ateena.png](kuvat/b0-ateena.png): 7b asema Ateenan yllä päivällä, katse alas (1206×2622 px, pysty)
- **OK** [b1-skannaus.png](kuvat/b1-skannaus.png): 8 skannerihologrammi: avautuu pisteestä, skannaus (1206×2622 px, pysty)
- **OK** [b2-valmis.png](kuvat/b2-valmis.png): 9 hologrammi valmis: pisteruudukko, verkko, faktat (1206×2622 px, pysty)
- **OK** [j0-ennen.png](kuvat/j0-ennen.png): 10 ennen joystickia (Cupola, ohjaamo iso) (1206×2622 px, pysty)
- **OK** [j1-jalkeen.png](kuvat/j1-jalkeen.png): 11 joystickin jälkeen: katse kääntynyt ja pysähtynyt (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 73.16 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 13.81)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
