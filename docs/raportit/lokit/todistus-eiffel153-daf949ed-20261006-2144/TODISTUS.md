# Todistusajo: eiffel153-daf949ed 7920e6a0

**eiffel153-daf949ed 7920e6a0: PUUTE — 2: täkynäkymä: 'MIHIN LENNETÄÄN' ei näy**

Laite ipad `4CE6C737-B056-4F73-9CEA-D2DABFC9B8FC`, skenaario `14-opas-vapaa.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-eiffel153-daf949ed-20261006-2144`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 7920e6a0 = 7920e6a0

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: testiotsake päällä` | OK: linssit: opas: kiinni |
| `oletus: elävä opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: täkyt workerilta` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |
| `ui-puu: täkynäkymä` | PUUTE |
| `tap-teksti mk-linssirivi__nimi → tap 789.0 62.2` | lähetetty |
| `oletus: 1. kohde saapui` | OK: linssit: opas: saapui Eiffel-torni (48,8583, 2,2945), ääni ei, laatat 33 % |
| `oletus: kierros lopetettu (vapaa tila)` | OK: linssit: opas: lopeta → True |
| `oletus: tapit näkyvissä` | OK: ui-komento: ui opasvalikko tapit → =opas: tapit näkyy, vasen 0,00 @ 12,1200 64×64, oikea 0,00,0,00 @ 956,1200 64×64, kosketaan False |
| `veto-kohta 0.5 0.5 0.5 0.95 3 mk-tappi--oikea → polku 988.0 1232.0 → 988.0 1260.8, pito 3 s` | lähetetty |
| `veto-kohta 0.5 0.5 0.5 0.05 5 mk-tappi--vasen → polku 44.0 1232.0 → 44.0 1203.2, pito 5 s` | lähetetty |
| `veto-kohta 0.5 0.5 0.95 0.5 2 mk-tappi--oikea → polku 988.0 1232.0 → 1016.8 1232.0, pito 2 s` | lähetetty |
| `veto-kohta 0.5 0.5 0.95 0.5 3 mk-tappi--vasen → polku 44.0 1232.0 → 72.8 1232.0, pito 3 s` | lähetetty |
| `veto-kohta 0.5 0.5 0.5 0.05 3 mk-tappi--oikea → polku 988.0 1232.0 → 988.0 1203.2, pito 3 s` | lähetetty |

- **PUUTE** täkynäkymä: 'MIHIN LENNETÄÄN' ei näy

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [14a-alku.png](kuvat/14a-alku.png): Vapaa tila alkaa kohteen kehyksestä (2064×2752 px, pysty)
- **OK** [14b-alas.png](kuvat/14b-alas.png): Oikea tappi ALAS 3 s (odotus: kamera laskee, mutta pysyy ≥ 40 m tornin rakenteiden yllä, katse lähes vaakaan) (2064×2752 px, pysty)
- **OK** [14c-eteen.png](kuvat/14c-eteen.png): Vasen tappi ETEEN 5 s (odotus: lento katsesuuntaan, tornin yli tai ohi, ei läpi) (2064×2752 px, pysty)
- **OK** [14d-kaanto.png](kuvat/14d-kaanto.png): Oikea tappi OIKEALLE 2 s (odotus: katse kääntyy oikealle paikallaan) (2064×2752 px, pysty)
- **OK** [14e-sivulle.png](kuvat/14e-sivulle.png): Vasen tappi OIKEALLE 3 s (odotus: sivuttain oikealle) (2064×2752 px, pysty)
- **OK** [14f-ylos.png](kuvat/14f-ylos.png): Oikea tappi YLÖS 3 s (odotus: nousu, katse jyrkemmin alas) (2064×2752 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 29.26 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 16.90)

## 8. Ei testattu
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
