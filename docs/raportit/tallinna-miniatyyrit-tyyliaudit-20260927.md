# Tallinnan miniatyyrien tyyliaudit 27.9.2026

Kaupungin kartassa on kuusi paikallista WebP:tä ja kolme R2-PNG:tä. Seitsemän kuvaa esittää fyysisiä paikkoja ja kaksi muuta ilmiötä/esinettä. [Koko kaupungin ennen/jälkeen-kontaktiarkissa](kuvat/tallinna-miniatyyrit-ennen-jalkeen-20260927.jpg) kaikki yhdeksän pysyvät ennallaan, koska fyysisissä paikoissa ei ollut hyväksytyn Ateenan tyylin poikkeamaa.

| Kuva | Lähde | Tyyppi | Mitat | Täyttö | Reuna | Päätös |
| --- | --- | --- | --- | ---: | ---: | --- |
| `tallinna-e-valtio-vari2` | R2 PNG | ilmiö | 1024×1024 | 0.403 | 0.000 | säilytetty |
| `tallinna-lyhyen-jalan-torni-vari2` | R2 PNG | paikka | 1024×1024 | 0.389 | 0.000 | säilytetty |
| `tallinna-matkustajasatama` | paikallinen WebP | paikka | 1024×1024 | 0.194 | 0.000 | säilytetty |
| `tallinna-nevskin-katedraali` | paikallinen WebP | paikka | 1024×1024 | 0.235 | 0.000 | säilytetty |
| `tallinna-olevisten-kirkko` | paikallinen WebP | paikka | 1024×1024 | 0.076 | 0.000 | säilytetty |
| `tallinna-paksu-margareeta` | paikallinen WebP | paikka | 1024×1024 | 0.239 | 0.000 | säilytetty |
| `tallinna-pirtulaivat-vari2` | R2 PNG | esine | 1024×1024 | 0.358 | 0.000 | säilytetty |
| `tallinna-raatihuoneentori` | paikallinen WebP | paikka | 1024×1024 | 0.217 | 0.000 | säilytetty |
| `tallinna-virun-portti` | paikallinen WebP | paikka | 1024×1024 | 0.164 | 0.000 | säilytetty |

## Visuaalinen arvio

Paksu Margareeta, Olevisten kirkko, Raatihuoneentori, Nevskin katedraali, Virun portti, Matkustajasatama ja R2:n Lyhyen jalan torni ovat eristettyjä viistoja fyysisten paikkojen pienoismalleja. Paletti on hillittyä mustetta ja akvarellia; taivasta, horisonttia, ympäröivää maisemaa, vinjettiä tai tarinallista tapahtumaa ei ole. R2:n `E-valtio` on karttadatassa `tyyppi: ilmio` ja `Pirtulaivat` `tyyppi: esine`; ne säilyivät tilauksen ei-paikka-rajauksen mukaisesti. Kolme R2-kuvaa tarkistettiin live-osoitteista.

## Tekninen QA ja poikkeukset

Kaikki yhdeksän kuvaa ovat 1024×1024 RGBA:ta. Alfa kattaa välin 0–255, neljä kulmaa ovat läpinäkyvät ja leikkausreuna jokaisessa 0,000; leikkauspoikkeuksia ei ole. 1024 pikselin koko poikkeaa tilaustekstin 512 pikselin tavoitteesta. Olevisten kirkon täyttö 0,076 on pieni, mutta kapea torni ja kirkko näkyvät kokonaan. Tämä mittakaava kannattaa tarkistaa varsinaisessa karttanäkymässä ennen mahdollista erillistä kokoerää.

Paikallisten tiedostojen ja live-R2-kuvien SHA-256, alfa, mitat ja täyttö ovat `output/style-audit-europe-20260927/tallinna/qa.json`-manifestissa. `old/` sisältää auditointihetken kopiot; `raw/` ja `rejected/` ovat tyhjiä, koska kuvia ei generoitu.

Lähteet: `js/packs/miniatyyrit.js` (yhdeksän viitettä), `js/packs/maakartat.js` (karttamerkkien tyypit), Sisältökirjurin 27.9.2026 tyyliuudistustilaus ja tyylilista commitissa `389efbb3`.

AGENTS-portit: kaksoisavaimet, niputus, savukkeet ja nimiolimitys läpäisivät. Koko `node --test tests/*.test.mjs`: 4 505 testiä, 4 490 läpäisi, 15 ohitettiin, 0 epäonnistui (väliaikainen polku ilman välilyöntejä).
