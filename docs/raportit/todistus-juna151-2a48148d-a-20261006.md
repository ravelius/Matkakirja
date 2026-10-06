# Todistusajo: juna151-a 6a4d92de

**juna151-a 6a4d92de: OK**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna151a.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna151-a-20261006-1732`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 6a4d92de = 6a4d92de

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 34.13 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: asetukset datana` | OK: peli-komento: 35.17 asetus → ok asetukset: oletukset (ei tiedostoa) [Kartta] |
| `ui-puu: käynnistys: kartta ja Liiku näkyvät` | OK: 'Liiku' näkyy (201.0 749.9) |
| `tap-teksti ISS-ohjaamo → tap 84.8 650.1` | lähetetty |
| `ui-puu: kartta ehjä ISS:n jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |
| `oletus: oppaan aloitusvalikko auki` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |

- **OK** 1 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-kartta.png](kuvat/01-kartta.png): Kartta käynnistyksen jälkeen (1206×2622 px, pysty)
- **OK** [02-iss.png](kuvat/02-iss.png): ISS-ohjaamo (1206×2622 px, pysty)
- **OK** [03-aloitusvalikko.png](kuvat/03-aloitusvalikko.png): Oppaan aloitusvalikko (täkyt, maanosat, suosikki) (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 29.00 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 21.14): Unity -batchmode | kuormitus 21.14 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
