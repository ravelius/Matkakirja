# Todistusajo: maakunta-ipad-201c 65cb17d6

**maakunta-ipad-201c 65cb17d6: OK**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-maakunta-201c.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-maakunta-ipad-201c-20261017-2327`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 65cb17d6 = 65cb17d60
- **OK** haaran natiivi-ui/maakunta-suoraan-201 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `tap-kohta 0.9 0.5 mk-maakunnat__lteksti → tap 784.6 162.2` | lähetetty |
| `tap-kohta 0.9 0.5 mk-maakunnat__lteksti → tap 784.6 162.2` | lähetetty |
| `tap-kohta 0.5 0.5 mk-maakunnat__lkuva → tap 485.0 175.5` | lähetetty |

- **OK** 3 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [L1-lappu.png](kuvat/L1-lappu.png): Maakunnan lappu: "Lue lisää" tekstin lopussa (1668×2420 px, pysty)
- **OK** [M1-nyk.png](kuvat/M1-nyk.png): NYK: Lue lisää → esittely (kuva, otsikko, 1. kappale, LISÄÄ-nappi) (1668×2420 px, pysty)
- **OK** [M2-uusi.png](kuvat/M2-uusi.png): UUSI: Lue lisää → suoraan täysi artikkeli (1668×2420 px, pysty)
- **OK** [M3-uusi-kuva.png](kuvat/M3-uusi-kuva.png): UUSI: lapun pikkukuva → suoraan täysi artikkeli (1668×2420 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 106.99 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 23.50): Unity -batchmode xcodebuild | kuormitus 23.50 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
