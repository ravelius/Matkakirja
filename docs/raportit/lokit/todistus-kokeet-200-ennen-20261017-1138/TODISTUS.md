# Todistusajo: kokeet-200-ennen bda7ba2e

**kokeet-200-ennen bda7ba2e: PUUTE — 1: haaran natiivi-ui/kokeet-linsseihin-200 EI sisälly käännökseen bda7ba2e (tai commit puuttuu proto-gitistä); 2: elementtiä 'Peking (testikaupunki)' ei ui-puussa**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-kokeet-200.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-kokeet-200-ennen-20261017-1138`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt bda7ba2e = bda7ba2ea
- **PUUTE** haaran natiivi-ui/kokeet-linsseihin-200 EI sisälly käännökseen bda7ba2e (tai commit puuttuu proto-gitistä)

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `veto 250 700 250 200 0.5` | lähetetty |
| `veto 250 700 250 200 0.5` | lähetetty |
| `tap-teksti Peking (testikaupunki)` | EI LÖYDY ui-puusta |

- **PUUTE** elementtiä 'Peking (testikaupunki)' ei ui-puussa

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [M1-kehittaja.png](kuvat/M1-kehittaja.png): Kehittäjätyökalut-paneelin loppu (ennen: Olavinlinna-pala ja Peking; jälkeen: ei kumpaakaan) (1179×2556 px, pysty)
- **OK** [M2-kesken.png](kuvat/M2-kesken.png): Linssit › KESKENERÄISET auki (jälkeen: Peking keskeneräisten linssien perässä) (1179×2556 px, pysty)
- **OK** [M3-peking.png](kuvat/M3-peking.png): Peking-rivin esikatselu ja Aktivoi (vain jälkeen) (1179×2556 px, pysty)
- **OK** [M4-pelit.png](kuvat/M4-pelit.png): Pelit › KESKENERÄISET: Olavinlinna (ennallaan) (1179×2556 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 25.65 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 44.09): xcodebuild | kuormitus 44.09 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
