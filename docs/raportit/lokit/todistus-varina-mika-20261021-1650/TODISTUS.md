# Todistusajo: varina-mika 7f6ef2a5

**varina-mika 7f6ef2a5: PUUTE — 2: avauslento alkoi: ei lokiriviä; 2: komentoa ei kuitattu 5 s:ssa (ui-komento.txt: ui juoksupeli valo jaady 1) — seuraava askel/kuva voi näyttää tilan ennen komentoa; 2: komentoa ei kuitattu 5 s:ssa (ui-komento.txt: ui juoksupeli mika 0.2 0.15) — seuraava askel/kuva voi näyttää tilan ennen komentoa**

Laite ipad `A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4`, skenaario `sk-mika.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-varina-mika-20261021-1650`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 7f6ef2a5 = 7f6ef2a58
- **OK** haaran linssiseppa2/kierros2-paiva sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: avauslento alkoi` | PUUTE: ei riviä 90 s:ssa |

- **PUUTE** avauslento alkoi: ei lokiriviä
- **VIRHE** komentoa ei kuitattu 5 s:ssa (ui-komento.txt: ui juoksupeli valo jaady 1) — seuraava askel/kuva voi näyttää tilan ennen komentoa
- **VIRHE** komentoa ei kuitattu 5 s:ssa (ui-komento.txt: ui juoksupeli mika 0.2 0.15) — seuraava askel/kuva voi näyttää tilan ennen komentoa

## 3. Poikkeukset ja virherivit
- **PUUTE** konsoli hiljaa 17 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-1.txt
- **PUUTE** konsoli hiljaa 16 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-2.txt
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)

## 4. Stillit tiloista
- **OK** [q8.png](kuvat/q8.png): MIKÄ 8 s (2064×2752 px, pysty)
- **OK** [q12.png](kuvat/q12.png): MIKÄ 12 s (2752×2064 px, vaaka)
- **OK** [q16.png](kuvat/q16.png): MIKÄ 16 s (2752×2064 px, vaaka)
- **OK** [q20.png](kuvat/q20.png): MIKÄ 20 s (2752×2064 px, vaaka)
- **OK** [q24.png](kuvat/q24.png): MIKÄ 24 s (2752×2064 px, vaaka)
- **OK** [q28.png](kuvat/q28.png): MIKÄ 28 s (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 25.55 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 4.28)

## 8. Ei testattu
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
