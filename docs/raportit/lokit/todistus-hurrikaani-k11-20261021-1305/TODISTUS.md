# Todistusajo: hurrikaani-k11 1ddd8fad

**hurrikaani-k11 1ddd8fad: PUUTE — 3: pitkiä ruutuja kameran liikkeessä 2774 (> 20 ms = nykäys; pitkat-ruudut.txt)**

Laite ipad `A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4`, skenaario `sk-k11.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-hurrikaani-k11-20261021-1305`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 1ddd8fad = 1ddd8fad0
- **OK** haaran linssiseppa2/iss-nostot-204 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: cupola` | OK: raketti: cupola |
| `oletus: siirto` | OK: linssit: astro kyyti siirra: alus siirtyy (29,100, -72,100) |
| `oletus: siirto` | OK: linssit: astro kyyti siirra: alus siirtyy (29,100, -72,100) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **PUUTE** pitkiä ruutuja kameran liikkeessä 2774 (> 20 ms = nykäys; pitkat-ruudut.txt)

## 4. Stillit tiloista
- **OK** [v1-ylhaalta.png](kuvat/v1-ylhaalta.png): Hurrikaani ylhäältä (LAAJA) (2064×2752 px, pysty)
- **OK** [v1z-silma.png](kuvat/v1z-silma.png): Silmä ylhäältä (zoom 12°) (2064×2752 px, pysty)
- **OK** [v2-vinosti.png](kuvat/v2-vinosti.png): Hurrikaani vinosti horisonttiin päin (LAAJA) (2064×2752 px, pysty)
- **OK** [v2z-vinosti-zoom.png](kuvat/v2z-vinosti-zoom.png): Hurrikaani vinosti (zoom 35°) (2064×2752 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.13 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 5.99)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
