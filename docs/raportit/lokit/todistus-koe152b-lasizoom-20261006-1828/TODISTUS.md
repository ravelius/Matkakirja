# Todistusajo: koe152b-lasizoom 4bac4faa

**koe152b-lasizoom 4bac4faa: OK**

Laite ipad `CD526454-E966-48B4-AB1F-9EFDAA0BEF53`, skenaario `15-iss-lasizoom.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-koe152b-lasizoom-20261006-1828`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 4bac4faa = 4bac4faa

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupolaan` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (12,51, -135,37) 424 km suunta 36°, laatu Tarkka, kamera (-50,40, 148,69) 10484 km kall 0,0° suunt 0° fov 50 |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [15a-cupola.png](kuvat/15a-cupola.png): ISS-ohjaamo (Cupola) 20 s, ei kosketuksia (2064×2752 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.22 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 56.74): xcodebuild | kuormitus 56.74 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
