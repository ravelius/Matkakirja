# Todistusajo: tarkentuminen155-3ac7ce47 3ac7ce47

**tarkentuminen155-3ac7ce47 3ac7ce47: OK**

Laite ipad `4CE6C737-B056-4F73-9CEA-D2DABFC9B8FC`, skenaario `14-vapaa-tarkentuminen.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-tarkentuminen155-3ac7ce47-20261006-2324`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 3ac7ce47 = 3ac7ce47

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: testiotsake päällä` | OK: linssit: opas: kiinni |
| `oletus: elävä opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: täkyt workerilta` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |
| `ui-puu: täkynäkymä (juna 153: otsikot VALITSE PAIKKA / SUOSIKIT)` | OK: 'SUOSIKIT' näkyy (766.0 26.5) |
| `tap-teksti mk-linssirivi__nimi → tap 789.0 62.2` | lähetetty |
| `oletus: 1. kohde saapui` | OK: linssit: opas: saapui Eiffel-torni (48,8583, 2,2945), ääni ei, laatat 37 % |
| `oletus: kierros lopetettu (vapaa tila)` | OK: linssit: opas: lopeta → True |
| `oletus: tapit näkyvissä` | OK: ui-komento: ui opasvalikko tapit → =opas: tapit näkyy, vasen 0,00 @ 12,1200 64×64, oikea 0,00,0,00 @ 956,1200 64×64, kosketaan False |
| `veto-kohta 0.5 0.5 0.5 0.95 3 mk-tappi--oikea → polku 988.0 1232.0 → 988.0 1260.8, pito 3 s` | lähetetty |
| `veto-kohta 0.5 0.5 0.5 0.05 5 mk-tappi--vasen → polku 44.0 1232.0 → 44.0 1203.2, pito 5 s` | lähetetty |
| `veto-kohta 0.5 0.5 0.95 0.5 2 mk-tappi--oikea → polku 988.0 1232.0 → 1016.8 1232.0, pito 2 s` | lähetetty |
| `veto-kohta 0.5 0.5 0.95 0.5 3 mk-tappi--vasen → polku 44.0 1232.0 → 72.8 1232.0, pito 3 s` | lähetetty |
| `veto-kohta 0.5 0.5 0.5 0.05 3 mk-tappi--oikea → polku 988.0 1232.0 → 988.0 1203.2, pito 3 s` | lähetetty |

- **OK** 6 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [14a-alku.png](kuvat/14a-alku.png): Vapaa tila alkaa kohteen kehyksestä (2064×2752 px, pysty)
- **OK** [14b-alas.png](kuvat/14b-alas.png): Oikea tappi ALAS 3 s (odotus: kamera laskee, mutta pysyy ≥ 40 m tornin rakenteiden yllä, katse lähes vaakaan) (2064×2752 px, pysty)
- **OK** [14c-eteen.png](kuvat/14c-eteen.png): Vasen tappi ETEEN 5 s (odotus: lento katsesuuntaan, tornin yli tai ohi, ei läpi) (2064×2752 px, pysty)
- **OK** [14d-kaanto.png](kuvat/14d-kaanto.png): Oikea tappi OIKEALLE 2 s (odotus: katse kääntyy oikealle paikallaan) (2064×2752 px, pysty)
- **OK** [14d-kaanto-5s.png](kuvat/14d-kaanto-5s.png): Sama paikallaan +5 s (Päätoimittaja: tarkentuuko suoratoisto muutamassa sekunnissa) (2064×2752 px, pysty)
- **OK** [14e-sivulle.png](kuvat/14e-sivulle.png): Vasen tappi OIKEALLE 3 s (odotus: sivuttain oikealle) (2064×2752 px, pysty)
- **OK** [14e-sivulle-5s.png](kuvat/14e-sivulle-5s.png): Sama paikallaan +5 s (Päätoimittaja: tarkentuuko suoratoisto muutamassa sekunnissa) (2064×2752 px, pysty)
- **OK** [14f-ylos.png](kuvat/14f-ylos.png): Oikea tappi YLÖS 3 s (odotus: nousu, katse jyrkemmin alas) (2064×2752 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.19 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 23.90): kuormitus 23.90 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
