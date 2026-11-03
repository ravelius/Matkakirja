# Todistusajo: maakunta-ipad-201 65cb17d6

**maakunta-ipad-201 65cb17d6: PUUTE — 2: elementtiä 'mk-maakunnat__lkuva' ei ui-puussa**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-maakunta-201.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-maakunta-ipad-201-20261017-2310`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 65cb17d6 = 65cb17d60
- **OK** haaran natiivi-ui/maakunta-suoraan-201 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `tap-kohta 0.9 0.5 mk-maakunnat__lteksti → tap 770.0 105.0` | lähetetty |
| `tap-kohta 0.9 0.5 mk-maakunnat__lteksti → tap 770.0 105.0` | lähetetty |
| `tap-kohta 0.5 0.5 mk-maakunnat__lkuva` | EI LÖYDY ui-puusta |
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: lataus valmis` | OK: raketti: lataus valmis 0,0 s (kaikki), avaus 17,1 s |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4082 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/44, karkeita 0, lataus 87 %) |
| `polku 201,460,0 201,380,120 201,300,120 201,220,120 201,132,120 201,130,40` | lähetetty |

- **PUUTE** elementtiä 'mk-maakunnat__lkuva' ei ui-puussa

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [L1-lappu.png](kuvat/L1-lappu.png): Maakunnan lappu: "Lue lisää" tekstin lopussa (1668×2420 px, pysty)
- **OK** [M1-nyk.png](kuvat/M1-nyk.png): NYK: Lue lisää → esittely (kuva, otsikko, 1. kappale, LISÄÄ-nappi) (1668×2420 px, pysty)
- **OK** [M2-uusi.png](kuvat/M2-uusi.png): UUSI: Lue lisää → suoraan täysi artikkeli (1668×2420 px, pysty)
- **OK** [M3-uusi-kuva.png](kuvat/M3-uusi-kuva.png): UUSI: lapun pikkukuva → suoraan täysi artikkeli (1668×2420 px, pysty)
- **OK** [I0-poyta.png](kuvat/I0-poyta.png): ISS nyt: ikkuna ja ohjauspöytä ilman valikkoa (luonnoksen tausta) (1668×2420 px, pysty)
- **OK** [I1-valikko-nyk.png](kuvat/I1-valikko-nyk.png): Kohdevalikko nyt (säädöt + kohteet samassa ikkunassa) (1668×2420 px, pysty)
- **OK** [I2-valikko-nyk-alas.png](kuvat/I2-valikko-nyk-alas.png): Kohdevalikko nyt vieritettynä (1668×2420 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 71.91 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 11.58): xcodebuild 

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
