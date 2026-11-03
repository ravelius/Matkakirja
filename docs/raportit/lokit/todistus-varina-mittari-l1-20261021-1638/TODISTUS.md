# Todistusajo: varina-mittari-l1 7f6ef2a5

**varina-mittari-l1 7f6ef2a5: PUUTE — 2: avauslento alkoi: ei lokiriviä; 2: komentoa ei kuitattu 5 s:ssa (ui-komento.txt: ui juoksupeli valo jaady 1) — seuraava askel/kuva voi näyttää tilan ennen komentoa; 3: konsoli hiljaa 16 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-1.txt**

Laite ipad `A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4`, skenaario `sk-mittari-l1.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-varina-mittari-l1-20261021-1638`.

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

## 3. Poikkeukset ja virherivit
- **PUUTE** konsoli hiljaa 16 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-1.txt
- **PUUTE** konsoli hiljaa 17 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-2.txt
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)

## 4. Stillit tiloista
- **OK** [m1-a.png](kuvat/m1-a.png): MITTAUS 1 A (2752×2064 px, vaaka)
- **OK** [m1-b.png](kuvat/m1-b.png): MITTAUS 1 B (katse 0,03°) (2752×2064 px, vaaka)
- **OK** [m2-a.png](kuvat/m2-a.png): MITTAUS 2 A (2752×2064 px, vaaka)
- **OK** [m2-b.png](kuvat/m2-b.png): MITTAUS 2 B (katse 0,03°) (2752×2064 px, vaaka)
- **OK** [m3-a.png](kuvat/m3-a.png): MITTAUS 3 A (2752×2064 px, vaaka)
- **OK** [m3-b.png](kuvat/m3-b.png): MITTAUS 3 B (katse 0,03°) (2752×2064 px, vaaka)
- **OK** [m4-a.png](kuvat/m4-a.png): MITTAUS 4 A (2752×2064 px, vaaka)
- **OK** [m4-b.png](kuvat/m4-b.png): MITTAUS 4 B (katse 0,03°) (2752×2064 px, vaaka)
- **OK** [m5-a.png](kuvat/m5-a.png): MITTAUS 5 A (2752×2064 px, vaaka)
- **OK** [m5-b.png](kuvat/m5-b.png): MITTAUS 5 B (katse 0,03°) (2752×2064 px, vaaka)
- **OK** [m6-a.png](kuvat/m6-a.png): MITTAUS 6 A (tele) (2752×2064 px, vaaka)
- **OK** [m6-b.png](kuvat/m6-b.png): MITTAUS 6 B (tele) (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 25.61 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 4.07)

## 8. Ei testattu
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
