# Todistusajo: yo-p-peukalot-209 2b0bfb5a

**yo-p-peukalot-209 2b0bfb5a: PUUTE — 3: pitkiä ruutuja kameran liikkeessä 23 (> 20 ms = nykäys; pitkat-ruudut.txt)**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `yo-p.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-yo-p-peukalot-209-20261021-0907`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 2b0bfb5a = 2b0bfb5aa
- **OK** haaran 2b0bfb5aa sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: juoksupeli auki` | OK: juoksupeli: auki |
| `oletus: avauslento ohi` | OK: juoksupeli avaus: OhjausPelaajalle t 15,5 |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **PUUTE** pitkiä ruutuja kameran liikkeessä 23 (> 20 ms = nykäys; pitkat-ruudut.txt)

## 4. Stillit tiloista
- **OK** [p1-normaali.png](kuvat/p1-normaali.png): Peukalokohdat: normaali (kevyt vaalea läpinäkyvä ympyrä) (1206×2622 px, pysty)
- **OK** [p2-rimpuilu-a.png](kuvat/p2-rimpuilu-a.png): Peukalokohdat: rimpuilu (punainen sykkivä hehku, vaihe 1) (1206×2622 px, pysty)
- **OK** [p3-rimpuilu-b.png](kuvat/p3-rimpuilu-b.png): Peukalokohdat: rimpuilu (vaihe 2) (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 32.60 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 12.75)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
