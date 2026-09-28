# Varsovan miniatyyrien tyyliaudit 27.9.2026

Kaupungin kartassa on kuusi paikallista WebP-miniatyyriä ja yksi R2-PNG. Kaikki seitsemän esittävät fyysisiä paikkoja, ja vertailu hyväksyttyihin Ateenan viistoihin muste-vesiväridioraamoihin ei löytänyt uusittavaa kohdetta. [Koko kaupungin ennen/jälkeen-kontaktiarkissa](kuvat/varsova-miniatyyrit-ennen-jalkeen-20260927.jpg) jälkeen-rivit ovat siksi samat kuin ennen-rivit.

| Kuva | Lähde | Mitat | Täyttö | Reuna | Päätös |
| --- | --- | --- | ---: | ---: | --- |
| `varsova-kopernikuksen-tiedekeskus` | paikallinen WebP | 1024×1024 | 0.231 | 0.000 | säilytetty |
| `varsova-kulttuuri-ja-tiedepalatsi` | paikallinen WebP | 1024×1024 | 0.199 | 0.000 | säilytetty |
| `varsova-pyhan-ristin-kirkko` | paikallinen WebP | 1024×1024 | 0.196 | 0.000 | säilytetty |
| `varsova-vanhankaupungin-tori` | paikallinen WebP | 1024×1024 | 0.332 | 0.000 | säilytetty |
| `varsova-varsovan-kansallismuseo` | paikallinen WebP | 1024×1024 | 0.296 | 0.000 | säilytetty |
| `varsova-varsovan-linna` | paikallinen WebP | 1024×1024 | 0.169 | 0.000 | säilytetty |
| `varsova-wienin-asema-vari2` | R2 PNG | 1024×1024 | 0.355 | 0.000 | säilytetty |

## Visuaalinen arvio

Kopernikuksen tiedekeskus, Kulttuuri- ja tiedepalatsi, Pyhän ristin kirkko, Vanhankaupungin tori, Varsovan kansallismuseo, Varsovan linna ja R2:n Wienin asema ovat ehjiä, eristettyjä ja viistosta ylhäältä esitettyjä fyysisiä paikkoja. Paletti on hillittyä mustetta ja akvarellia. Taivasta, horisonttia, ympäröivää maisemaa, tarinallista tapahtumaa tai erikoiskehystä ei ole. Wienin aseman R2-kuva tarkistettiin live-osoitteesta.

## Tekninen QA ja poikkeukset

Kaikki seitsemän ovat 1024×1024 RGBA:ta. Alfa kattaa välin 0–255, neljä kulmaa ovat läpinäkyvät ja leikkausreuna jokaisessa 0,000; leikkauspoikkeuksia ei ole. 1024 pikselin koko poikkeaa tyyliuudistustilauksen 512 pikselin tavoitteesta, mutta ei vaadi jo visuaalisesti yhtenäisten motiivien uusintaa tässä tyyliauditissa. Täyttö vaihtelee 0,169–0,355.

Alkuperäisten paikallisten tiedostojen ja live-R2-kuvan SHA-256, alfa, mitat ja täyttö ovat `output/style-audit-europe-20260927/varsova/qa.json`-manifestissa. `old/` sisältää auditointihetken kopiot; `raw/` ja `rejected/` ovat tyhjiä, koska kuvia ei generoitu.

Lähteet: `js/packs/miniatyyrit.js` (seitsemän viitettä), `js/packs/maakartat.js` (karttapaikat), Sisältökirjurin 27.9.2026 tyyliuudistustilaus ja tyylilista commitissa `389efbb3`.

AGENTS-portit: kaksoisavaimet, niputus, savukkeet ja nimiolimitys läpäisivät. Koko `node --test tests/*.test.mjs`: 4 501 testiä, 4 486 läpäisi, 15 ohitettiin, 0 epäonnistui (väliaikainen polku ilman välilyöntejä).
