# Todistusajo: juna155-a 061c8850

**juna155-a 061c8850: PUUTE — 5: AJO KESKEYTETTY: mykistys ei varmistettu (linssin jälkeen: ei vastausta) — ääni olisi voinut mennä Macin kaiuttimiin**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna155.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna155-a-20261007-0144`.

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

- **OK** 1 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit

## 4. Stillit tiloista
- **OK** [01a-kartta.png](kuvat/01a-kartta.png): Kartta uuden pelin jälkeen (Marseille) (1206×2622 px, pysty)
- **OK** [01b-aloitus.png](kuvat/01b-aloitus.png): Aloitusnäkymä, tallennettu matka (1206×2622 px, pysty)
- **OK** [01c-jatkettu.png](kuvat/01c-jatkettu.png): Matka jatkui Jatka matkaa -napista (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.45 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **PUUTE** AJO KESKEYTETTY: mykistys ei varmistettu (linssin jälkeen: ei vastausta) — ääni olisi voinut mennä Macin kaiuttimiin

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 47.75): Blender xcodebuild | kuormitus 47.75 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
