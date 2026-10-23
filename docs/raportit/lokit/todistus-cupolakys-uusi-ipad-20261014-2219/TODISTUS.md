# Todistusajo: cupolakys-uusi-ipad 43ed5539

**cupolakys-uusi-ipad 43ed5539: PUUTE — 2: elementtiä 'mk-issohjaamo__lcd' ei ui-puussa**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-cupolakys-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-cupolakys-uusi-ipad-20261014-2219`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 43ed5539 = 43ed5539
- **OK** haaran 43ed5539 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 3832 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/89, karkeita 0, lataus 97 %) |
| `oletus: T pallo telineeseen 5 s:n päästä` | OK: iss: pienoispallo telineeseen |
| `tap-kohta 0.5 0.5 mk-astrokuva__sijaintipallo → tap 730.0 1168.0` | lähetetty |
| `oletus: T napautus suurentaa` | OK: iss: pienoispallo iso (10 s) |
| `tap 600 330` | lähetetty |
| `tap-kohta 0.5 0.5 mk-issohjaamo__lcd` | EI LÖYDY ui-puusta |
| `oletus: C kohde valittu` | OK: kupoli: valikko khufrah LIVE → 2026-10-17 11.04.48 UTC, sivussa 87,2 km, ISS (23,68, 22,63) |

- **PUUTE** elementtiä 'mk-issohjaamo__lcd' ei ui-puussa

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [c0-cupola.png](kuvat/c0-cupola.png): 1 Cupola: pienoispallo iso (2420×1668 px, vaaka)
- **OK** [c0b-teline.png](kuvat/c0b-teline.png): 1b pienoispallo telineessä oikeassa reunassa (2420×1668 px, vaaka)
- **OK** [c0c-iso.png](kuvat/c0c-iso.png): 1c napautus: pallo iso (10 s) (2420×1668 px, vaaka)
- **OK** [c0d-nimet-kaannetty.png](kuvat/c0d-nimet-kaannetty.png): 1d paikannimet Cupolaa käännettäessä: pystyssä (2420×1668 px, vaaka)
- **OK** [c0e-nimet-takaisin.png](kuvat/c0e-nimet-takaisin.png): 1e paikannimet takaisin käännettynä (2420×1668 px, vaaka)
- **OK** [c1-ikkuna.png](kuvat/c1-ikkuna.png): 2 ikkunan napautus (UUSI: ei mitään) (2420×1668 px, vaaka)
- **OK** [c2-naytto.png](kuvat/c2-naytto.png): 3 vihreän näytön napautus (UUSI: kohdelista, ylärivillä valittu vuorokaudenaika, vuodenaika ja LIVE) (2420×1668 px, vaaka)
- **OK** [c3-vaihtoehdot.png](kuvat/c3-vaihtoehdot.png): 4 vuorokaudenajan napautus: vaihtoehdot ylärivin alle (2420×1668 px, vaaka)
- **OK** [c3b-valinta-3s.png](kuvat/c3b-valinta-3s.png): 5 kohteen valinnan jälkeen 3 s: Cupola pysyy, katse ennallaan (2420×1668 px, vaaka)
- **OK** [c3c-valinta-10s.png](kuvat/c3c-valinta-10s.png): 6 kohteen valinnan jälkeen 10 s: Cupola ja maa terävä (2420×1668 px, vaaka)
- **OK** [c4-pulu-taulu.png](kuvat/c4-pulu-taulu.png): 7 Pulun napautus → taulu (UUSI: ei valmiita kysymyksiä) (2420×1668 px, vaaka)
- **OK** [c5-kysy-pululta.png](kuvat/c5-kysy-pululta.png): 8 Kysy Pululta → chat ja valmiit kysymykset (2420×1668 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 77.71 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 40.17): xcodebuild | kuormitus 40.17 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
