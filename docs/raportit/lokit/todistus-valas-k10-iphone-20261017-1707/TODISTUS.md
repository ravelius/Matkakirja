# Todistusajo: valas-k10-iphone 9f0e8e14

**valas-k10-iphone 9f0e8e14: OK**

Laite iphone `8D1FD618-A7BD-48F8-8BB4-3E91A95834FD`, skenaario `sk-valas-k3.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-valas-k10-iphone-20261017-1707`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 9f0e8e14 = 9f0e8e14
- **OK** haaran 4116ed18e sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: kello siirretty (yö)` | OK: raketti: kello 2026-10-17 16.09 UTC |
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (ensimmäinen, täysi 75 s) |
| `oletus: lataus valmis` | OK: raketti: lataus valmis 2,6 s (kaikki), avaus 17,1 s |
| `oletus: alustalla, odottaa käynnistystä` | OK: raketti: avaus ohi, alustalla: odottaa käynnistystä |
| `oletus: VAT ladattu (ei vanhaa roisketta)` | OK: raketti: valaan VAT 72×92 × 108 ruutua (24 fps, 4,46 s), tekstuuri 1152×1288, pisaroita 24225, kärkiä 6624/97120/4656 (rivi 578 jo ennen askelta, askel alkoi rivillä 606) |
| `oletus: pelin kamera palasi hypyn jälkeen` | OK: raketti: valaan kamera: palasi |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [p-r1.png](kuvat/p-r1.png): PYSTY: alustakamera ennen hyppyä (1206×2622 px, pysty)
- **OK** [p-v1.png](kuvat/p-v1.png): PYSTY pelin kamera: valas nousee, puoliksi ilmassa (Codex v1) (1206×2622 px, pysty)
- **OK** [p-huippu.png](kuvat/p-huippu.png): PYSTY pelin kamera: hypyn huippu (1206×2622 px, pysty)
- **OK** [p-isku015.png](kuvat/p-isku015.png): PYSTY pelin kamera: isku +0,15 s (1206×2622 px, pysty)
- **OK** [p-isku05.png](kuvat/p-isku05.png): PYSTY pelin kamera: isku +0,5 s (suihkupatsas) (1206×2622 px, pysty)
- **OK** [p-1s.png](kuvat/p-1s.png): PYSTY pelin kamera: roiske 1 s iskun jälkeen (Codex v2) (1206×2622 px, pysty)
- **OK** [p-2s.png](kuvat/p-2s.png): PYSTY pelin kamera: roiske 2 s (1206×2622 px, pysty)
- **OK** [p-3s.png](kuvat/p-3s.png): PYSTY pelin kamera: vaahto ja renkaat 3 s (1206×2622 px, pysty)
- **OK** [p-4s.png](kuvat/p-4s.png): PYSTY pelin kamera: vaahto hajoaa 4 s (1206×2622 px, pysty)
- **OK** [v-v1.png](kuvat/v-v1.png): VAAKA pelin kamera: valas nousee (Codex v1) (2622×1206 px, vaaka)
- **OK** [v-huippu.png](kuvat/v-huippu.png): VAAKA pelin kamera: hypyn huippu (2622×1206 px, vaaka)
- **OK** [v-isku05.png](kuvat/v-isku05.png): VAAKA pelin kamera: isku +0,5 s (2622×1206 px, vaaka)
- **OK** [v-1s.png](kuvat/v-1s.png): VAAKA pelin kamera: roiske 1 s (Codex v2) (2622×1206 px, vaaka)
- **OK** [v-3s.png](kuvat/v-3s.png): VAAKA pelin kamera: vaahto ja renkaat 3 s (2622×1206 px, vaaka)
- **OK** [t-v1.png](kuvat/t-v1.png): PYSTY testikamera (lisä): valas nousee (1206×2622 px, pysty)
- **OK** [t-1s.png](kuvat/t-1s.png): PYSTY testikamera (lisä): roiske 1 s (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 32.40 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 10.31): Unity -batchmode 

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
