# Todistusajo: juna155-c 061c8850

**juna155-c 061c8850: PUUTE — 2: Eurooppa näkyy vedon jälkeen: 'Eurooppa' ei näy; 2: elementtiä 'Eurooppa' ei ui-puussa; 2: Euroopan maat: 'Alankomaat' ei näy**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna155c.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna155-c-20261007-0159`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 061c8850 = 061c8850

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: täkyt workerilta` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |
| `tap-teksti mk-linssirivi__nimi → tap 224.0 552.4` | lähetetty |
| `oletus: 1. kohde saapui` | OK: linssit: opas: saapui Eiffel-torni (48,8583, 2,2945), ääni ei, laatat 28 % |
| `tap-teksti mk-ohjausnappi#-1 → tap 374.0 90.0` | lähetetty |
| `ui-puu: ☰ auki` | OK: 'Vaihda kohde' näkyy (224.5 146.0) |
| `tap-teksti Vaihda kohde → tap 224.5 146.0` | lähetetty |
| `veto 200 250 200 800 0.8` | lähetetty |
| `ui-puu: Eurooppa näkyy vedon jälkeen` | PUUTE |
| `tap-teksti Eurooppa` | EI LÖYDY ui-puusta |
| `ui-puu: Euroopan maat` | PUUTE |
| `tap-teksti Alankomaat` | EI LÖYDY ui-puusta |
| `ui-puu: Alankomaiden kaupungit` | PUUTE |
| `tap-teksti Amsterdam` | EI LÖYDY ui-puusta |
| `oletus: Amsterdam ensimmäisellä napautuksella` | PUUTE: ei riviä 10 s:ssa |
| `oletus: Amsterdamin vastaus` | PUUTE: ei riviä 90 s:ssa |

- **PUUTE** Eurooppa näkyy vedon jälkeen: 'Eurooppa' ei näy
- **PUUTE** elementtiä 'Eurooppa' ei ui-puussa
- **PUUTE** Euroopan maat: 'Alankomaat' ei näy
- **PUUTE** elementtiä 'Alankomaat' ei ui-puussa
- **PUUTE** Alankomaiden kaupungit: 'Amsterdam' ei näy
- **PUUTE** elementtiä 'Amsterdam' ei ui-puussa
- **PUUTE** Amsterdam ensimmäisellä napautuksella: ei lokiriviä
- **PUUTE** Amsterdamin vastaus: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [c1-vaihda.png](kuvat/c1-vaihda.png): Vaihda kohde heti napautuksen jälkeen (1206×2622 px, pysty)
- **OK** [c2-veto-alas.png](kuvat/c2-veto-alas.png): Veto alas (sisältö alas = ylös vieritys) (1206×2622 px, pysty)
- **OK** [c3-kaupungit.png](kuvat/c3-kaupungit.png): Alankomaiden kaupungit (1206×2622 px, pysty)
- **OK** [c4-amsterdam.png](kuvat/c4-amsterdam.png): Amsterdam (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 29.57 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 13.60): Blender 

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
