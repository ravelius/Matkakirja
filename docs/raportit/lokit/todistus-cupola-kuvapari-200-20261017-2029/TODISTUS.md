# Todistusajo: cupola-kuvapari-200 959dfbc1

**cupola-kuvapari-200 959dfbc1: PUUTE — 1: haaran pelikoodari/galleria-200 EI sisälly käännökseen 959dfbc1 (tai commit puuttuu proto-gitistä)**

Laite ipad `00CF62C2-2FE6-4993-8475-5786CC40A7A3`, skenaario `sk-cupola-kuvapari.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-cupola-kuvapari-200-20261017-2029`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 959dfbc1 = 959dfbc1
- **PUUTE** haaran pelikoodari/galleria-200 EI sisälly käännökseen 959dfbc1 (tai commit puuttuu proto-gitistä)

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: lataus valmis` | OK: raketti: lataus valmis 0,0 s (kaikki), avaus 17,1 s |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4109 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/104, karkeita 0, lataus 75 %) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [cupola-1-0.png](kuvat/cupola-1-0.png): Cupola renderScale 1,0 (täysi profiili) (2064×2752 px, pysty)
- **OK** [cupola-0-7.png](kuvat/cupola-0-7.png): Cupola renderScale 0,7, MSAA 1, bloom pois (lämpösuojan profiili) (2064×2752 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 25.83 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 12.19): xcodebuild 

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
