# Todistusajo: juna155-b 061c8850

**juna155-b 061c8850: PUUTE — 2: Vaihda kohde avasi täkynäkymän (146: täkyt ylhäällä, maanosat alla): 'TAI VALITSE PAIKKA' ei näy; 2: maanosat näkyvät vierityksen jälkeen: 'Eurooppa' ei näy; 2: elementtiä 'Eurooppa' ei ui-puussa**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna155.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna155-b-20261007-0153`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 061c8850 = 061c8850

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `ui-puu: aloitusnäkymässä Jatka matkaa (tallennus säilyi)` | OK: 'Jatka matkaa' näkyy (201.0 605.2) |
| `tap-teksti Jatka matkaa → tap 201.0 605.2` | lähetetty |
| `ui-puu: matka jatkui kartalle (otsikkorivi)` | OK: 'Marseille,' näkyy (94.5 91.8) |
| `oletus: testiotsake päällä` | OK: linssit: opas: kiinni |
| `oletus: elävä opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: täkyt workerilta` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |
| `ui-puu: valikko aukesi itse täkynäkymään (juna 153: otsikot VALITSE PAIKKA / SUOSIKIT)` | OK: 'SUOSIKIT' näkyy (201.0 516.5) |
| `tap-teksti mk-linssirivi__nimi → tap 224.0 552.4` | lähetetty |
| `oletus: täkyn napautus välittyi (1. täkyrivi; rivin säiliö ei piirry ui-puuhun)` | OK: opas: täky Eiffel-torni |
| `oletus: 1. kohde saapui` | OK: linssit: opas: saapui Eiffel-torni (48,8583, 2,2945), ääni ei, laatat 30 % |
| `oletus: kohteen vastaus workerilta (testiotsake: ääni vain R2:ssa valmiina, ei generointia, #4043)` | OK: linssit: opas: vastaus 1 Eiffel-torni (4,6 s), ääni ei |
| `tap-teksti mk-ohjausnappi#-1 → tap 374.0 90.0` | lähetetty |
| `ui-puu: oppaan ☰ avasi valikon` | OK: 'Vaihda kohde' näkyy (224.5 146.0) |
| `tap-teksti Vaihda kohde → tap 224.5 146.0` | lähetetty |
| `ui-puu: Vaihda kohde avasi täkynäkymän (146: täkyt ylhäällä, maanosat alla)` | PUUTE |
| `veto 200 700 200 200 0.8` | lähetetty |
| `ui-puu: maanosat näkyvät vierityksen jälkeen` | PUUTE |
| `tap-teksti Eurooppa` | EI LÖYDY ui-puusta |
| `ui-puu: Euroopan maat` | PUUTE |
| `tap-teksti Alankomaat` | EI LÖYDY ui-puusta |
| `ui-puu: Alankomaiden kaupungit` | PUUTE |
| `tap-teksti Amsterdam` | EI LÖYDY ui-puusta |
| `oletus: Amsterdam ENSIMMÄISELLÄ napautuksella (juna 144 FAIL)` | PUUTE: ei riviä 5 s:ssa |
| `oletus: kaupunki vaihtui Amsterdamiin` | PUUTE: ei riviä 10 s:ssa |
| `oletus: Amsterdamin vastaus workerilta (ääni vain valmiina R2:ssa, ei generointia)` | PUUTE: ei riviä 90 s:ssa |

- **PUUTE** Vaihda kohde avasi täkynäkymän (146: täkyt ylhäällä, maanosat alla): 'TAI VALITSE PAIKKA' ei näy
- **PUUTE** maanosat näkyvät vierityksen jälkeen: 'Eurooppa' ei näy
- **PUUTE** elementtiä 'Eurooppa' ei ui-puussa
- **PUUTE** Euroopan maat: 'Alankomaat' ei näy
- **PUUTE** elementtiä 'Alankomaat' ei ui-puussa
- **PUUTE** Alankomaiden kaupungit: 'Amsterdam' ei näy
- **PUUTE** elementtiä 'Amsterdam' ei ui-puussa
- **PUUTE** Amsterdam ENSIMMÄISELLÄ napautuksella (juna 144 FAIL): ei lokiriviä
- **PUUTE** kaupunki vaihtui Amsterdamiin: ei lokiriviä
- **PUUTE** Amsterdamin vastaus workerilta (ääni vain valmiina R2:ssa, ei generointia): ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01a-kartta.png](kuvat/01a-kartta.png): Kartta uuden pelin jälkeen (Marseille) (1206×2622 px, pysty)
- **OK** [01b-aloitus.png](kuvat/01b-aloitus.png): Aloitusnäkymä, tallennettu matka (1206×2622 px, pysty)
- **OK** [01c-jatkettu.png](kuvat/01c-jatkettu.png): Matka jatkui Jatka matkaa -napista (1206×2622 px, pysty)
- **OK** [11a-takyt.png](kuvat/11a-takyt.png): Elävä opas: täkynäkymä (1206×2622 px, pysty)
- **OK** [11b-kohde1.png](kuvat/11b-kohde1.png): Elävä opas: 1. kohde (1206×2622 px, pysty)
- **OK** [11c-kaupungit.png](kuvat/11c-kaupungit.png): Vaihda kohde: Alankomaiden kaupungit (1206×2622 px, pysty)
- **OK** [11d-amsterdam.png](kuvat/11d-amsterdam.png): Elävä opas: Amsterdam (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 29.03 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 18.66): Blender | kuormitus 18.66 > 16 ydintä

## 8. Ei testattu
- **EI** kohteiden ElevenLabs-ääni (omistaja 6.10.: ajo ilman ääntä, testiotsake)
- **EI** täkynäkymän Eurooppa-rivi vierityksen jälkeen (Amsterdam valitaan ☰ → Vaihda kohde -polulla, jossa juna 144:n vika oli)
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
