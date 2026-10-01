# Kiovan miniatyyrien tyyliaudit 27.9.2026

Kaupungin kartassa on kuusi paikallista WebP-miniatyyriä eikä R2-viitteitä. Kaikki kuusi kuvaavat fyysisiä paikkoja ja sopivat hyväksyttyihin Ateenan viistoihin muste-vesiväridioraamoihin. [Koko kaupungin ennen/jälkeen-kontaktiarkissa](kuvat/kiova-miniatyyrit-ennen-jalkeen-20260927.jpg) jälkeen-rivit ovat tarkoituksella samat, koska kuvia ei vaihdettu.

| Kuva | Mitat | Täyttö | Reuna | Päätös |
| --- | --- | ---: | ---: | --- |
| `kiova-andreaksen-kirkko` | 1024×1024 | 0.160 | 0.000 | säilytetty |
| `kiova-itsenaisyyden-aukio` | 1024×1024 | 0.161 | 0.000 | säilytetty |
| `kiova-kiovan-kultainen-portti` | 1024×1024 | 0.184 | 0.000 | säilytetty |
| `kiova-kontraktovan-aukio` | 1024×1024 | 0.265 | 0.000 | säilytetty |
| `kiova-pyhan-mikaelin-luostari` | 1024×1024 | 0.254 | 0.000 | säilytetty |
| `kiova-pyhan-sofian-katedraali` | 1024×1024 | 0.296 | 0.000 | säilytetty |

## Visuaalinen arvio

Andreaksen kirkko, Itsenäisyyden aukio, Kiovan kultainen portti, Kontraktovan aukio, Pyhän Mikaelin luostari ja Pyhän Sofian katedraali ovat eristettyjä, viistosta nähtyjä fyysisten paikkojen pienoismalleja. Paletti on hillittyä mustetta ja akvarellia; taivasta, horisonttia, ympäröivää maisemaa, tarinallista toimintaa tai erikoiskehystä ei ole. Kontraktovan aukion kuva painottaa Kontraktitaloa, jonka valmistumisesta aukio sai nykyisen nimensä pelin nostotekstin mukaan. Se on sisällöllinen rajaus, ei tyylipoikkeus.

## Tekninen QA ja poikkeukset

Kaikki kuusi ovat 1024×1024 RGBA:ta. Alfa kattaa välin 0–255, neljä kulmaa ovat läpinäkyvät ja leikkausreuna jokaisessa 0,000; leikkauspoikkeuksia ei ole. 1024 pikselin koko poikkeaa tilaustekstin 512 pikselin tavoitteesta. Täyttö vaihtelee 0,160–0,296, eikä yksikään motiivi katkea.

Alkuperäistiedostojen SHA-256, alfa, mitat ja täyttö ovat `output/style-audit-europe-20260927/kiova/qa.json`-manifestissa. `old/` sisältää auditointihetken kopiot; `raw/` ja `rejected/` ovat tyhjiä, koska kuvia ei generoitu.

Lähteet: `js/packs/miniatyyrit.js` (kuusi paikallista viitettä), `js/packs/maakartat.js` (karttapaikat), `js/packs/nahtavyysjutut.js` (Kontraktovan aukion kuvaus), Sisältökirjurin 27.9.2026 tyyliuudistustilaus ja tyylilista commitissa `389efbb3`.

AGENTS-portit: kaksoisavaimet, niputus, savukkeet ja nimiolimitys läpäisivät. Koko `node --test tests/*.test.mjs`: 4 503 testiä, 4 488 läpäisi, 15 ohitettiin, 0 epäonnistui (väliaikainen polku ilman välilyöntejä).
