# Todistusajo: j146vie4-11-opas-amsterdam 5c1d69bf

**j146vie4-11-opas-amsterdam 5c1d69bf: PUUTE — 2: Amsterdamin vastaus workerilta ilman ääntä: ei lokiriviä**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `11-opas-amsterdam.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-j146vie4-11-opas-amsterdam-20261006-1000`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 5c1d69bf = 5c1d69bf

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: testiotsake päällä` | OK: linssit: opas: kiinni |
| `oletus: elävä opas aukesi` | OK: linssit: opas: auki, data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: täkyt workerilta` | OK: linssit: opas: täkyt 8 (ok) |
| `ui-puu: valikko aukesi itse täkynäkymään` | OK: 'MIHIN LENNETÄÄN' näkyy (213.1 137.5) |
| `tap-teksti mk-linssirivi__nimi → tap 236.1 172.7` | lähetetty |
| `oletus: täkyn napautus välittyi (1. täkyrivi; rivin säiliö ei piirry ui-puuhun)` | OK: opas: täky Canal Grande |
| `oletus: 1. kohde saapui` | OK: linssit: opas: saapui Canal Grande (45,4422, 12,3264), ääni ei, laatat 55 % |
| `oletus: kohde ilman ääni-urlia (ei generointia)` | OK: linssit: opas: vastaus 1 Canal Grande (6,1 s), ääni ei |
| `tap-teksti mk-ohjausnappi#-1 → tap 374.0 90.0` | lähetetty |
| `ui-puu: oppaan ☰ avasi valikon` | OK: 'Vaihda kohde' näkyy (224.5 146.0) |
| `tap-teksti Vaihda kohde → tap 224.5 146.0` | lähetetty |
| `ui-puu: Vaihda kohde avasi täkynäkymän (146: täkyt ylhäällä, maanosat alla)` | OK: 'TAI VALITSE PAIKKA' näkyy (213.1 754.5) |
| `veto 200 700 200 200 0.8` | lähetetty |
| `ui-puu: maanosat näkyvät vierityksen jälkeen` | OK: 'Eurooppa' näkyy (89.2 674.1) |
| `tap-teksti Eurooppa → tap 89.2 674.1` | lähetetty |
| `ui-puu: Euroopan maat` | OK: 'Alankomaat' näkyy (218.5 242.3) |
| `tap-teksti Alankomaat → tap 218.5 242.3` | lähetetty |
| `ui-puu: Alankomaiden kaupungit` | OK: 'Amsterdam' näkyy (217.3 243.0) |
| `tap-teksti Amsterdam → tap 217.3 243.0` | lähetetty |
| `oletus: Amsterdam ENSIMMÄISELLÄ napautuksella (juna 144 FAIL)` | OK: opas: kohde Amsterdam (52,352, 4,915) |
| `oletus: kaupunki vaihtui Amsterdamiin` | OK: linssit: opas: kaupunki vaihtuu → Amsterdam (52,367, 4,883) |
| `oletus: Amsterdamin vastaus workerilta ilman ääntä` | PUUTE: ei riviä 90 s:ssa |

- **PUUTE** Amsterdamin vastaus workerilta ilman ääntä: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [11a-takyt.png](kuvat/11a-takyt.png): Elävä opas: täkynäkymä (1206×2622 px, pysty)
- **OK** [11b-kohde1.png](kuvat/11b-kohde1.png): Elävä opas: 1. kohde (1206×2622 px, pysty)
- **OK** [11c-kaupungit.png](kuvat/11c-kaupungit.png): Vaihda kohde: Alankomaiden kaupungit (1206×2622 px, pysty)
- **OK** [11d-amsterdam.png](kuvat/11d-amsterdam.png): Elävä opas: Amsterdam (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.78 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 16.72)

## 8. Ei testattu
- **EI** kohteiden ElevenLabs-ääni (omistaja 6.10.: ajo ilman ääntä, testiotsake)
- **EI** täkynäkymän Eurooppa-rivi vierityksen jälkeen (Amsterdam valitaan ☰ → Vaihda kohde -polulla, jossa juna 144:n vika oli)
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
