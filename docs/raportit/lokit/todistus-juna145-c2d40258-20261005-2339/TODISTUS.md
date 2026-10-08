# Todistusajo: juna145-c2d40258 cba50a28

**juna145-c2d40258 cba50a28: OK**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna145.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna145-c2d40258-20261005-2339`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt cba50a28 = cba50a28

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 32.22 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: asetukset datana` | OK: peli-komento: 33.26 asetus → ok asetukset: oletukset (ei tiedostoa) [Kartta] |
| `ui-puu: käynnistys: kartta ja Liiku näkyvät` | OK: 'Liiku' näkyy (201.0 749.9) |
| `tap-teksti ISS-ohjaamo → tap 84.8 650.1` | lähetetty |
| `ui-puu: kartta ehjä ISS:n jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |
| `tap 374 90` | lähetetty |
| `tap-teksti Poistu linssistä → tap 229.5 243.0` | lähetetty |
| `ui-puu: kartta palaa ehjänä oppaan jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |
| `tap 374 784` | lähetetty |
| `tap 317 650` | lähetetty |
| `tap 264 682` | lähetetty |
| `oletus: Laituri k1` | OK: linssit: poikki: kuunnelma laituri alkaa (edellinen -) |

- **OK** 6 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-kartta.png](kuvat/01-kartta.png): Kartta käynnistyksen jälkeen (1206×2622 px, pysty)
- **OK** [02-iss.png](kuvat/02-iss.png): ISS-ohjaamo (1206×2622 px, pysty)
- **OK** [03-kartta-iss-jalkeen.png](kuvat/03-kartta-iss-jalkeen.png): Kartta ISS:n jälkeen (1206×2622 px, pysty)
- **OK** [04-opas.png](kuvat/04-opas.png): Opas (1 avaus) (1206×2622 px, pysty)
- **OK** [05-kartta-oppaan-jalkeen.png](kuvat/05-kartta-oppaan-jalkeen.png): Kartta oppaan jälkeen (1206×2622 px, pysty)
- **OK** [06-linna.png](kuvat/06-linna.png): Olavinlinna (2622×1206 px, vaaka)
- **OK** [07-linna-laituri.png](kuvat/07-linna-laituri.png): Laituri (2622×1206 px, vaaka)

## 5. Ääni
- **OK** testimykistys päällä (ei Macin kaiuttimiin)
- **EI** erässä ei äänikaappausta (skenaariossa ei aani-/aanitaso-riviä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 33.85): kuormitus 33.85 > 16 ydintä

## 8. Ei testattu
- **EI** Vaihda kohde (valikko), vastaussirut (Pöllön testitunnus ei vielä julki)
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
