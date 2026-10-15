# Todistusajo: juna154-b 787db464

**juna154-b 787db464: OK**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna154b.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna154-b-20261006-2206`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 787db464 = 787db464

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 34.22 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: aloitusvalikko auki` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |
| `tap-teksti Sydneyn oopperatalo → tap 224.0 612.4` | lähetetty |
| `oletus: Sydney valittu` | OK: linssit: opas: täky valittu Sydneyn oopperatalo (Sydney, AU) |
| `tap 46 778` | lähetetty |
| `tap 41 90` | lähetetty |
| `tap 41 90` | lähetetty |
| `tap 144 778` | lähetetty |
| `tap 144 778` | lähetetty |
| `tap 203 778` | lähetetty |
| `tap 203 778` | lähetetty |
| `tap 374 90` | lähetetty |
| `tap-teksti Poistu linssistä → tap 229.5 327.1` | lähetetty |
| `ui-puu: kartta palaa ehjänä oppaan jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |

- **OK** 10 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-linssivalikko.png](kuvat/01-linssivalikko.png): Linssivalikko (valitsin) (1206×2622 px, pysty)
- **OK** [02-nappirivi.png](kuvat/02-nappirivi.png): Nappirivi avattu (>) (1206×2622 px, pysty)
- **OK** [03-paiva-yo.png](kuvat/03-paiva-yo.png): Päivä/yö (AUTO) -nappia painettu (1206×2622 px, pysty)
- **OK** [04-kysy.png](kuvat/04-kysy.png): Kysy-paneeli (1206×2622 px, pysty)
- **OK** [05-liiku.png](kuvat/05-liiku.png): Liiku-paneeli (1206×2622 px, pysty)
- **OK** [06-valikko.png](kuvat/06-valikko.png): ≡-valikko (1206×2622 px, pysty)
- **OK** [07-kartta.png](kuvat/07-kartta.png): Kartta oppaan sulkemisen jälkeen (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 29.12 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 163.29): kuormitus 163.29 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
