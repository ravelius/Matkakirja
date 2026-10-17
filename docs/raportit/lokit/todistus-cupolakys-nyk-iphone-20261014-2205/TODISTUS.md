# Todistusajo: cupolakys-nyk-iphone 27be919e

**cupolakys-nyk-iphone 27be919e: PUUTE — 2: T pallo telineeseen 5 s:n päästä: ei lokiriviä; 2: T napautus suurentaa: ei lokiriviä; 2: elementtiä 'mk-issohjaamo__lcd' ei ui-puussa**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-cupolakys-iphone.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-cupolakys-nyk-iphone-20261014-2205`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 27be919e = 27be919e
- **OK** haaran 27be919e sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 3726 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/92, karkeita 0, lataus 100 %) |
| `oletus: T pallo telineeseen 5 s:n päästä` | PUUTE: ei riviä 8 s:ssa |
| `tap-kohta 0.5 0.5 mk-astrokuva__sijaintipallo → tap 330.0 176.0` | lähetetty |
| `oletus: T napautus suurentaa` | PUUTE: ei riviä 3 s:ssa |
| `tap 200 380` | lähetetty |
| `tap-kohta 0.5 0.5 mk-issohjaamo__lcd` | EI LÖYDY ui-puusta |
| `oletus: C kohde valittu` | PUUTE: ei riviä 10 s:ssa |

- **PUUTE** T pallo telineeseen 5 s:n päästä: ei lokiriviä
- **PUUTE** T napautus suurentaa: ei lokiriviä
- **PUUTE** elementtiä 'mk-issohjaamo__lcd' ei ui-puussa
- **PUUTE** C kohde valittu: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [c0-cupola.png](kuvat/c0-cupola.png): 1 Cupola: pienoispallo iso (1206×2622 px, pysty)
- **OK** [c0b-teline.png](kuvat/c0b-teline.png): 1b pienoispallo telineessä oikeassa reunassa (1206×2622 px, pysty)
- **OK** [c0c-iso.png](kuvat/c0c-iso.png): 1c napautus: pallo iso (10 s) (1206×2622 px, pysty)
- **OK** [c0d-nimet-kaannetty.png](kuvat/c0d-nimet-kaannetty.png): 1d paikannimet Cupolaa käännettäessä: pystyssä (1206×2622 px, pysty)
- **OK** [c0e-nimet-takaisin.png](kuvat/c0e-nimet-takaisin.png): 1e paikannimet takaisin käännettynä (1206×2622 px, pysty)
- **OK** [c1-ikkuna.png](kuvat/c1-ikkuna.png): 2 ikkunan napautus (UUSI: ei mitään) (1206×2622 px, pysty)
- **OK** [c2-naytto.png](kuvat/c2-naytto.png): 3 vihreän näytön napautus (UUSI: kohdelista, ylärivillä valittu vuorokaudenaika, vuodenaika ja LIVE) (1206×2622 px, pysty)
- **OK** [c3-vaihtoehdot.png](kuvat/c3-vaihtoehdot.png): 4 vuorokaudenajan napautus: vaihtoehdot ylärivin alle (1206×2622 px, pysty)
- **OK** [c3b-valinta-3s.png](kuvat/c3b-valinta-3s.png): 5 kohteen valinnan jälkeen 3 s: Cupola pysyy, katse ennallaan (1206×2622 px, pysty)
- **OK** [c3c-valinta-10s.png](kuvat/c3c-valinta-10s.png): 6 kohteen valinnan jälkeen 10 s: Cupola ja maa terävä (1206×2622 px, pysty)
- **OK** [c4-pulu-taulu.png](kuvat/c4-pulu-taulu.png): 7 Pulun napautus → taulu (UUSI: ei valmiita kysymyksiä) (1206×2622 px, pysty)
- **OK** [c5-kysy-pululta.png](kuvat/c5-kysy-pululta.png): 8 Kysy Pululta → chat ja valmiit kysymykset (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 73.10 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 9.08): xcodebuild 

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
