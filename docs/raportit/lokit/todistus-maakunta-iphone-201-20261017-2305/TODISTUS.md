# Todistusajo: maakunta-iphone-201 65cb17d6

**maakunta-iphone-201 65cb17d6: PUUTE — 2: komentoa ei kuitattu 5 s:ssa (ui-komento.txt: ui maakunnat) — seuraava askel/kuva voi näyttää tilan ennen komentoa; 2: elementtiä 'mk-maakunnat__lkuva' ei ui-puussa; 3: konsoli hiljaa 34 s (jäätyminen?): pinonäyte pinonayte-1.txt**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-maakunta-201.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-maakunta-iphone-201-20261017-2305`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 65cb17d6 = 65cb17d60
- **OK** haaran natiivi-ui/maakunta-suoraan-201 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `tap-kohta 0.9 0.5 mk-maakunnat__lteksti → tap 343.4 105.1` | lähetetty |
| `tap-kohta 0.9 0.5 mk-maakunnat__lteksti → tap 343.4 105.1` | lähetetty |
| `tap-kohta 0.5 0.5 mk-maakunnat__lkuva` | EI LÖYDY ui-puusta |
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: lataus valmis` | OK: raketti: lataus valmis 0,0 s (kaikki), avaus 17,1 s |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 3548 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/72, karkeita 0, lataus 91 %) |
| `polku 201,460,0 201,380,120 201,300,120 201,220,120 201,132,120 201,130,40` | lähetetty |

- **VIRHE** komentoa ei kuitattu 5 s:ssa (ui-komento.txt: ui maakunnat) — seuraava askel/kuva voi näyttää tilan ennen komentoa
- **PUUTE** elementtiä 'mk-maakunnat__lkuva' ei ui-puussa

## 3. Poikkeukset ja virherivit
- **PUUTE** konsoli hiljaa 34 s (jäätyminen?): pinonäyte pinonayte-1.txt
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [L1-lappu.png](kuvat/L1-lappu.png): Maakunnan lappu: "Lue lisää" tekstin lopussa (1179×2556 px, pysty)
- **OK** [M1-nyk.png](kuvat/M1-nyk.png): NYK: Lue lisää → esittely (kuva, otsikko, 1. kappale, LISÄÄ-nappi) (1179×2556 px, pysty)
- **OK** [M2-uusi.png](kuvat/M2-uusi.png): UUSI: Lue lisää → suoraan täysi artikkeli (1179×2556 px, pysty)
- **OK** [M3-uusi-kuva.png](kuvat/M3-uusi-kuva.png): UUSI: lapun pikkukuva → suoraan täysi artikkeli (1179×2556 px, pysty)
- **OK** [I0-poyta.png](kuvat/I0-poyta.png): ISS nyt: ikkuna ja ohjauspöytä ilman valikkoa (luonnoksen tausta) (1179×2556 px, pysty)
- **OK** [I1-valikko-nyk.png](kuvat/I1-valikko-nyk.png): Kohdevalikko nyt (säädöt + kohteet samassa ikkunassa) (1179×2556 px, pysty)
- **OK** [I2-valikko-nyk-alas.png](kuvat/I2-valikko-nyk-alas.png): Kohdevalikko nyt vieritettynä (1179×2556 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 72.22 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 3.89)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
