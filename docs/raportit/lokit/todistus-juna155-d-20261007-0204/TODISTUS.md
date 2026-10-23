# Todistusajo: juna155-d 061c8850

**juna155-d 061c8850: OK**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna155c.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna155-d-20261007-0204`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 061c8850 = 061c8850

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: täkyt workerilta` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |
| `tap-teksti mk-linssirivi__nimi → tap 224.0 552.4` | lähetetty |
| `oletus: 1. kohde saapui` | OK: linssit: opas: saapui Eiffel-torni (48,8583, 2,2945), ääni ei, laatat 29 % |
| `tap-teksti mk-ohjausnappi#-1 → tap 374.0 90.0` | lähetetty |
| `ui-puu: ☰ auki` | OK: 'Vaihda kohde' näkyy (224.5 146.0) |
| `tap-teksti Vaihda kohde → tap 224.5 146.0` | lähetetty |
| `veto 200 760 200 160 0.5` | lähetetty |
| `veto 200 760 200 160 0.5` | lähetetty |
| `veto 200 760 200 160 0.5` | lähetetty |
| `veto 200 760 200 160 0.5` | lähetetty |
| `veto 200 760 200 160 0.5` | lähetetty |
| `veto 200 760 200 160 0.5` | lähetetty |
| `veto 200 760 200 160 0.5` | lähetetty |
| `veto 200 760 200 160 0.5` | lähetetty |
| `veto 200 760 200 160 0.5` | lähetetty |
| `veto 200 760 200 160 0.5` | lähetetty |
| `ui-puu: Eurooppa näkyy vedon jälkeen` | OK: 'Eurooppa' näkyy (89.2 674.1) |
| `tap-teksti Eurooppa → tap 89.2 674.1` | lähetetty |
| `ui-puu: Euroopan maat` | OK: 'Alankomaat' näkyy (218.5 242.3) |
| `tap-teksti Alankomaat → tap 218.5 242.3` | lähetetty |
| `ui-puu: Alankomaiden kaupungit` | OK: 'Amsterdam' näkyy (217.3 243.0) |
| `tap-teksti Amsterdam → tap 217.3 243.0` | lähetetty |
| `oletus: Amsterdam ensimmäisellä napautuksella` | OK: opas: kohde Amsterdam (52,352, 4,915) |
| `oletus: Amsterdamin vastaus` | OK: linssit: opas: vastaus 2 kysymys (2 vaihtoehtoa) (2,5 s), ääni url |

- **OK** 16 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [c1-vaihda.png](kuvat/c1-vaihda.png): Vaihda kohde heti napautuksen jälkeen (1206×2622 px, pysty)
- **OK** [c2-veto-ylos.png](kuvat/c2-veto-ylos.png): 10 vetoa ylös (lista loppuun) (1206×2622 px, pysty)
- **OK** [c3-kaupungit.png](kuvat/c3-kaupungit.png): Alankomaiden kaupungit (1206×2622 px, pysty)
- **OK** [c4-amsterdam.png](kuvat/c4-amsterdam.png): Amsterdam (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 29.14 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 19.00): kuormitus 19.00 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
