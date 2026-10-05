# Todistusajo: juna144-ce6a5e18 66516269

**juna144-ce6a5e18 66516269: PUUTE — 5: aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [Silmukka:https://media.matkakirja.app/aane)**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna144j.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna144-ce6a5e18-20261005-2048`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 66516269 = 66516269
- **OK** haaran ce6a5e18 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 32.06 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: asetukset datana` | OK: peli-komento: 33.09 asetus → ok asetukset: oletukset (ei tiedostoa) [Kartta] |
| `tap-teksti ISS-ohjaamo → tap 84.8 650.1` | lähetetty |
| `tap 160 90` | lähetetty |
| `ui-puu: kartta takaisin` | OK: 'Liiku' näkyy (201.0 749.9) |
| `oletus: elävä opas auki (testitila)` | OK: linssit: opas: auki, data Google, TESTI (ei workeria) |
| `ui-puu: kartussi ei näy oppaan aikana` | OK: 'ISO-BRITANNIA' ei näy |
| `tap 374 90` | lähetetty |
| `tap-teksti Poistu linssistä → tap 227.3 243.2` | lähetetty |
| `ui-puu: kartta takaisin (ei tyhjä)` | OK: 'Liiku' näkyy (201.0 749.9) |

- **OK** 4 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-taulu.png](kuvat/01-taulu.png): Pulun taulu (satelliitti) tuoreella pelillä (1206×2622 px, pysty)
- **OK** [02-iss-ohjaamo.png](kuvat/02-iss-ohjaamo.png): ISS-ohjaamo (Cupola) auki (1206×2622 px, pysty)
- **OK** [03-iss-ohjaamo-2.png](kuvat/03-iss-ohjaamo-2.png): ISS-ohjaamo (1206×2622 px, pysty)
- **OK** [04-kartta-iss-jalkeen.png](kuvat/04-kartta-iss-jalkeen.png): Kartta ISS-ohjaamon sulkemisen jälkeen (1206×2622 px, pysty)
- **OK** [05-opas.png](kuvat/05-opas.png): Opas (kevennetty näkymä) (1206×2622 px, pysty)
- **OK** [06-valikko.png](kuvat/06-valikko.png): Oppaan ≡-valikko (1206×2622 px, pysty)
- **OK** [07-opas-poistettu.png](kuvat/07-opas-poistettu.png): Kartta oppaan sulkemisen jälkeen (1206×2622 px, pysty)

## 5. Ääni
- **OK** testimykistys päällä (ei Macin kaiuttimiin)
- **PUUTE** aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [Silmukka:https://media.matkakirja.app/aane)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 91.84): kuormitus 91.84 > 16 ydintä

## 8. Ei testattu
- **EI** opas: chat-vastaukset, puhu/kirjoita, Pöllön 429-raja (ei toistettu), Vaihda kohde maa→kaupunki→vaihto
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
