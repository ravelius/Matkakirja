# Todistusajo: maakunta-iphone-201c f784c053

**maakunta-iphone-201c f784c053: OK**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-maakunta-201c.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-maakunta-iphone-201c-20261017-2345`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt f784c053 = f784c0532
- **OK** haaran natiivi-ui/maakunta-suoraan-201 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `tap-kohta 0.9 0.5 mk-maakunnat__lteksti → tap 354.0 173.9` | lähetetty |
| `tap-kohta 0.9 0.5 mk-maakunnat__lteksti → tap 354.0 173.9` | lähetetty |
| `tap-kohta 0.5 0.5 mk-maakunnat__lkuva → tap 143.0 153.3` | lähetetty |

- **OK** 3 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [L1-lappu.png](kuvat/L1-lappu.png): Maakunnan lappu: "Lue lisää" tekstin lopussa (1179×2556 px, pysty)
- **OK** [M1-nyk.png](kuvat/M1-nyk.png): NYK: Lue lisää → esittely (kuva, otsikko, 1. kappale, LISÄÄ-nappi) (1179×2556 px, pysty)
- **OK** [M2-uusi.png](kuvat/M2-uusi.png): UUSI: Lue lisää → suoraan täysi artikkeli (1179×2556 px, pysty)
- **OK** [M3-uusi-kuva.png](kuvat/M3-uusi-kuva.png): UUSI: lapun pikkukuva → suoraan täysi artikkeli (1179×2556 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 71.88 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 25.81): Unity -batchmode | kuormitus 25.81 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
