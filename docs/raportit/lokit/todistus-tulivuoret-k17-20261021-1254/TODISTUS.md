# Todistusajo: tulivuoret-k17 1ddd8fad

**tulivuoret-k17 1ddd8fad: PUUTE — 3: pitkiä ruutuja kameran liikkeessä 6038 (> 20 ms = nykäys; pitkat-ruudut.txt)**

Laite ipad `A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4`, skenaario `sk-k17.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-tulivuoret-k17-20261021-1254`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 1ddd8fad = 1ddd8fad0
- **OK** haaran linssiseppa2/iss-nostot-204 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: cupola` | OK: raketti: cupola |
| `oletus: siirto` | OK: linssit: astro kyyti siirra: alus siirtyy (48,092, 153,200) |
| `oletus: siirto` | OK: linssit: astro kyyti siirra: alus siirtyy (48,092, 153,200) |
| `oletus: siirto` | OK: linssit: astro kyyti siirra: alus siirtyy (48,092, 153,200) |
| `oletus: siirto` | OK: linssit: astro kyyti siirra: alus siirtyy (48,092, 153,200) |
| `oletus: siirto` | OK: linssit: astro kyyti siirra: alus siirtyy (48,092, 153,200) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **PUUTE** pitkiä ruutuja kameran liikkeessä 6038 (> 20 ms = nykäys; pitkat-ruudut.txt)

## 4. Stillit tiloista
- **OK** [v1-sarytsev.png](kuvat/v1-sarytsev.png): Sarytšev pilvihattu + pilviaukko (vinosti) (zoom 3°) (2064×2752 px, pysty)
- **OK** [w1-sarytsev-laaja.png](kuvat/w1-sarytsev-laaja.png): Sarytšev pilvihattu + pilviaukko (vinosti) (LAAJA) (2064×2752 px, pysty)
- **OK** [v2-etna.png](kuvat/v2-etna.png): Etna tuhkavana Välimeren yli (zoom 45°) (2064×2752 px, pysty)
- **OK** [w2-etna-laaja.png](kuvat/w2-etna-laaja.png): Etna tuhkavana Välimeren yli (LAAJA) (2064×2752 px, pysty)
- **OK** [v3-raikoke.png](kuvat/v3-raikoke.png): Raikoke sateenvarjo + kaulus (zoom 3°) (2064×2752 px, pysty)
- **OK** [w3-raikoke-laaja.png](kuvat/w3-raikoke-laaja.png): Raikoke sateenvarjo + kaulus (LAAJA) (2064×2752 px, pysty)
- **OK** [v4-hunga-tonga.png](kuvat/v4-hunga-tonga.png): Hunga Tonga sateenvarjo ~500 km (LAAJA) (2064×2752 px, pysty)
- **OK** [w4-hunga-tonga-laaja.png](kuvat/w4-hunga-tonga-laaja.png): Hunga Tonga sateenvarjo ~500 km (LAAJA) (2064×2752 px, pysty)
- **OK** [v5-reykjanes.png](kuvat/v5-reykjanes.png): Reykjanes yöllä hehkuva laava (zoom 6°) (2064×2752 px, pysty)
- **OK** [w5-reykjanes-laaja.png](kuvat/w5-reykjanes-laaja.png): Reykjanes yöllä hehkuva laava (LAAJA) (2064×2752 px, pysty)
- **OK** [v6-hunga-tonga-kasvaa.png](kuvat/v6-hunga-tonga-kasvaa.png): Hunga Tonga kasvuvaiheessa 0,35 (2064×2752 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 26.78 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 8.70)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
