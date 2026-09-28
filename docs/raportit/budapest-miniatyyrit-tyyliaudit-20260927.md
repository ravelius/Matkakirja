# Budapestin miniatyyrien tyyliaudit 27.9.2026

Kartalla on seitsemän paikallista WebP-miniatyyriä ja kolme R2-PNG:tä. Vertailu hyväksyttyihin Ateenan viistoihin muste-vesiväridioraamoihin ei löytänyt uusittavaa fyysistä paikkaa. [Koko kaupungin ennen/jälkeen-kontaktiarkissa](kuvat/budapest-miniatyyrit-ennen-jalkeen-20260927.jpg) näkyvät kaikki kymmenen merkkiä; jälkeen-rivit ovat samat, koska kuvia ei vaihdettu.

| Kuva | Lähde | Tyyppi | Mitat | Täyttö | Reuna | Päätös |
| --- | --- | --- | --- | ---: | ---: | --- |
| `budapest-elmyr-de-hory-vari2` | R2 PNG | henkilö | 1024×1024 | 0.332 | 0.000 | säilytetty |
| `budapest-gellertinvuori` | paikallinen WebP | paikka | 1024×1024 | 0.077 | 0.000 | säilytetty |
| `budapest-kalastajanlinnake` | paikallinen WebP | paikka | 1024×1024 | 0.293 | 0.000 | säilytetty |
| `budapest-ketjusilta` | paikallinen WebP | paikka | 1024×1024 | 0.206 | 0.000 | säilytetty |
| `budapest-maanalainen-vari2` | R2 PNG | paikka | 1024×1024 | 0.417 | 0.000 | säilytetty |
| `budapest-parlamenttitalo` | paikallinen WebP | paikka | 1024×1024 | 0.290 | 0.000 | säilytetty |
| `budapest-pyhan-tapanin-kirkko` | paikallinen WebP | paikka | 1024×1024 | 0.236 | 0.000 | säilytetty |
| `budapest-sankarien-aukio` | paikallinen WebP | paikka | 1024×1024 | 0.114 | 0.000 | säilytetty |
| `budapest-seuson-hopeat-vari2` | R2 PNG | esine | 1024×1024 | 0.365 | 0.000 | säilytetty |
| `budapest-suuri-kauppahalli` | paikallinen WebP | paikka | 1024×1024 | 0.314 | 0.000 | säilytetty |

## Visuaalinen arvio

Kahdeksan fyysistä kohdetta — seitsemän paikallista ja R2:n Maanalainen — ovat eristettyjä, hillittyjä viistosta nähtyjä rakennus-, silta-, kukkula- tai aukiopienoismalleja. Taivasta, horisonttia, ympäröivää kaupunkimaisemaa, pyöreää vinjettiä tai tarinallista toimintaa ei näy. `Elmyr de Hory` on karttadatassa `tyyppi: henkilo` ja `Seuson hopeat` `tyyppi: esine`; ne säilytettiin tilauksen ei-paikka-rajauksen mukaisesti. Kolme R2-kuvaa tarkistettiin live-osoitteista.

## Tekninen QA ja poikkeukset

Kaikki kymmenen lähdekuvaa ovat 1024×1024 RGBA. Alfaväli on 0–255, kaikki kulmat läpinäkyviä ja leikkausmitan reuna jokaisella 0,000; leikkauspoikkeuksia ei ole. 1024 pikselin koko poikkeaa tilauksen 512 pikselin tavoitteesta. Lisäksi Gellértinvuori (täyttö 0,077) ja Sankarien aukio (0,114) ovat muita pienempiä, mutta motiivit ovat ehjiä ja kaupungin lähdetyylilistassa Budapest luokiteltiin poikkeamattomaksi. Mittakaava kannattaa tarkistaa varsinaisessa karttanäkymässä ennen mahdollista erillistä kuvakokoerää; tyyliä ei korjattu pelkän numeron perusteella.

Alkuperäisten paikallisten tiedostojen ja live-R2-kuvien SHA-256, alfa, mitat ja täyttö ovat `output/style-audit-europe-20260927/budapest/qa.json`-manifestissa. `old/` sisältää auditointihetken kopiot; `raw/` ja `rejected/` ovat tyhjiä, koska kuvia ei generoitu.

Lähteet: `js/packs/miniatyyrit.js` (10 viitettä), `js/packs/maakartat.js` (kohdetyypit), Sisältökirjurin 27.9.2026 tyyliuudistustilaus ja tyylilista commitissa `389efbb3`.

AGENTS-portit: kaksoisavaimet, niputus, savukkeet ja nimiolimitys läpäisivät. Koko `node --test tests/*.test.mjs`: 4 499 testiä, 4 484 läpäisi, 15 ohitettiin, 0 epäonnistui (väliaikainen polku ilman välilyöntejä).
