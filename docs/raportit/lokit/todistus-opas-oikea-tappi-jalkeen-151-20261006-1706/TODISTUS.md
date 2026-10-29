# Todistusajo: opas-oikea-tappi-jalkeen-151 a6c86fcb

**opas-oikea-tappi-jalkeen-151 a6c86fcb: PUUTE — 2: täkynäkymä: 'MIHIN LENNETÄÄN' ei näy**

Laite ipad `CD526454-E966-48B4-AB1F-9EFDAA0BEF53`, skenaario `13-opas-oikea-tappi.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-opas-oikea-tappi-jalkeen-151-20261006-1706`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt a6c86fcb = a6c86fcb
- **OK** haaran 1ec7d900 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: testiotsake päällä` | OK: linssit: opas: kiinni |
| `oletus: elävä opas aukesi` | OK: linssit: opas: auki, data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: täkyt workerilta` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |
| `ui-puu: täkynäkymä` | PUUTE |
| `tap-teksti mk-linssirivi__nimi → tap 789.0 62.2` | lähetetty |
| `oletus: 1. kohde saapui` | OK: linssit: opas: saapui Eiffel-torni (48,8582, 2,2945), ääni ei, laatat 100 % |
| `oletus: kohteen vastaus` | OK: linssit: opas: vastaus 1 Eiffel-torni (5,5 s), ääni ei |
| `oletus: tapit näkyvissä` | OK: ui-komento: ui opasvalikko tapit → =opas: tapit näkyy, vasen 0,00 @ 12,1200 64×64, oikea 0,00,0,00 @ 956,1200 64×64, kosketaan False |
| `veto-kohta 0.5 0.5 0.95 0.5 3 mk-tappi--oikea → polku 988.0 1232.0 → 1016.8 1232.0, pito 3 s` | lähetetty |
| `veto-kohta 0.5 0.5 0.05 0.5 3 mk-tappi--oikea → polku 988.0 1232.0 → 959.2 1232.0, pito 3 s` | lähetetty |
| `veto-kohta 0.5 0.5 0.5 0.05 2 mk-tappi--vasen → polku 44.0 1232.0 → 44.0 1203.2, pito 2 s` | lähetetty |
| `veto-kohta 0.5 0.5 0.5 0.95 2 mk-tappi--vasen → polku 44.0 1232.0 → 44.0 1260.8, pito 2 s` | lähetetty |
| `veto 400 600 650 600 1.0` | lähetetty |

- **PUUTE** täkynäkymä: 'MIHIN LENNETÄÄN' ei näy

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [13a-ennen-oikea.png](kuvat/13a-ennen-oikea.png): Ennen: oikea tappi levossa (2064×2752 px, pysty)
- **OK** [13b-oikea-oikealle.png](kuvat/13b-oikea-oikealle.png): Oikea tappi OIKEALLE 3 s (odotus: sisältö liukui vasemmalle) (2064×2752 px, pysty)
- **OK** [13c-ennen-vasen.png](kuvat/13c-ennen-vasen.png): Ennen: oikea tappi levossa (2064×2752 px, pysty)
- **OK** [13d-oikea-vasemmalle.png](kuvat/13d-oikea-vasemmalle.png): Oikea tappi VASEMMALLE 3 s (odotus: sisältö liukui oikealle) (2064×2752 px, pysty)
- **OK** [13e-vasen-eteen.png](kuvat/13e-vasen-eteen.png): Vasen tappi ETEEN 2 s (odotus: lähemmäs) (2064×2752 px, pysty)
- **OK** [13f-vasen-taakse.png](kuvat/13f-vasen-taakse.png): Vasen tappi TAAKSE 2 s (odotus: kauemmas) (2064×2752 px, pysty)
- **OK** [13g-veto-oikealle.png](kuvat/13g-veto-oikealle.png): Yhden sormen veto oikealle (2064×2752 px, pysty)
- **OK** [13h-eleet.png](kuvat/13h-eleet.png): Nipistys ja kierto jälkeen (2064×2752 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.92 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 105.76): Unity -batchmode | kuormitus 105.76 > 16 ydintä

## 8. Ei testattu
- **EI** oikean tapin pystysuunta (ennallaan f55cf1ce:ssä)
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
