# Todistusajo: varina-video-l1 7f6ef2a5

**varina-video-l1 7f6ef2a5: PUUTE — 2: avauslento alkoi: ei lokiriviä; 2: komentoa ei kuitattu 5 s:ssa (ui-komento.txt: ui juoksupeli pois) — seuraava askel/kuva voi näyttää tilan ennen komentoa**

Laite ipad `A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4`, skenaario `sk-video.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-varina-video-l1-20261021-1645`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 7f6ef2a5 = 7f6ef2a58
- **OK** haaran linssiseppa2/kierros2-paiva sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: avauslento alkoi` | PUUTE: ei riviä 90 s:ssa |

- **PUUTE** avauslento alkoi: ei lokiriviä
- **VIRHE** komentoa ei kuitattu 5 s:ssa (ui-komento.txt: ui juoksupeli pois) — seuraava askel/kuva voi näyttää tilan ennen komentoa

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)

## 4. Stillit tiloista
- **OK** [v0.png](kuvat/v0.png): VIDEO alkaa (2064×2752 px, pysty)
- **OK** [v1.png](kuvat/v1.png): VIDEO loppuu (2064×2752 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.30 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 19.84): Unity -batchmode | kuormitus 19.84 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
